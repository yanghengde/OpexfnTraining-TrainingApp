/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.base
     * @module siemens.simaticit.common
     * @description
     * A container for common UI Application constants.
     *
     */
   angular.module('siemens.simaticit.common.base',[]);


})();

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common
     * @module siemens.unity.core
     * @description
     * The base module which acts as a container for all the common services and widgets distributed with the UI Framework.
     *
     *
     */
    angular.module('siemens.simaticit.common', [
	'siemens.simaticit.common.templates',
    'siemens.simaticit.common.base',
    'pascalprecht.translate',
    'siemens.simaticit.common.services.configUtil',
    'siemens.simaticit.common.services.session',
    'siemens.simaticit.common.services.cookie',
    'siemens.simaticit.common.services.timer',
    'siemens.simaticit.common.services.umc',
    'siemens.simaticit.common.services.globalization',
    'siemens.simaticit.common.services.data.authentication',
    'siemens.simaticit.common.services.auth',
    'siemens.simaticit.common.services.ui.authentication',
    'siemens.simaticit.common.services.signalManager',
    'siemens.simaticit.common.services.logger',
    'siemens.simaticit.common.services.layout',
    'siemens.simaticit.common.services.administration',
    'siemens.simaticit.common.services.governance',
    'siemens.simaticit.common.services.security',
    'siemens.simaticit.common.services.engineering',
    'siemens.simaticit.common.services.documentation',
    'siemens.simaticit.common.widgets.service',
    'siemens.simaticit.common.widgets.busyIndicator',
    'siemens.simaticit.common.services.runtime',
    'siemens.simaticit.common.services.component',
    'siemens.simaticit.common.services.swac',
    'siemens.simaticit.common.services.personalization',
    'siemens.simaticit.common.services.filterPersonalization',
    'siemens.simaticit.common.services.electronicSignature',
    'siemens.simaticit.common.services.nervebox',
    "siemens.simaticit.common.widgets.momIcon",
    'siemens.simaticit.common.widgets.accordion',
    'siemens.simaticit.common.widgets.tabset',
    'siemens.simaticit.common.widgets.carousel',
    'siemens.simaticit.common.widgets.component',
    'siemens.simaticit.common.widgets.commandBar',
    'siemens.simaticit.common.widgets.dialog',
    'siemens.simaticit.common.widgets.dialog-button',
    'siemens.simaticit.common.widgets.fileUpload',
    'siemens.simaticit.common.widgets.flyout',
    'siemens.simaticit.common.widgets.grid',
    'siemens.simaticit.common.widgets.overlay',
    'siemens.simaticit.common.widgets.checkbox',
    'siemens.simaticit.common.widgets.tristateCheckbox',
    'siemens.simaticit.common.widgets.datePicker',
    'siemens.simaticit.common.widgets.email',
    'siemens.simaticit.common.widgets.fullscreenDialog',
    'siemens.simaticit.common.widgets.headerButton',
    'siemens.simaticit.common.widgets.label',
    'siemens.simaticit.common.widgets.numeric',
    'siemens.simaticit.common.widgets.password',
    'siemens.simaticit.common.widgets.radio',
    'siemens.simaticit.common.widgets.richRadio',
    'siemens.simaticit.common.widgets.select',
    'siemens.simaticit.common.widgets.sidepanel',
    'siemens.simaticit.common.widgets.table',
    'siemens.simaticit.common.widgets.text',
    'siemens.simaticit.common.widgets.textarea',
    'siemens.simaticit.common.widgets.icon',
    'siemens.simaticit.common.widgets.timePicker',
    'siemens.simaticit.common.widgets.toolbox',
    'siemens.simaticit.common.widgets.typeahead',
    'siemens.simaticit.common.widgets.propertyGrid',
    'siemens.simaticit.common.widgets.navigation-link',
    'siemens.simaticit.common.widgets.tiles',
    'siemens.simaticit.common.widgets.validator',
    'siemens.simaticit.common.widgets.pager',
    'siemens.simaticit.common.widgets.entityPicker',
    'siemens.simaticit.common.widgets.dateTimePicker',
    'siemens.simaticit.common.widgets.itemCollectionViewer',
    'siemens.simaticit.common.widgets.sidebar',
    'siemens.simaticit.common.widgets.breadcrumb',
    'siemens.simaticit.common.widgets.notificationTile',
    'siemens.simaticit.common.widgets.graph',
    'siemens.simaticit.common.widgets.dataSource',
    'siemens.simaticit.common.widgets.filter',
    'siemens.simaticit.common.services.filterSort',
    'siemens.simaticit.common.widgets.multiSelect',
    'siemens.simaticit.common.widgets.bindDynamicHtml',
    'siemens.simaticit.common.widgets.highlight',
    'siemens.simaticit.common.widgets.status',
    'siemens.simaticit.common.components.documentation',
    'siemens.simaticit.common.components.mashup',
    'siemens.simaticit.common.widgets.iconPicker',
    'siemens.simaticit.common.widgets.sortableAccordion',
    'siemens.simaticit.common.widgets.flowEditor',
    'siemens.simaticit.common.widgets.taglist',
    'siemens.simaticit.common.widgets.columnConfigurator',
    'siemens.simaticit.common.widgets.tileConfigurator',
    'siemens.simaticit.common.services.modelDriven',
    'siemens.simaticit.common.widgets.auditTrail',
    'siemens.simaticit.common.widgets.characteristicRepr',
    'siemens.simaticit.common.widgets.textEditor',
    'siemens.simaticit.common.widgets.workInstructionInstanceViewer',
    'siemens.simaticit.common.widgets.documentViewer',
    'siemens.simaticit.common.widgets.tagsManager',
    'siemens.simaticit.common.widgets.nervebox',
    'siemens.simaticit.common.widgets.electronicSignature',
    'siemens.simaticit.common.widgets.advancedSelect',
    'siemens.simaticit.common.widgets.filterPanel',
    'siemens.simaticit.common.widgets.homeCard',
    'siemens.simaticit.common.widgets.homeTile',
    'siemens.simaticit.common.widgets.popUpPanel',
    'siemens.simaticit.common.components.task',
    'siemens.simaticit.common.widgets.containers',
    'siemens.simaticit.common.widgets.pagination',
    'siemens.simaticit.common.widgets.mduiBreadcrumb',
    'ui.codemirror',
    'ui.sortable',
    'nvd3'
    ]);
})();

"use strict";
/// <reference path="session.svc.ts" />
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        angular.module('siemens.simaticit.common.services.configUtil', []);
        /**
            * @ngdoc module
            * @name siemens.simaticit.common.services.configUtil
            * @module siemens.simaticit.common
            *
            * @description
            * Contains services exposing configuration utilities.
            *
            *
            */
        angular.module('siemens.simaticit.common.services.configUtil')
            .config(['common.services.data.config.endpointsConfigProvider', function (endpointsConfigProvider) {
                endpointsConfigProvider.config.serviceEndpointsUrl = '/sit-svc/config';
                endpointsConfigProvider.config.signalEnpointsUrl = '/sit-svc/runtime/signals';
            }]);
        var EndpointsConfig = /** @class */ (function () {
            function EndpointsConfig() {
                this.config = {
                    serviceEndpointsUrl: '',
                    signalEnpointsUrl: ''
                };
            }
            EndpointsConfig.prototype.$get = function () {
                return {
                    config: this.config
                };
            };
            return EndpointsConfig;
        }());
        framework.EndpointsConfig = EndpointsConfig;
        /**
        * @ngdoc provider
        * @name common.services.data.config.endpointsConfig
        * @module siemens.simaticit.common.services.configUtil
        * @access internal
        * @description
        * Configures path to the OData method to utilize endpoint services
        * used to generate required information
        *
        * @property {string} config.serviceEndpointsUrl and config.signalEnpointsUrl Gets the URI of the data service
        */
        angular.module('siemens.simaticit.common.services.configUtil').provider('common.services.data.config.endpointsConfig', EndpointsConfig);
        var ConfigDataService = /** @class */ (function () {
            function ConfigDataService($http, $q, endpointsConfig) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.endpointsConfig = endpointsConfig;
                /**
                    * @ngdoc method
                    * @name common.services.data.config#queryServiceEndpoints
                    * @description
                    * Retrieves the service endpoint URIs.
                    * @returns {Promise} A Promise object containing service endpoints.
                    *
                    */
                this.queryServiceEndpoints = function () {
                    var deferred = _this.$q.defer();
                    _this._$http.get(_this.servicesPath).then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                /**
                    * @ngdoc method
                    * @name common.services.data.config#querySignalEndpoints
                    * @description
                    * Retrieves signal endpoint URIs.
                    * @returns {Promise} A Promise object containing signal endpoints.
                    *
                    */
                this.querySignalEndpoints = function () {
                    var deferred = _this.$q.defer();
                    _this._$http.get(_this.signalsPath).then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this._$http = $http;
                this.servicesPath = endpointsConfig.config.serviceEndpointsUrl;
                this.signalsPath = endpointsConfig.config.signalEnpointsUrl;
            }
            ConfigDataService.$inject = ["$http", "$q", "common.services.data.config.endpointsConfig"];
            return ConfigDataService;
        }());
        framework.ConfigDataService = ConfigDataService;
        /**
            * @ngdoc service
            * @name common.services.data.config
            * @module siemens.simaticit.common.services.configUtil
            *
            * @description
            * This service can be used to retrieve service layer and signal endpoints.
            *
            */
        angular.module('siemens.simaticit.common.services.configUtil')
            .service('common.services.data.config', ConfigDataService);
        var ConfigUtilService = /** @class */ (function () {
            function ConfigUtilService(configDataService, $q) {
                var _this = this;
                this.configDataService = configDataService;
                this.$q = $q;
                /**
                    * @ngdoc method
                    * @name common.services.configUtil#getServiceEndpoints
                    * @description
                    * Retrieves service endpoint URIs.
                    * @returns {Promise} A Promise object containing service endpoints.
                    *
                    */
                this.getServiceEndpoints = function () {
                    var deferred = _this.$q.defer();
                    _this.configDataService.queryServiceEndpoints().then(function (data) {
                        deferred.resolve(data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                /**
                    * @ngdoc method
                    * @name common.services.configUtil#getSignalEndpoints
                    * @description
                    * Retrieves signal endpoint URIs.
                    * @returns {Promise} A Promise object containing signal endpoints.
                    *
                    */
                this.getSignalEndpoints = function () {
                    var deferred = _this.$q.defer();
                    _this.configDataService.querySignalEndpoints().then(function (data) {
                        deferred.resolve(data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
            }
            ConfigUtilService.$inject = ["common.services.data.config", "$q"];
            return ConfigUtilService;
        }());
        framework.ConfigUtilService = ConfigUtilService;
        /**
            * @ngdoc service
            * @name common.services.configUtil
            * @module siemens.simaticit.common.services.configUtil
            *
            * @description
            * This service can be used to retrieve service layer and configuration endpoints.
            *
            */
        angular.module('siemens.simaticit.common.services.configUtil')
            .service('common.services.configUtil', ConfigUtilService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=config-util-mod.js.map
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.services.layout
     * @module siemens.simaticit.common
     * @description
     * This module provides functionalities related to creating the application layout.
     *
     *
     *
     */
    angular.module('siemens.simaticit.common.services.layout',['ui.router']);


})();

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.services.logger
     * @module siemens.simaticit.common
     * @description
     * Contains functionality related to logging messages.
     *
     *
     *
     */
    angular.module('siemens.simaticit.common.services.logger', []);


})();

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.services.umc
     * @module siemens.simaticit.common
     * @description
     * Contains functionalities related to user management component.
     */
    angular.module('siemens.simaticit.common.services.umc', []);

})();

//load config.js file (if exists) and create CONFIG angular constants
//load config.json (if exists) and merge config.json keys into APPCONFIG constants.
//manual bootstrap application
(function () {
    'use strict';
    ///var module = angular.module('siemens.simaticit.common');
    var initInjector = angular.injector(['ng', 'siemens.simaticit.common.services.configUtil']);
    var $http = initInjector.get('$http');
    var $q = initInjector.get('$q');
    var configUtilService = initInjector.get('common.services.configUtil');
    var configTextFn;
    var supportedLocales = [];
    var APP_CONFIG_TYPE_VALUES = {
        RUNTIME: 'runtime',
        STUDIO: 'studio',
        DEBUG: 'debug',
        MDUI: 'mdui',
        DOC: 'doc',
        DEV: 'dev'
    };
    var APP_CONFIG_MODE_VALUES = {
        NORMAL: 'normal',
        SWAC: 'swac'
    };
    var appConfig = {
        type: APP_CONFIG_TYPE_VALUES.RUNTIME,
        mode: APP_CONFIG_MODE_VALUES.NORMAL
    };

    /*
     *  loading config.json file and retrieving endpoints from /sit-svc/config
     */
    function fetchData() {

        var path = '../config.json';
        var type;
        if (configTextFn) {
            var re = /('type'\s*?:\s*?'.*')/; //NOSONAR
            type = re.exec(configTextFn);
        }

        if (type && type[0] && type[0].indexOf('rt') >= 0) {
            path = '/sit-ui/system/config.json';
        }
        var deferred = $q.defer();
        $http.get(path).then(function (response) {
            configUtilService.getServiceEndpoints().then(function (endpoints) {
                var configData = angular.extend({}, response.data, endpoints);
                createAppConfig(deferred, configData);
            }, function () {
                createAppConfig(deferred, response.data);
            });
        }).catch(function () {
            createAppConfig(deferred);
        });
        return deferred.promise;
    }

    /*
       angular bootstrap
     */
    function bootstrapApplication() {
        angular.element(window.document).ready(function () {
            //the application will fail to invoke functions which do not use explicit function annotation
            var injector = angular.bootstrap(window.document, ['siemens.simaticit.app'], { strictDi: true });

            //Note that Protractor based end-to-end tests cannot use angular.bootstrap function to bootstrap manually.(https://docs.angularjs.org/api/ng/function/angular.bootstrap)
            //So inorder to make our application work in PhantomJS, a check on the injector returned from angular.bootstrap is made.
            //getSupportedLocales method will not be called if angular.bootstrap fails to return the valid injector.
            if (injector) {
                // Added NOSONAR because in version 2.2 we suppress the vulnerability in according to project architect and the security expert of the product.
                // In detail the process was tracked by the TFS issue number 22519
                // In version 2.3 SonarQube all those issues that were marked before reappeared again.
                // Better, for a certain period the issues were listed as resolved and, at the same time, they were listed as new issues.
                // So a agreed solution with the team issue administrator is to mark them using an in-code approach.
                // You can find details on the attached email on the TFS issue number 22519
                if (!window.sessionStorage.supportedLocales || window.sessionStorage["supportedLocales"] === undefined) {  //NOSONAR
                    getSupportedLocales(injector).then(function (data) {
                        if (data) {
                            window.sessionStorage.setItem("supportedLocales", JSON.stringify(data));
                        }
                    });
                }
            }
        });
    }

    /*
     load or create CONFIG constant
     */
    function loadConfigModule() {
        var configFileName = 'config.js';
        var defer = $q.defer();

        if (window.document.getElementsByTagName('head')[0].attributes.length > 0 && window.document.getElementsByTagName('head')[0].attributes[0]) {
            switch (window.document.getElementsByTagName('head')[0].attributes[0].nodeName) {
                case 'debug':
                    configFileName = 'debug-config.js';
                    appConfig.type = APP_CONFIG_TYPE_VALUES.DEBUG;
                    break;
                case 'doc':
                    configFileName = 'doc-config.js';
                    appConfig.type = APP_CONFIG_TYPE_VALUES.DOC;
                    break;
                case 'dev':
                    configFileName = 'config.js';
                    appConfig.type = APP_CONFIG_TYPE_VALUES.DEV;
                    break;
                case 'studio':
                    configFileName = 'studio-config.js';
                    appConfig.type = APP_CONFIG_TYPE_VALUES.STUDIO;
                    break;
                case 'mdui':
                    configFileName = 'mdui-config.js';
                    appConfig.type = APP_CONFIG_TYPE_VALUES.MDUI;
                    break;
                case 'swac':
                    appConfig.mode = APP_CONFIG_MODE_VALUES.SWAC;
                    switch (window.document.getElementsByTagName('head')[0].attributes[1] && window.document.getElementsByTagName('head')[0].attributes[1].nodeName) {
                        case 'studio':
                            configFileName = 'studio-config.js';
                            appConfig.type = APP_CONFIG_TYPE_VALUES.STUDIO;
                            break;
                    }
                    break;
                default: break;
            }
            if (window.document.getElementsByTagName('head')[0].attributes.length > 1 && window.document.getElementsByTagName('head')[0].attributes[1]) {
                if ('swac' === window.document.getElementsByTagName('head')[0].attributes[1].nodeName) {
                    appConfig.mode = APP_CONFIG_MODE_VALUES.SWAC;
                }
            }
        }

        $http.get(configFileName).then(function (response) {
            var Fn = Function;
            var fnConfig = new Fn(response.data);

            try {
                configTextFn = response.data;
                fnConfig();
            } catch (ex) {
                createEmptyConstant();
            }
            defer.resolve();
        }).catch(
            function () {
                createEmptyConstant();
                defer.resolve();
            });

        return defer.promise;
    }

    /*
    create empty constant
     */
    function createEmptyConstant() {
        angular.module('siemens.simaticit.common')
            .constant('CONFIG', {

            });
    }


    function loadJson(localePath) {
        var supportedLanguages = [];
        var files;
        var deferred = $q.defer();

        $http({ method: 'GET', url: localePath }).then(function (data) {
            try {
                files = data.data;
                for (var key in files) {
                    if (files.hasOwnProperty(key)) {
                        supportedLanguages.push(files[key]);
                    }
                }
                supportedLocales = _.union(supportedLocales, supportedLanguages);
                deferred.resolve(supportedLocales);
            } catch (ex) {
                deferred.resolve();
            }
        }).catch(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }


    function getSupportedLocales(injector) {
        var config = injector.get('CONFIG');
        var localePath = "";
        var promises = [];
        var deferred = $q.defer();
        if (config.dependencies && config.dependencies.length > 0) {
            for (var i = 0; i < config.dependencies.length; i++) {
                if (config.dependencies[i]) {
                    localePath = config.dependencies[i] + '/locales/locales.json';
                    promises.push(loadJson(localePath));
                }
            }
            $q.all(promises).then(function () {
                localePath = 'common/scripts/i18n/locales.json';
                loadJson(localePath).then(function (data) {
                    deferred.resolve(data);
                }).catch(function () {
                    deferred.resolve();
                });
            }, function () {
                deferred.resolve();
            });

        } else {
            localePath = 'common/scripts/i18n/locales.json';
            loadJson(localePath).then(function (data) {
                deferred.resolve(data);
            }).catch(function () {
                deferred.resolve();
            });
        }
        return deferred.promise;
    }

    /*
     * Creating APPCONFIG Constant
     */
    function createAppConfig(defer, data) {
        data = data ? data : {};
        data.appConfig = appConfig;
        // configUtilService.getSignalEndpoints().then(function (signalEndpoints) {
        //   var finalData = angular.extend({}, data, signalEndpoints);
        try {
            angular.module('siemens.simaticit.common').constant('APPCONFIG', data);
        } catch (ex) {
            angular.module('siemens.simaticit.common').constant('APPCONFIG', {
                appConfig: appConfig
            });
        }
        defer.resolve();
        //}, function (error) {
        //    console.error('Error retrieving signal endpoints from /sit-svc/runtime/signals', error);
        //    angular.module('siemens.simaticit.common').constant('APPCONFIG', data);
        //    defer.resolve();
        //});
    }

    loadConfigModule().then(function () {
        fetchData().then(function () {
            bootstrapApplication();
        }
        );
    });

})();

"use strict";
/// <reference path="session.svc.ts" />
/**
    * @ngdoc module
    * @name siemens.simaticit.common.services.data.authentication
    * @module siemens.simaticit.common
    * @access internal
    * @description
    * Contains services to access data related to user authentication.
    *
    *
    */
/*
    * IMPORTANT:
    * This module was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
    * Do not remove this module, otherwise this may break existing applications.
    */
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        angular.module('siemens.simaticit.common.services.data.authentication', []);
        var AuthenticationDataConfig = /** @class */ (function () {
            function AuthenticationDataConfig() {
                this.config = {
                    oDataServiceURI: '',
                    authorizationServiceUrl: ''
                };
            }
            AuthenticationDataConfig.prototype.$get = function () {
                return {
                    config: this.config
                };
            };
            return AuthenticationDataConfig;
        }());
        framework.AuthenticationDataConfig = AuthenticationDataConfig;
        angular.module('siemens.simaticit.common.services.data.authentication').provider('common.services.data.authentication.config', AuthenticationDataConfig);
        function Authentication(authenticationConfig, $injector, CommandResponse, ExecutionError, logger, $q) {
            var oDataPath = authenticationConfig.config.oDataServiceURI;
            var _token;
            function transformGetIdentityClaimsData(data) {
                var jsonData = {
                    'Category': data.category
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
                            logger.logDebug(Jsondata.Error.ErrorCode + ' : ' + Jsondata.Error.ErrorMessage, '', 'siemens.unity.common.authentication');
                            if (Jsondata.Identity) {
                                res.identity = JSON.parse(Jsondata.Identity);
                            }
                        }
                        else {
                            res = new CommandResponse(false, new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                            logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'siemens.unity.common.authentication');
                        }
                    }
                    catch (ex) {
                        if (ex.message === null || ex.message === '') {
                            ex.message = this.$translate.instant('svcErrors.business.defaultErrorMessage');
                        }
                        res = new CommandResponse(false, new ExecutionError(-1, 'Error: ' + ex.message));
                        logger.logError('-1: Error: ' + ex.message, '', 'siemens.unity.common.authentication');
                    }
                }
                else {
                    res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                    logger.logError('-1: Error: Generic Error', '', 'siemens.unity.common.authentication');
                }
                return res;
            }
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            function getIdentityClaims() {
                var http = $injector.get('$http');
                var resource = $injector.get('$resource');
                return resource('', {}, {
                    getIdentity: {
                        method: 'POST',
                        url: oDataPath + 'GetIdentityClaimsCommand',
                        headers: { 'Content-Type': 'application/json' },
                        transformRequest: [transformGetIdentityClaimsData].concat(http.defaults.transformRequest),
                        transformResponse: [transformResObj].concat(http.defaults.transformResponse)
                    }
                });
            }
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            function logoutAllSessions(data, token) {
                _token = token;
                return $injector.get('$q').all(data.sessionlist.map(_sessions));
            }
            function _sessions(strItem) {
                var _http_ = $injector.get('$http');
                var deferred = $injector.get('$q').defer();
                var config = { headers: {}, params: {}, withCredentials: true };
                var strtok = (strItem.indexOf('?') === -1) ? ('?') : ('&');
                var url = strItem + strtok + 'action=logout&session=' + encodeURI(_token.claim['urn:session']);
                _http_.get(url, config).then(function () {
                    deferred.resolve();
                }).catch(function (response) {
                    logger.logError('Authentication svc Error (sessionlist request)', { data: response.data, status: response.status, config: response.config, headers: response.headers }, 'siemens.simaticit.common');
                    deferred.reject();
                });
                return deferred.promise;
            }
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            function logout(request, config) {
                var sendReq = $injector.get('$http');
                var deferClaim = $q.defer();
                sendReq.get(request, config).
                    then(function (response) {
                    if (response.data && response.data.action && response.data.result && response.data.action === 'logoutresponse' && response.data.result === 'success') {
                        deferClaim.resolve(response.data);
                    }
                    else {
                        deferClaim.reject(response.data);
                    }
                }).
                    catch(function (response) {
                    deferClaim.reject(response.data);
                });
                return deferClaim.promise;
            }
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            function getAuthorizationServiceURL() {
                return authenticationConfig.config.authorizationServiceUrl;
            }
            this.getIdentityClaims = getIdentityClaims;
            this.logoutAllSessions = logoutAllSessions;
            this.logout = logout;
            this.getAuthorizationServiceURL = getAuthorizationServiceURL;
        }
        /**
        * @ngdoc service
        * @name common.services.data.authentication
        * @module siemens.simaticit.common.services.data.authentication
        * @access internal
        *
        * @description
        * This service is responsible for managing data related actions for authentication functionalities.
        *
        */
        /*
            * IMPORTANT:
            * This service was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this service, otherwise this may break existing applications.
            */
        angular.module('siemens.simaticit.common.services.data.authentication')
            .service('common.services.data.authentication', ['common.services.data.authentication.config', '$injector',
            'CommandResponse', 'ExecutionError',
            'common.services.logger.service', '$q',
            Authentication]);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=auth-data.svc.js.map
"use strict";
/// <reference path="timer.svc.ts" />
/// <reference path="auth.svc.ts" />
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
            * @ngdoc module
            * @name siemens.simaticit.common.services.ui.authentication
            * @module siemens.simaticit.common
            * @access internal
            *
            * @description
            * Contains services to manage user interactions related to authentication functionalities.
            *
            *
            */
        /*
            * IMPORTANT:
            * This module was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this module or modify the code of this module, otherwise this may break existing applications.
            */
        angular.module('siemens.simaticit.common.services.ui.authentication', []);
        var Authentication = /** @class */ (function () {
            function Authentication($window, $log, $location, $q, $rootScope, authenticationService, timerService, busyIndicatorService, messageOverlay, CONFIG, logger, $filter, swacManager) {
                var _this = this;
                this.$window = $window;
                this.$log = $log;
                this.$location = $location;
                this.$q = $q;
                this.$rootScope = $rootScope;
                this.authenticationService = authenticationService;
                this.timerService = timerService;
                this.busyIndicatorService = busyIndicatorService;
                this.messageOverlay = messageOverlay;
                this.CONFIG = CONFIG;
                this.logger = logger;
                this.$filter = $filter;
                this.swacManager = swacManager;
                this._renewSession = function () {
                    var now = new Date().getTime() / 1000, gap = _this._sessionRenewInSec - (now - _this._lastrenew);
                    if (gap < 0) {
                        _this.logger.logInfo('Renew Session Called');
                        _this.authenticationService.renew().then(function () {
                            _this._lastrenew = now;
                            _this._sessionTimer();
                        }, function () {
                            _this._sessionTimer();
                            _this.logger.logError('Authentication svc Error (renew) : renew is not successfull');
                        });
                        _this._startDOMTracking();
                        _this._isUserActive = false;
                        _this.logger.logInfo('Renew --> _IsUserActive set to false');
                    }
                };
                this._DOMSubtreeModified = function (event) {
                    if (_this._isFirstLoad === false) {
                        _this._isUserActive = true;
                        _this.logger.logInfo('DomTree + _isFirstLoad= false  -->_IsUserActive set to true ');
                        //hack for chrome because even if the mouse is not moved when the bind of the event is done the _DomSubtreeModified is fired with mousemove
                        if (event && event.type && event.type === 'mousemove') {
                            if (event.clientX && event.clientY) {
                                if (event.clientX === _this._lastMouseXPosition && event.clientY === _this._lastMouseYPosition) {
                                    _this._isUserActive = false;
                                    _this.logger.logInfo('DomTree + _isFirstLoad= false  --> BUT Same position --> _IsUserActive set to false ');
                                }
                                _this._lastMouseXPosition = event.clientX;
                                _this._lastMouseYPosition = event.clientY;
                            }
                        }
                    }
                    else {
                        _this._isFirstLoad = false;
                        _this._isUserActive = false;
                        _this.logger.logInfo('DomTree + _isFirstLoad= false  --> _IsUserActive set to false');
                    }
                    _this._stopDOMTracking();
                };
                this._onOverlayRenewClick = function () {
                    _this.handleOverlayActions();
                };
                this._onOverlayOkayClick = function () {
                    _this.handleOverlayActions();
                };
                this._startDOMTracking = function () {
                    //if (this._DOMObservor !== undefined) {
                    //    this._DOMObservor.observe(this.$window.document.body, { attributes: true, childList: true, subtree: true });
                    //}
                    if (!_this._isTracking && _this._DOMTrackingStatus) {
                        $('*').bind('mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick', $.proxy(_this._DOMSubtreeModified, _this));
                        _this._isTracking = true;
                        _this.logger.logInfo('StartDOMTRACKING');
                    }
                };
                this._stopDOMTracking = function () {
                    //if (this._DOMObservor !== undefined) {
                    //    this._DOMObservor.disconnect();
                    //}
                    $('*').unbind('mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick', $.proxy(_this._DOMSubtreeModified, _this));
                    _this._isTracking = false;
                    _this.logger.logInfo('StopDOMTRACKING');
                };
                this._sessionTimer = function () {
                    if (_this._sessionRenewPreNotificationTimer !== null) {
                        _this.logger.logInfo('RenewPrenotification Timer STOPPED');
                        _this.timerService.stop(_this._sessionRenewPreNotificationTimer);
                    }
                    if (_this._sessionRenewTimer !== null) {
                        _this.logger.logInfo('Renew Timer STOPPED');
                        _this.timerService.stop(_this._sessionRenewTimer);
                    }
                    if (_this._sessionNotificationStatus === true) {
                        _this.logger.logInfo('RenewPrenotification Timer STARTED');
                        _this._sessionRenewPreNotificationTimer = _this.timerService.start('PreNotification', (_this._sessionExpireInSec - _this._countdownInSec) * 1000, function () {
                            if (_this._isUserActive === true) {
                                _this.logger.logInfo('RenewPrenotification Timer Callback called and user performed activities ');
                                _this._renewSession();
                            }
                            else {
                                _this.logger.logInfo('RenewPrenotification Timer Callback called and user NOT performed activities ');
                                _this._stopDOMTracking();
                                _this.timerService.stop(_this._sessionRenewTimer);
                                _this._activateSessionTimeout();
                            }
                        }, true, false);
                    }
                    _this.logger.logInfo('Renew Timer STARTED');
                    _this._sessionRenewTimer = _this.timerService.start('Renew', _this._internalRenewFreq * 1000, function () {
                        var msg = (_this._isUserActive) ? ('Renew Timer Callback and the user was ACTIVE') : ('Renew Timer Callback and the user was NOT ACTIVE');
                        _this.logger.logInfo(msg);
                        _this._startDOMTracking();
                        if (_this._isUserActive === true) {
                            _this._renewSession();
                        }
                    }, false, false);
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.enableSessionNotification = function () {
                    _this._sessionNotificationStatus = true;
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.disableSessionNotification = function () {
                    _this._sessionNotificationStatus = false;
                    if (_this._sessionRenewPreNotificationTimer !== null) {
                        _this.timerService.stop(_this._sessionRenewPreNotificationTimer);
                    }
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.enableDOMTracking = function () {
                    _this._DOMTrackingStatus = true;
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.disableDOMTracking = function () {
                    _this._DOMTrackingStatus = false;
                    if (_this._isTracking) {
                        _this._stopDOMTracking();
                    }
                };
                this._activateSessionTimeout = function () {
                    var countdown = _this._countdownInSec;
                    var min, sec, expireOn;
                    var date = new Date();
                    _this.$rootScope.globalOverlayData.text = '';
                    _this.$rootScope.globalOverlayData.buttons = [{
                            id: "renewSession",
                            displayName: _this.$filter("translate")('common.authentication.renewSession'),
                            onClickCallback: _this._onOverlayRenewClick
                        }];
                    _this.$rootScope.globalOverlayData.title = _this.$filter('translate')('common.authentication.overlaySessionExpireWarning');
                    if (_this.swacManager.enabled) {
                        date.setSeconds(date.getSeconds() + countdown);
                        expireOn = date.toLocaleDateString() + ' : ' + date.toLocaleTimeString();
                        _this.$rootScope.globalOverlayData.text = _this.$filter('translate')('common.authentication.overlaySessionExpireMessage') + expireOn;
                    }
                    _this.messageOverlay.show({ type: "confirmation" });
                    _this._countDownTimer = _this.timerService.start('count down', 1000, function () {
                        min = Math.floor(countdown / 60);
                        min = (min < 10 ? '0' : '') + min;
                        sec = Math.floor(countdown % 60);
                        sec = (sec < 10 ? '0' : '') + sec;
                        _this.$rootScope.globalOverlayData.text = _this.$filter('translate')('common.authentication.overlaySessionExpireMessage') + min + ":" + sec;
                        countdown = countdown - 1;
                        if (countdown === -1) {
                            if (_this.swacManager.enabled) {
                                _this.messageOverlay.hide();
                            }
                            _this.timerService.stop(_this._countDownTimer);
                            _this.timerService.stopAll();
                            _this.$rootScope.globalOverlayData.buttons = [{
                                    id: "cancelDelete",
                                    displayName: _this.$filter('translate')('common.ok'),
                                    onClickCallback: _this._onOverlayOkayClick
                                }];
                            _this.$rootScope.globalOverlayData.text = _this.$filter('translate')('common.authentication.overlaySesionExpiredMessage');
                            _this.$rootScope.globalOverlayData.title = '';
                            _this.messageOverlay.show({ type: "warning" });
                        }
                    }, false);
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.init = function (sessionNotification, DOMTracking) {
                    if (sessionNotification === false) {
                        _this.disableSessionNotification();
                    }
                    if (DOMTracking === false) {
                        _this.disableDOMTracking();
                    }
                    _this.authenticationService.getLoginStatus().then(null, null, function (status) {
                        var token = _this.authenticationService.getToken();
                        if (token !== undefined) {
                            _this._sessionExpireInSec = Number(token.claim["urn:sessionexpires"]); //120
                            _this._sessionRenewInSec = Math.ceil(_this._sessionExpireInSec / 3);
                            _this._countdownInSec = Math.ceil(_this._sessionExpireInSec / 15); //600; //Number(token.claim["sessionRenewal"]) //30
                            _this._internalRenewFreq = Math.ceil(_this._sessionExpireInSec / 30);
                            _this.logger.logInfo('_sessionExpireInSec: ' + _this._sessionExpireInSec + '_sessionRenewInSec: ' + _this._sessionRenewInSec + '_countdownInSec: ' + _this._countdownInSec + '_internalRenewFreq: ' + _this._internalRenewFreq);
                            _this._userGroup = token.claim["urn:group"];
                            //this._DOMObservor = new MutationObserver(() => {
                            //    this._DOMSubtreeModified();
                            //});
                            if (status === 'Refresh') {
                                _this.$rootScope.isRefresh = true;
                                _this._renewSession();
                            }
                            else if (status === 'Login') {
                                _this.$rootScope.isRefresh = false;
                                _this._sessionTimer();
                                _this.timerService.start('initial timer', 1500, function () {
                                    _this._startDOMTracking();
                                }, true);
                            }
                            _this._isInitExecuted = true;
                        }
                    });
                    _this.authenticationService.init();
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.getIndentity = function () {
                    return _this.authenticationService.notifyUser();
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.getCurrentUser = function () {
                    return _this.authenticationService.getLoggedUser();
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.login = function (redirectTohome) {
                    //this.busyIndicatorService.show();
                    _this.authenticationService.login(redirectTohome);
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.checkAuthentication = function () {
                    // sends a request to the services for verifying authentication
                    var deferred = _this.$q.defer();
                    //  this.busyIndicatorService.show();
                    _this.authenticationService.checkAuthentication().then(function () {
                        //this.busyIndicatorService.hide();
                        deferred.resolve();
                    }, function (error) {
                        // this.busyIndicatorService.hide();
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                this.hideOverlay = function () {
                    _this.messageOverlay.hide();
                    _this.$rootScope.globalOverlayData.text = '';
                    _this.$rootScope.globalOverlayData.title = '';
                    _this.messageOverlay.set(_this.overlay);
                };
                /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
                this.logout = function () {
                    _this.timerService.stopAll();
                    _this.busyIndicatorService.show(_this.$rootScope.globalBusyIndicator.id, _this.$rootScope.globalBusyIndicator.delay);
                    _this.authenticationService.logout().then(function () {
                        _this.$log.log('Successfully logout');
                        _this.busyIndicatorService.hide(_this.$rootScope.globalBusyIndicator.id);
                    }, function (error) {
                        _this.busyIndicatorService.hide(_this.$rootScope.globalBusyIndicator.id);
                        _this.$log.log('error logoff: ', error);
                        _this.messageOverlay.text = _this.$filter('translate')('common.authentication.overlayLogoutErrorMsg');
                        _this.messageOverlay.title = _this.$filter('translate')('common.authentication.overlayLogoutErrorTitle');
                        _this.messageOverlay.set(_this.overlay);
                        _this.messageOverlay.show();
                        _this.logger.logError('Authentication svc Error (logout)');
                    });
                };
                this.isAuthorized = function () {
                    return _this.authenticationService.isAuthorized();
                };
                this._isUserActive = false;
                this._isInitExecuted = false;
                this._countdownInSec = 120;
                this._sessionExpireInSec = 0;
                this._sessionRenewInSec = 0;
                this._lastMouseXPosition = 0;
                this._lastMouseYPosition = 0;
                this._lastrenew = 0;
                this._isFirstLoad = true;
                this._internalRenewFreq = 60;
                this._sessionNotificationStatus = true;
                this._DOMTrackingStatus = true;
                this._isTracking = false;
                this.overlay = {
                    text: $filter('translate')('common.authentication.overlayLogoutErrorMsg'),
                    title: $filter('translate')('common.authentication.overlayLogoutErrorTitle'),
                    buttons: [{
                            id: 'okButton',
                            displayName: 'OK',
                            onClickCallback: this.hideOverlay
                        }]
                };
            }
            Authentication.prototype.handleOverlayActions = function () {
                this.messageOverlay.hide();
                this.timerService.stop(this._countDownTimer);
                this.authenticationService.renew();
                this._sessionTimer();
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            Authentication.prototype.getToken = function () {
                return this.authenticationService.getToken();
            };
            Authentication.$inject = ['$window', '$log', '$location', '$q', '$rootScope',
                'common.services.authentication', 'common.services.timer',
                'common.widgets.busyIndicator.service', 'common.widgets.messageOverlay.service', 'CONFIG', 'common.services.logger.service', '$filter', 'common.services.swac.SwacUiModuleManager'];
            return Authentication;
        }());
        framework.Authentication = Authentication;
        /**
        * @ngdoc service
        * @name common.services.ui.authentication
        * @module siemens.simaticit.common.services.ui.authentication
        * @access internal
        *
        * @description
        * This service is responsible for managing authentication related functionalities along with the UI related functionalities.
        *
        */
        /*
        * IMPORTANT:
        * This service was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
        * Do not remove this service or modify the code of this service, otherwise this may break existing applications.
        */
        angular.module('siemens.simaticit.common.services.ui.authentication')
            .service('common.services.ui.authentication', Authentication);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=auth-ui.svc.js.map
"use strict";
/// <reference path="session.svc.ts" />
/// <reference path="auth-data.svc.ts" />
/// <reference path="cookie.svc.ts" />
/// <reference path="umc.svc.ts" />
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
        * @ngdoc module
        * @name siemens.simaticit.common.services.auth
        * @module siemens.simaticit.common
        *
        * @description
        * Contains services to access the functionalities related to user authentication.
        *
        */
        angular.module('siemens.simaticit.common.services.auth', []);
        var AuthenticationConfig = /** @class */ (function () {
            function AuthenticationConfig() {
                this.config = {
                    authorizationServiceUrl: '',
                    enableAuthentication: true,
                    homeRoute: ''
                };
            }
            AuthenticationConfig.prototype.$get = function () {
                return {
                    config: this.config
                };
            };
            return AuthenticationConfig;
        }());
        framework.AuthenticationConfig = AuthenticationConfig;
        angular.module('siemens.simaticit.common.services.auth').provider('common.services.authentication.config', AuthenticationConfig);
        var AuthenticationService = /** @class */ (function () {
            function AuthenticationService(authenticationConfig, $window, $log, $location, $q, $rootScope, CONFIG, sessionService, cookieService, umcService, $injector, authDataService) {
                var _this = this;
                this.authenticationConfig = authenticationConfig;
                this.$window = $window;
                this.$log = $log;
                this.$location = $location;
                this.$q = $q;
                this.$rootScope = $rootScope;
                this.CONFIG = CONFIG;
                this.sessionService = sessionService;
                this.cookieService = cookieService;
                this.umcService = umcService;
                this.$injector = $injector;
                this.authDataService = authDataService;
                /*
                    * IMPORTANT:
                    * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                    * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                    */
                this.login = function (redirectTohome) {
                    var redirect_uri = _this.$location.absUrl().replace(_this.$location.url(), '').replace('#', '');
                    var redirectKeyValue = redirectTohome === true ? '' : _this.$location.url();
                    _this.sessionService.setRedirectStateKey(redirectKeyValue);
                    var response_type = 'token';
                    _this.state = Date.now() + '' + Math.random();
                    var scope = 'read';
                    // this.sessionService.setState(this.state);
                    var requestData = _this.authenticationConfig.config.authorizationServiceUrl + '?' +
                        'client_id=' + encodeURI(_this._clientID) + '&' +
                        'redirect_uri=' + encodeURI(redirect_uri) + '&' +
                        'response_type=' + encodeURI(response_type) + '&' +
                        'scope=' + encodeURI(scope) + '&' +
                        'state=' + encodeURI(_this.state);
                    if (!_this._isRedirectInProgress) {
                        _this._isRedirectInProgress = true;
                        window.location.replace(requestData);
                        /*
                            For Bug: The navigation to login screen some time delayed or not happens
                            Reason: Changing the location href on the same thread is discarded by browser due to response thread
                            Fix: Make the location change in a separate thread using setTimeout
                            Used window.location.replace instead of window.location.assign to clear the current url from history
                            If the current state has to be maintained in history, use window.location.assign
                        */
                        setTimeout(function () {
                            window.location.replace(requestData);
                        });
                    }
                };
                this.deferClaim = this.$q.defer();
                this.deferSetToken = this.$q.defer();
                this._clientID = CONFIG.clientID;
                this._sessionrenewal = '600';
                this._isRedirectInProgress = false;
            }
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.init = function () {
                if (this.authenticationConfig.config.enableAuthentication === true) {
                    this.checkUrlParams();
                }
            };
            AuthenticationService.prototype.setCurrentState = function (currentState) {
                this._currentState = currentState;
            };
            AuthenticationService.prototype.getCurrentState = function () {
                return this._currentState;
            };
            /**
        * @ngdoc method
        * @name common.services.authentication#notifyUser
        * @deprecated Use the {@link common.services.authentication#getUser getUser} method instead.
        */
            AuthenticationService.prototype.notifyUser = function () {
                return this.getUser();
            };
            /**
                *
                */
            /**
            * @ngdoc method
            * @name common.services.authentication#getUser
            * @description
            * Returns the currently-logged user.
            *
            * @returns {Object} An object containing user data.
            */
            AuthenticationService.prototype.getUser = function () {
                var tok = this.getToken();
                try {
                    if (tok) {
                        var claim = tok.claim;
                        if (claim) {
                            return claim;
                        }
                    }
                }
                catch (ex) {
                    this.$log.log('error Notify', ex);
                }
                return null;
            };
            AuthenticationService.prototype.checkUrlParams = function () {
                /*jshint ignore:start*/
                var params = {}, queryString = window.location.hash.substring(1), regex = /([^\/&=]+)=([^&]*)/g, m;
                var condition = (m = regex.exec(queryString));
                while (condition) {
                    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                    condition = (m = regex.exec(queryString));
                }
                if (_.contains(Object.keys(params), 'access_token')) {
                    this.setToken(params);
                    this.deferSetToken.notify('Login');
                }
                else {
                    this.deferSetToken.notify('Refresh');
                }
                var token = this.getToken();
                if ((token) && (token.identityUrl)) {
                    this.umcService.init(token.identityUrl);
                }
                /*jshint ignore:end*/
            };
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.getLoginStatus = function () {
                return this.deferSetToken.promise;
            };
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.getToken = function () {
                var access_token = null;
                var params = null;
                if (this._URLtoken === undefined || this._UMCClaims === undefined) {
                    params = this.sessionService.getAuth();
                    if (params) { // && (this.sessionService.getState() === params.state)) {
                        access_token = params.access_token.split('.');
                        var _header = JSON.parse(this.$window.atob(access_token[0]));
                        var _claim = '';
                        var output = access_token[1].replace(/-/g, '+').replace(/_/g, '/');
                        switch (output.length % 4) {
                            case 0:
                                break;
                            case 2:
                                output += '==';
                                break;
                            case 3:
                                output += '=';
                                break;
                            default:
                                throw 'Illegal base64url string!';
                        }
                        var _atobDecoded = this.$window.atob(output);
                        try {
                            _claim = JSON.parse(decodeURIComponent(this.$window.escape(_atobDecoded)));
                        }
                        catch (err) {
                            _claim = JSON.parse(_atobDecoded);
                        }
                        var _claimToSend = /*params.token_type*/ 'Bearer' + ' ' + params.access_token;
                        this._UMCClaims = {
                            session: _claim['urn:session'],
                            identityUrl: _claim['urn:idp_address'],
                            sessionrenewal: this._sessionrenewal
                        };
                        this._URLtoken = {
                            header: _header,
                            claim: _claim,
                            claimToSend: _claimToSend,
                            sessionRenewal: params.expires_in,
                            identityUrl: _claim['urn:idp_address']
                        };
                    }
                }
                return this._URLtoken;
            };
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.setToken = function (value) {
                this.sessionService.setAuth(value);
                //if (value && value.access_token) {
                //    this.cookieService.setAccessToken(value.access_token);
                //}
                this.$location.url(this.sessionService.getRedirectStateKey());
                this.deferClaim.notify(this.notifyUser());
            };
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.getLoggedUser = function () {
                return this.deferClaim.promise;
            };
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.isAuthorized = function () {
                return this.sessionService.getAuth() === null ? false : true;
            };
            //public logoutFromUMC() {
            //    var deferred = this.$q.defer();
            //    this.umcService.logout(this._UMCClaims).then((data: any) => {
            //        if (data.sessionlist !== undefined) {
            //            this.authDataService.logoutAllSessions(data, this.getToken()).then(() => {
            //                this.sessionService.removeAuth();
            //            });
            //            this.sessionService.removeAuth();
            //            this.deferClaim.notify(null);
            //            deferred.resolve(data);
            //        }
            //    },(error) => {
            //            deferred.reject(error);
            //        });
            //    return deferred.promise;
            //}
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.logout = function () {
                var _this = this;
                var deferred = this.$q.defer();
                var redirectURL = this.$location.absUrl().replace(this.$location.url(), '');
                if (this._URLtoken) {
                    var request = this._URLtoken.identityUrl;
                    var requestData = {
                        action: 'logoutrequest',
                        json: 'json',
                        service: encodeURI(redirectURL),
                        session: encodeURI(this._URLtoken.claim['urn:session'])
                    };
                    var config = { headers: {}, params: requestData, withCredentials: true };
                    this.authDataService.logout(request, config).then(function (data) {
                        _this.sessionService.removeAuth();
                        if (data.sessionlist !== undefined) {
                            _this.authDataService.logoutAllSessions(data, _this.getToken()).then(function () {
                                _this.deferClaim.notify(null);
                                _this.login(true);
                            });
                            deferred.resolve(data);
                        }
                    }, function (error) {
                        deferred.reject(error);
                        _this.sessionService.removeAuth();
                        _this.login(true);
                    });
                    return deferred.promise;
                }
            };
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.renew = function () {
                return this.umcService.renew(this._UMCClaims);
            };
            /*
                * IMPORTANT:
                * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
                * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
                */
            AuthenticationService.prototype.checkAuthentication = function () {
                // sends a request to the services for verifying authentication
                var deferred = this.$q.defer();
                var engineeringDataService = this.$injector.get('common.services.engineering.data.service');
                if (this.authenticationConfig.config.enableAuthentication) {
                    //busyIndicatorService.show();
                    engineeringDataService.getAll('Domain', '').then(function () {
                        //logger.logDebug('authentication: authentication check OK', null, 'siemens.simaticit.common');
                        //busyIndicatorService.hide();
                        deferred.resolve();
                    }, function (reason) {
                        //logger.logDebug('authentication: authentication check failed', reason, 'siemens.simaticit.common');
                        //busyIndicatorService.hide();
                        deferred.reject(reason);
                    });
                }
                else {
                    //busyIndicatorService.hide();
                    deferred.resolve();
                }
                return deferred.promise;
            };
            AuthenticationService.$inject = ['common.services.authentication.config', '$window', '$log', '$location', '$q', '$rootScope', 'CONFIG', 'common.services.session', 'common.services.cookie',
                'common.services.umc', '$injector', 'common.services.data.authentication'];
            return AuthenticationService;
        }());
        framework.AuthenticationService = AuthenticationService;
        /**
        * @ngdoc service
        * @name common.services.authentication
        * @module siemens.simaticit.common.services.auth
        *
        * @description
        * This service provides methods to retrieve authentication data.
        *
        */
        angular.module('siemens.simaticit.common.services.auth')
            .service('common.services.authentication', AuthenticationService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=auth.svc.js.map
"use strict";
/// <reference path="model.ts" />
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var CommonBase = /** @class */ (function () {
            function CommonBase(commandResponse, executionError, globalization, logger, auth, sidePanelManager, swacComponentService, uiComponentService, securityService, backendService, dataService, archivingDataService, commandService, signalManager, messageOverlayService, globalDialogService, busyIndicatorService, notificationTileGlobalService, commandBarService) {
                this.services = {
                    globalization: { globalizationService: globalization, service: globalization },
                    security: { securityService: securityService, service: securityService },
                    authentication: { service: auth },
                    logger: { service: logger },
                    sidePanel: { service: sidePanelManager },
                    signal: { service: signalManager },
                    component: {
                        swacComponentService: swacComponentService,
                        uiComponentService: uiComponentService
                    },
                    runtime: {
                        backendService: backendService,
                        dataService: dataService,
                        archivingDataService: archivingDataService,
                        commandService: commandService
                    }
                };
                this.widgets = {
                    messageOverlay: { service: messageOverlayService },
                    globalDialog: { service: globalDialogService },
                    busyIndicator: { service: busyIndicatorService },
                    notificationTile: { service: notificationTileGlobalService },
                    commandBar: { service: commandBarService }
                };
            }
            CommonBase.$inject = [
                'CommandResponse',
                'ExecutionError',
                'common.services.globalization.globalizationService',
                'common.services.logger.service',
                'common.services.authentication',
                'common.services.sidePanel.service',
                'common.services.component.swacComponentService',
                'common.services.component.uiComponentService',
                'common.services.security.securityService',
                'common.services.runtime.backendService',
                'common.services.runtime.dataService',
                'common.services.runtime.archivingDataService',
                'common.services.runtime.commandService',
                'common.services.signalManager',
                'common.widgets.messageOverlay.service',
                'common.widgets.globalDialog.service',
                'common.widgets.busyIndicator.service',
                'common.widgets.notificationTile.globalService',
                'common.widgets.commandBar.service'
            ];
            return CommonBase;
        }());
        framework.CommonBase = CommonBase;
        /**
            * @ngdoc type
            * @name BaseServiceModel
            * @module siemens.simaticit.common
            * @description An object containing references to common UI Framework services.
            *
            * The object is structured as follows:
            *
            *  * services:
            *      * authentication.service: {@link service:common.services.authentication}
            *      * component:
            *          * swacComponentService: {@link service:common.services.component.swacComponentService}
            *          * uiComponentService: {@link service:common.services.component.uiComponentService}
            *      * globalization.service: {@link service:common.services.globalization.globalizationService}
            *      * logger.service: {@link service:common.services.logger.service}
            *      * runtime:
            *          * backendService: {@link service:common.services.runtime.backendService}
            *          * dataService: {@link service:common.services.runtime.dataService}
            *          * archivingDataService: {@link service:common.services.runtime.archivingDataService}
            *          * commandService: {@link service:common.services.runtime.commandService}
            *      * security.service: {@link service:common.services.security.securityService}
            *      * sidePanel.service: {@link service:common.services.sidePanel.service}
            *      * signal.service: {@link service:common.services.signalManager}
            *  * widgets:
            *      * busyIndicator.service: {@link service:common.widgets.busyIndicator.service}
            *      * globalDialog.service: {@link service:common.widgets.globalDialog.service}
            *      * messageOverlay.service: {@link service:common.widgets.messageOverlay.service}
            *      * notificationTile.service: {@link service:common.widgets.notificationTile.globalService}
            *      * commandBar.service: {@link service:common.widgets.commandBar.service}
            */
        /**
        * @ngdoc service
        * @name common.base
        * @module siemens.simaticit.common
        *
        * @description
        * This service is a container for the most commonly-used services. For more information on the structure
        * of the object provided by this service, see {@link type:BaseServiceModel}.
        *
        *
        */
        angular.module('siemens.simaticit.common').service('common.base', CommonBase);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=common-base-svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
         * @ngdoc service
         * @name common.collectionService
         * @module siemens.simaticit.common
         * @access internal
         *
         * @description
         * Exposes a set of methods that can be used to retrieve data for populating tables.
         *
         */
        var CollectionService = /** @class */ (function () {
            function CollectionService($q, $resource, $http, $logger) {
                this.$q = $q;
                this.$resource = $resource;
                this.$http = $http;
                this.$logger = $logger;
                this.logger = $logger.getModuleLogger('siemens.simaticit.common.collectionService');
            }
            CollectionService.prototype.getPageData = function (startIndex, pageSize, serviceDetails) {
                if (!this.isValidParams(startIndex, pageSize, serviceDetails)) {
                    return;
                }
                var fullOptionString = '';
                //validations for parameters are yet to be implemented
                var pageCriteria = '';
                if (pageSize && undefined !== startIndex) {
                    pageCriteria += fullOptionString ? '&' : '';
                    pageCriteria += '$top=' + pageSize + '&$skip=' + (startIndex);
                }
                fullOptionString += pageCriteria;
                var countCriteria = fullOptionString ? '&' : '';
                countCriteria += '$count=true';
                fullOptionString += countCriteria;
                //something specific to findAll is yet to be implemented
                var promise;
                if (serviceDetails.appName) {
                    promise = serviceDetails.dataService.findAll({ appName: serviceDetails.appName, entityName: serviceDetails.entity, options: fullOptionString });
                }
                else {
                    promise = serviceDetails.dataService.getAll(serviceDetails.entity, fullOptionString);
                }
                return promise.then(function (response) {
                    return {
                        pageData: response.value,
                        currentPage: 0,
                        totalDataCount: response.count
                    };
                }, function (reject) {
                    this.logger.logError('Fetching server data failed', reject, 'common.widgets.table.serverDataService');
                    return this.$q.reject(reject);
                });
            };
            CollectionService.prototype.isValidParams = function (startIndex, pageSize, serviceDetails) {
                if (!serviceDetails) {
                    this.logger.logError('datasource information not specified');
                    throw new Error('There is no datasource information provided.');
                }
                if (!serviceDetails.entity) {
                    this.logger.logError('entity information not specified');
                    throw new Error('There is no entity information provided.');
                }
                if (!serviceDetails.dataService) {
                    this.logger.logError('dataService information not specified');
                    throw new Error('There is no service information provided.');
                }
                // check service
                if ((typeof serviceDetails.dataService.getAll !== 'function') && (!serviceDetails.appName)) {
                    this.logger.logErr('The given service does not have a getAll function.');
                    throw new Error('The given service does not have a getAll function.');
                }
                if ((typeof serviceDetails.dataService.findAll !== 'function') && (serviceDetails.appName)) {
                    this.logger.logErr('The given service does not have a findAll function.If you defined in serverData appName the service must contain a findAll function');
                    throw new Error('The given service does not have a findAll function.');
                }
                // check page number, page size
                //if (!sdm.isInt(pageNumber) /*|| pageNumber < 1*/) {
                //    sdm.logger.logErr(pageNumber + ' is not a valid value for page number.');
                //    throw new Error(pageNumber + ' is not a valid value for page number.');
                //}
                if (!this.isInt(pageSize) /*|| pageSize < 1*/) {
                    this.logger.logErr(pageSize + ' is not a valid value for page size.');
                    throw new Error(pageSize + ' is not a valid value for page size.');
                }
                return true;
            };
            CollectionService.prototype.isInt = function (x) {
                var y = parseInt(x, 10);
                return !isNaN(y) && x === y && x.toString() === y.toString();
            };
            CollectionService.$inject = ['$q', '$resource', '$http', 'common.services.logger.service'];
            return CollectionService;
        }());
        framework.CollectionService = CollectionService;
        angular.module('siemens.simaticit.common').service('common.collectionService', CollectionService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=common-collection-svc.js.map
/// <reference path="model.ts" />
'use strict';
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Common = /** @class */ (function () {
            function Common($rootScope, commandResponse, executionError, globalization, logger, shell, authentication, sidePanelManager, commandBarManager, dragDropManager, messageOverlay, globalDialog, swacManager, headerService, timerService, CONFIG, $state) {
                this.$rootScope = $rootScope;
                this.commandResponse = commandResponse;
                this.executionError = executionError;
                this.globalization = globalization;
                this.logger = logger;
                this.shell = shell;
                this.authentication = authentication;
                this.sidePanelManager = sidePanelManager;
                this.commandBarManager = commandBarManager;
                this.dragDropManager = dragDropManager;
                this.messageOverlay = messageOverlay;
                this.globalDialog = globalDialog;
                this.swacManager = swacManager;
                this.headerService = headerService;
                this.timerService = timerService;
                this.CONFIG = CONFIG;
                this.$state = $state;
                this.subscribeApolloContainerEvents();
                this.index_value = 2;
                this.historyTracker = [];
            }
            /**
                * @ngdoc method
                * @name common#setExecutionError
                * @access internal
                * @description
                * Allows the user to set error data when an error occurs.
                * @param {object} err The error object passed as a parameter to set the **errorCode** and the **errorMessage** properties.
                * @returns {object} {@link ExecutionError}
                */
            Common.prototype.setExecutionError = function (err) {
                if (err.status === 0 || err.status === 404) {
                    if ((err.data) && (err.data.error)) {
                        err.data.error.errorCode = err.status;
                    }
                    if ((err.data) && (err.data.error)) {
                        err.data.error.errorMessage = 'Cannot connect to the specified URL';
                    }
                    else {
                        err.data = { error: { 'errorCode': err.status, 'errorMessage': err.statusText } };
                    }
                }
                else if (err.status === 500 || err.status === 400 || err.status === 503) {
                    try {
                        err.data.error.errorCode = (err.data.error.errorCode) ? err.data.error.errorCode : err.status;
                        err.data.error.errorMessage = (err.data.error.errorMessage) ? err.data.error.errorMessage : err.statusText;
                    }
                    catch (ex) {
                        err.data.error.errorCode = err.status;
                        err.data.error.errorMessage = err.statusText;
                    }
                }
                else {
                    try {
                        err.data.error.errorCode = err.status;
                        err.data.error.errorMessage = err.data.error.errorMessage && !err.statusText ? err.data.error.errorMessage : err.statusText;
                    }
                    catch (ex) {
                        this.logger.logError('common service: setExecutionError()', ex, 'siemens.simaticit.common');
                    }
                }
                return err;
            };
            /**
                * @ngdoc method
                * @name common#saveSettings
                * @access internal
                * @description
                * Saves the settings in **LocalStorage** object.
                * @param {object} objSettings Object through which it is possible to save the language, theme and log level.
                *
                */
            Common.prototype.saveSettings = function (objSettings) {
                if (objSettings) {
                    var keyName = 'settings';
                    if (this.CONFIG && this.CONFIG.clientID) {
                        keyName = this.CONFIG.clientID + '_settings';
                    }
                    window.localStorage.setItem(keyName, JSON.stringify(objSettings));
                }
                return true;
            };
            /**
                * @ngdoc method
                * @name common#removeSettings
                * @access internal
                * @description
                * Removes saved settings from the **LocalStorage** object.
                *
                *
                */
            Common.prototype.removeSettings = function () {
                var keyName = 'settings';
                if (this.CONFIG && this.CONFIG.clientID) {
                    keyName = this.CONFIG.clientID + '_settings';
                }
                window.localStorage.removeItem(keyName);
            };
            /**
                * @ngdoc method
                * @name common#loadSettings
                * @access internal
                * @description
                * Loads saved settings from the **LocalStorage** object.
                *
                * @returns {Object} Object through which language, theme and the log levels is saved.
                */
            Common.prototype.loadSettings = function () {
                var keyName = 'settings';
                if (this.CONFIG && this.CONFIG.clientID) {
                    keyName = this.CONFIG.clientID + '_settings';
                }
                var strSettings = window.localStorage.getItem(keyName);
                //Try with the generic key
                if (!strSettings) {
                    strSettings = window.localStorage.getItem('settings');
                }
                try {
                    if (strSettings) {
                        return JSON.parse(strSettings);
                    }
                }
                catch (ex) {
                    this.logger.logError('common service: loadSettings()', ex, 'siemens.simaticit.common');
                }
                return null;
            };
            /**
                * @ngdoc method
                * @name common#formatErrorMessage
                * @access internal
                * @param {object} errorObject CommandResponse, ExecutionError, or HttpPromise objects.
                * For more information, see {@link type:CommandResponse} object or {@link type:ExecutionError} object.
                *
                * @description
                * Formats an error message string from an **ExecutionError** Object.
                *
                * @returns {string} formatted error message
                */
            Common.prototype.formatErrorMessage = function (error) {
                if (!error) {
                    return '';
                }
                var errorCode = null, errorMessage = null;
                if (error.data instanceof framework.CommandResponse) {
                    errorCode = error.data.error.errorCode;
                    errorMessage = error.data.error.errorMessage;
                    if (error.data.data !== undefined && error.data.data !== null && error.data.data.SitUafExecutionDetail !== undefined && error.data.data.SitUafExecutionDetail !== null) {
                        errorCode = '-1';
                        errorMessage = 'One or more pre-checks failed';
                        for (var i = 0; i < error.data.data.SitUafExecutionDetail.PrecheckDetails.length; i++) {
                            errorMessage += "\n [" + +error.data.data.SitUafExecutionDetail.PrecheckDetails[i].Error.ErrorCode + "] - " + error.data.data.SitUafExecutionDetail.PrecheckDetails[i].Error.ErrorMessage;
                        }
                    }
                }
                else if (error instanceof framework.CommandResponse) {
                    errorCode = error.error.errorCode;
                    errorMessage = error.error.errorMessage;
                }
                else if (error instanceof framework.ExecutionError) {
                    errorCode = error.errorCode;
                    errorMessage = error.errorMessage;
                }
                else {
                    this.logger.logWarning('common service - formatErrorMessage - unexpected type parameter', error, 'siemens.simaticit.common');
                }
                if (null === errorMessage) {
                    return '';
                }
                if ('string' !== typeof errorMessage) {
                    return this.formatErrorMessage(errorMessage);
                }
                return '[{0}] - {1}'.replace(/\{0\}/g, errorCode).replace(/\{1\}/g, errorMessage);
            };
            /**
                * @ngdoc method
                * @name common#transformHttpResponse
                * @access internal
                * @param {object} httpResponseBody http response body.
                * @param {object} strModuleName   **module** name or **service** name  to be used when an error occurs (event log).
                *
                * @description
                * return {CommandResponse} A {@link type:CommandResponse} object
                *
                *
                * ```
                *
                *   //transformHttpResponse usage
                *   function callSample(){
                *     return $resource('', {}, {
                *       sampleCommand: {
                *           method: 'Post',
                *           url: oDataPath + 'sampleCommand',
                *           transformRequest:[yourTransformRequest].concat($http.defaults.transformRequest),
                *           transformResponse:[common.transformHttpRequest].concat($http.defaults.transformResponse)
                *       }
                *     });
                *   }
                * ```
        
                * @returns {CommandResponse} A {@link type:CommandResponse} object
                *
                *
                *
                */
            Common.prototype.transformHttpResponse = function (httpResponseBody, strModuleName) {
                var res = null;
                if (!httpResponseBody) {
                    res = new framework.CommandResponse(false, new framework.ExecutionError('-1', 'Generic Error'));
                    this.logger.logError('-1: Error: Generic Error', '', strModuleName);
                    return res;
                }
                try {
                    var jsonData = JSON.parse(httpResponseBody);
                    if (!jsonData.Error) {
                        res = new framework.CommandResponse(false, new framework.ExecutionError(jsonData.error.code, jsonData.error.message));
                        this.logger.logError(jsonData.error.code + ' : ' + jsonData.error.message, '', strModuleName);
                        return res;
                    }
                    res = new framework.CommandResponse(jsonData.Succeeded, new framework.ExecutionError(jsonData.Error.ErrorCode, jsonData.Error.ErrorMessage));
                    if (jsonData.Succeeded && jsonData.Error.ErrorCode === 0) {
                        this.logger.logInfo(jsonData.Error.ErrorCode + ' : ' + jsonData.Error.ErrorMessage, '', strModuleName);
                    }
                    else {
                        this.logger.logError(jsonData.Error.ErrorCode + ' : ' + jsonData.Error.ErrorMessage, '', strModuleName);
                    }
                }
                catch (e) {
                    res = new framework.CommandResponse(false, new framework.ExecutionError('-1', 'Error: ' + e.message));
                    this.logger.logError('-1: Error: ' + e.message, '', strModuleName);
                }
                return res;
            };
            Common.prototype.subscribeApolloContainerEvents = function () {
                var _this = this;
                if (this.swacManager.enabled) {
                    this.swacManager.eventBusServicePromise.promise.then(function (eventBusSvc) {
                        eventBusSvc.register('showAboutDialog');
                        eventBusSvc.register('showRuntimeHelp');
                        eventBusSvc.register('historyNavigation');
                        eventBusSvc.event.subscribe(function (event) {
                            if (event.data.topic === 'showAboutDialog') {
                                _this.logger.logInfo("New context registered", event.data.data);
                                _this.headerService.openAboutDialog();
                            }
                            if (event.data.topic === 'showRuntimeHelp') {
                                _this.logger.logInfo("New context registered", event.data.data);
                                _this.headerService.openSolutionStudioHelp();
                            }
                            if (event.data.topic === 'historyNavigation') {
                                if (_this.historyTracker.length > _this.index_value) {
                                    _this.stateObjectInstane = _this.historyTracker[_this.historyTracker.length - _this.index_value];
                                    _this.stateObjectInstane.navigateBack = true;
                                    _this.$state.go(_this.stateObjectInstane.state, _this.stateObjectInstane.stateParams);
                                }
                            }
                        });
                    });
                }
            };
            Common.prototype.updatePreviousButton = function (visibility) {
                if (this.swacManager.enabled) {
                    this.swacManager.contextServicePromise.promise.then(function (service) {
                        service.updateCtx('oefDisableGoToPreviousPage', visibility);
                    });
                }
            };
            Common.$inject = [
                '$rootScope',
                'CommandResponse',
                'ExecutionError',
                'common.services.globalization.globalizationService',
                'common.services.logger.service',
                'common.services.layout.shell',
                'common.services.ui.authentication',
                'common.services.sidePanel.service',
                'common.widgets.commandBar.service',
                'common.services.dragdrop.service',
                'common.widgets.messageOverlay.service',
                'common.widgets.globalDialog.service',
                'common.services.swac.SwacUiModuleManager',
                'common.services.header.service',
                'common.services.timer',
                'CONFIG',
                '$state'
            ];
            return Common;
        }());
        framework.Common = Common;
        /**
         * @ngdoc service
         * @name common
         * @module siemens.simaticit.common
         * @access internal
         * @description
         * This service is a container for the most commonly-used services.
         */
        angular.module('siemens.simaticit.common').service('common', [
            '$rootScope',
            'CommandResponse',
            'ExecutionError',
            'common.services.globalization.globalizationService',
            'common.services.logger.service',
            'common.services.layout.shell',
            'common.services.ui.authentication',
            'common.services.sidePanel.service',
            'common.widgets.commandBar.service',
            'common.services.dragdrop.service',
            'common.widgets.messageOverlay.service',
            'common.widgets.globalDialog.service',
            'common.services.swac.SwacUiModuleManager',
            'common.services.header.service',
            'common.services.timer',
            'CONFIG',
            '$state',
            Common
        ]);
        var Utils = /** @class */ (function () {
            function Utils() {
            }
            Utils._randomIdGenerator = function (flag) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return flag ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            };
            Utils.generateUUID = function () {
                return this._randomIdGenerator() + this._randomIdGenerator(true) + this._randomIdGenerator(true) + this._randomIdGenerator();
            };
            return Utils;
        }());
        framework.Utils = Utils;
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=common.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
         * @ngdoc service
         * @access internal
         * @name common.services.component.migrationService
         * @module siemens.simaticit.common
         * @access internal
         *
         * @description
         * A service that reads an old version of a component manifest and returns an updated manifest converted to version 2.0.0.
         */
        var ComponentMigrationService = /** @class */ (function () {
            function ComponentMigrationService(logger) {
                this.logger = logger;
            }
            /**
            * @ngdoc method
            * @access internal
            * @name common.services.component.migrationService#migrateUIComponentManifest
            * @access internal
            * @param {(Object | String)} manifest Manifest of the UI component.
            * @description Reads the old version of the component manifest and returns an updated manifest converted to version 2.0.0.
            * @returns {Object} An object of the converted manifest.
            */
            ComponentMigrationService.prototype.migrateUIComponentManifest = function (manifest) {
                var _this = this;
                var input;
                try {
                    if (typeof manifest === "string") {
                        input = JSON.parse(manifest);
                    }
                    else {
                        input = manifest;
                    }
                }
                catch (err) {
                    this.logger.logError('migration service: migrateUIComponentManifest()', err, 'Unable to parse UI Component manifest.');
                    return;
                }
                if (input.manifestVersion && input.manifestVersion === "02.00.00") {
                    this.logger.logInfo('UI Component manifest is up-to-date.');
                    return manifest;
                }
                // Check if the manifest contains the mandatory fields of the old manifest format.
                if (!input.name || !input.title || !input.source) {
                    this.logger.logError('migration service: migrateUIComponentManifest() - Invalid UI Component manifest.');
                    return;
                }
                var result = {};
                result.manifestVersion = "02.00.00";
                result.uiComponent = {
                    identity: {
                        "name": input.name,
                        "title": input.title,
                        "version": input.version,
                        "source": input.source,
                        "dependencies": input.dependencies
                    },
                    metadata: {
                        "description": input.description,
                        "icon": input.icon,
                        "image": input.image,
                        "size": input.size
                    },
                    contracts: {
                        api: {
                            methods: {},
                            events: {}
                        },
                        dpc: {}
                    }
                };
                if (input.API && input.API.functions && input.API.functions.length) {
                    input.API.functions.forEach(function (f) {
                        var method = { description: "", parameters: {} };
                        if (f[1]) {
                            method.description = f[1];
                        }
                        if (f[2] !== null && f[2] !== undefined && f[2] !== 'null') {
                            method.return = { type: f[2] };
                        }
                        if (f[3] && f[3].length > 0) {
                            f[3].forEach(function (p) {
                                method.parameters[p[0]] = { type: p[1] };
                            });
                        }
                        result.uiComponent.contracts.api.methods[f[0]] = method;
                    });
                }
                if (input.API && input.API.events && input.API.events.length) {
                    input.API.events.forEach(function (e) {
                        var event = { description: "", arguments: {} };
                        if (e[1]) {
                            event.description = e[1];
                        }
                        if (e[2]) {
                            e[2].forEach(function (a) {
                                event.arguments[a[0]] = { type: a[1] };
                            });
                        }
                        result.uiComponent.contracts.api.events[e[0]] = event;
                    });
                }
                if (input.DPC && input.DPC.length) {
                    input.DPC.forEach(function (val) {
                        if (_this.titleValidation(val[0])) {
                            if (Object.prototype.toString.call(val[1]) !== '[object Array]') {
                                result.uiComponent.contracts.dpc[val[0]] = _this.createData(val);
                            }
                            else {
                                result.uiComponent.contracts.dpc[val[0]] = _this.createStructure(val[1]);
                            }
                        }
                    });
                }
                return result;
            };
            ComponentMigrationService.prototype.titleValidation = function (str) {
                var valid = false;
                if (str && str.trim()) {
                    valid = true;
                }
                return valid;
            };
            ComponentMigrationService.prototype.createData = function (dataArray) {
                var data = {};
                //Values are fetched in the following order =>  [ "title" , "description" , "permissions" , "type" , "default"]
                /* tslint:disable:no-string-literal */
                data["node"] = "data";
                data["description"] = dataArray[1];
                data["permission"] = dataArray[2];
                data["type"] = (dataArray[3] === undefined) ? '' : dataArray[3];
                data["default"] = dataArray[4];
                /* tslint:enable:no-string-literal */
                return data;
            };
            ComponentMigrationService.prototype.createStructure = function (structarray) {
                var _this = this;
                var structure = {};
                /* tslint:disable:no-string-literal */
                structure["node"] = "structures";
                structure["children"] = {};
                var children = structure["children"];
                /* tslint:enable:no-string-literal */
                structarray.forEach(function (dataArray) {
                    children[dataArray[0]] = _this.createData(dataArray);
                });
                return structure;
            };
            ComponentMigrationService.$inject = ['common.services.logger.service'];
            return ComponentMigrationService;
        }());
        framework.ComponentMigrationService = ComponentMigrationService;
        angular.module('siemens.simaticit.common').service('common.services.component.migrationService', ComponentMigrationService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=component-migration-svc.js.map
(function () {
    'use strict';


    /**
     * @ngdoc constant
     * @module siemens.simaticit.common.base
     * @name RESOURCE
     *
     * @description
     * A constant that contains information on how to load localization files in all available languages.
     *
     * @value
     * ```
     *   {
     *       path: [
     *           {
     *               name: 'common/resources/', modules: [
     *                   { name: 'common' }
     *               ]
     *           }
     *       ]
     *    }
     * ```
     */
    angular.module('siemens.simaticit.common.base').constant('RESOURCE', {
        path: [
            {
                name: 'common/resources/', modules: [
                  { name: 'common' }
                ]
            }
            //examples for other paths-modules
            /*{ name: 'core/resources/', modules: [
                {name: 'uom'}
            ]}*/
        ]

    });

    /**
     * @ngdoc constant
     * @module siemens.simaticit.common.base
     * @name THEMES
     *
     * @description
     * The available themes that can be applied to the UI Application.
     * @value
     * ```
     *    [
     *       { id: 0, name: 'Light', styleSheets: ['common/styles/common-light.css'] },
     *       { id: 1, name: 'Dark', styleSheets: ['common/styles/common-dark.css'] }
     *    ]
     * ```
     */
    angular.module('siemens.simaticit.common.base').constant('THEMES',
         [
             { id: 0, name: 'Light', styleSheets: ['common/styles/common-light.css'] },
             { id: 1, name: 'Dark', styleSheets: ['common/styles/common-dark.css'] }
         ]
    );
    /*
     * old theme definition
    app.constant('THEMES',
         [{ id: 0, name: 'Light', value: 'content/themes/light/siemens-theme-light.css' },
          { id: 1, name: '*Dark*', value: 'content/themes/dark/siemens-theme-dark.css' },
          { id: 1, name: 'Stone', value: 'content/themes/stone/siemens-theme-stone.css' },
          { id: 1, name: 'Sand', value: 'content/themes/sand/siemens-theme-sand.css' }]
    );
     */

})();


(function () {
    'use strict';

    /**
     * @ngdoc constant
     * @module siemens.simaticit.common
     * @name LOG_TYPES
     *
     * @description
     * List of log types.
     *
     * @value
     * ```
     *   {
     *     LOG_GENERIC: 'GENERIC',
     *     LOG_INFO: 'INFO',
     *     LOG_WARNING: 'WARNING',
     *     LOG_ERROR: 'ERROR',
     *     LOG_DEBUG: 'DEBUG'
     *   }
     * ```
     */
    angular.module('siemens.simaticit.common').constant('LOG_TYPES', {
        LOG_GENERIC: 'GENERIC',
        LOG_INFO: 'INFO',
        LOG_WARNING: 'WARNING',
        LOG_ERROR: 'ERROR',
        LOG_DEBUG: 'DEBUG'
    });



    /**
     * @ngdoc constant
     * @module siemens.simaticit.common
     * @name LOG_LEVELS
     *
     * @description
     * List of log levels.
     *
     * @value
     * ```
     *   {
     *      LOG_NONE: 0,
     *      LOG_ERROR: 1,
     *      LOG_WARNING: 2,
     *      LOG_DEBUG: 3,
     *      LOG_INFO: 4,
     *      LOG_VERBOSE: 5
     *   }
     * ```
     *
     * @property {Number} LOG_NONE     0 - All logs are disabled
     * @property {Number} LOG_ERROR    1 - The enabled log type is: LOG_ERROR
     * @property {Number} LOG_WARNING  2 - The enabled log types are: LOG_ERROR, LOG_WARNING
     * @property {Number} LOG_DEBUG    3 - The enabled log types are: LOG_ERROR, LOG_DEBUG, LOG_WARNING
     * @property {Number} LOG_INFO     4 - The enabled log types are: LOG_ERROR, LOG_DEBUG, LOG_WARNING, LOG_INFO
     * @property {Number} LOG_VERBOSE  5 - All log types are enabled
     */
    angular.module('siemens.simaticit.common').constant('LOG_LEVELS', {
        LOG_NONE: 0,
        LOG_ERROR: 1,
        LOG_WARNING: 2,
        LOG_DEBUG: 3,
        LOG_INFO: 4,
        LOG_VERBOSE: 5
    });

})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
         * @ngdoc module
         * @name siemens.simaticit.common.services.cookie
         * @module siemens.simaticit.common
         *
         * @description
         * Contains services to manage cookies.
         *
         *
         */
        angular.module('siemens.simaticit.common.services.cookie', []);
        var CookieConfig = /** @class */ (function () {
            function CookieConfig() {
                this.config = {
                    cookieAccessToken: 'UAF-AccessToken'
                };
            }
            CookieConfig.prototype.$get = function () {
                return {
                    config: this.config
                };
            };
            return CookieConfig;
        }());
        framework.CookieConfig = CookieConfig;
        angular.module('siemens.simaticit.common.services.cookie').provider('common.services.cookie.config', CookieConfig);
        var CookieService = /** @class */ (function () {
            function CookieService($log, cookieConfig) {
                this.$log = $log;
                this.cookieConfig = cookieConfig;
            }
            /**
                * @ngdoc method
                * @name common.services.cookie#get
                * @description
                * Gets the value of the key specified from the document cookies
                * @param {string} key Key of the item whose value has to be obtained.
                * @returns {Object} An object containing the value.
                */
            CookieService.prototype.get = function (key) {
                var name = key + "=";
                var cookies = window.document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    while (cookie.charAt(0) === ' ') {
                        cookie = cookie.substring(1);
                    }
                    if (cookie.indexOf(name) === 0) {
                        return cookie.substring(name.length, cookie.length);
                    }
                }
                return null;
            };
            /**
            * @ngdoc method
            * @name common.services.cookie#set
            * @description
            *  Sets a new key value in the document cookies
            * @param {string} key Key of the item whose value has to be set.
            * @param {object} value Value of the item whose value has to be obtained.
            */
            CookieService.prototype.set = function (key, value) {
                window.document.cookie = key + "=" + value + ";path=/";
            };
            /**
            * @ngdoc method
            * @name common.services.cookie#remove
            * @description
            * Removes a specified key, value fron the document cookies list
            * @param {string} key Key of the item to be removed.
            * @returns {boolean} Boolean value to indicate if the key is removed successfully.
            */
            CookieService.prototype.remove = function (key) {
                if (this.get(key) == null) {
                    this.$log.info('Cookie storage key  \'' + key + '\' not found');
                    return false;
                }
                else {
                    var cookieValue = this.get(key);
                    var date = new Date();
                    window.document.cookie = key + "=" + cookieValue + "; expires=" + date.toUTCString();
                    return true;
                }
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            CookieService.prototype.getAccessToken = function () {
                var value = this.get(this.cookieConfig.config.cookieAccessToken);
                if (value !== null) {
                    var token = JSON.parse(value);
                    return token;
                }
                return null;
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            CookieService.prototype.setAccessToken = function (value) {
                this.set(this.cookieConfig.config.cookieAccessToken, value);
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            CookieService.prototype.removeAccessToken = function () {
                this.remove(this.cookieConfig.config.cookieAccessToken);
            };
            CookieService.$inject = ['$log', 'common.services.cookie.config'];
            return CookieService;
        }());
        framework.CookieService = CookieService;
        /**
            * @ngdoc service
            * @name common.services.cookie
            * @module siemens.simaticit.common.services.cookie
            *
            * @description
            * This service can be used to perform operations on cookies.
            *
            */
        angular.module('siemens.simaticit.common.services.cookie')
            .service('common.services.cookie', ['$log', 'common.services.cookie.config', CookieService]);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=cookie.svc.js.map
/**
 * Created by Administrator on 18/11/2014.
 */
(function () {
    'use strict';

    var module = angular.module('siemens.simaticit.common');

    module.provider('debug', [function () {

        this.config = {
            // These are the properties we need to set
            enableDebug: false
        };

        //list of ui-view on page
        this.uiViews = [];

        this.$get = function () {
            return {
                config: this.config,
                uiViews: this.uiViews
            };
        };
    }]);

})();







(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @access internal
     * @name hAdapter
     * @module siemens.simaticit.common.services.layout
     * @description
     * Sets inline height to match the remaining height available in the browser.
     *
     *
     * @usage
     * as a attribute
     * ```
     *      <div h-adapter>
     *      ...
     *      </div>
     * ```
     * @param {string}
     * list List of classes that identifies the DOM elements.
     * @example
     * ```
     *      <div class="class002>class002 = height 50px</div>
     *      <div class="class001">class001 = height 30px</div>
     *      <div h-adapter=".class001,.class002,">
     *           height result = browser_Height - headerheight - 50px - 30px;
     *      </div>
     * ```
     * In the above example, we have three **div** elements.
     * The first two **div** elements are assigned with classes class002 (with height 50px) and class001(with height 30px) respectively.
     * `h-adapter` directive is applied to the third **div** element.
     * It takes the classes whose heights need to be deducted for automatically adjusting the height of the current **div**.
     * The height of the third **div** is automatically calculated as follows:
     *```
     *height result= browser_height- header_height- (height of class001)-(height of class002)
     *```
     */
    angular.module('siemens.simaticit.common.services.layout')
        .directive('hAdapter', ['$window', 'common.services.component.swacComponentManager', function ($window, swacComponentManager) {
            //app.directive('hAdapter', ['$window', function ($window, CONFIG, APPCONFIG) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    scope.onResize = function () {
                        var header = 25; //@header-height
                        var height = 0;
                        if (attrs.hAdapter !== '') {
                            var elements = attrs.hAdapter.split(',');
                            for (var i = 0; i < elements.length; i++) {
                                if ($(elements[i]).length > 0) {
                                    height += $(elements[i])[0].clientHeight;
                                }
                            }
                        }
                        //in swac.html,swac.debug.html, don't deduct header hight as there is no header.
                        if (swacComponentManager.enabled) {
                            elem.windowHeight = $window.innerHeight - height;
                        } else {
                            elem.windowHeight = $window.innerHeight - header - height;
                        }

                        $(elem).height(elem.windowHeight);
                        scope.$broadcast('common.service.layout.h-adapter.height-changed', elem);
                    };
                    scope.onResize();

                    angular.element($window).bind('resize', scope.onResize);

                    scope.$on('$destroy', function () {
                        angular.element($window).unbind('resize', scope.onResize);
                    });
                }
            };
        }]);
})();

'use strict';
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
        *  @ngdoc constant
        *  @access internal
        *  @name CARD_CONFIGURATION
        *  @module siemens.simaticit.common.services.layout
        *  @description A List containing all the information about home card categories.
        */
        var CARD_CONFIGURATION = {
            'Archiving': {
                'id': 'Archiving',
                'titleKey': 'homeCards.archiving.title',
                'descriptionKey': 'homeCards.archiving.description',
                'imagePath': 'common/images/home-cards/imgArchive.png'
            },
            'Interoperability': {
                'id': 'Interoperability',
                'titleKey': 'homeCards.interoperability.title',
                'descriptionKey': 'homeCards.interoperability.description',
                'imagePath': 'common/images/home-cards/imgInteroperability.png'
            },
            'Manufacturing': {
                'id': 'Manufacturing',
                'titleKey': 'homeCards.manufacturing.title',
                'descriptionKey': 'homeCards.manufacturing.description',
                'imagePath': 'common/images/home-cards/imgManufacturing.png'
            },
            'ProcessActivities': {
                'id': 'ProcessActivities',
                'titleKey': 'homeCards.processActivities.title',
                'descriptionKey': 'homeCards.processActivities.description',
                'imagePath': 'common/images/home-cards/imgProcessActivities.png'
            },
            'System': {
                'id': 'System',
                'titleKey': 'homeCards.system.title',
                'descriptionKey': 'homeCards.system.description',
                'imagePath': 'common/images/home-cards/imgSettings.png'
            },
            'ShopfloorExecution': {
                'id': 'ShopfloorExecution',
                'titleKey': 'homeCards.shopfloorExecution.title',
                'descriptionKey': 'homeCards.shopfloorExecution.description',
                'imagePath': 'common/images/home-cards/imgShopfloorExecution.png'
            },
            'ProductionCoordination': {
                'id': 'ProductionCoordination',
                'titleKey': 'homeCards.productionCoordination.title',
                'descriptionKey': 'homeCards.productionCoordination.description',
                'imagePath': 'common/images/home-cards/ImgProductionCoordination.png'
            },
            'ProductandProductionConfiguration': {
                'id': 'ProductandProductionConfiguration',
                'titleKey': 'homeCards.productandProductionConfiguration.title',
                'descriptionKey': 'homeCards.productandProductionConfiguration.description',
                'imagePath': 'common/images/home-cards/imgProductAndProductionConfiguration.png'
            },
            'WorkOrder': {
                'id': 'WorkOrder',
                'titleKey': 'homeCards.workOrder.title',
                'descriptionKey': 'homeCards.workOrder.description',
                'imagePath': 'common/images/home-cards/imgWorkOrder.png'
            },
            'EquipmentEngineering': {
                'id': 'EquipmentEngineering',
                'titleKey': 'homeCards.equipmentEngineering.title',
                'descriptionKey': 'homeCards.equipmentEngineering.description',
                'imagePath': 'common/images/home-cards/imgEquipmentEngineering.png'
            },
            'MaterialEngineering': {
                'id': 'MaterialEngineering',
                'titleKey': 'homeCards.materialEngineering.title',
                'descriptionKey': 'homeCards.materialEngineering.description',
                'imagePath': 'common/images/home-cards/imgMaterialEngineering.png'
            },
            'MaterialRuntime': {
                'id': 'MaterialRuntime',
                'titleKey': 'homeCards.materialRuntime.title',
                'descriptionKey': 'homeCards.materialRuntime.description',
                'imagePath': 'common/images/home-cards/imgMaterialRuntime.png'
            },
            'Shopfloor': {
                'id': 'Shopfloor',
                'titleKey': 'homeCards.shopfloor.title',
                'descriptionKey': 'homeCards.shopfloor.description',
                'imagePath': 'common/images/home-cards/imgShopfloor.png'
            },
            'Process': {
                'id': 'Process',
                'titleKey': 'homeCards.process.title',
                'descriptionKey': 'homeCards.process.description',
                'imagePath': 'common/images/home-cards/imgProcess.png'
            }
        };
        var HomeCardConfiguration = /** @class */ (function () {
            function HomeCardConfiguration(CONFIG, UIAuthorization) {
                this.homeCardConfig = [];
                this.homeConfig = {};
                this.authorizedScreens = [];
                if (CONFIG.type !== 'rt' || !CONFIG.enableHomeCard) {
                    return;
                }
                this.getAuthorizedScreens(UIAuthorization);
                this.initHomeConfig(CONFIG);
                this.generateHomeCardConfig();
            }
            HomeCardConfiguration.prototype.getAuthorizedScreens = function (UIAuthorization) {
                this.authorizedScreens = UIAuthorization.getAuthorizedScreens().slice();
            };
            HomeCardConfiguration.prototype.initHomeConfig = function (CONFIG) {
                var _this = this;
                if (CONFIG.menu && CONFIG.menu.length) {
                    CONFIG.menu.forEach(function (menu) {
                        if (!menu.display) {
                            return;
                        }
                        var contents = menu.contents;
                        if (contents && contents.length) {
                            contents.forEach(function (content) {
                                if (_this.isAuthorized(content) && content.hasOwnProperty('category')) {
                                    _this.formHomeConfig(menu.title, content);
                                }
                            });
                        }
                        else if (_this.isAuthorized(menu) && menu.hasOwnProperty('category')) {
                            _this.formHomeConfig(menu.title, menu);
                        }
                    });
                }
            };
            HomeCardConfiguration.prototype.isAuthorized = function (screen) {
                if (screen.display && screen.securable) {
                    var display = false;
                    for (var i = 0; i < this.authorizedScreens.length; i++) {
                        if (screen.id === this.authorizedScreens[i]) {
                            display = true;
                            this.authorizedScreens.splice(i, 1);
                            break;
                        }
                    }
                    screen.display = display;
                }
                return screen.display;
            };
            HomeCardConfiguration.prototype.formHomeConfig = function (title, content) {
                var category = content.category;
                var moduleName = title;
                var config = {
                    'title': content.title,
                    'state': content.id,
                    'icon': content.icon,
                    'svgIcon': content.svgIcon
                };
                if (this.homeConfig.hasOwnProperty(category)
                    && !this.homeConfig[category].hasOwnProperty(moduleName)) {
                    this.homeConfig[category][moduleName] = [];
                }
                else if (!this.homeConfig.hasOwnProperty(category)) {
                    this.homeConfig[category] = {};
                    this.homeConfig[category][moduleName] = [];
                }
                this.homeConfig[category][moduleName].push(config);
            };
            HomeCardConfiguration.prototype.generateHomeCardConfig = function () {
                var _this = this;
                var categories = Object.keys(this.homeConfig);
                categories.forEach(function (category) {
                    _this.homeCardConfig.push(CARD_CONFIGURATION[category]);
                });
            };
            HomeCardConfiguration.prototype.getHomeCardConfig = function () {
                return this.homeCardConfig;
            };
            HomeCardConfiguration.prototype.getHomeTileConfig = function (category) {
                return this.homeConfig[category];
            };
            HomeCardConfiguration.$inject = ['CONFIG', 'common.services.security.ui.authorization'];
            return HomeCardConfiguration;
        }());
        framework.HomeCardConfiguration = HomeCardConfiguration;
        angular.module('siemens.simaticit.common.services.layout')
            .service('common.services.homeCard.config', HomeCardConfiguration);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=home-card-svc.js.map
(function () {
    'use strict';


    /**
     * @ngdoc service
     * @name common.services.sidePanel.service
     * @module siemens.simaticit.common.services.layout
     *
     * @description
     * This service is responsible for managing the side panel.
     *
     * **Note:** *It is recommended to use the following template format for creating the sidepanel templates*.
     *
     * ```
     *   <div class="command-bar-side-panel">
     *          //header section -> command bar placed here
     *   </div>
     *   <div class="side-panel-property-area-body">
     *          //body section -> content goes here
     *   </div>
     *   <div class="msg msg-warning">
     *          //footer section -> error messages displayed here
     *   </div>
     *```
     *
     * @example
     * The following example shows how to open a side panel as well as how to set its title and type.
     * ```
     *  $scope.spTypes = common.services.sidePanel.service.getTypesList();
     *  var spType = $scope.spTypes.edit; //or $scope.spTypes.property;
     *  common.services.sidePanel.service.setTitle('myTitle');
     *  common.services.sidePanel.service.open(spType);
     *
     * ```
     *
     * The following example shows how to close the side panel.
     * ```
     *
     *  common.services.sidePanel.service.close();
     *
     * ```
     *
     */

    function sidePanelManager(swacManager) {
        var _that = this;
        var sidePanelCallback = null;
        var sidePanelSetTitleCallback = null;
        var sidePanelType = null;
        this.register = register;
        this.openclose = openclose;
        this.setopen = setopen;
        this.setTitle = setTitle;
        this.getTypesList = getTypesList;
        this.getSidePanelInfo = getSidePanelInfo;
        this.getSidePanelStatus = getSidePanelStatus;
        this.onOpenCloseCallback;
        var isOpened;
        var promise;
        var sidePanelInstances = 0;
        swacManager.eventBusServicePromise.promise.then(function (eventBusSvc) {
            promise = eventBusSvc;
        });
        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#register
         * @access internal
         * @param {function} callback Function that opens or closes the side panel (shell controller).
         * @param {function} setTitleCallback Sets the title of the side panel (shell controller).
         *
         * @description
         * Stores two functions (from the shell controller) that manage the **sidePanel**.
         * ```
         * common.services.sidePanel.service.register(openCloseFunctionCallback, setTitleCallback);
         * ```
         */
        function register(callback, setTitleCallback) {
            sidePanelCallback = callback;
            sidePanelSetTitleCallback = setTitleCallback;
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.services.sidePanel.service#onOpenCloseCallback
         * @param {bool} isSidePanelOpen The status of the side panel either **open** or **closed**
         * @param {String} type The type of the side panel
         *
         * @description
         * Executes the callback function whenever the side panel is opened or closed.
         * ```
         * common.sidePanelManager.onOpenCloseCallback = function (isSidePanelOpen, type) {
         * }
         * ```
         */
        function openCloseCallback(isSidePanelOpen, type) {
            isOpened = !isSidePanelOpen;

            if (_that.onOpenCloseCallback && typeof _that.onOpenCloseCallback === 'function') {
                _that.onOpenCloseCallback(!isSidePanelOpen, type);
            }
        }

        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#openClose
         * @description
         * Opens or closes the side panel.
         * @param {String | Object} type If type is a string, it represents the mode of the side panel.
         * ```
         *   common.services.sidePanel.service.openclose('e');
         * ```
         *
         * If the type is an object, it must follow the following format:
         * * **mode**: defines the mode of the side panel.
         *   * **p**: The property(non modal) mode that will push the content. Mode 'p' can have only 'small' size.
         *   * **e**: The edit(modal) mode that will come as overlay on the content.
         *
         * * **size**: defines the size of the layout for side panel. Below are the sizes which can be configured for 'e' mode sidepanel:
         *   * **small**: The width of the side panel will be 360px
         *   * **large**: The width of the side panel will be 480px. _The default size is large_.
         *   * **wide**: The width of the side panel will be 704px.
         *
         * ```
         * common.services.sidePanel.service.openclose({
         *                    mode: 'e',
         *                    size:'small'
         *                });
         * ```
         */

        function openclose(type) {
            sidePanelType = type && type.mode ? type.mode : type;
            openCloseCallback(sidePanelCallback(null, type), sidePanelType);
        }

        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#open
         * @description
         * Opens the side panel.
         * @param {String | Object} type If type is a string, it represents the mode of the side panel.
         * ```
         *   common.services.sidePanel.service.open('e');
         * ```
         *
         * If the type is an object, it must follow the following format:
         * * **mode**: defines the mode of the side panel.
         *   * **p**: The property(non modal) mode that will push the content. Mode 'p' can have only 'small' size.
         *   * **e**: The edit(modal) mode that will come as overlay on the content .
         *
         * * **size**: defines the size of the layout for side panel. Below are the sizes which can be configured for 'e' mode sidepanel:
         *   * **small**: The width of the side panel will be 360px
         *   * **large**: The width of the side panel will be 480px. _The default size is large_.
         *   * **wide**: The width of the side panel will be 704px.
         *
         * ```
         * common.services.sidePanel.service.open({
         *                    mode: 'e',
         *                    size:'small'
         *                });
         * ```
         */
        function open(type) {
            sidePanelType = type && type.mode ? type.mode : type;
            openCloseCallback(sidePanelCallback(false, type), sidePanelType);
            sidePanelInstances++;
            if (sidePanelInstances === 1 && swacManager.enabled) {
                if (type.mode == 'e' && promise) {
                    promise.publish('modal.overlay.show', {
                        style: {
                            'z-index': 99,
                            'background': 'transparent'
                        },
                        animationWaitTime: 0
                    });
                }
            }
        }


        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#close
         * @description
         * Closes the side panel.
         *
         * ```
         * common.services.sidePanel.service.close();
         * ```
         */
        function close(type) {
            sidePanelType = type && type.mode ? type.mode : type;
            sidePanelInstances = 0;
            if (swacManager.enabled && promise) {
                promise.publish('modal.overlay.hide');
            }
            openCloseCallback(sidePanelCallback(true, type), sidePanelType);
        }


        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#setopen
         * @description
         * Opens or closes the side panel of the type specified by the parameter.
         * @param {boolean} open Defines whether side panel should be open or close.
         * @param {String | Object} type If type is a string, it represents the mode of side panel.
         * ```
         *   common.services.sidePanel.service.open('e');
         * ```
         *
         * If the type is an object, it must follow the following format:
         * * **mode**: defines the mode of the side panel.
         *   * **p**: The property(non modal) mode that will push the content. Mode 'p' can have only 'small' size.
         *   * **e**: The edit(modal) mode that will come as overlay on the content .
         *
         * * **size**: defines the size of the layout for side panel. Below are the sizes which can be configured for 'e' mode sidepanel:
         *   * **small**: The width of the side panel will be 360px
         *   * **large**: The width of the side panel will be 480px. _The default size is large_.
         *   * **wide**: The width of the side panel will be 704px.
         *
         *
         * ```
         * //open sidePanel
         * var type = common.services.sidePanel.service.getTypesList().edit;
         * var isSidePanelOpened = true
         * common.services.sidePanel.service.setopen(isSidePanelOpened, type);
         *
         * //closeSidePanel
         * var type = common.services.sidePanel.service.getTypesList().edit;
         * var isSidePanelOpened = false
         * common.services.sidePanel.service.setopen(isSidePanelOpened, type);
         *
         * ```
         */
        function setopen(open, type) {
            sidePanelType = type && type.mode ? type.mode : type;
            openCloseCallback(sidePanelCallback(!open, type), sidePanelType);
        }



        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#setTitle
         * @description
         * Sets the title of the side panel.
         * @param {String} value The title of the side panel
         *
         * ```
         * common.services.sidePanel.service.setTitle('my Title');
         * ```
         */
        function setTitle(value) {
            sidePanelSetTitleCallback(value);
        }


        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#getTypesList
         * @description
         * Gets the side panel types.
         * @returns {object} The types of side panel either **property** or **edit**
         * ```
         * var types = common.services.sidePanel.service.getTypesList();
         * //types.property
         * //types.edit
         * ```
         */
        function getTypesList() {
            return {
                property: 'p',
                edit: 'e'
            };
        }


        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#getSidePanelInfo
         * @description
         * Gets the current side panel type.
         * @returns {string} Current side panel type

         * ```
         * var types = common.services.sidePanel.service.getTypesList();
         * var currentType = common.services.sidePanel.service.getSidePanelInfo();
         *
         * ```
         */
        function getSidePanelInfo() {
            return sidePanelType;
        }

        /**
         * @ngdoc method
         * @name common.services.sidePanel.service#getSidePanelInfo
         * @access internal
         * @description
         * Gets the current side panel open close status.
         * @returns {boolean} Current status of side panel.

         * ```
         * var status = common.services.sidePanel.service.getSidePanelStatus();
         *
         * if (status === true){ ...
         *
         * ```
         */
        function getSidePanelStatus() {
            return isOpened;
        }

        this.open = open;
        this.close = close;


    }
    angular.module('siemens.simaticit.common.services.layout').service('common.services.sidePanel.service', sidePanelManager);
    sidePanelManager.$inject = ['common.services.swac.SwacUiModuleManager'];



    function globalMsgOverlayManager($rootScope, overlayService, swacUiModuleManager) {
        var overlayId = 'globalMsgOverlayId';
        this.show = _.debounce(showOverlayModal, 300, true);
        this.hide = hideOverlayModal;
        this.get = getOverlayData;
        this.set = setOverlayData;

        /* register: function (callback, setTitleCallback, setTypeCallback, setWidthCallback) {
            sidePanelCallback = callback;
            sidePanelSetTitleCallback = setTitleCallback;
            sidePanelTypeCallback = setTypeCallback;
            sidePanelWidthCallback = setWidthCallback;
        },*/
        /**
         * @ngdoc method
         * @name common.widgets.messageOverlay.service#show
         *
         * @description
         * Shows the message overlay.
         *
         */
        function showOverlayModal(options) {
            if (swacUiModuleManager.enabled) {
                if ($rootScope.globalOverlayData.buttons.length > 1 || (options !== undefined && options.type !== undefined && options.type === "confirmation")) {
                    swacUiModuleManager.confirmationServicePromise.promise.then(function (service) {
                        var overlayButtons = $rootScope.globalOverlayData.buttons;
                        service.show($rootScope.globalOverlayData.title, $rootScope.globalOverlayData.text, {
                            buttons: $rootScope.globalOverlayData.buttons
                        }).then(function (val) {
                            for (var i = 0; i < overlayButtons.length; i++) {
                                if (overlayButtons[i].id === val.buttonId) {
                                    overlayButtons[i].onClickCallback();
                                    break;
                                }
                            }
                        });
                    });
                } else if (options !== undefined && options.type !== undefined && options.type === "warning") {
                    swacUiModuleManager.warningServicePromise.promise.then(function (service) {
                        service.show($rootScope.globalOverlayData.title, $rootScope.globalOverlayData.text);
                    });
                } else {
                    swacUiModuleManager.errorServicePromise.promise.then(function (service) {
                        service.show($rootScope.globalOverlayData.title, $rootScope.globalOverlayData.text);
                    });
                }
            } else {
                overlayService.showOverlayModal(overlayId);
            }
        }

        /**
         * @ngdoc method
         * @name common.widgets.messageOverlay.service#hide
         *
         * @description
         * Hides the message overlay.
         *
         */
        function hideOverlayModal() {
            if (swacUiModuleManager.enabled) {
                swacUiModuleManager.confirmationServicePromise.promise.then(function (service) {
                    service.hide();
                });
            } else {
                overlayService.hideOverlayModal(overlayId);
            }
        }

        /**
         * @ngdoc method
         * @name common.widgets.messageOverlay.service#get
         * @return {OverlayConfiguration} See {@link OverlayConfiguration}.
         *
         * @description
         * Gets the configuration data of the message overlay.
         *
         */
        function getOverlayData() {
            return $rootScope.globalOverlayData;
        }

        /**
         * @ngdoc method
         * @name common.widgets.messageOverlay.service#set
         * @param {OverlayConfiguration} value See {@link OverlayConfiguration}.
         *
         * @description
         * Sets the configuration data of the message overlay.
         *
         * Input value:
         * ```
         * value = {
         *      text: 'Error: unable to perform operation!',
         *      title: 'Service error',
         *      buttons: [{
         *        id: 'okButton',
         *        displayName: 'OK',
         *        onClickCallback: vm.removeOverlay
         *      }]
         * }
         * ```
         *
         *
         */
        function setOverlayData(value) {
            $rootScope.globalOverlayData = value;
        }


    }
    /**
     * @ngdoc type
     * @name OverlayConfiguration
     * @module siemens.simaticit.common.services.layout
     * @description
     * A configuration object used to configure the setting of a message overlay managed through the {@link common.widgets.messageOverlay.service} service.
     * @property {string} title The title of the message overlay.
     * @property {string} text The text of the message overlay.
     * @property {DialogButton[]} buttons An array of {@link type:DialogButton} objects.
     */
    /**
     * @ngdoc service
     * @name common.widgets.messageOverlay.service
     * @module siemens.simaticit.common.services.layout
     *
     * @description
     * This service is responsible for managing the modal message overlay that is typically used to display errors in UI Applications.
     *
     * @example
     * In a controller, you can configure and use the message overlay as follows:
     *
     * ```
     *   (function(){
     *
     *       angular.module('common.widgets.messageOverlay.service.examples')
     *        .controller('GlobalOverlayController', ['$scope', 'common.widgets.messageOverlay.service', function ($scope, messageOverlay) {
     *
     *                var vm = this;
     *
     *                this.removeOverlay = function () {
     *                    messageOverlay.hide();
     *                }
     *
     *                this.displayOverlay = function () {
     *                    messageOverlay.show();
     *                }
     *
     *                this.overlay = {
     *                    text: 'Error: unable to perform operation!',
     *                    title: 'Service error',
     *                    buttons: [{
     *                        id: 'okButton',
     *                        displayName: 'OK',
     *                        onClickCallback: vm.removeOverlay
     *                    }]
     *                };
     *
     *               messageOverlay.set(vm.overlay);
     *
     *           }]);
     *   })();
     *
     * ```
     */
    angular.module('siemens.simaticit.common.services.layout').service('common.widgets.messageOverlay.service', ['$rootScope', 'common.overlay.overlayService',
        'common.services.swac.SwacUiModuleManager', globalMsgOverlayManager
    ]);

    /**
     * @ngdoc service
     * @name common.widgets.globalDialog.service
     * @module siemens.simaticit.common.services.layout
     * @description
     * Exposes methods to manage a global instance of the {@link sitDialog sit-dialog} widget.
     */
    function globalDialogManager($rootScope, dialogService) {
        var overlayId = 'globalDialogId';
        this.show = showDialogModal;
        this.hide = hideDialogModal;
        this.get = getDialogData;
        this.set = setDialogData;

        /**
         * @ngdoc method
         * @name common.widgets.globalDialog.service#show
         * @module siemens.simaticit.common.services.layout
         * @description
         * See {@link common.widgets.dialog.service#showDialogCenteredModal}.
         */
        function showDialogModal() {
            dialogService.showDialogCenteredModal(overlayId);
        }
        /**
         * @ngdoc method
         * @name common.widgets.globalDialog.service#hide
         * @module siemens.simaticit.common.services.layout
         * @description
         * See {@link common.widgets.dialog.service#hideDialogModal}.
         */
        function hideDialogModal() {
            dialogService.hideDialogModal(overlayId);
        }
        /**
         * @ngdoc method
         * @name common.widgets.globalDialog.service#get
         * @module siemens.simaticit.common.services.layout
         * @returns {GlobalDialogConfiguration} See {@link GlobalDialogConfiguration}.
         * @description
         * Retrieves the configuration data of the global dialog instance.
         */
        function getDialogData() {
            return $rootScope.globalDialogData;
        }
        /**
         * @ngdoc method
         * @name common.widgets.globalDialog.service#set
         * @module siemens.simaticit.common.services.layout
         * @param {GlobalDialogConfiguration} value See {@link GlobalDialogConfiguration}.
         * @description
         * Sets the configuration data of the global dialog instance.
         */
        function setDialogData(value) {
            $rootScope.globalDialogData = value;
        }


        /**
         * @ngdoc type
         * @name GlobalDialogConfiguration
         * @module siemens.simaticit.common.services.layout
         * @description
         * Represents the configuration of a dialog widget.
         *
         * @property {string} title The title of the global dialog.
         * @property {Object} templatedata The data to pass to the global dialog template.
         * @property {string} templateuri The URI of the custom template to use for the global dialog contents.
         * @property {DialogButton[]} buttons An array of {@link type:DialogButton} objects.
         *
         */

    }
    angular.module('siemens.simaticit.common.services.layout').service('common.widgets.globalDialog.service', ['$rootScope', 'common.widgets.dialog.service', globalDialogManager]);


    angular.module('siemens.simaticit.common.services.layout').provider('common.services.startup.service', StartUpServiceProvider);

    function StartUpServiceProvider() {
        var vm = this;
        var startupServices;
        activate();

        function activate() {
            startupServices = [];

            vm.register = register;
            vm.$get = ['$q', '$injector', getService];
        }

        function register(serviceName) {
            startupServices.push(serviceName);
        }

        function getService($q, $injector) {
            return new StartupService($q, $injector, startupServices);
        }
    }

    function StartupService($q, $injector, _startupServices) {
        var vm = this;
        var startupServices, deferred, count;

        activate();

        function activate() {
            startupServices = _startupServices;
            vm.execute = execute;
        }

        function execute() {
            deferred = $q.defer();
            count = startupServices.length;
            if (0 === count) {
                deferred.resolve();
                return deferred.promise;
            }
            angular.forEach(startupServices, function (serviceName) {
                var service = $injector.get(serviceName);
                if (undefined === service || undefined === service.execute) {
                    return;
                }
                service.execute().then(onSuccess, onError);
            });
            return deferred.promise;
        }

        function finalStep() {
            if (0 < count) {
                return;
            }
            deferred.resolve();
        }

        function onSuccess() {
            count--;
            finalStep();
        }

        function onError() {
            count--;
            finalStep();
        }
    }


    /**
     * @ngdoc service
     * @access internal
     * @name common.widgets.commandBar.service
     * @module siemens.simaticit.common.services.layout
     * @description
     * Exposes methods to manage command bar widget.
     */

    function commandBarManager($rootScope) {
        var self = this;
        var setCommandBarVisibility;
        var updateCommandBarData;
        self.showLabel = false;

        function register(setCommandBarVisibilityCallback, updateCommandsCallback) {
            setCommandBarVisibility = setCommandBarVisibilityCallback;
            updateCommandBarData = updateCommandsCallback;
        }
        function setCommandLabelVisibility(isLabelShown) {
            self.showLabel = isLabelShown || false;
            $rootScope.$broadcast('sit-commandbar-toggle-label', {
                isLabelShown: self.showLabel
            });
        }

        function getLabelVisibilityStatus() {
            return self.showLabel;
        }

        function show() {
            setCommandBarVisibility(true);
        }

        function hide() {
            setCommandBarVisibility(false);
        }

        function updateCommands(data) {
            updateCommandBarData(data);
        }

        /**
         * @ngdoc method
         * @access internal
         * @name common.widgets.commandBar.service#setCommandLabelVisibility
         * @module siemens.simaticit.common.services.layout
         * @description
         * Toggles the visibility of command label in vertical command bar.
         * @param {Boolean} verticalCommandLabelVisibility Flag to hide/show the vertical command bar label.
         */
        self.setCommandLabelVisibility = setCommandLabelVisibility;

        /**
         * @ngdoc method
         * @access internal
         * @name common.widgets.commandBar.service#getLabelVisibilityStatus
         * @module siemens.simaticit.common.services.layout
         * @description
         * Displays the current label visibility state.
         * @returns {Boolean} A value indicating the visibility status of the label.
         */
        self.getLabelVisibilityStatus = getLabelVisibilityStatus;

        /**
       * @ngdoc method
       * @access internal
       * @name common.widgets.commandBar.service#show
       * @module siemens.simaticit.common.services.layout
       * @description
       * Displays the global vertical command bar.
       */
        self.show = show;

        /**
       * @ngdoc method
       * @access internal
       * @name common.widgets.commandBar.service#hide
       * @module siemens.simaticit.common.services.layout
       * @description
       * Hides the global vertical command bar.
       */
        self.hide = hide;

        /**
       * @ngdoc method
       * @access internal
       * @name common.widgets.commandBar.service#updateCommands
       * @module siemens.simaticit.common.services.layout
       * @description
       * Update the command bar value.
       * @param {Object} commandBarObject Command bar object to update the command values.
       */
        self.updateCommands = updateCommands;

        self.register = register;
    }
    angular.module('siemens.simaticit.common.services.layout').service('common.widgets.commandBar.service', ['$rootScope', commandBarManager]);

    function dragDropManager() {
        var self = this;
        self.dragDrop = dragDrop;

        function dragDrop(el) {
            DragDropTouch._instance = new DragDropTouch();
            DragDropTouch._PRESSHOLDAWAIT = 400; // ms to wait before press & hold is detected
            DragDropTouch._rmvAtts = 'id,class,style,draggable'.split(',');
            DragDropTouch._keybordbdProps = 'altKey,ctrlKey,metaKey,shiftKey'.split(',');
            DragDropTouch._pointertProps = 'pageX,pageY,clientX,clientY,screenX,screenY'.split(',');

            function DataTransfer() {
                this.dropEffect = 'move';
                this.effectAllowed = 'all';
                var _data = {};
                this.getData = function (type) {
                    return _data[type] || '';
                };
                this.setData = function (type, value) {
                    _data[type] = value;
                };
            }

            function DragDropTouch() {
                var dragSource = null;
                var lastTouch = null;
                var lastTarget = null;
                var isDragEnabled = false;
                var isDropZone = false;
                var dataTransfer = new DataTransfer();

                (function activate(_that) {
                    var options = { passive: false, capture: false };
                    el.addEventListener('touchstart', touchstart.bind(_that), options);
                    el.addEventListener('touchmove', touchmove.bind(_that), options);
                    el.addEventListener('touchend', touchend.bind(_that));
                    el.addEventListener('touchcancel', touchend.bind(_that));
                })(this);

                function touchstart(e) {
                    reset();
                    var src = closestDraggable(e.target);
                    if (!dispatchEvent(e, 'mousemove', e.target) &&
                        !dispatchEvent(e, 'mousedown', e.target)) {
                        dragSource = src;
                        lastTouch = e;
                        var pressHoldInterval = window.setTimeout(function () {
                            isDragEnabled = true;
                            touchmove(e);
                        }, true);
                    }
                }
                function touchmove(e) {

                    var target = getTarget(e);
                    if (dispatchEvent(e, 'mousemove', target)) {
                        lastTouch = e;
                        return;
                    }
                    if (dragSource) {
                        dispatchEvent(e, 'dragstart', dragSource);
                        dispatchEvent(e, 'dragenter', target);
                    }
                    lastTouch = e;
                    if (target != lastTarget) {
                        dispatchEvent(lastTouch, 'dragleave', lastTarget);
                        dispatchEvent(e, 'dragenter', target);
                        lastTarget = target;
                    }
                    isDropZone = dispatchEvent(e, 'dragover', target);
                }
                function touchend(e) {
                    if (dispatchEvent(lastTouch, 'mouseup', e.target)) {
                        return;
                    }
                    if (dragSource) {
                        if (e.type.indexOf('cancel') < 0 && isDropZone) {
                            dispatchEvent(lastTouch, 'drop', lastTarget);
                        }
                        dispatchEvent(lastTouch, 'dragend', dragSource);
                        reset();
                    }
                }
                function reset() {
                    dragSource = null;
                    lastTouch = null;
                    lastTarget = null;
                    isDragEnabled = false;
                    isDropZone = false;
                    dataTransfer = new DataTransfer();
                }
                function getPoint(e, page) {
                    e && e.touches && (e = e.touches[0]);
                    return {
                        x: page ? e.pageX : e.clientX,
                        y: page ? e.pageY : e.clientY
                    };
                }
                function getTarget(e) {
                    var pt = getPoint(e);
                    var el = document.elementFromPoint(pt.x, pt.y);
                    while (el && getComputedStyle(el).pointerEvents == 'none') {
                        el = el.parentElement;
                    }
                    return el;
                }
                function copyProps(dst, src, props) {
                    for (var i = 0; i < props.length; i++) {
                        var p = props[i];
                        dst[p] = src[p];
                    }
                }
                function copyStyle(src, dst) {
                    DragDropTouch._rmvAtts.forEach(function (att) { dst.removeAttribute(att) });
                    var cs = getComputedStyle(src);
                    for (var i = 0; i < cs.length; i++) {
                        var key = cs[i];
                        if (key.indexOf('transition') < 0) {
                            dst.style[key] = cs[key];
                        }
                    }
                    dst.style.pointerEvents = 'none';
                    for (var j = 0; j < src.children.length; j++) {
                        copyStyle(src.children[j], dst.children[j]);
                    }
                }
                function dispatchEvent(e, type, target) {
                    if (e && target) {
                        var evt = document.createEvent('Event'), t = e.touches ? e.touches[0] : e;
                        evt.initEvent(type, true, true);
                        evt.button = 0;
                        evt.which = evt.buttons = 1;
                        copyProps(evt, e, DragDropTouch._keybordbdProps);
                        copyProps(evt, t, DragDropTouch._pointertProps);
                        evt.dataTransfer = dataTransfer;
                        target.dispatchEvent(evt);
                        return evt.defaultPrevented;
                    }
                    return false;
                }
                function closestDraggable(element) {
                    while (element) {
                        if (element.hasAttribute('draggable') && element.draggable) {
                            return element;
                        }
                        element = element.parentElement
                    }
                    return null;
                }
            }
        }

    }

    angular.module('siemens.simaticit.common.services.layout').service('common.services.dragdrop.service', [dragDropManager]);

})();

(function () {
    'use strict';
    /**
     * @ngdoc type
     * @name LoggerConfig
     * @module siemens.simaticit.common.services.logger
     * @description
     * Logger configuration settings.
     * @property {Number} currentLogLevel Configures the value of the corresponding {@link LOG_LEVELS}.
     * @property {Number} msgMaxLength Configures the maximum length of the message log.
     * @property {Boolean} checkMsgLength If **true** a check is performed on the maximum length of the message, set in **msgMaxLength**, otherwise **false**.
     */
    /**
     * @ngdoc provider
     * @name common.services.logger.configProvider
     * @module siemens.simaticit.common
     * @requires LOG_LEVELS
     * @description
     * Exposes logger configuration settings during the configuration phase.
     * @property {LoggerConfig} config See {@link type:LoggerConfig}.
     * @example
     * The following example shows how to set the maximum length of a message log.
     * ```
     * common.services.logger.config.msgMaxLength = 1000
     * ```
     */
    /**
     * @ngdoc service
     * @name common.services.logger.config
     * @module siemens.simaticit.common
     * @requires LOG_LEVELS
     *
     * @description
     * Exposes logger configuration settings during the runtime phase.
     * @return {Object} An object with a **config** property set to a {@link type:LoggerConfig} object.
     *
     *
     */
    angular.module('siemens.simaticit.common').provider('common.services.logger.config', ['LOG_LEVELS', function (LOG_LEVELS) {

        this.config = {
            // These are the properties we need to set
            currentLogLevel: LOG_LEVELS.LOG_ERROR,
            msgMaxLength: 1000,
            checkMsgLength: true
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);

    /**
     * @ngdoc service
     * @name common.services.logger.service
     * @module siemens.simaticit.common.services.logger
     * @requires $log $log
     * @requires common.services.logger.config
     * @requires LOG_TYPES
     * @requires LOG_LEVELS
     *
     *
     * @description
     * This service is responsible for providing logging functionalities.
     *
     *
     */
    angular.module('siemens.simaticit.common.services.logger').service('common.services.logger.service', ['$log', 'common.services.logger.config', 'LOG_TYPES', 'LOG_LEVELS',
        logger]);

    function logger($log, loggerConfig, LOG_TYPES, LOG_LEVELS) {

        this.getLogFn = getLogFn;
        this.log = log;
        this.logError = logError;
        this.logWarning = logWarning;
        this.logInfo = logInfo;
        this.logDebug = logDebug;
        this.getCurrentLogLevel = getCurrentLogLevel;
        this.setCurrentLogLevel = setCurrentLogLevel;
        this.getModuleLogger = getModuleLogger;


        /**
         * @ngdoc method
         * @name common.services.logger.service#getCurrentLogLevel
         * @description
         * Gets the {@link LOG_LEVELS} value saved in {@link common.services.logger.config}.
         * @returns {Numeric} The corresponding {@link LOG_LEVELS}.
         */
        function getCurrentLogLevel() {
            return loggerConfig.config.currentLogLevel;
        }

        /**
         * @ngdoc method
         * @name common.services.logger.service#setCurrentLogLevel
         * @param {Numeric} value A value between 0 and 5 that corresponds to the {@link LOG_LEVELS}.
         * @description
         * Sets the {@link LOG_LEVELS} value into {@link common.services.logger.config}.
         */
        function setCurrentLogLevel(value) {
            loggerConfig.config.currentLogLevel = value;
        }


        /**
         * @ngdoc method
         * @name common.services.logger.service#getLogFn
         * @param {String} moduleId The name of the module or a useful name used to categorize the message.
         * @param {Numeric} logType A value between 0 and 5 that corresponds to the {@link LOG_TYPES}.
         * @returns {Function} A function which can log messages according to the previously set parameters (**moduleId**, **logType**).
         * @description
         * Returns the function corresponding to the {@link LOG_TYPES}.
         * ```
         *   var data = {dataToLog: {data1: '1', data2: '2'}}
         *   var myLogSample = common.logger.getLogFn(moduleId, common.constant.LOG_TYPE.LOG_GENERIC);
         *   ..
         *   myLogSample('sample message', data);
         * ```
         *
         */
        function getLogFn(moduleId, logType) {
            var fnName = 'log';
            switch (logType) { // convert aliases
                case LOG_TYPES.LOG_GENERIC:
                    fnName = 'log'; break;
                case LOG_TYPES.LOG_ERROR:
                    fnName = 'logError'; break;
                case LOG_TYPES.LOG_WARNING:
                    fnName = 'logWarning'; break;
                case LOG_TYPES.LOG_INFO:
                    fnName = 'logInfo'; break;
                case LOG_TYPES.LOG_DEBUG:
                    fnName = 'logDebug'; break;
                default: break;
            }

            var logFn = this[fnName] || this.log;
            return function (msg, data) {
                logFn(msg, data, moduleId);
            };
        }

        /**
         * @ngdoc method
         * @name common.services.logger.service#log
         * @param {String} message Contents of the message to be logged.
         * @param {Object} data An optional object which can be included in the log message, for debugging purposes.
         * @param {String} moduleId An identifier used for categorization purposes, which may correspond to a module.
         *
         * @description
         * Logs a generic message if the {@link LOG_LEVELS} is **LOG_LEVELS.LOG_VERBOSE** or higher.
         *
         */
        function log(message, data, moduleId) {
            if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_VERBOSE) {
                moduleId = moduleId ? '[' + moduleId + '] ' : '';
                if (loggerConfig.config.checkMsgLength && message) {
                    message = message.substring(0, loggerConfig.config.msgMaxLength);
                }
                if (data) {
                    $log.log(moduleId, message, data);
                } else {
                    $log.log(moduleId, message);
                }
            }
        }

        /**
         * @ngdoc method
         * @name common.services.logger.service#logInfo
         * @param {String} message Contents of the message to be logged.
         * @param {Object} data An optional object which can be included in the log message, for debugging purposes.
         * @param {String} moduleId An identifier used for categorization purposes, which may correspond to a module.
         *
         * @description
         * Logs a generic message if the {@link LOG_LEVELS} is **LOG_LEVELS.LOG_INFO** or higher.
         *
         */
        function logInfo(message, data, moduleId) {
            if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_INFO) {
                moduleId = moduleId ? '[' + moduleId + '] ' : '';
                if (loggerConfig.config.checkMsgLength && message) {
                    message = message.substring(0, loggerConfig.config.msgMaxLength);
                }
                if (data) {
                    $log.info(moduleId, message, data);
                } else {
                    $log.info(moduleId, message);
                }
            }
        }

        /**
         * @ngdoc method
         * @name common.services.logger.service#logWarning
         * @param {String} message Contents of the message to be logged.
         * @param {Object} data An optional object which can be included in the log message, for debugging purposes.
         * @param {String} moduleId An identifier used for categorization purposes, which may correspond to a module.
         *
         * @description
         * Logs a generic message if the {@link LOG_LEVELS} is **LOG_LEVELS.LOG_WARNING** or higher.
         *
         */
        function logWarning(message, data, moduleId) {
            if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_WARNING) {
                moduleId = moduleId ? '[' + moduleId + '] ' : '';
                if (loggerConfig.config.checkMsgLength && message) {
                    message = message.substring(0, loggerConfig.config.msgMaxLength);
                }
                $log.warn(moduleId, message, data);
            }
        }

        /**
         * @ngdoc method
         * @name common.services.logger.service#logDebug
         * @param {String} message Contents of the message to be logged.
         * @param {Object} data An optional object which can be included in the log message, for debugging purposes.
         * @param {String} moduleId An identifier used for categorization purposes, which may correspond to a module.
         *
         * @description
         * Logs a generic message if the {@link LOG_LEVELS} is **LOG_LEVELS.LOG_DEBUG** or higher.
         *
         */
        function logDebug(message, data, moduleId) {
            if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_DEBUG) {
                moduleId = moduleId ? '[' + moduleId + '] ' : '';

                if (loggerConfig.config.checkMsgLength && message) {
                    message = message.substring(0, loggerConfig.config.msgMaxLength);
                }
                $log.debug(moduleId, message, data);
            }
        }

        /**
         * @ngdoc method
         * @name common.services.logger.service#logError
         * @param {String} message Contents of the message to be logged.
         * @param {Object} data An optional object which can be included in the log message, for debugging purposes.
         * @param {String} moduleId An identifier used for categorization purposes, which may correspond to a module.
         *
         * @description
         * Logs a generic message if the {@link LOG_LEVELS} is **LOG_LEVELS.LOG_ERROR** or higher.
         *
         */
        function logError(message, data, moduleId) {
            if (loggerConfig.config.currentLogLevel >= LOG_LEVELS.LOG_ERROR) {
                moduleId = moduleId ? '[' + moduleId + '] ' : '';

                if (loggerConfig.config.checkMsgLength && message) {
                    message = message.substring(0, loggerConfig.config.msgMaxLength);
                }
                $log.error(moduleId, message, data);
            }
        }

        /**
         * @ngdoc method
         * @module siemens.simaticit.common
         * @name common.services.logger.service#getModuleLogger
         *
         * @description
         * Returns an object that exposes all the logging functions for the specified **moduleId**.
         * @param {String} module An identifier used for categorization purposes, which may correspond to a module.
         * @returns {Object} Object with functions to log with various log types. The possible log types are:
         * * **Generic**
         * * **Error**
         * * **Warning**
         * * **Info**
         * * **Debug**
         */
        function getModuleLogger(module) {

            return {
                log: this.getLogFn(module, LOG_TYPES.LOG_GENERIC),
                logErr: this.getLogFn(module, LOG_TYPES.LOG_ERROR),
                logWarn: this.getLogFn(module, LOG_TYPES.LOG_WARNING),
                logInfo: this.getLogFn(module, LOG_TYPES.LOG_INFO),
                logDebug: this.getLogFn(module, LOG_TYPES.LOG_DEBUG)
            };
        }

    }
})();

'use strict';
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
        * @ngdoc type
        * @name ExecutionError
        * @module siemens.simaticit.common
        * @description
        * Represents an execution error.
        *
        * @property {Number} errorCode The numeric code of the error.
        * @property {String} errorMessage The message of the corresponding error code.
        */
        var ExecutionError = /** @class */ (function () {
            function ExecutionError(errorCode, errorMessage, statusCode) {
                this.errorCode = errorCode;
                this.errorMessage = errorMessage;
                this.statusCode = statusCode;
            }
            return ExecutionError;
        }());
        framework.ExecutionError = ExecutionError;
        /**
            * @ngdoc service
            * @name ExecutionError
            * @module siemens.simaticit.common
            * @description
            * Factory used to create ExecutionError objects.
            *
            * @param {Number} errorCode The numeric code of the error.
            * @param {String} errorMessage The message of the corresponding error code.
            *
            * @return {ExecutionError} An {@link type:ExecutionError} object.
            */
        angular.module('siemens.simaticit.common').factory('ExecutionError', function () { return ExecutionError; });
        /**
            * @ngdoc type
            * @name CommandResponse
            * @module siemens.simaticit.common
            *
            * @description
            * Represents a response of a command executed on the service layer.
            *
            * @property {Boolean} succeeded  If set to **true**, the command succeeded.
            * @property {ExecutionError} error An {@link type:ExecutionError} object containing information about
            * the error (if the command was unsuccessful).
            */
        var CommandResponse = /** @class */ (function () {
            function CommandResponse(succeeded, error) {
                this.succeeded = succeeded;
                this.error = error;
                this.error = $.extend(new ExecutionError("", ""), error);
            }
            return CommandResponse;
        }());
        framework.CommandResponse = CommandResponse;
        var CommandResponseExt = /** @class */ (function () {
            function CommandResponseExt(succeeded, error, SitUafExecutionDetail) {
                this.succeeded = succeeded;
                this.error = error;
                this.SitUafExecutionDetail = SitUafExecutionDetail;
                this.error = $.extend(new ExecutionError("", ""), error);
                this.executionDetail = SitUafExecutionDetail;
            }
            return CommandResponseExt;
        }());
        framework.CommandResponseExt = CommandResponseExt;
        var SitUafExecutionDetail = /** @class */ (function () {
            function SitUafExecutionDetail(precheckdetails) {
                this.precheckdetails = precheckdetails;
                this.precheckDetails = precheckdetails;
            }
            return SitUafExecutionDetail;
        }());
        framework.SitUafExecutionDetail = SitUafExecutionDetail;
        var PrecheckDetail = /** @class */ (function () {
            function PrecheckDetail(executionerror) {
                this.executionerror = executionerror;
                this.Error = executionerror;
            }
            return PrecheckDetail;
        }());
        framework.PrecheckDetail = PrecheckDetail;
        /**
         * @ngdoc service
         * @name CommandResponse
         * @module siemens.simaticit.common
         * @requires service:ExecutionError
         *
         * @description
         * A Factory used to create {@link type:CommandResponse} objects.
         *
         * @param {ExecutionError} error An {@link type:ExecutionError} object containing information about
         * the error (if the command was unsuccessful).
         *
         * @return {CommandResponse} A {@link type:CommandResponse} object.
         *
        */
        angular.module('siemens.simaticit.common').factory('CommandResponse', [
            'ExecutionError', function (ExecutionError) {
                CommandResponse.executionError = ExecutionError;
                return CommandResponse;
            }
        ]);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=model.js.map
'use strict';
//import * as angular from "angular";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
            * @ngdoc module
            * @name siemens.simaticit.common.services.session
            * @module siemens.simaticit.common
            *
            * @description
            * Contains services to manage session storage.
            *
            *
            */
        angular.module('siemens.simaticit.common.services.session', []);
        var SessionConfig = /** @class */ (function () {
            function SessionConfig() {
                this.config = {
                    sessionAuthKey: 'SITUAFAuthKey',
                    redirectStateKey: 'SITUAFRedirectKey'
                };
            }
            SessionConfig.prototype.$get = function () {
                return {
                    config: this.config
                };
            };
            return SessionConfig;
        }());
        framework.SessionConfig = SessionConfig;
        angular.module('siemens.simaticit.common.services.session').provider('common.services.session.config', SessionConfig);
        var Session = /** @class */ (function () {
            function Session($window, $log, sessionConfig) {
                this.$window = $window;
                this.$log = $log;
                this.sessionConfig = sessionConfig;
            }
            /**
                * @ngdoc method
                * @name common.services.session#get
                * @description
                * Retrieves the specified item from sessionStorage.
                * @param {string} key Key of the item whose value has to be obtained.
                * @returns {Object} An object containing the value.
                */
            Session.prototype.get = function (key) {
                var value = this.$window.sessionStorage.getItem(key);
                return value;
            };
            /**
            * @ngdoc method
            * @name common.services.session#set
            * @description
            * Stores a new item in sessionStorage.
            * @param {string} key Key of the item whose value has to be set.
            * @param {Object} value Value of the item whose value has to be obtained.
            */
            Session.prototype.set = function (key, value) {
                this.$window.sessionStorage.setItem(key, value);
            };
            /**
            * @ngdoc method
            * @name common.services.session#remove
            * @description
            * Removes a specified item fron the sessionStorage.
            * @param {string} key Key of the item to be removed.
            * @returns {boolean} Boolean value to indicate if the key is removed successfully.
            */
            Session.prototype.remove = function (key) {
                if (this.get(key) == null) {
                    this.$log.info('Session storage key  \'' + key + '\' not found');
                    return false;
                }
                else {
                    this.$window.sessionStorage.removeItem(key);
                    return true;
                }
            };
            /*
        * IMPORTANT:
        * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
        * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
        */
            Session.prototype.getAuth = function () {
                var value = this.get(this.sessionConfig.config.sessionAuthKey);
                if (value !== null) {
                    var token = JSON.parse(value);
                    return token;
                }
                return null;
            };
            /*
        * IMPORTANT:
        * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
        * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
        */
            Session.prototype.setAuth = function (value) {
                this.set(this.sessionConfig.config.sessionAuthKey, JSON.stringify(value));
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            Session.prototype.removeAuth = function () {
                this.remove(this.sessionConfig.config.sessionAuthKey);
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            Session.prototype.getRedirectStateKey = function () {
                return this.get(this.sessionConfig.config.redirectStateKey);
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            Session.prototype.setRedirectStateKey = function (value) {
                value = value || '';
                this.set(this.sessionConfig.config.redirectStateKey, value);
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            Session.prototype.setState = function (value) {
                this.set('state', JSON.stringify(value));
            };
            /*
            * IMPORTANT:
            * This method was mistakenly published in the reference documentation up to SIMATIC IT UAF v1.2.
            * Do not remove this method or modify the code of this method, otherwise this may break existing applications.
            */
            Session.prototype.getState = function () {
                return this.get('state');
            };
            Session.$inject = ['$window', '$log', 'common.services.session.config'];
            return Session;
        }());
        framework.Session = Session;
        /**
        * @ngdoc service
        * @name common.services.session
        * @module siemens.simaticit.common.services.session
        *
        * @description
        * This service can be used to manage sessionStorage.
        *
        */
        angular.module('siemens.simaticit.common.services.session')
            .service('common.services.session', ['$window', '$log', 'common.services.session.config', Session]);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=session.svc.js.map
(function () {
    'use strict';

    /**
     * Initialize a shell Provider
     *
     * set the shell environment (default theme and language)
     *
     */
    angular.module('siemens.simaticit.common.services.layout').provider('common.services.layout.shell', function () {

        /**
         * Set the local resource path
         *
         * @param constant
         * @param $location
         * @param $window
         * @param logger
         * @param globalization service
         *
         */
        function setLocalResourcePath(RESOURCE, $q, $location, $window, logger, globalization) {
            var deferred = $q.defer();
            var promises = [];
            var urlPart = '';
            var localhostPath, absolutePath;

            // $window.location.pathname get the pathname   /appName/index.html
            // $location.absUrl() get the whole url http://localhost/appName/index.html#/home
            // it's better to use $window
            var url = $window.location.pathname.split('/');

            for (var i = 1; i < url.length - 1; i++) {
                urlPart += '/' + url[i];
            }

            if (urlPart) {
                localhostPath = $location.protocol() + "://" + $location.host() + ":" + $location.port() + urlPart + "/";
            }
            else {
                localhostPath = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/";
            }

            if (RESOURCE.path.length === 1 && RESOURCE.path[0].name === 'resources/') { //for runtime applications
                for (var index = 0; index < RESOURCE.path.length; index++) {
                    absolutePath = localhostPath + RESOURCE.path[index].name;
                    logger.logInfo('Resource Path:', absolutePath, 'Shell Provider');
                    promises.push(globalization.setResourcePath(absolutePath, RESOURCE.path[index].modules));
                }

                $q.all(promises).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            } else {
                globalization.loadAppResource(localhostPath)
                    .then(function (data) {

                        for (var index = 0; index < RESOURCE.path.length; index++) {
                            absolutePath = localhostPath + RESOURCE.path[index].name;
                            logger.logInfo('Resource Path:', absolutePath, 'Shell Provider');
                            promises.push(globalization.setResourcePath(absolutePath, RESOURCE.path[index].modules));
                        }
                        if (data) {
                            data.forEach(function (obj) {
                                promises.push(globalization.setResourcePath(obj.path, obj.modules));
                            });
                        }

                        $q.all(promises).then(function () {
                            deferred.resolve();
                        }, function () {
                            deferred.reject();
                        });
                    });
            }


            return deferred.promise;
        }

        /**
         * Set the default language
         *
         * @param logger
         * @param globalization
         */

        function setDefaultLanguage(logger, globalization, authentication, settings, languages) {
            //get browser language
            var localeKey = globalization.getLocale();

            if (!(languages && languages.indexOf(localeKey) > -1)) {
                localeKey = 'en-US';
            }
            //Get language from identity
            var identity = authentication.notifyUser();

            var umcLang;

            if (identity) {
                umcLang = identity['urn:language'];
            }

            if (umcLang) {
                var codes = umcLang.split('-');
                if (codes.length === 2) {
                    umcLang = codes[0].toLowerCase() + '-' + codes[1].toUpperCase();
                }
            }


            if (identity && umcLang && languages.indexOf(umcLang) > -1) {
                localeKey = umcLang;
            } else if (settings && settings.lang_key && languages.indexOf(settings.lang_key) > -1) {
                localeKey = settings.lang_key;
            }



            logger.logInfo('Set language:', localeKey, 'Shell Provider');

            //set default language with browser language
            return globalization.setLanguage(localeKey);
        }

        /**
         * Set the default layout theme
         *
         * @param constant
         * @param $rootScope
         */
        function setDefaultTheme(THEMES, $rootScope, settings, config) {

            $rootScope.themes = THEMES;
            var theme = THEMES[0];
            if (settings && settings.theme) {
                theme = settings.theme;
            }
            else if (config && config.theme) {
                if (config.theme === 'Dark') {
                    theme = THEMES[1];
                } else {
                    theme = THEMES[0];
                }
            }

            $rootScope.currentTheme = theme;
        }


        /**
         * Set the default layout theme
         *
         * @param constant
         * @param $rootScope
         */
        function setDefaultLogLevel(loggerConfig, settings) {


            if (settings && settings.logLevel >= 0) {
                loggerConfig.config.currentLogLevel = settings.logLevel;
            }

        }

        /**
         * Set the language at run time
         *
         * @param globalization
         * @param languageKey
         */
        function switchLanguage(globalization, languageKey) {
            globalization.setLanguage(languageKey);
        }


        //'common.services.logger.service', 'globalization'
        this.$get = ['$rootScope', '$location', '$window', '$q', 'common.services.logger.service', 'common.services.globalization.globalizationService',
            'common.services.logger.config', 'common.services.authentication', '$injector', 'CONFIG',
            function ($rootScope, $location, $window, $q, logger, globalization, loggerConfig, authentication, $injector, config) {

                return {


                    setEnvironment: function (RESOURCE, THEMES) {

                        //get stored settings

                        var settings = $injector.get('common').loadSettings();
                        $rootScope.isTouchDevice = 'ontouchstart' in window.document.documentElement;
                        setDefaultLogLevel(loggerConfig, settings);
                        setDefaultTheme(THEMES, $rootScope, settings, config);
                    },

                    setGlobalization: function (RESOURCE, languages) {
                        var deferred = $q.defer();
                        var settings = $injector.get('common').loadSettings();
                        setLocalResourcePath(RESOURCE, $q, $location, $window, logger, globalization).then(function () {
                            setDefaultLanguage(logger, globalization, authentication, settings, languages).then(function () {
                                globalization.appResourceLoadingSuccess();
                                deferred.resolve();
                            }, function () {
                                deferred.reject();
                            });
                        });
                        return deferred.promise;
                    },

                    setDefaultLanguage: function (languages, settings) {
                        return setDefaultLanguage(logger, globalization, authentication, settings, languages);
                    },

                    switchLanguage: function (languageKey) {
                        switchLanguage(globalization, languageKey);
                    }




                };


            }];

    });

})();

"use strict";
/// <reference path="model.ts" />
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
        * @ngdoc module
        * @name siemens.simaticit.common.services.signalManager
        * @description This module provides services used to manage signals.
        *
        */
        angular.module('siemens.simaticit.common.services.signalManager', []);
        /**
        * @ngdoc provider
            * @name common.services.signalManager.AddressConfigProvider
        * @module siemens.simaticit.common.services.signalManager
            * @access internal
        * @description
        * Configures the path to the OData method to utilize signal services
        * used to generate required information.
        *
            * @property config.signalMainAddress  {string}  Gets the URI of signal main address.
            * @property config.signalStreamAddress {string}  Gets the URI of signal stream address.
            *
            **/
        angular.module('siemens.simaticit.common.services.signalManager').provider('common.services.signalManager.AddressConfig', [function () {
                this.config = {
                //    signalMainAddress: '',
                //  signalStreamAddress: ''
                };
                this.$get = function () {
                    return this.config;
                };
            }]);
        var SignalManagerService = /** @class */ (function () {
            function SignalManagerService($window, $log, $q, config, authentication, ExecutionError) {
                this.$window = $window;
                this.$log = $log;
                this.$q = $q;
                this.config = config;
                this.authentication = authentication;
                this.ExecutionError = ExecutionError;
                this.DEFAULT_HEARTBEAT_FREQUENCY = 10000;
                this.DEFAULT_HEARTBEAT_TIMEOUT = 30000;
                this.DEFAULT_RESPONSE_TIMEOUT = 30000;
                this.MIN_HEARTBEAT_FREQUENCY = 2000;
                this.MIN_RESPONSE_TIMEOUT = 5000;
                this.init();
            }
            SignalManagerService.prototype.init = function () {
                this.connections = [];
                this.settings = {
                    heartbeat: false,
                    heartbeatFrequency: this.DEFAULT_HEARTBEAT_FREQUENCY,
                    heartbeatTimeout: this.DEFAULT_HEARTBEAT_TIMEOUT,
                    responseTimeout: this.DEFAULT_RESPONSE_TIMEOUT
                };
            };
            /**
            * @ngdoc type
            * @name SignalManagerConfig
            * @module siemens.simaticit.common.services.signalManager
            * @description
            * An object containing settings that will be applied to all signal connections.At present, it can be used to configure heartbeat- related settings.
            * @property { boolean } [heartbeat = false] Enables or disables automatic heartbeat management.
            * @property { number } [heartbeatFrequency = 10] The frequency in seconds of heartbeat messages.
            * **Note: ** Minimun   value is 2 seconds
            * @property { number } [heartbeatTimeout = 30] The timeout in seconds after which the Signal Manager is considered    offline because no messages are received.
            * **Note: ** Minimun value is (heartbeatFrequency * 2) seconds
            * @property { number } [responseTimeout = 30] The maximum time interval in seconds to wait for responses to internal  control messages, e.g.connect / disconnect, subscribe / unsubscribe, set heartbeat.
            * **Note: ** Minimun value is 5 seconds
            **/
            /**
            * @ngdoc method
            * @name common.services.signalManager#configure
            * @module siemens.simaticit.common.services.signalManager
            * @param {SignalManagerConfig } settings See {@link type:SignalManagerConfig }.
            *
            * @description
            * Allows to configure the settings for the signal service.
            *
            **/
            SignalManagerService.prototype.configure = function (settings) {
                if (typeof settings.heartbeat === 'boolean') {
                    this.settings.heartbeat = settings.heartbeat;
                }
                if (settings.heartbeatFrequency && this.isInteger(settings.heartbeatFrequency) && this.isValidValue('HeartbeatFrequency', settings.heartbeatFrequency, this.MIN_HEARTBEAT_FREQUENCY)) {
                    this.settings.heartbeatFrequency = settings.heartbeatFrequency * 1000;
                }
                if (settings.heartbeatTimeout && this.isInteger(settings.heartbeatTimeout) && this.isValidValue('HeartbeatTimeout', settings.heartbeatTimeout, this.settings.heartbeatFrequency * 2)) {
                    this.settings.heartbeatTimeout = settings.heartbeatTimeout * 1000;
                }
                if (settings.responseTimeout && this.isInteger(settings.responseTimeout) && this.isValidValue('ResponseTimeout', settings.responseTimeout, this.MIN_RESPONSE_TIMEOUT)) {
                    this.settings.responseTimeout = settings.responseTimeout * 1000;
                }
            };
            SignalManagerService.prototype.isInteger = function (value) {
                if (typeof value !== 'number' && value !== Math.floor(value)) {
                    throw new Error('Provided value : ' + value + ' is not an integer');
                }
                return true;
            };
            SignalManagerService.prototype.isValidValue = function (field, value, minValue) {
                if ((value * 1000) < minValue) {
                    throw new Error('Provided value : ' + value + ' for  ' + field + ' should be greater than ' + minValue);
                }
                return true;
            };
            /**
            * @ngdoc method
            * @name common.services.signalManager#createConnection
            * @module siemens.simaticit.common.services.signalManager
            *
            * @description This method creates a new set of websocket connections necessary to recieve messages from an existing signal.
            * <br>**Note:** Using this method with the methods {@link common.services.runtime.backendService#subscribe subscribe}, {@link common.services.runtime.backendService#unsubscribe unsubscribe}
            * or {@link common.services.runtime.backendService#reconnectSignals reconnectSignals}
            * provided by the {@link common.services.runtime.backendService backendService} for signal management will lead to incorrect results.
            * @param {String} appName The name of the App, to which the signal to be subscribed belongs.
            * @param {String} signalName The name of the signal to subscribe.
            * @param {Function} onConnectionError A callback function which is executed when the signal connection state is Closed/Invalid. It is recommended to perform a reconnection attempt when this callback is invoked.
            * @returns {Object} A promise containing a {@link SignalConnection} object or an error response object if there is one.
            *
            */
            SignalManagerService.prototype.createConnection = function (arg1, arg2, arg3) {
                var _this = this;
                var deferred = this.$q.defer();
                var i = 0, length = this.connections.length;
                var existingConnection = null;
                var appName = '';
                var signalName, onConnectionError;
                if (typeof arg2 === 'string') {
                    appName = arg1;
                    signalName = arg2;
                    onConnectionError = arg3;
                }
                else if (typeof arg2 === 'function') {
                    signalName = arg1;
                    onConnectionError = arg2;
                }
                else if (!arg2) {
                    signalName = arg1;
                }
                for (i; i < length; i++) {
                    if (this.connections[i].signalApp === appName && !this.connections[i].id && this.connections[i].state() === 1) {
                        existingConnection = this.connections[i];
                        break;
                    }
                }
                if (!existingConnection) {
                    var signalConnection = new SignalConnection(this.signalEndPointMetadataUrl, this.authentication, signalName, onConnectionError, appName, this.settings, this);
                    try {
                        signalConnection.connect(false, appName).then(function () {
                            _this.connections.push(signalConnection);
                            deferred.resolve(signalConnection);
                        }, function (error) {
                            if (error === 401) {
                                _this.authentication.checkAuthentication();
                            }
                            deferred.reject(error);
                        });
                    }
                    catch (e) {
                        this.$log.log(e.message);
                    }
                }
                else {
                    existingConnection.establishConnection(false, signalName, onConnectionError).then(function () {
                        deferred.resolve(existingConnection);
                    }, function (error) {
                        deferred.reject(error);
                    });
                }
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @name common.services.signalManager#destroyConnection
            * @module siemens.simaticit.common.services.signalManager
            * @deprecated Use the {@link common.services.signalManager#deleteConnection deleteConnection} method instead.
            * @description This method unsubscribes the connection specified and closes the websocket after the last connection has been unsubscribed, i.e. if there are no more connections for a specific App.
            * <br> **Note:** Using this method with the methods {@link common.services.runtime.backendService#subscribe subscribe}, {@link common.services.runtime.backendService#unsubscribe unsubscribe}
            * or {@link common.services.runtime.backendService#reconnectSignals reconnectSignals}
            * provided by the {@link common.services.runtime.backendService backendService} for signal management will lead to incorrect results.
            * @param {String} id The identifier of the signal connection object.
            * @returns {Object} A promise containing a signal connection object and an error response object if there is one.
            *
            **/
            SignalManagerService.prototype.destroyConnection = function (id) {
                var _this = this;
                var deferred = this.$q.defer();
                var connection = _.findWhere(this.connections, { id: id });
                if (connection && connection.isActive()) {
                    connection.unsubscribe().then(function () {
                        connection.signalManager.close();
                        _this.removeConnection(id);
                        deferred.resolve();
                    }, function (error) {
                        deferred.reject(error);
                    });
                }
                else if (connection) {
                    connection.signalManager.close();
                    delete this.connections[id];
                    this.connections.length--;
                    deferred.resolve();
                }
                else {
                    deferred.reject('No Connection with id: ' + id);
                }
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @name common.services.signalManager#deleteConnection
            * @module siemens.simaticit.common.services.signalManager
            *
            * @description This method deletes the connection object and subsequently unsubscribes. This will not close the websocket connection. To close the websocket use {@link common.services.signalManager#disconnect disconnect} method.
            * <br> **Note:** Using this method with the methods {@link common.services.runtime.backendService#subscribe subscribe}, {@link common.services.runtime.backendService#unsubscribe unsubscribe}
            * or {@link common.services.runtime.backendService#reconnectSignals reconnectSignals}
            * provided by the {@link common.services.runtime.backendService backendService} for signal management will lead to incorrect results.
            * @param {String} id The identifier of the signal connection object.
            * @returns {Object} A promise object and an error response object if there is one.
            *
            **/
            SignalManagerService.prototype.deleteConnection = function (id) {
                var deferred = this.$q.defer();
                var connection = _.findWhere(this.connections, { id: id });
                if (!connection) {
                    deferred.reject('Invalid Id');
                    return deferred.promise;
                }
                if (connection.isActive()) {
                    connection.unsubscribe().then(function () {
                        deferred.resolve();
                    }, function (error) {
                        deferred.reject(error);
                    });
                }
                else {
                    deferred.reject('No active connection is present');
                }
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @name common.services.signalManager#connect
            * @module siemens.simaticit.common.services.signalManager
            *
            * @description This method explicitly opens a websocket connection to a specified App.
            * <br>**Note:** Using this method with the methods {@link common.services.runtime.backendService#subscribe subscribe}, {@link common.services.runtime.backendService#unsubscribe unsubscribe}
            * or {@link common.services.runtime.backendService#reconnectSignals reconnectSignals}
            * provided by the {@link common.services.runtime.backendService backendService} for signal management will lead to incorrect results.
            * @param {String} appName The name of the App, for which the websocket should be opened.
            * @param {Function} onConnectionError A callback (optional) function which is executed when the signal connection state is Closed/Invalid.
            * @returns {Object} A promise object and an error response object if there is one.
            *
            **/
            SignalManagerService.prototype.connect = function (appName, onConnectionError) {
                var _this = this;
                var deferred = this.$q.defer();
                if (!appName) {
                    deferred.reject("Please provide a valid app name");
                }
                else {
                    var isAppExists = false;
                    var i = 0, length = this.connections.length;
                    for (i; i < length; i++) {
                        if (this.connections[i].signalApp === appName && this.connections[i].state() === 1) {
                            isAppExists = true;
                            break;
                        }
                    }
                    if (!isAppExists) {
                        var signalName = '';
                        var signalConnection = new SignalConnection(this.signalEndPointMetadataUrl, this.authentication, signalName, onConnectionError, appName, this.settings, this);
                        var errorCallbackObject = {
                            onConnectionError: onConnectionError
                        };
                        signalConnection.openSocket(false, appName, errorCallbackObject).then(function () {
                            _this.connections.push(signalConnection);
                            deferred.resolve();
                        }, function (error) {
                            deferred.reject(error);
                        });
                    }
                    else {
                        deferred.reject("Socket already opened for this app");
                    }
                }
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @name common.services.signalManager#disconnect
            * @module siemens.simaticit.common.services.signalManager
            *
            * @description This method explicitly closes the websocket connection to a specified App.
            * <br>**Note:** Using this method with the methods {@link common.services.runtime.backendService#subscribe subscribe}, {@link common.services.runtime.backendService#unsubscribe unsubscribe}
            * or {@link common.services.runtime.backendService#reconnectSignals reconnectSignals}
            * provided by the {@link common.services.runtime.backendService backendService} for signal management will lead to incorrect results.
            * @param {String} appName The name of the App, for which the websocket should be closed.
            *
            */
            SignalManagerService.prototype.disconnect = function (appName) {
                var deferred = this.$q.defer();
                if (appName) {
                    var connection;
                    var i = 0, length = this.connections.length;
                    for (i; i < length; i++) {
                        if (this.connections[i].signalApp === appName) {
                            connection = this.connections[i];
                            break;
                        }
                    }
                    if (connection) {
                        connection.signalManager.close();
                        this.removeConnection(connection.id, connection.signalApp);
                        deferred.resolve();
                    }
                    else {
                        deferred.reject("Invalid app - No socket exists for the mentioned app");
                    }
                }
                else {
                    deferred.reject("No app name provided");
                }
                return deferred.promise;
            };
            SignalManagerService.prototype.onError = function (data) {
                this.$log.log(data);
            };
            SignalManagerService.prototype.removeConnection = function (id, name) {
                var i = 0, length = this.connections.length;
                for (i; i < length; i++) {
                    if (id && this.connections[i].id === id) {
                        this.connections.splice(i, 1);
                        break;
                    }
                    else if (name && this.connections[i].signalApp === name) {
                        this.connections.splice(i, 1);
                        break;
                    }
                }
            };
            SignalManagerService.prototype.onPingTimeoutCbk = function (appName) {
                for (var prop in this.connections) {
                    if (this.connections.hasOwnProperty(prop)) {
                        var conn = this.connections[prop];
                        if (conn.signalApp === appName) {
                            conn.signalManager.close();
                            this.connections.splice(prop, 1);
                        }
                    }
                }
            };
            SignalManagerService.$inject = ['$window', '$log', '$q', 'common.services.signalManager.AddressConfig', 'common.services.ui.authentication', 'ExecutionError'];
            return SignalManagerService;
        }());
        framework.SignalManagerService = SignalManagerService;
        /**
        * @ngdoc type
        * @name SignalConnection
        * @module siemens.simaticit.common.services.signalManager
        * @description This class creates a signal connection object, which exposes methods and properties.
        *
        * **Note:** The methods provided by this class should be used only with the {@link siemens.simaticit.common.services.signalManager signalManager} service.
        * Using any of the exposed methods with the methods {@link common.services.runtime.backendService#subscribe subscribe}, {@link common.services.runtime.backendService#unsubscribe unsubscribe}
        * or {@link common.services.runtime.backendService#reconnectSignals reconnectSignals}
        * provided by the {@link common.services.runtime.backendService backendService} for signal management will lead to incorrect results.
        * @property {String} id The identifier of the signal connection object.
        * @property {String} name The name of an existing signal exposed on the service layer.
        * @property {String} options A valid options string currently used for filtering messages emitted by a signal. The string is set during subscription.
        */
        var SignalConnection = /** @class */ (function () {
            function SignalConnection(signalEndPointMetadataUrl, authentication, signalName, onConnectionError, appName, settings, parent) {
                var _this = this;
                /**
                * @ngdoc method
                * @name SignalConnection#state
                * @module siemens.simaticit.common.services.signalManager
                * @description Checks for the different states of the main and stream connections.
                * @returns {Boolean} The state of the main and stream connections.
                *
                */
                this.state = function () {
                    var mainState = _this.signalManager.getMainCnnState();
                    var streamState = _this.signalManager.getStreamCnnState();
                    var state = null;
                    if (mainState === 0 && (streamState === 0 || streamState === 1)) {
                        state = 0;
                    }
                    if (mainState === 0 && (streamState === 2 || streamState === 3)) {
                        state = 5;
                    }
                    if (mainState === 1 && streamState === 0) {
                        state = 0;
                    }
                    if (mainState === 1 && streamState === 1) {
                        state = 1;
                    }
                    if (mainState === 1 && (streamState === 2 || streamState === 3)) {
                        state = 5;
                    }
                    if (mainState === 2 && (streamState === 0 || streamState === 1)) {
                        state = 5;
                    }
                    if (mainState === 2 && (streamState === 2 || streamState === 3)) {
                        state = 2;
                    }
                    if (mainState === 3 && (streamState === 0 || streamState === 1)) {
                        state = 5;
                    }
                    if (mainState === 3 && (streamState === 2 || streamState === 3)) {
                        state = 3;
                    }
                    return state;
                };
                this.onNext = function (data) {
                    _this.onMessage(data);
                };
                this.onError = function (reason) {
                    if (_this.state() === 3 || _this.state() === 5 && _this.onConnectionError instanceof Function) {
                        _this.lastError = new _this.ExecutionError('-1', 'Connection Error');
                        _this.onConnectionError(_this, reason);
                    }
                    else {
                        _this.onMessageError();
                    }
                };
                this.onCompleted = function () {
                    _this.onMessageComplete();
                };
                this.pingTimeoutCbk = function () {
                    _this.lastError = new _this.ExecutionError('-2', 'Response Timeout');
                    var error = { reason: 'Response Timeout', code: '-2' };
                    _this.parent.onPingTimeoutCbk(_this.signalApp);
                    _this.onConnectionError(_this, error);
                };
                this.$q = parent.$q;
                this.$window = parent.$window;
                this.ExecutionError = parent.ExecutionError;
                this.$log = parent.$log;
                this.parent = parent;
                this.signalEndPointMetadataUrl = signalEndPointMetadataUrl;
                this.name = signalName;
                this.onConnectionError = onConnectionError;
                this.authentication = authentication;
                this.signalApp = appName;
                this.settings = settings;
                this.activeTimeoutCount = 0;
            }
            /**
            * @ngdoc method
            * @name SignalConnection#isActive
            * @module siemens.simaticit.common.services.signalManager
            * @description If the state of the signal connection is open and a subscription is currently active (the subscribe method has been called successfully) it returns true, otherwise false.
            */
            SignalConnection.prototype.isActive = function () {
                return (this.state() === 1 && this.signalManager.isSubscribed);
            };
            SignalConnection.prototype.connect = function (autoSubscribe, appName) {
                var _this = this;
                var deferred = this.$q.defer();
                this.signalManager = new this.$window.SIT.SignalManager(this.$q);
                var token = this.authentication.getToken();
                if (!token || !token.claimToSend) {
                    deferred.reject('No Valid Token');
                }
                var initTimeoutId = this.setTimeout(deferred, this.settings.responseTimeout);
                this.signalManager.init(token.claimToSend, '/sit-svc/config', appName).then(function () {
                    if (_this.activeTimeoutCount < 1) {
                        _this.signalManager.close();
                        return;
                    }
                    _this.clearTimeout(initTimeoutId);
                    _this.establishConnection(autoSubscribe, _this.name, _this.onConnectionError).then(function () {
                        deferred.resolve();
                    });
                }, function () {
                    _this.clearTimeout(initTimeoutId);
                    _this.lastError = new _this.ExecutionError('-1', 'Connection Error');
                    var error = { reason: 'Connection Error', code: '-1' };
                    _this.onConnectionError(_this, error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            SignalConnection.prototype.establishConnection = function (autoSubscribe, signalName, onConnectionError) {
                var _this = this;
                var deferred = this.$q.defer();
                var openTimeout = this.setTimeout(deferred, this.settings.responseTimeout);
                this.onConnectionError = onConnectionError;
                this.name = signalName;
                this.signalManager.open(signalName, this.onNext, this.onError, this.onCompleted, autoSubscribe, '').then(function () {
                    if (_this.activeTimeoutCount < 1) {
                        return;
                    }
                    _this.clearTimeout(openTimeout);
                    _this.id = _this.signalManager.clientId;
                    if (_this.settings.heartbeat) {
                        _this.startHeartBeat(deferred);
                    }
                    else {
                        deferred.resolve();
                    }
                }, function (error) {
                    _this.clearTimeout(openTimeout);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            SignalConnection.prototype.openSocket = function (autoSubscribe, appName, errorCallbackObject) {
                var _this = this;
                var deferred = this.$q.defer();
                var initTimeout = this.setTimeout(deferred, this.settings.responseTimeout);
                this.signalManager = new this.$window.SIT.SignalManager(this.$q);
                var token = this.authentication.getToken();
                if (!token || !token.claimToSend) {
                    deferred.reject('No Valid Token');
                    return deferred.promise;
                }
                this.signalManager.init(token.claimToSend, '/sit-svc/config', appName, errorCallbackObject).then(function () {
                    if (_this.activeTimeoutCount < 1) {
                        _this.signalManager.close();
                        return;
                    }
                    _this.clearTimeout(initTimeout);
                    deferred.resolve();
                }, function () {
                    _this.clearTimeout(initTimeout);
                    _this.lastError = new _this.ExecutionError('-1', 'Connection Error');
                    var error = { reason: 'Connection Error', code: '-1' };
                    _this.onConnectionError(_this, error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            SignalConnection.prototype.startHeartBeat = function (deferred) {
                var _this = this;
                var hearBeatTimeout = this.setTimeout(deferred, this.settings.responseTimeout);
                this.signalManager.setHeartBeat(this.settings, this.pingTimeoutCbk).then(function () {
                    _this.clearTimeout(hearBeatTimeout);
                    deferred.resolve(_this);
                }, function () {
                    _this.clearTimeout(hearBeatTimeout);
                    _this.lastError = new _this.ExecutionError('-3', 'Heartbeat not supported');
                    deferred.resolve(_this);
                });
            };
            SignalConnection.prototype.clearTimeout = function (id) {
                if (this.activeTimeoutCount > 0) {
                    clearTimeout(id);
                    this.activeTimeoutCount--;
                }
            };
            /**
            * @ngdoc method
            * @name SignalConnection#subscribe
            * @module siemens.simaticit.common.services.signalManager.
            * @description Subscribes to a set of message feeds emitted by the signal associated to the signal connection.
            * @param {String} options A string (optional) used to filter messages.
            * @param {Function} onMessage A callback that is invoked every time a new message is received from the signal.
            * @param {Function} onError A callback (optional) that is invoked whenever an error occurs. There is no need to handle this error. This callback provides error information server side.
            * @param {Function} onComplete A callback (optional) that is invoked when the server notifies the client that it has finished sending messages for the currently active subscription.
            * It is recommended to close the subscription in this callback.
            * @returns {Object} A promise containing a signal connection object and an error response object if there is one.
            *
            */
            SignalConnection.prototype.subscribe = function (options, onMessage, onError, onComplete) {
                var _this = this;
                var deferred = this.$q.defer();
                if (this.state() === 1 && !this.signalManager.isSubscribed) {
                    this.options = options;
                    this.onMessage = onMessage;
                    this.onMessageError = onError;
                    this.onMessageComplete = onComplete;
                    var subscribeTimeout = this.setTimeout(deferred, this.settings.responseTimeout);
                    this.signalManager.subscribe(options).then(function (result) {
                        if (_this.activeTimeoutCount < 1) {
                            _this.signalManager.unsubscribe();
                            return;
                        }
                        _this.clearTimeout(subscribeTimeout);
                        if (result.Result) {
                            deferred.resolve(_this);
                        }
                        else {
                            deferred.reject(result.Reason);
                        }
                    }, function (error) {
                        _this.clearTimeout(subscribeTimeout);
                        deferred.reject(error);
                    });
                }
                else if (!this.state()) {
                    deferred.reject('Connection is not active');
                }
                else {
                    deferred.reject('SignalConnection already subscribed');
                }
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @name SignalConnection#unsubscribe
            * @module siemens.simaticit.common.services.signalManager.
            * @description Unsubscribes from the message feed emitted by the signal associated to the signal connection.
            * @returns {Object} A promise containing a signal connection object and an error response object if there is one.
            *
            */
            SignalConnection.prototype.unsubscribe = function () {
                var _this = this;
                var deferred = this.$q.defer();
                var unsubscribeTimeout = this.setTimeout(deferred, this.settings.responseTimeout);
                this.signalManager.unsubscribe().then(function (result) {
                    _this.clearTimeout(unsubscribeTimeout);
                    if (result.Result) {
                        deferred.resolve(_this);
                    }
                    else {
                        deferred.reject(result.Reason);
                    }
                }, function (error) {
                    _this.clearTimeout(unsubscribeTimeout);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @name SignalConnection#reconnect
            * @description Re-establishes the necessary websocket connections if one or both websocket connections are abruptly closed.
            * **Note:** Previously-subscribed signals will be re-subscribed automatically.
            * @returns {Object} A promise containing a {@link SignalConnection} object and an error response object if there is one.
            *
            */
            SignalConnection.prototype.reconnect = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.connect(true, this.signalApp).then(function () {
                    if (_this.settings.heartbeat) {
                        _this.startHeartBeat(deferred);
                    }
                    else {
                        deferred.resolve(_this);
                    }
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            SignalConnection.prototype.setTimeout = function (deferred, timeout) {
                var _this = this;
                this.activeTimeoutCount++;
                var timeoutId = setTimeout(function () {
                    if (_this.activeTimeoutCount > 0) {
                        _this.activeTimeoutCount--;
                    }
                    _this.lastError = new _this.ExecutionError('-2', 'Response Timeout');
                    var error = { reason: 'Response Timeout', code: '-2' };
                    _this.onConnectionError(_this, error);
                    if (deferred) {
                        deferred.reject('Response Timeout');
                    }
                }, timeout);
                return timeoutId;
            };
            return SignalConnection;
        }());
        /**
            * @ngdoc service
            * @name common.services.signalManager
            * @module siemens.simaticit.common.services.signalManager
            * @description This service is used to manage connections subscriptions to signals.
            *
            * @example
            * The following example shows how the various methods of the ** common.services.signalManager ** service can be used.
            *
            * ```
            (function () {
            'use strict';
            angular.module('siemens.simaticit.common.examples').run(['$rootScope', 'common.services.signalManager', function ($rootScope,signalManagerService) {
        
                // Websocket for an App can be opened by calling the 'connect' method.
                var appName = 'EvtMgrApp';
                signalManagerService.connect(appName, socketConnectionErrorCallback).then(function () {
                    console.log(appName + ": WebSocket Opened Successfully");
                }, function (error) {
                    console.log("Error in opening a websocket \n" + angular.toJson(error, true));
                });
        
                // On socket conn error you can try to connect to the socket again
                function socketConnectionErrorCallback() {
                    console.log("Error in socket connection...");
                    signalManagerService.connect(vm.appName, socketConnectionErrorCallback).then(function () {
                        console.log(appName + ": WebSocket Opened Successfully");
                    }, function (error) {
                        console.log("Error in opening a websocket \n" + angular.toJson(error, true));
                    });
        
                }
        
                // You may choose to close the websocket according to the business case
                $rootScope.$on('appCleanup',function () {
                    signalManagerService.disconnect(appName).then(function () {
                        console.log(appName + ": WebSocket Closed Successfully");
                    }, function (error) {
                        console.log("Error in closing the web socket \n" + angular.toJson(error, true));
                    });
                });
        
        
            }]);
        
            angular.module('siemens.simaticit.common.examples').controller('SignalManagerDevController', SignalManagerDevController);
            SignalManagerDevController.$inject = ['$scope', 'common.services.signalManager'];
            function SignalManagerDevController($scope,signalManagerService) {
                var connectionId;
                // Heartbeat and Response timeout Configurations
                var configOptions = {
                        heartbeat: true,
                        heartbeatFrequency: 10,
                        heartbeatTimeout: 20,
                        responseTimeout: 20
                    };
                // Setting configOptions.
                signalManager.configure(configOptions);
        
                // Here we call the createConnection, which will open a websocket for the App if it is not already opened. Then we subscribe to a signal.
                // If a websocket had already been opened for an App calling the 'connect' method, then this call will be faster in establishing the connection for the signal.
                // The signalConn object returned by this method will then be used to subscribe to the signal.
                signalManagerService.createConnection("EvtMgrApp", "mySignal", onConnectionError).then(function (signalconn) {
                    connectionId = signalconn.id
                    var onMessage = function (msg) {
                        console.log(signalconn.name + " - Message received from signal: \n" + angular.toJson(msg, true));
                    };
        
                    var onError = function (err) {
                        console.error("An error occurred: \n" + angular.toJson(err, true));
                    };
        
                    var onComplete = function () {
                        console.log("Signal '" + signalconn.name + "' stopped sending messages.");
                    }
        
                    // Subscribe to the signal
                    return signalconn.subscribe("$filter=Type eq 'Test'", onMessage, onError, onComplete)
        
                }).then(onSuccess, onFailure);
        
                function onSuccess(signalconn) {
                    console.log("Subscribed to signal '" + signalconn.name + "' with the following optins: " + signalconn.options);
                };
        
                function onFailure(error) {
                    console.log("Could not subscribe to signal.");
                };
        
        
                // This method will be called if there is a connection error .
                // This method will receive a connection object, which has the details of the signal and the App.
                // This connection object can be used to reconnect to the signal.
        
                // Keep track of whether a reconnection is in progress or not.
                var reconnecting = false;
                // Keep track of whether the reconnection succeeded or not.
                var reconnected = false;
        
                function onConnectionError(signalconn) {
                    console.log("Reconnecting...")
                    signalconn.reconnect().then(function () {
                        reconnected = false;
                        setTimeout(function () {
                            if (!reconnectig && !reconnected) {
                            reconnecting = true;
                            conn.reconnect().then(function (reconn) {
                                reconnected = true;
                                reconnecting = false;
                                // Insert here the code to run when the connection is re-established.
                                // Any previously-subscribed signal will be automatically re-subscribed.
                            }).catch(function () {
                                reconnecting = false;
                            });
                            }
                        }, 40000); // Attempt to reconnect at every 40 seconds.
                        // This value should be greater than the heartbeat timeout value
                };
        
                $scope.$on("$destroy", function () {
                    if (connectionId) {
                        // You can delete the connection and unsubscribe from the signal using the 'deleteConnection' method.
                        signalManagerService.deleteConnection(connectionId).then(function () {
                            console.log("Connection closed successfully");
                        }, function () {
                            console.log("Error in closing the connection: \n" + angular.toJson(error, true));
                        })
                    }
                });
        
            }
        })();
            * ```
            */
        angular.module('siemens.simaticit.common.services.signalManager')
            .service('common.services.signalManager', SignalManagerService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=signalManager.svc.js.map
/// <reference path="common.svc.ts" />
'use strict';
/**
  * @ngdoc module
  * @name siemens.simaticit.common.services.timer
  * @module siemens.simaticit.common
  *
  * @description
  * Contains services to manage simple timers.
  *
  *
  */
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Process = /** @class */ (function () {
            function Process(_id, _name) {
                this._id = _id;
                this._name = _name;
                this.id = _id;
                this.name = _name;
            }
            return Process;
        }());
        framework.Process = Process;
        var Timer = /** @class */ (function () {
            function Timer($window, $rootScope, $interval, $log) {
                this.$window = $window;
                this.$rootScope = $rootScope;
                this.$interval = $interval;
                this.$log = $log;
                this.queue = [];
            }
            /**
            * @ngdoc method
            * @name common.services.timer#start
            * @description
            * Starts a timer
            * @param {string} name Name of the timer
            * @param {number} ms time period specified for the interval
            * @param {boolean} autoStop Boolean to indicate if the timer should be stopped automatically.
            * @returns {string} Id of the timer.
            *
            */
            Timer.prototype.start = function (name, ms, method, autoStop, invokeApply) {
                var _this = this;
                var id = framework.Utils.generateUUID();
                var process = new Process(id, name);
                process.method = this.$interval(function () {
                    try {
                        if (method !== undefined) {
                            method();
                        }
                        if (autoStop === true) {
                            _this.stop(id);
                        }
                    }
                    catch (e) {
                        _this.$log.log('exception: ' + e);
                        _this.stop(id);
                    }
                }, ms, autoStop === true ? 1 : 0, invokeApply === false ? false : true);
                this.queue.push(process);
                return id;
            };
            /**
                * @ngdoc method
                * @name common.services.timer#stop
                * @description
                * Stops a timer
                * @param {string} id Id of the timer
                */
            Timer.prototype.stop = function (id) {
                var process;
                var index = -1;
                for (var i = 0; i < this.queue.length; i++) {
                    if (this.queue[i].id === id) {
                        process = this.queue[i];
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    this.$interval.cancel(process.method);
                    //console.log('Stopped: ' + process.id + ": " + process.name)
                    this.queue.splice(index, 1);
                }
            };
            /**
                * @ngdoc method
                * @name common.services.timer#stopAll
                * @description
                * Stops all the timers.
                */
            Timer.prototype.stopAll = function () {
                for (var i = this.queue.length - 1; i >= 0; i--) {
                    this.$interval.cancel(this.queue[i].method);
                    this.queue.splice(i, 1);
                }
            };
            Timer.$inject = ['$window', '$rootScope', '$interval', '$log'];
            return Timer;
        }());
        framework.Timer = Timer;
        /**
        * @ngdoc service
        * @name common.services.timer
        * @module siemens.simaticit.common.services.timer
        *
        * @description
        * This service is responsible for managingvarious timers.
        *
        */
        angular.module('siemens.simaticit.common.services.timer', []).service('common.services.timer', ['$window', '$rootScope', '$interval', '$log', Timer]);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=timer.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        angular.module('siemens.simaticit.common.services.umc').provider('common.services.umc.config', [
            function () {
                this.config = {
                    identityProviderUrl: ''
                };
                this.$get = function () {
                    return {
                        config: this.config
                    };
                };
            }
        ]);
        var UMCService = /** @class */ (function () {
            function UMCService($window, $rootScope, $log, umcConfig) {
                this.$window = $window;
                this.$rootScope = $rootScope;
                this.$log = $log;
                this.umcConfig = umcConfig;
                if (this.$window.UmcWebSSO === undefined) {
                    $log.error('UmcWebSSO is unavailable');
                    return;
                }
                if (umcConfig.config.identityProviderUrl.length > 0) {
                    this.WebSSO = this.$window.UmcWebSSO(umcConfig.config.identityProviderUrl);
                }
                this.claims = null;
            }
            UMCService.prototype.UMCClaimsFromOAuthClaims = function (authClaims) {
                this.claims = {
                    session: authClaims.session,
                    sessionrenewal: authClaims.sessionrenewal
                };
            };
            UMCService.prototype.init = function (identityUrl) {
                if (this.WebSSO === undefined && identityUrl !== undefined) {
                    this.WebSSO = this.$window.UmcWebSSO(identityUrl);
                }
            };
            UMCService.prototype.renew = function (authClaims) {
                this.WebSSO.init(authClaims);
                return this.WebSSO.beginRenew();
            };
            UMCService.prototype.logout = function (authClaims) {
                this.WebSSO.init(authClaims);
                return this.WebSSO.beginLogout();
            };
            UMCService.$inject = ['$window', '$rootScope', '$log', 'common.services.umc.config'];
            return UMCService;
        }());
        framework.UMCService = UMCService;
        angular.module('siemens.simaticit.common.services.umc')
            .service('common.services.umc', ['$window', '$rootScope', '$log', 'common.services.umc.config', UMCService]);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=umc.svc.js.map
(function () {
    'use strict';

    /**
   * @ngdoc provider
   * @access internal
   * @name common.base.unityInterceptorConfigProvider
   * @module siemens.simaticit.common.base
   * @description
   * Provides a key to enter authentication token in the header of the **http** requests (read-only) and an object (key or value) to be used for custom headers.
   * @property {object} config.customHeaders Custom Headers.
   * @property {object} authTokenHeader header for authentication token.
   */
    angular.module('siemens.simaticit.common.base').provider('common.base.unityInterceptorConfig', [function () {

        this.config = {
            // These are the properties we need to set
            /**
             * Key-Value object
             */
            customHeaders: {}

        };

        this.$get = function () {
            return {
                config: this.config,
                authTokenHeader: 'Authorization'
            };
        };
    }]);

    /**
     * @ngdoc service
     * @access internal
     * @name common.base.unityInterceptorService
     * @module siemens.simaticit.common.base
     * @description
     * Provides service used to automatically intercept all the **http** requests and responses. The service changes the request headers and handles errors responses.
     * The Interceptor XHR services include:
     *      **request:** Adds set and remove headers.
     *      **response:** Handles specific error case. Example, error **401: Unauthorized**.
     * https://docs.angularjs.org/api/ng/service/$http (interceptors)
     * @param $q Service that helps to run functions asynchronously, and use their return values (or exceptions) when the functions have finished processing.
     * @param logger Provides methods to manage application logs.
     * @param unityInterceptorConfig Provides keys to configure the **unityInterceptor** Service. The **unityInterceptor** Service include the following keys:
     * * **config.customHeaders:** Object key or value to be used for any custom headers.
     * * **authTokenHeader:** Provides name of the header authentication to be added to the requests.
     * @param LOG_TYPES A constant that specifies the available log types.
     * @param authentication Provides methods to manage user authentication.
     * @param swacManager Provides methods to logout of the Apollo Container when session timeout happens or unauthorized access.
     * @returns {object} object {request: request, response: response, responseError: responseError, requestError: requestError}
     */
    angular.module('siemens.simaticit.common.base').service('common.base.unityInterceptorService',
        ['$q', 'common.services.logger.service', 'common.base.unityInterceptorConfig', 'LOG_TYPES',
            'common.services.ui.authentication', 'common.services.authentication.config', 'common.services.swac.SwacUiModuleManager', interceptor]);

    function interceptor($q, logger, unityInterceptorConfig, LOG_TYPES, authentication, authenticationConfig, swacManager) {

        this.request = request;
        this.response = response;
        this.responseError = responseError;
        this.requestError = requestError;

        /**
         * @ngdoc method
         * @access internal
         * @name common.base.unityInterceptorService#request
         * @param {object} config
         * @description
         * Intercepts the **http** request and inserts or modifies the authentication header and custom header (if any) specified in the **unityInterceptorConfig** provider.
         *
         */
        function request(config) {

            //Get token from Authentication

            var token  = authentication.getToken();
            //set custom headers
            $.extend(config.headers, unityInterceptorConfig.config.customHeaders);

            //add Token header
            if (token) {
                if (config.url !== authenticationConfig.config.identityProviderUrl) {
                    config.headers[unityInterceptorConfig.authTokenHeader] = token.claimToSend;
                }

            }

            if (!authenticationConfig.config.enableAuthentication) {
                config.headers[unityInterceptorConfig.authTokenHeader] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzMSIsInVuaXF1ZV9uYW1lIjoiaGFyYWxkIiwidXJuOnNlc3Npb24iOiJuZ2RxNDBjcnd6ejN4dml2aXVmd3V1Z2UiLCJ1cm46bGFuZ3VhZ2UiOiJVUyIsInVybjpncm91cCI6WyIxfERldmVsb3BlciJdLCJ1cm46b2F1dGg6c2NvcGUiOiJyZWFkIiwidXJuOnJlYWxtIjoidGVzdCIsImlzcyI6InVybjp1bml0eW9hdXRoIiwiYXVkIjoidXJuOnVuaXR5IiwiZXhwIjoxNDUwMzY4MDIzLCJuYmYiOjE0MTg4MzIwMjN9.nFAnYNQ_hrFko2mq08jZW--t_7DiZrvYffXuuIX1uWk';
            }

            return config || $q.when(config);
        }


        /**
         * @ngdoc method
         * @access internal
         * @name common.base.unityInterceptorService#requestError
         * @param {object} request
         * @description
         * Logs **http** request errors.
         *
         */
        function requestError(request){
            var logWarning = logger.getLogFn('UNITY', LOG_TYPES.LOG_WARNING);
            logWarning('httpRequest Error', request);
        }



        /**
         * @ngdoc method
         * @access internal
         * @name common.base.unityInterceptorService#response
         * @param {object} res
         * @description
         * Logs the **http** response (status 200).
         *
         * return {object} httpResponse
         */
        function response(res) {
            //response.status == 200

            return res || $q.when(res);
        }


        /**
         * @ngdoc method
         * @access internal
         * @name common.base.unityInterceptorService#responseError
         * @param {object} rejection
         * @description
         * * If **http 401** error, execute  {@link authentication#login login} method.
         * Logs error rejection.
         *
         * return {object} rejection
         */
        function responseError(rejection) {
            var logWarning = logger.getLogFn('UNITY', LOG_TYPES.LOG_WARNING);
            logWarning('httpResponse Error', rejection);
            switch (rejection.status){
                case 401:

                    if (authenticationConfig.config.enableAuthentication) {
                        if (swacManager.enabled) {
                            swacManager.eventBusServicePromise.promise.then(function (eventBusSvc) {
                                eventBusSvc.publish('sessionLogoutComponent', {
                                    success: true
                                });
                            });
                        } else {
                            authentication.login();
                        }
                    }
                    break;
                default:
                    break;
            }

            /*
            * $q.reject creates a promise that is resolved as rejected with the specified reason
            *
            */

            return $q.reject(rejection);

        }

    }
})();
