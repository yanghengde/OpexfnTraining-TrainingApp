/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.services.filterSort
     *
     * @description
	 * This module provides functionalities related to filter and sort operations (used for tiles and grids).
     */
    angular.module('siemens.simaticit.common.services.filterSort', []);

})();


/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.tiles
 *
 * @description
 * This module provides functionalities related to tile display, tile paging and filtering of one or many tiles.
 */

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.tiles', [
        'siemens.simaticit.common.widgets.pager',   // widget to provide paging for a collection of tiles
        'siemens.simaticit.common.services.filterSort',
        'siemens.simaticit.common.services.tagsManager'
    ]);

})();

(function () {
    'use strict';
    /**
     * @ngdoc type
     * @name ActionTileContent
     * @module siemens.simaticit.common.widgets.tiles
     * @description An object that defines the content, size and style of the **sitAction** tile.
     * @property {String} [bgColor=undefined] _(Optional)_
     * Specifies a custom color to be used as the background color for **non-selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
     *
     * @property {String} [bgColorSelected=undefined] _(Optional)_
     * Specifies a custom color to be used as the background color for **selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example,'red' or '#647887'.
     *
     * @property {String} [color=undefined] _(Optional)_
     * Specifies a custom color to be used as the foreground color (text or image) for **non-selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
     *
     * @property {String} [colorSelected=undefined] _(Optional)_
     * Specifies a custom color to be used as the foreground color (text or image) for **selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
     *
     * @property {String|Number} [count=undefined]
     *
     * The tile displays up to 4 digits of this number.
     * If the number exceeds 4 digits, the number is truncated and an elipsis is shown. (e.g. 123456 is displayed as 1234...)
     
     * @property {String} svgIcon _(Optional)_ Represents the svg icon that has to be displayed in the tile or grid.
      This can be overriden by the icon specified in the tile or grid data.
     
     * @property {String} typeIcon _(Optional)_ Represents the type icon that has to be displayed in the tile or grid.
      This can be overriden by the icon specified in the tile or grid data. SVG icon is given higher priority over type icon.

     * @property {String} image _(Optional)_
     * The name of **Font Awesome** icon to be displayed in the tile.SVG and type icons are given higher priority over font-awesome icon. [Deprecated]
     *
     * @property {Function} OnClickCallback Name of the function to be called when a tile is clicked.
     *
     * @property {String} [size="auto"] _(Optional)_
     * Identifies the tile size to be displayed.
     *
     * Allowed values for **Action** tiles:
     * * **auto**
     * * **wide**
     * * **square**
     * * **square-shortcut**
     * * **square-summary**
     * * **small**
     *
     * @property {Object} [stateTransition=undefined]
     *
     * Identifies a state to route to when a tile is clicked.
     *
     * The object has the following properties that maps to the parameters required for the **$state.go** function:
     * * **to**: the state to transition to
     * * **params**: Object containing Parameters to be sent to Destination
     * * **Options**: Configuration options
     *
     * The property values are passed directly to the function-call to implement the state transition.
     *
     * @property {String} [title=undefined]
     *
     * Default field to specify the text to display as tile-title.
     *
     * @property {String} [titleField=undefined]
     *
     * Specifies the name of the field to be used for the title.
     *
     * If specified, the value of this field is retrieved and is used to be displayed in the tile.
     * It overrides any values set in the **title** property.
     *
     * This titleField poperty also supports field name with dot notation for displaying title of tiles.
     *
     * ```
     *  titleField: 'properties.name',
     * ```
     *
     * @property {Boolean} [useCustomColors=false] _(Optional)_
     * Determines if the system uses the specified custom colors.
     *
     */

    /**
     * @ngdoc directive
     * @module siemens.simaticit.common.widgets.tiles
     * @name sitActionTile
     *
     * @requires  $state
     *
     * @restrict E
     *
     * @description
     * Renders a tile that represents a single action.
     *
     * @param {Object} tileContent For a description of this object see {@link ActionTileContent}
     * @param {Object} tileOptions An object that contains options to extend the {@link ActionTileContent} object settings, without overwriting the existing values.
     *
     * The primary application is to show multiple tiles in a collection.
     * Settings common to all tiles can be gathered into a single object, and the content object can contain data specific to an individual tile.
     *
     * In the pre-link function of the directive, each **tileContent** object is extended with multiple options.
     *
     * For example:
         * ```
         *   var tileOptionExample = {
         *      size: 'large',
         *      titleField: 'properties.name'
         *   }
         * ```
         *
     *
     *
     * @example
     * In a view template, the `sitActionTile` directive is used as follows:
     * ```
     * <sit-action-tile sit-tile-content="ctrl.tileContent"
     *                  sit-tile-options="ctrl.tileOptions">
     * </sit-action-tile>
     * ```
     *   The following example shows how to add properties of **tileContent** object through the **$scope** object to
     *   define data shown in the tile.
     * ```
     *   $scope.tileContent = {
     *      title: 'Material Detail',
     *      size: 'Square',
     *      count: 98567,
     *      svgIcon:'common/icons/indicatorCompleted16.svg',
     *      image:'fa-bus',
     *      stateTransition: { to: 'materialDetail', params: {DefID: '6AV36884EY060AA0'} },
     *      useCustomColors: false
     *   }
     * ```
     *  **Note:** If you are displaying more than one tile and contain options that are common to all,
     *  add properties of **tileOptions** object through the **$scope** object to set the common options as shown in the following example.
     * ```
     *   $scope.tileOptions = {
     *      bgColor: 'yellow',
     *      color: 'black',
     *      useCustomColors: true
     *   }
     * ```
     *
     */
    angular.module('siemens.simaticit.common.widgets.tiles').directive('sitActionTile', ActionTileDirective);

    ActionTileDirective.$inject = ['common.widgets.tiles.tileService'];
    function ActionTileDirective(tileService) {
        return {
            restrict: 'E',
            bindToController: {
                tileContent: '=sitTileContent',
                tileOptions: '=sitTileOptions'
            },
            controller: ActionTileController,
            controllerAs: 'actnTileCtrl',
            scope: {},
            link: function (scope, element, attrs, controller) {
                var actnTileCtrl = controller;
                // sets fore/background colors for the tile
                function setTileColors() {
                    //action tiles do not support selection so verify false before getting custom styles
                    actnTileCtrl.tileContent.selected = false;

                    var colors = tileService.getColors(actnTileCtrl.tileContent);
                    actnTileCtrl.color = colors.color;
                    actnTileCtrl.bgColor = colors.bgColor;
                }
                setTileColors();

                scope.$watch(function () {
                    return actnTileCtrl.tileContent.useCustomColors;
                }, setTileColors);

                function validateSize() {
                    tileService.validateTileSize('action', actnTileCtrl.tileContent.size, true);
                }

                scope.$watch(function () {
                    return actnTileCtrl.tileContent.size;
                }, validateSize);

            },
            templateUrl: 'common/widgets/tiles/action-tile.html'
        };
    }

    ActionTileController.$inject = ['$scope', 'common.widgets.tiles.tileService', '$state'];

    function ActionTileController(scope, tileService, $state) {
        var vm = this;
        var tempObj;

        function init() {
            // ensure valid tile size set
            vm.tileContent.size = tileService.getTileSize('action', vm.tileContent.size, vm.tileContent.containerID);
            vm.getDisplayText = getDisplayText;
            vm.tileClicked = tileClicked;
            vm.getSummaryCountText = getSummaryCountText;
        }

        function activate() {

            // support one options object setting common values for multiple tiles
            if (vm.tileOptions) {
                // double extend to not overwrite existing tileContent properties without creating a new object.
                tempObj = angular.extend({}, vm.tileOptions, vm.tileContent);
                angular.extend(vm.tileContent, tempObj);
            }

            // on initial setup, set default values for any missing properties
            tileService.setTileContentDefaults(vm.tileContent);
            init();
            updateIconSize();
            updateShortcutImage();
        }

        activate();

        /**
         * @ngdoc method
         * @name sitActionTile#getDisplayText
         * @description Retrieves the text to be displayed on the tile (with elipsis).
         */
        function getDisplayText() {
            var actualText = vm.tileContent.titleField ? tileService.getFieldValue(vm.tileContent.titleField, vm.tileContent) : vm.tileContent.title;
            var displayText = '';
            if (vm.tileContent.size === 'wide') {
                displayText = tileService.getDisplayText(actualText, 12, 204, 1);
            } else if (vm.tileContent.size === 'square') {
                displayText = tileService.getDisplayText(actualText, 12, 104, 1);
            } else if (vm.tileContent.size === 'square-shortcut') {
                displayText = tileService.getDisplayText(actualText, 12, 104, 4);
            } else if (vm.tileContent.size === 'square-summary') {
                displayText = tileService.getDisplayText(actualText, 12, 104, 1, false);
            } else {
                displayText = actualText;
            }

            return displayText;
        }


        /**
        * @ngdoc event
        * @name sitActionTile#sit-tile.clicked
        * @eventType emit on sitActionTile
        * @description
        * Emitted when the user clicks on a tile.
        *
        * The parameter passed with the event is the **tileContent** object used to configure the tile.
        * This gives the event handler easy access to the data associated to the clicked tile.
        *
        * If the tile is configured with a **stateTransition**, then the state change
        * occurs without emitting the event.
        *
        * @param {Object} event The event object.
        * @param {Object} tileContent The **tileContent** object used to configure the tile.
        */
        function tileClicked() {
            var st = vm.tileContent.stateTransition;
            if (st !== null) {
                $state.go(st.to, st.params, st.options);
            } else {
                scope.$emit('sit-tile.clicked', vm.tileContent);
                if (vm.tileContent.onClickCallback)
                { vm.tileContent.onClickCallback(vm.tileContent); }
            }
        }

        /**
        *
        */
        function getSummaryCountText() {
            // service func assumes first param is string
            var text = typeof vm.tileContent.count === 'number' ? vm.tileContent.count.toString() : vm.tileContent.count;
            return tileService.getDisplayText(text, 48, 104, 1, false);
        }

        function updateIconSize() {
            if (vm.tileContent.svgIcon) {
                if (vm.tileContent.size === 'small') {
                    vm.tileContent.svgIcon.size = '30px';
                } else {
                    vm.tileContent.svgIcon.size = '64px';
                }
            } else if (vm.tileContent.typeIcon) {
                if (vm.tileContent.size === 'small') {
                    vm.tileContent.typeIcon.size = '30px';
                } else {
                    vm.tileContent.typeIcon.size = '64px';
                }
            }
        }

        function updateShortcutImage() {
            vm.tileContent.shortCutImage = {
                path: "common/icons/cmdRedo24.svg"
            }
        }
    }
})();

/*jshint -W084, -W098  */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @module siemens.simaticit.common.services.filterSort
     * @name common.services.filterSort.service
     *
     * @requires $parse
     * @requires $log
     *
     * @description
     * Provides functionality to support sorting an array of data.
     */
    angular.module('siemens.simaticit.common.services.filterSort').service('common.services.filterSort.service', filterSort);

    filterSort.$inject = ['$parse', '$log'];
    function filterSort($parse, $log) {
        //$parse is angular service to convert expression to a function
        var REGEX_DOT = /\./g;
        var REGEX_NUMBER_STRING = /^[-+]?[£$¤]?[\d,.]+%?$/; //NOSONAR
        var sortService = this;
        sortService.compareFuncCache = {};      // cache compare funcs so we only figure out what works for a field once.
        sortService.isCustomCompare = false;    // flags that user specified a custom compare func

        this.guessCompareFunc = guessCompareFunc;
        this.basicCompare = basicCompare;
        this.compareNumber = compareNumber;
        this.compareAlpha = compareAlpha;
        this.compareDate = compareDate;
        this.compareBool = compareBool;
        this.sortData = sortData;
        this.sort = sort;
        this.getCompareFunc = getCompareFunc;

        // attempt to choose a compare function based on data type
        function guessCompareFunc(data) {
            var dataType = typeof data;
            switch (dataType) {
                case "number":
                    return sortService.compareNumber;
                case "boolean":
                    return sortService.compareBool;
                case "string":
                    return data.match(REGEX_NUMBER_STRING) ? sortService.compareNumberStr : sortService.compareAlpha;
                default:
                    if (Object.prototype.toString.call(data) === '[object Date]') {
                        return sortService.compareDate;
                    }

                        return sortService.basicCompare;

            }
        }

        function basicCompare(a, b) {
            if (a === b) {
                return 0;
            }
            if (a < b) {
                return -1;
            }
            return 1;
        }

        function compareNumber(a, b) {
            return a - b;
        }

        function compareNumberStr(a, b) {
            var numA, numB, badA = false, badB = false;
            numA = parseFloat(a.replace(/[^0-9.-]/g, ''));
            if (isNaN(numA)) {
                badA = true;
            }
            numB = parseFloat(b.replace(/[^0-9.-]/g, ''));
            if (isNaN(numB)) {
                badB = true;
            }
            // push any 'bad' number strings to the end of the list
            if (badA && badB) {
                return 0;
            }
            if (badA) {
                return 1;
            }
            if (badB) {
                return -1;
            }
            return numA - numB;
        }

        function compareAlpha(a, b) {
            var strA = a.toLowerCase(),
                strB = b.toLowerCase();
            if (strA === strB) {
                return 0;
            }
            else if (strA < strB) {
                return -1;
            }

                return 1;

        }

        function compareDate(a, b) {
            var timeA = a.getTime(),
                timeB = b.getTime();
            if (timeA === timeB) {
                return 0;
            }
            else if (timeA < timeB) {
                return -1;
            }

                return 1;

        }

        function compareBool(a, b) {
            if (a && b) {
                return 0;
            }
            if (!a && !b) {
                return 0;
            }
                return a ? 1 : -1;

        }

        // internal method to do the actual sorting
        function sortData(sortInfo, data /*datasource*/) {
            // first make sure we are even supposed to do work
            if (!data || !sortInfo) {
                return;
            }
            var fieldInfo,
                d = data.slice(0);
            //itemA and itemB are the objects we are comparing
            data.sort(function (itemA, itemB) {
                var retVal = 0,     // overall result of compare operation inidicating how to order the two items
                    index = 0,      // index into the sortInfo to support sorting on multiple fields
                    compareResult,  // result of compare func. acture return value may differ due to ordering (asc/desc)
                    compareFunc;
                while (retVal === 0 && index < sortInfo.length) {
                    fieldInfo = sortInfo[index];
                    compareFunc = sortService.getCompareFunc(fieldInfo, d);
                    var propA = $parse('entity[\'' + fieldInfo.field.replace(REGEX_DOT, '\'][\'') + '\']')({ entity: itemA });
                    var propB = $parse('entity[\'' + fieldInfo.field.replace(REGEX_DOT, '\'][\'') + '\']')({ entity: itemB });
                    // if user provides custom sort, we want them to have full control of the sort
                    if (sortService.isCustomCompare) {
                        compareResult = compareFunc(propA, propB);
                        retVal = fieldInfo.direction.toLowerCase() === 'asc' ? compareResult : 0 - compareResult;
                    } else if (propA === null || propB === null) { // we want to allow zero values to be evaluated in the sort function
                        // push bad data to end of list
                        if (propB === null && propA === null) {
                            retVal = 0;
                        }
                        else if (propA === null) {
                            retVal = 1;
                        }
                        else if (propB === null) {
                            retVal = -1;
                        }
                    }
                    else {
                        compareResult = compareFunc(propA, propB);
                        retVal = fieldInfo.direction.toLowerCase() === 'asc' ? compareResult : 0 - compareResult;
                    }
                    index++;
                }
                return retVal;
            });
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common.services.filterSort
         * @name common.services.filterSort.service#sort
         *
         * @description
         * Sorts the specified array according to the instructions provided.
         *
         * The method supports sorting on multiple data fields.
         *
         * @param {Object[]} sortInfo Array of objects that controls the sort operation.
         *
         * Each **sortInfo** object defines a field and direction for sorting.
         * Order determines priority with the first having the highest priority.
         *
         * Each object has the following properties:
         * * **field**: The name of the data field to sort by.
         * * **direction**: 'ASC' or 'DESC' to determine sort direction (not case sensitive).
         * * **compareFunc**: Optional custom function to compare to elements of the data array.
         *   Function should return negative, zero, or positive value.
         *
         * @param {Object[]} data array of items to be sorted.
         */
        function sort(sortInfo, data) {
            if (sortService.isSorting) {
                return;
            }
            sortService.isSorting = true;
            sortService.sortData(sortInfo, data);
            sortService.isSorting = false;
        }

        function getCompareFunc(fieldInfo, data) {
            var compareFunc, item;
            // first check for cached func
            if (sortService.compareFuncCache[fieldInfo.field]) {
                compareFunc = sortService.compareFuncCache[fieldInfo.field];
            }
            else if (fieldInfo.compareFunc !== undefined) {
                compareFunc = fieldInfo.compareFunc;
                sortService.compareFuncCache[fieldInfo.field] = fieldInfo.compareFunc;
                sortService.isCustomCompare = true;
            }
            else { // try and guess what compare function to use
                item = data[0];
                if (!item) {
                    return compareFunc;
                }
                //following regex/parse allows for sorting on property of sub-object. i.e. employee.location.country
                compareFunc = sortService.guessCompareFunc($parse('obj[\'' + fieldInfo.field.replace(REGEX_DOT, '\'][\'') + '\']')({ obj: item }));
                if (compareFunc) {
                    sortService.compareFuncCache[fieldInfo.field] = compareFunc;
                } else {
                    // use the alpha sort by default as this will push null/undefined data to end of list
                    compareFunc = sortService.compareAlpha;
                }
            }
            return compareFunc;
        }

        //return sortService;
    }

    /**
     * Wraps use of the $log service to output diagnostic messages to the console
     * - Prepends a message with the timestamp
     * - Formats message for consistancy. Syntax: `timestamp [function] message`
     * - Can turn on or turn off debug messages with **configuration** param to avoid commenting the debug messages in the code.
     */
    function logWrapper($log, debug) {

        this.log = function (funcName, msg) { if (debug) { $log.log(getMessage(funcName, msg)); } };
        this.info = function (funcName, msg) { $log.info(getMessage(funcName, msg)); };
        this.warn = function (funcName, msg) { $log.warn(getMessage(funcName, msg)); };
        this.error = function (funcName, msg) { $log.error(getMessage(funcName, msg)); };

        function getMessage(funcName, msg) {
            return getTimeString() + ' [' + funcName + '] ' + msg;
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

/*jshint -W098  */
(function () {
    'use strict';
    //#region ng-doc comments
    /**
    * @ngdoc type
    * @name ItemTileContent
    * @module siemens.simaticit.common.widgets.tiles
    * @description An object that defines the content, size and style of the **sitItem** tile.
    * @property {String} [bgColor=undefined] _(Optional)_
    * Specifies a custom color to be used as the background color for **non-selected** tiles.
    *
    * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
    *
    * @property {String} [bgColorSelected=undefined] _(Optional)_
    * Specifies a custom color to be used as the background color for **selected** tiles.
    *
    * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
    *
    * @property {String} [color=undefined] _(Optional)_
    * Specifies a custom color to be used as the foreground color (text or image) for **non-selected** tiles.
    *
    * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
    *
    * @property {String} [colorSelected=undefined] _(Optional)_
    * Specifies a custom color to be used as the foreground color (text or image) for **selected** item tiles.
    *
    * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
    *
    * @property {String} [containerID=undefined]
    *
    * Identifies the ID of a containing element to help to set the tile size automatically.
    *
    * Used only if the tile size is set to **auto**. The dimensions of this element are used when the size of the tiles are to be determined to
    * show a 3x3 grid. If this property is not specified, the size of tiles are determined based on the screen size.
    *
    * @property {String} [contentStatus=undefined]
    *
    * Controls whether or not to show the status icon in the tile.
    *
    * The following values are supported:
    * * **editing**: shows an icon to indicate that the tile content is modified and validated.
    * * **warning**: shows an icon to indicate that the tile content failed validation.
    *
    * **Note:** The tile does not perform any validation. The owner of the tile decides to set this value or not.
    *
    * @property {String} [description=undefined]
    *
    * Contains text to be displayed as the tile description.
    *
    * @property {String} [descriptionField=undefined]
    *
    * Specifies the field name to be used for description in the tile.
    *
    * If specified, the value of this field is retrieved and is used to be displayed in the tile.
    * It overrides any values set in the **description** property.
    *
    * This tile descriptionField also supports **dot** notation.
    * ```
    *  descriptionField: 'myCustomData.description',
    * ```
    *
    * @property {String} svgIcon _(Optional)_
    * The SVG icon to be used as default image for the tiles. Ex - svgIcon:'common/icons/indicatorCompleted16.svg'

    * @property {String} typeIcon _(Optional)_
    * The type icon to be used as default image for the tiles. This is used only if the svgIcon is not provided.

    * @property {String} image _(Optional)_
    * The name of a **Font Awesome** icon to be used as default image for the tiles.[Deprecated]
    *
    * @property {String} [imageTemplate=undefined]
    *
    * *For internal use*.
    *
    * @property {Array<Object>} [properties=undefined]
    *
    * A collection of name-value pairs to be shown as properties.
    * The collection must be an array of objects where each object has a **name** field and a **value** field.
    * They are displayed in the tile as shown below.
    *  ```{name}: {value}```
    *
    * @property {Object[]|String[]} [propertyFields=undefined]
    *
    * Defines the fields to be displayed as properties in a tile.
    *
    * The **propertyFields** array is an alternative to setting the **properties** array for each tile.
    * ```
    *  propertyFields: ['description', 'properties'],
    * ```
    *
    * This propertyFields allows you to list the fields as objects to provide a localized name for the text label.
    * By default, the field name is used. For example:
    * ```
    * propertyFields: [
    *     {    field: 'title', displayName: 'TileTitle' },
    *     {    field: 'description' }
    * ]
    * ```
    * This propertyFields poperty also supports field name with **dot** notation for displaying text of tiles.
    * If the value type is 'date', specify the dataType as 'date' and provide a valid date format needed for formatting the value.
    * For example,
    *
    * ```
    * propertyFields: [
    *     {    field: 'title', displayName: 'TileTitle' },
    *     {    field: 'description', displayName:'Properties' },
    *     {    field: 'date', displayName:'Date of sale', dataType: 'date' , format: 'yyyy-MM-dd' }
    * ]
    * ```
    *
    *
    * @property {Boolean} [selected=false] _(Optional)_
    * When true, the tile is displayed with special style to indicate a selected status.
    * @property {String} [selectStyle="standard"] _(Optional)_
    * Controls the style-type applied when a tile has the **selected** property set to **true**.
    *
    * Allowed values:
    * * **standard**: shows different background and foreground colors without a border.
    *
    * The colors and styles applied to the selected tile depends on multiple factors.
    * * **useCustomColors**: Text colors and background colors changes to the user specified values (if no values are specified, default values are applied).
    * * **bgColorSelected**: User specified background color to be used for the selected tile.
    * * **colorSelected**: User specified text color to use for the selected tile.
    *
    * @property {String} [size="auto"] _(Optional)_
    * Identifies the tile size to be displayed.
    * Allowed values for **Item** tiles
    * * **auto**
    * * **large**
    * * **wide**
    * * **medium**
    *
    * @property {Object} [stateTransition=undefined]
    *
    * Identifies a state to route to when a tile is clicked.
    *
    * The object has the following properties that map to the parameters required for the **$state.go** function.
    * * **to**: the state to transition to
    * * **params**: Object containing Parameters to be sent to Destination
    * * **Options**: Configuration options
    *
    * The property values are passed directly to the function-call to implement the state transition.
    *
    * @property {String} [title=undefined]
    *
    * Default field to specify text to display as tile-title.
    *
    * @property {String} [titleField=undefined]
    *
    * Specifies the name of the field to be used for the title.
    *
    * If specified, the value of this field is retrieved and is used to be displayed in the tile.
    * It overrides any values set in the **title** property.
    *
    * This titleField poperty also supports field name with dot notation for displaying title of tiles.
    *
    * ```
    *  titleField: 'properties.name',
    * ```
    *
    * @property {Boolean} [toggleSelectState="false"] _(Optional)_
    * Determines if the tile toggles its own selected property when clicked.
    *
    * When tiles are shown as a collection, this should be **false**. This allows the owner of the
    * tile collection to manage selected state and support either multiple tile selection or single tile selection or disable tile selection.
    *
    * @property {Boolean} [useCustomColors=false] _(Optional)_
    * Determines if the system uses the specified custom colors.
    *
    */

    /**
     * @ngdoc directive
     * @module siemens.simaticit.common.widgets.tiles
     * @name sitItemTile
     *
     * @requires $log
     * @requires $compile
     * @requires $parse
     *
     * @restrict E
     *
     * @description
     * Renders the content of the data-item as a tile.
     *
     * It shows the title, description, and a collection of properties.
     *
     * If an array of Item tiles are displayed , then it should be wrapped in a container with class 'tile-container' for proper spacing.
     *
     * @param {ItemTileContent} tileContent For a description of this object see {@link ItemTileContent}
     * @param {Object} tileOptions An object that contains options to extend the {@link ItemTileContent} object settings, without overwriting the existing values.
     *
     * The primary application is to show multiple tiles in a collection.
     * Settings common to all tiles can be gathered into a single object, and the content object can contain data specific to an individual tile.
     *
     * In the pre-link function of the directive, each **tileContent** object is extended with multiple options.
     *
     * If a date value is to be displayed in the tile, it should be sent only as a Date object
     * If date is sent as a string it will be displayed without any modification
     *
     * For example:
         * ```
         *   var tileOptionExample = {
         *      desriptionField: 'myDescription',
         *      propertyFields: [
         *          { field: 'data.name', displayName: 'Name' },
         *          { field: 'data.type', displayName: 'Type' }
         *      ],
         *      size: 'large',
         *      titleField: 'my.custom.title.field'
         *   }
         * ```
         *
       * @param {String} tileTemplate A string that contains a custom HTML template, which overrides the contents of the corresponding tile,
       * leaving the dimensions and some of the behaviors unchanged (e.g. selection).
     *
     * **Note:** The data set to tiles can be accessed via the **itemTileCtrl.tileContent** object inside the custom template.
     *
    * For example, if the data set to tiles has a property called **version** , it can be accessed as **itemTileCtrl.tileContent.version**
    *```
    * <div class = 'customTileClass'> <span>{{ itemTileCtrl.tileContent.version }} </span> </div>
    *
    *```
     *
     * @example
     *   In a view template, the `sitItemTile` directive is used to show a single-tile as shown below:
     * ```
     *   <sit-item-tile sit-tile-content="tileContent"
     *                  sit-tile-options="tileOptions">
     *   </sit-item-tile>
     * ```
     *
     *  The following example shows how to add the properties of the **tileContent** object to the **$scope** object to
     *   define the data displayed in the tile as shown below.
     * ```
     *   $controller.tileContent = {
     *      // data properties
     *      DefPK: 22,
     *      DefID: '6AV36884EY060AA0',
     *      DefName: 'Push Button Panel',
     *      Class: 'Component',
     *      Description: 'Push button panel assembly PP3067',
     *      CreatedOn: '2013-11-28 21:06:23.437',
     *      LastUpdate: '2014-05-05 16:08:33.184',
     *      // tile properties
     *      svgIcon: 'common/icons/indicatorCompleted16.svg',
     *      image: 'fa-cogs',
     *      colorSelected:'green',
     *      descriptionField: 'Description'
     *      propertyFields: [
     *          { field: 'CreatedOn', displayName: 'Created' },
     *          { field: 'LastUpdated', displayName: 'Modified' },
     *      ]
     *      titleField: 'DefID',
     *      size: 'large',
     *      useCustomColors:'white',
     *      selectStyle:'useCustomColors',
     *      stateTransition: { to: 'materialDetail', params: {DefID: '6AV36884EY060AA0'} },
     *      tileContainerClass:'tileCustomClass',
     *      useCustomColors: false
     *
     *   }
     * ```
     *  **Note:** If you have more than one tile to be displayed which contain options that are common to all,
     *  add the **tileOptions** object to the **$scope** to set the common options as shown below:
     * ```
     *   $scope.tileOptions = {
     *      size: 'large',
     *      titleField: 'DefID',
     *   }
     * ```
     *
     */
    //#endregion

    angular.module('siemens.simaticit.common.widgets.tiles').directive('sitItemTile', ItemTileDirective);

    ItemTileDirective.$inject = ['common.widgets.tiles.tileService', '$log', '$compile', '$parse', '$state'];
    function ItemTileDirective(tileService, $log, $compile, $parse, $state) {
        return {
            restrict: 'E',
            bindToController: {
                tileContent: '=sitTileContent',
                tileOptions: '=?sitTileOptions',
                tileTemplate: '=?sitTileTemplate',
                sitFormat: '=?sitFormat'
            },
            templateUrl: 'common/widgets/tiles/item-tile.html',
            controller: ItemTileController,
            controllerAs: 'itemTileCtrl',
            scope: {},
            compile: function () {
                return {
                    post: postLink
                };
            }
        };

        function postLink(scope, iElement, iAttrs, controller) {

            scope.$watch(function () {
                return controller.tileContent.selected;
            }, controller.setTileColors);

            scope.$watch(function () {
                return controller.tileContent.useCustomColors;
            }, controller.setTileColors);

            function validateSize() {
                tileService.validateTileSize('item', controller.tileContent.size, true);
            }

            scope.$watch(function () {
                return controller.tileContent.size;
            }, validateSize);

            controller.element = iElement;
        }
    }

    ItemTileController.$inject = ['$scope', 'common.widgets.tiles.tileService', '$state', '$filter', '$sanitize',
        '$compile', '$timeout', '$element', 'common.services.tagsManager.tagsManagementService'];

    function ItemTileController(scope, tileService, $state, $filter, $sanitize, $compile, $timeout, $element, tagsManagementService) {
        var vm = this;
        var titleRowCount,
            displayPropCount,
            tagContainerElement,
            noOfProperties,
            TAG_CONTAINER_HEIGHT,
            TILE_LOAD_TIME,
            PROPERTIES_COUNT_TWO = 2,
            PROPERTIES_COUNT_THREE = 3,
            PROPERTIES_COUNT_FOUR = 4;
        var i;
        activate();

        function activate() {
            vm._commands = [];
            vm._indicators = [];
            vm.isCell = false;
            init();
            formatDate(vm.tileContent);
            // support one options object setting common values for multiple tiles
            if (vm.tileOptions) {
                vm.isCell = vm.tileOptions.isCell;
                // double extend to not overwrite existing tileContent properties without creating a new object.
                var tempObj = angular.extend({}, vm.tileOptions, vm.tileContent);
                angular.extend(vm.tileContent, tempObj);

                vm.tag = vm.tileOptions.tagField;
                vm.isTagShown = _.isArray(vm.tileContent[vm.tag])
                    && vm.tileContent[vm.tag].length > 0
                    && (vm.tileContent.size === 'wide' || vm.tileContent.size === 'large' || vm.tileContent.size === 'medium');
                TAG_CONTAINER_HEIGHT = vm.tileContent.size === 'large' ? 52 : 28;
                if (vm.tileContent.size === 'large') {
                    if (vm.tileContent.svgIcon) {
                        vm.tileContent.svgIcon.size = '48px';
                    } else if (vm.tileContent.typeIcon) {
                        vm.tileContent.typeIcon.size = '48px';
                    }
                } else {
                    TAG_CONTAINER_HEIGHT = 28;
                    if (vm.tileContent.svgIcon) {
                        vm.tileContent.svgIcon.size = '32px';
                    } else if (vm.tileContent.typeIcon) {
                        vm.tileContent.typeIcon.size = '32px';
                    }
                }

                vm.isTagShown && setTagDropdownVisibility();

                configureCommands();
                configureIndicators();
            }

            if (vm.isTagShown) {
                tagsManagementService.getTagsStyle(vm.tileContent[vm.tag]);
            }

            // on initial setup, set default values for any missing properties
            tileService.setTileContentDefaults(vm.tileContent, 'item');

            //init();
            // ensure valid tile size set
            vm.tileContent.size = tileService.getTileSize('item', vm.tileContent.size, vm.tileContent.containerID);

            vm.template = vm.tileContent.size;
            vm.tempalteUrl = vm.tileContent.size + '-tile-item.html';
            if (vm.tileTemplate) {
                vm.customTemplate = vm.tileTemplate;
                vm.tempalteUrl = 'custom-tile-item.html';
            }

            if (vm.tileContent.propertyFields) {
                createDisplayProperties(vm.tileContent.propertyFields);
            } else if (vm.tileContent.properties) {
                createDisplayProperties(vm.tileContent.properties);
            } else {
                noOfProperties = 0;
            }

            vm.displayDescription = getDisplayText('description', 0);

            vm.displayTitle = getDisplayText('title', 0);


            vm.showFirstProp = vm.displayProp1 ? true : false;
            // for wide item tile, force description to one line if any properties set.
            if (vm.tileContent.size === 'wide') {
                vm.descriptionClass = vm.displayProp1 ? 'wide-item-description-single' : 'wide-item-description';
            } else if (vm.tileContent.size === 'medium') {
                vm.descriptionClass = vm.showFirstProp ? 'medium-item-text' : 'medium-item-text-double';
            }
            var description = vm.tileContent.descriptionField ? tileService.getFieldValue(vm.tileContent.descriptionField, vm.tileContent) : vm.tileContent.description;
            vm.descriptionTooltip = vm.displayProp1 ? description : '';
            vm.setTileColors();
        }

        function createDisplayProperties(propertiesConfig) {
            noOfProperties = propertiesConfig.length;
            if (!vm.tileTemplate) {
                if (vm.tileContent.size === 'wide' || vm.tileContent.size === 'medium') {
                    if (vm.tileOptions && vm.tileOptions.isCell) {
                        noOfProperties = (noOfProperties <= PROPERTIES_COUNT_FOUR) ? noOfProperties : PROPERTIES_COUNT_FOUR;
                    } else {
                        noOfProperties = vm.tileContent.size === 'wide' ? PROPERTIES_COUNT_THREE : PROPERTIES_COUNT_TWO;
                    }
                } else {
                    noOfProperties = 4;
                }
            }

            for (i = 0; i < propertiesConfig.length && vm.displayProperties.length < noOfProperties; i++) {
                vm['displayProp' + (i + 1)] = setPropertyDisplayText(i);
                if (vm['displayProp' + (i + 1)] && vm['displayProp' + (i + 1)].isVisible) {
                    vm.displayProperties.push(vm['displayProp' + (i + 1)]);
                }
            }

        }

        function getVisibility(obj, defaultValue) {
            var isVisible = defaultValue;
            if (typeof obj.visible === 'function') {
                isVisible = obj.visible(vm.tileContent);
            } else if (typeof obj.visible === 'boolean') {
                isVisible = obj.visible;
            } else if (typeof obj.visible === 'string') {
                var funcationParam = 'tileContent';
                var functioBody = ["return", obj.visible].join(' ');
                isVisible = new Function(funcationParam, functioBody)(vm.tileContent); //NOSONAR
            }
            return isVisible;
        }

        function eachCommand(command) {
            command.isVisible = true;
            // setting the PL Icon and default icon
            if (!command.img && !command.cmdIcon) {
                command.img = 'fa-share-square-o';
            } else if (command.cmdIcon && typeof (command.cmdIcon) === 'string') {
                command.cmdIcon = {
                    prefix: 'cmd',
                    name: command.cmdIcon,
                    suffix: '24'
                };
            }
            command.isVisible = getVisibility(command, true);
            if (command.isVisible) {
                vm._commands.push(command);
            }
        }

        function eachIndicator(indicator) {
            if (typeof (indicator.svgIcon) === 'string') {
                indicator.svgIcon = {
                    path: indicator.svgIcon,
                    size: '16px'
                }

            }
            indicator.isVisible = getVisibility(indicator, false);
            if (indicator.isVisible) {
                vm._indicators.push(indicator);
            }
        }

        function configureCommands() {
            vm.commands = angular.copy(vm.tileOptions.commands || []);
            vm.commands.forEach(eachCommand);
        }

        function configureIndicators() {
            vm.indicators = angular.copy(vm.tileOptions.indicators || []);
            vm.indicators.forEach(eachIndicator);
        }

        function formatDate(tileData) {
            if (vm.sitFormat === undefined || vm.sitFormat === '') {
                vm.sitFormat = "mediumDate";
            }

            for (var key in tileData) {
                if (tileData[key] instanceof Date && typeof tileData[key] !== 'string') {
                    tileData[key] = $filter('date')(tileData[key], vm.sitFormat);
                }
            }
        }

        function init() {
            displayPropCount = 0;
            titleRowCount = 1;
            TILE_LOAD_TIME = 100;

            vm.tag = '';
            vm.isTagShown = false;
            vm.showTagExpandIcon = false;
            vm.isTagContainerExpanded = false;
            vm.displayProperties = [];
            vm.setTileColors = setTileColors;
            //to control show/hide of selecting check
            vm.showSelectCheck = showSelectCheck;
            vm.formatDate = formatDate;
            vm.templateLoaded = templateLoaded;
            vm.toggleTagContainer = toggleTagContainer;
            vm.commandCallback = commandCallback;
            vm.getPropertiesDivHeight = getPropertiesDivHeight;
            vm.svgIcons = {};
            initSvgIcons();
        }

        function getPropertiesDivHeight() {
            var className, propertiesCount;
            propertiesCount = displayPropCount < noOfProperties ? displayPropCount : noOfProperties;
            switch (propertiesCount) {
                case 1:
                    className = 'x1';
                    break;
                case 2:
                    className = 'x2';
                    break;
                case 3:
                    className = 'x3';
                    break;
                case 4:
                    className = 'x4';
                    break;
                default:
                    className = '';
            }
            return className;
        }

        function initSvgIcons() {
            vm.svgIcons.svgUp = {
                path: "common/icons/miscUpArrow16.svg"
            };

            vm.svgIcons.svgDown = {
                path: "common/icons/miscDownArrow16.svg"
            }

            vm.svgIcons.warning = {
                path: "common/icons/indicatorContainsChange16.svg",
                size: '16'
            }

            vm.svgIcons.certificate = {
                path: "common/icons/cmddomain16.svg",
                size: '16'
            }
        }

        function templateLoaded() {
            //The below two line are necessary to maintain the spacing issues caused by inline-block elements. Backward compatibity needed to be maintained so this hack is needed.
            var loadedDom = vm.element.find('div.item-tile-wrapper').children();
            vm.element.append(loadedDom);
            if (vm.customTemplate) {
                vm.element.find('div[data-internal-type=custom-template-container]').append($compile(vm.customTemplate)(scope));
            }
        }

        function getDisplayText(textType, index) {
            var displayText = '';
            var actualText;
            if (textType === 'description') {
                actualText = vm.tileContent.descriptionField ? tileService.getFieldValue(vm.tileContent.descriptionField, vm.tileContent) : vm.tileContent.description;
                displayText = actualText;
                if (vm.tileContent.size === 'large') {
                    // max 3 rows for large
                    displayText = tileService.getDisplayText(actualText, 13, 215, 3);
                } else {
                    // limit description to one line if any properties to show
                    var propertiesExist = (vm.tileContent.propertyFields && vm.tileContent.propertyFields.length > 0) || (vm.tileContent.properties &&
                        vm.tileContent.properties.length > 0);
                    var descriptionRows;
                    if (vm.tileContent.size === 'wide' || vm.tileContent.size === 'medium') {
                        descriptionRows = propertiesExist ? 2 : 1;
                        displayText = tileService.getDisplayText(actualText, 12, 160, descriptionRows);
                    }
                }
            } else if (textType === 'title') {
                actualText = vm.tileContent.titleField ? tileService.getFieldValue(vm.tileContent.titleField, vm.tileContent) : vm.tileContent.title;
                if (vm.tileContent.size === 'large') {
                    vm.displayTooltip = actualText;
                    displayText = tileService.getDisplayText(actualText, 15, 116, 4, true);
                } else if (vm.tileContent.size === 'wide' || vm.tileContent.size === 'medium') {
                    vm.displayTooltip = actualText;
                    displayText = tileService.getDisplayText(actualText, 14.4, 160, titleRowCount, true);
                } else {
                    displayText = actualText;
                }
            } else if (textType === 'property') {
                // supporty user configuration to not show properties
                if (vm.tileContent.propertyFields && vm.tileContent.propertyFields.length === 0) {
                    displayText = '';
                } else {
                    // service func takes object of form {name: '', value: ''}
                    // properties array contents expected to be in this form, but if configured field used instead, need to build the property
                    var property = vm.tileContent.properties && vm.tileContent.properties[index] ? vm.tileContent.properties[index] : null;
                    if (vm.tileContent.propertyFields) {
                        var propField = vm.tileContent.propertyFields[index];
                        if (propField) {
                            // configured fields can be just list of field names, or objects of form {field: '', displayName: ''} to allow for localization
                            if (propField.constructor !== Object) {
                                property = {
                                    name: propField, value: tileService.getFieldValue(propField, vm.tileContent)
                                };
                            } else {
                                var propertyInfo =  _.findWhere(vm.tileContent.propertyFields, { displayName: propField.displayName });
                                property = {
                                    name: propField.displayName ? propField.displayName : propField.field, value:
                                        tileService.getFieldValue(propField.field, vm.tileContent, propertyInfo)
                                };
                            }
                        }
                        else {
                            property = null;
                        }
                    }
                    if (vm.tileContent.size === 'large') {
                        displayText = tileService.getPropertyDisplayText(property, 13, 232, 1);
                    } else if (vm.tileContent.size === 'wide') {
                        displayText = tileService.getPropertyDisplayText(property, 12, 176, 1);
                    } else if (vm.tileContent.size === 'medium') {
                        displayText = tileService.getPropertyDisplayText(property, 11, 188, 1);
                    } else {
                        displayText = property.value;
                    }
                }
                if (displayText.length > 0) {
                    displayPropCount++;
                }
            }
            return displayText;
        }

        // handle property text separate so can support filters
        function setPropertyDisplayText(index) {
            var property;
            var propRegEx;

            // user may set configuration to not show properties. (empty property fields array). do nothing in this case
            if (!(vm.tileContent.propertyFields && vm.tileContent.propertyFields.length === 0)) {

                // properties and proertyFields arrays have different format
                // properties already has objects in the form we want {name: '', value: '', filter: ''}
                // propertyFields may be a list of field names or objects. both need massaging to what we need.
                // propertyFields has priority if set
                property = vm.tileContent.properties && vm.tileContent.properties[index] ? vm.tileContent.properties[index] : null;
                if (vm.tileContent.propertyFields) {
                    var propField = vm.tileContent.propertyFields[index];
                    if (propField) {
                        // check for field names or objects of form {field: '', displayName: '', filter: ''}
                        if (propField.constructor !== Object) {
                            property = {
                                name: propField,
                                value: tileService.getFieldValue(propField, vm.tileContent),
                                isVisible: getVisibility(propField, true)
                                // no filter possible with this format
                            };
                        } else {
                            var propertyInfo = _.findWhere(vm.tileContent.propertyFields, { displayName: propField.displayName });
                            property = {
                                name: propField.displayName ? propField.displayName : propField.field,
                                value: tileService.getFieldValue(propField.field, vm.tileContent, propertyInfo),
                                filter: propField.filter,
                                isVisible: getVisibility(propField, true)
                            };
                        }
                    }
                    else {
                        property = null;
                    }
                } else if (property) {
                    property.isVisible = true;
                }

            }

            function escapeChars(s) {

                if (!s || typeof s !== "string") {
                    return s;
                }
                return $sanitize(s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/(['\\{}])/g, "\\$1"));
            }

            if (property) {
                property.name += ": ";
                if (property.value !== false && property.value !== 0 && !property.value) {
                    property.value = '';
                }
                propRegEx = new RegExp("PROP" + (index + 1) + "_VALUE", "g");
                if (vm.customTemplate) {
                    vm.customTemplate = vm.customTemplate.replace(propRegEx, "'" + escapeChars(property.value) + "'" + (property.filter ? " | " +
                        escapeChars(property.filter) : ""));
                } else {
                    if (property.filter) {
                        property.sanitizedVal = $filter(property.filter)(property.value);
                    } else {
                        property.sanitizedVal = property.value;
                    }
                }
                displayPropCount++;
            }
            return property;
        }

        function setTagDropdownVisibility() {
            $timeout(function () {
                tagContainerElement = $element.find('div[data-internal-type=tag-text-container]');
                tagContainerElement.length > 0 && tagContainerElement[0].scrollHeight > TAG_CONTAINER_HEIGHT && (vm.showTagExpandIcon = true);
            }, TILE_LOAD_TIME);
        }

        // coloring
        function setTileColors() {
            var colors = tileService.getColors(vm.tileContent);
            vm.color = colors.color;
            vm.bgColor = colors.bgColor;
            vm.selectClass = colors.selectClass;
        }

        function showSelectCheck() {
            return vm.tileContent.selected && vm.tileContent.selectStyle === 'standard';
        }

        function toggleTagContainer() {
            vm.isTagContainerExpanded = !vm.isTagContainerExpanded;
        }
        //#region
        /**
        * @ngdoc event
        * @name sitItemTile#sit-tile.clicked
        * @eventType emit on sitItemTile
        * @description
        * Emitted when the user clicks on a tile.
        *
        * The parameter passed with the event is the **tileContent** object used to configure the tile.
        * This gives the event handler easy access to the data associated to the clicked tile.
        *
        * If the tile is configured with a **stateTransition**, then the state change
        * occurs without emitting the event.
        *
        * @param {Object} event The event object.
        * @param {Object} tileContent The **tileContent** object used to configure the tile.
        */
        //#endregion
        vm.tileClicked = function () {
            var st = vm.tileContent.stateTransition;
            if (st !== null) {
                $state.go(st.to, st.params, st.options);
            } else {
                if (vm.tileContent.toggleSelectState) {
                    vm.tileContent.selected = !vm.tileContent.selected;
                }

                scope.$emit('sit-tile.clicked', vm.tileContent);
                if (vm.tileContent.onClickCallback) {
                    vm.tileContent.onClickCallback(vm.tileContent);
                }
            }
        };

        function commandCallback(event, command) {
            event.stopPropagation();
            command.onClick(vm.tileContent);
        }

        var tileContentDetails = {
            bgColor: '',                    // background color
            bgColorSelected: '',            // background color when tile is selected
            color: '',                      // fore color (text)
            colorSelected: '',              // fore color when tile is selected
            containerID: '',                // id of fixed size containter to help auto-select tile size. not required
            contentStatus: 'warning',       // a value of 'edititng' or 'warning' will show indicator icons
            count: '',                      // max 4 digits to show a count of something in action-tile only
            description: 'A bike race',     // text to display
            descriptionField: '',           // specify any field to use for description. overrides description.
            image: 'fa-beer',               // image to display. must be font awesome icon.
            imageTemplate: '',              // for internal use.
            properties: [                   // array of objects with name and value fields. may be displayed depending on tile type
                {
                    name: 'length', value: '298km'
                },
                {
                    name: 'country', value: 'Italy'
                }
            ],
            //propertyFields: [              // alternative to using properties. specify name of fields to use. supports dot notation.
            //    'data.type',
            //    'stateTransition.to'       // propertyFields supports 2 formats: [string, string, ...] and [object, object, ...]
            //],
            propertyFields: [                // the object format lets you set localized name for a label. the string format uses field name.
                {
                    field: 'data.type', displayName: 'dataType'
                },
                {
                    field: 'stateTransition.to', displayName: 'state'
                }
            ],
            selected: false,                 // set true to have a tile initially selected
            selectStyle: 'standard',         // 'standard' is default. shows border and check in upper right
            // 'alternate' changes back/fore color but there are no defaults so you must use custom colors to use alternate.
            size: 'auto',                    // for item tiles use: large, wide, medium.
            stateTransition: null,           // state to transition to when tile clicked
            title: 'Milan-San Remo',         // text to display. typically name or id. all tiles show title.
            titleField: 'title',             // specify any field to use for title. overrides title.
            toggleSelectState: false,        // set true to have tile toggle its own selected property. (want false for collection so owner manages multi/single selection)
            useCustomColors: false          // must be true to turn on use of custom colors
        };
        //#region ng-doc comments
        /**
         * @ngdoc object
         * @module siemens.simaticit.common.widgets.tiles
         * @name tileOptionExample
         * @access internal
         * @description
         * This is an example object to be used for the **tileOptions** attribute of the
         * {@link siemens.simaticit.common.widgets.tiles.sitActionTile} and
         * {@link siemens.simaticit.common.widgets.tiles.sitItemTile} directives.
         *
         * The **tileOptions** object can contain the same fields as the **tileContent** object. It is used to extend the data of the **tileContent** object
         * without overwriting the existing values. The primary application is to show multiple tiles in a collection.
         * Settings common to all tiles can be gathered into a single object. The content object can contain data specific to
         * an individual tile. In the pre-link function of the directive, each **tileContent** object is extended with multiple options.
         *
         * Values specfied in the **tileOptions** object do not overwrite values set in the **tileContent** object.
         * They only extend the **tileContent** object by adding the missing settings.
         *
         * For full description of all the options, see {@link siemens.simaticit.common.widgets.tiles.tileContentDetails}.
         *
         * @example
         * ```
         *   var tileOptionExample = {
         *      desriptionField: 'myDescription',
         *      propertyFields: [
         *          { field: 'data.name', displayName: 'Name' },
         *          { field: 'data.type', displayName: 'Type' }
         *      ],
         *      size: 'large',
         *      titleField: 'my.custom.title.field'
         *   }
         * ```
         *
         */
        //#endregion
        var tileOptionExample = {
            desriptionField: 'myDescription',
            propertyFields: [
                {
                    field: 'data.name', displayName: 'Name'
                },
                {
                    field: 'data.type', displayName: 'Type'
                }
            ],
            size: 'large',
            titleField: 'my.custom.title.field'
        };
    }
})();

(function () {
    'use strict';

    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.tiles
    * @name sitLastTile
    * @access internal
    * @description
    * _(Internal)_ Triggers an event when the last repeated tile is post-linked.
    * This is used to measure performance and hide the "**Loading...**" message.
    *
    * @usage
    * This directive should be used only by {@link siemens.simaticit.common.widgets.tiles.sitTileView}.
    */
    angular.module('siemens.simaticit.common.widgets.tiles').directive('sitLastTile', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope) {
                if (scope.$last) {
                    $timeout(function () {
                        scope.$emit('sitLastTileLinked');
                    });
                }
            }
        };
    }]);
})();

(function () {
    'use strict';

    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.tiles
    * @name sitTileGroup
    *
    * @description
    * _(Internal)_ Shows a group of related tiles.
    * It is shown in {@link siemens.simaticit.common.widgets.tiles.sitTileView} when the data is grouped.
    * It includes a header to expand or to collapse the group.
    *
    * @usage
    * This directive should be used only by {@link siemens.simaticit.common.widgets.tiles.sitTileView}.
    */
    angular.module('siemens.simaticit.common.widgets.tiles').directive('sitTileGroup', function () {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                group: '=sitGroup',
                groupsLength: '@sitGroupsLength',
                groupExpanding: '&sitGroupExpanding',
                tileOptions: '=sitTileOptions',
                multiSelect: '=sitMultiSelect', // none, single, multi
                selectionMode: '=sitSelectionMode',
                sitFormat: '=?sitFormat'
            },
            templateUrl: 'common/widgets/tiles/tile-group.html',
            controller: TileGroupController,
            controllerAs: 'tileGrpCtrl'
        };
    });

    TileGroupController.$inject = ['$scope', '$timeout'];
    function TileGroupController($scope, $timeout) {
        var vm = this;
        activate();

        function activate() {
            vm.groupSelected = false;

            // set selectionMode based on multiSelect if not set.
            if (!vm.selectionMode) {
                vm.selectionMode = vm.multiSelect ? 'multi' : 'single';
            }
            if (vm.selectionMode === 'none') {
                vm.group.tiles.forEach(function (tile) {
                    tile.selected = false;
                });
            }
            // TO select group checkbox
            if (vm.group.tiles.length > 0) {
                for (var i = 0; i < vm.group.tiles.length; i++) {
                    var allChecked = true;
                    if (!vm.group.tiles[i].selected) {
                        allChecked = false;
                        break;
                    }
                }
                vm.groupSelected = allChecked;
            }
            exposeApi();
        }

        function exposeApi() {
            vm.toggleGroup = toggleGroup;
            vm.selectGroup = selectGroup;
        }

        // handle user toggling the expansion state of a group
        function toggleGroup() {
            if (!vm.group.expanded) {
                vm.groupExpanding({
                    groupCount: vm.group.childCount()
                });
            }

            // delay this with timeout so "Loading..." message can display
            $timeout(function () { vm.group.toggleExpand(); }, 0);
        }

        function selectGroup() {
            angular.forEach(vm.group.tiles, function (tile) {
                tile.selected = vm.groupSelected;
            });
            $scope.$emit('sit-group-selected', vm.group.tiles);
        }
    }
})();

(function () {
    'use strict';
    /**
   * @ngdoc directive
   * @access internal
   * @name sitTileHeight
   * @module siemens.simaticit.common.widgets.tiles
   * @description
   * tile height directive is used to unify the height of all sibling tiles.
   *
   * @usage
   * As an attribute:
   * ```
   *  <div data-internal-type="wideItemTile" class="tile" ng-click="itemTileCtrl.tileClicked()" sit-tile-height="true" >
   * ```
   * @restrict A
   *
   */
    function TileHeightDirective($timeout) {
        return {
            restrict: 'A',
            link: link
        };
        function link(scope, element) {

            var setHeight = $timeout(function () {
                var currentElement = element;
                var elems = $(element).parents().eq(1).find('div.tile');
                for (var i = 0; i < elems.length; i++) {
                    if ($(currentElement).height() > $(elems[i]).height()) {
                        $(elems[i]).height($(currentElement).height());
                        $(elems[i]).children().height($(currentElement).height());
                    }
                }
            });
            scope.$on('$destroy', function () {
                $timeout.cancel(setHeight);
            });

        }
    }
    angular.module('siemens.simaticit.common.widgets.tiles').directive('sitTileHeight', ['$timeout', TileHeightDirective]);
})();

/*jshint -W084, -W089, -W098 */
(function () {
    'use strict';
    var app = angular.module('siemens.simaticit.common.widgets.tiles');

    /**
     * @ngdoc service
     * @module siemens.simaticit.common.widgets.tiles
     * @name common.widgets.tiles.tileService
     * @access internal
     * @requires $parse
     *
     * @description
     * Provides functionalities to support configuring, displaying and filtering tile or tiles.
     */
    app.factory('common.widgets.tiles.tileService', ['$parse', '$filter', function ($parse, $filter) {
        return new TileManager($parse, $filter);
    }]);

    //#region PrivateVariable
    // define the supported tile sizes
    var largeTile = { size: 'large', width: 248, height: 248 };
    var wideTile = { size: 'wide', width: 248, height: 120 };
    var squareTile = { size: 'square', width: 120, height: 120 };
    var squareShortcutTile = { size: 'square-shortcut', width: 120, height: 120 };
    var squareSummaryTile = { size: 'square-summary', width: 120, height: 120 };
    var mediumTile = { size: 'medium', width: 56, height: 120 };
    var smallTile = { size: 'small', width: 56, height: 56 };

    var validTileTypes = ['action', 'item', 'notification', 'summary'];
    // define the list of valid sizes per tile type
    var validActionTiles = [wideTile, squareTile, squareShortcutTile, squareSummaryTile, smallTile];
    var validItemTiles = [largeTile, wideTile, mediumTile];
    var validNotificationTiles = [largeTile, wideTile];
    var validSummaryTiles = [squareTile];
    //#endregion

    function TileManager($parse, $filter) {
        this.parse = $parse;
        this.filter = $filter;

        /**
         * @ngdoc object
         * @module siemens.simaticit.common.widgets.tiles
         * @name tileContentDefaults
         * @access internal
         * @description
         * Default values for **tileContent** attribute of {@link siemens.simaticit.common.widgets.tiles.sitActionTile}
         * and {@link siemens.simaticit.common.widgets.tiles.sitItemTile} directives.
         *
         * ```
         *  tileContentDefaults = {
         *      selected: false,
         *      selectStyle: 'standard',
         *      size: 'auto',
         *      stateTransition: null,
         *      title: '',
         *      toggleSelectState: false,
         *      useCustomColors: false
         *  }
         * ```
         *
         */
        this.tileContentDefaults = {
            selected: false,
            selectStyle: 'alternate',
            size: 'auto',
            stateTransition: null,
            title: '',
            toggleSelectState: false,
            useCustomColors: false
        };

        /**
         * @ngdoc object
         * @name tileViewOptionDefaults
         * @module siemens.simaticit.common.widgets.tiles
         * @access internal
         * @description Default values for **options** attribute of {@link siemens.simaticit.common.widgets.tiles.sitTileView} directive.
         *
         * ```
         * tileViewOptionDefaults = {
         *      enablePaging: true,
         *      multiSelect: true,
         *      pagingOptions: {
         *          pageSizes: [10, 25, 50, 100, 250],
         *          pageSize: 10,
         *          currentPage: 1
         *      },
         *      quickSearchOptions: {
         *          enabled: false,
         *          field: '',
         *          filterText: ''
         *      },
         *      selectStyle: 'standard',
         *      sortInfo: {
         *          field: '',
         *          direction: ''
         *      },
         *      tileSize: 'wide',
         *      tileType: 'item',
         *      useCustomColors: false
         * }
         * ```
         *
         * For full description of all options, see {@link TileViewOptions}.
         */
        this.tileViewOptionDefaults = {
            enablePaging: true,
            multiSelect: true,
            pagingOptions: {
                pageSizes: [10, 25, 50, 100, 250],
                pageSize: 10,
                currentPage: 1
            },
            quickSearchOptions: {
                enabled: false,
                field: '',
                filterText: ''
            },
            selectStyle: 'alternate',
            sortInfo: { field: '', direction: '' },
            tileSize: 'wide',
            tileType: 'item',
            useCustomColors: false,

            debug: false,
            enableResponsiveBehaviour: false
        };
    }

    TileManager.prototype = {

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#setTileContentDefaults
         * @description
         * Sets default values for all properties in the **tileContent** object.
         * @access internal
         * @param {Object} content Object that contains properties.
         * @param {String} [type] _(Optional)_ Tile type.
         */
        setTileContentDefaults: function (content, type) {

            //first get new object containing all specified properties plus default values of those not specified
            var contentWithDefaults = $.extend({}, this.tileContentDefaults, content);
            contentWithDefaults.type = type;

            //then update the original
            $.extend(content, contentWithDefaults);

        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#validateTileSize
         * @access internal
         * @description
         * This function validates whether the specified tile size is supported by the specified **tileType**.
         * An **Error** object is thrown if the size is invalid.
         *
         * @param {String} tileType The type of tile to be validated.
         * @param {String} size The size of tile to be validated.
         * @param {Boolean} throwError Indicates whether the function should throw an **Error** object or not if the validation fails.
         *
         * @returns {Boolean} The function returns a value if the **throwError** parameter is set to **false**.
         * The return value is set **true** if the validation succeeds, and **false** otherwise.
         */
        validateTileSize: function (tileType, size, throwError) {
            var validTiles = this.getValidTileSizes(tileType);
            var valid = false;
            var i, tile;
            for (i = 0; validTiles[i]; i++) {
                tile = validTiles[i];
                if (tile.size === size) {
                    valid = true;
                    break;
                }
            }

            if (!valid && throwError) {
                throw new Error('Invalid size [' + size + '] specified for tile type [' + tileType + ']. Allowed values: ' + this.getValidTileSizeNames(tileType).toString());
            }
            return valid;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#validateTileType
         * @access internal
         * @description
         * This functions validates whether the specified tile type is supported or not.
         * An **Error** object is thrown if the type is invalid.
         *
         * @param {String} tileType The type of tile to be validated.
         * @param {Boolean} throwError Indicates whether the function should throw an **Error** object if the validation fails.
         *
         * @returns {Boolean} The function returns a value if the **throwError** parameter is set to **false**.
         * The return value is set **true** if validation succeeds, and **false** otherwise.
         */
        validateTileType: function (tileType, throwError) {
            var valid = validTileTypes.indexOf(tileType) !== -1;
            if (!valid && throwError) {
                throw new Error('Invalid tile type [' + tileType + '] specified. Allowed values: ' + validTileTypes.toString());
            }
            return valid;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getValidTileSizeNames
         * @access internal
         * @description
         * This function gets the list of tile sizes that are valid for the specified type.
         *
         * @param {String} tileType Specifies the types of tiles, for which valid size must be retrieved.
         *
         * @returns {String[]} An array of strings that represents valid sizes.
         */
        getValidTileSizeNames: function (tileType) {
            var validSizes = [];
            var validTiles = this.getValidTileSizes(tileType);
            if (validTiles !== undefined) {
                var i, tile;
                for (i = 0; validTiles[i]; i++) {
                    tile = validTiles[i];
                    validSizes.push(tile.size);
                }
            }
            return validSizes;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getValidTileSizes
         * @access internal
         * @description
         * Gets a list of objects that represents valid tile sizes for the specified tile type.
         * The objects contain dimensional information in addition to the size name.
         *
         * @param {String} tileType Specifies the types of tiles, for which valid sizes must be retrieved.
         *
         * @returns {Object[]} An array of objects with the following structure:
         * <code>
         * {
         *   size: 'wide',
         *   width: 248,
         *   height: 120
         * }
         * </code>
         */
        getValidTileSizes: function (tileType) {
            if (tileType === 'action')
            { return validActionTiles; }
            else if (tileType === 'item')
            { return validItemTiles; }
            else if (tileType === 'notification')
            { return validNotificationTiles; }
            else if (tileType === 'summary')
            { return validSummaryTiles; }
            return undefined;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getTileSize
         * @access internal
         * @description
         * Gets a valid tile size for the specified parameters.
         *
         * If the **tileSize** argument is set to **auto**, the function chooses the
         * **tileSize** based on other arguments.
         * It attempts to choose the largest size which makes it possible to show
         * the specified minimun number of rows and columns in the available space.
         *
         * First it checks the available space by considering the dimensions of the specified container element.
         * If the dimensions are not specified or cannot be found, the decision is made based on screen size.
         *
         * If **tileSize** is not **auto**, the function validates the specified size.
         *
         * The function validates both the **tileSize** and **tileType** arguments. If validation fails, an **Error** object is thrown.
         *
         * @returns {String} The name of a **tileSize**.
         */
        getTileSize: function (tileType, tileSize, containerID, minRows, minCols) {
            // always validate type
            this.validateTileType(tileType, true);

            // if valid size specified, just return it
            if (tileSize !== 'auto' && this.validateTileSize(tileType, tileSize, true)) {
                return tileSize;
            }
            // else size must be 'auto' so find best fit

            // if min rows/cols not set, default to 1. assume this is for showing single tile rather than collection
            if (!minRows) {
                minRows = minCols = 1;
            }

            var margin = 2;
            var containerW, containerH, size, i, minW, minH, tile, mediaSize;
            var validTiles = this.getValidTileSizes(tileType);
            if (validTiles.length === 1) {
                size = validTiles[0].size;
            } else {

                size = validTiles[validTiles.length - 1].size; // default to smallest(last in the list)

                var c = containerID ? $('#' + containerID) : [];
                if (c.length > 0) {
                    // if we have a specified container, use its dimensions
                    containerW = c.width();
                    containerH = c.height();
                    for (i = 0; validTiles[i]; i++) {
                        tile = validTiles[i];
                        minW = getMultiTileDimension(tile.width, minCols, margin);
                        minH = getMultiTileDimension(tile.height, minRows, margin);
                        if (containerW > minW && containerH > minH) {
                            size = tile.size;
                            break;
                        }
                    }
                } else {
                    // if no container, check against screen size
                    mediaSize = getMediaSize();
                    if (mediaSize === 'large') {
                        // use the largest tile size
                        size = validTiles[0].size;
                    }
                    else {
                        // just use the next size down. we know we have more than one at this point
                        size = validTiles[1].size;
                    }
                }
            }

            return size;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#selectionSupported
         * @access internal
         * @description
         * Gets a value that indicates if the specified tile type supports the selection state.
         *
         * @returns {Boolean} **true** if the tile type supports selection, otherwise **false**.
         */
        selectionSupported: function (tileType) {
            return tileType === 'item';
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getColors
         * @access internal
         * @description
         * Gets an object that defines foreground colors and background colors to use for a tile based on the configured settings and current selection state.
         *
         * @returns {Object} An object that contains the following properties:
         * - color: defines the custom color to be used for text
         * - bgColor: defines the custom color to be used for the background.
         *
         * @private
         */
        getColors: function (tileContent) {
            var retVal = { selectClass: '' };
            if (tileContent.selected) {
                retVal.color = tileContent.useCustomColors && tileContent.colorSelected ? tileContent.colorSelected : '';
                retVal.bgColor = tileContent.useCustomColors && tileContent.bgColorSelected ? tileContent.bgColorSelected : '';
                if (!tileContent.useCustomColors || !retVal.color && !retVal.bgColor) {
                    if (tileContent.size === 'wide')
                    { retVal.selectClass = 'wide-item-alt-selected'; }
                    else if (tileContent.size === 'large')
                    { retVal.selectClass = 'large-item-alt-selected'; }
                    else if (tileContent.size === 'medium')
                    { retVal.selectClass = 'medium-item-alt-selected'; }
                }
            } else {
                retVal.color = tileContent.useCustomColors && tileContent.color ? tileContent.color : '';
                retVal.bgColor = tileContent.useCustomColors && tileContent.bgColor ? tileContent.bgColor : '';
            }
            return retVal;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#applyCustomColors
         * @access internal
         * @description
         * <p>  Applies the same custom color options to all tiles in the collection.
         * </p>
         * <p>  The options to be applied are taken from the configuration object (if specified).
         *      If the configuration contains no color settings or has the flag `<strong>useCustomColors</strong>`
         *      set to **false**, the tiles do not show custom colors.
         * </p>
         * <p>  If no configuration is specified, a search is performed in the tile collection
         *      for the first tile with custom colors specified for the usage. If the first tile is found,
         *      these settings are used as the template for all other tiles.
         * </p>
         *
         * @param {Array} tiles The collection of tiles to be updated.
         * @param {Object} config An object that contains the custom colors.
         */
        applyCustomColors: function (tiles, config) {
            if (!tiles)
            { return; }

            var i, tile;
            if (!config) {
                for (i = 0; tiles[i]; tiles++) {
                    tile = tiles[i];
                    if (tile.useCustomColors && (tile.color || tile.colorSelected || tile.bgColor || tile.bgColorSelected)) {
                        config = tile;
                        break;
                    }
                }
            }

            if (config) {
                if (config.useCustomColors) {
                    angular.forEach(tiles, function (tile) {
                        tile.color = config.color;
                        tile.colorSelected = config.colorSelected;
                        tile.bgColor = config.bgColor;
                        tile.bgColorSelected = config.bgColorSelected;
                        tile.useCustomColors = true;
                    });
                } else {
                    angular.forEach(tiles, function (tile) {
                        tile.useCustomColors = false;
                    });
                }
            }
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#updateTileData
         * @access internal
         * @description
         * Forces all members of the tile collection to have the same values for properties
         * defined in the options object.
         *
         */
        updateTileData: function (tiles, options) {
            angular.forEach(tiles, function (tile) {
                //ignore the hasOwnProperty check. assume options is simple object
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        tile[key] = options[key];
                    }
                }
            });
        },


        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getDisplayText
         * @access internal
         * @description
         * Gets text that can be displayed completely within the specified area.
         * If determined that the text does not fit, the text is truncated and an ellipsis (...) is added to the end.
         *
         * @param {string} text The text to evaluate.
         * @param {Number} fontSizePX The font size (in pixels).
         * @param {Number} displayWidthPX The width (in pixels) of client area of the element that contains the text.
         * @param {Number} rows The number of rows of text that are displayed.
         * @param {Boolean} bold A flag that indicates whether the text should be displayed in bold or not.
         *
         * @returns {String} The text to be displayed.
         *
         * @private
         */
        getDisplayText: function (text, fontSizePX, displayWidthPX, rows, bold) {
            var displayText = '';
            if (text !== undefined && text !== null) {
                displayText = text;
                // precise determination of when text will overflow is not a trivial calculation.
                // For a simple solution we will use a conservative estimate of average characters per pixel height of the font.
                var charsPerFontHeight = bold ? 1.9 : 2.2;
                var totalPixelWidth = displayWidthPX * rows;
                var avgCharPixelWidth = fontSizePX / charsPerFontHeight;
                var allowedChars = totalPixelWidth / avgCharPixelWidth;

                if (text.length > allowedChars) {
                    displayText = text.substr(0, allowedChars - 2) + '...';
                }
            }
            return displayText;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getTextRowEstimate
         * @access internal
         * @description
         * Attempts to estimate the number of rows that would be required to show
         * the complete text.
         *
         * @param {string} text The text to evaluate.
         * @param {Number} fontSizePX The font size (in pixels).
         * @param {Number} displayWidthPX The width (in pixels) of client area of the element containing the text.
         * @param {Boolean} bold A flag that indicates whether the text should be displayed in bold or not.
         *
         * @returns {Number} The number of rows required to show the complete text.
         *
         * @private
         */
        getTextRowEstimate: function (text, fontSizePX, displayWidthPX, bold) {
            var charsPerFontHeight = bold ? 1.9 : 2.2;
            var totalChars = text.length;
            var avgCharPixelWidth = fontSizePX / charsPerFontHeight;
            var rows = totalChars * avgCharPixelWidth / displayWidthPX;
            return rows;
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getPropertyDisplayText
         * @access internal
         * @description
         * Gets text that can be displayed completely within the specified area.
         * If determined that the text does not fit, the text is truncated and an ellipsis (...) is added to the end.
         *
         * @param {Object} property An object that contains the '**name**' and '**value**' keys that are combined to show as displayed text.
         * @param {Number} fontSizePX The font size (in pixels).
         * @param {Number} displayWidthPX The width (in pixels) of client area of the element that contains the text.
         * @param {Number} rows The number of rows of text that may be displayed.
         *
         * @returns {String} The text to be displayed.
         *
         * @private
         */
        getPropertyDisplayText: function (property, fontSizePX, displayWidthPX, rows) {
            if (!property) {
                return "";
            }

            var text = property.name + ': ' + property.value;
            return this.getDisplayText(text, fontSizePX, displayWidthPX, rows);
        },

        /* functions that apply to the tile view*/

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#setViewOptionDefaults
         * @access internal
         * @description
         */
        setViewOptionDefaults: function (options) {
            //update the original object to allow watches to work
            var optionsWithDefaults = $.extend({}, this.tileViewOptionDefaults, options);
            $.extend(options, optionsWithDefaults);
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#setDisplayFields
         * @access internal
         * @description
         * Updates the **options** object to make sure fields are set for display title, description, and properties.
         *
         */
        setDisplayFields: function (options, dataItem) {
            if (dataItem === undefined) {
                return;
            }
            var dataProps = Object.keys(dataItem);
            var dataProp, propType;
            var propIndex = 0;

            function getNextPrimitiveProperty(skip1, skip2) {
                while (dataProps[propIndex++]) {
                    dataProp = dataProps[propIndex++];
                    propType = typeof dataItem[dataProp];
                    if ((propType === 'string' || propType === 'number' || propType === 'boolean') && (!skip1 || skip1 !== dataProp) && (!skip2 || skip2 !== dataProp)) {
                        return dataProp;
                    }
                }
                return null;
            }

            // identify one field as the title field. Priority: configured field -> pre-existing 'title' field -> first field
            if (!options.titleField) {
                if (dataItem.hasOwnProperty('title')) {
                    // no title field configured, and the data object has a 'title' property, then use it
                    options.titleField = 'title';
                } else if (dataProps.length > 0) {
                    // just use the first primitive property (other than 'description') on the object (if it has one)
                    options.titleField = getNextPrimitiveProperty('description');
                }
            }

            // identify one field as the description field. Priority: configured field -> pre-existing 'description' field -> second field
            if (!options.descriptionField) {
                if (dataItem.hasOwnProperty('description')) {
                    options.descriptionField = 'description';
                } else if (dataProps.length > 1) {
                    // just use the next primitive property on the object (if it has one)
                    options.descriptionField = getNextPrimitiveProperty(options.titleField);
                }
            }

            // if no property fields configured, identify up to 4 data properties to use as tile properties
            if (!options.propertyFields) {
                options.propertyFields = [];
                for (var i = 0; i < 4; i++) {
                    var prop = getNextPrimitiveProperty(options.titleField, options.descriptionField);
                    if (prop)
                    { options.propertyFields.push(prop); }
                    else
                    { break; }
                }
            }
        },

        /**
         * @ngdoc method
         * @name common.widgets.tiles.tileService#getFieldValue
         * @access internal
         * @description
         * Extracts the value of a specific field from the specified object.
         *
         * @param {String} field Property from which the data must be retrieved.
         * <p>Supports **dot** notation and you can specify a value such as '**data.type**'.</p>
         * @param {Object} obj The object that contains the field.
         * @param {Object} info The object that contains the information about the property field.
         *
         * @returns {Object} The value of the field.
         */
        getFieldValue: function (field, obj, info) {
            var evalFunc = this.parse(field);
            var value = evalFunc(obj);
            var isDate = new Date(value);
            return (isDate instanceof Date && !isNaN(isDate) && info && info.dataType && info.format) ? this.filter(info.dataType)(new Date(value), info.format) : value;
        }
    };

    /**************************************************************************
     * private helper methods and static data
     */
    var staticTileContentDefaults = {
        selected: false,
        selectStyle: 'alternate',
        size: 'auto',
        stateTransition: null,
        title: '',
        toggleSelectState: false,
        useCustomColors: false
    };


    /*
     * @private
     * This function gets a value that indicates the size of the viewport.
     *
     * @returns {string} The function returns one of 3 possible values:
     * * large, when screen width is greater than 1200px
     * * medium, when screen width is greater than 500 but less than or equal to 1200
     * * small, when screen width is less than or equal to 500
     */
    function getMediaSize() {
        var w = $(window).width();
        if (w > 1200) {
            return 'large';
        }
        else if (w > 500) {
            return 'medium';
        }
        return 'small';
    }

    /*
     * @private
     * This function gets an overall dimension for multiple tiles seperated by a margin.
     *
     * @returns {number} The function returns the total width or height of multiple tiles separated by a specified margin.
     */
    function getMultiTileDimension(tileSize, tileCount, margin) {
        return (tileSize + margin) * tileCount;
    }

    /*
     * summary of useful info about tiles
     *
     * size    dimensions  action item notification summary
     * ------------------------------------------------------
     *  large   248x248     no     yes  yes          no
     *  wide    248x120     yes    yes  yes          no
     *  square  120x120     yes    no   no           yes
     *  medium  56x120      no     yes  no           no
     *  small   56x56       yes    no   no           no
     * -----------------------------------------------------
     * raise click event    yes    yes  yes          yes
     * selectable           no     yes  no           no
     */
})();

/*jshint -W084, -W098 */
(function () {
    'use strict';

    /**
	 * Represents a group of tiles.  Can be a 'dummy' group if there is no 'groupBy' property specified.
	 */
    function TileGroup(name, isDummy, data) {
        this.name = name;
        this.isDummy = isDummy === undefined ? false : isDummy;
        this.expanded = false;
        this.rowheight = 30;
        this.tiles = data ? data : [];
    }

    TileGroup.prototype = {
        childCount: function () {
            return this.tiles.length;
        },
        arrowClass: function () {
            return 'tile-group-arrow ' + (this.expanded ? 'fa fa-chevron-down' : 'fa fa-chevron-right');
        },
        toggleExpand: function () {
            this.expanded = !this.expanded;
        },
        updateData: function (data) {
            this.tiles = data;
        }
    };

    /**
     * @ngdoc type
     * @name TileViewOptions
     * @module siemens.simaticit.common.widgets.tiles
     * @description An object containing the configuration details supported by the **options** parameter of the {@link siemens.simaticit.common.widgets.tiles.sitTileView} directive.
     * @property {Boolean} [alwaysShowPager=false] _(Optional)_
     * Specifies if the pager is always shown.
     *
     * Default behavior hides the pager if the number of data items to show is less than the page size.
     *
     * @property {Boolean} [useCustomColors="false"] _(Optional)_
     * Determines if the system uses the specified custom colors.
     *
     * @property {String} [bgColor=undefined] _(Optional)_
     * Specifies a custom color to be used as the background color for **non-selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
     *
     * @property {String} [bgColorSelected=undefined] _(Optional)_
     * Specifies a custom color to be used as the background color for **selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example,'red' or '#647887'.
     *
     * @property {String} [color=undefined] _(Optional)_
     * Specifies a custom color to be used as the foreground color (text or image) for **non-selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
     *
     * @property {String} [colorSelected=undefined] _(Optional)_
     * Specifies a custom color to be used as the foreground color (text or image) for **selected** item tiles.
     *
     * The value is applied directly to the CSS property. For example, 'red' or '#647887'.
     *
     * @property {String} [containerID=undefined]
     *
     * Identifies the ID of the containing element to resize the widget.
     *
     * If the element has a fixed height, the height of the tile view is adjusted to fit the available space.
     *
     * The size of the containing element is also used if the tile size is set to **auto**.
     * An attempt is made to choose a tile size that allows a 3x3 grid to be shown.
     *
     * @property {String | Function} [uniqueID=undefined] _(Optional)_
     * The tile selection persist on any tile-data manipulation.
     *
     * The property accepts **String** or **Function** type value.
     * * Type **String**:  The property is passed with a field name. The value of the field name must be constant and unchangable.
     * ```
     *  uniqueID: 'Id',
     * ```
     * * Type **Function**: The property is passed with a function. The function accepts two arguments and the object comparision logic on two arguments is written inside the function. The function must return a boolean value as a result of the comparision.
     * ```
     * uniqueID: function (currentItem, selectedItem) {
     *           if (currentItem.Name === selectedItem.Name) {
     *               return true;
     *               }
     *           return false;
     *          }
     * ```
     *
     * @property {String} [descriptionField=undefined]
     *
     * Specifies the field name to be used as a description in the tile.
     *
     * If specified, the value of this field is retrieved and is displayed in the tile.
     * It overrides any values set in the **description** property.
     *
     * The tile descriptions also support **dot** notation.
     * ```
     *  descriptionField: 'myCustomData.description',
     * ```
     *
     * @property {Boolean} [enablePaging=true] _(Optional)_
     * Determines if the pager is shown.
     *
     * @property {String} [groupBy=undefined]
     *
     * Field name to be used to group the tiles.
     *
     * The **sitTileView** widget responds dynamically to changes in this value.
     *
     * @property {String} svgIcon _(Optional)_
     * SVG icon to be used as the default image for the tiles. Ex: svgIcon: 'common/icons/cmdOpen24.svg'

     * @property {String} typeIcon _(Optional)_
     * Type icon to be used as the default image for the tiles. This has a lower priority over SVG icon.

     * @property {String} image _(Optional)_
     * The name of a **Font Awesome** icon to be used as the default image for the tiles. This has a lower priority over svgIcon and typeIcon.
     *
     * These values are used only if the image property has not been set for the tile.
     * It does not override values that are set directly in the tile content.
     *
     * @property {Boolean} [multiSelect=true] _(Optional)_
     * Determines if multiple tiles can be selected or not.
     *
     * The widget responds dynamically to the changes in this value to allow changes in the selection mode.
     *
     * @property {Object} pagingOptions _(Optional)_ Contains the options to configure the pager.
     * The object contains the following properties.
     * * **type** : Defines the type of pagination.It can be either 'simple' or  'standard' or 'extended'. If the type is not mentioned, then by default 'extended' is considered.
     * * **pageSize** : The number of items to display per page. It can be one of the following values : 10,25,50 or 100.
     * ```
     * {
     *     pageSize: 10,
     *     type: 'standard'
     * }
     * ```
     *
     * @property {Object[]|String[]} [propertyFields=undefined]
     *
     * Defines the fields to be displayed as properties in a tile.
     *
     * The **propertyFields** array is an alternative to setting the **properties** array for each tile.
     * ```
     *  propertyFields: ['description', 'properties'],
     * ```
     *
     * This propertyFields allows you to list the fields as objects to provide a localized name for the text label.
     * By default, the field name is used. For example:
     * ```
     * propertyFields: [
     *     {    field: 'title', displayName: 'TileTitle' },
     *     {    field: 'description' }
     * ]
     * ```
     * This propertyFields property also supports field names with **dot** notation for displaying text in tiles.
     *
     * ```
     * propertyFields: [
     *     {    field: 'title', displayName: 'TileTitle' },
     *     {    field: 'description', displayName:'Properties' }
     * ]
     * ```
     *
     * @property {Object} quickSearchOptions
     *
     * Defines the options for handling the **Quick Search** feature.
     *
     * This featue is primarily used by the {@link siemens.simaticit.common.widgets.itemCollectionViewer}.
     * It has a UI for the user to enter text in a quick search box. As the value changes, the item
     * collection is filtered using a **begins with** match on the specified data field.
     * The {@link siemens.simaticit.common.widgets.tiles.sitTileView} supports this behavior, but provides
     * no UI for the user to enter data.
     *
     *
     * @property {String} [selectStyle="standard"] _(Optional)_
     * Controls the style-type applied when a tile has the **selected** property set to **true**.
     *
     * Allowed values:
     * * **standard**: shows different background and foreground colors without a border.
     *
     * The colors and styles applied to the selected tile depend on multiple factors.
     * * **useCustomColors**: Text colors and background colors change according to user specified values (if no values are specified, default values are applied).
     * * **bgColorSelected**: User specified background color to be used for the selected tile.
     * * **colorSelected**: User specified text color to be used for the selected tile.
     *
     * @property {Object} [serverDataOptions=undefined] Contains settings that define the presentation service and data entity to be used as a data source.
     *
     * The object has the following format;
     * * **dataService**: A presentation service object, such as **engineeringData**.
     * * **dataEntity**: The name of the entity to be retrieved using the service.
     * * **optionsString**: **oData** query options.
     * * **appName**: The name of the App where the entity is defined.
     *
     * ```
     *     {
     *         dataService: engineeringData,
     *         dataEntity: 'CommandDefinition',
     *         optionsString: '',
     *         appName: 'myApp'
     *     }
     * ```
     *
     * @property {Object} [sortInfo=undefined]
     * Defines the field and direction for sorting.
     *
     * The object has the following format:
     *
     * * **field**: The name of the field to sort by.
     * * **direction**: Must be **asc** or **desc** case insensitive.
     * ```
     *      {
     *          field: 'title',
     *          direction: 'desc'
     *      }
     * ```
     *
     * @property {String} [tagField=undefined] Displays Data Segregation tags of the given field.
     * This property is supported in **wide** and **large** item tiles only.
     *
     * @property {String} [tileSize="auto"]
     *
     * Identifies the tile size to be displayed.
     *
     * Allowed values for **Item** tiles:
     * * **auto**
     * * **large**
     * * **wide**
     * * **medium**
     *
     * Allowed values for **Action** tiles:
     * * **auto**
     * * **wide**
     * * **square**
     * * **square-shortcut**
     * * **square-summary**
     * * **small**
     *
     * @property {String} [tileType='item']
     * Specifies the type of tile to be displayed. Possible values are **item** or **action**.
     *
     * @property {String} [titleField=undefined]
     *
     * Specifies the name of the field to be used for the title.
     *
     * If specified, the value of this field is retrieved and is displayed in the tile.
     * It overrides any values set in the **title** property.
     *
     * This titleField property also supports field names with dot notation for displaying titles in tiles.
     *
     * ```
     *  titleField: 'properties.name',
     * ```
     * @property {Boolean} [enableResponsiveBehaviour=false] _(Optional)_
     * Determines if the widget is responsive for different device resolution. If set to true the tiles will rearrange
     * from large to wide and then to medium for item tiles, and from wide to square and then to small in action tiles
     * based on decreasing the device resolution.
     *
     * @property {Number} [viewHeight=undefined]
     * Specifies a fixed height to be used for the widget.
     *
     * If specified, the value overrides the default value and sets the height through the **containerID** option.
     *
     *  @property {String} [tileContainerClass = undefined] _(Optional)_ Applies the defined custom class's style to the tile.
   	 */

    /**
     * @ngdoc directive
     * @module siemens.simaticit.common.widgets.tiles
     * @name sitTileView
     *
     * @requires $log
     * @requires $timeout
     * @requires $state
     * @requires common.services.logger.service
     *
     * @restrict E
     *
     * @description
     * Displays the collection of tiles.
     *
     * @usage
     * As an element:
     * ```
     * <sit-tile-view sit-tiles="viewDataArray"
     *                sit-options="viewOptionsObject">
     * </sit-tile-view>
     * ```
     *
     * The directive displays the tiles with an '**inline-block**' style. The tiles will be automatically wrapped based on the width of the container
     * and will be displayed from left to right.
     *
     * **Note:** The `sitTileView` directive is used internally by the {@link siemens.simaticit.common.widgets.itemCollectionViewer.sitItemCollectionViewer} directive.
     * In most cases you should use the **ItemCollectionViewer** as it allows a UI to
     * perform actions such as changing the tile size, sorting and grouping.
     *
     * @param {Array<Object>} tiles An array of objects that contains the content of tiles that are to be displayed.  Each object must have the format of
     * a {@link ActionTileContent} or {@link ItemTileContent} object.
	 * <br><br>
	 * If **serverDataOptions** are specified in the **options** parameter, then data is retrieved
	 * from a server. Any data items assigned to this property will be ignored.
     *
     * @param {Object} options For a full description of this object see {@link TileViewOptions}.
     *
     * @example
     * In a view template, the `sit-tile-view` directive is used as follows:
     * ```
     * <sit-tile-view sit-tiles="tilesCtrl.tilesConfig.tiles"
     *                sit-options="tilesCtrl.tilesConfig.options">
     * </sit-tile-view>
     * ```
     * The following example shows how to configure custom style:
     * ```
     * <style>
     *    .lightStyle{
     *        background-color: pink;
     *    }
     * </style>
     * ```
     * The following example shows how to configure a sit-tile-view widget in the controller:
     * ```
     * (function () {
     *     'use strict';
     *     var app = angular.module('siemens.simaticit.app');
     *     app.controller('TilesController', ['$scope', '$timeout', 'common.widgets.tiles.tileService', function ($scope, $timeout, tileService) {
     *         var vm = this;
     *             vm.tilesConfig = {
     *             uniqueID: 'title',
     *             tiles: [
     *                 {
     *                     title: 'Orders',
     *                     description: 'Currently open orders',
     *                     count: '32',
     *                     svgIcon:"common/icons/cmdRefresh24.svg", 
     *                     image: 'fa-cogs',
     *                     properties: {
     *                         name: 'Next Due', value: 'Mar. 8'
     *                     },
     *                     access: [{Name: 'Operator'}, {Name: 'Plant Moderator'}, {Name: 'Plant Administrator'}, {Name: 'Assembler'}]
     *                 },
     * 	            {
     * 	                title: 'Reports',
     * 	                description: 'Production reports',
     * 	                count: '6',
     * 	                image: 'fa-bar-chart',
     * 	                properties: {
     * 	                    name: 'Running', value: '4'
     * 	                },
     *                  access: [{Name: 'Investor'}, {Name: 'Plant Administrator'}, {Name: 'Quality Manager'}, {Name: 'Plant Moderator'}]
     * 	            },
     * 	            {
     * 	                title: 'Operators',
     * 	                description: 'All operators',
     * 	                count: '128',
     * 	                image: 'fa-user',
     * 	                properties: {
     * 	                    name: 'Productivity', value: 'High'
     * 	                },
     *                  access: [{Name: 'Plant Administrator'}, {Name: 'Plant Moderator'}, {Name: 'Operator'}, {Name: 'Technician'}, {Name: 'Mechanic'}]
     *
     * 	            },
     * 	            {
     * 	                title: 'Warnings',
     * 	                description: 'Warnings from all facilities',
     * 	                count: '34',
     * 	                image: 'fa-warning',
     * 	                properties: {
     * 	                    name: 'Severe', value: '3'
     * 	                },
     *                  access: [{Name: 'Technician'}, {Name: 'Mechanic'}, {Name: 'Maintainance Admin'}, {Name: 'Operator'}]
     * 	            },
     *             ],
     *             options: {
     *                 containerID: "test-container",
     *                 bgColor: 'orange',
     *                 bgColorSelected: 'blue',
     *                 color: 'black',
     *                 colorSelected: '#647887',
     *                 alwaysShowPager: true,
     *                 useCustomColors: true,
     *                 tileType: 'item',
     *                 tileSize: 'square-shortcut',
     *                 enablePaging: true,
     *                 svgIcon:"common/icons/cmdRefresh24.svg",
     *                 image: 'fa-car',
     *                 multiSelect: false,
     *                 enableResponsiveBehaviour: true,
     *                 pagingOptions: {
     *                     pageSizes: [5, 10, 25, 100, 250, 500],
     *                     pageSize: 5,
     *                     currentPage: 1
     *                 },
     *                 titleField: 'properties.name',
     *                 descriptionField: 'count',
     *                 groupBy: 'title',
     *                 sortInfo: {
     *                     field: 'title',
     *                     direction: 'desc'
     *                 },
     *                 tagField: 'access',
     *                 tileContainerClass: 'lightStyle',
     *                 viewHeight: 500,
     *                 useCustomColors:'white',
     *                 selectStyle:'useCustomColors',
     *                 propertyFields: [
     *                     {
     *                         field: 'title', displayName: 'TileTitle'
     *                     },
     *                     {
     *                         field: 'properties.name', displayName: 'Name'
     *                     }
     *                 ]
     *             }
     *         };
     *     }]);
     * })();
     * ```

     */
    angular.module('siemens.simaticit.common.widgets.tiles').directive('sitTileView', TileViewDirective);

    TileViewDirective.$inject = ['common.services.logger.service', '$window'];
    function TileViewDirective(logger, $window) {
        return {
            scope: {},
            restrict: 'E',
            link: linkFn,
            templateUrl: 'common/widgets/tiles/tile-view.html',
            bindToController: {
                tiles: '=sitTiles',
                options: '=sitOptions',
                sitFormat: '=?sitFormat'
            },
            controller: TileViewController,
            controllerAs: 'tileViewCtrl'
        };

        function linkFn(scope, element, attrs, ctrl) {
            logger.log('sitTiles link func', 'begin');

            var sorting = false;        // to avoid resetting tiles on data change when we have only sorted the data
            var sitGridDataWatchHandler = null;
            // watches

            scope.$watch(function () {
                return ctrl.options.tileSize;
            }, tileSizeChangeCallback);

            function tileSizeChangeCallback(newVal, oldVal) {
                if (newVal !== oldVal) {
                    ctrl.updateTileCommonData(true, false);
                    ctrl.updateTileOptions();
                    ctrl.resetView();
                }
            }

            scope.$watch(function () {
                return ctrl.options.groupBy;
            }, groupByChangeCallback);

            function groupByChangeCallback(newVal, oldVal) {
                if (newVal !== oldVal) {
                    ctrl.isGroupedBy = true;
                    ctrl.grouping = ctrl.options.groupBy ? true: false;
                    if (newVal.length === 0) {
                        ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
                    }
                    ctrl.totalServerItemsLoadedCount = 0;
                    logger.log('groupBy has changed to: ' + ctrl.options.groupBy);
                    ctrl.createGroups();
                }
            }

            scope.$watch(function () {
                return ctrl.options.multiSelect;
            }, multiSelectChangeCallback);

            function multiSelectChangeCallback() {
                if (ctrl.options && ctrl.options.multiSelect && ctrl.selectedItems) {
                    logger.log('multiSelect: ' + ctrl.options.multiSelect + ', selected item count: ' + ctrl.selectedItems.length);
                }
                ctrl.selectionMode = ctrl.options.multiSelect ? 'multi' : 'single';
                ctrl.selectionModeChanged();
            }

            scope.$watch(function () {
                return ctrl.options.sortInfo;
            }, sortInfoChangeCallback);

            function sortInfoChangeCallback(newVal, oldVal) {
                if (newVal.field !== oldVal.field || newVal.direction !== oldVal.direction) {
                    sorting = true;
                    logger.log('sortInfo changed. field: ' + ctrl.options.sortInfo.field + ', direction: ' + ctrl.options.sortInfo.direction);
                    ctrl.getPageManager().setCurrentPage(1);
                    ctrl.getPageManager().setSortInfo(newVal.field, newVal.direction);
                    ctrl.isSorted = true;
                    ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
                    ctrl.totalServerItemsLoadedCount = 0;
                    ctrl.createGroups().then(
                        function () {
                            if (ctrl.options.onSortingChangedCallback) {
                                ctrl.options.onSortingChangedCallback(newVal);
                            }
                        });
                }
            }
            scope.$watch(function () {
                return ctrl.options.quickSearchOptions.filterText;
            }, filterTextChangeCallback);

            function filterTextChangeCallback(newVal, oldVal) {
                if (newVal !== oldVal) {
                    logger.log('search text changed. value: ' + ctrl.options.quickSearchOptions.filterText);
                    ctrl.isQuickSearched = true;
                    ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
                    ctrl.totalServerItemsLoadedCount = 0;
                    ctrl.getPageManager().setCurrentPage(1);
                    ctrl.getPageManager().setSearchText(newVal);
                    ctrl.createGroups();
                }
            }
            scope.$watch(function () {
                return ctrl.options.useCustomColors;
            }, customColorsChangeCallback);

            function customColorsChangeCallback(newVal, oldVal) {
                if (newVal !== oldVal) {
                    logger.log('useCustomColors: ' + ctrl.options.useCustomColors);
                    ctrl.updateTileCommonData(true, false);
                    ctrl.resetView();
                }
            }


            function onTilesChange(newVal, oldVal) {
                // this is a watch on local data, so do nothing of current pageManager is set for server data
                var nv = newVal ? newVal.length : 0;
                var ov = oldVal ? oldVal.length : 0;
                logger.log('watchCollection on tiles', 'counts: (new, old): (' + nv + ', ' + ov + ')');
                if (sorting) { sorting = false; }
                else if (newVal !== oldVal && !ctrl.getPageManager().isServerData()) {
                    //logger.log('watchCollection on tiles', 'processing...');
                    ctrl.setPageManager();
                    if (ctrl.filterClauses) {
                        ctrl.setFilter(ctrl.filterClauses);
                    }
                    ctrl.updateIcons();
                    ctrl.buildSelectedList();
                    deActivateWatchOnCollection();
                    ctrl.getPageManager().setSortInfo(ctrl.options.sortInfo.field, ctrl.options.sortInfo.direction);
                    activateWatchOnCollection();
                    ctrl.createGroups();
                }
            }

            activateWatchOnCollection();

            scope.$on('sit-filter-panel-opened', onfilterPanelChange);
            function onfilterPanelChange() {
                ctrl.isFilterPanelOpen = true;
            }

            scope.$on('$destroy', onDirectiveDestroy);

            scope.$evalAsync(initializeHeight);

            ctrl.rearrangeTilesOnResize(element.parent().width());

            function onScroll(event) {
                ctrl.serverItemsLoadCount = 10;
                var scrollHeight = $(this).prop("scrollHeight");
                var containerHeight = $(this).height();
                var trackLength = scrollHeight - containerHeight;
                var scrollTop = $(this).scrollTop();
                var scrollPercentage = Math.floor(scrollTop / trackLength * 100);
                if (scrollPercentage >= 95 && ctrl.totalServerItemsLoadedCount !== ctrl.totalDataItems && !ctrl.isGroupedBy && !ctrl.isQuickSearched && !ctrl.isSorted && !ctrl.isFilterPanelOpen) {
                    ctrl.createGroups(false, false);
                }
            }
            if (ctrl.getPageManager().isServerData() && !ctrl.options.enablePaging) {
                element.find('div[data-internal-type=tileContainerDiv]').bind('scroll', onScroll);
            }

            function activateWatchOnCollection() {
                sitGridDataWatchHandler = scope.$watchCollection(function () {
                    return ctrl.tiles;
                }, onTilesChange);
            }

            function deActivateWatchOnCollection() {
                sitGridDataWatchHandler();
                sitGridDataWatchHandler = null;
            }

            function initializeHeight() {
                ctrl.initializeHeight();
                if (ctrl.handleResize) {
                    angular.element($window).bind('resize', onWindowResize);
                }
            }

            function onDirectiveDestroy() {
                if (ctrl.handleResize) {
                    angular.element($window).unbind('resize', onWindowResize);
                }
            }

            function onWindowResize() {
                window.setTimeout(function () {
                    ctrl.setHeight();
                    ctrl.rearrangeTilesOnResize(element.parent().width());
                });
            }

            ctrl.scollContainerToTop = function () {
                element.find('.tile-container').scrollTop(0);
            }
        }
    }

    TileViewController.$inject = ['$rootScope', '$scope', 'common.widgets.tiles.tileService', '$state', 'common.widgets.pager.pageService', '$log', '$timeout', '$q', '$translate', '$element', '$document'];
    function TileViewController($rootScope, $scope, tileService, $state, pageService, $log, $timeout, $q, $translate, $element, $document) {
        var ctrl = this;
        var logger, currentPageSelectedItems;
        var displayFieldsSet = false;
        var PAGER_HEIGHT = 48;
        var TILE_HEIGHTS = {
            'medium': 56,
            'wide': 120,
            'large': 248
        };
        var TILE_WIDTH = 248;
        var isRefreshCompactServerSideData = false;
        ctrl.serverItemsLoadCount = 0;
        ctrl.initialDataItemsCount = 0;
        ctrl.totalServerItemsLoadedCount = 0;
        ctrl.isQuickSearched = false;
        ctrl.isSorted = false;
        ctrl.isGroupedBy = false;
        ctrl.isFilterPanelOpen = false;

        function activate() {
            init();
            initMethods();
            initAPIMethods();
            logger = new LogWrapper($log, ctrl.options.debug);
            logger.log('sitTiles controller func', 'begin');

            setPageManager();
            initPaginationOptions();
            ctrl.initPaginationOptions = initPaginationOptions;

            if (!ctrl.getPageManager().isServerData() || ctrl.options.enablePaging) {
                ctrl.createGroups(true, false);
            }
            tileService.setViewOptionDefaults(ctrl.options);

            //Fix 30073: calling sort info during initialization.
            setPageManager();
            ctrl.getPageManager().setSortInfo(ctrl.options.sortInfo.field, ctrl.options.sortInfo.direction);
            updateIcons();
            updateTileOptions();
            buildSelectedList();
        }

        function init() {
            ctrl.showView = true;
            ctrl.showMessage = false;
            ctrl.loadingMany = false;
            ctrl.handleResize = false;
            ctrl.options.noData = true;
            ctrl.loadingMessage = $translate.instant('common.busy-message.loading');
            ctrl.displayData = [];
            ctrl.selectedItems = [];
            ctrl.options.enablePaging = ctrl.options.enablePaging === undefined ? (ctrl.options.showPager !== undefined ? ctrl.options.showPager : ctrl.options.alwaysShowPager != undefined ? ctrl.options.alwaysShowPager : true) : ctrl.options.enablePaging;
            ctrl.grouping = ctrl.options.groupBy ? true : false;
            assignSelectedItems();
        }

        function initMethods() {
            ctrl.setHeight = setHeight;
            ctrl.setServerSideTileCount = setServerSideTileCount;
            ctrl.initializeHeight = initializeHeight;
            ctrl.setPageManager = setPageManager;
            ctrl.getPageManager = getPageManager;
            ctrl.createGroups = createGroups;
            ctrl.updateIcons = updateIcons;
            ctrl.updateTileOptions = updateTileOptions;
            ctrl.updateTileCommonData = updateTileCommonData;
            ctrl.buildSelectedList = buildSelectedList;
            ctrl.selectionModeChanged = selectionModeChanged;
            ctrl.resetView = resetView;
            ctrl.rearrangeTilesOnResize = rearrangeTilesOnResize;
        }

        function initPaginationOptions(totalDataCount) {
            ctrl.paginationOptions = ctrl.paginationOptions || {
                $init: function () {
                    this.$subscribe('onPageSizeChange', function (eventArgs) {
                        pageSizeChangeCallback(eventArgs.size);
                    });

                    this.$subscribe('onPageChange', function (eventArgs) {
                        pageChangeCallback(eventArgs.pageNumber);
                        ctrl.scollContainerToTop();
                    });
                }
            }
            ctrl.paginationOptions.type = ctrl.options.pagingOptions.type || 'extended';
            ctrl.paginationOptions.totalDataCount = totalDataCount || 0;
            ctrl.paginationOptions.pageSize = ctrl.getPageManager().getPageSize() || 10;
            ctrl.paginationOptions.currentPage = ctrl.getPageManager().getCurrentPage() || 1;
            ctrl.paginationOptions.selectedItemsCount = ctrl.selectedItems.length;
            ctrl.getPageManager().setPageSize(ctrl.paginationOptions.pageSize);
        }
        function handleError(commandResponse) {
            if (ctrl.options.onErrorCallback) {
                ctrl.options.onErrorCallback(commandResponse);
            } else {
                var error = commandResponse.data.error;
                ctrl.messageText = ': ' + $translate.instant('common.error-code-message', { code: error.errorCode, message: error.errorMessage });
                ctrl.showMessage = true;
                ctrl.showView = false;
            }
        }

        function assignSelectedItems() {
            if (ctrl.options.selectedItems) {
                angular.forEach(ctrl.options.selectedItems, function (item) {
                    if (item.selected) {
                        ctrl.selectedItems.push(item);
                    }
                });
            }
        }

        function setHeight(height) {
            if (ctrl.options.noScroll === true) {
                $element.find('div[data-internal-type=tileViewContainerDiv]').height('auto');
                $element.find('div[data-internal-type=tileContainerDiv]').height('auto');
                logger.log('sitTileView.ctrl.setHeight', 'tileViewHeight: auto, tileHeight: auto');
            } else {
                if (!height) {
                    height = getElementHeight(ctrl.options.containerID);
                }
                if (height <= 0) {
                    return;
                }
                ctrl.tileContainerHeight = ctrl.options.showPager || ctrl.options.enablePaging || ctrl.options.tileViewMode !== 'c' ? height - PAGER_HEIGHT : height;

                $element.find('div[data-internal-type=tileViewContainerDiv]').height(height);
                $element.find('div[data-internal-type=tileContainerDiv]').height(ctrl.tileContainerHeight);
                logger.log('sitTileView.ctrl.setHeight', 'tileViewHeight: ' + height + 'px, tileHeight: ' + ctrl.tileContainerHeight + 'px');
            }
        }

        function setServerSideTileCount() {
            //to get serverItemsLoadCount to be retreived on every resize of server-side compactMode
            if (ctrl.getPageManager().isServerData() && ctrl.options.enablePaging === false) {
                ctrl.serverItemsLoadCount = Math.ceil(ctrl.tileContainerHeight / TILE_HEIGHTS[ctrl.options.tileSize]) * Math.ceil(ctrl.tilesContainerWidth / TILE_WIDTH);
                ctrl.initialDataItemsCount = angular.copy(ctrl.serverItemsLoadCount);
                if (ctrl.serverItemsLoadCount > ctrl.totalServerItemsLoadedCount && ctrl.totalServerItemsLoadedCount !== ctrl.totalDataItems) {
                    ctrl.createGroups(true, false);
                }
            }
        }

        function initializeHeight() {
            // priority: 1-explicitly specified value, 2-height of containing elelemnt, 3-default to 400
            window.setTimeout(function () {
                var height = 0;
                if (ctrl.options.viewHeight) {
                    height = ctrl.options.viewHeight;
                } else if (ctrl.options.containerID) {
                    height = getElementHeight(ctrl.options.containerID);
                }
                // handle resize if we have a container and explicetly told to do so or if container has non-zero height.
                ctrl.handleResize = ctrl.options.containerID && (ctrl.options.handleResize || height > 0);
                if (height <= 0) {
                    height = Math.ceil($(window).height() / 2);
                }
                setHeight(height);
                setServerSideTileCount();
            });
        }

        function getElementHeight(id) {
            var height = 0;
            var container = $('#' + id, $element.parents('div#itemCollectionCanvas')[0]);
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

        function rearrangeTilesOnResize(tileViewContainerWidth) {
            ctrl.tilesContainerWidth = tileViewContainerWidth;
            if (!ctrl.options.enableResponsiveBehaviour) {
                return;
            }
            if (ctrl.options.tileType === 'item') {
                if (tileViewContainerWidth > 550 && tileViewContainerWidth <= 800) {
                    if (ctrl.options.tileViewMode === "medium" || ctrl.options.tileViewMode === "s") {
                        ctrl.options.tileSize = "medium";
                    } else {
                        ctrl.options.tileSize = "wide";
                    }
                } else if (tileViewContainerWidth > 800) {
                    if (ctrl.options.tileViewMode === "medium" || ctrl.options.tileViewMode === "s") {
                        ctrl.options.tileSize = "medium";
                    } else if (ctrl.options.tileViewMode === "wide" || ctrl.options.tileViewMode === "m") {
                        ctrl.options.tileSize = "wide";
                    } else {
                        ctrl.options.tileSize = "large";
                    }
                }
            } else if (ctrl.options.tileType === 'action') {
                if (tileViewContainerWidth <= 450) {
                    ctrl.options.tileSize = "small";
                } else if (tileViewContainerWidth > 450 && tileViewContainerWidth <= 800) {
                    ctrl.options.tileSize = "square";
                } else {
                    ctrl.options.tileSize = "wide";
                }
            }
        }

        // ensure use of page manager set by parent (if one exists)
        function setPageManager() {
            var tileCount = ctrl.tiles ? ctrl.tiles.length : 0;
            logger.log('ctrl.setPageManager', 'ctrl.options.pageManager: ' + (ctrl.options.pageManager ? true : false) + ', local tile count: ' + tileCount);

            ctrl.pageManager = ctrl.options.pageManager ? ctrl.options.pageManager : pageService.getPageManager(ctrl.options, ctrl.tiles);
        }

        function getPageManager() {
            var pageManager;
            if (ctrl.options.pageManager) {
                pageManager = ctrl.options.pageManager;
            } else {
                if (!ctrl.pageManager) {
                    setPageManager();
                }
                pageManager = ctrl.pageManager;
            }
            return pageManager;
        }


        // are we loading many tiles?  if so, display "Loading..." message
        //TODO: can't set this until loading data
        //(!ctrl.options.groupBy && ctrl.tiles != undefined && ctrl.tiles.length > 0);
        // last tile has been linked - we can remove any "Loading..." message
        var lastTileLinkedHandle = $scope.$on('sitLastTileLinked', function (event) {
            event.stopPropagation();
            ctrl.loadingMany = false;
            logger.log('on-sitLastTileLinked', 'event received');
        });
        // handle user toggling the expanding a group
        function groupExpanding(groupCount) {
            // TODO - be smart about this
            if (groupCount > 100) {
                ctrl.loadingMany = true;
            }
        }

        var creatingGroups = false; // flag to block subsequent calls to create groups until the first resolves.

        function findGroupByValueInTile(groupByKey, index, tile) {
            if (tile && tile.hasOwnProperty(groupByKey)) {
                if (tile[groupByKey] && tile[groupByKey].constructor === Array) {
                    if (typeof index === 'number' && !isNaN(index)) {
                        return tile[groupByKey][index];
                    }
                    return tile[groupByKey][0];
                }
                return tile[groupByKey];
            }
        }
        function getGroupByValue(groupBy, tile) {
            var groupByValue, index;
            var groupByArray = groupBy.split('.');
            if (groupByArray && groupByArray.length > 0) {
                var groupByKey = groupByArray[0];
                var temp = groupByKey;
                var arrayStringIndex = temp.indexOf('[');
                if (arrayStringIndex !== -1) {
                    groupByKey = temp.substring(0, arrayStringIndex);
                    var indexString = temp.substring(arrayStringIndex);
                    var arrayIndex = indexString.indexOf(']');
                    index = arrayIndex !== -1 ? Number(indexString.substring(1, arrayIndex)) : 0;
                }
                groupByValue = findGroupByValueInTile(groupByKey, index, tile);

                if (groupByArray.length > 1) {
                    groupByArray.shift();
                    var remainingArrayItems = groupByArray.join('.');
                    groupByValue = getGroupByValue(remainingArrayItems, groupByValue);
                }
            }
            return groupByValue;
        }

        /**
         * main func that sets displayed data.
         * - considers grouping and filtering.
         * - shows/hides pager
         */
        function createGroups(resetView) {
            if (creatingGroups) {
                logger.log('ctrl.createGroups', 'Already creating groups, skip processing');
                return undefined;
            }
            logger.log('ctrl.createGroups', 'Starting group creation');
            creatingGroups = true;

            if (!(!ctrl.options.enablePaging && ctrl.getPageManager().isServerData()) || !ctrl.groups || ctrl.isGroupedBy || ctrl.isQuickSearched || ctrl.isSorted || isRefreshCompactServerSideData || ctrl.isFilterPanelOpen) {
                ctrl.groups = [];
            }
            var foundGroups = [];
            var groupLength = 0;  // how long the groups array is after adding a group
            //var tempData, filteredData;   // temps to build data array using quick search text
            // give callers to this function the ability to know when all processing is complete.
            // they do not need to handle any errors as that happens here.
            var deferred = $q.defer();
            // set the data items to display
            try {
                setDisplayData().then(function () {
                    if (ctrl.options.groupBy && !ctrl.options.isCompactMode) {
                        var groupBy = ctrl.options.groupBy;
                        angular.forEach(ctrl.displayData, function (tile) {
                            //To do:can this be more efficient?
                            var groupByValue = getGroupByValue(groupBy, tile);
                            if (groupByValue !== undefined) {  //if one data item has it, we can assume all must and not check each time
                                // find the correct group to put this tile into
                                foundGroups = $.grep(ctrl.groups, function (group) {
                                    return group.name === groupByValue;
                                });
                                if (foundGroups.length === 0) {
                                    // didn't exist, so add it
                                    groupLength = ctrl.groups.push(new TileGroup(groupByValue));
                                    foundGroups.push(ctrl.groups[groupLength - 1]);
                                }
                                foundGroups[0].tiles.push(tile);
                            }
                        });
                        // disable paging when grouping
                        ctrl.options.showPager = false;
                        //logger.log('ctrl.createGroups', 'grouping');
                    } else {
                        var dummyGroup = new TileGroup('dummy', true, ctrl.displayData);
                        if (ctrl.groups.length === 0) {
                            ctrl.groups.push(dummyGroup);
                        }
                        // enable paging if configured when not grouping
                        ctrl.options.showPager = ctrl.options.enablePaging && (ctrl.options.alwaysShowPager || ctrl.totalDataItems > ctrl.paginationOptions.pageSize);
                        //logger.log('ctrl.createGroups', 'not grouping');
                    }
                }, function (reason) {
                    handleError(reason);
                })
                    .finally(
                        function () {
                            ctrl.setHeight();
                            ctrl.setServerSideTileCount()
                            creatingGroups = false;
                            if (resetView) {
                                ctrl.resetView();
                            }

                            /*Bug Fix 152576 - server side search
                            stacking the user search texts.
                            send server request with recently typed search-charaters once the previous search request completes
                            this process continues untill the user's search-typing activity is idle*/
                            var isServerData = ctrl.pageManager.isServerData();
                            var searchedText = ctrl.pageManager.getRecentlySearchedText();
                            var searchText = ctrl.pageManager.getSearchText();
                            if (isServerData && searchedText && searchText !== searchedText) {
                                createGroups();
                            }
                            logger.log('ctrl.createGroups', 'end group creation');
                            deferred.resolve();
                        }
                    );
            } catch (ex) {
                // don't want an exception to put us permanently in a state where createingGroups is true
                creatingGroups = false;
                throw ex;
            }
            return deferred.promise;
        }
        function checkNoData(dataItemCount) {
            if (dataItemCount > 0) {
                ctrl.showView = true;
                ctrl.showMessage = false;
            } else {
                ctrl.showView = false;
                ctrl.showMessage = true;
                ctrl.messageText = ctrl.options.noDataMessage ? ctrl.options.noDataMessage : $translate.instant('common.no-data');
            }
            ctrl.options.noData = !ctrl.showView;
        }
        /**
         * Sets the data items to be displayed based on grouping and filtering params
         */
        function setDisplayData() {
            logger.log('setDisplayData', 'BEGIN');
            var deferred = $q.defer();
            var isNoPagerServerDataMode = !ctrl.options.enablePaging && ctrl.getPageManager().isServerData();
            // when grouping, use all data. the pager will be hidden.
            (isNoPagerServerDataMode && !ctrl.options.groupBy ? ctrl.getPageManager().getServerData(ctrl.serverItemsLoadCount, ctrl.totalServerItemsLoadedCount) : ctrl.options.groupBy || !ctrl.options.enablePaging ? ctrl.getPageManager().getAllData() : ctrl.getPageManager().getPageData())
                .then(
                    function (result) {
                        ctrl.totalDataItems = result.totalDataSize;
                        if (result.isCompactServerData) {
                            ctrl.totalServerItemsLoadedCount = result.data.length + ctrl.totalServerItemsLoadedCount;
                            if (ctrl.isQuickSearched || ctrl.isSorted || ctrl.isGroupedBy || isRefreshCompactServerSideData || ctrl.isFilterPanelOpen) {
                                ctrl.displayData = result.data;
                                ctrl.isQuickSearched = false;
                                ctrl.isSorted = false;
                                ctrl.isGroupedBy = false;
                                isRefreshCompactServerSideData = false;
                                ctrl.isFilterPanelOpen = false;
                            } else {
                                if (result.data.length) {
                                    var i, length;
                                    length = result.data.length;
                                    for (i = 0; i < length; i++) {
                                        ctrl.displayData.push(result.data[i]);
                                    }
                                }
                            }
                        } else {
                            ctrl.displayData = result.data;
                            ctrl.filterDataItems = result.filterDataSize;
                            if (!result.data.length && result.currentPage !== 1) {
                                ctrl.currentPage = result.currentPage - 1;
                            } else {
                                ctrl.currentPage = result.currentPage;
                            }
                        }

                        reselectTiles();
                        ctrl.updateTileCommonData();
                        ctrl.initPaginationOptions(ctrl.totalDataItems);
                        window.$UIF.Function.safeCall(ctrl, 'paginationOptions.api.draw');
                        checkNoData(ctrl.totalDataItems);
                        logger.log('setDisplayData', 'data resolved, count: ' + ctrl.totalDataItems);
                        deferred.resolve();
                    },
                    function (reason) {
                        deferred.reject(reason);
                    }
                );
            logger.log('setDisplayData', 'END');
            return deferred.promise;
        }

        //form the objects for svgIcon or typeIcon if specified

        function updateIcons() {
            constructIconObject(ctrl.options);
            if (ctrl.tiles) {
                for (var i = 0; i < ctrl.tiles.length; i++) {
                    constructIconObject(ctrl.tiles[i]);
                }
            }
        }

        function constructIconObject(obj) {
            var newIcon = {};
            if (obj && obj.svgIcon && typeof (obj.svgIcon) === 'string') {
                newIcon = {
                    path: obj.svgIcon,
                    size: '32px'
                }
                obj.svgIcon = newIcon;
            } else {
                if (obj && obj.typeIcon && typeof (obj.typeIcon) === 'string') {
                    newIcon = {
                        prefix: 'type',
                        name: obj.typeIcon,
                        suffix: '48',
                        size: '32px'
                    }
                    obj.typeIcon = newIcon;
                }
            }
        }


        // set the options object for the tiles
        // tiles will be updated with these values if they do not already have them.
        // these values will not overwrite existing values on the tiles.
        function updateTileOptions() {
            ctrl.tileOptions = {
                image: ctrl.options.image,
                svgIcon: ctrl.options.svgIcon,
                typeIcon: ctrl.options.typeIcon,
                tileTemplate: ctrl.options.tileTemplate,
                tagField: ctrl.options.tagField,
                commands: ctrl.options.commands,
                indicators: ctrl.options.indicators,
                isCell: ctrl.options.isCell
            };
        }

        /**
         * sets data that must be the same for all tiles.
         * - requires that the pageManager be set.
         *
         */
        function updateTileCommonData(resetDisplayFields) {
            //var currentPage, dataItems;
            if (resetDisplayFields) {
                displayFieldsSet = false;
            }
            // ensure all tiles will use the same fields for displayed data.
            if (!displayFieldsSet) {
                // grab the first data item as a sample of the data structure.
                // if display properties are not set in the options, the service method will find something in the data item to use.
                var sampleDataItem = ctrl.displayData[0];
                tileService.setDisplayFields(ctrl.options, sampleDataItem);
                displayFieldsSet = true;
            }
            // define the common values
            var commonData = {
                bgColor: ctrl.options.bgColor,
                bgColorSelected: ctrl.options.bgColorSelected,
                color: ctrl.options.color,
                colorSelected: ctrl.options.colorSelected,
                descriptionField: ctrl.options.descriptionField,
                propertyFields: ctrl.options.propertyFields,
                selectStyle: ctrl.options.selectStyle,
                size: tileService.getTileSize(ctrl.options.tileType, ctrl.options.tileSize, null, 3, 3),
                titleField: ctrl.options.titleField,
                useCustomColors: ctrl.options.useCustomColors
            };
            // push the comomon values to each data item
            tileService.updateTileData(ctrl.displayData, commonData);
            $rootScope.$broadcast('sit-tile.data-update-completed');
        }

        //create and initialize a list to track selected items
        function buildSelectedList() {
            var preSelectedItems = [];
            angular.forEach(ctrl.tiles, function (tile) {
                if (tile.selected) {
                    preSelectedItems.push(tile);
                }
            });

            /** Form a fresh vm.selectedItems list, if the new vm.sitGridData has 'selected' property set to true.
             * Or maintain the old selected items and reomve items which are no longer available
             */
            if (preSelectedItems.length > 0) {
                ctrl.selectedItems = preSelectedItems;
            } else if (ctrl.selectedItems && ctrl.tiles) {
                var i,
                    j,
                    deleteIndex = [],
                    item = ctrl.tiles,
                    selectedItem = ctrl.selectedItems,
                    selectedItemLength = selectedItem.length,
                    itemLength = item.length,
                    uniqueID = ctrl.options.uniqueID;

                for (i = 0; i < selectedItemLength; i++) {
                    for (j = 0; j < itemLength; j++) {
                        if (uniqueID) {
                            if (typeof uniqueID === 'string') {
                                if (item[j][uniqueID] === selectedItem[i][uniqueID]) {
                                    break;
                                }
                            } else if (typeof uniqueID === 'function') {
                                if (ctrl.options.uniqueID(item[j], selectedItem[i])) {
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
                    ctrl.selectedItems.splice(index, 1);
                });
            }
        }

        //update the list of selected items
        function updateSelectedItemList(tile, clearFirst) {
            if (clearFirst) { ctrl.selectedItems = []; }
            if (!tile) {
                updateGroupCheckbox(tile);
                return;
            }
            var displayTile = tile;
            if (ctrl.options && ctrl.options.uniqueID && ctrl.displayData) {
                for (var i = 0; i < ctrl.displayData.length; i++) {
                    if (ctrl.displayData[i][ctrl.options.uniqueID] === tile[ctrl.options.uniqueID]) {
                        displayTile = ctrl.displayData[i];
                        displayTile.selected = tile.selected;
                        break;
                    }
                }
            }
            // check if it is already in the list
            var selIndex = ctrl.selectedItems.indexOf(displayTile);
            if (selIndex !== -1) {
                if (!displayTile.selected) {
                    ctrl.selectedItems.splice(selIndex, 1); //remove no longer selected tile
                }
                // else if already selected, leave it
            } else if (displayTile.selected) {
                ctrl.selectedItems.push(displayTile);
                // else no need to add not selected tile
            }

            // To update group checkbox of tile
            updateGroupCheckbox(displayTile);
            updateSelectedItemsCount();
        }

        function updateSelectedItemsCount() {
            ctrl.paginationOptions.selectedItemsCount = ctrl.selectedItems.length;
            if (ctrl.paginationOptions.updateSelectedItemsCount && typeof ctrl.paginationOptions.updateSelectedItemsCount === 'function') {
                ctrl.paginationOptions.updateSelectedItemsCount();
            }
        }

        /**
         * @ngdoc event
         * @name sitTileView#sit-item-selection-changed
         * @eventType Emit on sitTileView
         * @description
         * Emitted when a user clicks on a tile in the collection and changes
         * the list of currently selected items.
         *
         * Two parameters are passed along with the event.
         * * **selectedItems**: A list of the currently selected data items.
         * * **clickedItem**:The data item corresponding to the tile the user
         * clicked on to trigger the event.
         *
         * @param {Object} event The event object.
         *
         * @param {Object[]} selectedItems A list of the currently selected data items.
         *
         * @param {Object} clickedItem The data item corresponding to the tile the user
         * clicked to trigger the event.
         *
         */
        function notifySelectionChanged(selItem, force) {
            $scope.$emit('sit-item-selection-changed', ctrl.selectedItems, selItem);
            if (!ctrl.options.onSelectionChangeCallback) {
                return;
            }
            if (force || ctrl.selectedItems.length || selItem) {
                ctrl.options.onSelectionChangeCallback(ctrl.selectedItems, selItem);
            }
        }

        $scope.$watch(function () {
            return ctrl.options.selectionMode;
        }, selectionModeChangeWatch);

        function selectionModeChangeWatch() {
            if (ctrl.options.selectionMode === "none") {
                angular.forEach(ctrl.selectedItems, function (tile) {
                    tile.selected = false;
                });
                updateSelectedItemList(undefined, true);
            } else if (ctrl.options.selectionMode === "single" && ctrl.selectedItems.length > 1) {
                var mostRecentSelection = ctrl.selectedItems[ctrl.selectedItems.length - 1];
                angular.forEach(ctrl.selectedItems, function (tile) {
                    tile.selected = false;
                });
                mostRecentSelection.selected = true;
                updateSelectedItemList(mostRecentSelection, true);
            }
        }

        // updates the selected item list as necessary when the selection mode changes
        // when going from multi to single and more than one selected, keep only the most recent
        function selectionModeChanged() {
            if (!ctrl.options.multiSelect && ctrl.selectedItems.length > 1) {
                var mostRecentSelection = ctrl.selectedItems[ctrl.selectedItems.length - 1];
                angular.forEach(ctrl.tiles, function (tile) {
                    tile.selected = false;
                });
                mostRecentSelection.selected = true;
                updateSelectedItemList(mostRecentSelection, true);
            }
        }
        // handler for responding to a tile click event
        function onTileClicked(event, tileContent) {
            if (ctrl.options.selectionMode === 'none') {
                return;
            }
            // update selection property as necessary

            var currentlySelected = tileContent.selected;
            if (tileService.selectionSupported(ctrl.options.tileType)) {
                // do state transition if configured
                // else handle the selection
                var st = tileContent.stateTransition;
                if (st) {
                    $state.go(st.to, st.params, st.options);
                } else {

                    if (ctrl.options.multiSelect) {
                        //for multi-select, only toggle state of this tile
                        tileContent.selected = !currentlySelected;
                        updateSelectedItemList(tileContent, false);
                    } else {
                        //for single select, toggle state of this tile and clear selection of any other tile
                        if (ctrl.getPageManager().isServerData()) {
                            angular.forEach(ctrl.groups, function (group) {
                                angular.forEach(group.tiles, function (tile) {
                                    tile.selected = false;
                                });

                            });
                        }
                        else {
                            angular.forEach(ctrl.tiles, function (tile) {
                                tile.selected = false;
                            });
                        }
                        tileContent.selected = !currentlySelected;
                        updateSelectedItemList(tileContent, true);
                    }
                    if (ctrl.options.selectionMode === 'multi' && ctrl.options.multiSelect) {
                        updateGroupCheckbox(tileContent);
                    }
                    notifySelectionChanged(tileContent);
                }
            }
        }

        function updateGroupCheckbox(tileContent) {
            if (ctrl.options.groupBy) {
                var isAllTilesSelected;
                angular.forEach(ctrl.groups, function (tileGroup, index) {
                    if (_.where(tileGroup.tiles, tileContent).length > 0) {
                        isAllTilesSelected = true;
                        for (var i = 0; i < tileGroup.tiles.length; i++) {
                            if (!tileGroup.tiles[i].selected) {
                                isAllTilesSelected = false;
                                break;
                            }
                        }
                        if (ctrl.options.selectionMode === 'multi' && ctrl.options.multiSelect) {
                            $document.find('sit-tile-group').find(':checkbox')[index].checked = isAllTilesSelected;
                        }
                    }
                });
            }
        }
        function onGroupSelected(event, tiles) {
            angular.forEach(tiles, function (tile) {
                updateSelectedItemList(tile, false);
            });
            notifySelectionChanged(null, true);
        }
        // handle tile click to update selected list
        var tileClickedHandle = $scope.$on('sit-tile.clicked', onTileClicked);
        function onDestroy() {
            lastTileLinkedHandle();
            tileClickedHandle();
            groupSelectedHandle();
            ctrl.paginationOptions = null;
        }
        // handle group selection change to update selected list
        var groupSelectedHandle = $scope.$on('sit-group-selected', onGroupSelected);
        $scope.$on('$destroy', onDestroy);

        function pageChangeCallback(page) {
            logger.log('pageChangeCallback', 'new page: ' + page);
            ctrl.loadingMany = ctrl.getPageManager().getPageSize() > 100;
            // call in timeout so "Loading..." message can display
            ctrl.getPageManager().setCurrentPage(page);
            ctrl.createGroups().then(function () {
                ctrl.options.onPageChangedCallback && ctrl.options.onPageChangedCallback(page);
            });
        }

        function pageSizeChangeCallback(pageSize) {
            ctrl.getPageManager().setCurrentPage(1);
            ctrl.getPageManager().setPageSize(pageSize);
            ctrl.createGroups();
        }

        function resetView() {
            if (!ctrl.viewResetting) {
                ctrl.viewResetting = true;
                ctrl.showView = false;
                logger.log('reset view', 'resetting view');
                $timeout(function () {
                    ctrl.viewResetting = false;
                    ctrl.showView = true;
                }, 100);
            } else {
                logger.log('reset view', 'reset already in progress');
            }
        }

        /*API's*/
        function dataUpdated(setInitialPageSize) {
            ctrl.setPageManager();
            if (setInitialPageSize) {
                ctrl.initialPageSize = ctrl.getPageManager().getPageSize();
            }

            if ((!ctrl.options.showPager || !ctrl.options.enablePaging) && ctrl.getPageManager().isServerData()) {
                isRefreshCompactServerSideData = true;
                ctrl.totalServerItemsLoadedCount = 0;
                ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
            }
            ctrl.createGroups(setInitialPageSize);
        }

        function getSelectedItems() {
            return ctrl.selectedItems;
        }

        function selectAll(state) {
            // get data and verify some exists
            var data = ctrl.displayData;  //limiting programmatic selection to current page of data
            if (!data || data.length === 0) { return; }
            // clear the selected list
            ctrl.selectedItems = [];
            // select/deselect all the data items
            angular.forEach(data, function (item) {
                item.selected = state;
                if (state) { ctrl.selectedItems.push(item); }
            });
            // To  update group checkbox
            if (ctrl.options.groupBy) {
                angular.forEach(ctrl.groups, function (tileGroup, index) {
                    $document.find('sit-tile-group').find(':checkbox')[index].checked = state;
                });
            }
            notifySelectionChanged(null);
            updateSelectedItemsCount();
        }

        function selectItems(items, state, clear) {
            // items is expected to be an array of numbers or objects
            if (!items || items.constructor !== Array) { return; }
            // get data and verify some exists
            var data = ctrl.displayData;  //limiting programmatic selection to current page of data
            if (!data || data.length === 0) {
                return;
            }
            // when selecting consider option to clear existing selections
            if (state && clear) {
                selectAll(false);
            }
            // do the select/deselect
            var i, index, selItem;
            if (items.length > 0) {
                // handle
                if (typeof items[0] === 'number') {
                    //handle selecting by index
                    for (i = 0; i < items.length; i++) {
                        index = items[i];
                        selItem = data[index];
                        if (selItem) {
                            selItem.selected = state;
                            updateSelectedItemList(selItem, false);
                        }
                    }
                } else {
                    // handle selection by object
                    for (i = 0; items[i]; i++) {
                        selItem = items[i];
                        selItem.selected = state;
                        updateSelectedItemList(selItem, false);
                    }
                }
            }
            notifySelectionChanged(null);
        }

        function setFilter(clauses) {
            ctrl.isQuickSearched = true;
            ctrl.serverItemsLoadCount = ctrl.initialDataItemsCount;
            ctrl.totalServerItemsLoadedCount = 0;
            ctrl.filterClauses = clauses.length ? clauses : undefined;
            ctrl.getPageManager().setFilter(clauses);
            ctrl.getPageManager().setCurrentPage(1);
            ctrl.createGroups();
        }
        /**
         * @ngdoc method
         * @module siemens.simaticit.common.widgets.tiles
         * @name TileViewOptions#getCurrentData
         *
         * @description
         * An API method which returns currently displayed data.
         *
         * @returns {Array} currently displayed data
         */
        function getCurrentData() {
            return ctrl.displayData;
        }

        function setTileViewHeight() {
            ctrl.setHeight();
        }

        // assigns the API methods on the options object to the controller methods that implement the functionality.
        // allows for easy resetting if the sitGridOptions object is changed.
        function initAPIMethods() {
            ctrl.options.dataUpdated = dataUpdated;
            ctrl.options.getSelectedItems = getSelectedItems;
            ctrl.options.selectAll = selectAll;
            ctrl.options.selectItems = selectItems;
            ctrl.options.setFilter = setFilter;
            ctrl.options.getCurrentData = getCurrentData;
            ctrl.options.setTileViewHeight = setTileViewHeight;
        }

        function reselectTiles() {
            var uniqueId = ctrl.options.uniqueID;
            currentPageSelectedItems = [];

            if (!ctrl.selectedItems) {
                return;
            }

            for (var i = 0; i < ctrl.selectedItems.length; i++) {
                var selectedItem = ctrl.selectedItems[i];
                for (var j = 0; j < ctrl.displayData.length; j++) {
                    var item = ctrl.displayData[j];
                    if (item.selected) {
                        continue;
                    }
                    item.selected = true;

                    if (uniqueId) {
                        if (typeof uniqueId === 'function') {
                            item.selected = uniqueId(item, selectedItem);
                            if (!item.selected) {
                                continue;
                            }
                        } else if (typeof uniqueId === 'string' && item[uniqueId] !== selectedItem[uniqueId]) {
                            item.selected = false;
                            continue;
                        }
                    } else {
                        if (!isObjectSame(item, selectedItem)) {
                            item.selected = false;
                            continue;
                        }
                    }
                    currentPageSelectedItems.push(item);
                    ctrl.selectedItems[i] = item;
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
            ctrl.selectedItems.splice(0, ctrl.selectedItems.length);
            currentPageSelectedItems.forEach(function (item) {
                ctrl.selectedItems.push(item);
            });
        }

        activate();
    }

    /**
     * Wraps use of the $log service for outputting diagnostic messages to the console
     * - Prepends message with a timestamp
     * - Formats message for consistancy: timestamp [function] message.
     * - Can turn on/off debug messages with configuration param so you do not have to comment out in code.
     */
    function LogWrapper($log, debug) {
        this.log = function (funcName, msg) {
            if (debug) { $log.log(getMessage(funcName, msg)); }
        };
        this.info = function (funcName, msg) {
            $log.info(getMessage(funcName, msg));
        };
        this.warn = function (funcName, msg) {
            $log.warn(getMessage(funcName, msg));
        };
        this.error = function (funcName, msg) {
            $log.error(getMessage(funcName, msg));
        };

        function getMessage(funcName, msg) {
            return getTimeString() + ' [' + funcName + '] ' + msg;
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
