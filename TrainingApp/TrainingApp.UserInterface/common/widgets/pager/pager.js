/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.pager
 * @description
 * @access internal
 * This module provides functionalities related to paging a collection of data items.
 */
(function () {
	'use strict';

	angular.module('siemens.simaticit.common.widgets.pager', []);

})();

(function () {
    'use strict';
    /**
     * @ngdoc service
     * @name common.widgets.pager.localDataService
     * @module siemens.simaticit.common.widgets.pager
     * @description
     * @access internal
     * Provides functionality to support working with an array of data.
     */
    angular.module('siemens.simaticit.common.widgets.pager').service('common.widgets.pager.localDataService', LocalDataService);

    LocalDataService.$inject = ['common.services.filterSort.service', '$q', 'common.services.logger.service', 'common.widgets.filter.service', '$parse', '$filter'];
    function LocalDataService(sortService, $q, logger, filterService, $parse, $filter) {
        var self = this;
        var defaultConfiguration;
        activate();

        function activate() {
            init();
            exposeApi();
        }

        function init() {
            defaultConfiguration = {
                pagingOptions: {
                    currentPage: 1,
                    pageSize: 25
                },
                quickSearchOptions: {
                    enabled: false,
                    field: '',
                    filterText: ''
                },
                sortInfo: {
                    field: '',
                    direction: ''
                },
                filterClauses: []
            };
        }

        function exposeApi() {
            self.getDataManager = getDataManager;
        }

        function setDefaultConfiguration(config) {
            if (!config.quickSearchOptions) {
                config.quickSearchOptions = defaultConfiguration.quickSearchOptions;
            }
            if (!config.sortInfo) {
                config.sortInfo = defaultConfiguration.sortInfo;
            }
            if (!config.filterClauses) {
                config.filterClauses = defaultConfiguration.filterClauses;
            }
            if (!config.pagingOptions) {
                config.pagingOptions = defaultConfiguration.pagingOptions;
                return;
            }
            if (!config.pagingOptions.currentPage) {
                config.pagingOptions.currentPage = defaultConfiguration.pagingOptions.currentPage;
            }
            if (!config.pagingOptions.pageSize) {
                config.pagingOptions.pageSize = defaultConfiguration.pagingOptions.pageSize;
            }
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name common.widgets.pager.localDataService#getDataManager
         * @access internal
         * @description
         * Retrieves an object that manages paging, sorting and searching an array of data items.
         *
         * @param {Object} [config]
         * Configures an instance of a data manager.
         * * **pagingOptions**
         *   * **currentPage**: Defines the current page of data when paging.
         *   * **pageSize**: Defines the number of data items in page.
         * * **quickSearchOptions**
         *   * **enabled**: Determines if quick search filtering is performed.
         *   * **field**: The name of the field to use for quick search.
         *   * **filterText**: Text to compare against the configured field. Compare operation does a "begins with" match.
         * * **sortInfo**
         *   * **field**: The name of the field to sort by.
         *   * **direction**: Must be `asc` or `desc` case insensitive.
         *
         * @param {Object[]} [localData]
         * The data items to be managed by the data manager.
         *
         * @returns {Object}
         * An object configured to manage the data array.
         */
        function getDataManager(config, localData) {
            setDefaultConfiguration(config);
            return new LocalDataManager(config, localData, sortService, $q, logger, filterService, $parse, $filter);
        }
    }

    /**
    * @ngdoc object
    * @module siemens.simaticit.common.widgets.pager
    * @name LocalDataManager
    * @access internal
    * @description
    * Manages a specific data collection.
    */
    function LocalDataManager(config, localData, sortService, $q, logger, filterService, $parse, $filter) {
        var self = this;
        var currentPage, pageSize, completeData, searchText, currentSearchedText, searchField, sortField, sortDirection, quickSearchFilter, filteredData, filterClauses, maxPageNumber;
        activate();

        function activate() {
            initialize();
            exposeApi();

            processData();
        }

        function initialize() {
            filteredData = completeData = localData ? localData : [];
            maxPageNumber = currentPage = config.pagingOptions.currentPage;
            pageSize = config.pagingOptions.pageSize;
            sortField = config.sortInfo.field;
            searchField = config.quickSearchOptions.field;
            searchText = config.quickSearchOptions.filterText;
            filterClauses = config.filterClauses;

            setSortDirection(config.sortInfo.direction);
            setQuickSearchFilter();
        }

        function exposeApi() {
            self.close = close;
            self.isServerData = isServerData;

            self.getAllData = getAllData;
            self.getPageData = getPageData;
            self.goToPage = goToPage;
            self.nextPage = nextPage;
            self.prevPage = prevPage;

            self.getTotalItemCount = getTotalItemCount;
            self.getPageCount = getPageCount;

            self.getData = getData;
            self.setData = setData;

            self.getSortInfo = getSortInfo;
            self.setSortInfo = setSortInfo;

            self.getCurrentPage = getCurrentPage;
            self.setCurrentPage = setCurrentPage;

            self.getPageSize = getPageSize;
            self.setPageSize = setPageSize;

            self.getFilter = getFilter;
            self.setFilter = setFilter;

            self.getSearchText = getSearchText;
            self.setSearchText = setSearchText;
            self.getRecentlySearchedText = getRecentlySearchedText;

            self.getSearchField = getSearchField;
            self.setSearchField = setSearchField;
            self.resetPager = resetPager;
        }

        function close() {
            delete self.close;
            delete self.isServerData;
            delete self.getAllData;
            delete self.getPageData;
            delete self.goToPage;
            delete self.nextPage;
            delete self.prevPage;
            delete self.getTotalItemCount;
            delete self.getPageCount;
            delete self.getData;
            delete self.setData;
            delete self.getSortInfo;
            delete self.setSortInfo;
            delete self.getCurrentPage;
            delete self.setCurrentPage;
            delete self.getPageSize;
            delete self.setPageSize;
            delete self.getFilter;
            delete self.setFilter;
            delete self.getSearchText;
            delete self.setSearchText;
            delete self.getSearchField;
            delete self.setSearchField;
            delete self.getRecentlySearchedText;

            completeData = filteredData = currentPage = pageSize = sortField = sortDirection = searchText = currentSearchedText = searchField = quickSearchFilter = filterClauses = self = undefined;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#isServerData
         * @access internal
         * @description
         * Returns **false** since this object only manages local data.
         */
        function isServerData() {
            return false;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getAllData
         * @access internal
         * @description
         * Retrieves all data items.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object containing the following:
         * * all data items
         * * the current page set to zero indicating all data
         * * the total count of data items
         *
         * The object has the following format
         * ```
         *     {
         *         data: [Object, Object, ...],
         *         currentPage: 0,
         *         totalDataSize: 147
         *     }
         * ```
         */
        function getAllData() {
            setCurrentPage(1);
            return getPromise({
                data: filteredData.slice(0), //return a new array to get grid to respond to change
                currentPage: currentPage,
                totalDataSize: filteredData.length
            });
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getPageData
         * @access internal
         * @description
         * Retrieves the current page of data including the page number and total data item count.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object containing the following:
         * * the data items for the current page
         * * the current page number
         * * the total count of all data items
         *
         * The object has the following format
         * ```
         *     {
         *         data: [Object, Object, ...],
         *         currentPage: 3,
         *         totalDataSize: 147
         *     }
         * ```
         */
        function getPageData() {
            if (0 === filteredData.length) {
                return getPromise({
                    data: [],
                    currentPage: 1,
                    totalDataSize: 0
                });
            }

            var startRow = (currentPage - 1) * pageSize;
            var endRow = currentPage * pageSize;
            return getPromise({
                data: filteredData.slice(startRow, endRow),
                currentPage: currentPage,
                totalDataSize: filteredData.length
            });
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#goToPage
         * @access internal
         * @description
         * Retrieves a page of data after setting the current page to the specified value.
         *
         * @param {Number} [page]
         * The page number to set as the current page.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object with the same format as for {@link siemens.simaticit.common.widgets.pager.LocalDataManager#getPageData getPageData}
         *
         */
        function goToPage(pageNumber) {
            if (pageNumber) {
                setCurrentPage(pageNumber);
            }
            return getPageData();
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#nextPage
         * @access internal
         * @description
         * Retrieves a page of data after incrementing the current page by one.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object with the same format as for {@link siemens.simaticit.common.widgets.pager.LocalDataManager#getPageData getPageData}
         *
         */
        function nextPage() {
            return goToPage(currentPage + 1);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#prevPage
         * @access internal
         * @description
         * Retrieves a page of data after decrementing the current page by one.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object with the same format as for {@link siemens.simaticit.common.widgets.pager.LocalDataManager#getPageData getPageData}
         *
         */
        function prevPage() {
            return goToPage(currentPage - 1);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getTotalItemCount
         * @access internal
         * @description
         * Retrieves the count of all data items.
         *
         * The count is set after filtering by the configured **quickSearchOptions**.
         * For example, if the total number of **person** entities in a database is 1000,
         * but this is reduced to 85 after applying search options, then the total count returned is 85.
         * If no filter options are set, the returned value would be 1000.
         *
         * @returns {Number}
         * The data item count.
         *
         */
        function getTotalItemCount() {
            return filteredData.length;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getPageCount
         * @access internal
         * @description
         * Retrieves the number of pages.
         *
         * The count is set after filtering by the configured **quickSearchOptions**.
         * For example, if the total number of **person** entities in a database is 1000,
         * but this is reduced to 85 after applying search options, then a page size of 25 results in a page count of 4.
         * If no filter options are set, the page count would be 40.
         *
         * @returns {Number}
         * The page count.
         *
         */
        function getPageCount() {
            return Math.ceil(getTotalItemCount() / getPageSize());
        }

        function getData() {
            return completeData;
        }

        function setData(data) {
            completeData = data ? data : [];
            processData();
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getSortInfo
         * @access internal
         * @description
         * Retrieves the current field and direction used for sorting.
         *
         * @returns {Object}
         * An object containing the sort field and direction.
         *
         * The object has the following format
         * ```
         *     {
         *         field: "lastName",
         *         direction: "desc"
         *     }
         * ```
         *
         */
        function getSortInfo() {
            return {
                field: sortField,
                direction: sortDirection
            };
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#setSortInfo
         * @access internal
         * @description
         * Sets the data field and direction for sorting the data collection.
         *
         * @param {string} [field]
         * The name of the field to sort by.
         *
         * @param {String } [direction]
         * The direction of the sort. Must be **asc** or **desc** case-insensitive.
         */
        function setSortInfo(field, direction) {
            sortField = field;
            setSortDirection(direction);
            doSort();
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getCurrentPage
         * @access internal
         * @description
         * Retrieves the number of the current page.
         *
         * @returns {Number}
         * The current page number.
         *
         */
        function getCurrentPage() {
            return currentPage;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#setCurrentPage
         * @access internal
         * @description
         * Sets the current page to the specified value.
         *
         * @param {Number} [page]
         * The page number to set as the current page.
         *
         */
        function setCurrentPage(val) {
            currentPage = val;
            validatePagingData();
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getPageSize
         * @access internal
         * @description
         * Retrieves the current page size.
         *
         * @returns {Number}
         * The current page size.
         *
         */
        function getPageSize() {
            return pageSize;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#setPageSize
         * @access internal
         * @description
         * Sets the size used for a page of data.
         *
         * This may change the current page.
         * For example, consider current values of:
         * * total item count of 100
         * * current page size of 10
         * * current page of 10
         *
         * If the page size is changed to 25, then 10 is no longer a valid current page.
         * The current page must be changed.
         *
         * The data manager will try to set the new current page to the one containing the first item in the old current page.
         *
         * @param {Number} [size]
         * The number of items to include in a page of data.
         *
         */
        function setPageSize(size) {
            //get the first row of the current page so we can try and send back data containing this.
            var startingRow = (currentPage - 1) * pageSize + 1;
            pageSize = size;

            //page containing current row changed, get it
            setCurrentPage(Math.ceil(startingRow / pageSize));
        }

        function getFilter() {
            return filterClauses;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#setFilter
         * @access internal
         * @description
         * Sets the filter function to use when getting a page of data.
         *
         */
        function setFilter(clauses) {
            filterClauses = clauses;
            processData();
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getSearchText
         * @access internal
         * @description
         * Retrieves the text currently used for matching against the configured quick search field.
         *
         * @returns {String}
         * The search text.
         *
         */
        function getSearchText() {
            return searchText;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getRecentlySearchedText
         * @access internal
         * @description
         * Retrieves the last text used for search.
         *
         * @returns {String}
         * The search text.
         *
         */
        function getRecentlySearchedText() {
            return currentSearchedText;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#setSearchText
         * @access internal
         * @description
         * Sets the text to use for matching against the configured quick search field.
         *
         * @param {String} [searchText]
         * The text to use for searching.
         *
         */
        function setSearchText(val) {
            searchText = val;
            processData();
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#getSearchField
         * @access internal
         * @description
         * Retrieves the field name currently used for matching quick search text.
         *
         * @returns {String}
         * A field name.
         *
         */
        function getSearchField() {
            return searchField;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#resetPager
         * @access internal
         * @description
         * Returns the query string by resetting the skip counter for the query string to initial value.
         *
         * @returns {String}
         * A function used for resetting skip value.
         *
         */

        function resetPager(queryString) {
            var pattern = /(\w*skip=\w*[0-9]+)/; //NOSONAR
            if (pattern.test(queryString)) {
                queryString = queryString.replace(pattern, 'skip=0');
            }
            return queryString;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#setSearchField
         * @access internal
         * @description
         * Sets the field to use for matching quick search text.
         *
         * @param {String} [searchField]
         * The field to use for searching.
         *
         */
        function setSearchField(val) {
            searchField = val;
            setQuickSearchFilter();
            processData();
        }

        function setSortDirection(direction) {
            sortDirection = direction && 'desc' === direction.toLowerCase() ? 'desc' : 'asc';
        }

        function setQuickSearchFilter() {
            quickSearchFilter = config.quickSearchOptions.enabled && searchField ? filterService.getQuickSearchFilter(searchField) : null;
        }

        function validatePagingData() {
            if (0 >= currentPage) {
                currentPage = 1;
                return;
            }
            var maxPageNumber = getPageCount();
            if (maxPageNumber && currentPage > maxPageNumber) {
                currentPage = maxPageNumber;
            }
        }

        function processData() {
            doFiltering();
            doSort();
        }

        function doFiltering() {
            currentSearchedText = searchText;
            if (config.quickSearchType && config.quickSearchType.toLowerCase() === 'contains' && searchText[0] !== "*") {
                var pred = {};
                $parse(searchField).assign(pred, searchText);
                filteredData = $filter('filter')(completeData, pred);
            } else {
                filteredData = quickSearchFilter ? quickSearchFilter.getFilteredData(completeData, searchText) : completeData.slice(0);
            }
            if (filterClauses && filterClauses.length) {
                filteredData = filterService.filterArray(filterClauses, filteredData);
            }
            validatePagingData();
        }

        function doSort() {
            if (!sortField) {
                return;
            }
            // sort service requires array of objects
            var sortInfo = [{ field: sortField, direction: sortDirection }];
            sortService.sort(sortInfo, filteredData);
        }

        function getPromise(result) {
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        }
    }
})();

/*jshint -W098 */
(function () {
    'use strict';

    /**
	 * @ngdoc directive
	 * @name sitPager
     * @access internal
	 * @description Directive with UI for navigating through multiple pages of data.
	 * @module siemens.simaticit.common.widgets.pager
	 */
    angular.module('siemens.simaticit.common.widgets.pager').directive('sitPager', PagerDirective);

    function PagerDirective() {
        return {
            restrict: 'E',
            bindToController: {
                pagingOptions: '=sitPagingOptions'
            },
            scope: {},
            link: function (scope, element, attr, ctrl) {
                //watch for count changes from parent
                scope.$watch(function () {
                    return ctrl.pagingOptions.totalItems;
                }, function (newVal, oldVal) {
                    ctrl.setMaxPage();
                });

                scope.$watch(function () {
                    return ctrl.pagingOptions.pageSize;
                }, function (newVal, oldVal) {
                    if (oldVal !== newVal && ctrl.pagingOptions.pageSizeChangeCallback) {
                        ctrl.pagingOptions.pageSizeChangeCallback(newVal);
                        ctrl.setMaxPage();
                    }
                });

                // note: below mess is attempt to avoid circular watches.
                // we want to bind the current page from the options object to the UI text box,
                // but we also want to call back when user changes current page.
                // we don't want programmatic change of options object value to trigger a callback.
                // so we need to distinguish beteen value changing programmatically and user changing.

                // the current page on the options object
                // watching this responds to owner programmatically changing current page
                scope.$watch(function () {
                    return ctrl.pagingOptions.currentPage;
                }, function (newVal, oldVal) {
                    if (oldVal !== newVal) {
                        if (ctrl.userUpdate) {
                            ctrl.userUpdate = false;
                        } else {
                            // flag other watch to not callback and bind new page to UI
                            ctrl.apiUpdate = true;
                            ctrl.currentPage = newVal;
                        }
                    }
                });

                // utility function.  This really should be in some kind of utility service...
                function isInt(x) {
                    var y = parseInt(x, 10);
                    return !isNaN(y) && x === y && x.toString() === y.toString();
                }

                // the current page bound to the UI text box
                // watching this responds to the user changing the current page
                scope.$watch(function () {
                    return ctrl.currentPage;
                }, function (newVal, oldVal) {
                    if (!isInt(newVal) || undefined === oldVal) {
                        return;
                    }

                    if (oldVal !== newVal) {
                        if (ctrl.apiUpdate) {
                            ctrl.apiUpdate = false;
                            ctrl.pagingOptions.pageChangeCallback(newVal);
                        } else {
                            // flag other watch to not set UI value again and bind new value to options object
                            ctrl.userUpdate = true;
                            ctrl.pagingOptions.currentPage = newVal;
                            if (ctrl.pagingOptions.pageChangeCallback) {
                                ctrl.pagingOptions.pageChangeCallback(newVal);
                            }
                        }
                    }
                });
            },
            templateUrl: 'common/widgets/pager/pager.html',
            controller: PagerController,
            controllerAs: 'pagerCtrl'
        };
    }

    PagerController.$inject = ['common.widgets.pager.pageService'];

    function PagerController(sitPageService) {
        var vm = this;
        function init() {
            //initialize max page to some large number. will be reset when total items changes
            vm.maxPage = 1000;
            // initialize the current page after setting flag that blocks the callback
            vm.currentPage = vm.pagingOptions.currentPage;
            //attach functions to controller
            vm.pageToFirst = pageToFirst;
            vm.pageBackward = pageBackward;
            vm.pageForward = pageForward;
            vm.pageToLast = pageToLast;
            vm.footerStyle = footerStyle;
            vm.setMaxPage = setMaxPage;
            vm.cantPageBackward = cantPageBackward;
            vm.cantPageForward = cantPageForward;
            vm.cantPageToLast = cantPageToLast;
        }

        function activate() {
            init();
            sitPageService.setConfigurationDefaults(vm.pagingOptions);
        }
        activate();

        sitPageService.setConfigurationDefaults(vm.pagingOptions);

        function pageToFirst() {
            vm.currentPage = 1;
        }
        function pageBackward() {
            if (vm.currentPage > 1)
            { vm.currentPage -= 1; }
        }
        function pageForward() {
            if (vm.currentPage < vm.maxPage)
            { vm.currentPage += 1; }
        }
        function pageToLast() {
            vm.currentPage = vm.maxPage;
        }

        function footerStyle() {
            return { "width": "100%", "height": 55 + "px" };
        }

        function setMaxPage() {
            vm.maxPage = Math.ceil(vm.pagingOptions.totalItems / vm.pagingOptions.pageSize);
        }
        function cantPageForward() {
            return vm.currentPage === vm.maxPage;

        }
        function cantPageToLast() {
            return vm.currentPage === vm.maxPage;
        }

        function cantPageBackward() {
            return vm.currentPage <= 1;
        }
    }

})();

(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name common.widgets.pager.pageService
     * @module siemens.simaticit.common.widgets.pager
     * @access internal
     * @description
     * _(Internal)_ Provides functionality to support paging through an array of data.
     */
    angular.module('siemens.simaticit.common.widgets.pager').service('common.widgets.pager.pageService', PageManagerService);

    PageManagerService.$inject = ['common.widgets.pager.localDataService', 'common.widgets.pager.serverDataService'];
    function PageManagerService(localDataService, serverDataService) {
        var self = this;
        var defaultConfiguration;
        activate();

        function activate() {
            init();
            exposeApi();
        }

        function init() {
            defaultConfiguration = {
                pageSizes: [10, 25, 50, 100, 250],
                pageSize: 10,
                currentPage: 1,
                serverDataOptions: false,
                totalItems: 0,
                filterItems: 0,
                selectedItems: 0,
                pageChangeCallback: null,
                pageSizeChangeCallback: null
            };
        }

        function exposeApi() {
            self.setConfigurationDefaults = setConfigurationDefaults;
            self.getPageManager = getPageManager;
        }

        function setConfigurationDefaults(config) {
            // create an object that has all the originial settings plus the defaults
            var configWithDefaults = $.extend({}, defaultConfiguration, config);

            // update the original obect with default values
            $.extend(config, configWithDefaults);
            return config;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name common.widgets.pager.pageService#getPageManager
         * @access internal
         * @description
         * Constructs and returns an object for managing data paging.
         *
         * @param {Object} [config]
         * An object configuring options for the data paging.  See config param for
         * {@link common.widgets.pager.localDataService#getDataManager getDataManager} method of sitLocalDataService or
         * config param for {@link common.widgets.pager.serverDataService#getDataManager getDataManager} method of common.widgets.pager.serverDataService
         *
         * @param {Object[]} [localData]
         * The data items to be managed by the data manager.
         *
         * @returns {Object}
         *
         * A data manager object for either local data or server data.  If the given config parameter has server data options set,
         * the returned data manager object will be a server data manager.  Otherwise, it will be a local data manager.
         *
         */
        function getPageManager(config, localData) {
            if (config.serverDataOptions) {
                return serverDataService.getDataManager(config);
            }
            return localDataService.getDataManager(config, localData);
        }
    }
})();

(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name common.widgets.pager.serverDataService
     * @module siemens.simaticit.common.widgets.pager
     * @description
     * @access internal
     * Provides functionality for retrieving data from a configured presentation service.
     */
    angular.module('siemens.simaticit.common.widgets.pager').service('common.widgets.pager.serverDataService', ServerDataService);

    ServerDataService.$inject = ['$q', 'common.services.logger.service', 'common.widgets.filter.service'];
    function ServerDataService($q, logger, filterService) {
        var self = this;
        var defaultConfiguration;
        activate();

        function activate() {
            init();
            exposeApi();
        }

        function init() {
            defaultConfiguration = {
                pagingOptions: {
                    currentPage: 1,
                    pageSize: 25
                },
                quickSearchOptions: {
                    enabled: false,
                    field: '',
                    filterText: ''
                },
                sortInfo: {
                    field: '',
                    direction: ''
                },
                filterClauses: []
            };
        }

        function exposeApi() {
            self.getDataManager = getDataManager;
        }

        function setDefaultConfiguration(config) {
            if (!config.quickSearchOptions) {
                config.quickSearchOptions = defaultConfiguration.quickSearchOptions;
            }
            if (!config.sortInfo) {
                config.sortInfo = defaultConfiguration.sortInfo;
            }
            if (!config.filterClauses) {
                config.filterClauses = defaultConfiguration.filterClauses;
            }
            if (!config.pagingOptions) {
                config.pagingOptions = defaultConfiguration.pagingOptions;
                return;
            }
            if (!config.pagingOptions.currentPage) {
                config.pagingOptions.currentPage = defaultConfiguration.pagingOptions.currentPage;
            }
            if (!config.pagingOptions.pageSize) {
                config.pagingOptions.pageSize = defaultConfiguration.pagingOptions.pageSize;
            }
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name common.widgets.pager.serverDataService#getDataManager
         * @access internal
         * @description
         * Retrieves an object that manages paging, sorting and searching an array of data items.
         *
         * @param {Object} [config]
         * Configures an instance of a data manager.
         * * **pagingOptions**
         *   * **currentPage**: Defines the current page of data when paging.
         *   * **pageSize**: Defines the number of data items in page.
         * * **quickSearchOptions**
         *   * **enabled**: Determines if quick search filtering is performed.
         *   * **field**: The name of the field to use for quick search.
         *   * **filterText**: Text to compare against the configured field. Compare operation does a "begins with" match.
         * * **serverDataOptions**
         *   * **dataService**: A presentation service object such as engineeringData (object not string)
         *   * **dataEntity**: The name of an entity to retrieve via the service
         *   * **optionsString**: An oData compliant query string
         * * **sortInfo**
         *   * **field**: The name of the field to sort by.
         *   * **direction**: Must be `asc` or `desc` case insensitive.
         *
         * @returns {Object}
         * An object configured to manage data retrieval from a server.
         */
        function getDataManager(config) {
            setDefaultConfiguration(config);
            return new ServerDataManager(config, $q, logger, filterService);
        }
    }

    /**
     * @ngdoc object
     * @module siemens.simaticit.common.widgets.pager
     * @name ServerDataManager
     * @access internal
     * @description
     * Manages retrieving data from a configured presentation service for a specific entity.
     *
     */
    function ServerDataManager(config, $q, loggerService, filterService) {
        var self = this;
        var logger, currentPage, pageSize, searchText, currentSearchedText, searchField, quickSearchEnabled, sortField, sortDirection, dataCount, filterQueryString, filterClauses;
        var waitingForServer, nextDeferred, nextOptionsString;
        var serverConfiguration;
        activate();

        function activate() {
            init();
            exposeApi();
        }

        function init() {
            logger = loggerService.getModuleLogger('siemens.simaticit.common.widgets.pager');
            currentPage = config.pagingOptions.currentPage;
            pageSize = config.pagingOptions.pageSize;
            searchText = config.quickSearchOptions.filterText;
            searchField = config.quickSearchOptions.field;
            quickSearchEnabled = config.quickSearchOptions.enabled;
            sortField = config.sortInfo.field;
            setSortDirection(config.sortInfo.direction);
            dataCount = 0;
            filterQueryString = '';
            setFilter(config.filterClauses);
            serverConfiguration = config.serverDataOptions;

            // are we waiting for the server to return with data?
            waitingForServer = false;
            nextOptionsString = null;
            nextDeferred = null;
        }

        function exposeApi() {
            self.close = close;
            self.isServerData = isServerData;
            self.getServerData = getServerData;
            self.getAllData = getAllData;
            self.getPageData = getPageData;
            self.goToPage = goToPage;
            self.nextPage = nextPage;
            self.prevPage = prevPage;

            self.getTotalItemCount = getTotalItemCount;
            self.getPageCount = getPageCount;

            self.getSortInfo = getSortInfo;
            self.setSortInfo = setSortInfo;

            self.getCurrentPage = getCurrentPage;
            self.setCurrentPage = setCurrentPage;

            self.getPageSize = getPageSize;
            self.setPageSize = setPageSize;

            self.getFilter = getFilter;
            self.setFilter = setFilter;

            self.getSearchText = getSearchText;
            self.setSearchText = setSearchText;
            self.getRecentlySearchedText = getRecentlySearchedText;

            self.getSearchField = getSearchField;
            self.setSearchField = setSearchField;

            self.resetPager = resetPager;
        }

        function close() {
            delete self.close;
            delete self.isServerData;
            delete self.getAllData;
            delete self.getPageData;
            delete self.goToPage;
            delete self.nextPage;
            delete self.prevPage;
            delete self.getTotalItemCount;
            delete self.getPageCount;
            delete self.getSortInfo;
            delete self.setSortInfo;
            delete self.getCurrentPage;
            delete self.setCurrentPage;
            delete self.getPageSize;
            delete self.setPageSize;
            delete self.getFilter;
            delete self.setFilter;
            delete self.getSearchText;
            delete self.setSearchText;
            delete self.getSearchField;
            delete self.setSearchField;
            delete self.getRecentlySearchedText;

            logger = currentPage = pageSize = searchText = currentSearchedText = searchField = quickSearchEnabled = sortField = sortDirection = dataCount = filterQueryString = filterClauses = undefined;
            serverConfiguration = waitingForServer = nextOptionsString = nextDeferred = self = undefined;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#isServerData
         * @access internal
         * @description
         * Returns **true** since this object only manages retrieving data through a presentation service.
         */
        function isServerData() {
            return true;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getAllData
         * @access internal
         * @description
         * Retrieves all data items.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object containing the following:
         * * all data items
         * * the current page set to zero indicating all data
         * * the total count of data items
         *
         * The object has the following format
         * ```
         *     {
         *         data: [Object, Object, ...],
         *         currentPage: 0,
         *         totalDataSize: 147
         *     }
         * ```
         */

        function getServerData(itemsToLoadCount, totalItemsLoaded) {
            var deferred = $q.defer();

            loadServerData(itemsToLoadCount, totalItemsLoaded).then(
                function (response) {
                    onServerDataSuccess(response, deferred);
                },
                function (rejectReason) {
                    deferred.reject(rejectReason);
                }
            );
            return deferred.promise;
        }

        function onServerDataSuccess(response, deferred) {
            deferred.resolve({
                data: response.pageData,
                isCompactServerData: true,
                totalDataSize: response.totalDataCount
            });
        }

        function loadServerData(topIndex, skipIndex) {
            // check service
            if (typeof serverConfiguration.dataService.getAll !== 'function' && !serverConfiguration.appName) {
                logger.logErr('The given service does not have a getAll function.');
                throw new Error('The given service does not have a getAll function.');
            }

            if (typeof serverConfiguration.dataService.findAll !== 'function' && serverConfiguration.appName) {
                logger.logErr('The given service does not have a findAll function.If you defined in serverData appName the service must contain a findAll function');
                throw new Error('The given service does not have a findAll function.');
            }

            // check entity name
            if (!serverConfiguration.dataEntity) {
                logger.logErr(serverConfiguration.dataEntity + ' is not a valid value for data entity name.');
                throw new Error(serverConfiguration.dataEntity + ' is not a valid value for data entity name.');
            }

            var fullOptionsString = getFilterQueryString();
            // add page criteria
            var pageCriteria = '';
            if (topIndex) {
                pageCriteria += fullOptionsString ? '&' : '';
                pageCriteria += '$top=' + topIndex + '&$skip=' + skipIndex;
            }
            fullOptionsString += pageCriteria;

            // add sorting info
            var sortCriteria = '';
            if (sortField) {
                sortCriteria = fullOptionsString ? '&' : '';
                var sf = sortField.replace ? sortField.replace(/\./g, '/') : sortField;
                sortCriteria += '$orderby=' + sf + ' ' + sortDirection;
            }
            fullOptionsString += sortCriteria;

            // count
            var countCriteria = fullOptionsString ? '&' : '';
            countCriteria += '$count=true';
            fullOptionsString += countCriteria;

            // any aditional oData string
            var additionalCriteria = '';
            if (serverConfiguration.optionsString) {
                additionalCriteria = fullOptionsString ? '&' : '';
                additionalCriteria += serverConfiguration.optionsString;
            }
            fullOptionsString += additionalCriteria;

            return loadDataFromODataString(fullOptionsString);
        }

        function getAllData() {
            var deferred = $q.defer();
            loadPageOfData(0, 0).then(
                function (response) {
                    onDataSuccess(response, 1, deferred);
                },
                function (rejectReason) {
                    deferred.reject(rejectReason);
                }
            );
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getPageData
         * @access internal
         * @description
         * Retrieves the current page of data including the page number and total data item count.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object containing the following:
         * * the data items for the current page
         * * the current page number
         * * the total count of all data items
         *
         * The object has the following format
         * ```
         *     {
         *         data: [Object, Object, ...],
         *         currentPage: 3,
         *         totalDataSize: 147
         *     }
         * ```
         */
        function getPageData() {
            var endRow = currentPage * pageSize;
            var startRow = endRow - pageSize;
            if (dataCount && startRow > dataCount) {
                throw new Error('Invalid arguments. page: [' + currentPage + '],  pageSize: [' + pageSize + '], start row: [' + startRow + '], data length: [' + dataCount + ']');
            }

            var deferred = $q.defer();
            loadPageOfData(currentPage, pageSize).then(
                function (response) {
                    onDataSuccess(response, currentPage, deferred);
                },
                function (rejectReason) {
                    deferred.reject(rejectReason);
                }
            );
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#goToPage
         * @access internal
         * @description
         * Retrieves a page of data after setting the current page to the specified value.
         *
         * @param {Number} [page]
         * The page number to set as the current page.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object with the same format as for {@link siemens.simaticit.common.widgets.pager.ServerDataManager#getPageData getPageData}
         *
         */
        function goToPage(page) {
            page = page || currentPage;
            var startRow = page * pageSize - pageSize;
            if (dataCount && startRow > dataCount) {
                throw new Error('Invalid arguments. page: [' + page + '],  pageSize: [' + pageSize + '], start row: [' + startRow + '], data length: [' + dataCount + ']');
            }
            setCurrentPage(page);
            return getPageData();
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#nextPage
         * @access internal
         * @description
         * Retrieves a page of data after incrementing the current page by one.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object with the same format as for {@link siemens.simaticit.common.widgets.pager.ServerDataManager#getPageData getPageData}
         *
         */
        function nextPage() {
            return goToPage(currentPage + 1);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#prevPage
         * @access internal
         * @description
         * Retrieves a page of data after decrementing the current page by one.
         *
         * @returns {Object}
         * A $q Promise
         *
         * When resolved, the result is an object with the same format as for {@link siemens.simaticit.common.widgets.pager.ServerDataManager#getPageData getPageData}
         *
         */
        function prevPage() {
            return goToPage(currentPage - 1);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getCurrentPage
         * @access internal
         * @description
         * Retrieves the number of the current page.
         *
         * @returns {Number}
         * The current page number.
         *
         */
        function getCurrentPage() {
            return currentPage;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#setCurrentPage
         * @access internal
         * @description
         * Sets the current page to the specified value.
         *
         * @param {Number} [page]
         * The page number to set as the current page.
         *
         */
        function setCurrentPage(val) {
            currentPage = val;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getPageSize
         * @access internal
         * @description
         * Retrieves the current page size.
         *
         * @returns {Number}
         * The current page size.
         *
         */
        function getPageSize() {
            return pageSize;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#setPageSize
         * @access internal
         * @description
         * Sets the size used for a page of data.
         *
         * This may change the current page.
         * For example, consider current values of:
         * * total item count of 100
         * * current page size of 10
         * * current page of 10
         *
         * If the page size is changed to 25, then 10 is no longer a valid current page.
         * The current page must be changed.
         *
         * The data manager will try to set the new current page to the one containing the first item in the old current page.
         *
         * @param {Number} [size]
         * The number of items to include in a page of data.
         *
         */
        function setPageSize(size) {
            var sizeInt = parseInt(size, 10);

            //get the first row of the current page so we can try and send back data containing this.
            var currentRow = (currentPage - 1) * pageSize + 1;
            pageSize = sizeInt;
            //page containing current row changed, get it
            var newPage = Math.ceil(currentRow / pageSize);
            setCurrentPage(newPage === 0 ? 1 : newPage);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getTotalItemCount
         * @access internal
         * @description
         * Retrieves the count of all data items.
         * @access internal
         * The count is set after filtering by the configured **quickSearchOptions**.
         * For example, if the total number of **person** entities in a database is 1000,
         * but this is reduced to 85 after applying search options, then the total count returned is 85.
         * If no filter options are set, the returned value would be 1000.
         *
         * @returns {Number}
         * The data item count.
         *
         */
        function getTotalItemCount() {
            return dataCount;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getPageCount
         * @access internal
         * @description
         * Retrieves the number of pages.
         *
         * The count is set after filtering by the configured **quickSearchOptions**.
         * For example, if the total number of **person** entities in a database is 1000,
         * but this is reduced to 85 after applying search options, then a page size of 25 results in a page count of 4.
         * If no filter options are set, the page count would be 40.
         *
         * @returns {Number}
         * The page count.
         *
         */
        function getPageCount() {
            return Math.ceil(dataCount / pageSize);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getSearchText
         * @access internal
         * @description
         * Retrieves the text currently used for matching against the configured quick search field.
         *
         * @returns {String}
         * The search text.
         *
         */
        function getSearchText() {
            return searchText;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getRecentlySearchedText
         * @access internal
         * @description
         * Retrieves the last text used for search.    
         *
         * @returns {String}
         * The search text.
         *
         */
        function getRecentlySearchedText() {
            return currentSearchedText;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#setSearchText
         * @access internal
         * @description
         * Sets the text to use for matching against the configured quick search field.
         *
         * @param {String} [searchText]
         * The text to use for searching.
         *
         */
        function setSearchText(newText) {
            searchText = newText;
            setCurrentPage(1);
        }

        function getFilter() {
            return filterClauses;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name LocalDataManager#setFilter
         * @access internal
         * @description
         * sets the filter function to use when getting a page of data.
         *
         */
        function setFilter(clauses) {
            filterClauses = clauses;
            filterQueryString = filterService.getODataFilterString(clauses);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getSearchField
         * @access internal
         * @description
         * Retrieves the field name currently used for matching quick search text.
         *
         * @returns {String}
         * A field name.
         *
         */
        function getSearchField() {
            return searchField;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#setSearchField
         * @access internal
         * @description
         * Sets the field to use for matching quick search text.
         *
         * @param {String} [searchField]
         * The field to use for searching.
         *
         */
        function setSearchField(newField) {
            searchField = newField;
            setCurrentPage(1);
        }

        /**
        * @ngdoc method
        * @module siemens.simaticit.common.widgets.pager
        * @name ServerDataManager#setSortInfo
        * @access internal
        * @description
        * Returns the query string by resetting the skip counter for the query string to initial value.
        *
        * @returns {String}
        * A function used for resetting skip value.
        *
        */

        function resetPager(queryString) {
            var pattern = /(\w*skip=\w*[0-9]+)/; //NOSONAR
            if (pattern.test(queryString)) {
                queryString = queryString.replace(pattern, 'skip=0');
            }
            return queryString;
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#setSortInfo
         * @access internal
         * @description
         * Sets the data field and direction for sorting the data collection.
         *
         * @param {string} [field]
         * The name of the field to sort by.
         *
         * @param {String } [direction]
         * The direction of the sort. Must be **asc** or **desc** case-insensitive.
         */
        function setSortInfo(field, direction) {
            sortField = field;
            setSortDirection(direction);
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.pager
         * @name ServerDataManager#getSortInfo
         * @access internal
         * @description
         * Retrieves the current field and direction used for sorting.
         *
         * @returns {Object}
         * An object containing the sort field and direction.
         *
         * The object has the following format
         * ```
         *     {
         *         field: "lastName",
         *         direction: "desc"
         *     }
         * ```
         *
         */
        function getSortInfo() {
            return {
                field: sortField,
                direction: sortDirection
            };
        }

        function setSortDirection(direction) {
            sortDirection = direction && 'desc' === direction.toLowerCase() ? 'desc' : 'asc';
        }

        function loadPageOfData(PageNo, pageSize) {
            // check service
            if (typeof serverConfiguration.dataService.getAll !== 'function' && !serverConfiguration.appName) {
                logger.logErr('The given service does not have a getAll function.');
                throw new Error('The given service does not have a getAll function.');
            }

            if (typeof serverConfiguration.dataService.findAll !== 'function' && serverConfiguration.appName) {
                logger.logErr('The given service does not have a findAll function.If you defined in serverData appName the service must contain a findAll function');
                throw new Error('The given service does not have a findAll function.');
            }

            // check entity name
            if (!serverConfiguration.dataEntity) {
                logger.logErr(serverConfiguration.dataEntity + ' is not a valid value for data entity name.');
                throw new Error(serverConfiguration.dataEntity + ' is not a valid value for data entity name.');
            }

            // string we are building with all options
            if (serverConfiguration.onBeforeDataLoadCallBack && serverConfiguration.onBeforeDataLoadCallBack instanceof Function) {
                var configData = {
                    currentPage: PageNo,
                    pageSize: pageSize,
                    searchText: searchText,
                    searchField: searchField,
                    quickSearchEnabled: quickSearchEnabled,
                    sortField: sortField,
                    sortDirection: sortDirection,
                    filterClauses: filterClauses
                };
                return loadDataFromODataString(serverConfiguration.onBeforeDataLoadCallBack(configData));
            }

            var fullOptionsString = getFilterQueryString();

            // add page criteria
            var pageCriteria = '';
            if (pageSize && PageNo) {
                pageCriteria += fullOptionsString ? '&' : '';
                pageCriteria += '$top=' + pageSize + '&$skip=' + pageSize * (PageNo - 1);
            }
            fullOptionsString += pageCriteria;

            // add sorting info
            var sortCriteria = '';
            if (sortField) {
                sortCriteria = fullOptionsString ? '&' : '';
                sortCriteria += '$orderby=' + getFormattedFieldName(sortField) + ' ' + sortDirection;
            }
            fullOptionsString += sortCriteria;

            // count
            var countCriteria = fullOptionsString ? '&' : '';
            countCriteria += '$count=true';
            fullOptionsString += countCriteria;

            // any aditional oData string
            var additionalCriteria = '';
            if (serverConfiguration.optionsString) {
                additionalCriteria = fullOptionsString ? '&' : '';
                additionalCriteria += serverConfiguration.optionsString;
            }
            fullOptionsString += additionalCriteria;

            return loadDataFromODataString(fullOptionsString);
        }

        function loadDataFromODataString(optionsString) {
            // we're waiting for a call to the server to return OR there's already a request waiting on deck
            if (waitingForServer || nextDeferred) {
                if (nextOptionsString) {
                    logger.logInfo('Dropping waiting request. New request: ' + optionsString);
                    nextOptionsString = optionsString;
                    return nextDeferred.promise;
                }
                // make this request the next (waiting) request
                nextOptionsString = optionsString;
                nextDeferred = $q.defer();
                return nextDeferred.promise;
            }

            waitingForServer = true;
            var promise = null;
            if (!serverConfiguration.appName) {
                promise = serverConfiguration.dataService.getAll(serverConfiguration.dataEntity, optionsString);
            } else {
                promise = serverConfiguration.dataService.findAll({
                    appName: serverConfiguration.appName,
                    entityName: serverConfiguration.dataEntity,
                    options: optionsString
                });
            }
            return promise.then(onRequestSuccess, onRequestFailure).finally(onRequestComplete);
        }

        function onRequestSuccess(response) {
            logger.logInfo('Loaded ' + response.value.length + ' ' + serverConfiguration.dataEntity + ' records from data service.  Total records: ' + response.count);
            return {
                pageData: response.value,
                currentPage: 0,
                totalDataCount: response.count
            };
        }

        function onRequestFailure(reason) {
            logger.logErr('Error loading server data', reason);
            return $q.reject(reason);
        }

        function onRequestComplete() {
            // call to server has returned,
            waitingForServer = false;
            if (!nextOptionsString) {
                return;
            }
            // hold onto these
            var nextOptionsStringCopy = nextOptionsString;
            var wasNextDeferred = nextDeferred;

            // clear out these so another request can be handled
            nextOptionsString = '';
            nextDeferred = null;
            loadDataFromODataString(nextOptionsStringCopy).then(
                function (response) {
                    wasNextDeferred.resolve(response);
                },
                function (reject) {
                    wasNextDeferred.reject(reject);
                }
            );
        }

        function onDataSuccess(response, pageNo, deferred) {
            dataCount = response.totalDataCount;
            deferred.resolve({
                data: response.pageData,
                currentPage: pageNo,
                totalDataSize: response.totalDataCount
            });
        }

        // get the '$filter' portion of the query string based on current quick search and filter values.
        // (mainly in a func for testing but also makes 'loadPageOfData' slightly more compact)
        function getFilterQueryString() {
            var qsText;
            var searchQueryString;
            var combinedQueryString = '';
            currentSearchedText = searchText;

            if (quickSearchEnabled && searchField && searchText !== undefined && searchText !== null && searchText.length > 0) {
                if (searchText[0] === '*') {
                    if (searchText[searchText.length - 1] === '*') {
                        // contains
                        qsText = searchText.substr(1, searchText.length - 2);
                        qsText = filterService.escapeODataValue(qsText);
                        if (Object.prototype.toString.call(searchField) === '[object Array]') {
                            searchQueryString = constructQSString('contains', searchField, qsText);
                        } else {
                            searchQueryString = 'contains(' + getFormattedFieldName(searchField) + ',\'' + qsText + '\')';
                        }
                    } else {
                        // endsWith
                        qsText = searchText.substr(1);
                        qsText = filterService.escapeODataValue(qsText);
                        if (Object.prototype.toString.call(searchField) === '[object Array]') {
                            searchQueryString = constructQSString('endswith', searchField, qsText);
                        } else {
                            searchQueryString = 'endswith(' + getFormattedFieldName(searchField) + ',\'' + qsText + '\')';
                        }
                    }
                } else {
                    // beginsWith
                    qsText = searchText.substr(0, searchText.length);
                    qsText = filterService.escapeODataValue(qsText);
                    if (Object.prototype.toString.call(searchField) === '[object Array]') {
                        searchQueryString = constructQSString('startswith', searchField, qsText);
                    } else {
                        searchQueryString = 'startswith(' + getFormattedFieldName(searchField) + ',\'' + qsText + '\')';
                    }
                }
            }

            if (searchQueryString) {
                combinedQueryString = '$filter=' + searchQueryString;
                if (filterQueryString) {
                    combinedQueryString += ' and (' + filterQueryString + ')';
                }
            } else if (filterQueryString) {
                combinedQueryString = '$filter=' + filterQueryString;
            }

            return combinedQueryString;
        }

        function constructQSString(odataFunction, searchField, qsText) {
            var qsString;
            var i = 0, length = searchField.length;
            for (i; i < length; i++) {
                qsString = qsString ? qsString + ' or ' : '';
                qsString += odataFunction + '(' + getFormattedFieldName(searchField[i]) + ',\'' + qsText + '\')';
            }
            return qsString;
        }

        function getFormattedFieldName(fieldName) {
            return fieldName.replace ? fieldName.replace(/\./g, '/') : fieldName;
        }
    }
})();
