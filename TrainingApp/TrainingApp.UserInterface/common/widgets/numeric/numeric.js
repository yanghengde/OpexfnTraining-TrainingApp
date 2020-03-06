/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.numeric
    *
    * @description
    * This module provides functionalities related to numeric controls.
    */
    angular.module('siemens.simaticit.common.widgets.numeric', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.numeric');

    /**
    * @ngdoc directive
    * @name sitNumeric
    * @module siemens.simaticit.common.widgets.numeric
    * @description
    * Displays a numeric control.
    *
      * **Note:** If the user does not specify any validation rules, the widget should not limit the user on the number of digits entered.
    *
    * @usage
    * As an element:
    * ```
    * <sit-numeric sit-value="value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-numeric>
    * ```
    * @restrict E
	*
    * @param {String} sit-value Value of the password widget.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
    * The following example shows how to configure a numeric widget
    * within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     value: "0",
    *     read_only: false,
    *     validation: { required: true, max: 15, min: 15 },
    *     widget: "sit-numeric"
    *  }
    * ```
    * If the numeric control does not require any validation rules, the **label** and **value** attributes are mandatory.
    * The property-grid analyzes the type of input value.
    *
    * ```
    *  {
    *     label: "Number label",
    *     value: 10
    *  }
    * ```
    *
    * **Localization Note:**
    *
    * The localization in sit-numeric widget is not dependent on the language set in the UMC or the language chosen at login page.
    * It is dependent on the language set in the browser settings but for the
    * Internet Explorer, the localization depends on the regional setting of the web client machine.
    *
    * In case of displaying custom numeric data in the sit-grid, it should be configured as shown below.
    * ```
    *   { field: 'Quantitynumeric', displayName: 'QuantityNumeric', cellFilter: 'number: 2' }
    * ```
    *
    * In this case the localization refers to the language set in the UMC.
    *
    */
    function NumericController() { }

    app.controller('NumericController', NumericController);

    app.directive('sitNumeric', ['common.overlay.overlayService', function (overlayService) {

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=sitReadOnly',
                'value': '=sitValue',
                'validation': '=sitValidation',
                'ngBlur': '&?',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            controller: NumericController,

            controllerAs: 'numericCtrl',

            templateUrl: 'common/widgets/numeric/numeric.html'
        };
    }]);
})();
