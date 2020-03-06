/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.filterPanel
 * @description
 * This module provides functionalities related to defining and saving filters, applying them to a given data set.
 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.filterPanel', []);

})();

/*jshint -W117,-W098, -W027 */
(function () {
    'use strict';
    //#region ng-doc comments
    /**
     * @ngdoc directive
     * @module siemens.simaticit.common.widgets.filterPanel
     * @name sitFilterPanel
     *
	 * @restrict E
	 *
	 * @description
	 * Provides UI and various functionalities to manage simple filters for a collection of data.
     * On loading the directive, the user can see a filter panel that appears on the left side.
     * The panel displays various html form elements based on the configuration that the user provides through fields parameter in sit-data attribute.
     * The panel shows various buttons at the top that provides functionalities to
     * 1. Save a fiter
     * 2. Save as another filter
     * 3. Load a saved filter
     * 3. Load a saved filter
     * 4. Delete a filter
     * 5. Clear all filter fields
     *
     * It also desplays, at the bottom of the panel, an Apply button which applies the filter on the collection of data
     * and a reset button which resets the filter fields and the filters applied on the data.
     *
	 * @usage
     * As an element:
     * ```
     * <sit-filter-panel
     * sit-data="panelData"
     * sit-user-preference ="userID">
     * </sit-filter-panel>

     * ```
	 * @param {Object} sitData This is an object that contains the following data:
     * 1. type: String with the value "filterPanel". Filter panel will be displayed in ICV or table only if type is specified as 'filterPanel'.
     * 2. fields: Array of objects where each object contains the details and the data required by a filter field.
     * It is mandatory for every object to specify the widget required, the field that it refers to and the other necessary data for the corresponding widget.
     * The following widgets are supported:
     *  1.sit-text
     *  2.sit-numeric
     *  3.sit-select
     *  4.sit-checkbox
     *  5.sit-multi-select
     *  6.sit-entity-picker
     *  7.sit-datepicker
     * 3. floatID: ID of an element which must be pushed in the scenario where a group of items needs to be pushed on opening the filter panel.
     * 4. onApplyCallback: Optional custom callback function that has to be executed on clicking Apply button.
     * The data that is entered by the user will be passed as clauses to the custom method.
     * 5. onResetCallback: Optional custom callback function that has to be executed on clicking Reset button.
     * @param {string} sitUserPreference
	 * Specifies the user preference ID from the parent widget's configuration.
     *
	 * @example
     *  The following example shows how to configure a filterPanel widget:
     *
     * In Controller
     * ```
     *  (function () {
     *      FilterPanelDemoController.$inject = [];
     *      function FilterPanelDemoController() {
     *          var self = this;
     *          self.filterFields = {
     *      type:"filterPanel",
     *
     *      fields: [
     *            { field: 'number',
     *              displayName: 'Number',
     *              type: 'string',
     *              widget: 'sit-numeric'
     *            },
     *            { field: 'product',
     *                displayName: 'Product',
     *                type: 'string' ,
     *                widget:'sit-select',
     *                options: [{id:'Aspirin',name:'Aspirin'},{id:'Dolipran',name:'Dolipran'},{id:'Vaccine',name:'Vaccine'}],
     *                "toDisplay": 'id',
     *                "toKeep": 'name',
     *                "onChange":function(){}
     *            },
     *            { field: 'name',
     *              displayName: 'Name',
     *              type: 'string',
     *              widget: 'sit-text'
     *            },
     *            {
     *              field: 'state',
     *              displayName: 'Entity Picker',
     *              type: 'string',
     *              widget: 'sit-entity-picker',
     *              toKeep: 'status',
     *              widgetAttributes: {
     *                          "sit-datasource": ['state1', 'state2', 'state3'], // [{status:'Approved'},{status:'In editing'},{status:'Saved'}],
     *                          "sit-selected-attribute-to-display": 'status',
     *                          "sit-template-url": 'Siemens.WidgetApp/modules/FilterPanel/entity-picker.html'
     *                      }
     *            },
     *            {
     *              field: 'status',
     *              displayName: 'status',
     *              type: 'string',
     *              widget: 'sit-multi-select',
     *              widgetAttributes: {
     *                      "sit-options": [
     *                          { "id": 'Approved', "name": 'Approved' },
     *                          { "id": 'In editing', "name": 'In editing' },
     *                          { "id": 'Waiting', "name": 'Waiting' }
     *                       ],
     *                       "sit-selected-string":""
     *                        },
     *              onChange: function() { }
     *              },
     {
     *              field: 'country',
     *              displayName: 'Country',
     *              type: 'string',
     *              widget: 'sit-advanced-select',
     *              widgetAttributes: {
     *                      "sit-options": [
     *                          { "id": 'India', "name": 'India' },
     *                          { "id": 'Italy', "name": 'Italy' },
     *                          { "id": 'US', "name": 'US' }
     *                       ],
     *                       "sit-selected-string":""
     *                        },
     *              onChange: function() { }
     *              },
     *              {
     *                  field: 'number',
     *                  displayName: 'date',
     *                  type: 'string',
     *                  widget: 'sit-datepicker'
     *              },
     *              {
     *                   id: "F3",
     *                   field: "gender",
     *                   displayName: 'gender',
     *                   widget: 'sit-checkbox',
     *                   value: [
     *                       {
     *                           label: "Raw",
     *                           checked: true
     *                       },
     *                       {
     *                           label: "Gross",
     *                           checked: false
     *                       }
     *                   ]
     *
     *                }
     *          ],
     * floatID:'divID',
     * onApplyCallback:function(){ },
     * onResetCallback:function(){ }
     *}
     *
     *      self.sitUserPreference = "userID1"
     * })();
     * ```
     * In Template
     *```
     *  <sit-filter-panel
     *   sit-data = "ctrl.filterFields"
     *   sit-user-preference = "ctrl.sitUserPreference"
     *  </sit-filter-panel>
	 *```
	 *
     */

    angular.module('siemens.simaticit.common.widgets.filterPanel')
        .directive('sitFilterPanel', ['$compile', '$rootScope', '$http', FilterPanelDirective]);

    function FilterPanelDirective($compile, $rootScope, $http) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                'data': '=sitData',
                'userPrefId': '=sitUserPreference'
            },
            controller: FilterPanelController,
            controllerAs: 'filterPanelCtrl',
            link: function (scope, element, attr, ctrl) {

                var PANEL_WIDTH = 360;
                var BORDER_SPACE = 8;
                var parentElement;
                ctrl.panelElm = undefined;
                ctrl.filterFields = ctrl.data.fields;
                var isPanelAppended = false;
                function loadPanel() {
                    $http.get("common/widgets/filterPanel/sit-filter-panel.html").then(function (data) {
                        ctrl.panelElm = $compile(data.data)(scope);
                    });
                }
                loadPanel();
                if (ctrl.data.floatID) {
                    parentElement = $(element).parents().find("#" + ctrl.data.floatID);
                } else {
                    parentElement = $(element).parents(ctrl.data.parentWidget);
                }

                if (!parentElement.first().hasClass("filter-panel-wrapper")) {
                    parentElement.first().wrap("<div class='filter-panel-wrapper'></div>");
                }

                var filterPanelScroll = element.find('div.simple-filter-panel');
                $('.simple-filter-clauses').on("scroll", setFilterPanelShadow);

                function setFilterPanelShadow() {
                    if (this.scrollTop > 0) {
                        filterPanelScroll.children('.action-button-footer').addClass('shadow');
                    } else {
                        filterPanelScroll.children('.action-button-footer').removeClass('shadow');
                    }
                }

                var listener = scope.$watch(function () {
                    return ctrl.panelElm;
                }, function (panelElm) {
                    if (panelElm !== undefined && !isPanelAppended) {
                        $(element).parents('.filter-panel-wrapper').prepend(panelElm);
                        $(element).parents().find('#filter-panel')[0].style.width = PANEL_WIDTH;
                        $($(parentElement)).children().css('width', 'calc(100% - ' + (PANEL_WIDTH + BORDER_SPACE) + 'px)');
                        $($(parentElement)).children().css('margin-left', (PANEL_WIDTH + BORDER_SPACE));
                        $(element).parents().find('#ButtontoggleFilter').css('pointer-events', 'none');
                        isPanelAppended = true;
                        $rootScope.$broadcast('sit-filter-panel-opened');
                        listener();
                    }
                }, true);


                ctrl.close = function () {
                    $(element).parents().find('#filter-panel').unwrap();
                    $(element).parents().find('#filter-panel').remove();
                    $($(parentElement)).children().css('margin-left', '0');
                    $($(parentElement)).children().css('width', '100%');
                    $(element).parents().find('#ButtontoggleFilter').css('pointer-events', 'auto');
                    $rootScope.$broadcast('sit-filter-panel-closed');
                };
            }
        };
    }
    FilterPanelController.$inject = ['$translate', '$rootScope', '$scope', '$timeout',
        'common.services.filterPersonalization.filterPersonalizationService', 'common.filterPanel.filterPanelService',
        'common.widgets.globalDialog.service', 'common.widgets.messageOverlay.service'];
    function FilterPanelController($translate, $rootScope, $scope, $timeout, filterPersonalizationService, filterPanelService, globalDialogService, messageOverlayService) {
        var vm = this;
        activate();
        function activate() {
            init();
            initMethods();
            getSavedFilters();
            setFilterList();
        }

        function init() {
            vm.savedFilters = null;
            vm.widget = "sit-filter-panel";
            vm.isDataRetainEnabled = vm.data.isDataRetainEnabled === false ? false : true;
            vm.filterData = {
                filterName: $translate.instant('filterPanel.newFilter'),
                description: '',
                filterClauses: vm.data.fields.slice()
            };

            vm.closeIcon = {
                path: 'common/icons/cmdClosePanel24.svg',
                size: '16px'
            };
        }

        function initMethods() {
            vm.save = save;
            vm.saveAs = saveAs;
            vm.clear = clear;
            vm.delete = deleteFilter;
            vm.onFilterChange = onFilterChange;
            vm.apply = apply;
            vm.reset = reset;
            vm.onValidityChangeCallback = onValidityChangeCallback;
            vm.retainFilterData = retainFilterData;
            vm.commandButtons = {
                "barType": "Action",
                "bar": [
                    {
                        "name": "open_filter",
                        "svgIcon": "common/icons/homeFolderOpen24.svg",
                        "tooltip": $translate.instant('filterPanel.openFilter'),
                        "type": "Group",
                        "group": [
                        ]
                    },
                    {
                        "type": "Command",
                        "name": "clear",
                        "visibility": true,
                        "svgIcon": "common/icons/cmdDelete24.svg",
                        "tooltip": $translate.instant('commandBar.clearToolTip'),
                        'onClickCallback': vm.clear
                    },
                    {
                        "type": "Command",
                        "name": "save_as",
                        "visibility": true,
                        "svgIcon": "common/icons/cmdSaveAs24.svg",
                        "tooltip": $translate.instant('commandBar.saveAsToolTip'),
                        'onClickCallback': vm.saveAs

                    },
                    {
                        "type": "Command",
                        "name": "save",
                        "visibility": true,
                        "svgIcon": "common/icons/cmdSave24.svg",
                        "tooltip": $translate.instant('commandBar.saveToolTip'),
                        'onClickCallback': vm.save
                    },
                    {
                        "type": "Command",
                        "name": "delete",
                        "visibility": false,
                        "svgIcon": "common/icons/cmdTrash24.svg",
                        "tooltip": $translate.instant('filterPanel.delete'),
                        'onClickCallback': vm.delete
                    }

                ]
            };
            vm.saveAsDialogButtons = [
                {
                    id: "save",
                    displayName: $translate.instant('filterPanel.save'),
                    disabled: true,
                    onClickCallback: function (value) {
                        getSavedFilters();
                        var index = _.findIndex(vm.savedFilters, function (filterData) {
                            return _.isEqual(filterData.filterName.toLowerCase(), vm.dialogData.templatedata.name.value.toLowerCase());
                        });
                        if (index > -1) {
                            globalDialogService.hide();
                            showErrorMessage();
                        } else {
                            vm.filterData.filterName = vm.dialogData.templatedata.name.value;
                            vm.filterData.description = vm.dialogData.templatedata.description.value;
                            var dataToSave = angular.copy(vm.filterData);
                            filterPersonalizationService.saveFilterClauses(vm.widget, vm.userPrefId, dataToSave);
                            vm.commandButtons.bar[0].group[vm.commandButtons.bar[0].group.length] = {
                                "label": dataToSave.filterName,
                                "type": "Command",
                                "name": dataToSave.filterName,
                                "visibility": true,
                                "svgIcon": "common/icons/cmdFilter24.svg",
                                "tooltip": dataToSave.filterName,
                                "onClickCallback": vm.onFilterChange,
                                "data": dataToSave
                            };
                            vm.commandButtons.bar[4].visibility = true;
                            globalDialogService.hide();
                        }

                    }
                },
                {
                    id: "cancel",
                    displayName: $translate.instant('filterPanel.cancel'),
                    onClickCallback: function () {
                        globalDialogService.hide();
                    }
                }
            ];
        }

        //This method is used to retain the data entered in filters even after the panel is closed or the state is changed
        function retainFilterData() {
            filterPanelService.setPreviousFilterClauses({ id: vm.userPrefId, data: angular.copy(vm.filterData) });
        }

        function save() {
            getSavedFilters();
            if (!vm.savedFilters) {
                saveAs();
            } else {
                var index = _.findIndex(vm.savedFilters, function (filterData) {
                    return _.isEqual(filterData.filterName, vm.filterData.filterName);
                });
                if (index > -1) {
                    filterPersonalizationService.saveFilterClauses(vm.widget, vm.userPrefId, vm.filterData);
                    vm.commandButtons.bar[0].group[index].data = angular.copy(vm.filterData);
                } else {
                    saveAs();
                }
            }
        }

        function saveAs() {
            vm.dialogData = {
                title: $translate.instant('filterPanel.saveFilterAs'),
                templatedata: {
                    name: {
                        value: '',
                        placeholder: $translate.instant('filterPanel.filterName'),
                        validation: {
                            required: true,
                            pattern: "[A-Za-z0-9_]{3,25}",
                            patternInfo: $translate.instant('filterPanel.nameInfo')
                        }
                    },
                    description: {
                        value: '',
                        placeholder: $translate.instant('filterPanel.optionalDescription'),
                        validation: {
                            pattern: "[A-Za-z0-9_]{3,25}",
                            patternInfo: $translate.instant('filterPanel.descInfo')
                        }
                    },
                    onValidityChangeCallback: vm.onValidityChangeCallback
                },
                templateuri: 'common/widgets/filterPanel/save-filter-panel.html',
                buttons: vm.saveAsDialogButtons
            };
            globalDialogService.set(vm.dialogData);
            globalDialogService.show();
        }

        function clear() {
            vm.filterData.filterName = $translate.instant('filterPanel.newFilter');
            vm.filterData.description = "";
            vm.commandButtons.bar[4].visibility = false;
            for (var i = 0; i < vm.filterData.filterClauses.length; i++) {
                if (vm.filterData.filterClauses[i].widget === "sit-checkbox") {
                    vm.filterData.filterClauses[i].value.forEach(function (val) {
                        val.checked = false;
                    });
                } else if ((vm.filterData.filterClauses[i].widget === "sit-multi-select" || vm.filterData.filterClauses[i].widget === "sit-advanced-select")
                    && vm.filterData.filterClauses[i].widgetAttributes) {
                    vm.filterData.filterClauses[i].widgetAttributes["sit-selected-string"] = '';
                    if (vm.filterData.filterClauses[i].widgetAttributes["sit-options"].length) {

                        for (var j = 0; j < vm.filterData.filterClauses[i].widgetAttributes["sit-options"].length; j++) {
                            vm.filterData.filterClauses[i].widgetAttributes["sit-options"][j].selected = false;
                            vm.filterData.filterClauses[i].widgetAttributes["sit-options"][j].value = false;
                        }

                    }
                }
                else {
                    vm.filterData.filterClauses[i].value = "";
                }
            }
        }

        function onValidityChangeCallback(formState) {
            if (formState && formState.isValid) {
                vm.saveAsDialogButtons[0].disabled = false;
            } else {
                vm.saveAsDialogButtons[0].disabled = true;
            }
        }

        function deleteFilter() {
            var index = _.findIndex(vm.commandButtons.bar[0].group, function (filterData) {
                return _.isEqual(filterData.data.filterName, vm.filterData.filterName);
            });

            if (index > -1) {
                vm.commandButtons.bar[0].group.splice(index, 1);
            }
            filterPersonalizationService.deleteFilterClauses(vm.widget, vm.userPrefId, vm.filterData);
            vm.clear();
        }

        function getSavedFilters() {
            vm.savedFilters = filterPersonalizationService.retrieveFilterClauses(vm.widget, vm.userPrefId);
        }

        function setFilterList() {
            if (vm.savedFilters && vm.savedFilters.length) {
                vm.savedFilters.forEach(function (filterData) {
                    vm.commandButtons.bar[0].group[vm.commandButtons.bar[0].group.length] = {
                        "label": filterData.filterName,
                        "type": "Command",
                        "name": filterData.filterName,
                        "visibility": true,
                        "svgIcon": "common/icons/cmdFilter24.svg",
                        "tooltip": filterData.filterName,
                        "data": filterData,
                        "onClickCallback": vm.onFilterChange
                    };
                });
            }

            if (!vm.isDataRetainEnabled) {
                clear();
                return;
            }

            var filter = filterPanelService.getPreviousFilterClauses(vm.userPrefId);
            if (filter && filter.data && Object.keys(filter.data).length) {
                clear();
                $timeout(function () {
                    setFilterClauses(filter.data);
                }, 1000)
            } else {
                clear();
            }
        }

        function onFilterChange() {
            vm.commandButtons.bar[4].visibility = true;
            var filterData = angular.copy(arguments[0].data);
            $rootScope.$broadcast('save-filter-opened', filterData);
            setFilterClauses(filterData);
        }

        function setFilterClauses(filterData) {
            vm.filterData.filterName = filterData.filterName;
            vm.filterData.description = filterData.description;
            for (var i = 0; i < filterData.filterClauses.length; i++) {
                if (vm.filterData.filterClauses[i].value === "" || vm.filterData.filterClauses[i].value === undefined) {
                    if ((vm.filterData.filterClauses[i].widget === "sit-multi-select" ||
                        vm.filterData.filterClauses[i].widget === "sit-advanced-select")
                        && vm.filterData.filterClauses[i].hasOwnProperty("widgetAttributes")) {
                        vm.filterData.filterClauses[i].widgetAttributes["sit-selected-string"] = filterData.filterClauses[i].widgetAttributes["sit-selected-string"];
                        if (vm.filterData.filterClauses[i].widgetAttributes["sit-options"].length) {
                            vm.filterData.filterClauses[i].widgetAttributes["sit-options"] = angular.copy(filterData.filterClauses[i].widgetAttributes["sit-options"]);
                        }
                    } else {
                        vm.filterData.filterClauses[i].value = filterData.filterClauses[i].value;
                    }
                }
                else {
                    if (vm.filterData.filterClauses[i].widget === "sit-checkbox") {
                        filterData.filterClauses[i].value.forEach(function (val, index) {
                            vm.filterData.filterClauses[i].value[index].checked = val.checked;
                        });
                    } else {
                        vm.filterData.filterClauses[i].value = filterData.filterClauses[i].value;
                    }
                }
            }
        }

        function apply(values) {
            vm.retainFilterData();
            var applyFilterData = [];
            var value;
            values.forEach(function (field) {
                if ((field.value !== '' && field.value !== undefined) || (field.widgetAttributes && field.widgetAttributes["sit-selected-string"] !== ''
                    && field.widgetAttributes["sit-selected-string"] !== undefined)) {
                    if (field.widget === 'sit-select') {
                        value = field.value[field.toKeep];
                    } else if (field.widget === 'sit-checkbox') {
                        value = field.value[0].checked;
                    } else if (field.widget === 'sit-multi-select' || field.widget === 'sit-advanced-select') {
                        value = field.widgetAttributes["sit-selected-string"];
                    } else if (field.widget === 'sit-entity-picker') {
                        value = field.value[field.toKeep] || field.value[field.field];
                    } else {
                        value = field.value;
                    }

                    applyFilterData[applyFilterData.length] = {
                        "filterField": field,
                        "value": value,
                        "widget": field.widget,
                        "andOr": "and",
                        "operator": "=",
                        "matchCase": false,
                        "showValueField": false
                    };
                    value = '';
                }
            });

            if (vm.data.onApplyCallback) {
                vm.data.onApplyCallback(applyFilterData, vm.filterData.filterName);
            } else {
                vm.data.defaultApplyCallback && vm.data.defaultApplyCallback(applyFilterData, vm.filterData.filterName);
            }
            $scope.$emit('sit-filter.apply');
        }

        function reset() {
            var applyFilterData = [];
            vm.clear();
            filterPanelService.setPreviousFilterClauses({ id: vm.userPrefId, data: {} });
            if (vm.data.onResetCallback) {
                vm.data.onResetCallback(applyFilterData);
            } else {
                vm.data.defaultApplyCallback && vm.data.defaultApplyCallback(applyFilterData);
            }
            $scope.$emit('sit-filter.reset');
        }

        function showErrorMessage() {
            vm.overlay = {
                text: $translate.instant('filterPanel.overlay.text'),
                title: $translate.instant('filterPanel.overlay.title'),
                buttons: [{
                    id: 'okButton',
                    displayName: $translate.instant('filterPanel.overlay.displayName'),
                    onClickCallback: function () {
                        messageOverlayService.hide();
                        globalDialogService.show();
                    }
                }]
            };
            messageOverlayService.set(vm.overlay);
            messageOverlayService.show();
        }
    }
})();

(function () {
    'use strict';

    function FilterPanel() {
        this.filterData = [];

        this.setPreviousFilterClauses = setPreviousFilterClauses;
        this.getPreviousFilterClauses = getPreviousFilterClauses;
        /**
       * @ngdoc method
       * @access internal
       * @name common.filterPanel.filterPanelService#setPreviousFilterClauses
       * @module siemens.simaticit.common.widgets.filterPanel
       * @description Saves a copy of the filter data entered so that if the panel is closed and reopened the panel retains the data.
       * @param {Object} filter data object.
       */
        function setPreviousFilterClauses(filter) {
            var index = _.findIndex(this.filterData, function (item) { return item.id === filter.id });
            if (index === -1) {
                this.filterData.push(filter);
            } else {
                this.filterData[index].data = filter.data;
            }
        }

        /**
    * @ngdoc method
    * @access internal
    * @name common.filterPanel.filterPanelService#getPreviousFilterClauses
    * @module siemens.simaticit.common.widgets.filterPanel
    * @description Returns a copy of the filter data entered previously before closing the panel, so that when the panel is reopened the data is retained.
    */
        function getPreviousFilterClauses(id) {
            var index = _.findIndex(this.filterData, function (item) { return item.id === id });
            if (index === -1) {
                return
            }
            return angular.copy(this.filterData[index]);
        }


    }

    angular.module('siemens.simaticit.common.widgets.filterPanel').service('common.filterPanel.filterPanelService', [FilterPanel]);
})();
