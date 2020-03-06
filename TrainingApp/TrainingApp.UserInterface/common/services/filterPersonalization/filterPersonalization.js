/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @access internal
 * @name siemens.simaticit.common.services.filterPersonalization
 * @description
 * This module provides functionalities to Save, Delete and Load filters.
 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.services.filterPersonalization', []);

})();

(function () {
    'use strict';

    /**
     * @ngdoc service
     * @access internal
     * @name common.services.filterPersonalization.filterPersonalizationService
     * @module siemens.simaticit.common.services.filterPersonalization
     * @description A service provider for performing Save, Delete and Retrieve Filters.
     */



    function FilterPersonalizationService(personalizationService) {
        var vm = this;
        activate();
        function activate() {
            init();
            initApi();
        }

        function init() {
            vm.filterClauses = null;
            vm.userPreferences = null;
        }

        function initApi() {
            vm.saveFilterClauses = saveFilterClauses;
            vm.deleteFilterClauses = deleteFilterClauses;
            vm.retrieveFilterClauses = retrieveFilterClauses;
        }

        /**
        * @ngdoc method
        * @access internal
        * @name common.services.filterPersonalization.filterPersonalizationService#saveFilterClauses
        * @module siemens.simaticit.common.services.filterPersonalization
        * @description Save the values of the filter.
        * @param {String} Type The widget name.
        * @param {String} PrefrenceId The userPrefId property value.
        * @param {Object} Value A personalized configuration object.
        */
        function saveFilterClauses(type, userPrefId, filterValue) {
            if (vm.userPreferences === null) {
                vm.userPreferences = {
                    filter: []
                };
            } else {
                if (!vm.userPreferences.filter) {
                    vm.userPreferences = {
                        filter: []
                    };
                }
            }
            var index = _.findIndex(vm.userPreferences.filter, function (clause) {
                return _.isEqual(clause.filterName, filterValue.filterName);
            });
            if (index > -1) {
                vm.userPreferences.filter[index] = filterValue;
            } else {
                vm.userPreferences.filter[vm.userPreferences.filter.length] = filterValue;
            }
            personalizationService.setPersonalization(type, userPrefId, vm.userPreferences);
        }

        /**
        * @ngdoc method
        * @access internal
        * @name common.services.filterPersonalization.filterPersonalizationService#deleteFilterClauses
        * @module siemens.simaticit.common.services.filterPersonalization
        * @description Delete the values of the filter.
        * @param {String} Type The widget name.
        * @param {String} PrefrenceId The userPrefId property value.
        * @param {Object} Value A personalized configuration object.
        */
        function deleteFilterClauses(type, userPrefId, filterValue) {
            vm.userPreferences = personalizationService.getCurrentUserPreference(type, userPrefId);
            if (vm.userPreferences && vm.userPreferences.filter.length) {
                var index = _.findIndex(vm.userPreferences.filter, function (clause) {
                    return _.isEqual(clause.filterName, filterValue.filterName);
                });
                if (index > -1) {
                    vm.userPreferences.filter.splice(index, 1);
                    personalizationService.setPersonalization(type, userPrefId, vm.userPreferences);
                }
            }
        }

        /**
        * @ngdoc method
        * @access internal
        * @name common.services.filterPersonalization.filterPersonalizationService#retrieveFilterClauses
        * @module siemens.simaticit.common.services.filterPersonalization
        * @description Retrieve the values of the filter.
        * @param {String} Type The widget name.
        * @param {String} PrefrenceId The userPrefId property value.
        */
        function retrieveFilterClauses(type, userPrefId) {
            vm.userPreferences = personalizationService.getCurrentUserPreference(type, userPrefId);
            vm.filterClauses = null;
            if (vm.userPreferences && vm.userPreferences.filter) {
                vm.filterClauses = vm.userPreferences.filter;
            }
            return vm.filterClauses;
        }
    }

    FilterPersonalizationService.$inject = ['common.services.personalization.personalizationService'];

    angular.module('siemens.simaticit.common.services.filterPersonalization')
        .service('common.services.filterPersonalization.filterPersonalizationService', FilterPersonalizationService);

})();
