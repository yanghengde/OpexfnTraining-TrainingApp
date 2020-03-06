/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.pagination
 * @description
 * @access internal
 * This module provides functionalities related to pagination of a collection of data items.
 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.pagination', []);

})();

/**
  * @ngdoc directive
  * @name sitExtendedPager
  * @access internal
  * @module siemens.simaticit.common.widgets.pagination
  * @description
  * Displays the available pages for navigating through the data.
  * @usage
  * As an html element:
  * ```
  * <sit-extended-pager sit-options="options.pager"></sit-extended-pager>
  * ```
  * @restrict E
  *
  * @param {Object} sitOptions The object that contains various details required for the extended pagination. For a description of this object see {@link pagerOptions}
  *
  * @example
  * In a view template, you can use the **sitExtendedPager** as follows:
  *  ```
  * <div>
  * <sit-extended-pager sit-options="options.pager"></sit-extended-pager>
  * </div>
  * ```
  * The following example shows how to configure a sit-extended-pager widget:
  *
  * In Controller:
  * ```
  *    (function () {
  *    'use strict';
  *
  *    angular.module('siemens.simaticit.common.examples')
  *    .controller('paginationController', paginationController);
  *    function paginationController() {
  *        var vm = this;
  *        vm.pagerOptions = {
  *              type: 'extended',
  *              totalItems: 100,
  *              pageSize: 10,
  *              currentPage: 1,
  *              visiblePagesCount: 5
  *         }
  *    };
  *})();
  * ```
  */

/**
* @ngdoc type
* @name pagerOptions
* @access internal
* @module siemens.simaticit.common.widgets.pagination
* @description A configuration object that contains details for the extended pagination.
* @property {string} type [type = 'extended'] The string that represents the type of the pagination.
* @property {number} totalDataCount [totalDataCount = 100] Data representing the total number of records to be displayed.
* @property {number} pageSize [pageSize = 10] Data representing the number of records to be displayed in one page.
* @property {number} currentPage [currentPage = 1] Data representing page to be displayed on loading the widget.
* @property {number} visiblePagesCount [visiblePagesCount = 5] Data representing the number of buttons that should be visible in the pager.
* It should always be an odd number.
*/
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.pagination').directive('sitExtendedPager', ExtendedPagerDirective);

    ExtendedPagerDirective.$inject = ['common.widgets.service', '$timeout'];

    function ExtendedPagerDirective(widgetService, $timeout) {
        ExtendedPagerController.prototype = new widgetService.BaseWidget('Pagination Extended pager Widget', {
            visiblePagesCount: 5,
            pageSize: 10,
            totalDataCount: 100,
            currentPage: 1
        }, ['onPageChange','draw'], function () {
            this.visiblePagesCount = this.visiblePagesCount % 2 !== 0 ? this.visiblePagesCount : this.visiblePagesCount - 1;
        });
        function ExtendedPagerController() {
            var vm = this;
            this.$init();
            var numberOfVisiblePages;
            var DEFAULT_FLYOUT_API = {
                api: {
                    onClick: function (currentPage) {
                        vm.goToPage(currentPage);
                    }
                }
            }
            var DEFAULT_PAGE_NUMBER = [2];

            vm.flyoutOptions = {
                right: {
                    templateuri: 'common/widgets/pagination/pagination-right-pages-template.html',
                    size: vm.options.size,
                    api: DEFAULT_FLYOUT_API.api
                },
                left: {
                    templateuri: 'common/widgets/pagination/pagination-left-pages-template.html',
                    api: DEFAULT_FLYOUT_API.api,
                    size: vm.options.size
                }
            }

            function init(vm) {
                vm.pageNumbers = [];
                vm.loadPageNumbers = loadPageNumbers;
                setupPageDetails();
            }

            function setupPageDetails() {
                findPageCountDetails();
                loadPageNumbers();
            }

            function getTotalPages() {
                return vm.options.pageSize < 1 ? 1 : Math.ceil(vm.options.totalDataCount / vm.options.pageSize);
            }

            function findPageCountDetails() {
                vm.totalPages = getTotalPages();
                numberOfVisiblePages = (vm.totalPages < vm.options.visiblePagesCount) ? vm.totalPages : vm.options.visiblePagesCount;
                vm.flyoutOptions.right.visiblePages = numberOfVisiblePages;
                vm.flyoutOptions.left.visiblePages = numberOfVisiblePages;
            }


            function setMorePageButtonsVisiblity(minimumLeftPage, maximumRightPage, isPageTobeCentered, currentPageNumber) {
                var moreBtnVisiblity = {};
                if ((maximumRightPage - minimumLeftPage) > 1 && currentPageNumber > minimumLeftPage && currentPageNumber < maximumRightPage) {
                    moreBtnVisiblity.isLeftMoreBtnVisible = true;
                    moreBtnVisiblity.isRightMoreBtnVisible = true;
                }
                else if (currentPageNumber < minimumLeftPage + 1) {
                    moreBtnVisiblity.isLeftMoreBtnVisible = false;
                    moreBtnVisiblity.isRightMoreBtnVisible = true;
                } else if (currentPageNumber > maximumRightPage - 1) {
                    moreBtnVisiblity.isLeftMoreBtnVisible = true;
                    moreBtnVisiblity.isRightMoreBtnVisible = false;
                }
                return moreBtnVisiblity;
            }
            function getStartPageNumber(currentPageNumber, totalPages, numberOfVisiblePages, isLeftMoreBtnVisible, isRightMoreBtnVisible, isPageTobeCentered, oldPageNumbers) {
                if (!isRightMoreBtnVisible && isLeftMoreBtnVisible) {
                    return totalPages - (numberOfVisiblePages - 3);
                }
                if (!isLeftMoreBtnVisible) {
                    return 2;
                } else {
                    if (isPageTobeCentered) {
                        return Math.max(currentPageNumber - Math.floor((numberOfVisiblePages - 2) / 2)) + 1;
                    } else {
                        if (currentPageNumber < oldPageNumbers[0]) {
                            return currentPageNumber;
                        }
                        if (currentPageNumber > oldPageNumbers[Object.keys(oldPageNumbers).length - 1]) {
                            return currentPageNumber - 4;
                        } else {
                            return oldPageNumbers[0];
                        }
                    }
                }
            }
            function setStartPageNumber(currentPageNumber, totalPages, numberOfVisiblePages, isLeftMoreBtnVisible, isRightMoreBtnVisible, isPageTobeCentered, oldPageNumbers) {
                var startPageNumber;
                if (currentPageNumber === totalPages) return startPageNumber = totalPages - (numberOfVisiblePages - 3);
                if (currentPageNumber === 1) return startPageNumber = 2;
                startPageNumber = (currentPageNumber < totalPages && currentPageNumber > 1) ?
                    getStartPageNumber(currentPageNumber, totalPages, numberOfVisiblePages, isLeftMoreBtnVisible, isRightMoreBtnVisible, isPageTobeCentered, oldPageNumbers)
                    : startPageNumber;
                return startPageNumber;
            }
            function getLeftMorePages(startPage) {
                var leftMorePages = [];
                for (var i = 2; i < startPage; i++) {
                    leftMorePages.push(i);
                }
                return leftMorePages;
            }
            function getRightMorePages(endPageNumber, totalPages) {
                var rightMorePages = [];
                for (var i = endPageNumber + 1; i < totalPages; i++) {
                    rightMorePages.push(i);
                }
                return rightMorePages;
            }


            function verifyIsPageTobeCentered(minimumLeftPage, maximumRightPage) {
                if (vm.options.currentPage > (minimumLeftPage - 1) && vm.options.currentPage <= maximumRightPage)
                    return true;
                else
                    return false;

            }
            function generateDynamicPages() {
                var minimumLeftPage = Math.floor(numberOfVisiblePages / 2) + 1;
                var maximumRightPage = (vm.totalPages - Math.floor(numberOfVisiblePages / 2));
                var currentPageNumber = vm.options.currentPage;
                var isPageTobeCentered = verifyIsPageTobeCentered(minimumLeftPage, maximumRightPage);
                vm.isLeftMoreBtnVisible = false;
                vm.isRightMoreBtnVisible = false;
                var getMoreBtnVisiblity = setMorePageButtonsVisiblity(minimumLeftPage, maximumRightPage, isPageTobeCentered, currentPageNumber);
                vm.isLeftMoreBtnVisible = getMoreBtnVisiblity.isLeftMoreBtnVisible;
                vm.isRightMoreBtnVisible = getMoreBtnVisiblity.isRightMoreBtnVisible;
                var startPage = setStartPageNumber(currentPageNumber, vm.totalPages, numberOfVisiblePages, vm.isLeftMoreBtnVisible, vm.isRightMoreBtnVisible, isPageTobeCentered, vm.oldPageNumbers);
                var endPageNumber = startPage + (vm.isRightMoreBtnVisible && vm.isLeftMoreBtnVisible ? numberOfVisiblePages - 5 : numberOfVisiblePages - 4);
                for (var number = startPage; number <= endPageNumber; number++) {
                    vm.pageNumbers.push(number);
                }
                if (vm.isLeftMoreBtnVisible) {
                    vm.leftMorePages = [], vm.flyoutOptions.left.templatedata = [];
                    vm.leftMorePages = getLeftMorePages(startPage);
                    vm.flyoutOptions.left.templatedata = vm.leftMorePages;
                }
                if (vm.isRightMoreBtnVisible) {
                    vm.rightMorePages = [], vm.flyoutOptions.right.templatedata = [];
                    vm.rightMorePages = getRightMorePages(endPageNumber, vm.totalPages);
                    vm.flyoutOptions.right.templatedata = vm.rightMorePages
                }
            }

            function setPageNumbers() {
                vm.pageNumbers = [];
                var startPageNo = 1, endPage = vm.totalPages;
                vm.isLeftMoreBtnVisible = false;
                vm.isRightMoreBtnVisible = false;
                var isMorePages = vm.options.visiblePagesCount && vm.options.visiblePagesCount < vm.totalPages;
                if (isMorePages) {
                    generateDynamicPages();
                } else {
                    if (endPage > 1) {
                        for (var startPageNumber = startPageNo + 1; startPageNumber < endPage; startPageNumber++) {
                            vm.pageNumbers.push(startPageNumber);
                        }
                    }
                }
            }

            function loadPageNumbers() {
                vm.oldPageNumbers = $.extend([], DEFAULT_PAGE_NUMBER, vm.pageNumbers);
                setPageNumbers();
            }
            function draw() {
                setupPageDetails();
            }
            vm.$register('draw',draw);
            (function (vm) {
                init(vm);
            })(this);


        }
        return {
            restrict: 'E',
            bindToController: {
                options: '=sitOptions'
            },
            scope: true,
            link: function (scope, element, attr, ctrl) {
                ctrl.goToPage = goToPage;
                $timeout(function () {
                    ctrl.$invokeEvent('onLoad', { element: element });
                });
                function goToPage(currentPage) {
                    ctrl.options.currentPage = currentPage;
                    angular.element('.sit-pagination-flyout.popover.fade.in').css({ display: 'none' })
                    ctrl.loadPageNumbers()
                    ctrl.$invokeEvent('onPageChange', { 'pageNumber': ctrl.options.currentPage });
                }
            },

            templateUrl: 'common/widgets/pagination/extended-pagination.html',
            controller: ExtendedPagerController,
            controllerAs: 'extendedPagerCtrl'
        }

    }


})();

/*jshint -W098 */
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name sitPagination
    * @access internal
    * @module siemens.simaticit.common.widgets.pagination
    * @description
    * A directive used for displaying the pagination.
    * @usage
    * As an html element:
    * ```
    * <sit-pagination sit-options="paginationCtrl.pageOptions"></sit-pagination>
    * ```
    * @restrict E
    *
    * @param {Object} sitOptions An object containing details for configuring pagination. For a description of this object see {@link paginationOptions}
    *
    * @example
    * In a view template, you can use the **sitPagination** as follows:
    *  ```
    * <div>
    * <sit-pagination sit-options="paginationCtrl.pageOptions"></sit-pagination>
    * </div>
    * ```
    * The following example shows how to configure a sit-pagination widget:
    *
    * In Controller:
    * ```
    *    pagingOptions: {
    *        pagerType: 'standard',
    *        size: 'medium'
    *    }
    * ```
    */

    /**
   * @ngdoc type
   * @name paginationOptions
   * @access internal
   * @module siemens.simaticit.common.widgets.pagination
   * @description A configuration object that contains details for configuring the pagination widget.
   * The object must have the following format:
   * @property {string} type [type = 'standard'] The string that represents the type of the pagination.
   * @property {number} totalDataCount [totalDataCount = 100] Data representing the total number of records to be displayed.
   * @property {number} pageSize [pageSize = 10] Data representing the number of records to be displayed in one page.
   * @property {number} currentPage [currentPage = 1] Data representing page to be displayed on loading the widget.
   * @property {number} visiblePagesCount [visiblePagesCount = 5] Data representing the number of buttons that should be visible in the pager.
   * It should always be an odd number.
   * @property {String} display	[display: 'inline'] defines the position of the page label and the page size.
   *
   * @example
   * ```
   *    type: 'standard',
   *    totalDataCount: 100,
   *    pageSize: 10,
   *    currentPage: 1,
   *    visiblePagesCount: 11,
   *    display: 'inline'
   *
   * ```
   */
    angular.module('siemens.simaticit.common.widgets.pagination').directive('sitPagination',
        ['$timeout', '$compile', 'common.widgets.service', function ($timeout, $compile, widgetService) {

            PaginationController.prototype = new widgetService.BaseWidget('Pagination widget', {
                type: 'standard',
                totalDataCount: 100,
                pageSize: 10,
                currentPage: 1,
                visiblePagesCount: 11,
                display: 'inline'
            }, ['onPageChange', 'onPageSizeChange'], function () {
                if (this.type === 'standard') {
                    this.visiblePagesCount = 11;
                } else if (this.type === 'extended') {
                    this.visiblePagesCount = 13;
                }
            });

            PaginationController.$inject = ['$scope']
            function PaginationController($scope) {
                var vm = this;
                this.$init($scope);

                function initLabel() {
                    vm.labelOptions = vm.labelOptions || {
                        format: widgetService.ENUMS.PaginationFormat.LONG
                    };

                    vm.labelOptions.pageSize = vm.options.pageSize;
                    vm.labelOptions.totalDataCount = vm.options.totalDataCount;
                    vm.labelOptions.currentPage = vm.options.currentPage;
                    vm.labelOptions.selectedItemsCount = vm.options.selectedItemsCount;
                }

                function initPageSize() {
                    vm.pageSizeOptions = vm.pageSizeOptions || {
                        pages: [{ size: 10 }, { size: 25 }, { size: 50 }, { size: 100 }],
                        $init: function () {
                            this.$subscribe('onPageSizeChange', function (eventArgs) {
                                vm.options.currentPage = 1;
                                vm.options.pageSize = eventArgs.size;
                                initLabel();
                                window.$UIF.Function.safeCall(vm.labelOptions,'api.draw');
                                initPager();
                                window.$UIF.Function.safeCall(vm.pagerOptions, 'api.draw');
                                vm.$invokeEvent('onPageSizeChange', eventArgs);
                            });
                        }
                    }
                    vm.pageSizeOptions.selectedPageSize = { size: vm.options.pageSize };
                }
                function initPager() {
                    vm.pagerOptions = vm.pagerOptions || {
                        type: vm.options.type || 'extended',
                        visiblePagesCount: vm.options.visiblePagesCount,
                        size: 'medium',
                        $init: function () {
                            this.$subscribe('onPageChange', function (eventArgs) {
                                vm.options.currentPage = eventArgs.pageNumber;
                                initLabel();
                                window.$UIF.Function.safeCall(vm.labelOptions, 'api.draw');
                                vm.$invokeEvent('onPageChange', eventArgs);
                            });
                        }
                    };
                    vm.pagerOptions.totalDataCount = vm.options.totalDataCount;
                    vm.pagerOptions.currentPage = vm.options.currentPage;
                    vm.pagerOptions.pageSize = vm.options.pageSize;
                }
                function init() {
                    initLabel();
                    initPageSize();
                    initPager();
                    vm.options.updateSelectedItemsCount = updateSelectedItemsCount;
                }
                function draw() {
                    initLabel();
                    window.$UIF.Function.safeCall(vm.labelOptions, 'api.draw');
                    initPageSize();
                    initPager();
                    window.$UIF.Function.safeCall(vm.pagerOptions, 'api.draw');

                }
                vm.$register('draw', draw);

                function updateSelectedItemsCount() {
                    vm.labelOptions.selectedItemsCount = vm.options.selectedItemsCount;
                }

                (function () {
                    init();
                })();
            }

            return {
                scope: {},
                restrict: 'E',
                bindToController: {
                    'options': '=sitOptions'
                },
                controller: PaginationController,
                controllerAs: 'pgCtrl',
                link: function (scope, element, attrs, ctrl) {
                    $timeout(function () {
                        ctrl.$invokeEvent('onLoad', { element: element });
                    });
                },
                templateUrl: 'common/widgets/pagination/pagination.html'
            };
        }]);
})();



/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.pagination');

    app.controller('paginationFlyoutController', paginationFlyoutController);

    app.directive('sitPaginationFlyout', ['$http', '$compile', function ($http, $compile) {

        return {
            scope: true,
            restrict: 'A',
            bindToController: {
                'options': '=sitOptions'
            },
            controller: 'paginationFlyoutController',
            controllerAs: 'FlyoutCtrl',
            link: function (scope, el, attr, ctrl) {
                var ESC_CODE = 27, buttonSize, DEFAULT_TOP_TEXT = 'top', buttonWidth, DEFAULT_SCROLLBAR_WIDTH = 17, DEFAULT_MAX_ROWS = 5, MENU_PADDING = 16, buttonMargin;
                var template = '<div class="sit-pagination-flyout popover"><div class="arrow"></div><div class="flyout" role="tooltip">' +
                    '<div class="popover-content"></div></div></div>'
                $http.get(ctrl.options.templateuri).then(function (popOverContent) {
                    $(el).popover({
                        trigger: 'click',
                        html: true,
                        template: template,
                        container: 'body',
                        content: function () {
                            return $compile(popOverContent.data)(scope)
                        },
                        placement: DEFAULT_TOP_TEXT
                    })
                });

                $(el).on("show.bs.popover", function () {
                    buttonSize = el.first().outerWidth();
                    buttonMargin = parseInt(el.first().css('margin-left')) + parseInt(el.first().css('margin-right'));
                    buttonWidth = buttonSize + buttonMargin;
                    ctrl.popoverOverElement = el.data("bs.popover").tip();


                    //calculate popover content max width based on number of visible pages in pagination
                    var popoverContentMaxWidth = buttonWidth * (ctrl.options.visiblePages - 1) + (MENU_PADDING / 2) + MENU_PADDING;
                    //calculate popover content max height - maximum 5 rows
                    var popoverContentMaxHeight = (buttonWidth + (MENU_PADDING / 2)) * DEFAULT_MAX_ROWS + MENU_PADDING;
                    //calculte for possible page rows
                    var maximumButtons = (ctrl.options.visiblePages - 1) * DEFAULT_MAX_ROWS;
                    //verify scrollbar visibility
                    var isScrollbarVisible = (ctrl.options.templatedata.length) > maximumButtons;
                    if (isScrollbarVisible) {
                        popoverContentMaxWidth += DEFAULT_SCROLLBAR_WIDTH;
                    }

                    ctrl.popoverOverElement.css({
                        maxWidth: popoverContentMaxWidth,
                        maxHeight: popoverContentMaxHeight
                    }).find('.popover-content').css({
                        maxWidth: popoverContentMaxWidth,
                        maxHeight: popoverContentMaxHeight
                    })
                });
                $(el).on("inserted.bs.popover", function () {
                    if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
                        scope.$apply();
                    }
                });
                $(el).on("shown.bs.popover", function () {
                    var moreBtnOffset = el.offset();
                    var buttonGroupOffset = angular.element("sit-extended-pager .pl-buttons-square-group").offset();
                    var btngrpwidth = buttonGroupOffset.left + buttonSize;
                    var twoButtonsWidth = 2 * buttonWidth + MENU_PADDING;
                    ctrl.popoverOverElement.css({ top: (moreBtnOffset.top - ctrl.popoverOverElement.first().outerHeight() - (buttonMargin / 2)), left: btngrpwidth + buttonWidth })
                    ctrl.popoverOverElement.find('.pl-button-square').css({
                        width: el.first().outerWidth(),
                        height: el.first().outerHeight(),
                        lineHeight: el.first().css('font-size'),
                        fontSize: el.first().css('line-height')
                    })

                    if (ctrl.options.templatedata.length > (ctrl.options.visiblePages - 2)) {
                        ctrl.popoverOverElement.css({ top: (moreBtnOffset.top - ctrl.popoverOverElement.first().outerHeight() - (buttonMargin / 2)), left: btngrpwidth + buttonWidth })
                            .find('.arrow').css({
                                left: (moreBtnOffset.left + (buttonWidth / 2) - ctrl.popoverOverElement.offset().left)
                            })
                    }
                    if (ctrl.options.templatedata.length <= (ctrl.options.visiblePages - 2) && ctrl.options.templatedata.length >= 4) {
                        var morePagesButtonPosition = moreBtnOffset.left - buttonGroupOffset.left;
                        if (morePagesButtonPosition > twoButtonsWidth) {
                            ctrl.popoverOverElement.css({ top: (moreBtnOffset.top - ctrl.popoverOverElement.first().outerHeight() - (buttonMargin / 2)), left: moreBtnOffset.left - ((ctrl.options.templatedata.length - 1) * buttonWidth) })
                                .find('.arrow').css({
                                    left: (moreBtnOffset.left + (buttonWidth / 2) - ctrl.popoverOverElement.offset().left)
                                })
                        }
                        if (morePagesButtonPosition < twoButtonsWidth) {
                            ctrl.popoverOverElement.css({ top: (moreBtnOffset.top - ctrl.popoverOverElement.first().outerHeight() - (buttonMargin / 2)), left: moreBtnOffset.left - buttonWidth })
                                .find('.arrow').css({
                                    left: (moreBtnOffset.left + (buttonWidth / 2) - ctrl.popoverOverElement.offset().left)
                                })
                        }
                    } else if (ctrl.options.templatedata.length < 4) {
                        ctrl.popoverOverElement.css({ top: (moreBtnOffset.top - ctrl.popoverOverElement.first().outerHeight() - (buttonMargin / 2)), left: moreBtnOffset.left - buttonWidth })
                    }
                });


                // Prevent to dismiss popup when the user click on it
                $('html').on('click', docClickCallback);

                // Dismiss popup on escape key
                $(window.document).on('keyup', keyUpCallback);

                // Position of flyout must be recalculated on resize
                $(window).on('resize', WindowResizeCallback);

                // Event called when the popover is shown
                $(el).on('shown.bs.popover', popoverShownCallback);

                // Event called when the popover is hidden
                $(el).on('hidden.bs.popover', popoverHiddenCallback);

                //destroy event handling
                scope.$on('$destroy', destroyCallback);

                function docClickCallback(e) {
                    $('[data-original-title]').each(function () {
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                }

                function keyUpCallback(event) {
                    if (event.which === ESC_CODE) {
                        $('[data-original-title]').popover('hide');
                    }
                }

                function WindowResizeCallback() {
                    if (ctrl.getVisibility()) {
                        $(el).popover('show');
                    }
                }

                function popoverShownCallback() {
                    ctrl.setVisibility(true);
                }

                function popoverHiddenCallback() {
                    ctrl.setVisibility(false);
                }

                function destroyCallback() {
                    $('html').off('click', docClickCallback);
                    $(window).off('resize', WindowResizeCallback);
                    $(window.document).off('keyup', keyUpCallback);
                    $(el).off('shown.bs.popover', popoverShownCallback);
                    $(el).off('hidden.bs.popover', popoverHiddenCallback);
                }

            }

        };
    }]);
    function paginationFlyoutController() {
        var vm = this;

        function init(vm) {
            vm.isVisible = false;
            vm.setVisibility = setVisibility;
            vm.getVisibility = getVisibility;
            vm.closeFlyout = closeFlyout;
        }

        function setVisibility(visibility) {
            vm.isVisible = visibility;
        }

        function getVisibility() {
            return vm.isVisible;
        }

        function closeFlyout(event) {
            $('[data-original-title]').popover('hide');
            $('body').on('hidden.bs.popover', function (e) {
                $(e.target).data("bs.popover").inState.click = false;
            });
            vm.options.api.onClick(parseInt(event.target.innerText));
        }

        (function (vm) {
            init(vm);
        })(this);

    }
})();

/*jshint -W098 */
(function () {
    'use strict';
    /**
   * @ngdoc directive
   * @name sitpaginationLabel
   * @access internal
   * @module siemens.simaticit.common.widgets.pagination
   * @description
   * Displays the pagination label which includes the first visible entry,the last visible entry of selected page and the total entries.
   *
   * @usage
   * As an element:
   * ```
   * <sit-pagination-label sit-options="options">
   * </sit-pagination-label>
   * ```
   * @restrict E
   * @param {Object} sitOptions The object which contains the details to be included in the pagination label. For the description of this object see {@link paginationLabelOptions}
   *
   * @example
   * In a view template, you can use the **sitpaginationLabel** as follows:
   *  ```
   * <div>
   *     <sit-pagination-label sit-options="pgLableCtrl.options">
   *     </sit-pagination-label>
   * </div>
   * ```
   * The following example shows how to configure a sit-pagination-label widget:
   *
   * In Controller:
   * ```
   *    (function () {
   *    'use strict';
   *
   *    angular.module('siemens.simaticit.common.examples')
   *    .controller('PaginationLabelController', PaginationLabelController);
   *    function PaginationLabelController() {
   *        var vm = this;
   *        vm.options = {
   *            format: "SHORT",
   *            startValue: 41,
   *            endValue: 50,
   *            totalDataCount: 110
   *        }
   *    };
   *})();
   * ```
   */

    /**
    * @ngdoc type
    * @name paginationLabelOptions
    * @access internal
    * @module siemens.simaticit.common.widgets.pagination
    * @description An object containing the configuration details to be displayed in the pagination Label.
    * @property {String} [format=LONG]
    * Specifies the format of the label.
    * The following values are allowed:
    * * **SHORT**: displays SHORT label format.
    * * **LONG**: displays LONG label format.
    *
    * Example:
    * ```
    * LONG label format: Showing "first visible" to "last visible" of "total" entries.
    * SHORT label format: "First Visible" to "Last Visible" of "Total".
    *
    * ```
    * @property {Number} [startValue=1] The property shows first visible entry in the selected page.
    * @property {Number} [endValue=1] The property shows last visible entry in the selected page.
    * @property {Number} [totalDataCount=1] The property shows total number of entries.
    */
    var app = angular.module('siemens.simaticit.common.widgets.pagination');



    app.directive('sitPaginationLabel', ['common.widgets.service', '$timeout', function (widgetService, $timeout) {
        var FORMAT = widgetService.ENUMS.PaginationFormat;

        PaginationLabelController.prototype = new widgetService.BaseWidget('Pagination label widget', {
            format: FORMAT.LONG,
            totalDataCount: 1,
            pageSize: 1,
            currentPage: 1
        }
        );

        PaginationLabelController.$inject = ['$scope']
        function PaginationLabelController($scope) {
            var vm = this;
            this.FORMAT = FORMAT;
            this.$init($scope);
            this.startValue = 1;
            this.endValue = 1;

            function draw() {
                vm.startValue =
                    vm.options.currentPage * vm.options.pageSize - (vm.options.pageSize - 1);
                vm.endValue =
                    (vm.options.currentPage * vm.options.pageSize) <= vm.options.totalDataCount ? vm.options.currentPage * vm.options.pageSize :
                        vm.startValue + (vm.options.totalDataCount % vm.options.pageSize) - 1;
            }

            vm.$register('draw', draw);

            (function (vm) {
                draw();
            })(this);

        }

        return {
            scope: true,

            restrict: 'E',

            bindToController: {
                'options': '=sitOptions'
            },

            controller: PaginationLabelController,

            controllerAs: 'pgLabelCtrl',

            link: function (scope, element, attrs, ctrl) {
                $timeout(function () {
                    ctrl.$invokeEvent('onLoad', { element: element });
                });
            },

            templateUrl: 'common/widgets/pagination/pagination-label.html'
        };
    }]);
})();



(function () {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name sitPaginationPageSize
     * @access internal
     * @module siemens.simaticit.common.widgets.pagination
	 * @description
     * Displays the options for selecting the number of records that must be in a page.
     * @usage
     * As an html element:
     * ```
     * <sit-pagination-page-size sit-options="paginationCtrl.pageSizeOptions"></sit-pagination-page-size>
     * ```
     * @restrict E
     *
     * @param {Object} sitOptions The object that contains the details of the available page sizes and the selected page size.
     * For a description of this object see {@link pageSizeOptions}
     *
     * @example
     * In a view template, you can use the **sitPaginationPageSize** as follows:
     *  ```
     * <div>
     * <sit-pagination-page-size sit-options="paginationCtrl.pageSizeOptions"></sit-pagination-page-size>
     * </div>
     * ```
     * The following example shows how to configure a sit-pagination-page-size widget:
     *
     * In Controller:
     * ```
     *    (function () {
     *    'use strict';
     *
     *    angular.module('siemens.simaticit.common.examples')
     *    .controller('paginationPageSizeController', paginationPageSizeController);
     *    function paginationPageSizeController() {
     *        var vm = this;
     *        vm.pageSizeOptions = {
     *             pages: [{ size: 10 }, { size: 25 }, { size: 50 }],
     *             selectedPageSize: { size: 10 }
     *         }
     *    };
     *})();
     * ```
     */

    /**
   * @ngdoc type
   * @name pageSizeOptions
   * @access internal
   * @module siemens.simaticit.common.widgets.pagination
   * @description A configuration object that contains details of all the available page sizes.
   * @property {Array<Object>} [pages={ size: 10 }, { size: 25 },{ size: 50 }, { size: 100 }]
   * An array of object representing the number of records to be displayed in a particular page.
   * The object must have the following format:
   * * **size**: defines the page size to display the records in a page.
   *
   * ```
   * [
   *     {
   *         size: 5
   *     },
   *     {
   *         size: 10
   *     },
   *     {
   *         size: 25
   *     }
   *  ]
   *
   * ```
   * @property {Object} [selectedPageSize={size:10}] An object representing the number of records to be displayed on the initial page load.
   *
   * The api received from Base Widget object contains the following functions.
   * * **onPageSizeChange**: Function that is called when the current page size is changed.
   * * **onLoad**: Function that is called when the page size directive is loaded completely.
   * * **draw** Function that is called when the configuration needs to re-initialised to the new updated value.
   */
    angular.module('siemens.simaticit.common.widgets.pagination').directive('sitPaginationPageSize', PaginationPageSizeDirective);

    PaginationPageSizeDirective.$inject = ['$window', '$timeout', 'common.widgets.service'];

    function PaginationPageSizeDirective($window, $timeout, widgetService) {

        PaginationPageSizeController.prototype = new widgetService.BaseWidget('Pagination Page Size Widget', {
            pages: [{ size: 10 }, { size: 25 }, { size: 50 }, { size: 100 }],
            selectedPageSize: { size: 10 }
        }, 'onPageSizeChange', function () {
            if (this.pages && this.pages.length && this.selectedPageSize) {
                if (!this.selectedPageSize.size || !_.findWhere(this.pages, { size: this.selectedPageSize.size })) {
                    this.selectedPageSize = this.pages[0];
                }
            }
        });
        PaginationPageSizeController.$inject = ['$scope'];
        function PaginationPageSizeController($scope) {
            // Base Widget Init Method
            var vm = this;
            this.$init($scope);
            this.pageSizeChange = function (oldValue, newValue) {
                newValue && vm.$invokeEvent('onPageSizeChange', { size: newValue.size ? newValue.size : newValue });
            }
        }

        return {
            restrict: 'E',
            bindToController: {
                options: '=sitOptions'
            },
            link: function (scope, element, attr, ctrl) {
                ctrl.$invokeEvent('onLoad', { element: element });
            },
            scope: true,
            templateUrl: 'common/widgets/pagination/pagination-page-size.html',
            controller: PaginationPageSizeController,
            controllerAs: 'paginationPageSizeCtrl'
        };
    }
})();

(function () {
    'use strict';
    /**
	 * @ngdoc directive
	 * @name sitSimplePager
     * @access internal
     * @module siemens.simaticit.common.widgets.pagination
	 * @description
     * Displays the simple pager widget used for navigating between the data pages.
     * @usage
     * As an html element:
     * ```
     * <sit-simple-pager sit-options="simplePagerCtrl.pageOptions"></sit-simple-pager>
     * ```
     * @restrict E
     *
     * @param {Object} sitOptions The object that contains the details for the widget. For the description of this object see {@link pageOptions}
     *
     * @example
     * In a view template, you can use the **sitSimplePager** as follows:
     *  ```
     * <div>
     * <sit-simple-pager sit-options="simplePagerCtrl.pageOptions"></sit-simple-pager>
     * </div>
     * ```
     * The following example shows how to configure a sit-simple-pager widget:
     *
     * In Controller:
     * ```
     *    (function () {
     *    'use strict';
     *
     *    angular.module('siemens.simaticit.common.examples')
     *    .controller('SimplePagerController', SimplePagerController);
     *    function SimplePagerController() {
     *        var vm = this;
     *        vm.pageOptions = {
     *            totalDataCount = 20,
     *            pageSize= 10,
     *            currentPage= 1
     *         }
     *    };
     *})();
     * ```
     */

    /**
   * @ngdoc type
   * @name pageOptions
   * @access internal
   * @module siemens.simaticit.common.widgets.pagination
   * @description A configuration object that contains the details required for the simple-pager widget.
   * @property {Number} [totalDataCount=10]
   * The total number of the records to be displayed.
   * @property {Number} [pageSize= 10] The pageSize representing the number of records to be displayed in one page.
   * @property {Number} [currentPage= 1] The currentPage representing the page number to be selected by default on the initial page load.
   *
   */

    angular.module('siemens.simaticit.common.widgets.pagination').directive('sitSimplePager', simplePagerDirective);

    simplePagerDirective.$inject = ['common.widgets.service'];
    function simplePagerDirective(widgetService) {

        SimplePagerController.prototype = new widgetService.BaseWidget('Pagination simple pager Widget', {
            totalDataCount: 10,
            pageSize: 10,
            currentPage: 1
        }, 'onPageChange', function () {
            if (this.currentPage > Math.ceil(this.totalDataCount / this.pageSize)) {
                this.currentPage = 1;
            }
        });

        function SimplePagerController() {
            var vm = this;
            this.$init();

            (function () {
                init();
            })();

            function init() {
                vm.$register('draw',draw);
                Object.defineProperty(vm, 'totalPageCount', {
                    get: function () {
                        return Math.ceil(vm.options.totalDataCount / vm.options.pageSize);
                    },
                    enumerable: true
                });

                vm.pagingOptions = {
                    options: getPages(vm.totalPageCount)
                };

                vm.pagingOptions.currentPageNumber = getCurrentPageFromOptions(vm.pagingOptions.options, vm.options.currentPage);
                vm.changePage = changePage;
                vm.selectPage = selectPage;
            }

            function getCurrentPageFromOptions(options, currentPage) {
                return options.length ? _.findWhere(options, { page: currentPage || 1 }) : {};
            }

            function getPages(totalPageCount) {
                var options = [];
                for (var pageNumber = 1; pageNumber <= totalPageCount; pageNumber++) {
                    options.push({ page: pageNumber });
                }
                return options;
            }

            /**
            * @ngdoc method
            * @module siemens.simaticit.common.widgets.pagination
            * @access internal
            * @name pageOptions#changePage
            *
            * @description
            * An API used to change the page number in the simple pager widget.
            */
            function changePage() {
                vm.pagingOptions.currentPageNumber = { page: vm.options.currentPage };
            }

            /**
            * @ngdoc method
            * @module siemens.simaticit.common.widgets.pagination
            * @access internal
            * @name pageOptions#selectPage
            *
            * @description
            * An API used to select the page number in the simple pager widget.
            */
            function selectPage(oldValue, newValue) {
                if (oldValue !== newValue) {
                    vm.options.currentPage = newValue.page;
                }

                vm.$invokeEvent('onPageChange', { 'pageNumber': vm.options.currentPage });
            }

            function draw() {
                vm.pagingOptions.options = getPages(vm.totalPageCount);
                if (vm.options.currentPage > Math.ceil(vm.options.totalDataCount / vm.options.pageSize)) {
                    vm.options.currentPage = 1;
                }
                vm.pagingOptions.currentPageNumber = getCurrentPageFromOptions(vm.pagingOptions.options, vm.options.currentPage);
            }
        }

        return {
            restrict: 'E',
            bindToController: {
                options: '=?sitOptions'
            },
            scope: true,
            templateUrl: 'common/widgets/pagination/simple-pagination.html',
            controller: SimplePagerController,
            controllerAs: 'SimplePagerCtrl'
        };
    }
})();

(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @name sitStandardPager
   * @access internal
   * @module siemens.simaticit.common.widgets.pagination
   * @description
   * Displays the available pages for navigating through the data.
   * @usage
   * As an html element:
   * ```
   * <sit-standard-pager sit-options="options.pager"></sit-standard-pager>
   * ```
   * @restrict E
   *
   * @param {Object} sitOptions The object that contains various details required for the standard pagination. For a description of this object see {@link pagerOptions}
   *
   * @example
   * In a view template, you can use the **sitStandardPager** as follows:
   *  ```
   * <div>
   * <sit-standard-pager sit-options="options.pager"></sit-standard-pager>
   * </div>
   * ```
   * The following example shows how to configure a sit-standard-pager widget:
   *
   * In Controller:
   * ```
   *    (function () {
   *    'use strict';
   *
   *    angular.module('siemens.simaticit.common.examples')
   *    .controller('paginationController', paginationController);
   *    function paginationController() {
   *        var vm = this;
   *        vm.pagerOptions = {
   *              type: 'standard',
   *              totalItems: 100,
   *              pageSize: 10,
   *              currentPage: 1,
   *              visiblePagesCount: 5,
   *              size: 'medium'
   *         }
   *    };
   *})();
   * ```
   */

    /**
   * @ngdoc type
   * @name pagerOptions
   * @access internal
   * @module siemens.simaticit.common.widgets.pagination
   * @description A configuration object that contains details for the standard pagination.
   * @property {string} type type = 'standard'
   * The string that represents the type of the pagination.
   * @property {number} totalDataCount [totalDataCount = 100] Data representing the total number of records to be displayed.
   * @property {number} pageSize [pageSize = 10] Data representing the number of records to be displayed in one page.
   * @property {number} currentPage [currentPage = 1] Data representing page to be displayed on loading the widget.
   * @property {number} visiblePagesCount [visiblePagesCount = 5] Data representing the number of buttons that should be visible in the pager.
   * It should always be an odd number.
   * @property {number} size [size = 'medium'] Data representing the size of the buttons in the standard pager.
   * It can be either 'medium' or 'small'.
   */

    angular.module('siemens.simaticit.common.widgets.pagination').directive('sitStandardPager', StandardPagerDirective);

    StandardPagerDirective.$inject = ['common.widgets.service'];

    function StandardPagerDirective(widgetService) {
        StandardPagerController.prototype = new widgetService.BaseWidget('Pagination Standard pager Widget', {
            visiblePagesCount: 5,
            pageSize: 10,
            totalDataCount: 100,
            currentPage: 1
        }, ['onPageChange', 'draw'], function () {
            this.visiblePagesCount = this.visiblePagesCount % 2 !== 0 ? this.visiblePagesCount : this.visiblePagesCount - 1;
        });

        StandardPagerController.$inject = ['$scope']
        function StandardPagerController($scope) {
            var vm = this;

            this.$init($scope);

            this.$load = function () {
                init(vm);
            };

            var selectionIndex, numberOfVisiblePages, onLoadSelectionIndex;

            function init(vm) {
                vm.pageNumbers = [];

                vm.onPageChanged = onPageChanged;
                vm.stepForward = stepForward;
                vm.stepBackward = stepBackward;
                vm.goToLast = goToLast;
                vm.goToFirst = goToFirst;

                setupPageDetails();
                onLoadSelectionIndex = undefined;
            }

            function setupPageDetails() {
                findPageCountDetails();
                if (!vm.options.currentPageIndex && vm.options.currentPage !== 1) {
                    vm.options.currentPageIndex = vm.options.currentPage <= numberOfVisiblePages ? vm.options.currentPage - 1 : getcurrentPageIndex();
                }

                if (vm.options.currentPage === 1) {
                    vm.options.currentPageIndex = 0;
                }

                if (vm.options.currentPage <= vm.options.currentPageIndex) {
                    vm.options.currentPageIndex--;
                }

                setPageNumbers(vm.options.currentPageIndex || 0);
            }

            function getcurrentPageIndex() {
                var tempPageCount = vm.options.currentPage + Math.floor(numberOfVisiblePages / 2);
                if (tempPageCount <= vm.totalPages) {
                    return Math.floor(numberOfVisiblePages / 2);
                } else {
                    return tempPageCount - vm.totalPages + Math.floor(numberOfVisiblePages / 2);
                }
            }
            function getTotalPages() {
                return Math.ceil(vm.options.totalDataCount / vm.options.pageSize);
            }

            function findPageCountDetails() {
                vm.totalPages = getTotalPages();
                numberOfVisiblePages = (vm.totalPages < vm.options.visiblePagesCount) ? vm.totalPages : vm.options.visiblePagesCount;
            }

            function isSelectionCentered(selectedButtonPos) {
                return vm.options.currentPage > Math.floor(numberOfVisiblePages / 2) && vm.options.currentPage <= vm.totalPages - Math.floor(numberOfVisiblePages / 2);
            }

            function setPageNumbers(selectionPos) {
                var newPageNumbers = [];
                var isCentered = isSelectionCentered();
                selectionIndex = isCentered ? Math.floor(numberOfVisiblePages / 2) : selectionPos;
                var startPage = isCentered ? vm.options.currentPage - Math.floor(numberOfVisiblePages / 2) : vm.options.currentPage - selectionIndex;
                for (var i = startPage; i < startPage + numberOfVisiblePages; i++) {
                    newPageNumbers.push(i);
                }
                vm.pageNumbers = newPageNumbers;
            }

            function stepForward() {
                var selectionPos = selectionIndex >= numberOfVisiblePages - 1 ? selectionIndex : selectionIndex + 1;
                vm.options.currentPage++;
                goToPage(selectionPos);
            }

            function stepBackward() {
                var selectionPos = selectionIndex === 0 ? selectionIndex : selectionIndex - 1;
                vm.options.currentPage--;
                goToPage(selectionPos);
            }

            function goToLast() {
                vm.options.currentPage = vm.totalPages;
                goToPage(vm.pageNumbers.length - 1);
            }

            function goToFirst() {
                vm.options.currentPage = 1;
                goToPage();
            }

            function goToPage(selectionPos) {
                vm.options.currentPageIndex = selectionPos ? selectionPos : 0;
                setPageNumbers(vm.options.currentPageIndex);
                vm.$invokeEvent('onPageChange', { 'pageNumber': vm.options.currentPage });
            }

            function onPageChanged(pageNumber, selectionPos) {
                vm.options.currentPage = pageNumber;
                vm.options.currentPageIndex = selectionPos;
                goToPage(selectionPos);
            }

            function draw() {
                setupPageDetails();
            }
            vm.$register('draw', draw);

            (function (vm) {
                init(vm);
            })(this);



        }

        return {
            restrict: 'E',
            bindToController: {
                options: '=sitOptions'
            },
            scope: true,
            link: function (scope, element, attr, ctrl) {
                ctrl.$invokeEvent('onLoad', { element: element });
            },
            templateUrl: 'common/widgets/pagination/standard-pagination.html',
            controller: StandardPagerController,
            controllerAs: 'standardPagerCtrl'
        }
    }

})();
