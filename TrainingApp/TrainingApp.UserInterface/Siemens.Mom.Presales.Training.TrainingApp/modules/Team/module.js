(function(){
    'use strict';

    angular.module('Siemens.Mom.Presales.Training.TrainingApp.Team', []).config(StateConfig);

    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {
        var moduleStateName = 'home.Siemens_Mom_Presales_Training_TrainingApp_Team';
        var moduleStateUrl = 'Siemens.Mom.Presales.Training_TrainingApp_Team';
        var moduleFolder = 'Siemens.Mom.Presales.Training.TrainingApp/modules/Team';

        //Add new states under the root state to be unique. Below is an example code for reference
        //var state1 = {
        //    name: moduleStateName + '_state_name',
        //    url: '/' + moduleStateUrl + '_state_url',
        //    views: {
        //        'Canvas@': {
        //            templateUrl: moduleFolder + '/state_template.html',
        //            controller: 'state_controller',
        //            controllerAs: 'vm'
        //        }
        //    },
        //    data: {
        //        title: 'state_title'
        //    },
        //    params: {}
        //};
        //$stateProvider.state(state1);
    }
}());
