/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.typeahead
    *
    * @description
    * Provides functionalities related to displaying type-ahead controls.
    */
    angular.module('siemens.simaticit.common.widgets.typeahead', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.typeahead');

    /**
    * @ngdoc directive
    * @name sitTypeahead
    * @module siemens.simaticit.common.widgets.typeahead
    * @description
    * Displays a typeahead control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-typeahead sit-value="value" sit-validation="validation" sit-options="options" sit-to-display="toDisplay"
    *       ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange" ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-typeahead>
    * ```
    * @restrict E
	*
    * @param {String} sit-value Value of the typeahead widget.
    * @param {Array} sit-options Array of objects that contains list of values or objects.
    * @param {String} sit-to-display a value to be displayed.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
    * The following example shows how to configure a typeahead widget within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid} directive:
    * ```
    *  {
    *     read_only: false,
    *     value: "",
    *     widget: "sit-typeahead",
    *     widgetAttributes: {
    *        options: [
    *           "Weighing room 1", "Weighing room 2", "Weighing room 3"
    *        ],
    *        toDisplay: null
    *     }
    *  }
    *```
    */
    function TypeaheadController() { }

    app.controller('TypeaheadController', TypeaheadController);

    app.directive('sitTypeahead', function () {

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=sitReadOnly',
                'value': '=sitValue',
                'options': '=sitOptions',
                'toDisplay': '=sitToDisplay',
                'validation': '=sitValidation',
                'ngBlur': '&?',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            controller: TypeaheadController,

            controllerAs: 'typeaheadCtrl',

            templateUrl: 'common/widgets/typeahead/typeahead.html'
        };
    });
})();


angular.module("uib/template/typeahead/typeahead-popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("uib/template/typeahead/typeahead-popup.html",
        "<div style=\"width:100%; overflow:auto; white-space:nowrap; padding:0;\" class=\"dropdown-menu custom-dd\"" +
        "ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{top: position().top+'px', left: position().left+'px'}\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">" +
        "<ul style=\"position:static;float:left; width:100%\">\n" +
        "<li class=\"uib-typeahead-match\" ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" " +
        "ng-click=\"selectMatch($index, $event)\" role=\"option\" id=\"{{::match.id}}\">\n" +
        "        <div uib-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
        "    </li>\n" +
        "</ul></div>\n" +
        "");
}]);
