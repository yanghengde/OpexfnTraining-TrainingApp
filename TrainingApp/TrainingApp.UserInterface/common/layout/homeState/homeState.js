/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.layout')
        .controller('HomeStateController', HomeStateController)
        .config(['$locationProvider', '$compileProvider', AngularConfig]);

    function AngularConfig($locationProvider, $compileProvider) {
        //configured on angular migration to 1.6.3
        $locationProvider.hashPrefix("");
        $compileProvider.preAssignBindingsEnabled(true);
    }

    HomeStateController.$inject = ['$timeout','$rootScope', '$state', '$interval', 'common.services.security.ui.authorization', 'CONFIG', 'APPCONFIG', 'common.sidebar.sidebarService',
        '$stateParams', 'common.widgets.messageOverlay.service', '$translate', 'checkStartupTasks', '$q', 'common.services.session', 'common.globalization.globalizationConfig',
        'common.services.ui.authentication', 'common.services.authentication.config', 'common.services.layout.shell', 'RESOURCE', 'common.services.logger.service',
        'common.services.startup.service', 'common.services.modelDriven.service',
        'common.services.personalization.personalizationService', 'common.services.nerveBoxStartupService', 'common.services.swac.SwacUiModuleManager'];
    function HomeStateController($timeout, $rootScope, $state, $interval, auth, CONFIG, APPCONFIG, SidebarService, $stateParams, globalMsgOverlayManager, $translate, checkStartupTasks,
        $q, sessionService, globalizationConfig, authentication, authenticationConfig, shell,
        RESOURCE, loggerService, startupService, mdService, personalizationService, nerveboxStartupService, swacManagerService) {
        var config, logger, homeStateInterval, authorizedModules = [];

        activate();
        function activate() {
            angular.element('#initialBusyIndicator').remove();
            init();
            if ($stateParams.stateid && $stateParams.stateToReturn) {
                sessionService.set($stateParams.stateid + '.stateToReturn', $stateParams.stateToReturn);
                if ($stateParams.stateParamsToReturn) {
                    sessionService.set($stateParams.stateid + '.stateParamsToReturn', $stateParams.stateParamsToReturn);
                }
            }
            if ($stateParams.stateUrlToReturn) {
                sessionService.set('stateUrlToReturn', JSON.stringify($stateParams.stateUrlToReturn));
            }

            if (!checkStartupTasks) {
                start();
                return;
            }
            loadResources().then(function () {
                checkAuthentication().then(function () {
                    loadModelDrivenModules().then(function () {
                        if ('runtime' !== APPCONFIG.appConfig.type) {
                            start();
                            nerveboxStartupService.start();
                            return;
                        }
                        personalizationService.getPersonalization().then(function () {
                            $timeout(function () {
                                start();
                                nerveboxStartupService.start();
                            }, 1000);
                        });
                    }, function () {
                        logger.logDebug('loading model driven modules failed.');
                    });
                }, function () {
                    logger.logDebug('authentication failed.....waiting for redirect');
                });
            });
        }

        function init() {
            config = angular.extend({}, APPCONFIG, CONFIG);
            logger = loggerService.getModuleLogger('HomeStateController');
            if (config.appConfig.type === 'runtime') {
                //Opcenter EX FN 3.1 onwards, for runtime applications, the resource files will be merged and loaded from new folder resources.
                RESOURCE = {
                    path: [{
                        name: 'resources/', modules: [
                            { name: 'resource' }
                        ]
                    }
                    ]
                };
            }
        }

        function start() {
            if ($state.current.name !== 'home') {
                return;
            }
            if (auth.isFunctionalRightsLoaded) {
                redirectToState();
                return;
            }
            if (CONFIG.type !== 'rt') {
                auth.isFunctionalRightsLoaded = true;
                executeStartTasks().finally(redirectToState);
                return;
            }
            auth.initialize().then(function () {
                //hiding inaccessible screens in sidebar at 'RUNTIME'
                hideSidebarMenuItems(auth.getAuthorizedScreens());
                if (swacManagerService.enabled) {
                    var authorizedScreens = auth.getAuthorizedScreens();
                    swacManagerService.contextServicePromise.promise.then(function (service) {
                        service.registerCtx('authorizedScreens', authorizedScreens);
                    });
                    authorizedScreens.length && config.menu.length && config.menu.forEach(function (menuItem) {
                        menuItem.contents && menuItem.contents.forEach(function (itemobject) {
                            _.contains(authorizedScreens, itemobject.id) && authorizedModules.push(menuItem.id);
                        });
                    });
                    swacManagerService.contextServicePromise.promise.then(function (service) {
                        service.registerCtx('authorizedModules', authorizedModules);
                    });
                }
            }, function () {

            }).finally(function () {
                executeStartTasks().finally(redirectToState);
                if (swacManagerService.enabled) {
                    swacManagerService.eventBusServicePromise.promise.then(function (service) {
                        service.publish('hideInitialOpBusyIndicator', {});
                    });
                }
            });
        }

        function loadResources() {
            var deferred = $q.defer();
            if (globalizationConfig.resourcesLoaded) {
                deferred.resolve();
                return deferred.promise;
            }
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
                logger.logErr('check Authentication Error: ', reason);
                if (reason && reason.status !== undefined && reason.status !== 401 && reason.status !== 404) {
                    $state.go('error');
                    deferred.reject();
                    return;
                }
                if (reason.data.error !== undefined && reason.data.error.errorCode === '6401') {
                    deferred.reject();
                    return;
                }
                if (reason.data.error !== undefined && reason.data.error.errorCode === 503) {
                    showErrorMessage($translate.instant('common.serviceLayerError.title'), reason.data.error.errorMessage);
                    deferred.reject();
                    return;
                }
                deferred.resolve();
            });
            return deferred.promise;
        }

        function loadModelDrivenModules() {
            var deferred = $q.defer();
            mdService.initStates().then(function () {
                deferred.resolve();
            }, function () {
                deferred.resolve();
            });
            return deferred.promise;
        }

        function executeStartTasks() {
            var deferred = $q.defer();
            startupService.execute().finally(function () {
                deferred.resolve();
            });
            return deferred.promise;
        }

        function hideSidebarMenuItems(accessibleStates) {
            var hideInSidebar = [], menuIds = [];
            var menuItems = CONFIG.menu;
            menuItems.forEach(function (menuItem) {
                menuIds.push(menuItem.id);
                var contents = menuItem.contents;
                if (contents && contents.length > 0) {
                    var idsToHide = [];
                    contents.forEach(function (content) {
                        if (content.securable === true) {
                            var isStateAccessible = _.contains(accessibleStates, content.id);

                            if (!isStateAccessible) {
                                idsToHide.push(content.id);
                            }
                        }
                    });
                    if (contents.length === idsToHide.length) {
                        hideInSidebar.push(menuItem.id);
                    } else if (idsToHide.length > 0) {
                        idsToHide.forEach(function (id) {
                            hideInSidebar.push(id);
                        });
                    }

                } else {
                    if (menuItem.securable === true) {
                        var isStateAccessible = _.contains(accessibleStates, menuItem.id);
                        if (!isStateAccessible) {
                            hideInSidebar.push(menuItem.id);
                        }
                    }
                }
            });
            var matchStates = _.difference(menuIds, hideInSidebar);
            if (matchStates.length === 0 && hideInSidebar.length === menuIds.length) {
                $rootScope.hideSidebar = true;
            } else {
                SidebarService.hideMenuItems(hideInSidebar);
            }
            if (swacManagerService.enabled) {
                swacManagerService.contextServicePromise.promise.then(function (service) {
                    service.registerCtx('unAuthorizedModules', hideInSidebar);
                });
            }
        }

        function getStateNameByUrl(stateURL) {
            var stateUrlToBeSearched = stateURL.childUrl ? stateURL.childUrl : stateURL.parentUrl;
            var stateName, stateParams, stateObj;
            var allStates = $state.get();
            if (allStates && allStates.length) {
                allStates.forEach(function (state, index) {
                    if (state.url === stateUrlToBeSearched) {
                        stateObj = state;
                        if (!state.views['Canvas@']) {
                            stateObj = getStateNameByUrl({ 'parentUrl': stateURL.parentUrl });
                        }
                        stateName = stateObj.name;
                        stateParams = stateObj.params;
                    }
                });
            }
            return { 'name': stateName, 'params': stateParams };
        }

        function redirectToState() {
            var state, stateParams, stateUrl = {}, isStateFromConfig;
            if ($stateParams.stateid) {
                state = sessionService.get($stateParams.stateid + '.stateToReturn');
                stateParams = sessionService.get($stateParams.stateid + '.stateParamsToReturn');

                sessionService.remove($stateParams.stateid + '.stateToReturn');
                sessionService.remove($stateParams.stateid + '.stateParamsToReturn');
            }
            if (undefined === state || null === state || 'home' === state) {

                stateUrl = JSON.parse(sessionService.get('stateUrlToReturn'));
                sessionService.remove('stateUrlToReturn');
                if (stateUrl && stateUrl.parentUrl) {
                    var stateObj = getStateNameByUrl(stateUrl);
                    if (stateObj && stateObj.name) {
                        state = stateObj.name;
                        stateParams = JSON.stringify(stateObj.params);
                    }
                }
                if (undefined === state || null === state) {
                    if (config.home === undefined) {
                        showErrorMessage($translate.instant('common.undefinedHome.title'), $translate.instant('common.undefinedHome.text'));
                        return;
                    }

                    state = config.home;
                    isStateFromConfig = true;
                }
            }
            if (!isStateFromConfig) {
                if (undefined !== stateParams && null !== stateParams) {
                    stateParams = JSON.parse(stateParams);
                } else {
                    stateParams = {};
                }
                $state.go(state, stateParams, { inherit: false });
                return;
            }
            var homeState = getStateValue(state);
            if (undefined !== homeState && null !== homeState) {
                navigateToHomeState(state);
                return;
            }
            homeStateInterval = $interval(function () {
                var homeState = getStateValue(state);
                if (homeState && Object.keys(homeState).length) {
                    navigateToHomeState(state);
                }
            }, 100);
        }

        function getStateValue(stateName) {
            return $state.get(stateName);
        }

        function navigateToHomeState(stateName) {
            if (undefined !== homeStateInterval) {
                $interval.cancel(homeStateInterval);
            }
            $state.go(stateName, {}, { inherit: false });
        }

        function hideOverlay() {
            globalMsgOverlayManager.hide();
        }

        function showErrorMessage(title, text) {
            var overlaySettings = {
                buttons: [{
                    id: 'ok',
                    displayName: $translate.instant('common.ok'),
                    onClickCallback: hideOverlay
                }],
                title: title,
                text: text
            };

            globalMsgOverlayManager.set(overlaySettings);
            globalMsgOverlayManager.show();
        }
    }
})();


