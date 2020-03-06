/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.widgets.homeCard
     *
     * @description
	 * This module provides functionalities of a home card which is used in the Home Page to navigate to a specific product page or to navigate to a group of production options.
     */
 /**
    * @ngdoc directive
    * @access internal
    * @name sitHomeCard
    * @module siemens.simaticit.common.widgets.homeCard
    * @description
    * **sitHomeCard** is used in the Home Page to navigate to a specific page.
    * It contains an image, title with a short description.
    * It can be configured in two ways:
    * 1. Navigate to another page by clicking anywhere on the tile.
    * 2. Navigate to another page by clicking on the dedicated icon on the bottom right corner.
    *
    * @usage
    * As an element:
    * ```
    *     <sit-home-card options="card"></sit-home-card>
    * ```
    *   @param {Array} options It contains an array of objects.
    *   These objects contain title, description, image (png/jpg/jpeg) and a command button details that contains an icon name and a callback function.
    * @example
    * The following example shows how to configure a **sit-home-card widget**:
    *
    * In Controller:
    * ```
    * function HomeCardDevController($translate) {
    *    var vm = this;
    *    activate(vm);

    *    function init(vm) {
    *        vm.cards = [
    *            {
    *                title: $translate.instant('homeCards.engineeringProjects.title'),
    *                description: $translate.instant('homeCards.engineeringProjects.description'),
    *                image: 'common/images/home-cards/imgEngineeringProjects.png',
    *                action: {
    *                    title: $translate.instant('homeCards.engineeringProjects.action.title'),
    *                    icon: { path: 'common/icons/cmdOpen24.svg' },
    *                    callback: openCallback
    *                }
    *            },
    *            {
    *                title: $translate.instant('homeCards.settings.title'),
    *                description: $translate.instant('homeCards.settings.description') +
    *                'This is test description to test the leangth of the descrion where it was getting truncated',
    *                image: 'common/images/home-cards/imgSettings.png',
    *                callback: clickCallback,
    *            },
    *            {
    *                title: $translate.instant('homeCards.siteManagement.title'),
    *                description: $translate.instant('homeCards.siteManagement.description'),
    *                image: 'common/images/home-cards/imgSiteManagement.png',
    *                action: {
    *                    title: $translate.instant('homeCards.siteManagement.action.title'),
    *                    icon: { path: 'common/icons/cmdOpen24.svg' },
    *                    callback: openCallback
    *                }
    *            }
    *        ]
    *    }
    *
    *    function openCallback(ctrl) {
    *        console.log(ctrl);
    *    }
    *
    *    function activate(vm) {
    *       init(vm);
    *    }
    *}
    * ```
    */

(function () {
    'use strict';
    angular
        .module('siemens.simaticit.common.widgets.homeCard',[])
        .component('sitHomeCard', {
            templateUrl: 'common/widgets/homeCard/sit-home-card.html',
            controller: function () { },
            controllerAs: 'homeCardCtrl',
            bindings: {
                options: "=?"
            }
        });
})();

