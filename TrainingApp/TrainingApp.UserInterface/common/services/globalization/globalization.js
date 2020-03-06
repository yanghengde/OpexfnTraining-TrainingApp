/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.services.globalization
     *
     * @description
     * This module provides service providers and directives that can be used to manage the translation and localization of the user interface.
     */
    angular.module('siemens.simaticit.common.services.globalization', []);

})();

/*jshint -W117 */
(function () {
    'use strict';

    /**
    * @ngdoc factory
    * @name common.globalization.globalozationErrorHandler
    * @module siemens.simaticit.common.services.globalization
    * @requires $q
    * @requires common.services.logger.service
    * @access internal
    *
    * @description
    * A factory service for error hadling when translation loading fails
    *
    * @returns {Function} A callback function to execute when the resource file loading fails.
    *
    */
    angular.module('siemens.simaticit.common.services.globalization')
        .factory('common.globalization.globalozationErrorHandler', ['$q', 'common.services.logger.service', function ($q, logger) {
            return function (part, lang, response) {
                var msg = (response.status) ? 'Error (' + response.status + ')' : 'Error';
                var deffered = $q.defer();
                logger.logError(part + '.' + lang, msg, 'common.services.globalization.globalizationService');
                deffered.resolve()
                return deffered.promise
            };
        }]);

    /**
     * @ngdoc provider
     * @name common.globalization.globalizationConfigProvider
     * @module siemens.simaticit.common.services.globalization
     * @requires $translateProvider
     * @requires $translatePartialLoaderProvider
     * @access internal
     *
     * @description
     * Configures the localization and translation settings.
     *
     * @property resourceLoaded {Boolean} If set to **true** all resources have been loaded.
     *
     */
    angular.module('siemens.simaticit.common.services.globalization').provider('common.globalization.globalizationConfig', ['$translateProvider', '$translatePartialLoaderProvider',
        function ($translateProvider, $translatePartialLoaderProvider) {

            /**
             * @ngdoc method
             * @name common.globalization.globalizationConfig#setLanguage
             * @access internal
             * @description Sets the required current locale used language.
             * @param {string} langKey An RFC5646 compliant language code (for example, en-US. it-IT).
             */
            this.setLanguage = function (langKey) {
                $translateProvider.use(langKey);

            };

            /**
             * @ngdoc method
             * @name common.globalization.globalizationConfig#setFallbackLanguage
             * @access internal
             * @description Sets the required fallback language. If a translation is not found, the language specified here will be used.
             * @param {string} langKey An RFC5646 compliant language code (for example, en-US or it-IT).
             */

            this.setFallbackLanguage = function (langKey) {
                $translateProvider.fallbackLanguage(langKey);
                $translateProvider.preferredLanguage(langKey);
                $translateProvider.useSanitizeValueStrategy('escape');
            };
            /**
             * @ngdoc method
             * @name common.globalization.globalizationConfig#setResourcePath
             * @access internal
             * @description  Registers a JSON resource file path.
              * @param {Object[]} parts An array of objects, each containing a property "name" that corresponds to the resource part identifier of the JSON file name used for
              * translations.(example: if the file is named custom-widget.it-IT.json, the property name will be custom-widget).
             * The name of each JSON file will be composed as follows: {path}/{part}.{language}.json (example: resources/custom-widget.it-IT.json)
             * The name of each JSON file will be composed as follows: {path}{part}.{language}.json (example: resources/custom-widget.it-IT.json)
             */
            this.setResourcePath = function (path, parts) {
                if (undefined === parts || 0 === parts.length) {
                    return;
                }
                for (var index = 0; index < parts.length; index++) {
                    var p = path + parts[index].name;
                    $translatePartialLoaderProvider.addPart(p);
                }
                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: '{part}.{lang}.json',
                    loadFailureHandler: 'common.globalization.globalozationErrorHandler'
                });
            };

            this.resourcesLoaded = false;

            this.$get = function () {

                return {
                    setLanguage: this.setLanguage,
                    setFallbackLanguage: this.setFallbackLanguage,
                    setResourcePath: this.setResourcePath,
                    resourcesLoaded: this.resourcesLoaded
                };
            };
        }]);

    function globalizationService($rootScope, $http, $q, $translate, $cacheFactory, globalizationConfig, runtimelocale, logger, CONFIG, APPCONFIG, LOG_LEVELS) {
        var config = angular.extend({}, APPCONFIG, CONFIG);



        var lang_en = _.find(config.languages, function (lang) {
            return lang === 'en-US';
        });
        if (!lang_en) {
            lang_en = 'en-US';
        }
        var appLanguage = '';
        var loadedResourceFiles = [];


        //private function
        // 13299 - not used as a part of setResourcePath function
        function checkResource(resource) {
            var deferred = $q.defer();

            $http({ method: 'GET', url: resource }).then(function () {
                try {
                    deferred.resolve();
                } catch (ex) {
                    var msg = 'resource: ' + resource + ' error';
                    logger.logError(msg, ex, 'common.services.globalization.globalizationService');
                    deferred.reject();
                }
            }).catch(function (response) {

                var msg = (response.status) ? 'Error (' + response.status + ')' : 'Error';
                logger.logError(msg, resource, 'common.services.globalization.globalizationService');
                deferred.reject();
            });

            return deferred.promise;
        }


        //private function
        //13299 - not used as a part of setResourcePath function
        function checkPart(path, part) {
            var deferred = $q.defer();
            var resourcePath = '';
            var resource = '';
            var promises = [];

            config.languages.forEach(function (objLang) {
                resource = part.name + '.' + objLang + '.json';
                if (loadedResourceFiles.indexOf(resource) < 0) {
                    resourcePath = path + resource;
                    promises.push(checkResource(resourcePath));
                }
            });

            $q.all(promises).then(function () {
                deferred.resolve(part);
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;



        }

        /**
        * @ngdoc service
        * @name common.globalization.globalizationConfig
        * @module siemens.simaticit.common.services.globalization
        * @access internal
        *
        * @description
        * Configures the localization and translation settings.
        *
        * @property resourceLoaded {Boolean} If set to **true** all resources are loaded, otherwise **false**.
        *
        */


        /**
         * @ngdoc method
         * @name common.services.globalization.globalizationService#getLocale
         * @returns {String} The currently used language, provided as an RFC5646 compliant language code (for example, en-US. it-IT).
         *
         * @description
         * Gets the currently used locale language.
         *
         */
        function getLocale() {
            return $translate.use();
        }

        /**
         * @ngdoc method
         * @name common.services.globalization.globalizationService#getSupportedLocales
         * @returns {Array} An array of locale languages currently supported.
         *
         * @description
         * Gets the list of supported locales, based on the locales that have been either distributed by the UI Framework or within the locales folder of Apps.
         * In order to list the locales distributed by the UI Framework, the common/scripts/i18n folder should contain a locales.json file, which
         * contains the name of the languages.
         *
         */
        function getSupportedLocales() {
            // Added NOSONAR because in version 2.2 we suppress the vulnerability in according to project architect and the security expert of the product.
            // In detail the process was tracked by the TFS issue number 22519
            // In version 2.3 SonarQube all those issues that were marked before reappeared again. Better, for a certain period the issues were listed as resolved and,
            //at the same time, they were listed as new issues.
            // So a agreed solution with the team issue administrator is to mark them using an in-code approach.
            // You can find details on the attached email on the TFS issue number 22519
            return JSON.parse(window.sessionStorage.getItem("supportedLocales")); //NOSONAR
        }

        /**
         * @ngdoc method
         * @name common.services.globalization.globalizationService#setLanguage
         * @param {String} langKey An RFC5646 complaint language code (for example, en-US or it-IT).
         *
         * @description
         * Sets the required currently used locale language. It can be used to switch or dynamically change the language as well.
         *
         */
        function setLanguage(langKey) {
            return runtimelocale.setLang(langKey).then(function () {
                window.moment.locale(langKey);
                return $translate.use(langKey);
            }).then($translate.refresh)
                .then(function () {
                    $rootScope.$broadcast('common.services.globalization.globalizationService.setLanguage');
                    logger.logInfo('Current language:', langKey, 'Globalization Service');
                });
        }

        /**
         * @ngdoc method
         * @name common.services.globalization.globalizationService#setAppLanguage
         * @param {String} langKey An RFC5646 complaint language code (for example, en-US or it-IT).
         *
         * @description
         * Sets the required currently used locale language temporarily within the application.
         * @deprecated Use the {@link common.services.globalization.globalizationService#setLanguage setLanguage} method instead.
         *
         */
        function setAppLanguage(langKey) {
            appLanguage = langKey;

        }


        /**
         * @ngdoc method
         * @name common.services.globalization.globalizationService#getAppLanguage
         * @returns {String} Currently used language, which is temporarily stored within the application.
         *
         * @description
         * Returns the currently used language within the application.
         * @deprecated Use the {@link common.services.globalization.globalizationService#getLocale getLocale} method instead.
         *
         */
        function getAppLanguage() {
            return appLanguage;
        }

        /**
         * @ngdoc method
         * @name common.services.globalization.globalizationService#setFallbackLanguage
         * @param {String} langKey An RFC5646 complaint language code (for example, en-US or it-IT).
         *
         * @description
         * Sets the required fallback language. If a translation in not found, the language specified here will be used at runtime.
         *
         * @example
         * ```
         common.services.globalization.globalizationService.setFallbackLanguage("it-IT")
         ```
         *
         */

        function setFallbackLanguage(langKey) {
            globalizationConfig.setFallbackLanguage(langKey);
        }

        /**
         * @ngdoc method
         * @name common.services.globalization.globalizationService#setResourcePath
         * @param {String} path The relative path of the JSON resource file (for example: 'common/resources/').
         * @param {Object[]} parts An array of objects, each containing a property "name" that corresponds to the resource part identifier of the JSON file name used for
         * translations.(example: if the file is named custom-widget.it-IT.json, the property name will be custom-widget).
         * The name of each JSON file will be composed as follows: {path}/{part}.{language}.json (example: resources/custom-widget.it-IT.json)
         * @returns {Promise} A promise object that is resolved if the operation completes successfully.
         * @description
         * Registers a JSON resource file path.
         *
         */
        function setResourcePath(path, parts) {

            var deferred = $q.defer();
            globalizationConfig.setResourcePath(path, parts);
            deferred.resolve();

            // 13299 - not used
            //var enableGlobalizationDebug = (logger.getCurrentLogLevel() === LOG_LEVELS.LOG_VERBOSE);
            //var promises = [];
            //var checkedParts = [];
            //    $q.all(promises).then(function (data) {
            //        checkedParts = _.filter(data, function (item) {
            //            return typeof (item) !== 'undefined';
            //        });
            //        globalizationConfig.setResourcePath(path, checkedParts);

            //        deferred.resolve();
            //    }, function (reason) {

            //        deferred.reject(reason);
            //    });

            //} else {
            return deferred.promise;
        }

        //private method
        function cacheTranslations(localhostPath) {
            var deferred = $q.defer();

            if (!config.masterApp) {
                deferred.resolve();
                return deferred.promise;
            }

            var APPRESOURCEPATH = localhostPath + config.masterApp + '/resources/common.en-US.json';
            $http({ method: 'GET', url: APPRESOURCEPATH }).then(function () {
                deferred.resolve();
            }).catch(function () {
                var cache = $cacheFactory.get('$http');
                $http.defaults.cache = true;
                APPRESOURCEPATH = localhostPath + 'common/resources/common.en-US.json';
                $http({ method: 'GET', url: APPRESOURCEPATH }).then(function (data) {
                    cache.put(localhostPath + config.masterApp + '/resources/common.en-US.json', data.data);
                    deferred.resolve();
                }).catch(function (reason, status) {
                    var msg = (status) ? 'Error (' + status + ')' : 'Error';
                    logger.logError(msg, 'common.services.globalization.globalizationService');
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }

        /**
        * @ngdoc method
        * @name common.services.globalization.globalizationService#appResourceLoadingSuccess
        * @access internal
        * @description
        * Sets the default cache false when the resource files are loaded.
        */
        function appResourceLoadingSuccess() {
            $http.defaults.cache = false;
        }

        /**
        * @ngdoc method
        * @name common.services.globalization.globalizationService#loadAppResource
        * @access internal
        * @param {String} localhostPath The base path for the localhost.
        * @returns {Promise} A promise object that is resolved if the operation completes successfully.
        *
        * @description
        * Reads the entire resources.json file in the App resources folder and then loads these resource files.
        */
        function loadAppResource(localhostPath) {
            var files;
            var deferred = $q.defer();
            var resources = [];

            //cache transaltions from ui framework
            cacheTranslations(localhostPath).then(function () {

                //load ui framework from master app
                if (config.masterApp) {
                    resources.push({ path: localhostPath + config.masterApp + '/resources/', modules: [{ name: 'common' }] })
                }

                if (!config.dependencies || !config.dependencies.length) {
                    deferred.resolve(resources);
                }
                else {//read resources from all dependencies
                    var dependencyLen = config.dependencies.length;

                    config.dependencies.forEach(function (dependency) {
                        $http({ method: 'GET', url: localhostPath + dependency + '/resources/resources.json' }).then(function (data) {
                            files = data.data;
                            var modules = [];
                            for (var key in files) {
                                if (files.hasOwnProperty(key) && key !== 'common') {
                                    modules.push({ name: files[key] });
                                }
                            }
                            resources.push({ path: localhostPath + dependency + '/resources/', modules: modules });
                            dependencyLen--;
                            if (dependencyLen === 0) {
                                deferred.resolve(resources);
                            }
                        }, function () {
                            dependencyLen--;
                            if (dependencyLen === 0) {
                                deferred.resolve(resources);
                            }
                        });
                    });
                }
            });
            return deferred.promise;
        }


        /**
       * @ngdoc method
       * @name common.services.globalization.globalizationService#getLanguages
       * @returns {Array} An array of languages that the UI Application currently supports.
       * @description
       * Gets the list of supported languages that are specified in the UI Application configuration.
       */
        function getLanguages() {
            return config.languages.slice(0);
        }

        // added at the end because jshint fails when added at the top
        this.getLocale = getLocale;
        this.setLanguage = setLanguage;
        this.setFallbackLanguage = setFallbackLanguage;
        this.setResourcePath = setResourcePath;
        this.setAppLanguage = setAppLanguage;
        this.getAppLanguage = getAppLanguage;
        this.getSupportedLocales = getSupportedLocales;
        this.loadAppResource = loadAppResource;
        this.getLanguages = getLanguages;
        this.appResourceLoadingSuccess = appResourceLoadingSuccess;
    }

    /**
     * @ngdoc service
     * @name common.services.globalization.globalizationService
     * @module siemens.simaticit.common.services.globalization
     * @requires $http
     * @requires $q
     * @requires $translate $translate service
     * @requires common.services.logger.service
     * @requires LOG_LEVELS
     *
     * @description
     * Service that exposes a set of methods that can be used to manage localizations and translations.
     */
    angular.module('siemens.simaticit.common.services.globalization').service('common.services.globalization.globalizationService',
        ['$rootScope', '$http', '$q', '$translate', '$cacheFactory', 'common.globalization.globalizationConfig', 'common.services.globalization.runtimelocale',
            'common.services.logger.service', 'CONFIG', 'APPCONFIG', 'LOG_LEVELS', globalizationService]);



})();

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name pluralize
     * @module siemens.simaticit.common.services.globalization
     *
     * @restrict E
     *
     * @description
     * A directive that makes it possible to make a translated string plural when required.
     * @param {Object} count The number of objects to be considered in the translation.
     * @param {Object} zero The string to used when the **count** is zero.
     * @param {Object} one The string to be used when there is only one object.
     * @param {Object} other The string to be used when there is more than one object.
     * @example
     * The following example shows how to use the **pluralize** directive :
     * ```
     * <pluralize count="{{ vm.count }}" zero="vm.material.zero" one="vm.material.one" other="vm.material.other" />
     * ```
     *
     */

    angular.module('siemens.simaticit.common.services.globalization').directive('pluralize', function () {

        PluralizeController.$inject = ['$scope', '$attrs'];
        function PluralizeController(scope, attrs) {
            var vm = this;
            var coutWatchUnbind = scope.$watch(function () { return vm.count; }, function (num) {
                num = parseInt(num, 10);
                vm.numValue = {
                    value: num
                };

                var countValue;

                if (num === 0) {
                    countValue = 'zero';
                }
                if (num === 1) {
                    countValue = 'one';
                }
                if (num > 1) {
                    countValue = 'other';
                }

                switch (countValue) {
                    case 'zero':
                        vm.translateString = attrs.zero;
                        break;
                    case 'one':
                        vm.translateString = attrs.one;
                        break;
                    case 'other':
                        vm.translateString = attrs.other;
                        break;
                    default:
                        vm.translateString = attrs.zero;
                        break;
                }

            });

            scope.$on('$destroy', function () {
                coutWatchUnbind();
            });
        }

        return {
            restrict: 'E',
            scope: true,
            bindToController: { count: '@', zero: '@', one: '@', other: '@' },
            controller: PluralizeController,
            controllerAs: 'pluralizeCtrl',
            template: '<div>{{ pluralizeCtrl.translateString | translate: pluralizeCtrl.numValue }}</div>',
            replace: true,
            link: function () { }
        };

    });
})();

(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @name common.services.globalization.runtimelocaleProvider
     * @module siemens.simaticit.common.services.globalization
     * @access internal
     * @description
     * Provides a service that can be used to change the locale script file dynamically.
     * @requires $rootScope
     * @requires $injector
     * @requires $interpolate
     * @requires $locale
     * @requires $q
     * @requires $timeout
     */
    angular.module('siemens.simaticit.common.services.globalization').provider('common.services.globalization.runtimelocale', function () {

        function getLocale(value) {
            return value.split('_').join('-').toLowerCase();
        }

        function overrideValues(oldObject, newObject, activeLocale, localeId) {
            if (activeLocale !== localeId) {
                return;
            }

            angular.forEach(oldObject, function (value, key) {
                if (!newObject[key]) {
                    delete oldObject[key];
                } else if (angular.isArray(newObject[key])) {
                    oldObject[key].length = newObject[key].length;
                }
            });
            angular.forEach(newObject, function (value, key) {
                if (angular.isArray(newObject[key]) || angular.isObject(newObject[key])) {
                    if (!oldObject[key]) {
                        oldObject[key] = angular.isArray(newObject[key]) ? [] : {};
                    }
                    overrideValues(oldObject[key], newObject[key], activeLocale, localeId);
                } else {
                    oldObject[key] = newObject[key];
                }
            });
        }

        function updateHtmlBody(url, onSuccess, onError, $timeout) {
            var script = window.document.createElement('script');
            var body = window.document.getElementsByTagName('body')[0];
            var removed = false;

            script.type = 'text/javascript';
            if (script.readyState) { // browser IE
                script.onreadystatechange = function () {
                    if (script.readyState === 'complete' ||
                        script.readyState === 'loaded') {
                        script.onreadystatechange = null;
                        $timeout(
                          function () {
                              if (removed) {
                                  return;
                              }
                              removed = true;
                              body.removeChild(script);
                              onSuccess();
                          }, 30, false);
                    }
                };
            } else { // Others browser
                script.onload = function () {
                    if (removed) {
                        return;
                    }
                    removed = true;
                    body.removeChild(script);
                    onSuccess();
                };
                script.onerror = function () {
                    if (removed) {
                        return;
                    }
                    removed = true;
                    body.removeChild(script);
                    onError();
                };
            }
            script.src = url;
            script.async = false;
            body.appendChild(script);
        }

        function loadLocaleScript($rootScope, $q, $timeout, $locale, $interpolate, localeId, localeUrl, localeCache, storage, storeKey) {

            var cachedLocale;
            var deferred = $q.defer();
            var promiseCache = {};
            var activeLocale;

            //updateHtmlBody function success callback
            function onSuccess() {
                var localInjector = angular.injector(['ngLocale']);
                var externalLocale = localInjector.get('$locale');

                overrideValues($locale, externalLocale, activeLocale, localeId);
                localeCache.put(localeId, externalLocale);
                delete promiseCache[localeId];

                $rootScope.$apply(function () {
                    $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
                    storage.put(storeKey, localeId);
                    deferred.resolve($locale);
                });
            }

            function onLocaleNotFound() {
                var url = 'common/scripts/i18n/angular-locale_{{locale}}.js';
                var localeLocation = $interpolate(url);
                updateHtmlBody(localeLocation({ locale: localeId }), onSuccess, onError, $timeout);
            }

            //updateHtmlBody function error callback
            function onError() {
                delete promiseCache[localeId];
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('$localeChangeError', localeId);
                    deferred.reject(localeId);
                });
            }

            if (promiseCache[localeId]) {
                return promiseCache[localeId];
            }

            if (localeId === activeLocale) {
                deferred.resolve($locale);
            } else if ((cachedLocale = localeCache.get(localeId))) {
                activeLocale = localeId;
                $rootScope.$evalAsync(function () {
                    overrideValues($locale, cachedLocale, activeLocale, localeId);
                    $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
                    storage.put(storeKey, localeId);
                    deferred.resolve($locale);
                });
            } else {
                activeLocale = localeId;
                promiseCache[localeId] = deferred.promise;

                updateHtmlBody(localeUrl, onSuccess, onLocaleNotFound, $timeout);
            }
            return deferred.promise;
        }

        this.$get = ['$rootScope', '$injector', '$interpolate', '$locale', '$q', '$timeout', 'common.services.globalization.runtimelocaleStorageCache', 'CONFIG',
            function ($rootScope, $injector, $interpolate, $locale, $q, $timeout, runtimelocaleStorageCache, CONFIG) {

                var LOCALELOCATIONPATH = '';
                var STOREKEY = 'runtimelocale.locale';
                if (CONFIG.masterApp) {
                    LOCALELOCATIONPATH = CONFIG.masterApp + '/locales/angular-locale_{{locale}}.js';
                }
                else {
                    LOCALELOCATIONPATH = 'common/scripts/i18n/angular-locale_{{locale}}.js';
                }
                var localeLocation = $interpolate(LOCALELOCATIONPATH);
                var storage = $injector.get('common.services.globalization.runtimelocaleStorageCache');

                return {

                    setLang: function (value) {
                        var localValue = getLocale(value);

                        return loadLocaleScript($rootScope,
                                                $q,
                                                $timeout,
                                                $locale,
                                                $interpolate,
                                                localValue,
                                                localeLocation({ locale: localValue }),
                                                runtimelocaleStorageCache,
                                                storage,
                                                STOREKEY);
                    }
                };
            }];
    });

    /**
     * @ngdoc service
     * @name common.services.globalization.runtimelocale
     * @module siemens.simaticit.common.services.globalization
     * @access internal
     * @description
     * Provides a service that can be used to change the locale script file dynamically.
     */

    /**
    * @ngdoc provider
    * @name common.services.globalization.runtimelocaleStorageCacheProvider
    * @module siemens.simaticit.common.services.globalization
    * @access internal
    * @description
    * Returns the **runtimeLocale** store cache.
    * @requires $cacheFactory
    */

    /**
  * @ngdoc service
  * @name common.services.globalization.runtimelocaleStorageCache
  * @module siemens.simaticit.common.services.globalization
  * @access internal
  * @description
  * Returns the **runtimeLocale** store cache.
  */
    angular.module('siemens.simaticit.common.services.globalization').provider('common.services.globalization.runtimelocaleStorageCache', function () {
        this.$get = ['$cacheFactory', function ($cacheFactory) {
            return $cacheFactory('runtimelocales.store');
        }];
    });

})();
