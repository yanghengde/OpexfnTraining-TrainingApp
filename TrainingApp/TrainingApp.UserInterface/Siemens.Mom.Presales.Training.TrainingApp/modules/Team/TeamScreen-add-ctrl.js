(function () {
    'use strict';
    angular.module('Siemens.Mom.Presales.Training.TrainingApp.Team').config(AddScreenStateConfig);

    AddScreenController.$inject = ['Siemens.Mom.Presales.Training.TrainingApp.Team.TeamScreen.service', '$state', '$stateParams', 'common.base', '$filter', '$scope'];
    function AddScreenController(dataService, $state, $stateParams, common, $filter, $scope) {
        var self = this;
        var sidePanelManager, backendService, propertyGridHandler;
        
        activate();
        function activate() {
            init();
            registerEvents();

            sidePanelManager.setTitle('Add');
            sidePanelManager.open({
                mode: 'e',
                size:'wide'
              });
        }

        function init() {
            sidePanelManager = common.services.sidePanel.service;
            backendService = common.services.runtime.backendService;

            //Initialize Model Data
            self.currentItem = null;
            self.validInputs = false;

            //Expose Model Methods
            self.save = save;
            self.cancel = cancel;

            self.IsActive = getIsAcitve();
        }

        function getIsAcitve(){
            return [
                {label:'IsActive',checked:false}
            ]
        }

        function registerEvents() {
            $scope.$on('sit-property-grid.validity-changed', onPropertyGridValidityChange);
        }

        function save() {
            self.currentItem.IsActive = self.IsActive[0].checked;
            dataService.create(self.currentItem).then(onSaveSuccess, backendService.backendError);
        }

        function cancel() {
            sidePanelManager.close();
            $state.go('^');
        }

        function onSaveSuccess(data) {
            sidePanelManager.close();
            $state.go('^', {}, { reload: true });
        }

        function onPropertyGridValidityChange(event, params) {
            self.validInputs = params.validity;
        }
    }

    AddScreenStateConfig.$inject = ['$stateProvider'];
    function AddScreenStateConfig($stateProvider) {
        var screenStateName = 'home.Siemens_Mom_Presales_Training_TrainingApp_Team_TeamScreen';
        var moduleFolder = 'Siemens.Mom.Presales.Training.TrainingApp/modules/Team';

        var state = {
            name: screenStateName + '.add',
            url: '/add',
            views: {
                'property-area-container@': {
                    templateUrl: moduleFolder + '/TeamScreen-add.html',
                    controller: AddScreenController,
                    controllerAs: 'vm'
                }
            },
            data: {
                title: 'Add'
            }
        };
        $stateProvider.state(state);
    }
}());
