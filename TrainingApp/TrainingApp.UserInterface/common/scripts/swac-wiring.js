/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

/* Version 1.5.1, copyright (C) 2019, Siemens AG. All Rights Reserved. */


(function () {
  var swacWiringModule = function (SWAC) {

///////////////////////////////////////////
// lib/container/wire.js

/**
 * Object that manage wiring between inputs object (SWAC Component / Custom Javascript Object/ Other wire) and output object (SWAC Componet / Custom Javascript Object)
 *
 * @class SWAC.Wire
 * @constructor
 * @parameter {String} name Name of the wire
 * @parameter {Object} inputDescription input object of wire
 * @parameter {Object} outputDescription output object of wire
 * @parameter {Object} converter converter for the wiring
 * @parameter {Object} parameter additional parameter
 * @parameter {Object} options options for the wire
 * @parameter {Object} store object used by converter. Same instance used every time converter is called
 * 
 */
SWAC.Wire = function (name, inputDescription, outputDescription, converter, parameter, options, store) {

  //////////////
  // PRIVATE   //
  //////////////

  var _that = this,

      _name = name,

      _converter = converter,

      _parameter = parameter,

      _options = options || {},

      _input = SWAC._internal.Utils.isArray(inputDescription) ? inputDescription : [inputDescription],

      _output = outputDescription,

      _state = 'unwired',

      _subscriptions = [],

      _valueCache = [],
      _converterStore = store || {},

      _setOutput = null,

      _onWired = new SWAC.Eventing.Publisher('onWired'),
      _onUnwired = new SWAC.Eventing.Publisher('onUnWired'),
      _onValueChanged = new SWAC.Eventing.Publisher('onValueChanged'),
      _onOutputChanged = new SWAC.Eventing.Publisher('onOutputChanged'),

        /**
       * Remove subscription to all input sources
       *
       * @protected
       * @method unwire
       * @param {boolean} clean if true wire is mantained 
       * @return {object} returns if unwire has been successfully executed
       */
      _unwire = function (clean) {
        var dep, obj, hdl, i = 0;

        clean = clean || false;

        for (i = _subscriptions.length - 1; i >= 0; i--) {
          dep = _subscriptions[i][0];
          obj = _subscriptions[i][1];
          hdl = _subscriptions[i][2];
          try {
            dep[obj].unsubscribe(hdl);
          } catch (ex) {
            SWAC.Logging.log('Wire ' + _name + ': A handler could not be unsubscribed while unwiring...', SWAC.Logging.Level.Internal);
            return false;
          }
        }

        // Remove subscriptions
        _subscriptions = [];

        // Remove cache
        _valueCache = [];
        _setOutput = null;

        if (!clean) {
          _state = 'unwired';
          if (_options.removeOnUnwired) {
            SWAC.Wiring._internal.remove(_that);
          }
          _onUnwired.notify({ name: _name });
          SWAC.Wiring._internal.toUnwired(_that);
        }
        return true;
      },

      /**
       * Remove the wire
       *
       * @method remove
       * @return {Boolean} returns True if wire deletion succeeded, false otherwise
       */
      _remove = function () {
        var retVal = true;
        if (_state !== 'unwired') {
          retVal = _unwire();
        }
        retVal = SWAC.Wiring._internal.remove(_that);
        return retVal;
      },

      /**
      * Executes the wire
      *
      * @private
      * @method _executeWire
      * @param {Numeric} inputIdx Index of input that triggers the wiring
      */
      _executeWire = function (inputIdx) {
        var output = null;

        try {
          output = _converter ? _converter(_valueCache, _parameter, inputIdx, _converterStore) : _valueCache; // Direct pass through of no converter is set.
        }
        catch (err) {
          if (err instanceof SWAC.Wiring.CancelExecutionException) {
            SWAC.Logging.log('SWAC.Wiring.CancelExecutionException has been thrown for wire ' + _name, SWAC.Logging.Level.Internal);
            return;
          }
          else {
            SWAC.Logging.log('Exception has been thrown for wire ' + _name + ': ' + err, SWAC.Logging.Level.Internal);
            if (_options.removeOnFailure) {
              SWAC.Logging.log('removeOnFailure option is true, wire ' + _name + ' will be removed', SWAC.Logging.Level.Internal);
              _remove();
            } // does unwire internally
            else { _unwire(); } // Remove subscriptions made so far.
            throw err;
          }
        }
        SWAC.Logging.log('Wire ' + _name + ' was fired with output: ' + JSON.stringify(output), SWAC.Logging.Level.External);

        try {
          if (_state === 'loose') {
            SWAC.Logging.log('Wire ' + _name + ', loose end... forwarding data', SWAC.Logging.Level.External);
            _onValueChanged.notify(output);
          } else if (_setOutput) {
            // Output can be either a DPC or a method call
            _setOutput(output);
          }
          else {
            SWAC.Logging.log(_name + ' is not a loose wire but there is no output', SWAC.Logging.Level.External);
          }
        }
        catch (e) {
          SWAC.Logging.log('Exception has been thrown for wire ' + _name + ': ' + e, SWAC.Logging.Level.Internal);
          if (_options.removeOnFailure) {
            SWAC.Logging.log('removeOnFailure option is true, wire ' + _name + ' will be removed', SWAC.Logging.Level.Internal);
            _remove();
          } // does unwire internally
          else { _unwire(); } // Remove subscriptions made so far.
        }
      },

      /**
      * Puts the entry in cache
      *
      * @private
      * @method _setCacheEntry
      * @param {String} index position in the cache of the entry
      */
      _setCacheEntry = function (index) {
        return function (value) {
          _valueCache[index] = value;
        };
      },

      /**
       * Subscribe to all input sources and connect the components
       *
       * @protected
       * @method wire
       * @return {Boolean} returns if wire has been successfully executed
       */
      _wire = function () {
        var eventHandler,
          node,
          dpcHandler,
          entry,
          i = 0,
          comp,
          wire,
          wireHandler,
          apiout,
          dpcout,
          apiInterface, intfItem, interfaceName,
          source, target,
          createHandler = function (index, dpc) {
            return function (event) {
              if (!dpc) {
                _valueCache[index] = event.data;
                try {
                  _executeWire(index);
                }
                catch (ex) {
                  SWAC.Logging.log('Wiring execution error: ' + ex, SWAC.Logging.Level.External);
                }
              }
              else {
                if (dpc.beginGet) {
                  dpc.beginGet().then(function (value) {
                    _valueCache[index] = value;
                    try {
                      _executeWire(index);
                    }
                    catch (ex) {
                      SWAC.Logging.log('Wiring execution error: ' + ex, SWAC.Logging.Level.External);
                    }
                  });
                }
                else {
                  _valueCache[index] = dpc.get();
                  try {
                    _executeWire(index);
                  }
                  catch (ex) {
                    SWAC.Logging.log('Wiring execution error: ' + ex, SWAC.Logging.Level.External);
                  }
                }
              }
            };
          };

        try {
          // Subscribe to all input sources
          var succCallback = function (idx) {
            return function (value) {
              _setCacheEntry(idx)(value);
              if (dpcHandler) {
                dpcHandler();
              }
            };
          };
          for (i = 0; i < _input.length; i++) {
            entry = _input[i];
            if (entry.component) {
              comp = SWAC.Container.get({ name: entry.component });
              if (entry.event) {
                if ((entry.event.indexOf('.') === -1) && comp.proxy[entry.event]) {
                  eventHandler = createHandler(i);
                  comp.proxy[entry.event].subscribe(eventHandler);
                  _subscriptions.push([comp.proxy, entry.event, eventHandler]);
                  _valueCache.push(null);
                  SWAC.Logging.log('Subscribed to event ' + entry.event, SWAC.Logging.Level.External);
                } else if (entry.event.indexOf('.') !== -1) {

                  apiInterface = entry.event.substr(entry.event.lastIndexOf('.') + 1);
                  interfaceName = entry.event.substr(0, entry.event.lastIndexOf('.'));

                  intfItem = SWAC.Wiring._internal.getInterfaceItem(entry.component, interfaceName);
                  if (intfItem !== null) {
                    if (intfItem.intf[apiInterface]) {
                      eventHandler = createHandler(i);
                      intfItem.intf[apiInterface].subscribe(eventHandler);
                      _subscriptions.push([intfItem.intf, apiInterface, eventHandler]);
                      _valueCache.push(null);
                      SWAC.Logging.log('Subscribed to ' + interfaceName + ' interface event ' + apiInterface, SWAC.Logging.Level.External);
                    }
                  }
                }
              } else if (entry.dpc && comp.dpc) {
                node = comp.dpc.open(entry.dpc);
                if (node) {
                  dpcHandler = createHandler(i, node);
                  node.onValueChanged.subscribe(dpcHandler);
                  _subscriptions.push([node, 'onValueChanged', dpcHandler]);
                  _valueCache.push(null);
                  node.beginGet().then(
                      succCallback(i)
                      );
                  SWAC.Logging.log('Subscribed to ' + entry.dpc + ' DPC', SWAC.Logging.Level.External);
                }
              }
            }
            else if (entry.custom) {
              source = typeof (entry.custom) === 'object' ? entry.custom : window[entry.custom];
              if (entry.event && source[entry.event]) {
                eventHandler = createHandler(i);
                source[entry.event].subscribe(eventHandler);
                _subscriptions.push([source, entry.event, eventHandler]);
                _valueCache.push(null);
                SWAC.Logging.log('Subscribed to custom event', SWAC.Logging.Level.External);
              } else if (entry.dpc && source.dpc) {
                node = source.dpc.open(entry.dpc);
                if (node) {
                  dpcHandler = createHandler(i, node);
                  node.onValueChanged.subscribe(dpcHandler);
                  _subscriptions.push([node, 'onValueChanged', dpcHandler]);
                  _valueCache.push(null);
                  _valueCache[i] = node.get();
                  dpcHandler();
                  SWAC.Logging.log('Subscribed to custom DPC', SWAC.Logging.Level.External);
                }
              }
            }
            else if (entry.wire) {
              wire = SWAC.Wiring.get({ name: entry.wire });
              
              wireHandler = createHandler(i);
              if(wire){
                if (!wire.description.output) {
                  wire.onValueChanged.subscribe(wireHandler);
                  _subscriptions.push([wire, 'onValueChanged', wireHandler]);
                }
                else {
                  wire.onOutputChanged.subscribe(wireHandler);
                  _subscriptions.push([wire, 'onOutputChanged', wireHandler]);
                }
                _valueCache.push(null); //no initial value ... we cannot force converter execution
                SWAC.Logging.log('Subscribed to  wire ' + entry.wire, SWAC.Logging.Level.External);
              }
            }
          }
        } catch (ex) {
          SWAC.Logging.log('Wiring went wrong for wire ' + _name + '. Exception: ' + ex, SWAC.Logging.Level.Internal);
          if (_options.removeOnFailure) {
            SWAC.Logging.log('removeOnFailure option is true, wire ' + _name + ' will be removed', SWAC.Logging.Level.Internal);
            _remove();
          } // does unwire internally
          else { _unwire(); } // Remove subscriptions made so far.
          return false;
        }

        if (_output) {
          try {
            if (_output.component && _output.method) {
              if (_output.method.indexOf('.') === -1) {
                apiout = SWAC.Container.get({ name: _output.component });
                _setOutput = function (value) {
                  if (!(value instanceof Array)) {
                    value = [value];
                  }
                  apiout.proxy[_output.method].apply(apiout, value).then(function (data) {                    
                      _onOutputChanged.notify(data);
                  });
                };
              }
              else {
                // Method from an Interface
                apiInterface = _output.method.substr(_output.method.lastIndexOf('.') + 1);
                interfaceName = _output.method.substr(0, _output.method.lastIndexOf('.'));
                intfItem = SWAC.Wiring._internal.getInterfaceItem(_output.component, interfaceName);
                if (intfItem !== null) {
                  _setOutput = function (value) {
                    if (!(value instanceof Array)) {
                      value = [value];
                    }
                    intfItem.intf[apiInterface].apply(intfItem.intf, value).then(function (data) {                     
                        _onOutputChanged.notify(data);
                    });
                  };
                }
              }
            }
            else if (_output.component && _output.dpc) {
              dpcout = SWAC.Container.get({ name: _output.component });
              if (dpcout.dpc) {
                  _setOutput = function (value) {
                      dpcout.dpc.open(_output.dpc).beginSet(value).then(function (data) {
                        _onOutputChanged.notify(data.data);
                      });
                  };
              }
              else {
                _setOutput = null;
              }
            } else if (_output.custom) {
              target = typeof (_output.custom) === 'object' ? _output.custom : window[_output.custom];
              if (_output.method) {
                _setOutput = function (value) {
                  if (!(value instanceof Array)) {
                    value = [value];
                  }
                  apiout = target[_output.method].apply(target, value);
                  if (apiout && typeof apiout.then === 'function') {
                      apiout.then(function (data) {                 
                          _onOutputChanged.notify(data);                         
                      });
                  }
                  else {
                    _onOutputChanged.notify(apiout);
                  }
                };
              } else if (_output.dpc) {
                _setOutput = function (value) {
                  target.dpc.open(_output.dpc).beginSet(value).then(function (data) {
                    _onOutputChanged.notify(data.data);
                  });
                };
              }
            }
            _state = 'wired';
            _onWired.notify({ name: _name });
            SWAC.Wiring._internal.toWired(_that);
          }
          catch (ex) {
            SWAC.Logging.log('Wiring went wrong for wire ' + _name + '. Exception: ' + ex, SWAC.Logging.Level.Internal);
            if (_options.removeOnFailure) {
              SWAC.Logging.log('removeOnFailure option is true, wire ' + _name + ' will be removed', SWAC.Logging.Level.Internal);
              _remove();
            } // does unwire internally
            else { _unwire(); } // Remove subscriptions made so far.
            return false;
          }
        }
        else {
          _state = 'loose';
          _onWired.notify({ name: _name, loose: true });
          SWAC.Wiring._internal.toWired(_that);
        }
        return true;
      };


  //////////////
  // PUBLIC   //
  //////////////

  // No return-block here to keep object type SWAC.Wire (otherwise untyped <object>)

  // API
  this.remove = _remove;

  // EVENTS

  /**
   * Fired when components are present and wire is activated
   *
   * @event onWired
   * @param {Object} data Object with 'name' string property related to the activated wire
   * <br/>'loose' additional boolean property is present for wire in loose status
   */
  this.onWired = _onWired.event;

  /**
   * Fired when one or more components is missing and wire is not activated
   *
   * @event onUnwired
   * @param {Object} data Object with 'name' string property related to the non-activated wire
   */
  this.onUnwired = _onUnwired.event;

  /**
   * Fired when a value of loose wire is changed 
   *
   * @event onValueChanged
   * @param {Object} output wire output
   */
  this.onValueChanged = _onValueChanged.event;

  /**
 * Fired when a value in output of wire is changed 
 *
 * @event onValueChanged
 * @param {Object} output wire output
 */
  this.onOutputChanged = _onOutputChanged.event;

  // INTERNAL
  this._internal = {
    wire: _wire,
    unwire: _unwire
  };

  /**
  * Description property is a struct that groups parameters of wire
  *
  * @property description
  * @type object
  */
  this.description = {
    /**
    * Input info
    *
    * @property description.input
    * @type object
    */
    input: _input,
    /**
     * Output info. If not specified, wire is created and can be use like input for another wire creation
     *
     * @property description.output
     * @type object
     */
    output: _output,
    /**
    * Wire name assigned by SWAC container
    *
    * @property description.name
    * @type string
    */
    name: _name,
    /**
     * State of the wire object
     *
     * @property description.state
     * @type string
     */
    state: function () { return (_state === 'loose' ? 'wired' : _state); },
    /**
     * Function that will be called when processing input data
     *
     * @property description.converter
     * @type function
     */
    converter: _converter,
    /**
     * Extra parameter used by converter
     *
     * @property description.parameter
     * @type object
     */
    parameter: _parameter,
    /**
     * Object used by converter. Same instance used every time converter is called
     *
     * @property description.store
     * @type object
     */
    store: _converterStore
  };
};


///////////////////////////////////////////
// lib/container/wiring.js

/**
 * SWAC.Wiring is a single instance object that permits to create/destroy links between SWAC components. 
 *
 * @class SWAC.Wiring
 * @constructor
 * 
 */
SWAC.Wiring = (function () {

    //////////////
    // PRIVATE  //
    //////////////

    var
        _canWire,

        _checkOutputWirePreconditions,

        _checkWirePreconditions,

        _wiredWires = {}, // Fully-established wires.

        _unwiredWires = {}, // Wires that cannot be set up for the moment (due to missing preconditions, such as input/output)

        _componentInterfaces = [], // Interface list to avoid multiple request of the same interface

        /**
         * Retrieve an interface item from internal collection.
         *
         * @protected
         * @method getInterfaceItem
         * @param {String} componentName Name of the component.
         * @param {String} interfaceName Name of the interface.
         * @return {object} the required interface item
         */
        _getInterfaceItem = function (componentName, interfaceName) {
            var item;
            for (item in _componentInterfaces) {
                if ((_componentInterfaces[item].componentName === componentName) && (_componentInterfaces[item].interfaceName === interfaceName)) {
                    return _componentInterfaces[item];
                }
            }
            return null;
        },

         /**
         * Remove all component's interface items from internal collection.
         *
         * @private
         * @method _removeFromInterfaceList
         * @param {String} componentName Name of the component.
         * @param {String} interfaceName Name of the interface.
         */
        _removeFromInterfaceList = function (componentName, interfaceName) {
            var i;

            for (i = _componentInterfaces.length - 1; i >= 0; i--) {
                if (interfaceName) {
                    if ((_componentInterfaces[i].componentName === componentName) && (_componentInterfaces[i].interfaceName === interfaceName)) {
                        _componentInterfaces.splice(i, 1);
                    }
                }
                else {
                    if (_componentInterfaces[i].componentName === componentName) {
                        _componentInterfaces.splice(i, 1);
                    }
                }
            }
        },

         /**
         * Get and insert a component interface into the internal collection.
         *
         * @private
         * @method _beginGetInterface
         * @param {Object} component Component object.
         * @param {Object} interfaceName Name of the interface.
         */
        _beginGetInterface = function (component, interfaceName) {
            var componentInterfacesItem = {};

            component.interfaces.beginGet(interfaceName).then(
              function (inf) {
                  componentInterfacesItem = _getInterfaceItem(component.name(), interfaceName);
                  if (componentInterfacesItem !== null) {
                      componentInterfacesItem.intf = inf;
                  }
                  _canWire();
              },
              function (reason) {
                  SWAC.Logging.log('_beginGetInterface failed for _checkInputWirePreconditions. Reason: ' + reason, SWAC.Logging.Level.Internal);
                  _removeFromInterfaceList(component.name(), interfaceName);
              });
        },

        /**
         * Checks preconditions (input) before create wiring
         *
         * @private
         * @method _checkInputWirePreconditions
         * @param {object} wire wire to check
         * @return {object} if input is valid for wiring
         */
        _checkInputWirePreconditions = function (wire) {
            var i = 0, incoming,
                entry, comp, node, source,
                eventName, interfaceName, intfItem, componentInterfacesItem = {};

            incoming = wire.description.input;

            for (i = 0; i < incoming.length; i++) {
                entry = incoming[i];
                if (entry.component) {
                    comp = SWAC.Container.get({ name: entry.component });

                    if (!comp) {
                        SWAC.Logging.log('Wire ' + wire.description.name + ': Input component ' + entry.component + ' does not exist.', SWAC.Logging.Level.External);
                        return false;
                    }

                    if (entry.event) {
                        if (entry.event.indexOf('.') === -1) {
                            if (!comp.proxy[entry.event]) {
                                SWAC.Logging.log('Wire ' + wire.description.name + ': Input event ' + entry.event + ' for component ' + entry.component + ' does not exist.', SWAC.Logging.Level.External);
                                return false;
                            }
                        } else {
                            eventName = entry.event.substr(entry.event.lastIndexOf('.') + 1);
                            interfaceName = entry.event.substr(0, entry.event.lastIndexOf('.'));

                            intfItem = _getInterfaceItem(entry.component, interfaceName);
                            if (intfItem !== null) {
                                if (intfItem.intf !== null) {
                                    if (!intfItem.intf[eventName]) {
                                        SWAC.Logging.log('Wire ' + wire.description.name + ': Input ' + interfaceName + ' interface event ' + eventName + ' for component ' + entry.component + ' does not exist.', SWAC.Logging.Level.External);
                                        return false;
                                    }
                                }
                                else {
                                    SWAC.Logging.log('Wire ' + wire.description.name + ': (Still) Waiting for input component interface ' + interfaceName + '.', SWAC.Logging.Level.Internal);
                                    return false;
                                }
                            }
                            else {
                                if (comp.interfaces) {
                                    if (comp.interfaces.has(interfaceName)) {
                                        componentInterfacesItem = {
                                            componentName: entry.component,
                                            interfaceName: interfaceName,
                                            intf: null
                                        };
                                        _componentInterfaces.push(componentInterfacesItem);
                                        // Retrieve interface from component
                                        _beginGetInterface(comp, interfaceName);
                                    }
                                    else {
                                        SWAC.Logging.log('Wire ' + wire.description.name + ': Input ' + interfaceName + ' interface does not exist.', SWAC.Logging.Level.External);
                                    }
                                }
                                return false;
                            }
                        }
                    } else if (entry.dpc) {
                        if (!comp.dpc) {
                            SWAC.Logging.log('Wire ' + wire.description.name + ': Input ' + entry.dpc + ' DPC does not exist.', SWAC.Logging.Level.External);
                            return false;
                        } else {
                            node = comp.dpc.open(entry.dpc);
                            if (!node) {
                                SWAC.Logging.log('Wire ' + wire.description.name + ': Input ' + entry.dpc + ' DPC Node does not exist.', SWAC.Logging.Level.Internal);
                                return false;
                            }
                        }
                    } else {
                        SWAC.Logging.log('Wire ' + wire.description.name + ': Input description not complete.', SWAC.Logging.Level.External);
                        return false;
                    }
                } else if (entry.custom) {
                    source = typeof (entry.custom) === 'object' ? entry.custom : window[entry.custom];
                    if (!source) {
                        return false;
                    }
                    if (entry.method) {
                        if ((!source[entry.method]) || (typeof (source[entry.method]) !== 'function')) {
                            return false;
                        }
                    }
                    else if (entry.event) {
                        if ((!source[entry.event]) || (typeof (source[entry.event]) !== 'object') || (!(source[entry.event])['subscribe'])) {
                            return false;
                        }
                    }
                    else if (entry.dpc) {
                        if (!source.dpc) {
                            return false;
                        } else {
                            node = source.dpc.open(entry.dpc);
                            if (!node) {
                                return false;
                            }
                        }
                    }
                    else {
                        SWAC.Logging.log('Wire ' + wire.description.name + ': Input description not complete.', SWAC.Logging.Level.External);
                        return false;
                    }
                } else if (entry.wire) {
                    if (!_wiredWires[entry.wire]) {
                        return false;
                    }
                } else {
                    SWAC.Logging.log('Wire ' + wire.description.name + ': Input description not complete.', SWAC.Logging.Level.External);
                    return false;
                }
            }

            return true;
        },

        _onWired = new SWAC.Eventing.Publisher('onWired'),
        _onUnwired = new SWAC.Eventing.Publisher('onUnwired'),
        _onFailure = new SWAC.Eventing.Publisher('onFailure'),

         /**
         * Wire the specified wire object, if it is successful it fires onWire event, otherwise fires onFailure event
         *
         * @private
         * @method _wire
         * @param {object} wire wire object to wire
         */
        _wire = function (wire) {
            if (wire._internal.wire()) {
                _onWired.notify({ name: wire.description.name });
            } else {
                _onFailure.notify({ name: wire.description.name, message: 'Wiring system detected a potential wire, but wiring failed.' });
            }
        },

         /**
         * Unwire the specified wire object, if it is successful it fires onUnwired event, otherwise fires onFailure event
         *
         * @private
         * @method _unwire
         * @param {object} wire wire object to unwire
         */
        _unwire = function (wire) {
            if (wire) {
                if (wire._internal.unwire()) {
                    _onUnwired.notify({ name: wire.description.name });
                } else {
                    _onFailure.notify({ name: wire.description.name, message: 'Wiring system detected a invalid wire, but unwiring failed.' });
                }
            } else {
                _onFailure.notify({ name: wire.description.name, message: 'Wiring system detected a null wire, unwiring failed.' });
            }
        },

        /**
         * Checks all wires. If check on preconditions fail existing wires will be unwired
         *
         * @private
         * @method _checkWires
         * @return {Boolean} returns if precondition fails or not.
         */
        _checkWires = function () {
            var _wire,
              wired;

            var check = function (wire, remove) {
                var result;
                if (!wire) {
                    return false;
                }
                result = _checkWirePreconditions(wire);
                if (!result) {
                    SWAC.Logging.log('Must unwire wire ' + wire.description.name, SWAC.Logging.Level.External);
                    _unwire(wire);
                }
                return result;
            };

            for (_wire in _wiredWires) {
                if (_wiredWires.hasOwnProperty(_wire)) {
                    wired = _wiredWires[_wire];
                    // Look through all sources and the target, if still valid.
                    check(wired);
                }
            }
        },

        /**
          * Checks DPCs on the container and corresponding wires
          *
          * @private
          * @method _observeContainerDpcs
          * @param {object} wire wire to check
          */
        _observeContainerDpcs = function (wire) {
            var obj, i,
              custom,
              createHandler = function (add) {
                  return add ? function (event) {
                      SWAC.Logging.log('Custom DPC structure changed... check waiting wires!', SWAC.Logging.Level.Internal);
                      _canWire();
                  } : function (event) {
                      SWAC.Logging.log('Custom DPC structure changed... check waiting wires!', SWAC.Logging.Level.Internal);
                      _checkWires();
                  };
              };

            if (wire.description.input) {
                for (i = 0; i < wire.description.input.length; i++) {
                    custom = wire.description.input[i].custom;
                    if (custom) {
                        obj = typeof (custom) === 'object' ? custom : window[custom];
                        if (obj && obj.dpc) {
                            obj.dpc.onAdded.subscribe(createHandler(true));
                            obj.dpc.onRemoved.subscribe(createHandler(false));
                        }
                    }
                }
            }
            if (wire.description.output !== undefined) {
                if (wire.description.output.custom) {
                    obj = typeof (wire.description.output.custom) === 'object' ? wire.description.output.custom : window[wire.description.output.custom];
                    if (obj && obj.dpc) {
                        obj.dpc.onAdded.subscribe(createHandler(true));
                        obj.dpc.onRemoved.subscribe(createHandler(false));
                    }
                }
            }
        },

        /**
        * Find wires that have a specific item as input or output
        *
        * @private
        * @method _findWiresIO
        * @param {Array} wireList array to scan for required wires
        * @param {String} entityValue item fo find
        * @param {String} context item type
        * @param {String} direction search for input or output
        * @return {Array} list of filtered wires. 
        */
        _findWiresIO = function (wireList, entityValue, context, direction) {
            var wire, wireIn,
                foundList = [];

            for (wire in wireList) {
                if (wireList[wire].description[direction]) {
                    if (SWAC._internal.Utils.isArray(wireList[wire].description[direction])) {
                        for (wireIn in wireList[wire].description[direction]) {
                            if (wireList[wire].description[direction][wireIn][context] === entityValue) {
                                foundList.push(wireList[wire]);
                            }
                        }
                    }
                    else if (wireList[wire].description[direction][context] === entityValue) {
                        foundList.push(wireList[wire]);
                    }
                }
            }

            return foundList;
        },

        /**
        * Remove duplicate elements from the given array
        *
        * @private
        * @method _removeDuplicateItemsFromArray
        * @param {Array} array array to clean
        * @return {Array} list without duplicate elements. 
        */
        _removeDuplicateItemsFromArray = function (array) {
            var i, j,
              foundList = array.concat();

            for (i = 0; i < foundList.length; i++) {
                for (j = i + 1; j < foundList.length; j++) {
                    if (foundList[i] === foundList[j]) {
                        foundList.splice(j--, 1);
                    }
                }
            }

            return foundList;
        },

        /**
        * Find wires by name
        *
        * @private
        * @method _findWiresName
        * @param {Array} wireList array to scan for required wires
        * @param {String} name name fo find
        * @return {Array} list of filtered wires. 
        */
        _findWiresName = function (wireList, name) {
            var wire,
                foundList = [];

            for (wire in wireList) {
                if (wireList[wire]) {
                    if (wireList[wire].description.name === name) {
                        foundList.push(wireList[wire]);
                    }
                }
            }

            return foundList;
        },

         /**
         * Return wire(s) instance(s), if filter is null or undefined, result contains all SWAC wires.
         * Otherwise the result can be filter by filter properties:
         * - name: wire name to search. If found, the result will be the wire (string)
         * - wired: return all wires that are linked and ready for execution (boolean)
         * - unwired: return all wires that are unlinked and not working (boolean)
         * - loose: return all wires without output (boolean)
         * - inputComponents: return all wires that have at least one component (specified by name) as input (string array)
         * - outputComponents: return all wires that have the method (specified by name) as output (string array)
         * - inputs: search in input parameters (string or object array)
         * - output: search in output parameter (string or object)
         * @method get
         * @param {Object} filter filter object. 
         * @return {Object} a SWAC.Wire or an array of SWAC.Wire. 
         */
        _get = function (filter) {
            var arr = [],
                tempArr,
                _input = null,
                _output = null,
                _wire,
                _findWireInArray = function (name, dataList) {
                    for (var item in dataList) {
                        if (dataList[item].description.name === name.description.name) {
                            return dataList[item];
                        }
                    }
                    return null;
                };

            filter = filter || { wired: true, unwired: true, loose: true };

            if ((filter.wired === undefined || filter.wired === null) &&
              (filter.loose === undefined || filter.loose === null) &&
              (filter.unwired === undefined || filter.unwired === null)) {
                filter.wired = filter.loose = filter.unwired = true;
            }

            if (filter.wired) {
                for (_wire in _wiredWires) {
                    if (_wiredWires[_wire]) {
                        arr.push(_wiredWires[_wire]);
                    }
                }
            }

            if (filter.loose) {
                for (_wire in _wiredWires) {
                    if (_wiredWires[_wire] && _wiredWires[_wire].description && (_wiredWires[_wire].description.output === undefined)) {
                        if (_findWireInArray(_wiredWires[_wire], arr) === null) {
                            arr.push(_wiredWires[_wire]);
                        }
                    }
                }
            }

            if (filter.unwired) {
                for (_wire in _unwiredWires) {
                    if (_unwiredWires[_wire]) {
                        arr.push(_unwiredWires[_wire]);
                    }
                }
            }

            if (filter.name) {
                arr = _findWiresName(arr, filter.name);
            }

            if (filter.inputComponents) {
                if (SWAC._internal.Utils.isArray(filter.inputComponents)) {
                    for (_input in filter.inputComponents) {
                        if (filter.inputComponents.hasOwnProperty(_input)) {
                            arr = _findWiresIO(arr, filter.inputComponents[_input], 'component', 'input');
                        }
                    }
                }
            }

            if (filter.outputComponents) {
                if (SWAC._internal.Utils.isArray(filter.outputComponents)) {
                    for (_output in filter.outputComponents) {
                        if (filter.outputComponents.hasOwnProperty(_output)) {
                            arr = _findWiresIO(arr, filter.outputComponents[_output], 'component', 'output');
                        }
                    }
                }
            }

            if (filter.inputs) {
                if (SWAC._internal.Utils.isArray(filter.inputs)) {
                    for (_input in filter.inputs) {
                        if (filter.inputs.hasOwnProperty(_input)) {
                            tempArr = [];
                            if (typeof filter.inputs[_input] === 'string') {
                                tempArr = tempArr.concat(_findWiresIO(arr, filter.inputs[_input], 'component', 'input'));
                                tempArr = tempArr.concat(_findWiresIO(arr, filter.inputs[_input], 'wire', 'input'));
                                arr = _removeDuplicateItemsFromArray(tempArr);
                            }
                            else {
                                if (typeof filter.inputs[_input] === 'object') {
                                    if (filter.inputs[_input] instanceof SWAC.Component) {
                                        arr = _findWiresIO(arr, filter.inputs[_input].name(), 'component', 'input');
                                    }
                                    else {
                                        if (filter.inputs[_input] instanceof SWAC.Wire) {
                                            arr = _findWiresIO(arr, filter.inputs[_input].description.name, 'wire', 'input');
                                        }
                                        else {
                                            arr = _findWiresIO(arr, filter.inputs[_input], 'custom', 'input');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (filter.output) {
                if (typeof filter.output === 'string') {
                    arr = _findWiresIO(arr, filter.output, 'component', 'output');
                }
                else {
                    if (typeof filter.output === 'object') {
                        if (filter.output instanceof SWAC.Component) {
                            arr = _findWiresIO(arr, filter.output.name(), 'component', 'output');
                        }
                        else {
                            arr = _findWiresIO(arr, filter.output, 'custom', 'output');
                        }
                    }
                }
            }

            if (arr.length === 1) {
                return arr[0];
            }
            else {
                return arr;
            }
        },

        /**
         * Check wire params
         *
         * @private
         * @method _checkForWireMembers
         * @param {Object} arg it should be a simple object containing information about wire.
         * @return {Boolean} returns true if wire members are ready for wiring, false otherwise
         */
        _checkForWireMembers = function (arg) {
            var i = 0,
              entryCustomOutput,
              entryCustom,
              argInput;

            if (!arg.name || !arg.input) {
                SWAC.Logging.log('Wire creation failed due invalid argument(s)', SWAC.Logging.Level.External);
                _onFailure.notify({ name: arg.name, message: 'Invalid argument(s)' });
                return false;
            }

            if (_get({ name: arg.name }) instanceof SWAC.Wire) {
                SWAC.Logging.log('Wire creation failed: wire with this name already exists', SWAC.Logging.Level.External);
                _onFailure.notify({ name: arg.name, message: 'Wire with this name already exists' });
                return false;
            }

            argInput = SWAC._internal.Utils.isArray(arg.input) ? arg.input : [arg.input];

            for (i = 0; i < argInput.length; i++) {
                if (!argInput[i].component && !argInput[i].wire && !argInput[i].custom) {
                    SWAC.Logging.log('Wire creation failed: input component does not exist', SWAC.Logging.Level.External);
                    _onFailure.notify({ name: arg.name, message: 'Input component does not exist' });
                    return false;
                }

                if (!argInput[i].wire && !argInput[i].event && !argInput[i].dpc) {
                    SWAC.Logging.log('Wire creation failed due invalid argument(s)', SWAC.Logging.Level.External);
                    _onFailure.notify({ name: arg.name, message: 'Invalid argument(s)' });
                    return false;
                }

                if (argInput[i].custom) {
                    if (typeof (argInput[i].custom) === 'object') {
                        entryCustom = argInput[i].custom;
                    } else {
                        entryCustom = window[argInput[i].custom];
                    }
                }

                if (entryCustom && argInput[i].event && (!entryCustom[argInput[i].event] || (typeof (entryCustom[argInput[i].event].subscribe) !== 'function'))) {
                    SWAC.Logging.log('Wire creation failed: Invalid event for javascript object', SWAC.Logging.Level.External);
                    _onFailure.notify({ name: arg.name, message: 'Invalid event for javascript object' });
                    return false;
                }
            }

            if (arg.output && arg.output.custom) {
                if (typeof (arg.output.custom) === 'object') {
                    entryCustomOutput = arg.output.custom;
                }
                else {
                    entryCustomOutput = window[arg.output.custom];
                }
            }

            if (arg.output && entryCustomOutput && arg.output.method && (!entryCustomOutput[arg.output.method] || (typeof (entryCustomOutput[arg.output.method]) !== 'function'))) {
                SWAC.Logging.log('Wire creation failed: Invalid method for javascript object', SWAC.Logging.Level.External);
                _onFailure.notify({ name: arg.name, message: 'Invalid method for javascript object' });
                return false;
            }

            if (arg.converter && typeof (arg.converter) !== 'function') {
                SWAC.Logging.log('Wire creation failed due invalid converter type', SWAC.Logging.Level.External);
                _onFailure.notify({ name: arg.name, message: 'Invalid converter type' });
                return false;
            }

            if (!arg.options || arg.options.removeOnFailure === null || arg.options.removeOnFailure === undefined) {
                if (!arg.options) {
                    arg.options = {};
                }
                arg.options.removeOnFailure = true;
            }

            return true;
        },

     _onCreated = new SWAC.Eventing.Publisher('onCreated'),
        /**
         * Creates wiring between SWAC components or other wires.
         *
         * @method create
         * @param {Object} arg it should be a simple object or an array of object containing information about wire.
         * @return {object} returns true if wiring creation succeeded, false otherwise
         */
        _create = function (arg) {
            var sumRetVal = true,
                retVal, i = 0;

            // In case of array, start simple recursion.
            if (SWAC._internal.Utils.isArray(arg)) {
                retVal = new Array(arg.length);
                for (i = 0; i < arg.length; i++) {
                    retVal[i] = SWAC.Wiring.create(arg[i]);
                    sumRetVal = sumRetVal && retVal[i];
                }
                return sumRetVal;
            }
            else {
                // In case of object, start ducktyping.
                if ((typeof arg === 'object') && (arg !== null)) {

                    if (!_checkForWireMembers(arg)) {
                        return false;
                    }

                    _unwiredWires[arg.name] = new SWAC.Wire(arg.name, arg.input, arg.output, arg.converter, arg.parameter, arg.options, arg.store);
                    _observeContainerDpcs(_unwiredWires[arg.name]);
                    _onCreated.notify({ name: arg.name });
                    _canWire();

                    return true;
                }
                else {
                    return false;
                }
            }
        },

        _onRemoved = new SWAC.Eventing.Publisher('onRemoved'),

         /**
         * Removes the wire and fires onRemoved event
         *
         * @protected
         * @method remove
         * @param {object} wire wire to remove
         * @return {Boolean} returns if wire has been removed successfully or not
         */
        _remove = function (wire) {
            var name = wire.description.name,
              retVal = true,
              _itemFound = false;

            if (wire.description.state() !== 'unwired') {
                _unwire(wire);
            }
            if (_wiredWires[name] !== undefined) {
                delete _wiredWires[name];
                _itemFound = true;
            }
            if (_unwiredWires[name] !== undefined) {
                delete _unwiredWires[name];
                _itemFound = true;
            }
            if (_itemFound) {
                _onRemoved.notify({ name: name });
            }

            retVal = _itemFound;

            return retVal;
        },

         /**
         * Checks if dpc changes
         *
         * @private
         * @method _observeDpc
         * @param {object} comp name of the component
         */
        _observeDpc = function (comp) {
            var cur = SWAC.Container.get({ name: comp }),
                createHandler = function (add) {
                    return add ? function (event) {
                        SWAC.Logging.log('DPC structure changed... check waiting wires!', SWAC.Logging.Level.Internal);
                        _canWire();
                    } : function (event) {
                        SWAC.Logging.log('DPC structure changed... check existing wires!', SWAC.Logging.Level.Internal);
                        _checkWires();
                    };
                };

            if (cur && cur.dpc) {
                cur.dpc.onAdded.subscribe(createHandler(true));
                cur.dpc.onRemoved.subscribe(createHandler(false));
            }
        },

         /**
         * Checks if a new component appears
         *
         * @private
         * @method _compAppears
         * @param {object} event data of the appeared component
         */
        _compAppears = function (event) {
            SWAC.Logging.log('New component appeared... check waiting wires!', SWAC.Logging.Level.Internal);
            _observeDpc(event.data.name);
            _canWire();
        },

        /**
         * Checks if a component disappears
         *
         * @private
         * @method _compDisappears
         * @param {object} event data of the disappeared component
         */
        _compDisappears = function (event) {
            SWAC.Logging.log('Component disappeared... check existing wires!', SWAC.Logging.Level.Internal);
            _removeFromInterfaceList(event.data.name);
            _checkWires();
        },

        /**
         * Moves the object from unwired list to wired list
         *
         * @protected
         * @method toWired
         * @param {object} wire wire to move
         */
        _toWired = function (wire) {
            var name = wire.description.name;
            _wiredWires[name] = _unwiredWires[name];
            delete _unwiredWires[name];
        },

         /**
         * Moves the object from wired or loose list to unwired list
         *
         * @protected
         * @method toUnwired
         * @param {object} wire wire to move
         */
        _toUnwired = function (wire) {
            var name = wire.description.name;
            if (_wiredWires[name]) {
                _unwiredWires[name] = _wiredWires[name];
                delete _wiredWires[name];
            }
            // Unwiring a loose wire -> checkWires again, a dangling glue point could be missing now!
            _checkWires();
        };

    //////////////
    // INIT     //
    //////////////

    (function () {
        // Always listen for components showing up and disappearing. (SWAC.Container is also part of SWAC's container-part, so no check for existence required!)
        SWAC.Container.onReady.subscribe(_compAppears);
        SWAC.Container.onRemoved.subscribe(_compDisappears);
    }());

    var _cancelExecutionException = function (errorCode) {
        SWAC.Exception.call(this, errorCode);
    };

    _cancelExecutionException.prototype = new SWAC.Exception();

    /**
    * Checks if it is possible to make a wire and perfom it in case
    *
    * @private
    * @method _canWire
    */
    _canWire = function () {
        var name = '',
            checkAgain = true,
            i = 0,
            unWiredList,
            wire;

        while (checkAgain) {
            unWiredList = Object.getOwnPropertyNames(_unwiredWires);
            checkAgain = false;
            for (i = 0; i < unWiredList.length; i++) {
                name = unWiredList[i];
                if (_unwiredWires.hasOwnProperty(name)) {
                    wire = _unwiredWires[name];
                    // Look through all sources and the target, maybe those can be wired now.
                    if (_checkWirePreconditions(wire)) {
                        SWAC.Logging.log('Can wire ' + name, SWAC.Logging.Level.External);
                        _wire(wire);
                        checkAgain = true;
                    }
                    else {
                        SWAC.Logging.log('(Still) can\'t wire ' + name, SWAC.Logging.Level.External);
                    }
                }
            }
        }
    };

    /**
    * Checks preconditions (output) before create wiring
    *
    * @private
    * @method _checkOutputWirePreconditions
    * @param {object} wire wire to check
    * @return {object} if output is valid for wiring
    */
    _checkOutputWirePreconditions = function (wire) {
        var outgoing, target, data, methodInterface, interfaceName,
          intfItem, componentInterfacesItem = {};

        outgoing = wire.description.output;

        if (outgoing) {
            if (outgoing.component) {
                target = SWAC.Container.get({ name: outgoing.component });
                if (!target) {
                    SWAC.Logging.log('Wire ' + wire.description.name + ': Output component ' + outgoing.component + ' does not exist.', SWAC.Logging.Level.External);
                    return false;
                }

                if (outgoing.method) {
                    if (outgoing.method.indexOf('.') === -1) {
                        if (!target.proxy[outgoing.method]) {
                            SWAC.Logging.log('Wire ' + wire.description.name + ': Output method ' + outgoing.method + ' for component ' + outgoing.component + ' does not exist.', SWAC.Logging.Level.External);
                            return false;
                        }
                    } else {
                        methodInterface = outgoing.method.substr(outgoing.method.lastIndexOf('.') + 1);
                        interfaceName = outgoing.method.substr(0, outgoing.method.lastIndexOf('.'));

                        //  methodInterface = outgoing.method.split('.');
                        intfItem = _getInterfaceItem(outgoing.component, interfaceName);
                        if (intfItem !== null) {
                            if (intfItem.intf !== null) {
                                if (!intfItem.intf[methodInterface]) {
                                    SWAC.Logging.log('Wire ' + wire.description.name + ': Output ' + interfaceName + ' interface method ' + methodInterface + ' for component ' + outgoing.component + ' does not exist.', SWAC.Logging.Level.External);
                                    return false;
                                }
                            }
                            else {
                                SWAC.Logging.log('Wire ' + wire.description.name + ': (Still) Waiting for output component interface ' + interfaceName + '.', SWAC.Logging.Level.Internal);
                                return false;
                            }
                        }
                        else {
                            if (target.interfaces) {
                                if (target.interfaces.has(interfaceName)) {
                                    componentInterfacesItem = {
                                        componentName: outgoing.component,
                                        interfaceName: interfaceName,
                                        intf: null
                                    };
                                    _componentInterfaces.push(componentInterfacesItem);
                                    // Retrieve interface from component
                                    target.interfaces.beginGet(interfaceName).then(
                                      function (inf) {
                                          componentInterfacesItem = _getInterfaceItem(outgoing.component, interfaceName);
                                          if (componentInterfacesItem !== null) {
                                              componentInterfacesItem.intf = inf;
                                          }
                                          _canWire();
                                      },
                                      function (reason) {
                                          SWAC.Logging.log('interfaces.beginGet failed for _checkOutputWirePreconditions. Reason: ' + reason, SWAC.Logging.Level.Internal);
                                          _removeFromInterfaceList(outgoing.component, interfaceName);
                                      });
                                }
                                else {
                                    SWAC.Logging.log('Wire ' + wire.description.name + ': Output ' + interfaceName + ' interface does not exist.', SWAC.Logging.Level.External);
                                }
                            }
                            return false;
                        }
                    }
                } else if (outgoing.dpc) {
                    if (!target.dpc) {
                        SWAC.Logging.log('Wire ' + wire.description.name + ': Output ' + outgoing.dpc + ' DPC does not exist.', SWAC.Logging.Level.External);
                        return false;
                    } else {
                        data = target.dpc.open(outgoing.dpc);
                        if (!data) {
                            SWAC.Logging.log('Wire ' + wire.description.name + ': Output ' + outgoing.dpc + ' DPC Node does not exist.', SWAC.Logging.Level.External);
                            return false;
                        }
                    }
                } else {
                    SWAC.Logging.log('Wire ' + wire.description.name + ': Output description not complete.', SWAC.Logging.Level.External);
                    return false;
                }
            } else if (outgoing.custom) {
                target = typeof (outgoing.custom) === 'object' ? outgoing.custom : window[outgoing.custom];
                if (!target) {
                    return false;
                }
                if (outgoing.method) {
                    if ((!target[outgoing.method]) || (typeof (target[outgoing.method]) !== 'function')) {
                        return false;
                    }
                }
                else if (outgoing.dpc) {
                    if (!target.dpc) {
                        return false;
                    } else {
                        data = target.dpc.open(outgoing.dpc);
                        if (!data) {
                            return false;
                        }
                    }
                } else {
                    SWAC.Logging.log('Wire ' + wire.description.name + ': Output description not complete.', SWAC.Logging.Level.External);
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * Checks preconditions before create wiring
     *
     * @private
     * @method _checkWirePreconditions
     * @param {object} wire wire to check
     * @return {object} if wire is valid for wiring
     */
    _checkWirePreconditions = function (wire) {

        if (!wire) {
            return false;
        }

        if (!wire.description.input) { // outgoing is optional (loose then), but incoming is required!
            return false;
        }

        if (_checkInputWirePreconditions(wire)) {
            if (wire.description.output) {
                return _checkOutputWirePreconditions(wire);
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };

    //////////////
    // PUBLIC   //
    //////////////

    return {

        // API
        create: _create,
        get: _get, // There is no dedicated remove-function on the wiring system. Get the wire and call remove explicitely.

        // EVENTS

        /**
        * Fired whenever a new wire got added to the wiring system
        *
        * @event onCreated
        * @param {Object} data Object with 'name' string property related to the created wire
        */
        onCreated: _onCreated.event,

        /**
        * Fired whenever a wire is fully-established or loose
        *
        * @event onWired
        * @param {Object} data Object with 'name' string property related to the activated wire
        */
        onWired: _onWired.event,

        /**
        * Fired whenever a wire is pinched off
        *
        * @event onUnwired
        * @param {Object} data Object with 'name' string property related to the non-activated wire
        */
        onUnwired: _onUnwired.event,

        /**
        * Fired whenever a wire is completely removed from the wiring system
        *
        * @event onRemoved
        * @param {Object} data Object with 'name' string property related to the removed wire
        */
        onRemoved: _onRemoved.event,

        /**
        * Fired whenever something goes wrong
        *
        * @event onFailure
        * @param {Object} message Object with 'message' string property related to the failure
        */
        onFailure: _onFailure.event,

        // INTERNAL, DO NOT USE
        _internal: {
            remove: _remove,
            toWired: _toWired,
            toUnwired: _toUnwired,
            getInterfaceItem: _getInterfaceItem
        },

        /**
       * Class that manages SecurityException message. 
       *
       * @protected
       * @class SWAC.Wiring.CancelExecutionException
       * @constructor
       * @param {Numeric} errorCode
       */
        CancelExecutionException: _cancelExecutionException
    };
}());

    return SWAC;
  };

  try {
    if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
      var SWACConstructor = require('@swac/container');
      if (typeof SWACConstructor.prototype.Wiring !== 'object') {
        swacWiringModule(SWACConstructor.prototype);
      }
      module.exports = SWACConstructor;
      module.exports['default'] = module.exports;
    }
    else if ((typeof SystemJS !== 'undefined') && SystemJS.map.hasOwnProperty('@swac/container')) {
      define('@swac/wiring', ['@swac/container'], function (base) {
        if (typeof base.prototype.Wiring !== 'object') {
          swacWiringModule(base.prototype);
        }
        return base;
      });
    }
    else if ((typeof define === 'function') && (typeof define.amd !== 'undefined') &&
            (typeof requirejs !== 'undefined') && (typeof requirejs.s.contexts._.config.paths['@swac/container'] !== 'undefined')) {
      define('@swac/wiring', ['@swac/container'], function (base) {
        if (typeof base.prototype.Wiring !== 'object') {
          swacWiringModule(base.prototype);
        }
        return base;
      });
    }
    else {
      throw new Error('SWAC on window');
    }
  }
  catch (e) {
    if (typeof window.SWAC.constructor.prototype.Wiring !== 'object') {
      swacWiringModule(window.SWAC.constructor.prototype);
    }
  }

})();