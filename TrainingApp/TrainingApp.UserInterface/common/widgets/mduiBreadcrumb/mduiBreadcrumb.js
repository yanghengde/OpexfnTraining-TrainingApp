/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.mduiBreadcrumb', ['ui.router.state']);
})();

(function () {
    'use strict';
    function sitMduiBreadcrumb($rootScope, $window, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            controller: breadcrumbController,
            controllerAs: 'ctrl',
            bindToController: { options: '=sitOptions' },
            templateUrl: 'common/widgets/mduiBreadcrumb/sit-mdui-breadcrumb.html',
            link: {
                post: function postLink(scope, element, attrs, ctrl) {
                    var FLYOUT_TOP_PADDING = 28;
                    var DROPDOWN_LEFT_PADDING = 1;
                    var FLYOUT_LEFT = '14px';

                    //method to show flyout
                    function showFlyoutMenu() {
                        var top, left, marginLeft;
                        var dots = $('li span[data-internal-type="mdui-breadcrumb-ellipsis"]', element);
                        ctrl.setFlyoutType();
                        ctrl.setFlyoutVisibility(true);
                        var containerLeft = $(element).offset().left;
                        if (ctrl.isDropdown()) {
                            top = (dots.offset().top + FLYOUT_TOP_PADDING) + 'px';
                            left = (dots.offset().left + DROPDOWN_LEFT_PADDING) + 'px';
                            marginLeft = 0;
                            ctrl.setFlyoutStyles(top, left, marginLeft);
                        }
                        else {
                            top = (dots.offset().top + FLYOUT_TOP_PADDING) + 'px';
                            left = FLYOUT_LEFT;
                            marginLeft = containerLeft + 'px';
                            ctrl.setFlyoutStyles(top, left, marginLeft);
                        }
                    }

                    //method to hide flyout menu
                    function hideFlyoutMenu() {
                        ctrl.setFlyoutVisibility(false);
                        var hiddenItems = $('li span[data-internal-type="breadcrumb-ellipsis"]', element);
                        if (hiddenItems.length > 0) {
                            hiddenItems.css({ 'border': 'none' });
                        }
                    }

                    //callback function for window resize event
                    function WindowResizeCallBack() {
                        ctrl.draw();
                        scope.$apply();
                    }

                    //callback method for document click event
                    function documentClickCallback(event) {
                        $timeout(function () {
                            if (!(event.target.classList && event.target.classList.contains('mdui-breadcrumb-ellipsis'))) {
                                hideFlyoutMenu();
                                scope.$apply();
                            } else {
                                showFlyoutMenu();
                                scope.$apply();
                            }
                        });
                    }

                    //callback for view content changed(state change)
                    function reDrawBreadcrumb() {
                        ctrl.draw();
                    }

                    $window.addEventListener("resize", WindowResizeCallBack);

                    $($window.document).on("click", documentClickCallback);

                    var contentLoadHandle = $rootScope.$on('$viewContentLoaded', reDrawBreadcrumb);

                    var chainUpdatedHandle = $rootScope.$on('mduiBreadcrumbService.chainUpdated', reDrawBreadcrumb);

                    scope.$on('$destroy', function () {
                        $window.removeEventListener("resize", WindowResizeCallBack);
                        $($window.document).off("click", documentClickCallback);
                        contentLoadHandle();
                        chainUpdatedHandle();
                    });
                }
            }
        };

    }


    function breadcrumbController($interpolate, breadcrumbService, $filter) {
        var vm = this;
        vm.draw = draw;
        vm.setFlyoutType = setFlyoutType;
        vm.setFlyoutVisibility = setFlyoutVisibility;
        vm.setFlyoutStyles = setFlyoutStyles;
        vm.isDropdown = isDropdown;

        var EXTRA_SMALL_PADDING = 56;
        var SMALL_PADDING = 56;
        var MEDIUM_PADDING = 248;
        var LARGE_PADDING = 248;
        var EXTRA_SMALL_MAXWIDTH = 768;
        var SMALL_MAXWIDTH = 992;
        var MEDIUM_MAXWIDTH = 1200;
        var AVAILABLE_WIDTH_PADDING = 15;

        var breadcrumbstring = '';
        var availableWidth = 0;

        //method that draws/redraws the breadcrumb
        function draw() {
            vm.trails = breadcrumbService.getBreadcrumbChain();
            initialize();
            var breadCrumbTitles = [];
            if (vm.trails.length === 0) {
                return;
            }
            vm.breadcrumbLastItemWidth = getTextWidth('<ol class="breadcrumb"><li>...</li>' + '<li>' + vm.trails[(vm.trails.length) - 1].title + '</li></ol>');
            for (var i = 0;i < vm.trails.length - 1; i++) {
                breadCrumbTitles[breadCrumbTitles.length] = '<li>' + vm.trails[i].title + '</li>';
            }
            breadCrumbTitles[breadCrumbTitles.length] = '<li><span style="font-weight:bold;">' + vm.trails[i].title + '</span></li>';
            breadcrumbstring = '<ol class="breadcrumb">' + breadCrumbTitles.join('') + '</ol>';

            setBreadcrumbStringWidth();
            setContainerDivWidth();
            setAvailableWidth();
            setBreadCrumbType();
            if (vm.breadcrumbType === 'HideMiddle') {
                setHideMiddleValues();
            }
            else if (vm.breadcrumbType === 'ShowOnlyLast') {
                setShowOnlyLastValues();
            }
        }

        //method to set flyout type
        function setFlyoutType() {
            vm.showAsDropDown = false;
            var hiddenTitles = [];
            for (var i = 0; i < vm.tobeHidden.length; i++) {
                hiddenTitles.push(vm.tobeHidden[i].title);
            }
            var tobeHiddenString = hiddenTitles.join(' > ');
            if (availableWidth < getTextWidth(tobeHiddenString)) {
                vm.showAsDropDown = true;
            }

        }
        //method to show/hide the flyout
        function setFlyoutVisibility(visibility) {
            vm.showFlyout = visibility;
        }
        //method to set styles for the flyout
        function setFlyoutStyles(top, left, marginLeft) {
            vm.flyoutTop = top;
            vm.flyoutLeft = left;
            vm.flyoutMarginLeft = marginLeft;
            for (var i = 0; i < vm.tobeHidden.length; i++) {
                vm.tobeHidden[i].toolTip = vm.tobeHidden[i].title;
            }
        }

        //method that returns true if flyout type is dropdown, false otherwise
        function isDropdown() {
            return vm.showAsDropDown;
        }

        //method that decides which items are to be shown and hidden for breadcrumbtype=HideMiddle
        function setHideMiddleValues() {
            vm.tobeShown[vm.tobeShown.length] = vm.trails[0];
            vm.tobeShown[vm.tobeShown.length] = { data: { title: '...' }, name: 'show', title: '...', url: '', sitBreadcrumbLink: '' };
            vm.tobeShown[vm.tobeShown.length] = vm.trails[(vm.trails.length) - 1];
            vm.tobeHidden = vm.trails.slice(1, ((vm.trails.length) - 1));
        }
        //method that decides which items are to be shown and hidden for breadcrumbtype=ShowOnlyLast
        function setShowOnlyLastValues() {
            vm.tobeShown[vm.tobeShown.length] = { data: { title: '...' }, name: 'show', title: '...', url: '', sitBreadcrumbLink: '' };
            vm.tobeShown[vm.tobeShown.length] = vm.trails[(vm.trails.length) - 1];
            vm.tobeHidden = vm.trails.slice(0, ((vm.trails.length) - 1));
            vm.toolTipforLastItem = vm.tobeShown[1].title;
            if ((availableWidth > 0) && (vm.breadcrumbLastItemWidth + 30 > availableWidth) && (vm.tobeShown[1].title.length >= 10)) {
                vm.tobeShown[1].title = vm.tobeShown[1].title.substring(0, getNumberOfCharactersToshow(availableWidth)) + '...';
            }
        }

        function onClick(item) {
            if (vm.options && typeof (vm.options.onClick === 'function')) {
                vm.options.onClick(item);
            }
        }

        function initialize() {
            vm.tobeShown = [];
            vm.tobeHidden = [];
            vm.breadcrumbType = 'Complete';
            breadcrumbstring = '';
            vm.showAsDropDown = false;
            vm.showFlyout = false;
            availableWidth = 0;
            vm.onClick = onClick;
        }

        //method that determines how many characters are to be shown based on available width
        function getNumberOfCharactersToshow(availableWidth) {
            var widthOfOnechar = 14;
            return Math.floor(availableWidth / widthOfOnechar);
        }

        //FIX:DOM Manipulation in controller should be avoided
        //method to calculate number of pixels needed
        function getTextWidth(characters) {
            var myDiv = $('<div></div>').css({
                'font-family': '"Segoe UI", "Arial", "serif"',
                'font-size': '11pt',
                'display': 'inline-block'
            }).appendTo($('div[data-internal-type="mduiBreadcrumbContainerDiv"]'));
            myDiv.html(characters);
            var width = myDiv.width();
            myDiv.remove();
            return width;
        }

        //FIX:DOM Manipulation in controller should be avoided
        //method to set breadcrumb container width
        function setContainerDivWidth() {
            vm.containerDivWidth = $('div[data-internal-type="mduiBreadcrumbContainerDiv"]').outerWidth();
        }

        //method to get breadcrumb unavailablewidth
        function getUnavailableWidth() {
            if (vm.containerDivWidth < EXTRA_SMALL_MAXWIDTH) {
                return EXTRA_SMALL_PADDING;
            }
            else if (vm.containerDivWidth >= EXTRA_SMALL_MAXWIDTH && vm.containerDivWidth < SMALL_MAXWIDTH) {
                return SMALL_PADDING;
            }
            else if (vm.containerDivWidth >= SMALL_MAXWIDTH && vm.containerDivWidth < MEDIUM_MAXWIDTH) {
                return MEDIUM_PADDING;
            }
            return LARGE_PADDING;
        }

        //method to set breadcrumb available width
        function setAvailableWidth() {
            availableWidth = vm.containerDivWidth - getUnavailableWidth() - AVAILABLE_WIDTH_PADDING;
        }

        //method to set breadcrumb string width
        function setBreadcrumbStringWidth() {
            vm.breadcrumbStringWidth = getTextWidth(breadcrumbstring);
        }

        //method to set breadcrumb type
        function setBreadCrumbType() {
            vm.widthOfThreeItems = getTextWidth('<ol class="breadcrumb"><li>' + vm.trails[0].title + '</li>' +
                '<li>...</li>' +
                '<li><span style="font-weight:bold;">' +
                vm.trails[(vm.trails.length) - 1].title +
                '</span></li></ol>');
            if (availableWidth > 0) {
                if (availableWidth > vm.breadcrumbStringWidth || vm.trails.length === 1) {
                    if ((vm.trails.length === 1) && (availableWidth < getTextWidth(vm.trails[0].title))) {
                        vm.trails[0].title = vm.trails[0].title.substring(0, getNumberOfCharactersToshow(availableWidth)) + '...';
                    }
                    vm.breadcrumbType = 'Complete';
                }
                else if (availableWidth > vm.widthOfThreeItems) {
                    vm.breadcrumbType = 'HideMiddle';
                } else {
                    vm.breadcrumbType = 'ShowOnlyLast';
                }
            }
        }

        function activate() {
            vm.draw();
        }

        activate();

    }

    breadcrumbController.$inject = ['$interpolate', 'common.mduiBreadcrumb.breadcrumbService', '$filter'];

    angular.module('siemens.simaticit.common.widgets.mduiBreadcrumb').
        directive('sitMduiBreadcrumb', ['$rootScope', '$window', '$timeout', sitMduiBreadcrumb]);
})();

(function () {
    'use strict';

    function breadcrumbService($rootScope) {
        var chain = [];

        this.setBreadcrumbChain = function (breadcrumbChain) {
            chain = [];
            if (breadcrumbChain && breadcrumbChain.length > 0) {
                chain = breadcrumbChain;
            }
            $rootScope.$broadcast('mduiBreadcrumbService.chainUpdated');
        }

        this.getBreadcrumbChain = function () {
            return chain || [];
        };

    }


    breadcrumbService.$inject = ['$rootScope'];

    angular.module('siemens.simaticit.common.widgets.mduiBreadcrumb').service('common.mduiBreadcrumb.breadcrumbService', breadcrumbService);
})();
