/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.radio
    *
    * @description
    * This module provides functionalities related to displaying radio controls.
    */
    angular.module('siemens.simaticit.common.widgets.radio', []);

})();

/*jshint -W098 */
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name sitRadio
    * @module siemens.simaticit.common.widgets.radio
    * @description
    * Displays a radio control.
    *
    * @usage
    * As an element:
    * ```
    * <sit-radio sit-value="value" sit-validation="validation" sit-options="options" ng-readonly="ngReadonly" ng-blur="ngBlur" sit-change="sitChange"
    *       ng-disabled="ngDisabled" ng-focus="ngFocus">
    * </sit-radio>
    * ```
    * @restrict E
	*
    * @param {string} sit-value Value of the radio widget.
    * @param {Object[]} sit-options Array of objects that contains label-value pairs.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    * @param {String} [sit-layout=vertical]
    * This parameter sets the layout for the radio button and it accepts the following values:
    * * **horizontal**
    * * **vertical**.
    * @example
    * The following example shows how to configure a radio widget
    * within the sit-data attribute of the {@link siemens.simaticit.common.widgets.propertyGrid sit-property-grid} directive:
    * ```
    *  {
    *     read_only: false,
    *     widget: "sit-radio",
    *     value: "R",
    *     widgetAttributes: {
    *        name: "myRadio1",
    *        options: [
    *           { label: "Raw", value: "R" },
    *           { label: "Net", value: "Nt" },
    *           { label: "Negative", value: "N" },
    *           { label: "Liquid", value: "Lq" }
    *        ]
    *     }
    *  }
    * ```
    */
    var app = angular.module('siemens.simaticit.common.widgets.radio');
    app.directive('sitRadio', radio);
    radio.$inject = ['$timeout'];
    function radio($timeout) {
        function postLink(scope, element, attrs, controller) {
            var sitRadio, radiogroup, radios;
            var focused = false;
            var timer = $timeout(function () {
                sitRadio = element.find('.sit-radio');
                radiogroup = sitRadio.find('.property-grid-span-group-block.validator-control');

                radiogroup.on("focusin", event, focusIn);

                radios = radiogroup.find('input');
                for (var i = 0; i < radios.length; i++) {
                    removeEvent(radios[i], 'focusin', focusIn);
                    removeEvent(radios[i], 'focusout', focusIn);
                }
            });

            scope.$on('$destroy', onDestroy);

            function focusIn(event) {
                if (focused)
                    return;

                if (!thisElement(targetNode(event)))
                    return;

                focused = true;
                addEvent(document, 'click', focusOut);
                controller.ngFocus();
            }

            function focusOut(event) {
                if (!focused)
                    return;

                if (thisElement(targetNode(event)))
                    return;

                focused = false;
                removeEvent(document, 'click', focusOut);
                controller.ngBlur();
            }

            function targetNode(e) {
                return 'target' in e ? e.target : e.srcElement;
            }

            function addEvent(node, evtType, callback) {
                if ('addEventListener' in node)
                    node.addEventListener(evtType, callback, false);
            }

            function removeEvent(node, evtType, callback) {
                if ('removeEventListener' in node)
                    node.removeEventListener(evtType, callback, false);
            }

            function thisElement(node) {
                // Test to see if we're on the element node
                while (node) {
                    if (node === radiogroup[0]) {
                        break;
                    }
                    node = node.parentNode;
                }
                return !(!node);
            }

            function onDestroy() {
                $timeout.cancel(timer);
            }
        }

        return {
            scope: {},

            restrict: 'E',

            bindToController: {
                'readOnly': '=sitReadOnly',
                'value': '=sitValue',
                'name': '@sitName',
                'validation': '=sitValidation',
                'options': '=sitOptions',
                'layout': '=?sitLayout',
                'ngBlur': '&?',
                'sitChange': '=?',
                'ngDisabled': '=?',
                'ngFocus': '&?',
                'ngReadonly': '=?'
            },

            controller: 'RadioController',

            controllerAs: 'radioCtrl',

            templateUrl: 'common/widgets/radio/radio.html',

            link: {
                post: postLink
            }
        };
    }
    app.controller('RadioController', RadioController);
    function RadioController() { }
})();
