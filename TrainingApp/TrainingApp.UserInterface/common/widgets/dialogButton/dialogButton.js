/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.dialog-button
     * @description
     * This module provides functionalities related to dialog buttons.
     */
    angular.module('siemens.simaticit.common.widgets.dialog-button', []);

})();

/*jshint -W098 */
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name sitDialogButton
    * @module siemens.simaticit.common.widgets.dialog-button
    * @description
    * Displays a button control to be used within a dialog.
    *
    *
    *   @usage
    *   As an element:
    *
    *   ```
    *   <sit-dialog-button sit-button="dDevCtrl.button"></sit-dialog-button>
    *
    *   ```
    *
    *   @restrict E
    *   @param {Object} sit-button See {@link DialogButton}.
    *
    * @example
    *
    * In the controller:
    *
    * ```
    *  // dev-controller.js
     (function(){
        angular.module('siemens.simaticit.common.examples').controller('DialogButtonExampleController', [function () {
            var vm = this;

            this.callback = function(){
                alert('OK button clicked!');
            }

            this.button = {
                 id: "okButton",
                 displayName: "OK",
                 onClickCallback: vm.callback,
                 disabled: false
             };
    *   }]);
    * })();
    *
    * ```
    *
    * In the template:
    *
    * ```
        <!-- dev-tpl.html -->
        <sit-dialog-button sit-button="dDevCtrl.button"></sit-dialog-button>
    *
    * ```
    *
    */
    /**
     * @ngdoc type
     * @name DialogButton
     * @module siemens.simaticit.common.widgets.dialog-button
     * @description
     * Defines the configuration of a dialog button used within {@link sitDialog sit-dialog} and {@link sitDialogButton sit-dialog-button} directives.
     *
     * @property {String} id A unique identifier for the button.
     * @property {String} displayName The label to display as button text.
     * @property {Function} onClickCallback  A function to be executed when the button is clicked.
     * @property {Boolean} disabled If set to **true**, the button will be disabled.
     *
     */
    angular.module('siemens.simaticit.common.widgets.dialog-button').directive('sitDialogButton', [function () {
        return {
            bindToController: {
                button: "=sitButton"
            },
            scope: true,
            restrict: 'E',
            templateUrl: 'common/widgets/dialogButton/dialogButton.html',
            controller: ['$scope', DialogButtonController],
            controllerAs: 'dialogButtonCtrl'
        };

        function DialogButtonController($scope) {
            var vm = this;
            activate();

            function activate() {
                $scope.$on('$destroy', function () {
                });
            }


        }
    }]);

})();
