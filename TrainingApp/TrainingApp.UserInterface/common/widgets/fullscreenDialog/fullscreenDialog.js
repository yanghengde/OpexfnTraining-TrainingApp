/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
    * @ngdoc module
    * @access internal
    * @name siemens.simaticit.common.widgets.fullscreenDialog
    *
    * @description
    * This module provides functionalities to display a fullscreen dialog .
    */

    angular.module('siemens.simaticit.common.widgets.fullscreenDialog', []);

})();

(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @access internal
   * @name sitContextInfo
   * @module siemens.simaticit.common.widgets.fullscreenDialog
   * @description
   * Displays a popup menu.
   *
   * @usage
   * As an element:
   * ```
   * <sit-context-info sit-config="configObj"></sit-context-info>
   * ```
   * @restrict E
   *
   * @param {ContextConfig} sitConfig  For a description of this object see {@link ContextConfig}.
   *
   * @example
   * The following example shows how to configure the context object in a template:
   *
   * ```
   * <sit-context-info sit-config="ctrl.config"></sit-context-info>
   * ```
   *
   * The example below shows how to declare a context configuration object:
   * ```
   *    this.config = {
   *            icon: 'fa fa-info-circle',
   *            svgIcon: 'common/icons/cmdCheckMark16.svg',
   *            tooltip:'Info',
   *            contexts: [
   *              { icon: "sit sit-user", label: "Authorized", separator: ':', value: "true", tooltip: "true" },
   *              { icon: "fa fa-check", label: "Status", separator: ':', value: "OK", tooltip: "OK" },
   *              { icon: "sit sit-deploy", label: "Deployed", separator: '-', value: "true" },
   *              { icon: "sit sit-user", label": "Configuration Status", value: "true" },
   *              { svgIcon: 'common/icons/cmdLock16.svg', label": "Is Locked", value: "true" }
   *            ]
   *        };
   * ```
   */
    /**
    * @ngdoc type
    * @access internal
    * @module siemens.simaticit.common.widgets.fullscreenDialog
    * @name ContextConfig
    * @description
    * Object to configure the context menu.
    *
    * @property {String} icon Icon for the context info. It accepts a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon.
    * @property {String} svgIcon Icon for the context info. It accepets the full path of valid svg icon.
    * @property {String} tooltip Tooltip text for context info.
    * @property {Array<ContextInfo>} contexts The information to be displayed in the popup menu. To configure the info object see {@link ContextInfo}.
    * @example
    * The following example shows how to configure the Message object:
    * ```
    *            icon: 'fa fa-info-circle',
    *            svgIcon: 'common/icons/cmdCheckMark16.svg',
    *            tooltip:'Info',
    *            contexts: [
    *              { icon: "fa fa-check", label: "Status", separator: ':', value: "OK", tooltip: "OK" },
    *              { icon: "sit sit-user", label: "Configuration Status", separator: ':', value: "true", tooltip: "true" },
    *              { svgIcon: 'common/icons/cmdLock16.svg', label": "Is Locked", value: "true" }
    *             ]
    * ```
    */
    /**
   * @ngdoc type
   * @access internal
   * @module siemens.simaticit.common.widgets.fullscreenDialog
   * @name ContextInfo
   * @description
   * Object to display the context info in context menu.
   *
   * @property {String} icon Icon for the context info. It accepts a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon.
   * @property {String} svgIcon Icon for the context info. It accepets the full path of valid svg icon.
   * @property {String} label Label for the context info.
   * @property {String} separator A character which acts as a separation symbol between label and value field.
   * @property {String} value Value for the context info.
   * @property {String} tooltip Tooltip text for **value** property.
   * @example
   * The following example shows how to configure the Message object:
   * ```
   *  {
   *     icon: 'fa fa-info-circle',
   *     svgIcon: 'common/icons/cmdCheckMark16.svg',
   *     label: 'Status',
   *     separator: ':'
   *     value: 'Ok'
   *  }
   * ```
   */

    angular.module('siemens.simaticit.common.widgets.fullscreenDialog')
   .directive('sitContextInfo', sitContextInfoDirective);

    function sitContextInfoDirective() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                contextConfig: "=sitConfig"
            },
            controller: SitContextInfoController,
            controllerAs: 'contextCtrl',
            templateUrl: 'common/widgets/fullscreenDialog/fullscreen-context.html'
        };

    }
    SitContextInfoController.$inject = ["$scope", "$element", "$document", "$translate"];
    function SitContextInfoController($scope, $element, $document, $translate) {
        var vm = this;
        var isMenuContextShown, contextMenuElement, menuButton, MENU_BUTTON_HALF_WIDTH, MENU_ARROWUP_HALF_WIDTH, preventContextClose;

        function activate() {
            init();
            initMethod();
        }

        function init() {
            if (vm.contextConfig.svgIcon) {
                vm.svgIcon = {
                    path: vm.contextConfig.svgIcon,
                    size: '16px'
                }
            }
            if (!vm.contextConfig.icon && !vm.contextConfig.svgIcon) {
                vm.svgIcon = {
                    path: "common/icons/cmdParts24.svg",
                    size: '16px'
                }
            }

            vm.menuIcon = vm.contextConfig.icon ? vm.contextConfig.icon : 'fa fa-cube';
            vm.tooltip = vm.contextConfig.tooltip ? vm.contextConfig.tooltip : $translate.instant('contextInfo.title');
            isMenuContextShown = false;
            preventContextClose = true;
            contextMenuElement = $element.find('div[data-internal-type=contextMenu]');
            menuButton = $element.find('button[data-internal-type=menuButton]');

            // half width of popup-button and popup-arrowup icon to align the popup menu to center
            MENU_BUTTON_HALF_WIDTH = 31;
            MENU_ARROWUP_HALF_WIDTH = 9;
        }

        function initMethod() {
            vm.toggleContextMenu = toggleContextMenu;
        }

        function toggleContextMenu(event) {
            //A variable used to prevent click event when the context menu is opened.
            preventContextClose = false;
            isMenuContextShown = !isMenuContextShown;
            if (isMenuContextShown) {
                preventContextClose = true;
                contextMenuElement.css('display', 'block');
                setContextMenuPosition();
                registerClickEvent();
            }
        }

        function registerClickEvent() {
            //event to prevent close on context-menu click
            contextMenuElement.find('div[data-internal-type=contextMenuPopup]').on('click', preventClick);

            //event to close the context menu
            $document.on('click', hideContextMenu);
        }

        function setContextMenuPosition() {
            //context menu button offset width
            var menuButtonLeft = menuButton.offset().left;

            //context menu dropdown(arrow-up) icon offset width
            var menuDropdownIconLeft = $element.find('div[data-internal-type=menuDropdownIcon]').offset().left;

            //context menu popup width
            var popupMenuWidth = contextMenuElement.find('div[data-internal-type=contextMenuPopup]').width();

            //left position for the popup
            var popupLeft = menuButtonLeft + MENU_BUTTON_HALF_WIDTH - MENU_ARROWUP_HALF_WIDTH - menuDropdownIconLeft;

            //left position for the popup menu
            var popupMenuLeft = -(popupMenuWidth / 2);

            var defaultLeftPosition = menuButtonLeft + MENU_BUTTON_HALF_WIDTH - MENU_ARROWUP_HALF_WIDTH;

            //check if popup menu left position exceeds view port
            var left = popupMenuLeft < -defaultLeftPosition ? -defaultLeftPosition : popupMenuLeft;

            //left position for popup and popup-menu
            contextMenuElement.css('left', popupLeft);
            contextMenuElement.find('div[data-internal-type=contextMenuPopup]').css('left', left);
        }

        function preventClick(event) {
            event.stopPropagation();
        }

        function hideContextMenu(event) {
            if (preventContextClose) {
                preventContextClose = false;
            } else {
                //hide context menu
                isMenuContextShown = false;
                contextMenuElement.css({ 'display': 'none', 'left': 0 });

                //un register context menu events
                $document.off('click', hideContextMenu);
                contextMenuElement.off('click', preventClick);
            }
        }

        $scope.$on('$destroy', function () {
            $document.off('click', hideContextMenu);
            contextMenuElement.off('click', preventClick);
        });

        activate();
    }
})();

(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @access internal
   * @name sitFullscreenDialog
   * @module siemens.simaticit.common.widgets.fullscreenDialog
   * @description
   * Displays full screen
   *
   * @usage
   * As an element:
   * ```
   * <sit-fullscreen-dialog sit-close-callback="closeCallbackFunction()">
   *    // Content
   * </sit-fullscreen-dialog>
   * ```
   * @restrict E
   * @param {function} sitCloseCallback  The function to be called on close button click.
   *
   * @example
   * The following example shows how to configure a sit-toolbox widget:
   *
   * In a view template:
   *  ```
   * <sit-fullscreen-dialog sit-close-callback="ctrl.closeCallback()">
   *     <sit-fullscreen-header>
   *         <sit-title>Full Screen dialog title </sit-title>
   *         <sit-context-info sit-config="ctrl.config"></sit-context-info>
   *         <sit-command-bar sit-type="Tool" sit-label-align="right">
   *         <sit-command ng-click="ctrl.callback" ng-show="true" sit-icon="fa-toggle-on" sit-name="Button1" sit-type="toggle" sit-tooltip="toggle">Button1</sit-command>
   *         <sit-command ng-click="ctrl.callback" ng-show="true" sit-icon="fa-toggle-on" sit-name="Button2" sit-type="toggle" sit-tooltip="toggle">Button2</sit-command>
   *         </sit-command-bar>
   *     </sit-fullscreen-header>
   *      <div style="flex:1; position:relative; overflow:hidden">
   *         // Custom Content goes here
   *      </div>
   * </sit-fullscreen-dialog>
   *  ```
   *
   * In Controller:
   * ```
   * (function () {
   *     'use strict';
   *
   *     var app = angular.module('siemens.simaticit.common.examples');
   *     app.controller('DialogDevController', ['$scope', '$state', function ($scope, $state) {
   *         this.config = {
   *             contexts: [{ icon: 'fa-car', label: 'id', value: '000' },
   *                         { icon: 'fa-car', label: 'Configuration', value: 'Deleted' },
   *                         { icon: 'fa-car', label: 'RunTime Status', value: 'Stopped' }
   *             ]
   *         }
   *
   *         this.closeCallback = function () {
   *             $state.go('sampleState');
   *         }
   *     }]);
   * })();
   * ```
   */

    var app = angular.module('siemens.simaticit.common.widgets.fullscreenDialog');

    app.directive('sitFullscreenDialog', sitFullscreenDialogDirective);

    function sitFullscreenDialogDirective() {
        return {
            bindToController: {
                sitCloseCallback: '&'
            },
            scope: {},
            restrict: 'E',
            transclude: true,
            templateUrl: 'common/widgets/fullscreenDialog/fullscreen-dialog.html',
            controller: DialogController,
            controllerAs: 'dialogCtrl'
        };
    }

    DialogController.$inject = ['$scope'];
    function DialogController($scope) {
        function init() { }

        function activate() {
            init();
        }

        $scope.$on('$destroy', function () {
        });

        activate();
    }

})();

(function () {
    'use strict';
    /**
   * @ngdoc directive
   * @access internal
   * @name sitFullscreenHeader
   * @module siemens.simaticit.common.widgets.fullscreenDialog
   * @description
   * Displays a header in the full screen dialog.
   *
   * @usage
   * As an element:
   * ```
   * <sit-fullscreen-header>
   *    // Content
   * </sit-fullscreen-header>
   * ```
   * @restrict E
   *
   * @example
   * The following example shows how to configure the context object in a template:
   * ```
   * <sit-fullscreen-header>
   *     <sit-title>Full Screen dialog title</sit-title>
   *     <sit-context-info sit-config="ctrl.config"></sit-context-info>
   *     <sit-command-bar sit-type="Tool" sit-label-align="right">
   *         <sit-command ng-click="ctrl.callback" ng-show="true" sit-icon="fa-toggle-on" sit-name="Button1" sit-type="toggle" sit-tooltip="toggle">Button1</sit-command>
   *         <sit-command ng-click="ctrl.callback" ng-show="true" sit-icon="fa-toggle-on" sit-name="Button2" sit-type="toggle" sit-tooltip="toggle">Button2</sit-command>
   *     </sit-command-bar>
   * </sit-fullscreen-header>
   * ```
   */

    var app = angular.module('siemens.simaticit.common.widgets.fullscreenDialog');

    app.directive('sitFullscreenHeader', sitFullscreenHeaderDirective);

    function sitFullscreenHeaderDirective() {
        return {
            bindToController: {

            },
            scope: {},
            restrict: 'E',
            transclude: true,
            require: ['sitFullscreenHeader', '^sitFullscreenDialog'],
            templateUrl: 'common/widgets/fullscreenDialog/fullscreen-header.html',
            controller: SitFullscreenHeaderController,
            controllerAs: 'headerCtrl',
            link: function (scope, elem, attr, ctrl) {
                ctrl[0].sitCloseCallback = ctrl[1].sitCloseCallback;
                var childElements = elem.find('div[ng-transclude]').children();
                childElements.each(function (index, element) {
                    var classIdentifier = element.tagName.toLocaleLowerCase().split('sit-')[1];
                    $(element).wrap('<div class="fullscreen-' + classIdentifier + '-container"></div>');
                })
            }
        };
    }

    SitFullscreenHeaderController.$inject = ['$scope'];
    function SitFullscreenHeaderController($scope) {

        function init() {
        }

        function activate() {
            init();
        }

        $scope.$on('$destroy', function () {
        });

        activate();
    }

})();

(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @access internal
   * @name sitTitle
   * @module siemens.simaticit.common.widgets.fullscreenDialog
   * @description
   * Displays a title for full screen dialog.
   *
   * @usage
   * As an element:
   * ```
   * <sit-title>titleString</sit-title>
   * ```
   * @restrict E
   *
   * @example
   * The following example shows how to use sitTitle widget in template:
   * ```
   *     <sit-title>Fullscreen Title</sit-title>
   * ```
   */
    angular.module('siemens.simaticit.common.widgets.fullscreenDialog').directive('sitTitle', sitTitleDirective);

    function sitTitleDirective() {
        return {
            bindToController: {},
            scope: {},
            restrict: 'E',
            transclude: true,
            templateUrl: 'common/widgets/fullscreenDialog/fullscreen-title.html',
            controller: SitTitleController,
            controllerAs: 'titleCtrl',
            link: function (scope, elem, attr, ctrl) {
                elem.on('mouseenter', setTitleText);

                function setTitleText() {
                    var titleElement = this.parentElement;
                    var tooltipText = this.children[0].innerText;
                    if (titleElement.offsetWidth < titleElement.scrollWidth) {
                        titleElement.setAttribute('title', tooltipText);
                    } else {
                        titleElement.removeAttribute('title');
                    }
                }

                scope.$on('$destroy', function () {
                    elem.off('mouseenter', setTitleText);
                });
            }
        };
    }

    function SitTitleController() { }
})();
