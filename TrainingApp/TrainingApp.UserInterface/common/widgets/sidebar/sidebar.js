/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';
    /**
  * @ngdoc module
  * @access internal
  * @name siemens.simaticit.common.widgets.sidebar
  * @description Contains functionality responsible to display a sidebar with navigation buttons. The sidebar can be configured to set various navigation button items.
  *              In sidebar navigation window, when a button is clicked, a submenu appears with the navigation buttons.
  *             **Note:** Sidebars can be collapsable or expandable.
  */
    angular.module('siemens.simaticit.common.widgets.sidebar', [function () {
        //any dependencies?
    }]);

})();





'use strict';
var siemens;
(function (siemens) {
    var simaticit;
    (function (simaticit) {
        var common;
        (function (common) {
            var widgets;
            (function (widgets) {
                var scroll;
                (function (scroll) {
                    /**
                    *  @ngdoc service
                    *  @access internal
                    *  @name common.scroll.scrollDOMService
                    *  @module siemens.simaticit.common.widgets.sidebar
                    *  @description Service API to perform browser common DOM operations in the scroll.
                    *
                    */
                    var ScrollDOMService = /** @class */ (function () {
                        function ScrollDOMService($document, $log) {
                            this.$document = $document;
                            this.$log = $log;
                            this.status = false;
                            if (jQuery === undefined) {
                                $log.error('jQuery not available');
                            }
                        }
                        ScrollDOMService.prototype.getSelectors = function () {
                            this.domElements = {
                                scroll: '.sitscroll',
                                buttons: {
                                    up: 'up',
                                    down: 'down'
                                },
                                body: 'div[ng-transclude]'
                            };
                        };
                        ScrollDOMService.prototype.scrollItems = function (element, scrollValue) {
                            var target = $(element).siblings(this.domElements.body);
                            target.scrollTop(target.scrollTop() + scrollValue);
                        };
                        ScrollDOMService.prototype.scrollElement = function (e) {
                            var $this = $(e.currentTarget);
                            if ($this.hasClass(this.domElements.buttons.up)) {
                                this.scrollItems($this, -48);
                            }
                            else if ($this.hasClass(this.domElements.buttons.down)) {
                                this.scrollItems($this, 48);
                            }
                            e.preventDefault();
                            e.stopPropagation();
                        };
                        /**
                        * @ngdoc method
                        * @access internal
                        * @name common.scroll.scrollDOMService#init
                        * @module siemens.simaticit.common.widgets.sidebar
                        *
                        * @description Initializes the scroll DOM service .
                        *
                        * @returns {void}
                        *
                        */
                        ScrollDOMService.prototype.init = function () {
                            if (!this.status) {
                                this.getSelectors();
                                this.bind();
                            }
                        };
                        /**
                        * @ngdoc method
                        * @access internal
                        * @name common.scroll.scrollDOMService#bind
                        * @module siemens.simaticit.common.widgets.sidebar
                        *
                        * @description Bind events to the document.
                        *
                        * @returns {void}
                        *
                        */
                        ScrollDOMService.prototype.bind = function () {
                            $(this.$document)
                                .on('click.sitscroll.data-api', this.domElements.scroll, $.proxy(this.scrollElement, this));
                            this.status = true;
                        };
                        /**
                        * @ngdoc method
                        * @access internal
                        * @name common.scroll.scrollDOMService#unbind
                        * @module siemens.simaticit.common.widgets.sidebar
                        *
                        * @description Unbind events from the document.
                        *
                        * @returns {void}
                        *
                        */
                        ScrollDOMService.prototype.unbind = function () {
                            $(this.$document)
                                .off('click.sitscroll.data-api', this.domElements.scroll, $.proxy(this.scrollElement, this));
                            this.status = false;
                        };
                        ScrollDOMService.$inject = ['$document', '$log'];
                        return ScrollDOMService;
                    }());
                    scroll.ScrollDOMService = ScrollDOMService;
                    angular.module('siemens.simaticit.common.widgets.sidebar')
                        .service('common.scroll.scrollDOMService', ScrollDOMService);
                })(scroll = widgets.scroll || (widgets.scroll = {}));
            })(widgets = common.widgets || (common.widgets = {}));
        })(common = simaticit.common || (simaticit.common = {}));
    })(simaticit = siemens.simaticit || (siemens.simaticit = {}));
})(siemens || (siemens = {}));
//# sourceMappingURL=sit-dom-scroll-svc.js.map
'use strict';
var siemens;
(function (siemens) {
    var simaticit;
    (function (simaticit) {
        var common;
        (function (common) {
            var widgets;
            (function (widgets) {
                var sidebar;
                (function (sidebar) {
                    /**
                    *  @ngdoc service
                    *  @access internal
                    *  @name common.sidebar.sidebarDOMService
                    *  @module siemens.simaticit.common.widgets.sidebar
                    *  @description Service API to perform browser common DOM operations in the sidebar.
                    *
                    */
                    var SidebarDOMService = /** @class */ (function () {
                        function SidebarDOMService($log) {
                            this.$log = $log;
                            this.status = false;
                            if (jQuery === undefined) {
                                $log.error('jQuery not available');
                            }
                        }
                        SidebarDOMService.prototype.getSelectors = function () {
                            this.domElements = {
                                toggle: '[data-toggle="sidebar"]',
                                cssClass: {
                                    open: 'open',
                                    focus: 'focus',
                                    active: 'active',
                                    children: 'children',
                                    header: 'header'
                                },
                                attrs: {
                                    target: 'data-target',
                                    href: 'href'
                                },
                                children: '.children'
                            };
                        };
                        SidebarDOMService.prototype.clearMenus = function (e, siblings) {
                            var domElements = this.domElements;
                            if (e && e.which === 3) {
                                return;
                            }
                            var context = siblings || $(domElements.toggle);
                            context.each(function (index) {
                                var $this = $(context[index]);
                                if (!$this.hasClass(domElements.cssClass.open)) {
                                    return;
                                }
                                $this.removeClass(domElements.cssClass.open)
                                    .removeClass(domElements.cssClass.active);
                            });
                        };
                        SidebarDOMService.prototype.keydown = function (e) {
                            var REGX_ESC = /(27)/;
                            var REG_INPUT = /input|textarea/i;
                            if (!REGX_ESC.test(e.which) || REG_INPUT.test(e.target.tagName)) {
                                return undefined;
                            }
                            var $this = $(e.currentTarget);
                            e.preventDefault();
                            e.stopPropagation();
                            if (e.which === 27) {
                                return $this.trigger('click');
                            }
                        };
                        SidebarDOMService.prototype.toggle = function (e) {
                            var domElements = this.domElements;
                            var $this = $(e.currentTarget);
                            var $parent = $this.parents(domElements.toggle).length ? $this.parents(domElements.toggle) : $this.parent();
                            var isActive = $this.hasClass(domElements.cssClass.open);
                            var hasChildren = $this.children(domElements.children).length > 0;
                            if ($this.children().last().hasClass(domElements.cssClass.children) && $parent.hasClass(domElements.cssClass.open)) {
                                this.clearMenus(e, $this.siblings());
                            }
                            else if (!$parent.parent().hasClass(domElements.cssClass.header)) {
                                this.clearMenus(e);
                            }
                            if (!isActive) {
                                $this.trigger(domElements.cssClass.focus)
                                    .toggleClass(domElements.cssClass.open);
                                if (hasChildren) {
                                    $this.toggleClass(domElements.cssClass.active);
                                }
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            //FIX: Bug 33919
                            var evt = window.document.createEvent("Event");
                            evt.initEvent("window.click", true, false);
                            window.dispatchEvent(evt);
                        };
                        /**
                        * @ngdoc method
                        * @access internal
                        * @name common.sidebar.sidebarDOMService#init
                        * @module siemens.simaticit.common.widgets.sidebar
                        *
                        * @description Initializes the sidebar DOM service .
                        *
                        * @returns {void}
                        *
                        */
                        SidebarDOMService.prototype.init = function () {
                            if (!this.status) {
                                this.getSelectors();
                                this.bind();
                            }
                        };
                        /**
                        * @ngdoc method
                        * @access internal
                        * @name common.sidebar.sidebarDOMService#bind
                        * @module siemens.simaticit.common.widgets.sidebar
                        *
                        * @description Bind events to the document.
                        *
                        * @returns {void}
                        *
                        */
                        SidebarDOMService.prototype.bind = function () {
                            $(window.document)
                                .on('click.sidebar.data-api', $.proxy(this.clearMenus, this))
                                .on('click.sidebar.data-api', this.domElements.toggle, $.proxy(this.toggle, this))
                                .on('keydown.bs.sidebar.data-api', $.proxy(this.keydown, this));
                            this.status = true;
                        };
                        /**
                        * @ngdoc method
                        * @access internal
                        * @name common.sidebar.sidebarDOMService#unbind
                        * @module siemens.simaticit.common.widgets.sidebar
                        *
                        * @description Unbind events from the document.
                        *
                        * @returns {void}
                        *
                        */
                        SidebarDOMService.prototype.unbind = function () {
                            $(window.document)
                                .off('click.sidebar.data-api', $.proxy(this.clearMenus, this))
                                .off('click.sidebar.data-api', this.domElements.toggle, $.proxy(this.toggle, this))
                                .off('keydown.bs.sidebar.data-api', $.proxy(this.keydown, this));
                            this.status = false;
                        };
                        SidebarDOMService.$inject = ['$log'];
                        return SidebarDOMService;
                    }());
                    sidebar.SidebarDOMService = SidebarDOMService;
                    angular.module('siemens.simaticit.common.widgets.sidebar')
                        .service('common.sidebar.sidebarDOMService', SidebarDOMService);
                })(sidebar = widgets.sidebar || (widgets.sidebar = {}));
            })(widgets = common.widgets || (common.widgets = {}));
        })(common = simaticit.common || (simaticit.common = {}));
    })(simaticit = siemens.simaticit || (siemens.simaticit = {}));
})(siemens || (siemens = {}));
//# sourceMappingURL=sit-dom-sidebar-svc.js.map
"use strict";
//# sourceMappingURL=sit-dom-svc.js.map
(function () {
    'use strict';
    /**
    *  @ngdoc service
    *  @access internal
    *  @name common.recursionHelperService
    *  @module siemens.simaticit.common.widgets.sidebar
    *  @description Recursion helper service to perform recursion in the custom directives.
    *
    */

    function recursionHelperService($compile){
        return {

            /**
            * @ngdoc method
            * @access internal
            * @name common.recursionHelperService#compile
            * @module siemens.simaticit.common.widgets.sidebar
            *
            * @description A wrapper on the angular compile function to help custom directive recurstion.
            *
            * @param {object} element Element object.
            * @param {object} link Link object.
            *
            * @returns {bool} Object return `pre` and `post` objects
            *
            */
            compile: function (element, link) {

                // Normalize the link parameter
                if (angular.isFunction(link)) {
                    link = { post: link };
                }

                // Break the recursion loop by removing the contents
                var contents = element.contents().remove();
                var compiledContents;
                return {
                    pre: (link && link.pre) ? link.pre : null,

                    post: function (scope, element) {
                        // Compile the contents
                        if (!compiledContents) {
                            compiledContents = $compile(contents);
                        }
                        // Re-add the compiled contents to the element
                        compiledContents(scope, function (clone) {
                            element.append(clone);
                        });

                        // Call the post-linking function, if any
                        if (link && link.post) {
                            link.post.apply(null, arguments);
                        }
                    }
                };
            }
        };
    }

    angular.module('siemens.simaticit.common.widgets.sidebar')
        .factory('common.recursionHelperService', ['$compile', recursionHelperService]);
})();


(function () {
    'use strict';

    function sitScroll($rootScope, $window, $timeout) {
        var directive = {
            templateUrl: 'common/widgets/sidebar/scroll.html',
            replace: false,
            restrict: 'E',
            transclude: true,
            controllerAs: 'scrollCtrl',
            controller: ScrollController,
            scope: {},
            bindToController: {
                sitEnable: '@sitEnable',
                onReload: '@sitOnReload'
            },
            link: link
        };

        ScrollController.$inject = ['$scope', '$timeout', 'common.scroll.scrollDOMService'];

        function ScrollController($scope, $timeout, scrollDOMService) {
            var vm = this;

            activate();

            function init() {
                vm.display = true;
                vm.isEnabled = vm.sitEnable === 'true';
                vm.timeoutPromise = null;
            }

            function activate() {
                scrollDOMService.init();
                init();
                subscribeEvents();
            }

            function subscribeEvents() {
                $scope.$on('$destroy', function () {
                    scrollDOMService.unbind();
                    if (vm.timeoutPromise !== null) {
                        $timeout.cancel(vm.timeoutPromise);
                    }
                });
            }
        }

        function link(scope, elmnt, attrs, ctrl) {

            var domElements = {
                children: 'div[ng-transclude]'
            };

            activate();

            // Bug Fix 43073, 55823: This event will run the load method once DOM is rendered.
            var onStateChangeSuccess = $rootScope.$on('siemens.simaticit.common.stateChangeSuccess', stateChangeSuccess);

            function stateChangeSuccess(state, data) {
                if (data.fromState.name === 'home') {
                    load(elmnt, ctrl);
                    onStateChangeSuccess();
                }
            }

            function load(elmnt, ctrl) {
                ctrl.timeoutPromise = $timeout(function () {
                    var parent = $(elmnt).children(domElements.children);
                    var child = parent.children();
                    var parentHeight = parent.height();
                    var childrenHeight = child.height();
                    ctrl.display = childrenHeight > parentHeight ? true : false;
                });
            }

            function activate() {
                if (ctrl.isEnabled === true) {
                    load(elmnt, ctrl);
                }
                subscribeEvents();
            }

            function windowResize() {
                load(elmnt, ctrl);
            }

            function subscribeEvents() {
                angular.element($window).bind('resize', windowResize);

                if (ctrl.onReload && angular.isString(ctrl.onReload) && ctrl.onReload.length) {
                    var events = ctrl.onReload.trim().split(',');
                    for (var i = 0; i < events.length; i++) {
                        _reload(events[i]);
                    }
                }
            }

            function _reload(eventName) {
                $rootScope.$on(eventName, function broadcastSidebarInitilize() {
                    if (ctrl.isEnabled === true) {
                        load(elmnt, ctrl);
                    }
                });
            }

            scope.$on('$destroy', function () {
                angular.element($window).unbind('resize', windowResize);
            });
        }

        return directive;
    }

    angular.module('siemens.simaticit.common.widgets.sidebar').directive('sitScroll',
        ['$rootScope', '$window', '$timeout', sitScroll]);

})();



(function () {
    'use strict';

    //#region ng-doc comments
    /**
    *  @ngdoc directive
    *  @access internal
    *  @name uySidebarView
    *  @module siemens.unity.common.sidebar
    *  @restrict E
    *  @description
    *  **sidebar** is a list of navigation buttons that allows to add or configure the list of buttons to be displayed. Each button allows to perform an **OnClick** operation.
    *
    *  @usage
    *   As an element:
    *   ```
    *     <sit-sidebar></sit-sidebar>
    *   ```
    *
    *    @example
    *   In a view template, the `sit-sidebar` directive is used as follows:
    *
    * ```
    * <div class="sidebar-body">
    *                   <div style="height:calc({{ sidebar.header.length}} * 48px)">
    *                       <sit-sidebar-item sit-type="header"
    *                                         sit-source="sidebar.header"
    *                                         sit-actions="sidebar.actions">
    *                       </sit-sidebar-item>
    *                   </div>
    *                   <div style="height:calc({{ sidebar.activeItemsCount(sidebar.fixed)}} * 48px)">
    *                       <sit-sidebar-item sit-type="fixed"
    *                                         sit-source="sidebar.fixed"
    *                                         sit-selected="sidebar.selected">
    *                       </sit-sidebar-item>
    *                   </div>
    *                   <div style="display:block; height:calc(100% - 48px - ({{ sidebar.activeItemsCount(sidebar.fixed)}} * 48px) - ({{ sidebar.header.length}} * 48px))">
    *                       <sit-sidebar-item sit-source="sidebar.menu"
    *                                         sit-selected="sidebar.selected">
    *                       </sit-sidebar-item>
    *                   </div>
    *                   <div class="message" ng-if="sidebar.errorMessage" ng-bind="sidebar.errorMessage"></div>
    *               </div>
    *   ```
    *  The following example shows how to configure sidebar widget by exposing the `menu` property.
    * ```
    * // ...
            'menu': [[{
                "id": "open",
                "title": "open",
                "icon": "fa-eject",
                "action": {
                    "click": "toggle"
                }
            }], [{
                "id": "back",
                "title": "Back",
                "icon": "common\\icons\\cmdBack24.svg",
                "action": {
                    "click": "navigateBack"
                },
                "bind": {
                    "display": "hasBackNavigation"
                }
            }, {
                "id": "adminHome",
                "title": "Home page",
                "icon": "svg cmdHome24"
            }], [{
                'id': 'adminHome.projectHome',
                'title': 'Project Page',
                'icon': 'fa-briefcase'
            }, {
                'id': 'adminHome.projectHome.workerRoleMgt',
                'title': 'System Configuration',
                'icon': 'common/icons/cmdAdmin24.svg',
                'contents': [
                    {
                        'id': 'adminHome.projectHome.workerRoleMgt',
                        'title': 'Worker Role Management'
                    }, {
                        'id': 'adminHome.projectHome.eventSubscription',
                        'title': 'Event Subscription Management'
                    }
                ]
            }]
    *
    * ```
    *   A JSON object provides data to the **sidebar** from the **Config** file.
    *   We must define a **constant** with a name **CONFIG** within a **Config** file that contains the following properties:
    *  * **menu**: an array of navigation buttons that contains the following properties for each object item:
    *   * **id**: string identifier for each button item in the sidebar. This property is used as state transition url.
    *             Type: **string**
    *   * **title**: a button item name. It does not have to be unique.
    *              Type: **string**
    *   * **icon**: used to display an Icon for each of the button items. Value should be a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/)
    *   CSS class that determines the node icon or svg icon path/type to be displayed. If not specified, default Icon will be displayed.
    *               Type: **string**
    *   * **contents**: used if there are submenu items. This array contains the same properties of the menu except icon (id, title, and contents).
    *               Type: **Object[]**
    *   * **actions**: used to configure events. `click` is an event can be configured to the public methods in the `actions` object.
    *   `toggle`, `navigate`, `navigateBack` are the available methods to configure 'click' action.
    *               Type: **string**
    *   * **bind**: used to configure properties. `display` is a property can be configured to the public properties in the `options` object.
    *   'hasBackNavigation' is the available property to configure 'bind' property.
    *               Type: **string**
    *
    *
    * The syntax to expose a **home** property used to configure home button on sidebar widget is:
    *  ```
    * "home": "home",
    *  ```
    * In the above example, a sidebar contains the following items:
    * * ** ** 3 arrays of configuration items(header, fixed, static)
    * * ** **header items contains one item to expand and collapse the sidebar. This icon is always visible in the sidebar. On sidebar expand all the icon right aligned
    * * ** ** **`click` event is configured to the `toggle' method available in the sidebar
    *
    * * ** **fixed items contains two items. These icon displays text on sidebar expand. These icon always visible in the sidebar.
    * * ** ** **Back** first icon is back
    * * ** ** **`display` property is bound to the `hasbackNavigation' property available in the sidebar, whenever the `hasNavigateBack` values changes item visibility will change
    * * ** ** **`click` event is configured to the `navigateBack' method available in the sidebar
    * * ** ** **Home** second icon is home, by default `click` event is configured to `navigate' method in the sidebar
    *
    * * ** **static item contains four main menu (level 0) items with two submenu (level 1) on each. These item will get scoll buttons on overflow.
    *
    * The list of Events broadcasted for the users are as follows:
    * * **common.sidebar.sitSidebarItem.contents.clicked**: this event is raised when the sidebar navigation button icon is clicked which has sub menu.
    *
    *   **Usage**:
    *   ```
    *    scope.$on('common.sidebar.sitSidebarItem.contents.clicked', function (event, eventArgs) {
    *                   // User logic
    *              });
    *   ```
    *
    * The list of Errors handled are as follows:
    * * If Sidebar configuration is not provided : sidebar is deactivated and **No data available** error message is displayed.
    * * If Home State configuration is not provided : sidebar is deactivated and **Home Page not configured** error message is displayed.
    * * If the Navigation Buttons are not configured correctly : the incorrectly configured Navigation buttons are discarded.
    * **Note:** For all the errors, corresponding error message is logged in the console.
    *
  */
    //#endregion

    function sitSidebar() {
        var directive = {
            templateUrl: 'common/widgets/sidebar/sidebar.html',
            replace: false,
            controllerAs: 'sidebar',
            transclude: true,
            controller: SidebarController
        };

        SidebarController.$inject = ['$rootScope', '$scope', '$state', '$translate', '$log',
            'common.sidebar.sidebarDOMService', 'common.historyService', 'common.sidebar.sidebarService'];
        function SidebarController($rootScope, $scope, $state, $translate, $log,
            sidebarDOMService, historyService, sidebarService) {
            var vm = this;

            activate();

            function init() {
                vm.hide = false;
                vm.selected = $state.current.name;

                vm.options = {
                    isExpanded: false,
                    isVisible: true
                };

                vm.actions = {
                    toggle: _toggle,
                    expand: _expand,
                    collapse: _collapse
                };

                vm.activeItemsCount = _activeItemsCount;
                vm.calc = _calc;
            }

            function _translateSource() {
                sidebarService.reload();
                vm.source = sidebarService.getMenu();
                _.each(vm.source, function (childSource) {
                    _translateTitle(childSource);
                });
                if (vm.source === undefined) {
                    vm.errorMessage = $translate.instant('sidebar.error.configMissing');
                }
                else {
                    vm.header = vm.source && vm.source[0] || [];
                    vm.fixed = vm.source && vm.source[1] || [];
                    vm.menu = vm.source && vm.source[2] || [];
                }
            }

            function _translateTitle(source) {
                _.each(source, function (item) {
                    if (item.contents && item.contents.length > 0) {
                        _translateTitle(item.contents);
                    }
                    item.translatedTitle = $translate.instant(item.title);
                });
            }

            function load() {
                vm.source = sidebarService.getMenu();
                vm.environment = sidebarService.environment;
                if (vm.source === undefined) {
                    vm.errorMessage = $translate.instant('sidebar.error.configMissing');
                }
                else {
                    vm.header = vm.source && vm.source[0] || [];
                    vm.fixed = vm.source && vm.source[1] || [];
                    vm.menu = vm.source && vm.source[2] || [];
                }
            }

            function activate() {
                sidebarDOMService.init();
                init();
                load();
                subscribeEvents();
            }

            function subscribeEvents() {
                $scope.$watch(function () { return vm.reload; }, function () {
                    $rootScope.$broadcast('common.sidebar.sitSidebar.initilize');
                    historyService.reset();
                    load();
                });

                $scope.$on('common.sidebar.sidebarService.itemChanged', function sidebarItemChanged() {
                    load();
                });

                $scope.$on('common.historyService.historyChanged', function historyChanged() {
                    vm.selected = historyService.states[historyService.states.length - 1].name;
                });

                $rootScope.$on('common.services.globalization.globalizationService.setLanguage', function () {
                    _translateSource();
                });

                $scope.$on('$destroy', function () {
                    sidebarDOMService.unbind();
                });
            }

            function _toggle() {
                vm.options.isExpanded = !vm.options.isExpanded || false;
            }

            function _expand() {
                vm.options.isExpanded = true;
            }

            function _collapse() {
                vm.options.isExpanded = false;
            }

            function _activeItemsCount(list) {
                var newList = _.filter(list, function (item) {
                    return item.display === undefined || item.display === true;
                });
                if (newList) {
                    return newList.length;
                }
                return 0;
            }

            function _calc() {

                var result;
                var resultObject;
                var i;
                if (typeof (arguments[0]) === 'string') {
                    if (arguments.length % 2 === 0) {
                        $log.log('Error: improper arguments in the ng-style="sidebar.calc"');
                    }
                    for (i = 1; i < arguments.length; i++) {
                        if (result) {
                            result += (arguments[i++]) * (arguments[i]);
                        } else {
                            result = (arguments[i++]) * (arguments[i]);
                        }
                    }
                    resultObject = { height: 'calc(' + arguments[0] + ' - ' + result + 'px)' };

                } else {
                    if (arguments.length % 2 !== 0) {
                        $log.log('Error: improper arguments in the ng-style="sidebar.calc"');
                    }
                    for (i = 0; i < arguments.length; i++) {
                        if (result) {
                            result += (arguments[i++]) * (arguments[i]);
                        } else {
                            result = (arguments[i++]) * (arguments[i]);
                        }
                    }
                    resultObject = {
                        height: 'calc(' + result + 'px)'
                    };

                }
                return resultObject;
            }


        }
        return directive;
    }

    angular.module('siemens.simaticit.common.widgets.sidebar')
        .directive('sitSidebar', [sitSidebar]);



})();

'use strict';
var siemens;
(function (siemens) {
    var simaticit;
    (function (simaticit) {
        var common;
        (function (common) {
            var Events = /** @class */ (function () {
                function Events() {
                }
                Events.broadcast = {
                    itemchanged: 'common.historyService.historyChanged'
                };
                Events.subscribe = {
                    stateChangeSuccess: '$stateChangeSuccess'
                };
                return Events;
            }());
            common.Events = Events;
            var HistoryService = /** @class */ (function () {
                function HistoryService($window, $rootScope, $state) {
                    this.$window = $window;
                    this.$rootScope = $rootScope;
                    this.$state = $state;
                    this.activate(this);
                    this.states = [];
                    this.states.push($state.current);
                }
                HistoryService.prototype.activate = function (vm) {
                    this.$rootScope.$on(Events.subscribe.stateChangeSuccess, function (event, toState) {
                        if (vm.states.length > 1) {
                            if (vm.states[vm.states.length - 2].name === toState.name) {
                                vm.states.pop();
                            }
                            else {
                                vm.states.push(toState);
                            }
                        }
                        else {
                            vm.states.push(toState);
                        }
                        vm.$rootScope.$broadcast(Events.broadcast.itemchanged, vm.states);
                    });
                };
                HistoryService.prototype.back = function () {
                    this.$window.history.go(-1);
                };
                HistoryService.prototype.reset = function () {
                    this.states = [];
                    if (this.$state.current.name !== '') {
                        this.states.push(this.$state.current);
                        this.$rootScope.$broadcast(Events.broadcast.itemchanged, this.states);
                    }
                };
                HistoryService.$inject = ['$window', '$rootScope', '$state'];
                return HistoryService;
            }());
            common.HistoryService = HistoryService;
            angular.module('siemens.simaticit.common.widgets.sidebar')
                .service('common.historyService', HistoryService);
        })(common = simaticit.common || (simaticit.common = {}));
    })(simaticit = siemens.simaticit || (siemens.simaticit = {}));
})(siemens || (siemens = {}));
//# sourceMappingURL=sit-sidebar-history-svc.js.map
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.sidebar').directive('sitSidebarItem',
        ['common.recursionHelperService', sitSidebarItem]);

    function sitSidebarItem(recursionHelper) {
        var directive = {
            templateUrl: 'common/widgets/sidebar/sidebar-item.html',
            controllerAs: 'itemCtrl',
            require: ['^sitSidebar', 'sitSidebarItem'],
            controller: SidebarItemController,
            scope: {},
            bindToController: {
                type: '@sitType',
                source: '=?sitSource',
                actions: '=?sitActions',
                selected: '=?sitSelected',
                environment: '=?sitEnvironment'
            },
            compile: function (element) {
                return recursionHelper.compile(element);
            }
        };

        SidebarItemController.$inject = ["$rootScope", "$state", "common.historyService"];

        function SidebarItemController($rootScope, $state, historyService) {
            var vm = this;

            activate();

            function init() {
                vm.type = vm.type || 'static';
                vm.hasBackNavigation = false;

                // options
                vm.options = vm.options || {};
                vm.options.default = {
                    action: {
                        click: 'navigate'
                    }
                };

                //actions
                vm.actions = vm.actions || {};
                vm.actions.navigateBack = _navigateBack;
                vm.actions.navigate = _navigate;
            }

            function activate() {
                init();
                subscribeEvents();
                _setNavigateBackEvent(historyService.states);
            }

            function subscribeEvents() {
                $rootScope.$on('common.historyService.historyChanged', function (event, eventArgs) {
                    _setNavigateBackEvent(eventArgs);
                });
            }

            function _navigateBack() {
                historyService.back();
            }

            function _navigate(sidebarItem) {
                if (!sidebarItem.url) {
                    $state.go(sidebarItem.id);
                } else {
                    $state.go('swacUIModule', { 'url': sidebarItem.url, 'id': sidebarItem.id });
                }
            }

            function _setNavigateBackEvent(eventArgs) {
                vm.hasBackNavigation = eventArgs.length > 1;
                _.each(vm.source, function (item) {
                    if (item.bind && item.bind.display) {
                        item.display = vm[item.bind.display];
                    }
                });
            }

            this.isChildrenSelected = function isChildrenSelected(source, select) {
                if (source.contents) {
                    var selectedItem = _.find(source.contents, function (item) {
                        if (item.id === select) {
                            return true;
                        } else if (item.contents) {
                            return vm.isChildrenSelected(item, select);
                        }
                    });
                    if (selectedItem) {
                        return true;
                    }
                }
                return false;
            };

            this.click = function click(controller, sidebarItem) {
                if (sidebarItem.action &&
                    angular.isDefined(controller.actions[sidebarItem.action.click]) &&
                    angular.isFunction(controller.actions[sidebarItem.action.click])) {
                    controller.actions[sidebarItem.action.click](sidebarItem);
                } else if (!sidebarItem.contents) {
                    controller.actions[vm.options.default.action.click](sidebarItem);
                } else {
                    $rootScope.$broadcast('common.sidebar.sitSidebarItem.contents.clicked', sidebarItem);
                }
            };

        }
        return directive;
    }

})();



'use strict';
var siemens;
(function (siemens) {
    var simaticit;
    (function (simaticit) {
        var common;
        (function (common) {
            var widgets;
            (function (widgets) {
                var sidebar;
                (function (sidebar) {
                    var Events = /** @class */ (function () {
                        function Events() {
                        }
                        Events.broadcast = {
                            itemChanged: 'common.sidebar.sidebarService.itemChanged'
                        };
                        return Events;
                    }());
                    sidebar.Events = Events;
                    var SidebarMenuItem = /** @class */ (function () {
                        function SidebarMenuItem(id, title, icon, url, isSwac, sitIconSvgData, category, oldSvgIcon) {
                            this.id = id;
                            this.title = title;
                            this.translatedTitle = title;
                            this.icon = icon || 'fa-gear';
                            this.url = url;
                            this.isSwac = isSwac;
                            this.sitIconSvgData = sitIconSvgData;
                            this.svgIcon = this.parseToSvgIcon(this.icon, oldSvgIcon);
                            if (this.svgIcon !== null) {
                                this.icon = null;
                            }
                            this.category = category || '';
                        }
                        SidebarMenuItem.prototype.parseToSvgIcon = function (icon, oldSvgIcon) {
                            if (icon.length > 4) {
                                if (icon.indexOf('svg ') === 0) {
                                    var svgIcon = _.findWhere(this.sitIconSvgData.sitIcons, { text: icon });
                                    if (svgIcon) {
                                        return {
                                            path: svgIcon.icon
                                        };
                                    }
                                }
                                else if ((icon.substring(icon.length - 4, icon.length).toLowerCase() === '.svg')) {
                                    return {
                                        path: icon
                                    };
                                }
                                else if (oldSvgIcon && oldSvgIcon.path) {
                                    return {
                                        path: oldSvgIcon.path
                                    };
                                }
                            }
                            return null;
                        };
                        return SidebarMenuItem;
                    }());
                    sidebar.SidebarMenuItem = SidebarMenuItem;
                    var SidebarService = /** @class */ (function () {
                        function SidebarService(CONFIG, $log, $rootScope, sitIconSvgData) {
                            this.CONFIG = CONFIG;
                            this.$log = $log;
                            this.$rootScope = $rootScope;
                            this.sitIconSvgData = sitIconSvgData;
                            this.init();
                            this.setMenu();
                            this.environment = CONFIG.type || '';
                        }
                        SidebarService.prototype.init = function () {
                            this.defaultHeader = [{
                                    "id": "open",
                                    "title": "sidebar.open",
                                    "icon": "common\\icons\\miscChevronLeftDouble24.svg",
                                    "action": {
                                        "click": "toggle"
                                    }
                                }];
                            this.defaultFixed = [{
                                    "id": "back",
                                    "title": "sidebar.back",
                                    "icon": "common\\icons\\cmdBack24.svg",
                                    "action": {
                                        "click": "navigateBack"
                                    },
                                    "bind": {
                                        "display": "hasBackNavigation"
                                    }
                                }, {
                                    "id": "adminHome",
                                    "title": "Home page",
                                    "icon": "common\\icons\\cmdHome24.svg"
                                }];
                        };
                        SidebarService.prototype.validatecontent = function (source) {
                            var returnValue = [];
                            for (var i = 0; i < source.length; i++) {
                                var item = source[i];
                                var contents = [];
                                if (item.contents && item.contents.length > 0) {
                                    contents = this.validatecontent(item.contents);
                                }
                                if (contents.length > 0) {
                                    item.contents = contents;
                                }
                                var newItem = this.validateItem(item);
                                if (newItem) {
                                    returnValue.push(newItem);
                                }
                            }
                            return returnValue;
                        };
                        SidebarService.prototype.find = function (source, id) {
                            for (var i = 0; i < source.length; i++) {
                                var item = source[i];
                                if (item.contents && item.contents.length > 0) {
                                    for (var j = 0; j < item.contents.length; j++) {
                                        var subItem = item.contents[j];
                                        if (subItem.id === id) {
                                            return subItem;
                                        }
                                        if (subItem.contents && subItem.contents.length > 0) {
                                            for (var k = 0; k < subItem.contents.length; k++) {
                                                if (subItem.contents[k].id === id) {
                                                    return subItem.contents[k];
                                                }
                                            }
                                        }
                                    }
                                }
                                if (item.id === id) {
                                    return item;
                                }
                            }
                        };
                        SidebarService.prototype.setHomeItem = function (source, id) {
                            var homeItem;
                            var itemFound = false;
                            for (var i = 0; i < source.length; i++) {
                                var item = source[i];
                                if (item.contents && item.contents.length > 0) {
                                    for (var j = 0; j < item.contents.length; j++) {
                                        var subItem = item.contents[j];
                                        if (subItem.id === id) {
                                            homeItem = new SidebarMenuItem(subItem.id, subItem.title, subItem.icon, subItem.url, subItem.isSwac, this.sitIconSvgData, subItem.category, subItem.svgIcon);
                                            itemFound = true;
                                        }
                                        if (subItem.contents && subItem.contents.length > 0 && itemFound === false) {
                                            for (var k = 0; k < subItem.contents.length; k++) {
                                                var subContent = subItem.contents[k];
                                                if (subContent.id === id) {
                                                    homeItem = new SidebarMenuItem(subContent.id, subContent.title, subContent.icon, subContent.url, subContent.isSwac, this.sitIconSvgData, subContent.category, subContent.svgIcon);
                                                    itemFound = true;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (item.id === id || itemFound === true) {
                                    homeItem = source[i];
                                    source.splice(i, 1);
                                    return homeItem;
                                }
                            }
                            return homeItem;
                        };
                        SidebarService.prototype.findItem = function (id) {
                            var item;
                            for (var i = 0; i < this.menuItems.length; i++) {
                                item = this.find(this.menuItems[i], id);
                                if (item) {
                                    break;
                                }
                            }
                            if (angular.isUndefined(item)) {
                                this.$log.log('info: No menu item found in sidebar with the id: ' + id);
                            }
                            return item;
                        };
                        SidebarService.prototype.validateItem = function (menuItem) {
                            if (menuItem.id === undefined) {
                                this.$log.error('Error: id not provided for sidebar menu item ' + JSON.stringify(menuItem));
                                return undefined;
                            }
                            else if (menuItem.title === undefined) {
                                this.$log.error('Error: title not provided for sidebar menu item ' + JSON.stringify(menuItem));
                                return undefined;
                            }
                            else {
                                var item = new SidebarMenuItem(menuItem.id, menuItem.title, menuItem.icon, menuItem.url, menuItem.isSwac, this.sitIconSvgData, menuItem.category, menuItem.svgIcon);
                                if (menuItem.action && angular.isObject(menuItem.action)) {
                                    item.action = menuItem.action;
                                }
                                if (menuItem.bind && angular.isObject(menuItem.bind)) {
                                    item.bind = menuItem.bind;
                                }
                                if (menuItem.contents && angular.isArray(menuItem.contents)) {
                                    item.contents = menuItem.contents;
                                }
                                if (menuItem.securable !== undefined) {
                                    item.securable = menuItem.securable;
                                }
                                if (menuItem.isSwac && menuItem.url) {
                                    item.url = menuItem.url;
                                }
                                item.display = typeof menuItem.display === 'boolean' ? menuItem.display : true;
                                return item;
                            }
                        };
                        SidebarService.prototype.setMenu = function (source) {
                            var defaultSource = [];
                            this.menuItems = [];
                            this.home = this.CONFIG.home;
                            this.isHomeCardEnabled = this.CONFIG.enableHomeCard;
                            this.environment = this.CONFIG.type || '';
                            var isDefalutSet = true;
                            if (undefined === source) {
                                if (!angular.isArray(this.CONFIG.menu)) {
                                    this.$log.log("Menu not configured");
                                }
                                if (this.CONFIG.menu && this.CONFIG.menu.length > 0 && undefined !== this.CONFIG.menu[0].id) {
                                    defaultSource.push(this.defaultHeader);
                                    defaultSource.push(this.defaultFixed);
                                    defaultSource.push(this.CONFIG.menu);
                                    isDefalutSet = false;
                                    source = defaultSource;
                                }
                                else {
                                    source = this.CONFIG.menu;
                                }
                            }
                            if (source === undefined) {
                                this.menuItems = undefined;
                            }
                            else {
                                for (var i = 0; i < source.length; i++) {
                                    this.menuItems.push(this.validatecontent(source[i]));
                                }
                            }
                            if (isDefalutSet === false) {
                                if (this.isHomeCardEnabled && this.environment === 'rt') {
                                    this.menuItems[1] = this.menuItems[1].slice(0, 1);
                                }
                                else {
                                    var homeItem = this.setHomeItem(this.menuItems[2], this.home);
                                    if (homeItem !== undefined) {
                                        this.menuItems[1][1] = homeItem;
                                    }
                                }
                            }
                        };
                        SidebarService.prototype.reload = function () {
                            this.setMenu();
                        };
                        SidebarService.prototype.getMenu = function () {
                            return this.menuItems;
                        };
                        SidebarService.prototype.toggleMenuItem = function (id) {
                            var item = this.findItem(id);
                            if (item) {
                                item.display = item.display === undefined ? false : !item.display;
                                this.$rootScope.$broadcast(Events.broadcast.itemChanged, item);
                                return true;
                            }
                            return false;
                        };
                        SidebarService.prototype.hideMenuItem = function (id) {
                            var item = this.findItem(id);
                            if (item) {
                                if (item.display !== undefined && item.display === false) {
                                    return false;
                                }
                                else {
                                    item.display = false;
                                    this.$rootScope.$broadcast(Events.broadcast.itemChanged, item);
                                    return true;
                                }
                            }
                            return false;
                        };
                        SidebarService.prototype.showMenuItem = function (id) {
                            var item = this.findItem(id);
                            if (item) {
                                if (item.display !== undefined && item.display === true) {
                                    return false;
                                }
                                else {
                                    item.display = true;
                                    this.$rootScope.$broadcast(Events.broadcast.itemChanged, item);
                                    return true;
                                }
                            }
                            return false;
                        };
                        SidebarService.prototype.hideMenuItems = function (ids) {
                            for (var i = 0; i < ids.length; i++) {
                                this.hideMenuItem(ids[i]);
                            }
                        };
                        SidebarService.prototype.showMenuItems = function (ids) {
                            for (var i = 0; i < ids.length; i++) {
                                this.showMenuItem(ids[i]);
                            }
                        };
                        SidebarService.$inject = ['CONFIG', '$log', '$rootScope', 'common.iconPicker.sitIconSvgData'];
                        return SidebarService;
                    }());
                    sidebar.SidebarService = SidebarService;
                    angular.module('siemens.simaticit.common.widgets.sidebar')
                        .service('common.sidebar.sidebarService', SidebarService);
                })(sidebar = widgets.sidebar || (widgets.sidebar = {}));
            })(widgets = common.widgets || (common.widgets = {}));
        })(common = simaticit.common || (simaticit.common = {}));
    })(simaticit = siemens.simaticit || (siemens.simaticit = {}));
})(siemens || (siemens = {}));
//# sourceMappingURL=sit-sidebar-svc.js.map