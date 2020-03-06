/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

/* Version 1.5.1, copyright (C) 2019, Siemens AG. All Rights Reserved. */


(function () {
  var swacContainerModule = function (SWAC) {

///////////////////////////////////////////
// lib/container/component.js


/**
 * Class that manages component 
 *
 * @class SWAC.Component
 * @constructor
 * @param {string} name Name of the component.
 * @param {object} iframe Corresponding iframe instance the component is hosted in.
 * @param {object} type Type of the component.
 * @param {object} settings settings property bag.
 * @param {string} lastUrl last URL of component.
 */
SWAC.Component = function (name, iframe, type, settings, lastUrl) {

  //////////////
  // PRIVATE   //
  //////////////

  var
	_that = this,

	_rootnode = null,

	_name = name,

	/**
	  * Corresponding iframe instance the component is hosted in
	  *
	  * @protected
	  * @property iframe
	  * @type object
	  */
	_iframe = iframe,

	  /**
	  * Type of the component as specified during creation.
	  *
	  * @method type
	  * @type string
	  */
	_type = function () { return type; },

	// Original settings property bag.
	_settings = settings,

	_lastUrl = ((lastUrl !== '') && (lastUrl !== null) && (lastUrl !== undefined)) ? lastUrl : iframe.src,

  _addDpcValues = ((typeof _settings !== 'undefined') && (typeof _settings.addDpcValues !== 'undefined')) ? _settings.addDpcValues : SWAC.Config.Container.Behaviors.AddDpcValues,

	_containerOnReadyEvent = arguments[5],

	_interfaces = null, // will be set in _beginExpose

	/**
	* Component's last isDirtyValue.
	*
	* @protected
	* @property lastIsDirtyValue
	* @type boolean
	* @return {Boolean} returns last isDirtyValue of component
	*/
	_lastIsDirtyValue = false,

  _visibility = 'hidden', // Initial state

  // Turns dirty when the original component got removed but this remote proxy may still exist.
  _dirty = false,

  /**
  * Fired when API got exposed and component is fully operative.
  *
  * @event onReady
  */
  _onReady = new SWAC.Eventing.Publisher('onReady'),

  _supportedMouseEventList = 'click dblclick mousedown mousemove mouseup',

  // list of registered events
  _registeredEventList = [],

  // this is the DPC accessor the framework is working on. (Won't result in forwarding towards container, avoiding loop)
  _privateDpc = {},

  // Authentication object
  _authentication = new SWAC.Authentication(name),

  /**
  * Provides access to component APIs: methods and events
  *
  * @property proxy
  * @type object
  */
  _proxy = {},

  // Object use to take reference of SWAC.Eventing.Publisher used for component events
  _eventPublishers = {},

  /**
  * Provides access to internal component status dpc structure
  *
  * @property status
  * @type object
  */
  _status = {},

  /**
  * Provides the accessor to the component dpc structure
  *
  * @property dpc
  * @type object
  */
  _dpc = {},

  // Unique ID for this component instance in the container
  _id = SWAC.Guid.generate(),

  /**
   * Sets the visibility of the component.
   *
   * @method beginShow
   * @param {bool} visible the component is visible or not.
   * @return {object} an object defer.promise.
   */
	  _beginShow = function (visible) {
	    var defer = new SWAC.Defer(),
        newstate = visible ? 'visible' : 'hidden',
        change;

	    if (_dirty) {
	      defer.reject(new SWAC.Reason(13001));
	    } else {
	      if (_settings.flavor !== 'ui') {
	        SWAC.Logging.log('Headless components cannot be turned visible', SWAC.Logging.Level.External);
	        defer.reject(new SWAC.Reason(13002));
	      } else if (newstate === _visibility) {
	        defer.fulfill();
	      } else {
	        change = function (value) {
	          _visibility = newstate;

	          _iframe.style.width = (visible ? _settings.width : '0px');
	          _iframe.style.height = (visible ? _settings.height : '0px');
	          _iframe.style.display = (visible ? 'block' : 'none');
	        };

	        // Send notification to hosted component
	        return SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.Internal, 'show', [visible]).then(change, change); // Turn visible once the component returned from its event handlers.
	      }
	    }
	    return defer.promise;
	  },

	  /**
	  * Removes the component.
	  *
	  * @method beginRemove
	  * @param {Object} reason the reason for component removal.
	  * @return {object} an object defer.promise.
	  */
	  _beginRemove = function (reason) {
	    var defer = new SWAC.Defer(),
        clean = function () {
          SWAC.Container._internal.remove(_name, _iframe, reason);
          _iframe = null;
          _dirty = true;
          _proxy = null;
          _status = null;
          _dpc = null;
          _eventPublishers = null;
          _interfaces = null;
        };

	    if (_dirty) {
	      defer.reject(new SWAC.Reason(13001));
	    } else {
	      // Send remove message to component and remove iframe on resolved promise.
	      return SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.Remove, 'remove', [reason]).then(
           function (value) {
             clean();
           },
           function (reason) {
             clean();
             throw reason;
           }
         );
	    }
	    return defer.promise;
	  },

	  /**
	  * Request of clean up for the component
	  *
	  * @method beginCleanUpRequest
	  * @return {Object} defer.promise return a defer object (to be fullfilled or rejected).
	  */
	  _beginCleanUpRequest = function () {
	    return SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.CleanUp, 'cleanUp', [], true);
	  },

	  /**
	 * Moves and resizes the component.
	 *
	 * @method beginPosition
	 * @param {String} left left position.
	 * @param {String} top top position.
	 * @param {String} width width size.
	 * @param {String} height height size.
	 * @return {object} an object defer.promise.
	 */
	  _beginPosition = function (left, top, width, height) {
	    var defer = new SWAC.Defer();

	    if (_dirty) {
	      defer.reject(new SWAC.Reason(13001));
	      return defer.promise;
	    }

	    if (_settings.flavor !== 'ui') {
	      defer.reject(new SWAC.Reason(13002));
	      return defer.promise;
	    }

	    // Do not change iframe properties when hidden, but send event afterwards.
	    if (_visibility !== 'hidden') {
	      _iframe.style.left = left;
	      _iframe.style.top = top;
	      _iframe.style.width = width;
	      _iframe.style.height = height;
	    }

	    // Send notification to hosted component
	    return SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.Internal, 'position', [left, top, width, height]);
	  },

	  /**
	 * Get position and size of the component.
	 *
	 * @method getPosition
	 * @return {object} returns an object containing the following properties:
	 * @return {String} left left position.
	 * @return {String} top top position.
	 * @return {String} width width size.
	 * @return {String} height height size.
	 */
	  _getPosition = function () {
	    if (_dirty) {
	      SWAC.Logging.log('Error calling getPosition method for component ' + _name + '. Reason: ' + (new SWAC.Reason(13001)), SWAC.Logging.Level.External);
	      return null;
	    }
	    else {
	      return {
	        left: _iframe.style.left,
	        top: _iframe.style.top,
	        width: _iframe.style.width,
	        height: _iframe.style.height
	      };
	    }
	  },

  /**
  * Create a message for calling a method from container to component
  *
  * @private
  * @method _beginCall
  * @param {string} method method to call
  * @param {object} args method's argument
  * @return {object} an object defer.promise.
  */
	  _beginCall = function (method, args) {
	    return SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.Proxy.Functions, 'call', [method, args]);
	  },

	 /**
	* Asyncronous method for getting the interface
	*
	* @protected
	* @method beginRequestInterface
	* @param {string} name name of the interface
	* @return {object} an object defer.promise.
	*/
	  _beginRequestInterface = function (name) {
	    var defer = new SWAC.Defer();

	    SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.Internal, 'beginRequestInterface', [name]).then(
        function (inf) {
          if (inf) {
            _interfaces._internal.exposeInterface(inf.name, inf.api, inf.events);
            _interfaces.beginGet(name).then(
              function (value) {
                defer.fulfill(value);
              },
              function (reason) {
                defer.reject(reason);
              });
          }
          else {
            defer.reject(new SWAC.Reason(14001));
          }
        },
        function (reason) {
          defer.reject(reason);
        });

	    return defer.promise;
	  },

	  /**
	  * Asyncronous method for getting the service
	  *
	  * @protected
	  * @method beginRequestService
	  * @param {string} serviceName name of the service
	  * @return {object} an object defer.promise.
	  */
	  _beginRequestService = function (serviceName) {
	    // Promise is created/managed by SWAC.Services, no chaining necessary here.
	    var newCmpName = this.o;
	    return SWAC.Services._internal.beginRequestService(serviceName, newCmpName);
	  },

	   /**
	  * Method for calling a service method
	  *
	  * @protected
	  * @method callService
	  * @param {string} method method to call
	  * @param {object} args method's argument
	  * @param {string} service service's name
	  * @return {object} the return value of service method.
	  */
	  _callService = function (method, args, service) {
	    var newsource = [];
	    if (this.o) {
	      newsource = this.o;
	    }
	    return SWAC.Services._internal.callMethod(newsource, service, method, args);
	  },

	  /**
	  * Create the forwarder
	  *
	  * @private
	  * @method _createForwarder
	  * @return {function} the function to forward.
	  */
	  _createForwarder = function () {
	    return function (key, type, content) {
	      var res = null;

	      if (type === 'add') {
	        SWAC.Logging.log('CON-OUT: Node ' + key + ' within DPC ' + _name + ' got added...', SWAC.Logging.Level.Internal);
	      } else if (type === 'set') {
	        SWAC.Logging.log('CON-OUT: Data ' + key + ' within DPC ' + _name + ' got set...', SWAC.Logging.Level.Internal);
	      } else if (type === 'beginset') {
	        SWAC.Logging.log('CON-OUT: Data ' + key + ' within DPC ' + _name + ' got beginset...', SWAC.Logging.Level.Internal);
	      } else if (type === 'get') {
	        SWAC.Logging.log('CON-OUT: Data ' + key + ' within DPC ' + _name + ' requested...', SWAC.Logging.Level.Internal);
	      } else if (type === 'remove') {
	        SWAC.Logging.log('CON-OUT: Node/Data ' + key + ' within DPC ' + _name + ' got removed...', SWAC.Logging.Level.Internal);
	      } else {
	        SWAC.Logging.log('CON-OUT: DPC-Proxy, Unknown content: ' + _name + ',' + key + ',' + type, SWAC.Logging.Level.Internal);
	      }

	      if (type === 'add' || type === 'set' || type === 'remove') {
	        // Fire and forget here
	        SWAC.Communication._internal.dpcChanged(_name, key, type, content);
	      }
	      else if (type === 'get') {
	        // Return promise for get-call
	        return SWAC.Communication._internal.beginDpcGet(_name, key);
	      }
	      else if (type === 'beginset') {
	        if ((SWAC._internal.Utils.checkVersion(_that.swacVersion, '1.1.0') <= 0)) {
	          res = new SWAC.Defer();
	          SWAC.Communication._internal.dpcChanged(_name, key, 'set', content);
	          res.fulfill({ modified: false });
	          return res.promise;
	        }
	        else {
	          // Return promise for get-call
	          return SWAC.Communication._internal.beginDpcSet(_name, key, type, content).then(
            function (data) {
              if (typeof data === 'object' && typeof data.modified === 'boolean') {
                return data;
              }
              return { modified: false };
            }, function (reason) {
              throw reason;
            });
	        }
	      }
	    };
	  },

	  /**
	  * Method that exposes methods, events and dpcs of the component to the container
	  *
	  * @protected
	  * @method _beginExpose
	  * @param {object} api list of method exported by component
	  * @param {object} events list of events exported by component
	  * @param {object} hasPublicDpc list of dpcs exported by component
	  * @param {object} interfaces list of interfaces
	  * @param {string} version SWAC library version
	  * @return {object} an object defer.promise.
	  */
	  _beginExpose = function (api, events, hasPublicDpc, interfaces, version) {
	    var defer = new SWAC.Defer(),
        internalDefer,
    failed,
    proceed,
    flags,
    args,
    fn,
    i = 0,
    event,
    method;

	    if (version) {
	      _that.swacVersion = version;
	    }

	    //// METHODS
	    for (method in api) {
	      if (api.hasOwnProperty(method)) {
	        args = api[method].join(', ');
	        fn = 'return function (' + args + ') { var myargs = Array.prototype.slice.call(arguments, 0); var args = ["' + method + '", myargs ]; return fn.apply( ctx, args ); };';
	        /* jshint -W054 */
	        _proxy[method] = (new Function('ctx', 'fn', fn))(_that, _beginCall);
	        /* jshint +W054 */
	      }
	    }

	    //// EVENTS
	    for (i = 0; i < events.length; i++) {
	      event = events[i];
	      _eventPublishers[event] = new SWAC.Eventing.Publisher(event);
	      _proxy[event] = _eventPublishers[event].event;
	    }

	    //// INTERFACES
	    _that.interfaces = _interfaces = new SWAC.Interfaces(interfaces, _that);

	    //// DPCS
	    failed = function (reason) {
	      defer.reject(reason);
	    };

	    proceed = function (value) {
	      var services = SWAC.Services.list(),
        i = 0,
        cntService = [],
            servicesOption = {};
	      for (i = 0; i < services.length; i++) {
	        servicesOption[services[i]] = SWAC.Services.getInfo(services[i]);
	        if (!servicesOption[services[i]]['provider']) {
	          if (SWAC._internal.Utils.getFullName()) { //support for mixed component performing the service registration before receiving the fullName (e.g.: before swacboot.start)
	            servicesOption[services[i]]['provider'] = SWAC._internal.Utils.getFullName();
	          }
	          else if (typeof window['swacPostMessage'] !== 'function' && window.parent === self) {
	            servicesOption[services[i]]['provider'] = ['<root>']; //support for top level container that will never have a fullName ... 
	          }
	          else { //no service delegation without provider info
	            servicesOption[services[i]]['delegable'] = false;
	          }
	        }
	      }
	      if (SWAC._internal.Utils.checkVersion(_that.swacVersion, '1.4.0') >= 0) { //service delegation requires swacVersion >= 1.4.0
	        if (typeof SWAC.Hub.instance === 'object') {
	          cntService = SWAC.Hub.instance.services.list({ delegable: true });
	          for (i = 0; i < cntService.length ; i++) {
	            if (SWAC._internal.Utils.indexOf(services, cntService[i]) === -1) {
	              servicesOption[cntService[i]] = SWAC.Hub.instance.services.getInfo(cntService[i]);
	            }
	          }
	        }
	      }

	      // Enable prolong also for beginExpose
	      internalDefer = new SWAC.Defer();
	      defer.fulfill(internalDefer.promise);

	      SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.Internal, 'ready', [services, servicesOption]).then(
          function () {
            internalDefer.fulfill();
            _containerOnReadyEvent.notify({ name: _name }, true);
            _onReady.notify({ name: _name }, true);
          },
                  function (reason) {
                    internalDefer.reject(reason);
                  });
	    };

	    flags = SWAC.DPC._internal.Flags.Proxy | SWAC.DPC.Permissions.Write | SWAC.DPC.Permissions.Read;

	    _rootnode = new SWAC.DPC.Node(_createForwarder(), _id, flags);

	    _privateDpc = _rootnode.access(_id); // internal accessor, full permissions

	    SWAC.Communication._internal.beginCall(_name, SWAC.Config.TimeOuts.Internal, 'bind', []).then(
        proceed, failed
      );

	    return defer.promise;
	  },

  /**
  * Fires an event
  *
  * @protected
  * @method fire
  * @param {string} evtname name of event to fire
  * @param {object} evtobject data of event
  * @param {object} inf interface object
  */
	  _fire = function (evtname, evtobject, inf) {
	    if (typeof inf === 'string') {
	      _interfaces._internal.fire(evtname, evtobject, inf);
	    } else {
	      _eventPublishers[evtname].notify(evtobject);
	    }
	  },

  /**
  * Forward dpc action into internal private dpc
  *
  * @protected
  * @method dpcChanged
  * @param {string} key key of dpc node
  * @param {string} type action on dpc node (remove|add|set)
  * @param {object} content content of dpc node action
  */
	  _dpcChanged = function (key, type, content) {

	    var succCallback, publicNode = null;
	    if (type === 'remove') {
	      SWAC.Logging.log('CON-IN: Node/Data ' + key + ' within DPC ' + _name + ' got removed...', SWAC.Logging.Level.Internal);
	    }
	    else if (type === 'add') {
	      SWAC.Logging.log('CON-IN: Node ' + key + ' within DPC ' + _name + ' got added...', SWAC.Logging.Level.Internal);
	    }
	    else if (type === 'set') {
	      SWAC.Logging.log('CON-IN: Data ' + key + ' within DPC ' + _name + ' got added...', SWAC.Logging.Level.Internal);
	    }
	    else {
	      SWAC.Logging.log('CON-IN: DPC-Proxy, Unknown content: ' + _name + ',' + key + ',' + type, SWAC.Logging.Level.Internal);
	    }

	    if (type === 'remove') {
	      _privateDpc.remove(key);
	    } else if (type === 'add') {
	      {
	        if (key.toLowerCase().indexOf('private.') !== -1) {
	          content.flags = content.flags ^ SWAC.DPC.Permissions.Write;
	        }
	        if (key === 'public') {
	          if (_rootnode.open('public') === undefined) {
	            publicNode = new SWAC.DPC.Node(_rootnode, _id, SWAC.DPC.Permissions.Read | SWAC.DPC.Permissions.Write | SWAC.DPC._internal.Flags.Proxy, 'public');
	            publicNode.componentVersion = _that.swacVersion;
	            publicNode.addDpcValues = _addDpcValues;
	          }
	        }
	        else {
	          _privateDpc.add(key, content.flags);
	        }
	        if (key === 'private') {
	          _status = _rootnode.open('private').access();
	          _that.status = _status;
	        }
	        if (key === 'public') {
	          _dpc = _rootnode.open('public').access();
	          _that.dpc = _dpc;
	        }
	      }
	    } else if (type === 'set') {
	      {
	        if (key.toLowerCase().indexOf('private.') !== -1) {
	          if (content.flags & SWAC.DPC.Permissions.Write) {
	            content.flags = content.flags ^ SWAC.DPC.Permissions.Write;
	          }
	        }
	        _privateDpc.set(key, (_addDpcValues) ? content.value : null, content.type, content.flags); // set (without setting an actual value)
	        if (!window.addEventListener) {
	          if ((key === 'private.isDirty') && (typeof (content.value) === 'boolean')) {
	            SWAC.Container._internal.setComponentInternalStatus(_name, content.value);
	          }
	        }
	      }
	    }

	    if (((type === 'set')) && (key.toLowerCase().indexOf('private.') !== -1)) {
	      succCallback = function () {
	        return function (value) {
	          if (typeof (value) === 'boolean') {
	            SWAC.Container._internal.setComponentInternalStatus(_name, value);
	          }
	        };
	      };
	      _rootnode.access().open(key).beginGet().then(succCallback());
	    }
	  },

	  /**
	* Closes communication versus component and removes it
	*
	* @protected
	* @method close
	* @param {string} reason reason for close action
	*/
	  _close = function (reason) {
	    SWAC.Logging.log('Close request received, removing component.', SWAC.Logging.Level.External);
	    _beginRemove(reason);
	  },

	  /**
  * Initialize handshanke between component and container
  *
  * @protected
  * @method beginHandshake
  * @param {Function} tlsHandler handler to manage TLS
  * @param {Number} timeout handshake timeout
  */
	_beginHandshake = function (tlsHandler, timeout) {
	  return _authentication._internal.beginHandshake(tlsHandler, null, timeout);
	},

  /**
  * Send TLS message to container
  *
  * @protected
  * @method tlsMessage
  * @param {String} message TLS message to send
  */
	_tlsMessage = function (message) {
	  _authentication._internal.receiveMessage(message);
	},

   /**
  * Returns current url of component
  *
  * @protected
  * @method getCurrentUrl
  * @return {String} Return last url of component.
  */
  _getCurrentUrl = function () {
    return _lastUrl;
  },

   /**
  * Set current url of component
  *
  * @protected
  * @method setCurrentUrl
  * @param {String} lastUrl current url
  */
  _setCurrentUrl = function (lastUrl) {
    _lastUrl = lastUrl;
  },

   /**
  * Returns the html domain of the component
  *
  * @method getDomain
  * @return {string} domain domain of component
  */
  _getDomain = function () {
    return _authentication.getDomain();
  },

  /**
  * Manage the removeComponent bubbling notification 
  * Clean local service references of the component and bubble to the upper level if present
  *
  * @protected
  * @method removeComponentServiceAndBubble
  */
	_removeComponentServiceAndBubble = function () {
	  var args = this.o;
	  SWAC.Services._internal.removeServices(JSON.stringify(args)); //args is the component fullName
	  if (SWAC._internal.Utils.getFullName()) { // it's null if root
	    SWAC.Communication._internal.call(null, 'removeComponentServiceAndBubble', null, args);
	  }
	},

  /**
  * Remove the specified event from internal list of registered events
  *
  * @private
  * @method _removeFromRegisteredEventList
  * @param {String} event event name
  */
  _removeFromRegisteredEventList = function (event) {
    var i;

    for (i = _registeredEventList.length - 1; i >= 0; i--) {
      if (_registeredEventList[i].name === event) {
        _registeredEventList.splice(i, 1);
      }
    }
  },

  /**
  * Get the specified event from internal list of registered events
  *
  * @protected
  * @method getRegisteredEvent
  * @param {String} event event name
  * @return {Object} registered event item
  */
  _getRegisteredEvent = function (event) {
    var item;

    for (item in _registeredEventList) {
      if (_registeredEventList[item].name === event) {
        return _registeredEventList[item];
      }
    }
    return null;
  },

  /**
  * Get an event info object containing registration level and event category
  *
  * @private
  * @method _getEventLevelAndCategory
  * @param {String} eventName event name
  * @return {Object} event info item, level property is an empty string if the event is not supported
  */
   _getEventLevelAndCategory = function (eventName) {
     var eventLevel = {
       level: '',
       category: ''
     },
      nestedMouseEventList = _supportedMouseEventList.split(' ');

     if (SWAC._internal.Utils.indexOf(nestedMouseEventList, eventName) > -1) {
       // a message will be sent to the component to attach event to the document inside iFrame and propagated to all the inner components
       eventLevel.level = '_nested';
       eventLevel.category = 'MouseEvents';
     }

     return eventLevel;
   },

  /**
  * Create the proper event object
  *
  * @private
  * @method _eventAdapter
  * @param {Object} args event arguments
  * @return {Object} event object
  */
  _eventAdapter = function (args) {
    var evtObj = null,
      evt = null;

    // get event level and its category
    evt = _getEventLevelAndCategory(args.type);
    // if the event is supported check the category and create the proper event object
    if (evt.level !== '') {
      switch (evt.category) {
        case 'MouseEvents':
          evtObj = document.createEvent('MouseEvents');
          evtObj.initMouseEvent(args.type, args.bubbles, args.cancelable, null, args.detail, args.screenX, args.screenY,
          args.clientX, args.clientY, args.ctrlKey, args.altKey, args.shiftKey, args.metaKey, args.button, _iframe);
          break;
      }
    }
    evt = null;

    return evtObj;
  },

  /**
  * Manage the received event and fire or notify it to the parent
  *
  * @protected
  * @method manageEvent
  * @param {Object} args event arguments
  */
  _manageEvent = function (args) {
    var evt = null, i,
      regEvent = null;

    // get the event object from internal register
    regEvent = _getRegisteredEvent(args.type);

    if (regEvent !== null) {
      // create the proper event object
      evt = _eventAdapter(args);

      // add a custom property to the event object containing the SWAC Component instance
      evt.SWACComponent = _that;

      if (regEvent.bubble === true) {
        // fire the event
        _iframe.dispatchEvent(evt);
      }

      // if the event has been explicitly requested from the parent execute all callback functions
      if (regEvent.callback.length > 0) {
        for (i = 0; i < regEvent.callback.length; i++) {
          if (regEvent.callback[i]) {
            regEvent.callback[i](evt);
          }
        }
      }

      // if the event is inherited from parent and not inserted from bubble, send a manageEvent message to it
      if (regEvent.inherited && !regEvent.insertFromBubble) {
        SWAC.Communication._internal.call(null, 'manageEvent', [args]);
      }

      regEvent = null;
      evt = null;
    }
    else {
      SWAC.Logging.log('Unregistered event received.', SWAC.Logging.Level.Internal);
    }
  },

  /**
  * Subscribe a function to one or more events
  *
  * @method subscribe
  * @param {Function} callback function to call
  * @param {Object} filters one or more event names, if empty the callback is subscribed to all the supported events
  * @return {Boolean} subscribe response
  */
  _subscribeEvent = function (callback, filters) {
    var arrayFilters, i,
      inherited = (arguments.length === 3) ? arguments[2] : false, // hidden parameter filled by parent to support mixed component's events propagation
      _callback,
      registeredEvent = null,
      evtLevel = null,
      eventToEnable = [],
      retVal = false;

    // old version component cannot manage events
    if ((SWAC._internal.Utils.checkVersion(_that.swacVersion, '1.1.0') <= 0)) {
      SWAC.Logging.log('Event management not available for \'' + _that.name() + '\' component', SWAC.Logging.Level.External);
      return false;
    }

    if ((typeof callback !== 'function') && !inherited) {
      SWAC.Logging.log('Callback parameter must be a function', SWAC.Logging.Level.External);
      return false;
    }

    if (typeof callback !== 'function') {
      _callback = [];
    }
    else {
      _callback = [callback];
    }

    // array copy to always work with an array parameter
    if ((filters === '') || (filters === null) || (filters === undefined)) {
      arrayFilters = _supportedMouseEventList.split(' ');
    }
    else {
      if (SWAC._internal.Utils.isArray(filters)) {
        arrayFilters = filters;
      }
      else {
        if ((typeof filters) === 'string') {
          arrayFilters = [filters];
        }
      }
    }

    for (i = 0; i < arrayFilters.length; i++) {
      // get the event object from internal register
      registeredEvent = _getRegisteredEvent(arrayFilters[i]);

      // get event level and its category
      evtLevel = _getEventLevelAndCategory(arrayFilters[i]);

      if (registeredEvent === null) {
        // if the event is supported register the event at the appropriate level
        if (evtLevel.level !== '') {
          // event added to list of registered events
          _registeredEventList.push({ name: arrayFilters[i], bubble: false, inherited: inherited, callback: _callback.slice(0) });
          if (evtLevel.level === '_nested') {
            // event added to enable list
            eventToEnable.push(arrayFilters[i]);
          }
          if (!retVal) {
            // at least one event has been successfully registered
            retVal = true;
          }
        }
        else {
          SWAC.Logging.log(arrayFilters[i] + ' event is not supported.', SWAC.Logging.Level.External);
        }
      }
      else {
        // only one record for a callback
        if (SWAC._internal.Utils.indexOf(registeredEvent.callback, callback) === -1) {
          registeredEvent.callback.push(callback);
        }

        if (!retVal) {
          // at least one event has been successfully registered
          retVal = true;
        }

        // local instance is removed
        registeredEvent = null;
      }
    }

    // single postMessage call with enable list
    if (eventToEnable.length > 0) {
      SWAC.Communication._internal.call(_name, 'enableComponentEvent', [eventToEnable, evtLevel.level]);
    }

    return retVal;
  },

  /**
  * Unsubscribe a function from event management
  *
  * @method unsubscribe
  * @param {Function} callback function to remove
  */
  _unsubscribeEvent = function (callback) {
    var evtLevel = null, i,
      item, cbIndex,
      hiddenEventToDisable = (arguments.length === 2) ? arguments[1] : [], // hidden parameter filled by parent to support mixed component's events propagation
      registeredEvent,
      eventToDisable = [];

    if ((typeof callback !== 'function') && (hiddenEventToDisable.length === 0)) {
      SWAC.Logging.log('Callback parameter must be a function', SWAC.Logging.Level.External);
      return;
    }

    if (typeof callback === 'function') {
      // cycle all event records
      for (item in _registeredEventList) {
        // if the event has callback
        if (_registeredEventList[item].callback.length > 0) {
          // identify the specified callback
          cbIndex = SWAC._internal.Utils.indexOf(_registeredEventList[item].callback, callback);
          // if found remove it
          if (cbIndex !== -1) {
            // remove specified callback
            _registeredEventList[item].callback.splice(cbIndex, 1);
            if (_registeredEventList[item].callback.length === 0 && !_registeredEventList[item].insertFromBubble) {
              // if no callback is present check if the event record is no more useful
              if (!_registeredEventList[item].inherited) {
                // get event level and its category
                evtLevel = _getEventLevelAndCategory(_registeredEventList[item].name);
                // event added to disable list
                eventToDisable.push(_registeredEventList[item].name);
              }
            }
          }
        }
      }
    }
    else {
      // nested event (created by parent) that needs to be disabled
      evtLevel = {
        level: '_nested'
      };
      for (i = 0; i < hiddenEventToDisable.length; i++) {
        // get the event object from internal register
        registeredEvent = _getRegisteredEvent(hiddenEventToDisable[i]);

        if ((registeredEvent !== null) && !registeredEvent.insertFromBubble) {
          eventToDisable.push(registeredEvent.name);
        }
      }
    }

    if (eventToDisable.length > 0) {
      for (i = 0; i < eventToDisable.length; i++) {
        // event is no longer necessary, it is removed from registered list
        _removeFromRegisteredEventList(eventToDisable[i]);
      }
      // single postMessage call with disable list
      SWAC.Communication._internal.call(_name, 'disableComponentEvent', [eventToDisable, evtLevel.level]);
    }
  },

  /**
  * Set bubble value for one or more events
  *
  * @method bubble
  * @param {Boolean} enable bubble value
  * @param {Object} filters one or more event names, if empty the bubble is set to all the supported events
  */
  _bubbleEvent = function (enable, filters) {
    var arrayFilters, i,
      registeredEvent = null,
      evtLevel = null,
      eventToEnable = [],
      eventToDisable = [];

    if ((typeof enable) === 'boolean') {
      // array copy to always work with an array parameter
      if ((filters === '') || (filters === null) || (filters === undefined)) {
        arrayFilters = _supportedMouseEventList.split(' ');
      }
      else {
        if (SWAC._internal.Utils.isArray(filters)) {
          arrayFilters = filters;
        }
        else {
          if ((typeof filters) === 'string') {
            arrayFilters = [filters];
          }
        }
      }

      for (i = 0; i < arrayFilters.length; i++) {
        // get the event object from internal register
        registeredEvent = _getRegisteredEvent(arrayFilters[i]);

        // get event level and its category
        evtLevel = _getEventLevelAndCategory(arrayFilters[i]);

        if (registeredEvent === null) {
          // if the event is supported register the event at the appropriate level
          if (evtLevel.level !== '') {
            if (enable) {
              // event added to list of registered events
              _registeredEventList.push({ name: arrayFilters[i], bubble: enable, inherited: false, callback: [], insertFromBubble: true });
              if (evtLevel.level === '_nested') {
                // event added to enable list
                eventToEnable.push(arrayFilters[i]);
              }
            }
          }
          else {
            SWAC.Logging.log(arrayFilters[i] + ' event is not supported.', SWAC.Logging.Level.External);
          }
        }
        else {
          // event is already present, remove it if inserted from bubble
          if (registeredEvent.insertFromBubble && (registeredEvent.callback.length === 0)) {
            _removeFromRegisteredEventList(arrayFilters[i]);
            eventToDisable.push(arrayFilters[i]);
          }
          else {
            // event is already present, bubble value is changed
            registeredEvent.bubble = enable;
            registeredEvent.insertFromBubble = true;
          }
          // local instance is removed
          registeredEvent = null;
        }
      }

      // single postMessage call with enable list
      if (eventToEnable.length > 0) {
        SWAC.Communication._internal.call(_name, 'enableComponentEvent', [eventToEnable, evtLevel.level]);
      }

      // single postMessage call with disable list
      if (eventToDisable.length > 0) {
        SWAC.Communication._internal.call(_name, 'disableComponentEvent', [eventToDisable, evtLevel.level]);
      }
    }
    else {
      SWAC.Logging.log('Enable parameter is not valid', SWAC.Logging.Level.External);
    }
  };

  //////////////
  // PUBLIC   //
  //////////////

  // No return-block here to keep object type SWAC.Component (otherwise untyped <object>)

  // API
  this.beginShow = _beginShow;
  this.beginRemove = _beginRemove;
  this.getDomain = _getDomain;

  this.beginPosition = _beginPosition;

  this.beginCleanUpRequest = _beginCleanUpRequest;
  this.getPosition = _getPosition;
  this.type = _type;

  /**
  * Component's name.
  *
  * @method name
  * @return {String} returns the name of the component
  */
  this.name = function () { return _name; };

  /**
   * Checks if the component has an user interface.
   *
   * @method hasUI
   * @return {Boolean} returns if the component has UI.
   */
  this.hasUI = function () { return _settings.flavor === 'ui'; };

  /**
  * Component SWAC library version.
  *
  * @property swacVersion
  * @return {string} returns the SWAC library version used in component
  */
  this.swacVersion = '1.0.0';

  // EVENTS
  this.onReady = _onReady.event;

  this.onMouseEvents = {
    subscribe: _subscribeEvent,
    unsubscribe: _unsubscribeEvent,
    bubble: _bubbleEvent
  };

  // INTERNAL
  this._internal = {
    beginExpose: _beginExpose,
    close: _close,
    fire: _fire,
    dpcChanged: _dpcChanged,
    beginHandshake: _beginHandshake,
    tlsMessage: _tlsMessage,
    beginRequestInterface: _beginRequestInterface,
    beginRequestService: _beginRequestService,
    callService: _callService,
    setCurrentUrl: _setCurrentUrl,
    getCurrentUrl: _getCurrentUrl,
    iframe: _iframe,
    lastIsDirtyValue: _lastIsDirtyValue,
    manageEvent: _manageEvent,
    getRegisteredEvent: _getRegisteredEvent,
    removeComponentServiceAndBubble: _removeComponentServiceAndBubble
  };

  // PROXY
  this.proxy = _proxy;

  /**
  * Provides methods to access all component interfaces
  *
  * @property interfaces
  * @return {object} returns the SWAC.Interfaces object
  */
  this.interfaces = null;  // will be set during beginExpose
};


///////////////////////////////////////////
// lib/container/container.js


/**
 * Single instance object that permits to create and destroy SWAC.Component
 *
 * @class SWAC.Container
 * @constructor
 * 
 */
SWAC.Container = (function () {

  //////////////
  // PRIVATE  //
  //////////////

  var
      _language = window.navigator.language,
      _componentRemovalInProgress = false,

      _observer = null,
      _beginCloseCalls = {},

      // Holds successfully created components only.
      _publicRegistry = {},

      // Used during hand-shake only.
      _creationRegistry = {},

      _status = (new SWAC.DPC.Node(null, 'Owner', SWAC.DPC.Permissions.Read, 'status', false)),

      _onRemoved = new SWAC.Eventing.Publisher('onRemoved');

      _status.set('Owner', 'isDirty', false, 'boolean');

    /**
  * Method for removing a component.
  *
  * @protected
  * @method remove
  * @param {String} name name of the component.
  * @param {object} iframe iframe that contains the component.
  * @param {object} reason reason for component removal.
  */
     var _removeComponent = function (name, iframe, reason) {
       var localCmpName = SWAC._internal.Utils.getFullName();

       if (_publicRegistry[name]) {
         if (iframe) {
           iframe.src = 'about:blank';
           if (iframe.parentNode) {
             _componentRemovalInProgress = true;
             iframe.parentNode.removeChild(iframe);
           }
           iframe = null;
         }
         reason = reason ? reason : '';
         if (localCmpName) {
           localCmpName.push(name);
           _publicRegistry[name]._internal.removeComponentServiceAndBubble.apply({ o: localCmpName });
         }
         else {
           SWAC.Services._internal.removeServices('["<root>","' + name + '"]'); // remove all component-bound service instances.
         }
         delete _publicRegistry[name];
         _onRemoved.notify({ name: name, reason: reason });
       }
     };

  /**
 * Starting from parameters this method creates the iframe containing the component
 *
 * @private
 * @method _beginCreateIFrame
 * @param {object} arg arguments for creating the iframe
 * @return {object} an object defer.promise.
 */
  var _beginCreateIFrame = function (arg) {
    var defer = new SWAC.Defer(),
      parent = arg.parent ? arg.parent : document.body,
      source = arg.source,
      settings = arg.settings,
      name = arg.name,
      callBackOnLoadIframe = null,
      onLoadErrorCallback = null,
      iframe;

    // Add the iframe

    iframe = document.createElement('iframe');
    iframe.src = source;
    iframe.frameBorder = 0;
    iframe.name = name;

    iframe.style.position = 'absolute';
    iframe.SWACLoaded = false;

    if ((settings.flavor !== 'ui') && (!settings.left || !settings.top)) {
      settings.left = '0px';
      settings.top = '0px';
    }
    else {
      if ((!window.addEventListener) && (!settings.left || !settings.top)) { //IE8
        settings.left = '0px';
        settings.top = '0px';
      }
      else {
        iframe.style.left = settings.left;
        iframe.style.top = settings.top;
      }
    }

    iframe.style.width = '0px'; // start with 0, since iframes do not support visibility:hidden
    iframe.style.height = '0px'; // start with 0, since iframes do not support visibility:hidden
    iframe.style.display = 'none';

    _creationRegistry[arg.name].iframe = iframe;

    callBackOnLoadIframe = function (e) {
      var target = e.target ? e.target : e.srcElement;

      if (!target) {
        defer.reject(new SWAC.Reason(13005));
        return;
      }
      if (_creationRegistry[target.name] || _publicRegistry[target.name]) {
        if (target.SWACLoaded === false) {
          // Component creation
          target.SWACLoaded = true;
          defer.fulfill(target);
        }
        else {
          if (_publicRegistry[target.name]) {
            target.setAttribute('redirect-detected', 'true');
            SWAC.Logging.log('Redirect detected in component ' + target.name + '.', SWAC.Logging.Level.External);
          }
        }
      }
    };

    if (iframe.addEventListener) {
      iframe.addEventListener('load', callBackOnLoadIframe);
    }
    else {
      iframe.attachEvent('onload', callBackOnLoadIframe);
    }

    onLoadErrorCallback = function () {
      iframe.src = 'about:blank';
      try {
        _componentRemovalInProgress = true;
        parent.removeChild(iframe);
        iframe = null;
      }
      catch (e) {
        SWAC.Logging.log('onLoadErrorCallback of iframe exception: ' + e, SWAC.Logging.Level.Internal);
      }
      defer.reject(new SWAC.Reason(11014));
    };

    if (iframe.addEventListener) {
      iframe.addEventListener('error', onLoadErrorCallback);
    }
    else {
      iframe.attachEvent('onerror', onLoadErrorCallback);
    }

    parent.appendChild(iframe);
    iframe = null;

    return defer.promise;
  },

    _onFailure = new SWAC.Eventing.Publisher('onFailure'),

    /**
    * Fire OnFailure event.
    *
    * @private
    * @method fireOnFailure
    * @param {String} name name of the component.
    * @param {String} phase phase where the failure occours.
    * @param {String} reason failure reason.
    * @param {Boolean} async asyncronous event fire.
    */
  _fireOnFailure = function (name, phase, reason, async) {
    _onFailure.notify({ name: name, details: { phase: phase, reason: reason } }, async);
  },

   /**
  * Check if an iframe is related to a component.
  *
  * @private
  * @method checkIframe
  * @param {String} name name of the component.
  * @return {object} iframe iframe object.
  */
  _checkIframe = function (name) {
    var iFrameList = document.querySelectorAll('iframe[name="' + name + '"]'),
      currentIframe = null,
      relatedComponent = null;

    if (iFrameList.length > 0) {
      relatedComponent = SWAC.Container.get({ name: name });
      if (relatedComponent instanceof SWAC.Component) {
        for (currentIframe in iFrameList) {
          if (iFrameList.hasOwnProperty(currentIframe)) {
            if (relatedComponent._internal.iframe === iFrameList[currentIframe]) {
              return true;
            }
          }
        }
      }
    }

    return false;
  },

  /**
   * Creates a SWAC component or a series of SWAC components
   *
   * @method beginCreate
   * @param {object} args one or more components to create
   * @return {object} an object defer.promise.
   */
  _beginCreate = function (args) {
    // Check what kind of argument we got:
    //  - Array, that is a bunch of components. (Even nested arrays are fine.)
    //  - object, that is a single component
    //  - anything else (int, string) is not valid
    var defer = new SWAC.Defer(),
      ok = 0,
      failed = 0,
      all = 0,
      check = function () {
        if (ok === all) {
          defer.fulfill();
        } else if ((ok + failed) === all) {
          defer.reject(new SWAC.Reason(13006));
        }
      },
      onsuccess = function () {
        ok++;
        check();
      },
      onfailure = function () {
        failed++;
        check();
      },
      i = 0,
      checkSource = function () {
        var _iframe = document.createElement('iframe');
        _iframe.src = args.source;
        if (_iframe.src === window.location.href) {
          SWAC.Logging.log('Error during component creation: Source ' + args.source + ' is already used by container.', SWAC.Logging.Level.External);
          _iframe = null;
          return false;
        }
        _iframe = null;
        return true;
      };

    // In case of array, start simple recursion and chain all promises.
    if (SWAC._internal.Utils.isArray(args)) {
      all = args.length;

      for (i = 0; i < all; i++) {
        SWAC.Container.beginCreate(args[i]).then(onsuccess, onfailure);
      }

      return defer.promise;
    }

    // In case of object, start ducktyping.
    if ((args !== null) && (typeof args === 'object')) {

      if (_creationRegistry[args.name] || _publicRegistry[args.name]) {
        if (!SWAC.Container._internal.checkIframe(args.name)) {
          SWAC.Logging.log('Warning during component creation: ' + args.name + ' is already defined but its integrity is compromised.', SWAC.Logging.Level.External);
          _fireOnFailure(args.name, 'integrityCheck', 'Component integrity is compromised', false);
          _removeComponent(args.name, null, new SWAC.Reason(15005));
        }
        else {
          SWAC.Logging.log('Error during component creation: ' + args.name + ' is already defined.', SWAC.Logging.Level.External);
          _fireOnFailure(args.name, 'creation', 'Component already present in registry', true);
          defer.reject(new SWAC.Reason(13003));
          return defer.promise;
        }
      }

      if (!args.source || !args.name) {
        if (!args.name) {
          SWAC.Logging.log('Error during component creation: Name is missing.', SWAC.Logging.Level.External);
        }
        if (!args.source) {
          SWAC.Logging.log('Error during component creation: Source is missing.', SWAC.Logging.Level.External);
        }
        defer.reject(new SWAC.Reason(13008));
        return defer.promise;
      }

      if (!checkSource()) {
        defer.reject(new SWAC.Reason(13008));
        return defer.promise;
      }

      if (!args.settings) {
        args.settings = {};
      }

      if (!args.settings.flavor) {
        args.settings.flavor = 'ui';
      }

      _creationRegistry[args.name] = {
        name: args.name,
        type: args.type,
        state: 'pending',
        settings: args.settings,
        promise: defer,
        lastUrl: ''
      };

      _beginCreateIFrame(args).then(
          // onSuccess: iframe got created, there should arrive a boot-message before time-out.
          function (iframe) {
            var timeoutHandler = function () {
              if (_creationRegistry[args.name] && (_creationRegistry[args.name].state === 'pending')) {
                // Remove iframe
                iframe.src = 'about:blank';
                if (iframe.parentNode) {
                  _componentRemovalInProgress = true;
                  iframe.parentNode.removeChild(iframe);
                }
                iframe = null;
                _fireOnFailure(args.name, 'creation', 'Timeout in beginCreateIframe', true);

                SWAC.Logging.log('Time-out during creation: ' + args.name, SWAC.Logging.Level.External);
                _creationRegistry[args.name].promise.reject(new SWAC.Reason(13007));
                delete _creationRegistry[args.name];
              }
            };

            if (_creationRegistry[args.name]) {
              if (SWAC.Config.TimeOuts.Enabled) {
                _creationRegistry[args.name].timeout = window.setTimeout(timeoutHandler, SWAC.Config.TimeOuts.Create);
              }
            }
          },
          function (reason) {
            defer.reject(reason);
          }
      );

      return defer.promise;
    }

    defer.reject(new SWAC.Reason(13008));
    return defer.promise;
  },

   /**
   * Identifies a component by its iframe.
   *
   * @protected
   * @method identify
   * @param {object} iframe iframe that contains the component.
   * @param {Boolean} published parameter that indicate if the component is published or not.
   */
  _identify = function (iframe, published) {
    var registry = published ? _publicRegistry : _creationRegistry,
      key = null,
      component = null;

    for (key in registry) {
      if (registry.hasOwnProperty(key)) {
        component = registry[key];
        if (registry === _creationRegistry) {
          if ((component.iframe.contentWindow === iframe) || (component.iframe === iframe)) {
            return component;
          }
        }
        else {
          if ((component._internal.iframe.contentWindow === iframe) || (component._internal.iframe === iframe)) {
            return component;
          }
        }
      }
    }

    // If started searching within currently created components, also search within those already published
    if (!published) {
      return _identify(iframe, true);
    }
  },

    _onCreated = new SWAC.Eventing.Publisher('onCreated'),
    _onReady = new SWAC.Eventing.Publisher('onReady'),

   /**
   * Component could successfully be loaded.
   *
   * @protected
   * @method accept
   * @param {object} iframe iframe that contains the component.
   */
  _acceptComponent = function (iframe) {
    var component = _identify(iframe);

    if (component && component.promise) {
      if (SWAC.Config.TimeOuts.Enabled) {
        window.clearTimeout(component.timeout);
      }
      component.state = 'hidden';

      _publicRegistry[component.name] = new SWAC.Component(component.name, component.iframe, component.type, component.settings, component.lastUrl, _onReady);
      _publicRegistry[component.name]._internal.lastIsDirtyValue = false;

      if (component.attributes) {
        _publicRegistry[component.name].attributes = component.attributes;
      }

      if (component.authentication) { // component requested handshake
        _publicRegistry[component.name]._internal.beginHandshake(SWAC.Config.Container.Authentication.TlsHandler, SWAC.Config.TimeOuts.Authentication.Handshake).then(
            function (value) {
              SWAC.Logging.log('Authentication ok.', SWAC.Logging.Level.External);
            },
            function (reason) {
              var comp = _publicRegistry[component.name];
              if (comp) {
                SWAC.Logging.log('Authentication failed.', SWAC.Logging.Level.External);
                comp.beginRemove({ reason: 'auth-failed' });
              }
            });
      }
      delete _creationRegistry[component.name];

      component.promise.fulfill();

      // Creation-phase in component life-cycle successfull
      _onCreated.notify({ name: component.name }, true);

      return true;
    }
    else {
      return false;
    }
  },

  /**
   * Sets the component state in bag
   *
   * @private
   * @method _setComponentInternalStatusInBag
   */
    _setComponentInternalStatusInBag = function (name, privateStatus, bag, component, oldValue) {
      var failCallback,
      closeFlag = true,
      cleanCount = 0,
      i = 0,
      isDirty;

      failCallback = function () {
        return function (reason) {
          if (reason.reasonCode !== 11005 || !bag.closeOnCleanUpTimeOut) {
            bag.beginCloseDeferer.reject(reason);
            if (SWAC.Config.TimeOuts.Enabled) {
              window.clearTimeout(bag.beginCloseTimer);
            }
            delete _beginCloseCalls[bag.guid];
          }
        };
      };

      if ((component._internal.lastIsDirtyValue === true) && (oldValue === false) && (bag.closingBroadcast === true)) {
        component.beginCleanUpRequest().then(null, failCallback());
      }

      if (component._internal.lastIsDirtyValue === false) {
        for (i = 0; i < bag.closingComponents.length; i++) {
          if (bag.closingComponents[i].component !== null) {
            isDirty = bag.closingComponents[i].component._internal.lastIsDirtyValue;
            if (isDirty) {
              if (bag.closingBroadcast) {
                closeFlag = false;
              }
            }
            else {
              cleanCount++;
            }
            if (cleanCount === bag.closingComponents.length) {
              bag.loopInterrupted = false;
            }
          }
        }

        if ((bag.closingBroadcast && closeFlag) || (!bag.closingBroadcast && !bag.loopInterrupted)) {
          for (i = 0; i < bag.closingComponents.length; i++) {
            if (bag.closingComponents[i].component !== null) {
              bag.closingComponents[i].component.beginRemove();
            }
          }
          if (SWAC.Config.TimeOuts.Enabled) {
            window.clearTimeout(bag.beginCloseTimer);
         }
        }
      }
    },

   /**
   * Returns component instances
   *
   * @method get
   * @param {object} filter by type returns an array, by name returns an instance
   * @return {object} a SWAC.Component or an array of SWAC.Component
   */
  _get = function (filter) {
    var found = [],
      i = 0,
      candidate,
      candidateName,
      arr = [],
      entry,
      sameAttr;

    if (filter) {
      if (filter.name) {
        if (typeof (filter.name) === 'string') {
          if (!filter.type && !filter.dirty) {
            return _publicRegistry[filter.name];
          }
          else {
            found.push(_publicRegistry[filter.name]);
          }
        }
        else if (Object.prototype.toString.call(filter.name) === '[object Array]') {
          for (candidateName in filter.name) {
            if (filter.name.hasOwnProperty(candidateName)) {
              for (candidate in _publicRegistry) {
                if (_publicRegistry.hasOwnProperty(candidate) && _publicRegistry[candidate].name() === filter.name[candidateName]) {
                  found.push(_publicRegistry[candidate]);
                }
              }
            }
          }
        }
      }
      if (filter.type) {
        if (!filter.name) {
          for (candidate in _publicRegistry) {
            if (_publicRegistry.hasOwnProperty(candidate) && _publicRegistry[candidate].type() === filter.type) {
              found.push(_publicRegistry[candidate]);
            }
          }
        }
        else {
          for (i = found.length - 1; i >= 0; i--) {
            if (found[i] && found[i].type() !== filter.type) {
              found.splice(i, 1);
            }
          }
        }
      }
      if (filter.dirty) {
        if ((!filter.name) && (!filter.type)) {
          for (candidate in _publicRegistry) {
            if (_publicRegistry.hasOwnProperty(candidate) && (_publicRegistry[candidate]._internal.lastIsDirtyValue === filter.dirty)) {
              found.push(_publicRegistry[candidate]);
            }
          }
        }
        else {
          for (i = found.length - 1; i >= 0; i--) {
            if (found[i] && (found[i]._internal.lastIsDirtyValue !== filter.dirty)) {
              found.splice(i, 1);
            }
          }
        }
      }
      if (filter.attributes) {
        for (candidate in _publicRegistry) {
          if (_publicRegistry.hasOwnProperty(candidate) && _publicRegistry[candidate].attributes) {
            sameAttr = true;
            for (entry in filter.attributes) {
              if (filter.attributes.hasOwnProperty(entry)) {
                if (!_publicRegistry[candidate].attributes.hasOwnProperty(entry) || _publicRegistry[candidate].attributes[entry] !== filter.attributes[entry]) {
                  sameAttr = false;
                  break;
                }
              }
            }
            if (sameAttr) {
              found.push(_publicRegistry[candidate]);
            }
          }
        }
      }
      return found;
    }
    else {
      for (entry in _publicRegistry) {
        if (_publicRegistry.hasOwnProperty(entry)) {
          arr.push(_publicRegistry[entry]);
        }
      }
      return arr;
    }
  },

    /**
  * Sets true if at least one component is in dirty status
  *
  * @private
  * @method _updateContainerDirtyState
  */
  _updateContainerDirtyState = function () {
    var res = false,
      components = _get({ dirty: true });

    if (components.length > 0) {
      res = true;
    }

    _status.set('Owner', 'isDirty', res, 'boolean');
  },

    /**
   * Sets the component state (clean or dirty)
   *
   * @protected
   * @method setComponentInternalStatus
   * @param {string} name name of the component.
   * @param {boolean} privateStatus component status.
   */
   _setComponentInternalStatus = function (name, privateStatus) {
     var component = _get({ name: name }),
        oldValue, bagIt, bag;

     if (component) {
       oldValue = component._internal.lastIsDirtyValue;
       component._internal.lastIsDirtyValue = privateStatus;

       if (oldValue === privateStatus) {
         return;
       }
       _updateContainerDirtyState();

       for (bagIt in _beginCloseCalls) {
         if (_beginCloseCalls.hasOwnProperty(bagIt)) {
           bag = _beginCloseCalls[bagIt];
           if (SWAC._internal.Utils.indexOf(bag.closingComponentsNames, name, 0) > -1) {
             _setComponentInternalStatusInBag(name, privateStatus, bag, component, oldValue);
           }
         }
       }
     }
   },

  /**
   * Gets the component state (clean or dirty)
   *
   * @protected
   * @method getComponentInternalStatus
   * @param {string} name name of the component.
   * @return {boolean}  state of the component.
   */
  _getComponentInternalStatus = function (name) {
    var component = _get({ name: name });
    if (component) {
      return component._internal.lastIsDirtyValue;
    }
    throw new SWAC.Exception(1001);
  },

   /**
   * Discard and remove the component after a creation failure.
   *
   * @protected
   * @method discard
   * @param {object} iframe iframe that contains the component.
   */
  _discardComponent = function (iframe) {
    var component = _identify(iframe);

    if (component) {
      if (SWAC.Config.TimeOuts.Enabled) {
        window.clearTimeout(component.timeout);
      }
      component.state = 'removing';
      component.promise.reject(new SWAC.Reason(13010));

      if (component.iframe) {
        component.iframe.src = 'about:blank';
        if (component.iframe.parentNode) {
          _componentRemovalInProgress = true;
          component.iframe.parentNode.removeChild(component.iframe);
        }
        component.iframe = null;
      }

      // Creation-phase in component life-cycle failed
      _fireOnFailure(component.name, 'creation', 'Component discarded by communication protocol', false);

      delete _creationRegistry[component.name];
    }
  },

    /**
      * Method for searching a component inside bag.closingComponents array.
      *
      * @private
      * @method _findAndRemoveComponentfromList
      * @param {String} componentName name of the component.
      * @return {Boolean} true or false if the component is found.
      */
    _findAndRemoveComponentfromList = function (componentName, bag) {
      var i;
      for (i = 0; i < bag.closingComponents.length; i++) {
        if (bag.closingComponents[i].name === componentName) {
          bag.closingComponents.splice(i, 1);
          return true;
        }
      }
      return false;
    },

    /**
   * Checks for removed component
   *
   * @private
   * @method _compDisappears
   * @param {object} event data of the disappeared component
   */
  _compDisappears = function (event) {
    var bagIt, bag;
    for (bagIt in _beginCloseCalls) {
      if (_beginCloseCalls.hasOwnProperty(bagIt)) {
        bag = _beginCloseCalls[bagIt];
        if (SWAC._internal.Utils.indexOf(bag.closingComponentsNames, event.data.name, 0) > -1) {
          if (_findAndRemoveComponentfromList(event.data.name, bag)) {
            if (bag.closingComponents.length === 0) {
              bag.beginCloseDeferer.fulfill();
              delete _beginCloseCalls[bag.guid];
            }
          }
        }
      }
    }
  },

   /**
   * Closes and destroys a SWAC component or a series of SWAC components.
   *
   * @method beginClose
   * @param {String/Arrays} nameComponents String array, or single string, of component name to close. Null otherwirse send begin close message to all dirty components
   * @param {Boolean} broadcast parameter for calling the method in broadcast or sequential mode.
   * @param {Number} timeout millisecond timeout required for the closing operation.
   * @param {Boolean} behavior in case of timeout. If true all components will be closed.
   * @return {object} an object defer.promise.
   */
  _beginClose = function (nameComponents, broadcast, timeout, closeOnCleanUpTimeOut) {
    var components = null,
      tmpcomponent = null,
      closeFlag = true,
      removeAllComponents = null,
      failCallback = null,
       succClb = null,
      i = 0,
      isDirty,
      guid = SWAC.Guid.generate(),
      bag = {
        guid: guid
      };

    _beginCloseCalls[guid] = bag;
    bag.beginCloseDeferer = new SWAC.Defer();
    timeout = timeout || SWAC.Config.TimeOuts.Close;
    broadcast = ((broadcast === null) || (broadcast === undefined)) ? true : broadcast;

    if (closeOnCleanUpTimeOut !== null && closeOnCleanUpTimeOut !== undefined && closeOnCleanUpTimeOut !== '') {
      closeOnCleanUpTimeOut = closeOnCleanUpTimeOut;
    }
    else if (SWAC.Config.Container.Behaviors.CloseOnCleanUpTimeOut !== null && SWAC.Config.Container.Behaviors.CloseOnCleanUpTimeOut !== undefined && SWAC.Config.Container.Behaviors.CloseOnCleanUpTimeOut !== '') {
      closeOnCleanUpTimeOut = SWAC.Config.Container.Behaviors.CloseOnCleanUpTimeOut;
    }
    else if (SWAC.Config.Container.Behaviors.CloseTimeoutConfirm !== null && SWAC.Config.Container.Behaviors.CloseTimeoutConfirm !== undefined && SWAC.Config.Container.Behaviors.CloseTimeoutConfirm !== '') {
      closeOnCleanUpTimeOut = SWAC.Config.Container.Behaviors.CloseTimeoutConfirm;
    }
    else {
      closeOnCleanUpTimeOut = true;
    }

    bag.closeOnCleanUpTimeOut = closeOnCleanUpTimeOut;
    bag.closingBroadcast = broadcast;
    bag.loopInterrupted = false;

    if ((nameComponents === null) || (nameComponents === undefined)) {
      components = _get();
    }
    else {
      if (SWAC._internal.Utils.isArray(nameComponents)) {
        components = [];
        for (i = 0; i < nameComponents.length; i++) {
          tmpcomponent = _get({ name: nameComponents[i] });
          if (tmpcomponent) {
            components.push(tmpcomponent);
          }
        }
      }
      else {
        components = _get({ name: nameComponents });
        if (components) {
          components = [components];
        }
      }

      if (components === null || components === undefined || components.length === 0) {
        bag.beginCloseDeferer.reject(new SWAC.Reason(13015));
        delete _beginCloseCalls[guid];
        return bag.beginCloseDeferer.promise;
      }
    }

    if (!broadcast && (timeout < SWAC.Config.TimeOuts.CleanUp * components.length)) {
      SWAC.Logging.log('Warning: Close timeout is less than the sum of each component\'s timeout', SWAC.Logging.Level.External);
    }
    bag.closingComponents = [];  // Array of object {component: SWAC.Component, name: string}
    bag.closingComponentsNames = [];  // Array of component's name to close
    for (i = 0; i < components.length; i++) {
      if (components[i] !== null) {
        bag.closingComponentsNames.push(components[i].name());
        bag.closingComponents.push({ component: components[i], name: components[i].name() });
      }
    }

    removeAllComponents = function () {
      for (i = 0; i < components.length; i++) {
        if (components[i] !== null) {
          components[i].beginRemove();
        }
      }
    };

    if (SWAC.Config.TimeOuts.Enabled) {
      bag.beginCloseTimer = window.setTimeout(function () {
        if (closeOnCleanUpTimeOut) {
          removeAllComponents();
        }
        else {
          bag.beginCloseDeferer.reject(new SWAC.Reason(13011));
          delete _beginCloseCalls[guid];
        }
      }, timeout);
    }
    failCallback = function (reason) {
      if (reason.reasonCode !== 11005 || !closeOnCleanUpTimeOut) {
        bag.beginCloseDeferer.reject(reason);
        if (SWAC.Config.TimeOuts.Enabled) {
          window.clearTimeout(bag.beginCloseTimer);
        }
        delete _beginCloseCalls[guid];
      }
      else {
        if (broadcast) {
          return;
        }
        i++;
        if (components[i]) {
          isDirty = components[i]._internal.lastIsDirtyValue;
          if (isDirty) {
            components[i].beginCleanUpRequest().then(succClb, failCallback);
          }
        }
        else {
          bag.loopInterrupted = false;
        }
      }
    };

    succClb = function (value) {
      if (broadcast) {
        return;
      }
      i++;
      if (components[i]) {
        isDirty = components[i]._internal.lastIsDirtyValue;
        if (isDirty) {
          components[i].beginCleanUpRequest().then(succClb, failCallback);
        }
      }
      else {
        bag.loopInterrupted = false;
      }
    };

    for (i = 0; i < components.length; i++) {
      if (components[i]) {
        isDirty = components[i]._internal.lastIsDirtyValue;
        if (isDirty) {
          if (broadcast) {
            closeFlag = false;
          }
          components[i].beginCleanUpRequest().then(succClb, failCallback);
          if (!broadcast) {
            bag.loopInterrupted = true;
            break;
          }
        }
      }
    }

    if ((broadcast && closeFlag) || (!broadcast && !bag.loopInterrupted)) {
      removeAllComponents();
      if (SWAC.Config.TimeOuts.Enabled) {
        window.clearTimeout(bag.beginCloseTimer);
      }
    }
    return bag.beginCloseDeferer.promise;
  },

  /**
   * Returns the container's current language.
   *
   * @private
   * @method _findAndRemoveComponentfromList
   * @param {String} componentName name of the component.
   * @return {Boolean} true or false if the component is found.
   */
  _getLanguage = function () {
    return _language;
  },

  /**
  * Sets the current language of the container.
  *
  * @private
  * @method setLanguage
  * @param {string} tag language tag according to [BCP47]
  */
  _setLanguage = function (tag) {
    _language = tag;
    var components = _get();
    if (components && components.length > 0) {
      components.forEach(function (cmp) {
        if (cmp && cmp.status && cmp.status.open('language')) {
          SWAC.Communication._internal.call(cmp.name(), 'setPrivateDPC', ['language', tag]);
        }
      });
    }
  };

  _onRemoved.event.subscribe(_compDisappears);

  _onCreated.event.subscribe(function () {
    if (window['MutationObserver'] && _observer === null) {
      _observer = new MutationObserver(function (mutation) {
        if ((mutation[0].removedNodes.length > 0) && (mutation[0].removedNodes[0].tagName === 'IFRAME')) {
          if (typeof mutation[0].removedNodes[0].SWACLoaded === 'boolean') {
            if (_componentRemovalInProgress) {
              _componentRemovalInProgress = false;
            }
            else {
              _fireOnFailure(mutation[0].removedNodes[0].name, 'integrityCheck', 'Component integrity is compromised', false);
              _removeComponent(mutation[0].removedNodes[0].name, null, new SWAC.Reason(15005));
            }
          }
        }
      });
      _observer.observe(document.body, { childList: true, subtree: true });
    }
  });

  _onRemoved.event.subscribe(function () {
    var components = _get();
    if (components && components.length === 0) {
      if (window['MutationObserver'] && _observer !== null) {
        _observer.disconnect();
        _observer = null;
      }
    }
  });

  //////////////
  // PUBLIC   //
  //////////////

  return {

    // API
    beginCreate: _beginCreate,

    beginClose: _beginClose,

    get: _get, // There is no dedicated remove-function on the container. Get the component and call remove explicitely.

    getLanguage: _getLanguage,

    setLanguage: _setLanguage,

    /**
    * Provides access to internal container status dpc structure.
    *
    * @property status
    * @return {object} returns the status dpc
    */
    status: _status.access(),

    // EVENTS

    /**
     * Fired when a new component is created in the container
     *
     * @event onCreated
     */
    onCreated: _onCreated.event,

    /**
     * Fired when a new component exposed its methods/events and is fully functional
     *
     * @event onReady
     */
    onReady: _onReady.event,

    /**
     * Fired when a component is removed from container
     *
     * @event onRemoved
     */
    onRemoved: _onRemoved.event,

    /**
     * Fired when a component has thrown an error (Can also be that component could not be created)
     *
     * @event onFailure
     */
    onFailure: _onFailure.event,

    // INTERNAL, DO NOT USE
    _internal: {
      accept: _acceptComponent, // Called when component-handshake was successfull
      discard: _discardComponent, // Called when component-handshake failed (e.g. container library could not be loaded)
      remove: _removeComponent, // Called when component has to be returned from collection of available components.
      identify: _identify,
      setComponentInternalStatus: _setComponentInternalStatus,
      getComponentInternalStatus: _getComponentInternalStatus,
      fireOnFailure: _fireOnFailure,
      checkIframe: _checkIframe
    }
  };
}());

/**
* Container version.
*
* @property version
* @return {string} returns the container version
*/
SWAC.Container.version = '1.5.1';


///////////////////////////////////////////
// lib/container/interfaces.js


/**
 *  Interfaces is an object on the Component object for each contributing application. (in-container)
 *
 * @class SWAC.Interfaces
 * @constructor
 * @param {object} keys List of interface.
 * @param {object} owner owner of the interfaces list.
 */
SWAC.Interfaces = function (keys, owner) {

  //////////////
  // PRIVATE  //
  //////////////

  var _cache = {},
      _cachedEventPublisher = {},

      _available = keys,

      _owner = owner,

      _requestedInterfacesList = [],

      /**
       * Returns a list of names for all Interfaces defined in component
       *
       * @method list
       * @return {Array} Array of strings containing the interface names
       */
      _list = function () {
        return _available;
      },

       /**
       * Check if an interface exists for the current component.
       *
       * @method has
       * @param {String} name name of the interface.
       * @return {Boolean} true or false if the interface exists.
       */
      _has = function (name) {
        return (SWAC._internal.Utils.indexOf(_available, name) >= 0);
      },

       /**
       * Method for searching an interface inside _requestedInterfacesList array.
       *
       * @private
       * @method _findInRequestedInterfacesList
       * @param {String} interfaceName name of the interface.
       * @return {Boolean} true or false if the interface is found.
       */
      _findInRequestedInterfacesList = function (interfaceName) {
        var i;
        for (i = 0; i < _requestedInterfacesList.length; i++) {
          if (_requestedInterfacesList[i].name === interfaceName) {
            return true;
          }
        }
        return false;
      },

       /**
       * Callback for beginRequestInterface.
       *
       * @private
       * @method _beginRequestInterfaceCallback
       * @param {String} name name of the interface.
       * @param {String} response beginRequestInterface call response.
       * @param {Boolean} reject if true the defer objects will be rejected, otherwise it will be fulfilled.
       */
      _beginRequestInterfaceCallback = function (name, response, reject) {
        var i;

        for (i = _requestedInterfacesList.length - 1; i >= 0; i--) {
          if (_requestedInterfacesList[i].name === name) {
            if (!reject) {
              _requestedInterfacesList[i].defer.fulfill(response);
            }
            else {
              _requestedInterfacesList[i].defer.reject(response);
            }
            _requestedInterfacesList.splice(i, 1);
          }
        }
      },

      /**
      * Get the specified interface
      *
      * @method beginGet
      * @param {String} name name of the required interface.
      * @return {Object} an object defer.promise
      */
      _beginGet = function (name) {
        var defer = new SWAC.Defer();


        if (_cache[name]) {
          defer.fulfill(_cache[name]);
        }
        else if (_has(name)) {
          if (!_findInRequestedInterfacesList(name)) {
            _owner._internal.beginRequestInterface(name).then(
                function (value) {
                  _beginRequestInterfaceCallback(name, value, false);
                  SWAC.Communication._internal.call(_owner.name(), 'interfaceReady', [name]); // Send interfaceReady here after fulfulling the promise with the interface, otherwise there might be a timing issue where the component got activated before the interface user can actually register for any event!
                },
                function (reason) {
                  _beginRequestInterfaceCallback(name, reason, true);
                });
          }
          _requestedInterfacesList.push({ name: name, defer: defer });
        }
        else {
          defer.reject(new SWAC.Reason(14001));
        }

        return defer.promise;
      },

       /**
      * Create a message for calling a method from container to component
      *
      * @private
      * @method _beginCall
      * @param {string} method method to call
      * @param {object} args method's argument
      * @return {object} an object defer.promise.
      */
      _beginCall = function (method, args, inf) {
        return SWAC.Communication._internal.beginCall(_owner.name(), SWAC.Config.TimeOuts.Proxy.Functions, 'call', [method, args, inf]);
      },

      /**
      * Method that exposes interface's methods and events
      *
      * @protected
      * @method exposeInterface
      * @param {string} name name of the interface
      * @param {object} api list of method exported by interface
      * @param {object} events list of events exported by interface
      */
      _exposeInterface = function (name, api, events) {
        var inf = {},
            method,
            args,
            fn,
            i = 0,
            event,
            evPub;

        if (!_cache[name]) {
          //// Methods
          for (method in api) {
            if (api.hasOwnProperty(method)) {
              args = api[method].join(', ');
              fn = 'return function (' + args + ') { var myargs = Array.prototype.slice.call(arguments, 0); var args = ["' + method + '", myargs, "' + name + '" ]; return fn.apply( ctx, args ); };';
              /* jshint -W054 */
              inf[method] = (new Function('ctx', 'fn', fn))(this, _beginCall);
              /* jshint +W054 */
            }
          }

          //// EVENTS
          for (i = 0; i < events.length; i++) {
            event = events[i];
            evPub = new SWAC.Eventing.Publisher(event);
            _cachedEventPublisher[name] = _cachedEventPublisher[name] || {};
            _cachedEventPublisher[name][event] = evPub;
            inf[event] = evPub.event;
          }

          _cache[name] = inf;

        }
      },

       /**
      * Method for firing event from the cached interface
      *
      * @protected
      * @method fire
      * @param {String} evtname name of the event.
      * @param {Object} evtobject object of the event.
      * @param {Object} inf interface.
      */
      _fireEvent = function (eventName, event, inf) {
        if (_cachedEventPublisher[inf] && _cachedEventPublisher[inf][eventName]) {
          _cachedEventPublisher[inf][eventName].notify(event);
        }
      };

  //////////////
  // PUBLIC   //
  //////////////

  this.list = _list;
  this.beginGet = _beginGet;
  this.has = _has;

  this._internal = {
    exposeInterface: _exposeInterface,
    fire: _fireEvent
  };
};


///////////////////////////////////////////
// lib/container/services.js


/**
 *  Services is the registry for all services exposing interfaces to be used by containers. (in-container)
 *
 * @class SWAC.Services
 * @constructor
 */
SWAC.Services = (function () {

  //////////////
  // PRIVATE  //
  //////////////

  var _services = {},
	  _serviceOptions = {},
    _serviceContainerInstance = {},
	  _handlers = [],

	  /**
	   * Fired whenever a component-specific service instance got created
	   *
	   * @event onServiceCreated
	   */
	  _onServiceCreated = new SWAC.Eventing.Publisher('onServiceCreated'),

	   /**
	   * Fired whenever a component-specific service instance got removed
	   *
	   * @event _onServiceRemoved
	   */
	  _onServiceRemoved = new SWAC.Eventing.Publisher('_onServiceRemoved'),

	  _cache = {}, // stores all component-bound services (those are the instances, singletons are used directly from the registry) -> _cache[componentname][service]

	  /**
	  * Return the array of services names available in container
	  *
	  * @method list
	  * @param {object} options filter object operating on service options
	  * @return {Object} List of services names provided by container.
	  */
	  _list = function (options) {
		var propName = '',
		  parkFilter = [],
		  serviceName = '',
		  filterOK = true;

		for (serviceName in _services) {
		  if (_services.hasOwnProperty(serviceName)) {
			if (typeof options === 'object') {
			  filterOK = true;
			  for (propName in options) {
				if (options.hasOwnProperty(propName)) {
				  if (typeof _serviceOptions[serviceName][propName] !== 'undefined') {
					filterOK = filterOK && (_serviceOptions[serviceName][propName] === options[propName]);
				  }
				  else {
					filterOK = false;
					break;
				  }
				}
			  }
			  if (filterOK) {
				parkFilter.push(serviceName);
			  }
			}
			else {
			  parkFilter.push(serviceName);
			}
		  }
		}
		return parkFilter;
	  },

	  /**
	   * Return the options of requested service
	   *
	   * @method getInfo
	   * @param {String} serviceName Name of the service
	   * @return {Object} Options object.
	  */
		_getInfo = function (serviceName) {
		  return _serviceOptions.hasOwnProperty(serviceName) ? _serviceOptions[serviceName] : {};
		},
      /**
	   * Return the container instance of requested service
	   *
	   * @method getLocal
	   * @param {String} name Name of the service
	   * @return {Object} Instance instance of the service.
	  */
    _getLocal = function (name) {
      return _serviceContainerInstance.hasOwnProperty(name) ? _serviceContainerInstance[name] : null;
    },

	   /**
	   * Registers a service to be available for a SWAC component
	   *
	   * @method register
	   * @param {String} name Name of the service to register
	   * @param {Object} service service
	   * @param {Object} options service options
	   * @param {Object} local container service    
	   * @return {function} Returns true if service is not yet registered, false otherwise.
	   */
	  _register = function (name, service, options, local) { 
		var optionsProp = '', ServiceConstructor = null;

		if (!name || !name.match('^[a-zA-Z0-9_.]*$')) {
		  SWAC.Logging.log('Service name is not valid. It contains not Alphanumeric characters only dots and underscores are allowed.', SWAC.Logging.Level.External);
		  return false;
		}
		if (_services[name]) {
		  return false;
		}
		_services[name] = service;
		_serviceOptions[name] = {};
		if (options && (typeof options === 'object')) {
		  for (optionsProp in options) {
			  if (options.hasOwnProperty(optionsProp)) {
			    _serviceOptions[name][optionsProp] = options[optionsProp];
			  }
		  }
		}
		_serviceOptions[name]['singleton'] = !(service instanceof Function); //predefined info
		if (typeof _serviceOptions[name]['delegable'] !== 'boolean') {
		  _serviceOptions[name]['delegable'] = true;
		}
		if (local) {
		  if (local instanceof Function) {
		    ServiceConstructor = local;
		    _serviceContainerInstance[name] = new ServiceConstructor();
		  }
		  else {
		    _serviceContainerInstance[name] = local;
		  }
		}


		return true;
	  },



	   /**
	   * Event handler
	   *
	   * @private
	   * @method _handler
	   * @param {String} componentName Name of the component
	   * @param {String} eventName Name of the event
	   * @param {String} service Name of the service
	   * @return {function} Returns a function that fires the event
	   */
	  _handler = function (componentName, eventName, service) {
		return function (event) {
		  SWAC.Communication._internal.fire(componentName, eventName, event, service);
		};
	  },

	  /**
	   * Request of the component service
	   *
	   * @protected
	   * @method beginRequestService
	   * @param {String} name service name
	   * @param {String} component component name
	   * @return {Object} an object containing the name of the service, its methods and events
	   */
	  _beginRequestService = function (name, component) {
		var interfaces = SWAC._internal.Utils.getOwnPropertyNames(_services),
			expose,
			isSingleton,
			realCmpName = component,
			answerDefer = new SWAC.Defer(),
			proceedDefer = new SWAC.Defer(),
			proceedPromise,
			fullName = SWAC._internal.Utils.getFullName(),
			prealCmpName = component;

		if (SWAC._internal.Utils.isArray(realCmpName)) {
			realCmpName = JSON.stringify(realCmpName);
		}


		proceedPromise = proceedDefer.promise.then(function (servObj) {
			var api = {},
				events = [],
				property,
				serviceDest = SWAC._internal.Utils.getFullName() || ['<root>'],
				park;

		  if (typeof servObj === 'object' && typeof servObj.name === 'string') {
			return servObj;
		  }

		  for (property in servObj) {
			if (servObj.hasOwnProperty(property)) {
			  // Parse available Methods
			  if (typeof servObj[property] === 'function') {
			      api[property] = SWAC._internal.Utils.estractParameters(servObj[property]);
			  }
				// Parse available Events
			  else if ((typeof servObj[property] === 'object') &&
						(servObj[property].subscribe) &&
						(servObj[property].subscribe.length === 1)) {
				// Subscribe to event and let handler call aproporate call towards container.
				park = _handler(realCmpName, property, name);
				servObj[property].subscribe(park);
				_handlers.push({ component: realCmpName, property: property, handler: park, event: servObj[property] });
				events.push(property);
			  }
			}
		  }
		  return { name: name, api: api, events: events, provider: serviceDest };
		}, function (reason) { throw reason; });


		if (SWAC._internal.Utils.indexOf(interfaces, name) >= 0) {
		  expose = _services[name]; // Constructor of a service gets passed in name of the originating component
		  isSingleton = !(expose instanceof Function);
		  if (!isSingleton) {
			_cache[realCmpName] = (_cache[realCmpName] || {});
			if (_cache[realCmpName][name]) {
			  expose = _cache[realCmpName][name];
			} else {
			  expose = new _services[name](realCmpName);
			  _cache[realCmpName][name] = expose;
			  if (fullName === null ||
					(fullName.length + 1 === prealCmpName.length)) {

				if (fullName === null) {
				  fullName = ['<root>'];
				}
				prealCmpName = prealCmpName.toString().substring(fullName.toString().length + 1, prealCmpName.toString().length);
				_onServiceCreated.notify({ component: prealCmpName, service: name, instance: expose });
			  }
			  else {
				prealCmpName = JSON.stringify(prealCmpName);
				_onServiceCreated.notify({ component: prealCmpName, service: name, instance: expose, delegated: true });
			  }
			}
		  }

		  proceedPromise.then(function (serviceInf) {
			answerDefer.fulfill(serviceInf);
		  }, function (reason) {
			answerDefer.reject(reason);
		  });
		  proceedDefer.fulfill(expose);
		}
		else if (typeof SWAC.Hub.instance === 'object') {
		  SWAC.Hub.instance.services._internal.beginGetInternal(name, component).then(
			function (value) {
			  proceedDefer.fulfill(value);
			  proceedPromise.then(function (serviceInf) {
				answerDefer.fulfill(serviceInf);
			  }, function (reason) {
				answerDefer.reject(reason);
			  });
			},
			function (reason) {
			  answerDefer.reject(reason);
			}
		  );
		}
		else {
		  answerDefer.reject(new SWAC.Reason(12001));
		}
		return answerDefer.promise;
	  },

	   /**
	   * Remove all component-bound service instances.
	   *
	   * @protected
	   * @method removeServices
	   * @param {String} componentName component name
	   */
	  _removeServices = function (componentName) {
		  var cachedCmpService = Object.getOwnPropertyNames(_cache),
			  cmpList = [componentName],
			  i = 0,
			  relCmpName = JSON.parse(componentName),
			  otherCmp = [],
			  isNephew = true,
			  j = 0,
			  cs = null,
			  serviceinstances,
			  component,
			  prealCmpName,
			  fullName = SWAC._internal.Utils.getFullName();

		for (i = 0; i < cachedCmpService.length; i++) {
		  if (cachedCmpService[i].length > componentName.length) { //it can be a nephew
			otherCmp = JSON.parse(cachedCmpService[i]);
			if (otherCmp.length > relCmpName.length) { //yes, maybe
			  isNephew = true;
			  for (j = 0; j < relCmpName.length && isNephew; j++) {
				if (relCmpName[j] !== otherCmp[j]) {
				  isNephew = false;
				}
			  }
			  if (isNephew) {
				cmpList.push(cachedCmpService[i]);
			  }
			}
		  }
		}
		for (j = 0; j < cmpList.length; j++) {
		  component = cmpList[j];
		  cs = _cache[component];
		  // remove handlers
		  for (i = _handlers.length - 1; i >= 0; i--) {
			if (_handlers[i].component === component) {
			  if (_handlers[i].event.unsubscribe) {
				_handlers[i].event.unsubscribe(_handlers[i].handler);
			  }
			  _handlers.splice(i, 1);
			}
		  }
		  if (cs) {
			serviceinstances = SWAC._internal.Utils.getOwnPropertyNames(cs);
			prealCmpName = JSON.parse(component);
			for (i = 0; i < serviceinstances.length; i++) {
			  if (fullName === null ||
					(fullName.length + 1 === prealCmpName.length)) {

				if (fullName === null) {
				  fullName = ['<root>'];
				}
				prealCmpName = prealCmpName.toString().substring(fullName.toString().length + 1, prealCmpName.toString().length);
				_onServiceRemoved.notify({ component: prealCmpName, service: serviceinstances[i]});

			  }
			  else {
				prealCmpName = JSON.stringify(prealCmpName);
				_onServiceRemoved.notify({ component: prealCmpName, service: serviceinstances[i], delegated: true });
			  }
			  delete _cache[component][serviceinstances[i]];
			}
		  }
		}
	  },

	  /**
	  * Method for calling a method using a service
	  *
	  * @protected
	  * @method callMethod
	  * @param {String} componentFull component full name
	  * @param {object} service name of the service
	  * @param {string} method method to call
	  * @param {object} args method's argument
	  * @return {object} value returned by service's method
	  */
	  _callMethod = function (componentFull, service, method, args) {
		  var svc = null,
			  res = null,
			  component = componentFull;

		if (SWAC._internal.Utils.isArray(component)) {
		  component = JSON.stringify(componentFull);
		}

		if (_cache[component] && _cache[component][service]) {
		  svc = _cache[component][service];
		  res = svc[method].apply(service, args);

		} else if (_services[service]) {
		  svc = _services[service];
		  res = svc[method].apply(service, args);
		}
		return res;
	  };

  //////////////
  // PUBLIC   //
  //////////////

  return {

	// API
	list: _list,
	register: _register,
	getInfo: _getInfo,
	getLocal: _getLocal,
	onServiceCreated: _onServiceCreated.event,
	onServiceRemoved: _onServiceRemoved.event,

	// INTERNAL, DO NOT USE
	_internal: {
	  beginRequestService: _beginRequestService,
	  removeServices: _removeServices,
	  callMethod: _callMethod
	}
  };

}());

    return SWAC;
  };

  try {
    if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
      var SWACConstructor = require('@swac/base');
      if (typeof SWACConstructor.prototype.Container !== 'object') {
        swacContainerModule(SWACConstructor.prototype);
      }
      module.exports = SWACConstructor;
      module.exports['default'] = module.exports;
    }
    else if ((typeof SystemJS !== 'undefined') && SystemJS.map.hasOwnProperty('@swac/base')) {
      define('@swac/container', ['@swac/base'], function (base) {
        if (typeof base.prototype.Container !== 'object') {
          swacContainerModule(base.prototype);
        }
        return base;
      });
    }
    else if ((typeof define === 'function') && (typeof define.amd !== 'undefined') &&
            (typeof requirejs !== 'undefined') && (typeof requirejs.s.contexts._.config.paths['@swac/base'] !== 'undefined')) {
      define('@swac/container', ['@swac/base'], function (base) {
        if (typeof base.prototype.Container !== 'object') {
          swacContainerModule(base.prototype);
        }
        return base;
      });
    }
    else {
      throw new Error('SWAC on window');
    }
  }
  catch (e) {
    if (typeof window.SWAC.constructor.prototype.Container !== 'object') {
      swacContainerModule(window.SWAC.constructor.prototype);
    }
  }

})();