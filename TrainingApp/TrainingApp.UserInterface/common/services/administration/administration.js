/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.services.administration
     * @module siemens.simaticit.common
     *
     * @description
     * Contains services, providers, and objects to access the functionalities exposed by the Administration Service Layer.
     *
     *
     */
    angular.module('siemens.simaticit.common.services.administration', []);

})();

"use strict";
/// <reference path="../session.svc.ts" />
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var AdministrationConfig = /** @class */ (function () {
            function AdministrationConfig() {
                this.config = {
                    oDataServiceURI: ''
                };
            }
            AdministrationConfig.prototype.$get = function () {
                return {
                    config: this.config
                };
            };
            return AdministrationConfig;
        }());
        framework.AdministrationConfig = AdministrationConfig;
        /**
        * @ngdoc provider
        * @name common.services.administration.DataConfig
        * @module siemens.simaticit.common.services.administration
        * @access internal
        * @description
        * Configures Administration Service Layer endpoint.
        *
        * @property {string} config.oDataServiceURI The URI of the Administration Service Layer.
        */
        angular.module('siemens.simaticit.common.services.administration').provider('common.services.administration.DataConfig', AdministrationConfig);
        function AdministrationDataService(administrationConfig, $injector, $translate, $q, common, CommandResponse, ExecutionError, logger) {
            var oDataPath = administrationConfig.config.oDataServiceURI;
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
            function transformGetIdentityClaimsData(data) {
                var jsonData = {
                    'Category': data.category
                };
                return { command: jsonData };
            }
            function transformResObj(data, headersGetter, statusCode) {
                var res = null;
                if (data) {
                    try {
                        var Jsondata = JSON.parse(data);
                        if (Jsondata.Error) {
                            res = new CommandResponse(Jsondata.Succeeded, new ExecutionError(Jsondata.Error.ErrorCode, Jsondata.Error.ErrorMessage));
                            logger.logDebug(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'siemens.unity.common.administration');
                            if (Jsondata.Identity) {
                                res.identity = JSON.parse(Jsondata.Identity);
                            }
                            if (Jsondata.NodeStatusList) {
                                res.hosts = JSON.parse(Jsondata.NodeStatusList);
                            }
                            if (Jsondata.LicenseStatusInfo) {
                                res.licenseStatusInfo = JSON.parse(Jsondata.LicenseStatusInfo);
                            }
                        }
                        else {
                            res = new CommandResponse(false, new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                            logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'siemens.unity.common.administration');
                        }
                    }
                    catch (ex) {
                        var errorSeries = Math.floor(statusCode / 100);
                        if (ERRORS(statusCode)) {
                            res = new CommandResponse(false, new ExecutionError(statusCode, 'Error: ' + ERRORS(statusCode)));
                            logger.logError(statusCode + 'Error: ' + ERRORS(statusCode) + '', 'siemens.unity.common.administration');
                        }
                        else if (ERRORS(errorSeries + 'XX')) {
                            res = new CommandResponse(false, new ExecutionError(statusCode, 'Error: ' + ERRORS(errorSeries + 'XX')));
                            logger.logError(statusCode + 'Error: ' + ERRORS(errorSeries + 'XX') + '', 'siemens.unity.common.administration');
                        }
                        else {
                            res = new CommandResponse(false, new ExecutionError(-1, 'Error: ' + ex.message));
                            logger.logError('-1: Error: ' + ex.message, '', 'siemens.unity.common.administration');
                        }
                    }
                }
                else {
                    res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                    logger.logError('-1: Error: Generic Error', '', 'siemens.unity.common.administration');
                }
                return res;
            }
            /**
            * @ngdoc method
            * @name common.services.administration.data.service#getIdentityClaims
            * @description
            * *This method is for internal use only.*
            */
            function getIdentityClaims() {
                var http = $injector.get('$http');
                var resource = $injector.get('$resource');
                return resource('', {}, {
                    getIdentity: {
                        method: 'POST',
                        url: oDataPath + 'GetCurrentIdentityClaimsCommand',
                        headers: { 'Content-Type': 'application/json' },
                        transformRequest: [transformGetIdentityClaimsData].concat(http.defaults.transformRequest),
                        transformResponse: [transformResObj].concat(http.defaults.transformResponse)
                    }
                });
            }
            /**
             * @ngdoc method
             * @name common.services.administration.data.service#invokeAdministrationCommand
             * @module siemens.simaticit.common.services.administration
             * @param {string} commandName A string containing the command name to be called.
             * @param {Object} payload An object containing the payload to be passed along with the command.
             * @returns {Object} A promise object containing the details about the success or failure.
             *
             * @description This function will invoke command on administration service layer and returns the promise object.
             *
             */
            function invokeAdministrationCommand(commandName, payload) {
                return invoke(oDataPath, commandName, payload);
            }
            function invoke(oDataPath, commandName, payload) {
                var deferred = $q.defer();
                callCommand(commandName, oDataPath).cmd(payload, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject(exeError);
                });
                return deferred.promise;
            }
            function callCommand(command, oDataPath) {
                var http = $injector.get('$http');
                var resource = $injector.get('$resource');
                return resource('', {}, {
                    cmd: {
                        method: 'POST',
                        url: oDataPath + command,
                        transformRequest: [transformDataObj].concat(http.defaults.transformRequest),
                        transformResponse: [transformResObj].concat(http.defaults.transformResponse)
                    }
                });
            }
            function transformDataObj(data) {
                return { command: data };
            }
            this.getIdentityClaims = getIdentityClaims;
            this.invokeAdministrationCommand = invokeAdministrationCommand;
        }
        /**
            * @ngdoc service
            * @name common.services.administration.data.service
            * @module siemens.simaticit.common.services.administration
            *
            * @description
            * *This service is for internal use only.*
            */
        angular.module('siemens.simaticit.common.services.administration')
            .service('common.services.administration.data.service', ['common.services.administration.DataConfig', '$injector', '$translate', '$q', 'common', 'CommandResponse', 'ExecutionError',
            'common.services.logger.service', AdministrationDataService]);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=administration-data.svc.js.map