/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

/* Version 1.0.0, copyright (C) 2019, Siemens AG. All Rights Reserved. */


(function () {
  var swacUtilsModule = function (SWAC) {

SWAC.Utils = (SWAC.Utils || {});

/**
 * Class that manages all versions of manifest file. 
 *
 * @class SWAC.Utils.Manifest
 * @constructor
 * 
 */
SWAC.Utils.Manifest = (function () {

  //////////////
  // PRIVATE  //
  //////////////

  var retObj = {};

  /**
  * Get the array of property names of an object
  *
  * @private
  * @method _getOwnPropertyNames
  * @param {Object} obj The object to parse
  * @return {Array} array of property names of the object
  */
  function _getOwnPropertyNames(obj) {
    var prop, result = [];

    if (typeof obj === 'object' || typeof obj === 'function') {
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
    }
    return result;
  }

  /**
  * Use methods or functions property according to the specified configuration
  *
  * @private
  * @method _switchMethodsFunctions
  * @param {object} manifest manifest to process
  * @param {object} config configuration settings
  */
  function _switchMethodsFunctions(manifest, config) {
    var interf = '';

    if (typeof config === 'object' && typeof config.useFunctions === 'boolean' && config.useFunctions) {
      if (manifest.API && manifest.API.methods) {
        manifest.API.functions = manifest.API.methods;
        delete manifest.API.methods;
      }
      if (manifest.interfaces && _getOwnPropertyNames(manifest.interfaces).length > 0) {
        for (interf in manifest.interfaces) {
          if (manifest.interfaces[interf].methods) {
            manifest.interfaces[interf].functions = manifest.interfaces[interf].methods;
            delete manifest.interfaces[interf].methods;
          }
        }
      }
    }
    else {
      if (manifest.API && manifest.API.functions) {
        manifest.API.methods = manifest.API.functions;
        delete manifest.API.functions;
      }
      if (manifest.interfaces && _getOwnPropertyNames(manifest.interfaces).length > 0) {
        for (interf in manifest.interfaces) {
          if (manifest.interfaces[interf].functions) {
            manifest.interfaces[interf].methods = manifest.interfaces[interf].functions;
            delete manifest.interfaces[interf].functions;
          }
        }
      }
    }
  }

  /**
  * Default converters for 1.0.0, 1.0.1, 1.0.2 versions
  *
  * @private
  * @method _onlyVer
  * @param {string} version source version
  * @param {string} previousVersion destination version
  * @return {object} conversion object
  */
  function _onlyVer(version, previousVersion) {
    return {
      ver: version,
      fromPrevious: function (manifest, config) {
        if (!manifest.coreVersion) {
          manifest.coreVersion = version;
        }
        _switchMethodsFunctions(manifest, config);
        return {
          converted: true,
          manifest: manifest
        };
      },
      toPrevious: function (manifest, config) {
        if (!manifest.coreVersion) {
          manifest.coreVersion = previousVersion;
        }
        _switchMethodsFunctions(manifest, config);
        return {
          converted: true,
          manifest: manifest
        };
      }
    };
  }

  /**
  * Compare provided versions
  *
  * @private
  * @method _checkVersion
  * @param {string} currentVersion version to compare
  * @param {string} matchVersion reference version
  * @return {bool} returns true if matchVersion is greatest than currentVersion
  */
  function _checkVersion(currentVersion, matchVersion) {
    var i;

    // map is not available on IE8
    currentVersion = currentVersion.ver.split('.').map(function (current) {
      return parseInt(current);
    });
    matchVersion = matchVersion.ver.split('.').map(function (current) {
      return parseInt(current);
    });
    for (i = 0; i < 3; i++) {
      if (currentVersion[i] < matchVersion[i]) {
        return true;
      }
      if (currentVersion[i] > matchVersion[i]) {
        return false;
      }
    }
    return true;
  }

  /**
  * Manifest conversion function
  *
  * @method convert
  * @param {string} manifest version to convert
  * @param {string} targetVersion target version
  * @param {object} config configuration object
  * @return {object} object containing the convertion process result
  */
  function _converTo(manifest, targetVersion, config) {
    var checkSemVer = /^(\d+\.\d+\.\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/,
        mConverters = retObj.versions.slice(0).sort(function (currentVersion, matchVersion) {
          return !_checkVersion(currentVersion, matchVersion);
        }).reverse();

    if (typeof targetVersion !== 'string' || !checkSemVer.test(targetVersion)) {
      if (SWAC.Logging) {
        SWAC.Logging.log('SWAC.Utils.Manifest.convert: Wrong output version format', SWAC.Logging.Level.External);
      }
      return {
        converted: false,
        error: 'SWAC.Utils.Manifest.convert: Wrong output version format'
      };
    }

    // work on a copy of the manifest param
    var theCmpObj = typeof manifest === 'string' ? JSON.parse(manifest) : JSON.parse(JSON.stringify(manifest));

    // provide the list of the needed converters
    var _getJobs = function (fromV, toV) {
      var result = {}, fromIndex = -1, toIndex = -1;

      if (fromV === toV) {
        return result;
      }

      var findVerFloor = function (list, value) {
        var j;
        for (j = 0; j < list.length; j++) {
          if (_checkVersion(list[j], value)) {
            return j;
          }
        }
        return -1;
      };

      fromIndex = findVerFloor(mConverters, { ver: fromV });
      toIndex = findVerFloor(mConverters, { ver: toV });
      result = {
        fromIdx: fromIndex,
        toIdx: toIndex
      };

      return result;
    };

    // only two option:
    // old format(Component descritor): coreVersion
    // new format(Component manifest): mver
    var cmpVer = '';
    if (typeof theCmpObj.coreVersion === 'string' && checkSemVer.test(theCmpObj.coreVersion)) { // <= 1.0.2
      cmpVer = theCmpObj.coreVersion;
    }
    else if (typeof theCmpObj.mver === 'string' && checkSemVer.test(theCmpObj.mver) && (typeof theCmpObj.swac !== 'undefined')) { // >= 1.0.2
      cmpVer = theCmpObj.mver;
    }

    if (cmpVer.length > 0) {
      if (SWAC.Logging) {
        SWAC.Logging.log('SWAC.Utils.Manifest.convert: conversion from: ' + cmpVer + ' to: ' + targetVersion, SWAC.Logging.Level.External);
      }
      var neededConverters = _getJobs(cmpVer, targetVersion);

      var method = 'fromPrevious', // default action upgrade version
            inc = -1;

      theCmpObj = {
        converted: true,
        manifest: theCmpObj
      };

      if ((neededConverters.fromIdx !== neededConverters.toIdx) && (neededConverters.fromIdx !== -1) && (neededConverters.toIdx !== -1)) {
        if (neededConverters.toIdx > neededConverters.fromIdx) {
          method = 'toPrevious'; // action downgrade version
          inc = 1;
          neededConverters.toIdx--;
        }
        else {
          neededConverters.fromIdx--;
        }

        for (var convertedIndex = neededConverters.fromIdx; ; convertedIndex = convertedIndex + inc) {
          if (mConverters[convertedIndex] && mConverters[convertedIndex][method]) {
            theCmpObj = mConverters[convertedIndex][method].call(this, theCmpObj.manifest, config);
          }
          if (!theCmpObj.converted) {
            break;
          }
          if (convertedIndex === neededConverters.toIdx) {
            break;
          }
        }
      }
      return theCmpObj;
    }
    else {
      if (SWAC.Logging) {
        SWAC.Logging.log('SWAC.Utils.Manifest.convert: unsupported manifest format', SWAC.Logging.Level.External);
      }
      return {
        converted: false,
        error: 'SWAC.Utils.Manifest.convert: unsupported manifest format'
      };
    }
  }

  // Configuration process result object initialization
  retObj = {
    convert: _converTo,
    versions: []
  };

  // add old versions converter to the object
  retObj.versions.push({ ver: '1.0.0' });
  retObj.versions.push(_onlyVer('1.0.1', '1.0.0'));
  retObj.versions.push(_onlyVer('1.0.2', '1.0.1'));
  retObj.versions.push({
    ver: '1.2.0',
    fromPrevious: function (m, config) {
      // check con description validity to be evaluated ... to use the jsonSchema we've to still to clear some external library
      var i = 0,
        unitValues = ['px', 'cm', 'mm', 'in', 'em', 'pt'],
        theUnit = '';

      var _converType = function (origType) {
        return (typeof origType === 'string') ? { 'type': origType } : origType;
      };

      var newDescrObj = {};

      var _addExtra = function (source, dest) {
        newDescrObj.swac.metadata = (newDescrObj.swac.metadata || {});
        /* jshint camelcase:false */
        newDescrObj.swac.metadata.x_custom = {};
        /* jshint camelcase:true */
        for (var prop in source) {
          if (source.hasOwnProperty(prop)) {
            /* jshint camelcase:false */
            newDescrObj.swac.metadata.x_custom[prop] = source[prop];
            /* jshint camelcase:true */
          }
        }
      };
      
      var _getAPIs = function (obj) {
        var retAPIs = {}, i = 0, j = 0, api = {}, parameters = {}, _arguments = {}, apiName = 'methods';

        if (Object.prototype.toString.call(obj.functions) === '[object Array]') {
          apiName = 'functions';
        }
        if (Object.prototype.toString.call(obj[apiName]) === '[object Array]' && obj[apiName].length > 0) {
          retAPIs.methods = {};
          for (i = 0; i < obj[apiName].length; i++) {
            parameters = {};
            if (obj[apiName][i][3].length > 0) { // parameters
              for (j = 0; j < obj[apiName][i][3].length; j++) {
                parameters[obj[apiName][i][3][j][0]] = _converType(obj[apiName][i][3][j][1]);
              }
            }
            api = {
              'description': obj[apiName][i][1],
              'return': _converType(obj[apiName][i][2]),
              'parameters': parameters
            };
            retAPIs.methods[obj[apiName][i][0]] = api;
          }
        }
        if (Object.prototype.toString.call(obj.events) === '[object Array]' && obj.events.length > 0) {
          retAPIs.events = {};
          for (i = 0; i < obj.events.length; i++) {
            _arguments = {};
            if (obj.events[i][2].length > 0) { // parameters
              for (j = 0; j < obj.events[i][2].length; j++) {
                _arguments[obj.events[i][2][j][0]] = _converType(obj.events[i][2][j][1]);
              }
            }
            api = {
              'description': obj.events[i][1],
              'arguments': _arguments
            };
            retAPIs.events[obj.events[i][0]] = api;
          }
        }
        return retAPIs;
      };

      // mandatory fields
      newDescrObj = {
        mver: '1.2.0',
        swac: {
          identity: {
            name: m.name,
            version: m.version,
            displayname: m.name + ' ' + m.version,  // ** check this convention
            type: m.componentType
          }
        }
      };
      delete m.name;
      delete m.version;
      delete m.componentType;

      // previous mandatory fields
      if (m.coreVersion) {
        newDescrObj.swac.environment = {
          prerequisites: {
            version: m.coreVersion
          }
        };
      }
      delete m.coreVersion;

      // optional field
      if (m.flavor) {
        if (m.flavor === 'UI' || m.flavor === 'UILess') {
          newDescrObj.swac.identity.flavor = m.flavor;
          delete m.flavor;
        }
      }
      if (m.prerequisites) {
        if (m.prerequisites.services) {
          if (Object.prototype.toString.call(m.prerequisites.services) === '[object Array]') {
            if (m.prerequisites.services.length > 0) {
              newDescrObj.swac.environment.prerequisites.services = {};
              for (i = 0; i < m.prerequisites.services.length; i++) {
                newDescrObj.swac.environment.prerequisites.services[m.prerequisites.services[i]] = {};
              }
            }
            delete m.prerequisites.services;
          }
        }
        if (m.prerequisites.renderingSpace) {
          if (typeof m.prerequisites.renderingSpace === 'object') {
            newDescrObj.swac.environment.prerequisites.renderingspace = {};
            if (typeof m.prerequisites.renderingSpace.width === 'string') {
              newDescrObj.swac.environment.prerequisites.renderingspace.minwidth = parseInt(m.prerequisites.renderingSpace.width);
              if (m.prerequisites.renderingSpace.width.length > 2) {
                theUnit = m.prerequisites.renderingSpace.width.substr(-2);
              }
              delete m.prerequisites.renderingSpace.width;
            }
            if (typeof m.prerequisites.renderingSpace.height === 'string') {
              newDescrObj.swac.environment.prerequisites.renderingspace.minheight = parseInt(m.prerequisites.renderingSpace.height);
              if (theUnit.length === 0 && m.prerequisites.renderingSpace.height.length > 2) {
                theUnit = m.prerequisites.renderingSpace.height.substr(-2);
              }
              delete m.prerequisites.renderingSpace.height;
            }
            if (theUnit.length !== 0) {
              theUnit = theUnit.toLowerCase();
              for (i = 0; i < unitValues.length; i++) {
                if (theUnit === unitValues[i]) {
                  newDescrObj.swac.environment.prerequisites.renderingspace.unit = theUnit;
                  break;
                }
              }
            }
            // check unknow field
            if (_getOwnPropertyNames(m.prerequisites.renderingSpace).length === 0) { // no custom content
              delete m.prerequisites.renderingSpace;
            }
          }
        }
        if (_getOwnPropertyNames(m.prerequisites).length === 0) { // no custom content
          delete m.prerequisites;
        }
      }
      if (m.homepage || m.author || m.keywords || m.description) {
        newDescrObj.swac.metadata = {};
        if (typeof m.homepage === 'string') {
          newDescrObj.swac.metadata.homepage = m.homepage;
          delete m.homepage;
        }
        if (typeof m.description === 'string') {
          newDescrObj.swac.metadata.description = m.description;
          delete m.description;
        }
        if (m.keywords && Object.prototype.toString.call(m.keywords) === '[object Array]') {
          newDescrObj.swac.metadata.keywords = m.keywords;
          delete m.keywords;
        }
        if (typeof m.author === 'object') {
          newDescrObj.swac.metadata.author = [{}];
          if (typeof m.author.name === 'string') {
            newDescrObj.swac.metadata.author[0]['name'] = m.author.name;
            delete m.author.name;
          }
          if (typeof m.author.mail === 'string') {
            newDescrObj.swac.metadata.author[0]['email'] = m.author.mail;
            delete m.author.mail;
          }
          if (_getOwnPropertyNames(m.author).length === 0) { // no custom content
            delete m.author;
          }
        }
      }
      if (typeof m.source === 'string') {
        newDescrObj.swac.identity.source = m.source;
        delete m.source;
      }
      if (typeof m.customTypes === 'object') {
        newDescrObj.swac.types = m.customTypes;
        delete m.customTypes;
      }
      if (m.API || m.interfaces || (m.DPC && m.DPC.length > 0)) {
        newDescrObj.swac.contracts = {};
        if (typeof m.API === 'object') {
          newDescrObj.swac.contracts['api'] = _getAPIs(m.API);
          if (Object.prototype.toString.call(m.API.methods) === '[object Array]') {
            delete m.API.methods;
          }
          if (Object.prototype.toString.call(m.API.functions) === '[object Array]') {
            delete m.API.functions;
          }
          if (Object.prototype.toString.call(m.API.events) === '[object Array]') {
            delete m.API.events;
          }
          if (_getOwnPropertyNames(m.API).length === 0) { // no custom content
            delete m.API;
          }
        }
        if (typeof m.interfaces === 'object') {
          newDescrObj.swac.contracts['interfaces'] = {};
          for (var propName in m.interfaces) {
            if (m.interfaces.hasOwnProperty(propName)) {

              newDescrObj.swac.contracts.interfaces[propName] = _getAPIs(m.interfaces[propName]);
              if (Object.prototype.toString.call(m.interfaces[propName].methods) === '[object Array]') {
                delete m.interfaces[propName].methods;
              }
              if (Object.prototype.toString.call(m.interfaces[propName].functions) === '[object Array]') {
                delete m.interfaces[propName].functions;
              }
              if (Object.prototype.toString.call(m.interfaces[propName].events) === '[object Array]') {
                delete m.interfaces[propName].events;
              }
              if (_getOwnPropertyNames(m.interfaces[propName]).length === 0) { // no custom content
                delete m.interfaces[propName];
              }
            }

          }
          if (_getOwnPropertyNames(m.interfaces).length === 0) { // no custom content
            delete m.interfaces;
          }
        }
        if (m.DPC) {
          if (m.DPC.length > 0) {
            newDescrObj.swac.contracts['dpc'] = (function getDPC(dcpNode) {
              var retVal = {}, i = 0;
              for (i = 0; i < dcpNode.length; i++) {
                if (dcpNode[i].length === 4) { // DataNode
                  retVal[dcpNode[i][0]] = _converType(dcpNode[i][3]);
                  retVal[dcpNode[i][0]].description = dcpNode[i][1];
                  retVal[dcpNode[i][0]].permission = dcpNode[i][2].toLowerCase();
                  retVal[dcpNode[i][0]].node = 'data';
                }
                else { // StructNode
                  retVal[dcpNode[i][0]] = { 'children': getDPC(dcpNode[i][1]) };
                  retVal[dcpNode[i][0]].node = 'structures';
                }
              }
              return retVal;
            })(m.DPC);
          }
          delete m.DPC;
        }
      }

      if (_getOwnPropertyNames(m).length > 0) { // no custom content
        _addExtra(m, newDescrObj);
      }
      return {
        converted: true,
        manifest: newDescrObj
      };
    },
    toPrevious: function (m, config) {
      // convert: 1.0.2 <- 1.2.0
      // check con description validity to be evaluated ... to use the jsonSchema we've to still to clear some external library
      m = m['swac'];

      var _converType = function (origType) {
        return (origType.type ? origType.type : { '$ref': origType['$ref'] });
      };

      var _getContracts = function (c) {
        var retApis = {}, method = '', params = [], par = '', event = '', _arguments = [], arg, funcMode = (typeof config.useFunctions === 'boolean' && config.useFunctions) ? 'functions' : 'methods';
        if (typeof c.methods === 'object') {
          retApis[funcMode] = [];
          for (method in c.methods) {
            if (c.methods.hasOwnProperty(method)) {
              params = [];
              for (par in c.methods[method].parameters) {
                if (c.methods[method].parameters.hasOwnProperty(par)) {

                  params.push([par, _converType(c.methods[method].parameters[par])]);
                }
              }
              retApis[funcMode].push([method, c.methods[method].description || '', _converType(c.methods[method].return), params]);
            }
          }
        }
        if (typeof c.events === 'object') {
          retApis['events'] = [];
          for (event in c.events) {
            if (c.events.hasOwnProperty(event)) {
              _arguments = [];
              for (arg in c.events[event].arguments) {
                if (c.events[event].arguments.hasOwnProperty(arg)) {
                  _arguments.push([arg, _converType(c.events[event].arguments[arg])]);
                }
              }
              retApis['events'].push([event, c.events[event].description || '', _arguments]);
            }
          }
        }
        return retApis;
      };

      var newDescrObj = {
        'name': m.identity.name,
        'version': m.identity.version,
        'componentType': m.identity.type
      }, unitValue = '';

      // optional field
      if (typeof m.identity.source === 'string') {
        newDescrObj.source = m.identity.source;
      }
      if (m.identity.flavor === 'UI' || m.identity.flavor === 'UILess') {
        newDescrObj.flavor = m.identity.flavor;
      }

      if (m.metadata) {
        if (typeof m.metadata.description === 'string') {
          newDescrObj.description = m.metadata.description;
        }
        if (typeof m.metadata.homepage === 'string') {
          newDescrObj.homepage = m.metadata.homepage;
        }
        if (m.metadata.keywords && Object.prototype.toString.call(m.metadata.keywords) === '[object Array]') {
          newDescrObj.keywords = m.metadata.keywords;
        }
        if (Object.prototype.toString.call(m.metadata.author) === '[object Array]' && m.metadata.author.length > 0) {
          newDescrObj.author = {};
          if (typeof m.metadata.author[0]['name'] === 'string') {
            newDescrObj.author.name = m.metadata.author[0]['name'];
          }
          if (typeof m.metadata.author[0]['email'] === 'string') {
            newDescrObj.author.mail = m.metadata.author[0]['email'];
          }
        }
      }
      if (typeof m.identity.source === 'string') {
        newDescrObj.source = m.identity.source;
      }
      if (typeof m.types === 'object') {
        newDescrObj.customTypes = m.types;
      }
      if (typeof m.contracts === 'object') {
        if (typeof m.contracts.api === 'object') {
          newDescrObj.API = _getContracts(m.contracts.api);
        }
        if (typeof m.contracts.interfaces === 'object') {
          newDescrObj.interfaces = {};
          for (var intf in m.contracts.interfaces) {
            if (m.contracts.interfaces.hasOwnProperty(intf)) {

              newDescrObj.interfaces[intf] = _getContracts(m.contracts.interfaces[intf]);
            }
          }
        }
        if (m.contracts.dpc) {
          newDescrObj.DPC = (function getMDpc(mdpc) {
            var node = '', retval = [];
            for (node in mdpc) {
              if (mdpc.hasOwnProperty(node)) {

                if (mdpc[node].node === 'data') {
                  retval.push([node, mdpc[node].description || '', mdpc[node].permission.toUpperCase(), _converType(mdpc[node])]);
                }
                else {
                  retval.push([node, getMDpc(mdpc[node].children)]);
                }
              }
            }
            return retval;
          })(m.contracts.dpc);
        }
      }
      if (typeof m.environment === 'object') {
        if (typeof m.environment.prerequisites === 'object') {
          newDescrObj.prerequisites = {};
          if (m.environment.prerequisites.services) {
            newDescrObj.prerequisites.services = [];
            for (var service in m.environment.prerequisites.services) {
              if (m.environment.prerequisites.services.hasOwnProperty(service)) {

                newDescrObj.prerequisites.services.push(service);
              }
            }
          }
          if (m.environment.prerequisites.renderingspace) {
            newDescrObj.prerequisites.renderingSpace = {};
            if (m.environment.prerequisites.renderingspace.unit) {
              unitValue = m.environment.prerequisites.renderingspace.unit;
            }
            if (m.environment.prerequisites.renderingspace.minwidth) {
              newDescrObj.prerequisites.renderingSpace.width = '' + m.environment.prerequisites.renderingspace.minwidth + unitValue;
            }
            if (m.environment.prerequisites.renderingspace.minheight) {
              newDescrObj.prerequisites.renderingSpace.height = '' + m.environment.prerequisites.renderingspace.minheight + unitValue;
            }
          }
          if (m.environment.prerequisites.version) {
            newDescrObj.coreVersion = m.environment.prerequisites.version;
          }
        }
      }
      else {
        newDescrObj.coreVersion = '1.0.2';
      }
      return {
        converted: true,
        manifest: newDescrObj
      };
    }
  });

  //////////////
  // PUBLIC   //
  //////////////

  return retObj;
})();

    return SWAC;
  };

  try {
    var SWACConstructor = function () { };

    if ((!window.SWAC) || (typeof window.SWAC === 'object' && typeof window.SWAC.Communication !== 'object') || (typeof window.SWAC === 'undefined')) {
      swacUtilsModule(SWACConstructor.prototype);
      window.SWAC = new SWACConstructor();
    }
    else if (typeof window.SWAC.Communication === 'undefined') { // SWAC base is not present, then check for an already present SWAC.Utils
      if (typeof window.SWAC.constructor.prototype.Utils !== 'undefined') {
        // SWAC.Utils created with new(), get the constructor
        SWACConstructor = window.SWAC.constructor;
      }
      else {
        // old SWAC.Utils object, creates the constructor
        for (var property in window.SWAC) {
          if (window.SWAC.hasOwnProperty(property)) {
            SWACConstructor.prototype[property] = window.SWAC[property];
          }
        }
      }
    }

    var checkSystemJs = typeof SystemJS !== 'undefined';
    var checkRequireJs = typeof define === 'function' && typeof define.amd !== 'undefined' && typeof requirejs !== 'undefined';

    if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
      var _swacConstructor = null;
      if (typeof (_swacConstructor = require('@swac/base')) !== 'function') {
        _swacConstructor = SWACConstructor;
      }
      else {
        if (typeof _swacConstructor.prototype.Utils !== 'object') {
          swacUtilsModule(_swacConstructor.prototype);
        }
      }
      module.exports = _swacConstructor;
      module.exports['default'] = module.exports;
    }
    else if (checkSystemJs || checkRequireJs) {
      if ((checkSystemJs && SystemJS.map.hasOwnProperty('@swac/base')) ||
        (checkRequireJs && typeof requirejs.s.contexts._.config.paths['@swac/base'] !== 'undefined')) {
          // extend base constructor
          define('@swac/utils', ['@swac/base'], function (base) {
            if (typeof base.prototype.Utils !== 'object') {
              swacUtilsModule(base.prototype);
            }
            return base;
          });
      }
    else {
        // no base configured
        define('@swac/utils', function () {
          return SWACConstructor;
        });
      }
    }
    else {
      throw new Error('SWAC on window');
    }
  }
  catch (e) {
    if (typeof window.SWAC.constructor.prototype.Utils !== 'object') {
      swacUtilsModule(window.SWAC.constructor.prototype);
    }
  }

})();