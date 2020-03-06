/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    HomeTileScreenController.$inject = ['common.services.homeCard.config', '$stateParams', '$state'];
    function HomeTileScreenController(homeCardConfigService, $stateParams, $state) {
        var vm = this;
        var category, homeTileConfig, moduleNames;

        function generateTileConfigObject() {
            moduleNames.forEach(function (moduleName) {
                var tileConfig = {
                    title: '',
                    tiles: []
                };
                tileConfig.title = moduleName;
                homeTileConfig[moduleName].forEach(function (screen) {
                    var tile = {
                        title: screen.title,
                        icon: screen.svgIcon ? screen.svgIcon : getIcon(screen.icon),
                        callback: onTileClick(screen.state)
                    }
                    if (typeof tile.icon === 'object') {
                        tile.icon.size = '64px';
                    }
                    tileConfig.tiles.push(tile);
                });
                vm.tileConfig.push(tileConfig);
            });
        }

        function onTileClick(state) {
            return function () {
                $state.go(state);
            }
        }


        function getIcon(icon) {
            if (icon && icon.substr(0, 3) === 'svg') {
                var iconName = icon.replace(/(svg )([a-zA-Z0-9]*)/, '$2.$1');
                var imagePath = 'common/icons/' + iconName;
                return ({
                    path: imagePath.trim()
                });
            } else {
                return icon;
            }
        }

        function init() {
            vm.tileConfig = [];
            category = $stateParams.category;
            homeTileConfig = homeCardConfigService.getHomeTileConfig(category);
            moduleNames = Object.keys(homeTileConfig);
            generateTileConfigObject();
        }

        function activate() {
            init();
        }

        activate();
    }

    angular
        .module('siemens.simaticit.common.services.layout')
        .controller('HomeTileScreenController', HomeTileScreenController);
}());

(function () {
    'use strict';
    angular
        .module('siemens.simaticit.common.services.layout')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state({
                name: 'home.homeCard.homeTile',
                url: '/homeTile/:category',
                views: {
                    'Canvas@': {
                        templateUrl: 'common/layout/homeTile/home-tile.html',
                        controller: 'HomeTileScreenController',
                        controllerAs: 'homeTileCtrl'
                    }
                },
                data: {
                    title: 'Home Tile',
                    sideBarIsHidden: true,
                    afxBackground: true,
                    isNavigationScreen: true
                },
                params: {
                    category: null
                }
            });
        }]);
}());
