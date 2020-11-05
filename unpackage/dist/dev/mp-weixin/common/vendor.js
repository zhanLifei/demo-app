(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!********************************************!*\
  !*** D:/demo/000(车聚利)/000(车聚利)/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 5 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-23720191024001","_inBundle":false,"_integrity":"sha512-vJEk493Vdb8KueNzR2otzDi23rfyRcQBo/t1R41MwNGPk+AUB94gh10+HVLo98DRcvMzkuVofz3KXTAfEx24iw==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-23720191024001.tgz","_shasum":"18272814446a9bc6053bc92666ec7064a1767588","_spec":"@dcloudio/uni-stat@next","_where":"/Users/fxy/Documents/DCloud/HbuilderX-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a725c04ef762e5df78a9a69d140c2666e0de05fc","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-23720191024001"};

/***/ }),
/* 7 */
/*!*************************************************************!*\
  !*** D:/demo/000(车聚利)/000(车聚利)/pages.json?{"type":"style"} ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/login/null": { "navigationBarTitleText": "" }, "pages/login/login": { "navigationBarTitleText": "" }, "pages/reg/reg": { "navigationBarTitleText": "" }, "pages/reg/download": { "navigationBarTitleText": "" }, "pages/login/unbind": { "navigationBarTitleText": "" }, "pages/login/forget": { "navigationBarTitleText": "" }, "pages/main/index": { "navigationBarTitleText": "" }, "pages/main/carService": { "navigationBarTitleText": "" }, "pages/main/tradingCenter": { "navigationBarTitleText": "" }, "pages/main/financial": { "navigationBarTitleText": "" }, "pages/main/my": { "navigationBarTitleText": "" }, "pages/index/notice": { "navigationBarTitleText": "" }, "pages/index/noticeDeail": { "navigationBarTitleText": "" }, "pages/index/beguide": { "navigationBarTitleText": "" }, "pages/index/myteam": { "navigationBarTitleText": "" }, "pages/index/masters": { "navigationBarTitleText": "" }, "pages/index/selInsCom": { "navigationBarTitleText": "" }, "pages/index/uploaddata": { "navigationBarTitleText": "" }, "pages/index/selarchins": { "navigationBarTitleText": "" }, "pages/index/carservice": { "navigationBarTitleText": "" }, "pages/index/storeinfo": { "navigationBarTitleText": "" }, "pages/index/allevalu": { "navigationBarTitleText": "" }, "pages/index/allevaluArt": { "navigationBarTitleText": "" }, "pages/index/issueeval": { "navigationBarTitleText": "" }, "pages/index/everyoneg": { "navigationBarTitleText": "" }, "pages/index/pir": { "navigationBarTitleText": "" }, "pages/index/article": { "navigationBarTitleText": "" }, "pages/index/selcity": { "navigationBarTitleText": "" }, "pages/index/provinceCity": { "navigationBarTitleText": "" }, "pages/index/nameauth": { "navigationBarTitleText": "" }, "pages/index/cardauth": { "navigationBarTitleText": "" }, "pages/index/conequity": { "navigationBarTitleText": "" }, "pages/index/loansrecord": { "navigationBarTitleText": "" }, "pages/index/applyun": { "navigationBarTitleText": "" }, "pages/index/applyrecord": { "navigationBarTitleText": "" }, "pages/index/level": { "navigationBarTitleText": "" }, "pages/record/levelDateile": { "navigationBarTitleText": "积分详细" }, "pages/index/webview": { "navigationBarTitleText": "" }, "pages/record/integral": { "navigationBarTitleText": "积分详细" }, "pages/record/int_detail": { "navigationBarTitleText": "" }, "pages/record/hall": { "navigationBarTitleText": "城市大厅" }, "pages/record/order": { "navigationBarTitleText": "订单详情" }, "pages/record/wd_record": { "navigationBarTitleText": "" }, "pages/record/chebeidetail": { "navigationBarTitleText": "" }, "pages/record/malidefail": { "navigationBarTitleText": "" }, "pages/record/honordefail": { "navigationBarTitleText": "" }, "pages/record/apply_record": { "navigationBarTitleText": "" }, "pages/record/canalrecord": { "navigationBarTitleText": "" }, "pages/record/AdDetail": { "navigationBarTitleText": "" }, "pages/record/auditcom2": { "navigationBarTitleText": "" }, "pages/center/buy": { "navigationBarTitleText": "" }, "pages/center/onsale": { "navigationBarTitleText": "" }, "pages/center/my_deal": { "navigationBarTitleText": "" }, "pages/center/merchant": { "navigationBarTitleText": "" }, "pages/center/voucher": { "navigationBarTitleText": "" }, "pages/center/invitefrient": { "navigationBarTitleText": "" }, "pages/center/appload": { "navigationBarTitleText": "" }, "pages/center/apploans2": { "navigationBarTitleText": "" }, "pages/center/getPOS": { "navigationBarTitleText": "" }, "pages/center/upload_voucher": { "navigationBarTitleText": "" }, "pages/center/question": { "navigationBarTitleText": "" }, "pages/center/credit_card": { "navigationBarTitleText": "" }, "pages/service/feedback": { "navigationBarTitleText": "" }, "pages/main/scan": { "navigationBarTitleText": "核销兑换券" }, "pages/service/star_level": { "navigationBarTitleText": "" }, "pages/service/auditcom": { "navigationBarTitleText": "" }, "pages/service/appointment": { "navigationBarTitleText": "" }, "pages/service/myappointment": { "navigationBarTitleText": "" }, "pages/service/conversfun": { "navigationBarTitleText": "" }, "pages/service/myfun": { "navigationBarTitleText": "" }, "pages/service/businesscenter": { "navigationBarTitleText": "" }, "pages/service/putcode": { "navigationBarTitleText": "" }, "pages/service/fam_quest": { "navigationBarTitleText": "" }, "pages/set/security": { "navigationBarTitleText": "" }, "pages/set/loginpsw": { "navigationBarTitleText": "" }, "pages/set/dealpsw": { "navigationBarTitleText": "" }, "pages/set/forgetpsw": { "navigationBarTitleText": "" }, "pages/set/personal": { "navigationBarTitleText": "" }, "pages/service/post": { "navigationBarTitleText": "" }, "pages/service/up_post": { "navigationBarTitleText": "" }, "pages/service/credit_card": { "navigationBarTitleText": "" }, "pages/service/up_credit": { "navigationBarTitleText": "" }, "pages/record/custom": { "navigationBarTitleText": "" }, "pages/record/conDeial": { "navigationBarTitleText": "" }, "pages/service/user_rule": { "navigationBarTitleText": "" }, "pages/service/settlement": { "navigationBarTitleText": "" }, "pages/realName/real_name": { "navigationBarTitleText": "" }, "pages/realName/review": { "navigationBarTitleText": "" }, "pages/realName/authentication": { "navigationBarTitleText": "" }, "pages/realName/usdtreal": { "navigationBarTitleText": "" }, "pages/mycar/buycar": { "navigationBarTitleText": "我要买车" }, "pages/mycar/car-details": { "navigationBarTitleText": "汽车资讯" }, "pages/mycar/more": { "navigationBarTitleText": "全部汽车资讯" }, "pages/mycar/allEvaluation": { "navigationBarTitleText": "全部汽车评价" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),
/* 8 */
/*!************************************************************!*\
  !*** D:/demo/000(车聚利)/000(车聚利)/pages.json?{"type":"stat"} ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__2A1E150" };exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 15 */
/*!********************************************!*\
  !*** D:/demo/000(车聚利)/000(车聚利)/service.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // 管理账号信息
var USERS_KEY = 'USER_KEY';
var TOKEN_KEY = 'TOKEN_KEY';

var getUserInfo = function getUserInfo() {
  var ret = '';
  ret = uni.getStorageSync(USERS_KEY);
  if (!ret) {
    return {
      avatar: '../../static/img/avatar.png',
      bottom_text: '广州锐合技术支持QQ：8396048',
      level_name: '普通会员',
      nickname: '锐合网络',
      uid: 0,
      icode: '18024553545' };

  }
  return ret;
};
var User_paw = function User_paw(user, paw) {
  var User_paw = [];
  User_paw.push(user);
  User_paw.push(paw);
  uni.setStorageSync('User_paw', User_paw);
  // return User_paw
};
var Memory = function Memory(memory) {
  uni.setStorageSync('memory', memory);
};

var setUserInfo = function setUserInfo(data) {
  uni.setStorage({
    key: USERS_KEY,
    data: data });

};

var setToken = function setToken(token) {
  uni.setStorageSync(TOKEN_KEY, token);
};

var getToken = function getToken() {
  return uni.getStorageSync(TOKEN_KEY);
};

var removeToken = function removeToken() {
  uni.clearStorage();
};

var setId = function setId(id) {
  uni.setStorageSync('uid', id);
};

var getId = function getId() {
  return uni.getStorageSync('uid');
};

var setLogid = function setLogid(logid) {
  uni.setStorageSync('logid', logid);
};

var getLogid = function getLogid() {
  return uni.getStorageSync('logid');
};
var config = {
  arch: '',
  receive: '',
  status: '',
  freeze: '',
  species: '',
  version: '1.0.2' };


var _api_root = 'http://0365.8396048.com/'; //'http://0365.8396048.com/'//
// const _api_root = 'http://cjl.chefuwu8.com/';


var api = {
  home: {
    info: _api_root + 'api/member/info', //获取会员信息-车聚利
    captcha: _api_root + 'api/service/captcha', //图形验证码
    uploadImgHLF: _api_root + 'api/insurance/uploadImg', //POST上传图片-HLF的接口
    liability: _api_root + 'api/member/liability', //GET免责声明
    inform: _api_root + 'api/index/inform', //GET获取首页平台公告
    hero: _api_root + 'api/index/hero', //GET 出单英雄轮播
    category: _api_root + 'api/merch/category' //POST店铺分类列表
  },
  login: {
    login: _api_root + 'api/login/index', // 登录-车聚利
    forget: _api_root + 'api/login/forgetpwd', // 忘记密码-车聚利
    logo: _api_root + 'api/login/get_enter_logo', //  获取网站信息 -车聚利
    unbind: _api_root + 'api/login/unbind', //  解除绑定-车聚利
    emailForgetpwd: _api_root + 'api/login/emailForgetpwd', //邮箱忘记密码
    emailunbind: _api_root + 'api/login/emailunbind' //解除绑定
  },
  reg: {
    reg: _api_root + 'api/login/register', //注册-车聚利
    code: _api_root + 'api/login/verifycode', //获取验证码-车聚利
    agree: _api_root + 'api/login/get_user_regagree', //获取注册协议-车聚利
    sendEmailCode: _api_root + 'api/login/sendEmailCode', //邮箱验证码 
    emailRegister: _api_root + 'api/login/emailRegister' //邮箱注册
  },
  index: _defineProperty({
    carRealname: _api_root + 'api/member/carRealname', //POST 车主认证提交-车聚利
    myTeamDetail: _api_root + 'api/member/myTeam', //-车聚利
    team: _api_root + 'api/member/myTeams', //我的团队详情-车聚利
    getSlide: _api_root + 'api/index/getSlide', // 首页轮播图-车聚利
    articleList: _api_root + 'api/article/articleList', //GET 新手指南
    articleCate: _api_root + 'api/article/articleCate', //GET 新手指南
    articlContent: _api_root + 'api/article/articlContent', //GET 新手指南
    index: _api_root + 'api/benefit/index', //GET 人人公益展示数据
    insurance_details: _api_root + 'api/insurance/insurance_details', //GET 人人公益展示数据HLF
    getArticle: _api_root + 'api/benefit/getArticle', //GET 人人公益文章列表
    unfreezeRecord: _api_root + 'api/integral/unfreezeRecord', //GET 积分解冻申请记录
    unfreezeSubmit: _api_root + 'api/integral/unfreezeSubmit', //POST 申请解冻提交
    unfreezeList: _api_root + 'api/integral/unfreezeList', //POST 申请解冻列表
    articleDetail: _api_root + 'api/benefit/articleDetail', //GET 人人公益文章详情和评论
    commentSubmit: _api_root + 'api/benefit/commentSubmit', //POST 提交评论
    applyRelief: _api_root + 'api/benefit/applyRelief', // POST 人人公益申请救济
    myMiningMachine: _api_root + 'api/member/myMiningMachine', //我的任务（当家做主）
    machineCates: _api_root + 'api/member/machineCates', //任务列表（当家做主）
    byMiningMachine: _api_root + 'api/member/byMiningMachine', //任务兑换（当家做主）
    provinceCity: _api_root + 'api/area/index', //GET获取地址列表
    insuranceCompany: _api_root + 'api/insurance/insuranceCompany', //GET获取省市下的保险公司列表
    diyFields: _api_root + 'api/insurance/diyFields', //GET获取各类模板数据结构
    insuranceCate: _api_root + 'api/insurance/insuranceCate', //GET获取公司下的险种列表
    diyformSubmit: _api_root + 'api/insurance/diyformSubmit', //POST提交车险购买资料
    comment_list: _api_root + 'api/merch/comment_list', //POST评价列表-店铺信息页面
    comment: _api_root + 'api/merch/comment', //POST评价-店铺评价
    growthList: _api_root + 'api/member/growthList', //GET贡献等级列表
    check_status: _api_root + 'api/member/check_status', //GET实名认证状态
    car_check: _api_root + 'api/member/car_check', //GET车主认证状态
    loansLog: _api_root + 'api/insurance/loansLog', //GET贷款记录
    verifycode: _api_root + 'api/member/verifycode', //GET 获取验证码（内部）
    ex_stock: _api_root + 'api/stock/ex_stock', //POST股权兑换
    my_team: _api_root + 'api/stock/my_team', //POST我的团队QS
    direct_user: _api_root + 'api/stock/direct_user', //POST直推用户列表
    subscribe: _api_root + 'api/merch/subscribe', //POST预约
    publicqrcode: _api_root + 'api/benefit/publicqrcode', //公众号二维码
    cargetArticle: _api_root + 'api/car/getArticle', //汽车首页文章
    cararticleDetail: _api_root + 'api/car/articleDetail' }, "commentSubmit",
  _api_root + 'api/car/commentSubmit'),

  main: _defineProperty({
    avatar: _api_root + "api/member/modifyingHead", //修改头像-车聚利
    asset: _api_root + "api/member/asset", //GET 资产-车聚利
    dailyCheckin: _api_root + "api/member/dailyCheckin", //GET 每日签到
    purchasingOrder: _api_root + "api/order/purchasingOrder", //GET 获取订单列表
    getQuotationData: _api_root + "api/service/getQuotationData", //交易中心页面详情
    merch_list: _api_root + "api/merch/merch_list", //POST店铺列表
    exchange: _api_root + "api/merch/sale_exchange" }, "purchasingOrder",
  _api_root + 'api/order/purchasingOrder'),

  set: {
    changePwd: _api_root + "api/member/changePwd", //POST修改密码-车聚利
    changePwd2: _api_root + "api/member/changePwd2", //POST修改交易密码-车聚利
    forget2: _api_root + 'api/member/forgetpwd2', // POST忘记密码-车聚利
    modifyingNickname: _api_root + "api/member/modifyingNickname", //修改昵称-车聚利
    paytype: _api_root + "api/member/paytype", //POST 展示收款方式
    submitPaytype: _api_root + "api/member/submitPaytype" //POST 提交/修改支付账号
  },
  record: {
    getWtilog: _api_root + 'api/member/getWtilog', //GET 获取车贝明细-车聚利
    getActivitylog: _api_root + 'api/member/getActivitylog', //GET 获取马力明细-车聚利
    getglorylog: _api_root + 'api/member/getglorylog', //GET 获取荣誉值明细-车聚利
    index: _api_root + 'api/integral/index', //GET 积分数据展示-车聚利
    integralDetail: _api_root + 'api/integral/integralDetail', //GET 积分详细
    withdrawSubmit: _api_root + 'api/integral/withdrawSubmit', //POST 积分提现提交
    withdrawRecord: _api_root + 'api/integral/withdrawRecord', //GET 积分提现记录
    getTransactionDetail: _api_root + 'api/order/getTransactionDetail', //GET 获取交易详情
    orderComplaint: _api_root + 'api/order/orderComplaint', //POST 订单申诉
    auditPassOrder: _api_root + 'api/order/auditPassOrder', //POST 审核交易订单4
    getTransactionPay: _api_root + 'api/order/getTransactionPay', //POST 提交交易支付3
    partner_status: _api_root + 'api/stock/partner_status', //POST获取申请合伙人状态
    apply_province_partner: _api_root + 'api/stock/apply_province_partner', //POST申请省合伙人
    apply_city_partner: _api_root + 'api/stock/apply_city_partner', //POST申请城市合伙人
    my_city: _api_root + 'api/stock/my_city', //POST城市大厅
    stock_log: _api_root + 'api/stock/stock_log', //POST股权兑换明细
    stock_total: _api_root + 'api/stock/stock_total', //POST股权累计数量
    withdrawDetail: _api_root + 'api/integral/withdrawDetail', //积分提现支付状态
    reliefFund: _api_root + 'api/Benefit/reliefFund', //GET 救济申请数据展示
    getContributionlog: _api_root + 'api/member/getContributionlog', //GET贡献值明细
    jdList: _api_root + 'api/member/jdList' //GET京东推广列表
  },
  center: {
    friends: _api_root + 'api/member/inviteFriends', //GET 邀请好友
    getTransactionInfo: _api_root + 'api/order/getTransactionInfo', //GET 获取交易列表
    submitPurchasing: _api_root + 'api/order/submitPurchasing', // 发布买单
    claimPurchasingOrder: _api_root + 'api/order/claimPurchasingOrder', //POST 认领交易订单（卖给他）2
    cancelPurchasingOrder: _api_root + 'api/order/cancelPurchasingOrder', //GET 取消订单（买单）
    financialCard: _api_root + 'api/insurance/financialCard', //信用卡图文列表
    apply_merch: _api_root + 'api/merch/apply_merch', //POST申请商家
    check_status: _api_root + 'api/merch/check_status', //POST查询申请商铺状态
    insuranceLog: _api_root + 'api/insurance/insuranceLog', //GET车险申请记录
    diyformCheck: _api_root + 'api/insurance/diyformCheck', //POST提交车险购买凭证
    diyFields: _api_root + 'api/insurance/diyFields', //副本-获取各类模板数据结构
    loans: _api_root + 'api/insurance/loans' //POST申请贷款资料提交接口
  },
  user: {
    updateIdImage: _api_root + 'api/member/uploadImg', // 上传图片-车聚利  
    deleteImg: _api_root + 'api/member/deleteImg', // 删除图片-车聚利
    upIdentityCard: _api_root + 'api/member/realname' // 实名验证-车聚利
  },
  realName: {
    paymentCost: _api_root + "api/member/paymentCost", //支付接口
    getVerificationStep: _api_root + "api/member/getVerificationStep", //获取实名验证步骤
    getRealnameVerifyToken: _api_root + "api/member/getRealnameVerifyToken", //获取实名提交码
    realname: _api_root + "api/member/realname", //提交实名信息
    bindAccount: _api_root + "api/member/bindAccount", //绑定账号
    usdtSubmit: _api_root + 'api/member/usdtSubmit' //  邮箱实名认证
  },
  news: {},


  service: {
    //cardCheck: _api_root + 'api/insurance/cardCheck', //GET-提交信用卡首刷审核资料 
    cardLog: _api_root + 'api/insurance/cardLog', //GET-获取信用卡申请记录列表 
    cardCheck: _api_root + 'api/insurance/cardCheck', //提交信用卡首刷审核资料
    cardList: _api_root + 'api/insurance/cardList', //信用卡类别
    posLog: _api_root + 'api/insurance/posLog', //获取POS机申请记录列表
    posCheck: _api_root + 'api/insurance/posCheck', //pos机审核资料上传
    uploadImg: _api_root + 'api/insurance/uploadImg', //pos机上传图片
    exchange: _api_root + 'api/merch/exchange', //兑换券列表
    get_exchange: _api_root + 'api/merch/get_exchange', //领取兑换券
    exchange_log: _api_root + 'api/merch/exchange_log', //我的兑换券
    team_level_list: _api_root + 'api/stock/team_level_list', //POST团队等级列表
    exchangelist: _api_root + '/api/merch/sale_exchange_log', //核销记录
    potcode: _api_root + 'api/merch/sale_exchange_code', //生成收券码
    settlement: _api_root + 'api/merch/commision_num', //可结算数据
    settle: _api_root + 'api/merch/commision_settle', //申请结算
    auditcom: _api_root + 'api/merch/commision_list', //佣金审核
    appoinlist: _api_root + 'api/merch/sub_list', //预约列表
    businesscenter: _api_root + 'api/merch/my_merch', //我的兑换券
    workorderList: _api_root + 'api/service/workorderList', //GET工单列表
    submitWorkorder: _api_root + 'api/service/submitWorkorder', //POST 工单提交
    sub_agree: _api_root + '/api/merch/sub_agree', //POST预约处理
    notice: _api_root + 'api/service/notice' //公告
  },
  interests: {},


  green: {},


  pos: {
    poslist: _api_root + 'api/insurance/posList', //POS机列表
    fields: _api_root + 'api/insurance/diyFields?type=3', //获取POS机模板数据结构
    check: _api_root + 'api/insurance/posApplyCheck' //POS机申请
  } };



var auth = function auth(self, url, method, data, _success) {var _this = this;
  var token = uni.getStorageSync('token');
  if (token == '') {
    uni.showToast({
      icon: 'none',
      title: '无效的登录,请重新登录',
      duration: 2000 });

    console.log(this);
    uni.setStorageSync('token', '');
    uni.reLaunch({
      url: '/pages/login/login' });

  }
  var data = _objectSpread({},

  data);

  uni.request({
    url: url,
    method: method,
    data: data,
    header: {
      Authorization: 'Bearer ' + uni.getStorageSync('token') },

    success: function success(res) {
      var res = res.data;
      if (res.code == 1) {
        _success(self, res);

      } else {
        if (res.code == 400) {
          uni.showToast({
            icon: 'none',
            title: '无效的登录,请重新登录--',
            duration: 2000 });

          uni.setStorageSync('token', '');
          setTimeout(function () {
            uni.reLaunch({
              url: '/pages/login/login' });

          }, 2000);
        } else if (res.code == 0) {
          uni.showToast({
            icon: 'none',
            title: res.info,
            duration: 2000 });

        } else if (res.code == 401) {
          uni.showToast({
            icon: 'none',
            title: res.info,
            duration: 2000 });

        } else {
          uni.showToast({
            icon: 'none',
            title: '无效的登录,请重新登录' });

          uni.setStorageSync('token', '');
          setTimeout(function () {
            uni.reLaunch({
              url: '/pages/login/login' });

          }, 2000);
        }
      }
    },
    fail: function fail(res) {
      console.log(res);
      uni.showToast({
        icon: 'none',
        title: '网站消息获取错误',
        duration: 2000 });

      // setTimeout(function() {
      // 	uni.reLaunch({
      // 		url: '/pages/login/null'
      // 	});
      // }, 2000);
    },
    complete: function complete(data) {
      var data = data.data;
      if (data.code == 13) {
        uni.showToast({
          icon: 'none',
          title: data.info,
          duration: 2000 });

        _this.removeToken();
        uni.reLaunch({
          url: '/pages/login/login' });

      }
      uni.hideLoading();
    } });

};

var req = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(parmas) {var result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              new Promise(function (resolve, reject) {
                uni.request({
                  url: parmas.url,
                  data: parmas.data,
                  header: {
                    Authorization: 'Bearer ' + uni.getStorageSync('token') },

                  method: parmas.method,
                  success: function success(res) {return resolve(res);},
                  fail: function fail(res) {return reject(res);} });

              }));case 2:result = _context.sent;return _context.abrupt("return",
            result);case 4:case "end":return _context.stop();}}}, _callee, this);}));return function req(_x) {return _ref.apply(this, arguments);};}();


var loadthepage = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(parmas) {var result, page;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!
            parmas.that.loadshow) {_context2.next = 12;break;}
            parmas.that.loadshow = false;_context2.next = 4;return (
              req(parmas));case 4:result = _context2.sent;
            console.log(result, 'result');if (!
            parmas.direct) {_context2.next = 11;break;}
            page = parmas.that.page + 1;
            if (parmas.that.page < parmas.that.pages) {
              parmas.that.loadshow = true;
              // parmas.that.list = 
              // let list = result.data.data.data;
              parmas.that.listsss = [].concat(_toConsumableArray(parmas.that.listsss), _toConsumableArray(result.data.data.data));
              console.log(parmas.that.listsss, 'parmas');
              parmas.that.page = page;
              parmas.that.pages = result.data.data.last_page;
              if (parmas.that.page == parmas.that.pages || parmas.that.listsss.length == 0) {
                parmas.that.loadshow = false;
              } else {
                parmas.that.loadshow = true;
              }
            } else {
              parmas.that.loadshow = false;

            }_context2.next = 12;break;case 11:return _context2.abrupt("return",

            result);case 12:case "end":return _context2.stop();}}}, _callee2, this);}));return function loadthepage(_x2) {return _ref2.apply(this, arguments);};}();




var downLoad = function downLoad(self, url, data, type, _success) {
  uni.request({
    url: url,
    method: type,
    data: data,
    header: {
      Authorization: 'Bearer ' + uni.getStorageSync('token') },

    success: function success(res) {
      var res = res.data;
      _success(self, res);
    } });

};var _default =
{
  api: api,
  auth: auth,
  setToken: setToken,
  getToken: getToken,
  removeToken: removeToken,
  getUserInfo: getUserInfo,
  setUserInfo: setUserInfo,
  setId: setId,
  getId: getId,
  setLogid: setLogid,
  getLogid: getLogid,
  config: config,
  User_paw: User_paw,
  Memory: Memory,
  _api_root: _api_root,
  req: req,
  loadthepage: loadthepage,
  downLoad: downLoad };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 16 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 17);


/***/ }),
/* 17 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 18);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 18 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/*!********************************************************!*\
  !*** D:/demo/000(车聚利)/000(车聚利)/components/citydata.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "label": "北京",
  "value": "2",
  "childrens": [{
    "label": "北京市",
    "value": "52",
    "childrens": [{
      "label": "东城区",
      "value": "500",
      "childrens": [] },
    {
      "label": "西城区",
      "value": "501",
      "childrens": [] },
    {
      "label": "海淀区",
      "value": "502",
      "childrens": [] },
    {
      "label": "朝阳区",
      "value": "503",
      "childrens": [] },
    {
      "label": "崇文区",
      "value": "504",
      "childrens": [] },
    {
      "label": "宣武区",
      "value": "505",
      "childrens": [] },
    {
      "label": "丰台区",
      "value": "506",
      "childrens": [] },
    {
      "label": "石景山区",
      "value": "507",
      "childrens": [] },
    {
      "label": "房山区",
      "value": "508",
      "childrens": [] },
    {
      "label": "门头沟区",
      "value": "509",
      "childrens": [] },
    {
      "label": "通州区",
      "value": "510",
      "childrens": [] },
    {
      "label": "顺义区",
      "value": "511",
      "childrens": [] },
    {
      "label": "昌平区",
      "value": "512",
      "childrens": [] },
    {
      "label": "怀柔区",
      "value": "513",
      "childrens": [] },
    {
      "label": "平谷区",
      "value": "514",
      "childrens": [] },
    {
      "label": "大兴区",
      "value": "515",
      "childrens": [] },
    {
      "label": "密云县",
      "value": "516",
      "childrens": [] },
    {
      "label": "延庆县",
      "value": "517",
      "childrens": [] }] }] },


{
  "label": "安徽省",
  "value": "3",
  "childrens": [{
    "label": "安庆市",
    "value": "36",
    "childrens": [{
      "label": "迎江区",
      "value": "398",
      "childrens": [] },
    {
      "label": "大观区",
      "value": "399",
      "childrens": [] },
    {
      "label": "宜秀区",
      "value": "400",
      "childrens": [] },
    {
      "label": "桐城市",
      "value": "401",
      "childrens": [] },
    {
      "label": "怀宁县",
      "value": "402",
      "childrens": [] },
    {
      "label": "枞阳县",
      "value": "403",
      "childrens": [] },
    {
      "label": "潜山县",
      "value": "404",
      "childrens": [] },
    {
      "label": "太湖县",
      "value": "405",
      "childrens": [] },
    {
      "label": "宿松县",
      "value": "406",
      "childrens": [] },
    {
      "label": "望江县",
      "value": "407",
      "childrens": [] },
    {
      "label": "岳西县",
      "value": "408",
      "childrens": [] }] },

  {
    "label": "蚌埠市",
    "value": "37",
    "childrens": [{
      "label": "中市区",
      "value": "409",
      "childrens": [] },
    {
      "label": "东市区",
      "value": "410",
      "childrens": [] },
    {
      "label": "西市区",
      "value": "411",
      "childrens": [] },
    {
      "label": "郊区",
      "value": "412",
      "childrens": [] },
    {
      "label": "怀远县",
      "value": "413",
      "childrens": [] },
    {
      "label": "五河县",
      "value": "414",
      "childrens": [] },
    {
      "label": "固镇县",
      "value": "415",
      "childrens": [] }] },

  {
    "label": "巢湖市",
    "value": "38",
    "childrens": [{
      "label": "居巢区",
      "value": "416",
      "childrens": [] },
    {
      "label": "庐江县",
      "value": "417",
      "childrens": [] },
    {
      "label": "无为县",
      "value": "418",
      "childrens": [] },
    {
      "label": "含山县",
      "value": "419",
      "childrens": [] },
    {
      "label": "和县",
      "value": "420",
      "childrens": [] }] },

  {
    "label": "池州市",
    "value": "39",
    "childrens": [{
      "label": "贵池区",
      "value": "421",
      "childrens": [] },
    {
      "label": "东至县",
      "value": "422",
      "childrens": [] },
    {
      "label": "石台县",
      "value": "423",
      "childrens": [] },
    {
      "label": "青阳县",
      "value": "424",
      "childrens": [] }] },

  {
    "label": "滁州市",
    "value": "40",
    "childrens": [{
      "label": "琅琊区",
      "value": "425",
      "childrens": [] },
    {
      "label": "南谯区",
      "value": "426",
      "childrens": [] },
    {
      "label": "天长市",
      "value": "427",
      "childrens": [] },
    {
      "label": "明光市",
      "value": "428",
      "childrens": [] },
    {
      "label": "来安县",
      "value": "429",
      "childrens": [] },
    {
      "label": "全椒县",
      "value": "430",
      "childrens": [] },
    {
      "label": "定远县",
      "value": "431",
      "childrens": [] },
    {
      "label": "凤阳县",
      "value": "432",
      "childrens": [] }] },

  {
    "label": "阜阳市",
    "value": "41",
    "childrens": [{
      "label": "蚌山区",
      "value": "433",
      "childrens": [] },
    {
      "label": "龙子湖区",
      "value": "434",
      "childrens": [] },
    {
      "label": "禹会区",
      "value": "435",
      "childrens": [] },
    {
      "label": "淮上区",
      "value": "436",
      "childrens": [] },
    {
      "label": "颍州区",
      "value": "437",
      "childrens": [] },
    {
      "label": "颍东区",
      "value": "438",
      "childrens": [] },
    {
      "label": "颍泉区",
      "value": "439",
      "childrens": [] },
    {
      "label": "界首市",
      "value": "440",
      "childrens": [] },
    {
      "label": "临泉县",
      "value": "441",
      "childrens": [] },
    {
      "label": "太和县",
      "value": "442",
      "childrens": [] },
    {
      "label": "阜南县",
      "value": "443",
      "childrens": [] },
    {
      "label": "颖上县",
      "value": "444",
      "childrens": [] }] },

  {
    "label": "淮北市",
    "value": "42",
    "childrens": [{
      "label": "相山区",
      "value": "445",
      "childrens": [] },
    {
      "label": "杜集区",
      "value": "446",
      "childrens": [] },
    {
      "label": "烈山区",
      "value": "447",
      "childrens": [] },
    {
      "label": "濉溪县",
      "value": "448",
      "childrens": [] }] },

  {
    "label": "淮南市",
    "value": "43",
    "childrens": [{
      "label": "田家庵区",
      "value": "449",
      "childrens": [] },
    {
      "label": "大通区",
      "value": "450",
      "childrens": [] },
    {
      "label": "谢家集区",
      "value": "451",
      "childrens": [] },
    {
      "label": "八公山区",
      "value": "452",
      "childrens": [] },
    {
      "label": "潘集区",
      "value": "453",
      "childrens": [] },
    {
      "label": "凤台县",
      "value": "454",
      "childrens": [] }] },

  {
    "label": "黄山市",
    "value": "44",
    "childrens": [{
      "label": "屯溪区",
      "value": "455",
      "childrens": [] },
    {
      "label": "黄山区",
      "value": "456",
      "childrens": [] },
    {
      "label": "徽州区",
      "value": "457",
      "childrens": [] },
    {
      "label": "歙县",
      "value": "458",
      "childrens": [] },
    {
      "label": "休宁县",
      "value": "459",
      "childrens": [] },
    {
      "label": "黟县",
      "value": "460",
      "childrens": [] },
    {
      "label": "祁门县",
      "value": "461",
      "childrens": [] }] },

  {
    "label": "六安市",
    "value": "45",
    "childrens": [{
      "label": "金安区",
      "value": "462",
      "childrens": [] },
    {
      "label": "裕安区",
      "value": "463",
      "childrens": [] },
    {
      "label": "寿县",
      "value": "464",
      "childrens": [] },
    {
      "label": "霍邱县",
      "value": "465",
      "childrens": [] },
    {
      "label": "舒城县",
      "value": "466",
      "childrens": [] },
    {
      "label": "金寨县",
      "value": "467",
      "childrens": [] },
    {
      "label": "霍山县",
      "value": "468",
      "childrens": [] }] },

  {
    "label": "马鞍山市",
    "value": "46",
    "childrens": [{
      "label": "雨山区",
      "value": "469",
      "childrens": [] },
    {
      "label": "花山区",
      "value": "470",
      "childrens": [] },
    {
      "label": "金家庄区",
      "value": "471",
      "childrens": [] },
    {
      "label": "当涂县",
      "value": "472",
      "childrens": [] }] },

  {
    "label": "宿州市",
    "value": "47",
    "childrens": [{
      "label": "埇桥区",
      "value": "473",
      "childrens": [] },
    {
      "label": "砀山县",
      "value": "474",
      "childrens": [] },
    {
      "label": "萧县",
      "value": "475",
      "childrens": [] },
    {
      "label": "灵璧县",
      "value": "476",
      "childrens": [] },
    {
      "label": "泗县",
      "value": "477",
      "childrens": [] }] },

  {
    "label": "铜陵市",
    "value": "48",
    "childrens": [{
      "label": "铜官山区",
      "value": "478",
      "childrens": [] },
    {
      "label": "狮子山区",
      "value": "479",
      "childrens": [] },
    {
      "label": "郊区",
      "value": "480",
      "childrens": [] },
    {
      "label": "铜陵县",
      "value": "481",
      "childrens": [] }] },

  {
    "label": "芜湖市",
    "value": "49",
    "childrens": [{
      "label": "镜湖区",
      "value": "482",
      "childrens": [] },
    {
      "label": "弋江区",
      "value": "483",
      "childrens": [] },
    {
      "label": "鸠江区",
      "value": "484",
      "childrens": [] },
    {
      "label": "三山区",
      "value": "485",
      "childrens": [] },
    {
      "label": "芜湖县",
      "value": "486",
      "childrens": [] },
    {
      "label": "繁昌县",
      "value": "487",
      "childrens": [] },
    {
      "label": "南陵县",
      "value": "488",
      "childrens": [] }] },

  {
    "label": "宣城市",
    "value": "50",
    "childrens": [{
      "label": "宣州区",
      "value": "489",
      "childrens": [] },
    {
      "label": "宁国市",
      "value": "490",
      "childrens": [] },
    {
      "label": "郎溪县",
      "value": "491",
      "childrens": [] },
    {
      "label": "广德县",
      "value": "492",
      "childrens": [] },
    {
      "label": "泾县",
      "value": "493",
      "childrens": [] },
    {
      "label": "绩溪县",
      "value": "494",
      "childrens": [] },
    {
      "label": "旌德县",
      "value": "495",
      "childrens": [] }] },

  {
    "label": "亳州市",
    "value": "51",
    "childrens": [{
      "label": "涡阳县",
      "value": "496",
      "childrens": [] },
    {
      "label": "蒙城县",
      "value": "497",
      "childrens": [] },
    {
      "label": "利辛县",
      "value": "498",
      "childrens": [] },
    {
      "label": "谯城区",
      "value": "499",
      "childrens": [] }] },

  {
    "label": "合肥市",
    "value": "3401",
    "childrens": [{
      "label": "庐阳区",
      "value": "3402",
      "childrens": [] },
    {
      "label": "瑶海区",
      "value": "3403",
      "childrens": [] },
    {
      "label": "蜀山区",
      "value": "3404",
      "childrens": [] },
    {
      "label": "包河区",
      "value": "3405",
      "childrens": [] },
    {
      "label": "长丰县",
      "value": "3406",
      "childrens": [] },
    {
      "label": "肥东县",
      "value": "3407",
      "childrens": [] },
    {
      "label": "肥西县",
      "value": "3408",
      "childrens": [] }] }] },


{
  "label": "福建省",
  "value": "4",
  "childrens": [{
    "label": "福州市",
    "value": "53",
    "childrens": [{
      "label": "鼓楼区",
      "value": "518",
      "childrens": [] },
    {
      "label": "台江区",
      "value": "519",
      "childrens": [] },
    {
      "label": "仓山区",
      "value": "520",
      "childrens": [] },
    {
      "label": "马尾区",
      "value": "521",
      "childrens": [] },
    {
      "label": "晋安区",
      "value": "522",
      "childrens": [] },
    {
      "label": "福清市",
      "value": "523",
      "childrens": [] },
    {
      "label": "长乐市",
      "value": "524",
      "childrens": [] },
    {
      "label": "闽侯县",
      "value": "525",
      "childrens": [] },
    {
      "label": "连江县",
      "value": "526",
      "childrens": [] },
    {
      "label": "罗源县",
      "value": "527",
      "childrens": [] },
    {
      "label": "闽清县",
      "value": "528",
      "childrens": [] },
    {
      "label": "永泰县",
      "value": "529",
      "childrens": [] },
    {
      "label": "平潭县",
      "value": "530",
      "childrens": [] }] },

  {
    "label": "龙岩市",
    "value": "54",
    "childrens": [{
      "label": "新罗区",
      "value": "531",
      "childrens": [] },
    {
      "label": "漳平市",
      "value": "532",
      "childrens": [] },
    {
      "label": "长汀县",
      "value": "533",
      "childrens": [] },
    {
      "label": "永定县",
      "value": "534",
      "childrens": [] },
    {
      "label": "上杭县",
      "value": "535",
      "childrens": [] },
    {
      "label": "武平县",
      "value": "536",
      "childrens": [] },
    {
      "label": "连城县",
      "value": "537",
      "childrens": [] }] },

  {
    "label": "南平市",
    "value": "55",
    "childrens": [{
      "label": "延平区",
      "value": "538",
      "childrens": [] },
    {
      "label": "邵武市",
      "value": "539",
      "childrens": [] },
    {
      "label": "武夷山市",
      "value": "540",
      "childrens": [] },
    {
      "label": "建瓯市",
      "value": "541",
      "childrens": [] },
    {
      "label": "建阳市",
      "value": "542",
      "childrens": [] },
    {
      "label": "顺昌县",
      "value": "543",
      "childrens": [] },
    {
      "label": "浦城县",
      "value": "544",
      "childrens": [] },
    {
      "label": "光泽县",
      "value": "545",
      "childrens": [] },
    {
      "label": "松溪县",
      "value": "546",
      "childrens": [] },
    {
      "label": "政和县",
      "value": "547",
      "childrens": [] }] },

  {
    "label": "宁德市",
    "value": "56",
    "childrens": [{
      "label": "蕉城区",
      "value": "548",
      "childrens": [] },
    {
      "label": "福安市",
      "value": "549",
      "childrens": [] },
    {
      "label": "福鼎市",
      "value": "550",
      "childrens": [] },
    {
      "label": "霞浦县",
      "value": "551",
      "childrens": [] },
    {
      "label": "古田县",
      "value": "552",
      "childrens": [] },
    {
      "label": "屏南县",
      "value": "553",
      "childrens": [] },
    {
      "label": "寿宁县",
      "value": "554",
      "childrens": [] },
    {
      "label": "周宁县",
      "value": "555",
      "childrens": [] },
    {
      "label": "柘荣县",
      "value": "556",
      "childrens": [] }] },

  {
    "label": "莆田市",
    "value": "57",
    "childrens": [{
      "label": "城厢区",
      "value": "557",
      "childrens": [] },
    {
      "label": "涵江区",
      "value": "558",
      "childrens": [] },
    {
      "label": "荔城区",
      "value": "559",
      "childrens": [] },
    {
      "label": "秀屿区",
      "value": "560",
      "childrens": [] },
    {
      "label": "仙游县",
      "value": "561",
      "childrens": [] }] },

  {
    "label": "泉州市",
    "value": "58",
    "childrens": [{
      "label": "鲤城区",
      "value": "562",
      "childrens": [] },
    {
      "label": "丰泽区",
      "value": "563",
      "childrens": [] },
    {
      "label": "洛江区",
      "value": "564",
      "childrens": [] },
    {
      "label": "清濛开发区",
      "value": "565",
      "childrens": [] },
    {
      "label": "泉港区",
      "value": "566",
      "childrens": [] },
    {
      "label": "石狮市",
      "value": "567",
      "childrens": [] },
    {
      "label": "晋江市",
      "value": "568",
      "childrens": [] },
    {
      "label": "南安市",
      "value": "569",
      "childrens": [] },
    {
      "label": "惠安县",
      "value": "570",
      "childrens": [] },
    {
      "label": "安溪县",
      "value": "571",
      "childrens": [] },
    {
      "label": "永春县",
      "value": "572",
      "childrens": [] },
    {
      "label": "德化县",
      "value": "573",
      "childrens": [] },
    {
      "label": "金门县",
      "value": "574",
      "childrens": [] }] },

  {
    "label": "三明市",
    "value": "59",
    "childrens": [{
      "label": "梅列区",
      "value": "575",
      "childrens": [] },
    {
      "label": "三元区",
      "value": "576",
      "childrens": [] },
    {
      "label": "永安市",
      "value": "577",
      "childrens": [] },
    {
      "label": "明溪县",
      "value": "578",
      "childrens": [] },
    {
      "label": "清流县",
      "value": "579",
      "childrens": [] },
    {
      "label": "宁化县",
      "value": "580",
      "childrens": [] },
    {
      "label": "大田县",
      "value": "581",
      "childrens": [] },
    {
      "label": "尤溪县",
      "value": "582",
      "childrens": [] },
    {
      "label": "沙县",
      "value": "583",
      "childrens": [] },
    {
      "label": "将乐县",
      "value": "584",
      "childrens": [] },
    {
      "label": "泰宁县",
      "value": "585",
      "childrens": [] },
    {
      "label": "建宁县",
      "value": "586",
      "childrens": [] }] },

  {
    "label": "厦门市",
    "value": "60",
    "childrens": [{
      "label": "思明区",
      "value": "587",
      "childrens": [] },
    {
      "label": "海沧区",
      "value": "588",
      "childrens": [] },
    {
      "label": "湖里区",
      "value": "589",
      "childrens": [] },
    {
      "label": "集美区",
      "value": "590",
      "childrens": [] },
    {
      "label": "同安区",
      "value": "591",
      "childrens": [] },
    {
      "label": "翔安区",
      "value": "592",
      "childrens": [] }] },

  {
    "label": "漳州市",
    "value": "61",
    "childrens": [{
      "label": "芗城区",
      "value": "593",
      "childrens": [] },
    {
      "label": "龙文区",
      "value": "594",
      "childrens": [] },
    {
      "label": "龙海市",
      "value": "595",
      "childrens": [] },
    {
      "label": "云霄县",
      "value": "596",
      "childrens": [] },
    {
      "label": "漳浦县",
      "value": "597",
      "childrens": [] },
    {
      "label": "诏安县",
      "value": "598",
      "childrens": [] },
    {
      "label": "长泰县",
      "value": "599",
      "childrens": [] },
    {
      "label": "东山县",
      "value": "600",
      "childrens": [] },
    {
      "label": "南靖县",
      "value": "601",
      "childrens": [] },
    {
      "label": "平和县",
      "value": "602",
      "childrens": [] },
    {
      "label": "华安县",
      "value": "603",
      "childrens": [] }] }] },


{
  "label": "甘肃省",
  "value": "5",
  "childrens": [{
    "label": "兰州市",
    "value": "62",
    "childrens": [{
      "label": "皋兰县",
      "value": "604",
      "childrens": [] },
    {
      "label": "城关区",
      "value": "605",
      "childrens": [] },
    {
      "label": "七里河区",
      "value": "606",
      "childrens": [] },
    {
      "label": "西固区",
      "value": "607",
      "childrens": [] },
    {
      "label": "安宁区",
      "value": "608",
      "childrens": [] },
    {
      "label": "红古区",
      "value": "609",
      "childrens": [] },
    {
      "label": "永登县",
      "value": "610",
      "childrens": [] },
    {
      "label": "榆中县",
      "value": "611",
      "childrens": [] }] },

  {
    "label": "白银市",
    "value": "63",
    "childrens": [{
      "label": "白银区",
      "value": "612",
      "childrens": [] },
    {
      "label": "平川区",
      "value": "613",
      "childrens": [] },
    {
      "label": "会宁县",
      "value": "614",
      "childrens": [] },
    {
      "label": "景泰县",
      "value": "615",
      "childrens": [] },
    {
      "label": "靖远县",
      "value": "616",
      "childrens": [] }] },

  {
    "label": "定西市",
    "value": "64",
    "childrens": [{
      "label": "临洮县",
      "value": "617",
      "childrens": [] },
    {
      "label": "陇西县",
      "value": "618",
      "childrens": [] },
    {
      "label": "通渭县",
      "value": "619",
      "childrens": [] },
    {
      "label": "渭源县",
      "value": "620",
      "childrens": [] },
    {
      "label": "漳县",
      "value": "621",
      "childrens": [] },
    {
      "label": "岷县",
      "value": "622",
      "childrens": [] },
    {
      "label": "安定区",
      "value": "623",
      "childrens": [] },
    {
      "label": "安定区",
      "value": "624",
      "childrens": [] }] },

  {
    "label": "甘南市",
    "value": "65",
    "childrens": [{
      "label": "合作市",
      "value": "625",
      "childrens": [] },
    {
      "label": "临潭县",
      "value": "626",
      "childrens": [] },
    {
      "label": "卓尼县",
      "value": "627",
      "childrens": [] },
    {
      "label": "舟曲县",
      "value": "628",
      "childrens": [] },
    {
      "label": "迭部县",
      "value": "629",
      "childrens": [] },
    {
      "label": "玛曲县",
      "value": "630",
      "childrens": [] },
    {
      "label": "碌曲县",
      "value": "631",
      "childrens": [] },
    {
      "label": "夏河县",
      "value": "632",
      "childrens": [] }] },

  {
    "label": "嘉峪关市",
    "value": "66",
    "childrens": [{
      "label": "嘉峪关市",
      "value": "633",
      "childrens": [] }] },

  {
    "label": "金昌市",
    "value": "67",
    "childrens": [{
      "label": "金川区",
      "value": "634",
      "childrens": [] },
    {
      "label": "永昌县",
      "value": "635",
      "childrens": [] }] },

  {
    "label": "酒泉市",
    "value": "68",
    "childrens": [{
      "label": "肃州区",
      "value": "636",
      "childrens": [] },
    {
      "label": "玉门市",
      "value": "637",
      "childrens": [] },
    {
      "label": "敦煌市",
      "value": "638",
      "childrens": [] },
    {
      "label": "金塔县",
      "value": "639",
      "childrens": [] },
    {
      "label": "瓜州县",
      "value": "640",
      "childrens": [] },
    {
      "label": "肃北",
      "value": "641",
      "childrens": [] },
    {
      "label": "阿克塞",
      "value": "642",
      "childrens": [] }] },

  {
    "label": "临夏市",
    "value": "69",
    "childrens": [{
      "label": "临夏市",
      "value": "643",
      "childrens": [] },
    {
      "label": "临夏县",
      "value": "644",
      "childrens": [] },
    {
      "label": "康乐县",
      "value": "645",
      "childrens": [] },
    {
      "label": "永靖县",
      "value": "646",
      "childrens": [] },
    {
      "label": "广河县",
      "value": "647",
      "childrens": [] },
    {
      "label": "和政县",
      "value": "648",
      "childrens": [] },
    {
      "label": "东乡族自治县",
      "value": "649",
      "childrens": [] },
    {
      "label": "积石山",
      "value": "650",
      "childrens": [] }] },

  {
    "label": "陇南市",
    "value": "70",
    "childrens": [{
      "label": "成县",
      "value": "651",
      "childrens": [] },
    {
      "label": "徽县",
      "value": "652",
      "childrens": [] },
    {
      "label": "康县",
      "value": "653",
      "childrens": [] },
    {
      "label": "礼县",
      "value": "654",
      "childrens": [] },
    {
      "label": "两当县",
      "value": "655",
      "childrens": [] },
    {
      "label": "文县",
      "value": "656",
      "childrens": [] },
    {
      "label": "西和县",
      "value": "657",
      "childrens": [] },
    {
      "label": "宕昌县",
      "value": "658",
      "childrens": [] },
    {
      "label": "武都区",
      "value": "659",
      "childrens": [] }] },

  {
    "label": "平凉市",
    "value": "71",
    "childrens": [{
      "label": "崇信县",
      "value": "660",
      "childrens": [] },
    {
      "label": "华亭县",
      "value": "661",
      "childrens": [] },
    {
      "label": "静宁县",
      "value": "662",
      "childrens": [] },
    {
      "label": "灵台县",
      "value": "663",
      "childrens": [] },
    {
      "label": "崆峒区",
      "value": "664",
      "childrens": [] },
    {
      "label": "庄浪县",
      "value": "665",
      "childrens": [] },
    {
      "label": "泾川县",
      "value": "666",
      "childrens": [] }] },

  {
    "label": "庆阳市",
    "value": "72",
    "childrens": [{
      "label": "合水县",
      "value": "667",
      "childrens": [] },
    {
      "label": "华池县",
      "value": "668",
      "childrens": [] },
    {
      "label": "环县",
      "value": "669",
      "childrens": [] },
    {
      "label": "宁县",
      "value": "670",
      "childrens": [] },
    {
      "label": "庆城县",
      "value": "671",
      "childrens": [] },
    {
      "label": "西峰区",
      "value": "672",
      "childrens": [] },
    {
      "label": "镇原县",
      "value": "673",
      "childrens": [] },
    {
      "label": "正宁县",
      "value": "674",
      "childrens": [] }] },

  {
    "label": "天水市",
    "value": "73",
    "childrens": [{
      "label": "甘谷县",
      "value": "675",
      "childrens": [] },
    {
      "label": "秦安县",
      "value": "676",
      "childrens": [] },
    {
      "label": "清水县",
      "value": "677",
      "childrens": [] },
    {
      "label": "秦州区",
      "value": "678",
      "childrens": [] },
    {
      "label": "麦积区",
      "value": "679",
      "childrens": [] },
    {
      "label": "武山县",
      "value": "680",
      "childrens": [] },
    {
      "label": "张家川",
      "value": "681",
      "childrens": [] }] },

  {
    "label": "武威市",
    "value": "74",
    "childrens": [{
      "label": "古浪县",
      "value": "682",
      "childrens": [] },
    {
      "label": "民勤县",
      "value": "683",
      "childrens": [] },
    {
      "label": "天祝",
      "value": "684",
      "childrens": [] },
    {
      "label": "凉州区",
      "value": "685",
      "childrens": [] }] },

  {
    "label": "张掖市",
    "value": "75",
    "childrens": [{
      "label": "高台县",
      "value": "686",
      "childrens": [] },
    {
      "label": "临泽县",
      "value": "687",
      "childrens": [] },
    {
      "label": "民乐县",
      "value": "688",
      "childrens": [] },
    {
      "label": "山丹县",
      "value": "689",
      "childrens": [] },
    {
      "label": "肃南",
      "value": "690",
      "childrens": [] },
    {
      "label": "甘州区",
      "value": "691",
      "childrens": [] }] }] },


{
  "label": "广东省",
  "value": "6",
  "childrens": [{
    "label": "广州市",
    "value": "76",
    "childrens": [{
      "label": "从化市",
      "value": "692",
      "childrens": [] },
    {
      "label": "天河区",
      "value": "693",
      "childrens": [] },
    {
      "label": "东山区",
      "value": "694",
      "childrens": [] },
    {
      "label": "白云区",
      "value": "695",
      "childrens": [] },
    {
      "label": "海珠区",
      "value": "696",
      "childrens": [] },
    {
      "label": "荔湾区",
      "value": "697",
      "childrens": [] },
    {
      "label": "越秀区",
      "value": "698",
      "childrens": [] },
    {
      "label": "黄埔区",
      "value": "699",
      "childrens": [] },
    {
      "label": "番禺区",
      "value": "700",
      "childrens": [] },
    {
      "label": "花都区",
      "value": "701",
      "childrens": [] },
    {
      "label": "增城区",
      "value": "702",
      "childrens": [] },
    {
      "label": "从化区",
      "value": "703",
      "childrens": [] },
    {
      "label": "市郊",
      "value": "704",
      "childrens": [] }] },

  {
    "label": "深圳市",
    "value": "77",
    "childrens": [{
      "label": "福田区",
      "value": "705",
      "childrens": [] },
    {
      "label": "罗湖区",
      "value": "706",
      "childrens": [] },
    {
      "label": "南山区",
      "value": "707",
      "childrens": [] },
    {
      "label": "宝安区",
      "value": "708",
      "childrens": [] },
    {
      "label": "龙岗区",
      "value": "709",
      "childrens": [] },
    {
      "label": "盐田区",
      "value": "710",
      "childrens": [] }] },

  {
    "label": "潮州市",
    "value": "78",
    "childrens": [{
      "label": "湘桥区",
      "value": "711",
      "childrens": [] },
    {
      "label": "潮安县",
      "value": "712",
      "childrens": [] },
    {
      "label": "饶平县",
      "value": "713",
      "childrens": [] }] },

  {
    "label": "东莞市",
    "value": "79",
    "childrens": [{
      "label": "南城区",
      "value": "714",
      "childrens": [] },
    {
      "label": "东城区",
      "value": "715",
      "childrens": [] },
    {
      "label": "万江区",
      "value": "716",
      "childrens": [] },
    {
      "label": "莞城区",
      "value": "717",
      "childrens": [] },
    {
      "label": "石龙镇",
      "value": "718",
      "childrens": [] },
    {
      "label": "虎门镇",
      "value": "719",
      "childrens": [] },
    {
      "label": "麻涌镇",
      "value": "720",
      "childrens": [] },
    {
      "label": "道滘镇",
      "value": "721",
      "childrens": [] },
    {
      "label": "石碣镇",
      "value": "722",
      "childrens": [] },
    {
      "label": "沙田镇",
      "value": "723",
      "childrens": [] },
    {
      "label": "望牛墩镇",
      "value": "724",
      "childrens": [] },
    {
      "label": "洪梅镇",
      "value": "725",
      "childrens": [] },
    {
      "label": "茶山镇",
      "value": "726",
      "childrens": [] },
    {
      "label": "寮步镇",
      "value": "727",
      "childrens": [] },
    {
      "label": "大岭山镇",
      "value": "728",
      "childrens": [] },
    {
      "label": "大朗镇",
      "value": "729",
      "childrens": [] },
    {
      "label": "黄江镇",
      "value": "730",
      "childrens": [] },
    {
      "label": "樟木头",
      "value": "731",
      "childrens": [] },
    {
      "label": "凤岗镇",
      "value": "732",
      "childrens": [] },
    {
      "label": "塘厦镇",
      "value": "733",
      "childrens": [] },
    {
      "label": "谢岗镇",
      "value": "734",
      "childrens": [] },
    {
      "label": "厚街镇",
      "value": "735",
      "childrens": [] },
    {
      "label": "清溪镇",
      "value": "736",
      "childrens": [] },
    {
      "label": "常平镇",
      "value": "737",
      "childrens": [] },
    {
      "label": "桥头镇",
      "value": "738",
      "childrens": [] },
    {
      "label": "横沥镇",
      "value": "739",
      "childrens": [] },
    {
      "label": "东坑镇",
      "value": "740",
      "childrens": [] },
    {
      "label": "企石镇",
      "value": "741",
      "childrens": [] },
    {
      "label": "石排镇",
      "value": "742",
      "childrens": [] },
    {
      "label": "长安镇",
      "value": "743",
      "childrens": [] },
    {
      "label": "中堂镇",
      "value": "744",
      "childrens": [] },
    {
      "label": "高埗镇",
      "value": "745",
      "childrens": [] }] },

  {
    "label": "佛山市",
    "value": "80",
    "childrens": [{
      "label": "禅城区",
      "value": "746",
      "childrens": [] },
    {
      "label": "南海区",
      "value": "747",
      "childrens": [] },
    {
      "label": "顺德区",
      "value": "748",
      "childrens": [] },
    {
      "label": "三水区",
      "value": "749",
      "childrens": [] },
    {
      "label": "高明区",
      "value": "750",
      "childrens": [] }] },

  {
    "label": "河源市",
    "value": "81",
    "childrens": [{
      "label": "东源县",
      "value": "751",
      "childrens": [] },
    {
      "label": "和平县",
      "value": "752",
      "childrens": [] },
    {
      "label": "源城区",
      "value": "753",
      "childrens": [] },
    {
      "label": "连平县",
      "value": "754",
      "childrens": [] },
    {
      "label": "龙川县",
      "value": "755",
      "childrens": [] },
    {
      "label": "紫金县",
      "value": "756",
      "childrens": [] }] },

  {
    "label": "惠州市",
    "value": "82",
    "childrens": [{
      "label": "惠阳区",
      "value": "757",
      "childrens": [] },
    {
      "label": "惠城区",
      "value": "758",
      "childrens": [] },
    {
      "label": "大亚湾",
      "value": "759",
      "childrens": [] },
    {
      "label": "博罗县",
      "value": "760",
      "childrens": [] },
    {
      "label": "惠东县",
      "value": "761",
      "childrens": [] },
    {
      "label": "龙门县",
      "value": "762",
      "childrens": [] }] },

  {
    "label": "江门市",
    "value": "83",
    "childrens": [{
      "label": "江海区",
      "value": "763",
      "childrens": [] },
    {
      "label": "蓬江区",
      "value": "764",
      "childrens": [] },
    {
      "label": "新会区",
      "value": "765",
      "childrens": [] },
    {
      "label": "台山市",
      "value": "766",
      "childrens": [] },
    {
      "label": "开平市",
      "value": "767",
      "childrens": [] },
    {
      "label": "鹤山市",
      "value": "768",
      "childrens": [] },
    {
      "label": "恩平市",
      "value": "769",
      "childrens": [] }] },

  {
    "label": "揭阳市",
    "value": "84",
    "childrens": [{
      "label": "榕城区",
      "value": "770",
      "childrens": [] },
    {
      "label": "普宁市",
      "value": "771",
      "childrens": [] },
    {
      "label": "揭东县",
      "value": "772",
      "childrens": [] },
    {
      "label": "揭西县",
      "value": "773",
      "childrens": [] },
    {
      "label": "惠来县",
      "value": "774",
      "childrens": [] }] },

  {
    "label": "茂名市",
    "value": "85",
    "childrens": [{
      "label": "茂南区",
      "value": "775",
      "childrens": [] },
    {
      "label": "茂港区",
      "value": "776",
      "childrens": [] },
    {
      "label": "高州市",
      "value": "777",
      "childrens": [] },
    {
      "label": "化州市",
      "value": "778",
      "childrens": [] },
    {
      "label": "信宜市",
      "value": "779",
      "childrens": [] },
    {
      "label": "电白县",
      "value": "780",
      "childrens": [] }] },

  {
    "label": "梅州市",
    "value": "86",
    "childrens": [{
      "label": "梅县",
      "value": "781",
      "childrens": [] },
    {
      "label": "梅江区",
      "value": "782",
      "childrens": [] },
    {
      "label": "兴宁市",
      "value": "783",
      "childrens": [] },
    {
      "label": "大埔县",
      "value": "784",
      "childrens": [] },
    {
      "label": "丰顺县",
      "value": "785",
      "childrens": [] },
    {
      "label": "五华县",
      "value": "786",
      "childrens": [] },
    {
      "label": "平远县",
      "value": "787",
      "childrens": [] },
    {
      "label": "蕉岭县",
      "value": "788",
      "childrens": [] }] },

  {
    "label": "清远市",
    "value": "87",
    "childrens": [{
      "label": "清城区",
      "value": "789",
      "childrens": [] },
    {
      "label": "英德市",
      "value": "790",
      "childrens": [] },
    {
      "label": "连州市",
      "value": "791",
      "childrens": [] },
    {
      "label": "佛冈县",
      "value": "792",
      "childrens": [] },
    {
      "label": "阳山县",
      "value": "793",
      "childrens": [] },
    {
      "label": "清新县",
      "value": "794",
      "childrens": [] },
    {
      "label": "连山",
      "value": "795",
      "childrens": [] },
    {
      "label": "连南",
      "value": "796",
      "childrens": [] }] },

  {
    "label": "汕头市",
    "value": "88",
    "childrens": [{
      "label": "南澳县",
      "value": "797",
      "childrens": [] },
    {
      "label": "潮阳区",
      "value": "798",
      "childrens": [] },
    {
      "label": "澄海区",
      "value": "799",
      "childrens": [] },
    {
      "label": "龙湖区",
      "value": "800",
      "childrens": [] },
    {
      "label": "金平区",
      "value": "801",
      "childrens": [] },
    {
      "label": "濠江区",
      "value": "802",
      "childrens": [] },
    {
      "label": "潮南区",
      "value": "803",
      "childrens": [] }] },

  {
    "label": "汕尾市",
    "value": "89",
    "childrens": [{
      "label": "城区",
      "value": "804",
      "childrens": [] },
    {
      "label": "陆丰市",
      "value": "805",
      "childrens": [] },
    {
      "label": "海丰县",
      "value": "806",
      "childrens": [] },
    {
      "label": "陆河县",
      "value": "807",
      "childrens": [] }] },

  {
    "label": "韶关市",
    "value": "90",
    "childrens": [{
      "label": "曲江县",
      "value": "808",
      "childrens": [] },
    {
      "label": "浈江区",
      "value": "809",
      "childrens": [] },
    {
      "label": "武江区",
      "value": "810",
      "childrens": [] },
    {
      "label": "曲江区",
      "value": "811",
      "childrens": [] },
    {
      "label": "乐昌市",
      "value": "812",
      "childrens": [] },
    {
      "label": "南雄市",
      "value": "813",
      "childrens": [] },
    {
      "label": "始兴县",
      "value": "814",
      "childrens": [] },
    {
      "label": "仁化县",
      "value": "815",
      "childrens": [] },
    {
      "label": "翁源县",
      "value": "816",
      "childrens": [] },
    {
      "label": "新丰县",
      "value": "817",
      "childrens": [] },
    {
      "label": "乳源",
      "value": "818",
      "childrens": [] }] },

  {
    "label": "阳江市",
    "value": "91",
    "childrens": [{
      "label": "江城区",
      "value": "819",
      "childrens": [] },
    {
      "label": "阳春市",
      "value": "820",
      "childrens": [] },
    {
      "label": "阳西县",
      "value": "821",
      "childrens": [] },
    {
      "label": "阳东县",
      "value": "822",
      "childrens": [] }] },

  {
    "label": "云浮市",
    "value": "92",
    "childrens": [{
      "label": "云城区",
      "value": "823",
      "childrens": [] },
    {
      "label": "罗定市",
      "value": "824",
      "childrens": [] },
    {
      "label": "新兴县",
      "value": "825",
      "childrens": [] },
    {
      "label": "郁南县",
      "value": "826",
      "childrens": [] },
    {
      "label": "云安县",
      "value": "827",
      "childrens": [] }] },

  {
    "label": "湛江市",
    "value": "93",
    "childrens": [{
      "label": "赤坎区",
      "value": "828",
      "childrens": [] },
    {
      "label": "霞山区",
      "value": "829",
      "childrens": [] },
    {
      "label": "坡头区",
      "value": "830",
      "childrens": [] },
    {
      "label": "麻章区",
      "value": "831",
      "childrens": [] },
    {
      "label": "廉江市",
      "value": "832",
      "childrens": [] },
    {
      "label": "雷州市",
      "value": "833",
      "childrens": [] },
    {
      "label": "吴川市",
      "value": "834",
      "childrens": [] },
    {
      "label": "遂溪县",
      "value": "835",
      "childrens": [] },
    {
      "label": "徐闻县",
      "value": "836",
      "childrens": [] }] },

  {
    "label": "肇庆市",
    "value": "94",
    "childrens": [{
      "label": "肇庆市",
      "value": "837",
      "childrens": [] },
    {
      "label": "高要市",
      "value": "838",
      "childrens": [] },
    {
      "label": "四会市",
      "value": "839",
      "childrens": [] },
    {
      "label": "广宁县",
      "value": "840",
      "childrens": [] },
    {
      "label": "怀集县",
      "value": "841",
      "childrens": [] },
    {
      "label": "封开县",
      "value": "842",
      "childrens": [] },
    {
      "label": "德庆县",
      "value": "843",
      "childrens": [] }] },

  {
    "label": "中山市",
    "value": "95",
    "childrens": [{
      "label": "石岐街道",
      "value": "844",
      "childrens": [] },
    {
      "label": "东区街道",
      "value": "845",
      "childrens": [] },
    {
      "label": "西区街道",
      "value": "846",
      "childrens": [] },
    {
      "label": "环城街道",
      "value": "847",
      "childrens": [] },
    {
      "label": "中山港街道",
      "value": "848",
      "childrens": [] },
    {
      "label": "五桂山街道",
      "value": "849",
      "childrens": [] }] },

  {
    "label": "珠海市",
    "value": "96",
    "childrens": [{
      "label": "香洲区",
      "value": "850",
      "childrens": [] },
    {
      "label": "斗门区",
      "value": "851",
      "childrens": [] },
    {
      "label": "金湾区",
      "value": "852",
      "childrens": [] }] }] },


{
  "label": "广西壮族自治区",
  "value": "7",
  "childrens": [{
    "label": "南宁市",
    "value": "97",
    "childrens": [{
      "label": "邕宁区",
      "value": "853",
      "childrens": [] },
    {
      "label": "青秀区",
      "value": "854",
      "childrens": [] },
    {
      "label": "兴宁区",
      "value": "855",
      "childrens": [] },
    {
      "label": "良庆区",
      "value": "856",
      "childrens": [] },
    {
      "label": "西乡塘区",
      "value": "857",
      "childrens": [] },
    {
      "label": "江南区",
      "value": "858",
      "childrens": [] },
    {
      "label": "武鸣县",
      "value": "859",
      "childrens": [] },
    {
      "label": "隆安县",
      "value": "860",
      "childrens": [] },
    {
      "label": "马山县",
      "value": "861",
      "childrens": [] },
    {
      "label": "上林县",
      "value": "862",
      "childrens": [] },
    {
      "label": "宾阳县",
      "value": "863",
      "childrens": [] },
    {
      "label": "横县",
      "value": "864",
      "childrens": [] }] },

  {
    "label": "桂林市",
    "value": "98",
    "childrens": [{
      "label": "秀峰区",
      "value": "865",
      "childrens": [] },
    {
      "label": "叠彩区",
      "value": "866",
      "childrens": [] },
    {
      "label": "象山区",
      "value": "867",
      "childrens": [] },
    {
      "label": "七星区",
      "value": "868",
      "childrens": [] },
    {
      "label": "雁山区",
      "value": "869",
      "childrens": [] },
    {
      "label": "阳朔县",
      "value": "870",
      "childrens": [] },
    {
      "label": "临桂县",
      "value": "871",
      "childrens": [] },
    {
      "label": "灵川县",
      "value": "872",
      "childrens": [] },
    {
      "label": "全州县",
      "value": "873",
      "childrens": [] },
    {
      "label": "平乐县",
      "value": "874",
      "childrens": [] },
    {
      "label": "兴安县",
      "value": "875",
      "childrens": [] },
    {
      "label": "灌阳县",
      "value": "876",
      "childrens": [] },
    {
      "label": "荔浦县",
      "value": "877",
      "childrens": [] },
    {
      "label": "资源县",
      "value": "878",
      "childrens": [] },
    {
      "label": "永福县",
      "value": "879",
      "childrens": [] },
    {
      "label": "龙胜",
      "value": "880",
      "childrens": [] },
    {
      "label": "恭城",
      "value": "881",
      "childrens": [] }] },

  {
    "label": "百色市",
    "value": "99",
    "childrens": [{
      "label": "右江区",
      "value": "882",
      "childrens": [] },
    {
      "label": "凌云县",
      "value": "883",
      "childrens": [] },
    {
      "label": "平果县",
      "value": "884",
      "childrens": [] },
    {
      "label": "西林县",
      "value": "885",
      "childrens": [] },
    {
      "label": "乐业县",
      "value": "886",
      "childrens": [] },
    {
      "label": "德保县",
      "value": "887",
      "childrens": [] },
    {
      "label": "田林县",
      "value": "888",
      "childrens": [] },
    {
      "label": "田阳县",
      "value": "889",
      "childrens": [] },
    {
      "label": "靖西县",
      "value": "890",
      "childrens": [] },
    {
      "label": "田东县",
      "value": "891",
      "childrens": [] },
    {
      "label": "那坡县",
      "value": "892",
      "childrens": [] },
    {
      "label": "隆林",
      "value": "893",
      "childrens": [] }] },

  {
    "label": "北海市",
    "value": "100",
    "childrens": [{
      "label": "海城区",
      "value": "894",
      "childrens": [] },
    {
      "label": "银海区",
      "value": "895",
      "childrens": [] },
    {
      "label": "铁山港区",
      "value": "896",
      "childrens": [] },
    {
      "label": "合浦县",
      "value": "897",
      "childrens": [] }] },

  {
    "label": "崇左市",
    "value": "101",
    "childrens": [{
      "label": "江州区",
      "value": "898",
      "childrens": [] },
    {
      "label": "凭祥市",
      "value": "899",
      "childrens": [] },
    {
      "label": "宁明县",
      "value": "900",
      "childrens": [] },
    {
      "label": "扶绥县",
      "value": "901",
      "childrens": [] },
    {
      "label": "龙州县",
      "value": "902",
      "childrens": [] },
    {
      "label": "大新县",
      "value": "903",
      "childrens": [] },
    {
      "label": "天等县",
      "value": "904",
      "childrens": [] }] },

  {
    "label": "防城港市",
    "value": "102",
    "childrens": [{
      "label": "港口区",
      "value": "905",
      "childrens": [] },
    {
      "label": "防城区",
      "value": "906",
      "childrens": [] },
    {
      "label": "东兴市",
      "value": "907",
      "childrens": [] },
    {
      "label": "上思县",
      "value": "908",
      "childrens": [] }] },

  {
    "label": "贵港市",
    "value": "103",
    "childrens": [{
      "label": "港北区",
      "value": "909",
      "childrens": [] },
    {
      "label": "港南区",
      "value": "910",
      "childrens": [] },
    {
      "label": "覃塘区",
      "value": "911",
      "childrens": [] },
    {
      "label": "桂平市",
      "value": "912",
      "childrens": [] },
    {
      "label": "平南县",
      "value": "913",
      "childrens": [] }] },

  {
    "label": "河池市",
    "value": "104",
    "childrens": [{
      "label": "金城江区",
      "value": "914",
      "childrens": [] },
    {
      "label": "宜州市",
      "value": "915",
      "childrens": [] },
    {
      "label": "天峨县",
      "value": "916",
      "childrens": [] },
    {
      "label": "凤山县",
      "value": "917",
      "childrens": [] },
    {
      "label": "南丹县",
      "value": "918",
      "childrens": [] },
    {
      "label": "东兰县",
      "value": "919",
      "childrens": [] },
    {
      "label": "都安",
      "value": "920",
      "childrens": [] },
    {
      "label": "罗城",
      "value": "921",
      "childrens": [] },
    {
      "label": "巴马",
      "value": "922",
      "childrens": [] },
    {
      "label": "环江",
      "value": "923",
      "childrens": [] },
    {
      "label": "大化",
      "value": "924",
      "childrens": [] }] },

  {
    "label": "贺州市",
    "value": "105",
    "childrens": [{
      "label": "八步区",
      "value": "925",
      "childrens": [] },
    {
      "label": "钟山县",
      "value": "926",
      "childrens": [] },
    {
      "label": "昭平县",
      "value": "927",
      "childrens": [] },
    {
      "label": "富川",
      "value": "928",
      "childrens": [] }] },

  {
    "label": "来宾市",
    "value": "106",
    "childrens": [{
      "label": "兴宾区",
      "value": "929",
      "childrens": [] },
    {
      "label": "合山市",
      "value": "930",
      "childrens": [] },
    {
      "label": "象州县",
      "value": "931",
      "childrens": [] },
    {
      "label": "武宣县",
      "value": "932",
      "childrens": [] },
    {
      "label": "忻城县",
      "value": "933",
      "childrens": [] },
    {
      "label": "金秀",
      "value": "934",
      "childrens": [] }] },

  {
    "label": "柳州市",
    "value": "107",
    "childrens": [{
      "label": "城中区",
      "value": "935",
      "childrens": [] },
    {
      "label": "鱼峰区",
      "value": "936",
      "childrens": [] },
    {
      "label": "柳北区",
      "value": "937",
      "childrens": [] },
    {
      "label": "柳南区",
      "value": "938",
      "childrens": [] },
    {
      "label": "柳江县",
      "value": "939",
      "childrens": [] },
    {
      "label": "柳城县",
      "value": "940",
      "childrens": [] },
    {
      "label": "鹿寨县",
      "value": "941",
      "childrens": [] },
    {
      "label": "融安县",
      "value": "942",
      "childrens": [] },
    {
      "label": "融水",
      "value": "943",
      "childrens": [] },
    {
      "label": "三江",
      "value": "944",
      "childrens": [] }] },

  {
    "label": "钦州市",
    "value": "108",
    "childrens": [{
      "label": "钦南区",
      "value": "945",
      "childrens": [] },
    {
      "label": "钦北区",
      "value": "946",
      "childrens": [] },
    {
      "label": "灵山县",
      "value": "947",
      "childrens": [] },
    {
      "label": "浦北县",
      "value": "948",
      "childrens": [] }] },

  {
    "label": "梧州市",
    "value": "109",
    "childrens": [{
      "label": "万秀区",
      "value": "949",
      "childrens": [] },
    {
      "label": "蝶山区",
      "value": "950",
      "childrens": [] },
    {
      "label": "长洲区",
      "value": "951",
      "childrens": [] },
    {
      "label": "岑溪市",
      "value": "952",
      "childrens": [] },
    {
      "label": "苍梧县",
      "value": "953",
      "childrens": [] },
    {
      "label": "藤县",
      "value": "954",
      "childrens": [] },
    {
      "label": "蒙山县",
      "value": "955",
      "childrens": [] }] },

  {
    "label": "玉林市",
    "value": "110",
    "childrens": [{
      "label": "玉州区",
      "value": "956",
      "childrens": [] },
    {
      "label": "北流市",
      "value": "957",
      "childrens": [] },
    {
      "label": "容县",
      "value": "958",
      "childrens": [] },
    {
      "label": "陆川县",
      "value": "959",
      "childrens": [] },
    {
      "label": "博白县",
      "value": "960",
      "childrens": [] },
    {
      "label": "兴业县",
      "value": "961",
      "childrens": [] }] }] },


{
  "label": "贵州省",
  "value": "8",
  "childrens": [{
    "label": "贵阳市",
    "value": "111",
    "childrens": [{
      "label": "南明区",
      "value": "962",
      "childrens": [] },
    {
      "label": "云岩区",
      "value": "963",
      "childrens": [] },
    {
      "label": "花溪区",
      "value": "964",
      "childrens": [] },
    {
      "label": "乌当区",
      "value": "965",
      "childrens": [] },
    {
      "label": "白云区",
      "value": "966",
      "childrens": [] },
    {
      "label": "小河区",
      "value": "967",
      "childrens": [] },
    {
      "label": "金阳新区",
      "value": "968",
      "childrens": [] },
    {
      "label": "新天园区",
      "value": "969",
      "childrens": [] },
    {
      "label": "清镇市",
      "value": "970",
      "childrens": [] },
    {
      "label": "开阳县",
      "value": "971",
      "childrens": [] },
    {
      "label": "修文县",
      "value": "972",
      "childrens": [] },
    {
      "label": "息烽县",
      "value": "973",
      "childrens": [] }] },

  {
    "label": "安顺市",
    "value": "112",
    "childrens": [{
      "label": "西秀区",
      "value": "974",
      "childrens": [] },
    {
      "label": "关岭",
      "value": "975",
      "childrens": [] },
    {
      "label": "镇宁",
      "value": "976",
      "childrens": [] },
    {
      "label": "紫云",
      "value": "977",
      "childrens": [] },
    {
      "label": "平坝县",
      "value": "978",
      "childrens": [] },
    {
      "label": "普定县",
      "value": "979",
      "childrens": [] }] },

  {
    "label": "毕节市",
    "value": "113",
    "childrens": [{
      "label": "毕节市",
      "value": "980",
      "childrens": [] },
    {
      "label": "大方县",
      "value": "981",
      "childrens": [] },
    {
      "label": "黔西县",
      "value": "982",
      "childrens": [] },
    {
      "label": "金沙县",
      "value": "983",
      "childrens": [] },
    {
      "label": "织金县",
      "value": "984",
      "childrens": [] },
    {
      "label": "纳雍县",
      "value": "985",
      "childrens": [] },
    {
      "label": "赫章县",
      "value": "986",
      "childrens": [] },
    {
      "label": "威宁",
      "value": "987",
      "childrens": [] }] },

  {
    "label": "六盘水市",
    "value": "114",
    "childrens": [{
      "label": "钟山区",
      "value": "988",
      "childrens": [] },
    {
      "label": "六枝特区",
      "value": "989",
      "childrens": [] },
    {
      "label": "水城县",
      "value": "990",
      "childrens": [] },
    {
      "label": "盘县",
      "value": "991",
      "childrens": [] }] },

  {
    "label": "黔东南苗族侗族自治州",
    "value": "115",
    "childrens": [{
      "label": "凯里市",
      "value": "992",
      "childrens": [] },
    {
      "label": "黄平县",
      "value": "993",
      "childrens": [] },
    {
      "label": "施秉县",
      "value": "994",
      "childrens": [] },
    {
      "label": "三穗县",
      "value": "995",
      "childrens": [] },
    {
      "label": "镇远县",
      "value": "996",
      "childrens": [] },
    {
      "label": "岑巩县",
      "value": "997",
      "childrens": [] },
    {
      "label": "天柱县",
      "value": "998",
      "childrens": [] },
    {
      "label": "锦屏县",
      "value": "999",
      "childrens": [] },
    {
      "label": "剑河县",
      "value": "1000",
      "childrens": [] },
    {
      "label": "台江县",
      "value": "1001",
      "childrens": [] },
    {
      "label": "黎平县",
      "value": "1002",
      "childrens": [] },
    {
      "label": "榕江县",
      "value": "1003",
      "childrens": [] },
    {
      "label": "从江县",
      "value": "1004",
      "childrens": [] },
    {
      "label": "雷山县",
      "value": "1005",
      "childrens": [] },
    {
      "label": "麻江县",
      "value": "1006",
      "childrens": [] },
    {
      "label": "丹寨县",
      "value": "1007",
      "childrens": [] }] },

  {
    "label": "黔南布依族苗族自治州",
    "value": "116",
    "childrens": [{
      "label": "都匀市",
      "value": "1008",
      "childrens": [] },
    {
      "label": "福泉市",
      "value": "1009",
      "childrens": [] },
    {
      "label": "荔波县",
      "value": "1010",
      "childrens": [] },
    {
      "label": "贵定县",
      "value": "1011",
      "childrens": [] },
    {
      "label": "瓮安县",
      "value": "1012",
      "childrens": [] },
    {
      "label": "独山县",
      "value": "1013",
      "childrens": [] },
    {
      "label": "平塘县",
      "value": "1014",
      "childrens": [] },
    {
      "label": "罗甸县",
      "value": "1015",
      "childrens": [] },
    {
      "label": "长顺县",
      "value": "1016",
      "childrens": [] },
    {
      "label": "龙里县",
      "value": "1017",
      "childrens": [] },
    {
      "label": "惠水县",
      "value": "1018",
      "childrens": [] },
    {
      "label": "三都",
      "value": "1019",
      "childrens": [] }] },

  {
    "label": "黔西南布依族苗族自治州",
    "value": "117",
    "childrens": [{
      "label": "兴义市",
      "value": "1020",
      "childrens": [] },
    {
      "label": "兴仁县",
      "value": "1021",
      "childrens": [] },
    {
      "label": "普安县",
      "value": "1022",
      "childrens": [] },
    {
      "label": "晴隆县",
      "value": "1023",
      "childrens": [] },
    {
      "label": "贞丰县",
      "value": "1024",
      "childrens": [] },
    {
      "label": "望谟县",
      "value": "1025",
      "childrens": [] },
    {
      "label": "册亨县",
      "value": "1026",
      "childrens": [] },
    {
      "label": "安龙县",
      "value": "1027",
      "childrens": [] }] },

  {
    "label": "铜仁市",
    "value": "118",
    "childrens": [{
      "label": "铜仁市",
      "value": "1028",
      "childrens": [] },
    {
      "label": "江口县",
      "value": "1029",
      "childrens": [] },
    {
      "label": "石阡县",
      "value": "1030",
      "childrens": [] },
    {
      "label": "思南县",
      "value": "1031",
      "childrens": [] },
    {
      "label": "德江县",
      "value": "1032",
      "childrens": [] },
    {
      "label": "玉屏",
      "value": "1033",
      "childrens": [] },
    {
      "label": "印江",
      "value": "1034",
      "childrens": [] },
    {
      "label": "沿河",
      "value": "1035",
      "childrens": [] },
    {
      "label": "松桃",
      "value": "1036",
      "childrens": [] },
    {
      "label": "万山特区",
      "value": "1037",
      "childrens": [] }] },

  {
    "label": "遵义市",
    "value": "119",
    "childrens": [{
      "label": "红花岗区",
      "value": "1038",
      "childrens": [] },
    {
      "label": "务川县",
      "value": "1039",
      "childrens": [] },
    {
      "label": "道真县",
      "value": "1040",
      "childrens": [] },
    {
      "label": "汇川区",
      "value": "1041",
      "childrens": [] },
    {
      "label": "赤水市",
      "value": "1042",
      "childrens": [] },
    {
      "label": "仁怀市",
      "value": "1043",
      "childrens": [] },
    {
      "label": "遵义县",
      "value": "1044",
      "childrens": [] },
    {
      "label": "桐梓县",
      "value": "1045",
      "childrens": [] },
    {
      "label": "绥阳县",
      "value": "1046",
      "childrens": [] },
    {
      "label": "正安县",
      "value": "1047",
      "childrens": [] },
    {
      "label": "凤冈县",
      "value": "1048",
      "childrens": [] },
    {
      "label": "湄潭县",
      "value": "1049",
      "childrens": [] },
    {
      "label": "余庆县",
      "value": "1050",
      "childrens": [] },
    {
      "label": "习水县",
      "value": "1051",
      "childrens": [] },
    {
      "label": "道真",
      "value": "1052",
      "childrens": [] },
    {
      "label": "务川",
      "value": "1053",
      "childrens": [] }] }] },


{
  "label": "海南省",
  "value": "23",
  "childrens": [{
    "label": "海口市",
    "value": "2121",
    "childrens": [{
      "label": "秀英区",
      "value": "53309",
      "childrens": [] },
    {
      "label": "龙华区",
      "value": "53310",
      "childrens": [] },
    {
      "label": "琼山区",
      "value": "53311",
      "childrens": [] },
    {
      "label": "美兰区",
      "value": "53312",
      "childrens": [] }] },

  {
    "label": "儋州市",
    "value": "3034",
    "childrens": [{
      "label": "那大镇",
      "value": "3125",
      "childrens": [] },
    {
      "label": "和庆镇",
      "value": "3733",
      "childrens": [] },
    {
      "label": "南丰镇",
      "value": "3734",
      "childrens": [] },
    {
      "label": "大成镇",
      "value": "3735",
      "childrens": [] },
    {
      "label": "雅星镇",
      "value": "3736",
      "childrens": [] },
    {
      "label": "兰洋镇",
      "value": "3737",
      "childrens": [] },
    {
      "label": "光村镇",
      "value": "3738",
      "childrens": [] },
    {
      "label": "木棠镇",
      "value": "3739",
      "childrens": [] },
    {
      "label": "海头镇",
      "value": "3740",
      "childrens": [] },
    {
      "label": "峨蔓镇",
      "value": "3741",
      "childrens": [] },
    {
      "label": "三都镇",
      "value": "3744",
      "childrens": [] },
    {
      "label": "王五镇",
      "value": "3745",
      "childrens": [] },
    {
      "label": "白马井镇",
      "value": "3746",
      "childrens": [] },
    {
      "label": "中和镇",
      "value": "3747",
      "childrens": [] },
    {
      "label": "排浦镇",
      "value": "3748",
      "childrens": [] },
    {
      "label": "东成镇",
      "value": "3749",
      "childrens": [] },
    {
      "label": "新州镇",
      "value": "3750",
      "childrens": [] },
    {
      "label": "洋浦经济开发区",
      "value": "3751",
      "childrens": [] },
    {
      "label": "富克镇",
      "value": "4214",
      "childrens": [] },
    {
      "label": "西培农场",
      "value": "53313",
      "childrens": [] },
    {
      "label": "西联农场",
      "value": "53314",
      "childrens": [] },
    {
      "label": "蓝洋农场",
      "value": "53315",
      "childrens": [] },
    {
      "label": "八一农场",
      "value": "53316",
      "childrens": [] },
    {
      "label": "西华农场",
      "value": "53317",
      "childrens": [] },
    {
      "label": "西庆农场",
      "value": "53318",
      "childrens": [] },
    {
      "label": "西流农场",
      "value": "53319",
      "childrens": [] },
    {
      "label": "新盈农场",
      "value": "53320",
      "childrens": [] },
    {
      "label": "龙山农场",
      "value": "53321",
      "childrens": [] },
    {
      "label": "红岭农场",
      "value": "53322",
      "childrens": [] },
    {
      "label": "热作学院",
      "value": "53323",
      "childrens": [] }] },

  {
    "label": "琼海市",
    "value": "3115",
    "childrens": [{
      "label": "嘉积镇",
      "value": "3720",
      "childrens": [] },
    {
      "label": "万泉镇",
      "value": "3721",
      "childrens": [] },
    {
      "label": "石壁镇",
      "value": "3722",
      "childrens": [] },
    {
      "label": "中原镇",
      "value": "3723",
      "childrens": [] },
    {
      "label": "博鳌镇",
      "value": "3724",
      "childrens": [] },
    {
      "label": "阳江镇",
      "value": "3725",
      "childrens": [] },
    {
      "label": "龙江镇",
      "value": "3727",
      "childrens": [] },
    {
      "label": "潭门镇",
      "value": "3728",
      "childrens": [] },
    {
      "label": "塔洋镇",
      "value": "3729",
      "childrens": [] },
    {
      "label": "长坡镇",
      "value": "3730",
      "childrens": [] },
    {
      "label": "大路镇",
      "value": "3731",
      "childrens": [] },
    {
      "label": "会山镇",
      "value": "3732",
      "childrens": [] },
    {
      "label": "彬村山华侨农场",
      "value": "53324",
      "childrens": [] },
    {
      "label": "东太农场",
      "value": "53325",
      "childrens": [] },
    {
      "label": "东红农场",
      "value": "53326",
      "childrens": [] },
    {
      "label": "东升农场",
      "value": "53327",
      "childrens": [] },
    {
      "label": "南俸农场",
      "value": "53328",
      "childrens": [] }] },

  {
    "label": "万宁市",
    "value": "3137",
    "childrens": [{
      "label": "万城镇",
      "value": "3768",
      "childrens": [] },
    {
      "label": "龙滚镇",
      "value": "3769",
      "childrens": [] },
    {
      "label": "和乐镇",
      "value": "3770",
      "childrens": [] },
    {
      "label": "后安镇",
      "value": "3771",
      "childrens": [] },
    {
      "label": "大茂镇",
      "value": "3772",
      "childrens": [] },
    {
      "label": "东澳镇",
      "value": "3773",
      "childrens": [] },
    {
      "label": "礼纪镇",
      "value": "3774",
      "childrens": [] },
    {
      "label": "长丰镇",
      "value": "3775",
      "childrens": [] },
    {
      "label": "山根镇",
      "value": "3776",
      "childrens": [] },
    {
      "label": "北大镇",
      "value": "3777",
      "childrens": [] },
    {
      "label": "南桥镇",
      "value": "3778",
      "childrens": [] },
    {
      "label": "三更罗镇",
      "value": "3779",
      "childrens": [] },
    {
      "label": "六连林场",
      "value": "53329",
      "childrens": [] },
    {
      "label": "东兴农场",
      "value": "53330",
      "childrens": [] },
    {
      "label": "东和农场",
      "value": "53331",
      "childrens": [] },
    {
      "label": "新中农场",
      "value": "53332",
      "childrens": [] },
    {
      "label": "兴隆华侨农场",
      "value": "53333",
      "childrens": [] },
    {
      "label": "兴隆镇",
      "value": "53334",
      "childrens": [] },
    {
      "label": "南林农场",
      "value": "53335",
      "childrens": [] }] },

  {
    "label": "东方市",
    "value": "3173",
    "childrens": [{
      "label": "八所镇",
      "value": "3780",
      "childrens": [] },
    {
      "label": "东河镇",
      "value": "3781",
      "childrens": [] },
    {
      "label": "大田镇",
      "value": "3782",
      "childrens": [] },
    {
      "label": "感城镇",
      "value": "3783",
      "childrens": [] },
    {
      "label": "板桥镇",
      "value": "3784",
      "childrens": [] },
    {
      "label": "三家镇",
      "value": "3785",
      "childrens": [] },
    {
      "label": "四更镇",
      "value": "3786",
      "childrens": [] },
    {
      "label": "新龙镇",
      "value": "3787",
      "childrens": [] },
    {
      "label": "天安乡",
      "value": "3788",
      "childrens": [] },
    {
      "label": "江边乡",
      "value": "3789",
      "childrens": [] },
    {
      "label": "广坝农场",
      "value": "53336",
      "childrens": [] },
    {
      "label": "东方华侨农场",
      "value": "53337",
      "childrens": [] }] },

  {
    "label": "三亚市",
    "value": "3690",
    "childrens": [{
      "label": "海棠区",
      "value": "3693",
      "childrens": [] },
    {
      "label": "吉阳区",
      "value": "3694",
      "childrens": [] },
    {
      "label": "天涯区",
      "value": "3696",
      "childrens": [] },
    {
      "label": "崖州区",
      "value": "3697",
      "childrens": [] }] },

  {
    "label": "文昌市",
    "value": "3698",
    "childrens": [{
      "label": "文城镇",
      "value": "3752",
      "childrens": [] },
    {
      "label": "重兴镇",
      "value": "3753",
      "childrens": [] },
    {
      "label": "蓬莱镇",
      "value": "3754",
      "childrens": [] },
    {
      "label": "会文镇",
      "value": "3755",
      "childrens": [] },
    {
      "label": "东路镇",
      "value": "3756",
      "childrens": [] },
    {
      "label": "潭牛镇",
      "value": "3757",
      "childrens": [] },
    {
      "label": "东阁镇",
      "value": "3758",
      "childrens": [] },
    {
      "label": "文教镇",
      "value": "3759",
      "childrens": [] },
    {
      "label": "东郊镇",
      "value": "3760",
      "childrens": [] },
    {
      "label": "龙楼镇",
      "value": "3761",
      "childrens": [] },
    {
      "label": "昌洒镇",
      "value": "3762",
      "childrens": [] },
    {
      "label": "翁田镇",
      "value": "3763",
      "childrens": [] },
    {
      "label": "抱罗镇",
      "value": "3764",
      "childrens": [] },
    {
      "label": "冯坡镇",
      "value": "3765",
      "childrens": [] },
    {
      "label": "锦山镇",
      "value": "3766",
      "childrens": [] },
    {
      "label": "铺前镇",
      "value": "3767",
      "childrens": [] },
    {
      "label": "公坡镇",
      "value": "53338",
      "childrens": [] },
    {
      "label": "迈号镇",
      "value": "53339",
      "childrens": [] },
    {
      "label": "清谰镇",
      "value": "53340",
      "childrens": [] },
    {
      "label": "南阳镇",
      "value": "53341",
      "childrens": [] },
    {
      "label": "新桥镇",
      "value": "53342",
      "childrens": [] },
    {
      "label": "头苑镇",
      "value": "53343",
      "childrens": [] },
    {
      "label": "宝芳乡",
      "value": "53344",
      "childrens": [] },
    {
      "label": "龙马乡",
      "value": "53345",
      "childrens": [] },
    {
      "label": "湖山乡",
      "value": "53346",
      "childrens": [] },
    {
      "label": "东路农场",
      "value": "53347",
      "childrens": [] },
    {
      "label": "南阳农场",
      "value": "53348",
      "childrens": [] },
    {
      "label": "罗豆农场",
      "value": "53349",
      "childrens": [] },
    {
      "label": "橡胶研究所",
      "value": "53350",
      "childrens": [] }] },

  {
    "label": "五指山市",
    "value": "3699",
    "childrens": [{
      "label": "通什镇",
      "value": "3712",
      "childrens": [] },
    {
      "label": "南圣镇",
      "value": "3713",
      "childrens": [] },
    {
      "label": "毛阳镇",
      "value": "3714",
      "childrens": [] },
    {
      "label": "番阳镇",
      "value": "3715",
      "childrens": [] },
    {
      "label": "畅好乡",
      "value": "3716",
      "childrens": [] },
    {
      "label": "毛道乡",
      "value": "3717",
      "childrens": [] },
    {
      "label": "水满乡",
      "value": "3719",
      "childrens": [] },
    {
      "label": "畅好农场",
      "value": "53351",
      "childrens": [] }] },

  {
    "label": "临高县",
    "value": "3701",
    "childrens": [{
      "label": "临城镇",
      "value": "3790",
      "childrens": [] },
    {
      "label": "波莲镇",
      "value": "3791",
      "childrens": [] },
    {
      "label": "东英镇",
      "value": "3792",
      "childrens": [] },
    {
      "label": "博厚镇",
      "value": "3793",
      "childrens": [] },
    {
      "label": "皇桐镇",
      "value": "3794",
      "childrens": [] },
    {
      "label": "多文镇",
      "value": "3795",
      "childrens": [] },
    {
      "label": "和舍镇",
      "value": "3796",
      "childrens": [] },
    {
      "label": "南宝镇",
      "value": "3797",
      "childrens": [] },
    {
      "label": "新盈镇",
      "value": "3798",
      "childrens": [] },
    {
      "label": "调楼镇",
      "value": "3799",
      "childrens": [] },
    {
      "label": "加来镇",
      "value": "3800",
      "childrens": [] },
    {
      "label": "红华农场",
      "value": "53352",
      "childrens": [] },
    {
      "label": "加来农场",
      "value": "53353",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53354",
      "childrens": [] }] },

  {
    "label": "澄迈县",
    "value": "3702",
    "childrens": [{
      "label": "金江镇",
      "value": "3801",
      "childrens": [] },
    {
      "label": "老城镇",
      "value": "3802",
      "childrens": [] },
    {
      "label": "瑞溪镇",
      "value": "3803",
      "childrens": [] },
    {
      "label": "永发镇",
      "value": "3804",
      "childrens": [] },
    {
      "label": "加乐镇",
      "value": "3805",
      "childrens": [] },
    {
      "label": "文儒镇",
      "value": "3806",
      "childrens": [] },
    {
      "label": "中兴镇",
      "value": "3807",
      "childrens": [] },
    {
      "label": "仁兴镇",
      "value": "3808",
      "childrens": [] },
    {
      "label": "福山镇",
      "value": "3809",
      "childrens": [] },
    {
      "label": "桥头镇",
      "value": "3810",
      "childrens": [] },
    {
      "label": "大丰镇",
      "value": "53355",
      "childrens": [] },
    {
      "label": "红光农场",
      "value": "53356",
      "childrens": [] },
    {
      "label": "西达农场",
      "value": "53357",
      "childrens": [] },
    {
      "label": "金安农场",
      "value": "53358",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53359",
      "childrens": [] }] },

  {
    "label": "定安县",
    "value": "3703",
    "childrens": [{
      "label": "定城镇",
      "value": "3811",
      "childrens": [] },
    {
      "label": "新竹镇",
      "value": "3812",
      "childrens": [] },
    {
      "label": "龙湖镇",
      "value": "3813",
      "childrens": [] },
    {
      "label": "雷鸣镇",
      "value": "3814",
      "childrens": [] },
    {
      "label": "龙门镇",
      "value": "3815",
      "childrens": [] },
    {
      "label": "龙河镇",
      "value": "3816",
      "childrens": [] },
    {
      "label": "岭口镇",
      "value": "3817",
      "childrens": [] },
    {
      "label": "翰林镇",
      "value": "3818",
      "childrens": [] },
    {
      "label": "富文镇",
      "value": "3819",
      "childrens": [] },
    {
      "label": "黄竹镇",
      "value": "4498",
      "childrens": [] },
    {
      "label": "金鸡岭农场",
      "value": "53361",
      "childrens": [] },
    {
      "label": "中瑞农场",
      "value": "53362",
      "childrens": [] },
    {
      "label": "南海农场",
      "value": "53363",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53364",
      "childrens": [] }] },

  {
    "label": "屯昌县",
    "value": "3704",
    "childrens": [{
      "label": "屯城镇",
      "value": "3820",
      "childrens": [] },
    {
      "label": "新兴镇",
      "value": "3821",
      "childrens": [] },
    {
      "label": "枫木镇",
      "value": "3822",
      "childrens": [] },
    {
      "label": "乌坡镇",
      "value": "3823",
      "childrens": [] },
    {
      "label": "南吕镇",
      "value": "3824",
      "childrens": [] },
    {
      "label": "南坤镇",
      "value": "3825",
      "childrens": [] },
    {
      "label": "坡心镇",
      "value": "3826",
      "childrens": [] },
    {
      "label": "西昌镇",
      "value": "3827",
      "childrens": [] },
    {
      "label": "中建农场",
      "value": "53365",
      "childrens": [] },
    {
      "label": "中坤农场",
      "value": "53366",
      "childrens": [] },
    {
      "label": "县城内",
      "value": "53367",
      "childrens": [] }] },

  {
    "label": "昌江县",
    "value": "3705",
    "childrens": [{
      "label": "石碌镇",
      "value": "3828",
      "childrens": [] },
    {
      "label": "叉河镇",
      "value": "3829",
      "childrens": [] },
    {
      "label": "十月田镇",
      "value": "3830",
      "childrens": [] },
    {
      "label": "乌烈镇",
      "value": "3831",
      "childrens": [] },
    {
      "label": "昌化镇",
      "value": "3832",
      "childrens": [] },
    {
      "label": "海尾镇",
      "value": "3833",
      "childrens": [] },
    {
      "label": "七叉镇",
      "value": "53368",
      "childrens": [] },
    {
      "label": "王下乡",
      "value": "53369",
      "childrens": [] },
    {
      "label": "海南矿业公司",
      "value": "53370",
      "childrens": [] },
    {
      "label": "霸王岭林场",
      "value": "53371",
      "childrens": [] },
    {
      "label": "红林农场",
      "value": "53372",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53373",
      "childrens": [] }] },

  {
    "label": "白沙县",
    "value": "3706",
    "childrens": [{
      "label": "牙叉镇",
      "value": "3834",
      "childrens": [] },
    {
      "label": "七坊镇",
      "value": "3835",
      "childrens": [] },
    {
      "label": "邦溪镇",
      "value": "3836",
      "childrens": [] },
    {
      "label": "打安镇",
      "value": "3837",
      "childrens": [] },
    {
      "label": "细水乡",
      "value": "3838",
      "childrens": [] },
    {
      "label": "元门乡",
      "value": "3839",
      "childrens": [] },
    {
      "label": "南开乡",
      "value": "3840",
      "childrens": [] },
    {
      "label": "阜龙乡",
      "value": "3841",
      "childrens": [] },
    {
      "label": "青松乡",
      "value": "3842",
      "childrens": [] },
    {
      "label": "金波乡",
      "value": "3843",
      "childrens": [] },
    {
      "label": "荣邦乡",
      "value": "3844",
      "childrens": [] },
    {
      "label": "白沙农场",
      "value": "53374",
      "childrens": [] },
    {
      "label": "龙江农场",
      "value": "53375",
      "childrens": [] },
    {
      "label": "邦溪农场",
      "value": "53376",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53377",
      "childrens": [] }] },

  {
    "label": "琼中县",
    "value": "3707",
    "childrens": [{
      "label": "营根镇",
      "value": "3878",
      "childrens": [] },
    {
      "label": "湾岭镇",
      "value": "3879",
      "childrens": [] },
    {
      "label": "黎母山镇",
      "value": "3880",
      "childrens": [] },
    {
      "label": "和平镇",
      "value": "3881",
      "childrens": [] },
    {
      "label": "长征镇",
      "value": "3882",
      "childrens": [] },
    {
      "label": "红毛镇",
      "value": "3883",
      "childrens": [] },
    {
      "label": "中平镇",
      "value": "3884",
      "childrens": [] },
    {
      "label": "上安乡",
      "value": "3885",
      "childrens": [] },
    {
      "label": "什运乡",
      "value": "3886",
      "childrens": [] },
    {
      "label": "吊罗山乡",
      "value": "53378",
      "childrens": [] },
    {
      "label": "黎母山林业公司",
      "value": "53379",
      "childrens": [] },
    {
      "label": "阳江农场",
      "value": "53380",
      "childrens": [] },
    {
      "label": "乌石农场",
      "value": "53381",
      "childrens": [] },
    {
      "label": "加钗农场",
      "value": "53382",
      "childrens": [] },
    {
      "label": "长征农场",
      "value": "53383",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53384",
      "childrens": [] }] },

  {
    "label": "陵水县",
    "value": "3708",
    "childrens": [{
      "label": "椰林镇",
      "value": "3858",
      "childrens": [] },
    {
      "label": "光坡镇",
      "value": "3859",
      "childrens": [] },
    {
      "label": "三才镇",
      "value": "3860",
      "childrens": [] },
    {
      "label": "英州镇",
      "value": "3861",
      "childrens": [] },
    {
      "label": "隆广镇",
      "value": "3862",
      "childrens": [] },
    {
      "label": "文罗镇",
      "value": "3863",
      "childrens": [] },
    {
      "label": "本号镇",
      "value": "3864",
      "childrens": [] },
    {
      "label": "新村镇",
      "value": "3865",
      "childrens": [] },
    {
      "label": "黎安镇",
      "value": "3866",
      "childrens": [] },
    {
      "label": "提蒙乡",
      "value": "3867",
      "childrens": [] },
    {
      "label": "群英乡",
      "value": "3868",
      "childrens": [] },
    {
      "label": "吊罗山林业公司",
      "value": "53385",
      "childrens": [] },
    {
      "label": "岭门农场",
      "value": "53386",
      "childrens": [] },
    {
      "label": "南平农场",
      "value": "53387",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53388",
      "childrens": [] },
    {
      "label": "东华镇",
      "value": "53389",
      "childrens": [] },
    {
      "label": "南平镇",
      "value": "53390",
      "childrens": [] }] },

  {
    "label": "保亭县",
    "value": "3709",
    "childrens": [{
      "label": "保城镇",
      "value": "3869",
      "childrens": [] },
    {
      "label": "什玲镇",
      "value": "3870",
      "childrens": [] },
    {
      "label": "加茂镇",
      "value": "3871",
      "childrens": [] },
    {
      "label": "响水镇",
      "value": "3872",
      "childrens": [] },
    {
      "label": "新政镇",
      "value": "3873",
      "childrens": [] },
    {
      "label": "三道镇",
      "value": "3874",
      "childrens": [] },
    {
      "label": "六弓乡",
      "value": "3875",
      "childrens": [] },
    {
      "label": "南林乡",
      "value": "3876",
      "childrens": [] },
    {
      "label": "毛感乡",
      "value": "3877",
      "childrens": [] },
    {
      "label": "保亭研究所",
      "value": "53391",
      "childrens": [] },
    {
      "label": "新星农场",
      "value": "53392",
      "childrens": [] },
    {
      "label": "金江农场",
      "value": "53393",
      "childrens": [] },
    {
      "label": "三道农场",
      "value": "53394",
      "childrens": [] }] },

  {
    "label": "乐东县",
    "value": "3710",
    "childrens": [{
      "label": "抱由镇",
      "value": "3845",
      "childrens": [] },
    {
      "label": "万冲镇",
      "value": "3846",
      "childrens": [] },
    {
      "label": "大安镇",
      "value": "3847",
      "childrens": [] },
    {
      "label": "志仲镇",
      "value": "3849",
      "childrens": [] },
    {
      "label": "千家镇",
      "value": "3851",
      "childrens": [] },
    {
      "label": "九所镇",
      "value": "3852",
      "childrens": [] },
    {
      "label": "利国镇",
      "value": "3853",
      "childrens": [] },
    {
      "label": "黄流镇",
      "value": "3854",
      "childrens": [] },
    {
      "label": "佛罗镇",
      "value": "3855",
      "childrens": [] },
    {
      "label": "尖峰镇",
      "value": "3856",
      "childrens": [] },
    {
      "label": "莺歌海镇",
      "value": "3857",
      "childrens": [] },
    {
      "label": "尖峰岭林业公司",
      "value": "53395",
      "childrens": [] },
    {
      "label": "莺歌海盐场",
      "value": "53396",
      "childrens": [] },
    {
      "label": "山荣农场",
      "value": "53397",
      "childrens": [] },
    {
      "label": "乐光农场",
      "value": "53398",
      "childrens": [] },
    {
      "label": "保国农场",
      "value": "53399",
      "childrens": [] },
    {
      "label": "城区",
      "value": "53400",
      "childrens": [] }] },

  {
    "label": "三沙市",
    "value": "3711",
    "childrens": [{
      "label": "西沙群岛",
      "value": "3887",
      "childrens": [] },
    {
      "label": "南沙群岛",
      "value": "3888",
      "childrens": [] },
    {
      "label": "中沙群岛",
      "value": "53401",
      "childrens": [] }] }] },


{
  "label": "河北省",
  "value": "10",
  "childrens": [{
    "label": "石家庄市",
    "value": "138",
    "childrens": [{
      "label": "长安区",
      "value": "1078",
      "childrens": [] },
    {
      "label": "桥东区",
      "value": "1079",
      "childrens": [] },
    {
      "label": "桥西区",
      "value": "1080",
      "childrens": [] },
    {
      "label": "新华区",
      "value": "1081",
      "childrens": [] },
    {
      "label": "裕华区",
      "value": "1082",
      "childrens": [] },
    {
      "label": "井陉矿区",
      "value": "1083",
      "childrens": [] },
    {
      "label": "高新区",
      "value": "1084",
      "childrens": [] },
    {
      "label": "辛集市",
      "value": "1085",
      "childrens": [] },
    {
      "label": "藁城市",
      "value": "1086",
      "childrens": [] },
    {
      "label": "晋州市",
      "value": "1087",
      "childrens": [] },
    {
      "label": "新乐市",
      "value": "1088",
      "childrens": [] },
    {
      "label": "鹿泉市",
      "value": "1089",
      "childrens": [] },
    {
      "label": "井陉县",
      "value": "1090",
      "childrens": [] },
    {
      "label": "正定县",
      "value": "1091",
      "childrens": [] },
    {
      "label": "栾城县",
      "value": "1092",
      "childrens": [] },
    {
      "label": "行唐县",
      "value": "1093",
      "childrens": [] },
    {
      "label": "灵寿县",
      "value": "1094",
      "childrens": [] },
    {
      "label": "高邑县",
      "value": "1095",
      "childrens": [] },
    {
      "label": "深泽县",
      "value": "1096",
      "childrens": [] },
    {
      "label": "赞皇县",
      "value": "1097",
      "childrens": [] },
    {
      "label": "无极县",
      "value": "1098",
      "childrens": [] },
    {
      "label": "平山县",
      "value": "1099",
      "childrens": [] },
    {
      "label": "元氏县",
      "value": "1100",
      "childrens": [] },
    {
      "label": "赵县",
      "value": "1101",
      "childrens": [] }] },

  {
    "label": "保定市",
    "value": "139",
    "childrens": [{
      "label": "新市区",
      "value": "1102",
      "childrens": [] },
    {
      "label": "南市区",
      "value": "1103",
      "childrens": [] },
    {
      "label": "北市区",
      "value": "1104",
      "childrens": [] },
    {
      "label": "涿州市",
      "value": "1105",
      "childrens": [] },
    {
      "label": "定州市",
      "value": "1106",
      "childrens": [] },
    {
      "label": "安国市",
      "value": "1107",
      "childrens": [] },
    {
      "label": "高碑店市",
      "value": "1108",
      "childrens": [] },
    {
      "label": "满城县",
      "value": "1109",
      "childrens": [] },
    {
      "label": "清苑县",
      "value": "1110",
      "childrens": [] },
    {
      "label": "涞水县",
      "value": "1111",
      "childrens": [] },
    {
      "label": "阜平县",
      "value": "1112",
      "childrens": [] },
    {
      "label": "徐水县",
      "value": "1113",
      "childrens": [] },
    {
      "label": "定兴县",
      "value": "1114",
      "childrens": [] },
    {
      "label": "唐县",
      "value": "1115",
      "childrens": [] },
    {
      "label": "高阳县",
      "value": "1116",
      "childrens": [] },
    {
      "label": "容城县",
      "value": "1117",
      "childrens": [] },
    {
      "label": "涞源县",
      "value": "1118",
      "childrens": [] },
    {
      "label": "望都县",
      "value": "1119",
      "childrens": [] },
    {
      "label": "安新县",
      "value": "1120",
      "childrens": [] },
    {
      "label": "易县",
      "value": "1121",
      "childrens": [] },
    {
      "label": "曲阳县",
      "value": "1122",
      "childrens": [] },
    {
      "label": "蠡县",
      "value": "1123",
      "childrens": [] },
    {
      "label": "顺平县",
      "value": "1124",
      "childrens": [] },
    {
      "label": "博野县",
      "value": "1125",
      "childrens": [] },
    {
      "label": "雄县",
      "value": "1126",
      "childrens": [] }] },

  {
    "label": "沧州市",
    "value": "140",
    "childrens": [{
      "label": "运河区",
      "value": "1127",
      "childrens": [] },
    {
      "label": "新华区",
      "value": "1128",
      "childrens": [] },
    {
      "label": "泊头市",
      "value": "1129",
      "childrens": [] },
    {
      "label": "任丘市",
      "value": "1130",
      "childrens": [] },
    {
      "label": "黄骅市",
      "value": "1131",
      "childrens": [] },
    {
      "label": "河间市",
      "value": "1132",
      "childrens": [] },
    {
      "label": "沧县",
      "value": "1133",
      "childrens": [] },
    {
      "label": "青县",
      "value": "1134",
      "childrens": [] },
    {
      "label": "东光县",
      "value": "1135",
      "childrens": [] },
    {
      "label": "海兴县",
      "value": "1136",
      "childrens": [] },
    {
      "label": "盐山县",
      "value": "1137",
      "childrens": [] },
    {
      "label": "肃宁县",
      "value": "1138",
      "childrens": [] },
    {
      "label": "南皮县",
      "value": "1139",
      "childrens": [] },
    {
      "label": "吴桥县",
      "value": "1140",
      "childrens": [] },
    {
      "label": "献县",
      "value": "1141",
      "childrens": [] },
    {
      "label": "孟村",
      "value": "1142",
      "childrens": [] }] },

  {
    "label": "承德市",
    "value": "141",
    "childrens": [{
      "label": "双桥区",
      "value": "1143",
      "childrens": [] },
    {
      "label": "双滦区",
      "value": "1144",
      "childrens": [] },
    {
      "label": "鹰手营子矿区",
      "value": "1145",
      "childrens": [] },
    {
      "label": "承德县",
      "value": "1146",
      "childrens": [] },
    {
      "label": "兴隆县",
      "value": "1147",
      "childrens": [] },
    {
      "label": "平泉县",
      "value": "1148",
      "childrens": [] },
    {
      "label": "滦平县",
      "value": "1149",
      "childrens": [] },
    {
      "label": "隆化县",
      "value": "1150",
      "childrens": [] },
    {
      "label": "丰宁",
      "value": "1151",
      "childrens": [] },
    {
      "label": "宽城",
      "value": "1152",
      "childrens": [] },
    {
      "label": "围场",
      "value": "1153",
      "childrens": [] }] },

  {
    "label": "邯郸市",
    "value": "142",
    "childrens": [{
      "label": "从台区",
      "value": "1154",
      "childrens": [] },
    {
      "label": "复兴区",
      "value": "1155",
      "childrens": [] },
    {
      "label": "邯山区",
      "value": "1156",
      "childrens": [] },
    {
      "label": "峰峰矿区",
      "value": "1157",
      "childrens": [] },
    {
      "label": "武安市",
      "value": "1158",
      "childrens": [] },
    {
      "label": "邯郸县",
      "value": "1159",
      "childrens": [] },
    {
      "label": "临漳县",
      "value": "1160",
      "childrens": [] },
    {
      "label": "成安县",
      "value": "1161",
      "childrens": [] },
    {
      "label": "大名县",
      "value": "1162",
      "childrens": [] },
    {
      "label": "涉县",
      "value": "1163",
      "childrens": [] },
    {
      "label": "磁县",
      "value": "1164",
      "childrens": [] },
    {
      "label": "肥乡县",
      "value": "1165",
      "childrens": [] },
    {
      "label": "永年县",
      "value": "1166",
      "childrens": [] },
    {
      "label": "邱县",
      "value": "1167",
      "childrens": [] },
    {
      "label": "鸡泽县",
      "value": "1168",
      "childrens": [] },
    {
      "label": "广平县",
      "value": "1169",
      "childrens": [] },
    {
      "label": "馆陶县",
      "value": "1170",
      "childrens": [] },
    {
      "label": "魏县",
      "value": "1171",
      "childrens": [] },
    {
      "label": "曲周县",
      "value": "1172",
      "childrens": [] }] },

  {
    "label": "衡水市",
    "value": "143",
    "childrens": [{
      "label": "桃城区",
      "value": "1173",
      "childrens": [] },
    {
      "label": "冀州市",
      "value": "1174",
      "childrens": [] },
    {
      "label": "深州市",
      "value": "1175",
      "childrens": [] },
    {
      "label": "枣强县",
      "value": "1176",
      "childrens": [] },
    {
      "label": "武邑县",
      "value": "1177",
      "childrens": [] },
    {
      "label": "武强县",
      "value": "1178",
      "childrens": [] },
    {
      "label": "饶阳县",
      "value": "1179",
      "childrens": [] },
    {
      "label": "安平县",
      "value": "1180",
      "childrens": [] },
    {
      "label": "故城县",
      "value": "1181",
      "childrens": [] },
    {
      "label": "景县",
      "value": "1182",
      "childrens": [] },
    {
      "label": "阜城县",
      "value": "1183",
      "childrens": [] }] },

  {
    "label": "廊坊市",
    "value": "144",
    "childrens": [{
      "label": "安次区",
      "value": "1184",
      "childrens": [] },
    {
      "label": "广阳区",
      "value": "1185",
      "childrens": [] },
    {
      "label": "霸州市",
      "value": "1186",
      "childrens": [] },
    {
      "label": "三河市",
      "value": "1187",
      "childrens": [] },
    {
      "label": "固安县",
      "value": "1188",
      "childrens": [] },
    {
      "label": "永清县",
      "value": "1189",
      "childrens": [] },
    {
      "label": "香河县",
      "value": "1190",
      "childrens": [] },
    {
      "label": "大城县",
      "value": "1191",
      "childrens": [] },
    {
      "label": "文安县",
      "value": "1192",
      "childrens": [] },
    {
      "label": "大厂",
      "value": "1193",
      "childrens": [] }] },

  {
    "label": "秦皇岛市",
    "value": "145",
    "childrens": [{
      "label": "海港区",
      "value": "1194",
      "childrens": [] },
    {
      "label": "山海关区",
      "value": "1195",
      "childrens": [] },
    {
      "label": "北戴河区",
      "value": "1196",
      "childrens": [] },
    {
      "label": "昌黎县",
      "value": "1197",
      "childrens": [] },
    {
      "label": "抚宁县",
      "value": "1198",
      "childrens": [] },
    {
      "label": "卢龙县",
      "value": "1199",
      "childrens": [] },
    {
      "label": "青龙",
      "value": "1200",
      "childrens": [] }] },

  {
    "label": "唐山市",
    "value": "146",
    "childrens": [{
      "label": "路北区",
      "value": "1201",
      "childrens": [] },
    {
      "label": "路南区",
      "value": "1202",
      "childrens": [] },
    {
      "label": "古冶区",
      "value": "1203",
      "childrens": [] },
    {
      "label": "开平区",
      "value": "1204",
      "childrens": [] },
    {
      "label": "丰南区",
      "value": "1205",
      "childrens": [] },
    {
      "label": "丰润区",
      "value": "1206",
      "childrens": [] },
    {
      "label": "遵化市",
      "value": "1207",
      "childrens": [] },
    {
      "label": "迁安市",
      "value": "1208",
      "childrens": [] },
    {
      "label": "滦县",
      "value": "1209",
      "childrens": [] },
    {
      "label": "滦南县",
      "value": "1210",
      "childrens": [] },
    {
      "label": "乐亭县",
      "value": "1211",
      "childrens": [] },
    {
      "label": "迁西县",
      "value": "1212",
      "childrens": [] },
    {
      "label": "玉田县",
      "value": "1213",
      "childrens": [] },
    {
      "label": "唐海县",
      "value": "1214",
      "childrens": [] }] },

  {
    "label": "邢台市",
    "value": "147",
    "childrens": [{
      "label": "桥东区",
      "value": "1215",
      "childrens": [] },
    {
      "label": "桥西区",
      "value": "1216",
      "childrens": [] },
    {
      "label": "南宫市",
      "value": "1217",
      "childrens": [] },
    {
      "label": "沙河市",
      "value": "1218",
      "childrens": [] },
    {
      "label": "邢台县",
      "value": "1219",
      "childrens": [] },
    {
      "label": "临城县",
      "value": "1220",
      "childrens": [] },
    {
      "label": "内丘县",
      "value": "1221",
      "childrens": [] },
    {
      "label": "柏乡县",
      "value": "1222",
      "childrens": [] },
    {
      "label": "隆尧县",
      "value": "1223",
      "childrens": [] },
    {
      "label": "任县",
      "value": "1224",
      "childrens": [] },
    {
      "label": "南和县",
      "value": "1225",
      "childrens": [] },
    {
      "label": "宁晋县",
      "value": "1226",
      "childrens": [] },
    {
      "label": "巨鹿县",
      "value": "1227",
      "childrens": [] },
    {
      "label": "新河县",
      "value": "1228",
      "childrens": [] },
    {
      "label": "广宗县",
      "value": "1229",
      "childrens": [] },
    {
      "label": "平乡县",
      "value": "1230",
      "childrens": [] },
    {
      "label": "威县",
      "value": "1231",
      "childrens": [] },
    {
      "label": "清河县",
      "value": "1232",
      "childrens": [] },
    {
      "label": "临西县",
      "value": "1233",
      "childrens": [] }] },

  {
    "label": "张家口市",
    "value": "148",
    "childrens": [{
      "label": "桥西区",
      "value": "1234",
      "childrens": [] },
    {
      "label": "桥东区",
      "value": "1235",
      "childrens": [] },
    {
      "label": "宣化区",
      "value": "1236",
      "childrens": [] },
    {
      "label": "下花园区",
      "value": "1237",
      "childrens": [] },
    {
      "label": "宣化县",
      "value": "1238",
      "childrens": [] },
    {
      "label": "张北县",
      "value": "1239",
      "childrens": [] },
    {
      "label": "康保县",
      "value": "1240",
      "childrens": [] },
    {
      "label": "沽源县",
      "value": "1241",
      "childrens": [] },
    {
      "label": "尚义县",
      "value": "1242",
      "childrens": [] },
    {
      "label": "蔚县",
      "value": "1243",
      "childrens": [] },
    {
      "label": "阳原县",
      "value": "1244",
      "childrens": [] },
    {
      "label": "怀安县",
      "value": "1245",
      "childrens": [] },
    {
      "label": "万全县",
      "value": "1246",
      "childrens": [] },
    {
      "label": "怀来县",
      "value": "1247",
      "childrens": [] },
    {
      "label": "涿鹿县",
      "value": "1248",
      "childrens": [] },
    {
      "label": "赤城县",
      "value": "1249",
      "childrens": [] },
    {
      "label": "崇礼县",
      "value": "1250",
      "childrens": [] }] }] },


{
  "label": "河南省",
  "value": "11",
  "childrens": [{
    "label": "郑州市",
    "value": "149",
    "childrens": [{
      "label": "金水区",
      "value": "1251",
      "childrens": [] },
    {
      "label": "邙山区",
      "value": "1252",
      "childrens": [] },
    {
      "label": "二七区",
      "value": "1253",
      "childrens": [] },
    {
      "label": "管城区",
      "value": "1254",
      "childrens": [] },
    {
      "label": "中原区",
      "value": "1255",
      "childrens": [] },
    {
      "label": "上街区",
      "value": "1256",
      "childrens": [] },
    {
      "label": "惠济区",
      "value": "1257",
      "childrens": [] },
    {
      "label": "郑东新区",
      "value": "1258",
      "childrens": [] },
    {
      "label": "经济技术开发区",
      "value": "1259",
      "childrens": [] },
    {
      "label": "高新开发区",
      "value": "1260",
      "childrens": [] },
    {
      "label": "出口加工区",
      "value": "1261",
      "childrens": [] },
    {
      "label": "巩义市",
      "value": "1262",
      "childrens": [] },
    {
      "label": "荥阳市",
      "value": "1263",
      "childrens": [] },
    {
      "label": "新密市",
      "value": "1264",
      "childrens": [] },
    {
      "label": "新郑市",
      "value": "1265",
      "childrens": [] },
    {
      "label": "登封市",
      "value": "1266",
      "childrens": [] },
    {
      "label": "中牟县",
      "value": "1267",
      "childrens": [] }] },

  {
    "label": "洛阳市",
    "value": "150",
    "childrens": [{
      "label": "西工区",
      "value": "1268",
      "childrens": [] },
    {
      "label": "老城区",
      "value": "1269",
      "childrens": [] },
    {
      "label": "涧西区",
      "value": "1270",
      "childrens": [] },
    {
      "label": "瀍河回族区",
      "value": "1271",
      "childrens": [] },
    {
      "label": "洛龙区",
      "value": "1272",
      "childrens": [] },
    {
      "label": "吉利区",
      "value": "1273",
      "childrens": [] },
    {
      "label": "偃师市",
      "value": "1274",
      "childrens": [] },
    {
      "label": "孟津县",
      "value": "1275",
      "childrens": [] },
    {
      "label": "新安县",
      "value": "1276",
      "childrens": [] },
    {
      "label": "栾川县",
      "value": "1277",
      "childrens": [] },
    {
      "label": "嵩县",
      "value": "1278",
      "childrens": [] },
    {
      "label": "汝阳县",
      "value": "1279",
      "childrens": [] },
    {
      "label": "宜阳县",
      "value": "1280",
      "childrens": [] },
    {
      "label": "洛宁县",
      "value": "1281",
      "childrens": [] },
    {
      "label": "伊川县",
      "value": "1282",
      "childrens": [] }] },

  {
    "label": "开封市",
    "value": "151",
    "childrens": [{
      "label": "鼓楼区",
      "value": "1283",
      "childrens": [] },
    {
      "label": "龙亭区",
      "value": "1284",
      "childrens": [] },
    {
      "label": "顺河回族区",
      "value": "1285",
      "childrens": [] },
    {
      "label": "金明区",
      "value": "1286",
      "childrens": [] },
    {
      "label": "禹王台区",
      "value": "1287",
      "childrens": [] },
    {
      "label": "杞县",
      "value": "1288",
      "childrens": [] },
    {
      "label": "通许县",
      "value": "1289",
      "childrens": [] },
    {
      "label": "尉氏县",
      "value": "1290",
      "childrens": [] },
    {
      "label": "开封县",
      "value": "1291",
      "childrens": [] },
    {
      "label": "兰考县",
      "value": "1292",
      "childrens": [] }] },

  {
    "label": "安阳市",
    "value": "152",
    "childrens": [{
      "label": "北关区",
      "value": "1293",
      "childrens": [] },
    {
      "label": "文峰区",
      "value": "1294",
      "childrens": [] },
    {
      "label": "殷都区",
      "value": "1295",
      "childrens": [] },
    {
      "label": "龙安区",
      "value": "1296",
      "childrens": [] },
    {
      "label": "林州市",
      "value": "1297",
      "childrens": [] },
    {
      "label": "安阳县",
      "value": "1298",
      "childrens": [] },
    {
      "label": "汤阴县",
      "value": "1299",
      "childrens": [] },
    {
      "label": "滑县",
      "value": "1300",
      "childrens": [] },
    {
      "label": "内黄县",
      "value": "1301",
      "childrens": [] }] },

  {
    "label": "鹤壁市",
    "value": "153",
    "childrens": [{
      "label": "淇滨区",
      "value": "1302",
      "childrens": [] },
    {
      "label": "山城区",
      "value": "1303",
      "childrens": [] },
    {
      "label": "鹤山区",
      "value": "1304",
      "childrens": [] },
    {
      "label": "浚县",
      "value": "1305",
      "childrens": [] },
    {
      "label": "淇县",
      "value": "1306",
      "childrens": [] }] },

  {
    "label": "济源市",
    "value": "154",
    "childrens": [{
      "label": "济源市",
      "value": "1307",
      "childrens": [] }] },

  {
    "label": "焦作市",
    "value": "155",
    "childrens": [{
      "label": "解放区",
      "value": "1308",
      "childrens": [] },
    {
      "label": "中站区",
      "value": "1309",
      "childrens": [] },
    {
      "label": "马村区",
      "value": "1310",
      "childrens": [] },
    {
      "label": "山阳区",
      "value": "1311",
      "childrens": [] },
    {
      "label": "沁阳市",
      "value": "1312",
      "childrens": [] },
    {
      "label": "孟州市",
      "value": "1313",
      "childrens": [] },
    {
      "label": "修武县",
      "value": "1314",
      "childrens": [] },
    {
      "label": "博爱县",
      "value": "1315",
      "childrens": [] },
    {
      "label": "武陟县",
      "value": "1316",
      "childrens": [] },
    {
      "label": "温县",
      "value": "1317",
      "childrens": [] }] },

  {
    "label": "南阳市",
    "value": "156",
    "childrens": [{
      "label": "卧龙区",
      "value": "1318",
      "childrens": [] },
    {
      "label": "宛城区",
      "value": "1319",
      "childrens": [] },
    {
      "label": "邓州市",
      "value": "1320",
      "childrens": [] },
    {
      "label": "南召县",
      "value": "1321",
      "childrens": [] },
    {
      "label": "方城县",
      "value": "1322",
      "childrens": [] },
    {
      "label": "西峡县",
      "value": "1323",
      "childrens": [] },
    {
      "label": "镇平县",
      "value": "1324",
      "childrens": [] },
    {
      "label": "内乡县",
      "value": "1325",
      "childrens": [] },
    {
      "label": "淅川县",
      "value": "1326",
      "childrens": [] },
    {
      "label": "社旗县",
      "value": "1327",
      "childrens": [] },
    {
      "label": "唐河县",
      "value": "1328",
      "childrens": [] },
    {
      "label": "新野县",
      "value": "1329",
      "childrens": [] },
    {
      "label": "桐柏县",
      "value": "1330",
      "childrens": [] }] },

  {
    "label": "平顶山市",
    "value": "157",
    "childrens": [{
      "label": "新华区",
      "value": "1331",
      "childrens": [] },
    {
      "label": "卫东区",
      "value": "1332",
      "childrens": [] },
    {
      "label": "湛河区",
      "value": "1333",
      "childrens": [] },
    {
      "label": "石龙区",
      "value": "1334",
      "childrens": [] },
    {
      "label": "舞钢市",
      "value": "1335",
      "childrens": [] },
    {
      "label": "汝州市",
      "value": "1336",
      "childrens": [] },
    {
      "label": "宝丰县",
      "value": "1337",
      "childrens": [] },
    {
      "label": "叶县",
      "value": "1338",
      "childrens": [] },
    {
      "label": "鲁山县",
      "value": "1339",
      "childrens": [] },
    {
      "label": "郏县",
      "value": "1340",
      "childrens": [] }] },

  {
    "label": "三门峡市",
    "value": "158",
    "childrens": [{
      "label": "湖滨区",
      "value": "1341",
      "childrens": [] },
    {
      "label": "义马市",
      "value": "1342",
      "childrens": [] },
    {
      "label": "灵宝市",
      "value": "1343",
      "childrens": [] },
    {
      "label": "渑池县",
      "value": "1344",
      "childrens": [] },
    {
      "label": "陕县",
      "value": "1345",
      "childrens": [] },
    {
      "label": "卢氏县",
      "value": "1346",
      "childrens": [] }] },

  {
    "label": "商丘市",
    "value": "159",
    "childrens": [{
      "label": "梁园区",
      "value": "1347",
      "childrens": [] },
    {
      "label": "睢阳区",
      "value": "1348",
      "childrens": [] },
    {
      "label": "永城市",
      "value": "1349",
      "childrens": [] },
    {
      "label": "民权县",
      "value": "1350",
      "childrens": [] },
    {
      "label": "睢县",
      "value": "1351",
      "childrens": [] },
    {
      "label": "宁陵县",
      "value": "1352",
      "childrens": [] },
    {
      "label": "虞城县",
      "value": "1353",
      "childrens": [] },
    {
      "label": "柘城县",
      "value": "1354",
      "childrens": [] },
    {
      "label": "夏邑县",
      "value": "1355",
      "childrens": [] }] },

  {
    "label": "新乡市",
    "value": "160",
    "childrens": [{
      "label": "卫滨区",
      "value": "1356",
      "childrens": [] },
    {
      "label": "红旗区",
      "value": "1357",
      "childrens": [] },
    {
      "label": "凤泉区",
      "value": "1358",
      "childrens": [] },
    {
      "label": "牧野区",
      "value": "1359",
      "childrens": [] },
    {
      "label": "卫辉市",
      "value": "1360",
      "childrens": [] },
    {
      "label": "辉县市",
      "value": "1361",
      "childrens": [] },
    {
      "label": "新乡县",
      "value": "1362",
      "childrens": [] },
    {
      "label": "获嘉县",
      "value": "1363",
      "childrens": [] },
    {
      "label": "原阳县",
      "value": "1364",
      "childrens": [] },
    {
      "label": "延津县",
      "value": "1365",
      "childrens": [] },
    {
      "label": "封丘县",
      "value": "1366",
      "childrens": [] },
    {
      "label": "长垣县",
      "value": "1367",
      "childrens": [] }] },

  {
    "label": "信阳市",
    "value": "161",
    "childrens": [{
      "label": "浉河区",
      "value": "1368",
      "childrens": [] },
    {
      "label": "平桥区",
      "value": "1369",
      "childrens": [] },
    {
      "label": "罗山县",
      "value": "1370",
      "childrens": [] },
    {
      "label": "光山县",
      "value": "1371",
      "childrens": [] },
    {
      "label": "新县",
      "value": "1372",
      "childrens": [] },
    {
      "label": "商城县",
      "value": "1373",
      "childrens": [] },
    {
      "label": "固始县",
      "value": "1374",
      "childrens": [] },
    {
      "label": "潢川县",
      "value": "1375",
      "childrens": [] },
    {
      "label": "淮滨县",
      "value": "1376",
      "childrens": [] },
    {
      "label": "息县",
      "value": "1377",
      "childrens": [] }] },

  {
    "label": "许昌市",
    "value": "162",
    "childrens": [{
      "label": "魏都区",
      "value": "1378",
      "childrens": [] },
    {
      "label": "禹州市",
      "value": "1379",
      "childrens": [] },
    {
      "label": "长葛市",
      "value": "1380",
      "childrens": [] },
    {
      "label": "许昌县",
      "value": "1381",
      "childrens": [] },
    {
      "label": "鄢陵县",
      "value": "1382",
      "childrens": [] },
    {
      "label": "襄城县",
      "value": "1383",
      "childrens": [] }] },

  {
    "label": "周口市",
    "value": "163",
    "childrens": [{
      "label": "川汇区",
      "value": "1384",
      "childrens": [] },
    {
      "label": "项城市",
      "value": "1385",
      "childrens": [] },
    {
      "label": "扶沟县",
      "value": "1386",
      "childrens": [] },
    {
      "label": "西华县",
      "value": "1387",
      "childrens": [] },
    {
      "label": "商水县",
      "value": "1388",
      "childrens": [] },
    {
      "label": "沈丘县",
      "value": "1389",
      "childrens": [] },
    {
      "label": "郸城县",
      "value": "1390",
      "childrens": [] },
    {
      "label": "淮阳县",
      "value": "1391",
      "childrens": [] },
    {
      "label": "太康县",
      "value": "1392",
      "childrens": [] },
    {
      "label": "鹿邑县",
      "value": "1393",
      "childrens": [] }] },

  {
    "label": "驻马店市",
    "value": "164",
    "childrens": [{
      "label": "驿城区",
      "value": "1394",
      "childrens": [] },
    {
      "label": "西平县",
      "value": "1395",
      "childrens": [] },
    {
      "label": "上蔡县",
      "value": "1396",
      "childrens": [] },
    {
      "label": "平舆县",
      "value": "1397",
      "childrens": [] },
    {
      "label": "正阳县",
      "value": "1398",
      "childrens": [] },
    {
      "label": "确山县",
      "value": "1399",
      "childrens": [] },
    {
      "label": "泌阳县",
      "value": "1400",
      "childrens": [] },
    {
      "label": "汝南县",
      "value": "1401",
      "childrens": [] },
    {
      "label": "遂平县",
      "value": "1402",
      "childrens": [] },
    {
      "label": "新蔡县",
      "value": "1403",
      "childrens": [] }] },

  {
    "label": "漯河市",
    "value": "165",
    "childrens": [{
      "label": "郾城区",
      "value": "1404",
      "childrens": [] },
    {
      "label": "源汇区",
      "value": "1405",
      "childrens": [] },
    {
      "label": "召陵区",
      "value": "1406",
      "childrens": [] },
    {
      "label": "舞阳县",
      "value": "1407",
      "childrens": [] },
    {
      "label": "临颍县",
      "value": "1408",
      "childrens": [] }] },

  {
    "label": "濮阳市",
    "value": "166",
    "childrens": [{
      "label": "华龙区",
      "value": "1409",
      "childrens": [] },
    {
      "label": "清丰县",
      "value": "1410",
      "childrens": [] },
    {
      "label": "南乐县",
      "value": "1411",
      "childrens": [] },
    {
      "label": "范县",
      "value": "1412",
      "childrens": [] },
    {
      "label": "台前县",
      "value": "1413",
      "childrens": [] },
    {
      "label": "濮阳县",
      "value": "1414",
      "childrens": [] }] }] },


{
  "label": "黑龙江省",
  "value": "12",
  "childrens": [{
    "label": "哈尔滨市",
    "value": "167",
    "childrens": [{
      "label": "道里区",
      "value": "1415",
      "childrens": [] },
    {
      "label": "南岗区",
      "value": "1416",
      "childrens": [] },
    {
      "label": "动力区",
      "value": "1417",
      "childrens": [] },
    {
      "label": "平房区",
      "value": "1418",
      "childrens": [] },
    {
      "label": "香坊区",
      "value": "1419",
      "childrens": [] },
    {
      "label": "太平区",
      "value": "1420",
      "childrens": [] },
    {
      "label": "道外区",
      "value": "1421",
      "childrens": [] },
    {
      "label": "阿城区",
      "value": "1422",
      "childrens": [] },
    {
      "label": "呼兰区",
      "value": "1423",
      "childrens": [] },
    {
      "label": "松北区",
      "value": "1424",
      "childrens": [] },
    {
      "label": "尚志市",
      "value": "1425",
      "childrens": [] },
    {
      "label": "双城市",
      "value": "1426",
      "childrens": [] },
    {
      "label": "五常市",
      "value": "1427",
      "childrens": [] },
    {
      "label": "方正县",
      "value": "1428",
      "childrens": [] },
    {
      "label": "宾县",
      "value": "1429",
      "childrens": [] },
    {
      "label": "依兰县",
      "value": "1430",
      "childrens": [] },
    {
      "label": "巴彦县",
      "value": "1431",
      "childrens": [] },
    {
      "label": "通河县",
      "value": "1432",
      "childrens": [] },
    {
      "label": "木兰县",
      "value": "1433",
      "childrens": [] },
    {
      "label": "延寿县",
      "value": "1434",
      "childrens": [] }] },

  {
    "label": "大庆市",
    "value": "168",
    "childrens": [{
      "label": "萨尔图区",
      "value": "1435",
      "childrens": [] },
    {
      "label": "红岗区",
      "value": "1436",
      "childrens": [] },
    {
      "label": "龙凤区",
      "value": "1437",
      "childrens": [] },
    {
      "label": "让胡路区",
      "value": "1438",
      "childrens": [] },
    {
      "label": "大同区",
      "value": "1439",
      "childrens": [] },
    {
      "label": "肇州县",
      "value": "1440",
      "childrens": [] },
    {
      "label": "肇源县",
      "value": "1441",
      "childrens": [] },
    {
      "label": "林甸县",
      "value": "1442",
      "childrens": [] },
    {
      "label": "杜尔伯特",
      "value": "1443",
      "childrens": [] }] },

  {
    "label": "大兴安岭市",
    "value": "169",
    "childrens": [{
      "label": "呼玛县",
      "value": "1444",
      "childrens": [] },
    {
      "label": "漠河县",
      "value": "1445",
      "childrens": [] },
    {
      "label": "塔河县",
      "value": "1446",
      "childrens": [] }] },

  {
    "label": "鹤岗市",
    "value": "170",
    "childrens": [{
      "label": "兴山区",
      "value": "1447",
      "childrens": [] },
    {
      "label": "工农区",
      "value": "1448",
      "childrens": [] },
    {
      "label": "南山区",
      "value": "1449",
      "childrens": [] },
    {
      "label": "兴安区",
      "value": "1450",
      "childrens": [] },
    {
      "label": "向阳区",
      "value": "1451",
      "childrens": [] },
    {
      "label": "东山区",
      "value": "1452",
      "childrens": [] },
    {
      "label": "萝北县",
      "value": "1453",
      "childrens": [] },
    {
      "label": "绥滨县",
      "value": "1454",
      "childrens": [] }] },

  {
    "label": "黑河市",
    "value": "171",
    "childrens": [{
      "label": "爱辉区",
      "value": "1455",
      "childrens": [] },
    {
      "label": "五大连池市",
      "value": "1456",
      "childrens": [] },
    {
      "label": "北安市",
      "value": "1457",
      "childrens": [] },
    {
      "label": "嫩江县",
      "value": "1458",
      "childrens": [] },
    {
      "label": "逊克县",
      "value": "1459",
      "childrens": [] },
    {
      "label": "孙吴县",
      "value": "1460",
      "childrens": [] }] },

  {
    "label": "鸡西市",
    "value": "172",
    "childrens": [{
      "label": "鸡冠区",
      "value": "1461",
      "childrens": [] },
    {
      "label": "恒山区",
      "value": "1462",
      "childrens": [] },
    {
      "label": "城子河区",
      "value": "1463",
      "childrens": [] },
    {
      "label": "滴道区",
      "value": "1464",
      "childrens": [] },
    {
      "label": "梨树区",
      "value": "1465",
      "childrens": [] },
    {
      "label": "虎林市",
      "value": "1466",
      "childrens": [] },
    {
      "label": "密山市",
      "value": "1467",
      "childrens": [] },
    {
      "label": "鸡东县",
      "value": "1468",
      "childrens": [] }] },

  {
    "label": "佳木斯市",
    "value": "173",
    "childrens": [{
      "label": "前进区",
      "value": "1469",
      "childrens": [] },
    {
      "label": "郊区",
      "value": "1470",
      "childrens": [] },
    {
      "label": "向阳区",
      "value": "1471",
      "childrens": [] },
    {
      "label": "东风区",
      "value": "1472",
      "childrens": [] },
    {
      "label": "同江市",
      "value": "1473",
      "childrens": [] },
    {
      "label": "富锦市",
      "value": "1474",
      "childrens": [] },
    {
      "label": "桦南县",
      "value": "1475",
      "childrens": [] },
    {
      "label": "桦川县",
      "value": "1476",
      "childrens": [] },
    {
      "label": "汤原县",
      "value": "1477",
      "childrens": [] },
    {
      "label": "抚远县",
      "value": "1478",
      "childrens": [] }] },

  {
    "label": "牡丹江市",
    "value": "174",
    "childrens": [{
      "label": "爱民区",
      "value": "1479",
      "childrens": [] },
    {
      "label": "东安区",
      "value": "1480",
      "childrens": [] },
    {
      "label": "阳明区",
      "value": "1481",
      "childrens": [] },
    {
      "label": "西安区",
      "value": "1482",
      "childrens": [] },
    {
      "label": "绥芬河市",
      "value": "1483",
      "childrens": [] },
    {
      "label": "海林市",
      "value": "1484",
      "childrens": [] },
    {
      "label": "宁安市",
      "value": "1485",
      "childrens": [] },
    {
      "label": "穆棱市",
      "value": "1486",
      "childrens": [] },
    {
      "label": "东宁县",
      "value": "1487",
      "childrens": [] },
    {
      "label": "林口县",
      "value": "1488",
      "childrens": [] }] },

  {
    "label": "七台河市",
    "value": "175",
    "childrens": [{
      "label": "桃山区",
      "value": "1489",
      "childrens": [] },
    {
      "label": "新兴区",
      "value": "1490",
      "childrens": [] },
    {
      "label": "茄子河区",
      "value": "1491",
      "childrens": [] },
    {
      "label": "勃利县",
      "value": "1492",
      "childrens": [] }] },

  {
    "label": "齐齐哈尔市",
    "value": "176",
    "childrens": [{
      "label": "龙沙区",
      "value": "1493",
      "childrens": [] },
    {
      "label": "昂昂溪区",
      "value": "1494",
      "childrens": [] },
    {
      "label": "铁峰区",
      "value": "1495",
      "childrens": [] },
    {
      "label": "建华区",
      "value": "1496",
      "childrens": [] },
    {
      "label": "富拉尔基区",
      "value": "1497",
      "childrens": [] },
    {
      "label": "碾子山区",
      "value": "1498",
      "childrens": [] },
    {
      "label": "梅里斯达斡尔区",
      "value": "1499",
      "childrens": [] },
    {
      "label": "讷河市",
      "value": "1500",
      "childrens": [] },
    {
      "label": "龙江县",
      "value": "1501",
      "childrens": [] },
    {
      "label": "依安县",
      "value": "1502",
      "childrens": [] },
    {
      "label": "泰来县",
      "value": "1503",
      "childrens": [] },
    {
      "label": "甘南县",
      "value": "1504",
      "childrens": [] },
    {
      "label": "富裕县",
      "value": "1505",
      "childrens": [] },
    {
      "label": "克山县",
      "value": "1506",
      "childrens": [] },
    {
      "label": "克东县",
      "value": "1507",
      "childrens": [] },
    {
      "label": "拜泉县",
      "value": "1508",
      "childrens": [] }] },

  {
    "label": "双鸭山市",
    "value": "177",
    "childrens": [{
      "label": "尖山区",
      "value": "1509",
      "childrens": [] },
    {
      "label": "岭东区",
      "value": "1510",
      "childrens": [] },
    {
      "label": "四方台区",
      "value": "1511",
      "childrens": [] },
    {
      "label": "宝山区",
      "value": "1512",
      "childrens": [] },
    {
      "label": "集贤县",
      "value": "1513",
      "childrens": [] },
    {
      "label": "友谊县",
      "value": "1514",
      "childrens": [] },
    {
      "label": "宝清县",
      "value": "1515",
      "childrens": [] },
    {
      "label": "饶河县",
      "value": "1516",
      "childrens": [] }] },

  {
    "label": "绥化市",
    "value": "178",
    "childrens": [{
      "label": "北林区",
      "value": "1517",
      "childrens": [] },
    {
      "label": "安达市",
      "value": "1518",
      "childrens": [] },
    {
      "label": "肇东市",
      "value": "1519",
      "childrens": [] },
    {
      "label": "海伦市",
      "value": "1520",
      "childrens": [] },
    {
      "label": "望奎县",
      "value": "1521",
      "childrens": [] },
    {
      "label": "兰西县",
      "value": "1522",
      "childrens": [] },
    {
      "label": "青冈县",
      "value": "1523",
      "childrens": [] },
    {
      "label": "庆安县",
      "value": "1524",
      "childrens": [] },
    {
      "label": "明水县",
      "value": "1525",
      "childrens": [] },
    {
      "label": "绥棱县",
      "value": "1526",
      "childrens": [] }] },

  {
    "label": "伊春市",
    "value": "179",
    "childrens": [{
      "label": "伊春区",
      "value": "1527",
      "childrens": [] },
    {
      "label": "带岭区",
      "value": "1528",
      "childrens": [] },
    {
      "label": "南岔区",
      "value": "1529",
      "childrens": [] },
    {
      "label": "金山屯区",
      "value": "1530",
      "childrens": [] },
    {
      "label": "西林区",
      "value": "1531",
      "childrens": [] },
    {
      "label": "美溪区",
      "value": "1532",
      "childrens": [] },
    {
      "label": "乌马河区",
      "value": "1533",
      "childrens": [] },
    {
      "label": "翠峦区",
      "value": "1534",
      "childrens": [] },
    {
      "label": "友好区",
      "value": "1535",
      "childrens": [] },
    {
      "label": "上甘岭区",
      "value": "1536",
      "childrens": [] },
    {
      "label": "五营区",
      "value": "1537",
      "childrens": [] },
    {
      "label": "红星区",
      "value": "1538",
      "childrens": [] },
    {
      "label": "新青区",
      "value": "1539",
      "childrens": [] },
    {
      "label": "汤旺河区",
      "value": "1540",
      "childrens": [] },
    {
      "label": "乌伊岭区",
      "value": "1541",
      "childrens": [] },
    {
      "label": "铁力市",
      "value": "1542",
      "childrens": [] },
    {
      "label": "嘉荫县",
      "value": "1543",
      "childrens": [] }] }] },


{
  "label": "湖北省",
  "value": "13",
  "childrens": [{
    "label": "武汉市",
    "value": "180",
    "childrens": [{
      "label": "江岸区",
      "value": "1544",
      "childrens": [] },
    {
      "label": "武昌区",
      "value": "1545",
      "childrens": [] },
    {
      "label": "江汉区",
      "value": "1546",
      "childrens": [] },
    {
      "label": "硚口区",
      "value": "1547",
      "childrens": [] },
    {
      "label": "汉阳区",
      "value": "1548",
      "childrens": [] },
    {
      "label": "青山区",
      "value": "1549",
      "childrens": [] },
    {
      "label": "洪山区",
      "value": "1550",
      "childrens": [] },
    {
      "label": "东西湖区",
      "value": "1551",
      "childrens": [] },
    {
      "label": "汉南区",
      "value": "1552",
      "childrens": [] },
    {
      "label": "蔡甸区",
      "value": "1553",
      "childrens": [] },
    {
      "label": "江夏区",
      "value": "1554",
      "childrens": [] },
    {
      "label": "黄陂区",
      "value": "1555",
      "childrens": [] },
    {
      "label": "新洲区",
      "value": "1556",
      "childrens": [] },
    {
      "label": "经济开发区",
      "value": "1557",
      "childrens": [] }] },

  {
    "label": "仙桃市",
    "value": "181",
    "childrens": [{
      "label": "仙桃市",
      "value": "1558",
      "childrens": [] }] },

  {
    "label": "鄂州市",
    "value": "182",
    "childrens": [{
      "label": "鄂城区",
      "value": "1559",
      "childrens": [] },
    {
      "label": "华容区",
      "value": "1560",
      "childrens": [] },
    {
      "label": "梁子湖区",
      "value": "1561",
      "childrens": [] }] },

  {
    "label": "黄冈市",
    "value": "183",
    "childrens": [{
      "label": "黄州区",
      "value": "1562",
      "childrens": [] },
    {
      "label": "麻城市",
      "value": "1563",
      "childrens": [] },
    {
      "label": "武穴市",
      "value": "1564",
      "childrens": [] },
    {
      "label": "团风县",
      "value": "1565",
      "childrens": [] },
    {
      "label": "红安县",
      "value": "1566",
      "childrens": [] },
    {
      "label": "罗田县",
      "value": "1567",
      "childrens": [] },
    {
      "label": "英山县",
      "value": "1568",
      "childrens": [] },
    {
      "label": "浠水县",
      "value": "1569",
      "childrens": [] },
    {
      "label": "蕲春县",
      "value": "1570",
      "childrens": [] },
    {
      "label": "黄梅县",
      "value": "1571",
      "childrens": [] }] },

  {
    "label": "黄石市",
    "value": "184",
    "childrens": [{
      "label": "黄石港区",
      "value": "1572",
      "childrens": [] },
    {
      "label": "西塞山区",
      "value": "1573",
      "childrens": [] },
    {
      "label": "下陆区",
      "value": "1574",
      "childrens": [] },
    {
      "label": "铁山区",
      "value": "1575",
      "childrens": [] },
    {
      "label": "大冶市",
      "value": "1576",
      "childrens": [] },
    {
      "label": "阳新县",
      "value": "1577",
      "childrens": [] }] },

  {
    "label": "荆门市",
    "value": "185",
    "childrens": [{
      "label": "东宝区",
      "value": "1578",
      "childrens": [] },
    {
      "label": "掇刀区",
      "value": "1579",
      "childrens": [] },
    {
      "label": "钟祥市",
      "value": "1580",
      "childrens": [] },
    {
      "label": "京山县",
      "value": "1581",
      "childrens": [] },
    {
      "label": "沙洋县",
      "value": "1582",
      "childrens": [] }] },

  {
    "label": "荆州市",
    "value": "186",
    "childrens": [{
      "label": "沙市区",
      "value": "1583",
      "childrens": [] },
    {
      "label": "荆州区",
      "value": "1584",
      "childrens": [] },
    {
      "label": "石首市",
      "value": "1585",
      "childrens": [] },
    {
      "label": "洪湖市",
      "value": "1586",
      "childrens": [] },
    {
      "label": "松滋市",
      "value": "1587",
      "childrens": [] },
    {
      "label": "公安县",
      "value": "1588",
      "childrens": [] },
    {
      "label": "监利县",
      "value": "1589",
      "childrens": [] },
    {
      "label": "江陵县",
      "value": "1590",
      "childrens": [] }] },

  {
    "label": "潜江市",
    "value": "187",
    "childrens": [{
      "label": "潜江市",
      "value": "1591",
      "childrens": [] }] },

  {
    "label": "神农架林区",
    "value": "188",
    "childrens": [{
      "label": "神农架林区",
      "value": "1592",
      "childrens": [] }] },

  {
    "label": "十堰市",
    "value": "189",
    "childrens": [{
      "label": "张湾区",
      "value": "1593",
      "childrens": [] },
    {
      "label": "茅箭区",
      "value": "1594",
      "childrens": [] },
    {
      "label": "丹江口市",
      "value": "1595",
      "childrens": [] },
    {
      "label": "郧县",
      "value": "1596",
      "childrens": [] },
    {
      "label": "郧西县",
      "value": "1597",
      "childrens": [] },
    {
      "label": "竹山县",
      "value": "1598",
      "childrens": [] },
    {
      "label": "竹溪县",
      "value": "1599",
      "childrens": [] },
    {
      "label": "房县",
      "value": "1600",
      "childrens": [] }] },

  {
    "label": "随州市",
    "value": "190",
    "childrens": [{
      "label": "曾都区",
      "value": "1601",
      "childrens": [] },
    {
      "label": "广水市",
      "value": "1602",
      "childrens": [] }] },

  {
    "label": "天门市",
    "value": "191",
    "childrens": [{
      "label": "天门市",
      "value": "1603",
      "childrens": [] }] },

  {
    "label": "咸宁市",
    "value": "192",
    "childrens": [{
      "label": "咸安区",
      "value": "1604",
      "childrens": [] },
    {
      "label": "赤壁市",
      "value": "1605",
      "childrens": [] },
    {
      "label": "嘉鱼县",
      "value": "1606",
      "childrens": [] },
    {
      "label": "通城县",
      "value": "1607",
      "childrens": [] },
    {
      "label": "崇阳县",
      "value": "1608",
      "childrens": [] },
    {
      "label": "通山县",
      "value": "1609",
      "childrens": [] }] },

  {
    "label": "襄樊市",
    "value": "193",
    "childrens": [{
      "label": "襄城区",
      "value": "1610",
      "childrens": [] },
    {
      "label": "樊城区",
      "value": "1611",
      "childrens": [] },
    {
      "label": "襄阳区",
      "value": "1612",
      "childrens": [] },
    {
      "label": "老河口市",
      "value": "1613",
      "childrens": [] },
    {
      "label": "枣阳市",
      "value": "1614",
      "childrens": [] },
    {
      "label": "宜城市",
      "value": "1615",
      "childrens": [] },
    {
      "label": "南漳县",
      "value": "1616",
      "childrens": [] },
    {
      "label": "谷城县",
      "value": "1617",
      "childrens": [] },
    {
      "label": "保康县",
      "value": "1618",
      "childrens": [] }] },

  {
    "label": "孝感市",
    "value": "194",
    "childrens": [{
      "label": "孝南区",
      "value": "1619",
      "childrens": [] },
    {
      "label": "应城市",
      "value": "1620",
      "childrens": [] },
    {
      "label": "安陆市",
      "value": "1621",
      "childrens": [] },
    {
      "label": "汉川市",
      "value": "1622",
      "childrens": [] },
    {
      "label": "孝昌县",
      "value": "1623",
      "childrens": [] },
    {
      "label": "大悟县",
      "value": "1624",
      "childrens": [] },
    {
      "label": "云梦县",
      "value": "1625",
      "childrens": [] }] },

  {
    "label": "宜昌市",
    "value": "195",
    "childrens": [{
      "label": "长阳",
      "value": "1626",
      "childrens": [] },
    {
      "label": "五峰",
      "value": "1627",
      "childrens": [] },
    {
      "label": "西陵区",
      "value": "1628",
      "childrens": [] },
    {
      "label": "伍家岗区",
      "value": "1629",
      "childrens": [] },
    {
      "label": "点军区",
      "value": "1630",
      "childrens": [] },
    {
      "label": "猇亭区",
      "value": "1631",
      "childrens": [] },
    {
      "label": "夷陵区",
      "value": "1632",
      "childrens": [] },
    {
      "label": "宜都市",
      "value": "1633",
      "childrens": [] },
    {
      "label": "当阳市",
      "value": "1634",
      "childrens": [] },
    {
      "label": "枝江市",
      "value": "1635",
      "childrens": [] },
    {
      "label": "远安县",
      "value": "1636",
      "childrens": [] },
    {
      "label": "兴山县",
      "value": "1637",
      "childrens": [] },
    {
      "label": "秭归县",
      "value": "1638",
      "childrens": [] }] },

  {
    "label": "恩施土家族苗族自治州",
    "value": "196",
    "childrens": [{
      "label": "恩施市",
      "value": "1639",
      "childrens": [] },
    {
      "label": "利川市",
      "value": "1640",
      "childrens": [] },
    {
      "label": "建始县",
      "value": "1641",
      "childrens": [] },
    {
      "label": "巴东县",
      "value": "1642",
      "childrens": [] },
    {
      "label": "宣恩县",
      "value": "1643",
      "childrens": [] },
    {
      "label": "咸丰县",
      "value": "1644",
      "childrens": [] },
    {
      "label": "来凤县",
      "value": "1645",
      "childrens": [] },
    {
      "label": "鹤峰县",
      "value": "1646",
      "childrens": [] }] }] },


{
  "label": "湖南省",
  "value": "14",
  "childrens": [{
    "label": "长沙市",
    "value": "197",
    "childrens": [{
      "label": "岳麓区",
      "value": "1647",
      "childrens": [] },
    {
      "label": "芙蓉区",
      "value": "1648",
      "childrens": [] },
    {
      "label": "天心区",
      "value": "1649",
      "childrens": [] },
    {
      "label": "开福区",
      "value": "1650",
      "childrens": [] },
    {
      "label": "雨花区",
      "value": "1651",
      "childrens": [] },
    {
      "label": "开发区",
      "value": "1652",
      "childrens": [] },
    {
      "label": "浏阳市",
      "value": "1653",
      "childrens": [] },
    {
      "label": "长沙县",
      "value": "1654",
      "childrens": [] },
    {
      "label": "望城县",
      "value": "1655",
      "childrens": [] },
    {
      "label": "宁乡县",
      "value": "1656",
      "childrens": [] }] },

  {
    "label": "张家界市",
    "value": "198",
    "childrens": [{
      "label": "永定区",
      "value": "1657",
      "childrens": [] },
    {
      "label": "武陵源区",
      "value": "1658",
      "childrens": [] },
    {
      "label": "慈利县",
      "value": "1659",
      "childrens": [] },
    {
      "label": "桑植县",
      "value": "1660",
      "childrens": [] }] },

  {
    "label": "常德市",
    "value": "199",
    "childrens": [{
      "label": "武陵区",
      "value": "1661",
      "childrens": [] },
    {
      "label": "鼎城区",
      "value": "1662",
      "childrens": [] },
    {
      "label": "津市市",
      "value": "1663",
      "childrens": [] },
    {
      "label": "安乡县",
      "value": "1664",
      "childrens": [] },
    {
      "label": "汉寿县",
      "value": "1665",
      "childrens": [] },
    {
      "label": "澧县",
      "value": "1666",
      "childrens": [] },
    {
      "label": "临澧县",
      "value": "1667",
      "childrens": [] },
    {
      "label": "桃源县",
      "value": "1668",
      "childrens": [] },
    {
      "label": "石门县",
      "value": "1669",
      "childrens": [] }] },

  {
    "label": "郴州市",
    "value": "200",
    "childrens": [{
      "label": "北湖区",
      "value": "1670",
      "childrens": [] },
    {
      "label": "苏仙区",
      "value": "1671",
      "childrens": [] },
    {
      "label": "资兴市",
      "value": "1672",
      "childrens": [] },
    {
      "label": "桂阳县",
      "value": "1673",
      "childrens": [] },
    {
      "label": "宜章县",
      "value": "1674",
      "childrens": [] },
    {
      "label": "永兴县",
      "value": "1675",
      "childrens": [] },
    {
      "label": "嘉禾县",
      "value": "1676",
      "childrens": [] },
    {
      "label": "临武县",
      "value": "1677",
      "childrens": [] },
    {
      "label": "汝城县",
      "value": "1678",
      "childrens": [] },
    {
      "label": "桂东县",
      "value": "1679",
      "childrens": [] },
    {
      "label": "安仁县",
      "value": "1680",
      "childrens": [] }] },

  {
    "label": "衡阳市",
    "value": "201",
    "childrens": [{
      "label": "雁峰区",
      "value": "1681",
      "childrens": [] },
    {
      "label": "珠晖区",
      "value": "1682",
      "childrens": [] },
    {
      "label": "石鼓区",
      "value": "1683",
      "childrens": [] },
    {
      "label": "蒸湘区",
      "value": "1684",
      "childrens": [] },
    {
      "label": "南岳区",
      "value": "1685",
      "childrens": [] },
    {
      "label": "耒阳市",
      "value": "1686",
      "childrens": [] },
    {
      "label": "常宁市",
      "value": "1687",
      "childrens": [] },
    {
      "label": "衡阳县",
      "value": "1688",
      "childrens": [] },
    {
      "label": "衡南县",
      "value": "1689",
      "childrens": [] },
    {
      "label": "衡山县",
      "value": "1690",
      "childrens": [] },
    {
      "label": "衡东县",
      "value": "1691",
      "childrens": [] },
    {
      "label": "祁东县",
      "value": "1692",
      "childrens": [] }] },

  {
    "label": "怀化市",
    "value": "202",
    "childrens": [{
      "label": "鹤城区",
      "value": "1693",
      "childrens": [] },
    {
      "label": "靖州",
      "value": "1694",
      "childrens": [] },
    {
      "label": "麻阳",
      "value": "1695",
      "childrens": [] },
    {
      "label": "通道",
      "value": "1696",
      "childrens": [] },
    {
      "label": "新晃",
      "value": "1697",
      "childrens": [] },
    {
      "label": "芷江",
      "value": "1698",
      "childrens": [] },
    {
      "label": "沅陵县",
      "value": "1699",
      "childrens": [] },
    {
      "label": "辰溪县",
      "value": "1700",
      "childrens": [] },
    {
      "label": "溆浦县",
      "value": "1701",
      "childrens": [] },
    {
      "label": "中方县",
      "value": "1702",
      "childrens": [] },
    {
      "label": "会同县",
      "value": "1703",
      "childrens": [] },
    {
      "label": "洪江市",
      "value": "1704",
      "childrens": [] }] },

  {
    "label": "娄底市",
    "value": "203",
    "childrens": [{
      "label": "娄星区",
      "value": "1705",
      "childrens": [] },
    {
      "label": "冷水江市",
      "value": "1706",
      "childrens": [] },
    {
      "label": "涟源市",
      "value": "1707",
      "childrens": [] },
    {
      "label": "双峰县",
      "value": "1708",
      "childrens": [] },
    {
      "label": "新化县",
      "value": "1709",
      "childrens": [] }] },

  {
    "label": "邵阳市",
    "value": "204",
    "childrens": [{
      "label": "城步",
      "value": "1710",
      "childrens": [] },
    {
      "label": "双清区",
      "value": "1711",
      "childrens": [] },
    {
      "label": "大祥区",
      "value": "1712",
      "childrens": [] },
    {
      "label": "北塔区",
      "value": "1713",
      "childrens": [] },
    {
      "label": "武冈市",
      "value": "1714",
      "childrens": [] },
    {
      "label": "邵东县",
      "value": "1715",
      "childrens": [] },
    {
      "label": "新邵县",
      "value": "1716",
      "childrens": [] },
    {
      "label": "邵阳县",
      "value": "1717",
      "childrens": [] },
    {
      "label": "隆回县",
      "value": "1718",
      "childrens": [] },
    {
      "label": "洞口县",
      "value": "1719",
      "childrens": [] },
    {
      "label": "绥宁县",
      "value": "1720",
      "childrens": [] },
    {
      "label": "新宁县",
      "value": "1721",
      "childrens": [] }] },

  {
    "label": "湘潭市",
    "value": "205",
    "childrens": [{
      "label": "岳塘区",
      "value": "1722",
      "childrens": [] },
    {
      "label": "雨湖区",
      "value": "1723",
      "childrens": [] },
    {
      "label": "湘乡市",
      "value": "1724",
      "childrens": [] },
    {
      "label": "韶山市",
      "value": "1725",
      "childrens": [] },
    {
      "label": "湘潭县",
      "value": "1726",
      "childrens": [] }] },

  {
    "label": "湘西土家族苗族自治州",
    "value": "206",
    "childrens": [{
      "label": "吉首市",
      "value": "1727",
      "childrens": [] },
    {
      "label": "泸溪县",
      "value": "1728",
      "childrens": [] },
    {
      "label": "凤凰县",
      "value": "1729",
      "childrens": [] },
    {
      "label": "花垣县",
      "value": "1730",
      "childrens": [] },
    {
      "label": "保靖县",
      "value": "1731",
      "childrens": [] },
    {
      "label": "古丈县",
      "value": "1732",
      "childrens": [] },
    {
      "label": "永顺县",
      "value": "1733",
      "childrens": [] },
    {
      "label": "龙山县",
      "value": "1734",
      "childrens": [] }] },

  {
    "label": "益阳市",
    "value": "207",
    "childrens": [{
      "label": "赫山区",
      "value": "1735",
      "childrens": [] },
    {
      "label": "资阳区",
      "value": "1736",
      "childrens": [] },
    {
      "label": "沅江市",
      "value": "1737",
      "childrens": [] },
    {
      "label": "南县",
      "value": "1738",
      "childrens": [] },
    {
      "label": "桃江县",
      "value": "1739",
      "childrens": [] },
    {
      "label": "安化县",
      "value": "1740",
      "childrens": [] }] },

  {
    "label": "永州市",
    "value": "208",
    "childrens": [{
      "label": "江华",
      "value": "1741",
      "childrens": [] },
    {
      "label": "冷水滩区",
      "value": "1742",
      "childrens": [] },
    {
      "label": "零陵区",
      "value": "1743",
      "childrens": [] },
    {
      "label": "祁阳县",
      "value": "1744",
      "childrens": [] },
    {
      "label": "东安县",
      "value": "1745",
      "childrens": [] },
    {
      "label": "双牌县",
      "value": "1746",
      "childrens": [] },
    {
      "label": "道县",
      "value": "1747",
      "childrens": [] },
    {
      "label": "江永县",
      "value": "1748",
      "childrens": [] },
    {
      "label": "宁远县",
      "value": "1749",
      "childrens": [] },
    {
      "label": "蓝山县",
      "value": "1750",
      "childrens": [] },
    {
      "label": "新田县",
      "value": "1751",
      "childrens": [] }] },

  {
    "label": "岳阳市",
    "value": "209",
    "childrens": [{
      "label": "岳阳楼区",
      "value": "1752",
      "childrens": [] },
    {
      "label": "君山区",
      "value": "1753",
      "childrens": [] },
    {
      "label": "云溪区",
      "value": "1754",
      "childrens": [] },
    {
      "label": "汨罗市",
      "value": "1755",
      "childrens": [] },
    {
      "label": "临湘市",
      "value": "1756",
      "childrens": [] },
    {
      "label": "岳阳县",
      "value": "1757",
      "childrens": [] },
    {
      "label": "华容县",
      "value": "1758",
      "childrens": [] },
    {
      "label": "湘阴县",
      "value": "1759",
      "childrens": [] },
    {
      "label": "平江县",
      "value": "1760",
      "childrens": [] }] },

  {
    "label": "株洲市",
    "value": "210",
    "childrens": [{
      "label": "天元区",
      "value": "1761",
      "childrens": [] },
    {
      "label": "荷塘区",
      "value": "1762",
      "childrens": [] },
    {
      "label": "芦淞区",
      "value": "1763",
      "childrens": [] },
    {
      "label": "石峰区",
      "value": "1764",
      "childrens": [] },
    {
      "label": "醴陵市",
      "value": "1765",
      "childrens": [] },
    {
      "label": "株洲县",
      "value": "1766",
      "childrens": [] },
    {
      "label": "攸县",
      "value": "1767",
      "childrens": [] },
    {
      "label": "茶陵县",
      "value": "1768",
      "childrens": [] },
    {
      "label": "炎陵县",
      "value": "1769",
      "childrens": [] }] }] },


{
  "label": "吉林省",
  "value": "15",
  "childrens": [{
    "label": "长春市",
    "value": "211",
    "childrens": [{
      "label": "朝阳区",
      "value": "1770",
      "childrens": [] },
    {
      "label": "宽城区",
      "value": "1771",
      "childrens": [] },
    {
      "label": "二道区",
      "value": "1772",
      "childrens": [] },
    {
      "label": "南关区",
      "value": "1773",
      "childrens": [] },
    {
      "label": "绿园区",
      "value": "1774",
      "childrens": [] },
    {
      "label": "双阳区",
      "value": "1775",
      "childrens": [] },
    {
      "label": "净月潭开发区",
      "value": "1776",
      "childrens": [] },
    {
      "label": "高新技术开发区",
      "value": "1777",
      "childrens": [] },
    {
      "label": "经济技术开发区",
      "value": "1778",
      "childrens": [] },
    {
      "label": "汽车产业开发区",
      "value": "1779",
      "childrens": [] },
    {
      "label": "德惠市",
      "value": "1780",
      "childrens": [] },
    {
      "label": "九台市",
      "value": "1781",
      "childrens": [] },
    {
      "label": "榆树市",
      "value": "1782",
      "childrens": [] },
    {
      "label": "农安县",
      "value": "1783",
      "childrens": [] }] },

  {
    "label": "吉林市",
    "value": "212",
    "childrens": [{
      "label": "船营区",
      "value": "1784",
      "childrens": [] },
    {
      "label": "昌邑区",
      "value": "1785",
      "childrens": [] },
    {
      "label": "龙潭区",
      "value": "1786",
      "childrens": [] },
    {
      "label": "丰满区",
      "value": "1787",
      "childrens": [] },
    {
      "label": "蛟河市",
      "value": "1788",
      "childrens": [] },
    {
      "label": "桦甸市",
      "value": "1789",
      "childrens": [] },
    {
      "label": "舒兰市",
      "value": "1790",
      "childrens": [] },
    {
      "label": "磐石市",
      "value": "1791",
      "childrens": [] },
    {
      "label": "永吉县",
      "value": "1792",
      "childrens": [] }] },

  {
    "label": "白城市",
    "value": "213",
    "childrens": [{
      "label": "洮北区",
      "value": "1793",
      "childrens": [] },
    {
      "label": "洮南市",
      "value": "1794",
      "childrens": [] },
    {
      "label": "大安市",
      "value": "1795",
      "childrens": [] },
    {
      "label": "镇赉县",
      "value": "1796",
      "childrens": [] },
    {
      "label": "通榆县",
      "value": "1797",
      "childrens": [] }] },

  {
    "label": "白山市",
    "value": "214",
    "childrens": [{
      "label": "江源区",
      "value": "1798",
      "childrens": [] },
    {
      "label": "八道江区",
      "value": "1799",
      "childrens": [] },
    {
      "label": "长白",
      "value": "1800",
      "childrens": [] },
    {
      "label": "临江市",
      "value": "1801",
      "childrens": [] },
    {
      "label": "抚松县",
      "value": "1802",
      "childrens": [] },
    {
      "label": "靖宇县",
      "value": "1803",
      "childrens": [] }] },

  {
    "label": "辽源市",
    "value": "215",
    "childrens": [{
      "label": "龙山区",
      "value": "1804",
      "childrens": [] },
    {
      "label": "西安区",
      "value": "1805",
      "childrens": [] },
    {
      "label": "东丰县",
      "value": "1806",
      "childrens": [] },
    {
      "label": "东辽县",
      "value": "1807",
      "childrens": [] }] },

  {
    "label": "四平市",
    "value": "216",
    "childrens": [{
      "label": "铁西区",
      "value": "1808",
      "childrens": [] },
    {
      "label": "铁东区",
      "value": "1809",
      "childrens": [] },
    {
      "label": "伊通",
      "value": "1810",
      "childrens": [] },
    {
      "label": "公主岭市",
      "value": "1811",
      "childrens": [] },
    {
      "label": "双辽市",
      "value": "1812",
      "childrens": [] },
    {
      "label": "梨树县",
      "value": "1813",
      "childrens": [] }] },

  {
    "label": "松原市",
    "value": "217",
    "childrens": [{
      "label": "前郭尔罗斯",
      "value": "1814",
      "childrens": [] },
    {
      "label": "宁江区",
      "value": "1815",
      "childrens": [] },
    {
      "label": "长岭县",
      "value": "1816",
      "childrens": [] },
    {
      "label": "乾安县",
      "value": "1817",
      "childrens": [] },
    {
      "label": "扶余县",
      "value": "1818",
      "childrens": [] }] },

  {
    "label": "通化市",
    "value": "218",
    "childrens": [{
      "label": "东昌区",
      "value": "1819",
      "childrens": [] },
    {
      "label": "二道江区",
      "value": "1820",
      "childrens": [] },
    {
      "label": "梅河口市",
      "value": "1821",
      "childrens": [] },
    {
      "label": "集安市",
      "value": "1822",
      "childrens": [] },
    {
      "label": "通化县",
      "value": "1823",
      "childrens": [] },
    {
      "label": "辉南县",
      "value": "1824",
      "childrens": [] },
    {
      "label": "柳河县",
      "value": "1825",
      "childrens": [] }] },

  {
    "label": "延边朝鲜族自治州",
    "value": "219",
    "childrens": [{
      "label": "延吉市",
      "value": "1826",
      "childrens": [] },
    {
      "label": "图们市",
      "value": "1827",
      "childrens": [] },
    {
      "label": "敦化市",
      "value": "1828",
      "childrens": [] },
    {
      "label": "珲春市",
      "value": "1829",
      "childrens": [] },
    {
      "label": "龙井市",
      "value": "1830",
      "childrens": [] },
    {
      "label": "和龙市",
      "value": "1831",
      "childrens": [] },
    {
      "label": "安图县",
      "value": "1832",
      "childrens": [] },
    {
      "label": "汪清县",
      "value": "1833",
      "childrens": [] }] }] },


{
  "label": "江苏省",
  "value": "16",
  "childrens": [{
    "label": "南京市",
    "value": "220",
    "childrens": [{
      "label": "玄武区",
      "value": "1834",
      "childrens": [] },
    {
      "label": "鼓楼区",
      "value": "1835",
      "childrens": [] },
    {
      "label": "白下区",
      "value": "1836",
      "childrens": [] },
    {
      "label": "建邺区",
      "value": "1837",
      "childrens": [] },
    {
      "label": "秦淮区",
      "value": "1838",
      "childrens": [] },
    {
      "label": "雨花台区",
      "value": "1839",
      "childrens": [] },
    {
      "label": "下关区",
      "value": "1840",
      "childrens": [] },
    {
      "label": "栖霞区",
      "value": "1841",
      "childrens": [] },
    {
      "label": "浦口区",
      "value": "1842",
      "childrens": [] },
    {
      "label": "江宁区",
      "value": "1843",
      "childrens": [] },
    {
      "label": "六合区",
      "value": "1844",
      "childrens": [] },
    {
      "label": "溧水县",
      "value": "1845",
      "childrens": [] },
    {
      "label": "高淳县",
      "value": "1846",
      "childrens": [] }] },

  {
    "label": "苏州市",
    "value": "221",
    "childrens": [{
      "label": "沧浪区",
      "value": "1847",
      "childrens": [] },
    {
      "label": "金阊区",
      "value": "1848",
      "childrens": [] },
    {
      "label": "平江区",
      "value": "1849",
      "childrens": [] },
    {
      "label": "虎丘区",
      "value": "1850",
      "childrens": [] },
    {
      "label": "吴中区",
      "value": "1851",
      "childrens": [] },
    {
      "label": "相城区",
      "value": "1852",
      "childrens": [] },
    {
      "label": "园区",
      "value": "1853",
      "childrens": [] },
    {
      "label": "新区",
      "value": "1854",
      "childrens": [] },
    {
      "label": "常熟市",
      "value": "1855",
      "childrens": [] },
    {
      "label": "张家港市",
      "value": "1856",
      "childrens": [] },
    {
      "label": "玉山镇",
      "value": "1857",
      "childrens": [] },
    {
      "label": "巴城镇",
      "value": "1858",
      "childrens": [] },
    {
      "label": "周市镇",
      "value": "1859",
      "childrens": [] },
    {
      "label": "陆家镇",
      "value": "1860",
      "childrens": [] },
    {
      "label": "花桥镇",
      "value": "1861",
      "childrens": [] },
    {
      "label": "淀山湖镇",
      "value": "1862",
      "childrens": [] },
    {
      "label": "张浦镇",
      "value": "1863",
      "childrens": [] },
    {
      "label": "周庄镇",
      "value": "1864",
      "childrens": [] },
    {
      "label": "千灯镇",
      "value": "1865",
      "childrens": [] },
    {
      "label": "锦溪镇",
      "value": "1866",
      "childrens": [] },
    {
      "label": "开发区",
      "value": "1867",
      "childrens": [] },
    {
      "label": "吴江市",
      "value": "1868",
      "childrens": [] },
    {
      "label": "太仓市",
      "value": "1869",
      "childrens": [] }] },

  {
    "label": "无锡市",
    "value": "222",
    "childrens": [{
      "label": "崇安区",
      "value": "1870",
      "childrens": [] },
    {
      "label": "北塘区",
      "value": "1871",
      "childrens": [] },
    {
      "label": "南长区",
      "value": "1872",
      "childrens": [] },
    {
      "label": "锡山区",
      "value": "1873",
      "childrens": [] },
    {
      "label": "惠山区",
      "value": "1874",
      "childrens": [] },
    {
      "label": "滨湖区",
      "value": "1875",
      "childrens": [] },
    {
      "label": "新区",
      "value": "1876",
      "childrens": [] },
    {
      "label": "江阴市",
      "value": "1877",
      "childrens": [] },
    {
      "label": "宜兴市",
      "value": "1878",
      "childrens": [] }] },

  {
    "label": "常州市",
    "value": "223",
    "childrens": [{
      "label": "天宁区",
      "value": "1879",
      "childrens": [] },
    {
      "label": "钟楼区",
      "value": "1880",
      "childrens": [] },
    {
      "label": "戚墅堰区",
      "value": "1881",
      "childrens": [] },
    {
      "label": "郊区",
      "value": "1882",
      "childrens": [] },
    {
      "label": "新北区",
      "value": "1883",
      "childrens": [] },
    {
      "label": "武进区",
      "value": "1884",
      "childrens": [] },
    {
      "label": "溧阳市",
      "value": "1885",
      "childrens": [] },
    {
      "label": "金坛市",
      "value": "1886",
      "childrens": [] }] },

  {
    "label": "淮安市",
    "value": "224",
    "childrens": [{
      "label": "清河区",
      "value": "1887",
      "childrens": [] },
    {
      "label": "清浦区",
      "value": "1888",
      "childrens": [] },
    {
      "label": "楚州区",
      "value": "1889",
      "childrens": [] },
    {
      "label": "淮阴区",
      "value": "1890",
      "childrens": [] },
    {
      "label": "涟水县",
      "value": "1891",
      "childrens": [] },
    {
      "label": "洪泽县",
      "value": "1892",
      "childrens": [] },
    {
      "label": "盱眙县",
      "value": "1893",
      "childrens": [] },
    {
      "label": "金湖县",
      "value": "1894",
      "childrens": [] }] },

  {
    "label": "连云港市",
    "value": "225",
    "childrens": [{
      "label": "新浦区",
      "value": "1895",
      "childrens": [] },
    {
      "label": "连云区",
      "value": "1896",
      "childrens": [] },
    {
      "label": "海州区",
      "value": "1897",
      "childrens": [] },
    {
      "label": "赣榆县",
      "value": "1898",
      "childrens": [] },
    {
      "label": "东海县",
      "value": "1899",
      "childrens": [] },
    {
      "label": "灌云县",
      "value": "1900",
      "childrens": [] },
    {
      "label": "灌南县",
      "value": "1901",
      "childrens": [] }] },

  {
    "label": "南通市",
    "value": "226",
    "childrens": [{
      "label": "崇川区",
      "value": "1902",
      "childrens": [] },
    {
      "label": "港闸区",
      "value": "1903",
      "childrens": [] },
    {
      "label": "经济开发区",
      "value": "1904",
      "childrens": [] },
    {
      "label": "启东市",
      "value": "1905",
      "childrens": [] },
    {
      "label": "如皋市",
      "value": "1906",
      "childrens": [] },
    {
      "label": "通州市",
      "value": "1907",
      "childrens": [] },
    {
      "label": "海门市",
      "value": "1908",
      "childrens": [] },
    {
      "label": "海安县",
      "value": "1909",
      "childrens": [] },
    {
      "label": "如东县",
      "value": "1910",
      "childrens": [] }] },

  {
    "label": "宿迁市",
    "value": "227",
    "childrens": [{
      "label": "宿城区",
      "value": "1911",
      "childrens": [] },
    {
      "label": "宿豫区",
      "value": "1912",
      "childrens": [] },
    {
      "label": "宿豫县",
      "value": "1913",
      "childrens": [] },
    {
      "label": "沭阳县",
      "value": "1914",
      "childrens": [] },
    {
      "label": "泗阳县",
      "value": "1915",
      "childrens": [] },
    {
      "label": "泗洪县",
      "value": "1916",
      "childrens": [] }] },

  {
    "label": "泰州市",
    "value": "228",
    "childrens": [{
      "label": "海陵区",
      "value": "1917",
      "childrens": [] },
    {
      "label": "高港区",
      "value": "1918",
      "childrens": [] },
    {
      "label": "兴化市",
      "value": "1919",
      "childrens": [] },
    {
      "label": "靖江市",
      "value": "1920",
      "childrens": [] },
    {
      "label": "泰兴市",
      "value": "1921",
      "childrens": [] },
    {
      "label": "姜堰市",
      "value": "1922",
      "childrens": [] }] },

  {
    "label": "徐州市",
    "value": "229",
    "childrens": [{
      "label": "云龙区",
      "value": "1923",
      "childrens": [] },
    {
      "label": "鼓楼区",
      "value": "1924",
      "childrens": [] },
    {
      "label": "九里区",
      "value": "1925",
      "childrens": [] },
    {
      "label": "贾汪区",
      "value": "1926",
      "childrens": [] },
    {
      "label": "泉山区",
      "value": "1927",
      "childrens": [] },
    {
      "label": "新沂市",
      "value": "1928",
      "childrens": [] },
    {
      "label": "邳州市",
      "value": "1929",
      "childrens": [] },
    {
      "label": "丰县",
      "value": "1930",
      "childrens": [] },
    {
      "label": "沛县",
      "value": "1931",
      "childrens": [] },
    {
      "label": "铜山县",
      "value": "1932",
      "childrens": [] },
    {
      "label": "睢宁县",
      "value": "1933",
      "childrens": [] }] },

  {
    "label": "盐城市",
    "value": "230",
    "childrens": [{
      "label": "城区",
      "value": "1934",
      "childrens": [] },
    {
      "label": "亭湖区",
      "value": "1935",
      "childrens": [] },
    {
      "label": "盐都区",
      "value": "1936",
      "childrens": [] },
    {
      "label": "盐都县",
      "value": "1937",
      "childrens": [] },
    {
      "label": "东台市",
      "value": "1938",
      "childrens": [] },
    {
      "label": "大丰市",
      "value": "1939",
      "childrens": [] },
    {
      "label": "响水县",
      "value": "1940",
      "childrens": [] },
    {
      "label": "滨海县",
      "value": "1941",
      "childrens": [] },
    {
      "label": "阜宁县",
      "value": "1942",
      "childrens": [] },
    {
      "label": "射阳县",
      "value": "1943",
      "childrens": [] },
    {
      "label": "建湖县",
      "value": "1944",
      "childrens": [] }] },

  {
    "label": "扬州市",
    "value": "231",
    "childrens": [{
      "label": "广陵区",
      "value": "1945",
      "childrens": [] },
    {
      "label": "维扬区",
      "value": "1946",
      "childrens": [] },
    {
      "label": "邗江区",
      "value": "1947",
      "childrens": [] },
    {
      "label": "仪征市",
      "value": "1948",
      "childrens": [] },
    {
      "label": "高邮市",
      "value": "1949",
      "childrens": [] },
    {
      "label": "江都市",
      "value": "1950",
      "childrens": [] },
    {
      "label": "宝应县",
      "value": "1951",
      "childrens": [] }] },

  {
    "label": "镇江市",
    "value": "232",
    "childrens": [{
      "label": "京口区",
      "value": "1952",
      "childrens": [] },
    {
      "label": "润州区",
      "value": "1953",
      "childrens": [] },
    {
      "label": "丹徒区",
      "value": "1954",
      "childrens": [] },
    {
      "label": "丹阳市",
      "value": "1955",
      "childrens": [] },
    {
      "label": "扬中市",
      "value": "1956",
      "childrens": [] },
    {
      "label": "句容市",
      "value": "1957",
      "childrens": [] }] }] },


{
  "label": "江西省",
  "value": "17",
  "childrens": [{
    "label": "南昌市",
    "value": "233",
    "childrens": [{
      "label": "东湖区",
      "value": "1958",
      "childrens": [] },
    {
      "label": "西湖区",
      "value": "1959",
      "childrens": [] },
    {
      "label": "青云谱区",
      "value": "1960",
      "childrens": [] },
    {
      "label": "湾里区",
      "value": "1961",
      "childrens": [] },
    {
      "label": "青山湖区",
      "value": "1962",
      "childrens": [] },
    {
      "label": "红谷滩新区",
      "value": "1963",
      "childrens": [] },
    {
      "label": "昌北区",
      "value": "1964",
      "childrens": [] },
    {
      "label": "高新区",
      "value": "1965",
      "childrens": [] },
    {
      "label": "南昌县",
      "value": "1966",
      "childrens": [] },
    {
      "label": "新建县",
      "value": "1967",
      "childrens": [] },
    {
      "label": "安义县",
      "value": "1968",
      "childrens": [] },
    {
      "label": "进贤县",
      "value": "1969",
      "childrens": [] }] },

  {
    "label": "抚州市",
    "value": "234",
    "childrens": [{
      "label": "临川区",
      "value": "1970",
      "childrens": [] },
    {
      "label": "南城县",
      "value": "1971",
      "childrens": [] },
    {
      "label": "黎川县",
      "value": "1972",
      "childrens": [] },
    {
      "label": "南丰县",
      "value": "1973",
      "childrens": [] },
    {
      "label": "崇仁县",
      "value": "1974",
      "childrens": [] },
    {
      "label": "乐安县",
      "value": "1975",
      "childrens": [] },
    {
      "label": "宜黄县",
      "value": "1976",
      "childrens": [] },
    {
      "label": "金溪县",
      "value": "1977",
      "childrens": [] },
    {
      "label": "资溪县",
      "value": "1978",
      "childrens": [] },
    {
      "label": "东乡县",
      "value": "1979",
      "childrens": [] },
    {
      "label": "广昌县",
      "value": "1980",
      "childrens": [] }] },

  {
    "label": "赣州市",
    "value": "235",
    "childrens": [{
      "label": "章贡区",
      "value": "1981",
      "childrens": [] },
    {
      "label": "于都县",
      "value": "1982",
      "childrens": [] },
    {
      "label": "瑞金市",
      "value": "1983",
      "childrens": [] },
    {
      "label": "南康市",
      "value": "1984",
      "childrens": [] },
    {
      "label": "赣县",
      "value": "1985",
      "childrens": [] },
    {
      "label": "信丰县",
      "value": "1986",
      "childrens": [] },
    {
      "label": "大余县",
      "value": "1987",
      "childrens": [] },
    {
      "label": "上犹县",
      "value": "1988",
      "childrens": [] },
    {
      "label": "崇义县",
      "value": "1989",
      "childrens": [] },
    {
      "label": "安远县",
      "value": "1990",
      "childrens": [] },
    {
      "label": "龙南县",
      "value": "1991",
      "childrens": [] },
    {
      "label": "定南县",
      "value": "1992",
      "childrens": [] },
    {
      "label": "全南县",
      "value": "1993",
      "childrens": [] },
    {
      "label": "宁都县",
      "value": "1994",
      "childrens": [] },
    {
      "label": "兴国县",
      "value": "1995",
      "childrens": [] },
    {
      "label": "会昌县",
      "value": "1996",
      "childrens": [] },
    {
      "label": "寻乌县",
      "value": "1997",
      "childrens": [] },
    {
      "label": "石城县",
      "value": "1998",
      "childrens": [] }] },

  {
    "label": "吉安市",
    "value": "236",
    "childrens": [{
      "label": "安福县",
      "value": "1999",
      "childrens": [] },
    {
      "label": "吉州区",
      "value": "2000",
      "childrens": [] },
    {
      "label": "青原区",
      "value": "2001",
      "childrens": [] },
    {
      "label": "井冈山市",
      "value": "2002",
      "childrens": [] },
    {
      "label": "吉安县",
      "value": "2003",
      "childrens": [] },
    {
      "label": "吉水县",
      "value": "2004",
      "childrens": [] },
    {
      "label": "峡江县",
      "value": "2005",
      "childrens": [] },
    {
      "label": "新干县",
      "value": "2006",
      "childrens": [] },
    {
      "label": "永丰县",
      "value": "2007",
      "childrens": [] },
    {
      "label": "泰和县",
      "value": "2008",
      "childrens": [] },
    {
      "label": "遂川县",
      "value": "2009",
      "childrens": [] },
    {
      "label": "万安县",
      "value": "2010",
      "childrens": [] },
    {
      "label": "永新县",
      "value": "2011",
      "childrens": [] }] },

  {
    "label": "景德镇市",
    "value": "237",
    "childrens": [{
      "label": "珠山区",
      "value": "2012",
      "childrens": [] },
    {
      "label": "昌江区",
      "value": "2013",
      "childrens": [] },
    {
      "label": "乐平市",
      "value": "2014",
      "childrens": [] },
    {
      "label": "浮梁县",
      "value": "2015",
      "childrens": [] }] },

  {
    "label": "九江市",
    "value": "238",
    "childrens": [{
      "label": "浔阳区",
      "value": "2016",
      "childrens": [] },
    {
      "label": "庐山区",
      "value": "2017",
      "childrens": [] },
    {
      "label": "瑞昌市",
      "value": "2018",
      "childrens": [] },
    {
      "label": "九江县",
      "value": "2019",
      "childrens": [] },
    {
      "label": "武宁县",
      "value": "2020",
      "childrens": [] },
    {
      "label": "修水县",
      "value": "2021",
      "childrens": [] },
    {
      "label": "永修县",
      "value": "2022",
      "childrens": [] },
    {
      "label": "德安县",
      "value": "2023",
      "childrens": [] },
    {
      "label": "星子县",
      "value": "2024",
      "childrens": [] },
    {
      "label": "都昌县",
      "value": "2025",
      "childrens": [] },
    {
      "label": "湖口县",
      "value": "2026",
      "childrens": [] },
    {
      "label": "彭泽县",
      "value": "2027",
      "childrens": [] }] },

  {
    "label": "萍乡市",
    "value": "239",
    "childrens": [{
      "label": "安源区",
      "value": "2028",
      "childrens": [] },
    {
      "label": "湘东区",
      "value": "2029",
      "childrens": [] },
    {
      "label": "莲花县",
      "value": "2030",
      "childrens": [] },
    {
      "label": "芦溪县",
      "value": "2031",
      "childrens": [] },
    {
      "label": "上栗县",
      "value": "2032",
      "childrens": [] }] },

  {
    "label": "上饶市",
    "value": "240",
    "childrens": [{
      "label": "信州区",
      "value": "2033",
      "childrens": [] },
    {
      "label": "德兴市",
      "value": "2034",
      "childrens": [] },
    {
      "label": "上饶县",
      "value": "2035",
      "childrens": [] },
    {
      "label": "广丰县",
      "value": "2036",
      "childrens": [] },
    {
      "label": "玉山县",
      "value": "2037",
      "childrens": [] },
    {
      "label": "铅山县",
      "value": "2038",
      "childrens": [] },
    {
      "label": "横峰县",
      "value": "2039",
      "childrens": [] },
    {
      "label": "弋阳县",
      "value": "2040",
      "childrens": [] },
    {
      "label": "余干县",
      "value": "2041",
      "childrens": [] },
    {
      "label": "波阳县",
      "value": "2042",
      "childrens": [] },
    {
      "label": "万年县",
      "value": "2043",
      "childrens": [] },
    {
      "label": "婺源县",
      "value": "2044",
      "childrens": [] }] },

  {
    "label": "新余市",
    "value": "241",
    "childrens": [{
      "label": "渝水区",
      "value": "2045",
      "childrens": [] },
    {
      "label": "分宜县",
      "value": "2046",
      "childrens": [] }] },

  {
    "label": "宜春市",
    "value": "242",
    "childrens": [{
      "label": "袁州区",
      "value": "2047",
      "childrens": [] },
    {
      "label": "丰城市",
      "value": "2048",
      "childrens": [] },
    {
      "label": "樟树市",
      "value": "2049",
      "childrens": [] },
    {
      "label": "高安市",
      "value": "2050",
      "childrens": [] },
    {
      "label": "奉新县",
      "value": "2051",
      "childrens": [] },
    {
      "label": "万载县",
      "value": "2052",
      "childrens": [] },
    {
      "label": "上高县",
      "value": "2053",
      "childrens": [] },
    {
      "label": "宜丰县",
      "value": "2054",
      "childrens": [] },
    {
      "label": "靖安县",
      "value": "2055",
      "childrens": [] },
    {
      "label": "铜鼓县",
      "value": "2056",
      "childrens": [] }] },

  {
    "label": "鹰潭市",
    "value": "243",
    "childrens": [{
      "label": "月湖区",
      "value": "2057",
      "childrens": [] },
    {
      "label": "贵溪市",
      "value": "2058",
      "childrens": [] },
    {
      "label": "余江县",
      "value": "2059",
      "childrens": [] }] }] },


{
  "label": "辽宁省",
  "value": "18",
  "childrens": [{
    "label": "沈阳市",
    "value": "244",
    "childrens": [{
      "label": "沈河区",
      "value": "2060",
      "childrens": [] },
    {
      "label": "皇姑区",
      "value": "2061",
      "childrens": [] },
    {
      "label": "和平区",
      "value": "2062",
      "childrens": [] },
    {
      "label": "大东区",
      "value": "2063",
      "childrens": [] },
    {
      "label": "铁西区",
      "value": "2064",
      "childrens": [] },
    {
      "label": "苏家屯区",
      "value": "2065",
      "childrens": [] },
    {
      "label": "东陵区",
      "value": "2066",
      "childrens": [] },
    {
      "label": "沈北新区",
      "value": "2067",
      "childrens": [] },
    {
      "label": "于洪区",
      "value": "2068",
      "childrens": [] },
    {
      "label": "浑南新区",
      "value": "2069",
      "childrens": [] },
    {
      "label": "新民市",
      "value": "2070",
      "childrens": [] },
    {
      "label": "辽中县",
      "value": "2071",
      "childrens": [] },
    {
      "label": "康平县",
      "value": "2072",
      "childrens": [] },
    {
      "label": "法库县",
      "value": "2073",
      "childrens": [] }] },

  {
    "label": "大连市",
    "value": "245",
    "childrens": [{
      "label": "西岗区",
      "value": "2074",
      "childrens": [] },
    {
      "label": "中山区",
      "value": "2075",
      "childrens": [] },
    {
      "label": "沙河口区",
      "value": "2076",
      "childrens": [] },
    {
      "label": "甘井子区",
      "value": "2077",
      "childrens": [] },
    {
      "label": "旅顺口区",
      "value": "2078",
      "childrens": [] },
    {
      "label": "金州区",
      "value": "2079",
      "childrens": [] },
    {
      "label": "开发区",
      "value": "2080",
      "childrens": [] },
    {
      "label": "瓦房店市",
      "value": "2081",
      "childrens": [] },
    {
      "label": "普兰店市",
      "value": "2082",
      "childrens": [] },
    {
      "label": "庄河市",
      "value": "2083",
      "childrens": [] },
    {
      "label": "长海县",
      "value": "2084",
      "childrens": [] }] },

  {
    "label": "鞍山市",
    "value": "246",
    "childrens": [{
      "label": "铁东区",
      "value": "2085",
      "childrens": [] },
    {
      "label": "铁西区",
      "value": "2086",
      "childrens": [] },
    {
      "label": "立山区",
      "value": "2087",
      "childrens": [] },
    {
      "label": "千山区",
      "value": "2088",
      "childrens": [] },
    {
      "label": "岫岩",
      "value": "2089",
      "childrens": [] },
    {
      "label": "海城市",
      "value": "2090",
      "childrens": [] },
    {
      "label": "台安县",
      "value": "2091",
      "childrens": [] }] },

  {
    "label": "本溪市",
    "value": "247",
    "childrens": [{
      "label": "本溪",
      "value": "2092",
      "childrens": [] },
    {
      "label": "平山区",
      "value": "2093",
      "childrens": [] },
    {
      "label": "明山区",
      "value": "2094",
      "childrens": [] },
    {
      "label": "溪湖区",
      "value": "2095",
      "childrens": [] },
    {
      "label": "南芬区",
      "value": "2096",
      "childrens": [] },
    {
      "label": "桓仁",
      "value": "2097",
      "childrens": [] }] },

  {
    "label": "朝阳市",
    "value": "248",
    "childrens": [{
      "label": "双塔区",
      "value": "2098",
      "childrens": [] },
    {
      "label": "龙城区",
      "value": "2099",
      "childrens": [] },
    {
      "label": "喀喇沁左翼蒙古族自治县",
      "value": "2100",
      "childrens": [] },
    {
      "label": "北票市",
      "value": "2101",
      "childrens": [] },
    {
      "label": "凌源市",
      "value": "2102",
      "childrens": [] },
    {
      "label": "朝阳县",
      "value": "2103",
      "childrens": [] },
    {
      "label": "建平县",
      "value": "2104",
      "childrens": [] }] },

  {
    "label": "丹东市",
    "value": "249",
    "childrens": [{
      "label": "振兴区",
      "value": "2105",
      "childrens": [] },
    {
      "label": "元宝区",
      "value": "2106",
      "childrens": [] },
    {
      "label": "振安区",
      "value": "2107",
      "childrens": [] },
    {
      "label": "宽甸",
      "value": "2108",
      "childrens": [] },
    {
      "label": "东港市",
      "value": "2109",
      "childrens": [] },
    {
      "label": "凤城市",
      "value": "2110",
      "childrens": [] }] },

  {
    "label": "抚顺市",
    "value": "250",
    "childrens": [{
      "label": "顺城区",
      "value": "2111",
      "childrens": [] },
    {
      "label": "新抚区",
      "value": "2112",
      "childrens": [] },
    {
      "label": "东洲区",
      "value": "2113",
      "childrens": [] },
    {
      "label": "望花区",
      "value": "2114",
      "childrens": [] },
    {
      "label": "清原",
      "value": "2115",
      "childrens": [] },
    {
      "label": "新宾",
      "value": "2116",
      "childrens": [] },
    {
      "label": "抚顺县",
      "value": "2117",
      "childrens": [] }] },

  {
    "label": "阜新市",
    "value": "251",
    "childrens": [{
      "label": "阜新",
      "value": "2118",
      "childrens": [] },
    {
      "label": "海州区",
      "value": "2119",
      "childrens": [] },
    {
      "label": "新邱区",
      "value": "2120",
      "childrens": [] },
    {
      "label": "太平区",
      "value": "2121",
      "childrens": [] },
    {
      "label": "清河门区",
      "value": "2122",
      "childrens": [] },
    {
      "label": "细河区",
      "value": "2123",
      "childrens": [] },
    {
      "label": "彰武县",
      "value": "2124",
      "childrens": [] }] },

  {
    "label": "葫芦岛市",
    "value": "252",
    "childrens": [{
      "label": "龙港区",
      "value": "2125",
      "childrens": [] },
    {
      "label": "南票区",
      "value": "2126",
      "childrens": [] },
    {
      "label": "连山区",
      "value": "2127",
      "childrens": [] },
    {
      "label": "兴城市",
      "value": "2128",
      "childrens": [] },
    {
      "label": "绥中县",
      "value": "2129",
      "childrens": [] },
    {
      "label": "建昌县",
      "value": "2130",
      "childrens": [] }] },

  {
    "label": "锦州市",
    "value": "253",
    "childrens": [{
      "label": "太和区",
      "value": "2131",
      "childrens": [] },
    {
      "label": "古塔区",
      "value": "2132",
      "childrens": [] },
    {
      "label": "凌河区",
      "value": "2133",
      "childrens": [] },
    {
      "label": "凌海市",
      "value": "2134",
      "childrens": [] },
    {
      "label": "北镇市",
      "value": "2135",
      "childrens": [] },
    {
      "label": "黑山县",
      "value": "2136",
      "childrens": [] },
    {
      "label": "义县",
      "value": "2137",
      "childrens": [] }] },

  {
    "label": "辽阳市",
    "value": "254",
    "childrens": [{
      "label": "白塔区",
      "value": "2138",
      "childrens": [] },
    {
      "label": "文圣区",
      "value": "2139",
      "childrens": [] },
    {
      "label": "宏伟区",
      "value": "2140",
      "childrens": [] },
    {
      "label": "太子河区",
      "value": "2141",
      "childrens": [] },
    {
      "label": "弓长岭区",
      "value": "2142",
      "childrens": [] },
    {
      "label": "灯塔市",
      "value": "2143",
      "childrens": [] },
    {
      "label": "辽阳县",
      "value": "2144",
      "childrens": [] }] },

  {
    "label": "盘锦市",
    "value": "255",
    "childrens": [{
      "label": "双台子区",
      "value": "2145",
      "childrens": [] },
    {
      "label": "兴隆台区",
      "value": "2146",
      "childrens": [] },
    {
      "label": "大洼县",
      "value": "2147",
      "childrens": [] },
    {
      "label": "盘山县",
      "value": "2148",
      "childrens": [] }] },

  {
    "label": "铁岭市",
    "value": "256",
    "childrens": [{
      "label": "银州区",
      "value": "2149",
      "childrens": [] },
    {
      "label": "清河区",
      "value": "2150",
      "childrens": [] },
    {
      "label": "调兵山市",
      "value": "2151",
      "childrens": [] },
    {
      "label": "开原市",
      "value": "2152",
      "childrens": [] },
    {
      "label": "铁岭县",
      "value": "2153",
      "childrens": [] },
    {
      "label": "西丰县",
      "value": "2154",
      "childrens": [] },
    {
      "label": "昌图县",
      "value": "2155",
      "childrens": [] }] },

  {
    "label": "营口市",
    "value": "257",
    "childrens": [{
      "label": "站前区",
      "value": "2156",
      "childrens": [] },
    {
      "label": "西市区",
      "value": "2157",
      "childrens": [] },
    {
      "label": "鲅鱼圈区",
      "value": "2158",
      "childrens": [] },
    {
      "label": "老边区",
      "value": "2159",
      "childrens": [] },
    {
      "label": "盖州市",
      "value": "2160",
      "childrens": [] },
    {
      "label": "大石桥市",
      "value": "2161",
      "childrens": [] }] }] },


{
  "label": "内蒙古自治区",
  "value": "19",
  "childrens": [{
    "label": "呼和浩特市",
    "value": "258",
    "childrens": [{
      "label": "回民区",
      "value": "2162",
      "childrens": [] },
    {
      "label": "玉泉区",
      "value": "2163",
      "childrens": [] },
    {
      "label": "新城区",
      "value": "2164",
      "childrens": [] },
    {
      "label": "赛罕区",
      "value": "2165",
      "childrens": [] },
    {
      "label": "清水河县",
      "value": "2166",
      "childrens": [] },
    {
      "label": "土默特左旗",
      "value": "2167",
      "childrens": [] },
    {
      "label": "托克托县",
      "value": "2168",
      "childrens": [] },
    {
      "label": "和林格尔县",
      "value": "2169",
      "childrens": [] },
    {
      "label": "武川县",
      "value": "2170",
      "childrens": [] }] },

  {
    "label": "阿拉善盟",
    "value": "259",
    "childrens": [{
      "label": "阿拉善左旗",
      "value": "2171",
      "childrens": [] },
    {
      "label": "阿拉善右旗",
      "value": "2172",
      "childrens": [] },
    {
      "label": "额济纳旗",
      "value": "2173",
      "childrens": [] }] },

  {
    "label": "巴彦淖尔市",
    "value": "260",
    "childrens": [{
      "label": "临河区",
      "value": "2174",
      "childrens": [] },
    {
      "label": "五原县",
      "value": "2175",
      "childrens": [] },
    {
      "label": "磴口县",
      "value": "2176",
      "childrens": [] },
    {
      "label": "乌拉特前旗",
      "value": "2177",
      "childrens": [] },
    {
      "label": "乌拉特中旗",
      "value": "2178",
      "childrens": [] },
    {
      "label": "乌拉特后旗",
      "value": "2179",
      "childrens": [] },
    {
      "label": "杭锦后旗",
      "value": "2180",
      "childrens": [] }] },

  {
    "label": "包头市",
    "value": "261",
    "childrens": [{
      "label": "昆都仑区",
      "value": "2181",
      "childrens": [] },
    {
      "label": "青山区",
      "value": "2182",
      "childrens": [] },
    {
      "label": "东河区",
      "value": "2183",
      "childrens": [] },
    {
      "label": "九原区",
      "value": "2184",
      "childrens": [] },
    {
      "label": "石拐区",
      "value": "2185",
      "childrens": [] },
    {
      "label": "白云矿区",
      "value": "2186",
      "childrens": [] },
    {
      "label": "土默特右旗",
      "value": "2187",
      "childrens": [] },
    {
      "label": "固阳县",
      "value": "2188",
      "childrens": [] },
    {
      "label": "达尔罕茂明安联合旗",
      "value": "2189",
      "childrens": [] }] },

  {
    "label": "赤峰市",
    "value": "262",
    "childrens": [{
      "label": "红山区",
      "value": "2190",
      "childrens": [] },
    {
      "label": "元宝山区",
      "value": "2191",
      "childrens": [] },
    {
      "label": "松山区",
      "value": "2192",
      "childrens": [] },
    {
      "label": "阿鲁科尔沁旗",
      "value": "2193",
      "childrens": [] },
    {
      "label": "巴林左旗",
      "value": "2194",
      "childrens": [] },
    {
      "label": "巴林右旗",
      "value": "2195",
      "childrens": [] },
    {
      "label": "林西县",
      "value": "2196",
      "childrens": [] },
    {
      "label": "克什克腾旗",
      "value": "2197",
      "childrens": [] },
    {
      "label": "翁牛特旗",
      "value": "2198",
      "childrens": [] },
    {
      "label": "喀喇沁旗",
      "value": "2199",
      "childrens": [] },
    {
      "label": "宁城县",
      "value": "2200",
      "childrens": [] },
    {
      "label": "敖汉旗",
      "value": "2201",
      "childrens": [] }] },

  {
    "label": "鄂尔多斯市",
    "value": "263",
    "childrens": [{
      "label": "东胜区",
      "value": "2202",
      "childrens": [] },
    {
      "label": "达拉特旗",
      "value": "2203",
      "childrens": [] },
    {
      "label": "准格尔旗",
      "value": "2204",
      "childrens": [] },
    {
      "label": "鄂托克前旗",
      "value": "2205",
      "childrens": [] },
    {
      "label": "鄂托克旗",
      "value": "2206",
      "childrens": [] },
    {
      "label": "杭锦旗",
      "value": "2207",
      "childrens": [] },
    {
      "label": "乌审旗",
      "value": "2208",
      "childrens": [] },
    {
      "label": "伊金霍洛旗",
      "value": "2209",
      "childrens": [] }] },

  {
    "label": "呼伦贝尔市",
    "value": "264",
    "childrens": [{
      "label": "海拉尔区",
      "value": "2210",
      "childrens": [] },
    {
      "label": "莫力达瓦",
      "value": "2211",
      "childrens": [] },
    {
      "label": "满洲里市",
      "value": "2212",
      "childrens": [] },
    {
      "label": "牙克石市",
      "value": "2213",
      "childrens": [] },
    {
      "label": "扎兰屯市",
      "value": "2214",
      "childrens": [] },
    {
      "label": "额尔古纳市",
      "value": "2215",
      "childrens": [] },
    {
      "label": "根河市",
      "value": "2216",
      "childrens": [] },
    {
      "label": "阿荣旗",
      "value": "2217",
      "childrens": [] },
    {
      "label": "鄂伦春自治旗",
      "value": "2218",
      "childrens": [] },
    {
      "label": "鄂温克族自治旗",
      "value": "2219",
      "childrens": [] },
    {
      "label": "陈巴尔虎旗",
      "value": "2220",
      "childrens": [] },
    {
      "label": "新巴尔虎左旗",
      "value": "2221",
      "childrens": [] },
    {
      "label": "新巴尔虎右旗",
      "value": "2222",
      "childrens": [] }] },

  {
    "label": "通辽市",
    "value": "265",
    "childrens": [{
      "label": "科尔沁区",
      "value": "2223",
      "childrens": [] },
    {
      "label": "霍林郭勒市",
      "value": "2224",
      "childrens": [] },
    {
      "label": "科尔沁左翼中旗",
      "value": "2225",
      "childrens": [] },
    {
      "label": "科尔沁左翼后旗",
      "value": "2226",
      "childrens": [] },
    {
      "label": "开鲁县",
      "value": "2227",
      "childrens": [] },
    {
      "label": "库伦旗",
      "value": "2228",
      "childrens": [] },
    {
      "label": "奈曼旗",
      "value": "2229",
      "childrens": [] },
    {
      "label": "扎鲁特旗",
      "value": "2230",
      "childrens": [] }] },

  {
    "label": "乌海市",
    "value": "266",
    "childrens": [{
      "label": "海勃湾区",
      "value": "2231",
      "childrens": [] },
    {
      "label": "乌达区",
      "value": "2232",
      "childrens": [] },
    {
      "label": "海南区",
      "value": "2233",
      "childrens": [] }] },

  {
    "label": "乌兰察布市市",
    "value": "267",
    "childrens": [{
      "label": "化德县",
      "value": "2234",
      "childrens": [] },
    {
      "label": "集宁区",
      "value": "2235",
      "childrens": [] },
    {
      "label": "丰镇市",
      "value": "2236",
      "childrens": [] },
    {
      "label": "卓资县",
      "value": "2237",
      "childrens": [] },
    {
      "label": "商都县",
      "value": "2238",
      "childrens": [] },
    {
      "label": "兴和县",
      "value": "2239",
      "childrens": [] },
    {
      "label": "凉城县",
      "value": "2240",
      "childrens": [] },
    {
      "label": "察哈尔右翼前旗",
      "value": "2241",
      "childrens": [] },
    {
      "label": "察哈尔右翼中旗",
      "value": "2242",
      "childrens": [] },
    {
      "label": "察哈尔右翼后旗",
      "value": "2243",
      "childrens": [] },
    {
      "label": "四子王旗",
      "value": "2244",
      "childrens": [] }] },

  {
    "label": "锡林郭勒盟",
    "value": "268",
    "childrens": [{
      "label": "二连浩特市",
      "value": "2245",
      "childrens": [] },
    {
      "label": "锡林浩特市",
      "value": "2246",
      "childrens": [] },
    {
      "label": "阿巴嘎旗",
      "value": "2247",
      "childrens": [] },
    {
      "label": "苏尼特左旗",
      "value": "2248",
      "childrens": [] },
    {
      "label": "苏尼特右旗",
      "value": "2249",
      "childrens": [] },
    {
      "label": "东乌珠穆沁旗",
      "value": "2250",
      "childrens": [] },
    {
      "label": "西乌珠穆沁旗",
      "value": "2251",
      "childrens": [] },
    {
      "label": "太仆寺旗",
      "value": "2252",
      "childrens": [] },
    {
      "label": "镶黄旗",
      "value": "2253",
      "childrens": [] },
    {
      "label": "正镶白旗",
      "value": "2254",
      "childrens": [] },
    {
      "label": "正蓝旗",
      "value": "2255",
      "childrens": [] },
    {
      "label": "多伦县",
      "value": "2256",
      "childrens": [] }] },

  {
    "label": "兴安盟",
    "value": "269",
    "childrens": [{
      "label": "乌兰浩特市",
      "value": "2257",
      "childrens": [] },
    {
      "label": "阿尔山市",
      "value": "2258",
      "childrens": [] },
    {
      "label": "科尔沁右翼前旗",
      "value": "2259",
      "childrens": [] },
    {
      "label": "科尔沁右翼中旗",
      "value": "2260",
      "childrens": [] },
    {
      "label": "扎赉特旗",
      "value": "2261",
      "childrens": [] },
    {
      "label": "突泉县",
      "value": "2262",
      "childrens": [] }] }] },


{
  "label": "宁夏回族自治区",
  "value": "20",
  "childrens": [{
    "label": "银川市",
    "value": "270",
    "childrens": [{
      "label": "西夏区",
      "value": "2263",
      "childrens": [] },
    {
      "label": "金凤区",
      "value": "2264",
      "childrens": [] },
    {
      "label": "兴庆区",
      "value": "2265",
      "childrens": [] },
    {
      "label": "灵武市",
      "value": "2266",
      "childrens": [] },
    {
      "label": "永宁县",
      "value": "2267",
      "childrens": [] },
    {
      "label": "贺兰县",
      "value": "2268",
      "childrens": [] }] },

  {
    "label": "固原市",
    "value": "271",
    "childrens": [{
      "label": "原州区",
      "value": "2269",
      "childrens": [] },
    {
      "label": "海原县",
      "value": "2270",
      "childrens": [] },
    {
      "label": "西吉县",
      "value": "2271",
      "childrens": [] },
    {
      "label": "隆德县",
      "value": "2272",
      "childrens": [] },
    {
      "label": "泾源县",
      "value": "2273",
      "childrens": [] },
    {
      "label": "彭阳县",
      "value": "2274",
      "childrens": [] }] },

  {
    "label": "石嘴山市",
    "value": "272",
    "childrens": [{
      "label": "惠农县",
      "value": "2275",
      "childrens": [] },
    {
      "label": "大武口区",
      "value": "2276",
      "childrens": [] },
    {
      "label": "惠农区",
      "value": "2277",
      "childrens": [] },
    {
      "label": "陶乐县",
      "value": "2278",
      "childrens": [] },
    {
      "label": "平罗县",
      "value": "2279",
      "childrens": [] }] },

  {
    "label": "吴忠市",
    "value": "273",
    "childrens": [{
      "label": "利通区",
      "value": "2280",
      "childrens": [] },
    {
      "label": "中卫县",
      "value": "2281",
      "childrens": [] },
    {
      "label": "青铜峡市",
      "value": "2282",
      "childrens": [] },
    {
      "label": "中宁县",
      "value": "2283",
      "childrens": [] },
    {
      "label": "盐池县",
      "value": "2284",
      "childrens": [] },
    {
      "label": "同心县",
      "value": "2285",
      "childrens": [] }] },

  {
    "label": "中卫市",
    "value": "274",
    "childrens": [{
      "label": "沙坡头区",
      "value": "2286",
      "childrens": [] },
    {
      "label": "海原县",
      "value": "2287",
      "childrens": [] },
    {
      "label": "中宁县",
      "value": "2288",
      "childrens": [] }] }] },


{
  "label": "青海省",
  "value": "21",
  "childrens": [{
    "label": "西宁市",
    "value": "275",
    "childrens": [{
      "label": "城中区",
      "value": "2289",
      "childrens": [] },
    {
      "label": "城东区",
      "value": "2290",
      "childrens": [] },
    {
      "label": "城西区",
      "value": "2291",
      "childrens": [] },
    {
      "label": "城北区",
      "value": "2292",
      "childrens": [] },
    {
      "label": "湟中县",
      "value": "2293",
      "childrens": [] },
    {
      "label": "湟源县",
      "value": "2294",
      "childrens": [] },
    {
      "label": "大通",
      "value": "2295",
      "childrens": [] }] },

  {
    "label": "果洛藏族自治州",
    "value": "276",
    "childrens": [{
      "label": "玛沁县",
      "value": "2296",
      "childrens": [] },
    {
      "label": "班玛县",
      "value": "2297",
      "childrens": [] },
    {
      "label": "甘德县",
      "value": "2298",
      "childrens": [] },
    {
      "label": "达日县",
      "value": "2299",
      "childrens": [] },
    {
      "label": "久治县",
      "value": "2300",
      "childrens": [] },
    {
      "label": "玛多县",
      "value": "2301",
      "childrens": [] }] },

  {
    "label": "海北藏族自治州",
    "value": "277",
    "childrens": [{
      "label": "海晏县",
      "value": "2302",
      "childrens": [] },
    {
      "label": "祁连县",
      "value": "2303",
      "childrens": [] },
    {
      "label": "刚察县",
      "value": "2304",
      "childrens": [] },
    {
      "label": "门源",
      "value": "2305",
      "childrens": [] }] },

  {
    "label": "海东市",
    "value": "278",
    "childrens": [{
      "label": "平安县",
      "value": "2306",
      "childrens": [] },
    {
      "label": "乐都县",
      "value": "2307",
      "childrens": [] },
    {
      "label": "民和",
      "value": "2308",
      "childrens": [] },
    {
      "label": "互助",
      "value": "2309",
      "childrens": [] },
    {
      "label": "化隆",
      "value": "2310",
      "childrens": [] },
    {
      "label": "循化",
      "value": "2311",
      "childrens": [] }] },

  {
    "label": "海南藏族自治州",
    "value": "279",
    "childrens": [{
      "label": "共和县",
      "value": "2312",
      "childrens": [] },
    {
      "label": "同德县",
      "value": "2313",
      "childrens": [] },
    {
      "label": "贵德县",
      "value": "2314",
      "childrens": [] },
    {
      "label": "兴海县",
      "value": "2315",
      "childrens": [] },
    {
      "label": "贵南县",
      "value": "2316",
      "childrens": [] }] },

  {
    "label": "海西蒙古族藏族自治州",
    "value": "280",
    "childrens": [{
      "label": "德令哈市",
      "value": "2317",
      "childrens": [] },
    {
      "label": "格尔木市",
      "value": "2318",
      "childrens": [] },
    {
      "label": "乌兰县",
      "value": "2319",
      "childrens": [] },
    {
      "label": "都兰县",
      "value": "2320",
      "childrens": [] },
    {
      "label": "天峻县",
      "value": "2321",
      "childrens": [] }] },

  {
    "label": "黄南藏族自治州",
    "value": "281",
    "childrens": [{
      "label": "同仁县",
      "value": "2322",
      "childrens": [] },
    {
      "label": "尖扎县",
      "value": "2323",
      "childrens": [] },
    {
      "label": "泽库县",
      "value": "2324",
      "childrens": [] },
    {
      "label": "河南蒙古族自治县",
      "value": "2325",
      "childrens": [] }] },

  {
    "label": "玉树藏族自治州",
    "value": "282",
    "childrens": [{
      "label": "玉树县",
      "value": "2326",
      "childrens": [] },
    {
      "label": "杂多县",
      "value": "2327",
      "childrens": [] },
    {
      "label": "称多县",
      "value": "2328",
      "childrens": [] },
    {
      "label": "治多县",
      "value": "2329",
      "childrens": [] },
    {
      "label": "囊谦县",
      "value": "2330",
      "childrens": [] },
    {
      "label": "曲麻莱县",
      "value": "2331",
      "childrens": [] }] }] },


{
  "label": "山东省",
  "value": "22",
  "childrens": [{
    "label": "济南市",
    "value": "283",
    "childrens": [{
      "label": "市中区",
      "value": "2332",
      "childrens": [] },
    {
      "label": "历下区",
      "value": "2333",
      "childrens": [] },
    {
      "label": "天桥区",
      "value": "2334",
      "childrens": [] },
    {
      "label": "槐荫区",
      "value": "2335",
      "childrens": [] },
    {
      "label": "历城区",
      "value": "2336",
      "childrens": [] },
    {
      "label": "长清区",
      "value": "2337",
      "childrens": [] },
    {
      "label": "章丘市",
      "value": "2338",
      "childrens": [] },
    {
      "label": "平阴县",
      "value": "2339",
      "childrens": [] },
    {
      "label": "济阳县",
      "value": "2340",
      "childrens": [] },
    {
      "label": "商河县",
      "value": "2341",
      "childrens": [] }] },

  {
    "label": "青岛市",
    "value": "284",
    "childrens": [{
      "label": "市南区",
      "value": "2342",
      "childrens": [] },
    {
      "label": "市北区",
      "value": "2343",
      "childrens": [] },
    {
      "label": "城阳区",
      "value": "2344",
      "childrens": [] },
    {
      "label": "四方区",
      "value": "2345",
      "childrens": [] },
    {
      "label": "李沧区",
      "value": "2346",
      "childrens": [] },
    {
      "label": "黄岛区",
      "value": "2347",
      "childrens": [] },
    {
      "label": "崂山区",
      "value": "2348",
      "childrens": [] },
    {
      "label": "胶州市",
      "value": "2349",
      "childrens": [] },
    {
      "label": "即墨市",
      "value": "2350",
      "childrens": [] },
    {
      "label": "平度市",
      "value": "2351",
      "childrens": [] },
    {
      "label": "胶南市",
      "value": "2352",
      "childrens": [] },
    {
      "label": "莱西市",
      "value": "2353",
      "childrens": [] }] },

  {
    "label": "滨州市",
    "value": "285",
    "childrens": [{
      "label": "滨城区",
      "value": "2354",
      "childrens": [] },
    {
      "label": "惠民县",
      "value": "2355",
      "childrens": [] },
    {
      "label": "阳信县",
      "value": "2356",
      "childrens": [] },
    {
      "label": "无棣县",
      "value": "2357",
      "childrens": [] },
    {
      "label": "沾化县",
      "value": "2358",
      "childrens": [] },
    {
      "label": "博兴县",
      "value": "2359",
      "childrens": [] },
    {
      "label": "邹平县",
      "value": "2360",
      "childrens": [] }] },

  {
    "label": "德州市",
    "value": "286",
    "childrens": [{
      "label": "德城区",
      "value": "2361",
      "childrens": [] },
    {
      "label": "陵县",
      "value": "2362",
      "childrens": [] },
    {
      "label": "乐陵市",
      "value": "2363",
      "childrens": [] },
    {
      "label": "禹城市",
      "value": "2364",
      "childrens": [] },
    {
      "label": "宁津县",
      "value": "2365",
      "childrens": [] },
    {
      "label": "庆云县",
      "value": "2366",
      "childrens": [] },
    {
      "label": "临邑县",
      "value": "2367",
      "childrens": [] },
    {
      "label": "齐河县",
      "value": "2368",
      "childrens": [] },
    {
      "label": "平原县",
      "value": "2369",
      "childrens": [] },
    {
      "label": "夏津县",
      "value": "2370",
      "childrens": [] },
    {
      "label": "武城县",
      "value": "2371",
      "childrens": [] }] },

  {
    "label": "东营市",
    "value": "287",
    "childrens": [{
      "label": "东营区",
      "value": "2372",
      "childrens": [] },
    {
      "label": "河口区",
      "value": "2373",
      "childrens": [] },
    {
      "label": "垦利县",
      "value": "2374",
      "childrens": [] },
    {
      "label": "利津县",
      "value": "2375",
      "childrens": [] },
    {
      "label": "广饶县",
      "value": "2376",
      "childrens": [] }] },

  {
    "label": "菏泽市",
    "value": "288",
    "childrens": [{
      "label": "牡丹区",
      "value": "2377",
      "childrens": [] },
    {
      "label": "曹县",
      "value": "2378",
      "childrens": [] },
    {
      "label": "单县",
      "value": "2379",
      "childrens": [] },
    {
      "label": "成武县",
      "value": "2380",
      "childrens": [] },
    {
      "label": "巨野县",
      "value": "2381",
      "childrens": [] },
    {
      "label": "郓城县",
      "value": "2382",
      "childrens": [] },
    {
      "label": "鄄城县",
      "value": "2383",
      "childrens": [] },
    {
      "label": "定陶县",
      "value": "2384",
      "childrens": [] },
    {
      "label": "东明县",
      "value": "2385",
      "childrens": [] }] },

  {
    "label": "济宁市",
    "value": "289",
    "childrens": [{
      "label": "市中区",
      "value": "2386",
      "childrens": [] },
    {
      "label": "任城区",
      "value": "2387",
      "childrens": [] },
    {
      "label": "曲阜市",
      "value": "2388",
      "childrens": [] },
    {
      "label": "兖州市",
      "value": "2389",
      "childrens": [] },
    {
      "label": "邹城市",
      "value": "2390",
      "childrens": [] },
    {
      "label": "微山县",
      "value": "2391",
      "childrens": [] },
    {
      "label": "鱼台县",
      "value": "2392",
      "childrens": [] },
    {
      "label": "金乡县",
      "value": "2393",
      "childrens": [] },
    {
      "label": "嘉祥县",
      "value": "2394",
      "childrens": [] },
    {
      "label": "汶上县",
      "value": "2395",
      "childrens": [] },
    {
      "label": "泗水县",
      "value": "2396",
      "childrens": [] },
    {
      "label": "梁山县",
      "value": "2397",
      "childrens": [] }] },

  {
    "label": "莱芜市",
    "value": "290",
    "childrens": [{
      "label": "莱城区",
      "value": "2398",
      "childrens": [] },
    {
      "label": "钢城区",
      "value": "2399",
      "childrens": [] }] },

  {
    "label": "聊城市",
    "value": "291",
    "childrens": [{
      "label": "东昌府区",
      "value": "2400",
      "childrens": [] },
    {
      "label": "临清市",
      "value": "2401",
      "childrens": [] },
    {
      "label": "阳谷县",
      "value": "2402",
      "childrens": [] },
    {
      "label": "莘县",
      "value": "2403",
      "childrens": [] },
    {
      "label": "茌平县",
      "value": "2404",
      "childrens": [] },
    {
      "label": "东阿县",
      "value": "2405",
      "childrens": [] },
    {
      "label": "冠县",
      "value": "2406",
      "childrens": [] },
    {
      "label": "高唐县",
      "value": "2407",
      "childrens": [] }] },

  {
    "label": "临沂市",
    "value": "292",
    "childrens": [{
      "label": "兰山区",
      "value": "2408",
      "childrens": [] },
    {
      "label": "罗庄区",
      "value": "2409",
      "childrens": [] },
    {
      "label": "河东区",
      "value": "2410",
      "childrens": [] },
    {
      "label": "沂南县",
      "value": "2411",
      "childrens": [] },
    {
      "label": "郯城县",
      "value": "2412",
      "childrens": [] },
    {
      "label": "沂水县",
      "value": "2413",
      "childrens": [] },
    {
      "label": "苍山县",
      "value": "2414",
      "childrens": [] },
    {
      "label": "费县",
      "value": "2415",
      "childrens": [] },
    {
      "label": "平邑县",
      "value": "2416",
      "childrens": [] },
    {
      "label": "莒南县",
      "value": "2417",
      "childrens": [] },
    {
      "label": "蒙阴县",
      "value": "2418",
      "childrens": [] },
    {
      "label": "临沭县",
      "value": "2419",
      "childrens": [] }] },

  {
    "label": "日照市",
    "value": "293",
    "childrens": [{
      "label": "东港区",
      "value": "2420",
      "childrens": [] },
    {
      "label": "岚山区",
      "value": "2421",
      "childrens": [] },
    {
      "label": "五莲县",
      "value": "2422",
      "childrens": [] },
    {
      "label": "莒县",
      "value": "2423",
      "childrens": [] }] },

  {
    "label": "泰安市",
    "value": "294",
    "childrens": [{
      "label": "泰山区",
      "value": "2424",
      "childrens": [] },
    {
      "label": "岱岳区",
      "value": "2425",
      "childrens": [] },
    {
      "label": "新泰市",
      "value": "2426",
      "childrens": [] },
    {
      "label": "肥城市",
      "value": "2427",
      "childrens": [] },
    {
      "label": "宁阳县",
      "value": "2428",
      "childrens": [] },
    {
      "label": "东平县",
      "value": "2429",
      "childrens": [] }] },

  {
    "label": "威海市",
    "value": "295",
    "childrens": [{
      "label": "荣成市",
      "value": "2430",
      "childrens": [] },
    {
      "label": "乳山市",
      "value": "2431",
      "childrens": [] },
    {
      "label": "环翠区",
      "value": "2432",
      "childrens": [] },
    {
      "label": "文登市",
      "value": "2433",
      "childrens": [] }] },

  {
    "label": "潍坊市",
    "value": "296",
    "childrens": [{
      "label": "潍城区",
      "value": "2434",
      "childrens": [] },
    {
      "label": "寒亭区",
      "value": "2435",
      "childrens": [] },
    {
      "label": "坊子区",
      "value": "2436",
      "childrens": [] },
    {
      "label": "奎文区",
      "value": "2437",
      "childrens": [] },
    {
      "label": "青州市",
      "value": "2438",
      "childrens": [] },
    {
      "label": "诸城市",
      "value": "2439",
      "childrens": [] },
    {
      "label": "寿光市",
      "value": "2440",
      "childrens": [] },
    {
      "label": "安丘市",
      "value": "2441",
      "childrens": [] },
    {
      "label": "高密市",
      "value": "2442",
      "childrens": [] },
    {
      "label": "昌邑市",
      "value": "2443",
      "childrens": [] },
    {
      "label": "临朐县",
      "value": "2444",
      "childrens": [] },
    {
      "label": "昌乐县",
      "value": "2445",
      "childrens": [] }] },

  {
    "label": "烟台市",
    "value": "297",
    "childrens": [{
      "label": "芝罘区",
      "value": "2446",
      "childrens": [] },
    {
      "label": "福山区",
      "value": "2447",
      "childrens": [] },
    {
      "label": "牟平区",
      "value": "2448",
      "childrens": [] },
    {
      "label": "莱山区",
      "value": "2449",
      "childrens": [] },
    {
      "label": "开发区",
      "value": "2450",
      "childrens": [] },
    {
      "label": "龙口市",
      "value": "2451",
      "childrens": [] },
    {
      "label": "莱阳市",
      "value": "2452",
      "childrens": [] },
    {
      "label": "莱州市",
      "value": "2453",
      "childrens": [] },
    {
      "label": "蓬莱市",
      "value": "2454",
      "childrens": [] },
    {
      "label": "招远市",
      "value": "2455",
      "childrens": [] },
    {
      "label": "栖霞市",
      "value": "2456",
      "childrens": [] },
    {
      "label": "海阳市",
      "value": "2457",
      "childrens": [] },
    {
      "label": "长岛县",
      "value": "2458",
      "childrens": [] }] },

  {
    "label": "枣庄市",
    "value": "298",
    "childrens": [{
      "label": "市中区",
      "value": "2459",
      "childrens": [] },
    {
      "label": "山亭区",
      "value": "2460",
      "childrens": [] },
    {
      "label": "峄城区",
      "value": "2461",
      "childrens": [] },
    {
      "label": "台儿庄区",
      "value": "2462",
      "childrens": [] },
    {
      "label": "薛城区",
      "value": "2463",
      "childrens": [] },
    {
      "label": "滕州市",
      "value": "2464",
      "childrens": [] }] },

  {
    "label": "淄博市",
    "value": "299",
    "childrens": [{
      "label": "张店区",
      "value": "2465",
      "childrens": [] },
    {
      "label": "临淄区",
      "value": "2466",
      "childrens": [] },
    {
      "label": "淄川区",
      "value": "2467",
      "childrens": [] },
    {
      "label": "博山区",
      "value": "2468",
      "childrens": [] },
    {
      "label": "周村区",
      "value": "2469",
      "childrens": [] },
    {
      "label": "桓台县",
      "value": "2470",
      "childrens": [] },
    {
      "label": "高青县",
      "value": "2471",
      "childrens": [] },
    {
      "label": "沂源县",
      "value": "2472",
      "childrens": [] }] }] },


{
  "label": "山西省",
  "value": "23",
  "childrens": [{
    "label": "太原市",
    "value": "300",
    "childrens": [{
      "label": "杏花岭区",
      "value": "2473",
      "childrens": [] },
    {
      "label": "小店区",
      "value": "2474",
      "childrens": [] },
    {
      "label": "迎泽区",
      "value": "2475",
      "childrens": [] },
    {
      "label": "尖草坪区",
      "value": "2476",
      "childrens": [] },
    {
      "label": "万柏林区",
      "value": "2477",
      "childrens": [] },
    {
      "label": "晋源区",
      "value": "2478",
      "childrens": [] },
    {
      "label": "高新开发区",
      "value": "2479",
      "childrens": [] },
    {
      "label": "民营经济开发区",
      "value": "2480",
      "childrens": [] },
    {
      "label": "经济技术开发区",
      "value": "2481",
      "childrens": [] },
    {
      "label": "清徐县",
      "value": "2482",
      "childrens": [] },
    {
      "label": "阳曲县",
      "value": "2483",
      "childrens": [] },
    {
      "label": "娄烦县",
      "value": "2484",
      "childrens": [] },
    {
      "label": "古交市",
      "value": "2485",
      "childrens": [] }] },

  {
    "label": "长治市",
    "value": "301",
    "childrens": [{
      "label": "城区",
      "value": "2486",
      "childrens": [] },
    {
      "label": "郊区",
      "value": "2487",
      "childrens": [] },
    {
      "label": "沁县",
      "value": "2488",
      "childrens": [] },
    {
      "label": "潞城市",
      "value": "2489",
      "childrens": [] },
    {
      "label": "长治县",
      "value": "2490",
      "childrens": [] },
    {
      "label": "襄垣县",
      "value": "2491",
      "childrens": [] },
    {
      "label": "屯留县",
      "value": "2492",
      "childrens": [] },
    {
      "label": "平顺县",
      "value": "2493",
      "childrens": [] },
    {
      "label": "黎城县",
      "value": "2494",
      "childrens": [] },
    {
      "label": "壶关县",
      "value": "2495",
      "childrens": [] },
    {
      "label": "长子县",
      "value": "2496",
      "childrens": [] },
    {
      "label": "武乡县",
      "value": "2497",
      "childrens": [] },
    {
      "label": "沁源县",
      "value": "2498",
      "childrens": [] }] },

  {
    "label": "大同市",
    "value": "302",
    "childrens": [{
      "label": "城区",
      "value": "2499",
      "childrens": [] },
    {
      "label": "矿区",
      "value": "2500",
      "childrens": [] },
    {
      "label": "南郊区",
      "value": "2501",
      "childrens": [] },
    {
      "label": "新荣区",
      "value": "2502",
      "childrens": [] },
    {
      "label": "阳高县",
      "value": "2503",
      "childrens": [] },
    {
      "label": "天镇县",
      "value": "2504",
      "childrens": [] },
    {
      "label": "广灵县",
      "value": "2505",
      "childrens": [] },
    {
      "label": "灵丘县",
      "value": "2506",
      "childrens": [] },
    {
      "label": "浑源县",
      "value": "2507",
      "childrens": [] },
    {
      "label": "左云县",
      "value": "2508",
      "childrens": [] },
    {
      "label": "大同县",
      "value": "2509",
      "childrens": [] }] },

  {
    "label": "晋城市",
    "value": "303",
    "childrens": [{
      "label": "城区",
      "value": "2510",
      "childrens": [] },
    {
      "label": "高平市",
      "value": "2511",
      "childrens": [] },
    {
      "label": "沁水县",
      "value": "2512",
      "childrens": [] },
    {
      "label": "阳城县",
      "value": "2513",
      "childrens": [] },
    {
      "label": "陵川县",
      "value": "2514",
      "childrens": [] },
    {
      "label": "泽州县",
      "value": "2515",
      "childrens": [] }] },

  {
    "label": "晋中市",
    "value": "304",
    "childrens": [{
      "label": "榆次区",
      "value": "2516",
      "childrens": [] },
    {
      "label": "介休市",
      "value": "2517",
      "childrens": [] },
    {
      "label": "榆社县",
      "value": "2518",
      "childrens": [] },
    {
      "label": "左权县",
      "value": "2519",
      "childrens": [] },
    {
      "label": "和顺县",
      "value": "2520",
      "childrens": [] },
    {
      "label": "昔阳县",
      "value": "2521",
      "childrens": [] },
    {
      "label": "寿阳县",
      "value": "2522",
      "childrens": [] },
    {
      "label": "太谷县",
      "value": "2523",
      "childrens": [] },
    {
      "label": "祁县",
      "value": "2524",
      "childrens": [] },
    {
      "label": "平遥县",
      "value": "2525",
      "childrens": [] },
    {
      "label": "灵石县",
      "value": "2526",
      "childrens": [] }] },

  {
    "label": "临汾市",
    "value": "305",
    "childrens": [{
      "label": "尧都区",
      "value": "2527",
      "childrens": [] },
    {
      "label": "侯马市",
      "value": "2528",
      "childrens": [] },
    {
      "label": "霍州市",
      "value": "2529",
      "childrens": [] },
    {
      "label": "曲沃县",
      "value": "2530",
      "childrens": [] },
    {
      "label": "翼城县",
      "value": "2531",
      "childrens": [] },
    {
      "label": "襄汾县",
      "value": "2532",
      "childrens": [] },
    {
      "label": "洪洞县",
      "value": "2533",
      "childrens": [] },
    {
      "label": "吉县",
      "value": "2534",
      "childrens": [] },
    {
      "label": "安泽县",
      "value": "2535",
      "childrens": [] },
    {
      "label": "浮山县",
      "value": "2536",
      "childrens": [] },
    {
      "label": "古县",
      "value": "2537",
      "childrens": [] },
    {
      "label": "乡宁县",
      "value": "2538",
      "childrens": [] },
    {
      "label": "大宁县",
      "value": "2539",
      "childrens": [] },
    {
      "label": "隰县",
      "value": "2540",
      "childrens": [] },
    {
      "label": "永和县",
      "value": "2541",
      "childrens": [] },
    {
      "label": "蒲县",
      "value": "2542",
      "childrens": [] },
    {
      "label": "汾西县",
      "value": "2543",
      "childrens": [] }] },

  {
    "label": "吕梁市",
    "value": "306",
    "childrens": [{
      "label": "离石市",
      "value": "2544",
      "childrens": [] },
    {
      "label": "离石区",
      "value": "2545",
      "childrens": [] },
    {
      "label": "孝义市",
      "value": "2546",
      "childrens": [] },
    {
      "label": "汾阳市",
      "value": "2547",
      "childrens": [] },
    {
      "label": "文水县",
      "value": "2548",
      "childrens": [] },
    {
      "label": "交城县",
      "value": "2549",
      "childrens": [] },
    {
      "label": "兴县",
      "value": "2550",
      "childrens": [] },
    {
      "label": "临县",
      "value": "2551",
      "childrens": [] },
    {
      "label": "柳林县",
      "value": "2552",
      "childrens": [] },
    {
      "label": "石楼县",
      "value": "2553",
      "childrens": [] },
    {
      "label": "岚县",
      "value": "2554",
      "childrens": [] },
    {
      "label": "方山县",
      "value": "2555",
      "childrens": [] },
    {
      "label": "中阳县",
      "value": "2556",
      "childrens": [] },
    {
      "label": "交口县",
      "value": "2557",
      "childrens": [] }] },

  {
    "label": "朔州市",
    "value": "307",
    "childrens": [{
      "label": "朔城区",
      "value": "2558",
      "childrens": [] },
    {
      "label": "平鲁区",
      "value": "2559",
      "childrens": [] },
    {
      "label": "山阴县",
      "value": "2560",
      "childrens": [] },
    {
      "label": "应县",
      "value": "2561",
      "childrens": [] },
    {
      "label": "右玉县",
      "value": "2562",
      "childrens": [] },
    {
      "label": "怀仁县",
      "value": "2563",
      "childrens": [] }] },

  {
    "label": "忻州市",
    "value": "308",
    "childrens": [{
      "label": "忻府区",
      "value": "2564",
      "childrens": [] },
    {
      "label": "原平市",
      "value": "2565",
      "childrens": [] },
    {
      "label": "定襄县",
      "value": "2566",
      "childrens": [] },
    {
      "label": "五台县",
      "value": "2567",
      "childrens": [] },
    {
      "label": "代县",
      "value": "2568",
      "childrens": [] },
    {
      "label": "繁峙县",
      "value": "2569",
      "childrens": [] },
    {
      "label": "宁武县",
      "value": "2570",
      "childrens": [] },
    {
      "label": "静乐县",
      "value": "2571",
      "childrens": [] },
    {
      "label": "神池县",
      "value": "2572",
      "childrens": [] },
    {
      "label": "五寨县",
      "value": "2573",
      "childrens": [] },
    {
      "label": "岢岚县",
      "value": "2574",
      "childrens": [] },
    {
      "label": "河曲县",
      "value": "2575",
      "childrens": [] },
    {
      "label": "保德县",
      "value": "2576",
      "childrens": [] },
    {
      "label": "偏关县",
      "value": "2577",
      "childrens": [] }] },

  {
    "label": "阳泉市",
    "value": "309",
    "childrens": [{
      "label": "城区",
      "value": "2578",
      "childrens": [] },
    {
      "label": "矿区",
      "value": "2579",
      "childrens": [] },
    {
      "label": "郊区",
      "value": "2580",
      "childrens": [] },
    {
      "label": "平定县",
      "value": "2581",
      "childrens": [] },
    {
      "label": "盂县",
      "value": "2582",
      "childrens": [] }] },

  {
    "label": "运城市",
    "value": "310",
    "childrens": [{
      "label": "盐湖区",
      "value": "2583",
      "childrens": [] },
    {
      "label": "永济市",
      "value": "2584",
      "childrens": [] },
    {
      "label": "河津市",
      "value": "2585",
      "childrens": [] },
    {
      "label": "临猗县",
      "value": "2586",
      "childrens": [] },
    {
      "label": "万荣县",
      "value": "2587",
      "childrens": [] },
    {
      "label": "闻喜县",
      "value": "2588",
      "childrens": [] },
    {
      "label": "稷山县",
      "value": "2589",
      "childrens": [] },
    {
      "label": "新绛县",
      "value": "2590",
      "childrens": [] },
    {
      "label": "绛县",
      "value": "2591",
      "childrens": [] },
    {
      "label": "垣曲县",
      "value": "2592",
      "childrens": [] },
    {
      "label": "夏县",
      "value": "2593",
      "childrens": [] },
    {
      "label": "平陆县",
      "value": "2594",
      "childrens": [] },
    {
      "label": "芮城县",
      "value": "2595",
      "childrens": [] }] }] },


{
  "label": "陕西省",
  "value": "24",
  "childrens": [{
    "label": "西安市",
    "value": "311",
    "childrens": [{
      "label": "莲湖区",
      "value": "2596",
      "childrens": [] },
    {
      "label": "新城区",
      "value": "2597",
      "childrens": [] },
    {
      "label": "碑林区",
      "value": "2598",
      "childrens": [] },
    {
      "label": "雁塔区",
      "value": "2599",
      "childrens": [] },
    {
      "label": "灞桥区",
      "value": "2600",
      "childrens": [] },
    {
      "label": "未央区",
      "value": "2601",
      "childrens": [] },
    {
      "label": "阎良区",
      "value": "2602",
      "childrens": [] },
    {
      "label": "临潼区",
      "value": "2603",
      "childrens": [] },
    {
      "label": "长安区",
      "value": "2604",
      "childrens": [] },
    {
      "label": "蓝田县",
      "value": "2605",
      "childrens": [] },
    {
      "label": "周至县",
      "value": "2606",
      "childrens": [] },
    {
      "label": "户县",
      "value": "2607",
      "childrens": [] },
    {
      "label": "高陵县",
      "value": "2608",
      "childrens": [] }] },

  {
    "label": "安康市",
    "value": "312",
    "childrens": [{
      "label": "汉滨区",
      "value": "2609",
      "childrens": [] },
    {
      "label": "汉阴县",
      "value": "2610",
      "childrens": [] },
    {
      "label": "石泉县",
      "value": "2611",
      "childrens": [] },
    {
      "label": "宁陕县",
      "value": "2612",
      "childrens": [] },
    {
      "label": "紫阳县",
      "value": "2613",
      "childrens": [] },
    {
      "label": "岚皋县",
      "value": "2614",
      "childrens": [] },
    {
      "label": "平利县",
      "value": "2615",
      "childrens": [] },
    {
      "label": "镇坪县",
      "value": "2616",
      "childrens": [] },
    {
      "label": "旬阳县",
      "value": "2617",
      "childrens": [] },
    {
      "label": "白河县",
      "value": "2618",
      "childrens": [] }] },

  {
    "label": "宝鸡市",
    "value": "313",
    "childrens": [{
      "label": "陈仓区",
      "value": "2619",
      "childrens": [] },
    {
      "label": "渭滨区",
      "value": "2620",
      "childrens": [] },
    {
      "label": "金台区",
      "value": "2621",
      "childrens": [] },
    {
      "label": "凤翔县",
      "value": "2622",
      "childrens": [] },
    {
      "label": "岐山县",
      "value": "2623",
      "childrens": [] },
    {
      "label": "扶风县",
      "value": "2624",
      "childrens": [] },
    {
      "label": "眉县",
      "value": "2625",
      "childrens": [] },
    {
      "label": "陇县",
      "value": "2626",
      "childrens": [] },
    {
      "label": "千阳县",
      "value": "2627",
      "childrens": [] },
    {
      "label": "麟游县",
      "value": "2628",
      "childrens": [] },
    {
      "label": "凤县",
      "value": "2629",
      "childrens": [] },
    {
      "label": "太白县",
      "value": "2630",
      "childrens": [] }] },

  {
    "label": "汉中市",
    "value": "314",
    "childrens": [{
      "label": "汉台区",
      "value": "2631",
      "childrens": [] },
    {
      "label": "南郑县",
      "value": "2632",
      "childrens": [] },
    {
      "label": "城固县",
      "value": "2633",
      "childrens": [] },
    {
      "label": "洋县",
      "value": "2634",
      "childrens": [] },
    {
      "label": "西乡县",
      "value": "2635",
      "childrens": [] },
    {
      "label": "勉县",
      "value": "2636",
      "childrens": [] },
    {
      "label": "宁强县",
      "value": "2637",
      "childrens": [] },
    {
      "label": "略阳县",
      "value": "2638",
      "childrens": [] },
    {
      "label": "镇巴县",
      "value": "2639",
      "childrens": [] },
    {
      "label": "留坝县",
      "value": "2640",
      "childrens": [] },
    {
      "label": "佛坪县",
      "value": "2641",
      "childrens": [] }] },

  {
    "label": "商洛市",
    "value": "315",
    "childrens": [{
      "label": "商州区",
      "value": "2642",
      "childrens": [] },
    {
      "label": "洛南县",
      "value": "2643",
      "childrens": [] },
    {
      "label": "丹凤县",
      "value": "2644",
      "childrens": [] },
    {
      "label": "商南县",
      "value": "2645",
      "childrens": [] },
    {
      "label": "山阳县",
      "value": "2646",
      "childrens": [] },
    {
      "label": "镇安县",
      "value": "2647",
      "childrens": [] },
    {
      "label": "柞水县",
      "value": "2648",
      "childrens": [] }] },

  {
    "label": "铜川市",
    "value": "316",
    "childrens": [{
      "label": "耀州区",
      "value": "2649",
      "childrens": [] },
    {
      "label": "王益区",
      "value": "2650",
      "childrens": [] },
    {
      "label": "印台区",
      "value": "2651",
      "childrens": [] },
    {
      "label": "宜君县",
      "value": "2652",
      "childrens": [] }] },

  {
    "label": "渭南市",
    "value": "317",
    "childrens": [{
      "label": "临渭区",
      "value": "2653",
      "childrens": [] },
    {
      "label": "韩城市",
      "value": "2654",
      "childrens": [] },
    {
      "label": "华阴市",
      "value": "2655",
      "childrens": [] },
    {
      "label": "华县",
      "value": "2656",
      "childrens": [] },
    {
      "label": "潼关县",
      "value": "2657",
      "childrens": [] },
    {
      "label": "大荔县",
      "value": "2658",
      "childrens": [] },
    {
      "label": "合阳县",
      "value": "2659",
      "childrens": [] },
    {
      "label": "澄城县",
      "value": "2660",
      "childrens": [] },
    {
      "label": "蒲城县",
      "value": "2661",
      "childrens": [] },
    {
      "label": "白水县",
      "value": "2662",
      "childrens": [] },
    {
      "label": "富平县",
      "value": "2663",
      "childrens": [] }] },

  {
    "label": "咸阳市",
    "value": "318",
    "childrens": [{
      "label": "秦都区",
      "value": "2664",
      "childrens": [] },
    {
      "label": "渭城区",
      "value": "2665",
      "childrens": [] },
    {
      "label": "杨陵区",
      "value": "2666",
      "childrens": [] },
    {
      "label": "兴平市",
      "value": "2667",
      "childrens": [] },
    {
      "label": "三原县",
      "value": "2668",
      "childrens": [] },
    {
      "label": "泾阳县",
      "value": "2669",
      "childrens": [] },
    {
      "label": "乾县",
      "value": "2670",
      "childrens": [] },
    {
      "label": "礼泉县",
      "value": "2671",
      "childrens": [] },
    {
      "label": "永寿县",
      "value": "2672",
      "childrens": [] },
    {
      "label": "彬县",
      "value": "2673",
      "childrens": [] },
    {
      "label": "长武县",
      "value": "2674",
      "childrens": [] },
    {
      "label": "旬邑县",
      "value": "2675",
      "childrens": [] },
    {
      "label": "淳化县",
      "value": "2676",
      "childrens": [] },
    {
      "label": "武功县",
      "value": "2677",
      "childrens": [] }] },

  {
    "label": "延安市",
    "value": "319",
    "childrens": [{
      "label": "吴起县",
      "value": "2678",
      "childrens": [] },
    {
      "label": "宝塔区",
      "value": "2679",
      "childrens": [] },
    {
      "label": "延长县",
      "value": "2680",
      "childrens": [] },
    {
      "label": "延川县",
      "value": "2681",
      "childrens": [] },
    {
      "label": "子长县",
      "value": "2682",
      "childrens": [] },
    {
      "label": "安塞县",
      "value": "2683",
      "childrens": [] },
    {
      "label": "志丹县",
      "value": "2684",
      "childrens": [] },
    {
      "label": "甘泉县",
      "value": "2685",
      "childrens": [] },
    {
      "label": "富县",
      "value": "2686",
      "childrens": [] },
    {
      "label": "洛川县",
      "value": "2687",
      "childrens": [] },
    {
      "label": "宜川县",
      "value": "2688",
      "childrens": [] },
    {
      "label": "黄龙县",
      "value": "2689",
      "childrens": [] },
    {
      "label": "黄陵县",
      "value": "2690",
      "childrens": [] }] },

  {
    "label": "榆林市",
    "value": "320",
    "childrens": [{
      "label": "榆阳区",
      "value": "2691",
      "childrens": [] },
    {
      "label": "神木县",
      "value": "2692",
      "childrens": [] },
    {
      "label": "府谷县",
      "value": "2693",
      "childrens": [] },
    {
      "label": "横山县",
      "value": "2694",
      "childrens": [] },
    {
      "label": "靖边县",
      "value": "2695",
      "childrens": [] },
    {
      "label": "定边县",
      "value": "2696",
      "childrens": [] },
    {
      "label": "绥德县",
      "value": "2697",
      "childrens": [] },
    {
      "label": "米脂县",
      "value": "2698",
      "childrens": [] },
    {
      "label": "佳县",
      "value": "2699",
      "childrens": [] },
    {
      "label": "吴堡县",
      "value": "2700",
      "childrens": [] },
    {
      "label": "清涧县",
      "value": "2701",
      "childrens": [] },
    {
      "label": "子洲县",
      "value": "2702",
      "childrens": [] }] }] },


{
  "label": "上海",
  "value": "25",
  "childrens": [{
    "label": "上海市",
    "value": "321",
    "childrens": [{
      "label": "长宁区",
      "value": "2703",
      "childrens": [] },
    {
      "label": "闸北区",
      "value": "2704",
      "childrens": [] },
    {
      "label": "闵行区",
      "value": "2705",
      "childrens": [] },
    {
      "label": "徐汇区",
      "value": "2706",
      "childrens": [] },
    {
      "label": "浦东新区",
      "value": "2707",
      "childrens": [] },
    {
      "label": "杨浦区",
      "value": "2708",
      "childrens": [] },
    {
      "label": "普陀区",
      "value": "2709",
      "childrens": [] },
    {
      "label": "静安区",
      "value": "2710",
      "childrens": [] },
    {
      "label": "卢湾区",
      "value": "2711",
      "childrens": [] },
    {
      "label": "虹口区",
      "value": "2712",
      "childrens": [] },
    {
      "label": "黄浦区",
      "value": "2713",
      "childrens": [] },
    {
      "label": "南汇区",
      "value": "2714",
      "childrens": [] },
    {
      "label": "松江区",
      "value": "2715",
      "childrens": [] },
    {
      "label": "嘉定区",
      "value": "2716",
      "childrens": [] },
    {
      "label": "宝山区",
      "value": "2717",
      "childrens": [] },
    {
      "label": "青浦区",
      "value": "2718",
      "childrens": [] },
    {
      "label": "金山区",
      "value": "2719",
      "childrens": [] },
    {
      "label": "奉贤区",
      "value": "2720",
      "childrens": [] },
    {
      "label": "崇明县",
      "value": "2721",
      "childrens": [] }] }] },


{
  "label": "四川省",
  "value": "26",
  "childrens": [{
    "label": "成都市",
    "value": "322",
    "childrens": [{
      "label": "青羊区",
      "value": "2722",
      "childrens": [] },
    {
      "label": "锦江区",
      "value": "2723",
      "childrens": [] },
    {
      "label": "金牛区",
      "value": "2724",
      "childrens": [] },
    {
      "label": "武侯区",
      "value": "2725",
      "childrens": [] },
    {
      "label": "成华区",
      "value": "2726",
      "childrens": [] },
    {
      "label": "龙泉驿区",
      "value": "2727",
      "childrens": [] },
    {
      "label": "青白江区",
      "value": "2728",
      "childrens": [] },
    {
      "label": "新都区",
      "value": "2729",
      "childrens": [] },
    {
      "label": "温江区",
      "value": "2730",
      "childrens": [] },
    {
      "label": "高新区",
      "value": "2731",
      "childrens": [] },
    {
      "label": "高新西区",
      "value": "2732",
      "childrens": [] },
    {
      "label": "都江堰市",
      "value": "2733",
      "childrens": [] },
    {
      "label": "彭州市",
      "value": "2734",
      "childrens": [] },
    {
      "label": "邛崃市",
      "value": "2735",
      "childrens": [] },
    {
      "label": "崇州市",
      "value": "2736",
      "childrens": [] },
    {
      "label": "金堂县",
      "value": "2737",
      "childrens": [] },
    {
      "label": "双流县",
      "value": "2738",
      "childrens": [] },
    {
      "label": "郫县",
      "value": "2739",
      "childrens": [] },
    {
      "label": "大邑县",
      "value": "2740",
      "childrens": [] },
    {
      "label": "蒲江县",
      "value": "2741",
      "childrens": [] },
    {
      "label": "新津县",
      "value": "2742",
      "childrens": [] },
    {
      "label": "都江堰市",
      "value": "2743",
      "childrens": [] },
    {
      "label": "彭州市",
      "value": "2744",
      "childrens": [] },
    {
      "label": "邛崃市",
      "value": "2745",
      "childrens": [] },
    {
      "label": "崇州市",
      "value": "2746",
      "childrens": [] },
    {
      "label": "金堂县",
      "value": "2747",
      "childrens": [] },
    {
      "label": "双流县",
      "value": "2748",
      "childrens": [] },
    {
      "label": "郫县",
      "value": "2749",
      "childrens": [] },
    {
      "label": "大邑县",
      "value": "2750",
      "childrens": [] },
    {
      "label": "蒲江县",
      "value": "2751",
      "childrens": [] },
    {
      "label": "新津县",
      "value": "2752",
      "childrens": [] }] },

  {
    "label": "绵阳市",
    "value": "323",
    "childrens": [{
      "label": "涪城区",
      "value": "2753",
      "childrens": [] },
    {
      "label": "游仙区",
      "value": "2754",
      "childrens": [] },
    {
      "label": "江油市",
      "value": "2755",
      "childrens": [] },
    {
      "label": "盐亭县",
      "value": "2756",
      "childrens": [] },
    {
      "label": "三台县",
      "value": "2757",
      "childrens": [] },
    {
      "label": "平武县",
      "value": "2758",
      "childrens": [] },
    {
      "label": "安县",
      "value": "2759",
      "childrens": [] },
    {
      "label": "梓潼县",
      "value": "2760",
      "childrens": [] },
    {
      "label": "北川县",
      "value": "2761",
      "childrens": [] }] },

  {
    "label": "阿坝藏族羌族自治州",
    "value": "324",
    "childrens": [{
      "label": "马尔康县",
      "value": "2762",
      "childrens": [] },
    {
      "label": "汶川县",
      "value": "2763",
      "childrens": [] },
    {
      "label": "理县",
      "value": "2764",
      "childrens": [] },
    {
      "label": "茂县",
      "value": "2765",
      "childrens": [] },
    {
      "label": "松潘县",
      "value": "2766",
      "childrens": [] },
    {
      "label": "九寨沟县",
      "value": "2767",
      "childrens": [] },
    {
      "label": "金川县",
      "value": "2768",
      "childrens": [] },
    {
      "label": "小金县",
      "value": "2769",
      "childrens": [] },
    {
      "label": "黑水县",
      "value": "2770",
      "childrens": [] },
    {
      "label": "壤塘县",
      "value": "2771",
      "childrens": [] },
    {
      "label": "阿坝县",
      "value": "2772",
      "childrens": [] },
    {
      "label": "若尔盖县",
      "value": "2773",
      "childrens": [] },
    {
      "label": "红原县",
      "value": "2774",
      "childrens": [] }] },

  {
    "label": "巴中市",
    "value": "325",
    "childrens": [{
      "label": "巴州区",
      "value": "2775",
      "childrens": [] },
    {
      "label": "通江县",
      "value": "2776",
      "childrens": [] },
    {
      "label": "南江县",
      "value": "2777",
      "childrens": [] },
    {
      "label": "平昌县",
      "value": "2778",
      "childrens": [] }] },

  {
    "label": "达州市",
    "value": "326",
    "childrens": [{
      "label": "通川区",
      "value": "2779",
      "childrens": [] },
    {
      "label": "万源市",
      "value": "2780",
      "childrens": [] },
    {
      "label": "达县",
      "value": "2781",
      "childrens": [] },
    {
      "label": "宣汉县",
      "value": "2782",
      "childrens": [] },
    {
      "label": "开江县",
      "value": "2783",
      "childrens": [] },
    {
      "label": "大竹县",
      "value": "2784",
      "childrens": [] },
    {
      "label": "渠县",
      "value": "2785",
      "childrens": [] }] },

  {
    "label": "德阳市",
    "value": "327",
    "childrens": [{
      "label": "旌阳区",
      "value": "2786",
      "childrens": [] },
    {
      "label": "广汉市",
      "value": "2787",
      "childrens": [] },
    {
      "label": "什邡市",
      "value": "2788",
      "childrens": [] },
    {
      "label": "绵竹市",
      "value": "2789",
      "childrens": [] },
    {
      "label": "罗江县",
      "value": "2790",
      "childrens": [] },
    {
      "label": "中江县",
      "value": "2791",
      "childrens": [] }] },

  {
    "label": "甘孜藏族自治州",
    "value": "328",
    "childrens": [{
      "label": "康定县",
      "value": "2792",
      "childrens": [] },
    {
      "label": "丹巴县",
      "value": "2793",
      "childrens": [] },
    {
      "label": "泸定县",
      "value": "2794",
      "childrens": [] },
    {
      "label": "炉霍县",
      "value": "2795",
      "childrens": [] },
    {
      "label": "九龙县",
      "value": "2796",
      "childrens": [] },
    {
      "label": "甘孜县",
      "value": "2797",
      "childrens": [] },
    {
      "label": "雅江县",
      "value": "2798",
      "childrens": [] },
    {
      "label": "新龙县",
      "value": "2799",
      "childrens": [] },
    {
      "label": "道孚县",
      "value": "2800",
      "childrens": [] },
    {
      "label": "白玉县",
      "value": "2801",
      "childrens": [] },
    {
      "label": "理塘县",
      "value": "2802",
      "childrens": [] },
    {
      "label": "德格县",
      "value": "2803",
      "childrens": [] },
    {
      "label": "乡城县",
      "value": "2804",
      "childrens": [] },
    {
      "label": "石渠县",
      "value": "2805",
      "childrens": [] },
    {
      "label": "稻城县",
      "value": "2806",
      "childrens": [] },
    {
      "label": "色达县",
      "value": "2807",
      "childrens": [] },
    {
      "label": "巴塘县",
      "value": "2808",
      "childrens": [] },
    {
      "label": "得荣县",
      "value": "2809",
      "childrens": [] }] },

  {
    "label": "广安市",
    "value": "329",
    "childrens": [{
      "label": "广安区",
      "value": "2810",
      "childrens": [] },
    {
      "label": "华蓥市",
      "value": "2811",
      "childrens": [] },
    {
      "label": "岳池县",
      "value": "2812",
      "childrens": [] },
    {
      "label": "武胜县",
      "value": "2813",
      "childrens": [] },
    {
      "label": "邻水县",
      "value": "2814",
      "childrens": [] }] },

  {
    "label": "广元市",
    "value": "330",
    "childrens": [{
      "label": "利州区",
      "value": "2815",
      "childrens": [] },
    {
      "label": "元坝区",
      "value": "2816",
      "childrens": [] },
    {
      "label": "朝天区",
      "value": "2817",
      "childrens": [] },
    {
      "label": "旺苍县",
      "value": "2818",
      "childrens": [] },
    {
      "label": "青川县",
      "value": "2819",
      "childrens": [] },
    {
      "label": "剑阁县",
      "value": "2820",
      "childrens": [] },
    {
      "label": "苍溪县",
      "value": "2821",
      "childrens": [] }] },

  {
    "label": "乐山市",
    "value": "331",
    "childrens": [{
      "label": "峨眉山市",
      "value": "2822",
      "childrens": [] },
    {
      "label": "乐山市",
      "value": "2823",
      "childrens": [] },
    {
      "label": "犍为县",
      "value": "2824",
      "childrens": [] },
    {
      "label": "井研县",
      "value": "2825",
      "childrens": [] },
    {
      "label": "夹江县",
      "value": "2826",
      "childrens": [] },
    {
      "label": "沐川县",
      "value": "2827",
      "childrens": [] },
    {
      "label": "峨边",
      "value": "2828",
      "childrens": [] },
    {
      "label": "马边",
      "value": "2829",
      "childrens": [] }] },

  {
    "label": "凉山市",
    "value": "332",
    "childrens": [{
      "label": "西昌市",
      "value": "2830",
      "childrens": [] },
    {
      "label": "盐源县",
      "value": "2831",
      "childrens": [] },
    {
      "label": "德昌县",
      "value": "2832",
      "childrens": [] },
    {
      "label": "会理县",
      "value": "2833",
      "childrens": [] },
    {
      "label": "会东县",
      "value": "2834",
      "childrens": [] },
    {
      "label": "宁南县",
      "value": "2835",
      "childrens": [] },
    {
      "label": "普格县",
      "value": "2836",
      "childrens": [] },
    {
      "label": "布拖县",
      "value": "2837",
      "childrens": [] },
    {
      "label": "金阳县",
      "value": "2838",
      "childrens": [] },
    {
      "label": "昭觉县",
      "value": "2839",
      "childrens": [] },
    {
      "label": "喜德县",
      "value": "2840",
      "childrens": [] },
    {
      "label": "冕宁县",
      "value": "2841",
      "childrens": [] },
    {
      "label": "越西县",
      "value": "2842",
      "childrens": [] },
    {
      "label": "甘洛县",
      "value": "2843",
      "childrens": [] },
    {
      "label": "美姑县",
      "value": "2844",
      "childrens": [] },
    {
      "label": "雷波县",
      "value": "2845",
      "childrens": [] },
    {
      "label": "木里",
      "value": "2846",
      "childrens": [] }] },

  {
    "label": "眉山市",
    "value": "333",
    "childrens": [{
      "label": "东坡区",
      "value": "2847",
      "childrens": [] },
    {
      "label": "仁寿县",
      "value": "2848",
      "childrens": [] },
    {
      "label": "彭山县",
      "value": "2849",
      "childrens": [] },
    {
      "label": "洪雅县",
      "value": "2850",
      "childrens": [] },
    {
      "label": "丹棱县",
      "value": "2851",
      "childrens": [] },
    {
      "label": "青神县",
      "value": "2852",
      "childrens": [] }] },

  {
    "label": "南充市",
    "value": "334",
    "childrens": [{
      "label": "阆中市",
      "value": "2853",
      "childrens": [] },
    {
      "label": "南部县",
      "value": "2854",
      "childrens": [] },
    {
      "label": "营山县",
      "value": "2855",
      "childrens": [] },
    {
      "label": "蓬安县",
      "value": "2856",
      "childrens": [] },
    {
      "label": "仪陇县",
      "value": "2857",
      "childrens": [] },
    {
      "label": "顺庆区",
      "value": "2858",
      "childrens": [] },
    {
      "label": "高坪区",
      "value": "2859",
      "childrens": [] },
    {
      "label": "嘉陵区",
      "value": "2860",
      "childrens": [] },
    {
      "label": "西充县",
      "value": "2861",
      "childrens": [] }] },

  {
    "label": "内江市",
    "value": "335",
    "childrens": [{
      "label": "市中区",
      "value": "2862",
      "childrens": [] },
    {
      "label": "东兴区",
      "value": "2863",
      "childrens": [] },
    {
      "label": "威远县",
      "value": "2864",
      "childrens": [] },
    {
      "label": "资中县",
      "value": "2865",
      "childrens": [] },
    {
      "label": "隆昌县",
      "value": "2866",
      "childrens": [] }] },

  {
    "label": "攀枝花市",
    "value": "336",
    "childrens": [{
      "label": "东  区",
      "value": "2867",
      "childrens": [] },
    {
      "label": "西  区",
      "value": "2868",
      "childrens": [] },
    {
      "label": "仁和区",
      "value": "2869",
      "childrens": [] },
    {
      "label": "米易县",
      "value": "2870",
      "childrens": [] },
    {
      "label": "盐边县",
      "value": "2871",
      "childrens": [] }] },

  {
    "label": "遂宁市",
    "value": "337",
    "childrens": [{
      "label": "船山区",
      "value": "2872",
      "childrens": [] },
    {
      "label": "安居区",
      "value": "2873",
      "childrens": [] },
    {
      "label": "蓬溪县",
      "value": "2874",
      "childrens": [] },
    {
      "label": "射洪县",
      "value": "2875",
      "childrens": [] },
    {
      "label": "大英县",
      "value": "2876",
      "childrens": [] }] },

  {
    "label": "雅安市",
    "value": "338",
    "childrens": [{
      "label": "雨城区",
      "value": "2877",
      "childrens": [] },
    {
      "label": "名山县",
      "value": "2878",
      "childrens": [] },
    {
      "label": "荥经县",
      "value": "2879",
      "childrens": [] },
    {
      "label": "汉源县",
      "value": "2880",
      "childrens": [] },
    {
      "label": "石棉县",
      "value": "2881",
      "childrens": [] },
    {
      "label": "天全县",
      "value": "2882",
      "childrens": [] },
    {
      "label": "芦山县",
      "value": "2883",
      "childrens": [] },
    {
      "label": "宝兴县",
      "value": "2884",
      "childrens": [] }] },

  {
    "label": "宜宾市",
    "value": "339",
    "childrens": [{
      "label": "翠屏区",
      "value": "2885",
      "childrens": [] },
    {
      "label": "宜宾县",
      "value": "2886",
      "childrens": [] },
    {
      "label": "南溪县",
      "value": "2887",
      "childrens": [] },
    {
      "label": "江安县",
      "value": "2888",
      "childrens": [] },
    {
      "label": "长宁县",
      "value": "2889",
      "childrens": [] },
    {
      "label": "高县",
      "value": "2890",
      "childrens": [] },
    {
      "label": "珙县",
      "value": "2891",
      "childrens": [] },
    {
      "label": "筠连县",
      "value": "2892",
      "childrens": [] },
    {
      "label": "兴文县",
      "value": "2893",
      "childrens": [] },
    {
      "label": "屏山县",
      "value": "2894",
      "childrens": [] }] },

  {
    "label": "资阳市",
    "value": "340",
    "childrens": [{
      "label": "雁江区",
      "value": "2895",
      "childrens": [] },
    {
      "label": "简阳市",
      "value": "2896",
      "childrens": [] },
    {
      "label": "安岳县",
      "value": "2897",
      "childrens": [] },
    {
      "label": "乐至县",
      "value": "2898",
      "childrens": [] }] },

  {
    "label": "自贡市",
    "value": "341",
    "childrens": [{
      "label": "大安区",
      "value": "2899",
      "childrens": [] },
    {
      "label": "自流井区",
      "value": "2900",
      "childrens": [] },
    {
      "label": "贡井区",
      "value": "2901",
      "childrens": [] },
    {
      "label": "沿滩区",
      "value": "2902",
      "childrens": [] },
    {
      "label": "荣县",
      "value": "2903",
      "childrens": [] },
    {
      "label": "富顺县",
      "value": "2904",
      "childrens": [] }] },

  {
    "label": "泸州市",
    "value": "342",
    "childrens": [{
      "label": "江阳区",
      "value": "2905",
      "childrens": [] },
    {
      "label": "纳溪区",
      "value": "2906",
      "childrens": [] },
    {
      "label": "龙马潭区",
      "value": "2907",
      "childrens": [] },
    {
      "label": "泸县",
      "value": "2908",
      "childrens": [] },
    {
      "label": "合江县",
      "value": "2909",
      "childrens": [] },
    {
      "label": "叙永县",
      "value": "2910",
      "childrens": [] },
    {
      "label": "古蔺县",
      "value": "2911",
      "childrens": [] }] }] },


{
  "label": "天津",
  "value": "27",
  "childrens": [{
    "label": "天津市",
    "value": "343",
    "childrens": [{
      "label": "和平区",
      "value": "2912",
      "childrens": [] },
    {
      "label": "河西区",
      "value": "2913",
      "childrens": [] },
    {
      "label": "南开区",
      "value": "2914",
      "childrens": [] },
    {
      "label": "河北区",
      "value": "2915",
      "childrens": [] },
    {
      "label": "河东区",
      "value": "2916",
      "childrens": [] },
    {
      "label": "红桥区",
      "value": "2917",
      "childrens": [] },
    {
      "label": "东丽区",
      "value": "2918",
      "childrens": [] },
    {
      "label": "津南区",
      "value": "2919",
      "childrens": [] },
    {
      "label": "西青区",
      "value": "2920",
      "childrens": [] },
    {
      "label": "北辰区",
      "value": "2921",
      "childrens": [] },
    {
      "label": "塘沽区",
      "value": "2922",
      "childrens": [] },
    {
      "label": "汉沽区",
      "value": "2923",
      "childrens": [] },
    {
      "label": "大港区",
      "value": "2924",
      "childrens": [] },
    {
      "label": "武清区",
      "value": "2925",
      "childrens": [] },
    {
      "label": "宝坻区",
      "value": "2926",
      "childrens": [] },
    {
      "label": "经济开发区",
      "value": "2927",
      "childrens": [] },
    {
      "label": "宁河县",
      "value": "2928",
      "childrens": [] },
    {
      "label": "静海县",
      "value": "2929",
      "childrens": [] },
    {
      "label": "蓟县",
      "value": "2930",
      "childrens": [] }] }] },


{
  "label": "西藏自治区",
  "value": "28",
  "childrens": [{
    "label": "拉萨市",
    "value": "344",
    "childrens": [{
      "label": "城关区",
      "value": "2931",
      "childrens": [] },
    {
      "label": "林周县",
      "value": "2932",
      "childrens": [] },
    {
      "label": "当雄县",
      "value": "2933",
      "childrens": [] },
    {
      "label": "尼木县",
      "value": "2934",
      "childrens": [] },
    {
      "label": "曲水县",
      "value": "2935",
      "childrens": [] },
    {
      "label": "堆龙德庆县",
      "value": "2936",
      "childrens": [] },
    {
      "label": "达孜县",
      "value": "2937",
      "childrens": [] },
    {
      "label": "墨竹工卡县",
      "value": "2938",
      "childrens": [] }] },

  {
    "label": "阿里市",
    "value": "345",
    "childrens": [{
      "label": "噶尔县",
      "value": "2939",
      "childrens": [] },
    {
      "label": "普兰县",
      "value": "2940",
      "childrens": [] },
    {
      "label": "札达县",
      "value": "2941",
      "childrens": [] },
    {
      "label": "日土县",
      "value": "2942",
      "childrens": [] },
    {
      "label": "革吉县",
      "value": "2943",
      "childrens": [] },
    {
      "label": "改则县",
      "value": "2944",
      "childrens": [] },
    {
      "label": "措勤县",
      "value": "2945",
      "childrens": [] }] },

  {
    "label": "昌都市",
    "value": "346",
    "childrens": [{
      "label": "昌都县",
      "value": "2946",
      "childrens": [] },
    {
      "label": "江达县",
      "value": "2947",
      "childrens": [] },
    {
      "label": "贡觉县",
      "value": "2948",
      "childrens": [] },
    {
      "label": "类乌齐县",
      "value": "2949",
      "childrens": [] },
    {
      "label": "丁青县",
      "value": "2950",
      "childrens": [] },
    {
      "label": "察雅县",
      "value": "2951",
      "childrens": [] },
    {
      "label": "八宿县",
      "value": "2952",
      "childrens": [] },
    {
      "label": "左贡县",
      "value": "2953",
      "childrens": [] },
    {
      "label": "芒康县",
      "value": "2954",
      "childrens": [] },
    {
      "label": "洛隆县",
      "value": "2955",
      "childrens": [] },
    {
      "label": "边坝县",
      "value": "2956",
      "childrens": [] }] },

  {
    "label": "林芝市",
    "value": "347",
    "childrens": [{
      "label": "林芝县",
      "value": "2957",
      "childrens": [] },
    {
      "label": "工布江达县",
      "value": "2958",
      "childrens": [] },
    {
      "label": "米林县",
      "value": "2959",
      "childrens": [] },
    {
      "label": "墨脱县",
      "value": "2960",
      "childrens": [] },
    {
      "label": "波密县",
      "value": "2961",
      "childrens": [] },
    {
      "label": "察隅县",
      "value": "2962",
      "childrens": [] },
    {
      "label": "朗县",
      "value": "2963",
      "childrens": [] }] },

  {
    "label": "那曲市",
    "value": "348",
    "childrens": [{
      "label": "那曲县",
      "value": "2964",
      "childrens": [] },
    {
      "label": "嘉黎县",
      "value": "2965",
      "childrens": [] },
    {
      "label": "比如县",
      "value": "2966",
      "childrens": [] },
    {
      "label": "聂荣县",
      "value": "2967",
      "childrens": [] },
    {
      "label": "安多县",
      "value": "2968",
      "childrens": [] },
    {
      "label": "申扎县",
      "value": "2969",
      "childrens": [] },
    {
      "label": "索县",
      "value": "2970",
      "childrens": [] },
    {
      "label": "班戈县",
      "value": "2971",
      "childrens": [] },
    {
      "label": "巴青县",
      "value": "2972",
      "childrens": [] },
    {
      "label": "尼玛县",
      "value": "2973",
      "childrens": [] }] },

  {
    "label": "日喀则市",
    "value": "349",
    "childrens": [{
      "label": "日喀则市",
      "value": "2974",
      "childrens": [] },
    {
      "label": "南木林县",
      "value": "2975",
      "childrens": [] },
    {
      "label": "江孜县",
      "value": "2976",
      "childrens": [] },
    {
      "label": "定日县",
      "value": "2977",
      "childrens": [] },
    {
      "label": "萨迦县",
      "value": "2978",
      "childrens": [] },
    {
      "label": "拉孜县",
      "value": "2979",
      "childrens": [] },
    {
      "label": "昂仁县",
      "value": "2980",
      "childrens": [] },
    {
      "label": "谢通门县",
      "value": "2981",
      "childrens": [] },
    {
      "label": "白朗县",
      "value": "2982",
      "childrens": [] },
    {
      "label": "仁布县",
      "value": "2983",
      "childrens": [] },
    {
      "label": "康马县",
      "value": "2984",
      "childrens": [] },
    {
      "label": "定结县",
      "value": "2985",
      "childrens": [] },
    {
      "label": "仲巴县",
      "value": "2986",
      "childrens": [] },
    {
      "label": "亚东县",
      "value": "2987",
      "childrens": [] },
    {
      "label": "吉隆县",
      "value": "2988",
      "childrens": [] },
    {
      "label": "聂拉木县",
      "value": "2989",
      "childrens": [] },
    {
      "label": "萨嘎县",
      "value": "2990",
      "childrens": [] },
    {
      "label": "岗巴县",
      "value": "2991",
      "childrens": [] }] },

  {
    "label": "山南市",
    "value": "350",
    "childrens": [{
      "label": "乃东县",
      "value": "2992",
      "childrens": [] },
    {
      "label": "扎囊县",
      "value": "2993",
      "childrens": [] },
    {
      "label": "贡嘎县",
      "value": "2994",
      "childrens": [] },
    {
      "label": "桑日县",
      "value": "2995",
      "childrens": [] },
    {
      "label": "琼结县",
      "value": "2996",
      "childrens": [] },
    {
      "label": "曲松县",
      "value": "2997",
      "childrens": [] },
    {
      "label": "措美县",
      "value": "2998",
      "childrens": [] },
    {
      "label": "洛扎县",
      "value": "2999",
      "childrens": [] },
    {
      "label": "加查县",
      "value": "3000",
      "childrens": [] },
    {
      "label": "隆子县",
      "value": "3001",
      "childrens": [] },
    {
      "label": "错那县",
      "value": "3002",
      "childrens": [] },
    {
      "label": "浪卡子县",
      "value": "3003",
      "childrens": [] }] }] },


{
  "label": "新疆维吾尔自治区",
  "value": "29",
  "childrens": [{
    "label": "乌鲁木齐市",
    "value": "351",
    "childrens": [{
      "label": "天山区",
      "value": "3004",
      "childrens": [] },
    {
      "label": "沙依巴克区",
      "value": "3005",
      "childrens": [] },
    {
      "label": "新市区",
      "value": "3006",
      "childrens": [] },
    {
      "label": "水磨沟区",
      "value": "3007",
      "childrens": [] },
    {
      "label": "头屯河区",
      "value": "3008",
      "childrens": [] },
    {
      "label": "达坂城区",
      "value": "3009",
      "childrens": [] },
    {
      "label": "米东区",
      "value": "3010",
      "childrens": [] },
    {
      "label": "乌鲁木齐县",
      "value": "3011",
      "childrens": [] }] },

  {
    "label": "阿克苏地区",
    "value": "352",
    "childrens": [{
      "label": "阿克苏市",
      "value": "3012",
      "childrens": [] },
    {
      "label": "温宿县",
      "value": "3013",
      "childrens": [] },
    {
      "label": "库车县",
      "value": "3014",
      "childrens": [] },
    {
      "label": "沙雅县",
      "value": "3015",
      "childrens": [] },
    {
      "label": "新和县",
      "value": "3016",
      "childrens": [] },
    {
      "label": "拜城县",
      "value": "3017",
      "childrens": [] },
    {
      "label": "乌什县",
      "value": "3018",
      "childrens": [] },
    {
      "label": "阿瓦提县",
      "value": "3019",
      "childrens": [] },
    {
      "label": "柯坪县",
      "value": "3020",
      "childrens": [] }] },

  {
    "label": "阿拉尔市",
    "value": "353",
    "childrens": [{
      "label": "阿拉尔市",
      "value": "3021",
      "childrens": [] }] },

  {
    "label": "巴音郭楞蒙古自治州",
    "value": "354",
    "childrens": [{
      "label": "库尔勒市",
      "value": "3022",
      "childrens": [] },
    {
      "label": "轮台县",
      "value": "3023",
      "childrens": [] },
    {
      "label": "尉犁县",
      "value": "3024",
      "childrens": [] },
    {
      "label": "若羌县",
      "value": "3025",
      "childrens": [] },
    {
      "label": "且末县",
      "value": "3026",
      "childrens": [] },
    {
      "label": "焉耆",
      "value": "3027",
      "childrens": [] },
    {
      "label": "和静县",
      "value": "3028",
      "childrens": [] },
    {
      "label": "和硕县",
      "value": "3029",
      "childrens": [] },
    {
      "label": "博湖县",
      "value": "3030",
      "childrens": [] }] },

  {
    "label": "博尔塔拉蒙古自治州",
    "value": "355",
    "childrens": [{
      "label": "博乐市",
      "value": "3031",
      "childrens": [] },
    {
      "label": "精河县",
      "value": "3032",
      "childrens": [] },
    {
      "label": "温泉县",
      "value": "3033",
      "childrens": [] }] },

  {
    "label": "昌吉回族自治州",
    "value": "356",
    "childrens": [{
      "label": "呼图壁县",
      "value": "3034",
      "childrens": [] },
    {
      "label": "米泉市",
      "value": "3035",
      "childrens": [] },
    {
      "label": "昌吉市",
      "value": "3036",
      "childrens": [] },
    {
      "label": "阜康市",
      "value": "3037",
      "childrens": [] },
    {
      "label": "玛纳斯县",
      "value": "3038",
      "childrens": [] },
    {
      "label": "奇台县",
      "value": "3039",
      "childrens": [] },
    {
      "label": "吉木萨尔县",
      "value": "3040",
      "childrens": [] },
    {
      "label": "木垒",
      "value": "3041",
      "childrens": [] }] },

  {
    "label": "哈密市",
    "value": "357",
    "childrens": [{
      "label": "哈密市",
      "value": "3042",
      "childrens": [] },
    {
      "label": "伊吾县",
      "value": "3043",
      "childrens": [] },
    {
      "label": "巴里坤",
      "value": "3044",
      "childrens": [] }] },

  {
    "label": "和田地区",
    "value": "358",
    "childrens": [{
      "label": "和田市",
      "value": "3045",
      "childrens": [] },
    {
      "label": "和田县",
      "value": "3046",
      "childrens": [] },
    {
      "label": "墨玉县",
      "value": "3047",
      "childrens": [] },
    {
      "label": "皮山县",
      "value": "3048",
      "childrens": [] },
    {
      "label": "洛浦县",
      "value": "3049",
      "childrens": [] },
    {
      "label": "策勒县",
      "value": "3050",
      "childrens": [] },
    {
      "label": "于田县",
      "value": "3051",
      "childrens": [] },
    {
      "label": "民丰县",
      "value": "3052",
      "childrens": [] }] },

  {
    "label": "喀什地区",
    "value": "359",
    "childrens": [{
      "label": "喀什市",
      "value": "3053",
      "childrens": [] },
    {
      "label": "疏附县",
      "value": "3054",
      "childrens": [] },
    {
      "label": "疏勒县",
      "value": "3055",
      "childrens": [] },
    {
      "label": "英吉沙县",
      "value": "3056",
      "childrens": [] },
    {
      "label": "泽普县",
      "value": "3057",
      "childrens": [] },
    {
      "label": "莎车县",
      "value": "3058",
      "childrens": [] },
    {
      "label": "叶城县",
      "value": "3059",
      "childrens": [] },
    {
      "label": "麦盖提县",
      "value": "3060",
      "childrens": [] },
    {
      "label": "岳普湖县",
      "value": "3061",
      "childrens": [] },
    {
      "label": "伽师县",
      "value": "3062",
      "childrens": [] },
    {
      "label": "巴楚县",
      "value": "3063",
      "childrens": [] },
    {
      "label": "塔什库尔干",
      "value": "3064",
      "childrens": [] }] },

  {
    "label": "克拉玛依市",
    "value": "360",
    "childrens": [{
      "label": "克拉玛依市",
      "value": "3065",
      "childrens": [] }] },

  {
    "label": "克孜勒苏柯尔克孜自治州",
    "value": "361",
    "childrens": [{
      "label": "阿图什市",
      "value": "3066",
      "childrens": [] },
    {
      "label": "阿克陶县",
      "value": "3067",
      "childrens": [] },
    {
      "label": "阿合奇县",
      "value": "3068",
      "childrens": [] },
    {
      "label": "乌恰县",
      "value": "3069",
      "childrens": [] }] },

  {
    "label": "石河子市",
    "value": "362",
    "childrens": [{
      "label": "石河子市",
      "value": "3070",
      "childrens": [] }] },

  {
    "label": "图木舒克市",
    "value": "363",
    "childrens": [{
      "label": "图木舒克市",
      "value": "3071",
      "childrens": [] }] },

  {
    "label": "吐鲁番市",
    "value": "364",
    "childrens": [{
      "label": "吐鲁番市",
      "value": "3072",
      "childrens": [] },
    {
      "label": "鄯善县",
      "value": "3073",
      "childrens": [] },
    {
      "label": "托克逊县",
      "value": "3074",
      "childrens": [] }] },

  {
    "label": "五家渠市",
    "value": "365",
    "childrens": [{
      "label": "五家渠市",
      "value": "3075",
      "childrens": [] }] },

  {
    "label": "伊犁哈萨克自治州",
    "value": "366",
    "childrens": [{
      "label": "阿勒泰市",
      "value": "3076",
      "childrens": [] },
    {
      "label": "布克赛尔",
      "value": "3077",
      "childrens": [] },
    {
      "label": "伊宁市",
      "value": "3078",
      "childrens": [] },
    {
      "label": "布尔津县",
      "value": "3079",
      "childrens": [] },
    {
      "label": "奎屯市",
      "value": "3080",
      "childrens": [] },
    {
      "label": "乌苏市",
      "value": "3081",
      "childrens": [] },
    {
      "label": "额敏县",
      "value": "3082",
      "childrens": [] },
    {
      "label": "富蕴县",
      "value": "3083",
      "childrens": [] },
    {
      "label": "伊宁县",
      "value": "3084",
      "childrens": [] },
    {
      "label": "福海县",
      "value": "3085",
      "childrens": [] },
    {
      "label": "霍城县",
      "value": "3086",
      "childrens": [] },
    {
      "label": "沙湾县",
      "value": "3087",
      "childrens": [] },
    {
      "label": "巩留县",
      "value": "3088",
      "childrens": [] },
    {
      "label": "哈巴河县",
      "value": "3089",
      "childrens": [] },
    {
      "label": "托里县",
      "value": "3090",
      "childrens": [] },
    {
      "label": "青河县",
      "value": "3091",
      "childrens": [] },
    {
      "label": "新源县",
      "value": "3092",
      "childrens": [] },
    {
      "label": "裕民县",
      "value": "3093",
      "childrens": [] },
    {
      "label": "和布克赛尔",
      "value": "3094",
      "childrens": [] },
    {
      "label": "吉木乃县",
      "value": "3095",
      "childrens": [] },
    {
      "label": "昭苏县",
      "value": "3096",
      "childrens": [] },
    {
      "label": "特克斯县",
      "value": "3097",
      "childrens": [] },
    {
      "label": "尼勒克县",
      "value": "3098",
      "childrens": [] },
    {
      "label": "察布查尔",
      "value": "3099",
      "childrens": [] }] }] },


{
  "label": "云南省",
  "value": "30",
  "childrens": [{
    "label": "昆明市",
    "value": "367",
    "childrens": [{
      "label": "盘龙区",
      "value": "3100",
      "childrens": [] },
    {
      "label": "五华区",
      "value": "3101",
      "childrens": [] },
    {
      "label": "官渡区",
      "value": "3102",
      "childrens": [] },
    {
      "label": "西山区",
      "value": "3103",
      "childrens": [] },
    {
      "label": "东川区",
      "value": "3104",
      "childrens": [] },
    {
      "label": "安宁市",
      "value": "3105",
      "childrens": [] },
    {
      "label": "呈贡县",
      "value": "3106",
      "childrens": [] },
    {
      "label": "晋宁县",
      "value": "3107",
      "childrens": [] },
    {
      "label": "富民县",
      "value": "3108",
      "childrens": [] },
    {
      "label": "宜良县",
      "value": "3109",
      "childrens": [] },
    {
      "label": "嵩明县",
      "value": "3110",
      "childrens": [] },
    {
      "label": "石林县",
      "value": "3111",
      "childrens": [] },
    {
      "label": "禄劝",
      "value": "3112",
      "childrens": [] },
    {
      "label": "寻甸",
      "value": "3113",
      "childrens": [] }] },

  {
    "label": "怒江傈傈族自治州",
    "value": "368",
    "childrens": [{
      "label": "兰坪",
      "value": "3114",
      "childrens": [] },
    {
      "label": "泸水县",
      "value": "3115",
      "childrens": [] },
    {
      "label": "福贡县",
      "value": "3116",
      "childrens": [] },
    {
      "label": "贡山",
      "value": "3117",
      "childrens": [] }] },

  {
    "label": "普洱市",
    "value": "369",
    "childrens": [{
      "label": "宁洱",
      "value": "3118",
      "childrens": [] },
    {
      "label": "思茅区",
      "value": "3119",
      "childrens": [] },
    {
      "label": "墨江",
      "value": "3120",
      "childrens": [] },
    {
      "label": "景东",
      "value": "3121",
      "childrens": [] },
    {
      "label": "景谷",
      "value": "3122",
      "childrens": [] },
    {
      "label": "镇沅",
      "value": "3123",
      "childrens": [] },
    {
      "label": "江城",
      "value": "3124",
      "childrens": [] },
    {
      "label": "孟连",
      "value": "3125",
      "childrens": [] },
    {
      "label": "澜沧",
      "value": "3126",
      "childrens": [] },
    {
      "label": "西盟",
      "value": "3127",
      "childrens": [] }] },

  {
    "label": "丽江市",
    "value": "370",
    "childrens": [{
      "label": "古城区",
      "value": "3128",
      "childrens": [] },
    {
      "label": "宁蒗",
      "value": "3129",
      "childrens": [] },
    {
      "label": "玉龙",
      "value": "3130",
      "childrens": [] },
    {
      "label": "永胜县",
      "value": "3131",
      "childrens": [] },
    {
      "label": "华坪县",
      "value": "3132",
      "childrens": [] }] },

  {
    "label": "保山市",
    "value": "371",
    "childrens": [{
      "label": "隆阳区",
      "value": "3133",
      "childrens": [] },
    {
      "label": "施甸县",
      "value": "3134",
      "childrens": [] },
    {
      "label": "腾冲县",
      "value": "3135",
      "childrens": [] },
    {
      "label": "龙陵县",
      "value": "3136",
      "childrens": [] },
    {
      "label": "昌宁县",
      "value": "3137",
      "childrens": [] }] },

  {
    "label": "楚雄彝族自治州",
    "value": "372",
    "childrens": [{
      "label": "楚雄市",
      "value": "3138",
      "childrens": [] },
    {
      "label": "双柏县",
      "value": "3139",
      "childrens": [] },
    {
      "label": "牟定县",
      "value": "3140",
      "childrens": [] },
    {
      "label": "南华县",
      "value": "3141",
      "childrens": [] },
    {
      "label": "姚安县",
      "value": "3142",
      "childrens": [] },
    {
      "label": "大姚县",
      "value": "3143",
      "childrens": [] },
    {
      "label": "永仁县",
      "value": "3144",
      "childrens": [] },
    {
      "label": "元谋县",
      "value": "3145",
      "childrens": [] },
    {
      "label": "武定县",
      "value": "3146",
      "childrens": [] },
    {
      "label": "禄丰县",
      "value": "3147",
      "childrens": [] }] },

  {
    "label": "大理白簇自治州",
    "value": "373",
    "childrens": [{
      "label": "大理市",
      "value": "3148",
      "childrens": [] },
    {
      "label": "祥云县",
      "value": "3149",
      "childrens": [] },
    {
      "label": "宾川县",
      "value": "3150",
      "childrens": [] },
    {
      "label": "弥渡县",
      "value": "3151",
      "childrens": [] },
    {
      "label": "永平县",
      "value": "3152",
      "childrens": [] },
    {
      "label": "云龙县",
      "value": "3153",
      "childrens": [] },
    {
      "label": "洱源县",
      "value": "3154",
      "childrens": [] },
    {
      "label": "剑川县",
      "value": "3155",
      "childrens": [] },
    {
      "label": "鹤庆县",
      "value": "3156",
      "childrens": [] },
    {
      "label": "漾濞",
      "value": "3157",
      "childrens": [] },
    {
      "label": "南涧",
      "value": "3158",
      "childrens": [] },
    {
      "label": "巍山",
      "value": "3159",
      "childrens": [] }] },

  {
    "label": "德宏傣族景颇族自治州",
    "value": "374",
    "childrens": [{
      "label": "潞西市",
      "value": "3160",
      "childrens": [] },
    {
      "label": "瑞丽市",
      "value": "3161",
      "childrens": [] },
    {
      "label": "梁河县",
      "value": "3162",
      "childrens": [] },
    {
      "label": "盈江县",
      "value": "3163",
      "childrens": [] },
    {
      "label": "陇川县",
      "value": "3164",
      "childrens": [] }] },

  {
    "label": "迪庆藏族自治州",
    "value": "375",
    "childrens": [{
      "label": "香格里拉县",
      "value": "3165",
      "childrens": [] },
    {
      "label": "德钦县",
      "value": "3166",
      "childrens": [] },
    {
      "label": "维西",
      "value": "3167",
      "childrens": [] }] },

  {
    "label": "红河哈尼族彝族自治州",
    "value": "376",
    "childrens": [{
      "label": "泸西县",
      "value": "3168",
      "childrens": [] },
    {
      "label": "蒙自县",
      "value": "3169",
      "childrens": [] },
    {
      "label": "个旧市",
      "value": "3170",
      "childrens": [] },
    {
      "label": "开远市",
      "value": "3171",
      "childrens": [] },
    {
      "label": "绿春县",
      "value": "3172",
      "childrens": [] },
    {
      "label": "建水县",
      "value": "3173",
      "childrens": [] },
    {
      "label": "石屏县",
      "value": "3174",
      "childrens": [] },
    {
      "label": "弥勒县",
      "value": "3175",
      "childrens": [] },
    {
      "label": "元阳县",
      "value": "3176",
      "childrens": [] },
    {
      "label": "红河县",
      "value": "3177",
      "childrens": [] },
    {
      "label": "金平",
      "value": "3178",
      "childrens": [] },
    {
      "label": "河口",
      "value": "3179",
      "childrens": [] },
    {
      "label": "屏边",
      "value": "3180",
      "childrens": [] }] },

  {
    "label": "临沧市",
    "value": "377",
    "childrens": [{
      "label": "临翔区",
      "value": "3181",
      "childrens": [] },
    {
      "label": "凤庆县",
      "value": "3182",
      "childrens": [] },
    {
      "label": "云县",
      "value": "3183",
      "childrens": [] },
    {
      "label": "永德县",
      "value": "3184",
      "childrens": [] },
    {
      "label": "镇康县",
      "value": "3185",
      "childrens": [] },
    {
      "label": "双江",
      "value": "3186",
      "childrens": [] },
    {
      "label": "耿马",
      "value": "3187",
      "childrens": [] },
    {
      "label": "沧源",
      "value": "3188",
      "childrens": [] }] },

  {
    "label": "曲靖市",
    "value": "378",
    "childrens": [{
      "label": "麒麟区",
      "value": "3189",
      "childrens": [] },
    {
      "label": "宣威市",
      "value": "3190",
      "childrens": [] },
    {
      "label": "马龙县",
      "value": "3191",
      "childrens": [] },
    {
      "label": "陆良县",
      "value": "3192",
      "childrens": [] },
    {
      "label": "师宗县",
      "value": "3193",
      "childrens": [] },
    {
      "label": "罗平县",
      "value": "3194",
      "childrens": [] },
    {
      "label": "富源县",
      "value": "3195",
      "childrens": [] },
    {
      "label": "会泽县",
      "value": "3196",
      "childrens": [] },
    {
      "label": "沾益县",
      "value": "3197",
      "childrens": [] }] },

  {
    "label": "文山壮族苗族自治州",
    "value": "379",
    "childrens": [{
      "label": "文山县",
      "value": "3198",
      "childrens": [] },
    {
      "label": "砚山县",
      "value": "3199",
      "childrens": [] },
    {
      "label": "西畴县",
      "value": "3200",
      "childrens": [] },
    {
      "label": "麻栗坡县",
      "value": "3201",
      "childrens": [] },
    {
      "label": "马关县",
      "value": "3202",
      "childrens": [] },
    {
      "label": "丘北县",
      "value": "3203",
      "childrens": [] },
    {
      "label": "广南县",
      "value": "3204",
      "childrens": [] },
    {
      "label": "富宁县",
      "value": "3205",
      "childrens": [] }] },

  {
    "label": "西双版纳傣族自治州",
    "value": "380",
    "childrens": [{
      "label": "景洪市",
      "value": "3206",
      "childrens": [] },
    {
      "label": "勐海县",
      "value": "3207",
      "childrens": [] },
    {
      "label": "勐腊县",
      "value": "3208",
      "childrens": [] }] },

  {
    "label": "玉溪市",
    "value": "381",
    "childrens": [{
      "label": "红塔区",
      "value": "3209",
      "childrens": [] },
    {
      "label": "江川县",
      "value": "3210",
      "childrens": [] },
    {
      "label": "澄江县",
      "value": "3211",
      "childrens": [] },
    {
      "label": "通海县",
      "value": "3212",
      "childrens": [] },
    {
      "label": "华宁县",
      "value": "3213",
      "childrens": [] },
    {
      "label": "易门县",
      "value": "3214",
      "childrens": [] },
    {
      "label": "峨山",
      "value": "3215",
      "childrens": [] },
    {
      "label": "新平",
      "value": "3216",
      "childrens": [] },
    {
      "label": "元江",
      "value": "3217",
      "childrens": [] }] },

  {
    "label": "昭通市",
    "value": "382",
    "childrens": [{
      "label": "昭阳区",
      "value": "3218",
      "childrens": [] },
    {
      "label": "鲁甸县",
      "value": "3219",
      "childrens": [] },
    {
      "label": "巧家县",
      "value": "3220",
      "childrens": [] },
    {
      "label": "盐津县",
      "value": "3221",
      "childrens": [] },
    {
      "label": "大关县",
      "value": "3222",
      "childrens": [] },
    {
      "label": "永善县",
      "value": "3223",
      "childrens": [] },
    {
      "label": "绥江县",
      "value": "3224",
      "childrens": [] },
    {
      "label": "镇雄县",
      "value": "3225",
      "childrens": [] },
    {
      "label": "彝良县",
      "value": "3226",
      "childrens": [] },
    {
      "label": "威信县",
      "value": "3227",
      "childrens": [] },
    {
      "label": "水富县",
      "value": "3228",
      "childrens": [] }] }] },


{
  "label": "浙江省",
  "value": "31",
  "childrens": [{
    "label": "杭州市",
    "value": "383",
    "childrens": [{
      "label": "西湖区",
      "value": "3229",
      "childrens": [] },
    {
      "label": "上城区",
      "value": "3230",
      "childrens": [] },
    {
      "label": "下城区",
      "value": "3231",
      "childrens": [] },
    {
      "label": "拱墅区",
      "value": "3232",
      "childrens": [] },
    {
      "label": "滨江区",
      "value": "3233",
      "childrens": [] },
    {
      "label": "江干区",
      "value": "3234",
      "childrens": [] },
    {
      "label": "萧山区",
      "value": "3235",
      "childrens": [] },
    {
      "label": "余杭区",
      "value": "3236",
      "childrens": [] },
    {
      "label": "市郊",
      "value": "3237",
      "childrens": [] },
    {
      "label": "建德市",
      "value": "3238",
      "childrens": [] },
    {
      "label": "富阳市",
      "value": "3239",
      "childrens": [] },
    {
      "label": "临安市",
      "value": "3240",
      "childrens": [] },
    {
      "label": "桐庐县",
      "value": "3241",
      "childrens": [] },
    {
      "label": "淳安县",
      "value": "3242",
      "childrens": [] }] },

  {
    "label": "湖州市",
    "value": "384",
    "childrens": [{
      "label": "吴兴区",
      "value": "3243",
      "childrens": [] },
    {
      "label": "南浔区",
      "value": "3244",
      "childrens": [] },
    {
      "label": "德清县",
      "value": "3245",
      "childrens": [] },
    {
      "label": "长兴县",
      "value": "3246",
      "childrens": [] },
    {
      "label": "安吉县",
      "value": "3247",
      "childrens": [] }] },

  {
    "label": "嘉兴市",
    "value": "385",
    "childrens": [{
      "label": "南湖区",
      "value": "3248",
      "childrens": [] },
    {
      "label": "秀洲区",
      "value": "3249",
      "childrens": [] },
    {
      "label": "海宁市",
      "value": "3250",
      "childrens": [] },
    {
      "label": "嘉善县",
      "value": "3251",
      "childrens": [] },
    {
      "label": "平湖市",
      "value": "3252",
      "childrens": [] },
    {
      "label": "桐乡市",
      "value": "3253",
      "childrens": [] },
    {
      "label": "海盐县",
      "value": "3254",
      "childrens": [] }] },

  {
    "label": "金华市",
    "value": "386",
    "childrens": [{
      "label": "婺城区",
      "value": "3255",
      "childrens": [] },
    {
      "label": "金东区",
      "value": "3256",
      "childrens": [] },
    {
      "label": "兰溪市",
      "value": "3257",
      "childrens": [] },
    {
      "label": "市区",
      "value": "3258",
      "childrens": [] },
    {
      "label": "佛堂镇",
      "value": "3259",
      "childrens": [] },
    {
      "label": "上溪镇",
      "value": "3260",
      "childrens": [] },
    {
      "label": "义亭镇",
      "value": "3261",
      "childrens": [] },
    {
      "label": "大陈镇",
      "value": "3262",
      "childrens": [] },
    {
      "label": "苏溪镇",
      "value": "3263",
      "childrens": [] },
    {
      "label": "赤岸镇",
      "value": "3264",
      "childrens": [] },
    {
      "label": "东阳市",
      "value": "3265",
      "childrens": [] },
    {
      "label": "永康市",
      "value": "3266",
      "childrens": [] },
    {
      "label": "武义县",
      "value": "3267",
      "childrens": [] },
    {
      "label": "浦江县",
      "value": "3268",
      "childrens": [] },
    {
      "label": "磐安县",
      "value": "3269",
      "childrens": [] }] },

  {
    "label": "丽水市",
    "value": "387",
    "childrens": [{
      "label": "莲都区",
      "value": "3270",
      "childrens": [] },
    {
      "label": "龙泉市",
      "value": "3271",
      "childrens": [] },
    {
      "label": "青田县",
      "value": "3272",
      "childrens": [] },
    {
      "label": "缙云县",
      "value": "3273",
      "childrens": [] },
    {
      "label": "遂昌县",
      "value": "3274",
      "childrens": [] },
    {
      "label": "松阳县",
      "value": "3275",
      "childrens": [] },
    {
      "label": "云和县",
      "value": "3276",
      "childrens": [] },
    {
      "label": "庆元县",
      "value": "3277",
      "childrens": [] },
    {
      "label": "景宁",
      "value": "3278",
      "childrens": [] }] },

  {
    "label": "宁波市",
    "value": "388",
    "childrens": [{
      "label": "海曙区",
      "value": "3279",
      "childrens": [] },
    {
      "label": "江东区",
      "value": "3280",
      "childrens": [] },
    {
      "label": "江北区",
      "value": "3281",
      "childrens": [] },
    {
      "label": "镇海区",
      "value": "3282",
      "childrens": [] },
    {
      "label": "北仑区",
      "value": "3283",
      "childrens": [] },
    {
      "label": "鄞州区",
      "value": "3284",
      "childrens": [] },
    {
      "label": "余姚市",
      "value": "3285",
      "childrens": [] },
    {
      "label": "慈溪市",
      "value": "3286",
      "childrens": [] },
    {
      "label": "奉化市",
      "value": "3287",
      "childrens": [] },
    {
      "label": "象山县",
      "value": "3288",
      "childrens": [] },
    {
      "label": "宁海县",
      "value": "3289",
      "childrens": [] }] },

  {
    "label": "绍兴市",
    "value": "389",
    "childrens": [{
      "label": "越城区",
      "value": "3290",
      "childrens": [] },
    {
      "label": "上虞市",
      "value": "3291",
      "childrens": [] },
    {
      "label": "嵊州市",
      "value": "3292",
      "childrens": [] },
    {
      "label": "绍兴县",
      "value": "3293",
      "childrens": [] },
    {
      "label": "新昌县",
      "value": "3294",
      "childrens": [] },
    {
      "label": "诸暨市",
      "value": "3295",
      "childrens": [] }] },

  {
    "label": "台州市",
    "value": "390",
    "childrens": [{
      "label": "椒江区",
      "value": "3296",
      "childrens": [] },
    {
      "label": "黄岩区",
      "value": "3297",
      "childrens": [] },
    {
      "label": "路桥区",
      "value": "3298",
      "childrens": [] },
    {
      "label": "温岭市",
      "value": "3299",
      "childrens": [] },
    {
      "label": "临海市",
      "value": "3300",
      "childrens": [] },
    {
      "label": "玉环县",
      "value": "3301",
      "childrens": [] },
    {
      "label": "三门县",
      "value": "3302",
      "childrens": [] },
    {
      "label": "天台县",
      "value": "3303",
      "childrens": [] },
    {
      "label": "仙居县",
      "value": "3304",
      "childrens": [] }] },

  {
    "label": "温州市",
    "value": "391",
    "childrens": [{
      "label": "鹿城区",
      "value": "3305",
      "childrens": [] },
    {
      "label": "龙湾区",
      "value": "3306",
      "childrens": [] },
    {
      "label": "瓯海区",
      "value": "3307",
      "childrens": [] },
    {
      "label": "瑞安市",
      "value": "3308",
      "childrens": [] },
    {
      "label": "乐清市",
      "value": "3309",
      "childrens": [] },
    {
      "label": "洞头县",
      "value": "3310",
      "childrens": [] },
    {
      "label": "永嘉县",
      "value": "3311",
      "childrens": [] },
    {
      "label": "平阳县",
      "value": "3312",
      "childrens": [] },
    {
      "label": "苍南县",
      "value": "3313",
      "childrens": [] },
    {
      "label": "文成县",
      "value": "3314",
      "childrens": [] },
    {
      "label": "泰顺县",
      "value": "3315",
      "childrens": [] }] },

  {
    "label": "舟山市",
    "value": "392",
    "childrens": [{
      "label": "定海区",
      "value": "3316",
      "childrens": [] },
    {
      "label": "普陀区",
      "value": "3317",
      "childrens": [] },
    {
      "label": "岱山县",
      "value": "3318",
      "childrens": [] },
    {
      "label": "嵊泗县",
      "value": "3319",
      "childrens": [] }] },

  {
    "label": "衢州市",
    "value": "393",
    "childrens": [{
      "label": "衢州市",
      "value": "3320",
      "childrens": [] },
    {
      "label": "江山市",
      "value": "3321",
      "childrens": [] },
    {
      "label": "常山县",
      "value": "3322",
      "childrens": [] },
    {
      "label": "开化县",
      "value": "3323",
      "childrens": [] },
    {
      "label": "龙游县",
      "value": "3324",
      "childrens": [] }] }] },


{
  "label": "重庆",
  "value": "32",
  "childrens": [{
    "label": "重庆市",
    "value": "394",
    "childrens": [{
      "label": "合川区",
      "value": "3325",
      "childrens": [] },
    {
      "label": "江津区",
      "value": "3326",
      "childrens": [] },
    {
      "label": "南川区",
      "value": "3327",
      "childrens": [] },
    {
      "label": "永川区",
      "value": "3328",
      "childrens": [] },
    {
      "label": "南岸区",
      "value": "3329",
      "childrens": [] },
    {
      "label": "渝北区",
      "value": "3330",
      "childrens": [] },
    {
      "label": "万盛区",
      "value": "3331",
      "childrens": [] },
    {
      "label": "大渡口区",
      "value": "3332",
      "childrens": [] },
    {
      "label": "万州区",
      "value": "3333",
      "childrens": [] },
    {
      "label": "北碚区",
      "value": "3334",
      "childrens": [] },
    {
      "label": "沙坪坝区",
      "value": "3335",
      "childrens": [] },
    {
      "label": "巴南区",
      "value": "3336",
      "childrens": [] },
    {
      "label": "涪陵区",
      "value": "3337",
      "childrens": [] },
    {
      "label": "江北区",
      "value": "3338",
      "childrens": [] },
    {
      "label": "九龙坡区",
      "value": "3339",
      "childrens": [] },
    {
      "label": "渝中区",
      "value": "3340",
      "childrens": [] },
    {
      "label": "黔江开发区",
      "value": "3341",
      "childrens": [] },
    {
      "label": "长寿区",
      "value": "3342",
      "childrens": [] },
    {
      "label": "双桥区",
      "value": "3343",
      "childrens": [] },
    {
      "label": "綦江县",
      "value": "3344",
      "childrens": [] },
    {
      "label": "潼南县",
      "value": "3345",
      "childrens": [] },
    {
      "label": "铜梁县",
      "value": "3346",
      "childrens": [] },
    {
      "label": "大足县",
      "value": "3347",
      "childrens": [] },
    {
      "label": "荣昌县",
      "value": "3348",
      "childrens": [] },
    {
      "label": "璧山县",
      "value": "3349",
      "childrens": [] },
    {
      "label": "垫江县",
      "value": "3350",
      "childrens": [] },
    {
      "label": "武隆县",
      "value": "3351",
      "childrens": [] },
    {
      "label": "丰都县",
      "value": "3352",
      "childrens": [] },
    {
      "label": "城口县",
      "value": "3353",
      "childrens": [] },
    {
      "label": "梁平县",
      "value": "3354",
      "childrens": [] },
    {
      "label": "开县",
      "value": "3355",
      "childrens": [] },
    {
      "label": "巫溪县",
      "value": "3356",
      "childrens": [] },
    {
      "label": "巫山县",
      "value": "3357",
      "childrens": [] },
    {
      "label": "奉节县",
      "value": "3358",
      "childrens": [] },
    {
      "label": "云阳县",
      "value": "3359",
      "childrens": [] },
    {
      "label": "忠县",
      "value": "3360",
      "childrens": [] },
    {
      "label": "石柱",
      "value": "3361",
      "childrens": [] },
    {
      "label": "彭水",
      "value": "3362",
      "childrens": [] },
    {
      "label": "酉阳",
      "value": "3363",
      "childrens": [] },
    {
      "label": "秀山",
      "value": "3364",
      "childrens": [] }] }] },


{
  "label": "香港",
  "value": "33",
  "childrens": [{
    "label": "香港",
    "value": "395",
    "childrens": [{
      "label": "沙田区",
      "value": "3365",
      "childrens": [] },
    {
      "label": "东区",
      "value": "3366",
      "childrens": [] },
    {
      "label": "观塘区",
      "value": "3367",
      "childrens": [] },
    {
      "label": "黄大仙区",
      "value": "3368",
      "childrens": [] },
    {
      "label": "九龙城区",
      "value": "3369",
      "childrens": [] },
    {
      "label": "屯门区",
      "value": "3370",
      "childrens": [] },
    {
      "label": "葵青区",
      "value": "3371",
      "childrens": [] },
    {
      "label": "元朗区",
      "value": "3372",
      "childrens": [] },
    {
      "label": "深水埗区",
      "value": "3373",
      "childrens": [] },
    {
      "label": "西贡区",
      "value": "3374",
      "childrens": [] },
    {
      "label": "大埔区",
      "value": "3375",
      "childrens": [] },
    {
      "label": "湾仔区",
      "value": "3376",
      "childrens": [] },
    {
      "label": "油尖旺区",
      "value": "3377",
      "childrens": [] },
    {
      "label": "北区",
      "value": "3378",
      "childrens": [] },
    {
      "label": "南区",
      "value": "3379",
      "childrens": [] },
    {
      "label": "荃湾区",
      "value": "3380",
      "childrens": [] },
    {
      "label": "中西区",
      "value": "3381",
      "childrens": [] },
    {
      "label": "离岛区",
      "value": "3382",
      "childrens": [] }] }] },


{
  "label": "澳门",
  "value": "34",
  "childrens": [{
    "label": "澳门",
    "value": "396",
    "childrens": [{
      "label": "澳门",
      "value": "3383",
      "childrens": [] }] }] },


{
  "label": "台湾",
  "value": "35",
  "childrens": [{
    "label": "台湾",
    "value": "397",
    "childrens": [{
      "label": "台北",
      "value": "3384",
      "childrens": [] },
    {
      "label": "高雄",
      "value": "3385",
      "childrens": [] },
    {
      "label": "基隆",
      "value": "3386",
      "childrens": [] },
    {
      "label": "台中",
      "value": "3387",
      "childrens": [] },
    {
      "label": "台南",
      "value": "3388",
      "childrens": [] },
    {
      "label": "新竹",
      "value": "3389",
      "childrens": [] },
    {
      "label": "嘉义",
      "value": "3390",
      "childrens": [] },
    {
      "label": "宜兰县",
      "value": "3391",
      "childrens": [] },
    {
      "label": "桃园县",
      "value": "3392",
      "childrens": [] },
    {
      "label": "苗栗县",
      "value": "3393",
      "childrens": [] },
    {
      "label": "彰化县",
      "value": "3394",
      "childrens": [] },
    {
      "label": "南投县",
      "value": "3395",
      "childrens": [] },
    {
      "label": "云林县",
      "value": "3396",
      "childrens": [] },
    {
      "label": "屏东县",
      "value": "3397",
      "childrens": [] },
    {
      "label": "台东县",
      "value": "3398",
      "childrens": [] },
    {
      "label": "花莲县",
      "value": "3399",
      "childrens": [] },
    {
      "label": "澎湖县",
      "value": "3400",
      "childrens": [] }] }] }];exports.default = _default;

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/*!**********************************************************!*\
  !*** D:/demo/000(车聚利)/000(车聚利)/components/ican-H5Api.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map