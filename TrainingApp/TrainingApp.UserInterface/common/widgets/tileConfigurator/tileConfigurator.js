/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @access internal
 * @name siemens.simaticit.common.widgets.tileConfigurator
 *
 * @description
 * This module provides functionalities related to display the tile propertyfields.
 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.tileConfigurator', []);

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.tileConfigurator').directive('sitTileConfigurator', TileConfiguratorDirective);


    function TileConfiguratorDirective() {
        return {
            scope: {},
            bindToController: {
                sitConfig: '=sitConfig'
            },
            controller: TileConfiguratorController,
            controllerAs: 'tileConfiguratorCtrl',
            templateUrl: 'common/widgets/tileConfigurator/tile-configurator.html'
        }
    }
    TileConfiguratorController.$inject = ['common', '$timeout'];
    function TileConfiguratorController(common, $timeout) {
        var vm = this;
        function activate() {
            init();
        }
        function init() {
            initializeTileMode();
            initializeVariables();
            initializeTileOptions();
            assignTileData();
            vm.updateTileMode = updateTileMode;
            vm.updateUserTitle = updateUserTitle;
            vm.updateUserDesc = updateUserDesc;
            vm.updateUserPropone = updateUserPropone;
            vm.updateUserProptwo = updateUserProptwo;
            vm.updateUserPropthree = updateUserPropthree;
            vm.updateUserPropfour = updateUserPropfour;
            vm.sitConfig.data.getTileSettings = getTileSettings;
            vm.initializeTileOptions = initializeTileOptions;
        }

        function initializeVariables() {
            vm.svgIcons = {
                reset: { path: './common/icons/cmdToPartial24.svg' }
            };
            vm.initialTileFields = [];
            vm.resetColumns = vm.sitConfig.reset.onClickCallback;
            vm.sitConfig.data.viewMode = 'medium';
            vm.sitConfig.data.isCell = true;
            assignAllFields();
            vm.tileModes = ['small', 'medium', 'large'];
            vm.titleField = {
                field: vm.sitConfig.data.userPreferences.titleField,
                displayName: vm.sitConfig.data.userPreferences.titleField
            }
            vm.descriptionField = {
                field: vm.sitConfig.data.userPreferences.descriptionField,
                displayName: vm.sitConfig.data.userPreferences.descriptionField
            }

            vm.select = {
                toKeep: 'field',
                toDisplay: 'displayName',
                validation: { required: false },
                readOnly: false
            }

            vm.isCell = vm.sitConfig.data.isCell;
        }

        function initializeTileOptions() {
            vm.options = {
                color: 'black',
                containerID: "tile-container",
                propertyFields: vm.sitConfig.data.userPreferences.propertyFields,
                selectStyle: 'standard',
                showPager: false,
                tileType: "item",
                tileSize: vm.sitConfig.data.viewMode,
                titleField: vm.sitConfig.data.userPreferences.titleField,
                descriptionField: vm.sitConfig.data.userPreferences.descriptionField,
                useCustomColors: false,
                enableResponsiveBehaviour: true,
                tileTemplate: vm.sitConfig.data.tileTemplate,
                isCell: vm.sitConfig.data.isCell
            };

        }
        function initializeTileMode() {
            var tilemode = vm.sitConfig.data.viewMode;
            if (tilemode === 's' || tilemode === 'c' || tilemode === 'medium') {
                vm.sitConfig.data.viewMode = 'medium';
                vm.tileSize = 'medium';
            } else if (tilemode === 'm' || tilemode === 'wide') {
                vm.sitConfig.data.viewMode = 'wide';
                vm.tileSize = 'medium';
            } else if (tilemode === 'l' || tilemode === 'large') {
                vm.sitConfig.data.viewMode = 'large';
                vm.tileSize = 'large';
            }
        }

        function updateTileMode() {
            if (vm.tileSize === 'small') {
                vm.options.tileSize = 'medium';
            } else if (vm.tileSize === 'medium') {
                vm.options.tileSize = 'wide';
            } else if (vm.tileSize === 'large') {
                vm.options.tileSize = 'large';
            }
        }
        function updateUserTitle(oldVal, newVal) {
            if (!angular.equals(oldVal, newVal)) {
                vm.sitConfig.data.userPreferences.titleField = newVal.field;
                vm.options.titleField = newVal.field;
                vm.options.dataUpdated();
            }
        }

        function updateUserDesc(oldVal, newVal) {
            if (!angular.equals(oldVal, newVal)) {
                newVal && newVal.field ? (vm.sitConfig.data.userPreferences.descriptionField = newVal.field) : (vm.sitConfig.data.userPreferences.descriptionField = undefined);
                vm.options.descriptionField = vm.sitConfig.data.userPreferences.descriptionField;
                vm.options.dataUpdated();
            }
        }
        function updateUserPropone(oldVal, newVal) {
            if (!angular.equals(oldVal, newVal)) {
                newVal && newVal.field ? (vm.sitConfig.data.userPreferences.propertyFields[0] = newVal) : vm.sitConfig.data.userPreferences.propertyFields.splice(0, 1);
                vm.options.propertyFields = vm.sitConfig.data.userPreferences.propertyFields;
                vm.options.dataUpdated();
            }
        }
        function updateUserProptwo(oldVal, newVal) {
            if (!angular.equals(oldVal, newVal)) {
                newVal && newVal.field ? (vm.sitConfig.data.userPreferences.propertyFields[1] = newVal) : vm.sitConfig.data.userPreferences.propertyFields.splice(1, 1);
                vm.options.propertyFields = vm.sitConfig.data.userPreferences.propertyFields;
                vm.options.dataUpdated();
            }
        }
        function updateUserPropthree(oldVal, newVal) {
            if (!angular.equals(oldVal, newVal)) {
                newVal && newVal.field ? (vm.sitConfig.data.userPreferences.propertyFields[2] = newVal) : vm.sitConfig.data.userPreferences.propertyFields.splice(2, 1);
                vm.options.propertyFields = vm.sitConfig.data.userPreferences.propertyFields;
                vm.options.dataUpdated();
            }
        }
        function updateUserPropfour(oldVal, newVal) {
            if (!angular.equals(oldVal, newVal)) {
                newVal && newVal.field ? (vm.sitConfig.data.userPreferences.propertyFields[3] = newVal) : vm.sitConfig.data.userPreferences.propertyFields.splice(3, 1);
                vm.options.propertyFields = vm.sitConfig.data.userPreferences.propertyFields;
                vm.options.dataUpdated();
            }
        }

        function assignAllFields() {
            if (!vm.sitConfig.data.tileConfig.titleField && vm.sitConfig.data.tileConfig.propertyFields && vm.sitConfig.data.tileConfig.propertyFields.length === 0) {
                vm.sitConfig.data.tileConfig = $.extend(true, {}, vm.sitConfig.data.userPreferences);
            }
            for (var key in vm.sitConfig.data.tileConfig) {
                if ((vm.sitConfig.data.tileConfig[key] && vm.sitConfig.data.tileConfig[key].length !== 0) && (key === 'titleField' || key === 'descriptionField')) {
                    vm.initialTileFields.push({ field: vm.sitConfig.data.tileConfig[key], displayName: vm.sitConfig.data.tileConfig[key] });

                }
                if (key === 'propertyFields') {
                    angular.forEach(vm.sitConfig.data.tileConfig[key], function (obj) {
                        if (obj.field && obj.field !== '' && typeof obj === 'object') {
                            vm.initialTileFields.push({ field: obj.field, displayName: obj.displayName ? obj.displayName : obj.field });
                        } else if (obj && obj !== '' && typeof obj === 'string') {
                            vm.initialTileFields.push({ field: obj, displayName: obj });
                        }

                    })
                }
            }
        }
        function assignTileData() {
            vm.tiles = [];
            vm.tiles[0] = {};
            for (var key in vm.sitConfig.data.userPreferences) {
                if (key === 'titleField' || key === 'descriptionField' && vm.sitConfig.data.userPreferences[key]) {
                    vm.tiles[0][vm.sitConfig.data.userPreferences[key]] = vm.sitConfig.data.userPreferences[key] + ' field value';
                    if (_.findIndex(vm.initialTileFields, { field: vm.sitConfig.data.userPreferences[key] }) === -1) {
                        vm.initialTileFields.push({ field: vm.sitConfig.data.userPreferences[key], displayName: vm.sitConfig.data.userPreferences[key] })
                    }
                }
                if (key === 'propertyFields') {
                    vm.initialTileFields.push({ field: '', displayName: '' });
                    angular.forEach(vm.sitConfig.data.userPreferences[key], function (obj, index) {
                        if (typeof obj === 'object' && obj.field && obj.field !== '') {
                            vm.tiles[0][obj.field] = obj.field + ' field value';
                            if (_.findIndex(vm.initialTileFields, { field: obj.field }) === -1) {
                                vm.initialTileFields.push({ field: obj.field, displayName: obj.displayName ? obj.displayName : obj.field })
                            }
                        } else if (typeof obj === 'string' && obj !== '') {
                            vm.tiles[0][obj] = obj + ' field value'
                            vm.sitConfig.data.userPreferences.propertyFields[index] = { field: obj, displayName: obj };
                            if (_.findIndex(vm.initialTileFields, { field: obj }) === -1) {
                                vm.initialTileFields.push({ field: obj, displayName: obj })
                            }
                        }
                    })
                }
            }
            vm.titleDescriptionValues = JSON.parse(JSON.stringify(vm.initialTileFields));
            var removeIndex = vm.titleDescriptionValues.map(function (item) { return item.field; }).indexOf('');
            vm.titleDescriptionValues.splice(removeIndex, 1);
        }


        function getTileSettings() {

            vm.usertileConfig = {
                "titleField": vm.titleField.field ? vm.titleField.field : undefined,
                "descriptionField": vm.descriptionField.field ? vm.descriptionField.field : undefined,
                "propertyFields": []
            };
            angular.forEach(vm.sitConfig.data.userPreferences.propertyFields, function (obj) {
                if (obj && obj.field) {
                    vm.usertileConfig.propertyFields.push(obj);
                }
            })

            return vm.usertileConfig;

        }
        activate();
    }
})();
