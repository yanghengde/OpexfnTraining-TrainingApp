/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.components.buttonBox
    *
    * @description
    * This module provides buttonBox component.
    */
    angular.module('siemens.simaticit.common.components.buttonBox', []);

    function ButtonBoxController($scope, $rootScope) {
        var vm = this;
        vm.hideNextTask = false;
        vm.hidePrevTask = false;
        vm.taskList = [];
        vm.task = null;
        vm.name = "buttonBox";
        $scope.prevTaskCallback = function () {
            if (vm.hideNextTask) {
                vm.hideNextTask = false;
            }

            //$rootScope.$broadcast("buttonBox." + $scope.name + ".uy-previousItem");
            $rootScope.$broadcast("buttonBox." + vm.name + ".uy-itemchange", { item: -1 });
        };

        $scope.okCallback = function () {
            var data = { action: "OK" };
            $rootScope.$broadcast("buttonBox." + vm.name + ".uy-actionDone", data);
        };

        $scope.notOkCallBack = function () {
            var data = { action: "NOK" };
            $rootScope.$broadcast("buttonBox." + vm.name + ".uy-actionDone", data);
        };

        $scope.NACallBack = function () {
            var data = { action: "NA" };
            $rootScope.$broadcast("buttonBox." + vm.name + ".uy-actionDone", data);
        };

        $scope.detailsCallBack = function () {
            var data = { action: "details" };
            $rootScope.$broadcast("buttonBox." + vm.name + ".uy-actionDone", data);
        };

        $scope.nextTaskCallback = function () {
            if (vm.hidePrevTask) {
                vm.hidePrevTask = false;
            }
            //$rootScope.$broadcast("buttonBox." + $scope.name + ".uy-nextItem");
            $rootScope.$broadcast("buttonBox." + vm.name + ".uy-itemchange", { item: 1 });
        };

        vm.configureButtonBox = function (currentIndex, lastIndex) {
            //console.log("Configure buttonbox called with arguments currentIndex:" + currentIndex + " lastIndex: " + lastIndex);
            if (!(currentIndex === 0 && lastIndex === 0)) {
                if (currentIndex === 0) {
                    vm.hidePrevTask = true;
                }
                else if (currentIndex === lastIndex) {
                    vm.hideNextTask = true;
                }
            }
            else {
                vm.hideNextTask = true;
                vm.hidePrevTask = true;
            }
            return "Configured";
        };


    }
    function ButtonBox() {
        return {
            restrict: 'E',
            templateUrl: 'common/components/buttonBox/buttonbox-dev-tpl.html',
            controller: ["$scope", "$rootScope", ButtonBoxController],
            controllerAs: 'buttonBoxCtr',
            scope:true,
            bindToController: {
                title: '=?',
                desc: '=?'
            }

        };
    }

    angular.module("siemens.simaticit.common.components.buttonBox")
        .directive("buttonBox", ButtonBox);

})();

