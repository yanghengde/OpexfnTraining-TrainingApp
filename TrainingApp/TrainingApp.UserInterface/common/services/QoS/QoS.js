/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.services.security
     * @module siemens.simaticit.common
     *
     * @description
     * This module provides services and  providers that manage security related functionalities.
     *
     */
    angular.module('siemens.simaticit.common.services.security', []);

})();

'use strict';
var siemens;
(function (siemens) {
    var simaticit;
    (function (simaticit) {
        var common;
        (function (common) {
            var services;
            (function (services) {
                var security;
                (function (security) {
                    var UIAuthSvc = /** @class */ (function () {
                        function UIAuthSvc($q, CONFIG, securityService, functionRightModel, authenticationSvc) {
                            this.$q = $q;
                            this.CONFIG = CONFIG;
                            this.securityService = securityService;
                            this.functionRightModel = functionRightModel;
                            this.authenticationSvc = authenticationSvc;
                            this._this = this;
                            this.securableScreens = [];
                            this.authorizedScreens = [];
                            this.isFunctionalRightsLoaded = false;
                        }
                        UIAuthSvc.prototype.initialize = function () {
                            var deferred = this.$q.defer();
                            var that = this;
                            this.securableScreens = [];
                            this.authorizedScreens = [];
                            this.CONFIG.menu.forEach(function (menuItem) {
                                if (menuItem.contents && menuItem.contents.length > 0) {
                                    menuItem.contents.forEach(function (content) {
                                        if (content.securable === true) {
                                            that.securableScreens.push(content.id);
                                        }
                                    });
                                }
                                else if (menuItem.securable === true) {
                                    that.securableScreens.push(menuItem.id);
                                }
                            });
                            if (that.securableScreens.length > 0) {
                                if (that.CONFIG.mode === 'test' && that.isAdminUser()) {
                                    that.authorizedScreens = that.securableScreens;
                                    that.isFunctionalRightsLoaded = true;
                                    deferred.resolve();
                                }
                                else {
                                    //we need to send request only once to get the complete list
                                    var functionRight = new that.functionRightModel("screen", that.securableScreens[0], "view");
                                    var funRightListModel = [functionRight];
                                    that.securityService.canPerformOp(funRightListModel).then(function () {
                                        that.securityService.rightList.forEach(function (object) {
                                            that.authorizedScreens.push(object.object_name);
                                        });
                                        that.authorizedScreens = _.uniq(that.authorizedScreens);
                                        that.isFunctionalRightsLoaded = true;
                                        deferred.resolve();
                                    }, function (error) {
                                        that.isFunctionalRightsLoaded = true;
                                        deferred.reject(error);
                                    });
                                }
                            }
                            else {
                                that.isFunctionalRightsLoaded = true;
                                deferred.resolve();
                            }
                            return deferred.promise;
                        };
                        UIAuthSvc.prototype.isAdminUser = function () {
                            var that = this;
                            var isAdmin = false;
                            if (that.authenticationSvc._userGroup) {
                                if (_.isArray(that.authenticationSvc._userGroup)) {
                                    that.authenticationSvc._userGroup.forEach(function (str) {
                                        if (str.search('SIT_UAF_SYSADMIN') > -1) {
                                            isAdmin = true;
                                        }
                                    });
                                }
                                else {
                                    isAdmin = that.authenticationSvc._userGroup.search('SIT_UAF_SYSADMIN') > -1;
                                }
                            }
                            return isAdmin;
                        };
                        UIAuthSvc.prototype.getAuthorizedScreens = function () {
                            return this.authorizedScreens;
                        };
                        UIAuthSvc.prototype.getSecurableScreens = function () {
                            return this.securableScreens;
                        };
                        UIAuthSvc.prototype.isScreenAccessible = function (screenName) {
                            var that = this;
                            if (_.contains(that.securableScreens, screenName)) {
                                if (_.contains(that.authorizedScreens, screenName)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return true;
                            }
                        };
                        UIAuthSvc.$inject = ['$q', 'CONFIG', 'common.services.security.securityService', 'common.services.security.functionRightModel', 'common.services.ui.authentication'];
                        return UIAuthSvc;
                    }());
                    security.UIAuthSvc = UIAuthSvc;
                    angular.module('siemens.simaticit.common.services.security')
                        .service('common.services.security.ui.authorization', UIAuthSvc);
                })(security = services.security || (services.security = {}));
            })(services = common.services || (common.services = {}));
        })(common = simaticit.common || (simaticit.common = {}));
    })(simaticit = siemens.simaticit || (siemens.simaticit = {}));
})(siemens || (siemens = {}));
//# sourceMappingURL=authorization-ui-svc.js.map
(function () {
    'use strict';

    /**
     * @ngdoc type
     * @name functionRightModel
     * @module siemens.simaticit.common.services.security
     *
     * @description
     * An object used to model a user function right.
     *
     * @property {String} categoryName The category name of a specific user function right.
     * Valid values are:
     *  * business_command
     *  * business_event
     *  * business_signal
     *  * screen
     *  * entity
     * @property {String} objectName The object name of a specific user function right.
     * The value of this parameter is the FullName of the object (Command, Event, Signal, Screen or Entity) as defined in the Project Studio
     * @property {String} operationName The operation name of a user specific function right.
     * Valid values are:
     * * invoke (for business_command category)
     * * subscribe or unsubscribe (for business_event or business_signal categories)
     * * fire (for business_event category)
     * * read (for entity category)
     * * view (for screen category)
     *
     */
    /**
     * @ngdoc service
     * @name common.services.security.functionRightModel
     * @module siemens.simaticit.common.services.security
     * @description
     * A factory used to create {@link type:functionRightModel} objects.
     */
    angular.module('siemens.simaticit.common.services.security').factory('common.services.security.functionRightModel', function () {
        function functionRight (categoryName, objectName, operationName) {
            this.categoryName = categoryName;
            this.objectName = objectName;
            this.operationName = operationName;
        }
        return  functionRight;
    });

    /**
     * @ngdoc type
     * @name functionRightListModel
     * @module siemens.simaticit.common.services.security
     *
     * @description
     * Contains list of {@link type:functionRightModel} objects.
     *
     * @property {functionRightModel[]} functionRightList An array of {@link type:functionRightModel} objects.
     * Please Note that all the functionRightModel objects on the functionRightList must have the same category.
     *
     */
    /**
     * @ngdoc service
     * @name common.services.security.functionRightListModel
     * @module siemens.simaticit.common.services.security
     * @description
     * A factory used to create {@link type:functionRightListModel} objects.
     */
    angular.module('siemens.simaticit.common.services.security').factory('common.services.security.functionRightListModel', function () {
        function functionRightList (functionRightL) {
            this.functionRightList = functionRightL;
        }
        return  functionRightList;
    });

    /**
     * @ngdoc type
     * @name securityResponse
     * @module siemens.simaticit.common.services.security
     * @requires service:ExecutionError
     *
     * @description
     * An object used to model security responses.
     *
     * @property {String} categoryName The category name of a specific user function right.
     * @property {String} objectName The domain name of a specific user function right.
     * @property {String} operationName A list of user function rights.
     * @property {Boolean} isAccessible The accessibility of a specific user function right.
     * @property {ExecutionError} error {@link type:ExecutionError} object for a runtime error.
     *
     */
    /**
     * @ngdoc service
     * @name common.services.security.securityResponse
     * @module siemens.simaticit.common.services.security
     * @description
     * A factory used to create {@link type:securityResponse} objects.
     */
    angular.module('siemens.simaticit.common.services.security').factory('common.services.security.securityResponse', ['ExecutionError', function (ExecutionError) {
        function securityResponse(_categoryName, _objectName, _operationName, isAccessible, error) {
            this.categoryName = _categoryName;
            this.objectName = _objectName;
            this.operationName = _operationName;
            this.isAccessible = isAccessible || false;
            this.error = $.extend(new ExecutionError(), error || {errorCode: 0, errorMessage:''});
        }
        return securityResponse;
    }]);

})();

/*jshint -W069 */
(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @name common.services.security.configProvider
     * @module siemens.simaticit.common.services.security
     * @description
     * Provider used to set the path to the OData endpoint for security services.
     *
     * @property {Object} config An object containing an **oDataServiceURI** string corresponding to the URI of the security service endpoint.
     */
    angular.module('siemens.simaticit.common.services.security').provider('common.services.security.config', [function () {

        this.config = {
            oDataServiceURI: ''
        };

        /**
         * @ngdoc service
         * @name common.services.security.config
         * @module siemens.simaticit.common.services.security
         * @description
         * Service used to set the path to the OData endpoint for security services.
         *
         * @property {Object} config An object containing an **oDataServiceURI** string corresponding to the URI of the security service endpoint.
         */

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);

    function SecurityCommands($q, $http, common, ExecutionError, SecurityResponse, CommandResponse, securityProvider) {
        var _config = securityProvider.config.oDataServiceURI;
        var _roleIdentity = null;
        var _rightList = null;
        var _error = false;
        this.canPerformOp = canPerformOp;
        var svc = this;
        var deferredQueue = {};


        common.authentication.getCurrentUser().then(null, null, function (user) {
            if (!user) {
                _roleIdentity = null;
            }
        });


        function getRights(fnRights) {
            var res = [];
            try {
                fnRights.forEach(function (item) {
                    res.push({
                        category_name: item.category_name,
                        object_name: item.object_name,
                        operation_name: item.operation_name
                    });
                    if (item['function_rights'] && item['function_rights'].length > 0) {
                        var sub = getRights(item['function_rights']);
                        res = res.concat(sub);
                    }

                });
            } catch (ex) {
                _error = true;
            }
            return res;
        }


        function getFunctionRightPermission(list, category) {
            try {
                if (!(_rightList && _rightList.length > 0 && _rightList[0].category_name === category)) {
                    var roles = _roleIdentity[category]['role_associations'];
                    _rightList = [];
                    roles.forEach(function (role) {
                        _rightList = _rightList.concat(getRights(role['function_rights']));
                    });

                }
                svc.rightList = _rightList || [];
                list.forEach(function (rightToCheck) {
                    if (_error) {
                        rightToCheck.error.errorCode = -1;
                        rightToCheck.error.errorMessage = 'generic Error';
                    } else {
                        var res = _.findWhere(_rightList, {
                            category_name: rightToCheck.categoryName,
                            object_name: rightToCheck.objectName,
                            operation_name: rightToCheck.operationName
                        });
                        if (res) {
                            rightToCheck.isAccessible = true;
                        }
                    }
                });
            } catch (ex) {
                _error = true;
                common.logger.logError('getFunctionRightPermission', ex, 'siemens.simaticit.common.services.security');
            }

        }


        function getClaims(category) {
            var deferred = $q.defer();
            var isToKeepInCache = (_roleIdentity) && _roleIdentity.hasOwnProperty(category);

            if (!isToKeepInCache) {
                if (deferredQueue[category] === undefined) {
                    deferredQueue[category] = [];
                }
                deferredQueue[category].push(deferred);

                if (deferredQueue[category].length === 1) {
                    $http.post(_config + 'GetCurrentIdentityClaimsCommand', { "command": { "Category": category } })
                            .then(function (jsonData) {
                                if (!_roleIdentity) {
                                    _roleIdentity = {};
                                }
                                _roleIdentity[category] = JSON.parse(jsonData.data.Identity);
                                _.each(deferredQueue[category], function (value) {
                                    value.resolve();
                                });
                                deferredQueue[category] = undefined;
                            }, function () {
                                common.logger.logError('-1: Command Error: user data is not present', '', 'QoS Security Service');
                                _.each(deferredQueue[category], function (value) {
                                    value.reject();
                                });
                                deferredQueue[category] = undefined;
                            }
                    ).catch(function () {
                        _.each(deferredQueue[category], function (value) {
                            common.logger.logError('-1: Command Error: Service unavailable', '', 'QoS Security Service');
                            value.reject();
                        });
                        deferredQueue[category] = undefined;
                    });

                }
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }


        /**
         * @ngdoc method
         * @name common.services.security.securityService#canPerformOp
         * @param {functionRightListModel} funcRightListModel List of function rights. For more information, see {@link type:functionRightListModel}.
         * @returns {Promise} A promise object containing a security response.
         * @description Checks whether the user has the required rights to perform the specified operations.
         * For more information, see {@link type:securityResponse} object.
         *
         * @example
         * In a controller, the **common.services.security.securityService** service is used as follows:
         *
         * ```
        * (function () {
        * 'use strict';
        *
        *   SecurityExampleController.$inject = ['common.services.security.securityService' ];
        *   function SecurityExampleController(securityService) {
        *       var vm = this;
        *
        *       activate();
        *
        *       function activate() {
        *
        *           vm.resCanPerfOp = null;
        *           vm.functionRightsItems = [];
        *
        *          var firstFR = new FunctionRightModel(vm.FirstCategoryName, vm.FirstObjectName, vm.FirstOperationName);
        *          var secondFR = new FunctionRightModel(vm.SecondCategoryName, vm.SecondObjectName, vm.SecondOperationName);
        *          vm.funRightListModel = [firstFR, secondFR];
        *          securityService.canPerformOp(secC.funRightListModel).then(function (data) {
        *              if (data) {
        *                if (data.length > 0) {
        *                   vm.functionRightsItems = data;
        *                }
        *              }
        *          }, function (resError) {
        *               //Manage Error Condition
        *
        *          });
        *      }
        *
        *   }
        *   angular.module('siemens.simaticit.common').controller('securityExampleController', SecurityExampleController);
        * })();
        * ```
        * where the categories (first parameters) can be one of the following:
         *
         */
        function canPerformOp(funcRightListModel) {
            var deferred = $q.defer();
            var res = [];
            var err = null;

             var category = null;
            if (funcRightListModel.length <= 0) {
                err = new CommandResponse(false, new ExecutionError(-1, "You must specify an array with at least one Right."));
                common.logger.logError("-1" + ' : ' + "You must specify an array with at least one Right.", '', 'Security Service');

                deferred.reject(err);
                return deferred.promise;

            }

            category = funcRightListModel[0].categoryName;

            //init result
            var sameCategory = true;
            res = _.map(funcRightListModel, function (item) {
                if (item.categoryName !== category) {
                    sameCategory = false;
                }
                return new SecurityResponse(item.categoryName, item.objectName, item.operationName);
            });

            if (!sameCategory) {
                err = new CommandResponse(false, new ExecutionError(-1, "You must specify the same category for all the array elements."));
                common.logger.logError("-1" + ' : ' + "You must specify the same category for all the array elements.", '', 'Security Service');

                deferred.reject(err);
                return deferred.promise;
            }
            //check _roleIdentity variable


            getClaims(category).then(function () {
                getFunctionRightPermission(res, category);
                deferred.resolve(res);
            }, function () {
                deferred.reject(res);
            });


            return deferred.promise;

        }

    }


    /**
     * @ngdoc service
     * @name common.services.security.securityService
     * @module siemens.simaticit.common.services.security
     *
     * @requires $q
     * @requires $http
     * @requires service:ExecutionError
     * @requires common.services.security.securityResponse
     * @requires common.services.security.config
     *
     * @description
     * Exposes methods that can be used to manage security related operations.
     * @example
    * In a controller, the **common.services.security.securityService** service is used as follows:
    * ```
    *(function () {
    *   'use strict';
    *
    *   SecurityExampleController.$inject = ['common.services.security.securityService', 'common.services.security.functionRightModel'];
    *   function SecurityExampleController(securityService, FunctionRightModel) {
    *           var vm = this;
    *
    *           activate();
    *
    *           function activate() {
    *                  vm.functionRightsItems = [];
    *                  var FR = new FunctionRightModel('business_command', 'test.expert.newRoleApp.newRoleApp.TEPOMModel.Commands.compSec', 'invoke');
    *                  vm.funRightListModel = [FR];
    *                  securityService.canPerformOp(vm.funRightListModel).then(function (data) {
    *                          if (data) {
    *                                if (data.length > 0) {
    *                                       vm.functionRightsItems = data;
    *                                }
    *                          }
    *                   }, function (resError) {
    *                               //Manage Error Condition
    *                   });
    *           }
    *
    *   }
    *   angular.module('siemens.simaticit.common').controller('securityExampleController', SecurityExampleController);
    *})();
    * ```
    */
    angular.module('siemens.simaticit.common.services.security').service('common.services.security.securityService',
        ['$q', '$http', 'common', 'ExecutionError', 'common.services.security.securityResponse', 'CommandResponse', 'common.services.security.config', SecurityCommands]);

})();
