(function () {
    'use strict';
    angular.module('Siemens.Mom.Presales.Training.TrainingApp.PassStation').config(ListScreenRouteConfig);

    ListScreenController.$inject = ['Siemens.Mom.Presales.Training.TrainingApp.PassStation.PassStationScreen.service', '$state', '$stateParams', '$rootScope', '$scope', 'common.base', 'common.services.logger.service'];
    function ListScreenController(dataService, $state, $stateParams, $rootScope, $scope, base, loggerService) {
        var self = this;
        var logger, rootstate, messageservice, backendService;

        activate();

        // Initialization function
        function activate() {
            logger = loggerService.getModuleLogger('Siemens.Mom.Presales.Training.TrainingApp.PassStation.PassStationScreen');

            init();
            initGridOptions();
            initGridData();
        }

        function init() {
            logger.logDebug('Initializing controller.......');

            rootstate = 'home.Siemens_Mom_Presales_Training_TrainingApp_PassStation_PassStationScreen';
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
                containerID: 'itemlist',
                selectionMode: 'single',
                viewOptions: 'gl',

                // TODO: Put here the properties of the entity managed by the service
                quickSearchOptions: { enabled: true, field: 'Id' },
                sortInfo: {
                    field: 'Id',
                    direction: 'asc'
                },
                image: 'fa-cube',
                tileConfig: {
                    titleField: 'Id'
                },
                gridConfig: {
                    // TODO: Put here the properties of the entity managed by the service
                    columnDefs: [
                      { field: 'Id', displayName: 'Id' }
                    ]
                },
                onSelectionChangeCallback: onGridItemSelectionChanged
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
            var text = "Do you want to delete '" + self.selectedItem.Id + "'?";

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
        var moduleStateName = 'home.Siemens_Mom_Presales_Training_TrainingApp_PassStation';
        var moduleStateUrl = 'Siemens.Mom.Presales.Training_TrainingApp_PassStation';
        var moduleFolder = 'Siemens.Mom.Presales.Training.TrainingApp/modules/PassStation';

        var state = {
            name: moduleStateName + '_PassStationScreen',
            url: '/' + moduleStateUrl + '_PassStationScreen',
            views: {
                'Canvas@': {
                    templateUrl: moduleFolder + '/PassStationScreen-list.html',
                    controller: ListScreenController,
                    controllerAs: 'vm'
                }
            },
            data: {
                title: 'PassStationScreen'
            }
        };
        $stateProvider.state(state);
    }
}());
