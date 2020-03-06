/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.nervebox
     * @description
     * This module provides functionalities related to the **nervebox** widget.
     */
    angular.module('siemens.simaticit.common.widgets.nervebox', []);
    angular.module('siemens.simaticit.common.services.nervebox', []);
})();

/* SIMATIC IT Unified Architecture Foundation V2.4 | Copyright (C) Siemens AG 2018. All Rights Reserved. */
(function () {

    /**
* @ngdoc directive
* @name sitNervebox
* @access internal
* @module siemens.simaticit.common.widgets.nervebox
* @description
* Displays a nervebox for license control.
*
* @usage
* As an element:
* ```
*     <sit-nervebox sit-options="vm.options"> </sit-nervebox>
* ```
* @restrict E
*
* @param {Object} sit-options _(Optional)_ Specifies the items to be override default behavior. Each item is an object containing following fields:
* * **position**: Default position of the message box to be display on start-up and repoen.
*                 Possible values are constand string as `RIGHT_BOTTOM`, `RIGHT_TOP`, `LEFT_BOTTOM`, `LEFT_TOP` or an object with left and top values `{left: 100, top : 100}`
* * **title**: The string language translate value for the message title. Default is `nerveBox.title`
* * **message**: The string language translate value for the message. Default is an empty string.
* * **pollingInterval**: The interval value in milliseconds to send polling request to the server for license varification. Default is `60000`
* * **displayInterval**: The interval value in milliseconds to display when user closes the message. Default is `2000`
* * **boundaryPadding**: The boundry value to prevent message box to stay when drag and move. Default is `32 from bottom and 16 from right`
* * **height**: The height value of message box. Default is `112`
* * **width**: The width value of message box. Default is `480`
*
*
* @example
* In a view template, the **sit-nervebox** directive is used as follows:
*
* ```
*     <sit-nervebox> </sit-nervebox>

* ```
*
*/

    angular.module('siemens.simaticit.common.widgets.nervebox')
        .directive('sitNervebox', NerveBoxDirective);

    NerveBoxDirective.$inject = ['$window', '$timeout', '$rootScope', 'common.services.nerveBoxService'];
    function NerveBoxDirective($window, $timeout, $rootScope, nerveBoxService) {
        return {
            restrict: 'E',
            scope: true,
            controller: ['$translate', 'common.services.nerveBoxDataService', function ($translate, nerveBoxDataService) {
                var vm = this;
                this.DEFAULT_OPTIONS = {
                    position: 'RIGHT_BOTTOM', // {left: 100, top : 100}
                    title: '',
                    message: '',
                    pollingInterval: (10 * 60 * 1000),
                    displayInterval: (5 * 60 * 1000),
                    boundaryPadding: { x: 16, y: 32 },
                    height: 112,
                    width: 480
                }
                this.close = function () {
                    nerveBoxService.close();
                }
                function activate(vm) {
                    vm.options = angular.extend(vm.options || {}, vm.DEFAULT_OPTIONS);
                }
                activate(this);
            }],
            controllerAs: 'nerveBoxCtrl',
            replace: true,
            bindToController: {
                options: '=?'
            },
            template:
                ' <div id="nerve-box" class="nerve-box" style="display:none" ng-style="{height: nerveBoxCtrl.options.height, width: nerveBoxCtrl.options.width}">' +
                '     <div class="header">' +
                '         <div class="title">' +
                '             {{nerveBoxCtrl.options.title}}' +
                '         </div>' +
                '         <div class="close-btn" ng-click="nerveBoxCtrl.close()">' +
                '             <span><img src="common/icons/cmdClosePanel24.svg" / height="16px"></span>' +
                '         </div>' +
                '     </div>' +
                '     <div class="body">' +
                '     {{ nerveBoxCtrl.options.message }}' +
                '     </div>' +
                ' </div>',
            link: function (scope, domElement, attr, ctrl) {
                var element = domElement.get(0);
                var titleElement = element.querySelector(".header .title");
                var padding = ctrl.options.boundaryPadding;
                var appWindow = angular.element($window);
                function dragElement(titleElement, element) {
                    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                    titleElement.onmousedown = dragMouseDown;

                    function dragMouseDown(e) {
                        e = e || window.event;
                        e.preventDefault();
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.onmouseup = closeDragElement;
                        document.onmousemove = elementDrag;
                    }

                    function elementDrag(e) {
                        e = e || window.event;
                        e.preventDefault();
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        var top = element.offsetTop - pos2;
                        var left = element.offsetLeft - pos1;
                        var maxRange = getMaxBounderies(element, padding);
                        var minRange = getMinBounderies(padding);
                        //top lower range
                        top = top <= minRange.top ? minRange.top : top;
                        //left lower range
                        left = left <= minRange.left ? minRange.left : left;
                        //top upprer tange
                        top = top >= maxRange.top ? maxRange.top : top;
                        //left upprer tange
                        left = left >= maxRange.left ? maxRange.left : left;

                        element.style.top = top + "px";
                        element.style.left = left + "px";
                    }

                    function closeDragElement() {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
                    return {
                        cancel: closeDragElement
                    }
                }

                function getMaxBounderies(element, padding) {
                    return {
                        left: window.innerWidth - element.offsetWidth - padding.x,
                        top: window.innerHeight - element.offsetHeight - padding.y
                    };
                }

                function getMinBounderies(padding) {
                    return {
                        left: padding.x,
                        top: padding.y
                    };
                }

                function setPosition(element, pos, padding) {
                    var max = getMaxBounderies(element, padding);
                    var min = getMinBounderies(padding);
                    switch (pos) {
                        case 'LEFT_TOP':
                            element.style.top = min.top + 'px';
                            element.style.left = min.left + 'px';
                            break;
                        case 'RIGHT_TOP':
                            element.style.top = min.top + 'px';
                            element.style.left = max.left + 'px';
                            break;
                        case 'LEFT_BOTTOM':
                            element.style.top = max.top + 'px';
                            element.style.left = min.left + 'px';
                            break;
                        case 'RIGHT_BOTTOM':
                            element.style.top = max.top + 'px';
                            element.style.left = max.left + 'px';
                            break;
                        default:
                            if (pos && pos.left && pos.top) {
                                element.style.top = pos.top + 'px';
                                element.style.left = pos.left + 'px';
                            }
                    }
                }


                function nerveboxStartupServiceStartEventCallback() {
                    nerveBoxService.start(ctrl.options);
                }

                function nerveboxStartupServiceStopEventCallback() {
                    nerveBoxService.stop();
                    ctrl.options.title = '';
                    ctrl.options.message = '';
                }

                function nerveboxServiceUpdateEventCallback(event, data) {
                    ctrl.options.title = data.title;
                    ctrl.options.message = data.message;
                    setPosition(element, ctrl.options.position, padding);
                }

                $rootScope.$on('siemens.simaticit.common.services.nervebox.startup.start', nerveboxStartupServiceStartEventCallback);
                $rootScope.$on('siemens.simaticit.common.services.nervebox.startup.stop', nerveboxStartupServiceStopEventCallback);
                $rootScope.$on('siemens.simaticit.common.services.nervebox.update', nerveboxServiceUpdateEventCallback);

                $timeout(function () {
                    dragElement(titleElement, element);
                });

                appWindow.bind('resize', function () {
                    var max = getMaxBounderies(element, padding);
                    var currentElementPos = element.getBoundingClientRect();
                    var pos = {
                        left: currentElementPos.left,
                        top: currentElementPos.top
                    }
                    if (pos.left >= max.left) {
                        pos.left = max.left;
                    }
                    if (pos.top >= max.top) {
                        pos.top = max.top;
                    }
                    setPosition(element, pos, padding);
                });
            }
        };
    }
})();

/* SIMATIC IT Unified Architecture Foundation V2.4 | Copyright (C) Siemens AG 2018. All Rights Reserved. */
(function () {
    angular.module('siemens.simaticit.common.services.nervebox')
        .service('common.services.nerveBoxDataService', NerveboxDataService)
        .service('common.services.nerveBoxService', NerveboxService)
        .service('common.services.nerveBoxStartupService', NerveboxStartupService);

    /**
    * @ngdoc service
    * @module siemens.simaticit.common.widgets.nervebox
    * @name common.widgets.nerveBoxDataService
    * @access internal
    * @requires $q
    * @requires administrationDataService
    *
    * @description
    * Provides functionality to support nervebox with licensing information.
    */

    NerveboxDataService.$inject = ['$q', 'common.services.administration.data.service'];
    function NerveboxDataService($q, administrationDataService) {

        this.getLicenseStatus = function () {
            var deferred = $q.defer();
            getLicenseStatus().then(function (data) {
                if (data && data.licenseStatusInfo && data.licenseStatusInfo.length) {
                    deferred.resolve(data.licenseStatusInfo[0]);
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }



        function getLicenseStatus() {
            var deferred = $q.defer();
            var command = 'GetLicenseStatusCommand';
            try {
                administrationDataService.invokeAdministrationCommand(command, {}).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });
            } catch (err) {
                deferred.reject(err);
            }
            return deferred.promise;
        }

    }

    /**
    * @ngdoc service
    * @module siemens.simaticit.common.widgets.nervebox
    * @name common.widgets.nerveBoxService
    * @access internal
    *
    * @description
    * Provides functionality to support nervebox with licensing information.
    */

    NerveboxService.$inject = ['$interval', '$translate', '$rootScope', '$q', '$log', 'common.services.nerveBoxDataService'];
    function NerveboxService($interval, $translate, $rootScope, $q, $log, nerveBoxDataService) {
        var id = 'nerve-box';
        var _that = this;

        this.title = '';
        this.message = '';
        this.displayStatus = false;
        this.displayIntervalInstance = null;
        this.pollingIntervalInstance = null;
        Object.defineProperty(this, 'lisenceCheckStatus', {
            set: function (value) {
                this._lisenceCheckStatus = value;
                if (value) {
                    if (!_that.displayIntervalInstance.get())
                        _that.displayIntervalInstance.start(true);
                } else if (!value) {
                    if (_that.displayIntervalInstance.get())
                        _that.displayIntervalInstance.stop();
                    _that.hide();
                }
            },
            get: function () {
                return this._lisenceCheckStatus;
            }
        })

        this.show = function () {
            document.getElementById(id).style.display = 'block';
            _that.displayStatus = true;
        };

        this.hide = function () {
            document.getElementById(id).style.display = 'none';
            _that.displayStatus = false;
        };

        this.close = function () {
            this.hide();
            this.restartDisplayTimer();
        };

        this.interval = function (callback, ticks, name) {
            var intervalPromise;
            function start(runOnce) {
                if (!intervalPromise) {
                    intervalPromise = $interval(callback, ticks);
                    runOnce && callback();
                }
                $log.log('[' + name + ' Interval Object #Start]', { id: intervalPromise.$$intervalId, time: new Date() });
            }
            function stop() {
                $log.log('[' + name + ' Interval Object #Stop]', { id: intervalPromise.$$intervalId, time: new Date() });
                $interval.cancel(intervalPromise);
                intervalPromise = null;
            }
            function get() {
                return intervalPromise;
            }
            return {
                stop: stop,
                start: start,
                get: get
            };
        };

        this.start = function (options) {

            this.pollingIntervalInstance = this.interval(pollingIntervalCallback, options.pollingInterval, 'Polling');
            this.displayIntervalInstance = this.interval(displayIntervalCallback, options.displayInterval, 'Display');
            this.pollingIntervalInstance.start(true);

        };

        this.restartDisplayTimer = function () {
            this.displayIntervalInstance.stop();
            this.displayIntervalInstance.start();
        }

        this.stop = function () {
            this.pollingIntervalInstance.stop();
            this.displayIntervalInstance.stop();
            this.hide();
            this.defer = null;
        };

        function pollingIntervalCallback() {
            $log.log('[Polling Interval Object #Ellapsed]', { id: _that.pollingIntervalInstance.get().$$intervalId, time: new Date() });
            setMessage();
            licenseCheckPromise()
                .then(function (data) {
                    setMessage(data.title, data.message);
                    _that.lisenceCheckStatus = true;
                    $rootScope.$broadcast('siemens.simaticit.common.services.nervebox.update', { title: _that.title, message: _that.message });
                }, function () {
                    setMessage();
                    _that.lisenceCheckStatus = false;
                    $rootScope.$broadcast('siemens.simaticit.common.services.nervebox.update', { title: '', message: '' });
                });
        }

        function displayIntervalCallback() {
            $log.log('[Display Interval Object #Ellapsed]', { id: _that.displayIntervalInstance.get().$$intervalId, time: new Date() });
            if (_that.lisenceCheckStatus) {
                _that.show(_that.title, _that.message);
            }
            else {
                _that.hide();
            }
        }

        function setMessage(title, message) {
            _that.title = $translate.instant(title) || '';
            _that.message = $translate.instant(message) || '';

        }

        function licenseCheckPromise() {
            var defer = $q.defer();
            nerveBoxDataService.getLicenseStatus().then(function (licenseStatusInfo) {
                if (licenseStatusInfo.IsLicenseInvalid) {
                    defer.resolve({ title: licenseStatusInfo.Title, message: licenseStatusInfo.Body });
                    $log.log('[License] Not Available');
                } else {
                    $log.log('[License] Available');
                    defer.reject();
                }
            }, function () {
                $log.log('[License] Error');
                defer.resolve({ title: 'common.nerveBox.generic.title', message: 'common.nerveBox.generic.body' });
            }).catch(function () {
                $log.log('[License] Error');
                defer.resolve({ title: 'common.nerveBox.generic.title', message: 'common.nerveBox.generic.body' });
            });
            return defer.promise;
        }
    }

    NerveboxStartupService.$inject = ['$rootScope'];
    function NerveboxStartupService($rootScope) {
        this.start = function () {
            $rootScope.$broadcast('siemens.simaticit.common.services.nervebox.startup.start');
        };
        this.stop = function () {
            $rootScope.$broadcast('siemens.simaticit.common.services.nervebox.startup.stop');
        };
    }
})();
