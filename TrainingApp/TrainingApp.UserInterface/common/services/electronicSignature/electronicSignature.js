/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.services.electronicSignature
     * @module siemens.simaticit.common
     *
     * @description
     * This module provides services manage entities Electronic Signature.
     *
     */
    angular.module('siemens.simaticit.common.services.electronicSignature', []);

})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var ElectronicSignatureService = /** @class */ (function () {
            function ElectronicSignatureService($q, $window, backendService) {
                this.$q = $q;
                this.$window = $window;
                this.backendService = backendService;
                this.enabled = null !== backendService.getAppEndPoint(ElectronicSignatureService.APP_NAME);
                if (window.location.href.indexOf("default-debug.html") !== -1) {
                    this.enabled = true;
                }
            }
            ElectronicSignatureService.prototype.isEnabled = function () {
                return this.enabled;
            };
            ElectronicSignatureService.prototype.getScenario = function (NId) {
                var deferred = this.$q.defer();
                var query = {
                    appName: 'AuditTrail',
                    entityName: 'ScenarioConfiguration',
                    options: '$filter=NId eq \'' + NId + '\'' + ' and IsCurrent eq true and SignatureConfigurations/any()'
                };
                this.backendService.findAll(query).then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            ElectronicSignatureService.prototype.getScenarioInstance = function (NId) {
                var deferred = this.$q.defer();
                var query = {
                    appName: 'AuditTrail',
                    entityName: 'ScenarioInstance',
                    options: '$filter=ScenarioConfigurationNId eq \'' + NId + '\''
                };
                this.backendService.findAll(query).then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            ElectronicSignatureService.prototype.getScenarioInstanceSigners = function (Id) {
                var deferred = this.$q.defer();
                var query = {
                    appName: 'AuditTrail',
                    entityName: 'ScenarioInstance',
                    options: "&$expand=SignatureInstances&$filter=Id eq " + Id + ""
                };
                this.backendService.findAll(query).then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            ElectronicSignatureService.prototype.getScenarios = function (query, additionalFilter) {
                if (additionalFilter === void 0) { additionalFilter = null; }
                var deferred = this.$q.defer();
                if (additionalFilter) {
                    var queryString = query.options;
                    if (-1 === queryString.indexOf('$filter=')) {
                        queryString = '$filter=' + additionalFilter + '&' + queryString;
                    }
                    else {
                        queryString = queryString.replace('$filter=', '$filter=' + additionalFilter + ' and ');
                    }
                    query.options = queryString;
                }
                this.backendService.findAll(query).then(function (data) {
                    data.value.forEach(function iterator(record, index, collection) {
                        if (record.SignatureConfigurations.length <= 0) {
                            collection.splice(index, 1);
                        }
                        else {
                            record.expanded = false;
                        }
                    });
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            ElectronicSignatureService.prototype.getFilterString = function (filter) {
                return this.processFilter(filter);
            };
            ElectronicSignatureService.prototype.processFilter = function (filter) {
                var filterString = "";
                if (!filter) {
                    return filterString;
                }
                var keys = Object.keys(filter);
                var partNo = 2;
                for (var index = 0; index < keys.length; index++) {
                    var key = keys[index];
                    if (filter[key]) {
                        var part = '';
                        switch (key) {
                            case 'Name':
                                part = 'Name eq ' + filter[key] + '';
                                filterString = filterString + (1 < partNo ? ' and ' : '') + part;
                                partNo = partNo + 1;
                                break;
                            case 'Description':
                                part = 'Description eq \'' + filter[key] + '\'';
                                filterString = filterString + (1 < partNo ? ' and ' : '') + part;
                                partNo = partNo + 1;
                                break;
                            default:
                                break;
                        }
                    }
                }
                return filterString;
            };
            ElectronicSignatureService.APP_NAME = 'AuditTrail';
            ElectronicSignatureService.$inject = [
                '$q',
                '$window',
                'common.services.runtime.backendService'
            ];
            return ElectronicSignatureService;
        }());
        angular.module('siemens.simaticit.common.services.electronicSignature').service('common.services.electronicSignature.service', ElectronicSignatureService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=electronicSignature-svc.js.map