/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.tristateCheckbox
    *

    * @description
    * This module provides functionalities related to checkboxes.
    */
    angular.module('siemens.simaticit.common.widgets.tristateCheckbox', []);
})();

/*jshint -W098 */
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name sitTristateCheckbox
    * @module siemens.simaticit.common.widgets.tristateCheckbox
    * @description
    * Displays a tri-state checkbox control with states false, true, null(indeterminate).
    *
    * @usage
    * As an element:
    * ```
    *<sit-tristate-checkbox sit-value="checkCtrl.value" sit-validation="validation" ng-readonly="ngReadonly" ng-blur="ngBlur"
    *               ng-disabled="checkCtrl.disabled" ng-focus="ngFocus" sit-change="checkCtrl.changeFn">
    *</sit-tristate-checkbox>
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
    * This parameter sets the layout for the tri state checkbox and it accepts the following values:
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
    *        },
            {
    *           label: "Material",
    *           checked: null
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

    function CheckboxController() {
        this.updateState = function (index, checkedValue) {
            switch (checkedValue) {
                case undefined:
                    this.checked = true;
                    break;
                case false:
                    this.checked = true;
                    break;
                case true:
                    this.checked = "null";
                    break;
                case "null":
                    this.checked = false;
            }
            this.value[index].checked = this.checked;
        };
    }

    function sitTristateCheckbox($timeout) {
        return {
            templateUrl: "common/widgets/tristateCheckbox/tristate-checkbox.html",
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
            scope: true,
            controllerAs: 'checkboxCtrl',
            controller: CheckboxController,
            link: function (scope, elmnt, attrs, ctrl) {
                $timeout(function () {
                    var inputElement = elmnt.find('input').last()[0];
                    inputElement.indeterminate = ctrl.checked === "null";
                    inputElement.checked = ctrl.checked;
                    scope.$watch(angular.bind(ctrl, function () { return this.checked; }), function (newValue, oldValue) {
                        inputElement.indeterminate = newValue === "null";
                        inputElement.checked = newValue;
                    });
                });
            }
        }
    }

    angular.module('siemens.simaticit.common.widgets.tristateCheckbox')
        .directive("sitTristateCheckbox", ['$timeout', sitTristateCheckbox]);
})();
