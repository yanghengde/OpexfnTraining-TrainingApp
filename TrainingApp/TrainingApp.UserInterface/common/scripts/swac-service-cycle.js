/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

/* Version 1.0.1, copyright (C) 2019, Siemens AG. All Rights Reserved. */


(function () {
  var swacServiceCycleModule = function (SWAC) {

var SWACServices = (SWACServices || {});

/**
 * Class that manages Cycle service. 
 *
 * @class SWACServices.Cycle
 * @constructor
 * 
 */
SWACServices.Cycle = (SWACServices.Cycle || (function () { 

  //////////////
  // PRIVATE  //
  //////////////

  var _parent = null, _counter = 0, _minCycleFreq = -1, _checkFreq = false,
    _cycleFreqs = [2000, 1000, 500, 250, 125],
    _boolParam = [false, false, false, false, false],
    _checkMinFreq, _timerFunction, Service,

  /**
  * Find the specified frequency inside subscription list
  *
  * @private
  * @method _isToBeTriggered
  * @param {Array} subscriptionArray subscription list
  * @param {Number} currFreq frequency to find
  * @return {object} subscription matching value or false if not found
  */
  _isToBeTriggered = function (subscriptionArray, currFreq) {
    for (var i = 0; i < subscriptionArray.length; i++) {
      if (subscriptionArray[i].freq === currFreq) {
        return { 'value': subscriptionArray[i].value };
      }
    }
    return false;
  },

  /**
  * Stop the timer
  *
  * @private
  * @method _stopTimer
  */
  _stopTimer = function () {
    if (Service.prototype.timer) {
      clearInterval(Service.prototype.timer);
      Service.prototype.timer = null;
    }
  },

 /**
* Set the parent to subscribe it to the cycle service
*
* @method setParent
* @param {object} service service object
*/
  _setParent = function (service) {
    if ((service !== null) && (service !== undefined)) {
      _stopTimer();
      _parent = service;
      _parent.onCycle.subscribe(function (event) {
        _timerFunction(event);
      });
    }
    else {
      _parent = null;
    }
  };

  /**
  * Check the minimun frequency and manage the timer
  *
  * @private
  * @method _checkMinFreq
  * @param {boolean} synch synchronous activation
  */
  _checkMinFreq = function (synch) {
    var minFreq = -1, currFreqGroup = -1, freq = null;

    for (freq in Service.prototype.groups) {
      if (Service.prototype.groups[freq].length > 0) {
        currFreqGroup = parseInt(freq.substr(1));
        if (currFreqGroup > minFreq) {
          minFreq = currFreqGroup;
        }
      }
    }
    if (minFreq !== _minCycleFreq) {
      if (_parent || (_minCycleFreq === -1) || (minFreq < 0) || (synch && _checkFreq)) {
        _checkFreq = false;
        _minCycleFreq = minFreq;
        if (_parent === null) {
          _stopTimer();
          if (_minCycleFreq >= 0) {
            Service.prototype.timer = setInterval(_timerFunction, _cycleFreqs[_minCycleFreq]);
          }
          else {
            _boolParam = [false, false, false, false, false];
            _counter = 0;
          }
        }
      }
      else {
        _checkFreq = true; // wait for a synchronous change interval
      }
    }
  };

  /**
  * Main timer function for service
  *
  * @private
  * @method _timerFunction
  * @param {Array} subscriptionArray subscription list
  */
  _timerFunction = function (subscriptionArray) {
    var notifications = {}, // object with targets and their merged notification message (currently just array of groupnames to be notified)
        groups = Service.prototype.groups, owners = {}, // object with targets and the corresponding service instance
        currFreqGroup = -1, index = 0, freq = null, group = null, service = null, target = null, searchFreq = null;

    if (!subscriptionArray) {
      _counter = _counter + Math.pow(2, 4 - _minCycleFreq);
      if (_counter >= 16) {
        _counter = 0;
        if (_checkFreq) {
          _checkMinFreq(true);
        }
      }
      subscriptionArray = [];
      for (index = 0; index < Service.prototype.freqList.length; index++) {
        if ((_counter % Service.prototype.freqList[index]) === 0) {
          subscriptionArray.push({ 'freq': 4 - index, 'value': _boolParam[index] });
          _boolParam[index] = !_boolParam[index];
        }
      }
    }
    else {
      subscriptionArray = subscriptionArray.data;
    }

    // Check if the current group/frequency is to be notified in this cycle
    for (freq in groups) {
      if (groups.hasOwnProperty(freq)) {
        group = groups[freq];
        if (group instanceof Array) {
          currFreqGroup = parseInt(freq.substr(1));
          searchFreq = _isToBeTriggered(subscriptionArray, currFreqGroup);
          if (searchFreq) {
            for (index in group) {
              if (group.hasOwnProperty(index)) {

                service = group[index].who;
                if (service instanceof Service) {
                  target = service._internal.ownerName;
                  if ((notifications[target] === undefined) || !(notifications[target] instanceof Array) || (owners[target] === undefined)) {
                    notifications[target] = [];
                    owners[target] = service;
                  }
                  notifications[target].push({ name: group[index].group, freq: currFreqGroup, value: searchFreq.value });
                }
              }
            }
          }
        }
      }
    }

    for (target in owners) {
      if (owners.hasOwnProperty(target)) {

        owners[target].onCycle.fire(notifications[target]);
      }
    }
  };

  /**
  * Service object
  *
  * @method service
  * @param {string} component name
  */
  Service = function (component) {
    var that = this, groups = Service.prototype.groups;

    if (typeof component !== 'string') {
      component = 'SWAC_' + SWAC.Guid.generate();
    }

    /**
    * Register the service
    *
    * @method service.beginRegister
    * @param {string} groupname group name
    * @param {Number} freq frequency
    * @return {Object} promise object
    */
    this.beginRegister = function (groupname, freq) {
      var group = null, defer = new SWAC.Defer(), success = true, groupsInfo = null, newFreq = false;

      if (SWAC.Logging) {
        SWAC.Logging.log((_parent ? 'Mixed: ' : 'Container: ') + component + ' -> Subscription from ' + component + ' for group \'' + groupname + '\' and freq :' + freq, SWAC.Logging.Level.External);
      }
      if (typeof arguments[2] !== 'boolean' || !arguments[2]) { // no private registration ... parameter check
        if (typeof groupname !== 'string' || typeof freq !== 'number' || groupname.length === 0 || freq < 0 || freq > 4) {
          defer.reject(new SWAC.Reason('Wrong parameter'));
          return defer.promise;
        }
      }
      if (groups['_' + freq] === undefined || !(groups['_' + freq] instanceof Array)) {
        groups['_' + freq] = [];
        newFreq = true;
        if (_parent !== null) {  // now called only once for freq
          if (SWAC.Logging) {
            SWAC.Logging.log('Mixed: ' + component + ' -> Forwarded subscription from ' + component + ' for group \'null\' and freq :' + freq, SWAC.Logging.Level.External);
          }
          _parent.beginRegister(null, freq, true);
        }
      }
      group = groups['_' + freq];
      for (groupsInfo in group) {
        if (group[groupsInfo].group === groupname && group[groupsInfo].who === that) {
          success = false;
          break;
        }
      }
      if (success) {
        group.push({ who: that, group: groupname });
        if (newFreq) {
          _checkMinFreq();
        }
        defer.fulfill();
      }
      else {
        defer.reject(new SWAC.Reason('Registration (' + groupname + ',' + freq + ') already made'));
      }
      return defer.promise;
    };

    /**
    * Unregister the service
    *
    * @method service.beginUnregister
    * @param {string} groupname group name
    * @param {Number} freq frequency
    * @return {Object} promise object
    */
    this.beginUnregister = function (groupname, freq) {
      var i = 0, defer = new SWAC.Defer();

      if (_parent === null) {
        if (SWAC.Logging) {
          SWAC.Logging.log('[' + component + '] Got a unsubscription from ' + component + ' for group \'' + groupname + '\' and freq :' + freq, SWAC.Logging.Level.External);
        }
      }

      if (typeof arguments[2] !== 'boolean' || !arguments[2]) { // no private registration... parameter check
        if (typeof groupname !== 'string' || typeof freq !== 'number' || groupname.length === 0 || freq < 0 || freq > 4) {
          defer.reject(new SWAC.Reason('Wrong parameter'));
          return defer.promise;
        }
      }
      if (groups['_' + freq] !== undefined && (groups['_' + freq] instanceof Array)) {
        for (i = 0; i < groups['_' + freq].length; i++) {
          if (groupname === null || groups['_' + freq][i].group === groupname) {
            if (groups['_' + freq][i].who === that) {
              groups['_' + freq].splice(i, 1);
              if (groups['_' + freq].length === 0) {
                delete groups['_' + freq];
                if (_parent !== null) {
                  if (SWAC.Logging) {
                    SWAC.Logging.log('Mixed: ' + component + ' -> Forwarded unsubscription from ' + component + ' for group \'' + groupname + '\' and freq :' + freq, SWAC.Logging.Level.External);
                  }
                  _parent.beginUnregister(null, freq, true);  // unregister on parent
                }
                _checkMinFreq();
              }
              defer.fulfill();
              return defer.promise;
            }
          }
        }
      }
      defer.reject(new SWAC.Reason('Registration not found for group :' + groupname + ' and freq :' + freq));
      return defer.promise;
    };

    /**
    * Fired at specified frequency
    *
    * @event onCycle
    * @param {Object} data Object with notified component
    */
    if (typeof SWAC.Eventing.Event !== 'undefined') {
      this.onCycle = new SWAC.Eventing.Event('onCycle');
    }
    else {
      this.onCycle = (function () {
        var _theEventPublisher = new SWAC.Eventing.Publisher('onCycle');

        _theEventPublisher.event.fire = function (data) {
          _theEventPublisher.notify(data);
        };
        return _theEventPublisher.event;
      })();
    }

    // INTERNAL, DO NOT USE
    this._internal = { ownerName: component };
  };

  SWAC.Container.onRemoved.subscribe(function (evt) {
    // only beginUnregister call, SWAC service instances are cleared by SWAC
    var freq = null, index = 0, service = null, delegationName = null;

    if (typeof SWAC._internal.Utils.getFullName === 'function') {
      delegationName = SWAC._internal.Utils.getFullName();
      delegationName.push(evt.data.name);
      delegationName = JSON.stringify(delegationName);
    }

    if (SWAC.Logging) {
      SWAC.Logging.log('SWACServices.Cycle - Component Removed: ' + evt.data.name, SWAC.Logging.Level.External);
    }
    for (freq in Service.prototype.groups) {
        if (Service.prototype.groups.hasOwnProperty(freq)) {

            for (index in Service.prototype.groups[freq]) {
                if (Service.prototype.groups[freq].hasOwnProperty(index)) {

                    service = Service.prototype.groups[freq][index].who;
                    if (service._internal.ownerName === evt.data.name) {
                        service.beginUnregister(Service.prototype.groups[freq][index].group, parseInt(freq.substr(1)),true);
                    }
                    else if (delegationName && service._internal.ownerName === delegationName) {
                      service.beginUnregister(Service.prototype.groups[freq][index].group, parseInt(freq.substr(1)), true);
                    }
                }
            }
        }
    }
  });

  // prototype members, shared across all instances (are accessible within the container also, but not exposed to components)
  Service.prototype.groups = {};
  Service.prototype.freqList = [1, 2, 4, 8, 16];
  Service.prototype.timer = null;

  //////////////
  // PUBLIC   //
  //////////////

  return {
    /**
    * Local instance of service object
    *
    * @method local
    * @return {Object} service instance
    */
    local: new Service(),
    setParent: _setParent,
    service: Service
  };
})());

    return SWACServices.Cycle;
  };

  try {
    if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
      var SWACConstructor = require('@swac/container');
      module.exports = swacServiceCycleModule(SWACConstructor.prototype);
      module.exports['default'] = module.exports;
    }
    else if ((typeof SystemJS !== 'undefined') && SystemJS.map.hasOwnProperty('@swac/container')) {
      define('@swac/service-cycle', ['@swac/container'], function (base) {
        return swacServiceCycleModule(base.prototype);
      });
    }
    else if ((typeof define === 'function') && (typeof define.amd !== 'undefined') &&
            (typeof requirejs !== 'undefined') && (typeof requirejs.s.contexts._.config.paths['@swac/container'] !== 'undefined')) {
      define('@swac/service-cycle', ['@swac/container'], function (base) {
        return swacServiceCycleModule(base.prototype);
      });
    }
    else {
      throw new Error('SWACServices on window');
    }
  }
  catch (e) {
    if (typeof window.SWACServices === 'undefined') {
      window.SWACServices = {};
    }
    window.SWACServices.Cycle = swacServiceCycleModule(window.SWAC);
  }

})();