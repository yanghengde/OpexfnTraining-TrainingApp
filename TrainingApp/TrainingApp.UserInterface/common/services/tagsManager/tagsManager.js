/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.services.tagsManager
     * @module siemens.simaticit.common
     *
     * @description
     * This module provides services to store entities segregation tags.
     *
     */
    angular.module('siemens.simaticit.common.services.tagsManager', []);

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.services.tagsManager').service('common.services.tagsManager.tagsManagementService', tagsManagementService);

    tagsManagementService.$inject = ['common.base',
                                     'common.services.authentication',
                                     '$q',
                                     '$http',
                                     'common.services.runtime.systemConfigurationService',
                                     'common.services.runtime.backendService'];

    function tagsManagementService(commonBase, authenticationService, $q, $http, systemConfigurationService, businessData) {
        var self = this;
        self._backendService = commonBase.services.runtime.backendService;
        self._entityName = null;
        self._appName = null;
        self._entyInfo = {};

        var isGuid = function (value) {
            var regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i; //NOSONAR
            var match = regex.exec(value);
            return match != null;
        }

        var getSegregationTags = function (id, idType) {
            var query = "$filter=Id eq '" + id + "'&$expand=SegregationTags";
            if (idType === 'number' || isGuid(id) === true) {
                query = "$filter=Id eq " + id + "&$expand=SegregationTags";
            }
            return executeQuery(query, self._entityName, self._appName);
        }

        var isDataSegregationEnabled = function () {
            return systemConfigurationService.isDataSegregationEnabled();
        }
        var setSegregationTags = function (id, segregationTags) {
            if (!isDataSegregationEnabled)
                throw 'Data Segregation must be enabled for current App';

            var params = {
                // PublicModelEntityShortName: self._entityName,
                EntityId: id,
                SegregationTags: segregationTags,
                // AppShortName: self._appName
                EntityInfo: self._entyInfo
            };
            return executeDSCommand('ReplaceSegregationTagAssociation', params);
        };

        //sonarQube issue for sessionStorage. Method should be not used anymore.
        var signalToken = function () {
            return '';
        };

        var getAppsMetadata = function (returnSuccess, returnFailure, noCache) {
            var url = '/sit-svc/application/$meta/apps';
            var tokenString = signalToken();
            var signalHeader = [{ name: 'Authorization', value: tokenString }];
            get(url, signalHeader, noCache).then(returnSuccess, returnFailure);
        };

        var getAppMetadata = function (appName, returnSuccess, returnFailure, noCache) {
            var url = '/sit-svc/application/$meta/apps/' + appName;
            var tokenString = signalToken();
            var signalHeader = [{ name: 'Authorization', value: tokenString }];
            get(url, signalHeader, noCache).then(returnSuccess, returnFailure);
        };


        var getCompositionInfo = function (appname, entityname) {
            var params = {
                PublicModelEntityShortName: entityname,
                AppShortName: appname
            };

            var object = {
                'appName': 'DataSegregation',
                'functionName': 'GetEntityMetadata',
                'params': params,
                'options': ''
            };

            return businessData.read(object);
        };

        var service = {
            executeQuery: executeQuery,
            //getPersonsIfAtLeastOneFilterIsSet: getPersonsIfAtLeastOneFilterIsSet,
            getAvailableTags: getAvailableTags,
            getSegregationTagColor: getSegregationTagColor,
            setEntityName: function (entityName) { self._entityName = entityName },
            setAppName: function (appName) { self._appName = appName },
            setEntityInfo: function (entityinfo) { self._entyInfo = entityinfo },
            getSegregationTags: getSegregationTags,
            setSegregationTags: setSegregationTags,
            isDataSegregationEnabled: isDataSegregationEnabled,
            getAppsMetadata: getAppsMetadata,
            getAppMetadata: getAppMetadata,
            getCompositionInfo: getCompositionInfo,
            getTagsStyle: getTagsStyle
        };

        activate();

        return service;

        function activate() {
        }

        function executeDSCommand(commandName, commandParameters) {
            var commandModel = {};
            commandModel.appName = 'DataSegregation';
            commandModel.commandName = commandName;
            commandModel.params = commandParameters;
            var defer = self._backendService.invoke(commandModel);
            defer.catch(self._backendService.backendError);
            return defer;
        }

        function executeQuery(options, entityName, appName) {
            var queryModel = {};
            queryModel.appName = (appName !== undefined) ? appName : self._appName;
            queryModel.entityName = (entityName !== undefined) ? entityName : self._entityName;
            queryModel.options = options;
            return self._backendService.findAll(queryModel).catch(self._backendService.backendError);
        }

        function getAvailableTags() {
            var object = {
                'appName': 'DataSegregation',
                'functionName': 'GetSessionSegregationTags',
                'params': {},
                'options': ''
            };

            return businessData.read(object).then(function (response) {
                return response;
            });
        }

        function getSegregationTagColor(tagName) {
            return executeQuery("$filter=Name eq '" + tagName + "'", 'SegregationTag', 'DataSegregation').then(onGetSegregationTagSuccess);

            function onGetSegregationTagSuccess(result) {
                if (result && result.value && result.value.length > 0) return result.value[0].Color;
                return null;
            }
        }

        function get(address, headers, noCache) {
            if (noCache !== undefined && noCache === true) {
                var index = address.indexOf('?');
                address += (index === -1) ? ('?_=' + new Date().getTime()) : ('&_=' + new Date().getTime());
            }
            return _send("GET", address, headers);

            function _send(verb, address, headersArray) {
                var deferred = $q.defer();
                var headers = {};
                if (headersArray) {
                    for (var i = 0; i < headersArray.length; i++) {
                        headers[headersArray[i].name] = headersArray[i].value;
                    }
                }
                $http({
                    method: verb,
                    url: address,
                    headers: headers
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            }
        }

        function getTagsStyle(segregationtags) {
            _.each(segregationtags, function (tag, idx) {
                tag.ShortName = angular.copy(tag.Name);
                if (tag.Name.length > 10) {
                    tag.ShortName = tag.ShortName.substring(0, 10) + "...";
                }
                tag.style = getColors(tag);
            });
        }

        function getColors(tag) {
            var _defaultcolor = '#3296b9'; //'#DCDCDC';
            var _isColorDefined = isColorDefined();
            var _textcolor = GetTextColorTreshold(_isColorDefined, tag.Color);
            var _style = _isColorDefined ? { backgroundColor: tag.Color, color: _textcolor } : { backgroundColor: _defaultcolor, color: _textcolor };

            function isColorDefined() {
                return tag.Color !== undefined && tag.Color != null && tag.Color !== '';
            }

            function GetTextColorTreshold(isdefined, color) {
                if (!isdefined)
                    return "#FFFFFF";// '#464646';
                return isCssColorDark(color) ? "#FFFFFF" : "#464646";
            }

            function isCssColorDark(cssColor) {
                //Determine if an elements css color is light or dark
                //https://gist.github.com/larryfox/1636338
                var r, b, g, hsp
                  , a = cssColor;

                if (a.match(/^rgb/)) {
                    a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/); //NOSONAR
                    r = a[1];
                    g = a[2];
                    b = a[3];
                } else {
                    a = +("0x" + a.slice(1).replace( // thanks to jed : http://gist.github.com/983661
                        a.length < 5 && /./g, '$&$&'
                      )
                    );
                    r = a >> 16;
                    g = a >> 8 & 255;
                    b = a & 255;
                }
                hsp = Math.sqrt( // HSP equation from http://alienryderflex.com/hsp.html
                  0.2126 * (r * r) +
                  0.7152 * (g * g) +
                  0.0772 * (b * b)
                );
                return (hsp <= 160);
            }
            return _style;
        }
    }
})();
