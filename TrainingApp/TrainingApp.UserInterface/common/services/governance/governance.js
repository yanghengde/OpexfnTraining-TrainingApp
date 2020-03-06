/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.services.governance
     * @module siemens.simaticit.common
     * @description
     * Contains objects and services that supports multiple
     * services, providers, and objects that implement the  governance logic
     *
     */
    angular.module('siemens.simaticit.common.services.governance', []);

})();

(function () {
    'use strict';

    /**
      * @ngdoc type
      * @access internal
      * @name CreateDatabaseInfoModel
      * @module siemens.simaticit.common.services.governance
      *
      * @description
      * input object for the command "CreateDatabaseInfo"
      *
      * @property {string} name DataProvider Name
      * @property {string} description DataProvider Name
      * @property {string} type DataProvider Type (System, ThirdParty)
      * @property {string} dataModelAssembly assembly for the DataModel definition
      * @property {string} dataSource DataSource Name
      * @property {string} initialCatalog Initial Catalog Name
      * @property {number} connectionTimeout Connection Timeout
      * @property {number} commandTimeout Command Timeout
      * @property {number} numberOfRetries Number Of Retries
      * @property {number} retriesDelay Retries Delay
      * @property {number} databaseType databas type (Oracle MSSQLServer)
      * @property {string} schema schema for oracle database
      */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.CreateDatabaseInfoModel', function () {
        function createDatabaseInfoModel(name, description, type, dataModelAssemblyName,
            datasource, initialCatalog, connectionTimeout, commandTimeout, numberOfRetries, retriesDelay, databaseType, schema) {
            this.name = name;
            this.description = description;
            this.type = type;
            this.dataModelAssembly = dataModelAssemblyName;
            this.dataSource = datasource;
            this.initialCatalog = initialCatalog;
            this.connectionTimeout = connectionTimeout;
            this.commandTimeout = commandTimeout;
            this.numberOfRetries = numberOfRetries;
            this.retriesDelay = retriesDelay;
            this.databaseType = databaseType;
            if (undefined === schema) {
                this.schema = '';
            }
            else {
                this.schema = schema;
            }
        }
        return createDatabaseInfoModel;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name UpdateDatabaseInfoModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * input object for the command "UpdateDatabaseInfo"
     *
     * @property {string} name DataProvider Name
     * @property {string} description DataProvider Name
     * @property {string} type DataProvider Type (System, ThirdParty)
     * @property {string} dataModelAssembly assembly for the DataModel definition
     * @property {string} dataSource DataSource Name
     * @property {string} initialCatalog Initial Catalog Name
     * @property {number} connectionTimeout Connection Timeout
     * @property {number} commandTimeout Command Timeout
     * @property {number} numberOfRetries Number Of Retries
     * @property {number} retriesDelay Retries Delay
     * @property {string} schema schema for oracle database

     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.UpdateDatabaseInfoModel', function () {
        function updateDatabaseInfoModel(name, description, type, dataModelAssemblyName,
            datasource, initialCatalog, connectionTimeout, commandTimeout, numberOfRetries, retriesDelay, databaseType, schema) {
            this.name = name;
            this.description = description;
            this.type = type;
            this.dataModelAssembly = dataModelAssemblyName;
            this.dataSource = datasource;
            this.initialCatalog = initialCatalog;
            this.connectionTimeout = connectionTimeout;
            this.commandTimeout = commandTimeout;
            this.numberOfRetries = numberOfRetries;
            this.retriesDelay = retriesDelay;
            this.databaseType = databaseType;
            if (undefined === schema) {
                this.schema = '';
            }
            else {
                this.schema = schema;
            }
        }
        return updateDatabaseInfoModel;
    });



    /**
     * @ngdoc type
     * @access internal
     * @name DeleteDatabaseInfoModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * input object for the command "DeleteDatabaseInfo"
     *
     * @property {string} name Database Name
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.DeleteDatabaseInfoModel', function () {
        function deleteDatabaseInfoModel(name) {
            this.name = name;
        }
        return deleteDatabaseInfoModel;
    });



    /**
     * @ngdoc type
     * @access internal
     * @name AssociateDatabaseInfoModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * input object for the command "AssociateDatabaseInfo"
     *
     * @property {string} databaseInfoName Database Info Name
     * @property {string} dataProviderName DataProvider Name
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.AssociateDatabaseInfoModel', function () {
        function AssociateDatabaseInfoModel(databaseInfoName, dataProviderName) {
            this.databaseInfoName = databaseInfoName;
            this.dataProviderName = dataProviderName;
        }
        return AssociateDatabaseInfoModel;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name CreateDatabaseInfoResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * output object for the command "CreateDatabaseInfo"
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.CreateDatabaseInfoResponse', ['CommandResponse', function (CommandResponse) {
        function CreateDatabaseInfoResponse() { }
        CreateDatabaseInfoResponse.prototype = new CommandResponse();
        return CreateDatabaseInfoResponse;
    }]);

    /**
     * @ngdoc type
     * @access internal
     * @name UpdateDatabaseInfoResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * output object for the command "UpdateDatabaseInfo"
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.UpdateDatabaseInfoResponse', ['CommandResponse', function (CommandResponse) {
        function UpdateDatabaseInfoResponse() { }
        UpdateDatabaseInfoResponse.prototype = new CommandResponse();
        return UpdateDatabaseInfoResponse;
    }]);

    /**
     * @ngdoc type
     * @access internal
     * @name DeleteDatabaseInfoResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * output object for the command "DeleteDatabaseInfo"
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.DeleteDatabaseInfoResponse', ['CommandResponse', function (CommandResponse) {
        function DeleteDatabaseInfoResponse() { }
        DeleteDatabaseInfoResponse.prototype = new CommandResponse();
        return DeleteDatabaseInfoResponse;
    }]);


    /**
     * @ngdoc type
     * @access internal
     * @name AssociateDatabaseInfoResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * output object for the command "AssociateDatabaseInfo"
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.AssociateDatabaseInfoResponse',
        ['CommandResponse', function (CommandResponse) {
        function AssociateDatabaseInfoResponse() { }
        AssociateDatabaseInfoResponse.prototype = new CommandResponse();
        return AssociateDatabaseInfoResponse;
    }]);

})();

/*jshint -W117 */
(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @access internal
     * @name common.services.governance.databaseInfoConfig
     * @module siemens.simaticit.common.services.governance
     * @description
     * to configure the path to the OData method for project service
     *
     * @property {string} config.oDataServiceURI
     */
    angular.module('siemens.simaticit.common.services.governance').provider('common.services.governance.databaseInfoConfig', [function () {

        this.config = {
            oDataServiceURI: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);




    function DatabaseInfoCommands($q, $resource, $injector, $http, $translate, common, CommandResponse, ExecutionError, databaseInfoConfig) {

        var oDataPath = databaseInfoConfig.config.oDataServiceURI;

        function validateData(action, databaseInfoModel) {
            var resValidatorKey = true;
            if ('' === databaseInfoModel.name) {
                resValidatorKey = 'Name';
            } else if ('' === databaseInfoModel.type) {
                resValidatorKey = 'Type';
            } else if ('' === databaseInfoModel.dataSource) {
                resValidatorKey = ('MSSQLServer' === databaseInfoModel.databaseType) ? 'DataSource' : 'ServerName';
            } else if ('' === databaseInfoModel.initialCatalog) {
                resValidatorKey = ('MSSQLServer' === databaseInfoModel.databaseType) ? 'InitialCatalog' : 'Database';
            } else if ('' === databaseInfoModel.databaseType) {
                resValidatorKey = 'DatabaseType';
            } else if ('Oracle' === databaseInfoModel.databaseType) {
                if (databaseInfoModel.schema && '' !== databaseInfoModel.schema) {
                    if ('create' === action) {
                        if ('' !== databaseInfoModel.dataModelAssembly) {
                            resValidatorKey = true;
                        } else {
                            resValidatorKey = 'DataModelAssembly';
                        }
                    } else if ('update' === action) {
                        resValidatorKey = true;
                    }
                }
                else {
                    resValidatorKey = 'Schema';
                }
            }
            else if ('MSSQLServer' === databaseInfoModel.databaseType) {
                if ('create' === action) {
                    if ('' !== databaseInfoModel.dataModelAssembly) {
                        resValidatorKey = true;
                    } else {
                        resValidatorKey = 'DataModelAssembly';
                    }

                } else if ('update' === action) {
                    resValidatorKey = true;
                }

            }
            else {
                resValidatorKey = 'DatabaseType';
            }
            return resValidatorKey;
        }

        function transformCreateDatabaseInfoObj(data) {

            data.connectionTimeout = (data.connectionTimeout) ? (data.connectionTimeout) : (15000);
            data.commandTimeout = (data.commandTimeout) ? (data.commandTimeout) : (30000);
            data.numberOfRetries = (data.numberOfRetries) ? (data.numberOfRetries) : (50);
            data.retriesDelay = (data.retriesDelay) ? (data.retriesDelay) : (500);


            var jsonData = {
                'Name': data.name,
                'Description': data.description,
                'Type': data.type,
                'DataModelAssemblyName': data.dataModelAssembly,
                'DataSource': data.dataSource,
                'InitialCatalog': data.initialCatalog,
                'ConnectionTimeout': data.connectionTimeout,
                'CommandTimeout': data.commandTimeout,
                'NumberOfRetries': data.numberOfRetries,
                'RetriesDelay': data.retriesDelay,
                'DatabaseType': data.databaseType,
                'Schema': data.schema
            };

            return { command: jsonData };
        }

        function transformUpdateDatabaseInfoObj(data) {

            data.connectionTimeout = (data.connectionTimeout) ? (data.connectionTimeout) : (15000);
            data.commandTimeout = (data.commandTimeout) ? (data.commandTimeout) : (30000);
            data.numberOfRetries = (data.numberOfRetries) ? (data.numberOfRetries) : (50);
            data.retriesDelay = (data.retriesDelay) ? (data.retriesDelay) : (500);

            var jsonData = {
                'Name': data.name,
                'Description': data.description,
                'Type': data.type,
                'DataModelAssemblyName': data.dataModelAssembly,
                'DataSource': data.dataSource,
                'InitialCatalog': data.initialCatalog,
                'ConnectionTimeout': data.connectionTimeout,
                'CommandTimeout': data.commandTimeout,
                'NumberOfRetries': data.numberOfRetries,
                'RetriesDelay': data.retriesDelay,
                'DatabaseType': data.databaseType,
                'Schema': data.schema
            };

            return { command: jsonData };
        }

        function transformDeleteDatabaseInfoObj(data) {

            var jsonData = {
                'Name': data.name
            };

            return { command: jsonData };
        }

        function transformAssociateDatabaseInfoObj(data) {

            var jsonData = {
                'DatabaseInfoName': data.databaseInfoName,
                'DataProviderName': data.dataProviderName
            };

            return { command: jsonData };
        }

        function transformResObj(data) {
            var res = null;

            if (data) {
                try {
                    var Jsondata = JSON.parse(data);
                    if (Jsondata.Error) {
                        res = new CommandResponse(Jsondata.Succeeded, new ExecutionError(Jsondata.Error.ErrorCode, Jsondata.Error.ErrorMessage));
                        if (Jsondata.Succeeded && Jsondata.Error.ErrorCode === 0) {
                            common.logger.logInfo(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'DatabaseInfo Command Service');
                        }
                        else {
                            common.logger.logError(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'DatabaseInfo Command Service');
                        }
                    }
                    else {
                        res = new CommandResponse(false, new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                        common.logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'DatabaseInfo Command Service');
                    }
                }
                catch (ex) {
                    res = new CommandResponse(false, new ExecutionError(-1, 'Error: ' + ex.message));
                    common.logger.logError('-1: Error: ' + ex.message, '', 'DatabaseInfo Command Service');
                }

            } else {
                res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                common.logger.logError('-1: Error: Generic Error', '', 'DatabaseInfo Command Service');
            }


            return res;
        }


        function callCreate() {
            return $resource('', {}, {
                create: {
                    method: 'POST',
                    url: oDataPath + 'CreateDataProviderCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformCreateDatabaseInfoObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callUpdate() {
            return $resource('', {}, {
                update: {
                    method: 'POST',
                    url: oDataPath + 'UpdateDataProviderCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformUpdateDatabaseInfoObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callDelete() {
            return $resource('', {}, {
                delete: {
                    method: 'POST',
                    url: oDataPath + 'DeleteDataProviderCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformDeleteDatabaseInfoObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callAssociate() {
            return $resource('', {}, {
                associate: {
                    method: 'POST',
                    url: oDataPath + 'AssociateDatabaseInfoCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformAssociateDatabaseInfoObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }


        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.databaseInfoService#create
         * @param {CreateDatabaseInfoModel} createDatabaseInfoModel see  {@link CreateDatabaseInfoModel  CreateDatabaseInfoModel Object}
         * @returns {CreateDatabaseInfoResponse} Object see  {@link CreateDatabaseInfoResponse  CreateDatabaseInfoResponse Object}
         */

        function create(createDatabaseInfoModel) {
            var deferred = $q.defer(), msg = '';

            if (createDatabaseInfoModel instanceof $injector.get('common.services.governance.CreateDatabaseInfoModel')) {
                /* Validation  Keys Required */
                var resValidation = validateData('create', createDatabaseInfoModel);
                if (true === resValidation) {
                    return callCreate().create(createDatabaseInfoModel, function (data) {
                        deferred.resolve(data);
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    }).$promise;
                } else {
                    msg = resValidation;
                    deferred.reject({
                        data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.createNoMsg', { msg: msg })))
                    });
                }
            }
            else {
                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.createWrongInput')))
                });
            }

            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.databaseInfoService#update
         * @param {UpdateDatabaseInfoModel} updateDatabaseInfoModel see  {@link UpdateDatabaseInfoModel  UpdateDatabaseInfoModel Object}
         * @returns {UpdateDatabaseInfoResponse} Object see  {@link UpdateDatabaseInfoResponse  UpdateDatabaseInfoResponse Object}
         */

        function update(updateDatabaseInfoModel) {
            var deferred = $q.defer(), msg = '';

            if (updateDatabaseInfoModel instanceof $injector.get('common.services.governance.UpdateDatabaseInfoModel')) {

                /* Validation  Keys Required */
                var resValidation = validateData('update', updateDatabaseInfoModel);

                if (true === resValidation) {
                    return callUpdate().update(updateDatabaseInfoModel, function (data) {
                        deferred.resolve(data);

                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });

                    }).$promise;
                } else {
                    msg = resValidation;
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.updateNoMsg') + msg)) });
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.updateWrongInput'))) });
            }
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.databaseInfoService#delete
         * @param {UpdateDatabaseInfoModel} deleteDatabaseInfoModel see  {@link DeleteDatabaseInfoModel  DeleteDatabaseInfoModel Object}
         * @returns {UpdateDatabaseInfoResponse} Object see  {@link DeleteDatabaseInfoResponse  DeleteDatabaseInfoResponse Object}
         */

        function deleteDBInfo(deleteDatabaseInfoModel) {
            var deferred = $q.defer();
            var validationErrorKey = [];
            var keys = [];
            var msg = '';

            if (deleteDatabaseInfoModel instanceof $injector.get('common.services.governance.DeleteDatabaseInfoModel')) {

                /* Validation All Keys Required */
                /*  */
                keys = Object.keys(deleteDatabaseInfoModel);
                var resValidation = _.reduce(keys, function (memo, key) {
                    var resValidatorKey = (deleteDatabaseInfoModel[key]);
                    if (!resValidatorKey) { validationErrorKey.push(key); }
                    return memo && resValidatorKey;
                });

                if (resValidation) {
                    return callDelete().delete(deleteDatabaseInfoModel, function (data) {
                        deferred.resolve(data);

                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });

                    }).$promise;
                } else {
                    validationErrorKey.forEach(function (key, idx) {
                        msg += (idx === 0) ? key : ', ' + key;
                    });
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.deleteNoMsg') + msg)) });
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.deleteWrongInput'))) });
            }
            return deferred.promise;
        }


        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.databaseInfoService#associate
         * @param {AssociateDatabaseInfoModel} associateDatabaseInfoModel see  {@link AssociateDatabaseInfoModel  AssociateDatabaseInfoModel Object}
         * @returns {AssociateDatabaseInfoResponse} Object see  {@link AssociateDatabaseInfoResponse  AssociateDatabaseInfoResponse Object}
         */

        function associate(associateDatabaseInfoModel) {
            var deferred = $q.defer();
            var validationErrorKey = [];
            var keys = [];
            var msg = '';

            if (associateDatabaseInfoModel instanceof $injector.get('common.services.governance.AssociateDatabaseInfoModel')) {

                /* Validation All Keys Required */
                /*  */
                keys = Object.keys(associateDatabaseInfoModel);
                var resValidation = _.reduce(keys, function (memo, key) {
                    var resValidatorKey = (associateDatabaseInfoModel[key]);
                    if (!resValidatorKey) { validationErrorKey.push(key); }
                    return memo && resValidatorKey;
                });

                if (resValidation) {
                    return callAssociate().associate(associateDatabaseInfoModel, function (data) {
                        deferred.resolve(data);

                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });

                    }).$promise;
                } else {
                    validationErrorKey.forEach(function (key, idx) {
                        msg += (idx === 0) ? key : ', ' + key;
                    });
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.associateNoMsg') + msg)) });
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.databaseInfo.associateWrongInput'))) });
            }
            return deferred.promise;
        }

        this.create = create;
        this.update = update;
        this.delete = deleteDBInfo;
        this.associate = associate;

    }



    /**
     * @ngdoc service
     * @access internal
     * @name common.services.governance.databaseInfoService
     * @module siemens.simaticit.common.services.governance
     *
     * @requires $q
     * @requires $resource
     * @requires $injector
     * @requires $http
     * @requires common
     * @requires CommandResponse
     * @requires ExecutionError
     * @requires common.services.governance.databaseInfoConfig
     *
     * @description
     * Provides functionality to executing databaseInfo commands
     *
     */
    angular.module('siemens.simaticit.common.services.governance')
        .service('common.services.governance.databaseInfoService', ['$q', '$resource', '$injector', '$http', '$translate', 'common', 'CommandResponse',
            'ExecutionError', 'common.services.governance.databaseInfoConfig', DatabaseInfoCommands]);

})();

(function () {
    'use strict';

    /**
     * @ngdoc type
     * @access internal
     * @name addSubscriptionToWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to add event subscription to worker role
     *
     * @property {string} subscriptionName Gets the name of subscription
     * @property {string} workerRoleName Gets the name of worker role
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addSubscriptionToWorkerRoleModel', function () {
        function addSubscriptionToWorkerRole(subscriptionName, workerRoleName) {
            this.subscriptionName = subscriptionName;
            this.workerRoleName = workerRoleName;
        }
        return addSubscriptionToWorkerRole;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name removeSubscriptionFromWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to remove event subscription from worker role
     *
     * @property {string} subscriptionName Gets the name of subscription
     * @property {string} workerRoleName Gets the name of worker role
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeSubscriptionFromWorkerRoleModel', function () {
        function removeSubscriptionFromWorkerRole(subscriptionName, workerRoleName) {
            this.subscriptionName = subscriptionName;
            this.workerRoleName = workerRoleName;
        }
        return removeSubscriptionFromWorkerRole;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name createEventSubscriptionModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to create an event subscription
     *
     * @property {string} name Gets the name of subscription
     * @property {string} description Gets the description of subscription
     * @property {string} eventHandlerName Gets the event handler name of subscription
     * @property {string} subscribedEventName Gets the subscribed event name of subscription
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.createEventSubscriptionModel', function () {
        function createEventSubscription(name, description, eventHandlerName, subscribedEventName) {
            this.name = name;
            this.description = description;
            this.eventHandlerName = eventHandlerName;
            this.subscribedEventName = subscribedEventName;
        }
        return createEventSubscription;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name updateEventSubscriptionModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to update an event subscription
     *
     * @property {string} name Gets the name of subscription
     * @property {string} description Gets the description of subscription
     * @property {string} eventHandlerName Gets the event handler name of subscription
     * @property {string} subscribedEventName Gets the subscribed event name of subscription
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateEventSubscriptionModel', function () {
        function updateEventSubscription(name, description, eventHandlerName, subscribedEventName) {
            this.name = name;
            this.description = description;
            this.eventHandlerName = eventHandlerName;
            this.subscribedEventName = subscribedEventName;
        }
        return updateEventSubscription;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name deleteEventSubscriptionModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to delete an event subscription
     *
     * @property {string} eventSubscriptionName Gets the name of subscription
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.deleteEventSubscriptionModel', function () {
        function deleteEventSubscription(eventSubscriptionName) {
            this.eventSubscriptionName = eventSubscriptionName;
        }
        return deleteEventSubscription;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name renameEventSubscriptionModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to rename an event subscription
     *
     * @property {string} oldName Gets the old name of subscription
     * @property {string} newName Gets the new name of subscription
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.renameEventSubscriptionModel', function () {
        function renameEventSubscription(oldName, newName) {
            this.oldName = oldName;
            this.newName = newName;
        }
        return renameEventSubscription;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name addFilterToEventSubscriptionModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to add filter to an event subscription
     *
     * @property {string} eventSubscriptionName Gets the name of subscription
     * @property {string} category Gets the category of subscription
     * @property {string} topic Gets the topic of subscription
     * @property {string} module Gets the module of subscription
     * @property {string} tag Gets the tag of subscription
     * @property {object} userFields Gets the 10 custom fields of subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addFilterToEventSubscriptionModel', function () {
        function AddFilterToEventSubscription(eventSubscriptionName, category, topic, module, tag, userFields) {
            this.eventSubscriptionName = eventSubscriptionName;
            this.category = category;
            this.topic = topic;
            this.module = module;
            this.tag = tag;
            this.userFields = userFields;
        }
        return AddFilterToEventSubscription;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name updateFilterInEventSubscriptionModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to update filter in an event subscription
     *
     * @property {string} eventSubscriptionName Gets the name of subscription
     * @property {string} category Gets the category of subscription
     * @property {string} topic Gets the topic of subscription
     * @property {string} module Gets the module of subscription
     * @property {string} tag Gets the tag of subscription
     * @property {object} userFields Gets the 10 custom fields of subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateFilterInEventSubscriptionModel', function () {
        function updateFilterInEventSubscription(eventSubscriptionName, category, topic, module, tag, userFields) {
            this.eventSubscriptionName = eventSubscriptionName;
            this.category = category;
            this.topic = topic;
            this.module = module;
            this.tag = tag;
            this.userFields = userFields;
        }
        return updateFilterInEventSubscription;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name removeFilterFromEventSubscriptionModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to remove filter to an event subscription
     *
     * @property {string} eventSubscriptionName Gets the name of subscription
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeFilterFromEventSubscriptionModel', function () {
        function removeFilterFromEventSubscription(eventSubscriptionName) {
            this.eventSubscriptionName = eventSubscriptionName;
        }
        return removeFilterFromEventSubscription;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name addSubscriptionToWorkerRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to add an event subscription to worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addSubscriptionToWorkerRoleResponse',
        ['CommandResponse', function (CommandResponse) {
            function addSubscriptionToWorkerRoleResponse() { }
            addSubscriptionToWorkerRoleResponse.prototype = new CommandResponse();
            return addSubscriptionToWorkerRoleResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name removeSubscriptionToWorkerRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to remove an event subscription from worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeSubscriptionFromWorkerRoleResponse',
        ['CommandResponse', function (CommandResponse) {
            function removeSubscriptionFromWorkerRoleResponse() { }
            removeSubscriptionFromWorkerRoleResponse.prototype = new CommandResponse();
            return removeSubscriptionFromWorkerRoleResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name createEventSubscriptionResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to create an event subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.createEventSubscriptionResponse',
        ['CommandResponse', function (CommandResponse) {
            function createEventSubscriptionResponse() { }
            createEventSubscriptionResponse.prototype = new CommandResponse();
            return createEventSubscriptionResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name updateEventSubscriptionResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to update an event subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateEventSubscriptionResponse',
        ['CommandResponse', function (CommandResponse) {
            function updateEventSubscriptionResponse() { }
            updateEventSubscriptionResponse.prototype = new CommandResponse();
            return updateEventSubscriptionResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name deleteEventSubscriptionResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to delete an event subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.deleteEventSubscriptionResponse',
        ['CommandResponse', function (CommandResponse) {
            function deleteEventSubscriptionResponse() { }
            deleteEventSubscriptionResponse.prototype = new CommandResponse();
            return deleteEventSubscriptionResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name renameEventSubscriptionResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to rename an event subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.renameEventSubscriptionResponse',
        ['CommandResponse', function (CommandResponse) {
            function renameEventSubscriptionResponse() { }
            renameEventSubscriptionResponse.prototype = new CommandResponse();
            return renameEventSubscriptionResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name addFilterToEventSubscriptionResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to add filter to an event subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addFilterToEventSubscriptionResponse',
        ['CommandResponse', function (CommandResponse) {
            function addFilterToEventSubscriptionResponse() { }
            addFilterToEventSubscriptionResponse.prototype = new CommandResponse();
            return addFilterToEventSubscriptionResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name updateFilterInEventSubscriptionResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to update a filter in an event subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateFilterInEventSubscriptionResponse',
        ['CommandResponse', function (CommandResponse) {
            function updateFilterInEventSubscriptionResponse() { }
            updateFilterInEventSubscriptionResponse.prototype = new CommandResponse();
            return updateFilterInEventSubscriptionResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name removeFilterFromEventSubscriptionResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to remove filter from an event subscription
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeFilterFromEventSubscriptionResponse',
        ['CommandResponse', function (CommandResponse) {
            function removeFilterFromEventSubscriptionResponse() { }
            removeFilterFromEventSubscriptionResponse.prototype = new CommandResponse();
            return removeFilterFromEventSubscriptionResponse;
        }]);

})();

(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @access internal
     * @name common.services.governance.eventSubscriptionServiceProvider
     * @module siemens.simaticit.common.services.governance
     * @description
     * Configures path to the OData method to utilize various event subscription data services
     * used to generate required information.
     *
     * @property {string} config.oDataServiceURI Gets the URI of the data service.
     */
    angular.module('siemens.simaticit.common.services.governance').provider('common.services.governance.eventConfig', [function () {

        this.config = {
            oDataServiceURI: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);

    function eventSubscriptionCommands($q, $resource, $http, $translate, common, CommandResponse, ExecutionError, eventConfig) {

        var oDataPath = eventConfig.config.oDataServiceURI;

        this.addSubscriptionToWorkerRole = addSubscriptionToWorkerRole;
        this.removeSubscriptionFromWorkerRole = removeSubscriptionFromWorkerRole;
        this.createEventSubscription = createEventSubscription;
        this.updateEventSubscription = updateEventSubscription;
        this.deleteEventSubscription = deleteEventSubscription;
        this.renameEventSubscription = renameEventSubscription;
        this.addFilterToEventSubscription = addFilterToEventSubscription;
        this.updateFilterInEventSubscription = updateFilterInEventSubscription;
        this.removeFilterFromEventSubscription = removeFilterFromEventSubscription;

        function transformResObj(data) {
            return common.transformHttpResponse(data, 'Event Subscription Service');
        }

        function transformAddSubObj(data) {
            var jsonData = {
                "SubscriptionName": data.subscriptionName,
                "WorkerRoleName": data.workerRoleName
            };

            return { command: jsonData };
        }

        function transformRemoveSubObj(data) {
            var jsonData = {
                "SubscriptionName": data.subscriptionName,
                "WorkerRoleName": data.workerRoleName
            };

            return { command: jsonData };
        }

        function transformCreateEvtObj(data) {
            var jsonData = {
                "Name": data.name,
                "Description": data.description,
                "EventHandlerName": data.eventHandlerName,
                "SubscribedEventName": data.subscribedEventName
            };

            return { command: jsonData };
        }

        function transformUpdateEvtObj(data) {
            var jsonData = {
                "Name": data.name,
                "Description": data.description,
                "EventHandlerName": data.eventHandlerName,
                "SubscribedEventName": data.subscribedEventName
            };

            return { command: jsonData };

        }

        function transformDeleteEvtObj(data) {
            var jsonData = {
                "EventSubscriptionName": data.eventSubscriptionName
            };

            return { command: jsonData };
        }

        function transformRenameEvtObj(data) {
            var jsonData = {
                "OldName": data.oldName,
                "NewName": data.newName
            };

            return { command: jsonData };
        }

        function transformAddFilterObj(data) {
            var jsonData = {
                "EventSubscriptionName": data.eventSubscriptionName,
                "Category": data.category,
                "Topic": data.topic,
                "Module": data.module,
                "Tag": data.tag,
                "UserField1": data.userFields[0],
                "UserField2": data.userFields[1],
                "UserField3": data.userFields[2],
                "UserField4": data.userFields[3],
                "UserField5": data.userFields[4],
                "UserField6": data.userFields[5],
                "UserField7": data.userFields[6],
                "UserField8": data.userFields[7],
                "UserField9": data.userFields[8],
                "UserField10": data.userFields[9]
            };

            return { command: jsonData };
        }

        function transformUpdateFilterObj(data) {
            var jsonData = {
                "EventSubscriptionName": data.eventSubscriptionName,
                "Category": data.category,
                "Topic": data.topic,
                "Module": data.module,
                "Tag": data.tag,
                "UserField1": data.userFields[0],
                "UserField2": data.userFields[1],
                "UserField3": data.userFields[2],
                "UserField4": data.userFields[3],
                "UserField5": data.userFields[4],
                "UserField6": data.userFields[5],
                "UserField7": data.userFields[6],
                "UserField8": data.userFields[7],
                "UserField9": data.userFields[8],
                "UserField10": data.userFields[9]
            };

            return { command: jsonData };
        }

        function transformRemoveFilterObj(data) {
            var jsonData = {
                "EventSubscriptionName": data.eventSubscriptionName
            };

            return { command: jsonData };
        }


        function callAddSubscriptionToWorkerRoleCommand() {
            return $resource('', {}, {
                addSubscriptionToWorkerRole: {
                    method: 'Post',
                    url: oDataPath + 'AddSubscriptionToWorkerRoleCommand',
                    transformRequest: [transformAddSubObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callRemoveSubscriptionFromWorkerRoleCommand() {
            return $resource('', {}, {
                removeSubscriptionFromWorkerRole: {
                    method: 'Post',
                    url: oDataPath + 'RemoveSubscriptionFromWorkerRoleCommand',
                    transformRequest: [transformRemoveSubObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callCreateEventSubscriptionCommand() {
            return $resource('', {}, {
                createEventSubscription: {
                    method: 'Post',
                    url: oDataPath + 'CreateEventSubscriptionCommand',
                    transformRequest: [transformCreateEvtObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callUpdateEventSubscriptionCommand() {
            return $resource('', {}, {
                updateEventSubscription: {
                    method: 'Post',
                    url: oDataPath + 'UpdateEventSubscriptionCommand',
                    transformRequest: [transformUpdateEvtObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callDeleteEventSubscriptionCommand() {
            return $resource('', {}, {
                deleteEventSubscription: {
                    method: 'Post',
                    url: oDataPath + 'DeleteEventSubscriptionCommand',
                    transformRequest: [transformDeleteEvtObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callRenameEventSubscriptionCommand() {
            return $resource('', {}, {
                renameEventSubscription: {
                    method: 'Post',
                    url: oDataPath + 'RenameEventSubscriptionCommand',
                    transformRequest: [transformRenameEvtObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callAddFilterToEventSubscription() {
            return $resource('', {}, {
                addFilterToEventSubscription: {
                    method: 'Post',
                    url: oDataPath + 'AddFilterToEventSubscriptionCommand',
                    transformRequest: [transformAddFilterObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callUpdateFilterInEventSubscription() {
            return $resource('', {}, {
                updateFilterInEventSubscription: {
                    method: 'Post',
                    url: oDataPath + 'UpdateFilterInEventSubscriptionCommand',
                    transformRequest: [transformUpdateFilterObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callRemoveFilterFromEventSubscription() {
            return $resource('', {}, {
                removeFilterFromEventSubscription: {
                    method: 'Post',
                    url: oDataPath + 'RemoveFilterFromEventSubscriptionCommand',
                    transformRequest: [transformRemoveFilterObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }


        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#addSubscriptionToWorkerRole
         * @param {object}  common.services.governance.addSubscriptionToWorkerRoleModel  For more information see
         * {@link common.services.governance.addSubscriptionToWorkerRoleModel  common.services.governance.addSubscriptionToWorkerRoleModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.addSubscriptionToWorkerRoleResponse  common.services.governance.addSubscriptionToWorkerRoleResponse} object
         * @description
         * Adds subscription to worker role and returns a $promise object to retrieve data
         */
        function addSubscriptionToWorkerRole(addSubscriptionToWorkerRoleModel) {
            var deferred = $q.defer();

            if (addSubscriptionToWorkerRoleModel.subscriptionName) {
                if (addSubscriptionToWorkerRoleModel.workerRoleName) {
                    return callAddSubscriptionToWorkerRoleCommand().addSubscriptionToWorkerRole(addSubscriptionToWorkerRoleModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.addNoWRName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.addNoSubscriptionName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#removeSubscriptionFromWorkerRole
         * @param {object} common.services.governance.removeSubscriptionFromWorkerRoleModel For more information see
         * {@link common.services.governance.removeSubscriptionFromWorkerRoleModel  common.services.governance.removeSubscriptionFromWorkerRoleModel} object
         * @returns {object} For more information see
         * {@link common.governance.removeSubscriptionToWorkerRoleResponse  common.services.governance.removeSubscriptionFromWorkerRoleResponse} object
         * @description
         * Removes a subscription from worker role and returns a $promise object to retrieve data
         */
        function removeSubscriptionFromWorkerRole(removeSubscriptionToWorkerRoleModel) {
            var deferred = $q.defer();

            if (removeSubscriptionToWorkerRoleModel.subscriptionName) {
                if (removeSubscriptionToWorkerRoleModel.workerRoleName) {
                    return callRemoveSubscriptionFromWorkerRoleCommand().removeSubscriptionFromWorkerRole(removeSubscriptionToWorkerRoleModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.remNoWRName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.remNoSubscriptionName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#createEventSubscription
         * @param {object} common.services.governance.createEventSubscriptionModel For more information see
         * {@link common.services.governance.createEventSubscriptionModel  common.services.governance.createEventSubscriptionModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.createEventSubscriptionResponse  common.services.governance.createEventSubscriptionResponse} object
         * @description
         * Creates a event subscription and returns a $promise object to retrieve data
         */
        function createEventSubscription(createEventSubscriptionModel) {
            var deferred = $q.defer();

            if (createEventSubscriptionModel.name) {
                if (createEventSubscriptionModel.eventHandlerName) {
                    if (createEventSubscriptionModel.subscribedEventName) {
                        return callCreateEventSubscriptionCommand().createEventSubscription(createEventSubscriptionModel, function (data) {
                            deferred.resolve(data);
                        }, function (err) {
                            var exeError = common.setExecutionError(err);
                            deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        }).$promise;
                    }
                    else {
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.createNoSubsEventName'))) });
                    }
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.createNoEventHandlerName'))) });
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.createNoName'))) });
            }
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#updateEventSubscription
         * @param {object} common.services.governance.updateEventSubscriptionModel For more information see
         * {@link common.services.governance.updateEventSubscriptionModel  common.services.governance.updateEventSubscriptionModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.updateEventSubscriptionResponse  common.services.governance.updateEventSubscriptionResponse} object
         * @description
         * Updates a event subscription and returns a $promise object to retrieve data
         */
        function updateEventSubscription(updateEventSubscriptionModel) {
            var deferred = $q.defer();

            if (updateEventSubscriptionModel.name) {
                if (updateEventSubscriptionModel.eventHandlerName) {
                    if (updateEventSubscriptionModel.subscribedEventName) {
                        return callUpdateEventSubscriptionCommand().updateEventSubscription(updateEventSubscriptionModel, function (data) {
                            deferred.resolve(data);
                            return deferred.promise;
                        }, function (err) {
                            var exeError = common.setExecutionError(err);
                            deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                            return deferred.promise;
                        }).$promise;
                    }
                    else {
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.updateNoSubsEventName'))) });
                        return deferred.promise;
                    }
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.updateNoEventHandlerName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.updateNoName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#deleteEventSubscription
         * @param {object} common.services.governance.deleteEventSubscriptionModel For more information see
         * {@link common.services.governance.deleteEventSubscriptionModel  common.services.governance.deleteEventSubscriptionModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.deleteEventSubscriptionResponse  common.services.governance.deleteEventSubscriptionResponse} object
         * @description
         * Deletes a event subscription and returns a $promise object to retrieve data
         */
        function deleteEventSubscription(deleteEventSubscriptionModel) {
            var deferred = $q.defer();

            if (deleteEventSubscriptionModel.eventSubscriptionName) {
                return callDeleteEventSubscriptionCommand().deleteEventSubscription(deleteEventSubscriptionModel, function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                }).$promise;
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.deleteNoName'))) });
            }
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#renameEventSubscription
         * @param {object} common.services.governance.renameEventSubscriptionModel For more information see
         * {@link common.services.governance.renameEventSubscriptionModel  common.services.governance.renameEventSubscriptionModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.renameEventSubscriptionResponse  common.services.governance.renameEventSubscriptionResponse} object
         * @description
         * Renames a event subscription and returns a $promise object to retrieve data
         *
         */
        function renameEventSubscription(renameEventSubscriptionModel) {
            var deferred = $q.defer();

            if (renameEventSubscriptionModel.newName) {
                if (renameEventSubscriptionModel.oldName) {
                    if (renameEventSubscriptionModel.oldName !== renameEventSubscriptionModel.newName) {
                        return callRenameEventSubscriptionCommand().renameEventSubscription(renameEventSubscriptionModel, function (data) {
                            deferred.resolve(data);
                            return deferred.promise;
                        }, function (err) {
                            var exeError = common.setExecutionError(err);
                            deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                            return deferred.promise;
                        }).$promise;
                    }
                    else {
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.renameSameName'))) });
                        return deferred.promise;
                    }

                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.renameNoOldName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.renameNoNewName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#addFilterToEventSubscription
         * @param {object} common.services.governance.addFilterToEventSubscriptionModel For more information see
         * {@link common.services.governance.addFilterToEventSubscriptionModel  common.services.governance.addFilterToEventSubscriptionModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.addFilterToEventSubscriptionResponse  common.services.governance.addFilterToEventSubscriptionResponse} object
         * @description
         * Adds a filter to event subscription and returns a $promise object to retrieve data
         *
         */
        function addFilterToEventSubscription(addFilterToEventSubscriptionModel) {
            var deferred = $q.defer();

            if (addFilterToEventSubscriptionModel.eventSubscriptionName) {
                return callAddFilterToEventSubscription().addFilterToEventSubscription(addFilterToEventSubscriptionModel, function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    return deferred.promise;
                }).$promise;
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.addFilterNoName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#updateFilterInEventSubscription
         * @param {object} common.services.governance.updateFilterInEventSubscriptionModel For more information see
         * {@link common.services.governance.updateFilterInEventSubscriptionModel  common.services.governance.updateFilterInEventSubscriptionModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.updateFilterInEventSubscriptionResponse common.services.governance.updateFilterInEventSubscriptionResponse} object
         * @description
         * Updates a filter in an event subscription and returns a $promise object to retrieve data
         *
         */
        function updateFilterInEventSubscription(updateFilterInEventSubscriptionModel) {
            var deferred = $q.defer();

            if (updateFilterInEventSubscriptionModel.eventSubscriptionName) {
                return callUpdateFilterInEventSubscription().updateFilterInEventSubscription(updateFilterInEventSubscriptionModel, function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    return deferred.promise;
                }).$promise;
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.updateFilterNoName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.eventSubscriptionService#removeFilterFromEventSubscription
         * @param {object} common.services.governance.removeFilterFromEventSubscriptionModel For more information see
         * {@link common.services.governance.removeFilterFromEventSubscriptionModel  common.services.governance.removeFilterFromEventSubscriptionModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.removeFilterFromEventSubscriptionResponse   common.services.governance.removeFilterFromEventSubscriptionResponse} object
         * @description
         * Removes a filter from an event subscription and returns a $promise object to retrieve data
         *
         */
        function removeFilterFromEventSubscription(removeFilterFromEventSubscriptionModel) {
            var deferred = $q.defer();

            if (removeFilterFromEventSubscriptionModel.eventSubscriptionName) {
                return callRemoveFilterFromEventSubscription().removeFilterFromEventSubscription(removeFilterFromEventSubscriptionModel, function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    return deferred.promise;
                }).$promise;
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.eventSubscription.removeFilterNoName'))) });
                return deferred.promise;
            }
        }

    }

    /**
     * @ngdoc service
     * @access internal
     * @name common.services.governance.eventSubscriptionService
     * @module siemens.simaticit.common.services.governance
     *
     * @requires $q
     * @requires $resource
     * @requires $http
     * @requires common
     * @requires CommandResponse
     * @requires ExecutionError
     * @requires common.services.governance.eventSubscriptionServiceProvider
     *
     * @description
     * Contains data related services that are used by governance to retrieve event subscription data
     *
     */
    angular.module('siemens.simaticit.common.services.governance').service('common.services.governance.eventSubscriptionService',
        ['$q', '$resource', '$http', '$translate', 'common', 'CommandResponse', 'ExecutionError', 'common.services.governance.eventConfig', eventSubscriptionCommands]);


})();

(function () {
    'use strict';

    /**
     * @ngdoc type
     * @access internal
     * @name loadProjectModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to load a project
     *
     * @property {string} name Gets the name of project
     * @property {string} version Gets the version of project
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.loadProjectModel', function () {
        function loadProjectModel(name, version) {
            this.name = name;
            this.version = version;
        }
        return loadProjectModel;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name unloadProjectModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to unload a project
     *
     * @property {string} name Gets the name of project
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.unloadProjectModel', function () {
        function unloadProjectModel(name) {
            this.name = name;
        }
        return unloadProjectModel;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name deployProjectModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to deploy a project
     *
     * @property {string} name Gets the name of project
     * @property {string} version Gets the version of project
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.deployProjectModel', function () {
        function deployProjectModel(name, version) {
            this.name = name;
            this.version = version;
        }
        return deployProjectModel;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name loadProjectResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to load a project
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.loadProjectResponse', ['CommandResponse', function (CommandResponse) {
        function LoadProjectResponse() { }
        LoadProjectResponse.prototype = new CommandResponse();
        return LoadProjectResponse;
    }]);

    /**
     * @ngdoc type
     * @access internal
     * @name unloadProjectResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to unload a project
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.unloadProjectResponse', ['CommandResponse', function (CommandResponse) {
        function UnloadProjectResponse() { }
        UnloadProjectResponse.prototype = new CommandResponse();
        return UnloadProjectResponse;
    }]);

    /**
     * @ngdoc type
     * @access internal
     * @name deployProjectResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     *
     * @description
     * Contains response objects that are used to deploy a project
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.deployProjectResponse', ['CommandResponse', function (CommandResponse) {
        function DeployProjectResponse() { }
        DeployProjectResponse.prototype = new CommandResponse();
        return DeployProjectResponse;
    }]);

})();

(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @access internal
     * @name common.services.governance.projectServiceProvider
     * @module siemens.simaticit.common.services.governance
     * @description
     * Configures path to the OData method to utilize various project data services
     * used to generate required information.
     *
     * @property {string} config.oDataServiceURI Gets the URI of the data service.
     */
    angular.module('siemens.simaticit.common.services.governance').provider('common.services.governance.projectConfig', [function () {

        this.config = {
            oDataServiceURI: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);

    function projectCommands($q, $resource, $injector, $http, $translate, common, CommandResponse, ExecutionError, projectConfig) {

        var oDataPath = projectConfig.config.oDataServiceURI;
        this.load = load;
        this.unload = unload;
        this.deploy = deploy;

        function transformLoadDataObj(data) {

            var jsonData = {
                "Name": data.name,
                "Version": data.version
            };

            return { command: jsonData };
        }

        function transformUnloadDataObj(data) {

            var jsonData = {
                "Name": data.name
            };

            return { command: jsonData };
        }

        function transformDeployDataObj(data) {

            var jsonData = {
                "Name": data.name,
                "Version": data.version
            };

            return { command: jsonData };
        }

        function transformResObj(data) {
            var res = null;
            if (data) {
                try {
                    var Jsondata = JSON.parse(data);
                    if (Jsondata.Error) {
                        res = new CommandResponse(Jsondata.Succeeded, new ExecutionError(Jsondata.Error.ErrorCode, Jsondata.Error.ErrorMessage));
                        common.logger.logInfo(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'Project Command Service');
                    }
                    else {
                        res = new CommandResponse(false, new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                        common.logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'Project Command Service');
                    }
                }
                catch (ex) {
                    res = new CommandResponse(false, new ExecutionError(-1, 'Error: ' + ex.message));
                    common.logger.logError('-1: Error: ' + ex.message, '', 'Project Command Service');
                }

            } else {
                res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                common.logger.logError('-1: Error: Generic Error', '', 'Project Command Service');
            }
            return res;
        }


        function callLoad() {
            return $resource('', {}, {
                load: {
                    method: 'POST',
                    url: oDataPath + 'LoadProjectCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformLoadDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callUnload() {
            return $resource('', {}, {
                unload: {
                    method: 'POST',
                    url: oDataPath + 'UnloadProjectCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformUnloadDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callDeploy() {
            return $resource('', {}, {
                deploy: {
                    method: 'POST',
                    url: oDataPath + 'DeployProjectCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformDeployDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.projectService#load
         * @param {object} common.services.governance.loadProjectModel For more information see
         * {@link common.services.governance.loadProjectModel  common.services.governance.loadProjectModel} object
         * @returns {object} For more information see  {@link common.services.governance.loadProjectResponse  common.services.governance.loadProjectResponse} object
         * @description
         * Loads a project and returns a $promise object to retrieve data
         */
        function load(loadProjectModel) {
            var deferred = $q.defer();

            if (loadProjectModel instanceof $injector.get('common.services.governance.loadProjectModel')) {
                if (loadProjectModel.name) {
                    if (loadProjectModel.version) {
                        return callLoad().load(loadProjectModel, function (data) {
                            deferred.resolve(data);
                            return deferred.promise;
                        }, function (err) {
                            var exeError = common.setExecutionError(err);
                            deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                            return deferred.promise;
                        }).$promise;

                    }
                    else {
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.loadNoVersion'))) });
                        return deferred.promise;
                    }
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.loadNoName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.loadWrongInput'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.projectService#unload
         * @param {object} common.services.governance.unloadProjectModel For more information see
         * {@link common.services.governance.unloadProjectModel  common.services.governance.unloadProjectModel} object
         * @returns {object} For more information see  {@link common.services.governance.unloadProjectResponse  common.services.governance.unloadProjectResponse} object

         * @description
         * Unloads a project and returns a $promise object to retrieve data
         *
         */
        function unload(unloadProjectModel) {
            var deferred = $q.defer();

            if (unloadProjectModel instanceof $injector.get('common.services.governance.unloadProjectModel')) {
                if (unloadProjectModel.name) {
                    return callUnload().unload(unloadProjectModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.unloadNoName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.unloadWrongInput'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.projectService#deploy
         * @param {object} common.services.governance.deployProjectModel For more information see
         * {@link common.services.governance.deployProjectModel  common.services.governance.deployProjectModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.deployProjectResponse  common.services.governance.deployProjectResponse} object
         * @description
         * Deploys a project and returns a $promise object to retrieve data
         */
        function deploy(deployProjectModel) {
            var deferred = $q.defer();

            if (deployProjectModel instanceof $injector.get('common.services.governance.deployProjectModel')) {
                if (deployProjectModel.name) {
                    if (deployProjectModel.version) {
                        return callDeploy().deploy(deployProjectModel, function (data) {
                            deferred.resolve(data);
                            return deferred.promise;
                        }, function (err) {
                            var exeError = common.setExecutionError(err);
                            deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                            return deferred.promise;
                        }).$promise;
                    }
                    else {
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.deployNoVersion'))) });
                        return deferred.promise;
                    }
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.deployNoName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.project.deployWrongInput'))) });
                return deferred.promise;
            }
        }

    }

    /**
     * @ngdoc service
     * @access internal
     * @name common.services.governance.projectService
     * @module siemens.simaticit.common.services.governance
     *
     * @requires $q
     * @requires $resource
     * @requires $injector
     * @requires $http
     * @requires common
     * @requires CommandResponse
     * @requires ExecutionError
     * @requires common.services.governance.projectServiceProvider
     *
     * @description
     * Contains data related services that are used by governance to retrieve project data
     *
     */
    angular.module('siemens.simaticit.common.services.governance').service('common.services.governance.projectService',
        ['$q', '$resource', '$injector', '$http', '$translate', 'common', 'CommandResponse', 'ExecutionError',
            'common.services.governance.projectConfig', projectCommands]);


})();

(function () {
    'use strict';

    /**
     * @ngdoc type
     * @access internal
     * @name RuntimeStartUpModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * input object for the command "RuntimeStartUp"
     *
     * @property {string} reason Reason for startup
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.RuntimeStartUpModel', function () {
        function runtimeStartUpModel(reason) {
            this.reason = reason;
        }
        return runtimeStartUpModel;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name RuntimeShutDownModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * input object for the command "RuntimeShutDown"
     *
     * @property {string} reason Reason for shutdown
     * @property {Boolean} restart true if the service restart after shutdown, false it the service does not restart
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.RuntimeShutDownModel', function () {
        function RuntimeShutDownModel(reason,restart) {
            this.reason = reason;
            this.restart = restart;
        }
        return RuntimeShutDownModel;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name RuntimeStartUpResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * output object for the command "StartUp"
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.RuntimeStartUpResponse', ['CommandResponse', function (CommandResponse) {
        function RuntimeStartUpResponse() { }
        RuntimeStartUpResponse.prototype = new CommandResponse();
        return RuntimeStartUpResponse;
    }]);

    /**
    * @ngdoc type
    * @access internal
    * @name RuntimeShutDownResponse
    * @module siemens.simaticit.common.services.governance
    * @requires CommandResponse
    * @description
    * output object for the command "ShutDown"
    *
    */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.RuntimeShutDownResponse', ['CommandResponse', function (CommandResponse) {
        function RuntimeShutDownResponse() { }
        RuntimeShutDownResponse.prototype = new CommandResponse();
        return RuntimeShutDownResponse;
    }]);
})();

/*jshint -W117 */
(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @access internal
     * @name common.services.governance.systemEventsConfig
     * @module siemens.simaticit.common.services.governance
     * @description
     * to configure the path to the OData method for project service
     *
     * @property {string} config.oDataServiceURI
     */

    angular.module('siemens.simaticit.common.services.governance').provider('common.services.governance.systemEventsConfig', [function () {

        this.config = {
            oDataServiceURI: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);

    function systemEventsCommands($q, $resource, $injector, $http, $translate, common, CommandResponse, ExecutionError, systemEventsConfig) {

        var oDataPath = systemEventsConfig.config.oDataServiceURI;

        function transformRuntimeStartUpObj(data) {
            var jsonData = {
                'Reason': data.reason

            };

            return { command: jsonData };
        }


        function transformRuntimeShutDownObj(data) {

            var jsonData = {
                'Reason': data.reason,
                'Restart': data.restart

            };

            return { command: jsonData };
        }


        function transformResObj(data) {
            var res = null;

            if (data) {
                try {
                    var Jsondata = JSON.parse(data);
                    if (Jsondata.Error) {
                        res = new CommandResponse(Jsondata.Succeeded, new ExecutionError(Jsondata.Error.ErrorCode, Jsondata.Error.ErrorMessage));
                        if (Jsondata.Succeeded && Jsondata.Error.ErrorCode === 0) {
                            common.logger.logInfo(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'SystemEvents  Command Service');
                        }
                        else {
                            common.logger.logError(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'SystemEvents  Command Service');
                        }
                    }
                    else {
                        res = new CommandResponse(false, new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                        common.logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'SystemEvents  Command Service');
                    }
                }
                catch (ex) {
                    res = new CommandResponse(false, new ExecutionError(-1, 'Error: ' + ex.message));
                    common.logger.logError('-1: Error: ' + ex.message, '', 'SystemEvents Command Service');
                }

            } else {
                res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                common.logger.logError('-1: Error: Generic Error', '', 'SystemEvents Command Service');
            }


            return res;
        }


        function callRuntimeStartUp() {
            return $resource('', {}, {
                runtimeStartUp: {
                    method: 'POST',
                    url: oDataPath + 'RuntimeStartCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformRuntimeStartUpObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callRuntimeShutDown() {
            return $resource('', {}, {
                runtimeShutDown: {
                    method: 'POST',
                    url: oDataPath + 'RuntimeShutdownCommand',
                    headers: { 'Content-Type': 'application/json' },
                    transformRequest: [transformRuntimeShutDownObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }


        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.systemEventsService#startUp
         * @param {RuntimeStartUpModel} RuntimeStartUpModel see  {@link RuntimeStartUpModel  RuntimeStartUpModel Object}
         * @returns {RuntimeStartUpResponse} Object see  {@link RuntimeStartUpResponse  RuntimeStartUpResponse Object}
         */

        function startUp(runtimeStartUpModel) {
            var deferred = $q.defer();
            var validationErrorKey = [];
            var keys = [];
            var msg = '';

            if (runtimeStartUpModel instanceof $injector.get('common.services.governance.RuntimeStartUpModel')) {
                /* Validation  Keys Required */
                /*  */
                keys = Object.keys(runtimeStartUpModel);
                var resValidation = _.reduce(keys, function (memo, key) {

                    var resValidatorKey = (runtimeStartUpModel[key] && runtimeStartUpModel[key].toString().trim() !== '') ? true : false;


                    if (!resValidatorKey) { validationErrorKey.push(key); }
                    return memo && resValidatorKey;
                }, true);
                if (resValidation) {
                    return callRuntimeStartUp().runtimeStartUp(runtimeStartUpModel, function (data) {
                        deferred.resolve(data);
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    }).$promise;
                } else {
                    validationErrorKey.forEach(function (key, idx) {
                        msg += (idx === 0) ? key : ', ' + key;
                    });
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.systemEvents.startupNoMsg', { msg: msg }))) });
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.systemEvents.startupWrongInput'))) });
            }

            return deferred.promise;
        }


        /**
   * @ngdoc method
   * @access internal
   * @name common.services.governance.systemEventsService#shutDown
   * @param {RuntimeShutDownModel} RuntimeShutDownModel see  {@link RuntimeShutDownModel  RuntimeShutDownModel Object}
   * @returns {RuntimeShutDownResponse} Object see  {@link RuntimeShutDownResponse  RuntimeShutDownResponse Object}
   */

        function shutDown(runtimeShutDownModel) {
            var deferred = $q.defer();
            var validationErrorKey = [];
            var keys = [];
            var msg = '';

            if (runtimeShutDownModel instanceof $injector.get('common.services.governance.RuntimeShutDownModel')) {
                /* Validation  Keys Required */
                /*  */
                keys = Object.keys(runtimeShutDownModel);
                var resValidation = _.reduce(keys, function (memo, key) {

                    var resValidatorKey = (runtimeShutDownModel[key] !== undefined && runtimeShutDownModel[key].toString().trim() !== '') ? true : false;


                    if (!resValidatorKey) { validationErrorKey.push(key); }
                    return memo && resValidatorKey;
                }, true);
                if (resValidation) {
                    return callRuntimeShutDown().runtimeShutDown(runtimeShutDownModel, function (data) {
                        deferred.resolve(data);
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    }).$promise;
                } else {
                    validationErrorKey.forEach(function (key, idx) {
                        msg += (idx === 0) ? key : ', ' + key;
                    });
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.systemEvents.shutdownNoMsg', { msg: msg }))) });
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.systemEvents.shutdownWrongInput'))) });
            }

            return deferred.promise;
        }

        // added at the bottom since js-hint is throwing unused warning
        this.startUp = startUp;
        this.shutDown = shutDown;
    }



    /**
     * @ngdoc service
     * @access internal
     * @name common.services.governance.systemEventsService
     * @module siemens.simaticit.common.services.governance
     *
     * @requires $q
     * @requires $resource
     * @requires $injector
     * @requires $http
     * @requires common
     * @requires CommandResponse
     * @requires ExecutionError
     * @requires common.services.governance.databaseInfoConfig
     *
     * @description
     * Provides functionalities to  start and stop runtime services
     *
     */
    angular.module('siemens.simaticit.common.services.governance').service('common.services.governance.systemEventsService',
        ['$q', '$resource', '$injector', '$http', '$translate', 'common', 'CommandResponse', 'ExecutionError',
            'common.services.governance.systemEventsConfig', systemEventsCommands]);

})();

(function () {
    'use strict';

    /**
     * @ngdoc type
     * @access internal
     * @name createWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to create a worker role
     *
     * @property {string} name Gets the name of worker role
     * @property {string} description Gets the description of worker role
     * @property {number} retriesNumber Gets the retries number of worker role
     * @property {string} targetCPU Gets the target CPU of worker role
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.createWorkerRoleModel', function () {
        /*jshint validthis: true */
        function createWorkerRole(name, description, retiesNumber, targetCPU) {
            this.name = name;
            this.description = description;
            this.retriesNumber = retiesNumber;
            this.targetCPU = targetCPU;
        }
        return createWorkerRole;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name updateWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to update worker role
     *
     * @property {string} name Gets the name of worker role
     * @property {string} description Gets the description of worker role
     * @property {number} retriesNumber Gets the retries number of worker role
     * @property {number} commandExecutionTimeout Gets the command execution timeout of worker role
     * @property {string} targetCPU Gets the target CPU of worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateWorkerRoleModel', function () {
        /*jshint validthis: true */
        function updateWorkerRole(name, description, retriesNumber, commandExecutionTimeout, targetCPU) {
            this.name = name;
            this.description = description;
            this.retriesNumber = retriesNumber;
            this.commandExecutionTimeout = commandExecutionTimeout;
            this.targetCPU = targetCPU;
        }
        return updateWorkerRole;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name common.governance.renameWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to rename worker role
     *
     * @property {string} oldName  Gets the old name of worker role
     * @property {string} newName  Gets the new name of worker role
     */

    /**
     * @ngdoc type
     * @access internal
     * @name deleteWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to delete worker role
     *
     * @property {string} name  Gets the name of worker role
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.deleteWorkerRoleModel', function () {
        /*jshint validthis: true */
        function deleteWorkerRole(name) {
            this.name = name;
        }
        return deleteWorkerRole;
    });



    /**
     * @ngdoc type
     * @access internal
     * @name addCommandToWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to add command to worker role
     *
     * @property {string} workerRoleName Gets the name of worker role
     * @property {string} commandName  Gets the name of command
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addCommandToWorkerRoleModel', function () {
        /*jshint validthis: true */
        function addCommandToWorkerRoleModel(workerRoleName, commandName) {
            this.workerRoleName = workerRoleName;
            this.commandName = commandName;
        }
        return addCommandToWorkerRoleModel;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name addCommandsToWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to add multiple commands to worker role
     *
     * @property {string} workerRoleName Gets the name of worker role
     * @property {string} commandNames  Gets the list of commands
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addCommandsToWorkerRoleModel', function () {
        /*jshint validthis: true */
        function addCommandsToWorkerRoleModel(workerRoleName, commandNames) {
            this.workerRoleName = workerRoleName;
            this.commandNames = commandNames;
        }
        return addCommandsToWorkerRoleModel;
    });


    /**
    * @ngdoc type
    * @access internal
    * @name removeCommandsFromWorkerRoleModel
    * @module siemens.simaticit.common.services.governance
    *
    * @description
    * Remove a list of commands from worker role
    *
    * @property {string} workerRoleName  Gets the name of worker role
    * @property {string} commandNames  Gets the list of commands
    */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeCommandsFromWorkerRoleModel', function () {
        /*jshint validthis: true */
        function removeCommandsFromWorkerRoleModel(workerRoleName, commandNames) {
            this.workerRoleName = workerRoleName;
            this.commandNames = commandNames;
        }
        return removeCommandsFromWorkerRoleModel;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name removeCommandFromWorkerRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to remove command from worker role
     *
     * @property {string} workerRoleName  Gets the name of worker role
     * @property {string} command  Gets the name of command
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeCommandFromWorkerRoleModel', function () {
        /*jshint validthis: true */
        function removeCommandFromWorkerRoleModel(workerRoleName, command) {
            this.workerRoleName = workerRoleName;
            this.commandName = command;
        }
        return removeCommandFromWorkerRoleModel;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name addWorkerRoleToHostRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to add worker role to host role
     *
     * @property {string} hostRoleName  Gets the name of host role
     * @property {string} workerRoleName  Gets the name of worker role
     * @property {string} command Gets the name of command
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addWorkerRoleToHostRoleModel', function () {
        /*jshint validthis: true */
        function AddWorkerRoleToHostRole(hostRoleName, workerRoleName, numberOfInstances) {
            this.hostRoleName = hostRoleName;
            this.workerRoleName = workerRoleName;
            this.numberOfInstances = numberOfInstances;
        }
        return AddWorkerRoleToHostRole;
    });

    /**
     * @ngdoc type
     * @access internal
     * @name updateWorkerRoleToHostRoleModel
     * @module siemens.simaticit.common.services.governance
     *
     * @description
     * Contains objects that are used to update worker role to host role
     *
     * @property {string} hostRoleName  Gets the name of host role
     * @property {string} workerRoleName  Gets the name of worker role
     * @property {string} command Gets the name of command
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateWorkerRoleToHostRoleModel', function () {
        /*jshint validthis: true */
        function UpdateWorkerRoleToHostRole(hostRoleName, workerRoleName, numberOfInstances) {
            this.hostRoleName = hostRoleName;
            this.workerRoleName = workerRoleName;
            this.numberOfInstances = numberOfInstances;
        }
        return UpdateWorkerRoleToHostRole;
    });

    /**
    * @ngdoc type
    * @access internal
    * @name removeWorkerRoleToHostRoleModel
    * @module siemens.simaticit.common.services.governance
    *
    * @description
    * Contains objects that are used to remove worker role to host role
    *
    * @property {string} hostRoleName  Gets the name of host role
    * @property {string} workerRoleName  Gets the name of worker role
    */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeWorkerRoleToHostRoleModel', function () {
        /*jshint validthis: true */
        function RemoveWorkerRoleToHostRole(hostRoleName, workerRoleName) {
            this.hostRoleName = hostRoleName;
            this.workerRoleName = workerRoleName;
        }
        return RemoveWorkerRoleToHostRole;
    });


    /**
     * @ngdoc type
     * @access internal
     * @name createWorkerRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * Contains response objects that are used to create worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.createWorkerRoleResponse', ['CommandResponse', function (CommandResponse) {
        function createWorkerRoleResponse() { }
        createWorkerRoleResponse.prototype = new CommandResponse();
        return createWorkerRoleResponse;
    }]);


    /**
     * @ngdoc type
     * @access internal
     * @name updateWorkerRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * Contains response objects that are used to create worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateWorkerRoleResponse', ['CommandResponse', function (CommandResponse) {
        function updateWorkerRoleResponse() { }
        updateWorkerRoleResponse.prototype = new CommandResponse();
        return updateWorkerRoleResponse;
    }]);

    /**
     * @ngdoc type
     * @access internal
     * @name deleteWorkerRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * Contains response objects that are used to delete worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.deleteWorkerRoleResponse', ['CommandResponse', function (CommandResponse) {
        function deleteWorkerRoleResponse() { }
        deleteWorkerRoleResponse.prototype = new CommandResponse();
        return deleteWorkerRoleResponse;
    }]);


    /**
     * @ngdoc type
     * @access internal
     * @name addWorkerRoleToHostRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * Contains response objects that are used to add worker role to host role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addWorkerRoleToHostRoleResponse',
        ['CommandResponse', function (CommandResponse) {
            function addWorkerRoleToHostRoleResponse() { }
            addWorkerRoleToHostRoleResponse.prototype = new CommandResponse();
            return addWorkerRoleToHostRoleResponse;
        }]);

    /**
     * @ngdoc type
     * @access internal
     * @name updateWorkerRoleToHostRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * Contains response objects that are used to update worker role to host role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.updateWorkerRoleToHostRoleResponse',
        ['CommandResponse', function (CommandResponse) {
            function updateWorkerRoleToHostRoleResponse() { }
            updateWorkerRoleToHostRoleResponse.prototype = new CommandResponse();
            return updateWorkerRoleToHostRoleResponse;
        }]);


    /**
     * @ngdoc type
     * @access internal
     * @name addCommandToWorkerRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * Contains response objects that are used to add command to worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.addCommandToWorkerRoleResponse',
        ['CommandResponse', function (CommandResponse) {
            function addCommandToWorkerRoleResponse() { }
            addCommandToWorkerRoleResponse.prototype = new CommandResponse();
            return addCommandToWorkerRoleResponse;
        }]);


    /**
     * @ngdoc type
     * @access internal
     * @name removeCommandFromWorkerRoleResponse
     * @module siemens.simaticit.common.services.governance
     * @requires CommandResponse
     * @description
     * Contains response objects that are used to remove command from worker role
     *
     */
    angular.module('siemens.simaticit.common.services.governance').factory('common.services.governance.removeCommandFromWorkerRoleResponse',
        ['CommandResponse', function (CommandResponse) {
            function removeCommandFromWorkerRoleResponse() { }
            removeCommandFromWorkerRoleResponse.prototype = new CommandResponse();
            return removeCommandFromWorkerRoleResponse;
        }]);

})();

(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @access internal
     * @name common.services.governance.workerRoleServiceProvider
     * @module siemens.simaticit.common.services.governance
     * @description
     * Configures path to the OData method to utilize various worker role data services
     * used to generate required information.
     *
     * @property {string} config.oDataServiceURI Gets the URI of the data service
     */
    angular.module('siemens.simaticit.common.services.governance').provider('common.services.governance.workerRoleConfig', [function () {

        this.config = {
            oDataServiceURI: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);

    function WorkerRoleCommands($q, $resource, $http, $translate, common, CommandResponse, ExecutionError, workerRoleConfig) {

        var oDataPath = workerRoleConfig.config.oDataServiceURI;
        this.create = create;
        this.update = update;
        this.addCommands = addCommands;
        this.removeCommands = removeCommands;
        this.addCommand = addCommand;
        this.removeCommand = removeCommand;
        this.addWorkerRoleToHostRole = addWorkerRoleToHostRole;
        this.removeWorkerRoleFromHostRole = removeWorkerRoleFromHostRole;
        this.updateWorkerRoleToHostRole = updateWorkerRoleToHostRole;

        function transformCreateDataObj(data) {

            var jsonData = {
                "Name": data.name,
                "Description": data.description,
                "RetriesNumber": data.retriesNumber,
                "TargetCPU": data.targetCPU
            };

            return { command: jsonData };
        }

        function transformUpdateDataObj(data) {
            var jsonData = {
                "Name": data.name,
                "Description": data.description,
                "RetriesNumber": data.retriesNumber,
                "CommandExecutionTimeout": data.commandExecutionTimeout,
                "TargetCPU": data.targetCPU
            };

            return { command: jsonData };
        }

        function transformDeleteDataObj(data) {
            var jsonData = {
                "Name": data.name
            };

            return { command: jsonData };
        }

        function transformAddCommandDataObj(data) {
            var jsonData = {
                "WorkerRoleName": data.workerRoleName,
                "CommandName": data.commandName
            };

            return { command: jsonData };
        }

        function transformAddCommandsDataObj(data) {
            var jsonData = {
                "WorkerRoleName": data.workerRoleName,
                "CommandNames": data.commandNames
            };

            return { command: jsonData };
        }

        function transformRemoveCommandsDataObj(data) {
            var jsonData = {
                "WorkerRoleName": data.workerRoleName,
                "CommandNames": data.commandNames
            };

            return { command: jsonData };
        }

        function transformDeleteCommandDataObj(data) {
            var jsonData = {
                "WorkerRoleName": data.workerRoleName,
                "CommandName": data.commandName
            };

            return { command: jsonData };
        }

        function transformAddWorkerDataObj(data) {
            var jsonData = {
                "HostRoleName": data.hostRoleName,
                "WorkerRoleName": data.workerRoleName,
                "NumberOfInstances": data.numberOfInstances
            };

            return { command: jsonData };
        }

        function transformUpdateWorkerDataObj(data) {
            var jsonData = {
                "HostRoleName": data.hostRoleName,
                "WorkerRoleName": data.workerRoleName,
                "NumberOfInstances": data.numberOfInstances
            };

            return { command: jsonData };
        }

        function transformRemoveWorkerDataObj(data) {
            var jsonData = {
                "HostRoleName": data.hostRoleName,
                "WorkerRoleName": data.workerRoleName
            };

            return { command: jsonData };
        }

        function transformResObj(data) {
            var res = null;
            if (data) {
                try {
                    var Jsondata = JSON.parse(data);
                    if (Jsondata.Error) {
                        res = new CommandResponse(Jsondata.Succeeded, new ExecutionError(Jsondata.Error.ErrorCode, Jsondata.Error.ErrorMessage));
                        if (Jsondata.Succeeded && Jsondata.Error.ErrorCode === 0) {
                            common.logger.logInfo(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'Worker Role Command Service');
                        }
                        else {
                            common.logger.logError(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'Worker Role Command Service');
                        }
                    }
                    else {
                        res = new CommandResponse(false, new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                        common.logger.logError(Jsondata.error.code + ': ' + Jsondata.error.message, '', 'Worker Role Command Service');
                    }
                }
                catch (ex) {
                    res = new CommandResponse(false, new ExecutionError(-1, 'Error: ' + ex.message));
                    common.logger.logError('-1: Error: ' + ex.message, '', 'Worker Role Command Service');
                }

            } else {
                res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                common.logger.logError('-1: Error: Generic Error', '', 'Worker Role Command Service');
            }
            return res;
        }


        function callCreateWorkerRole() {

            return $resource('', {}, {
                create: {
                    method: 'Post',
                    url: oDataPath + 'CreateWorkerRoleCommand',
                    transformRequest: [transformCreateDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callUpdateWorkerRole() {

            return $resource('', {}, {
                update: {
                    method: 'Post',
                    url: oDataPath + 'UpdateWorkerRoleCommand',
                    transformRequest: [transformUpdateDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callDeleteWorkerRole() {

            return $resource('', {}, {
                delete: {
                    method: 'Post',
                    url: oDataPath + 'DeleteWorkerRoleCommand',
                    transformRequest: [transformDeleteDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callAddCommandsToWorkerRole() {
            return $resource('', {}, {
                addCommands: {
                    method: 'Post',
                    url: oDataPath + 'AddCommandsToWorkerRoleCommand',
                    transformRequest: [transformAddCommandsDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callRemoveCommandsToWorkerRole() {
            return $resource('', {}, {
                removeCommands: {
                    method: 'Post',
                    url: oDataPath + 'RemoveCommandsFromWorkerRoleCommand',
                    transformRequest: [transformRemoveCommandsDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }


        function callAddCommandToWorkerRole() {

            return $resource('', {}, {
                addCommand: {
                    method: 'Post',
                    url: oDataPath + 'AddCommandToWorkerRoleCommand',
                    transformRequest: [transformAddCommandDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callRemoveCommandFromWorkerRole() {

            return $resource('', {}, {
                removeCommand: {
                    method: 'Post',
                    url: oDataPath + 'RemoveCommandFromWorkerRoleCommand',
                    transformRequest: [transformDeleteCommandDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callAddWorkerRoleToHostRoleCommand() {

            return $resource('', {}, {
                addWorkerRoleToHostRole: {
                    method: 'Post',
                    url: oDataPath + 'AddWorkerRoleToHostRoleCommand',
                    transformRequest: [transformAddWorkerDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callUpdateWorkerRoleToHostRoleCommand() {

            return $resource('', {}, {
                updateWorkerRoleToHostRole: {
                    method: 'Post',
                    url: oDataPath + 'UpdateWorkerRoleToHostRoleCommand',
                    transformRequest: [transformUpdateWorkerDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        function callRemoveWorkerRoleToHostRoleCommand() {

            return $resource('', {}, {
                removeWorkerRoleToHostRole: {
                    method: 'Post',
                    url: oDataPath + 'RemoveWorkerRoleFromHostRoleCommand',
                    transformRequest: [transformRemoveWorkerDataObj].concat($http.defaults.transformRequest),
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#create
         * @param {object} common.services.governance.createWorkerRoleModel For more information see
         * {@link common.services.governance.createWorkerRoleModel  common.services.governance.createWorkerRoleModel} object
         * @returns {object} For more information see  {@link common.services.governance.createWorkerRoleResponse  common.services.governance.createWorkerRoleResponse} object
         *
         * @description
         * Creates a worker role and returns a $promise object to retrieve data
         *
         *
         */
        function create(workerRoleModel) {
            var deferred = $q.defer();

            if (workerRoleModel.name) {
                return callCreateWorkerRole().create(workerRoleModel, function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    return deferred.promise;
                }).$promise;
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.createNoName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#update
         * @param {object} common.services.governance.updateWorkerRoleModel For more information see
         * {@link common.services.governance.updateWorkerRoleModel  common.services.governance.updateWorkerRoleModel} object
         * @returns {object} For more information see  {@link common.services.governance.updateWorkerRoleResponse  common.services.governance.updateWorkerRoleResponse} object
         * @description
         * Updates a worker role and returns a $promise object to retrieve data
         */
        function update(updateWorkerRoleModel) {
            var deferred = $q.defer();

            if (updateWorkerRoleModel.name) {
                return callUpdateWorkerRole().update(updateWorkerRoleModel, function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    return deferred.promise;
                }).$promise;
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.updateNoName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#deleteModel
         * @param {object} common.services.governance.deleteWorkerRoleModel For more information see
         * {@link common.services.governance.deleteWorkerRoleModel  common.services.governance.deleteWorkerRoleModel} object
         * @returns {object} For more information see {@link common.services.governance.deleteWorkerRoleResponse  common.services.governance.deleteWorkerRoleResponse} object
         * @description
         * Deletes a worker role and returns a $promise object to retrieve data
         */
        function deleteModel(deleteWorkerRoleModel) {
            var deferred = $q.defer();

            if (deleteWorkerRoleModel.name) {
                return callDeleteWorkerRole().delete(deleteWorkerRoleModel, function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    var exeError = common.setExecutionError(err);
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                    return deferred.promise;
                }).$promise;
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.deleteNoName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#rename
         * @param {object} common.governance.renameWorkerRoleModel For more information see
         * {@link common.governance.renameWorkerRoleModel  common.governance.renameWorkerRoleModel} object
         * @returns {object} For more information see {@link common.governance.renameWorkerRoleResponse  common.governance.renameWorkerRoleResponse} object
         * @description
         * Renames a worker role and returns a $promise object to retrieve data
         */
        //this.rename =  function(renameWorkerRoleModel){
        //    var deferred = $q.defer();

        //    //if(common.isPathCorrect(oDataPath)) {
        //        if (renameWorkerRoleModel.oldName) {
        //            if (renameWorkerRoleModel.newName) {
        //                if (renameWorkerRoleModel.oldName !== renameWorkerRoleModel.newName) {
        //                    return callRenameWorkerRole().rename(renameWorkerRoleModel, function (data) {
        //                        deferred.resolve(data);
        //                        return deferred.promise;
        //                    }, function (err) {
        //                        var exeError = common.setExecutionError(err);
        //                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
        //                        return deferred.promise;
        //                    }).$promise;
        //                }
        //                else {
        //                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, 'Command Error : cannot rename a worker role with the same name')) });
        //                    return deferred.promise;
        //                }
        //            }
        //            else {
        //                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, 'Command Error : cannot rename a worker role with no New Name')) });
        //                return deferred.promise;
        //            }

        //        }
        //        else {
        //            deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, 'Command Error : cannot rename a worker role with no Old Name')) });
        //            return deferred.promise;
        //        }
        //}
        //else {
        //    deferred.reject({data:  new CommandResponse(false, new ExecutionError(-1, 'Command Error : invalid URL')) });
        //    return deferred.promise;
        //}
        //  };


        /**
        * @ngdoc method
        * @access internal
        * @name common.services.governance.workerRoleService#addCommands
        * @param {object} common.services.governance.addCommandsToWorkerRoleModel For more information see
        * {@link common.services.governance.addCommandsToWorkerRoleModel  common.services.governance.addCommandsToWorkerRoleModel} object
        * @returns {object} For more information see
        * {@link common.services.governance.addCommandToWorkerRoleResponse  common.services.governance.addCommandToWorkerRoleResponse} object
        * @description
        * Add a list of commands to worker role and returns a $promise object to retrieve data
        */
        function addCommands(addCommandsToWorkerRoleModel) {
            var deferred = $q.defer();

            if (!addCommandsToWorkerRoleModel.workerRoleName) {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addUndefWR'))) });
                return deferred.promise;
            }

            if (!addCommandsToWorkerRoleModel.commandNames) {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addUndefCommands'))) });
                return deferred.promise;
            }

            if (addCommandsToWorkerRoleModel.commandNames.length <= 0) {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addEmptyCommands'))) });
                return deferred.promise;
            }

            return callAddCommandsToWorkerRole().addCommands(addCommandsToWorkerRoleModel, function (data) {
                deferred.resolve(data);
                return deferred.promise;
            }, function (err) {
                var exeError = common.setExecutionError(err);
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                return deferred.promise;
            }).$promise;
        }

        /**
       * @ngdoc method
       * @access internal
       * @name common.services.governance.workerRoleService#removeCommands
       * @param {object} common.services.governance.addCommandsToWorkerRoleModel For more information see
       * {@link common.governance.removeCommandsToWorkerRoleModel  common.services.governance.addCommandsToWorkerRoleModel} object
       * @returns {object} For more information see {@link common.services.governance.addCommandToWorkerRoleResponse  common.governance.removeCommandToWorkerRoleResponse} object
      * @description
       * Remove a list of commands from a  worker role and returns a $promise object to retrieve data
       */
        function removeCommands(removeCommandsToWorkerRoleModel) {
            var deferred = $q.defer();

            if (!removeCommandsToWorkerRoleModel.workerRoleName) {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.remUndefWR'))) });
                return deferred.promise;
            }

            if (!removeCommandsToWorkerRoleModel.commandNames) {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.remUndefCommands'))) });
                return deferred.promise;
            }

            if (removeCommandsToWorkerRoleModel.commandNames.length <= 0) {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.remEmptyCommands'))) });
                return deferred.promise;
            }

            return callRemoveCommandsToWorkerRole().removeCommands(removeCommandsToWorkerRoleModel, function (data) {
                deferred.resolve(data);
                return deferred.promise;
            }, function (err) {
                var exeError = common.setExecutionError(err);
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                return deferred.promise;
            }).$promise;
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#addCommand
         * @param {object} common.services.governance.addCommandToWorkerRoleModel For more information see
         * {@link common.services.governance.addCommandToWorkerRoleModel  common.services.governance.addCommandToWorkerRoleModel} object
         * @returns {object} For more information sees
         * {@link common.services.governance.addCommandToWorkerRoleResponse  common.services.governance.addCommandToWorkerRoleResponse} object
         * @description
         * Adds a command to worker role and returns a $promise object to retrieve data
         */
        function addCommand(addCommandToWorkerRoleModel) {
            var deferred = $q.defer();

            if (addCommandToWorkerRoleModel.workerRoleName) {
                if (addCommandToWorkerRoleModel.commandName) {
                    return callAddCommandToWorkerRole().addCommand(addCommandToWorkerRoleModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addNoCommandName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addNoWRName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#removeCommand
         * @param {object} common.services.governance.removeCommandFromWorkerRoleModel For more information see
         * {@link common.services.governance.removeCommandFromWorkerRoleModel  common.services.governance.removeCommandFromWorkerRoleModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.removeCommandFromWorkerRoleResponse  common.services.governance.removeCommandFromWorkerRoleResponse} object
         * @description
         * Removes a command from worker role and returns a $promise object to retrieve data
         */
        function removeCommand(removeCommandFromWorkerRoleModel) {
            var deferred = $q.defer();

            if (removeCommandFromWorkerRoleModel.workerRoleName) {
                if (removeCommandFromWorkerRoleModel.commandName) {
                    return callRemoveCommandFromWorkerRole().removeCommand(removeCommandFromWorkerRoleModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.remNoCommandName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.remNoWRName'))) });
                return deferred.promise;
            }
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#addWorkerRoleToHostRole
         * @param {object} common.services.governance.addWorkerRoleToHostRoleModel For more information see
         * {@link common.services.governance.addWorkerRoleToHostRoleModel  common.services.governance.addWorkerRoleToHostRoleModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.addWorkerRoleToHostRoleResponse  common.services.governance.addWorkerRoleToHostRoleResponse} object
         * @description
         * Adds a worker role to host role and returns a $promise object to retrieve data
         */
        function addWorkerRoleToHostRole(addWorkerRoleToHostRoleModel) {
            var deferred = $q.defer();

            if (addWorkerRoleToHostRoleModel.hostRoleName) {
                if (addWorkerRoleToHostRoleModel.workerRoleName) {
                    return callAddWorkerRoleToHostRoleCommand().addWorkerRoleToHostRole(addWorkerRoleToHostRoleModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addWRNoWRName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addWRNoHRName'))) });
                return deferred.promise;
            }

        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#removeWorkerRoleToHostRole
         * @param {object} common.services.governance.removeWorkerRoleToHostRoleModel For more information see
         * {@link common.services.governance.removeWorkerRoleToHostRoleModel  common.services.governance.removeWorkerRoleToHostRoleModel} object
         * @returns {object} For more information see {@link common.governance.removeWorkerRoleToHostRoleResponse  common.governance.removeWorkerRoleToHostRoleResponse} object
         * @description
         * Removes a worker role from host role and returns a $promise object to retrieve data
         */
        function removeWorkerRoleFromHostRole(removeWorkerRoleToHostRoleModel) {
            var deferred = $q.defer();

            if (removeWorkerRoleToHostRoleModel.hostRoleName) {
                if (removeWorkerRoleToHostRoleModel.workerRoleName) {
                    return callRemoveWorkerRoleToHostRoleCommand().removeWorkerRoleToHostRole(removeWorkerRoleToHostRoleModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.remWRNoWRName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.remWRNoHRName'))) });
                return deferred.promise;
            }

        }



        /**
         * @ngdoc method
         * @access internal
         * @name common.services.governance.workerRoleService#updateWorkerRoleToHostRole
         * @param {object} common.services.governance.updateWorkerRoleToHostRoleModel For more information see
         * {@link common.services.governance.updateWorkerRoleToHostRoleModel  common.services.governance.updateWorkerRoleToHostRoleModel} object
         * @returns {object} For more information see
         * {@link common.services.governance.updateWorkerRoleToHostRoleResponse  common.services.governance.updateWorkerRoleToHostRoleResponse} object
         * @description
         * Updates a worker role to host role and returns a $promise object to retrieve data
         */

        function updateWorkerRoleToHostRole(updateWorkerRoleToHostRoleModel) {
            var deferred = $q.defer();
            if (updateWorkerRoleToHostRoleModel.hostRoleName) {
                if (updateWorkerRoleToHostRoleModel.workerRoleName) {
                    return callUpdateWorkerRoleToHostRoleCommand().updateWorkerRoleToHostRole(updateWorkerRoleToHostRoleModel, function (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }, function (err) {
                        var exeError = common.setExecutionError(err);
                        deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                        return deferred.promise;
                    }).$promise;
                }
                else {
                    deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addWRNoWRName'))) });
                    return deferred.promise;
                }
            }
            else {
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.workerRole.addWRNoHRName'))) });
                return deferred.promise;
            }


        }

        // adding at the end since js-hint is showing unused warning;
        this.delete = deleteModel;

    }

    /**
     * @ngdoc service
     * @access internal
     * @name common.services.governance.workerRoleService
     * @module siemens.simaticit.common.services.governance
     *
     * @requires $q
     * @requires $resource
     * @requires $http
     * @requires common
     * @requires CommandResponse
     * @requires ExecutionError
     * @requires common.services.governance.workerRoleServiceProvider
     *
     * @description
     * Contains data related services that are used by governance to retrieve worker role data
     *
     */
    angular.module('siemens.simaticit.common.services.governance').service('common.services.governance.workerRoleService',
        ['$q', '$resource', '$http', '$translate', 'common', 'CommandResponse', 'ExecutionError',
            'common.services.governance.workerRoleConfig', WorkerRoleCommands]);


})();
