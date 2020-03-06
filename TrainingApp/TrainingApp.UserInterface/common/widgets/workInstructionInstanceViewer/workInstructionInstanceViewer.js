/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.workInstructionInstanceViewer
    *
    * @description
    * This module provides functionalities related to Work Instruction Instance Viewer.
    */
    angular.module('siemens.simaticit.common.widgets.workInstructionInstanceViewer', []);

})();

(function () {
    'use strict';
    /**
   * @ngdoc directive
   * @name sitWorkInstructionInstanceViewer
   * @module siemens.simaticit.common.widgets.workInstructionInstanceViewer
   * @description
   * Displays the Section and Step information of a Work Instruction instance.
   *
   * @usage
   * As an element:
   * ```
   * <sit-work-instruction-instance-viewer
   *        sit-instance-id='instanceId'
   *        sit-acknowledge-callback='acknowledgeCallback'
   *        sit-confirm-data-collection-callback='confirmDataCollectionCallback'
   *        sit-re-edit-step-callback='reEditStepCallback'
   *        sit-auto-save-callback='autoSaveCallback'
   *        sit-read-only='true'>
   * </sit-work-instruction-instance-viewer>
   * ```
   * @restrict E
   * @param {String} sitInstanceId The Id of the Work Instruction instance.
   * @param {Function} sitAcknowledgeCallback JavaScript function that is called when the acknowledge button is clicked for a specific step.
   * @param {Function} sitConfirmDataCollectionCallback JavaScript function that is called when the confirm button is clicked for a specific step.
   * @param {Function} sitReEditStepCallback JavaScript function that is called when the re-edit button is clicked for a specific step.
   * @param {Function} sitAutoSaveCallback _(Optional)_ JavaScript function that is called when focus is changed for a specific step item.
   * @param {Bool} sitReadOnly _(Optional)_ The bool value for read-only mode. The default value is false.
   *
   */

    angular.module('siemens.simaticit.common.widgets.workInstructionInstanceViewer').directive('htmlRenderComplete', ['$timeout',
        function ($timeout) {
            return {
                replace: false,
                scope: {
                    'ngModel': '='
                },
                link: function (scope, element) {
                    $timeout(function () {
                        var tables = element.find('table');
                        (tables && tables.length && (_.each(tables, function (item) {
                            item.style['border-spacing'] = item.getAttribute('cellspacing') + 'px';

                            var tData = item.getElementsByTagName("td");
                            (tData && tData.length && (_.each(tData, function (data) {
                                data.style['padding'] = item.getAttribute('cellpadding') + 'px';
                            })));

                            var tHead = item.getElementsByTagName("th");
                            (tHead && tHead.length && (_.each(tHead, function (data) {
                                data.style['padding'] = item.getAttribute('cellpadding') + 'px';
                            })));
                        })));

                    });
                }
            };
        }
    ]);

    angular.module('siemens.simaticit.common.widgets.workInstructionInstanceViewer').directive('sitWorkInstructionInstanceViewer', sitWorkInstructionInstanceViewer);
    function sitWorkInstructionInstanceViewer() {
        return {
            bindToController: {
                sitInstanceId: '@',
                sitAcknowledgeCallback: '&',
                sitConfirmDataCollectionCallback: '&',
                sitAcquireDataCollectionCallback: '&',
                sitReadOnly: '@?',
                sitAutoSaveCallback: '&?',
                sitReEditStepCallback: '&'
            },
            scope: {},
            restrict: 'E',
            transclude: true,
            templateUrl: 'common/widgets/workInstructionInstanceViewer/work-instruction-instance-viewer.html',
            controller: WorkInstructionInstanceViewerCtr,
            controllerAs: 'instanceViewerCtr'
        };
    }
    WorkInstructionInstanceViewerCtr.$inject = ['$scope', '$window', '$element', '$timeout', '$filter',
        'common.services.ui.authentication', 'common.services.signalManager', 'common.services.logger.service', 'common.widgets.workInstructionInstanceViewer.service'];
    function WorkInstructionInstanceViewerCtr($scope, $window, $element, $timeout, $filter, authenticationService, signalService, loggerService, service) {
        var vm = this;
        var isSectionSingle, element, openSectionIndex, stepItemsBackup, timerToolBoxHeight, timerConnection;

        activate();

        function activate() {
            init();
            initSignalConnection();
            getDesign();
            registerEvents();
        }
        function init() {
            isSectionSingle = false;
            element = $element;
            openSectionIndex = -1;

            vm.sections = [];
            vm.steps = [];
            vm.isAllExpanded = false;
            vm.signalConnections = {};
            vm.user = authenticationService.getIndentity().unique_name;
            vm.sitReadOnly = vm.sitReadOnly && vm.sitReadOnly.toLowerCase() === 'true' ? true : false;
            vm.isReEditEnabled = false;
            vm.semiAuto = 'SemiAutomatic';

            vm.toggleOpen = toggleOpen;
            vm.toggleExpand = toggleExpand;
            vm.hasAcquireField = hasAcquireField;
            vm.hasAcquireStep = hasAcquireStep;
            vm.saveStepItem = saveStepItem;
            vm.acknowledge = acknowledge;
            vm.confirmDataCollectionStep = confirmDataCollectionStep;
            vm.acquireDataCollectionStep = acquireDataCollectionStep;
            vm.reEditStep = reEditStep;

            //listener to the resize event to detect resizing
            angular.element($window).bind('resize', setToolboxHeight);

            $scope.$on('$destroy', onDestroy);
        }

        function getDesign() {
            service.getWIInstanceDesign(vm.sitInstanceId, vm.sitReadOnly).then(function (data) {
                vm.sections = data.sections;
                isSectionSingle = data.isSectionSingle;
                vm.isReEditEnabled = data.isReEditEnabled;

                vm.steps = _.chain(vm.sections).pluck('Steps').flatten().value();
                stepItemsBackup = angular.copy(_.chain(vm.steps).pluck('DataCollectionItems').flatten().value());

                //Timeout used to fix IE rendering issue
                timerToolBoxHeight = $timeout(function () {
                    setToolboxHeight();
                });
            });
        }
        function setToolboxHeight() {
            var instanceViewerContainer = element.find('.instance-viewer-content');
            var sectionContainer = element.find('.custom-accordion.sections');
            var height = instanceViewerContainer.height();
            if (vm.sections.length > 1) {
                height -= 32;
            }
            sectionContainer.css('height', height - 4 + 'px');
        }

        function toggleOpen(section) {
            if (!section.isOpen) {
                section.isOpen = true;

                var closedItemIndex = _.findIndex(vm.sections, function (sec) {
                    return sec.isOpen === false;
                });
                if (closedItemIndex === -1) {
                    vm.isAllExpanded = true;
                }
            } else if (!isSectionSingle) {
                section.isOpen = false;

                var openItemIndex = _.findIndex(vm.sections, function (sec) {
                    return sec.isOpen === true;
                });
                if (openItemIndex === -1) {
                    vm.isAllExpanded = false;
                }
            }
        }
        function toggleExpand() {
            vm.isAllExpanded = !vm.isAllExpanded;
            _.each(vm.sections, function (section) {
                section.isOpen = vm.isAllExpanded;
            });
        }
        function hasAcquireField(step, item) {
            var acquireField = false;
            if (step.Type === 'DataCollection' && step.Items) {
                for (var i = 0; i < step.Items.length; i++) {
                    if (step.Items[i].id === item.id && step.Items[i].AcquisitionBehavior === vm.semiAuto) {
                        acquireField = true;
                        break;
                    }
                }
            }
            return acquireField ? true : false;
        }
        function hasAcquireStep(step) {
            var hasAcquire = false;
            if (step.Type === 'DataCollection' && step.Items) {
                for (var i = 0; i < step.Items.length; i++) {
                    if (step.Items[i].AcquisitionBehavior === vm.semiAuto) {
                        hasAcquire = true;
                        break;
                    }
                }
            }
            return hasAcquire ? true : false;
        }
        function saveStepItem(stepItem) {
            //Auto Save not configured
            if (typeof vm.sitAutoSaveCallback === "undefined") {
                return;
            }

            var item = _.find(stepItemsBackup, function (oldItem) {
                return oldItem && oldItem.Id === stepItem.Id;
            });

            var oldValue = '';
            var newvalue = '';
            if (stepItem.UIControl === 'Checkbox') {
                oldValue = item.formData.value[0].checked.toString();
                newvalue = stepItem.formData.value[0].checked.toString();
            } else if (stepItem.UIControl === 'Dropdown') {
                oldValue = item.formData.value.value;
                newvalue = stepItem.formData.value.value;
            } else if (stepItem.UIControl === 'Datetime') {
                oldValue = item.formData.value ? item.formData.value.toISOString() : '';
                newvalue = stepItem.formData.value ? stepItem.formData.value.toISOString() : '';
            } else {
                oldValue = item.formData.value;
                newvalue = stepItem.formData.value;
            }

            if (oldValue === newvalue) {
                return;
            }

            item.formData.value = angular.copy(stepItem.formData.value);
            vm.sitAutoSaveCallback({
                itemId: stepItem.Id,
                value: newvalue
            });
        }
        function acknowledge(step) {
            vm.sitAcknowledgeCallback({
                stepId: step.Id
            });
        }
        function confirmDataCollectionStep(step) {
            var itemValues = [];
            step.DataCollectionItems.forEach(function (item, index) {
                var value = '';
                if (item.UIControl === 'Checkbox') {
                    value = item.formData.value[0].checked.toString();
                } else if (item.UIControl === 'Dropdown') {
                    value = item.formData.value ? item.formData.value.value : '';
                } else if (item.UIControl === 'Datetime') {
                    value = item.formData.value ? item.formData.value.toISOString() : '';
                } else {
                    value = item.formData.value;
                }
                itemValues[index] = {
                    NId: item.NId,
                    ItemValue: value || value === 0 ? value.toString() : ''
                };
            });

            vm.sitConfirmDataCollectionCallback({
                stepId: step.Id,
                items: itemValues
            });
        }
        function acquireDataCollectionStep(step) {
            var indices = findStepAndSectionIndex(step.Id);
            var ids = {
                sectionId: vm.sections[indices[1]].Id,
                stepId: step.Id
            }
            var itemIds = [];
            if (step.Type === 'DataCollection' && step.Items) {
                step.Items.forEach(function (item, index) {
                    if (item.AcquisitionBehavior === vm.semiAuto) {
                        itemIds.push(item.Id);
                    }
                });
            }
            vm.sitAcquireDataCollectionCallback({ ids: ids, items: itemIds }).then(function (itemsIdValue) {
                itemsIdValue.forEach(function (itemIdValue, indexIdValue) {
                    step.DataCollectionItems.forEach(function (item, index) {
                        if (itemIdValue.Id === item.Id) {
                            acquireDataCollectionStepCheck(item, itemIdValue);
                        }
                    });
                });
            }, function (err) {

            });
        }
        function acquireDataCollectionStepCheck(item, itemIdValue) {
            if (item.UIControl === 'Checkbox') {
                item.formData.value[0].checked = (itemIdValue.ItemValue === 'true');
            } else if (item.UIControl === 'Dropdown') {
                item.formData.value = $filter('filter')(item.formData.options, { value: itemIdValue.ItemValue }, true)[0];
                if (!item.formData.value) {
                    item.formData.value = { value: "" };
                }
            } else if (item.UIControl === 'Datetime') {
                item.formData.value = itemIdValue.ItemValue ? new Date(itemIdValue.ItemValue) : '';
            } else if (item.UIControl === 'Number') {
                item.formData.value = Number(itemIdValue.ItemValue);
            } else {
                item.formData.value = itemIdValue.ItemValue;
            }
        }

        function reEditStep(stepId) {
            vm.sitReEditStepCallback({
                stepId: stepId
            });

            var indices = findStepAndSectionIndex(stepId);
            var reEditedStepIndex = indices[0];
            var reEditedSectionIndex = indices[1];

            vm.sections[reEditedSectionIndex].Steps[reEditedStepIndex].IsCompleted = false;
            vm.sections[reEditedSectionIndex].Steps[reEditedStepIndex].isDisabled = false;
            vm.sections[reEditedSectionIndex].Steps[reEditedStepIndex].isOpen = true;
            vm.sections[reEditedSectionIndex].Steps[reEditedStepIndex].isReEdited = true;
            vm.sections[reEditedSectionIndex].IsCompleted = false;

            for (var i = reEditedStepIndex + 1; i < vm.sections[reEditedSectionIndex].Steps.length; i++) {
                vm.sections[reEditedSectionIndex].Steps[i].isDisabled = true;
                vm.sections[reEditedSectionIndex].Steps[i].isOpen = false;
            }

            for (var j = reEditedSectionIndex + 1; j < vm.sections.length; j++) {
                for (i = 0; i < vm.sections[j].Steps.length; i++) {
                    vm.sections[j].Steps[i].isDisabled = true;
                    vm.sections[j].Steps[i].isOpen = false;
                }
            }
        }
        /**
         * Returns the section and step index for the first 'isCompleted' step.
         */
        function enableStep() {
            var sec = -1;
            var step = -1;
            for (var i = 0; i < vm.sections.length; i++) {
                for (var j = 0; j < vm.sections[i].Steps.length; j++) {
                    if (!vm.sections[i].Steps[j].IsCompleted) {
                        step = j;
                        sec = i;
                        break;
                    }
                }
                if (step !== -1) {
                    break;
                }
            }
            return [sec, step];
        }
        /**
         * Returns the page no, for a step, which is located in any section.
         * @param {any} sec
         * @param {any} step
         */
        function stepNumber(sec, step) {
            var num = 0;
            var i = 1;
            while (i <= (sec + 1)) {
                if (i === (sec + 1)) {
                    num = num + (step + 1);
                } else {
                    num = num + (vm.sections[i - 1].Steps.length);
                }
                i++;
            }
            return num;
        }
        function onStepCompleted(signal) {
            if (signal.WorkInstructionId !== vm.sitInstanceId) {
                // Not current instance
                return;
            }
            var completedStepIndex = -1;
            openSectionIndex = -1;
            //Find Step
            var indices = findStepAndSectionIndex(signal.WorkInstructionStepId);
            completedStepIndex = indices[0];
            openSectionIndex = indices[1];

            var arr = [];
            if (vm.sections[openSectionIndex].Steps[completedStepIndex].hasOwnProperty('isReEdited')
                && vm.sections[openSectionIndex].Steps[completedStepIndex].isReEdited) {
                vm.sections[openSectionIndex].Steps[completedStepIndex].isReEdited = false;
            }
            vm.sections[openSectionIndex].Steps[completedStepIndex].isOpen = false;
            vm.sections[openSectionIndex].Steps[completedStepIndex].IsCompleted = true;
            vm.sections[openSectionIndex].Steps[completedStepIndex].IsSignaturePending = false;
            vm.sections[openSectionIndex].Steps[completedStepIndex].CompletedBy = signal.CompletedBy;
            vm.sections[openSectionIndex].Steps[completedStepIndex].AcknowledgeOn = signal.AcknowledgeOn;
            if (signal.Items) {
                updateDataCollectionItemValues(signal.Items, openSectionIndex, completedStepIndex);
            }

            if (vm.sections[openSectionIndex].currentPage + 1 <= vm.sections[openSectionIndex].Steps.length) {
                arr = enableStep();
                /**
                 * Checks for the first step which is in re-edit mode from the the current step.
                 */
                if (arr.length > 0 && arr[0] <= openSectionIndex
                    && (stepNumber(arr[0], arr[1]) < stepNumber(openSectionIndex, completedStepIndex))) {
                    vm.sections[openSectionIndex].Steps[completedStepIndex + 1].isDisabled = true;
                } else {
                    vm.sections[openSectionIndex].Steps[completedStepIndex + 1].isDisabled = vm.sections[openSectionIndex].Steps[completedStepIndex + 1].IsCompleted;
                }
                if (signal.CompletedBy === vm.user) {
                    //Open next step
                    if (arr.length > 0 && arr[0] <= openSectionIndex
                        && (stepNumber(arr[0], arr[1]) < stepNumber(openSectionIndex, completedStepIndex))) {
                        vm.sections[arr[0]].Steps[arr[1]].isOpen = true;
                    } else {
                        vm.sections[openSectionIndex].currentPage += 1;
                        vm.sections[openSectionIndex].Steps[completedStepIndex + 1].isOpen = true;
                    }
                }
            }
            $scope.$apply();
        }
        function onSectionCompleted(signal) {
            if (signal.WorkInstructionId !== vm.sitInstanceId) {
                // Not current instance
                return;
            }

            //Find Section
            var completedSectionIndex = -1;
            for (var i = 0; i < vm.sections.length; i++) {
                if (vm.sections[i].Id === signal.WorkInstructionSectionId) {
                    completedSectionIndex = i;
                    break;
                }
            }
            var completedSection = vm.sections[completedSectionIndex];

            completedSection.IsCompleted = true;

            if (completedSectionIndex + 1 < vm.sections.length) {
                //Open next section
                vm.sections[completedSectionIndex + 1].isOpen = true;
                for (i = 0; i < vm.sections[completedSectionIndex + 1].Steps.length; i++) {
                    if (!vm.sections[completedSectionIndex + 1].Steps[i].IsCompleted) {
                        vm.sections[completedSectionIndex + 1].Steps[i].isDisabled = false;
                        vm.sections[completedSectionIndex + 1].Steps[i].isOpen = true;
                        break;
                    } else {
                        vm.sections[completedSectionIndex + 1].Steps[i].isDisabled = true;
                        vm.sections[completedSectionIndex + 1].Steps[i].isOpen = false;
                    }
                }
            }

            if (signal.CompletedBy === vm.user) {
                completedSection.isOpen = isSectionSingle || false;

                var openItemIndex = _.findIndex(vm.sections, function (section) {
                    return section.isOpen === true;
                });
                if (openItemIndex === -1) {
                    vm.isAllExpanded = false;
                }
            }
            $scope.$apply();
        }
        function onStepPending(signal) {
            if (signal.WorkInstructionId !== vm.sitInstanceId) {
                // Not current instance
                return;
            }
            var acknowledgeStepIndex = -1;
            openSectionIndex = -1;
            //Find Step
            var indices = findStepAndSectionIndex(signal.WorkInstructionStepId);
            acknowledgeStepIndex = indices[0];
            openSectionIndex = indices[1];

            vm.sections[openSectionIndex].Steps[acknowledgeStepIndex].isOpen = true;
            vm.sections[openSectionIndex].Steps[acknowledgeStepIndex].IsSignaturePending = signal.IsSignaturePending;
            vm.sections[openSectionIndex].Steps[acknowledgeStepIndex].CompletedBy = signal.CompletedBy;
            vm.sections[openSectionIndex].Steps[acknowledgeStepIndex].AcknowledgeOn = signal.AcknowledgedOn;
            if (signal.ScenarioInstanceId) {
                vm.sections[openSectionIndex].Steps[acknowledgeStepIndex].ScenarioInstanceId = signal.ScenarioInstanceId;
                vm.sections[openSectionIndex].Steps[acknowledgeStepIndex].ScenarioInstance = {
                    ScenarioInstanceId: signal.ScenarioInstanceId
                }
            }
            else {
                vm.sections[openSectionIndex].Steps[acknowledgeStepIndex].ScenarioInstance = null;
            }
            if (signal.Items) {
                updateDataCollectionItemValues(signal.Items, openSectionIndex, acknowledgeStepIndex);
            }

            $scope.$apply();
        }
        function findStepAndSectionIndex(stepId) {
            var sec = -1;
            var step = -1;
            for (var i = 0; i < vm.sections.length; i++) {
                for (var j = 0; j < vm.sections[i].Steps.length; j++) {
                    if (vm.sections[i].Steps[j].Id === stepId) {
                        step = j;
                        sec = i;
                        break;
                    }
                }
                if (step !== -1) {
                    break;
                }
            }
            return [step, sec];
        }
        function updateDataCollectionItemValues(items, openSectionIndex, completedStepIndex) {
            var isStepOutOfSpecValues = false;
            vm.sections[openSectionIndex].Steps[completedStepIndex].DataCollectionItems.map(function (item) {
                var signalItem = _.findWhere(items, { NId: item.NId });
                if (signalItem) {
                    switch (item.UIControl) {
                        case 'Checkbox':
                            switch (signalItem.ItemValue) {
                                case 'null':
                                    item.formData.value[0].checked = 'null';
                                    break;
                                case 'true':
                                    item.formData.value[0].checked = true;
                                    break;
                                default:
                                    item.formData.value[0].checked = false;
                            }
                            break;
                        case 'Dropdown':
                            item.formData.value = signalItem.ItemValue ? _.findWhere(item.formData.options, { value: signalItem.ItemValue }) : '';
                            break;
                        case 'Datetime':
                            item.formData.value = signalItem.ItemValue ? new Date(signalItem.ItemValue) : '';
                            break;
                        case 'Number':
                            item.formData.value = signalItem.ItemValue ? parseFloat(signalItem.ItemValue) : '';
                            break;
                        default:
                            item.formData.value = signalItem.ItemValue;
                    }
                    if (!isStepOutOfSpecValues && signalItem.IsOutOfSpec) {
                        isStepOutOfSpecValues = true;
                    }
                }
                return item.formData.value;
            });
            vm.sections[openSectionIndex].Steps[completedStepIndex].IsOutOfSpecValues = isStepOutOfSpecValues;
        }

        function initSignalConnection() {
            signalService.createConnection('WorkInstruction', 'WorkInstructionStepCompletedSignal', connectionErrorCallback).then(function (signalConnection) {
                if (signalConnection.signalManager.isOpen) {
                    vm.signalConnections['WorkInstructionStepCompleted'] = signalConnection;
                    loggerService.log('Connection has been established successfully. Connection State: ' + signalConnection.state());
                    subscribeToStepCompleted();
                } else {
                    loggerService.log('Wrong signal');
                }
            }, function (error) {
                loggerService.log('Error in opening a connection \n' + angular.toJson(error, true));
            });
            signalService.createConnection('WorkInstruction', 'WorkInstructionSectionCompletedSignal', connectionErrorCallback).then(function (signalConnection) {
                if (signalConnection.signalManager.isOpen) {
                    vm.signalConnections['WorkInstructionSectionCompleted'] = signalConnection;
                    loggerService.log('Connection has been established successfully. Connection State: ' + signalConnection.state());
                    subscribeToSectionCompleted();
                } else {
                    loggerService.log('Wrong signal');
                }
            }, function (error) {
                loggerService.log('Error in opening a connection \n' + angular.toJson(error, true));
            });
            signalService.createConnection('WorkInstruction', 'OnWorkInstructionStepInPendingSignal', connectionErrorCallback).then(function (signalConnection) {
                if (signalConnection.signalManager.isOpen) {
                    vm.signalConnections['OnWorkInstructionStepInPending'] = signalConnection;
                    loggerService.log('Connection has been established successfully. Connection State: ' + signalConnection.state());
                    subscribeToStepPending();
                } else {
                    loggerService.log('Wrong signal');
                }
            }, function (error) {
                loggerService.log('Error in opening a connection \n' + angular.toJson(error, true));
            });
        }
        function subscribeToStepCompleted() {
            vm.signalConnections["WorkInstructionStepCompleted"].subscribe("EnvelopeModule eq 'WorkInstruction' and EnvelopeTopic eq 'WorkInstruction'",
                onStepCompleted, onError, onComplete).then(function (data) {
                    loggerService.log("subscribe callback");
                }, function (error) {
                    loggerService.log("subscribe error");
                });
        }
        function subscribeToSectionCompleted() {
            vm.signalConnections["WorkInstructionSectionCompleted"].subscribe("EnvelopeModule eq 'WorkInstruction' and EnvelopeTopic eq 'WorkInstruction'",
                onSectionCompleted, onError, onComplete).then(function (data) {
                    loggerService.log("subscribe callback");
                }, function (error) {
                    loggerService.log("subscribe error");
                });
        }
        function subscribeToStepPending() {
            vm.signalConnections["OnWorkInstructionStepInPending"].subscribe("EnvelopeModule eq 'WorkInstruction' and EnvelopeTopic eq 'WorkInstruction'",
                onStepPending, onError, onComplete).then(function (data) {
                    loggerService.log("subscribe callback");
                }, function (error) {
                    loggerService.log("subscribe error");
                });
        }
        function connectionErrorCallback(conn, reason) {
            var counter = [];
            loggerService.log("Connection Error Callback: " + conn.id + "Reason:" + reason.reason);
            conn.reconnect().then(function () {
                counter[conn.id] = 0;
            }, function (err) {
                if (counter[conn.id] === undefined) {
                    counter[conn.id] = 0;
                } else {
                    counter[conn.id] = counter[conn.id] + 1;
                }
                loggerService.log("attempt number " + counter[conn.id] + " id: " + conn.id);
                if (counter[conn.id] > 10) {
                    return;
                }
                timerConnection = $timeout(function () {
                    connectionErrorCallback(conn, reason);
                }, 5000);
            });
        } function onError(error) {
            loggerService.log("An error occurred: \n" + angular.toJson(error, true));
        }
        function onComplete() {
            loggerService.log("Signal stopped sending messages.");
        }
        function destroySignalServiceConnections() {
            angular.forEach(vm.signalConnections, function (value, key) {
                signalService.destroyConnection(vm.signalConnections[key].id).then(function () {
                    vm.signalConnections[key] = undefined;
                    loggerService.log("Closed Connection " + key);
                }, function (error) {
                    loggerService.log("Error in Closing Connection \n" + angular.toJson(error, true));
                });
            });
        }

        function registerEvents() {
            vm.propertyGridValidityChangedEvent = $scope.$on('sit-property-grid.validity-changed', onPropertyGridValidityChange);
        }
        function onPropertyGridValidityChange(event, params) {
            for (var i = 0; i < vm.steps.length; i++) {
                var tempStep = vm.steps[i];
                if (params.id === 'content_fields_form_' + tempStep.sectionNId + "_" + tempStep.NId) {
                    tempStep.validInputs = params.validity;
                    break;
                }
            }
        }
        function onDestroy() {
            angular.element($window).unbind('resize', setToolboxHeight);
            destroySignalServiceConnections();
            vm.propertyGridValidityChangedEvent();
            $timeout.cancel(timerToolBoxHeight);
            $timeout.cancel(timerConnection);
        }
    }
})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var WorkInstructionInstanceViewerService = /** @class */ (function () {
            function WorkInstructionInstanceViewerService($q, $sce, backendService, $translate, $filter) {
                this.$q = $q;
                this.$sce = $sce;
                this.backendService = backendService;
                this.$translate = $translate;
                this.$filter = $filter;
            }
            WorkInstructionInstanceViewerService.prototype.getWIInstanceDesign = function (Id, isReadOnly) {
                var _this = this;
                var svc = this;
                var workInstruction;
                var defer = this.$q.defer();
                var sce = this.$sce;
                var isSectionSingle = false;
                var isAuditTrailInstalled = this.backendService.getAppEndPoint('AuditTrail');
                var workInstructionQuery = {
                    appName: 'WorkInstruction',
                    entityName: 'WorkInstruction',
                    options: '$select=Id,NId,WorkInstructionDefinitionNId,WorkInstructionDefinitionRevision,IsReEditEnabled,Status&$filter=Id eq ' + Id + '&$expand=Sections($expand=Steps($expand=Items($expand=Limit)))'
                };
                this.backendService.findAll(workInstructionQuery).then(function (result) {
                    workInstruction = result.value[0];
                    var designQuery = {
                        appName: 'WorkInstruction',
                        entityName: 'WorkInstruction',
                        options: '$select=Id,NId,Design&$filter=Id eq ' + Id
                    };
                    _this.backendService.findAll(designQuery).then(function (data) {
                        var model = JSON.parse(data.value[0].Design.Model);
                        var sections = model.WorkInstruction.Sections;
                        isSectionSingle = model.WorkInstruction.Sections.length === 1;
                        sections.forEach(function (section) {
                            var modelSteps = section.Steps;
                            _.extend(section, _.findWhere(workInstruction.Sections, { NId: section.NId }));
                            section.Steps = _.sortBy(section.Steps, function (step) { return step.Sequence; });
                            section.Steps.forEach(function (step) {
                                _.extend(step, _.findWhere(modelSteps, { NId: step.NId }));
                                step.sectionNId = section.NId;
                                step.stepInstruction = sce.trustAsHtml(step.Instructions);
                                step.isOpen = !step.IsCompleted;
                                step.displayName = step.NId;
                                if (step.Title) {
                                    step.displayName += ' - ' + step.Title;
                                }
                                if (step.Type === 'DataCollection' && step.Items) {
                                    svc.getDataCollectionItems(step);
                                }
                                if (isAuditTrailInstalled !== null && (step.ScenarioConfiguration && step.ScenarioConfiguration.NId !== null || (step.ScenarioInstanceId && (step.IsSignaturePending || step.IsCompleted)))) {
                                    step.IsSignButtonVisible = true;
                                }
                                step.ScenarioInstance = {
                                    ScenarioInstanceId: step.ScenarioInstanceId
                                };
                            });
                            section.isOpen = isSectionSingle || !section.IsCompleted;
                            section.noOfSteps = section.Steps.length;
                            section.currentPage = 1;
                            section.displayName = section.NId;
                            if (section.Title) {
                                section.displayName += ' - ' + section.Title;
                            }
                        });
                        if (isReadOnly || workInstruction.Status.StatusNId === 'Completed' || workInstruction.Status.StatusNId === 'Aborted') {
                            sections = svc.getReadOnlyMode(sections);
                        }
                        else {
                            _this.findFirstSectionStepOpen(sections, isSectionSingle);
                        }
                        var returnObj = {
                            'sections': sections,
                            'isSectionSingle': isSectionSingle,
                            'isReEditEnabled': workInstruction.IsReEditEnabled && (workInstruction.Status.StatusNId === 'Completed' || workInstruction.Status.StatusNId === 'InEditing')
                        };
                        defer.resolve(returnObj);
                    });
                }, function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            };
            WorkInstructionInstanceViewerService.prototype.getDataCollectionItems = function (step) {
                var svc = this;
                step.DataCollectionItems.map(function (item) {
                    var defaultOrBindedValue;
                    var target;
                    var highLimit;
                    var lowLimit;
                    _.extend(item, _.findWhere(step.Items, {
                        ItemNId: item.NId,
                        WorkInstructionStep_Id: step.Id
                    }));
                    if (item.IsOutOfSpec && !step.IsOutOfSpecValues) {
                        step.IsOutOfSpecValues = item.IsOutOfSpec;
                    }
                    item.formData = {};
                    item.formData.Label = item.Data.Annotations.filter(function (a) { return a.Name === 'Label'; })[0].Value;
                    item.formData.Caption = item.Data.Annotations.filter(function (a) { return a.Name === 'Caption'; })[0].Value;
                    switch (item.UIControl) {
                        case 'Text': {
                            defaultOrBindedValue = item.DefaultValue ? item.DefaultValue : '';
                            item.formData.value = item.ItemValue === "" || item.ItemValue ? item.ItemValue : defaultOrBindedValue;
                            item.formData.Placeholder = item.Data.Annotations.filter(function (a) { return a.Name === 'Placeholder'; })[0].Value;
                            item.formData.Validation = {
                                required: item.IsRequired,
                                maxlength: item.Data.Limits.filter(function (a) { return a.Name === 'Length'; })[0].Value
                            };
                            break;
                        }
                        case 'Number':
                            target = item.Data.Limits.filter(function (a) { return a.Name === 'Target'; })[0];
                            highLimit = item.Data.Limits.filter(function (a) { return a.Name === 'HighLimit'; })[0];
                            lowLimit = item.Data.Limits.filter(function (a) { return a.Name === 'LowLimit'; })[0];
                            defaultOrBindedValue = item.DefaultValue ? parseFloat(item.DefaultValue) : '';
                            item.formData.value = item.ItemValue === "" || item.ItemValue ? parseFloat(item.ItemValue) : defaultOrBindedValue;
                            item.formData.Target = item.Limit && item.Limit.length > 0 && item.Limit[0].Target ? item.Limit[0].Target : '';
                            item.formData.IsTargetVisible = target.IsVisible;
                            item.formData.IsHighLimitVisible = highLimit.IsVisible;
                            item.formData.IsLowLimitVisible = lowLimit.IsVisible;
                            item.formData.lowLimit = item.Limit[0].LowLimit;
                            item.formData.highLimit = item.Limit[0].HighLimit;
                            item.formData.Validation = {
                                required: item.IsRequired,
                                custom: function (value, ngModel) {
                                    svc.validateNumber(value, item);
                                }
                            };
                            item.formData.Uom = item.Data.Annotations.filter(function (a) { return a.Name === 'Uom'; })[0].Value;
                            break;
                        case 'Multiline':
                            defaultOrBindedValue = item.DefaultValue ? item.DefaultValue : '';
                            item.formData.value = item.ItemValue === "" || item.ItemValue ? item.ItemValue : defaultOrBindedValue;
                            item.formData.Placeholder = item.Data.Annotations.filter(function (a) { return a.Name === 'Placeholder'; })[0].Value;
                            item.formData.Size = item.Data.Limits.filter(function (a) { return a.Name === 'Size'; })[0].Value.toLowerCase();
                            item.formData.Validation = {
                                required: item.IsRequired,
                                maxlength: item.Data.Limits.filter(function (a) { return a.Name === 'Length'; })[0].Value
                            };
                            break;
                        case 'Checkbox':
                            switch (item.DefaultValue) {
                                case 'true':
                                    defaultOrBindedValue = true;
                                    break;
                                case 'false':
                                    defaultOrBindedValue = false;
                                    break;
                                default:
                                    defaultOrBindedValue = 'null';
                            }
                            target = item.Data.Limits.filter(function (a) { return a.Name === 'Target'; })[0];
                            if (item.Limit && item.Limit.length > 0 && item.Limit[0].Target && item.Limit[0].Target !== 'null') {
                                item.formData.Target = item.Limit[0].Target;
                            }
                            else {
                                item.formData.Target = '';
                            }
                            item.formData.IsTargetVisible = target.IsVisible;
                            var checkBoxValue = item.Data.Annotations.filter(function (a) { return a.Name === 'CheckBoxValue'; })[0];
                            if (typeof item.ItemValue === 'string') {
                                switch (item.ItemValue) {
                                    case 'true':
                                        item.formData.value = [{
                                                label: checkBoxValue ? checkBoxValue.Value : '',
                                                checked: true
                                            }];
                                        break;
                                    case 'false':
                                        item.formData.value = [{
                                                label: checkBoxValue ? checkBoxValue.Value : '',
                                                checked: false
                                            }];
                                        break;
                                    default:
                                        item.formData.value = [{
                                                label: checkBoxValue ? checkBoxValue.Value : '',
                                                checked: "null"
                                            }];
                                }
                            }
                            else {
                                item.formData.value = [{
                                        label: checkBoxValue ? checkBoxValue.Value : '',
                                        checked: defaultOrBindedValue
                                    }];
                            }
                            item.formData.Validation = {
                                required: item.IsRequired,
                                custom: function (value, ngModel) {
                                    svc.validateTarget(value, item);
                                }
                            };
                            break;
                        case 'Dropdown':
                            item.formData.options = [];
                            item.formData.validation = {
                                required: item.IsRequired
                            };
                            item.Data.Items.forEach(function (option, index) {
                                item.formData.options[index] = {
                                    label: option.label,
                                    value: option.value
                                };
                            });
                            item.formData.value = item.ItemValue === "" || item.ItemValue ? _.findWhere(item.formData.options, { value: item.ItemValue }) : '';
                            break;
                        case 'MultipleChoice':
                            item.formData.value = item.ItemValue === "" || item.ItemValue ? item.ItemValue : '';
                            target = item.Data.Limits.filter(function (a) { return a.Name === 'Target'; })[0];
                            item.formData.Target = item.Limit && item.Limit.length > 0 && item.Limit[0].Target ? item.Limit[0].Target : '';
                            item.formData.IsTargetVisible = target.IsVisible;
                            item.formData.options = [];
                            item.Data.Items.forEach(function (option, index) {
                                item.formData.options[index] = {
                                    label: option,
                                    value: option
                                };
                            });
                            item.formData.Validation = {
                                required: item.IsRequired,
                                custom: function (value, ngModel) {
                                    svc.validateTarget(value, item);
                                }
                            };
                            break;
                        case 'Datetime':
                            target = item.Data.Limits.filter(function (a) { return a.Name === 'Target'; })[0];
                            highLimit = item.Data.Limits.filter(function (a) { return a.Name === 'HighLimit'; })[0];
                            lowLimit = item.Data.Limits.filter(function (a) { return a.Name === 'LowLimit'; })[0];
                            item.formData.Target = item.Limit && item.Limit.length > 0 && item.Limit[0].Target ? item.Limit[0].Target : '';
                            item.formData.IsTargetVisible = target.IsVisible;
                            item.formData.IsHighLimitVisible = highLimit.IsVisible;
                            item.formData.IsLowLimitVisible = lowLimit.IsVisible;
                            item.formData.lowLimit = item.Limit && item.Limit.length > 0 ? item.Limit[0].LowLimit : '';
                            item.formData.highLimit = item.Limit && item.Limit.length > 0 ? item.Limit[0].HighLimit : '';
                            item.formData.Validation = {
                                required: item.IsRequired,
                                custom: function (value, ngModel) {
                                    svc.validateDatetime(value, item);
                                }
                            };
                            defaultOrBindedValue = item.DefaultValue ? new Date(item.DefaultValue) : '';
                            item.formData.value = item.ItemValue === "" || item.ItemValue ? new Date(item.ItemValue) : defaultOrBindedValue;
                            break;
                    }
                    return item;
                });
            };
            WorkInstructionInstanceViewerService.prototype.validateNumber = function (value, item) {
                if (value && item) {
                    value = parseFloat(value);
                    var lowLimit = parseFloat(item.formData.lowLimit);
                    var highLimit = parseFloat(item.formData.highLimit);
                    if ((!isNaN(lowLimit) && !isNaN(highLimit)) && (value < lowLimit || value > highLimit)) {
                        item.formData.validationMessage = this.$translate.instant('instanceViewer.dataCollection.rangeMessage', { lowLimit: item.formData.lowLimit, highLimit: item.formData.highLimit });
                    }
                    else if (!isNaN(lowLimit) && lowLimit && value < lowLimit) {
                        item.formData.validationMessage = this.$translate.instant('instanceViewer.dataCollection.lowLimitMessage', { lowLimit: item.formData.lowLimit });
                    }
                    else if (!isNaN(highLimit) && highLimit && value > highLimit) {
                        item.formData.validationMessage = this.$translate.instant('instanceViewer.dataCollection.highLimitMessage', { highLimit: item.formData.highLimit });
                    }
                    else {
                        item.formData.validationMessage = '';
                    }
                }
                else {
                    item.formData.validationMessage = "";
                }
            };
            WorkInstructionInstanceViewerService.prototype.validateDatetime = function (value, item) {
                if (value && item) {
                    value = Date.parse(value);
                    var lowLimit = item.formData.lowLimit ? Date.parse(item.formData.lowLimit) : '';
                    var highLimit = item.formData.highLimit ? Date.parse(item.formData.highLimit) : '';
                    var lowDate = item.formData.lowLimit ? this.$filter('date')(new Date(item.formData.lowLimit), 'MMM dd,y hh:mm:ss a') : '';
                    var highDate = item.formData.highLimit ? this.$filter('date')(new Date(item.formData.highLimit), 'MMM dd,y hh:mm:ss a') : '';
                    if (lowLimit && highLimit && (value < lowLimit || value > highLimit)) {
                        item.formData.validationMessage = this.$translate.instant('instanceViewer.dataCollection.rangeMessage', { lowLimit: lowDate, highLimit: highDate });
                    }
                    else if (lowLimit && value < lowLimit) {
                        item.formData.validationMessage = this.$translate.instant('instanceViewer.dataCollection.lowLimitMessage', { lowLimit: lowDate });
                    }
                    else if (highLimit && value > highLimit) {
                        item.formData.validationMessage = this.$translate.instant('instanceViewer.dataCollection.highLimitMessage', { highLimit: highDate });
                    }
                    else {
                        item.formData.validationMessage = '';
                    }
                }
                else {
                    item.formData.validationMessage = "";
                }
            };
            WorkInstructionInstanceViewerService.prototype.validateTarget = function (value, item) {
                if (item.formData.Target && value.toString() && item) {
                    if (value.toString() !== item.formData.Target) {
                        item.formData.validationMessage = this.$translate.instant('instanceViewer.dataCollection.targetMessage');
                    }
                    else {
                        item.formData.validationMessage = '';
                    }
                }
                else {
                    item.formData.validationMessage = '';
                }
            };
            WorkInstructionInstanceViewerService.prototype.getReadOnlyMode = function (sections) {
                sections.forEach(function (section) {
                    section.Steps.forEach(function (step) {
                        step.isDisabled = true;
                    });
                });
                return sections;
            };
            WorkInstructionInstanceViewerService.prototype.findFirstSectionStepOpen = function (sections, isSectionSingle) {
                var firstSectionOpenIndex = _.findIndex(sections, function (section) {
                    return section.isOpen === true;
                });
                for (var i = firstSectionOpenIndex + 1; i < sections.length; i++) {
                    sections[i].isOpen = false;
                    for (var j = 0; j < sections[i].Steps.length; j++) {
                        sections[i].Steps[j].isOpen = false;
                        sections[i].Steps[j].isDisabled = true;
                    }
                }
                var firstStepOpenIndex = _.findIndex(sections[firstSectionOpenIndex].Steps, function (step) {
                    return step.isOpen === true;
                });
                for (var k = firstStepOpenIndex + 1; k < sections[firstSectionOpenIndex].Steps.length; k++) {
                    sections[firstSectionOpenIndex].Steps[k].isOpen = false;
                    sections[firstSectionOpenIndex].Steps[k].isDisabled = true;
                }
                sections[firstSectionOpenIndex].currentPage = firstStepOpenIndex + 1;
            };
            WorkInstructionInstanceViewerService.$inject = [
                '$q',
                '$sce',
                'common.services.runtime.backendService',
                '$translate',
                '$filter'
            ];
            return WorkInstructionInstanceViewerService;
        }());
        framework.WorkInstructionInstanceViewerService = WorkInstructionInstanceViewerService;
        angular.module('siemens.simaticit.common.widgets.workInstructionInstanceViewer')
            .service('common.widgets.workInstructionInstanceViewer.service', WorkInstructionInstanceViewerService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=sit-work-instruction-instance-viewer-svc.js.map