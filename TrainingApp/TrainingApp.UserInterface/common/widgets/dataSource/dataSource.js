/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
	 * @ngdoc module
	 * @name siemens.simaticit.common.widgets.dataSource
     * @access internal
	 * @description
	 * Functionality that aquires data from a server through a presentation service.
	 */
    angular.module('siemens.simaticit.common.widgets.dataSource', [
        'siemens.simaticit.common.widgets.pager'
    ]);

})();

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @module siemens.unity.common.dataSource
     * @name sitDataSource
     * @access internal
     *
     * @requires $injector
     *
     * @restrict A
     *
     * @description
     * Used to load data from a presentation service.  The loaded data is populated into the array given to the directive.
     * This allows a user to get a dataset and populate a control without writing any code in JavaScript.
     * It provides a limited set of functionalities, but requires little configuration and no JavaScript.
     *
     * @param {Object} [sit-data-service]
     * The name of the presentation service to use for getting the data. (e.g. common.services.engineering.data.service ).
     * @param {String} [sit-data-entity]
     * The type of entity to get when querying for data through the presentation service. (e.g. "CommandDefinition")
     * @param {String} [sit-query-options]
     * An oData compliant option string to add to the query. (e.g. "$filter=startswith(ShortName, 'Create')" )
     * @param {Object} [sit-data-items]
     * The property to hold the resulting data.
     *
     * @example
     * This example uses ng-repeat to populate list items into an unordered list.  Each list item represents a CommandDefinition.
     *
     * ```
     *  <ul sit-data-source
     *      sit-data-service="common.services.engineering.data.service"
     *      sit-data-entity="CommandDefinition"
     *      sit-data-items="myController.commandDefinitions"
     *      sit-query-options="$orderby=ShortName desc">
     *
     *      <li ng-repeat="commandDef in myController.commandDefinitions">{{commandDef.ShortName}}</li>
     *
     *  </ul>
     * ```
     */
    angular.module('siemens.simaticit.common.widgets.dataSource').directive('sitDataSource', function () {
        return {
            restrict: 'A',
            bindToController: {
                sitDataService: '@',
                sitDataEntity: '@',
                sitQueryOptions: '@',
                sitDataItems: '='
            },
            scope: {},
            controller: DataSourceController,
            controllerAs: 'dataSourceCtrl'
        };
    });

    DataSourceController.$inject = ['common.widgets.pager.serverDataService', '$injector', 'common'];
    function DataSourceController(serverDataService, $injector, common) {
        var vm = this;
        var config, dm;
        activate();
        function activate() {

            config = {
                serverDataOptions: {
                    dataService: $injector.invoke([vm.sitDataService, function (theService) { return theService; }]),
                    dataEntity: vm.sitDataEntity,
                    optionsString: vm.sitQueryOptions
                },
                pagingOptions: {
                    currentPage: 1,
                    pageSize: 10
                },
                quickSearchOptions: {
                    field: '',
                    filterText: ''
                },
                sortInfo: {
                    field: '',
                    direction: ''
                }
            };

            dm = serverDataService.getDataManager(config);
            dm.getAllData()
            .then(function (result) {
                vm.sitDataItems = result.data;
                vm.isDataReturned = true;
            }, function (reject) {
                vm.isDataReturned = false;
                common.logger.logError(reject.data.error.errorCode + ' : ' + reject.data.error.errorMessage, reject.data, 'sitDataSource');
            });
        }
    }

})();
