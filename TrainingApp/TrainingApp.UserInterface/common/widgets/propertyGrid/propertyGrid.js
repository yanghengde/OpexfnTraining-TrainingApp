/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.propertyGrid
     * @description
     * This module provides functionalities related to displaying object details and generating property-grids to display object properties
     * (**display** and **mode** are configurable).
     */
    angular.module('siemens.simaticit.common.widgets.propertyGrid', [function () {
        //any dependencies?
    }]);

})();

(function () {
    'use strict';
    /**
     * @ngdoc type
     * @name ValidationModel
     * @module siemens.simaticit.common.widgets.propertyGrid
     * @description
     * An object containing all the validation checks that must be performed on a specific field of a {@link sitPropertyGrid sit-property-grid} directive.
     *
     * @property {boolean} required Whether a value is required or not.
     * @property {number} minlength The minimum length of a String value.
     * @property {number} maxlength The maximum length of a String value.
     * @property {RegEx} pattern A regular expression to validate a String or Number value.
     * @property {number} min The minimum value (for numbers only, not supported by {@link sitCheckbox sit-checkbox} and {@link sitMultiSelect sit-multi-select}).
     * @property {number} max The maximum value (for numbers only, not supported by {@link sitCheckbox sit-checkbox} and {@link sitMultiSelect sit-multi-select}).
     * @property {boolean} editable If set to **true**, custom values are not considered valid (used by the {@link sitEntityPicker sit-entity-picker} directive only).
     * @property {Function} custom A custom callback function. If **sit-change** is configured with custom validation, the custom validation function must return
     * an updated ngModel.
     * @property {string} patternInfo A string that will be displayed whenever a custom validation or a regular expression validation fails.
     *
     */
    /**
    * @ngdoc directive
    * @name sitProperty
    * @module siemens.simaticit.common.widgets.propertyGrid
    * @description
    * Displays a property field within a Property Grid (see {@link sitPropertyGrid}), comprised of a label and a widget. Layout (vertical, horizontal, fixed, fluid) and mode
    * (view or edit) is determined by the settings configured in the parent property grid.
    *
    * @usage
    * As element:
    * ```
    *  <sit-property
    *    sit-id="myText"
    *    sit-widget="sit-text"
    *    sit-value="'Some text'"
    *    sit-validation="{required: true}"
    *    sit-autofocus="true"
    *    ng-disabled="vm.disablePeroperty"
    *    ng-readonly="vm.ngReadonly">My Text:</sit-property>
    * ```
    *
    * @restrict E
    * @param {String} sit-id A unique identifier for the property.
    *
    * @param {String} [sit-widget=sit-text] Defines the widget used to edit the field. It must be the name of a valid directive that can be used within a Property Grid,
    * such as one of the following:
    *  * {@link sitCheckbox sit-checkbox}
    *  * {@link sitDatepicker sit-date-picker}
    *  * {@link sitDateTimePicker sit-date-time-picker}
    *  * {@link sitEntityPicker sit-entity-picker}
    *  * {@link sitEmail sit-email}
    *  * {@link sitFileUploader sit-file-uploader}
    *  * {@link sitIconPicker sit-icon-picker}
    *  * {@link sitLabel sit-label}
    *  * {@link sitMultiSelect sit-multi-select}
    *  * {@link sitNumeric sit-numeric}
    *  * {@link sitPassword sit-password}
    *  * {@link sitRadio sit-radio}
    *  * {@link sitSelect sit-select}
    *  * {@link sitText sit-text}
    *  * {@link sitTextarea sit-textarea}
    *  * {@link sitTimePicker sit-time-picker}
    *  * {@link sitTypeahead sit-typehead}
    *
    * Alternatively you can specify a custom directive, provided that it has been implemented to support usage within the Property Grid directive.
    *
    * @param {(String|Number|Boolean|Object|Array)} sit-value The value of the property. If this attribute is set to an array and **sit-widget** has not been set to
    * {@link sitMultiSelect sit-multi-select} or {@link sitCheckbox sit-checkbox}, the control will be repeated to populate each element of the array.
    *
    * @param {Number} sit-min-items If **sit-value** is bound to an array, determines the minimum number of widget instances to be displayed (not applicable if
    * the specified widget is {@link sitMultiSelect sit-multi-select} or {@link sitCheckbox sit-checkbox}).
    *
    * @param {Number} sit-max-items If **sit-value** is bound to an array, determines the maximum number of widget instances to be displayed
    * (not applicable if the specified widget is {@link sitMultiSelect sit-multi-select} or {@link sitCheckbox sit-checkbox}).
    *
    * @param {String} sit-change _(Optional)_ A callback function that will be executed when the value of the property changes.
    * The callback will be called with two parameters, corresponding to the old value and the new value of the property.
    *
    * @param {String} ng-disabled _(Optional)_ If truthy, disables the widget used for editing the property value.
    *
    * @param {String} ng-readonly _(Optional)_ If truthy, sets the widget used for editing the property as read-only.
    *
    * @param {String} sit-read-only _(Optional)_ If truthy, the value of the property will be displayed as a label.
    * Note that when the value is falsy, the property value will be editable in the grid even if the sit-mode of the sit-property-grid  is equal to "view".
    *
    * @param {String} ng-required _(Optional)_ If truthy, a value for this property is required. This attribute will not be supported for new compatible widgets in the future;
    * use **sit-validation** instead.
    *
    * @param {Boolean} sit-autofocus _(Optional)_ If truthy, the property widget will be focused.
    *
    * **Note**: It is recommended to use only one auto-focus property per screen/state even though multiple property grids are configured.
    * @param {ValidationModel} sit-validation _(Optional)_ Defines the validation required for the property. See {@link ValidationModel} for more information.
    * @param {?Object} sit-widget-attributes An object containing properties corresponding to attributes to be passed directly to the widget
    * specified in the **sit-widget** attribute.
    * Mandatory when configuring widgets that require additional mandatory attributes, such as {@link sitSelect sit-select} or {@link sitEntityPicker sit-entity-picker}.
    *
    * For compatibility reasons, if the following attributes are specified as attributes of a **sit-property** directive, they will be passed to compatibile widgets:
    *
    * * For the {@link sitSelect sit-select} widget:
    *   * sit-options
    *   * sit-to-display
    *   * sit-to-keep
    * * For the {@link sitTypeahead sit-typeahead} widget:
    *   * sit-options
    *   * sit-to-display
    * * For the {@link sitRadio sit-radio} widget:
    *   * sit-options
    * * For the {@link sitEntityPicker sit-entity-picker} widget:
    *   * sit-datasource
    *   * sit-limit
    *   * sit-editable
    *   * sit-placeholder
    *   * sit-selected-attribute-to-display
    *   * sit-selected-object
    *   * sit-template-url
    *   * sit-required
    * * For the {@link sitDatepicker sit-date-picker} widget:
    *   * sit-format
    *   * sit-append-to-body
    *   * sit-show-button-bar
    * * For the {@link sitTimePicker sit-time-picker} widget:
    *   * sit-format
    *
    * Using these attributes directly on the sitProperty widget is deprecated.
    * It is recommended however to configure widget attributes using the **sit-widget-attributes** attribute instead.
    *
    *
    *
    * @example
    *
    * In a view template, the **sit-property** directive is used within a {@link sitPropertyGrid sit-property-grid} as follows:
    *
    * ```
    *        <sit-property-grid sit-id="{{vm.propertyGridId}}"
    *                           sit-data="vm.propertyGridData"
    *                           sit-layout="'Horizontal'"
    *                           sit-type="vm.propertyGridType"
    *                           sit-mode="view"
    *                           sit-form="vm.propertyGridForm"
    *                           sit-state-change="vm.onValidityChangeCallback"
    *                           sit-columns="vm.selectedColumnNumber">
    *
    *            <sit-property
    *               sit-id="textarea_id"
    *               sit-widget="sit-textarea"
    *               sit-value="vm.textarea.value"
    *               sit-autofocus="true"
    *               sit-validation="{maxlength: 200, required: true}">Text Area:</sit-property>
    *
    *            <sit-property
    *               sit-id="numeric_id"
    *               sit-widget="sit-numeric"
    *               sit-value="vm.number.value"
    *               sit-validation="{min: 0, max: 10}">Simple Number:</sit-property>
    *
    *            <sit-property
    *               sit-id="select_id"
    *               sit-widget="sit-select"
    *               sit-value="vm.selectData.value"
    *               sit-validation="{required: true}"
    *               sit-widget-attributes="{'sit-options': [{id: 'g', name: 'g'}, {id: 'kg', name: 'Kg'}], 'sit-to-display': 'name' }">Select:</sit-property>
    *        </sit-property-grid>
    * ```
    *
    *
    * @example
    * ### Configuring a widget using sit-widget-attributes and custom validation
    *
    * The following template fragment shows a **sit-property** directive used to configure a {@link sitFileUploader sit-file-uploader} widget with custom validation:
    * ```
    * <sit-property  sit-id="fileUploader_id"
    *                sit-widget="sit-file-uploader"
    *                sit-value="vm.currentItem.file"
    *                sit-validation="{required: true, custom: vm.customValidation}"
    *                sit-widget-attributes="vm.widgetAttributes">File 2
    * </sit-property>
    * ```
    * In this case, the object bound to the **sit-widget-attributes** attribute and the custom validation function are configured in the controller, as follows:
    *
    * ```
    * vm.widgetAttributes = {
    *   "accept": 'image/jpeg,video/ogg,audio/ogg,audio/mp3,application/x-zip-compressed',
    *   "sit-min-size": '0KB',
    *   "sit-max-size": '50MB'
    * };
    * vm.customValidation = function (value, ngModel){
    *   if (value) {
    *     try {
    *       var obj = JSON.parse(atob(value.contents));
    *       if (obj.name) {
    *         ngModel.$setValidity('file', true);
    *       } else {
    *         ngModel.$setValidity('file', false);
    *       }
    *     } catch(e) {
    *       ngModel.$setValidity('file', false);
    *     }
    *   }
    *   return ngModel;
    * };
    * ```
    *
    * Note that:
    *
    * * The function specified for custom validation takes two parameters: the first parameter is the new value of the property,
    * and the second parameter is the **ngModelController** object used internally by the widget, which also contains the old value of the property.
    * In this case, the function considers the property valid if the contents of the uploaded file are in JSON format, and if the parsed JSON object contains the property 'name'.
    * * The widget attributes specified are specific to the {@link sitFileUploader sit-file-uploader} widget.
    *
    *
    * @example
    * ### Integrating custom widgets
    *
    * It is possible to easily integrate custom directives to be used with the sit-property directive, as long as they manage at least one **sit-value** attribute.
    *
    * For example, the following custom directive can be used to display a toggle button with a tooltip, which is configurable via a **title** attribute:
    *
    * ```
    *    app.directive('myToggle', [function () {
    *        return {
    *            restrict: 'E',
    *            replace: false,
    *            scope: {},
    *            controller: function () {
    *                if (!this.value) this.value = 'off';
    *                this.toggle = function () {
    *                    if (this.value === 'on') this.value = "off";
    *                    else this.value = "on";
    *                }
    *            },
    *            controllerAs: 'toggleCtrl',
    *            bindToController: {
    *                title: '=?title',
    **               value: '=?sitValue'
    *            },
    *            template: '<span ng-click="toggleCtrl.toggle()" title="{{toggleCtrl.title}} is {{toggleCtrl.value}}"> <i class="fa fa-2x fa-toggle-{{toggleCtrl.value}}"
    *                           ng-style="{\'color\': toggleCtrl.value ===\'on\' ? \'green\' : \'gray\'}"> </span>',
    *        }
    *    }]);
    *
    * ```
    *  To use this directive within **sit-property** it is sufficient to specify the **sit-widget** and **sit-widget-attributes** accordingly:
    *
    *  ```
    *              <sit-property-grid sit-id="propertyGrid3"
    *                               sit-layout="{{propertyCtrl.propertyGridLayout}}"
    *                               sit-type="{{propertyCtrl.propertyGridType}}"
    *                               sit-mode="view"
    *                               sit-columns="propertyCtrl.propertyGridColumns">
    *                <sit-property sit-widget="sit-toggle"
    *                              sit-value="propertyCtrl.currentItem.toggleResizing"
    *                              sit-widget-attributes="{title: 'Toggle resizing'}">Resize:</sit-property>
    *
    *            </sit-property-grid>
    *
    * ```
    *
    * @example
    * ### Using the sit-change attribute
    *
    * The following template shows how to display a {@link sitSelect sit-select} widget listing cities only after a country has been selected in another sit-select widget:
    *
    * ```
    * <sit-property sit-id="country"
    *               sit-widget="sit-select"
    *			    sit-value="vm.currentItem.Country"
    *			    sit-options="vm.countries"
    *			    sit-change="vm.setCities"
    *			    sit-to-display="'Name'"
    *			    sit-to-keep="'Name'">Country:</sit-property>
    * <sit-property sit-id="city"
    *               sit-widget="sit-select"
    *			    sit-value="vm.currentItem.City"
    *			    sit-options="vm.locations"
    *			    ng-if="vm.currentItem.Country.Name"
    *			    sit-to-display="'Name'"
    *			    sit-to-keep="'Name'">City:</sit-property>
    * ```
    *
    * When the value in the first sit-select widget changes, the callback specified in the **sit-change** attribute will be executed.
    * This is the implementation of the callback in the controller:
    *
    * ```
    * self.setCities = function (modelValue, viewValue) {
    *   LocationSvc.getCities(viewValue.Name).then(function (data) {
    *     self.locations = data;
    *   });
    * };
    * ```
    *
    *
    * @example
    * ### Configuring multi-value widgets
    *
    * To input multiple values for a property, it is sufficient to bind the **sit-value** attribute to an array
    * and optionally specify the minimum and maximum number of widgets to display, as follows:
    *
    *  ```
    *  <sit-property sit-id="email_id"
    *                sit-widget="sit-email"
    *                sit-min-items="2"
    *                sit-max-items="5"
    *                sit-autofocus="true"
    *                sit-value="['abc1@xyz.com', 'abc2@xyz.com']"
    *                sit-validation="{required: true}">Emails:</sit-property>
    *  ```
    *
    */

    angular.module('siemens.simaticit.common.widgets.propertyGrid').directive('sitProperty', ['$parse', PropertyDirective]);

    function PropertyDirective($parse) {
        var sitProperty = {
            scope: {},
            transclude: true,
            require: ['sitProperty', '^sitPropertyGrid', '^?sitPropertyGroup'],
            controller: PropertyCtrl,
            controllerAs: 'propertyCtrl',
            bindToController: {
                sitWidget: '@',
                value: '=?sitValue',
                validation: '=?sitValidation',
                readOnly: '=?sitReadOnly',
                ngRequired: '@?',
                name: '=?sitName',
                placeholder: '=?sitPlaceholder',
                limit: '=?sitLimit',
                templateUrl: '=?sitTemplateUrl',
                selectedAttributeToDisplay: '=?sitSelectedAttributeToDisplay',
                attributeToSearch: '=?sitAttributeToSearch',
                options: '=?sitOptions',
                toDisplay: '=?sitToDisplay',
                toKeep: '=?sitToKeep',
                sitDatasource: '=?',
                sitSelectedObject: '=?',
                sitEditable: '=?',
                accept: '=?accept',
                minSize: '=?sitMinSize',
                maxSize: '=?sitMaxSize',
                sitSelectedString: '=?',
                sitSplitList: '=?',
                sitDoneCallback: '=?',
                minItems: '=?sitMinItems',
                maxItems: '=?sitMaxItems',
                format: '=?sitFormat',
                appendToBody: '=?sitAppendToBody',
                showButtonBar: '=?sitShowButtonBar',
                showMeridian: '=?sitShowMeridian',
                showWeeks: '=?sitShowWeeks',
                widgetAttributes: '=?sitWidgetAttributes',
                ngBlur: '&?',
                sitChange: '=?',
                ngDisabled: '=?',
                ngFocus: '&?',
                ngReadonly: '=?',
                sitRequired: '=?',
                sitId: '@?',
                autofocus: '=?sitAutofocus',
                sitAllowReset: '=?',
                sitMultiChange: '=?'
            },
            link: function (scope, elmnt, attrs, ctrls, transclude) {
                var vm = ctrls[0];
                var parent = ctrls[1];//sit-property-grid-dir
                var propertyGroupCtrl = ctrls[2];
                var transcludedText;

                vm.isMultiValueWidget = false;
                vm.parentScope = {
                    layout: parent.layout.toUpperCase(),
                    type: parent.type.toUpperCase(),
                    mode: parent.mode,
                    columns: parent.columns
                };
                if (propertyGroupCtrl) {
                    vm.isWithinGroup = true;
                } else {
                    vm.isWithinGroup = false;
                }

                if (vm.value && angular.isArray(vm.value) && vm.sitWidget !== 'sit-checkbox' && vm.sitWidget !== 'sit-tristate-checkbox' && vm.sitWidget !== 'sit-multi-select') {
                    vm.isMultiValueWidget = true;
                }

                if (parent.mode === 'view') {
                    vm.readOnly = true;
                }

                if (ctrls[1].layout.toUpperCase() === 'HORIZONTAL' && ctrls[1].type.toUpperCase() === 'FLUID') {
                    var propertyGridWidth = elmnt.parent().width();
                    var flexX = calcFlexBasis(propertyGridWidth);
                    elmnt.parent().css('flex-basis', flexX);
                }

                function calcFlexBasis(width) {
                    if (width >= 1366) {
                        return '25%';
                    }
                    else if (width >= 768) {
                        return '33%';
                    }
                    else if (width >= 320) {
                        return '50%';
                    }

                    return '100%';

                }

                function onMouseEnter() {
                    var tooltipText = transcludedText.text().replace(/\{\{(.+?)\}\}/g, function (match, first) { return $parse(first)(scope); }); //NOSONAR
                    if (tooltipText.lastIndexOf(':') === tooltipText.length) {
                        tooltipText = tooltipText.substring(0, tooltipText.length);
                    }
                    if (transcludedText[0].offsetWidth < transcludedText[0].scrollWidth) {
                        transcludedText.attr("title", tooltipText);
                    } else {
                        transcludedText.removeAttr("title");
                    }
                }

                transclude(scope, function () {
                    transcludedText = elmnt.find('[ng-transclude]');
                    if (transcludedText && transcludedText.html()) {
                        transcludedText.addClass('property-label-ellipsis');
                        transcludedText.on("mouseenter", onMouseEnter);
                    }
                });

                if (attrs.hasOwnProperty('sitAutofocus') && vm.autofocus === true && vm.ngReadonly !== true && vm.ngDisabled !== true && parent.mode.toLowerCase() === 'edit') {
                    parent.setElementFocus(attrs.sitWidget);
                }

                scope.$on("$destroy", function () {
                    transcludedText.off("mouseenter", onMouseEnter);
                });
            },
            templateUrl: "common/widgets/propertyGrid/property.html"
        };
        return sitProperty;
    }

    PropertyCtrl.$inject = ["$filter", "common.widgets.propertyGrid.listService"];
    function PropertyCtrl($filter, propertyGridListService) {
        var vm = this;

        activate();

        function activate() {
            init();
        }

        function init() {
            vm.addWidgetInstance = addWidgetInstance;
            vm.removeWidgetInstance = removeWidgetInstance;
            vm.listValue = listValue;
            vm.addBtnTitle = $filter('translate')('propertyGrid.property.addNew');
            vm.removeBtnTitle = $filter('translate')('propertyGrid.property.remove');

            if (angular.isArray(vm.value)) {
                vm.minItems = Number(vm.minItems) || 0;
                vm.maxItems = Number(vm.maxItems) || 99;

                if (vm.value.length === 0 && (vm.readOnly || vm.ngReadonly)) {
                    vm.value.push('');
                }
                changeButtonsTitle();
            }

        }

        function addWidgetInstance(index) {
            var oldValue = angular.copy(vm.value);
            if (vm.maxItems !== undefined && vm.maxItems > vm.value.length) {
                vm.value.splice(index + 1, 0, '');
            }
            changeButtonsTitle();

            if (typeof vm.sitMultiChange !== 'undefined') {
                vm.sitMultiChange(oldValue, vm.value, index);
            }
        }

        function removeWidgetInstance(index) {
            var oldValue = angular.copy(vm.value);
            if (vm.minItems !== undefined && vm.minItems < vm.value.length) {
                vm.value.splice(index, 1);
            }
            changeButtonsTitle();

            if (typeof vm.sitMultiChange !== 'undefined') {
                vm.sitMultiChange(oldValue, vm.value, index);
            }
        }

        function changeButtonsTitle() {
            vm.addBtnTitle = vm.value.length === vm.maxItems ? $filter('translate')('propertyGrid.property.canNotAdd') : $filter('translate')('propertyGrid.property.addNew');
            vm.removeBtnTitle = vm.value.length <= vm.minItems ? $filter('translate')('propertyGrid.property.canNotRemove') : $filter('translate')('propertyGrid.property.remove');
        }

        function listValue(value) {
            return propertyGridListService.parseValue(value);
        }
    }

})();

/*jshint -W098 */
(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name sitPropertyGrid
    * @module siemens.simaticit.common.widgets.propertyGrid
    * @description
    * Displays the properties of an object in a form, according to the specified layout (vertical/horizontal), type (fixed/fluid) and mode (view, edit, list).
    *
    * You can specify the properties to display and their features either by supplying a configuration object to the **sit-data** attribute or by adding one or more
    * {@link sitProperty sit-property} directives to the markup.
    *
    * If the **sit-data** attribute is specified (and is not empty), it overrides any declarative configuration specified via any of the child **sit-property** directives.
    *
    * **Note:** For Horizontal mode, list is supported only for fixed type by supplying a configuration object to the sit-data attribute.
    * @usage
    * As elements (using {@link sitProperty sit-property} directives to configure each property):
    * ```
    * <sit-property-grid
    *   sit-id="propertyGridForm"
    *   sit-layout="'Horizontal'"
    *   sit-type="'Fluid'"
    *   sit-mode="view"
    *   sit-columns="4"
    *   sit-state-change="vm.onValidityChangeCallback"
    *   sit-form="vm.propertyGridForm">
    *
    *   <sit-property
    *     sit-id="textarea_id"
    *     sit-widget="sit-textarea"
    *     sit-value="vm.textarea"
    *     sit-autofocus="true"
    *     sit-validation="{minlength: 100, maxlength: 800">
    *     Text Area:
    *   </sit-property>
    *
    *   <sit-property
    *     sit-id="numeric_id"
    *     sit-widget="sit-numeric"
    *     sit-value="vm.number"
    *     sit-validation="{required: true}">
    *     Number:
    *   </sit-property>
    *
    *   <sit-property
    *      sit-email="email_id"
    *     sit-widget="sit-email"
    *     sit-value="vm.email"
    *     sit-validation="{pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/}"
    *     ng-readonly="true">
    *     Email:
    *   </sit-property>
    *
    *   <sit-property
    *     sit-id="radio_id"
    *     sit-widget="sit-radio"
    *     sit-value="vm.radio"
    *     sit-widget-attributes="'sit-options':[{label: 'Raw', value: 'R'}, {label: 'Net', value: 'N'}]">
    *     Radio:
    *   </sit-property>
    *
    * </sit-property-grid>
    * ```
    * As elements (supplying a configuration object to the **sit-data** attribute):
    * ```
    *  <sit-property-grid
    *    sit-id="propertyGridForm"
    *    sit-data="vm.displayData"
    *    sit-layout="'Horizontal'"
    *    sit-type="'Fluid'"
    *    sit-mode="edit"
    *    sit-state-change="vm.onValidityChangeCallback"
    *    sit-form="vm.propertyGridForm">
    *  </sit-property-grid>
    * ```
    *
    * @restrict E
    *
    * @param {String} sit-id Unique identifier of the Property Grid. No special characters, except for underscore ("\_"), are allowed for this attribute.
    *
    * @param {String} sit-type Defines if the vertical property alignment is **Fluid** or **Fixed**:
    *
    * * **Fluid**: The number of columns is managed dynamically, i.e. the number is defined automatically according to the width available.
    * * This option is only available with the **Horizontal** layout.
    * * **Fixed**: The number of columns is prefedined.
    *
    * @param {Number} sit-columns Number of columns to be displayed for the **Fixed** type.
    *
    * @param {String} sit-layout Defines if the Property Grid should be displayed vertically or horizontally.
    *
    * Allowed values:
    * * **Vertical**
    * * **Horizontal**
    *
    * @param {String} [sit-mode=edit] Defines the Property Grid display mode .
    *
    * Allowed values:
    * * **view**: The Property Grid will be displayed in the disabled mode.
    * * **edit**: The Property Grid will be displayed in the editable mode.
    * * **list**: The Property Grid will be displayed in the list mode.
    *
    * @param {Object} [sit-form=undefined]  _(Optional)_ It returns <a href="https://docs.angularjs.org/api/ng/type/form.FormController" target="_blank">Form Controller</a>
    * object of the property grid and its child properties mapped to the bound variable. All the underlying formController methods can be accessed through the bound variable.
    *
    * The form object returned by the property grid has 3 properties as follows:
    *
    * * id: property grid id
    * * form: property grid form controller
    * * properties: form controller of the child properties mapped to the corresponding id.
    *
    *  The prototype of the form object is as follows:
    *   ```
    *   propertyGridForm = {
    *      id: "propertyGridForm",
    *      form: FormController,
    *      properties: {
    *          numeric_id: FormController,
    *          string_id: FormController,
    *          textarea_id: FormController
    *          }
    *   }
    *   ```
    *   The form method can be accessed as follows:
    *   ```
    *   propertyGridForm.properties['numeric_id'].$setDirty();
    *   Or
    *   propertyGridForm.properties['numeric_id'].$setPristine();
    *   ```
    *
    * **Note:** To get FormController, the property grid configuration should satsify following conditions.
    *
    * * All the form properties must have the id/sit-id property.
    *
    * * The binding variable should be assigned with an empty Object literal.
    *
    * @param {Function} [sit-state-change=undefined] _(Optional)_ A callback function, called when the property grid form-state (validity, dirty, pristine) changes.
    * The form-state object is passed as an argument to the callback function.
    *
    * The form-state object has the following properties:
    * * id: form id
    * * isDirty: a user has interacted with the form
    * * isPristine: no users have interacted with the form
    * * isValid: validity of the form
    *
    * @param {Array.<Object>} sit-data
    * An array of objects, each used to configure a property to display within the Property Grid.
    *
    * **Note:** It is recommended to use nested {@link sitProperty sit-property} directives for this kind of configuration.
    *
    * Each object has the following properties:
    *
    * * **id**: A unique identifier for the property.
    * * **widget**: The widget to use to edit the property. For a list of the supported widgets, see the **sit-widget** attribute of the {@link sitProperty sit-property} directive.
    * * **data**: An optional object passed to automatically determine the widget to use for editing, based on its type.
    * * **label**: The label to display next to the property value.
    * * **value**: The property value.
    * * **read_only**: Specifies if the property is editable (only if the widget is editable). If set to **false**, some widgets will display the value as a label.
    * * **invisible**: If set to **true**, the property will not be displayed in the Property Grid.
    * * **validation**: An object used to specify data validation for the property. For a list of the supported properties, see the **sit-validation** attribute of the
    * * {@link sitProperty sit-property} directive.
    * * **autofocus**: If set to true, the property widget will be focused.
    * It is recommended to use only one auto-focus property per screen/state even though multiple property grids are configured.
    * * **widgetAttributes**: Used to set widget-specific attributes.
    *
    *   @example
    *
    *   <aside class="admonition admonition-note">
    *     The following example shows how to configure a Property Grid using a single configuration object via the **sid-data** attribute.
    *       It is recommended to configure data declaratively for each property using the {@link sitProperty sit-property} directive.
    *   </aside>
    *
    *   In a view template, the **sit-property-grid** directive is used as follows:
    *   ```
    *   <sit-property-grid
    *       id="propertyGridForm"
    *       sit-data="vm.displayData"
    *       sit-layout="'Horizontal'"
    *       sit-type="'Fluid'"
    *       sit-mode="edit"
    *       sit-state-change="vm.onValidityChangeCallback"
    *       sit-form="vm.propertyGridForm"></sit-property-grid>
    *   ```
    *
    *   In the controller, the displayData object is configured as follows:
    *
    *   ```
    *   vm.propertyGridForm = {};
    *   vm.displayData = [
    *      {
    *         id:'guid_id'
    *         label: "Hidden Guid String",
    *         invisible: true,
    *         value: "xxxxx-xxxx-xxxx-xxxxxxxxxxxx",
    *         autofocus: true
    *      }
    *      ,
    *      {
    *         label: "Simple Numeric",
    *         value: 5
    *      }
    *      ,
    *      {
    *         id: "numeric_id",
    *         label: "Numeric",
    *         read_only: false,
    *         validation: {},
    *         widget: "sit-numeric",
    *         value: 5
    *         widgetAttributes: {
    *                change: function (oldVal, newVal) {
    *                    var originalValue = 5;
    *                    if (newVal === originalValue) {
    *                        self.propertyGridForm.properties['numeric_id'].$setPristine();
    *                    }
    *                }
    *            }
    *      }
    *      ,
    *      {
    *         id: "string_id",
    *         label: "String",
    *         read_only: false,
    *         widget: "sit-text",
    *         value: "pristine",
    *         validation: { required: true, maxlength: 10, pattern: "/^[0-9]{1,11}$/" }
    *      }
    *      ,
    *      {
    *         id: "textarea_id",
    *         label: "Text Area",
    *         read_only: false,
    *         widget: "sit-textarea",
    *         value: "This is a textarea tag...\r\nline2",
    *         validation: { required: true, maxlength: 50 }
    *      }
    *      ,
    *      {
    *         id: "datepicker_id",
    *         label: "Date Picker",
    *         read_only: false,
    *         validation: { required: true },
    *         widget: "sit-datepicker",
    *         value: null,
    *         widgetAttributes: {
    *             format: "MM/dd/yyyy"
    *         }
    *      }
    *      ,
    *      {
    *         id: "timepicker_id",
    *         label: "Time picker",
    *         read_only: false,
    *         widget: "sit-time-picker",
    *         value: new Date()
    *      }
    *      ,
    *      {
    *         id: "typeahead_id",
    *         label: "Typeahead",
    *         read_only: false,
    *         widget: "sit-typeahead",
    *         value: "Boby",
    *         validation: { required: true },
    *         widgetAttributes: {
    *            options: [
    *               "John", "Jack", "Jacob", "Jeremy", "Jimmy", "Boby"
    *            ],
    *            toDisplay: null
    *         }
    *      }
    *   ];
    *
    *   vm.onValidityChangeCallback = function(formState) {
    *           if(formState.isValid){
    *               //enable form button
    *           } else {
    *               //disable form button
    *           }
    *   }
    *
    * ```
    *
    */
    /**
     * @ngdoc event
     * @name sitPropertyGrid#sit-property-grid.validity-changed
     * @eventType emit on scope
     * @description
     * Emitted when the overall validity of the Property Grid changes.
     *
     * @param {object} validity An object containing two properties:
     *
     * * **id** - The ID of the Property Grid.
     * * **validity** - Set to **true** if the Property Grid contains valid data, **false** otherwise.
     */
    angular.module('siemens.simaticit.common.widgets.propertyGrid').directive('sitPropertyGrid', PropertyGridDirective);

    //static variable to check the property focus
    PropertyGridDirective.isPropertyFocused = false;

    function PropertyGridDirective() {
        var sitPropertyGrid = {
            scope: {
                type: "@sitType",
                layout: "@sitLayout",
                columns: "=?sitColumns",
                mode: "@sitMode",
                validation: "=?",
                data: "=?sitData",
                id: "@sitId",
                showGroups: "=?sitShowGroups",
                groups: "=?sitGroups",
                singleSelectionInGroup: "@?sitSingleGroupExpand"
            },
            restrict: 'E',
            templateUrl: 'common/widgets/propertyGrid/property-grid.html',
            controller: PropertyGridController,
            controllerAs: 'propertyGridCtrl',
            transclude: true,
            link: link,
            bindToController: {
                type: "@sitType",
                layout: "@sitLayout",
                columns: "=?sitColumns",
                mode: "@sitMode",
                validation: "=?",
                data: "=?sitData",
                id: "@sitId",
                onStateChange: "=?sitStateChange",
                form: "=?sitForm",
                showGroups: "=?sitShowGroups",
                groups: "=?sitGroups",
                singleSelectionInGroup: "@?sitSingleGroupExpand"
            }
        };
        function link($scope, $element, $attrs, $ctrl) {
            if ($ctrl.showGroups === undefined) {
                $ctrl.showGroups = false;
            }
        }
        return sitPropertyGrid;
    }
    PropertyGridController.$inject = ['$scope', '$element', '$attrs', '$document', '$timeout'];
    function PropertyGridController($scope, $element, $attrs, $document, $timeout) {
        var vm = this;
        var arr = [];

        //The value is used to fix the autofocus issue in IE and Mozilla
        var LOAD_COMPLETE_TIME = 150;
        vm.setValidity = setValidity;
        vm.onFormStatusChange = onFormStatusChange;
        vm.setElementFocus = setElementFocus;
        vm.transclusionIsSet = isTransclusionNeeded();

        function isTransclusionNeeded() {
            if ($attrs.sitData) { return false; }
            return true;
        }

        //Function available for child directive
        function setValidity(validity) {
            this.isFormValid = validity;
            $scope.$emit('sit-property-grid.validity-changed', { id: $scope.id, validity: validity }); //To notify parent

            if (this.isFormValid && arr.length > 0) {
                $scope.$emit('sit-property-grid.validity-changed', { id: $scope.id, validity: vm.isFormValid, dirty: false });
            }
            else if (this.isFormValid === false) {
                $scope.$emit('sit-property-grid.validity-changed', { id: $scope.id, validity: vm.isFormValid, dirty: true });
            }
        }

        //the function will be called when the form's validity is changed.
        function onFormStatusChange(propertyGridForm) {
            if (typeof vm.onStateChange !== 'function') {
                return;
            }
            validityChange(propertyGridForm);
        }

        function validityChange(propertyGridForm) {
            var formStatus = {
                id: vm.id,
                isDirty: propertyGridForm.$dirty,
                isPristine: propertyGridForm.$pristine,
                isValid: propertyGridForm.$valid
            };
            vm.onStateChange(formStatus);
        }

        function setElementFocus(widget) {
            if (!PropertyGridDirective.isPropertyFocused) {

                //property-element focus on after load
                $timeout(function () {
                    var targetElement = $element.find(widget);
                    if (targetElement.length > 0) {
                        focusElement(targetElement, widget);
                    }
                }, LOAD_COMPLETE_TIME);

                PropertyGridDirective.isPropertyFocused = true;
                registerEvent();
            }
        }

        function focusElement(targetElement, widget) {
            if (widget === 'sit-select') {
                angular.element(targetElement[0]).find('select').focus();
            } else if (widget === 'sit-file-uploader') {
                angular.element(targetElement[0]).find('div.textboxHolder div.uploadSection').focus();
            } else if (widget === 'sit-multi-select') {
                angular.element(targetElement[0]).find('button').focus();
            } else if (widget === 'sit-checkbox' || widget === 'sit-radio' || widget === 'sit-rich-radio') {
                angular.element(targetElement[0]).find('input')[0].focus();
            } else if (widget === 'sit-textarea') {
                angular.element(targetElement[0]).find('textarea').focus();
            } else {
                angular.element(targetElement[0]).find('input').focus();
            }
        }

        function registerEvent() {
            $element.on('keypress', clearFocus);
            $document.on('click', clearFocus);
        }

        function clearFocus() {
            PropertyGridDirective.isPropertyFocused = false;
            $element.off('keypress', clearFocus);
            $document.off('click', clearFocus);
        }

        $scope.$on("sit-property-validator.buttonEnableDisable", function (event, propertyGridEvnt) {    //List for a change in the button
            if (propertyGridEvnt.originalValue === propertyGridEvnt.value && arr.indexOf(propertyGridEvnt.guid) !== -1) {
                arr.splice(arr.indexOf(propertyGridEvnt.guid), 1);
            }
            else if (propertyGridEvnt.originalValue !== propertyGridEvnt.value && arr.indexOf(propertyGridEvnt.guid) === -1) {
                arr.push(propertyGridEvnt.guid);
            }

            if (arr.length === 0) {
                $scope.$emit('sit-property-grid.validity-changed', {
                    id: $scope.id, validity: vm.isFormValid, dirty: true
                });
            }
            else if (arr.length > 0 && vm.isFormValid) {
                $scope.$emit('sit-property-grid.validity-changed', {
                    id: $scope.id, validity: vm.isFormValid, dirty: false
                });
            }

        });

        $scope.$on('$destroy', function () {
            PropertyGridDirective.isPropertyFocused = false;
            $element.off('keypress', clearFocus);
            $document.off('click', clearFocus);
        });

    }
})();

(function () {
    'use strict';

    /**
    * @ngdoc directive
    * @access internal
    * @name sitPropertyGridLayout
    * @module siemens.simaticit.common.widgets.propertyGrid
    * @description
    * _(Internal)_ Directive called to generate the property-grid in configured layout display mode.
    * @usage
    * This directive should be used only by the property-grid.
    */
    /*
    * @param {string} mode Display mode of the data (Read, Edit, Add)
    * @param {object} data (optional) Contains content of the directive
    * @param {string} id Contains identifier of the property-grid
    */
    angular.module('siemens.simaticit.common.widgets.propertyGrid').directive('sitPropertyGridLayout', PropertyGridLayoutDirective);

    PropertyGridLayoutDirective.$inject = ['$filter', '$compile', 'common.widgets.propertyGrid.service', '$timeout'];
    function PropertyGridLayoutDirective($filter, $compile, propertyGridService, $timeout) {
        return {
            scope: {
                data: "=?sitData",
                mode: "@sitMode",
                id: "@sitId"
            },
            bindToController: {
                data: "=?sitData",
                mode: "@sitMode",
                id: "@sitId"
            },
            controllerAs: 'sitPropertyGridLayoutCtrl',
            controller: PropertyGridLayoutController,
            require: "^sitPropertyGrid",
            restrict: 'E',
            link: function (scope, element, attrs, sitPropertyGridCtrl) {
                var html = '';
                var currentForm,
                    LOAD_COMPLETE_TIME = 100,
                    formState = {
                        validity: false,
                        dirty: false
                    },
                    formWatches = [];
                function formToWatch() {
                    if (undefined !== currentForm) {
                        formState.validity = currentForm.$valid;
                        formState.dirty = currentForm.$dirty;
                    }
                    return formState;
                }

                function calcFlexBasis(width) {
                    if (width >= 1366) {
                        return '25%';
                    }
                    else if (width >= 768) {
                        return '33%';
                    }
                    else if (width >= 320) {
                        return '50%';
                    }

                        return '100%';

                }

                function propertyGridCreation(scope, attrs, element, pgCtrl) {
                    if (scope.mode === 'edit') {
                        if (pgCtrl.transclusionIsSet === true) {
                            html = "<div></div>";
                            element.html($compile(html)(scope));
                            currentForm = scope.$parent['Form' + scope.id];
                        } else {
                            html = propertyGridService.createPropertyGridLayoutHtml(scope.data, pgCtrl.layout, pgCtrl.type, false,
                                pgCtrl.showGroups, pgCtrl.groups, $filter, pgCtrl.columns);
                            html = "<form name='Form" + scope.id + "'>" + html + "</form>";
                            element.html('');
                            scope['Form' + scope.id] = undefined;
                            element.html($compile(html)(scope));
                            currentForm = scope['Form' + scope.id];

                            //focus property-element
                            var widget = propertyGridService.getFocusElement();
                            propertyGridService.clearFocusElement();
                            if (widget) {
                                pgCtrl.setElementFocus(widget);
                            }
                        }

                        //triggers the 'sit-property-grid.validity-changed' event and sitStateChange callback on load
                        pgCtrl.setValidity(formToWatch().validity);
                        pgCtrl.onFormStatusChange(currentForm);
                        activateFormWatch(pgCtrl);

                        //Bind the formController to property grid
                        pgCtrl.hasOwnProperty('form')
                        && currentForm
                        && $timeout(function () {
                            //The form-controller of child properties are available only after it loads. Hence retreiving the form controllers after a delay.
                            setFormController(pgCtrl);
                            activateFormControlsWatch(pgCtrl);
                        }, LOAD_COMPLETE_TIME);

                    }
                    else {
                        if (pgCtrl.transclusionIsSet === true) {
                            html = "<div></div>";
                        }
                        else {
                            html = propertyGridService.createPropertyGridLayoutHtml(scope.data, pgCtrl.layout, pgCtrl.type, true,
                                pgCtrl.showGroups, pgCtrl.groups, $filter, (pgCtrl.mode || scope.mode), pgCtrl.columns);
                        }
                        element.html($compile(html)(scope));
                    }

                    if (pgCtrl.layout.toUpperCase() === 'HORIZONTAL' && pgCtrl.type.toUpperCase() === 'FLUID' && scope.mode.toUpperCase() !== 'LIST') {
                        var propertyGridWidth = element.width();
                        var flexX = calcFlexBasis(propertyGridWidth);
                        element.find('div.property-fluid').css('flex-basis', flexX);
                    }
                }

                propertyGridCreation(scope, attrs, element, sitPropertyGridCtrl);

                var propertyLabels = element.find('span[class="property-label-ellipsis"]');

                function onMouseEnterEvent() {
                    var propertyLabel = $(this);
                    if (this.offsetWidth < this.scrollWidth) {
                        propertyLabel.attr("title", propertyLabel.html());
                    } else {
                        propertyLabel.removeAttr("title");
                    }
                }

                propertyLabels.on("mouseenter", onMouseEnterEvent);

                function activateFormWatch(pgCtrl) {
                    formWatches[formWatches.length] = scope.$watch(formToWatch, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            if (newValue.validity !== oldValue.validity) {
                                //triggers the 'sit-property-grid.validity-changed' event
                                pgCtrl.setValidity(newValue.validity);
                            }

                            //invokes sitStateChange callback function
                            pgCtrl.onFormStatusChange(currentForm);
                        }
                    }, true);
                }

                function activateFormControlsWatch(pgCtrl) {
                    formWatches[formWatches.length] = scope.$watchCollection(function () {
                        return currentForm.$$controls;
                    }, function (newVal, oldVal) {
                        if (newVal === oldVal) { return; }
                        setFormController(pgCtrl);
                    });
                }

                function setFormController(pgCtrl) {
                    var propertyForm = {},
                        propertyId;

                    currentForm.$$controls.forEach(function (control) {
                        if (control.$$controls && control.$name) {
                            propertyId = angular.element(control.$$element).parent().attr('sit-id');
                            if (control.$name === 'entityPickerForm') {
                                //finds the id of iconPicker since entityPicker and iconPicker shares same form.
                                var iconPickerElement = angular.element(control.$$element).parents('sit-icon-picker');
                                iconPickerElement.length > 0 && (propertyId = iconPickerElement.attr('sit-id'));
                            } else if (control.$name === 'singleselectForm') {
                                //finds the id of sit-select
                                var selectElement = angular.element(control.$$element).parents('sit-select');
                                selectElement.length > 0 && (propertyId = selectElement.attr('sit-id'));
                            } else if (control.$name === 'multiselectForm') {
                                //finds the id of sit-multi-select
                                var multiSelectElement = angular.element(control.$$element).parents('sit-multi-select');
                                multiSelectElement.length > 0 && (propertyId = multiSelectElement.attr('sit-id'));
                            }
                            if (!propertyId || propertyId === 'undefined' || propertyId === 'null') {
                                return;
                            }
                            propertyForm[propertyId] = control;
                        }
                    });
                    pgCtrl.form = {
                        id: pgCtrl.id,
                        form: currentForm,
                        properties: propertyForm
                    };
                }

                scope.$watch(
                    function () { return scope.data; },
                    function (oldV, newV) {
                        if (oldV === newV) { return; }
                        formWatches.forEach(function (watcher) {
                            watcher();
                        });
                        propertyGridCreation(scope, attrs, element, sitPropertyGridCtrl);
                    }
                    );
                scope.$on("$destroy", function () {
                    propertyLabels.off("mouseenter", onMouseEnterEvent);
                    formWatches.forEach(function (watcher) {
                        watcher();
                    });
                });
            }
        };
    }
    function PropertyGridLayoutController() { }

})();

/*jshint -W098 */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name propertyGridService
     * @module siemens.simaticit.common.widgets.propertyGrid
     * @access internal
     * @description Contains methods for the generation of HTML equivalent files for the Property Grid.
     */
    angular.module('siemens.simaticit.common.widgets.propertyGrid').service('common.widgets.propertyGrid.service', PropertyGridService);

    PropertyGridService.$inject = ["common.widgets.propertyGrid.listService"];
    function PropertyGridService(propertyGridListService) {
        var vm = this;
        var $filter;
        vm.getFocusElement = getFocusElement;
        vm.clearFocusElement = clearFocusElement;
        vm.createPropertyGridLayoutHtml = createPropertyGridLayoutHtml;

        var displayMode;
        var containerClass = {
            'Vertical': 'property',
            'Horizontal-Fixed': 'property',
            'Horizontal-Fluid': 'property property-fluid'
        };

        var labelClass = {
            'Vertical': 'vertical-property-grid-control-label',
            'Horizontal-Fixed': 'property-grid-col-label-fixed',
            'Horizontal-Fluid': 'property-grid-col-label-fluid'
        };

        var valuesClass = {
            'Horizontal-Fixed': 'property-grid-col-value-fixed',
            'Horizontal-Fluid': 'property-grid-col-value-fluid'
        };

        var focusWidget = null;

        /**
         * @ngdoc method
         * @name propertyGridService#createPropertyGridLayoutHtml
         * @module siemens.simaticit.common.widgets.propertyGrid
         * @access internal
         * @description Creates an HTML template for the Property Grid with given data, layout and display mode.
         *
         * @param {Object} data Contains data used to generate the HTML template.
         * @param {String} layout Specifies the layout with which the Property Grid is to be displayed.
         * @param {String} type Specifies the layout type with which the Property Grid is to be displayed.
         * @param {Boolean} isViewMode Specifies the display mode in which Property Grid is to be displayed.
         *
         * @returns {String}  HTML string to be compiled by the `sitPropertyGridLayout` directive.
         *
         */
        function createPropertyGridLayoutHtml(data, layout, type, isViewMode, isInsideGroup, groups, filterService, mode, columns) {
            $filter = filterService;
            vm.horizontalList = {};
            vm.propertyCount = 0;
            vm.subPropertiesCount = 0;
            displayMode = mode;
            var concat = '';
            var isDivOpened = false;
            var isDivClosed = true;
            var propertyGridLayout = getPropertyGridLayout(data, groups);
            // setting column number by default if the user does not configured column number in Horizontal Fluid type for list mode.
            if (type === 'Fluid' && mode === 'list') {
                columns = columns ? columns : 1;
            }
            angular.forEach(propertyGridLayout, function (obj) {

                if (obj.type === 'group' && layout === 'Vertical' || obj.type === 'group' && layout === 'Horizontal' && displayMode !== 'list') {
                    if (!isDivClosed) {
                        concat += '</div></div>'
                        isDivOpened = false;
                        isDivClosed = true;
                    }
                    concat += '<sit-property-group sit-id="' + obj.id + '" sit-name="\'' + obj.name + '\'" sit-collapsible="' + obj.collapsible + '">';
                    angular.forEach(obj.fields, function (field) {
                        if (!field.invisible) {
                            concat += createPropertyHtml(field, field.index, layout, type, isViewMode, isInsideGroup);
                        }
                    });
                    concat += '</sit-property-group>';
                } else if (!obj.invisible) {
                    if (displayMode === 'list' && layout === 'Vertical') {
                        if (!isDivOpened) {
                            isDivClosed = false;
                            isDivOpened = true;
                            concat += '<div><div class="property-grid-vertical-list-layout">' + createPropertyHtml(obj, obj.index, layout, type, isViewMode, isInsideGroup);
                        } else {
                            concat += createPropertyHtml(obj, obj.index, layout, type, isViewMode, isInsideGroup);
                        }
                    } else if (displayMode === 'list' && layout === 'Horizontal' && columns) {
                        if (!isInsideGroup) {
                            var field = '';
                            var isGroup = false;
                            getHorizontalLayout(field, isGroup, data, layout, type, isViewMode, isInsideGroup, groups, filterService, mode, columns, obj);
                        }
                        else {
                            if (obj.type === 'group') {
                                vm.horizontalList = {};
                                vm.propertyCount = 0;
                                vm.subPropertiesCount = 0;
                                if (!isDivClosed) {
                                    isDivOpened = false;
                                    isDivClosed = true;
                                    concat += '</div></div>'
                                }
                                concat += '<sit-property-group sit-id="' + obj.id + '" sit-name="\'' + obj.name + '\'" sit-collapsible="' + obj.collapsible + '">';
                                angular.forEach(obj.fields, function (field) {
                                    if (!field.invisible) {
                                        getHorizontalLayout(field, true, data, layout, type, isViewMode, isInsideGroup, groups, filterService, mode, columns, obj);
                                    }
                                });
                                angular.forEach(vm.horizontalList, function (property) {
                                    concat += '<div class="horizontal-fixed-group"><div class="pl-table">' + property + '</div></div>';
                                })
                                concat += '</sit-property-group>';
                            }
                            else {
                                if (!isDivOpened) {
                                    isDivClosed = false;
                                    isDivOpened = true;
                                    concat += '<div><div class="horizontal-mode">'
                                }
                                concat += createPropertyHtml(obj, obj.index, layout, type, isViewMode, isInsideGroup);
                            }
                        }
                    } else {
                        concat += createPropertyHtml(obj, obj.index, layout, type, isViewMode, isInsideGroup);
                    }

                }
            });
            if (isDivOpened) {
                concat += '</div"></div">'
            }
            if (displayMode === "list" && layout === "Horizontal" && !isInsideGroup) {
                angular.forEach(vm.horizontalList, function (property) {
                    concat += '<div class="horizontal-fixed-group"><div class="pl-table">' + property + '</div></div>';
                })
            }

            return concat;
        }

        function getHorizontalLayout(field, isGroup, data, layout, type, isViewMode, isInsideGroup, groups, filterService, mode, columns, obj) {
            vm.propertyCount = vm.propertyCount + 1;
            if (vm.propertyCount <= columns) {
                var listItem = "table" + vm.propertyCount;
                vm.horizontalList[listItem] = isGroup ? createPropertyHtml(field, field.index, layout, type, isViewMode, isInsideGroup) :
                    createPropertyHtml(obj, obj.index, layout, type, isViewMode, isInsideGroup);
            }
            if (vm.propertyCount > columns) {
                vm.subPropertiesCount = (vm.subPropertiesCount >= columns ? vm.subPropertiesCount = 0 : vm.subPropertiesCount) + 1;
                vm.horizontalList["table" + vm.subPropertiesCount] += isGroup ? createPropertyHtml(field, field.index, layout, type, isViewMode, isInsideGroup) :
                    createPropertyHtml(obj, obj.index, layout, type, isViewMode, isInsideGroup);
            }

        }

        function getPropertyGridLayout(data, groups) {
            var layout = [], groupsCreated = [];
            angular.forEach(data, function (widgetObj, index) {
                widgetObj.index = index;
                var groupObjIndex = groupsCreated.indexOf(widgetObj.group);
                if (widgetObj.group && groupObjIndex !== -1) {
                    for (var i = 0; i < layout.length; i++) {
                        if (layout[i].id === widgetObj.group && layout[i].type === 'group') {
                            layout[i].fields.push(widgetObj);
                            break;
                        }
                    }
                } else if (widgetObj.group && groupObjIndex === -1) {
                    groupsCreated.push(widgetObj.group);
                    var groupDetails = getGroupDetails(widgetObj.group, groups);
                    layout[layout.length] = {
                        type: 'group',
                        id: groupDetails.id,
                        name: groupDetails.name,
                        collapsible: groupDetails.collapsible,
                        fields: [widgetObj]
                    };
                } else {
                    layout.push(widgetObj);
                }
            });
            return layout;
        }

        function getGroupDetails(id, groups) {
            var groupDetails = {
                id: id,
                name: id,
                collapsible: true
            };
            if (!groups) {
                return groupDetails;
            }
            var groupIndex = _.findIndex(groups, { id: id });
            if (groupIndex !== -1) {
                groupDetails.name = groups[groupIndex].name || id;
                groupDetails.collapsible = groups[groupIndex].collapsible !== undefined ? groups[groupIndex].collapsible : true;
            }
            return groupDetails;
        }

        function createPropertyHtml(widgetObject, key, layout, type, isViewMode, isInsideGroup) {
            var concat = '';
            var propertyListValue = propertyGridListService.parseValue(widgetObject);
            concat += "<div class='" + getPropertyContainerClass(layout, type) + "'>";

            concat += "<div class='" + (isViewMode && displayMode === 'list' ? "pl-label " : "") + getPropertyLabelClass(layout, type, isInsideGroup) + "'>";
            concat += generatePropertyGridLabel(widgetObject);
            concat += "</div>";

            concat += "<div class='" + (isViewMode && displayMode === 'list' ? "pl-value " : "") + getPropertyValueClass(layout, type, isInsideGroup) + "' title= '" + propertyListValue +"'>";
            concat += isViewMode && displayMode === 'list' ? propertyListValue :
                generatePropertyGridValue(widgetObject, "data[" + key + "]", isViewMode);
            concat += "</div>";

            concat += "</div>";
            setFocusElement(widgetObject);
            return concat;
        }

        function getPropertyContainerClass(layout, type) {
            if (layout === 'Vertical') {
                return containerClass[layout];
            }
            return containerClass[layout + '-' + type];
        }

        function getPropertyLabelWidth(isInsideGroup) {
            var widthClass;
            if (isInsideGroup) {
                widthClass = 'property-group-col-width';
            } else {
                widthClass = 'property-grid-col-label-width';
            }
            return widthClass;
        }

        function getPropertyValueWidth(isInsideGroup) {
            var widthClass;
            if (isInsideGroup) {
                widthClass = 'property-group-col-width';
            } else {
                widthClass = 'property-grid-col-value-width';
            }
            return widthClass;
        }

        function getPropertyLabelClass(layout, type, isInsideGroup) {
            if (layout === 'Vertical') {
                return labelClass[layout] + ' ' + getPropertyLabelWidth(isInsideGroup);
            }
            return labelClass[layout + '-' + type] + ' ' + getPropertyLabelWidth(isInsideGroup);
        }

        function generatePropertyGridLabel(widget) {
            var widgetLabel = "";

            if (widget.invisible) { return ''; }

            if (angular.isDefined(widget.label) && widget.label) {
                widgetLabel = "<span title='" + widget.label + "' class='property-label property-label-ellipsis'>" + widget.label + "</span>" +
                    (widget.validation && widget.validation.required ? '<span class="asterisk">*</span>' : '');
            } else {
                widgetLabel = "Label undefined";
            }
            return widgetLabel;
        }

        function getPropertyValueClass(layout, type, isInsideGroup) {
            if (layout === 'Horizontal') {
                return valuesClass[layout + '-' + type] + ' ' + getPropertyValueWidth(isInsideGroup);
            } else {
                return '';
            }
        }

        function generatePropertyGridValue(widget, dataToBind, isViewMode) {
            var concat = "";
            //Alone widget
            if (!angular.isArray(widget.widget)) {
                var read_only = isViewMode || widget.read_only || false;
                var disabled = widget.disabled;

                if (widget.widget !== 'sit-entity-picker') {
                    var type = "sit-text";
                    var temp = widget.label || widget.id || widget.name;
                    var idName = temp.replace(/ /g, '').toLowerCase();
                    var id = widget.id || idName;
                    var name = widget.name || idName;

                    //identify the widget type
                    var typeo = typeof widget.value;

                    switch (typeo) {
                        case "number":
                            type = "sit-numeric";
                            break;
                        case "string":
                            if (widget.value.length > 80) {
                                type = "sit-textarea";
                            }
                            break;
                        case "boolean":
                            type = "sit-checkbox";
                            widget.value = [{ label: "", checked: widget.value }];
                            break;
                        case "object":
                            if (angular.isDate(widget.value)) {
                                type = "sit-datepicker";
                            }
                            break;
                        default:
                            break;
                    }

                    concat += "<" + (widget.widget || type) + " ";
                    concat += "sit-id='" + widget.id + "' ";
                    concat += "sit-name='" + name + "' ";
                    concat += "sit-value='" + dataToBind + ".value' ";
                    concat += "sit-validation='" + dataToBind + ".validation' ";
                    concat += "ng-readonly='" + read_only + "' ";
                    concat += "class='property-grid-input-group' ";
                    concat += "ng-model='" + dataToBind + ".value' ";
                    concat += "ng-disabled='" + disabled + "'";
                    angular.forEach(widget.widgetAttributes, function (value, key) {
                        var angularKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                        if (widget.widget === 'sit-time-picker' && angularKey === 'show-meridian') {
                            concat += angularKey + "='" + dataToBind + ".widgetAttributes." + key + "' ";
                        } else {
                            concat += "sit-" + angularKey + "='" + dataToBind + ".widgetAttributes." + key + "' ";
                        }
                    });
                    if (widget.widgetAttributes && widget.widgetAttributes.hasOwnProperty('accept')) {
                        concat += "accept='" + dataToBind + ".widgetAttributes.accept' ";
                    }

                    if (widget.widget === 'sit-text' || widget.widget === 'sit-textarea') {
                        concat += " sit-placeholder='" + dataToBind + ".placeholder' ";
                    }

                    concat += ">";
                    concat += "</" + (widget.widget || type) + ">";
                } else if (widget.widget === 'sit-entity-picker') {

                    concat += "<sit-entity-picker" + " ";
                    concat += "sit-id='" + widget.id + "'";
                    concat += "sit-name='" + dataToBind + ".widgetAttributes.name' ";
                    concat += "sit-datasource='" + dataToBind + ".widgetAttributes.datasource' ";
                    concat += "sit-value='" + dataToBind + ".value' ";
                    concat += "sit-selected-object='" + dataToBind + ".widgetAttributes.selectedObject' ";
                    concat += "sit-template-url='" + dataToBind + ".widgetAttributes.templateUrl' ";
                    concat += "sit-validation='" + dataToBind + ".validation' ";
                    concat += "sit-placeholder='" + dataToBind + ".widgetAttributes.placeholder' ";
                    concat += "sit-selected-attribute-to-display='" + dataToBind + ".widgetAttributes.selectedAttributeToDisplay' ";
                    concat += "sit-attribute-to-search='" + dataToBind + ".widgetAttributes.attributeToSearch' ";
                    concat += "sit-picker-options='" + dataToBind + ".widgetAttributes.pickerOptions' ";
                    concat += "sit-change='" + dataToBind + ".widgetAttributes.change' ";
                    concat += "ng-readonly='" + read_only + "' ";
                    concat += "ng-disabled='" + disabled + "'";
                    concat += "class='property-grid-input-group' ";
                    concat += ">";
                    concat += "</sit-entity-picker" + ">";
                }
            } else {  //in array
                //var concat = "";
                concat += "<div class='property-grid-input-group'>";
                angular.forEach(widget.widget, function (widget, key) {

                    if (widget.widgetAttributes === undefined || widget.widgetAttributes.type !== 'checkbox') {
                        concat += "<span class='property-grid-span-group-inline'>"; //Display controls on the same line
                        concat += "<div style='display: table; width: 100%; height: 100%'>";
                        concat += generatePropertyGridValue(widget, dataToBind + ".widget[" + key + "]", isViewMode);
                        concat += "</div>";

                    }
                    else {
                        concat += "<span class='property-grid-span-group-block ";  //One line by control
                        if (!(isViewMode || widget.read_only)) {
                            concat += "validator-control";
                        }
                        concat += "'>";
                        concat += generatePropertyGridValue(widget, dataToBind + ".widget[" + key + "]", isViewMode);
                    }

                    concat += "</span>";
                });
                concat += "</div>";
            }
            return concat;
        }

        function setFocusElement(widgetObject) {
            if (widgetObject.autofocus === true && !focusWidget && widgetObject.read_only !== true) {
                focusWidget = widgetObject.widget;
            }
        }

        /**
         * @ngdoc method
         * @name propertyGridService#getFocusElement
         * @module siemens.simaticit.common.widgets.propertyGrid
         * @access internal
         * @description Returns the name of the widget whose auto-focus property is true
         * @returns {String} The name of the widget.
         */
        function getFocusElement() {
            return focusWidget;
        }

        /**
         * @ngdoc method
         * @name propertyGridService#clearFocusElement
         * @module siemens.simaticit.common.widgets.propertyGrid
         * @access internal
         * @description Clears the currently focused widget name.
         */
        function clearFocusElement() {
            focusWidget = null;
        }


    }
})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.propertyGrid').directive('sitPropertyGroup', PropertyGroupDirective);

    function PropertyGroupDirective() {
        return {
            scope: {},
            transclude: true,
            require: ['sitPropertyGroup', '^sitPropertyGrid'],
            controller: PropertyGroupCtrl,
            controllerAs: 'propertyGroupCtrl',
            bindToController: {
                sitId: '@sitId',
                name: '=?sitName',
                isCollapsible: '=?sitCollapsible',
                accordion: '=?sitShowAccordion'
            },
            link: function (scope, elmnt, attrs, ctrls, transclude) {
                var vm = ctrls[0];
                var propertyGridCtrl = ctrls[1];
                vm.toggle = function() {
                    if (vm.singleSelection) {
                        collapseAll();
                        vm.isCollapsed = !vm.isCollapsed;
                    }
                }

                function collapseAll() {
                    if (vm.singleSelection && propertyGridCtrl.groupList) {
                        for (var item in propertyGridCtrl.groupList) {
                            if (propertyGridCtrl.groupList[item] !== vm) {
                                propertyGridCtrl.groupList[item].isCollapsed = true;
                            }
                        }
                    }
                }


                if (propertyGridCtrl.singleSelectionInGroup === 'true') {
                    vm.singleSelection = true;
                    vm.isCollapsed === undefined && (vm.isCollapsed = true);
                    propertyGridCtrl.groupList = propertyGridCtrl.groupList || {}
                    propertyGridCtrl.groupList[vm.sitId] = vm;
                }

                if (vm.isCollapsible === undefined) {
                    vm.isCollapsible = true;
                }
                if (vm.name === undefined) {
                    vm.name = vm.sitId;
                }
                if (vm.accordion === undefined) {
                    vm.accordion = true;
                }
                vm.parentScope = {
                    mode: propertyGridCtrl.mode,
                    layout: propertyGridCtrl.layout,
                    id: propertyGridCtrl.id,
                    type: propertyGridCtrl.type,
                    columns: propertyGridCtrl.columns
                };
            },
            templateUrl: 'common/widgets/propertyGrid/property-group.html'
        };
    }

    PropertyGroupCtrl.$inject = ["$filter"];
    function PropertyGroupCtrl($filter) {
        var vm = this;

        activate();

        function activate() {
            init();
        }

        function init() {
            vm.svgIcon = {
                path: 'common/icons/miscRightArrow16.svg'
            };
        }

    }

})();

/*
 * Copyright (C) Siemens AG 2015.
 * All Rights Reserved. Confidential.
 *
 * Descr.:
 * Element directive which prepares a widget for sit-property
 *
 * Authors: Suneel Korada (Suneel.Korada@siemens.com)
 *
 */

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.propertyGrid').directive('sitPropertyItem', PropertyItemDirective);
    PropertyItemDirective.$inject = ['$compile'];
    function PropertyItemDirective($compile) {
        var sitPropertyItem = {
            restrict: 'E',
            bindToController: {
                widget: '@sitWidget',
                name: '@sitName',
                value: '=?sitValue',
                validation: '=?sitValidation',
                readOnly: '=?sitReadOnly',
                placeholder: '=?sitPlaceholder',
                limit: '=?sitLimit',
                templateUrl: '=?sitTemplateUrl',
                selectedAttributeToDisplay: '=?sitSelectedAttributeToDisplay',
                attributeToSearch :'=?sitAttributeToSearch',
                options: '=?sitOptions',
                toDisplay: '=?sitToDisplay',
                toKeep: '=?sitToKeep',
                sitDatasource: '=?',
                sitSelectedObject: '=?',
                sitEditable: '=?',
                accept: '=?accept',
                minSize: '=?sitMinSize',
                maxSize: '=?sitMaxSize',
                sitSelectedString: '=?',
                sitSplitList: '=?',
                sitDoneCallback: '=?',
                format: '=?sitFormat',
                appendToBody: '=?sitAppendToBody',
                showButtonBar: '=?sitShowButtonBar',
                showWeeks: '=?sitShowWeeks',
                showMeridian: '=?sitShowMeridian',
                widgetAttributes: '=?sitWidgetAttributes',
                ngRequired: '@?',
                ngBlur: '&?',
                sitChange: '=?',
                sitRequired: '=?',
                ngDisabled: '=?',
                ngFocus: '&?',
                ngReadonly: '=?',
                sitId: '@?',
                sitAllowReset :'=?'
            },
            scope: true,
            controller: PropertyItemController,
            controllerAs: 'PropertyItemCtrl',
            link: {
                pre: preLinkFn
            }
        };

        function preLinkFn(scope, element, attrs, ctrl) {
            var widgetTag = ' sit-name="{{PropertyItemCtrl.name}}"' + 'sit-id="' + attrs.sitId + '"' +
                    ' sit-show-button-bar="PropertyItemCtrl.showButtonBar"' +
                    ' sit-read-only="PropertyItemCtrl.readOnly" sit-value="PropertyItemCtrl.value" ng-model="PropertyItemCtrl.value" sit-validation="PropertyItemCtrl.validation"' +
                    ' sit-options="PropertyItemCtrl.options" sit-to-display="PropertyItemCtrl.toDisplay" sit-to-keep="PropertyItemCtrl.toKeep"' +
                    ' sit-datasource="PropertyItemCtrl.sitDatasource" sit-limit="PropertyItemCtrl.limit" sit-editable="PropertyItemCtrl.sitEditable"' +
                    ' accept = "PropertyItemCtrl.accept" sit-min-size = "PropertyItemCtrl.minSize" sit-max-size = "PropertyItemCtrl.maxSize"' +
                    ' sit-selected-string="PropertyItemCtrl.sitSelectedString" sit-split-list="PropertyItemCtrl.sitSplitList"'+
                    ' sit-done-callback="PropertyItemCtrl.sitDoneCallback()" sit-placeholder="PropertyItemCtrl.placeholder"'+
                    ' sit-selected-object="PropertyItemCtrl.sitSelectedObject" sit-selected-attribute-to-display="PropertyItemCtrl.selectedAttributeToDisplay"'+
                    ' sit-attribute-to-search="PropertyItemCtrl.attributeToSearch" sit-template-url="PropertyItemCtrl.templateUrl" sit-format="PropertyItemCtrl.format"'+
                    ' sit-append-to-body="PropertyItemCtrl.appendToBody" sit-show-button-bar="PropertyItemCtrl.showButtonBar" sit-show-weeks="PropertyItemCtrl.showWeeks"'+
                    ' sit-show-meridian="PropertyItemCtrl.showMeridian" ng-required="PropertyItemCtrl.ngRequired" ng-blur="PropertyItemCtrl.ngBlur()"'+
                    ' sit-change="PropertyItemCtrl.sitChange" ng-disabled="PropertyItemCtrl.ngDisabled" ng-focus="PropertyItemCtrl.ngFocus()"'+
                    ' ng-readonly="PropertyItemCtrl.ngReadonly" class="' + attrs.class + '"' + ' sit-allow-reset="PropertyItemCtrl.sitAllowReset"';

            if (attrs.sitWidget === 'sit-entity-picker') {
                widgetTag += ' sit-required="PropertyItemCtrl.sitRequired"';
            }


            widgetTag = '<' + attrs.sitWidget + widgetTag + '></' + attrs.sitWidget + '>';
            widgetTag = angular.element(widgetTag);

            if ('' !== attrs.sitWidgetAttributes && undefined !== attrs.sitWidgetAttributes && ctrl.widgetAttributes) {

                for (var i = 0, attrArray = Object.keys(ctrl.widgetAttributes), len = Object.keys(ctrl.widgetAttributes).length; i < len; i++) {
                    var value = 'PropertyItemCtrl.widgetAttributes["' + attrArray[i] + '"]';
                    widgetTag.attr(attrArray[i], value);
                }
            }

            widgetTag = $compile(widgetTag)(scope);
            element.append(widgetTag);
        }

        return sitPropertyItem;
    }

    function PropertyItemController() { }

})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.propertyGrid').service('common.widgets.propertyGrid.listService', PropertyGridListService);
    PropertyGridListService.$inject = ["$filter"];
    function PropertyGridListService($filter) {
        var vm = this;
        activate();
        function activate() {
            vm.parseValue = parseValue;
        }

        function sanatize(value) {
            var newValue = value;
            value === null && (newValue = '');
            value === undefined && (newValue = '');
            angular.isArray(value) && (newValue = value.join(','));
            return newValue;
        }

        function parseValue(property) {
            var value = '';
            var search, options;
            switch (property.sitWidget || property.widget) {
                case 'sit-textarea':
                    value = property.value;
                    break;
                case 'sit-numeric':
                    value = property.value;
                    break;
                case 'sit-email':
                    value = property.value;
                    break;
                case 'sit-text':
                    value = property.value;
                    break;
                case 'sit-icon':
                    value = property.value;
                    break;
                case 'sit-password':
                    value = property.value;
                    break;
                case 'sit-datepicker':
                    value = $filter('date')(property.value, property.format);
                    break;
                case 'sit-time-picker':
                    value = $filter('date')(property.value, property.format);
                    break;
                case 'sit-radio':
                    radioList();
                    break;
                case 'sit-rich-radio':
                    radioList()
                    break;
                case 'sit-select':
                    selectList();
                    break;
                case 'sit-entity-picker':
                    entityPickerList();
                    break;
                case 'sit-typeahead':
                    typeaheadList();
                    break;
                case 'sit-multi-select':
                    multiSelectList();
                    break;
                case 'sit-checkbox':
                    checkboxList();
                    break;
                case 'sit-file-uploader':
                    property.value && property.value.name && (value = property.value.name);
                    break;
                default:
                    value = property.value;
            }

            function radioList() {
                property.options && property.options.length > (options = property.options);
                property.widgetAttributes && property.widgetAttributes['sit-options'] &&
                    property.widgetAttributes['sit-options'].length > (options = property.widgetAttributes['sit-options']);
                if (options && options.length > 0) {
                    search = _.findWhere(options, { value: property.value });
                    search && (value = search.label);
                }
            }

            function selectList() {
                if (property.value && property.value.id) {
                    if (property.widgetAttributes && property.widgetAttributes['sit-options']) {
                        search = _.findWhere(property.widgetAttributes['sit-options'], { id: property.value.id });
                        search && (value = search[property.widgetAttributes['sit-to-display']]);
                    }
                    if (property.options && property['to-display']) {
                        search = _.findWhere(property.options, { id: property.value.id });
                        search && (value = search[property.widgetAttributes['to-display']]);
                    }
                }
            }

            function entityPickerList() {
                if (property.value && property.value.name) {
                    value = property.value.name;
                } else if (property.widgetAttributes['sit-selected-object'] && property.widgetAttributes['sit-selected-attribute-to-display']) {
                    value = property.widgetAttributes['sit-selected-object'][property.widgetAttributes['sit-selected-attribute-to-display']];
                }
            }

            function typeaheadList() {
                if (property.value) {
                    if (property.widgetAttributes && property.widgetAttributes['sit-to-display']) {
                        value = property.value[property.widgetAttributes['sit-to-display']];
                    } else {
                        angular.isArray(property.value) && (value = property.join(','));
                        typeof property.value === "string" && (value = property.value)
                    }
                }
            }

            function multiSelectList() {
                if (property.value) {
                    angular.isArray(property.value) && (value = property.join(','));
                    typeof property.value === "string" && (value = property.value)
                }
            }

            function checkboxList() {
                if (property.value && angular.isArray(property.value) && property.value.length > 0) {
                    if (property.value.length === 1) {
                        search = property.value[0];
                        (!search.label || search.label === '') && (value = search.checked ? $filter('translate')('common.yes') : $filter('translate')('common.no'));
                        return;
                    }
                    search = _.where(property.value, { checked: true });
                    value = _.map(search, function (item) { return item.label; }).join(',');
                }
            }
            return sanatize(value);
        }
    }

})();
