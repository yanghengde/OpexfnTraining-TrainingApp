/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @access internal
 * @name siemens.simaticit.common.widgets.columnConfigurator
 *
 * @description
 * This module provides functionalities related to display the column definations.
 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.columnConfigurator', []);

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.columnConfigurator').directive('sitColumnConfigurator', ColumnConfiguratorDirective);

    /**
       *   @ngdoc directive
       *  @access internal
       *   @name sitColumnConfigurator
       *   @module siemens.simaticit.common.widgets.columnConfigurator
       *   @description
       *   Displays provided column definations into Available Columns and the Selected Columns are visible fileds in column definations.
       *
       *   @restrict AE
       *
       *   @usage
       *   As an element:
       *   ```
       *   <div style="width:50%">
       *      <sit-column-configurator sit-config="ConfigurationObject"></sit-column-configurator>
       *   </div>
       *   ```
       *
       *   As an attribute:
       *   ```
       *   <div style="width:50%" sit-column-configurator sit-config="ConfigurationObject"></div>
       *   ```
       *   @param {Object} sitConfig For a description of this object see {@link sitConfig}
       *
       * @example
       * The following example shows how to configure a sit-column-configurator widget:
       *
       * In Controller:
       * ```
       *    (function () {
       *        SittaglistDemoController.$inject = ['common']
       *        function SittaglistDemoController(common) {
       *            var self = this;
       *            self.config = {
       *                columnDefs:[
       *                    { field: 'title', displayName: 'Title' },
       *                    { field: 'author', displayName: 'Author' },
       *                    { field: 'yearPublished', displayName: 'Year', visible: false },
       *                    { field: 'subTitle', displayName: 'Sub Title', visible: false }
       *                ]
       *            }
       *    })();
       * ```
       *
       * In Template:
       *```
       *   <sit-column-configurator sit-config="self.config"></sit-column-configurator>
       *
       *   (or)
       *
       *    <div sit-column-configurator sit-config="self.config"></div>
       *```
       *
       *
       */

    /**
    * @ngdoc type
    * @access internal
    * @name sitConfig
    * @module siemens.simaticit.common.widgets.columnConfigurator
    * @description An object containing the array of column definitions objects.
    * @property {Array<Object>} [columnDefs] Defines array of column defination objects see {@link ColumnDefs}
    */

    /**
    * @ngdoc type
    * @access internal
    * @name ColumnDefs
    * @module siemens.simaticit.common.widgets.columnConfigurator
    * @description Defines the columns to appear in the columnConfigurator.
    * Each object in the array specifies a column to be displayed in the Available columns.
    * @property {String} field Field that corresponds to one of the properties of the objects.
    * @property {String} [displayName=''] _(Optional)_  The column name displayed in the columnConfigurator.
    * @property {Boolean} [visible=true] Defines the selected column to display the data.
    * @example
    * Example array
    * ```
    *       [
    *             { field: 'title', displayName: 'Title' },
    *             { field: 'author', displayName: 'Author' },
    *             { field: 'yearPublished', displayName: 'Year', visible: false },
    *             { field: 'subTitle', displayName: 'Sub Title', visible: false }
    *       ]
    * ```
    *
    */
    ColumnConfiguratorDirective.$inject = ['$window', '$document'];
    function ColumnConfiguratorDirective($window, $document) {
        return {
            scope: {},
            bindToController: {
                sitConfig: '=sitConfig'
            },
            controller: ColumnConfiguratorController,
            controllerAs: 'columnConfiguratorCtrl',
            templateUrl: 'common/widgets/columnConfigurator/columnConfigurator.html'
        }
    }
    ColumnConfiguratorController.$inject = ['common'];
    function ColumnConfiguratorController(common) {
        var vm = this;

        function activate() {
            init();
            setOptionsAPIMethods();
        }

        function init() {
            vm.svgIcons = {
                forward: { path: './common/icons/miscBackward24.svg' },
                backward: { path: './common/icons/miscBackward24.svg' },
                left: { path: './common/icons/miscChevronLeftDouble24.svg' },
                right: { path: './common/icons/miscChevronLeftDouble24.svg' },
                reset: { path: './common/icons/cmdToPartial24.svg' },
                up: { path: './common/icons/miscUp24.svg' },
                down: { path: './common/icons/miscDown24.svg' }
            };

            vm.initialColumnDefs = $.extend(true, [], vm.sitConfig.data.columnDefs);
            _.each(vm.sitConfig.data.columnDefs, function (item, index) {
                item.selected = false;
                item.visible = typeof item.visible === 'boolean' ? item.visible : true;
                if (!item.index) {
                    item.index = index;
                }
            });

            vm.columnDefs = _.filter(vm.sitConfig.data.columnDefs, function (item) { return !item.isImageCol });
            vm.onItemSelection = onItemSelection;
            vm.selectedList = [];
            vm.remove = remove;
            vm.add = add;
            vm.addAll = addAll;
            vm.removeAll = removeAll;
            vm.reset = vm.sitConfig.reset.onClickCallback;
            vm.moveUp = moveUp;
            vm.moveDown = moveDown;
        }

        function clearSelection(visibility) {
            _.each(vm.columnDefs, function (item) {
                if (item.visible === visibility || visibility === undefined) {
                    item.selected = false;
                }
            });
        }

        function onItemSelection(col, visibility) {
            col.selected = !col.selected;
            if (col.selected) {
                vm.selectedList.push(col);
            } else {
                var index = _.findIndex(vm.selectedList, function (item) { return item === col });
                vm.selectedList.splice(index, 1);
            }
            clearSelection(visibility);
            vm.selectedList.sort(function (a, b) { return a.index - b.index; });// = _.sortBy(vm.selectedList, function (item) { return item.index });
        }

        function clearAndEmptySelection() {
            vm.selectedList = [];
            clearSelection();
        }

        function moveLeftRight(visibility) {
            _.each(vm.selectedList, function (item) { item.visible = visibility });
            clearAndEmptySelection();
        }

        function moveUp() {
            swap(-1);
        }

        function moveDown() {
            swap(1);
        }

        function swap(inc) {
            vm.selectedList.sort(function (a, b) { return a.index - b.index; });
            if (getSelectedVisibleCount() && getVisibleCount() > 1) {
                _.each(inc === 1 ? vm.selectedList.reverse() : vm.selectedList, function (item) {
                    swapIndex(item, inc);
                });
            }
        }

        function swapIndex(item, salt) {
            vm.columnDefs.sort(function (a, b) { return a.index - b.index; });

            var activeList = _.where(vm.columnDefs, { visible: true });
            var itemIndex = _.findIndex(activeList, function (i) { return i === item });
            if ((itemIndex === 0 && salt === -1) || (itemIndex === activeList.length - 1 && salt === 1)) {
                return;
            }
            else {
                var firstItem = activeList[itemIndex];
                var secondItem = activeList[itemIndex + salt];
                var tempIndex = firstItem.index;
                firstItem.index = secondItem.index;
                secondItem.index = tempIndex;
            }
        }

        function remove() {
            var visibleItemsCount = _.where(vm.columnDefs, { visible: true }).length;
            if (visibleItemsCount <= 1 || getSelectedVisibleCount() === 0) {
                clearAndEmptySelection();
            } else {
                if (vm.selectedList.length === visibleItemsCount) {
                    var minItem = _.min(vm.selectedList, function (item) { return item.index });
                    var index = _.findIndex(vm.selectedList, function (item) { return item === minItem });
                    vm.selectedList.splice(index, 1);
                }
                moveLeftRight(false);
            }
        }

        function add() {
            getSelectedInvisibleCount() === 0 ? clearAndEmptySelection() : moveLeftRight(true);
        }

        function addAll() {
            _.each(vm.columnDefs, function (item) { item.visible = true });
            clearAndEmptySelection();
        }

        function removeAll() {
            if (vm.columnDefs.length) {
                var minItem = _.min(_.where(vm.columnDefs, { visible: true }), function (item) { return item.index });
                minItem.visible = true;
                _.each(vm.columnDefs, function (item) { if (item !== minItem) item.visible = false });
                clearAndEmptySelection();
            }
        }

        function getVisibleCount() {
            return _.where(vm.columnDefs, { visible: true }).length;
        }

        function getSelectedVisibleCount() {
            return _.where(vm.selectedList, { visible: true }).length;
        }
        function getSelectedInvisibleCount() {
            return _.where(vm.selectedList, { visible: false }).length;
        }


        function getSelectedColumns() {
            return _.where(vm.columnDefs, { visible: true });
        }

        function getAvailableColumns() {
            return _.where(vm.columnDefs, { visible: false });
        }

        function getInitialColumnDefs() {
            return vm.initialColumnDefs;
        }

        function setOptionsAPIMethods() {
            vm.sitConfig.getSelectedColumns = getSelectedColumns;
            vm.sitConfig.getAvailableColumns = getAvailableColumns;
            vm.sitConfig.getInitialColumnDefs = getInitialColumnDefs;
        }
        activate();


    }
})();
