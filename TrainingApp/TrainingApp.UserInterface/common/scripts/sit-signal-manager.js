/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

/* @license SIMATIC IT Unified Architecture Foundation V2.2 | Copyright (C) Siemens AG 2017. All Rights Reserved. */
/**
 * @class SIT
 */
var SIT = (SIT || {}); 

/**
 * @ngdoc object
 * @name SIT.SignalManagerPoolFactory
 * @description This singleton object acts as SignalsManager factory and connection pool
*/
SIT.SignalManagerPoolFactory = (function () {
    var _$q = null, _channelList = [];
    function init($q) {
        _$q = $q;
    }
    function getEndPointChannel(appName) {
        var i = 0;
        for (i = 0; i < _channelList.length; i++) {
            if (_channelList[i].channel.signalApp === appName) {
                return _channelList[i];
            }
        }
        return null;
    }
    function removeSignalsManager(appName) {
        _channelList = _channelList.filter(function (elem) {
            return (elem.channel.signalApp !== appName);
        });
    }
    function openEndPointChannel(token, configEndpoint, appName, options) {
        var deferred = _$q.defer(), newEndPoint = null, existingChannel = getEndPointChannel(appName), channelGuid = '';
        if (existingChannel) {
            existingChannel.channel.init(token, configEndpoint,appName,options).then(function () { //give back the previous init outcome
                existingChannel.counter++;
                deferred.resolve(existingChannel.channel);
            }, function (error) {
                deferred.reject(error);
            });
        }
        else {
            channelGuid = this._internal.createGUID();
            newEndPoint = new SIT.SignalsManager(_$q, channelGuid);
            _channelList.push({ channel: newEndPoint, counter: 1, ownerGuid: channelGuid }); //added early to handle multiple requests on the same endPoint
            newEndPoint.init(token, configEndpoint, appName,options).then(
                function () {
                    deferred.resolve(newEndPoint);
                }, function (error) {
                    removeSignalsManager(appName); //remove parked channel in case of error
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    }
    function releaseEndPointChannel(channel, id) {
        var existingChannel = getEndPointChannel(channel.signalApp);
        if (existingChannel) {
            existingChannel.counter--;
            existingChannel.channel.removePingTimeoutCbk(id);
            if (existingChannel.counter === 0) {
                existingChannel.channel.close(existingChannel.ownerGuid);
                removeSignalsManager(channel.signalApp); //remove channel 
            }
            return existingChannel.counter;
        }
        return -1;
    }
    function removeFromPool(channel) {
        removeSignalsManager(channel.signalApp); //remove channel 
    }
    //From previous implementation start
    function createGUID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
    //From previous implementation end

    return {
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalManagerPoolFactory#init
          * @description Init to inject defer/promise implementation
          * @param {object} $q the Defer/promise object
          * 
          */
        init: init,
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalManagerPoolFactory#openEndPointChannel
          * @description Create and/or Get a SIT.SignalsManager object from the pool
          * @param {string} token the authentication token
          * @param {string} configEndpoint the connection endpoint
          * @returns {Object} a promise containing a SIT.SignalsManager
          * 
          */
        openEndPointChannel: openEndPointChannel,
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalManagerPoolFactory#releaseEndPointChannel
          * @description Release the SIT.SignalsManager object obtained with the openEndPointChannel
          * @param {string} token the authentication token
          * @param {string} configEndpoint the connection endpoint
          * @returns {bool} the operation outcome
          * 
          */
        releaseEndPointChannel: releaseEndPointChannel,
        removeFromPool: removeFromPool,
        _internal: {
            createGUID: createGUID
        }

    };
})();
/**
 * @ngdoc object
 * @name SIT.SignalsManager
 * @description This class allows multiple signals subscription 
*/
SIT.SignalsManager = function ($q) {
    var _unifiedProtocol = "v1s.signals.unified",    // websocket sub-protocol
		_cnnMain = null,
		_pendingSubscription = [], //no id ... use array
		_activeSubscription = {}, //with id, so prop
	    _pendingUnsubscription = {}; //with id, so prop
    this.pingTimeouts = [];
    this.pingTimeoutCbks = [];
    this.clientId = null;
    this.initDefer = $q.defer();
    this.openDefer = $q.defer();
    this.heartBeatDefer = $q.defer();
    this.isInitialized = false;
    this.isOpened = false;
    this.endPoint = null;
    this.token = null;
    this.mainAddress = '';
    this.inPool = false;
    this.poolGUID = '';   
    this.signalApp = '';
    var _self = this;
    
    if (arguments.length == 2) {// created by the pool
        this.inPool = true;
        this.poolGUID = arguments[1];
    }


    //unload/refresh guard
    var check = false;
    function cleanOnExit(e) {
        var i = 1 + 2;
        check = true;
        window.removeEventListener('unload', cleanOnExit);
        if (_self.isOpened) {
            try {
                _cnnMain.onclose = function () { }; //disable callback
                _cnnMain.close(1000); // normal
                _cnnMain = null;
            }
            catch (e) {
                throw e;
            }
            _self.isOpened = false;
            _self.isInitialized = false;
        }
    }
    function listenForClose(flag) {
        if (flag) {
            window.addEventListener('unload', cleanOnExit);
        }
        else {
            window.removeEventListener('unload', cleanOnExit);
        }
    }
    //unload/refresh guard

    //From previous implementation start
    function getMainAndStreamEndpoints(address, headers) {
        var deferred = $q.defer();       
        get(address, headers).then(function (metadataStr) {          
            var metadata = JSON.parse(metadataStr);
            if (metadata && metadata.Endpoints && metadata.Endpoints.length > 0) {
                var endpoints = {
                    mainAddress: metadata.Endpoints[0].SignalMainAddress
                };
                deferred.resolve(endpoints);
            }
            else {
                deferred.reject('Metadata endpoint not valid');
            }

        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    function getMetadataEndpoint(address) {         
        var deferred = $q.defer();
        var signalManagerURL = '';
        get(address).then(function (endpoints) {
            var endpointsObj = JSON.parse(endpoints);                    
            signalManagerURL = (!_self.signalApp) ? endpointsObj.signalManagerApplicationUrl : ((!endpointsObj.applicationSignalManagerUrls[_self.signalApp]) ? endpointsObj.signalManagerApplicationUrl : endpointsObj.applicationSignalManagerUrls[_self.signalApp]);         
            deferred.resolve(signalManagerURL + '/metadata');
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    function _send(verb, address, headers) {
        var deferred = $q.defer();
        try {
            var xhr = new XMLHttpRequest(); // a new request
            xhr.open(verb, address, true);

            if ((headers) && (Array.isArray(headers))) {
                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].name, headers[i].value);
                }

            }
            xhr.onload = function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    deferred.resolve(xhr.responseText);
                }
                else {
                    deferred.reject(xhr.status);
                }
            };
            xhr.send(null);
        }
        catch (err) {
            deferred.reject(err.description);
        }
        return deferred.promise;

    }

    function post(address, headers) {
        return _send("POST", address, headers);
    }

    function get(address, headers) {     
        return _send("GET", address, headers);
    }
    function setAuthCookie(token, configEndpoint) {
        var deferred = $q.defer();
        getAuthorizationEndpoint(configEndpoint).then(function (authEndpoint) {

            var sessionEndPoint = authEndpoint.replace(new RegExp('Authorize$'), 'Session');
            var header = [{ name: 'Authorization', value: token }];
            post(sessionEndPoint, header).then(function () {
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

        },
        function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    function getAuthorizationEndpoint(address) {
        var deferred = $q.defer();
        get(address).then(function (endpoints) {
            var endpointsObj = JSON.parse(endpoints);
            deferred.resolve(endpointsObj.authorizationServiceUrl);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    function firstOrDefault(arr, predicate) {
        var result = null;
        arr.some(function (item, index) {
            var evaluation = predicate(item, index);
            if (evaluation) {
                result = item;
            }
            return evaluation;
        });
        return result;
    }
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }


    function getMetadata(address) {
        if (!endsWith(address, '/'))
            address += '/';
        address += "Metadata";
        var metaPromise = get(address).then(function (metaStr) {
            if (typeof metaStr == 'undefined') return metaStr;
            var meta = JSON.parse(metaStr);
            return meta;
        });
        return metaPromise;
    }
    function getSignals(meta) {
        var signals = meta.Signals;
        if (typeof signals == 'undefined') return signals;
        var endpoints = meta.Endpoints;
        if (typeof endpoints == 'undefined') return endpoints;
        var list = [];
        for (var i = 0; i < signals.length; i++) {
            var signal = signals[i];
            var endpointName = signal.EndpointName;
            var endpoint = firstOrDefault(endpoints, function (item, index) {
                if (item.Name == endpointName) return true;
                return false;
            });
            var item = {};
            item['Name'] = signal.Name;
            item['DisplayName'] = signal.DisplayName;
            item['Serializer'] = signal.Serializer;
            item['SignalMainAddress'] = endpoint.SignalMainAddress;
            item['SignalStreamAddress'] = endpoint.SignalStreamAddress;
            item['ApiAddress'] = endpoint.ApiAddress;
            list.push(item);
        }
        return list;
    }
    function getMainCnnState() {
        return _cnnMain.readyState;
    }
    //From previous implementation end

    function serverOnClose(info) {
        var refCounter = 0;
        if (_self.inPool) {
            //remove first from pool
            SIT.SignalManagerPoolFactory.removeFromPool(_self);
        }
        if (info && info.code) {
            var hasToStop = false;
            if (_self.options && _self.options.onConnectionError && angular.isFunction(_self.options.onConnectionError)) {
                _self.options.onConnectionError({ reason: info.reason, code: info.code });
                hasToStop = true;
            }
            for (var index in _activeSubscription) {
                _activeSubscription[index].onError({ reason: info.reason, code: info.code });
                hasToStop = true;
            }
            if (_cnnMain && hasToStop && _cnnMain.readyState == 3) {
                stopPinging();
            }
        }
    }
    function open() {
        if (!_self.isOpened) {
            _self.openDefer = $q.defer();
            _self.isOpened = true; //set true now to handle concurrency
            if (!_self.clientId) {
                _self.clientId = SIT.SignalManagerPoolFactory._internal.createGUID();
            }
            var connect = function internalConnectWs(endpoint, id, protocol, onMessage, onError, onClose) {
                var deferred = $q.defer(), cnn = null, address = '';
                try {
                    address = endpoint;
                    if (endsWith(address, '/')) {
                        address += id;
                    }
                    else {
                        address += '/' + id;
                    }
                    cnn = new WebSocket(address, protocol);
                    cnn.onmessage = onMessage;
                    cnn.onerror = onError;
                    cnn.onclose = serverOnClose; //onClose;
                } catch (e) {
                    throw e;
                }
                cnn.onopen = function () {
                    deferred.resolve(cnn);
                };
                return deferred.promise;
            };
            var clientMain = connect(_self.mainAddress, _self.clientId, _unifiedProtocol, mainOnNext, mainOnError, _self.close).then(function (value) {
                var main = value;
                listenForClose(true);

                if (main.readyState != 1) {
                    _self.openDefer.reject("Connection Error");
                    throw "Connection Error";
                }
                _cnnMain = main;
            }, function (error) {
                _self.openDefer.reject("Connection Error: " + error);
            });
        }
        return _self.openDefer.promise;
    }
    function mainOnError(data) {
        var sid = -1, index = 0, error = {};
        try {
            error = JSON.parse(data);
            if (error.sid) {
                sid = error.sid;
            }
        }
        catch (e) {
            //silent error
        }
        if (_cnnMain && _cnnMain.readyState == 3) {
            stopPinging();
        }
        if (_self.options && _self.options.onConnectionError && angular.isFunction(_self.options.onConnectionError)) {
            _self.options.onConnectionError(data);
        }
        for (index in _activeSubscription) {
            if (sid === -1 || index === ('s' + sid)) {
                _activeSubscription[index].onError(data);
            }
        }
    }
    function mainOnCompleted(payload) {
        var sid = -1, index = 0;
        try {
            if (payload.sid) {
                sid = error.sid;
            }
        }
        catch (e) {
            //silent error
        }
        for (index in _activeSubscription) {
            if (sid === -1 || index === ('s' + sid)) {
                _activeSubscription[index].onCompleted(payload);
            }
        }
        if (sid !== -1) {
            delete _activeSubscription['s' + sid]; //remove signle subscription
        }
        else {
            _activeSubscription = {}; //remove all subscriptions
        }
    }


    function mainOnNext(json) {
        var payload = JSON.parse(json.data), subscriptionObj = null, i = 0, index = -1, unsubscribeCall = {}, subscriber = {};
        if (payload.M === 'Ready') {
            if (payload.Result) {
                _self.isOpened = true;
                _self.openDefer.resolve();
            }
            else {
                _self.isOpened = false;
                _self.openDefer.reject(payload.Reason);
            }
        }
        else if (payload.M === "SubscribeAck") {
            for (i = 0; i < _pendingSubscription.length; i++) {
                if (payload.FunctionalBlockClass === _pendingSubscription[i].signal && payload.Filter == _pendingSubscription[i].filter) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                subscriptionObj = _pendingSubscription.splice(index, 1); //remove from pending
                if (payload.Result) {
                    _activeSubscription['s' + payload.SID] = subscriptionObj[0]; //add to active
                    payload.subScriptionId = _self.clientId + '.' + payload.SID;
                    subscriptionObj[0].subscriptionDefer.resolve(payload); //answer to the subscribe call
                }
                else {
                    subscriptionObj[0].subscriptionDefer.reject(payload.Reason); //answer to the subscribe call
                }
            }
        }
        else if (payload.M === "UnsubscribeAck") {
            unsubscribeCall = _pendingUnsubscription['s' + payload.SID];
            if (unsubscribeCall) {
                delete _pendingUnsubscription['s' + payload.SID];
                if (payload.Result) {
                    unsubscribeCall.unsubscriptionDefer.resolve(payload);
                }
            }
            else { ////unsubscribeAck unsolicited ... from server->client
                unsubscribeCall = _activeSubscription['s' + payload.SID];
                if (unsubscribeCall) {
                    delete _activeSubscription['s' + payload.SID];
                }
            }
        }
        else if (payload.M === "OnCompleted") {
            mainOnCompleted(payload);
        }
        else if (payload.M === 'SetHeartbeatAck') {
            if (payload.Result) {
                _self.heartBeatDefer.resolve(payload);
                if (isInt(payload.IntervalMilliseconds)) { _self.settings.heartbeatFrequency = payload.IntervalMilliseconds; }
                if (isInt(payload.TimeoutMilliseconds)) { _self.settings.heartbeatTimeout = payload.TimeoutMilliseconds };
                startPinging();
            }
            else {
                _self.heartBeatDefer.reject(payload.Reason);
            }
        }
        else if (payload.M === 'P') {
            clearAllPingTimeouts();
        }
        else if (payload.d && payload.sid) {
            //gestione signals
            subscriber = _activeSubscription['s' + payload.sid];
            if (subscriber) {
                payload.sid = _self.clientId + '.' + payload.sid;
                subscriber.onNext(payload);
            }
        }
    }
    function isInt(value) {
        if (typeof value !== 'number' && value !== Math.floor(value)) {
            return false;
        }
        return true;
    };
    function rejectInit(error) {
        _self.isInitialized = false;
        _self.initDefer.reject(error);
    }
    function init(token, configEndpoint, appName, options) {        
        var deferred = null;
        _self.signalApp = appName;
        _self.options = options;
        if (!_self.isInitialized) {
            _self.endPoint = configEndpoint; //should be set now to be available for openEndPointChannel
            _self.token = token;
            _self.isInitialized = true;
            _self.initDefer = $q.defer();
            if ((!configEndpoint) || (configEndpoint === '')) {
                _self.isInitialized = false;
                _self.initDefer.reject('Config EndPoint Invalid');
            }
            else {
                setAuthCookie(token, configEndpoint).then(function () {
                    var signalMetadataEndpoint = '';                  
                    //Get from the config enpoint the signal endpoint for reading the metadata
                    getMetadataEndpoint(configEndpoint).then(function (signalMetadataEndpoint) {

                        // Get the signal metadata
                        var header = [{ name: 'Authorization', value: token }];                     
                        getMainAndStreamEndpoints(signalMetadataEndpoint, header).then(function (endpoints) {
                            var protocol = '',
								host1 = '';
                            if (endpoints.mainAddress.indexOf('/') === 0) {
                                protocol = (location.protocol === 'https:') ? ('wss://') : ('ws://');
                                host1 = location.host;
                            }
                            _self.mainAddress = protocol + host1 + endpoints.mainAddress;
                            open().then(function () {
                                _self.initDefer.resolve();
                            }, rejectInit);
                        }, rejectInit);
                    }, rejectInit);
                }, rejectInit);
            }
        }
        else {
            if (appName !== this.signalApp) {
                deferred = $q.defer();
                deferred.reject('init app mistmatch');
                return deferred.promise;
            }
        }
        return _self.initDefer.promise;
    }
    function close() {
        if (_self.inPool) {
            if (arguments.length !== 1 || _self.poolGUID !== arguments[0]) {
                return false;
            }
        }

        if (!_self.isOpened) return false;

        listenForClose(false);

        try {
            if (arguments.length === 1) {
                this.unsubscribeAll(arguments[0]);
            }
            else {
                this.unsubscribeAll();
            }
            _cnnMain.close(1000); // normal
            _cnnMain = null;
        }
        catch (e) {
            throw e;
        }
        _self.isOpened = false;
        _self.isInitialized = false;
        return true;
    }
    function setHeartBeat(settings, pingTimeoutObj) {
        _self.settings = settings;
        _self.pingTimeoutCbks.push(pingTimeoutObj);
        var payload = { "IntervalMilliseconds": _self.settings.heartbeatFrequency, "M": "SetHeartbeat", "TimeoutMilliseconds": _self.settings.heartbeatTimeout };
        _cnnMain.send(JSON.stringify(payload));
        return _self.heartBeatDefer.promise;
    }
    function startPinging() {
        ping(new Date().toISOString());
        _self.pingIntervalId = setInterval(function () {
            ping(new Date().toISOString());
        }, _self.settings.heartbeatFrequency);
    }
    function ping(timestamp) {
        if (!_cnnMain) {
            stopPinging();
            return;
        }
        var pingTimeout = setTimeout(function () {
            stopPinging();
            _self.pingTimeoutCbks.forEach(function (cbkObj) {
                if (cbkObj.cbk && angular.isFunction(cbkObj.cbk)) {
                    cbkObj.cbk(_self.signalApp);
                }
            });

        }, _self.settings.heartbeatTimeout);
        _self.pingTimeouts.push(pingTimeout);
        var payload = { "Timestamp": timestamp, "M": "P" };
        _cnnMain.send(JSON.stringify(payload));
    }
    function stopPinging() {
        clearInterval(_self.pingIntervalId);
        clearAllPingTimeouts();
    }
    function clearAllPingTimeouts() {
        for (var i = _self.pingTimeouts.length - 1; i > -1; i--) {
            clearTimeout(_self.pingTimeouts[i]);
            _self.pingTimeouts.splice(i, 1);
        }
    }
    function setPingTimeoutCbkObj(obj) {
        _self.pingTimeoutCbks.push(obj);
    }
    function removePingTimeoutCbk(cliendId) {
        _self.pingTimeoutCbks = _self.pingTimeoutCbks.filter(function (obj) {
            return obj.id !== cliendId;
        });
    }
    function subscribe(signal, filter, onNext, onError, onCompleted) {
        var deferred = $q.defer(), payload = { "functionalBlockClass": signal, "M": "Subscribe", "filter": filter };
        _pendingSubscription.push({ signal: signal, filter: filter, onNext: onNext, onError: onError, onCompleted: onCompleted, subscriptionDefer: deferred });
        _cnnMain.send(JSON.stringify(payload));
        return deferred.promise;
    }
    function unsubscribeAll() {
        var subscriptionId = null, payload = {};
        if (_self.inPool) {
            if (arguments.length !== 1 || _self.poolGUID !== arguments[0]) {
                return false;
            }
        }
        for (subscriptionId in _activeSubscription) {
            payload = { "SID": subscriptionId.substr(1), "M": "Unsubscribe" };
            _cnnMain.send(JSON.stringify(payload));
        }
        _activeSubscription = {};
        //subscription is not moved to the pendingUnsubscription because I've not to solve any promises
        //O.I.: I cannot remove pending subscription without sid -> problem when the unsubscribeAll is not called by close method.
    }
    function unsubscribe(subscriptionId) {
        var deferred = $q.defer(), subScription = null,
            subId = subscriptionId.split('.')[1], payload = {};
        subScription = _activeSubscription['s' + subId];
        if (subScription) {
            subScription.unsubscriptionDefer = deferred;
            delete _activeSubscription['s' + subId];
            _pendingUnsubscription['s' + subId] = subScription;
            payload = { "SID": subId, "M": "Unsubscribe" };
            _cnnMain.send(JSON.stringify(payload));
        }
        else {
            deferred.reject('Unknow subscription Id');
        }
        return deferred.promise;
    }
    return {
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalsManager#init
          * @description Open the socket connection to the endPoint
          * @param {string} token the authentication token
          * @param {string} configEndpoint the connection endpoint
          * @param {string} appName app name for the subscription
          * @returns {promise} the operation outcome
          * 
          */
        init: init,
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalsManager#close
          * @description Unsubscribe all messages and close the channel
          * @returns {promise} the operation outcome
          */
        close: close,
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalsManager#subscribe
          * @description Subscribe to a signal (optionally filtered)
          * @param {string} signal The signal to be subscribed
          * @param {string} filter The signal subscription filter
          * @param {function} onNext The callback for the subscribed signal data
          * @param {function} onError The callback for channel and subscription error notification
          * @param {function} onComplete The callback to notify that all signal data were already notified.
          * @returns {promise} the operation outcome; the subscriptionId in case of success or the error in case of failure
          */
        subscribe: subscribe,
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalsManager#unsubscribeAll
          * @description Unsubscribe all active signal subscription 
          */
        unsubscribeAll: unsubscribeAll,
        /**
          * @ngdoc method
          * @access public
          * @name SIT.SignalsManager#unsubscribe
          * @description Unsubscribe a signal
          * @param {string} subscriptionId The subscriptionId provided by the corresponding subscribe method
          * @returns {promise} the operation outcome.
          */
        unsubscribe: unsubscribe,
        /**
         * @ngdoc method
         * @access public
         * @name SIT.SignalsManager#setHeartBeat
         * @description Used to set the heartbeat command.
         * @param {number} interval The heartbeat ping frequency.
         * @returns {promise} the operation outcome.
         */
        setHeartBeat: setHeartBeat,
        setPingTimeoutCbkObj: setPingTimeoutCbkObj,
        removePingTimeoutCbk: removePingTimeoutCbk,
        //From previous implementation start
        getMetadata: getMetadata,
        getSignals: getSignals,
        getMainCnnState: getMainCnnState,
        //From previous implementation end
        get endPoint() {
            return _self.endPoint;
        },

        get signalApp() {
            return _self.signalApp;
        }
    };
};

/**
 * @ngdoc object
 * @name SIT.SignalManager
 * @description This class provide compatibility support for the siemens.simaticit.common.services.signalManager 
*/
SIT.SignalManager = function ($q) {
    this.endPoint = '';
    this.token = '';
    this.signalList = [];
    var initialized = false; //optimization for shared channell
    var _$q = $q;
    SIT.SignalManagerPoolFactory.init($q);
    var _innerSignalChanell = null;
    this.signalName = '';
    this._onNext = null;
    this._onError = null;
    this._onCompleted = null;
    this.filter = '';
    this.subscriptionId = '';
    var _self = this;
    this.isSubscribed = false;
    this.isOpen = false;  
    _self.app = '';
    this.clientId = SIT.SignalManagerPoolFactory._internal.createGUID();
    this.init = function (token, configEndpoint, appName, options) {
       
        if (!_$q) {
            return false;
        }
        var deferred = _$q.defer();
        _self.app = appName;
        _self.options = options;
        if (!_innerSignalChanell) {         
            SIT.SignalManagerPoolFactory.openEndPointChannel(token, configEndpoint, _self.app, _self.options).then(function (channel) {
                _innerSignalChanell = channel;
                _self.endPoint = configEndpoint;
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });
        }
        else {
            deferred.reject('Object already initialized');
        }
        return deferred.promise;
    };
    this.open = function (signalName, onNext, onError, onCompleted, autoSubscribe, filter) {
        if (!_$q) {
            return false;
        }
        _self.signalName = signalName;
        _self._onNext = onNext;
        _self._onError = onError;
        _self._onCompleted = onCompleted;
        _self.filter = filter;
        var deferred = _$q.defer();
        if (!_innerSignalChanell) {
            deferred.reject('Objecy not inizialized');
        }
        else {
            deferred.resolve(); //TODO add check on connection status
            _self.isOpen = true;
        }
        if (autoSubscribe) {
            this.subscribe();
        }
        return deferred.promise;
    };
    this.close = function () {
        if (_innerSignalChanell) {
            SIT.SignalManagerPoolFactory.releaseEndPointChannel(_innerSignalChanell, _self.clientId);
            _self.isOpen = true;
            _innerSignalChanell = null;
        }
    };
    function forwardSingleSignal(callback) {
        return function (data) {
            if (data && data.d) {
                data.d.forEach(function (elem) {
                    callback(elem);
                });
            }
        };
    }
    function setunsubOnComplete(callback) {
        return function () {
            _self.isSubscribed = false;
            if (callback) {
                callback();
            }
        };
    }
    this.setHeartBeat = function (settings, onPingTimeoutCbk) {
        var deferred = _$q.defer();
        if (!_innerSignalChanell) {
            deferred.reject('Object not inizialized');
        }
        else if (_innerSignalChanell.isHearBeatSet) {
            var pingTimeoutObj = { id: _self.clientId, cbk: onPingTimeoutCbk };
            _innerSignalChanell.setPingTimeoutCbkObj(pingTimeoutObj);
            deferred.resolve(true);
        } else {
            var pingTimeoutObj = { id: _self.clientId, cbk: onPingTimeoutCbk };
            _innerSignalChanell.setHeartBeat(settings, pingTimeoutObj).then(function (payload) {
                _innerSignalChanell.isHearBeatSet = true;
                deferred.resolve(true);
            }, function (error) {
                _innerSignalChanell.isHearBeatSet = false;
                deferred.reject(false);
            });
        }
        return deferred.promise;
    }
    this.subscribe = function (filter, onMessage, onError, onCompleted) { //restituisce un subscribeId .. removed (, onNext, onError, onCompleted) because not used also in by the previous implementation
        var deferred = _$q.defer(), newFilter = _self.filter, onM = onMessage || _self._onNext, onE = onError || _self._onError, onC = onCompleted || _self._onComplete;
        if (!_innerSignalChanell) {
            deferred.reject('Objecy not inizialized');
        }
        else if (_self.isSubscribed) {
            deferred.reject('Object already subscribed');
        }
        else {
            if (filter && filter.length) {
                newFilter = filter;
            }
            _innerSignalChanell.subscribe(_self.signalName, newFilter, forwardSingleSignal(onM), onE, setunsubOnComplete(onC)).then(function (payload) {
                _self.isSubscribed = true;
                _self.subscriptionId = payload.subScriptionId;
                deferred.resolve(payload);
            }, function (error) {
                _self.isSubscribed = false;
                deferred.reject(error);
            });
        }
        return deferred.promise;
    };
    this.unsubscribe = function () {
        var deferred = _$q.defer();
        if (!_innerSignalChanell) {
            deferred.reject('Objecy not inizialized');
        }
        else if (!_self.isSubscribed) {
            deferred.reject('No subscription subscribed available');
        }
        else {
            _innerSignalChanell.unsubscribe(_self.subscriptionId).then(function (outcome) {
                _self.isSubscribed = false;
                deferred.resolve(outcome);
            }, function (error) {
                deferred.reject(error);
            });
        }
        return deferred.promise;
    };
    this.getMetadata = function () {
        if (_innerSignalChanell) {
            return _innerSignalChanell.getMetadata();
        }
        return null;
    };
    this.getSignals = function () {
        if (_innerSignalChanell) {
            return _innerSignalChanell.getSignals();
        }
        return null;
    };
    this.getMainCnnState = function () {
        if (_innerSignalChanell) {
            return _innerSignalChanell.getMainCnnState();
        }
        return null;
    };
    this.getStreamCnnState = function () {
        if (_innerSignalChanell) {
            return _innerSignalChanell.getMainCnnState();
        }
        return null;
    };
    return this;
};


SIT.SignalManager2 = function ($q) {
    this.clientId;
    this.signalName;
    this.filter;
    this.isOpen = false;
    this.isSubscribed = false;
    var _cnnMain;
    var _cnnStream;
    var _onNext;
    var _onError;
    var _onCompleted;
    var _deferredReady;         // used to signal the two connections are ready (subscribe can be requested)
    var _deferredSubscribe;     // subscribeack has been received
    var _deferredUnsubscribe;   // unsubscribeack has been received
    var _unifiedProtocol = "v1.signals.unified";    // websocket sub-protocol
    this.mainAddress;
    this.streamAddress;
    var _self = this;
    _self.app = '';


    function init(token, configEndpoint, appName) {

        var deferred = $q.defer();
        if ((!configEndpoint) || (configEndpoint === '')) {
            deferred.reject('Config EndPoint Invalid')
        }
        _self.app = appName;
        setAuthCookie(token, configEndpoint).then(function () {
            var signalMetadataEndpoint = '';
            //Get from the config enpoint the signal endpoint for reading the metadata
            getMetadataEndpoint(configEndpoint).then(function (signalMetadataEndpoint) {

                // Get the signal metadata
                var header = [{ name: 'Authorization', value: token }];
                getMainAndStreamEndpoints(signalMetadataEndpoint, header).then(function (endpoints) {
                    var protocol = (location.protocol === 'https:') ? ('wss://') : ('ws://');
                    var host1 = (endpoints.mainAddress.indexOf('/') === 0) ? (location.host) : ('');
                    var host2 = (endpoints.streamAddress.indexOf('/') === 0) ? (location.host) : ('');


                    _self.mainAddress = protocol + host1 + endpoints.mainAddress;
                    _self.streamAddress = protocol + host2 + endpoints.streamAddress;
                    deferred.resolve();
                }, function (error) {
                    deferred.reject(error);
                });

            }, function (error) {
                deferred.reject(error);
            });
        },
        function (error) {
            deferred.reject(error)
        });


        return deferred.promise;

    }

    function getMainAndStreamEndpoints(address, headers) {
        var deferred = $q.defer();
        get(address, headers).then(function (metadataStr) {
            var metadata = JSON.parse(metadataStr);
            if (metadata && metadata.Endpoints && metadata.Endpoints.length > 0) {
                var endpoints = {
                    mainAddress: metadata.Endpoints[0].SignalMainAddress,
                    streamAddress: metadata.Endpoints[0].SignalStreamAddress
                };
                deferred.resolve(endpoints);
            }
            else {
                deferred.reject('Metadata endpoint not valid');
            }

        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }


    function getAuthorizationEndpoint(address) {
        var deferred = $q.defer();
        get(address).then(function (endpoints) {
            var endpointsObj = JSON.parse(endpoints);
            deferred.resolve(endpointsObj.authorizationServiceUrl);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#open
     * @description This method opens a new set of web socket connections necessary to recieve messages from an existing signal.
     * @param {string} signalName The name of the existing signal.
     * @param {function} onError A callback method on error in opening a connection.
     * @param {boolean} autoSubcribe A boolean value which says autoSubscription of a signal on connection.
     * @param {string}  filter A filter string on signal.
     * @returns {Object} a promise containing a signal connection object.
     * 
     */
    function open(signalName, onNext, onError, onCompleted, autoSubscribe, filter) {
        if (_self.isOpen) return;
        _self.clientId = createGUID();
        _self.signalName = signalName;
        _onNext = onNext;
        _onError = onError;
        _onCompleted = onCompleted;
        _self.filter = filter;
        _deferredReady = $q.defer();
        var connect = function internalConnectWs(endpoint, id, protocol, onMessage, onError, onClose) {
            var deferred = $q.defer();
            var cnn;
            try {
                var address = endpoint;
                if (endsWith(address, '/')) {
                    address += id;
                }
                else {
                    address += '/' + id;
                }
                cnn = new WebSocket(address, protocol);
                cnn.onmessage = onMessage;
                cnn.onerror = onError;
                cnn.onclose = onClose;
            } catch (e) {
                throw e;
            }
            cnn.onopen = function () {
                deferred.resolve(cnn);
            }
            return deferred.promise;
        }
        var clientMain = connect(_self.mainAddress, _self.clientId, _unifiedProtocol, mainOnNext, mainOnError, _self.close);
        var clientStream = connect(_self.streamAddress, _self.clientId, _unifiedProtocol, streamOnNext, streamOnError, _self.close)
        var ready = $q.all([clientMain, clientStream]).then(function (values) {
            var main = values[0];
            var stream = values[1];
            if (main.readyState != 1 || stream.readyState != 1)
                throw "Connection Error";
            _cnnMain = main;
            _cnnStream = stream;
            return _deferredReady.promise;
        });
        if (autoSubscribe) {
            return ready.then(function () {
                return _self.subscribe(_self.filter);
            });
        }
        else {
            return ready;
        }
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#close
     * @description This method close all the created connections.
     */
    function close() {
        if (!_self.isOpen) return;
        try {
            _cnnMain.close(1000); // normal
        }
        catch (e) {
            throw e;
        }
        try {
            _cnnStream.close(1000); // normal
        }
        catch (e) {
            throw e;
        }
        _self.isOpen = false;
    }

    /**
    * @ngdoc method
    * @access public
    * @name SIT.SignalManager#subscribe
    * @description Subscribes to a set of message feed emitted by the Signal associated to the SignalConnection, according to an optional filter string passed.
    * @param {function} onError A callback method invoked every time a new message is received from the Signal.
    * @param {function} onError A callback method invoked on error in opening a connection.
    * @param {function} onError A callback method invoked when the server notifies the client that it has ended sending messages for the currently-active subscription.
    * @param {string}  filter A filter string on signal.
    * @returns {Object} a promise containing a signal connection object.
    * 
    */
    function subscribe(filter, onMessage, onError, onCompleted) {
        if (_self.isSubscribed) return;
        _self.filter = filter;
        return sendSubscribe(_cnnMain, _self.signalName, _self.filter);
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#unsubscribe
     * @description Unsubscribes from the message feed emitted by the Signal associated to the SignalConnection.
     * @returns {Object} a promise containing a signal connection object.
     */
    function unsubscribe() {
        if (!_self.isSubscribed) return;
        return sendUnsubscribe(_cnnMain, _self.signalName);
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#sendSubscribe
     * @description send the subcription acknowldgement for subsribing a signal.
     * @returns {Object} a promise containing a signal connection object.
     */
    function sendSubscribe(ws, functionalBlockClass, filter) {
        _deferredSubscribe = $q.defer();
        var payload = { "functionalBlockClass": functionalBlockClass, "M": "Subscribe", "filter": filter }
        ws.send(JSON.stringify(payload));
        return _deferredSubscribe.promise;
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#sendUnsubscribe
     * @description send the unsubcription acknowldgement for unsubsribing a signal.
     * @returns {Object} a promise containing a signal connection object.
     */
    function sendUnsubscribe(ws, functionalBlockClass, filter) {
        _deferredUnsubscribe = $q.defer();
        var payload = { "functionalBlockClass": functionalBlockClass, "M": "Unsubscribe" }
        ws.send(JSON.stringify(payload));
        return _deferredUnsubscribe.promise;
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#streamOnError
     * @description A callback method throws an error if there is any error in stream connection.
     */
    function streamOnError(data) {
        // data can be either binary or json depending on the serialization specified in the metadata
        // this function is never called from the server side
        // the error can only come from the WebSocket object
        _onError(data);
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#mainOnError
     * @description A callback method throws an error if there is any error in main connection.
     */
    function mainOnError(data) {
        // data on the main is always json
        _onError(data);
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#streamOnNext
     * @description
     */
    function streamOnNext(json) {
        if (!_self.isOpen)  // CLOSED
            return;
        var msg = JSON.parse(json.data)
        for (index = 0; index < msg.length; ++index) {
            _onNext(msg[index]);
        }
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#mainOnNext
     * @description A callback method invoked on each response of the main connection.
     */
    function mainOnNext(json) {
        var payload = JSON.parse(json.data);
        if (payload.M == 'Ready') {
            if (typeof _deferredReady != 'undefined') {
                _self.isOpen = true;
                _deferredReady.resolve();
            }
        }
        if (payload.M == "SubscribeAck") {
            if (typeof _deferredSubscribe != 'undefined') {
                _self.isSubscribed = payload.Result;
                _deferredSubscribe.resolve(payload);
            }
        }
        if (payload.M == "UnsubscribeAck") {
            if (typeof _deferredUnsubscribe != 'undefined') {
                _self.isSubscribed = false;
                _deferredUnsubscribe.resolve(payload);
            }
        }
        if (payload.M == "OnCompleted") {
            _self.isSubscribed = false;
            mainOnCompleted();
        }
    }

    /**
     * @ngdoc method
     * @access public
     * @name SIT.SignalManager#mainOnCompleted
     * @description A callback method invoked to notify the client that it has stopped sending the messages
     */
    function mainOnCompleted() {
        _onCompleted();
    }

    function getMetadata(address) {
        if (!endsWith(address, '/'))
            address += '/';
        address += "Metadata";
        var metaPromise = get(address).then(function (metaStr) {
            if (typeof metaStr == 'undefined') return metaStr;
            var meta = JSON.parse(metaStr);
            return meta;
        });
        return metaPromise;
    }

    function getSignals(meta) {
        var signals = meta.Signals;
        if (typeof signals == 'undefined') return signals;
        var endpoints = meta.Endpoints;
        if (typeof endpoints == 'undefined') return endpoints;
        var list = [];
        for (var i = 0; i < signals.length; i++) {
            var signal = signals[i];
            var endpointName = signal.EndpointName;
            var endpoint = firstOrDefault(endpoints, function (item, index) {
                if (item.Name == endpointName) return true;
                return false;
            });
            var item = {};
            item['Name'] = signal.Name;
            item['DisplayName'] = signal.DisplayName;
            item['Serializer'] = signal.Serializer;
            item['SignalMainAddress'] = endpoint.SignalMainAddress;
            item['SignalStreamAddress'] = endpoint.SignalStreamAddress;
            item['ApiAddress'] = endpoint.ApiAddress;
            list.push(item);
        }
        return list;
    }

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function createGUID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }

    function firstOrDefault(arr, predicate) {
        var result = null;
        arr.some(function (item, index) {
            var evaluation = predicate(item, index);
            if (evaluation) {
                result = item;
            }
            return evaluation;
        });
        return result;
    }


    function _send(verb, address, headers) {
        var deferred = $q.defer();
        try {
            var xhr = new XMLHttpRequest(); // a new request
            xhr.open(verb, address, true);

            if ((headers) && (Array.isArray(headers))) {
                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].name, headers[i].value);
                }

            }

            xhr.onload = function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    deferred.resolve(xhr.responseText);
                }
                else {
                    deferred.reject(xhr.status);
                }
            }
            xhr.send(null);
        }
        catch (err) {
            deferred.reject(err.description);
        }
        return deferred.promise;

    }

    function post(address, headers) {
        return _send("POST", address, headers);
    }

    function get(address, headers) {
        return _send("GET", address, headers);
    }

    function setAuthCookie(token, configEndpoint) {
        var deferred = $q.defer();
        getAuthorizationEndpoint(configEndpoint).then(function (authEndpoint) {

            var sessionEndPoint = authEndpoint.replace(new RegExp('Authorize$'), 'Session');
            var header = [{ name: 'Authorization', value: token }];
            post(sessionEndPoint, header).then(function () {
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

        },
        function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    /**
    * @ngdoc method
    * @access public
    * @name SIT.SignalManager#getMainCnnState
    * @description checks for the ready state for main conection
    * @returns {boolean} a ready state for the main connection.
    * 
    */
    function getMainCnnState() {
        return _cnnMain.readyState;
    }

    /**
    * @ngdoc method
    * @access public
    * @name SIT.SignalManager#getStreamCnnState
    * @description checks for the ready state for stream conection.
    * @returns {boolean} a ready state for the stream connection.
    * 
    */
    function getStreamCnnState() {
        return _cnnStream.readyState;
    }

    /**
     * Public API methods
     */
    this.init = init;
    this.open = open;
    this.close = close;
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
    this.getMetadata = getMetadata;
    this.getSignals = getSignals;
    this.getMainCnnState = getMainCnnState;
    this.getStreamCnnState = getStreamCnnState;
};
