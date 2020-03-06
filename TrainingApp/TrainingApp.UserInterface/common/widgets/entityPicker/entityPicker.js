/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.entityPicker
    *
    * @description
    * This module provides functionalities for selecting entities from a predefined list of entities.
    */

    angular.module('siemens.simaticit.common.widgets.entityPicker', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.entityPicker');

    /**
    * @ngdoc directive
    * @name sitEntityPicker
    * @module siemens.simaticit.common.widgets.entityPicker
    * @description
	* The **entitypicker** is a widget that is used to select an entity from a predefined list of entities. The widget makes it possible to
    * select the entity that matches the first character or characters entered by the user.
	*
	* @usage
    * As an element:
    * ```
    * <sit-entity-picker sit-id="entityPickerID"
    *                    sit-datasource="datasourceArrayObject or datasourceFunction Expression"
    *                    sit-template-url="'templateUrl'"
    *                    sit-limit="dropdownEntitiesLimit"
    *                    sit-placeholder="entityPlaceholderValue"
    *                    sit-selected-attribute-to-display="selectedAttributeToDisplay"
    *                    sit-selected-object="selectedObject"
    *                    sit-editable="isEditable"
    *                    sit-validation="validationObject"
    *                    sit-value="defaultValue"
    *                    sit-wait-ms="waitTimeMs"
    *                    ng-focus="focusEvent"
    *                    ng-blur="blurEvent"
    *                    sit-change="changeEvent"
    *                    ng-disabled="isDisable"
    *                    ng-readonly="isReadonly"
    *                    sit-required="isRequired"
    *                    sit-picker-options="pickerOptionsObject">
    * </sit-entity-picker>
    *
    * ```
    * @restrict E
	*
    * @param {Array<Object> | Function} sit-datasource List of entities available for the entity picker.
    *
    * **Local Data**: **sit-datasource** should be an array of objects.
    *
    * Example:
    * ```
    * [
    *       {
    *           Name: "Recipe01",
    *           Description: "01.01"
    *       },
    *       {
    *           Name: "Recipe02",
    *           Description: "01.01"
    *       }
    * ]
    * ```
    * **Server Data**: **sit-datasource** should be defined as a Function expression to get the data from server.
    *
    * Example:
    * ```
    * var dataEntity = 'WorkerRoleDefinition';
    * var optionString = "$filter=contains(Name,'" + searchString + "')";
    *
    * datasource = function(searchString){
    * engineeringData.getAll(dataEntity, optionString) {
    *
    *   // return the data
    *
    * }
    * ```
    *
    * @param {String} sit-templateUrl _(Optional)_ Path to the template used to render the list of entities (applies to each entity).
    * If not specified, a default template is applied to display the **sit-selectedAttributeToDisplay** attribute.
    * @param {String} [sit-selected-attribute-to-display=name] Attribute to be displayed in the field when an entity is selected.
    * @param {Object} [sit-selected-object=undefined] Default entity selected when the page is loaded.
    * @param {String} [sit-value= undefined] _(Optional)_ Value of the entity picker widget. If undefined, sit-selected-object will be referred.
    * @param {Number} [sit-limit=8] _(Optional)_ Maximum number of entities to be displayed.
    * @param {Boolean} [sit-editable=false] _(Optional)_ Specifies if the user is allowed to enter an entity that is not available in the list.
    * @param {String} [sit-placeholder=Find an entity (translated)] _(Optional)_ Text displayed in the **entityPicker** control before it is active.
	* @param {String} sit-id Unique identifier of the entity picker.
    * @param {Number} [sit-wait-ms=300] _(Optional)_ The waiting time in milliseconds, which triggers a drop-down list to be displayed after the last character has been typed.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {Function} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
    * @param {Function} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {Boolean} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {Function} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
    * @param {Boolean} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    * @param {Boolean} sit-read-only _(Optional)_ Specifies if the property is editable.
    * @param {Boolean} sit-required _(Deprecated)_ Specifies if the property is mandatory or not. **Note:** If ctrl.sitValidation.required is defined,
    * it will override ctrl.sitRequired value. (default:false)
    * @param {Object} sit-picker-options _(Optional)_ If linked to an {@link ICVOptions} object, the entity picker displays a button, which opens an Item Collection Viewer,
    * where the user can select an item.
    *
    *
	* @example
	* In a view template, the `sit-entity-picker` directive is used as follows (for both local and server data):
	*
	* ```
	* <sit-entity-picker sit-id="ctrl.entityPickerConfig.id"
    *                    sit-datasource="ctrl.entityPickerConfig.datasource"
    *                    sit-template-url="'common/examples/entityPicker/entity-picker-custom-template.html'"
    *                    sit-limit="ctrl.entityPickerConfig.limit"
    *                    sit-placeholder="ctrl.entityPickerConfig.placeholder"
    *                    sit-selected-attribute-to-display="ctrl.entityPickerConfig.attributetodisplay"
    *                    sit-selected-object="ctrl.entityPickerConfig.selectedObject"
    *                    sit-wait-ms="ctrl.entityPickerConfig.waitTime"
    *                    sit-editable="ctrl.entityPickerConfig.editable"
    *                    sit-validation="ctrl.entityPickerConfig.validation"
    *                    sit-value="ctrl.entityPickerConfig.entityValue"
    *                    ng-blur="ctrl.entityPickerConfig.blurEvent()"
    *                    sit-change="ctrl.entityPickerConfig.changeEvent"
    *                    ng-disabled="ctrl.entityPickerConfig.disableEP"
    *                    ng-focus="ctrl.entityPickerConfig.focusEvent()"
    *                    ng-readonly="ctrl.entityPickerConfig.readOnly"
    *                    sit-required="ctrl.entityPickerConfig.required"
    *                    sit-picker-options="ctrl.entityPickerConfig.icvOptions">
    * </sit-entity-picker>
    * ```
	*
	* @example
    * The following example shows how to configure a sit-entity-picker widget for local data:
    *
    * In Controller:
    * ```
    * (function () {
    *     var app = angular.module('siemens.simaticit.common.examples');
    *     app.controller('entityPickerDevController', ['$scope', '$http', '$q', function ($scope, $http, $q) {
    *         var vm = this;
    *         vm.entityPickerConfig = {
    *             disableEP: false,
    *             id: "entityPickerId",
    *             datasource: [
    *             {
    *                 name: "Recipe01",
    *                 version: "01.01",
    *                 product: "Aspirin",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe02",
    *                 version: "01.01",
    *                 product: "Dolipran",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe03",
    *                 version: "01.01",
    *                 product: "vaccine",
    *                 status: "In editing"
    *             },
    *             {
    *                 name: "Recipe04",
    *                 version: "01.01",
    *                 product: "water",
    *                 status: "In editing"
    *             },
    *             {
    *                 name: "Recipe05",
    *                 version: "01.02",
    *                 product: "bitter",
    *                 status: "In editing"
    *             },
    *             {
    *                 name: "Recipe06",
    *                 version: "01.00",
    *                 product: "xxx",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe07",
    *                 version: "01.00",
    *                 product: "chinotto",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe08",
    *                 version: "01.08",
    *                 product: "ginger",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe09",
    *                 version: "01.02",
    *                 product: "boh",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe10",
    *                 version: "01.04",
    *                 product: "mah",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe11",
    *                 version: "01.03",
    *                 product: "oppa",
    *                 status: "Approved"
    *             },
    *             {
    *                 name: "Recipe12",
    *                 version: "01.06",
    *                 product: "bom-basta",
    *                 status: "Approved"
    *             }
    *             ],
    *             limit: 5,
    *             waitTime: 500,
    *             placeholder: "Find an entity !!!",
    *             attributetodisplay: "name",
    *             selectedObject: {
    *                 name: "Recipe02",
    *                 version: "01.01",
    *                 product: "Dolipran",
    *                 status: "Approved"
    *             },
    *             entityValue: "Recipe02",
    *             editable: true,
    *             required: true,
    *             focusEvent: function () {
    *                 console.log("focus event fired !!!");
    *             },
    *             blurEvent: function () {
    *                 console.log("blur event fired !!!");
    *             },
    *             changeEvent: function (newValue, oldValue) {
    *                 console.log(newValue + oldValue);
    *             },
    *             validation: {
    *                 custom: function (value, ngModel) {
    *                     if (value === "Recipe01") {
    *                         ngModel.$setValidity(ngModel.$$parentForm.$name, true);
    *                     }
    *                     else {
    *                         ngModel.$setValidity(ngModel.$$parentForm.$name, false);
    *                     }
    *                     return ngModel;
    *                 }
    *             },
    *             icvOptions: {
    *                 containerID: 'myIcvContainer',
    *                 gridConfig: {
    *                     columnDefs: [
    *                         { field: 'name', displayName: 'Name' },
    *                          { field: 'version', displayName: 'Version' },
    *                          { field: 'product', displayName: 'Product', resizable: false },
    *                          { field: 'status', displayName: 'status' }
    *                     ]
    *                 },
    *                 groupField: '',
    *                 groupFields: ['name', 'version', 'product', 'status'],
    *                 alwaysShowPager: true,
    *                 quickSearchOptions: {
    *                     enabled: false,
    *                     field: 'name',
    *                     filterText: ''
    *                 },
    *                 onSelectionChangeCallback: function () { },
    *                 selectionMode: 'multi',
    *                 selectStyle: 'alternate',
    *                 sortInfo: {
    *                     field: 'name',
    *                     direction: 'asc',
    *                     fields: ['name', 'version', 'product', 'status']
    *                 },
    *                 tileConfig: {
    *                     nameField: 'name',
    *                     descriptionField: 'product'
    *                 },
    *                 viewMode: 'g',
    *                 viewOptions: 'gsmlx',
    *             }
    *         }
    *     }]);
    * })();
    *```
	*
	*
	* @example
    * The following example shows how to configure a sit-entity-picker widget for server data:
    *
    * In Controller:
    * ```
    * (function () {
    *     var app = angular.module('siemens.simaticit.common.examples');
    *     app.controller('entityPickerDevController', ['$scope', '$http', '$q','common.services.engineering.data.service', function ($scope, $http, $q,engineeringData) {
    *         var vm = this;
    *         vm.entityPickerConfig = {
    *             disableEP: false,
    *             id: "entityPickerId",
    *             datasource: function (searchString) {
    *                  return getData(searchString).then(function (data) {
    *                         return data;
    *                  });
    *             },
    *             limit: 5,
    *             waitTime: 500,
    *             placeholder: "Find a WorkerRole !!!",
    *             attributetodisplay: "Name",
    *             selectedObject: {
    *                 Name: "Default WorkerRoleDefinition (x64)",
    *                 Description: "WorkerRole Description",
    *                 TargetCPU: "x64",
    *                 status: "In Use"
    *             },
    *             entityValue: "WorkerRole1",
    *             editable: true,
    *             required: true,
    *             focusEvent: function () {
    *                 console.log("focus event fired !!!");
    *             },
    *             blurEvent: function () {
    *                 console.log("blur event fired !!!");
    *             },
    *             changeEvent: function (newValue, oldValue) {
    *                 console.log(newValue + oldValue);
    *             },
    *             validation: {
    *                 custom: function (value, ngModel) {
    *                     if (value === "WorkerRole1") {
    *                         ngModel.$setValidity(ngModel.$$parentForm.$name, true);
    *                     }
    *                     else {
    *                         ngModel.$setValidity(ngModel.$$parentForm.$name, false);
    *                     }
    *                     return ngModel;
    *                 }
    *             },
    *             icvOptions: {
    *                 containerID: 'myIcvContainer',
    *                 gridConfig: {
    *                     columnDefs: [
    *                         { field: 'Name', displayName: 'Name' },
    *                          { field: 'Description', displayName: 'Description' },
    *                          { field: 'TargetCPU', displayName: 'TargetCPU', resizable: false },
    *                          { field: 'status', displayName: 'status' }
    *                     ]
    *                 },
    *                 groupField: '',
    *                 groupFields: ['Name', 'Description', 'TargetCPU', 'status'],
    *                 alwaysShowPager: true,
    *                 quickSearchOptions: {
    *                     enabled: false,
    *                     field: 'Name',
    *                     filterText: ''
    *                 },
    *                 onSelectionChangeCallback: function () { },
    *                 selectionMode: 'multi',
    *                 selectStyle: 'alternate',
    *                 sortInfo: {
    *                     field: 'Name',
    *                     direction: 'asc',
    *                     fields: ['Name', 'Description', 'TargetCPU', 'status']
    *                 },
    *                 tileConfig: {
    *                     nameField: 'Name',
    *                     descriptionField: 'Description'
    *                 },
    *                 viewMode: 'g',
    *                 viewOptions: 'gsmlx',
    *                    serverDataOptions: {
    *                        dataService: engineeringData,
    *                        dataEntity: 'WorkerRoleDefinition',
    *                        optionsString: ''
    *                    }
    *                }
    *         }
    *
    *         function getData(searchString) {
    *             var optionString = "$filter=contains(Name,'" + searchString + "')";
    *             var dataEntity = 'WorkerRoleDefinition';
    *             var defer = $q.defer();
    *             engineeringData.getAll(dataEntity, optionString)
    *                 .then(function (data) {
    *                      defer.resolve(data.value);
    *                 }, function (error) {
    *                     defer.reject(error);
    *                 })
    *            return defer.promise;
    *        }
    *     }]);
    * })();
    *
    *```
    *
	* The following example defines how the recipe list is rendered (by default, the recipe name is displayed for each recipe). To perform this rendering activity,
    * the template must be defined in the file referenced in the sit-templateUrl attribute as follows:

    *
	* ```
	*<a>
    *<div>
    *    <div>
    *        <span ng-bind-html="match.model.name | uibTypeaheadHighlight:query">
    *        </span>
    *    </div>
    *    <div>
    *        <div>
    *            <label> version: </label>
    *            <label ng-bind-html="match.model.version | uibTypeaheadHighlight:query"> </label>
    *        </div>
    *        <div>
    *            <label> product: </label>
    *            <label ng-bind-html="match.model.product | uibTypeaheadHighlight:query"></label>
    *        </div>
    *        <div>
    *            <label> status: </label>
    *            <label ng-bind-html="match.model.status | uibTypeaheadHighlight:query"></label>
    *        </div>
    *    </div>
    *</div>
    *</a>
	* ```
	*
	*The tag `<a>` makes it possible to select a recipe with up arrow and down arrow keys.
    The **uibTypeaheadHighlight:query** plugin makes it possible to highlight the character or characters specified by the user in the list.
	*
	* If the developer does not specify the sit-template-url attribute then a default template defined as follows will be used.
	* ```
	* <a class="aClass">
    * <div>
    *   <span class="highlighted" ng-bind-html="match.label | uibTypeaheadHighlight:query">
    *   </span>
    * </div>
    *</a>
    * ```

    **/
    sitEntityPicker.$inject = ['$filter', '$translate'];
    function sitEntityPicker($filter, $translate) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                id: "=?sitId",
                readOnly: '=?sitReadOnly',
                datasource: "=?sitDatasource",
                templateUrl: "=?sitTemplateUrl",
                selectedAttributeToDisplay: "=?sitSelectedAttributeToDisplay",
                attributeToSearch: "=?sitAttributeToSearch",
                selectedObject: "=?sitSelectedObject",
                value: "=?sitValue",
                limit: "=?sitLimit",
                editable: "=?sitEditable",
                placeholder: "=?sitPlaceholder",
                validation: "=?sitValidation",
                sitoption: "=?sitPickerOptions",
                waitTime: "=?sitWaitMs",
                ngBlur: '&?',
                sitChange: '=?',
                ngDisabled: '=?',
                ngFocus: '&?',
                ngReadonly: '=?',
                required: '=?sitRequired'
            },
            controller: EntityPickerController,
            controllerAs: 'entityPickerCtrl',
            templateUrl: 'common/widgets/entityPicker/entityPicker.html',
            link: function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    return element.find('.entity-picker-container').find('ul').attr('class');
                }, function (newValue) {

                });

            }
        };
    }
    EntityPickerController.$inject = ['$scope', '$translate', '$element', 'common', 'LOG_TYPES', 'LOG_LEVELS', '$filter', '$window', '$timeout', 'common.widgets.dialog.service'];
    function EntityPickerController($scope, $translate, $element, common, LOG_TYPES, LOG_LEVELS, $filter, $window, $timeout, dialogService) {

        var vm = this;
        var WIDGET_HEIGHT = 50,
            DEFAULT_TYPEAHEAD_WAIT_TIME = 300,
            searchText = '',
            defaultValues = {
                limit: 8,
                selectedAttributeToDisplay: 'name',
                templateUrl: 'common/widgets/entityPicker/typeahead-default-template.html'
            },
            logErrorFn = common.logger.getLogFn('siemens.unity.common.entityPicker.controller', LOG_TYPES.LOG_ERROR),
            globalDialogService = common.globalDialog;

        function activate() {
            init();
            initMethods();
            validateDataource();
            initICVOptions();
        }

        function init() {
            vm.modalId = $scope.$id + '_popupGrid';
            vm.label = vm.label ? vm.label : '';
            vm.value = vm.value ? vm.value : vm.selectedObject;
            vm.readOnlyValue = vm.value;
            vm.waitTime = vm.waitTime ? vm.waitTime : DEFAULT_TYPEAHEAD_WAIT_TIME;
            vm.dialogTitle = $filter('translate')('entityPicker.selectItem');
            vm.placeholder = vm.placeholder ? vm.placeholder : $filter('translate')('entityPicker.defaultPlaceHolder');
            vm.editable = vm.editable && typeof (vm.editable) === 'boolean' ? vm.editable : false;
            vm.limit = vm.limit ? vm.limit : defaultValues.limit;
            vm.templateUrl = vm.templateUrl ? vm.templateUrl : defaultValues.templateUrl;
            vm.selectedAttributeToDisplay = vm.selectedAttributeToDisplay ? vm.selectedAttributeToDisplay : defaultValues.selectedAttributeToDisplay;
            vm.attributeToSearch = vm.attributeToSearch ? vm.attributeToSearch : vm.selectedAttributeToDisplay;
            // If validation.required is present, it will override the value of required.Default is false.
            vm.required = vm.validation && vm.validation.hasOwnProperty('required') ? vm.validation.required : !!vm.required;
            vm.isLocalDatasource = Array.isArray(vm.datasource) ? true : false;
            vm.buttonsListICVGrid = [{
                id: $scope.$id + "_okButton",
                displayName: $translate.instant('entityPicker.select'),
                onClickCallback: function () {
                    globalDialogService.hide();
                    if (vm.sitoption) {
                        vm.selectedObject = vm.sitoption.getSelectedItems()[0];
                        vm.value = vm.selectedObject;
                        vm.selectedObject.selected = false;
                        $scope.$emit('sit-entity-picker.entity-selected', {
                            item: vm.selectedObject,
                            model: vm.selectedObject,
                            label: vm.selectedObject[vm.selectedAttributeToDisplay]
                        });
                    }
                    //reset sorting & filtering
                },
                disabled: false
            }, {
                id: $scope.$id + "_cancelButton",
                displayName: $translate.instant('entityPicker.cancel'),
                onClickCallback: function () {
                    var selectedItems = vm.sitoption.getSelectedItems();
                    if (selectedItems.length > 0) {
                        selectedItems[0].selected = false;
                    }
                    globalDialogService.hide();
                    //reset sorting & filtering
                    if (vm.icvObject && vm.icvObject.options && vm.icvObject.options.quickSearchOptions) {
                        vm.icvObject.options.quickSearchOptions.filterText = searchText;
                    }
                },
                disabled: false
            }];

            vm.cmdIcon = {
                path: 'common/icons/cmdMore16.svg',
                size : '16px'
            };

        }

        function initMethods() {
            vm.setDropDownHeight = setDropDownHeight;
            vm.setDropDownWidth = setDropDownWidth;
            vm.onSelect = onSelect;
            vm.showPopup = showPopup;
        }

        function validateDataource() {
            !vm.datasource && logErrorFn('datasource can\'t be null');
        }

        function initICVOptions() {
            // viewerOptions configures how to show the data
            if (vm.sitoption) {
                vm.sitoption.selectionMode = 'single';
                vm.sitoption.viewMode = 'g';
                vm.sitoption.viewOptions = 'g';
                vm.sitoption.onSelectionChangeCallback = function (selectedItems, itemChanged) {
                    if ((typeof selectedItems === 'object') && (selectedItems.length > 0)) {
                        if (vm.selectedObject) {
                            if (vm.selectedObject !== selectedItems[0]) {
                                vm.selectedObject.selected = false;
                            }
                        }
                        vm.buttonsListICVGrid[0].disabled = false;
                    } else {
                        vm.buttonsListICVGrid[0].disabled = true;
                    }
                };
                if (vm.sitoption && vm.sitoption.quickSearchOptions) {
                    searchText = vm.sitoption.quickSearchOptions.filterText;
                }
            }

            vm.icvObject = {
                data: vm.isLocalDatasource ? vm.datasource : [],
                options: vm.sitoption
            };
        }


        function setDropDownHeight() {
            var i, entityPickerElement, elementOffset, ulElement, dropDownHeight;
            var entityPickerArray = $(".entity-picker-container");
            var elementsCount = entityPickerArray.length;
            for (i = 0; i < elementsCount; i++) {
                entityPickerElement = entityPickerArray[i];
                elementOffset = $(entityPickerElement).offset();
                ulElement = $(entityPickerElement).find('ul');
                dropDownHeight = $(window).height() - (elementOffset.top + WIDGET_HEIGHT);
                ulElement.css('max-height', dropDownHeight + 'px');
                ulElement.css('min-width', '100%');
            }
        }


        function setDropDownWidth() {
            // setting the width of list item to highlight full row on mouse over when scroll bar appears
            $timeout(function () {
                var entityPickerListWidth = $element.find('input').width();
                var rowList = $element.find('ul').children('li');
                var scrollWidth;
                if (rowList.length > 0) {
                    rowList.find('a').css('width', '100%');
                    scrollWidth = $element.find('ul')[0].scrollWidth;
                    if (scrollWidth > entityPickerListWidth) {
                        rowList.find('a').css('width', scrollWidth - 1); //subtracting 1px to fix IE scrollbar issues
                    } else {
                        rowList.find('a').css('width', entityPickerListWidth - 1);
                    }
                }
            });
        }

        function onSelect($item, $model, $label) {
            vm.value = $model;
            vm.selectedObject = $model;
            $scope.$emit('sit-entity-picker.entity-selected', { item: $item, model: $model, label: $label });
        }

        function showPopup() {
            var isObjectSelected = false;
            if (vm.value) {
                var searchObj = typeof vm.value === 'object' ? vm.value[vm.selectedAttributeToDisplay] : vm.value;
                if (!vm.isLocalDatasource) {
                    vm.datasource("").then(function (result) {
                        var resFilter = $filter('filter')(result, searchObj);
                        if (resFilter.length > 0) {
                            resFilter[0].selected = true;
                            vm.selectedObject = resFilter[0];
                        }
                    }, function (error) { });

                } else {
                    var resFilter = $filter('filter')(vm.datasource, searchObj);
                    if (resFilter.length > 0) {
                        resFilter[0].selected = true;
                        isObjectSelected = true;
                        vm.selectedObject = resFilter[0];
                    }
                }
            }
            var dialogData = {
                title: vm.dialogTitle,
                templatedata: vm.icvObject,
                templateuri: 'common/widgets/entityPicker/popup-default-template.html',
                buttons: vm.buttonsListICVGrid
            }
            globalDialogService.set(dialogData);
            globalDialogService.show();
            resetICVButtons(isObjectSelected);
        }

        function resetICVButtons(objectSelected) {
            if (objectSelected) {
                vm.buttonsListICVGrid[0].disabled = false;
            } else {
                vm.buttonsListICVGrid[0].disabled = true;
            }
        }

        $scope.$on('sit-item-collection-viewer.data-search-completed', function () {
            var flag = false;
            $timeout(function () {
                var noDataContainer = $("#no-data-message-container")[0];
                if (noDataContainer) {
                    flag = false;
                } else {
                    flag = (vm.icvObject.options.getSelectedItems && vm.icvObject.options.getSelectedItems().length);
                }
                resetICVButtons(flag);
            });
        });

        $scope.$watch('entityPickerCtrl.datasource', function (newValue, oldValue) {
            vm.icvObject.data = newValue;
        });

        $scope.$watch('entityPickerCtrl.value', function (val) {
            vm.readOnlyValue = val;
            if (!val) {
                vm.selectedObject = null;
                $scope.$emit('sit-entity-picker.input-blanked', { item: vm.value, selected: vm.selectedObject });
            }
        });

        $scope.$watch('entityPickerCtrl.validation', function (newValue) {
            vm.required = newValue && newValue.hasOwnProperty('required') ? newValue.required : vm.required;
        }, true);

        activate();
    }

    function entityPickrerFilter() {
        return function (item) {
            if (typeof item === 'string') {
                return item;
            } else if (typeof item === 'object') {
                return item.name;
            }
        };
    }
    entityPickrerSearchFilter.$inject = ['$filter'];
    function entityPickrerSearchFilter($filter) {
        return function (data, viewValue, attributeToSearch) {
            if (attributeToSearch) {
                var filterdObj = {};
                filterdObj[attributeToSearch] = viewValue;
                return $filter('filter')(data, filterdObj);
            } else {
                return $filter('filter')(data, viewValue);
            }
        };
    }

    app.directive('sitEntityPicker', sitEntityPicker);
    app.filter('entityPickrerFilter', entityPickrerFilter);
    app.filter('entityPickrerSearchFilter', entityPickrerSearchFilter);
})();
