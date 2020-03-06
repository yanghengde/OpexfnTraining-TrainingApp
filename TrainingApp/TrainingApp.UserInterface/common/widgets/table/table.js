/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.table
 * @description
 * Provides functionalities related to tables.
 */

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table', [])
        .run(['$templateCache', function ($templateCache) {

            $templateCache.put('template/smart-table/custom-pagination.html',
                '<div>' +
                '<div class="ngTotalSelectContainer">' +
                '<div class="ngFooterTotalItems">' +
                '<span class="ngLabel">{{"pager.total-items" | translate}}: {{totalItemCount}}</span>' +
                '</div>' +
                '<div class="ngFooterSelectedItems" ng-if="selectionMode !== \'single\' && selectionMode !== \'none\'">' +
                '<span class="ngLabel">{{"pager.selected-items"| translate}}: {{selectedItems}}</span>' +
                '</div>'+
                '</div>' +
                '<div class="ngPagerContainer">' +
                '<div class="ngRowCountPicker">' +
                '<span class="ngLabel page-size-label">{{"pager.page-size" | translate}}:</span>' +
                '<select class="uyRowCountSelect" ng-model="stItemsByPage" ng-options="pageSize for pageSize in stPageSizes"></select>' +
                '</div>' +
                '<div ng-if="pages.length >= 2" class="ngPagerControl">' +
                '<button type="button" class="ngPagerButton" ng-disabled="cantPageBackward(currentPage)"' +
                'ng-click="selectPage(1)" title="{{"pager.page-first" | translate}}">' +
                '<div class="ngPagerFirstTriangle"><div class="ngPagerFirstBar"></div></div>' +
                '</button>' +
                '<button type="button" class="ngPagerButton" ng-disabled="cantPageBackward(currentPage)"' +
                'ng-click="selectPage(currentPage - 1)" title="{{"pager.page-prev" | translate}}">' +
                '<div class="ngPagerFirstTriangle ngpagerprevtriangle"></div>' +
                '</button>' +
                '<div class="page-select-container">' +
                '<sit-page-select></sit-page-select>' +
                '<span class="ngGridMaxPagesNumber" ng-show="pages.length > 0"> / {{numPages}}</span>' +
                '</div>' +
                '<button type="button" class="ngPagerButton" ng-disabled="cantPageForward(currentPage)"' +
                'ng-click="selectPage(currentPage + 1)" title="{{"pager.page-next" | translate}}">' +
                '<div class="ngPagerLastTriangle ngpagernexttriangle"></div>' +
                '</button>' +
                '<button type="button" class="ngPagerButton" ng-disabled="cantPageForward(currentPage)"' +
                'ng-click="selectPage(numPages)" title="{{"pager.page-last" | translate}}">' +
                '<div class="ngPagerLastTriangle"><div class="ngPagerLastBar"></div></div>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>'
                );
        }]);
})();





(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table')
        .directive('sitPageSelect', function () {
            return {
                restrict: 'E',
                template: '<input type="number" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)" min="1" max="{{numPages}}">',
                link: function (scope) {
                    scope.$watch('currentPage', function (c) {
                        scope.inputPage = c;
                    });
                }
            }
        });
})();

(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @name sitTableButton
   * @module siemens.simaticit.common.widgets.table
   * @description
   * Displays a button.
   *
   * @usage
   * As an attribute:
   * ```
   * <span sit-table-button
   *       sit-type="buttonType"
   *       sit-icon="buttonIcon"
   *       sit-label="buttonLabel"
   *       ng-click="clickFunction()">
   * </span>
   * ```
   * @restrict A
   *
   * @param {string} [sit-type = normal] _(Optional)_  Type of button.
   * @param {String} sit-icon Icon for the button.
   * @param {String} sit-label Label for the button.
   * @param {String} ng-click Function to be called on button click.
   * @param {String} sit-svg-icon SVG icon for the button. This has the highest priority over the command and sit-icons.
   * @param {String} sit-cmd-icon Command icon for the button. This is used only if the svg icon is not available.

   *
   * @example
   * The following example shows how to configure a table button in a template:
   *
   * ```
   * <span sit-table-button
   *       sit-icon="fa-cogs"
   *       sit-svg-icon="./common/icons/cmdRefresh24.svg"
   *       sit-label="Settings">
   *       ng-click="tableExCtrl.onSettings()"
   * </span>
   * ```
   *
   * The example below shows how to declare a table button click function:
   * ```
   *  this.onSettings=function() {
   *    // statement goes here
   *  }
   * ```
   */
    angular.module('siemens.simaticit.common.widgets.table').directive('sitTableButton', sitTableButton);

    TableButtonController.$inject = ['$scope'];
    function TableButtonController($scope) {
        var vm = this;
        vm.buttonClicked = buttonClicked;
        function activate() {
            vm.displayIcon = null;
            if (!vm.type) {
                vm.type = 'normal';
            }
            if (vm.svgIcon) {
                vm.displayIcon = { path: vm.svgIcon, size: '16px' };
            } else if (vm.cmdIcon) {
                vm.displayIcon = { prefix: "cmd", name: vm.cmdIcon, suffix: "24", size: '16px' };
            }
        }

        function buttonClicked(button) {
            if (button.type === 'toggle') {
                button.selected = !button.selected;
            }
            if (button.hasOwnProperty('method')) {
                if (isFunction(button['method'])) {
                    button['method'](button);
                }
            }
        }

        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        activate();

        $scope.$on('$destroy', function () {
        });
    }

    function sitTableButton() {
        return {
            bindToController: {
                icon: '@sitIcon',
                method: '&tablebuttonclick',
                type: '@?sitType',
                selected: '=sitSelected',
                label: '@sitLabel',
                svgIcon: '@sitSvgIcon',
                cmdIcon: '@sitCmdIcon'
            },
            controller: TableButtonController,
            controllerAs: 'tableBtnCtrl',
            restrict: 'A',
            replace: true,
            scope: {},
            templateUrl: 'common/widgets/table/table-button.html'
        };
    }
})();

(function () {
    "use strict";

    angular.module('siemens.simaticit.common.widgets.table').directive('sitTableColResize', sitTableColResize);

    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.table
    * @name sitTableColResize
    * @access internal
    *
    * @restrict A
    *
    * @usage
    * As an attribute:
    * ```
    * <span sit-table-col-resize></span>
    * ```
    *
    * @description
	* Enables column resizing for the table.
    *
    */
    sitTableColResize.$inject = ['$interpolate', '$timeout', 'common.services.dragdrop.service'];
    function sitTableColResize($interpolate, $timeout, dragDropManager) {
        return {
            restrict: 'A',
            require: '^sitTable',
            compile: compile
        };

        function compile() {
            return {
                post: post
            };

            function post(scope, element) {
                var originalWidths = [];
                var resizableColumns = [];

                activate();
                function activate() {
                    subscribeEvents();
                    if (0 === $(element).find('th:not(.scroll-column-header)').length) {
                        startWatch();
                        return;
                    }
                    startProcessing();
                }

                function startWatch() {
                    var unwatch = scope.$watch(function () {
                        return $(element).find('th:not(.scroll-column-header)').length;
                    }, function (newValue) {
                        if (undefined === newValue || 0 === newValue) {
                            return;
                        }
                        $timeout(startProcessing);
                        unwatch();
                    });
                }

                function startProcessing() {
                    $(element).find('th:not(.scroll-column-header)').each(function (index) {
                        resizableColumns.push(new ResizableColumn($interpolate, $timeout, scope, element, this, index, originalWidths, dragDropManager));
                    });
                }

                var layoutChangeListner = scope.$on('sit-layout-change', function () {
                    resizableColumns.forEach(function (deregisterColumnEvents) {
                        deregisterColumnEvents();
                    });
                    originalWidths.splice(0, originalWidths.length)
                    resizableColumns.splice(0, resizableColumns.length);
                    startWatch();
                });

                function subscribeEvents() {
                    scope.$on('$destroy', function () {
                        layoutChangeListner();
                        originalWidths = resizableColumns = null;
                    });
                }
            }
        }
    }

    function ResizableColumn($interpolate, $timeout, scope, element, elmColumn, index, originalWidths, dragDropManager) {
        var MIN_COL_WIDTH = 30; //A column will not be reduced beyond 30px
        var $th = $(elmColumn);
        var fn = $interpolate($th.html());
        var html = fn(scope);
        var $colHandle = $('<span class=\'colHandle\'> <span></span></span>');
        var colResizer = $('<span class=\'colResizer\'></span>').html(html).append($colHandle);
        var $headerRow = $(element);
        var trOriginalWidth = $headerRow.width();
        var tableCollectionChanged;
        originalWidths.push($th.width());

        if ($th.children('span.colResizer').length === 0) {
            //add the column resize class, if not added
            $th.html('');
            $th.append(colResizer);
        } else {
            //update the resize hadler reference
            $colHandle = $th.find('span.colHandle');
        }
        $colHandle.bind('mousedown', mouseDownHandler);
        $colHandle.bind('touchstart', touchstartHandler);
        $colHandle.bind('click', stopPropagation);

        //to avoid sort on column resize click
        function stopPropagation(e) {
            e.stopPropagation();
        }

        function toggletextSelection(enable) {
            enable && $('body').addClass('pl-user-select-none');
            !enable && $('body').removeClass('pl-user-select-none');
        }

        function mouseDownHandler(e) {
            var $tbody = $(element).parent().next('tbody');
            var startX = e.clientX;
            var $thStartWidth = $th.width();
            var $trStartWidth = $headerRow.width();

            $headerRow.find('th.scroll-column-header').remove('th.scroll-column-header');
            toggletextSelection(true);
            $(document).bind('mousemove', mousemoveHandler);
            $(document).bind('mouseup', mouseupHandler);
            $(document).bind('mouseleave', mouseupHandler);

            function mouseupHandler() {
                $(document).unbind('mousemove', mousemoveHandler);
                $(document).unbind('mouseup', mouseupHandler);
                if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
                    scope.$apply();
                }
                toggletextSelection(false);
            }

            function mousemoveHandler(e) {
                var mousemove = e.clientX - startX;
                var thWidth = $thStartWidth + mousemove;
                if (thWidth < MIN_COL_WIDTH) { return; }

                var trWidth = $trStartWidth + mousemove;
                // Table should not be reduced beyond its original width
                if (lessThanOriginalWidth(thWidth) || trWidth < trOriginalWidth) {
                    trWidth = trOriginalWidth;
                    var closestHeader = $th.next('th:not(.scroll-column-header)');
                    if (!closestHeader.length) {
                        closestHeader = $th.prev('th');
                    }
                    closestHeader.width(closestHeader.width() + (trOriginalWidth - trWidth));
                }
                $headerRow.width(trWidth);
                $tbody.find('tr').width(trWidth);
                $th.width(thWidth);

                //Adjust all the table body td as per the corresponding header widths
                $headerRow.find('th:not(.scroll-column-header)').each(function (index) {
                    $tbody.find('tr:not([sit-freez]) td:nth-of-type(' + (index + 1) + ')').width($(this).width());
                });
            }



            function attachtbodyEvents() {
                $tbody.scroll(function () {
                    var left = -this.scrollLeft;
                    $headerRow.css('margin-left', left + 'px');
                });
                $tbody.hover(function () {
                    if (this.scrollWidth > this.clientWidth) {
                        $(this).find('.scroll-column-data').show();
                    }
                });
            }

            function handleTableBodyChange() {
                // Timeout is needed for the table data to render
                $timeout(function () {
                    // tbody needs to be reassigned since it changes on page or group change
                    $tbody = $(element).parent().next('tbody');
                    attachtbodyEvents();
                    if ($tbody.attr('type') === 'group') {
                        $tbody.find("tr").width($headerRow.width());
                        attachGroupClickHandlers();
                    } else {
                        $headerRow.find("th:not(.scroll-column-header)").each(function (index) {
                            $tbody.find('tr:not([sit-freez]) td:nth-of-type(' + (index + 1) + ')').width($(this).width());
                        });
                    }
                });
            }

            // This is needed to adjust the td under a group according to the table headers
            function attachGroupClickHandlers() {
                $tbody.find('tr[sit-freez]').on('click', function () {
                    var headerWidth = $headerRow.width();
                    var trgroup = $(this).siblings('tr:not([sit-freez])');
                    if (trgroup.length) {
                        $headerRow.find('th:not(.scroll-column-header)').each(function (index) {
                            trgroup.find('td:nth-of-type(' + (index + 1) + ')').width($(this).width());
                        });
                    }
                    var freezedRows = $(this).siblings('tr[sit-freez]');
                    if (freezedRows.length) {
                        freezedRows.each(function (index, item) {
                            freezedRows.width(headerWidth);
                        })
                    }
                });
            }

            function windowResize() {
                trOriginalWidth = $headerRow.width();
            }

            function unbindEvents() {
                $(document).unbind('mouseup', mouseupHandler);
                $colHandle.unbind('mousedown', mouseDownHandler);
                $(document).unbind('mouseleave', mouseupHandler);
                $(window).unbind('resize', windowResize);
                $colHandle.unbind('click', stopPropagation);
                toggletextSelection(false);
                tableCollectionChanged && tableCollectionChanged();
            }

            tableCollectionChanged = scope.$on('sit-table-collection-change', handleTableBodyChange);

            if ($tbody.attr('type') === 'group') {
                attachGroupClickHandlers();
            }
            attachtbodyEvents();
            $(window).bind('resize', windowResize)
            scope.$on('$destroy', function () {
                unbindEvents();
            });
        }

        function touchstartHandler(e) {
            var $tbody = $(element).parent().next('tbody');
            var startX = e.touches[0].clientX;
            var $thStartWidth = $th.width();
            var $trStartWidth = $headerRow.width();

            $headerRow.find('th.scroll-column-header').remove('th.scroll-column-header');
            toggletextSelection(true);
            $(document).bind('touchmove', touchmoveHandler);
            $(document).bind('touchend', touchendHandler);
            $(document).bind('touchleave', touchendHandler);

            function touchendHandler() {
                $(document).unbind('touchmove', touchmoveHandler);
                $(document).unbind('touchend', touchendHandler);
                if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
                    scope.$apply();
                }
                toggletextSelection(false);
            }

            function touchmoveHandler(e) {
                var mousemove = e.touches[0].clientX - startX;
                var thWidth = $thStartWidth + mousemove;
                if (thWidth < MIN_COL_WIDTH) { return; }

                var trWidth = $trStartWidth + mousemove;
                // Table should not be reduced beyond its original width
                if (lessThanOriginalWidth(thWidth) || trWidth < trOriginalWidth) {
                    trWidth = trOriginalWidth;
                    var closestHeader = $th.next('th:not(.scroll-column-header)');
                    if (!closestHeader.length) {
                        closestHeader = $th.prev('th');
                    }
                    closestHeader.width(closestHeader.width() + (trOriginalWidth - trWidth));
                }
                $headerRow.width(trWidth);
                $tbody.find('tr').width(trWidth);
                $th.width(thWidth);

                //Adjust all the table body td as per the corresponding header widths
                $headerRow.find('th:not(.scroll-column-header)').each(function (index) {
                    $tbody.find('tr:not([sit-freez]) td:nth-of-type(' + (index + 1) + ')').width($(this).width());
                });
            }

            function attachtbodyEvents() {
                $tbody.scroll(function () {
                    var left = -this.scrollLeft;
                    $headerRow.css('margin-left', left + 'px');
                });
                $tbody.hover(function () {
                    if (this.scrollWidth > this.clientWidth) {
                        $(this).find('.scroll-column-data').show();
                    }
                });
            }

            function handleTableBodyChange() {
                // Timeout is needed for the table data to render
                $timeout(function () {
                    // tbody needs to be reassigned since it changes on page or group change
                    $tbody = $(element).parent().next('tbody');
                    attachtbodyEvents();
                    if ($tbody.attr('type') === 'group') {
                        $tbody.find("tr").width($headerRow.width());
                        attachGroupClickHandlers();
                    } else {
                        $headerRow.find("th:not(.scroll-column-header)").each(function (index) {
                            $tbody.find('tr:not([sit-freez]) td:nth-of-type(' + (index + 1) + ')').width($(this).width());
                        });
                    }
                });
            }

            // This is needed to adjust the td under a group according to the table headers
            function attachGroupClickHandlers() {
                $tbody.find('tr[sit-freez]').on('click', function () {
                    var headerWidth = $headerRow.width();
                    var trgroup = $(this).siblings('tr:not([sit-freez])');
                    if (trgroup.length) {
                        $headerRow.find('th:not(.scroll-column-header)').each(function (index) {
                            trgroup.find('td:nth-of-type(' + (index + 1) + ')').width($(this).width());
                        });
                    }
                    var freezedRows = $(this).siblings('tr[sit-freez]');
                    if (freezedRows.length) {
                        freezedRows.each(function (index, item) {
                            freezedRows.width(headerWidth);
                        })
                    }
                });
            }

            function windowResize() {
                trOriginalWidth = $headerRow.width();
            }

            function unbindEvents() {
                $(document).unbind('touchend', touchendHandler);
                $(document).unbind('touchleave', touchendHandler);
                $colHandle.unbind('touchstart', touchstartHandler);
                $(window).unbind('resize', windowResize);
                $colHandle.unbind('click', stopPropagation);
                toggletextSelection(false);
                tableCollectionChanged && tableCollectionChanged();
            }

            if ($tbody.attr('type') === 'group') {
                attachGroupClickHandlers();
            }
            attachtbodyEvents();
            tableCollectionChanged = scope.$on('sit-table-collection-change', handleTableBodyChange);
            $(window).bind('resize', windowResize)
            scope.$on('$destroy', function () {
                unbindEvents();
            });
        }

        // This method ensure that as long as the sum of all the header lengths are less than their original
        // lengths , the entire table header row does not grow.
        function lessThanOriginalWidth(newThWidth) {
            var i = 0, length = originalWidths.length;
            var originalSum = originalWidths.reduce(function (a, b) {
                return a + b;
            }, 0);
            var width = newThWidth;
            for (i; i < length; i++) {
                if (i !== index) {
                    width += originalWidths[i];
                }
            }
            return (width < originalSum);
        }

        function unbindEvents() {
            $colHandle.unbind('mousedown', mouseDownHandler);
            $colHandle.unbind('touchstart', touchstartHandler);
            $colHandle.unbind('click', stopPropagation);
        }

        return unbindEvents;
    }

})();

//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table').constant('sitConfiguration', {
        pagination: {
            template: 'template/smart-table/custom-pagination.html',
            itemsByPage: 10,
            displayedPages: 5,
            pageSizes : [10,20,50]
        },
        search: {
            delay: 400, // ms
            inputEvent: 'input'
        },
        select: {
            mode: 'multi',
            selectedClass: 'st-selected'
        },
        sort: {
            ascentClass: 'st-sort-ascent',
            descentClass: 'st-sort-descent',
            descendingFirst: false,
            skipNatural: false,
            delay: 300
        },
        pipe: {
            delay: 100 //ms
        }
    });
})();

// © Siemens AG, 2017
// This file has been modified as per the requirements in the SIMATIC IT App

//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
//associated documentation files (the "Software"), to deal in the Software without restriction, 
//including without limitation the rights to use, copy, modify, merge, publish, distribute, 
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or 
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    'use strict';
    //#region ng-doc comments

    /**
    * @ngdoc type
    * @name SettingsObject
	* @module siemens.simaticit.common.widgets.table
	* @description An object containing the table settings.
	* @property {Object} [sort={}] Information about the table sort state.
    *
	* The object has the following format:
    * ```
    *    {
    *       predicate : <"field name">,     
    *   	reverse : <true or false>   
    *    }
    * ```
    * 
    * * **predicate**: Defines the name of the field used for sorting.
    * * **reverse**: (Boolean) true if descending order, otherwise false. 
    * 
	* @property {Object} [search={}] Information about the table search state.
    *
	* The object has the following format:
    * ```
    *    {
    *       fieldNames : [],     
    *   	input : 'string text'   
    *    }
    * ```
    * 
    * * **fieldNames**: Defines an array of field names used for searching.
    * * **input**: Defines the string used for matching. 
	*
	* @property {Object} [filter={}] Information about the table filter state.
	* The object has the following format
    * ```
    *    {
    *       predicateObject : [
    *           {
    *           "filterField":
    *               {
    *               "type":"number",
    *               "default":false,
    *               "validation":{},
    *               "field":"id",
    *               "displayName":"Identifier"
    *               },
    *           "andOr":"and",
    *           "operator":"<",
    *           "matchCase":false,
    *           "validation":{"required":true},
    *           "value":10,
    *           "widget":"sit-numeric",
    *           }
    *       ] 
    *    }
    * ```
    * 
    * * **predicateObject**: Defines an array of filter objects.
	* * For a full description , see {@link FilterClause}
    *
	* @property {Object} [pagination={}] Information about the table search state.
    *
    * The object contains the following properties.
    * * **type** : Defines the type of pagination.It can be either 'simple' or  'standard' or 'extended'. If the type is not mentioned, then by default 'extended' is considered.
    * * **pageSize**: The number of items to display per page. It can be one of the following values : 10,25,50 or 100.
    * ```
    * {
    *     pageSize: 10,
    *     type: 'standard'
    * }
    * ``` 
    * 
    * * **type**: Defines the required type of pagination.
	* @property {String} [selectionMode="multi"] _Optional_ Specifies if the user can select only one item, multiple items or no items.
    * The following values are allowed:
    ** **multi**: Multiple items can be selected.
    ** **single**: Only single items can be selected. 
    ** **none**: No items can be selected.
	*
	* @property {Object} [group={}] Information about the table group state.
	* The object has the following format
    * ```
    *    {
    *       predicate : <"name of group by field">      
    *    }
    * ```
    * 
    * * **predicate**: Defines the name of the field used for grouping.
	*
	* @property {Array<Object>} [selectedRows] Array containing the rows selected in the table.
	*
    *
	*/

    /**
    * @ngdoc type
    * @name FilteringConfig
	* @module siemens.simaticit.common.widgets.table
	* @description An object containing the filter configuration.
	* @property {Boolean} [default=false] 
     * Specifies if a clause should be made automatically for this data field.
     * 
     * The **sitFilter** directive always shows at least one clause in the UI. 
     * When the UI is first shown, all elements in the filter list are checked
     * to see if any have the **default** property set to true. 
     * If so, a clause is created for each.
     * If no configured data fields have the **default** property set true,
     * then a clause is created for the first field in the list regardless of the **default** value.
     *
     * @property {String} [type='string'] 
     * Specifies the type of data contained in the data field.
     * The following is a list of allowed values:
     * * **string**
     * * **number**
     * * **date**
     * * **boolean**
     * 
     * This affects the type of UI element used for data input.
     * 
     * @property {String} validation A validation rule supported by the data input widget.
     * @property {String[]} [values=undefined] 
     * Defines a set of predefined values a user can select from. 
     * 
     * @property {String} widget
     * The name of the **Property Grid** widget to use for data input. 
     * 
     * This allows a developer to override the default widget used for data input based on data type.
     * If specified, this widget is used regardless of data type.
     * 
	 */

    /**
     * @ngdoc type
     * @name FieldConfig
     * @module siemens.simaticit.common.widgets.table
     * @description An object containing the configuration for each field in the table.
     * **Note:** If any of the configuration fields are not specified then default values will be considered.
     * @property {Boolean} [sorting=false] Specifies if the field will be used for sorting. If true the field will be used.
     *
     * **Note**: To enable the column header sort, the **th** element in template should have a **sit-field** attribute  assigned with proper field name.
     * @property {Boolean} [grouping=false] Specifies if the field will be used for grouping. If true the field will be used. 
     * @property {Boolean} [quicksearch=false] Specifies if the field will be used for quicksearch. If true the field will be used.
     * @property {Object}  [filtering=undefined] Represents the configuration to be used for filtering the field.  
     * The filtering object must be of type {@link FilteringConfig}
     *
     * The object has the following format:
     * ```
     *    filtering: {
     *		type: "string",
     *		default: false,
     *		validation: {},
     *		values: ['Male', 'Female'],
     *		widget: "sit-select"
     *	}
     * ```
     *
     * @property {String} [displayName] An alternative name that will be used instead of the field name during sorting, grouping and filtering.
     * **Note:** Ideally the displayName of a field should be the same as the text specified in the table headers. Hence it is recommended to bind the 'displayName' property from the fieldConfig in the table headers.
     * @property {Boolean} [visible=true] Specifies if the column field will be hidden on load. If false the column with corresponding field will be hidden.
     *
     * **Note**: For this functionality to work, the **th** and **td** elements in template should have a **sit-field** attribute assigned with proper field name.
     */

    /**
     * @ngdoc type
     * @name TableConfig
     * @module siemens.simaticit.common.widgets.table
     * @description An object containing the configuration settings for the sit-table widget.
     * @property {String} [selectionMode="multi"] _(Optional)_ Specifies if the user can select only one item or multiple items or no items.
     * The following values are allowed:
     * * **multi**: Multiple items can be selected.
     * * **single**: Only single items can be selected. 
     * * **none**: No items can be selected.
     * @property {Boolean} [enablePaging=true] _(Optional)_ Specifies if the pager should be displayed or not in the UI. If it is set to false and the dataSource property is specified, an infinite scrollbar is displayed: it means that as the user scrolls down the page, data is retrieved from the server and is displayed.
     * @property {Boolean} [enableColumnResizing=true] _(Optional)_ Specifies if the table columns can be resized.
     * @property {Object} [fields=undefined] Specifies the configuration for each item to be displayed in the table.
     *
     * Each item in the field object should be specified so that the 'key' corresponds to the data item to be displayed in the table and 
     * the value corresponds to a configuration object of type {@link FieldConfig}, which determines the configuration for the particular field.
     *
     * Each field item must have the following format:
     * ```
     *    fields : {
     *        'id' :{
     *				sorting: true,
     *				grouping: false,
     *				quicksearch: false,
     *              displayName : 'Identifier',
     *				filtering: {
     *					type: "number",
     *					default: false,
     *					validation: {}
     *				},
     *              visible: true
     *    		}
     *	}
     * ```
     *
     * @property {String} [userPrefId=undefined] Displays User Personalization icon to personalize the user fields.
     * Only an authorized user can set the pesonzlization configuration.
     *
     * In oreder to use the user personalization functionality, the following table configuration condition should be satisfied.    
     * * The **th** and **td** elements in template should have a **sit-field** attribute. 
     *   The sit-field attribute is assigned with a valid field name and the sit-field value in th and it's corresponding td should match.
     *   The usage is as follows:
     * ```
     *     <table sit-table="sitSmartTable" sit-config="tableExCtrl.config" class="table">
     *         <thead>
     *             <tr>
     *                 <th><input type="checkbox"/></th>
     *                 <th sit-field="firstName">First Name</th>
     *                 <th sit-field="lastName">Last Name</th>
     *             </tr>
     *         </thead>
     *         <tbody>
     *             <tr ng-repeat="row in tableExCtrl.config.data">
     *                 <td><input type="checkbox"/></td>
     *                 <td sit-field="firstName">{{row.firstName}}</td>
     *                 <td sit-field="lastName">{{row.lastName}}</td>
     *             </tr>
     *         </tbody>
     *     </table>
     * ```
     * If **sit-field** is not defined for a column, the user cannot set the personalization settings for that column and it will affect the column order display. 
     *
     * The user is provided with three fuctionalities for managing the preferences and are listed below:
     * * **Save All**: Stores the configured settings and renderes the table with new settings.
     * * **Reset**: Delete the configured settings and restores the original settings.
     * * **Cancel**: Doesn't change table settings.
     *
     * @property {Function} [onPageChangeCallback=undefined] Specifies the function to call when the current page of data is changed. 
     * The function is passed with one argument:
     * * **pageNumber**: It represents the new page number.
     *
     * @property {Function} [onSelectionChangeCallback=undefined] Specifies the function to call when the list of selected items changes.
     * The function is passed with two arguments:
     * * **selectedItems**: An array of objects that represents the currently selected data items. 
     * * **selectedItem**: The item a user clicked that triggered the selection change. 
     *
     * @property {Function} [onSortChangeCallback=undefined] 
     * Specifies the function to call when the order of the displayed data changes. 
     *
     * The function is passed in two arguments:
     * * **field**: The field name which is sorted.
     * * **reverse**: Boolean determining if the list is sorted in reverse order (true/false).   
     * 
     * @property {Function} [onInitCallback=undefined] Specifies the function to call when the table is initialised (before the table is rendered). 
     * This callback is useful to change grid settings before the table is rendered on the page.
     * The function is passed with one argument: 
     * * **config** : Represents the configuration settings of the table. 
     * The API methods exposed by the table on the {@link TableConfig} object will also be available.
     *
     * For example, the code snippet below changes group and sort settings of the grid before rendering.
     *```
     *      function (config) {
     *                 var settings = config.getSettings('sitSmartTableExample');
     *                 settings.sort = {
     *                     predicate: 'lastName',
     *                     reverse: true
     *                 };
     *                 settings.group = {
     *                     predicate:'gender'
     *                 };                                  
     *                 config.applySettings(settings);                
     *      },
     *```
     *
     * @property {Array<Object>} [data=undefined] Contains the data array to be displayed in the table.
     * If the **dataSource** option mentioned below is specified, then the data is retrieved 
     * from a server. Any data items assigned to this property will be ignored.
     *
     * For example, the code snippet below updates data and refreshes the sitTable dynamically.
     *```
     * [
     *    {
     *        "phone": {
     *            "personal": "435345345"
     *        },
     *        "id": 1,
     *        "firstName": "Judith",
     *        "lastName": "Armstrong",
     *        "email": "jarmstrong0@privacy.gov.au",
     *    },
     *    {
     *        "phone": {
     *            "personal": "435345345"
     *        },
     *        "id": 2,
     *        "firstName": "Aaron",
     *        "lastName": "Rivera",
     *        "email": "arivera1@examiner.com",
     *    }
     * ]
     *```
     *
     * @property {Object} [dataSource=undefined] Contains settings that define the presentation service and data entity to be used as a data source.
     * 
     * The object has the following format:
     * 
     * ```
     *     {
     *         dataService: engineeringData,
     *         dataEntity: 'CommandDefinition',
     *         optionsString: '',
     *         appName: 'myApp',
     *         onBeforeDataLoadCallBack: function ( data) {}
     *     }
     * ``` 
     * 
     * * **dataService**: A presentation service object, such as **engineeringData**.
     * * **dataEntity**: The name of the entity to be retrieved using the service.
     * * **optionsString**: **oData** query options.
     * * **appName**: The name of the App where the entity is defined.
     * * **onBeforeDataLoadCallBack**: Specifies the function to call just before the call is made to retrieve data from the back-end. This allows the developer to form a custom string to filter data from the backend. 
     * If this method is defined, then the return value of this method alone will determine how the data from the service is filtered/ordered.
     * 
     * For dynamic data updates, it is necessary to call the {@link TableConfig#refreshData refreshData} method.
     *
     * For example, the code snippet below updates the dataSource and refreshes the sitTable dynamically.
     *```
     *            vm.config.dataSource.optionsString = "$filter=(Name eq '" + selectedItem[0].Name + "')";
     *            vm.config.refreshData();
     *```
     *
     * @property {Array<Number>} [pageSizes] _(Optional)_ The array of page size options to configure the pager.
     *
     * @property {Number} [pageSizeDefault] _(Optional)_ The number of items to be displayed in the table.
     *
     * @property {String | Function} [uniqueID=undefined] _(Optional)_  The table row selection persist on any row-data manipulation.
     *
     * The property accepts **String** or **Function** type values.
     * * Type **String**:  The property is passed with a field name. The value of the field name must be constant and unchangable.
     * ```
     *  uniqueID: 'Id',
     * ```
     * * Type **Function**: The property is passed with a function. The function accepts two arguments and the object comparision logic on two arguments is written inside the function. The function must return a boolean value as a result of the comparision.
     * ```
     *  uniqueID: function (currentItem, selectedItem) {
     *           if (currentItem.Name === selectedItem.Name) {
     *               return true;
     *               }
     *           return false;
     *          }
     * ```
     */

    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.table
    * @name sitTable
    *
    * @requires common.services.logger.service
    * @requires $compile
    * @requires $timeout
    * @requires $templateCache
    *
    * @restrict A
    *
    * @usage 
    * As an attribute:
    * ```
    * <table sit-table="uniqueSitTableName" sit-config="ctrl.config" class="table">
    *       //table skeleton
    * </table>
    * ```
    *
    *
    * @description 
    * Converts an HTML table, which uses this directive, into a smart table that can handle data more efficiently.  
    *
    * Manages the sorting, searching, filtering and grouping of data using the  {@link siemens.simaticit.common.widgets.table.sitTableFilterbar} directive and {@link siemens.simaticit.common.widgets.table.sitTablePager} directive.
    * 
    * @param {String} sitTable Unique Id of the Table
    * @param {TableConfig} sitConfig For a description of this object see {@link TableConfig}
    * 
    * @example
    * The **sit-table-filterbar**({@link siemens.simaticit.common.widgets.table.sitTableFilterbar}) should be specified in the **thread** section of the table as shown in the example below, for the filter bar to be displayed.
    *
    * Buttons for additional actions can be specified next to the filter-bar or without the filter-bar using the **sit-table-button** directive as shown
    * in the example below.
    *
    * To display the tags on each entity, the **sit-tag-list**({@link siemens.simaticit.common.widgets.taglist.sitTagList}) should be specified in the **td** cell of the row as shown in the example below.
    * 
    * The **sit-table-pager**({@link siemens.simaticit.common.widgets.table.sitTablePager}) should be specified in the **tfoot** section of the table as shown in the example below, for the pager to be displayed.
    * If the pager is not specified, the entire list will be displayed in the table. Not specifying the pager for large data sets will cause performance issues.
    * 
    * In a view template, you can use the **sitTable** as follows:
    * ```
    * <div style="height:500px;" ng-controller="TableExpController as tableExCtrl">
    *     <table sit-table="sitSmartTableExample" sit-config="tableExCtrl.config" class="table">
    *         <thead>
    *             <tr>
    *                 <th>
    *                     <div class="tool-bar">
    *                         <span sit-table-filterbar></span>
    *                         <span sit-table-separator></span>
    *                         <span sit-table-button
    *                               sit-svg-icon="common/icons/cmdRefresh24.svg"
    *                               sit-icon="fa-cogs"
    *                               ng-click="tableExCtrl.getSettings()"
    *                               sit-label="Settings"></span>
    *                         <span sit-table-button
    *                               sit-icon="fa-plus"
    *                               ng-click="tableExCtrl.addSettings()"
    *                               sit-label="Add"></span>
    *                     </div>
    *                 </th>
    *             </tr>
    *                     
    *             <tr>
    *                 <!--Column Name-->
    *                 <th sit-field="id">{{tableExCtrl.config.fields.id.displayName}}</th>
    *                 <th sit-field="firstName">First Name</th>
    *                 <th sit-field="lastName">Last Name</th>
    *                 <th sit-field="email">Email</th>
    *                 <th sit-field="gender">Gender</th>
    *                 <th sit-field="appID">App ID</th>
    *                 <th sit-field="appName">App Name</th>
    *                 <th sit-field="phone.off">{{tableExCtrl.config.fields['phone.off'].displayName}}</th>
    *                 <th sit-field="city">City</th>
    *                 <th sit-field="companyName">Comapny</th>
    *                 <th sit-field="product">Product</th>
    *                 <th sit-field="CategoryA">Tags</th>
    *             </tr>
    *         </thead>
    *         <tbody>
    *             <!--Data to display-->
    *             <tr ng-repeat="row in tableExCtrl.config.data">
    *                 <td sit-field="id">{{row.id}}</td>
    *                 <td sit-field="firstName">{{row.firstName}}</td>
    *                 <td sit-field="lastName">{{row.lastName}}</td>
    *                 <td sit-field="email">{{row.email}}</td>
    *                 <td sit-field="gender">{{row.gender}}</td>
    *                 <td sit-field="appID">{{row.appID}}</td>
    *                 <td sit-field="appName">{{row.appName}}</td>
    *                 <td sit-field="phone.off">{{row.phone.off}}</td>
    *                 <td sit-field="city">{{row.city}}</td>
    *                 <td sit-field="companyName">{{row.companyName}}</td>
    *                 <td sit-field="product">{{row.product}}</td>
    *                 <td sit-field="CategoryA" sit-tag-list sit-data="row.CategoryA"></td>
    *             </tr>
    *         </tbody>
    *         <tfoot>
    *             <tr sit-table-pager></tr>
    *         </tfoot>      
    *     </table>
    * </div>
    * ```
    * 
    * In the corresponding view controller, add the **config** object.
    * ```
    * (function () {
    *     'use strict';
    *     TableExpController.$inject = ['$state', '$scope', 'common.services.engineering.data.service', 'common.services.governance.workerRoleService'];
    *     function TableExpController($state, $scope, engineeringSvc, workerRoleService) {
    *         var vm = this;
    *         vm.config = {
    *             uniqueID: function (currentItem, selectedItem) {
    *                      if (currentItem.id === selectedItem.id) {
    *                          return true;
    *                          }
    *                      return false;
    *                     },
    *             selectionMode: 'single',
    *             enableColumnResizing: true,
    *             pageSizes: [5, 10, 25, 100, 250, 500],
    *             pageSizeDefault: 5,
    *             onPageChangeCallback: function (page) {
    *                 console.log('pageChangedCallback: page: ' + page);
    *             },
    *             onSelectionChangeCallback: function (selectedItems, itemChanged) {
    *                 var selCount = selectedItems ? selectedItems.length : 0;
    *                 var uiSelectVal = itemChanged ? itemChanged.isSelected : 'none';
    *                 console.log('onSelectionChangeCallback: selCount: ' + selCount + ', uiSelectVal: ' + uiSelectVal);
    *             },
    *             onSortChangeCallback: function (fieldName, reverse) {
    *                 console.log('Sort change callback called : Field - ' + fieldName + ', Reverse - ' + reverse);
    *             },
    * 
    *             onInitCallback: function (config) {
    *                  // change table settings(sort, group, filter, pager settings, etc) before render.
    *                  var settings = config.getSettings('sitSmartTableExample');
    *                   //Change order-by setting
    *                  settings.sort = {
    *                           predicate: 'firstName',
    *                           reverse: true
    *                  }                        
    *                  config.applySettings(settings);
    *             },
    * 
    *             data: [
    *                 {
    *                     "phone": {
    *                         "off": "+1 (887) 589-2423",
    *                         "personal": "435345345"
    *                     },
    *                     "id": 1,
    *                     "firstName": "Judith",
    *                     "lastName": "Armstrong",
    *                     "email": "jarmstrong0@privacy.gov.au",
    *                     "gender": "Female",
    *                     "appID": "com.dell.Solarbreeze",
    *                     "appName": "Vagram",
    *                     "appVersion": "0.88",
    *                     "password": "4UjLFC",
    *                     "city": "Nawal",
    *                     "companyName": "Ntags",
    *                     "product": "Hardware",
    *                     "CategoryA" : ['Tag Name1','Tag Name2']
    *                 },
    *                 {
    *                     "phone": {
    *                         "off": "+1 (887) 589-2423",
    *                         "personal": "435345345"
    *                     },
    *                     "id": 2,
    *                     "firstName": "Aaron",
    *                     "lastName": "Rivera",
    *                     "email": "arivera1@examiner.com",
    *                     "gender": "Male", "appID": "com.ask.Stim",
    *                     "appName": "Gembucket",
    *                     "appVersion": "0.2.8",
    *                     "password": "DTNhmA",
    *                     "city": "Nawal",
    *                     "companyName": "Ntags",
    *                     "product": "Hardware"
    *                     "CategoryA" : ['Tag Name1','Tag Name2']
    *                 },
    *                 {
    *                     "phone": {
    *                         "off": "+2 (887) 589-2423",
    *                         "personal": "435345345"
    *                     },
    *                     "id": 3,
    *                     "firstName": "Linda",
    *                     "lastName": "Willis",
    *                     "email": "lwillis2@github.com",
    *                     "gender": "Female",
    *                     "appID": "jp.ne.biglobe.Ronstring",
    *                     "appName": "Biodex",
    *                     "appVersion": "6.2.0",
    *                     "password": "9WYIIKQkAML",
    *                     "city": "Nawal",
    *                     "companyName": "Ntags",
    *                     "product": "Hardware"
    *                     "CategoryA" : ['Tag Name1','Tag Name2']
    *                 },
    *                 {
    *                     "phone": {
    *                         "off": "+4 (887) 589-2423",
    *                         "personal": "435345345"
    *                     },
    *                     "id": 4,
    *                     "firstName": "Carlos",
    *                     "lastName": "Lee",
    *                     "email": "clee3@soup.io",
    *                     "gender": "Male",
    *                     "appID": "com.lycos.Temp",
    *                     "appName": "Fixflex",
    *                     "appVersion": "0.2.5",
    *                     "password": "VkPwxVTyyTsm",
    *                     "city": "Nawal",
    *                     "companyName": "Ntags",
    *                     "product": "Hardware"
    *                 },
    *                 {
    *                     "phone": {
    *                         "off": "+7 (887) 589-2423",
    *                         "personal": "435345345"
    *                     },
    *                     "id": 5,
    *                     "firstName": "Lillian",
    *                     "lastName": "Williams",
    *                     "email": "lwilliams4@si.edu",
    *                     "gender": "Female",
    *                     "appID": "uk.ac.ox.Konklab",
    *                     "appName": "Zoolab",
    *                     "appVersion": "2.33",
    *                     "password": "IlCqc1UA",
    *                     "city": "Nawal",
    *                     "companyName": "Ntags",
    *                     "product": "Hardware"
    *                 },
    *                 {
    *                     "phone": {
    *                         "off": "+9 (887) 589-2423",
    *                         "personal": "435345345"
    *                     },
    *                     "id": 6,
    *                     "firstName": "Debra",
    *                     "lastName": "Garcia",
    *                     "email": "dgarcia5@unc.edu",
    *                     "gender": "Female",
    *                     "appID": "com.eepurl.Latlux",
    *                     "appName": "Wrapsafe",
    *                     "appVersion": "8.17",
    *                     "password": "MpVlJ1",
    *                     "city": "Nawal",
    *                     "companyName": "Ntags",
    *                     "product": "Hardware"
    *                 }
    *             ],
    * 
    *             fields: {
    *                 "id": {
    *                     sorting: true,
    *                     grouping: true,
    *                     quicksearch: false,
    *                     filtering: {
    *                         type: "number",
    *                         default: false,
    *                         validation: {},
    *                     },
    *                     displayName: 'Identifier',
    *                     visible: true
    *                 },
    *                 "firstName": {
    *                     label: "",
    *                     sorting: true,
    *                     quicksearch: true,
    *                     displayName: 'First Name'
    *                 },
    *                 "lastName": {
    *                     sorting: true,
    *                     quicksearch: false,
    *                     visible: false
    *                 },
    *                 "gender": {
    *                     quicksearch: false,
    *                 },
    *                 "phone.off": {
    *                     sorting: true,
    *                     grouping: true,
    *                     quicksearch: true,
    *                     filtering: {
    *                         type: "string",
    *                         default: false,
    *                         validation: { required: false }
    *                     },
    *                     displayName: 'Off Phone'
    *                 }
    *             }
    *         };
    *     }
    *     angular
    *      .module('siemens.simaticit.common.examples')
    *      .controller('TableExpController', TableExpController);
    * })();    
    * ```
    *
    * Examples to configure getSettings and applySettings Methods in the controller:
    * ```
    *         vm.addSettings = function () {
    *             var dataObject = {
    *                 "sort": {},
    *                 "search": {},
    *                 "filter": {
    *                     "predicateObject":
    *                         [{
    *                             "filterField": {
    *                                  "type": "number",
    *                                  "default": false,
    *                                  "validation": {},
    *                                  "field": "id",
    *                                  "displayName": "Identifier",
    *                                  "$$hashKey": "object:105"
    *                             },
    *                             "andOr": "and",
    *                             "operator": ">",
    *                             "matchCase": false,
    *                             "validation": { "required": true },
    *                             "value": 0,
    *                             "widget": "sit-numeric",
    *                             "$$hashKey": "object:103"
    *                         }]
    *                 },
    *                 "pagination": {},
    *                 "selectionMode": "single",
    *                 "group": {},
    *                 "selectedRows": []
    *             }
    *             vm.config.applySettings(dataObject);
    *         },
    *         
    *         vm.getSettings = function () {
    *             vm.data = vm.config.getSettings();
    *             console.log(JSON.stringify(vm.data));
    *         }
    
    * ```
    *  
    */
    //#endregion ng-doc comments
    angular.module('siemens.simaticit.common.widgets.table')
    .controller('sitTableController', SitTableController)
    .directive('sitTable', TableDirective);

    SitTableController.$inject = ['$translate', 'common', '$scope', '$parse', '$filter', '$attrs', 'common.widgets.pager.serverDataService', 'common.widgets.busyIndicator.service', 'common.widgets.messageOverlay.service', '$element', '$timeout'];
    function SitTableController($translate, common, $scope, $parse, $filter, $attrs, serverDataService, busyIndicatorService, globalMsgOverlayManager, $element, $timeout) {

        var ctrl = this;
        var propertyName = $attrs.sitConfig + '.data';
        var displayGetter = $parse(propertyName);
        var displaySetter = displayGetter.assign;
        var safeCopy = copyRefs(displayGetter($scope));
        var safeGetter = displayGetter;
        var serverDataManager;
        var orderBy = $filter('orderBy');
        var filter = $filter('filter');
        var filterBarFilter = $filter('sitCustomFilter');
        var filtered;
        var pipeAfterSafeCopy = true;
        var lastSelected;
        var SCROLL_ITEMLOAD_COUNT = 10;
        var ROW_HEIGHT = 30;
        var VALID_PAGE_SIZES = [10, 25, 50, 100];
        var DEFAULT_PAGE_SIZE = 10;
        ctrl.isAllSelected = false;
        ctrl.serverData = ctrl.sitConfig.dataSource ? true : false;
        ctrl.sitConfig.enablePaging = ctrl.sitConfig.enablePaging === false ? false : true;
        ctrl.serverItemsLoadCount = 0;
        ctrl.initialDataItemsCount = 0;
        ctrl.totalServerItemsLoadedCount = 0;
        ctrl.isQuickSearched = false;
        ctrl.isSorted = false;
        ctrl.isGroupedBy = false;
        ctrl.isFilterPanelOpen = false;
        ctrl.isRefreshServerSideData = false;
        ctrl.initPaginationOptions = initPaginationOptions;
        initPaginationOptions();
        var tableState = {
            sort: {},
            search: {},
            filter: {},
            pagination: {
                start: 0,
                totalItemCount: 0,
                selectedItems: 0
            },
            selectionMode: ctrl.sitConfig.selectionMode,
            group: {},
            selectedRows: []
        };
        var overlay = {
            text: 'er1',
            title: 'error',
            buttons: [{
                id: 'okButton',
                displayName: $translate.instant('common.ok'),
                onClickCallback: function () { globalMsgOverlayManager.hide() }
            }]
        };

        function initPaginationOptions(totalDataCount) {
            ctrl.paginationOptions = ctrl.paginationOptions || {
                $init: function () {
                    this.$subscribe('onPageSizeChange', function (eventArgs) {
                        tableState.pagination.number = eventArgs.size;
                        tableState.pagination.numberOfPages = Math.ceil(tableState.pagination.totalItemCount / tableState.pagination.number);
                        ctrl.paginationOptions.pageSize = eventArgs.size;
                        ctrl.slice(0, eventArgs.size, 1);
                    });

                    this.$subscribe('onPageChange', function (eventArgs) {
                        ctrl.slice((eventArgs.pageNumber - 1) * ctrl.paginationOptions.pageSize, ctrl.paginationOptions.pageSize, eventArgs.pageNumber);
                    });

                    this.$subscribe('onLoad', function () {
                        initPaginationOptions(totalDataCount);
                        ctrl.slice(0, ctrl.paginationOptions.pageSize, ctrl.paginationOptions.currentPage);
                        ctrl.isGroupedBy = false;
                        window.$UIF.Function.safeCall(ctrl,'paginationOptions.api.draw');
                    });
                },
                currentPage : 1
            };

            ctrl.paginationOptions.type = window.$UIF.Object.safeGet(ctrl.sitConfig, 'pagination.type') || 'extended';
            ctrl.paginationOptions.totalDataCount = totalDataCount || 0;
            
            ctrl.paginationOptions.pageSize = ctrl.paginationOptions.pageSize || checkPageSize() || 10;

        }

        function checkPageSize() {
            if (window.$UIF.Object.safeGet(ctrl.sitConfig, 'pagination.pageSize') !== null) {
                return VALID_PAGE_SIZES.indexOf(ctrl.sitConfig.pagination.pageSize) != -1 ? ctrl.sitConfig.pagination.pageSize : DEFAULT_PAGE_SIZE;
            }
            return false;
         }
        

        function updateSelectedItems(rowItem) {
            var isPresent = _.contains(tableState.selectedRows, rowItem);
            //if item not present , push it to selectedItems array
            if (!isPresent && ctrl.isAllSelected) {
                tableState.selectedRows.push(rowItem);
            } else if (isPresent && !ctrl.isAllSelected) {
                tableState.selectedRows.splice(tableState.selectedRows.indexOf(rowItem), 1);
        }
    }

        ctrl.onScroll = function (event) {
            ctrl.serverItemsLoadCount = SCROLL_ITEMLOAD_COUNT;
            ctrl.isScrollUpdate = false;
            var scrollHeight = $(this).prop("scrollHeight");
            var containerHeight = $(this).height();
            var trackLength = scrollHeight - containerHeight;
            var scrollTop = $(this).scrollTop();
            var scrollPercentage = Math.floor(scrollTop / trackLength * 100);
            var pagination;
            if (scrollPercentage >= 95 && ctrl.totalServerItemsLoadedCount !== ctrl.totalDataItems && !ctrl.grouping && !ctrl.isQuickSearched && !ctrl.isSorted && !ctrl.isFilterPanelOpen) {
                ctrl.isScrollUpdate = true;
                pagination = tableState.pagination;
                getData(pagination);
        }
    }

        ctrl.selectToggle = function () {
            var rowArray = getRows($scope[ctrl.displayedCollectionId], tableState.group.predicate);
            ctrl.isAllSelected = !ctrl.isAllSelected;
            var i = 0, length = rowArray.length;
            for (i; i < length; i++) {
                rowArray[i].isSelected = ctrl.isAllSelected;
                updateSelectedItems(rowArray[i]);
        }
            tableState.pagination.selectedItems = tableState.selectedRows.length;
            notifySelectionChanged(tableState.selectedRows)
    };

        ctrl.getTableName = function () {
            return $attrs.sitTable;
    }

        function refresh() {
            ctrl.pipe();
    }

        /**
        * @ngdoc method
        * @module siemens.simaticit.common.widgets.table
        * @name TableConfig#refreshData
        *
        * @description
        * An API used to refresh the table when data is changed.
        *
        */
        function refreshData() {
            displayGetter = $parse(propertyName);
            displaySetter = displayGetter.assign;
            safeCopy = copyRefs(displayGetter($scope));
            ctrl.isRefreshServerSideData = true;
            ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
            ctrl.totalServerItemsLoadedCount = 0;
            ctrl.pipe();
    }

        function updateSafeCopy() {
            safeCopy = copyRefs(safeGetter($scope));
            if (pipeAfterSafeCopy === true) {
                ctrl.pipe();
        }
    }

        if ($attrs.stSafeSrc) {
            safeGetter = $parse($attrs.stSafeSrc);
    }
        $scope.$watch(function () {
            var safeSrc = safeGetter($scope);
            return safeSrc && safeSrc.length ? safeSrc[0] : undefined;
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                updateSafeCopy();
        }
        });
        $scope.$watch(function () {
            var safeSrc = safeGetter($scope);
            return safeSrc ? safeSrc.length : 0;
        }, function (newValue) {
            if (newValue !== safeCopy.length) {
                updateSafeCopy();
        }
        });
        $scope.$watch(function () {
            return safeGetter($scope);
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                tableState.pagination.start = 0;
                updateSafeCopy();
        }
        });

        $scope.$on('sit-filter-panel-opened', onfilterPanelChange);
        function onfilterPanelChange() {
            ctrl.isFilterPanelOpen = true;
    }

        $scope.$on('sit-filter.apply', function () {
            ctrl.isFilterApplied = true;
        });

        $scope.$on('sit-table-filter-builder-closed', function () {
            if (ctrl.isFilterApplied) {
                $timeout(function () {
                    ctrl.pipe();
                });
        }
        });


        /**
         * sort the rows
         * @param {Function | String} predicate - function or string which will be used as predicate for the sorting.
         * @param [reverse] - if you want to reverse the order
         */
        this.sortBy = function sortBy(predicate, reverse) {
            tableState.sort.predicate = predicate;
            tableState.sort.reverse = reverse === true;

            ctrl.isSorted = true;
            ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
            ctrl.totalServerItemsLoadedCount = 0;


            if (angular.isFunction(predicate)) {
                tableState.sort.functionName = predicate.name;
            } else {
                delete tableState.sort.functionName;
        }
            tableState.pagination.start = 0;
            (!ctrl.paginationOptions) && initPaginationOptions();
            ctrl.paginationOptions.currentPage = 1;
            if (serverDataManager && ctrl.sitConfig.enablePaging) {
                serverDataManager.setCurrentPage(1); // reset to first page when sort is clicked
        }
            notifySortChanged(predicate, reverse);
            return this.pipe();
    };

        /**
         * search matching rows
         * @param {String} input - the input string
         * @param {String} [predicate] - the property name against which you want to check the match, otherwise it will search all properties.
         */
        this.search = function search(input, predicate) {
            input = angular.isString(input) ? input.trim() : input;

            ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
            ctrl.totalServerItemsLoadedCount = 0;
            ctrl.isQuickSearched = true

            tableState.search.fieldNames = predicate;
            tableState.search.input = input;
            tableState.pagination.start = 0;
            (!ctrl.paginationOptions) && initPaginationOptions();
            ctrl.paginationOptions.currentPage = 1;
            if (serverDataManager && ctrl.sitConfig.enablePaging) {
                serverDataManager.setCurrentPage(1); // reset to first page when search is performed
        }
            return this.pipe();
    };

        this.filter = function filter(filterClause) {
            tableState.filter.predicateObject = filterClause;
            tableState.pagination.start = 0;
            (!ctrl.paginationOptions) && initPaginationOptions();
            ctrl.paginationOptions.currentPage = 1;
            ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
            ctrl.totalServerItemsLoadedCount = 0;
            ctrl.isQuickSearched = true;

            return this.pipe();
    };

        this.groupBy = function groupBy(predicate) {
            tableState.group.predicate = predicate ? predicate : undefined;

            ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
            ctrl.totalServerItemsLoadedCount = 0;
            ctrl.isGroupedBy = true;
            return this.pipe();
    };

        ctrl.setServerSideItemCount = function () {
            //to get serverItemsLoadCount to be retreived on every resize of server-side compactMode
            if (ctrl.sitConfig.enablePaging === false && ctrl.serverData) {
                var pagination = tableState.pagination;
                ctrl.totalDataItems = ctrl.totalDataItems === 0 ? undefined : ctrl.totalDataItems;
                ctrl.serverItemsLoadCount = Math.ceil($element.children('tbody')[0].clientHeight / ROW_HEIGHT); //30 is average value for row height
                ctrl.initialDataItemsCount = angular.copy(ctrl.serverItemsLoadCount);
                if (ctrl.serverItemsLoadCount > ctrl.totalServerItemsLoadedCount && ctrl.totalServerItemsLoadedCount !== ctrl.totalDataItems) {
                    getData(pagination);
            }
        }
    }

        var getData = _.debounce(function (pagination) {
            if (!serverDataManager) {
                setServerDataManager();
            } else {
                !_.isEmpty(tableState.pagination) && setServerPagingOption();
                !_.isEmpty(tableState.sort) && setServerSortingOption();
                !_.isEmpty(tableState.search) && setServerQSOption();
                !_.isEmpty(tableState.filter) && setServerFilterOption();
        }
            busyIndicatorService.show();

            if (ctrl.sitConfig.enablePaging === false && ctrl.serverData) {
                serverDataManager.getServerData(ctrl.serverItemsLoadCount, ctrl.totalServerItemsLoadedCount).then(function (result) {
                    busyIndicatorService.hide();
                    if (!(!ctrl.sitConfig.enablePaging && ctrl.serverData) || ctrl.isGroupedBy || ctrl.isQuickSearched || ctrl.isSorted || ctrl.isRefreshServerSideData || ctrl.isFilterPanelOpen) {
                        $scope[ctrl.displayedCollectionId] = [];
                }

                    $scope.totalDataItems = result.totalDataSize;
                    ctrl.totalDataItems = result.totalDataSize;
                    for (var i = 0 ; i < result.data.length; i++) {
                        $scope[ctrl.displayedCollectionId].push(result.data[i]);
                    }
                    pagination.totalItemCount = ctrl.totalDataItems;
                    ctrl.totalServerItemsLoadedCount = result.data.length + ctrl.totalServerItemsLoadedCount;
                    if (ctrl.isQuickSearched || ctrl.isSorted || ctrl.isGroupedBy || ctrl.isRefreshServerSideData || ctrl.isFilterPanelOpen) {
                        ctrl.isQuickSearched = false;
                        ctrl.isSorted = false;
                        ctrl.isGroupedBy = false;
                        ctrl.isRefreshServerSideData = false;
                        ctrl.isFilterPanelOpen = false;
                        ctrl.bindScroll();
                }
                    setSelectedItems();
                    toggleTableScrollbar();
                    $scope.$emit('sit-table-collection-change');
                });
            } else if (pagination.number === undefined) {
                serverDataManager.getAllData().then(function (data) {
                    busyIndicatorService.hide();
                    $scope[ctrl.displayedCollectionId] = data.data;
                    pagination.totalItemCount = ctrl.totalDataItems;
                    initPaginationOptions(ctrl.totalDataItems);
                    window.$UIF.Function.safeCall(ctrl.paginationOptions, 'api.draw');
                    setSelectedItems(); //Method for selecting items when settings are restored, need to be optimised
                    toggleTableScrollbar();
                    $scope.$emit('sit-table-collection-change');
                }, function (err) {
                    busyIndicatorService.hide();
                    showOverlay(err);
                });
            } else {
                serverDataManager.getPageData().then(function (data) {
                    busyIndicatorService.hide();
                    $scope[ctrl.displayedCollectionId] = data.data;
                    pagination.numberOfPages = Math.ceil(data.totalDataSize / ctrl.tableState().pagination.number) || 0;
                    pagination.totalItemCount = data.totalDataSize;
                    initPaginationOptions(data.totalDataSize);
                    window.$UIF.Function.safeCall(ctrl.paginationOptions, 'api.draw');
                    setSelectedItems();
                    toggleTableScrollbar();
                    $scope.$emit('sit-table-collection-change');
                }, function (err) {
                    busyIndicatorService.hide();
                    showOverlay(err);
                });
        }
        }, 200)

        /**
         * this will chain the operations of sorting and filtering based on the current table state (sort options, filtering, ect)
         */
        //pipe method modified for handling server side pagination
        this.pipe = function pipe() {
            var pagination = tableState.pagination;
            var group = tableState.group;

            if (ctrl.sitConfig.dataSource && ctrl.sitConfig.enablePaging === false) {
                ctrl.setServerSideItemCount();
            } else if (ctrl.sitConfig.dataSource) {
                getData(pagination);
            } else {
                var searchFieldNames = tableState.search.fieldNames;
                var input = tableState.search.input;
                if (searchFieldNames && searchFieldNames.length && input) {
                    var filteredArr = [], i = 0, length = searchFieldNames.length;
                    for (i; i < length; i++) {
                        var pred = {};
                        $parse(searchFieldNames[i]).assign(pred, input);
                        filteredArr = _.union(filteredArr, filter(safeCopy, pred));
                }
                    filtered = filteredArr;
                } else {
                    filtered = safeCopy
            }

                if (tableState.filter.predicateObject) {
                    filtered = tableState.filter.predicateObject ? filterBarFilter(filtered, tableState.filter.predicateObject) : safeCopy;
            }

                if (tableState.sort.predicate) {
                    filtered = orderBy(filtered, tableState.sort.predicate, tableState.sort.reverse);
            }
                var output;
                pagination.totalItemCount = filtered.length;

                if (group.predicate !== undefined) {
                    filtered = groupByProperty(filtered, group.predicate);
                } else {
                    ctrl.isGroupedBy = false;
                }
                if (!ctrl.isGroupedBy && pagination.number !== undefined) {
                    pagination.numberOfPages = filtered.length > 0 ? Math.ceil(filtered.length / pagination.number) : 1;
                    pagination.start = pagination.start >= filtered.length ? (pagination.numberOfPages - 1) * pagination.number : pagination.start;
                    output = filtered.slice(pagination.start, pagination.start + parseInt(pagination.number));
            }
                var finalOutput = output || filtered;
                $scope[ctrl.displayedCollectionId] = finalOutput;
                if (!ctrl.isGroupedBy) {
                    initPaginationOptions(pagination.totalItemCount);
                    if (ctrl.paginationOptions.currentPage > pagination.numberOfPages) {
                        ctrl.paginationOptions.currentPage = pagination.numberOfPages;
                        ctrl.paginationOptions.currentPageIndex--;
                    }
                    window.$UIF.Function.safeCall(ctrl.paginationOptions, 'api.draw');
                }
                reformSelectedRowsList(tableState, safeCopy, ctrl.sitConfig.uniqueID);
                setSelectedItems();// Method for selecting items when settings are restored.
                toggleTableScrollbar();
                $scope.$emit('sit-table-collection-change');
        }
    };

        //function to align table header with table body as scrollbars visibility changes.
        function toggleTableScrollbar() {
            var width = 0;
            var elementLength = $element.children().eq(0).children('tr:last-child').children('th.scroll-column-header').length;
            var isColumnResized = $element.children().eq(0).children('tr:last-child').attr('style') ? true : false;

            $timeout(function () {
                var tbody = $element.children('tbody')[0];
                if (tbody) {
                    tbody.onscroll = function () {
                        if (this.scrollTop) {
                            $element.children('thead').first().addClass('shadow');
                        } else {
                            $element.children('thead').first().removeClass('shadow');
                    }
                }
            }
                if (tbody.scrollHeight > tbody.clientHeight) {
                    if ($element.children().eq(1)[0].scrollWidth === $element.children().eq(1)[0].clientWidth && isColumnResized) {
                        $element.children().eq(0).children('tr:last-child').children('th.scroll-column-header').remove('th.scroll-column-header');
                        width = $element.children().eq(1).children(':first-child').width();
                        $element.children().eq(0).children('tr:last-child').css("width", width);
                    } else if (elementLength === 0 && !isColumnResized) {
                        $element.children().eq(0).children('tr:last-child').append('<th class="scroll-column-header"></th>');
                }
                } else {
                    if ($element.children().eq(1)[0].scrollWidth === $element.children().eq(1)[0].clientWidth && isColumnResized) {
                        $element.children().eq(0).children('tr:last-child').children('th.scroll-column-header').remove('th.scroll-column-header');
                        width = $element.children().eq(1).children(':first-child').width();
                        $element.children().eq(0).children('tr:last-child').css("width", width);
                    } else if (elementLength === 1 && !isColumnResized) {
                        $element.children().eq(0).children('tr:last-child').children('th.scroll-column-header').remove('th.scroll-column-header');
                }
            }
            }, 10);
    }

        function setSelectedItems() {
            var uniqueId = ctrl.sitConfig.uniqueID;
            var rowArray = getRows($scope[ctrl.displayedCollectionId], tableState.group.predicate);
            var i = 0, j, length = rowArray.length, selectedlength;
            if (ctrl.sitConfig.selectionMode) {
                if (ctrl.sitConfig.selectionMode.toLowerCase() === 'single' && tableState.selectedRows.length > 0) {
                    tableState.selectedRows = tableState.selectedRows.splice(tableState.selectedRows.length - 1);
                    lastSelected = tableState.selectedRows.length === 1 ? tableState.selectedRows[0] : undefined;
                } else if (ctrl.sitConfig.selectionMode.toLowerCase() === 'none') {
                    tableState.selectedRows = [];
                    lastSelected = undefined;
            }
        }
            selectedlength = tableState.selectedRows.length;
            removeCurrentSelection(rowArray);
            for (i; i < selectedlength; i++) {
                for (j = 0; j < length; j++) {
                    if (uniqueId) {
                        if (typeof uniqueId === 'function') {
                            var isSelected = uniqueId(rowArray[j], tableState.selectedRows[i]);
                            if (isSelected) {
                                rowArray[j].isSelected = true;

                                //updating the new object to the selected item list
                                updateSelectedRow(tableState, rowArray, i, j);
                        }
                        } else if (typeof uniqueId === 'string' && tableState.selectedRows[i][uniqueId] === rowArray[j][uniqueId]) {
                            rowArray[j].isSelected = true;

                            //updating the new object to the selected item list
                            updateSelectedRow(tableState, rowArray, i, j);
                    }
                    } else {
                        if (areObjectsEqual(tableState.selectedRows[i], rowArray[j]) && !rowArray[j].isSelected) {
                            rowArray[j].isSelected = true;
                            updateSelectedRow(tableState, rowArray, i, j);
                    }
                }
            }
        }
            updatePager(tableState, ctrl);
    }

        function updateSelectedRow(tableState, rowArray, i, j) {
            tableState.selectedRows[i] = rowArray[j];
            tableState.selectionMode === 'single' && (lastSelected = rowArray[j]);
    }

        function checkForSelectAll() {
            var isAllSelected = false, rowArray;
            rowArray = getRows($scope[ctrl.displayedCollectionId], tableState.group.predicate);
            if (rowArray.length > 0) {
                isAllSelected = _.find(rowArray, function (item) {
                    return item.isSelected === undefined || item.isSelected === false;
                });
                isAllSelected = isAllSelected === undefined;
        }
            return isAllSelected;
    }

        function updatePager(tableState, ctrl) {
            tableState.pagination.selectedItems = tableState.selectedRows.length;
            ctrl.isAllSelected = checkForSelectAll();
    }

        function setServerDataManager() {
            var serverOptions = ctrl.sitConfig.dataSource;

            // Need to add info for the quick search and other details from tablestate
            // Default Config
            var config = {
                    pagingOptions: {
                            currentPage: 1,
                            pageSize: 10
            },
                    quickSearchOptions: {
                            enabled: true,
                            field: '',
                            filterText: ''
            },

                    sortInfo: {
                            field: '',
                            direction: ''
            },
                    serverDataOptions: serverOptions
        };
            serverDataManager = serverDataService.getDataManager(config);

            !_.isEmpty(tableState.pagination) && setServerPagingOption();
            !_.isEmpty(tableState.sort) && setServerSortingOption();
            !_.isEmpty(tableState.search) && setServerQSOption();
            !_.isEmpty(tableState.filter) && setServerFilterOption();
    }


        function setServerPagingOption() {
            var paginationState = tableState.pagination;
            var start = paginationState.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var pageSize = paginationState.number || 10;  // Number of entries showed per page.
            var currentPage = Math.floor(start / pageSize) + 1
            serverDataManager.setPageSize(pageSize);
            serverDataManager.setCurrentPage(currentPage);
    }

        function setServerSortingOption() {
            var sortState = tableState.sort;
            var sortDirection = sortState.reverse ? 'desc' : 'asc';
            var sortField = sortState.predicate || '';
            serverDataManager.setSortInfo(sortField, sortDirection);
    }

        function setServerQSOption() {
            var searchState = tableState.search;
            var searchFields = searchState.fieldNames || '';
            var input = searchState.input || ''
            serverDataManager.setSearchField(searchFields);
            serverDataManager.setSearchText(input);
    }

        function setServerFilterOption() {
            serverDataManager.setFilter(tableState.filter.predicateObject);
    }

        function showOverlay(err) {
            overlay.title = $translate.instant('common.error');
            overlay.text = common.formatErrorMessage(err);
            globalMsgOverlayManager.set(overlay);
            globalMsgOverlayManager.show();
    }

        /**
         * select a dataRow (it will add the attribute isSelected to the row object)
         * @param {Object} row - the row to select
         * @param {String} [mode] - "single" or "multiple" (multiple by default)
         */
        this.select = function select(row, mode) {
            var rows = getRows($scope[ctrl.displayedCollectionId], tableState.group.predicate);
            var index = rows.indexOf(row);
            if (index !== -1) {
                if (mode === 'single') {
                    tableState.selectedRows = [];
                    row.isSelected = row.isSelected !== true;
                    if (lastSelected) {
                        lastSelected.isSelected = false;
                }
                    lastSelected = row.isSelected === true ? row : undefined;
                } else if (mode === 'none') {
                    return;
                } else {
                    rows[index].isSelected = !rows[index].isSelected;
                    rows[index].isSelected === true ? tableState.pagination.selectedItems++ : tableState.pagination.selectedItems--;
                    if (!row.isSelected) {
                        removeFromSelectedList(row);
                }

                    ctrl.isAllSelected = checkForSelectAll();
            }
                row.isSelected && tableState.selectedRows.push(row);
                notifySelectionChanged(row);
        }
    };

        /**
         * @ngdoc event
         * @name sitTable#sit-row-selection-change
         * @eventType Emit on sitTable
         * @description
         * Emitted when a user clicks on a row in the collection and changes
         * the list of currently selected rows.
         * 
         * Two parameters are passed along with the event:
         * * **selectedRows**: A list of the currently selected data rows.
         * * **selRow**: The data item corresponding to the row the user
         * clicked on to trigger the event.
         * 
         * @param {Object} event The event object.
         * 
         * @param {Object[]} selectedRows A list of the currently selected data rows.
         * 
         * @param {Object} selRow The data item corresponding to the row the user
         * clicked to trigger the event.
         * 
         */
        function notifySelectionChanged(selRow) {
            $scope.$emit('sit-row-selection-change', tableState.selectedRows, selRow);
            if (ctrl.sitConfig.onSelectionChangeCallback) {
                ctrl.sitConfig.onSelectionChangeCallback(tableState.selectedRows, selRow);
        }
    }

        function removeFromSelectedList(row) {
            var i = 0, length = tableState.selectedRows.length;
            for (i; i < length; i++) {
                if (areObjectsEqual(tableState.selectedRows[i], row)) {
                    tableState.selectedRows.splice(i, 1);
                    break;
            }
        }
    }

        /**
         * take a slice of the current sorted/filtered collection (pagination)
         *
         * @param {Number} start - start index of the slice.
         * @param {Number} number - the number of items in the slice.
         * @param {Number} pageNum - the current page number. 
         */
        this.slice = function splice(start, number, page) {
            tableState.pagination.start = start;
            tableState.pagination.number = number;
            return this.pipe();
    };

        /**
         * returns the current state of the table
         * @returns {{sort: {}, search: {}, pagination: {start: number}}}
         */
        this.tableState = function getTableState() {
            return tableState;
    };

        this.getFilteredCollection = function getFilteredCollection() {
            return filtered || safeCopy;
    };

        /**
         * Use a different filter function than the angular FilterFilter
         * @param filterName The name under which the custom filter is registered
         */
        this.setFilterFunction = function setFilterFunction(filterName) {
            filter = $filter(filterName);
    };


        this.setFilterBarFunction = function setFilterBarFunction(filterName) {
            filterBarFilter = $filter(filterName);
    };

        /**
         * Use a different function than the angular orderBy
         * @param sortFunctionName the name under which the custom order function is registered
         */
        this.setSortFunction = function setSortFunction(sortFunctionName) {
            orderBy = $filter(sortFunctionName);
    };

        /**
         * Usually when the safe copy is updated the pipe function is called.
         * Calling this method will prevent it, which is something required when using a custom pipe function
         */
        this.preventPipeOnWatch = function preventPipe() {
            pipeAfterSafeCopy = false;
    };

        /*API methods*/
        ctrl.onInitCallback = function () {
            if (ctrl.sitConfig.onInitCallback && angular.isFunction(ctrl.sitConfig.onInitCallback)) {
                ctrl.sitConfig.onInitCallback(ctrl.sitConfig);
        }
    };

        /**
         * @ngdoc event
         * @name sitTable#sit-table-page-change
         * @eventType Emit on sitTable pager
         * @description
         * Emitted when the value of the current page in the pager is changed.
         * 
         * The new page number is passed as a parameter with the event.
         * 
         * @param {Object} event The event object.
         * 
         * @param {Number} currPageNum The new page number.
         * 
         */
   
        /**
        * @ngdoc event
        * @name sitTable#sit-table-sort-change
        * @eventType Emit on sitTable pager
        * @description
        * Emitted when the table sort configuration changes.
        * 
        * fieldName and reverse are passed as parameters with the event.
        * 
        * @param {Object} event The event object.
        * 
        * @param {String} fieldName The name of the field on which sorting is performed.
        *
        * @param {Boolean} reverse Set to 'true' if sorted in descending order, else set to 'false'.
        * 
        */
        function notifySortChanged(fieldName, reverse) {
            $scope.$emit('sit-table-sort-change', fieldName, reverse);
            if (ctrl.sitConfig.onSortChangeCallback && angular.isFunction(ctrl.sitConfig.onSortChangeCallback)) {
                ctrl.sitConfig.onSortChangeCallback(fieldName, reverse);
        }
    }

        /**
        * @ngdoc method
        * @module siemens.simaticit.common.widgets.table
        * @name TableConfig#getSettings
        *
        * @description
        * Retrieves the current settings (selections, groups, sorting, etc.) of the table.
        *
        * @returns {SettingsObject} Object containing table settings. For a description of this object see {@link SettingsObject}
        */
        this.getSettings = function () {
            return tableState;
    }

        /**
        * @ngdoc method
        * @module siemens.simaticit.common.widgets.table
        * @name TableConfig#applySettings
        * @param {SettingsObject} [settingsObject] Object containing table settings. For a description of this object see {@link SettingsObject}
        * @description
        * Applies the specified settings (selections, groups, sorting, etc.)  defined by a {@link SettingsObject}. If {@link SettingsObject} is invalid (or of a different table), then
        * the table will not behave as expected.
        *
        */
        this.applySettings = function (settingsObject) {
            if (settingsObject) {
                tableState = settingsObject;
                ctrl.sitConfig.selectionMode = settingsObject.selectionMode ? settingsObject.selectionMode : ctrl.sitConfig.selectionMode;
                refresh();
        }
    };

        /**
        * @ngdoc method
        * @module siemens.simaticit.common.widgets.table
        * @name TableConfig#saveSettings
        *
        * @param {String} [ID]
        * ID of the table whose settings need to be saved.
        *
        * @description
        * Saves the settings (selections, groups, sorting, etc.) of a specified table (identified by a unique ID) to sessionStorage.
        *
        */
        this.saveSettings = function (id) {
            window.sessionStorage.setItem(id, JSON.stringify(tableState));
    }

        /**
        * @ngdoc method
        * @module siemens.simaticit.common.widgets.table
        * @name TableConfig#loadSettings
        * @param {String} [ID]
        * ID of the table whose settings need to be loaded.
        *
        * @description
        * Loads the settings (selections, groups, sorting, etc.) of a specified table (identified by a unique ID) from sessionStorage (selections, groups, sorting, etc.).
        *
        * @returns {SettingsObject} Settings object containing the table settings. For a description of this object see {@link SettingsObject}
        */
        this.loadSettings = function (id) {
            var savedState;
            if (window.sessionStorage.getItem(id)) {
                savedState = JSON.parse(window.sessionStorage.getItem(id));
        }
            return savedState;
    }

        ctrl.setTableAPIOptions = function () {
            if (ctrl.sitConfig) {
                ctrl.sitConfig.getSettings = ctrl.getSettings;
                ctrl.sitConfig.applySettings = ctrl.applySettings;
                ctrl.sitConfig.loadSettings = ctrl.loadSettings;
                ctrl.sitConfig.saveSettings = ctrl.saveSettings;
                ctrl.sitConfig.refreshData = refreshData;
        }
    };

        ctrl.setTableAPIOptions();
        ctrl.onInitCallback();
    }
    // Whenever the collection changes we need to ensure that the selected rows list is still valid and make necessary deletions.
    function reformSelectedRowsList(tableState, safeCopy, uniqueId) {
        var i = 0, j, length = safeCopy.length, deleteIndex = [];

        //donot remove the selected items if uniqueID is configured
        if (uniqueId) {
            return;
        }
        for (i; i < tableState.selectedRows.length; i++) {
            for (j = 0; j < length; j++) {
                if (areObjectsEqual(tableState.selectedRows[i], safeCopy[j])) {
                    break;
                }
            }
            if (j === length) {
                deleteIndex.unshift(i);
            }
        }
        deleteIndex.forEach(function (index) {
            tableState.selectedRows.splice(index, 1);
            tableState.pagination.selectedItems > 0 && tableState.pagination.selectedItems--;
        });
    }

    function areObjectsEqual(obj1, obj2) {
        if (obj1 && obj2) {
            var obj1Copy = JSON.parse(angular.toJson(obj1))
            var obj2Copy = JSON.parse(angular.toJson(obj2))
            delete obj1Copy.isSelected;
            delete obj2Copy.isSelected;
            if (_.isEqual(obj1Copy, obj2Copy)) {
                return true;
            }
        }
        return false;
    }

    function groupByProperty(collection, property) {
        var output = [];
        var groupReference = {};

        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            var keyValue = getPropValue(item, property);

            var group = groupReference[keyValue];
            if (group === undefined) {
                group = {
                    key: keyValue,
                    items: []
                };
                groupReference[keyValue] = group;
                output.push(group);
            }
            group.items.push(item);
        }
        return output;
    }

    function getPropValue(item, key) {
        var keyArray = key.split(".");
        while (keyArray.length) {
            item = item[keyArray.shift()];
        }
        return item;
    }

    function removeCurrentSelection(rowArray) {
        var i = 0, length = rowArray.length;
        for (i; i < length; i++) {
            if (rowArray[i].isSelected) {
                rowArray[i].isSelected = false;
            }
        }
    }

    function copyRefs(src) {
        return src ? [].concat(src) : [];
    }

    function getRows(displayedCollection, isGrouped) {
        var rows = copyRefs(displayedCollection);
        if (isGrouped !== undefined) {
            rows = getGroupedRows(rows);
        }
        return rows;
    }

    function getGroupedRows(rows) {
        var groupedRows = [];
        function makeRows(rows) {
            rows.forEach(function (row) {
                if (row.items && row.items.length > 0) {
                    makeRows(row.items)
                } else {
                    groupedRows.push(row)
                }
            });
        }
        makeRows(rows);
        return groupedRows;
    }

    TableDirective.$inject = ['common.services.logger.service', '$compile', '$timeout', '$templateCache', '$parse', 'common.services.personalization.personalizationService'];
    function TableDirective(logger, $compile, $timeout, $templateCache, $parse, personalizationService) {
        var tableCount = 0;
        return {
            restrict: 'A',
            controller: 'sitTableController',
            controllerAs: 'sitTableCtrl',
            bindToController: {
                sitConfig: '=sitConfig'
            },
			compile: function (tElement, tAttrs) {
                tableCount++;
                var columnDefs = [],
                    dataRowCache = {},
                    headerRowCache = {},
                    columnCount = 0,
                    headOuterText = '',
                    bodyOuterText = '';

                var headerChildrenCache = {};
                var displayedCollectionId = 'displayedCollection_' + tableCount;

                var headerCache = tElement.children().eq(0).children('tr:last-child');
                columnCount = headerCache.children().length;
                var eleCache = tElement.children().eq(1).children();
                var repeatValue = eleCache[0].hasAttribute('ng-repeat-start') ?
                    'ng-repeat-start' : 'ng-repeat';
                var rowCollection = eleCache[0].getAttribute(repeatValue);
                var rowName = rowCollection.substring(0, rowCollection.indexOf(' '));
				eleCache.children('td').find('[sit-mom-icon]').each(function (index, childItem) {
					$(childItem).addClass('table-command-icon');
				});

				eleCache.each(function (index, item) {
					if (!item.hasAttribute('sit-freez')) {
						$(item).attr('sit-select-row', rowName);
					}
				});
                var recordLabel = [];
                eleCache[0].setAttribute(repeatValue, rowName + ' in ' + displayedCollectionId);
                headerCache.children().each(function (index, item) {
                    var field = $(item).attr('sit-field');
                    if (!field) {
                        headerRowCache[index] = item.outerHTML;
                    } else {
                        headerRowCache[field] = item.outerHTML;
                    }
                    recordLabel.push(item.innerHTML);
                });
                $(eleCache[0]).children().each(function (index, item) {
                    var label = recordLabel.splice(0, 1);
                    $(item).attr('data-label', label[0]);
                    var field = $(item).attr('sit-field');

                    if (!field) {
                        dataRowCache[index] = item.outerHTML;
                    } else {
                        dataRowCache[field] = item.outerHTML;
                        columnDefs.push({ field: field, displayName: label[0], visible: true });
                    }
                });

                headerCache.append('<th class="scroll-column-header"></th>');

				headerCache.prepend('<th ng-if="' + tAttrs.sitConfig + '.svgIcon || ' + tAttrs.sitConfig + '.typeIcon"  class="table-type-icon"></th>');
				
				
				eleCache.prepend('<td ng-if="' + tAttrs.sitConfig + '.svgIcon" class="table-type-icon"><img ng-src="{{' + tAttrs.sitConfig + '.svgIcon}}" class="table-mom-icon"></td>')
				eleCache.prepend('<td ng-if="!' + tAttrs.sitConfig + '.svgIcon && ' + tAttrs.sitConfig + '.typeIcon" class="table-type-icon"><img ng-src="common/icons/type{{' + tAttrs.sitConfig + '.typeIcon}}48.svg" class="table-mom-icon"></td>')

                //cache the outer html
                headOuterText = tElement.children(':first-child').children(':last-child')[0].outerHTML;
                bodyOuterText = tElement.children()[1].outerHTML;
                $templateCache.put(tAttrs.sitTable, tElement.children()[1].outerHTML);

                return {
                    pre: function preLink() {
                    },
                    post: function postLink(scope, element, attr, ctrl) {
                        var userPreferences = null;
						var enableColumnSorting = false;
                        if (attr.stSetFilter) {
                            ctrl.setFilterFunction(attr.stSetFilter);
                        }

                        if (attr.stSetSort) {
                            ctrl.setSortFunction(attr.stSetSort);
                        }

                        if (ctrl.sitConfig.userPrefId) {
                            var userPreferenceCols = [];
                            userPreferences = personalizationService.getCurrentUserPreference('sit-table', ctrl.sitConfig.userPrefId);
                            if (userPreferences && Object.keys(userPreferences.columns).length === columnDefs.length) {
                                for (var column in userPreferences.columns) {
                                    var index = _.findIndex(columnDefs, {
                                        field: column
                                    });
                                    columnDefs[index].visible = userPreferences.columns[column].visible;
                                    userPreferenceCols.push(columnDefs[index]);
                                }
                                columnDefs = userPreferenceCols;
                                personalizeTable(userPreferenceCols);
                            }
                        }

                        if (ctrl.sitConfig.fields) {
                            var columnsToHide = {};
                            Object.keys(ctrl.sitConfig.fields).forEach(function (key) {
                                if (ctrl.sitConfig.fields[key].visible === false) {
                                    columnsToHide[key] = false;
                                }
                                if (ctrl.sitConfig.fields[key].sorting && !enableColumnSorting) {
                                    enableColumnSorting = true;
                                }
                            });
                            if (Object.keys(columnsToHide).length) {
                                hideColumns(columnsToHide);
                                if (!userPreferences) {
                                    resetTable();
                                }
                            }
                        }

                        ctrl.displayedCollectionId = displayedCollectionId;
                        scope[displayedCollectionId] = [];
                        ctrl.personalizeTable = personalizeTable;
                        ctrl.resetPersonalization = resetTable;
                        ctrl.getColumnDefs = getColumnDefs;
                        ctrl.getResetColumnDefs = getResetColumnDefs;

                        if (ctrl.tableState().group.predicate) {
                            var groupedTableBody = $compile('<sit-table-group type="group" name="' + attr.sitTable + '"></sit-table-group>')(scope);
                            element.children().eq(1).replaceWith(groupedTableBody);
                        }

                        function hideColumns(columnsToHide) {
                            var headElement = headOuterText;
                            var bodyElement = bodyOuterText;

                            var parsedHead = $.parseHTML(headElement);
                            var parsedBody = $.parseHTML(bodyElement);
                            $(parsedHead).children(':not(th.scroll-column-header)').each(function (index, item) {
                                var field = $(item).attr('sit-field');
                                if (columnsToHide[field] === false) {
                                    $(item).attr('ng-if', false);
                                }
                            });
                            $(parsedBody).children().eq(0).children().each(function (index, item) {
                                var field = $(item).attr('sit-field');
                                if (columnsToHide[field] === false) {
                                    $(item).attr('ng-if', false);
                                }
                            });

                            headOuterText = parsedHead[0].outerHTML;
                            bodyOuterText = parsedBody[0].outerHTML;
                            $templateCache.put(attr.sitTable, parsedBody[0].outerHTML);
                        }

                        function personalizeTable(preferenceSettings) {
                            var bodyCache = $.parseHTML(bodyOuterText);
                            var headCache = $.parseHTML(headOuterText);

                            $(bodyCache).children(':first-child').empty();
                            $(headCache[0]).empty();
                            for (var index = 0; index < columnCount; index++) {
                                if (headerRowCache[index] && dataRowCache[index]) {
                                    var parsedHeadColumn = $.parseHTML(headerRowCache[index]);
                                    var parsedBodyColumn = $.parseHTML(dataRowCache[index]);
                                    $(headCache[0]).append(parsedHeadColumn);
                                    $(bodyCache).children(':first-child').append(parsedBodyColumn);
                                }
                            }
                            preferenceSettings.forEach(function (setting) {
                                var parsedHeadColumn = $.parseHTML(headerRowCache[setting.field]);
                                var parsedBodyColumn = $.parseHTML(dataRowCache[setting.field]);
                                if (setting.visible === false) {
                                    $(parsedHeadColumn).attr('ng-if', false);
                                    $(parsedBodyColumn).attr('ng-if', false);
                                }
                                $(headCache[0]).append(parsedHeadColumn);
                                $(bodyCache).children(':first-child').append(parsedBodyColumn);
                            });
                            $(headCache[0]).append('<th class="scroll-column-header"></th>');
                            //new table head compile
                            var compiledHead = $compile(headCache)(scope);
                            element.children(':first-child').children(':last-child').replaceWith(compiledHead);

                            //adding column resize attribute
                            if (ctrl.sitConfig.enableColumnResizing !== false) {
                                $compile(element.children().eq(0).children('tr:last-child').attr('sit-table-col-resize', ''))(scope);
                            }

                            //adding column sortable attribute
                            if (enableColumnSorting) {
                                $compile(element.children().eq(0).children('tr:last-child').attr('sit-table-sortable', ''))(scope);
                            }

                            //new table body compile
                            $templateCache.put(attr.sitTable, bodyCache[0].outerHTML);
                            if (ctrl.tableState().group && ctrl.tableState().group.predicate) {
                                var groupedTableBody = $compile('<sit-table-group type="group" name="' + attr.sitTable + '"></sit-table-group>')(scope);
                                element.children().eq(1).replaceWith(groupedTableBody);
                            } else {
                                var compiledBody = $compile(bodyCache)(scope);
                                element.children().eq(1).replaceWith(compiledBody);
                            }
                        }

                        function resetTable() {
                            var headElement = headOuterText;
                            var bodyElement = bodyOuterText;

                            ctrl.isRefreshServerSideData = true;
                            ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
                            ctrl.totalServerItemsLoadedCount = 0;

                            //original table head compile
                            var compiledHead = $compile(headElement)(scope);
                            element.children(':first-child').children(':last-child').replaceWith(compiledHead);

                            //adding column resize attribute
                            if (ctrl.sitConfig.enableColumnResizing !== false) {
                                $compile(element.children().eq(0).children('tr:last-child').attr('sit-table-col-resize', ''))(scope);
                            }

                            //adding column sortable attribute
                            if (enableColumnSorting) {
                                $compile(element.children().eq(0).children('tr:last-child').attr('sit-table-sortable', ''))(scope);
                            }

                            //original table body compile
                            $templateCache.put(attr.sitTable, bodyElement);
                            if (ctrl.tableState().group && ctrl.tableState().group.predicate) {
                                var groupedTableBody = $compile('<sit-table-group type="group" name="' + attr.sitTable + '"></sit-table-group>')(scope);
                                element.children().eq(1).replaceWith(groupedTableBody);
                            } else {
                                var compiledBody = $compile(bodyElement)(scope);
                                element.children().eq(1).replaceWith(compiledBody);
                            }
                        }

                        function getColumnDefs() {
                            var visibleColumns = {}
                            var headerElement = element.children().eq(0).children('tr:last-child').children('th:not(.scroll-column-header)');
                            headerElement.each(function (index, item) {
                                var field = $(item).attr('sit-field');
                                if (field) {
                                    visibleColumns[field] = true;
                                }
                            });
                            columnDefs.forEach(function (item, index) {
                                item.displayName = item.displayName.replace(/\{\{(.+?)\}\}/g, function (match, text) { return $parse(text)(scope) }); //NOSONAR
                                item.visible = visibleColumns[item.field] ? true : false;
                            });
                            return columnDefs;
                        }

                        function getResetColumnDefs() {
                            var headerElement = element.children().eq(0).children('tr:last-child').children('th:not(.scroll-column-header)');
                            headerElement.each(function (index, item) {
                                var column = $(item).attr('sit-field');
                                var colIndex = _.findIndex(columnDefs, { field: column });
                                if (colIndex != -1) {
                                    columnDefs[colIndex].index = index;
                                    columnDefs[colIndex].visible = true;
                                }
                            });
                            columnDefs = columnDefs.sort(function (a, b) { return a.index - b.index; });
                            return columnDefs;
                        }

                        scope.$watch(function () {
                            return ctrl.tableState().group;
                        }, function (newValue, oldValue) {
                            if (angular.isString(newValue.predicate) !== angular.isString(oldValue.predicate)) {
                                logger.log('Grouping changed', newValue.predicate, 'sitTable');
                                var groupedTableBody;
                                if (newValue.predicate !== '' && newValue.predicate !== undefined) {
                                    groupedTableBody = $compile('<sit-table-group type="group" name="' + attr.sitTable + '"></sit-table-group>')(scope);
                                    element.children().eq(1).replaceWith(groupedTableBody);
                                } else {
                                    groupedTableBody = $compile('<sit-table-group name="' + attr.sitTable + '"></sit-table-group>')(scope);
                                    element.children().eq(1).replaceWith(groupedTableBody);
                                }
                                scope.$emit('sit-table-group-change', newValue.predicate);
                            }
                        }, true);
                        var button = $compile('<span sit-table-button sit-icon=\"fa-check-square-o\" ng-show="!sitTableCtrl.sitConfig.selectionMode || (sitTableCtrl.sitConfig.selectionMode.toLowerCase() !== \'single\' && sitTableCtrl.sitConfig.selectionMode.toLowerCase() !== \'none\')" ng-click=\"sitTableCtrl.selectToggle()\" sit-selected="sitTableCtrl.isAllSelected"  sit-type="toggle" sit-label=\"{{\'common.selectAll\' | translate}}\"></span><span sit-table-separator ng-show="!sitTableCtrl.sitConfig.selectionMode || (sitTableCtrl.sitConfig.selectionMode.toLowerCase() !== \'single\'  && sitTableCtrl.sitConfig.selectionMode.toLowerCase() !== \'none\')"></span>')(scope);
                        element.children().eq(0).find('.tool-bar').prepend(button);
                        if (ctrl.sitConfig.enableColumnResizing !== false) {
                            $compile(element.children().eq(0).children('tr:last-child').attr('sit-table-col-resize', ''))(scope);
                        }
                        if (enableColumnSorting) {
                            $compile(element.children().eq(0).children('tr:last-child').attr('sit-table-sortable', ''))(scope);
                        }

                        ctrl.bindScroll = function () {
                            if (ctrl.serverData && !ctrl.sitConfig.enablePaging) {
                                element.find('tbody').unbind('scroll', ctrl.onScroll);
                                element.find('tbody').bind('scroll', ctrl.onScroll);
                            }
                        }
                        ctrl.bindScroll();
                        if (ctrl.sitConfig.data && !scope[ctrl.displayedCollectionId].length) {
                            ctrl.sitConfig.refreshData();
                        }
                    }
                };
            }

        };
    }


})();
(function () {
    "use strict";
    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.table
    * @name sitTableFilterbar
    *
    * @restrict AE
    *
    * @description
	* Provides a UI for defining the filter bar.
    *
    * @usage
    * As an attribute:
    * ```
    * <span sit-table-filterbar></span>
    * ```
    *
    * Filtering of data in the **sitTableFilterbar** is performed using the:
    * * {@link siemens.simaticit.common.widgets.filter.sitFilter} directive and the
    * * {@link siemens.simaticit.common.widgets.filter.sitFilterService} service.
    *
    * The **sitTable** wraps the use of these components so that a user of the **sitTable** does
    * not need to interact with them directly.
    */

    angular.module('siemens.simaticit.common.widgets.table').directive('sitTableFilterbar', TableFilterBar);

    SitTableFilterbarController.$inject = ['$scope', '$element', '$translate', 'common.widgets.globalDialog.service',
        'common.services.personalization.personalizationService', 'common.widgets.messageOverlay.service'];
    function SitTableFilterbarController($scope, $element, $translate, globalDialogService, personalizationService, globalMsgOverlayManager) {
        var vm = this;
        vm.activate = activate;
        activate();

        function activate() {
            vm.showFilter = false;
            vm.sortByField = sortByField;
            vm.quickSearch = quickSearch;
            vm.groupFields = groupFields;
            vm.tableCtrl = $element.controller('sitTable');
            vm.previousConfiguration = [];
            vm.serverData = vm.tableCtrl.sitConfig.dataSource ? true : false;
            vm.buttons = [{
                id: "resetButton",
                onClickCallback: function () {
                    globalDialogService.hide();
                    showResetOverlay();
                }
            }, {
                id: "saveAllButton",
                displayName: $translate.instant('common.ok'),
                onClickCallback: function () {
                    globalDialogService.hide();
                    var columnDefs = vm.personalizationSettings.templatedata.data.columnDefs.sort(function (a, b) { return a.index - b.index; });
                    var columns = {};
                    columnDefs.forEach(function (column) {
                        columns[column.field] = { visible: column.visible };
                    });
                    var preferenceSettings = {
                        type: 'sit-table',
                        prefrenceId: vm.tableCtrl.sitConfig.userPrefId,
                        value: {
                            columns: columns
                        }
                    };

                    personalizationService.setPersonalization(preferenceSettings.type, preferenceSettings.prefrenceId, preferenceSettings.value).then(function () {
                        vm.previousConfiguration = angular.merge([], vm.personalizationSettings.templatedata.data.columnDefs.sort(function (a, b) { return a.index - b.index; }));
                        vm.tableCtrl.personalizeTable(columnDefs);
                    }, function () { });
                }
            }, {
                id: "cancelButton",
                displayName: $translate.instant('common.cancel'),
                onClickCallback: function () {
                    globalDialogService.hide();
                    if (vm.previousConfiguration.length) {
                        vm.personalizationSettings.templatedata.data.columnDefs = angular.merge([], vm.previousConfiguration);
                    }
                }
            }]
            var displayOptions = getDisplayOptions();
            var tableState = vm.tableCtrl.getSettings();
            var groupField = tableState.group.predicate || '';
            var sortField = tableState.sort.predicate || '';
            var sortDirection = tableState.sort.reverse ? 'desc' : 'asc';
            var searchText = tableState.search.input;
            vm.filterOptions = {
                currentGroupField: groupField,
                currentSortDirection: sortDirection,
                currentSortField: sortField,
                displayOptions: displayOptions,
                onFilterClickCallback: function () {
                    vm.showFilter = !vm.showFilter;
                    if (vm.showFilter === false) {
                        $scope.$emit('sit-table-filter-builder-closed');
                    }
                },
                groupByFields: getAllFieldsToGroup(),
                onGroupChangeCallback: function (group) {
                    vm.groupFields(group);
                },
                quickSearchField: getAllFieldsToSearch(),
                quickSearchText: searchText,
                onSearchChangeCallback: function (searchText) {
                    vm.quickSearch(searchText);
                },
                sortByFields: getAllFieldsToSort(),
                sortByText: 'Sort By',
                onSortChangeCallback: function (field, direction) {
                    vm.sortByField(field, direction);
                },
                filterFields: getAllFilterFields(),
                onPreferenceButtonClicked: function () {
                    if (!vm.personalizationSettings) {
                        vm.personalizationSettings = getPersonalizationSettings();
                        vm.previousConfiguration = angular.merge([], vm.personalizationSettings.templatedata.data.columnDefs.sort(function (a, b) { return a.index - b.index; }));
                    }
                    globalDialogService.set(vm.personalizationSettings);
                    globalDialogService.show();
                }
            };
            vm.filterClauses = tableState.filter.predicateObject;
            vm.filterClauses && setFilterFields();
            vm.filterSearchOptions = {};
            init();
        }

        function getDisplayOptions() {
            var displayOption = 'sqgfp';
            if (getAllFieldsToSearch().length < 1) { displayOption = displayOption.replace('q', ''); }
            if (vm.serverData || getAllFieldsToGroup().length < 1) { displayOption = displayOption.replace('g', ''); }
            if (vm.tableCtrl.sitConfig && !vm.tableCtrl.sitConfig.hasOwnProperty('userPrefId')) { displayOption = displayOption.replace('p', ''); }
            return displayOption;
        }

        // Method to set the filterFields to the filter clauses as needed by filter directive
        function setFilterFields() {
            var i = 0, length = vm.filterClauses.length;
            for (i; i < length; i++) {
                var clauseFieldName = vm.filterClauses[i].filterField.field;
                var field = _.findWhere(vm.filterOptions.filterFields, { 'field': clauseFieldName })
                vm.filterClauses[i].filterField = field;
            }
            vm.showFilter = true;
        }

        function showResetOverlay() {
            var overlay = {
                text: '',
                title: '',
                buttons: [{
                    id: 'okButton',
                    displayName: $translate.instant('common.ok'),
                    onClickCallback: function () {
                        globalMsgOverlayManager.hide();
                        resetUserPrefrences();
                    }
                }, {
                    id: 'cancelButton',
                    displayName: $translate.instant('common.cancel'),
                    onClickCallback: function () {
                        globalMsgOverlayManager.hide();
                        if (!vm.personalizationSettings) {
                            vm.personalizationSettings = getPersonalizationSettings();
                            vm.previousConfiguration = angular.merge([], vm.personalizationSettings.templatedata.data.columnDefs);
                        }
                        globalDialogService.set(vm.personalizationSettings);
                        globalDialogService.show();
                    }
                }]
            };
            overlay.title = $translate.instant('userPrefrences.overlayMessage.title');
            overlay.text = $translate.instant('userPrefrences.overlayMessage.text');
            globalMsgOverlayManager.set(overlay);
            globalMsgOverlayManager.show();
        }

        function resetUserPrefrences() {
            var preferenceSettings = {
                type: 'sit-table',
                prefrenceId: vm.tableCtrl.sitConfig.userPrefId
            };
            personalizationService.resetPersonalization(preferenceSettings.type, preferenceSettings.prefrenceId).then(function () {
                vm.tableCtrl.resetPersonalization();
                vm.personalizationSettings.templatedata.data.columnDefs = vm.tableCtrl.getResetColumnDefs();
                vm.previousConfiguration = angular.merge([], vm.personalizationSettings.templatedata.data.columnDefs.sort(function (a, b) { return a.index - b.index; }));
                vm.personalizationSettings = null;
            }, function () {
                vm.personalizationSettings = null;
            });
        }

        function getAllFieldsToSearch() {
            return _.filter(_.keys(vm.tableCtrl.sitConfig.fields), function (key) {
                return vm.tableCtrl.sitConfig.fields[key].quicksearch;
            });
        }

        function getAllFieldsToGroup() {
            var groupFields = _.filter(_.keys(vm.tableCtrl.sitConfig.fields), function (key) {
                return vm.tableCtrl.sitConfig.fields[key].grouping;
            });
            return _.map(groupFields, function (obj) {
                var displayName = vm.tableCtrl.sitConfig.fields[obj].displayName || obj
                return { field: obj, displayName: displayName };
            });
        }

        function getAllFieldsToSort() {
            var sortFields = _.filter(_.keys(vm.tableCtrl.sitConfig.fields), function (key) {
                return vm.tableCtrl.sitConfig.fields[key].sorting;
            });
            return _.map(sortFields, function (obj) {
                var displayName = vm.tableCtrl.sitConfig.fields[obj].displayName || obj
                return { field: obj, displayName: displayName };
            });
        }

        function getAllFilterFields() {
            var filterFields = _.filter(vm.tableCtrl.sitConfig.fields, function (filterField, key) {
                if (filterField.filtering) {
                    filterField.filtering.field = key;
                    filterField.filtering.displayName = filterField.displayName;
                }
                return filterField.filtering;
            });
            if (vm.tableCtrl.sitConfig.filterFields && vm.tableCtrl.sitConfig.filterFields.type === 'filterPanel' && vm.tableCtrl.sitConfig.filterFields.fields.length > 0) {
                return vm.tableCtrl.sitConfig.filterFields;
            }
            return _.map(filterFields, function (obj) {
                return obj.filtering;
            });

        }

        function sortByField(field, direction) {
            var reverse = direction === 'asc' ? false : true;
            vm.tableCtrl.sortBy(field, reverse);
        }

        function quickSearch(searchText) {
            vm.tableCtrl.setFilterFunction('filter');
            invokeQuickSearch(searchText);
        }

        function invokeQuickSearch(input) {
            var length = vm.filterOptions.quickSearchField.length;
            if (length === Object.keys(vm.tableCtrl.sitConfig.fields).length) {
                vm.tableCtrl.search(input.toString(), '$');
            } else {
                var predicate = length > 0 ? vm.filterOptions.quickSearchField : '';
                vm.tableCtrl.search(input.toString(), predicate);
            }
        }

        function groupFields(group) {
            vm.tableCtrl.groupBy(group);
        }

        function init() {
            vm.isFilterPanel = false;
            if (vm.tableCtrl.sitConfig.filterFields && vm.tableCtrl.sitConfig.filterFields.type === 'filterPanel') {
                vm.isFilterPanel = true;
                vm.filterPanelData = vm.tableCtrl.sitConfig.filterFields;
                vm.filterPanelData.parentWidget = 'table';
                vm.filterPanelData.defaultApplyCallback = applyFilter;
            }
            vm.applyFilter = applyFilter;
            vm.resetFilter = resetFilter;
        }

        function getPersonalizationSettings() {
            var configuration = {
                title: $translate.instant('userPrefrences.columnConfigurator.columnConfiguration'),
                templatedata: {
                    data: {
                        columnDefs: vm.tableCtrl.getColumnDefs()
                    },
                    reset: vm.buttons[0],
                    viewMode: 'grid'
                },
                templateuri: 'common/widgets/table/table-personalization.html',
                buttons: vm.buttons
            };
            return configuration;
        }

        function applyFilter(clauses) {
            vm.tableCtrl.setFilterBarFunction('sitCustomFilter');
            vm.tableCtrl.filter(clauses);
        }

        function resetFilter() {
            $scope.$broadcast('sit-table-filter', []);
        }

        $scope.$on('sit-filter-panel-closed', function () {
            vm.showFilter = !vm.showFilter;
        })
    }

    TableFilterBar.$inject = ['$window']
    function TableFilterBar($window) {
        return {
            restrict: 'AE',
            require: '^sitTable',
            replace: true,
            scope: {},
            controller: SitTableFilterbarController,
            controllerAs: 'sitTableFilterbarCtrl',
            templateUrl: 'common/widgets/table/table-filterbar.html',
            link: function (scope, element, attr, ctrl) {
                var FILTER_MARGIN_TOP = 10;
                var currCtrl = element.controller('sitTableFilterbar');
                setTimeout(function () {
                    var holder = element.find('.filter-bar-holder');
                    if (holder.parents().closest('tr').width() <= 360) {
                        holder.addClass('filter-bar-flex');
                    }
                });
                scope.$watch(function () {
                    return ctrl.tableState();
                }, function () {
                    currCtrl.activate();
                });

                scope.$watch(function () {
                    return currCtrl.showFilter;
                }, function (newVal) {
                    if (newVal === true && !currCtrl.isFilterPanel) {
                        adjustFilterHeight();
                    } else {
                        var toolBar = element.parent('.tool-bar');
                        toolBar.removeClass('filter-open');
                        element.find('#filter').css('top', '0px');
                    }
                });

                scope.$on('sit-layout-change', onResize);

                function onResize() {
                    if (currCtrl.showFilter && !currCtrl.isFilterPanel) {
                        adjustFilterHeight();
                    }
                }

                function adjustFilterHeight() {
                    var toolBar = element.parent('.tool-bar');
                    toolBar.addClass('filter-open');
                    var toolBarheight = toolBar.height();
                    element.find('#filter').css('top', (toolBarheight + FILTER_MARGIN_TOP) + 'px');
                }

                scope.$on('$destroy', function () {
                    angular.element($window).off('resize', onResize);
                });

            }
        };
    }

    angular.module('siemens.simaticit.common.widgets.table')
        .filter('sitCustomFilter', ['common.widgets.filter.service', function (sitFilterService) {
            return function sitCustomFilter(array, clause) {
                var output = sitFilterService.filterArray(clause, array);
                return output;
            };

        }]);
})();

(function () {
    "use strict";

    angular.module('siemens.simaticit.common.widgets.table').directive('sitTableGroup', TableGroup);

    TableGroup.$inject = ['$templateCache'];
    function TableGroup($templateCache) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: function (element, attr) {
                if (attr.type === "group") {
                    return 'common/widgets/table/table-with-group.html';
                } else {
                    return attr.name;
                }
            },
            compile: function (tElement, tAttribute) {
                if (tAttribute.type === "group") {
                    var parsedHtml = $.parseHTML($templateCache.get(tAttribute.name));
                    var repeatValue = parsedHtml[0].children[0].hasAttribute('ng-repeat-start') ?
                        'ng-repeat-start' : 'ng-repeat';

                    var rowCollection = parsedHtml[0].children[0].getAttribute(repeatValue);
                    var rowName = rowCollection.substring(0, rowCollection.indexOf(' '));
                    var rowDataTD = parsedHtml[0].children[0].children;

                    tElement.children().eq(0).attr('ng-repeat-start', rowCollection);
                    tElement.children().eq(0).children()[0].innerText = '{{' + rowName + '.key}} ({{' + rowName + '.items.length}})';
                    tElement.children().eq(0).children()[0].innerHTML = '<i ng-class="show ? \'fa fa-angle-down\':\'fa fa-angle-right\'"' +
                        'aria-hidden="true"></i> {{row.key}} ({{row.items.length}})';
                    tElement.children().eq(1).attr(repeatValue, rowName + ' in ' + rowName + '.items');
                    tElement.children().eq(1).append(rowDataTD);

                    //add sibling rows if ng-repeat-start is used
                    if (repeatValue === 'ng-repeat-start') {
                        var rowSiblings = $(parsedHtml).children(':not(:first-child)');
                        rowSiblings.each(function (index, sibling) {
                            $(sibling).attr('ng-if', 'show')
                            tElement.children(':last-child').before(sibling);
                        });
                    }
                }
            }
        };
    }


})();

(function () {
    "use strict";
    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.table
    * @name sitTablePager
    *
    * @restrict AE
    *
    * @usage
    * As an attribute:
    * ```
    * <span sit-table-pager></span>
    * ```
    *
    * @description
	* Provides a UI for defining the pager.
    *
    */
    function sitTablePager() {
        return {
            restrict: 'AE',
            require: '^sitTable',
            replace: true,
            template: '<td ng-show="enablePaging !== false && !sitTableCtrl.isGroupedBy"><sit-pagination sit-options="sitTableCtrl.paginationOptions"></sit-pagination></td>',
            link: function (scope, element, attrs, ctrl) {
                scope.enablePaging = (ctrl.sitConfig.dataSource && ctrl.sitConfig.enablePaging === false ? false : true);
               }
        };
    }
    angular.module('siemens.simaticit.common.widgets.table').directive('sitTablePager', sitTablePager);

})();

// © Siemens AG, 2017
// This file has been modified as per the requirements in the SIMATIC IT App

//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table')
        .directive('stPagination', ['sitConfiguration', function (sitConfiguration) {
            return {
                restrict: 'EA',
                require: '^sitTable',
                scope: {
                    stItemsByPage: '=?',
                    stDisplayedPages: '=?',
                    stPageSizes:'=?',
                    stPageChange: '&'
                },
                templateUrl: function (element, attrs) {
                    if (attrs.stTemplate) {
                        return attrs.stTemplate;
                    }
                    return sitConfiguration.pagination.template;
                },
                link: function (scope, element, attrs, ctrl) {

                    scope.stPageSizes = scope.stPageSizes ? (scope.stPageSizes) : sitConfiguration.pagination.pageSizes;
                    scope.stItemsByPage = scope.stItemsByPage ? (scope.stItemsByPage) : sitConfiguration.pagination.itemsByPage;
                    if (scope.stPageSizes.indexOf(scope.stItemsByPage) === -1) {
                        scope.stItemsByPage = scope.stPageSizes[0];
                    }
                    scope.stDisplayedPages = scope.stDisplayedPages ? (scope.stDisplayedPages) : sitConfiguration.pagination.displayedPages;

                    scope.currentPage = 1;
                    scope.pages = [];

                    function redraw() {
                        var paginationState = ctrl.tableState().pagination;
                        var start = 1;
                        var end;
                        var i;
                        var prevPage = scope.currentPage;
                        scope.selectionMode = ctrl.tableState().selectionMode;
                        scope.selectedItems = paginationState.selectedItems;
                        scope.totalItemCount = paginationState.totalItemCount;
                        scope.currentPage = Math.floor(paginationState.start / paginationState.number) + 1;

                        start = Math.max(start, scope.currentPage - Math.abs(Math.floor(scope.stDisplayedPages / 2)));
                        end = start + scope.stDisplayedPages;

                        if (end > paginationState.numberOfPages) {
                            end = paginationState.numberOfPages + 1;
                            start = Math.max(1, end - scope.stDisplayedPages);
                        }

                        scope.pages = [];
                        scope.numPages = paginationState.numberOfPages;

                        for (i = start; i < end; i++) {
                            scope.pages.push(i);
                        }

                        if (prevPage !== scope.currentPage) {
                            scope.stPageChange({ newPage: scope.currentPage });
                        }

                    }
                    //table state --> view
                    scope.$watch(function () {
                        return ctrl.tableState().pagination;
                    }, redraw, true);

                    scope.$watch(function () {
                        return ctrl.tableState().selectionMode;
                    }, redraw, true);

                    //scope --> table state  (--> view)
                    scope.$watch('stItemsByPage', function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            scope.selectPage(1);
                        }
                    });

                    scope.$watch('stDisplayedPages', redraw);

                    //view -> table state
                    scope.selectPage = function (page) {
                        if (page > 0 && page <= scope.numPages) {
                            ctrl.slice((page - 1) * scope.stItemsByPage, scope.stItemsByPage, page);
                        }
                    };

                    scope.cantPageBackward = function (page) {
                        return page <= 1;
                    }

                    scope.cantPageForward = function(page) {
                        return page === scope.numPages;
                    }

                    if (!ctrl.tableState().pagination.number) {
                        ctrl.slice(0, scope.stItemsByPage, 1);
                    }
                }
            };
        }]);

})();

// © Siemens AG, 2017
// This file has been modified as per the requirements in the SIMATIC IT App
//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table')
        .directive('stPipe', ['sitConfiguration', '$timeout', function (config, $timeout) {
            return {
                require: 'sitTable',
                scope: {
                    stPipe: '='
                },
                link: {

                    pre: function (scope, element, attrs, ctrl) {

                        var pipePromise = null;

                        if (angular.isFunction(scope.stPipe)) {
                            ctrl.preventPipeOnWatch();
                            ctrl.pipe = function () {

                                if (pipePromise !== null) {
                                    $timeout.cancel(pipePromise)
                                }

                                pipePromise = $timeout(function () {
                                    scope.stPipe(ctrl.tableState(), ctrl);
                                }, config.pipe.delay);

                                return pipePromise;
                            }
                        }
                    },

                    post: function (scope, element, attrs, ctrl) {
                        ctrl.pipe();
                    }
                }
            };
        }]);

})();

// © Siemens AG, 2017
// This file has been modified as per the requirements in the SIMATIC IT App
//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table')
        .directive('stSearch', ['sitConfiguration', '$timeout', '$parse', function (sitConfiguration, $timeout, $parse) {
            return {
                require: '^sitTable',
                link: function (scope, element, attr, ctrl) {
                    var tableCtrl = ctrl;
                    var promise = null;
                    var throttle = attr.stDelay || sitConfiguration.search.delay;
                    var event = attr.stInputEvent || sitConfiguration.search.inputEvent;

                    attr.$observe('stSearch', function (newValue, oldValue) {
                        var input = element[0].value;
                        if (newValue !== oldValue && input) {
                            ctrl.tableState().search = {};
                            tableCtrl.search(input.toString(), newValue);
                        }
                    });

                    //table state -> view
                    scope.$watch(function () {
                        return ctrl.tableState().search;
                    }, function (newValue) {
                        var predicateExpression = attr.stSearch || '$';
                        if (newValue.predicateObject && $parse(predicateExpression)(newValue.predicateObject) !== element[0].value) {
                            element[0].value = $parse(predicateExpression)(newValue.predicateObject) || '';
                        }
                    }, true);

                    function onSearchEvent(evt) {
                        evt = evt.originalEvent || evt;
                        if (promise !== null) {
                            $timeout.cancel(promise);
                        }

                        promise = $timeout(function () {
                            tableCtrl.search(evt.target.value.toString(), attr.stSearch || '');
                            promise = null;
                        }, throttle);
                    }

                    // view -> table state
                    element.bind(event, onSearchEvent);

                    scope.$on('$destroy', function () {
                        element.unbind(event, onSearchEvent);
                    });
                }
            };
        }]);

})();

// © Siemens AG, 2017
// This file has been modified as per the requirements in the SIMATIC IT App

//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table')
        .directive('sitSelectRow', ['sitConfiguration', function (sitConfiguration) {
            return {
                restrict: 'A',
                scope: {
                    row: '=sitSelectRow'
                },
                link: function (scope, element, attr) {
                    var tableCtrl = element.controller('sitTable');
                    var mode;

                    function selectRow() {
                        scope.$apply(function () {
                            tableCtrl.select(scope.row, mode);
                        });
                    }

                    function tableStateCallbak(newValue, oldValue) {
                        if (newValue !== oldValue) {
                            mode = newValue;
                        }
                    }

                    if (tableCtrl) {
                        mode = tableCtrl.tableState().selectionMode || attr.sitSelectMode || sitConfiguration.select.mode;
                        if (mode !== 'none') {
                            element.bind('click', selectRow);
                        }
                        if (scope.row.isSelected) {
                            element.addClass(sitConfiguration.select.selectedClass);
                        }
                        scope.$watch('row.isSelected',function(newValue){
                            if (newValue === true) {
                                element.addClass(sitConfiguration.select.selectedClass);
                            } else {
                                element.removeClass(sitConfiguration.select.selectedClass);
                            }
                        });
                        scope.$watch(function () { return tableCtrl.tableState().selectionMode }, tableStateCallbak);
                    }

                    scope.$on('$destroy', function () {
                        element.unbind('click', selectRow);
                    });
                }
            };
        }]);

})();

(function () {
    "use strict";
    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.table
    * @name sitTableSeparator
    *
    * @restrict AE
    *
    * @description
	* Provides a UI for defining Separator between the buttons.
    *
    * @usage
    * As an attribute:
    * ```
    * <span sit-table-separator></span>
    * ```
    */
    angular.module('siemens.simaticit.common.widgets.table').directive('sitTableSeparator', sitTableSeparator);

    function sitTableSeparator() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="sit-table-separator"><span></span></div>'
        };
    }
})();

// © Siemens AG, 2017
// This file has been modified as per the requirements in the SIMATIC IT App

//Copyright (C) 2016 Laurent Renard.

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
//associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or
//substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.table')
      .directive('stSort', ['sitConfiguration', '$parse', '$timeout', function (sitConfiguration, $parse, $timeout) {
          return {
              restrict: 'A',
              require: '^sitTable',
              link: function (scope, element, attr, ctrl) {

                  var predicate = attr.stSort;
                  var getter = $parse(predicate);
                  var index = 0;
                  var classAscent = attr.stClassAscent || sitConfiguration.sort.ascentClass;
                  var classDescent = attr.stClassDescent || sitConfiguration.sort.descentClass;
                  var stateClasses = [classAscent, classDescent];
                  var sortDefault;
                  var skipNatural = attr.stSkipNatural !== undefined ? attr.stSkipNatural : sitConfiguration.sort.skipNatural;
                  var descendingFirst = attr.stDescendingFirst !== undefined ? attr.stDescendingFirst : sitConfiguration.sort.descendingFirst;
                  var promise = null;
                  var throttle = attr.stDelay || sitConfiguration.sort.delay;

                  if (attr.stSortDefault) {
                      sortDefault = scope.$eval(attr.stSortDefault) !== undefined ? scope.$eval(attr.stSortDefault) : attr.stSortDefault;
                  }

                  //view --> table state
                  function sort() {
                      if (descendingFirst) {
                          index = index === 0 ? 2 : index - 1;
                      } else {
                          index++;
                      }

                      var func;
                      predicate = angular.isFunction(getter(scope)) || angular.isArray(getter(scope)) ? getter(scope) : attr.stSort;
                      //Why do wee need !!skipNatural
                      if (index % 3 === 0 && skipNatural !== true) {
                          //manual reset
                          index = 0;
                          ctrl.tableState().sort = {};
                          ctrl.tableState().pagination.start = 0;
                          func = ctrl.pipe.bind(ctrl);
                      } else {
                          func = ctrl.sortBy.bind(ctrl, predicate, index % 2 === 0);
                      }
                      if (promise !== null) {
                          $timeout.cancel(promise);
                      }
                      if (throttle < 0) {
                          func();
                      } else {
                          promise = $timeout(func, throttle);
                      }
                  }

                  function sortClick() {
                      if (predicate) {
                          scope.$apply(sort);
                      }
                  }

                  element.bind('click', sortClick);

                  if (sortDefault) {
                      index = sortDefault === 'reverse' ? 1 : 0;
                      sort();
                  }

                  //table state --> view
                  scope.$watch(function () {
                      return ctrl.tableState().sort;
                  }, function (newValue) {
                      if (newValue.predicate !== predicate) {
                          index = 0;
                          element
                            .removeClass(classAscent)
                            .removeClass(classDescent);
                      } else {
                          index = newValue.reverse === true ? 2 : 1;
                          element
                            .removeClass(stateClasses[index % 2])
                            .addClass(stateClasses[index - 1]);
                      }
                  }, true);

                  scope.$on('$destroy', function () {
                      element.unbind('click', sortClick);
                  });
              }
          };
      }]);

})();



(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @access internal
    * @module siemens.simaticit.common.widgets.table
    * @name sitTableSortable
    *
    * @restrict A
    *
    * @description
	* Provides sorting functionality for table headers on user interaction.
    *
    * @usage
    * As an attribute:
    * ```
    * <th sit-table-sortable></th>
    * ```
    * * To enable header click sort functionality, the **th** tag should have **sit-field** attribute.
    * @example
    * The configuration to enable header click sort in template is shown below:
    *```
    * <table sit-table="sitTableSort" sit-config="ctrl.config">
    *    <thead>
    *        <tr>
    *            <th sit-field="firstName">First Name</th>
    *            <th sit-field="lastName"> Last Name</th>
    *            <th sit-field="email">Email</th>
    *        </tr>
    *    </thead>
    *    <tbody>
    *        <tr ng-repeat="row in ctrl.config.data">
    *            <td>{{row.firstName}}</td>
    *            <td>{{row.lastName}}</td>
    *            <td>{{row.email}}</td>
    *        </tr>
    *    </tbody>
    *    <tfoot>
    *        <tr sit-table-pager></tr>
    *    </tfoot>
    *</table>
    *```
    */

    angular.module('siemens.simaticit.common.widgets.table')
      .directive('sitTableSortable', sitTableSortableDirective);

    function sitTableSortableDirective() {
        return {
            restrict: 'A',
            require: '^sitTable',
            scope: {},
            link: function (scope, element, attr, ctrl) {
                var sortElements = {};

                function sortClick(event) {
                    var settings = {};
                    var field = $(this).attr('sit-field');
                    angular.copy(ctrl.getSettings(), settings);
                    if (settings.sort.hasOwnProperty('predicate') && settings.sort.predicate === field) {
                        var sortDirection = settings.sort.reverse;
                        settings.sort.reverse = !sortDirection;
                    } else {
                        settings.sort = {
                            predicate: field,
                            reverse: false
                        };
                    }
                    ctrl.applySettings(settings);
                }

                function toggleSortIcon(sort) {
                    var sortPredicate = sortElements[sort.predicate].children('span.colResizer');
                    var headerElement = sortPredicate.length ? sortPredicate[0] : sortElements[sort.predicate];
                    if (!headerElement) {
                        return;
                    }
                    if (sort.reverse === true) {
                        $(headerElement).prepend('<i class="fa fa-caret-down" style="margin:0 5px">');
                    } else {
                        $(headerElement).prepend('<i class="fa fa-caret-up" style="margin:0 5px">');
                    }
                }

                function removeSortIcon() {
                    $(element).children(':not(th.scroll-column-header)').each(function (index, item) {
                        var sortAttribute = $(item).attr('sit-field');
                        if (sortAttribute) {
                            $(item).find('i.fa-caret-up , i.fa-caret-down').remove('i.fa-caret-up , i.fa-caret-down');
                        }
                    });
                }

                function activateWatch() {
                    scope.$watch(function () {
                        return ctrl.tableState().sort;
                    }, function (newValue, oldvalue) {
                        removeSortIcon();
                        if (!sortElements[newValue.predicate]) {
                            return;
                        }
                        toggleSortIcon(newValue);
                    }, true);
                }

                function activate() {
                    if (ctrl.sitConfig.fields) {
                        activateWatch();
                        element.children(':not(th.scroll-column-header)').each(function (index, item) {
                            var sortField = $(item).attr('sit-field');
                            if (sortField && ctrl.sitConfig.fields[sortField] && ctrl.sitConfig.fields[sortField].sorting) {
                                sortElements[sortField] = $(item);
                                $(item).css('cursor', 'pointer');
                                $(item).unbind('click');
                                $(item).bind('click', sortClick);
                            }
                        });
                    }
                }

                activate();

                scope.$on('$destroy', function () {
                    for (var key in sortElements) {
                        sortElements[key].unbind('click', sortClick);
                    }
                });
            }
        }
    }

})();
