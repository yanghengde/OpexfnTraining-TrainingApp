/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.switchButton
 * @access internal
 * @description
 * This module provides UI elements for displaying buttons.
 */
(function () {
	'use strict';

	angular.module('siemens.simaticit.common.widgets.switchButton', []);

})();

(function () {
    'use strict';

    SwitchButtonController.$inject = ['$scope'];
    function SwitchButtonController($scope) {
        var vm = this;

        //for multiple buttons in the group, ensure a single selection
        //for single button, toggle the selected state
        function buttonClicked(index) {
            var button = vm.buttons[index];
            if (vm.buttons.length > 1) {
                angular.forEach(vm.buttons, function (value) {
                    value.selected = false;
                });
                button.selected = true;
            } else {
                button.selected = !button.selected;
            }
            if (button.onClickCallback) {
                button.onClickCallback(button.selected);
            }
        }

        function getMarginClass(index) {
            var marginClass = '';

            if (vm.buttons.length > 1) {
	            if(index === 0) {
                    marginClass = ' switch-button-first';
	            } else if(index === vm.buttons.length -1) {
                    marginClass = ' switch-button-last';
                } else {
                    marginClass = ' switch-button-middle';
                }
            }

            return marginClass;
        }

        function init() {
            vm.buttonClicked = buttonClicked;
            vm.getMarginClass = getMarginClass;
            updateIcons();
        }

        function activate() {
            init();
        }

        $scope.$watch(function () { return vm.buttons },
              function (newValue, oldValue) {
                  if (newValue !== oldValue) {
                      updateIcons();
                  }
              }
        );

        //form the objects for svgIcon or typeIcon if specified

        function updateIcons() {
            if (vm.buttons) {
                for (var i = 0 , length = vm.buttons.length; i < length ; i++) {
                    constructIconObject(vm.buttons[i]);
                }
            }
        }

        function constructIconObject(obj) {
            var newIcon = {};
            if (obj && obj.svgIcon && typeof (obj.svgIcon) === 'string') {
                newIcon = {
                    path: obj.svgIcon,
                    size: '16px'
                }
                obj.icon = newIcon;
            } else {
                if (obj && obj.cmdIcon && typeof (obj.cmdIcon) === 'string') {
                    newIcon = {
                        prefix: 'cmd',
                        name: obj.cmdIcon,
                        suffix: '24',
                        size: '16px'
                    }
                    obj.icon = newIcon;
                }
            }
        }

        activate();
    }

    function SwitchButtonDirective() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                buttons: '=sitButtons'
            },
            controller: SwitchButtonController,
            controllerAs: 'switchButtonCtrl',
            templateUrl: 'common/widgets/switchButton/switch-button.html'
        };
    }

    /**
     * @ngdoc directive
     * @module siemens.simaticit.common.widgets.switchButton
     * @name sitSwitchButton
     * @access internal
     *
     * @restrict E
     *
     * @description
     * Displays one or more buttons as a group.
     *
     * The directive ensures that only one button in the group is in the **selected** state.
     * Selection is indicated by changing the CSS style to display a border on the button.
     * If the group contains only one button, the selected state is toggled when the button is clicked.
     *
     * The button may have a callback associated to it. This is called when the button is clicked.
     *
     * <em>  NOTE: This directive was created for internal use by the
     *       {@link siemens.simaticit.common.widgets.itemCollectionViewer.sitItemCollectionViewer} directive.</em>
     *
     * @example
     * In a view template, you can use the **sitSwitchButton** as follows:
     * ```
     *  <sit-switch-button sit-buttons="vm.buttons"></sit-switch-button>
     * ```
     *
     *   In the corresponding view controller, add a **buttons** object to viewmodel to
     *   define the button list.
     * ```
     *  vm.buttons = [];
     *  vm.buttons.push( {
     *          faIcon: 'fa-table',
     *          selected: true,
     *          onClickCallback: myButton1Callback
     *      }
     *  );
     *  vm.buttons.push( {
     *          faIcon: 'fa-list',
     *          selected: false,
     *          onClickCallback: myButton2Callback
     *      }
     *  );
     * ```
     *
     * @param {Object[]} buttons
     * An array of JSON objects which define the buttons to be shown.
     *
     * Each object supports the following properties:
     * * **faIcon**: The name of a Font Awesome icon to display on the button.
     * * **selected**: Specifies the selected state of the button. (only one in a group may be selected).
     * * **onClickCallback**: Function to be called when the button is clicked.
     */
    angular.module('siemens.simaticit.common.widgets.switchButton').directive('sitSwitchButton', SwitchButtonDirective);

})();
