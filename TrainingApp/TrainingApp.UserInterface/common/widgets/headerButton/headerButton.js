/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
   * @ngdoc module
   * @access internal
   * @name siemens.simaticit.common.widgets.headerButton
   *
   * @description
   * This module provides functionalities to display buttons and configure dropdown menu.
   */
    angular.module('siemens.simaticit.common.widgets.headerButton', []);
}());

(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @access internal
    * @name sitHeaderButton
    * @module siemens.simaticit.common.widgets.headerButton
    * @description
    * Displays button and configured dropdown menu.
    *
    * @usage
    * As an element:
    * ```
    * <sit-header-button
                   sit-id="hdrbtn1"
                   sit-icon="fontAwesomeIcon"
                   sit-title="titleString"
                   sit-on-click="callbackFunction"
                   sit-api="objectLiteral">
    * </sit-header-button>
    * ```
    * @restrict E
    *
    * @param {String} [sit-id=undefined] unique id of the header button.
    * @param {String} sit-icon Font-Awesome icon.
    * @param {String} sit-svg-icon _(Optional)_
    * The SVG icon to be displayed. Ex - svgIcon:'common/icons/indicatorCompleted16.svg'.
    * @param {String} sit-cmd-icon _(Optional)_
    * The command icon to be displayed. This is used only if the svgIcon is not provided.
    * @param {String} [sit-title = undefined] _(Optional)_ The button title text.
    * @param {Function} [sit-on-click = undefined] A function to be called on button click.
    * @param {Object} [sit-api = undefined] Return a set of {@link  APIs} to configure the dropdown menu for the button.
    *
    * @example
    * In template **sit-header-button** can be configured as follows:
    *```
    * <sit-header-button
                   sit-id="vm.button.id"
                   sit-icon="vm.button.icon"
                   sit-svg-icon="vm.button.svgIcon"
                   sit-title="vm.button.title"
                   sit-on-click="vm.button.onClick"
                   sit-api="vm.button.menuAPI">
    * </sit-header-button>
    *```
    * The following example shows how to configure a header-button widget in controller:
    * ```
    *   self.button = {
    *        id: 'id1',
    *        icon: 'fa-user',
    *        svgIcon: 'common/icons/indicatorCompleted16.svg',
    *        title: 'User',
    *        onClick: self.configureDropdown,
    *        menuAPI: {}
    *    }
    *
    *    self.configureDropdown = function () {
    *        var menuConfig = {
    *            templateuri: './template.html',
    *            sticky: true
    *        }
    *        //open dropdown
    *        self.button.menuAPI.openMenu(menuConfig);
    *    }
    *
    * ```
    * The dropdown template can be configured as:
    * ```
    *<div style="width:200px; height: 100px">
    *<!--Dropdown dimensions are configured here-->
    *   <ul>
    *       <li>My Profile</li>
    *       <li>My Subscription</li>
    *       <li>Log Out</li>
    *   </ul>
    *</div>
    *```
    */
    /**
    * @ngdoc type
    * @access internal
    * @name MenuConfigObject
	* @module siemens.simaticit.common.widgets.headerButton
	* @description An object to configure button dropdown menu.
    * @property {String} templateuri The path to a template to be rendered within the dropdown.
    * @property {Boolean} [sticky=false] If set to true, the dropdown will not be closed unless the **closeMenu** method is called.
    * Otherwise, the dropdown menu will be closed automatically on outside click.
    */
    /**
    * @ngdoc type
    * @access internal
    * @name APIs
    * @module siemens.simaticit.common.widgets.headerButton
	* @description Dropdown menu configuration API's.
    */
    angular.module('siemens.simaticit.common.widgets.headerButton', []).directive('sitHeaderButton', headerButton);

    function headerButton() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                id: '=sitId',
                icon: '=sitIcon',
                title: '=?sitTitle',
                onClick: '=?sitOnClick',
                api: '=?sitApi',
                svgIcon: "=?sitSvgIcon",
                cmdIcon:"=?sitCmdIcon"
            },
            controller: HeaderButtonController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/headerButton/headerButton.html'
        };
    }

    HeaderButtonController.$inject = ['$element'];
    function HeaderButtonController($element) {
        var vm = this;
        activate();

        function activate() {
            init();
            initAPI();
            if (vm.svgIcon) {
                vm.displayIcon = {
                    path: vm.svgIcon,
                    size: '16px'
                };
            }else if(vm.cmdIcon){
                vm.displayIcon = {
                    prefix: "cmd",
                    name: vm.cmdIcon,
                    suffix: '24',
                    size:'16px'
                };
            }
        }

        function init() {
            vm.showDropdown = false;
            vm.templateuri = '';
            vm.displayIcon = null;
            vm.onButtonClick = onButtonClick;
        }

        function initAPI() {
            if (!vm.api) {
                vm.api = {};
            }

            /**
            * @ngdoc method
            * @access internal
            * @module siemens.simaticit.common.widgets.headerButton
            * @name APIs#closeMenu
            *
            * @description
            * An API used to close the dropdown menu when the **sticky** property is set to true.
            *
            */
            vm.api.closeMenu = closeMenu;

            /**
           * @ngdoc method
           * @access internal
           * @module siemens.simaticit.common.widgets.headerButton
           * @name APIs#openMenu
           *
           * @description
           * An API used to display a dropdown when the button is clicked.
           *
           * @param {MenuConfigObject} config Dropdown cofiguration object see {@link MenuConfigObject}.
           */
            vm.api.openMenu = openMenu;
        }

        function onButtonClick() {
            if (typeof vm.onClick !== 'function') {
                return;
            }
            vm.onClick();
        }

        function openMenu(menuConfig) {
            if (!menuConfig) {
                return;
            }
            if (menuConfig.templateuri && typeof menuConfig.templateuri === 'string') {
                vm.showDropdown = true;
                vm.templateuri = menuConfig.templateuri;
            }
            if (menuConfig.sticky) {
                $element.find('span[data-internal-type=\'headerButton\']').removeAttr('data-toggle');
                $element.find('div[data-internal-type=\'headerButtonContainer\']').addClass('open');
            }
        }

        function closeMenu() {
            $element.find('div[data-internal-type=\'headerButtonContainer\']').removeClass('open');
        }
    }
}());
