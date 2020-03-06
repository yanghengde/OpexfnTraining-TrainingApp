/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.momIcon', []);

})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
         * @ngdoc service
         * @name host.service
         * @module siemens.simaticit.studio
         *
         * @description
         * Service used for host management operations
         *
         */
        var MomIconService = /** @class */ (function () {
            function MomIconService($q) {
                this.$q = $q;
            }
            MomIconService.prototype.getMomIcon = function (iconType, iconName, iconSize) {
                if (iconType === void 0) { iconType = "cmd"; }
                return "common/icons/" + iconType + iconName + iconSize + ".svg";
            };
            MomIconService.$inject = ['$q'];
            return MomIconService;
        }());
        framework.MomIconService = MomIconService;
        angular.module('siemens.simaticit.common.widgets.momIcon').service('momIcon.service', MomIconService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=mom-icon.svc.js.map
/*jshint -W098 */
(function () {
    'use strict';

    var app = angular.module('siemens.simaticit.common.widgets.momIcon');

    app.service('common.widgets.momIcon.momIconDataService', ['$http', '$q', function ($http, $q) {
        var _that = this;
        this.iconCache = {};
        this.httpQueue = {};
        this.get = function (path) {
            var deferred = $q.defer();
            if (_that.iconCache.hasOwnProperty(path)) {
                deferred.resolve(_that.iconCache[path]);
            } else {
                _that.httpQueue[path] = _that.httpQueue[path] || [];
                _that.httpQueue[path].push(deferred);
                if (_that.httpQueue[path].length > 1) {
                    _that.httpQueue[path].push(deferred);
                } else {
                    $http.get(path).then(function (response) {
                        response.data = response.data.replace('<svg', '<svg icon-name="' + path.split('/').pop().split('.').shift() + '"');
                        _that.iconCache[path] = response.data;
                        _.each(_that.httpQueue[path], function (item) {
                            item.resolve(response.data);
                        });
                        delete _that.httpQueue[path];
                    }, function () {
                        _.each(_that.httpQueue[path], function (item) {
                            item.resolve(null);
                        });
                        delete _that.httpQueue[path];
                    });
                }
            }
            return deferred.promise;
        }
    }]);

    function momIconController(momIconService) {
        var vm = this;

        init(vm);

        function init(vm) {
            if (vm.momIcon) {
                setIconData(vm.momIcon);
                vm.momIcon.refresh = refresh;
            }
        }

        function setIconData(momIcon) {
            var prefix, name, suffix;
            vm.iconPath = '';
            vm.iconSize = momIcon.size || '24px';

            if (momIcon.path) {
                vm.iconPath = momIcon.path;
            } else if (momIcon.name) {
                prefix = momIcon.prefix || 'cmd';
                name = momIcon.name;
                suffix = momIcon.suffix || '24';
                vm.iconPath = momIconService.getMomIcon(prefix, name, suffix);
            }
        }

        function refresh(momIcon) {
            setIconData(momIcon);
        }
    }

    app.controller('momIconController', ['momIcon.service', momIconController]);

    app.directive('sitMomIcon', ['$compile', '$timeout', 'common.widgets.momIcon.momIconDataService', function ($compile, $timeout, momIcondataService) {

        return {
            scope: {},
            bindToController: { 'momIcon': '=?sitMomIcon' },
            restrict: 'AE',
            controller: 'momIconController',
            controllerAs: 'momIconCtrl',
            link: function (scope, elmnt, attrs, ctrl) {
                if (ctrl.momIcon && ctrl.momIcon.path) {
                    var watch = scope.$watch(function () {
                        return ctrl.momIcon ? ctrl.momIcon.path : false;
                    }, function () {
                        if (ctrl.momIcon) {
                            ctrl.iconPath = ctrl.momIcon.path;
                            loadIcon();
                        }
                    }, true);
                    scope.$on('$destroy', function () {
                        watch();
                    });
                }
                function loadIcon() {
                    var imgTemplate = ['<img ng-if="momIconCtrl.iconPath" class="momIcon" ng-src="{{momIconCtrl.iconPath}}"',
                        ' height="{{momIconCtrl.iconSize}}" width="{{momIconCtrl.iconSize}}" />'].join();
                    if (attrs.hasOwnProperty('sitClass')) {
                        momIcondataService.get(ctrl.iconPath).then(function (data) {
                            data && (elmnt.first().empty().append(($compile(data)(scope)).addClass(attrs['sitClass'])));
                        });
                    }
                    else {
                        elmnt.first().empty().append($compile(imgTemplate)(scope));
                    }
                }
                loadIcon();
            }
        };
    }]);

})();
