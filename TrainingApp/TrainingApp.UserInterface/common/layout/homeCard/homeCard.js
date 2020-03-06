/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    HomeCardScreenController.$inject = ['common.services.homeCard.config', '$translate', '$state']
    function HomeCardScreenController(homeCardConfigService, $translate, $state) {
        var vm = this;

        function activate() {
            init();
        }

        function init() {
            vm.cards = [];
            var homeCardConfig = homeCardConfigService.getHomeCardConfig();
            var sortedHomeCardConfig = _.sortBy(homeCardConfig, 'id').reverse(); //home card is shown in reverse order by css flex
            generateHomeCards(sortedHomeCardConfig);
        }

        function generateHomeCards(homeCardConfig) {
            homeCardConfig.forEach(function (config) {
                var card = {
                    title: $translate.instant(config.titleKey),
                    description: $translate.instant(config.descriptionKey),
                    image: config.imagePath,
                    callback: onCardClick.bind(null, config.id)
                }
                vm.cards.push(card);
            });
        }

        function onCardClick(id) {
            $state.go('home.homeCard.homeTile', { category: id });
        }

        activate();
    }

    angular
        .module('siemens.simaticit.common.services.layout')
        .controller('HomeCardScreenController', HomeCardScreenController);
}());

(function () {
    'use strict';
    angular
        .module('siemens.simaticit.common.services.layout')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state({
                name: 'home.homeCard',
                url: '/homeCard',
                views: {
                    'Canvas@': {
                        templateUrl: 'common/layout/homeCard/home-card.html',
                        controller: 'HomeCardScreenController',
                        controllerAs: 'homeCardCtrl'
                    }
                },
                data: {
                    title: 'Home Card',
                    sideBarIsHidden: true,
                    afxBackground: true,
                    isNavigationScreen: true
                }
            });
        }]);
}());
