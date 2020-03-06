(function () {
    'use strict';
    angular.module('Siemens.Mom.Presales.Training.TrainingApp.Team').config(ListScreenRouteConfig);

    ListScreenController.$inject = ['$translate', 'Siemens.Mom.Presales.Training.TrainingApp.Team.TeamScreen.service', '$state', '$stateParams', '$rootScope', '$scope', 'common.base', 'common.services.logger.service'];
    function ListScreenController($translate, dataService, $state, $stateParams, $rootScope, $scope, base, loggerService) {
        var self = this;
        var logger, rootstate, messageservice, backendService;

        activate();

        // Initialization function
        function activate() {
            logger = loggerService.getModuleLogger('Siemens.Mom.Presales.Training.TrainingApp.Team.TeamScreen');

            init();
            initGridOptions();
            //initGridData();
        }

        function init() {
            logger.logDebug('Initializing controller.......');

            rootstate = 'home.Siemens_Mom_Presales_Training_TrainingApp_Team_TeamScreen';
            messageservice = base.widgets.messageOverlay.service;
            backendService = base.services.runtime.backendService;

            //Initialize Model Data
            self.selectedItem = null;
            self.isButtonVisible = false;
            self.viewerOptions = {};
            self.viewerData = [];

            //Expose Model Methods
            self.addButtonHandler = addButtonHandler;
            self.editButtonHandler = editButtonHandler;
            self.selectButtonHandler = selectButtonHandler;
            self.deleteButtonHandler = deleteButtonHandler;
        }

        function initGridOptions() {
            self.viewerOptions = {
                userPrefId: 'teamItemlist',
                containerID: 'teamItemlist',
                selectionMode: 'single',
                viewOptions: 'gl',

                // TODO: Put here the properties of the entity managed by the service
                quickSearchOptions: { enabled: true, field: 'Name' },
                filterBarOptions: 'sqfg',
                filterFields: [{ field: 'Name', displayName: 'Name', type: 'string' }],
                sortInfo: {
                    field: 'Name',
                    direction: 'asc'
                },
                image: 'fa-car',
                tileConfig: {
                    titleField: 'Name',
                    descriptionField: 'Description',
                    propertyFields: [
                        { field: 'Number', displayName: 'Number' },
                        { field: 'IsActive', displayName: 'Active' }]
                },
                gridConfig: {
                    // TODO: Put here the properties of the entity managed by the service
                    columnDefs: [
                        { field: 'Name', displayName: $translate.instant('Siemens.Modules.TrainingApp.Name') },
                        { field: 'Description', displayName: $translate.instant('Siemens.Modules.TrainingApp.Description') },
                        { field: 'Number', displayName: 'Number' },
                        { field: 'IsActive', displayName: 'IsActive', cellTemplate: '<div class="ngCellText" ngclass="col.collndex()"><span>{{row.entity.IsActive === true ? "是":"否"}}</span></div>' }
                    ]
                },
                onSelectionChangeCallback: onGridItemSelectionChanged,
                enablePaging: true,
                pagingOptions: {
                    pageSize: 10,
                    type: 'simple'
                },
                enableResponsiveBehaviour: true,
                serverDataOptions: {
                    dataService: getDataService(),
                    appName: 'TrainingApp',
                    dataEntity: 'Team',
                    optionsString: ''
                }
            }
        }

        function getDataService() {
            return {
                findAll: findAll
            }

            function findAll(opt) {
                var options = opt.options;
                return dataService.getAll(options);
            }
        }

        function initGridData() {
            dataService.getAll().then(function (data) {
                if ((data) && (data.succeeded)) {
                    self.viewerData = data.value;
                } else {
                    self.viewerData = [];
                }
            }, backendService.backendError);
        }

        function addButtonHandler(clickedCommand) {
            $state.go(rootstate + '.add');
        }

        function editButtonHandler(clickedCommand) {
            // TODO: Put here the properties of the entity managed by the service
            $state.go(rootstate + '.edit', { id: self.selectedItem.Id, selectedItem: self.selectedItem });
        }

        function selectButtonHandler(clickedCommand) {
            // TODO: Put here the properties of the entity managed by the service
            $state.go(rootstate + '.select', { id: self.selectedItem.Id, selectedItem: self.selectedItem });
        }

        function deleteButtonHandler(clickedCommand) {
            var title = "Delete";
            // TODO: Put here the properties of the entity managed by the service
            var text = "Do you want to delete '" + self.selectedItem.Name + "'?";

            backendService.confirm(text, function () {
                dataService.delete(self.selectedItem).then(function () {
                    $state.go(rootstate, {}, { reload: true });
                }, backendService.backendError);
            }, title);
        }

        function onGridItemSelectionChanged(items, item) {
            if (item && item.selected == true) {
                self.selectedItem = item;
                setButtonsVisibility(true);
            } else {
                self.selectedItem = null;
                setButtonsVisibility(false);
            }
        }

        // Internal function to make item-specific buttons visible
        function setButtonsVisibility(visible) {
            self.isButtonVisible = visible;
        }
    }

    ListScreenRouteConfig.$inject = ['$stateProvider'];
    function ListScreenRouteConfig($stateProvider) {
        var moduleStateName = 'home.Siemens_Mom_Presales_Training_TrainingApp_Team';
        var moduleStateUrl = 'Siemens.Mom.Presales.Training_TrainingApp_Team';
        var moduleFolder = 'Siemens.Mom.Presales.Training.TrainingApp/modules/Team';

        var state = {
            name: moduleStateName + '_TeamScreen',
            url: '/' + moduleStateUrl + '_TeamScreen',
            views: {
                'Canvas@': {
                    templateUrl: moduleFolder + '/TeamScreen-list.html',
                    controller: ListScreenController,
                    controllerAs: 'vm'
                }
            },
            data: {
                title: 'TeamScreen'
            }
        };
        $stateProvider.state(state);
    }
}());
