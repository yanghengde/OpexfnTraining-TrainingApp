/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    angular.module('siemens.simaticit.common').directive('sitFlymenu', getDirective);

    /*
    * {
        menuItems: [{
            id: '',
            title: '',
            icon: '',
            onClick: function(menuItem) {}
        }],
        onClick: function(menuItem){},
        id: '',
        icon: '',
        title: ''
    }
    */
    function getDirective() {
        return {
            restrict: 'EA',
            scope: true,
            bindToController: {
                options: '=sitFlymenu'
            },
            controller: DirectiveController,
            controllerAs: 'vm'
        };
    }

    DirectiveController.$inject = ['$element', '$scope', '$compile'];
    function DirectiveController($element, $scope, $compile) {
        var vm = this;

        activate();
        function activate() {
            init();
            initFlyMenu();
            subscribeEvents();

            exposeAPI();
        }

        function init() {
            vm.displayIcon = null;
            if (vm.options.svgIcon) {
                vm.displayIcon = {
                    path: vm.options.svgIcon,
                    size: '16px'
                };
            } else if (vm.options.cmdIcon) {
                vm.displayIcon = {
                    prefix: 'cmd',
                    name: vm.options.cmdIcon,
                    suffix: '24',
                    size:'16px'
                };
            }
            if (vm.options.menuItems) {
                for (var i = 0; i < vm.options.menuItems.length; i++) {
                    vm.options.menuItems[i].displayIcon = null;
                    if (vm.options.menuItems[i].svgIcon) {
                        vm.options.menuItems[i].displayIcon = {
                            path: vm.options.menuItems[i].svgIcon,
                            size: '16px'
                        };
                    } else if (vm.options.menuItems[i].cmdIcon) {
                        vm.options.menuItems[i].displayIcon = {
                            prefix: "cmd",
                            name: vm.options.menuItems[i].cmdIcon,
                            suffix: '24',
                            size: '16px'
                        };
                    }
                }
            }
        }

        function subscribeEvents() {
            $scope.$on('$destroy', function () {
                destroyFlyMenu();
            });
        }

        function exposeAPI() {
            vm.onMenuItemClick = onMenuItemClick;
        }

        function initFlyMenu() {
            var menuContent = '<div class="popover-content header-popover" ng-repeat="menuItem in vm.options.menuItems" id="{{menuItem.id}}"' +
                ' ng-click="vm.onMenuItemClick(menuItem)">' +
                '<span ng-if="menuItem.icon" class="{{menuItem.icon}}" sit-mom-icon="menuItem.displayIcon"' +
                ' ng-class="{momIcon: menuItem.displayIcon !== null }"></span>&nbsp;<span>{{menuItem.title|translate}}</span>' +
                '</div>';

            var menu = '<span id="{{vm.options.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                + '<i class="{{vm.options.icon}}" sit-mom-icon="vm.displayIcon" ng-class="{momIcon: vm.displayIcon !== null }"></i>&nbsp; {{vm.options.title}}</span>'
            + '<div class="header-color header-popover dropdown-menu" aria-labelledby="{{vm.options.id}}">' + menuContent + '</div>'

            $element.addClass('dropdown');
            $element.append($compile('' + menu + '')($scope));
        }

        function destroyFlyMenu() {
        }

        function onMenuItemClick(menuItem) {
            if (menuItem.onClick) {
                menuItem.onClick(menuItem);
                return;
            }
            if (!vm.options.onClick) {
                return;
            }
            vm.options.onClick(menuItem);
        }
    }
})();
