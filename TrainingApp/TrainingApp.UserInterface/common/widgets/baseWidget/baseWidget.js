/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.service', []).service('common.widgets.service', [function () {
        var Utility = {
            isFunction: function (func) {
                return func && typeof func === 'function';
            }
        }

        var _enums = {
            PaginationFormat: {
                SHORT: 'SHORT',
                LONG: 'LONG'
            },
            PaginationType: {
                SIMPLE: 'SIMPLE',
                STANDARD: 'STANDARD',
                EXTENDED: 'EXTENDED'
            }
        }

        function BaseWidget(meta, defaultOptions, apiMembers, validateOptionsMethod) {
            var _apiMembers = ['onLoad', 'draw'];
            var _DEFAULT_OPTIONS = defaultOptions;
            var _META = new MetaData(meta);
            var _this = this;
            // constrcutor
            (function () {
                Array.isArray(apiMembers) ? (_apiMembers = _apiMembers.concat(apiMembers)) : apiMembers && _apiMembers.push(apiMembers);

                Object.defineProperties(_this, {
                    DEFAULT_OPTIONS: {
                        value: _DEFAULT_OPTIONS,
                        writable: false,
                        enumarable: true
                    },
                    META: {
                        value: _META,
                        writable: false,
                        enumarable: true
                    }
                });

                Object.seal(_this.DEFAULT_OPTIONS);
                Object.seal(_this.META);

                if (!_META || !_META.name) {
                    throw new Error('Widget name must be provided');
                }

                if (!defaultOptions) {
                    throw new Error('Error in ' + _META.name + ': DEFAULT_OPTIONS must be provided');
                }

            })();

            function registerMember(name, member) {
                var callback;
                if (_apiMembers.indexOf(name) === -1) {
                    throw new Error('Error in ' + _META.name + ': Event "' + name + '" is not available to subscribe.');
                }
                else {
                    if (!this.options.api[name]) {
                        this.options.api[name] = member;
                    }
                }
            }

            function mergeOptions() {
                this.options = $.extend(true, new WidgetOptions(), _DEFAULT_OPTIONS, this.options);
                Utility.isFunction(validateOptionsMethod) && validateOptionsMethod.call(this.options);
            }

            this.$init = function (scope) {
                var _that = this;
                mergeOptions.call(this);
                Utility.isFunction(this.options.$init) && this.options.$init.call(this);
                scope && scope.$on('$destroy', function () { delete _that.options.api; });
            }

            this.$invokeEvent = function (eventName, params) {
                if (_apiMembers.indexOf(eventName) === -1) {
                    throw new Error('Error in ' + _META.name + ': Event "' + eventName + '" is not available.');
                }
                window.$UIF.Object.safeGet(this.options, 'api') &&
                    this.options.api[eventName] &&
                    window.$UIF.Object.isFunction(this.options.api[eventName]) &&
                    this.options.api[eventName].call(this, params);
            };

            this.$subscribe = function (eventName, callback) {
                if (eventName.length > 2 && eventName.indexOf('on') === 0) {
                    if (_apiMembers.indexOf(eventName) === -1) {
                        throw new Error('Error in ' + _META.name + ': Event "' + name + '" is not available in the metadata to subscribe.');
                    } else {
                        registerMember.call(this, eventName, callback);
                    }
                } else {
                    throw new Error('Error in ' + _META.name + ':' + eventName + '" is not a valid event to subscribe.');
                }
            };

            this.$register = function (functionName, func) {
                if (_apiMembers.indexOf(functionName) === -1) {
                    throw new Error('Error in ' + _META.name + ': Method "' + functionName + '" is not available in the metadata to register.');
                } else {
                    registerMember.call(this, functionName, func);
                }
            };
        }

        function MetaData(name, ver) {
            this.name = name;
            this.ver = ver || '1.0.0';
        }

        function WidgetOptions() {
            this.api = {
                _id: new Date().getTime()
            };
        }

        this.BaseWidget = BaseWidget;
        this.MetaData = MetaData;

        Object.defineProperties(this, {
            ENUMS: {
                value: _enums,
                enumerable: true,
                configurable: false
            }
        });
        Object.seal(this.ENUMS);

    }]);
})();
