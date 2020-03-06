(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.app', [
        // Angular modules 
        'ngAnimate',        
        'ui.router',
        'ngSanitize',       
        'ngResource',
		'gridster',

        // 3rd Party Modules
        'ui.bootstrap'  

        // Local modules
        ,'siemens.simaticit.common',
		,'Siemens.Mom.Presales.Training.TrainingApp.Team'
        
		,'Siemens.Mom.Presales.Training.TrainingApp'
		
    ]);

	var modules = [
		 'Siemens.Mom.Presales.Training.TrainingApp.Team',
		
	];
    // initialize the modules one by one
    for (var index = 0; index < modules.length; index++) {
        angular.module(modules[index], []);
    }

    app.run(['$rootScope', '$state', '$translate', '$stateParams','RESOURCE',  'THEMES', 'common','debug','$location','common.services.modelDriven.service',
        function ($rootScope, $state, $translate, $stateParams, RESOURCE,  THEMES, common, debug, $location, mdService) {
           
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
		$rootScope.layoutMode = 'full';
        common.shell.setEnvironment(RESOURCE, THEMES);

        $rootScope.globalOverlayData = {
            text: '',
            title: '',
            buttons: {}
        };
		$rootScope.globalDialogData = {
            title: '',
            templatedata: '',
            templateuri: '',
            buttons: {}
        };
        $rootScope.globalBusyIndicator ={
            id: 'globalBusyIndicatorId',
            icon:'fa fa-spinner fa-spin fa-pulse',
            delay: 0
        };

            $rootScope.$on('common.services.globalization.globalizationService.setLanguage', function () {
				localStorage.setItem("unauthorizedTitle", $translate.instant('common.unauthorize.title'));
                localStorage.setItem("unauthorizedMessage", $translate.instant('common.unauthorize.message'));
            });

        mdService.initStates();
		common.authentication.init();
       
    }]);
})();