/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    ComponentController.$inject = ['$timeout', '$window', '$rootScope', '$scope', 'common.services.component.swacComponentManager', 'common.services.component.uiComponentService',
        'componentManifest'];
    function ComponentController($timeout, $window, $rootScope, $scope, swacComponentManager, uiComponentService, componentManifest) {
        var vm = this;
        var componentInstance = null;

        activate();
        function activate() {
            if (!componentManifest) {
                return;
            }
            init();

            // Create a SWAC Component from the UI Component Manifest and expose it.
            swacComponentManager.createFrom(componentManifest).bind(onSwacComponentDpcChange).expose().then(onExposeSuccess);
            subscribeEvents();
        }
        function init() {
            // Exposing the name of the directive to the view, so that it is possible to load it dynamically using a sit-component directive
            var identity = componentManifest.uiComponent.identity;
            var contracts = componentManifest.uiComponent.contracts;

            vm.name = identity.name;
            vm.source = identity.source;
            vm.contracts = {
                methods: [],
                events: [],
                properties: {},
                onPropertyChange: onUiComponentDpcChange
            };

            if (typeof contracts.api.methods === 'object') {
                vm.contracts.methods = Object.keys(contracts.api.methods);
            }

            if (typeof contracts.api.events === 'object') {
                vm.contracts.events = Object.keys(contracts.api.events);
            }

            if (typeof contracts.dpc === 'object') {
                for (var index = 0, dpcNames = Object.keys(contracts.dpc), count = dpcNames.length; index < count; index++) {
                    var dpcName = dpcNames[index];
                    var dpc = contracts.dpc[dpcName];

                    var property = {
                        node: dpc.node,
                        type: dpc.type,
                        category: dpc.category,
                        description: dpc.description,
                        permission: dpc.permission,
                        'default': dpc.default
                    };
                    vm.contracts.properties[dpcName] = property;
                }
            }
        }

        function onExposeSuccess() {
            $timeout(function () {
                angular.element($window).trigger('resize');
            });
        }

        function subscribeEvents() {
            $rootScope.$on('siemens.simaticit.common.widgets.container.mashupReady', onMashupReady);
        }

        function onMashupReady() {
            var component = uiComponentService.getComponent('internal_' + vm.name);
            if (component) {
                componentInstance = component.instance.instance;
            }
        }

        function onUiComponentDpcChange(propertyName, oldValue, newValue) {
            swacComponentManager.setDpcValue(propertyName, newValue);
        }

        function onSwacComponentDpcChange(data) {
            if (null === componentInstance) {
                return;
            }
            componentInstance.properties[data.key]._set(data.value);
            triggerDigest();
        }

        function triggerDigest() {
            $timeout(function () { });
        }
    }

    /**
    * @ngdoc controller
    * @access internal
    * @name ComponentController
    * @module siemens.simaticit.common.services.layout
    * @requires $scope , common.services.component.swacComponentManager , componentManifest
    * @description
    * Used to manage exposed Swac components
    */

    angular.module('siemens.simaticit.common.services.layout').controller('common.services.layout.componentController', ComponentController);
})();

/*
 * add new states to $stateProvider
 */
(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.layout')
        .config(['$stateProvider', function ($stateProvider) {
            var componentState = {
                name: 'home.component',
                url: '/component/:app/:component',
                views: {
                    'Canvas@': {
                        templateUrl: 'common/layout/component/component.html',
                        controller: 'common.services.layout.componentController',
                        controllerAs: 'componentCtr'
                    }
                },
                resolve: {
                    componentManifest: ['$stateParams', '$location', '$log', 'common.services.component.uiComponentService', 'common.services.component.migrationService',
            function ($stateParams, $location, $log, uiComponentService, migrationService) {
                //Load the component manifest using defined folder structure
                return uiComponentService.getComponentManifest($stateParams.app, $stateParams.component).then(function (data) {
                    data = migrationService.migrateUIComponentManifest(data);
                    return data;
                }, function () {
                    $log.error('Please check the name of app and component.');
                    $location.url('/home');
                });
            }
                    ]
                }
            };
            $stateProvider.state(componentState);
        }]);
})();
