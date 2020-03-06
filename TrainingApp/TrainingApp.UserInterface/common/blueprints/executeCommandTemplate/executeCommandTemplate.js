/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/* jshint -W071*/
(function () {
    'use strict';
    var ctrl = 'common.layout.modelDriven.template.ExecuteCommandCtrl';
    angular.module('siemens.simaticit.common.services.modelDriven')
        /**
          * @ngdoc controller
          * @name common.layout.modelDriven.template.ExecuteCommandCtrl
          * @module siemens.simaticit.common.services.modelDriven
          * @access public
          * @description
          * The controller for the MD action form template
          */
        .controller(ctrl, ["common.services.modelDriven.dataService", '$q', '$state', '$stateParams', '$translate', 'common.base', 'common.services.modelDriven.service',
            '$scope', '$parse', '$rootScope', 'common.services.modelDriven.contextService', '$filter', '$injector', '$timeout',
            function (multiDataService, $q, $state, $stateParams, $translate, base, md, $scope, $parse, $rootScope, mdContextSrv, $filter, applInjector, $timeout) {
                var self = this, sidePanelManager = base.services.sidePanel.service, backendService = base.services.runtime.backendService,
                    stateId = $state.$current.parent.toString(), actionName = $state.$current.toString().safeReplace(stateId + '.', ''),
                    outputParameters = {}, emptyKeepFieldValue = "", fillQueryResult = null, pendingEval = 0, listeners = [], action = null;
                self.currentItem = {};  //current form/activeFields container
                self.ngDisableItem = {}; //disable expression container
                self.ngClear = {}; //clear expression container
                self.calcValue = {}; //value expression container
                self.reloadOnChange = {}; //reload info expression container
                self.readingFunctionFields = {};
                self.customValidations = {};
                self.allValidations = {};
                self.forms = {};
                self.customServices = {};
                self.formDisable = "";
                self.findAll = [];
                self.currentField = null;
                self.groupDetails = [];
                self.extensions = [];
                var isExtended = false;
                var preSelectedString = '';
                var multiselect = 'sit-multi-select';
                md.loadModule(stateId).then(function (manifest) {
                    /*   md.getManifest().then(function (manifest) {*/ // Assuming manifest has already been retrieved
                    var customServices = manifest.customServices;
                    if (undefined !== customServices) {
                        for (var i = 0; i < customServices.length; i++) {
                            try {
                                var serviceReference = applInjector.get(customServices[i]);
                                if (undefined !== serviceReference) {
                                    self.customServices[customServices[i]] = serviceReference;
                                }
                            } catch (e) {
                                self.customServices[customServices[i]] = "Not Available";
                            }
                        }
                    }
                    var screen = manifest.states.filter(function (s) { return s.id === stateId; })[0], applName = screen.appName,
                        dataService = null, content = null;
                    self.allFieldsPromises = [];
                    self.renderComplete = false;
                    var isReadingFunction = false;
                    if (screen.type === "drill-down" && screen.referenceState) {
                        screen = manifest.states.filter(function (s) { return s.id === screen.referenceState; })[0];
                        applName = screen.appName;
                    }

                    var moduleInfo = md.getCurrentModuleInfo(screen.id);
                    if (moduleInfo.groupDetails) {
                        self.groupDetails = moduleInfo.groupDetails;
                    }

                    //search for action configuration and related dataservice
                    function initAndSearchAction(elem) {
                        if (elem.id === this.act) {
                            action = elem;
                            return true;
                        }
                        return false;
                    }
                    for (content in screen.contents) {
                        if (screen.contents[content].actions) {
                            if (screen.contents[content].actions.some(initAndSearchAction, { act: actionName })) {
                                if (action.behavior.entityRef && action.behavior.entityRef.entity) {
                                    dataService = multiDataService[action.behavior.entityRef.entity];
                                }
                                if (action.behavior.readingFunctionRef && action.behavior.readingFunctionRef.functionName) {
                                    isReadingFunction = true;
                                    dataService = multiDataService[action.behavior.readingFunctionRef.functionName];
                                }
                                break;
                            }
                        }
                    }

                    //the save function, performs the action call and the onExit
                    self.save = _.debounce(save, 500, true);
                    //cancel button
                    self.cancel = function () {
                        sidePanelManager.close();
                        mdContextSrv.setPropertyPanelState(false, null);
                        $state.go('^');
                    };
                    self.formDisable = action.behavior.disableWhen;
                    self.sidepanelConfig = {
                        title: $translate.instant(action.behavior.panelTitle) || $translate.instant(action.title),
                        messages: [{
                            type: 'warning',
                            text: ''
                        }],
                        actionButtons: [
                            {
                                label: $translate.instant(action.behavior.shortTitle) || "Submit",
                                onClick: self.save,
                                enabled: self.validInputs,
                                visible: true
                            },
                            {
                                label: $translate.instant(action.behavior.cancelTitle) || $translate.instant('common.cancel'),
                                onClick: self.cancel,
                                enabled: true,
                                visible: true
                            }
                        ],
                        closeButton: {
                            showClose: true,
                            tooltip: $translate.instant('sidePanel.close'),
                            onClick: self.cancel
                        }
                    };

                    self.buttonLabel = $translate.instant(action.behavior.shortTitle) || "Submit";

                    function evaluateBaseCmdValues(inputParam, outputParams) {
                        if (!inputParam) {
                            return inputParam;
                        }

                        var evaluation = null;
                        var ctx = getContext();

                        if (outputParams) {
                            ctx['baseCommand'] = { output: outputParams };
                        }
                        if (typeof self.calcValue[inputParam]["expression"] === "string") {
                            evaluation = mdContextSrv.parseWithStateCtx(self.calcValue[inputParam].expression, ctx);
                        }
                        else if (typeof self.calcValue[inputParam]["body"] === "string") {
                            evaluation = mdContextSrv.evalFunctionWithStateCtx(self.calcValue[inputParam].body, ctx);
                        }

                        if (evaluation === null || typeof evaluation === 'undefined') { // clear
                            inputParam = null;
                        }
                        else {
                            inputParam = evaluation;
                        }

                        return inputParam;
                    }

                    function processInputParams(inputParams, outputParams, extensionName) {
                        if (!inputParams) {
                            return inputParams;
                        }
                        //Parameters purge:
                        //when in edit the currentItem is filled with the whole query result ... but we need only required params

                        Object.getOwnPropertyNames(inputParams).forEach(function (paramName) {

                            //to find the field item in action.behavior.fields array from using paramName
                            var param;
                            for (var i in action.behavior.fields) {
                                if (action.behavior.fields[i].name === paramName) {
                                    param = action.behavior.fields[i];
                                    break;
                                }
                            }
                            //get field info of extended input params
                            if (!param) {
                                param = getExtendedField(paramName);
                            }

                            if (inputParams[paramName] && typeof (inputParams[paramName]) === 'object' && !param.enableMultiSelection) {
                                if (param && param.valueProperty && !param.value) {
                                    var valuePropertiesArray = param.valueProperty.split(',');
                                    $.each(inputParams[paramName], function (key, value) {
                                        if (value && typeof (value) === 'object') {
                                            var obj = value;
                                            $.each(obj, function (obj_key, obj_value) {
                                                var str = key + '.' + obj_key;
                                                if (valuePropertiesArray.indexOf(str) === -1) {
                                                    delete obj[obj_key];
                                                }
                                            })
                                            inputParams[paramName][key] = obj;
                                        } else if (valuePropertiesArray.indexOf(key) === -1) {
                                            delete inputParams[paramName][key];
                                        }
                                    });
                                } else if (inputParams[paramName].hasOwnProperty('selected')) {
                                    delete inputParams[paramName]['selected']
                                }
                            }

                            //evaluate the value expression based on base command's response
                            if (extensionName && param.value) {
                                inputParams[paramName] = evaluateBaseCmdValues(paramName, outputParams);
                            }

                            if (param.extensionName !== extensionName) {
                                delete inputParams[paramName];
                            } else if (typeof param === 'undefined' || !param.parameterRef || !param.parameterRef.parameter) {
                                delete inputParams[paramName];
                            } else if (param.parameterRef.parameter !== paramName) { //fix param name
                                inputParams[param.parameterRef.parameter] = inputParams[paramName];
                                delete inputParams[paramName];
                            }
                        });

                        //to remove the unwanted params for edit to be successful
                        if (inputParams.dest) {
                            inputParams.Id = inputParams.dest;
                            delete inputParams.dest;
                        }
                        return inputParams;
                    }
                    function executeExtendedCommand(extension, inputParams, baseCmdOutputParams) {
                        if (!inputParams) {
                            return asyncFunc(true);
                        }
                        processEmptyInputParams(extension.fields, inputParams);
                        inputParams = processEmptyInputParams(extension.fields, inputParams);
                        var defer = $q.defer();
                        inputParams = processInputParams(angular.copy(inputParams), baseCmdOutputParams, extension.id);
                        //Command Call
                        dataService[actionName][extension.id](inputParams, applName).then(function (outcome) {
                            defer.resolve();
                        });
                        return defer.promise;
                    }

                    function evaluateOnExit(outcome) {
                        var vCtrl = null;
                        if (outcome) { // method outcome (false in case of error)
                            if (mdContextSrv.MDState) { //previous status info available
                                var onExit = action.behavior.onExit;
                                var isValidOnExit = onExit && onExit.refreshAndSelectContents && onExit.refreshAndSelectContents.length > 0;
                                if (isValidOnExit) {
                                    //execute onExit command
                                    if (action.behavior.onExit.refreshContents) {
                                        vCtrl = mdContextSrv.getViewCtrl();
                                        if (vCtrl) {
                                            action.behavior.onExit.refreshContents.forEach(function (cntName) {
                                                if (vCtrl[cntName]) {
                                                    vCtrl[cntName].refresh();
                                                }
                                            });
                                        }
                                    }
                                    else if (action.behavior.onExit.refreshAndSelectContents) {
                                        vCtrl = mdContextSrv.getViewCtrl();
                                        if (vCtrl) {
                                            action.behavior.onExit.refreshAndSelectContents.forEach(function (cntName) {
                                                if (vCtrl[cntName]) {
                                                    if (outcome && outcome.id) {
                                                        vCtrl[cntName].refreshAndSelect(outcome.id);
                                                    }
                                                    else {
                                                        vCtrl[cntName].refresh();
                                                    }
                                                }
                                            });
                                            var eventParams = {
                                                'event': 'onActionCompletion',
                                                'data': typeof outcome === "object" && outcome.id ? outcome : null
                                            };
                                            $rootScope.$broadcast('mdui-context-refreshed', eventParams);
                                        }
                                    }
                                    var isSidepanelState = mdContextSrv.MDState.previousState.views.hasOwnProperty('property-area-container@');
                                    if (isSidepanelState) {
                                        mdContextSrv.setPropertyPanelState(false, null);
                                        $state.go('^', null);
                                    } else {
                                        mdContextSrv.setPropertyPanelState(false, null);
                                        $state.go(mdContextSrv.MDState.previousState, mdContextSrv.MDState.previousData);
                                    }
                                }
                                else {
                                    mdContextSrv.setPropertyPanelState(false, null);
                                    $state.go(mdContextSrv.MDState.previousState, mdContextSrv.MDState.previousData, { reload: true });
                                }
                            }
                            else {
                                mdContextSrv.setPropertyPanelState(false, null);
                                $state.go('^', {}, { reload: true });
                            }
                        }
                    }

                    function isMultiSelectionEmpty(selectedValue) {
                        var isMultiSelectionEmpty = false;
                        if (!isValidSelection(selectedValue)) {
                            isMultiSelectionEmpty = true;
                        }
                        if (selectedValue && selectedValue.constructor === Array) {
                            isMultiSelectionEmpty = selectedValue.length === 0;
                            if (!isMultiSelectionEmpty) {
                                isMultiSelectionEmpty = !selectedValue[0];
                            }
                        }
                        return isMultiSelectionEmpty;
                    }

                    function processEmptyInputParams(fields, inputParams) {
                        var isNoMultiSelection = false;
                        fields.forEach(function (prop) {
                            isNoMultiSelection = prop.enableMultiSelection && isMultiSelectionEmpty(inputParams[prop.name]);
                            var propType = prop.type.toString().toLowerCase();
                            if ((propType === 'datetime' || propType === 'datetimeoffset')
                                && ((!inputParams[prop.name] || isNoMultiSelection)
                                    && (prop.default ? (!prop.default.expression && !prop.default.body) : true))
                            ) {
                                inputParams[prop.name] = null;
                            }
                        });
                        return inputParams;

                    }

                    function save() {
                        var localCurrentItem = JSON.parse(JSON.stringify(self.currentItem));
                        //substitute all select/object fields with their "keepField" value
                        self.selectFields.forEach(function (f) {
                            if (localCurrentItem[f.name]) {
                                if ('DateTimeOffset' === f.type || 'DateTime' === f.type) {
                                    var value = localCurrentItem[f.name][f.value];
                                    localCurrentItem[f.name] = window.moment(value).toISOString();
                                } else {
                                    localCurrentItem[f.name] = localCurrentItem[f.name][f.value];
                                }
                            }
                            else {
                                localCurrentItem[f.name] = null;
                            }
                        });

                        processEmptyInputParams(action.behavior.fields, localCurrentItem);
                        localCurrentItem = processEmptyInputParams(action.behavior.fields, localCurrentItem);
                        //Parameters purge:
                        //when in edit the currentItem is filled with the whole query result ... but we need only required params
                        var allInputParams = angular.copy(localCurrentItem);
                        localCurrentItem = processInputParams(localCurrentItem)

                        outputParameters = localCurrentItem;
                        //Command Call
                        dataService[actionName](outputParameters, applName).then(function (outcome) {
                            if (outcome) {
                                var promises = [];
                                var completeResponse;
                                if (outcome.completeResponse && outcome.completeResponse.data) {
                                    completeResponse = outcome.completeResponse.data;
                                }
                                self.extensions.forEach(function (extension) {
                                    promises.push(executeExtendedCommand(extension, allInputParams, completeResponse));
                                });
                                $q.all(promises).then(function () {
                                    evaluateOnExit(outcome);
                                });
                            }
                        });
                    }

                    self.displayData = []; //list of visible form fields
                    self.displayData2 = []; //list of visible form fields
                    self.selectFields = []; //list of "select/object" form fields


                    //add fields from the extensions
                    function addExtendedFields(extension) {
                        if (!extension.fields) {
                            extension.fields = [];
                        }
                        extension.fields.forEach(function (field, index) {
                            field.name = extension.id + '_' + field.name;
                            field.extensionName = extension.id;
                            addFields(field, field.name, index);
                        });
                    }

                    function createHiddenFieldConfig(field) {
                        //probably only if calculated ?!?!? ... or also if part of the for query
                        if (field.clearExpression) {
                            self.ngClear[field.name] = field.clearExpression;
                        }
                        else if (field.clearExpressionFunction) {
                            self.ngClear[field.name] = { functionBody: field.clearExpressionFunction };
                        }
                        if (field.value) {
                            self.calcValue[field.name] = field.value;
                        }
                        //reload on change for hidden field
                        if (field.reloadOnChange) {
                            self.reloadOnChange[field.name] = {};
                            if (typeof field.query === "string") {
                                self.reloadOnChange[field.name] = { query: field.query };
                            }
                            var fieldUI = {
                                id: field.name,
                                name: field.name,
                                widget: "sit-label"
                            };
                            createReloadOnChangeConfig(field, fieldUI, applName);
                        }
                    }
                    //filter visible fields and provide expression calculation for hidden (value & clear)
                    function addFields(field, currFieldName, realIndex) {
                        if (typeof field.hidden === 'boolean' && !field.hidden) {
                            if (field.group) {
                                var isGroupCreated = false, property;
                                for (var i = 0; i < self.displayData2.length; i++) {
                                    if (self.displayData2[i].name === field.group && self.displayData2[i].container === 'g') {
                                        isGroupCreated = true;
                                        property = { 'name': currFieldName, 'realFieldIndex': realIndex };
                                        property.extensionName = field.extensionName;
                                        self.displayData2[i].fields.push(property);
                                        break;
                                    }
                                }
                                if (!isGroupCreated) {
                                    var groupDetails = getGroupDetails(field.group);
                                    var group = {
                                        container: 'g',
                                        fields: [],
                                        name: groupDetails.id,
                                        groupDetails: {
                                            'id': groupDetails.id,
                                            'heading': $translate.instant(groupDetails.heading),
                                            'collapsible': groupDetails.collapsible
                                        }
                                    };
                                    property = { 'name': currFieldName, 'realFieldIndex': realIndex };
                                    property.extensionName = field.extensionName;
                                    group.fields.push(property);
                                    self.displayData2.push(group);
                                }
                            } else {
                                property = { 'container': 'f', 'name': currFieldName, 'realFieldIndex': realIndex };
                                property.extensionName = field.extensionName;
                                self.displayData2.push(property);
                            }
                        } else if (typeof field.hidden === 'boolean' && field.hidden) {
                            createHiddenFieldConfig(field);
                        }

                        if (typeof field.type === "object") {
                            Object.getOwnPropertyNames(field.type).forEach(function (propName) {
                                addFields(field.type[propName], currFieldName + "." + propName);
                            });
                        }
                    }

                    action.behavior.fields.forEach(function (propName, index) { addFields(propName, propName.name, index); });

                    if (action.extensionRef && action.extensionRef.length > 0) {
                        isExtended = true;
                        self.extensions = angular.copy(action.extensionRef);
                        self.extensions.forEach(addExtendedFields);
                    }

                    createPropertyGridConfig(action, applName);

                    $q.all(self.allFieldsPromises).then(function () {
                        self.displayData = self.displayData2;
                    });

                    function evaluateDefault(field, contextInput) {
                        var result;
                        var fieldName = field.name;
                        if (typeof field.default.expression === "string") {
                            self.currentItem[fieldName] = mdContextSrv.parseWithStateCtx(field.default.expression, contextInput);
                        }
                        else if (typeof field.default.body === "string") {
                            result = mdContextSrv.evalFunctionWithStateCtx(field.default.body, contextInput);
                            if (typeof result === "object" && result !== null && typeof result.then === "function") {
                                result.then(function (outcome) {
                                    self.currentItem[fieldName] = outcome;
                                });
                            }
                            else {
                                self.currentItem[fieldName] = result;
                            }
                        }
                        if (field.enableMultiSelection) {
                            setMultiSelectedObject(field.name);
                        }
                    }

                    function evalauateDefaultExtendedFields(extension, contextInput) {
                        if (!extension.fields) {
                            extension.fields = [];
                        }
                        extension.fields.forEach(function (field) {
                            if (field.default) {
                                evaluateDefault(field, contextInput);
                            }
                        });
                    }

                    function getData() {
                        var filter;
                        if (action.behavior.query || isReadingFunction) { // a navigation "id" ... convention-> edit mode
                            if (isReadingFunction) {
                                filter = getEvaluatedReadingFunctionParams(action.behavior.readingFunctionRef.params);
                            } else {
                                filter = mdContextSrv.interpolateQuery(action.behavior.query, null);
                            }
                            //get the entity to prefil the forme
                            dataService.getAll(filter, applName).then(function (data) {
                                if (data.value.length > 0) {
                                    fillQueryResult = data.value;
                                    self.fillQueryResult = data.value;
                                    //merge with context
                                    var contextInput = { action: { item: fillQueryResult[0], items: fillQueryResult } };
                                    //displayField.forEach(function (propName) {
                                    action.behavior.fields.forEach(function (propName, index) { //also hidden fields
                                        propName = propName.name;
                                        //note: default evaluation do not need to be in sequence because cannot access or modify the action.field
                                        if (action.behavior.fields[index].default) {
                                            evaluateDefault(action.behavior.fields[index], contextInput);
                                        }
                                        else {
                                            self.currentItem[propName] = mdContextSrv.parseExpr(propName, data.value[0]);
                                        }
                                        if (action.behavior.fields[index].enableMultiSelection) {
                                            setMultiSelectedObject(propName);
                                        }
                                        if (action.behavior.fields[index].useEntityPicker) {
                                            if (self.currentItem[propName] && typeof self.currentItem[propName] !== 'object') {
                                                var val = self.currentItem[propName];
                                                var displayProperty = action.behavior.fields[index].displayProperty;
                                                self.currentItem[propName] = {};
                                                self.currentItem[propName][displayProperty] = val;
                                                // tracking whether the default value set to handle reloadOnChange with default
                                                self.currentItem[propName].isDefaultValueSet = true;
                                            }
                                            if (action.behavior.fields[index].pagingMode !== 'server') {
                                                setEntityPickerSelectedObject(propName);
                                            }
                                        }
                                    });

                                    //evaluate default for extended fields
                                    self.extensions.forEach(function (extension) {
                                        evalauateDefaultExtendedFields(extension, contextInput);
                                    });

                                    //wait untill all select are filled
                                    $q.all(self.allFieldsPromises).then(function () {
                                        //try to select the value
                                        self.selectFields.forEach(function (f) {
                                            var val = self.currentItem[f.name];
                                            if (f.options && f.options.length > 0) {
                                                val = f.options.filter(function (i) { return i[f.value] === self.currentItem[f.name]; })[0];
                                                if (val) {
                                                    self.currentItem[f.name] = { 'isDefaultValueSet': true };
                                                    self.currentItem[f.name][f.label] = val[f.label] ? val[f.label] : "";
                                                    self.currentItem[f.name][f.value] = val[f.value] ? val[f.value] : null;
                                                    var emptySelection = {};
                                                    emptySelection[f.value] = emptyKeepFieldValue;
                                                    emptySelection[f.label] = '';
                                                }
                                                else {
                                                    delete self.currentItem[f.name];
                                                }
                                            } else {
                                                // tracking whether the default value set to handle reloadOnChange with default
                                                if (val) {
                                                    self.currentItem[f.name] = { 'isDefaultValueSet': true };
                                                    self.currentItem[f.name][f.label] = val;
                                                    self.currentItem[f.name][f.value] = val;
                                                }
                                            }
                                        });
                                        //ngDisable starting eval
                                        self.renderComplete = true;
                                        self.DigestEval(0, 1);
                                    });
                                }
                                else {
                                    self.renderComplete = true;
                                    self.DigestEval(0, 1);
                                }
                            }, backendService.backendError);
                        }
                        else {
                            //ngDisable starting eval
                            $q.all(self.allFieldsPromises).then(function () {
                                //evaluate "default" initial value
                                action.behavior.fields.forEach(function (field) { //also hidden fields
                                    if (field.default) {
                                        evaluateDefault(field, null);
                                    }
                                });
                                //evaluate default for extended fields
                                self.extensions.forEach(function (extension) {
                                    evalauateDefaultExtendedFields(extension, null);
                                });
                                self.DigestEval(0, 1);
                            });
                            self.renderComplete = true;
                        }
                        self.validInputs = false;
                    }

                    var init = function () {
                        if (action.behavior.sidePanelProperties) {
                            var sidePanelMode = action.behavior.sidePanelProperties.mode;
                            if (sidePanelMode === 'modal' || action.behavior.sidePanelProperties.size === 'large') {
                                sidePanelMode = 'e';
                            } else {
                                sidePanelMode = 'p';
                            }
                            sidePanelManager.open({
                                'mode': sidePanelMode,
                                'size': action.behavior.sidePanelProperties.size
                            });
                            if (sidePanelMode === 'p') {
                                mdContextSrv.setPropertyPanelState(true, action.show);
                                listeners[listeners.lenght + 1] = $rootScope.$on('mdui-icv-item-selected', getData);
                            }
                        } else if (action.behavior.sidePanelMode === 'compact') {
                            sidePanelManager.open('p'); //show property mode panel
                            mdContextSrv.setPropertyPanelState(true, action.show);
                            listeners[listeners.lenght + 1] = $rootScope.$on('mdui-icv-item-selected', getData);
                        } else {
                            sidePanelManager.open('e');
                        }
                        getData();
                    };
                    init();
                });

                function asyncFunc(isResolve, response) {
                    var defer = $q.defer();
                    $timeout(function () {
                        if (isResolve) {
                            response ? defer.resolve(response) : defer.resolve();
                        } else {
                            response ? defer.reject(response) : defer.reject();
                        }
                    }, 100)
                    return defer.promise;
                }

                function getGroupDetails(groupId) {
                    var groupDetails = {};
                    for (var i = 0; i < self.groupDetails.length; i++) {
                        if (self.groupDetails[i].id === groupId) {
                            groupDetails = self.groupDetails[i];
                            break;
                        }
                    }
                    return groupDetails;
                }

                function createPropertyGridConfig(action, applName) {
                    var extensionName = null;
                    self.displayData2.forEach(function (arrayItem, index) {
                        if (arrayItem.container === 'g') {
                            arrayItem.fields.forEach(function (field, fieldIndex) {
                                extensionName = field.extensionName;
                                createFieldConfig(action, field.name, field.realFieldIndex, applName, extensionName).then(function (data) {
                                    self.displayData2[index].fields[fieldIndex] = data;
                                });
                            });
                        } else {
                            extensionName = arrayItem.extensionName;
                            createFieldConfig(action, arrayItem.name, arrayItem.realFieldIndex, applName, extensionName).then(function (data) {
                                var field = data;
                                field.container = 'f';
                                self.displayData2[index] = field;
                            });
                        }
                    });
                }

                function setCustomValidation(propName, validation) {
                    if (validation && validation.hasOwnProperty('custom')) {
                        var customFunctionBody = validation.custom;
                        delete validation.custom;
                        self.customValidations[propName] = customFunctionBody;
                    }
                    return validation;
                }

                function getGridConfig(gridConfigFields, entityPickerFields) {
                    var gridConfig = { 'columnDefs': [] };
                    if (entityPickerFields) {
                        var tempObj = {};
                        entityPickerFields.forEach(function (entityPickerField) {
                            tempObj[entityPickerField.name] = entityPickerField;
                        });
                        gridConfigFields.forEach(function (gridConfigField) {
                            if (gridConfigField) {
                                var field = { 'field': gridConfigField, 'displayName': $translate.instant(tempObj[gridConfigField].label) || tempObj[gridConfigField].name };
                                if (tempObj[gridConfigField].type === 'Boolean') {
                                    field.cellTemplate = '<sit-mdtoggle ng-disabled="true" sit-value="row.getProperty(\'' + gridConfigField + '\') === null ? false : row.getProperty(\'' + gridConfigField + '\')" ></sit-mdtoggle>';
                                }
                                gridConfig.columnDefs.push(field);
                            }
                        });
                    } else {
                        if (typeof gridConfigFields === 'string') {
                            gridConfigFields = gridConfigFields.split(',');
                        }
                        for (var i = 0; i < gridConfigFields.length; i++) {
                            var field = { 'field': gridConfigFields[i], 'displayName': gridConfigFields[i] };
                            gridConfig.columnDefs.push(field);
                        }
                    }
                    return gridConfig;
                }

                function interpolateQuery(propertyQuery) {
                    var context, interpolatedQuery;
                    if (self.fillQueryResult) {
                        context = {
                            action: { fields: self.currentItem, item: self.fillQueryResult[0], items: self.fillQueryResult }
                        };
                    } else {
                        context = { action: { fields: self.currentItem } };
                    }
                    interpolatedQuery = mdContextSrv.interpolateQuery(propertyQuery, context);
                    return interpolatedQuery;
                }

                function isReadingFunctionField(prop) {
                    var isReadingFunction = false;
                    if (prop.readingFunctionRef && prop.readingFunctionRef.functionName) {
                        isReadingFunction = true;
                    }
                    return isReadingFunction;
                }

                function getEntityPickerData(prop, searchString) {
                    var defer = $q.defer();
                    if (searchString) {
                        var propQuery, optionString = "contains(" + prop.displayProperty + ",'" + searchString + "')";
                        propQuery = interpolateQuery(prop.query);
                        var query = getConcatenatedFilterQuery(propQuery, optionString);

                        var backendSvcMethodToCall = 'findAll';
                        var backendSvcMethodParams = {};
                        if (isReadingFunctionField(prop)) {
                            backendSvcMethodToCall = 'read';
                            var readingFunctionParams = JSON.parse(getEvaluatedReadingFunctionParams(prop.readingFunctionRef.params));
                            backendSvcMethodParams = {
                                appName: prop.readingFunctionRef.app,
                                functionName: prop.readingFunctionRef.functionName,
                                params: readingFunctionParams, options: query
                            };
                        } else {
                            backendSvcMethodParams = { appName: prop.entityRef.app, entityName: prop.entityRef.entity, options: query };
                        }

                        backendService[backendSvcMethodToCall](backendSvcMethodParams)
                            .then(function (data) {
                                if (prop.distinct) {
                                    var displayProperty = prop.displayProperty;
                                    var filteredList = _.uniq(data.value, false, function (row) {
                                        return row[displayProperty];
                                    });
                                    data.value = filteredList;
                                }
                                defer.resolve(data.value);
                            }, function (error) {
                                defer.reject(error);
                            })
                    } else {
                        defer.resolve();
                    }
                    return defer.promise;
                }

                function createFindAll(propName) {
                    self.findAll[propName].currentField = propName;
                    self.findAll[propName].findAll = function (icvServerConfig) {
                        self.currentField = this.currentField;
                        var defer = $q.defer();
                        icvServerConfig.options = interpolateQuery(icvServerConfig.options);
                        var options = [];
                        var combinedQueryList = [];
                        if (icvServerConfig.options) {
                            var keyList = [];
                            options = icvServerConfig.options.split('&');
                            options.forEach(function (key, index) {
                                var keyName = key.substring(0, key.indexOf('='));
                                if (keyList.indexOf(keyName) === -1) {
                                    combinedQueryList.push(combineQueryOptions(keyName, options));
                                    keyList.push(keyName);
                                }
                            });
                            icvServerConfig.options = combinedQueryList.join('&');
                        }

                        var backendSvcMethodToCall = 'findAll';
                        var backendSvcMethodParams = { appName: icvServerConfig.appName, entityName: icvServerConfig.entityName, options: icvServerConfig.options };
                        var prop = self.readingFunctionFields[propName];
                        if (prop && isReadingFunctionField(prop)) {
                            backendSvcMethodToCall = 'read';
                            var readingFunctionParams = JSON.parse(getEvaluatedReadingFunctionParams(prop.readingFunctionRef.params));
                            backendSvcMethodParams = {
                                appName: icvServerConfig.appName,
                                functionName: icvServerConfig.entityName,
                                params: readingFunctionParams,
                                options: icvServerConfig.options
                            };
                        }

                        backendService[backendSvcMethodToCall](backendSvcMethodParams)
                            .then(function (data) {
                                var fieldConfig = getFieldConfig(self.currentField);
                                if (fieldConfig.distinct) {
                                    var displayProperty = fieldConfig.displayProperty;
                                    var filteredList = _.uniq(data.value, false, function (row) {
                                        return row[displayProperty];
                                    });
                                    data.value = filteredList;
                                }
                                defer.resolve(data);
                                $timeout(function () {
                                    setSelection();
                                }, 100);
                            }, function (error) {
                                defer.reject(error);
                            })
                        return defer.promise;
                    }
                }

                function getFieldConfig(fieldName) {
                    var field = _.findWhere(action.behavior.fields, { name: fieldName }) || {};
                    return field;
                }

                function setSelection() {
                    if (self.currentItem && self.currentField && self.currentItem[self.currentField]) {
                        for (var i = 0; i < self.displayData.length; i++) {
                            if (self.displayData[i].id === self.currentField && self.displayData[i].widgetAttributes &&
                                self.displayData[i].widgetAttributes["sit-picker-options"]) {
                                self.displayData[i].widgetAttributes["sit-picker-options"].selectItems([self.currentItem[self.currentField]], true, true);
                            }
                        }
                    }
                    self.currentField = null;
                }

                function getExtendedField(fieldName) {
                    var extendedField;
                    self.extensions.forEach(function (extension) {
                        extension.fields.forEach(function (field) {
                            if (field.name === fieldName) {
                                extendedField = field;
                            }
                        });
                    })
                    return extendedField;
                }

                function createReadOnlyFieldConfig(prop, field) {
                    if (!prop || !field) {
                        return field;
                    }
                    field.readOnly = true;
                    if (prop.type === 'Boolean' || prop.type === 'boolean') {
                        field.widget = 'sit-mdtoggle';
                    } else {
                        field.widget = prop.inputMode === 'inputTextarea' ? 'sit-textarea' : 'sit-label';
                    }
                    return field;
                }

                function createReloadOnChangeConfig(prop, field, applName) {
                    var filter, selectValueProperty, params, dataArtifact;
                    var propName = prop.name;

                    //check optional configuration
                    if (prop.entityRef && prop.entityRef.entity) {
                        dataArtifact = prop.entityRef.entity;
                    } else if (prop.readingFunctionRef && prop.readingFunctionRef.functionName) {
                        dataArtifact = prop.readingFunctionRef.functionName;
                    }

                    if (self.reloadOnChange[propName] && dataArtifact) {
                        if (prop.query) {
                            filter = mdContextSrv.interpolateQuery(prop.query, { fields: self.currentItem });
                        } else if (prop.readingFunctionRef && prop.readingFunctionRef.params) {
                            params = prop.readingFunctionRef.params;
                            filter = getEvaluatedReadingFunctionParams(prop.readingFunctionRef.params);
                        }
                        if (prop.selectValueProperty) {
                            selectValueProperty = prop.selectValueProperty;
                        }

                        self.reloadOnChange[propName]["readingFunctionParams"] = params;
                        self.reloadOnChange[propName]["last"] = filter;
                        self.reloadOnChange[propName]["dataArtifact"] = dataArtifact;
                        self.reloadOnChange[propName]["applName"] = applName;
                        self.reloadOnChange[propName]["field"] = field;
                        self.reloadOnChange[propName]["selectValueProperty"] = selectValueProperty;
                    }
                }

                function getTranslatedFieldLabel(fieldName, entityPickerFields) {
                    var translatedLabel;
                    if (!fieldName || !entityPickerFields) {
                        return translatedLabel;
                    }
                    entityPickerFields.forEach(function (property) {
                        if (property.name === fieldName) {
                            translatedLabel = $translate.instant(property.label) || fieldName;
                        }
                    });
                    return translatedLabel;
                }

                function createEnumFieldConfig(prop, field) {
                    var gridConfig, sortableFields, sortInfo;
                    var defaultEntityPickerPlaceHolder = 'entityPicker.defaultPlaceHolder';
                    if (!prop || !field) {
                        return field;
                    }

                    var propName = prop.name;
                    if (prop.useEntityPicker) {
                        if (prop.gridConfig) {
                            gridConfig = getGridConfig(prop.gridConfig, prop.entityPickerFields);
                        }
                        if (prop.sortable) {
                            sortableFields = prop.sortable.split(',');
                            sortableFields = sortableFields.map(function (fieldName) {
                                return {
                                    field: fieldName,
                                    displayName: getTranslatedFieldLabel(fieldName, prop.entityPickerFields)
                                };
                            });
                            sortInfo = {
                                field: sortableFields[0].field,
                                direction: 'asc',
                                fields: sortableFields
                            }
                        }
                        field.widget = 'sit-entity-picker';
                        field.widgetAttributes = {
                            "sit-selected-attribute-to-display": prop.displayProperty,
                            "sit-editable": false,
                            "sit-placeholder": $translate.instant(prop.placeholder) || $translate.instant(defaultEntityPickerPlaceHolder),
                            'sit-datasource': prop.values.map(function (v) {
                                if ('DateTimeOffset' === prop.type || 'DateTime' === prop.type) {
                                    v = $filter('date')(v, prop.format);
                                }
                                return { key: v, value: v };
                            }),
                            "sit-picker-options": {
                                containerID: propName + 'IcvContainer',
                                groupField: '',
                                alwaysShowPager: true,
                                selectionMode: 'single',
                                quickSearchOptions: {
                                    enabled: true,
                                    field: prop.searchable || prop.displayProperty,
                                    filterText: ''
                                },
                                gridConfig: gridConfig,
                                sortInfo: sortInfo,
                                onSelectionChangeCallback: function () { },
                                selectStyle: 'alternate',
                                viewMode: 'g',
                                viewOptions: 'g',
                                uniqueID: 'Id'
                            }
                        };
                    } else {
                        field.widget = 'sit-select';
                        field.widgetAttributes = {
                            'sit-to-display': 'key',
                            'sit-to-keep': 'value',
                            'sit-options': prop.values.map(function (v) {
                                if ('DateTimeOffset' === prop.type || 'DateTime' === prop.type) {
                                    v = $filter('date')(v, prop.format);
                                }
                                return { key: v, value: v };
                            })
                        };
                        self.selectFields.push({ name: propName, value: 'value', label: 'key', type: prop.type });
                    }
                    return field;
                }

                function createFileUploadFieldConfig(prop, field) {
                    if (!prop || !field) {
                        return field;
                    }
                    var propName = prop.name;
                    field.widget = 'sit-file-uploader';
                    field.widgetAttributes = {
                        'accept': prop.fileUploaderConfig.fileFormats,
                        'sit-min-size': prop.fileUploaderConfig.minSize,
                        'sit-max-size': prop.fileUploaderConfig.maxSize,
                        'sit-change': function (prev, current) {
                            $timeout(function () {
                                if (current) {
                                    if (self.currentItem[propName] && self.currentItem[propName]['type']) {
                                        self.currentItem[propName]['data'] = 'data:' + self.currentItem[propName]['type'] + ';base64,' +
                                            self.currentItem[propName]['contents'];
                                    } else {
                                        self.currentItem[propName]['data'] = self.currentItem[propName]['contents'];
                                    }
                                } else {
                                    self.currentItem[propName] = {
                                        data: ''
                                    };
                                }
                                self.DigestEval(prev, current);
                            }, 100);
                        }
                    };
                    return field;
                }

                function getFilterSettingsFieldConfig(prop, field) {
                    var filterFields;
                    if (prop.filterSettings.filterFields && prop.filterSettings.filterFields.length) {
                        filterFields = angular.copy(prop.filterSettings.filterFields);
                    } else {
                        filterFields = [];
                    }
                    for (var i = 0; i < filterFields.length; i++) {
                        filterFields[i].displayName = $translate.instant(filterFields[i].displayName);
                        filterFields[i].allowedCompareOperators = getMigratedOperators(filterFields[i].allowedCompareOperators);
                        filterFields[i].dataService = backendService;
                        filterFields[i].appName = screen.appName;
                        if (filterFields[i].dataSource && filterFields[i].dataSource.query) {
                            filterFields[i].dataSource.query = interpolateQuery(filterFields[i].dataSource.query);
                        }
                    }
                    field.widgetAttributes["sit-picker-options"].filterFields = filterFields;
                    field.widgetAttributes["sit-picker-options"].filterBarOptions = prop.filterSettings.filterBarOptions;

                    return field;
                }
                function getMigratedOperators(operators) {
                    var migratedOperators = [];
                    if (operators && operators.length > 0) {
                        for (var i = 0; i < operators.length; i++) {
                            if (operators[i] === "startsWith" || operators[i] === "endsWith") {
                                migratedOperators[i] = operators[i];
                            }
                            else if (!(operators[i] === "Starts With" || operators[i] === "Ends With")) {
                                migratedOperators[i] = operators[i].replace(/\s/g, '').toLowerCase();
                            } else {
                                migratedOperators[i] = operators[i].charAt(0).toLowerCase() + operators[i].slice(1).replace(/\s/g, '');
                            }
                        }
                    }
                    return migratedOperators;
                }
                function getEntityPickerFieldConfig(prop, field) {
                    var gridConfig, sortInfo, sortableFields;
                    var defaultEntityPickerPlaceHolder = 'entityPicker.defaultPlaceHolder';
                    var propName = prop.name;

                    if (prop.gridConfig) {
                        gridConfig = getGridConfig(prop.gridConfig, prop.entityPickerFields);
                    }
                    if (prop.sortable) {
                        sortableFields = prop.sortable.split(',');
                        sortableFields = sortableFields.map(function (fieldName) {
                            return {
                                field: fieldName,
                                displayName: getTranslatedFieldLabel(fieldName, prop.entityPickerFields)
                            };
                        });
                        sortInfo = {
                            field: sortableFields[0].field,
                            direction: 'asc',
                            fields: sortableFields
                        }
                    }

                    field.widget = 'sit-entity-picker';
                    field.widgetAttributes = {
                        "sit-selected-attribute-to-display": prop.displayProperty,
                        "sit-editable": false,
                        "sit-placeholder": $translate.instant(prop.placeholder) || $translate.instant(defaultEntityPickerPlaceHolder),
                        "sit-picker-options": {
                            containerID: propName + 'IcvContainer',
                            groupField: '',
                            alwaysShowPager: true,
                            selectionMode: 'single',
                            quickSearchOptions: {
                                enabled: true,
                                field: prop.searchable || prop.displayProperty,
                                filterText: ''
                            },
                            sortInfo: sortInfo,
                            gridConfig: gridConfig,
                            enablePaging: prop.enablePaging,
                            pagingOptions: {
                                pageSizes: [5, 10, 25, 100, 250, 500],
                                pageSize: 10,
                                currentPage: 1
                            },
                            onSelectionChangeCallback: function () { },
                            selectStyle: 'alternate',
                            viewMode: 'g',
                            viewOptions: 'g',
                            uniqueID: 'Id',
                            tagsManager: false
                        }
                    };
                    if (prop.filterSettings) {
                        field = getFilterSettingsFieldConfig(prop, field);
                    }

                    return field;
                }

                function callServerPreSelectQuery(prop, optionalConfig, applName) {
                    var promise = null;
                    var propName = prop.name;
                    var selectionFilter = optionalConfig ? optionalConfig.selectionFilter : null;
                    if (prop.preSelectValue) {
                        if (selectionFilter && prop.selectEntityRef && prop.selectEntityRef.entity) {
                            promise = multiDataService[prop.selectEntityRef.entity].getAll(selectionFilter, applName).then(function (selectQueryData) {
                                if (selectQueryData.value && selectQueryData.value.length) {
                                    self.currentItem[propName] = selectQueryData.value[0];
                                }
                            });
                        }
                    }
                    return promise;
                }

                function callSelectEntityGetAll(prop, selectionFilter, applName) {
                    var promise = null;
                    if (!prop) {
                        return promise;
                    }
                    var propName = prop.name;
                    promise = multiDataService[prop.selectEntityRef.entity].getAll(selectionFilter, applName)
                        .then(function (selectQueryData) {
                            if (selectQueryData.value && selectQueryData.value.length) {
                                self.currentItem[propName] = selectQueryData.value[0];
                                if (prop.useEntityPicker) {
                                    setEntityPickerSelectedObject(propName);
                                }
                            }
                        });
                    return promise;
                }

                function preSelectFirstItem(prop, data, theDisplayField) {
                    if (!prop || !data) {
                        return;
                    }
                    var propName = prop.name;
                    if (data.value && data.value.length) {
                        var firstItem = data.value[0];
                        if (firstItem) {
                            self.currentItem[propName] = firstItem[theDisplayField] ? data.value[0] : data.value[1];
                        }
                        if (prop.useEntityPicker) {
                            setEntityPickerSelectedObject(propName);
                        }
                        if (prop.enableMultiSelection) {
                            self.currentItem[propName] = getMultiSelectedValues(firstItem.id);
                            preSelectedString = typeof firstItem.id === 'number' ? firstItem.id.toString() : firstItem.id;
                        }
                    }
                }

                function callPreSelectQuery(prop, optionalConfig, data) {
                    var promise = null;
                    if (!prop || !optionalConfig) {
                        return promise;
                    }
                    var selectionFilter = optionalConfig.selectionFilter;
                    var theDisplayField = optionalConfig.theDisplayField;
                    var applName = optionalConfig.applName;

                    if (!prop.preSelectValue) {
                        return promise;
                    }

                    if (selectionFilter && prop.selectEntityRef && prop.selectEntityRef.entity) {
                        promise = callSelectEntityGetAll(prop, selectionFilter, applName);
                    } else {
                        preSelectFirstItem(prop, data, theDisplayField);
                    }

                    return promise;
                }

                function getMultiSelectOptions(data, displayProp, valueProp) {
                    data.forEach(function (v) {
                        v.id = v[valueProp];
                        v.name = v[displayProp];
                    });
                    return data;
                }
                function callSelectQuery(prop, optionalConfig, field) {
                    var promises = { 'fieldPromise': null, 'preSelectPromise': null };
                    if (!prop || !optionalConfig) {
                        return promises;
                    }
                    var propName = prop.name;
                    var filter = optionalConfig.filter;
                    var theDisplayField = optionalConfig.theDisplayField;
                    var keepField = optionalConfig.keepField;
                    var dataSvc = optionalConfig.dataSvc;
                    var dataAttribute = optionalConfig.dataAttribute;
                    var applName = optionalConfig.applName;
                    var distinct = optionalConfig.distinct;

                    promises.fieldPromise = dataSvc.getAll(filter, applName).then(function (data) {
                        if (prop.type === 'DateTimeOffset' || prop.type === 'DateTime') {
                            data.value.forEach(function (item) {
                                item[theDisplayField] = $filter('date')(item[theDisplayField], prop.format);
                            });
                        }
                        if (prop.enableMultiSelection) {
                            data.value = getMultiSelectOptions(data.value, theDisplayField, keepField);
                        }
                        if (!prop.useEntityPicker && !prop.enableMultiSelection) {
                            data.value = addEmptySelectOption(data.value, theDisplayField, keepField);
                        }
                        if (!distinct) {
                            field.widgetAttributes[dataAttribute] = data.value;
                        } else {
                            field.widgetAttributes[dataAttribute] = _.uniq(data.value, false, function (row) {
                                return row[theDisplayField];
                            });
                        }
                        if (!prop.useEntityPicker && !prop.enableMultiSelection) {
                            var parkObj = { name: propName, value: keepField, label: theDisplayField, options: data.value, type: prop.type };
                            self.selectFields.push(parkObj); //update select field container
                        }
                        promises.preSelectPromise = callPreSelectQuery(prop, optionalConfig, data);
                        if (prop.enableMultiSelection) {
                            field.widgetAttributes['sit-selected-string'] = preSelectedString || '';
                        }
                    });

                    return promises;
                }

                function getSelectFieldOptionalConfigurations(prop) {
                    var config = {};
                    var filter, selectionFilter, selectionQuery, selectionEntity, preSelectValue, baseValueProperty, selectValueProperty, params;
                    var theDisplayField = "Name", keepField = "Id", distinct = false, dataSvc, dataArtifact, dataAttribute;

                    if (prop.entityRef && prop.entityRef.entity) {
                        dataSvc = multiDataService[prop.entityRef.entity];
                        dataArtifact = prop.entityRef.entity;
                    } else if (prop.readingFunctionRef && prop.readingFunctionRef.functionName) {
                        dataArtifact = prop.readingFunctionRef.functionName;
                        self.readingFunctionFields[prop.name] = prop;
                        dataSvc = multiDataService[prop.readingFunctionRef.functionName];
                    }

                    if (prop.query) {
                        filter = mdContextSrv.interpolateQuery(prop.query, { fields: self.currentItem });
                    } else if (prop.readingFunctionRef && prop.readingFunctionRef.params) {
                        params = prop.readingFunctionRef.params;
                        filter = getEvaluatedReadingFunctionParams(prop.readingFunctionRef.params);
                    }
                    if (prop.selectQuery) {
                        selectionQuery = prop.selectQuery;
                        selectionFilter = mdContextSrv.interpolateQuery(selectionQuery, { fields: self.currentItem });
                    }
                    dataAttribute = prop.useEntityPicker ? 'sit-datasource' : 'sit-options';
                    if (prop.displayProperty) {
                        theDisplayField = prop.displayProperty;
                    }
                    if (prop.valueProperty) {
                        keepField = prop.valueProperty;
                    }
                    if (prop.distinct) {
                        distinct = prop.distinct;
                    }
                    if (prop.preSelectValue) {
                        preSelectValue = prop.preSelectValue;
                    }
                    if (prop.selectEntityRef && prop.selectEntityRef.entity) {
                        selectionEntity = prop.selectEntityRef.entity;
                    }
                    if (prop.baseValueProperty) {
                        baseValueProperty = prop.baseValueProperty;
                    }
                    if (prop.selectValueProperty) {
                        selectValueProperty = prop.selectValueProperty;
                    }
                    config.filter = filter;
                    config.params = params;
                    config.selectionQuery = selectionQuery;
                    config.selectionFilter = selectionFilter;
                    config.theDisplayField = theDisplayField;
                    config.keepField = keepField;
                    config.distinct = distinct;
                    config.preSelectValue = preSelectValue;
                    config.selectionEntity = selectionEntity;
                    config.baseValueProperty = baseValueProperty;
                    config.selectValueProperty = selectValueProperty;
                    config.dataSvc = dataSvc;
                    config.dataArtifact = dataArtifact;
                    config.dataAttribute = dataAttribute;
                    return config;
                }

                function getNumberMultiSelectedValues(values) {
                    if (!values) {
                        return values;
                    }
                    values = values.map(function (value) {
                        return Number(value);
                    });
                    return values;
                }

                function getMultiSelectedValues(selectedString, isNumberProp) {
                    var selectedValues = [];
                    if (typeof selectedString === 'string') {
                        selectedValues = selectedString.split(',');
                        selectedValues = isNumberProp ? getNumberMultiSelectedValues(selectedValues) : selectedValues;
                    }
                    return selectedValues;
                }

                function isNumberType(type) {
                    return ['number', 'Int', 'Int16', 'Int32', 'Int64', 'Decimal', 'numeric'].indexOf(type) > -1;
                }

                function onMultiSelectChange(prop, prev, selected) {
                    if (prop && prop.enableMultiSelection) {
                        self.currentItem[prop.name] = getMultiSelectedValues(selected, isNumberType(prop.type));
                        self.DigestEval(prev, selected);
                    }
                }

                function getMultiSelectWidgetAttributes(isMultiSelect, widgetAttributes) {
                    if (isMultiSelect) {
                        widgetAttributes = {
                            'sit-placeholder': '',
                            'sit-selected-string': '',
                            'sit-split-list': true
                        }
                    }
                    return widgetAttributes;
                }

                function getSelectFieldWidget(isMultiSelect) {
                    return isMultiSelect ? multiselect : 'sit-select';
                }

                function isValidSelection(selected) {
                    var isValid = false;
                    if (typeof selected === "number" || typeof selected === "boolean" || selected) {
                        isValid = true;
                    }
                    return isValid;
                }

                function createSelectFieldConfig(prop, field, applName) {
                    var filter, selectionFilter, selectionQuery, selectionEntity, preSelectValue, baseValueProperty, selectValueProperty, dataArtifact, params;
                    var config = { 'field': {}, 'fieldPromise': null, 'selectionQueryPromise': null };
                    var dataAttribute;
                    var theDisplayField = "Name", keepField = "Id", distinct = false;
                    var propName = prop.name;

                    if (!prop || !field) {
                        return config;
                    }

                    if (prop.useEntityPicker) {
                        dataAttribute = 'sit-datasource';
                        field = getEntityPickerFieldConfig(prop, field);
                    }
                    else {
                        dataAttribute = 'sit-options';
                        field.widget = getSelectFieldWidget(prop.enableMultiSelection);
                        field.widgetAttributes = {
                            'sit-to-display': 'Name',
                            'sit-to-keep': 'Id'
                        }
                        field.widgetAttributes = getMultiSelectWidgetAttributes(prop.enableMultiSelection, field.widgetAttributes);
                        field.widgetAttributes['sit-change'] = function (prev, selected) {
                            onMultiSelectChange(prop, prev, selected);
                            if (!self.renderComplete || typeof selected !== "object") {
                                /*bug 56911: some sit-change are fired by validator.js too early and with a different "selected" type (null or string),
                                 * while I expect an object */
                                //ignore early and wrong sit-change notification
                                return;
                            }
                            if (selected && (isValidSelection(selected[keepField])) && selected[keepField] !== emptyKeepFieldValue) {
                                //is selected and it's a valid selection
                                self.currentItem[propName] = selected;
                            }
                            else {
                                //is deselected or a blank selection
                                delete self.currentItem[propName]; //delete current form value
                            }
                            self.DigestEval(prev, selected);
                        };
                    }

                    //check optional configuration
                    var optionalConfig = getSelectFieldOptionalConfigurations(prop);
                    if (optionalConfig) {
                        dataArtifact = optionalConfig.dataArtifact;
                        filter = optionalConfig.filter;
                        params = optionalConfig.params;
                        selectionQuery = optionalConfig.selectionQuery;
                        selectionFilter = optionalConfig.selectionFilter;
                        theDisplayField = optionalConfig.theDisplayField;
                        field.widgetAttributes['sit-to-display'] = theDisplayField;
                        keepField = optionalConfig.keepField;
                        field.widgetAttributes['sit-to-keep'] = keepField;
                        distinct = optionalConfig.distinct;
                        preSelectValue = optionalConfig.preSelectValue;
                        selectionEntity = optionalConfig.selectionEntity;
                        baseValueProperty = optionalConfig.baseValueProperty;
                        selectValueProperty = optionalConfig.selectValueProperty;
                        optionalConfig.applName = applName;
                    }

                    if (self.reloadOnChange[propName]) {
                        self.reloadOnChange[propName]["readingFunctionParams"] = params;
                        self.reloadOnChange[propName]["last"] = filter;
                        self.reloadOnChange[propName]["dataArtifact"] = dataArtifact;
                        self.reloadOnChange[propName]["applName"] = applName;
                        self.reloadOnChange[propName]["distinct"] = distinct;
                        self.reloadOnChange[propName]["field"] = field;
                        self.reloadOnChange[propName]["theDisplayField"] = theDisplayField;
                        self.reloadOnChange[propName]["keepField"] = keepField;
                        self.reloadOnChange[propName]["preSelectValue"] = preSelectValue;
                        self.reloadOnChange[propName]["lastSelectionQuery"] = selectionFilter;
                        self.reloadOnChange[propName]["selectionQuery"] = selectionQuery;
                        self.reloadOnChange[propName]["selectionEntity"] = selectionEntity;
                        self.reloadOnChange[propName]["baseValueProperty"] = baseValueProperty || keepField;
                        self.reloadOnChange[propName]["selectValueProperty"] = selectValueProperty;
                        self.reloadOnChange[propName]["pagingMode"] = prop.pagingMode || 'client';
                    }
                    if (prop.pagingMode === 'server') {
                        field.widgetAttributes[dataAttribute] = function (searchString) {
                            return getEntityPickerData(prop, searchString).then(function (data) {
                                return data;
                            }, function (error) {
                                return [];
                            });
                        }
                        self.findAll[propName] = {};
                        createFindAll(propName);
                        field.widgetAttributes["sit-picker-options"].serverDataOptions = {
                            dataService: self.findAll[propName],
                            dataEntity: dataArtifact,
                            appName: applName,
                            optionsString: prop.query
                        };
                        config.selectionQueryPromise = callServerPreSelectQuery(prop, optionalConfig, applName);
                    } else {
                        var promises = callSelectQuery(prop, optionalConfig, field);
                        if (promises) {
                            config.fieldPromise = promises.fieldPromise;
                            config.selectionQueryPromise = promises.preSelectPromise;
                        }
                    }
                    config.field = field;
                    return config;
                }

                function createFieldConfig(action, propName, realIndex, applName, extensionName) {
                    var prop = action.behavior.fields[realIndex], fieldPromise = null, selectionQueryPromise = null, field = null;
                    var defer = $q.defer();

                    if (extensionName) {
                        prop = getExtendedField(propName);
                    }

                    if (!prop && !extensionName) {
                        prop = mdContextSrv.parseExpr(propName, action.behavior.fields);
                    }
                    if (!prop) {
                        return asyncFunc(true,field);
                    }
                    var validationObj = setCustomValidation(propName, angular.copy(prop.validation));
                    if (validationObj.patternInfo) {
                        validationObj.patternInfo = $translate.instant(validationObj.patternInfo);
                    }
                    self.allValidations[prop.name] = validationObj;
                    field = {
                        id: propName,
                        name: propName,
                        label: $translate.instant(prop.label) || propName,
                        validation: validationObj,
                        value: self.currentItem[propName],
                        type: prop.type
                    };
                    if (prop.disable) { // collect disable expression
                        self.ngDisableItem[propName] = prop.disable;
                    }
                    //?!?!?
                    //if (action.behavior.fieldsOptions[propName].label) {
                    //  field.label = action.behavior.fieldsOptions[propName].label;
                    //}
                    if (prop.clear) { // collect clear expression
                        self.ngClear[propName] = prop.clear;
                    }

                    if (prop.value) { // collect value expression
                        self.calcValue[propName] = prop.value;
                    }

                    if (prop.reloadOnChange) {
                        self.reloadOnChange[propName] = {}
                        if (typeof prop.query === "string") {
                            self.reloadOnChange[propName] = { query: prop.query };
                        }
                    }
                    var checkType;
                    if (prop.inputMode) {
                        checkType = prop.inputMode;
                    } else {
                        checkType = prop.type;
                    }

                    if (prop.readOnly) {
                        field = createReadOnlyFieldConfig(prop,field);
                        createReloadOnChangeConfig(prop, field, applName);
                    } else {
                        switch (true) {
                            case ['enum', 'Enum'].indexOf(checkType) > -1:
                                field = createEnumFieldConfig(prop, field);
                                break;
                            case ['number', 'Int', 'Int16', 'Int32', 'Int64', 'Decimal', 'numeric'].indexOf(checkType) > -1:
                                field.widget = 'sit-numeric';
                                break;
                            case ['boolean', 'Boolean', 'checkbox'].indexOf(checkType) > -1:
                                field.widget = 'sit-mdtoggle';
                                break;
                            case ['object', 'queryResult'].indexOf(checkType) > -1:
                                var config = createSelectFieldConfig(prop, field, applName);
                                if (config && config.field) {
                                    field = config.field;
                                    fieldPromise = config.fieldPromise;
                                    selectionQueryPromise = config.selectionQueryPromise;
                                }
                                break;
                            case ['DateTimeOffset', 'DateTime', 'dateTimePicker'].indexOf(checkType) > -1:
                                field.widget = 'sit-date-time-picker';
                                field.widgetAttributes = {
                                    'sit-format': prop.format,
                                    'sit-show-seconds': true
                                };
                                break;
                            case ['fileUploader'].indexOf(checkType) === 0:
                                field = createFileUploadFieldConfig(prop, field);
                                break;
                            case ['TimeSpan'].indexOf(checkType) === 0:
                                field.widget = 'sit-time-picker';
                                break;
                            case ['inputTextarea'].indexOf(checkType) === 0:
                                field.widget = 'sit-textarea';
                                createReloadOnChangeConfig(prop, field, applName);
                                break;
                            default:
                                field.widget = 'sit-text';
                                createReloadOnChangeConfig(prop, field, applName);
                        }
                    }

                    if (fieldPromise) {
                        self.allFieldsPromises.push( //collect all pending (select) fields promises
                            fieldPromise.then(function () {
                                defer.resolve(field);
                            }));
                    } else if (selectionQueryPromise) {
                        self.allFieldsPromises.push( //collect all pending (select) fields promises
                            selectionQueryPromise.then(function () {
                                defer.resolve(field);
                            }));
                    } else {
                        defer.resolve(field);
                    }
                    return defer.promise;
                }

                function setEntityPickerSelectedObject(propName) {
                    for (var i = 0; i < self.displayData.length; i++) {
                        if (self.displayData[i].name === propName) {
                            self.displayData[i].widgetAttributes["sit-selected-object"] = self.currentItem[propName];
                        }
                    }
                }

                function getMultiSelectedString(value, valueProperty) {
                    var selectedItems = [];
                    value = typeof value === 'number' ? value.toString() : value;
                    var selectedString = value || '';
                    if (value && value.constructor === Array) {
                        selectedItems = value.map(function (val) {
                            val = typeof val === 'number' ? val.toString() : val;
                            if (val) {
                                return typeof val === 'object' ? val[valueProperty] : val;
                            }
                            return '';
                        });
                        selectedString = selectedItems.join(',');
                    }
                    return selectedString;
                }

                function updateMultiSelection(options, selectedString, isNumberType) {
                    if (!options || typeof selectedString !== 'string') {
                        return options;
                    }
                    var selectedOptions = selectedString.split(',');
                    options.forEach(function (option) {
                        var isSelected = false;
                        selectedOptions.forEach(function (selectedItem) {
                            option.id = isNumberType ? option.id.toString() : option.id;
                            if (selectedItem === option.id) {
                                isSelected = true;
                                option.selected = true;
                            }
                        });
                        if (!isSelected) {
                            option.selected = false;
                        }
                    });
                    return options;
                }

                function setMultiSelectedObject(propName) {
                    var selectedString, valueProperty, options, type;
                    for (var i = 0; i < self.displayData.length; i++) {
                        if (self.displayData[i].name === propName) {
                            valueProperty = self.displayData[i].widgetAttributes['sit-to-keep'];
                            options = self.displayData[i].widgetAttributes['sit-options'];
                            type = self.displayData[i].type;
                            selectedString = getMultiSelectedString(self.currentItem[propName], valueProperty);
                            self.displayData[i].widgetAttributes['sit-options'] = updateMultiSelection(options, selectedString, isNumberType(type));
                            break;
                        }
                    }
                    self.currentItem[propName] = getMultiSelectedValues(selectedString, isNumberType(type));
                }

                function getConcatenatedFilterQuery(query, optionString) {
                    if (query) {
                        var array = query.split('&');
                        var indexOfFilter = findIndexOfFilter(array); //returns the index of $filter
                        if (indexOfFilter === -1) {
                            array.push('$filter=' + optionString);    //push the $filter query to the array
                        } else {
                            array[indexOfFilter] = array[indexOfFilter] + ' and ' + optionString; //appends the optionstring to the existing $filter
                        }
                        query = array.join('&');
                    } else {
                        query = '$filter=' + optionString;
                    }
                    return query;
                }

                function findIndexOfFilter(array) {
                    var index = -1;
                    for (var i = 0; i < array.length; i++) {
                        array[i] = array[i].trim();
                        if (array[i].startsWith('$filter')) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                }

                function combineQueryOptions(key, queryOptions) {
                    var keyInstances = [];
                    queryOptions.forEach(function (item, index) {
                        if (item.indexOf(key) === 0) {
                            keyInstances.push(index);
                        }
                    });
                    var combinedQuery = queryOptions[keyInstances[0]];
                    if (keyInstances.length > 1) {
                        if (key === '$filter') {
                            for (var index = 1; index < keyInstances.length; index++) {
                                var conditionToBeAppended = queryOptions[keyInstances[index]].substring(queryOptions[keyInstances[index]].indexOf('=') + 1);
                                combinedQuery = combinedQuery + ' and ' + conditionToBeAppended;
                            }
                        }
                    }
                    return combinedQuery;
                }

                /* obsolete synchronous implementation
                          //method called during field onChange event
                          //evaluate first the clear statement and after the disable one
                          var evalFieldsExpression = function () {
                              //clear
                              Object.getOwnPropertyNames(self.ngClear).forEach(function (elem) {
                                var outputParameters = self.currentItem, evaluation = null, parkSelecInfo = null, isSelect = [];
                                if (fillQueryResult) {
                                    evaluation = mdContextSrv.parseWithStateCtx(self.ngClear[elem],
                                    { action: { fields: outputParameters, item: fillQueryResult[0], items: fillQueryResult } });
                                }
                                else {
                                    evaluation = mdContextSrv.parseWithStateCtx(self.ngClear[elem], { action: { fields: outputParameters } });
                                }
                                if (evaluation) {
                                    isSelect = self.selectFields.filter(function (selElem) {
                                        if (selElem.name === elem) {
                                            parkSelecInfo = selElem;
                                            return true;
                                        }
                                        return false;
                                    });
                                    delete self.currentItem[elem];
                                    if (isSelect.length > 0) { //&& isSelect[0].selectionContext) {
                                        self.displayData.forEach(function (elemData) { //lost selection ... remove empty value
                                            if (elemData.name === elem) {
                                                if (elemData.widgetAttributes['sit-options'][0][parkSelecInfo.value] === emptyKeepFieldValue) {
                                                    elemData.widgetAttributes['sit-options'].splice(0, 1);
                                                }
                                            }
                                        });
                                    }
                                }
                              });
                              //value
                              Object.getOwnPropertyNames(self.calcValue).forEach(function (elem) {
                                  var outputParameters = self.currentItem, evaluation = null;
                                      if (fillQueryResult) {
                                          evaluation = mdContextSrv.parseWithStateCtx(self.calcValue[elem],
                                          { action: { fields: outputParameters, item: fillQueryResult[0], items: fillQueryResult } });
                                      }
                                      else {
                                          evaluation = mdContextSrv.parseWithStateCtx(self.calcValue[elem], { action: { fields: outputParameters } });
                                      }
                                      if (evaluation === null || typeof evaluation === 'undefined') { // clear
                                          delete self.currentItem[elem];
                                      }
                                      else {
                                          self.currentItem[elem] = evaluation;
                                      }
                              });
                              //reloadOnChange
                              Object.getOwnPropertyNames(self.reloadOnChange).forEach(function (elem) {
                                  var outputParameters = self.currentItem, newFilter = "";
                                  if (fillQueryResult) {
                                      newFilter = mdContextSrv.interpolateQuery(self.reloadOnChange[elem].query,
                                      { action: { fields: outputParameters, item: fillQueryResult[0], items: fillQueryResult } });
                                  }
                                  else {
                                      newFilter = mdContextSrv.interpolateQuery(self.reloadOnChange[elem].query, { action: { fields: outputParameters } });
                                  }
                                  if (typeof self.reloadOnChange[elem].last !== "string" || self.reloadOnChange[elem].last !== newFilter) {
                                      //reload
                                      self.reloadOnChange[elem].last = newFilter;
                                      console.log("reloadOnChange for [" + elem + "] filter: " + newFilter);
                                      multiDataService[self.reloadOnChange[elem]["entity"]].getAll(newFilter, self.reloadOnChange[elem]["applName"])
                                      .then(function (data) {
                                          if (self.reloadOnChange[elem]["distinct"]) {
                                              self.reloadOnChange[elem]["field"].widgetAttributes['sit-options'] = data.value;
                                          }
                                          else {
                                              self.reloadOnChange[elem]["field"].widgetAttributes['sit-options'] = _.uniq(data.value, false, function (row) {
                                                  return row[self.reloadOnChange[elem]["theDisplayField"]];
                                              });
                                          }
                                      });
                                  }
                              });
                              //disable
                              Object.getOwnPropertyNames(self.ngDisableItem).forEach(function (elem) {
                                  var outputParameters = self.currentItem;
                                  if (self.ngDisableItem[elem].expression) {
                                      if (fillQueryResult) {
                                          self.ngDisableItem[elem].value = mdContextSrv.parseWithStateCtx(self.ngDisableItem[elem].expression,
                                          { action: { fields: outputParameters, item: fillQueryResult[0], items: fillQueryResult } });
                                      }
                                      else {
                                          self.ngDisableItem[elem].value = mdContextSrv.parseWithStateCtx(self.ngDisableItem[elem].expression,
                                          { action: { fields: outputParameters } });
                                      }
                                  }
                              });
                              $rootScope.$digest();
                          }
                */

                function evalFormValidation() {
                    var isFormInvalid = false;
                    if (self.formDisable) {
                        var ctx = getContext();
                        if (fillQueryResult) {
                            ctx.action["item"] = fillQueryResult[0];
                            ctx.action["items"] = fillQueryResult;
                        }
                        if (typeof self.formDisable.expression === "string") {
                            if (self.formDisable.expression !== '') {
                                isFormInvalid = mdContextSrv.parseWithStateCtx(self.formDisable.expression, ctx);
                            }
                        }
                        else if (typeof self.formDisable.body === "string") {
                            if (self.formDisable.body !== '') {
                                isFormInvalid = executeFunctionBody(self.formDisable.body, ctx);
                            }
                        }
                        self.sidepanelConfig.actionButtons[0].enabled = (self.validInputs && !isFormInvalid);
                    }
                }

                function executeFunctionBody(body, ctx) {
                    var functionBody = body;
                    var fn = 'return function (action,forms,validations, customServices) {' + functionBody + '};';
                    var defFunction = new Function(fn)(); //NOSONAR
                    return defFunction.apply(ctx, [ctx.action, self.forms, self.allValidations, self.customServices]);
                }

                function evalCustomValidation(param, ctx) {
                    return function () {
                        var internalDef = $q.defer();
                        var functionBody = self.customValidations[param];
                        var fn = 'return function (action,forms,validations, customServices,injector) {' + functionBody + '};';
                        var defFunction = new Function(fn)(); //NOSONAR

                        if (fillQueryResult) {
                            ctx.action["item"] = fillQueryResult[0];
                            ctx.action["items"] = fillQueryResult;
                        }
                        defFunction.apply(ctx, [ctx.action, self.forms, self.allValidations, self.customServices, applInjector]);
                        internalDef.resolve();
                        return internalDef.promise;
                    };
                }

                function getExtendedFieldsContext(inputParams, extensionName) {
                    Object.getOwnPropertyNames(inputParams).forEach(function (paramName) {
                        if (paramName.indexOf(extensionName) === -1) {
                            delete inputParams[paramName];
                        } else {
                            var shortParamName = paramName.safeReplace(extensionName + '_', '');
                            inputParams[shortParamName] = inputParams[paramName];
                            delete inputParams[paramName];
                        }
                    });
                    return inputParams;
                }

                function getContext() {
                    var ctx = { action: { fields: self.currentItem } };
                    if (isExtended) {
                        self.extensions.forEach(function (extension) {
                            if (extension.id) {
                                ctx['action'][extension.id] = { fields: getExtendedFieldsContext(angular.copy(self.currentItem), extension.id) };
                            }
                        });
                    }
                    return ctx;
                }

                var scheduleEval = function (index, evalArray, deferArray) {
                    index = index || 0;
                    function callback() {
                        if (evalArray[++index]) {
                            scheduleEval(index, evalArray, deferArray);
                        }
                    }

                    evalArray[index]().then(function () {
                        deferArray[index].resolve();
                        callback();
                    });
                };

                var genericEvalAll = function (exprObj, evalCommand) {
                    var expressionList = Object.getOwnPropertyNames(exprObj),
                        internalDefer = [], internalEval = [], internalPromises = [], ctx = {};

                    if (expressionList.length > 0) {
                        expressionList.forEach(function (field) {
                            var lDef = $q.defer();
                            internalDefer.push(lDef);
                            internalPromises.push(lDef.promise);
                            ctx = getContext();
                            internalEval.push(evalCommand(field, ctx));
                        });
                        scheduleEval(0, internalEval, internalDefer);
                    }
                    return $q.all(internalPromises);

                };

                function isMultiSelect(fieldName) {
                    var isMultiSelect = false;
                    self.displayData.forEach(function (field) {
                        if (field.name === fieldName) {
                            isMultiSelect = field.widget === multiselect;
                        }
                    });
                    return isMultiSelect;
                }

                var evalClear = function (elem, ctx) {
                    return function () {
                        var deff = $q.defer(), parkSelecInfo = null, isSelect = [],
                            internalDef = $q.defer(), result;
                        if (fillQueryResult) {
                            ctx.action["item"] = fillQueryResult[0];
                            ctx.action["items"] = fillQueryResult;
                        }
                        if (typeof self.ngClear[elem].expression === "string") {
                            result = mdContextSrv.parseWithStateCtx(self.ngClear[elem].expression, ctx);
                        }
                        else if (typeof self.ngClear[elem].body === "string") { //
                            result = mdContextSrv.evalFunctionWithStateCtx(self.ngClear[elem].body, ctx);
                        }
                        if (typeof result === "object" && result !== null && typeof result.then === "function") {
                            result.then(function (outcome) {
                                internalDef.resolve(outcome);
                            });
                        }
                        else {
                            internalDef.resolve(result);
                        }
                        internalDef.promise.then(function (evaluation) {
                            if (evaluation) {
                                isSelect = self.selectFields.filter(function (selElem) {
                                    if (selElem.name === elem) {
                                        parkSelecInfo = selElem;
                                        return true;
                                    }
                                    return false;
                                });
                                delete self.currentItem[elem];
                                if (isSelect.length > 0) { //&& isSelect[0].selectionContext) {
                                    self.displayData.forEach(function (elemData) { //lost selection ... remove empty value
                                        if (elemData.name === elem) {
                                            if (elemData.widgetAttributes['sit-options'].length && elemData.widget !== multiselect &&
                                                elemData.widgetAttributes['sit-options'][0][parkSelecInfo.value] === emptyKeepFieldValue) {
                                                elemData.widgetAttributes['sit-options'].splice(0, 1);
                                            }
                                        }
                                    });
                                }
                                if (isMultiSelect(elem)) {
                                    setMultiSelectedObject(elem);
                                }
                            }
                            deff.resolve();
                        });
                        return deff.promise;
                    };
                };
                var evalValue = function (elem, ctx) {
                    return function () {
                        var deff = $q.defer(), evaluation = null;
                        if (fillQueryResult) {
                            ctx.action["item"] = fillQueryResult[0];
                            ctx.action["items"] = fillQueryResult;
                        }
                        if (typeof self.calcValue[elem]["expression"] === "string") {
                            evaluation = mdContextSrv.parseWithStateCtx(self.calcValue[elem].expression, ctx);
                        }
                        else if (typeof self.calcValue[elem]["body"] === "string") {
                            evaluation = mdContextSrv.evalFunctionWithStateCtx(self.calcValue[elem].body, ctx);
                        }
                        if (evaluation !== null && typeof evaluation === "object" && typeof evaluation.then === "function") {
                            evaluation.then(function (outcome) {
                                if (outcome === null || typeof outcome === 'undefined') { // clear
                                    delete self.currentItem[elem];
                                }
                                else {
                                    self.currentItem[elem] = outcome;
                                }
                                if (isMultiSelect(elem)) {
                                    setMultiSelectedObject(elem);
                                }
                                deff.resolve();
                            });
                        }
                        else {
                            if (evaluation === null || typeof evaluation === 'undefined') { // clear
                                delete self.currentItem[elem];
                            }
                            else {
                                self.currentItem[elem] = evaluation;
                            }
                            if (isMultiSelect(elem)) {
                                setMultiSelectedObject(elem);
                            }
                            deff.resolve();
                        }
                        return deff.promise;
                    };
                };

                function addEmptySelectOption(options, displayField, valueField) {
                    var emptySelection = {};
                    if (displayField && valueField && options && options.length > 0) {
                        emptySelection[displayField] = '';
                        emptySelection[valueField] = '';
                        options = [emptySelection].concat(options);
                    }
                    return options;
                }

                function getEvaluatedReadingFunctionParams(params, ctx) {
                    var evaluatedParams = {};
                    var ctxFields = ctx ? ctx : { "fields": self.currentItem };
                    if (Object.keys(params).length > 0) {
                        for (var param in params) {
                            if (params[param]) {
                                evaluatedParams[param] = mdContextSrv.parseWithStateCtx(params[param], ctxFields);
                                if (!evaluatedParams[param]) {
                                    evaluatedParams[param] = null;
                                }
                            } else {
                                evaluatedParams[param] = params[param];
                            }
                        }
                    }
                    return JSON.stringify(evaluatedParams);
                }

                function getNewFilter(elem, ctx) {
                    var newFilter = "";
                    if (fillQueryResult) {
                        ctx['item'] = fillQueryResult[0];
                        ctx['items'] = fillQueryResult;
                    }
                    if (self.reloadOnChange[elem].query) {
                        newFilter = mdContextSrv.interpolateQuery(self.reloadOnChange[elem].query, ctx);
                    } else if (self.reloadOnChange[elem].readingFunctionParams) {
                        newFilter = getEvaluatedReadingFunctionParams(self.reloadOnChange[elem].readingFunctionParams, ctx);
                    }

                    return newFilter;
                }

                var evalReloadOnChange = function (elem, ctx) {
                    var promise = null;
                    return function () {
                        var deff = $q.defer(), isDefaultValueSet = false, newFilter = "", newSelectionFilter = "";
                        var displayProperty, valueProperty, baseValueProperty, selectValueProperty;
                        newFilter = getNewFilter(elem, ctx);
                        isDefaultValueSet = self.currentItem[elem] && self.currentItem[elem].isDefaultValueSet ? true : false;
                        if (isDefaultValueSet) {
                            delete self.currentItem[elem].isDefaultValueSet;
                        }
                        if (self.reloadOnChange[elem].preSelectValue && self.reloadOnChange[elem].selectionQuery) {
                            if (fillQueryResult) {
                                ctx['item'] = fillQueryResult[0];
                                ctx['items'] = fillQueryResult;
                            }
                            newSelectionFilter = mdContextSrv.interpolateQuery(self.reloadOnChange[elem].selectionQuery, ctx);
                        }
                        baseValueProperty = self.reloadOnChange[elem].baseValueProperty ? self.reloadOnChange[elem].baseValueProperty : null;
                        selectValueProperty = self.reloadOnChange[elem].selectValueProperty ? self.reloadOnChange[elem].selectValueProperty : null;
                        if (typeof self.reloadOnChange[elem].last !== "string" || self.reloadOnChange[elem].last !== newFilter ||
                            self.reloadOnChange[elem].lastSelectionQuery !== newSelectionFilter) {
                            //reload
                            self.reloadOnChange[elem].last = newFilter;
                            self.reloadOnChange[elem].lastSelectionQuery = newSelectionFilter;
                            if (self.reloadOnChange[elem].pagingMode !== 'server') {
                                var dataAttribute;
                                var isMultiSelect = self.reloadOnChange[elem]["field"].widget === multiselect;
                                var isSelect = self.reloadOnChange[elem]["field"].widget === "sit-select";
                                var isEntityPicker = self.reloadOnChange[elem]["field"].widget === "sit-entity-picker";
                                multiDataService[self.reloadOnChange[elem]["dataArtifact"]].getAll(newFilter, self.reloadOnChange[elem]["applName"]).then(function (data) {
                                    if (isSelect || isEntityPicker || isMultiSelect) {
                                        displayProperty = self.reloadOnChange[elem]["theDisplayField"];
                                        valueProperty = self.reloadOnChange[elem]["keepField"];
                                        if (self.reloadOnChange[elem]["field"].widget === "sit-select") {
                                            dataAttribute = 'sit-options';
                                            data.value = addEmptySelectOption(data.value, displayProperty, valueProperty);
                                        } else if (isMultiSelect) {
                                            dataAttribute = 'sit-options';
                                            data.value = getMultiSelectOptions(data.value, displayProperty, valueProperty);
                                        } else {
                                            dataAttribute = 'sit-datasource';
                                        }
                                        if (!self.reloadOnChange[elem]["distinct"]) {
                                            self.reloadOnChange[elem]["field"].widgetAttributes[dataAttribute] = data.value;
                                        } else {
                                            self.reloadOnChange[elem]["field"].widgetAttributes[dataAttribute] = _.uniq(data.value, false, function (row) {
                                                return row[self.reloadOnChange[elem]["theDisplayField"]];
                                            });
                                        }
                                        if (!isDefaultValueSet) {
                                            if (self.reloadOnChange[elem].preSelectValue) {
                                                self.currentItem[elem] = {};
                                                if (newSelectionFilter && self.reloadOnChange[elem].selectionEntity) {
                                                    promise = multiDataService[self.reloadOnChange[elem].selectionEntity]
                                                        .getAll(newSelectionFilter, self.reloadOnChange[elem]["applName"])
                                                        .then(function (selectQueryData) {
                                                            if (data.value && selectQueryData.value && selectQueryData.value.length) {
                                                                for (var i in data.value) {
                                                                    if (baseValueProperty && selectValueProperty) {
                                                                        if (window.$UIF.Object.safeGet(data.value[i], baseValueProperty) === window.$UIF.Object.safeGet(selectQueryData.value[0], selectValueProperty)) {
                                                                            self.currentItem[elem] = data.value[i];
                                                                            if (dataAttribute === 'sit-datasource') {
                                                                                setEntityPickerSelectedObject(elem);
                                                                            }
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    if (promise) {
                                                        $q.all(promise).then(function () {
                                                            deff.resolve();
                                                            return;
                                                        });
                                                    }
                                                } else {
                                                    if (data.value && data.value.length) {
                                                        var firstItem = data.value[0];
                                                        if (firstItem) {
                                                            self.currentItem[elem] = firstItem[displayProperty] ? data.value[0] : data.value[1];
                                                        }
                                                        if (dataAttribute === 'sit-datasource') {
                                                            setEntityPickerSelectedObject(elem);
                                                        }
                                                        if (isMultiSelect) {
                                                            self.currentItem[elem] = firstItem.id;
                                                            setMultiSelectedObject(elem);
                                                        }
                                                    }
                                                    deff.resolve();
                                                    return;
                                                }
                                            } else {
                                                self.currentItem[elem] = null;
                                                if (isMultiSelect) {
                                                    setMultiSelectedObject(elem);
                                                }
                                            }
                                        }
                                        deff.resolve();
                                    } else {
                                        if (data.value && data.value.length && self.reloadOnChange[elem].selectValueProperty) {
                                            var reloadedValue = getDataFromSelectValueProperties(self.reloadOnChange[elem].selectValueProperty, data.value[0]);
                                            self.currentItem[elem] = reloadedValue;
                                        } else {
                                            self.currentItem[elem] = "";
                                        }
                                        deff.resolve();
                                    }
                                });
                            } else {
                                if (self.reloadOnChange[elem].preSelectValue) {
                                    if (newSelectionFilter && self.reloadOnChange[elem].selectionEntity) {
                                        multiDataService[self.reloadOnChange[elem].selectionEntity].getAll(newSelectionFilter, self.reloadOnChange[elem]["applName"])
                                            .then(function (selectQueryData) {
                                                if (selectQueryData.value && selectQueryData.value.length) {
                                                    var optionString = baseValueProperty + ' eq ' + "'" + window.$UIF.Object.safeGet(selectQueryData.value[0], selectValueProperty) + "'";
                                                    var query = getConcatenatedFilterQuery(newFilter, optionString);
                                                    multiDataService[self.reloadOnChange[elem]["dataArtifact"]].getAll(query, self.reloadOnChange[elem]["applName"])
                                                        .then(function (data) {
                                                            self.currentItem[elem] = data.value[0];
                                                        }, function (error) {
                                                            deff.reject(error);
                                                        });
                                                }
                                            });
                                    }
                                }
                            }
                        }
                        else {
                            deff.resolve();
                        }
                        return deff.promise;
                    };
                };

                function getDataFromSelectValueProperties(properties, data) {
                    var propertiesList = properties.split(',');
                    var dataForProperties = '';
                    if (propertiesList && propertiesList.length > 1) {
                        dataForProperties = {};
                        propertiesList.forEach(function (property) {
                            dataForProperties[property] = data[property];
                        });
                    } else if (propertiesList && propertiesList.length === 1) {
                        dataForProperties = data[propertiesList[0]];
                    }
                    return dataForProperties;
                }

                var evalDisable = function (elem, ctx) {
                    return function () {
                        var deff = $q.defer(), result;
                        if (fillQueryResult) {
                            ctx.action["item"] = fillQueryResult[0];
                            ctx.action["items"] = fillQueryResult;
                        }
                        if (typeof self.ngDisableItem[elem].expression === "string") {
                            result = mdContextSrv.parseWithStateCtx(self.ngDisableItem[elem].expression, ctx);
                        }
                        else if (typeof self.ngDisableItem[elem].body === "string") {
                            result = mdContextSrv.evalFunctionWithStateCtx(self.ngDisableItem[elem].body, ctx);
                        }
                        if (typeof result === "object" && result !== null && typeof result.then === "function") {
                            result.then(function (outcome) {
                                self.ngDisableItem[elem].value = outcome;
                                deff.resolve();
                            });
                        }
                        else {
                            self.ngDisableItem[elem].value = result;
                            deff.resolve();
                        }
                        return deff.promise;
                    };
                };

                var evalFieldsExpression2 = function (old, newval, isInterNalCall) {
                    if (pendingEval !== 0 && !isInterNalCall) {
                        pendingEval++;
                    }
                    else {
                        genericEvalAll(self.ngClear, evalClear).then(function () { //clear
                            genericEvalAll(self.calcValue, evalValue).then(function () { //value
                                genericEvalAll(self.reloadOnChange, evalReloadOnChange).then(function () {//reloadOnChange
                                    genericEvalAll(self.ngDisableItem, evalDisable).then(function () { //disable
                                        genericEvalAll(self.customValidations, evalCustomValidation).then(function () { // custom validation
                                            evalFormValidation(); //form validation
                                            if (pendingEval > 0) {
                                                pendingEval--;
                                                evalFieldsExpression2(true);
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    }
                };

                self.DigestEval = function (old, last, ngModel, isValueChanged) {
                    if (old !== last || isValueChanged) { //limit number of evaluation because if fired too frequently
                        //                  setTimeout(function () { evalFieldsExpression(old, last); }, 0);
                        setTimeout(function () { evalFieldsExpression2(old, last); }, 0);
                    }
                };
                listeners[listeners.lenght + 1] = $scope.$on('sit-property-grid.validity-changed', function (event, params) {
                    self.validInputs = params.validity;
                    self.sidepanelConfig.actionButtons[0].enabled = self.validInputs;
                });
                $scope.$on("$destroy", function () {
                    listeners.forEach(function (listner) {
                        listner();
                    });
                });
            }]
        );
}());

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.modelDriven').directive('sitGridCommand', GridCmdDirective);

    function GridCmdDirective() {
        return {
            restrict: 'E',
            scope: true,
            bindToController: {
                options: '=sitOptions',
                row: '=sitRow'
            },
            controller: GridCmdController,
            controllerAs: 'vm',
            templateUrl: 'common/blueprints/executeCommandTemplate/mdGridCommandTemplate.html'
        };
    }
    function GridCmdController() {
        var vm = this;
        if (!vm.options || !vm.row) {
            return;
        }
        vm.isVisible = true;
        vm.tooltip = vm.options.tooltip;
        vm.fieldName = vm.options.fieldName;
        vm.svgIcon = 'common/icons/cmdOpen24.svg';
        vm.faIcon = 'fa-share-square-o';
        vm.isSvg = true;

        //create the svg icon path
        var icon = vm.options.img;
        if (icon && icon.indexOf('svg ') !== -1) {
            var svgIcon = icon.slice(4); //removes 'svg '
            vm.svgIcon = 'common/icons/' + svgIcon + '.svg';
        } else if (icon && icon.indexOf('fa') !== -1) {
            vm.isSvg = false;
            vm.faIcon = icon;
        }

        function getVisibility(obj) {
            if (typeof obj.visible === 'function') {
                vm.isVisible = obj.visible(vm.row);
            } else if (typeof obj.visible === 'boolean') {
                vm.isVisible = obj.visible;
            } else if (typeof obj.visible === 'string' && obj.visible) {
                var functionParam = 'row';
                var functionBody = ["return", obj.visible].join(' ');
                vm.isVisible = new Function(functionParam, functionBody)(vm.row); //NOSONAR
            }
        }

        //evaluate the visibility conditions
        getVisibility(vm.options);

        //attach the on click callback
        vm.onCommandClick = function () {
            if (typeof vm.options.onClick === 'function' && vm.row) {
                vm.options.onClick(vm.row.entity);
            }
        }

    }

}());

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.modelDriven')
    /**
      * @ngdoc directive
      * @name sitMdtoggle
      * @module siemens.simaticit.common.services.modelDriven
      * @access public
      * @description
      * The checkbox directive used by md contents and actions
      *
      */
    .directive('sitMdtoggle', [function () {
        return {
            restrict: 'E',
            replace: false,
            scope: {},
            controller: function () {
                if (Array.isArray(this.value)
                        && typeof this.value[0] === 'object'
                        && this.value[0].hasOwnProperty('checked')
                        && typeof this.value[0]["checked"] === 'boolean') {
                    this.value = this.value[0]["checked"];
                } else if (typeof this.value !== "boolean") {
                    this.value = false;
                }
                this.onChange = function () {
                    if (typeof this.changeClbk === "function") {
                        this.changeClbk(!this.value, this.value);
                    }
                };
            },
            controllerAs: 'toggleCtrl',
            bindToController: {
                value: '=?sitValue',
                changeClbk: '=?sitChange',
                disabled: '=?ngDisabled'
            },
            template: '<input type="checkbox" ng-model="toggleCtrl.value" ng-click="toggleCtrl.onChange()" ng-disabled="toggleCtrl.disabled">'
        };
    }]);
}());
