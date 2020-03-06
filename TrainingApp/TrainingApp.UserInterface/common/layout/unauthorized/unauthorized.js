/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    UnauthorizedController.$inject = ['$rootScope', 'CONFIG', 'common.services.swac.SwacUiModuleManager'];
    function UnauthorizedController($rootScope, CONFIG, swacManager) {
        var vm = this;
        activate();
        function activate() {
            //hide the sidebar in solution studio
            if (CONFIG.type === 'eng') {
                $rootScope.$state.current.data.sideBarIsHidden = true;
            }
            init();
        }

        function init() {
            // Added NOSONAR because in version 2.2 we suppress the vulnerability in according to project architect and the security expert of the product.
            // In detail the process was tracked by the TFS issue number 22519
            // In version 2.3 SonarQube all those issues that were marked before reappeared again.
            //Better, for a certain period the issues were listed as resolved and, at the same time, they were listed as new issues.
            // So a agreed solution with the team issue administrator is to mark them using an in-code approach.
            // You can find details on the attached email on the TFS issue number 22519
            vm.title = window.localStorage.getItem("unauthorizedTitle"); //NOSONAR
            vm.message = window.localStorage.getItem("unauthorizedMessage");

        }

    }

    angular.module('siemens.simaticit.common.services.layout')
        .controller('unauthorizedController', UnauthorizedController);
})();
