/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function() {
    "use strict";

    var isWebkit = ('WebkitAppearance' in document.documentElement.style);

    CKEDITOR.plugins.add('imageDragResize', {
        onLoad: function() {
            if (!isWebkit) {
                return;
            }
            CKEDITOR.addCss('img::selection{color:rgba(0,0,0,0)}img.image-drag-resize{outline:1px dashed #000}#image-drag-resize{position:absolute;width:30px;height:30px;cursor:default;z-index:10001}#image-drag-resize span{display:none;position:absolute;top:0;left:0;width:30px;height:30px;background-size:100% 100%;opacity:.65;outline:1px dashed #000}#image-drag-resize i{position:absolute;display:block;width:5px;height:5px;background:#fff;border:1px solid #000}#image-drag-resize i.active,#image-drag-resize i:hover{background:#000}#image-drag-resize i.br,#image-drag-resize i.tl{cursor:nwse-resize}#image-drag-resize i.bm,#image-drag-resize i.tm{cursor:ns-resize}#image-drag-resize i.bl,#image-drag-resize i.tr{cursor:nesw-resize}#image-drag-resize i.lm,#image-drag-resize i.rm{cursor:ew-resize}body.dragging-br,body.dragging-br *,body.dragging-tl,body.dragging-tl *{cursor:nwse-resize!important}body.dragging-bm,body.dragging-bm *,body.dragging-tm,body.dragging-tm *{cursor:ns-resize!important}body.dragging-bl,body.dragging-bl *,body.dragging-tr,body.dragging-tr *{cursor:nesw-resize!important}body.dragging-lm,body.dragging-lm *,body.dragging-rm,body.dragging-rm *{cursor:ew-resize!important}');
        },
        init: function(selector) {
            if (!isWebkit) {
                return;
            }
            selector.on('contentDom', function(evt) {
                init(selector);
            });
        }
    });

    function init(selector) {
        var window = selector.window.$, document = selector.document.$;
        var snapToSize = 7;

        var resizer = new imageResizer(selector, { snapToSize: snapToSize });

        document.addEventListener('mousedown', function(e) {
            if (resizer.isHandler(e.target)) {
                resizer.initDrag(e);
            }
        }, false);

        function dragChange() {
            var selection = selector.getSelection();
            if (!selection) return;
            if (selection.getType() !== CKEDITOR.SELECTION_NONE && selection.getStartElement().is('img')) {
                if (!window.event || !window.event.button || window.event.button === 0) {
                    resizer.show(selection.getStartElement().$);
                }
            } else {
                resizer.hide();
            }
        }

        selector.on('dragChange', dragChange);

        selector.on('getData', function(e) {
            var html = e.data.dataValue || '';
            html = html.replace(/<div id="image-drag-resize"([\s\S]*?)<\/div>/i, '');
            html = html.replace(/\b(image-drag-resize)\b/g, '');
            e.data.dataValue = html;
        });

        selector.on('beforeUndoImage', function() {
            resizer.hide();
        });

        selector.on('afterUndoImage', function() {
            dragChange();
        });

        selector.on('blur', function() {
            resizer.hide();
        });

        selector.on('beforeModeUnload', function self() {
            selector.removeListener('beforeModeUnload', self);
            resizer.hide();
        });

        var resizeTimeout;
        selector.window.on('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(dragChange, 50);
        });
    }

    function imageResizer(selector, cfg) {
        this.selector = selector;
        this.window = selector.window.$;
        this.document = selector.document.$;
        this.cfg = cfg || {};
        this.init();
    }

    imageResizer.prototype = {
        init: function() {
            var container = this.container = this.document.createElement('div');
            container.id = 'image-drag-resize';
            this.preview = this.document.createElement('span');
            container.appendChild(this.preview);
            var handlers = this.handlers = {
                tl: this.createHandler('tl'),
                tm: this.createHandler('tm'),
                tr: this.createHandler('tr'),
                lm: this.createHandler('lm'),
                rm: this.createHandler('rm'),
                bl: this.createHandler('bl'),
                bm: this.createHandler('bm'),
                br: this.createHandler('br')
            };
            for (var n in handlers) {
                container.appendChild(handlers[n]);
            }
        },
        createHandler: function(name) {
            var el = this.document.createElement('i');
            el.classList.add(name);
            return el;
        },
        isHandler: function(el) {
            var handlers = this.handlers;
            for (var n in handlers) {
                if (handlers[n] === el) return true;
            }
            return false;
        },
        show: function(el) {
            this.el = el;
            if (this.cfg.snapToSize) {
                this.otherImages = toArray(this.document.getElementsByTagName('img'));
                this.otherImages.splice(this.otherImages.indexOf(el), 1);
            }
            var box = this.box = getBoundingBox(this.window, el);
            positionElement(this.container, box.left, box.top);
            this.document.body.appendChild(this.container);
            this.el.classList.add('image-drag-resize');
            this.showHandles();
        },
        hide: function() {
            var elements = this.document.getElementsByClassName('image-drag-resize');
            for (var i = 0; i < elements.length; ++i) {
                elements[i].classList.remove('image-drag-resize');
            }
            this.hideHandles();
            if (this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
        },
        initDrag: function(e) {
            if (e.button !== 0) {
                return;
            }
            var resizer = this;
            var drag = new DragEvent(this.window, this.document);
            drag.onStart = function() {
                resizer.showPreview();
                resizer.isDragging = true;
                resizer.selector.getSelection().lock();
            };
            drag.onDrag = function() {
                resizer.calculateSize(this);
                resizer.updatePreview();
                var box = resizer.previewBox;
                resizer.updateHandles(box, box.left, box.top);
            };
            drag.onRelease = function() {
                resizer.isDragging = false;
                resizer.hidePreview();
                resizer.hide();
                resizer.selector.getSelection().unlock();
                resizer.selector.fire('saveSnapshot');
            };
            drag.onComplete = function() {
                resizer.resizeComplete();
                resizer.selector.fire('saveSnapshot');
            };
            drag.start(e);
        },
        updateHandles: function(box, left, top) {
            left = left || 0;
            top = top || 0;
            var handlers = this.handlers;
            positionElement(handlers.tl, -3 + left, -3 + top);
            positionElement(handlers.tm, Math.round(box.width / 2) - 3 + left, -3 + top);
            positionElement(handlers.tr, box.width - 4 + left, -3 + top);
            positionElement(handlers.lm, -3 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handlers.rm, box.width - 4 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handlers.bl, -3 + left, box.height - 4 + top);
            positionElement(handlers.bm, Math.round(box.width / 2) - 3 + left, box.height - 4 + top);
            positionElement(handlers.br, box.width - 4 + left, box.height - 4 + top);
        },
        showHandles: function() {
            var handlers = this.handlers;
            this.updateHandles(this.box);
            for (var n in handlers) {
                handlers[n].style.display = 'block';
            }
        },
        hideHandles: function() {
            var handlers = this.handlers;
            for (var n in handlers) {
                handlers[n].style.display = 'none';
            }
        },
        showPreview: function() {
            this.preview.style.backgroundImage = 'url("' + this.el.src + '")';
            this.calculateSize();
            this.updatePreview();
            this.preview.style.display = 'block';
        },
        updatePreview: function() {
            var box = this.previewBox;
            positionElement(this.preview, box.left, box.top);
            resizeElement(this.preview, box.width, box.height);
        },
        hidePreview: function() {
            var box = getBoundingBox(this.window, this.preview);
            this.result = {width: box.width, height: box.height};
            this.preview.style.display = 'none';
        },
        calculateSize: function(data) {
            var box = this.previewBox = {top: 0, left: 0, width: this.box.width, height: this.box.height};
            if (!data) return;
            var attr = data.target.className;
            if (~attr.indexOf('r')) {
                box.width = Math.max(30, this.box.width + data.delta.x);
            }
            if (~attr.indexOf('b')) {
                box.height = Math.max(30, this.box.height + data.delta.y);
            }
            if (~attr.indexOf('l')) {
                box.width = Math.max(30, this.box.width - data.delta.x);
            }
            if (~attr.indexOf('t')) {
                box.height = Math.max(30, this.box.height - data.delta.y);
            }
            if (attr.indexOf('m') < 0 && !data.keys.shift) {
            var ratio = this.box.width / this.box.height;
            if (box.width / box.height > ratio) {
                box.height = Math.round(box.width / ratio);
            } else {
                box.width = Math.round(box.height * ratio);
            }
            }
            var snapToSize = this.cfg.snapToSize;
            if (snapToSize) {
                var others = this.otherImages;
                for (var i = 0; i < others.length; i++) {
                    var other = getBoundingBox(this.window, others[i]);
                    if (Math.abs(box.width - other.width) <= snapToSize && Math.abs(box.height - other.height) <= snapToSize) {
                        box.width = other.width;
                        box.height = other.height;
                        break;
                    }
                }
            }
            if (~attr.indexOf('l')) {
                box.left = this.box.width - box.width;
            }
            if (~attr.indexOf('t')) {
                box.top = this.box.height - box.height;
            }
        },
        resizeComplete: function() {
            resizeElement(this.el, this.result.width, this.result.height);
        }
    };

    function DragEvent(window, document) {
        this.window = window;
        this.document = document;
        this.events = {
            mousemove: bind(this.mousemove, this),
            keydown: bind(this.keydown, this),
            mouseup: bind(this.mouseup, this)
        };
    }

    DragEvent.prototype = {
        start: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.target = e.target;
            this.attr = e.target.className;
            this.startPos = {x: e.clientX, y: e.clientY};
            this.update(e);
            var events = this.events;
            this.document.addEventListener('mousemove', events.mousemove, false);
            this.document.addEventListener('keydown', events.keydown, false);
            this.document.addEventListener('mouseup', events.mouseup, false);
            this.document.body.classList.add('dragging-' + this.attr);
            this.onStart && this.onStart();
        },
        update: function(e) {
            this.currentPos = {x: e.clientX, y: e.clientY};
            this.delta = {x: e.clientX - this.startPos.x, y: e.clientY - this.startPos.y};
            this.keys = {shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey};
        },
        mousemove: function(e) {
            this.update(e);
            this.onDrag && this.onDrag();
            if (e.which === 0) {
                this.update(e);
                //this.mouseup(e);
            }
        },
        keydown: function(e) {
            if (e.keyCode === 27) {
                this.release();
            }
        },
        mouseup: function(e) {
            this.update(e);
            this.release();
            this.onComplete && this.onComplete();
        },
        release: function() {
            this.document.body.classList.remove('dragging-' + this.attr);
            var events = this.events;
            this.document.removeEventListener('mousemove', events.mousemove, false);
            this.document.removeEventListener('keydown', events.keydown, false);
            this.document.removeEventListener('mouseup', events.mouseup, false);
            this.onRelease && this.onRelease();
        }
    };

    function toArray(obj) {
        var len = obj.length, arr = new Array(len);
        for (var i = 0; i < len; i++) {
            arr[i] = obj[i];
        }
        return arr;
    }

    function bind(fn, ctx) {
        if (fn.bind) {
            return fn.bind(ctx);
        }
        return function() {
            fn.apply(ctx, arguments);
        };
    }

    function positionElement(el, left, top) {
        el.style.left = String(left) + 'px';
        el.style.top = String(top) + 'px';
    }

    function resizeElement(el, width, height) {
        el.style.width = String(width) + 'px';
        el.style.height = String(height) + 'px';
    }

    function getBoundingBox(window, el) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
            width: rect.width,
            height: rect.height
        };
    }
})();