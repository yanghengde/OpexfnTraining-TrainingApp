/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

/* Version 0.1.00, copyright (C) 2014, Siemens AG. All Rights Reserved. */

/**
* Returns the SWAC UMC Service
*
* @method UmcWebSSO
* @param {String} UMC Identity Provider URL
* @param {Function} function to be called when an interactive login is required. Profile for this function: (loginParams, defer)
*/
var UmcWebSSO = function (urlUMCIP, loginCallback, signatureCallback) {

    //_renewFreq, _sessionId and _claim will be initialized or updated by a UMC init call (or passing claims)
    var _renewFreq = 600,
      _lastrenew = 0,  //first request always executed
      _sessionId = '',
      _claim = null,
      _UMCStatus = 'sleep'; //current status (coordinates container callback, prevents double call)
  
    /**
    * UMC Service object (singleton)
    *
    * @class UMC
    * @constructor
    */
    var UMC = (function () {
      //NOTE: explicit UMC object (better approach for docs?)
      //login waiting list, store login performed while waiting for container callback
      var _parkedLogin = [];
  
  
      //-----------------------------------------
      //Container API
      //-----------------------------------------
      /**
      * Initialize UMC Service
      *
      * @method init
      * @param {Object} claim UMC IP session infos ({session:string, sessionrenewal:number}) 
      * @return {Boolean} 
      */
      function _init(claim) {
        if (claim === null || claim === undefined || typeof claim.session !== 'string' || typeof claim.sessionrenewal === 'undefined') {
          _log('_init failed ... not a valid claim');
          return false;
        }
        _claim = claim;
        _sessionId = _claim.session;
        //TODO check sessionrenewal "type" ... it was string some version ago
        _renewFreq = typeof claim.sessionrenewal === 'string' ? parseInt(claim.sessionrenewal) : claim.sessionrenewal;
        return true;
      }
  
      /**
      * Performs a silent login 
      *
      * @method _beginSilentLogin
      * @param {Object} params loginrequest parameters ({service: string, [nonce:string, keyid : string, donotnotifyrenew : true]})
      * @return {Object} promise
      */
      function _beginSilentLogin(params) {
        return _checkAndSendReq('loginrequest', params);
      }
  
      /**
      * Performs a logout using session info
      *
      * @method _beginLogout
      * @return {Object} promise
      */
      function _beginLogout() {
        _log('Service: Logout received ... ');
        var localdef = new SWAC.Defer();
        if (_UMCStatus === 'waitLogin') {
          localdef.reject(new SWAC.Reason('... _beginLogout->rejected because during authentication'));
        } else {
          _checkAndSendReq('logoutrequest', null, localdef);
        }
        return localdef.promise;
      }
  
  
      /**
      * Performs a renew using session info
      *
      * @method _beginRenew
      * @return {Object} promise
      */
      function _beginRenew() {
        _log('Service: Renew received ... ');
        _lastrenew = new Date().getTime() / 1000;
        var localdef = new SWAC.Defer();
        if (_UMCStatus === 'waitLogin') {
          localdef.reject(new SWAC.Reason('... _beginRenew->rejected because during authentication'));
        } else {
          _checkAndSendReq('renewrequest', null, localdef);
          localdef.promise.then(function (data) { }, function () {
            //TODO: once the session is ended resetting _lastrenew var imply that all hearthbeat will be executed ... we've to find a better approach
            //  _lastrenew = 0; 
          });
        }
        return localdef.promise;
      }
  
  
      //-----------------------------------------
      //Service API
      //-----------------------------------------
  
      /**
      * Performs a getKey
      *
      * @method _beginGetKey
      * @param {Object} params additional optional param ([{service:string, keyId:string, nonce: string}]) 
      * @return {Object} promise
      */
      function _beginGetKey(params) {
        _log('Service: GetKey received ... ');
        return _checkAndSendReq('getkeyrequest', params);
      }
  
      /**
      * Performs a hearthbeat
      *
      * @method _hearthbeat
      */
      function _hearthbeat() {
        _log('Service: heartbeat received ... ');
        var now = new Date().getTime() / 1000,
          gap = _renewFreq - (now - _lastrenew);
        if (gap < 0) {
          _beginRenew();
        }
        return;
      }
  
      /**
       * Performs a beginChangeLanguage
       *
       * @param {Object} params additional optional param
       * @method _beginChangeLanguage
       */
      function _beginChangeLanguage(params) {
        _log('Service: ChangeLanguage received ... ');
        var localdef = new SWAC.Defer();
        if (_UMCStatus === 'waitLogin') {
          localdef.reject(new SWAC.Reason('... _beginChangeLanguage->rejected because during authentication'));
        } else {
          _checkAndSendReq('changelanguagerequest', params, localdef);
        }
        return localdef.promise;
      }
  
      /**
      * Performs an Authentication request
      *
      * @method _beginAuthentication
      * @param {Object} params loginrequest parameters ({service: string, [nonce:string, keyid : string, donotnotifyrenew : true]})
      * @return {Object} promise
      */
      function _beginAuthentication(params) {
        _log('Service: Authentication received ... ');
        var localauthenticationP = new SWAC.Defer();
        //concurrent support ... better first check params before put the request in the _parkedLogin waiting list 
        if (typeof params !== 'object' || typeof params.service !== 'string' || params.service.length === 0) {
          localauthenticationP.reject(new SWAC.Reason('Login: Service mandatory parameter not found'));
          return localauthenticationP.promise;
        }
        if (_UMCStatus === 'waitLogin') {
          _parkedLogin.push({
            'def': localauthenticationP,
            'params': params
          });
          return localauthenticationP.promise;
        }
  
        //first check always with the silentlogin
        _checkAndSendReq('loginrequest', params).then(
          function (data) {
            _log('Service: Authentication solved by silentLogin ... ');
            localauthenticationP.fulfill(data);
          },
          function (reason) {
            var localdef = null;
            if (_UMCStatus !== 'waitLogin') {
              _UMCStatus = 'waitLogin';
              localdef = new SWAC.Defer();
              localdef.promise.then(
                function (value) {
                  var curReq = null;
                  var theClaim = value.claim;
                  try {
                    theClaim = atob(value.claim);
                  }
                  catch (exc)
                  { }
                  //use silentLogin claim to initialize the service
                  _init(JSON.parse(theClaim));
                  _log('Service: Login made: ' + value);
                  _UMCStatus = 'sleep';
                  localauthenticationP.fulfill(value); //fulfill the first request
                  while (_parkedLogin.length > 0) {
                    curReq = _parkedLogin.pop();
                    parkedLogin(curReq.params, curReq.def);
                  }
                },
                function (reason) {
                  _log('Service: Login failed:' + reason.message);
                  _UMCStatus = 'sleep';
                  localauthenticationP.reject(reason);
                  while (_parkedLogin.length > 0) {
                    _parkedLogin.pop().def.reject(reason);
                  }
                }
              );
              loginCallback(params, localdef);
            } else {
              _log('_beginAuthentication park req:' + params);
              _parkedLogin.push({
                'def': localauthenticationP,
                'params': params
              });
            }
          });
        return localauthenticationP.promise;
      }
  
        /**
      * Performs an Signature request
      *
      * @method _beginASignature
      * @param {Object} params loginrequest parameters ({service: string, [nonce:string, keyid : string, donotnotifyrenew : true]})
      * @return {Object} promise
      */
      function _beginSignature(params) {
          _log('Service: Signature received ... ');
          var localauthenticationP = new SWAC.Defer();
          //concurrent support ... better first check params before put the request in the _parkedLogin waiting list 
          if (typeof params !== 'object' || typeof params.service !== 'string' || params.service.length === 0) {
              localauthenticationP.reject(new SWAC.Reason('Login: Service mandatory parameter not found'));
              return localauthenticationP.promise;
          }
          if (_UMCStatus === 'waitLogin') {
              _parkedLogin.push({
                  'def': localauthenticationP,
                  'params': params
              });
              return localauthenticationP.promise;
          }
          
          var localdef = null;
          if (_UMCStatus !== 'waitLogin') {
              _UMCStatus = 'waitLogin';
              localdef = new SWAC.Defer();
              localdef.promise.then(
                function (value) {
                    var curReq = null;
                    var theClaim = value.claim;
                    try {
                        theClaim = atob(value.claim);
                    }
                    catch (exc)
                    { }
                    _log('Service: Signature made: ' + value);
                    _UMCStatus = 'sleep';
                    localauthenticationP.fulfill(value); //fulfill the first request
                    while (_parkedLogin.length > 0) {
                        curReq = _parkedLogin.pop();
                        parkedLogin(curReq.params, curReq.def);
                    }
                },
                function (reason) {
                    _log('Service: Signature failed:' + reason.message);
                    _UMCStatus = 'sleep';
                    localauthenticationP.reject(reason);
                    while (_parkedLogin.length > 0) {
                        _parkedLogin.pop().def.reject(reason);
                    }
                }
              );
              signatureCallback(params, localdef);
          } else {
              _log('_beginSignature park req:' + params);
              _parkedLogin.push({
                  'def': localauthenticationP,
                  'params': params
              });
          }
  
          return localauthenticationP.promise;
      }
  
      var parkedLogin = function (theParam, curDef) { //"local var function" for promise support
        _beginSilentLogin(theParam).then(
          function (dataIP) {
            curDef.fulfill(dataIP);
          },
          function (reasonIP) {
            curDef.reject(reasonIP);
          }
        );
      };
      //-----------------------------------------
      //Utility API
      //-----------------------------------------
      /**
      * Performs log on console
      *
      * @method _log
      * @param {String} msg loginrequest parameters ({service: string, [nonce:string, keyid : string, donotnotifyrenew : true]})
      */
      function _log(msg) {
        if (window.console) {
          window.console.log(msg);
        }
      }
      /**
      * Performs any IP request using XMLHttpRequest & CORS
      *
      * @method _XMLHttp_req
      * @param {String} url url to be requested (param "json=json" automatic  added)
      * @return {Object} promise
      */
      function _XMLHttp_req(url) {
        var localdef = new SWAC.Defer();
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
          if (anHttpRequest.readyState === 4) {
              if (anHttpRequest.status === 200) {
              var outcome = null;
              try { outcome = JSON.parse(anHttpRequest.responseText); } catch (e) { }
              //var outcome = JSON.parse(anHttpRequest.responseText);
              if (outcome && typeof outcome === 'object') {
                if (typeof outcome.result === 'string') {
                  if (outcome.result.toLowerCase() === 'success') {
                    localdef.fulfill(outcome);
                  } else {
                    localdef.reject(new SWAC.Reason(outcome.result));
                  }
                } else {
                  //support for relying party notification response (no assumpion on response content)
                  localdef.fulfill(outcome);
                }
              }
              else {
                //support for relying party notification response (no assumpion on response content)
                localdef.fulfill({});
              }
            } else {
              localdef.reject(new SWAC.Reason('request failed with status: ' + anHttpRequest.status));
            }
          }
        };
        var modifiedUrl = url + '&json=json'; //add standard params for CORS answer
        anHttpRequest.open('GET', modifiedUrl, true);
        anHttpRequest.withCredentials = true; //cookie support
        anHttpRequest.send(null);
        return localdef.promise;
      }
  
      /**
      * Performs any IP request using JSONP (IE8 support)
      *
      * @method _JSONP_req
      * @param {String} url url to be requested (param "callback=function" automatic  added)
      * @return {Object} promise
      */
      function _JSONP_req(url) {
        var localdef = new SWAC.Defer();
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random()); //add standard params for JSONP answer
        window[callbackName] = function (data) {
          delete window[callbackName];
          if (typeof data === 'object') {
            if (typeof data.result === 'string') {
              if (data.result.toLowerCase() === 'success') {
                localdef.fulfill(data);
              } else {
                localdef.reject(new SWAC.Reason(data.result));
              }
            } else {
              //support for relying party notification response (no assumpion on response content)
              localdef.fulfill(data);
            }
          }
          else {
            //support for relying party notification response (no assumpion on response content)
            localdef.fulfill({});
          }
        };
        script.src = url + '&callback=' + callbackName;
        script.onload = function () {
          head.removeChild(script);
        };
        head.appendChild(script);
        return localdef.promise;
      }
  
      /**
      * Performs any IP request using the supported implementation, first check for CORS & XMLHttpRequest, otherwise JSONP (IE8 support)
      *
      * @method _crossBrowserHttpClientRequest
      * @param {String} url url to be requested 
      * @return {Object} promise
      */
      //Name: _crossBrowserHttpClientRequest
      //perform the current request using XMLHttpRequest when available or JSONP (in IE8)
      function _crossBrowserHttpClientRequest(aUrl) {
        if (window.XMLHttpRequest) { //first check on XMLHTTPRequest support
          var anHttpRequest = new XMLHttpRequest();
          if (typeof anHttpRequest.withCredentials !== 'undefined') {
            return _XMLHttp_req(aUrl);
          }
        }
        return _JSONP_req(aUrl);
      }
  
      /**
      * Performs any IP request after a mandatory paramters check
      *
      * @method _checkAndSendReq
      * @param {String} uactionType any of (loginrequest,logoutrequest,changelanguagerequest,renewrequest & getkeyrequest)
      * @param {object} params parameters for the current actinionType
      * @param {object} callerDeferPar optional defer (when not provided a new Defer object is created for the outcome)
      * @return {Object} promise
      */
      function _checkAndSendReq(actionType, params, callerDeferPar) {
        var callerDefer = typeof callerDeferPar === 'object' ? callerDeferPar : new SWAC.Defer();
        var outcome = {
          'proceed': false,
          'errmsg': 'unknown action',
          'reqURL': ''
        };
        switch (actionType) {
          case 'loginrequest':
            if (typeof params !== 'object' || typeof params.service !== 'string' || params.service.length === 0) {
              outcome.errmsg = 'Login: Service mandatory parameter not found';
            } else {
              if (typeof params.nosession === 'boolean' && params.nosession === true) {
                  outcome.errmsg = 'Login: nosession parameter unsupported in silent mode';
                  outcome.proceed = false;
              }
              else {
                  outcome.proceed = true;
              }
              outcome.reqURL = urlUMCIP + '?action=loginrequest&service=' + params.service;
              if (typeof params.nonce === 'string' && params.nonce.length > 0) {
                outcome.reqURL += ('&nonce=' + params.nonce);
              }
              if (typeof params.keyid === 'string' && params.keyid.length > 0) {
                outcome.reqURL += ('&keyid=' + params.keyid);
              }
              if (typeof params.sigalg === 'string' && params.sigalg.length > 0) {
                  outcome.reqURL += ('&sigalg=' + params.sigalg);
              }
              if (typeof params.authnmethod === 'string' && params.authnmethod.length > 0) {
                  outcome.reqURL += ('&authnmethod=' + params.authnmethod);
              }
              if (typeof params.dontnotifyrenew === 'boolean') {
                outcome.reqURL += ('&dontnotifyrenew=' + params.dontnotifyrenew);
              }
              if (typeof params.authnlevel === 'string' && params.authnlevel.length > 0) {
                  outcome.reqURL += ('&authnlevel=' + params.authnlevel);
              }
            }
            break;
          case 'logoutrequest':
          case 'renewrequest':
            if (_sessionId === null || typeof _sessionId !== 'string' || _sessionId.length === 0) {
              outcome.errmsg = 'Session mandatory parameter not found for [' + actionType + '] ... init the service';
            } else {
              outcome.proceed = true;
              outcome.reqURL = urlUMCIP + '?action=' + actionType + '&session=' + _sessionId;
            }
            break;
          case 'changelanguagerequest':
            if (_sessionId === null || typeof _sessionId !== 'string' || _sessionId.length === 0) {
              outcome.errmsg = 'Session mandatory parameter not found [' + actionType + ']... init the service';
            } else if (typeof params !== 'object' || typeof params.language !== 'string' || params.language.length === 0) {
              outcome.errmsg = 'ChangeLanguage: language mandatory parameter not found';
            } else {
              outcome.proceed = true;
              outcome.reqURL = urlUMCIP + '?action=changelanguagerequest&session=' + _sessionId + '&language=' + params.language;
            }
            break;
          case 'getkeyrequest':
            if (typeof params !== 'object' || typeof params.service !== 'string' || params.service.length === 0) {
              outcome.errmsg = 'Login: Service mandatory parameter not found';
            } else {
              outcome.proceed = true; //no mandatory params
              outcome.reqURL = urlUMCIP + '?action=getkeyrequest&service=' + params.service;
              if (typeof params === 'object') {
                if (typeof params.nonce === 'string' && params.nonce.length > 0) {
                  outcome.reqURL += ('&nonce=' + params.nonce);
                }
                if (typeof params.keyid === 'string' && params.keyid.length > 0) {
                  outcome.reqURL += ('&keyid=' + params.keyid);
                }
                if (typeof params.sigalg === 'string' && params.sigalg.length > 0) {
                    outcome.reqURL += ('&sigalg=' + params.sigalg);
                }
              }
            }
            break;
        }
        if (outcome.proceed) {
          //TODO: remove the below lines with additional service param when not more mandatory for request
          //if (actionType !== 'loginrequest' && actionType !== 'getkeyrequest') {
          //  outcome.reqURL += '&service=fakeservice';
          //}
          _crossBrowserHttpClientRequest(outcome.reqURL).then(
            function (answer) {
              var RPListAction = '', i = 0, urlstr = '';
              if (answer.sessionlist !== undefined) {
  
                if (answer.action.toLowerCase() === 'logoutresponse') {
                  RPListAction = 'logout&response=success&session=' + _sessionId;
                } else if (answer.action.toLowerCase() === 'changelanguageresponse') {
                  RPListAction = 'changelanguage&response=success&language=' + params.language;
                } else if (answer.action.toLowerCase() === 'renewresponse') {
                  RPListAction = 'renew&response=success&session=' + _sessionId;
                }
                if (RPListAction.length > 0) {
                  for (i = 0; i < answer.sessionlist.length; i++) {
                    urlstr = decodeURIComponent(answer.sessionlist[i]);
                    if (urlstr.search('&') > -1) {
                      urlstr += '&action=';
                    }
                    else {
                      urlstr += '?action=';
                    }
                    urlstr += RPListAction;
                    _crossBrowserHttpClientRequest(urlstr);
                  }
                }
              }
              callerDefer.fulfill(answer);
            },
            function (reason) {
              callerDefer.reject(reason);
            });
        }
        else {
            callerDefer.reject(new SWAC.Reason(outcome.errmsg));
        }
        return callerDefer.promise;
      }
  
      //-----------------------------------------
      //UMC API
      //-----------------------------------------
  
      return {
        init: _init,
        beginSilentLogin: _beginSilentLogin,
        beginLogout: _beginLogout,
        beginRenew: _beginRenew,
        beginChangeLanguage: _beginChangeLanguage,
        beginGetKey: _beginGetKey,
        hearthbeat: _hearthbeat,
        service: {
          beginChangeLanguage: _beginChangeLanguage,
          beginAuthentication: _beginAuthentication,
          beginSignature: _beginSignature,
          beginGetKey: _beginGetKey,
          hearthbeat: _hearthbeat
        }
      };
    })(); //UMC is a singleton (heartbeat need coordination)
    return UMC;
  };
  
  
  