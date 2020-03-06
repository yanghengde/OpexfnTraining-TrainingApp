/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    SWACUIModuleController.$inject = ['$scope', '$rootScope', 'CONFIG', '$stateParams', 'common.widgets.busyIndicator.service', 'SWACServic',
        'common.services.component.swacComponentService'];
    function SWACUIModuleController($scope, $rootScope, CONFIG, stateParams, busyIndicator, swacService, swacComponentService) {

        var vm = this;
        vm.isCreationFailed = false;
        vm.url = "";
        activate();

        function activate() {
            init();
        }

        function init() {
            if (stateParams.id && !stateParams.url) {
                setUrl(CONFIG.menu);
            } else {
                vm.url = stateParams.url;
            }
            //Creating component for the first time
            if (swacService.getUrl().length === 0) {
                onEnter();
                return;
            }
            //component already created, navigate to another page of same application
            if (swacService.getUrl() === vm.url.substr(0, vm.url.indexOf('#'))) {
                var currentComponent = SWAC.Container.get({ name: 'swacUIModuleWithUniqName' });
                if (currentComponent) {
                    currentComponent.proxy.navigate(stateParams.id);
                    return;
                }
            } else {
                //one component already created, navigating to another application url. Close the existing component,
                //create a new component
                closeComponent(true);
                return;
            }
        }

        function setUrl(menu) {
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].id === stateParams.id) {
                    vm.url = menu[i].url;
                    break;
                } else if (menu[i].contents) {
                    setUrl(menu[i].contents);
                }
            }
        }

        function onEnter() {
            SWAC.Config.Container.URLs.BaseLibrary = 'common/scripts/swac-base.js';
            busyIndicator.show();
            /*            SWAC.Container.beginCreate([
                            {
                                name: 'swacUIModuleWithUniqName',
                                source: vm.url,
                                type: '',
                                settings: {
                                    'left': '48px',
                                    'top': '65px',
                                    'width': 'calc(100% - 48px)',
                                    'height': 'calc(100% - 65px)',
                                    'flavor': 'ui'
                                }
                            }])*/
            swacComponentService.loadComponent('swacUIModuleWithUniqName', '', vm.url, null, '48', '65', 'calc(100% - 48px)', 'calc(100% - 65px)', 'ui')
            .then(
            function (value) {
                busyIndicator.hide();
                vm.isCreationFailed = false;
                swacService.setUrl(vm.url.substr(0, vm.url.indexOf('#')));
            },
            function (reason) {
                busyIndicator.hide();
                vm.isCreationFailed = true;
                vm.title = 'SWAC component creation failed';
                vm.message = reason;
            });
            //interfaces
            subscribeEvents();
            function setInnerTheme(currentComponent) {
                if (currentComponent.interfaces.has('SIT.UI.Themable')) {
                    currentComponent.interfaces.beginGet('SIT.UI.Themable').then(
                        function (inf) {
                            var theme;
                            inf.getTheme().then(function (data) {
                                theme = data;
                                inf.setTheme(theme).then(function () {
                                    currentComponent.beginShow(true);
                                    $scope.$apply();
                                });

                            }, function (error) {
                                vm.title = 'Error';
                                vm.message = error;
                            });
                        },
                        function (reason) {
                            vm.title = 'Error';
                            vm.message = reason;
                        });
                }
            }
            function subscribeEvents() {
                SWAC.Container.onCreated.subscribe(function (event) {
                    var name = event.data.name,
                        currentComponent = SWAC.Container.get({ name: name });
                    window.console.log('Component created: ' + name);
                    currentComponent.onReady.subscribe(function (event) {
                        window.console.log('Component ready: ' + name);
                        setInnerTheme(currentComponent);
                    });
                });
                /* onCreated is an event (not a promise) ... failure is already managed in the reject of the beginCreate
                , function (error) {
                    vm.message = 'Error';
                    vm.message = error;
                });*/
            }
        }

        function closeComponent(creatAgain) {
            SWAC.Container.beginClose(null, true, 60000).then(
                function (value) {
                    swacService.setUrl("");
                    if (creatAgain) {
                        onEnter();
                    }

                    window.console.log('beginClose successfully');
                },
                function (reason) {
                    window.console.log('beginClose failed');
                });
        }

        $scope.$on('$destroy', function () {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name !== 'swacUIModule') {
                    closeComponent();
                }
            });

        });

    }

    angular.module('siemens.simaticit.common.services.layout').service('SWACServic', function () {
        var vm = this;
        vm.url = '';
        vm.setUrl = function (url) {
            vm.url = url;
        };
        vm.getUrl = function () {
            return vm.url;
        };

    }).controller('SWACUIModuleController', SWACUIModuleController)
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('template/swac/swac-uaf-form.html',
                '<div id="swac-form-body">' +
                '</div>'
            );
        }]);
})();
