/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
	'use strict';

	/**
	 * @ngdoc module
	 * @name siemens.simaticit.common.widgets.grid
	 * @description
	 * This module provides functionalities to display, sort, and filter the information shown in a grid.
	 *
	 * It depends on the following modules:
	 * * **ngGrid**
	 * * **ngGrid.services**
	 * * **siemens.simaticit.common.services.filterSort**
	 * * **siemens.simaticit.common.widgets.pager**
	 */
	angular.module('siemens.simaticit.common.widgets.grid', [
        'ngGrid',
        'ngGrid.services',
        'siemens.simaticit.common.widgets.pager'
	]);
})();

(function () {
    'use strict';

    /**
	 * @ngdoc directive
	 * @module siemens.simaticit.common.widgets.grid
	 * @name sitGrid
	 * 
	 * @requires $timeout
	 * @requires $log
	 * 
	 * @restrict E
	 * 
	 * @description 
	 * A configurable widget to show a collection of data items in a grid format.
	 *
	 * The actual grid implementation uses <a href="http://www.github.com/angular-ui/ng-grid/tree/2.x">ngGrid.</a>
     * **sitGrid** wraps **ngGrid** to provide a consistent look and feel with other unity widgets.
     * 
     * @param {Object[]} sitGridData An array of the data objects to be displayed in the grid.
	 * <br><br>
	 * If **serverDataOptions** are specified in the **sitGridOptions** parameter, then data is retrieved 
	 * from a server. Any data items assigned to this property will be ignored.
     * 
     * @param {GridOptions} sitGridOptions For a description of this object see {@link GridOptions}.
     * 
     * @example
     * In a view template, you can use the **sitGrid** as follows:
     * ```
     *       <sit-grid sit-grid-data="vm.gridData" sit-grid-options="vm.gridOptions"></sit-grid>
     * ```
     * 
     * In the corresponding view controller, add **gridData** and **gridOptions** objects
     * to the vm. 
     * ```
     *   // gridData defines the data objects to show
	 *   vm.gridData = [
	 *	    {
     *		   title: 'Dune',
     *		   author: 'Frank Herbert',
     *		   yearPublished: 1965,
     *         subTitle: 'A spice addicts guide to world domination.',
     *         access: [{Name:'Operator'}, {Name: 'Plant Moderator'}, {Name:'Plant Administrator'}, {Name:'Assembler'}] 
	 *      },
	 *      {
	 *         title: 'Hitchhikers Guide to the Galaxy',
	 *         author: 'Douglas Adams',
	 *         yearPublished: 1979,
	 *         subTitle: 'How to get lost in space without really trying.',
     *         access: [{Name:'Investor'}, {Name:'Plant Administrator'}, {Name:'Quality Manager'}, {Name:'Plant Moderator'}] 
	 *      },
	 *  ];
	 *  
     * 
     *
	 *   // gridOptions configures how to show the data
	 *   vm.gridOptions = {
	 *      containerID: 'myGridContainer',
	 *      gridConfig: {
	 *          columnDefs: [
     *		        { field: 'title', displayName: 'Title' },
     *		        { field: 'author', displayName: 'Author', resizable: false },
     *		        { field: 'yearPublished', displayName: 'Year' }
	 *          ]
	 *      },
     *      tagField : 'access',
	 *      groupField: '',
	 *      groupFields: ['title', 'author', 'yearPublished'],
	 *      onSelectionChangeCallback: ctrl.mySelectionChangeHandler,
	 *      selectionMode: 'multi',
	 *      sortInfo: {
	 *          fields: ['author'],
	 *          directions: ['asc']
	 *      },
     *      rowHeight:50,
     *      gridContainerClass:'gridCustomClass',
     *      uniqueID:'Name'
	 *   }
     * ``` 
	 */
    angular.module('siemens.simaticit.common.widgets.grid').directive('sitGrid', GridDirective);

    GridDirective.$inject = ['$log', '$window', '$timeout'];
    function GridDirective($log, $window, $timeout) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                sitGridData: '=sitGridData',
                sitGridOptions: '=sitGridOptions',
                sitFormat: '=?sitFormat'
            },
            controller: GridController,
            controllerAs: 'gridCtrl',
            link: linkFn,
            templateUrl: 'common/widgets/grid/grid.html'
        };

        function linkFn(scope, element, attr, ctrl) {
            var logger, currentPageNum, eventListners = [];
            var sitGridDataWatchHandler;

            activate();
            function activate() {
                logger = new LogWrapper($log, ctrl.sitGridOptions.debug, 'siemens.simaticit.common.widgets.grid.link');
                ctrl.apiSorting = false;   // to know when we need to notify a parent the sort has changed
                assignGridVisibleCols();
                ctrl.gridResizeEvent(element.parent().width());
                exposeApi();
                subscribeEvents();
                subscribeICVCallback();
            }



            function exposeApi() {
                ctrl.bindScroll = bindScroll;
                ctrl.initPaginationOptions = initPaginationOptions;
            }

            function subscribeEvents() {
                scope.$on('$destroy', onDirectiveDestroy);
                eventListners[eventListners.length] = scope.$on('sit-layout-change', onlayoutChange);
                eventListners[eventListners.length] = scope.$on('sit-filter-panel-opened', onfilterPanelOpened);
                eventListners[eventListners.length] = scope.$on('sit-filter-panel-closed', onFilterPanelClosed);

                scope.$watch('gridCtrl.gridOptions.sortInfo', onSortInfoChange, true);
                scope.$watch('gridCtrl.sitGridOptions', onGridOptionsChange);
                scope.$watch('gridCtrl.sitGridOptions.columnDefs', onColumnDefsChange);
                scope.$watch('gridCtrl.sitGridOptions.serverConnectionParams', onServerSettingsChange);
                scope.$watch('gridCtrl.sitGridOptions.quickSearchOptions.filterText', onQuickSearchChange);
                scope.$watch('gridCtrl.sitGridOptions.groups', onGroupsChange);

                scope.$evalAsync(initializeHeight);
            }

            function initPaginationOptions(totalDataCount) {
                ctrl.paginationOptions = ctrl.paginationOptions || {
                    $init: function () {
                        this.$subscribe('onPageSizeChange', function (eventArgs) {
                            onPageSizeChange(eventArgs.size);
                        });

                        this.$subscribe('onPageChange', function (eventArgs) {
                            onCurrentPageChange(eventArgs.pageNumber);
                        });
                    }
                };

                ctrl.paginationOptions.type = ctrl.sitGridOptions.pagingOptions.type || 'extended';
                ctrl.paginationOptions.totalDataCount = totalDataCount || 0;
                ctrl.paginationOptions.pageSize = window.$UIF.Function.safeCall(ctrl.sitConfig, 'pageManager') && ctrl.sitConfig.pageManager.getPageSize() || ctrl.sitGridOptions.pagingOptions.pageSize || 10;
                ctrl.paginationOptions.currentPage = window.$UIF.Function.safeCall(ctrl.sitConfig, 'pageManager') && ctrl.sitConfig.pageManager.getCurrentPage() || 1;
                ctrl.paginationOptions.selectedItemsCount = ctrl.selectedItems.length;
            }

            function subscribeICVCallback() {
                //assign a callback function to sitGridOptions when ICV is configured Or activate watch service when grid is configured.
                if (ctrl.sitGridOptions.parent === 'ICV') {
                    ctrl.sitGridOptions.onDataChange = onDataChange;
                } else {
                    activateWatchOnCollection();
                }
            }

            function onfilterPanelOpened() {
                ctrl.isFilterPanelOpen = true;
                scope.$broadcast('sit-layout-change', { eventSource: 'layout' });
            }

            function onFilterPanelClosed() {
                scope.$broadcast('sit-layout-change', { eventSource: 'layout' });
            }

            function onlayoutChange(event, data) {
                //triggering ngGrid resize event
                if (data.eventSource === 'layout' || data.eventSource === 'nonModal') {
                    $(window).trigger('resize.nggrid');
                    onWindowResize();
                }
            }

            /** A callback function assigned to sitGridOptions when ICV is configured. 
              *This function is called when local-data set changed from ICV.       
              */
            function onDataChange(gridData) {
                ctrl.sitGridData = gridData;
                ctrl.setPageManager();
                onGridDataChange(gridData);
            }

            /**
             * Handle change in the sortInfo object to force sorting on the entire data set rather than just current page.
             * - using gridOptions.sortBy() only sorts the current page.
             */
            function onSortInfoChange(newVal, oldVal) {
                //30073 Fix:do something only if sorting field or direction changes
                if (newVal === oldVal || (newVal.fields[0] === oldVal.fields[0] && newVal.directions[0] === oldVal.directions[0])) {
                    return;
                }
                ctrl.isSorted = true;
                ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
                ctrl.totalServerItemsLoadedCount = 0;
                ctrl.pageManager.setSortInfo(newVal.fields[0], newVal.directions[0]);
                window.$UIF.Function.safeCall(ctrl.sitConfig, 'pageManager') && ctrl.sitConfig.pageManager.setCurrentPage(1) || ctrl.pageManager.setCurrentPage(1);
                ((ctrl.sitGridOptions.enablePaging && !ctrl.grouping) ? ctrl.pageManager.goToPage(1) : ctrl.pageManager.getAllData())
                    .then(function (result) {
                        ctrl.setSlicedData(result.data);
                        ctrl.updateSelectedItems();
                        ctrl.initPaginationOptions(result.totalDataSize);
                        window.$UIF.Function.safeCall(ctrl, 'paginationOptions.api.draw');
                        $('#data-container').scrollTop(0);
                        if (!ctrl.apiSorting && newVal.fields.length > 0) {
                            ctrl.emitSortInfoChanged(newVal);
                        }
                        logger.log('watch: gridOptions.sortInfo', 'sort changed success');
                    }, function (reason) {
                        ctrl.handleError(reason);
                        logger.error('watch: gridOptions.sortInfo', 'sort changed error');
                    }).finally(function () {
                        ctrl.apiSorting = false;
                    });
            }

            /**
             * Handle a change in current page.
             * - Get new grid data from the page manager.
             * - Emit an event to notify parent of page change.
             */
            function onCurrentPageChange(newVal, oldVal) {
                if (newVal === oldVal || isNaN(newVal)) {
                    return;
                }
                ctrl.sitConfig.pageManager && ctrl.sitConfig.pageManager.setCurrentPage(newVal);
                ctrl.pageManager.goToPage(newVal)
                    .then(function (result) {

                        ctrl.setSlicedData(result.data);
                        ctrl.updateSelectedItems();
                        if (ctrl.sitGridOptions.noScroll === true) {
                            $timeout(function () {
                                $(window).trigger('resize');
                            }, 100);
                        }

                        $('#data-container').scrollTop(0);

                        /** ngGrid fires an event 'ngGridEventData' on data in ngGrid is loaded
                          * page change event is fired when grid data is completly loaded
                          */
                        var gridPageChangeEvent = scope.$on('ngGridEventData', function (event, data) {
                            ctrl.emitPageChanged(newVal);
                            gridPageChangeEvent();
                        });
                        logger.log('watch: pagingOptions.currentPage', 'page changed sucess.  Old: ' + oldVal + ', New: ' + newVal);
                    }, function (reason) {
                        ctrl.handleError(reason);
                        logger.error('watch: pagingOptions.currentPage', 'page changed error.  Old: ' + oldVal + ', New: ' + newVal);
                    });
            }

            /**
             * Handle a change in page size.
             * - Get new grid data from page manager.
             * - Update current page because page manger will try set new current page so same first row is showing.
             * - Emit an event to notify parent of page size change.
             */
            function onPageSizeChange(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                ctrl.pageManager.setCurrentPage(1);                     // when page size is changed, navigate to the 1st page always
                ctrl.sitConfig.pageManager && ctrl.sitConfig.pageManager.setPageSize(newVal);
                ctrl.pageManager.setPageSize(newVal);
                ctrl.pageManager.getPageData()
                    .then(function (result) {
                        if (ctrl.sitGridOptions.noScroll === true) {
                            $timeout(function () {
                                $(window).trigger('resize');
                            }, 100);
                        }
                        ctrl.preventCurrentPageWatch(result.currentPage);
                        ctrl.setSlicedData(result.data);
                        ctrl.updateSelectedItems();
                        $('#data-container').scrollTop(0);
                        ctrl.emitPageSizeChanged(newVal);
                        logger.log('watch: pagingOptions.pageSize', 'page size changed success.  Old: ' + oldVal + ', New: ' + newVal);
                    }, function (reason) {
                        ctrl.handleError(reason);
                        logger.log('watch: pagingOptions.pageSize', 'page size changed error.  Old: ' + oldVal + ', New: ' + newVal);
                    });
            }

            /**
             * Handle a change in the local data source.
             * - this must be ignored when configured to use server data
             * - resets the grid to allow showing a completely new set of data when data is bound locally.
             */
            function onGridDataChange(newVal, oldVal) {
                var newLen = newVal ? newVal.length : 'undefined';
                var oldLen = oldVal ? oldVal.length : 'undefined';
                logger.info('watch: sitGridData (grid) new len: ' + newLen + ', old len: ' + oldLen + ', new===old: ' + (newVal === oldVal).toString());
                if (newVal !== oldVal && (!ctrl.pageManager || !ctrl.pageManager.isServerData())) {
                    logger.info('watch: sitGridData', 'data changed, length = ' + ctrl.sitGridData.length);
                    ctrl.buildSelectedList();
                    ctrl.resetGrid(true, false).then(function () {
                        triggerPagerSorting();
                        triggerResize();
                    }, function () {
                        triggerPagerSorting();
                        triggerResize();
                    });
                }
            }

            /**
             * Handle a change of the grid options object.
             */
            function onGridOptionsChange(newVal, oldVal) {
                if (newVal !== oldVal) {
                    logger.info('watch: sitGridOptions', 'grid options changed');
                    ctrl.resetGrid(false, false);
                }
            }

            /**
             * Handle a change in the column definitions.
             * - resets the grid to allow correct showing of new columns.
             */
            function onColumnDefsChange(newVal, oldVal) {
                if (newVal !== oldVal) {
                    logger.info('watch: sitGridOptions.columnDefs', 'column definitions changed, length = ' + ctrl.sitGridOptions.columnDefs.length);
                    assignGridVisibleCols();
                    ctrl.resetGrid(false, false);
                }
            }

            /**
             * Handle a change in the server connection parameters
             * - resets the grid to allow showing a completely new set of data when data managed from a server.
             */
            function onServerSettingsChange(newVal, oldVal) {
                if (newVal !== oldVal) {
                    ctrl.resetGrid(true, false);
                }
            }

            /**
             * Handle a change in the quick search filter text
             */
            function onQuickSearchChange(newVal, oldVal) {
                if (newVal !== oldVal) {
                    ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
                    ctrl.totalServerItemsLoadedCount = 0;
                    ctrl.pageManager.setSearchText(newVal);
                    ctrl.updateDataOnFilterChange();
                }
            }

            /**
             * Handle a change in the grouping field
             */
            function onGroupsChange(newVal, oldVal) {
                if (!angular.isArray(newVal) || !angular.isArray(oldVal)) return;
                if (newVal[0] !== oldVal[0]) {
                    ctrl.isGroupedBy = true;
                    ctrl.grouping = ctrl.sitGridOptions.groups && ctrl.sitGridOptions.groups.length > 0;
                    if (newVal.length === 0) {
                        ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
                    }
                    ctrl.totalServerItemsLoadedCount = 0;
                    logger.log('watch: sitGridOptions.groups', 'grouping: ' + ctrl.grouping);
                    ctrl.resetGrid(false, false);
                }
            }

            function initializeHeight() {
                $timeout(function () {
                    ctrl.initializeHeight();
                    if (ctrl.handleResize) {
                        angular.element($window).bind('resize', onWindowResize);
                    }
                });
            }

            function onDirectiveDestroy() {
                if (ctrl.handleResize) {
                    angular.element($window).unbind('resize', onWindowResize);
                }

                if (!ctrl.gridOptions.enablePaging && ctrl.pageManager.isServerData()) {
                    element.find('div[id=data-container]').unbind('scroll', onScroll);
                }
                angular.forEach(eventListners, function (listner) {
                    listner();
                });
                ctrl.paginationOptions = null;
            }

            function onWindowResize() {
                window.setTimeout(function () {
                    ctrl.setHeight();
                    ctrl.gridResizeEvent(element.parent().width());
                });
            }

            function onScroll(event) {
                ctrl.serverItemsLoadCount = 10;
                ctrl.isScrollUpdate = false;
                var scrollHeight = $(this).prop("scrollHeight");
                var containerHeight = $(this).height();
                var trackLength = scrollHeight - containerHeight;
                var scrollTop = $(this).scrollTop();
                var scrollPercentage = Math.floor(scrollTop / trackLength * 100);
                if (scrollPercentage >= 95 && ctrl.totalServerItemsLoadedCount !== ctrl.totalDataItems && !ctrl.grouping && !ctrl.isQuickSearched && !ctrl.isSorted && !ctrl.isFilterPanelOpen) {
                    ctrl.isScrollUpdate = true;
                    ctrl.resetGrid(false, false);
                }
            }

            function bindScroll() {
                if (ctrl.pageManager.isServerData() && !ctrl.sitGridOptions.enablePaging) {
                    $timeout(function () {
                        element.find('div[id=data-container]').unbind('scroll', onScroll);
                        element.find('div[id=data-container]').bind('scroll', onScroll);
                    }, 1000);
                }
            }


            function activateWatchOnCollection() {
                sitGridDataWatchHandler = scope.$watchCollection('gridCtrl.sitGridData', onGridDataChange);
            }

            function deActivateWatchOnCollection() {
                sitGridDataWatchHandler();
                sitGridDataWatchHandler = null;
            }

            function assignGridVisibleCols() {
                ctrl.gridVisibleCols = [];
                angular.forEach(ctrl.sitGridOptions.columnDefs, function (obj) {
                    if (obj.visible || obj.visible === undefined) {
                        ctrl.gridVisibleCols.push($.extend(true, {}, obj));
                    }
                });
            }

            function triggerPagerSorting() {
                if (undefined === ctrl.sitGridData || null === ctrl.sitGridData || ctrl.sitGridData.length <= 1) {
                    return;
                }
                ctrl.sitGridOptions.parent !== 'ICV' && deActivateWatchOnCollection();
                ctrl.pageManager.setSortInfo(ctrl.gridOptions.sortInfo.fields[0], ctrl.gridOptions.sortInfo.directions[0]);
                updateSlicedData();
                ctrl.sitGridOptions.parent !== 'ICV' && activateWatchOnCollection();
            }

            function updateSlicedData() {
                ((ctrl.sitGridOptions.enablePaging && !ctrl.grouping) ? ctrl.pageManager.getPageData() : ctrl.pageManager.getAllData())
                    .then(function (result) {
                        ctrl.setSlicedData(result.data);
                        ctrl.updateSelectedItems();
                    }, function () {
                    });
            }

            function triggerResize() {
                if (ctrl.sitGridOptions.noScroll === true) {
                    $timeout(function () {
                        $(window).trigger('resize');
                    }, 100);
                }
            }
        }
    }

    GridController.$inject = ['$scope', 'common', 'common.widgets.grid.service', 'common.widgets.pager.pageService', '$translate', '$timeout', '$state', 'LOG_TYPES', '$window', '$filter', '$element', '$q'];
    function GridController($scope, common, gridService, pageService, $translate, $timeout, $state, LOG_TYPES, $window, $filter, element, $q) {
        var vm = this;
        var FOOTER_HEIGHT = 48;
        var sitConfig, logInfoFn, logErrorFn, currentPageSelectedItems, isRefreshCompactServerSideData;
        vm.serverItemsLoadCount = 0;
        vm.initialDataItemsCount = 0;
        vm.totalServerItemsLoadedCount = 0;
        vm.isQuickSearched = false;
        vm.isSorted = false;
        vm.isGroupedBy = false;
        vm.isFilterPanelOpen = false;

        activate();
        function activate() {
            //Adding columndefs for svg based icons
            if (vm.sitGridOptions && vm.sitGridOptions.svgIcon && vm.sitGridOptions.columnDefs.length && !(vm.sitGridOptions.columnDefs[0].isImageCol)) {
                vm.sitGridOptions.columnDefs.unshift({ cellTemplate: '<img src="' + vm.sitGridOptions.svgIcon + '" height="100%" width="100%" />', width: '20px', resizable: false, isImageCol: true });
            } else if (vm.sitGridOptions && vm.sitGridOptions.typeIcon && vm.sitGridOptions.columnDefs.length && !(vm.sitGridOptions.columnDefs[0].isImageCol)) {
                vm.sitGridOptions.columnDefs.unshift({ cellTemplate: '<img src="' + 'common/icons/type' + vm.sitGridOptions.typeIcon + '48.svg" height="100%" width="100%" />', width: '20px', resizable: false, isImageCol: true });
            }
            init();
            initializeEventsEmitMethods();
            $timeout(function () {
                $(window).trigger('resize');
                sortBy(vm.gridOptions.sortInfo.fields[0], vm.gridOptions.sortInfo.directions[0]);
            }, 100);
            //30073 Fix:
            vm.pageManager.setSortInfo(vm.gridOptions.sortInfo.fields[0], vm.gridOptions.sortInfo.directions[0]);
            vm.sitGridOptions && vm.sitGridOptions.tagField && addTags();
            if (undefined === vm.sitGridData || null === vm.sitGridData || 0 === vm.sitGridData.length) {
                return;
            }
            buildSelectedList();
        }

        function addTags() {
            var tagsColName, tagsField;
            var tagsColumnPresent = false;

            if (typeof vm.sitGridOptions.tagField === 'string') {
                tagsColName = tagsField = vm.sitGridOptions.tagField;
            } else {
                tagsField = vm.sitGridOptions.tagField.field;
                tagsColName = vm.sitGridOptions.tagField.displayName ? vm.sitGridOptions.tagField.displayName : tagsField;
            }

            tagsColumnPresent = _.some(vm.sitGridOptions.columnDefs, function (column) {
                if (column.field === tagsField) {
                    return true;
                }
            });

            if (tagsColumnPresent) {
                return;
            }

            var tagObj = {
                field: tagsField,
                displayName: tagsColName,
                cellTemplate: "<div  id='data-cell-container' class='ngCellText' ng-class='col.colIndex()'><sit-tag-list ng-show='row[\"entity\"][\"" + tagsField + "\"].length > 0' sit-data='row[\"entity\"][\"" + tagsField + "\"]'></sit-tag-list></div>"
            };
            if (vm.sitGridOptions.columnDefs && Array.isArray(vm.sitGridOptions.columnDefs)) {
                vm.sitGridOptions.columnDefs.push(tagObj);
            }
        }

        function init() {
            //instance variable from directive attributes....
            //sitGridData, sitGridOptions, sitFormat
            logInfoFn = common.logger.getLogFn('siemens.simaticit.common.widgets.grid.controller', LOG_TYPES.LOG_INFO);
            logErrorFn = common.logger.getLogFn('siemens.simaticit.common.widgets.grid.controller', LOG_TYPES.LOG_ERROR);

            sitConfig = gridService.setGridConfigurationDefaults(vm.sitGridOptions);
            vm.sitConfig = sitConfig;
            vm.sitGridOptions.enablePaging = vm.sitGridOptions.enablePaging === undefined ? (vm.sitGridOptions.showPager !== undefined ? vm.sitGridOptions.showPager : vm.sitGridOptions.alwaysShowPager != undefined ? vm.sitGridOptions.alwaysShowPager : true) : vm.sitGridOptions.enablePaging;

            vm.handleError = handleError;
            vm.setPageManager = setPageManager;
            vm.settingGridHeight = settingGridHeight;
            vm.setPageManager();

            vm.selectedItems = [];
            assignSelectedItems();
            vm.currentPage;
            vm.initialPageCount = 1; //dummy value for gridConfig until resetGrid sets actual value after getting data.

            vm.afterSelectionChange = afterSelectionChange;
            vm.notifySelectionChanged = notifySelectionChanged;
            //api methods used in ng-grid options setup
            initializeOptionsAPIMethods();

            vm.get2LetterCultureCode = get2LetterCultureCode;
            vm.updateGridOptions = updateGridOptions;
            vm.updateGridOptions(true);
            vm.grouping = vm.sitGridOptions.groups && vm.sitGridOptions.groups.length > 0;
            vm.setHeight = setHeight;
            vm.initializeHeight = initializeHeight;
            vm.setSlicedData = setSlicedData;

            //need to set something for ngGrid. will get changed when resetGrid runs after data load
            vm.setSlicedData([]);
            vm.colDefs = sitConfig.columnDefs;
            //vm.totalDataItems = 0;

            vm.updateSelectedItems = updateSelectedItems;
            vm.resetGrid = resetGrid;
            if (!vm.pageManager.isServerData() || vm.gridOptions.enablePaging) {
                vm.resetGrid(true, false);
            }

            vm.updateDataOnFilterChange = updateDataOnFilterChange;

            vm.setOptionsAPIMethods = setOptionsAPIMethods;
            vm.setOptionsAPIMethods();

            // now that api funcs are defined, set callback to ngGrid options
            vm.gridOptions.selectAggregateCallback = vm.selectItems;
            vm.gridResizeEvent = gridResizeEvent;
            vm.buildSelectedList = buildSelectedList;
            vm.sitGridOptions.noData = true;
        }

        function initializeOptionsAPIMethods() {
            vm.selectItems = selectItems;
            vm.selectAll = selectAll;
            vm.sortBy = sortBy;
            vm.dataUpdated = dataUpdated;
            vm.getSelectedItems = getSelectedItems;
            vm.setFilter = setFilter;
            vm.getCurrentData = getCurrentData;
            vm.setServerSideItemCount = setServerSideItemCount;
        }

        function initializeEventsEmitMethods() {
            vm.emitPageChanged = emitPageChanged;
            vm.emitPageSizeChanged = emitPageSizeChanged;
            vm.emitSortInfoChanged = emitSortInfoChanged;
            vm.emitItemSelectionChanged = emitItemSelectionChanged;
            vm.preventCurrentPageWatch = preventCurrentPageWatch;
        }

        function handleError(commandResponse) {
            if (vm.sitGridOptions.onErrorCallback) {
                vm.sitGridOptions.onErrorCallback(commandResponse);
            } else {
                var error = commandResponse.data.error;
                var errorMsg = ': ' + $translate.instant('common.error-code-message', { code: error.errorCode, message: error.errorMessage });
                vm.gridOptions.noDataMessage += errorMsg;
                vm.setSlicedData([]);
            }
        }

        function assignSelectedItems() {
            if (vm.sitGridOptions.selectedItems) {
                angular.forEach(vm.sitGridOptions.selectedItems, function (item) {
                    if (item.selected) {
                        vm.selectedItems.push(item);
                    }
                });
            }
        }

        // ensure use of page manager set by parent (if one exists)
        function setPageManager() {
            // the data service needs a sortInfo object of the form { field: '', direction: '' }
            // don't want to change the existing config object, so clone it and update the sortInfo
            var configCopy = $.extend({}, sitConfig);
            configCopy.sortInfo = {
                field: sitConfig.sortInfo.fields.length > 0 ? sitConfig.sortInfo.fields[0] : '',
                direction: sitConfig.sortInfo.directions.length > 0 ? sitConfig.sortInfo.directions[0] : ''
            };
            vm.pageManager = sitConfig.pageManager ? sitConfig.pageManager : pageService.getPageManager(configCopy, vm.sitGridData);
        }

        /**
         * Handle selection change event from ng-grid.
         * - Emits an event passing a collection of the selected itmes.
         * - This gets triggered once for the item that is unselected and once for the item that is selected.
         * - event always seems to be undefined
         */
        function afterSelectionChange(rowItem) {
            var selItem = [];
            if (Array.isArray(rowItem)) {
                var i, length = rowItem.length;
                for (i = 0; i < length; i++) {
                    rowItem[i].entity.selected = rowItem[i].selected;
                    selItem.push(rowItem[i].entity);
                }
            }
            else {
                rowItem.entity.selected = rowItem.selected;
                selItem = rowItem.entity;
            }
            if (selItem && selItem.stateTransition) {
                var st = selItem.stateTransition;
                $state.go(st.to, st.params, st.options);
            } else {
                if (vm.sitGridOptions.selectionMode === 'single') {
                    angular.forEach(vm.sitGridData, function (item) {
                        if (item !== rowItem.entity && item.selected) {
                            item.selected = false;
                        }
                    });
                }
                vm.notifySelectionChanged(selItem);
            }
            updateSelectedItemsCount();
        }

        function updateSelectedItemsCount() {
            vm.paginationOptions.selectedItemsCount = vm.selectedItems.length;
            if (vm.paginationOptions.updateSelectedItemsCount && typeof vm.paginationOptions.updateSelectedItemsCount === 'function') {
                vm.paginationOptions.updateSelectedItemsCount();
            }
        }

        function notifySelectionChanged(selItem) {
            if (!vm.blockSelectionNotifications) {
                vm.emitItemSelectionChanged(vm.selectedItems, selItem);
                if (vm.sitGridOptions.onSelectionChangeCallback) {
                    vm.sitGridOptions.onSelectionChangeCallback(vm.selectedItems, selItem);
                }
            }
        }

        function gridResizeEvent(gridContainerWidth) {
            if (!vm.sitGridOptions.enableResponsiveBehaviour || gridContainerWidth <= 0) {
                return;
            }
            if (gridContainerWidth <= 768) {
                var count = 0;
                for (var i = 0; i < vm.sitGridOptions.columnDefs.length; i++) {
                    if (vm.sitGridOptions.columnDefs[i].visible || vm.sitGridOptions.columnDefs[i].visible === undefined) {
                        count++;
                        if (count > 2) {
                            vm.sitGridOptions.columnDefs[i].visible = false;
                        }
                    }
                }
            } else {

                for (var j = 0; j < vm.sitGridOptions.columnDefs.length; j++) {
                    var index = _.findIndex(vm.gridVisibleCols, { field: vm.sitGridOptions.columnDefs[j].field });
                    if (index !== -1 && !vm.sitGridOptions.columnDefs[j].visible) {
                        vm.sitGridOptions.columnDefs[j].visible = vm.gridVisibleCols[index].visible;
                    }
                    vm.sitGridOptions.columnDefs[j].visible = typeof vm.sitGridOptions.columnDefs[j].visible === 'boolean' ? vm.sitGridOptions.columnDefs[j].visible : true;
                }
            }
        }

        /** The call to ngGridSelectItems function will be holded if grid is resetting(when resetGrid method is processing)
          * and called after the ngGrid fries 'ngGridEventData' event.
          */
        function selectItems(items, state, clear) {
            if (vm.gridResetting) {
                var ngGridSelectItemsEvent = $scope.$on('ngGridEventData', function (event, data) {
                    ngGridSelectItems(items, state, clear);
                    ngGridSelectItemsEvent();
                });
            } else {
                ngGridSelectItems(items, state, clear);
            }
        }

        /**
        * Selects the specified items and optionally clears existing selections
        * items is an array containing either of the following 
        * - indexes of the data items to select
        * - references to the actual data items
        */
        function ngGridSelectItems(items, state, clear) {
            //items is expected to be an array of numbers or objects
            if (!items || items.constructor !== Array) { return; }

            // block notifications during programmatic selection
            vm.blockSelectionNotifications = true;

            var i, index, selItem, dataItem;
            var uniqueID = vm.gridOptions.uniqueID;
            // only operate on the current page of data
            var data = $scope.slicedGridData;

            // when selecting consider option to clear existing selections
            if (state && clear) {
                for (i = 0; i < vm.selectedItems.length; i++) {
                    selItem = vm.selectedItems[i]
                    selItem.selected = false;
                }
                vm.gridOptions.selectAll(false);
            }

            // items may be either an index into the data arrary, or references to the actual objects in the data array
            if (items.length > 0) {
                if (typeof items[0] === 'number') {
                    // handle selection by index
                    for (i = 0; i < items.length; i++) {
                        index = items[i];
                        selItem = data[index];
                        if (selItem) {
                            selItem.selected = state;
                            vm.gridOptions.selectRow(index, state);
                            //vm.gridOptions.selectItem(index, state);
                        }
                    }
                } else {
                    // handle selection by data object

                    items.forEach(function (item) {
                        index = getRowIndex(item, data, uniqueID);

                        // ng-grid programatically selects items by index if the item is present in current page data
                        if (index !== -1) {
                            data[index].selected = state;
                            vm.gridOptions.selectRow(index, state);
                        } else {
                            var itemIndex = getRowIndex(item, vm.selectedItems, uniqueID);
                            if (itemIndex === -1) {
                                state && vm.selectedItems.push(item);
                            } else {
                                !state && vm.selectedItems.splice(itemIndex, 1);
                            }
                        }
                    });
                }
            }
            // re-enable notifications on UI triggered selection change 
            vm.blockSelectionNotifications = false;
            vm.notifySelectionChanged(null);
            updateSelectedItemsCount();
        }

        function getRowIndex(selectedRow, rows, uid) {
            var index = -1;
            if (typeof uid === 'function') {
                for (var i = 0; i < rows.length; i++) {
                    if (uid(selectedRow, rows[i])) {
                        index = i;
                        break;
                    }
                }
            } else {
                index = _.findIndex(rows, function (row) {
                    return (uid && typeof uid === 'string') ? row[uid] === selectedRow[uid] : row === selectedRow;
                });
            }
            return index;
        }

        /** The call to ngGridSelectAll function will be holded if grid is resetting(when resetGrid method is processing)
          * and called after the ngGrid fries 'ngGridEventData' event.
          */
        function selectAll(state) {
            if (vm.gridResetting) {
                var ngGridSelectAllEvent = $scope.$on('ngGridEventData', function (event, data) {
                    ngGridSelectAll(state);
                    ngGridSelectAllEvent();
                });
            } else {
                ngGridSelectAll(state);
            }
        }

        function ngGridSelectAll(state) {
            // ngGrid for some unknown reason clears the selected list and does not add back items already selected.
            // to selected all and have ngGrid correctly update the selected list, need to first clear all.
            // could try and fix ngGrid, but this is an easy enough workaround.
            if (state && vm.selectedItems.length > 0) {
                vm.blockSelectionNotifications = true;
                vm.gridOptions.selectAll(false);
                vm.blockSelectionNotifications = false;
            }
            if (vm.gridOptions.selectAll) {
                vm.gridOptions.selectAll(state);
            }
        }

        /**
         * returns array of selected data items
         */
        function getSelectedItems() {
            return vm.gridOptions.selectedItems;
        }

        // standard scenario should be to get language from translate service.
        // but let parent override by specifying value. (legacy processing)
        // default to english
        function get2LetterCultureCode() {
            var code = sitConfig.culture;
            if (!code) {
                var preferredLang = $translate.preferredLanguage();
                code = preferredLang ? preferredLang.substring(0, 2) : 'en';
            }
            return code;
        }

        /**
         * Translate the unity grid options to ng-grid options.
         */
        function updateGridOptions(firstUpdate) {
            if (vm.sitGridOptions === null || vm.sitGridOptions === undefined) {
                logErrorFn('vm.sitGridOptions can\'t be null or undefined');
            }

            sitConfig = gridService.setGridConfigurationDefaults(vm.sitGridOptions);
            vm.sitConfig = sitConfig;
            logInfoFn('[updateGridOptions] firstUpdate: ' + firstUpdate);

            if (vm.sitGridOptions.selectionMode === "none") {
                if ($scope.slicedGridData && vm.selectedItems.length > 0) {
                    angular.forEach($scope.slicedGridData, function (item) {
                        if (item.selected) {
                            item.selected = !item.selected;
                        }
                    });
                    vm.selectedItems.splice(0, vm.selectedItems.length);
                }
            } else if (vm.sitGridOptions.selectionMode === 'single') {
                //update slicedGridData with only one item selected when changing selection mode between single and multi
                if ($scope.slicedGridData && vm.selectedItems.length > 0) {

                    var selectedItems = vm.selectedItems.slice(vm.selectedItems.length - 1);
                    angular.forEach(vm.selectedItems, function (item) {
                        if (item.selected && item !== selectedItems[0]) {
                            item.selected = !item.selected;
                        }
                    });
                    vm.selectedItems.splice(0, vm.selectedItems.length);
                    vm.selectedItems.push(selectedItems[0]);
                }
            }
            var options = {
                //handle selecting a row to update parent with current selected items
                afterSelectionChange: vm.afterSelectionChange,

                //bind grid data to a scope variable by name allows it to watch for changes
                data: 'slicedGridData',

                //binding column defs to scope param allows for auto update 
                columnDefs: 'colDefs',

                //set custom CSS classes for odd, even, selected rows
                customRowClasses: sitConfig.customRowClasses,

                //sets whether or not any columns can be resized. Can turn off for specific column in columnDefs
                enableColumnResize: sitConfig.enableColumnResize,

                //determines if paging is allowed. true by default
                enablePaging: sitConfig.enablePaging,

                //determines if rows can be selected at all
                enableRowSelection: sitConfig.selectionMode === 'multi' || sitConfig.selectionMode === 'single',

                //set Row Height
                rowHeight: (sitConfig.rowHeight < 30 || !sitConfig.rowHeight) ? 30 : sitConfig.rowHeight,

                //globally enable/disable sorting
                enableSorting: sitConfig.enableSorting,

                //specifies the field or fields to group data by.
                groups: sitConfig.groups ? sitConfig.groups : [],

                //determines if groups are initially collapsed or not
                groupsCollapsedByDefault: sitConfig.groupsCollapsedByDefault,

                //specifies the current culture for ng-grid controlled text like 'page size'
                i18n: vm.get2LetterCultureCode(),

                //by setting false, we allow clicking a selected row to de-select it when in single selection mode
                keepLastSelected: false,

                //when selection is enabled, this determines if the user can select multiple or just a single row
                multiSelect: sitConfig.selectionMode === 'multi',

                //the string to shown when no data is bound to the grid
                noDataMessage: sitConfig.noDataMessage ? sitConfig.noDataMessage : $translate.instant('common.no-data'),


                // handles clicking the check box in a group row
                // - the ctrl func will not be defined for first call to this func, so is also set at end ctrl.
                //   have here also so it gets reset if we update the grid options
                selectAggregateCallback: vm.selectItems,

                //by binding a scope property to the selectedItems list, 
                //the grid will automatically update it with the data items corresponding to the selected rows.
                selectedItems: vm.selectedItems,

                // set show/hide of pager control. 
                // page count dependency is attempt to not show pager if all data fits on one page.
                // but only want to check this on data changing. not when user changes page size. 
                showFooter: false,

                //never show the group panel. grouping is managed via api
                showGroupPanel: false,

                //allows for setting of initial sort.
                sortInfo: sitConfig.sortInfo,

                //by binding to the scope property, the total count is automatically updated by the grid.
                totalServerItems: 'totalDataItems',

                //show check box selection column
                showSelectionCheckbox: sitConfig.showSelectionCheckbox,

                //only allow selection using the check box column (do not support for now, but leave code for possible future support)
                //selectWithCheckboxOnly: sitConfig.selectWithCheckboxOnly,

                //show selected rows with highlight styling?  May want this turned off if selecting by checkbox
                showRowHighlight: sitConfig.showRowHighlight,

                //force use of external sorting so we sort all data and not just visible data
                useExternalSorting: true,
                enableResponsiveBehaviour: sitConfig.enableResponsiveBehaviour,

                //uniqueID for selectitems
                uniqueID: sitConfig.uniqueID ? sitConfig.uniqueID : ''
            };
            vm.gridOptions = options;
        }

        // set height based on specified value or containing element
        function setHeight(height) {
            if (vm.sitGridOptions.noScroll === true) {
                var noScrollHeight;
                var headerHeight = 30;

                vm.pageManager.getAllData().then(function (result) {
                    var totalDataLength = result.data.length;
                    var pageSize = vm.pageManager.getPageSize();
                    var slicedDataLenght = $scope.slicedGridData.length;
                    if (slicedDataLenght < pageSize) {
                        noScrollHeight = (slicedDataLenght * (vm.gridOptions.rowHeight + 1));// rowHeight ->height of each row, 1-> sapcing
                    }
                    else if (pageSize > totalDataLength) {
                        noScrollHeight = (totalDataLength * (vm.gridOptions.rowHeight + 1));
                    }
                    else {
                        noScrollHeight = (pageSize * (vm.gridOptions.rowHeight + 1));
                    }
                    vm.gridHeight = {
                        "height": (noScrollHeight + headerHeight) + 'px'
                    };
                    element.find(".ngViewport").css({ "overflow": "hidden", "height": noScrollHeight });
                }, function (reason) {
                    vm.handleError(reason);
                })
            }
            else {
                if (!height) {
                    height = getElementHeight(sitConfig.containerID);
                }
                if (height <= 0) {
                    return;
                }
                var gridHeaderHeight = element.find("#header-container").outerHeight();
                height = height - FOOTER_HEIGHT;
                vm.gridContainerHeight = height;
                vm.gridHeight = { "height": height + 'px' };
                if (gridHeaderHeight) {
                    height = height - gridHeaderHeight;
                }
                element.find(".ngViewport").css({ "height": height });
                common.logger.log('sitGrid.vm.setHeight', 'height: ' + height);
            }
        }

        function setServerSideItemCount() {
            //to get serverItemsLoadCount to be retreived on every resize of server-side compactMode
            if (vm.pageManager.isServerData() && !vm.sitGridOptions.enablePaging) {
                vm.serverItemsLoadCount = Math.ceil(vm.gridContainerHeight / (vm.gridOptions.rowHeight + 1));
                vm.initialDataItemsCount = angular.copy(vm.serverItemsLoadCount);
                if (vm.serverItemsLoadCount > vm.totalServerItemsLoadedCount && vm.totalServerItemsLoadedCount !== vm.totalDataItems) {
                    vm.resetGrid(true, false);
                }
            }
        }

        function settingGridHeight() {
            var height = 0;
            if (sitConfig.height) {
                height = sitConfig.height;
            } else if (sitConfig.containerID) {
                height = getElementHeight(sitConfig.containerID);
            }

            // handle resize if we have a container and explicitly told to do so or if container has non-zero height.
            vm.handleResize = sitConfig.containerID && (sitConfig.handleResize || height >= 0);

            if (height <= 0) {
                height = Math.ceil($(window).height() / 2);
            }

            vm.setHeight(height);
        }

        function initializeHeight() {
            vm.settingGridHeight();
            window.setTimeout(function () {
                vm.setServerSideItemCount();
                vm.bindScroll();
            });
        }

        function getElementHeight(id) {
            var height = -1;
            var container = $('#' + id, element.parents('div#itemCollectionCanvas')[0]);
            if (container.length === 0) {
                return height;
            }
            if (container.is(':visible')) {
                height = container.height();
            } else {
                if (-1 === container.css('height').indexOf('%')) {
                    height = container.height();
                } else {
                    height = 0;
                }
            }
            return height;
        }

        // function to set the actual data bound to the grid.
        function setSlicedData(data) {
            $scope.slicedGridData = data;
        }
        //create and initialize a list to track selected items
        function buildSelectedList() {
            var preselectedItems = [];
            angular.forEach(vm.sitGridData, function (item) {
                if (item.selected) {
                    preselectedItems.push(item);
                }
            });

            /** Form a fresh vm.selectedItems list, if the new vm.sitGridData has 'selected' property set to true.
              * Or maintain the old selected items and reomve items which are no longer available
            */
            if (preselectedItems.length > 0) {
                vm.selectedItems = preselectedItems;
            } else if (vm.selectedItems.length > 0 && vm.sitGridData.length > 0) {
                var i,
                    j,
                    deleteIndex = [],
                    item = vm.sitGridData,
                    selectedItem = vm.selectedItems,
                    selectedItemLength = selectedItem.length,
                    itemLength = item.length,
                    uniqueID = vm.gridOptions.uniqueID;

                for (i = 0; i < selectedItemLength; i++) {
                    for (j = 0; j < itemLength; j++) {
                        if (uniqueID) {
                            if (typeof uniqueID === 'string') {
                                if (item[j][uniqueID] === selectedItem[i][uniqueID]) {
                                    break;
                                }
                            } else if (typeof uniqueID === 'function') {
                                if (vm.gridOptions.uniqueID(item[j], selectedItem[i])) {
                                    break;
                                }
                            }

                        } else if (isObjectSame(item[j], selectedItem[i])) {
                            break;
                        }
                    }
                    if (j === itemLength) {
                        deleteIndex.unshift(i);
                    }
                }

                deleteIndex.forEach(function (index) {
                    vm.selectedItems.splice(index, 1);
                });
            }
        }

        // refresh items selected in the grid based on selected property of the data item
        // - putting them in the selectedItems list is enough. ngGrid will check this 
        //   when building its rows and select the rows where the row entity exists in the selected list.
        function updateSelectedItems() {
            var uniqueID = vm.gridOptions.uniqueID;
            currentPageSelectedItems = [];

            if (!vm.selectedItems) {
                return;
            }

            for (var i = 0; i < vm.selectedItems.length; i++) {
                var selectedItem = vm.selectedItems[i];
                for (var j = 0; j < $scope.slicedGridData.length; j++) {
                    var item = $scope.slicedGridData[j];
                    if (item.selected) {
                        continue;
                    }
                    item.selected = true;

                    if (typeof uniqueID === 'string' && uniqueID) {
                        if (item[uniqueID] !== selectedItem[uniqueID]) {
                            item.selected = false;
                            continue;
                        }
                    } else if (typeof uniqueID === 'function') {
                        item.selected = vm.gridOptions.uniqueID(item, selectedItem);
                        if (!item.selected) {
                            continue;
                        }
                    } else {
                        if (!isObjectSame(item, selectedItem)) {
                            item.selected = false;
                            continue;
                        }
                    }
                    currentPageSelectedItems.push(item);
                    vm.selectedItems[i] = item;
                    break;
                }
            }
        }

        function isObjectSame(obj1, obj2) {
            var result = true;
            var keys = Object.keys(obj1);
            for (var i = 0; i < keys.length; i++) {
                if ((typeof obj1[keys[i]] || typeof obj2[keys[i]]) !== 'object' &&
                    (typeof obj1[keys[i]] || typeof obj2[keys[i]]) !== 'function' &&
                    (Object.prototype.toString.call(obj1[keys[i]]) || Object.prototype.toString.call(obj1[keys[i]])) !== '[object Array]') {
                    if (obj1[keys[i]] !== obj2[keys[i]]) {
                        result = false;
                        break;
                    }
                }
            }
            return result;
        }

        function removeUnselectedItems() {
            vm.selectedItems.splice(0, vm.selectedItems.length);
            currentPageSelectedItems.forEach(function (item) {
                vm.selectedItems.push(item);
            });
        }

        /**
        * Completely resets the grid by removing its elements from the DOM and adding them back with new grid options
        * - Resetting in this way allows all grid settings to be dynamically changed.
        * - First implemented to work around what may be a bug in handling of columnDefs. (or just missunderstanding of correct use)
        *   The property is supposed to be dynamically updatable. (set value as string name of scope property).
        *   However, switching between data sources can cause several problems
        *   - not all column data may show
        *   - header of first column is corrupted.
        *   The problem seems due to the fact the grid does not remove no longer used columns. It just shows/hides them.
        *   So the auto-update probably is OK if you are just changing column visible or resizeable. 
        *   The full reset here allows for changing columns.
        * - The reset will cause a flicker of the grid as it is removed and redrawn.
        */
        function resetGrid(resetPageCount) {
            var deferred = $q.defer();
            vm.setPageManager();
            if (vm.gridResetting) {
                logInfoFn('[reset grid] reset already in progress');
                deferred.reject({});
                return deferred.promise;
            }
            vm.gridResetting = true;
            if (vm.isScrollUpdate) {
                vm.showGrid = true;
                vm.isScrollUpdate = false;
            } else {
                vm.showGrid = false;
            }
            $timeout(function () {
                refreshGrid(resetPageCount).then(function () {
                    /*Bug Fix 152576 - server side search
                    stacking the user search texts.
                    send server request with recently typed search-charaters once the previous search request completes
                    this process continues untill the user's search-typing activity is idle*/

                    var isServerData = vm.pageManager.isServerData();
                    var searchedText = vm.pageManager.getRecentlySearchedText();
                    var searchText = vm.pageManager.getSearchText();
                    if (isServerData && searchedText && searchText !== searchedText) {
                        dataUpdated();
                    }
                    deferred.resolve({});
                }, function (reason) {
                    deferred.reject({ reason: reason });
                });
            }, 100);
            return deferred.promise;
        }

        function refreshGrid(resetPageCount) {
            var deferred = $q.defer();
            if (vm.filterClauses) {
                vm.filterClauses = vm.filterClauses.length ? vm.filterClauses : undefined;
                vm.pageManager.setFilter(vm.filterClauses);
            }
            var isNoPagerServerDataMode = !vm.sitGridOptions.enablePaging && vm.pageManager.isServerData();
            (isNoPagerServerDataMode && !vm.grouping ? vm.pageManager.getServerData(vm.serverItemsLoadCount, vm.totalServerItemsLoadedCount) : (vm.grouping || !vm.sitGridOptions.enablePaging) ? vm.pageManager.getAllData() : vm.pageManager.getPageData()).then(
                function (result) {
                    if (resetPageCount) {
                        vm.initialPageCount = vm.pageManager.getPageCount();
                    }
                    if (!(!vm.gridOptions.enablePaging && vm.pageManager.isServerData()) || vm.isGroupedBy || vm.isQuickSearched || vm.isSorted || isRefreshCompactServerSideData || vm.isFilterPanelOpen) {
                        $scope.slicedGridData = [];
                    }

                    $scope.totalDataItems = result.totalDataSize;
                    vm.totalDataItems = result.totalDataSize;
                    for (var i = 0; i < result.data.length; i++) {
                        $scope.slicedGridData.push(result.data[i]);
                    }

                    if (!vm.gridOptions.enablePaging && vm.pageManager.isServerData()) {
                        vm.totalServerItemsLoadedCount = result.data.length + vm.totalServerItemsLoadedCount;
                        if (vm.isQuickSearched || vm.isSorted || vm.isGroupedBy || isRefreshCompactServerSideData || vm.isFilterPanelOpen) {
                            vm.isQuickSearched = false;
                            vm.isSorted = false;
                            vm.isGroupedBy = false;
                            isRefreshCompactServerSideData = false;
                            vm.isFilterPanelOpen = false;
                            vm.bindScroll();
                        }
                    }

                    vm.sitGridOptions.noData = (result.data.length) ? false : true;
                    vm.updateGridOptions();
                    vm.initPaginationOptions(vm.totalDataItems);
                    window.$UIF.Function.safeCall(vm, 'paginationOptions.api.draw');
                    vm.setOptionsAPIMethods();
                    $scope.colDefs = sitConfig.columnDefs;
                    vm.updateSelectedItems();
                    updateSelectedItemsCount();
                    vm.gridResetting = false;
                    vm.showGrid = true;
                    deferred.resolve({});
                },
                function (reason) {
                    vm.updateGridOptions();
                    vm.setOptionsAPIMethods();
                    $scope.colDefs = sitConfig.columnDefs;
                    vm.gridResetting = false;
                    vm.showGrid = true;
                    vm.handleError(reason);
                    logErrorFn('[reset grid] error resetting grid: ' + reason.data.error.errorMessage);
                    deferred.reject({ reason: reason });
                }
            );
            return deferred.promise;
        }

        function updateSlicedData() {
            ((vm.sitGridOptions.enablePaging && !vm.grouping) ? vm.pageManager.getPageData() : vm.pageManager.getAllData())
                .then(function (result) {
                    vm.setSlicedData(result.data);
                    vm.updateSelectedItems();
                }, function () {
                });
        }

        /*** functions attached to the options object. this gives users api into the directive ***/

        /**
         * ngGrid sorts only on visible data. That is, just the current page. But we want to 
         * actually sort all data, not just the current page. To do this, we can use the sort service
         * provided by ngGrid. 
         */
        function sortBy(sortField, sortDirection) {
            //35704 Fix:filter bar not updated on first click on column.
            //vm.apiSorting = true; //flag to tell sortInfo watch whether or not to notify parent of sort change

            if (!sortDirection) { sortDirection = 'asc'; }

            if (vm.gridOptions.sortBy) { vm.gridOptions.sortBy(sortField, sortDirection); }
            else { logInfoFn('[sitGridOptions.sortBy] attempt to sort grid when sortBy not defined'); }

            logInfoFn('[sitGridOptions.sortBy] sorting by field: ' + sortField + ' sort direction: ' + sortDirection);
        }

        /**
         * Called to let us know that the grid's data has been updated
         */
        function dataUpdated() {
            // reset the page count to 1
            var resetPageCount = true;

            if (!vm.sitGridOptions.enablePaging && vm.pageManager.isServerData()) {
                isRefreshCompactServerSideData = true;
                vm.totalServerItemsLoadedCount = 0;
                vm.serverItemsLoadCount = vm.initialDataItemsCount;
            }
            vm.resetGrid(resetPageCount);
        }

        // after quick search text or filter change, update the available data
        function updateDataOnFilterChange() {
            vm.isQuickSearched = true;
            vm.serverItemsLoadCount = vm.initialDataItemsCount;
            vm.totalServerItemsLoadedCount = 0;
            vm.pageManager.setCurrentPage(1);
            vm.resetGrid(false, false).then(function () {
                $('#data-container').scrollTop(0);
                $scope.$emit('sit-grid.data-filtered');
            }, function () {
                $('#data-container').scrollTop(0);
                $scope.$emit('sit-grid.data-filtered');
            });
        }

        function setFilter(clauses) {
            vm.filterClauses = clauses.length ? clauses : undefined;
            vm.pageManager.setFilter(clauses);
            vm.pageManager.setCurrentPage(1);
            vm.updateDataOnFilterChange();
        }
        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.grid
         * @name GridOptions#getCurrentData
         *
         * @description
         * An API method which returns currently displayed data
         *
         * @returns {Array} A list of currently displayed data
         */
        function getCurrentData() {
            return $scope.slicedGridData;
        }

        // assigns the API methods on the options object to the controller methods that implement the functionality. 
        // allows for easy resetting if the sitGridOptions object is changed.
        function setOptionsAPIMethods() {
            vm.sitGridOptions.selectItems = vm.selectItems;
            vm.sitGridOptions.selectAll = vm.selectAll;
            vm.sitGridOptions.sortBy = vm.sortBy;
            vm.sitGridOptions.dataUpdated = vm.dataUpdated;
            vm.sitGridOptions.getSelectedItems = vm.getSelectedItems;
            vm.sitGridOptions.setFilter = vm.setFilter;
            vm.sitGridOptions.getCurrentData = vm.getCurrentData;
        }

        ///////////////////////////////////////////////////////////////
        // functions to emit events mainly for documentation convenience
        ///////////////////////////////////////////////////////////////

        /**
         * @ngdoc event
         * @name sitGrid#sit-grid.page-changed
         * @eventType emit on sitGrid pager
         * @description
         * Emitted when the value of the current page in the pager is changed.
         * 
         * The new page number is passed as a parameter with the event.
         * 
         * @param {Object} event The event object.
         * 
         * @param {Number} currentPage The new page number.
         * 
         */
        function emitPageChanged(currentPage) {
            $scope.$emit('sit-grid.page-changed', currentPage);
            //Notify tagList Directive to resize.
            $scope.$broadcast('sit-grid.page-changed');
            if (vm.sitGridOptions.onPageChangedCallback) {
                vm.sitGridOptions.onPageChangedCallback(currentPage);
            }
        }

        /**
         * @ngdoc event
         * @name sitGrid#sit-grid.page-size-changed
         * @eventType emit on sitGrid pager
         * @description
         * Emitted when the value of the current page size in the pager is changed.
         * 
         * The new page size is passed as a parameter with the event.
         * 
         * @param {Object} event The event object.
         * 
         * @param {Number} pageSize The number of items to be displayed in a page.
         * 
         */
        function emitPageSizeChanged(pageSize) {
            $scope.$emit('sit-grid.page-size-changed', pageSize);
        }

        /**
         * @ngdoc event
         * @name sitGrid#sit-grid.sort-changed
         * @eventType emit on sitGrid column header
         * @description
         * Emitted when the current sort is changed after the user clicks on a column header.
         * 
         * The new sorting information is passed as a parameter with the event. 
         * It is passed as an object with the following properties:
         * * **fields**: An array of field names.
         * * **directions**: An array of **_asc_** or **_desc_** values that provide sort direction
         * for the field with the same index.
         * 
         * **Note:** The object contains only arrays because **ngGrid** is designed to support multi-column sorting.
         * Each array must contain only one element because **sitGrid** supports only single column sorting.
         * 
         * @param {Object} event The event object.
         * 
         * @param {Object} sortInfo An object that contains the column and direction of the new sort.
         * 
         */
        function emitSortInfoChanged(sortInfo) {
            $scope.$emit('sit-grid.sort-changed', sortInfo);
            //Notify tagList Directive to resize.
            $scope.$broadcast('sit-grid.page-changed');
            if (vm.sitGridOptions.onSortingChangedCallback) {
                // strip out columns and send just single field/direction
                vm.sitGridOptions.onSortingChangedCallback({
                    field: sortInfo.fields[0],
                    direction: sortInfo.directions[0]
                });
            }
        }

        /**
         * @ngdoc event
         * @name sitGrid#sit-grid.item-selection-changed
         * @eventType emit on sitGrid
         * @description
         * Emitted when the user clicks within the grid to change the currently selected rows.
         * 
         * Two parameters are passed along with the event.
         * * **selectedItems**: A list of the currently selected data items.
         * * **clickedItem**: The data item corresponding to the row that the user clicked to trigger the event.
         * 
         * @param {Object} event The event object.
         * 
         * @param {Object[]} selectedItems A list of the currently selected data items.
         * 
         * @param {Object} clickedItem The data item corresponding to the row that the user clicked to trigger the event.
         * 
         */
        function emitItemSelectionChanged(selectedItems, clickedItem) {
            $scope.$emit('sit-item-selection-changed', selectedItems, clickedItem);
        }

        /**
         * Prevent the "currentPage" watcher from triggering.  Fool it 
         * into thinking its last value is the current value.
         */
        function preventCurrentPageWatch(currentPageNumber) {
            // find the watcher
            var curPageWatcher = _.findWhere($scope.$$watchers, { exp: 'function () { return ctrl.paginationOptions.currentPage; }' });
            if (curPageWatcher) {
                if (curPageWatcher.last !== currentPageNumber) {
                    // emit the event here since the watcher won't be doing it
                    vm.emitPageChanged(currentPageNumber);
                }
                curPageWatcher.last = currentPageNumber;
            }
        }
    }

    /**
    *
     * @ngdoc type
     * @name GridOptions
     * @module siemens.simaticit.common.widgets.grid
     * @description An object providing a detailed description for all the options supported
     * by the **sitGridOptions** parameter of the {@link siemens.simaticit.common.widgets.grid.sitGrid} directive.
     * @property {ColumnDef} columnDefs For a description of this object see {@link ColumnDef}
     * @property {String} [containerID=undefined] 
     * 
     * Identifies the ID of a containing element.
     * 
     * Identifying a containing element allows the widget to size itself. If the element has a fixed height, 
     * the height of the grid is adjusted to fit the available space. 
     * 
     * 
     * @property {String} [culture='en']
     * 
     * Defines the language to be used for localizing text in the grid.
     * 
     * For most processing you do not need to set this. The value will be determined from the 
     * current preferred language of the **$translate** service. Setting a value here
     * will override the preferred language and force the grid to use the specified culture.
     * 
     * Values are set using the two letter ISO codes. For example: _'it'_ or _'de'_. 
     * 
     * @property {Object} [customRowClasses=undefined]
     * 
     * Defines the CSS classes to be used for customized styling of the grid rows. 
     * The following options are supported.
     * 
     * * **even**: Specifies the class to be used for even numbered rows.
     * * **odd**: Specifies the class to be used for odd numbered rows.
     * * **selected**: Specifies the class to be used for selected rows.
     * 
     * Example object
     * ```
     *  {
     *      even: 'myEvenRowClass',
     *      odd: 'myOddRowClass',
     *      selected: 'mySelectedRowClass'
     *  }
     * ```
     * 
     * @property {Number} [rowHeight=30]
     * Sets the grid row height
     *
     * @property {Boolean} [enableColumnResize=true]
     * 
     * Determines if column resizing is enabled for any columns.
     * 
     * 
     * Setting the value to **false** turns off resizing for all columns. 
     * Setting the value to **true** turns on resizing for those columns configured as resizable. 
     * Configure a column as resizable using the **resizable** option of the corresponding 
     * column definition object in the  **columnDefs** option.
     * 
     * 
     * @property {Boolean} [enablePaging=true]
     * 
     * Determines if the pager is shown.
     *
     * If paging is not allowed, all rows appear in the grid with a vertical scroll.
     *
     * @property {Boolean} [alwaysShowPager=false] Specifies if the pager is always shown. 
     * The default behavior hides the pager if the number of items to show is less than the page size. This option allows a user to override that behavior.
     * 
     * @property {Boolean} [enableSorting=true]
     * 
     * Determines if sorting is enabled.
     *
     * When enabled, clicking a column header will sort data by that column.
     * When not enabled, the grid will not respond to a click in the column header.
     * 
     * @property {String[]} [groups=undefined]
     * Specifies the field to group by.
     * 
     * The property value is an array of field names to potentially support multiple levels of grouping. 
     * However, the current implementation supports grouping on only one field.
     * 
     * @property {Boolean} [groupsCollapsedByDefault=true]
     * Determines whether or not the groups are initially collapsed when grouping data.
     * 
     * @property {String|Number} [height=undefined]
     * 
     * Specifies a fixed height to use for the grid.
     * 
     * If specified, the value overrides height settings from the **containerID** option.
     * 
     * @property {String} [noDataMessage=Localized version of 'No Data']
     * 
     * Specifies a message to show when no data is set in the grid.
     * 
     * @property {Object} pagingOptions  _(Optional)_
     * 
     * Defines the options for configuring the pager.
     * The object contains the following properties.
     * * **type** _(Optional)_: Defines the type of pagination.It can be either 'simple' or  'standard' or 'extended'. If the type is not mentioned, then by default 'extended' is considered.
     * * **pageSize**: The number of items to display per page. It can be one of the following values : 10,25,50 or 100.
     * ```
     * {
     *     pageSize: 10,
     *     type: 'standard'
     * }
     * ```
     *
     * 
     * @property {String} [selectionMode='multi']
     * 
     * Specifies how rows may be selected.
     * 
     * The following modes are supported:
     * * **multi**: Multiple rows may be selected. Clicking a row toggles the selected state.
     * * **single**: Only one row may be selected. Clicking a row toggles selected state on that row and clears the state on all other selected rows.
     * * **none**: Row selection is disabled.
     * 
     * @property {Object} [serverDataOptions=undefined]
     * 
     * Contains settings that define the presentation service and data entity
     * to be used as a data source.
     * 
     * The object has the following format
     * 
     * ```
     *     {
     *         dataService: engineeringData,
     *         dataEntity: 'CommandDefinition',
     *         optionsString: ''
     *     }
     * ``` 
     * 
     * * **dataService**: a presentation service object, such as engineeringData (object not string).
     * * **dataEntity**: the name of the entity to retrieve via the service.
     * * **optionsString**: an oData compliant query string.
     * 
     * @property {Boolean} [showSelectionCheckbox=false]
     * 
     * Determines if a check box is shown in the first column to indicate selection state.
     *   
     * @property {Boolean} [enableResponsiveBehaviour=false]
     * 
     * Determines if the widget is responsive for different device resolution. If set to true, when the device resolution
     * decreases, the columns are progressively hidden from right to left. 
     * 
     * @property {Boolean} [showRowHighlight=true]
     * 
     * Determines if selected rows are highlighted.
     * 
     * @property {Object} [sortInfo=undefined]
     * 
     * Sets the field and direction for sorting.
     * Only single field sorting is supported. However, the structure of the object
     * allows multiple fields to be specified for possible future enhancement.
     * 
     * Object structure
     * * **fields** An array of field names.
     * * **directions** An array of directions. Allowed values are
     *  * **asc** (Ascending) 
     *  * **desc** (Descending)
     * 
     * Example object
     * ```
     *  {
     *      fields: ['lastName'],
     *      directions: ['asc']
     *  }
     * ```
     * 
     * A **$watch** is set on the **sortInfo** object so the grid can respond to any changes.
     * 
     * @property {String} [gridContainerClass = undefined] Applies the defined custom class's style to the grid.
     *
     * @property {String | Object} [tagField=undefined] Displays Data Segregation tags of the given field. 
     * The property accepts **String** or **Object** type values.
     * * Type **String**: defines the field name to use for tags and the text to be displayed in the column.
     *
     * ```
     *  tagField: 'categories'
     * ```
     * * Type **Object**: This is to provide more user-friendly name in the column. The object must have the following format:
     *
     *  * **field**: defines the field name to use for tags.
     *  * **displayName**: defines the text to be displayed in the column.
     *
     * ```
     *   tagField: { field : 'categories' , displayName : 'Category'}
     *                   
     * ```
     * 
     *
     * @property {String | Function} [uniqueID=undefined] _(Optional)_ 
     * The grid selection persist on any grid-data manipulation.
     *
     * The property accepts **String** or **Function** type values.
     * * Type **String**:  The property is passed with a field name. The value of the field name must be constant and unchangable.
     * ```
     *  uniqueID: 'Id',
     * ```
     * * Type **Function**: The property is passed with a function. The function accepts two arguments and the object comparision logic on two arguments is written inside the function. The function must return a boolean value as a result of comparision.
     * ```
     * uniqueID: function (currentItem, selectedItem) {
     *           if (currentItem.Name === selectedItem.Name) {
     *               return true;
     *               }
     *           return false;
     *          }
     * ```
     *
     */
    /**
    
     *
     * @ngdoc type
     * @name ColumnDef
     * @module siemens.simaticit.common.widgets.grid
     * @description Defines the columns to appear in the grid. 
     * Each object in the array specifies a column to be displayed in the grid.  
     * Properties of each object specify how to display the data and how the column behaves. 
     * @property {String} field Field that corresponds to one of the properties of the objects in the sit-grid-data.
     * @property {Boolean} [groupable=true] Identifies if the user is allowed to group rows by this column value.
     * @property {String} [displayName=field] The column header name displayed.
     * @property {String} cellFilter Filter to be used on the contents of the cell. For more information, see **ng-grid** documentation.
     * Examples include **currency** and **date** (with the following format: "dd/MM/yyyy HH:mm").
     * @property {String} cellTemplate Applies the custom format for the specified column cells.
     * ```
     *  {
     * cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"> custom template here </div>'
     *  }
     * ```
     * @property {Boolean} [resizable=true] Defines if the column can be resized. 
     * @property {Boolean} [sortable=true] Defines if the column can be used for sorting.
     * @property {Number} width _(Optional)_ Width of the column.
     * 
     * Note: When the width attribute is set, double clicking the column resizer automatically resets the column width to its best fit.
     *
     * @example
     * Example object
     * ```
     *      {
     *          field: 'currentDate',
     *          displayName: 'Date',
     *          cellFilter: 'date:\'shortDate\'',  //where 'shortDate' is the type of the format 
     *          cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span>sample text<\span></div>'
     *          resizable: true,
     *          sortable: true,
     *          width : 100
     *      }
     * ```
     *
     */
    //function SitGridOptions() {
    //    var self = this;

    //    // no default value defined in docs
    //    self.columnDefs = undefined;
    //    self.containerID = undefined;
    //    self.culture = 'en';
    //    self.customRowClasses = undefined;
    //    self.rowHeight = 30;
    //    self.enableColumnResize = true;
    //    self.enablePaging = true;
    //    self.alwaysShowPager = false;
    //    self.enableSorting = true;
    //    self.groups = undefined;
    //    self.groupsCollapsedByDefault = true;
    //    self.height = undefined;
    //    self.noDataMessage = 'No Data';
    //    // no default value defined in docs
    //    self.pagingOptions = undefined;
    //    self.selectionMode = 'multi';
    //    self.serverDataOptions = undefined;
    //    self.showSelectionCheckbox = false;
    //    self.enableResponsiveBehaviour = false;
    //    self.showRowHighlight = true;
    //    self.sortInfo = undefined;
    //    self.gridContainerClass = undefined;

    //    self.pageManager = null;
    //}

    /**
    *
    * @module siemens.simaticit.common.widgets.grid
    * @name gridConfigurationDetails
    * @access internal
    * @description
    * This provides a detailed description for all the options supported
    * by the **sitGridOptions** parameter of the {@link siemens.simaticit.common.widgets.grid.sitGrid} directive.
    * 
    */
    //var gridConfigurationDetails = {
    //    columnDefs: undefined,
    //    containerID: '',
    //    culture: 'en', //todo: determine if system only supports 2 letter identifier
    //    customRowClasses: {
    //        //even: undefined,
    //        //odd: undefined,
    //        //selected: undefined
    //    },
    //    enableColumnResize: true,
    //    enablePaging: true,
    //    groups: [],
    //    height: 500,
    //    noDataMessage: 'No Data',
    //    pageManager: null,
    //    pagingOptions: {
    //        pageSizes: [10, 25, 50, 100, 250],
    //        pageSize: 10,
    //        currentPage: 1
    //    },
    //    selectionMode: 'multi',
    //    showSelectionCheckbox: false,
    //    showRowHighlight: true,
    //    sortInfo: { fields: [], columns: [], directions: [] },
    //    useExternalSorting: true,   //for internal use so we can sort all data, not just current page.

    //    debug: false,
    //    enableResponsiveBehaviour: false,
    //    uniqueID:'Name'
    //};


    /**
     * Wraps use of the $log service for outputting diagnostic messages to the console
     * - Prepends message with a timestamp
     * - Formats message for consistency: timestamp [function] message.
     * - Can turn on/off debug messages with configuration param so you do not have to comment out in code.
     */
    function LogWrapper($log, debug, module) {

        this.log = function (funcName, msg) { if (debug) { $log.log(getMessage(funcName, msg)); } };
        this.info = function (funcName, msg) { $log.info(getMessage(funcName, msg)); };
        this.warn = function (funcName, msg) { $log.warn(getMessage(funcName, msg)); };
        this.error = function (funcName, msg) { $log.error(getMessage(funcName, msg)); };

        function getMessage(funcName, msg) {
            return getTimeString() + ' [' + module + '] [' + funcName + '] ' + msg;
        }

        function getTimeString() {
            var d = new Date();
            var seconds = d.getSeconds();
            var secondString = seconds < 10 ? '0' + seconds : seconds.toString();
            var minutes = d.getMinutes();
            var minuteString = minutes < 10 ? '0' + minutes : minutes.toString();
            var hours = d.getHours();
            var hourString = hours < 10 ? '0' + hours : hours.toString();
            var ms = d.getMilliseconds();
            var msString;
            if (ms < 10) {
                msString = '00' + ms;
            }
            else if (ms < 100) {
                msString = '0' + ms;
            }
            else {
                msString = ms;
            }
            return hourString + ':' + minuteString + ':' + secondString + '.' + msString;
        }
    }

})();
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @module siemens.simaticit.common.widgets.grid
     * @name common.widgets.grid.service
     * @access internal
     * @description
     * This service provides functionalities to support the **sitGrid** directive.
     * * Defines a default configuration object and a method to extend the default values with a user-defined configuration.
     * * Implements a page manager object. This controls paging regardless of whether the data source is local or on the server.
     */
    angular.module('siemens.simaticit.common.widgets.grid').service('common.widgets.grid.service', GridManagerService);

    function GridManagerService() {
        /**
         * @ngdoc object
         * @module siemens.simaticit.common.widgets.grid
         * @name gridConfigurationDefaults
         * @access internal
         * @description
         * This provides the default values for **sitGridOptions** parameter of {@link siemens.simaticit.common.widgets.grid.sitGrid}.
         *
         *
         * @example
         * The following object contains default values for all supported options that have defaults other than **undefined**.
         *
         * ```
         *  {
         *      enableColumnResize: true,
         *      enablePageing: true,
         *      enableSorting: true,
         *      groupsCollapsedByDefault: true,
         *      pagingOptions: {
         *          pageSizes: [10, 25, 50, 100, 250],
         *          pageSize: 10,
         *          currentPage: 1
         *      },
         *      selectionMode: 'multi',
         *      showRowHighlight: true
         *      showSelectionCheckbox: false,
         *  }
         * ```
         *
         * For full description of all the supported options, see {@link siemens.simaticit.common.widgets.grid.gridConfigurationDetails}.
         *
         */
        this.gridConfigurationDefaults = {
            enableColumnResize: true,
            enablePaging: true,
            enableSorting: true,
            //groups: [],
            groupsCollapsedByDefault: true,
            //height: '500px',
            //noDataMessage: 'No Data',
            pageManager: null,
            pagingOptions: {
                pageSizes: [10, 25, 50, 100, 250],
                pageSize: 10,
                currentPage: 1
            },
            quickSearchOptions: {
                enabled: true,
                field: '',
                filterText: ''
            },
            selectionMode: 'multi',
            //selectWithCheckboxOnly: false, //ngGrid supports but defaults to false. sitGrid doesn't support
            //serverConnectionParams: {
            //    dataType: undefined,
            //    filter: undefined
            //},
            //sortInfo: { fields: [], columns: [], directions: [] },
            showSelectionCheckbox: false,
            showRowHighlight: true,
            useExternalSorting: true,

            debug: false,
            enableResponsiveBehaviour: false
        };

        /**
         * @ngdoc object
         * @module siemens.simaticit.common.widgets.grid
         * @name defaultColumn
         * @access internal
         * @description
         * The default values for a single column definition.
         *
         * ```
         * {
         *      groupable: true,
         *      resizeable: true,
         *      sortable: true
         * }
         * ```
         *
         * @property {string} [cellFilter] Specifies an **Angular JS** filter to be applied to the column.
         * @property {string} [displayName=field] Defines a user friendly name to use as header text for the column.
         * @property {string} field Identifies the data field to be used as the data source for the column.
         * @property {boolean} [groupable=true] Identifies if the user is allowed to group rows by this column value.
         * @property {boolean} [resizeable=true] Identifies if the user is allowed to resize the column.
         * @property {boolean} [sortable=true] Identifies if sorting is enabled for the column.
         */
        this.defaultColumn = {
            cellFilter: undefined,
            displayName: undefined,
            field: undefined,
            groupable: true,
            resizeable: true,
            sortable: true
        };


        function setGridConfigurationDefaults(config) {
            // create an object that has all the originial settings plus the defaults
            var configWithDefaults = $.extend({}, this.gridConfigurationDefaults, config);

            // ensure a unique sortInfo reference. If not and multiple grids, sorting one grid will sort the other
            // also, ngGrid needs the columns property even though we don't do anything with it.
            if (config) {
                if (!config.sortInfo) {
                    configWithDefaults.sortInfo = { fields: [], columns: [], directions: [] };
                } else if (!config.sortInfo.columns) {
                    configWithDefaults.sortInfo.columns = [];
                }
            }

            // update the original obect with any default values
            $.extend(config, configWithDefaults);

            return config;
        }

        this.setGridConfigurationDefaults = setGridConfigurationDefaults;

    }
})();
