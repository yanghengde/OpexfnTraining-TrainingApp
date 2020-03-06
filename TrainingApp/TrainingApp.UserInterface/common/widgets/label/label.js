/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.label
    *
    * @description
    * This module provides functionalities to display labels.
    */
    angular.module('siemens.simaticit.common.widgets.label', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.label');

    /**
    * @ngdoc directive
    * @name sitLabel
    * @module siemens.simaticit.common.widgets.label
    * @description
    * Displays a label control.
    * @usage
    * As an element:
    * ```
    * <sit-label sit-value="value">
    * </sit-label>
    * ```
    * @restrict E
	*
    * @param {string} sit-value value string of the widget.
    *
    * @example
    * The following example shows how to configure a label widget
    * within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     widget: "sit-label",
    *     value: "$filter('date')(new Date(Date.parse(value)), "dd/MM/yyyy HH:mm")"
    *  }
    * ```
    */
    function LabelController() { }

    app.controller('LabelController', LabelController);

    app.directive('sitLabel', function () {

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'value': '=sitValue'
            },

            controller: 'LabelController',

            controllerAs: 'labelCtrl',

            templateUrl: 'common/widgets/label/label.html'
        };
    });
})();


