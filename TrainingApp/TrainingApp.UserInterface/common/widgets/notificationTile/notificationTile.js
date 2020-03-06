/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.notificationTile
     * @description
     * This module provides functionalities related to the **notificationTile** widget.
     */
    angular.module('siemens.simaticit.common.widgets.notificationTile', ['ui.router.state']);
})();

/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.notificationTile');

    /**
    *   @ngdoc directive
    *   @name sitNotificationTile
    *   @module siemens.simaticit.common.widgets.notificationTile
    *   @restrict AE
    *   @description Displays a notification tile control.
    *   @usage
    *   ```
    *   <div data-sit-notification-tile
             data-sit-tile-title="tileTitle"
             data-sit-tile-content='tileContent'
             data-sit-tile-type='tileType'
             data-sit-tile-counter='tileCounter'
             data-sit-tile-callback='tileClick'
             data-sit-tile-popup='tilePopup'
             id="notificationId"></div>
    *   ```
    *
    *   @param {String} sit-tile-title The title of the notification tile.
    *   @param {String} sit-tile-content The content of the notification tile.
    *   @param {String} sit-tile-type The type of notification tile (**info** or '**warning**).
    *   @param {Numeric} [sit-tile-counter=""] The value of the counter  to display in the corner of the notification tile.
    *   @param {Function} sit-tile-click The name of the function to be called when a notification tile is clicked.
    *   @param {Boolean} sit-tile-popup Specifies whether the pop-up notification is enabled or disabled.
    *   @param {Boolean} [sit-tile-shadow=true] Specifies whether to show a drop shadow around the tile or not.
    *   @param {string} [sit-tile-position="topRight"] The position of the tile(**topCenter**, **topLeft**, **topRight**).
    *   @param {string} [sit-tile-format="normal"] Specifies the format of the tile display (**wide**, **normal**).
    *
    */

    function sitNotificationTile() {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {},
            controller: NotificationTileController,
            controllerAs: 'notificationCtrl',
            bindToController: {
                tileTitle: '=sitTileTitle',
                tileContent: '=sitTileContent',
                tileType: '=sitTileType',
                tileCounter: '=sitTileCounter',
                tileClick: '&sitTileClick',
                tilePopup: '=sitTilePopup',
                tileGlobal: '=sitTileGlobal',
                position: '=?sitTilePosition',
                format: '=?sitTileFormat',
                shadow: '=?sitTileShadow'
            },
            templateUrl: 'common/widgets/notificationTile/notification-tile.html',
            link: function (scope, element, attrs, ctrl) {
                scope.isPropertyContainer = attrs.tilePropertygrid;
                element.data('notificationTileToggle', ctrl.notificationTileToggle);
                element.data('notificationTileShow', ctrl.notificationTileShow);
                element.data('notificationTileHide', ctrl.notificationTileHide);
            }
        };
    }

    NotificationTileController.$inject = ['$scope', '$rootScope', '$element', '$interval', 'common', '$translate', 'LOG_TYPES', 'LOG_LEVELS',
        'common.widgets.notificationTile.globalService'];
    function NotificationTileController($scope, $rootScope, $element, $interval, common, $translate, LOG_TYPES, LOG_LEVELS, notificationTileGlobalService) {

        var tileInitialTop = 8;
        var tileHeight = 128;
        var tileSize = tileHeight;
        var logErrorFn = common.logger.getLogFn('NotificationTile Widget', LOG_TYPES.LOG_WARNING);
        var animationTime = 700;
        var popupInterval = 4000;
        var intervalPromise = null;
        var contentCropLength;
        var vm = this;
        activate();

        function activate() {
            vm.tileIsVisible = false;
            vm.position = (vm.position === undefined) ? 'topRight' : vm.position;
            contentCropLength = (vm.format === 'wide') ? 96 : 144;
            vm.isToCropTitle = (!vm.tileTitle) ? false : vm.tileTitle.length > 22;
            vm.isToCropMessage = (!vm.tileContent) ? false : vm.tileContent.length > contentCropLength;

            vm.cropedTitle = (vm.isToCropTitle && vm.tileTitle) ? vm.tileTitle.substring(0, 22) + "..." : vm.tileTitle;
            vm.cropedContent = (vm.isToCropMessage && vm.tileContent) ? vm.tileContent.substring(0, contentCropLength) + "..." : vm.tileContent;

            vm.popUpCount = 0;

            vm.tileTop = tileInitialTop;
            if ($rootScope.notificationTilePopUpCount === undefined || $rootScope.notificationTilePopUpCount === null) {
                $rootScope.notificationTilePopUpCount = [];
            }
            if (vm.tileGlobal) {
                notificationTileGlobalService.setConfigFunction(setTileOptions);
            }
        }

        function getPopUpCount() {
            var i = 0;
            for (i = 0; i < $rootScope.notificationTilePopUpCount.length; i++) {
                if ($rootScope.notificationTilePopUpCount[i] === null) {
                    $rootScope.notificationTilePopUpCount[i] = i;
                    return i;
                }
            }
            $rootScope.notificationTilePopUpCount.push(i);
            return i;
        }

        function removePopUp(popUpCount) {
            $rootScope.notificationTilePopUpCount[popUpCount] = null;

            var i = 0;
            for (i = 0; i < $rootScope.notificationTilePopUpCount.length; i++) {
                if ($rootScope.notificationTilePopUpCount[i] !== null) {
                    return;
                }
            }
            $rootScope.notificationTilePopUpCount = [];
        }

        function setNotificationPosition() {
            var NOTIFICATION_WIDTH = 248;
            var WARNING_ICON_WIDTH = 24;
            var ADDON_BTN_WIDTH = 10;
            var SELECT_BTN_WIDTH = 5;
            var elePosition = 0;

            if ($(".canvas-ui-view").length) {
                elePosition = $(".canvas-ui-view").offset().left;
            }
            if ($(".side-panel-container").length) {
                elePosition = $(".side-panel-container").offset().left;
            }
            if (elePosition > 0) {
                var inputFieldWidth = $element.parent().parent().children()[0].offsetWidth;
                var inputFieldOffset = $element.parent().parent().children().offset().left;
                var totalAvailableWidth = inputFieldWidth + (inputFieldOffset - elePosition);

                var addonElement = $element.parent().parent().children('div.btn.property-grid-addon-icon');
                var selectElement = $element.parent().parent().children('button');
                if (totalAvailableWidth < NOTIFICATION_WIDTH) {
                    if (addonElement.length) {
                        $element.css('right', 0);
                        $element.css('left', (NOTIFICATION_WIDTH - WARNING_ICON_WIDTH));
                        return;
                    }
                    if (selectElement.length) {
                        $element.css('right', 0);
                        $element.css('left', (NOTIFICATION_WIDTH - WARNING_ICON_WIDTH + ADDON_BTN_WIDTH));
                        return;
                    }
                    $element.css('right', 0);
                    $element.css('left', NOTIFICATION_WIDTH);
                    return;
                }

                if (addonElement.length) {
                    $element.css('left', 0);
                    $element.css('right', -ADDON_BTN_WIDTH);
                    return;
                }
                if (selectElement.length) {
                    $element.css('left', 0);
                    $element.css('right', -SELECT_BTN_WIDTH);
                    return;
                }
                $element.css('left', 0);
                $element.css('right', -ADDON_BTN_WIDTH);
            }
        }

        vm.thisTileClick = function () {

            vm.tileClick();

            vm.notificationTileHide();

            $scope.$emit('sit-notification-tile-clicked', this);
        };

        vm.notificationTileToggle = function () {

            if (!vm.tileIsVisible) {
                vm.notificationTileShow();
            } else {
                vm.notificationTileHide();
            }
        };

        vm.notificationTileShow = function () {
            setNotificationPosition();

            if (vm.tileContent === null) {
                var msg = $translate.instant('Notification.tileNull');
                var data = { 'tileContent': vm.tileContent };
                logErrorFn(msg, data);
            }

            if (vm.tileIsVisible) { return; }

            $scope.$evalAsync(function () { vm.tileIsVisible = true; });

            vm.startInterval();

            if (vm.tilePopup) {
                vm.popUpCount = getPopUpCount();
                vm.tileTop = (vm.isPropertyContainer) ? tileInitialTop : tileInitialTop + (tileSize * vm.popUpCount);
            } else {
                vm.tileTop = 0;
            }
            $element.fadeIn(animationTime);
        };

        vm.notificationTileHide = function () {

            if (!vm.tileIsVisible) { return; }

            if (vm.tilePopup) {
                removePopUp(vm.popUpCount);
            }

            $element.fadeOut(animationTime, function () {
                vm.tileIsVisible = false;
                if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                    $scope.$apply();
                }
            });
        };

        vm.startInterval = function () {
            if (vm.tilePopup) {
                intervalPromise = $interval(function () {
                    vm.notificationTileHide();
                }, popupInterval, 1);
            }
        };

        vm.stpoInterval = function () {
            if (vm.tilePopup) {
                $interval.cancel(intervalPromise);
            }
        };

        $scope.$watch(function () {
            return vm.tileContent;
        }, function () {

            var newValuer;
            if (vm.tileContent) { newValuer = vm.tileContent.length > contentCropLength; }

            if (vm.isToCropMessage !== newValuer && newValuer) {
                var msg = $translate.instant('Notification.tileContentGt120');
                var data = { 'tileContent': vm.tileContent };
                logErrorFn(msg, data);
            }

            vm.isToCropMessage = newValuer;
            vm.cropedContent = vm.isToCropMessage ? vm.tileContent.substring(0, contentCropLength) + "..." : vm.tileContent;
        });

        $scope.$watch(function () {
            return vm.tileTitle;
        },
            function () {
                var newValuer;
                if (vm.tileTitle) { newValuer = vm.tileTitle.length > 22; }

                if (vm.isToCropTitle !== newValuer && newValuer) {
                    var msg = $translate.instant('Notification.tileTitleGt120');
                    var data = { 'tileTitle': vm.tileTitle };
                    logErrorFn(msg, data);
                }

                vm.isToCropTitle = newValuer;
                vm.cropedTitle = vm.isToCropTitle ? vm.tileTitle.substring(0, 22) + "..." : vm.tileTitle;
            });

        function setTileOptions(tileOptions) {
            var isToCropTitle = (!tileOptions.title) ? false : tileOptions.title.length > 22;
            var isToCropMessage = (!tileOptions.content) ? false : tileOptions.content.length > contentCropLength;

            var cropedTitle = (isToCropTitle && tileOptions.title) ? tileOptions.title.substring(0, 22) + "..." : tileOptions.title;
            var cropedContent = (isToCropMessage && tileOptions.content) ? tileOptions.content.substring(0, contentCropLength) + "..." : tileOptions.content;

            vm.cropedContent = cropedContent;
            vm.cropedTitle = cropedTitle;
            vm.tileType = tileOptions.type;
            vm.tileCounter = tileOptions.counter;
            vm.tileClick = tileOptions.clickCallback;
        }
    }
    app.directive('sitNotificationTile', sitNotificationTile);
})();

'use strict';
var siemens;
(function (siemens) {
    var simaticit;
    (function (simaticit) {
        var common;
        (function (common) {
            var widgets;
            (function (widgets) {
                var notificationTile;
                (function (notificationTile) {
                    /**
                     * @ngdoc type
                     * @name NotificationTileOptions
                     * @module siemens.simaticit.common.widgets.notificationTile
                     * @description
                     * Represents the configuration of a {@link sitNotificationTile sit-notification-tile} directive.
                     *
                     * @property {string} [type="info"] The type of the notification tile (**info** or **warning**).
                     * @property {string} title The title of the notification tile.
                     * @property {string} content The content of the notification tile.
                     * @property {Function} clickCallback A function to execute when the notification tile is clicked.
                     * @property {boolean} [popup=true] If set to **true**, the notification tile behaves like popup.
                     * @property {string} [counter=""] The value of the counter  to display in the corner of the notification tile.
                     */
                    /**
                    *  @ngdoc service
                    *  @name common.widgets.notificationTile.globalService
                    *  @module siemens.simaticit.common.widgets.notificationTile
                    *  @description
                    *  This service can be used to manage a global instance of a {@link sitNotificationTile sit-notification-tile} directive, suitable for
                    *  general, application-level notifications.
                    *
                    */
                    var GlobalNotificationService = /** @class */ (function () {
                        function GlobalNotificationService($translate, notificationTileService, swacUiModuleManager) {
                            var _this = this;
                            this.$translate = $translate;
                            this.notificationTileService = notificationTileService;
                            this.swacUiModuleManager = swacUiModuleManager;
                            this.configCallback = [];
                            this.defaults = {
                                type: 'info',
                                title: '',
                                content: '',
                                clickCallback: function () {
                                },
                                popup: 'true',
                                counter: ''
                            };
                            this.debouncedInfo = _.debounce(function (message) {
                                _this.tileOptions.content = message ? message : _this.tileOptions.content;
                                _this.tileOptions.type = 'info';
                                _this.tileOptions.title = _this.tileOptions.title ? _this.tileOptions.title : _this.$translate.instant('Notification.infoTitle');
                                if (_this.swacUiModuleManager.enabled) {
                                    _this.swacUiModuleManager.notificationServicePromise.promise.then(function (service) {
                                        service.show(_this.tileOptions.title, _this.tileOptions.content, { notifyType: _this.tileOptions.type });
                                    });
                                }
                                else {
                                    _this.showNotification();
                                }
                            }, 300, true);
                            this.debouncedWarn = _.debounce(function (message) {
                                _this.tileOptions.content = message ? message : _this.tileOptions.content;
                                _this.tileOptions.type = 'warning';
                                _this.tileOptions.title = _this.tileOptions.title ? _this.tileOptions.title : _this.$translate.instant('Notification.warningTitle');
                                if (_this.swacUiModuleManager.enabled) {
                                    _this.swacUiModuleManager.notificationServicePromise.promise.then(function (service) {
                                        service.show(_this.tileOptions.title, _this.tileOptions.content, { notifyType: _this.tileOptions.type });
                                    });
                                }
                                else {
                                    _this.showNotification();
                                }
                            }, 300, true);
                            this.tileOptions = this.defaults;
                        }
                        /**
                        * @ngdoc method
                        * @name common.widgets.notificationTile.globalService#setConfigFunction
                        * @module siemens.simaticit.common.widgets.notificationTile
                        * @param {Function} configFunction The callback function to execute. When called, a {@link NotificationTileOptions} object is passed as first parameter.
                        * @deprecated This should not be used any further. Any change to notification tile should be done through {@link common.widgets.notificationTile.globalService#setTileOptions setTileOptions} method.
                        * @description
                        * A callback function that can be used to modify the tile options before the notification is displayed.
                        *
                        */
                        GlobalNotificationService.prototype.setConfigFunction = function (configFuntion) {
                            this.configCallback.push(configFuntion);
                        };
                        /**
                        * @ngdoc method
                        * @name common.widgets.notificationTile.globalService#setTileOptions
                        * @module siemens.simaticit.common.widgets.notificationTile
                        *
                        * @description
                        * Configures the global notification tile.
                        *
                        * @param {NotificationTileOptions} tileOptions See {@link NotificationTileOptions}.
                        *
                        */
                        GlobalNotificationService.prototype.setTileOptions = function (tileOptions) {
                            this.tileOptions = this.validateTileOptions(tileOptions);
                        };
                        /**
                        * @ngdoc method
                        * @name common.widgets.notificationTile.globalService#getTileOptions
                        * @module siemens.simaticit.common.widgets.notificationTile
                        *
                        * @description
                        * Retrieves the current configuration of the global notification tile.
                        *
                        * @returns {NotificationTileOptions} See {@link NotificationTileOptions}.
                        *
                        */
                        GlobalNotificationService.prototype.getTileOptions = function () {
                            return this.tileOptions;
                        };
                        /**
                        * @ngdoc method
                        * @name common.widgets.notificationTile.globalService#info
                        * @module siemens.simaticit.common.widgets.notificationTile
                        *
                        * @description
                        * Displays an **info** notification tile containing the specified message.
                        *
                        * @param {string} message The message to be displayed.
                        *
                        */
                        GlobalNotificationService.prototype.info = function (message) {
                            this.debouncedInfo(message);
                        };
                        /**
                       * @ngdoc method
                       * @name common.widgets.notificationTile.globalService#warning
                       * @module siemens.simaticit.common.widgets.notificationTile
                       *
                       * @description
                       * Displays an **warning** notification tile containing the specified message.
                       *
                       * @param {string} message The message to be displayed.
                       *
                       */
                        GlobalNotificationService.prototype.warning = function (message) {
                            this.debouncedWarn(message);
                        };
                        GlobalNotificationService.prototype.showNotification = function () {
                            var self = this;
                            this.configCallback.forEach(function (fnCallback) {
                                fnCallback(self.tileOptions);
                            });
                            this.notificationTileService.shownotificationTile('appLevelNotificationTile');
                        };
                        GlobalNotificationService.prototype.validateTileOptions = function (tileOptions) {
                            if (!tileOptions) {
                                tileOptions = this.defaults;
                                return tileOptions;
                            }
                            tileOptions.type = !tileOptions.type ? this.defaults.type : tileOptions.type;
                            tileOptions.title = !tileOptions.title ? this.defaults.title : tileOptions.title;
                            tileOptions.clickCallback = !tileOptions.clickCallback ? this.defaults.clickCallback : tileOptions.clickCallback;
                            tileOptions.counter = !tileOptions.counter ? this.defaults.counter : tileOptions.counter;
                            tileOptions.popup = this.defaults.popup; // Popup attr should always br true for tile to display at right top of viewport.
                            return tileOptions;
                        };
                        GlobalNotificationService.$inject = ['$translate', 'common.widgets.notificationTile.service', 'common.services.swac.SwacUiModuleManager'];
                        return GlobalNotificationService;
                    }());
                    notificationTile.GlobalNotificationService = GlobalNotificationService;
                    angular
                        .module('siemens.simaticit.common.widgets.notificationTile')
                        .service('common.widgets.notificationTile.globalService', GlobalNotificationService);
                })(notificationTile = widgets.notificationTile || (widgets.notificationTile = {}));
            })(widgets = common.widgets || (common.widgets = {}));
        })(common = simaticit.common || (simaticit.common = {}));
    })(simaticit = siemens.simaticit || (siemens.simaticit = {}));
})(siemens || (siemens = {}));
//# sourceMappingURL=sit-notification-tile-global-svc.js.map
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.notificationTile').service('common.widgets.notificationTile.service', notificationTileService);


    /**
     * @ngdoc service
     * @name common.widgets.notificationTile.service
     * @module siemens.simaticit.common.widgets.notificationTile
     * @description
     * This service exposes methods used to manage a {@link sitNotificationTile sit-notification-tile} directive.
     *
     */
    function notificationTileService() {
        return new NotificationTileManager();
    }

    function NotificationTileManager() { }

    NotificationTileManager.prototype = {

        /**
         * @ngdoc method
         * @name common.widgets.notificationTile.service#shownotificationTile
         * @module siemens.simaticit.common.widgets.notificationTile
         *
         * @description
         * Shows the specified notification tile.
         *
         * @param {id} id Identifier of the {@link sitNotificationTile sit-notification-tile} directive to show.
         */
        shownotificationTile: function (id) {
            $('#' + id).data('notificationTileShow')();
        },

        /**
         * @ngdoc method
         * @name common.widgets.notificationTile.service#hidenotificationTile
         * @module siemens.simaticit.common.widgets.notificationTile
         *
         * @description
         * Hides the specified notification tile.
         *
         * @param {id} id Identifier of the {@link sitNotificationTile sit-notification-tile} directive to hide.
         */
        hidenotificationTile: function (id) {
            $('#' + id).data('notificationTileHide')();
        },

        /*
         * The following method is kept for compatibility reasons.
         */
        toggeNotificationTile: function (id) {
            $('#' + id).data('notificationTileToggle')();
        },
        /**
         * @ngdoc method
         * @name common.widgets.notificationTile.service#toggleNotificationTile
         * @module siemens.simaticit.common.widgets.notificationTile
         *
         * @description
         * Toggles the visibility the specified notification tile.
         *
         * @param {id} id Identifier of the {@link sitNotificationTile sit-notification-tile} directive to show or hide.
         */
        toggleNotificationTile: function (id) {
            $('#' + id).data('notificationTileToggle')();
        }
    };

})();
