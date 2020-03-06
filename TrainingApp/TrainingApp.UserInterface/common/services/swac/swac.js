/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        angular.module('siemens.simaticit.common.services.swac', []);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-mod.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var SWACServiceManager = /** @class */ (function () {
            function SWACServiceManager() {
            }
            SWACServiceManager.serviceRegistered = false;
            SWACServiceManager.serviceList = {};
            SWACServiceManager.addService = function (name, instance) { return SWACServiceManager.serviceList[name] = instance; };
            SWACServiceManager.registerSWACService = function () {
                Object.getOwnPropertyNames(SWACServiceManager.serviceList).forEach(function (name) { return SWAC.Services.register(name, SWACServiceManager.serviceList[name]); });
                SWACServiceManager.serviceRegistered = true;
            };
            SWACServiceManager.getServiceInstace = function (srvName) { return SWACServiceManager.serviceList.hasOwnProperty(srvName) ? SWACServiceManager.serviceList[srvName] : null; };
            SWACServiceManager.getNGAppInjector = function () {
                if (SWACServiceManager.injector === undefined) {
                    SWACServiceManager.injector = angular.element(window.document).injector();
                }
                return SWACServiceManager.injector;
            };
            SWACServiceManager.runRootScopeDigest = function () {
                SWACServiceManager.injector.get('$rootScope').$digest();
            };
            return SWACServiceManager;
        }());
        framework.SWACServiceManager = SWACServiceManager;
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=service-manager.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Busy = /** @class */ (function () {
            function Busy() {
                var _this = this;
                this.getBusyService = function () {
                    if (_this.busyService === undefined) {
                        _this.busyService = framework.SWACServiceManager.getNGAppInjector().get('common.widgets.busyIndicator.service');
                    }
                    return _this.busyService;
                };
                this.show = function (text) {
                    var options = { message: text };
                    _this.getBusyService().show(options);
                };
                this.hide = function () {
                    _this.getBusyService().hide();
                };
                this.onBusyEvent = new SWAC.Eventing.Event('onBusyEvent');
            }
            return Busy;
        }());
        framework.Busy = Busy;
        //    SWAC.Services.register('Busy', new Busy());
        framework.SWACServiceManager.addService('MOM.UI.Busy', new Busy());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-busy.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Confirmation = /** @class */ (function () {
            function Confirmation() {
                var _this = this;
                this.getConfirmationService = function () {
                    if (_this.confirmationService === undefined) {
                        _this.confirmationService = framework.SWACServiceManager.getNGAppInjector().get('common.widgets.messageOverlay.service');
                    }
                    return _this.confirmationService;
                };
                this.show = function (title, text, options) {
                    var defer = new SWAC.Defer();
                    var i;
                    var totalButtons;
                    if (options.buttons) {
                        totalButtons = options.buttons.length;
                        for (i = 0; i < totalButtons; i++) {
                            (function (index) {
                                options.buttons[index].onClickCallback = function () {
                                    _this.getConfirmationService().hide();
                                    defer.fulfill({ buttonId: options.buttons[index].id });
                                };
                            })(i);
                        }
                    }
                    else {
                        options.buttons = [{
                                id: 'cancel',
                                displayName: 'Cancel',
                                onClickCallback: function () {
                                    _this.getConfirmationService().hide();
                                    defer.fulfill({ buttonId: 'cancel' });
                                }
                            }, {
                                id: 'ok',
                                displayName: 'OK',
                                onClickCallback: function () {
                                    _this.getConfirmationService().hide();
                                    defer.fulfill({ buttonId: 'ok' });
                                }
                            }];
                    }
                    var value = { text: text, title: title, buttons: options.buttons };
                    _this.getConfirmationService().set(value);
                    _this.getConfirmationService().show();
                    framework.SWACServiceManager.runRootScopeDigest();
                    return defer.promise;
                };
                this.hide = function () {
                    var defer = new SWAC.Defer();
                    _this.getConfirmationService().hide();
                    framework.SWACServiceManager.runRootScopeDigest();
                    return defer.promise;
                };
                this.onConfirmationEvent = new SWAC.Eventing.Event('onConfirmationEvent');
            }
            return Confirmation;
        }());
        framework.Confirmation = Confirmation;
        //SWAC.Services.register('Confirmation', new Confirmation());
        framework.SWACServiceManager.addService('MOM.UI.Confirmation', new Confirmation());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-confirmation.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var SWACError = /** @class */ (function () {
            function SWACError() {
                var _this = this;
                this.getErrorService = function () {
                    if (_this.errorService === undefined) {
                        _this.errorService = framework.SWACServiceManager.getNGAppInjector().get('common.widgets.messageOverlay.service');
                    }
                    return _this.errorService;
                };
                this.show = function (title, text) {
                    var defer = new SWAC.Defer();
                    var button = [{
                            id: 'ok',
                            displayName: 'OK',
                            onClickCallback: function () {
                                _this.getErrorService().hide();
                                defer.fulfill({ buttonId: 'ok', data: 'acknowledged' });
                            }
                        }];
                    var value = { text: text, title: title, buttons: button };
                    _this.getErrorService().set(value);
                    _this.getErrorService().show();
                    framework.SWACServiceManager.runRootScopeDigest();
                    return defer.promise;
                };
                this.onErrorEvent = new SWAC.Eventing.Event('onErrorEvent');
            }
            return SWACError;
        }());
        framework.SWACError = SWACError;
        //    SWAC.Services.register('Error', new SWACError());
        framework.SWACServiceManager.addService('MOM.UI.Error', new SWACError());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-error.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Form = /** @class */ (function () {
            function Form() {
                var _this = this;
                this.getDialogFormService = function () {
                    if (_this.dialogService === undefined) {
                        _this.dialogService = framework.SWACServiceManager.getNGAppInjector().get('common.widgets.globalDialog.service');
                    }
                    return _this.dialogService;
                };
                this.getSidePanelFormService = function () {
                    if (_this.sidepanelService === undefined) {
                        _this.sidepanelService = framework.SWACServiceManager.getNGAppInjector().get('common.services.sidePanel.service');
                    }
                    return _this.sidepanelService;
                };
                this.show = function (title, component, options) {
                    if (options.formType === 'sidepanel') {
                        _this.getSidePanelFormService().setTitle(title);
                        _this.getSidePanelFormService().open('e');
                        framework.SWACServiceManager.runRootScopeDigest();
                        if (SWAC.Container.get({ name: 'sidepanelFormComponent' }) === undefined) {
                            _this.createFormComponent(component, options.formType);
                        }
                        else {
                            SWAC.Container.get({ name: 'sidepanelFormComponent' }).beginShow(true);
                        }
                    }
                    else {
                        var value = {
                            title: title,
                            templatedata: '',
                            templateuri: 'template/swac/swac-uaf-form.html',
                            buttons: {}
                        };
                        _this.getDialogFormService().set(value);
                        _this.getDialogFormService().show();
                        framework.SWACServiceManager.runRootScopeDigest();
                        if (SWAC.Container.get({ name: 'dialogFormComponent' }) === undefined) {
                            _this.createFormComponent(component, 'dialog');
                        }
                        else {
                            SWAC.Container.get({ name: 'dialogFormComponent' }).beginShow(true);
                        }
                    }
                };
                this.createFormComponent = function (component, formType) {
                    var parent;
                    if (formType === 'dialog') {
                        parent = document.getElementById('swac-form-body');
                    }
                    else {
                        parent = document.getElementById('side-panel-swac');
                        component.top = component.top !== undefined ? component.top : '100px';
                    }
                    if (parent != null) {
                        parent.style.height = component.height;
                        parent.style.width = component.width;
                    }
                    SWAC.Container.beginCreate([
                        {
                            name: formType + 'FormComponent',
                            source: component.url,
                            parent: parent,
                            settings: {
                                width: component.width,
                                height: component.height,
                                left: component.left,
                                top: component.top,
                                flavor: 'ui'
                            }
                        }
                    ]).then(function (value) {
                        window.console.log('Form Component successfully created');
                        _this.formType = formType;
                    }, function (reason) {
                        window.console.log('Form component could be not created');
                    });
                };
                this.submit = function (data) {
                    _this.onFormEvent.fire({ name: 'dialogFormData', data: data });
                    if (_this.formType === 'dialog') {
                        _this.getDialogFormService().hide();
                        SWAC.Container.get({ name: 'dialogFormComponent' }).beginShow(false);
                    }
                    else {
                        _this.getSidePanelFormService().close();
                        framework.SWACServiceManager.runRootScopeDigest();
                        SWAC.Container.get({ name: 'sidepanelFormComponent' }).beginShow(false);
                    }
                };
                this.cancel = function () {
                    if (_this.formType === 'dialog') {
                        _this.getDialogFormService().hide();
                        SWAC.Container.get({ name: 'dialogFormComponent' }).beginShow(false);
                    }
                    else {
                        _this.getSidePanelFormService().close();
                        framework.SWACServiceManager.runRootScopeDigest();
                        SWAC.Container.get({ name: 'sidepanelFormComponent' }).beginShow(false);
                    }
                };
                this.onFormEvent = new SWAC.Eventing.Event('onFormEvent');
                this.formType = 'sidepanel';
            }
            return Form;
        }());
        framework.Form = Form;
        //SWAC.Services.register('Form', new Form());
        framework.SWACServiceManager.addService('MOM.UI.Form', new Form());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-form.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var I18n = /** @class */ (function () {
            function I18n() {
                var _this = this;
                this.getI18nService = function () {
                    if (_this.i18nService === undefined) {
                        _this.i18nService = framework.SWACServiceManager.getNGAppInjector().get('common.services.globalization.globalizationService');
                    }
                    return _this.i18nService;
                };
                this.setLocale = function (id, options) {
                    _this.getI18nService().setLanguage(id);
                };
                this.getLocale = function () {
                    return _this.getI18nService().getLocale();
                };
                this.onI18nEvent = new SWAC.Eventing.Event('onI18nEvent');
            }
            return I18n;
        }());
        framework.I18n = I18n;
        //    SWAC.Services.register('I18n', new I18n());
        framework.SWACServiceManager.addService('MOM.UI.I18n', new I18n());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-i18n.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Navigation = /** @class */ (function () {
            function Navigation() {
                var _this = this;
                this.getNavigationService = function () {
                    if (_this.navigationService === undefined) {
                        _this.navigationService = framework.SWACServiceManager.getNGAppInjector().get('$state');
                    }
                    return _this.navigationService;
                };
                this.navigate = function (id, params, options) {
                    return _this.getNavigationService().go(id, params, options);
                };
                this.onNavigationEvent = new SWAC.Eventing.Event('onNavigationEvent');
            }
            return Navigation;
        }());
        framework.Navigation = Navigation;
        //    SWAC.Services.register('Navigation', new Navigation());
        framework.SWACServiceManager.addService('MOM.UI.Navigation', new Navigation());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-navigation.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Nervebox = /** @class */ (function () {
            function Nervebox() {
                var _this = this;
                this.getNerveboxService = function () {
                    if (_this.nerveboxService === undefined) {
                        _this.nerveboxService = framework.SWACServiceManager.getNGAppInjector().get('common.widgets.nerveboxService');
                    }
                    return _this.nerveboxService;
                };
                this.show = function () {
                    _this.nerveboxService().show();
                };
                this.hide = function () {
                    _this.nerveboxService().hide();
                };
            }
            return Nervebox;
        }());
        framework.Nervebox = Nervebox;
        SWAC.Services.register('Nervebox', new Nervebox());
        framework.SWACServiceManager.addService('sit.Nervebox', new Nervebox());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-nervebox.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var NotificationService = /** @class */ (function () {
            function NotificationService() {
                var _this = this;
                this.getNotificationService = function () {
                    if (_this.notificationService === undefined) {
                        _this.notificationService = framework.SWACServiceManager.getNGAppInjector().get('common.widgets.notificationTile.globalService');
                    }
                    return _this.notificationService;
                };
                this.show = function (title, text, options) {
                    _this.getNotificationService().setTileOptions({ title: title });
                    if (options.notifyType === 'warning') {
                        _this.getNotificationService().warning(text);
                    }
                    else {
                        _this.getNotificationService().info(text);
                    }
                };
                this.onNotificationEvent = new SWAC.Eventing.Event('onNotificationEvent');
            }
            return NotificationService;
        }());
        framework.NotificationService = NotificationService;
        //    SWAC.Services.register('Notification', new NotificationService());
        framework.SWACServiceManager.addService('MOM.UI.Notification', new NotificationService());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-notification.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Backend = /** @class */ (function () {
            function Backend() {
                var _this = this;
                this.getBackendApi = function () {
                    if (_this.backendService === undefined) {
                        _this.backendService = framework.SWACServiceManager.getNGAppInjector().get('common.services.runtime.backendService');
                    }
                    return _this.backendService;
                };
                this.invoke = function (inputObject) {
                    return _this.getBackendApi().invoke(inputObject);
                };
                this.findAll = function (object) {
                    return _this.getBackendApi().findAll(object);
                };
                this.read = function (object) {
                    return _this.getBackendApi().findAll(object);
                };
                this.subscribe = function (configObject) {
                    configObject.onMessage = function (data) {
                        _this.onMessage.fire({ app: configObject.appName, signal: configObject.signalName, signalData: data });
                    };
                    configObject.onSubscriptionError = function () {
                        _this.onSubscriptionError.fire({ app: configObject.appName, signal: configObject.signalName });
                    };
                    configObject.onComplete = function () {
                        _this.onComplete.fire({ app: configObject.appName, signal: configObject.signalName });
                    };
                    return _this.getBackendApi().subscribe(configObject);
                };
                this.unsubscribe = function (connId, closeWebsocket) {
                    return _this.getBackendApi().unsubscribe(connId, closeWebsocket);
                };
                this.reconnectSignals = function (app) {
                    return _this.getBackendApi().reconnectSignals(app);
                };
                this.backendError = function (reject) {
                    _this.getBackendApi().backendError(reject);
                    framework.SWACServiceManager.runRootScopeDigest();
                };
                this.genericError = function (message, title) {
                    _this.getBackendApi().genericError(message, title);
                    framework.SWACServiceManager.runRootScopeDigest();
                };
                this.connectSignals = function (appName) {
                    var connectionErrorCallback = function () {
                        _this.onConnectionError.fire({ app: appName });
                    };
                    return _this.getBackendApi().connectSignals(appName, connectionErrorCallback);
                };
                this.disconnectSignals = function (appName) {
                    return _this.getBackendApi().disconnectSignals(appName);
                };
                this.getCount = function (queryModel) {
                    return _this.getBackendApi().getCount(queryModel);
                };
                this.confirm = function (message, title) {
                    var defer = new SWAC.Defer();
                    var confirmCallback = function (data) {
                        defer.fulfill({ isConfirmed: true });
                    };
                    _this.getBackendApi().confirm(message, confirmCallback, title);
                    framework.SWACServiceManager.runRootScopeDigest();
                    return defer.promise;
                };
                this.onSitUIBackendEvent = new SWAC.Eventing.Event('onSitUIBackendEvent');
                this.onConnectionError = new SWAC.Eventing.Event('onConnectionError');
                this.onMessage = new SWAC.Eventing.Event('onMessage');
                this.onSubscriptionError = new SWAC.Eventing.Event('onSubscriptionError');
                this.onComplete = new SWAC.Eventing.Event('onComplete');
            }
            return Backend;
        }());
        framework.Backend = Backend;
        //    SWAC.Services.register('SIT.UI.Backend', new Backend());
        framework.SWACServiceManager.addService('SIT.UI.Backend', new Backend());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-sit-ui-backend.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Theme = /** @class */ (function () {
            function Theme() {
                var _this = this;
                this.getThemeService = function () {
                    if (_this.themeService === undefined) {
                        _this.themeService = framework.SWACServiceManager.getNGAppInjector().get('$rootScope');
                    }
                    return _this.themeService;
                };
                this.set = function (id, options) {
                    var theme = {
                        id: id,
                        name: options.name,
                        styleSheets: [options.styleSheets]
                    };
                    _this.getThemeService().currentTheme = theme;
                    framework.SWACServiceManager.runRootScopeDigest();
                };
                this.get = function () {
                    //TOFIX: return the current theme
                    return _this.getThemeService().currentTheme;
                };
                this.onThemeEvent = new SWAC.Eventing.Event('onThemeEvent');
            }
            return Theme;
        }());
        framework.Theme = Theme;
        //    SWAC.Services.register('Theme', new Theme());
        framework.SWACServiceManager.addService('MOM.UI.Theme', new Theme());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-theme.svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var SwacUiModuleManager = /** @class */ (function () {
            function SwacUiModuleManager($window, $injector, $timeout, $rootScope, $log, $q, authentication, swacComponentService) {
                var _this = this;
                this.$window = $window;
                this.$injector = $injector;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.$log = $log;
                this.$q = $q;
                this.authentication = authentication;
                this.swacComponentService = swacComponentService;
                this.defaultBind = function (root) {
                    _this.swacComponent.root = root;
                    var vm = _this;
                    _this.swacComponent.root.onValueChanged.subscribe(function (data) {
                        if (vm.swacComponent.bind) {
                            vm.swacComponent.bind(data.data);
                        }
                    });
                };
                if (!this.initSwac($window, $log)) {
                    return;
                }
                this.init();
            }
            SwacUiModuleManager.prototype.initSwac = function ($window, $log) {
                if ($window.SWACBoot === undefined) {
                    $log.error('SWACBoot is unavailable');
                    return false;
                }
                if ($window.SWAC === undefined) {
                    $log.error('SWACBoot is unavailable');
                    return false;
                }
                this.SWACBoot = $window.SWACBoot;
                this.themeServicePromise = new SWAC.Defer();
                this.busyServicePromise = new SWAC.Defer();
                //this.nerveboxServicePromise = new SWAC.Defer();
                this.confirmationServicePromise = new SWAC.Defer();
                this.errorServicePromise = new SWAC.Defer();
                this.warningServicePromise = new SWAC.Defer();
                this.i18NServicePromise = new SWAC.Defer();
                this.navigationServicePromise = new SWAC.Defer();
                this.notificationServicePromise = new SWAC.Defer();
                this.contextServicePromise = new SWAC.Defer();
                this.eventBusServicePromise = new SWAC.Defer();
                this.SWAC = $window.SWAC;
                return true;
            };
            SwacUiModuleManager.prototype.registerServices = function () {
                framework.SWACServiceManager.registerSWACService(); //no swac boot ... no parent service ... local registration
                this.swacComponentService.setServiceReady(); //start components creation
            };
            SwacUiModuleManager.prototype.init = function () {
                this.enabled = false;
                this.swacStartCalled = false;
                this.containerPrefix = 'internal_';
                if (this.$window.document) {
                    var headAttrs = this.$window.document.getElementsByTagName('head')[0].attributes;
                    for (var i = 0; i < headAttrs.length; i++) {
                        if (headAttrs[i].nodeName === 'swac') {
                            this.enabled = true;
                            break;
                        }
                    }
                }
                if (!this.enabled) {
                    this.registerServices();
                }
                this.bootComplete = false;
                this.waitingForExpose = false;
            };
            SwacUiModuleManager.prototype.startComponent = function () {
                //the arguments to SWACBoot.start are success callback,failure callback,SWAC Library version used to develop component,enable/disable authentication flag,timeout to start operation in milliseconds.
                var deferr = this.$q.defer();
                var that = this;
                if (!this.authentication.isAuthorized()) {
                    var cmpName = (this.swacComponent) ? (this.swacComponent.name) : ('NO COMPONENT NAME');
                    this.$log.error('Error: Called startComponent but not authorized:' + cmpName);
                    return this.$q.reject('No Auth');
                }
                this.$log.log("Swac Component Manager: startComponent");
                if (!this.swacStartCalled) {
                    this.swacStartCalled = true;
                    this.$log.log("Swac Component Manager: SWACBoot Start");
                    this.SWACBoot.start(function (evt) {
                        var cmpName = (that.swacComponent) ? (that.swacComponent.name) : ('NO COMPONENT NAME');
                        that.$log.log("Success: " + evt.message + 'CMP: ' + cmpName);
                        that.bootComplete = true;
                        deferr.resolve(evt);
                    }, function (evt) {
                        var cmpName = (that.swacComponent) ? (that.swacComponent.name) : ('NO COMPONENT NAME');
                        that.bootComplete = false;
                        that.$log.error('Error:' + evt.message + ' - BOOTSTRAPPER ERROR:\n:' + cmpName);
                        deferr.reject(evt);
                    }, '*', 'no', 30000);
                }
                return deferr.promise;
            };
            SwacUiModuleManager.prototype.exposeComponent = function () {
                var that = this;
                var deferr = this.$q.defer();
                this.startComponent().then(function () {
                    if (!that.bootComplete || !that.waitingForExpose) {
                        that.$log.error('ExposeComponent: Promise StartComponent Resolved but or not BoootComplete or not waitingForExpose: ' + that.swacComponent.interface);
                        deferr.reject();
                        return;
                    }
                    var swacHub = new that.SWAC.Hub(that.swacComponent.interface);
                    swacHub.beginExpose().then(function () {
                        var servicesRequestPromises = [];
                        that.$log.log('Successfully exposed component: ' + that.swacComponent.name);
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Busy').then(function (value) {
                            that.busyServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Busy', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Busy');
                            if (parS) {
                                that.busyServicePromise.fulfill(parS);
                            }
                            else {
                                that.busyServicePromise.reject();
                            }
                        }));
                        //servicesRequestPromises.push(swacHub.services.beginGet('sit.Nervebox').then((value) => {
                        //    that.nerveboxServicePromise.fulfill(value);
                        //    SWACServiceManager.addService('sit.Nervebox', value); //replace service with the parent one
                        //}, (error) => {
                        //    var parS = SWACServiceManager.getServiceInstace('sit.Nervebox');
                        //    if (parS) {
                        //        that.nerveboxServicePromise.fulfill(parS);
                        //    } else {
                        //        that.nerveboxServicePromise.reject();
                        //    }
                        //}));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Confirmation').then(function (value) {
                            that.confirmationServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Confirmation', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Confirmation');
                            if (parS) {
                                that.confirmationServicePromise.fulfill(parS);
                            }
                            else {
                                that.confirmationServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Context').then(function (value) {
                            that.contextServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Context', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Context');
                            if (parS) {
                                that.contextServicePromise.fulfill(parS);
                            }
                            else {
                                that.contextServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.EventBus').then(function (value) {
                            that.eventBusServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.EventBus', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.EventBus');
                            if (parS) {
                                that.eventBusServicePromise.fulfill(parS);
                            }
                            else {
                                that.eventBusServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Error').then(function (value) {
                            that.errorServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Error', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Error');
                            if (parS) {
                                that.errorServicePromise.fulfill(parS);
                            }
                            else {
                                that.errorServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Warning').then(function (value) {
                            that.warningServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Warning', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Warning');
                            if (parS) {
                                that.warningServicePromise.fulfill(parS);
                            }
                            else {
                                that.warningServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.I18n').then(function (value) {
                            that.i18NServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.I18n', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.I18n');
                            if (parS) {
                                that.i18NServicePromise.fulfill(parS);
                            }
                            else {
                                that.i18NServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Navigation').then(function (value) {
                            that.navigationServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Navigation', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Navigation');
                            if (parS) {
                                that.navigationServicePromise.fulfill(parS);
                            }
                            else {
                                that.navigationServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Notification').then(function (value) {
                            that.notificationServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Notification', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Notification');
                            if (parS) {
                                that.notificationServicePromise.fulfill(parS);
                            }
                            else {
                                that.notificationServicePromise.reject(error);
                            }
                        }));
                        servicesRequestPromises.push(swacHub.services.beginGet('MOM.UI.Theme').then(function (value) {
                            that.themeServicePromise.fulfill(value);
                            framework.SWACServiceManager.addService('MOM.UI.Theme', value); //replace service with the parent one
                        }, function (error) {
                            var parS = framework.SWACServiceManager.getServiceInstace('MOM.UI.Theme');
                            if (parS) {
                                that.themeServicePromise.fulfill(parS);
                            }
                            else {
                                that.themeServicePromise.reject(error);
                            }
                        }));
                        SWAC.Promise.all(servicesRequestPromises).then(function () {
                            return that.registerServices();
                        }, function () { return that.registerServices(); }); //final service registration
                        deferr.resolve();
                    }, function () {
                        that.$log.error('swacHub failed to expose component: ' + that.swacComponent.name);
                        that.registerServices(); //no parent service ... local registration
                        deferr.reject();
                    });
                    return;
                }, function () {
                    that.$log.error('ExposeComponent: failed startComponent promise: ' + that.swacComponent.name);
                    that.registerServices(); //no parent service ... local registration
                    deferr.reject();
                    return;
                });
                return deferr.promise;
            };
            SwacUiModuleManager.prototype.create = function (componentName) {
                var _this = this;
                if (!this.enabled) {
                    return this;
                }
                if (!componentName) {
                    throw new Error('Component name not provided');
                }
                this.swacComponent = {
                    name: componentName,
                    interface: {
                        interfaces: {
                            'MOM.UI.Themable': {
                                setTheme: function (theme) {
                                    var promiseResult = new SWAC.Defer();
                                    if (typeof theme === "string") {
                                        if (theme.toLowerCase().search('light') > 0) {
                                            _this.$rootScope.currentTheme = { "id": 0, "name": "Light", "styleSheets": ["common/styles/common-light.css"] };
                                        }
                                        else {
                                            _this.$rootScope.currentTheme = { "id": 1, "name": "Dark", "styleSheets": ["common/styles/common-dark.css"] };
                                        }
                                    }
                                    else {
                                        _this.$rootScope.currentTheme = theme;
                                    }
                                    _this.$rootScope.$apply();
                                    promiseResult.fulfill();
                                },
                                getTheme: function () {
                                    var promiseResult = new SWAC.Defer();
                                    var rootScope = _this.$injector.get('$rootScope');
                                    var theme = rootScope.currentTheme;
                                    promiseResult.fulfill(theme);
                                    return promiseResult.promise;
                                }
                            },
                            'MOM.UI.Localizable': {
                                setLocale: function (lang) {
                                    var promiseResult = new SWAC.Defer();
                                    _this.$window.moment.locale(lang);
                                    _this.$injector.get('$translate').use(lang);
                                    promiseResult.fulfill();
                                },
                                getLocale: function () {
                                    var promiseResult = new SWAC.Defer();
                                    var globalizationSvc = _this.$injector.get('common.services.globalization.globalizationService');
                                    _this.$timeout(function () {
                                        promiseResult.fulfill(globalizationSvc.getLocale());
                                    }, 1000);
                                    return promiseResult.promise;
                                }
                            },
                            'MOM.UI.Navigable': {
                                navigateTo: function (url) {
                                    var promiseResult = new SWAC.Defer();
                                    _this.$window.location.href = url;
                                    promiseResult.fulfill();
                                },
                                navigateToState: function (state) {
                                    var promiseResult = new SWAC.Defer();
                                    var _$state = _this.$injector.get('$state');
                                    _this.$timeout(function () {
                                        _$state.go(state);
                                    }, 500);
                                    promiseResult.fulfill();
                                },
                                getLocation: function () {
                                    var promiseResult = new SWAC.Defer();
                                    promiseResult.fulfill(_this.$window.location);
                                }
                            }
                        },
                        dpc: {
                            structure: [],
                            bind: this.defaultBind
                        }
                    }
                };
                return this;
            };
            SwacUiModuleManager.prototype.expose = function () {
                if (!this.enabled) {
                    return;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                this.waitingForExpose = true;
                return this.exposeComponent();
            };
            SwacUiModuleManager.$inject = ['$window', '$injector', '$timeout', '$rootScope', '$log', '$q', 'common.services.authentication', 'common.services.component.swacComponentService'];
            return SwacUiModuleManager;
        }());
        framework.SwacUiModuleManager = SwacUiModuleManager;
        angular.module('siemens.simaticit.common.services.swac').service('common.services.swac.SwacUiModuleManager', SwacUiModuleManager);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-ui-module-mgr-svc.js.map
"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var SWACWarning = /** @class */ (function () {
            function SWACWarning() {
                var _this = this;
                this.getWarningService = function () {
                    if (_this.warningService === undefined) {
                        _this.warningService = framework.SWACServiceManager.getNGAppInjector().get('common.widgets.messageOverlay.service');
                    }
                    return _this.warningService;
                };
                this.show = function (title, text) {
                    var defer = new SWAC.Defer();
                    var button = [{
                            id: 'ok',
                            displayName: 'OK',
                            onClickCallback: function () {
                                _this.getWarningService().hide();
                                defer.fulfill({ buttonId: 'ok', data: 'acknowledged' });
                            }
                        }];
                    var value = { text: text, title: title, buttons: button };
                    _this.getWarningService().set(value);
                    _this.getWarningService().show();
                    framework.SWACServiceManager.runRootScopeDigest();
                    return defer.promise;
                };
                this.onWarningEvent = new SWAC.Eventing.Event('onWarningEvent');
            }
            return SWACWarning;
        }());
        framework.SWACWarning = SWACWarning;
        framework.SWACServiceManager.addService('MOM.UI.Warning', new SWACWarning());
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-warning.svc.js.map