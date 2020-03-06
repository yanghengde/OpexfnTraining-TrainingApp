/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.datePicker
    *
    * @description
    * This module provides functionalities related to date-pickers.
    */
    angular.module('siemens.simaticit.common.widgets.datePicker', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.datePicker');

    DatePickerController.$inject = [];
    function DatePickerController() {
        var vm = this;
        activate();

        function activate() {
            init();
            vm.open = onOpen;
        }

        function init() {

            vm.opened = false;

            if (!vm.value) {
                vm.value = '';
            }
            // if value is passed as a string it will be converted to a date object
            if (!(vm.value instanceof Date) && vm.value !== '') {
                vm.value = parseDate(vm.value);
            }

            if (vm.value.toString() === 'Invalid Date') {
                vm.value = '';
            }

            if (vm.format === '' || vm.format === undefined) {
                vm.format = 'mediumDate';
            }

            if (vm.showButtonBar === undefined || vm.showButtonBar === '') {
                vm.showButtonBar = true;
            }

            if (vm.appendToBody === undefined) {
                vm.appendToBody = false;
            }

            vm.dateOptions = {
                showWeeks: false
            };
        }

        function parseDate(value) {
            var mDate = window.moment(value);
            if (mDate.parsingFlags().iso) {
                return new Date(mDate.toISOString());
            }
            mDate = window.moment(value, 'L LT');
            if (mDate.isValid()) {
                return new Date(mDate.toISOString());
            }
            return new Date(value);
        }
        function onOpen(event) {
            event.preventDefault();
            event.stopPropagation();
            vm.opened = !vm.opened;
        }
    }

    /**
    * @ngdoc directive
    * @name sitDatepicker
    * @module siemens.simaticit.common.widgets.datePicker
    * @description
    * Displays a date picker control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-datepicker
    *       sit-value="value"
    *       sit-format="format"
    *       sit-validation="validation"
    *       sit-show-button-bar="showButtonBar"
    *       ng-readonly="ngReadonly"
    *       ng-blur="ngBlur"
    *       ng-change="ngChange"
    *       ng-disabled="ngDisabled"
    *       ng-focus="ngFocus">
    * </sit-datepicker>
    * ```
    * @restrict E
    *
    * @param {String} sit-value Value of the date picker widget
    * @param {String} sit-format A format in which the selected date is displayed on the widget. Possible values are: fullDate, longDate, mediumDate, shortDate, medium, short.
    * @param {Boolean} sit-append-to-body A boolean value which specifies whether the date picker popup is appended to the body or is inserted after it.
    * @param {Boolean} [sit-show-button-bar=true] Specifies whether to show or hide the [Today, Clear, Close] buttons at the bottom.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
    * The following example shows how to configure a date picker widget within the sit-data attribute of the
    * {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     read_only: false,
    *     showButtonBar: false
    *     value: "09-10-2014",
    *     widget: "sit-datepicker",
    *     widgetAttributes: {
    *         format: "MM/DD/YYYY"
    *     }
    *  }
    * ```
    * If the date picker control does not require a particular configuration, the **label** and **value** attributes are mandatory.
    * The property-grid analyzes the type of the input value.
    * ```
    *  {
    *     label: "Simple Date",
    *     value: new Date()
    *  }
    * ```
    */
    app.directive('sitDatepicker', function () {
        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=?sitReadOnly',
                'value': '=?sitValue',
                'validation': '=?sitValidation',
                'format': '=?sitFormat',
                'appendToBody': '=?sitAppendToBody',
                'ngBlur': '&?',
                'sitChange': '=?',
                'showButtonBar': '=?sitShowButtonBar',

                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            controller: DatePickerController,

            controllerAs: 'datepickerCtrl',

            templateUrl: 'common/widgets/datePicker/date-picker.html'
        };
    });
})();


