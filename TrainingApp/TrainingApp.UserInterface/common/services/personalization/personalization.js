/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.services.personalization
     * @module siemens.simaticit.common
     *
     * @description
     * This module provides services to set and reset the user personalization.
     *
     */
    angular.module('siemens.simaticit.common.services.personalization', []);

})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
         * @ngdoc service
         * @access internal
         * @name common.services.personalization.personalizationService
         * @module siemens.simaticit.common.services.personalization
         * @description A service provider for performing set/reset operation on user personalization.
         */
        var PersonalizationService = /** @class */ (function () {
            function PersonalizationService($http, $resource, $q, CONFIG, $state, authService, dataConfig, CommandResponse, ExecutionError, common, dataService) {
                var _this = this;
                this.GET_PREFERENCE_FUNCTION = 'GetUserPreferences';
                this.PREFERENCE_FIELD = 'PreferenceValue';
                this.SET_PREFERENCE_COMMAND = 'SetUserPreference';
                this.RESET_PREFERENCE_COMMAND = 'ResetUserPreference';
                this.SYSTEM_APP = 'System';
                this.userPreference = null;
                this.applicationServiceUrls = null;
                this.updatePreference = function (preferences) {
                    var updatedPreference = {
                        Element: preferences.Element,
                        Module: preferences.Module,
                        Screen: preferences.Screen,
                        Type: preferences.Type,
                        PreferenceValue: preferences.PreferenceValue
                    };
                    if (!_this.userPreference) {
                        _this.userPreference = [];
                        _this.userPreference.push(updatedPreference);
                    }
                    var index = _.findIndex(_this.userPreference, { Type: preferences.Type, Element: preferences.Element, Module: preferences.Module, Screen: preferences.Screen });
                    if (index === -1) {
                        _this.userPreference.push(updatedPreference);
                    }
                    else {
                        _this.userPreference[index] = updatedPreference;
                    }
                };
                this.getScreenInfo = function () {
                    if (!_this.CONFIG.clientID) {
                        return null;
                    }
                    var screen = _this.$state.current.name.split('.');
                    var screenInfo = {
                        uiapplication: _this.uiApp,
                        uimodule: screen[1].replace(/(.*)\_.*/g, '$1'),
                        uiscreen: screen[screen.length - 1],
                        title: _this.$state.current.title
                    };
                    return screenInfo;
                };
                this.getAppName = function () {
                    if (!_this.CONFIG || !_this.CONFIG.clientID) {
                        return null;
                    }
                    return _this.CONFIG.clientID.replace(/.*\./g, "");
                };
                this.callPrefCommand = function (path) {
                    return _this.$resource('', {}, {
                        callPreference: {
                            method: 'Post',
                            url: path,
                            transformRequest: [_this.transformDataObj],
                            transformResponse: [_this.transformResObj].concat(_this.$http.defaults.transformResponse)
                        }
                    });
                };
                this.transformResObj = function (data, headersGetter, statusCode) {
                    var res = null;
                    try {
                        res = JSON.parse(data);
                    }
                    catch (exception) {
                        _this.common.logger.logError('-1: Error: Generic Error', '', 'Personalization Service');
                    }
                    return res;
                };
                this.transformDataObj = function (data) {
                    return JSON.stringify({ command: data });
                };
                this.$http = $http;
                this.$resource = $resource;
                this.$q = $q;
                this.CONFIG = CONFIG;
                this.$state = $state;
                this.authService = authService;
                this.dataConfig = dataConfig;
                this.CommandResponse = CommandResponse;
                this.ExecutionError = ExecutionError;
                this.common = common;
                this.dataService = dataService;
                this.applicationServiceUrls = dataConfig.config.applicationServiceUrls;
                this.uiApp = this.getAppName();
            }
            /**
            * @ngdoc method
            * @access internal
            * @name common.services.personalization.personalizationService#setPersonalization
            * @module siemens.simaticit.common.services.personalization
            * @description Stores the personalization settings configured by the user.
            * @param {String} Type The widget name.
            * @param {String} PrefrenceId The userPrefId property value.
            * @param {Object} Value A personalized configuration object.
            * @returns {Object} A promise object containing a success/failure result.
            */
            PersonalizationService.prototype.setPersonalization = function (type, prefrenceId, value) {
                var _this = this;
                var path = '';
                var deferred = this.$q.defer();
                if (!this.applicationServiceUrls || !this.applicationServiceUrls[this.SYSTEM_APP] || !this.CONFIG.clientID) {
                    deferred.reject();
                    return deferred.promise;
                }
                var screenInfo = this.getScreenInfo();
                var applicationUrl = this.applicationServiceUrls[this.SYSTEM_APP];
                path = applicationUrl;
                if (applicationUrl.slice(-1) !== '/') {
                    path = applicationUrl + '/';
                }
                path = path + this.SET_PREFERENCE_COMMAND;
                var prefResource = this.callPrefCommand(path);
                var payload = {
                    Application: screenInfo.uiapplication,
                    Module: screenInfo.uimodule,
                    Screen: screenInfo.uiscreen,
                    Element: prefrenceId,
                    Type: type,
                    PreferenceValue: JSON.stringify(value)
                };
                prefResource.callPreference(payload, function (response) {
                    _this.updatePreference(payload);
                    deferred.resolve();
                }, function (reject) {
                    if (reject) {
                        var error = reject.data.Error;
                        _this.common.logger.logError(error.ErrorCode + ': Error: ' + error.ErrorMessage + '', '', 'Personalization Service');
                    }
                    deferred.reject();
                });
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @access internal
            * @name common.services.personalization.personalizationService#resetPersonalization
            * @module siemens.simaticit.common.services.personalization
            * @description Resets the personalization settings for a widget.
            * @param {String} Type The widget name.
            * @param {String} PrefrenceId The userPrefId property value.
            * @returns {Object} A promise object containing a success/failure result.
            */
            PersonalizationService.prototype.resetPersonalization = function (type, prefrenceId) {
                var _this = this;
                var path = '';
                var deferred = this.$q.defer();
                if (!this.applicationServiceUrls || !this.applicationServiceUrls[this.SYSTEM_APP] || !this.CONFIG.clientID) {
                    deferred.reject();
                    return deferred.promise;
                }
                var screenInfo = this.getScreenInfo();
                var applicationUrl = this.applicationServiceUrls[this.SYSTEM_APP];
                path = applicationUrl;
                if (applicationUrl.slice(-1) !== '/') {
                    path = applicationUrl + '/';
                }
                path = path + this.RESET_PREFERENCE_COMMAND;
                var prefResource = this.callPrefCommand(path);
                var payload = {
                    Application: screenInfo.uiapplication,
                    Module: screenInfo.uimodule,
                    Screen: screenInfo.uiscreen,
                    Element: prefrenceId
                };
                prefResource.callPreference(payload, function (response) {
                    var index = _.findIndex(_this.userPreference, { Type: type, Element: prefrenceId });
                    _this.userPreference.splice(index, 1);
                    deferred.resolve(response);
                }, function (reject) {
                    if (reject) {
                        var error = reject.data.Error;
                        _this.common.logger.logError(error.ErrorCode + ': Error: ' + error.ErrorMessage + '', '', 'Personalization Service');
                    }
                    deferred.reject();
                });
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @access internal
            * @name common.services.personalization.personalizationService#getPersonalization
            * @module siemens.simaticit.common.services.personalization
            * @description Retrieves the personalization settings for an user.
            * @returns {Object} A promise object containing a success/failure result. The success result will return a personalization data and the failure result will return an error message
            */
            PersonalizationService.prototype.getPersonalization = function () {
                var _this = this;
                var path = '';
                var deferred = this.$q.defer();
                if (!this.uiApp || !this.applicationServiceUrls || !this.applicationServiceUrls[this.SYSTEM_APP]) {
                    deferred.resolve();
                    return deferred.promise;
                }
                var payload = {
                    appName: this.SYSTEM_APP,
                    functionName: this.GET_PREFERENCE_FUNCTION,
                    params: { Application: this.uiApp },
                    options: ""
                };
                this.dataService.read(payload).then(function (response) {
                    _this.userPreference = response.value;
                    deferred.resolve();
                }, function (reject) {
                    _this.userPreference = null;
                    _this.common.logger.logError('Error:Unable to retrieve Personalization settings', '', 'Personalization Service');
                    deferred.resolve();
                });
                return deferred.promise;
            };
            /**
            * @ngdoc method
            * @access internal
            * @name common.services.personalization.personalizationService#getCurrentUserPreference
            * @module siemens.simaticit.common.services.personalization
            * @description Retrieves the personalization settings for a widget.
            * @param {String} Type The widget name.
            * @param {String} PrefrenceId The userPrefId property value.
            * @returns {Value} The configured settings.
            */
            PersonalizationService.prototype.getCurrentUserPreference = function (type, prefrenceId) {
                if (!this.userPreference) {
                    return null;
                }
                var screenInfo = this.getScreenInfo();
                var preference = _.findWhere(this.userPreference, {
                    Type: type,
                    Element: prefrenceId,
                    Module: screenInfo.uimodule,
                    Screen: screenInfo.uiscreen
                });
                if (!preference) {
                    return null;
                }
                return JSON.parse(preference[this.PREFERENCE_FIELD]);
            };
            PersonalizationService.$inject = ['$http', '$resource', '$q', 'CONFIG', '$state', 'common.services.authentication', 'common.services.runtime.DataConfig', 'CommandResponse', 'ExecutionError', 'common', 'common.services.runtime.dataService'];
            return PersonalizationService;
        }());
        angular.module('siemens.simaticit.common.services.personalization')
            .service('common.services.personalization.personalizationService', PersonalizationService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=personalization.js.map