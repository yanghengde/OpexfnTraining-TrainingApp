/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common')
        .config(['common.services.administration.DataConfigProvider', 'CONFIG', 'APPCONFIG', function (administrationDataConfigProvider, CONFIG, APPCONFIG) {

            var config = angular.extend({}, APPCONFIG, CONFIG);
            if (config.administrationDataConfigProvider && config.administrationDataConfigProvider.slice(-1) !== '/') {
                config.administrationDataConfigProvider += '/';
            }

            administrationDataConfigProvider.config.oDataServiceURI = config.administrationServicesUrl;
        }]);
})();

(function () {
    'use strict';
    var module = angular.module('siemens.simaticit.common');

    module.config(['$httpProvider', function ($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('siemens.simaticit.authHttpResponseInterceptor');
    }]);

    module.factory('siemens.simaticit.authHttpResponseInterceptor', ['$q', function ($q) {
        var flag = false;

        return {
            isAuthPending: function () {
                return flag;
            },
            response: function (response) {
                if (response.status === 401) {
                    flag = true;
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    flag = true;
                }
                return $q.reject(rejection);
            }
        };
    }]);

    module.config([
    '$provide', function ($provide) {
        $provide.decorator('common.overlay.overlayService', [
        '$delegate', '$injector', '$filter','common.widgets.busyIndicator.service', function ($delegate, $injector,$filter, busyIndicator) {
            // Keep track of the original  method, we'll need it later.
            var origshowOverlayModal = $delegate.showOverlayModal;
            var common = $injector.get('siemens.simaticit.authHttpResponseInterceptor');
            $delegate.showOverlayModal = function () {
                if (!common.isAuthPending()) {
                    var args = [].slice.call(arguments);
                    // Send on our enhanced message to the original method.
                    try {
                        if (origshowOverlayModal.apply) {
                            origshowOverlayModal.apply(null, args);
                        }

                    } catch (e) { //eslint-disable-line no-empty


                    }

                }
                else {
                    busyIndicator.hide();
                    var message = $filter("translate")("common.busy-message.please-wait");
                    busyIndicator.show({ message: message });
                }
            };

            return $delegate;
        }
        ]);
    }
    ]);

})();

(function () {
    'use strict';

    var module = angular.module('siemens.simaticit.common');

    module.config(['common.services.authentication.configProvider', 'CONFIG', 'APPCONFIG', function (authenticationConfigProvider, CONFIG, APPCONFIG) {

        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.authorizationServiceUrl && config.authorizationServiceUrl.slice(-1) === '/'){
            config.authorizationServiceUrl = config.authorizationServiceUrl.substring(0,config.authorizationServiceUrl.length -1);
        }

        if (config.identityProviderUrl && config.identityProviderUrl.slice(-1) === '/'){
            config.identityProviderUrl = config.identityProviderUrl.substring(0,config.identityProviderUrl.length -1);
        }

        if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/'){
            config.engineeringServicesUrl += '/';
        }

        if (config.home){
            authenticationConfigProvider.config.homeRoute = config.home;
        }

        authenticationConfigProvider.config.authorizationServiceUrl =  config.authorizationServiceUrl ? config.authorizationServiceUrl : '';
        authenticationConfigProvider.config.identityProviderUrl =  config.identityProviderUrl ? config.identityProviderUrl : '';
        authenticationConfigProvider.config.enableAuthentication =  typeof config.enableAuthentication === 'boolean'  ?  config.enableAuthentication : true;
        authenticationConfigProvider.config.oDataServiceURI  = config.engineeringServicesUrl ? config.engineeringServicesUrl : '';

    }]);

    module.config(['common.services.data.authentication.configProvider', 'CONFIG', 'APPCONFIG', function (authenticationConfigProvider, CONFIG, APPCONFIG) {
        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/') {
            config.engineeringServicesUrl += '/';
        }

        authenticationConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl ? config.engineeringServicesUrl : '';

    }]);


    module.config(['common.services.authentication.configProvider', 'CONFIG', 'APPCONFIG', function (authenticationConfigProvider, CONFIG, APPCONFIG) {

        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.authorizationServiceUrl && config.authorizationServiceUrl.slice(-1) === '/') {
            config.authorizationServiceUrl = config.authorizationServiceUrl.substring(0, config.authorizationServiceUrl.length - 1);
        }

        if (config.identityProviderUrl && config.identityProviderUrl.slice(-1) === '/') {
            config.identityProviderUrl = config.identityProviderUrl.substring(0, config.identityProviderUrl.length - 1);
        }

        if (config.home) {
            authenticationConfigProvider.config.homeRoute = config.home;
        }

        authenticationConfigProvider.config.authorizationServiceUrl = config.authorizationServiceUrl ? config.authorizationServiceUrl : '';
        authenticationConfigProvider.config.enableAuthentication = typeof config.enableAuthentication === 'boolean' ? config.enableAuthentication : true;

    }]);

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common')
        .config(['common.services.runtime.DataConfigProvider','CONFIG','APPCONFIG', function (businessDataConfigProvider, CONFIG, APPCONFIG) {

            var config = angular.extend({}, APPCONFIG, CONFIG);
            if (config.runtimeServicesUrl && config.runtimeServicesUrl.slice(-1) !== '/'){
                config.runtimeServicesUrl += '/';
            }
            businessDataConfigProvider.config.oDataServiceURI = config.runtimeServicesUrl;
            businessDataConfigProvider.config.applicationServiceUrls = config.applicationServiceUrls;
            businessDataConfigProvider.config.applicationArchivingServiceUrls = config.applicationArchivingServiceUrls;

        }]);

})();


(function () {
    'use strict';

    angular.module('siemens.simaticit.common')
        .config(['common.services.runtime.BusinessDataConfigProvider', 'CONFIG', 'APPCONFIG', function (engineeringBusinessDataConfigProvider, CONFIG, APPCONFIG) {

            var config = angular.extend({}, APPCONFIG, CONFIG);
            if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/') {
                config.engineeringServicesUrl += '/';
            }

            engineeringBusinessDataConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl;
        }]);

})();

"use strict";
(function () {
    'use strict';
    angular.module('siemens.simaticit.common').config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }
    ]);
})();
//# sourceMappingURL=config.debug.js.map
(function () {
    'use strict';

    angular.module('siemens.simaticit.common')
        .config(['common.services.documentation.configProvider', 'CONFIG', 'APPCONFIG', function (documentationCenterConfigProvider, CONFIG, APPCONFIG) {
            var config = angular.extend({}, APPCONFIG, CONFIG);
            if (config.documentationServicesUrl && config.documentationServicesUrl.slice(-1) !== '/') {
                config.documentationServicesUrl += '/';
            }

            documentationCenterConfigProvider.config.oDataServiceURI = config.documentationServicesUrl ? config.documentationServicesUrl : '';
            documentationCenterConfigProvider.config.docCenterUiUrl = config.documentationCenterUrl ? config.documentationCenterUrl : '';
        }]);

})();




(function () {
    'use strict';

    angular.module('siemens.simaticit.common')
        .config(['common.services.engineering.DataConfigProvider','CONFIG','APPCONFIG', function (engineeringDataConfigProvider, CONFIG, APPCONFIG) {

            var config = angular.extend({},APPCONFIG, CONFIG);
            if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/'){
                config.engineeringServicesUrl += '/';
            }

            engineeringDataConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl;
        }]);

})();

// Include in index.html tso that app level exceptions are handled.
(function () {
    'use strict';

    var unityapp = angular.module('siemens.simaticit.common');

    unityapp.config(['$provide', function ($provide) {

        $provide.decorator('$exceptionHandler',
            ['$delegate', 'common.services.logger.service', 'LOG_TYPES', '$injector', unityExceptionHandler]);
    }]);

    // Extend the $exceptionHandler service to excecute  common.logger functions
    function unityExceptionHandler($delegate, logger, LOG_TYPES, $injector) {

        return function (exception, cause) {
            // avoid standard behavior
            //$delegate(exception, cause);

            var errorData = { exception: exception, cause: cause };
            var msg = exception.message;
            var errFn = logger.getLogFn(unityapp.name, LOG_TYPES.LOG_ERROR);

            errFn(msg, errorData);
            var settings = $injector.get('common').loadSettings();
            if (settings && settings.logLevel && settings.logLevel === 3) {
                var backendService = $injector.get("common.services.runtime.backendService");
                backendService.genericError(exception.message, 'Error');
            }


        };
    }
})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common')
         .config(['common.globalization.globalizationConfigProvider','$injector', 'CONFIG','APPCONFIG','$stateProvider',
             function (globalizationConfigProvider, $injector,  CONFIG, APPCONFIG, $stateProvider) {
                 var config = angular.extend({}, APPCONFIG, CONFIG);
                 /*SEARCH EN LANGUAGE*/
                 var language = _.find(config.languages, function (lang) {
                     return lang === 'en-US';
                 });
                 $stateProvider.decorator('data', function (state) {
                     if(state.views) {
                         var viewKeys = Object.keys(state.views);
                         if (viewKeys.indexOf('property-area-container@') === -1) {
                             state.views['property-area-container@'] = {};
                             state.views['property-area-container@'].template = '';
                         }
                     }
                 });
                 globalizationConfigProvider.setFallbackLanguage(language);
         }]);
})();

(function () {
    'use strict';
    var module = angular.module('siemens.simaticit.common');

    module.config(['common.services.governance.workerRoleConfigProvider','APPCONFIG','CONFIG', function (workerRoleConfigProvider, APPCONFIG, CONFIG) {
        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/'){
            config.engineeringServicesUrl += '/';
        }

        workerRoleConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl;

    }]);

    module.config(['common.services.governance.projectConfigProvider','APPCONFIG','CONFIG', function (projectConfigProvider, APPCONFIG, CONFIG) {
        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/'){
            config.engineeringServicesUrl += '/';
        }

        projectConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl;

    }]);

    module.config(['common.services.governance.eventConfigProvider','APPCONFIG','CONFIG', function (eventConfigProvider, APPCONFIG, CONFIG) {
        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/'){
            config.engineeringServicesUrl += '/';
        }

        eventConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl;

    }]);

    module.config(['common.services.governance.databaseInfoConfigProvider','APPCONFIG','CONFIG', function (databaseInfoConfigProvider, APPCONFIG, CONFIG) {
        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/'){
            config.engineeringServicesUrl += '/';
        }

        databaseInfoConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl;

    }]);

    module.config(['common.services.governance.systemEventsConfigProvider', 'APPCONFIG', 'CONFIG', function (systemEventsConfigProvider, APPCONFIG, CONFIG) {
        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.engineeringServicesUrl && config.engineeringServicesUrl.slice(-1) !== '/') {
            config.engineeringServicesUrl += '/';
        }

        systemEventsConfigProvider.config.oDataServiceURI = config.engineeringServicesUrl;

    }]);

})();

(function () {
    'use strict';

    var module = angular.module('siemens.simaticit.common');

    module.config(['$httpProvider',  function ($httpProvider) {

        $httpProvider.interceptors.push('common.base.unityInterceptorService');
        //CORS
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }]);

})();

(function () {
	'use strict';

	var unityapp = angular.module('siemens.simaticit.common');

	unityapp.config(['$logProvider', function ($logProvider) {
		$logProvider.debugEnabled(true);
	}]);

})();

(function () {
    'use strict';

    var module = angular.module('siemens.simaticit.common');

    module.config(['common.services.logger.configProvider', 'LOG_LEVELS', 'CONFIG', 'APPCONFIG', function (loggerConfigProvider, LOG_LEVELS, CONFIG, APPCONFIG) {

        var config = angular.extend({}, APPCONFIG, CONFIG);

        loggerConfigProvider.config.currentLogLevel = config && config['logLevel'] && LOG_LEVELS[config['logLevel']] ? LOG_LEVELS[config['logLevel']] : LOG_LEVELS.LOG_VERBOSE;

        loggerConfigProvider.config.checkMsgLength = true;
        loggerConfigProvider.config.msgMaxLength = 1000;

    }]);

    module.config([
    '$provide', 'common.services.logger.configProvider', 'LOG_LEVELS', function ($provide, loggerConfig, LOG_LEVELS) {
        $provide.decorator('$log', [
            '$delegate', function ($delegate) {
                // Keep track of the original  method, we'll need it later.
                var origInfo = $delegate.info;
                var origWarn = $delegate.warn;
                var origLog = $delegate.log;
                /*
         * Intercept the call to $log.debug() so we can add on
         * our enhancement. We're going to add on a date and
         * time stamp to the message that will be logged.
         */
                $delegate.info = function () {
                    if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_INFO) {
                        var args = [].slice.call(arguments);

                        // Send on our enhanced message to the original method.
                        try {
                            if (origInfo.apply) {
                                origInfo.apply(null, args);
                            }

                        } catch (e) { //eslint-disable-line no-empty


                        }

                    }
                };

                $delegate.warn = function () {
                    if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_WARNING) {
                        var args = [].slice.call(arguments);
                        // Send on our enhanced message to the original  method.
                        try {
                            if (origWarn.apply) {
                                origWarn.apply(null, args);
                            }

                        } catch (e) { //eslint-disable-line no-empty

                        }

                    }
                };

                $delegate.log = function () {
                    if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_INFO) {
                        var args = [].slice.call(arguments);
                        // Send on our enhanced message to the original  method.
                        try {
                            if (origLog.apply) {
                                origLog.apply(null, args);
                            }

                        } catch (e) { //eslint-disable-line no-empty

                        }

                    }
                };



                return $delegate;
            }
        ]);
    }
    ]);

})();

"use strict";
(function () {
    'use strict';
    angular.module('siemens.simaticit.common')
        .config(['common.services.security.configProvider', 'CONFIG', 'APPCONFIG', function (securityProvider, CONFIG, APPCONFIG) {
            var config = angular.extend({}, APPCONFIG, CONFIG);
            if (config.engineeringServicesUrl && (config.engineeringServicesUrl.slice(-1) !== '/')) {
                config.engineeringServicesUrl += '/';
            }
            securityProvider.config.oDataServiceURI = config.administrationServicesUrl;
        }]);
})();
//# sourceMappingURL=config.qos.js.map
//app.config()
//app.run()
//directive's compile functions (if they are found in the dom)
//app.controller()
//directive's link functions (again if found)

(function () {
    'use strict';

    angular.module('siemens.simaticit.common').config(StateConfiguration).run(StateListeners);

    StateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];
    function StateConfiguration($stateProvider, $urlRouterProvider) {
        /**
         * state description
         * @type {{name: string, abstract: boolean, views: {Canvas: {template: string}}, url: string, data: {}, resolve: {}}}
         *
         */
        var home = {
            name: 'home',
            views: {
                'FullScreenView': {
                    templateUrl: 'common/layout/homeState/loading.html',
                    controller: 'HomeStateController'
                }
            },
            url: '/home?stateid',
            data: {
                title: 'Home',
                isNavigationScreen: true
            },
            defaultLayoutMode: "full",
            params: {
                'stateid': null,
                'stateToReturn': null,
                'stateParamsToReturn': null,
                'stateUrlToReturn': null
            },
            resolve: {
                checkStartupTasks: ['$q', 'common.services.layout.shell', '$translate', '$state', 'RESOURCE', 'CONFIG', 'APPCONFIG', 'common.globalization.globalizationConfig',
                    'common.services.ui.authentication', 'common.services.authentication.config', 'common',
                    function ($q, shell, $translate, $state, RESOURCE, CONFIG, APPCONFIG, globalizationConfig, authentication, authenticationConfig, common) {
                        var deferred = $q.defer();
                        if ($state.toState.name === 'home') {
                            deferred.resolve(true);
                            return deferred.promise;
                        }
                        loadResources().then(function () {
                            var innerDeferred = deferred;
                            checkAuthentication().then(function () {
                                innerDeferred.resolve(false);
                            }, function () {
                                common.logger.logDebug('authentication failed.....waiting for redirect');
                                innerDeferred.reject();
                            });
                        });
                        return deferred.promise;

                        function loadResources() {
                            var deferred = $q.defer();
                            if (globalizationConfig.resourcesLoaded) {
                                deferred.resolve();
                                return deferred.promise;
                            }
                            var config = angular.extend({}, APPCONFIG, CONFIG);
                            shell.setGlobalization(RESOURCE, config.languages).then(function () {
                                $translate.refresh().then(function () {
                                    globalizationConfig.resourcesLoaded = true;
                                    deferred.resolve();
                                }, function () {
                                    deferred.resolve();
                                });
                            }, function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }

                        function checkAuthentication() {
                            var deferred = $q.defer();
                            if (authentication.isAuthorized()) {
                                deferred.resolve();
                                return deferred.promise;
                            }
                            if (!authenticationConfig.config.enableAuthentication) {
                                deferred.resolve();
                                return deferred.promise;
                            }
                            authentication.checkAuthentication().then(function () {
                                deferred.resolve();
                            }, function (reason) {
                                common.logger.logError('check Authentication Error: ', reason);
                                if (reason && reason.status !== undefined && reason.status !== 401 && reason.status !== 404) {
                                    $state.go('error');
                                    deferred.reject();
                                    return;
                                }
                                if (reason.data.error !== undefined && reason.data.error.errorCode === '6401') {
                                    deferred.reject();
                                    return;
                                }
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                ]
            }
        };
        $stateProvider.state(home);

        var error = {
            name: 'error',
            views: {
                'Canvas@': {
                    template: '<div><h3>Error</h3><br><br><h4>Connection Server Error</h4></div>'
                }
            },
            url: '/error',
            data: {
                uimodule: 'Solution Studio',
                sideBarIsHidden: true,
                title: 'Error'
            },
            resolve: {

            }
        };
        $stateProvider.state(error);

        var unauthorize = {
            name: 'unauthorize',
            url: '/unauthorized',
            views: {
                'Canvas@': {
                    templateUrl: 'common/layout/unauthorized/unauthorized.html',
                    controller: 'unauthorizedController',
                    controllerAs: 'unauthCtrl'
                }
            },
            data: {
                title: 'Unauthorized'
            }
        };
        $stateProvider.state(unauthorize);

        var swacUIModule = {
            name: 'swacUIModule',
            url: '/swacUIModule/{id}',
            views: {
                'Canvas@': {
                    templateUrl: 'common/layout/swac/swac.html',
                    controller: 'SWACUIModuleController',
                    controllerAs: 'swacUIMCtrl'
                },
                'property-area-container@': {
                    template: '<div id="side-panel-swac"></div>'
                }
            },
            data: {
                title: 'SWAC UI Module'
            },
            params: {
                id: null,
                url: null
            }
        };
        $stateProvider.state(swacUIModule);


        function getStateUrlFragment(fullStateUrl) {
            var stateUrl = { 'parentUrl': '', 'childUrl': '' };
            var urlList = fullStateUrl.split('/home/');
            if (urlList && urlList.length > 1) {
                var url = urlList[1].split('\/');
                if (url && url.length) {
                    stateUrl.parentUrl = '/' + url[url.length - 1];
                    if (url.length > 1) {
                        stateUrl.parentUrl = '/' + url[url.length - 2];
                        stateUrl.childUrl = '/' + url[url.length - 1];
                    }
                }
            }
            return stateUrl;
        }

        // default for unmatched URL
        //$urlRouterProvider.otherwise(home.url);//home.url
        $urlRouterProvider.otherwise(function ($injector, locationHashbangUrl) {
            var common = $injector.get("common");
            var $state = $injector.get("$state");
            var $rootScope = $injector.get("$rootScope");
            var config = $injector.get("CONFIG");
            var LOG_TYPES = $injector.get("LOG_TYPES");

            var error = {};
            var logDebugFn = common.logger.getLogFn('StateProvider', LOG_TYPES.LOG_WARNING);
            angular.copy(locationHashbangUrl, error);
            logDebugFn('Invalid state change : ' + locationHashbangUrl.$$absUrl, error);

            var fullStateUrl = locationHashbangUrl.$$url;
            if (!fullStateUrl) {
                $state.go('home');
                return;
            }
            var stateUrl = getStateUrlFragment(fullStateUrl);
            $state.go('home', {
                'stateUrlToReturn': stateUrl
            });
        });
    }

    StateListeners.$inject = ['$rootScope', '$state', '$resolve', '$stateParams', '$location', '$translate', 'common', 'LOG_TYPES', 'debug', 'CONFIG', 'APPCONFIG',
        'common.services.component.swacComponentManager', 'common.services.swac.SwacUiModuleManager', 'common.services.security.ui.authorization', '$timeout'];
    function StateListeners($rootScope, $state, $resolve, $stateParams, $location, $translate, common, LOG_TYPES, debug,
        CONFIG, APPCONFIG, swacComponentManager, swacUiModuleManager, UIAuthorization) {
        var config, logDebugFn, logWarningFn;
        var backButtonClicked = false;
        var sidePanelState = false;

        activate();
        function activate() {
            config = angular.extend({}, APPCONFIG, CONFIG);
            logDebugFn = common.logger.getLogFn('StateProvider', LOG_TYPES.LOG_DEBUG);
            logWarningFn = common.logger.getLogFn('StateProvider', LOG_TYPES.LOG_WARNING);

            $rootScope.$on('$stateChangeStart', onStateChangeStart);
            $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
            $rootScope.$on('$viewContentLoaded', onViewContentLoaded);
            $rootScope.$on('$stateNotFound', onStateNotFound);
            $rootScope.$on('$stateChangeError', onStateChangeError);
        }

        function isSidepanelState(statename) {
            var stateData = $state.get(statename);
            if (stateData) {
                var propertyAreaContainer = stateData.views['property-area-container@'];
                return propertyAreaContainer && propertyAreaContainer.hasOwnProperty('templateUrl');
            }
            return false;
        }

        function sidePanelStateCheck(event, _toState, _toParams, _fromState, _fromParams, options) {
            if (swacUiModuleManager.enabled) {
                // checking for navigating from sidepanel
                var isFromSidePanel = isSidepanelState(_fromState.name);
                if (isFromSidePanel && common.historyTracker[common.historyTracker.length - 1].state === _toState.name) {
                    sidePanelState = isFromSidePanel;
                    return;
                }

                // checking for navigating to sidepanel
                var isToSidePanel = isSidepanelState(_toState.name);
                sidePanelState = isToSidePanel;
                if (isToSidePanel) return;

                backButtonClicked = (_toState.name === $rootScope.previousState);

                //updating previous state
                if (!backButtonClicked) {
                    if (isFromSidePanel) {
                        $rootScope.previousState = common.historyTracker[common.historyTracker.length - 1].state;
                    } else {
                        $rootScope.previousState = _fromState.name;
                    }
                }
            }
        }
        function onStateChangeStart(event, _toState, _toParams, _fromState, _fromParams, options) {
            // toState values will be available only after the resolve. Below statements to access toState in resolve.
            $state.toState = _toState;
            $state.toParams = _toParams;
            sidePanelStateCheck(event, _toState, _toParams, _fromState, _fromParams, options);
            
            

            //first step: function rights not loaded
            if (!UIAuthorization.isFunctionalRightsLoaded) {
                // am i navigation to home state to complete startup tasks
                // if no, navigate to home page and stop further steps
                // if yes, do the final steps and skip the futher checks
                if (_toState.name !== 'home') {
                    event.preventDefault();
                    navigateToHome();
                    return;
                }
                finalSteps();
                event.skip = true;
                return;
            }

            //functional rights loaded
            //check whether navigation to home page from its child states with reload set to false
            //if yes, force the navigation with reload set to true and stop further steps
            if (_toState.name === 'home' && _fromState.name.indexOf('home.') === 0 && !options.reload) {
                event.preventDefault();
                $state.go(_toState.name, _toParams, { reload: true });
                return;
            }

            //whether navigation to default pages (home, home.settings, unauthorize, error)
            //if yes, no authorization check required, proceed with final steps and skip further checks
            if (_toState.name === 'home' || _toState.name === 'unauthorize' || _toState.name === 'error' || _toState.name === 'home.settings') {
                finalSteps();
                event.skip = true;
                return;
            }

            //is the request for non runtime pages (solution studio and documentation center)
            //if yes, no authorization check required, proceed with final steps.
            //further authorization check will be done the main app (solution studio or documentation center)
            if ('rt' !== config.type) {
                finalSteps();
                return;
            }

            if (!UIAuthorization.isScreenAccessible(_toState.name)) {
                event.preventDefault();
                $state.go('unauthorize');
                return;
            }
            finalSteps();

            function setLayoutMode() {
                $rootScope.layoutMode = 'normal';
                if ('full' === _toState.defaultLayoutMode) {
                    $rootScope.layoutMode = 'full';
                }
            }

            function checkSidePanel() {
                //the type is used to close automatically sidepanel on change status
                var type = common.sidePanelManager.getSidePanelInfo();
                var isSidepanelOpened = common.sidePanelManager.getSidePanelStatus();
                if (type !== null && isSidepanelOpened === true) {
                    common.sidePanelManager.close(type);
                }
            }

            function navigateToHome() {
                var stateid = Date.now() + '' + window.$UIF.Utility.random();
                $state.go('home', { 'stateid': stateid, 'stateToReturn': _toState.name, 'stateParamsToReturn': JSON.stringify(_toParams) });
            }

            function logStateChange() {
                var msg = '$stateChangeStart from "' + _fromState.name + '" to "' + _toState.name + '" - fired when the transition begins.: \n';
                var data = {
                    fromState: _fromState,
                    fromParams: _fromParams,
                    toState: _toState,
                    toParams: _toParams
                };
                logDebugFn(msg, data);
            }

            function finalSteps() {
                setLayoutMode();
                checkSidePanel();
                logStateChange();
            }
        }

        function onStateChangeSuccess(event, _toState, _toParams, _fromState, _fromParams) {
            var msg = '$stateChangeSuccess from "' + _fromState.name + '" to "' + _toState.name + '" - fired once the state transition is complete..: \n';
            var data = {
                fromState: _fromState,
                fromParams: _fromParams,
                toState: _toState,
                toParams: _toParams
            };

            if (_fromState.name !== '') {
                $rootScope.$broadcast('siemens.simaticit.common.stateChangeSuccess', data);
            }

            logDebugFn(msg, data);

            /* Check ui-view */
            if (debug.config.enableDebug) {

                for (var key in _toState.views) {
                    if (_toState.views.hasOwnProperty(key)) {
                        var idx = key.indexOf('@');
                        if (idx > 0) {
                            key = key.substring(0, idx);
                        }

                        if (debug.uiViews.indexOf(key) === -1) {
                            logWarningFn('view ' + key + ' does not exist in the current scope', debug.uiViews);
                        }
                    }
                }
            }
            $rootScope.$emit('siemens.simaticit.common.widgets.component.gridster-loaded', false);

            if (swacUiModuleManager.enabled) {
                swacUiModuleManager.navigationServicePromise.promise.then(function (service) {
                    service.navigateTo('momSwacSublocation', { screen: _toState.name }, { notify: false });
                });

                if (data.toState.views && (data.toState.views['Canvas@'] || data.toState.views['FullScreenView'])) {
                    var headerTitle = '';
                    var queryStrObj = {};
                    if (_toState.data && _toState.data.isNavigationScreen) {
                        headerTitle = CONFIG.title;
                    } else {
                        headerTitle = _toState.data ? $translate.instant(_toState.data.title) : '';
                    }

                    swacUiModuleManager.contextServicePromise.promise.then(function (service) {
                        service.updateCtx('location.titles', { headerTitle: headerTitle });
                    });

                    swacUiModuleManager.navigationServicePromise.promise.then(function (service) {
                        queryStrObj = service.getQueryString();
                    });

                    if (!sidePanelState) {
                        if (common.historyTracker.length > 2 && (backButtonClicked || common.historyTracker[common.historyTracker.length - 2].navigateBack)) {
                            common.historyTracker[common.historyTracker.length - 2].navigateBack = false;
                            common.historyTracker.pop();
                            $rootScope.previousState = _.last(common.historyTracker, 2)[0].state;
                        } else if (!backButtonClicked) {
                            var _state = data.toState;
                            var _stateParams = angular.extend({}, data.toParams);
                            _stateParams.queryString = queryStrObj;
                            common.historyTracker.push({ state: _state.name, stateParams: _stateParams, navigateBack: false });
                            if (common.historyTracker.length > 1) {
                                var last = common.historyTracker[common.historyTracker.length - 1];
                                var lastButOne = common.historyTracker[common.historyTracker.length - 2];
                                if (last.state === lastButOne.state) {
                                    common.historyTracker.pop();
                                }
                            }
                        }
                    }
                }

                if (_toState.name === 'home' || _toState.name === 'home.homeCard') {
                    common.updatePreviousButton(false);
                } else {
                    common.updatePreviousButton(true);
                }
            }
        }

        function onViewContentLoaded() {
            var querystring = $location.search();
            var implicitUIModuleExposition = 'exposedAsSwac' in querystring && querystring['exposedAsSwac'] ? true : false;
            if (swacComponentManager.enabled && !swacComponentManager.swacComponent && $state.current.name && implicitUIModuleExposition) {
                swacComponentManager.create($state.current.name).expose();

            }
            else {
                var info = {
                    swacEnabled: swacComponentManager.enabled,
                    swacComponent: swacComponentManager.swacComponent ? 'Create Already Called' : 'Created Not Yet called',
                    componentName: $state.current.name

                };
                logDebugFn('viewContentLoaded: not in swac mode because of: ', info);
            }
            if (swacUiModuleManager.enabled && ($state.current.name !== undefined && $state.current.name !== '')) {
                swacUiModuleManager.create($state.current.name).expose();
            }
        }

        function onStateNotFound(event, _unfoundState, _fromState, _fromParams) {
            var msg = '$stateNotFound from "' + _fromState.name + '" to "' + _unfoundState.name + '" - fired when a state cannot be found by its name..: \n';
            var data = {
                fromState: _fromState,
                fromParams: _fromParams,
                unfoundState: _unfoundState
            };
            logWarningFn(msg, data);
        }

        function onStateChangeError(event, _toState, _toParams, _fromState, _fromParams, _error) {
            var msg = '$stateChangeError from "' + _fromState.name + '" to "' + _toState.name + '" - fired when an error occurs during transition.:"' + _error + "'\n'";
            var data = {
                fromState: _fromState,
                fromParams: _fromParams,
                toState: _toState,
                toParams: _toParams,
                error: _error
            };
            logWarningFn(msg, data);

        }
    }
})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common')
        .config(['common.services.runtime.ConfigProvider','CONFIG','APPCONFIG', function (businessConfigProvider, CONFIG, APPCONFIG) {

            var config = angular.extend({}, APPCONFIG, CONFIG);
            if (config.runtimeServicesUrl && config.runtimeServicesUrl.slice(-1) !== '/'){
                config.runtimeServicesUrl += '/';
            }

            businessConfigProvider.config.oDataServiceURI = config.runtimeServicesUrl;
            businessConfigProvider.config.applicationServiceUrls = config.applicationServiceUrls;

        }]);

})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common')
    .config(['common.services.signalManager.AddressConfigProvider', 'CONFIG', 'APPCONFIG', function (signalManagerAddressConfigProvider, CONFIG, APPCONFIG) {
        var config = angular.extend({}, APPCONFIG, CONFIG);
        if (config.signalMainAddress && config.signalMainAddress.slice(-1) !== '/') {
            config.signalMainAddress += '/';
        }
        if (config.signalStreamAddress && config.signalStreamAddress.slice(-1) !== '/') {
            config.signalStreamAddress += '/';
        }
        signalManagerAddressConfigProvider.config.signalMainAddress = config.signalMainAddress;
        signalManagerAddressConfigProvider.config.signalStreamAddress = config.signalStreamAddress;

    }]);

})();


(function () {
    'use strict';

    var module = angular.module('siemens.simaticit.common');

    /**
     * @ngdoc config
     * @name common.base.unityInterceptorConfigProvider
     * @module unity
     * @description
     * Here you can specify the custom header to be inserted and / or modify
     *
     * @example
     * var customKeys = {};
     * customKeys['KEY1'] = 'VALUE1';
     * customKeys['KEY2']  = 'VALUE2'
     *
     * unityInterceptorConfigProvider.config.customHeaders = customKeys;
     *
     *
     */
    module.config(['common.base.unityInterceptorConfigProvider', function (unityInterceptorConfigProvider) {



      unityInterceptorConfigProvider.config.customHeaders = {};


    }]);

})();
