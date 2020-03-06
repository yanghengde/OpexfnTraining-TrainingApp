/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.iconPreview
    *
    * @description
    * This module provides functionalities related to iconPreview controls.
    */
    angular.module('siemens.simaticit.common.widgets.icon', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.icon');

    /**
   * @ngdoc directive
   * @name sitIcon
   * @module siemens.simaticit.common.widgets.iconPreview
   * @deprecated Use the {@link siemens.simaticit.common.widgets.iconPicker IconPicker} widget instead.
   * @description
   * Displays a Icon Preview control.
   * The **WidgetAttribute** property is not required for this control.
   *
   * @usage
   * As an element:
   * ```
   * <sit-icon sit-value="value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
   *       ng-disabled="ngDisabled" ng-focus="ngFocus">
   * </sit-icon>
   * ```
   * @restrict E
   *
   * @param {String} sit-value This parameter must contain one or more space-separated .css classes corresponding to FontAwesome icons (e.g. fa fa-cogs).
   * @param {ValidationModel} sit-validation See {@link ValidationModel}.
   * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
   * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
   * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
   * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
   * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
   * @example
   * The following example shows how to configure the sitIcon in the property-grid,
   * to be used in the data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid} directive:
   * ```
   *  {
   *     value: "Icon value",
   *     read_only: false,
   *     validation: { required: true, maxlength: 15, minlength: 3, pattern: "/^myRegex$/" },
   *     widget: "sit-icon"
   *  }
   * ```
   */

    function IconpreviewController() {}

    app.controller('IconpreviewController', IconpreviewController);

    app.directive('sitIcon', function () {

        return {
            scope: {},

            bindToController: {
                'readOnly': '=?sitReadOnly',
                'value': '=sitValue',
                'validation': '=sitValidation',
                'ngBlur': '&?',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            restrict: 'E',

            link: function (scope, element, attr, ctrl) {
                if (ctrl.validation && ctrl.validation.pattern) {
                    ctrl.validation.pattern = ctrl.validation.pattern;
                }
                else if (ctrl.validation) {
                    ctrl.validation.pattern = /^([a-z0-9-_]+\s*)+$/i; //NOSONAR
                }
            },

            controller: 'IconpreviewController',

            controllerAs: 'iconpreviewCtrl',

            templateUrl: 'common/widgets/iconPreview/iconPreview.html'
        };
    });
})();


