/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/*
 * add new states to $stateProvider
 */
(function () {
    'use strict';

    var unityApp = angular.module('siemens.simaticit.common.services.layout');



    unityApp.config(['$stateProvider', function ($stateProvider) {
        var settings = {
            name: 'home.settings',
            url: '/settings',
            views: {
                'Canvas@': {
                    templateUrl: 'common/layout/settings/settings.tpl.html'
                }
            },
            data: {
                title: 'Settings'
            }
        };
        $stateProvider.state(settings);
    }]);


    function settingsCtrl($rootScope, $scope, $filter, CONFIG, APPCONFIG, common, notificationTileService, LOG_LEVELS, loggerConfig, $modal, RESOURCE, THEMES) {
        /*jshint validthis: true */
        var sc = this;
        var config = angular.extend({}, APPCONFIG, CONFIG);
        var settings = common.loadSettings();

        function whileLoading(callback) {
            angular.element('html').addClass('sit-ui-loading');
            callback();
            setTimeout(function () {
                angular.element('html').removeClass('sit-ui-loading');
            }, 1000);
        }

        sc.tiles = [];
        sc.sampleTileData = {
            title: '',
            description: '',
            count: '',
            image: 'sit sit-log',
            selected: false
        };
        sc.tileLayout = { size: 'medium' };
        sc.tileType = {
            theme: 0,
            language: 1,
            log: 2,
            debug: 3
        };


        sc.notificationTileTypes = { warning: 'warning', info: 'info' };
        sc.notificationTile = {
            id: 'settingsNotificationTile',
            title: '',
            content: '',
            type: sc.notificationTileTypes.info,
            counter: '',
            clickCallback: null,
            position: 'bottomRight',
            popup: true
        };

        /*THEMES*/
        //init Themes data
        $rootScope.themes.forEach(function (item, idx) {
            var dataElem = angular.extend({}, sc.sampleTileData, sc.tileLayout, { datatype: sc.tileType.theme });
            dataElem.title = item.name;
            dataElem.description = item.name + ' Theme';
            dataElem.count = idx;
            dataElem.id = item.id;
            if ($rootScope.currentTheme.id === item.id) {
                dataElem.selected = true;
            }
            sc.tiles.push(dataElem);
        });
        sc.isCurrentTheme = function (id) {
            return $rootScope.currentTheme.id === id;
        };

        sc.themeSelected = function (themeId) {
            whileLoading(function () {
                sc.tiles.forEach(function (item) {
                    if (item.id === themeId) {
                        item.selected = true;
                        $rootScope.currentTheme = $rootScope.themes.filter(function (item) {
                            return item.id === themeId;
                        })[0];
                    } else {
                        item.selected = false;
                    }
                });
            });
        };

        /*LANGUAGES*/
        //init languages
        sc.languages = [];
        sc.disableDropdown = false;
        //currentLanguage
        sc.defaultLanguage = common.globalization.getLocale();

        if (!(config && config.languages.indexOf(sc.defaultLanguage) > -1)) {
            sc.defaultLanguage = 'en-US';
        }

        var identity = common.authentication.getIndentity();

        if (identity && identity['urn:language'] && config.languages.indexOf(identity['urn:language']) > -1) {
            sc.defaultLanguage = identity['urn:language'];
        } else if (settings && settings.lang_key && config.languages.indexOf(settings.lang_key) > -1) {
            sc.defaultLanguage = settings.lang_key;
        }

        config.languages.forEach(function (item, idx) {
            var dataElem = angular.extend({}, sc.sampleTileData, sc.tileLayout, { datatype: sc.tileType.language }, { langKey: item });
            dataElem.count = idx;
            dataElem.selected = dataElem.langKey === sc.defaultLanguage;

            if (dataElem.selected) {
                sc.currentLanguage = dataElem.langKey;
            }

            sc.languages.push(dataElem);
        });

        var tempLanguage = common.globalization.getAppLanguage();
        if ('' !== tempLanguage) {
            sc.currentLanguage = tempLanguage;
        } else {
            common.globalization.setAppLanguage(sc.currentLanguage);
        }



        sc.languageSelected = function (itemLanguage) {
            var langKey = itemLanguage;
            sc.currentLanguage = itemLanguage;
            common.globalization.setLanguage(langKey);
            sc.languages.forEach(function (item) {
                if (item.langKey === sc.currentLanguage) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }

            });
            common.globalization.setAppLanguage(itemLanguage);
        };


        /*LOG*/
        sc.loglevel = [];
        Object.keys(LOG_LEVELS).forEach(function (item, idx) {
            var dataElem = angular.extend({}, sc.sampleTileData, sc.tileLayout, { datatype: sc.tileType.log }, { id: item, value: LOG_LEVELS[item] });
            dataElem.count = idx;
            dataElem.selected = LOG_LEVELS[item] === loggerConfig.config.currentLogLevel;

            switch (dataElem.value) {
                case LOG_LEVELS.LOG_NONE:
                    dataElem.description = 'log disabled';
                    dataElem.title = item.substr(4, item.length - 1);
                    break;
                case LOG_LEVELS.LOG_ERROR:
                    dataElem.description = 'log enabled: ERROR';
                    dataElem.title = item.substr(4, item.length - 1);
                    break;
                case LOG_LEVELS.LOG_WARNING:
                    dataElem.description = 'log enabled: ERROR, WARNING ';
                    dataElem.title = item.substr(4, item.length - 1);
                    break;
                case LOG_LEVELS.LOG_DEBUG:
                    dataElem.description = 'log enabled: ERROR, WARNING, DEBUG ';
                    dataElem.title = item.substr(4, item.length - 1);
                    break;
                case LOG_LEVELS.LOG_INFO:
                    dataElem.description = 'log enabled: ERROR, WARNING, DEBUG, INFO ';
                    dataElem.title = item.substr(4, item.length - 1);
                    break;
                case LOG_LEVELS.LOG_VERBOSE:
                    dataElem.description = 'log enabled: ERROR, WARNING, DEBUG, INFO, GENERIC ';
                    dataElem.title = item.substr(4, item.length - 1);
                    break;
                default: break;

            }
            sc.loglevel.push(dataElem);
        });

        sc.logSelected = function (tileContent) {

            loggerConfig.config.currentLogLevel = tileContent.value;

            sc.loglevel.forEach(function (item) {
                item.selected = item.value === loggerConfig.config.currentLogLevel;
            });
        };

        sc.openModal = function (themeId) {
            switch (themeId) {
                case 1:
                    $modal.open({
                        template: '<img class="ui-settings-theme-image" src="common/images/ThemeDark.png">'

                    });
                    break;
                case 0:
                    $modal.open({
                        template: '<img class="ui-settings-theme-image" src="common/images/ThemeLight.png">'
                    });
                    break;
                default: break;
            }
        };

        sc.saveSettings = function () {
            var settings = { 'lang_key': '', 'theme': null, 'logLevel': 0 };
            settings.lang_key = sc.currentLanguage;
            settings.theme = $rootScope.currentTheme;
            settings.logLevel = loggerConfig.config.currentLogLevel;

            common.saveSettings(settings);

            common.globalization.setAppLanguage(sc.currentLanguage);
            sc.notificationTile.title = $filter('translate')('settings.notificationTile.title');
            sc.notificationTile.content = $filter('translate')('settings.notificationTile.saveText');
            notificationTileService.shownotificationTile(sc.notificationTile.id);

        };

        sc.restoreSettings = function () {
            whileLoading(function () {
                common.removeSettings();
                common.shell.setEnvironment(RESOURCE, THEMES);
                settings = null;
                common.shell.setDefaultLanguage(config.languages, settings);
                sc.currentLanguage = common.globalization.getLocale();
                loggerConfig.config.currentLogLevel = LOG_LEVELS.LOG_VERBOSE;
                sc.loglevel.forEach(function (item) {
                    item.selected = item.value === loggerConfig.config.currentLogLevel;
                });
                sc.notificationTile.title = $filter('translate')('settings.notificationTile.title');
                sc.notificationTile.content = $filter('translate')('settings.notificationTile.restoreText');
                notificationTileService.shownotificationTile(sc.notificationTile.id);
            });
        };

        /*Events*/
        $scope.$on('sit-tile.clicked', function (event, tileContent) {
            switch (tileContent.datatype) {
                case sc.tileType.log:
                    sc.logSelected(tileContent);
                    break;
                default: break;
            }
        });


    }

    unityApp.controller('settingsCtrl', ['$rootScope', '$scope', '$filter', 'CONFIG', 'APPCONFIG', 'common', 'common.widgets.notificationTile.service', 'LOG_LEVELS',
        'common.services.logger.config', '$uibModal', 'RESOURCE', 'THEMES', settingsCtrl]);

})();
