/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.text
    *
    * @description
    * This module provides functionalities related to displaying text.
    */
    angular.module('siemens.simaticit.common.widgets.text', [function () {
        //any dependencies?
    }]);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.text');

    /**
    * @ngdoc directive
    * @name sitText
    * @module siemens.simaticit.common.widgets.text
    * @description
    * Displays a text control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-text sit-value="value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-text>
    * ```
    * @restrict E
	*
    * @param {string} sit-value Value of the text widget.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
    * The following example shows how to configure a text widget
    * within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     value: "Text value",
    *     read_only: false,
    *     validation: { required: true, maxlength: 15, minlength: 5, pattern: "/^myRegex$/" },
    *     widget: "sit-text"
    *  }
    * ```
    * If the text control does not require any validation rule, the **label** and **value** attributes are mandatory.
    * The property-grid analyzes the type of input value.
    *
    * ```
    *  {
    *     label: "Text label",
    *     value: "Text value must be less than 81 characters"
    *  }
    * ```
    */
    function TextController() {}

    app.controller('TextController', TextController);

    app.directive('sitText', function () {

        return {
            bindToController: {
                'readOnly': '=?sitReadOnly',
                'value': '=?sitValue',
                'validation': '=?sitValidation',
                'ngBlur': '&?',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?',
                'placeholder': '=?sitPlaceholder'
            },

            scope: {},

            restrict: 'E',

            controller: 'TextController',

            controllerAs: 'textCtrl',

            templateUrl: 'common/widgets/text/text.html'
        };
    });
})();


