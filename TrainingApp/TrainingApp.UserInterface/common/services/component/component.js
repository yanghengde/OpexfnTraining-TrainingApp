/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

      /**
      * @ngdoc module
      * @name siemens.simaticit.common.services.component
      * @description This module provides services used to manage UI and SWAC Components
      */
    angular.module('siemens.simaticit.common.services.component', []);
})();

/*jshint -W117 */
(function () {
    'use strict';
    /**
     * @ngdoc service
     * @name common.services.component.swacComponentService
     * @module siemens.simaticit.common.services.component
     * @description A service that manages SWAC Components. The activities include:
     * * loading SWAC Components
     * * removing SWAC Components
     * * getting SWAC Components
     * * handling events
     * * calling SWAC Component functions
     */
    angular.module('siemens.simaticit.common.services.component').service('common.services.component.swacComponentService', SwacComponentService);

    SwacComponentService.$inject = ['common.services.component.swacContainerService', '$timeout', 'common.services.logger.service', '$rootScope', '$q'];
    function SwacComponentService(swacContainerService, $timeout, logger, $rootScope, $q) {
        var vm = this;
        var components = {};
        var pendingComponents = [];
        var pendingComponentsDefer = [];
        var pendingComponentHandlers = [];
        var swacServicesReadyDefer = $q.defer();

        function onComponentReady(name, component) {
            components[name] = component;
            component.beginShow(true);
        }

        function onComponentRemoved(name) {
            components[name] = undefined;
        }

        function logError(message, data) {
            logger.logError(message, data, 'common.services.component.swacComponentService');
        }

        function logInfo(message, data) {
            logger.logInfo(message, data, 'common.services.component.swacComponentService');
        }

        function onContainerCloseSuccess() {
            if (0 === pendingComponents.length) {
                return;
            }
            while (0 < pendingComponents.length) {
                createComponent(pendingComponents.pop(), pendingComponentsDefer.pop());
            }
        }

        function onContainerCloseFailed() {
            logError('Error in container close lifecycle');
            onContainerCloseSuccess();
        }
        function setServiceReady() {
            swacServicesReadyDefer.resolve();
        }

        function createComponent(component, outcomeDefer) {
            swacServicesReadyDefer.promise.then(function () {
                SWAC.Container.beginCreate([component]).then(  //do only after services registration
                    function (value) {
                        // Component/s successfully created.
                        logInfo('Container component(s) successfully created:' + value);
                        if (outcomeDefer) {
                            outcomeDefer.resolve(value);
                        }
                    },
                    function (reason) {
                        // Error during Component/s creation.
                        if (outcomeDefer) {
                            outcomeDefer.reject(reason);
                        }
                        logError('Error during component creation:' + reason);
                    }
                );
            });
        }

        /**
         * @ngdoc method
         * @name common.services.component.swacComponentService#loadComponent
         * @module siemens.simaticit.common.services.component
         * @description Creates and loads the SWAC Component.
         * @param {string} name Name of the SWAC Component to be created or loaded.
         * @param {string} type Type of SWAC Component to be created or loaded.
         * @param {string} source Source of the SWAC Component to be created or loaded.
         * @param {string} parent Parent name of the SWAC Component to be created or loaded.
         * @param {string} left Specifies how far the SWAC Component will be displayed from the left of the screen (in pixels).
         * @param {string} top Specifies how far the SWAC Component will be displayed from the top of the screen (in pixels).
         * @param {string} width Specifies the width of the SWAC Component to be created or loaded.
         * @param {string} height Specifies the height of the SWAC Component to be created or loaded.
         * @param {string} flavor Specifies the flavor of the SWAC Component to be created or loaded. The only value supported is **ui**.
         */
        function loadComponent(name, type, source, parent, left, top, width, height, flavor) {
            if (name === undefined || type === undefined || source === undefined || left === undefined || top === undefined || width === undefined || height === undefined ||
                flavor === undefined) {
                throw new Error('swacService createComponent method failed!');
            }
            var retDefer = $q.defer();
            var component = {
                name: name,
                type: type,
                source: source,
                parent: parent,
                settings: {
                    left: left + 'px',
                    top: top + 'px',
                    width: width,
                    height: height,
                    flavor: flavor
                }
            };
            if (swacContainerService.isContainerClosing()) {
                pendingComponents.push(component);
                pendingComponentsDefer.push(retDefer);
            }
            else {
                createComponent(component, retDefer);
            }
            return retDefer.promise;
        }

        /**
         * @ngdoc method
         * @name common.services.component.swacComponentService#getComponent
         * @module siemens.simaticit.common.services.component
         * @description Gets the specified SWAC Component.
         * @param {string} componentName Name of the SWAC Component to be retrieved.
         */
        function getComponent(componentName) {
            return components[componentName];
        }

        /**
         * @ngdoc method
         * @name common.services.component.swacComponentService#handleComponentEvent
         * @module siemens.simaticit.common.services.component
         * @description Handles the specified event of the SWAC Component.
         * @param {string} componentName Name of the SWAC Component.
         * @param {string} eventName Name of the event to be handled.
         * @param {Function} callback Name of the method to be passed as a parameter.
         */
        function handleComponentEvent(componentName, eventName, callback) {
            if (swacContainerService.isContainerClosing()) {
                pendingComponentHandlers.push({
                    componentName: componentName,
                    eventName: eventName,
                    callback: callback
                });
                return;
            }
            var component = getComponent(componentName);
            if (!component) {
                pendingComponentHandlers.push({
                    componentName: componentName,
                    eventName: eventName,
                    callback: callback
                });
                return;
            }
            if (undefined === component.proxy) {
                logError('handleComponentEvent: component proxy is not available', {
                    'component': componentName
                });
                return;
            }
            if (undefined === component.proxy[eventName]) {
                logError('handleComponentEvent: component proxy doesn\'t contain the event', {
                    'component': componentName,
                    'event': eventName
                });
                return;
            }
            component.proxy[eventName].subscribe(function (event) {
                var data = event.data;
                callback(data);
            });
        }

        function handleEvents() {
            var pending = pendingComponentHandlers;
            pendingComponentHandlers = [];
            for (var i = 0; i < pending.length; i++) {
                var item = pending[i];
                handleComponentEvent(item.componentName, item.eventName, item.callback);
            }
        }

        /**
         * @ngdoc method
         * @name common.services.component.swacComponentService#callComponentFunction
         * @module siemens.simaticit.common.services.component
         * @description Calls a method exposed by the specified SWAC Component.
         * @param {string} componentName Name of the SWAC Component to be called.
         * @param {string} functionName Name of the method to be executed.
         * @param {Object} args List of arguments used by the specified method.
         */
        function callComponentFunction(componentName, functionName, args) {
            var component = getComponent(componentName);
            if (undefined === component) {
                logError('callComponentFunction: unable to find component', {
                    'component': componentName
                });
                return;
            }
            if (undefined === component.proxy) {
                logError('callComponentFunction: component proxy is not available', {
                    'component': componentName
                });
                return;
            }
            if (undefined === component.proxy[functionName]) {
                logError('callComponentFunction: component proxy doesn\'t contain the function', {
                    'component': componentName,
                    'function': functionName
                });
                return;
            }
            component.proxy[functionName].apply(component, args);
        }

        function init() {
            //service methods
            vm.loadComponent = loadComponent;
            vm.getComponent = getComponent;
            vm.handleComponentEvent = handleComponentEvent;
            vm.callComponentFunction = callComponentFunction;
            vm.handleEvents = handleEvents;
            vm.setComponentReady = onComponentReady;
            vm.setComponentRemoved = onComponentRemoved;
            vm.setServiceReady = setServiceReady;
        }

        function subscribeEvents() {
            swacContainerService.onReadySubscribe(onComponentReady);
            swacContainerService.onRemoveSubscribe(onComponentRemoved);
            $rootScope.$on('component.swacContainerService.containerCloseStarted', onContainerCloseSuccess);
            $rootScope.$on('component.swacContainerService.containerClosedFailed', onContainerCloseFailed);
        }

        function activate() {
            init();
            subscribeEvents();
        }
        activate();
    }
})();

/*jshint -W117,-W098 */
(function () {
    'use strict';

    /**
        * @ngdoc service
        * @name common.services.component.swacContainerService
        * @module siemens.simaticit.common.services.component
        * @description This module provides services which manage SWAC Containers using SWAC APIs.
        */
    angular.module('siemens.simaticit.common.services.component').service('common.services.component.swacContainerService', SwacContainerService);

    SwacContainerService.$inject = ['common.services.logger.service', '$rootScope', 'common.services.umc'];
    function SwacContainerService(logger, $rootScope, umcService) {
        var vm = this;
        var _isContainerClosing = false;
        var _listeners = {};

        activate();

        function activate() {
            init();
        }

        function init() {
            //service methods
            vm.isContainerClosing = isContainerClosing;
            vm.setCreateTimeOut = setCreateTimeOut;
            vm.setInternalTimeOut = setInternalTimeOut;
            vm.setProxyFunctionsTimeOut = setProxyFunctionsTimeOut;
            vm.setProxyEventsTimeOut = setProxyEventsTimeOut;
            vm.setContainerBaseLibrary = setContainerBaseLibrary;
            vm.closeContainer = closeContainer;
            vm.onReadySubscribe = onReadySubscribe;
            vm.onReadyUnsubscribe = onReadyUnsubscribe;
            vm.onCreatedSubscribe = onCreatedSubscribe;
            vm.onCreatedUnsubscribe = onCreatedUnsubscribe;
            vm.onRemoveSubscribe = onRemoveSubscribe;
            vm.onRemoveUnsubscribe = onRemoveUnsubscribe;
            vm.registerService = registerService;

            SWAC.Container.onCreated.subscribe(onCreatedSubscribeHandler);
            SWAC.Container.onReady.subscribe(onReadySubscribeHandler);
            SWAC.Container.onRemoved.subscribe(onRemoveSubscribeHandler);
        }

        function registerService(name, service) {
            SWAC.Services.register(name, service);
        }

        function logInfo(message, data) {
            logger.logInfo(message, data, 'common.services.component.swacComponentService');
        }

        function logError(message, data) {
            logger.logError(message, data, 'common.services.component.swacComponentService');
        }

        //Creation timeout
        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#setCreateTimeOut
        * @module siemens.simaticit.common.services.component
        * @description Sets the timeout period for the SWAC Container to wait while the SWAC component is created.
        * @param {Number} [timeout=20000] Timeout (in milliseconds) allocated for the creation of the component.
        */
        function setCreateTimeOut(timeout) {
            SWAC.Config.TimeOuts.Create = timeout || 20000;
        }

        //Internal Timeout
        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#setInternalTimeOut
        * @module siemens.simaticit.common.services.component
        * @description Sets the internal timeout period for the SWAC Container.
        * @param {Number} [timeout=20000] Timeout (in milliseconds) allocated for internal calls.
        */
        function setInternalTimeOut(timeout) {
            SWAC.Config.TimeOuts.Internal = timeout || 20000;
        }

        //Proxy Functions timeout
        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#setProxyFunctionsTimeOut
        * @module siemens.simaticit.common.services.component
        * @description Sets the timeout period for the SWAC Container to wait while the proxy function completes its execution.
        * @param {Number} [timeout=20000] The timeout period (in milliseconds) for the proxy function to complete its execution.
        */
        function setProxyFunctionsTimeOut(timeout) {
            SWAC.Config.TimeOuts.Proxy.Functions = timeout || 20000;
        }

        //Proxy Events timeout
        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#setProxyEventsTimeOut
        * @module siemens.simaticit.common.services.component
        * @description Sets the timeout period for the SWAC Container to wait while the proxy events complete their tasks.
        * @param {Number} [timeout=20000] Timeout (in milliseconds) for a proxy event.
        */
        function setProxyEventsTimeOut(timeout) {
            SWAC.Config.TimeOuts.Proxy.Events = timeout || 20000;
        }

        //swac-base.js path for component injection
        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#setContainerBaseLibrary
        * @module siemens.simaticit.common.services.component
        * @description Sets the path to the SWAC base library.
        * @param {string} path URL of the SWAC base library path.
        */
        function setContainerBaseLibrary(path) {
            SWAC.Config.Container.URLs.BaseLibrary = function () {
                return path;
            };
        }

        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#closeContainer
        * @module siemens.simaticit.common.services.component
        * @description Notifies the SWAC Container to remove all its components by calling the **beginClose** method of SWAC.Container.
        * @param {string[]} componentsList Array of component names to be removed from the container.
        * If the componentsList is empty or not defined, then all the components in the container will be removed.
        */
        function closeContainer(componentsList) {
            //default all components
            var componentsToRemove = null;
            if (componentsList && componentsList.length > 0) {
                componentsToRemove = componentsList;
            }
            _isContainerClosing = true;
            SWAC.Container.beginClose(componentsToRemove, true, 60000).then(
                function (value) {
                    _isContainerClosing = false;
                    $rootScope.$broadcast('component.swacContainerService.containerCloseStarted');
                    logInfo('Container successfully closed:' + value);
                },
                function (reason) {
                    _isContainerClosing = false;
                    $rootScope.$broadcast('component.swacContainerService.containerClosedFailed', reason);
                    logError('Error during container close:' + reason);
                }
            );
        }

        //Container onReady event subscriber
        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#onReadySubscribe
        * @module siemens.simaticit.common.services.component
        * @description Registers the callback to SWAC.Container.onReady event.
        * @param {Function} callback function to be called when a SWAC component is created and successfully exposed its API.
        */
        function onReadySubscribe(handler) {
            if (undefined === handler) {
                return;
            }
            addListener('onReady', handler);
        }

        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#onReadyUnsubscribe
        * @module siemens.simaticit.common.services.component
        * @description Unregisters the callback with SWAC.Container.onReady event.
        * @param {Function} callback function to be unregistered.
        */
        function onReadyUnsubscribe(handler) {
            if (undefined === handler) {
                return;
            }
            removeListener('onReady', handler);
        }

        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#onCreatedSubscribe
        * @module siemens.simaticit.common.services.component
        * @description Registers the callback to SWAC.Container.onCreated event.
        * @param {Function} callback function to be called when a SWAC component is created.
        */
        function onCreatedSubscribe(handler) {
            if (undefined === handler) {
                return;
            }
            addListener('onCreated', handler);
        }

        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#onCreatedUnsubscribe
        * @module siemens.simaticit.common.services.component
        * @description Unregisters the callback with SWAC.Container.onCreated event.
        * @param {Function} callback function to be unregistered.
        */
        function onCreatedUnsubscribe(handler) {
            if (undefined === handler) {
                return;
            }
            removeListener('onCreated', handler);
        }

        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#onRemoveSubscribe
        * @module siemens.simaticit.common.services.component
        * @description Registers the callback to SWAC.Container.onRemove event.
        * @param {Function} callback function to be called when a SWAC component is removed from the container.
        */
        function onRemoveSubscribe(handler) {
            if (undefined === handler) {
                return;
            }
            addListener('onRemove', handler);
        }

        /**
         * @ngdoc method
         * @name common.services.component.swacContainerService#onRemoveUnsubscribe
         * @module siemens.simaticit.common.services.component
         * @description Unregisters the callback with SWAC.Container.onRemove event.
         * @param {Function} callback function to be unregistered.
         */
        function onRemoveUnsubscribe(handler) {
            if (undefined === handler) {
                return;
            }
            removeListener('onRemove', handler);
        }

        /**
        * @ngdoc method
        * @name common.services.component.swacContainerService#isContainerClosing
        * @module siemens.simaticit.common.services.component
        * @description Retrieves information on whether the SWAC Container is in closing state or not.
        * @returns {Boolean} The value is **true** if the SWAC container is closing, otherwise it is **false**.
        */
        function isContainerClosing() {
            return _isContainerClosing;
        }

        function onCreatedSubscribeHandler(event) {
            var data = [event.data.name];
            invokeListeners('onCreated', data);
        }

        function onReadySubscribeHandler(event) {
            var data = [event.data.name, SWAC.Container.get({ name: event.data.name })];
            invokeListeners('onReady', data);
        }

        function onRemoveSubscribeHandler(event) {
            var data = [event.data.name];
            invokeListeners('onRemove', data);
        }

        function addListener(type, listener) {
            if (typeof _listeners[type] === 'undefined') {
                _listeners[type] = [];
            }
            _listeners[type].push(listener);
        }

        function removeListener(type, listener) {
            if (typeof _listeners[type] === 'undefined') {
                return;
            }
            var listeners, i = 0, len = 0;
            listeners = _listeners[type];
            for (i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }

        function invokeListeners(type, data) {
            if (typeof _listeners[type] === 'undefined') {
                return;
            }
            var listeners, i = 0, len = 0;
            listeners = _listeners[type].slice();
            for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].apply(this, data);
            }
        }
    }
})();

(function () {
    'use strict';
    /**
    * @ngdoc service
    * @name common.services.component.uiComponentService
    * @module siemens.simaticit.common.services.component
    * @description A service that manages UI Components.
    */
    angular.module('siemens.simaticit.common.services.component').service("common.services.component.uiComponentService", UIComponentService);

    UIComponentService.$inject = ['$rootScope', '$timeout', '$http', '$q', 'common.services.logger.service'];
    function UIComponentService($rootScope, $timeout, $http, $q, logger) {
        var vm = this;
        var components = {};
        var pendingComponentHandlers = [];
        var componentEvents = {};

        activate();

        function activate() {
            //service methods
            vm.addComponent = addComponent;
            vm.resetComponents = resetComponents;
            vm.getComponent = getComponent;
            vm.handleComponentEvent = handleComponentEvent;
            vm.callComponentFunction = callComponentFunction;
            vm.getComponentManifest = getComponentManifest;
            vm.handleEvents = handleEvents;
            vm.removeComponents = removeComponents;
            vm.registerComponentResizeCallback = registerComponentResizeCallback;
            vm.registerDesignModeToggleCallback = registerDesignModeToggleCallback;
            vm.deregisterDesignModeToggleCallback = deregisterDesignModeToggleCallback;
            vm.deregisterComponentResizeCallback = deregisterComponentResizeCallback;
            vm.onComponentResize = onComponentResize;
            vm.startComponents = startComponents;

            $rootScope.$on('siemens.simaticit.common.services.layout.shell.gridster-resizable-draggable-changed', onDesignModeToggle);
        }

        function onDesignModeToggle(event, eventData) {
            // execute the component lifecycle methods
            executeComponentLifeCycleMethods('_onDesignModeToggle', [eventData]);

            // execute the service callbacks. deprecated in V2.1
            if (!componentEvents.designModeToggleCallbacks || 0 === componentEvents.designModeToggleCallbacks.length) {
                return;
            }
            for (var i = 0; i < componentEvents.designModeToggleCallbacks.length; i++) {
                componentEvents.designModeToggleCallbacks[i](eventData);
            }
        }

        function onComponentResize(args) {
            if (!args.componentName) {
                return;
            }
            // prepare an object containing component dimensions
            var size = {
                height: args.height,
                width: args.width
            };

            // execute the component lifecycle methods
            executeComponentLifeCycleMethods('_onComponentResize', [size], [args.componentName]);

            // execute the service callbacks. deprecated in V2.1
            if (!componentEvents[args.componentName] || 0 === componentEvents[args.componentName].length) {
                return;
            }
            for (var i = 0; i < componentEvents[args.componentName].length; i++) {
                componentEvents[args.componentName][i](size);
            }
        }

        /**
       * @ngdoc method
       * @name common.services.component.uiComponentService#registerComponentResizeCallback
       * @module siemens.simaticit.common.services.component
       * @description Registers the callback method to be executed when a mashup component is resized.
       * @param {string} componentName Name of the Component.
       * @param {function} callback The method to be executed when a Mashup component is resized.
       * The new dimensions (width and height) of the component are passed to the callback in an object.
       */
        function registerComponentResizeCallback(componentName, callback) {
            if (!componentName) {
                logError('registerComponentResizeCallback: unable to register callback: component name should be passed as first argument', {});
                return;
            }
            if (!callback) {
                logError('registerComponentResizeCallback: unable to register callback: valid callback method should be passed as second argument', {});
                return;
            }

            if (!componentEvents[componentName]) {
                componentEvents[componentName] = [];
            }
            componentEvents[componentName].push(callback);
        }

        /**
      * @ngdoc method
      * @name common.services.component.uiComponentService#deregisterComponentResizeCallback
      * @module siemens.simaticit.common.services.component
      * @description Unregisters a callback method that has been previously registered through the
      * {@link common.services.component.uiComponentService#registerComponentResizeCallback} method.
      * @param {string} componentName Name of the Component.
      * @param {function} callback The callback method to be unregistered.
      */
        function deregisterComponentResizeCallback(componentName, callback) {
            if (!componentName) {
                logError('deregisterComponentResizeCallback: unable to de-register callback: component name should be passed as first argument', {});
                return;
            }
            if (!callback) {
                logError('deregisterComponentResizeCallback: unable to de-register callback: valid callback method should be passed as second argument', {});
                return;
            }
            if (!componentEvents[componentName] || 0 === componentEvents[componentName].length) {
                return;
            }
            for (var i = 0; i < componentEvents[componentName].length; i++) {
                if (componentEvents[componentName][i] !== callback) {
                    continue;
                }
                componentEvents[componentName].splice(i, 1);
                break;
            }
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#registerDesignModeToggleCallback
        * @module siemens.simaticit.common.services.component
        * @description Registers a callback method to be executed when design mode is enabled or disabled for the current mashup.
        * @param {function} callback The method to be executed when design mode is enabled or disabled for the current mashup.
        * The Boolean value passed to the callback indicates whether design mode has been enabled (**true**) or disabled (**false**).
        */
        function registerDesignModeToggleCallback(callback) {
            if (!callback) {
                logError('registerDesignModeToggleCallback: unable to register callback: valid callback method should be passed as argument', {});
                return;
            }
            if (!componentEvents.designModeToggleCallbacks) {
                componentEvents['designModeToggleCallbacks'] = [];
            }
            componentEvents.designModeToggleCallbacks.push(callback);
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#deregisterDesignModeToggleCallback
        * @module siemens.simaticit.common.services.component
        * @description Unregisters the existing callback method to be executed when design mode is enabled or disabled for the current mashup.
        * @param {function} callback The callback method to be unregistered.
        */
        function deregisterDesignModeToggleCallback(callback) {
            if (!callback) {
                logError('deregisterDesignModeToggleCallback: unable to de-register callback: valid callback method should be passed as argument', {});
                return;
            }
            if (!componentEvents.designModeToggleCallbacks || 0 === componentEvents.designModeToggleCallbacks.length) {
                return;
            }
            for (var i = 0; i < componentEvents.designModeToggleCallbacks.length; i++) {
                if (componentEvents.designModeToggleCallbacks[i] !== callback) {
                    continue;
                }
                componentEvents.designModeToggleCallbacks.splice(i, 1);
                break;
            }
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#addComponent
        * @module siemens.simaticit.common.services.component
        * @description Adds a UI Component.
        * @param {string} name Name of the UI Component.
        * @param {Object} component The UI Component to be added.
        */
        function addComponent(name, component) {
            components[name] = { instance: component, handlers: [] };
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#resetComponents
        * @module siemens.simaticit.common.services.component
        * @description Resets the UI Components.
        */
        function resetComponents() {
            // execute the component lifecycle methods
            executeComponentLifeCycleMethods('_onComponentDestroy', []);

            for (var index = 0, componentNames = Object.keys(components), count = componentNames.length; index < count; index++) {
                var componentName = componentNames[index];
                for (var i = 0; i < components[componentName].handlers.length; i++) {
                    components[componentName].handlers[i]();
                }
            }
            components = {};
        }

        function removeComponents(componentList) {
            if (undefined === componentList || 0 === componentList.length) {
                resetComponents();
                return;
            }
            // execute the component lifecycle methods
            executeComponentLifeCycleMethods('_onComponentDestroy', [], componentList);

            for (var index = 0, len = componentList.length; index < len; index++) {
                var componentName = componentList[index];
                if (!components.hasOwnProperty(componentName)) {
                    continue;
                }
                for (var i = 0; i < components[componentName].handlers.length; i++) {
                    components[componentName].handlers[i]();
                }
                delete components[componentName];
            }
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#getComponent
        * @module siemens.simaticit.common.services.component
        * @description Gets the specified UI Component.
        * @param {string} name Name of the UI Component.
        */
        function getComponent(name) {
            return components[name];
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#handleComponentEvent
        * @module siemens.simaticit.common.services.component
        * @description Handles the specified event of a particular UI Component.
        * @param {string} componentName The name of the UI Component.
        * @param {string} eventName The name of the event that must be handled.
        * @param {Function} callback The function to be executed when the specified event is fired.
        */
        function handleComponentEvent(componentName, eventName, callback) {
            var component = getComponent(componentName);
            if (!component) {
                pendingComponentHandlers.push({
                    componentName: componentName,
                    eventName: eventName,
                    callback: callback
                });
                return;
            }
            var unregisterFunction = $rootScope.$on(component.instance.componentName + '.' + componentName + "." + eventName, function (evt, args) {
                callback(args);
            });
            component.handlers.push(unregisterFunction);
        }

        function handleEvents() {
            var pending = pendingComponentHandlers;
            pendingComponentHandlers = [];
            for (var i = 0; i < pending.length; i++) {
                var item = pending[i];
                handleComponentEvent(item.componentName, item.eventName, item.callback);
            }
        }

        function startComponents() {
            for (var index = 0, componentNames = Object.keys(components), count = componentNames.length; index < count; index++) {
                var componentName = componentNames[index];
                var component = components[componentName].instance;
                if (!component.hub.hasOwnProperty('_onComponentReady') || 'function' !== typeof component.hub['_onComponentReady']) {
                    continue;
                }
                if (!component.resolve) {
                    component.hub._onComponentReady.call(component.hub, component.instance);
                    component.resolve = true;
                }
            }
        }

        function executeComponentLifeCycleMethods(methodName, parameters, componentNames) {
            if (undefined === componentNames) {
                componentNames = Object.keys(components);
            }
            for (var index = 0, count = componentNames.length; index < count; index++) {
                var componentName = componentNames[index];
                if (!components.hasOwnProperty(componentName)) {
                    continue;
                }
                var hub = components[componentName].instance.hub;
                if (!hub.hasOwnProperty(methodName) || 'function' !== typeof hub[methodName]) {
                    continue;
                }
                //hub[methodName].apply(hub, parameters);
                // to call async and will not block other calls due to any errors
                invokeMethod(hub, methodName, parameters);
            }
        }

        function invokeMethod(instance, methodName, parameters) {
            $timeout(function () {
                instance[methodName].apply(instance, parameters);
            });
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#callComponentFunction
        * @module siemens.simaticit.common.services.component
        * @description Calls the specified method exposed by the particular UI Component.
        * @param {string} componentName Name of the UI Component.
        * @param {string} functionName Name of the method to be called.
        * @param {Object} args List of arguments used by the specified method.
        */
        function callComponentFunction(componentName, functionName, args) {
            var component = getComponent(componentName);
            if (undefined === component) {
                logError('callComponentFunction: unable to find component', {
                    'component': componentName
                });
                return;
            }
            if (undefined === component.instance.hub) {
                logError('callComponentFunction: component hub is not available', {
                    'component': componentName
                });
                return;
            }
            if (undefined === component.instance.hub[functionName]) {
                logError('callComponentFunction: component hub does\'nt contain the function', {
                    'component': componentName,
                    'function': functionName
                });
                return;
            }
            component.instance.hub[functionName].apply(component.instance.hub, args);
        }

        function logError(message, data) {
            logger.logError(message, data, 'common.services.component.uiComponentService');
        }

        /**
        * @ngdoc method
        * @name common.services.component.uiComponentService#getComponentManifest
        * @module siemens.simaticit.common.services.component
        * @description Reads the Component Manifest using the functional block and component name.
        * @param {string} functionalBlock Name of the functional block.
        * @param {string} componentName Name of the component.
        * @returns {Object} component manifest as a json object.
        */
        function getComponentManifest(functionalBlock, componentName) {
            var url = functionalBlock + "\\components\\" + componentName + ".json";
            var deferred = $q.defer();
            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function () {
                    deferred.reject;
                });
            return deferred.promise;
        }
    }
})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
         * @ngdoc service
         * @name common.services.component.swacComponentManager
         * @module siemens.simaticit.common.services.component
         *
         * @description
         * Used by the UI component/module/application controllers to define the public interface to expose SWAC components. This service acts as a wrapper for SWAC.Hub APIs to initialize the wrapped SWAC component.
         *
         *
         * @example
         * Usage of service to expose the UI Module as a SWAC component.
         * ```
         * var dpcObject = {
         *           'key':'color',
         *           'value': 'red',
         *           'type': 'string',
         *           'flags':'w'
         *       };
         *  swacComponentManager.create('uiModule')
         *       .method('multiply', function (x, y) {
         *           return (x * y);
         *       })
         *       .event('onAdd')
         *       .event('onSubtract')
         *       .dpc(dpcObject)
         *       .bind(dpcChanged)
         *       .expose();
         *
         * swacComponentManager.fireEvent('onSubtract', data.result);
         * swacComponentManager.fireEvent('onAdd', data.result);
         *
         * function dpcChanged(data) {
         *      $log.log('Value changed from ' + data.oldValue + ' to ' + data.value + ' for key ' + data.key);
         *  }
         *
         * ```
         *
         */
        var SwacComponentManager = /** @class */ (function () {
            function SwacComponentManager($window, $log, $q, authentication, uiComponentService, $rootScope) {
                var _this = this;
                this.$window = $window;
                this.$log = $log;
                this.$q = $q;
                this.authentication = authentication;
                this.uiComponentService = uiComponentService;
                this.$rootScope = $rootScope;
                this.createDpcNode = function (head, parentNode) {
                    if (parentNode.node === 'data') {
                        _this.dpcStructure(head, parentNode);
                        return;
                    }
                    else if (parentNode.node === 'structures') {
                        // for complex structures of dpc the child node name will have parent node's
                        //name appended to it.
                        head = head + '.';
                        for (var key in parentNode.children) {
                            if (parentNode.children.hasOwnProperty(key)) {
                                _this.createDpcNode(head + key, parentNode.children[key]);
                            }
                        }
                    }
                };
                this.dpcStructure = function (head, node) {
                    var obj = {
                        'key': undefined,
                        'value': undefined,
                        'flags': undefined,
                        'type': undefined
                    };
                    obj.key = head;
                    /* tslint:disable:no-string-literal */
                    obj.value = _this.getDefaultValue(node.type);
                    /* tslint:enable:no-string-literal */
                    obj.flags = node.permission;
                    obj.type = node.type;
                    _this.dpc(obj);
                };
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
            SwacComponentManager.prototype.initSwac = function ($window, $log) {
                if ($window.SWACBoot === undefined) {
                    $log.error('SWACBoot is unavailable');
                    return false;
                }
                if ($window.SWAC === undefined) {
                    $log.error('SWACBoot is unavailable');
                    return false;
                }
                this.SWACBoot = $window.SWACBoot;
                this.SWAC = $window.SWAC;
                return true;
            };
            SwacComponentManager.prototype.init = function () {
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
                this.bootComplete = false;
                this.waitingForExpose = false;
            };
            SwacComponentManager.prototype.startComponent = function () {
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
            SwacComponentManager.prototype.exposeComponent = function () {
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
                        that.$log.log('Successfully exposed component: ' + that.swacComponent.name);
                        deferr.resolve();
                    }, function () {
                        that.$log.error('swacHub failed to expose component: ' + that.swacComponent.name);
                        deferr.reject();
                    });
                    return;
                }, function () {
                    that.$log.error('ExposeComponent: failed startComponent promise: ' + that.swacComponent.name);
                    deferr.reject();
                    return;
                });
                return deferr.promise;
            };
            SwacComponentManager.prototype.registerEvent = function (eventName) {
                var _this = this;
                this.event(eventName);
                this.uiComponentService.handleComponentEvent(this.containerPrefix + this.swacComponent.name, eventName, function (evtData) {
                    _this.fireEvent(eventName, evtData);
                });
            };
            SwacComponentManager.prototype.registerMethod = function (methodName) {
                var that = this;
                this.method(methodName, function () {
                    return that.uiComponentService.callComponentFunction(that.containerPrefix + that.swacComponent.name, methodName, arguments);
                });
            };
            SwacComponentManager.prototype.getDefaultValue = function (valueType) {
                switch (valueType) {
                    case 'boolean': return false;
                    case 'null': return null;
                    case 'number': return 0;
                    case 'object': return {};
                    case 'string': return "";
                    default: return "";
                }
            };
            /**
              * @ngdoc method
              *
              * @name common.services.component.swacComponentManager#create
              * @module siemens.simaticit.common.services.component
              *
              * @description This method creates a new empty SWAC component (through which a public interface can be defined by calling other methods belonging to this service).
              * @param {string} componentName The name of the component to be created.
              * @returns {Object} An instance of this service to make it chainable.
              *
              */
            SwacComponentManager.prototype.create = function (componentName) {
                if (!this.enabled) {
                    return this;
                }
                if (!componentName) {
                    throw new Error('Component name not provided');
                }
                this.swacComponent = {
                    name: componentName,
                    interface: {
                        dpc: {
                            structure: [],
                            bind: this.defaultBind
                        }
                    }
                };
                return this;
            };
            /**
             * @ngdoc method
             *
             * @name common.services.component.swacComponentManager#method
             * @module siemens.simaticit.common.services.component
             *
             * @description This method attaches a method to the component to be exposed. If the method name already exists, it overrides the existing method.
             * @param {string} methodName The name of the method to be attached to the component.
             * @param {Function} methodDefinition The definition of the method to be attached to the component. If another method/event with the same name exists, then the existing method/event is overridden.
             * @returns {Object} An instance of this service to make it chainable.
             *
             */
            SwacComponentManager.prototype.method = function (methodName, methodDefinition) {
                if (!this.enabled) {
                    return this;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                if (typeof methodName !== "string" || typeof methodDefinition !== "function") {
                    this.$log.error('Mismatch in type of the input parameters');
                    return this;
                }
                this.swacComponent.interface[methodName] = methodDefinition;
                return this;
            };
            /**
             * @ngdoc method
             *
             * @name common.services.component.swacComponentManager#event
             * @module siemens.simaticit.common.services.component
             * @description This method attaches an event to the component to be exposed. If another method/event with the same name exists, then it overrides the existing method/event.
             * @param {string} eventName The name of the event to be exposed.
             * @returns {Object} An instance of this service to make it chainable.
             *
             */
            SwacComponentManager.prototype.event = function (eventName) {
                if (!this.enabled) {
                    return this;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                if (typeof eventName !== "string") {
                    this.$log.error('Mismatch in type of the input parameters.event name should be a string');
                    return this;
                }
                this.swacComponent.interface[eventName] = new this.SWAC.Eventing.Event(eventName);
                return this;
            };
            /**
              * @ngdoc method
              *
              * @name common.services.component.swacComponentManager#dpc
              * @module siemens.simaticit.common.services.component
              *
              * @description This method attaches a data-provider-consumer to the component to be exposed.
              * @param {Object} dpcObj  An object with following required keys.
              * * **key** {string} Represents the hierarchy of the tree within the DPCs.
              * * **value** {Object} When a component is loaded for the first time inside the container, it will be initialized with this value.
              * * **dataType** {string} Defines the type of the node. The user can specify the default Javascript types (e.g. string, number, null, etc.) or a custom type (e.g. User).
              * * **flags** {string}  Represents node rights, r is for read and w is for write.
              * @returns {Object} An instance of this service to make it chainable.
              *
              */
            SwacComponentManager.prototype.dpc = function (dpcObj) {
                if (!this.enabled) {
                    return this;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                this.swacComponent.interface.dpc.structure.push(dpcObj);
                return this;
            };
            /**
              * @ngdoc method
              *
              * @name common.services.component.swacComponentManager#bind
              * @module siemens.simaticit.common.services.component
              *
              * @description This method defines a bind function for the DPCs. It takes a callback function as input and is invoked whenever the value of the DPC changes.
              * @param {Function} bindCallback A callback for the bind function. The callback takes an object parameter as input, which contains following properties:
              * * **key** {string} Represents the hierarchy of the tree within the DPCs.
              * * **value** {Object} The new value assigned to the DPC.
              * * **oldValue** {Object} The old value of the DPC.
              * @returns {Object} An instance of this service to make it chainable.
              *
              */
            SwacComponentManager.prototype.bind = function (bindCallback) {
                if (!this.enabled) {
                    return this;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                this.swacComponent.bind = bindCallback;
                return this;
            };
            /**
              * @ngdoc method
              *
              * @name common.services.component.swacComponentManager#fireEvent
              * @module siemens.simaticit.common.services.component
              *
              * @description This method will fire the event passed as an event data argument.
              * @param {string} eventName The event to be fired.
              * @param {Object} data The data associated to the event.
              */
            SwacComponentManager.prototype.fireEvent = function (eventName, data) {
                if (!this.enabled) {
                    return;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                if (!this.swacComponent.interface[eventName]) {
                    this.$log.error('Event ' + eventName + ' not registered');
                    return;
                }
                if (!this.swacComponent.interface[eventName].fire) {
                    this.$log.error(eventName + ' is not registered as an event');
                    return;
                }
                this.swacComponent.interface[eventName].fire(data);
            };
            /**
             * @ngdoc method
             *
             * @name common.services.component.swacComponentManager#createFrom
             * @module siemens.simaticit.common.services.component
             *
             * @description This method creates the component's public interface automatically, based on the component manifest.
             * @param {Object} componentManifest The UI component manifest.
             * @returns {Object} An instance of this service to make it chainable.
             *
             */
            SwacComponentManager.prototype.createFrom = function (componentManifest) {
                var _this = this;
                if (!this.enabled) {
                    return this;
                }
                /*jshint loopfunc:true */
                if (undefined === componentManifest) {
                    throw new Error('Component not created.component manifest is undefined');
                }
                //create the components
                var api = componentManifest.uiComponent.contracts.api;
                var dpc = componentManifest.uiComponent.contracts.dpc;
                this.create(componentManifest.uiComponent.identity.name);
                if (!api && !dpc) {
                    return this;
                }
                if (api && api.methods) {
                    for (var method in api.methods) {
                        if (api.methods.hasOwnProperty(method)) {
                            this.registerMethod(method);
                        }
                    }
                }
                if (api && api.events) {
                    //attach events to the component
                    for (var event in api.events) {
                        if (api.events.hasOwnProperty(event)) {
                            this.registerEvent(event);
                        }
                    }
                    this.$rootScope.$on('siemens.simaticit.common.widgets.container.mashupReady', function () {
                        _this.uiComponentService.handleEvents();
                    });
                }
                if (dpc && Object.keys(dpc).length > 0) {
                    for (var key in dpc) {
                        if (dpc.hasOwnProperty(key)) {
                            this.createDpcNode(key, dpc[key]);
                        }
                    }
                }
                return this;
            };
            /**
             * @ngdoc method
             *
             * @name common.services.component.swacComponentManager#expose
             * @module siemens.simaticit.common.services.component
             * @description This method will expose the public interface of a SWAC component if the service is enabled.
             */
            SwacComponentManager.prototype.expose = function () {
                if (!this.enabled) {
                    return;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                this.waitingForExpose = true;
                return this.exposeComponent();
            };
            /**
           * @ngdoc method
           *
           * @name common.services.component.swacComponentManager#setDpcValue
           * @module siemens.simaticit.common.services.component
           *
           * @description This method will set the value of the DPC specified by its key.
           * @param {string} key The unique key of the DPC for the SWAC component.
           * @param {Object} value The value to be set for the DPC specified by its key.
           */
            SwacComponentManager.prototype.setDpcValue = function (key, value) {
                if (!this.enabled) {
                    return;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                if (!this.swacComponent.root.open(key)) {
                    throw new Error('DPC key is not present');
                }
                this.swacComponent.root.open(key).set(value);
            };
            /**
            * @ngdoc method
            *
            * @name common.services.component.swacComponentManager#getDpcValue
            * @module siemens.simaticit.common.services.component
            *
            * @description This method will get the value of the DPC specified by its key.
            * @param {string} key The unique key of the DPC for the SWAC component.
            * @returns {object} Returns the value of the DPC specified by its key.
            */
            SwacComponentManager.prototype.getDpcValue = function (key) {
                if (!this.enabled) {
                    return;
                }
                if (!this.swacComponent) {
                    throw new Error('Component not created');
                }
                if (!this.swacComponent.root.open(key)) {
                    throw new Error('DPC key is not present');
                }
                return this.swacComponent.root.open(key).get();
            };
            SwacComponentManager.$inject = ['$window', '$log', '$q', 'common.services.ui.authentication', 'common.services.component.uiComponentService', '$rootScope'];
            return SwacComponentManager;
        }());
        framework.SwacComponentManager = SwacComponentManager;
        angular.module('siemens.simaticit.common.services.component').service('common.services.component.swacComponentManager', SwacComponentManager);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=swac-component-mgr-svc.js.map