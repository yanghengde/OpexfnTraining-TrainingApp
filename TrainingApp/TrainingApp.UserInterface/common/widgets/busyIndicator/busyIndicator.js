/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.busyIndicator
    *
    * @description This module allows the client to show busy indicator on any element during an **$http** request or **$promise** request.
    */

    angular.module('siemens.simaticit.common.widgets.busyIndicator', []);

})();

/*jshint -W098 */
(function () {
    'use strict';

    /**
    * @ngdoc directive
    * @access internal
    * @name sitBusyIndicator
    * @module siemens.simaticit.common.widgets.busyIndicator
    * @description
    * The **Busy Indicator** widget displays a busy indication when a background operation is in progress.
    * The following are a few scenarios where the **Busy Indicator** can be used:
    * * When the client makes an **$http** request or a **$promise** request.
    * * When a time consuming operation is been executed in the background.
    *
    * @usage
    * As an element:
    * ```
    *     <sit-busy-indicator
                       sit-message='message'
                       sit-icon='icon'
                       sit-svg-icon='cmd8DReport24'
                       sit-delay='delay'></sit-busy-indicator>
    * ```
    * @restrict E
    *
    * @param {string} message Message to be displayed in the **Busy** indicator.
    * @param {string} sit-svg-icon The SVG icon to be used as the **Busy** icon.
    * @param {string} sit-indicator-icon The indicator icon to be used as the **Busy** icon.This is used only if svg icon is not provided.
    * @param {string} icon The **Font Awesome** icon to be used as the **Busy** icon.[Deprecated]
    * @param {numeric} delay The time (in milliseconds) duration for the **Busy Indicator** to appear.The default value is 500ms.
    *
    *
    * @example
	* In a view template, the **sit-busy-indicator** directive is used as follows:
	*
	* ```
	* <sit-busy-indicator sit-message='message' sit-icon='icon' sit-delay='delay'></sit-busy-indicator>
    * ```
    * The following example shows how to expose a message, icon, and delay options.
    *
    *
    * * message:
    * ```
    * this.message = 'Please wait...'
    * ```
    *
    * * icon:
    * ```
    * this.icon = 'fa-circle-o-notch'
    * ```
    *
    * * delay:
    * ```
    * this.delay = 2000;
    *```
    *
    * To show the **Busy Indicator** , the **showIndicator** method (view controller method) must
    * call the **show** method provided by the **busyIndicator.service** service as shown below:
    * ```
    * this.showIndicator = function () {
    *        busyIndicatorService.show(options);
    * }
    * ```
    * The options supported by **show** method are as follows:
    * * **message:** contains the message to be shown with the **Busy** indicator (default value: **Loading...**).
    * * **icon:** the **Font Awesome** icon used for the **Busy** indicator (default value: **fa-circle-o-notch**).
    * * **delay:** contains the time (in milliseconds) the **Busy** indicator must appear on the screen (default value: **0**).
    *
    * The following example shows the supported **options** with their respective configuration:
    *```
    * var options = { message:"Please wait loading...", delay: 3000,  icon:'fa-circle-o-notch' };
    *```
    * **options** with only **message** configuration:
    *```
    * var options = { message:"Please wait loading..."};
    *```
    * **options** with only **delay** configuration:
    *```
    * var options = { delay: 3000};
    *```
    * **options** with only **icon** configuration:
    *```
    * var options = { icon:'fa-circle-o-notch'};
    *```
    * **Note:** The **show** method provided by the **busyIndicator.service** takes the default values if no **options** are provided.
    *
    * To close the **Busy Indicator**, the **hideIndicator** method  (view controller method) must
    * call the **hide** method provided by the **busyIndicator.service** as shown below:
    * ```
    * this.hideIndicator = function () {
    *        busyIndicatorService.hide();
    * }
    * ```
    *
    */
    function sitBusyIndicator($timeout, busyIndicatorService) {
        return {
            templateUrl: 'common/widgets/busyIndicator/busy-indicator.html',
            replace: true,
            scope: {},
            controller: BusyIndicatorController,
            controllerAs: 'busyCtrl',
            bindToController: {
                message: '=sitMessage',
                svgIcon: '=?sitSvgIcon',
                indicatorIcon: '=?sitIndicatorIcon',
                delay: '=sitDelay'
            },
            link: function (scope, element, attrs, ctrl) {
                var timer;
                function show(args) {
                    ctrl.displayIcon = null;
                    if (undefined === args) {
                        ctrl.setOptionsDefault();
                    } else {
                        ctrl.message = args.message || ctrl.defaultOptions.message;
                        ctrl.icon = args.icon || ctrl.defaultOptions.icon;
                        ctrl.delay = args.delay || ctrl.defaultOptions.delay;
                        ctrl.svgIcon = args.svgIcon || ctrl.defaultOptions.svgIcon;//need to provide a default in V3.0
                        ctrl.indicatorIcon = args.indicatorIcon || ctrl.defaultOptions.indicatorIcon;//need to provide a default in V3.0
                        ctrl.setDisplayIcon();
                    }
                    if (ctrl.delay > 0) {
                        timer = $timeout(function () {
                            element.modal('show');
                        }, ctrl.delay);
                    } else {
                        element.modal('show');
                    }
                }

                function hide() {
                    $timeout.cancel(timer);
                    element.modal('hide');
                    ctrl.setOptionsDefault();
                }

                scope.$on('$destroy', function () {
                    $timeout.cancel(timer);
                });

                busyIndicatorService.registerShowCallback(show);
                busyIndicatorService.registerHideCallback(hide);

            }
        };
    }

    BusyIndicatorController.$inject = ['$translate', '$rootScope'];
    function BusyIndicatorController($translate, $rootScope) {
        //Providing default values to the directive
        var vm = this;
        activate();

        function activate() {
            vm.message = vm.message;
            vm.delay = vm.delay || 500;

            vm.defaultOptions = {
                message: vm.message,
                icon: vm.icon,
                delay: vm.delay,
                svgIcon: vm.svgIcon,
                indicatorIcon: vm.indicatorIcon
            };
            vm.setOptionsDefault = setOptionsDefault;
            vm.setDisplayIcon = setDisplayIcon;
        }

        function setOptionsDefault() {
            vm.message = vm.defaultOptions.message;
            vm.icon = vm.defaultOptions.icon;
            vm.delay = vm.defaultOptions.delay;
            vm.svgIcon = vm.defaultOptions.svgIcon;
            vm.indicatorIcon = vm.defaultOptions.indicatorIcon;
            setDisplayIcon();
        }

        function setDisplayIcon() {
            if (vm.svgIcon) {
                vm.displayIcon = "common/icons/" + vm.svgIcon + ".svg";
            } else if (vm.indicatorIcon) {
                vm.displayIcon = "common/icons/indicator" + vm.indicatorIcon + '16.svg';
            } else {
                vm.displayIcon = "common/icons/grahCircleLoader80R.SVG";
            }
        }
        var onStateChangeSuccess = $rootScope.$on('siemens.simaticit.common.stateChangeSuccess', stateChangeSuccess);

        function stateChangeSuccess(state, data) {
            if (data.fromState.name === 'home') {
                $rootScope.globalBusyIndicator.message = vm.message || $translate.instant('common.busy-message.loading')
                onStateChangeSuccess();
            }
        }
    }

    angular.module('siemens.simaticit.common.widgets.busyIndicator').
        directive('sitBusyIndicator', ['$timeout', 'common.widgets.busyIndicator.service', sitBusyIndicator]);
})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
        * @ngdoc service
        * @name common.widgets.busyIndicator.service
        * @module siemens.simaticit.common.widgets.busyIndicator
        *
        * @description
        * Contains presentation service to show or hide a **Busy** indicator.
        *
        * @example
        * In a controller, the **common.widgets.busyIndicator.service** is used as follows:
        *
        * ```
        * (function () {
        * 'use strict';
        *
        *  var app = angular.module('myModule');
        *
        *  var busyIndicatorCtrl = 'busyIndicatorCtrl';
        *
        *  function busyIndicatorController(busyIndicatorService) {
        *       busyIndicatorService.show({ delay: 10 });
        *       busyIndicatorService.hide();
        *   app.controller(busyIndicatorCtrl, ['common.widgets.busyIndicator.service',busyIndicatorController]);
        * })();
        *
        *
        * ```
        */
        var BusyIndicatorService = /** @class */ (function () {
            function BusyIndicatorService(swacUiModuleManager) {
                this.swacUiModuleManager = swacUiModuleManager;
                this.busyIndicatorCount = 0;
                this.showCallbacks = [];
                this.hideCallbacks = [];
            }
            /**
            * @ngdoc method
            * @name common.widgets.busyIndicator.service#show
            * @module siemens.simaticit.common.widgets.busyIndicator
            * @description
            * To show the **Busy Indicator** , the **showIndicator** method (view controller method) must
            * call the **show** method provided by the **common.widgets.busyIndicator.service** service as shown below:
            * ```
            * this.showIndicator = function () {
            *        busyIndicatorService.show(options);
            * }
            * ```
            *
            * @param {Object} data
            * * **message:** contains the message to be shown with the **Busy** indicator (default value: **Loading...**).
            *
            * * **icon:** the **Font Awesome** icon used for the **Busy** indicator (default value: **fa-spinner**).
            *
            * * **delay:** contains the time (in milliseconds) the **Busy** indicator must appear on the screen (default value: **0**).
            *
            */
            BusyIndicatorService.prototype.show = function (data) {
                if (this.swacUiModuleManager.enabled) {
                    this.swacUiModuleManager.busyServicePromise.promise.then(function (service) {
                        if (data !== undefined && data.message !== undefined) {
                            service.show(data.message);
                        }
                        else {
                            service.show();
                        }
                    });
                }
                else {
                    if (this.busyIndicatorCount === 0) {
                        this.showCallbacks.forEach(function (fnCallback) {
                            fnCallback(data);
                        });
                    }
                    this.busyIndicatorCount++;
                }
                //if (this.busyIndicatorCount === 0) {
                //    this.showCallbacks.forEach(function (fnCallback) {
                //        fnCallback(data);
                //    });
                //}
                //this.busyIndicatorCount++;
            };
            /**
            * @ngdoc method
            * @name common.widgets.busyIndicator.service#hide
            * @module siemens.simaticit.common.widgets.busyIndicator
            * @description
            * To hide the **Busy Indicator**, the **hideIndicator** method  (view controller method) must
            * call the **hide** method provided by the **common.widgets.busyIndicator.service** as shown below:
            * ```
            * this.hideIndicator = function () {
            *        busyIndicatorService.hide();
            * }
            * ```
            *
            */
            BusyIndicatorService.prototype.hide = function () {
                if (this.swacUiModuleManager.enabled) {
                    this.swacUiModuleManager.busyServicePromise.promise.then(function (service) {
                        service.hide();
                    });
                }
                else {
                    if (this.busyIndicatorCount > 0) {
                        this.busyIndicatorCount--;
                    }
                    if (this.busyIndicatorCount <= 0) {
                        this.hideCallbacks.forEach(function (fnCallback) {
                            fnCallback();
                        });
                    }
                }
            };
            BusyIndicatorService.prototype.registerShowCallback = function (fnCallback) {
                if (fnCallback) {
                    this.showCallbacks.push(fnCallback);
                }
            };
            BusyIndicatorService.prototype.registerHideCallback = function (fnCallback) {
                if (fnCallback) {
                    this.hideCallbacks.push(fnCallback);
                }
            };
            BusyIndicatorService.$inject = ['common.services.swac.SwacUiModuleManager'];
            return BusyIndicatorService;
        }());
        framework.BusyIndicatorService = BusyIndicatorService;
        angular
            .module('siemens.simaticit.common.widgets.busyIndicator')
            .service('common.widgets.busyIndicator.service', BusyIndicatorService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
// jshint ignore: end
//# sourceMappingURL=sit-busy-indicator-svc.js.map