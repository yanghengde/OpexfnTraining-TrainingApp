/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.containers
     * @access internal
     * @description
     * This module provides UI elements to edit tags for entity instance.
     */
    angular.module('siemens.simaticit.common.components.task', []);
})();




(function () {
    'use strict';

    angular.module('siemens.simaticit.common.components.task').component('siemensSimaticitTaskDetailscomponent', ComponentDefinition());

    function ComponentDefinition() {
        return {
            bindings: {
                name: '@',
                id: '@',
                TaskId: '=taskid',
                TaskName: '=taskname',
                ContextId: '=contextid'

            },
            templateUrl: 'common/components/task/detailsComponent.html',
            controller: ComponentController,
            controllerAs: 'vm'
        }
    }

    ComponentController.$inject = ['common.base', '$injector', '$rootScope', '$scope', '$stateParams'];
    function ComponentController(base, $injector, $rootScope, $scope, $stateParams) {
        var vm = this;
        var instance, logger, backendService;

        activate();
        function activate() {
            logger = base.services.logger.service.getModuleLogger('siemensSimaticitCustomcomponent');
            backendService = base.services.runtime.backendService;
            vm.taskService = null;
            vm.taskContextConfigData = []
            init();
            exposeApi()

            if ($injector.has('task.service')) {
                vm.taskService = $injector.get('task.service');
                initTaskParameterData();
                initTaskContextData();
            }
            else {

                logger.logDebug('No TaskList Service is available!')
            }

        }

        function init() {
            logger.logDebug('Initializing component....', vm.name);

            vm.ready = false;
            vm.selectedItem = null;
            vm.viewerData = [];
            vm.viewerOptions = {};
            //Initialize Model Data
            vm.taskParameterConfigData = {
                selectionMode: 'none',
                enableColumnResizing: true,
                data: []
            };
            vm.ready = true;

            vm.isNIdVisible = true;
            vm.isNameVisible = true;
            vm.isDescriptionVisible = true;
            vm.isTaskDefinitionNIdVisible = true;
            vm.isTaskDefinitionRevisionVisible = true;
            vm.isEquipmentNIdVisible = true;
            vm.isTaskFlowVisible = true;
            vm.isStatusNIdVisible = true;

            vm.selectedTask = {}
            if (($stateParams) && ($stateParams.componentStateParams) && ($stateParams.componentStateParams.taskDetailsVisible)) {
                vm.taskDetailsVisible = $stateParams.componentStateParams.taskDetailsVisible;
            }

            if (($stateParams) && ($stateParams.selectedTask)) {
                vm.selectedTask = $stateParams.selectedTask;
            } else if (($stateParams) && ($stateParams.componentStateParams) && ($stateParams.componentStateParams.taskId)) {
                vm.selectedTask.Id = $stateParams.componentStateParams.taskId;
            }
            else if (vm.TaskId) {
                vm.selectedTask.NId = vm.TaskId;
            }




            $scope.$watch('vm.ContextId', onContextIdHandler);
            $rootScope.$watch('$stateParams.componentStateParams', onLoadDataAutoHandler);

        }
        function onContextIdHandler(value) {
            if ((value) && (vm) && (vm.selectedTask)) {
                vm.selectedTask.Description = value;
            }
        }
        function onLoadDataAutoHandler(value) {
            if ((value) && (vm) && (vm.selectedTask)) {
                vm.selectedTask.Status.StatusNId = value.taskStatus;
                if (vm.taskDetailsVisible) {
                    vm.isNIdVisible = vm.taskDetailsVisible.includes("NId");
                    vm.isNameVisible = vm.taskDetailsVisible.includes("Name");
                    vm.isDescriptionVisible = vm.taskDetailsVisible.includes("Description");
                    vm.isTaskDefinitionNIdVisible = vm.taskDetailsVisible.includes("TaskDefinitionNId");
                    vm.isTaskDefinitionRevisionVisible = vm.taskDetailsVisible.includes(" TaskDefinitionRevision");
                    vm.isEquipmentNIdVisible = vm.taskDetailsVisible.includes("EquipmentNId");
                    vm.isTaskFlowVisible = vm.taskDetailsVisible.includes("TaskFlow");
                    vm.isStatusNIdVisible = vm.taskDetailsVisible.includes("StatusNId");
                }
            }
        }

        function exposeApi() {
            vm._onComponentReady = onComponentReady;
            vm._onComponentDestroy = onComponentDestroy;
            vm._onComponentResize = onComponentResize;
            vm._onDesignModeToggle = onDesignModeToggle;

        }

        function onComponentReady(compInstance) {
            instance = compInstance;
        }

        function onComponentDestroy() {
            instance = logger = backendService = null;
            vm.selectedItem = null;
            vm.viewerData = null;
            vm.viewerOptions = null;
            //release local variables, instance variables
            //releasing listeners and handlers

            //In the last, make the vm to null
            vm = null;
        }

        function onComponentResize(size) {
            logger.logDebug('Component resized....:' + size.width + ',' + size.height);
        }

        function onDesignModeToggle(isEnabled) {
            logger.logDebug('Design mode toggled....' + isEnabled);
        }


        function initTaskParameterData() {

            vm.taskService.getParameterByTask(vm.selectedTask.Id).then(function (param) {
                vm.taskParameterConfigData.data = param.value;
                vm.taskParameterConfigData.data = _.sortBy(vm.taskParameterConfigData.data, function (item) {
                    return item.NId.toUpperCase();
                });
            }, backendService.backendError);
        }
        function initTaskContextData() {
            vm.taskService.getTaskContext(vm.selectedTask.Id).then(function (context) {
                getContextTableData(context.value);
            }, backendService.backendError);

        }
        //This method is for segregating the context data for table
        function getContextTableData(contexts) {
            contexts.forEach(function (item) {
                vm.taskService.getTaskUserField(item.Id).then(function (userFields) {
                    vm.taskContextConfigData[vm.taskContextConfigData.length] = { Context: item.NId, config: {}, isUserFieldAvailable: userFields.value.length > 0 };
                    vm.taskContextConfigData[vm.taskContextConfigData.length - 1].config = prepareContextConfig(userFields.value);

                    if (contexts.length === vm.taskContextConfigData.length) {
                        vm.taskContextConfigData = _.sortBy(vm.taskContextConfigData, function (item) {
                            return item.Context.toUpperCase();
                        });
                    }
                }, backendService.backendError);
            });
        }

        function prepareContextConfig(userFields) {
            return {
                selectionMode: 'none',
                enableColumnResizing: true,
                onInitCallback: function (config) {
                },
                data: _.sortBy(userFields, function (field) { return field.NId.toUpperCase(); })
            }
        }
    }
})();
