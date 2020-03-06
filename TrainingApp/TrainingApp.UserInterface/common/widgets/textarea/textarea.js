/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.textarea
    *
    * @description
    * This module provides functionalities related to displaying textarea input fields.
    */
    angular.module('siemens.simaticit.common.widgets.textarea', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.textarea');

    /**
    * @ngdoc directive
    * @name sitTextarea
    * @module siemens.simaticit.common.widgets.textarea
    * @description
    * Displays a textarea input field.
    *
    * @usage
    * As an element:
    * ```
    * <sit-textarea sit-value="value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-textarea>
    * ```
    * @restrict E
	*
    * @param {string} sit-value Value of the textarea widget.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
    * The following example shows how to configure a textarea widget
    * within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     read_only: false,
    *     widget: "sit-textarea",
    *     value: "Use gloves to handle this material",
    *     validation: { required: true, maxlength: 500, minlength: 10 },
    *  }
    * ```
    * If the textarea control does not require any validation rule, the **label** and **value** attributes are mandatory.
    * The property-grid analyzes the type of input value.
    *
    * ```
    *  {
    *     label: "Text label",
    *     value: "If the size is greater than 80 it is interpreted as a **textarea**."
    *  }
    * ```
    */
    function TextareaController() { }

    app.controller('TextareaController', TextareaController);

    app.directive('sitTextarea', function () {

        return {
            scope: {},

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

            restrict: 'E',

            controller: 'TextareaController',

            controllerAs: 'textareaCtrl',

            templateUrl: 'common/widgets/textarea/textarea.html'
        };
    });
})();


