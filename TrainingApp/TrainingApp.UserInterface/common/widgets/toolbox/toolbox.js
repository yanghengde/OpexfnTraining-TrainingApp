/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @access internal
    * @name siemens.simaticit.common.widgets.toolbox
    *
    * @description
    * This module provides functionalities related to toolbox controls.
    */
    angular.module('siemens.simaticit.common.widgets.toolbox', []);

})();

(function () {
    'use strict';

    /**
    * @ngdoc directive
    * @access internal
    * @name sitToolbox
    * @module siemens.simaticit.common.widgets.toolbox
    * @description
    * Displays the toolbox control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-toolbox sit-config="toolboxConfigObject">
    *       // sit-toolbox-section configuration
    * </sit-toolbox>
    * ```
    * @restrict E
    * @param {Object} sitConfig The object to configure the toolbox. For a description of this object see {@link toolboxOptions}
    *
    * @example
    * In a view template, you can use the **sitToolbox** as follows:
    *  ```
    * <div>
    *     <sit-toolbox sit-config="toolCtrl.config">
    *         <sit-toolbox-section sit-title="toolCtrl.title" sit-icon="toolCtrl.icon" sit-open="toolCtrl.open" sit-id="sec_one">
    *             <div>
    *                 First name:<br>
    *                 <input type="text" name="firstname" value="Mickey"><br>
    *                 Last name:<br>
    *                 <input type="text" name="lastname" value="Mouse"><br><br>
    *                 <input type="submit" value="Submit">
    *             </div>
    *         </sit-toolbox-section>
    *         <sit-toolbox-section sit-title="'2nd section toolbox'" sit-icon="fa fa-bus" sit-id="sec_two">
    *             <div><span class="fa fa-plus"> 1st Component</span></div><br />
    *             <div><span class="fa fa-minus"> 2nd Component</span></div><br />
    *             <div><span class="fa fa-car">3rd Component</span></div><br />
    *             <div><span class="fa fa-bus">4th Component</span></div><br />
    *         </sit-toolbox-section>
    *     </sit-toolbox>
    * </div>
    * ```
    * The following example shows how to configure a sit-toolbox widget:
    *
    * In Controller:
    * ```
    *    (function () {
    *    'use strict';
    *
    *    angular.module('siemens.simaticit.common.examples')
    *    .controller('toolboxController', ToolboxController);
    *    ToolboxController.$inject = ['$scope'];
    *    function ToolboxController($scope) {
    *        var vm = this;
    *        vm.collapseToolbox = collapseToolbox;
    *        vm.expandSm = expandSm;
    *        vm.expandMd = expandMd;
    *        vm.expandLg = expandLg;
    *        vm.config = {
    *            title: "Toolbox Title",
    *            titleVisibility: false,
    *            closeOthers: false,
    *            collapsible: true,
    *            collapsed: true,
    *            placement: "left",
    *            size: "sm"
    *            onSectionStatusChange: function (sectionStatus) {
    *                //code goes here
    *            },
    *            onToolboxStatusChange: function (toolboxStatus) {
    *                //code goes here
    *            }
    *        }
    *
    *        vm.open = true;
    *        vm.title = "First ToolBox section";
    *        vm.icon = "fa fa-car";
    *
    *        function collapseToolbox() {
    *            vm.config.collapse();
    *        };
    *
    *        function expandSm() {
    *            vm.config.expandSm();
    *        };
    *        function expandMd() {
    *            vm.config.expandMd();
    *        };
    *        function expandLg() {
    *            vm.config.expandLg();
    *        };
    *    };
    *})();
    * ```
    */

    /**
    * @ngdoc type
    * @access internal
    * @name toolboxOptions
    * @module siemens.simaticit.common.widgets.toolbox
    * @description An object containing the configuration settings for the toolbox.
    * @property {String} [title=undefined] The title of the toolbox to be displayed.
    * @property {Boolean} [titleVisibility=true] The property hides/shows the toolbox title.
    * @property {Boolean} [collapsible=true] _(Optional)_ Specifies whether or not the user will able to collapse and expand the toolbox.
    * @property {Boolean} [collapsed=false] _(Optional)_ Specifies whether or not the toolbox will be initially collapsed when the page is loaded.
    * If collapsible is false, the collapsed value will be false by default.

    * @property {String} [placement="right"] _(Optional)_ Specifies the position of the toolbox.
    *
    * It supports the following placement options:
    * * **left**: The toolbox will appear from the left side of the screen.
    * * **right**: The toolbox will appear from the right side of the screen.
    *
    * @property {String} [size="sm"] _(Optional)_ Specifies the size of the toolbox.
    *
    * It supports the following size options:
    * * **sm**: the size of the toolbox will be 25% of the screen.
    * * **md**: the size of the toolbox will be 50% of the screen.
    * * **lg**: the size of the toolbox will be 66% of the screen.
    *
    * @property {Boolean} [closeOthers=true] _(Optional)_ Specifies whether opening a toolbox-section causes other toolbox-sections to close or not.
    * @property {Function} [onToolboxStatusChange=undefined] _(Optional)_ A callback function to be called when the toolbox open/close arrow icon is clicked.
    * The function is passed with one argument:
    *
    * * **status:** The current status of the toolbox. The value of the argument will be either **open** or **close**.
    *
    * @property {Function} [onSectionStatusChange=undefined] _(Optional)_ A callback function to be called when the toolbox-section's open/close arrow icon is clicked.
    * The function is passed with one argument of type object and the argument has the following properties :
    *
    * * **id:** The toolbox-section id.
    * * **status:** The current status of the toolbox-section.The value of the property will be either **open** or **close**.
    */


    angular.module('siemens.simaticit.common.widgets.toolbox').directive('sitToolbox', ['$window', '$timeout', function ($window, $timeout) {
        return {
            scope: true,
            restrict: 'E',
            transclude: true,
            bindToController: {
                config: '=?sitConfig'
            },
            templateUrl: 'common/widgets/toolbox/toolbox.html',
            controller: ToolboxController,
            controllerAs: 'toolboxCtrl',
            link: function (scope, element, attrs, ctrl) {
                    var eventListner = [];
                    var TOOLBOX_HEADER_HEIGHT = ctrl.isTitleShown ? 40 : 0;
                    var toolboxContaier = element.find('.toolbox-container');
                    var toolboxSectionContainer = element.find('.toolbox-section-container');

                    function setToolboxHeight() {
                        ctrl.windowHeight = element[0].parentElement.offsetHeight;
                        ctrl.toolboxoffsetTop = 0;
                        ctrl.toolboxHeight = ctrl.windowHeight - ctrl.toolboxoffsetTop;
                        ctrl.toolboxHeaderHeight = TOOLBOX_HEADER_HEIGHT;
                        ctrl.toolboxContainerHeight = ctrl.toolboxHeight - ctrl.toolboxHeaderHeight;
                        toolboxContaier.css('height', ctrl.toolboxHeight + 'px');
                        toolboxSectionContainer.css('height', ctrl.toolboxContainerHeight + 'px');
                    }

                    //Timeout used to fix IE rendering issue
                    $timeout(function () {
                        rearrangeToolboxLayout();
                    });

                    function rearrangeToolboxLayout() {
                        ctrl.setToolboxWidth();
                            $timeout(function () {   //Timeout used to fix IPad rendering issue
                                setToolboxHeight();
                            },100);
                    }

                    eventListner[eventListner.lenght] = scope.$on('sit-layout-change', rearrangeToolboxLayout);
                    scope.$on('$destroy', onDirectiveDestroy);

                    function onDirectiveDestroy() {
                        eventListner.forEach(function (listner) {
                            listner();
                        });
                    }
                }
        };
    }]);

    ToolboxController.$inject = ['$element'];
    function ToolboxController($element) {
        var vm = this;

        activate();

        function activate() {
            init();
            initMethods();
            initAPI();
            setToolboxWidth();
            expandToolboxByDefault();
        }

        function init() {
            vm.styles = {};
            vm.toolboxSections = [];
            vm.isCollapsible = typeof vm.config.collapsible === 'boolean' ? vm.config.collapsible : true;
            vm.isCollapsed = typeof vm.config.collapsed === 'boolean' ? vm.config.collapsed : false;
            vm.align = vm.config.placement ? vm.config.placement : "right";
            vm.isTitleShown = typeof vm.config.titleVisibility === 'boolean' ? vm.config.titleVisibility : true;
            vm.size = vm.config.size ? vm.config.size : "sm";
            vm.closeOthers = typeof vm.config.closeOthers === 'boolean' ? vm.config.closeOthers : true;
        }

        function initMethods() {
            vm.toggleSection = toggleSection;
            vm.setToolboxWidth = setToolboxWidth;
            vm.closeToolboxSections = closeToolboxSections;
            vm.addToolboxSection = addToolboxSection;

        }

        // Toolbox API
        function initAPI() {
            vm.config.collapse = collapse;
            vm.config.expandSm = expandSm;
            vm.config.expandMd = expandMd;
            vm.config.expandLg = expandLg;
            vm.config.getSectionStatus = getSectionStatus;
            vm.config.disableToolboxSection = disableToolboxSection;
            vm.config.enableToolboxSection = enableToolboxSection;
            vm.config.expandToolboxSection = expandToolboxSection;
            vm.config.collapseToolboxSection = collapseToolboxSection;
        }

        // toogle toolbox
        function toggleSection() {
            var status;
            vm.isCollapsed = !vm.isCollapsed;
            status = vm.isCollapsed ? 'close' : 'open';
            typeof vm.config.onToolboxStatusChange === 'function' && vm.config.onToolboxStatusChange(status);
        }

        // Setting width of the toolbox
        function setToolboxWidth() {

        }

        // Toolbox should be expanded by default, if isCollapsible is false
        function expandToolboxByDefault() {
            if (!vm.isCollapsible) {
                vm.isCollapsed = false;
            }
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#collapse
        *
        * @description
        * An API method which collapses the toolbox if it is open.
        *
        */
        function collapse() {
            if (vm.isCollapsed === false) {
                vm.isCollapsed = true;
            }
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#expandSm
        *
        * @description
        * An API method which expands the tollbox to small size.
        *
        */
        function expandSm() {
            vm.size = "sm";
            vm.isCollapsed = false;
            setToolboxWidth();
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#expandMd
        *
        * @description
        * An API method which expands the tollbox to medium size.
        *
        */
        function expandMd() {
            vm.size = "md";
            vm.isCollapsed = false;
            setToolboxWidth();
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#expandLg
        *
        * @description
        * An API method which expands the tollbox to large size.
        *
        */
        function expandLg() {
            vm.size = "lg";
            vm.isCollapsed = false;
            setToolboxWidth();
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#disableToolboxSection
        *
        * @description
        * An API method which disbales the toolbox-section.
        *
        * @param {String} id The toolbox-section id which needs to be disabled.
        */
        function disableToolboxSection(sectionId) {
            var i, sections = vm.toolboxSections, sectionLength = sections.length;
            for (i = 0; i < sectionLength; i++) {
                if (sections[i].sitId === sectionId) {
                    sections[i].isExpanded = false;
                    sections[i].isDisabled = true;
                    break;
                }
            }
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#enableToolboxSection
        *
        * @description
        * An API method which enables the toolbox-section.
        *
        * @param {String} id The toolbox-section id which needs to be enabled.
        */
        function enableToolboxSection(sectionId) {
            var i, sections = vm.toolboxSections, sectionLength = sections.length;
            for (i = 0; i < sectionLength; i++) {
                if (sections[i].sitId === sectionId) {
                    sections[i].isDisabled = false;
                    break;
                }
            }
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#expandToolboxSection
        *
        * @description
        * An API method which expands the toolbox-section.
        *
        * @param {String} id The toolbox-section id which needs to be expanded.
        */
        function expandToolboxSection(sectionId) {
            var i, sections = vm.toolboxSections, sectionLength = sections.length;
            for (i = 0; i < sectionLength; i++) {
                if (sections[i].sitId === sectionId && sections[i].isDisabled === false) {
                    sections[i].isExpanded = true;
                    break;
                }
            }
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#collapseToolboxSection
        *
        * @description
        * An API method which collapses the toolbox-section.
        *
        * @param {String} id The toolbox-section id which needs to be collapsed.
        */
        function collapseToolboxSection(sectionId) {
            var i, sections = vm.toolboxSections, sectionLength = sections.length;
            for (i = 0; i < sectionLength; i++) {
                if (sections[i].sitId === sectionId && sections[i].isDisabled === false) {
                    sections[i].isExpanded = false;
                    break;
                }
            }
        }

        /**
        * @ngdoc method
        * @access internal
        * @module siemens.simaticit.common.widgets.toolbox
        * @name toolboxOptions#getSectionStatus
        *
        * @description
        * An API method which gives the toolbox-section status.
        *
        * @param {String} id The toolbox-section id whose status needs to be returned.
        * @return {Object} The toolbox-section status.
        */
        function getSectionStatus(sectionId) {
            var i, sections = vm.toolboxSections, sectionLength = sections.length, sectionStatus = null;
            for (i = 0; i < sectionLength; i++) {
                if (sections[i].sitId === sectionId) {
                    sectionStatus = {
                        id: sections[i].sitId,
                        isDisabled: sections[i].isDisabled,
                        isOpened: sections[i].isExpanded
                    };
                    break;
                }
            }
            return sectionStatus;
        }


        function closeToolboxSections(openToolboxSection) {
            if (vm.closeOthers) {
                angular.forEach(vm.toolboxSections, function (toolboxSection) {
                    if (!_.isEqual(toolboxSection, openToolboxSection)) {
                        toolboxSection.isExpanded = false;
                    }
                });
            }
        }

        function addToolboxSection(toolboxSection) {
            vm.toolboxSections.push(toolboxSection);

        }


    }
})();

(function () {
    'use strict';

    /**
    * @ngdoc directive
    * @access internal
    * @name sitToolboxSection
    * @module siemens.simaticit.common.widgets.toolbox
    * @description
    * Displays a Toolbox Section in a Toolbox.
    *
    * @usage
    * As an element:
    * ```
    * <sit-toolbox-section sit-title="Toolbox section Title" sit-icon="icon" svg-icon="svgIcon" sit-open="isOpen">
    *       // Section contents
    * </sit-toolbox-section>
    * ```
    *
    * @restrict E
	*
    * @param {String} sit-title The title of the sit-toolbox section to be displayed.
    * @param {String} sit-icon The font awesome icon for the toolbox section.
    * @param {String} [sit-open=false] _(Optional)_ Specifies intially if the toolbox section should be collapsed or exapanded. Values can be either true or false.
    * @param {String} [svg-icon] _(Optional)_ The path of the SVG icon for the toolbox section.
    *
    */

    angular.module('siemens.simaticit.common.widgets.toolbox').directive('sitToolboxSection', ToolboxSectionDirective);
    ToolboxSectionDirective.$inject = ['$timeout'];
    function ToolboxSectionDirective($timeout) {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            bindToController: {
                sitTitle: '@',
                sitIcon: '@',
                svgIcon:'=?',
                sitOpen: '@?',
                sitId: '@'
            },
            require: ['^sitToolbox', 'sitToolboxSection'],
            templateUrl: 'common/widgets/toolbox/toolbox-section.html',
            link: function (scope, element, attrs, ctrls) {
                var sitToolboxCtrl = ctrls[0];
                var sitToolboxSecCtrl = ctrls[1];
                var eventListner = [];
                var closeOthers, collapsedSectionHeight, SECTION_HEADER_HEIGHT, SECTION_CONTENT_MARGIN, LOAD_TIME, sectionContent, openClass;

                initDefaults();

                function initDefaults() {
                    LOAD_TIME = 10;
                    SECTION_HEADER_HEIGHT = 36;
                    SECTION_CONTENT_MARGIN = 14;
                    closeOthers = sitToolboxCtrl.closeOthers;
                    openClass = 'toolbox-section-content-show';
                    sectionContent = element.find('.toolbox-section-content');
                    sitToolboxCtrl.addToolboxSection(sitToolboxSecCtrl);
                }

                scope.$watch(function () {
                    return sitToolboxSecCtrl.isExpanded
                }, function (value) {
                    element.toggleClass(openClass, value);
                    if (value) {
                        $timeout(function () {
                            scope.$broadcast('sit-layout-change', { eventSource: 'toolbox' });
                        }, LOAD_TIME);
                    }
                    if (value && closeOthers) {
                        sitToolboxCtrl.closeToolboxSections(sitToolboxSecCtrl);
                        calculateSecHeight();
                    }
                }, true);

                eventListner[eventListner.lenght] = scope.$on('sit-layout-change', rearrangeSectionLayout);

                function calculateSecHeight() {
                    collapsedSectionHeight = (sitToolboxCtrl.toolboxContainerHeight - ((sitToolboxCtrl.toolboxSections.length * SECTION_HEADER_HEIGHT) + SECTION_CONTENT_MARGIN));
                    sectionContent.css('height', collapsedSectionHeight + 'px');
                }

                function rearrangeSectionLayout() {
                    if (closeOthers) {
                        $timeout(function () {
                            calculateSecHeight();
                        }, 200);
                        
                    }
                }
                scope.$on('$destroy', onDirectiveDestroy);

                function onDirectiveDestroy() {
                    eventListner.forEach(function (listner) {
                        listner();
                    });
                }
            },
            controller: ToolboxSectionController,
            controllerAs: 'toolboxSecCtrl'
        };
    }

    ToolboxSectionController.$inject = ['$scope'];
    function ToolboxSectionController($scope) {
        var vm = this;
        vm.displayIcon = null;
        var toolboxCtrl, status;

        function activate() {
            init();
        }

        function init() {
            toolboxCtrl = $scope.$parent.$parent.toolboxCtrl;
            vm.isDisabled = false;
            vm.isExpanded = vm.sitOpen === 'true' ? true : false;
            vm.toggleSection = toggleSection;
            if (vm.svgIcon) {
                vm.displayIcon = {
                    path: vm.svgIcon,
                    size: '16px'
                };
            }
        }

        function toggleSection() {
            vm.isExpanded = !vm.isExpanded;
            status=vm.isExpanded?'open':'close';
            typeof toolboxCtrl.config.onSectionStatusChange  === 'function'&& toolboxCtrl.config.onSectionStatusChange({ id: vm.sitId, status: status });
        }

        activate();
    }

})();
