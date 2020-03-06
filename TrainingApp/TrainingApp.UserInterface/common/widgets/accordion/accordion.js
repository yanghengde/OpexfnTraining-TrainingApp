/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.accordion
    *
    * @description
    * Provides functionalities related to the menu widget (accordion).
  */
    angular.module('siemens.simaticit.common.widgets.accordion', ['ui.router.state']);
})();

(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @name sitAccordion
   * @module siemens.simaticit.common.widgets.accordion
   * @access internal
   * @description
   * The **sitAccordion** directive simply sets up the directive controller
   * and adds an accordion CSS class to itself.
   *
   **/

    function sitAccordion() {
        return {
            restrict: 'EA',
            controller: sitAccordionController,
            transclude: true,
            replace: false,
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'common/widgets/accordion/sit-accordion.html';
            }
        };
    }

    sitAccordionController.$inject = ['$scope', '$attrs', '$state', 'sitAccordionConfig'];
    function sitAccordionController($scope, $attrs, $state, sitAccordionConfig) {
        var vm = this;

        // This array keeps track of the accordion groups
        function init() {
            vm.groups = [];
            vm.closeOthers = closeOthers;
            vm.addGroup = addGroup;
            vm.removeGroup = removeGroup;
            vm.maxLevel = sitAccordionConfig.maxLevel;
        }

        // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
        function closeOthers(openGroup) {
            var sitOpenSingleAccordion = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : sitAccordionConfig.closeOthers;
            if (sitOpenSingleAccordion) {
                angular.forEach(vm.groups, function (group) {
                    if (group !== openGroup) {
                        group.accGrpCtrl.isOpen = false;
                    }
                });
            }
        }

        // This is called from the accordion-group directive to add itself to the accordion
        function addGroup(groupScope) {
            var that = this;
            vm.groups.push(groupScope);
            groupScope.$on('$destroy', function () {
                that.removeGroup(groupScope);
            });
        }

        // This is called from the accordion-group directive when to remove itself
        function removeGroup(group) {
            var index = vm.groups.indexOf(group);
            if (index !== -1) {
                vm.groups.splice(index, 1);
            }
        }

        init();

    }

    angular.module('siemens.simaticit.common.widgets.accordion').directive('sitAccordion', sitAccordion)


})();


(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @name sitAccordionGroup
   * @access internal
   * @module siemens.simaticit.common.widgets.accordion
   * @description
   * The **sitAccordionGroup** directive indicates a block of HTML that will expand and collapse in an accordion.
   *
   * @usage
   * As an element:
   * ```
   * <sit-accordion-group
                is-open='isOpen'
                is-disabled="isDisabled'
                fa-icon='icon'
                fa-open-icon='openIcon'
                level='level'
                on-click-callback='menu.onClickLink("id")'
                menu-item-id='item.id'
    </sit-accordion-group>
   *
   * ```
   * @restrict E
   *@param {Bool} [is-open]  Specifies if the menu item is open or not.
   *@param {Bool}[is-disabled]_(Optional)_ Specifies if the menu item is disabled or not.
   *@param {String}[fa-icon] Font awesome icon to be displayed for the menu item.
   *@param {String}[fa-open-icon] Font awesome icon to be displayed for the menu item when opened.
   *@param {String}[level]  _(Optional)_  Appended with string "level". Specifies the level of the item in the list, the first level being zero.
   *@param {String}[menu-item-id] _(Optional)_  The ID of the item in the menu.
   *@param {Bool} [is-selected] _(Optional)_ Specifies if the menu item is selected by default.
   *@param {Function}[on-click-callback] _(Optional)_  Specifies the function to be called when an item in the menu is clicked.
   * @example
   * In a view template, the `sit-accordion-group` directive is used as follows:
   *
   * ```
   * <sit-accordion-group
                is-open='false'
                is-disabled="false'
                fa-icon='fa-folder'
                fa-open-icon='fa-folder-open'
                level='0'
                is-selected='true'
                on-click-callback='onClickLink("id")'
                menu-item-id='id'
    </sit-accordion-group>
   * ```
   *

   **/

    function accordionGroup() {
        return {
            require: ['sitAccordionGroup', '^sitAccordion'],         // We need this directive to be inside an accordion
            restrict: 'EA',
            transclude: true,              // It transcludes the contents of the directive into the template
            replace: true,                // The element containing the directive will be replaced with the template
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'common/widgets/accordion/sit-accordion-group.html';
            },
            scope: {},
            bindToController: {
                heading: '@',               // Interpolate the heading attribute onto this scope
                isOpen: '=?',
                isEnabled: '=?',
                level: '@?',
                faIcon: '@',
                faOpenIcon: '@',
                svgIcon: '@',
                openSvgIcon: "@",
                imgIcon: '@?',
                scrollUpdateCallback: '&?',
                onClickCallback: '&?',
                menuItemId: '@?',
                isSelected: '@?',
                internalType: '@'
            },
            controller: AccGroupController,
            controllerAs: 'accGrpCtrl',
            link: function (scope, element, attrs, ctrls) {
                var vm = ctrls[0];
                vm.displayIcon = null;
                var sitAccordionCtrl = ctrls[1];
                vm.itemClicked = itemClicked;
                vm.toggleOpen = toggleOpen;
                scope.faIcon = vm.faIcon;
                scope.faOpenIcon = vm.faOpenIcon;
                scope.heading = vm.heading;
                scope.isOpen = vm.isOpen;
                scope.level = vm.level;
                scope.menuItemId = vm.menuItemId;
                scope.onClickCallback = vm.onClickCallback;
                updateDisplayIcon();
                sitAccordionCtrl.addGroup(scope);

                if (!vm.level || vm.level < 0) {
                    vm.level = 0;
                }

                scope.$watch(function () { return vm.isOpen; }, function (newValue) {
                    if (newValue) {
                        sitAccordionCtrl.closeOthers(scope);
                    }
                }, true);

                function toggleOpen(event) {

                    if (vm.isEnabled) {
                        vm.isOpen = !vm.isOpen;
                    }

                    updateDisplayIcon();
                    vm.scrollUpdateCallback();
                    event.stopPropagation();
                }

                function updateDisplayIcon() {

                    if (vm.isOpen && vm.openSvgIcon !== 'null') {
                        vm.displayIcon = vm.openSvgIcon;
                    } else if (!vm.isOpen && vm.svgIcon !== 'null') {
                        vm.displayIcon = vm.svgIcon;
                    } else {
                        vm.displayIcon = null;
                    }
                }

                function itemClicked(event) {

                    if (vm.isEnabled) {
                        if (!vm.isOpen) {
                            vm.isOpen = true;
                        }
                        vm.onClickCallback({ itemData: { menuItemId: vm.menuItemId, event: event } });
                    }
                }
                vm.imgLevelClass = 'icon-level-' + vm.level;
                vm.txtLevelClass = 'text-level-' + vm.level;
                vm.itemSpaceClass = 'item-space-' + vm.level;
            }
        };
    }

    AccGroupController.$inject = ['sitAccordionConfig'];
    function AccGroupController(sitAccordionConfig) {
        var vm = this;
        function init() {
            vm.setHeading = setHeading;
            vm.maxLevel = sitAccordionConfig.maxLevel;
        }

        function setHeading(element) {
            vm.heading = element;
        }

        init();
    }

    angular.module('siemens.simaticit.common.widgets.accordion').directive('sitAccordionGroup', accordionGroup)

})();


(function () {
    'use strict';
    /**
  * @ngdoc directive
  * @name sitAccordionHeading
  * @module siemens.simaticit.common.widgets.accordion
  * @access internal
  * @description
  * The **sitAccordionHeading** is a directive used below a sit-accordion-group to provide a heading containing HTML.
  *
  * @usage
  * As an element:
  * ```
  * <sit-accordion-group>
        <sit-accordion-heading>Heading containing HTML - <img src="..."></sit-accordion-heading>
    </sit-accordion-group>
  *
  * ```
  * @restrict EA
  * @example
  * In a view template, the `sit-accordion-heading` directive is used as follows:
  *
  * ```
  * <sit-accordion-group>
        <sit-accordion-heading>Heading containing HTML - <img src="..."></sit-accordion-heading>
    </sit-accordion-group>
  * ```
  *
  **/
    function accordionHeading () {
        return {
            restrict: 'EA',
            transclude: true,   // Grab the contents to be used as the heading
            template: '',       // In effect remove this element!
            replace: true,
            require: '^sitAccordionGroup',
            link: function (scope, element, attr, sitAccordionGroupCtrl, transclude) {
                // Pass the heading to the accordion-group controller
                // so that it can be transcluded into the right place in the template
                // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
                sitAccordionGroupCtrl.setHeading(transclude(scope, function () { }));
            }
        };
    }

    angular.module('siemens.simaticit.common.widgets.accordion').directive('sitAccordionHeading', accordionHeading)

})();


(function () {
    'use strict';
    /**
    * @ngdoc type
    * @name MenuItem
    * @module siemens.simaticit.common.widgets.accordion
    * @description
    * An object describing an item to be displayed within a {@link sitMenu} widget.
    * @property {String} id A unique identifier for an item within the whole menu. This property can be optional, but in that case most of the configuration APIs won't work.
    * @property {String} svgIcon The SVG icon to display next to the label of the menu item.
    * @property {String} typeIcon The type icon to display next to the label of the menu item. This is used only if the svgIcon is not provided.
    * @property {String} icon The icon to display next to the label of the menu item. [Deprecated]
    * @property {String} openSvgIcon Optional SVG icon to be displayed next to the label of the menu item, when open.
    * @property {String} openTypeIcon Optional type icon to be displayed next to the label of the menu item, when open.This is used only if the openSvgIcon is not provided.
    * @property {String} openIcon If specified, the icon to display next to the label of the menu item, when open.[Deprecated]
    * @property {String} label The label to display for the menu item.
    * @property {String} translationId The translation ID of the label for the menu item (if specified, it overrides the label property).
    * @property {Function} onClickCallback A function to execute when the menu item is clicked.
    * The function is called with one parameter, corresponding to the item that was clicked.
    * @property {Boolean} opened Indicates whether the item is opened or not.
    * @property {Boolean} visible Indicates whether the item is visible or not.
    * @property {MenuItem[]} items An array of MenuItem objects (up to a maximum of 100) representing the contents of the menu item.
    *
    * @example
    * ```
    *      {
    *           id: 'Server_0',
    *           icon: "fa-folder",
    *           openIcon: "fa-folder-open",
    *           svgIcon: "common/icons/cmdOpen24.svg",
    *           openSvgIcon: "common/icons/cmdRefresh24.svg",
    *           label: "Servers",
    *           translationId: "common.apply",
    *           onClickCallback: function (item) {
    *                console.log("*******callback in item********");
    *            },
    *            opened: false,
    *            visible: true,
    *            items: [
    *                    {
    *                        id: 'Server_01',
    *                        icon: "fa-arrows",
    *                        openIcon: "fa-car",
    *                        label: "Servers01",
    *                        translationId: "common.apply",
    *                        onClickCallback: function (item) {
    *                            console.log("*******callback in item********");
    *                        },
    *                        opened: false,
    *                        visible: true
    *
    *                    },
    *            ],
    *        }
    * ```
    *
    **/
    /**
    * @ngdoc type
    * @name MenuConfig
    * @module siemens.simaticit.common.widgets.accordion
    * @description
    * An object defining the configuration of a {@link sitMenu} widget.
    *
    * **Note** The methods will be available once the widget is instantiated.
    *
    * @property {String} icon The default icon to display next to the label of each menu item.
    * @property {String} svgIcon The default SVG icon to display next to the label of each menu item.
    * @property {String} openSvgIcon If specified, the icon to display next to the label of each menu item, when open. This has the highest priority over openIcon.
    * @property {String} openIcon If specified, the icon to display next to the label of each menu item, when open.
    * @property {Boolean} closeOthers If set to true (default), it is possible to open only one item at a time.
    * @property {Function} onClickCallback A function to execute when any menu item is clicked.
    * The function is called with one parameter, corresponding to the item that was clicked.
    *
    * @example
    * ```
    *    {
    *         icon: "fa-folder",
    *         openIcon: "fa-folder-open",
    *         svgIcon: "common/icons/cmdOpen24.svg",
    *         openSvgIcon: "common/icons/cmdRefresh24.svg",
    *         closeOthers: true,
    *         onClickCallback: function (item) {
    *             console.log("Item clicked!");
    *         }
    *     }
    *```
    **/
    /**
    * @ngdoc method
    * @name MenuConfig#get
    * @param {String} id The ID of the item in the menu.
    * @description Returns the item in the menu corresponding to the ID passed.
    **/
    /**
    * @ngdoc method
    * @name MenuConfig#getParent
    * @param {String} id The ID of the item in the menu.
    * @description Returns the parent node of the item in the list corresponding to the ID passed.
    **/
    /**
    * @ngdoc method
    * @name MenuConfig#add
    * @param {MenuItem} newItem The {@link MenuItem} to be added to the menu.
    * @param {String} [parentId] The ID of the item to which an new item has to be added.
    * @param {Number} [position] Specifies the position where the new element has to be added.
    * @description Adds an item to the menu corresponding to the parent and position passed. Note that:
    *
    *   * if parentId is not specified, the item is added at top level
    *   * if position is not specified, the item is added in the last position
    **/
    /**
    * @ngdoc method
    * @name MenuConfig#remove
    * @param {String}  id  The ID of the item that has to be removed from the menu.
    * @description It removes an item from the menu corresponding to the ID passed.
    **/
    /**
    * @ngdoc method
    * @name MenuConfig#update
    * @access internal
    * @param {String}  id The id of the item that has to be updated in the menu.
    * @param {MenuItem} newItem The {@link MenuItem} corresponding to the ID in the menu will be replaced with this object.
    * @description Updates an item in the menu corresponding to the ID passed.
    **/
    /**
    * @ngdoc method
    * @name MenuConfig#refresh
    * @description Refreshes the widget, re-applying settings to all configured items.
    * It is necessary to explicitly call this method after updating a {@link MenuItem} object directly, to reflect the changes in the user interface.
    **/

    /**
    * @ngdoc directive
    * @name sitMenu
    * @module siemens.simaticit.common.widgets.accordion
    * @description
    * Theis widget is used to display a list of menu item objects.
    *
    * @usage
    * As an element:
    * ```
    * <sit-menu sit-data="items" sit-config="config"></sit-menu>
    * ```
    * @restrict E
    * @param {MenuItem[]} sit-data
    * Defines an array of {@link MenuItem} objects.
    *
    * @param {MenuConfig} sit-config
    * A {@link MenuConfig} object specifying the the configuration and default settings of the menu.
    *
    * @example
    * In a view template, the `sit-menu` directive is used as follows:
    *
    * ```
    * <sit-menu sit-data="items" sit-config="config"></sit-menu>
    * ```
    **/
    angular.module('siemens.simaticit.common.widgets.accordion').constant('sitAccordionConfig', {
        closeOthers: true,
        //max level managed by background color (min 1)
        maxLevel: 2,
        defaultIndexCounter: 0
    });


    function accordionMenu($compile, $timeout, $translate, sitAccordionConfig) {
        return {
            restrict: 'E',
            scope: true,
            bindToController: {
                data: '=?sitData',
                config: '=?sitConfig'
            },
            controller: AccordionController,
            controllerAs: 'menuCtrl',
            template: '<div class="sit-menu-container"></div>',
            link: function (scope, element, attr, controller) {
                var vm = controller;
                var isGroupSelect = ((vm.config.isGroupSelectable === true || vm.config.isGroupSelectable === false) ? vm.config.isGroupSelectable : true);

                vm.onClickLink = function (itemID, event) {
                    var item = vm.accordionMenu.get(itemID);
                    if (item) {
                        var enabled = ((item.enabled === true || item.enabled === false) ? item.enabled : true);
                        if (enabled) {
                            if (!item.items || item.items.length <= 0 || isGroupSelect) {
                                if (vm.lastSelectedID) {
                                    if (vm.accordionMenu.get(vm.lastSelectedID)) {
                                        vm.accordionMenu.get(vm.lastSelectedID).isSelected = false;
                                    }
                                    element.find('#' + vm.lastSelectedID).removeClass('highlight-selected-menu');
                                }
                                item.isSelected = true;
                                element.find('#' + itemID).addClass('highlight-selected-menu');
                                vm.lastSelectedID = itemID;
                                $timeout(function () {
                                    element.find('.sit-panel-cont').css('width', element.find('.sit-menu-container')[0].scrollWidth);
                                    element.find(".highlight-selected-menu").css('width', element.find('.sit-menu-container')[0].scrollWidth);
                                }, 20)

                            }

                            if (item && item.onClickCallback) {
                                item.onClickCallback(item);
                            } else {
                                if (vm.config.onClickCallback) {
                                    vm.config.onClickCallback(item);
                                }
                            }
                        }
                    }
                    event.stopPropagation();
                };

                //this method was added because it was not possible to pass event from sitAccordionGroup
                // to sitMenu directive
                vm.onGroupClick = function (value) {
                    vm.onClickLink(value.menuItemId, value.event);
                }

                // This method is added to update the scroll on clicking of the open/close icon(i.e without calling the callback function).
                // A delay of 20 ms is given because firefox and IE browsers do not update without this delay
                vm.scrollUpdate = function () {
                    $timeout(function () {
                        element.find('.sit-panel-cont').css('width', element.find('.sit-menu-container')[0].scrollWidth);
                        element.find(".highlight-selected-menu").css('width', element.find('.sit-menu-container')[0].scrollWidth);
                    }, 20)
                }

                vm.setAccordion = function (objToCompile, level) {
                    var elements = '';
                    elements += '<sit-accordion close-others="{{menuCtrl.closeOthers}}">';

                    _.each(objToCompile, function (item, index) {
                        item.id = (item.id ? item.id : 'default_Id_' + sitAccordionConfig.defaultIndexCounter++);
                        var isOpen = ((item.opened === true || item.opened === false) ? item.opened : false);
                        var isVisible = ((item.visible === true || item.visible === false) ? item.visible : true);
                        vm.isEnabled = ((item.enabled === true || item.enabled === false) ? item.enabled : true);
                        var name = ((item.translationId) ? $translate.instant(item.translationId) : item.label);

                        if (!vm.isEnabled) {
                            item.opened = false;
                            isOpen = false;
                        }

                        if (item.id === vm.selectedItem) {
                            vm.lastSelectedID = item.id;
                        }
                        //
                        if (item.typeIcon && !item.svgIcon) {
                            item.svgIcon = "common/icons/type" + item.typeIcon + "48.svg";
                        }
                        if (item.openTypeIcon &&!item.openSvgIcon) {
                            item.openSvgIcon = "common/icons/type" + item.openTypeIcon + "48.svg";
                        }
                        //
                        if (item.items && !(_.isEmpty(item.items))) {
                            elements += '<sit-accordion-group ng-show="' + isVisible + '" is-open="' + isOpen + '" ' + 'is-enabled="' +
                            vm.isEnabled + '"' + 'is-selected="' + (item.id === vm.selectedItem) + '"';
                            elements += ' fa-icon="' + ((item.icon) ? item.icon : 'fa-angle-right') + '"';
                            elements += ' fa-open-icon="' + ((item.openIcon) ? item.openIcon : 'fa-angle-down') + '"';

                            elements += ' open-svg-icon="' + ((item.openSvgIcon) ? item.openSvgIcon : null) + '"';
                            elements += ' svg-icon="' + ((item.svgIcon) ? item.svgIcon : null) + '"';
                            elements += ' level="' + level + '"';
                            elements += ' internal-type="accordion-item_' + level + '' + index + '"';
                            elements += ' scroll-update-callback="menuCtrl.scrollUpdate()" ';
                            elements += ' on-click-callback="menuCtrl.onGroupClick(itemData)" ';
                            elements += ((item.id) ? ' menu-item-id="' + item.id + '" ' : '');
                            elements += '>';

                            elements += '<sit-accordion-heading>';
                            elements += name;
                            elements += '</sit-accordion-heading>';
                            elements += vm.setAccordion(item.items, level + 1);
                            elements += '</sit-accordion-group>';
                        } else {
                            item.displayIcon = null;
                            if (item.svgIcon) {
                                item.displayIcon = item.svgIcon;
                            }

                            elements += '<div data-internal-type="accordion-item_' + level + '' + index + '" id="' + item.id + '" ng-show="' +
                                        isVisible + '" class="sit-panel-item sit-panel-cont  background-level-common item-space-' + level +
                                ((item.id === vm.selectedItem) ? ' highlight-selected-menu' : "") +
                                '"' + ' ng-click="menuCtrl.onClickLink(\'' + item.id + '\',$event)" ' + '>' +
                                '<div class="sit-panel-item-img fa ' + ((item.icon) ? item.icon : vm.config.icon) + ' icon-level-' + (level) +
                                '  " ng-style="' + (item.displayIcon !== null).toString() + '?{\'font-size\':\'0px\'}:\'\'" ><img ng-if="' +
                                (item.displayIcon != null).toString() + '" ng-src="' + item.displayIcon + '" height="16px" width="16px" /></div>' +
                                '<div class="sit-panel-item-text text-level-' + (level) + '">' +
                                '<a href ' + ' title="' + name + '">' + name + '</a></div>' +
                                '</div>';
                        }
                    });
                    elements += '</sit-accordion>';
                    return elements;
                }

                vm.refresh = function (vm) {
                    vm.accordionMenu.setMenu(vm.data);
                    vm.selectedItem = vm.accordionMenu.getSelectedItem();
                    var elementToCompile = vm.setAccordion(vm.data, 0);
                    var el = $compile(elementToCompile)(scope);
                    element.find('.sit-menu-container').empty().append(el);
                }
                vm.refresh(vm);

                $timeout(function () {
                    element.find('.sit-panel-cont').css('width', element.find('.sit-menu-container')[0].scrollWidth);
                    element.find(".highlight-selected-menu").css('width', element.find('.sit-menu-container')[0].scrollWidth);
                },1000)

            }
        }
    }

    AccordionController.$inject = ['$timeout', 'sitAccordionConfig', 'common.accordion.accordionService'];

    function AccordionController($timeout, sitAccordionConfig, accordionService) {
        var vm = this;
        activate(vm);

        function refreshMenuCallback() {
            vm.refresh(vm);
        }

        function init(vm) {
            vm.data = vm.data || [];
            vm.config = vm.config || [];
            vm.closeOthers = angular.isDefined(vm.config.closeOthers) ? vm.config.closeOthers : sitAccordionConfig.closeOthers;
            vm.refreshMenuCallback = refreshMenuCallback;
            vm.accordionMenu = new accordionService.Accordion($timeout, vm.data, vm.refreshMenuCallback);
        }

        function initAPI() {
            vm.config.get = vm.accordionMenu.get;
            vm.config.getParent = vm.accordionMenu.getParent;
            vm.config.update = vm.accordionMenu.update;
            vm.config.remove = vm.accordionMenu.remove;
            vm.config.add = vm.accordionMenu.add;
            vm.config.refresh = vm.accordionMenu.refresh;
        }

        function activate(vm) {
            init(vm);
            initAPI();
        }
    }

    angular.module('siemens.simaticit.common.widgets.accordion').directive('sitMenu', ['$compile', '$timeout', '$translate', "sitAccordionConfig", accordionMenu]);

})();



(function () {
    'use strict';

    function Accordion($timeout, data, refreshCallback) {
        var menu, selectedID;
        /**
           * @ngdoc method
           * @name common.accordion.accordionService#get
           * @access internal
           * @param {string} id The ID of the item in the list
           * @description Returns the item in the list corresponding to the ID passed.
       */
        function get(id) {
            var item = findItem(menu, id);
            return item;
        }

        function findItem(menuItem, id) {
            var i, obj;
            var itemsLength = menuItem.length;
            for (i = 0; i < itemsLength; i++) {
                if (menuItem[i].id === id) {
                    obj = menuItem[i];
                    break;
                }
                else {
                    if (menuItem[i].hasOwnProperty("items")) {
                        obj = findItem(menuItem[i].items, id);
                        if (obj) {
                            break;
                        }
                    }
                }
            }
            return obj;
        }


        /**
           * @ngdoc method
           * @name common.accordion.accordionService#getParent
           * @access internal
           * @param {string} id The ID of the item in the list
           * @description Returns the parent node of the item in the list corresponding to the ID passed.
       */
        function getParent(id) {
            var i, menuLength, parent;
            menuLength = menu.length;
            for (i = 0; i < menuLength; i++) {
                if (menu[i].id === id) {
                    parent = null;
                    break;
                }
                else {
                    if (menu[i].hasOwnProperty("items")) {
                        parent = findParentRecursive(menu[i], id);
                        if (parent) {
                            break;
                        }
                    }
                }
            }
            return parent
        }


        function findParentRecursive(menuItem, id) {
            var i, obj;
            var itemsLength = menuItem.items.length;
            for (i = 0; i < itemsLength; i++) {
                if (menuItem.items[i].id === id) {
                    obj = menuItem;
                    break;
                }
                else {
                    if (menuItem.items[i].hasOwnProperty("items")) {
                        obj = findParentRecursive(menuItem.items[i], id);
                        if (obj) {
                            break;
                        }
                    }
                }
            }
            return obj;

        }

        /**
        * @ngdoc method
        * @name common.accordion.accordionService#add
        * @access internal
        * @param {Object} newItem The item to be added to the menu.
        * @param {string} parentId The ID of the item to which an new item has to be added.
        * @param {Number} position Specifies the position where the new element has to be added.
        * @description Adds an item to the menu corresponding to the Parent and position passed.
        */
        function add(newItem, parentId, position) {
            if (!parentId) {
                if (!position) {
                    menu.push(newItem);
                }
                else {
                    menu.splice(position, 0, newItem);
                }
            }
            else {
                var parentItem = get(parentId);
                if (!parentItem.items) {
                    parentItem.items = [];
                }
                if (!position) {
                    parentItem.items.push(newItem);
                }
                else {
                    parentItem.items.splice(position, 0, newItem);
                }
            }
            refresh();
            return menu;
        }

        /**
       * @ngdoc method
       * @name common.accordion.accordionService#remove
       * @access internal
       * @param {string}  id  The id of the item that has to be removed from the menu.
       * @description It removes an item from the menu corresponding to the ID passed.
       */
        function remove(id) {
            var parentObj, menuLength, i, searchArray;
            parentObj = getParent(id);
            if (!parentObj) {
                menuLength = menu.length;
                searchArray = menu;
            }
            else {
                menuLength = parentObj.items.length;
                searchArray = parentObj.items;
            }

            for (i = 0; i < menuLength; i++) {
                if (searchArray[i].id === id) {
                    searchArray.splice(i, 1);
                    break;
                }
            }
            refresh();
            return menu;
        }

        /**
       * @ngdoc method
       * @name common.accordion.accordionService#update
       * @access internal
       * @param {string}  id The id of the item that has to be updated in the menu.
       * @param {Object} newItem The item corresponding to the ID in the menu will be replaced with this object.
       * @description Updates an item in the menu corresponding to the ID passed.
       */
        function update(id, newItem) {
            var parentObj, menuLength, i, searchArray;
            parentObj = getParent(id);
            if (!parentObj) {
                menuLength = menu.length;
                searchArray = menu;
            }
            else {
                menuLength = parentObj.items.length;
                searchArray = parentObj.items;
            }

            for (i = 0; i < menuLength; i++) {
                if (searchArray[i].id === id) {
                    searchArray[i] = newItem;
                }
            }
            refresh();
            return menu;
        }

        /**
          * @ngdoc method
          * @name common.accordion.accordionService#refresh
          * @access internal
          * @description Recreates the menu component with properties restored.
        */
        function refresh() {
            $timeout(function () {
                refreshCallback();
            });
        }


        function getSelectedItem() {
            return selectedID;
        }

        /**
          * @ngdoc method
          * @name common.accordion.accordionService#setMenu
          * @access internal
          * @param {Array.<Object>} data An array of MenuItem objects.
          * @description This method will store the array of MenuItem objects
          */
        function setMenu(data) {
            menu = data;
            verifyOpenedItems();
        }

        function verifyOpenedItems() {
            var objLength, childID, parent, j;
            var openedObj = [];
            if (menu && menu.length > 0) {
                openedObj = findOpenMenu();
                objLength = openedObj.length;
                for (j = objLength; j > 0; j--) {
                    childID = openedObj[j - 1];
                    do {
                        parent = getParent(childID);
                        if (parent !== null) {
                            if (!parent.opened || parent.opened === false) {
                                parent.opened = true;
                            }
                            childID = parent.id;
                        }

                    } while (parent !== null);
                }
            }

        }

        function findOpenMenu() {
            var menuLength, i;
            var openedIDs = [];
            menuLength = menu.length;
            for (i = 0; i < menuLength; i++) {

                if ((menu[i].opened && menu[i].opened === true) || (menu[i].isSelected && menu[i].isSelected === true)) {
                    openedIDs.push(menu[i].id);
                    if (menu[i].isSelected && menu[i].isSelected === true) {
                        selectedID = menu[i].id;
                    }
                    if (menu[i].hasOwnProperty("items")) {
                        openedIDs = openedIDs.concat(checkOpenRecursive(menu[i]));
                    }
                }
                else {
                    openedIDs = openedIDs.concat(checkOpenRecursive(menu[i]));
                }

            }
            return openedIDs;
        }

        function checkOpenRecursive(obj) {
            var objLength, j;
            var openendItems = [];
            if (obj.items && obj.items.length > 0) {
                objLength = obj.items.length;
                for (j = 0; j < objLength; j++) {

                    if ((obj.items[j].opened && obj.items[j].opened === true) || (obj.items[j].isSelected && obj.items[j].isSelected === true)) {
                        openendItems.push(obj.items[j].id);
                        if (obj.items[j].isSelected === true) {
                            selectedID = obj.items[j].id;
                        }
                    }

                    if (obj.items[j].hasOwnProperty("items")) {
                        openendItems = openendItems.concat(checkOpenRecursive(obj.items[j]));
                    }

                }
            }
            return openendItems;

        }

        this.get = get;
        this.getParent = getParent;
        this.add = add;
        this.remove = remove;
        this.update = update;
        this.refresh = refresh;
        this.getSelectedItem = getSelectedItem;
        this.setMenu = setMenu;
        setMenu(data);
    }
    /**
     * @ngdoc service
     * @module siemens.simaticit.common.widgets.accordion
     * @name common.accordion.accordionService
     * @access internal
     *
     * @description
     * This service provides a class that contains APIs to get a menu item's object, its parent object or API, to add a new item, remove an item or
     * update an item or refresh the diretive.
     */
    angular.module('siemens.simaticit.common.widgets.accordion').factory('common.accordion.accordionService', [function () {
        return {
            Accordion: Accordion
        }
    }]);
})();

(function () {
    'use strict';

    /**
  * @ngdoc directive
  * @name sitAccordionTransclude
  * @access internal
  * @module siemens.simaticit.common.widgets.accordion
  * @description
  * The **sitAccordionTransclude** is a directive used in the sit-accordion-group template to indicate where you want the heading to be transcluded.
  *  You must provide the property on the sit-accordion-group controller, which will hold the transcluded element.
  *
  * @usage
  * As an attribute:
  * ```
  *  <div class="sit-accordion-group">
       <div class="sit-accordion-heading" ><a ... sit-accordion-transclude="heading">...</a></div>
       ...
     </div>
  *
  * ```
  * @restrict EA
  * @example
  * In a view template, the `sit-accordion-transclude` directive is used as follows:
  *
  * ```
  *  <div class="sit-accordion-group">
       <div class="sit-accordion-heading" ><a ... sit-accordion-transclude="heading">...</a></div>
       ...
     </div>
  * ```
  *

  **/



    function accordionTransclude($filter) {
        return {
            require: '^sitAccordionGroup',
            link: function (scope, element, attr, controller) {
                scope.$watch(function () { return controller[attr.sitAccordionTransclude]; }, function (heading) {
                    if (heading) {
                        var START_INDEX = 3;
                        element.html('');
                        element.append(heading);
                        //heading tooltip
                        if (heading[0].textContent.indexOf('|') !== -1) {
                            var titleString = heading[0].textContent.substring(START_INDEX, heading[0].textContent.indexOf('|') - 1);
                            element[0].title = $filter('translate')(titleString);
                        } else {
                            element[0].title = heading[0].textContent;
                        }

                    }

                });
            }
        };
    }

    angular.module('siemens.simaticit.common.widgets.accordion').directive('sitAccordionTransclude', ["$filter", accordionTransclude]);

})();

