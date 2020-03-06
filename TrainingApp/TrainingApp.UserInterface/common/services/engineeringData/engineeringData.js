/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.services.engineering
     * @module siemens.simaticit.common
     *
     * @description
     * Contains objects and services that supports multiple
     * services, providers, and objects that implement the engineering logic
     *
     *
     */
    angular.module('siemens.simaticit.common.services.engineering',[]);

})();

(function () {
    'use strict';

    /**
     * @ngdoc type
     * @access internal
     * @name common.services.engineering.DataModel
     * @module siemens.simaticit.common.services.engineering
     *
     * @description
     * Contains objects that are used to get all engineering data
     *
     * @property {string} entityName Gets the name of entity
     * @property {string} properties Gets the property list of entity
     * @property {string} orderBy Gets the order by property of entity
     * @property {string} filter Gets the filter by property of entity
     */
    angular.module('siemens.simaticit.common.services.engineering').factory('common.services.engineering.DataModel', [function () {
        function DataModel(EntityName, Properties, OrderBy, Filter) {
            this.entityName = EntityName;
            this.properties = Properties;
            this.orderBy = OrderBy;
            this.filter  = Filter;
        }
        return DataModel;
    }]);


})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        (function () {
            /**
             * @ngdoc provider
             * @name common.engineering.DataConfigProvider
             * @module siemens.simaticit.common.services.engineering
             * @access internal
             * @description
             * Configures path to the OData method to utilize engineering data services
             * used to generate required information
             *
             * @property {string} config.oDataServiceURI Gets the URI of the data service
             */
            angular.module('siemens.simaticit.common.services.engineering').provider('common.services.engineering.DataConfig', [function () {
                    this.config = {
                        oDataServiceURI: ''
                    };
                    /**
                    * @ngdoc service
                    * @name common.engineering.DataConfig
                    * @module siemens.simaticit.common.services.engineering
                    * @access internal
                    * @description
                    * Configures path to the OData method to utilize engineering data services
                    * used to generate required information
                    *
                    * @property {string} config.oDataServiceURI Gets the URI of the data service
                    */
                    this.$get = function () {
                        return {
                            config: this.config
                        };
                    };
                }]);
            engineeringCommands.$inject = ['$q', '$resource', '$http', '$translate', 'common', 'CommandResponse', 'ExecutionError', 'common.services.engineering.DataConfig'];
            function engineeringCommands($q, $resource, $http, $translate, common, CommandResponse, ExecutionError, engineeringDataConfig) {
                var oDataPath = engineeringDataConfig.config.oDataServiceURI;
                this.getAll = getAll;
                this.deleteSWACcomponent = deleteSWACcomponent;
                var ERRORS = function (statusCode) {
                    switch (statusCode) {
                        case 404: return $translate.instant('ERRORS.404');
                        case 503: return $translate.instant('ERRORS.503');
                        case 400: return $translate.instant('ERRORS.400');
                        case 403: return $translate.instant('ERRORS.403');
                        case 500: return $translate.instant('ERRORS.500');
                        case '4XX': return $translate.instant('ERRORS.4XX');
                        case '5XX': return $translate.instant('ERRORS.5XX');
                    }
                };
                function transformResObj(data, headersGetter, statusCode) {
                    var res = null;
                    if (!data) {
                        common.logger.logError('-1: Error: Generic Error', '', 'Engineering Data Service');
                        res = new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.engineering.generic', statusCode)));
                        return res;
                    }
                    try {
                        var Jsondata = JSON.parse(data);
                        //odata Response Error
                        if (Jsondata['odata.error']) {
                            res = new CommandResponse(false, new ExecutionError(Jsondata['odata.error'].code, Jsondata['odata.error'].message.value, statusCode));
                            common.logger.logError(Jsondata['odata.error'].code + ' : ' + Jsondata['odata.error'].message.value, '', 'Engineering Data Service');
                            return res;
                        }
                        //odata Response with data
                        if (Jsondata['@odata.context']) {
                            res = new CommandResponse(true, new ExecutionError(0, '', statusCode));
                            //res.value = Jsondata.value;
                            var suffix = '$entity';
                            if (Jsondata['@odata.context'].indexOf(suffix, Jsondata['@odata.context'].length - suffix.length) !== -1) {
                                delete Jsondata['@odata.context'];
                                res.value = [Jsondata];
                            }
                            else {
                                res.value = Jsondata.value;
                            }
                            // parse count from response
                            if (Jsondata['@odata.count']) {
                                res.count = Jsondata['@odata.count'];
                            }
                            return res;
                        }
                        //http error
                        if (Jsondata.error) {
                            res = new CommandResponse('false', new ExecutionError(Jsondata.error.code, Jsondata.error.message, statusCode));
                            common.logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'Engineering Data Service');
                        }
                    }
                    catch (ex) {
                        var errorSeries = Math.floor(statusCode / 100);
                        if (ERRORS(statusCode)) {
                            res = new CommandResponse(false, new ExecutionError(statusCode, 'Error: ' + ERRORS(statusCode), statusCode));
                            common.logger.logError(statusCode + 'Error: ' + ERRORS(statusCode) + '', 'Engineering Data Service');
                        }
                        else if (ERRORS(errorSeries + 'XX')) {
                            res = new CommandResponse(false, new ExecutionError(statusCode, 'Error: ' + ERRORS(errorSeries + 'XX'), statusCode));
                            common.logger.logError(statusCode + 'Error: ' + ERRORS(errorSeries + 'XX') + '', 'Engineering Data Service');
                        }
                        else {
                            res = new CommandResponse(false, new ExecutionError(-1, "Error: " + ex.message, statusCode));
                            common.logger.logError('-1: Error: ' + ex.message, '', 'Engineering Data Service');
                        }
                    }
                    return res;
                }
                function getCmd(path) {
                    return $resource('', {}, {
                        getAll: {
                            method: 'Get',
                            url: path,
                            transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                        }
                    });
                }
                function transformResObjSwacDel(data) {
                    var res = null;
                    if (data) {
                        try {
                            var Jsondata = JSON.parse(data);
                            if (Jsondata.Error) {
                                res = new CommandResponse(Jsondata.Succeeded, new ExecutionError(Jsondata.Error.ErrorCode, Jsondata.Error.ErrorMessage));
                                res.value = (Jsondata.UIModuleManifest) ? Jsondata.UIModuleManifest : null;
                                if (Jsondata.Succeeded && 0 === Jsondata.Error.ErrorCode) {
                                    common.logger.logInfo(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'SWAC Command Delete Service');
                                }
                                else {
                                    common.logger.logError(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'SWAC Command Delete Service');
                                }
                            }
                            else {
                                res = new CommandResponse(false, new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                                common.logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'SWAC Command Delete Service');
                            }
                        }
                        catch (e) {
                            res = new CommandResponse(false, new ExecutionError(-1, 'Error: ' + e.message));
                            common.logger.logError('-1: Error: ' + e.message, '', 'SWAC Command Delete Service');
                        }
                    }
                    else {
                        res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                        common.logger.logError('-1: Error: Generic Error', '', 'SWAC Command Delete Service');
                    }
                    return res;
                }
                function getDeleteCmd(path) {
                    return $resource('', {}, {
                        deleteSWACcomponent: {
                            method: 'Post',
                            url: path,
                            transformResponse: [transformResObjSwacDel].concat($http.defaults.transformResponse)
                        }
                    });
                }
                /**
                 * @ngdoc method
                 * @name common.services.engineering.data.service#getAll
                 * @access internal
                 * @param {string} entityName (Required) The name of the engineering entity to be retrieved.
                 * @param {string} options (Optional) A string that represents the oData query and a string-option that allows to filter and restrict the projection of the query.
                 * @returns {object} For more information see {@link module:siemens.simaticit.common.type:CommandResponse}.
                 *
                 * @description
                 * Gets all engineering entity data and returns a $promise object to retrieve data
                 *
                 */
                function getAll(entityName, options) {
                    var deferred = $q.defer();
                    var path = oDataPath + entityName;
                    if (!oDataPath || oDataPath.trim() === '') {
                        deferred.reject({
                            data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.engineering.noConfig')))
                        });
                    }
                    else if (!entityName || entityName === '') {
                        deferred.reject({
                            data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.engineering.noEntityName')))
                        });
                    }
                    else {
                        try {
                            if (options) {
                                path += '?' + options;
                            }
                            var fnc = getCmd(path);
                            fnc.getAll(function (data) {
                                deferred.resolve(data);
                            }, function (err) {
                                deferred.reject({ data: new CommandResponse(false, new ExecutionError(err.data.error.errorCode, err.data.error.errorMessage)) });
                            });
                            return deferred.promise;
                        }
                        catch (jse) {
                            deferred.reject({ data: { Error: { ErrorCode: -1, ErrorMessage: jse.message } } });
                            return deferred.promise;
                        }
                    }
                    return deferred.promise;
                }
                /**
                 * @ngdoc method
                 * @name common.services.engineering.data.service#deleteSWACcomponent
                 * @access internal
                 * @param {string} entityName (Required) The command name, swacComponentName (Required) The SWAC entity to be deleted.
                 * @returns {object} For more information see {@link module:siemens.simaticit.common.type:CommandResponse}.
                 *
                 * @description
                 * deletes the SWAC component and returns a $promise object
                 *
                 */
                function deleteSWACcomponent(entityName, swacComponentName) {
                    var deferred = $q.defer();
                    var path = oDataPath + entityName;
                    if (!oDataPath || oDataPath.trim() === '') {
                        deferred.reject({
                            data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.engineering.noConfig')))
                        });
                    }
                    else if (!entityName || entityName === '') {
                        deferred.reject({
                            data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.engineering.noEntityName')))
                        });
                    }
                    else {
                        try {
                            var fnc = getDeleteCmd(path);
                            var deleteSWACcomponentData = {
                                "command": {
                                    "Name": swacComponentName
                                }
                            };
                            fnc.deleteSWACcomponent(deleteSWACcomponentData, function (data) {
                                deferred.resolve(data);
                            }, function (err) {
                                var exeError = common.setExecutionError(err);
                                deferred.reject({ data: new CommandResponse(false, new ExecutionError(exeError.data.error.errorCode, exeError.data.error.errorMessage)) });
                            });
                            return deferred.promise;
                        }
                        catch (jse) {
                            deferred.reject({ data: { Error: { ErrorCode: -1, ErrorMessage: jse.message } } });
                            return deferred.promise;
                        }
                    }
                    return deferred.promise;
                }
            }
            /**
             * @ngdoc service
             * @name common.services.engineering.data.service
             * @module siemens.simaticit.common.services.engineering
             * @access internal
             * @requires $q
             * @requires $resource
             * @requires $http
             * @requires common
             * @requires service:CommandResponse
             * @requires service:ExecutionError
             * @requires common.engineering.engineeringDataProvider
             *
             * @description
             * Contains data related services that are used by engineering logic to retrieve engineering data
             *
             * The services must provide APIs in order to read data with the following options:
             * - Retrieve a list of entities. Example:
             *   getAll('WorkerRoleDefinition'), getAll('FunctionRight')
             * - Retrieve a list of entities by specifying the properties, the filters and order by criteria. Example:
             *   getAll('WorkerRoleDefinition','$select=Id$orderby=Name asc&$filter=(Name ne null)')
             * - Retrieves the number of entities
             *
             * Note: The query string options to be applied for data retrieval are the which ones provided by oData.
             *
             * @usage
             * As service:
             *```
             * common.services.engineering.data.service.getAll(entityName, options).then(function(data) { });
             * ```
             *
             * @example
             * In a controller, the common.services.engineering.data.service is used as follows:
             *
             * ```
             * loadIndicatorIsBusy = true;
             *
             * common.services.engineering.data.service.getAll('WorkerRoleDefinition','$select=Name').then(function (data) {
             *           result = data;
             *           loadIndicatorIsBusy = false;
             *       }, function (error) {
             *           loadIndicatorIsBusy = false;
             *           result = error.data;
             *       });
             *```
             *
             */
            angular.module('siemens.simaticit.common.services.engineering').service('common.services.engineering.data.service', engineeringCommands);
        })();
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=engineering.svc.js.map