/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
//#region ng-doc comments
/**
* @ngdoc type
* @name sitMethods
* @module siemens.simaticit.common.widgets.containers
*
* @property {Object} [methods=undefined] Contains the functions to be called.
*
*
* @property {Function} [ShowTaskById=undefined] Specifies the function to call in order to show a Task UI
*
*
* @property {Function} [RefreshData=undefined]
* Specifies the function to call in order to refresh the data
* vm.methods.RefreshData({
*                items: data, item: one
*            });
*
* @property {Function} [SetDPCComponent=undefined]
* Specifies the function to call in order to inject a context when the task UI of the displayed data will be loaded.
* The function is passed with one argument:
* * **value** The current context.
*    'taskId'
*    'taskDefinitionId'
*    'taskStatus'
*    'componentName'
*    'componentSource'
*
*    **Note** must be set a return value
*
*
*/

/**
* @ngdoc type
* @name sitEvents
* @module siemens.simaticit.common.widgets.containers
*
* @property {Object} [events=undefined] Contains the callback to be handled.
*
*
* @property {Function} [onTaskContainerSelectionChanged=undefined] Specifies the function to call when the list of selected items changes.
* The function is passed with one arguments:
* * **value** The item a user clicked that triggered the selection change.
*
*
* @property {Function} [ondpcComponentCallback=undefined]
* Specifies the function to call when the task UI of the displayed data will be loaded.
*  A function to be called when the tile is clicked in order to inject a custom context.
* The function is passed with more arguments:
*     'taskId'
*     'taskDefinitionId'
*     'taskStatus'
*    'componentName'
*    'componentSource'
*    **Note** must be set a return value in order to inject a new context
*  ```
*    function subscribeEvents() {
*           vm.events = {};
*           vm.events.ondpcComponentCallback = function (value) {
*               return {
*
*                   'ContextId': ' Context',
*                   'WorkOrderOperationNId': vm.wooId,
*
*                }
*           };
*
*
*       }
* ```
* @property {Function} [canShowCommandBarCallback=undefined]
* Specifies the function to call in order to show the commandbar when the task UI of the displayed data will be loaded.
* The function is passed with one argument:
* * **value** The current context.
*    'taskId'
*    'taskDefinitionId'
*    'taskStatus'
*    'componentName'
*    'componentSource'
*
*    **Note** must be set a return value in order to show or hide the commandbar
*
*
* @property {Object} [sortInfo=undefined] Defines the fields that are used for sorting as well as the initial sort for the collection.
*
* The object has the following format:
* * **field**: The name of the field on which to sort.
* * **direction**: The sort direction. Allowed values are:
*  * **asc** (Ascending)
*  * **desc** (Descending)
* * **fields**: An array of objects that defines the fields that should be used for sorting.
*
* ```
*  {
*       field: 'author',
*       direction: 'asc',
*       fields: [
*           { field: 'title', displayName: 'Title' },
*           { field: 'author', displayName: 'Author' },
*           { field: 'yearPublished', displayName: 'Year' },
*       ]
*  }
* ```
*
* The **fields** array contains objects with **field** and **displayName** properties.
* This makes it possible to localize the options that are displayed to a user.
* The **displayName** property does not need to be set. If not set, the **field** value is used.
*
* The **fields** array also supports a list of strings. In this case, the strings represent field names.
* ```
* fields: ['title', 'author']
* ```
* **Note:** Localization is not supported using this format.
*/

/**
* @ngdoc directive
* @module siemens.simaticit.common.widgets.containers
* @name sitTaskContainer
*
* @requires $log
*
*
*
* @description
* Displays a collection of tasks as tiles.
*
* @usage
* As an element:
* ```
* <sit-task-container sit-icv-data="viewDataArray"
*                             sit-icv-options="viewOptionsObject">
* </sit-task-container>
*
* ```
* @restrict E
*
* @param {Array<Object>} [sitIcvData] An array of data objects to show as a collection.
*
*
* @param {Object} sitIcvOptions For a description of this object see {@link ICVOptions}
*
*
* @param {Boolean} sitShowCommandbar To show/hide the commandbar.
*
*
* @param {Object} sitTaskSelected To retrieve the task selected
*
*
* @param {Boolean} sitUseSortByStatusAsDefault To apply the sort by status mode as default
*
*
* @param {Boolean} sitSelectFirstItem To force the first item selection event
*
*
* @param {Object} sitMethods To invoke the methods For a description of this object see {@link sitMethods}
*
*
* @param {Object} sitEvents To manage the events  For a description of this object see {@link sitEvents}
*
*
* @param {Object} sitDataFilterOptions to load tasks using build in service ($top=25&$skip=0)
*
*
* @param {Object} sitIcvQuickSearchOptions' Defines the options to manage the **Quick Search** behavior.
*
* **Quick Search** is implemented by filtering the data collection and showing only the items
* that match the specified criteria. Filtering is performed on only one configured data field.
*
* The object contains the following properties.
* * **enabled**: Determines if quick search filtering is performed.
* * **field**: The name of the field to compare with criteria.
* * **filterText**: The text string to compare with the field.
*
* @param {Boolean} sitInitSignalManager To Initialize the signal manager service
* @param {Object} sitSubscribeFilterSignalManager  To manager the signal manager service subscription  ('EnvelopeModule eq \'TaskManagement\' and EnvelopeTopic eq \'Task\'')
*
*
*  @example
* The following example shows how to configure a <sit-task-container> widget:
* In a view template, you can use the **sitTaskContainer** as follows:
*  ```
* <div>
*     <sit-task-container   sit-icv-data="vm.icvConfig.icvData"
*                           sit-task-selected="vm.taskSelected"
*
*                           sit-show-commandbar="vm.showCommandBar"
*                           sit-task-selected="vm.taskSelected"
*                           sit-use-sort-by-status-as-default="vm.useDefaultSortByStatus"
*
*                           sit-methods="vm.methods"
*                           sit-events="vm.events"
*                           sit-select-first-item=true>
*     </sit-task-container>
* </div>
* ```
*
* In Controller:
* ```

* (function () {
*     'use strict';
*     var app = angular.module('siemens.simaticit.app');
*     app.controller('taskContainerController', ['$scope', '$timeout', 'debugService', 'common'
*     function ($scope, $timeout, debugService, common) {
*         var vm = this;
*         vm.events = {};
*
*        vm.events onTaskContainerSelectionChanged = function ondpcComponentHandler(value) {
*
*           return {
*               'ContextId': 'CustomComponentContextId' + Math.random()
*           };
*         };
*
*         vm.events.canShowCommandBarCallback = function (value) {
*
*           if (value.taskDefinitionId === 'WITask') {
*               return true;
*           }
*           else {
*               return false;
*           }
*        };
*        vm.events.onTaskContainerSelectionChanged = function onTaskContainerSelectionChangedHandler(value) {
*                       vm.onTaskSelected = value;
*         };
*         vm.icvConfig = {
*             icvData: [
*                 {
*                       Id: '82a152b2-65af-46f1-bd70-461d6c3ee080',
*                       AId: '140dc554-d22c-017c-ffee-fe2db446986e',
*                       IsFrozen: true,
*                       ConcurrencyVersion: 0,
*                       IsDeleted: 0,
*                       CreatedOn: '2019-02-28T13:57:37.1308078Z',
*                       LastUpdatedOn: '2019-03-01T15:12:51.0833333Z',
*                       EntityType: 'Siemens.SimaticIT.OperationalData.TSK_OP.OPModel.DataModel.Task',
*                       OptimisticVersion: 'AAAAAAAAJ8g=',
*                       ConcurrencyToken: null,
*                       IsLocked: false,
*                       ToBeCleaned: false,
*                       NId: 'UADM_PROCESS_47846b61-',
*                       Name: 'One 3',
*                       Description: 'NULL',
*                       TaskTypeNId: 'TSKType',
*                       TaskUI: '',
*                       TaskMessageUI: null,
*                       TaskDefinitionNId: 'ConsumeMaterialTask',
*                       TaskDefinitionRevision: 'A',
*                       WorkCenterNId: null,
*                       LocationNId: null,
*                       TaskInstanceUI: null,
*                       TaskTypeIcon: 'svg typeTool48',
*                       EquipmentNId: null,
*                       ErrorCount: 0,
*                       IsSkippable: false,
*                       Status: {
*                           StateMachineNId: 'TaskStateMachine',
*                           StatusNId: 'Skipped'
*                       }
*             ]
*
*             }
*         }
*     }]);
* })();
* ```
*
*
*/
//#endregion ng-doc comments


(function () {
    'use strict';
    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.containers
     * @access internal
     * @description
     * This module provides UI elements to show the ui for task instance.
     */
    angular.module('siemens.simaticit.common.widgets.containers', []);
})();



(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.containers').directive('sitTaskContainer', sitTaskContainerDirective);

    function sitTaskContainerDirective() {
        return {
            restrict: 'E',
            scope: true,
            bindToController: {
                events: '=?sitEvents',
                methods: '=?sitMethods',
                taskSelected: '=?sitTaskSelected',
                taskDetailsVisible: '=?sitTaskDetailsVisible',
                loadDataFilterOptions: '=?sitDataFilterOptions',
                LoadDataAuto: '=?sitLoadDataAuto',
                selectFirstItem: '=?sitSelectFirstItem',
                icvOptions: '=?sitIcvOptions',
				icvSortInfo: '=?sitIcvSortInfo',
				icvSortInfoFields: '=?sitIcvSortInfoFields',
				icvSortInfoField: '=?sitIcvSortInfoField',
                icvData: '=?sitIcvData',
                icvQuickSearchOptions: '=?sitIcvQuickSearchOptions',
                useDefaultSortByStatus: '=?sitUseSortByStatusAsDefault',
                initSignalManager: '=?sitInitSignalManager',
                subscribeFilterSignalManager: '=?sitSubscribeFilterSignalManager',
                showCommandBar: '=?sitShowCommandbar',
				excludedStatus: '=?sitExcludedStatus',
				canRefreshComponent: '=?sitCanRefreshComponent',
				loadComponentAsync: '=?sitLoadComponentAsync'
            },
            controller: ComponentController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/taskContainer/taskContainer.html'
        };

    }
    ComponentController.$inject = ["$q", '$injector', '$compile', '$state', '$stateParams', '$rootScope', '$scope', '$timeout', '$filter', 'common.base', 'common.services.logger.service', 'common.services.signalManager', 'common.services.ui.authentication'];
    function ComponentController($q, $injector, $compile, $state, $stateParams, $rootScope, $scope, $timeout, $filter, base, loggerService, signalService, authenticationService) {

        var messageservice, logger, backendService, completedText, skippedText, abortedText, failedText, canceledText,
            inProgressText, pausedText, createdText, notReadyText, suspendedText, readyText, errorText;

        var vm = this;
        vm.myWidth = 275;
        //vm.showCommandBar = false;
        vm.selectedComponent = null;
        vm.id = null;
        vm.TaskShown = null;
        vm.isTaskUiListVisible = true;
        vm.taskIdSelected = null;
        vm.isLoaded = false;

        vm.TaskUIConverter = ['TaskUI'];
        vm.componentInstances = [];

        vm.icvOptionsString = '';
        vm.selectFirstItem = true;
        $scope.$watch('vm.loadDataFilterOptions', onLoadDataFilterOptionsHandler);
        $scope.$watch('vm.icvData', onViewerDataHandler);
        $scope.$watch('vm.LoadDataAuto', onLoadDataAutoHandler);

        activate();
        function activate() {
            logger = base.services.logger.service.getModuleLogger('taskContainer');
            backendService = base.services.runtime.backendService;
            vm.taskListService = null;           
            init();
            exposeApi();
            exposeModelMethods();

            if (vm.initSignalManager) {
                initSignalConnection();
                $scope.$on('$destroy', onDestroy);
            }

            if (vm.showCommandBar && $injector.has('taskList.service')) {
                initCommandBarVisibility();
                vm.taskListService = $injector.get('taskList.service');
            }
            else {
                vm.showCommandBar = false;
                logger.logErr('No TaskList Service is available!')
            }
            if (vm.showCommandBar) {
                vm.margintop = "-36px";
            } else {
                vm.margintop = "-56px";
            }
        }

        function onDestroy() {
            destroySignalServiceConnections();
            vm = null;
        }

        function init() {
            logger.logDebug('Initializing component....');

            vm.ready = false;

            messageservice = base.widgets.messageOverlay.service;
            backendService = base.services.runtime.backendService;
            //Initialize Model Data
            vm.selectedItem = null;
            vm.isButtonVisible = false;
            vm.viewerOptions = {containerID: 'itemlist'};
            vm.viewerData = [];

            vm.isMessageVisible = false;
            vm.selectedTask = null;
            vm.signalConnections = [];
            initGridOptions();
            initGridData(vm.LoadDataAuto, null);

            completedText = 'Completed';
            skippedText = 'Skipped';
            abortedText = 'Aborted';
            failedText = 'Failed';
            canceledText = 'Canceled';
            inProgressText = 'InProgress';
            pausedText = 'Paused';
            createdText = 'Created';
            notReadyText = 'NotReady';
            suspendedText = 'Suspended';
            readyText = 'Ready';
            errorText = 'Error';

            vm.finalStates = ['Failed', 'Completed', 'Aborted', 'Canceled', 'Skipped'];
        }

        function exposeApi() {
            // the API of task container
            vm.methods = {
                ShowTaskById: function (value) {
                    ShowTaskByIdCtrl(value.data);
                },
                SetDPCComponent: function (value) {
                    SetDPCTaskUIComponent(value.data);
                },
                RefreshData: function (value) {
                    onRefreshData(value.data);
				},
				Refresh: function (value) {
					refreshTask(value.id, value.data);
				},
                RemoveTaskById: function (value) {
                    removeTaskById(value);
				},
				RemoveTasksById: function (value) {
					removeTasksById(value.data);
				},
				UpdateLayout: function () {
					adjustLayout();
				},
				StatusChanged: function (value) {
					onStatusChanged(value.data);
				}
            };
        }

        function exposeModelMethods() {
            vm.pause = pause;
            vm.complete = complete;
            vm.abort = abort;
            vm.activateTask = activateTask;
            vm.suspend = suspend;
            vm.skip = skip;
            vm.recover = recover;
            vm.fail = fail;
            vm.start = start;
            vm.resume = resume;
            vm.cancel = cancel;
        }

        function initGridOptions() {
            var _quickSearchOptions = null;

            if (vm.icvQuickSearchOptions) {
                _quickSearchOptions = vm.icvQuickSearchOptions;
            } else {
                _quickSearchOptions = {
                    enabled: true, field: 'Name', filterText: ''
                };
            }

            var _icvSortInfo = null;

            if (vm.icvSortInfo) {
                _icvSortInfo = vm.icvSortInfo;
            } else {
                _icvSortInfo = {
					field: vm.icvSortInfoField ? vm.icvSortInfoField : 'IndexByStatus',
                    direction: 'asc',
                    //fields: ['Name', 'CreatedOn', 'LastUpdatedOn', 'Sort']
                    fields: [
                        { field: 'Name', displayName: $filter("translate")("taskContainer.taskList.name-sort-by") }
                        ,{ field: 'CreatedOn', displayName: $filter("translate")("taskContainer.taskList.created-sort-by") }
                        ,{ field: 'LastUpdatedOn', displayName: $filter("translate")("taskContainer.taskList.lastupdated-sort-by") }
                        ,{ field: 'IndexByStatus', displayName: $filter("translate")("taskContainer.taskList.default-sort-by") }
					]				
				};
				if (Array.isArray(vm.icvSortInfoFields)) {
					for (var i = 0; i < vm.icvSortInfoFields.length; i++) {
						_icvSortInfo.fields.push(vm.icvSortInfoFields[i]);
					}				
				}
            }


            //viewMode: 's', //(g)rid,(s)mall, (m)edium, (l)arge, (c)ompact
            //viewOptions: 'gsmlx',
            vm.viewerOptions = {
                containerID: 'itemlist',
                selectionMode: 'single',
                //viewOptions: '',
                viewMode: 'c', //c

                //mediumTileTemplate: getDefaultTileHTML(),//getMediumTemplate(),//getTiles(),
                //largeTileTemplate: getTiles(),
                //smallTileTemplate: getTiles(),

                filterBarOptions: 'sq',
                quickSearchOptions: _quickSearchOptions,
                //quickSearchOptions: {
                //    enabled: true, field: 'Name', filterText: ''
                //},
                sortInfo: _icvSortInfo, //{
                //    field: 'Sort',
                //    direction: 'asc',
                //    //fields: ['Name', 'CreatedOn', 'LastUpdatedOn', 'Sort']
                //    fields: [
                //        { field: 'Name', displayName: $filter("translate")("taskContainer.taskList.name-sort-by") },
                //        { field: 'CreatedOn', displayName: $filter("translate")("taskContainer.taskList.created-sort-by") },
                //        { field: 'LastUpdatedOn', displayName: $filter("translate")("taskContainer.taskList.lastupdated-sort-by") },
                //        { field: 'Sort', displayName: $filter("translate")("taskContainer.taskList.default-sort-by") }]
                //},
                //svgIcon: 'common/icons/typeTask48.svg',

                tileConfig: {
                    propertyFields: [
                        { field: 'TaskDefinitionNId', displayName: $filter("translate")('taskContainer.tile.taskDefinitionId') }
                        //{ field: 'CreatedOn', displayName: $filter("translate")("taskContainer.tile.created") },
                        ,{ field: 'LastUpdatedOn', displayName: $filter("translate")("taskContainer.tile.lastUpdated")/*, cellFilter: 'date:\'medium\'' */ }
                        //,{ field: 'Status.StatusNId', displayName: $filter("translate")("taskContainer.tile.status") }

                    ],
                    titleField: 'Name',
                    descriptionField: 'Description',
                    isCell: true,
                    indicators: [
                        {
                            svgIcon: 'common/icons/indicatorStatusAborted16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Aborted';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusCancelled16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Canceled';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusCompleted16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Completed';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusCreated16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Created';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusError16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Error';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusFailed16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Failed';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusInProgress16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'InProgress';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusNotReady16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'NotReady';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusPaused16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Paused';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusReady16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Ready';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusSkipped16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Skipped';
                            }
                        },
                        {
                            svgIcon: 'common/icons/indicatorStatusSuspended16.svg',
                            visible: function (tile) {
                                return tile.Status.StatusNId === 'Suspended';
                            }
                        }

                        //- Activate -> Created, Not Ready, Suspended
                        //- Suspend -> Ready
                        //- Start -> Ready
                        //- Recover -> Error
                        //- Pause -> In Progress
                        //- Resume -> Paused
                        //- Fail -> Error
                        //- Complete -> In Progress
                        //- Cancel -> Created, Ready, Not Ready, Suspended
                        //- Skip -> Created, Ready, Not Ready, Suspended
                        //- Abort -> In Progress, Paused
                    ]
                },

                //tileConfig: {
                //    titleField: 'Name',
                //    descriptionField: 'Status.StatusNId'
                //},
                gridConfig: {
                    columnDefs: [
                        { field: 'Name', displayName: 'Name' }
                    ]
                },
                //tagField: 'Categories',
				onSelectionChangeCallback: onGridItemSelectionChanged,
				onSortingChangedCallback: onGridSortingChanged
                //onSortingChangedCallback: function (sortInfo) {
                //    var message = 'sortingChangedCallback: sortInfo: ' + JSON.stringify(sortInfo);
                //}
            }

            // Bind ICV Options
            vm.icvOptions = vm.viewerOptions;

        }

        function initGridData(loadDataAuto, options) {

            if (vm.icvData) {
                adjustIcons(vm.icvData);
                vm.viewerData = applyData(vm.icvData);
                adjustLayout();
                return;
            }

            if ((loadDataAuto !== undefined) && (loadDataAuto)) {

                getTasksForTaskList(options).then(function (data) {
                    if ((data) && (data.succeeded)) {
                        adjustIcons(data.value);
                        vm.viewerData = applyData(data.value);
                        adjustLayout();
                    } else {
                        vm.viewerData = [];
                    }
                }, backendService.backendError);
            }

        }

        function adjustLayout() {
          

            if ((vm.viewerData) && (vm.viewerData.length > 1)) {
                vm.isTaskUiListVisible = true;
                vm.myWidth = 275;
            }
            else if ((vm.viewerData) && (vm.viewerData.length == 0)) {
                vm.isTaskUiListVisible = true;
                vm.myWidth = 275;
            }
            else {
                vm.isTaskUiListVisible = false;
                vm.myWidth = 5;
			}
			vm.widthStyle = 'calc(100% - ' + vm.myWidth + 'px)';

            if (vm.selectFirstItem && !vm.taskIdSelected) {
                if (vm.viewerData.length > 0) {
                    vm.viewerData[0].selected = true;
                    onGridItemSelectionChanged(null, vm.viewerData[0]);
                }
            }
            else {
                if (vm.viewerData.length === 1) {
                    vm.viewerData[0].selected = true;
                    onGridItemSelectionChanged(null, vm.viewerData[0]);
                }
            }
            var i = 0;
            vm.viewerData.forEach(function (a) {
                if (a.Id === vm.taskIdSelected)
                    vm.viewerData[i].selected = true;
                else
                    vm.viewerData[i].selected = false;
                i = i + 1;
            });            
        }

        function applyData(data) {
            if (vm.useDefaultSortByStatus) {
                applyNamesIfNecessary(data);
				if ((vm.events) && (angular.isFunction(vm.events.onApplySortByCallback))) {
					return vm.events.onApplySortByCallback(data);
				} else {
					return applySortBy(data);
				}
            }
            else {
                applyFormatDate(data);
                applyNamesIfNecessary(data);
                return data;
            }            
        }


        function adjustIcons(data) {
            data.forEach(function (a) {
                adjustIcon(a);
            })

        }
        function adjustIcon(a) {
            //data.forEach(function (a) {
            if (a.TaskTypeIcon) {
                if (a.TaskTypeIcon.startsWith("svg")) {
                    a.svgIcon = {};
                    a.svgIcon.path = 'common/icons/' + a.TaskTypeIcon.replace("svg", '').trim() + '.svg';
                } else if (a.TaskTypeIcon.startsWith("sit")) {
                    a.image = a.TaskTypeIcon;
                } else if (a.TaskTypeIcon.startsWith("fa")) {
                    a.image = a.TaskTypeIcon;
                }
            } else {
                a.svgIcon = {};
                a.svgIcon.path = 'common/icons/typeTaskExecution48.svg';
            }
            //})

        }

        function applyFormatDate(data) {
            if (data) {
                for (var k = 0; k < data.length; k++) {
                    data[k].LastUpdatedOn = $filter('date')(new Date(data[k].LastUpdatedOn), 'MMM d, y h:mm:ss a');
                }
            }
        }


        function applyNamesIfNecessary(data) {
            if (data) {
                for (var k = 0; k < data.length; k++) {
                    applyNameIfNecessary(data[k]);
                }
            }
        }

        function applyNameIfNecessary(data) {
			if (data) {
				if ((vm.events) && (angular.isFunction(vm.events.onApplyNameCallback))) {
					data.Name = vm.events.onApplyNameCallback(data);
				} else {
					if (!data.Name) {
						data.Name = data.NId;
					}
				}
             
            }
        }

        function applySortBy(data) {

            //1.	InProgress
            //2.	Error
            //3.	Paused
            //4.	Ready
            //5.	Suspended
            //6.	NotReady
            //7.	Created
            //8.	Failed
            //9.	Aborted
            //10.	Canceled
            //11.	Skipped
            //12.	Other

            var dataInProgress = [];
            var dataError = [];
            var dataPaused = [];
            var dataReady = [];
            var dataSuspended = [];
            var dataNotReady = [];
            var dataCreated = [];
            var dataFailed = [];
            var dataAborted = [];
            var dataCanceled = [];
            var dataSkipped = [];
            var dataOther = [];

            data.sort(function (a, b) {
                a = new Date(a.LastUpdatedOn);
                b = new Date(b.LastUpdatedOn);
                return a > b ? 1 : a < b ? -1 : 0;
            });
            data.forEach(function (a) {
                a.IndexByStatus = 0;
                if (a.Status.StatusNId == 'InProgress') {
                    dataInProgress.push(a);
                } else if (a.Status.StatusNId == 'Error') {
                    dataError.push(a);
                } else if (a.Status.StatusNId == 'Paused') {
                    dataPaused.push(a);
                } else if (a.Status.StatusNId == 'Ready') {
                    dataReady.push(a);
                } else if (a.Status.StatusNId == 'Suspended') {
                    dataSuspended.push(a);
                } else if (a.Status.StatusNId == 'NotReady') {
                    dataNotReady.push(a);
                } else if (a.Status.StatusNId == 'Created') {
                    dataCreated.push(a);
                } else if (a.Status.StatusNId == 'Failed') {
                    dataFailed.push(a);
                } else if (a.Status.StatusNId == 'Aborted') {
                    dataAborted.push(a);
                } else if (a.Status.StatusNId == 'Canceled') {
                    dataCanceled.push(a);
                } else if (a.Status.StatusNId == 'Skipped') {
                    dataSkipped.push(a);
                } else {
                    dataOther.push(a);
                }
            })

            var result = dataInProgress.concat(dataError).concat(dataPaused).concat(dataReady).concat(dataSuspended).concat(dataNotReady).concat(dataCreated).concat(dataFailed).concat(dataAborted).concat(dataCanceled).concat(dataSkipped).concat(dataOther);

            for (var k = 0; k < result.length; k++) {
                result[k].IndexByStatus = k;
                result[k].LastUpdatedOn = $filter('date')(new Date(result[k].LastUpdatedOn), 'MMM d, y h:mm:ss a');
            }

            return result

        }

        function onLoadDataFilterOptionsHandler(options) {
            if ((options !== undefined) && (options != null)) {
                var canLoadData = true;
                initGridData(canLoadData, options);
            }

        }

        function onViewerDataHandler(options) {
            if (vm.icvData) {
                if ((vm.viewerData) && (vm.viewerData.length > 0)) {
                    removeAllTasks();
                }
                adjustIcons(vm.icvData);
                vm.viewerData = applyData(vm.icvData);
                adjustLayout();
            }
        }

        function onLoadDataAutoHandler() {
            if ((vm.LoadDataAuto) && (vm.LoadDataFilterOptions)) {
                initGridData(vm.LoadDataAuto, '');
            }
        }

        function getTasksForTaskList(options) {
            vm.icvOptionsString = options;
            return getAllTask(options);
        }

        function getAllTask(options) {
            var deferred = $q.defer();
            execGetAll(options).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function execGetAll(options) {
            return backendService.findAll({
                'appName': 'Task',
                'entityName': 'Task',
                'options': options
            });
        }

        function destroyComponent() {
            var indexVisible = vm.componentInstances.filter(function (item) {
                return item.componentVisible === true;
            });

            if (indexVisible.length !== 0) {
                var j = indexVisible[0].index;
                vm.componentInstances[j].taskId = '';
                vm.componentInstances[j].componentName = '';
                vm.componentInstances[j].componentSource = '';
                vm.componentInstances[j].componentVisible = false;
                vm.componentInstances[j].isIfTrue = false;
            }

        }
		
		function onGridSortingChanged(sortInfo) {
			if ((vm.events) && angular.isFunction(vm.events.onGridSortingChanged)) {
				vm.events.onGridSortingChanged({ 'sortInfo': sortInfo });
			}
		}

        function onGridItemSelectionChanged(items, item) {

            if (item && item.selected === true) {
                vm.selectedTask = item;
                vm.taskSelected = item;
                vm.taskIdSelected = vm.selectedTask.Id;


                $timeout(function () {
                    if ((vm.events) && angular.isFunction(vm.events.onTaskContainerSelectionChanged)) {
                        vm.events.onTaskContainerSelectionChanged({ 'value': vm.taskSelected });
                    }
                }, 100);


                if (vm.TaskShown !== vm.selectedTask.Id) {
                    FindAndShowTaskItemContainer(vm.selectedTask);
                }
                else {
                    var i = 0;
                    vm.viewerData.forEach(function (a) {
                        if (a.Id === vm.taskIdSelected)
                            vm.viewerData[i].selected = true;
                         else
                            vm.viewerData[i].selected = false;
                        i = i + 1;
                    });
                }
                updateCommandBar(vm.taskSelected);

            } else {
                //At least one task must be selected
                if (item) {
					item.selected = true;
                }
            }
        }

        function updateCommandBar(task) {

            //- Activate -> Created, Not Ready, Suspended
            //- Suspend -> Ready
            //- Start -> Ready
            //- Recover -> Error
            //- Pause -> In Progress
            //- Resume -> Paused
            //- Fail -> Error
            //- Complete -> In Progress
            //- Cancel -> Created, Ready, Not Ready, Suspended
            //- Skip -> Created, Ready, Not Ready, Suspended
            //- Abort -> In Progress, Paused

            initCommandBarVisibility();

            if (task) {
                setVisibilityForSingleSelectionCommands(task);
            }
            if (task) {
                setVisibilityForMultiSelectionCommands(task);
            }
        }

        function setVisibilityForSingleSelectionCommands(task) {
            vm.isTaskCommandsVisible = true;
            vm.isStartVisible = task.Status.StatusNId === readyText;
            vm.isResumeVisible = task.Status.StatusNId === pausedText && !task.IsFrozen;
        }

        function setVisibilityForMultiSelectionCommands(task) {
            vm.isAbortVisible = true;
            vm.isActivateVisible = true;
            vm.isCancelVisible = true;
            vm.isPauseCompleteVisible = true;
            vm.isSkipVisible = true;
            vm.isSuspendVisible = true;

                //Check for Frozen
            if (task.IsFrozen) {
                vm.isAbortVisible = false;
                vm.isActivateVisible = false;
                vm.isCancelVisible = false;
                vm.isPauseCompleteVisible = false;
                vm.isSkipVisible = false;
                vm.isSuspendVisible = false;
            }

            //Check for Delete
            // if (vm.isDeleteVisible) {
            //     vm.isDeleteVisible = isDeleteVisible(task);
            // }

            //Check for Abort
            if (vm.isAbortVisible) {
                vm.isAbortVisible = isAbortVisible(task);
            }

            //Check for Activate
            if (vm.isActivateVisible) {
                vm.isActivateVisible = isActivateVisible(task);
            }

            //Check for Cancel
            if (vm.isCancelVisible) {
                vm.isCancelVisible = isCancelVisible(task);
            }

            //Check for Pause & Complete
            if (vm.isPauseCompleteVisible) {
                vm.isPauseCompleteVisible = task.Status.StatusNId === inProgressText;
            }

            //Check for Skip
            if (vm.isSkipVisible) {
                vm.isSkipVisible = isSkipVisible(task);
            }

            //Check for Suspend
            if (vm.isSuspendVisible) {
                vm.isSuspendVisible = task.Status.StatusNId === readyText;
            }
        }

        function isAbortVisible(task) {
            return task.Status.StatusNId === inProgressText || task.Status.StatusNId === pausedText;
        }

        function isActivateVisible(task) {
            return task.Status.StatusNId === createdText || task.Status.StatusNId === notReadyText || task.Status.StatusNId === suspendedText;
        }

        function isCancelVisible(task) {
            return task.Status.StatusNId === createdText || task.Status.StatusNId === notReadyText || task.Status.StatusNId === suspendedText
                || task.Status.StatusNId === readyText;
        }

        function isSkipVisible(task) {
            var isStateEligible = task.Status.StatusNId === createdText || task.Status.StatusNId === notReadyText
                || task.Status.StatusNId === suspendedText || task.Status.StatusNId === readyText;
            return isStateEligible && task.IsSkippable;
        }

        function initCommandBarVisibility() {
            //single selection commands
            vm.isTaskCommandsVisible = false;
            vm.isFailRecoverVisible = false;
            vm.isStartVisible = false;
            vm.isResumeVisible = false;

            //multi selection commands
            vm.isAbortVisible = false;
            vm.isActivateVisible = false;
            vm.isCancelVisible = false;
            vm.isPauseCompleteVisible = false;
            vm.isSkipVisible = false;
            vm.isSuspendVisible = false;
        }

        function FindAndShowTaskItemContainer(task) {

            vm.TaskShown = task.Id;
            vm.TaskShownStatus = task.Status;

            var i = 0;
            vm.viewerData.forEach(function (a) {
                if (a.Id === vm.TaskShown)
                    vm.viewerData[i].selected = true;
                else
                    vm.viewerData[i].selected = false;
                i = i + 1;
            });

            vm.componentInstances.forEach(function (comp) {
                comp.componentVisible = false;

            });
            //@LM da modificare
            //var component = task.Status.StatusNId == "InProgress" ? task.TaskUI : task.TaskMessageUI
            var component = null;
            if (vm.uaftaskUIConverter) {
                component = task[vm.uaftaskUIConverter];
            }
            else {
                component = task[vm.TaskUIConverter[0]];
            }

            logger.logDebug('FindAndShowTaskItemContainer: show component: ' + component + ' of taskid: ' + vm.TaskShown + ' in status: ' + vm.TaskShownStatus);



            showCustomComponentInHtml(
                component, {
                    componentStateParams: {
                        TaskId: vm.TaskShown, TaskDefNId: task.TaskDefinitionNId, TaskStatus: task.Status.StatusNId
                    }
                },
                'home.Siemens_SimaticIT_Task_Runtime_TaskList.custom-component',
                task);

		}		

        function removeTaskById(item) {

            var indexOfItemInViewerData = vm.viewerData.findIndex(function (currentValue) {
                return currentValue.Id === item.Id;
            });

            if (indexOfItemInViewerData > -1) {

                var taskToRemove = angular.copy(vm.viewerData[indexOfItemInViewerData]);
                vm.viewerData.splice(indexOfItemInViewerData, 1);

                logger.logDebug('Removed Task Id:' + taskToRemove.Id
                    + "TaskDefNId: " + taskToRemove.TaskDefinitionNId
                    + " Status:" + taskToRemove.Status.StatusNId);

                if (vm.viewerData.length === 0) {
                    removeAllTasks();
                }

                if ((vm.selectedTask) && (taskToRemove.Id === vm.selectedTask.Id)) {
                    selectById(vm.viewerData[0]);
                }
            }
            var indexOfItemInComponents = vm.componentInstances.findIndex(function (currentValue) {
                return currentValue.taskId === item.Id;
            });

            if (indexOfItemInComponents > -1) {
                vm.componentInstances.splice(indexOfItemInComponents, 1);
            }

		}

		function removeTasksById(items) {

			var selectNewTask = false;
			for (var i = 0; i < items.length; i++) {
				var indexOfItemInViewerData = vm.viewerData.findIndex(function (currentValue) {
					return currentValue.Id === items[i].Id;
				});

				if (indexOfItemInViewerData > -1) {

					var taskToRemove = angular.copy(vm.viewerData[indexOfItemInViewerData]);
					vm.viewerData.splice(indexOfItemInViewerData, 1);

                    logger.logDebug('Removed Task Id:' + taskToRemove.Id
                        + "TaskDefNId: " + taskToRemove.TaskDefinitionNId
                        + " Status:" + taskToRemove.Status.StatusNId);

					if ((vm.selectedTask) && (taskToRemove.Id === vm.selectedTask.Id)) {
						selectNewTask = true;
					}
				}
				var indexOfItemInComponents = vm.componentInstances.findIndex(function (currentValue) {
					return currentValue.taskId === items[i].Id;
				});

				if (indexOfItemInComponents > -1) {
					vm.componentInstances.splice(indexOfItemInComponents, 1);
				}
			}

			if (vm.viewerData.length === 0) {
				removeAllTasks();
			}


			if (selectNewTask) {
				selectById(vm.viewerData[0]);
			}

			adjustLayout();

		}

        function removeAllTasks() {
            var i = 0;
            vm.viewerData.forEach(function (a) {
                vm.viewerData[i].selected = false;
                i = i + 1;
            });

            onGridItemSelectionChanged(null, null);

            while (vm.componentInstances.length > 0) {
                vm.componentInstances.pop();
            }

            vm.TaskShown = null;
            vm.taskIdSelected = null;
            vm.selectedTask = null;
            vm.taskSelected = null;
        }

        function getAppRoute(route) {

            if (!route)
                return;

            if (route.indexOf('\\') !== -1) {
                logger.logWarn('The following character \ is not allowed!!')
            }
            route = route.replace('\\', '/');
            route = route.replace('//', '/');
            var info = route.split('/');
            if (info.length < 2) {
                return;
            }
            else {
                return info;
            }


        }

        function showCustomComponentInHtml(route, stateParams, stateName, data) {

            vm.showDetails = false;
            var items = getAppRoute(route);
            if (items) {
                stateParams.app = items[0]; //prefix
                stateParams.component = items[1]; // component
                if (items.length === 3) {
                    stateParams.details = items[2] == 'details' ? true : false;
                    stateParams.commandbar = items[2] == 'commandbar' ? true : false;
                }
                else if (items.length == 4) {
                    stateParams.details = items[2] == 'details' ? true : false;
                    stateParams.commandbar = items[3] == 'commandbar' ? true : false;
                }
            }
            else {
                stateParams.app = '';
                stateParams.component = '';
                logger.logDebug('No component available: for a default component put siemens.simaticit.common.components.task/siemensSimaticitTaskDetailscomponent')

            }
            vm.componentName = stateParams.component;

            //kebabCase
            var componentSourcetmp = "";
            if (vm.componentName) {
                for (var i = 0; i < vm.componentName.length; i++) {
                    if (vm.componentName[i] === vm.componentName[i].toLowerCase()) {
                        componentSourcetmp += vm.componentName[i];
                    }
                    else {
                        componentSourcetmp += "-";
                        componentSourcetmp += vm.componentName[i].toLowerCase();
                    }

                }
            }

            //$stateParams.componentStateParams.action: the corresponding action to be performed in the screen, i.e. 'add' / 'edit' / 'view'.
            //$stateParams.componentStateParams.taskId: the selected Task Id
            //$stateParams.componentStateParams.taskDefinitionId: the selected Task Definition Id(used in edit / view)
            //$stateParams.componentStateParams.previousStateName: the previous $state, used to return to the previous UI page from the custom component.
            if ((vm.taskListService) && (vm.events) && (angular.isFunction(vm.events.canShowCommandBarCallback))) {

                var retCB = vm.events.canShowCommandBarCallback({

                    'taskId': stateParams.componentStateParams.TaskId,
                    'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
                    'taskStatus': stateParams.componentStateParams.TaskStatus,
                    'componentName': vm.componentName,
                    'componentSource': componentSourcetmp
                });

                if (retCB !== 'undefined') {
                    vm.showCommandBar = retCB;
                    if (vm.showCommandBar) {
                        vm.margintop = "-36";
                    } else {
                        vm.margintop = "-56";
                    }

                }
            }

            if ((vm.events) && (angular.isFunction(vm.events.ondpcComponentCallback))) {

                var ret = vm.events.ondpcComponentCallback({

                    'taskId': stateParams.componentStateParams.TaskId,
                    'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
                    'taskStatus': stateParams.componentStateParams.TaskStatus,
                    'componentName': vm.componentName,
                    'componentSource': componentSourcetmp
                });

                var src = {

                    'TaskId': stateParams.componentStateParams.TaskId,
                    'TaskDefNId': stateParams.componentStateParams.TaskDefNId,
                    'TaskStatus': stateParams.componentStateParams.TaskStatus,
                    'TaskName': data.Name
                };

                SetDPCTaskUIComponent(src, ret);
            } else {
                var dpc = {

                    'taskId': stateParams.componentStateParams.TaskId,
                    'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
                    'taskStatus': stateParams.componentStateParams.TaskStatus,
                    'taskName': data.Name
                }
                SetDefautDPCTaskUIComponent(dpc);
            }

            if ((vm.api) && (angular.isFunction(vm.events.onComponentAttributesCallback))) {
                var reta = vm.events.onComponentAttributesCallback({

                    'componentName': vm.componentName,
                    'componentSource': componentSourcetmp

                });
                vm.componentName = reta.componentName;
                componentSourcetmp = reta.componentSource;

            }

            vm.componentSource = componentSourcetmp;

            if (($rootScope.$stateParams)) {
                $rootScope.$stateParams.componentStateParams = {};
            }

            var componentStateParams = {

                'taskId': stateParams.componentStateParams.TaskId,
                'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
                'taskStatus': stateParams.componentStateParams.TaskStatus,
                'taskName': data.Name
            }

            $rootScope.$stateParams = $stateParams;

            //Since its very common to access $stateParams in your templates, you need to bind $stateParams to componentStateParams
            $rootScope.$stateParams.componentStateParams = componentStateParams;
            $rootScope.$stateParams.componentStateParams.previousStateName = $state.current.name;
            $rootScope.$stateParams.selectedTask = angular.copy(data);
            if (vm.taskDetailsVisible) {
                $rootScope.$stateParams.componentStateParams.taskDetailsVisible = vm.taskDetailsVisible;
			}

			if ((vm.events) && (angular.isFunction(vm.events.onShowComponentCallback))) {
				var ret$ = vm.events.onShowComponentCallback({

					'taskId': stateParams.componentStateParams.TaskId,
					'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
					'taskStatus': stateParams.componentStateParams.TaskStatus,
					'componentName': vm.componentName,
					'componentSource': componentSourcetmp
				});


				ret$.Context$().then(function (value) {
					var src = {

						'TaskId': stateParams.componentStateParams.TaskId,
						'TaskDefNId': stateParams.componentStateParams.TaskDefNId,
						'TaskStatus': stateParams.componentStateParams.TaskStatus,
						'TaskName': data.Name
					};

					SetDPCTaskUIComponent(src, value);
					if (vm.loadComponentAsync) {
						$timeout(function () {
							if (stateParams.component) {
								
								setComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);
							}
						});
					}
					else {
						if (stateParams.component) {
							
							setComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);
						}
					}
                }, backendService.backendError);				
			} else {
				if (vm.loadComponentAsync) {
					$timeout(function () {
						if (stateParams.component) {
							
							setComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);
						}
					});
				} else {
					if (stateParams.component) {
						
						setComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);
					}
				}
			}            
            vm.isTaskUiVisible = true;

        }

        function updateCustomComponentInHtml(route, stateParams, stateName, data) {

            var items = getAppRoute(route);
            if (items) {
                stateParams.app = items[0]; //prefix
                stateParams.component = items[1]; // component
                if (items.length === 3) {
                    stateParams.details = items[2] == 'details' ? true : false;
                    stateParams.commandbar = items[2] == 'commandbar' ? true : false;
                }
                else if (items.length === 4) {
                    stateParams.details = items[2] == 'details' ? true : false;
                    stateParams.commandbar = items[3] == 'commandbar' ? true : false;
                }
            }
            else {
                stateParams.app = '';
                stateParams.component = '';
                logger.logDebug('No component available: for a default component put siemens.simaticit.common.components.task/siemensSimaticitTaskDetailscomponent')
            }

            vm.componentName = stateParams.component;

            //kebabCase
            var componentSourcetmp = "";
            if (vm.componentName) {
                for (var i = 0; i < vm.componentName.length; i++) {
                    if (vm.componentName[i] === vm.componentName[i].toLowerCase()) {
                        componentSourcetmp += vm.componentName[i];
                    }
                    else {
                        componentSourcetmp += "-";
                        componentSourcetmp += vm.componentName[i].toLowerCase();
                    }

                }
            }

            //$stateParams.componentStateParams.action: the corresponding action to be performed in the screen, i.e. 'add' / 'edit' / 'view'.
            //$stateParams.componentStateParams.taskId: the selected Task Id
            //$stateParams.componentStateParams.taskDefinitionId: the selected Task Definition Id(used in edit / view)
            //$stateParams.componentStateParams.previousStateName: the previous $state, used to return to the previous UI page from the custom component.

            if ((vm.events) && (angular.isFunction(vm.events.ondpcComponentCallback))) {

                var ret = vm.events.ondpcComponentCallback({

                    'taskId': stateParams.componentStateParams.TaskId,
                    'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
                    'taskStatus': stateParams.componentStateParams.TaskStatus,
                    'componentName': vm.componentName,
                    'componentSource': componentSourcetmp
                });

                var src = {

                    'TaskId': stateParams.componentStateParams.TaskId,
                    'TaskDefNId': stateParams.componentStateParams.TaskDefNId,
                    'TaskStatus': stateParams.componentStateParams.TaskStatus,
                    'TaskName': data.Name
                };

                SetDPCTaskUIComponent(src, ret);
            } else {
                var dpc = {

                    'taskId': stateParams.componentStateParams.TaskId,
                    'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
                    'taskStatus': stateParams.componentStateParams.TaskStatus,
                    'taskName': data.Name
                }
                SetDefautDPCTaskUIComponent(dpc);
            }

            if ((vm.api) && (angular.isFunction(vm.events.onComponentAttributesCallback))) {
                var reta = vm.events.onComponentAttributesCallback({

                    'componentName': vm.componentName,
                    'componentSource': componentSourcetmp

                });
                vm.componentName = reta.componentName;
                componentSourcetmp = reta.componentSource;

            }

            vm.componentSource = componentSourcetmp;

            if (($rootScope.$stateParams)) {
                $rootScope.$stateParams = $stateParams;
                $rootScope.$stateParams.componentStateParams = {};
            }

            var componentStateParams = {

                'taskId': stateParams.componentStateParams.TaskId,
                'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
                'taskStatus': stateParams.componentStateParams.TaskStatus,
                'taskName': data.Name
            }


            //Since its very common to access $stateParams in your templates, you need to bind $stateParams to componentStateParams
            $rootScope.$stateParams.componentStateParams = componentStateParams;
            $rootScope.$stateParams.componentStateParams.previousStateName = $state.current.name;
			$rootScope.$stateParams.selectedTask = angular.copy(data);

			if ((vm.events) && (angular.isFunction(vm.events.onShowComponentCallback))) {



				var ret$ = vm.events.onShowComponentCallback({

					'taskId': stateParams.componentStateParams.TaskId,
					'taskDefinitionId': stateParams.componentStateParams.TaskDefNId,
					'taskStatus': stateParams.componentStateParams.TaskStatus,
					'componentName': vm.componentName,
					'componentSource': componentSourcetmp
				});


				ret$.Context$().then(function (value) {
					var src = {

						'TaskId': stateParams.componentStateParams.TaskId,
						'TaskDefNId': stateParams.componentStateParams.TaskDefNId,
						'TaskStatus': stateParams.componentStateParams.TaskStatus,
						'TaskName': data.Name
					};

					SetDPCTaskUIComponent(src, value);
					if (vm.loadComponentAsync) {
						$timeout(function () {
							
							updateComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);
						});
					} else {
						updateComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);

					}
				}, backendService.backendError);

			} else {
				if (vm.loadComponentAsync) {
					$timeout(function () {
						
						updateComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);
					});
				} else {
					updateComponentVisible(stateParams.componentStateParams.TaskId, vm.componentName, vm.componentSource, true, stateParams.componentStateParams.TaskStatus);
				}
			}

            vm.isTaskUiVisible = true;


        }

        function setComponentVisible(taskId, componentName, componentSource, componentVisible, taskStatus) {
            var itemFounded = vm.componentInstances.filter(function (item) {
                return item.taskId === taskId;
            });

            if (itemFounded.length === 0) {
                var indexFree = vm.componentInstances.filter(function (item) {
                    return item.taskId === '';
                });

                var itemFree = indexFree[0];

                var indexVisible = vm.componentInstances.filter(function (item) {
                    return item.componentVisible === true;
                });

                if (indexVisible.length !== 0) {
                    var j = indexVisible[0].index;
                    vm.componentInstances[j].componentVisible = false;
                }

                if ((itemFree) && (itemFree.length !== 0)) {
                    logger.logDebug('setComponentVisible: new sit component')
                    var i = itemFree.index;
                    vm.componentInstances[i].taskId = taskId;
                    vm.componentInstances[i].name = componentName;//"name": ,
                    vm.componentInstances[i].componentName = componentName;
                    vm.componentInstances[i].componentSource = componentSource;
                    vm.componentInstances[i].componentVisible = componentVisible;
                    vm.componentInstances[i].taskStatus = taskStatus;
                    vm.componentInstances[i].isIfTrue = true;

                    vm.isLoaded = true;

                    $timeout(function () {
                        $(window).trigger('resize');
                    }, 1000)

                    if ($injector.has(componentName + 'Directive') == false) {
                        logger.logErr('Component:' + componentName + ' not found!')
                    }
                    $rootScope.$broadcast('common.widgets.containers.task-visible', { taskId: taskId, taskStatus: taskStatus });
                }
                else {
                    logger.logDebug('setComponentVisible: add sit component');
                    var l = vm.componentInstances.length;

                    var newTask = {
                        taskId: '',
                        taskStatus: '',
                        componentName: '',
                        componentSource: '',
                        componentVisible: false,
                        index: l,
                        isIfTrue: false
                    };
                    vm.componentInstances.push(newTask);
                    vm.isLoaded = false;
                    setComponentVisible(taskId, componentName, componentSource, true, taskStatus)
                }

            }
            else {

                var iVisible = vm.componentInstances.filter(function (item) {
                    return item.componentVisible === true;
                });

                if (iVisible.length !== 0) {
                    var jx = iVisible[0].index;
                    vm.componentInstances[jx].componentVisible = false;
                }

                logger.logDebug('setComponentVisible: old sit component')
                itemFounded[0].componentVisible = componentVisible;
                var w = itemFounded[0].index;
                vm.componentInstances[w].componentVisible = true;
                vm.componentInstances[w].isIfTrue = true;
                $rootScope.$broadcast('common.widgets.containers.task-visible', { taskId: taskId, taskStatus: taskStatus });
            }
        }

        function updateComponentVisible(taskId, componentName, componentSource, componentVisible, taskStatus) {
            var itemFounded = vm.componentInstances.filter(function (item) {
                return item.taskId === taskId;
            });

            if (itemFounded.length === 0) {

                logger.logDebug('setComponentVisible: no task has been founded')
            }
            else {

                var iVisible = vm.componentInstances.filter(function (item) {
                    return item.componentVisible === true && item.taskId === taskId;
                });

                if (itemFounded[0].taskStatus !== taskStatus) {
                    logger.logDebug('setComponentVisible: old sit component but new status');
                }
                else {
                    logger.logDebug('setComponentVisible: old sit component')
                }
            }
        }

        function SetDefautDPCTaskUIComponent(value) {
            vm.dpc = {
                TaskId: value.taskId,
                TaskDefNId: value.taskDefinitionId,
                TaskStatus: value.taskStatus,
                TaskName: value.taskName
            };

        }

        function ShowTaskByIdCtrl(task) {

            var itemFounded = vm.viewerData.filter(function (item) {
                return item.Id === task.Id;
            });

            if (itemFounded.length == 1) {
                var i = 0;
                vm.viewerData.forEach(function (a) {
                    //if (a.Id == vm.taskIdSelected)
                        vm.viewerData[i].selected = false;
                    i = i + 1;
                });

                vm.TaskShown = null;
                vm.taskIdSelected = null;
                vm.selectedTask = null;
                vm.taskSelected = null;                
                if (vm.viewerOptions.selectItems) {
                        vm.viewerOptions.selectItems([itemFounded[0]],true,true);
                    }

				vm.selectedTask = itemFounded[0];
				vm.taskSelected = itemFounded[0];
				vm.taskIdSelected = itemFounded[0].Id;

                onGridItemSelectionChanged(null, itemFounded[0]);
            }
            else {
                logger.logDebug("task not found!");
            }
        }


        function selectById(item) {
            ShowTaskByIdCtrl(item);
        }


        function SetDPCTaskUIComponent(src1, src2) {
            vm.dpc = {};
            var ctx = angular.extend(vm.dpc, src1, src2);
            logger.logDebug("dpc: " + ctx);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //function freeze() {
        //    if (!vm.taskListService) {
        //        return;
        //    }
        //    var title = 'freeze';//$translate.instant('SIT.TSK.overlay.freezeTTitle');
        //    var text = 'freeze';//$translate.instant('SIT.TSK.overlay.freezeText');

        //    backendService.confirm(text, function () {
        //        var obj = { Id: vm.selectedTask.Id };
        //        vm.taskListService.freezeTask(obj).then(function () {
        //            refreshComponent(vm.loadDataFilterOptions);
        //        }, backendService.backendError);
        //    }, title);

        //}

        //function unfreeze() {
        //    if (!vm.taskListService) {
        //        return;
        //    }
        //    var title = 'unfreeze';//$translate.instant('SIT.TSK.overlay.unfreezeTTitle');
        //    var text = 'unfreeze';//$translate.instant('SIT.TSK.overlay.unfreezeText');

        //    backendService.confirm(text, function () {
        //        var obj = { Id: vm.selectedTask.Id };
        //        vm.taskListService.unfreezeTask(obj).then(function () {
        //            refreshComponent(vm.loadDataFilterOptions);
        //        }, backendService.backendError);
        //    }, title);

        //}
        //function deleteTask() {
        //    var title = $filter("translate")('SIT.TSK.overlay.deleteTTitle');
        //    var text = $filter("translate")('SIT.TSK.overlay.deleteT');

        //    backendService.confirm(text, function () {

        //        var obj = { Id: vm.selectedTask.Id };
        //        vm.taskListService.deleteTask(obj).then(function () {
        //            refresh();
        //        }, backendService.backendError);

        //    }, title);
        //}

        //function migrateTask() {
        //    var title = $filter("translate")('SIT.TSK.overlay.migrateTitle');
        //    var text = $filter("translate")('SIT.TSK.overlay.migrateT');

        //    backendService.confirm(text, function () {
        //        //if (selectedTaskCount == 0) {
        //        var obj = { Id: vm.selectedTask.Id };
        //        vm.taskListService.migrateTask(obj).then(function () {
        //            refresh();
        //        }, backendService.backendError);
        //        //}
        //    }, title);
        //}

        function pause() {
            if (!vm.taskListService) {
                return;
            }

            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.pauseTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);

        }

        function complete() {
            if (!vm.taskListService) {
                return;
            }

            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.completeTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);

        }

        function abort() {
            if (!vm.taskListService) {
                return;
            }

            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.abortTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);

        }

        function activateTask() {
            if (!vm.taskListService) {
                return;
            }

            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.activateTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);

        }

        function suspend() {
            if (!vm.taskListService) {
                return;
            }

            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.suspendTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);

        }

        function skip() {
            if (!vm.taskListService) {
                return;
            }

            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.skipTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);

        }

        function cancel() {
            if (!vm.taskListService) {
                return;
            }

            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.cancelTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);

        }


        function recover() {
            if (!vm.taskListService) {
                return;
            }
            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.recoverTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);
        }

        function fail() {
            if (!vm.taskListService) {
                return;
            }
            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.failTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);
        }

        function start() {
            if (!vm.taskListService) {
                return;
            }
            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.startTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);
        }

        function resume() {
            if (!vm.taskListService) {
                return;
            }
            var obj = { Id: vm.selectedTask.Id };
            vm.taskListService.resumeTask(obj).then(function () {
                //nothing to be done, page refreshes when signal received
            }, backendService.backendError);
        }

        //function repeat() {
        //    if (!vm.taskListService) {
        //        return;
        //    }
        //    var obj = { Id: vm.selectedTask.Id };
        //    vm.taskListService.repeatTask(obj).then(function () {
        //        //nothing to be done, page refreshes when signal received
        //    }, backendService.backendError);
        //}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function canAddTask(value) {
            if (!vm.excludedStatus) {
                return true;
            } else if ((vm.excludedStatus) && (vm.excludedStatus.includes(value.Status.StatusNId))) {
                return false;
            }
            else {
                return true;
            }
        }

        function refresh(id) {
            var defer = $q.defer();
            var options = '$filter=Id eq ' + id + '';

            getAllTask(options).then(function (data) {
                //get current data and remove selections if any
                if (angular.isFunction(vm.viewerOptions.getCurrentData)) {
                    var gridCurrentData = vm.viewerOptions.getCurrentData();
                    for (var i = 0, len = gridCurrentData.length; i < len; i++) {
                        delete gridCurrentData[i].selected;
                    }
                }
                logger.logDebug('Refresh task Id:' + data.value[0].Id + "TaskDefNId: " + data.value[0].TaskDefinitionNId + " Status:" + data.value[0].Status.StatusNId);

                var isEqual = isMatching(gridCurrentData, data);
                if (!isEqual) {
                    if (id === "undefined") {
                        vm.viewerData = applyData(angular.copy(data.value));
                        adjustIcons(vm.viewerData);
                    }
                    else {
                        var indexOfItemInViewerData = vm.viewerData.findIndex(function (currentValue) {
                            return currentValue.Id === data.value[0].Id;
                        });

                        if (indexOfItemInViewerData > -1) {
                            var indexOfNewItemInData = data.value.findIndex(function (currentValue) {
                                return currentValue.Id === data.value[0].Id;
                            });

                            if (indexOfNewItemInData > -1) {
                                if (isLastUpdatedOnNewerThanCurrentLastUpdatedOn(vm.viewerData[indexOfItemInViewerData], data.value[indexOfNewItemInData])) {
                                    adjustIcon(data.value[indexOfNewItemInData]);
                                    vm.viewerData[indexOfItemInViewerData] = data.value[indexOfNewItemInData];
                                    vm.viewerData = applyData(vm.viewerData);
                                    logger.logDebug('Updated task Id:' + data.value[indexOfNewItemInData].Id
                                        + "TaskDefNId: " + data.value[indexOfNewItemInData]
                                        + " Status:" + data.value[indexOfNewItemInData].Status.StatusNId);
                                }
                            }
                            else {  //New tasks
                                //var dv = angular.copy(data.value[iOfNewItemInData]);
                                //adjustIcon(dv);
                                //vm.viewerData.push(dv);
                                //vm.viewerData = applyData(vm.viewerData);
                                //adjustIcons(vm.viewerData);
                                //adjustLayout();
                                logger.logDebug('Not found task Id:' + data.value[0].Id
                                    + "TaskDefNId: " + data.value[0].TaskDefinitionNId
                                    + " Status:" + data.value[0].Status.StatusNId);
                            }
                        } else {
                                var iOfNewItemInData = data.value.findIndex(function (currentValue) {
                                        return currentValue.Id === data.value[0].Id;
                                });

                            if ((iOfNewItemInData > -1) && canAddTask(data.value[iOfNewItemInData])) {
                                    var v = angular.copy(data.value[iOfNewItemInData]);
                                    adjustIcon(v);
                                    vm.viewerData.push(v);
                                    vm.viewerData = applyData(vm.viewerData);
                                    adjustLayout();
                                logger.logDebug('Added task Id:' + v.Id + "TaskDefNId: "
                                    + v.TaskDefinitionNId
                                    + " Status:" + v.Status.StatusNId);
                            }
                            else {
                                logger.logDebug('No added task Id:' + data.value[0].Id + "TaskDefNId: "
                                    + data.value[0].TaskDefinitionNId
                                    + " Status:" + data.value[0].Status.StatusNId);
                                }
                        }
                    }

                    if (vm.viewerOptions.refresh) {
                        vm.viewerOptions.refresh();
                    }

                    if ((vm.excludedStatus) && (vm.excludedStatus.includes(data.value[0].Status.StatusNId))) {
                            logger.logDebug("Data changed for task Id: " + data.value[0].Id + 'has been rejected');
                            removeTaskById(data.value[0]);
                    }

                    if (vm.selectedTask) {
                            var indexOfItem = vm.viewerData.findIndex(function (currentValue) {
                                return currentValue.Id === vm.selectedTask.Id;
                        });
                        if (isNecessaryModifyTheSelectedTask(vm.viewerData[indexOfItem])) {
                            selectById(vm.viewerData[0]);
                        } else {
                            selectById(vm.selectedTask);
                        }
                    } else {
                            if (vm.viewerData.length > 0)
                                selectById(vm.viewerData[0]);
                    }
                }
                else {
                    if (vm.selectedTask) {
                        selectById(vm.selectedTask);
                    }
                }
                defer.resolve();
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
		}

		function refreshTask(id, data) {
			//var defer = $q.defer();
			//var options = '$filter=Id eq ' + id + '';

			//getAllTask(options).then(function (data) {
				//get current data and remove selections if any
				if (angular.isFunction(vm.viewerOptions.getCurrentData)) {
					var gridCurrentData = vm.viewerOptions.getCurrentData();
					for (var i = 0, len = gridCurrentData.length; i < len; i++) {
						delete gridCurrentData[i].selected;
					}
				}
				logger.logDebug('Refresh task Id:' + id + "TaskDefNId: " + data.TaskDefinitionNId + " Status:" + data.Status.StatusNId);

				var isEqual = isMatching(gridCurrentData, data);
				if (!isEqual) {
					//if (id === "undefined") {
					//	vm.viewerData = applyData(angular.copy(data));
					//	adjustIcons(vm.viewerData);
					//}
					//else {
						var indexOfItemInViewerData = vm.viewerData.findIndex(function (currentValue) {
							return currentValue.Id === data.Id;
						});

						if (indexOfItemInViewerData > -1) {
							//var indexOfNewItemInData = data.value.findIndex(function (currentValue) {
							//	return currentValue.Id === data.Id;
							//});

							//if (indexOfNewItemInData > -1) {
								if (isLastUpdatedOnNewerThanCurrentLastUpdatedOn(vm.viewerData[indexOfItemInViewerData], data)) {
									adjustIcon(data);
									vm.viewerData[indexOfItemInViewerData] = data;
									vm.viewerData = applyData(vm.viewerData);
									logger.logDebug('Updated task Id:' + data.Id
										+ "TaskDefNId: " + data
										+ " Status:" + data.Status.StatusNId);
								}
							//}
							//else {  //New tasks
							//	//var dv = angular.copy(data.value[iOfNewItemInData]);
							//	//adjustIcon(dv);
							//	//vm.viewerData.push(dv);
							//	//vm.viewerData = applyData(vm.viewerData);
							//	//adjustIcons(vm.viewerData);
							//	//adjustLayout();
							//	logger.logDebug('Not found task Id:' + data.Id
							//		+ "TaskDefNId: " + data.TaskDefinitionNId
							//		+ " Status:" + data.Status.StatusNId);
							//}
						} else {
							//var iOfNewItemInData = data.value.findIndex(function (currentValue) {
							//	return currentValue.Id === data.value[0].Id;
							//});

							if (canAddTask(data)) {
								var v = angular.copy(data);
								adjustIcon(v);
								vm.viewerData.push(v);
								vm.viewerData = applyData(vm.viewerData);
								adjustLayout();
								logger.logDebug('Added task Id:' + v.Id + "TaskDefNId: "
									+ v.TaskDefinitionNId
									+ " Status:" + v.Status.StatusNId);
							}
							else {
								logger.logDebug('No added task Id:' + data.Id + "TaskDefNId: "
									+ data.TaskDefinitionNId
									+ " Status:" + data.Status.StatusNId);
							}
						}
					//}

					if (vm.viewerOptions.refresh) {
						vm.viewerOptions.refresh();
					}

					if ((vm.excludedStatus) && (vm.excludedStatus.includes(data.Status.StatusNId))) {
						logger.logDebug("Data changed for task Id: " + data.Id + 'has been rejected');
						removeTaskById(data);
					}

					if (vm.selectedTask) {
						var indexOfItem = vm.viewerData.findIndex(function (currentValue) {
							return currentValue.Id === vm.selectedTask.Id;
						});
						if (isNecessaryModifyTheSelectedTask(vm.viewerData[indexOfItem])) {
							selectById(vm.viewerData[0]);
						} else {
							selectById(vm.selectedTask);
						}
					} else {
						if (vm.viewerData.length > 0)
							selectById(vm.viewerData[0]);
					}
				}
				else {
					if (vm.selectedTask) {
						selectById(vm.selectedTask);
					}
				}
			//	defer.resolve();
			//}, function (error) {
			//	defer.reject(error);
			//});
			//return defer.promise;
		}

		function onRefresh(values) {
			if (values === "undefined") {
				return;
			}

            if (angular.isFunction(vm.viewerOptions.getCurrentData)) {
                var gridCurrentData = vm.viewerOptions.getCurrentData();
                for (var i = 0, len = gridCurrentData.length; i < len; i++) {
                    delete gridCurrentData[i].selected;
                }
			}

			for (var z = 0; z < values.length; z++) {

				logger.logDebug('Refresh task Id:' + values[z].Id + "TaskDefNId: " + values[z].TaskDefinitionNId + " Status:" + values[z].Status.StatusNId);

				var isEqual = isMatching(gridCurrentData, {value : values[z]});
				if (!isEqual) {
					var indexOfItemInViewerData = vm.viewerData.findIndex(function (currentValue) {
						return currentValue.Id === values[z].Id;
					});

					if (indexOfItemInViewerData > -1) {
						if (isLastUpdatedOnNewerThanCurrentLastUpdatedOn(vm.selectedTask, values[z])) {
							adjustIcon(values[z]);
							vm.viewerData[indexOfItemInViewerData] = values[z];
							//vm.viewerData = applyData(vm.viewerData);
							logger.logDebug('Updated task Id:' + values[z].Id
								+ "TaskDefNId: " + values[z].TaskDefinitionNId
								+ " Status:" + values[z].Status.StatusNId);						
						}
					}
					else { //New tasks
						if (!vm.excludedStatus || !vm.excludedStatus.includes(values[z].Status.StatusNId)) {
							adjustIcon(values[z]);
							vm.viewerData.push(values[z]);
							//vm.viewerData = applyData(vm.viewerData);
							//adjustLayout();
							logger.logDebug('Added task Id:' + values[z].Id + "TaskDefNId: "
								+ values[z].TaskDefinitionNId
								+ " Status:" + values[z].Status.StatusNId);
						}
					}									
				}
				else {
					if (vm.selectedTask) {
						selectById(vm.selectedTask);
					}
				}
			}

			vm.viewerData = applyData(vm.viewerData);
			adjustLayout();
			if (vm.viewerOptions.refresh) {
				vm.viewerOptions.refresh();
			}
			if (vm.selectedTask) {
				var indexOfItem = vm.viewerData.findIndex(function (currentValue) {
					return currentValue.Id === vm.selectedTask.Id;
				});
				if (isNecessaryModifyTheSelectedTask(vm.viewerData[indexOfItem])) {
					selectById(vm.viewerData[0]);
				} else {
					selectById(vm.selectedTask);
				}
			}           
        }

        function isLastUpdatedOnNewerThanCurrentLastUpdatedOn(oldData, newData) {

            if (!oldData || !newData) {
                return false;
            }

            var a = new Date(oldData.LastUpdatedOn);
            var b = new Date(newData.LastUpdatedOn);
            return a <= b ? true : false;

        }

        function isNecessaryModifyTheSelectedTask(task) {

            if (task && task.Status && vm.finalStates.includes(task.Status.StatusNId)) {
                return true;
            }
            else {
                return false;
            }

        }

        function isMatching(oldData, newData) {
            if (!_.isEqual(oldData, newData.value)) {
                return false;
            }

        }
        //////////////////////////////////SIGNAL MANANGER///////////////////////////////////////////////////////////////

        // Signal connection handling
        function initSignalConnection() {
            signalService.createConnection('Task', 'StatusChanged', connectionErrorCallback).then(function (signalConnection) {
                if (signalConnection.signalManager.isOpen) {
                    vm.signalConnections['StatusChanged'] = signalConnection;
                    loggerService.log('Connection has been established successfully. Connection State: ' + signalConnection.state());
                    subscribeToStatusChanged();
                }
                else {
                    loggerService.log('Wrong signal');
                }
            }, function (error) {
                //uiLogger.log('Error in opening a connection \n' + angular.toJson(error, true));
            });
            signalService.createConnection('Task', 'MessageOnTaskReceived', connectionErrorCallback).then(function (signalConnection) {
                if (signalConnection.signalManager.isOpen) {
                    vm.signalConnections['MessageOnTaskReceived'] = signalConnection;
                    loggerService.log('Connection has been established successfully. Connection State: ' + signalConnection.state());
                    subscribeToMessageOnTaskReceived();
                }
                else {
                    loggerService.log('Wrong signal');
                }
            }, function (error) {
                //uiLogger.log('Error in opening a connection \n' + angular.toJson(error, true));
            });
            signalService.createConnection('Task', 'ErrorCountChanged', connectionErrorCallback).then(function (signalConnection) {
                if (signalConnection.signalManager.isOpen) {
                    vm.signalConnections['ErrorCountChanged'] = signalConnection;
                    loggerService.log('Connection has been established successfully. Connection State: ' + signalConnection.state());
                    subscribeToErrorCountChanged();
                }
                else {
                    loggerService.log('Wrong signal');
                }
            }, function (error) {
                loggerService.log('Error in opening a connection \n' + angular.toJson(error, true));
            });
        }

        function destroySignalServiceConnections() {
            for (var connectionName in vm.signalConnections) {
                signalService.destroyConnection(vm.signalConnections[connectionName].id).then(function () {
                    if (vm) {
                        vm.signalConnections[connectionName] = null;
                        loggerService.log('Closed Connection ' + connectionName);
                    }
                }, function (error) {
                    if (vm) {
                        loggerService.log('Error on Closed Connection \n' + angular.toJson(error, true));
                    }
                });
            }
        }


        function connectionErrorCallback(conn, reason) {
            var counter = [];
            loggerService.log('Connection Error Callback: ' + conn.id + 'Reason:' + reason.reason);
            conn.reconnect().then(function () {
                counter[conn.id] = 0;
            }, function () {
                if (counter[conn.id] === undefined) {
                    counter[conn.id] = 0;
                } else {
                    counter[conn.id] = counter[conn.id] + 1;
                }
                loggerService.log('attempt number ' + counter[conn.id] + ' id: ' + conn.id);
                if (counter[conn.id] > 10) {
                    return;
                }
                $timeout(function () {
                    connectionErrorCallback(conn, reason);
                }, 5000);
            });
        }

        function subscribeToStatusChanged() {
            if (vm.signalConnections['StatusChanged'] !== undefined) {
                var subscribeFilter = 'EnvelopeModule eq \'TaskManagement\' and EnvelopeTopic eq \'Task\'';

                if (vm.subscribeFilterSignalManager) {
                    subscribeFilter = vm.subscribeFilterSignalManager;
                }

                vm.signalConnections['StatusChanged'].subscribe(subscribeFilter,
                    onStatusChanged, onError, onComplete).then(function () {
                        loggerService.log('subscribe callback');
                    }, function () {
                        loggerService.log('subscribe error');
                    });
            }
        }
        // taskService.showCustomForm(vm.selectedTask[0].TaskUI, { componentStateParams: { taskId: vm.selectedTask[0].Id } },
        //     'home.Siemens_SimaticIT_Task_Runtime_TaskList.custom-component');
        function refreshComponent(data) {
            var i = 0;
            if (data.value[i].Id == vm.selectedTask.Id) { // && data.value[i].Status.StatusNId === 'InProgress'

                if ((vm.selectedTask.TaskDefinitionNId == data.value[i].TaskDefinitionNId) && isLastUpdatedOnNewerThanCurrentLastUpdatedOn(vm.selectedTask, data.value[i])) {
                    updateCommandBar(data.value[i]);
                    var component = data.value[i].TaskUI;
                    updateCustomComponentInHtml(component,
                        { componentStateParams: { TaskId: data.value[i].Id, TaskDefNId: data.value[i].TaskDefinitionNId, TaskStatus: data.value[i].Status.StatusNId } },
                        'home.Siemens_SimaticIT_Task_Runtime_TaskList.custom-component', data.value[i]);
                    //showCustomComponentInHtml(component,
                    //    { componentStateParams: { TaskId: vm.TaskShown, TaskDefNId: data.value[i].TaskDefinitionNId, TaskStatus: data.value[i].Status.StatusNId } },
                    //    'home.Siemens_SimaticIT_Task_Runtime_TaskList.custom-component', data.value[i]);
                }
                else {
                    if (vm.selectedTask.Id == data.value[i].Id) {
                        $rootScope.$broadcast('common.widgets.containers.on-status-changed', { task: data.value[i] });
                    }

                }
            }
		}

		function onRefreshComponent(data, signal) {

			if ((vm.excludedStatus) && (vm.excludedStatus.includes(data.value[0].Status.StatusNId))) {
				logger.logDebug('No need refresh component for status excluded....');
				return;
			}

			var isSelectedTask = vm.selectedTask && vm.selectedTask.Id && vm.selectedTask.Id === signal.StatusInfo_EntityId; //&& vm.selectedTask.TaskUI && vm.selectedTask.TaskUI !== '';
			/*data.value[0].Status.StatusNId === 'InProgress' &&*/
			if (isLastUpdatedOnNewerThanCurrentLastUpdatedOn(vm.selectedTask, data.value[0]) && isSelectedTask) {
				refreshComponent(data);
			}
			else {
				logger.logDebug('No need refresh component....');
			}

			$rootScope.$broadcast('common.widgets.containers.on-status-changed', { task: data.value[0] });
		}

		function onStatusChanged(signal) {
			var currentUser = authenticationService.getIndentity() ? authenticationService.getIndentity().unique_name : '';
			var userThatRequestedStatusChange = signal.EnvelopeUserField10;
			var taskDefId = signal.EnvelopeUserField5;
			var TaskChanged = signal.StatusInfo_EntityId;
			if ((vm.events) && (angular.isFunction(vm.events.onStatusChangedCallback))) {
				vm.events.onStatusChangedCallback(currentUser, signal);
			} else {		
				if (currentUser.toLowerCase() === userThatRequestedStatusChange.toLowerCase() && signal.StatusInfo_EntityId) {
					var options = '$filter=Id eq ' + signal.StatusInfo_EntityId + '';
					logger.logDebug('SignalService.onStatusChanged Id: ' + TaskChanged + " TaskDefId: " + taskDefId +" StatusNId: " + signal.StatusInfo_CurrentStatusNId);
					getAllTask(options).then(function (data) {
						if (vm.canRefreshComponent) {
							refreshTask(signal.StatusInfo_EntityId, data.value[0]);
							onRefreshComponent(data, signal)
						} else {
							if ((vm.events) && (angular.isFunction(vm.events.canAddOrUpdateTaskCallback))) {
								var ret$ = vm.events.canAddOrUpdateTaskCallback(currentUser, signal);
								ret$.Context$().then(function (result) {
									if (result.value) {
										if (vm.canRefreshComponent) {
											refreshTask(signal.StatusInfo_EntityId, data.value[0]);
											onRefreshComponent(data, signal)
										} else {
											refresh(signal.StatusInfo_EntityId).then(function (value) {
												onRefreshComponent(data, signal);
											});
										}
									}

								});

							} else {
								refresh(signal.StatusInfo_EntityId);
								onRefreshComponent(data, signal)
							}
						}

						
					}, backendService.backendError);
				}
			}
        }

        function onRefreshData(values) {           
            onRefresh(values);
            var indexToRefresh = values.findIndex(function (currentValue) {
				return vm.selectedTask && vm.selectedTask.Id === currentValue.Id;
						});

			if (indexToRefresh > -1) {
				var isSelectedTask = (vm.selectedTask && vm.selectedTask.Id && vm.selectedTask.Id === values[indexToRefresh].Id);
				/*value.Status.StatusNId === 'InProgress' &&*/
				if (isLastUpdatedOnNewerThanCurrentLastUpdatedOn(vm.selectedTask, values[indexToRefresh]) && isSelectedTask) {
					refreshComponent({ value: [values[indexToRefresh]] });
				}
				else {
					logger.logDebug('No need refresh component....');
				}

			}           

			if (vm.excludedStatus) {
				for (var z = 0; z < values.length; z++) {
					if (vm.excludedStatus.includes(values[z].Status.StatusNId)) {
						logger.logDebug("Data changed for task id: " + values[z].Id + 'has been rejected');
						removeTaskById(values[z]);
					}
				}
            }

            //$rootScope.$broadcast('common.widgets.containers.on-status-changed', { task: value });
        }


        function onError(error) {
            loggerService.log('An error occurred: \n' + angular.toJson(error, true));
        }

        function onComplete() {
            loggerService.log('Signal \'' + vm.connection.name + '\' stopped sending messages.');
        }

        function subscribeToMessageOnTaskReceived() {
            if (vm.signalConnections['MessageOnTaskReceived'] !== undefined) {
                vm.signalConnections['MessageOnTaskReceived'].subscribe('', onMessageOnTaskReceived, onError, onComplete).then(function () {
                    loggerService.log('subscribe callback');
                }, function () {
                    loggerService.log('subscribe error');
                });
            }
        }

        function onMessageOnTaskReceived(data) {
            loggerService.log(data.toString());
            if (data.Receiver === '*' || data.Receiver === authenticationService.getIndentity().unique_name) {
                //presentationService.genericError('Error', data.Message);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        }
        function subscribeToErrorCountChanged() {
            if (vm.signalConnections['ErrorCountChanged'] !== undefined) {
                vm.signalConnections['ErrorCountChanged'].subscribe('', onErrorCountChanged, onError, onComplete).then(function () {
                    loggerService.log('subscribe callback');
                }, function () {
                    loggerService.log('subscribe error');
                });
            }
        }

        function onErrorCountChanged(data) {
            refreshErrorCountAsync(data.TaskId, data.ErrorCount).then(vm.updateCommandBar, backendService.backendError);
        }

        function refreshErrorCountAsync(taskId, errorCount) {
            var defer = $q.defer();
            for (var i = 0; i < vm.viewerData.length; i++) {
                if (vm.viewerData[i].Id === taskId) {
                    $timeout(function updateErrorCount() {
                        vm.viewerData[i].ErrorCount = errorCount;
                        defer.resolve();
                    });
                    break;
                }
            }
            return defer.promise;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
})();
