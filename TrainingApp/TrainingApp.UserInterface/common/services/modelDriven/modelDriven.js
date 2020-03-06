/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.services.modelDriven
    * @access internal
    * @description This module provides services used to implement the model driven UI
    */
    angular.module('siemens.simaticit.common.services.modelDriven', []);
})();

/* jshint -W054*/
(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.modelDriven')
        /**
          * @ngdoc service
          * @name common.services.modelDriven.contextService
          * @module siemens.simaticit.common.services.modelDriven
          * @access internal
          * @description
          * this service handle all context switch as well as all all method to solve/interpolate expression based on context
          *
          */
        .service('common.services.modelDriven.contextService', ['$rootScope', '$state', '$q', 'common.services.session',
            'common.mduiBreadcrumb.breadcrumbService', '$parse', '$interpolate', '$translate', 'common.services.swac.SwacUiModuleManager',
            function ($rootScope, $state, $q, sessionService, breadcrumbService, $parse, $interpolate, $translate, swacManager) {
                this.MDState = { "previousState": "", "previousData": {} };
                this.contextsRepository = [];
                var self = this,
                    currState = "",
                    currData = {},
                    isSidepanelOpen = false,
                    sidepanelState = {
                        isSidepanelOpen: false,
                        show: null
                    };
                var isBackNavigated = false;
                subscribeToSwacEvent();

                //listen to every state change in order to update/clear the current context
                $rootScope.$on("$stateChangeSuccess", function (event, toState, toParam, fromState, fromParam) {
                    var isToStateSidePanel = toState.views['property-area-container@'] && toState.views['property-area-container@'].controller ? true : false;
                    var isfromStateSidePanel = fromState.views['property-area-container@'] && fromState.views['property-area-container@'].controller ? true : false;
                    //preserve prev status and parameters ... used by the onExit feature to navigate back to the previous status
                    if (!(isfromStateSidePanel && isToStateSidePanel)) {
                        self.MDState.previousState = fromState;
                        self.MDState.previousData = fromParam;
                    }
                    currState = toState;
                    currData = toParam;
                    if (self.contextsRepository.length === 0) { //init context repository
                        self.contextsRepository.push({ "name": toState.name, "context": {}, "viewParam": toParam, "modelViewController": null });
                    }
                    if (!self.contextsRepository[0].context) { //init context repository
                        self.contextsRepository[0].context = {};
                    }
                    self.contextsRepository[0].context.params = toParam; //update at least status parameters
                    //... because other context info are updated when status template call setContextInfo (not done by actions)
                    clearCtx();
                    //updating the drill down info maintained for a state
                    if (!currData.isDrillDownState && !currData.isNavigatedFromBreadcrumb && !isBackNavigated) {
                        sessionService.remove('modelDrivenDrillDownCtx');
                        breadcrumbService.setBreadcrumbChain();
                    }
                    if (!currData.isNavigatedFromBreadcrumb && isBackNavigated) {
                        self.updateBreadcrumbOnBackButton();
                        isBackNavigated = false;
                    }
                });

                function subscribeToSwacEvent() {
                    if (swacManager.enabled) {
                        swacManager.eventBusServicePromise.promise.then(function (eventBusSvc) {
                            eventBusSvc.register('historyNavigation');
                            eventBusSvc.event.subscribe(function (event) {
                                if (event.data.topic === 'historyNavigation') {
                                    isBackNavigated = true;
                                }
                            });
                        });
                    }
                }

                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#setContexInfo
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {object} ctxObj the context repository
                * @param {object} viewParam the statePatam of the current status
                * @param {object} viewCtrl the ModelViewCtrl object of the current status
                * @description
                * Overwrite current context information. Used internally by the ModelViewCtrl.
                *
                */

                this.setContexInfo = function (ctxObj, viewParam, viewCtrl) {
                    var stateId = $state.$current.toString();
                    self.contextsRepository = []; // no hierarchical md view ... so we've always only one context
                    self.contextsRepository.push({ "name": stateId, "context": ctxObj, "viewParam": viewParam, "modelViewController": viewCtrl });
                };

                this.setContentContext = function (contentName, selectedItem) {
                    if (self.contextsRepository.length > 0) {
                        if (self.contextsRepository[0].context.contents[contentName]) {
                            self.contextsRepository[0].context.contents[contentName].selectedItem = selectedItem;
                        }
                    }
                }

                this.getContextInfo = function () {
                    if (self.contextsRepository.length > 0) {
                        return self.contextsRepository[0].context;
                    }
                };

                this.updateBreadcrumbOnBackButton = function () {
                    var currentChain = this.getBreadCrumbChain() || [];
                    var index = currentChain.length - 1;
                    if (currentChain.length) {
                        currentChain.splice(index);
                    }
                    if (currentChain.length === 1) {
                        currentChain = [];
                    }
                    this.setBreadCrumbChain(currentChain);
                };

                this.setBreadCrumbChain = function (chain) {
                    var statesInfo = JSON.parse(sessionService.get('modelDrivenDrillDownCtx'));
                    if (!statesInfo) {
                        statesInfo = {};
                    }
                    statesInfo['breadcrumb'] = chain;
                    sessionService.set('modelDrivenDrillDownCtx', JSON.stringify(statesInfo));
                }

                this.getBreadCrumbChain = function () {
                    var statesInfo = JSON.parse(sessionService.get('modelDrivenDrillDownCtx'));
                    if (statesInfo && statesInfo['breadcrumb']) {
                        return statesInfo['breadcrumb'];
                    }
                    return [];
                }

                this.setStateInfo = function (currentState) {
                    var statesInfo = JSON.parse(sessionService.get('modelDrivenDrillDownCtx'));
                    if (!statesInfo) {
                        statesInfo = {};
                        sessionService.set('modelDrivenDrillDownCtx', JSON.stringify(statesInfo));
                    }
                    if (currentState && currentState.id) {
                        statesInfo[currentState.id] = {
                            "master": currentState.master ? currentState.master : null,
                            "detail": currentState.detail ? currentState.detail : null
                        };
                        sessionService.set('modelDrivenDrillDownCtx', JSON.stringify(statesInfo));
                    }
                }

                this.getStateInfo = function (currentStateId) {
                    var statesInfo = JSON.parse(sessionService.get('modelDrivenDrillDownCtx'));
                    if (statesInfo && statesInfo[currentStateId]) {
                        return statesInfo[currentStateId];
                    }
                };
                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#getViewCtrl
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @returns {object} The ModelViewCtrl of the current status
                * @description
                * The ModelViewCtrl provides contents and actions refresh and clean api.
                *
                */
                this.getViewCtrl = function () {
                    if (self.contextsRepository.length > 0) {
                        return self.contextsRepository[0].modelViewController;
                    }
                };


                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#evalFunctionWithStateCtx
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {string} functionBody body of the function ending with a return ...
                * @param {object} additionalContext (optional) Additional context info (e.g.: actionField while in an action)
                * @returns {object} the function evaluation
                * @description
                * The method evaluate a "function body" using the current status contenx object (support extra context variable)
                *
                */

                // Added NOSONAR because in version 2.2 we suppress the vulnerability in according to project architect and the security expert of the product.
                // In detail the process was tracked by the TFS issue number 22519
                // In version 2.3 SonarQube all those issues that were marked before reappeared again. Better, for a certain period the issues were
                //listed as resolved and, at the same time, they were listed as new issues.
                // So a agreed solution with the team issue administrator is to mark them using an in-code approach.
                // You can find details on the attached email on the TFS issue number 22519
                this.evalFunctionWithStateCtx = function (functionBody, additionalContext) {
                    if (typeof functionBody !== 'string') {
                        return functionBody;
                    }
                    functionBody = modifyCustomExpression(functionBody);
                    if (functionBody.indexOf('baseCommand') !== -1 && !additionalContext.baseCommand) {
                        return functionBody;
                    }
                    var paramsNameOrder = ["params", "contents", "activeContent", "action", "baseCommand"],
                        args = paramsNameOrder.join(', ');

                    var fn = 'return function (' + args + ') { ' + functionBody + '};';
                    var defFunction = new Function(fn)(); //NOSONAR
                    if (self.contextsRepository.length === 0) {
                        return undefined;
                    }
                    if (defFunction) {
                        try {
                            var retValue = null, newProp = [], ctx;
                            if (additionalContext) {
                                newProp = Object.getOwnPropertyNames(additionalContext);
                            }
                            //IMPORTANT: deep clone of context because function can modify it
                            ctx = JSON.parse(JSON.stringify(self.contextsRepository[0].context));
                            newProp.forEach(function (pName) { //add props
                                ctx[pName] = additionalContext[pName];
                            });
                            //respect param order above in fn
                            var params = paramsNameOrder.map(function (pName) {
                                return ctx.hasOwnProperty(pName) ? ctx[pName] : undefined;
                            });
                            self.currentContext = ctx;
                            ctx.safeVal = safeVal;
                            if (ctx.contents) {
                                Object.keys(ctx.contents).forEach(function (content) {
                                    if (ctx.contents[content]) {
                                        addMethodsToArray(ctx.contents[content].selectedItems);
                                    }
                                });
                            }
                            retValue = defFunction.apply(ctx, params);
                            return retValue;
                        }
                        catch (e) {
                            return undefined; // wrong custom evalFunction
                        }
                    }
                    return self.contextsRepository[0].context;
                };

                function safeVal(expression) {
                    if (expression) {
                        var context = self.currentContext;
                        var expressionParts = expression.split('.');
                        for (var i = 0; i < expressionParts.length; i++) {
                            if (!context.hasOwnProperty(expressionParts[i])) {
                                return null;
                            }
                            context = context[expressionParts[i]];
                        }
                        return context;
                    } else {
                        return null;
                    }
                }


                function modifyCustomExpression(expression) {
                    if (expression) {
                        expression = expression.replace(new RegExp('safeVal\\(', 'g'), 'this.safeVal(');
                        expression = convertEvalFuncArgsToString(expression);
                    }
                    return expression;
                }

                function indexesOf(text, subText, caseSensitive) {
                    var _source = text;
                    var _find = subText;
                    if (!caseSensitive) {
                        _source = _source.toLowerCase();
                        _find = _find.toLowerCase();
                    }
                    var result = [];
                    for (var i = 0; i < _source.length;) {
                        if (_source.substring(i, i + _find.length) === _find) {
                            result.push(i);
                            i += _find.length;  // found a subText, skip to next position
                        } else {
                            i += 1;
                        }
                    }
                    return result;
                }

                function convertEvalFuncArgsToString(expression) {
                    var strReplace = 'selectedItems.eval("';
                    //add " after eval(
                    var temp = expression.split('selectedItems.eval(');
                    expression = temp.join(strReplace);

                    var arr = indexesOf(expression, strReplace, true);
                    arr.forEach(function (item) {
                        var parenthesisCount = 0, char = '';
                        for (var i = item + strReplace.length; i < expression.length; i++) {
                            char = expression.charAt(i);
                            if (char === '(') {
                                parenthesisCount += 1;
                            } else if (char === ')' && parenthesisCount === 0) {
                                // replace ) with ")
                                var part1 = expression.slice(0, i);
                                var part2 = expression.slice(i);
                                expression = part1 + '"' + part2;
                                break;
                            } else if (char === ')' && parenthesisCount !== 0) {
                                parenthesisCount -= 1;
                            }
                        }
                    });
                    return expression;
                }

                function addMethodsToArray(array) {
                    if (Array.isArray(array)) {
                        array.list = function (param) {
                            var retArr = [];
                            if (!array.forEach || typeof array.forEach !== 'function') {
                                return retArr;
                            }
                            array.forEach(function (item) {
                                if (item[param]) {
                                    retArr.push(item[param]);
                                }
                            });
                            return retArr;
                        }
                        array.eval = function (condition) {
                            var result = true, obj, ttt;
                            if (!array.forEach || typeof array.forEach !== 'function') {
                                return false;
                            }
                            array.forEach(function (item) {
                                obj = { 'item': item };
                                ttt = $parse(condition);
                                result = result && ttt(obj);
                            });
                            return result;
                        }
                    }
                }


                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#parseWithStateCtx
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {string} expression the expression
                * @param {object} additionalContext (optional) Additional context info (e.g.: actionField while in an action)
                * @returns {object} the expression evaluation
                * @description
                * The method use the current status contenx object and support extra context variable.
                *
                */
                this.parseWithStateCtx = function (expression, additionalContext) {
                    if (typeof expression !== 'string') {
                        return expression;
                    }
                    //state descending and parse each context obj)
                    expression = modifyCustomExpression(expression);
                    if (expression.indexOf('baseCommand') === 0 && !additionalContext.baseCommand) {
                        return expression;
                    }
                    if (self.contextsRepository.length === 0) {
                        return undefined;
                    }
                    if (expression) {
                        try {
                            var ttt = $parse(expression), retValue = null, newProp = [];
                            if (additionalContext) {
                                newProp = Object.getOwnPropertyNames(additionalContext);
                            }
                            newProp.forEach(function (pName) { //add props
                                self.contextsRepository[0].context[pName] = additionalContext[pName];
                            });
                            self.currentContext = self.contextsRepository[0].context;
                            var ctx = self.currentContext;
                            ctx.safeVal = safeVal;
                            if (ctx.contents) {
                                Object.keys(ctx.contents).forEach(function (content) {
                                    if (ctx.contents[content]) {
                                        addMethodsToArray(ctx.contents[content].selectedItems);
                                    }
                                });
                            }
                            retValue = ttt(ctx);
                            newProp.forEach(function (pName) { //remove props
                                delete self.contextsRepository[0].context[pName];
                            });
                            return retValue;
                        }
                        catch (e) {
                            return undefined; // wrong custom expression
                        }
                    }
                    return self.contextsRepository[0].context;
                };

                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#parseExpr
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {string} expr the expression
                * @param {object} context The context info
                * @returns {object} the expression evaluation
                * @description
                * Pure Angular "$parse" wrapper with no predefined context
                * It's used in order to solve expression on the modeal fields or against data queried
                */
                this.parseExpr = function (expr, context) {
                    var ttt = $parse(expr);
                    return ttt(context);
                };
                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#interpolateExpr
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {string} expr the angular expression
                * @param {object} context (optional) Additional context info
                * @returns {string} the expression interpolation
                * @description
                * Pure Angular "$interpolate" ... internaly use the current state context
                * Use to solve confirm action questions
                */
                this.interpolateExpr = function (expr, context) {
                    var curCtx = angular.copy(self.contextsRepository[0].context);
                    if (context) {
                        Object.getOwnPropertyNames(context).forEach(function (propName) {
                            curCtx[propName] = context[propName];
                        });
                    }
                    return $interpolate(expr)(curCtx);
                }

                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#translateString
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {string} string
                * @returns {string} the string translation and interpolation
                * @description
                * Pure Angular "$translate" ... internaly use the current state context
                * Use to globalize the action message
                */
                this.translateString = function (expression) {
                    var currentContext = self.contextsRepository[0].context;
                    return $translate.instant(expression, currentContext);
                }

                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#interpolateQuery
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {string} query the query with angular parameter
                * @param {object} context (optional) Additional context info
                * @returns {string} the query interpolation
                * @description
                * Provide in any case a valid query ... even when parameters are not available (null/undefined).
                * Use to solve parameter in query fields
                */
                this.interpolateQuery = function (query, context) {
                    var ttt = query.match(/{{[^{}]*}}/g); //NOSONAR
                    if (ttt && ttt.length > 0) {
                        ttt.forEach(function (elem) {
                            var cleanParam = elem.replace("{{", "").replace("}}", ""),
                                paramValue = self.parseWithStateCtx(cleanParam, context);
                            if (typeof paramValue === "undefined" || paramValue === null) {
                                query = query.replace(elem, 'null');
                            }
                        });
                    }
                    return self.interpolateExpr(query, context);
                }
                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#prepareMethodParams
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {object} fieldsList the action Fields manifest object
                * @param {object} ctx (optional) Additional context info
                * @param {object} retObj (optional) returned object
                * @returns {object} An object with all action parameter evaluated
                * @description
                * Action/command parameter are evaluated against the current status context
                * Use to solve parameter in query fields
                */
                this.prepareMethodParams = function (fieldsList, ctx, retObj) {
                    if (!retObj) {
                        retObj = {};
                    }
                    Object.getOwnPropertyNames(fieldsList).forEach(function (fieldName) {
                        var fieldObj = fieldsList[fieldName];
                        var paramName = "", interpolated = "";
                        //is param?
                        if (fieldObj.parameterRef && fieldObj.parameterRef.parameter) {
                            paramName = fieldObj.parameterRef.parameter;
                            if (fieldObj.value) {
                                if (typeof fieldObj.value.expression === "string") {
                                    interpolated = self.parseWithStateCtx(fieldObj.value.expression, ctx);
                                    retObj[paramName] = interpolated;
                                }
                                else if (typeof fieldObj.value.body === "string") {
                                    interpolated = self.evalFunctionWithStateCtx(fieldObj.value.body, ctx);
                                    if (typeof interpolated === "object" && interpolated !== null && typeof interpolated.then === "function") {
                                        //to check ... can be asynch but should come in time for the execution
                                        interpolated.then(function (outcome) {
                                            retObj[paramName] = outcome;
                                        });
                                    }
                                    else {
                                        retObj[paramName] = interpolated;
                                    }
                                }
                            }
                            else if (fieldObj.default) {
                                if (typeof fieldObj.default.expression === "string") {
                                    interpolated = self.parseWithStateCtx(fieldObj.default.expression, ctx);
                                    retObj[paramName] = interpolated;
                                }
                                else if (typeof fieldObj.default.body === "string") {
                                    interpolated = self.evalFunctionWithStateCtx(fieldObj.default.body, ctx);
                                    if (typeof interpolated === "object" && interpolated !== null && typeof interpolated.then === "function") {
                                        //to check ... can be asynch but should come in time for the execution
                                        interpolated.then(function (outcome) {
                                            retObj[paramName] = outcome;
                                        });
                                    }
                                    else {
                                        retObj[paramName] = interpolated;
                                    }
                                }
                            }
                        }
                    })
                    return retObj;
                }
                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#clearCtx
                * @access internal
                * @module siemens.simaticit.common.services.modelDriven
                * @description
                * Preserve the last status context only if the current status is a substatus of the last one ... otherwise clean it ...
                * E.g.: Preserve parent status context while in an action
                */
                function clearCtx() {
                    var stateId = $state.$current.toString();
                    self.contextsRepository = self.contextsRepository.filter(function (context) {
                        return (stateId.substr(0, context.name.length) === context.name);
                    });
                }

                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#setPropertyPanelState
                * @access internal
                * @module siemens.simaticit.common.services.modelDriven
                * @description
                * Preserve the status of property mode sidepanel.
                * @param {Boolean} state A flag which indicates the sidepanel open/close state.
                * @param {Expression || Function} showExpression An expression/function body, which evaluates the sidepanel visibility.
                */
                this.setPropertyPanelState = function (state, showExpression) {
                    sidepanelState = {
                        isSidepanelOpen: state,
                        show: showExpression
                    };
                }

                /**
                * @ngdoc method
                * @name common.services.modelDriven.contextService#getPropertyPanelState
                * @access internal
                * @module siemens.simaticit.common.services.modelDriven
                * @description
                * Returns the status of property mode sidepanel.
                * @returns {Object} An object with property mode sidepanel status
                */
                this.getPropertyPanelState = function () {
                    return sidepanelState;
                }

            }]);
}());

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.modelDriven').service('common.services.modelDriven.dataService', DataService);

    /**
     * @ngdoc service
     * @name common.services.modelDriven.dataService
     * @module siemens.simaticit.common.services.modelDriven
     * @access internal
     * @description
     * Holds all data and command service for screens/actions
     */
    DataService.$inject = ['$state', '$resource', '$http', 'common.base'];
    function DataService($state, $resource, $http, base) {
        var vm = this;
        var backendService;
        activate();

        function activate() {
            backendService = base.services.runtime.backendService;
            exposeApi();
        }

        function exposeApi() {
            vm.buildManifestEntity = buildManifestEntity;
        }

        function getOnExitValue(key, response) {
            var temp = key;
            var arrayStringIndex = temp.indexOf('[');
            if (arrayStringIndex !== -1) {
                key = temp.substring(0, arrayStringIndex);
                var indexString = temp.substring(arrayStringIndex);
                var arrayIndex = indexString.indexOf(']');
                var index = arrayIndex !== -1 ? Number(indexString.substring(1, arrayIndex)) : 0;
            }
            if (response && response.data && response.data[key]) {
                if (response.data[key].constructor === Array) {
                    if (typeof index === 'number' && !isNaN(index)) {
                        return response.data[key][index];
                    }
                    return response.data[key];
                }
                return response.data[key];
            }
        }

        /**
         * @ngdoc method
         * @name common.services.modelDriven.dataService#buildManifestEntity
         * @access internal
         * @module siemens.simaticit.common.services.modelDriven
         * @param {object} manifest A valid MD manifest
         * @description
         * Build and array, entities based, with method for read and write backend data
         */
        function buildManifestEntity(manifest) {
            var applName = manifest.appl;
            if (!manifest.appl) {
                var splittedFB = manifest.functionalBlock.split('.');
                applName = splittedFB[splittedFB.length - 1];
            }
            manifest.states.forEach(function (screen) {
                var allEntities = {};
                var allReadingFunctions = {};

                for (var content in screen.contents) {
                    if (screen.contents.hasOwnProperty(content)) { //entity is mandatory for contents
                        if (screen.contents[content].entityRef && screen.contents[content].entityRef.entity) {
                            allEntities[screen.contents[content].entityRef.entity] = true;
                        }
                        if (screen.contents[content].multiplicity === 'one' && screen.contents[content].extensionRef) {
                            screen.contents[content].extensionRef.forEach(function (extension) {
                                if (extension.entityRef && extension.entityRef.entity) {
                                    allEntities[extension.entityRef.entity] = true;
                                }
                                if (extension.readingFunctionRef && extension.readingFunctionRef.functionName) {
                                    allReadingFunctions[extension.readingFunctionRef.functionName] = extension.readingFunctionRef;
                                }
                            });
                        }
                        if (screen.contents[content].readingFunctionRef && screen.contents[content].readingFunctionRef.functionName) {
                            allReadingFunctions[screen.contents[content].readingFunctionRef.functionName] = screen.contents[content].readingFunctionRef;
                        }
                        if (screen.contents[content].actions) {
                            screen.contents[content].actions.forEach(addActionArtifact);
                        }
                    }
                }
                Object.getOwnPropertyNames(allEntities).forEach(function (entityName) {
                    var entity = entityName, res = null, parkActions = [];
                    // build reading methods
                    if (!vm[entity]) {
                        // add getAll method only once
                        vm[entity] = {};
                        res = vm[entity];
                        res.entity = entity;
                        res.getAll = function (options, parApplName, template) {
                            if(template === 'singleEntityArchiving' || template === 'masterDetailsArchiving') {
                                if(options) {
                                    return backendService.findAllArchiving({ appName: parApplName ? parApplName : applName, entityName: this.entity, options: options });
                                }
                                return backendService.findAllArchiving({ appName: parApplName ? parApplName : applName, entityName: this.entity });
                            }

                            if (options) {
                                return backendService.findAll({ appName: parApplName ? parApplName : applName, entityName: this.entity, options: options });
                            }
                            return backendService.findAll({ appName: parApplName ? parApplName : applName, entityName: this.entity });
                        };
                    }
                    else {
                        res = vm[entity];
                    }
                    for (var contentName in screen.contents) {
                        var content = screen.contents[contentName];
                        if ('auditTrail' !== content.multiplicity && !content.readingFunctionRef && content.actions) { //filter actions on the current entity
                            if (content.entityRef && content.entityRef.entity) {
                                parkActions = parkActions.concat(content.actions.filter(filterEntityAction,
                                    { "contentEntity": content.entityRef.entity, "entity": entity }));
                            } else {
                                parkActions = parkActions.concat(content.actions);
                            }
                        }
                    }
                    // build command methods
                    parkActions.forEach(function (action) {
                        if (!res[action.id]) {
                            res[action.id] = function (data, parApplName) {
                                return backendService.invoke({ appName: parApplName ? parApplName : applName, commandName: action.behavior.commandRef.command, params: data }).then(function (outcome) {
                                    var response = { id: null, completeResponse: null };
                                    if (action.extensionRef && action.extensionRef.length > 0) {
                                        response.completeResponse = outcome;
                                    }
                                    if (action.behavior.onExit && action.behavior.onExit.key) {
                                        var key = action.behavior.onExit.key;
                                        var value = getOnExitValue(key, outcome);
                                        if (value !== undefined) {
                                            response.id = value;
                                            return response;
                                        }
                                    }
                                    if (outcome && outcome.data && outcome.data.Id) {
                                        response.id = outcome.data.Id;
                                        return response;
                                    }
                                    if (data && data.Id) { //during editing operation the Id can not be in the method outcome ... try to reuse the method parameter info
                                        response.id = data.Id;
                                        return response;
                                    }
                                    if (outcome && outcome.data) {
                                        var outFields = Object.getOwnPropertyNames(outcome.data);
                                        outFields = outFields.filter(function (of) {
                                            return of !== "Error" && of !== "Succeeded" && of.indexOf("@odata.") === -1;
                                        });
                                        if (outFields.length === 1 && typeof outFields[0] === "string") {
                                            response.id = outcome.data[outFields[0]];
                                            return response;
                                        }
                                    }
                                    return response;
                                }, function (error) {
                                    //NOTE: it overrides the base funcion call of UI Frameworks and the overlay is called twice
                                    // backendService.genericError(error.data.error.errorMessage, error.statusText);
                                    return false;
                                });
                            };
                            if (action.extensionRef && action.extensionRef.length > 0) {
                                action.extensionRef.forEach(function (extension) {
                                    if (!res[action.id][extension.id]) {
                                        res[action.id][extension.id] = function (data, parApplName) {
                                            var extendedCommandParams = { appName: parApplName ? parApplName : applName, commandName: extension.commandRef.command, params: data };
                                            return backendService.invoke(extendedCommandParams).then(function (outcome) {
                                                return true;
                                            }, function (error) {
                                                //NOTE: it overrides the base funcion call of UI Frameworks and the overlay is called twice
                                                // backendService.genericError(error.data.error.errorMessage, error.statusText);
                                                return false;
                                            });
                                        };
                                    }
                                });
                            }
                        }
                    });
                });
                //End allEntities loop

                Object.getOwnPropertyNames(allReadingFunctions).forEach(function (readingFunctionName) {
                    var res = null; var parkActions = [];
                    var readingFunctionModel = {};
                    readingFunctionModel.appName = applName;
                    readingFunctionModel.functionName = readingFunctionName;
                    readingFunctionModel.options = allReadingFunctions[readingFunctionName].options;
                    // build reading methods
                    if (!vm[readingFunctionName]) {
                        // add getAll method only once
                        vm[readingFunctionName] = {};
                        res = vm[readingFunctionName];
                        res.readingFunction = readingFunctionName;
                        res.getAll = function (params, parApplName) {
                            readingFunctionModel.appName =  parApplName ? parApplName : applName;
                            readingFunctionModel.params = {};
                            if (typeof params === 'string') {
                                readingFunctionModel.params = JSON.parse(params);
                            }
                            return backendService.read(readingFunctionModel);
                        };
                    }
                    else {
                        res = vm[readingFunctionName];
                    }
                    for (var contentName in screen.contents) {
                        if ('auditTrail' !== screen.contents[contentName].multiplicity && screen.contents[contentName].actions) { //filter actions on the current entity
                            parkActions = parkActions.concat(screen.contents[contentName].actions);
                        }
                    }
                    // build command methods
                    parkActions.forEach(function (action) {
                        if (!res[action.id]) {
                            res[action.id] = function (data, parApplName) {
                                return backendService.invoke({ appName: parApplName ? parApplName : applName, commandName: action.behavior.commandRef.command, params: data }).then(function (outcome) {
                                    var response = { id: null, completeResponse: null };
                                    if (action.extensionRef && action.extensionRef.length > 0) {
                                        response.completeResponse = outcome;
                                    }
                                    if (action.behavior.onExit && action.behavior.onExit.key) {
                                        var key = action.behavior.onExit.key;
                                        var value = getOnExitValue(key, outcome);
                                        if (value !== undefined) {
                                            response.id = value;
                                            return response;
                                        }
                                    }
                                    if (outcome && outcome.data && outcome.data.Id) {
                                        response.id = outcome.data.Id;
                                        return response;
                                    }
                                    if (data && data.Id) { //during editing operation the Id can not be in the method outcome ... try to reuse the method parameter info
                                        response.id = data.Id;
                                        return response;
                                    }
                                    if (outcome && outcome.data) {
                                        var outFields = Object.getOwnPropertyNames(outcome.data);
                                        outFields = outFields.filter(function (of) {
                                            return of !== "Error" && of !== "Succeeded" && of.indexOf("@odata.") === -1;
                                        });
                                        if (outFields.length === 1 && typeof outFields[0] === "string") {
                                            response.id = outcome.data[outFields[0]];
                                            return response;
                                        }
                                    }
                                    return response;
                                }, function (error) {
                                    //NOTE: it overrides the base funcion call of UI Frameworks and the overlay is called twice
                                    //backendService.genericError(error.data.error.errorMessage, error.statusText);
                                    return false;
                                });
                            };
                            if (action.extensionRef && action.extensionRef.length > 0) {
                                action.extensionRef.forEach(function (extension) {
                                    if (!res[action.id][extension.id]) {
                                        res[action.id][extension.id] = function (data, parApplName) {
                                            var extendedCommandParams = { appName: parApplName ? parApplName : applName, commandName: extension.commandRef.command, params: data };
                                            return backendService.invoke(extendedCommandParams).then(function (outcome) {
                                                return true;
                                            }, function (error) {
                                                //NOTE: it overrides the base funcion call of UI Frameworks and the overlay is called twice
                                                // backendService.genericError(error.data.error.errorMessage, error.statusText);
                                                return false;
                                            });
                                        };
                                    }
                                });
                            }
                        }
                    });
                });

                //clear entities
                allEntities = {};
                allReadingFunctions = {};

                //collect all artifacts from extensions
                function addExtendedFieldsArtifacts(prop) {
                    if (!prop) {
                        return;
                    }
                    if (typeof prop.type === 'object' || prop.inputMode === 'queryResult' || prop.inputMode === 'inputText') { //field with select/query
                        if (prop.entityRef && prop.entityRef.entity) {
                            allEntities[prop.entityRef.entity] = true;
                            if (prop.selectEntityRef && prop.selectEntityRef.entity) {
                                allEntities[prop.selectEntityRef.entity] = true;
                            }
                        } else if (prop.readingFunctionRef && prop.readingFunctionRef.functionName) {
                            allReadingFunctions[prop.readingFunctionRef.functionName] = prop.readingFunctionRef;
                        }
                    }
                }

                function addActionArtifact(action) {
                    if (action.extensionRef && action.extensionRef.length > 0) {
                        action.extensionRef.forEach(function (extension) {
                            if (extension && extension.fields) {
                                extension.fields.forEach(addExtendedFieldsArtifacts);
                            }
                        });
                    }
                    if (action.behavior.entityRef && action.behavior.entityRef.entity) {
                        addEntityAction(action);
                        return;
                    }
                    if (action.behavior.readingFunctionRef && action.behavior.readingFunctionRef.functionName) {
                        addReadingFunctionAction(action);
                        return;
                    }
                }

                //collect all entities in an action
                function addEntityAction(action) {
                    allEntities[action.behavior.entityRef.entity] = true;

                    //check for object field that will be rendered in select/entity picker
                    if (action.behavior.fields) {
                        Object.getOwnPropertyNames(action.behavior.fields).forEach(function (propName) {
                            var prop = action.behavior.fields[propName];
                            if (prop && (typeof prop.type === 'object' || prop.inputMode === 'queryResult' || prop.inputMode === 'inputText')) { //field with select/query
                                if (prop.entityRef && prop.entityRef.entity) {
                                    allEntities[prop.entityRef.entity] = true;
                                    if (prop.selectEntityRef && prop.selectEntityRef.entity) {
                                        allEntities[prop.selectEntityRef.entity] = true;
                                    }
                                } else if (prop.readingFunctionRef && prop.readingFunctionRef.functionName) {
                                    allReadingFunctions[prop.readingFunctionRef.functionName] = prop.readingFunctionRef;
                                }
                            }
                        });
                    }
                }

                //collect reading function in an action
                function addReadingFunctionAction(action) {
                    allReadingFunctions[action.behavior.readingFunctionRef.functionName] = action.behavior.readingFunctionRef;

                    //check for object field that will be rendered in select/entity picker
                    if (action.behavior.fields) {
                        Object.getOwnPropertyNames(action.behavior.fields).forEach(function (propName) {
                            var prop = action.behavior.fields[propName];
                            if (prop && (typeof prop.type === 'object' || prop.inputMode === 'queryResult' || prop.inputMode === 'inputText')) { //field with select/query
                                if (prop.entityRef && prop.entityRef.entity) {
                                    allEntities[prop.entityRef.entity] = true;
                                    if (prop.selectEntityRef && prop.selectEntityRef.entity) {
                                        allEntities[prop.selectEntityRef.entity] = true;
                                    }
                                } else if (prop.readingFunctionRef && prop.readingFunctionRef.functionName) {
                                    allReadingFunctions[prop.readingFunctionRef.functionName] = prop.readingFunctionRef;
                                }
                            }
                        });
                    }
                }
            });
            // End states loop
        }

        //run with a context object
        function filterEntityAction(act, index, array) {
            var self = this;
            return act.behavior.entityRef ? act.behavior.entityRef.entity === self.entity : self.contentEntity === self.entity;
        }
    }
}());

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.modelDriven').provider('common.services.modelDriven.service', ServiceProvider);

    ServiceProvider.$inject = ['$stateProvider'];
    function ServiceProvider($stateProvider) {
        var vm = this;
        activate();

        function activate() {
            vm.$get = getService;
        }

        getService.$inject = ['$http', '$q', '$translate', 'common.services.logger.service', 'common.services.modelDriven.dataService',
            'common.services.modelDriven.migrationService'];
        function getService($http, $q, $translate, logger, dataService, migrationService) {
            return new Service($stateProvider, $http, $q, $translate, logger, dataService, migrationService);
        }
    }

    /**
      * @ngdoc service
      * @name common.services.modelDriven.service
      * @module siemens.simaticit.common.services.modelDriven
      * @access internal
      * @description
      * Provides API in order to load a md manifest (initMD), to get current model info (getManifest).
      * It internally, while loading a manifest, add application states and, using common.services.modelDriven.dataService,
      * prepare all data access object (r/w api).
      */
    function Service($stateProvider, $http, $q, $translate, logger, dataService, migrationService) {
        var vm = this;
        // constant for console logging
        var SERVICE_NAME = 'modelDriven Service';
        // constant for the default module template prefix
        var TEMPLATE_MODULE = 'common.layout.modelDriven.template';
        var allStates, allManifests, allModulesDefer, pendingModulesCount, allScreens = [];

        activate();

        function activate() {
            allStates = {
                states: []
            };
            allManifests = {};
            allModulesDefer = null;

            exposeApi();
        }

        function exposeApi() {
            vm.initMD = initMD;
            vm.initStates = initStates;
            vm.getCurrentModuleInfo = getCurrentModuleInfo;
            vm.loadModule = loadModule;
        }

        /**
        * @ngdoc method
        * @name common.services.modelDriven.service#initMD
        * @access internal
        * @module siemens.simaticit.common.services.modelDriven
        * @param {string} manifestPath path of the json manifest to load
        * @description Load md manifest.
        */
        function initMD(manifestPath) {
        }

        function initStates() {
            var path = 'allStates.json'
            allModulesDefer = $q.defer();
            var allStatesPath = path;
            if (allScreens && allScreens.length > 0) {
                allModulesDefer.resolve(allScreens);
                return allModulesDefer.promise;
            }

            createStates(allStatesPath).then(nextStep, nextStep);
            return allModulesDefer.promise;
        }

        function createStates(path) {
            var defer = $q.defer();
            $http.get(path).then(function (response) {
                var allStatesData = response.data;
                logger.logInfo('allStatesData processed:', allStatesData, SERVICE_NAME);

                addStates(allStatesData);
                defer.resolve(allStatesData);
            }, function (reason) {
                logger.logError('Error processing module manifest: ', reason, SERVICE_NAME);
                defer.reject(reason);
            });
            return defer.promise;
        }

        function addStates(states) {
            states.forEach(function (state) {
                // is the manifest outdated? if yes, show an outdated message to upgrade and return
                if (state.isOutdated) {
                    addOutdatedScreenState(state);
                    return;
                }
                allScreens.push({ 'id': state.id, 'module': state.module});
                // First step: add screen state
                if (state.type === undefined && (state.autoGenerate !== undefined ? state.autoGenerate : true)) {
                    addScreenState(state);
                }
                if (state.actions) {
                    state.actions.forEach(function (action) {
                        addActionState(action, state.id);
                    })

                }
            });
        }

        function getFolderPath(moduleName) {
            // folder name (assuming folder name to match the module name) + modules + module name + .json
            var folderName = moduleName.substring(0, moduleName.lastIndexOf('.'));
            return folderName + '/modules/' + moduleName + '.json';
        }

        function nextStep() {
            pendingModulesCount = pendingModulesCount - 1;
            if (0 < pendingModulesCount) {
                return;
            }
            allModulesDefer.resolve(allStates);
        }

        function getCurrentModuleInfo(screenId) {
            var moduleInfo = {};
            for (var i = 0; i < allScreens.length; i++) {
                if (allScreens[i].id === screenId) {
                    var folderName = getFolderPath(allScreens[i].module);
                    moduleInfo = allManifests[folderName];
                }
            }
            return moduleInfo;
        }

        /**
        * @ngdoc method
        * @name common.services.modelDriven.service#getManifest
        * @access internal
        * @module siemens.simaticit.common.services.modelDriven
        * @param {string} path (optional) When path is specified the manifest is loaded, merged with others and elaborated.
        * When path is omitted the current application model is returned.
        * @returns {Promise} A promise object containing requested manifest.
        * @description Load or simply return a md manifest.
        */
       
        function loadModule(stateId) {
            var defer = $q.defer();
            var moduleName = getModuleNameByStateId(stateId);

            loadManifest(getFolderPath(moduleName)).then(function (manifest) {
                defer.resolve(manifest);
            });
            return defer.promise;


        }
        function getModuleNameByStateId(stateId) {
            var moduleName;
            for (var i = 0; i < allScreens.length; i++) {
                if (allScreens[i].id === stateId) {
                    moduleName = allScreens[i].module;
                }
            }
            return moduleName;
        }

        function getManifestVersionNumber(versionString) {
            var versions, manifestVersion = 0;
            if (versionString) {
                versions = versionString.split('.');
                if (versions && versions.length === 3) {
                    manifestVersion = versions[0] + '.' + versions[1] + versions[2];
                    manifestVersion = Number(manifestVersion);
                }
            }
            return manifestVersion;
        }

        /**
        * @ngdoc method
        * @name common.services.modelDriven.service#loadManifest
        * @access internal
        * @module siemens.simaticit.common.services.modelDriven
        * @param {string} path the manifest url to be loaded
        * @description
        * Performs the manifest request and start status and entities elaboration
        */
        function loadManifest(path) {
            var defer = $q.defer();
            if (allManifests && allManifests[path]) {
                defer.resolve(allManifests[path]);
                return defer.promise;
            }
            $http.get(path).then(function (response) {
                var manifest = response.data;
                logger.logInfo('Module manifest processed:', manifest, SERVICE_NAME);

                // Is the module model-driven? if not don't process
                if (!manifest.states[0].hasOwnProperty('layoutTemplate') && !manifest.states[0].hasOwnProperty('blueprint')) {
                    defer.reject('Invalid model-driven module.');
                    return;
                }

                // Is the module an extension to a module
                if (manifest.hasOwnProperty('baseAppName')) {
                    defer.reject('Extension model-driven module.');
                    return;
                }

                var isOutdated = false;
                var manifestVersion = getManifestVersionNumber(manifest.manifestVersion);
                if (manifestVersion < 2) {
                    isOutdated = true;
                }

                //migrate 02.00.00 manifests
                if (!isOutdated && manifestVersion < 2.01) {
                    var migrationResponse = migrationService.getMigratedManifest(manifest);
                    manifest = migrationResponse.manifest;
                }
              
                //add all entities query and actions command implementation
                if (!isOutdated) {
                    dataService.buildManifestEntity(manifest);
                }

                // Store the module manifest in the collection
                allManifests[path] = manifest;
                if (undefined === allStates.customServices) {
                    allStates.customServices = [];
                }
                // Merge the module states with the collection
                allStates.states = allStates.states.concat(manifest.states);
                if (undefined !== manifest.customServices) {
                    allStates.customServices = allStates.customServices.concat(manifest.customServices);
                }
                defer.resolve(manifest);
            }, function (reason) {
                logger.logError('Error processing module manifest: ', reason, SERVICE_NAME);
                defer.reject(reason);
            });
            return defer.promise;
        }
       
        function addOutdatedScreenState(stateDetails) {
            var errorMessage = 'The screen cannot be displayed because it was developed with a previous version.Please consider updating the required Apps.';
            $stateProvider.state({
                name: stateDetails.id,
                url: '/' + stateDetails.urlPrefix + '-list',
                views: {
                    'Canvas@': {
                        template: '<div class="content-area content-area-relative" style="height: calc(100% - 50px) !important" id="itemlist">'
                            + '<h2>Error</h2>'
                            + '<h3>' + errorMessage + '</h3>'
                            + '</div>'
                    }
                },
                data: {
                    title: $translate.instant(stateDetails.header) || stateDetails.title
                }
            });
        }

        function getBlueprint(stateInfo) {
            var templateUrl = '', controller = '';
            //check first for custom template
            if (stateInfo.blueprint) {
                //custom and backward compatibility
                return { ctrl: stateInfo.blueprint.controller, tpl: stateInfo.blueprint.url };
            }

            //DataArchiving Single EntityTemplate (the same of single entity for archiving database)
            if (stateInfo.layoutTemplate === 'singleEntityArchiving') {
                return { ctrl: TEMPLATE_MODULE + '.SECtrl', tpl: 'common/blueprints/singleEntityTemplate/singleEntityLayoutTemplate.html' };
            }

            if (stateInfo.layoutTemplate === 'masterDetailsArchiving') {
                return { ctrl: TEMPLATE_MODULE + '.MDCtrl', tpl: 'common/blueprints/masterDetailsTemplate/masterDetailsLayoutTemplate.html' };
            }


            if (stateInfo.layoutTemplate === 'masterDetails') {
                controller = TEMPLATE_MODULE + '.MDCtrl';
                templateUrl = 'common/blueprints/masterDetailsTemplate/masterDetailsLayoutTemplate.html';
            } else {
                //default template
                controller = TEMPLATE_MODULE + '.SECtrl';
                templateUrl = 'common/blueprints/singleEntityTemplate/singleEntityLayoutTemplate.html';
            }

            return { ctrl: controller, tpl: templateUrl };
        }

        function addScreenState(stateDetails) {

            var bluePrintInfo = getBlueprint(stateDetails);

            var stateParams = { isDrillDownState: false, isNavigatedFromBreadcrumb: false };
            // Check state params
            if (stateDetails.params) {
                //smart navigation ... collect possible status parameter
                stateDetails.params.forEach(function (name) {
                    stateParams[name] = null;
                });
            }
            var helpString = '';
            if (stateDetails.help) {
                helpString = stateDetails.help;
            }

            $stateProvider.state({
                name: stateDetails.id,
                url: '/' + stateDetails.id,
                params: stateParams,
                views: {
                    'Canvas@': {
                        templateUrl: bluePrintInfo.tpl,
                        controller: bluePrintInfo.ctrl,
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: $translate.instant(stateDetails.header) || stateDetails.title,
                    help: helpString
                }
            });
        }

        function addActionState(actionDetails, screenId) {
            var templateUrl = '', controller = '';

            if (actionDetails.type) {
                if ('command' === actionDetails.type) {
                    if (actionDetails.blueprint && actionDetails.blueprint.url && actionDetails.blueprint.controller) {
                        templateUrl = actionDetails.blueprint.url;
                        controller = actionDetails.blueprint.controller;
                    } else {
                        templateUrl = 'common/blueprints/executeCommandTemplate/execute-commandTemplate.html';
                        controller = 'common.layout.modelDriven.template.ExecuteCommandCtrl';
                    }
                } else if ('view' === actionDetails.type) {
                    if (actionDetails.blueprint && actionDetails.blueprint.url && actionDetails.blueprint.controller) {
                        templateUrl = actionDetails.blueprint.url;
                        controller = actionDetails.blueprint.controller;
                    } else {
                        templateUrl = 'common/blueprints/overviewTemplate/overviewTemplate.html';
                        controller = 'common.layout.modelDriven.template.Overview';
                    }
                }
            } else {
                //default if not specified
                if (actionDetails.commandRef) {
                    templateUrl = 'common/blueprints/executeCommandTemplate/execute-commandTemplate.html';
                    controller = 'common.layout.modelDriven.template.ExecuteCommandCtrl';
                }
            }

            var stateParams = {};
            //collect navigation params
            if (actionDetails.params) {
                Object.getOwnPropertyNames(actionDetails.params).forEach(function (name) {
                    stateParams[name] = null;
                });
            }

            $stateProvider.state({
                name: screenId + '.' + actionDetails.id,
                url: '/' + actionDetails.id,
                params: stateParams,
                views: {
                    'property-area-container@': {
                        templateUrl: templateUrl,
                        controller: controller,
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: $translate.instant(actionDetails.title)
                }
            });
        }
    }
}());

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var MigrationService = /** @class */ (function () {
            function MigrationService() {
            }
            MigrationService.prototype.getMigratedManifest = function (manifest) {
                try {
                    var migratedManifest = this.migrateModule(manifest);
                    return { 'succeeded': true, 'manifest': migratedManifest };
                }
                catch (e) {
                    return { 'succeeded': false, 'manifest': manifest };
                }
            };
            MigrationService.prototype.migrateModule = function (manifest) {
                if (!manifest.hasOwnProperty('customServices')) {
                    manifest.customServices = [];
                }
                for (var i = 0; i < manifest.states.length; i++) {
                    try {
                        var migratedScreen = this.migrateScreen(manifest.states[i]);
                        manifest.states[i] = migratedScreen;
                    }
                    catch (e) {
                        continue;
                    }
                }
                manifest.manifestVersion = '02.01.00';
                return manifest;
            };
            MigrationService.prototype.migrateScreen = function (screenObj) {
                //if (!screenObj.contents.id) {
                //}
                this.appName = screenObj.appName;
                var layoutTemplate = !screenObj.layoutTemplate && !screenObj.hasOwnProperty('blueprint') ? 'singleEntity' : screenObj.layoutTemplate;
                if (!screenObj.layoutTemplate && !screenObj.hasOwnProperty('blueprint')) {
                    screenObj.layoutTemplate = 'singleEntity';
                }
                if (!screenObj.header) {
                    screenObj.header = screenObj.title;
                }
                if (!screenObj.hasOwnProperty('contents')) {
                    screenObj.contents = {};
                }
                if (!screenObj.hasOwnProperty('params')) {
                    screenObj.params = [];
                }
                if (!screenObj.hasOwnProperty('autoGenerate')) {
                    screenObj.autoGenerate = true;
                }
                if (screenObj.hasOwnProperty('appAcronym')) {
                    delete screenObj.appAcronym;
                }
                for (var content in screenObj.contents) {
                    if (content) {
                        try {
                            var migratedContent = this.migrateContent(screenObj.contents[content], layoutTemplate);
                            screenObj.contents[content] = migratedContent;
                        }
                        catch (e) {
                            continue;
                        }
                    }
                }
                return screenObj;
            };
            MigrationService.prototype.migrateContent = function (contentObj, screenTemplate) {
                if (!contentObj.hasOwnProperty('master')) {
                    contentObj.master = false;
                }
                if (!contentObj.hasOwnProperty('actions')) {
                    contentObj.actions = [];
                }
                if (contentObj.multiplicity !== 'auditTrail') {
                    contentObj.properties = this.migrateContentProperties(contentObj.properties);
                }
                contentObj.blueprintSettings = this.migrateContentBlueprintSettings(contentObj, screenTemplate);
                if (contentObj.entityRef) {
                    contentObj.entityRef.app = this.appName;
                }
                else if (contentObj.readingFunctionRef) {
                    contentObj.readingFunctionRef.app = this.appName;
                }
                for (var i = 0; i < contentObj.actions.length; i++) {
                    try {
                        contentObj.actions[i] = this.migrateAction(contentObj.actions[i]);
                    }
                    catch (e) {
                        continue;
                    }
                }
                return contentObj;
            };
            MigrationService.prototype.migrateContentProperties = function (properties) {
                var serviceScope = this;
                properties.forEach(function (property, index) {
                    if (property.propertyRef) {
                        property.propertyRef.app = serviceScope.appName;
                    }
                    if (!property.hasOwnProperty('sortable')) {
                        property.sortable = false;
                    }
                    if (!property.hasOwnProperty('searchable')) {
                        property.searchable = false;
                    }
                    if (!property.hasOwnProperty('groupable')) {
                        property.groupable = false;
                    }
                    if (property.hasOwnProperty('title')) {
                        delete property.title;
                    }
                    if (property.hasOwnProperty('values')) {
                        delete property.values;
                    }
                    if (property.hasOwnProperty('isDescription')) {
                        delete property.isDescription;
                    }
                    if (property.hasOwnProperty('isTitle')) {
                        delete property.isTitle;
                    }
                    if (property.hasOwnProperty('id')) {
                        delete property.id;
                    }
                    if (property.hasOwnProperty('isSelected')) {
                        delete property.isSelected;
                    }
                });
                return properties;
            };
            MigrationService.prototype.migrateContentBlueprintSettings = function (contentObj, screenTemplate) {
                if (contentObj.multiplicity === 'one') {
                    var blueprintSettings = {
                        'gridConfig': { 'columnDefs': [] },
                        'layoutSettings': {
                            'layout': 'Vertical',
                            'columns': '1',
                            'type': 'Fixed'
                        }
                    };
                    if (contentObj.blueprintSettings && contentObj.blueprintSettings.gridConfig) {
                        blueprintSettings.gridConfig = contentObj.blueprintSettings.gridConfig;
                    }
                    if (contentObj.blueprintSettings && contentObj.blueprintSettings.layoutSettings) {
                        blueprintSettings.layoutSettings = contentObj.blueprintSettings.layoutSettings;
                    }
                    contentObj.blueprintSettings = blueprintSettings;
                }
                if (contentObj.blueprintSettings && contentObj.multiplicity === 'many') {
                    if (!contentObj.blueprintSettings.viewMode && !contentObj.blueprintSettings.viewOptions) {
                        if (contentObj.master && screenTemplate === 'masterDetails') {
                            contentObj.blueprintSettings.viewMode = 'c';
                            contentObj.blueprintSettings.viewOptions = 'c';
                        }
                        else {
                            contentObj.blueprintSettings.viewMode = 'm';
                            contentObj.blueprintSettings.viewOptions = 'm';
                        }
                    }
                    if (!contentObj.blueprintSettings.tileConfig) {
                        contentObj.blueprintSettings.tileConfig = { 'icon': '', 'titleField': '', 'descriptionField': '', 'isCell': false, 'propertyFields': [], 'indicators': [], 'commands': [] };
                    }
                    else {
                        contentObj.blueprintSettings.tileConfig.icon = contentObj.blueprintSettings.tileConfig.icon || '';
                        contentObj.blueprintSettings.tileConfig.titleField = contentObj.blueprintSettings.tileConfig.titleField || '';
                        contentObj.blueprintSettings.tileConfig.descriptionField = contentObj.blueprintSettings.tileConfig.descriptionField || '';
                        if (contentObj.blueprintSettings.tileConfig.isCell === undefined) {
                            contentObj.blueprintSettings.tileConfig.isCell = false;
                        }
                        contentObj.blueprintSettings.tileConfig.propertyFields = contentObj.blueprintSettings.tileConfig.propertyFields || [];
                        contentObj.blueprintSettings.tileConfig.indicators = contentObj.blueprintSettings.tileConfig.indicators || [];
                        contentObj.blueprintSettings.tileConfig.commands = contentObj.blueprintSettings.tileConfig.commands || [];
                    }
                    if (!contentObj.blueprintSettings.gridConfig) {
                        contentObj.blueprintSettings.gridConfig = { 'columnDefs': [] };
                    }
                    if (!contentObj.blueprintSettings.pagingOptions && !contentObj.blueprintSettings.serverSidePagination) {
                        contentObj.blueprintSettings.pagingOptions = {
                            'pageSizes': [
                                5,
                                10,
                                25,
                                100,
                                250,
                                500
                            ],
                            'pageSize': 10,
                            'currentPage': 1
                        };
                    }
                    contentObj.blueprintSettings.tagField = contentObj.blueprintSettings.tagField || '';
                    contentObj.blueprintSettings.filterBarOptions = contentObj.blueprintSettings.filterBarOptions || 'sqgf';
                    contentObj.blueprintSettings.filterFields = contentObj.blueprintSettings.filterFields || [];
                    if (!contentObj.blueprintSettings.filterOptions) {
                        contentObj.blueprintSettings.filterOptions = {
                            'showDefaultClause': false,
                            'showMatchCase': false,
                            'allowedOperators': '',
                            'groupEnabled': false
                        };
                    }
                    if (contentObj.blueprintSettings.filterEnabled === undefined) {
                        contentObj.blueprintSettings.filterEnabled = false;
                    }
                    if (contentObj.blueprintSettings.tagsManager === undefined) {
                        contentObj.blueprintSettings.tagsManager = true;
                    }
                }
                if (contentObj.multiplicity !== 'auditTrail' && !contentObj.blueprintSettings.gridConfig.columnDefs.length) {
                    contentObj.blueprintSettings.gridConfig.columnDefs = this.getMigratedGridConfig(contentObj);
                }
                return contentObj.blueprintSettings;
            };
            MigrationService.prototype.getMigratedGridConfig = function (contentObj) {
                var properties = contentObj.properties;
                var columnDefs = [];
                properties.forEach(function (property, index) {
                    columnDefs.push({ 'field': property.name, 'displayName': property.label, visible: true, 'type': property.type });
                });
                return columnDefs;
            };
            MigrationService.prototype.migrateAction = function (actionObj) {
                var serviceScope = this;
                if (!actionObj.hasOwnProperty('params') || typeof actionObj.params === 'string') {
                    actionObj.params = {};
                }
                if (actionObj.hasOwnProperty('authorizationCmd')) {
                    delete actionObj.authorizationCmd;
                }
                if (!actionObj.hasOwnProperty('main')) {
                    actionObj.main = false;
                }
                if (actionObj.behavior.commandRef && actionObj.behavior.commandRef.command) {
                    actionObj.behavior.commandRef.app = this.appName;
                    if (!actionObj.behavior.hasOwnProperty('onExit')) {
                        actionObj.behavior.onExit = {};
                    }
                    actionObj.behavior.onExit.key = actionObj.behavior.onExit.key || 'Id';
                    actionObj.behavior.onExit.refreshAndSelectContents = actionObj.behavior.onExit.refreshAndSelectContents || [];
                    if (actionObj.behavior.type === 'command') {
                        actionObj.behavior.shortTitle = actionObj.behavior.shortTitle || actionObj.behavior.commandRef.command;
                    }
                    actionObj.behavior.fields.forEach(function (field) {
                        if (field.parameterRef) {
                            field.parameterRef.app = serviceScope.appName;
                        }
                        if (!field.hasOwnProperty('useEntityPicker')) {
                            field.useEntityPicker = false;
                        }
                        if (!field.hasOwnProperty('readOnly')) {
                            field.readOnly = false;
                        }
                        if (!field.hasOwnProperty('values')) {
                            field.values = [];
                        }
                        if (!field.hasOwnProperty('validation') && !field.hidden) {
                            field.validation = {};
                        }
                        if (field.hasOwnProperty('entityRef')) {
                            field.entityRef.app = serviceScope.appName;
                        }
                        if (field.hasOwnProperty('description')) {
                            delete field.description;
                        }
                        if (field.hasOwnProperty('isList')) {
                            delete field.isList;
                        }
                        if (typeof (field.type) === 'object') {
                            field.type = {};
                        }
                        if (!field.inputMode) {
                            var fieldType;
                            if ((field.hasOwnProperty('entityRef') && field.entityRef.entity) || typeof (field.type) === 'object') {
                                fieldType = 'object';
                            }
                            else if (field.values && field.values.length > 0) {
                                fieldType = 'enum';
                            }
                            else if (typeof (field.type) === 'string') {
                                fieldType = field.type.toLowerCase();
                            }
                            field.inputMode = serviceScope.getDefaultInputMode(fieldType);
                        }
                    });
                }
                if (actionObj.behavior.type === 'command' && !actionObj.behavior.hasOwnProperty('disableWhen')) {
                    actionObj.behavior.disableWhen = { 'expression': '' };
                }
                if ((actionObj.behavior.type === 'command' || actionObj.behavior.type === 'view') && !actionObj.behavior.blueprint) {
                    actionObj.behavior.sidePanelMode = actionObj.behavior.sidePanelMode || 'large';
                }
                if (actionObj.behavior.entityRef) {
                    actionObj.behavior.entityRef.app = this.appName;
                }
                else if (actionObj.behavior.readingFunctionRef) {
                    actionObj.behavior.readingFunctionRef.app = this.appName;
                }
                return actionObj;
            };
            MigrationService.prototype.getDefaultInputMode = function (type) {
                switch (type) {
                    case 'int16':
                    case 'int32':
                    case 'int':
                    case 'int64':
                    case 'decimal':
                    case 'byte':
                    case 'number': {
                        return 'numeric';
                    }
                    case 'boolean': {
                        return 'checkbox';
                    }
                    case 'datetimeoffset':
                    case 'datetime': {
                        return 'dateTimePicker';
                    }
                    case 'timespan': {
                        return 'timePicker';
                    }
                    case 'string':
                    case 'guid': {
                        return 'inputText';
                    }
                    case 'object': {
                        return 'queryResult';
                    }
                    case 'enum': {
                        return 'enum';
                    }
                    case 'blob': {
                        return 'fileUploader';
                    }
                    default: {
                        return 'inputText';
                    }
                }
            };
            return MigrationService;
        }());
        framework.MigrationService = MigrationService;
        angular.module('siemens.simaticit.common.services.modelDriven')
            .service('common.services.modelDriven.migrationService', MigrationService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=migrationService.js.map
/* This module should be added to the framework */
(function () {
    'use strict';
    /**
  * @ngdoc service
  * @name common.services.modelDriven.runtimeService
  * @module siemens.simaticit.common.services.modelDriven
  * @access public
  * @description
  * The service provide access to the ModelViewCtrl class/constructor used by status layout template (NOTE:not for actions)
  * ModelViewCtrl provides:
  *     - configuration for standard template contents (e.g.contents[<content name>].runtimeConf)
  *     - data for standard template contents (e.g.contents[<content name>].runtimeData)
  *     - Automation object for contents and commandBar
  *
  */
    angular.module('siemens.simaticit.common.services.modelDriven')
        .service('common.services.modelDriven.runtimeService', [
            '$q',
            'common.services.modelDriven.service',
            'common.services.modelDriven.contextService',
            'common.services.modelDriven.dataService',
            'filterFilter',
            '$parse',
            '$state',
            '$timeout',
            '$translate',
            'common.base',
            '$rootScope',
            'common.widgets.busyIndicator.service',
            '$filter',
            'common.widgets.messageOverlay.service',
            'common.mduiBreadcrumb.breadcrumbService',
            function ($q, md, mdContextSrv, multiDataService, filterFilter, $parse, $state, $timeout, $translate, base, $rootScope,
                busyService, $filter, overlayService, breadcrumbService) {
                var backendService = base.services.runtime.backendService;

                function getEvaluatedReadingFunctionParams(params) {
                    var evaluatedParams = {};
                    if (Object.keys(params).length > 0) {
                        for (var param in params) {
                            if (params[param]) {
                                evaluatedParams[param] = mdContextSrv.parseWithStateCtx(params[param]);
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

                /**
                * @ngdoc method
                * @name common.services.modelDriven.runtimeService#ModelViewCtrl
                * @access public
                * @module siemens.simaticit.common.services.modelDriven
                * @param {object} screen A MD manifest status descriptor
                * @param {object} confDataRepository An empty object for contents runtimeData and runtimeConf
                * @param {object} viewStateParam (optional) The current $stateParams
                * @returns {object} A ModelViewCtrl with access to the contents automation api (refresh/clear)
                * @description
                * Used by screen template controller the ModelViewCtrl constructor provides both configuration data
                * and automation APIs for current screen
                */
                this.ModelViewCtrl = function (screenData, confDataRepository, viewStateParam) {
                    var screen = {};
                    angular.copy(screenData, screen);
                    var self = this, contentName = null, commandBarData = null, applName = screen.appName, parkConf = {},
                        parkExtraConf = {}, runtimeContextRepository = { contents: {}, params: viewStateParam }, i = 0,
                        newFields = ["sortInfo", "groupFields", "quickSearchOptions", "tileConfig", "gridConfig"], actionGroupsData = [];
                    var isExtended = false, extensionId;
                    if (typeof confDataRepository !== "object" || confDataRepository === null) {
                        return null;
                    }

                    if (md.getCurrentModuleInfo(screenData.id).actionGroups) {
                        actionGroupsData = md.getCurrentModuleInfo(screenData.id).actionGroups
                    }

                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#getMasterContentNames
                    * @access public
                    * @module siemens.simaticit.common.services.modelDriven
                    * @returns {string|Array} An array with all master content names.
                    * @description Get current screen master content names
                    */
                    self.getMasterContentNames = function () {
                        if (screen && screen.contents) {
                            return Object.getOwnPropertyNames(screen.contents).filter(function (contentName) {
                                return screen.contents[contentName].master;
                            });
                        }
                        return [];
                    };

                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#getMasterContentNames
                    * @access public
                    * @module siemens.simaticit.common.services.modelDriven
                    * @param {string} contentName The active content name
                    * @description Context switch (used by masterDetail template when a details tab become active)
                    */
                    self.setActiveContent = function (contentName) {
                        if (runtimeContextRepository["activeContent"] !== contentName) {
                            runtimeContextRepository["activeContent"] = contentName;
                        }
                    }

                    self.setBreadCrumbChain = function (destination, srcMasterId) {
                        var sourceScreen = getSourceScreenInfo(srcMasterId);
                        var destScreen = getDestStateInfo(destination);
                        var chain = breadcrumbService.getBreadcrumbChain();
                        if (!chain.length) {
                            sourceScreen.itemIndex = 0;
                            destScreen.itemIndex = 1;
                            chain.push(sourceScreen);
                            chain.push(destScreen);
                        } else if (chain[chain.length - 1].name === sourceScreen.name && destScreen.name) {
                            chain[chain.length - 1].title = sourceScreen.title;
                            chain[chain.length - 1].masterId = sourceScreen.masterId;
                            destScreen.itemIndex = chain.length;
                            chain.push(destScreen);
                        }
                        mdContextSrv.setBreadCrumbChain(chain);
                    }

                    function onDrillDownCommandClick(item, contentName, command) {
                        var paramValue;
                        var obj = {};
                        if (item && item.Id) {
                            runtimeContextRepository.contents[contentName].selectedItem = item;
                            if (command.drillDownParams) {
                                Object.getOwnPropertyNames(command.drillDownParams).forEach(function (name) {
                                    paramValue = mdContextSrv.parseWithStateCtx(command.drillDownParams[name]);
                                    obj[name] = paramValue;
                                });
                            }
                            mdContextSrv.setPropertyPanelState(false, null);
                            if (typeof self[contentName].onOpenClick === 'function') {
                                self[contentName].onOpenClick(item, command.destination, obj);
                            }
                        }
                    }

                    function addDrillDownCommandToColumn(columns, command, contentName) {
                        if (!command || !columns) {
                            return columns;
                        }
                        if (command.type === 'drill-down') {
                            //attach the on click callback
                            command.onClick = function (row) {
                                onDrillDownCommandClick(row, contentName, command);
                            }
                            //index to be considered later in cased of multiple commands
                            command.fieldName = columns[0].field;

                            columns[0].cellTemplate = '<sit-grid-command ng-class="col.colIndex()" sit-row="row" sit-options="col.colDef.options"></sit-grid-command>';
                            columns[0].options = command;
                        }
                        return columns;
                    }

                    function migrateCommand(command) {
                        if (!command) {
                            return command;
                        }
                        if (command.hasOwnProperty('cmdIcon')) {
                            command.img = 'svg cmd' + command.cmdIcon + '24';
                        }
                        return command;
                    }

                    function addCommandToColumn(gridConfig, contentName) {
                        var commands = gridConfig.commands;
                        var columns = gridConfig.columnDefs;
                        if (!commands || !columns) {
                            return columns;
                        }
                        if (commands.length > 0) {
                            commands.forEach(function (command, index) {
                                command.tooltip = $translate.instant(command.tooltip) || command.tooltip;
                                command = migrateCommand(command);
                                columns = addDrillDownCommandToColumn(columns, command, contentName);
                            });
                        }
                        return columns;
                    }

                    function getGridCommands(blueprintSettings) {
                        var commands = [];
                        if (!blueprintSettings.gridConfig || !blueprintSettings.tileConfig) {
                            return commands;
                        }
                        commands = blueprintSettings.gridConfig.commands || [];
                        var tileCommands = blueprintSettings.tileConfig.commands || [];
                        if (blueprintSettings.viewOptions === 'gm') {
                            commands = tileCommands;
                        }
                        return commands;
                    }

                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#createExtraICVGridConf
                    * @access internal
                    * @module siemens.simaticit.common.services.modelDriven
                    * @param {object|Array} properties A MD content.properties manifest field
                    * @param {object} blueprintSettings (optional) ICV tile additional configuration
                    * @returns {object} An object with ICV/Grid conf info: sortInfo, groupFields, quickSearchOptions, tileConfig e gridConfig
                    * @description Context switch (used by masterDetail template when a details tab become active)
                    */
                    function createExtraICVGridConf(contentName, properties, blueprintSettings) {
                        // Inspect content properties to complete ICV configuration
                        var quickSearchOptions, groupFields, sortInfo, gridConfig, tileConfig;
                        properties.forEach(function (p) {
                            var prop = p, name = p.name, displayName = $translate.instant(prop.label) || p.name, propProps = Object.getOwnPropertyNames(prop);
                            if (prop.type && prop.type.length > 0) {
                                prop.type = prop.type.toLowerCase();
                            }
                            if (!gridConfig) {
                                gridConfig = { columnDefs: [] };
                            }
                            if (prop.type === 'number') {
                                gridConfig.columnDefs.push({ field: name, displayName: displayName, cellFilter: 'number' });
                            }
                            else if (prop.type === 'boolean') {
                                gridConfig.columnDefs.push(
                                    {
                                        field: name, displayName: displayName,
                                        cellTemplate: '<sit-mdtoggle ng-disabled="true" sit-value="row.getProperty(\'' + name + '\') === null ? false : row.getProperty(\'' + name + '\')" ></sit-mdtoggle>'
                                    }
                                );
                            } else if (prop.type === 'datetimeoffset' || prop.type === 'datetime') {
                                gridConfig.columnDefs.push({ field: name, displayName: displayName, cellFilter: 'date:\'medium\'' });
                            }
                            else {
                                gridConfig.columnDefs.push({ field: name, displayName: displayName });
                            }
                            propProps.forEach(function (attr) {
                                switch (attr) {
                                    case 'sortable':
                                        var sortDirection = 'asc';
                                        var defaultSortField;
                                        if (prop[attr]) { //is a boolean
                                            if (blueprintSettings) {
                                                sortDirection = blueprintSettings.sortingDirection;
                                                defaultSortField = blueprintSettings.defaultSortingField;
                                            }
                                            if (!sortInfo) {
                                                sortInfo = {
                                                    field: defaultSortField || name,
                                                    direction: sortDirection || 'asc',
                                                    fields: []
                                                };
                                            }
                                            
                                            if (name === defaultSortField) sortInfo.fields.unshift({ field: name, displayName: displayName });
                                            else sortInfo.fields.push({ field: name, displayName: displayName });
                                        }
                                        break;
                                    case 'groupable':
                                        if (prop[attr]) { //is a boolean
                                            if (!groupFields) {
                                                groupFields = [];
                                            }
                                            groupFields.push({ field: name, displayName: displayName });
                                        }
                                        break;
                                    case 'searchable':
                                        if (prop[attr]) { //is a boolean
                                            quickSearchOptions = { enabled: true, field: name };
                                        }
                                        break;
                                    case 'isTitle':
                                    case 'isDescription':
                                        if (!tileConfig) {
                                            tileConfig = {};
                                        }
                                        tileConfig[attr + 'Field'] = name;
                                        break;
                                }
                            });
                        });
                        if (blueprintSettings && blueprintSettings.tileConfig) {
                            if (!tileConfig) {
                                tileConfig = {};
                            }
                            if (blueprintSettings.tileConfig.titleField) {
                                tileConfig["titleField"] = blueprintSettings.tileConfig.titleField;
                            }
                            if (blueprintSettings.tileConfig.descriptionField) {
                                tileConfig["descriptionField"] = blueprintSettings.tileConfig.descriptionField;
                            }
                            if (blueprintSettings.tileConfig.propertyFields) {
                                blueprintSettings.tileConfig.propertyFields.forEach(function (propField) {
                                    if (propField.displayName) {
                                        propField.displayName = $translate.instant(propField.displayName);
                                    }
                                    if (propField.visible && propField.visible.body && propField.visible.body.length > 1) {
                                        propField.visible = generateTileVisibilityCallBackMethod(propField.visible.body);
                                    } else if (propField.visible && propField.visible.expression && propField.visible.expression.length > 1) {
                                        propField.visible = propField.visible.expression;
                                    } else {
                                        propField.visible = true;
                                    }
                                });
                                tileConfig["propertyFields"] = blueprintSettings.tileConfig.propertyFields;
                            }
                            else {
                                tileConfig["propertyFields"] = [];
                            }
                            if (blueprintSettings.tileConfig.indicators && blueprintSettings.tileConfig.indicators.length > 0) {
                                blueprintSettings.tileConfig.indicators.forEach(function (indicator) {
                                    getUpdatedWidgetConfig(indicator, indicator.svgIcon);
                                    if (indicator.visible.body && indicator.visible.body.length > 1) {
                                        indicator.visible = generateTileVisibilityCallBackMethod(indicator.visible.body);
                                    }
                                    else if (indicator.visible.expression && indicator.visible.expression.length > 1) {
                                        indicator.visible = indicator.visible.expression;
                                    }
                                });
                                tileConfig["indicators"] = blueprintSettings.tileConfig.indicators;
                            }
                            if (blueprintSettings.tileConfig.isCell !== undefined) {
                                tileConfig["isCell"] = blueprintSettings.tileConfig.isCell;
                            }
                            //tile commands
                            if (blueprintSettings.tileConfig.commands && blueprintSettings.tileConfig.commands.length > 0) {
                                tileConfig["commands"] = [];
                                blueprintSettings.tileConfig.commands.forEach(function (command) {
                                    if (command.tooltip) {
                                        command.tooltip = $translate.instant(command.tooltip);
                                    }

                                    if (command.img && command.img.indexOf('svg ') !== -1) {
                                        var svgIcon = command.img.slice(4);
                                        svgIcon = svgIcon.substring(3, svgIcon.length - 2);
                                        command.cmdIcon = svgIcon;
                                    }

                                    if (command.visible.body && command.visible.body.length > 1) {
                                        command.visible = generateTileVisibilityCallBackMethod(command.visible.body);
                                    }
                                    else if (command.visible.expression && command.visible.expression.length > 1) {
                                        command.visible = command.visible.expression;
                                    } else {
                                        command.visible = true;
                                    }

                                    if (command.type === "drill-down") {
                                        command.onClick = function (tileContent) {
                                            onDrillDownCommandClick(tileContent, contentName, command);
                                        }
                                    } else {
                                        //TBD: Support for custom onClick callback
                                        command.onClick = function () { }
                                    }
                                    tileConfig.commands.push(command);
                                });
                            }
                        }
                        if (blueprintSettings && blueprintSettings.tagField) {
                            if (blueprintSettings.tagField.displayName) {
                                blueprintSettings.tagField.displayName = $translate.instant(blueprintSettings.tagField.displayName);
                            }
                        }
                        if (blueprintSettings && blueprintSettings.gridConfig) {
                            gridConfig = blueprintSettings.gridConfig;
                            gridConfig.commands = getGridCommands(blueprintSettings);
                            if (gridConfig.columnDefs) {
                                for (var i = 0; i < gridConfig.columnDefs.length; i++) {
                                    properties.forEach(function (property) {
                                        if (property.type && property.type.length > 0) {
                                            property.type = property.type.toLowerCase();
                                        }
                                        if (gridConfig.columnDefs[i].field === property.name) {
                                            gridConfig.columnDefs[i].displayName = $translate.instant(gridConfig.columnDefs[i].displayName);
                                            if (property.type === 'boolean') {
                                                gridConfig.columnDefs[i].cellTemplate = '<sit-mdtoggle ng-disabled="true" sit-value="row.getProperty(\'' + property.name + '\') === null ? false : row.getProperty(\'' + property.name + '\')" >'
                                                    + '</sit-mdtoggle>';
                                            }
                                            if (property.type === 'number') {
                                                gridConfig.columnDefs[i].cellFilter = 'number';
                                            } else if (property.type === 'datetimeoffset' || property.type === 'datetime') {
                                                gridConfig.columnDefs[i].cellFilter = 'date:\'medium\'';
                                            }
                                            gridConfig.columnDefs[i].sortable = typeof property.sortable === 'boolean' ? property.sortable : false;
                                        }
                                    });
                                }
                                gridConfig.columnDefs = addCommandToColumn(gridConfig, contentName);
                            }
                        }
                        return {
                            sortInfo: sortInfo,
                            groupFields: groupFields,
                            quickSearchOptions: quickSearchOptions,
                            tileConfig: tileConfig,
                            gridConfig: gridConfig
                        };
                    }

                    function generateTileVisibilityCallBackMethod(functionBody) {
                        if (functionBody) {
                            var fn = 'return function (tileContent) {' + functionBody + '};';
                            var defFunction = new Function(fn)(); //NOSONAR
                            return defFunction;
                        } else {
                            return functionBody;
                        }
                    }

                    function getUserPrefId(cntName) {
                        var userPrefId = cntName;
                        try {
                            var lastIndex = screen.id.indexOf('.');
                            var screenId = screen.id.substring(lastIndex + 1);
                            userPrefId = screenId + '_' + cntName;
                        } catch (error) {
                            return userPrefId;
                        }
                        return userPrefId;
                    }

                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#ensureSidepanelVisibility
                   * @access internal
                   * @module siemens.simaticit.common.services.modelDriven
                   * @description Manages the property mode sidepanels visibility
                   */
                    var ensureSidepanelVisibility = _.debounce(function () {
                        $timeout(function () {
                            var sidepanelState = mdContextSrv.getPropertyPanelState();
                            var isSidepanelShown = evalSidepanelVisibility(sidepanelState);
                            if (sidepanelState.isSidepanelOpen && !isSidepanelShown) {
                                mdContextSrv.setPropertyPanelState(false, null);
                                $state.go('^');
                            }
                        }, 200);
                    }, 200, true);

                    function getContentDataArtifact(content) {
                        var dataArtifact = null;
                        if (content.entityRef && content.entityRef.entity) {
                            dataArtifact = content.entityRef.entity;
                        }
                        else if (content.readingFunctionRef && content.readingFunctionRef.functionName) {
                            dataArtifact = content.readingFunctionRef.functionName;
                        }
                        return dataArtifact;
                    }

                    function isReadingFunctionContent(content) {
                        var isReadingFunction = false;
                        if (content.readingFunctionRef && content.readingFunctionRef.functionName) {
                            isReadingFunction = true;
                        }
                        return isReadingFunction;
                    }

                    /**
                   * @ngdoc method
                    * @name ModelViewCtrl#initICVGridConf
                    * @access internal
                    * @module siemens.simaticit.common.services.modelDriven
                    * @param {string} cntName The content name
                    * @returns {object} An object with ICV/Grid initial conf info
                    * @description Init contents runtimeConf and selection callback for status context update
                    */
                    function initICVGridConf(cntName, isMaster, selectionMode) {
                        var uniqueUserPrefId = getUserPrefId(cntName);
                        var id = isMaster ? 'masterList' : 'detailList';
                        var icon;
                        var localConf = {
                            selectionMode: selectionMode,
                            containerID: id,
                            viewOptions: 'c',
                            viewMode: 'c',
                            uniqueID: 'Id',
                            userPrefId: uniqueUserPrefId,
                            tagsManager: true,
                            onSelectionChangeCallback: function (items, item) {
                                runtimeContextRepository.contents[cntName].selectedItemsCount = items.length;
                                if (selectionMode === 'multi') {
                                    runtimeContextRepository.contents[cntName].selectedItems = items;
                                }
                                //asynch
                                if (item && item.selected === true) {
                                    runtimeContextRepository.contents[cntName].selectedItem = item;
                                    $rootScope.$broadcast('mdui-icv-item-selected');
                                } else if (item !== null) {
                                    if (selectionMode === 'multi') {
                                        var selectedItems = runtimeContextRepository.contents[cntName].selectedItems;
                                        runtimeContextRepository.contents[cntName].selectedItem = selectedItems[selectedItems.length - 1];
                                    } else {
                                        runtimeContextRepository.contents[cntName].selectedItem = undefined;
                                    }
                                }
                                if (item) {
                                    $rootScope.$broadcast('mdui-icv-item-changed', { 'selected': item.selected, 'item': item });
                                }
                                if (self[cntName].onContentSelection) { //bubble the event for template notification (e.g. details or toolbar refresh)
                                    self[cntName].onContentSelection(items, item);
                                }

                                //manager property mode sidepanel's open/close state
                                var isSidepanelOpen = mdContextSrv.getPropertyPanelState().isSidepanelOpen;
                                if (isSidepanelOpen) {
                                    ensureSidepanelVisibility();
                                }
                            }
                        };
                        if (screen.contents[cntName].blueprintSettings && screen.contents[cntName].blueprintSettings.image) {
                            icon = screen.contents[cntName].blueprintSettings.image;
                        } else {
                            icon = screen.icon;
                        }
                        getUpdatedWidgetConfig(localConf, icon);
                        if (screen.contents[cntName].blueprintSettings) { // add not 'tile' info to the runtimeConf
                            for (var opt in screen.contents[cntName].blueprintSettings) {
                                if (screen.contents[cntName].blueprintSettings.hasOwnProperty(opt) && opt !== "tileConfig") { //tileconfig is handled later
                                    localConf[opt] = screen.contents[cntName].blueprintSettings[opt]; //other property are added 'blindly'
                                }
                                //for selecting user specified uniqueID
                                if (opt === "uniqueID" && screen.contents[cntName].blueprintSettings[opt]) {
                                    localConf.uniqueID = screen.contents[cntName].blueprintSettings[opt];
                                }
                                if (opt === "serverSidePagination" && screen.contents[cntName].blueprintSettings[opt]) {
                                    var dataArtifact = null;
                                    dataArtifact = getContentDataArtifact(screen.contents[cntName]);
                                    if (screen.contents[cntName].master) { //to prevent default loading of detail content's serverSide ICV
                                        var query = mdContextSrv.interpolateQuery(screen.contents[cntName].query, null);
                                        localConf.serverDataOptions = {
                                            dataService: self[cntName],
                                            dataEntity: dataArtifact,
                                            appName: screen.appName,
                                            optionsString: query
                                        };
                                    }
                                }
                                if (opt === "filterFields") {
                                    screen.contents[cntName].blueprintSettings[opt].forEach(function (value) {
                                        value.allowedCompareOperators = getMigratedOperators(value.allowedCompareOperators);
                                        value.displayName = $translate.instant(value.displayName);
                                        value.dataService = backendService;
                                        value.appName = screen.appName;
                                        if (!value.dataSource.selectedEntity.name) {
                                            value.dataSource = {};
                                        }
                                        else {
                                            var swap = value.dataSource.valueProperty;
                                            value.dataSource.valueProperty = value.dataSource.displayProperty;
                                            value.dataSource.displayProperty = swap;
                                        }
                                    });
                                }
                                if (true === localConf.tagsManager && screen.contents[cntName].entityRef && screen.contents[cntName].entityRef.entity) {
                                    localConf.tagsManagerOptions = {
                                        entityName: screen.contents[cntName].entityRef.entity,
                                        appName: screen.appName
                                    }
                                }
                                if (screen.contents[cntName].readingFunctionRef) {
                                    localConf.tagsManager = false;
                                }
                            }
                        }
                        return localConf;
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
                    /**
                   * @ngdoc method
                   * @name ModelViewCtrl#evalSidepanelVisibility
                   * @access internal
                   * @module siemens.simaticit.common.services.modelDriven
                   * @param {object} sidepanelState Current sidepanel state
                   * @description Evaluates expression/function for managing the sidepanel visibility
                   * @returns {Boolean} Result of expression/function body evaluation.
                   */
                    function evalSidepanelVisibility(sidepanelState) {
                        if (!sidepanelState.show) {
                            return true;
                        }
                        if (sidepanelState.show.expression) {
                            return mdContextSrv.parseWithStateCtx(sidepanelState.show.expression);
                        }
                        else if (sidepanelState.show.body) {
                            var evaluation = mdContextSrv.evalFunctionWithStateCtx(sidepanelState.show.body);
                            if (typeof evaluation === "object" && evaluation !== null && typeof evaluation.then === "function") {
                                evaluation.then(function (outcome) {
                                    return outcome;
                                });
                            }
                            else {
                                return evaluation;
                            }
                        }
                    }


                    function addExtendedFields(prop) {
                        isExtended = true;
                        extensionId = prop.id;
                        if (prop.blueprintSettings && prop.blueprintSettings.gridConfig && prop.blueprintSettings.gridConfig.columnDefs) {
                            mapFieldsToGridConfig(prop.blueprintSettings.gridConfig, prop.properties);
                            prop.blueprintSettings.gridConfig.columnDefs.forEach(addFieldRuntimeConf, { confDataRepository: confDataRepository, contentName: contentName });
                        } else {
                            prop.properties.forEach(addFieldRuntimeConf, { confDataRepository: confDataRepository, contentName: contentName });
                        }
                    }

                    function getPropVisibility(visible) {
                        var isVisible = true;
                        if (typeof visible === "boolean") {
                            return visible;
                        }
                        if (visible && visible.expression) {
                            isVisible = mdContextSrv.parseWithStateCtx(visible.expression);
                            return isVisible;
                        }
                        if (visible && visible.body) {
                            var evaluation = mdContextSrv.evalFunctionWithStateCtx(visible.body);
                            if (typeof evaluation === "object" && evaluation !== null && typeof evaluation.then === "function") {
                                evaluation.then(function (outcome) {
                                    isVisible = outcome;
                                });
                            }
                            else {
                                isVisible = evaluation;
                            }
                            return isVisible;
                        }
                        return isVisible;
                    }

                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#addFieldRuntimeConf
                    * @access internal
                    * @module siemens.simaticit.common.services.modelDriven
                    * @param {object} prop A valid md manifest content property object
                    * @description Init contents runtimeConf for property grid -> multiplicity one
                    */
                    function addFieldRuntimeConf(prop) {
                        if (prop.type && prop.type.length > 0) {
                            prop.type = prop.type.toLowerCase();
                        }
                        var isVisible = getPropVisibility(prop.visible);
                        confDataRepository.contents[contentName].runtimeConf.data.push({
                            "id": prop.name || prop.field,
                            "widget": prop.type !== 'boolean' ? "sit-label" : "sit-mdtoggle",
                            "disabled": true,
                            "visibilityLogic": prop.visible,
                            "invisible": !isVisible,
                            "isExtended": isExtended,
                            "extensionId": extensionId,
                            "label": (prop.label) ? $translate.instant(prop.label) : prop.name || $translate.instant(prop.displayName),
                            "dataType": prop.type,
                            "group": prop.group
                        });
                        if (!confDataRepository.contents[contentName].runtimeConf.showGroups && prop.group !== undefined) {
                            confDataRepository.contents[contentName].runtimeConf.showGroups = true;
                        }
                    }

                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#fillCmdBar
                    * @access internal
                    * @module siemens.simaticit.common.services.modelDriven
                    * @param {object} action A valid md manifest action object
                    * @description Add a command to the toolbar
                    */
                    function fillCmdBar(action) {
                        // Configure Action Handlers
                        var currDataService = null, content = contentName;
                        if (action.behavior.entityRef && action.behavior.entityRef.entity) { //navigation have no entity
                            currDataService = multiDataService[action.behavior.entityRef.entity]; // select correct dataProvider
                        } else if (action.behavior.readingFunctionRef && action.behavior.readingFunctionRef.functionName) { //navigation have no entity
                            currDataService = multiDataService[action.behavior.readingFunctionRef.functionName]; // select correct dataProvider
                        } else { //use current content entity
                            if (screen && contentName) {
                                if (screen.contents[contentName].entityRef && screen.contents[contentName].entityRef.entity) {
                                    currDataService = multiDataService[screen.contents[contentName].entityRef.entity];
                                } else if (screen.contents[contentName].readingFunctionRef && screen.contents[contentName].readingFunctionRef.functionName) {
                                    currDataService = multiDataService[screen.contents[contentName].readingFunctionRef.functionName];
                                }
                            }
                        }
                        //prepare a callback function
                        var btnCallback = function () {
                            var stateId = '', stateParams = {}, cmdParams = null;
                            var isSidepanelOpen = mdContextSrv.getPropertyPanelState().isSidepanelOpen;

                            if (isSidepanelOpen) {
                                stateId = $state.$current.parent.toString();
                            } else {
                                stateId = $state.$current.toString();
                            }

                            //smart navigation
                            if (action.behavior.type === 'navigation') {
                                stateParams = getEvaluatedStateParams(action.behavior.navigationParams);
                                mdContextSrv.setPropertyPanelState(false, null);
                                $state.go(action.behavior.destination, stateParams);
                                return;
                            }
                            if (action.behavior.type === 'drill-down') {
                                stateParams = getEvaluatedStateParams(action.behavior.navigationParams);
                                mdContextSrv.setPropertyPanelState(false, null);
                                if (self[content].onOpenClick && typeof self[content].onOpenClick === 'function') {
                                    var contextInfo = angular.copy(runtimeContextRepository.contents[content]);
                                    var item = contextInfo && contextInfo.selectedItem ? contextInfo.selectedItem : {};
                                    self[content].onOpenClick(item, action.behavior.destination, stateParams);
                                }
                            }
                            // action with state/form
                            if (action.behavior.type === "command" || action.behavior.type === "view") {
                                stateParams = getEvaluatedStateParams(action.params);
                                var redirectingState = stateId + '.' + action.id;
                                if ($state.$current.toString() !== redirectingState) {
                                    mdContextSrv.setPropertyPanelState(false, null);
                                }
                                $state.go(stateId + '.' + action.id, stateParams);
                                return;
                            }
                            // confirm/automatic-command action
                            if (action.behavior.type === "confirm" || action.behavior.type === 'automatic-command') {
                                if (action.behavior.commandRef) {
                                    cmdParams = mdContextSrv.prepareMethodParams(action.behavior.fields);
                                    //build command execution function
                                    var execute = function (showBusy) {
                                        hideOverlay();
                                        var outputParameters = cmdParams;
                                        isSidepanelOpen = mdContextSrv.getPropertyPanelState().isSidepanelOpen;
                                        if (showBusy) {
                                            busyService.show();
                                        }
                                        if (isSidepanelOpen) {
                                            mdContextSrv.setPropertyPanelState(false, null);
                                            $state.go('^');
                                        }
                                        currDataService[action.id](outputParameters, applName).then(function (outcome) {
                                            var vCtrl = null;
                                            if (outcome) {
                                                var onExit = action.behavior.onExit;
                                                var isValidOnExit = onExit && onExit.refreshAndSelectContents && onExit.refreshAndSelectContents.length > 0;
                                                if (isValidOnExit) {
                                                    vCtrl = mdContextSrv.getViewCtrl();
                                                    if (action.behavior.onExit.refreshContents) {
                                                        if (vCtrl) {
                                                            action.behavior.onExit.refreshContents.forEach(function (cntName) {
                                                                if (vCtrl[cntName]) {
                                                                    vCtrl[cntName].refresh();
                                                                }
                                                            });
                                                        }
                                                    }
                                                    else if (action.behavior.onExit.refreshAndSelectContents) {
                                                        if (vCtrl) {
                                                            //search for entity id
                                                            action.behavior.onExit.refreshAndSelectContents.forEach(function (cntName) {
                                                                if (vCtrl[cntName]) {
                                                                    if (outcome && outcome.id) {
                                                                        vCtrl[cntName].refreshAndSelect(outcome.id);
                                                                    } else {
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
                                                    if (showBusy) {
                                                        busyService.hide();
                                                    }
                                                }
                                                else {
                                                    if (showBusy) {
                                                        busyService.hide();
                                                    }
                                                    mdContextSrv.setPropertyPanelState(false, null);
                                                    $state.go(stateId, {}, { reload: true });
                                                }
                                            }
                                            else {
                                                if (showBusy) {
                                                    busyService.hide();
                                                }
                                            }
                                        }, backendService.backendError);
                                    };
                                    if (action.behavior.confirm) {
                                        var overlayButtons = function () {
                                            return [{
                                                id: 'yes',
                                                displayName: $translate.instant(action.behavior.confirmYes) || $translate.instant('common.yes'),
                                                onClickCallback: execute
                                            },
                                            {
                                                id: 'no',
                                                displayName: $translate.instant(action.behavior.confirmNo) || $translate.instant('common.no'),
                                                onClickCallback: hideOverlay
                                            }];
                                        }
                                        $rootScope.globalOverlayData.title = $translate.instant(action.behavior.confirmTitle) || $translate.instant('common.confirmation');
                                        $rootScope.globalOverlayData.text = mdContextSrv.translateString(action.behavior.confirm);
                                        $rootScope.globalOverlayData.buttons = overlayButtons();
                                        overlayService.show('globalMsgOverlayId');
                                    }
                                    else {
                                        execute(true);
                                    }
                                }
                            }

                            if (action.behavior.type === "reload") {
                                mdContextSrv.setPropertyPanelState(false, null);
                                $state.go(stateId, stateParams, { reload: true });
                                return;
                            }
                            return;
                        };
                        // Add action to Command Bar

                        var command = {
                            type: (action.main) ? 'MainCommand' : 'Command',
                            name: "",
                            label: $translate.instant(action.title),
                            tooltip: $translate.instant(action.tooltip) || $translate.instant(action.title),
                            //                  showLogic: action.showExpression, // custom attribute...
                            onClickCallback: btnCallback
                        };

                        getUpdatedWidgetConfig(command, action.icon);
                        if (action.behavior) {
                            if (action.behavior.commandRef) {
                                command.name = action.behavior.commandRef.command;
                                if (action.behavior.commandRef.fullName) {
                                    command.unauthorizedBehavior = 'hide';
                                    command.name = action.behavior.commandRef.fullName;
                                }
                                else {
                                    command.unauthorizedBehavior = 'hide';
                                }
                            }
                        }
                        if (command.name.length === 0) {
                            command.name = action.id;
                        }

                        if (action.show) {
                            if (action.show.expression) {
                                command["showLogic"] = action.show.expression;
                            }
                            else if (action.show.body) {
                                command["showLogicFunction"] = action.show.body;
                            }
                        } else if (action.showFunction) {
                            command["showLogicFunction"] = action.showFunction;
                        }

                        updateCommandBarData(commandBarData, action, command);
                    }

                    function updateCommandBarData(commandBarData, actionObj, commandObj) {
                        if (actionObj.group) {
                            var groupIndex = getGroupIndex(commandBarData.bar, actionObj.group);
                            if (groupIndex !== -1) {
                                commandBarData.bar[groupIndex].group.push(commandObj);
                            } else {
                                var groupObj = getActionGroupDetails(actionObj.group); //assuming the group exists
                                groupObj.type = 'Group';
                                groupObj.group = [];
                                groupObj.group.push(commandObj);
                                commandBarData.bar.push(groupObj);
                            }
                        } else {
                            commandBarData.bar.push(commandObj);
                        }
                    }

                    function getGroupIndex(commandBarData, groupName) {
                        var isGroupCreated = -1;
                        for (var i = 0; i < commandBarData.length; i++) {
                            if (commandBarData[i].name === groupName && commandBarData[i].type === 'Group') {
                                isGroupCreated = i;
                            }
                        }
                        return isGroupCreated;
                    }

                    function getActionGroupDetails(groupName) {
                        var groupInfo = {};
                        for (var i = 0; i < actionGroupsData.length; i++) {
                            if (actionGroupsData[i].name === groupName) {
                                groupInfo = actionGroupsData[i];
                                groupInfo.label = $translate.instant(groupInfo.label) || groupInfo.name;
                                getUpdatedWidgetConfig(groupInfo, groupInfo.icon);
                                break;
                            }
                        }
                        return groupInfo;
                    }

                    function hideOverlay() {
                        overlayService.hide();
                    }


                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#addNavigationFilter
                    * @access internal
                    * @module siemens.simaticit.common.services.modelDriven
                    * @param {string} query A valid oData query
                    * @param {object} navFilterObj The naviation params to be added
                    * @description Add navigation parameter to oData query
                    */
                    function checkIsFirstDetailContent(name, contents) {
                        var isFirstDetailContent = false;
                        var detailContents = [];
                        for (var content in contents) {
                            if (!contents[content].master) {
                                detailContents.push(contents[content]);
                            }
                        }
                        if (detailContents.length === 1) {
                            isFirstDetailContent = true;
                        } else if (detailContents.length > 1) {
                            detailContents.forEach(function (detailContent, index) {
                                if (name === detailContent.id && index === 0) {
                                    isFirstDetailContent = true;
                                }
                            });
                        }

                        return isFirstDetailContent;
                    }

                    function evalDisableTabs(contents, confDataRepository) {
                        var content = null;
                        var isFirstDetailContent = false;
                        if (contents) {
                            for (var name in contents) {
                                content = contents[name];
                                if (!content.master && content.disableWhen) {
                                    confDataRepository.contents[content.id].isDisabled = false;
                                    isFirstDetailContent = checkIsFirstDetailContent(content.id, contents);
                                    if (!isFirstDetailContent && content.disableWhen.expression) {
                                        confDataRepository.contents[content.id].isDisabled = mdContextSrv.parseWithStateCtx(content.disableWhen.expression);
                                    } else if (!isFirstDetailContent && content.disableWhen.body) {
                                        var evaluation = mdContextSrv.evalFunctionWithStateCtx(content.disableWhen.body);
                                        if (typeof evaluation === "object" && evaluation !== null && typeof evaluation.then === "function") {
                                            evaluation.then(function (outcome) {
                                                confDataRepository.contents[content.id].isDisabled = outcome;
                                            });
                                        }
                                        else {
                                            confDataRepository.contents[content.id].isDisabled = evaluation;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    self.evalDisableTabs = evalDisableTabs;

                    function refreshExtendedEntity(args) {
                        var retDef = $q.defer();
                        var applName = args.applName;
                        var extension = args.extension;
                        var name = args.contentName;
                        var isReadingFunction = false;
                        var dataService;
                        var filter = "";

                        //get the dataSvc api for the entity/reading function
                        if (extension.entityRef && extension.entityRef.entity) {
                            dataService = multiDataService[extension.entityRef.entity];
                        }
                        if (extension.readingFunctionRef && extension.readingFunctionRef.functionName) {
                            isReadingFunction = true;
                            dataService = multiDataService[extension.readingFunctionRef.functionName];
                        }
                        //evaluate the query
                        if (extension.query && !isReadingFunction) {
                            filter = extension.query;
                            filter = mdContextSrv.interpolateQuery(filter, null);
                        }
                        if (isReadingFunction && extension.readingFunctionRef.params) {
                            filter = getEvaluatedReadingFunctionParams(extension.readingFunctionRef.params);
                        }
                        if (!dataService) {
                            return asyncFunc(true);
                        }
                        dataService.getAll(filter, applName, screen.layoutTemplate).then(function (data) {
                            //asynch code
                            //reset selection ... of provide behavior conf
                            var parkData = null;
                            parkData = [];
                            if ((data) && (data.succeeded)) {
                                parkData = data.value;
                                //to set the context of base content with extended content
                                runtimeContextRepository.contents[name][extension.id] = parkData[0];
                            }
                            confDataRepository.contents[name].runtimeConf.data.forEach(function (dataField) {
                                if (dataField.isExtended && dataField.extensionId === extension.id) {
                                    var value = mdContextSrv.parseExpr(dataField.id, parkData[0]);
                                    if (dataField.dataType === 'datetime' || dataField.dataType === 'datetimeoffset') {
                                        dataField.value = $filter('date')(value, 'medium');
                                    } else {
                                        dataField.value = value;
                                    }
                                }
                            });
                            retDef.resolve();
                        });
                        return retDef.promise;
                    }

                    function refreshPropertyVisibility(contentName) {
                        confDataRepository.contents[contentName].runtimeConf.data.forEach(function (dataField) {
                            dataField.invisible = !getPropVisibility(dataField.visibilityLogic);
                        });
                    }

                    /**
                    * @ngdoc method
                    * @name ModelViewCtrl#createRunTimeAutomationObj
                    * @access internal
                    * @module siemens.simaticit.common.services.modelDriven
                    * @param {string} nameCont A content name
                    * @description Build content automation interface (refresh, refreshAndSelect, clear, onContentSelection)
                    */
                    function createRunTimeAutomationObj(nameCont) {
                        var content = screen.contents[nameCont], mdObj = self[nameCont];
                        var applName = "";
                        var detailsDataService;
                        var isReadingFunction = false;
                        applName = screen.appName;
                        if (content.entityRef && content.entityRef.entity) {
                            detailsDataService = multiDataService[content.entityRef.entity]; // Master data management
                        }
                        else if (content.readingFunctionRef && content.readingFunctionRef.functionName) {
                            isReadingFunction = true;
                            detailsDataService = multiDataService[content.readingFunctionRef.functionName];
                        }
                        mdObj.refresh = function (isFirstLoad) {
                            if (screen.contents[nameCont].multiplicity === 'custom') {
                                return;
                            }

                            var blueprintSettings = screen.contents[nameCont].blueprintSettings;
                            if (screen.contents[nameCont].multiplicity == 'many' && blueprintSettings && blueprintSettings.serverSidePagination) {
                                var param = confDataRepository.params && confDataRepository.params[nameCont] ? confDataRepository.params[nameCont] : null;
                                refreshServerSideICV(nameCont, param, isFirstLoad);
                                return;
                            }
                            var retDef = $q.defer();
                            /* obsolete ... params are added to the content query
                            if (content.params) {
                                navigationFilter = {};
                                content.params.forEach(function (navParName) {
                                    if (viewStateParam[navParName] && viewStateParam[navParName] !== null) {
                                        navigationFilter[navParName] = viewStateParam[navParName];
                                    }
                                });
                            }*/
                            (function (detailsObj, name) {
                                var filter, newMode = false, evaluatedParams;

                                if ('auditTrail' === detailsObj.multiplicity) {
                                    if (detailsObj.auditTrailRefId) {
                                        var auditTrailRefId = mdContextSrv.parseWithStateCtx(detailsObj.auditTrailRefId);
                                        confDataRepository.contents[name].runtimeConf.filter.EntityId = auditTrailRefId;
                                        if (undefined !== confDataRepository.contents[name].runtimeConf.config.refreshData) {
                                            confDataRepository.contents[name].runtimeConf.config.refreshData();
                                        }
                                    }
                                    retDef.resolve();
                                    return;
                                }
                                if (detailsObj.query && !isReadingFunction) {
                                    filter = detailsObj.query;
                                    filter = mdContextSrv.interpolateQuery(filter, null);
                                    newMode = true;
                                }
                                if (isReadingFunction && detailsObj.readingFunctionRef.params) {
                                    filter = getEvaluatedReadingFunctionParams(detailsObj.readingFunctionRef.params);
                                }

                                detailsDataService.getAll(filter, applName, screen.layoutTemplate).then(function (data) {
                                    //asynch code
                                    //reset selection ... of provide behavior conf
                                    var parkData = null, i = 0, selectedData = null, extensionRefreshPromise = [];
                                    if (runtimeContextRepository.contents[nameCont] && runtimeContextRepository.contents[nameCont].selectedItem) {


                                        parkData = runtimeContextRepository.contents[nameCont].selectedItem;
                                        runtimeContextRepository.contents[nameCont].selectedItem = undefined;
                                        parkData.selected = false;
                                        //force uniqueID deselection
                                        if (confDataRepository.contents[nameCont].runtimeConf.selectAll) {
                                            confDataRepository.contents[nameCont].runtimeConf.selectAll(false);
                                        }
                                        if (typeof self[nameCont].onContentSelection === 'function') {
                                            self[nameCont].onContentSelection(undefined, parkData);
                                        }
                                    }

                                    parkData = [];
                                    if ((data) && (data.succeeded)) {
                                        parkData = data.value;
                                    }
                                    if (confDataRepository.contents[name].blueprintSettings && (confDataRepository.contents[name].blueprintSettings.viewOptions === 'c'
                                        || confDataRepository.contents[name].blueprintSettings.viewOptions === 'm'
                                        || confDataRepository.contents[name].blueprintSettings.viewOptions === 'gm')) {
                                        confDataRepository.contents[name].properties.forEach(function (property) {
                                            var propType;
                                            if (typeof property.type === 'string') {
                                                propType = property.type.toLowerCase();
                                            } else if (typeof property.type === 'object') {
                                                propType = 'object';
                                            }
                                            var tileConfig = confDataRepository.contents[name].blueprintSettings.tileConfig;
                                            var isDateTimeField = false;
                                            if (tileConfig.titleField === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                isDateTimeField = true;
                                            }
                                            if (!isDateTimeField && tileConfig.descriptionField === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                isDateTimeField = true;
                                            }
                                            if (!isDateTimeField && tileConfig.propertyFields && tileConfig.propertyFields.length) {
                                                tileConfig.propertyFields.forEach(function (propertyField) {
                                                    if (propertyField.field === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                        isDateTimeField = true;
                                                    }
                                                });
                                            }
                                            if (isDateTimeField) {
                                                parkData.forEach(function (item) {
                                                    item[property.name] = $filter('date')(item[property.name], 'medium');
                                                });
                                            }
                                        });
                                    }
                                    if (confDataRepository.params && confDataRepository.params[nameCont]) {
                                        for (i = 0; i < parkData.length; i++) {
                                            if (parkData[i].Id && parkData[i].Id === confDataRepository.params[nameCont]) {
                                                parkData[i].selected = true;
                                                selectedData = parkData[i];
                                                break;
                                            }
                                        }
                                    }

                                    confDataRepository.contents[name].runtimeData = parkData;
                                    if (selectedData) {
                                        runtimeContextRepository.contents[nameCont].selectedItem = selectedData;
                                        runtimeContextRepository.contents[nameCont].selectedItemsCount = selectedData.length;
                                    }
                                    if (typeof self[nameCont].onContentSelection === 'function') {
                                        self[nameCont].onContentSelection(undefined, selectedData);
                                    }
                                    if (confDataRepository.contents[name].multiplicity === "one") {
                                        //replicate data on runtimeConf for pg support
                                        confDataRepository.contents[name].runtimeConf.data.forEach(function (dataField) {
                                            if (!dataField.isExtended) {
                                                var value = mdContextSrv.parseExpr(dataField.id, parkData[0]);
                                                if (dataField.dataType === 'datetime' || dataField.dataType === 'datetimeoffset') {
                                                    dataField.value = $filter('date')(value, 'medium');
                                                } else {
                                                    dataField.value = value;
                                                }
                                            }
                                        });
                                        //to set the context for content of multiplicty one
                                        runtimeContextRepository.contents[nameCont] = parkData[0];
                                        if (confDataRepository.contents[name].extensionRef) {
                                            confDataRepository.contents[name].extensionRef.forEach(function (extension) {
                                                var args = { applName: applName, extension: extension, contentName: name };
                                                extensionRefreshPromise.push(refreshExtendedEntity(args));
                                            });
                                        }
                                    }

                                    $q.all(extensionRefreshPromise).then(function () {
                                        // evaluate the visibilty condition for multiplicty one properties
                                        if (confDataRepository.contents[name].multiplicity === "one") {
                                            refreshPropertyVisibility(name);
                                        }
                                        retDef.resolve();
                                    });
                                });
                            })(content, nameCont);
                            return retDef.promise;
                        };
                        mdObj.refreshAndSelect = function (identifier) {
                            if (confDataRepository.params && confDataRepository.params[nameCont]) {
                                confDataRepository.params[nameCont] = null;
                            }

                            if (screen.contents[nameCont].multiplicity === 'custom') {
                                return;
                            }

                            var blueprintSettings = screen.contents[nameCont].blueprintSettings;
                            if (screen.contents[nameCont].multiplicity == 'many' && blueprintSettings && blueprintSettings.serverSidePagination) {
                                refreshServerSideICV(nameCont, identifier);
                                return;
                            }
                            var retDef = $q.defer();
                            /* obsolete ... params are added to the content query
                            if (content.params) {
                                navigationFilter = {};
                                content.params.forEach(function (navParName) {
                                    if (viewStateParam[navParName] && viewStateParam[navParName] !== null) {
                                        navigationFilter[navParName] = viewStateParam[navParName];
                                    }
                                });
                            } */
                            (function (detailsObj, name) {
                                var filter, newMode = false;

                                if ('auditTrail' === detailsObj.multiplicity) {
                                    if (detailsObj.auditTrailRefId) {
                                        var auditTrailRefId = mdContextSrv.parseWithStateCtx(detailsObj.auditTrailRefId);
                                        confDataRepository.contents[name].runtimeConf.filter.EntityId = auditTrailRefId;
                                        if (undefined !== confDataRepository.contents[name].runtimeConf.config.refreshData) {
                                            confDataRepository.contents[name].runtimeConf.config.refreshData();
                                        }
                                    }
                                    retDef.resolve();
                                    return;
                                }
                                if (detailsObj.query && !isReadingFunction) {
                                    filter = detailsObj.query;
                                    filter = mdContextSrv.interpolateQuery(filter, null);
                                    newMode = true;
                                }
                                if (isReadingFunction && detailsObj.readingFunctionRef.params) {
                                    filter = getEvaluatedReadingFunctionParams(detailsObj.readingFunctionRef.params);
                                }
                                detailsDataService.getAll(filter, applName, screen.layoutTemplate).then(function (data) {
                                    //asynch code
                                    //reset selection ... of provide behavior conf
                                    var parkData = null, i = 0, selectedData = null;
                                    if (runtimeContextRepository.contents[nameCont] && runtimeContextRepository.contents[nameCont].selectedItem) {
                                        parkData = runtimeContextRepository.contents[nameCont].selectedItem;
                                        runtimeContextRepository.contents[nameCont].selectedItem = undefined;
                                        parkData.selected = false;
                                        //force uniqueID deselection
                                        if (confDataRepository.contents[nameCont].runtimeConf.selectAll) {
                                            confDataRepository.contents[nameCont].runtimeConf.selectAll(false);
                                        }
                                    }
                                    parkData = [];
                                    if ((data) && (data.succeeded)) {
                                        parkData = data.value;
                                    }
                                    if (confDataRepository.contents[name].blueprintSettings
                                        && (confDataRepository.contents[name].blueprintSettings.viewOptions === 'c'
                                            || confDataRepository.contents[name].blueprintSettings.viewOptions === 'm'
                                            || confDataRepository.contents[name].blueprintSettings.viewOptions === 'gm')) {
                                        confDataRepository.contents[name].properties.forEach(function (property) {
                                            var propType;
                                            if (typeof property.type === 'string') {
                                                propType = property.type.toLowerCase();
                                            } else if (typeof property.type === 'object') {
                                                propType = 'object';
                                            }
                                            var tileConfig = confDataRepository.contents[name].blueprintSettings.tileConfig;
                                            var isDateTimeField = false;
                                            if (tileConfig.titleField === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                isDateTimeField = true;
                                            }
                                            if (!isDateTimeField && tileConfig.descriptionField === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                isDateTimeField = true;
                                            }
                                            if (!isDateTimeField && tileConfig.propertyFields && tileConfig.propertyFields.length) {
                                                tileConfig.propertyFields.forEach(function (propertyField) {
                                                    if (propertyField.field === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                        isDateTimeField = true;
                                                    }
                                                });
                                            }
                                            if (isDateTimeField) {
                                                parkData.forEach(function (item) {
                                                    item[property.name] = $filter('date')(item[property.name], 'medium');
                                                });
                                            }
                                        });
                                    }

                                    if (identifier && Array.isArray(identifier)) {
                                        var tempObj = {}, selectedItemsCount = 0;
                                        selectedData = [];
                                        identifier.forEach(function (item) {
                                            tempObj[item] = item;
                                        });
                                        for (i = 0; i < parkData.length; i++) {
                                            if (parkData[i].Id && tempObj[parkData[i].Id] !== undefined) {
                                                parkData[i].selected = true;
                                                selectedData.push(parkData[i]);
                                                selectedItemsCount += 1;
                                                if (identifier.length === selectedItemsCount) {
                                                    runtimeContextRepository.contents[nameCont].selectedItems = selectedData;
                                                    runtimeContextRepository.contents[nameCont].selectedItem = selectedData[selectedItemsCount - 1];
                                                    runtimeContextRepository.contents[nameCont].selectedItemsCount = selectedData.length;
                                                    break;
                                                }
                                            }
                                        }
                                    } else if (identifier) {
                                        for (i = 0; i < parkData.length; i++) {
                                            if (parkData[i].Id && parkData[i].Id === identifier) {
                                                parkData[i].selected = true;
                                                selectedData = parkData[i];
                                                runtimeContextRepository.contents[nameCont].selectedItem = selectedData;
                                                runtimeContextRepository.contents[nameCont].selectedItemsCount = 1;
                                                break;
                                            }
                                        }
                                    }
                                    confDataRepository.contents[name].runtimeData = parkData;
                                    if (typeof self[nameCont].onContentSelection === 'function') {
                                        self[nameCont].onContentSelection(undefined, selectedData);
                                    }
                                    if (confDataRepository.contents[name].multiplicity === "one") {
                                        //replicate data on runtimeConf for pg support
                                        confDataRepository.contents[name].runtimeConf.data.forEach(function (dataField) {
                                            dataField.value = mdContextSrv.parseExpr(dataField.id, parkData[0]);
                                        });
                                        refreshPropertyVisibility(name);
                                    }
                                    retDef.resolve();
                                });
                            })(content, nameCont);
                            return retDef.promise;
                        };
                        mdObj.clear = function () {
                            confDataRepository.contents[nameCont].runtimeData = [];
                            if (confDataRepository.contents[nameCont].multiplicity === "one") {
                                confDataRepository.contents[nameCont].runtimeConf.data.forEach(function (prop) {
                                    prop.value = "";
                                });
                                runtimeContextRepository.contents[nameCont] = null;
                                refreshPropertyVisibility(nameCont);
                            }
                            if ('auditTrail' === confDataRepository.contents[nameCont].multiplicity) {
                                confDataRepository.contents[nameCont].runtimeConf.filter.EntityId = '';
                            }
                        };
                        mdObj.onContentSelection = undefined;
                    }

                    //Constructor code
                    self['commandBars'] = []; //init command repository
                    //initialize conf and Data repository
                    confDataRepository["contents"] = {};
                    mdContextSrv.setContexInfo(runtimeContextRepository, viewStateParam, self); //update context service
                    for (var detailName in screen.contents) {
                        if (screen.contents.hasOwnProperty(detailName)) {
                            confDataRepository["contents"][detailName] = {};
                            runtimeContextRepository["contents"][detailName] = {};
                            //init with deep copy of content manifest info
                            angular.copy(screenData.contents[detailName], confDataRepository["contents"][detailName]);
                        }
                    }

                    //create serverside findAll apis
                    for (contentName in screen.contents) {
                        if (screen.contents[contentName].multiplicity === 'many' && screen.contents[contentName].blueprintSettings
                            && screen.contents[contentName].blueprintSettings.serverSidePagination) {
                            self[screen.contents[contentName].id] = {};
                            var isArchiving = screen.layoutTemplate === 'masterDetailsArchiving' || screen.layoutTemplate === 'singleEntityArchiving';
                            createFindAll(contentName, isArchiving);
                        }
                    }

                    //create contents configuration objects
                    for (contentName in screen.contents) {
                        if (screen.contents.hasOwnProperty(contentName)) {
                            if (screen.contents[contentName].multiplicity === "many") {
                                runtimeContextRepository.contents[contentName].selectedItem = null;
                                runtimeContextRepository.contents[contentName].selectedItemsCount = 0;
                                runtimeContextRepository.contents[contentName].selectedItems = [];
                                var selectionMode = 'single';
                                if (screen.contents[contentName].enableMultiSelection) {
                                    selectionMode = 'multi';
                                }
                                parkConf = initICVGridConf(contentName, screen.contents[contentName].master, selectionMode);
                                if (screen.contents[contentName].blueprintSettings) {
                                    parkExtraConf = createExtraICVGridConf(contentName, screen.contents[contentName].properties, screen.contents[contentName].blueprintSettings);
                                }
                                else {
                                    parkExtraConf = createExtraICVGridConf(contentName, screen.contents[contentName].properties, null);
                                }
                                for (i = 0; i < newFields.length; i++) {
                                    if (parkExtraConf[newFields[i]]) {
                                        parkConf[newFields[i]] = parkExtraConf[newFields[i]];
                                    }
                                }
                                confDataRepository.contents[contentName].runtimeConf = parkConf;
                            }
                            else if (screen.contents[contentName].multiplicity === "one") {
                                runtimeContextRepository.contents[contentName] = null;
                                var layoutSettings = {};
                                isExtended = false;
                                extensionId = null;
                                if (screen.contents[contentName].blueprintSettings && screen.contents[contentName].blueprintSettings.layoutSettings) {
                                    layoutSettings = screen.contents[contentName].blueprintSettings.layoutSettings;
                                }
                                confDataRepository.contents[contentName].runtimeConf = {
                                    'layout': 'Horizontal',
                                    'type': layoutSettings.type || 'Fixed',
                                    'mode': 'list',
                                    'columns': layoutSettings.columns || 1,
                                    'data': [],
                                    'showGroups': false
                                };
                                if (screen.contents[contentName].blueprintSettings && screen.contents[contentName].blueprintSettings.gridConfig
                                    && screen.contents[contentName].blueprintSettings.gridConfig.columnDefs) {
                                    mapFieldsToGridConfig(screen.contents[contentName].blueprintSettings.gridConfig, screen.contents[contentName].properties);
                                    screen.contents[contentName].blueprintSettings.gridConfig.columnDefs.forEach(
                                        addFieldRuntimeConf, { confDataRepository: confDataRepository, contentName: contentName }
                                    );
                                } else {
                                    screen.contents[contentName].properties.forEach(
                                        addFieldRuntimeConf, { confDataRepository: confDataRepository, contentName: contentName }
                                    );
                                }
                                if (screen.contents[contentName].extensionRef && screen.contents[contentName].extensionRef.length > 0) {
                                    screen.contents[contentName].extensionRef.forEach(
                                        addExtendedFields, { confDataRepository: confDataRepository, contentName: contentName }
                                    );
                                }
                            }
                            else if ('auditTrail' === screen.contents[contentName].multiplicity) {
                                runtimeContextRepository.contents[contentName].selectedItem = null;
                                runtimeContextRepository.contents[contentName].selectedItems = null;
                                runtimeContextRepository.contents[contentName].selectedItemsCount = null;
                                confDataRepository.contents[contentName].runtimeConf = {
                                    filter: { EntityId: '' },
                                    startEmpty: false,
                                    config: {}
                                }
                            } else {
                                confDataRepository.contents[contentName].runtimeConf = {};
                            }
                        }
                    }

                    if (screen.activeContent) {
                        runtimeContextRepository["activeContent"] = screen.activeContent;
                    }
                    else {
                        var parkMaster = self.getMasterContentNames();
                        if (parkMaster.length > 0) {
                            runtimeContextRepository["activeContent"] = parkMaster[0];
                        }
                    }
                    //actions
                    commandBarData = {
                        barType: "Action",
                        bar: [],
                        refresh: function () {
                            this.bar.forEach(function (obj) {
                                if (obj.type === 'Group') {
                                    obj.group.forEach(function (cmd) {
                                        cmd.visibility = getButtonVisibility(cmd);
                                    });
                                } else {
                                    obj.visibility = getButtonVisibility(obj);
                                }
                            });
                        }
                    };
                    self['commandBars'].push(commandBarData);
                    for (contentName in screen.contents) {
                        if (screen.contents[contentName].actions) {
                            screen.contents[contentName].actions.forEach(fillCmdBar);
                        }
                    }
                    if (commandBarData.bar.length > 0) {
                        commandBarData.bar.reverse();
                    }
                    //create runtime automation content objects
                    for (contentName in screen.contents) {
                        if (screen.contents.hasOwnProperty(contentName)) {
                            if (self[screen.contents[contentName].id] === undefined) {
                                self[screen.contents[contentName].id] = {};
                            }
                            createRunTimeAutomationObj(screen.contents[contentName].id);
                        }
                    }

                    function getButtonVisibility(commandObj) {
                        var visibility, evaluation;
                        if (commandObj.showLogic) {
                            try {
                                visibility = mdContextSrv.parseWithStateCtx(commandObj.showLogic);
                            }
                            catch (e) {
                                // continue regardless of error
                            }
                        } else if (commandObj.showLogicFunction) {
                            try {
                                evaluation = mdContextSrv.evalFunctionWithStateCtx(commandObj.showLogicFunction);
                                if (typeof evaluation === "object" && evaluation !== null && typeof evaluation.then === "function") {
                                    evaluation.then(function (outcome) {
                                        visibility = outcome;
                                    });
                                }
                                else {
                                    visibility = evaluation;
                                }
                            }
                            catch (e) {
                                // continue regardless of error
                            }
                        } else {
                            visibility = true;
                        }
                        return visibility;
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

                    function createFindAll(contentName, isArchiving) {
                        var serverApiObj = self[contentName];
                        serverApiObj.findAll = function (icvServerConfig) {
                            var defer = $q.defer();
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

                            var backendSvcMethodToCall = isArchiving ? 'findAllArchiving' : 'findAll';
                            var backendSvcMethodParams = { appName: icvServerConfig.appName, entityName: icvServerConfig.entityName, options: icvServerConfig.options };
                            if (isReadingFunctionContent(screen.contents[contentName])) {
                                backendSvcMethodToCall = 'read';
                                var readingFunctionParams = {};
                                readingFunctionParams = getEvaluatedReadingFunctionParams(screen.contents[contentName].readingFunctionRef.params);
                                if (typeof readingFunctionParams === 'string') {
                                    readingFunctionParams = JSON.parse(readingFunctionParams);
                                }
                                backendSvcMethodParams = {
                                    appName: icvServerConfig.appName,
                                    functionName: icvServerConfig.entityName,
                                    params: readingFunctionParams,
                                    options: icvServerConfig.options
                                };
                            }
                            backendService[backendSvcMethodToCall](backendSvcMethodParams).then(function (data) {
                                if (data && data.value) {
                                    var contextInfo = runtimeContextRepository.contents && runtimeContextRepository.contents[contentName] ?
                                        angular.copy(runtimeContextRepository.contents[contentName]) : null;
                                    if (contextInfo && (contextInfo.selectedItem || (contextInfo.selectedItems && contextInfo.selectedItems.length > 0)) &&
                                        confDataRepository.contents[contentName].runtimeConf.selectItems !== undefined &&
                                        typeof confDataRepository.contents[contentName].runtimeConf.selectItems === 'function') {
                                        $timeout(function () {
                                            if (confDataRepository.contents[contentName].runtimeConf.selectionMode === 'multi') {
                                                confDataRepository.contents[contentName].runtimeConf.selectItems(contextInfo.selectedItems, true, true);
                                            } else {
                                                confDataRepository.contents[contentName].runtimeConf.selectItems([contextInfo.selectedItem], true, true);
                                            }
                                        }, 500);
                                    } else if (confDataRepository.contents[contentName].runtimeConf.selectAll !== undefined &&
                                        typeof confDataRepository.contents[contentName].runtimeConf.selectAll === 'function') {
                                        confDataRepository.contents[contentName].runtimeConf.selectAll(false);
                                    }

                                    if (confDataRepository.contents[contentName].blueprintSettings &&
                                        (confDataRepository.contents[contentName].blueprintSettings.viewOptions === 'c' ||
                                            confDataRepository.contents[contentName].blueprintSettings.viewOptions === 'm'
                                            || confDataRepository.contents[contentName].blueprintSettings.viewOptions === 'gm')) {
                                        confDataRepository.contents[contentName].properties.forEach(function (property) {
                                            var propType;
                                            if (typeof property.type === 'string') {
                                                propType = property.type.toLowerCase();
                                            } else if (typeof property.type === 'object') {
                                                propType = 'object';
                                            }
                                            var tileConfig = confDataRepository.contents[contentName].blueprintSettings.tileConfig;
                                            var isDateTimeField = false;
                                            if (tileConfig.titleField === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                isDateTimeField = true;
                                            }
                                            if (!isDateTimeField && tileConfig.descriptionField === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                isDateTimeField = true;
                                            }
                                            if (!isDateTimeField && tileConfig.propertyFields && tileConfig.propertyFields.length) {
                                                tileConfig.propertyFields.forEach(function (propertyField) {
                                                    if (propertyField.field === property.name && (propType === 'datetime' || propType === 'datetimeoffset')) {
                                                        isDateTimeField = true;
                                                    }
                                                });
                                            }
                                            if (isDateTimeField) {
                                                data.value.forEach(function (item) {
                                                    item[property.name] = $filter('date')(item[property.name], 'medium');
                                                });
                                            }
                                        });
                                    }
                                }
                                defer.resolve(data);
                            }, function (reject) {
                                defer.reject(reject);
                            });
                            return defer.promise;
                        }
                    }

                    self.getRecursiveStateInfo = getRecursiveStateInfo;


                    self.getParams = function (stateName) {
                        var stateInfo = self.getStateInfo(stateName);
                        stateInfo = getRecursiveStateInfo(stateInfo, stateName);
                        var params = stateInfo && stateInfo.master.params ? stateInfo.master.params : {};
                        var currentChain = breadcrumbService.getBreadcrumbChain();
                        if (currentChain.length > 1) {
                            params['isDrillDownState'] = true;
                        }
                        return params;
                    }

                    self.initBreadcrumb = function () {
                        var chain = mdContextSrv.getBreadCrumbChain();
                        if (chain) {
                            breadcrumbService.setBreadcrumbChain(chain);
                        }
                    }

                    self.getBreadcrumbChain = getBreadcrumbChain;
                    self.updateBreadCrumb = updateBreadCrumb;

                    self.interpolateQuery = function (query) {
                        var contentQuery = mdContextSrv.interpolateQuery(query);
                        return contentQuery;
                    }

                    self.getContentDataArtifact = function (content) {
                        return getContentDataArtifact(content);
                    }
                    self.isReadingFunctionContent = function (content) {
                        return isReadingFunctionContent(content);
                    }
                    self.getEvaluatedReadingFunctionParams = function (params) {
                        return getEvaluatedReadingFunctionParams(params);
                    }

                    function refreshServerSideICV(content, selectItem,isFirstLoad) {
                        if (selectItem) {
                            var optionString, query;
                            optionString = getFilterSelectQuery(selectItem);
                            if (confDataRepository.contents[content] && confDataRepository.contents[content].query) {
                                var interpolatedQuery = mdContextSrv.interpolateQuery(confDataRepository.contents[content].query, null);
                                var concatenatedQuery = interpolatedQuery + '&' + optionString;
                                var options = [];
                                var combinedQueryList = [];
                                var keyList = [];
                                options = concatenatedQuery.split('&');
                                options.forEach(function (key, index) {
                                    var keyName = key.substring(0, key.indexOf('='));
                                    if (keyList.indexOf(keyName) === -1) {
                                        combinedQueryList.push(combineQueryOptions(keyName, options));
                                        keyList.push(keyName);
                                    }
                                });
                                query = combinedQueryList.join('&');
                            } else {
                                query = optionString;
                            }

                            var backendSvcMethodToCall = 'findAll';
                            var backendSvcMethodParams = {};
                            if (isReadingFunctionContent(screen.contents[content])) {
                                backendSvcMethodToCall = 'read';
                                var readingFunctionParams = getEvaluatedReadingFunctionParams(screen.contents[content].readingFunctionRef.params);
                                readingFunctionParams = JSON.parse(readingFunctionParams);
                                backendSvcMethodParams = {
                                    appName: applName,
                                    functionName: screen.contents[content].readingFunctionRef.functionName,
                                    params: readingFunctionParams, options: query
                                };
                            } else {
                                backendSvcMethodParams = {
                                    appName: applName,
                                    entityName: screen.contents[content].entityRef.entity,
                                    options: query
                                };
                            }

                            backendService[backendSvcMethodToCall](backendSvcMethodParams).then(function (data) {
                                var selectedItem, selectedItems = [];
                                if (data && data.value) {
                                    data.value.forEach(function (item, index) {
                                        item.selected = true;
                                        selectedItems.push(item);
                                        if (index + 1 === data.value.length) {
                                            selectedItem = item;
                                        }
                                    });
                                }
                                runtimeContextRepository.contents[content].selectedItem = selectedItem;
                                runtimeContextRepository.contents[content].selectedItemsCount = selectedItems.length;
                                if (confDataRepository.contents[content].runtimeConf.selectionMode === 'multi') {
                                    runtimeContextRepository.contents[content].selectedItems = selectedItems;
                                }
                                if (typeof self[content].onContentSelection === 'function') {
                                    self[content].onContentSelection(runtimeContextRepository.contents[content].selectedItems, selectedItem);
                                }
                                refreshIcv(confDataRepository.contents[content].runtimeConf, isFirstLoad);
                            });
                        } else if (confDataRepository.contents[content].runtimeConf.refresh !== undefined
                            && typeof confDataRepository.contents[content].runtimeConf.refresh === "function") {
                            if (runtimeContextRepository.contents[content].selectedItem) {
                                runtimeContextRepository.contents[content].selectedItem = undefined;
                                runtimeContextRepository.contents[content].selectedItemsCount = 0;
                            }
                            if (confDataRepository.contents[content].runtimeConf.selectionMode === 'multi') {
                                runtimeContextRepository.contents[content].selectedItems = [];
                            }
                            if (typeof self[content].onContentSelection === 'function') {
                                self[content].onContentSelection(undefined, undefined);
                            }
                            refreshIcv(confDataRepository.contents[content].runtimeConf, isFirstLoad);
                        }
                    }

                    self.setStateInfo = function (stateId, master, detail) {
                        var stateInfo = {
                            "id": stateId,
                            "master": master ? master : null,
                            "detail": detail ? detail : null
                        }
                        if (stateInfo.id) {
                            mdContextSrv.setStateInfo(stateInfo);
                        }
                    }

                    self.getStateInfo = getStateInfo;
                };

                function refreshIcv(icvConfig, isFirstLoad) {
                    var sortInfo;
                    var userSortInfoConfig = angular.copy(icvConfig.sortInfo);

                    //capture sortinfo before refreshing
                    if (icvConfig.getSortInfo && typeof icvConfig.getSortInfo === 'function') {
                        sortInfo = icvConfig.getSortInfo();
                        if (sortInfo.field && sortInfo.direction && icvConfig.sortInfo) {
                            icvConfig.sortInfo.field = sortInfo.field;
                            icvConfig.sortInfo.direction = sortInfo.direction;
                        }
                    }

                    if (icvConfig.refresh && typeof icvConfig.refresh === 'function' && !isFirstLoad) icvConfig.refresh(true);
                    icvConfig.sortInfo = userSortInfoConfig;
                }

                function updateBreadCrumb(item) {
                    var currentChain = breadcrumbService.getBreadcrumbChain();
                    var index = item.itemIndex;
                    if (currentChain && currentChain.length && typeof index === 'number') {
                        currentChain.splice(index + 1);
                    }
                    if (currentChain && currentChain.length === 1) {
                        currentChain = [];
                    }
                    mdContextSrv.setBreadCrumbChain(currentChain);
                }

                function getStateInfo(currentStateId) {
                    return mdContextSrv.getStateInfo(currentStateId);
                }

                function getDestStateInfo(destStateId, customContext) {
                    destStateId = 'home.' + destStateId;
                    var destState = {};
                    var allStates = $state.get();
                    if (allStates && allStates.length) {
                        allStates.forEach(function (state) {
                            if (state.name === destStateId) {
                                destState = state;
                                if (customContext && customContext.Id) {
                                    destState.title = getCustomDrillDownBreadcrumbTitle(destState, customContext);
                                } else {
                                    destState.title = getBreadcrumbTitle(destState, null, true);
                                }
                                destState.masterId = getMasterId(destState.name, null, true);
                            }
                        });
                    }
                    return destState;
                }

                function getStateTitle(state) {
                    return (state.data && state.data.title) ? $filter('translate')(state.data.title) : state.name;
                }

                function getBreadcrumbChain() {
                    return mdContextSrv.getBreadCrumbChain() || [];
                }

                function getRecursiveStateInfo(stateInfo, stateName, recursiveId, isDestination) {
                    if (!stateInfo || !stateName) {
                        return stateInfo;
                    }
                    var masterInfo = stateInfo.master;
                    var breadcrumbChain = getBreadcrumbChain() || [];
                    if (masterInfo && masterInfo.recursiveId && (breadcrumbChain.length > 0 || isDestination)) {
                        var recursiveStateId = stateName + '_' + masterInfo.recursiveId;
                        if (recursiveId) {
                            recursiveStateId = stateName + '_' + recursiveId;
                        }
                        stateInfo = getStateInfo(recursiveStateId);
                    }

                    return stateInfo;
                }

                function getMasterId(stateName, recursiveId, isDestination) {
                    var stateInfo = getStateInfo(stateName);
                    var masterId = '';
                    if (!stateInfo) {
                        return masterId;
                    }
                    stateInfo = getRecursiveStateInfo(stateInfo, stateName, recursiveId, isDestination);
                    var masterInfo = stateInfo.master;
                    if (masterInfo && masterInfo.id) {
                        masterId = masterInfo.id;
                    }
                    return masterId;
                }

                function getBreadcrumbTitle(state, recursiveId, isDestination) {
                    var stateInfo = getStateInfo(state.name);
                    var title = getStateTitle(state);
                    if (!stateInfo) {
                        return title;
                    }
                    stateInfo = getRecursiveStateInfo(stateInfo, state.name, recursiveId, isDestination);
                    var masterInfo = stateInfo.master;
                    if (masterInfo && masterInfo.title && masterInfo.useScreenTitle) {
                        title = title + "  " + masterInfo.title;
                    } else if (masterInfo && masterInfo.title && !masterInfo.useScreenTitle) {
                        title = masterInfo.title;
                    }

                    return title;
                }

                function getSourceScreenInfo(srcMasterId) {
                    var sourceScreen = angular.copy($state.$current.self);
                    if (sourceScreen.views && !sourceScreen.views['Canvas@']) {
                        sourceScreen = angular.copy($state.$current.parent.self);
                    }
                    sourceScreen.title = getBreadcrumbTitle(sourceScreen, srcMasterId);
                    sourceScreen.masterId = getMasterId(sourceScreen.name, srcMasterId);
                    return sourceScreen;
                }

                this.initCustomAction = function () {
                    return { 'onExit': onCustomActionExit };
                }

                function onCustomActionExit(identifier) {
                    var stateId = $state.$current.parent.toString();
                    var actionName = $state.$current.toString().replace(stateId + '.', '');
                    var action = null, content = null, vCtrl = null, screen = null;
                    md.loadModule(stateId).then(function (manifest) {
                        screen = manifest.states.filter(function (s) { return s.id === stateId; })[0];
                        if (screen.type === "drill-down" && screen.referenceState) {
                            screen = manifest.states.filter(function (s) { return s.id === screen.referenceState; })[0];
                        }
                        //search for action obj
                        function initAndSearchAction(elem) {
                            if (elem.id === this.act) {
                                action = elem;
                            }
                        }
                        for (content in screen.contents) {
                            if (screen.contents[content].actions) {
                                screen.contents[content].actions.some(initAndSearchAction, { act: actionName });
                            }
                        }

                        if (action && action.behavior) {
                            if (mdContextSrv.MDState) { //previous status info available
                                if (action.behavior.onExit) {
                                    vCtrl = mdContextSrv.getViewCtrl();
                                    if (action.behavior.onExit.refreshAndSelectContents) {
                                        if (vCtrl) {
                                            action.behavior.onExit.refreshAndSelectContents.forEach(function (cntName) {
                                                if (vCtrl[cntName]) {
                                                    if (!identifier) {
                                                        vCtrl[cntName].refresh();
                                                    }
                                                    else {
                                                        vCtrl[cntName].refreshAndSelect(identifier);
                                                    }
                                                }
                                            });
                                        }
                                        $state.go(mdContextSrv.MDState.previousState, mdContextSrv.MDState.previousData);
                                    }
                                }
                                else {
                                    $state.go(mdContextSrv.MDState.previousState, mdContextSrv.MDState.previousData, { reload: true });
                                }
                            } else {
                                $state.go('^', {}, { reload: true });
                            }
                        } else {
                            $state.go('^', {}, { reload: true });
                        }
                    }, function () {
                        $state.go('^', {}, { reload: true });
                    });
                }

                function getUpdatedWidgetConfig(configObj, icon) {
                    try {
                        if (icon.indexOf('.svg') !== -1) {
                            configObj.svgIcon = icon;
                        } else if (icon.indexOf('svg ') !== -1) {
                            var svgIcon = icon.slice(4); //removes 'svg '
                            configObj.svgIcon = 'common/icons/' + svgIcon + '.svg';
                        } else {
                            configObj.image = icon;
                        }
                    }
                    catch (e) {
                        configObj.image = '';
                    }
                }
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

                function getCustomContentApiList(screen, contentName) {
                    var apiList = {};
                    apiList.getContext = function () {
                        return angular.copy(mdContextSrv.getContextInfo());
                    };

                    apiList.setContext = function (selectedItem) {
                        mdContextSrv.setContentContext(contentName, selectedItem);
                        $rootScope.$broadcast('mdui-context-updated');
                    };

                    apiList.getData = function (options) {
                        var dataSvc, filter, content, applName, isReadingFunction = false;
                        var deffered = $q.defer();
                        content = screen.contents[contentName];
                        applName = screen.appName;

                        //get the service end points
                        if (content.entityRef && content.entityRef.entity) {
                            dataSvc = multiDataService[content.entityRef.entity];
                        } else if (content.readingFunctionRef && content.readingFunctionRef.functionName) {
                            dataSvc = multiDataService[content.readingFunctionRef.functionName];
                            isReadingFunction = true;
                        } else {
                            var error = 'Entity or Reading Function is not configured.'
                            return asyncFunc(false, error);
                        }

                        //interpolate the query
                        if (options) {
                            filter = mdContextSrv.interpolateQuery(options, null);
                        } else if (screen.contents[contentName].query && !isReadingFunction) {
                            filter = screen.contents[contentName].query;
                            filter = mdContextSrv.interpolateQuery(filter, null);
                        } else if (isReadingFunction && screen.contents[contentName].readingFunctionRef.params) {
                            filter = getEvaluatedReadingFunctionParams(screen.contents[contentName].readingFunctionRef.params);
                        }

                        //perform the call
                        dataSvc.getAll(filter, applName, screen.layoutTemplate).then(function (data) {
                            var parkData = [];
                            if ((data) && (data.succeeded)) {
                                parkData = data.value;
                            }
                            deffered.resolve(parkData);
                        });
                        return deffered.promise;
                    };

                    return apiList;
                }

                this.initCustomContent = function (name) {
                    var error = 'Invalid Custom Content';
                    var defer = $q.defer();
                    if (!name) {
                        return asyncFunc(false, error);
                    }
                    var contentName = name;
                    var stateId = $state.$current.toString();
                    md.loadModule(stateId).then(function (manifest) {
                        var screen = manifest.states.filter(function (s) { return s.id === stateId; })[0];
                        if (screen.type === "drill-down" && screen.referenceState) {
                            screen = manifest.states.filter(function (s) { return s.id === screen.referenceState; })[0]
                        }
                        if (screen && screen.contents[contentName] && screen.contents[contentName].multiplicity === 'custom') {
                            //create the apis
                            var apiList = getCustomContentApiList(screen, contentName);
                            defer.resolve(apiList);
                        } else {
                            defer.reject(error);
                        }
                    });
                    return defer.promise;
                }


                //gets the breadcrumb title for the destination screen drill-downed from custom screen
                function getCustomDrillDownBreadcrumbTitle(destScreen, item) {
                    var title = getStateTitle(destScreen);
                    var field;
                    var useScreenTitle;
                    if (!destScreen || !item) {
                        return title;
                    }
                    var moduleInfo = md.getCurrentModuleInfo(destScreen.name) || {};
                    if (!moduleInfo.states) {
                        return title;
                    }
                    var currentScreen = moduleInfo.states.filter(function (s) { return s.id === destScreen.name; })[0];
                    if (!currentScreen) {
                        return title;
                    }
                    if (!currentScreen.contents) {
                        return title;
                    }
                    for (var name in currentScreen.contents) {
                        var content = currentScreen.contents[name];
                        if (content && content.master && content.blueprintSettings) {
                            field = content.blueprintSettings.breadcrumbTitle || '';
                            useScreenTitle = content.blueprintSettings.useScreenTitleInBreadcrumb;
                        }
                    }
                    if (!field) {
                        return title;
                    }
                    if (item[field]) {
                        title = useScreenTitle ? title + ' (' + item[field] + ')' : item[field];
                    }
                    return title;
                }

                //api to set the breadcrumb title for custom screen drill-downed from MDUI Screen
                function setCustomDrillDownBreadcrumbTitle(title) {
                    if (!title) {
                        return;
                    }
                    var sourceScreen = angular.copy($state.$current.self);
                    if (sourceScreen.views && !sourceScreen.views['Canvas@']) {
                        sourceScreen = angular.copy($state.$current.parent.self);
                    }
                    var chain = breadcrumbService.getBreadcrumbChain() || [];
                    if (!chain.length) {
                        return;
                    }
                    chain.forEach(function (item) {
                        if (item.name === sourceScreen.name) {
                            item.title = title;
                        }
                    });
                    breadcrumbService.setBreadcrumbChain(chain);
                }

                //set the breadcrumb levels for custom drill down
                function setCustomDrillDownBreadcrumb(sourceScreen, destScreen) {
                    if (!sourceScreen || !destScreen) {
                        return;
                    }
                    var chain = breadcrumbService.getBreadcrumbChain();
                    if (!chain.length) {
                        sourceScreen.itemIndex = 0;
                        destScreen.itemIndex = 1;
                        chain.push(sourceScreen);
                        chain.push(destScreen);
                    } else if (chain[chain.length - 1].name === sourceScreen.name && destScreen.name) {
                        chain[chain.length - 1].title = sourceScreen.title;
                        chain[chain.length - 1].masterId = sourceScreen.masterId;
                        destScreen.itemIndex = chain.length;
                        chain.push(destScreen);
                    }
                    mdContextSrv.setBreadCrumbChain(chain);
                }

                //sets the source and dest screen info in context for custom to/fro MDUI drill down
                function setCustomDrillDownInfo(item, destinationInfo, srcBreadcrumbTitle) {
                    if (!item.Id) {
                        return;
                    }
                    var destScreenId = destinationInfo.screenId;
                    var destParams = destinationInfo.params;
                    var sourceScreen = getSourceScreenInfo();
                    if (sourceScreen && srcBreadcrumbTitle) {
                        sourceScreen.title = srcBreadcrumbTitle;
                    }
                    var destScreen = getDestStateInfo(destScreenId, item);
                    //set source state info
                    var sourceStateInfo = {
                        "id": sourceScreen.name,
                        "master": {
                            id: item.Id,
                            title: sourceScreen.title,
                            field: '',
                            useScreenTitle: '',
                            params: {}
                        },
                        "detail": null
                    }
                    mdContextSrv.setStateInfo(sourceStateInfo);
                    //set destination state info
                    var destinationStateInfo = {
                        "id": destScreen.name,
                        "master": {
                            id: item.Id,
                            title: destScreen.title,
                            field: '',
                            useScreenTitle: '',
                            params: destParams
                        },
                        "detail": null
                    }
                    mdContextSrv.setStateInfo(destinationStateInfo);
                    setCustomDrillDownBreadcrumb(sourceScreen, destScreen);
                }

                //api to perform drill down from Custom screen to MDUI screen
                function performCustomDrillDown(item, destinationInfo, srcBreadcrumbTitle) {
                    if (!item || !destinationInfo) {
                        return 'Invalid parameters. Unable to do the custom drill down.';
                    }
                    setCustomDrillDownInfo(item, destinationInfo, srcBreadcrumbTitle);
                    if (!destinationInfo.params) {
                        destinationInfo.params = {};
                    }
                    destinationInfo.params['isDrillDownState'] = true;
                    $state.go('home.' + destinationInfo.screenId, destinationInfo.params);
                }

                // api to get the info related to drill down selection and breadcrumb items
                function getCustomDrillDownInfo(stateName) {
                    var drillDownInfo = {};
                    if (!stateName) {
                        return drillDownInfo;
                    }
                    drillDownInfo.selection = mdContextSrv.getStateInfo(stateName) || {};
                    drillDownInfo.breadcrumbList = mdContextSrv.getBreadCrumbChain();
                    return drillDownInfo;
                }

                //api to track back through the breadcrumb from a custom screen
                function goToPreviousLevel(item) {
                    updateBreadCrumb(item);
                    var stateInfo = mdContextSrv.getStateInfo(item.name);
                    var params = stateInfo && stateInfo.master.params ? stateInfo.master.params : {};
                    var currentChain = breadcrumbService.getBreadcrumbChain();
                    if (currentChain.length > 1) {
                        params['isDrillDownState'] = true;
                    }
                    params.isNavigatedFromBreadcrumb = true;
                    $state.go(item.name, params, { reload: true });
                }

                //exposes the required apis to achieve drill down to/fro custom screens
                this.initCustomDrillDown = function () {
                    return {
                        navigate: performCustomDrillDown,
                        getInfo: getCustomDrillDownInfo,
                        goToPreviousLevel: goToPreviousLevel,
                        setTitle: setCustomDrillDownBreadcrumbTitle
                    }
                }

                function mapFieldsToGridConfig(gridConfig, fields) {
                    var tempObj = {};
                    for (var i = 0; i < fields.length; i++) {
                        tempObj[fields[i].name] = fields[i];
                    }
                    for (var j = 0; j < gridConfig.columnDefs.length; j++) {
                        var propName = gridConfig.columnDefs[j].field || gridConfig.columnDefs[j].name;
                        if (tempObj[propName] && tempObj[propName].group) {
                            gridConfig.columnDefs[j].group = tempObj[propName].group;
                        }
                    }
                }

                function getEvaluatedStateParams(params) {
                    var obj = {};
                    if (params) {
                        Object.getOwnPropertyNames(params).forEach(function (name) {
                            obj[name] = mdContextSrv.parseWithStateCtx(params[name]);
                        });
                    }
                    return obj;
                }

                function getFilterSelectQuery(items) {
                    var query = '';
                    if (!Array.isArray(items)) {
                        items = [items];
                    }
                    if (items.length > 0) {
                        query = '$filter='
                    }
                    items.forEach(function (item, index) {
                        var pattern = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi; //NOSONAR
                        var isGuid = pattern.test(item);
                        if (isGuid) {
                            query += 'Id eq ' + item;
                        } else {
                            query += 'Id eq \'' + item + '\'';
                        }
                        if (index < items.length - 1) {
                            query += ' or ';
                        }
                    });
                    return query;
                }
            }]);
}());
