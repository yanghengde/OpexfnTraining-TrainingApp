/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @access internal
    * @name siemens.simaticit.common.widgets.richRadio
    *
    * @description
    * This module provides functionalities related to displaying rich radio controls.
    */
    angular.module('siemens.simaticit.common.widgets.richRadio', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.richRadio');

    /**
    * @ngdoc directive
    * @access internal
    * @name sitRichRadio
    * @module siemens.simaticit.common.widgets.richRadio
    * @description
    * Displays a rich radio control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-rich-radio sit-value="value" sit-validation="validation" sit-options="options" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-rich-radio>
    * ```
    * @restrict E
	*
    * @param {string} sit-value Value of the rich radio widget.
    * @param {Object[]} sit-options Array of objects that contains label-value-description properties.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
    * The following example shows how to configure a rich radio widget
    * within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     read_only: false,
    *     widget: "sit-rich-radio",
    *     value: "R",
    *     widgetAttributes: {
    *        name: "myRichRadio1",
    *        options: [
    *           { label: "Raw", value: "R", description: "Description of the Raw option" },
    *           { label: "Net", value: "Nt", description: "Description of the Net option" },
    *           { label: "Negative", value: "N", description: "Description of the Negative option" },
    *           { label: "Liquid", value: "Lq", description: "Description of the Liquid option" }
    *        ]
    *     }
    *  }
    * ```
    */
    function RichRadioController() { }

    app.controller('RichRadioController', RichRadioController);

    app.directive('sitRichRadio', function () {

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=sitReadOnly',
                'value': '=sitValue',
                'name': '@sitName',
                'validation': '=sitValidation',
                'options': '=sitOptions',
                'ngBlur': '&?',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            controller: 'RichRadioController',

            controllerAs: 'richRadioCtrl',

            templateUrl: function(elem,attrs) {
                return attrs.templateurl || 'common/widgets/richRadio/rich-radio.html'
            }
        };
    });
})();


