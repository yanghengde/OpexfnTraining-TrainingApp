/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.select
    *
    * @description
    * This module provides functionalities related to displaying select controls.
    */
    angular.module('siemens.simaticit.common.widgets.select', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.select');

    /**
    * @ngdoc directive
    * @name sitSelect
    * @module siemens.simaticit.common.widgets.select
    * @description
    * Displays a select control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-select sit-value="value" sit-validation="validation" sit-options="options" sit-to-display="toDisplay" sit-to-keep="toKeep" sit-to-group="toGroup"
    *       ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange" ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-select>
    * ```
    * @restrict E
	*
    * @param {string} sit-value Value of the select widget.
    * @param {Array} sit-options Array of objects that contains list of attributes.
    * @param {string} sit-to-display Attribute name to be displayed.
    * @param {string} sit-to-keep Attribute name to be stored as an identifier.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    * @param {string} [sit-to-group] _(Optional)_ Groups the options by a title or key defined, if not there will not be any grouping.
    *
    * @example
    * The following example shows how to configure a select widget
    * within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     value: { id: "kg", name: "kilogramm" },
    *     read_only: false,
    *     widget: "sit-select",
    *     widgetAttributes: {
    *        options: [
    *           { id: "g", name: "gramm", type:"A" },
    *           { id: "kg", name: "kilogramm",type:"A"  },
    *           { id: "l", name: "liter" ,type:"B" },
    *           { id: "ml", name: "milliliter",type:"B"  }
    *        ],
    *        toDisplay: "name",
    *        toKeep: "id",
    *        toGroup:"type"
    *     }
    *  }
    * ```
    * The **value** attribute is used to define and store the selected value. After selection, the value attribute will contain the chosen item.
    */
    SelectController.$inject = ['$scope'];

    function SelectController(scope) {
        var vm = this;
        activate();
        function activate() {
            init();
            initMethods();
        }
        function init() {
            vm.splitListVisibility = false;
            vm.placeholder = '';
            vm.selectValidation = vm.validation;
            vm.doneCallback = function () { };
            vm.sitOptions = [];
            if (vm.value) {
                vm.sitSelectedString = vm.value[vm.toKeep];
            } else {
                vm.sitSelectedString = '';
            }
            vm.allowReset = (vm.allowReset === true || vm.allowReset === false) ? vm.allowReset : false;
            if (vm.allowReset && vm.options) {
                addResetValue();
            }
            if (vm.validation && vm.validation.hasOwnProperty('custom')) {
                vm.selectValidation = angular.copy(vm.validation);
                vm.selectValidation.custom = validityChangeCallback;
            }
            formatOptions();
        }

        function initMethods() {
            vm.selectionChanged = selectionChanged;
        }

        function selectionChanged(oldValue, newValue) {
            vm.options.forEach(function (option) {
                if (option[vm.toKeep] === oldValue) {
                    oldValue = option;
                } else if (option[vm.toKeep] === newValue) {
                    newValue = option;
                }
            });
            vm.value = newValue;
            if (vm.sitChange && typeof vm.sitChange === 'function') {
                vm.sitChange(oldValue, newValue);
            }

        }

        function validityChangeCallback(value, ngModel) {
            value = _.find(vm.options, function (item) {
                return item[vm.toKeep] === value;
            });
            vm.validation.custom(value, ngModel);
        }

        function formatOptions() {
            vm.sitOptions = [];
            if (vm.options && vm.options.length > 0) {
                vm.options.forEach(function (obj) {
                    vm.sitOptions.push({
                        'id': obj[vm.toKeep],
                        'name': obj[vm.toDisplay],
                        'groupby': obj[vm.sitToGroup]
                    });
                })
            }
        }

        function addResetValue() {
            var resetItemOption = {};
            var resetItemSitOptions = {};
            resetItemOption[vm.toKeep] = '';
            resetItemOption[vm.toDisplay] = '';
            resetItemSitOptions.id = '';
            resetItemSitOptions.name = '';
            resetItemSitOptions.groupby = '';
            vm.sitOptions.unshift(resetItemSitOptions);
            vm.options.unshift(resetItemOption);
            if (!vm.value || _.isEmpty(vm.value)) {
                vm.value = vm.options[0];
            }
        }

        var optionListner = scope.$watchCollection(function () {
            return vm.options;
        }, function (newValue, oldValue) {
            if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                formatOptions();
                if (vm.allowReset) {
                    addResetValue();
                }
            }
        });

        var valueListner = scope.$watch(function () {
            return vm.value;
        }, function (newValue, oldValue) {
            if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                if (vm.value) {
                    vm.sitSelectedString = vm.value[vm.toKeep];
                } else {
                    vm.sitSelectedString = '';
                }
            }
        });

        var validationListner = scope.$watch(function () {
            return vm.validation;
        }, function (newValue, oldValue) {
            if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                if (vm.validation) {
                    vm.selectValidation = angular.copy(vm.validation);
                    if (vm.validation && vm.validation.hasOwnProperty('custom')) {
                        vm.selectValidation.custom = validityChangeCallback;
                    }
                }
            }
        });

        scope.$on('$destroy', function () {
            optionListner();
            valueListner();
            validationListner();
        });
    }

    app.controller('SelectController', SelectController);

    app.directive('sitSelect', function () {

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=sitReadOnly',
                'value': '=sitValue',
                'validation': '=sitValidation',
                'options': '=sitOptions',
                'toDisplay': '=sitToDisplay',
                'toKeep': '=sitToKeep',
                'ngBlur': '&?',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngSelected': '=?',
                'ngReadonly': '=?',
                'sitToGroup': '=?',
                'allowReset': '=?sitAllowReset'
            },

            controller: 'SelectController',

            controllerAs: 'selectCtrl',

            templateUrl: 'common/widgets/select/select.html',

            link: function (scope, el, attrs, ctrl) {
            }
        };
    });
})();
