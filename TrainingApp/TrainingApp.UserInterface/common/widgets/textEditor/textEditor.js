/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.textEditor
    * @access internal
    *
    * @description
    * This module provides functionalities related to rich text editor.
    */
    angular.module('siemens.simaticit.common.widgets.textEditor', []);
})();

(function () {
    'use strict';
    var values = {};
    /**
    * @ngdoc directive
    * @name sitTextEditor
    * @module siemens.simaticit.common.widgets.textEditor
    * @access internal
    * @description * The **sitTextEditor** directive provides a rich text editor.

    * @usage
    * As an element:
    * ```
    *     <sit-text-editor sit-id="editor" sit-value="vm.data"> </sit-text-editor>
    * ```
    * @restrict E
    *
    * @param {string} sit-id Id for the widget instance
    * @param {string} sit-value sting containing HTML content using which you can assign data to the text area.
    * @param {boolean} [sit-read-only] _(Optional)_ If this expression is truthy, the element will be made readonly.
    * @param {boolean} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be made readonly.

    * @example
    * In a view template, the **sit-text-editor** directive is used as follows:
    *
    * ```
    *  <sit-text-editor sit-id="editor" sit-value="vm.data"> </sit-text-editor>
    * ```
    *
    * NOTE: This widget can be used within the property grid widget.
    * For the configuration, see {@link siemens.simaticit.common.widgets.propertyGrid}
    * The widget also provides image upload feature, along with resizing capability after uploading.
    * The minimum size of the image allowed is 1KB.
    * The maximum size of the image allowed is 1MB.
    * The allowed image file types are : image/jpeg, image/png and image/gif.
    **/

    angular.module('siemens.simaticit.common.widgets.textEditor').directive('sitTextEditor', sitTextEditor);
    function sitTextEditor() {
        return {
            scope: {},
            restrict: 'E',
            transclude: true,
            bindToController: {
                id: '@sitId',
                value: '=?sitValue',
                data: '=?sitData',
                readOnly: '<sitReadOnly',
                ngReadonly: '=?'
            },
            controller: TextEditorController,
            controllerAs: 'textEditorCtrl',
            templateUrl: 'common/widgets/textEditor/text-editor.html'
        };
    }

    TextEditorController.$inject = ['$rootScope', '$scope', '$window', '$timeout', '$translate', 'common.textEditor.textEditorService', 'common.widgets.globalDialog.service'];
    function TextEditorController($rootScope, $scope, $window, $timeout, $translate, editorService, globalDialogService) {
        var vm = this;
        var uploadEvent, params;

        vm.$onInit = function () {
            vm.readOnly = vm.readOnly === undefined ? vm.ngReadonly : vm.readOnly;
            vm.imageData = [{
                value: values,
                widgetAttributes: {
                    'accept': 'image/jpeg,image/png,image/gif',
                    'sit-min-size': '1KB',
                    'sit-max-size': '1MB'
                },
                tabHeadingtext: $translate.instant('textEditor.tabHeading'),
                browseText: $translate.instant('textEditor.browse')
            }];

            vm.enableOkButton = enableOkButton;
            vm.disableOkButton = disableOkButton;
            vm.uploadOk = uploadOk;
            vm.uploadClose = uploadClose;
        };

        var timer = $timeout(function () {
            $window.CKEDITOR.replace(vm.id, {
                allowedcontent: 'blockquote strong em h1 h2 h3 h4 h5 h6 li ol ul;' +
                    '*{text-align};span{color};a[!href];p{text-indent,margin-left};' +
                    'table tr td thead th tbody;',
                disallowedContent: 'iframe script; *[on*]; *[class]',
                extraAllowedContent: 'img{width}[src,alt,style]',
                extraPlugins: 'placeholder,imageDragResize,imageUpload',
                removePlugins: 'image',
                qtCellPadding: '0',
                qtCellSpacing: '0',
                toolbarGroups: [
                    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                    { name: 'colors', groups: ['colors'] },
                    { name: 'styles', groups: ['styles'] },
                    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
                    { name: 'insert', groups: ['links', 'insert'] }
                ],
                removeButtons: 'Underline,Strike,Subscript,Superscript,BGColor,Styles,JustifyBlock,Unlink,Anchor,SpecialChar,HorizontalRule',
                resize_enabled: false,
                colorButton_enableMore: true,
                removeDialogTabs: 'link:advanced;link:target',
                on: {
                    instanceReady: function (evt) {
                        evt.editor.setReadOnly(vm.readOnly);
                        if (vm.readOnly === true) {
                            evt.editor.document.$.body.style.pointerEvents = 'none';
                        }
                        evt.editor.on('change', function () {
                            vm.contentChanged = true;
                            $rootScope.$emit('sit-editor-content-change', vm.contentChanged);
                        })
                    }
                }
            });

            editorService.setEditorInstance($window.CKEDITOR, vm.id);
            if (vm.data && vm.data.length) {
                params = [];
                for (var i = 0; i < vm.data.length; i++) {
                    params.push([vm.data[i]]);
                }
                $window.CKEDITOR.instances[vm.id].data = {
                    parameters: params
                };
            }

            if (vm.value) {
                editorService.setEditorContent(vm.value, vm.id);
            }

            if (!$window.CKEDITOR.plugins.registered.imageUpload) {
                $window.CKEDITOR.plugins.add('imageUpload', {
                    icons: 'imageUpload',
                    init: function (textEditor) {
                        textEditor.addCommand('imageUploadOption', {
                            exec: function (editor) {
                                vm.isUploadSuccess = false;
                                vm.uploadDisabled = true;
                                setDialog();

                                uploadEvent = $rootScope.$on('sit-editor-image-uploaded', function (e, imageFormat, imageSrc) {
                                    if (!vm.isUploadSuccess) {
                                        var imgHtml = $window.CKEDITOR.dom.element.createFromHtml('<img style="width:400px" src=\'data:' +
                                            imageFormat + ';base64,' + imageSrc + '\'  />');
                                        if (editor.document) {
                                            var div = editor.document.createElement('div');
                                            imgHtml.appendTo(div);
                                            editor.insertElement(div);
                                            vm.isUploadSuccess = true;
                                            e.preventDefault();
                                        }
                                    }
                                });
                            }
                        });

                        textEditor.ui.addButton('ImageUpload', {
                            label: $translate.instant('common.imageUpload'),
                            command: 'imageUploadOption',
                            toolbar: 'insert'
                        });
                    }
                });
            }
        });

        function setDialog() {
            $timeout(function () {
                globalDialogService.set({
                    title: $translate.instant('common.imageUpload'),
                    templatedata: vm.imageData,
                    templateuri: 'common/widgets/textEditor/image-upload-dialog-template.html',
                    buttons: [
                        {
                            id: 'btn_ok',
                            displayName: $translate.instant('common.ok'),
                            onClickCallback: uploadOk,
                            disabled: vm.uploadDisabled
                        },
                        {
                            id: 'btn_cancel',
                            displayName: $translate.instant('common.cancel'),
                            onClickCallback: uploadClose
                        }
                    ]
                });
            });
            globalDialogService.show();
        }

        $scope.$on('sit-file-uploader-success', enableOkButton);
        $scope.$on('sit-file-uploader-file-removed', disableOkButton);

        function enableOkButton() {
            if (vm.imageData[0].value) {
                vm.imageSrc = vm.imageData[0].value;
                if (vm.imageSrc !== null) {
                    vm.uploadDisabled = false;
                    setDialog();
                    if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                        $scope.$apply();
                    }
                }
            }
        }

        function disableOkButton() {
            vm.uploadDisabled = true;
            setDialog();
        }

        function uploadOk() {
            if (vm.imageData[0].value.contents) {
                vm.imageSrc = vm.imageData[0].value.contents;
                vm.format = vm.imageData[0].value.type;
                if (vm.imageSrc !== null) {
                    $rootScope.$emit('sit-editor-image-uploaded', vm.format, vm.imageSrc);
                }
            }
            uploadClose();
        }

        function uploadClose() {
            vm.imageData[0].value.name = '';
            vm.imageData[0].value.type = '';
            vm.imageData[0].value.contents = '';
            globalDialogService.hide();
        }

        vm.$onChanges = function (changes) {
            if (changes.readOnly && !changes.readOnly.isFirstChange()) {
                if ($window.CKEDITOR.instances[vm.id] !== undefined) {
                    $window.CKEDITOR.instances[vm.id].setData($window.CKEDITOR.instances[vm.id].getData(), function () {
                        $window.CKEDITOR.instances[vm.id].setReadOnly(vm.readOnly);
                        if (vm.readOnly === true) {
                            $window.CKEDITOR.instances[vm.id].document.$.body.style.pointerEvents = 'none';
                        } else {
                            $window.CKEDITOR.instances[vm.id].document.$.body.style.pointerEvents = '';
                        }
                    });
                }
            }
        };

        vm.$onDestroy = function () {
            $timeout.cancel(timer);
            timer = null;

            if (uploadEvent) {
                uploadEvent();
            }

            if (this.id !== undefined && window.CKEDITOR !== undefined) {
                window.CKEDITOR.instances[this.id].setData('');
                window.CKEDITOR.instances[this.id].destroy();
            }
        };
    }
})();

(function () {
    'use strict';

    /* Copyright (C) Siemens AG 2018. All Rights Reserved.
     * Forked from AngularJS `sanitize.js` inorder to sanitize the html markup for output sanitization
     * The AngularJS variant of $sanitize service was stripping off the inline styles, which is required
     * for Rich text editor while in Read-only mode.
     * */

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *     Any commits to this file should be reviewed with security in mind.  *
     *   Changes to this file can potentially create security vulnerabilities. *
     *          An approval from 2 Core members with history of modifying      *
     *                         this file is required.                          *
     *                                                                         *
     *  Does the change somehow allow for arbitrary javascript to be executed? *
     *    Or allows for someone to change the prototype of built-in objects?   *
     *     Or gives undesired access to variables likes document or window?    *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    var $sanitizeMinErr = angular.$$minErr('$textEditorSanitize');
    var bind;
    var extend;
    var forEach;
    var isDefined;
    var lowercase;
    var nodeContains;
    var htmlParser;
    var htmlSanitizeWriter;

    /**
     * @ngdoc service
     * @name $textEditorSanitize
     * @module siemens.simaticit.common.widgets.textEditor
     * @kind function
     * @access internal
     *
     * @description
     *   Sanitizes an html string by stripping all potentially dangerous tokens.
     *
     *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
     *   then serialized back to properly escaped html string. This means that no unsafe input can make
     *   it into the returned string.
     *
     *   The whitelist for URL sanitization of attribute values is configured using the functions
     *   `aHrefSanitizationWhitelist` and `imgSrcSanitizationWhitelist` of ng.$compileProvider.
     *
     *   The input may also contain SVG markup if this is enabled via {@link $textEditorSanitizeProvider}.
     *
     * @param {string} html HTML input.
     * @returns {string} Sanitized HTML.
     */

    /**
     * @ngdoc provider
     * @access internal
     * @name $textEditorSanitizeProvider
     * @module siemens.simaticit.common.widgets.textEditor
     * @description
     * Creates and configures {@link $textEditorSanitize} instance.
     */
    function $textEditorSanitizeProvider() {
        var svgEnabled = false;

        /**
         * @ngdoc method
         * @name $textEditorSanitizeProvider#enableSvg
         * @kind function
         * @access internal
         *
         * @description
         * Enables a subset of svg to be supported by the sanitizer.
         *
         * <div class="alert alert-warning">
         *   <p>By enabling this setting without taking other precautions, you might expose your
         *   application to click-hijacking attacks. In these attacks, sanitized svg elements could be positioned
         *   outside of the containing element and be rendered over other elements on the page (e.g. a login
         *   link). Such behavior can then result in phishing incidents.</p>
         *
         *   <p>To protect against these, explicitly setup `overflow: hidden` css rule for all potential svg
         *   tags within the sanitized content:</p>
         *
         *   <br>
         *
         *   <pre><code>
         *   .rootOfTheIncludedContent svg {
         *     overflow: hidden !important;
         *   }
         *   </code></pre>
         * </div>
         *
         * @param {boolean=} flag Enable or disable SVG support in the sanitizer.
         * @returns {boolean|ng.$textEditorSanitizeProvider} Returns the currently configured value if called
         *    without an argument or self for chaining otherwise.
         */
        this.enableSvg = function (enableSvg) {
            if (isDefined(enableSvg)) {
                svgEnabled = enableSvg;
                return this;
            }
            return svgEnabled;
        };

        //////////////////////////////////////////////////////////////////////////////////////////////////
        // Private stuff
        //////////////////////////////////////////////////////////////////////////////////////////////////

        bind = angular.bind;
        extend = angular.extend;
        forEach = angular.forEach;
        isDefined = angular.isDefined;
        lowercase = angular.lowercase;

        htmlParser = htmlParserImpl;
        htmlSanitizeWriter = htmlSanitizeWriterImpl;

        nodeContains = window.Node.prototype.contains || /** @this */ function (arg) {
            // eslint-disable-next-line no-bitwise
            return !!(this.compareDocumentPosition(arg) & 16);
        };

        // Regular Expressions for parsing tags and attributes
        var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            // Match everything outside of normal chars and " (quote character)
            NON_ALPHANUMERIC_REGEXP = /([^#-~ |!])/g;


        // Good source of info about elements and attributes
        // http://dev.w3.org/html5/spec/Overview.html#semantics
        // http://simon.html5.org/html-elements

        // Safe Void Elements - HTML5
        // http://dev.w3.org/html5/spec/Overview.html#void-elements
        var voidElements = toMap('area,br,col,hr,img,wbr');

        // Elements that you can, intentionally, leave open (and which close themselves)
        // http://dev.w3.org/html5/spec/Overview.html#optional-tags
        var optionalEndTagBlockElements = toMap('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
            optionalEndTagInlineElements = toMap('rp,rt'),
            optionalEndTagElements = extend({},
                optionalEndTagInlineElements,
                optionalEndTagBlockElements);

        // Safe Block Elements - HTML5
        var blockElements = extend({}, optionalEndTagBlockElements, toMap('address,article,' +
            'aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
            'h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul'));

        // Inline Elements - HTML5
        var inlineElements = extend({}, optionalEndTagInlineElements, toMap('a,abbr,acronym,b,' +
            'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,' +
            'samp,small,span,strike,strong,sub,sup,time,tt,u,var'));

        // SVG Elements
        // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
        // Note: the elements animate,animateColor,animateMotion,animateTransform,set are intentionally omitted.
        // They can potentially allow for arbitrary javascript to be executed. See #11290
        var svgElements = toMap('circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,' +
            'hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,' +
            'radialGradient,rect,stop,svg,switch,text,title,tspan');

        // Blocked Elements (will be stripped)
        var blockedElements = toMap('script,style');

        var validElements = extend({},
            voidElements,
            blockElements,
            inlineElements,
            optionalEndTagElements);

        //Attributes that have href and hence need to be sanitized
        var uriAttrs = toMap('background,cite,href,longdesc,src,xlink:href,xml:base');

        var htmlAttrs = toMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
            'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
            'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
            'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
            'valign,value,vspace,width');

        // SVG attributes (without "id" and "name" attributes)
        // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
        var svgAttrs = toMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
            'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +
            'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +
            'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +
            'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +
            'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +
            'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +
            'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +
            'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +
            'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +
            'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +
            'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +
            'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +
            'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +
            'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);

        var validAttrs = extend({},
            uriAttrs,
            svgAttrs,
            htmlAttrs);

        function toMap(str, lowercaseKeys) {
            var obj = {},
                items = str.split(','),
                i;
            for (i = 0; i < items.length; i++) {
                obj[lowercaseKeys ? lowercase(items[i]) : items[i]] = true;
            }
            return obj;
        }

        this.$get = ['$$sanitizeUri', function ($$sanitizeUri) {
            if (svgEnabled) {
                extend(validElements, svgElements);
            }
            return function (html) {
                var buf = [];
                htmlParser(html, htmlSanitizeWriter(buf, function (uri, isImage) {
                    return !/^unsafe:/.test($$sanitizeUri(uri, isImage));
                }));
                return buf.join('');
            };
        }];

        /**
         * Create an inert document that contains the dirty HTML that needs sanitizing
         * Depending upon browser support we use one of three strategies for doing this.
         * Support: Safari 10.x -> XHR strategy
         * Support: Firefox -> DomParser strategy
         */
        var getInertBodyElement /* function(html: string): HTMLBodyElement */ = (function (window, document) {
            var inertDocument;
            if (document && document.implementation) {
                inertDocument = document.implementation.createHTMLDocument('inert');
            } else {
                throw $sanitizeMinErr('noinert', 'Can\'t create an inert html document');
            }
            var inertBodyElement = (inertDocument.documentElement || inertDocument.getDocumentElement()).querySelector('body');

            // Check for the Safari 10.1 bug - which allows JS to run inside the SVG G element
            inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>';
            if (!inertBodyElement.querySelector('svg')) {
                return getInertBodyElement_XHR;
            } else {
                // Check for the Firefox bug - which prevents the inner img JS from being sanitized
                inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">';
                if (inertBodyElement.querySelector('svg img')) {
                    return getInertBodyElement_DOMParser;
                }
                return getInertBodyElement_InertDocument;
            }

            function getInertBodyElement_XHR(html) {
                // We add this dummy element to ensure that the rest of the content is parsed as expected
                // e.g. leading whitespace is maintained and tags like `<meta>` do not get hoisted to the `<head>` tag.
                html = '<remove></remove>' + html;
                try {
                    html = encodeURI(html);
                } catch (e) {
                    return undefined;
                }
                var xhr = new window.XMLHttpRequest();
                xhr.responseType = 'document';
                // Added NOSONAR because in version 3.1 we suppress the vulnerability in according to project architect and the security expert of the product.
                // In detail the process was tracked by the TFS work item number 147917
                // This code is forked version of Angular Sanitize library
                // So as agreed solution with the team issue administrator is to mark them using an in-code approach.
                // You can find details on the attached email on the TFS work item number 147917
                xhr.open('GET', 'data:text/html;charset=utf-8,' + html, false);//NOSONAR
                xhr.send(null);
                var body = xhr.response.body;
                body.firstChild.remove();
                return body;
            }

            function getInertBodyElement_DOMParser(html) {
                // We add this dummy element to ensure that the rest of the content is parsed as expected
                // e.g. leading whitespace is maintained and tags like `<meta>` do not get hoisted to the `<head>` tag.
                html = '<remove></remove>' + html;
                try {
                    var body = new window.DOMParser().parseFromString(html, 'text/html').body;
                    body.firstChild.remove();
                    return body;
                } catch (e) {
                    return undefined;
                }
            }

            function getInertBodyElement_InertDocument(html) {
                inertBodyElement.innerHTML = html;

                // Support: IE 9-11 only
                // strip custom-namespaced attributes on IE<=11
                if (document.documentMode) {
                    stripCustomNsAttrs(inertBodyElement);
                }

                return inertBodyElement;
            }
        })(window, window.document);

        /**
         * @example
         * htmlParser(htmlString, {
         *     start: function(tag, attrs) {},
         *     end: function(tag) {},
         *     chars: function(text) {},
         *     comment: function(text) {}
         * });
         *
         * @param {string} html string
         * @param {object} handler
         */
        function htmlParserImpl(html, handler) {
            if (html === null || html === undefined) {
                html = '';
            } else if (typeof html !== 'string') {
                html = '' + html;
            }

            var inertBodyElement = getInertBodyElement(html);
            if (!inertBodyElement) return '';

            //mXSS protection
            var mXSSAttempts = 5;
            do {
                if (mXSSAttempts === 0) {
                    throw $sanitizeMinErr('uinput', 'Failed to sanitize html because the input is unstable');
                }
                mXSSAttempts -= 1;

                // trigger mXSS if it is going to happen by reading and writing the innerHTML
                html = inertBodyElement.innerHTML;
                inertBodyElement = getInertBodyElement(html);
            } while (html !== inertBodyElement.innerHTML);

            var node = inertBodyElement.firstChild;
            while (node) {
                switch (node.nodeType) {
                    case 1: // ELEMENT_NODE
                        handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));
                        break;
                    case 3: // TEXT NODE
                        handler.chars(node.textContent);
                        break;
                }

                var nextNode = node.firstChild;
                if (!nextNode) {
                    if (node.nodeType === 1) {
                        handler.end(node.nodeName.toLowerCase());
                    }
                    nextNode = getNonDescendant('nextSibling', node);
                    if (!nextNode) {
                        while (nextNode === null) {
                            node = getNonDescendant('parentNode', node);
                            if (node === inertBodyElement) break;
                            nextNode = getNonDescendant('nextSibling', node);
                            if (node.nodeType === 1) {
                                handler.end(node.nodeName.toLowerCase());
                            }
                        }
                    }
                }
                node = nextNode;
            }

            while ((node = inertBodyElement.firstChild)) {
                inertBodyElement.removeChild(node);
            }
        }

        function attrToMap(attrs) {
            var map = {};
            for (var i = 0, ii = attrs.length; i < ii; i++) {
                var attr = attrs[i];
                map[attr.name] = attr.value;
            }
            return map;
        }

        var trim = (function () {
            if (!String.prototype.trim) {
                return function (str) {
                    return typeof str === 'string' ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : str;
                };
            }
            return function (str) {
                return typeof str === 'string' ? str.trim() : str;
            };
        })();

        function allowedStyles(styleAttr) {
            var allowedStyle = '';
            var styleArr = styleAttr.split(';');
            forEach(styleArr, function (styleProp) {
                var style = styleProp.split(':');
                if (style.length === 2) {
                    var key = trim(lowercase(style[0]));
                    var value = trim(lowercase(style[1]));
                    if (key === 'color' && (
                            value.match(/^rgb\([0-9%,\. ]*\)$/i) || value.match(/^rgba\([0-9%,\. ]*\)$/i) || value.match(/^hsl\([0-9%,\. ]*\)$/i) ||
                            value.match(/^hsla\([0-9%,\. ]*\)$/i) || value.match(/^#[0-9a-f]{3,6}$/i) || value.match(/^[a-z]*$/i)) ||
                        (key === 'text-align' && (value === 'left' || value === 'right' || value === 'center' || value === 'justify')) ||
                        (key === 'width' || key === 'height' || key === 'margin-left' || key === 'text-indent') && (value.match(/[0-9\.]*(px|em|rem|%)/)) ||
                        (key === 'direction' && value.match(/^ltr|rtl|initial|inherit$/))) {
                        allowedStyle += key + ': ' + value + ';';
                    }
                }
            });
            return allowedStyle;
        }

        /**
         * Escapes all potentially dangerous characters, so that the
         * resulting string can be safely inserted into attribute or
         * element text.
         * @param value
         * @returns {string} escaped text
         */
        function encodeEntities(value) {
            return value.
            replace(/&/g, '&amp;').
            replace(SURROGATE_PAIR_REGEXP, function (value) {
                var hi = value.charCodeAt(0);
                var low = value.charCodeAt(1);
                return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
            }).
            replace(NON_ALPHANUMERIC_REGEXP, function (value) {
                return '&#' + value.charCodeAt(0) + ';';
            }).
            replace(/</g, '&lt;').
            replace(/>/g, '&gt;');
        }

        /**
         * create an HTML/XML writer which writes to buffer
         * @param {Array} buf use buf.join('') to get out sanitized html string
         * @returns {object} in the form of {
         *     start: function(tag, attrs) {},
         *     end: function(tag) {},
         *     chars: function(text) {},
         *     comment: function(text) {}
         * }
         */
        function htmlSanitizeWriterImpl(buf, uriValidator) {
            var ignoreCurrentElement = false;
            var out = bind(buf, buf.push);
            return {
                start: function (tag, attrs) {
                    tag = lowercase(tag);
                    if (!ignoreCurrentElement && blockedElements[tag]) {
                        ignoreCurrentElement = tag;
                    }
                    if (!ignoreCurrentElement && validElements[tag] === true) {
                        out('<');
                        out(tag);
                        forEach(attrs, function (value, key) {
                            var lkey = lowercase(key);
                            var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
                            if ((lkey === 'style' && (value = allowedStyles(value)) !== '') || validAttrs[lkey] === true &&
                                (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
                                out(' ');
                                out(key);
                                out('="');
                                out(encodeEntities(value));
                                out('"');
                            }
                        });
                        out('>');
                    }
                },
                end: function (tag) {
                    tag = lowercase(tag);
                    if (!ignoreCurrentElement && validElements[tag] === true && voidElements[tag] !== true) {
                        out('</');
                        out(tag);
                        out('>');
                    }
                    // eslint-disable-next-line eqeqeq
                    if (tag === ignoreCurrentElement) {
                        ignoreCurrentElement = false;
                    }
                },
                chars: function (chars) {
                    if (!ignoreCurrentElement) {
                        out(encodeEntities(chars));
                    }
                }
            };
        }


        /**
         * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare
         * ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). This is undesirable since we don't want
         * to allow any of these custom attributes. This method strips them all.
         *
         * @param node Root element to process
         */
        function stripCustomNsAttrs(node) {
            while (node) {
                if (node.nodeType === window.Node.ELEMENT_NODE) {
                    var attrs = node.attributes;
                    for (var i = 0, l = attrs.length; i < l; i++) {
                        var attrNode = attrs[i];
                        var attrName = attrNode.name.toLowerCase();
                        if (attrName === 'xmlns:ns1' || attrName.lastIndexOf('ns1:', 0) === 0) {
                            node.removeAttributeNode(attrNode);
                            i -= 1;
                            l -= 1;
                        }
                    }
                }

                var nextNode = node.firstChild;
                if (nextNode) {
                    stripCustomNsAttrs(nextNode);
                }

                node = getNonDescendant('nextSibling', node);
            }
        }

        function getNonDescendant(propName, node) {
            // An element is clobbered if its `propName` property points to one of its descendants
            var nextNode = node[propName];
            if (nextNode && nodeContains.call(node, nextNode)) {
                throw $sanitizeMinErr('elclob', 'Failed to sanitize html because the element is clobbered: {0}', node.outerHTML || node.outerText);
            }
            return nextNode;
        }
    }

    angular.module('siemens.simaticit.common.widgets.textEditor')
        .provider('$textEditorSanitize', $textEditorSanitizeProvider);

})();
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.textEditor').service('common.textEditor.textEditorService', TextEditorService);

    /**
     * @ngdoc service
     * @access internal
     * @name common.textEditor.textEditorService
     * @module siemens.simaticit.common.widgets.textEditor
     *
     * @description
     * A factory to manage text editor content.
     *
     */
    TextEditorService.$inject = ['common.services.globalization.globalizationService', '$textEditorSanitize'];
    function TextEditorService(globalizationService, $textEditorSanitize) {
        var vm = this;
        var editorInstances = {};
        activate();

        function activate() {
            vm.setEditorInstance = setEditorInstance;
            vm.getEditorContent = getEditorContent;
            vm.setEditorContent = setEditorContent;
        }

        /**
        * @ngdoc method
        * @name common.textEditor.textEditorService#setEditorInstance
        * @access internal
        * @param {Object} CKEDITOR Global CKEDITOR Object.
        * @param {string} id Instance of rich text editor.
        * @description Sets the current rich text editor instance
        */
        function setEditorInstance(CKEDITOR, id) {
            editorInstances[id] = CKEDITOR.instances[id];
            CKEDITOR.config.language = globalizationService.getLocale();
        }

        /**
        * @ngdoc method
        * @name common.textEditor.textEditorService#getEditorContent
        * @access internal
        * @param {string} id Instance of rich text editor.
        * @description Gets the content in the current rich text editor instance as markup string
        */
        function getEditorContent(id) {
            var data = editorInstances[id].getData();
            var addTarget = new RegExp('<a href', 'g');
            return data.safeReplace(addTarget, '<a target=\"_blank\" href');
        }

        /**
        * @ngdoc method
        * @name common.textEditor.textEditorService#setEditorContent
        * @access internal
        * @param {string} data Rich text editor as markup string.
        * @param {string} id Instance of rich text editor.
        * @description Sets the content in the current rich text editor instance
        */
        function setEditorContent(data, id) {
            editorInstances[id].setData($textEditorSanitize(data));
        }
    }
})();
