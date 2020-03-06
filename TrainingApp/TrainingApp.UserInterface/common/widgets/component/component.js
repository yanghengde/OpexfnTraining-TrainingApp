/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
   * @ngdoc module
   * @name siemens.simaticit.common.widgets.component
   *
   * @description
   * This module provides functionalities related to SWAC and UI Components.
   */
    angular.module('siemens.simaticit.common.widgets.component', []);
})();

(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name sitComponent
     * @module siemens.simaticit.common.widgets.component
     * @description
     * The component directive is responsible for loading a UI or SWAC Component and placing them in virtual grid provided by the
     * {@link sitContainer sit-container} directive.
     *
     * Additionally, this directive:
     *  * is responsible for resizing and placing the components on the window.
     *  * handles the events raised by the sit-container directive and performs the required actions.
     *
     * <div class="admonition admonition-note">
     *  Although this directive could be used to create custom mashups of UI and SWAC Components, it is primarily used internally
     *  within automatically-generated Mashup UI Modules.
     * </div>
     *
     * @requires common.services.component.swacComponentService
     * @requires common.services.component.uiComponentService
     *
     * @usage
     * As an element:
     * ```
     *  <sit-container sit-isswac="true">
     *      <sit-component
     *          sit-name="Native_SWAC"
     *          sit-type="swac"
     *          sit-source="http://localhost:52082/swac.html#/examples"
     *          sit-left="0"
     *          sit-top="0"
     *          sit-cols="8"
     *          sit-rows="10"
     *          sit-flavour="ui"></sit-component>
     *  </sit-container>
     * ```
     *
     * The sit-container directive creates an environment required by sit-component directive.
     *
     * @restrict E
     * @param {string} sit-name Unique name of the component.
     * @param {string} sit-source If the component type is SWAC, the source should contain the URL of the SWAC component.
     * If the component type is UI, the source is the directive name of the component.
     * @param {string} sit-componentname Specifies the actual name of the component. This property is applicable only for the components of the UI type.
     * @param {number} sit-left Specifies from which column the component should be rendered.
     * @param {number} sit-top Specifies from which row the component should be rendered.
     * @param {number} sit-row Specifies how many rows the component should contain.
     * @param {number} sit-column Specifies how many columns the component should contain.
     * @param {string} sit-flavor Specifies whether the component has a UI or background service (at present, only **ui** is supported).
     * @param {string} [sit-type="ui"] Specifies the type of component to be loaded. Supported values are: **swac** or **ui**.
     * @param {Object} sit-dpc Specifies the dpc of a component.
     *
     * @example
     * In the template:
     * ```
     * <sit-container sit-isswac="false">
     *      <sit-component
     *          sit-name="{{componentCtr.name}}"
     *          sit-componentname="{{componentCtr.name}}"
     *          sit-type="ui"
     *          sit-source="{{componentCtr.source}}"
     *          sit-left="0"
     *          sit-top="0"
     *          sit-cols="12"
     *          sit-rows="12"
     *          sit-flavor="ui"
     *          sit-dpc="componentCtr.dpc"></sit-component>
     * </sit-container>
     * ```
     * In the controller:
     * ```
     * (function () {
     *  'use strict';
     *   function ComponentController() {
     *   var vm = this;
     *
     *   init();
     *
     *  function init() {
     *      vm.name = 'buttonBox';
     *      vm.source = 'button-box';
     *      vm.dpc = {
     *      title:"",
     *      desc:""
     *      };
     *  }
     *  angular.module('moduleName').controller('componentController', ComponentController);
     * })();
     * ```
     */
    angular.module('siemens.simaticit.common.widgets.component').directive('sitComponent', ComponentDir).directive('sitInternal', InternalDirective);

    InternalDirective.$inject = ['$timeout'];
    function InternalDirective($timeout) {
        return {
            //require: ['^sitComponent'],
            restrict: 'EA',
            link: linkFn
        };

        function linkFn(scope, element, attributes) {
            var scopeid = attributes.sitInternal;
            var controller;
            if (scopeid === '' + scope.$id) {
                controller = scope.ComponentCtrl;
            } else {
                controller = scope.$parent.ComponentCtrl;
            }
            function informComponent() {
                controller.componentLoaded();
            }
            $timeout(informComponent);
        }
    }

    ComponentDir.$inject = [
        '$rootScope',
        'common.services.component.swacContainerService',
        'common.services.component.swacComponentService',
        'common.services.component.uiComponentService',
        '$timeout',
        'common.services.logger.service',
        '$compile'
    ];
    function ComponentDir($rootScope, swacContainerService, swacComponentService, uiComponentService, $timeout, logger, $compile) {
        return {
            restrict: 'E',
            require: ['^sitContainer', 'sitComponent'],
            bindToController: {
                name: '@sitName',
                source: '@sitSource',
                componentname: '@sitComponentname',
                left: '@sitLeft',
                top: '@sitTop',
                rows: '@sitRows',
                cols: '@sitCols',
                flavor: '@sitFlavor',
                type: '@sitType',
                dpc: '=?sitDpc',
                contracts: '=?sitContracts'
            },
            scope: true,
            template: ' ',
            controller: ComponentController,
            controllerAs: 'ComponentCtrl',
            compile: compile
        };

        function compile(element, attributes) {
            var timer;
            var containerController, componentController;

            attributes.isAttributesValid = validateAttributes();
            if (!attributes.isAttributesValid) {
                return undefined;
            }
            if (element.attr('gridster-item') === undefined) {
                element.html('<div ng-style="ComponentCtrl.componentStyle" name="{{ComponentCtrl.compName}}"></div>');
            } else {
                element.html('<div class="component-content" name="{{ComponentCtrl.compName}}"><section class="gridsteritem-helper"></section></div>');
                $rootScope.$emit('siemens.simaticit.common.widgets.component.gridster-loaded', true);
            }
            return {
                pre: pre,
                post: post
            };

            function logError(message) {
                logger.logError(message, attributes, 'sit-component');
            }

            function logInfo(message) {
                logger.logInfo(message, attributes, 'sit-component');
            }

            function isUndefinedOrEmpty(value) {
                return (undefined === value || '' === value);
            }

            function validateAttributes() {
                if (isUndefinedOrEmpty(attributes.sitName)) {
                    logError('name attribute can\'t be empty');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitType)) {
                    attributes.sitType = 'ui';
                } else {
                    attributes.sitType = angular.lowercase(attributes.sitType);
                    if ('ui' !== attributes.sitType && 'swac' !== attributes.sitType) {
                        logError('Invalid type attribute defined. Valid values are ui, swac');
                        return false;
                    }
                }
                if (isUndefinedOrEmpty(attributes.sitSource)) {
                    logError('source attribute can\'t be empty');
                    return false;
                }
                if ('ui' === attributes.sitType && isUndefinedOrEmpty(attributes.sitComponentname)) {
                    logError('componentname attribute can\'t be empty');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitLeft)) {
                    logError('left attribute can\'t be empty');
                    return false;
                }
                attributes.sitLeft = parseInt(attributes.sitLeft, 10);
                if (isNaN(attributes.sitLeft) || 0 > attributes.sitLeft) {
                    logError('Invalid left attribute. Specify valid integer greater than 0');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitTop)) {
                    logError('top attribute can\'t be empty');
                    return false;
                }
                attributes.sitTop = parseInt(attributes.sitTop, 10);
                if (isNaN(attributes.sitTop) || 0 > attributes.sitTop) {
                    logError('Invalid top attribute. Specify valid integer greater than 0');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitCols)) {
                    logError('cols attribute can\'t be empty');
                    return false;
                }
                attributes.sitCols = parseInt(attributes.sitCols, 10);
                if (isNaN(attributes.sitCols) || 1 > attributes.sitCols) {
                    logError('Invalid cols attribute. Specify valid integer greater than 1');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitRows)) {
                    logError('rows attribute can\'t be empty');
                    return false;
                }
                attributes.sitRows = parseInt(attributes.sitRows, 10);
                if (isNaN(attributes.sitRows) || 1 > attributes.sitRows) {
                    logError('Invalid rows attribute. Specify valid integer greater than 1');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitFlavor)) {
                    attributes.sitFlavor = 'ui';
                } else {
                    attributes.sitFlavor = angular.lowercase(attributes.sitFlavor);
                    if ('ui' !== attributes.sitFlavor) {
                        logError('Invalid flavor attribute defined. valid values are ui');
                        return false;
                    }
                }
                logInfo('Component attributes validated');
                return true;
            }

            function onReadySwac(name, component) {
                if (name !== componentController.compName) {
                    return;
                }
                swacComponentService.setComponentReady(componentController.compName, component);
                swacContainerService.onReadyUnsubscribe(onReadySwac);
                componentController.componentLoaded();
            }

            function onRemoveSwac(name) {
                if (name !== componentController.compName) {
                    return;
                }
                swacComponentService.setComponentRemoved(componentController.compName);
                swacContainerService.onRemoveUnsubscribe(onRemoveSwac);
                componentController.componentRemoved();
            }

            function pre(scope, element, attributes, controllers) {
                containerController = controllers[0];
                componentController = controllers[1];
                componentController.setContainerController(containerController);

                componentController.scopeid = scope.$id;
                componentController.compName = containerController.containerPrefix + componentController.name;
                //attach component's unique name to the element
                element[0].compName = componentController.compName;

                containerController.componentCreationStarted(componentController.compName, componentController.type);
                var container = element.children('div');
                if ('swac' === componentController.type) {
                    swacContainerService.onReadySubscribe(onReadySwac);
                    swacContainerService.onRemoveSubscribe(onRemoveSwac);
                    swacComponentService.loadComponent(componentController.compName, '', componentController.source,
                        container[0], 0, 0, '100%', '100%', componentController.flavor);
                    return;
                }
                var uiComponentTag = '<' + componentController.source + ' sit-internal="{{ComponentCtrl.scopeid}}" name="{{ComponentCtrl.compName}}" id="{{ComponentCtrl.name}}"';
                if ('' !== componentController.dpc && undefined !== componentController.dpc) {
                    for (var i = 0, dpcNames = Object.keys(componentController.dpc), len = Object.keys(componentController.dpc).length; i < len; i++) {
                        uiComponentTag += dpcNames[i] + '="ComponentCtrl.dpc.' + dpcNames[i] + '" ';
                    }
                }
                uiComponentTag += '/>';
                container.append($compile(uiComponentTag)(scope));
            }

            function post(scope, element) {
                if (attributes.gridMaxColumns !== undefined) {
                    var gridBoxheight = (window.screen.height - 100) / 12;
                    var __height = (gridBoxheight * parseInt(componentController.rows, 10)) - attributes.gridMargin;
                    element.attr('data-mobile-height', __height);
                }

                scope.$on('gridster-item-resized', onComponentResize);

                scope.$on('$destroy', function () {
                    swacContainerService.onReadyUnsubscribe(onReadySwac);
                    swacContainerService.onRemoveUnsubscribe(onRemoveSwac);
                    $timeout.cancel(timer);
                });

                function onComponentResize(sizes, elmnt) {
                    var args = {};
                    args.componentName = elmnt.$element[0].compName;
                    args.height = elmnt.getElementSizeY();
                    args.width = elmnt.getElementSizeX();
                    uiComponentService.onComponentResize(args);

                    componentController.invokeWindowResize();
                }
            }
        }
    }

    ComponentController.$inject = [
        '$rootScope',
        '$scope',
        '$element',
        '$timeout',
        '$attrs',
        'common.services.component.swacContainerService',
        'common.services.component.swacComponentService',
        'common.services.component.uiComponentService'
    ];
    function ComponentController($rootScope, $scope, $element, $timeout, attributes, swacContainerService, swacComponentService, uiComponentService) {
        var vm = this;
        var containerController;
        var cellSizeChangeEventHandler;
        var directiveController, componentInstance;

        activate();
        function activate() {
            vm.isAttributesValid = attributes.isAttributesValid;
            if (!vm.isAttributesValid) {
                return;
            }
            vm.componentStyle = {};
            exposeApi();
            handleEvents();

            updateGridParameters();
        }

        function exposeApi() {
            vm.componentLoaded = componentLoaded;
            vm.componentRemoved = componentRemoved;
            vm.setContainerController = setContainerController;
            vm.invokeWindowResize = invokeWindowResize;
        }

        function handleEvents() {
            cellSizeChangeEventHandler = $scope.$parent.$on('sit-container.cellSizeChanged', cellSizeChangeCallback);
            $scope.$on('$destroy', function () {
                cellSizeChangeEventHandler();
            });
        }

        function setContainerController(controller) {
            containerController = controller;
        }

        function componentLoaded() {
            if ('swac' !== vm.type) {
                directiveController = $element.find(vm.source).data('$' + vm.source + 'Controller');
                componentInstance = new UIComponentInstance(vm.compName, vm.componentname, vm.type, vm.contracts, directiveController, $rootScope);

                uiComponentService.addComponent(vm.compName, {
                    componentName: vm.componentname,
                    hub: directiveController,
                    instance: componentInstance
                });
            }
            //adding the swac component to the collection is done by swac component service internally
            //so no logic required for swac here
            containerController.componentCreationCompleted(vm.compName, vm.type);

            //Fix for Bug 41348: Bad visualization on nvd3 graph
            if ($element.find('.nvd3-svg').length > 0) {
                invokeWindowResize();
            }
        }

        function invokeWindowResize() {
            $timeout(function () {
                var htmlEvent = window.document.createEvent("HTMLEvents");
                htmlEvent.initEvent('resize', true, false);
                window.dispatchEvent(htmlEvent);
            });
        }

        function componentRemoved() {
            // for now no cleanup tasks
            //if ('swac' === vm.type) {
            //    // for now no cleanup tasks
            //} else {
            //    //any cleanup tasks
            //}
        }

        function prepareComponentStyle() {
            vm.componentStyle = {
                position: 'absolute',
                width: attributes.sitCols * vm.cellWidth + 'px',
                height: attributes.sitRows * vm.cellHeight + 'px',
                left: attributes.sitLeft * vm.cellWidth + 'px',
                top: attributes.sitTop * vm.cellHeight + 'px',
                overflow: 'auto'
            };
        }

        function updateGridParameters(height, width) {
            vm.cellWidth = width || 0;
            vm.cellHeight = height || 0;

            prepareComponentStyle();
        }

        function cellSizeChangeCallback(event, eventObj) {
            if (!eventObj) {
                return;
            }
            if (eventObj.containerPrefix !== containerController.containerPrefix) {
                return;
            }
            if (eventObj && eventObj.height && eventObj.width) {
                updateGridParameters(eventObj.height, eventObj.width);
            }
        }
    }
    /**
    * @ngdoc type
    * @name UIComponent
    * @module siemens.simaticit.common.widgets.component
    * @description
    * Within the controller of UI Components, it is possible to define some system callbacks to execute code in different stages of the
    * UI Component lifecycle, e.g. when the UI Component is rendered on the page or when it is destroyed. Additionally, the
    * {@link UIComponent#_onComponentReady _onComponentReady} callbacks provides access to a {@link UIComponentInstance} object which can be used to:
    *
    * * Call UI Component methods
    * * Emit UI Component events
    * * Read and write UI Component properties
    *
    * @example
    * The following example shows how to use the {@link UIComponent#_onComponentReady _onComponentReady} callback within a UI Component
    * controller to access UI Component properties, methods, and events.
    * ```
    *   // Within the UI Component Controller
    *   var self = this;
    *
    *   // A standard method definition
    *   self.loadData = function(entity){
    *       backendService.findAll(entity).then(function(data){
    *           // Emit the "onDataLoaded" event with one argument.
    *           self.instance.events.onDataLoaded.emit({length: data.value.length()});
    *       })
    *   }
    *
    *   self._onComponentReady = function(instance) {
    *       // Assign the UI Component instance to a local controller variable
    *       // so that it can be used within method definitions
    *       self.instance = instance;
    *       // Property initialization in case of empty value or no default
    *       if (!instance.properties.orderEntity.get()) {
    *           // Set the property without notifying listeners
    *           instance.properties.orderEntity.set('WorkOrder', false);
    *       }
    *       // Call a public method
    *       instance.methods.loadData.call(instance.properties.orderEntity.get());
    *   }
    * ```
    */
    /**
     * @ngdoc method
     * @name UIComponent#_onComponentReady
     * @module siemens.simaticit.common.widgets.component
     * @description
     * This method is called when all the UI and SWAC Components within the mashup screen have been loaded and all wires have been initialized.
     * @param {UIComponentInstance} instance A {@link UIComponentInstance} object containing methods, events, and properties.
     */
    /**
     * @ngdoc method
     * @name UIComponent#_onComponentDestroy
     * @module siemens.simaticit.common.widgets.component
     * @description
     * This method is called when the component is being destroyed.
     */
    /**
     * @ngdoc method
     * @name UIComponent#_onComponentResize
     * @module siemens.simaticit.common.widgets.component
     * @description
     * This method is called when the component is resized.
     * @param {Object} size An object containing the **height** and **width** of the UI Component, in pixels.
     */
    /**
     * @ngdoc method
     * @name UIComponent#_onDesignModeToggle
     * @module siemens.simaticit.common.widgets.component
     * @description
     * This method is called when design mode is enabled or disabled for the current mashup screen.
     * @param {boolean} isEnabled Whether design mode is enabled or not.
     */

    /**
    * @ngdoc type
    * @name UIComponentInstance
    * @module siemens.simaticit.common.widgets.component
    * @description
    * A representation of a UI Component instance at run time.
    * @property {Object} properties A dictionary of {@link UIComponentProperty} objects, each representing one of the UI Component properties.
    * @property {Object} methods A dictionary of {@link UIComponentMethod} objects, each representing one of the UI Component methods.
    * @property {Object} events A dictionary of {@link UIComponentEvent} objects, each representing one of the UI Component events.
    */
    function UIComponentInstance(id, name, type, contracts, componentController, $rootScope) {
        var self = this;
        var _id, _name, _controller, _$rootScope;

        activate();

        function activate() {
            init();
            if (undefined === contracts || null === contracts) {
                return;
            }
            processMethods(contracts.methods);
            processEvents(contracts.events);
            processProperties(contracts.properties, contracts.onPropertyChange);
        }

        function init() {
            _id = id;
            _name = name;
            /* for now type and contracts are not used
            _type = type;
            _contracts = contracts; */
            _controller = componentController;
            _$rootScope = $rootScope;

            self.methods = {};
            self.events = {};
            self.properties = {};
        }

        function processMethods(methods) {
            if (undefined === methods || null === methods || 0 === methods.length) {
                return;
            }
            for (var index = 0; index < methods.length; index++) {
                var methodName = methods[index];
                self.methods[methodName] = new UIComponentMethod(methodName, _controller);
            }
        }

        function processEvents(events) {
            if (undefined === events || null === events || 0 === events.length) {
                return;
            }
            for (var index = 0; index < events.length; index++) {
                var eventName = events[index];
                self.events[eventName] = new UIComponentEvent(eventName, _id, _name, _$rootScope);
            }
        }

        function processProperties(properties, onPropertyChange) {
            if (undefined === properties || null === properties) {
                return;
            }
            for (var index = 0, propertyNames = Object.keys(properties), count = propertyNames.length; index < count; index++) {
                var propertyName = propertyNames[index];
                var property = properties[propertyName];
                self.properties[propertyName] = new UIComponentProperty(propertyName, property, onPropertyChange);
            }
        }
    }

    /**
    * @ngdoc type
    * @name UIComponentMethod
    * @module siemens.simaticit.common.widgets.component
    * @description
    * A method defined on a {@link UIComponentInstance} object.
    */
    function UIComponentMethod(name, controller) {
        var self = this;

        activate();
        function activate() {
            self.call = call;
        }

        /**
         * @ngdoc method
         * @name UIComponentMethod#call
         * @module siemens.simaticit.common.widgets.component
         * @description
         * Calls the corresponding UI Component method with the specified parameters.
         * @param {any} ...params Zero or more parameters to pass to the method.
         */
        function call() {
            controller[name].apply(controller, arguments);
        }
    }
    /**
     * @ngdoc type
     * @name UIComponentEvent
     * @module siemens.simaticit.common.widgets.component
     * @description
     * An event defined on a {@link UIComponentInstance} object.
     */
    function UIComponentEvent(name, compID, compName, $rootScope) {
        var self = this;

        activate();
        function activate() {
            self.emit = emit;
        }

        /**
         * @ngdoc method
         * @name UIComponentEvent#emit
         * @module siemens.simaticit.common.widgets.component
         * @description
         * Emits the corresponding UI Component event with the specified arguments.
         * @param {any} ...args Zero or more arguments to emit with the event.
         */
        function emit(eventData) {
            $rootScope.$emit(compName + '.' + compID + '.' + name, eventData);
        }
    }
    /**
    * @ngdoc type
    * @name UIComponentProperty
    * @module siemens.simaticit.common.widgets.component
    * @description
    * A property defined on a {@link UIComponentInstance} object.
    * @property {any} default The default value of the property.
    * @property {boolean} readable Whether the property is readable or not.
    * @property {boolean} writable Whether the property is writable or not.
    * @property {function} onChange A callback function to be executed when the value of the property changes.
    * The callback takes two parameters, corresponding to the previous value and the current value.
    */
    function UIComponentProperty(propertyName, property, callback) {
        var self = this;
        var value = null;
        var containerCallback = null;

        activate();
        function activate() {
            self.default = property.default;
            self.readable = true; //property.permission
            self.writable = ('rw' === property.permission);
            self.onChange = null;

            self.get = get;
            self.set = set;

            //make a copy of the default and set as current value
            value = angular.copy(self.default);

            //methods and listeners to interact with container
            self._set = _set;
            containerCallback = callback;
        }

        /**
         * @ngdoc method
         * @name UIComponentProperty#get
         * @module siemens.simaticit.common.widgets.component
         * @description
         * Returns the value of the corresponding UI Component property.
         * @returns {any} The value of the property.
         */
        function get() {
            return value;
        }

        /**
         * @ngdoc method
         * @name UIComponentProperty#set
         * @module siemens.simaticit.common.widgets.component
         * @description
         * Sets the value of the corresponding UI Component property.
         * @param {any} value The value of the property.
         * @param {boolean} nodify If set to **true**, notify listeners that the property value changed.
         */
        function set(newValue, notify) {
            var oldValue = value;
            value = newValue;
            if (false === notify) {
                return;
            }
            invokeContainer(oldValue, newValue);
        }

        function _set(newValue, notify) {
            var oldValue = value;
            value = newValue;
            if (false === notify) {
                return;
            }
            invokeComponent(oldValue, newValue);
        }

        function invokeComponent(oldValue, newValue) {
            if (null === self.onChange) {
                return;
            }
            try {
                self.onChange.call(null, oldValue, newValue);
            } catch (ex) {
                //To catch exceptions while executing handler
            }
        }

        function invokeContainer(oldValue, newValue) {
            if (null === containerCallback) {
                return;
            }
            try {
                containerCallback.call(null, propertyName, oldValue, newValue);
            } catch (ex) {
                //To catch exceptions while executing handler
            }
        }
    }
})();

/// <reference path="../../scripts/swac/swac-base.js" />
(function () {
    'use strict';
    /**
     *  @ngdoc directive
     *  @name sitContainer
     *  @module siemens.simaticit.common.widgets.component
     *  @description
     *  This directive acts as a container for UI Components, SWAC Components and their respective Wires.
     *
     * <div class="admonition admonition-note">
     *  Although this directive could be used to create custom mashups of UI and SWAC Components, it is primarily used internally
     *  within automatically-generated Mashup UI Modules.
     * </div>
     *
     *  The directive performs the following tasks:
     *  * Initializes the SWAC container based on the configuration.
     *  * Prepares the layout (grid system) for the components, based on the size of the container.
     *  * Handles window resizing events and changes the layout accordingly.
     *  * Fires events on layout change.
     *
     * @requires common.services.component.swacComponentService
     * @requires common.services.component.uiComponentService
     * @requires $window
     * @requires $location
     * @requires $timeout
     * @requires common.services.logger.service
     *
     * @usage
     *  As element:
     *  ```
     *    <sit-container sit-isswac="true">
     *        <!-- ... UI/SWAC Components and Wires ... -->
     *   </sit-container>
     * ```
     *  @restrict E
     *  @param {boolean} [sit-isswac=false] If true, the container initializes a SWAC container.
     *
     * @example
     * This example shows how to create a simple mashup of three components.
     *
     * In the controller, t is necessary to define the converter code used used by each wire:
     *
     * ```
     * // component-dev-controller.js
     * (function(){
     *    angular.module('siemens.simaticit.common.examples').controller('MashupWireController', ['$scope',function ($scope) {
     *       var vm = this;
     *       this.Wire1Converters = {
     *          SWAC_Messenger1: function (input, parameter) {
     *           for (var index = 0; index < input.length; index++) {
     *               if (input[index]) {
     *                   return input[index];
     *               }
     *           }
     *       }
     *   };
     *
     *   this.Wire3Converters = {
     *       messenger2: function (input, parameter) {
     *           for (var index = 0; index < input.length; index++) {
     *               if (input[index]) {
     *                   return input[index];
     *               }
     *           }
     *       },
     *       messenger3: function (input, parameter) {
     *           for (var index = 0; index < input.length; index++) {
     *               if (input[index]) {
     *                   return input[index];
     *               }
     *           }
     *       }
     *   };
     * })();
     *
     * ```
     *
     * In the template, the component and wires must be placed within a container:
     *
     * ```
     *   <!-- component-dev-tpl.html -->
     *    <sit-container sit-isswac="true">
     *        <sit-component
     *          sit-name="SWAC_Messenger1"
     *          sit-type="swac"
     *          sit-source="common/examples/component/swac/index.html"
     *          sit-left="0" sit-top="1" sit-cols="3" sit-rows="11" sit-flavor="ui"></sit-component>
     *        <sit-component
     *          sit-name="messenger2"
     *          sit-type="ui"
     *          sit-source="chat-messenger"
     *          sit-componentname="chatMessenger"
     *          sit-left="4" sit-top="3" sit-cols="3" sit-rows="9" sit-flavor="ui"></sit-component>
     *        <sit-component
     *          sit-name="messenger3"
     *          sit-type="ui"
     *          sit-source="chat-messenger"
     *          it-componentname="chatMessenger"
     *          sit-left="8" sit-top="2" sit-cols="3" sit-rows="9" sit-flavor="ui"></sit-component>
     *
     *        <sit-wire
     *          sit-name="wire1"
     *          sit-inputcomponents="messenger3"
     *          sit-inputevents="newMessageTyped"
     *          sit-outputcomponents="messenger2"
     *          sit-outputapis="getChatMessage"
     *          sit-converters="mashup.Wire1Converters"
     *          sit-inputtypes="ui"
     *          sit-outputtypes="ui"></sit-wire>
     *        <sit-wire
     *          sit-name="wire3"
     *          sit-inputcomponents="SWAC_Messenger1"
     *          sit-inputevents="newMessageTyped"
     *          sit-outputcomponents="messenger2,messenger3"
     *          sit-outputapis="getChatMessage,getChatMessage"
     *          sit-converters="mashup.Wire3Converters"
     *          sit-inputtypes="swac"
     *          sit-outputtypes="ui,ui"></sit-wire>
     *   </sit-container>
     * ```
     * <div class="admonition admonition-note">
     *  At present, only one sit-container directive can be instantiated within a screen.
     * </div>
     */
    angular.module('siemens.simaticit.common.widgets.component').directive('sitContainer', ContainerDirective);

    ContainerDirective.$inject = ['common.services.component.swacContainerService', 'common.services.component.uiComponentService', '$window',
        '$location', '$timeout', 'common.services.logger.service', 'common.services.umc'];
    function ContainerDirective(swacContainerService, uiComponentService, $window, $location, $timeout, logger, umcService) {
        return {
            restrict: 'E',
            scope: false,
            controller: ContainerController,
            controllerAs: 'ContainerCtrl',
            compile: compile
        };

        function compile(element, attributes) {
            var timer, isSwac = false, scope, controller, componentsCount, onContainerResize;
            if (!validateAttributes()) {
                return undefined;
            }
            componentsCount = element.find('sit-component').length;
            isSwac = attributes.sitIsswac;
            if (isSwac) {
                swacContainerService.setCreateTimeOut(20000);
                swacContainerService.setInternalTimeOut(20000);
                swacContainerService.setProxyFunctionsTimeOut(20000);
                swacContainerService.setProxyEventsTimeOut(20000);

                var url = $location.absUrl();
                url = url.substring(0, url.lastIndexOf('#'));
                url = url.substring(0, url.lastIndexOf('/'));
                swacContainerService.setContainerBaseLibrary(url + '/common/scripts/swac-base.js');

                if ((umcService.WebSSO) && (umcService.WebSSO.service)) {
                    swacContainerService.registerService('UMCSSO', umcService.WebSSO.service);
                }
                else {
                    logError('umcService WebSSO undefined');
                }
            }
            return {
                pre: pre,
                post: post
            };

            function logError(message) {
                logger.logError(message, attributes, 'sit-container');
            }

            function isUndefinedOrEmpty(value) {
                return (undefined === value || '' === value);
            }

            function validateAttributes() {
                if (isUndefinedOrEmpty(attributes.sitIsswac)) {
                    attributes.sitIsswac = false;
                    return true;
                }
                var isswac = angular.lowercase(attributes.sitIsswac);
                if ('true' !== isswac && 'false' !== isswac) {
                    logError('Invalid isswac attribute defined. isswac accepts true or false');
                    return false;
                }
                attributes.sitIsswac = ('true' === isswac);
                return true;
            }

            function onResize(height, width) {
                controller.cellHeight = Math.floor(height / 12);
                controller.cellWidth = Math.floor(width / 12);
                scope.$broadcast('sit-container.cellSizeChanged', {
                    containerPrefix: controller.containerPrefix,
                    height: controller.cellHeight,
                    width: controller.cellWidth
                });
            }

            function pre($scope, element, attributes, ctrl) {
                scope = $scope;
                controller = ctrl;

                controller.isSwac = isSwac;
                //initialize unique container prefix to be appended for the components
                if (undefined !== attributes.sitGroupName) {
                    controller.containerPrefix = attributes.sitGroupName + '_';
                } else {
                    controller.containerPrefix = 'c' + scope.$id + '_';
                }
                controller.setComponentsCount(componentsCount);

                onContainerResize = function () {
                    onResize(element.parent().parent().height(), element.parent().parent().width());
                    scope.$apply();
                }

                //Call Resize once everything done
                timer = $timeout(function () {
                    angular.element($window).bind('resize', onContainerResize);
                    onResize(element.parent().parent().height(), element.parent().parent().width());
                });
            }

            function post(scope, element) {
                element.wrap('<div style="position:relative;width:100%;height:100%;"></div>');
                scope.$on('$destroy', onContainerDestroy);
            }

            function onContainerDestroy() {
                controller.close();
                angular.element($window).unbind('resize', onContainerResize);
                $timeout.cancel(timer);
            }
        }
    }

    ContainerController.$inject = ['common.services.component.swacContainerService', 'common.services.component.swacComponentService',
        'common.services.component.uiComponentService', '$rootScope', '$timeout', 'common.services.logger.service'];
    function ContainerController(swacContainerService, swacComponentService, uiComponentService, $rootScope, $timeout, logger) {
        var vm = this;
        var componentsCount = 0;
        var uiComponents = [];
        var swacComponents = [];

        activate();
        function activate() {
            vm.isSwac = false;
            vm.cellHeight = 0;
            vm.cellWidth = 0;
            vm.containerPrefix = '';

            exposeApi();
        }

        function exposeApi() {
            vm.setComponentsCount = setComponentsCount;
            vm.componentCreationStarted = componentCreationStarted;
            vm.componentCreationCompleted = componentCreationCompleted;
            vm.componentCreationFailed = componentCreationFailed;
            vm.close = close;
        }

        function setComponentsCount(count) {
            componentsCount = count;
        }

        function componentCreationStarted(componentName, componentType) {
            logger.logDebug('Component creation started for component:' + componentType + ':' + componentName, null, 'sit-container');
            if ('swac' === componentType) {
                swacComponents.push(componentName);
            } else {
                uiComponents.push(componentName);
            }
        }

        function componentCreationCompleted(componentName, componentType) {
            logger.logDebug('Component creation completed for component:' + componentType + ':' + componentName, null, 'sit-container');
            componentsCount--;
            start();
        }

        function componentCreationFailed(componentName, componentType) {
            logger.logDebug('Component creation failed for component:' + componentType + ':' + componentName, null, 'sit-container');
            componentsCount--;
            start();
        }

        function start() {
            if (0 < componentsCount) {
                return;
            }
            uiComponentService.handleEvents(vm.containerPrefix);
            swacComponentService.handleEvents(vm.containerPrefix);
            uiComponentService.startComponents();

            invokeWindowResize();
            $rootScope.$broadcast('siemens.simaticit.common.widgets.container.mashupReady', vm.containerPrefix);
        }

        function close() {
            if (swacComponents.length > 0) {
                swacContainerService.closeContainer(swacComponents);
            }
            if (uiComponents.length > 0) {
                uiComponentService.removeComponents(uiComponents);
            }
        }

        function invokeWindowResize() {
            $timeout(function () {
                var htmlEvent = window.document.createEvent("HTMLEvents");
                htmlEvent.initEvent('resize', true, false);
                window.dispatchEvent(htmlEvent);
            });
        }
    }
})();

(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name sitWire
     * @module siemens.simaticit.common.widgets.component
     * @description
     * The sitWire directive provides communication between components.
     * The directive handles the events of one component and calls the functions of another component, based on the configuration.
     *
     * <div class="admonition admonition-note">
     *  Although this directive could be used to create custom mashups of UI and SWAC Components, it is primarily used internally
     *  within automatically-generated Mashup UI Modules.
     * </div>
     *
     * @requires common.services.component.swacComponentService
     * @requires common.services.component.uiComponentService
     * @requires common.services.logger.service
     *
     *  @usage
     *    As element:
     *    ```
     *    <sit-container sit-isswac="true">
     *        <!-- ... UI/SWAC Components ... -->
     *
     *        <sit-wire
     *          sit-name="wire1"
     *          sit-inputcomponents="messenger3"
     *          sit-inputevents="newMessageTyped"
     *          sit-outputcomponents="messenger2"
     *          sit-outputapis="getChatMessage"
     *          sit-converters="mashup.Wire1Converters"
     *          sit-inputtypes="ui"
     *          sit-outputtypes="ui"></sit-wire>
     *   </sit-container>
     *    ```
     *
     *  For more information on how to use this directive, see the example provided for the {@link sitContainer sit-container} directive.
     *
     *   @restrict E
     *   @param {string} name Name of the wire.
     *   @param {string} inputcomponents Contains the list of input component names, separated by a comma.
     *   @param {string} inputtypes Contains the list of input component types, separated by a comma.
     *   @param {string} inputevents Contains the list of input component event names to be wired with output components.
     *   @param {string} outputcomponents Contains the list of output component names, separated by a comma.
     *   @param {string} outputtypes Contains the list of output component types, separated by a comma.
     *   @param {string} outputapis Contains the list of output component function names to be wired with input components.
     *   @param {Object} converters _(Optional)_ Converter object, which is used for processing input event data.
     *                   This object should contain the converter functions for each output component.
     *
     *
     */

    angular.module('siemens.simaticit.common.widgets.component').directive('sitWire', WireDirective);

    WireDirective.$inject = ['common.services.component.swacComponentService', 'common.services.component.uiComponentService', 'common.services.logger.service'];
    function WireDirective(swacComponentService, uiComponentService, logger) {
        return {
            restrict: 'E',
            require: ['^sitContainer', 'sitWire'],
            bindToController: {
                name: '@sitName', inputcomponents: '@sitInputcomponents', inputevents: '@sitInputevents', outputcomponents: '@sitOutputcomponents',
                outputapis: '@sitOutputapis', converters: '&sitConverters', inputtypes: '@sitInputtypes', outputtypes: '@sitOutputtypes'
            },
            scope: {},
            controller: WireController,
            controllerAs: 'WireCtrl',
            link: link
        };

        function link(scope, element, attributes, controllers) {
            var containerController = controllers[0];
            var wireController = controllers[1];
            var containerPrefix = containerController.containerPrefix;

            var valueCache = [];
            var inputComponents, inputTypes, inputEvents;
            var outputComponents, outputTypes, outputApis;
            var converters = wireController.converters();

            if (!validateAttributes()) {
                return;
            }

            try {
                resetValueCache();
                for (var i = 0; i < inputComponents.length; i++) {
                    var inputComponent = inputComponents[i];
                    var inputType = inputTypes[i];
                    var inputEvent = inputEvents[i];

                    if ('ui' !== inputType && 'swac' !== inputType) {
                        logError('Invalid type attribute defined for input component. Valid values are ui, swac', {
                            'component': inputComponent,
                            'type': inputType,
                            'api': inputEvent
                        });
                        continue;
                    }

                    var handler = createHandler(i);
                    if ('swac' === inputType) {
                        swacComponentService.handleComponentEvent(containerPrefix + inputComponent, inputEvent, handler);
                    } else {
                        uiComponentService.handleComponentEvent(containerPrefix + inputComponent, inputEvent, handler);
                    }
                }
            } catch (ex) {
                logError('Error occurred while configuring wire', {
                    'exception': ex
                });
            }

            function logError(message, data) {
                if (undefined === data) {
                    data = attributes;
                }
                logger.logError(message, data, 'sit-wire');
            }

            function isUndefinedOrEmpty(value) {
                return (undefined === value || '' === value);
            }

            function isArrayContainsBlankStrings(array) {
                for (var i = 0; i < array.length; i++) {
                    if (isUndefinedOrEmpty(array[i])) {
                        return true;
                    }
                }
                return false;
            }

            function isArrayContainsAllBlankStrings(array) {
                for (var i = 0; i < array.length; i++) {
                    if (!isUndefinedOrEmpty(array[i])) {
                        return false;
                    }
                }
                return true;
            }

            function validateAttributes() {
                if (isUndefinedOrEmpty(attributes.sitName)) {
                    logError('name attribute can\'t be empty');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitInputcomponents)) {
                    logError('No input components specified to execute wire.');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitInputtypes)) {
                    logError('type of input components is not specified.');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitInputevents)) {
                    logError('events of the input component which should be linked with wire are not specified.');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitOutputcomponents)) {
                    logError('No output components specified to execute wire.');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitOutputtypes)) {
                    logError('type of output components is not specified.');
                    return false;
                }

                if (isUndefinedOrEmpty(attributes.sitOutputapis)) {
                    logError('api of output components which should be linked with wire are not specified.');
                    return false;
                }

                inputComponents = attributes.sitInputcomponents.split(',');
                if (0 === inputComponents.length || isArrayContainsBlankStrings(inputComponents)) {
                    logError('Input components contain blank values.');
                    return false;
                }

                inputTypes = attributes.sitInputtypes.split(',');
                if (0 === inputTypes.length || isArrayContainsBlankStrings(inputTypes)) {
                    logError('Inputtypes contain blank values.');
                    return false;
                }
                if (inputComponents.length !== inputTypes.length) {
                    logError('Input components count is not matching with input types count');
                    return false;
                }

                inputEvents = attributes.sitInputevents.split(',');
                if (0 === inputEvents.length || isArrayContainsBlankStrings(inputEvents)) {
                    logError('Inputevents contains blank values.');
                    return false;
                }
                if (inputComponents.length !== inputEvents.length) {
                    logError('Input components count is not matching with input events count');
                    return false;
                }

                outputComponents = attributes.sitOutputcomponents.split(',');
                if (0 === outputComponents.length || isArrayContainsAllBlankStrings(outputComponents)) {
                    logError('No valid output components specified to execute wire.');
                    return false;
                }

                outputTypes = attributes.sitOutputtypes.split(',');
                if (0 === outputTypes.length || isArrayContainsAllBlankStrings(outputTypes)) {
                    logError('No valid output components types specified to execute wire.');
                    return false;
                }
                if (outputComponents.length !== outputTypes.length) {
                    logError('Output components count is not matching with output types count');
                    return false;
                }

                outputApis = attributes.sitOutputapis.split(',');
                if (0 === outputApis.length || isArrayContainsAllBlankStrings(outputApis)) {
                    logError('No valid output components api specified to execute wire.');
                    return false;
                }
                if (outputComponents.length !== outputApis.length) {
                    logError('Output components count is not matching with output api count');
                    return false;
                }
                return true;
            }

            /**
             * @ngdoc method
             * @name sitWire#createHandler
             * @module app
             * @description Creating handler
             * @param {number} index
             */
            function createHandler(index) {
                return function (data) {
                    valueCache[index] = data;
                    executeWireResponse();
                };
            }

            /**
             * @ngdoc method
             * @name sitWire#resetValueCache
             * @module app
             * @description Function to reset valuecache array
             */
            function resetValueCache() {
                for (var i = 0; i < inputComponents.length; i++) {
                    valueCache[i] = undefined;
                }
            }

            /**
             * @ngdoc method
             * @name sitWire#defaultConverter
             * @module app
             * @description The converter used by default, if a component does not have its own converter
             */
            function defaultConverter(input) {
                for (var index = 0; index < input.length; index++) {
                    if (input[index]) {
                        return input[index];
                    }
                }
                return null;
            }

            /**
             * @ngdoc method
             * @name sitWire#executeWireResponse
             * @module app
             * @description response handling
             */
            function executeWireResponse() {
                for (var i = 0; i < outputComponents.length; i++) {
                    try {
                        var outputComponent = outputComponents[i];
                        var outputType = outputTypes[i];
                        var outputApi = outputApis[i];

                        if (isUndefinedOrEmpty(outputComponent) || isUndefinedOrEmpty(outputType) || isUndefinedOrEmpty(outputApi)) {
                            logError('required attribute information is not available for the output component', {
                                'component': outputComponent,
                                'type': outputType,
                                'api': outputApi
                            });
                            continue;
                        }

                        if ('ui' !== outputType && 'swac' !== outputType) {
                            logError('Invalid type attribute defined for output component. Valid values are ui, swac', {
                                'component': outputComponent,
                                'type': outputType,
                                'api': outputApi
                            });
                            continue;
                        }
                        var converter = (undefined !== converters && converters.hasOwnProperty(outputComponent)) ? converters[outputComponent] : defaultConverter;
                        var output = converter(valueCache, undefined);
                        if (!(output instanceof Array)) {
                            output = [output];
                        }
                        if ('swac' === outputType) {
                            swacComponentService.callComponentFunction(containerPrefix + outputComponent, outputApi, output);
                        } else {
                            uiComponentService.callComponentFunction(containerPrefix + outputComponent, outputApi, output);
                        }
                    } catch (ex) {
                        logError('Error occurred while executing wire response', {
                            'exception': ex
                        });
                    }
                }
                resetValueCache();
            }
        }
    }

    function WireController() {
        //the attributes are bound to this controller
    }

})();
