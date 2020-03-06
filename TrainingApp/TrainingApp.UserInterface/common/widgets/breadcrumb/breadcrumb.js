/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.breadcrumb
    *
    * @description
    * Provides functionalities related to the breadcrumb widget.
  */
    angular.module('siemens.simaticit.common.widgets.breadcrumb', ['ui.router.state']);
})();

(function () {
    'use strict';
    function sitBreadcrumb($rootScope, $window, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            controller: breadcrumbController,
            controllerAs: 'ctrl',
            templateUrl: 'common/widgets/breadcrumb/breadcrumb.html',
            link: {
                post: function postLink(scope, element, attrs, ctrl) {
                    var FLYOUT_TOP_PADDING = 28;
                    var DROPDOWN_LEFT_PADDING = 1;
                    var FLYOUT_LEFT = '14px';

                    //method to show flyout
                    function showFlyoutMenu() {
                        var top, left, marginLeft;
                        var dots = $('li span[data-internal-type="breadcrumb-ellipsis"]', element);
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
                        if (hiddenItems) {
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
                            if (!(event.target.classList && event.target.classList.contains('breadcrumbEllipsis'))) {
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

                    $rootScope.$on('breadcrumbService.stateTitleChanged', reDrawBreadcrumb);

                    scope.$on('$destroy', function () {
                        $window.removeEventListener("resize", WindowResizeCallBack);
                        $($window.document).off("click", documentClickCallback);
                        contentLoadHandle();
                    });
                    $rootScope.$on('common.services.globalization.globalizationService.setLanguage', function () {
                        ctrl.draw();
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
            vm.trails = breadcrumbService.getStatesChain();
            initialize();
            var breadCrumbTitles = [];
            var i = 0;

            if (vm.trails.length === 0) {
                return;
            }
            angular.forEach(vm.trails, function (trail) {
                var stateTitle = breadcrumbService.getStateTitle(trail.name);
                if (stateTitle !== undefined) {
                    trail.title = breadcrumbService.getStateTitle(trail.name);
                }
                else {
                    trail.title = (trail.data && trail.data.title) ? $filter('translate')(trail.data.title) : trail.name;
                }
            });

            vm.breadcrumbLastItemWidth = getTextWidth('<ol class="breadcrumb"><li>...</li>' + '<li>' + vm.trails[(vm.trails.length) - 1].title + '</li></ol>');
            for (i = 0; i < vm.trails.length - 1; i++) {
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
                hiddenTitles.push(vm.tobeHidden[i].data.title);
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
                vm.tobeHidden[i].toolTip = vm.tobeHidden[i].data.title;
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

        function initialize() {
            vm.tobeShown = [];
            vm.tobeHidden = [];
            vm.breadcrumbType = 'Complete';
            breadcrumbstring = '';
            vm.showAsDropDown = false;
            vm.showFlyout = false;
            availableWidth = 0;
        }

        //method that determines how many characters are to be shown based on available width
        function getNumberOfCharactersToshow(availableWidth) {
            var widthOfOnechar = 14;
            var numOfCharacters = Math.floor(availableWidth / widthOfOnechar);
            return numOfCharacters;
        }

        //FIX:DOM Manipulation in controller should be avoided
        //method to calculate number of pixels needed
        function getTextWidth(characters) {
            var myDiv = $('<div></div>').css({
                'font-family': '"Segoe UI", "Arial", "serif"',
                'font-size': '11pt',
                'display': 'inline-block'
            }).appendTo($('div[data-internal-type="breadcrumbContainerDiv"]'));
            myDiv.html(characters);
            var width = myDiv.width();
            myDiv.remove();
            return width;
        }

        //FIX:DOM Manipulation in controller should be avoided
        //method to set breadcrumb container width
        function setContainerDivWidth() {
            vm.containerDivWidth = $('div[data-internal-type="breadcrumbContainerDiv"]').outerWidth();
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

    breadcrumbController.$inject = ['$interpolate', 'common.breadcrumb.breadcrumbService', '$filter'];

    /**
     *   @ngdoc directive
     *   @access internal
     *   @name sitBreadcrumb
     *   @module siemens.simaticit.common.widgets.breadcrumb
     *   @restrict E
     *   @description
     *   Breadcrumb bar provides links or trails to previous pages navigated by the user in a hierarchical site structure.
     *   This helps the user to follow back to the starting or entry point.
     *   The breadcrumb can be displayed in following modes:
     *
     *   * **Normal mode:** If the breadcrumb content can fit within the space available for the breadcrumb, the entire breadcrumb will be shown with all the states.
     *   * **Minimized mode:** If the available space for the breadcrumb cannot contain the entire breadcrumb, first item and last item in the breadcrumb is shown.
     *   An ellipsis (...) shown between two items indicates that the other items are available.
     *   When the user clicks on the ellipsis,all the hidden items are shown in an overlay fashion using a flyout (a new breadcrumb below the original breadcrumb).
     *      If the available space in the flyout cannot display all the items, a flyout menu is used to show the remaining items.
     *   * **Compact mode:** If the space available is not enough to contain first item, last item, and the ellipsis, then ellipsis and the last item are shown.
     *   A flyout menu with remaining items are shown when user clicks on the ellipsis.
     *  @usage
     *   As element:
     *   ```
     *   <sit-breadcrumb></sit-breadcrumb>
     *   ```
     *
     *   This widget uses **ui-router** of **AngularUI** to maintain parent-child relationship between the breadcrumb states. The
     *   different states of **ui-router** are used to configure the breadcrumb states. Each breadcrumb state can be configured by specifying the name of state,
     *   template or templateUri, controller for state (if any), url, views and custom data (custom data contains the title of state) as shown in example below.
     *   If the available space is not sufficient, the ellipsis and last item is shown. When clicked on ellipsis, a flyout menu displays the hidden items.
     *
     *
     * @example
     *   In a view template, the `sit-breadcrumb` directive is used as follows:
     *   ```
     *   <sit-breadcrumb></sit-breadcrumb>
     *   ```
     *
     *   The following example shows how to configure the **ui-router** states to generate the breadcrumb.
     *
     *   ```
     *   // ...
     *   angular.module('sit-breadcrumb-demo')
     *   .config(function ($stateProvider, $urlRouterProvider) {
     *       $stateProvider
     *         .state('home', {
     *             url: '/home',
     *             views: {
     *                 '@': {
     *                     templateUrl: 'breadcrumb-dev-home-template.html',
     *                 }
     *             },
     *             data: {
     *                 title: 'breadcrumbDev.home-title',
     *                    }
     *         })
     *         .state('mashupEditor', {
     *             url: '/MashupEditor',
     *             views: {
     *                 '@': {
     *                     templateUrl: 'breadcrumb-dev-mashup-template.html'
     *                 }
     *             },
     *             data: {
     *                 title: 'breadcrumbDev.mashup-home-title'
     *               }
     *         })
     *         .state('mashupEditor.views', {
     *             url: '/Views',
     *             views: {
     *                 '@': {
     *                     templateUrl: 'breadcrumb-dev-viewlist-template.html',
     *                     controller: 'ViewDetailCtrl'
     *                 }
     *             },
     *             data: {
     *
     *             }
     *         })
     *
     *       $urlRouterProvider.otherwise('/home');
     *   });
     * ```
     * The state titles used in above example are the keys in resource translations,
     * Breadcrumb reads all these titles and translates according to current language.
     *
     * The following example shows how to define the **title** to states in resource json.
     *
     * ```
     * "breadcrumbDev": {
     *      "home-title": "Home",
     *      "mashup-home-title": "Mashup Home"
     * }
     * ```
     * **Note:** If the translations are not specified in resource json file, then breadcrumb shows hard coded strings instead of translation.
     *
     * In the above example, the breadcrumb contains three states,
     * * **'home'**
     * * **'mashupEditor'**
     * * **'mashupEditor.views'**
     *
     *
     * **mashupEditor.views** is the child state of **mashupEditor**. The naming convention shown in this example should be used to specify the parent-child relationship
     * between the states (if state **B** is the child of state **A**, we need to name it as **A.B**).
     *
     * Consider the state 'mashupEditor.views'. The following properties are set as shown below:
     *   * **url**: contains part of the url associated with the current state.
     *
     *   * **views**: contains view information for the current state. A views object may contain the following properties.
     *     * templateUrl: this file contains template of the current state. In the above example, the **mashupEditor.views** state contains **ViewDetailCtrl** controller.
     *     * controller: _(Optional)_ contains controller associated with the current state.
     *   * **data**: specifies the custom data associated with the current state.
     *   The **ViewDetailCtrl** controller of **mashupEditor.views** state contains the title of the current state that appears when the breadcrumb is displayed.
     *       However, if the title for a state is not specified, the corresponding state's name is shown in the breadcrumb.
     * If the user starts from a page represented by **mashupEditor** state and traverses to a page represented by the **mashupEditor.views** state,
     * the breadcrumb appears as follows:
     * Mashup Home  >  mashupEditor.views
     *
     *
     * **Note:** The second item in the breadcrumb shows the name of the state (**mashupEditor.views**) because the title for the corresponding state is not
     * specified explicitly in the **data** property.
     *
     * @example
     *   The following example shows how to determine breadcrumb state titles dynamically.
     *   ```
     * angular.module('sit-breadcrumb-demo')
     * .config(function ($stateProvider, $urlRouterProvider) {
     *     $stateProvider
     *     .state('breadCrumbTest.views.detail', {
     *       url: '/{ViewName}',
     *       views: {
     *           'Canvas@': {
     *               templateUrl: 'common/examples/breadcrumb/breadcrumb-dev-viewdetail-template.html',
     *               controller: 'ViewDetailCtrl'
     *           }
     *       },
     *      resolve:{
     *           setTitleDemo:['$stateParams','common.breadcrumb.breadcrumbService',function($stateParams,breadcrumbService){
     *               breadcrumbService.setStateTitle('breadCrumbTest.views.detail','View - ' + $stateParams.ViewName);
     *       }]
     *       }
     *   })
     * });
     * ```
     * In the above example the breadcrumb title for the **breadCrumbTest.views.detail** state is dynamically set
     * by using the setTitle method of the breadcrumb service(common.breadcrumb.breadcrumbService).
     * The steps to set the dynamic breadcrumb title for a state are as follows:
     * 1.Inject the common.breadcrumb.breadcrumbService service to the resolve section of the state.
     * 2.Get the state’s dynamic title via promise/service method.
     * 3.Use setStateTitle method of breadcrumb service to set the state’s dynamic title.
     */
    angular.module('siemens.simaticit.common.widgets.breadcrumb').
        directive('sitBreadcrumb', ['$rootScope', '$window', '$timeout', sitBreadcrumb]);
})();

(function () {
    'use strict';

    function breadcrumbService($state, $stateParams, $rootScope) {
        var PARENT_STATE_REGEX = /^(.+)\.[^.]+$/; //NOSONAR
        var lastViewScope = $rootScope;
        var stateTitles = {};

        //Note: The following method is not being used by the directive
        function isScopeOneOlder(scopeOne, scopeTwo) {
            if (angular.equals(scopeOne.length, scopeTwo.length)) {
                return scopeOne > scopeTwo;
            }
            return scopeOne.length > scopeTwo.length;
        }

        $rootScope.$on('$viewContentLoaded', function (event) {
            if (isScopeOneOlder(event.targetScope.$id, lastViewScope.$id)) {
                lastViewScope = event.targetScope;
            }
        });


        function parentState(state) {
            var name = state.parent || (PARENT_STATE_REGEX.exec(state.name) || [])[1];
            return name && $state.get(name);
        }

        function addStateInChain(chain, state) {
            if (!state.abstract) {
                state.sitBreadcrumbLink = $state.href(state.name, $stateParams || {});
                chain.unshift(state);
            }
        }

        function breadcrumbParentState(state) {
            return parentState(state);
        }

        /**
          * @name common.breadcrumb.breadcrumbService#breadcrumbService#getStatesChain
          * @description Returns an array that contains all the states present in the breadcrumb.
          * @returns {array} Chain of states
          */
        this.getStatesChain = function () {
            var chain = [];
            for (var state = $state.$current.self; state && state.name !== ''; state = breadcrumbParentState(state)) {

                if (!state.hasOwnProperty('data')) {
                    state.data = {};
                }

                //set state title to state name if data is empty.
                var parent = parentState(state);
                if (parent && parent.data && (state.data.title === parent.data.title)) {
                    continue;
                }
                else {
                    addStateInChain(chain, state);
                }
            }
            return chain;
        };

        //Note: The following method is not being used by the directive
        /**
         * @name common.breadcrumb.breadcrumbService#getLastViewScope
         * @description This method returns the viewscope to be used for drawing the breadcrumb.
         * @returns {object} Last view scope
        */
        this.getLastViewScope = function () {
            return lastViewScope;
        };

        /**
        * @ngdoc method
        * @name common.breadcrumb.breadcrumbService#setStateTitle
        * @param {string} state The name of a valid State.
        * @param {string} title The title of the State.
        * @description Sets the title of the specified State.
        */
        this.setStateTitle = function (state, title) {
            if (title !== stateTitles[state]) {
                stateTitles[state] = title;
                $rootScope.$broadcast('breadcrumbService.stateTitleChanged');
            }
        };

        this.getStateTitle = function (state) {
            return stateTitles[state];
        };

    }


    breadcrumbService.$inject = ['$state', '$stateParams', '$rootScope'];

    angular.module('siemens.simaticit.common.widgets.breadcrumb').service('common.breadcrumb.breadcrumbService', breadcrumbService);
    /**
        * @ngdoc service
        * @name common.breadcrumb.breadcrumbService
        * @module siemens.simaticit.common.widgets.breadcrumb
        *
        * @description
        * Exposes methods used to manage the breadcrumb widget.
        *
        */
})();
