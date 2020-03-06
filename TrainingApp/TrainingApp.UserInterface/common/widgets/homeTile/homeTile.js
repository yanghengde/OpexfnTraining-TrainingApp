/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {

    /**
   * @ngdoc module
   * @access internal
   * @name siemens.simaticit.common.widgets.homeTile
   * @description
   * This module provides functionalities related to home tile which is used to navigate to a specific product option.
   */
    /**
* @ngdoc directive
* @access internal
* @name sitHomeTile
* @module siemens.simaticit.common.widgets.homeTile
* @description
* Displays a tile which helps to navigate to a specific product option.
* It contains an image and a title which can be upto three lines long.

*
* @usage
* As an element:
* ```
*     <sit-home-tile options="tile"></sit-home-tile>
* ```
* @restrict E
*
* @param {Object} options _(Optional)_ Specifies the details required by the tile. Each item is an object containing the following fields:
* * **title**: Text to be displayed as title.`
* * **icon**: SVG icon to be displayed on the tile.
* * **callback**: Function to be executed on clicking the tile.
* * **height**: Height of the tile. Default is `150px`
* * **width**: Width of the tile. Default is `150px`
*
*
* @example
* In a view template, the **sitHomeTile** directive is used as follows:
*
* ```
*      <sit-home-tile options="tile"></sit-home-tile>
* ```
*
*/
    'use strict';

    function HomeTileController() {

        this.$onInit = function () {
            init(this);
        }

        function init(vm) {
            if (vm.options && typeof vm.options.icon === 'string') {
                vm.isSvgIcon = false;
            } else {
                vm.isSvgIcon = true;
            }
        }
    }

    angular
        .module('siemens.simaticit.common.widgets.homeTile', [])
        .controller('HomeTileController', [HomeTileController])
        .component('sitHomeTile', {
            templateUrl: 'common/widgets/homeTile/sit-home-tile.html',
            controller: 'HomeTileController',
            controllerAs: 'homeTileCtrl',
            bindings: {
                options: "=?"
            }
        });
})();

