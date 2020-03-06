/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.password
    *
    * @description
    * This module provides functionalities related to displaying passwords.
    */
    angular.module('siemens.simaticit.common.widgets.password', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.password');

    /**
    * @ngdoc directive
    * @name sitPassword
    * @module siemens.simaticit.common.widgets.password
    * @description
    * Displays a password control.
    * The **WidgetAttribute** property is not required for this control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-password sit-value="value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-password>
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
    * The following example shows how to configure a password control in the property-grid,
    * to be used in the data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid} directive:
    * ```
    *  {
    *     read_only: false,
    *     validation: { required: true },
    *     value: "*********",
    *     widget: "sit-password"
    *  }
    * ```
    */
    function PasswordController() {
        var vm = this;
        if (vm.value && vm.value.length >= 1) {
            vm.name = vm.value[0] + 'Password';
        }else {
            vm.name = 'Password';
        }
    }

    app.controller('PasswordController', PasswordController);

    app.directive('sitPassword', function () {

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=sitReadOnly',
                'value': '=sitValue',
                'validation': '=sitValidation',
                'ngBlur':'&?',
                'sitChange':'=?',
                'ngDisabled':'=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            controller: PasswordController,

            controllerAs: 'passwordCtrl',

            templateUrl: 'common/widgets/password/password.html'
        };
    });
})();


