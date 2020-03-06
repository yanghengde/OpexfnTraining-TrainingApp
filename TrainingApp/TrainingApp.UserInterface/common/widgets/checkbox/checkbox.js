/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.checkbox
    *
    * @description
    * This module provides functionalities related to checkboxes.
    */
    angular.module('siemens.simaticit.common.widgets.checkbox', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.checkbox');

    /**
    * @ngdoc directive
    * @name sitCheckbox
    * @module siemens.simaticit.common.widgets.checkbox
    * @description
    * Displays a checkbox control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-checkbox sit-value="value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-checkbox>
    * ```
    * @restrict E
	*
    * @param {Object[]} sit-value An array of value objects.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    * @param {String} [sit-layout=vertical]
    * This parameter sets the layout for the checkbox and it accepts the following values:
    * * **horizontal**
    * * **vertical**.
    * @example
    * The following example shows how to configure a checkbox widget within the sit-data attribute of the {@link sitPropertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     read_only: false,
    *     widget: "sit-checkbox",
    *     value: [
    *        {
    *           label: "Raw",
    *           checked: true
    *        },
    *        {
    *           label: "Gross",
    *           checked: false
    *        }
    *     ]
    *  }
    * ```
    * If there is only one checkbox control, the **label** and **checked** attributes are mandatory.
    *
    * Note: The {@link sitPropertyGrid sit-property-grid} directive analyzes the type of input value.
    *
    * ```
    *  {
    *     label: "Simple Check",
    *     value: true
    *  }
    * ```
    */
    function CheckboxController() { }

    app.controller('CheckboxController', CheckboxController);

    app.directive('sitCheckbox', function () {

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=?sitReadOnly',
                'value': '=?sitValue',
                'validation': '=?sitValidation',
                'ngBlur': '&?',
                'layout': '=?sitLayout',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            controller: 'CheckboxController',

            controllerAs: 'checkboxCtrl',

            templateUrl: 'common/widgets/checkbox/checkbox.html'
        };
    });
})();


