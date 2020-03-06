/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.advancedSelect
 * @description
 * Contains UI elements that let a user select single or mulitple items from a bootstrap-style dropdown
 *
 * Depends on the following modules:
 * * **ui.bootstrap**
 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.advancedSelect', ['ui.bootstrap']);

})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.advancedSelect').directive('sitAdvancedSelect', AdvancedSelectDirective);
    angular.module('siemens.simaticit.common.widgets.advancedSelect').filter('groupBy', groupBy);
    AdvancedSelectDirective.$inject = ['$timeout', '$window'];
    function AdvancedSelectDirective($timeout, $window) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                readOnly: '=sitReadOnly',
                sitOptions: '=sitOptions',
                sitSelectedString: '=',
                sitSplitList: '=',
                sitPlaceholder: '=sitPlaceholder',
                sitDoneCallback: '&',
                validation: '=sitValidation',
                ngBlur: '&?',
                sitChange: '=?',
                ngDisabled: '=?',
                ngFocus: '&?',
                ngReadonly: '=?',
                multiSelect: '=?sitMultiSelect',
                sitToGroup: '=?'
            },
            templateUrl: 'common/widgets/advancedSelect/sit-advanced-select.html',
            controllerAs: 'ctrl',
            controller: AdvancedSelectController,
            link: function (scope, element, attr, ctrl) {
                var KEY_UP = 38,
                    KEY_DOWN = 40,
                    ENTER_KEY = 13,
                    ESC_KEY = 27;
                var recentKey = '',
                    currentKey = '',
                    searchIndex = 0,
                    searchList = [],
                    LI_ITEM_SELECTION_DELAY = 50,
                    DROPDOWN_TOGGLE_DELAY = 100,
                    KEY_STROKE_DELAY = 500;

                ctrl.isFalsy = function (selectable) {
                    return !selectable.selected;
                };

                function selectDropDown() {
                    // build the comma-delimited string of selected items
                    //var selectedObjs = scope.sitOptions.filter(function (selectable) { return selectable.selected; });
                    ctrl.updateSelectedString();
                    if (ctrl.sitDoneCallback) {
                        ctrl.sitDoneCallback();
                    }
                }

                function setDropDownWidth() {
                    var scrollWidth;
                    var multiSelectListWidth = element.find('button')[0].offsetWidth;
                    var rowList = element.find('ul').children('li');
                    rowList.css('width', 'inherit');
                    if (rowList.length > 0) {
                        scrollWidth = element.find('ul')[0].scrollWidth;
                        if (scrollWidth > multiSelectListWidth) {
                            rowList.css('width', scrollWidth - 1);
                        }
                    }
                }

                var scrollToSelectedElement = function () {
                    $timeout(function () {
                        var scrollPosition = 0;
                        //selected element
                        var selectedElement = element.find("li.selected");
                        if (selectedElement.length) {
                            var elementHeight = selectedElement[0].offsetHeight;
                            var elemetTopPosition = selectedElement[0].offsetTop;
                            var elementBottomPosition = elementHeight + elemetTopPosition;

                            //ul element
                            var dropdownScrollHeight = selectedElement.parent()[0].scrollTop;
                            var dropdownViewHeight = selectedElement.parent()[0].clientHeight;
                            var scrolledHeight = dropdownViewHeight + Math.ceil(dropdownScrollHeight);

                            if (elementBottomPosition > scrolledHeight) {
                                scrollPosition = elementBottomPosition - dropdownViewHeight;
                                selectedElement.parent().scrollTop(scrollPosition);
                            } else if (elementBottomPosition < dropdownScrollHeight) {
                                scrollPosition = elemetTopPosition;
                                selectedElement.parent().scrollTop(scrollPosition);
                            }
                        }
                    }, LI_ITEM_SELECTION_DELAY);
                };

                var searchSingleSelectOptions = _.debounce(function (event) {
                    if (currentKey !== recentKey) {
                        searchList = [];
                        searchIndex = 0;
                    }
                    if (!searchList.length) {
                        ctrl.sitOptions.forEach(function (option) {
                            if (window.$UIF.Object.isString(option.name) && option.name.toLowerCase().startsWith(currentKey.toLowerCase())) {
                                searchList.push(option)
                            }
                        });

                    } else if (searchIndex === searchList.length - 1) {
                        searchIndex = 0;
                    } else {
                        searchIndex++;
                    }
                    recentKey = currentKey;
                    currentKey = '';
                    if (searchList[searchIndex]) {
                        ctrl.toggleSelected(event, searchList[searchIndex]);
                        scope.$apply();
                        scrollToSelectedElement();
                    }
                }, KEY_STROKE_DELAY);

                function activateSearch(event) {
                    if (event.keyCode !== KEY_UP
                        && event.keyCode !== KEY_DOWN
                        && event.keyCode !== ENTER_KEY
                        && event.keyCode !== ESC_KEY) {
                        currentKey += event.originalEvent.key;
                        searchSingleSelectOptions(event);
                    }
                }

                function activateKeyEvent() {
                    var dropDownElement = element.find('ul.dropdown-menu');
                    dropDownElement.focus();
                    dropDownElement.on('keydown', navigate);
                }

                function navigate(event) {
                    var itemId, selected;
                    if (event.keyCode === KEY_UP) {
                        selected = element.find("li.selected");
                        if (selected.length === 0) {
                            ctrl.toggleSelected(event, ctrl.sitOptions[0]);
                            scope.$apply();
                        } else if (selected.prev().length === 0) {
                            itemId = selected.siblings().last().attr('data-internal-type');
                        } else {
                            itemId = selected.prev().attr('data-internal-type');
                        }
                    } else if (event.keyCode === KEY_DOWN) {
                        selected = element.find("li.selected");
                        if (selected.length === 0) {
                            ctrl.toggleSelected(event, ctrl.sitOptions[0]);
                            scope.$apply();
                        } else if (selected.next().length === 0) {
                            itemId = selected.siblings().first().attr('data-internal-type');
                        } else {
                            itemId = selected.next().attr('data-internal-type');
                        }
                    } else if (event.keyCode === ENTER_KEY) {
                        deactivateKeyEvent();
                        element.find('div.dropdown').removeClass('open');
                        element.find('#dropdownMenuAdvanced').attr('aria-expanded', false);
                        event.preventDefault();
                    } else {
                        currentKey += event.originalEvent.key;
                        searchSingleSelectOptions(event);
                    }
                    if (itemId) {
                        var item = _.find(ctrl.sitOptions, function (option) {
                            return option.id === itemId;
                        });
                        ctrl.toggleSelected(event, item);
                        scope.$apply();
                    }
                }

                function deactivateKeyEvent() {
                    var dropDownElement = element.find('ul.dropdown-menu');
                    var inputElement = element.find('button#dropdownMenuAdvanced');
                    dropDownElement.off('keydown', navigate);
                    inputElement.focus();
                }

                function onShowDropdown() {
                    determineDropdownPosition();
                    setDropDownWidth();
                    if (!ctrl.multiSelect && !ctrl.sitToGroup) {
                        scrollToSelectedElement();
                        activateKeyEvent();
                    }
                }

                function onHideDropdown() {
                    selectDropDown();
                    if (!ctrl.multiSelect && !ctrl.sitToGroup) {
                        deactivateKeyEvent();
                    }
                }

                function onLayoutChange(event, data) {
                    var TIMEOUT = 100;
                    var MIN_LABEL_WIDTH = 50;
                    if (data.eventSource === 'layout') {
                        element.find('.dropdown.multi-select-dropdown').find('.dropdownButtonLabel').css('width', MIN_LABEL_WIDTH + "px");
                        $timeout(function () {
                            ctrl.setButtonLabelWidth();
                            setDropDownWidth();
                        }, TIMEOUT);
                    }
                }

                function determineDropdownPosition() {
                    var DOMelements = {
                        window: $window,
                        dropdownOptionsList: element.find('.multi-select-dropdown.single-selection'),
                        dropDown: element.find('ul.dropdown-menu')
                    };

                    var dropdownPosition = element.offset().top;
                    var windowHeight = DOMelements.window.innerHeight;
                    var totalDropItemHeight = DOMelements.dropDown.outerHeight();

                    DOMelements.dropdownOptionsList.removeClass('dropup dropdown');

                    if (totalDropItemHeight + dropdownPosition > windowHeight) {
                        DOMelements.dropdownOptionsList.addClass('dropup');
                    } else {
                        DOMelements.dropdownOptionsList.addClass('dropdown');
                    }
                }

                var layoutChangeListner = scope.$on('sit-layout-change', onLayoutChange);

                $timeout(function () {
                    // listing to 'shown.bs.dropdown' event of ui-bootstrap
                    element.find('.multi-select-dropdown').on('shown.bs.dropdown', onShowDropdown);

                    //register keystroke event on single select input button
                    if (!ctrl.multiSelect && !ctrl.sitToGroup) {
                        element.find('button#dropdownMenuAdvanced').on('keydown', activateSearch);
                    }
                }, DROPDOWN_TOGGLE_DELAY, false);

                // listing to 'hidden.bs.dropdown' event of ui-bootstrap
                $timeout(function () {
                    element.find('.multi-select-dropdown').on('hidden.bs.dropdown', onHideDropdown);
                }, DROPDOWN_TOGGLE_DELAY, false);

                scope.$on('$destroy', function () {
                    element.find('.multi-select-dropdown').off('shown.bs.dropdown', onShowDropdown);
                    element.find('.multi-select-dropdown').off('hidden.bs.dropdown', onHideDropdown);
                    if (!ctrl.multiSelect && !ctrl.sitToGroup) {
                        element.find('ul.dropdown-menu').off('keydown', navigate);
                        element.find('button#dropdownMenuAdvanced').off('keydown', activateSearch);
                    }
                    layoutChangeListner();
                });
            }
        };
    }
    AdvancedSelectController.$inject = ['$translate', '$scope', '$element', '$timeout'];
    /**
    * @ngdoc directive
    * @name sitAdvancedSelect
    * @access internal
    * @module siemens.simaticit.common.widgets.advancedSelect
    * @description
    * Displays a advanced-selection control.
    *
    * @usage
    * As an element:
    * ```
    *     <sit-advanced-select
                       sit-options="vm.selectValues"
                       sit-selected-string="vm.value"
                       sit-split-list="vm.splitListVisibility"
                       sit-placeholder="vm.placeHolder"
                       sit-done-callback="vm.doneCallBack"
                       sit-multi-select="vm.multiselection"
                       ng-blur="ngBlur" ng-change="ngChange" ng-disabled="ngDisabled" ng-focus="ngFocus" ng-readonly="ngReadonly">
          </sit-advanced-select>
    * ```
    * @restrict E
    *
    * @param {Object[]} sit-options Specifies the array of items available for selection. Each item is an object containing following fields:
    * * **id**: Unique string value which specifies the item in the dropdown.
    * * **name**: The string value displayed for an item in the dropdown.
    * @param {string} sit-selected-string Contains comma-seperated string of selected item IDs (Initialized to "").
    * @param {boolean} sit-split-list Specifies whether a seperator is displayed between selected items and un-selected items.
    * If value is true, seperator is displayed. Otherwise, seperator is not displayed.
    * @param {string} sit-placeholder Specifies the initial text to be displayed before user selects the items in the dropdown.
    * @param {Function} sit-done-callback Specifies the callback function to be called after dropdown is hidden from the user.
    * @param {boolean} [sit-multi-select] _(Optional)_ If this expression is truthy, widget will support for multiselection otherwise it supports single selection.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    *
    * @example
	* In a view template, the **sit-advanced-select** directive is used as follows:
	*
	* ```
	* <sit-advanced-select
                       sit-options="vm.selectValues"
                       sit-selected-string="vm.value"
                       sit-split-list="vm.splitListVisibility"
                       sit-placeholder="vm.placeHolder"
                       sit-done-callback="vm.doneCallBack">
          </sit-advanced-select>
    * ```
    *
    */
    function AdvancedSelectController($translate, $scope, $element, $timeout) {
        var ctrl = this;
        ctrl.toggleSelected = toggleSelected;
        ctrl.toggleDirection = toggleDirection;
        ctrl.getSelectedText = getSelectedText;
        ctrl.updateSelectedString = updateSelectedString;
        ctrl.setButtonLabelWidth = setButtonLabelWidth;
        ctrl.getTemplate = getTemplate;
        if (!ctrl.multiSelect && ctrl.sitOptions.length > 0) {
            _.each(ctrl.sitOptions, function (item) { item.selected = false; });
            updateSitSelectedStringName();
        }

        function updateSitSelectedStringName() {
            var selectedObject = _.find(ctrl.sitOptions, function (selectable) {
                return selectable.id === ctrl.sitSelectedString;
            });
            if (selectedObject && (selectedObject.name !== undefined && selectedObject.name !== null && selectedObject.name !== '')) {
                ctrl.sitSelectedStringName = selectedObject.name;
                if (!selectedObject.selected) {
                    selectedObject.selected = true;
                }
            } else {
                ctrl.sitSelectedStringName = '';
            }
        }

        if (!ctrl.multiSelect) {
            var optionListner = $scope.$watch(function () {
                return ctrl.sitOptions;
            }, function (newValue, oldValue) {
                if (newValue.length !== oldValue.length) {
                    updateSitSelectedStringName();
                }
            });

            var selectionChangeListner = $scope.$watch(function () {
                return ctrl.sitSelectedString;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    _.each(ctrl.sitOptions, function (item) { item.selected = false; });
                    updateSitSelectedStringName();
                }
            });

            $scope.$on('$destroy', function () {
                selectionChangeListner();
                optionListner();
            });
        }

        function getTemplate() {
            if (ctrl.multiSelect) {
                return 'common/widgets/advancedSelect/multi-selection.html';
            } else {
                return 'common/widgets/advancedSelect/single-selection.html';
            }
        }

        if (ctrl.multiSelect && ctrl.sitSelectedString && typeof ctrl.sitSelectedString === 'string') {
            var selectedOptions = ctrl.sitSelectedString.split(',');
            selectedOptions.forEach(function (option, index) {
                var filteredOption = _.find(ctrl.sitOptions, function (item) {
                    return item.id === option;
                });
                if (filteredOption) {
                    filteredOption.selected = true;
                }
            });
        }

        function setButtonLabelWidth() {
            var LABEL_OFFSET_WIDTH = 40;
            var dropWidth = $element.find('.dropdown.multi-select-dropdown')[0] ? $element.find('.dropdown.multi-select-dropdown')[0].offsetWidth : "";
            $element.find('.dropdown.multi-select-dropdown').find('.dropdownButtonLabel').css('width', (dropWidth - LABEL_OFFSET_WIDTH) + "px");
        }

        function toggleSelected($event, selectable) {
            //.preventDefault();
            if (ctrl.multiSelect) {
                $event.stopPropagation();
            } else {
                clearSelection();
            }
            selectable.selected = !selectable.selected;
            ctrl.updateSelectedString();
        }

        function clearSelection() {
            ctrl.sitOptions.forEach(function (selectable) { selectable.selected = false; });
            ctrl.sitSelectedString = '';
            ctrl.setButtonLabelWidth();
        }

        function toggleDirection($event, selectable) {
            $event.stopPropagation();
            selectable.direction = (selectable.direction === 'desc') ? 'asc' : 'desc';
        }

        function getSelectedText() {
            var selCount = 0;
            var selDisplayName = '';
            ctrl.sitOptions.forEach(function (selectable) {
                if (selectable.selected) {
                    selCount++;
                    selDisplayName = selectable.name;
                }
            });
            if (selCount === 0) {
                return ctrl.sitPlaceholder;
            } else if (selCount === 1) {
                return selDisplayName;
            } else if (selCount > 1) {
                // MEN - this may be a good use for ngMessageFormat, but documentation is still very weak...
                return selCount + ' ' + $translate.instant('common.selected');
            }
        }

        /**
         * bug 13061
         * If using this in the sitFilter directive, and you click the Apply button before closing
         * the dropdown (by clicking anywhere else) the Apply handler executes before the handler for the
         * dropdown closing(defined in link function below). The 'hidden.bs.dropdown' handler normally updates
         * the selectedString based on current selections. That is all that is need if you close the dropdown
         * before clicking Apply. But if you click Apply with dropdown open, the the selectedString value used
         * in the filter may not reflect current selections. So, simple workaround is to refresh it each
         * time the user changes selection.
         */
        function updateSelectedString() {
            // build the comma-delimited string of selected items
            var selectedObjs = ctrl.sitOptions.filter(function (selectable) { return selectable.selected; });
            if (ctrl.multiSelect) {
                ctrl.sitSelectedString = selectedObjs.map(function (selectable) { return selectable.id; }).join();
            } else {
                ctrl.sitSelectedString = selectedObjs.map(function (selectable) { return selectable.id; })[0];
            }
            ctrl.setButtonLabelWidth();
        }
    }
    function groupBy() {
        return _.memoize(function (items, field) {
            return _.groupBy(items, field);
        }
        );
    }
})();
