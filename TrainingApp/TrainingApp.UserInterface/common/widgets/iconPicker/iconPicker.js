/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.iconPicker
    *
    * @description
    * This module provides functionalities for selecting an icon from a predefined list of font awesome and sit icons.
    */

    angular.module('siemens.simaticit.common.widgets.iconPicker', []);

})();

/// <reference path="icon-selection-template.html" />
(function () {
    'use strict'

    var app = angular.module('siemens.simaticit.common.widgets.iconPicker');

    /**
     * @ngdoc directive
     * @name sitIconPicker
     * @module siemens.simaticit.common.widgets.iconPicker
     * @description
     * The **iconpicker** is a widget that is used to select an icon from a predefined list of font-awesome, sit and SVG icons.
     *
     * When a user types 'fa ', the widget shows the list of font awesome icons.
     * Typing 'sit ', will list all the sit icons.
     * Typing 'svg ' will list all the svg icons.
     *
     * In case of font-awesome icons addition to the class of the icon selected, additional classes can also be specified in the text box, to modify the appearance of the icon.
       The user will need to have knowledge on
     * what classes will work with the icon specified. <br>
     * For eg: Using **fa-stack** with a font-awesome icon in icon picker will not be a valid scenario as **fa-stack** is meant for stacking more than one icons.
     *
     * You can find more details on the font-awesome classes to be used at the <a href= 'http://fontawesome.io/examples'> Font Awesome</a> website.
     * Apart from this, you may also specify custom classes that are loaded in custom css files. This will work like any other css classes.
     *
     * @usage
     * As an element:
     * ```
     * <sit-icon-picker sit-id="iconPickerID" sit-limit="limit" sit-selected-object="selectedObject" sit-restrict = 'svg sit'  sit-validation="validation"
     *        ng-blur="ngBlur" ng-change="ngChange" ng-disabled="ngDisabled" ng-focus="ngFocus" ng-readonly="ngReadonly">
     * </sit-icon-picker>
     *
     * ```
     * @restrict E
     * @param {String} sit-id Unique identifier of the icon picker.
     * @param {Object} [sit-selected-object] _(Optional)_ Default entity selected when the page is loaded. Updated when the user selects another entity.
     * Object should of the format: { icon : 'icon-name'}.
     *```
     * eg: var selectedObject = { icon: "fa-book" }
     *```
     * @param {String} sit-value Value of the icon picker widget, i.e the name of the icon selected
     * @param {Number} [sit-limit=8] _(Optional)_ Maximum number of icons to be displayed. <br> **Note:** If the specified limit is more than 50 ,
     * performance issues maybe observed in some browsers. The recommended limit is 50 and below.
     * @param {ValidationModel} sit-validation See {@link ValidationModel}.
     * @param {string} [ng-blur] _(Optional)_ An expression to evaluate on blur event.
     * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
     * @param {string} [ng-focus] _(Optional)_ An expression to evaluate on focus event.
     * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
     * @param {Bool} sit-read-only Specifies if the property is editable.
     * @param {string} [sit-restrict] _(Optional)_ Specifies the type of icons that has to be listed in the widget.
       It is a space separated string which can contain the following values :
     * 'fa' - for fontawesome
     * 'sit' - for sit icons
     * 'svg' - for SVG icons.
     * If the user wants to restrict the widget to list only certain type of SVG icons, then the following dot separated string must be used.
     * 'svg.cmd.indicator.type' or 'svg.indicator' to restrict only indicator icons.
     * @param {Bool} sit-required _(Deprecated)_ Specifies if the property is mandatory or not. **Note:** If ctrl.sitValidation.required is defined,
     * it will override ctrl.sitRequired value. (default:false)
     *
     * @example
     * In a view template, the `sit-icon-picker` directive is used as follows:
     *
     * ```
     * <sit-icon-picker sit-id="id" ng-disabled="false" ng-blur="true" sit-limit="50"
                          sit-required="true" sit-validation ="validation"/>
     * ```
     *
     **/


    function sitIconPicker() {
        return {
            restrict: 'E',
            scope: {},
            bindToController:
            {
                id: "=?sitId",
                restrict: "=?sitRestrict",
                readOnly: '=?sitReadOnly',
                selectedObject: "=?sitSelectedObject",
                value: "=?sitValue",
                limit: "=?sitLimit",
                validation: "=?sitValidation",
                ngBlur: '&?',
                ngDisabled: '=?',
                ngFocus: '&?',
                ngReadonly: '=?',
                required: '=?sitRequired'
            },
            controller: IconPickerController,
            controllerAs: 'iconPickerCtrl',
            templateUrl: 'common/widgets/iconPicker/iconPicker.html'
        }
    }

    IconPickerController.$inject = ['$scope', '$translate', "common.graph.fontAwesomIconData", "common.iconPicker.sitIconData", "common.iconPicker.sitIconSvgData", "$timeout"];
    function IconPickerController($scope, $translate, fontawesomeData, sitIconsData, sitIconSvgData, $timeout) {
        var SIT_ICON_LIMIT = 50;
        var vm = this;
        vm.editable = true;
        vm.valueChanged = valueChanged;
        vm.limit = vm.limit === parseInt(vm.limit, 10) ? vm.limit : SIT_ICON_LIMIT;
        vm.templateUrl = 'common/widgets/iconPicker/icon-selection-template.html';
        var dataSourceArray = [];

        //startsWith Polyfill
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (search, pos) {
                return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
            };
        }

        if (vm.restrict) {
            var restrictItems = vm.restrict.split(" ");
            var index = restrictItems.indexOf("fa");
            if (index !== -1) {
                dataSourceArray = dataSourceArray.concat(loadFontAwesome());
            }
            index = restrictItems.indexOf("sit");
            if (index !== -1) {
                dataSourceArray = dataSourceArray.concat(loadSit());
            }
            var svgItem = _.find(restrictItems, function (item) {
                if (item.startsWith("svg")) {
                    return item;
                } else {
                    return null;
                }
            });
            if (svgItem) {
                var filter = svgItem.split('.');
                dataSourceArray = dataSourceArray.concat(loadSvg(filter.length > 1 ? filter : undefined));
            }
        } else {
            dataSourceArray = dataSourceArray.concat(loadFontAwesome());
            dataSourceArray = dataSourceArray.concat(loadSit());
            dataSourceArray = dataSourceArray.concat(loadSvg());
        }
        vm.datasource = dataSourceArray;
        vm.selectedAttributeToDisplay = 'text';
        vm.placeholder = $translate.instant('iconPicker.defaultPlaceHolder');

        if (vm.selectedObject && vm.selectedObject.icon) {
            vm.value = vm.selectedObject.icon;
        }

        $scope.$watch(function () { return vm.value }, function (oldValue, newValue) {
            if (oldValue && newValue && oldValue === newValue) {
                vm.selectedObject = _.find(vm.datasource, function (item) { return item.text === newValue; });
            }
        });

        $scope.$on('sit-entity-picker.entity-selected', function (event, data) {
            // $timeout is used to wait for the entity picker to complete its watch cycle.
            $timeout(function () {
                vm.value = data.model.text;
            }, 50);
        });

        function valueChanged(oldVal, newVal) {
            vm.value = newVal;
            $scope.$emit('sit-icon-picker-icon-selected', { icon: vm.value });
        }

        function loadFontAwesome() {
            var fa = fontawesomeData.fontAwesomIcon;
            _.map(fontawesomeData.fontAwesomIcon, function (item) {
                item.type = 'fa';
                item.text = item.icon;
            });
            return fa;
        }
        function loadSit() {
            var sit = sitIconsData.sitIcon;
            _.map(sitIconsData.sitIcon, function (item) {
                item.type = 'sit'
                item.text = item.icon;
            });
            return sit;
        }
        function loadSvg(filterList) {
            var svg;
            if (filterList && filterList.length > 1) {
                filterList.shift();
                svg = _.filter(sitIconSvgData.sitIcons, function (item) {
                    return _.contains(filterList, item.iconType);
                });
            } else {
                svg = sitIconSvgData.sitIcons;
                _.map(sitIconSvgData.sitIcons, function (item) {
                    item.type = 'svg'
                });
            }

            return svg;
        }

    }

    app.directive('sitIconPicker', [sitIconPicker]);

})();

(function () {
    "use strict";

    /**
    * @ngdoc service
    * @name common.iconPicker.sitIconData
    * @module siemens.simaticit.common.widgets.iconPicker
    *
    * @description
    * This service provides a list of icon names. It includes sit icons and all types of SVG icons(command, indicator and type icons).
    *
    */
    var sitIconJson = {
        "sitIcon": [
            { "icon": "sit sit-active" },
            { "icon": "sit sit-active-circle" },
            { "icon": "sit sit-anchor-up" },
            { "icon": "sit sit-application" },
            { "icon": "sit sit-assign" },
            { "icon": "sit sit-associate" },
            { "icon": "sit sit-available" },
            { "icon": "sit sit-batch" },
            { "icon": "sit sit-robot" },
            { "icon": "sit sit-bi-solution" },
            { "icon": "sit sit-bom" },
            { "icon": "sit sit-business-logic-distribution" },
            { "icon": "sit sit-calendar" },
            { "icon": "sit sit-certification" },
            { "icon": "sit sit-cnc-program" },
            { "icon": "sit sit-component" },
            { "icon": "sit sit-custom-time-aggregation" },
            { "icon": "sit sit-data-gateway" },
            { "icon": "sit sit-data-warehouse-project" },
            { "icon": "sit sit-deploy" },
            { "icon": "sit sit-disable" },
            { "icon": "sit sit-doc-center" },
            { "icon": "sit sit-document" },
            { "icon": "sit sit-drag" },
            { "icon": "sit sit-engineering" },
            { "icon": "sit sit-enterprise" },
            { "icon": "sit sit-event-subscription" },
            { "icon": "sit sit-ewi" },
            { "icon": "sit sit-ewi-document" },
            { "icon": "sit sit-export" },
            { "icon": "sit sit-field" },
            { "icon": "sit sit-flow" },
            { "icon": "sit sit-flows" },
            { "icon": "sit sit-form" },
            { "icon": "sit sit-freeze" },
            { "icon": "sit sit-functionality" },
            { "icon": "sit sit-grid" },
            { "icon": "sit sit-hold" },
            { "icon": "sit sit-holiday" },
            { "icon": "sit sit-holiday-set" },
            { "icon": "sit sit-identifier-format" },
            { "icon": "sit sit-import" },
            { "icon": "sit sit-in-progress" },
            { "icon": "sit sit-items" },
            { "icon": "sit sit-kpi" },
            { "icon": "sit sit-layout" },
            { "icon": "sit sit-log" },
            { "icon": "sit sit-machine" },
            { "icon": "sit sit-management" },
            { "icon": "sit sit-measure" },
            { "icon": "sit sit-model" },
            { "icon": "sit sit-monitoring" },
            { "icon": "sit sit-obsolete" },
            { "icon": "sit sit-ontology" },
            { "icon": "sit sit-ontology-alt" },
            { "icon": "sit sit-package-administration" },
            { "icon": "sit sit-parts-and-products" },
            { "icon": "sit sit-push" },
            { "icon": "sit sit-push-alt" },
            { "icon": "sit sit-release" },
            { "icon": "sit sit-resize" },
            { "icon": "sit sit-routing-alt" },
            { "icon": "sit sit-routing" },
            { "icon": "sit sit-scrap" },
            { "icon": "sit sit-section" },
            { "icon": "sit sit-set" },
            { "icon": "sit sit-site" },
            { "icon": "sit sit-skills" },
            { "icon": "sit sit-smart-navigation" },
            { "icon": "sit sit-sn" },
            { "icon": "sit sit-sn-change" },
            { "icon": "sit sit-solution" },
            { "icon": "sit sit-solution-repository" },
            { "icon": "sit sit-source" },
            { "icon": "sit sit-stackable-access" },
            { "icon": "sit sit-stackable-add" },
            { "icon": "sit sit-stackable-bkg" },
            { "icon": "sit sit-stackable-config" },
            { "icon": "sit sit-stackable-deploy" },
            { "icon": "sit sit-stackable-edit" },
            { "icon": "sit sit-stackable-enable" },
            { "icon": "sit sit-stackable-intelligence" },
            { "icon": "sit sit-stackable-machine" },
            { "icon": "sit sit-stackable-management" },
            { "icon": "sit sit-stackable-ok" },
            { "icon": "sit sit-stackable-operation" },
            { "icon": "sit sit-stackable-order" },
            { "icon": "sit sit-stackable-reason" },
            { "icon": "sit sit-stackable-remove" },
            { "icon": "sit sit-stackable-set" },
            { "icon": "sit sit-stackable-setting" },
            { "icon": "sit sit-stackable-show" },
            { "icon": "sit sit-stackable-activate" },
            { "icon": "sit sit-stackable-time" },
            { "icon": "sit sit-stackable-source" },
            { "icon": "sit sit-system-configuration" },
            { "icon": "sit sit-tasklist" },
            { "icon": "sit sit-time-period" },
            { "icon": "sit sit-time-slice" },
            { "icon": "sit sit-time-slice-category" },
            { "icon": "sit sit-tools" },
            { "icon": "sit sit-ui" },
            { "icon": "sit sit-ui-application" },
            { "icon": "sit sit-ui-component" },
            { "icon": "sit sit-ui-module" },
            { "icon": "sit sit-ui-module-mashup" },
            { "icon": "sit sit-ui-screen" },
            { "icon": "sit sit-unassign" },
            { "icon": "sit sit-unset" },
            { "icon": "sit sit-update" },
            { "icon": "sit sit-user" },
            { "icon": "sit sit-user-group" },
            { "icon": "sit sit-user-id" },
            { "icon": "sit sit-user-role" },
            { "icon": "sit sit-work" },
            { "icon": "sit sit-worker-role" },
            { "icon": "sit sit-working-aggregation-type" },
            { "icon": "sit sit-working-pattern" },
            { "icon": "sit sit-work-order" },
            { "icon": "sit sit-work-schedule-rule" },
            { "icon": "sit sit-pi-boop-item-material-create-from-bom" },
            { "icon": "sit sit-pi-boop-item-material-list" },
            { "icon": "sit sit-pi-boop-item-param-association" },
            { "icon": "sit sit-pi-boop-item-param-list" },
            { "icon": "sit sit-pi-boop-items-list" },
            { "icon": "sit sit-pi-material-behavior-set" },
            { "icon": "sit sit-pi-material-bom-set" },
            { "icon": "sit sit-pi-material-contribution" },
            { "icon": "sit sit-pi-material-requirement-create-from-bom" },
            { "icon": "sit sit-pi-mtu-create" },
            { "icon": "sit sit-pi-mtu-details" },
            { "icon": "sit sit-pi-mtu-filtered-list" },
            { "icon": "sit sit-pi-mtu-history" },
            { "icon": "sit sit-pi-mtu-move" },
            { "icon": "sit sit-pi-work-master-content" },
            { "icon": "sit sit-pi-work-master-create" },
            { "icon": "sit sit-pi-work-master-details" },
            { "icon": "sit sit-pi-work-master-filtered-list" },
            { "icon": "sit sit-pi-work-master-header-parameter-list" },
            { "icon": "sit sit-pi-work-order-context" },
            { "icon": "sit sit-pi-work-order-create" },
            { "icon": "sit sit-pi-work-order-details" },
            { "icon": "sit sit-pi-work-order-filtered-list" },
            { "icon": "sit sit-pi-work-order-header-parameters" },
            { "icon": "sit sit-pi-work-order-operation" },
            { "icon": "sit sit-pi-work-order-operation-material-list" },
            { "icon": "sit sit-pi-work-order-operation-param-list" },
            { "icon": "sit sit-workflow-alt" },
            { "icon": "sit sit-workflow-template" }
        ]
    };
    angular.module('siemens.simaticit.common.widgets.iconPicker').value("common.iconPicker.sitIconData", sitIconJson);

    var sitIconSvgJson = {
        "sitIcons": [
            {
                "iconType": "cmd",
                "text": "svg cmd3DPrinter24",
                "icon": "common/icons/cmd3DPrinter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmd3DView24",
                "icon": "common/icons/cmd3DView24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmd5Why24",
                "icon": "common/icons/cmd5Why24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmd8DReport24",
                "icon": "common/icons/cmd8DReport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAccount24",
                "icon": "common/icons/cmdAccount24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAcknowledgment24",
                "icon": "common/icons/cmdAcknowledgment24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAct24",
                "icon": "common/icons/cmdAct24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAction24",
                "icon": "common/icons/cmdAction24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdActionAdd24",
                "icon": "common/icons/cmdActionAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdActivate24",
                "icon": "common/icons/cmdActivate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdActivateRule24",
                "icon": "common/icons/cmdActivateRule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdActivateRuleSchedule24",
                "icon": "common/icons/cmdActivateRuleSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAdd16",
                "icon": "common/icons/cmdAdd16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAdd24",
                "icon": "common/icons/cmdAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAddAction24",
                "icon": "common/icons/cmdAddAction24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAddDocument24",
                "icon": "common/icons/cmdAddDocument24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAddFromEquipment24",
                "icon": "common/icons/cmdAddFromEquipment24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAddFromEquipmentGroup24",
                "icon": "common/icons/cmdAddFromEquipmentGroup24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAddFromOrder24",
                "icon": "common/icons/cmdAddFromOrder24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAddNewChild24",
                "icon": "common/icons/cmdAddNewChild24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAddNewFirstLevel24",
                "icon": "common/icons/cmdAddNewFirstLevel24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAdHoc24",
                "icon": "common/icons/cmdAdHoc24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAdmin24",
                "icon": "common/icons/cmdAdmin24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAlertClear24",
                "icon": "common/icons/cmdAlertClear24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAlertEdit24",
                "icon": "common/icons/cmdAlertEdit24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAlertRefresh24",
                "icon": "common/icons/cmdAlertRefresh24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAlerts24",
                "icon": "common/icons/cmdAlerts24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAlertWindow24",
                "icon": "common/icons/cmdAlertWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAlignTop24",
                "icon": "common/icons/cmdAlignTop24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAnimate24",
                "icon": "common/icons/cmdAnimate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAppInstall24",
                "icon": "common/icons/cmdAppInstall24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdApplySchedule24",
                "icon": "common/icons/cmdApplySchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAppManagement24",
                "icon": "common/icons/cmdAppManagement24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAppReload24",
                "icon": "common/icons/cmdAppReload24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAppRemove24",
                "icon": "common/icons/cmdAppRemove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAppUpdate24",
                "icon": "common/icons/cmdAppUpdate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdArchive24",
                "icon": "common/icons/cmdArchive24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAsBuilt24",
                "icon": "common/icons/cmdAsBuilt24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAssignGroupToRole24",
                "icon": "common/icons/cmdAssignGroupToRole24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAssignLot24",
                "icon": "common/icons/cmdAssignLot24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAssociateRole24",
                "icon": "common/icons/cmdAssociateRole24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAuditTrail24",
                "icon": "common/icons/cmdAuditTrail24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAutomationChannel24",
                "icon": "common/icons/cmdAutomationChannel24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdAutomationNodeTemplate24",
                "icon": "common/icons/cmdAutomationNodeTemplate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBack24",
                "icon": "common/icons/cmdBack24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBackwards24",
                "icon": "common/icons/cmdBackwards24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBarcode24",
                "icon": "common/icons/cmdBarcode24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBarcodeSet24",
                "icon": "common/icons/cmdBarcodeSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBarcodeUnset24",
                "icon": "common/icons/cmdBarcodeUnset24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBidirectionalSchedule24",
                "icon": "common/icons/cmdBidirectionalSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBoardDefect24",
                "icon": "common/icons/cmdBoardDefect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBrush24",
                "icon": "common/icons/cmdBrush24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBufferAdd24",
                "icon": "common/icons/cmdBufferAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBuild24",
                "icon": "common/icons/cmdBuild24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBuildForce24",
                "icon": "common/icons/cmdBuildForce24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdBuyOffNotification24",
                "icon": "common/icons/cmdBuyOffNotification24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdByWeight24",
                "icon": "common/icons/cmdByWeight24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCalendar16",
                "icon": "common/icons/cmdCalendar16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCalendar24",
                "icon": "common/icons/cmdCalendar24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCalendarTemplate24",
                "icon": "common/icons/cmdCalendarTemplate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCancel24",
                "icon": "common/icons/cmdCancel24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCancelHighlight24",
                "icon": "common/icons/cmdCancelHighlight24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCardId24",
                "icon": "common/icons/cmdCardId24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCauseAdd24",
                "icon": "common/icons/cmdCauseAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCertificate24",
                "icon": "common/icons/cmdCertificate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCertificateExecution24",
                "icon": "common/icons/cmdCertificateExecution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChangeCategory24",
                "icon": "common/icons/cmdChangeCategory24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChangeCurrency24",
                "icon": "common/icons/cmdChangeCurrency24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChangeManagement24",
                "icon": "common/icons/cmdChangeManagement24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChangeManagementNotification24",
                "icon": "common/icons/cmdChangeManagementNotification24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChangeSequence24",
                "icon": "common/icons/cmdChangeSequence24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChangeSerialNumber24",
                "icon": "common/icons/cmdChangeSerialNumber24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCheckbox24",
                "icon": "common/icons/cmdCheckbox24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCheckboxUnchecked24",
                "icon": "common/icons/cmdCheckboxUnchecked24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCheckConsistency24",
                "icon": "common/icons/cmdCheckConsistency24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChecklist16",
                "icon": "common/icons/cmdChecklist16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChecklist24",
                "icon": "common/icons/cmdChecklist24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCheckmark16",
                "icon": "common/icons/cmdCheckmark16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCheckmark24",
                "icon": "common/icons/cmdCheckmark24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdChildPartial24",
                "icon": "common/icons/cmdChildPartial24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdClauseGroup24",
                "icon": "common/icons/cmdClauseGroup24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdClauseUngroup24",
                "icon": "common/icons/cmdClauseUngroup24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdClearForm24",
                "icon": "common/icons/cmdClearForm24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdClearSchedule24",
                "icon": "common/icons/cmdClearSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCloseComparativeSchedule24",
                "icon": "common/icons/cmdCloseComparativeSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdClosePanel24",
                "icon": "common/icons/cmdClosePanel24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCollect24",
                "icon": "common/icons/cmdCollect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdComponentIndexer24",
                "icon": "common/icons/cmdComponentIndexer24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCompress24",
                "icon": "common/icons/cmdCompress24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCompressOverview24",
                "icon": "common/icons/cmdCompressOverview24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdConfigureFilter24",
                "icon": "common/icons/cmdConfigureFilter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdConnection24",
                "icon": "common/icons/cmdConnection24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdContainerAttribute24",
                "icon": "common/icons/cmdContainerAttribute24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdControlPlan16",
                "icon": "common/icons/cmdControlPlan16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdControlPlan24",
                "icon": "common/icons/cmdControlPlan24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCopy24",
                "icon": "common/icons/cmdCopy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCopyOfSchedule24",
                "icon": "common/icons/cmdCopyOfSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCriteria24",
                "icon": "common/icons/cmdCriteria24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCurrentDate24",
                "icon": "common/icons/cmdCurrentDate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCurve24",
                "icon": "common/icons/cmdCurve24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdCut24",
                "icon": "common/icons/cmdCut24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDatabase24",
                "icon": "common/icons/cmdDatabase24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDatabaseUpdate24",
                "icon": "common/icons/cmdDatabaseUpdate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDataCollection24",
                "icon": "common/icons/cmdDataCollection24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDataFromDisk24",
                "icon": "common/icons/cmdDataFromDisk24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDataMigration24",
                "icon": "common/icons/cmdDataMigration24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDataResource24",
                "icon": "common/icons/cmdDataResource24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDataSourceEdit24",
                "icon": "common/icons/cmdDataSourceEdit24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDataTime24",
                "icon": "common/icons/cmdDataTime24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDelete16",
                "icon": "common/icons/cmdDelete16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDelete24",
                "icon": "common/icons/cmdDelete24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDeletePicture24",
                "icon": "common/icons/cmdDeletePicture24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDependencyAdd24",
                "icon": "common/icons/cmdDependencyAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDependencyRemove24",
                "icon": "common/icons/cmdDependencyRemove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDeploy24",
                "icon": "common/icons/cmdDeploy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDiagram24",
                "icon": "common/icons/cmdDiagram24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDiagramAdd24",
                "icon": "common/icons/cmdDiagramAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDiagramExport24",
                "icon": "common/icons/cmdDiagramExport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDiagramImport24",
                "icon": "common/icons/cmdDiagramImport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDisableWorkspaceTooltips24",
                "icon": "common/icons/cmdDisableWorkspaceTooltips24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDisplayColor16",
                "icon": "common/icons/cmdDisplayColor16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDisposition24",
                "icon": "common/icons/cmdDisposition24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDistribute24",
                "icon": "common/icons/cmdDistribute24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDocument24",
                "icon": "common/icons/cmdDocument24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDocumentPreview24",
                "icon": "common/icons/cmdDocumentPreview24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDocumentSection24",
                "icon": "common/icons/cmdDocumentSection24.svg"
            }, {
                "iconType": "cmddomain",
                "text": "svg cmddomain16",
                "icon": "common/icons/cmddomain16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDownload24",
                "icon": "common/icons/cmdDownload24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDueDateOrder24",
                "icon": "common/icons/cmdDueDateOrder24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDueDateSet24",
                "icon": "common/icons/cmdDueDateSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdDuplicate24",
                "icon": "common/icons/cmdDuplicate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEarliestStartDateSet24",
                "icon": "common/icons/cmdEarliestStartDateSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEdit24",
                "icon": "common/icons/cmdEdit24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEditFilter24",
                "icon": "common/icons/cmdEditFilter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEditorWindow24",
                "icon": "common/icons/cmdEditorWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdElectronics24",
                "icon": "common/icons/cmdElectronics24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEllipse24",
                "icon": "common/icons/cmdEllipse24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEmptyStar24",
                "icon": "common/icons/cmdEmptyStar24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEquipment24",
                "icon": "common/icons/cmdEquipment24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEquipmentAdd24",
                "icon": "common/icons/cmdEquipmentAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEquipmentExecution24",
                "icon": "common/icons/cmdEquipmentExecution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEquipmentRemove24",
                "icon": "common/icons/cmdEquipmentRemove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEquipmentRuntime24",
                "icon": "common/icons/cmdEquipmentRuntime24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEquipmentSet24",
                "icon": "common/icons/cmdEquipmentSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEventSignal24",
                "icon": "common/icons/cmdEventSignal24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEwi24",
                "icon": "common/icons/cmdEwi24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdEwiExecution24",
                "icon": "common/icons/cmdEwiExecution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdExecGroupLink24",
                "icon": "common/icons/cmdExecGroupLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdExecGroupUnlink24",
                "icon": "common/icons/cmdExecGroupUnlink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdExitFullSizeVertical24",
                "icon": "common/icons/cmdExitFullSizeVertical24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdExpandAll24",
                "icon": "common/icons/cmdExpandAll24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdExpandNow24",
                "icon": "common/icons/cmdExpandNow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdExport24",
                "icon": "common/icons/cmdExport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdExportSchedule24",
                "icon": "common/icons/cmdExportSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFieldChoose24",
                "icon": "common/icons/cmdFieldChoose24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFile24",
                "icon": "common/icons/cmdFile24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFileText24",
                "icon": "common/icons/cmdFileText24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilledStar24",
                "icon": "common/icons/cmdFilledStar24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilter24",
                "icon": "common/icons/cmdFilter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilterExclude24",
                "icon": "common/icons/cmdFilterExclude24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilterGroup24",
                "icon": "common/icons/cmdFilterGroup24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilterHighlight24",
                "icon": "common/icons/cmdFilterHighlight24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilterInclude24",
                "icon": "common/icons/cmdFilterInclude24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilterRecords24",
                "icon": "common/icons/cmdFilterRecords24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFilterRemove24",
                "icon": "common/icons/cmdFilterRemove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFind24",
                "icon": "common/icons/cmdFind24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFitToWindow24",
                "icon": "common/icons/cmdFitToWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFlipVertical24",
                "icon": "common/icons/cmdFlipVertical24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFlow24",
                "icon": "common/icons/cmdFlow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFMEAFailureSpecificationAdd24",
                "icon": "common/icons/cmdFMEAFailureSpecificationAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFMEASystemElementSpecificationLink24",
                "icon": "common/icons/cmdFMEASystemElementSpecificationLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdForwards24",
                "icon": "common/icons/cmdForwards24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFreeze24",
                "icon": "common/icons/cmdFreeze24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFullSizeVertical24",
                "icon": "common/icons/cmdFullSizeVertical24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdFunctionality24",
                "icon": "common/icons/cmdFunctionality24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGageSelection24",
                "icon": "common/icons/cmdGageSelection24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGanttWindow24",
                "icon": "common/icons/cmdGanttWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGenealogy24",
                "icon": "common/icons/cmdGenealogy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGeneral24",
                "icon": "common/icons/cmdGeneral24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGenerateSchedules24",
                "icon": "common/icons/cmdGenerateSchedules24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGenericComponent24",
                "icon": "common/icons/cmdGenericComponent24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGoToElement24",
                "icon": "common/icons/cmdGoToElement24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGraph24",
                "icon": "common/icons/cmdGraph24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGripper16",
                "icon": "common/icons/cmdGripper16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGroup24",
                "icon": "common/icons/cmdGroup24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGroupBy24",
                "icon": "common/icons/cmdGroupBy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdGroupFilter24",
                "icon": "common/icons/cmdGroupFilter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdHelp24",
                "icon": "common/icons/cmdHelp24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdHide24",
                "icon": "common/icons/cmdHide24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdHistory24",
                "icon": "common/icons/cmdHistory24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdHome24",
                "icon": "common/icons/cmdHome24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdImport24",
                "icon": "common/icons/cmdImport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdImportFromProcess24",
                "icon": "common/icons/cmdImportFromProcess24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdInfo24",
                "icon": "common/icons/cmdInfo24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdInsert24",
                "icon": "common/icons/cmdInsert24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdInsertAfter24",
                "icon": "common/icons/cmdInsertAfter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdInsertBefore24",
                "icon": "common/icons/cmdInsertBefore24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdInsertPicture24",
                "icon": "common/icons/cmdInsertPicture24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdInterlockingCheckHistory24",
                "icon": "common/icons/cmdInterlockingCheckHistory24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdInteroperability24",
                "icon": "common/icons/cmdInteroperability24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdIshikawa24",
                "icon": "common/icons/cmdIshikawa24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLabelPrinter24",
                "icon": "common/icons/cmdLabelPrinter24.svg"
            }, {
                "iconType": "cmdlanguage",
                "text": "svg cmdlanguage16",
                "icon": "common/icons/cmdlanguage16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLanguage24",
                "icon": "common/icons/cmdLanguage24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLeaveTeam24",
                "icon": "common/icons/cmdLeaveTeam24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLibrary24",
                "icon": "common/icons/cmdLibrary24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLicenseAdd24",
                "icon": "common/icons/cmdLicenseAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLicenseImport24",
                "icon": "common/icons/cmdLicenseImport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLicenseRemove24",
                "icon": "common/icons/cmdLicenseRemove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLicenseSave24",
                "icon": "common/icons/cmdLicenseSave24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLine24",
                "icon": "common/icons/cmdLine24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLink24",
                "icon": "common/icons/cmdLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLinkNodeParameters24",
                "icon": "common/icons/cmdLinkNodeParameters24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdList16",
                "icon": "common/icons/cmdList16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdList24",
                "icon": "common/icons/cmdList24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdListBox16",
                "icon": "common/icons/cmdListBox16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdListBox24",
                "icon": "common/icons/cmdListBox24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdListBoxEdit24",
                "icon": "common/icons/cmdListBoxEdit24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdListView24",
                "icon": "common/icons/cmdListView24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLock24",
                "icon": "common/icons/cmdLock24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLockStructure24",
                "icon": "common/icons/cmdLockStructure24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLogEntry24",
                "icon": "common/icons/cmdLogEntry24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLoginCustom24",
                "icon": "common/icons/cmdLoginCustom24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLoginWindows24",
                "icon": "common/icons/cmdLoginWindows24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdLot24",
                "icon": "common/icons/cmdLot24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMachine24",
                "icon": "common/icons/cmdMachine24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMachineBroken24",
                "icon": "common/icons/cmdMachineBroken24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMachineBrokenLink24",
                "icon": "common/icons/cmdMachineBrokenLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMachineRepair24",
                "icon": "common/icons/cmdMachineRepair24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMachineRepairLink24",
                "icon": "common/icons/cmdMachineRepairLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMachineSelect24",
                "icon": "common/icons/cmdMachineSelect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMachineState24",
                "icon": "common/icons/cmdMachineState24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaintenance24",
                "icon": "common/icons/cmdMaintenance24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdManufactoring24",
                "icon": "common/icons/cmdManufactoring24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMashup24",
                "icon": "common/icons/cmdMashup24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMashupModuleGenerate24",
                "icon": "common/icons/cmdMashupModuleGenerate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMasterDetailsView24",
                "icon": "common/icons/cmdMasterDetailsView24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialAddFromBom24",
                "icon": "common/icons/cmdMaterialAddFromBom24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialAddFromLot24",
                "icon": "common/icons/cmdMaterialAddFromLot24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialAvailability24",
                "icon": "common/icons/cmdMaterialAvailability24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialBehaviourSet24",
                "icon": "common/icons/cmdMaterialBehaviourSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialBom24",
                "icon": "common/icons/cmdMaterialBom24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialContribution24",
                "icon": "common/icons/cmdMaterialContribution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialExplorerWindow24",
                "icon": "common/icons/cmdMaterialExplorerWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialHistoryExecution24",
                "icon": "common/icons/cmdMaterialHistoryExecution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialMigration24",
                "icon": "common/icons/cmdMaterialMigration24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialRequest24",
                "icon": "common/icons/cmdMaterialRequest24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialStorage24",
                "icon": "common/icons/cmdMaterialStorage24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialStorageDetails24",
                "icon": "common/icons/cmdMaterialStorageDetails24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaterialStorageHierarchy24",
                "icon": "common/icons/cmdMaterialStorageHierarchy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMaximiseVertically24",
                "icon": "common/icons/cmdMaximiseVertically24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMeasurementManagement24",
                "icon": "common/icons/cmdMeasurementManagement24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMenu24",
                "icon": "common/icons/cmdMenu24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMerge24",
                "icon": "common/icons/cmdMerge24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMergeLeft24",
                "icon": "common/icons/cmdMergeLeft24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMergeRight24",
                "icon": "common/icons/cmdMergeRight24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMilestone24",
                "icon": "common/icons/cmdMilestone24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMilestoneCheckAction24",
                "icon": "common/icons/cmdMilestoneCheckAction24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMilestoneTransition24",
                "icon": "common/icons/cmdMilestoneTransition24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMissingImage24",
                "icon": "common/icons/cmdMissingImage24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdModelItem24",
                "icon": "common/icons/cmdModelItem24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMore16",
                "icon": "common/icons/cmdMore16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMore24",
                "icon": "common/icons/cmdMore24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoreVertical24",
                "icon": "common/icons/cmdMoreVertical24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMousePointer24",
                "icon": "common/icons/cmdMousePointer24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMove24",
                "icon": "common/icons/cmdMove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoveFromEquipment24",
                "icon": "common/icons/cmdMoveFromEquipment24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoveRight24",
                "icon": "common/icons/cmdMoveRight24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoveToEquipment24",
                "icon": "common/icons/cmdMoveToEquipment24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoveToLocation24",
                "icon": "common/icons/cmdMoveToLocation24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoveToMTUAggregate24",
                "icon": "common/icons/cmdMoveToMTUAggregate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoveToPartAggregate24",
                "icon": "common/icons/cmdMoveToPartAggregate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMoveX24",
                "icon": "common/icons/cmdMoveX24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMultiline24",
                "icon": "common/icons/cmdMultiline24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdMultipleChoice24",
                "icon": "common/icons/cmdMultipleChoice24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNestedOnOff24",
                "icon": "common/icons/cmdNestedOnOff24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNonConformance24",
                "icon": "common/icons/cmdNonConformance24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNonConformanceBuyOff24",
                "icon": "common/icons/cmdNonConformanceBuyOff24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNonConformanceChangeManagement24",
                "icon": "common/icons/cmdNonConformanceChangeManagement24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNonConformanceQuality24",
                "icon": "common/icons/cmdNonConformanceQuality24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNonConformanceTravelling24",
                "icon": "common/icons/cmdNonConformanceTravelling24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNoteProperties24",
                "icon": "common/icons/cmdNoteProperties24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNotProductiveActivity24",
                "icon": "common/icons/cmdNotProductiveActivity24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNumberingPattern24",
                "icon": "common/icons/cmdNumberingPattern24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdNumericInput24",
                "icon": "common/icons/cmdNumericInput24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdObsolete24",
                "icon": "common/icons/cmdObsolete24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOpen24",
                "icon": "common/icons/cmdOpen24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOpenManageDataset24",
                "icon": "common/icons/cmdOpenManageDataset24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOperation24",
                "icon": "common/icons/cmdOperation24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOperationAssign24",
                "icon": "common/icons/cmdOperationAssign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOperationCatalog24",
                "icon": "common/icons/cmdOperationCatalog24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOperationUnassign24",
                "icon": "common/icons/cmdOperationUnassign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOperatorLanding24",
                "icon": "common/icons/cmdOperatorLanding24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOrder24",
                "icon": "common/icons/cmdOrder24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdOverviewWindow24",
                "icon": "common/icons/cmdOverviewWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPack24",
                "icon": "common/icons/cmdPack24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPackageAssociate24",
                "icon": "common/icons/cmdPackageAssociate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPackDetails24",
                "icon": "common/icons/cmdPackDetails24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdParallelWindow24",
                "icon": "common/icons/cmdParallelWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdParameterAssign24",
                "icon": "common/icons/cmdParameterAssign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdParametersAssign24",
                "icon": "common/icons/cmdParametersAssign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdParametersImport24",
                "icon": "common/icons/cmdParametersImport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdParameterUnassign24",
                "icon": "common/icons/cmdParameterUnassign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdParentBatch24",
                "icon": "common/icons/cmdParentBatch24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartAddFromBom24",
                "icon": "common/icons/cmdPartAddFromBom24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartAggregate24",
                "icon": "common/icons/cmdPartAggregate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartAssemble24",
                "icon": "common/icons/cmdPartAssemble24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartAssembleInput24",
                "icon": "common/icons/cmdPartAssembleInput24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartBom24",
                "icon": "common/icons/cmdPartBom24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartDefect24",
                "icon": "common/icons/cmdPartDefect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartDisassemble24",
                "icon": "common/icons/cmdPartDisassemble24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartition24",
                "icon": "common/icons/cmdPartition24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartLot24",
                "icon": "common/icons/cmdPartLot24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartLotAssign24",
                "icon": "common/icons/cmdPartLotAssign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartLotUnassign24",
                "icon": "common/icons/cmdPartLotUnassign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartPhantom24",
                "icon": "common/icons/cmdPartPhantom24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartReplace24",
                "icon": "common/icons/cmdPartReplace24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdParts24",
                "icon": "common/icons/cmdParts24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartSet24",
                "icon": "common/icons/cmdPartSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPartsExecution24",
                "icon": "common/icons/cmdPartsExecution24.svg"
            }, {
                "iconType": "cmdpassword",
                "text": "svg cmdpassword16",
                "icon": "common/icons/cmdpassword16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPaste24",
                "icon": "common/icons/cmdPaste24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPause24",
                "icon": "common/icons/cmdPause24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPauseArchiving24",
                "icon": "common/icons/cmdPauseArchiving24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPauseRuleSchedule24",
                "icon": "common/icons/cmdPauseRuleSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPencilSquare24",
                "icon": "common/icons/cmdPencilSquare24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPhysicalLocation24",
                "icon": "common/icons/cmdPhysicalLocation24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPickEntity16",
                "icon": "common/icons/cmdPickEntity16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPicker24",
                "icon": "common/icons/cmdPicker24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPin24",
                "icon": "common/icons/cmdPin24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPinDefect24",
                "icon": "common/icons/cmdPinDefect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPlayRuleSchedule24",
                "icon": "common/icons/cmdPlayRuleSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPlotWindow24",
                "icon": "common/icons/cmdPlotWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPlotWindowSetting24",
                "icon": "common/icons/cmdPlotWindowSetting24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPlugin24",
                "icon": "common/icons/cmdPlugin24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPowderMixing24",
                "icon": "common/icons/cmdPowderMixing24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPredefinitedWorkspaceOpen24",
                "icon": "common/icons/cmdPredefinitedWorkspaceOpen24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPrint24",
                "icon": "common/icons/cmdPrint24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPrintJobFile24",
                "icon": "common/icons/cmdPrintJobFile24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProblemSolvingProcess24",
                "icon": "common/icons/cmdProblemSolvingProcess24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProcess24",
                "icon": "common/icons/cmdProcess24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProcessCatalog24",
                "icon": "common/icons/cmdProcessCatalog24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProcessClone",
                "icon": "common/icons/cmdProcessClone.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProcessEvolve",
                "icon": "common/icons/cmdProcessEvolve.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProcessNotification24",
                "icon": "common/icons/cmdProcessNotification24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProductionConfiguration24",
                "icon": "common/icons/cmdProductionConfiguration24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProject24",
                "icon": "common/icons/cmdProject24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProjectChecklist16",
                "icon": "common/icons/cmdProjectChecklist16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdProjectChecklist24",
                "icon": "common/icons/cmdProjectChecklist24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPropagationSet24",
                "icon": "common/icons/cmdPropagationSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPropagationUnset24",
                "icon": "common/icons/cmdPropagationUnset24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPublish24",
                "icon": "common/icons/cmdPublish24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdPush24",
                "icon": "common/icons/cmdPush24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdQMS24",
                "icon": "common/icons/cmdQMS24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdQualityNotification24",
                "icon": "common/icons/cmdQualityNotification24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdQuantitySet24",
                "icon": "common/icons/cmdQuantitySet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdQueryAdd24",
                "icon": "common/icons/cmdQueryAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdQuestionMark24",
                "icon": "common/icons/cmdQuestionMark24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdReadyToDispatch24",
                "icon": "common/icons/cmdReadyToDispatch24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRebuild24",
                "icon": "common/icons/cmdRebuild24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRecordCopy24",
                "icon": "common/icons/cmdRecordCopy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRedo24",
                "icon": "common/icons/cmdRedo24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRedoActivate24",
                "icon": "common/icons/cmdRedoActivate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRefresh24",
                "icon": "common/icons/cmdRefresh24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRegistry24",
                "icon": "common/icons/cmdRegistry24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRemoteUpload24",
                "icon": "common/icons/cmdRemoteUpload24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRemove24",
                "icon": "common/icons/cmdRemove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRepeated24",
                "icon": "common/icons/cmdRepeated24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdReplace24",
                "icon": "common/icons/cmdReplace24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdReplaceFile24",
                "icon": "common/icons/cmdReplaceFile24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdReportEdit24",
                "icon": "common/icons/cmdReportEdit24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRequirementsAdd24",
                "icon": "common/icons/cmdRequirementsAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdResetCounter24",
                "icon": "common/icons/cmdResetCounter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdResumeArchiving24",
                "icon": "common/icons/cmdResumeArchiving24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRevertMaximiseVertically24",
                "icon": "common/icons/cmdRevertMaximiseVertically24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRole24",
                "icon": "common/icons/cmdRole24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRoleAssign24",
                "icon": "common/icons/cmdRoleAssign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdRotate24",
                "icon": "common/icons/cmdRotate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSave24",
                "icon": "common/icons/cmdSave24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSaveAs24",
                "icon": "common/icons/cmdSaveAs24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSaveReport24",
                "icon": "common/icons/cmdSaveReport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSaveSchedule24",
                "icon": "common/icons/cmdSaveSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSchedule24",
                "icon": "common/icons/cmdSchedule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdScheduleOpen24",
                "icon": "common/icons/cmdScheduleOpen24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdScheduleSet24",
                "icon": "common/icons/cmdScheduleSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSchematicAvailable24",
                "icon": "common/icons/cmdSchematicAvailable24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSchematicDisabled24",
                "icon": "common/icons/cmdSchematicDisabled24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdScript24",
                "icon": "common/icons/cmdScript24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSearch24",
                "icon": "common/icons/cmdSearch24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSegmentDefect24",
                "icon": "common/icons/cmdSegmentDefect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSegregationTagsLog24",
                "icon": "common/icons/cmdSegregationTagsLog24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSelectionRemove24",
                "icon": "common/icons/cmdSelectionRemove24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSelectMachine24",
                "icon": "common/icons/cmdSelectMachine24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdServer24",
                "icon": "common/icons/cmdServer24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdServerMonitor24",
                "icon": "common/icons/cmdServerMonitor24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdServerNodeSwitch24",
                "icon": "common/icons/cmdServerNodeSwitch24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSet24",
                "icon": "common/icons/cmdSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSetDefault24",
                "icon": "common/icons/cmdSetDefault24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSetFont24",
                "icon": "common/icons/cmdSetFont24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSetMaterial24",
                "icon": "common/icons/cmdSetMaterial24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSetStateMachine24",
                "icon": "common/icons/cmdSetStateMachine24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSetWeight24",
                "icon": "common/icons/cmdSetWeight24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdShopfloor24",
                "icon": "common/icons/cmdShopfloor24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdShopfloorTransaction24",
                "icon": "common/icons/cmdShopfloorTransaction24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdShortDefect24",
                "icon": "common/icons/cmdShortDefect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdShow24",
                "icon": "common/icons/cmdShow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdShowCommentaryPanel24",
                "icon": "common/icons/cmdShowCommentaryPanel24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdShowGrid24",
                "icon": "common/icons/cmdShowGrid24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSidebarConfiguration24",
                "icon": "common/icons/cmdSidebarConfiguration24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSkip24",
                "icon": "common/icons/cmdSkip24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSkipSquare24",
                "icon": "common/icons/cmdSkipSquare24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSliders24",
                "icon": "common/icons/cmdSliders24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSolutionAdministration24",
                "icon": "common/icons/cmdSolutionAdministration24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSort24",
                "icon": "common/icons/cmdSort24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSpecificDate24",
                "icon": "common/icons/cmdSpecificDate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSquare24",
                "icon": "common/icons/cmdSquare24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSquareCheck24",
                "icon": "common/icons/cmdSquareCheck24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStar24",
                "icon": "common/icons/cmdStar24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStart24",
                "icon": "common/icons/cmdStart24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStartArchiving24",
                "icon": "common/icons/cmdStartArchiving24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStateMachineSet24",
                "icon": "common/icons/cmdStateMachineSet24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStatisticalProcessControl24",
                "icon": "common/icons/cmdStatisticalProcessControl24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStepCatalog24",
                "icon": "common/icons/cmdStepCatalog24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStepComplete24",
                "icon": "common/icons/cmdStepComplete24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStepMultiselect24",
                "icon": "common/icons/cmdStepMultiselect24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStop24",
                "icon": "common/icons/cmdStop24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStopArchiving24",
                "icon": "common/icons/cmdStopArchiving24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdStopMagic24",
                "icon": "common/icons/cmdStopMagic24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSubmit24",
                "icon": "common/icons/cmdSubmit24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSubTreeDelete24",
                "icon": "common/icons/cmdSubTreeDelete24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSWACComponent24",
                "icon": "common/icons/cmdSWACComponent24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSwitchOff24",
                "icon": "common/icons/cmdSwitchOff24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSwitchOn24",
                "icon": "common/icons/cmdSwitchOn24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSwitchOrder24",
                "icon": "common/icons/cmdSwitchOrder24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSync24",
                "icon": "common/icons/cmdSync24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdSysConfiguration24",
                "icon": "common/icons/cmdSysConfiguration24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTabAllWindow24",
                "icon": "common/icons/cmdTabAllWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTableView24",
                "icon": "common/icons/cmdTableView24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTags24",
                "icon": "common/icons/cmdTags24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTagsToGroups24",
                "icon": "common/icons/cmdTagsToGroups24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTakeOwnership24",
                "icon": "common/icons/cmdTakeOwnership24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskActivate24",
                "icon": "common/icons/cmdTaskActivate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskFilter24",
                "icon": "common/icons/cmdTaskFilter24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskInstance24",
                "icon": "common/icons/cmdTaskInstance24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskInstanceExecution24",
                "icon": "common/icons/cmdTaskInstanceExecution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskOperatorExecution24",
                "icon": "common/icons/cmdTaskOperatorExecution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskRecover24",
                "icon": "common/icons/cmdTaskRecover24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskRepeat24",
                "icon": "common/icons/cmdTaskRepeat24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTaskUnassign24",
                "icon": "common/icons/cmdTaskUnassign24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTeam24",
                "icon": "common/icons/cmdTeam24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTest24",
                "icon": "common/icons/cmdTest24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTestRun24",
                "icon": "common/icons/cmdTestRun24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTextInput24",
                "icon": "common/icons/cmdTextInput24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdThicknessDecrease24",
                "icon": "common/icons/cmdThicknessDecrease24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTileCollection24",
                "icon": "common/icons/cmdTileCollection24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTime24",
                "icon": "common/icons/cmdTime24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTool24",
                "icon": "common/icons/cmdTool24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdToolbox24",
                "icon": "common/icons/cmdToolbox24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdToPartial24",
                "icon": "common/icons/cmdToPartial24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTraceChartWindow24",
                "icon": "common/icons/cmdTraceChartWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTraining24",
                "icon": "common/icons/cmdTraining24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTransport24",
                "icon": "common/icons/cmdTransport24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTrash24",
                "icon": "common/icons/cmdTrash24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTravellingNotification24",
                "icon": "common/icons/cmdTravellingNotification24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdTxt24",
                "icon": "common/icons/cmdTxt24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUIApplication24",
                "icon": "common/icons/cmdUIApplication24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUIApplicationRegenerate24",
                "icon": "common/icons/cmdUIApplicationRegenerate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUnassignLot24",
                "icon": "common/icons/cmdUnassignLot24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUndeploy24",
                "icon": "common/icons/cmdUndeploy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUndo24",
                "icon": "common/icons/cmdUndo24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUnfreeze24",
                "icon": "common/icons/cmdUnfreeze24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUngroupBy24",
                "icon": "common/icons/cmdUngroupBy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUnlink24",
                "icon": "common/icons/cmdUnlink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUnloadHandlingUnit24",
                "icon": "common/icons/cmdUnloadHandlingUnit24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUnlock24",
                "icon": "common/icons/cmdUnlock24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUnpin24",
                "icon": "common/icons/cmdUnpin24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUnsetDefault24",
                "icon": "common/icons/cmdUnsetDefault24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUpdate24",
                "icon": "common/icons/cmdUpdate24.svg"
            }, {
                "iconType": "cmduser",
                "text": "svg cmduser16",
                "icon": "common/icons/cmduser16.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUser24",
                "icon": "common/icons/cmdUser24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserAdd24",
                "icon": "common/icons/cmdUserAdd24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserInterface24",
                "icon": "common/icons/cmdUserInterface24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserLink24",
                "icon": "common/icons/cmdUserLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserRole24",
                "icon": "common/icons/cmdUserRole24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool124",
                "icon": "common/icons/cmdUserTool124.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool224",
                "icon": "common/icons/cmdUserTool224.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool324",
                "icon": "common/icons/cmdUserTool324.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool424",
                "icon": "common/icons/cmdUserTool424.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool524",
                "icon": "common/icons/cmdUserTool524.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool624",
                "icon": "common/icons/cmdUserTool624.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool724",
                "icon": "common/icons/cmdUserTool724.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool824",
                "icon": "common/icons/cmdUserTool824.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserTool924",
                "icon": "common/icons/cmdUserTool924.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolA24",
                "icon": "common/icons/cmdUserToolA24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolB24",
                "icon": "common/icons/cmdUserToolB24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolC24",
                "icon": "common/icons/cmdUserToolC24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolD24",
                "icon": "common/icons/cmdUserToolD24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolE24",
                "icon": "common/icons/cmdUserToolE24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolF24",
                "icon": "common/icons/cmdUserToolF24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolG24",
                "icon": "common/icons/cmdUserToolG24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolH24",
                "icon": "common/icons/cmdUserToolH24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolI24",
                "icon": "common/icons/cmdUserToolI24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolJ24",
                "icon": "common/icons/cmdUserToolJ24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolK24",
                "icon": "common/icons/cmdUserToolK24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolL24",
                "icon": "common/icons/cmdUserToolL24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolM24",
                "icon": "common/icons/cmdUserToolM24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolN24",
                "icon": "common/icons/cmdUserToolN24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolO24",
                "icon": "common/icons/cmdUserToolO24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolP24",
                "icon": "common/icons/cmdUserToolP24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolQ24",
                "icon": "common/icons/cmdUserToolQ24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolR24",
                "icon": "common/icons/cmdUserToolR24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolS24",
                "icon": "common/icons/cmdUserToolS24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolT24",
                "icon": "common/icons/cmdUserToolT24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUserToolU24",
                "icon": "common/icons/cmdUserToolU24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUseToolInput24",
                "icon": "common/icons/cmdUseToolInput24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUtilizationWindow24",
                "icon": "common/icons/cmdUtilizationWindow24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdUtilizationWindowSetting24",
                "icon": "common/icons/cmdUtilizationWindowSetting24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdValidate24",
                "icon": "common/icons/cmdValidate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdViewConvenience24",
                "icon": "common/icons/cmdViewConvenience24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWarehouse24",
                "icon": "common/icons/cmdWarehouse24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWarningLink24",
                "icon": "common/icons/cmdWarningLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWarningLinkRed24",
                "icon": "common/icons/cmdWarningLinkRed24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWhereUsed24",
                "icon": "common/icons/cmdWhereUsed24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWindowGauge24",
                "icon": "common/icons/cmdWindowGauge24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWindowGaugeSetting24",
                "icon": "common/icons/cmdWindowGaugeSetting24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWOOP24",
                "icon": "common/icons/cmdWOOP24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkerRole24",
                "icon": "common/icons/cmdWorkerRole24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkInProgress24",
                "icon": "common/icons/cmdWorkInProgress24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkMaster24",
                "icon": "common/icons/cmdWorkMaster24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkOrder24",
                "icon": "common/icons/cmdWorkOrder24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkOrderCopy24",
                "icon": "common/icons/cmdWorkOrderCopy24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkOrderCreate24",
                "icon": "common/icons/cmdWorkOrderCreate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkOrderNotification24",
                "icon": "common/icons/cmdWorkOrderNotification24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkOrderRule24",
                "icon": "common/icons/cmdWorkOrderRule24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkOrdersLink24",
                "icon": "common/icons/cmdWorkOrdersLink24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkProcess24",
                "icon": "common/icons/cmdWorkProcess24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkProcessExecution24",
                "icon": "common/icons/cmdWorkProcessExecution24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkProcessResume24",
                "icon": "common/icons/cmdWorkProcessResume24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkProcessTemplate24",
                "icon": "common/icons/cmdWorkProcessTemplate24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkspaceConfigureToolbar24",
                "icon": "common/icons/cmdWorkspaceConfigureToolbar24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkspaceOpen24",
                "icon": "common/icons/cmdWorkspaceOpen24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdWorkspaceSave24",
                "icon": "common/icons/cmdWorkspaceSave24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomIn24",
                "icon": "common/icons/cmdZoomIn24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomInX24",
                "icon": "common/icons/cmdZoomInX24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomInY24",
                "icon": "common/icons/cmdZoomInY24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomLock24",
                "icon": "common/icons/cmdZoomLock24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomOut24",
                "icon": "common/icons/cmdZoomOut24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomOutX24",
                "icon": "common/icons/cmdZoomOutX24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomOutY24",
                "icon": "common/icons/cmdZoomOutY24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomResetX24",
                "icon": "common/icons/cmdZoomResetX24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomResetXY24",
                "icon": "common/icons/cmdZoomResetXY24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomResetY24",
                "icon": "common/icons/cmdZoomResetY24.svg"
            }, {
                "iconType": "cmd",
                "text": "svg cmdZoomTool24",
                "icon": "common/icons/cmdZoomTool24.svg"
            }, {
                "iconType": "grah",
                "text": "svg grahCircleLoader80R",
                "icon": "common/icons/grahCircleLoader80R.SVG"
            }, {
                "iconType": "home",
                "text": "svg homeChecklist64",
                "icon": "common/icons/homeChecklist64.svg"
            }, {
                "iconType": "home",
                "text": "svg homeControlPlan64",
                "icon": "common/icons/homeControlPlan64.svg"
            }, {
                "iconType": "home",
                "text": "svg homeFolder24",
                "icon": "common/icons/homeFolder24.svg"
            }, {
                "iconType": "home",
                "text": "svg homeFolderOpen24",
                "icon": "common/icons/homeFolderOpen24.svg"
            }, {
                "iconType": "home",
                "text": "svg homeProjectChecklist64",
                "icon": "common/icons/homeProjectChecklist64.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorActive16",
                "icon": "common/icons/indicatorActive16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorAppInstalled16",
                "icon": "common/icons/indicatorAppInstalled16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorAppUpdate16",
                "icon": "common/icons/indicatorAppUpdate16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorAssemble16",
                "icon": "common/icons/indicatorAssemble16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorAutomationNodeInstance16",
                "icon": "common/icons/indicatorAutomationNodeInstance16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCheckmarkGreen16",
                "icon": "common/icons/indicatorCheckmarkGreen16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCircleBlack16",
                "icon": "common/icons/indicatorCircleBlack16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCircleBlue16",
                "icon": "common/icons/indicatorCircleBlue16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCircleGreen16",
                "icon": "common/icons/indicatorCircleGreen16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCircleRed16",
                "icon": "common/icons/indicatorCircleRed16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCircleReleased16",
                "icon": "common/icons/indicatorCircleReleased16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCircleWhite16",
                "icon": "common/icons/indicatorCircleWhite16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCircleYellow16",
                "icon": "common/icons/indicatorCircleYellow16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorClosed16",
                "icon": "common/icons/indicatorClosed16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCloseLiteRed16",
                "icon": "common/icons/indicatorCloseLiteRed16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCloseState16",
                "icon": "common/icons/indicatorCloseState16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorCloud16",
                "icon": "common/icons/indicatorCloud16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorComment16",
                "icon": "common/icons/indicatorComment16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorComplete16",
                "icon": "common/icons/indicatorComplete16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorContainsChange16",
                "icon": "common/icons/indicatorContainsChange16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorContainsChange24",
                "icon": "common/icons/indicatorContainsChange24.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorDashed16",
                "icon": "common/icons/indicatorDashed16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorDefaultSet16",
                "icon": "common/icons/indicatorDefaultSet16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorDisassemble16",
                "icon": "common/icons/indicatorDisassemble16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorDotted16",
                "icon": "common/icons/indicatorDotted16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorError16",
                "icon": "common/icons/indicatorError16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorExactlySatisfied16",
                "icon": "common/icons/indicatorExactlySatisfied16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorFavorites16",
                "icon": "common/icons/indicatorFavorites16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorFreeze16",
                "icon": "common/icons/indicatorFreeze16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorFutureOld16",
                "icon": "common/icons/indicatorFutureOld16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorGreenCircle16",
                "icon": "common/icons/indicatorGreenCircle16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorGreenSquare16",
                "icon": "common/icons/indicatorGreenSquare16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorHold16",
                "icon": "common/icons/indicatorHold16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorHoldFuture16",
                "icon": "common/icons/indicatorHoldFuture16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorHome16",
                "icon": "common/icons/indicatorHome16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorIncomplete16",
                "icon": "common/icons/indicatorIncomplete16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorInformationError16",
                "icon": "common/icons/indicatorInformationError16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorInformationGeneral16",
                "icon": "common/icons/indicatorInformationGeneral16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorInformationSuccess16",
                "icon": "common/icons/indicatorInformationSuccess16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorInformationWarning16",
                "icon": "common/icons/indicatorInformationWarning16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorInput16",
                "icon": "common/icons/indicatorInput16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorLine16",
                "icon": "common/icons/indicatorLine16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorLineDot16",
                "icon": "common/icons/indicatorLineDot16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorLineDotDot16",
                "icon": "common/icons/indicatorLineDotDot16.svg"
            }, {
                "iconType": "",
                "text": "svg IndicatorMagic16",
                "icon": "common/icons/IndicatorMagic16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorMilestoneAvailable16",
                "icon": "common/icons/indicatorMilestoneAvailable16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorMilestoneNotAvailable16",
                "icon": "common/icons/indicatorMilestoneNotAvailable16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorMissingImage16",
                "icon": "common/icons/indicatorMissingImage16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorNoiseFactorl16",
                "icon": "common/icons/indicatorNoiseFactorl16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorNotExecuted16",
                "icon": "common/icons/indicatorNotExecuted16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorNotSatisfied16",
                "icon": "common/icons/indicatorNotSatisfied16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorOpen16",
                "icon": "common/icons/indicatorOpen16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorOpenState16",
                "icon": "common/icons/indicatorOpenState16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorOption16",
                "icon": "common/icons/indicatorOption16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorOrangeTriangle16",
                "icon": "common/icons/indicatorOrangeTriangle16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorOutputIntended16",
                "icon": "common/icons/indicatorOutputIntended16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorOutputUnintended16",
                "icon": "common/icons/indicatorOutputUnintended16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorOverSatisfied16",
                "icon": "common/icons/indicatorOverSatisfied16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorParameters16",
                "icon": "common/icons/indicatorParameters16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorPartial16",
                "icon": "common/icons/indicatorPartial16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorPlay16",
                "icon": "common/icons/indicatorPlay16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorPrivate16",
                "icon": "common/icons/indicatorPrivate16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorQuestion16",
                "icon": "common/icons/indicatorQuestion16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorReady16",
                "icon": "common/icons/indicatorReady16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorRedCircle16",
                "icon": "common/icons/indicatorRedCircle16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorRedTriangle16",
                "icon": "common/icons/indicatorRedTriangle16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorReject16",
                "icon": "common/icons/indicatorReject16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorRelevantCause16",
                "icon": "common/icons/indicatorRelevantCause16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorRequirement16",
                "icon": "common/icons/indicatorRequirement16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusAborted16",
                "icon": "common/icons/indicatorStatusAborted16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusCancelled16",
                "icon": "common/icons/indicatorStatusCancelled16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusCompleted16",
                "icon": "common/icons/indicatorStatusCompleted16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusCreated16",
                "icon": "common/icons/indicatorStatusCreated16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusError16",
                "icon": "common/icons/indicatorStatusError16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusFailed16",
                "icon": "common/icons/indicatorStatusFailed16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusInProgress16",
                "icon": "common/icons/indicatorStatusInProgress16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusNotReady16",
                "icon": "common/icons/indicatorStatusNotReady16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusPaused16",
                "icon": "common/icons/indicatorStatusPaused16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusReady16",
                "icon": "common/icons/indicatorStatusReady16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusSkipped16",
                "icon": "common/icons/indicatorStatusSkipped16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusSuspended16",
                "icon": "common/icons/indicatorStatusSuspended16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorStatusUnknown16",
                "icon": "common/icons/indicatorStatusUnknown16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorUnlock16",
                "icon": "common/icons/indicatorUnlock16.svg"
            }, {
                "iconType": "",
                "text": "svg IndicatorUser16",
                "icon": "common/icons/IndicatorUser16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorVoided16",
                "icon": "common/icons/indicatorVoided16.svg"
            }, {
                "iconType": "indicator",
                "text": "svg indicatorYellowSquare16",
                "icon": "common/icons/indicatorYellowSquare16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscBackward24",
                "icon": "common/icons/miscBackward24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscChevronLeft24",
                "icon": "common/icons/miscChevronLeft24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscChevronLeftDouble24",
                "icon": "common/icons/miscChevronLeftDouble24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscChevronRight16",
                "icon": "common/icons/miscChevronRight16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscChevronRight24",
                "icon": "common/icons/miscChevronRight24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscChevronRightDouble24",
                "icon": "common/icons/miscChevronRightDouble24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscCircularProgressIndicator80",
                "icon": "common/icons/miscCircularProgressIndicator80.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscDown24",
                "icon": "common/icons/miscDown24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscDownArrow16",
                "icon": "common/icons/miscDownArrow16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscFilter16",
                "icon": "common/icons/miscFilter16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscForward24",
                "icon": "common/icons/miscForward24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscGoToFirst16",
                "icon": "common/icons/miscGoToFirst16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscGoToFirst24",
                "icon": "common/icons/miscGoToFirst24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscGoToLast16",
                "icon": "common/icons/miscGoToLast16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscGoToLast24",
                "icon": "common/icons/miscGoToLast24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscLeftArrow16",
                "icon": "common/icons/miscLeftArrow16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscRightArrow16",
                "icon": "common/icons/miscRightArrow16.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscUp24",
                "icon": "common/icons/miscUp24.svg"
            }, {
                "iconType": "misc",
                "text": "svg miscUpArrow16",
                "icon": "common/icons/miscUpArrow16.svg"
            }, {
                "iconType": "type",
                "text": "svg type3D48",
                "icon": "common/icons/type3D48.svg"
            }, {
                "iconType": "type",
                "text": "svg type3DPrinter48",
                "icon": "common/icons/type3DPrinter48.svg"
            }, {
                "iconType": "type",
                "text": "svg type5Why48",
                "icon": "common/icons/type5Why48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAction48",
                "icon": "common/icons/typeAction48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionConfirmationOfEffectiveness48",
                "icon": "common/icons/typeActionConfirmationOfEffectiveness48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionCorrective48",
                "icon": "common/icons/typeActionCorrective48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionDefectImmediate48",
                "icon": "common/icons/typeActionDefectImmediate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionExternalImmediate48",
                "icon": "common/icons/typeActionExternalImmediate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionGroup48",
                "icon": "common/icons/typeActionGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionInternalImmediate48",
                "icon": "common/icons/typeActionInternalImmediate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionLongTerm48",
                "icon": "common/icons/typeActionLongTerm48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeActionPriority48",
                "icon": "common/icons/typeActionPriority48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAlternativeOperationGroup48",
                "icon": "common/icons/typeAlternativeOperationGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAppExtension48",
                "icon": "common/icons/typeAppExtension48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeApplicationLogMaintenance48",
                "icon": "common/icons/typeApplicationLogMaintenance48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAppManagement48",
                "icon": "common/icons/typeAppManagement48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAssignGroupToRole48",
                "icon": "common/icons/typeAssignGroupToRole48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAttach48",
                "icon": "common/icons/typeAttach48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAttribute48",
                "icon": "common/icons/typeAttribute48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAudit48",
                "icon": "common/icons/typeAudit48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAutomationChannel48",
                "icon": "common/icons/typeAutomationChannel48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAutomationNodeInstance48",
                "icon": "common/icons/typeAutomationNodeInstance48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAutomationNodeInstanceExecution48",
                "icon": "common/icons/typeAutomationNodeInstanceExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAutomationNodeTemplate48",
                "icon": "common/icons/typeAutomationNodeTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeAutomationNodeType48",
                "icon": "common/icons/typeAutomationNodeType48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBarcodeDigitalAsset48",
                "icon": "common/icons/typeBarcodeDigitalAsset48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBehaviourModelSubSystemGroup48",
                "icon": "common/icons/typeBehaviourModelSubSystemGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBinding48",
                "icon": "common/icons/typeBinding48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBMP48",
                "icon": "common/icons/typeBMP48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBuffer48",
                "icon": "common/icons/typeBuffer48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBufferInstance48",
                "icon": "common/icons/typeBufferInstance48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBuild48",
                "icon": "common/icons/typeBuild48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeBuyOffNotification48",
                "icon": "common/icons/typeBuyOffNotification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCalendar48",
                "icon": "common/icons/typeCalendar48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCalendarHoliday48",
                "icon": "common/icons/typeCalendarHoliday48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCalendarHolidayGroup48",
                "icon": "common/icons/typeCalendarHolidayGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCalendarModification48",
                "icon": "common/icons/typeCalendarModification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCalendarRule48",
                "icon": "common/icons/typeCalendarRule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCause48",
                "icon": "common/icons/typeCause48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCell48",
                "icon": "common/icons/typeCell48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCertificate48",
                "icon": "common/icons/typeCertificate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeChangeManagementNotification48",
                "icon": "common/icons/typeChangeManagementNotification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicGroupAttributive48",
                "icon": "common/icons/typeCharacteristicGroupAttributive48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicGroupVariable48",
                "icon": "common/icons/typeCharacteristicGroupVariable48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicGroupVisual48",
                "icon": "common/icons/typeCharacteristicGroupVisual48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicRepresentation48",
                "icon": "common/icons/typeCharacteristicRepresentation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicSpecificationAttributive48",
                "icon": "common/icons/typeCharacteristicSpecificationAttributive48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicSpecificationVariable48",
                "icon": "common/icons/typeCharacteristicSpecificationVariable48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicSpecificationVariableSingle48",
                "icon": "common/icons/typeCharacteristicSpecificationVariableSingle48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicSpecificationVisual48",
                "icon": "common/icons/typeCharacteristicSpecificationVisual48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCharacteristicSpecificationVisualDefect48",
                "icon": "common/icons/typeCharacteristicSpecificationVisualDefect48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeChecklist48",
                "icon": "common/icons/typeChecklist48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeChecklistQuestion48",
                "icon": "common/icons/typeChecklistQuestion48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeClassificationElement48",
                "icon": "common/icons/typeClassificationElement48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCommands48",
                "icon": "common/icons/typeCommands48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeCommandsGroup48",
                "icon": "common/icons/typeCommandsGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeComputer48",
                "icon": "common/icons/typeComputer48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeConcept48",
                "icon": "common/icons/typeConcept48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeConfiguratorContext48",
                "icon": "common/icons/typeConfiguratorContext48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeControlInspectionPlan48",
                "icon": "common/icons/typeControlInspectionPlan48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeControlPlan48",
                "icon": "common/icons/typeControlPlan48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeControlPlanGroup48",
                "icon": "common/icons/typeControlPlanGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeControlPlanSetting48",
                "icon": "common/icons/typeControlPlanSetting48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeControlPlanType48",
                "icon": "common/icons/typeControlPlanType48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDatabase48",
                "icon": "common/icons/typeDatabase48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDatabaseAdapter48",
                "icon": "common/icons/typeDatabaseAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDatabaseArchive48",
                "icon": "common/icons/typeDatabaseArchive48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDatabaseSearch48",
                "icon": "common/icons/typeDatabaseSearch48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDataCollection48",
                "icon": "common/icons/typeDataCollection48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDataHandler48",
                "icon": "common/icons/typeDataHandler48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDefectCosts48",
                "icon": "common/icons/typeDefectCosts48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDefectiveObject48",
                "icon": "common/icons/typeDefectiveObject48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDefectiveObjectGroup48",
                "icon": "common/icons/typeDefectiveObjectGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDependency48",
                "icon": "common/icons/typeDependency48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDetectionAction48",
                "icon": "common/icons/typeDetectionAction48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDetectionActionCatalog48",
                "icon": "common/icons/typeDetectionActionCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDiagram48",
                "icon": "common/icons/typeDiagram48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDispatchRule48",
                "icon": "common/icons/typeDispatchRule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDnc48",
                "icon": "common/icons/typeDnc48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDNCInvalid48",
                "icon": "common/icons/typeDNCInvalid48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDocumentParameters48",
                "icon": "common/icons/typeDocumentParameters48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeDocumentSection48",
                "icon": "common/icons/typeDocumentSection48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEnterprise48",
                "icon": "common/icons/typeEnterprise48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEntityExtention48",
                "icon": "common/icons/typeEntityExtention48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEntitySource48",
                "icon": "common/icons/typeEntitySource48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEnvironment48",
                "icon": "common/icons/typeEnvironment48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEquipmentExecution48",
                "icon": "common/icons/typeEquipmentExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEquipmentLevel48",
                "icon": "common/icons/typeEquipmentLevel48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEquipmentRuntime48",
                "icon": "common/icons/typeEquipmentRuntime48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeERPOrderToBeScheduled48",
                "icon": "common/icons/typeERPOrderToBeScheduled48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeERPOrderUnschedule48",
                "icon": "common/icons/typeERPOrderUnschedule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEvaluation48",
                "icon": "common/icons/typeEvaluation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEventHandler48",
                "icon": "common/icons/typeEventHandler48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEventSignal48",
                "icon": "common/icons/typeEventSignal48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEWI48",
                "icon": "common/icons/typeEWI48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEwiExecution48",
                "icon": "common/icons/typeEwiExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeEWITemplate48",
                "icon": "common/icons/typeEWITemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeExe48",
                "icon": "common/icons/typeExe48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeExecGroup48",
                "icon": "common/icons/typeExecGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFile48",
                "icon": "common/icons/typeFile48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFileAdapter48",
                "icon": "common/icons/typeFileAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFilter48",
                "icon": "common/icons/typeFilter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFlow48",
                "icon": "common/icons/typeFlow48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEAFailureRepresentation48",
                "icon": "common/icons/typeFMEAFailureRepresentation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEAFailureSpecification48",
                "icon": "common/icons/typeFMEAFailureSpecification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEAFunctionRepresentation48",
                "icon": "common/icons/typeFMEAFunctionRepresentation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEAFunctionSpecification48",
                "icon": "common/icons/typeFMEAFunctionSpecification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEAProject48",
                "icon": "common/icons/typeFMEAProject48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEARootObject48",
                "icon": "common/icons/typeFMEARootObject48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEASystemElementRepresentation48",
                "icon": "common/icons/typeFMEASystemElementRepresentation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEASystemElementSpecification48",
                "icon": "common/icons/typeFMEASystemElementSpecification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFMEAType48",
                "icon": "common/icons/typeFMEAType48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFunctionalArea48",
                "icon": "common/icons/typeFunctionalArea48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFunctionalityRevision48",
                "icon": "common/icons/typeFunctionalityRevision48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeFunctionCatalog48",
                "icon": "common/icons/typeFunctionCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeGageManagement48",
                "icon": "common/icons/typeGageManagement48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeGenealogy48",
                "icon": "common/icons/typeGenealogy48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeGeneral48",
                "icon": "common/icons/typeGeneral48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeGenericSoftwareComponent48",
                "icon": "common/icons/typeGenericSoftwareComponent48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeGif48",
                "icon": "common/icons/typeGif48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeHandlingUnit48",
                "icon": "common/icons/typeHandlingUnit48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeHighAutomation48",
                "icon": "common/icons/typeHighAutomation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeHighAvailabilityGroup48",
                "icon": "common/icons/typeHighAvailabilityGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeHold48",
                "icon": "common/icons/typeHold48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeHoldFuture48",
                "icon": "common/icons/typeHoldFuture48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeHtml48",
                "icon": "common/icons/typeHtml48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeHumanHistory48",
                "icon": "common/icons/typeHumanHistory48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeIdentifierFormat48",
                "icon": "common/icons/typeIdentifierFormat48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeInbox48",
                "icon": "common/icons/typeInbox48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeIncident48",
                "icon": "common/icons/typeIncident48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeIncomingGoods48",
                "icon": "common/icons/typeIncomingGoods48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeInfo48",
                "icon": "common/icons/typeInfo48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeInstall48",
                "icon": "common/icons/typeInstall48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeInterlockingCheck48",
                "icon": "common/icons/typeInterlockingCheck48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeInterlockingCheckHistory48",
                "icon": "common/icons/typeInterlockingCheckHistory48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeInterlockingCheckParameters48",
                "icon": "common/icons/typeInterlockingCheckParameters48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeIshikawa48",
                "icon": "common/icons/typeIshikawa48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeJpg48",
                "icon": "common/icons/typeJpg48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKitPreparation48",
                "icon": "common/icons/typeKitPreparation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKitRequest48",
                "icon": "common/icons/typeKitRequest48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKPI48",
                "icon": "common/icons/typeKPI48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKPIAssociate48",
                "icon": "common/icons/typeKPIAssociate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKPIEvent48",
                "icon": "common/icons/typeKPIEvent48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKPIFilter48",
                "icon": "common/icons/typeKPIFilter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKPIGroup48",
                "icon": "common/icons/typeKPIGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeKPISchedule48",
                "icon": "common/icons/typeKPISchedule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLabelPrinter48",
                "icon": "common/icons/typeLabelPrinter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLanguage48",
                "icon": "common/icons/typeLanguage48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLibrary48",
                "icon": "common/icons/typeLibrary48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLineage48",
                "icon": "common/icons/typeLineage48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLineType48",
                "icon": "common/icons/typeLineType48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLinkNode48",
                "icon": "common/icons/typeLinkNode48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLogEntry48",
                "icon": "common/icons/typeLogEntry48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLogisticClasses48",
                "icon": "common/icons/typeLogisticClasses48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeLogisticRequest48",
                "icon": "common/icons/typeLogisticRequest48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMachine48",
                "icon": "common/icons/typeMachine48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMachineChemical48",
                "icon": "common/icons/typeMachineChemical48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMachineLink48",
                "icon": "common/icons/typeMachineLink48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMachineParameter48",
                "icon": "common/icons/typeMachineParameter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMachineState48",
                "icon": "common/icons/typeMachineState48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMainControl48",
                "icon": "common/icons/typeMainControl48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeManagementCounter48",
                "icon": "common/icons/typeManagementCounter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterial48",
                "icon": "common/icons/typeMaterial48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialBom48",
                "icon": "common/icons/typeMaterialBom48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialBomItem48",
                "icon": "common/icons/typeMaterialBomItem48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialEngineering48",
                "icon": "common/icons/typeMaterialEngineering48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialExecution48",
                "icon": "common/icons/typeMaterialExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialExecutionTemplate48",
                "icon": "common/icons/typeMaterialExecutionTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialGroup48",
                "icon": "common/icons/typeMaterialGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialGroupEngineering48",
                "icon": "common/icons/typeMaterialGroupEngineering48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialLot48",
                "icon": "common/icons/typeMaterialLot48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialLotExecutionTemplate48",
                "icon": "common/icons/typeMaterialLotExecutionTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialLotRuntime48",
                "icon": "common/icons/typeMaterialLotRuntime48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialLotTemplateRuntime48",
                "icon": "common/icons/typeMaterialLotTemplateRuntime48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialMigration48",
                "icon": "common/icons/typeMaterialMigration48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialStorage48",
                "icon": "common/icons/typeMaterialStorage48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialTemplate48",
                "icon": "common/icons/typeMaterialTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMaterialTemplateEngineering48",
                "icon": "common/icons/typeMaterialTemplateEngineering48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMeasurableAttribute48",
                "icon": "common/icons/typeMeasurableAttribute48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMeasurableAttributeGroup48",
                "icon": "common/icons/typeMeasurableAttributeGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMeasure48",
                "icon": "common/icons/typeMeasure48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMessageBuffer48",
                "icon": "common/icons/typeMessageBuffer48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMessageChannel48",
                "icon": "common/icons/typeMessageChannel48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMessageType48",
                "icon": "common/icons/typeMessageType48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMilestone48",
                "icon": "common/icons/typeMilestone48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMilestoneCatalog48",
                "icon": "common/icons/typeMilestoneCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMilestoneTransition48",
                "icon": "common/icons/typeMilestoneTransition48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMissingImage48",
                "icon": "common/icons/typeMissingImage48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeModelExtention48",
                "icon": "common/icons/typeModelExtention48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMOMAdapter48",
                "icon": "common/icons/typeMOMAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMoveFromEquipment48",
                "icon": "common/icons/typeMoveFromEquipment48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMp448",
                "icon": "common/icons/typeMp448.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMsExcel48",
                "icon": "common/icons/typeMsExcel48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMSMQAdapter48",
                "icon": "common/icons/typeMSMQAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMsPowerpoint48",
                "icon": "common/icons/typeMsPowerpoint48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMsWord48",
                "icon": "common/icons/typeMsWord48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMTUAggregateRuntime48",
                "icon": "common/icons/typeMTUAggregateRuntime48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMTUAggregateTemplateRuntime48",
                "icon": "common/icons/typeMTUAggregateTemplateRuntime48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMTURuntime48",
                "icon": "common/icons/typeMTURuntime48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeMTUTemplateRuntime48",
                "icon": "common/icons/typeMTUTemplateRuntime48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNonConformance48",
                "icon": "common/icons/typeNonConformance48.svg"
            }, {
                "iconType": "",
                "text": "svg TypeNonConformanceBuyOff48",
                "icon": "common/icons/TypeNonConformanceBuyOff48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNonConformanceChangeManagement48",
                "icon": "common/icons/typeNonConformanceChangeManagement48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNonConformanceLifecycle48",
                "icon": "common/icons/typeNonConformanceLifecycle48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNonConformanceNotification48",
                "icon": "common/icons/typeNonConformanceNotification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNonConformanceQuality48",
                "icon": "common/icons/typeNonConformanceQuality48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNonConformanceTravelling48",
                "icon": "common/icons/typeNonConformanceTravelling48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNotProductiveActivity48",
                "icon": "common/icons/typeNotProductiveActivity48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNumberingPattern48",
                "icon": "common/icons/typeNumberingPattern48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeNumberingPatternSection48",
                "icon": "common/icons/typeNumberingPatternSection48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeOneAvailability48",
                "icon": "common/icons/typeOneAvailability48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeOperation48",
                "icon": "common/icons/typeOperation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeOperationCatalog48",
                "icon": "common/icons/typeOperationCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeOperationStepCategory48",
                "icon": "common/icons/typeOperationStepCategory48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeOperatorLanding48",
                "icon": "common/icons/typeOperatorLanding48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeOrder48",
                "icon": "common/icons/typeOrder48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeOutgoingGoods48",
                "icon": "common/icons/typeOutgoingGoods48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeParameter48",
                "icon": "common/icons/typeParameter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeParentBatch48",
                "icon": "common/icons/typeParentBatch48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartAggregate48",
                "icon": "common/icons/typePartAggregate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartAggregateTemplate48",
                "icon": "common/icons/typePartAggregateTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartBom48",
                "icon": "common/icons/typePartBom48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartBomItem48",
                "icon": "common/icons/typePartBomItem48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartBomProductionRule48",
                "icon": "common/icons/typePartBomProductionRule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartBomTemplate48",
                "icon": "common/icons/typePartBomTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartExecution48",
                "icon": "common/icons/typePartExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartExecutionLink48",
                "icon": "common/icons/typePartExecutionLink48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartExecutionTemplate48",
                "icon": "common/icons/typePartExecutionTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartGroup48",
                "icon": "common/icons/typePartGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartLot48",
                "icon": "common/icons/typePartLot48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartLotTemplate48",
                "icon": "common/icons/typePartLotTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartPhantom48",
                "icon": "common/icons/typePartPhantom48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartProductionRule48",
                "icon": "common/icons/typePartProductionRule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartRevision48",
                "icon": "common/icons/typePartRevision48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePartTemplate48",
                "icon": "common/icons/typePartTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePauseReason48",
                "icon": "common/icons/typePauseReason48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePdf48",
                "icon": "common/icons/typePdf48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePencilSquare48",
                "icon": "common/icons/typePencilSquare48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePeople48",
                "icon": "common/icons/typePeople48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePerson48",
                "icon": "common/icons/typePerson48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePieMenu48",
                "icon": "common/icons/typePieMenu48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePlantRevision48",
                "icon": "common/icons/typePlantRevision48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePlantRevisionFlow48",
                "icon": "common/icons/typePlantRevisionFlow48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePlantRevisionGroup48",
                "icon": "common/icons/typePlantRevisionGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePlantRevisionTemplate48",
                "icon": "common/icons/typePlantRevisionTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePlugin48",
                "icon": "common/icons/typePlugin48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePng48",
                "icon": "common/icons/typePng48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePostAction48",
                "icon": "common/icons/typePostAction48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePowderMixing48",
                "icon": "common/icons/typePowderMixing48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePowderRecycle48",
                "icon": "common/icons/typePowderRecycle48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePreventionalAction48",
                "icon": "common/icons/typePreventionalAction48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePreventionalActionCatalog48",
                "icon": "common/icons/typePreventionalActionCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePrintJobFile48",
                "icon": "common/icons/typePrintJobFile48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProcess48",
                "icon": "common/icons/typeProcess48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProcessCatalog48",
                "icon": "common/icons/typeProcessCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProcessNotification48",
                "icon": "common/icons/typeProcessNotification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProcessProductionRule48",
                "icon": "common/icons/typeProcessProductionRule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProductionCoordinatorDashboard48",
                "icon": "common/icons/typeProductionCoordinatorDashboard48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProductionCoordinatorTimeUpdate48",
                "icon": "common/icons/typeProductionCoordinatorTimeUpdate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProductLine48",
                "icon": "common/icons/typeProductLine48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProductLineCharacteristic48",
                "icon": "common/icons/typeProductLineCharacteristic48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProductType48",
                "icon": "common/icons/typeProductType48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeProject48",
                "icon": "common/icons/typeProject48.svg"
            }, {
                "iconType": "type",
                "text": "svg typePublishedDashboard48",
                "icon": "common/icons/typePublishedDashboard48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeQualityAction48",
                "icon": "common/icons/typeQualityAction48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeQualityNotification48",
                "icon": "common/icons/typeQualityNotification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeQueryDataBase48",
                "icon": "common/icons/typeQueryDataBase48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeQuestionMark48",
                "icon": "common/icons/typeQuestionMark48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeQuestionMarkGroup48",
                "icon": "common/icons/typeQuestionMarkGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeRawMaterialGenealogy48",
                "icon": "common/icons/typeRawMaterialGenealogy48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeReason48",
                "icon": "common/icons/typeReason48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeReportDefinition48",
                "icon": "common/icons/typeReportDefinition48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeReportingTool48",
                "icon": "common/icons/typeReportingTool48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeRequirementCatalog48",
                "icon": "common/icons/typeRequirementCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeReworkCode48",
                "icon": "common/icons/typeReworkCode48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeRole48",
                "icon": "common/icons/typeRole48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeRootCause48",
                "icon": "common/icons/typeRootCause48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeRTF48",
                "icon": "common/icons/typeRTF48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSampleManagement48",
                "icon": "common/icons/typeSampleManagement48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSampleManagementInspection48",
                "icon": "common/icons/typeSampleManagementInspection48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSavedSearch48",
                "icon": "common/icons/typeSavedSearch48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeScenario48",
                "icon": "common/icons/typeScenario48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeScript48",
                "icon": "common/icons/typeScript48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSearch48",
                "icon": "common/icons/typeSearch48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSearchQueryGroup48",
                "icon": "common/icons/typeSearchQueryGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSearchQueryRelevant48",
                "icon": "common/icons/typeSearchQueryRelevant48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSearchQuerySpecial48",
                "icon": "common/icons/typeSearchQuerySpecial48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSegregationTagsLog48",
                "icon": "common/icons/typeSegregationTagsLog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeServer48",
                "icon": "common/icons/typeServer48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeServerMonitor48",
                "icon": "common/icons/typeServerMonitor48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSetPoint48",
                "icon": "common/icons/typeSetPoint48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSetPointItem48",
                "icon": "common/icons/typeSetPointItem48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSettings48",
                "icon": "common/icons/typeSettings48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeShopfloorAdapter48",
                "icon": "common/icons/typeShopfloorAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSignalRuleConfiguration48",
                "icon": "common/icons/typeSignalRuleConfiguration48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSite48",
                "icon": "common/icons/typeSite48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSkill48",
                "icon": "common/icons/typeSkill48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSkip48",
                "icon": "common/icons/typeSkip48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSmartView48",
                "icon": "common/icons/typeSmartView48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSoftwareComponent48",
                "icon": "common/icons/typeSoftwareComponent48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSolution48",
                "icon": "common/icons/typeSolution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSource48",
                "icon": "common/icons/typeSource48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSourceExtension48",
                "icon": "common/icons/typeSourceExtension48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStandardNoteRevision48",
                "icon": "common/icons/typeStandardNoteRevision48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStart48",
                "icon": "common/icons/typeStart48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStateMachine48",
                "icon": "common/icons/typeStateMachine48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStatisticalProcessControl48",
                "icon": "common/icons/typeStatisticalProcessControl48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStatusBehaviour48",
                "icon": "common/icons/typeStatusBehaviour48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStatusDefinition48",
                "icon": "common/icons/typeStatusDefinition48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStep48",
                "icon": "common/icons/typeStep48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStepCatalog48",
                "icon": "common/icons/typeStepCatalog48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStepExecution48",
                "icon": "common/icons/typeStepExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeStructureDataImport48",
                "icon": "common/icons/typeStructureDataImport48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSubtrate48",
                "icon": "common/icons/typeSubtrate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSupplierAssessment48",
                "icon": "common/icons/typeSupplierAssessment48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSvg48",
                "icon": "common/icons/typeSvg48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeSystemDispachRule48",
                "icon": "common/icons/typeSystemDispachRule48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTags48",
                "icon": "common/icons/typeTags48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTask48",
                "icon": "common/icons/typeTask48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskContext48",
                "icon": "common/icons/typeTaskContext48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskContext8",
                "icon": "common/icons/typeTaskContext8.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskEwi48",
                "icon": "common/icons/typeTaskEwi48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskEwiExecution48",
                "icon": "common/icons/typeTaskEwiExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskExecution48",
                "icon": "common/icons/typeTaskExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskOperatorExecution48",
                "icon": "common/icons/typeTaskOperatorExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskPart48",
                "icon": "common/icons/typeTaskPart48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskPartExecution48",
                "icon": "common/icons/typeTaskPartExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskQuality48",
                "icon": "common/icons/typeTaskQuality48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskQualityExecution48",
                "icon": "common/icons/typeTaskQualityExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskTool48",
                "icon": "common/icons/typeTaskTool48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTaskToolExecution48",
                "icon": "common/icons/typeTaskToolExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTCAdapter48",
                "icon": "common/icons/typeTCAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTeam48",
                "icon": "common/icons/typeTeam48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimeActivity48",
                "icon": "common/icons/typeTimeActivity48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimeCategory48",
                "icon": "common/icons/typeTimeCategory48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimeDefinitions48",
                "icon": "common/icons/typeTimeDefinitions48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimeDiagram48",
                "icon": "common/icons/typeTimeDiagram48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimeHierarchy48",
                "icon": "common/icons/typeTimeHierarchy48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimePeriod48",
                "icon": "common/icons/typeTimePeriod48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimeSlice48",
                "icon": "common/icons/typeTimeSlice48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTimeSliceGroup48",
                "icon": "common/icons/typeTimeSliceGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTool48",
                "icon": "common/icons/typeTool48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeToolBox48",
                "icon": "common/icons/typeToolBox48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeToolBoxExecution48",
                "icon": "common/icons/typeToolBoxExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeToolBoxLink48",
                "icon": "common/icons/typeToolBoxLink48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeToolExecution48",
                "icon": "common/icons/typeToolExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeToolLink48",
                "icon": "common/icons/typeToolLink48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTransport48",
                "icon": "common/icons/typeTransport48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTransportOperationLanding48",
                "icon": "common/icons/typeTransportOperationLanding48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTravellingNotification48",
                "icon": "common/icons/typeTravellingNotification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeTxt48",
                "icon": "common/icons/typeTxt48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeUIApplication48",
                "icon": "common/icons/typeUIApplication48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeUnknown48",
                "icon": "common/icons/typeUnknown48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWebAPIAdapter48",
                "icon": "common/icons/typeWebAPIAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWebAPIClientAdapter48",
                "icon": "common/icons/typeWebAPIClientAdapter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWOOP48",
                "icon": "common/icons/typeWOOP48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWOOPExecGroup48",
                "icon": "common/icons/typeWOOPExecGroup48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkAreaRevision48",
                "icon": "common/icons/typeWorkAreaRevision48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkCenter48",
                "icon": "common/icons/typeWorkCenter48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkerRole48",
                "icon": "common/icons/typeWorkerRole48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkflowProcess48",
                "icon": "common/icons/typeWorkflowProcess48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkflowProcessExternal48",
                "icon": "common/icons/typeWorkflowProcessExternal48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkflowProcessStart48",
                "icon": "common/icons/typeWorkflowProcessStart48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkflowProcessStep48",
                "icon": "common/icons/typeWorkflowProcessStep48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkflowProcessStepStart48",
                "icon": "common/icons/typeWorkflowProcessStepStart48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkingPattern48",
                "icon": "common/icons/typeWorkingPattern48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkingPatternAggregation48",
                "icon": "common/icons/typeWorkingPatternAggregation48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkMaster48",
                "icon": "common/icons/typeWorkMaster48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkOrder48",
                "icon": "common/icons/typeWorkOrder48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkOrderERP48",
                "icon": "common/icons/typeWorkOrderERP48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkOrderInProgress48",
                "icon": "common/icons/typeWorkOrderInProgress48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkOrderNotification48",
                "icon": "common/icons/typeWorkOrderNotification48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkOrderPreKits48",
                "icon": "common/icons/typeWorkOrderPreKits48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkOrderTemplate48",
                "icon": "common/icons/typeWorkOrderTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkProcessContext48",
                "icon": "common/icons/typeWorkProcessContext48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkProcessExecution48",
                "icon": "common/icons/typeWorkProcessExecution48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeWorkProcessTemplate48",
                "icon": "common/icons/typeWorkProcessTemplate48.svg"
            }, {
                "iconType": "type",
                "text": "svg typeXml48",
                "icon": "common/icons/typeXml48.svg"
            }]
    };

    angular.module('siemens.simaticit.common.widgets.iconPicker').value("common.iconPicker.sitIconSvgData", sitIconSvgJson);
})();
