/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.widgets.overlay
     * @description
     * Provides functionalities related to the **Overlay** widget. This widget has dependency on **siemens.simaticit.common.widgets.dialog-button** module to manage the buttons.
     */
    angular.module('siemens.simaticit.common.widgets.overlay', ['siemens.simaticit.common.widgets.dialog-button', function () {

    }]);

})();

/*jshint -W098, -W083, -W062 */
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @access internal
    * @name sitOverlay
    * @module siemens.simaticit.common.widgets.overlay
    * @description
    * The overlay widget allows to show message overlay.
    * These messages require explicit user interaction and does not allow the user to proceed without a response.
    *
    * @usage
    * As an element:
    * ```
    * <sit-overlay sit-modalid="TestOverlay" sit-modaltext="modaltext" sit-title="title" sit-buttons="overlayDevCtrl.buttons"></sit-overlay>
    * ```
    * @restrict E
    *
    * @param {string} id Id of the element representing overlay modal.
    * @param {string} title Title of the message overlay.
    * @param {string} modaltext Message to be displayed in the message overlay.
    * @param {sit-dialog-button} buttons List of buttons that are displayed at the bottom of the dialog.
    * **Note:** The number of buttons range between 1 and 3.
    *
    * sit-dialog-button  parameters:
    * * id: Unique identifier of the button.
    * * displayName: Label to be displayed on the button.
    * * onClickCallback: Function to be invoked at the button-click event.
    *
    * @example
	* In a view template, the `sit-overlay` directive is used as follows:
	*
	* ```
	* <sit-overlay sit-modalid="{{vm.overlayID}}" sit-modaltext="vm.text" sit-title="vm.title" sit-buttons="vm.buttons"></sit-overlay>
    * ```
    *
    * In the following example, the moladid, modaltext, title, and buttons are exposed as follows:
    *
    * * modalid:
    * ```
    * var vm=this;
    * vm.overlayID = "myOverlayID"
    * ```
    *
    * * modaltext:
    * ```
    * vm.text = "The recipe will be deleted. Do you want to continue?"
    * ```
    *
    * * title:
    * ```
    * vm.title = "Deleting a Recipe"
    * ```
    *
    * * buttons:
    * ```
    *  vm.buttons = [
    *        {
    *            id: "okButton",
    *            displayName: "OK",
    *            onClickCallback: vm.executeAction
    *        },
    *        {
    *            id: "cancelButton",
    *            displayName: "Cancel",
    *            onClickCallback: vm.hideOverlay
    *        }]
    *```
    *
    * To show the overlay message, the view controller function must call the **showOverlayModal** function (function provided by the **overlayService** service).
    * The following example shows how the **showOverlayModal** function is called to show the current overlay for a user response:
    * ```
    * vm.showOverlay = function () {
    *        overlayService.showOverlayModal(vm.overlayID);
    * }
    * ```
    *```
    *
    * To close the overlay message, the view controller function must call the **hideOverlayModal** function (function provided by the **overlayService** service).
    * The following example shows how the **hideOverlayModal** function is called to close the current overlay after a user response:
    * ```
    * vm.hideOverlay = function () {
    *        overlayService.hideOverlayModal(vm.overlayID);
    * }
    * ```
    *
    * **Note:** To show the overlay widget in the application, the function **showOverlay(vm.overlayID)** must be called because the overlay widget is hidden by default.
    */
    angular.module('siemens.simaticit.common.widgets.overlay').directive('sitOverlay',
        ['$timeout','common.overlay.overlayService', 'common', 'LOG_TYPES', function ($timeout, overlayService, common, LOG_TYPES) {
        return {

            bindToController: {
                title: "=sitTitle",
                modaltext: "=sitModaltext",
                modalid: "@sitModalid",
                buttons: "=sitButtons"
            },
            scope: true,

            restrict: 'E',

            templateUrl: 'common/widgets/overlay/overlay.html',

            controller: ['$scope', '$state', OverlayController],


            controllerAs: 'overlayCtrl'
        };

        function OverlayController($scope, $state) {
            var vm = this;
            var modalid, button;
            $scope.overlay = vm;
            activate();

            function activate() {
                //logs
                var logErrorFn = common.logger.getLogFn('overlay Widget', LOG_TYPES.LOG_ERROR);
                var errorMessage = 'The dialog button function is not a valid javascript function \n';
                var buttonCopy = null;
                function log() {
                    logErrorFn(errorMessage, buttonCopy);
                }
                function newOnClickFunction(button) {
                    overlayService.hideOverlayModal(modalid);
                    //Modify the current onclickCallback function with the redirection
                    $timeout(function () { $state.go(button.stateTransition.to, button.stateTransition.params, button.stateTransition.options); }, 200);
                }
                function internalFunction (button) {
                    if ((button.stateTransition !== null) && (!angular.isUndefined(button.stateTransition))) {
                        button.onClickCallback = function () {
                            newOnClickFunction(button);
                        }

                    }
                    else if (button.stateTransition === null && (!button.onClickCallback || !angular.isFunction(button.onClickCallback))) {
                        //In case of wrong configuration
                            buttonCopy = angular.copy(button);
                            log();
                            button.onClickCallback = log;
                    }
                }
                //Check if a stateTransition exists for the button. If so replace the onClickCallback function by it.
                //This check could be done directly in dialogButton but the overlay should be hidden (the dialogbutton is too low level)
                for (var i = 0, j = vm.buttons.length; i < j; i++) {
                    button = vm.buttons[i];
                    modalid = vm.modalid;
                    internalFunction(button);
                }
            }
            $scope.$on('$destroy', function () {

            });

        }

    }]);

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.overlay').service('common.overlay.overlayService', OverlayService);

    /**
     * @ngdoc service
     * @access internal
     * @name common.overlay.overlayService
     * @module siemens.simaticit.common.widgets.overlay
     *
     * @description
     * A factory to manage message overlay display.
     *
     */
    function OverlayService() {
        var vm = this;
        activate();

        function activate() {
            vm.showOverlayModal = showOverlayModal;
            vm.hideOverlayModal = hideOverlayModal;
        }

        function upperZIndex() {
            return Math.max(0, Math.max.apply(null, $.map($("*"),
                    function (v) {
                        var zint = parseFloat($(v).css("z-index")) || 0;
                        if (zint >= 2147483638) { zint = 0; } // 2147483638 is used for webEssencials
                        return zint;
                    }
            )));
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.overlay.overlayService#showOverlayModal
         * @module siemens.simaticit.common.widgets.overlay
         *
         * @description Allows to show the message overlay.
         *
         * @param {id} identifier Unique identifier of the modal.
         */
        function showOverlayModal(id) {
            //$('#'+ id + '.modal').css('display','none');
            // $('#'+ id).modal('show');
            /* BUG 6311*/
            var zindex = upperZIndex();
            $('#' + id).css({ zIndex: zindex + 1 });
            setTimeout(function () {
                $('#' + id).modal('show');
            }, 500);
        }

        /**
         * @ngdoc method
         * @name common.overlay.overlayService#hideOverlayModal
         * @access internal
         * @module siemens.simaticit.common.widgets.overlay
         *
         * @description Allows to hide the message overlay.
         *
         * @param {id} identifier Unique identifier of the modal.
         */
        function hideOverlayModal(id) {
            $('#' + id).modal('hide');
        }
    }
})();
