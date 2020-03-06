/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.validator
     * @description Provides utilities for input validation in forms.
     */
    angular.module('siemens.simaticit.common.widgets.validator', []);

})();

(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.validator');

    /**
    * @ngdoc directive
    * @module siemens.simaticit.common.widgets.validator
    * @name sitFormInputValidator
    * @priority 2
    * @description
    * An utility directive to display validation messages consistently with the user experience
    * (a warning icon triggering the display of the validation message within a notification tile).
    *
    * @usage As an element:
    * ```
    * <input type='text'
    *        ng-model='textCtrl.value'
    *        ng-required='textCtrl.validation.required'
    *        ng-minlength='textCtrl.validation.minlength'
    *        ng-maxlength='textCtrl.validation.maxlength'
    *        ng-pattern='textCtrl.validation.pattern'
    *        shared-model='true'
    *        sit-form-input-validator />
    * ```
    *
    * @example
    * In the following example, the sit-form-input-validator directive is used on a text input field. Note that:
    *
    * * The input element containing the sit-form-input-validator directive must be placed within an ng-form directive.
    * * An ng-model directive must be used within the input element containing the sit-form-input-validator.
    * * If ng-model is shared across the input fields, the sitchange event may be triggered multiple times , to avoid this
    *  set the attribute shared-model='true'. If the attribute is not present , the default value is false.
    *
    * ```
    * <ng-form name='textForm' ng-if="!(textCtrl.readOnly || textCtrl.ngReadonly)" ng-class="{'isrequired' :(textCtrl.validation.required) && textCtrl.value!==undefined}">
    *   <div class='property-grid-input-group'>
    *     <input type='text'
    *        ng-class='((textForm.$invalid && textForm.$dirty) || (textForm.$invalid && textForm.$visited)) ? "validator-control-invalid" : "validator-control"'
    *        ng-model='textCtrl.value'
    *        ng-required='textCtrl.validation.required'
    *        ng-minlength='textCtrl.validation.minlength'
    *        ng-maxlength='textCtrl.validation.maxlength'
    *        ng-pattern='textCtrl.validation.pattern'
    *        sit-change="textCtrl.sitChange"
    *        shared-model='true'
    *        sit-form-input-validator />
    *   </div>
    * </ng-form>
    * ```
    *
    */
    ValidatorController.$inject = ['$scope', '$filter', 'common.widgets.notificationTile.service'];

    function ValidatorController($scope, $filter, notificationTileService) {
        var vm = this;

        vm.warningClicked = function (form, event) {
            var errors = [];

            if (form.$error) {
                var field = $filter('translate')('validator.errors.noLabel');
                if (form.labelInfo) {
                    field = form.labelInfo;
                }
                switch (Object.keys(form.$error)[0]) {
                    case "required": {
                        errors.push($filter('translate')('validator.errors.required', { field: field }));
                        break;
                    }
                    case "max": {
                        errors.push($filter('translate')('validator.errors.max', { field: field, value: vm.validation.max }));
                        break;
                    }
                    case "maxlength": {
                        errors.push($filter('translate')('validator.errors.maxlength', { field: field, value: vm.validation.maxlength }));
                        break;
                    }
                    case "min": {
                        errors.push($filter('translate')('validator.errors.min', { field: field, value: vm.validation.min }));
                        break;
                    }
                    case "minlength": {
                        errors.push($filter('translate')('validator.errors.minlength', { field: field, value: vm.validation.minlength }));
                        break;
                    }
                    case "pattern": {
                        errors.push($filter('translate')('validator.errors.pattern', { field: field, value: vm.validation.patternInfo }));
                        break;
                    }
                    case "number": {
                        errors.push($filter('translate')('validator.errors.number', { field: field }));
                        break;
                    }
                    case "editable": {
                        errors.push($filter('translate')('validator.errors.editable', { field: field }));
                        break;
                    }
                    case "email": {
                        errors.push($filter('translate')('validator.errors.email', { field: field }));
                        break;
                    }
                    default: {
                        errors.push($filter('translate')('validator.errors.custom', { field: field, value: vm.validation.patternInfo }));

                    }
                }
            }

            $scope.warningMessage = "";

            for (var i = 0; i < errors.length; i++) {
                $scope.warningMessage += errors[i];
                $scope.warningMessage += "\n";
            }

            //typeahead(entityPicker) blur event hides the warning tile
            if (form.$name === 'entityPickerForm' && form.$invalid === true) {
                //preventing  typeahead blur event from triggering.
                event.preventDefault();
            }

            notificationTileService.shownotificationTile(vm.name);

            /**
             * @ngdoc event
             * @name sitFormInputValidator#validator-warning-icon-clicked
             * @module siemens.simaticit.common.widgets.validator
             * @eventType emit on scope
             * @description
             * Emitted when a validator warning icon is clicked.
             */
            $scope.$emit("validator-warning-icon-clicked", { itemForm: form, event: event, errors: errors });
        };
    }

    app.directive('sitFormInputValidator', ['$compile', function ($compile) {
        return {
            require: ['^form', 'sitFormInputValidator', 'ngModel'],
            priority: 2,
            bindToController: true,
            controller: ValidatorController,
            controllerAs: 'validatorCtrl',
            link: function (scope, element, attrs, ctrl) {
                var firstLoad = true;
                var formController = ctrl[0];
                var guid;
                var ngModelController = ctrl[2];
                var oldViewValue;
                var oldModelValue;
                var originalValue;
                var validatorController = ctrl[1];
                var isFormatterSitChange = (attrs['sharedModel'] === "true");

                element.bind('focus', onFocus);
                element.bind('blur', onBlur);

                function onFocus() {
                    formController.$focused = true;
                    if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
                        scope.$apply();
                    }
                }

                function onBlur() {
                    formController.$visited = true;
                    formController.$focused = false;
                    if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
                        scope.$apply();
                    }
                }

                ngModelController.$parsers.unshift(function (viewValue) {
                    var currentValue;

                    if (viewValue && viewValue.name) {
                        currentValue = viewValue.name;
                    } else {
                        currentValue = viewValue;
                    }

                    scope.$emit('sit-property-validator.buttonEnableDisable', { value: currentValue, originalValue: originalValue, guid: guid });

                    var ngModelUpdated = ngModelController;
                    if (validatorController.validation && typeof validatorController.validation.custom !== 'undefined') {
                        ngModelUpdated = validatorController.validation.custom(viewValue, ngModelController) || ngModelController;
                    }

                    if (typeof validatorController.sitChange !== 'undefined') {
                        validatorController.sitChange(ngModelController.$modelValue || ngModelController.$$rawModelValue, viewValue, ngModelUpdated, true);
                    }

                    oldViewValue = viewValue;
                    if (ngModelController) {
                        oldModelValue = ngModelController.$modelValue || ngModelController.$$rawModelValue;
                    }
                    return viewValue;
                });

                ngModelController.$formatters.unshift(function (viewValue) {
                    if (viewValue && viewValue.name) {
                        originalValue = viewValue.name;
                    } else {
                        originalValue = viewValue;
                    }

                    guid = window.$UIF.Utility.uuid();

                    var ngModelUpdated = ngModelController;
                    if (validatorController.validation && typeof validatorController.validation.custom !== 'undefined') {
                        ngModelUpdated = validatorController.validation.custom(viewValue, ngModelController) || ngModelController;
                    }

                    if (!firstLoad) {
                        var isValueChanged = false;
                        var oldValue = typeof (oldModelValue) === 'object' ? JSON.stringify(oldModelValue) : oldModelValue;
                        var newValue = typeof (ngModelUpdated.$modelValue) === 'object' ? JSON.stringify(ngModelUpdated.$modelValue) : ngModelUpdated.$modelValue;
                        if (typeof validatorController.sitChange !== 'undefined' && oldValue !== newValue && !isFormatterSitChange) {
                            isValueChanged = true;
                            validatorController.sitChange(oldViewValue, viewValue, ngModelUpdated, isValueChanged);
                        }
                        ngModelController.$setDirty();
                        oldModelValue = ngModelUpdated.$modelValue;
                    }

                    if (firstLoad) {
                        if (viewValue) {
                            formController.$visited = true;
                            formController.$focused = false;
                        }
                        firstLoad = false;
                    }

                    oldViewValue = viewValue;

                    return viewValue;
                });

                scope.$on('validator-submit-form', function () {
                    formController.$visited = true;
                });

                scope.name = scope.validatorCtrl.name = "validatorWarningTile" + Math.floor((window.$UIF.Utility.random() * 10000) + 1);

                var itemFormName = formController.$name;

                var concat = "";
                concat += "<div ng-show='(" + itemFormName + ".$invalid && (" + itemFormName + ".$dirty || " + itemFormName + ".$visited))' ";
                concat += "ng-class= \" " + itemFormName + ".$focused ? 'validator-warning-group-addon-focused input-group-addon' : 'validator-warning-group-addon input-group-addon' \"> ";
                concat += "<i ng-class= \" " + itemFormName + ".$focused ? 'fa fa-warning validator-warning-icon-focused' : 'fa fa-warning validator-warning-icon' \" ";
                concat += "ng-mousedown='validatorCtrl.warningClicked(" + itemFormName + ", $event)'>";
                concat += "</i>";

                // Notification tile
                concat += "<div data-sit-notification-tile style=\"position:absolute;right:-8px;\"";
                concat += " data-sit-tile-title=\"\"";
                concat += " data-sit-tile-propertygrid=\"true\"";
                concat += " data-sit-tile-content=\"warningMessage\"";
                concat += " data-sit-tile-type=\"'warning'\"";
                concat += " data-sit-tile-counter=\"\"";
                concat += " data-sit-tile-click=\"\"";
                concat += " data-sit-tile-popup=\"true\"";
                concat += " id=\"" + scope.name + "\"></div>";

                concat += "</div>";

                concat = $compile(concat)(scope);

                // add concat validation at the end for radio and checkbox

                if (element.attr("type") === "radio" || element.attr("type") === "checkbox") {
                    element.parent().after(concat);
                } else {
                    element.first().after(concat);
                }

                if (scope.validation !== undefined && scope.validation.patternInfo !== undefined) {
                    formController.patternInfo = scope.validation.patternInfo;
                }

                formController.labelInfo = attrs.sitFormInputValidator;
                // adding Validation data to Validator Controller
                if (attrs['required']) {
                    var inputCtrlName = attrs['ngRequired'].split('.')[0];
                    scope.validatorCtrl.validation = scope[inputCtrlName].validation;
                }

                if (attrs['sitChange']) {
                    var inputCtrl = attrs['sitChange'].split('.')[0];
                    scope.validatorCtrl.sitChange = scope[inputCtrl].sitChange;
                }

                scope.$watch(function () {
                    return scope[inputCtrlName].validation;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        scope.validatorCtrl.validation = newVal;
                    }
                });

                scope.$on('$destroy', function () {
                    element.unbind('focus', onFocus);
                    element.unbind('blur', onBlur);
                });
            }
        };
    }]);
})();
