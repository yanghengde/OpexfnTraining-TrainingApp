/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.dialog
    *
    * @description
    * This module provides functionalities to display a dialog pop-up on a screen.
    */

    angular.module('siemens.simaticit.common.widgets.dialog', [
        'siemens.simaticit.common.widgets.dialog-button',
        'siemens.simaticit.common.widgets.propertyGrid']);

})();

/*jshint -W083, -W062, -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.dialog');

    /**
    *   @ngdoc directive
    *   @name sitDialog
    *   @module siemens.simaticit.common.widgets.dialog
    *   @description
    *   Displays a dialog containing a {@link sitPropertyGrid sit-property-grid} (default) or custom content, and one or more configurable buttons.
    *
    *   @usage
    *   As element:
    *   ```
    *   <sit-dialog sit-title="dDevCtrl.title2"
    *      sit-templatedata='dDevCtrl.dialogData'
    *      sit-templateuri="dDevCtrl.templateUri"
    *      sit-modalid="popup2"
    *      sit-close="dDevCtrl.close"
    *      sit-buttons='dDevCtrl.buttonsList'>
    *   </sit-dialog>
    *   ```
    *
    *   @restrict E
    *   @param {Object} sit-title The dialog title.
    *   @param {Object} sit-templateuri _(Optional)_ Path to the custom template with the content to render within the dialog.
    *   If not specified, the default template (containing a {@link sitPropertyGrid sit-property-grid} directive configurable via the **sit-templatedata** property) will be used.
    *
    *   @param {Object} sit-templatedata The data to bind to the template.
    *   If no custom template is specified, this object must contain the following properties:

    *   * **layout**: A string defining the layout of the sit-property-grid directive (either **Vertical** or **Horizontal**):
    *   * **data**: An array of objects used to configure the fields of the sit-property-grid directive .
    *   For more information, see the **sit-data** attribute of the {@link sitPropertyGrid sit-property-grid} directive.
    *
    *
    *   If a custom template is specified, there are no restrictions on the format of the object,
    *   and within the custom template, it can be accessed via the **Dialog.templatedata** variable.
    *   @param {string}  sit-modalid: A unique identifier for the dialog.
    *   @param {DialogButton[]}  sit-buttons: List of buttons to display. Each element of the array must be a {@link DialogButton} object.
    *   @param {Object} sit-close _(Optional)_ A close button is displayed on the right-hand side, after the dialog title. To configure close buttons see {@link CloseButton}.


    * @example
    *
    * ### Dialog with default template
    *
    * In the controller:
    *
    * ```
     (function(){
        angular.module('siemens.simaticit.common.examples').controller('DialogExampleController', ['common.widgets.dialog.service', function (dialogService) {
            var vm = this;

            this.dialogcentered   = true;

            this.templateData = [
                {
                    id: "material1",
                    label: "Material Name1",
                    name: "material_name1",
                    read_only: true,
                    widget: "sit-numeric",
                    value: 150.54,
                    validation: {
                    required: true
                    }
                },
                {
                    id: "material2",
                    label: "Material Name",
                    name: "material_name",
                    read_only: false,
                    widget: "sit-text",
                    value: "789",
                    validation: {
                    required: true,
                    maxlength: 10,
                    pattern: "/^[0-9]{1,3}$/"
                    }
                },
                {
                    id: "material3",
                    label: "Material identifier",
                    name: "material_id1",
                    read_only: true,
                    widget: "sit-text",
                    value: "This is a read-only field",
                    validation: {
                    required: true,
                    maxlength: 20
                    }
                }
            ];

            this.modalId = 'popup2';
            this.clickOk = function () {
                dialogService.hideDialogModal('popup2');
            };
            this.clickApply = function () {
                dialogService.hideDialogModal('popup2');
            };
            this.close = {
                showClose: true,
                tooltip: 'Close Tooltip'
            }
            this.buttonsList = [{ id: "okButton", displayName: "OK", onClickCallback: vm.clickApply },
                                { id: "cancelButton", displayName: "Cancel", onClickCallback: vm.clickOk }];
            this.open = function(){
                if (vm.dialogcentered) {
                    dialogService.showDialogCenteredModal(vm.modalId);
                } else {
                    dialogService.showDialogModal(vm.modalId, 'exmpaleBtn');
                }
            }
    *   }]);
    * })();
    *
    * ```
    *
    * In the template:
    * ```
        <h3> Dialog example with default template </h3>
        <button class="btn btn-primary" id="exmpaleBtn" ng-click="dDevCtrl.open()">Open dialog</button>
        <sit-dialog sit-title="dDevCtrl.dialogVerticalDataTitle"
                    sit-templatedata='dDevCtrl.dialogVerticalData'
                    sit-modalid="{{dDevCtrl.modalId}}"
                    sit-buttons='dDevCtrl.buttonsList'>

        </sit-dialog>
    *
    * ```
    *
    * ### Dialog with custom template
    *
    * In the controller:
    *
    * ```
        (function(){
            angular.module('siemens.simaticit.common.examples').controller('DialogExampleController', ['common.widgets.dialog.service', function (dialogService) {
                var vm = this;
                this.type = 'basic'

                this.dialogcentered   = true;

                this.templateData = [
                    {
                        id: "material1",
                        label: "Material Name1",
                        name: "material_name1",
                        read_only: true,
                        widget: "sit-numeric",
                        value: 150.54,
                        validation: {
                        required: true
                        }
                    },
                    {
                        id: "material2",
                        label: "Material Name",
                        name: "material_name",
                        read_only: false,
                        widget: "sit-text",
                        value: "789",
                        validation: {
                        required: true,
                        maxlength: 10,
                        pattern: "/^[0-9]{1,3}$/"
                        }
                    },
                    {
                        id: "material3",
                        label: "Material identifier",
                        name: "material_id1",
                        read_only: true,
                        widget: "sit-text",
                        value: "This is a read-only field",
                        validation: {
                        required: true,
                        maxlength: 20
                        }
                    }
                ];

                this.dialogVerticalData = { layout: 'Vertical', data: vm.templateData, information: 'This popup uses the standard template based on sit-property-grid' };

                this.modalId = 'popup2';
                this.clickOk = function () {
                    dialogService.hideDialogModal('popup2');
                };
                this.clickApply = function () {
                    dialogService.hideDialogModal('popup2');
                };
                this.buttonsList = [{ id: "okButton", displayName: "OK", onClickCallback: vm.clickApply,disabled:false },
                                    { id: "cancelButton", displayName: "Cancel", onClickCallback: vm.clickOk,disabled:false }];
                this.open = function(){
                    if (vm.dialogcentered) {
                        dialogService.showDialogCenteredModal(vm.modalId);
                    } else {
                        dialogService.showDialogModal(vm.modalId, 'exmpaleBtn');
                    }
                }

            }]);
        })();
    *
    * ```
    *
    * In the template:
    *
    * ```
        <h3> Dialog example with custom template </h3>
        <button class="btn btn-primary" id="exmpaleBtn" ng-click="dDevCtrl.open()">Open dialog</button>
        <sit-dialog sit-title="dDevCtrl.customTemplateTitle"
                    sit-templatedata='dDevCtrl.templateData'
                    sit-templateuri="dDevCtrl.templateUri"
                    sit-modalid="{{dDevCtrl.modalId}}"
                    sit-buttons='dDevCtrl.buttonsList'>

        </sit-dialog>
    *
    * ```
    *
    * If a custom template is not provided, the dialog height will be set automatically depending on the height of the content provided.
    * If the content exceeds the viewport height, the container of the content will scroll and the dialog will be set to the height of the viewport.
    *
    * If a custom template is provided, you can customize the template by providing css styles as recommended in the example below.
    * If no styles are specified, the default template styles will be applied.
    *
    * ```
        <!-- dialog-dev-popup2-template.html -->
        <div class="customStyle">
                    <sit-property-grid sit-id="dialogPopup2"
                                       sit-data="Dialog.templatedata"
                                       sit-layout="Horizontal"
                                       sit-type="Fixed"
                                       sit-mode="edit"
                                       sit-columns="1">
                    </sit-property-grid>
        </div>
        <style>
        .customStyle{
            width:500px;
            height:400px;
            padding-right:16px;
        }
        </style>
    *
    * ```
    *
    */
    /**
   * @ngdoc type
   * @module siemens.simaticit.common.widgets.dialog
   * @name CloseButton
   * @description
   * An object which defines the dialog close button properties.
   *
   * @property {Boolean} [showClose = true] _(Optional)_ A boolean value which specifies whether or not to show the close button.
   * @property {String} [tooltip = 'Close'] _(Optional)_ The tooltip to be displayed when the mouse hovers over the close button.
   * @example
   * The close button object can be configured as follows:
   * `````````````````
   *  {
   *     showClose: true,
   *     tooltip: 'Close Tooltip',
   *  }
   * `````````````````
   */
    app.directive('sitDialog', sitDialog);

    function sitDialog() {
        return {
            bindToController: {
                title: "=sitTitle",
                templateuri: "=?sitTemplateuri",
                templatedata: "=sitTemplatedata",
                modalid: "@sitModalid",
                buttons: "=sitButtons",
                closeButton: '=?sitClose'
            },
            scope: {},
            restrict: 'E',
            templateUrl: 'common/widgets/dialog/dialog.html',
            controller: DialogController,
            controllerAs: 'Dialog'
        };
    }

    DialogController.$inject = ['$scope', '$rootScope', '$state', '$window', 'common.widgets.dialog.service', 'common', 'LOG_TYPES', '$element', '$translate'];
    function DialogController($scope, $rootScope, $state, $window, dialogService, common, LOG_TYPES, $element, $translate) {//NOSONAR
        var vm = this;
        var modalid;
        //logs
        var logErrorFn = common.logger.getLogFn('dialog Widget', LOG_TYPES.LOG_ERROR);
        var logInfoFn = common.logger.getLogFn('dialog Widget', LOG_TYPES.LOG_INFO);
        var errorMessage = 'The dialog button function is not a valid javascript function \n';
        var buttonCopy = null;
        var eventListners = [];

        function resetTemplateInfo() {
            vm.dialogTitle = vm.title;
            vm.dialogTemplate = vm.templateuri;
            vm.isValid = {};
            vm.isValid.value = true;
            vm.closeButtonTooltip = vm.closeButton && vm.closeButton.tooltip ? vm.closeButton.tooltip : $translate.instant('dialog.close');
            vm.isCloseButtonShown = vm.closeButton && typeof vm.closeButton.showClose === 'boolean' ? vm.closeButton.showClose : true;
        }

        function clearTemplateInfo() {
            vm.dialogTitle = '';
            vm.dialogTemplate = '';
        }

        function log() {
            logErrorFn(errorMessage, buttonCopy);
        }

        function init() {
            //initialize controller variables
            vm.positioning = "centered";
            vm.showed = false;
            vm.isValid = {};
            vm.isValid.value = true;
            //dialog methods
            vm.closeAlert = closeAlert;
            vm.center = center;
            vm.notcenter = notcenter;
            vm.hide = hide;
            vm.closeDialog = closeDialog;
            vm.closeIcon = {
                path: 'common/icons/cmdClosePanel24.svg',
                size: '16px'
            };

            $scope.$watch(function () { return vm.templateuri }, function () {
                resetTemplateInfo();
            });

            $scope.$watch(function () { return vm.title }, function () {
                resetTemplateInfo();
            });
        }

        function activate() {
            init();
            registerListners();
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

        //  Applies the centered class to the popup
        function center() {
            resetTemplateInfo();
            vm.positioning = "centered";
            vm.showed = true;
        }

        //   Applies the non centered class to the popup
        function notcenter() {
            resetTemplateInfo();
            vm.positioning = "notcentered";
            vm.showed = true;
        }

        function hide() {
            clearTemplateInfo();
            vm.positioning = "notcentered";
            vm.showed = false;
        }

        //window resize callback
        function onWindowResizeSize() {
            if (vm.showed) {
                if (vm.positioning === "notcentered" || vm.positioning === "centered") {
                    dialogService.ensureVisible(vm.modalid);
                }
            }
        }

        //sit-property-grid validity changed callback
        function updateValidity(event, data) {
            vm.isValid.value = data.validity;
            if ((vm) && (vm.modalid) && (data)) {
                logInfoFn("data " + vm.modalid + ": " + JSON.stringify(data));
            }

        }

        function closeDialog() {
            dialogService.hideDialogModal(vm.modalid);
        }

        function onLayoutChange(event, data) {
            if (data.eventSource !== 'sit-dialog' && data.eventSource !== 'nonModal') {
                onWindowResizeSize();
                $scope.$broadcast('sit-layout-change', { eventSource: 'sit-dialog' });
                $scope.$apply();
            }
        }

        function newOnClickFunction(modalid, button) {
            dialogService.hideDialogModal(modalid);
            //Modify the current onclickCallback function with the redirection
            $state.go(button.stateTransition.to, button.stateTransition.params, button.stateTransition.options);
        }

        function internalFunction(button, modalid, i) {
            if (button.stateTransition !== undefined) {
                vm.buttons[i].onClickCallback = function () {
                    newOnClickFunction(modalid, button);
                }
            }
            //In case of wrong configuration
            else if (button.stateTransition === null && (!button.onClickCallback || !angular.isFunction(button.onClickCallback))) {
                buttonCopy = angular.copy(button);
                log();
                vm.buttons[i].onClickCallback = log;
            }

        }

        //Check if a stateTransition exists for the button. If so replace the onClickCallback function by it.
        //This check could be done directly in dialogButton but the dialog should be hidden (the dialogbutton is too low level)
        if (undefined !== vm.buttons) {
            for (var i = 0, j = vm.buttons.length; i < j; i++) {
                var button = vm.buttons[i];
                modalid = vm.modalid;
                internalFunction(button, modalid, i);
            }
        }

        function registerListners() {
            //listen to the resize event to detect resizing
            eventListners[eventListners.length] = $scope.$on('sit-layout-change', onLayoutChange);

            //listen to sit-property-grid validity changed event
            eventListners[eventListners.length] = $scope.$on('sit-property-grid.validity-changed', updateValidity);
        }

        $scope.$on('$destroy', function () {
            eventListners.forEach(function (listner) {
                listner();
            });
        });

        activate();
    }

})();

/*jshint -W055 */
(function () {
    'use strict';
    /**
    * @ngdoc service
    * @module siemens.simaticit.common.widgets.dialog
    * @name common.widgets.dialog.service
    *
    * @description
    * This service exposes methods that can be used to manage {@link sitDialog sit-dialog} widgets.
    */
    angular.module('siemens.simaticit.common.widgets.dialog').service('common.widgets.dialog.service', DialogService);

    DialogService.$inject = ['$rootScope', 'LOG_TYPES', '$window', 'common.services.swac.SwacUiModuleManager'];
    function DialogService($rootScope, LOG_TYPES, $window, swacManager) {

        //Dialog header and footer height.
        var headerFooterHeight = 125;
        //Dialog right margin
        var modalMargin = 40;
        var vm = this;

        var dialogPromise;
        swacManager.eventBusServicePromise.promise.then(function (eventBusSvc) {
            dialogPromise = eventBusSvc;
        });

        function onpopstateEvent(event) {
            this.context.hideDialogModal(this.id);
        }

        this.stateEvent;
        function subscribe(that, id) {
            vm.stateEvent = $rootScope.$on('$stateChangeStart', onpopstateEvent.bind({ context: that, id: id }));
        }
        function unsubscribe() {
            vm.stateEvent();
        }

        /* _(Internal)_ Searches the z-index of the component located at the higher level.
        * This function is called to put the dialog above all other components.
        */
        function upperZIndex() {
            return Math.max(0, Math.max.apply(null, $.map($("*"),
                function (v) {
                    var zint = parseFloat($(v).css("z-index")) || 0;
                    if (zint >= 2147483638) { zint = 0; } // 2147483638 is used for webEssencials
                    return zint;
                }
            )));
        }

        // Sets maxHeight and minHeight to the dialog body.
        function setDialogDimension(popupElement) {
            var alertContainerHeight = $(popupElement[0]).find('.dialog-alert-container-').height();
            var dialogBodyDimensions = {
                maxHeight: popupElement[0].offsetHeight - (headerFooterHeight + alertContainerHeight),
                maxWidth: popupElement[0].offsetWidth - modalMargin
            };
            popupElement.find('.dialog-body-overflow').css(dialogBodyDimensions);
        }

        function onDialogRender() {
            $rootScope.$broadcast('sit-layout-change', { eventSource: 'sit-dialog' });
        }

        function onDialogLoad(popupElement) {
            //apply max-width and max-height on resize
            setDialogDimension(popupElement);
            $window.setTimeout(onDialogRender);
        }


        /**
             * @ngdoc method
             * @name common.widgets.dialog.service#showDialogModal
             * @module siemens.simaticit.common.widgets.dialog
             *
             * @description
             * Displays the a dialog modal near the specified component.
             *
             * @param {string} id Identifier of the dialog to be displayed.
             * @param {string} posId Identifier of the component where the dialog should be placed.
             */
        this.showDialogModal = function (id, posId) {
            subscribe(this, id);
            var zindex = upperZIndex(); // current max zindex

            var popupEl = $('#' + id);
            var angularPopupElement = angular.element(popupEl);
            var angularPopupControler = angularPopupElement.controller('sitDialog');

            angularPopupControler.notcenter(); // apply good style

            popupEl.modal('show'); // this will draw the popup and allo us to read the heght of each element

            // retrieve the greyed background created by the popup.
            var popUpBackdrop = popupEl.data('bs.modal').$backdrop;
            //set the z-index of the background
            popUpBackdrop.css({ zIndex: zindex + 1 });

            // retreive the dialog content element
            var dialogContentElement = popupEl[0].firstElementChild.firstElementChild.firstElementChild; // from the popup it's the 3rd subDiv

            //gets the button
            var buttonElement = $('#' + posId);
            var pos = buttonElement.offset();

            var buttonSize = { height: buttonElement.height(), width: buttonElement.width() };

            // gets the windows size
            var win = { height: $(window).innerHeight(), width: $(window).innerWidth() };

            //set max-height for modal
            popupEl.find('.dialog-body-overflow').css("max-height", win.height - headerFooterHeight);

            var newPos = {
                top: pos.top + buttonSize.height + 5,
                left: pos.left + buttonSize.width + 5,
                zIndex: zindex + 2
            };

            if ((win.height / 2) > (buttonSize.height / 2 + pos.top)) {
                // button on the top
                newPos.top = pos.top + buttonSize.height + 5;
            }
            else {
                // button on the bottom
                newPos.top = pos.top - (5 + dialogContentElement.offsetHeight);
            }

            if ((win.width / 2) > (buttonSize.width / 2 + pos.left)) {
                // button on the left
                newPos.left = pos.left + buttonSize.width + 5;
            }
            else {
                // button on the right
                newPos.left = pos.left - (5 + dialogContentElement.offsetWidth);
            }

            //ensure visible
            if (dialogContentElement.offsetHeight + newPos.top > win.height) {
                newPos.top = win.height - dialogContentElement.offsetHeight;
            }
            if (newPos.top < 0) { newPos.top = 0; }
            if (dialogContentElement.offsetWidth + newPos.left > win.width) {
                newPos.left = win.width - dialogContentElement.offsetWidth;
            }
            if (newPos.left < 0) { newPos.left = 0; }
            //apply position
            popupEl.css(newPos);

            $window.setTimeout(function () {
                onDialogLoad(popupEl);
            });
        };

        /**
         * @ngdoc method
         * @name common.widgets.dialog.service#ensureVisible
         * @module siemens.simaticit.common.widgets.dialog
         * @access internal
         *
         * @description
         * Moves the input modal dialog to make sure the dialog is visible (if possible).
         * This function is used if the dialog is shown using the **showDialogModal** method on the browser window
         * (resized if the dialog exceeds the browser window).
         * **Note:** This function is meant for internal purpose. It can be used from outside the widget if required
         * (Example, to handle a template with variable width).
         *
         * @param {string} id Identifier of the dialog to be shown.
         */
        this.ensureVisible = function (id) {
            subscribe(this, id);
            var popupEl = $('#' + id);
            var angularPopupElement = angular.element(popupEl);
            var angularPopupControler = angularPopupElement.controller('sitDialog');

            if (angularPopupControler.positioning !== 'centered') {
                var newPos = popupEl.offset();

                // retreive the dialog content element
                var dialogContentElement = popupEl[0].firstElementChild.firstElementChild.firstElementChild; // from the popup it's the 3rd subDiv

                // gets the windows size
                var win = { height: $(window).innerHeight(), width: $(window).innerWidth() };

                //ensure visible
                if (dialogContentElement.offsetHeight + newPos.top > win.height) {
                    newPos.top = win.height - dialogContentElement.offsetHeight;
                }
                if (newPos.top < 0) { newPos.top = 0; }
                if (dialogContentElement.offsetWidth + newPos.left > win.width) {
                    newPos.left = win.width - dialogContentElement.offsetWidth;
                }
                if (newPos.left < 0) { newPos.left = 0; }
                //apply position
                popupEl.css(newPos);

            }
            $window.setTimeout(function () {
                onDialogLoad(popupEl);
            });

        };

        /**
         * @ngdoc method
         * @name common.widgets.dialog.service#showDialogCenteredModal
         * @module siemens.simaticit.common.widgets.dialog
         *
         * @description
         * Shows a specific dialog in the center of the screen.
         *
         * @param {string} id Identifier of the dialog to be displayed.
         */
        this.showDialogCenteredModal = function (id) {
            subscribe(this, id);
            var zindex = upperZIndex(); // current max zindex
            var maxModalHeight = $(window).height();

            var popupEl = $('#' + id);
            var angularPopupElement = angular.element(popupEl);
            var angularPopupControler = angularPopupElement.controller('sitDialog');

            angularPopupControler.center(); // apply good style

            //set max-height for modal
            popupEl.find('.dialog-body-overflow').css("max-height", maxModalHeight - headerFooterHeight);

            //center
            var pos = { top: 0, left: 0, zIndex: zindex + 2 };
            popupEl.css(pos);

            popupEl.modal('show');
            if (swacManager.enabled) {
                dialogPromise && dialogPromise.publish('modal.overlay.show', {
                    style: {
                        'z-index': 99
                    },
                    animationWaitTime: 0
                });
            }

            // retrieve the greyed background created by the popup.
            var popUpBackdrop = popupEl.data('bs.modal').$backdrop;
            //set the z-index of the background
            popUpBackdrop.css({ zIndex: zindex + 1 });

            $window.setTimeout(function () {
                onDialogLoad(popupEl);
            });
        };


        /**
         * @ngdoc method
         * @name common.widgets.dialog.service#hideDialogModal
         * @module siemens.simaticit.common.widgets.dialog
         *
         * @description
         * Hides the specified dialog.
         *
         * @param {string} id Identifier of the dialog to be hidden.
         */
        this.hideDialogModal = function (id) {
            var popupEl = $('#' + id);

            if (popupEl.length === 0) {
                return;
            }

            var angularPopupElement = angular.element(popupEl);
            var angularPopupControler = angularPopupElement.controller('sitDialog');

            angularPopupControler.hide(); // update controler

            if (swacManager.enabled) {
                dialogPromise && dialogPromise.publish('modal.overlay.hide');
            }
            popupEl.modal('hide');
            unsubscribe();
        };

    }

})();
