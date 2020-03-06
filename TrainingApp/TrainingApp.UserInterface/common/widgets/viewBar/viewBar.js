/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.viewBar
 * @access internal
 * @description
 * Contains functionality to provide a user with a UI for selecting a data viewing mode.
 */
(function () {
	'use strict';

	angular.module('siemens.simaticit.common.widgets.viewBar', []);

})();

/*jshint -W098, -W027  */
(function (window) {
    'use strict';
    ViewBarController.$inject = ['$filter', '$scope', '$rootScope'];
    function ViewBarController($filter,$scope,$rootScope) {
        var vm = this;

        /**
         * @ngdoc object
         * @module siemens.simaticit.common.widgets.viewBar
         * @name viewBarConfigurationDefaults
         * @access internal
         * @description
         * An object defining the default values for the **viewOptions** parameter
         * of the **sitViewBar** directive.
         *
         * ```
         * {
         *      grid: {
         *          show: false
         *      },
         *      smallTile: {
         *          show: false
         *      },
         *      mediumTile: {
         *          show: false
         *      },
         *      largeTile: {
         *          show: false
         *      },
         *      check: {
         *          show: false
         *      },
         *      details: {
         *          show: false
         *      }
         * }
         * ```
         *
         * By default, no buttons are shown.
         *
         * See {@link siemens.simaticit.common.widgets.viewBar.viewBarConfigurationDetails} for a full description of the options.
         *
         */
        var viewBarConfigurationDefaults = {
            grid: { show: false },
            smallTile: { show: false },
            mediumTile: { show: false },
            largeTile: { show: false },
            check: { show: false },
            details: { show: false }
        };

        function getButtonConfig(icon, selState, callbackFunc, text) {
            return {
                faIcon: icon,
                selected: selState,
                onClickCallback: function (selected) { if (callbackFunc) { callbackFunc(selected); } },
                text: text
            };
        }

        function selectView($event, selectedViewButton) {
            vm.selectedButton = selectedViewButton;
            vm.viewButtons.forEach(function (viewButton) {
                viewButton.selected = (viewButton === vm.selectedButton) ? true : false;
            });
            if (vm.selectedButton.onClickCallback) {
                vm.selectedButton.onClickCallback(true);
            }
        }

        function onSelectButtonShowChange(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (!newValue.show) {
                    vm.selectButton = [];
                } else if (newValue.show && !vm.selectButton.length ) {
                    vm.selectButton.push(getButtonConfig('sit sit-multi-selection', newValue.selected, newValue.onClickCallback));
                } else {
                    vm.selectButton[0].selected = newValue.selected;
                }
            }
        }

        function init() {
            vm.options = $.extend(true, {}, viewBarConfigurationDefaults, vm.viewOptions);

            //setup options for each supported button type in the bar
            vm.viewButtons = [];
            if (vm.options.grid.show) {
                vm.viewButtons.push(getButtonConfig('fa-table', vm.options.grid.selected, vm.options.grid.onClickCallback, $filter('translate')('common.viewbar.grid')));
            }
            if (vm.options.smallTile.show) {
                vm.viewButtons.push(getButtonConfig('fa-list', vm.options.smallTile.selected, vm.options.smallTile.onClickCallback, $filter('translate')('common.viewbar.small')));
            }
            if (vm.options.mediumTile.show) {
                vm.viewButtons.push(getButtonConfig('fa-th', vm.options.mediumTile.selected, vm.options.mediumTile.onClickCallback, $filter('translate')('common.viewbar.medium')));
            }
            if (vm.options.largeTile.show) {
                vm.viewButtons.push(getButtonConfig('fa-th-large', vm.options.largeTile.selected, vm.options.largeTile.onClickCallback, $filter('translate')('common.viewbar.large')));
            }

            // add the selection mode check if configured to show it
            vm.selectButton = [];
            if (vm.options.check.show) {
                vm.selectButton.push(getButtonConfig('sit sit-multi-selection', vm.options.check.selected, vm.options.check.onClickCallback));
                $scope.$watch(function () { return vm.viewOptions.check }, onSelectButtonShowChange , true);
            }

            // add the singling details button if configured to show it
            vm.detailsButton = [];
            if (vm.options.details.show) {
                vm.detailsButton.push(getButtonConfig('fa-list-alt', vm.options.details.selected, vm.options.details.onClickCallback));
            }

            //////////////////////////////////////////////////////////////////////////////////////
            vm.viewButtons.some(function (viewButton) {
                if (viewButton.selected) {
                    vm.selectedButton = viewButton;
                    return true;
                }
                return false;
            });

            vm.selectView = selectView;
            // necessary because angular-ui.js conflicts with bootstrap.js (have to click the button 2x to get the drop-down)
            // https://github.com/angular-ui/bootstrap/issues/2156
            //$('[dropdown-toggle=dropdown').dropdown();
            ////////////////////////////////////////////////////////////////////////////////////
        }

        var changeViewMode = $rootScope.$on('sit-item-collection-viewer.change-view-mode-completed.' + vm.viewOptions.grid.id, onChangeViewMode);

        function onChangeViewMode(event, args) {
            var selectedView;
            var index = _.findIndex(vm.viewButtons, { text: args.view });
            if (index !== -1) {
                selectedView = vm.viewButtons[index];
                vm.selectView([], selectedView);
            }
        }

        $scope.$on('$destroy', changeViewMode);

        function activate() {
            init();
        }

        activate();

        /**
        * @ngdoc object
        * @module siemens.simaticit.common.widgets.viewBar
        * @name viewBarConfigurationDetails
        * @access internal
        * @description
        * This provides a full description of settings configured by the **viewOptions** parameter
        * of the {@link siemens.simaticit.common.widgets.viewBar.sitViewBar} directive.
        *
        * The parameter value is a JSON object containing one sub-object for configuring each
        * button that you want visible. The following is an example:
        * ```
        *  {
        *      grid: {
        *          show: true,
        *          selected: true,
        *          onClickCallback: function () {
        *              window.alert('grid button was clicked!');
        *          }
        *      },
        *      smallTile: {
        *          show: true,
        *          selected: false,
        *          onClickCallback: myCallbackFunc
        *      },
        *      mediumTile: {
        *          show: true,
        *          selected: false,
        *          onClickCallback: null
        *      },
        *      largeTile: {
        *          show: true,
        *          onClickCallback: false,
        *      },
        *      check: {
        *          show: false
        *      },
        *      details: {
        *          show: false
        *      }
        *}
        * ```
        * Options for each button are the following:
        * * **show**: Sets visibility of the button. (true/false)
        * * **selected**: Sets the initial selected state of the button. (true/false)
        * * **onClickCallback**: A function to call when the button is clicked.
        *
        * See {@link siemens.simaticit.common.widgets.viewBar.viewBarConfigurationDefaults} for default values.
        */
        var viewBarConfigurationDetails = {
            grid: {
                show: true,
                selected: true,
                onClickCallback: function () {
                    window.alert('grid button was clicked!');
                }
            },
            smallTile: {
                show: true,
                selected: false,
                onClickCallback: null
            },
            mediumTile: {
                show: true,
                selected: false,
                onClickCallback: null
            },
            largeTile: {
                show: true,
                selected: false
            },
            check: {
                show: false
            },
            details: {
                show: false
            }
        };
    }

    function ViewBarDirective() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                viewOptions: '=sitViewOptions'
            },
            controller: ViewBarController,
            controllerAs: 'viewBarCtrl',
            templateUrl: 'common/widgets/viewBar/view-bar.html'
        };
    }

    /**
     * @ngdoc directive
     * @module siemens.simaticit.common.widgets.viewBar
     * @name sitViewBar
     * @access internal
     * @restrict E
     *
     * @description
     * _(Internal)_ Shows a configurable set of buttons with each button associated to a data viewing mode.
     *
     * The configuration supports defining which buttons are visible and setting a callback
     * function to handle the button click event.
     *
     * <em>  NOTE: This directive was created for internal use by the
     *       {@link siemens.simaticit.common.widgets.itemCollectionViewer} directive.</em>
     *
     *
     * @example
     * In a view template, you can use the **sitViewBar** as follows:
     * ```
     *       <sit-view-bar sit-view-options="vm.viewBarOptions"></sit-view-bar>
     * ```
     *
     * In the corresponding view controller, add a **viewBarOptions** object to viewmodel
     * to define the options for the view bar.
     * ```
     *  vm.viewBarOptions = {
     *      grid: {
     *          show: true,
     *          selected: true,
     *          onClickCallback: myHandleGridClickFunc
     *      },
     *      smallTile: {
     *          show: true,
     *          selected: false,
     *          onClickCallback: myHandleSmallClickFunc
     *      },
     *      mediumTile: {
     *          show: true,
     *          selected: false,
     *          onClickCallback: myHandleMediumClickFunc
     *      }
     *  }
     * ```
     *
     * @param {Object} viewOptions
     * An object containing the settings to control display and behavior of the widget
     *
     * The object contains sub-objects. Each of which defines the configuration
     * for one of the supported buttons. You only need to supply a configuration for
     * each button you want visible. Default options will hide buttons not configured.
     * The following lists the names of the sub-objects and describes the associated button.
     * * **grid**: Shows a button displaying the **fa-table** icon.
     * * **smallTile**: Shows a button displaying the **fa-list** icon.
     * * **mediumTile**: Shows a button displaying the **fa-th** icon.
     * * **largeTile**: Shows a button displaying the **fa-th-large** icon.
     * * **check**: Shows a button displaying the **fa-check-square-o** icon.
     * * **details**: Shows a button displaying the **fa-list-alt** icon.
     *
     * Each configurable button supports the following options:
     * * **show**: Sets visibility of the button. (true/false)
     * * **selected**: Sets the initial selected state of the button. (true/false)
     * * **onClickCallback**: A function to call when the button is clicked.
     */
    angular.module('siemens.simaticit.common.widgets.viewBar').directive('sitViewBar', ViewBarDirective);
})(window);
