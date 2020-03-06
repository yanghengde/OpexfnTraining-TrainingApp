/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.email
    *
    * @description
    * This module provides functionalities to display e-mails.
    */
    angular.module('siemens.simaticit.common.widgets.email', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.email');

    /**
    * @ngdoc directive
    * @name sitEmail
    * @module siemens.simaticit.common.widgets.email
    * @description
    * Displays an email control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-email sit-value="value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-email>
    * ```
    * @restrict E
	*
    * @param {String} sit-value Value of the email widget.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
    * The following example shows how to configure an email widget within the sit-data attribute of the
    * {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     read_only: false,
    *     validation: { required: true },
    *     value: "email@email.com",
    *     widget: "sit-email"
    *  }
    * ```
    */
    function EmailController() { }

    app.controller('EmailController', EmailController);

    app.directive('sitEmail', function () {

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

            controller: 'EmailController',

            controllerAs: 'emailCtrl',

            templateUrl: 'common/widgets/email/email.html'
        };
    });
})();


