function _typeof$2(o) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$2(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof$2(i) ? i : String(i);
}

function _defineProperty$2(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var regeneratorRuntime$3 = {exports: {}};

var _typeof$1 = {exports: {}};

var _typeof_1 = _typeof$1.exports;

(function (module) {
	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
} (_typeof$1));

var _typeofExports = _typeof$1.exports;
var _typeof = /*@__PURE__*/getDefaultExportFromCjs(_typeofExports);

var regeneratorRuntime$1 = regeneratorRuntime$3.exports;

(function (module) {
	var _typeof = _typeofExports["default"];
	function _regeneratorRuntime() {
	  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
	    return e;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  var t,
	    e = {},
	    r = Object.prototype,
	    n = r.hasOwnProperty,
	    o = Object.defineProperty || function (t, e, r) {
	      t[e] = r.value;
	    },
	    i = "function" == typeof Symbol ? Symbol : {},
	    a = i.iterator || "@@iterator",
	    c = i.asyncIterator || "@@asyncIterator",
	    u = i.toStringTag || "@@toStringTag";
	  function define(t, e, r) {
	    return Object.defineProperty(t, e, {
	      value: r,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), t[e];
	  }
	  try {
	    define({}, "");
	  } catch (t) {
	    define = function define(t, e, r) {
	      return t[e] = r;
	    };
	  }
	  function wrap(t, e, r, n) {
	    var i = e && e.prototype instanceof Generator ? e : Generator,
	      a = Object.create(i.prototype),
	      c = new Context(n || []);
	    return o(a, "_invoke", {
	      value: makeInvokeMethod(t, r, c)
	    }), a;
	  }
	  function tryCatch(t, e, r) {
	    try {
	      return {
	        type: "normal",
	        arg: t.call(e, r)
	      };
	    } catch (t) {
	      return {
	        type: "throw",
	        arg: t
	      };
	    }
	  }
	  e.wrap = wrap;
	  var h = "suspendedStart",
	    l = "suspendedYield",
	    f = "executing",
	    s = "completed",
	    y = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var p = {};
	  define(p, a, function () {
	    return this;
	  });
	  var d = Object.getPrototypeOf,
	    v = d && d(d(values([])));
	  v && v !== r && n.call(v, a) && (p = v);
	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
	  function defineIteratorMethods(t) {
	    ["next", "throw", "return"].forEach(function (e) {
	      define(t, e, function (t) {
	        return this._invoke(e, t);
	      });
	    });
	  }
	  function AsyncIterator(t, e) {
	    function invoke(r, o, i, a) {
	      var c = tryCatch(t[r], t, o);
	      if ("throw" !== c.type) {
	        var u = c.arg,
	          h = u.value;
	        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
	          invoke("next", t, i, a);
	        }, function (t) {
	          invoke("throw", t, i, a);
	        }) : e.resolve(h).then(function (t) {
	          u.value = t, i(u);
	        }, function (t) {
	          return invoke("throw", t, i, a);
	        });
	      }
	      a(c.arg);
	    }
	    var r;
	    o(this, "_invoke", {
	      value: function value(t, n) {
	        function callInvokeWithMethodAndArg() {
	          return new e(function (e, r) {
	            invoke(t, n, e, r);
	          });
	        }
	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(e, r, n) {
	    var o = h;
	    return function (i, a) {
	      if (o === f) throw new Error("Generator is already running");
	      if (o === s) {
	        if ("throw" === i) throw a;
	        return {
	          value: t,
	          done: !0
	        };
	      }
	      for (n.method = i, n.arg = a;;) {
	        var c = n.delegate;
	        if (c) {
	          var u = maybeInvokeDelegate(c, n);
	          if (u) {
	            if (u === y) continue;
	            return u;
	          }
	        }
	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
	          if (o === h) throw o = s, n.arg;
	          n.dispatchException(n.arg);
	        } else "return" === n.method && n.abrupt("return", n.arg);
	        o = f;
	        var p = tryCatch(e, r, n);
	        if ("normal" === p.type) {
	          if (o = n.done ? s : l, p.arg === y) continue;
	          return {
	            value: p.arg,
	            done: n.done
	          };
	        }
	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(e, r) {
	    var n = r.method,
	      o = e.iterator[n];
	    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
	    var i = tryCatch(o, e.iterator, r.arg);
	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
	    var a = i.arg;
	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
	  }
	  function pushTryEntry(t) {
	    var e = {
	      tryLoc: t[0]
	    };
	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
	  }
	  function resetTryEntry(t) {
	    var e = t.completion || {};
	    e.type = "normal", delete e.arg, t.completion = e;
	  }
	  function Context(t) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], t.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(e) {
	    if (e || "" === e) {
	      var r = e[a];
	      if (r) return r.call(e);
	      if ("function" == typeof e.next) return e;
	      if (!isNaN(e.length)) {
	        var o = -1,
	          i = function next() {
	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
	            return next.value = t, next.done = !0, next;
	          };
	        return i.next = i;
	      }
	    }
	    throw new TypeError(_typeof(e) + " is not iterable");
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), o(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
	    var e = "function" == typeof t && t.constructor;
	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
	  }, e.mark = function (t) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
	  }, e.awrap = function (t) {
	    return {
	      __await: t
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
	    return this;
	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
	    void 0 === i && (i = Promise);
	    var a = new AsyncIterator(wrap(t, r, n, o), i);
	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
	      return t.done ? t.value : a.next();
	    });
	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
	    return this;
	  }), define(g, "toString", function () {
	    return "[object Generator]";
	  }), e.keys = function (t) {
	    var e = Object(t),
	      r = [];
	    for (var n in e) r.push(n);
	    return r.reverse(), function next() {
	      for (; r.length;) {
	        var t = r.pop();
	        if (t in e) return next.value = t, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, e.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function reset(e) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
	    },
	    stop: function stop() {
	      this.done = !0;
	      var t = this.tryEntries[0].completion;
	      if ("throw" === t.type) throw t.arg;
	      return this.rval;
	    },
	    dispatchException: function dispatchException(e) {
	      if (this.done) throw e;
	      var r = this;
	      function handle(n, o) {
	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
	      }
	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
	        var i = this.tryEntries[o],
	          a = i.completion;
	        if ("root" === i.tryLoc) return handle("end");
	        if (i.tryLoc <= this.prev) {
	          var c = n.call(i, "catchLoc"),
	            u = n.call(i, "finallyLoc");
	          if (c && u) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          } else if (c) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	          } else {
	            if (!u) throw new Error("try statement without catch or finally");
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function abrupt(t, e) {
	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
	        var o = this.tryEntries[r];
	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
	          var i = o;
	          break;
	        }
	      }
	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
	      var a = i ? i.completion : {};
	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
	    },
	    complete: function complete(t, e) {
	      if ("throw" === t.type) throw t.arg;
	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
	    },
	    finish: function finish(t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
	      }
	    },
	    "catch": function _catch(t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.tryLoc === t) {
	          var n = r.completion;
	          if ("throw" === n.type) {
	            var o = n.arg;
	            resetTryEntry(r);
	          }
	          return o;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function delegateYield(e, r, n) {
	      return this.delegate = {
	        iterator: values(e),
	        resultName: r,
	        nextLoc: n
	      }, "next" === this.method && (this.arg = t), y;
	    }
	  }, e;
	}
	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports; 
} (regeneratorRuntime$3));

var regeneratorRuntimeExports = regeneratorRuntime$3.exports;
var regeneratorRuntime$2 = /*@__PURE__*/getDefaultExportFromCjs(regeneratorRuntimeExports);

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntimeExports();
var regenerator = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regenerator);

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

var _listCacheClear$1 = /*@__PURE__*/getDefaultExportFromCjs(_listCacheClear);

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$4(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$4;

var eq$5 = /*@__PURE__*/getDefaultExportFromCjs(eq_1);

var eq$3 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$4;

var _assocIndexOf$1 = /*@__PURE__*/getDefaultExportFromCjs(_assocIndexOf);

var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$3(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var _listCacheDelete$1 = /*@__PURE__*/getDefaultExportFromCjs(_listCacheDelete);

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var _listCacheGet$1 = /*@__PURE__*/getDefaultExportFromCjs(_listCacheGet);

var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var _listCacheHas$1 = /*@__PURE__*/getDefaultExportFromCjs(_listCacheHas);

var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var _listCacheSet$1 = /*@__PURE__*/getDefaultExportFromCjs(_listCacheSet);

var listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$4(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype['delete'] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;

var _ListCache = ListCache$4;

var _ListCache$1 = /*@__PURE__*/getDefaultExportFromCjs(_ListCache);

var ListCache$3 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$3;
  this.size = 0;
}

var _stackClear = stackClear$1;

var _stackClear$1 = /*@__PURE__*/getDefaultExportFromCjs(_stackClear);

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

var _stackDelete$1 = /*@__PURE__*/getDefaultExportFromCjs(_stackDelete);

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

var _stackGet$1 = /*@__PURE__*/getDefaultExportFromCjs(_stackGet);

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

var _stackHas$1 = /*@__PURE__*/getDefaultExportFromCjs(_stackHas);

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var _freeGlobal$1 = /*@__PURE__*/getDefaultExportFromCjs(_freeGlobal);

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$8 = freeGlobal || freeSelf || Function('return this')();

var _root = root$8;

var _root$1 = /*@__PURE__*/getDefaultExportFromCjs(_root);

var root$7 = _root;

/** Built-in value references. */
var Symbol$4 = root$7.Symbol;

var _Symbol = Symbol$4;

var _Symbol$1 = /*@__PURE__*/getDefaultExportFromCjs(_Symbol);

var Symbol$3 = _Symbol;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$d.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

var _getRawTag$1 = /*@__PURE__*/getDefaultExportFromCjs(_getRawTag);

/** Used for built-in method references. */

var objectProto$c = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$c.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var _objectToString$1 = /*@__PURE__*/getDefaultExportFromCjs(_objectToString);

var Symbol$2 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$5(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$5;

var _baseGetTag$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseGetTag);

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$8(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$8;

var isObject$9 = /*@__PURE__*/getDefaultExportFromCjs(isObject_1);

var baseGetTag$4 = _baseGetTag,
    isObject$7 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$3(value) {
  if (!isObject$7(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$4(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$3;

var isFunction$4 = /*@__PURE__*/getDefaultExportFromCjs(isFunction_1);

var root$6 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$6['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var _coreJsData$1 = /*@__PURE__*/getDefaultExportFromCjs(_coreJsData);

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

var _isMasked$1 = /*@__PURE__*/getDefaultExportFromCjs(_isMasked);

/** Used for built-in method references. */

var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$2;

var _toSource$1 = /*@__PURE__*/getDefaultExportFromCjs(_toSource);

var isFunction$2 = isFunction_1,
    isMasked = _isMasked,
    isObject$6 = isObject_1,
    toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$b = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$6(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}

var _baseIsNative = baseIsNative$1;

var _baseIsNative$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseIsNative);

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var _getValue$1 = /*@__PURE__*/getDefaultExportFromCjs(_getValue);

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$7;

var _getNative$1 = /*@__PURE__*/getDefaultExportFromCjs(_getNative);

var getNative$6 = _getNative,
    root$5 = _root;

/* Built-in method references that are verified to be native. */
var Map$4 = getNative$6(root$5, 'Map');

var _Map = Map$4;

var _Map$1 = /*@__PURE__*/getDefaultExportFromCjs(_Map);

var getNative$5 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$5(Object, 'create');

var _nativeCreate = nativeCreate$4;

var _nativeCreate$1 = /*@__PURE__*/getDefaultExportFromCjs(_nativeCreate);

var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

var _hashClear$1 = /*@__PURE__*/getDefaultExportFromCjs(_hashClear);

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var _hashDelete$1 = /*@__PURE__*/getDefaultExportFromCjs(_hashDelete);

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var _hashGet$1 = /*@__PURE__*/getDefaultExportFromCjs(_hashGet);

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$7.call(data, key);
}

var _hashHas = hashHas$1;

var _hashHas$1 = /*@__PURE__*/getDefaultExportFromCjs(_hashHas);

var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

var _hashSet = hashSet$1;

var _hashSet$1 = /*@__PURE__*/getDefaultExportFromCjs(_hashSet);

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

var _Hash$1 = /*@__PURE__*/getDefaultExportFromCjs(_Hash);

var Hash = _Hash,
    ListCache$2 = _ListCache,
    Map$3 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$3 || ListCache$2),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

var _mapCacheClear$1 = /*@__PURE__*/getDefaultExportFromCjs(_mapCacheClear);

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var _isKeyable$1 = /*@__PURE__*/getDefaultExportFromCjs(_isKeyable);

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$4;

var _getMapData$1 = /*@__PURE__*/getDefaultExportFromCjs(_getMapData);

var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var _mapCacheDelete$1 = /*@__PURE__*/getDefaultExportFromCjs(_mapCacheDelete);

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var _mapCacheGet$1 = /*@__PURE__*/getDefaultExportFromCjs(_mapCacheGet);

var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var _mapCacheHas$1 = /*@__PURE__*/getDefaultExportFromCjs(_mapCacheHas);

var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var _mapCacheSet$1 = /*@__PURE__*/getDefaultExportFromCjs(_mapCacheSet);

var mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var _MapCache$1 = /*@__PURE__*/getDefaultExportFromCjs(_MapCache);

var ListCache$1 = _ListCache,
    Map$2 = _Map,
    MapCache = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var _stackSet$1 = /*@__PURE__*/getDefaultExportFromCjs(_stackSet);

var ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$2(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$2.prototype.clear = stackClear;
Stack$2.prototype['delete'] = stackDelete;
Stack$2.prototype.get = stackGet;
Stack$2.prototype.has = stackHas;
Stack$2.prototype.set = stackSet;

var _Stack = Stack$2;

var _Stack$1 = /*@__PURE__*/getDefaultExportFromCjs(_Stack);

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

function arrayEach$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach$1;

var _arrayEach$1 = /*@__PURE__*/getDefaultExportFromCjs(_arrayEach);

var getNative$4 = _getNative;

var defineProperty$4 = (function() {
  try {
    var func = getNative$4(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$4;

var _defineProperty$1 = /*@__PURE__*/getDefaultExportFromCjs(_defineProperty);

var defineProperty$3 = _defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$3(object, key, value) {
  if (key == '__proto__' && defineProperty$3) {
    defineProperty$3(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$3;

var _baseAssignValue$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseAssignValue);

var baseAssignValue$2 = _baseAssignValue,
    eq$2 = eq_1;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$2(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq$2(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$2(object, key, value);
  }
}

var _assignValue = assignValue$2;

var _assignValue$1 = /*@__PURE__*/getDefaultExportFromCjs(_assignValue);

var assignValue$1 = _assignValue,
    baseAssignValue$1 = _baseAssignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject$5(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$1(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject$5;

var _copyObject$1 = /*@__PURE__*/getDefaultExportFromCjs(_copyObject);

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

var _baseTimes$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseTimes);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$7(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$7;

var isObjectLike$8 = /*@__PURE__*/getDefaultExportFromCjs(isObjectLike_1);

var baseGetTag$3 = _baseGetTag,
    isObjectLike$6 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$6(value) && baseGetTag$3(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments$1;

var _baseIsArguments$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseIsArguments);

var baseIsArguments = _baseIsArguments,
    isObjectLike$5 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$2 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$5(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments$2;

var isArguments$3 = /*@__PURE__*/getDefaultExportFromCjs(isArguments_1);

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$4 = Array.isArray;

var isArray_1 = isArray$4;

var isArray$5 = /*@__PURE__*/getDefaultExportFromCjs(isArray_1);

var isBuffer$4 = {exports: {}};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var stubFalse$1 = /*@__PURE__*/getDefaultExportFromCjs(stubFalse_1);

var isBuffer_1 = isBuffer$4.exports;

(function (module, exports) {
	var root = _root,
	    stubFalse = stubFalse_1;

	/** Detect free variable `exports`. */
	var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer; 
} (isBuffer$4, isBuffer$4.exports));

var isBufferExports = isBuffer$4.exports;
var isBuffer$3 = /*@__PURE__*/getDefaultExportFromCjs(isBufferExports);

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$2;

var _isIndex$1 = /*@__PURE__*/getDefaultExportFromCjs(_isIndex);

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$2(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength$2;

var isLength$3 = /*@__PURE__*/getDefaultExportFromCjs(isLength_1);

var baseGetTag$2 = _baseGetTag,
    isLength$1 = isLength_1,
    isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] =
typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike$4(value) &&
    isLength$1(value.length) && !!typedArrayTags[baseGetTag$2(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

var _baseIsTypedArray$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseIsTypedArray);

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$3(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$3;

var _baseUnary$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseUnary);

var _nodeUtil$2 = {exports: {}};

var _nodeUtil = _nodeUtil$2.exports;

(function (module, exports) {
	var freeGlobal = _freeGlobal;

	/** Detect free variable `exports`. */
	var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil; 
} (_nodeUtil$2, _nodeUtil$2.exports));

var _nodeUtilExports = _nodeUtil$2.exports;
var _nodeUtil$1 = /*@__PURE__*/getDefaultExportFromCjs(_nodeUtilExports);

var baseIsTypedArray = _baseIsTypedArray,
    baseUnary$2 = _baseUnary,
    nodeUtil$2 = _nodeUtilExports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$2 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$2;

var isTypedArray$3 = /*@__PURE__*/getDefaultExportFromCjs(isTypedArray_1);

var baseTimes = _baseTimes,
    isArguments$1 = isArguments_1,
    isArray$3 = isArray_1,
    isBuffer$2 = isBufferExports,
    isIndex$1 = _isIndex,
    isTypedArray$1 = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$3(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$2(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex$1(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$2;

var _arrayLikeKeys$1 = /*@__PURE__*/getDefaultExportFromCjs(_arrayLikeKeys);

/** Used for built-in method references. */

var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$3(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

var _isPrototype = isPrototype$3;

var _isPrototype$1 = /*@__PURE__*/getDefaultExportFromCjs(_isPrototype);

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$2;

var _overArg$1 = /*@__PURE__*/getDefaultExportFromCjs(_overArg);

var overArg$1 = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg$1(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var _nativeKeys$1 = /*@__PURE__*/getDefaultExportFromCjs(_nativeKeys);

var isPrototype$2 = _isPrototype,
    nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var _baseKeys$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseKeys);

var isFunction$1 = isFunction_1,
    isLength = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$4(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}

var isArrayLike_1 = isArrayLike$4;

var isArrayLike$5 = /*@__PURE__*/getDefaultExportFromCjs(isArrayLike_1);

var arrayLikeKeys$1 = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$3 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$3(object) {
  return isArrayLike$3(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}

var keys_1 = keys$3;

var keys$4 = /*@__PURE__*/getDefaultExportFromCjs(keys_1);

var copyObject$4 = _copyObject,
    keys$2 = keys_1;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign$1(object, source) {
  return object && copyObject$4(source, keys$2(source), object);
}

var _baseAssign = baseAssign$1;

var _baseAssign$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseAssign);

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn$1;

var _nativeKeysIn$1 = /*@__PURE__*/getDefaultExportFromCjs(_nativeKeysIn);

var isObject$5 = isObject_1,
    isPrototype$1 = _isPrototype,
    nativeKeysIn = _nativeKeysIn;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn$1(object) {
  if (!isObject$5(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn$1;

var _baseKeysIn$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseKeysIn);

var arrayLikeKeys = _arrayLikeKeys,
    baseKeysIn = _baseKeysIn,
    isArrayLike$2 = isArrayLike_1;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$5(object) {
  return isArrayLike$2(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

var keysIn_1 = keysIn$5;

var keysIn$6 = /*@__PURE__*/getDefaultExportFromCjs(keysIn_1);

var copyObject$3 = _copyObject,
    keysIn$4 = keysIn_1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn$1(object, source) {
  return object && copyObject$3(source, keysIn$4(source), object);
}

var _baseAssignIn = baseAssignIn$1;

var _baseAssignIn$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseAssignIn);

var _cloneBuffer$2 = {exports: {}};

var _cloneBuffer = _cloneBuffer$2.exports;

(function (module, exports) {
	var root = _root;

	/** Detect free variable `exports`. */
	var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer; 
} (_cloneBuffer$2, _cloneBuffer$2.exports));

var _cloneBufferExports = _cloneBuffer$2.exports;
var _cloneBuffer$1 = /*@__PURE__*/getDefaultExportFromCjs(_cloneBufferExports);

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray$2(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$2;

var _copyArray$1 = /*@__PURE__*/getDefaultExportFromCjs(_copyArray);

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter$1;

var _arrayFilter$1 = /*@__PURE__*/getDefaultExportFromCjs(_arrayFilter);

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

function stubArray$2() {
  return [];
}

var stubArray_1 = stubArray$2;

var stubArray$3 = /*@__PURE__*/getDefaultExportFromCjs(stubArray_1);

var arrayFilter = _arrayFilter,
    stubArray$1 = stubArray_1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols$3;

var _getSymbols$1 = /*@__PURE__*/getDefaultExportFromCjs(_getSymbols);

var copyObject$2 = _copyObject,
    getSymbols$2 = _getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols$1(source, object) {
  return copyObject$2(source, getSymbols$2(source), object);
}

var _copySymbols = copySymbols$1;

var _copySymbols$1 = /*@__PURE__*/getDefaultExportFromCjs(_copySymbols);

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$2(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$2;

var _arrayPush$1 = /*@__PURE__*/getDefaultExportFromCjs(_arrayPush);

var overArg = _overArg;

/** Built-in value references. */
var getPrototype$3 = overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$3;

var _getPrototype$1 = /*@__PURE__*/getDefaultExportFromCjs(_getPrototype);

var arrayPush$1 = _arrayPush,
    getPrototype$2 = _getPrototype,
    getSymbols$1 = _getSymbols,
    stubArray = stubArray_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$1(object));
    object = getPrototype$2(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn$2;

var _getSymbolsIn$1 = /*@__PURE__*/getDefaultExportFromCjs(_getSymbolsIn);

var copyObject$1 = _copyObject,
    getSymbolsIn$1 = _getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn$1(source, object) {
  return copyObject$1(source, getSymbolsIn$1(source), object);
}

var _copySymbolsIn = copySymbolsIn$1;

var _copySymbolsIn$1 = /*@__PURE__*/getDefaultExportFromCjs(_copySymbolsIn);

var arrayPush = _arrayPush,
    isArray$2 = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$2(object) ? result : arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys$2;

var _baseGetAllKeys$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseGetAllKeys);

var baseGetAllKeys$1 = _baseGetAllKeys,
    getSymbols = _getSymbols,
    keys$1 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols);
}

var _getAllKeys = getAllKeys$1;

var _getAllKeys$1 = /*@__PURE__*/getDefaultExportFromCjs(_getAllKeys);

var baseGetAllKeys = _baseGetAllKeys,
    getSymbolsIn = _getSymbolsIn,
    keysIn$3 = keysIn_1;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$3, getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn$1;

var _getAllKeysIn$1 = /*@__PURE__*/getDefaultExportFromCjs(_getAllKeysIn);

var getNative$3 = _getNative,
    root$4 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$3(root$4, 'DataView');

var _DataView = DataView$1;

var _DataView$1 = /*@__PURE__*/getDefaultExportFromCjs(_DataView);

var getNative$2 = _getNative,
    root$3 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$2(root$3, 'Promise');

var _Promise = Promise$2;

var _Promise$1 = /*@__PURE__*/getDefaultExportFromCjs(_Promise);

var getNative$1 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Set$2 = getNative$1(root$2, 'Set');

var _Set = Set$2;

var _Set$1 = /*@__PURE__*/getDefaultExportFromCjs(_Set);

var getNative = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$2 = getNative(root$1, 'WeakMap');

var _WeakMap = WeakMap$2;

var _WeakMap$1 = /*@__PURE__*/getDefaultExportFromCjs(_WeakMap);

var DataView = _DataView,
    Map$1 = _Map,
    Promise$1 = _Promise,
    Set$1 = _Set,
    WeakMap$1 = _WeakMap,
    baseGetTag$1 = _baseGetTag,
    toSource = _toSource;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$3 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set$1),
    weakMapCtorString = toSource(WeakMap$1);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$3 = baseGetTag$1;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map$1 && getTag$3(new Map$1) != mapTag$3) ||
    (Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag) ||
    (Set$1 && getTag$3(new Set$1) != setTag$3) ||
    (WeakMap$1 && getTag$3(new WeakMap$1) != weakMapTag$1)) {
  getTag$3 = function(value) {
    var result = baseGetTag$1(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$3;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$3;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag$3;

var _getTag$1 = /*@__PURE__*/getDefaultExportFromCjs(_getTag);

/** Used for built-in method references. */

var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray$1(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray$1;

var _initCloneArray$1 = /*@__PURE__*/getDefaultExportFromCjs(_initCloneArray);

var root = _root;

/** Built-in value references. */
var Uint8Array$2 = root.Uint8Array;

var _Uint8Array = Uint8Array$2;

var _Uint8Array$1 = /*@__PURE__*/getDefaultExportFromCjs(_Uint8Array);

var Uint8Array$1 = _Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer$3;

var _cloneArrayBuffer$1 = /*@__PURE__*/getDefaultExportFromCjs(_cloneArrayBuffer);

var cloneArrayBuffer$2 = _cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView$1;

var _cloneDataView$1 = /*@__PURE__*/getDefaultExportFromCjs(_cloneDataView);

/** Used to match `RegExp` flags from their coerced string values. */

var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp$1;

var _cloneRegExp$1 = /*@__PURE__*/getDefaultExportFromCjs(_cloneRegExp);

var Symbol$1 = _Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol$1;

var _cloneSymbol$1 = /*@__PURE__*/getDefaultExportFromCjs(_cloneSymbol);

var cloneArrayBuffer$1 = _cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray$2(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray$2;

var _cloneTypedArray$1 = /*@__PURE__*/getDefaultExportFromCjs(_cloneTypedArray);

var cloneArrayBuffer = _cloneArrayBuffer,
    cloneDataView = _cloneDataView,
    cloneRegExp = _cloneRegExp,
    cloneSymbol = _cloneSymbol,
    cloneTypedArray$1 = _cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray$1(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag$1;

var _initCloneByTag$1 = /*@__PURE__*/getDefaultExportFromCjs(_initCloneByTag);

var isObject$4 = isObject_1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate$1 = (function() {
  function object() {}
  return function(proto) {
    if (!isObject$4(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate$1;

var _baseCreate$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseCreate);

var baseCreate = _baseCreate,
    getPrototype$1 = _getPrototype,
    isPrototype = _isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject$2(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype$1(object))
    : {};
}

var _initCloneObject = initCloneObject$2;

var _initCloneObject$1 = /*@__PURE__*/getDefaultExportFromCjs(_initCloneObject);

var getTag$2 = _getTag,
    isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap$1(value) {
  return isObjectLike$3(value) && getTag$2(value) == mapTag$1;
}

var _baseIsMap = baseIsMap$1;

var _baseIsMap$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseIsMap);

var baseIsMap = _baseIsMap,
    baseUnary$1 = _baseUnary,
    nodeUtil$1 = _nodeUtilExports;

/* Node.js helper references. */
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;

var isMap_1 = isMap$1;

var isMap$2 = /*@__PURE__*/getDefaultExportFromCjs(isMap_1);

var getTag$1 = _getTag,
    isObjectLike$2 = isObjectLike_1;

/** `Object#toString` result references. */
var setTag$1 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet$1(value) {
  return isObjectLike$2(value) && getTag$1(value) == setTag$1;
}

var _baseIsSet = baseIsSet$1;

var _baseIsSet$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseIsSet);

var baseIsSet = _baseIsSet,
    baseUnary = _baseUnary,
    nodeUtil = _nodeUtilExports;

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

var isSet_1 = isSet$1;

var isSet$2 = /*@__PURE__*/getDefaultExportFromCjs(isSet_1);

var Stack$1 = _Stack,
    arrayEach = _arrayEach,
    assignValue = _assignValue,
    baseAssign = _baseAssign,
    baseAssignIn = _baseAssignIn,
    cloneBuffer$1 = _cloneBufferExports,
    copyArray$1 = _copyArray,
    copySymbols = _copySymbols,
    copySymbolsIn = _copySymbolsIn,
    getAllKeys = _getAllKeys,
    getAllKeysIn = _getAllKeysIn,
    getTag = _getTag,
    initCloneArray = _initCloneArray,
    initCloneByTag = _initCloneByTag,
    initCloneObject$1 = _initCloneObject,
    isArray$1 = isArray_1,
    isBuffer$1 = isBufferExports,
    isMap = isMap_1,
    isObject$3 = isObject_1,
    isSet = isSet_1,
    keys = keys_1,
    keysIn$2 = keysIn_1;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag$1] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject$3(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray$1(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer$1(value)) {
      return cloneBuffer$1(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject$1(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack$1);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn$2 : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone$1;

var _baseClone$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseClone);

var baseClone = _baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

var clone_1 = clone;

var clone$1 = /*@__PURE__*/getDefaultExportFromCjs(clone_1);

var baseAssignValue = _baseAssignValue,
    eq$1 = eq_1;

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue$2(object, key, value) {
  if ((value !== undefined && !eq$1(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue$2;

var _assignMergeValue$1 = /*@__PURE__*/getDefaultExportFromCjs(_assignMergeValue);

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor$1;

var _createBaseFor$1 = /*@__PURE__*/getDefaultExportFromCjs(_createBaseFor);

var createBaseFor = _createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor$1 = createBaseFor();

var _baseFor = baseFor$1;

var _baseFor$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseFor);

var isArrayLike$1 = isArrayLike_1,
    isObjectLike$1 = isObjectLike_1;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject$1(value) {
  return isObjectLike$1(value) && isArrayLike$1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject$1;

var isArrayLikeObject$2 = /*@__PURE__*/getDefaultExportFromCjs(isArrayLikeObject_1);

var baseGetTag = _baseGetTag,
    getPrototype = _getPrototype,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject$1(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject$1;

var isPlainObject$2 = /*@__PURE__*/getDefaultExportFromCjs(isPlainObject_1);

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function safeGet$2(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

var _safeGet = safeGet$2;

var _safeGet$1 = /*@__PURE__*/getDefaultExportFromCjs(_safeGet);

var copyObject = _copyObject,
    keysIn$1 = keysIn_1;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject$1(value) {
  return copyObject(value, keysIn$1(value));
}

var toPlainObject_1 = toPlainObject$1;

var toPlainObject$2 = /*@__PURE__*/getDefaultExportFromCjs(toPlainObject_1);

var assignMergeValue$1 = _assignMergeValue,
    cloneBuffer = _cloneBufferExports,
    cloneTypedArray = _cloneTypedArray,
    copyArray = _copyArray,
    initCloneObject = _initCloneObject,
    isArguments = isArguments_1,
    isArray = isArray_1,
    isArrayLikeObject = isArrayLikeObject_1,
    isBuffer = isBufferExports,
    isFunction = isFunction_1,
    isObject$2 = isObject_1,
    isPlainObject = isPlainObject_1,
    isTypedArray = isTypedArray_1,
    safeGet$1 = _safeGet,
    toPlainObject = toPlainObject_1;

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key),
      srcValue = safeGet$1(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject$2(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep$1;

var _baseMergeDeep$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseMergeDeep);

var Stack = _Stack,
    assignMergeValue = _assignMergeValue,
    baseFor = _baseFor,
    baseMergeDeep = _baseMergeDeep,
    isObject$1 = isObject_1,
    keysIn = keysIn_1,
    safeGet = _safeGet;

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

var _baseMerge = baseMerge$1;

var _baseMerge$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseMerge);

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity$2(value) {
  return value;
}

var identity_1 = identity$2;

var identity$3 = /*@__PURE__*/getDefaultExportFromCjs(identity_1);

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$1;

var _apply$1 = /*@__PURE__*/getDefaultExportFromCjs(_apply);

var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

var _overRest$1 = /*@__PURE__*/getDefaultExportFromCjs(_overRest);

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant$1(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant$1;

var constant$2 = /*@__PURE__*/getDefaultExportFromCjs(constant_1);

var constant = constant_1,
    defineProperty$2 = _defineProperty,
    identity$1 = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty$2 ? identity$1 : function(func, string) {
  return defineProperty$2(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

var _baseSetToString$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseSetToString);

/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var _shortOut$1 = /*@__PURE__*/getDefaultExportFromCjs(_shortOut);

var baseSetToString = _baseSetToString,
    shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var _setToString$1 = /*@__PURE__*/getDefaultExportFromCjs(_setToString);

var identity = identity_1,
    overRest = _overRest,
    setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var _baseRest = baseRest$1;

var _baseRest$1 = /*@__PURE__*/getDefaultExportFromCjs(_baseRest);

var eq = eq_1,
    isArrayLike = isArrayLike_1,
    isIndex = _isIndex,
    isObject = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall$1;

var _isIterateeCall$1 = /*@__PURE__*/getDefaultExportFromCjs(_isIterateeCall);

var baseRest = _baseRest,
    isIterateeCall = _isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner$1(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner$1;

var _createAssigner$1 = /*@__PURE__*/getDefaultExportFromCjs(_createAssigner);

var baseMerge = _baseMerge,
    createAssigner = _createAssigner;

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

var merge_1 = merge;

var merge$1 = /*@__PURE__*/getDefaultExportFromCjs(merge_1);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var urlTemplate$2 = {exports: {}};

var urlTemplate = urlTemplate$2.exports;

(function (module, exports) {
	(function (root, factory) {
	    if ('object' === 'object') {
	        module.exports = factory();
	    } else if (typeof undefined === 'function' && undefined.amd) {
	        undefined([], factory);
	    } else {
	        root.urltemplate = factory();
	    }
	}(commonjsGlobal, function () {
	  /**
	   * @constructor
	   */
	  function UrlTemplate() {
	  }

	  /**
	   * @private
	   * @param {string} str
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeReserved = function (str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	      if (!/%[0-9A-Fa-f]/.test(part)) {
	        part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');
	      }
	      return part;
	    }).join('');
	  };

	  /**
	   * @private
	   * @param {string} str
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeUnreserved = function (str) {
	    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
	      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	    });
	  };

	  /**
	   * @private
	   * @param {string} operator
	   * @param {string} value
	   * @param {string} key
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeValue = function (operator, value, key) {
	    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : this.encodeUnreserved(value);

	    if (key) {
	      return this.encodeUnreserved(key) + '=' + value;
	    } else {
	      return value;
	    }
	  };

	  /**
	   * @private
	   * @param {*} value
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isDefined = function (value) {
	    return value !== undefined && value !== null;
	  };

	  /**
	   * @private
	   * @param {string}
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isKeyOperator = function (operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	  };

	  /**
	   * @private
	   * @param {Object} context
	   * @param {string} operator
	   * @param {string} key
	   * @param {string} modifier
	   */
	  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {
	    var value = context[key],
	        result = [];

	    if (this.isDefined(value) && value !== '') {
	      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	        value = value.toString();

	        if (modifier && modifier !== '*') {
	          value = value.substring(0, parseInt(modifier, 10));
	        }

	        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	      } else {
	        if (modifier === '*') {
	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                result.push(this.encodeValue(operator, value[k], k));
	              }
	            }, this);
	          }
	        } else {
	          var tmp = [];

	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              tmp.push(this.encodeValue(operator, value));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                tmp.push(this.encodeUnreserved(k));
	                tmp.push(this.encodeValue(operator, value[k].toString()));
	              }
	            }, this);
	          }

	          if (this.isKeyOperator(operator)) {
	            result.push(this.encodeUnreserved(key) + '=' + tmp.join(','));
	          } else if (tmp.length !== 0) {
	            result.push(tmp.join(','));
	          }
	        }
	      }
	    } else {
	      if (operator === ';') {
	        if (this.isDefined(value)) {
	          result.push(this.encodeUnreserved(key));
	        }
	      } else if (value === '' && (operator === '&' || operator === '?')) {
	        result.push(this.encodeUnreserved(key) + '=');
	      } else if (value === '') {
	        result.push('');
	      }
	    }
	    return result;
	  };

	  /**
	   * @param {string} template
	   * @return {function(Object):string}
	   */
	  UrlTemplate.prototype.parse = function (template) {
	    var that = this;
	    var operators = ['+', '#', '.', '/', ';', '?', '&'];

	    return {
	      expand: function (context) {
	        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	          if (expression) {
	            var operator = null,
	                values = [];

	            if (operators.indexOf(expression.charAt(0)) !== -1) {
	              operator = expression.charAt(0);
	              expression = expression.substr(1);
	            }

	            expression.split(/,/g).forEach(function (variable) {
	              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	            });

	            if (operator && operator !== '+') {
	              var separator = ',';

	              if (operator === '?') {
	                separator = '&';
	              } else if (operator !== '#') {
	                separator = operator;
	              }
	              return (values.length !== 0 ? operator : '') + values.join(separator);
	            } else {
	              return values.join(',');
	            }
	          } else {
	            return that.encodeReserved(literal);
	          }
	        });
	      }
	    };
	  };

	  return new UrlTemplate();
	})); 
} (urlTemplate$2, urlTemplate$2.exports));

var urlTemplateExports = urlTemplate$2.exports;
var urlTemplate$1 = /*@__PURE__*/getDefaultExportFromCjs(urlTemplateExports);

var backoff = {};

var options = {};

"use strict";
var __assign$1 = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
Object.defineProperty(options, "__esModule", { value: true });
var defaultOptions = {
    delayFirstAttempt: false,
    jitter: "none",
    maxDelay: Infinity,
    numOfAttempts: 10,
    retry: function () { return true; },
    startingDelay: 100,
    timeMultiple: 2
};
function getSanitizedOptions(options) {
    var sanitized = __assign$1(__assign$1({}, defaultOptions), options);
    if (sanitized.numOfAttempts < 1) {
        sanitized.numOfAttempts = 1;
    }
    return sanitized;
}
var getSanitizedOptions_1 = options.getSanitizedOptions = getSanitizedOptions;

var delay_factory = {};

var skipFirst_delay = {};

var delay_base = {};

var jitter_factory = {};

var full_jitter = {};

"use strict";
Object.defineProperty(full_jitter, "__esModule", { value: true });
function fullJitter(delay) {
    var jitteredDelay = Math.random() * delay;
    return Math.round(jitteredDelay);
}
var fullJitter_1 = full_jitter.fullJitter = fullJitter;

var no_jitter = {};

"use strict";
Object.defineProperty(no_jitter, "__esModule", { value: true });
function noJitter(delay) {
    return delay;
}
var noJitter_1 = no_jitter.noJitter = noJitter;

"use strict";
Object.defineProperty(jitter_factory, "__esModule", { value: true });
var full_jitter_1 = full_jitter;
var no_jitter_1 = no_jitter;
function JitterFactory(options) {
    switch (options.jitter) {
        case "full":
            return full_jitter_1.fullJitter;
        case "none":
        default:
            return no_jitter_1.noJitter;
    }
}
var JitterFactory_1 = jitter_factory.JitterFactory = JitterFactory;

"use strict";
Object.defineProperty(delay_base, "__esModule", { value: true });
var jitter_factory_1 = jitter_factory;
var Delay = /** @class */ (function () {
    function Delay(options) {
        this.options = options;
        this.attempt = 0;
    }
    Delay.prototype.apply = function () {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(resolve, _this.jitteredDelay); });
    };
    Delay.prototype.setAttemptNumber = function (attempt) {
        this.attempt = attempt;
    };
    Object.defineProperty(Delay.prototype, "jitteredDelay", {
        get: function () {
            var jitter = jitter_factory_1.JitterFactory(this.options);
            return jitter(this.delay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Delay.prototype, "delay", {
        get: function () {
            var constant = this.options.startingDelay;
            var base = this.options.timeMultiple;
            var power = this.numOfDelayedAttempts;
            var delay = constant * Math.pow(base, power);
            return Math.min(delay, this.options.maxDelay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Delay.prototype, "numOfDelayedAttempts", {
        get: function () {
            return this.attempt;
        },
        enumerable: true,
        configurable: true
    });
    return Delay;
}());
var Delay_1 = delay_base.Delay = Delay;

"use strict";
var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter$2 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$2 = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(skipFirst_delay, "__esModule", { value: true });
var delay_base_1$1 = delay_base;
var SkipFirstDelay = /** @class */ (function (_super) {
    __extends$2(SkipFirstDelay, _super);
    function SkipFirstDelay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkipFirstDelay.prototype.apply = function () {
        return __awaiter$2(this, void 0, void 0, function () {
            return __generator$2(this, function (_a) {
                return [2 /*return*/, this.isFirstAttempt ? true : _super.prototype.apply.call(this)];
            });
        });
    };
    Object.defineProperty(SkipFirstDelay.prototype, "isFirstAttempt", {
        get: function () {
            return this.attempt === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkipFirstDelay.prototype, "numOfDelayedAttempts", {
        get: function () {
            return this.attempt - 1;
        },
        enumerable: true,
        configurable: true
    });
    return SkipFirstDelay;
}(delay_base_1$1.Delay));
var SkipFirstDelay_1 = skipFirst_delay.SkipFirstDelay = SkipFirstDelay;

var always_delay = {};

"use strict";
var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(always_delay, "__esModule", { value: true });
var delay_base_1 = delay_base;
var AlwaysDelay = /** @class */ (function (_super) {
    __extends$1(AlwaysDelay, _super);
    function AlwaysDelay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AlwaysDelay;
}(delay_base_1.Delay));
var AlwaysDelay_1 = always_delay.AlwaysDelay = AlwaysDelay;

"use strict";
Object.defineProperty(delay_factory, "__esModule", { value: true });
var skip_first_delay_1 = skipFirst_delay;
var always_delay_1 = always_delay;
function DelayFactory(options, attempt) {
    var delay = initDelayClass(options);
    delay.setAttemptNumber(attempt);
    return delay;
}
var DelayFactory_1 = delay_factory.DelayFactory = DelayFactory;
function initDelayClass(options) {
    if (!options.delayFirstAttempt) {
        return new skip_first_delay_1.SkipFirstDelay(options);
    }
    return new always_delay_1.AlwaysDelay(options);
}

"use strict";
var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(backoff, "__esModule", { value: true });
var options_1 = options;
var delay_factory_1 = delay_factory;
function backOff(request, options) {
    if (options === void 0) { options = {}; }
    return __awaiter$1(this, void 0, void 0, function () {
        var sanitizedOptions, backOff;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sanitizedOptions = options_1.getSanitizedOptions(options);
                    backOff = new BackOff(request, sanitizedOptions);
                    return [4 /*yield*/, backOff.execute()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var backOff_1 = backoff.backOff = backOff;
var BackOff = /** @class */ (function () {
    function BackOff(request, options) {
        this.request = request;
        this.options = options;
        this.attemptNumber = 0;
    }
    BackOff.prototype.execute = function () {
        return __awaiter$1(this, void 0, void 0, function () {
            var e_1, shouldRetry;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.attemptLimitReached) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, this.applyDelay()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.request()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_1 = _a.sent();
                        this.attemptNumber++;
                        return [4 /*yield*/, this.options.retry(e_1, this.attemptNumber)];
                    case 5:
                        shouldRetry = _a.sent();
                        if (!shouldRetry || this.attemptLimitReached) {
                            throw e_1;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 0];
                    case 7: throw new Error("Something went wrong.");
                }
            });
        });
    };
    Object.defineProperty(BackOff.prototype, "attemptLimitReached", {
        get: function () {
            return this.attemptNumber >= this.options.numOfAttempts;
        },
        enumerable: true,
        configurable: true
    });
    BackOff.prototype.applyDelay = function () {
        return __awaiter$1(this, void 0, void 0, function () {
            var delay;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delay = delay_factory_1.DelayFactory(this.options, this.attemptNumber);
                        return [4 /*yield*/, delay.apply()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BackOff;
}());

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}

function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$1()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

var tslib_es6 = {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
};

var react$1 = {exports: {}};

var react_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return objectAssign;
}

/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_production_min;

function requireReact_production_min () {
	if (hasRequiredReact_production_min) return react_production_min;
	hasRequiredReact_production_min = 1;
	'use strict';var l=requireObjectAssign(),n=60103,p=60106;react_production_min.Fragment=60107;react_production_min.StrictMode=60108;react_production_min.Profiler=60114;var q=60109,r=60110,t=60112;react_production_min.Suspense=60113;var u=60115,v=60116;
	if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");react_production_min.Fragment=w("react.fragment");react_production_min.StrictMode=w("react.strict_mode");react_production_min.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");react_production_min.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy");}var x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return "function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState");};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
	function K(a,b){return {$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return "object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d);}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
	react_production_min.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P(a,function(){b++;});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};react_production_min.Component=C;react_production_min.PureComponent=E;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
	react_production_min.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};react_production_min.createElement=J;react_production_min.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};react_production_min.forwardRef=function(a){return {$$typeof:t,render:a}};react_production_min.isValidElement=L;
	react_production_min.lazy=function(a){return {$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};react_production_min.memo=function(a,b){return {$$typeof:u,type:a,compare:void 0===b?null:b}};react_production_min.useCallback=function(a,b){return S().useCallback(a,b)};react_production_min.useContext=function(a,b){return S().useContext(a,b)};react_production_min.useDebugValue=function(){};react_production_min.useEffect=function(a,b){return S().useEffect(a,b)};react_production_min.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
	react_production_min.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};react_production_min.useMemo=function(a,b){return S().useMemo(a,b)};react_production_min.useReducer=function(a,b,c){return S().useReducer(a,b,c)};react_production_min.useRef=function(a){return S().useRef(a)};react_production_min.useState=function(a){return S().useState(a)};react_production_min.version="17.0.2";
	return react_production_min;
}

var react_development = {};

/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_development;

function requireReact_development () {
	if (hasRequiredReact_development) return react_development;
	hasRequiredReact_development = 1;
	(function (exports) {
		'use strict';

		if ("production" !== "production") {
		  (function() {
		'use strict';

		var _assign = requireObjectAssign();

		// TODO: this is special because it gets imported during build.
		var ReactVersion = '17.0.2';

		// ATTENTION
		// When adding new symbols to this file,
		// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
		// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
		// nor polyfill, then a plain number is used for performance.
		var REACT_ELEMENT_TYPE = 0xeac7;
		var REACT_PORTAL_TYPE = 0xeaca;
		exports.Fragment = 0xeacb;
		exports.StrictMode = 0xeacc;
		exports.Profiler = 0xead2;
		var REACT_PROVIDER_TYPE = 0xeacd;
		var REACT_CONTEXT_TYPE = 0xeace;
		var REACT_FORWARD_REF_TYPE = 0xead0;
		exports.Suspense = 0xead1;
		var REACT_SUSPENSE_LIST_TYPE = 0xead8;
		var REACT_MEMO_TYPE = 0xead3;
		var REACT_LAZY_TYPE = 0xead4;
		var REACT_BLOCK_TYPE = 0xead9;
		var REACT_SERVER_BLOCK_TYPE = 0xeada;
		var REACT_FUNDAMENTAL_TYPE = 0xead5;
		var REACT_SCOPE_TYPE = 0xead7;
		var REACT_OPAQUE_ID_TYPE = 0xeae0;
		var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
		var REACT_OFFSCREEN_TYPE = 0xeae2;
		var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

		if (typeof Symbol === 'function' && Symbol.for) {
		  var symbolFor = Symbol.for;
		  REACT_ELEMENT_TYPE = symbolFor('react.element');
		  REACT_PORTAL_TYPE = symbolFor('react.portal');
		  exports.Fragment = symbolFor('react.fragment');
		  exports.StrictMode = symbolFor('react.strict_mode');
		  exports.Profiler = symbolFor('react.profiler');
		  REACT_PROVIDER_TYPE = symbolFor('react.provider');
		  REACT_CONTEXT_TYPE = symbolFor('react.context');
		  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
		  exports.Suspense = symbolFor('react.suspense');
		  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
		  REACT_MEMO_TYPE = symbolFor('react.memo');
		  REACT_LAZY_TYPE = symbolFor('react.lazy');
		  REACT_BLOCK_TYPE = symbolFor('react.block');
		  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
		  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
		  REACT_SCOPE_TYPE = symbolFor('react.scope');
		  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
		  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
		  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
		  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
		}

		var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = '@@iterator';
		function getIteratorFn(maybeIterable) {
		  if (maybeIterable === null || typeof maybeIterable !== 'object') {
		    return null;
		  }

		  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

		  if (typeof maybeIterator === 'function') {
		    return maybeIterator;
		  }

		  return null;
		}

		/**
		 * Keeps track of the current dispatcher.
		 */
		var ReactCurrentDispatcher = {
		  /**
		   * @internal
		   * @type {ReactComponent}
		   */
		  current: null
		};

		/**
		 * Keeps track of the current batch's configuration such as how long an update
		 * should suspend for if it needs to.
		 */
		var ReactCurrentBatchConfig = {
		  transition: 0
		};

		/**
		 * Keeps track of the current owner.
		 *
		 * The current owner is the component who should own any components that are
		 * currently being constructed.
		 */
		var ReactCurrentOwner = {
		  /**
		   * @internal
		   * @type {ReactComponent}
		   */
		  current: null
		};

		var ReactDebugCurrentFrame = {};
		var currentExtraStackFrame = null;
		function setExtraStackFrame(stack) {
		  {
		    currentExtraStackFrame = stack;
		  }
		}

		{
		  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
		    {
		      currentExtraStackFrame = stack;
		    }
		  }; // Stack implementation injected by the current renderer.


		  ReactDebugCurrentFrame.getCurrentStack = null;

		  ReactDebugCurrentFrame.getStackAddendum = function () {
		    var stack = ''; // Add an extra top frame while an element is being validated

		    if (currentExtraStackFrame) {
		      stack += currentExtraStackFrame;
		    } // Delegate to the injected renderer-specific implementation


		    var impl = ReactDebugCurrentFrame.getCurrentStack;

		    if (impl) {
		      stack += impl() || '';
		    }

		    return stack;
		  };
		}

		/**
		 * Used by act() to track whether you're inside an act() scope.
		 */
		var IsSomeRendererActing = {
		  current: false
		};

		var ReactSharedInternals = {
		  ReactCurrentDispatcher: ReactCurrentDispatcher,
		  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
		  ReactCurrentOwner: ReactCurrentOwner,
		  IsSomeRendererActing: IsSomeRendererActing,
		  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
		  assign: _assign
		};

		{
		  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
		}

		// by calls to these methods by a Babel plugin.
		//
		// In PROD (or in packages without access to React internals),
		// they are left as they are instead.

		function warn(format) {
		  {
		    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }

		    printWarning('warn', format, args);
		  }
		}
		function error(format) {
		  {
		    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		      args[_key2 - 1] = arguments[_key2];
		    }

		    printWarning('error', format, args);
		  }
		}

		function printWarning(level, format, args) {
		  // When changing this logic, you might want to also
		  // update consoleWithStackDev.www.js as well.
		  {
		    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		    var stack = ReactDebugCurrentFrame.getStackAddendum();

		    if (stack !== '') {
		      format += '%s';
		      args = args.concat([stack]);
		    }

		    var argsWithFormat = args.map(function (item) {
		      return '' + item;
		    }); // Careful: RN currently depends on this prefix

		    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
		    // breaks IE9: https://github.com/facebook/react/issues/13610
		    // eslint-disable-next-line react-internal/no-production-logging

		    Function.prototype.apply.call(console[level], console, argsWithFormat);
		  }
		}

		var didWarnStateUpdateForUnmountedComponent = {};

		function warnNoop(publicInstance, callerName) {
		  {
		    var _constructor = publicInstance.constructor;
		    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
		    var warningKey = componentName + "." + callerName;

		    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
		      return;
		    }

		    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

		    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
		  }
		}
		/**
		 * This is the abstract API for an update queue.
		 */


		var ReactNoopUpdateQueue = {
		  /**
		   * Checks whether or not this composite component is mounted.
		   * @param {ReactClass} publicInstance The instance we want to test.
		   * @return {boolean} True if mounted, false otherwise.
		   * @protected
		   * @final
		   */
		  isMounted: function (publicInstance) {
		    return false;
		  },

		  /**
		   * Forces an update. This should only be invoked when it is known with
		   * certainty that we are **not** in a DOM transaction.
		   *
		   * You may want to call this when you know that some deeper aspect of the
		   * component's state has changed but `setState` was not called.
		   *
		   * This will not invoke `shouldComponentUpdate`, but it will invoke
		   * `componentWillUpdate` and `componentDidUpdate`.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} callerName name of the calling function in the public API.
		   * @internal
		   */
		  enqueueForceUpdate: function (publicInstance, callback, callerName) {
		    warnNoop(publicInstance, 'forceUpdate');
		  },

		  /**
		   * Replaces all of the state. Always use this or `setState` to mutate state.
		   * You should treat `this.state` as immutable.
		   *
		   * There is no guarantee that `this.state` will be immediately updated, so
		   * accessing `this.state` after calling this method may return the old value.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {object} completeState Next state.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} callerName name of the calling function in the public API.
		   * @internal
		   */
		  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
		    warnNoop(publicInstance, 'replaceState');
		  },

		  /**
		   * Sets a subset of the state. This only exists because _pendingState is
		   * internal. This provides a merging strategy that is not available to deep
		   * properties which is confusing. TODO: Expose pendingState or don't use it
		   * during the merge.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {object} partialState Next partial state to be merged with state.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} Name of the calling function in the public API.
		   * @internal
		   */
		  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
		    warnNoop(publicInstance, 'setState');
		  }
		};

		var emptyObject = {};

		{
		  Object.freeze(emptyObject);
		}
		/**
		 * Base class helpers for the updating state of a component.
		 */


		function Component(props, context, updater) {
		  this.props = props;
		  this.context = context; // If a component has string refs, we will assign a different object later.

		  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
		  // renderer.

		  this.updater = updater || ReactNoopUpdateQueue;
		}

		Component.prototype.isReactComponent = {};
		/**
		 * Sets a subset of the state. Always use this to mutate
		 * state. You should treat `this.state` as immutable.
		 *
		 * There is no guarantee that `this.state` will be immediately updated, so
		 * accessing `this.state` after calling this method may return the old value.
		 *
		 * There is no guarantee that calls to `setState` will run synchronously,
		 * as they may eventually be batched together.  You can provide an optional
		 * callback that will be executed when the call to setState is actually
		 * completed.
		 *
		 * When a function is provided to setState, it will be called at some point in
		 * the future (not synchronously). It will be called with the up to date
		 * component arguments (state, props, context). These values can be different
		 * from this.* because your function may be called after receiveProps but before
		 * shouldComponentUpdate, and this new state, props, and context will not yet be
		 * assigned to this.
		 *
		 * @param {object|function} partialState Next partial state or function to
		 *        produce next partial state to be merged with current state.
		 * @param {?function} callback Called after state is updated.
		 * @final
		 * @protected
		 */

		Component.prototype.setState = function (partialState, callback) {
		  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
		    {
		      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
		    }
		  }

		  this.updater.enqueueSetState(this, partialState, callback, 'setState');
		};
		/**
		 * Forces an update. This should only be invoked when it is known with
		 * certainty that we are **not** in a DOM transaction.
		 *
		 * You may want to call this when you know that some deeper aspect of the
		 * component's state has changed but `setState` was not called.
		 *
		 * This will not invoke `shouldComponentUpdate`, but it will invoke
		 * `componentWillUpdate` and `componentDidUpdate`.
		 *
		 * @param {?function} callback Called after update is complete.
		 * @final
		 * @protected
		 */


		Component.prototype.forceUpdate = function (callback) {
		  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
		};
		/**
		 * Deprecated APIs. These APIs used to exist on classic React classes but since
		 * we would like to deprecate them, we're not going to move them over to this
		 * modern base class. Instead, we define a getter that warns if it's accessed.
		 */


		{
		  var deprecatedAPIs = {
		    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
		    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
		  };

		  var defineDeprecationWarning = function (methodName, info) {
		    Object.defineProperty(Component.prototype, methodName, {
		      get: function () {
		        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

		        return undefined;
		      }
		    });
		  };

		  for (var fnName in deprecatedAPIs) {
		    if (deprecatedAPIs.hasOwnProperty(fnName)) {
		      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		    }
		  }
		}

		function ComponentDummy() {}

		ComponentDummy.prototype = Component.prototype;
		/**
		 * Convenience component with default shallow equality check for sCU.
		 */

		function PureComponent(props, context, updater) {
		  this.props = props;
		  this.context = context; // If a component has string refs, we will assign a different object later.

		  this.refs = emptyObject;
		  this.updater = updater || ReactNoopUpdateQueue;
		}

		var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
		pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

		_assign(pureComponentPrototype, Component.prototype);

		pureComponentPrototype.isPureReactComponent = true;

		// an immutable object with a single mutable value
		function createRef() {
		  var refObject = {
		    current: null
		  };

		  {
		    Object.seal(refObject);
		  }

		  return refObject;
		}

		function getWrappedName(outerType, innerType, wrapperName) {
		  var functionName = innerType.displayName || innerType.name || '';
		  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
		}

		function getContextName(type) {
		  return type.displayName || 'Context';
		}

		function getComponentName(type) {
		  if (type == null) {
		    // Host root, text node or just invalid type.
		    return null;
		  }

		  {
		    if (typeof type.tag === 'number') {
		      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
		    }
		  }

		  if (typeof type === 'function') {
		    return type.displayName || type.name || null;
		  }

		  if (typeof type === 'string') {
		    return type;
		  }

		  switch (type) {
		    case exports.Fragment:
		      return 'Fragment';

		    case REACT_PORTAL_TYPE:
		      return 'Portal';

		    case exports.Profiler:
		      return 'Profiler';

		    case exports.StrictMode:
		      return 'StrictMode';

		    case exports.Suspense:
		      return 'Suspense';

		    case REACT_SUSPENSE_LIST_TYPE:
		      return 'SuspenseList';
		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_CONTEXT_TYPE:
		        var context = type;
		        return getContextName(context) + '.Consumer';

		      case REACT_PROVIDER_TYPE:
		        var provider = type;
		        return getContextName(provider._context) + '.Provider';

		      case REACT_FORWARD_REF_TYPE:
		        return getWrappedName(type, type.render, 'ForwardRef');

		      case REACT_MEMO_TYPE:
		        return getComponentName(type.type);

		      case REACT_BLOCK_TYPE:
		        return getComponentName(type._render);

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            return getComponentName(init(payload));
		          } catch (x) {
		            return null;
		          }
		        }
		    }
		  }

		  return null;
		}

		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var RESERVED_PROPS = {
		  key: true,
		  ref: true,
		  __self: true,
		  __source: true
		};
		var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

		{
		  didWarnAboutStringRefs = {};
		}

		function hasValidRef(config) {
		  {
		    if (hasOwnProperty.call(config, 'ref')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.ref !== undefined;
		}

		function hasValidKey(config) {
		  {
		    if (hasOwnProperty.call(config, 'key')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.key !== undefined;
		}

		function defineKeyPropWarningGetter(props, displayName) {
		  var warnAboutAccessingKey = function () {
		    {
		      if (!specialPropKeyWarningShown) {
		        specialPropKeyWarningShown = true;

		        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    }
		  };

		  warnAboutAccessingKey.isReactWarning = true;
		  Object.defineProperty(props, 'key', {
		    get: warnAboutAccessingKey,
		    configurable: true
		  });
		}

		function defineRefPropWarningGetter(props, displayName) {
		  var warnAboutAccessingRef = function () {
		    {
		      if (!specialPropRefWarningShown) {
		        specialPropRefWarningShown = true;

		        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    }
		  };

		  warnAboutAccessingRef.isReactWarning = true;
		  Object.defineProperty(props, 'ref', {
		    get: warnAboutAccessingRef,
		    configurable: true
		  });
		}

		function warnIfStringRefCannotBeAutoConverted(config) {
		  {
		    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
		      var componentName = getComponentName(ReactCurrentOwner.current.type);

		      if (!didWarnAboutStringRefs[componentName]) {
		        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);

		        didWarnAboutStringRefs[componentName] = true;
		      }
		    }
		  }
		}
		/**
		 * Factory method to create a new React element. This no longer adheres to
		 * the class pattern, so do not use new to call it. Also, instanceof check
		 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		 * if something is a React Element.
		 *
		 * @param {*} type
		 * @param {*} props
		 * @param {*} key
		 * @param {string|object} ref
		 * @param {*} owner
		 * @param {*} self A *temporary* helper to detect places where `this` is
		 * different from the `owner` when React.createElement is called, so that we
		 * can warn. We want to get rid of owner and replace string `ref`s with arrow
		 * functions, and as long as `this` and owner are the same, there will be no
		 * change in behavior.
		 * @param {*} source An annotation object (added by a transpiler or otherwise)
		 * indicating filename, line number, and/or other information.
		 * @internal
		 */


		var ReactElement = function (type, key, ref, self, source, owner, props) {
		  var element = {
		    // This tag allows us to uniquely identify this as a React Element
		    $$typeof: REACT_ELEMENT_TYPE,
		    // Built-in properties that belong on the element
		    type: type,
		    key: key,
		    ref: ref,
		    props: props,
		    // Record the component responsible for creating this element.
		    _owner: owner
		  };

		  {
		    // The validation flag is currently mutative. We put it on
		    // an external backing store so that we can freeze the whole object.
		    // This can be replaced with a WeakMap once they are implemented in
		    // commonly used development environments.
		    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
		    // the validation flag non-enumerable (where possible, which should
		    // include every environment we run tests in), so the test framework
		    // ignores it.

		    Object.defineProperty(element._store, 'validated', {
		      configurable: false,
		      enumerable: false,
		      writable: true,
		      value: false
		    }); // self and source are DEV only properties.

		    Object.defineProperty(element, '_self', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: self
		    }); // Two elements created in two different places should be considered
		    // equal for testing purposes and therefore we hide it from enumeration.

		    Object.defineProperty(element, '_source', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: source
		    });

		    if (Object.freeze) {
		      Object.freeze(element.props);
		      Object.freeze(element);
		    }
		  }

		  return element;
		};
		/**
		 * Create and return a new ReactElement of the given type.
		 * See https://reactjs.org/docs/react-api.html#createelement
		 */

		function createElement(type, config, children) {
		  var propName; // Reserved names are extracted

		  var props = {};
		  var key = null;
		  var ref = null;
		  var self = null;
		  var source = null;

		  if (config != null) {
		    if (hasValidRef(config)) {
		      ref = config.ref;

		      {
		        warnIfStringRefCannotBeAutoConverted(config);
		      }
		    }

		    if (hasValidKey(config)) {
		      key = '' + config.key;
		    }

		    self = config.__self === undefined ? null : config.__self;
		    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        props[propName] = config[propName];
		      }
		    }
		  } // Children can be more than one argument, and those are transferred onto
		  // the newly allocated props object.


		  var childrenLength = arguments.length - 2;

		  if (childrenLength === 1) {
		    props.children = children;
		  } else if (childrenLength > 1) {
		    var childArray = Array(childrenLength);

		    for (var i = 0; i < childrenLength; i++) {
		      childArray[i] = arguments[i + 2];
		    }

		    {
		      if (Object.freeze) {
		        Object.freeze(childArray);
		      }
		    }

		    props.children = childArray;
		  } // Resolve default props


		  if (type && type.defaultProps) {
		    var defaultProps = type.defaultProps;

		    for (propName in defaultProps) {
		      if (props[propName] === undefined) {
		        props[propName] = defaultProps[propName];
		      }
		    }
		  }

		  {
		    if (key || ref) {
		      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

		      if (key) {
		        defineKeyPropWarningGetter(props, displayName);
		      }

		      if (ref) {
		        defineRefPropWarningGetter(props, displayName);
		      }
		    }
		  }

		  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		}
		function cloneAndReplaceKey(oldElement, newKey) {
		  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
		  return newElement;
		}
		/**
		 * Clone and return a new ReactElement using element as the starting point.
		 * See https://reactjs.org/docs/react-api.html#cloneelement
		 */

		function cloneElement(element, config, children) {
		  if (!!(element === null || element === undefined)) {
		    {
		      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
		    }
		  }

		  var propName; // Original props are copied

		  var props = _assign({}, element.props); // Reserved names are extracted


		  var key = element.key;
		  var ref = element.ref; // Self is preserved since the owner is preserved.

		  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
		  // transpiler, and the original source is probably a better indicator of the
		  // true owner.

		  var source = element._source; // Owner will be preserved, unless ref is overridden

		  var owner = element._owner;

		  if (config != null) {
		    if (hasValidRef(config)) {
		      // Silently steal the ref from the parent.
		      ref = config.ref;
		      owner = ReactCurrentOwner.current;
		    }

		    if (hasValidKey(config)) {
		      key = '' + config.key;
		    } // Remaining properties override existing props


		    var defaultProps;

		    if (element.type && element.type.defaultProps) {
		      defaultProps = element.type.defaultProps;
		    }

		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        if (config[propName] === undefined && defaultProps !== undefined) {
		          // Resolve default props
		          props[propName] = defaultProps[propName];
		        } else {
		          props[propName] = config[propName];
		        }
		      }
		    }
		  } // Children can be more than one argument, and those are transferred onto
		  // the newly allocated props object.


		  var childrenLength = arguments.length - 2;

		  if (childrenLength === 1) {
		    props.children = children;
		  } else if (childrenLength > 1) {
		    var childArray = Array(childrenLength);

		    for (var i = 0; i < childrenLength; i++) {
		      childArray[i] = arguments[i + 2];
		    }

		    props.children = childArray;
		  }

		  return ReactElement(element.type, key, ref, self, source, owner, props);
		}
		/**
		 * Verifies the object is a ReactElement.
		 * See https://reactjs.org/docs/react-api.html#isvalidelement
		 * @param {?object} object
		 * @return {boolean} True if `object` is a ReactElement.
		 * @final
		 */

		function isValidElement(object) {
		  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}

		var SEPARATOR = '.';
		var SUBSEPARATOR = ':';
		/**
		 * Escape and wrap key so it is safe to use as a reactid
		 *
		 * @param {string} key to be escaped.
		 * @return {string} the escaped key.
		 */

		function escape(key) {
		  var escapeRegex = /[=:]/g;
		  var escaperLookup = {
		    '=': '=0',
		    ':': '=2'
		  };
		  var escapedString = key.replace(escapeRegex, function (match) {
		    return escaperLookup[match];
		  });
		  return '$' + escapedString;
		}
		/**
		 * TODO: Test that a single child and an array with one item have the same key
		 * pattern.
		 */


		var didWarnAboutMaps = false;
		var userProvidedKeyEscapeRegex = /\/+/g;

		function escapeUserProvidedKey(text) {
		  return text.replace(userProvidedKeyEscapeRegex, '$&/');
		}
		/**
		 * Generate a key string that identifies a element within a set.
		 *
		 * @param {*} element A element that could contain a manual key.
		 * @param {number} index Index that is used if a manual key is not provided.
		 * @return {string}
		 */


		function getElementKey(element, index) {
		  // Do some typechecking here since we call this blindly. We want to ensure
		  // that we don't block potential future ES APIs.
		  if (typeof element === 'object' && element !== null && element.key != null) {
		    // Explicit key
		    return escape('' + element.key);
		  } // Implicit key determined by the index in the set


		  return index.toString(36);
		}

		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		  var type = typeof children;

		  if (type === 'undefined' || type === 'boolean') {
		    // All of the above are perceived as null.
		    children = null;
		  }

		  var invokeCallback = false;

		  if (children === null) {
		    invokeCallback = true;
		  } else {
		    switch (type) {
		      case 'string':
		      case 'number':
		        invokeCallback = true;
		        break;

		      case 'object':
		        switch (children.$$typeof) {
		          case REACT_ELEMENT_TYPE:
		          case REACT_PORTAL_TYPE:
		            invokeCallback = true;
		        }

		    }
		  }

		  if (invokeCallback) {
		    var _child = children;
		    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
		    // so that it's consistent if the number of children grows:

		    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

		    if (Array.isArray(mappedChild)) {
		      var escapedChildKey = '';

		      if (childKey != null) {
		        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
		      }

		      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
		        return c;
		      });
		    } else if (mappedChild != null) {
		      if (isValidElement(mappedChild)) {
		        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
		        // traverseAllChildren used to do for objects as children
		        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
		        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
		        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
		      }

		      array.push(mappedChild);
		    }

		    return 1;
		  }

		  var child;
		  var nextName;
		  var subtreeCount = 0; // Count of children found in the current subtree.

		  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

		  if (Array.isArray(children)) {
		    for (var i = 0; i < children.length; i++) {
		      child = children[i];
		      nextName = nextNamePrefix + getElementKey(child, i);
		      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
		    }
		  } else {
		    var iteratorFn = getIteratorFn(children);

		    if (typeof iteratorFn === 'function') {
		      var iterableChildren = children;

		      {
		        // Warn about using Maps as children
		        if (iteratorFn === iterableChildren.entries) {
		          if (!didWarnAboutMaps) {
		            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
		          }

		          didWarnAboutMaps = true;
		        }
		      }

		      var iterator = iteratorFn.call(iterableChildren);
		      var step;
		      var ii = 0;

		      while (!(step = iterator.next()).done) {
		        child = step.value;
		        nextName = nextNamePrefix + getElementKey(child, ii++);
		        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
		      }
		    } else if (type === 'object') {
		      var childrenString = '' + children;

		      {
		        {
		          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead." );
		        }
		      }
		    }
		  }

		  return subtreeCount;
		}

		/**
		 * Maps children that are typically specified as `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
		 *
		 * The provided mapFunction(child, index) will be called for each
		 * leaf child.
		 *
		 * @param {?*} children Children tree container.
		 * @param {function(*, int)} func The map function.
		 * @param {*} context Context for mapFunction.
		 * @return {object} Object containing the ordered map of results.
		 */
		function mapChildren(children, func, context) {
		  if (children == null) {
		    return children;
		  }

		  var result = [];
		  var count = 0;
		  mapIntoArray(children, result, '', '', function (child) {
		    return func.call(context, child, count++);
		  });
		  return result;
		}
		/**
		 * Count the number of children that are typically specified as
		 * `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrencount
		 *
		 * @param {?*} children Children tree container.
		 * @return {number} The number of children.
		 */


		function countChildren(children) {
		  var n = 0;
		  mapChildren(children, function () {
		    n++; // Don't return anything
		  });
		  return n;
		}

		/**
		 * Iterates through children that are typically specified as `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
		 *
		 * The provided forEachFunc(child, index) will be called for each
		 * leaf child.
		 *
		 * @param {?*} children Children tree container.
		 * @param {function(*, int)} forEachFunc
		 * @param {*} forEachContext Context for forEachContext.
		 */
		function forEachChildren(children, forEachFunc, forEachContext) {
		  mapChildren(children, function () {
		    forEachFunc.apply(this, arguments); // Don't return anything.
		  }, forEachContext);
		}
		/**
		 * Flatten a children object (typically specified as `props.children`) and
		 * return an array with appropriately re-keyed children.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
		 */


		function toArray(children) {
		  return mapChildren(children, function (child) {
		    return child;
		  }) || [];
		}
		/**
		 * Returns the first child in a collection of children and verifies that there
		 * is only one child in the collection.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
		 *
		 * The current implementation of this function assumes that a single child gets
		 * passed without a wrapper, but the purpose of this helper function is to
		 * abstract away the particular structure of children.
		 *
		 * @param {?object} children Child collection structure.
		 * @return {ReactElement} The first and only `ReactElement` contained in the
		 * structure.
		 */


		function onlyChild(children) {
		  if (!isValidElement(children)) {
		    {
		      throw Error( "React.Children.only expected to receive a single React element child." );
		    }
		  }

		  return children;
		}

		function createContext(defaultValue, calculateChangedBits) {
		  if (calculateChangedBits === undefined) {
		    calculateChangedBits = null;
		  } else {
		    {
		      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
		        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
		      }
		    }
		  }

		  var context = {
		    $$typeof: REACT_CONTEXT_TYPE,
		    _calculateChangedBits: calculateChangedBits,
		    // As a workaround to support multiple concurrent renderers, we categorize
		    // some renderers as primary and others as secondary. We only expect
		    // there to be two concurrent renderers at most: React Native (primary) and
		    // Fabric (secondary); React DOM (primary) and React ART (secondary).
		    // Secondary renderers store their context values on separate fields.
		    _currentValue: defaultValue,
		    _currentValue2: defaultValue,
		    // Used to track how many concurrent renderers this context currently
		    // supports within in a single renderer. Such as parallel server rendering.
		    _threadCount: 0,
		    // These are circular
		    Provider: null,
		    Consumer: null
		  };
		  context.Provider = {
		    $$typeof: REACT_PROVIDER_TYPE,
		    _context: context
		  };
		  var hasWarnedAboutUsingNestedContextConsumers = false;
		  var hasWarnedAboutUsingConsumerProvider = false;
		  var hasWarnedAboutDisplayNameOnConsumer = false;

		  {
		    // A separate object, but proxies back to the original context object for
		    // backwards compatibility. It has a different $$typeof, so we can properly
		    // warn for the incorrect usage of Context as a Consumer.
		    var Consumer = {
		      $$typeof: REACT_CONTEXT_TYPE,
		      _context: context,
		      _calculateChangedBits: context._calculateChangedBits
		    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

		    Object.defineProperties(Consumer, {
		      Provider: {
		        get: function () {
		          if (!hasWarnedAboutUsingConsumerProvider) {
		            hasWarnedAboutUsingConsumerProvider = true;

		            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
		          }

		          return context.Provider;
		        },
		        set: function (_Provider) {
		          context.Provider = _Provider;
		        }
		      },
		      _currentValue: {
		        get: function () {
		          return context._currentValue;
		        },
		        set: function (_currentValue) {
		          context._currentValue = _currentValue;
		        }
		      },
		      _currentValue2: {
		        get: function () {
		          return context._currentValue2;
		        },
		        set: function (_currentValue2) {
		          context._currentValue2 = _currentValue2;
		        }
		      },
		      _threadCount: {
		        get: function () {
		          return context._threadCount;
		        },
		        set: function (_threadCount) {
		          context._threadCount = _threadCount;
		        }
		      },
		      Consumer: {
		        get: function () {
		          if (!hasWarnedAboutUsingNestedContextConsumers) {
		            hasWarnedAboutUsingNestedContextConsumers = true;

		            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
		          }

		          return context.Consumer;
		        }
		      },
		      displayName: {
		        get: function () {
		          return context.displayName;
		        },
		        set: function (displayName) {
		          if (!hasWarnedAboutDisplayNameOnConsumer) {
		            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);

		            hasWarnedAboutDisplayNameOnConsumer = true;
		          }
		        }
		      }
		    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

		    context.Consumer = Consumer;
		  }

		  {
		    context._currentRenderer = null;
		    context._currentRenderer2 = null;
		  }

		  return context;
		}

		var Uninitialized = -1;
		var Pending = 0;
		var Resolved = 1;
		var Rejected = 2;

		function lazyInitializer(payload) {
		  if (payload._status === Uninitialized) {
		    var ctor = payload._result;
		    var thenable = ctor(); // Transition to the next state.

		    var pending = payload;
		    pending._status = Pending;
		    pending._result = thenable;
		    thenable.then(function (moduleObject) {
		      if (payload._status === Pending) {
		        var defaultExport = moduleObject.default;

		        {
		          if (defaultExport === undefined) {
		            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
		            'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
		          }
		        } // Transition to the next state.


		        var resolved = payload;
		        resolved._status = Resolved;
		        resolved._result = defaultExport;
		      }
		    }, function (error) {
		      if (payload._status === Pending) {
		        // Transition to the next state.
		        var rejected = payload;
		        rejected._status = Rejected;
		        rejected._result = error;
		      }
		    });
		  }

		  if (payload._status === Resolved) {
		    return payload._result;
		  } else {
		    throw payload._result;
		  }
		}

		function lazy(ctor) {
		  var payload = {
		    // We use these fields to store the result.
		    _status: -1,
		    _result: ctor
		  };
		  var lazyType = {
		    $$typeof: REACT_LAZY_TYPE,
		    _payload: payload,
		    _init: lazyInitializer
		  };

		  {
		    // In production, this would just set it on the object.
		    var defaultProps;
		    var propTypes; // $FlowFixMe

		    Object.defineProperties(lazyType, {
		      defaultProps: {
		        configurable: true,
		        get: function () {
		          return defaultProps;
		        },
		        set: function (newDefaultProps) {
		          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

		          defaultProps = newDefaultProps; // Match production behavior more closely:
		          // $FlowFixMe

		          Object.defineProperty(lazyType, 'defaultProps', {
		            enumerable: true
		          });
		        }
		      },
		      propTypes: {
		        configurable: true,
		        get: function () {
		          return propTypes;
		        },
		        set: function (newPropTypes) {
		          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

		          propTypes = newPropTypes; // Match production behavior more closely:
		          // $FlowFixMe

		          Object.defineProperty(lazyType, 'propTypes', {
		            enumerable: true
		          });
		        }
		      }
		    });
		  }

		  return lazyType;
		}

		function forwardRef(render) {
		  {
		    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
		      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
		    } else if (typeof render !== 'function') {
		      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
		    } else {
		      if (render.length !== 0 && render.length !== 2) {
		        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
		      }
		    }

		    if (render != null) {
		      if (render.defaultProps != null || render.propTypes != null) {
		        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
		      }
		    }
		  }

		  var elementType = {
		    $$typeof: REACT_FORWARD_REF_TYPE,
		    render: render
		  };

		  {
		    var ownName;
		    Object.defineProperty(elementType, 'displayName', {
		      enumerable: false,
		      configurable: true,
		      get: function () {
		        return ownName;
		      },
		      set: function (name) {
		        ownName = name;

		        if (render.displayName == null) {
		          render.displayName = name;
		        }
		      }
		    });
		  }

		  return elementType;
		}

		// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

		var enableScopeAPI = false; // Experimental Create Event Handle API.

		function isValidElementType(type) {
		  if (typeof type === 'string' || typeof type === 'function') {
		    return true;
		  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


		  if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
		    return true;
		  }

		  if (typeof type === 'object' && type !== null) {
		    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
		      return true;
		    }
		  }

		  return false;
		}

		function memo(type, compare) {
		  {
		    if (!isValidElementType(type)) {
		      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
		    }
		  }

		  var elementType = {
		    $$typeof: REACT_MEMO_TYPE,
		    type: type,
		    compare: compare === undefined ? null : compare
		  };

		  {
		    var ownName;
		    Object.defineProperty(elementType, 'displayName', {
		      enumerable: false,
		      configurable: true,
		      get: function () {
		        return ownName;
		      },
		      set: function (name) {
		        ownName = name;

		        if (type.displayName == null) {
		          type.displayName = name;
		        }
		      }
		    });
		  }

		  return elementType;
		}

		function resolveDispatcher() {
		  var dispatcher = ReactCurrentDispatcher.current;

		  if (!(dispatcher !== null)) {
		    {
		      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem." );
		    }
		  }

		  return dispatcher;
		}

		function useContext(Context, unstable_observedBits) {
		  var dispatcher = resolveDispatcher();

		  {
		    if (unstable_observedBits !== undefined) {
		      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');
		    } // TODO: add a more generic warning for invalid values.


		    if (Context._context !== undefined) {
		      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
		      // and nobody should be using this in existing code.

		      if (realContext.Consumer === Context) {
		        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
		      } else if (realContext.Provider === Context) {
		        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
		      }
		    }
		  }

		  return dispatcher.useContext(Context, unstable_observedBits);
		}
		function useState(initialState) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useState(initialState);
		}
		function useReducer(reducer, initialArg, init) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useReducer(reducer, initialArg, init);
		}
		function useRef(initialValue) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useRef(initialValue);
		}
		function useEffect(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useEffect(create, deps);
		}
		function useLayoutEffect(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useLayoutEffect(create, deps);
		}
		function useCallback(callback, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useCallback(callback, deps);
		}
		function useMemo(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useMemo(create, deps);
		}
		function useImperativeHandle(ref, create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useImperativeHandle(ref, create, deps);
		}
		function useDebugValue(value, formatterFn) {
		  {
		    var dispatcher = resolveDispatcher();
		    return dispatcher.useDebugValue(value, formatterFn);
		  }
		}

		// Helpers to patch console.logs to avoid logging during side-effect free
		// replaying on render function. This currently only patches the object
		// lazily which won't cover if the log function was extracted eagerly.
		// We could also eagerly patch the method.
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;

		function disabledLog() {}

		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
		  {
		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      prevLog = console.log;
		      prevInfo = console.info;
		      prevWarn = console.warn;
		      prevError = console.error;
		      prevGroup = console.group;
		      prevGroupCollapsed = console.groupCollapsed;
		      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

		      var props = {
		        configurable: true,
		        enumerable: true,
		        value: disabledLog,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        info: props,
		        log: props,
		        warn: props,
		        error: props,
		        group: props,
		        groupCollapsed: props,
		        groupEnd: props
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    disabledDepth++;
		  }
		}
		function reenableLogs() {
		  {
		    disabledDepth--;

		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      var props = {
		        configurable: true,
		        enumerable: true,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        log: _assign({}, props, {
		          value: prevLog
		        }),
		        info: _assign({}, props, {
		          value: prevInfo
		        }),
		        warn: _assign({}, props, {
		          value: prevWarn
		        }),
		        error: _assign({}, props, {
		          value: prevError
		        }),
		        group: _assign({}, props, {
		          value: prevGroup
		        }),
		        groupCollapsed: _assign({}, props, {
		          value: prevGroupCollapsed
		        }),
		        groupEnd: _assign({}, props, {
		          value: prevGroupEnd
		        })
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    if (disabledDepth < 0) {
		      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
		    }
		  }
		}

		var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
		  {
		    if (prefix === undefined) {
		      // Extract the VM specific prefix used by each line.
		      try {
		        throw Error();
		      } catch (x) {
		        var match = x.stack.trim().match(/\n( *(at )?)/);
		        prefix = match && match[1] || '';
		      }
		    } // We use the prefix to ensure our stacks line up with native stack frames.


		    return '\n' + prefix + name;
		  }
		}
		var reentry = false;
		var componentFrameCache;

		{
		  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
		  componentFrameCache = new PossiblyWeakMap();
		}

		function describeNativeComponentFrame(fn, construct) {
		  // If something asked for a stack inside a fake render, it should get ignored.
		  if (!fn || reentry) {
		    return '';
		  }

		  {
		    var frame = componentFrameCache.get(fn);

		    if (frame !== undefined) {
		      return frame;
		    }
		  }

		  var control;
		  reentry = true;
		  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

		  Error.prepareStackTrace = undefined;
		  var previousDispatcher;

		  {
		    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
		    // for warnings.

		    ReactCurrentDispatcher$1.current = null;
		    disableLogs();
		  }

		  try {
		    // This should throw.
		    if (construct) {
		      // Something should be setting the props in the constructor.
		      var Fake = function () {
		        throw Error();
		      }; // $FlowFixMe


		      Object.defineProperty(Fake.prototype, 'props', {
		        set: function () {
		          // We use a throwing setter instead of frozen or non-writable props
		          // because that won't throw in a non-strict mode function.
		          throw Error();
		        }
		      });

		      if (typeof Reflect === 'object' && Reflect.construct) {
		        // We construct a different control for this case to include any extra
		        // frames added by the construct call.
		        try {
		          Reflect.construct(Fake, []);
		        } catch (x) {
		          control = x;
		        }

		        Reflect.construct(fn, [], Fake);
		      } else {
		        try {
		          Fake.call();
		        } catch (x) {
		          control = x;
		        }

		        fn.call(Fake.prototype);
		      }
		    } else {
		      try {
		        throw Error();
		      } catch (x) {
		        control = x;
		      }

		      fn();
		    }
		  } catch (sample) {
		    // This is inlined manually because closure doesn't do it for us.
		    if (sample && control && typeof sample.stack === 'string') {
		      // This extracts the first frame from the sample that isn't also in the control.
		      // Skipping one frame that we assume is the frame that calls the two.
		      var sampleLines = sample.stack.split('\n');
		      var controlLines = control.stack.split('\n');
		      var s = sampleLines.length - 1;
		      var c = controlLines.length - 1;

		      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
		        // We expect at least one stack frame to be shared.
		        // Typically this will be the root most one. However, stack frames may be
		        // cut off due to maximum stack limits. In this case, one maybe cut off
		        // earlier than the other. We assume that the sample is longer or the same
		        // and there for cut off earlier. So we should find the root most frame in
		        // the sample somewhere in the control.
		        c--;
		      }

		      for (; s >= 1 && c >= 0; s--, c--) {
		        // Next we find the first one that isn't the same which should be the
		        // frame that called our sample function and the control.
		        if (sampleLines[s] !== controlLines[c]) {
		          // In V8, the first line is describing the message but other VMs don't.
		          // If we're about to return the first line, and the control is also on the same
		          // line, that's a pretty good indicator that our sample threw at same line as
		          // the control. I.e. before we entered the sample frame. So we ignore this result.
		          // This can happen if you passed a class to function component, or non-function.
		          if (s !== 1 || c !== 1) {
		            do {
		              s--;
		              c--; // We may still have similar intermediate frames from the construct call.
		              // The next one that isn't the same should be our match though.

		              if (c < 0 || sampleLines[s] !== controlLines[c]) {
		                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
		                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

		                {
		                  if (typeof fn === 'function') {
		                    componentFrameCache.set(fn, _frame);
		                  }
		                } // Return the line we found.


		                return _frame;
		              }
		            } while (s >= 1 && c >= 0);
		          }

		          break;
		        }
		      }
		    }
		  } finally {
		    reentry = false;

		    {
		      ReactCurrentDispatcher$1.current = previousDispatcher;
		      reenableLogs();
		    }

		    Error.prepareStackTrace = previousPrepareStackTrace;
		  } // Fallback to just using the name if we couldn't make it throw.


		  var name = fn ? fn.displayName || fn.name : '';
		  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

		  {
		    if (typeof fn === 'function') {
		      componentFrameCache.set(fn, syntheticFrame);
		    }
		  }

		  return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
		  {
		    return describeNativeComponentFrame(fn, false);
		  }
		}

		function shouldConstruct(Component) {
		  var prototype = Component.prototype;
		  return !!(prototype && prototype.isReactComponent);
		}

		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

		  if (type == null) {
		    return '';
		  }

		  if (typeof type === 'function') {
		    {
		      return describeNativeComponentFrame(type, shouldConstruct(type));
		    }
		  }

		  if (typeof type === 'string') {
		    return describeBuiltInComponentFrame(type);
		  }

		  switch (type) {
		    case exports.Suspense:
		      return describeBuiltInComponentFrame('Suspense');

		    case REACT_SUSPENSE_LIST_TYPE:
		      return describeBuiltInComponentFrame('SuspenseList');
		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_FORWARD_REF_TYPE:
		        return describeFunctionComponentFrame(type.render);

		      case REACT_MEMO_TYPE:
		        // Memo may contain any component type so we recursively resolve it.
		        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

		      case REACT_BLOCK_TYPE:
		        return describeFunctionComponentFrame(type._render);

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            // Lazy may contain any component type so we recursively resolve it.
		            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
		          } catch (x) {}
		        }
		    }
		  }

		  return '';
		}

		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

		function setCurrentlyValidatingElement(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		    }
		  }
		}

		function checkPropTypes(typeSpecs, values, location, componentName, element) {
		  {
		    // $FlowFixMe This is okay but Flow doesn't know it.
		    var has = Function.call.bind(Object.prototype.hasOwnProperty);

		    for (var typeSpecName in typeSpecs) {
		      if (has(typeSpecs, typeSpecName)) {
		        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
		        // fail the render phase where it didn't fail before. So we log it.
		        // After these have been cleaned up, we'll let them throw.

		        try {
		          // This is intentionally an invariant that gets caught. It's the same
		          // behavior as without this statement except with a better message.
		          if (typeof typeSpecs[typeSpecName] !== 'function') {
		            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
		            err.name = 'Invariant Violation';
		            throw err;
		          }

		          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
		        } catch (ex) {
		          error$1 = ex;
		        }

		        if (error$1 && !(error$1 instanceof Error)) {
		          setCurrentlyValidatingElement(element);

		          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

		          setCurrentlyValidatingElement(null);
		        }

		        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
		          // Only monitor this failure once because there tends to be a lot of the
		          // same error.
		          loggedTypeFailures[error$1.message] = true;
		          setCurrentlyValidatingElement(element);

		          error('Failed %s type: %s', location, error$1.message);

		          setCurrentlyValidatingElement(null);
		        }
		      }
		    }
		  }
		}

		function setCurrentlyValidatingElement$1(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      setExtraStackFrame(stack);
		    } else {
		      setExtraStackFrame(null);
		    }
		  }
		}

		var propTypesMisspellWarningShown;

		{
		  propTypesMisspellWarningShown = false;
		}

		function getDeclarationErrorAddendum() {
		  if (ReactCurrentOwner.current) {
		    var name = getComponentName(ReactCurrentOwner.current.type);

		    if (name) {
		      return '\n\nCheck the render method of `' + name + '`.';
		    }
		  }

		  return '';
		}

		function getSourceInfoErrorAddendum(source) {
		  if (source !== undefined) {
		    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
		    var lineNumber = source.lineNumber;
		    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
		  }

		  return '';
		}

		function getSourceInfoErrorAddendumForProps(elementProps) {
		  if (elementProps !== null && elementProps !== undefined) {
		    return getSourceInfoErrorAddendum(elementProps.__source);
		  }

		  return '';
		}
		/**
		 * Warn if there's no key explicitly set on dynamic arrays of children or
		 * object keys are not valid. This allows us to keep track of children between
		 * updates.
		 */


		var ownerHasKeyUseWarning = {};

		function getCurrentComponentErrorInfo(parentType) {
		  var info = getDeclarationErrorAddendum();

		  if (!info) {
		    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

		    if (parentName) {
		      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
		    }
		  }

		  return info;
		}
		/**
		 * Warn if the element doesn't have an explicit key assigned to it.
		 * This element is in an array. The array could grow and shrink or be
		 * reordered. All children that haven't already been validated are required to
		 * have a "key" property assigned to it. Error statuses are cached so a warning
		 * will only be shown once.
		 *
		 * @internal
		 * @param {ReactElement} element Element that requires a key.
		 * @param {*} parentType element's parent's type.
		 */


		function validateExplicitKey(element, parentType) {
		  if (!element._store || element._store.validated || element.key != null) {
		    return;
		  }

		  element._store.validated = true;
		  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

		  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
		    return;
		  }

		  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
		  // property, it may be the creator of the child that's responsible for
		  // assigning it a key.

		  var childOwner = '';

		  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
		    // Give the component that originally created this child.
		    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
		  }

		  {
		    setCurrentlyValidatingElement$1(element);

		    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

		    setCurrentlyValidatingElement$1(null);
		  }
		}
		/**
		 * Ensure that every element either is passed in a static location, in an
		 * array with an explicit keys property defined, or in an object literal
		 * with valid key property.
		 *
		 * @internal
		 * @param {ReactNode} node Statically passed child of any type.
		 * @param {*} parentType node's parent's type.
		 */


		function validateChildKeys(node, parentType) {
		  if (typeof node !== 'object') {
		    return;
		  }

		  if (Array.isArray(node)) {
		    for (var i = 0; i < node.length; i++) {
		      var child = node[i];

		      if (isValidElement(child)) {
		        validateExplicitKey(child, parentType);
		      }
		    }
		  } else if (isValidElement(node)) {
		    // This element was passed in a valid location.
		    if (node._store) {
		      node._store.validated = true;
		    }
		  } else if (node) {
		    var iteratorFn = getIteratorFn(node);

		    if (typeof iteratorFn === 'function') {
		      // Entry iterators used to provide implicit keys,
		      // but now we print a separate warning for them later.
		      if (iteratorFn !== node.entries) {
		        var iterator = iteratorFn.call(node);
		        var step;

		        while (!(step = iterator.next()).done) {
		          if (isValidElement(step.value)) {
		            validateExplicitKey(step.value, parentType);
		          }
		        }
		      }
		    }
		  }
		}
		/**
		 * Given an element, validate that its props follow the propTypes definition,
		 * provided by the type.
		 *
		 * @param {ReactElement} element
		 */


		function validatePropTypes(element) {
		  {
		    var type = element.type;

		    if (type === null || type === undefined || typeof type === 'string') {
		      return;
		    }

		    var propTypes;

		    if (typeof type === 'function') {
		      propTypes = type.propTypes;
		    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
		    // Inner props are checked in the reconciler.
		    type.$$typeof === REACT_MEMO_TYPE)) {
		      propTypes = type.propTypes;
		    } else {
		      return;
		    }

		    if (propTypes) {
		      // Intentionally inside to avoid triggering lazy initializers:
		      var name = getComponentName(type);
		      checkPropTypes(propTypes, element.props, 'prop', name, element);
		    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
		      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

		      var _name = getComponentName(type);

		      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
		    }

		    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
		      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
		    }
		  }
		}
		/**
		 * Given a fragment, validate that it can only be provided with fragment props
		 * @param {ReactElement} fragment
		 */


		function validateFragmentProps(fragment) {
		  {
		    var keys = Object.keys(fragment.props);

		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];

		      if (key !== 'children' && key !== 'key') {
		        setCurrentlyValidatingElement$1(fragment);

		        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

		        setCurrentlyValidatingElement$1(null);
		        break;
		      }
		    }

		    if (fragment.ref !== null) {
		      setCurrentlyValidatingElement$1(fragment);

		      error('Invalid attribute `ref` supplied to `React.Fragment`.');

		      setCurrentlyValidatingElement$1(null);
		    }
		  }
		}
		function createElementWithValidation(type, props, children) {
		  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
		  // succeed and there will likely be errors in render.

		  if (!validType) {
		    var info = '';

		    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
		      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
		    }

		    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

		    if (sourceInfo) {
		      info += sourceInfo;
		    } else {
		      info += getDeclarationErrorAddendum();
		    }

		    var typeString;

		    if (type === null) {
		      typeString = 'null';
		    } else if (Array.isArray(type)) {
		      typeString = 'array';
		    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
		      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
		      info = ' Did you accidentally export a JSX literal instead of a component?';
		    } else {
		      typeString = typeof type;
		    }

		    {
		      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
		    }
		  }

		  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
		  // TODO: Drop this when these are no longer allowed as the type argument.

		  if (element == null) {
		    return element;
		  } // Skip key warning if the type isn't valid since our key validation logic
		  // doesn't expect a non-string/function type and can throw confusing errors.
		  // We don't want exception behavior to differ between dev and prod.
		  // (Rendering will throw with a helpful message and as soon as the type is
		  // fixed, the key warnings will appear.)


		  if (validType) {
		    for (var i = 2; i < arguments.length; i++) {
		      validateChildKeys(arguments[i], type);
		    }
		  }

		  if (type === exports.Fragment) {
		    validateFragmentProps(element);
		  } else {
		    validatePropTypes(element);
		  }

		  return element;
		}
		var didWarnAboutDeprecatedCreateFactory = false;
		function createFactoryWithValidation(type) {
		  var validatedFactory = createElementWithValidation.bind(null, type);
		  validatedFactory.type = type;

		  {
		    if (!didWarnAboutDeprecatedCreateFactory) {
		      didWarnAboutDeprecatedCreateFactory = true;

		      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
		    } // Legacy hook: remove it


		    Object.defineProperty(validatedFactory, 'type', {
		      enumerable: false,
		      get: function () {
		        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

		        Object.defineProperty(this, 'type', {
		          value: type
		        });
		        return type;
		      }
		    });
		  }

		  return validatedFactory;
		}
		function cloneElementWithValidation(element, props, children) {
		  var newElement = cloneElement.apply(this, arguments);

		  for (var i = 2; i < arguments.length; i++) {
		    validateChildKeys(arguments[i], newElement.type);
		  }

		  validatePropTypes(newElement);
		  return newElement;
		}

		{

		  try {
		    var frozenObject = Object.freeze({});
		    /* eslint-disable no-new */

		    new Map([[frozenObject, null]]);
		    new Set([frozenObject]);
		    /* eslint-enable no-new */
		  } catch (e) {
		  }
		}

		var createElement$1 =  createElementWithValidation ;
		var cloneElement$1 =  cloneElementWithValidation ;
		var createFactory =  createFactoryWithValidation ;
		var Children = {
		  map: mapChildren,
		  forEach: forEachChildren,
		  count: countChildren,
		  toArray: toArray,
		  only: onlyChild
		};

		exports.Children = Children;
		exports.Component = Component;
		exports.PureComponent = PureComponent;
		exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
		exports.cloneElement = cloneElement$1;
		exports.createContext = createContext;
		exports.createElement = createElement$1;
		exports.createFactory = createFactory;
		exports.createRef = createRef;
		exports.forwardRef = forwardRef;
		exports.isValidElement = isValidElement;
		exports.lazy = lazy;
		exports.memo = memo;
		exports.useCallback = useCallback;
		exports.useContext = useContext;
		exports.useDebugValue = useDebugValue;
		exports.useEffect = useEffect;
		exports.useImperativeHandle = useImperativeHandle;
		exports.useLayoutEffect = useLayoutEffect;
		exports.useMemo = useMemo;
		exports.useReducer = useReducer;
		exports.useRef = useRef;
		exports.useState = useState;
		exports.version = ReactVersion;
		  })();
		} 
	} (react_development));
	return react_development;
}

var react = react$1.exports;

'use strict';

if ("production" === 'production') {
  react$1.exports = requireReact_production_min();
} else {
  react$1.exports = requireReact_development();
}

var reactExports = react$1.exports;
var index$1 = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

var reactIs$2 = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min () {
	if (hasRequiredReactIs_production_min) return reactIs_production_min;
	hasRequiredReactIs_production_min = 1;
	'use strict';var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
	reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
	reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
	reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;
	return reactIs_production_min;
}

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development () {
	if (hasRequiredReactIs_development) return reactIs_development;
	hasRequiredReactIs_development = 1;
	'use strict';



	if ("production" !== "production") {
	  (function() {
	'use strict';

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	reactIs_development.AsyncMode = AsyncMode;
	reactIs_development.ConcurrentMode = ConcurrentMode;
	reactIs_development.ContextConsumer = ContextConsumer;
	reactIs_development.ContextProvider = ContextProvider;
	reactIs_development.Element = Element;
	reactIs_development.ForwardRef = ForwardRef;
	reactIs_development.Fragment = Fragment;
	reactIs_development.Lazy = Lazy;
	reactIs_development.Memo = Memo;
	reactIs_development.Portal = Portal;
	reactIs_development.Profiler = Profiler;
	reactIs_development.StrictMode = StrictMode;
	reactIs_development.Suspense = Suspense;
	reactIs_development.isAsyncMode = isAsyncMode;
	reactIs_development.isConcurrentMode = isConcurrentMode;
	reactIs_development.isContextConsumer = isContextConsumer;
	reactIs_development.isContextProvider = isContextProvider;
	reactIs_development.isElement = isElement;
	reactIs_development.isForwardRef = isForwardRef;
	reactIs_development.isFragment = isFragment;
	reactIs_development.isLazy = isLazy;
	reactIs_development.isMemo = isMemo;
	reactIs_development.isPortal = isPortal;
	reactIs_development.isProfiler = isProfiler;
	reactIs_development.isStrictMode = isStrictMode;
	reactIs_development.isSuspense = isSuspense;
	reactIs_development.isValidElementType = isValidElementType;
	reactIs_development.typeOf = typeOf;
	  })();
	}
	return reactIs_development;
}

var reactIs$1 = reactIs$2.exports;

'use strict';

if ("production" === 'production') {
  reactIs$2.exports = requireReactIs_production_min();
} else {
  reactIs$2.exports = requireReactIs_development();
}

var reactIsExports = reactIs$2.exports;
var index = /*@__PURE__*/getDefaultExportFromCjs(reactIsExports);

'use strict';

var reactIs = reactIsExports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty$1 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty$1(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

var hoistNonReactStatics$1 = /*@__PURE__*/getDefaultExportFromCjs(hoistNonReactStatics_cjs);

/**
 * http://ecma-international.org/ecma-402/7.0/index.html#sec-canonicalizelocalelist
 * @param locales
 */
function CanonicalizeLocaleList$1(locales) {
    // TODO
    return Intl.getCanonicalLocales(locales);
}

/**
 * https://tc39.es/ecma402/#sec-canonicalizetimezonename
 * @param tz
 */
function CanonicalizeTimeZoneName(tz, _a) {
    var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
    var uppercasedTz = tz.toUpperCase();
    var uppercasedZones = Object.keys(tzData).reduce(function (all, z) {
        all[z.toUpperCase()] = z;
        return all;
    }, {});
    var ianaTimeZone = uppercaseLinks[uppercasedTz] || uppercasedZones[uppercasedTz];
    if (ianaTimeZone === 'Etc/UTC' || ianaTimeZone === 'Etc/GMT') {
        return 'UTC';
    }
    return ianaTimeZone;
}

/**
 * https://tc39.es/ecma262/#sec-tostring
 */
function ToString(o) {
    // Only symbol is irregular...
    if (typeof o === 'symbol') {
        throw TypeError('Cannot convert a Symbol value to a string');
    }
    return String(o);
}
/**
 * https://tc39.es/ecma262/#sec-tonumber
 * @param val
 */
function ToNumber(val) {
    if (val === undefined) {
        return NaN;
    }
    if (val === null) {
        return +0;
    }
    if (typeof val === 'boolean') {
        return val ? 1 : +0;
    }
    if (typeof val === 'number') {
        return val;
    }
    if (typeof val === 'symbol' || typeof val === 'bigint') {
        throw new TypeError('Cannot convert symbol/bigint to number');
    }
    return Number(val);
}
/**
 * https://tc39.es/ecma262/#sec-tointeger
 * @param n
 */
function ToInteger(n) {
    var number = ToNumber(n);
    if (isNaN(number) || SameValue(number, -0)) {
        return 0;
    }
    if (isFinite(number)) {
        return number;
    }
    var integer = Math.floor(Math.abs(number));
    if (number < 0) {
        integer = -integer;
    }
    if (SameValue(integer, -0)) {
        return 0;
    }
    return integer;
}
/**
 * https://tc39.es/ecma262/#sec-timeclip
 * @param time
 */
function TimeClip(time) {
    if (!isFinite(time)) {
        return NaN;
    }
    if (Math.abs(time) > 8.64 * 1e15) {
        return NaN;
    }
    return ToInteger(time);
}
/**
 * https://tc39.es/ecma262/#sec-toobject
 * @param arg
 */
function ToObject(arg) {
    if (arg == null) {
        throw new TypeError('undefined/null cannot be converted to object');
    }
    return Object(arg);
}
/**
 * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-samevalue
 * @param x
 * @param y
 */
function SameValue(x, y) {
    if (Object.is) {
        return Object.is(x, y);
    }
    // SameValue algorithm
    if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
    }
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
}
/**
 * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-arraycreate
 * @param len
 */
function ArrayCreate(len) {
    return new Array(len);
}
/**
 * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-hasownproperty
 * @param o
 * @param prop
 */
function HasOwnProperty(o, prop) {
    return Object.prototype.hasOwnProperty.call(o, prop);
}
/**
 * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-type
 * @param x
 */
function Type(x) {
    if (x === null) {
        return 'Null';
    }
    if (typeof x === 'undefined') {
        return 'Undefined';
    }
    if (typeof x === 'function' || typeof x === 'object') {
        return 'Object';
    }
    if (typeof x === 'number') {
        return 'Number';
    }
    if (typeof x === 'boolean') {
        return 'Boolean';
    }
    if (typeof x === 'string') {
        return 'String';
    }
    if (typeof x === 'symbol') {
        return 'Symbol';
    }
    if (typeof x === 'bigint') {
        return 'BigInt';
    }
}
var MS_PER_DAY = 86400000;
/**
 * https://www.ecma-international.org/ecma-262/11.0/index.html#eqn-modulo
 * @param x
 * @param y
 * @return k of the same sign as y
 */
function mod(x, y) {
    return x - Math.floor(x / y) * y;
}
/**
 * https://tc39.es/ecma262/#eqn-Day
 * @param t
 */
function Day(t) {
    return Math.floor(t / MS_PER_DAY);
}
/**
 * https://tc39.es/ecma262/#sec-week-day
 * @param t
 */
function WeekDay(t) {
    return mod(Day(t) + 4, 7);
}
/**
 * https://tc39.es/ecma262/#sec-year-number
 * @param y
 */
function DayFromYear(y) {
    return Date.UTC(y, 0) / MS_PER_DAY;
}
/**
 * https://tc39.es/ecma262/#sec-year-number
 * @param y
 */
function TimeFromYear(y) {
    return Date.UTC(y, 0);
}
/**
 * https://tc39.es/ecma262/#sec-year-number
 * @param t
 */
function YearFromTime(t) {
    return new Date(t).getUTCFullYear();
}
function DaysInYear(y) {
    if (y % 4 !== 0) {
        return 365;
    }
    if (y % 100 !== 0) {
        return 366;
    }
    if (y % 400 !== 0) {
        return 365;
    }
    return 366;
}
function DayWithinYear(t) {
    return Day(t) - DayFromYear(YearFromTime(t));
}
function InLeapYear(t) {
    return DaysInYear(YearFromTime(t)) === 365 ? 0 : 1;
}
/**
 * https://tc39.es/ecma262/#sec-month-number
 * @param t
 */
function MonthFromTime(t) {
    var dwy = DayWithinYear(t);
    var leap = InLeapYear(t);
    if (dwy >= 0 && dwy < 31) {
        return 0;
    }
    if (dwy < 59 + leap) {
        return 1;
    }
    if (dwy < 90 + leap) {
        return 2;
    }
    if (dwy < 120 + leap) {
        return 3;
    }
    if (dwy < 151 + leap) {
        return 4;
    }
    if (dwy < 181 + leap) {
        return 5;
    }
    if (dwy < 212 + leap) {
        return 6;
    }
    if (dwy < 243 + leap) {
        return 7;
    }
    if (dwy < 273 + leap) {
        return 8;
    }
    if (dwy < 304 + leap) {
        return 9;
    }
    if (dwy < 334 + leap) {
        return 10;
    }
    if (dwy < 365 + leap) {
        return 11;
    }
    throw new Error('Invalid time');
}
function DateFromTime(t) {
    var dwy = DayWithinYear(t);
    var mft = MonthFromTime(t);
    var leap = InLeapYear(t);
    if (mft === 0) {
        return dwy + 1;
    }
    if (mft === 1) {
        return dwy - 30;
    }
    if (mft === 2) {
        return dwy - 58 - leap;
    }
    if (mft === 3) {
        return dwy - 89 - leap;
    }
    if (mft === 4) {
        return dwy - 119 - leap;
    }
    if (mft === 5) {
        return dwy - 150 - leap;
    }
    if (mft === 6) {
        return dwy - 180 - leap;
    }
    if (mft === 7) {
        return dwy - 211 - leap;
    }
    if (mft === 8) {
        return dwy - 242 - leap;
    }
    if (mft === 9) {
        return dwy - 272 - leap;
    }
    if (mft === 10) {
        return dwy - 303 - leap;
    }
    if (mft === 11) {
        return dwy - 333 - leap;
    }
    throw new Error('Invalid time');
}
var HOURS_PER_DAY = 24;
var MINUTES_PER_HOUR = 60;
var SECONDS_PER_MINUTE = 60;
var MS_PER_SECOND = 1e3;
var MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
var MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
function HourFromTime(t) {
    return mod(Math.floor(t / MS_PER_HOUR), HOURS_PER_DAY);
}
function MinFromTime(t) {
    return mod(Math.floor(t / MS_PER_MINUTE), MINUTES_PER_HOUR);
}
function SecFromTime(t) {
    return mod(Math.floor(t / MS_PER_SECOND), SECONDS_PER_MINUTE);
}
function IsCallable(fn) {
    return typeof fn === 'function';
}
/**
 * The abstract operation OrdinaryHasInstance implements
 * the default algorithm for determining if an object O
 * inherits from the instance object inheritance path
 * provided by constructor C.
 * @param C class
 * @param O object
 * @param internalSlots internalSlots
 */
function OrdinaryHasInstance(C, O, internalSlots) {
    if (!IsCallable(C)) {
        return false;
    }
    if (internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction) {
        var BC = internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction;
        return O instanceof BC;
    }
    if (typeof O !== 'object') {
        return false;
    }
    var P = C.prototype;
    if (typeof P !== 'object') {
        throw new TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
    }
    return Object.prototype.isPrototypeOf.call(P, O);
}
function msFromTime(t) {
    return mod(t, MS_PER_SECOND);
}

/**
 * https://tc39.es/ecma402/#sec-coerceoptionstoobject
 * @param options
 * @returns
 */
function CoerceOptionsToObject(options) {
    if (typeof options === 'undefined') {
        return Object.create(null);
    }
    return ToObject(options);
}

/**
 * https://tc39.es/ecma402/#sec-defaultnumberoption
 * @param val
 * @param min
 * @param max
 * @param fallback
 */
function DefaultNumberOption(inputVal, min, max, fallback) {
    if (inputVal === undefined) {
        // @ts-expect-error
        return fallback;
    }
    var val = Number(inputVal);
    if (isNaN(val) || val < min || val > max) {
        throw new RangeError("".concat(val, " is outside of range [").concat(min, ", ").concat(max, "]"));
    }
    return Math.floor(val);
}

/**
 * https://tc39.es/ecma402/#sec-getnumberoption
 * @param options
 * @param property
 * @param min
 * @param max
 * @param fallback
 */
function GetNumberOption(options, property, minimum, maximum, fallback) {
    var val = options[property];
    return DefaultNumberOption(val, minimum, maximum, fallback);
}

/**
 * https://tc39.es/ecma402/#sec-getoption
 * @param opts
 * @param prop
 * @param type
 * @param values
 * @param fallback
 */
function GetOption(opts, prop, type, values, fallback) {
    if (typeof opts !== 'object') {
        throw new TypeError('Options must be an object');
    }
    var value = opts[prop];
    if (value !== undefined) {
        if (type !== 'boolean' && type !== 'string') {
            throw new TypeError('invalid type');
        }
        if (type === 'boolean') {
            value = Boolean(value);
        }
        if (type === 'string') {
            value = ToString(value);
        }
        if (values !== undefined && !values.filter(function (val) { return val == value; }).length) {
            throw new RangeError("".concat(value, " is not within ").concat(values.join(', ')));
        }
        return value;
    }
    return fallback;
}

/**
 * https://tc39.es/ecma402/#sec-getoptionsobject
 * @param options
 * @returns
 */
function GetOptionsObject(options) {
    if (typeof options === 'undefined') {
        return Object.create(null);
    }
    if (typeof options === 'object') {
        return options;
    }
    throw new TypeError('Options must be an object');
}

/**
 * https://tc39.es/ecma402/#sec-getstringorbooleanoption
 * @param opts
 * @param prop
 * @param values
 * @param trueValue
 * @param falsyValue
 * @param fallback
 */
function GetStringOrBooleanOption(opts, prop, values, trueValue, falsyValue, fallback) {
    var value = opts[prop];
    if (value === undefined) {
        return fallback;
    }
    if (value === true) {
        return trueValue;
    }
    var valueBoolean = Boolean(value);
    if (valueBoolean === false) {
        return falsyValue;
    }
    value = ToString(value);
    if (value === 'true' || value === 'false') {
        return fallback;
    }
    if ((values || []).indexOf(value) === -1) {
        throw new RangeError("Invalid value ".concat(value));
    }
    return value;
}

/**
 * https://tc39.es/ecma402/#table-sanctioned-simple-unit-identifiers
 */
var SANCTIONED_UNITS = [
    'angle-degree',
    'area-acre',
    'area-hectare',
    'concentr-percent',
    'digital-bit',
    'digital-byte',
    'digital-gigabit',
    'digital-gigabyte',
    'digital-kilobit',
    'digital-kilobyte',
    'digital-megabit',
    'digital-megabyte',
    'digital-petabyte',
    'digital-terabit',
    'digital-terabyte',
    'duration-day',
    'duration-hour',
    'duration-millisecond',
    'duration-minute',
    'duration-month',
    'duration-second',
    'duration-week',
    'duration-year',
    'length-centimeter',
    'length-foot',
    'length-inch',
    'length-kilometer',
    'length-meter',
    'length-mile-scandinavian',
    'length-mile',
    'length-millimeter',
    'length-yard',
    'mass-gram',
    'mass-kilogram',
    'mass-ounce',
    'mass-pound',
    'mass-stone',
    'temperature-celsius',
    'temperature-fahrenheit',
    'volume-fluid-ounce',
    'volume-gallon',
    'volume-liter',
    'volume-milliliter',
];
// In CLDR, the unit name always follows the form `namespace-unit` pattern.
// For example: `digital-bit` instead of `bit`. This function removes the namespace prefix.
function removeUnitNamespace(unit) {
    return unit.slice(unit.indexOf('-') + 1);
}
/**
 * https://tc39.es/ecma402/#table-sanctioned-simple-unit-identifiers
 */
var SIMPLE_UNITS = SANCTIONED_UNITS.map(removeUnitNamespace);
/**
 * https://tc39.es/ecma402/#sec-issanctionedsimpleunitidentifier
 */
function IsSanctionedSimpleUnitIdentifier(unitIdentifier) {
    return SIMPLE_UNITS.indexOf(unitIdentifier) > -1;
}

/**
 * https://tc39.es/ecma402/#sec-isvalidtimezonename
 * @param tz
 * @param implDetails implementation details
 */
function IsValidTimeZoneName(tz, _a) {
    var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
    var uppercasedTz = tz.toUpperCase();
    var zoneNames = new Set();
    var linkNames = new Set();
    Object.keys(tzData)
        .map(function (z) { return z.toUpperCase(); })
        .forEach(function (z) { return zoneNames.add(z); });
    Object.keys(uppercaseLinks).forEach(function (linkName) {
        linkNames.add(linkName.toUpperCase());
        zoneNames.add(uppercaseLinks[linkName].toUpperCase());
    });
    return zoneNames.has(uppercasedTz) || linkNames.has(uppercasedTz);
}

/**
 * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
 * @param str string to convert
 */
function toUpperCase(str) {
    return str.replace(/([a-z])/g, function (_, c) { return c.toUpperCase(); });
}
var NOT_A_Z_REGEX = /[^A-Z]/;
/**
 * https://tc39.es/ecma402/#sec-iswellformedcurrencycode
 */
function IsWellFormedCurrencyCode(currency) {
    currency = toUpperCase(currency);
    if (currency.length !== 3) {
        return false;
    }
    if (NOT_A_Z_REGEX.test(currency)) {
        return false;
    }
    return true;
}

/**
 * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
 * @param str string to convert
 */
function toLowerCase(str) {
    return str.replace(/([A-Z])/g, function (_, c) { return c.toLowerCase(); });
}
/**
 * https://tc39.es/ecma402/#sec-iswellformedunitidentifier
 * @param unit
 */
function IsWellFormedUnitIdentifier(unit) {
    unit = toLowerCase(unit);
    if (IsSanctionedSimpleUnitIdentifier(unit)) {
        return true;
    }
    var units = unit.split('-per-');
    if (units.length !== 2) {
        return false;
    }
    var numerator = units[0], denominator = units[1];
    if (!IsSanctionedSimpleUnitIdentifier(numerator) ||
        !IsSanctionedSimpleUnitIdentifier(denominator)) {
        return false;
    }
    return true;
}

function ApplyUnsignedRoundingMode(x, r1, r2, unsignedRoundingMode) {
    if (x === r1)
        return r1;
    if (unsignedRoundingMode === undefined) {
        throw new Error('unsignedRoundingMode is mandatory');
    }
    if (unsignedRoundingMode === 'zero') {
        return r1;
    }
    if (unsignedRoundingMode === 'infinity') {
        return r2;
    }
    var d1 = x - r1;
    var d2 = r2 - x;
    if (d1 < d2) {
        return r1;
    }
    if (d2 < d1) {
        return r2;
    }
    if (d1 !== d2) {
        throw new Error('Unexpected error');
    }
    if (unsignedRoundingMode === 'half-zero') {
        return r1;
    }
    if (unsignedRoundingMode === 'half-infinity') {
        return r2;
    }
    if (unsignedRoundingMode !== 'half-even') {
        throw new Error("Unexpected value for unsignedRoundingMode: ".concat(unsignedRoundingMode));
    }
    var cardinality = (r1 / (r2 - r1)) % 2;
    if (cardinality === 0) {
        return r1;
    }
    return r2;
}

/**
 * https://tc39.es/ecma402/#sec-collapsenumberrange
 */
function CollapseNumberRange(result) {
    return result;
}

/**
 * Cannot do Math.log(x) / Math.log(10) bc if IEEE floating point issue
 * @param x number
 */
function getMagnitude(x) {
    // Cannot count string length via Number.toString because it may use scientific notation
    // for very small or very large numbers.
    return Math.floor(Math.log(x) * Math.LOG10E);
}
function repeat(s, times) {
    if (typeof s.repeat === 'function') {
        return s.repeat(times);
    }
    var arr = new Array(times);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = s;
    }
    return arr.join('');
}
function setInternalSlot(map, pl, field, value) {
    if (!map.get(pl)) {
        map.set(pl, Object.create(null));
    }
    var slots = map.get(pl);
    slots[field] = value;
}
function setMultiInternalSlots(map, pl, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var k = _a[_i];
        setInternalSlot(map, pl, k, props[k]);
    }
}
function getInternalSlot(map, pl, field) {
    return getMultiInternalSlots(map, pl, field)[field];
}
function getMultiInternalSlots(map, pl) {
    var fields = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        fields[_i - 2] = arguments[_i];
    }
    var slots = map.get(pl);
    if (!slots) {
        throw new TypeError("".concat(pl, " InternalSlot has not been initialized"));
    }
    return fields.reduce(function (all, f) {
        all[f] = slots[f];
        return all;
    }, Object.create(null));
}
function isLiteralPart(patternPart) {
    return patternPart.type === 'literal';
}
/*
  17 ECMAScript Standard Built-in Objects:
    Every built-in Function object, including constructors, that is not
    identified as an anonymous function has a name property whose value
    is a String.

    Unless otherwise specified, the name property of a built-in Function
    object, if it exists, has the attributes { [[Writable]]: false,
    [[Enumerable]]: false, [[Configurable]]: true }.
*/
function defineProperty(target, name, _a) {
    var value = _a.value;
    Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value,
    });
}
var UNICODE_EXTENSION_SEQUENCE_REGEX$1 = /-u(?:-[0-9a-z]{2,8})+/gi;
function invariant$1(condition, message, Err) {
    if (Err === void 0) { Err = Error; }
    if (!condition) {
        throw new Err(message);
    }
}

/**
 * The abstract operation ComputeExponentForMagnitude computes an exponent by which to scale a
 * number of the given magnitude (power of ten of the most significant digit) according to the
 * locale and the desired notation (scientific, engineering, or compact).
 */
function ComputeExponentForMagnitude(numberFormat, magnitude, _a) {
    var getInternalSlots = _a.getInternalSlots;
    var internalSlots = getInternalSlots(numberFormat);
    var notation = internalSlots.notation, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
    switch (notation) {
        case 'standard':
            return 0;
        case 'scientific':
            return magnitude;
        case 'engineering':
            return Math.floor(magnitude / 3) * 3;
        default: {
            // Let exponent be an implementation- and locale-dependent (ILD) integer by which to scale a
            // number of the given magnitude in compact notation for the current locale.
            var compactDisplay = internalSlots.compactDisplay, style = internalSlots.style, currencyDisplay = internalSlots.currencyDisplay;
            var thresholdMap = void 0;
            if (style === 'currency' && currencyDisplay !== 'name') {
                var currency = dataLocaleData.numbers.currency[numberingSystem] ||
                    dataLocaleData.numbers.currency[dataLocaleData.numbers.nu[0]];
                thresholdMap = currency.short;
            }
            else {
                var decimal = dataLocaleData.numbers.decimal[numberingSystem] ||
                    dataLocaleData.numbers.decimal[dataLocaleData.numbers.nu[0]];
                thresholdMap = compactDisplay === 'long' ? decimal.long : decimal.short;
            }
            if (!thresholdMap) {
                return 0;
            }
            var num = String(Math.pow(10, magnitude));
            var thresholds = Object.keys(thresholdMap); // TODO: this can be pre-processed
            if (num < thresholds[0]) {
                return 0;
            }
            if (num > thresholds[thresholds.length - 1]) {
                return thresholds[thresholds.length - 1].length - 1;
            }
            var i = thresholds.indexOf(num);
            if (i === -1) {
                return 0;
            }
            // See https://unicode.org/reports/tr35/tr35-numbers.html#Compact_Number_Formats
            // Special handling if the pattern is precisely `0`.
            var magnitudeKey = thresholds[i];
            // TODO: do we need to handle plural here?
            var compactPattern = thresholdMap[magnitudeKey].other;
            if (compactPattern === '0') {
                return 0;
            }
            // Example: in zh-TW, `10000000` maps to `0000萬`. So we need to return 8 - 4 = 4 here.
            return (magnitudeKey.length -
                thresholdMap[magnitudeKey].other.match(/0+/)[0].length);
        }
    }
}

function ToRawPrecision(x, minPrecision, maxPrecision) {
    var p = maxPrecision;
    var m;
    var e;
    var xFinal;
    if (x === 0) {
        m = repeat('0', p);
        e = 0;
        xFinal = 0;
    }
    else {
        var xToString = x.toString();
        // If xToString is formatted as scientific notation, the number is either very small or very
        // large. If the precision of the formatted string is lower that requested max precision, we
        // should still infer them from the formatted string, otherwise the formatted result might have
        // precision loss (e.g. 1e41 will not have 0 in every trailing digits).
        var xToStringExponentIndex = xToString.indexOf('e');
        var _a = xToString.split('e'), xToStringMantissa = _a[0], xToStringExponent = _a[1];
        var xToStringMantissaWithoutDecimalPoint = xToStringMantissa.replace('.', '');
        if (xToStringExponentIndex >= 0 &&
            xToStringMantissaWithoutDecimalPoint.length <= p) {
            e = +xToStringExponent;
            m =
                xToStringMantissaWithoutDecimalPoint +
                    repeat('0', p - xToStringMantissaWithoutDecimalPoint.length);
            xFinal = x;
        }
        else {
            e = getMagnitude(x);
            var decimalPlaceOffset = e - p + 1;
            // n is the integer containing the required precision digits. To derive the formatted string,
            // we will adjust its decimal place in the logic below.
            var n = Math.round(adjustDecimalPlace(x, decimalPlaceOffset));
            // The rounding caused the change of magnitude, so we should increment `e` by 1.
            if (adjustDecimalPlace(n, p - 1) >= 10) {
                e = e + 1;
                // Divide n by 10 to swallow one precision.
                n = Math.floor(n / 10);
            }
            m = n.toString();
            // Equivalent of n * 10 ** (e - p + 1)
            xFinal = adjustDecimalPlace(n, p - 1 - e);
        }
    }
    var int;
    if (e >= p - 1) {
        m = m + repeat('0', e - p + 1);
        int = e + 1;
    }
    else if (e >= 0) {
        m = "".concat(m.slice(0, e + 1), ".").concat(m.slice(e + 1));
        int = e + 1;
    }
    else {
        m = "0.".concat(repeat('0', -e - 1)).concat(m);
        int = 1;
    }
    if (m.indexOf('.') >= 0 && maxPrecision > minPrecision) {
        var cut = maxPrecision - minPrecision;
        while (cut > 0 && m[m.length - 1] === '0') {
            m = m.slice(0, -1);
            cut--;
        }
        if (m[m.length - 1] === '.') {
            m = m.slice(0, -1);
        }
    }
    return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
    // x / (10 ** magnitude), but try to preserve as much floating point precision as possible.
    function adjustDecimalPlace(x, magnitude) {
        return magnitude < 0 ? x * Math.pow(10, -magnitude) : x / Math.pow(10, magnitude);
    }
}

/**
 * TODO: dedup with intl-pluralrules and support BigInt
 * https://tc39.es/ecma402/#sec-torawfixed
 * @param x a finite non-negative Number or BigInt
 * @param minFraction and integer between 0 and 20
 * @param maxFraction and integer between 0 and 20
 */
function ToRawFixed(x, minFraction, maxFraction) {
    var f = maxFraction;
    var n = Math.round(x * Math.pow(10, f));
    var xFinal = n / Math.pow(10, f);
    // n is a positive integer, but it is possible to be greater than 1e21.
    // In such case we will go the slow path.
    // See also: https://tc39.es/ecma262/#sec-numeric-types-number-tostring
    var m;
    if (n < 1e21) {
        m = n.toString();
    }
    else {
        m = n.toString();
        var _a = m.split('e'), mantissa = _a[0], exponent = _a[1];
        m = mantissa.replace('.', '');
        m = m + repeat('0', Math.max(+exponent - m.length + 1, 0));
    }
    var int;
    if (f !== 0) {
        var k = m.length;
        if (k <= f) {
            var z = repeat('0', f + 1 - k);
            m = z + m;
            k = f + 1;
        }
        var a = m.slice(0, k - f);
        var b = m.slice(k - f);
        m = "".concat(a, ".").concat(b);
        int = a.length;
    }
    else {
        int = m.length;
    }
    var cut = maxFraction - minFraction;
    while (cut > 0 && m[m.length - 1] === '0') {
        m = m.slice(0, -1);
        cut--;
    }
    if (m[m.length - 1] === '.') {
        m = m.slice(0, -1);
    }
    return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
}

/**
 * https://tc39.es/ecma402/#sec-formatnumberstring
 */
function FormatNumericToString(intlObject, x) {
    var isNegative = x < 0 || SameValue(x, -0);
    if (isNegative) {
        x = -x;
    }
    var result;
    var rourndingType = intlObject.roundingType;
    switch (rourndingType) {
        case 'significantDigits':
            result = ToRawPrecision(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits);
            break;
        case 'fractionDigits':
            result = ToRawFixed(x, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits);
            break;
        default:
            result = ToRawPrecision(x, 1, 2);
            if (result.integerDigitsCount > 1) {
                result = ToRawFixed(x, 0, 0);
            }
            break;
    }
    x = result.roundedNumber;
    var string = result.formattedString;
    var int = result.integerDigitsCount;
    var minInteger = intlObject.minimumIntegerDigits;
    if (int < minInteger) {
        var forwardZeros = repeat('0', minInteger - int);
        string = forwardZeros + string;
    }
    if (isNegative) {
        x = -x;
    }
    return { roundedNumber: x, formattedString: string };
}

/**
 * The abstract operation ComputeExponent computes an exponent (power of ten) by which to scale x
 * according to the number formatting settings. It handles cases such as 999 rounding up to 1000,
 * requiring a different exponent.
 *
 * NOT IN SPEC: it returns [exponent, magnitude].
 */
function ComputeExponent(numberFormat, x, _a) {
    var getInternalSlots = _a.getInternalSlots;
    if (x === 0) {
        return [0, 0];
    }
    if (x < 0) {
        x = -x;
    }
    var magnitude = getMagnitude(x);
    var exponent = ComputeExponentForMagnitude(numberFormat, magnitude, {
        getInternalSlots: getInternalSlots,
    });
    // Preserve more precision by doing multiplication when exponent is negative.
    x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
    var formatNumberResult = FormatNumericToString(getInternalSlots(numberFormat), x);
    if (formatNumberResult.roundedNumber === 0) {
        return [exponent, magnitude];
    }
    var newMagnitude = getMagnitude(formatNumberResult.roundedNumber);
    if (newMagnitude === magnitude - exponent) {
        return [exponent, magnitude];
    }
    return [
        ComputeExponentForMagnitude(numberFormat, magnitude + 1, {
            getInternalSlots: getInternalSlots,
        }),
        magnitude + 1,
    ];
}

/**
 * https://tc39.es/ecma402/#sec-currencydigits
 */
function CurrencyDigits(c, _a) {
    var currencyDigitsData = _a.currencyDigitsData;
    return HasOwnProperty(currencyDigitsData, c)
        ? currencyDigitsData[c]
        : 2;
}

/**
 * https://tc39.es/ecma402/#sec-formatapproximately
 */
function FormatApproximately(numberFormat, result, _a) {
    var getInternalSlots = _a.getInternalSlots;
    var internalSlots = getInternalSlots(numberFormat);
    var symbols = internalSlots.dataLocaleData.numbers.symbols[internalSlots.numberingSystem];
    var approximatelySign = symbols.approximatelySign;
    result.push({ type: 'approximatelySign', value: approximatelySign });
    return result;
}

var digitMapping = {
    "adlm": [
        "𞥐",
        "𞥑",
        "𞥒",
        "𞥓",
        "𞥔",
        "𞥕",
        "𞥖",
        "𞥗",
        "𞥘",
        "𞥙"
    ],
    "ahom": [
        "𑜰",
        "𑜱",
        "𑜲",
        "𑜳",
        "𑜴",
        "𑜵",
        "𑜶",
        "𑜷",
        "𑜸",
        "𑜹"
    ],
    "arab": [
        "٠",
        "١",
        "٢",
        "٣",
        "٤",
        "٥",
        "٦",
        "٧",
        "٨",
        "٩"
    ],
    "arabext": [
        "۰",
        "۱",
        "۲",
        "۳",
        "۴",
        "۵",
        "۶",
        "۷",
        "۸",
        "۹"
    ],
    "bali": [
        "᭐",
        "᭑",
        "᭒",
        "᭓",
        "᭔",
        "᭕",
        "᭖",
        "᭗",
        "᭘",
        "᭙"
    ],
    "beng": [
        "০",
        "১",
        "২",
        "৩",
        "৪",
        "৫",
        "৬",
        "৭",
        "৮",
        "৯"
    ],
    "bhks": [
        "𑱐",
        "𑱑",
        "𑱒",
        "𑱓",
        "𑱔",
        "𑱕",
        "𑱖",
        "𑱗",
        "𑱘",
        "𑱙"
    ],
    "brah": [
        "𑁦",
        "𑁧",
        "𑁨",
        "𑁩",
        "𑁪",
        "𑁫",
        "𑁬",
        "𑁭",
        "𑁮",
        "𑁯"
    ],
    "cakm": [
        "𑄶",
        "𑄷",
        "𑄸",
        "𑄹",
        "𑄺",
        "𑄻",
        "𑄼",
        "𑄽",
        "𑄾",
        "𑄿"
    ],
    "cham": [
        "꩐",
        "꩑",
        "꩒",
        "꩓",
        "꩔",
        "꩕",
        "꩖",
        "꩗",
        "꩘",
        "꩙"
    ],
    "deva": [
        "०",
        "१",
        "२",
        "३",
        "४",
        "५",
        "६",
        "७",
        "८",
        "९"
    ],
    "diak": [
        "𑥐",
        "𑥑",
        "𑥒",
        "𑥓",
        "𑥔",
        "𑥕",
        "𑥖",
        "𑥗",
        "𑥘",
        "𑥙"
    ],
    "fullwide": [
        "０",
        "１",
        "２",
        "３",
        "４",
        "５",
        "６",
        "７",
        "８",
        "９"
    ],
    "gong": [
        "𑶠",
        "𑶡",
        "𑶢",
        "𑶣",
        "𑶤",
        "𑶥",
        "𑶦",
        "𑶧",
        "𑶨",
        "𑶩"
    ],
    "gonm": [
        "𑵐",
        "𑵑",
        "𑵒",
        "𑵓",
        "𑵔",
        "𑵕",
        "𑵖",
        "𑵗",
        "𑵘",
        "𑵙"
    ],
    "gujr": [
        "૦",
        "૧",
        "૨",
        "૩",
        "૪",
        "૫",
        "૬",
        "૭",
        "૮",
        "૯"
    ],
    "guru": [
        "੦",
        "੧",
        "੨",
        "੩",
        "੪",
        "੫",
        "੬",
        "੭",
        "੮",
        "੯"
    ],
    "hanidec": [
        "〇",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
    ],
    "hmng": [
        "𖭐",
        "𖭑",
        "𖭒",
        "𖭓",
        "𖭔",
        "𖭕",
        "𖭖",
        "𖭗",
        "𖭘",
        "𖭙"
    ],
    "hmnp": [
        "𞅀",
        "𞅁",
        "𞅂",
        "𞅃",
        "𞅄",
        "𞅅",
        "𞅆",
        "𞅇",
        "𞅈",
        "𞅉"
    ],
    "java": [
        "꧐",
        "꧑",
        "꧒",
        "꧓",
        "꧔",
        "꧕",
        "꧖",
        "꧗",
        "꧘",
        "꧙"
    ],
    "kali": [
        "꤀",
        "꤁",
        "꤂",
        "꤃",
        "꤄",
        "꤅",
        "꤆",
        "꤇",
        "꤈",
        "꤉"
    ],
    "khmr": [
        "០",
        "១",
        "២",
        "៣",
        "៤",
        "៥",
        "៦",
        "៧",
        "៨",
        "៩"
    ],
    "knda": [
        "೦",
        "೧",
        "೨",
        "೩",
        "೪",
        "೫",
        "೬",
        "೭",
        "೮",
        "೯"
    ],
    "lana": [
        "᪀",
        "᪁",
        "᪂",
        "᪃",
        "᪄",
        "᪅",
        "᪆",
        "᪇",
        "᪈",
        "᪉"
    ],
    "lanatham": [
        "᪐",
        "᪑",
        "᪒",
        "᪓",
        "᪔",
        "᪕",
        "᪖",
        "᪗",
        "᪘",
        "᪙"
    ],
    "laoo": [
        "໐",
        "໑",
        "໒",
        "໓",
        "໔",
        "໕",
        "໖",
        "໗",
        "໘",
        "໙"
    ],
    "lepc": [
        "᪐",
        "᪑",
        "᪒",
        "᪓",
        "᪔",
        "᪕",
        "᪖",
        "᪗",
        "᪘",
        "᪙"
    ],
    "limb": [
        "᥆",
        "᥇",
        "᥈",
        "᥉",
        "᥊",
        "᥋",
        "᥌",
        "᥍",
        "᥎",
        "᥏"
    ],
    "mathbold": [
        "𝟎",
        "𝟏",
        "𝟐",
        "𝟑",
        "𝟒",
        "𝟓",
        "𝟔",
        "𝟕",
        "𝟖",
        "𝟗"
    ],
    "mathdbl": [
        "𝟘",
        "𝟙",
        "𝟚",
        "𝟛",
        "𝟜",
        "𝟝",
        "𝟞",
        "𝟟",
        "𝟠",
        "𝟡"
    ],
    "mathmono": [
        "𝟶",
        "𝟷",
        "𝟸",
        "𝟹",
        "𝟺",
        "𝟻",
        "𝟼",
        "𝟽",
        "𝟾",
        "𝟿"
    ],
    "mathsanb": [
        "𝟬",
        "𝟭",
        "𝟮",
        "𝟯",
        "𝟰",
        "𝟱",
        "𝟲",
        "𝟳",
        "𝟴",
        "𝟵"
    ],
    "mathsans": [
        "𝟢",
        "𝟣",
        "𝟤",
        "𝟥",
        "𝟦",
        "𝟧",
        "𝟨",
        "𝟩",
        "𝟪",
        "𝟫"
    ],
    "mlym": [
        "൦",
        "൧",
        "൨",
        "൩",
        "൪",
        "൫",
        "൬",
        "൭",
        "൮",
        "൯"
    ],
    "modi": [
        "𑙐",
        "𑙑",
        "𑙒",
        "𑙓",
        "𑙔",
        "𑙕",
        "𑙖",
        "𑙗",
        "𑙘",
        "𑙙"
    ],
    "mong": [
        "᠐",
        "᠑",
        "᠒",
        "᠓",
        "᠔",
        "᠕",
        "᠖",
        "᠗",
        "᠘",
        "᠙"
    ],
    "mroo": [
        "𖩠",
        "𖩡",
        "𖩢",
        "𖩣",
        "𖩤",
        "𖩥",
        "𖩦",
        "𖩧",
        "𖩨",
        "𖩩"
    ],
    "mtei": [
        "꯰",
        "꯱",
        "꯲",
        "꯳",
        "꯴",
        "꯵",
        "꯶",
        "꯷",
        "꯸",
        "꯹"
    ],
    "mymr": [
        "၀",
        "၁",
        "၂",
        "၃",
        "၄",
        "၅",
        "၆",
        "၇",
        "၈",
        "၉"
    ],
    "mymrshan": [
        "႐",
        "႑",
        "႒",
        "႓",
        "႔",
        "႕",
        "႖",
        "႗",
        "႘",
        "႙"
    ],
    "mymrtlng": [
        "꧰",
        "꧱",
        "꧲",
        "꧳",
        "꧴",
        "꧵",
        "꧶",
        "꧷",
        "꧸",
        "꧹"
    ],
    "newa": [
        "𑑐",
        "𑑑",
        "𑑒",
        "𑑓",
        "𑑔",
        "𑑕",
        "𑑖",
        "𑑗",
        "𑑘",
        "𑑙"
    ],
    "nkoo": [
        "߀",
        "߁",
        "߂",
        "߃",
        "߄",
        "߅",
        "߆",
        "߇",
        "߈",
        "߉"
    ],
    "olck": [
        "᱐",
        "᱑",
        "᱒",
        "᱓",
        "᱔",
        "᱕",
        "᱖",
        "᱗",
        "᱘",
        "᱙"
    ],
    "orya": [
        "୦",
        "୧",
        "୨",
        "୩",
        "୪",
        "୫",
        "୬",
        "୭",
        "୮",
        "୯"
    ],
    "osma": [
        "𐒠",
        "𐒡",
        "𐒢",
        "𐒣",
        "𐒤",
        "𐒥",
        "𐒦",
        "𐒧",
        "𐒨",
        "𐒩"
    ],
    "rohg": [
        "𐴰",
        "𐴱",
        "𐴲",
        "𐴳",
        "𐴴",
        "𐴵",
        "𐴶",
        "𐴷",
        "𐴸",
        "𐴹"
    ],
    "saur": [
        "꣐",
        "꣑",
        "꣒",
        "꣓",
        "꣔",
        "꣕",
        "꣖",
        "꣗",
        "꣘",
        "꣙"
    ],
    "segment": [
        "🯰",
        "🯱",
        "🯲",
        "🯳",
        "🯴",
        "🯵",
        "🯶",
        "🯷",
        "🯸",
        "🯹"
    ],
    "shrd": [
        "𑇐",
        "𑇑",
        "𑇒",
        "𑇓",
        "𑇔",
        "𑇕",
        "𑇖",
        "𑇗",
        "𑇘",
        "𑇙"
    ],
    "sind": [
        "𑋰",
        "𑋱",
        "𑋲",
        "𑋳",
        "𑋴",
        "𑋵",
        "𑋶",
        "𑋷",
        "𑋸",
        "𑋹"
    ],
    "sinh": [
        "෦",
        "෧",
        "෨",
        "෩",
        "෪",
        "෫",
        "෬",
        "෭",
        "෮",
        "෯"
    ],
    "sora": [
        "𑃰",
        "𑃱",
        "𑃲",
        "𑃳",
        "𑃴",
        "𑃵",
        "𑃶",
        "𑃷",
        "𑃸",
        "𑃹"
    ],
    "sund": [
        "᮰",
        "᮱",
        "᮲",
        "᮳",
        "᮴",
        "᮵",
        "᮶",
        "᮷",
        "᮸",
        "᮹"
    ],
    "takr": [
        "𑛀",
        "𑛁",
        "𑛂",
        "𑛃",
        "𑛄",
        "𑛅",
        "𑛆",
        "𑛇",
        "𑛈",
        "𑛉"
    ],
    "talu": [
        "᧐",
        "᧑",
        "᧒",
        "᧓",
        "᧔",
        "᧕",
        "᧖",
        "᧗",
        "᧘",
        "᧙"
    ],
    "tamldec": [
        "௦",
        "௧",
        "௨",
        "௩",
        "௪",
        "௫",
        "௬",
        "௭",
        "௮",
        "௯"
    ],
    "telu": [
        "౦",
        "౧",
        "౨",
        "౩",
        "౪",
        "౫",
        "౬",
        "౭",
        "౮",
        "౯"
    ],
    "thai": [
        "๐",
        "๑",
        "๒",
        "๓",
        "๔",
        "๕",
        "๖",
        "๗",
        "๘",
        "๙"
    ],
    "tibt": [
        "༠",
        "༡",
        "༢",
        "༣",
        "༤",
        "༥",
        "༦",
        "༧",
        "༨",
        "༩"
    ],
    "tirh": [
        "𑓐",
        "𑓑",
        "𑓒",
        "𑓓",
        "𑓔",
        "𑓕",
        "𑓖",
        "𑓗",
        "𑓘",
        "𑓙"
    ],
    "vaii": [
        "ᘠ",
        "ᘡ",
        "ᘢ",
        "ᘣ",
        "ᘤ",
        "ᘥ",
        "ᘦ",
        "ᘧ",
        "ᘨ",
        "ᘩ"
    ],
    "wara": [
        "𑣠",
        "𑣡",
        "𑣢",
        "𑣣",
        "𑣤",
        "𑣥",
        "𑣦",
        "𑣧",
        "𑣨",
        "𑣩"
    ],
    "wcho": [
        "𞋰",
        "𞋱",
        "𞋲",
        "𞋳",
        "𞋴",
        "𞋵",
        "𞋶",
        "𞋷",
        "𞋸",
        "𞋹"
    ]
};

// @generated from regex-gen.ts
var S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;

// This is from: unicode-12.1.0/General_Category/Symbol/regex.js
// IE11 does not support unicode flag, otherwise this is just /\p{S}/u.
// /^\p{S}/u
var CARET_S_UNICODE_REGEX = new RegExp("^".concat(S_UNICODE_REGEX.source));
// /\p{S}$/u
var S_DOLLAR_UNICODE_REGEX = new RegExp("".concat(S_UNICODE_REGEX.source, "$"));
var CLDR_NUMBER_PATTERN = /[#0](?:[\.,][#0]+)*/g;
function formatToParts$1(numberResult, data, pl, options) {
    var sign = numberResult.sign, exponent = numberResult.exponent, magnitude = numberResult.magnitude;
    var notation = options.notation, style = options.style, numberingSystem = options.numberingSystem;
    var defaultNumberingSystem = data.numbers.nu[0];
    // #region Part 1: partition and interpolate the CLDR number pattern.
    // ----------------------------------------------------------
    var compactNumberPattern = null;
    if (notation === 'compact' && magnitude) {
        compactNumberPattern = getCompactDisplayPattern(numberResult, pl, data, style, options.compactDisplay, options.currencyDisplay, numberingSystem);
    }
    // This is used multiple times
    var nonNameCurrencyPart;
    if (style === 'currency' && options.currencyDisplay !== 'name') {
        var byCurrencyDisplay = data.currencies[options.currency];
        if (byCurrencyDisplay) {
            switch (options.currencyDisplay) {
                case 'code':
                    nonNameCurrencyPart = options.currency;
                    break;
                case 'symbol':
                    nonNameCurrencyPart = byCurrencyDisplay.symbol;
                    break;
                default:
                    nonNameCurrencyPart = byCurrencyDisplay.narrow;
                    break;
            }
        }
        else {
            // Fallback for unknown currency
            nonNameCurrencyPart = options.currency;
        }
    }
    var numberPattern;
    if (!compactNumberPattern) {
        // Note: if the style is unit, or is currency and the currency display is name,
        // its unit parts will be interpolated in part 2. So here we can fallback to decimal.
        if (style === 'decimal' ||
            style === 'unit' ||
            (style === 'currency' && options.currencyDisplay === 'name')) {
            // Shortcut for decimal
            var decimalData = data.numbers.decimal[numberingSystem] ||
                data.numbers.decimal[defaultNumberingSystem];
            numberPattern = getPatternForSign(decimalData.standard, sign);
        }
        else if (style === 'currency') {
            var currencyData = data.numbers.currency[numberingSystem] ||
                data.numbers.currency[defaultNumberingSystem];
            // We replace number pattern part with `0` for easier postprocessing.
            numberPattern = getPatternForSign(currencyData[options.currencySign], sign);
        }
        else {
            // percent
            var percentPattern = data.numbers.percent[numberingSystem] ||
                data.numbers.percent[defaultNumberingSystem];
            numberPattern = getPatternForSign(percentPattern, sign);
        }
    }
    else {
        numberPattern = compactNumberPattern;
    }
    // Extract the decimal number pattern string. It looks like "#,##0,00", which will later be
    // used to infer decimal group sizes.
    var decimalNumberPattern = CLDR_NUMBER_PATTERN.exec(numberPattern)[0];
    // Now we start to substitute patterns
    // 1. replace strings like `0` and `#,##0.00` with `{0}`
    // 2. unquote characters (invariant: the quoted characters does not contain the special tokens)
    numberPattern = numberPattern
        .replace(CLDR_NUMBER_PATTERN, '{0}')
        .replace(/'(.)'/g, '$1');
    // Handle currency spacing (both compact and non-compact).
    if (style === 'currency' && options.currencyDisplay !== 'name') {
        var currencyData = data.numbers.currency[numberingSystem] ||
            data.numbers.currency[defaultNumberingSystem];
        // See `currencySpacing` substitution rule in TR-35.
        // Here we always assume the currencyMatch is "[:^S:]" and surroundingMatch is "[:digit:]".
        //
        // Example 1: for pattern "#,##0.00¤" with symbol "US$", we replace "¤" with the symbol,
        // but insert an extra non-break space before the symbol, because "[:^S:]" matches "U" in
        // "US$" and "[:digit:]" matches the latn numbering system digits.
        //
        // Example 2: for pattern "¤#,##0.00" with symbol "US$", there is no spacing between symbol
        // and number, because `$` does not match "[:^S:]".
        //
        // Implementation note: here we do the best effort to infer the insertion.
        // We also assume that `beforeInsertBetween` and `afterInsertBetween` will never be `;`.
        var afterCurrency = currencyData.currencySpacing.afterInsertBetween;
        if (afterCurrency && !S_DOLLAR_UNICODE_REGEX.test(nonNameCurrencyPart)) {
            numberPattern = numberPattern.replace('¤{0}', "\u00A4".concat(afterCurrency, "{0}"));
        }
        var beforeCurrency = currencyData.currencySpacing.beforeInsertBetween;
        if (beforeCurrency && !CARET_S_UNICODE_REGEX.test(nonNameCurrencyPart)) {
            numberPattern = numberPattern.replace('{0}¤', "{0}".concat(beforeCurrency, "\u00A4"));
        }
    }
    // The following tokens are special: `{0}`, `¤`, `%`, `-`, `+`, `{c:...}.
    var numberPatternParts = numberPattern.split(/({c:[^}]+}|\{0\}|[¤%\-\+])/g);
    var numberParts = [];
    var symbols = data.numbers.symbols[numberingSystem] ||
        data.numbers.symbols[defaultNumberingSystem];
    for (var _i = 0, numberPatternParts_1 = numberPatternParts; _i < numberPatternParts_1.length; _i++) {
        var part = numberPatternParts_1[_i];
        if (!part) {
            continue;
        }
        switch (part) {
            case '{0}': {
                // We only need to handle scientific and engineering notation here.
                numberParts.push.apply(numberParts, paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, 
                // If compact number pattern exists, do not insert group separators.
                !compactNumberPattern && Boolean(options.useGrouping), decimalNumberPattern));
                break;
            }
            case '-':
                numberParts.push({ type: 'minusSign', value: symbols.minusSign });
                break;
            case '+':
                numberParts.push({ type: 'plusSign', value: symbols.plusSign });
                break;
            case '%':
                numberParts.push({ type: 'percentSign', value: symbols.percentSign });
                break;
            case '¤':
                // Computed above when handling currency spacing.
                numberParts.push({ type: 'currency', value: nonNameCurrencyPart });
                break;
            default:
                if (/^\{c:/.test(part)) {
                    numberParts.push({
                        type: 'compact',
                        value: part.substring(3, part.length - 1),
                    });
                }
                else {
                    // literal
                    numberParts.push({ type: 'literal', value: part });
                }
                break;
        }
    }
    // #endregion
    // #region Part 2: interpolate unit pattern if necessary.
    // ----------------------------------------------
    switch (style) {
        case 'currency': {
            // `currencyDisplay: 'name'` has similar pattern handling as units.
            if (options.currencyDisplay === 'name') {
                var unitPattern = (data.numbers.currency[numberingSystem] ||
                    data.numbers.currency[defaultNumberingSystem]).unitPattern;
                // Select plural
                var unitName = void 0;
                var currencyNameData = data.currencies[options.currency];
                if (currencyNameData) {
                    unitName = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), currencyNameData.displayName);
                }
                else {
                    // Fallback for unknown currency
                    unitName = options.currency;
                }
                // Do {0} and {1} substitution
                var unitPatternParts = unitPattern.split(/(\{[01]\})/g);
                var result = [];
                for (var _a = 0, unitPatternParts_1 = unitPatternParts; _a < unitPatternParts_1.length; _a++) {
                    var part = unitPatternParts_1[_a];
                    switch (part) {
                        case '{0}':
                            result.push.apply(result, numberParts);
                            break;
                        case '{1}':
                            result.push({ type: 'currency', value: unitName });
                            break;
                        default:
                            if (part) {
                                result.push({ type: 'literal', value: part });
                            }
                            break;
                    }
                }
                return result;
            }
            else {
                return numberParts;
            }
        }
        case 'unit': {
            var unit = options.unit, unitDisplay = options.unitDisplay;
            var unitData = data.units.simple[unit];
            var unitPattern = void 0;
            if (unitData) {
                // Simple unit pattern
                unitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[unit][unitDisplay]);
            }
            else {
                // See: http://unicode.org/reports/tr35/tr35-general.html#perUnitPatterns
                // If cannot find unit in the simple pattern, it must be "per" compound pattern.
                // Implementation note: we are not following TR-35 here because we need to format to parts!
                var _b = unit.split('-per-'), numeratorUnit = _b[0], denominatorUnit = _b[1];
                unitData = data.units.simple[numeratorUnit];
                var numeratorUnitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[numeratorUnit][unitDisplay]);
                var perUnitPattern = data.units.simple[denominatorUnit].perUnit[unitDisplay];
                if (perUnitPattern) {
                    // perUnitPattern exists, combine it with numeratorUnitPattern
                    unitPattern = perUnitPattern.replace('{0}', numeratorUnitPattern);
                }
                else {
                    // get compoundUnit pattern (e.g. "{0} per {1}"), repalce {0} with numerator pattern and {1} with
                    // the denominator pattern in singular form.
                    var perPattern = data.units.compound.per[unitDisplay];
                    var denominatorPattern = selectPlural(pl, 1, data.units.simple[denominatorUnit][unitDisplay]);
                    unitPattern = unitPattern = perPattern
                        .replace('{0}', numeratorUnitPattern)
                        .replace('{1}', denominatorPattern.replace('{0}', ''));
                }
            }
            var result = [];
            // We need spacing around "{0}" because they are not treated as "unit" parts, but "literal".
            for (var _c = 0, _d = unitPattern.split(/(\s*\{0\}\s*)/); _c < _d.length; _c++) {
                var part = _d[_c];
                var interpolateMatch = /^(\s*)\{0\}(\s*)$/.exec(part);
                if (interpolateMatch) {
                    // Space before "{0}"
                    if (interpolateMatch[1]) {
                        result.push({ type: 'literal', value: interpolateMatch[1] });
                    }
                    // "{0}" itself
                    result.push.apply(result, numberParts);
                    // Space after "{0}"
                    if (interpolateMatch[2]) {
                        result.push({ type: 'literal', value: interpolateMatch[2] });
                    }
                }
                else if (part) {
                    result.push({ type: 'unit', value: part });
                }
            }
            return result;
        }
        default:
            return numberParts;
    }
    // #endregion
}
// A subset of https://tc39.es/ecma402/#sec-partitionnotationsubpattern
// Plus the exponent parts handling.
function paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, useGrouping, 
/**
 * This is the decimal number pattern without signs or symbols.
 * It is used to infer the group size when `useGrouping` is true.
 *
 * A typical value looks like "#,##0.00" (primary group size is 3).
 * Some locales like Hindi has secondary group size of 2 (e.g. "#,##,##0.00").
 */
decimalNumberPattern) {
    var result = [];
    // eslint-disable-next-line prefer-const
    var n = numberResult.formattedString, x = numberResult.roundedNumber;
    if (isNaN(x)) {
        return [{ type: 'nan', value: n }];
    }
    else if (!isFinite(x)) {
        return [{ type: 'infinity', value: n }];
    }
    var digitReplacementTable = digitMapping[numberingSystem];
    if (digitReplacementTable) {
        n = n.replace(/\d/g, function (digit) { return digitReplacementTable[+digit] || digit; });
    }
    // TODO: Else use an implementation dependent algorithm to map n to the appropriate
    // representation of n in the given numbering system.
    var decimalSepIndex = n.indexOf('.');
    var integer;
    var fraction;
    if (decimalSepIndex > 0) {
        integer = n.slice(0, decimalSepIndex);
        fraction = n.slice(decimalSepIndex + 1);
    }
    else {
        integer = n;
    }
    // #region Grouping integer digits
    // The weird compact and x >= 10000 check is to ensure consistency with Node.js and Chrome.
    // Note that `de` does not have compact form for thousands, but Node.js does not insert grouping separator
    // unless the rounded number is greater than 10000:
    //   NumberFormat('de', {notation: 'compact', compactDisplay: 'short'}).format(1234) //=> "1234"
    //   NumberFormat('de').format(1234) //=> "1.234"
    if (useGrouping && (notation !== 'compact' || x >= 10000)) {
        var groupSepSymbol = symbols.group;
        var groups = [];
        // > There may be two different grouping sizes: The primary grouping size used for the least
        // > significant integer group, and the secondary grouping size used for more significant groups.
        // > If a pattern contains multiple grouping separators, the interval between the last one and the
        // > end of the integer defines the primary grouping size, and the interval between the last two
        // > defines the secondary grouping size. All others are ignored.
        var integerNumberPattern = decimalNumberPattern.split('.')[0];
        var patternGroups = integerNumberPattern.split(',');
        var primaryGroupingSize = 3;
        var secondaryGroupingSize = 3;
        if (patternGroups.length > 1) {
            primaryGroupingSize = patternGroups[patternGroups.length - 1].length;
        }
        if (patternGroups.length > 2) {
            secondaryGroupingSize = patternGroups[patternGroups.length - 2].length;
        }
        var i = integer.length - primaryGroupingSize;
        if (i > 0) {
            // Slice the least significant integer group
            groups.push(integer.slice(i, i + primaryGroupingSize));
            // Then iteratively push the more signicant groups
            // TODO: handle surrogate pairs in some numbering system digits
            for (i -= secondaryGroupingSize; i > 0; i -= secondaryGroupingSize) {
                groups.push(integer.slice(i, i + secondaryGroupingSize));
            }
            groups.push(integer.slice(0, i + secondaryGroupingSize));
        }
        else {
            groups.push(integer);
        }
        while (groups.length > 0) {
            var integerGroup = groups.pop();
            result.push({ type: 'integer', value: integerGroup });
            if (groups.length > 0) {
                result.push({ type: 'group', value: groupSepSymbol });
            }
        }
    }
    else {
        result.push({ type: 'integer', value: integer });
    }
    // #endregion
    if (fraction !== undefined) {
        result.push({ type: 'decimal', value: symbols.decimal }, { type: 'fraction', value: fraction });
    }
    if ((notation === 'scientific' || notation === 'engineering') &&
        isFinite(x)) {
        result.push({ type: 'exponentSeparator', value: symbols.exponential });
        if (exponent < 0) {
            result.push({ type: 'exponentMinusSign', value: symbols.minusSign });
            exponent = -exponent;
        }
        var exponentResult = ToRawFixed(exponent, 0, 0);
        result.push({
            type: 'exponentInteger',
            value: exponentResult.formattedString,
        });
    }
    return result;
}
function getPatternForSign(pattern, sign) {
    if (pattern.indexOf(';') < 0) {
        pattern = "".concat(pattern, ";-").concat(pattern);
    }
    var _a = pattern.split(';'), zeroPattern = _a[0], negativePattern = _a[1];
    switch (sign) {
        case 0:
            return zeroPattern;
        case -1:
            return negativePattern;
        default:
            return negativePattern.indexOf('-') >= 0
                ? negativePattern.replace(/-/g, '+')
                : "+".concat(zeroPattern);
    }
}
// Find the CLDR pattern for compact notation based on the magnitude of data and style.
//
// Example return value: "¤ {c:laki}000;¤{c:laki} -0" (`sw` locale):
// - Notice the `{c:...}` token that wraps the compact literal.
// - The consecutive zeros are normalized to single zero to match CLDR_NUMBER_PATTERN.
//
// Returning null means the compact display pattern cannot be found.
function getCompactDisplayPattern(numberResult, pl, data, style, compactDisplay, currencyDisplay, numberingSystem) {
    var _a;
    var roundedNumber = numberResult.roundedNumber, sign = numberResult.sign, magnitude = numberResult.magnitude;
    var magnitudeKey = String(Math.pow(10, magnitude));
    var defaultNumberingSystem = data.numbers.nu[0];
    var pattern;
    if (style === 'currency' && currencyDisplay !== 'name') {
        var byNumberingSystem = data.numbers.currency;
        var currencyData = byNumberingSystem[numberingSystem] ||
            byNumberingSystem[defaultNumberingSystem];
        // NOTE: compact notation ignores currencySign!
        var compactPluralRules = (_a = currencyData.short) === null || _a === void 0 ? void 0 : _a[magnitudeKey];
        if (!compactPluralRules) {
            return null;
        }
        pattern = selectPlural(pl, roundedNumber, compactPluralRules);
    }
    else {
        var byNumberingSystem = data.numbers.decimal;
        var byCompactDisplay = byNumberingSystem[numberingSystem] ||
            byNumberingSystem[defaultNumberingSystem];
        var compactPlaralRule = byCompactDisplay[compactDisplay][magnitudeKey];
        if (!compactPlaralRule) {
            return null;
        }
        pattern = selectPlural(pl, roundedNumber, compactPlaralRule);
    }
    // See https://unicode.org/reports/tr35/tr35-numbers.html#Compact_Number_Formats
    // > If the value is precisely “0”, either explicit or defaulted, then the normal number format
    // > pattern for that sort of object is supplied.
    if (pattern === '0') {
        return null;
    }
    pattern = getPatternForSign(pattern, sign)
        // Extract compact literal from the pattern
        .replace(/([^\s;\-\+\d¤]+)/g, '{c:$1}')
        // We replace one or more zeros with a single zero so it matches `CLDR_NUMBER_PATTERN`.
        .replace(/0+/, '0');
    return pattern;
}
function selectPlural(pl, x, rules) {
    return rules[pl.select(x)] || rules.other;
}

/**
 * https://tc39.es/ecma402/#sec-formatnumberstring
 */
function PartitionNumberPattern(numberFormat, x, _a) {
    var _b;
    var getInternalSlots = _a.getInternalSlots;
    var internalSlots = getInternalSlots(numberFormat);
    var pl = internalSlots.pl, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
    var symbols = dataLocaleData.numbers.symbols[numberingSystem] ||
        dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
    var magnitude = 0;
    var exponent = 0;
    var n;
    if (isNaN(x)) {
        n = symbols.nan;
    }
    else if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY) {
        n = symbols.infinity;
    }
    else {
        if (!SameValue(x, -0)) {
            if (!isFinite(x)) {
                throw new Error('Input must be a mathematical value');
            }
            if (internalSlots.style == 'percent') {
                x *= 100;
            }
            ;
            _b = ComputeExponent(numberFormat, x, {
                getInternalSlots: getInternalSlots,
            }), exponent = _b[0], magnitude = _b[1];
            // Preserve more precision by doing multiplication when exponent is negative.
            x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
        }
        var formatNumberResult = FormatNumericToString(internalSlots, x);
        n = formatNumberResult.formattedString;
        x = formatNumberResult.roundedNumber;
    }
    // Based on https://tc39.es/ecma402/#sec-getnumberformatpattern
    // We need to do this before `x` is rounded.
    var sign;
    var signDisplay = internalSlots.signDisplay;
    switch (signDisplay) {
        case 'never':
            sign = 0;
            break;
        case 'auto':
            if (SameValue(x, 0) || x > 0 || isNaN(x)) {
                sign = 0;
            }
            else {
                sign = -1;
            }
            break;
        case 'always':
            if (SameValue(x, 0) || x > 0 || isNaN(x)) {
                sign = 1;
            }
            else {
                sign = -1;
            }
            break;
        default:
            // x === 0 -> x is 0 or x is -0
            if (x === 0 || isNaN(x)) {
                sign = 0;
            }
            else if (x > 0) {
                sign = 1;
            }
            else {
                sign = -1;
            }
    }
    return formatToParts$1({ roundedNumber: x, formattedString: n, exponent: exponent, magnitude: magnitude, sign: sign }, internalSlots.dataLocaleData, pl, internalSlots);
}

/**
 * https://tc39.es/ecma402/#sec-partitionnumberrangepattern
 */
function PartitionNumberRangePattern(numberFormat, x, y, _a) {
    var getInternalSlots = _a.getInternalSlots;
    if (isNaN(x) || isNaN(y)) {
        throw new RangeError('Input must be a number');
    }
    var result = [];
    var xResult = PartitionNumberPattern(numberFormat, x, { getInternalSlots: getInternalSlots });
    var yResult = PartitionNumberPattern(numberFormat, y, { getInternalSlots: getInternalSlots });
    if (xResult === yResult) {
        return FormatApproximately(numberFormat, xResult, { getInternalSlots: getInternalSlots });
    }
    for (var _i = 0, xResult_1 = xResult; _i < xResult_1.length; _i++) {
        var r = xResult_1[_i];
        r.source = 'startRange';
    }
    result = result.concat(xResult);
    var internalSlots = getInternalSlots(numberFormat);
    var symbols = internalSlots.dataLocaleData.numbers.symbols[internalSlots.numberingSystem];
    result.push({ type: 'literal', value: symbols.rangeSign, source: 'shared' });
    for (var _b = 0, yResult_1 = yResult; _b < yResult_1.length; _b++) {
        var r = yResult_1[_b];
        r.source = 'endRange';
    }
    result = result.concat(yResult);
    return CollapseNumberRange(result);
}

/**
 * https://tc39.es/ecma402/#sec-formatnumericrange
 */
function FormatNumericRange(numberFormat, x, y, _a) {
    var getInternalSlots = _a.getInternalSlots;
    var parts = PartitionNumberRangePattern(numberFormat, x, y, {
        getInternalSlots: getInternalSlots,
    });
    return parts.map(function (part) { return part.value; }).join('');
}

/**
 * https://tc39.es/ecma402/#sec-formatnumericrangetoparts
 */
function FormatNumericRangeToParts(numberFormat, x, y, _a) {
    var getInternalSlots = _a.getInternalSlots;
    var parts = PartitionNumberRangePattern(numberFormat, x, y, {
        getInternalSlots: getInternalSlots,
    });
    return parts.map(function (part, index) { return ({
        type: part.type,
        value: part.value,
        source: part.source,
        result: index.toString(),
    }); });
}

function FormatNumericToParts(nf, x, implDetails) {
    var parts = PartitionNumberPattern(nf, x, implDetails);
    var result = ArrayCreate(0);
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        result.push({
            type: part.type,
            value: part.value,
        });
    }
    return result;
}

var negativeMapping = {
    ceil: 'zero',
    floor: 'infinity',
    expand: 'infinity',
    trunc: 'zero',
    halfCeil: 'half-zero',
    halfFloor: 'half-infinity',
    halfExpand: 'half-infinity',
    halfTrunc: 'half-zero',
    halfEven: 'half-even',
};
var positiveMapping = {
    ceil: 'infinity',
    floor: 'zero',
    expand: 'infinity',
    trunc: 'zero',
    halfCeil: 'half-infinity',
    halfFloor: 'half-zero',
    halfExpand: 'half-infinity',
    halfTrunc: 'half-zero',
    halfEven: 'half-even',
};
function GetUnsignedRoundingMode(roundingMode, isNegative) {
    if (isNegative) {
        return negativeMapping[roundingMode];
    }
    return positiveMapping[roundingMode];
}

/**
 * http://ecma-international.org/ecma-402/7.0/index.html#sec-canonicalizelocalelist
 * @param locales
 */
function CanonicalizeLocaleList(locales) {
    // TODO
    return Intl.getCanonicalLocales(locales);
}

var data = {
    supplemental: {
        languageMatching: {
            'written-new': [
                {
                    paradigmLocales: {
                        _locales: 'en en_GB es es_419 pt_BR pt_PT',
                    },
                },
                {
                    $enUS: {
                        _value: 'AS+CA+GU+MH+MP+PH+PR+UM+US+VI',
                    },
                },
                {
                    $cnsar: {
                        _value: 'HK+MO',
                    },
                },
                {
                    $americas: {
                        _value: '019',
                    },
                },
                {
                    $maghreb: {
                        _value: 'MA+DZ+TN+LY+MR+EH',
                    },
                },
                {
                    no: {
                        _desired: 'nb',
                        _distance: '1',
                    },
                },
                {
                    bs: {
                        _desired: 'hr',
                        _distance: '4',
                    },
                },
                {
                    bs: {
                        _desired: 'sh',
                        _distance: '4',
                    },
                },
                {
                    hr: {
                        _desired: 'sh',
                        _distance: '4',
                    },
                },
                {
                    sr: {
                        _desired: 'sh',
                        _distance: '4',
                    },
                },
                {
                    aa: {
                        _desired: 'ssy',
                        _distance: '4',
                    },
                },
                {
                    de: {
                        _desired: 'gsw',
                        _distance: '4',
                        _oneway: 'true',
                    },
                },
                {
                    de: {
                        _desired: 'lb',
                        _distance: '4',
                        _oneway: 'true',
                    },
                },
                {
                    no: {
                        _desired: 'da',
                        _distance: '8',
                    },
                },
                {
                    nb: {
                        _desired: 'da',
                        _distance: '8',
                    },
                },
                {
                    ru: {
                        _desired: 'ab',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ach',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    nl: {
                        _desired: 'af',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ak',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'am',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    es: {
                        _desired: 'ay',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'az',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ur: {
                        _desired: 'bal',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'be',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'bem',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    hi: {
                        _desired: 'bh',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'bn',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'bo',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'br',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    es: {
                        _desired: 'ca',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    fil: {
                        _desired: 'ceb',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'chr',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ckb',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'co',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'crs',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    sk: {
                        _desired: 'cs',
                        _distance: '20',
                    },
                },
                {
                    en: {
                        _desired: 'cy',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ee',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'eo',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    es: {
                        _desired: 'eu',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    da: {
                        _desired: 'fo',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    nl: {
                        _desired: 'fy',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ga',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'gaa',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'gd',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    es: {
                        _desired: 'gl',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    es: {
                        _desired: 'gn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    hi: {
                        _desired: 'gu',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ha',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'haw',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'ht',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'hy',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ia',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ig',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'is',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    id: {
                        _desired: 'jv',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ka',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'kg',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'kk',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'km',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'kn',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'kri',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    tr: {
                        _desired: 'ku',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'ky',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    it: {
                        _desired: 'la',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'lg',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'ln',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'lo',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'loz',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'lua',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    hi: {
                        _desired: 'mai',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'mfe',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'mg',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'mi',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ml',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'mn',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    hi: {
                        _desired: 'mr',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    id: {
                        _desired: 'ms',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'mt',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'my',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ne',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    nb: {
                        _desired: 'nn',
                        _distance: '20',
                    },
                },
                {
                    no: {
                        _desired: 'nn',
                        _distance: '20',
                    },
                },
                {
                    en: {
                        _desired: 'nso',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ny',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'nyn',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'oc',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'om',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'or',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'pa',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'pcm',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ps',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    es: {
                        _desired: 'qu',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    de: {
                        _desired: 'rm',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'rn',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'rw',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    hi: {
                        _desired: 'sa',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'sd',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'si',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'sn',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'so',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'sq',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'st',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    id: {
                        _desired: 'su',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'sw',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ta',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'te',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'tg',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ti',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'tk',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'tlh',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'tn',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'to',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'tt',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'tum',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'ug',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'uk',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'ur',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ru: {
                        _desired: 'uz',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    fr: {
                        _desired: 'wo',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'xh',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'yi',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'yo',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'za',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    en: {
                        _desired: 'zu',
                        _distance: '30',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'aao',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'abh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'abv',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'acm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'acq',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'acw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'acx',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'acy',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'adf',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'aeb',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'aec',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'afb',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ajp',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'apc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'apd',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'arq',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ars',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ary',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'arz',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'auz',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'avl',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ayh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ayl',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ayn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ayp',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'bbz',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'pga',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'shu',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ar: {
                        _desired: 'ssh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    az: {
                        _desired: 'azb',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    et: {
                        _desired: 'vro',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'ffm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'fub',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'fue',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'fuf',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'fuh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'fui',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'fuq',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ff: {
                        _desired: 'fuv',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    gn: {
                        _desired: 'gnw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    gn: {
                        _desired: 'gui',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    gn: {
                        _desired: 'gun',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    gn: {
                        _desired: 'nhd',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    iu: {
                        _desired: 'ikt',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'enb',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'eyo',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'niq',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'oki',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'pko',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'sgc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'tec',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kln: {
                        _desired: 'tuy',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kok: {
                        _desired: 'gom',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    kpe: {
                        _desired: 'gkp',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'ida',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lkb',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lko',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lks',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lri',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lrm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lsm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lto',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lts',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'lwg',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'nle',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'nyd',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    luy: {
                        _desired: 'rag',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    lv: {
                        _desired: 'ltg',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'bhr',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'bjq',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'bmm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'bzc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'msh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'skg',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'tdx',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'tkg',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'txy',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'xmv',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mg: {
                        _desired: 'xmw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    mn: {
                        _desired: 'mvf',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'bjn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'btj',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'bve',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'bvu',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'coa',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'dup',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'hji',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'id',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'jak',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'jax',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'kvb',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'kvr',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'kxd',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'lce',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'lcf',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'liw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'max',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'meo',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'mfa',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'mfb',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'min',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'mqg',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'msi',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'mui',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'orn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'ors',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'pel',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'pse',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'tmw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'urk',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'vkk',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'vkt',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'xmm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'zlm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ms: {
                        _desired: 'zmi',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ne: {
                        _desired: 'dty',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    om: {
                        _desired: 'gax',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    om: {
                        _desired: 'hae',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    om: {
                        _desired: 'orc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    or: {
                        _desired: 'spv',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ps: {
                        _desired: 'pbt',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    ps: {
                        _desired: 'pst',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qub',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qud',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'quf',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qug',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'quh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'quk',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qul',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qup',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qur',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qus',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'quw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qux',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'quy',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qva',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qve',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvi',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvj',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvl',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvm',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvo',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvp',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvs',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qvz',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qwa',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qwc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qwh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qws',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxa',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxl',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxo',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxp',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxr',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxt',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxu',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    qu: {
                        _desired: 'qxw',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    sc: {
                        _desired: 'sdc',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    sc: {
                        _desired: 'sdn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    sc: {
                        _desired: 'sro',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    sq: {
                        _desired: 'aae',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    sq: {
                        _desired: 'aat',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    sq: {
                        _desired: 'aln',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    syr: {
                        _desired: 'aii',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    uz: {
                        _desired: 'uzs',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    yi: {
                        _desired: 'yih',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'cdo',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'cjy',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'cpx',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'czh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'czo',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'gan',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'hak',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'hsn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'lzh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'mnp',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'nan',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'wuu',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    zh: {
                        _desired: 'yue',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    '*': {
                        _desired: '*',
                        _distance: '80',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'am-Ethi',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'ru-Cyrl': {
                        _desired: 'az-Latn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'bn-Beng',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'zh-Hans': {
                        _desired: 'bo-Tibt',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'ru-Cyrl': {
                        _desired: 'hy-Armn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'ka-Geor',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'km-Khmr',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'kn-Knda',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'lo-Laoo',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'ml-Mlym',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'my-Mymr',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'ne-Deva',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'or-Orya',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'pa-Guru',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'ps-Arab',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'sd-Arab',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'si-Sinh',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'ta-Taml',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'te-Telu',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'ti-Ethi',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'ru-Cyrl': {
                        _desired: 'tk-Latn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'ur-Arab',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'ru-Cyrl': {
                        _desired: 'uz-Latn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'en-Latn': {
                        _desired: 'yi-Hebr',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'sr-Cyrl': {
                        _desired: 'sr-Latn',
                        _distance: '5',
                    },
                },
                {
                    'zh-Hans': {
                        _desired: 'za-Latn',
                        _distance: '10',
                        _oneway: 'true',
                    },
                },
                {
                    'zh-Hans': {
                        _desired: 'zh-Hani',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'zh-Hant': {
                        _desired: 'zh-Hani',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'ar-Arab': {
                        _desired: 'ar-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'bn-Beng': {
                        _desired: 'bn-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'gu-Gujr': {
                        _desired: 'gu-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'hi-Deva': {
                        _desired: 'hi-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'kn-Knda': {
                        _desired: 'kn-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'ml-Mlym': {
                        _desired: 'ml-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'mr-Deva': {
                        _desired: 'mr-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'ta-Taml': {
                        _desired: 'ta-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'te-Telu': {
                        _desired: 'te-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'zh-Hans': {
                        _desired: 'zh-Latn',
                        _distance: '20',
                        _oneway: 'true',
                    },
                },
                {
                    'ja-Jpan': {
                        _desired: 'ja-Latn',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ja-Jpan': {
                        _desired: 'ja-Hani',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ja-Jpan': {
                        _desired: 'ja-Hira',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ja-Jpan': {
                        _desired: 'ja-Kana',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ja-Jpan': {
                        _desired: 'ja-Hrkt',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ja-Hrkt': {
                        _desired: 'ja-Hira',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ja-Hrkt': {
                        _desired: 'ja-Kana',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ko-Kore': {
                        _desired: 'ko-Hani',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ko-Kore': {
                        _desired: 'ko-Hang',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ko-Kore': {
                        _desired: 'ko-Jamo',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    'ko-Hang': {
                        _desired: 'ko-Jamo',
                        _distance: '5',
                        _oneway: 'true',
                    },
                },
                {
                    '*-*': {
                        _desired: '*-*',
                        _distance: '50',
                    },
                },
                {
                    'ar-*-$maghreb': {
                        _desired: 'ar-*-$maghreb',
                        _distance: '4',
                    },
                },
                {
                    'ar-*-$!maghreb': {
                        _desired: 'ar-*-$!maghreb',
                        _distance: '4',
                    },
                },
                {
                    'ar-*-*': {
                        _desired: 'ar-*-*',
                        _distance: '5',
                    },
                },
                {
                    'en-*-$enUS': {
                        _desired: 'en-*-$enUS',
                        _distance: '4',
                    },
                },
                {
                    'en-*-GB': {
                        _desired: 'en-*-$!enUS',
                        _distance: '3',
                    },
                },
                {
                    'en-*-$!enUS': {
                        _desired: 'en-*-$!enUS',
                        _distance: '4',
                    },
                },
                {
                    'en-*-*': {
                        _desired: 'en-*-*',
                        _distance: '5',
                    },
                },
                {
                    'es-*-$americas': {
                        _desired: 'es-*-$americas',
                        _distance: '4',
                    },
                },
                {
                    'es-*-$!americas': {
                        _desired: 'es-*-$!americas',
                        _distance: '4',
                    },
                },
                {
                    'es-*-*': {
                        _desired: 'es-*-*',
                        _distance: '5',
                    },
                },
                {
                    'pt-*-$americas': {
                        _desired: 'pt-*-$americas',
                        _distance: '4',
                    },
                },
                {
                    'pt-*-$!americas': {
                        _desired: 'pt-*-$!americas',
                        _distance: '4',
                    },
                },
                {
                    'pt-*-*': {
                        _desired: 'pt-*-*',
                        _distance: '5',
                    },
                },
                {
                    'zh-Hant-$cnsar': {
                        _desired: 'zh-Hant-$cnsar',
                        _distance: '4',
                    },
                },
                {
                    'zh-Hant-$!cnsar': {
                        _desired: 'zh-Hant-$!cnsar',
                        _distance: '4',
                    },
                },
                {
                    'zh-Hant-*': {
                        _desired: 'zh-Hant-*',
                        _distance: '5',
                    },
                },
                {
                    '*-*-*': {
                        _desired: '*-*-*',
                        _distance: '4',
                    },
                },
            ],
        },
    },
};

// This file is generated from regions-gen.ts
var regions = {
    "001": [
        "001",
        "001-status-grouping",
        "002",
        "005",
        "009",
        "011",
        "013",
        "014",
        "015",
        "017",
        "018",
        "019",
        "021",
        "029",
        "030",
        "034",
        "035",
        "039",
        "053",
        "054",
        "057",
        "061",
        "142",
        "143",
        "145",
        "150",
        "151",
        "154",
        "155",
        "AC",
        "AD",
        "AE",
        "AF",
        "AG",
        "AI",
        "AL",
        "AM",
        "AO",
        "AQ",
        "AR",
        "AS",
        "AT",
        "AU",
        "AW",
        "AX",
        "AZ",
        "BA",
        "BB",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BL",
        "BM",
        "BN",
        "BO",
        "BQ",
        "BR",
        "BS",
        "BT",
        "BV",
        "BW",
        "BY",
        "BZ",
        "CA",
        "CC",
        "CD",
        "CF",
        "CG",
        "CH",
        "CI",
        "CK",
        "CL",
        "CM",
        "CN",
        "CO",
        "CP",
        "CQ",
        "CR",
        "CU",
        "CV",
        "CW",
        "CX",
        "CY",
        "CZ",
        "DE",
        "DG",
        "DJ",
        "DK",
        "DM",
        "DO",
        "DZ",
        "EA",
        "EC",
        "EE",
        "EG",
        "EH",
        "ER",
        "ES",
        "ET",
        "EU",
        "EZ",
        "FI",
        "FJ",
        "FK",
        "FM",
        "FO",
        "FR",
        "GA",
        "GB",
        "GD",
        "GE",
        "GF",
        "GG",
        "GH",
        "GI",
        "GL",
        "GM",
        "GN",
        "GP",
        "GQ",
        "GR",
        "GS",
        "GT",
        "GU",
        "GW",
        "GY",
        "HK",
        "HM",
        "HN",
        "HR",
        "HT",
        "HU",
        "IC",
        "ID",
        "IE",
        "IL",
        "IM",
        "IN",
        "IO",
        "IQ",
        "IR",
        "IS",
        "IT",
        "JE",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KI",
        "KM",
        "KN",
        "KP",
        "KR",
        "KW",
        "KY",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LI",
        "LK",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LY",
        "MA",
        "MC",
        "MD",
        "ME",
        "MF",
        "MG",
        "MH",
        "MK",
        "ML",
        "MM",
        "MN",
        "MO",
        "MP",
        "MQ",
        "MR",
        "MS",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NC",
        "NE",
        "NF",
        "NG",
        "NI",
        "NL",
        "NO",
        "NP",
        "NR",
        "NU",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PF",
        "PG",
        "PH",
        "PK",
        "PL",
        "PM",
        "PN",
        "PR",
        "PS",
        "PT",
        "PW",
        "PY",
        "QA",
        "QO",
        "RE",
        "RO",
        "RS",
        "RU",
        "RW",
        "SA",
        "SB",
        "SC",
        "SD",
        "SE",
        "SG",
        "SH",
        "SI",
        "SJ",
        "SK",
        "SL",
        "SM",
        "SN",
        "SO",
        "SR",
        "SS",
        "ST",
        "SV",
        "SX",
        "SY",
        "SZ",
        "TA",
        "TC",
        "TD",
        "TF",
        "TG",
        "TH",
        "TJ",
        "TK",
        "TL",
        "TM",
        "TN",
        "TO",
        "TR",
        "TT",
        "TV",
        "TW",
        "TZ",
        "UA",
        "UG",
        "UM",
        "UN",
        "US",
        "UY",
        "UZ",
        "VA",
        "VC",
        "VE",
        "VG",
        "VI",
        "VN",
        "VU",
        "WF",
        "WS",
        "XK",
        "YE",
        "YT",
        "ZA",
        "ZM",
        "ZW"
    ],
    "002": [
        "002",
        "002-status-grouping",
        "011",
        "014",
        "015",
        "017",
        "018",
        "202",
        "AO",
        "BF",
        "BI",
        "BJ",
        "BW",
        "CD",
        "CF",
        "CG",
        "CI",
        "CM",
        "CV",
        "DJ",
        "DZ",
        "EA",
        "EG",
        "EH",
        "ER",
        "ET",
        "GA",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GW",
        "IC",
        "IO",
        "KE",
        "KM",
        "LR",
        "LS",
        "LY",
        "MA",
        "MG",
        "ML",
        "MR",
        "MU",
        "MW",
        "MZ",
        "NA",
        "NE",
        "NG",
        "RE",
        "RW",
        "SC",
        "SD",
        "SH",
        "SL",
        "SN",
        "SO",
        "SS",
        "ST",
        "SZ",
        "TD",
        "TF",
        "TG",
        "TN",
        "TZ",
        "UG",
        "YT",
        "ZA",
        "ZM",
        "ZW"
    ],
    "003": [
        "003",
        "013",
        "021",
        "029",
        "AG",
        "AI",
        "AW",
        "BB",
        "BL",
        "BM",
        "BQ",
        "BS",
        "BZ",
        "CA",
        "CR",
        "CU",
        "CW",
        "DM",
        "DO",
        "GD",
        "GL",
        "GP",
        "GT",
        "HN",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "MX",
        "NI",
        "PA",
        "PM",
        "PR",
        "SV",
        "SX",
        "TC",
        "TT",
        "US",
        "VC",
        "VG",
        "VI"
    ],
    "005": [
        "005",
        "AR",
        "BO",
        "BR",
        "BV",
        "CL",
        "CO",
        "EC",
        "FK",
        "GF",
        "GS",
        "GY",
        "PE",
        "PY",
        "SR",
        "UY",
        "VE"
    ],
    "009": [
        "009",
        "053",
        "054",
        "057",
        "061",
        "AC",
        "AQ",
        "AS",
        "AU",
        "CC",
        "CK",
        "CP",
        "CX",
        "DG",
        "FJ",
        "FM",
        "GU",
        "HM",
        "KI",
        "MH",
        "MP",
        "NC",
        "NF",
        "NR",
        "NU",
        "NZ",
        "PF",
        "PG",
        "PN",
        "PW",
        "QO",
        "SB",
        "TA",
        "TK",
        "TO",
        "TV",
        "UM",
        "VU",
        "WF",
        "WS"
    ],
    "011": [
        "011",
        "BF",
        "BJ",
        "CI",
        "CV",
        "GH",
        "GM",
        "GN",
        "GW",
        "LR",
        "ML",
        "MR",
        "NE",
        "NG",
        "SH",
        "SL",
        "SN",
        "TG"
    ],
    "013": [
        "013",
        "BZ",
        "CR",
        "GT",
        "HN",
        "MX",
        "NI",
        "PA",
        "SV"
    ],
    "014": [
        "014",
        "BI",
        "DJ",
        "ER",
        "ET",
        "IO",
        "KE",
        "KM",
        "MG",
        "MU",
        "MW",
        "MZ",
        "RE",
        "RW",
        "SC",
        "SO",
        "SS",
        "TF",
        "TZ",
        "UG",
        "YT",
        "ZM",
        "ZW"
    ],
    "015": [
        "015",
        "DZ",
        "EA",
        "EG",
        "EH",
        "IC",
        "LY",
        "MA",
        "SD",
        "TN"
    ],
    "017": [
        "017",
        "AO",
        "CD",
        "CF",
        "CG",
        "CM",
        "GA",
        "GQ",
        "ST",
        "TD"
    ],
    "018": [
        "018",
        "BW",
        "LS",
        "NA",
        "SZ",
        "ZA"
    ],
    "019": [
        "003",
        "005",
        "013",
        "019",
        "019-status-grouping",
        "021",
        "029",
        "419",
        "AG",
        "AI",
        "AR",
        "AW",
        "BB",
        "BL",
        "BM",
        "BO",
        "BQ",
        "BR",
        "BS",
        "BV",
        "BZ",
        "CA",
        "CL",
        "CO",
        "CR",
        "CU",
        "CW",
        "DM",
        "DO",
        "EC",
        "FK",
        "GD",
        "GF",
        "GL",
        "GP",
        "GS",
        "GT",
        "GY",
        "HN",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "MX",
        "NI",
        "PA",
        "PE",
        "PM",
        "PR",
        "PY",
        "SR",
        "SV",
        "SX",
        "TC",
        "TT",
        "US",
        "UY",
        "VC",
        "VE",
        "VG",
        "VI"
    ],
    "021": [
        "021",
        "BM",
        "CA",
        "GL",
        "PM",
        "US"
    ],
    "029": [
        "029",
        "AG",
        "AI",
        "AW",
        "BB",
        "BL",
        "BQ",
        "BS",
        "CU",
        "CW",
        "DM",
        "DO",
        "GD",
        "GP",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "PR",
        "SX",
        "TC",
        "TT",
        "VC",
        "VG",
        "VI"
    ],
    "030": [
        "030",
        "CN",
        "HK",
        "JP",
        "KP",
        "KR",
        "MN",
        "MO",
        "TW"
    ],
    "034": [
        "034",
        "AF",
        "BD",
        "BT",
        "IN",
        "IR",
        "LK",
        "MV",
        "NP",
        "PK"
    ],
    "035": [
        "035",
        "BN",
        "ID",
        "KH",
        "LA",
        "MM",
        "MY",
        "PH",
        "SG",
        "TH",
        "TL",
        "VN"
    ],
    "039": [
        "039",
        "AD",
        "AL",
        "BA",
        "ES",
        "GI",
        "GR",
        "HR",
        "IT",
        "ME",
        "MK",
        "MT",
        "PT",
        "RS",
        "SI",
        "SM",
        "VA",
        "XK"
    ],
    "053": [
        "053",
        "AU",
        "CC",
        "CX",
        "HM",
        "NF",
        "NZ"
    ],
    "054": [
        "054",
        "FJ",
        "NC",
        "PG",
        "SB",
        "VU"
    ],
    "057": [
        "057",
        "FM",
        "GU",
        "KI",
        "MH",
        "MP",
        "NR",
        "PW",
        "UM"
    ],
    "061": [
        "061",
        "AS",
        "CK",
        "NU",
        "PF",
        "PN",
        "TK",
        "TO",
        "TV",
        "WF",
        "WS"
    ],
    "142": [
        "030",
        "034",
        "035",
        "142",
        "143",
        "145",
        "AE",
        "AF",
        "AM",
        "AZ",
        "BD",
        "BH",
        "BN",
        "BT",
        "CN",
        "CY",
        "GE",
        "HK",
        "ID",
        "IL",
        "IN",
        "IQ",
        "IR",
        "JO",
        "JP",
        "KG",
        "KH",
        "KP",
        "KR",
        "KW",
        "KZ",
        "LA",
        "LB",
        "LK",
        "MM",
        "MN",
        "MO",
        "MV",
        "MY",
        "NP",
        "OM",
        "PH",
        "PK",
        "PS",
        "QA",
        "SA",
        "SG",
        "SY",
        "TH",
        "TJ",
        "TL",
        "TM",
        "TR",
        "TW",
        "UZ",
        "VN",
        "YE"
    ],
    "143": [
        "143",
        "KG",
        "KZ",
        "TJ",
        "TM",
        "UZ"
    ],
    "145": [
        "145",
        "AE",
        "AM",
        "AZ",
        "BH",
        "CY",
        "GE",
        "IL",
        "IQ",
        "JO",
        "KW",
        "LB",
        "OM",
        "PS",
        "QA",
        "SA",
        "SY",
        "TR",
        "YE"
    ],
    "150": [
        "039",
        "150",
        "151",
        "154",
        "155",
        "AD",
        "AL",
        "AT",
        "AX",
        "BA",
        "BE",
        "BG",
        "BY",
        "CH",
        "CQ",
        "CZ",
        "DE",
        "DK",
        "EE",
        "ES",
        "FI",
        "FO",
        "FR",
        "GB",
        "GG",
        "GI",
        "GR",
        "HR",
        "HU",
        "IE",
        "IM",
        "IS",
        "IT",
        "JE",
        "LI",
        "LT",
        "LU",
        "LV",
        "MC",
        "MD",
        "ME",
        "MK",
        "MT",
        "NL",
        "NO",
        "PL",
        "PT",
        "RO",
        "RS",
        "RU",
        "SE",
        "SI",
        "SJ",
        "SK",
        "SM",
        "UA",
        "VA",
        "XK"
    ],
    "151": [
        "151",
        "BG",
        "BY",
        "CZ",
        "HU",
        "MD",
        "PL",
        "RO",
        "RU",
        "SK",
        "UA"
    ],
    "154": [
        "154",
        "AX",
        "CQ",
        "DK",
        "EE",
        "FI",
        "FO",
        "GB",
        "GG",
        "IE",
        "IM",
        "IS",
        "JE",
        "LT",
        "LV",
        "NO",
        "SE",
        "SJ"
    ],
    "155": [
        "155",
        "AT",
        "BE",
        "CH",
        "DE",
        "FR",
        "LI",
        "LU",
        "MC",
        "NL"
    ],
    "202": [
        "011",
        "014",
        "017",
        "018",
        "202",
        "AO",
        "BF",
        "BI",
        "BJ",
        "BW",
        "CD",
        "CF",
        "CG",
        "CI",
        "CM",
        "CV",
        "DJ",
        "ER",
        "ET",
        "GA",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GW",
        "IO",
        "KE",
        "KM",
        "LR",
        "LS",
        "MG",
        "ML",
        "MR",
        "MU",
        "MW",
        "MZ",
        "NA",
        "NE",
        "NG",
        "RE",
        "RW",
        "SC",
        "SH",
        "SL",
        "SN",
        "SO",
        "SS",
        "ST",
        "SZ",
        "TD",
        "TF",
        "TG",
        "TZ",
        "UG",
        "YT",
        "ZA",
        "ZM",
        "ZW"
    ],
    "419": [
        "005",
        "013",
        "029",
        "419",
        "AG",
        "AI",
        "AR",
        "AW",
        "BB",
        "BL",
        "BO",
        "BQ",
        "BR",
        "BS",
        "BV",
        "BZ",
        "CL",
        "CO",
        "CR",
        "CU",
        "CW",
        "DM",
        "DO",
        "EC",
        "FK",
        "GD",
        "GF",
        "GP",
        "GS",
        "GT",
        "GY",
        "HN",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "MX",
        "NI",
        "PA",
        "PE",
        "PR",
        "PY",
        "SR",
        "SV",
        "SX",
        "TC",
        "TT",
        "UY",
        "VC",
        "VE",
        "VG",
        "VI"
    ],
    "EU": [
        "AT",
        "BE",
        "BG",
        "CY",
        "CZ",
        "DE",
        "DK",
        "EE",
        "ES",
        "EU",
        "FI",
        "FR",
        "GR",
        "HR",
        "HU",
        "IE",
        "IT",
        "LT",
        "LU",
        "LV",
        "MT",
        "NL",
        "PL",
        "PT",
        "RO",
        "SE",
        "SI",
        "SK"
    ],
    "EZ": [
        "AT",
        "BE",
        "CY",
        "DE",
        "EE",
        "ES",
        "EZ",
        "FI",
        "FR",
        "GR",
        "IE",
        "IT",
        "LT",
        "LU",
        "LV",
        "MT",
        "NL",
        "PT",
        "SI",
        "SK"
    ],
    "QO": [
        "AC",
        "AQ",
        "CP",
        "DG",
        "QO",
        "TA"
    ],
    "UN": [
        "AD",
        "AE",
        "AF",
        "AG",
        "AL",
        "AM",
        "AO",
        "AR",
        "AT",
        "AU",
        "AZ",
        "BA",
        "BB",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BN",
        "BO",
        "BR",
        "BS",
        "BT",
        "BW",
        "BY",
        "BZ",
        "CA",
        "CD",
        "CF",
        "CG",
        "CH",
        "CI",
        "CL",
        "CM",
        "CN",
        "CO",
        "CR",
        "CU",
        "CV",
        "CY",
        "CZ",
        "DE",
        "DJ",
        "DK",
        "DM",
        "DO",
        "DZ",
        "EC",
        "EE",
        "EG",
        "ER",
        "ES",
        "ET",
        "FI",
        "FJ",
        "FM",
        "FR",
        "GA",
        "GB",
        "GD",
        "GE",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GR",
        "GT",
        "GW",
        "GY",
        "HN",
        "HR",
        "HT",
        "HU",
        "ID",
        "IE",
        "IL",
        "IN",
        "IQ",
        "IR",
        "IS",
        "IT",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KI",
        "KM",
        "KN",
        "KP",
        "KR",
        "KW",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LI",
        "LK",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LY",
        "MA",
        "MC",
        "MD",
        "ME",
        "MG",
        "MH",
        "MK",
        "ML",
        "MM",
        "MN",
        "MR",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NE",
        "NG",
        "NI",
        "NL",
        "NO",
        "NP",
        "NR",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PG",
        "PH",
        "PK",
        "PL",
        "PT",
        "PW",
        "PY",
        "QA",
        "RO",
        "RS",
        "RU",
        "RW",
        "SA",
        "SB",
        "SC",
        "SD",
        "SE",
        "SG",
        "SI",
        "SK",
        "SL",
        "SM",
        "SN",
        "SO",
        "SR",
        "SS",
        "ST",
        "SV",
        "SY",
        "SZ",
        "TD",
        "TG",
        "TH",
        "TJ",
        "TL",
        "TM",
        "TN",
        "TO",
        "TR",
        "TT",
        "TV",
        "TZ",
        "UA",
        "UG",
        "UN",
        "US",
        "UY",
        "UZ",
        "VC",
        "VE",
        "VN",
        "VU",
        "WS",
        "YE",
        "ZA",
        "ZM",
        "ZW"
    ]
};

var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
function invariant(condition, message, Err) {
    if (Err === void 0) { Err = Error; }
    if (!condition) {
        throw new Err(message);
    }
}
// This is effectively 2 languages in 2 different regions not even in the same cluster
var DEFAULT_MATCHING_THRESHOLD = 840;
var PROCESSED_DATA;
function processData() {
    var _a, _b;
    if (!PROCESSED_DATA) {
        var paradigmLocales = (_b = (_a = data.supplemental.languageMatching['written-new'][0]) === null || _a === void 0 ? void 0 : _a.paradigmLocales) === null || _b === void 0 ? void 0 : _b._locales.split(' ');
        var matchVariables = data.supplemental.languageMatching['written-new'].slice(1, 5);
        var data$1 = data.supplemental.languageMatching['written-new'].slice(5);
        var matches = data$1.map(function (d) {
            var key = Object.keys(d)[0];
            var value = d[key];
            return {
                supported: key,
                desired: value._desired,
                distance: +value._distance,
                oneway: value.oneway === 'true' ? true : false,
            };
        }, {});
        PROCESSED_DATA = {
            matches: matches,
            matchVariables: matchVariables.reduce(function (all, d) {
                var key = Object.keys(d)[0];
                var value = d[key];
                all[key.slice(1)] = value._value.split('+');
                return all;
            }, {}),
            paradigmLocales: __spreadArray(__spreadArray([], paradigmLocales, true), paradigmLocales.map(function (l) {
                return new Intl.Locale(l.replace(/_/g, '-')).maximize().toString();
            }), true),
        };
    }
    return PROCESSED_DATA;
}
function isMatched(locale, languageMatchInfoLocale, matchVariables) {
    var _a = languageMatchInfoLocale.split('-'), language = _a[0], script = _a[1], region = _a[2];
    var matches = true;
    if (region && region[0] === '$') {
        var shouldInclude = region[1] !== '!';
        var matchRegions = shouldInclude
            ? matchVariables[region.slice(1)]
            : matchVariables[region.slice(2)];
        var expandedMatchedRegions = matchRegions
            .map(function (r) { return regions[r] || [r]; })
            .reduce(function (all, list) { return __spreadArray(__spreadArray([], all, true), list, true); }, []);
        matches && (matches = !(expandedMatchedRegions.indexOf(locale.region || '') > 1 !=
            shouldInclude));
    }
    else {
        matches && (matches = locale.region
            ? region === '*' || region === locale.region
            : true);
    }
    matches && (matches = locale.script ? script === '*' || script === locale.script : true);
    matches && (matches = locale.language
        ? language === '*' || language === locale.language
        : true);
    return matches;
}
function serializeLSR(lsr) {
    return [lsr.language, lsr.script, lsr.region].filter(Boolean).join('-');
}
function findMatchingDistanceForLSR(desired, supported, data) {
    for (var _i = 0, _a = data.matches; _i < _a.length; _i++) {
        var d = _a[_i];
        var matches = isMatched(desired, d.desired, data.matchVariables) &&
            isMatched(supported, d.supported, data.matchVariables);
        if (!d.oneway && !matches) {
            matches =
                isMatched(desired, d.supported, data.matchVariables) &&
                    isMatched(supported, d.desired, data.matchVariables);
        }
        if (matches) {
            var distance = d.distance * 10;
            if (data.paradigmLocales.indexOf(serializeLSR(desired)) > -1 !=
                data.paradigmLocales.indexOf(serializeLSR(supported)) > -1) {
                return distance - 1;
            }
            return distance;
        }
    }
    throw new Error('No matching distance found');
}
function findMatchingDistance(desired, supported) {
    var desiredLocale = new Intl.Locale(desired).maximize();
    var supportedLocale = new Intl.Locale(supported).maximize();
    var desiredLSR = {
        language: desiredLocale.language,
        script: desiredLocale.script || '',
        region: desiredLocale.region || '',
    };
    var supportedLSR = {
        language: supportedLocale.language,
        script: supportedLocale.script || '',
        region: supportedLocale.region || '',
    };
    var matchingDistance = 0;
    var data = processData();
    if (desiredLSR.language !== supportedLSR.language) {
        matchingDistance += findMatchingDistanceForLSR({
            language: desiredLocale.language,
            script: '',
            region: '',
        }, {
            language: supportedLocale.language,
            script: '',
            region: '',
        }, data);
    }
    if (desiredLSR.script !== supportedLSR.script) {
        matchingDistance += findMatchingDistanceForLSR({
            language: desiredLocale.language,
            script: desiredLSR.script,
            region: '',
        }, {
            language: supportedLocale.language,
            script: desiredLSR.script,
            region: '',
        }, data);
    }
    if (desiredLSR.region !== supportedLSR.region) {
        matchingDistance += findMatchingDistanceForLSR(desiredLSR, supportedLSR, data);
    }
    return matchingDistance;
}
function findBestMatch(requestedLocales, supportedLocales, threshold) {
    if (threshold === void 0) { threshold = DEFAULT_MATCHING_THRESHOLD; }
    var lowestDistance = Infinity;
    var result = {
        matchedDesiredLocale: '',
        distances: {},
    };
    requestedLocales.forEach(function (desired, i) {
        if (!result.distances[desired]) {
            result.distances[desired] = {};
        }
        supportedLocales.forEach(function (supported, j) {
            // Add some weight to the distance based on the order of the supported locales
            // Add penalty for the order of the requested locales
            var distance = findMatchingDistance(desired, supported) + j + i * 40;
            result.distances[desired][supported] = distance;
            if (distance < lowestDistance) {
                lowestDistance = distance;
                result.matchedDesiredLocale = desired;
                result.matchedSupportedLocale = supported;
            }
        });
    });
    if (lowestDistance >= threshold) {
        result.matchedDesiredLocale = undefined;
        result.matchedSupportedLocale = undefined;
    }
    return result;
}

/**
 * https://tc39.es/ecma402/#sec-bestfitmatcher
 * @param availableLocales
 * @param requestedLocales
 * @param getDefaultLocale
 */
function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var foundLocale;
    var extension;
    var noExtensionLocales = [];
    var noExtensionLocaleMap = requestedLocales.reduce(function (all, l) {
        var noExtensionLocale = l.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
        noExtensionLocales.push(noExtensionLocale);
        all[noExtensionLocale] = l;
        return all;
    }, {});
    var result = findBestMatch(noExtensionLocales, availableLocales);
    if (result.matchedSupportedLocale && result.matchedDesiredLocale) {
        foundLocale = result.matchedSupportedLocale;
        extension =
            noExtensionLocaleMap[result.matchedDesiredLocale].slice(result.matchedDesiredLocale.length) || undefined;
    }
    if (!foundLocale) {
        return { locale: getDefaultLocale() };
    }
    return {
        locale: foundLocale,
        extension: extension,
    };
}

/**
 * https://tc39.es/ecma402/#sec-bestavailablelocale
 * @param availableLocales
 * @param locale
 */
function BestAvailableLocale(availableLocales, locale) {
    var candidate = locale;
    while (true) {
        if (availableLocales.indexOf(candidate) > -1) {
            return candidate;
        }
        var pos = candidate.lastIndexOf('-');
        if (!~pos) {
            return undefined;
        }
        if (pos >= 2 && candidate[pos - 2] === '-') {
            pos -= 2;
        }
        candidate = candidate.slice(0, pos);
    }
}

/**
 * https://tc39.es/ecma402/#sec-lookupmatcher
 * @param availableLocales
 * @param requestedLocales
 * @param getDefaultLocale
 */
function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var result = { locale: '' };
    for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
        var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
        if (availableLocale) {
            result.locale = availableLocale;
            if (locale !== noExtensionLocale) {
                result.extension = locale.slice(noExtensionLocale.length, locale.length);
            }
            return result;
        }
    }
    result.locale = getDefaultLocale();
    return result;
}

/**
 * https://tc39.es/ecma402/#sec-unicodeextensionvalue
 * @param extension
 * @param key
 */
function UnicodeExtensionValue(extension, key) {
    invariant(key.length === 2, 'key must have 2 elements');
    var size = extension.length;
    var searchValue = "-".concat(key, "-");
    var pos = extension.indexOf(searchValue);
    if (pos !== -1) {
        var start = pos + 4;
        var end = start;
        var k = start;
        var done = false;
        while (!done) {
            var e = extension.indexOf('-', k);
            var len = void 0;
            if (e === -1) {
                len = size - k;
            }
            else {
                len = e - k;
            }
            if (len === 2) {
                done = true;
            }
            else if (e === -1) {
                end = size;
                done = true;
            }
            else {
                end = e;
                k = e + 1;
            }
        }
        return extension.slice(start, end);
    }
    searchValue = "-".concat(key);
    pos = extension.indexOf(searchValue);
    if (pos !== -1 && pos + 3 === size) {
        return '';
    }
    return undefined;
}

/**
 * https://tc39.es/ecma402/#sec-resolvelocale
 */
function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
    var matcher = options.localeMatcher;
    var r;
    if (matcher === 'lookup') {
        r = LookupMatcher(Array.from(availableLocales), requestedLocales, getDefaultLocale);
    }
    else {
        r = BestFitMatcher(Array.from(availableLocales), requestedLocales, getDefaultLocale);
    }
    var foundLocale = r.locale;
    var result = { locale: '', dataLocale: foundLocale };
    var supportedExtension = '-u';
    for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
        var key = relevantExtensionKeys_1[_i];
        invariant(foundLocale in localeData, "Missing locale data for ".concat(foundLocale));
        var foundLocaleData = localeData[foundLocale];
        invariant(typeof foundLocaleData === 'object' && foundLocaleData !== null, "locale data ".concat(key, " must be an object"));
        var keyLocaleData = foundLocaleData[key];
        invariant(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
        var value = keyLocaleData[0];
        invariant(typeof value === 'string' || value === null, "value must be string or null but got ".concat(typeof value, " in key ").concat(key));
        var supportedExtensionAddition = '';
        if (r.extension) {
            var requestedValue = UnicodeExtensionValue(r.extension, key);
            if (requestedValue !== undefined) {
                if (requestedValue !== '') {
                    if (~keyLocaleData.indexOf(requestedValue)) {
                        value = requestedValue;
                        supportedExtensionAddition = "-".concat(key, "-").concat(value);
                    }
                }
                else if (~requestedValue.indexOf('true')) {
                    value = 'true';
                    supportedExtensionAddition = "-".concat(key);
                }
            }
        }
        if (key in options) {
            var optionsValue = options[key];
            invariant(typeof optionsValue === 'string' ||
                typeof optionsValue === 'undefined' ||
                optionsValue === null, 'optionsValue must be String, Undefined or Null');
            if (~keyLocaleData.indexOf(optionsValue)) {
                if (optionsValue !== value) {
                    value = optionsValue;
                    supportedExtensionAddition = '';
                }
            }
        }
        result[key] = value;
        supportedExtension += supportedExtensionAddition;
    }
    if (supportedExtension.length > 2) {
        var privateIndex = foundLocale.indexOf('-x-');
        if (privateIndex === -1) {
            foundLocale = foundLocale + supportedExtension;
        }
        else {
            var preExtension = foundLocale.slice(0, privateIndex);
            var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
            foundLocale = preExtension + supportedExtension + postExtension;
        }
        foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
    }
    result.locale = foundLocale;
    return result;
}

/**
 * https://tc39.es/ecma402/#sec-lookupsupportedlocales
 * @param availableLocales
 * @param requestedLocales
 */
function LookupSupportedLocales(availableLocales, requestedLocales) {
    var subset = [];
    for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
        var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
        if (availableLocale) {
            subset.push(availableLocale);
        }
    }
    return subset;
}

function match(requestedLocales, availableLocales, defaultLocale, opts) {
    return ResolveLocale(availableLocales, CanonicalizeLocaleList(requestedLocales), {
        localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || 'best fit',
    }, [], {}, function () { return defaultLocale; }).locale;
}

/**
 * https://tc39.es/ecma402/#sec-setnfdigitoptions
 */
function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
    var mnid = GetNumberOption(opts, 'minimumIntegerDigits', 1, 21, 1);
    var mnfd = opts.minimumFractionDigits;
    var mxfd = opts.maximumFractionDigits;
    var mnsd = opts.minimumSignificantDigits;
    var mxsd = opts.maximumSignificantDigits;
    internalSlots.minimumIntegerDigits = mnid;
    var roundingPriority = GetOption(opts, 'roundingPriority', 'string', ['auto', 'morePrecision', 'lessPrecision'], 'auto');
    var hasSd = mnsd !== undefined || mxsd !== undefined;
    var hasFd = mnfd !== undefined || mxfd !== undefined;
    var needSd = true;
    var needFd = true;
    if (roundingPriority === 'auto') {
        needSd = hasSd;
        if (hasSd || (!hasFd && notation === 'compact')) {
            needFd = false;
        }
    }
    if (needSd) {
        if (hasSd) {
            mnsd = DefaultNumberOption(mnsd, 1, 21, 1);
            mxsd = DefaultNumberOption(mxsd, mnsd, 21, 21);
            internalSlots.minimumSignificantDigits = mnsd;
            internalSlots.maximumSignificantDigits = mxsd;
        }
        else {
            internalSlots.minimumSignificantDigits = 1;
            internalSlots.maximumSignificantDigits = 21;
        }
    }
    if (needFd) {
        if (hasFd) {
            mnfd = DefaultNumberOption(mnfd, 0, 20, undefined);
            mxfd = DefaultNumberOption(mxfd, 0, 20, undefined);
            if (mnfd === undefined) {
                // @ts-expect-error
                mnfd = Math.min(mnfdDefault, mxfd);
            }
            else if (mxfd === undefined) {
                mxfd = Math.max(mxfdDefault, mnfd);
            }
            else if (mnfd > mxfd) {
                throw new RangeError("Invalid range, ".concat(mnfd, " > ").concat(mxfd));
            }
            internalSlots.minimumFractionDigits = mnfd;
            internalSlots.maximumFractionDigits = mxfd;
        }
        else {
            internalSlots.minimumFractionDigits = mnfdDefault;
            internalSlots.maximumFractionDigits = mxfdDefault;
        }
    }
    if (needSd || needFd) {
        if (roundingPriority === 'morePrecision') {
            internalSlots.roundingType = 'morePrecision';
        }
        else if (roundingPriority === 'lessPrecision') {
            internalSlots.roundingType = 'lessPrecision';
        }
        else if (hasSd) {
            internalSlots.roundingType = 'significantDigits';
        }
        else {
            internalSlots.roundingType = 'fractionDigits';
        }
    }
    else {
        internalSlots.roundingType = 'morePrecision';
        internalSlots.minimumFractionDigits = 0;
        internalSlots.maximumFractionDigits = 0;
        internalSlots.minimumSignificantDigits = 1;
        internalSlots.maximumSignificantDigits = 2;
    }
}

/**
 * https://tc39.es/ecma402/#sec-setnumberformatunitoptions
 */
function SetNumberFormatUnitOptions(nf, options, _a) {
    if (options === void 0) { options = Object.create(null); }
    var getInternalSlots = _a.getInternalSlots;
    var internalSlots = getInternalSlots(nf);
    var style = GetOption(options, 'style', 'string', ['decimal', 'percent', 'currency', 'unit'], 'decimal');
    internalSlots.style = style;
    var currency = GetOption(options, 'currency', 'string', undefined, undefined);
    if (currency !== undefined && !IsWellFormedCurrencyCode(currency)) {
        throw RangeError('Malformed currency code');
    }
    if (style === 'currency' && currency === undefined) {
        throw TypeError('currency cannot be undefined');
    }
    var currencyDisplay = GetOption(options, 'currencyDisplay', 'string', ['code', 'symbol', 'narrowSymbol', 'name'], 'symbol');
    var currencySign = GetOption(options, 'currencySign', 'string', ['standard', 'accounting'], 'standard');
    var unit = GetOption(options, 'unit', 'string', undefined, undefined);
    if (unit !== undefined && !IsWellFormedUnitIdentifier(unit)) {
        throw RangeError('Invalid unit argument for Intl.NumberFormat()');
    }
    if (style === 'unit' && unit === undefined) {
        throw TypeError('unit cannot be undefined');
    }
    var unitDisplay = GetOption(options, 'unitDisplay', 'string', ['short', 'narrow', 'long'], 'short');
    if (style === 'currency') {
        internalSlots.currency = currency.toUpperCase();
        internalSlots.currencyDisplay = currencyDisplay;
        internalSlots.currencySign = currencySign;
    }
    if (style === 'unit') {
        internalSlots.unit = unit;
        internalSlots.unitDisplay = unitDisplay;
    }
}

var VALID_ROUND_INCREMENT_VALUES = [
    1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000,
];
/**
 * https://tc39.es/ecma402/#sec-initializenumberformat
 */
function InitializeNumberFormat(nf, locales, opts, _a) {
    var getInternalSlots = _a.getInternalSlots, localeData = _a.localeData, availableLocales = _a.availableLocales, numberingSystemNames = _a.numberingSystemNames, getDefaultLocale = _a.getDefaultLocale, currencyDigitsData = _a.currencyDigitsData;
    // @ts-ignore
    var requestedLocales = CanonicalizeLocaleList$1(locales);
    var options = CoerceOptionsToObject(opts);
    var opt = Object.create(null);
    var matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
    opt.localeMatcher = matcher;
    var numberingSystem = GetOption(options, 'numberingSystem', 'string', undefined, undefined);
    if (numberingSystem !== undefined &&
        numberingSystemNames.indexOf(numberingSystem) < 0) {
        // 8.a. If numberingSystem does not match the Unicode Locale Identifier type nonterminal,
        // throw a RangeError exception.
        throw RangeError("Invalid numberingSystems: ".concat(numberingSystem));
    }
    opt.nu = numberingSystem;
    var r = ResolveLocale(Array.from(availableLocales), requestedLocales, opt, 
    // [[RelevantExtensionKeys]] slot, which is a constant
    ['nu'], localeData, getDefaultLocale);
    var dataLocaleData = localeData[r.dataLocale];
    invariant$1(!!dataLocaleData, "Missing locale data for ".concat(r.dataLocale));
    var internalSlots = getInternalSlots(nf);
    internalSlots.locale = r.locale;
    internalSlots.dataLocale = r.dataLocale;
    internalSlots.numberingSystem = r.nu;
    internalSlots.dataLocaleData = dataLocaleData;
    SetNumberFormatUnitOptions(nf, options, { getInternalSlots: getInternalSlots });
    var style = internalSlots.style;
    var mnfdDefault;
    var mxfdDefault;
    if (style === 'currency') {
        var currency = internalSlots.currency;
        var cDigits = CurrencyDigits(currency, { currencyDigitsData: currencyDigitsData });
        mnfdDefault = cDigits;
        mxfdDefault = cDigits;
    }
    else {
        mnfdDefault = 0;
        mxfdDefault = style === 'percent' ? 0 : 3;
    }
    var notation = GetOption(options, 'notation', 'string', ['standard', 'scientific', 'engineering', 'compact'], 'standard');
    internalSlots.notation = notation;
    SetNumberFormatDigitOptions(internalSlots, options, mnfdDefault, mxfdDefault, notation);
    var roundingIncrement = GetNumberOption(options, 'roundingIncrement', 1, 5000, 1);
    if (VALID_ROUND_INCREMENT_VALUES.indexOf(roundingIncrement) === -1) {
        throw new RangeError("Invalid rounding increment value: ".concat(roundingIncrement, ".\nValid values are ").concat(VALID_ROUND_INCREMENT_VALUES, "."));
    }
    if (roundingIncrement !== 1 &&
        internalSlots.roundingType !== 'fractionDigits') {
        throw new TypeError("For roundingIncrement > 1 only fractionDigits is a valid roundingType");
    }
    if (roundingIncrement !== 1 &&
        internalSlots.maximumFractionDigits !== internalSlots.minimumFractionDigits) {
        throw new RangeError('With roundingIncrement > 1, maximumFractionDigits and minimumFractionDigits must be equal.');
    }
    internalSlots.roundingIncrement = roundingIncrement;
    var trailingZeroDisplay = GetOption(options, 'trailingZeroDisplay', 'string', ['auto', 'stripIfInteger'], 'auto');
    internalSlots.trailingZeroDisplay = trailingZeroDisplay;
    var compactDisplay = GetOption(options, 'compactDisplay', 'string', ['short', 'long'], 'short');
    var defaultUseGrouping = 'auto';
    if (notation === 'compact') {
        internalSlots.compactDisplay = compactDisplay;
        defaultUseGrouping = 'min2';
    }
    internalSlots.useGrouping = GetStringOrBooleanOption(options, 'useGrouping', ['min2', 'auto', 'always'], 'always', false, defaultUseGrouping);
    internalSlots.signDisplay = GetOption(options, 'signDisplay', 'string', ['auto', 'never', 'always', 'exceptZero', 'negative'], 'auto');
    internalSlots.roundingMode = GetOption(options, 'roundingMode', 'string', [
        'ceil',
        'floor',
        'expand',
        'trunc',
        'halfCeil',
        'halfFloor',
        'halfExpand',
        'halfTrunc',
        'halfEven',
    ], 'halfExpand');
    return nf;
}

/**
 * https://tc39.es/ecma402/#sec-partitionpattern
 * @param pattern
 */
function PartitionPattern(pattern) {
    var result = [];
    var beginIndex = pattern.indexOf('{');
    var endIndex = 0;
    var nextIndex = 0;
    var length = pattern.length;
    while (beginIndex < pattern.length && beginIndex > -1) {
        endIndex = pattern.indexOf('}', beginIndex);
        invariant$1(endIndex > beginIndex, "Invalid pattern ".concat(pattern));
        if (beginIndex > nextIndex) {
            result.push({
                type: 'literal',
                value: pattern.substring(nextIndex, beginIndex),
            });
        }
        result.push({
            type: pattern.substring(beginIndex + 1, endIndex),
            value: undefined,
        });
        nextIndex = endIndex + 1;
        beginIndex = pattern.indexOf('{', nextIndex);
    }
    if (nextIndex < length) {
        result.push({
            type: 'literal',
            value: pattern.substring(nextIndex, length),
        });
    }
    return result;
}

/**
 * https://tc39.es/ecma402/#sec-supportedlocales
 * @param availableLocales
 * @param requestedLocales
 * @param options
 */
function SupportedLocales(availableLocales, requestedLocales, options) {
    var matcher = 'best fit';
    if (options !== undefined) {
        options = ToObject(options);
        matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
    }
    if (matcher === 'best fit') {
        return LookupSupportedLocales(Array.from(availableLocales), requestedLocales);
    }
    return LookupSupportedLocales(Array.from(availableLocales), requestedLocales);
}

var MissingLocaleDataError = /** @class */ (function (_super) {
    __extends(MissingLocaleDataError, _super);
    function MissingLocaleDataError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'MISSING_LOCALE_DATA';
        return _this;
    }
    return MissingLocaleDataError;
}(Error));
function isMissingLocaleDataError(e) {
    return e.type === 'MISSING_LOCALE_DATA';
}

var RangePatternType;
(function (RangePatternType) {
    RangePatternType["startRange"] = "startRange";
    RangePatternType["shared"] = "shared";
    RangePatternType["endRange"] = "endRange";
})(RangePatternType || (RangePatternType = {}));

var ErrorKind;
(function (ErrorKind) {
    /** Argument is unclosed (e.g. `{0`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    /** Argument is empty (e.g. `{}`). */
    ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    /** Argument is malformed (e.g. `{foo!}``) */
    ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    /** Expect an argument type (e.g. `{foo,}`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    /** Unsupported argument type (e.g. `{foo,foo}`) */
    ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    /** Expect an argument style (e.g. `{foo, number, }`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    /** The number skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    /** The date time skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    /** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */
    ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    /** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */
    ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    /** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */
    ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    /** Missing select argument options (e.g. `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    /** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Expecting a selector in `select` argument (e.g `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    /** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    /** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    /**
     * Expecting a message fragment after the `plural` or `selectordinal` selector
     * (e.g. `{foo, plural, one}`)
     */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    /** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    /**
     * Duplicate selectors in `plural` or `selectordinal` argument.
     * (e.g. {foo, plural, one {#} one {#}})
     */
    ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    /** Duplicate selectors in `select` argument.
     * (e.g. {foo, select, apple {apple} apple {apple}})
     */
    ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    /** Plural or select argument option must have `other` clause. */
    ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    /** The tag is malformed. (e.g. `<bold!>foo</bold!>) */
    ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
    /** The tag name is invalid. (e.g. `<123>foo</123>`) */
    ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    /** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */
    ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    /** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */
    ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));

var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    TYPE[TYPE["pound"] = 7] = "pound";
    /**
     * XML-like tag
     */
    TYPE[TYPE["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function (SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.dateTime);
}
function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value: value,
    };
}
function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value: value,
        style: style,
    };
}

// @generated from regex-gen.ts
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var WHITE_SPACE_REGEX$1 = /[\t-\r \x85\u200E\u200F\u2028\u2029]/;

/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: milliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}

// @generated from regex-gen.ts
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;

function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
        throw new Error('Number skeleton cannot be empty');
    }
    // Parse the skeleton
    var stringTokens = skeleton
        .split(WHITE_SPACE_REGEX)
        .filter(function (x) { return x.length > 0; });
    var tokens = [];
    for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split('/');
        if (stemAndOptions.length === 0) {
            throw new Error('Invalid number skeleton');
        }
        var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
            var option = options_1[_a];
            if (option.length === 0) {
                throw new Error('Invalid number skeleton');
            }
        }
        tokens.push({ stem: stem, options: options });
    }
    return tokens;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
    var result = {};
    if (str[str.length - 1] === 'r') {
        result.roundingPriority = 'morePrecision';
    }
    else if (str[str.length - 1] === 's') {
        result.roundingPriority = 'lessPrecision';
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
        case '()':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
        case '+!':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
        case '()!':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
        case '+?':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
        case '()?':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
        case '+_':
            return {
                signDisplay: 'never',
            };
    }
}
function parseConciseScientificAndEngineeringStem(stem) {
    // Engineering
    var result;
    if (stem[0] === 'E' && stem[1] === 'E') {
        result = {
            notation: 'engineering',
        };
        stem = stem.slice(2);
    }
    else if (stem[0] === 'E') {
        result = {
            notation: 'scientific',
        };
        stem = stem.slice(1);
    }
    if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === '+!') {
            result.signDisplay = 'always';
            stem = stem.slice(2);
        }
        else if (signDisplay === '+?') {
            result.signDisplay = 'exceptZero';
            stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
            throw new Error('Malformed concise eng/scientific notation');
        }
        result.minimumIntegerDigits = stem.length;
    }
    return result;
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function parseNumberSkeleton(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
            case '%':
                result.style = 'percent';
                continue;
            case '%x100':
                result.style = 'percent';
                result.scale = 100;
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
            case ',_':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
            case '.':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
            case 'unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
            case 'K':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
            case 'KK':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = __assign(__assign(__assign({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = __assign(__assign(__assign({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
            case 'scale':
                result.scale = parseFloat(token.options[0]);
                continue;
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
            case 'integer-width':
                if (token.options.length > 1) {
                    throw new RangeError('integer-width stems only accept a single optional option');
                }
                token.options[0].replace(INTEGER_WIDTH_REGEX, function (_, g1, g2, g3, g4, g5) {
                    if (g1) {
                        result.minimumIntegerDigits = g2.length;
                    }
                    else if (g3 && g4) {
                        throw new Error('We currently do not support maximum integer digits');
                    }
                    else if (g5) {
                        throw new Error('We currently do not support exact integer digits');
                    }
                    return '';
                });
                continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
            result.minimumIntegerDigits = token.stem.length;
            continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            // Precision
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
            // precision-integer case
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === '*') {
                    result.minimumFractionDigits = g1.length;
                }
                // .### case
                else if (g3 && g3[0] === '#') {
                    result.maximumFractionDigits = g3.length;
                }
                // .00## case
                else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                }
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return '';
            });
            var opt = token.options[0];
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
            if (opt === 'w') {
                result = __assign(__assign({}, result), { trailingZeroDisplay: 'stripIfInteger' });
            }
            else if (opt) {
                result = __assign(__assign({}, result), parseSignificantPrecision(opt));
            }
            continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = __assign(__assign({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
            result = __assign(__assign({}, result), conciseScientificAndEngineeringOpts);
        }
    }
    return result;
}

// @generated from time-data-gen.ts
// prettier-ignore  
var timeData = {
    "001": [
        "H",
        "h"
    ],
    "AC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AD": [
        "H",
        "hB"
    ],
    "AE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "AF": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "AG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AL": [
        "h",
        "H",
        "hB"
    ],
    "AM": [
        "H",
        "hB"
    ],
    "AO": [
        "H",
        "hB"
    ],
    "AR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "AS": [
        "h",
        "H"
    ],
    "AT": [
        "H",
        "hB"
    ],
    "AU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AW": [
        "H",
        "hB"
    ],
    "AX": [
        "H"
    ],
    "AZ": [
        "H",
        "hB",
        "h"
    ],
    "BA": [
        "H",
        "hB",
        "h"
    ],
    "BB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BD": [
        "h",
        "hB",
        "H"
    ],
    "BE": [
        "H",
        "hB"
    ],
    "BF": [
        "H",
        "hB"
    ],
    "BG": [
        "H",
        "hB",
        "h"
    ],
    "BH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "BI": [
        "H",
        "h"
    ],
    "BJ": [
        "H",
        "hB"
    ],
    "BL": [
        "H",
        "hB"
    ],
    "BM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BN": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "BO": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "BQ": [
        "H"
    ],
    "BR": [
        "H",
        "hB"
    ],
    "BS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BT": [
        "h",
        "H"
    ],
    "BW": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "BY": [
        "H",
        "h"
    ],
    "BZ": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CA": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "CC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CD": [
        "hB",
        "H"
    ],
    "CF": [
        "H",
        "h",
        "hB"
    ],
    "CG": [
        "H",
        "hB"
    ],
    "CH": [
        "H",
        "hB",
        "h"
    ],
    "CI": [
        "H",
        "hB"
    ],
    "CK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CL": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "CM": [
        "H",
        "h",
        "hB"
    ],
    "CN": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "CO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CP": [
        "H"
    ],
    "CR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "CU": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "CV": [
        "H",
        "hB"
    ],
    "CW": [
        "H",
        "hB"
    ],
    "CX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CY": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "CZ": [
        "H"
    ],
    "DE": [
        "H",
        "hB"
    ],
    "DG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "DJ": [
        "h",
        "H"
    ],
    "DK": [
        "H"
    ],
    "DM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "DO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "DZ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "EC": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "EE": [
        "H",
        "hB"
    ],
    "EG": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ER": [
        "h",
        "H"
    ],
    "ES": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "ET": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "FI": [
        "H"
    ],
    "FJ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "FM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FO": [
        "H",
        "h"
    ],
    "FR": [
        "H",
        "hB"
    ],
    "GA": [
        "H",
        "hB"
    ],
    "GB": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GD": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GE": [
        "H",
        "hB",
        "h"
    ],
    "GF": [
        "H",
        "hB"
    ],
    "GG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GH": [
        "h",
        "H"
    ],
    "GI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GL": [
        "H",
        "h"
    ],
    "GM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GN": [
        "H",
        "hB"
    ],
    "GP": [
        "H",
        "hB"
    ],
    "GQ": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "GR": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "GT": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "GU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GW": [
        "H",
        "hB"
    ],
    "GY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "HK": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "HN": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "HR": [
        "H",
        "hB"
    ],
    "HU": [
        "H",
        "h"
    ],
    "IC": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ID": [
        "H"
    ],
    "IE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IL": [
        "H",
        "hB"
    ],
    "IM": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IN": [
        "h",
        "H"
    ],
    "IO": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IQ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "IR": [
        "hB",
        "H"
    ],
    "IS": [
        "H"
    ],
    "IT": [
        "H",
        "hB"
    ],
    "JE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "JM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "JO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "JP": [
        "H",
        "K",
        "h"
    ],
    "KE": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "KG": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KH": [
        "hB",
        "h",
        "H",
        "hb"
    ],
    "KI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KM": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KN": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KP": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KW": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "KY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KZ": [
        "H",
        "hB"
    ],
    "LA": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "LB": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "LC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LI": [
        "H",
        "hB",
        "h"
    ],
    "LK": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "LR": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LS": [
        "h",
        "H"
    ],
    "LT": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "LU": [
        "H",
        "h",
        "hB"
    ],
    "LV": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "LY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "MC": [
        "H",
        "hB"
    ],
    "MD": [
        "H",
        "hB"
    ],
    "ME": [
        "H",
        "hB",
        "h"
    ],
    "MF": [
        "H",
        "hB"
    ],
    "MG": [
        "H",
        "h"
    ],
    "MH": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ML": [
        "H"
    ],
    "MM": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "MN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MP": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MQ": [
        "H",
        "hB"
    ],
    "MR": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MS": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MT": [
        "H",
        "h"
    ],
    "MU": [
        "H",
        "h"
    ],
    "MV": [
        "H",
        "h"
    ],
    "MW": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MX": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "MY": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "MZ": [
        "H",
        "hB"
    ],
    "NA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NC": [
        "H",
        "hB"
    ],
    "NE": [
        "H"
    ],
    "NF": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NI": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "NL": [
        "H",
        "hB"
    ],
    "NO": [
        "H",
        "h"
    ],
    "NP": [
        "H",
        "h",
        "hB"
    ],
    "NR": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NU": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "OM": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PE": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "PF": [
        "H",
        "h",
        "hB"
    ],
    "PG": [
        "h",
        "H"
    ],
    "PH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PK": [
        "h",
        "hB",
        "H"
    ],
    "PL": [
        "H",
        "h"
    ],
    "PM": [
        "H",
        "hB"
    ],
    "PN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "PR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PS": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PT": [
        "H",
        "hB"
    ],
    "PW": [
        "h",
        "H"
    ],
    "PY": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "QA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "RE": [
        "H",
        "hB"
    ],
    "RO": [
        "H",
        "hB"
    ],
    "RS": [
        "H",
        "hB",
        "h"
    ],
    "RU": [
        "H"
    ],
    "RW": [
        "H",
        "h"
    ],
    "SA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SC": [
        "H",
        "h",
        "hB"
    ],
    "SD": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SE": [
        "H"
    ],
    "SG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SH": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SI": [
        "H",
        "hB"
    ],
    "SJ": [
        "H"
    ],
    "SK": [
        "H"
    ],
    "SL": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SM": [
        "H",
        "h",
        "hB"
    ],
    "SN": [
        "H",
        "h",
        "hB"
    ],
    "SO": [
        "h",
        "H"
    ],
    "SR": [
        "H",
        "hB"
    ],
    "SS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ST": [
        "H",
        "hB"
    ],
    "SV": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "SX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "TC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TD": [
        "h",
        "H",
        "hB"
    ],
    "TF": [
        "H",
        "h",
        "hB"
    ],
    "TG": [
        "H",
        "hB"
    ],
    "TH": [
        "H",
        "h"
    ],
    "TJ": [
        "H",
        "h"
    ],
    "TL": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "TM": [
        "H",
        "h"
    ],
    "TN": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "TO": [
        "h",
        "H"
    ],
    "TR": [
        "H",
        "hB"
    ],
    "TT": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TW": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "TZ": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UA": [
        "H",
        "hB",
        "h"
    ],
    "UG": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "US": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "UY": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "UZ": [
        "H",
        "hB",
        "h"
    ],
    "VA": [
        "H",
        "h",
        "hB"
    ],
    "VC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "VG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VN": [
        "H",
        "h"
    ],
    "VU": [
        "h",
        "H"
    ],
    "WF": [
        "H",
        "hB"
    ],
    "WS": [
        "h",
        "H"
    ],
    "XK": [
        "H",
        "hB",
        "h"
    ],
    "YE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "YT": [
        "H",
        "hB"
    ],
    "ZA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ZM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ZW": [
        "H",
        "h"
    ],
    "af-ZA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ar-001": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ca-ES": [
        "H",
        "h",
        "hB"
    ],
    "en-001": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "es-BO": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-BR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-EC": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-ES": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-GQ": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-PE": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "fr-CA": [
        "H",
        "h",
        "hB"
    ],
    "gl-ES": [
        "H",
        "h",
        "hB"
    ],
    "gu-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "hi-IN": [
        "hB",
        "h",
        "H"
    ],
    "it-CH": [
        "H",
        "h",
        "hB"
    ],
    "it-IT": [
        "H",
        "h",
        "hB"
    ],
    "kn-IN": [
        "hB",
        "h",
        "H"
    ],
    "ml-IN": [
        "hB",
        "h",
        "H"
    ],
    "mr-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "pa-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "ta-IN": [
        "hB",
        "h",
        "hb",
        "H"
    ],
    "te-IN": [
        "hB",
        "h",
        "H"
    ],
    "zu-ZA": [
        "H",
        "hB",
        "hb",
        "h"
    ]
};

/**
 * Returns the best matching date time pattern if a date time skeleton
 * pattern is provided with a locale. Follows the Unicode specification:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#table-mapping-requested-time-skeletons-to-patterns
 * @param skeleton date time skeleton pattern that possibly includes j, J or C
 * @param locale
 */
function getBestPattern(skeleton, locale) {
    var skeletonCopy = '';
    for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
        var patternChar = skeleton.charAt(patternPos);
        if (patternChar === 'j') {
            var extraLength = 0;
            while (patternPos + 1 < skeleton.length &&
                skeleton.charAt(patternPos + 1) === patternChar) {
                extraLength++;
                patternPos++;
            }
            var hourLen = 1 + (extraLength & 1);
            var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
            var dayPeriodChar = 'a';
            var hourChar = getDefaultHourSymbolFromLocale(locale);
            if (hourChar == 'H' || hourChar == 'k') {
                dayPeriodLen = 0;
            }
            while (dayPeriodLen-- > 0) {
                skeletonCopy += dayPeriodChar;
            }
            while (hourLen-- > 0) {
                skeletonCopy = hourChar + skeletonCopy;
            }
        }
        else if (patternChar === 'J') {
            skeletonCopy += 'H';
        }
        else {
            skeletonCopy += patternChar;
        }
    }
    return skeletonCopy;
}
/**
 * Maps the [hour cycle type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)
 * of the given `locale` to the corresponding time pattern.
 * @param locale
 */
function getDefaultHourSymbolFromLocale(locale) {
    var hourCycle = locale.hourCycle;
    if (hourCycle === undefined &&
        // @ts-ignore hourCycle(s) is not identified yet
        locale.hourCycles &&
        // @ts-ignore
        locale.hourCycles.length) {
        // @ts-ignore
        hourCycle = locale.hourCycles[0];
    }
    if (hourCycle) {
        switch (hourCycle) {
            case 'h24':
                return 'k';
            case 'h23':
                return 'H';
            case 'h12':
                return 'h';
            case 'h11':
                return 'K';
            default:
                throw new Error('Invalid hourCycle');
        }
    }
    // TODO: Once hourCycle is fully supported remove the following with data generation
    var languageTag = locale.language;
    var regionTag;
    if (languageTag !== 'root') {
        regionTag = locale.maximize().region;
    }
    var hourCycles = timeData[regionTag || ''] ||
        timeData[languageTag || ''] ||
        timeData["".concat(languageTag, "-001")] ||
        timeData['001'];
    return hourCycles[0];
}

var _a;
var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(SPACE_SEPARATOR_REGEX.source, "*"));
var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(SPACE_SEPARATOR_REGEX.source, "*$"));
function createLocation(start, end) {
    return { start: start, end: end };
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
var hasNativeStartsWith = !!String.prototype.startsWith && '_a'.startsWith('a', 1);
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger
    ? Number.isSafeInteger
    : function (n) {
        return (typeof n === 'number' &&
            isFinite(n) &&
            Math.floor(n) === n &&
            Math.abs(n) <= 0x1fffffffffffff);
    };
// IE11 does not support y and u.
var REGEX_SUPPORTS_U_AND_Y = true;
try {
    var re = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    /**
     * legacy Edge or Xbox One browser
     * Unicode flag support: supported
     * Pattern_Syntax support: not supported
     * See https://github.com/formatjs/formatjs/issues/2822
     */
    REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec('a')) === null || _a === void 0 ? void 0 : _a[0]) === 'a';
}
catch (_) {
    REGEX_SUPPORTS_U_AND_Y = false;
}
var startsWith = hasNativeStartsWith
    ? // Native
        function startsWith(s, search, position) {
            return s.startsWith(search, position);
        }
    : // For IE11
        function startsWith(s, search, position) {
            return s.slice(position, position + search.length) === search;
        };
var fromCodePoint = hasNativeFromCodePoint
    ? String.fromCodePoint
    : // IE11
        function fromCodePoint() {
            var codePoints = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                codePoints[_i] = arguments[_i];
            }
            var elements = '';
            var length = codePoints.length;
            var i = 0;
            var code;
            while (length > i) {
                code = codePoints[i++];
                if (code > 0x10ffff)
                    throw RangeError(code + ' is not a valid code point');
                elements +=
                    code < 0x10000
                        ? String.fromCharCode(code)
                        : String.fromCharCode(((code -= 0x10000) >> 10) + 0xd800, (code % 0x400) + 0xdc00);
            }
            return elements;
        };
var fromEntries = 
// native
hasNativeFromEntries
    ? Object.fromEntries
    : // Ponyfill
        function fromEntries(entries) {
            var obj = {};
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var _a = entries_1[_i], k = _a[0], v = _a[1];
                obj[k] = v;
            }
            return obj;
        };
var codePointAt = hasNativeCodePointAt
    ? // Native
        function codePointAt(s, index) {
            return s.codePointAt(index);
        }
    : // IE 11
        function codePointAt(s, index) {
            var size = s.length;
            if (index < 0 || index >= size) {
                return undefined;
            }
            var first = s.charCodeAt(index);
            var second;
            return first < 0xd800 ||
                first > 0xdbff ||
                index + 1 === size ||
                (second = s.charCodeAt(index + 1)) < 0xdc00 ||
                second > 0xdfff
                ? first
                : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
        };
var trimStart = hasTrimStart
    ? // Native
        function trimStart(s) {
            return s.trimStart();
        }
    : // Ponyfill
        function trimStart(s) {
            return s.replace(SPACE_SEPARATOR_START_REGEX, '');
        };
var trimEnd = hasTrimEnd
    ? // Native
        function trimEnd(s) {
            return s.trimEnd();
        }
    : // Ponyfill
        function trimEnd(s) {
            return s.replace(SPACE_SEPARATOR_END_REGEX, '');
        };
// Prevent minifier to translate new RegExp to literal form that might cause syntax error on IE11.
function RE(s, flag) {
    return new RegExp(s, flag);
}
// #endregion
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
    // Native
    var IDENTIFIER_PREFIX_RE_1 = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var _a;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s);
        return (_a = match[1]) !== null && _a !== void 0 ? _a : '';
    };
}
else {
    // IE11
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var match = [];
        while (true) {
            var c = codePointAt(s, index);
            if (c === undefined || _isWhiteSpace(c) || _isPatternSyntax(c)) {
                break;
            }
            match.push(c);
            index += c >= 0x10000 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
    };
}
var Parser = /** @class */ (function () {
    function Parser(message, options) {
        if (options === void 0) { options = {}; }
        this.message = message;
        this.position = { offset: 0, line: 1, column: 1 };
        this.ignoreTag = !!options.ignoreTag;
        this.locale = options.locale;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    Parser.prototype.parse = function () {
        if (this.offset() !== 0) {
            throw Error('parser can only be used once');
        }
        return this.parseMessage(0, '', false);
    };
    Parser.prototype.parseMessage = function (nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
            var char = this.char();
            if (char === 123 /* `{` */) {
                var result = this.parseArgument(nestingLevel, expectingCloseTag);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else if (char === 125 /* `}` */ && nestingLevel > 0) {
                break;
            }
            else if (char === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) {
                var position = this.clonePosition();
                this.bump();
                elements.push({
                    type: TYPE.pound,
                    location: createLocation(position, this.clonePosition()),
                });
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                this.peek() === 47 // char code for '/'
            ) {
                if (expectingCloseTag) {
                    break;
                }
                else {
                    return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
                }
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                _isAlpha(this.peek() || 0)) {
                var result = this.parseTag(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else {
                var result = this.parseLiteral(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
        }
        return { val: elements, err: null };
    };
    /**
     * A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
     * [custom element name][] except that a dash is NOT always mandatory and uppercase letters
     * are accepted:
     *
     * ```
     * tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
     * tagName ::= [a-z] (PENChar)*
     * PENChar ::=
     *     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
     *     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
     *     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
     * ```
     *
     * [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
     * NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
     * since other tag-based engines like React allow it
     */
    Parser.prototype.parseTag = function (nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump(); // `<`
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf('/>')) {
            // Self closing tag
            return {
                val: {
                    type: TYPE.literal,
                    value: "<".concat(tagName, "/>"),
                    location: createLocation(startPosition, this.clonePosition()),
                },
                err: null,
            };
        }
        else if (this.bumpIf('>')) {
            var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
                return childrenResult;
            }
            var children = childrenResult.val;
            // Expecting a close tag
            var endTagStartPosition = this.clonePosition();
            if (this.bumpIf('</')) {
                if (this.isEOF() || !_isAlpha(this.char())) {
                    return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                var closingTagNameStartPosition = this.clonePosition();
                var closingTagName = this.parseTagName();
                if (tagName !== closingTagName) {
                    return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
                }
                this.bumpSpace();
                if (!this.bumpIf('>')) {
                    return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                return {
                    val: {
                        type: TYPE.tag,
                        value: tagName,
                        children: children,
                        location: createLocation(startPosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            else {
                return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
        }
        else {
            return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
    };
    /**
     * This method assumes that the caller has peeked ahead for the first tag character.
     */
    Parser.prototype.parseTagName = function () {
        var startOffset = this.offset();
        this.bump(); // the first tag name character
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
            this.bump();
        }
        return this.message.slice(startOffset, this.offset());
    };
    Parser.prototype.parseLiteral = function (nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = '';
        while (true) {
            var parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
                value += parseQuoteResult;
                continue;
            }
            var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
                value += parseUnquotedResult;
                continue;
            }
            var parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
                value += parseLeftAngleResult;
                continue;
            }
            break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
            val: { type: TYPE.literal, value: value, location: location },
            err: null,
        };
    };
    Parser.prototype.tryParseLeftAngleBracket = function () {
        if (!this.isEOF() &&
            this.char() === 60 /* `<` */ &&
            (this.ignoreTag ||
                // If at the opening tag or closing tag position, bail.
                !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump(); // `<`
            return '<';
        }
        return null;
    };
    /**
     * Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
     * a character that requires quoting (that is, "only where needed"), and works the same in
     * nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
     */
    Parser.prototype.tryParseQuote = function (parentArgType) {
        if (this.isEOF() || this.char() !== 39 /* `'` */) {
            return null;
        }
        // Parse escaped char following the apostrophe, or early return if there is no escaped char.
        // Check if is valid escaped character
        switch (this.peek()) {
            case 39 /* `'` */:
                // double quote, should return as a single quote.
                this.bump();
                this.bump();
                return "'";
            // '{', '<', '>', '}'
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35: // '#'
                if (parentArgType === 'plural' || parentArgType === 'selectordinal') {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump(); // apostrophe
        var codePoints = [this.char()]; // escaped char
        this.bump();
        // read chars until the optional closing apostrophe is found
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch === 39 /* `'` */) {
                if (this.peek() === 39 /* `'` */) {
                    codePoints.push(39);
                    // Bump one more time because we need to skip 2 characters.
                    this.bump();
                }
                else {
                    // Optional closing apostrophe.
                    this.bump();
                    break;
                }
            }
            else {
                codePoints.push(ch);
            }
            this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
    };
    Parser.prototype.tryParseUnquoted = function (nestingLevel, parentArgType) {
        if (this.isEOF()) {
            return null;
        }
        var ch = this.char();
        if (ch === 60 /* `<` */ ||
            ch === 123 /* `{` */ ||
            (ch === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) ||
            (ch === 125 /* `}` */ && nestingLevel > 0)) {
            return null;
        }
        else {
            this.bump();
            return fromCodePoint(ch);
        }
    };
    Parser.prototype.parseArgument = function (nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump(); // `{`
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125 /* `}` */) {
            this.bump();
            return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        // argument name
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
            // Simple argument: `{name}`
            case 125 /* `}` */: {
                this.bump(); // `}`
                return {
                    val: {
                        type: TYPE.argument,
                        // value does not include the opening and closing braces.
                        value: value,
                        location: createLocation(openingBracePosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            // Argument with options: `{name, format, ...}`
            case 44 /* `,` */: {
                this.bump(); // `,`
                this.bumpSpace();
                if (this.isEOF()) {
                    return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
                }
                return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
            }
            default:
                return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
    };
    /**
     * Advance the parser until the end of the identifier, if it is currently on
     * an identifier character. Return an empty string otherwise.
     */
    Parser.prototype.parseIdentifierIfPossible = function () {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return { value: value, location: location };
    };
    Parser.prototype.parseArgumentOptions = function (nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a;
        // Parse this range:
        // {name, type, style}
        //        ^---^
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
            case '':
                // Expecting a style string number, date, time, plural, selectordinal, or select.
                return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case 'number':
            case 'date':
            case 'time': {
                // Parse this range:
                // {name, number, style}
                //              ^-------^
                this.bumpSpace();
                var styleAndLocation = null;
                if (this.bumpIf(',')) {
                    this.bumpSpace();
                    var styleStartPosition = this.clonePosition();
                    var result = this.parseSimpleArgStyleIfPossible();
                    if (result.err) {
                        return result;
                    }
                    var style = trimEnd(result.val);
                    if (style.length === 0) {
                        return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    var styleLocation = createLocation(styleStartPosition, this.clonePosition());
                    styleAndLocation = { style: style, styleLocation: styleLocation };
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_1 = createLocation(openingBracePosition, this.clonePosition());
                // Extract style or skeleton
                if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, '::', 0)) {
                    // Skeleton starts with `::`.
                    var skeleton = trimStart(styleAndLocation.style.slice(2));
                    if (argType === 'number') {
                        var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                        if (result.err) {
                            return result;
                        }
                        return {
                            val: { type: TYPE.number, value: value, location: location_1, style: result.val },
                            err: null,
                        };
                    }
                    else {
                        if (skeleton.length === 0) {
                            return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                        }
                        var dateTimePattern = skeleton;
                        // Get "best match" pattern only if locale is passed, if not, let it
                        // pass as-is where `parseDateTimeSkeleton()` will throw an error
                        // for unsupported patterns.
                        if (this.locale) {
                            dateTimePattern = getBestPattern(skeleton, this.locale);
                        }
                        var style = {
                            type: SKELETON_TYPE.dateTime,
                            pattern: dateTimePattern,
                            location: styleAndLocation.styleLocation,
                            parsedOptions: this.shouldParseSkeletons
                                ? parseDateTimeSkeleton(dateTimePattern)
                                : {},
                        };
                        var type = argType === 'date' ? TYPE.date : TYPE.time;
                        return {
                            val: { type: type, value: value, location: location_1, style: style },
                            err: null,
                        };
                    }
                }
                // Regular style or no style.
                return {
                    val: {
                        type: argType === 'number'
                            ? TYPE.number
                            : argType === 'date'
                                ? TYPE.date
                                : TYPE.time,
                        value: value,
                        location: location_1,
                        style: (_a = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a !== void 0 ? _a : null,
                    },
                    err: null,
                };
            }
            case 'plural':
            case 'selectordinal':
            case 'select': {
                // Parse this range:
                // {name, plural, options}
                //              ^---------^
                var typeEndPosition_1 = this.clonePosition();
                this.bumpSpace();
                if (!this.bumpIf(',')) {
                    return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign({}, typeEndPosition_1)));
                }
                this.bumpSpace();
                // Parse offset:
                // {name, plural, offset:1, options}
                //                ^-----^
                //
                // or the first option:
                //
                // {name, plural, one {...} other {...}}
                //                ^--^
                var identifierAndLocation = this.parseIdentifierIfPossible();
                var pluralOffset = 0;
                if (argType !== 'select' && identifierAndLocation.value === 'offset') {
                    if (!this.bumpIf(':')) {
                        return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    this.bumpSpace();
                    var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                    if (result.err) {
                        return result;
                    }
                    // Parse another identifier for option parsing
                    this.bumpSpace();
                    identifierAndLocation = this.parseIdentifierIfPossible();
                    pluralOffset = result.val;
                }
                var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
                if (optionsResult.err) {
                    return optionsResult;
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_2 = createLocation(openingBracePosition, this.clonePosition());
                if (argType === 'select') {
                    return {
                        val: {
                            type: TYPE.select,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            location: location_2,
                        },
                        err: null,
                    };
                }
                else {
                    return {
                        val: {
                            type: TYPE.plural,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            offset: pluralOffset,
                            pluralType: argType === 'plural' ? 'cardinal' : 'ordinal',
                            location: location_2,
                        },
                        err: null,
                    };
                }
            }
            default:
                return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
    };
    Parser.prototype.tryParseArgumentClose = function (openingBracePosition) {
        // Parse: {value, number, ::currency/GBP }
        //
        if (this.isEOF() || this.char() !== 125 /* `}` */) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump(); // `}`
        return { val: true, err: null };
    };
    /**
     * See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
     */
    Parser.prototype.parseSimpleArgStyleIfPossible = function () {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
            var ch = this.char();
            switch (ch) {
                case 39 /* `'` */: {
                    // Treat apostrophe as quoting but include it in the style part.
                    // Find the end of the quoted literal text.
                    this.bump();
                    var apostrophePosition = this.clonePosition();
                    if (!this.bumpUntil("'")) {
                        return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                    }
                    this.bump();
                    break;
                }
                case 123 /* `{` */: {
                    nestedBraces += 1;
                    this.bump();
                    break;
                }
                case 125 /* `}` */: {
                    if (nestedBraces > 0) {
                        nestedBraces -= 1;
                    }
                    else {
                        return {
                            val: this.message.slice(startPosition.offset, this.offset()),
                            err: null,
                        };
                    }
                    break;
                }
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null,
        };
    };
    Parser.prototype.parseNumberSkeletonFromString = function (skeleton, location) {
        var tokens = [];
        try {
            tokens = parseNumberSkeletonFromString(skeleton);
        }
        catch (e) {
            return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
            val: {
                type: SKELETON_TYPE.number,
                tokens: tokens,
                location: location,
                parsedOptions: this.shouldParseSkeletons
                    ? parseNumberSkeleton(tokens)
                    : {},
            },
            err: null,
        };
    };
    /**
     * @param nesting_level The current nesting level of messages.
     *     This can be positive when parsing message fragment in select or plural argument options.
     * @param parent_arg_type The parent argument's type.
     * @param parsed_first_identifier If provided, this is the first identifier-like selector of
     *     the argument. It is a by-product of a previous parsing attempt.
     * @param expecting_close_tag If true, this message is directly or indirectly nested inside
     *     between a pair of opening and closing tags. The nested message will not parse beyond
     *     the closing tag boundary.
     */
    Parser.prototype.tryParsePluralOrSelectOptions = function (nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a;
        var hasOtherClause = false;
        var options = [];
        var parsedSelectors = new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        // Parse:
        // one {one apple}
        // ^--^
        while (true) {
            if (selector.length === 0) {
                var startPosition = this.clonePosition();
                if (parentArgType !== 'select' && this.bumpIf('=')) {
                    // Try parse `={number}` selector
                    var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (result.err) {
                        return result;
                    }
                    selectorLocation = createLocation(startPosition, this.clonePosition());
                    selector = this.message.slice(startPosition.offset, this.offset());
                }
                else {
                    break;
                }
            }
            // Duplicate selector clauses
            if (parsedSelectors.has(selector)) {
                return this.error(parentArgType === 'select'
                    ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR
                    : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === 'other') {
                hasOtherClause = true;
            }
            // Parse:
            // one {one apple}
            //     ^----------^
            this.bumpSpace();
            var openingBracePosition = this.clonePosition();
            if (!this.bumpIf('{')) {
                return this.error(parentArgType === 'select'
                    ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
                    : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
                return fragmentResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
                return argCloseResult;
            }
            options.push([
                selector,
                {
                    value: fragmentResult.val,
                    location: createLocation(openingBracePosition, this.clonePosition()),
                },
            ]);
            // Keep track of the existing selectors
            parsedSelectors.add(selector);
            // Prep next selector clause.
            this.bumpSpace();
            (_a = this.parseIdentifierIfPossible(), selector = _a.value, selectorLocation = _a.location);
        }
        if (options.length === 0) {
            return this.error(parentArgType === 'select'
                ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR
                : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return { val: options, err: null };
    };
    Parser.prototype.tryParseDecimalInteger = function (expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf('+')) {
        }
        else if (this.bumpIf('-')) {
            sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch >= 48 /* `0` */ && ch <= 57 /* `9` */) {
                hasDigits = true;
                decimal = decimal * 10 + (ch - 48);
                this.bump();
            }
            else {
                break;
            }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
            return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
        }
        return { val: decimal, err: null };
    };
    Parser.prototype.offset = function () {
        return this.position.offset;
    };
    Parser.prototype.isEOF = function () {
        return this.offset() === this.message.length;
    };
    Parser.prototype.clonePosition = function () {
        // This is much faster than `Object.assign` or spread.
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column,
        };
    };
    /**
     * Return the code point at the current position of the parser.
     * Throws if the index is out of bound.
     */
    Parser.prototype.char = function () {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error('out of bound');
        }
        var code = codePointAt(this.message, offset);
        if (code === undefined) {
            throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
        }
        return code;
    };
    Parser.prototype.error = function (kind, location) {
        return {
            val: null,
            err: {
                kind: kind,
                message: this.message,
                location: location,
            },
        };
    };
    /** Bump the parser to the next UTF-16 code unit. */
    Parser.prototype.bump = function () {
        if (this.isEOF()) {
            return;
        }
        var code = this.char();
        if (code === 10 /* '\n' */) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        }
        else {
            this.position.column += 1;
            // 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
            this.position.offset += code < 0x10000 ? 1 : 2;
        }
    };
    /**
     * If the substring starting at the current position of the parser has
     * the given prefix, then bump the parser to the character immediately
     * following the prefix and return true. Otherwise, don't bump the parser
     * and return false.
     */
    Parser.prototype.bumpIf = function (prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
            for (var i = 0; i < prefix.length; i++) {
                this.bump();
            }
            return true;
        }
        return false;
    };
    /**
     * Bump the parser until the pattern character is found and return `true`.
     * Otherwise bump to the end of the file and return `false`.
     */
    Parser.prototype.bumpUntil = function (pattern) {
        var currentOffset = this.offset();
        var index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
            this.bumpTo(index);
            return true;
        }
        else {
            this.bumpTo(this.message.length);
            return false;
        }
    };
    /**
     * Bump the parser to the target offset.
     * If target offset is beyond the end of the input, bump the parser to the end of the input.
     */
    Parser.prototype.bumpTo = function (targetOffset) {
        if (this.offset() > targetOffset) {
            throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
            var offset = this.offset();
            if (offset === targetOffset) {
                break;
            }
            if (offset > targetOffset) {
                throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    };
    /** advance the parser through all whitespace to the next non-whitespace code unit. */
    Parser.prototype.bumpSpace = function () {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
            this.bump();
        }
    };
    /**
     * Peek at the *next* Unicode codepoint in the input without advancing the parser.
     * If the input has been exhausted, then this returns null.
     */
    Parser.prototype.peek = function () {
        if (this.isEOF()) {
            return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 0x10000 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
    };
    return Parser;
}());
/**
 * This check if codepoint is alphabet (lower & uppercase)
 * @param codepoint
 * @returns
 */
function _isAlpha(codepoint) {
    return ((codepoint >= 97 && codepoint <= 122) ||
        (codepoint >= 65 && codepoint <= 90));
}
function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47; /* '/' */
}
/** See `parseTag` function docs. */
function _isPotentialElementNameChar(c) {
    return (c === 45 /* '-' */ ||
        c === 46 /* '.' */ ||
        (c >= 48 && c <= 57) /* 0..9 */ ||
        c === 95 /* '_' */ ||
        (c >= 97 && c <= 122) /** a..z */ ||
        (c >= 65 && c <= 90) /* A..Z */ ||
        c == 0xb7 ||
        (c >= 0xc0 && c <= 0xd6) ||
        (c >= 0xd8 && c <= 0xf6) ||
        (c >= 0xf8 && c <= 0x37d) ||
        (c >= 0x37f && c <= 0x1fff) ||
        (c >= 0x200c && c <= 0x200d) ||
        (c >= 0x203f && c <= 0x2040) ||
        (c >= 0x2070 && c <= 0x218f) ||
        (c >= 0x2c00 && c <= 0x2fef) ||
        (c >= 0x3001 && c <= 0xd7ff) ||
        (c >= 0xf900 && c <= 0xfdcf) ||
        (c >= 0xfdf0 && c <= 0xfffd) ||
        (c >= 0x10000 && c <= 0xeffff));
}
/**
 * Code point equivalent of regex `\p{White_Space}`.
 * From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isWhiteSpace(c) {
    return ((c >= 0x0009 && c <= 0x000d) ||
        c === 0x0020 ||
        c === 0x0085 ||
        (c >= 0x200e && c <= 0x200f) ||
        c === 0x2028 ||
        c === 0x2029);
}
/**
 * Code point equivalent of regex `\p{Pattern_Syntax}`.
 * See https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isPatternSyntax(c) {
    return ((c >= 0x0021 && c <= 0x0023) ||
        c === 0x0024 ||
        (c >= 0x0025 && c <= 0x0027) ||
        c === 0x0028 ||
        c === 0x0029 ||
        c === 0x002a ||
        c === 0x002b ||
        c === 0x002c ||
        c === 0x002d ||
        (c >= 0x002e && c <= 0x002f) ||
        (c >= 0x003a && c <= 0x003b) ||
        (c >= 0x003c && c <= 0x003e) ||
        (c >= 0x003f && c <= 0x0040) ||
        c === 0x005b ||
        c === 0x005c ||
        c === 0x005d ||
        c === 0x005e ||
        c === 0x0060 ||
        c === 0x007b ||
        c === 0x007c ||
        c === 0x007d ||
        c === 0x007e ||
        c === 0x00a1 ||
        (c >= 0x00a2 && c <= 0x00a5) ||
        c === 0x00a6 ||
        c === 0x00a7 ||
        c === 0x00a9 ||
        c === 0x00ab ||
        c === 0x00ac ||
        c === 0x00ae ||
        c === 0x00b0 ||
        c === 0x00b1 ||
        c === 0x00b6 ||
        c === 0x00bb ||
        c === 0x00bf ||
        c === 0x00d7 ||
        c === 0x00f7 ||
        (c >= 0x2010 && c <= 0x2015) ||
        (c >= 0x2016 && c <= 0x2017) ||
        c === 0x2018 ||
        c === 0x2019 ||
        c === 0x201a ||
        (c >= 0x201b && c <= 0x201c) ||
        c === 0x201d ||
        c === 0x201e ||
        c === 0x201f ||
        (c >= 0x2020 && c <= 0x2027) ||
        (c >= 0x2030 && c <= 0x2038) ||
        c === 0x2039 ||
        c === 0x203a ||
        (c >= 0x203b && c <= 0x203e) ||
        (c >= 0x2041 && c <= 0x2043) ||
        c === 0x2044 ||
        c === 0x2045 ||
        c === 0x2046 ||
        (c >= 0x2047 && c <= 0x2051) ||
        c === 0x2052 ||
        c === 0x2053 ||
        (c >= 0x2055 && c <= 0x205e) ||
        (c >= 0x2190 && c <= 0x2194) ||
        (c >= 0x2195 && c <= 0x2199) ||
        (c >= 0x219a && c <= 0x219b) ||
        (c >= 0x219c && c <= 0x219f) ||
        c === 0x21a0 ||
        (c >= 0x21a1 && c <= 0x21a2) ||
        c === 0x21a3 ||
        (c >= 0x21a4 && c <= 0x21a5) ||
        c === 0x21a6 ||
        (c >= 0x21a7 && c <= 0x21ad) ||
        c === 0x21ae ||
        (c >= 0x21af && c <= 0x21cd) ||
        (c >= 0x21ce && c <= 0x21cf) ||
        (c >= 0x21d0 && c <= 0x21d1) ||
        c === 0x21d2 ||
        c === 0x21d3 ||
        c === 0x21d4 ||
        (c >= 0x21d5 && c <= 0x21f3) ||
        (c >= 0x21f4 && c <= 0x22ff) ||
        (c >= 0x2300 && c <= 0x2307) ||
        c === 0x2308 ||
        c === 0x2309 ||
        c === 0x230a ||
        c === 0x230b ||
        (c >= 0x230c && c <= 0x231f) ||
        (c >= 0x2320 && c <= 0x2321) ||
        (c >= 0x2322 && c <= 0x2328) ||
        c === 0x2329 ||
        c === 0x232a ||
        (c >= 0x232b && c <= 0x237b) ||
        c === 0x237c ||
        (c >= 0x237d && c <= 0x239a) ||
        (c >= 0x239b && c <= 0x23b3) ||
        (c >= 0x23b4 && c <= 0x23db) ||
        (c >= 0x23dc && c <= 0x23e1) ||
        (c >= 0x23e2 && c <= 0x2426) ||
        (c >= 0x2427 && c <= 0x243f) ||
        (c >= 0x2440 && c <= 0x244a) ||
        (c >= 0x244b && c <= 0x245f) ||
        (c >= 0x2500 && c <= 0x25b6) ||
        c === 0x25b7 ||
        (c >= 0x25b8 && c <= 0x25c0) ||
        c === 0x25c1 ||
        (c >= 0x25c2 && c <= 0x25f7) ||
        (c >= 0x25f8 && c <= 0x25ff) ||
        (c >= 0x2600 && c <= 0x266e) ||
        c === 0x266f ||
        (c >= 0x2670 && c <= 0x2767) ||
        c === 0x2768 ||
        c === 0x2769 ||
        c === 0x276a ||
        c === 0x276b ||
        c === 0x276c ||
        c === 0x276d ||
        c === 0x276e ||
        c === 0x276f ||
        c === 0x2770 ||
        c === 0x2771 ||
        c === 0x2772 ||
        c === 0x2773 ||
        c === 0x2774 ||
        c === 0x2775 ||
        (c >= 0x2794 && c <= 0x27bf) ||
        (c >= 0x27c0 && c <= 0x27c4) ||
        c === 0x27c5 ||
        c === 0x27c6 ||
        (c >= 0x27c7 && c <= 0x27e5) ||
        c === 0x27e6 ||
        c === 0x27e7 ||
        c === 0x27e8 ||
        c === 0x27e9 ||
        c === 0x27ea ||
        c === 0x27eb ||
        c === 0x27ec ||
        c === 0x27ed ||
        c === 0x27ee ||
        c === 0x27ef ||
        (c >= 0x27f0 && c <= 0x27ff) ||
        (c >= 0x2800 && c <= 0x28ff) ||
        (c >= 0x2900 && c <= 0x2982) ||
        c === 0x2983 ||
        c === 0x2984 ||
        c === 0x2985 ||
        c === 0x2986 ||
        c === 0x2987 ||
        c === 0x2988 ||
        c === 0x2989 ||
        c === 0x298a ||
        c === 0x298b ||
        c === 0x298c ||
        c === 0x298d ||
        c === 0x298e ||
        c === 0x298f ||
        c === 0x2990 ||
        c === 0x2991 ||
        c === 0x2992 ||
        c === 0x2993 ||
        c === 0x2994 ||
        c === 0x2995 ||
        c === 0x2996 ||
        c === 0x2997 ||
        c === 0x2998 ||
        (c >= 0x2999 && c <= 0x29d7) ||
        c === 0x29d8 ||
        c === 0x29d9 ||
        c === 0x29da ||
        c === 0x29db ||
        (c >= 0x29dc && c <= 0x29fb) ||
        c === 0x29fc ||
        c === 0x29fd ||
        (c >= 0x29fe && c <= 0x2aff) ||
        (c >= 0x2b00 && c <= 0x2b2f) ||
        (c >= 0x2b30 && c <= 0x2b44) ||
        (c >= 0x2b45 && c <= 0x2b46) ||
        (c >= 0x2b47 && c <= 0x2b4c) ||
        (c >= 0x2b4d && c <= 0x2b73) ||
        (c >= 0x2b74 && c <= 0x2b75) ||
        (c >= 0x2b76 && c <= 0x2b95) ||
        c === 0x2b96 ||
        (c >= 0x2b97 && c <= 0x2bff) ||
        (c >= 0x2e00 && c <= 0x2e01) ||
        c === 0x2e02 ||
        c === 0x2e03 ||
        c === 0x2e04 ||
        c === 0x2e05 ||
        (c >= 0x2e06 && c <= 0x2e08) ||
        c === 0x2e09 ||
        c === 0x2e0a ||
        c === 0x2e0b ||
        c === 0x2e0c ||
        c === 0x2e0d ||
        (c >= 0x2e0e && c <= 0x2e16) ||
        c === 0x2e17 ||
        (c >= 0x2e18 && c <= 0x2e19) ||
        c === 0x2e1a ||
        c === 0x2e1b ||
        c === 0x2e1c ||
        c === 0x2e1d ||
        (c >= 0x2e1e && c <= 0x2e1f) ||
        c === 0x2e20 ||
        c === 0x2e21 ||
        c === 0x2e22 ||
        c === 0x2e23 ||
        c === 0x2e24 ||
        c === 0x2e25 ||
        c === 0x2e26 ||
        c === 0x2e27 ||
        c === 0x2e28 ||
        c === 0x2e29 ||
        (c >= 0x2e2a && c <= 0x2e2e) ||
        c === 0x2e2f ||
        (c >= 0x2e30 && c <= 0x2e39) ||
        (c >= 0x2e3a && c <= 0x2e3b) ||
        (c >= 0x2e3c && c <= 0x2e3f) ||
        c === 0x2e40 ||
        c === 0x2e41 ||
        c === 0x2e42 ||
        (c >= 0x2e43 && c <= 0x2e4f) ||
        (c >= 0x2e50 && c <= 0x2e51) ||
        c === 0x2e52 ||
        (c >= 0x2e53 && c <= 0x2e7f) ||
        (c >= 0x3001 && c <= 0x3003) ||
        c === 0x3008 ||
        c === 0x3009 ||
        c === 0x300a ||
        c === 0x300b ||
        c === 0x300c ||
        c === 0x300d ||
        c === 0x300e ||
        c === 0x300f ||
        c === 0x3010 ||
        c === 0x3011 ||
        (c >= 0x3012 && c <= 0x3013) ||
        c === 0x3014 ||
        c === 0x3015 ||
        c === 0x3016 ||
        c === 0x3017 ||
        c === 0x3018 ||
        c === 0x3019 ||
        c === 0x301a ||
        c === 0x301b ||
        c === 0x301c ||
        c === 0x301d ||
        (c >= 0x301e && c <= 0x301f) ||
        c === 0x3020 ||
        c === 0x3030 ||
        c === 0xfd3e ||
        c === 0xfd3f ||
        (c >= 0xfe45 && c <= 0xfe46));
}

function pruneLocation(els) {
    els.forEach(function (el) {
        delete el.location;
        if (isSelectElement(el) || isPluralElement(el)) {
            for (var k in el.options) {
                delete el.options[k].location;
                pruneLocation(el.options[k].value);
            }
        }
        else if (isNumberElement(el) && isNumberSkeleton(el.style)) {
            delete el.style.location;
        }
        else if ((isDateElement(el) || isTimeElement(el)) &&
            isDateTimeSkeleton(el.style)) {
            delete el.style.location;
        }
        else if (isTagElement(el)) {
            pruneLocation(el.children);
        }
    });
}
function parse(message, opts) {
    if (opts === void 0) { opts = {}; }
    opts = __assign({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
    var result = new Parser(message, opts).parse();
    if (result.err) {
        var error = SyntaxError(ErrorKind[result.err.kind]);
        // @ts-expect-error Assign to error object
        error.location = result.err.location;
        // @ts-expect-error Assign to error object
        error.originalMessage = result.err.message;
        throw error;
    }
    if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
    }
    return result.val;
}
// only for testing
var _Parser = Parser;

//
// Main
//
function memoize(fn, options) {
    var cache = options && options.cache ? options.cache : cacheDefault;
    var serializer = options && options.serializer ? options.serializer : serializerDefault;
    var strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache: cache,
        serializer: serializer,
    });
}
//
// Strategy
//
function isPrimitive(value) {
    return (value == null || typeof value === 'number' || typeof value === 'boolean'); // || typeof value === "string" 'unsafe' primitive for our needs
}
function monadic(fn, cache, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
var serializerDefault = function () {
    return JSON.stringify(arguments);
};
//
// Cache
//
function ObjectWithoutPrototypeCache() {
    this.cache = Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.get = function (key) {
    return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
    this.cache[key] = value;
};
var cacheDefault = {
    create: function create() {
        // @ts-ignore
        return new ObjectWithoutPrototypeCache();
    },
};
var strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic,
};

var ErrorCode;
(function (ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = /** @class */ (function (_super) {
    __extends(FormatError, _super);
    function FormatError(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
    }
    FormatError.prototype.toString = function () {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    };
    return FormatError;
}(Error));
var InvalidValueError = /** @class */ (function (_super) {
    __extends(InvalidValueError, _super);
    function InvalidValueError(variableId, value, options, originalMessage) {
        return _super.call(this, "Invalid values for \"".concat(variableId, "\": \"").concat(value, "\". Options are \"").concat(Object.keys(options).join('", "'), "\""), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueError;
}(FormatError));
var InvalidValueTypeError = /** @class */ (function (_super) {
    __extends(InvalidValueTypeError, _super);
    function InvalidValueTypeError(value, type, originalMessage) {
        return _super.call(this, "Value for \"".concat(value, "\" must be of type ").concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueTypeError;
}(FormatError));
var MissingValueError = /** @class */ (function (_super) {
    __extends(MissingValueError, _super);
    function MissingValueError(variableId, originalMessage) {
        return _super.call(this, "The intl string context variable \"".concat(variableId, "\" was not provided to the string \"").concat(originalMessage, "\""), ErrorCode.MISSING_VALUE, originalMessage) || this;
    }
    return MissingValueError;
}(FormatError));

var PART_TYPE;
(function (PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== PART_TYPE.literal ||
            part.type !== PART_TYPE.literal) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === 'function';
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && isLiteralElement(els[0])) {
        return [
            {
                type: PART_TYPE.literal,
                value: els[0].value,
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if (isLiteralElement(el)) {
            result.push({
                type: PART_TYPE.literal,
                value: el.value,
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if (isPoundElement(el)) {
            if (typeof currentPluralValue === 'number') {
                result.push({
                    type: PART_TYPE.literal,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue),
                });
            }
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if (isArgumentElement(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: typeof value === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (isDateElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.date[el.style]
                : isDateTimeSkeleton(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isTimeElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : isDateTimeSkeleton(el.style)
                    ? el.style.parsedOptions
                    : formats.time.medium;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isNumberElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : isNumberSkeleton(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            if (style && style.scale) {
                value =
                    value *
                        (style.scale || 1);
            }
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isTagElement(el)) {
            var children = el.children, value_1 = el.value;
            var formatFn = values[value_1];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new InvalidValueTypeError(value_1, 'function', originalMessage);
            }
            var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            var chunks = formatFn(parts.map(function (p) { return p.value; }));
            if (!Array.isArray(chunks)) {
                chunks = [chunks];
            }
            result.push.apply(result, chunks.map(function (c) {
                return {
                    type: typeof c === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                    value: c,
                };
            }));
        }
        if (isSelectElement(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if (isPluralElement(el)) {
            var opt = el.options["=".concat(value)];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", ErrorCode.MISSING_INTL_API, originalMessage);
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return __assign(__assign(__assign({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = __assign(__assign({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, __assign({}, defaultConfig));
}
function createFastMemoizeCache$1(store) {
    return {
        create: function () {
            return {
                get: function (key) {
                    return store[key];
                },
                set: function (key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.NumberFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache$1(cache.number),
            strategy: strategies.variadic,
        }),
        getDateTimeFormat: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.DateTimeFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache$1(cache.dateTime),
            strategy: strategies.variadic,
        }),
        getPluralRules: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.PluralRules).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache$1(cache.pluralRules),
            strategy: strategies.variadic,
        }),
    };
}
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            var parts = _this.formatToParts(values);
            // Hot path for straight simple msg translations
            if (parts.length === 1) {
                return parts[0].value;
            }
            var result = parts.reduce(function (all, part) {
                if (!all.length ||
                    part.type !== PART_TYPE.literal ||
                    typeof all[all.length - 1] !== 'string') {
                    all.push(part.value);
                }
                else {
                    all[all.length - 1] += part.value;
                }
                return all;
            }, []);
            if (result.length <= 1) {
                return result[0] || '';
            }
            return result;
        };
        this.formatToParts = function (values) {
            return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.resolvedOptions = function () {
            var _a;
            return ({
                locale: ((_a = _this.resolvedLocale) === null || _a === void 0 ? void 0 : _a.toString()) ||
                    Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
            });
        };
        this.getAst = function () { return _this.ast; };
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.resolvedLocale = IntlMessageFormat.resolveLocale(locales);
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            var _a = opts || {}, formatters = _a.formatters, parseOpts = __rest(_a, ["formatters"]);
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, __assign(__assign({}, parseOpts), { locale: this.resolvedLocale }));
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    Object.defineProperty(IntlMessageFormat, "defaultLocale", {
        get: function () {
            if (!IntlMessageFormat.memoizedDefaultLocale) {
                IntlMessageFormat.memoizedDefaultLocale =
                    new Intl.NumberFormat().resolvedOptions().locale;
            }
            return IntlMessageFormat.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
    });
    IntlMessageFormat.memoizedDefaultLocale = null;
    IntlMessageFormat.resolveLocale = function (locales) {
        if (typeof Intl.Locale === 'undefined') {
            return;
        }
        var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
        if (supportedLocales.length > 0) {
            return new Intl.Locale(supportedLocales[0]);
        }
        return new Intl.Locale(typeof locales === 'string' ? locales : locales[0]);
    };
    IntlMessageFormat.__parse = parse;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            integer: {
                maximumFractionDigits: 0,
            },
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

var IntlErrorCode;
(function (IntlErrorCode) {
    IntlErrorCode["FORMAT_ERROR"] = "FORMAT_ERROR";
    IntlErrorCode["UNSUPPORTED_FORMATTER"] = "UNSUPPORTED_FORMATTER";
    IntlErrorCode["INVALID_CONFIG"] = "INVALID_CONFIG";
    IntlErrorCode["MISSING_DATA"] = "MISSING_DATA";
    IntlErrorCode["MISSING_TRANSLATION"] = "MISSING_TRANSLATION";
})(IntlErrorCode || (IntlErrorCode = {}));
var IntlError = /** @class */ (function (_super) {
    __extends(IntlError, _super);
    function IntlError(code, message, exception) {
        var _this = this;
        var err = exception
            ? exception instanceof Error
                ? exception
                : new Error(String(exception))
            : undefined;
        _this = _super.call(this, "[@formatjs/intl Error ".concat(code, "] ").concat(message, "\n").concat(err ? "\n".concat(err.message, "\n").concat(err.stack) : '')) || this;
        _this.code = code;
        // @ts-ignore just so we don't need to declare dep on @types/node
        if (typeof Error.captureStackTrace === 'function') {
            // @ts-ignore just so we don't need to declare dep on @types/node
            Error.captureStackTrace(_this, IntlError);
        }
        return _this;
    }
    return IntlError;
}(Error));
var UnsupportedFormatterError = /** @class */ (function (_super) {
    __extends(UnsupportedFormatterError, _super);
    function UnsupportedFormatterError(message, exception) {
        return _super.call(this, IntlErrorCode.UNSUPPORTED_FORMATTER, message, exception) || this;
    }
    return UnsupportedFormatterError;
}(IntlError));
var InvalidConfigError = /** @class */ (function (_super) {
    __extends(InvalidConfigError, _super);
    function InvalidConfigError(message, exception) {
        return _super.call(this, IntlErrorCode.INVALID_CONFIG, message, exception) || this;
    }
    return InvalidConfigError;
}(IntlError));
var MissingDataError = /** @class */ (function (_super) {
    __extends(MissingDataError, _super);
    function MissingDataError(message, exception) {
        return _super.call(this, IntlErrorCode.MISSING_DATA, message, exception) || this;
    }
    return MissingDataError;
}(IntlError));
var IntlFormatError = /** @class */ (function (_super) {
    __extends(IntlFormatError, _super);
    function IntlFormatError(message, locale, exception) {
        var _this = _super.call(this, IntlErrorCode.FORMAT_ERROR, "".concat(message, "\nLocale: ").concat(locale, "\n"), exception) || this;
        _this.locale = locale;
        return _this;
    }
    return IntlFormatError;
}(IntlError));
var MessageFormatError = /** @class */ (function (_super) {
    __extends(MessageFormatError, _super);
    function MessageFormatError(message, locale, descriptor, exception) {
        var _this = _super.call(this, "".concat(message, "\nMessageID: ").concat(descriptor === null || descriptor === void 0 ? void 0 : descriptor.id, "\nDefault Message: ").concat(descriptor === null || descriptor === void 0 ? void 0 : descriptor.defaultMessage, "\nDescription: ").concat(descriptor === null || descriptor === void 0 ? void 0 : descriptor.description, "\n"), locale, exception) || this;
        _this.descriptor = descriptor;
        _this.locale = locale;
        return _this;
    }
    return MessageFormatError;
}(IntlFormatError));
var MissingTranslationError = /** @class */ (function (_super) {
    __extends(MissingTranslationError, _super);
    function MissingTranslationError(descriptor, locale) {
        var _this = _super.call(this, IntlErrorCode.MISSING_TRANSLATION, "Missing message: \"".concat(descriptor.id, "\" for locale \"").concat(locale, "\", using ").concat(descriptor.defaultMessage
            ? "default message (".concat(typeof descriptor.defaultMessage === 'string'
                ? descriptor.defaultMessage
                : descriptor.defaultMessage
                    .map(function (e) { var _a; return (_a = e.value) !== null && _a !== void 0 ? _a : JSON.stringify(e); })
                    .join(), ")")
            : 'id', " as fallback.")) || this;
        _this.descriptor = descriptor;
        return _this;
    }
    return MissingTranslationError;
}(IntlError));

function filterProps(props, allowlist, defaults) {
    if (defaults === void 0) { defaults = {}; }
    return allowlist.reduce(function (filtered, name) {
        if (name in props) {
            filtered[name] = props[name];
        }
        else if (name in defaults) {
            filtered[name] = defaults[name];
        }
        return filtered;
    }, {});
}
var defaultErrorHandler = function (error) {
    // @ts-ignore just so we don't need to declare dep on @types/node
    if ("production" !== 'production') {
        console.error(error);
    }
};
var defaultWarnHandler = function (warning) {
    // @ts-ignore just so we don't need to declare dep on @types/node
    if ("production" !== 'production') {
        console.warn(warning);
    }
};
var DEFAULT_INTL_CONFIG$1 = {
    formats: {},
    messages: {},
    timeZone: undefined,
    defaultLocale: 'en',
    defaultFormats: {},
    fallbackOnEmptyString: true,
    onError: defaultErrorHandler,
    onWarn: defaultWarnHandler,
};
function createIntlCache() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
        list: {},
        displayNames: {},
    };
}
function createFastMemoizeCache(store) {
    return {
        create: function () {
            return {
                get: function (key) {
                    return store[key];
                },
                set: function (key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
/**
 * Create intl formatters and populate cache
 * @param cache explicit cache to prevent leaking memory
 */
function createFormatters(cache) {
    if (cache === void 0) { cache = createIntlCache(); }
    var RelativeTimeFormat = Intl.RelativeTimeFormat;
    var ListFormat = Intl.ListFormat;
    var DisplayNames = Intl.DisplayNames;
    var getDateTimeFormat = memoize(function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new ((_a = Intl.DateTimeFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
        cache: createFastMemoizeCache(cache.dateTime),
        strategy: strategies.variadic,
    });
    var getNumberFormat = memoize(function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new ((_a = Intl.NumberFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
        cache: createFastMemoizeCache(cache.number),
        strategy: strategies.variadic,
    });
    var getPluralRules = memoize(function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new ((_a = Intl.PluralRules).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
        cache: createFastMemoizeCache(cache.pluralRules),
        strategy: strategies.variadic,
    });
    return {
        getDateTimeFormat: getDateTimeFormat,
        getNumberFormat: getNumberFormat,
        getMessageFormat: memoize(function (message, locales, overrideFormats, opts) {
            return new IntlMessageFormat(message, locales, overrideFormats, __assign({ formatters: {
                    getNumberFormat: getNumberFormat,
                    getDateTimeFormat: getDateTimeFormat,
                    getPluralRules: getPluralRules,
                } }, (opts || {})));
        }, {
            cache: createFastMemoizeCache(cache.message),
            strategy: strategies.variadic,
        }),
        getRelativeTimeFormat: memoize(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (RelativeTimeFormat.bind.apply(RelativeTimeFormat, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.relativeTime),
            strategy: strategies.variadic,
        }),
        getPluralRules: getPluralRules,
        getListFormat: memoize(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (ListFormat.bind.apply(ListFormat, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.list),
            strategy: strategies.variadic,
        }),
        getDisplayNames: memoize(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (DisplayNames.bind.apply(DisplayNames, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.displayNames),
            strategy: strategies.variadic,
        }),
    };
}
function getNamedFormat(formats, type, name, onError) {
    var formatType = formats && formats[type];
    var format;
    if (formatType) {
        format = formatType[name];
    }
    if (format) {
        return format;
    }
    onError(new UnsupportedFormatterError("No ".concat(type, " format named: ").concat(name)));
}

function setTimeZoneInOptions(opts, timeZone) {
    return Object.keys(opts).reduce(function (all, k) {
        all[k] = __assign({ timeZone: timeZone }, opts[k]);
        return all;
    }, {});
}
function deepMergeOptions(opts1, opts2) {
    var keys = Object.keys(__assign(__assign({}, opts1), opts2));
    return keys.reduce(function (all, k) {
        all[k] = __assign(__assign({}, (opts1[k] || {})), (opts2[k] || {}));
        return all;
    }, {});
}
function deepMergeFormatsAndSetTimeZone(f1, timeZone) {
    if (!timeZone) {
        return f1;
    }
    var mfFormats = IntlMessageFormat.formats;
    return __assign(__assign(__assign({}, mfFormats), f1), { date: deepMergeOptions(setTimeZoneInOptions(mfFormats.date, timeZone), setTimeZoneInOptions(f1.date || {}, timeZone)), time: deepMergeOptions(setTimeZoneInOptions(mfFormats.time, timeZone), setTimeZoneInOptions(f1.time || {}, timeZone)) });
}
var formatMessage$1 = function (_a, state, messageDescriptor, values, opts) {
    var locale = _a.locale, formats = _a.formats, messages = _a.messages, defaultLocale = _a.defaultLocale, defaultFormats = _a.defaultFormats, fallbackOnEmptyString = _a.fallbackOnEmptyString, onError = _a.onError, timeZone = _a.timeZone, defaultRichTextElements = _a.defaultRichTextElements;
    if (messageDescriptor === void 0) { messageDescriptor = { id: '' }; }
    var msgId = messageDescriptor.id, defaultMessage = messageDescriptor.defaultMessage;
    // `id` is a required field of a Message Descriptor.
    invariant$1(!!msgId, "[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");
    var id = String(msgId);
    var message = 
    // In case messages is Object.create(null)
    // e.g import('foo.json') from webpack)
    // See https://github.com/formatjs/formatjs/issues/1914
    messages &&
        Object.prototype.hasOwnProperty.call(messages, id) &&
        messages[id];
    // IMPORTANT: Hot path if `message` is AST with a single literal node
    if (Array.isArray(message) &&
        message.length === 1 &&
        message[0].type === TYPE.literal) {
        return message[0].value;
    }
    // IMPORTANT: Hot path straight lookup for performance
    if (!values &&
        message &&
        typeof message === 'string' &&
        !defaultRichTextElements) {
        return message.replace(/'\{(.*?)\}'/gi, "{$1}");
    }
    values = __assign(__assign({}, defaultRichTextElements), (values || {}));
    formats = deepMergeFormatsAndSetTimeZone(formats, timeZone);
    defaultFormats = deepMergeFormatsAndSetTimeZone(defaultFormats, timeZone);
    if (!message) {
        if (fallbackOnEmptyString === false && message === '') {
            return message;
        }
        if (!defaultMessage ||
            (locale && locale.toLowerCase() !== defaultLocale.toLowerCase())) {
            // This prevents warnings from littering the console in development
            // when no `messages` are passed into the <IntlProvider> for the
            // default locale.
            onError(new MissingTranslationError(messageDescriptor, locale));
        }
        if (defaultMessage) {
            try {
                var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats, opts);
                return formatter.format(values);
            }
            catch (e) {
                onError(new MessageFormatError("Error formatting default message for: \"".concat(id, "\", rendering default message verbatim"), locale, messageDescriptor, e));
                return typeof defaultMessage === 'string' ? defaultMessage : id;
            }
        }
        return id;
    }
    // We have the translated message
    try {
        var formatter = state.getMessageFormat(message, locale, formats, __assign({ formatters: state }, (opts || {})));
        return formatter.format(values);
    }
    catch (e) {
        onError(new MessageFormatError("Error formatting message: \"".concat(id, "\", using ").concat(defaultMessage ? 'default message' : 'id', " as fallback."), locale, messageDescriptor, e));
    }
    if (defaultMessage) {
        try {
            var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats, opts);
            return formatter.format(values);
        }
        catch (e) {
            onError(new MessageFormatError("Error formatting the default message for: \"".concat(id, "\", rendering message verbatim"), locale, messageDescriptor, e));
        }
    }
    if (typeof message === 'string') {
        return message;
    }
    if (typeof defaultMessage === 'string') {
        return defaultMessage;
    }
    return id;
};

var DATE_TIME_FORMAT_OPTIONS = [
    'formatMatcher',
    'timeZone',
    'hour12',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName',
    'hourCycle',
    'dateStyle',
    'timeStyle',
    'calendar',
    // 'dayPeriod',
    'numberingSystem',
    'fractionalSecondDigits',
];
function getFormatter$2(_a, type, getDateTimeFormat, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError, timeZone = _a.timeZone;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = __assign(__assign({}, (timeZone && { timeZone: timeZone })), (format && getNamedFormat(formats, type, format, onError)));
    var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
    if (type === 'time' &&
        !filteredOptions.hour &&
        !filteredOptions.minute &&
        !filteredOptions.second &&
        !filteredOptions.timeStyle &&
        !filteredOptions.dateStyle) {
        // Add default formatting options if hour, minute, or second isn't defined.
        filteredOptions = __assign(__assign({}, filteredOptions), { hour: 'numeric', minute: 'numeric' });
    }
    return getDateTimeFormat(locale, filteredOptions);
}
function formatDate(config, getDateTimeFormat) {
    var _a = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
    }
    var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter$2(config, 'date', getDateTimeFormat, options).format(date);
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting date.', config.locale, e));
    }
    return String(date);
}
function formatTime(config, getDateTimeFormat) {
    var _a = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
    }
    var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter$2(config, 'time', getDateTimeFormat, options).format(date);
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting time.', config.locale, e));
    }
    return String(date);
}
function formatDateTimeRange(config, getDateTimeFormat) {
    var _a = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
    }
    var from = _a[0], to = _a[1], _b = _a[2], options = _b === void 0 ? {} : _b;
    var timeZone = config.timeZone, locale = config.locale, onError = config.onError;
    var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, timeZone ? { timeZone: timeZone } : {});
    try {
        return getDateTimeFormat(locale, filteredOptions).formatRange(from, to);
    }
    catch (e) {
        onError(new IntlFormatError('Error formatting date time range.', config.locale, e));
    }
    return String(from);
}
function formatDateToParts(config, getDateTimeFormat) {
    var _a = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
    }
    var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter$2(config, 'date', getDateTimeFormat, options).formatToParts(date); // TODO: remove this when https://github.com/microsoft/TypeScript/pull/50402 is merged
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting date.', config.locale, e));
    }
    return [];
}
function formatTimeToParts(config, getDateTimeFormat) {
    var _a = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
    }
    var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
    var date = typeof value === 'string' ? new Date(value || 0) : value;
    try {
        return getFormatter$2(config, 'time', getDateTimeFormat, options).formatToParts(date); // TODO: remove this when https://github.com/microsoft/TypeScript/pull/50402 is merged
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting time.', config.locale, e));
    }
    return [];
}

var DISPLAY_NAMES_OPTONS = [
    'style',
    'type',
    'fallback',
    'languageDisplay',
];
function formatDisplayName(_a, getDisplayNames, value, options) {
    var locale = _a.locale, onError = _a.onError;
    var DisplayNames = Intl.DisplayNames;
    if (!DisplayNames) {
        onError(new FormatError("Intl.DisplayNames is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-displaynames\"\n", ErrorCode.MISSING_INTL_API));
    }
    var filteredOptions = filterProps(options, DISPLAY_NAMES_OPTONS);
    try {
        return getDisplayNames(locale, filteredOptions).of(value);
    }
    catch (e) {
        onError(new IntlFormatError('Error formatting display name.', locale, e));
    }
}

var LIST_FORMAT_OPTIONS = [
    'type',
    'style',
];
var now = Date.now();
function generateToken(i) {
    return "".concat(now, "_").concat(i, "_").concat(now);
}
function formatList(opts, getListFormat, values, options) {
    if (options === void 0) { options = {}; }
    var results = formatListToParts(opts, getListFormat, values, options).reduce(function (all, el) {
        var val = el.value;
        if (typeof val !== 'string') {
            all.push(val);
        }
        else if (typeof all[all.length - 1] === 'string') {
            all[all.length - 1] += val;
        }
        else {
            all.push(val);
        }
        return all;
    }, []);
    return results.length === 1 ? results[0] : results.length === 0 ? '' : results;
}
function formatListToParts(_a, getListFormat, values, options) {
    var locale = _a.locale, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var ListFormat = Intl.ListFormat;
    if (!ListFormat) {
        onError(new FormatError("Intl.ListFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-listformat\"\n", ErrorCode.MISSING_INTL_API));
    }
    var filteredOptions = filterProps(options, LIST_FORMAT_OPTIONS);
    try {
        var richValues_1 = {};
        var serializedValues = values.map(function (v, i) {
            if (typeof v === 'object') {
                var id = generateToken(i);
                richValues_1[id] = v;
                return id;
            }
            return String(v);
        });
        return getListFormat(locale, filteredOptions)
            .formatToParts(serializedValues)
            .map(function (part) {
            return part.type === 'literal'
                ? part
                : __assign(__assign({}, part), { value: richValues_1[part.value] || part.value });
        });
    }
    catch (e) {
        onError(new IntlFormatError('Error formatting list.', locale, e));
    }
    // @ts-ignore
    return values;
}

var PLURAL_FORMAT_OPTIONS = ['type'];
function formatPlural(_a, getPluralRules, value, options) {
    var locale = _a.locale, onError = _a.onError;
    if (options === void 0) { options = {}; }
    if (!Intl.PluralRules) {
        onError(new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", ErrorCode.MISSING_INTL_API));
    }
    var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
    try {
        return getPluralRules(locale, filteredOptions).select(value);
    }
    catch (e) {
        onError(new IntlFormatError('Error formatting plural.', locale, e));
    }
    return 'other';
}

var RELATIVE_TIME_FORMAT_OPTIONS = ['numeric', 'style'];
function getFormatter$1(_a, getRelativeTimeFormat, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = (!!format && getNamedFormat(formats, 'relative', format, onError)) || {};
    var filteredOptions = filterProps(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults);
    return getRelativeTimeFormat(locale, filteredOptions);
}
function formatRelativeTime(config, getRelativeTimeFormat, value, unit, options) {
    if (options === void 0) { options = {}; }
    if (!unit) {
        unit = 'second';
    }
    var RelativeTimeFormat = Intl.RelativeTimeFormat;
    if (!RelativeTimeFormat) {
        config.onError(new FormatError("Intl.RelativeTimeFormat is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-relativetimeformat\"\n", ErrorCode.MISSING_INTL_API));
    }
    try {
        return getFormatter$1(config, getRelativeTimeFormat, options).format(value, unit);
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting relative time.', config.locale, e));
    }
    return String(value);
}

var NUMBER_FORMAT_OPTIONS = [
    'style',
    'currency',
    'currencyDisplay',
    'unit',
    'unitDisplay',
    'useGrouping',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    // ES2020 NumberFormat
    'compactDisplay',
    'currencyDisplay',
    'currencySign',
    'notation',
    'signDisplay',
    'unit',
    'unitDisplay',
    'numberingSystem',
];
function getFormatter(_a, getNumberFormat, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = ((format &&
        getNamedFormat(formats, 'number', format, onError)) ||
        {});
    var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
    return getNumberFormat(locale, filteredOptions);
}
function formatNumber(config, getNumberFormat, value, options) {
    if (options === void 0) { options = {}; }
    try {
        return getFormatter(config, getNumberFormat, options).format(value);
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting number.', config.locale, e));
    }
    return String(value);
}
function formatNumberToParts(config, getNumberFormat, value, options) {
    if (options === void 0) { options = {}; }
    try {
        return getFormatter(config, getNumberFormat, options).formatToParts(value);
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting number.', config.locale, e));
    }
    return [];
}

function messagesContainString(messages) {
    var firstMessage = messages ? messages[Object.keys(messages)[0]] : undefined;
    return typeof firstMessage === 'string';
}
function verifyConfigMessages(config) {
    if (config.onWarn &&
        config.defaultRichTextElements &&
        messagesContainString(config.messages || {})) {
        config.onWarn("[@formatjs/intl] \"defaultRichTextElements\" was specified but \"message\" was not pre-compiled. \nPlease consider using \"@formatjs/cli\" to pre-compile your messages for performance.\nFor more details see https://formatjs.io/docs/getting-started/message-distribution");
    }
}
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
function createIntl$1(config, cache) {
    var formatters = createFormatters(cache);
    var resolvedConfig = __assign(__assign({}, DEFAULT_INTL_CONFIG$1), config);
    var locale = resolvedConfig.locale, defaultLocale = resolvedConfig.defaultLocale, onError = resolvedConfig.onError;
    if (!locale) {
        if (onError) {
            onError(new InvalidConfigError("\"locale\" was not configured, using \"".concat(defaultLocale, "\" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details")));
        }
        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        resolvedConfig.locale = resolvedConfig.defaultLocale || 'en';
    }
    else if (!Intl.NumberFormat.supportedLocalesOf(locale).length && onError) {
        onError(new MissingDataError("Missing locale data for locale: \"".concat(locale, "\" in Intl.NumberFormat. Using default locale: \"").concat(defaultLocale, "\" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details")));
    }
    else if (!Intl.DateTimeFormat.supportedLocalesOf(locale).length &&
        onError) {
        onError(new MissingDataError("Missing locale data for locale: \"".concat(locale, "\" in Intl.DateTimeFormat. Using default locale: \"").concat(defaultLocale, "\" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details")));
    }
    verifyConfigMessages(resolvedConfig);
    return __assign(__assign({}, resolvedConfig), { formatters: formatters, formatNumber: formatNumber.bind(null, resolvedConfig, formatters.getNumberFormat), formatNumberToParts: formatNumberToParts.bind(null, resolvedConfig, formatters.getNumberFormat), formatRelativeTime: formatRelativeTime.bind(null, resolvedConfig, formatters.getRelativeTimeFormat), formatDate: formatDate.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatDateToParts: formatDateToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatTime: formatTime.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatDateTimeRange: formatDateTimeRange.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatTimeToParts: formatTimeToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatPlural: formatPlural.bind(null, resolvedConfig, formatters.getPluralRules), 
        // @ts-expect-error TODO: will get to this later
        formatMessage: formatMessage$1.bind(null, resolvedConfig, formatters), 
        // @ts-expect-error TODO: will get to this later
        $t: formatMessage$1.bind(null, resolvedConfig, formatters), formatList: formatList.bind(null, resolvedConfig, formatters.getListFormat), formatListToParts: formatListToParts.bind(null, resolvedConfig, formatters.getListFormat), formatDisplayName: formatDisplayName.bind(null, resolvedConfig, formatters.getDisplayNames) });
}

function defineMessages$1(msgs) {
    return msgs;
}
function defineMessage$1(msg) {
    return msg;
}

function invariantIntlContext(intl) {
    invariant$1(intl, '[React Intl] Could not find required `intl` object. ' +
        '<IntlProvider> needs to exist in the component ancestry.');
}
var DEFAULT_INTL_CONFIG = __assign(__assign({}, DEFAULT_INTL_CONFIG$1), { textComponent: reactExports.Fragment });
/**
 * Takes a `formatXMLElementFn`, and composes it in function, which passes
 * argument `parts` through, assigning unique key to each part, to prevent
 * "Each child in a list should have a unique "key"" React error.
 * @param formatXMLElementFn
 */
function assignUniqueKeysToParts(formatXMLElementFn) {
    return function (parts) {
        // eslint-disable-next-line prefer-rest-params
        return formatXMLElementFn(reactExports.Children.toArray(parts));
    };
}
function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    if (!objA || !objB) {
        return false;
    }
    var aKeys = Object.keys(objA);
    var bKeys = Object.keys(objB);
    var len = aKeys.length;
    if (bKeys.length !== len) {
        return false;
    }
    for (var i = 0; i < len; i++) {
        var key = aKeys[i];
        if (objA[key] !== objB[key] ||
            !Object.prototype.hasOwnProperty.call(objB, key)) {
            return false;
        }
    }
    return true;
}

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}
// This is primarily dealing with packaging systems where multiple copies of react-intl
// might exist
var IntlContext = typeof window !== 'undefined' && !window.__REACT_INTL_BYPASS_GLOBAL_CONTEXT__
    ? window.__REACT_INTL_CONTEXT__ ||
        (window.__REACT_INTL_CONTEXT__ = reactExports.createContext(null))
    : reactExports.createContext(null);
var IntlConsumer = IntlContext.Consumer, IntlProvider$1 = IntlContext.Provider;
var Provider = IntlProvider$1;
var Context = IntlContext;
function injectIntl(WrappedComponent, options) {
    var _a = options || {}, _b = _a.intlPropName, intlPropName = _b === void 0 ? 'intl' : _b, _c = _a.forwardRef, forwardRef = _c === void 0 ? false : _c, _d = _a.enforceContext, enforceContext = _d === void 0 ? true : _d;
    var WithIntl = function (props) { return (reactExports.createElement(IntlConsumer, null, function (intl) {
        var _a;
        if (enforceContext) {
            invariantIntlContext(intl);
        }
        var intlProp = (_a = {}, _a[intlPropName] = intl, _a);
        return (reactExports.createElement(WrappedComponent, __assign({}, props, intlProp, { ref: forwardRef ? props.forwardedRef : null })));
    })); };
    WithIntl.displayName = "injectIntl(".concat(getDisplayName(WrappedComponent), ")");
    WithIntl.WrappedComponent = WrappedComponent;
    if (forwardRef) {
        return hoistNonReactStatics$1(reactExports.forwardRef(function (props, ref) { return (reactExports.createElement(WithIntl, __assign({}, props, { forwardedRef: ref }))); }), WrappedComponent);
    }
    return hoistNonReactStatics$1(WithIntl, WrappedComponent);
}

function useIntl() {
    var intl = reactExports.useContext(Context);
    invariantIntlContext(intl);
    return intl;
}

var DisplayName;
(function (DisplayName) {
    DisplayName["formatDate"] = "FormattedDate";
    DisplayName["formatTime"] = "FormattedTime";
    DisplayName["formatNumber"] = "FormattedNumber";
    DisplayName["formatList"] = "FormattedList";
    // Note that this DisplayName is the locale display name, not to be confused with
    // the name of the enum, which is for React component display name in dev tools.
    DisplayName["formatDisplayName"] = "FormattedDisplayName";
})(DisplayName || (DisplayName = {}));
var DisplayNameParts;
(function (DisplayNameParts) {
    DisplayNameParts["formatDate"] = "FormattedDateParts";
    DisplayNameParts["formatTime"] = "FormattedTimeParts";
    DisplayNameParts["formatNumber"] = "FormattedNumberParts";
    DisplayNameParts["formatList"] = "FormattedListParts";
})(DisplayNameParts || (DisplayNameParts = {}));
var FormattedNumberParts = function (props) {
    var intl = useIntl();
    var value = props.value, children = props.children, formatProps = __rest(props, ["value", "children"]);
    return children(intl.formatNumberToParts(value, formatProps));
};
FormattedNumberParts.displayName = 'FormattedNumberParts';
var FormattedListParts = function (props) {
    var intl = useIntl();
    var value = props.value, children = props.children, formatProps = __rest(props, ["value", "children"]);
    return children(intl.formatListToParts(value, formatProps));
};
FormattedNumberParts.displayName = 'FormattedNumberParts';
function createFormattedDateTimePartsComponent(name) {
    var ComponentParts = function (props) {
        var intl = useIntl();
        var value = props.value, children = props.children, formatProps = __rest(props, ["value", "children"]);
        var date = typeof value === 'string' ? new Date(value || 0) : value;
        var formattedParts = name === 'formatDate'
            ? intl.formatDateToParts(date, formatProps)
            : intl.formatTimeToParts(date, formatProps);
        return children(formattedParts);
    };
    ComponentParts.displayName = DisplayNameParts[name];
    return ComponentParts;
}
function createFormattedComponent(name) {
    var Component = function (props) {
        var intl = useIntl();
        var value = props.value, children = props.children, formatProps = __rest(props
        // TODO: fix TS type definition for localeMatcher upstream
        , ["value", "children"]);
        // TODO: fix TS type definition for localeMatcher upstream
        var formattedValue = intl[name](value, formatProps);
        if (typeof children === 'function') {
            return children(formattedValue);
        }
        var Text = intl.textComponent || reactExports.Fragment;
        return reactExports.createElement(Text, null, formattedValue);
    };
    Component.displayName = DisplayName[name];
    return Component;
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
function processIntlConfig(config) {
    return {
        locale: config.locale,
        timeZone: config.timeZone,
        fallbackOnEmptyString: config.fallbackOnEmptyString,
        formats: config.formats,
        textComponent: config.textComponent,
        messages: config.messages,
        defaultLocale: config.defaultLocale,
        defaultFormats: config.defaultFormats,
        onError: config.onError,
        onWarn: config.onWarn,
        wrapRichTextChunksInFragment: config.wrapRichTextChunksInFragment,
        defaultRichTextElements: config.defaultRichTextElements,
    };
}
function assignUniqueKeysToFormatXMLElementFnArgument(values) {
    if (!values) {
        return values;
    }
    return Object.keys(values).reduce(function (acc, k) {
        var v = values[k];
        acc[k] = isFormatXMLElementFn(v)
            ? assignUniqueKeysToParts(v)
            : v;
        return acc;
    }, {});
}
var formatMessage = function (config, formatters, descriptor, rawValues) {
    var rest = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        rest[_i - 4] = arguments[_i];
    }
    var values = assignUniqueKeysToFormatXMLElementFnArgument(rawValues);
    var chunks = formatMessage$1.apply(void 0, __spreadArray([config,
        formatters,
        descriptor,
        values], rest, false));
    if (Array.isArray(chunks)) {
        return reactExports.Children.toArray(chunks);
    }
    return chunks;
};
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
var createIntl = function (_a, cache) {
    var rawDefaultRichTextElements = _a.defaultRichTextElements, config = __rest(_a, ["defaultRichTextElements"]);
    var defaultRichTextElements = assignUniqueKeysToFormatXMLElementFnArgument(rawDefaultRichTextElements);
    var coreIntl = createIntl$1(__assign(__assign(__assign({}, DEFAULT_INTL_CONFIG), config), { defaultRichTextElements: defaultRichTextElements }), cache);
    var resolvedConfig = {
        locale: coreIntl.locale,
        timeZone: coreIntl.timeZone,
        fallbackOnEmptyString: coreIntl.fallbackOnEmptyString,
        formats: coreIntl.formats,
        defaultLocale: coreIntl.defaultLocale,
        defaultFormats: coreIntl.defaultFormats,
        messages: coreIntl.messages,
        onError: coreIntl.onError,
        defaultRichTextElements: defaultRichTextElements,
    };
    return __assign(__assign({}, coreIntl), { formatMessage: formatMessage.bind(null, resolvedConfig, 
        // @ts-expect-error fix this
        coreIntl.formatters), 
        // @ts-expect-error fix this
        $t: formatMessage.bind(null, resolvedConfig, coreIntl.formatters) });
};
var IntlProvider = /** @class */ (function (_super) {
    __extends(IntlProvider, _super);
    function IntlProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cache = createIntlCache();
        _this.state = {
            cache: _this.cache,
            intl: createIntl(processIntlConfig(_this.props), _this.cache),
            prevConfig: processIntlConfig(_this.props),
        };
        return _this;
    }
    IntlProvider.getDerivedStateFromProps = function (props, _a) {
        var prevConfig = _a.prevConfig, cache = _a.cache;
        var config = processIntlConfig(props);
        if (!shallowEqual(prevConfig, config)) {
            return {
                intl: createIntl(config, cache),
                prevConfig: config,
            };
        }
        return null;
    };
    IntlProvider.prototype.render = function () {
        invariantIntlContext(this.state.intl);
        return reactExports.createElement(Provider, { value: this.state.intl }, this.props.children);
    };
    IntlProvider.displayName = 'IntlProvider';
    IntlProvider.defaultProps = DEFAULT_INTL_CONFIG;
    return IntlProvider;
}(reactExports.PureComponent));

var MINUTE = 60;
var HOUR = 60 * 60;
var DAY = 60 * 60 * 24;
function selectUnit(seconds) {
    var absValue = Math.abs(seconds);
    if (absValue < MINUTE) {
        return 'second';
    }
    if (absValue < HOUR) {
        return 'minute';
    }
    if (absValue < DAY) {
        return 'hour';
    }
    return 'day';
}
function getDurationInSeconds(unit) {
    switch (unit) {
        case 'second':
            return 1;
        case 'minute':
            return MINUTE;
        case 'hour':
            return HOUR;
        default:
            return DAY;
    }
}
function valueToSeconds(value, unit) {
    if (!value) {
        return 0;
    }
    switch (unit) {
        case 'second':
            return value;
        case 'minute':
            return value * MINUTE;
        default:
            return value * HOUR;
    }
}
var INCREMENTABLE_UNITS = [
    'second',
    'minute',
    'hour',
];
function canIncrement(unit) {
    if (unit === void 0) { unit = 'second'; }
    return INCREMENTABLE_UNITS.indexOf(unit) > -1;
}
var SimpleFormattedRelativeTime = function (props) {
    var _a = useIntl(), formatRelativeTime = _a.formatRelativeTime, Text = _a.textComponent;
    var children = props.children, value = props.value, unit = props.unit, otherProps = __rest(props, ["children", "value", "unit"]);
    var formattedRelativeTime = formatRelativeTime(value || 0, unit, otherProps);
    if (typeof children === 'function') {
        return children(formattedRelativeTime);
    }
    if (Text) {
        return reactExports.createElement(Text, null, formattedRelativeTime);
    }
    return reactExports.createElement(reactExports.Fragment, null, formattedRelativeTime);
};
var FormattedRelativeTime = function (_a) {
    var value = _a.value, unit = _a.unit, updateIntervalInSeconds = _a.updateIntervalInSeconds, otherProps = __rest(_a, ["value", "unit", "updateIntervalInSeconds"]);
    invariant$1(!updateIntervalInSeconds ||
        !!(updateIntervalInSeconds && canIncrement(unit)), 'Cannot schedule update with unit longer than hour');
    var _b = reactExports.useState(), prevUnit = _b[0], setPrevUnit = _b[1];
    var _c = reactExports.useState(0), prevValue = _c[0], setPrevValue = _c[1];
    var _d = reactExports.useState(0), currentValueInSeconds = _d[0], setCurrentValueInSeconds = _d[1];
    var updateTimer;
    if (unit !== prevUnit || value !== prevValue) {
        setPrevValue(value || 0);
        setPrevUnit(unit);
        setCurrentValueInSeconds(canIncrement(unit) ? valueToSeconds(value, unit) : 0);
    }
    reactExports.useEffect(function () {
        function clearUpdateTimer() {
            clearTimeout(updateTimer);
        }
        clearUpdateTimer();
        // If there's no interval and we cannot increment this unit, do nothing
        if (!updateIntervalInSeconds || !canIncrement(unit)) {
            return clearUpdateTimer;
        }
        // Figure out the next interesting time
        var nextValueInSeconds = currentValueInSeconds - updateIntervalInSeconds;
        var nextUnit = selectUnit(nextValueInSeconds);
        // We've reached the max auto incrementable unit, don't schedule another update
        if (nextUnit === 'day') {
            return clearUpdateTimer;
        }
        var unitDuration = getDurationInSeconds(nextUnit);
        var remainder = nextValueInSeconds % unitDuration;
        var prevInterestingValueInSeconds = nextValueInSeconds - remainder;
        var nextInterestingValueInSeconds = prevInterestingValueInSeconds >= currentValueInSeconds
            ? prevInterestingValueInSeconds - unitDuration
            : prevInterestingValueInSeconds;
        var delayInSeconds = Math.abs(nextInterestingValueInSeconds - currentValueInSeconds);
        if (currentValueInSeconds !== nextInterestingValueInSeconds) {
            updateTimer = setTimeout(function () { return setCurrentValueInSeconds(nextInterestingValueInSeconds); }, delayInSeconds * 1e3);
        }
        return clearUpdateTimer;
    }, [currentValueInSeconds, updateIntervalInSeconds, unit]);
    var currentValue = value || 0;
    var currentUnit = unit;
    if (canIncrement(unit) &&
        typeof currentValueInSeconds === 'number' &&
        updateIntervalInSeconds) {
        currentUnit = selectUnit(currentValueInSeconds);
        var unitDuration = getDurationInSeconds(currentUnit);
        currentValue = Math.round(currentValueInSeconds / unitDuration);
    }
    return (reactExports.createElement(SimpleFormattedRelativeTime, __assign({ value: currentValue, unit: currentUnit }, otherProps)));
};
FormattedRelativeTime.displayName = 'FormattedRelativeTime';
FormattedRelativeTime.defaultProps = {
    value: 0,
    unit: 'second',
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var FormattedPlural = function (props) {
    var _a = useIntl(), formatPlural = _a.formatPlural, Text = _a.textComponent;
    var value = props.value, other = props.other, children = props.children;
    var pluralCategory = formatPlural(value, props);
    var formattedPlural = props[pluralCategory] || other;
    if (typeof children === 'function') {
        return children(formattedPlural);
    }
    if (Text) {
        return reactExports.createElement(Text, null, formattedPlural);
    }
    // Work around @types/react where React.FC cannot return string
    return formattedPlural;
};
FormattedPlural.defaultProps = {
    type: 'cardinal',
};
FormattedPlural.displayName = 'FormattedPlural';

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
function areEqual(prevProps, nextProps) {
    var values = prevProps.values, otherProps = __rest(prevProps, ["values"]);
    var nextValues = nextProps.values, nextOtherProps = __rest(nextProps, ["values"]);
    return (shallowEqual(nextValues, values) &&
        shallowEqual(otherProps, nextOtherProps));
}
function FormattedMessage(props) {
    var intl = useIntl();
    var formatMessage = intl.formatMessage, _a = intl.textComponent, Text = _a === void 0 ? reactExports.Fragment : _a;
    var id = props.id, description = props.description, defaultMessage = props.defaultMessage, values = props.values, children = props.children, _b = props.tagName, Component = _b === void 0 ? Text : _b, ignoreTag = props.ignoreTag;
    var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
    var nodes = formatMessage(descriptor, values, {
        ignoreTag: ignoreTag,
    });
    if (typeof children === 'function') {
        return children(Array.isArray(nodes) ? nodes : [nodes]);
    }
    if (Component) {
        return reactExports.createElement(Component, null, reactExports.Children.toArray(nodes));
    }
    return reactExports.createElement(reactExports.Fragment, null, nodes);
}
FormattedMessage.displayName = 'FormattedMessage';
var MemoizedFormattedMessage = reactExports.memo(FormattedMessage, areEqual);
MemoizedFormattedMessage.displayName = 'MemoizedFormattedMessage';

var FormattedDateTimeRange = function (props) {
    var intl = useIntl();
    var from = props.from, to = props.to, children = props.children, formatProps = __rest(props, ["from", "to", "children"]);
    var formattedValue = intl.formatDateTimeRange(from, to, formatProps);
    if (typeof children === 'function') {
        return children(formattedValue);
    }
    var Text = intl.textComponent || reactExports.Fragment;
    return reactExports.createElement(Text, null, formattedValue);
};
FormattedDateTimeRange.displayName = 'FormattedDateTimeRange';

function defineMessages(msgs) {
    return msgs;
}
function defineMessage(msg) {
    return msg;
}
// IMPORTANT: Explicit here to prevent api-extractor from outputing `import('./src/types').CustomFormatConfig`
var FormattedDate = createFormattedComponent('formatDate');
var FormattedTime = createFormattedComponent('formatTime');
var FormattedNumber = createFormattedComponent('formatNumber');
var FormattedList = createFormattedComponent('formatList');
var FormattedDisplayName = createFormattedComponent('formatDisplayName');
var FormattedDateParts = createFormattedDateTimePartsComponent('formatDate');
var FormattedTimeParts = createFormattedDateTimePartsComponent('formatTime');

/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

/**
 * @module platform-connector
 */

//Entry point
/**
 * Object containing discovery root
 *
 * <p>Can be overwritten/updated by calling PlatformConnector.init</p>
 * <ul>
 *     <li><code>root</code> - discovery</li>
 * </ul>
 * @enum {string}
 * @readonly
 *  @namespace LinkLookup:DISCOVERY
 */
var DISCOVERY = {
  root: '/discovery'
};

/**
 * Object map containing the key/value pairs for AEP-CS _links.
 * <p>Possible values include but are not limited to</p>
 * <p>Can be overwritten/updated by calling PlatformConnector.init</p>
 * <ul>
 *     <li><code>page</code> - http://ns.adobe.com/adobecloud/rel/page</li>
 *     <li><code>next</code> - next</li>
 *     <li><code>resolveId</code> - http://ns.adobe.com/adobecloud/rel/resolve/id</li>
 *     <li><code>resolvePath</code> - http://ns.adobe.com/adobecloud/rel/resolve/path</li>
 *     <li><code>ops</code> - http://ns.adobe.com/adobecloud/rel/ops</li>
 *     <li><code>metadata.repo</code> - http://ns.adobe.com/adobecloud/rel/metadata/repository</li>
 *     <li><code>metadata.app</code> - http://ns.adobe.com/adobecloud/rel/metadata/application</li>
 *     <li><code>metadata.embedded</code> - http://ns.adobe.com/adobecloud/rel/metadata/embedded</li>
 *     <li><code>rendition</code> - http://ns.adobe.com/adobecloud/rel/rendition</li>
 *     <li><code>path</code> - http://ns.adobe.com/adobecloud/rel/path</li>
 *     <li><code>acPolicy</code> - http://ns.adobe.com/adobecloud/rel/ac/policy</li>
 *     <li><code>id</code> - http://ns.adobe.com/adobecloud/rel/id</li>
 *     <li><code>acCheck</code> - http://ns.adobe.com/adobecloud/rel/ac/check</li>
 *     <li><code>repository</code> - http://ns.adobe.com/adobecloud/rel/repository</li>
 *     <li><code>primary</code> - http://ns.adobe.com/adobecloud/rel/primary</li>
 *     <li><code>acEffective</code> - http://ns.adobe.com/adobecloud/rel/ac/effective</li>
 *     <li><code>create</code> - http://ns.adobe.com/adobecloud/rel/create</li>
 *     <li><code>directory</code> - http://ns.adobe.com/adobecloud/rel/directory</li>
 *     <li><code>discard</code> - http://ns.adobe.com/adobecloud/rel/discard</li>
 *     <li><code>download</code> - http://ns.adobe.com/adobecloud/rel/download</li>
 *     <li><code>version</code> - version-history</li>
 *     <li><code>blockUploadInit</code> - http://ns.adobe.com/adobecloud/rel/block/init</li>
 *     <li><code>blockTransfer</code> - http://ns.adobe.com/adobecloud/rel/block/transfer</li>
 *     <li><code>blockFinalize</code> - http://ns.adobe.com/adobecloud/rel/block/finalize</li>
 *     <li><code>blockDownload</code> - http://ns.adobe.com/adobecloud/rel/download</li>
 *     <li><code>searchableFields</code> - http://ns.adobe.com/adobeaemcloud/rel/aem/metadata/searchable-fields</li>
 * </ul>
 *
 * @enum {string}
 * @readonly
 * @namespace LinkLookup:LINK_NS
 */
var LINK_NS = {
  page: 'http://ns.adobe.com/adobecloud/rel/page',
  next: 'next',
  resolveId: 'http://ns.adobe.com/adobecloud/rel/resolve/id',
  resolvePath: 'http://ns.adobe.com/adobecloud/rel/resolve/path',
  ops: 'http://ns.adobe.com/adobecloud/rel/ops',
  metadata: {
    repo: 'http://ns.adobe.com/adobecloud/rel/metadata/repository',
    app: 'http://ns.adobe.com/adobecloud/rel/metadata/application',
    embedded: 'http://ns.adobe.com/adobecloud/rel/metadata/embedded',
    asset: 'http://ns.adobe.com/adobecloud/rel/metadata/asset'
  },
  query: 'http://ns.adobe.com/adobecloud/rel/query',
  rendition: 'http://ns.adobe.com/adobecloud/rel/rendition',
  path: 'http://ns.adobe.com/adobecloud/rel/path',
  acPolicy: 'http://ns.adobe.com/adobecloud/rel/ac/policy',
  id: 'http://ns.adobe.com/adobecloud/rel/id',
  acCheck: 'http://ns.adobe.com/adobecloud/rel/ac/check',
  repository: 'http://ns.adobe.com/adobecloud/rel/repository',
  primary: 'http://ns.adobe.com/adobecloud/rel/primary',
  acEffective: 'http://ns.adobe.com/adobecloud/rel/ac/effective',
  create: 'http://ns.adobe.com/adobecloud/rel/create',
  directory: 'http://ns.adobe.com/adobecloud/rel/directory',
  discard: 'http://ns.adobe.com/adobecloud/rel/discard',
  restore: 'http://ns.adobe.com/adobecloud/rel/restore',
  download: 'http://ns.adobe.com/adobecloud/rel/download',
  version: 'version-history',
  blockUploadInit: 'http://ns.adobe.com/adobecloud/rel/block/init',
  blockTransfer: 'http://ns.adobe.com/adobecloud/rel/block/transfer',
  blockFinalize: 'http://ns.adobe.com/adobecloud/rel/block/finalize',
  blockDownload: 'http://ns.adobe.com/adobecloud/rel/download',
  searchableFields: 'http://ns.adobe.com/adobeaemcloud/rel/aem/metadata/searchable-fields',
  collections: 'http://ns.adobe.com/adobeaemcloud/rel/aem/collections-v0'
};

/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/
/* eslint-disable complexity */

/**
 * @module platform-connector
 */

/**
 * Utility function to get a mimetype based on the file extension
 * <p>For example.</p>
 * <ul>
 *     <li>jpg ->  image/jpeg</li>
 *     <li>png -> image/png</li>
 *     <li>mp4 -> video/mp4</li>
 * </ul>
 * @param {string} ext
 * @return {string}
 */
function getMimeTypeFromExtension(ext) {
  ext = ext.toLowerCase();
  var ret = '';
  switch (ext) {
    case 'jpeg':
      ret = 'image/jpeg';
      break;
    case 'jpg':
      ret = 'image/jpg';
      break;
    case 'png':
      ret = 'image/png';
      break;
    case 'tiff':
      ret = 'image/tiff';
      break;
    case 'bmp':
      ret = 'image/bmp';
      break;
    case 'psd':
      ret = 'image/psd';
      break;
    case 'gif':
      ret = 'image/gif';
      break;
    case 'pdf':
      ret = 'application/pdf';
      break;
    case 'eps':
      ret = 'image/x-eps';
      break;
    case 'ai':
      ret = 'application/illustrator';
      break;
    case 'txt':
      ret = 'text/plain';
      break;
    case 'rtf':
      ret = 'text/rtf';
      break;
    case 'ppt':
    case 'pptx':
      ret = 'application/mspowerpoint';
      break;
    case 'doc':
    case 'docx':
      ret = 'application/msword';
      break;
    case 'xls':
    case 'xlsx':
      ret = 'application/msexcel';
      break;
    case 'indd':
      ret = 'application/x-indesign';
      break;
    case 'raw':
      ret = 'image/raw';
      break;
    case 'avi':
      ret = 'video/msvideo';
      break;
    case 'flv':
      ret = 'video/x-flv';
      break;
    case 'mp4':
      ret = 'video/mp4';
      break;
    case 'mpeg':
      ret = 'video/mpeg';
      break;
    case 'wmv':
      ret = 'video/x-ms-wmv';
      break;
    case 'psb':
      ret = 'application/x-photoshop';
      break;
    case 'f4v':
      ret = 'video/x-f4v';
      break;
    case 'asf':
      ret = 'application/vnd.ms-asf';
      break;
    case '3gp':
      ret = 'video/3gpp';
      break;
    case 'swf':
      ret = 'application/x-shockwave-flash';
      break;
    default:
      ret = 'application/octet-stream';
  }
  return ret;
}

/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

/**
 * @module platform-connector
 */

/**
 * Utility object containing a number of useful constants.
 * <ul>
 *     <li><code>UPLOAD_STATE</code> - Object</li>
 *     <li><code>UPLOAD_BLOCKS</code> - Object</li>
 *     <li><code>DIRECTORY_TYPE</code> - application/vnd.adobecloud.directory+json</li>
 * </ul>
 * @namespace PlatformConnectorConstants
 */
var PlatformConnectorConstants = {
  UPLOAD_STATE: {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    PAUSING: 'PAUSING',
    PAUSED: 'PAUSED',
    CANCELING: 'CANCELING',
    CANCELED: 'CANCELED',
    RESUMING: 'RESUMING',
    FINISHED: 'FINISHED'
  },
  UPLOAD_BLOCKS: {
    //50 MB minimum size for block uploads
    MIN_FILESIZE_FOR_BLOCKUPLOAD: 52428800,
    //5 MB Default Block Size
    UPLOAD_BLOCKSIZE: 5242880,
    //5 MB Minimum block size
    MIN_BLOCKSIZE_FOR_UPLOAD: 5242880,
    //Default of 3 retries per block of an upload
    UPLOAD_BLOCK_RETRY_DEFAULT: 3
  },
  DIRECTORY_TYPE: 'application/vnd.adobecloud.directory+json',
  RESOURCE_TYPE: 'application/vnd.adobecloud.resource+json',
  COLLECTION_TYPE: 'application/vnd.adobeaemcloud.collection+json',
  REPO_PATH: 'repo:path'
};

/**
 * @module platform-connector
 */
/**
 *
 * Public class that manages Block Transfer state and xhr progress
 * for things like pause, resume, & cancel.
 * @public
 * @class
 *
 */
var BlockTransfers = /*#__PURE__*/function () {
  function BlockTransfers() {
    _classCallCheck(this, BlockTransfers);
    this._blockUploads = void 0;
    this.xhrPuts = void 0;
    this._blockUploads = [];
    this.xhrPuts = [];
  }

  /**
   * Get the array of current block uploads (both active and paused)
   * @returns {module:platform-connector.BlockUploadInstance[]}
   */
  _createClass(BlockTransfers, [{
    key: "blockUploads",
    get: function get() {
      return this._blockUploads;
    }

    /**
     * Internal method to append a blockUploadInstance to the class array
     * @param {module:platform-connector.BlockUploadInstance} jobProps The object containing the properties for the job to resume (completed blocks, block transfer links, etc)
     * @returns {number} The index of the added job properties in the array
     */
  }, {
    key: "addBlockUpload",
    value: function addBlockUpload(jobProps) {
      var index = this._getBlockUploadIndex(jobProps.id);
      //If there's already a BlockUploadInstance with the same identifier
      if (index >= 0) {
        //Remove it from the array so we can pop in the new / updated one
        this._removeBlockUpload(index);
      }
      this._blockUploads.push(jobProps);
      return this._blockUploads.length - 1;
    }

    /**
     * @param {Object} xhrWrapper Object with identifier and XMLHttpRequest
     * @param {string} xhrWrapper.path
     * @property {XMLHttpRequest} - xhrWrapper.xhr actual xhr call
     */
  }, {
    key: "addXhrPut",
    value: function addXhrPut(xhr) {
      this.xhrPuts.push(xhr);
    }
  }, {
    key: "removeXhrPut",
    value: function removeXhrPut(path) {
      var index = this.xhrPuts.findIndex(function (x) {
        return x.path === path;
      });
      this.xhrPuts.splice(index, 1);
    }

    /**
     * Get the job properties for s submitted block upload
     * @param {string | number} identifier or array index of the job
     * @returns {module:platform-connector.BlockUploadInstance} The job properties for the specified job via defined interface
     */
  }, {
    key: "getBlockUpload",
    value: function getBlockUpload(identifier) {
      var index;
      if (typeof identifier === 'number') {
        index = identifier;
      } else {
        index = this._getBlockUploadIndex(identifier);
      }
      return index >= 0 ? this._blockUploads[index] : null;
    }

    /**
     * Returns whether the specified block upload is in a specified state
     * @param {string | number} identifier or array index of the job
     * @param {string} state string representation of the BlockUploadInstance state property
     * @returns {boolean} true if the job's state is PAUSED false for any other state value
     */
  }, {
    key: "blockUploadState",
    value: function blockUploadState(identifier, state) {
      var _this$getBlockUpload;
      return ((_this$getBlockUpload = this.getBlockUpload(identifier)) === null || _this$getBlockUpload === void 0 ? void 0 : _this$getBlockUpload.state) === state;
    }

    /**
     * Public method to initiate pausing a block upload job.
     * @param {string | number} id unique identifier for the upload job
     * @returns {boolean} true if the job is found, active and paused successfully
     */
  }, {
    key: "pauseBlockUpload",
    value: function () {
      var _pauseBlockUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(id) {
        return _regeneratorRuntime.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.blockUploadState(id, 'ACTIVE')) {
                _context.next = 4;
                break;
              }
              _context.next = 3;
              return this._fastPauseUpload(this.getBlockUpload(id));
            case 3:
              return _context.abrupt("return", true);
            case 4:
              return _context.abrupt("return", false);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function pauseBlockUpload() {
        return _pauseBlockUpload.apply(this, arguments);
      }
      return pauseBlockUpload;
    }()
    /**
     * Public method to initiate resuming a block upload job
     * @param {string} id unique identifier for the upload job
     * @param {module:platform-connector.BlockUploadInstance} jobProps unique identifier for the upload job
     * @returns {Promise<IAsset>}
     */
  }, {
    key: "resumeBlockUpload",
    value: function () {
      var _resumeBlockUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(id, jobProps) {
        var child;
        return _regeneratorRuntime.wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.blockUploadState(id, 'PAUSED') && this._validBlockUploadInstance(jobProps))) {
                _context2.next = 10;
                break;
              }
              //Take the provided jobProps and merge it into the internal array in case anything was changed
              this.addBlockUpload(jobProps);
              _context2.next = 4;
              return this._resumeUpload(jobProps);
            case 4:
              child = _context2.sent;
              if (!(jobProps.state === PlatformConnectorConstants.UPLOAD_STATE.FINISHED)) {
                _context2.next = 8;
                break;
              }
              this._removeBlockUploadById(jobProps.id);
              return _context2.abrupt("return", child);
            case 8:
              _context2.next = 11;
              break;
            case 10:
              throw new Error('Job not found or job not paused');
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function resumeBlockUpload() {
        return _resumeBlockUpload.apply(this, arguments);
      }
      return resumeBlockUpload;
    }()
    /**
     * Public method to initiate cancelling a block upload
     * @param {string} id unique identifier for the upload job
     * @returns {boolean} true if the specified job was found and could be cancelled
     */
  }, {
    key: "cancelBlockUpload",
    value: function () {
      var _cancelBlockUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(id) {
        var blockUploadInstance;
        return _regeneratorRuntime.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              blockUploadInstance = this.getBlockUpload(id); //If the specified block upload is active we need to cancel it first and then remove it, then cleanup by calling onAbortUpload
              if (!(blockUploadInstance && blockUploadInstance.state === PlatformConnectorConstants.UPLOAD_STATE.ACTIVE)) {
                _context3.next = 9;
                break;
              }
              _context3.next = 4;
              return this._cancelUpload(blockUploadInstance);
            case 4:
              this._removeBlockUpload(this._getBlockUploadIndex(id));
              if (blockUploadInstance.options.onAbortUpload) {
                blockUploadInstance.options.onAbortUpload({
                  uploadAsset: blockUploadInstance.id,
                  discardAssetUrl: blockUploadInstance.discardAsset
                });
              }
              return _context3.abrupt("return", true);
            case 9:
              if (!(blockUploadInstance && blockUploadInstance.state === PlatformConnectorConstants.UPLOAD_STATE.PAUSED)) {
                _context3.next = 14;
                break;
              }
              if (blockUploadInstance.options.onAbortUpload) {
                blockUploadInstance.options.onAbortUpload({
                  uploadAsset: blockUploadInstance.id,
                  discardAssetUrl: blockUploadInstance.discardAsset
                });
              }
              if (blockUploadInstance.options.onCancel) {
                blockUploadInstance.options.onCancel({
                  uploadInstance: blockUploadInstance
                });
              }
              this._removeBlockUpload(this._getBlockUploadIndex(id));
              return _context3.abrupt("return", true);
            case 14:
              return _context3.abrupt("return", false);
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function cancelBlockUpload() {
        return _cancelBlockUpload.apply(this, arguments);
      }
      return cancelBlockUpload;
    }()
    /**
     * Internal method to pause an upload quickly by interrupting the current block upload and immediately calling the onpause callback provided in the blockUploadInstance
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to pause
     * @returns {void}
     */
  }, {
    key: "_fastPauseUpload",
    value: function _fastPauseUpload(blockUploadInstance) {
      //Flag the upload as pausing so that the for loop which pushes blocks will kick out once the current block upload completes
      blockUploadInstance.state = PlatformConnectorConstants.UPLOAD_STATE.PAUSING;
      //Abort the inprogress xmlPut so that we can execute the callBack to the client immediately
      var inprogressCallToCancel = this._getBlockUploadUrl(blockUploadInstance);
      var xmlPutWeNeedToCancelIndex = this.xhrPuts.findIndex(function (x) {
        return x.path === inprogressCallToCancel.href;
      });
      var xmlPutWeNeedToCancel = this.xhrPuts[xmlPutWeNeedToCancelIndex].xhr;
      if (xmlPutWeNeedToCancel.readyState !== 4) {
        xmlPutWeNeedToCancel.abort();
        this.xhrPuts = this.xhrPuts.filter(function (put) {
          return put !== inprogressCallToCancel.href;
        });
      }
    }

    /**
     * Internal method to resume an upload
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to resume
     * @returns {Promise<Object>} the finalized asset once completed, or the partially uploaded asset if paused or interrupted
     */
  }, {
    key: "_resumeUpload",
    value: function () {
      var _resumeUpload2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(blockUploadInstance) {
        return _regeneratorRuntime.wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              //Flag the upload as resuming and pass a reference to it back into the exec upload function to resume sending blocks
              blockUploadInstance.state = PlatformConnectorConstants.UPLOAD_STATE.RESUMING;
              return _context4.abrupt("return", PlatformConnector.execBlockUpload(blockUploadInstance));
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function _resumeUpload() {
        return _resumeUpload2.apply(this, arguments);
      }
      return _resumeUpload;
    }()
    /**
     * Internal method to get the array index of an upload job from it's unique identifier
     * @private
     * @param {string} id the identifier of the job to return position
     * @returns {number} the index position of the BlockUploadInstance with the matching identifer, -1 if not found
     */
  }, {
    key: "_getBlockUploadIndex",
    value: function _getBlockUploadIndex(id) {
      var obj = this.blockUploads.find(function (x) {
        return x.id === id;
      });
      return obj ? this.blockUploads.indexOf(obj) : -1;
    }

    /**
     * Internal method to get the transfer link currently inflight for a block upload
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to check
     * @returns {string} the transfer link currently being uploaded against (null if not found)
     */
  }, {
    key: "_getBlockUploadUrl",
    value: function _getBlockUploadUrl(blockUploadInstance) {
      var completedBlocks = blockUploadInstance.completedBlocks;
      var links = blockUploadInstance.links[PlatformConnector._linkNS.blockTransfer];
      return links[completedBlocks] || null;
    }

    /**
     * Internal method to cancel an upload
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to cancel
     * @returns {boolean} Whether the job was successfully cancelled
     */
  }, {
    key: "_cancelUpload",
    value: function () {
      var _cancelUpload2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(blockUploadInstance) {
        var inprogressCallToCancel, xmlPutWeNeedToCancelIndex, xmlPutWeNeedToCancel;
        return _regeneratorRuntime.wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              //Set the state of the upload to cancelling so we break out of the for loop submitting the block uploads if we should happen to fail to abort the open xhr request
              blockUploadInstance.state = PlatformConnectorConstants.UPLOAD_STATE.CANCELING;
              //Dispatch an event to abort the current xmlPut request inflight which will return a boolean indicating success or failure
              inprogressCallToCancel = this._getBlockUploadUrl(blockUploadInstance);
              xmlPutWeNeedToCancelIndex = this.xhrPuts.findIndex(function (x) {
                return x.path === inprogressCallToCancel.href;
              });
              xmlPutWeNeedToCancel = this.xhrPuts[xmlPutWeNeedToCancelIndex].xhr;
              if (!(xmlPutWeNeedToCancel.readyState !== 4)) {
                _context5.next = 8;
                break;
              }
              xmlPutWeNeedToCancel.abort();
              this.xhrPuts = this.xhrPuts.filter(function (put) {
                return put !== inprogressCallToCancel.href;
              });
              return _context5.abrupt("return", true);
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function _cancelUpload() {
        return _cancelUpload2.apply(this, arguments);
      }
      return _cancelUpload;
    }()
    /**
     * Internal method to validate a block upload object passed in matches implementation
     * @private
     * @param {object} obj to validate
     * @returns {boolean} Whether the object matches the implementation for BlockUpload interface
     */
  }, {
    key: "_validBlockUploadInstance",
    value: function _validBlockUploadInstance(obj) {
      var props = [{
        name: 'id',
        type: 'string'
      }, {
        name: 'etag',
        type: 'string'
      }, {
        name: 'state',
        type: 'string'
      }, {
        name: 'completedBlocks',
        type: 'number'
      }, {
        name: 'fileName',
        type: 'string'
      }, {
        name: 'blockSize',
        type: 'number'
      }, {
        name: 'id',
        type: 'ILinks'
      }, {
        name: 'options',
        type: 'UploadOptions'
      }];
      var len = props.length;
      for (var i = 0; i < len; i++) {
        if (!obj || !(props[i].name in obj) || !_typeof$2(obj[props[i].name] === obj[props[i].type])) {
          return false;
        }
      }
      return true;
    }

    /**
     * Remove an element from the internal array for job options
     * @private
     * @param {String} id of the job to cancel
     * @returns {number} the index position of the BlockUploadInstance with the matching identifer, -1 if not found
     */
  }, {
    key: "_removeBlockUploadById",
    value: function _removeBlockUploadById(id) {
      var obj = this.blockUploads.find(function (x) {
        return x.id === id;
      });
      var index = obj ? this.blockUploads.indexOf(obj) : -1;
      if (index >= 0) {
        this._blockUploads.splice(index, 1);
        return true;
      }
      return false;
    }

    /**
     * Remove an element from the internal array for job options
     * @private
     * @param {number} index the array index of the job to cancel
     * @returns {boolean} whether the index was valid and could the element in the array could be removed
     */
  }, {
    key: "_removeBlockUpload",
    value: function _removeBlockUpload(index) {
      if (index >= 0) {
        this._blockUploads.splice(index, 1);
        return true;
      }
      return false;
    }
  }]);
  return BlockTransfers;
}();
var blockTransfers = new BlockTransfers();

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2023 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

/**
 * LogLevel controls the output level.
 * This enum is exported and the consumers have to follow the log levels defined in this enum
 * @public
 */
var LogLevel;

/**
 * RequestDetailsForLoggerTemplate Interface . Interface for defining the shape of the <code>messageInfo</code> param
 * supplied to the Logger.log method
 */
(function (LogLevel) {
  LogLevel[LogLevel["NONE"] = -1] = "NONE";
  LogLevel[LogLevel["SEVERE"] = 0] = "SEVERE";
  LogLevel[LogLevel["WARNING"] = 1] = "WARNING";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
  LogLevel[LogLevel["CONFIG"] = 4] = "CONFIG";
  LogLevel[LogLevel["FINE"] = 5] = "FINE";
  LogLevel[LogLevel["FINER"] = 6] = "FINER";
  LogLevel[LogLevel["FINEST"] = 7] = "FINEST";
})(LogLevel || (LogLevel = {}));
/**
 * Default Logger object which has an empty log method implementation
 * The param <code>logLevel</code> will follow the shape of the logLevel enum
 * and the <code>messageInfo</code> param follows the shape defined by the interface <code>RequestDetailsForLoggerTemplate</code>
 *
 * It ignores any logging output
 */
var DEFAULT_LOGGER_NO_OP = {
  log: function log() {}
};
var Logger = {
  /**
   * Logger type predicate . Type checking to check if the logger object has the log method implemented
   * @param {Object} value - Logger object
   * @private
   */
  isLogger: function isLogger(value) {
    return _typeof$2(value) === 'object' && 'log' in value;
  },
  /**
   *  Logger object
   *  It is set to the default no-op logger by default
   * @private
   */
  _logger: DEFAULT_LOGGER_NO_OP,
  /**
   * Sets the logger that will capture/write logging output.
   * @param {LoggerTemplate<RequestDetailsForLoggerTemplate>} logger - logger object has implementation for method
   * <code>log(logLevel, messageInfo)</code> which accepts two parameters .
   * The param <code>logLevel</code> will follow the shape of the logLevel enum
   * and the <code>messageInfo</code> param follows the shape defined by the interface <code>RequestDetailsForLoggerTemplate</code>
   * @public
   */
  setLogger: function setLogger(logger) {
    if (logger) {
      if (Logger.isLogger(logger)) {
        // this checks at runtime
        Logger._logger = logger;
      } else {
        throw new Error('Invalid logger object');
      }
    }
    // fall back to default no-op logger if logger is not supplied or if the logger is null
    else {
      Logger._logger = DEFAULT_LOGGER_NO_OP;
    }
  },
  /**
   * Logs based on the log method implementation of <code>Logger._logger</code>
   * @param {LogLevel} level The level of logging to output this trace at. For example: <code>Logger.INFO</code>.
   * It will follow the shape of the logLevel enum
   * @param {RequestDetailsForLoggerTemplate} messageInfo This contains info about the request details, and it's shape
   * is defined by the interface <code>RequestDetailsForLoggerTemplate</code>
   * @public
   */
  log: function log(level, messageInfo) {
    Logger._logger.log(level, messageInfo);
  }
};

/**
 * @class
 *
 * <p>The Console Logger console logs events based on the logging level. LogLevel on the console logger is
 * set via the traceLevel param passed while instantiating the ConsoleLogger class. The Console Logger
 * can be used as the logger object by the consumer while initializing PlatformConnector</p>
 *
 * <p>The current traceLevel values are supported:</p>
 * <ul>
 * <li><code>NONE</code> - Suppresses the logging output.</li>
 * <li><code>SEVERE</code> - Logs exceptions and other fatal errors (any error that may mess up the output or render the viewer unusable).</li>
 * <li><code>WARNING</code> - Logs image load failures and other errors and alerts.</li>
 * <li><code>INFO</code> - Logs image load successes.</li>
 * <li><code>CONFIG</code> - Logs component creation.</li>
 * <li><code>FINE</code> - Logs all calls to component public APIs.</li>
 * <li><code>FINER</code> - Logs internal events like pinchToZoom and zoomIn, and warning messages for low level rendering or input handling.</li>
 * <li><code>FINEST</code> - Logs rendering, mouse handling and other events which occur frequently.</li>
 * </ul>
 *
 **/
var ConsoleLogger = /*#__PURE__*/function () {
  /**
  The current traceLevel of the ConsoleLogger class. For example: <code>Logger.INFO</code>.
   @private
   */

  function ConsoleLogger(traceLevel) {
    _classCallCheck(this, ConsoleLogger);
    this.traceLevel = void 0;
    this.traceLevel = traceLevel;
  }
  /**
   * Outputs a string to the browser debug console at runtime if the specified loglevel is less than the current traceLevel
   *
   * @public
   *
   * @param {LogLevel} level The level of logging to output this trace at. For example: <code>Logger.INFO</code>.
   * It will follow the shape of the <code>LogLevel</code> enum
   * @param {Object} messageInfo This contains info about the log message
   * <p>
   *     messageInfo objects have properties:
   * </p>
   * <ul>
   *     <li>message - the log message supplied</li>
   * </ul>
   */
  _createClass(ConsoleLogger, [{
    key: "log",
    value: function log(level, messageInfo) {
      var severity = LogLevel[level];
      var ts = "".concat(new Date(), " ").substring(0, 33); //Time Stamp
      var logOutput = "".concat(ts, " - ").concat(severity, ":").concat(messageInfo.message);
      messageInfo = _objectSpread$3(_objectSpread$3({}, messageInfo), {}, {
        message: logOutput
      });
      if (this.traceLevel >= level) {
        if (level === LogLevel.SEVERE) {
          console.error(messageInfo.message);
        } else if (level === LogLevel.WARNING) {
          console.warn(messageInfo.message);
        } else if (level === LogLevel.INFO) {
          console.info(messageInfo.message);
        } else if (level === LogLevel.DEBUG) {
          console.debug(messageInfo.message);
        } else {
          console.log(messageInfo.message);
        }
      }
    }
  }]);
  return ConsoleLogger;
}();

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Private utilities
 * DO NOT export
 * @private
 */
var utils = {
  /**
   *
   * @param {Object} ims
   * @return {{authorization: string, "x-api-key": *}}
   * @private
   */
  getAuthHeader: function getAuthHeader(ims) {
    if (ims.accessToken && ims.accessToken.startsWith('Basic')) {
      return {
        authorization: "".concat(ims.accessToken),
        'x-api-key': ims.apiKey
        // 'x-request-id': uuidv4(),
      };
    }

    return {
      authorization: "Bearer ".concat(ims.accessToken),
      'x-api-key': ims.apiKey
      // 'x-request-id': uuidv4(),
    };
  },

  getHeader: function getHeader(extraHeader, ims) {
    var headers = merge$1(utils.getAuthHeader(ims), extraHeader);
    return headers;
  },
  /**
   * Extends an existing URL's template so that it includes all parameters
   * in an object. Note that THIS IS A BAD PRACTICE. We're modifying a URL
   * provided by an API, which is explicitly forbidden. If a URL is missing
   * a supported parameter, _that is a bug in the API and should be fixed_.
   *
   * The only reason we're attempting to do this here is to support older
   * implementations of the API that were missing supported parameters in
   * templates.
   *
   * The method will assume that missing parameters should be added as
   * query parameters. If there is already a query parameter template,
   * missing parameters will be added to it; if there is no query
   * parameter template, one will be appended.
   *
   * @param {String} url URL whose template will be extended.
   * @param {object} params JSON object whose keys are the parameter names to
   *  be added.
   * @returns {String} Extended version of the URL.
   */
  extendTemplate: function extendTemplate(url) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var extendedUrl = url;
    var templateRegex = RegExp('{([^}]+)}', 'g');
    //const templateRegex = /{([^}]+)}/g;
    var currentParams = {};
    var queryTemplate = '';
    if (extendedUrl) {
      var match;

      // find all parameters provided in existing templates
      do {
        match = templateRegex.exec(url);
        if (match) {
          var fullTemplate = match[0];
          /* eslint-disable-next-line */
          var parameterList = match[1].replace(/[\?]/g, '').replace(/;/g, '').replace(/\+/g, '');
          var parameterNames = parameterList.split(',');
          for (var i = 0; i < parameterNames.length; i++) {
            currentParams[parameterNames[i]] = true;
          }
          // remember the query template if it's present
          if (fullTemplate.indexOf('{?') === 0) {
            queryTemplate = fullTemplate;
          }
        }
      } while (match);

      // figure out which of the provided parameters are missing
      // from templates
      var missingParams = [];
      var expandedParamInUrl = false;
      Object.keys(param).forEach(function (templateParam) {
        if (!currentParams[templateParam]) {
          // in some cases, the URL already have the parameter expanded by `template.expand(params)`
          // only add param to missingParams if it's not already in the url in either expanded/extended form
          // for example: after a doHead call id= parameter is already in the url. (http://localhost.com/repo?id=123)
          // more info on: https://jira.corp.adobe.com/browse/ASSETS-10805
          var paramRegex = new RegExp("[?&]".concat(templateParam, "=([^};&]*)"));
          if (!paramRegex.test(extendedUrl)) {
            missingParams.push(templateParam);
          } else {
            expandedParamInUrl = true;
          }
        }
      });
      if (missingParams.length) {
        var updatedParamList = missingParams.join(',');
        if (queryTemplate.length == 0) {
          if (expandedParamInUrl) {
            // since there's already at least one expanded parameter in the url, add updatedParamList key/value with "&" preface
            // for example http://localhost.com/repo?id=123&updateNewKey=updateNewValue
            extendedUrl += "{&".concat(updatedParamList, "}");
          } else {
            // there is no existing query template. append it.
            extendedUrl += "{?".concat(updatedParamList, "}");
          }
        } else {
          // there is already a query template. add missing parameters to it
          var updatedQueryTemplate = queryTemplate.replace('}', ",".concat(updatedParamList, "}"));
          extendedUrl = extendedUrl.replace(queryTemplate, updatedQueryTemplate);
        }
      }
    }
    return extendedUrl;
  },
  /**
   * Populates URL template parameters from a given URL.
   * @param {String} url URL whose template will be filled, if present.
   * @param {object} params JSON object of parameters to fill the template
   * @returns {String} URL with filled template
   * @private
   */
  fillTemplate: function fillTemplate(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cleanedUrl = url;
    // some templates incorrectly include a trailing ? on parameters that
    // are optional. This was a misinterpretation of the R-API spec. Strip
    // those invalid question marks from the template to ensure that
    // parameters are correctly handled. This logic can be removed when
    // AEM's API implementation no longer includes these characters.
    if (cleanedUrl) {
      var regex = RegExp('{[^}]+}', 'gm');
      var match;
      do {
        match = regex.exec(url);
        if (match) {
          var cleanedTemplate = match[0].replace(/\?}/g, '}').replace(/\?,/g, ',');
          cleanedUrl = cleanedUrl.replace(match[0], cleanedTemplate);
        }
      } while (match);
      // add any missing parameters to template (for backward compatibility)
      cleanedUrl = this.extendTemplate(cleanedUrl, params);
    }
    var template = urlTemplate$1.parse(cleanedUrl);
    return template.expand(params);
  },
  /**
   * Convert link from headers into _links format returned by GET to AEP resource
   * @param headers from HEAD call
   * @private
   */
  extractLinksFromHeaders: function extractLinksFromHeaders(headers) {
    var linkStr = headers.get('link');
    var headerLinks = linkStr.split(', <');
    var link = {};
    var _iterator = _createForOfIteratorHelper$1(headerLinks),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var headerLink = _step.value;
        var linkParts = headerLink.split(/>;|";/g);
        var key = '';
        var val = '';
        var templated = '';
        var _iterator2 = _createForOfIteratorHelper$1(linkParts),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var part = _step2.value;
            if (part.indexOf('rel=') >= 0) {
              key = part.replace('rel=', '').replace(/"/g, '').trim();
            } else if (part.indexOf('templated=') >= 0) {
              templated = part.replace('templated=', '').replace(/"/g, '').trim();
            } else if (part.startsWith('<') || part.startsWith('https://') || part.startsWith('/')) {
              //Value is in the part with leading < or leading https:// for absolute path or / for relative path
              val = part.replace(/[<>]/g, '').trim();
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        link[key] = {
          href: val
        };
        if (templated) {
          link[key].templated = templated === 'true';
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return link;
  },
  /**
   * Find URL base on look-up key
   * @param link whole link map
   * @param key look-up key
   * @param baseURL to resolve relative link path
   * @returns {string} URL
   * @private
   */
  findLink: function findLink(link, key) {
    var baseURL = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    if (link[key] && link[key].href) {
      //In some case, we have to get the base URL to be resolved against relative path
      if (!link[key].href.startsWith('http://') && !link[key].href.startsWith('https://')) {
        return baseURL + (link[key].href.startsWith('/') ? '' : '/') + link[key].href;
      }
      return link[key].href;
    } else if (Array.isArray(link[key])) {
      // sometimes we have an option to choose a link by id (URN) or path -- we prefer id
      // first since it should be stable across renames and moves, and thus more cache-able
      var _link$key$filter$conc = link[key].filter(function (i) {
          return i.mode === 'id';
        }).concat(link[key]),
        _link$key$filter$conc2 = _slicedToArray(_link$key$filter$conc, 1),
        item = _link$key$filter$conc2[0];
      if (item && item.href) {
        //In some case, we have to get the base URL to be resolved against relative path
        if (!item.href.startsWith('http://') && !item.href.startsWith('https://')) {
          return baseURL + (item.href.startsWith('/') ? '' : '/') + item.href;
        }
        return item.href;
      }
    }
    throw new Error("".concat(key, " link not available on this asset"));
  },
  extractFileName: function extractFileName(path) {
    return path.substring(path.lastIndexOf('/') + 1);
  },
  formatDirectoryPath: function formatDirectoryPath(path) {
    if (path.lastIndexOf('/') !== path.length - 1) {
      return "".concat(path, "/");
    }
    return path;
  },
  getErrorFromResponse: function getErrorFromResponse(response) {
    var error = {
      status: response.status,
      statusText: response.statusText
    };
    if (response.headers && response.headers.get('x-request-id')) {
      error['x-request-id'] = response.headers.get('x-request-id');
    }
    return error;
  },
  waitFor: function () {
    var _waitFor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(delay) {
      return _regeneratorRuntime.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              setTimeout(resolve, delay);
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function waitFor() {
      return _waitFor.apply(this, arguments);
    }
    return waitFor;
  }(),
  returnXHRResponse: function returnXHRResponse(xhr, method, resolve, reject, filledTemplate) {
    var _xhr$getResponseHeade;
    if (xhr.readyState !== 4) {
      return;
    }
    var response = {
      ok: xhr.status <= 399,
      json: function json() {
        return JSON.parse(xhr.responseText);
      },
      headers: new Headers(),
      redirected: false,
      status: xhr.status,
      statusText: xhr.statusText,
      trailer: null,
      type: null,
      url: xhr.responseURL,
      clone: null,
      body: null,
      bodyUsed: true,
      arrayBuffer: null,
      blob: null,
      text: function text() {
        return Promise.resolve(xhr.responseText);
      },
      formData: null
    };
    var respRequestId = (_xhr$getResponseHeade = xhr.getResponseHeader('x-request-id')) !== null && _xhr$getResponseHeade !== void 0 ? _xhr$getResponseHeade : 'NO ID';
    if (response.ok) {
      if (method === 'PUT') {
        blockTransfers.removeXhrPut(filledTemplate);
      }
      Logger.log(LogLevel.FINE, {
        message: " < pc ".concat(method, " ").concat(response.status, " [").concat(respRequestId, "] ").concat(filledTemplate),
        requestUrl: response.url,
        requestMethod: method,
        xRequestId: respRequestId,
        filledTemplate: filledTemplate
      });
      return resolve(response);
    }
    Logger.log(LogLevel.WARNING, {
      message: " < pc ".concat(method, " ").concat(response.status, " [").concat(respRequestId, "] ").concat(filledTemplate),
      requestUrl: response.url,
      requestMethod: method,
      responseStatus: response.status,
      xRequestId: respRequestId,
      filledTemplate: filledTemplate
    });
    return reject(response);
  }
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/
/* eslint-disable no-use-before-define */
//import HttpResponse from './HttpResponse';
//import { submitHttpRequest, getHttpErrorInfo } from './HttpUtils';
/**
 * @module platform-connector
 */
/**
 * A customized error that allows errors generated by fetch to be similar
 * in structure to axios errors.
 *  @private
 */
var WrappedFetchError = /*#__PURE__*/function (_Error) {
  _inherits(WrappedFetchError, _Error);
  var _super = _createSuper(WrappedFetchError);
  /**
   * Constructs a new error that uses the given values.
   * @param {string} message Message to show with the error.
   * @param {number} [status] Status code of the error.
   * @param {object} [headers] HTTP headers to associate with the error.
   */
  function WrappedFetchError(message) {
    var _this;
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, WrappedFetchError);
    _this = _super.call(this, message || "Request failed with status code ".concat(status));
    _this.forceSkip = void 0;
    _this.isAxiosError = void 0;
    _this.response = void 0;
    _this.message = message || "Request failed with status code ".concat(status);
    _this.isAxiosError = true;
    if (status) {
      _this.response = {
        status: status,
        headers: headers
      };
    }
    return _this;
  }
  _createClass(WrappedFetchError, null, [{
    key: "fromFetchError",
    value:
    /**
     * Constructs a new wrapped error from a raw fetch error.
     * @param {*} fetchError Error generated by fetch.
     */
    function fromFetchError(fetchError) {
      return new WrappedFetchError(fetchError);
    }
  }]);
  return WrappedFetchError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Determines if an error qualifies for a retry.
 * @private
 * @param {*} e The error to examine.
 * @returns {boolean} True if a retry should occur, false otherwise.
 */
function isRetryError(e) {
  var isAxiosError = e.isAxiosError;
  if (isAxiosError) {
    var _e$response = e.response,
      response = _e$response === void 0 ? {} : _e$response;
    var status = response.status;
    // network errors won't have a status
    return status >= 500 && status < 600 || !status;
  }
  return false;
}

/**
 * Converts an error from the underlying http module into a simple object
 * containing status code, message, and request id information.
 * @private
 * @param {*} e Error information to convert.
 * @returns {object} Simple object containing a "status", "statusText",
 *  and optional "requestId" element.
 */
function getHttpErrorInfo(e) {
  var DEFAULT_STATUS = 500;
  var DEFAULT_TEXT = 'Internal Server Error';
  var errorInfo = {
    status: DEFAULT_STATUS,
    statusText: DEFAULT_TEXT
  };
  if (e) {
    var isAxiosError = e.isAxiosError,
      _e$message = e.message,
      message = _e$message === void 0 ? DEFAULT_TEXT : _e$message,
      _e$response2 = e.response,
      response = _e$response2 === void 0 ? {} : _e$response2;
    if (isAxiosError) {
      var _response$status = response.status,
        status = _response$status === void 0 ? DEFAULT_STATUS : _response$status,
        _response$headers = response.headers,
        headers = _response$headers === void 0 ? {} : _response$headers;
      errorInfo.status = status;
      errorInfo.statusText = message;
      var requestId = headers['x-request-id'];
      if (requestId) {
        errorInfo['x-request-id'] = requestId;
      }
    }
  }
  return errorInfo;
}
function doFetch() {
  return _doFetch.apply(this, arguments);
}
function _doFetch() {
  _doFetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(httpOptions) {
    var fetchOptions, result, url;
    return _regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (typeof httpOptions === 'string') {
            fetchOptions = {
              url: httpOptions,
              method: 'GET'
            };
          } else {
            fetchOptions = _objectSpread$2({}, httpOptions);
          }
          _context.prev = 1;
          url = fetchOptions.url;
          delete fetchOptions.url;
          _context.next = 6;
          return fetch(url, fetchOptions);
        case 6:
          result = _context.sent;
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          throw WrappedFetchError.fromFetchError(_context.t0);
        case 12:
          if (result.ok) {
            _context.next = 14;
            break;
          }
          throw new WrappedFetchError(undefined, result.status, Object.fromEntries(result.headers.entries()));
        case 14:
          return _context.abrupt("return", result);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _doFetch.apply(this, arguments);
}
function submitRequestAndRetry() {
  return _submitRequestAndRetry.apply(this, arguments);
}
function _submitRequestAndRetry() {
  _submitRequestAndRetry = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(httpOptions, retryFunction) {
    var response, status, error;
    return _regeneratorRuntime.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return doFetch(httpOptions);
        case 2:
          response = _context2.sent;
          status = response.status; // if provided, check with retry function to see if a retry is
          // necessary even though the request succeeded
          if (!(retryFunction && retryFunction(status))) {
            _context2.next = 8;
            break;
          }
          error = new WrappedFetchError('retrying request per client', status);
          error.forceSkip = true;
          throw error;
        case 8:
          return _context2.abrupt("return", response);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _submitRequestAndRetry.apply(this, arguments);
}
function handleRetry(error, retryFunction) {
  var forceSkip = error && error.forceSkip;

  // only call retryFunction again if it wasn't called
  // to force a successful request to retry
  if (retryFunction && !forceSkip) {
    var _getHttpErrorInfo = getHttpErrorInfo(error),
      status = _getHttpErrorInfo.status;
    return retryFunction(status);
  } else if (forceSkip || isRetryError(error)) {
    // invoked each time the request is retried.
    // indicates that retrying should continue, but
    // only if the error qualifies or a successful request
    // was forced to retry
    return true;
  }
  // indicates that retrying should cease.
  return false;
}
/**
 * Generic method that submits an HTTP request. Has built-in functionality
 * for automatically retrying the request if it fails. Retries will back
 * off exponentially.
 * @private
 * @param {object} httpOptions Will be passed through as-is to the underlying
 *  HTTP module (axios).
 * @param {SubmitHttpRequestOptions} [options] Control how the method behaves.
 * @param {number} [options.retryCount] The number of times that the method will
 *  retry an HTTP request if it fails. Minimum value is 1, and indicates
 *  that requests should not be retried. Default: 3.
 * @param {number} [options.retryDelay] The amount of time, in milliseconds, that
 *  the method will exponentially back off after each retry. Default: 1000.
 * @param {function} [retryOptions.retryFunction] If provided, will be called with a single status code argument whenever the request fails. If
 *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
 *  the error. Default: not provided.
 */
function submitHttpRequest() {
  return _submitHttpRequest.apply(this, arguments);
}
function _submitHttpRequest() {
  _submitHttpRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(httpOptions) {
    var options,
      _options$retryCount,
      retryCount,
      _options$retryDelay,
      retryDelay,
      _options$retryFunctio,
      retryFunction,
      _args3 = arguments;
    return _regeneratorRuntime.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          _options$retryCount = options.retryCount, retryCount = _options$retryCount === void 0 ? 3 : _options$retryCount, _options$retryDelay = options.retryDelay, retryDelay = _options$retryDelay === void 0 ? 1000 : _options$retryDelay, _options$retryFunctio = options.retryFunction, retryFunction = _options$retryFunctio === void 0 ? false : _options$retryFunctio;
          return _context3.abrupt("return", backOff_1(function () {
            return submitRequestAndRetry(httpOptions, retryFunction);
          }, {
            numOfAttempts: retryCount,
            // will retry up to x times
            retry: function (e) {
              return handleRetry(e, retryFunction);
            },
            startingDelay: retryDelay // will wait x ms after the first try, then x*2 secs after second try, etc.
          }));
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _submitHttpRequest.apply(this, arguments);
}

/**
 * @module platform-connector
 */

/**
 * Client for managing HTTP interactions. Most notably, provides capabilities
 * for submiting HTTP requests and retrieving responses.
 * @private
 */
var HttpClient = /*#__PURE__*/function () {
  function HttpClient() {
    _classCallCheck(this, HttpClient);
  }
  _createClass(HttpClient, [{
    key: "submitRequest",
    value:
    /**
     * Submits an HTTP request, using the given options. They will
     * be passed as-is to the underlying http module.
     * @param {object} options Options for controlling how the request will
     *  behave.
     * @param {object} [retryOptions] Control how the method behaves.
     * @param {number} [retryOptions.retryCount] The number of times that the method will
     *  retry an HTTP request if it fails. Minimum value is 1, and indicates
     *  that requests should not be retried. Default: 1.
     * @param {number} [retryOptions.retryDelay] The amount of time, in milliseconds, that
     *  the method will exponentially back off after each retry.
     * @param {function} [retryOptions.retryFunction] If provided, will be called with a single status code argument whenever the request fails. If
     *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
     *  the error. Default: not provided.
     * @returns {HttpResponse} The response that the target server provided for
     * the request.
     */
    function () {
      var _submitRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(options, retryOptions) {
        var response, errorInfo;
        return _regeneratorRuntime.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return submitHttpRequest(options, retryOptions);
            case 3:
              response = _context.sent;
              return _context.abrupt("return", response);
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              errorInfo = getHttpErrorInfo(_context.t0);
              throw new Error(JSON.stringify(errorInfo));
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      function submitRequest() {
        return _submitRequest.apply(this, arguments);
      }
      return submitRequest;
    }()
  }]);
  return HttpClient;
}();

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Private Actions
 * DO NOT Export outside of api.
 * @private
 */
var actions = {
  /**
   * Sends a request using an HTTP client and the given parameters to build it.
   * @param {String} method - the request method (GET, POST etc)
   * @param {String} url - the URL where the request will be sent to
   * @param {Object} params - parameters for template
   * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
   * @param {Object} body - the body of the request
   * @param {Number} retryCount - the number of times the request should be retried before giving up. Minimum value is 1, and indicates
   *  that requests should not be retried. Default: 1.
   * @param {Function} retryFunction - if provided, will be called with a single status code argument whenever the request fails. If
   *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
   *  the error. Default: not provided.
   * @param {Object} customOptions - if provided, additional raw HTTP options to pass to the http client.
   * @returns {Promise<*>}
   */
  doFetchWithOptions: function () {
    var _doFetchWithOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var method,
        url,
        params,
        customHeaders,
        body,
        retryCount,
        retryFunction,
        customOptions,
        options,
        httpClient,
        response,
        _response,
        status,
        respHeaders,
        respRequestId,
        logLevel,
        _args = arguments;
      return _regeneratorRuntime.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            method = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'GET';
            url = _args.length > 1 ? _args[1] : undefined;
            params = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            customHeaders = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            body = _args.length > 4 ? _args[4] : undefined;
            retryCount = _args.length > 5 && _args[5] !== undefined ? _args[5] : 1;
            retryFunction = _args.length > 6 && _args[6] !== undefined ? _args[6] : function () {};
            customOptions = _args.length > 7 && _args[7] !== undefined ? _args[7] : {};
            options = _objectSpread$1(_objectSpread$1({
              method: method,
              headers: customHeaders
            }, customOptions), {}, {
              body: body,
              url: utils.fillTemplate(url, params)
            });
            if (body) {
              options.body = JSON.stringify(body);
            }
            Logger.log(LogLevel.INFO, {
              message: " > pc ".concat(method, " ").concat(options.url),
              requestUrl: options.url,
              requestMethod: method
            });
            httpClient = new HttpClient();
            _context.prev = 12;
            _context.next = 15;
            return httpClient.submitRequest(options, {
              retryCount: retryCount,
              retryFunction: retryFunction
            });
          case 15:
            response = _context.sent;
            _context.next = 22;
            break;
          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](12);
            Logger.log(LogLevel.SEVERE, {
              message: " < pc failed to send ".concat(options.url),
              requestUrl: options.url,
              requestMethod: method
            });
            throw _context.t0;
          case 22:
            _response = response, status = _response.status, respHeaders = _response.headers;
            respRequestId = respHeaders.has('x-request-id') ? respHeaders.get('x-request-id') : 'NO ID';
            logLevel = status < 400 ? LogLevel.INFO : LogLevel.SEVERE;
            Logger.log(logLevel, {
              message: " < pc ".concat(method, " ").concat(status, " [").concat(respRequestId, "] ").concat(options.url),
              requestUrl: options.url,
              requestMethod: method,
              responseStatus: status,
              xRequestId: respRequestId
            });
            return _context.abrupt("return", response);
          case 27:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[12, 18]]);
    }));
    function doFetchWithOptions() {
      return _doFetchWithOptions.apply(this, arguments);
    }
    return doFetchWithOptions;
  }(),
  /**
   * Sends a request using an HTTP client and the given parameters to build it.
   * @param {String} method - the request method (GET, POST etc)
   * @param {String} url - the URL where the request will be sent to
   * @param {Object} ims object with token and apiKey
   * @param {Object} params - parameters for template
   * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
   * @param {String}cacheMode - the cache mode to be used (default, no-cache, reload, force-cache, only-if-cached)
   * @param {Object} body - the body of the request
   * @param {Number} retryCount - the number of times the request should be retried before giving up. Minimum value is 1, and indicates
   *  that requests should not be retried. Default: 1.
   * @param {Function} retryFunction - if provided, will be called with a single status code argument whenever the request fails. If
   *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
   *  the error. Default: not provided.
   * @returns {Promise<*>}
   */
  doFetch: function () {
    var _doFetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var method,
        url,
        ims,
        params,
        customHeaders,
        body,
        cacheMode,
        retryCount,
        retryFunction,
        requestHeaders,
        _args2 = arguments;
      return _regeneratorRuntime.wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            method = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 'GET';
            url = _args2.length > 1 ? _args2[1] : undefined;
            ims = _args2.length > 2 ? _args2[2] : undefined;
            params = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
            customHeaders = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : {};
            body = _args2.length > 5 ? _args2[5] : undefined;
            cacheMode = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : 'default';
            retryCount = _args2.length > 7 && _args2[7] !== undefined ? _args2[7] : 1;
            retryFunction = _args2.length > 8 && _args2[8] !== undefined ? _args2[8] : function () {};
            requestHeaders = utils.getHeader(customHeaders, ims);
            return _context2.abrupt("return", actions.doFetchWithOptions(method, url, params, requestHeaders, body, retryCount, retryFunction, {
              cache: cacheMode
            }));
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function doFetch() {
      return _doFetch.apply(this, arguments);
    }
    return doFetch;
  }(),
  doGet: function () {
    var _doGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(url, ims) {
      var params,
        customHeaders,
        cacheMode,
        retryCount,
        retryFunction,
        response,
        _args3 = arguments;
      return _regeneratorRuntime.wrap(function (_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            params = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
            customHeaders = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
            cacheMode = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : 'default';
            retryCount = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : 1;
            retryFunction = _args3.length > 6 && _args3[6] !== undefined ? _args3[6] : function () {};
            _context3.next = 7;
            return actions.doFetch('GET', url, ims, params, customHeaders, undefined, cacheMode, retryCount, retryFunction);
          case 7:
            response = _context3.sent;
            return _context3.abrupt("return", response);
          case 9:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function doGet() {
      return _doGet.apply(this, arguments);
    }
    return doGet;
  }(),
  doHead: function () {
    var _doHead = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(url, ims) {
      var params,
        customHeaders,
        response,
        _args4 = arguments;
      return _regeneratorRuntime.wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
            customHeaders = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
            _context4.next = 4;
            return actions.doFetch('HEAD', url, ims, params, customHeaders);
          case 4:
            response = _context4.sent;
            return _context4.abrupt("return", response);
          case 6:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function doHead() {
      return _doHead.apply(this, arguments);
    }
    return doHead;
  }(),
  doPost: function () {
    var _doPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(url, ims) {
      var params,
        customHeaders,
        payload,
        cacheMode,
        retryCount,
        retryFunction,
        response,
        _args5 = arguments;
      return _regeneratorRuntime.wrap(function (_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
            customHeaders = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
            payload = _args5.length > 4 ? _args5[4] : undefined;
            cacheMode = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : 'default';
            retryCount = _args5.length > 6 && _args5[6] !== undefined ? _args5[6] : 0;
            retryFunction = _args5.length > 7 && _args5[7] !== undefined ? _args5[7] : undefined;
            _context5.next = 8;
            return actions.doFetch('POST', url, ims, params, customHeaders, payload, cacheMode, retryCount, retryFunction);
          case 8:
            response = _context5.sent;
            return _context5.abrupt("return", response);
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    function doPost() {
      return _doPost.apply(this, arguments);
    }
    return doPost;
  }(),
  /**
   * handles usecase https://git.corp.adobe.com/pages/caf/api-spec/chapters/advanced/asynchronous_invocation.html
   */
  /**
   * @description: Do poll
   * @param {String} url - the URL where the request will be sent to
   * @param {Object} ims object with token and apiKey
   * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
   */
  doPoll: function () {
    var _doPoll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(url, ims) {
      var customHeaders,
        maxRetryInterval,
        interval,
        getResponse,
        promiseTimeout,
        _args6 = arguments;
      return _regeneratorRuntime.wrap(function (_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            customHeaders = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
            maxRetryInterval = 3000;
            interval = maxRetryInterval;
          case 3:
            _context6.next = 5;
            return actions.doGet(url, ims, {}, customHeaders, 'default', 0);
          case 5:
            getResponse = _context6.sent;
            if (getResponse.headers.has('retry-after')) {
              // if the response header include `retry-after`, then use that as delay interval
              interval = getResponse.headers.get('retry-after');
              // aem backend returns interval in seconds instead of milliseconds. R-API spec doesn't specify
              // whether to use seconds or milliseconds, so a sanity check is needed here
              interval = interval * 1000 > maxRetryInterval ? maxRetryInterval : interval * 1000;
            }
            promiseTimeout = function (delay) {
              return new Promise(function (resolve) {
                setTimeout(resolve, delay);
              });
            };
            _context6.next = 10;
            return promiseTimeout(interval);
          case 10:
            if (getResponse && getResponse.status === 202) {
              _context6.next = 3;
              break;
            }
          case 11:
            return _context6.abrupt("return", getResponse);
          case 12:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function doPoll() {
      return _doPoll.apply(this, arguments);
    }
    return doPoll;
  }(),
  /**
   * handles usecase https://git.corp.adobe.com/pages/caf/api-spec/chapters/advanced/asynchronous_invocation.html
   */
  doPostAsync: function () {
    var _doPostAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(url, ims) {
      var params,
        customHeaders,
        payload,
        response,
        location,
        _args7 = arguments;
      return _regeneratorRuntime.wrap(function (_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
            customHeaders = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
            payload = _args7.length > 4 ? _args7[4] : undefined;
            _context7.next = 5;
            return actions.doPost(url, ims, params, customHeaders, payload);
          case 5:
            response = _context7.sent;
            if (!(response && response.status === 202 && response.headers && response.headers.has('location'))) {
              _context7.next = 9;
              break;
            }
            location = response.headers.get('location');
            return _context7.abrupt("return", actions.doPoll(location, ims, customHeaders));
          case 9:
            return _context7.abrupt("return", response);
          case 10:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function doPostAsync() {
      return _doPostAsync.apply(this, arguments);
    }
    return doPostAsync;
  }(),
  doDelete: function () {
    var _doDelete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(url, ims) {
      var params,
        customHeaders,
        payload,
        response,
        _args8 = arguments;
      return _regeneratorRuntime.wrap(function (_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            params = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
            customHeaders = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
            payload = _args8.length > 4 ? _args8[4] : undefined;
            _context8.next = 5;
            return actions.doFetch('DELETE', url, ims, params, customHeaders, payload);
          case 5:
            response = _context8.sent;
            return _context8.abrupt("return", response);
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function doDelete() {
      return _doDelete.apply(this, arguments);
    }
    return doDelete;
  }(),
  doPut: function () {
    var _doPut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(url, ims) {
      var params,
        customHeaders,
        payload,
        response,
        _args9 = arguments;
      return _regeneratorRuntime.wrap(function (_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
            customHeaders = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
            payload = _args9.length > 4 ? _args9[4] : undefined;
            _context9.next = 5;
            return actions.doFetch('PUT', url, ims, params, customHeaders, payload);
          case 5:
            response = _context9.sent;
            return _context9.abrupt("return", response);
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    function doPut() {
      return _doPut.apply(this, arguments);
    }
    return doPut;
  }(),
  doPatch: function () {
    var _doPatch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(url, ims) {
      var params,
        customHeaders,
        payload,
        response,
        _args10 = arguments;
      return _regeneratorRuntime.wrap(function (_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            params = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : {};
            customHeaders = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
            payload = _args10.length > 4 ? _args10[4] : undefined;
            _context10.next = 5;
            return actions.doFetch('PATCH', url, ims, params, customHeaders, payload);
          case 5:
            response = _context10.sent;
            return _context10.abrupt("return", response);
          case 7:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    function doPatch() {
      return _doPatch.apply(this, arguments);
    }
    return doPatch;
  }(),
  /**
   * XHR POST call
   * @param {string} url
   * @param {Object} ims object with token and apiKey
   * @param {Object} params parameters for template
   * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
   * @param {ArrayBuffer} payload
   * @param {UploadOptions} options and callbacks for upload
   * @returns {Promise<*>}
   */
  doXhrPost: function () {
    var _doXhrPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(url, ims) {
      var params,
        customHeaders,
        payload,
        options,
        headers,
        filledTemplate,
        postResponse,
        _args11 = arguments;
      return _regeneratorRuntime.wrap(function (_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            params = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
            customHeaders = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
            payload = _args11.length > 4 && _args11[4] !== undefined ? _args11[4] : null;
            options = _args11.length > 5 ? _args11[5] : undefined;
            headers = utils.getHeader(customHeaders, ims);
            filledTemplate = utils.fillTemplate(url, params);
            _context11.next = 8;
            return new Promise(function (resolve, reject) {
              var _global;
              var xhr = new XMLHttpRequest();
              xhr.open('POST', filledTemplate, true);
              for (var name in headers) {
                // eslint-disable-next-line no-prototype-builtins
                if (headers.hasOwnProperty(name) && name.toLowerCase() !== 'content-length') {
                  xhr.setRequestHeader(name, headers[name]);
                }
              }

              // eslint-disable-next-line no-undef
              if (!((_global = global) !== null && _global !== void 0 && _global.isNodeEnv)) {
                xhr.upload.addEventListener('progress', function (e) {
                  return options.onProgress && options.onProgress(e);
                });
              }
              xhr.onerror = function (e) {
                reject(e);
              };
              xhr.onreadystatechange = function () {
                return utils.returnXHRResponse(xhr, 'POST', resolve, reject, filledTemplate);
              };
              Logger.log(LogLevel.INFO, {
                message: " > pc POST ".concat(url),
                requestUrl: url,
                requestMethod: 'POST',
                filledTemplate: filledTemplate
              });
              xhr.send(payload || null);
            });
          case 8:
            postResponse = _context11.sent;
            return _context11.abrupt("return", postResponse);
          case 10:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    function doXhrPost() {
      return _doXhrPost.apply(this, arguments);
    }
    return doXhrPost;
  }(),
  /**
   * XHR POST call
   * @param {string} url
   * @param {Object} ims object with token and apiKey
   * @param {Object} params parameters for template
   * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
   * @param {ArrayBuffer} payload
   * @param {Object} options and callbacks for upload
   * @returns {Promise<XHRResponse>}
   */
  doXhrPut: function () {
    var _doXhrPut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(url, ims) {
      var params,
        customHeaders,
        payload,
        options,
        headers,
        filledTemplate,
        putResponse,
        _args12 = arguments;
      return _regeneratorRuntime.wrap(function (_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            params = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};
            customHeaders = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
            payload = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : null;
            options = _args12.length > 5 ? _args12[5] : undefined;
            headers = {};
            if (options.update) {
              headers = utils.getHeader(customHeaders, ims);
            }
            filledTemplate = utils.fillTemplate(url, params);
            _context12.next = 9;
            return new Promise(function (resolve, reject) {
              var _global2;
              var xhr = new XMLHttpRequest();
              for (var name in headers) {
                // eslint-disable-next-line no-prototype-builtins
                if (headers.hasOwnProperty(name) && name.toLowerCase() !== 'content-length') {
                  xhr.setRequestHeader(name, headers[name]);
                }
              }

              // eslint-disable-next-line no-undef
              if (!((_global2 = global) !== null && _global2 !== void 0 && _global2.isNodeEnv)) {
                xhr.upload.addEventListener('progress', function (e) {
                  return options.onProgress && options.onProgress(e);
                });
              }
              xhr.onerror = function (e) {
                reject(e);
              };
              xhr.onreadystatechange = function () {
                return utils.returnXHRResponse(xhr, 'PUT', resolve, reject, filledTemplate);
              };
              Logger.log(LogLevel.INFO, {
                message: " > pc PUT ".concat(url),
                requestUrl: url,
                requestMethod: 'PUT',
                filledTemplate: filledTemplate
              });
              xhr.open('PUT', filledTemplate, true);
              xhr.send(payload || null);
              blockTransfers.addXhrPut({
                path: filledTemplate,
                xhr: xhr
              });
            });
          case 9:
            putResponse = _context12.sent;
            return _context12.abrupt("return", putResponse);
          case 11:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }));
    function doXhrPut() {
      return _doXhrPut.apply(this, arguments);
    }
    return doXhrPut;
  }()
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * The main component for this package is PlatformConnector.  For more info, please see
 * {@link module:platform-connector~PlatformConnector|PlatformConnector}.
 * @module platform-connector
 */

/**
 *  OperationParams
 *  @typedef {Object} OperationParams
 *  @property {string} op - operation to be performed
 *  @property {object} source source object
 *  @property {object} target destination object
 */

var REPO_REPOSITORY_ID = 'repo:repositoryId';
var REPO_ASSET_ID = 'repo:assetId';

/**
 * CreateResourceOptions
 * @typedef {Object} CreateResourceOptions - options
 * @property {boolean} intermediates - intermediates to add to url param
 * @property {string} respondsWith - option for responds with to add to url param
 * @property {string} contentType - content type to add to custom header
 */
var Operation;
(function (Operation) {
  Operation["copy"] = "copy";
  Operation["move"] = "move";
  Operation["discard"] = "discard";
  Operation["delete"] = "delete";
  Operation["restore"] = "restore";
})(Operation || (Operation = {}));
/**
 * @class
 * @public
 * @description This is the primary export object for utilities methods accessing discovery, resolved resources (by path / id), paginated resource list,
 * permission, etc.<br/>NOTE: All methods take in an array of links, which are returned from the platform "_links". Then, the method grabs a necessary link based on
 * the look-up to access the proper resource based on HAL setup.<br/>
 * @example <caption>Use as a single connector</caption>
 * PlatformConnector.init({imsAccessToken, apiKey, platformUrl});
 * const discoveryData = PlatformConnector.getDiscovery();
 * @example <caption>Use as a single connector with extra header to be passed to platform for every call</caption>
 * PlatformConnector.init({imsAccessToken, apiKey, platformUrl, {x-special-header:'some-value'}});
 * const discoveryData = PlatformConnector.getDiscovery();
 * @example <caption>Use as a scoped object in case of multiple platform access</caption>
 * const myPlatform = PlatformConnector.init({imsAccessToken, apiKey, platformUrl});
 * const discoveryData = myPlatform.getDiscovery();
 */
var PlatformConnector = {
  /**
   * Initialized the PlatformConnector ims object with necessary authorization details
   * @param {string} accessToken - An ims accesstoken from authentication. Basic Authorization header values are also supported.
   * @param {string} apiKey - A unique identifyer per application.
   * @param {string} platformUrl - Platform URL for entry point
   * @param {string} discoveryRoot - discovery root - pass null for default
   * @param {object} [linkNS={}] - link namespace for lookup - this can be partially overwritten.
   * @param {object} customHeader - extra header to be passed with every call except discovery
   * @param {object} logger - optional logger used throughout various PlatformConnector methods. The supplied logger
   *  must define methods info(), debug(), warn(), and error(). By default if no logger is supplied, logging output
   *  will be ignored.
   * @return {object} cloned object of PlatformConnector
   */
  init: function init(_ref) {
    var accessToken = _ref.accessToken,
      apiKey = _ref.apiKey,
      platformUrl = _ref.platformUrl,
      discoveryRoot = _ref.discoveryRoot,
      _ref$linkNS = _ref.linkNS,
      linkNS = _ref$linkNS === void 0 ? {} : _ref$linkNS,
      _ref$customHeader = _ref.customHeader,
      customHeader = _ref$customHeader === void 0 ? {} : _ref$customHeader,
      logger = _ref.logger;
    PlatformConnector._ims.accessToken = accessToken;
    PlatformConnector._ims.apiKey = apiKey;
    PlatformConnector._ims.platformUrl = platformUrl;
    PlatformConnector._discoveryRoot = discoveryRoot ? discoveryRoot : DISCOVERY.root;
    PlatformConnector._linkNS = merge$1(LINK_NS, linkNS);
    PlatformConnector._customHeader = customHeader;
    // sets logger if supplied, otherwise defaults to no-op instance
    Logger.setLogger(logger);
    return clone$1(PlatformConnector);
  },
  /**
   * @private
   */
  _ims: {
    accessToken: undefined,
    apiKey: undefined,
    platformUrl: undefined
  },
  // this gets populdated from the init() method
  /**
   * @private
   */
  _discoveryRoot: DISCOVERY.root,
  /**
   * @private
   */
  _linkNS: LINK_NS,
  /**
   * Base URL to resolve all relative links extracted from discovery
   * @private
   */
  _baseURL: '',
  /**
   * Custom Header to be passed with all calls except discovery
   * @private
   */
  _customHeader: {},
  /**
   * Format the ifMatch param based on asset type
   * @param source
   * @private
   */
  _formatIfMatch: function _formatIfMatch(source) {
    // as per spec, ops on directories should not have `if-match` passed in. we may need to revisit this in the
    // future for collections
    return source['dc:format'] && source['dc:format'].indexOf('directory') < 0 ? {
      'if-match': source['repo:etag'] || '*'
    } : {};
  },
  /**
   * Get initial discovery object (entry point)
   * @return {object} response JSON of discovery
   * @public
   */
  getDiscovery: function () {
    var _getDiscovery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _json, _json$children, _json$children$find, _json$children$find$_;
      var url, optimizedIndexResponse, json, discoverableAssetsResponse, assetsJsonLink, _discoverableAssetsRe, _discoverableAssetJSO, _discoverableAssetJSO2, _discoverableAssetJSO3, discoverableAssetsResponsePage, discoverableAssetJSON, nextDiscoverLink, _discoverableAssetsRe2, _discoverableAssetJSO4, _discoverableAssetJSO5, _discoverableAssetJSO6, _json2, _json2$children, _json2$children$find, _json2$children$find$, _discoverableAssetsRe3, indexJsonLink, resolveByPathLink, resolveByPathURL;
      return _regeneratorRuntime.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            url = PlatformConnector._ims.platformUrl + PlatformConnector._discoveryRoot;
            _context.next = 3;
            return actions.doGet(url, PlatformConnector._ims, {}, {});
          case 3:
            optimizedIndexResponse = _context.sent;
            _context.next = 6;
            return optimizedIndexResponse.json();
          case 6:
            json = _context.sent;
            assetsJsonLink = (_json = json) === null || _json === void 0 ? void 0 : (_json$children = _json.children) === null || _json$children === void 0 ? void 0 : (_json$children$find = _json$children.find(function (child) {
              return child['repo:name'] === 'Assets.json';
            })) === null || _json$children$find === void 0 ? void 0 : (_json$children$find$_ = _json$children$find._links[LINK_NS.page]) === null || _json$children$find$_ === void 0 ? void 0 : _json$children$find$_.href; // This logic checks if the response is from indexedDiscovery.
            if (!assetsJsonLink) {
              _context.next = 38;
              break;
            }
            _context.next = 11;
            return actions.doGet(assetsJsonLink, PlatformConnector._ims, {
              limit: 10
            }, {});
          case 11:
            discoverableAssetsResponsePage = _context.sent;
            discoverableAssetJSON = {
              _links: {
                next: {
                  href: ''
                }
              },
              children: undefined
            };
            if (!(((_discoverableAssetsRe = discoverableAssetsResponsePage) === null || _discoverableAssetsRe === void 0 ? void 0 : _discoverableAssetsRe.status) === 200)) {
              _context.next = 18;
              break;
            }
            _context.next = 16;
            return discoverableAssetsResponsePage.json();
          case 16:
            discoverableAssetJSON = _context.sent;
            json = discoverableAssetJSON;
          case 18:
            nextDiscoverLink = (_discoverableAssetJSO = discoverableAssetJSON) === null || _discoverableAssetJSO === void 0 ? void 0 : (_discoverableAssetJSO2 = _discoverableAssetJSO._links) === null || _discoverableAssetJSO2 === void 0 ? void 0 : (_discoverableAssetJSO3 = _discoverableAssetJSO2.next) === null || _discoverableAssetJSO3 === void 0 ? void 0 : _discoverableAssetJSO3.href; // todo: any
            // For AEP, the max page size is 10 - we have to keep calling until no more next link
            // to get all discoverable assets - TODO: Need to revisit this
          case 19:
            if (!nextDiscoverLink) {
              _context.next = 34;
              break;
            }
            _context.next = 22;
            return actions.doGet(nextDiscoverLink, PlatformConnector._ims, {}, {});
          case 22:
            discoverableAssetsResponsePage = _context.sent;
            if (!(((_discoverableAssetsRe2 = discoverableAssetsResponsePage) === null || _discoverableAssetsRe2 === void 0 ? void 0 : _discoverableAssetsRe2.status) === 200)) {
              _context.next = 29;
              break;
            }
            _context.next = 26;
            return discoverableAssetsResponsePage.json();
          case 26:
            discoverableAssetJSON = _context.sent;
            _context.next = 30;
            break;
          case 29:
            nextDiscoverLink = null;
          case 30:
            json.children = json.children.concat(discoverableAssetJSON.children);
            nextDiscoverLink = (_discoverableAssetJSO4 = discoverableAssetJSON) === null || _discoverableAssetJSO4 === void 0 ? void 0 : (_discoverableAssetJSO5 = _discoverableAssetJSO4._links) === null || _discoverableAssetJSO5 === void 0 ? void 0 : (_discoverableAssetJSO6 = _discoverableAssetJSO5.next) === null || _discoverableAssetJSO6 === void 0 ? void 0 : _discoverableAssetJSO6.href;
            _context.next = 19;
            break;
          case 34:
            //remove all irrelevant content
            delete json._page;
            delete json._links.next;
            _context.next = 47;
            break;
          case 38:
            // AEM Case - No available Assets.json.  Use Index.json
            indexJsonLink = (_json2 = json) === null || _json2 === void 0 ? void 0 : (_json2$children = _json2.children) === null || _json2$children === void 0 ? void 0 : (_json2$children$find = _json2$children.find(function (child) {
              return child['repo:name'] === 'Index.json';
            })) === null || _json2$children$find === void 0 ? void 0 : (_json2$children$find$ = _json2$children$find._links[LINK_NS.primary]) === null || _json2$children$find$ === void 0 ? void 0 : _json2$children$find$.href;
            if (!indexJsonLink) {
              _context.next = 43;
              break;
            }
            _context.next = 42;
            return actions.doGet(indexJsonLink, PlatformConnector._ims, {}, {});
          case 42:
            discoverableAssetsResponse = _context.sent;
          case 43:
            if (!(((_discoverableAssetsRe3 = discoverableAssetsResponse) === null || _discoverableAssetsRe3 === void 0 ? void 0 : _discoverableAssetsRe3.status) === 200)) {
              _context.next = 47;
              break;
            }
            _context.next = 46;
            return discoverableAssetsResponse.json();
          case 46:
            json = _context.sent;
          case 47:
            if (json._links) {
              resolveByPathLink = utils.findLink(json._links, PlatformConnector._linkNS.resolvePath);
              if (resolveByPathLink) {
                resolveByPathURL = new URL(resolveByPathLink);
                PlatformConnector._baseURL = resolveByPathURL.origin;
              }
            }
            return _context.abrupt("return", json);
          case 49:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getDiscovery() {
      return _getDiscovery.apply(this, arguments);
    }
    return getDiscovery;
  }(),
  /**
   * Get federated discovery
   * @param discoveryJSON JSON from getDiscovery()
   * @param repoId ID of selected repo to perform further discovery
   * @returns {object} JSON for federated discovery if the link is available; otherwise, return the original discovery object
   */
  getFederatedDiscovery: function () {
    var _getFederatedDiscovery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(discoveryJSON, repoId) {
      var selectedRepo, primaryLink, federatedResp, federatedJSON;
      return _regeneratorRuntime.wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            selectedRepo = discoveryJSON.children.find(function (child) {
              return child._embedded[PlatformConnector._linkNS.metadata.repo]['repo:repositoryId'] === repoId;
            });
            if (selectedRepo) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", discoveryJSON);
          case 3:
            //if there is no repo matched with repoId, return original discovery object
            primaryLink = selectedRepo._embedded['Repositories.json']._links[PlatformConnector._linkNS.primary]; //grab federated discovery link
            if (!(!primaryLink || !primaryLink.href)) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", discoveryJSON);
          case 6:
            _context2.next = 8;
            return actions.doGet(primaryLink.href, PlatformConnector._ims, {}, {});
          case 8:
            federatedResp = _context2.sent;
            if (federatedResp) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", discoveryJSON);
          case 11:
            _context2.next = 13;
            return federatedResp.json();
          case 13:
            federatedJSON = _context2.sent;
            if (federatedJSON) {
              _context2.next = 16;
              break;
            }
            return _context2.abrupt("return", discoveryJSON);
          case 16:
            //fallback to original discovery object

            federatedJSON._links = federatedJSON.children[0]._embedded._links; //lift the link from children up to match with classic discovery
            return _context2.abrupt("return", federatedJSON);
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getFederatedDiscovery() {
      return _getFederatedDiscovery.apply(this, arguments);
    }
    return getFederatedDiscovery;
  }(),
  /**
   * Get resource from primary link
   * @param {object[]} link - links from base asset
   * @param {object} params - parameter based on template
   * @param {string} cacheMode - default or force-cache
   * @return {(object | binary)} Returns JSON response for folders. Returns binary data for Files & Composites
   * @public
   */
  getResource: function () {
    var _getResource = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(link, params) {
      var cacheMode,
        primaryUrl,
        _args3 = arguments;
      return _regeneratorRuntime.wrap(function (_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            cacheMode = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'default';
            primaryUrl = utils.findLink(link, PlatformConnector._linkNS.primary, PlatformConnector._baseURL);
            return _context3.abrupt("return", actions.doGet(primaryUrl, PlatformConnector._ims, params, PlatformConnector._customHeader, cacheMode));
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function getResource() {
      return _getResource.apply(this, arguments);
    }
    return getResource;
  }(),
  /**
   * Get resource from resolvePath link
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {object} params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
   * @param {string} cacheMode - default or force-cache
   * @return {(object | binary)} Returns JSON response for folders. Returns binary data for Files & Composites
   */
  getResourceByPath: function () {
    var _getResourceByPath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(discoveryLink, params) {
      var cacheMode,
        resolvePathURL,
        headersRes,
        resourceLink,
        _args4 = arguments;
      return _regeneratorRuntime.wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            cacheMode = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 'default';
            //find resolve by path URL
            resolvePathURL = utils.findLink(discoveryLink, PlatformConnector._linkNS.resolvePath, PlatformConnector._baseURL); //Do HEAD call to get further link
            _context4.next = 4;
            return actions.doHead(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 4:
            headersRes = _context4.sent;
            //Grab primary to get resource
            resourceLink = utils.extractLinksFromHeaders(headersRes.headers);
            return _context4.abrupt("return", PlatformConnector.getResource(resourceLink, params, cacheMode));
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function getResourceByPath() {
      return _getResourceByPath.apply(this, arguments);
    }
    return getResourceByPath;
  }(),
  /**
   * Get resource from resolveId link
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {object} params - parameter based on template for resolveId - do getDiscovery to check link template
   * @param {string} cacheMode - default or force-cache
   * @return {(object | binary)} Returns JSON response for folders. Returns binary data for Files & Composites
   */
  getResourceById: function () {
    var _getResourceById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(discoveryLink, params) {
      var cacheMode,
        resolvePathURL,
        headersRes,
        resourceLink,
        _args5 = arguments;
      return _regeneratorRuntime.wrap(function (_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            cacheMode = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 'default';
            //find resolve by path URL
            resolvePathURL = utils.findLink(discoveryLink, PlatformConnector._linkNS.resolveId, PlatformConnector._baseURL); //Do HEAD call to get further link
            _context5.next = 4;
            return actions.doHead(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 4:
            headersRes = _context5.sent;
            //Grab primary to get resource
            resourceLink = utils.extractLinksFromHeaders(headersRes.headers);
            return _context5.abrupt("return", PlatformConnector.getResource(resourceLink, params, cacheMode));
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    function getResourceById() {
      return _getResourceById.apply(this, arguments);
    }
    return getResourceById;
  }(),
  /**
   * Get the links for a resource via its path
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
   * @return {object} - Object containing all the resouce links
   */
  getLinksByPath: function () {
    var _getLinksByPath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(discoveryLink, params) {
      var resolvePathURL, getRes, getResJSON, headersRes;
      return _regeneratorRuntime.wrap(function (_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            //find resolve by path URL
            resolvePathURL = utils.findLink(discoveryLink, PlatformConnector._linkNS.resolvePath, PlatformConnector._baseURL);
            _context6.prev = 1;
            _context6.next = 4;
            return actions.doGet(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 4:
            getRes = _context6.sent;
            _context6.next = 7;
            return getRes.json();
          case 7:
            getResJSON = _context6.sent;
            return _context6.abrupt("return", getResJSON._links);
          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](1);
            _context6.next = 15;
            return actions.doHead(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 15:
            headersRes = _context6.sent;
            return _context6.abrupt("return", utils.extractLinksFromHeaders(headersRes.headers));
          case 17:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[1, 11]]);
    }));
    function getLinksByPath() {
      return _getLinksByPath.apply(this, arguments);
    }
    return getLinksByPath;
  }(),
  /**
   * Get the links for a resource via its id
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param params - parameter based on template for resolveId - do getDiscovery to check link template ?repositoryId,id,rel_type
   * @return {object} - Object containing all the resouce links
   */
  getLinksById: function () {
    var _getLinksById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(discoveryLink, params) {
      var resolvePathURL, headersRes;
      return _regeneratorRuntime.wrap(function (_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            //find resolve by path URL
            resolvePathURL = utils.findLink(discoveryLink, PlatformConnector._linkNS.resolveId, PlatformConnector._baseURL); //Do HEAD call to get further link
            _context7.next = 3;
            return actions.doHead(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 3:
            headersRes = _context7.sent;
            return _context7.abrupt("return", utils.extractLinksFromHeaders(headersRes.headers));
          case 5:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function getLinksById() {
      return _getLinksById.apply(this, arguments);
    }
    return getLinksById;
  }(),
  /**
   * Get the unaltered response for a head call at path
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
   * @return {object} - Unaltered Head response.
   */
  getHeadByPath: function () {
    var _getHeadByPath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(discoveryLink, params) {
      var resolvePathURL, headersRes;
      return _regeneratorRuntime.wrap(function (_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            //find resolve by path URL
            resolvePathURL = utils.findLink(discoveryLink, PlatformConnector._linkNS.resolvePath, PlatformConnector._baseURL);
            _context8.next = 3;
            return actions.doHead(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 3:
            headersRes = _context8.sent;
            return _context8.abrupt("return", headersRes);
          case 5:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function getHeadByPath() {
      return _getHeadByPath.apply(this, arguments);
    }
    return getHeadByPath;
  }(),
  /**
   * @deprecated on 8/18/2022 v2.0.1
   * Duplicate implementation {@see getHeadByPath}
   *
   * Checks if a Resource Exists by its path
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
   * @return {object} - Object containing all the resouce links
   */
  checkResourceExistsByPath: function () {
    var _checkResourceExistsByPath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(discoveryLink, params) {
      var resolvePathURL, headersRes;
      return _regeneratorRuntime.wrap(function (_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            //find resolve by path URL
            resolvePathURL = utils.findLink(discoveryLink, PlatformConnector._linkNS.resolvePath, PlatformConnector._baseURL);
            _context9.next = 3;
            return actions.doHead(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 3:
            headersRes = _context9.sent;
            return _context9.abrupt("return", headersRes);
          case 5:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    function checkResourceExistsByPath() {
      return _checkResourceExistsByPath.apply(this, arguments);
    }
    return checkResourceExistsByPath;
  }(),
  /**
   * Checks if a Resource Exists by its id
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param params - parameter based on template for resolveId - do getDiscovery to check link template ?repositoryId,id,rel_type
   * @return {object} - Object containing all the resouce links
   */
  checkResourceExistsById: function () {
    var _checkResourceExistsById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(discoveryLink, params) {
      var resolvePathURL, headersRes;
      return _regeneratorRuntime.wrap(function (_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            //find resolve by path URL
            resolvePathURL = utils.findLink(discoveryLink, PlatformConnector._linkNS.resolveId, PlatformConnector._baseURL);
            _context10.next = 3;
            return actions.doHead(resolvePathURL, PlatformConnector._ims, params, PlatformConnector._customHeader);
          case 3:
            headersRes = _context10.sent;
            return _context10.abrupt("return", headersRes);
          case 5:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    function checkResourceExistsById() {
      return _checkResourceExistsById.apply(this, arguments);
    }
    return checkResourceExistsById;
  }(),
  /**
   * Expose templating logic for client use.
   * @param {string} linkHrefWithTemplate - Url with a template. See https://datatracker.ietf.org/doc/html/rfc6570
   * @param {object} templateParams - object containing the values to fill in for the template ie.  {includeCreatedByMe: true}
   * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'} [method]
   * @param {object} [customHeaders] - additional headers to apply
   * @param {object} [payload] - the body of the request
   * @returns {Promise<object>} - Promise of response object from fetch
   */
  applyLinkTemplate: function () {
    var _applyLinkTemplate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(linkHrefWithTemplate, templateParams) {
      var method,
        customHeaders,
        payload,
        fetchAction,
        _args11 = arguments;
      return _regeneratorRuntime.wrap(function (_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            method = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : 'GET';
            customHeaders = _args11.length > 3 ? _args11[3] : undefined;
            payload = _args11.length > 4 ? _args11[4] : undefined;
            _context11.t0 = method;
            _context11.next = _context11.t0 === 'POST' ? 6 : _context11.t0 === 'PUT' ? 8 : _context11.t0 === 'PATCH' ? 10 : _context11.t0 === 'DELETE' ? 12 : _context11.t0 === 'HEAD' ? 14 : 16;
            break;
          case 6:
            fetchAction = actions.doPost;
            return _context11.abrupt("break", 18);
          case 8:
            fetchAction = actions.doPut;
            return _context11.abrupt("break", 18);
          case 10:
            fetchAction = actions.doPatch;
            return _context11.abrupt("break", 18);
          case 12:
            fetchAction = actions.doDelete;
            return _context11.abrupt("break", 18);
          case 14:
            fetchAction = actions.doHead;
            return _context11.abrupt("break", 18);
          case 16:
            fetchAction = actions.doGet;
            return _context11.abrupt("break", 18);
          case 18:
            return _context11.abrupt("return", fetchAction(linkHrefWithTemplate, PlatformConnector._ims, templateParams, customHeaders, payload));
          case 19:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    function applyLinkTemplate() {
      return _applyLinkTemplate.apply(this, arguments);
    }
    return applyLinkTemplate;
  }(),
  /**
   * Get pagination list of child resource under this resource (typically folder)
   * @param {object[]} link - links of the current resource to get child resource list
   * @param {object} params - parameters to be used to fill template (see platform doc)
   * @param {boolean} first - true for first page
   * @param {string} cacheMode - default or force-cache
   * @return {Promise<object>} Response for page call
   */
  getPage: function () {
    var _getPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(link) {
      var params,
        first,
        cacheMode,
        pageUrl,
        response,
        _args12 = arguments;
      return _regeneratorRuntime.wrap(function (_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            params = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
            first = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : true;
            cacheMode = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : 'default';
            //find resolve by path URL
            pageUrl = utils.findLink(link, first ? PlatformConnector._linkNS.page : PlatformConnector._linkNS.next, PlatformConnector._baseURL);
            _context12.next = 6;
            return actions.doGet(pageUrl, PlatformConnector._ims, params, PlatformConnector._customHeader, cacheMode);
          case 6:
            response = _context12.sent;
            return _context12.abrupt("return", response.json());
          case 8:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }));
    function getPage() {
      return _getPage.apply(this, arguments);
    }
    return getPage;
  }(),
  /**
   * Get permission based on resource link
   * @param {object[]} link - links from base asset
   * @return {object} JSON representing permission
   */
  getPermission: function () {
    var _getPermission = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(link) {
      var aclUrl, response;
      return _regeneratorRuntime.wrap(function (_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            aclUrl = utils.findLink(link, PlatformConnector._linkNS.acEffective, PlatformConnector._baseURL);
            _context13.next = 3;
            return actions.doGet(aclUrl, PlatformConnector._ims, {}, PlatformConnector._customHeader);
          case 3:
            response = _context13.sent;
            return _context13.abrupt("return", response.json());
          case 5:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }));
    function getPermission() {
      return _getPermission.apply(this, arguments);
    }
    return getPermission;
  }(),
  /**
   * Fetch a rendition of an asset. Convert binary into an ObjectUrl the client can use.
   * @param {object[]} link - links from base asset
   * @param {Object} params based on template {;page size type}
   * @param {boolean} [isBlockURL=false] - true if it is uses rendition block URL
   * @param {string} cacheMode - :default or force-cache
   * @return {string} - a url the client can use to render rendition
   */
  getRendition: function () {
    var _getRendition = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(link, params) {
      var cacheMode,
        isBlockURL,
        renditionLink,
        renditionUrl,
        response,
        option,
        _ref2,
        _ref3,
        item,
        buffer,
        _args14 = arguments;
      return _regeneratorRuntime.wrap(function (_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            cacheMode = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 'default';
            isBlockURL = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : false;
            renditionLink = PlatformConnector._linkNS.rendition;
            renditionUrl = utils.findLink(link, renditionLink, PlatformConnector._baseURL);
            if (!isBlockURL) {
              _context14.next = 10;
              break;
            }
            _context14.next = 7;
            return actions.doFetchWithOptions('GET', renditionUrl, params);
          case 7:
            response = _context14.sent;
            _context14.next = 13;
            break;
          case 10:
            _context14.next = 12;
            return actions.doGet(renditionUrl, PlatformConnector._ims, params, PlatformConnector._customHeader, cacheMode);
          case 12:
            response = _context14.sent;
          case 13:
            _ref2 = Array.isArray(link[renditionLink]) ?
            // rendition link returns and array
            // sometimes we have an option to choose a link by id (URN) or path -- we prefer id
            // first since it should be stable across renames and moves, and thus more cache-able
            link[renditionLink].filter(function (i) {
              return i.mode === 'id';
            }).concat(link[renditionLink]) : [link[renditionLink]], _ref3 = _slicedToArray(_ref2, 1), item = _ref3[0];
            if (item && item.type) {
              option = {
                type: item.type
              };
            }
            _context14.next = 17;
            return response.arrayBuffer();
          case 17:
            buffer = _context14.sent;
            return _context14.abrupt("return", URL.createObjectURL(new Blob([new Uint8Array(buffer)], option)));
          case 19:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }));
    function getRendition() {
      return _getRendition.apply(this, arguments);
    }
    return getRendition;
  }(),
  /**
   * Fetch an asset repository metadata
   * @param {object[]} link - links from base asset
   * @param {string} cacheMode - default or force-cache
   * @return {object} - json object containing the assets repo metadata
   */
  getRepoMetadata: function () {
    var _getRepoMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(link) {
      var cacheMode,
        repoMetadataUrl,
        response,
        _args15 = arguments;
      return _regeneratorRuntime.wrap(function (_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            cacheMode = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 'default';
            repoMetadataUrl = utils.findLink(link, PlatformConnector._linkNS.metadata.repo, PlatformConnector._baseURL);
            _context15.next = 4;
            return actions.doGet(repoMetadataUrl, PlatformConnector._ims, {}, PlatformConnector._customHeader, cacheMode);
          case 4:
            response = _context15.sent;
            return _context15.abrupt("return", response.json());
          case 6:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }));
    function getRepoMetadata() {
      return _getRepoMetadata.apply(this, arguments);
    }
    return getRepoMetadata;
  }(),
  /**
   * @deprecated since version 2.9.0 use {@link #getAssetMetadata} instead
   * Fetch an asset embedded metadata
   * @param {object[]} link - links from base asset
   * @param {string} cacheMode - default or force-cache
   * @return {object} - response of this asset application embedded request
   */
  getEmbeddedMetadata: function () {
    var _getEmbeddedMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(link) {
      var cacheMode,
        embeddedMetadataUrl,
        _args16 = arguments;
      return _regeneratorRuntime.wrap(function (_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            cacheMode = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 'default';
            embeddedMetadataUrl = utils.findLink(link, PlatformConnector._linkNS.metadata.embedded, PlatformConnector._baseURL);
            return _context16.abrupt("return", actions.doGet(embeddedMetadataUrl, PlatformConnector._ims, {}, _objectSpread({
              Accept: 'application/json'
            }, PlatformConnector._customHeader), cacheMode));
          case 3:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    }));
    function getEmbeddedMetadata() {
      return _getEmbeddedMetadata.apply(this, arguments);
    }
    return getEmbeddedMetadata;
  }(),
  /**
   * @deprecated since version 2.9.0 use {@link #getAssetMetadata} instead
   * Fetch an asset application metadata
   * @param {object[]} link - links from base asset
   * @param {string} cacheMode - default or force-cache
   * @return {object} - response of this asset application metadata request
   */
  getApplicationMetadata: function () {
    var _getApplicationMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(link) {
      var cacheMode,
        applicationMetadataUrl,
        _args17 = arguments;
      return _regeneratorRuntime.wrap(function (_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            cacheMode = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 'default';
            applicationMetadataUrl = utils.findLink(link, PlatformConnector._linkNS.metadata.app, PlatformConnector._baseURL);
            return _context17.abrupt("return", actions.doGet(applicationMetadataUrl, PlatformConnector._ims, {}, PlatformConnector._customHeader, cacheMode));
          case 3:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    }));
    function getApplicationMetadata() {
      return _getApplicationMetadata.apply(this, arguments);
    }
    return getApplicationMetadata;
  }(),
  /**
   * Fetch an asset metadata: including application metadata and embedded metadata
   * @param {object[]} link - links from base asset
   * @param {string} cacheMode - default or force-cache
   * @return {object} - response of this asset application metadata request
   */
  getAssetMetadata: function () {
    var _getAssetMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18(link) {
      var cacheMode,
        applicationMetadataUrl,
        _args18 = arguments;
      return _regeneratorRuntime.wrap(function (_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            cacheMode = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : 'default';
            applicationMetadataUrl = utils.findLink(link, PlatformConnector._linkNS.metadata.asset, PlatformConnector._baseURL);
            return _context18.abrupt("return", actions.doGet(applicationMetadataUrl, PlatformConnector._ims, {}, PlatformConnector._customHeader, cacheMode));
          case 3:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    }));
    function getAssetMetadata() {
      return _getAssetMetadata.apply(this, arguments);
    }
    return getAssetMetadata;
  }(),
  /**
   * @deprecated since version 2.9.0 use {@link #setAssetMetadata} instead
   * Sets the value of an application metadata with given name for a specific asset.
   * The etag of the application metadata resource is required.
   * @param {Object} links - links from base asset
   * @param {string} name - the name of the application metadata to set
   * @param {string|Array<string>} value - the new value of the given application metadata, can be an array of strings as well
   * @param {string} etag - the application metadata resource etag
   * @return {Response} platform's response to the set app metadata request
   * @throws exception when the response status code is >=400
   */
  setApplicationMetadata: function () {
    var _setApplicationMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee19(links, name, value, etag) {
      return _regeneratorRuntime.wrap(function (_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            return _context19.abrupt("return", PlatformConnector.setApplicationMetadataBulkOperation(links, [{
              name: name,
              value: value
            }], etag));
          case 1:
          case "end":
            return _context19.stop();
        }
      }, _callee19);
    }));
    function setApplicationMetadata() {
      return _setApplicationMetadata.apply(this, arguments);
    }
    return setApplicationMetadata;
  }(),
  /**
   * @deprecated since version 2.9.0 use {@link #setAssetMetadataBulkOperation} instead
   * Sets multiple metadata values of an application metadata with given name for a specific asset.
   * The etag of the application metadata resource is required.
   * @param {Object} links - links from base asset
   * @param {Object[]} changes - array of changes with name, and value
   * @param {string} etag - the application metadata resource etag
   * @return {Response} platform's response to the set app metadata request
   * @throws exception when the response status code is >=400
   */
  setApplicationMetadataBulkOperation: function () {
    var _setApplicationMetadataBulkOperation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee20(links, changes, etag) {
      var applicationMetadataUrl, data;
      return _regeneratorRuntime.wrap(function (_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            applicationMetadataUrl = utils.findLink(links, PlatformConnector._linkNS.metadata.app, PlatformConnector._baseURL);
            data = changes.map(function (change) {
              return {
                op: 'add',
                path: "/".concat(change.name),
                value: change.value
              };
            });
            return _context20.abrupt("return", actions.doPatch(applicationMetadataUrl, PlatformConnector._ims, undefined, _objectSpread(_objectSpread({
              'Content-Type': 'application/json-patch+json'
            }, etag && {
              'If-Match': etag
            }), PlatformConnector._customHeader), data));
          case 3:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    }));
    function setApplicationMetadataBulkOperation() {
      return _setApplicationMetadataBulkOperation.apply(this, arguments);
    }
    return setApplicationMetadataBulkOperation;
  }(),
  /**
   * Sets the value of an asset application metadata or embedded metadata.
   * The etag of the application metadata resource is required.
   * @param {Object} links - links from base asset
   * @param {string} name - the name of the application metadata to set
   * @param {string|Array<string>} value - the new value of the given application metadata, can be an array of strings as well
   * @param {string} etag - the application metadata resource etag
   * @return {Response} platform's response to the set app metadata request
   * @throws exception when the response status code is >=400
   */
  setAssetMetadata: function () {
    var _setAssetMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee21(links, name, value, etag) {
      return _regeneratorRuntime.wrap(function (_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            return _context21.abrupt("return", PlatformConnector.setAssetMetadataBulkOperation(links, [{
              name: name,
              value: value
            }], etag));
          case 1:
          case "end":
            return _context21.stop();
        }
      }, _callee21);
    }));
    function setAssetMetadata() {
      return _setAssetMetadata.apply(this, arguments);
    }
    return setAssetMetadata;
  }(),
  /**
   * Sets an asset multiple application metadata and/or embedded metadata.
   * The etag of the application metadata resource is required.
   * @param {Object} links - links from base asset
   * @param {Object[]} changes - array of changes with name, and value
   * @param {string} etag - the application metadata resource etag
   * @return {Response} platform's response to the set app metadata request
   * @throws exception when the response status code is >=400
   */
  setAssetMetadataBulkOperation: function () {
    var _setAssetMetadataBulkOperation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee22(links, changes, etag) {
      var applicationMetadataUrl, data;
      return _regeneratorRuntime.wrap(function (_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            applicationMetadataUrl = utils.findLink(links, PlatformConnector._linkNS.metadata.asset, PlatformConnector._baseURL);
            data = changes.map(function (change) {
              return {
                op: 'add',
                path: "/".concat(change.name),
                value: change.value
              };
            });
            return _context22.abrupt("return", actions.doPatch(applicationMetadataUrl, PlatformConnector._ims, undefined, _objectSpread(_objectSpread({
              'Content-Type': 'application/json-patch+json'
            }, etag && {
              'If-Match': etag
            }), PlatformConnector._customHeader), data));
          case 3:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    }));
    function setAssetMetadataBulkOperation() {
      return _setAssetMetadataBulkOperation.apply(this, arguments);
    }
    return setAssetMetadataBulkOperation;
  }(),
  /**
   * add assets to a collection
   * @param {Object} links - links from base asset
   * @param {Array<string>} assetPaths - list of assetPaths
   * @return {Response} platform's response to the adding to collection
   * @throws exception when the response status code is >=400
   */
  addToCollection: function () {
    var _addToCollection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee23(links, assetPaths) {
      return _regeneratorRuntime.wrap(function (_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            return _context23.abrupt("return", updateCollection('add', links, assetPaths));
          case 1:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    }));
    function addToCollection() {
      return _addToCollection.apply(this, arguments);
    }
    return addToCollection;
  }(),
  /**
   * remove assets from a collection
   * @param {Object} links - links from base asset
   * @param {Array<string>} assetPaths - list of assetPaths
   * @return {Response} platform's response to removing from collection
   * @throws exception when the response status code is >=400
   */
  removeFromCollection: function () {
    var _removeFromCollection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee24(links, assetPaths) {
      return _regeneratorRuntime.wrap(function (_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            return _context24.abrupt("return", updateCollection('remove', links, assetPaths));
          case 1:
          case "end":
            return _context24.stop();
        }
      }, _callee24);
    }));
    function removeFromCollection() {
      return _removeFromCollection.apply(this, arguments);
    }
    return removeFromCollection;
  }(),
  /**
   * Get the response of an embedded query
   * @param {object[]} links - links from base asset
   * @param {object} params - parameter based on template
   * @param {string} cacheMode - default or force-cache
   * @return {object} JSON object of the response of the embedded resources
   * @private
   */
  query: function () {
    var _query = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee25(links) {
      var params,
        cacheMode,
        queryUrl,
        response,
        _args25 = arguments;
      return _regeneratorRuntime.wrap(function (_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            params = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : {};
            cacheMode = _args25.length > 2 && _args25[2] !== undefined ? _args25[2] : 'default';
            queryUrl = utils.findLink(links, PlatformConnector._linkNS.query, PlatformConnector._baseURL);
            _context25.next = 5;
            return actions.doGet(queryUrl, PlatformConnector._ims, params, PlatformConnector._customHeader, cacheMode);
          case 5:
            response = _context25.sent;
            return _context25.abrupt("return", response.json());
          case 7:
          case "end":
            return _context25.stop();
        }
      }, _callee25);
    }));
    function query() {
      return _query.apply(this, arguments);
    }
    return query;
  }(),
  /**
   * @deprecated since version 3.1.0 use {@link #getMetadata} instead
   * Fetch all types of metadata of an asset using the query relation
   * @param {object[]} links - links from base asset
   * @param {string} cacheMode - default or force-cache
   * @return {object} - JSON object containing all types of assets metadata
   */
  getAllMetadata: function () {
    var _getAllMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee26(links) {
      var cacheMode,
        metadataLinks,
        embed,
        _args26 = arguments;
      return _regeneratorRuntime.wrap(function (_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            cacheMode = _args26.length > 1 && _args26[1] !== undefined ? _args26[1] : 'default';
            // requests for metadata based on available links
            metadataLinks = [PlatformConnector._linkNS.metadata.app, PlatformConnector._linkNS.metadata.embedded, PlatformConnector._linkNS.metadata.repo];
            embed = metadataLinks.filter(function (key) {
              return links[key];
            }).map(function (link) {
              return {
                resource: {
                  reltype: link
                }
              };
            });
            return _context26.abrupt("return", PlatformConnector.query(links, {
              embed: JSON.stringify(embed)
            }, cacheMode));
          case 4:
          case "end":
            return _context26.stop();
        }
      }, _callee26);
    }));
    function getAllMetadata() {
      return _getAllMetadata.apply(this, arguments);
    }
    return getAllMetadata;
  }(),
  /**
   * Fetch all types of metadata of an asset using the query relation
   * @param {object[]} links - links from base asset
   * @param {string} cacheMode - default or force-cache
   * @return {object} - JSON object containing all types of assets metadata
   */
  getMetadata: function () {
    var _getMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee27(links) {
      var cacheMode,
        metadataLinks,
        embed,
        _args27 = arguments;
      return _regeneratorRuntime.wrap(function (_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            cacheMode = _args27.length > 1 && _args27[1] !== undefined ? _args27[1] : 'default';
            // requests for metadata based on available links
            metadataLinks = [PlatformConnector._linkNS.metadata.asset, PlatformConnector._linkNS.metadata.repo];
            embed = metadataLinks.filter(function (key) {
              return links[key];
            }).map(function (link) {
              return {
                resource: {
                  reltype: link
                }
              };
            });
            return _context27.abrupt("return", PlatformConnector.query(links, {
              embed: JSON.stringify(embed)
            }, cacheMode));
          case 4:
          case "end":
            return _context27.stop();
        }
      }, _callee27);
    }));
    function getMetadata() {
      return _getMetadata.apply(this, arguments);
    }
    return getMetadata;
  }(),
  /**
   * Fetch the version history for an asset
   * @param {object[]} link - links from base asset
   * @return {string} - JSON representation of the versions
   */
  getVersions: function () {
    var _getVersions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee28(link) {
      var versionsUrl, response;
      return _regeneratorRuntime.wrap(function (_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            versionsUrl = utils.findLink(link, PlatformConnector._linkNS.version, PlatformConnector._baseURL);
            _context28.next = 3;
            return actions.doGet(versionsUrl, PlatformConnector._ims, {}, PlatformConnector._customHeader);
          case 3:
            response = _context28.sent;
            return _context28.abrupt("return", response.json());
          case 5:
          case "end":
            return _context28.stop();
        }
      }, _callee28);
    }));
    function getVersions() {
      return _getVersions.apply(this, arguments);
    }
    return getVersions;
  }(),
  /**
   * Fetch the searchable fields by AEM
   * @param {object[]} link - links from base asset
   * @return {string} - JSON representation of the searchable fields
   */
  getSearchableFields: function () {
    var _getSearchableFields = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee29(link) {
      var searchableFieldsUrl, response;
      return _regeneratorRuntime.wrap(function (_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            searchableFieldsUrl = utils.findLink(link, PlatformConnector._linkNS.searchableFields, PlatformConnector._baseURL);
            _context29.next = 3;
            return actions.doGet(searchableFieldsUrl, PlatformConnector._ims, {}, PlatformConnector._customHeader);
          case 3:
            response = _context29.sent;
            return _context29.abrupt("return", response.json());
          case 5:
          case "end":
            return _context29.stop();
        }
      }, _callee29);
    }));
    function getSearchableFields() {
      return _getSearchableFields.apply(this, arguments);
    }
    return getSearchableFields;
  }(),
  /**
   * Copy 1 or more resource(s) to a target folder
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {object[]} sources - an array of source asset information with minimal format {repo:path [,repo:etag]}
   * @param {object} target - an object containing all the asset(directory) information from the platform
   * @param {string} repositoryId - repository ID
   * @return {object} JSON represent copy
   */
  copyResources: function () {
    var _copyResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee30(discoveryLink, sources, target, repositoryId) {
      var opUrl, copyParamsArray, _iterator, _step, source, fileName, payload;
      return _regeneratorRuntime.wrap(function (_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            opUrl = utils.findLink(discoveryLink, PlatformConnector._linkNS.ops, PlatformConnector._baseURL);
            copyParamsArray = [];
            _iterator = _createForOfIteratorHelper(sources);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                source = _step.value;
                fileName = utils.extractFileName(source[PlatformConnectorConstants.REPO_PATH]);
                copyParamsArray.push({
                  op: Operation.copy,
                  source: _objectSpread(_defineProperty$2({
                    'repo:repositoryId': repositoryId
                  }, PlatformConnectorConstants.REPO_PATH, source[PlatformConnectorConstants.REPO_PATH]), PlatformConnector._formatIfMatch(source)),
                  target: _defineProperty$2({
                    'repo:repositoryId': repositoryId
                  }, PlatformConnectorConstants.REPO_PATH, utils.formatDirectoryPath(target[PlatformConnectorConstants.REPO_PATH]) + fileName)
                });
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            if (copyParamsArray.length === 1) {
              payload = copyParamsArray[0];
            } else {
              payload = copyParamsArray;
            }
            return _context30.abrupt("return", actions.doPostAsync(opUrl, PlatformConnector._ims, {}, _objectSpread({
              'Content-Type': 'application/vnd.adobe.asset-operation+json'
            }, PlatformConnector._customHeader), payload));
          case 6:
          case "end":
            return _context30.stop();
        }
      }, _callee30);
    }));
    function copyResources() {
      return _copyResources.apply(this, arguments);
    }
    return copyResources;
  }(),
  /**
   * Rename 1 asset to a new name
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {object[]} source - a single source asset information with minimal format {repo:path [,repo:etag]}
   * @param {string} newName to assign to asset
   * @param {string} repositoryId - repository ID
   * @return {object} JSON representing rename response
   */
  renameSingleResource: function () {
    var _renameSingleResource = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee31(discoveryLink, source, newName, repositoryId) {
      var opUrl, path, parentPath, newPath, moveParams, postResponse;
      return _regeneratorRuntime.wrap(function (_context31) {
        while (1) switch (_context31.prev = _context31.next) {
          case 0:
            opUrl = utils.findLink(discoveryLink, PlatformConnector._linkNS.ops, PlatformConnector._baseURL);
            path = source[PlatformConnectorConstants.REPO_PATH];
            parentPath = path.substring(0, path.lastIndexOf('/'));
            newPath = utils.formatDirectoryPath(parentPath) + newName;
            moveParams = {
              op: Operation.move,
              source: _objectSpread(_defineProperty$2({
                'repo:repositoryId': repositoryId
              }, PlatformConnectorConstants.REPO_PATH, source[PlatformConnectorConstants.REPO_PATH]), PlatformConnector._formatIfMatch(source)),
              target: _defineProperty$2({
                'repo:repositoryId': repositoryId
              }, PlatformConnectorConstants.REPO_PATH, newPath)
            };
            _context31.next = 7;
            return actions.doPostAsync(opUrl, PlatformConnector._ims, {}, {
              'Content-Type': 'application/vnd.adobe.asset-operation+json'
            }, moveParams);
          case 7:
            postResponse = _context31.sent;
            return _context31.abrupt("return", postResponse.json());
          case 9:
          case "end":
            return _context31.stop();
        }
      }, _callee31);
    }));
    function renameSingleResource() {
      return _renameSingleResource.apply(this, arguments);
    }
    return renameSingleResource;
  }(),
  /**
   * Move 1 or more resource(s) to a target folder
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {object[]} sources - an array of source asset informaton with minimal format {repo:path [,repo:etag]}
   * @param {object} target - an object containing all the asset(directory) information from the platform
   * @param {string} repositoryId - repository ID
   * @returns {object} JSON represent move
   */
  moveResources: function () {
    var _moveResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee32(discoveryLink, sources, target, repositoryId) {
      var opUrl, moveParams, _iterator2, _step2, source, fileName, body;
      return _regeneratorRuntime.wrap(function (_context32) {
        while (1) switch (_context32.prev = _context32.next) {
          case 0:
            opUrl = utils.findLink(discoveryLink, PlatformConnector._linkNS.ops, PlatformConnector._baseURL);
            moveParams = [];
            _iterator2 = _createForOfIteratorHelper(sources);
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                source = _step2.value;
                fileName = utils.extractFileName(source[PlatformConnectorConstants.REPO_PATH]);
                moveParams.push({
                  op: Operation.move,
                  source: _objectSpread(_defineProperty$2({
                    'repo:repositoryId': repositoryId
                  }, PlatformConnectorConstants.REPO_PATH, source[PlatformConnectorConstants.REPO_PATH]), PlatformConnector._formatIfMatch(source)),
                  target: _defineProperty$2({
                    'repo:repositoryId': repositoryId
                  }, PlatformConnectorConstants.REPO_PATH, utils.formatDirectoryPath(target[PlatformConnectorConstants.REPO_PATH]) + fileName)
                });
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            body = moveParams.length === 1 ? moveParams[0] : moveParams;
            return _context32.abrupt("return", actions.doPostAsync(opUrl, PlatformConnector._ims, {}, _objectSpread({
              'Content-Type': 'application/vnd.adobe.asset-operation+json'
            }, PlatformConnector._customHeader), body));
          case 6:
          case "end":
            return _context32.stop();
        }
      }, _callee32);
    }));
    function moveResources() {
      return _moveResources.apply(this, arguments);
    }
    return moveResources;
  }(),
  /**
   * @description Poll for async processing process status until it is done
   * @param {string} uri - uri used to poll for checking processing status
   * @returns {Promise<Object>}
   */
  pollForProcessed: function () {
    var _pollForProcessed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee33(uri) {
      return _regeneratorRuntime.wrap(function (_context33) {
        while (1) switch (_context33.prev = _context33.next) {
          case 0:
            return _context33.abrupt("return", actions.doPoll(uri, PlatformConnector._ims, PlatformConnector._ims));
          case 1:
          case "end":
            return _context33.stop();
        }
      }, _callee33);
    }));
    function pollForProcessed() {
      return _pollForProcessed.apply(this, arguments);
    }
    return pollForProcessed;
  }(),
  /**
   * @description Move 1 or more resource(s) to a target folder.
   * The POST response as 200 or 202 will be passed to the client to handle to suit their need.
   * @param {object[]} discoveryLinks - links from discovery including operation URI
   * @param {object[]} sources - an array of source assets with metadata like {repo:path [,repo:etag]}
   * @param {object} target - an object containing the target asset(directory) information
   * @param {string} repositoryId - repository ID
   * @returns {Promise<Object>}
   */
  move: function () {
    var _move = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee34(discoveryLinks, sources, target, repositoryId) {
      return _regeneratorRuntime.wrap(function (_context34) {
        while (1) switch (_context34.prev = _context34.next) {
          case 0:
            return _context34.abrupt("return", operation(Operation.move, discoveryLinks, {
              sources: sources,
              target: target
            }, repositoryId));
          case 1:
          case "end":
            return _context34.stop();
        }
      }, _callee34);
    }));
    function move() {
      return _move.apply(this, arguments);
    }
    return move;
  }(),
  /**
   * @description Copy 1 or more resource(s) to a target folder
   * The POST response as 200 or 202 will be passed to the client to handle to suit their need.
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {object[]} sources - an array of source asset information with minimal format {repo:path [,repo:etag]}
   * @param {object} target - an object containing all the asset(directory) information from the platform
   * @param {string} repositoryId - repository ID
   * @return {object} JSON represent copy
   */
  copy: function () {
    var _copy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee35(discoveryLinks, sources, target, repositoryId) {
      return _regeneratorRuntime.wrap(function (_context35) {
        while (1) switch (_context35.prev = _context35.next) {
          case 0:
            return _context35.abrupt("return", operation(Operation.copy, discoveryLinks, {
              sources: sources,
              target: target
            }, repositoryId));
          case 1:
          case "end":
            return _context35.stop();
        }
      }, _callee35);
    }));
    function copy() {
      return _copy.apply(this, arguments);
    }
    return copy;
  }(),
  /**
   * @description Discard 1 or more resource(s) - These can be restored via the api:restore link.
   * The POST response as 200 or 202 will be passed to the client to handle to suit their need.
   * @param {object[]} discoveryLinks - links from discovery including operation URI
   * @param {object[]} targets - an array of target assets with metadata like {repo:assetId [,repo:etag]}
   * @param {string} repositoryId - repository ID
   * @param {boolean} forceOperation - set true to discard the asset even if published or referenced
   * @returns {Promise<Object>}
   */
  discard: function () {
    var _discard = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee36(discoveryLinks, targets, repositoryId) {
      var forceOperation,
        _args36 = arguments;
      return _regeneratorRuntime.wrap(function (_context36) {
        while (1) switch (_context36.prev = _context36.next) {
          case 0:
            forceOperation = _args36.length > 3 && _args36[3] !== undefined ? _args36[3] : false;
            return _context36.abrupt("return", operation(Operation.discard, discoveryLinks, {
              targets: targets
            }, repositoryId, {
              forceOperation: forceOperation
            }));
          case 2:
          case "end":
            return _context36.stop();
        }
      }, _callee36);
    }));
    function discard() {
      return _discard.apply(this, arguments);
    }
    return discard;
  }(),
  /**
   * Discard a single resource - It can be restored via the api:restore link.
   * @param {Object} links - links from base resource
   * @param {string} repositoryId - repository ID
   * @return {Response} platform's response to the discard request
   * @throws exception when the response status code is >=400
   */
  discardSingleResource: function () {
    var _discardSingleResource = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee37(links, repositoryId) {
      var discardUrl;
      return _regeneratorRuntime.wrap(function (_context37) {
        while (1) switch (_context37.prev = _context37.next) {
          case 0:
            discardUrl = utils.findLink(links, PlatformConnector._linkNS.discard, PlatformConnector._baseURL);
            return _context37.abrupt("return", actions.doPost(discardUrl, PlatformConnector._ims, {
              repositoryId: repositoryId
            }, PlatformConnector._customHeader));
          case 2:
          case "end":
            return _context37.stop();
        }
      }, _callee37);
    }));
    function discardSingleResource() {
      return _discardSingleResource.apply(this, arguments);
    }
    return discardSingleResource;
  }(),
  /**
   * Discard 1 or more resource(s) - These can be restored via the api:restore link.
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {object[]} targets - an array of objects containing all assets information from the platform {repo:assetId [,repo:etag]}
   * @param {string} repositoryId - repository ID
   * @param {boolean} forceOperation - set true to discard the asset even if published or referenced
   * @return {JSON} represent discard
   */
  discardResources: function () {
    var _discardResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee38(discoveryLink, targets, repositoryId) {
      var forceOperation,
        _args38 = arguments;
      return _regeneratorRuntime.wrap(function (_context38) {
        while (1) switch (_context38.prev = _context38.next) {
          case 0:
            forceOperation = _args38.length > 3 && _args38[3] !== undefined ? _args38[3] : false;
            return _context38.abrupt("return", ops(Operation.discard, discoveryLink, targets, repositoryId, {
              forceOperation: forceOperation
            }));
          case 2:
          case "end":
            return _context38.stop();
        }
      }, _callee38);
    }));
    function discardResources() {
      return _discardResources.apply(this, arguments);
    }
    return discardResources;
  }(),
  /**
   * Delete 1 or more resource(s) - These can NOT be restored.
   * @param {object} discoveryLink - links from discovery for ops
   * @param {object[]} targets - an array of objects containing all assets information from the platform {repo:assetId [,repo:etag]}
   * @param {string} repositoryId - repository ID
   * @param {boolean} optionalPayload.recursive - specify whether deletion will recursively delete a folders with children
   * @param {boolean} optionalPayload.forceOperation - set true to discard the asset even if published or referenced
   * @return {JSON} represent discard
   */
  deleteResources: function () {
    var _deleteResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee39(discoveryLink, targets, repositoryId) {
      var recursive,
        forceOperation,
        _args39 = arguments;
      return _regeneratorRuntime.wrap(function (_context39) {
        while (1) switch (_context39.prev = _context39.next) {
          case 0:
            recursive = _args39.length > 3 && _args39[3] !== undefined ? _args39[3] : true;
            forceOperation = _args39.length > 4 && _args39[4] !== undefined ? _args39[4] : true;
            return _context39.abrupt("return", ops('delete', discoveryLink, targets, repositoryId, {
              recursive: recursive,
              forceOperation: forceOperation
            }));
          case 3:
          case "end":
            return _context39.stop();
        }
      }, _callee39);
    }));
    function deleteResources() {
      return _deleteResources.apply(this, arguments);
    }
    return deleteResources;
  }(),
  /**
   * Restore 1 or more resource(s)
   * @param {object} discoveryLink - links from discovery for ops
   * @param {object[]} targets - an array of objects containing all assets information from the platform {repo:assetId [,repo:etag]}
   * @param {string} repositoryId - repository ID
   * @return {Response} api response
   */
  restoreResources: function () {
    var _restoreResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee40(discoveryLink, targets, repositoryId) {
      return _regeneratorRuntime.wrap(function (_context40) {
        while (1) switch (_context40.prev = _context40.next) {
          case 0:
            return _context40.abrupt("return", ops('restore', discoveryLink, targets, repositoryId));
          case 1:
          case "end":
            return _context40.stop();
        }
      }, _callee40);
    }));
    function restoreResources() {
      return _restoreResources.apply(this, arguments);
    }
    return restoreResources;
  }(),
  /**
   * Generate packages(s) for the selected assets
   * @param {object[]} discoveryLink - links from discovery for ops
   * @param {string} repositoryId - repository ID
   * @param {object[]} resources - an array of resource asset information with minimal format {repo:path}
   * @param {string} packageName - a preferred package name. Default is null
   * @return {object} JSON represent package response
   */
  packageResources: function () {
    var _packageResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee41(discoveryLink, repositoryId, resources) {
      var packageName,
        opUrl,
        packageParams,
        postResponse,
        _args41 = arguments;
      return _regeneratorRuntime.wrap(function (_context41) {
        while (1) switch (_context41.prev = _context41.next) {
          case 0:
            packageName = _args41.length > 3 && _args41[3] !== undefined ? _args41[3] : undefined;
            opUrl = utils.findLink(discoveryLink, PlatformConnector._linkNS.ops, PlatformConnector._baseURL);
            resources.forEach(function (resource) {
              resource['repo:repositoryId'] = repositoryId;
            });
            packageParams = _objectSpread({
              op: 'package',
              source: resources
            }, packageName && {
              package_name: packageName
            });
            _context41.next = 6;
            return actions.doPostAsync(opUrl, PlatformConnector._ims, {
              repositoryId: repositoryId
            }, _objectSpread({
              'Content-Type': 'application/vnd.adobe.asset-operation+json'
            }, PlatformConnector._customHeader), packageParams);
          case 6:
            postResponse = _context41.sent;
            return _context41.abrupt("return", postResponse.json());
          case 8:
          case "end":
            return _context41.stop();
        }
      }, _callee41);
    }));
    function packageResources() {
      return _packageResources.apply(this, arguments);
    }
    return packageResources;
  }(),
  /**
   * Create folder as a child of current node
   * @param {object[]} link - links from current node
   * @param {string} path - path to be created (/ can be used as a delimiter for creating nested folders)
   * @return {object} response object
   */
  createFolder: function () {
    var _createFolder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee42(link, path) {
      var createUrl;
      return _regeneratorRuntime.wrap(function (_context42) {
        while (1) switch (_context42.prev = _context42.next) {
          case 0:
            createUrl = utils.findLink(link, PlatformConnector._linkNS.create, PlatformConnector._baseURL);
            return _context42.abrupt("return", actions.doPost(createUrl, PlatformConnector._ims, {
              path: path,
              intermediates: true,
              respondWith: "{\"reltype\":\"".concat(PlatformConnector._linkNS.metadata.repo, "\"}")
            }, _objectSpread({
              'Content-Type': PlatformConnectorConstants.DIRECTORY_TYPE
            }, PlatformConnector._customHeader)));
          case 2:
          case "end":
            return _context42.stop();
        }
      }, _callee42);
    }));
    function createFolder() {
      return _createFolder.apply(this, arguments);
    }
    return createFolder;
  }(),
  /**
   * Create a resource as a child of current node with a given string payload.
   * The current use case for this is for creating settings like metadata forms.
   * @param {object[]} links - links from current node
   * @param {string} path - path to be created (/ can be used as a delimiter for creating nested folders)
   * @param {any} payload - body content for POST request
   * @param {CreateResourceOptions} options - optional headers and query parameters
   * @return {object} response object
   */
  createResource: function () {
    var _createResource = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee43(links, path, payload) {
      var options,
        createUrl,
        intermediates,
        _args43 = arguments;
      return _regeneratorRuntime.wrap(function (_context43) {
        while (1) switch (_context43.prev = _context43.next) {
          case 0:
            options = _args43.length > 3 && _args43[3] !== undefined ? _args43[3] : {};
            createUrl = utils.findLink(links, PlatformConnector._linkNS.create, PlatformConnector._baseURL);
            intermediates = (options === null || options === void 0 ? void 0 : options.intermediates) === true || (options === null || options === void 0 ? void 0 : options.intermediates) === undefined;
            return _context43.abrupt("return", actions.doPost(createUrl, PlatformConnector._ims, {
              path: path,
              intermediates: intermediates,
              respondWith: (options === null || options === void 0 ? void 0 : options.respondWith) || undefined
            }, _objectSpread({
              'Content-Type': (options === null || options === void 0 ? void 0 : options.contentType) || PlatformConnectorConstants.RESOURCE_TYPE
            }, PlatformConnector._customHeader), payload));
          case 4:
          case "end":
            return _context43.stop();
        }
      }, _callee43);
    }));
    function createResource() {
      return _createResource.apply(this, arguments);
    }
    return createResource;
  }(),
  /**
   * Updates a resource's content to a given string payload.
   * The current use case for this is for updating already existing settings like metadata forms.
   * @param {object[]} links - links from the resource node
   * @param {any} payload - the resource's new content json object
   * @return {object} response object
   */

  updateResource: function () {
    var _updateResource = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee44(links, payload) {
      var primaryUrl;
      return _regeneratorRuntime.wrap(function (_context44) {
        while (1) switch (_context44.prev = _context44.next) {
          case 0:
            primaryUrl = utils.findLink(links, PlatformConnector._linkNS.primary, PlatformConnector._baseURL);
            return _context44.abrupt("return", actions.doPut(primaryUrl, PlatformConnector._ims, {}, _objectSpread({
              'Content-Type': PlatformConnectorConstants.RESOURCE_TYPE
            }, PlatformConnector._customHeader), payload));
          case 2:
          case "end":
            return _context44.stop();
        }
      }, _callee44);
    }));
    function updateResource() {
      return _updateResource.apply(this, arguments);
    }
    return updateResource;
  }(),
  /**
   * UploadOptions
   * @typedef {Object} module:platform-connector.UploadOptions - options
   * @property {string} targetDirectory - path to the target dir: e.g. '/content/dam/uploadFolder'
   * @property {string} relativeTargetDirectory - relative path to the target dir: e.g. 'uploadFolder'
   * @property {string} type - File type, ie image/png
   * @property {number} blockSize - Optional param to set size of binary block for large uploads. If omitted, each block size is 5242880 bytes
   * @property {number} blockRetries  - Number of retries to perform on a filed block upload.  Default is 3
   * @property {function} onProgress - Callback function to monitor the upload's progress
   * @property {function} onPause - Callback for when an upload is puased (note, the pausing of an item happens in the BlockTransfers.pauseBlockUpload public method
   * @property {function} onCancel - Callback for when an upload is canceled (note, the canceling of an item happen in the BlockTransfers.cancelBlockUpload
   * @property {function} onResume - Callback for when an upload is resumed (note, the resuming of an item happens in the BlockTransfers.resumeBlockUpload
   * @property {function} onAbortUpload - Callback for when an upload is cancelled or failed for any reasons
   * @property {boolean} update - True if updating an asset, ie creating a new version.
   * @property {Object} [blockUploadPayloadForRelType] - json object containing the payload format for "reltype".
   * @property {module:platform-connector.UpdateOptions} updateOptions - Required set of options when doing updates to files. ie creating a new version.
   */

  /**
   * UpdateOptions
   * @typedef {object} module:platform-connector.UpdateOptions - options
   * @property {string} ifMatch - an assets etag
   * @property {string} type - mimeType
   * @property {number} byteLength - the file size
   * @property {string} updateName - new name for the update
   * @property {object} links - asset links for the asset to update
   */

  /**
   * Entry to begin uploading a file.  This has various subroutines depending on `UploadOptions` and the
   * size of the file.  Files smaller then 5242880 will be uploaded directly.  Files larger will be uploaded in segments called blockUpload.
   * This system first creates a zero-byte file as a placeholder, and then subsequently uploads blocks of data to that placeholder until completion.
   * There are also callbacks in the UploadOptions for pausing, cancelling, and handling duplication.
   * @param {Object} links  links from base folder
   * @param {File} file - an actual File. ie https://developer.mozilla.org/en-US/docs/Web/API/File
   * @param {module:platform-connector.UploadOptions} options - Options for upload including callbacks for in-progress, canceling, pausing,
   * and necessary metadata in order to perform the upload
   * @return {Object } object with path.  If options.verbose is set to true, return response data.
   */
  uploadFile: function () {
    var _uploadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee46(links, file, options) {
      var results, createUrl, type, onSliceBuffer, uploadOptions, blockUploadInstance, child;
      return _regeneratorRuntime.wrap(function (_context46) {
        while (1) switch (_context46.prev = _context46.next) {
          case 0:
            results = {};
            createUrl = options.update ? '' : utils.findLink(links, PlatformConnector._linkNS.create, PlatformConnector._baseURL);
            type = file.type;
            if (!type || type === '') {
              type = getMimeTypeFromExtension(file.name.split('.').pop());
            }
            onSliceBuffer = /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee45(startBuf, endBuf) {
                var slice;
                return _regeneratorRuntime.wrap(function (_context45) {
                  while (1) switch (_context45.prev = _context45.next) {
                    case 0:
                      slice = file.slice(startBuf, endBuf);
                      return _context45.abrupt("return", new Promise(function (resolve) {
                        var fr = new FileReader();
                        fr.onloadend = function (event) {
                          var _event$target;
                          resolve((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result);
                        };
                        fr.readAsArrayBuffer(slice);
                      }));
                    case 2:
                    case "end":
                      return _context45.stop();
                  }
                }, _callee45);
              }));
              return function () {
                return _ref4.apply(this, arguments);
              };
            }();
            uploadOptions = _objectSpread(_objectSpread({}, options), {}, {
              contentLength: file.size,
              onSliceBuffer: onSliceBuffer,
              type: type
            }); // BLOCK UPLOAD
            _context46.next = 8;
            return PlatformConnector._blockUploadInit(createUrl, file, uploadOptions);
          case 8:
            blockUploadInstance = _context46.sent;
            _context46.next = 11;
            return PlatformConnector.execBlockUpload(blockUploadInstance);
          case 11:
            child = _context46.sent;
            if (!(blockUploadInstance.state !== PlatformConnectorConstants.UPLOAD_STATE.FINISHED)) {
              _context46.next = 14;
              break;
            }
            return _context46.abrupt("return", child);
          case 14:
            blockTransfers._removeBlockUploadById(blockUploadInstance.id);
            results.path = blockUploadInstance.fileName;
            if (options.verbose) {
              results.createResponse = blockUploadInstance.createResponse;
              results.initResponse = blockUploadInstance.initResponse;
              results.transferDocument = blockUploadInstance.transferDocument;
              results.blockTransferResponses = child === null || child === void 0 ? void 0 : child.blockTransferResponses;
              results.finalizeResponse = child === null || child === void 0 ? void 0 : child.finalizeResponse;
            }
            return _context46.abrupt("return", results);
          case 18:
          case "end":
            return _context46.stop();
        }
      }, _callee46);
    }));
    function uploadFile() {
      return _uploadFile.apply(this, arguments);
    }
    return uploadFile;
  }(),
  /**
   * @private
   * @param {module:platform-connector.UploadOptions} options
   * @return {Object} preparedPayloadOnOptions
   */
  _prepareBlockUploadPayloadOnOptions: function _prepareBlockUploadPayloadOnOptions(options) {
    var payloadOnOptions = {
      'repo:size': options.contentLength,
      'repo:blocksize': options.blockSize || PlatformConnectorConstants.UPLOAD_BLOCKS.UPLOAD_BLOCKSIZE,
      'dc:format': options.type
    };

    // If client has certain block_upload payload format passed in, it will be adapted and replace the default.
    var reltype = options.blockUploadPayloadForRelType ? options.blockUploadPayloadForRelType : {
      'repo:resource': {
        'repo:reltype': PlatformConnector._linkNS.primary
      }
    };
    return Object.assign(payloadOnOptions, reltype);
  },
  /**
   * BlockUploadInstance
   * @typedef {Object}  module:platform-connector.BlockUploadInstance - instance data
   * @property {string} id - unique id per block upload
   * @property {string} etag - the assets etag
   * @property {string} state - current state of the upload instance: PENDING, ACTIVE, PAUSING, PAUSED, CANCELING, CANCELED, RESUMING, FINISHED
   * @property {number} completedBlocks - number of successful upload blocks
   * @property {number} bytesRemaining - amount of bytes still remaining to be uploaded
   * @property {string} fileName - name of file
   * @property {number} blockSize - size of block
   * @property {Object} links - object of links
   * @property {module:platform-connector.UploadOptions} options - upload options
   * @property {string} discardAsset - a href to delete the asset if need. ie' canceled upload.
   */

  /**
   * @private
   * @param {string} createUrl
   * @param {object} file - A File object.
   * @param {module:platform-connector.UploadOptions} options
   * @return {module:platform-connector.BlockUploadInstance}
   */
  _blockUploadInit: function () {
    var _blockUploadInit2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee47(createUrl, file, options) {
      var BLOCK_UPLOAD_INIT, res, links, etag, relativeTargetDir, uploadPath, blockuploadRes, data, blockSize, discardAsset, blockUploadInstance, discardAssetUrl;
      return _regeneratorRuntime.wrap(function (_context47) {
        while (1) switch (_context47.prev = _context47.next) {
          case 0:
            BLOCK_UPLOAD_INIT = LINK_NS.blockUploadInit;
            /*Step1: create an empty file
             * UNLESS we are updating
             * then skip this step and go strait to step 2.
             * */
            relativeTargetDir = options.relativeTargetDirectory;
            uploadPath = !relativeTargetDir ? file.name : "".concat(relativeTargetDir, "/").concat(file.name);
            if (options.update) {
              _context47.next = 11;
              break;
            }
            _context47.next = 6;
            return actions.doPost(createUrl, PlatformConnector._ims, {
              path: uploadPath,
              intermediates: true
            }, _objectSpread({
              'Content-Type': options.type
            }, PlatformConnector._customHeader));
          case 6:
            res = _context47.sent;
            links = utils.extractLinksFromHeaders(res.headers);
            etag = res.headers.get('etag');
            _context47.next = 13;
            break;
          case 11:
            links = options.updateOptions.links;
            etag = options.updateOptions.ifMatch;
          case 13:
            _context47.prev = 13;
            _context47.next = 16;
            return actions.doPost(utils.findLink(links, BLOCK_UPLOAD_INIT, PlatformConnector._baseURL), PlatformConnector._ims, {}, _objectSpread({
              'Content-Type': 'application/vnd.adobecloud.bulk-transfer+json'
            }, PlatformConnector._customHeader), Object.assign(PlatformConnector._prepareBlockUploadPayloadOnOptions(options), {
              'repo:md5': null
            }, {
              'repo:expires': null
            }, {
              'repo:if-match': etag === null ? null : "".concat(etag)
            }, {
              'repo:if-none-match': null
            }, {
              _links: null
            }), 'default', 3 /*404 happens occasionally due to eventual consistency. Add 'retry' as workaround for that*/, function (statusCode) {
              return statusCode === 404;
            });
          case 16:
            blockuploadRes = _context47.sent;
            if (!(blockuploadRes.status === 200)) {
              _context47.next = 28;
              break;
            }
            _context47.next = 20;
            return blockuploadRes.json();
          case 20:
            data = _context47.sent;
            blockSize = data['repo:blocksize'];
            // TODO: remove once R-API bug https://jira.corp.adobe.com/browse/CQ-4330016 has been addressed
            try {
              discardAsset = utils.findLink(links, PlatformConnector._linkNS.discard, PlatformConnector._baseURL);
            } catch (e) {
              /* not an error */
            }
            blockUploadInstance = {
              id: "".concat(options.targetDirectory, "/").concat(file.name),
              etag: etag,
              state: 'PENDING',
              completedBlocks: 0,
              bytesRemaining: file.size,
              fileName: file.name,
              blockSize: blockSize,
              links: data._links,
              options: options,
              discardAsset: discardAsset,
              createResponse: res,
              initResponse: blockuploadRes,
              transferDocument: data
            };
            blockTransfers.addBlockUpload(blockUploadInstance);
            return _context47.abrupt("return", blockUploadInstance);
          case 28:
            throw new Error("blockUploadInit status ".concat(blockuploadRes.status));
          case 29:
            _context47.next = 35;
            break;
          case 31:
            _context47.prev = 31;
            _context47.t0 = _context47["catch"](13);
            if (options.onAbortUpload) {
              // TODO: remove once R-API bug https://jira.corp.adobe.com/browse/CQ-4330016 has been addressed
              try {
                discardAssetUrl = utils.findLink(links, PlatformConnector._linkNS.discard, PlatformConnector._baseURL);
              } catch (e) {
                /* not an error */
              }
              options.onAbortUpload({
                uploadAsset: "".concat(options.targetDirectory, "/").concat(file.name),
                discardAssetUrl: discardAssetUrl
              });
            }
            throw _context47.t0;
          case 35:
          case "end":
            return _context47.stop();
        }
      }, _callee47, null, [[13, 31]]);
    }));
    function _blockUploadInit() {
      return _blockUploadInit2.apply(this, arguments);
    }
    return _blockUploadInit;
  }(),
  /**
   * Execute block upload - This can be used to resume suspended upload
   * @param { module:platform-connector.BlockUploadInstance} blockUploadInstance - the specific upload instance
   * @return {Promise<Object>}
   */
  execBlockUpload: function () {
    var _execBlockUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee48(blockUploadInstance) {
      var _blockFinalLink;
      var results, blockTransferLinks, blockFinalLink, headers, _loop, i, _ret, finalResponse;
      return _regeneratorRuntime.wrap(function (_context49) {
        while (1) switch (_context49.prev = _context49.next) {
          case 0:
            results = {
              blockTransferResponses: new Array(),
              finalizeResponse: undefined
            }; //If this is an upload that is being resumed and the jobOptions specify an onResume callback function to confirm the start, call it
            if (blockUploadInstance.state === PlatformConnectorConstants.UPLOAD_STATE.RESUMING && blockUploadInstance.options.onResume) {
              blockUploadInstance.options.onResume();
            }

            //Flag the upload as active
            blockUploadInstance.state = PlatformConnectorConstants.UPLOAD_STATE.ACTIVE;
            blockTransferLinks = blockUploadInstance.links[PlatformConnector._linkNS.blockTransfer].map(function (link) {
              return link.href;
            });
            blockFinalLink = blockUploadInstance.links[PlatformConnector._linkNS.blockFinalize].href; // TODO: https://jira.corp.adobe.com/browse/CQ-4322300
            blockFinalLink = (_blockFinalLink = blockFinalLink) === null || _blockFinalLink === void 0 ? void 0 : _blockFinalLink.replace('{&repoMetaPatch*}', '');
            headers = {};
            if ('ifMatch' in blockUploadInstance.options) {
              headers['If-Match'] = blockUploadInstance.options.ifMatch;
            }

            /*Step4: upload the blocks one after the other checking on each iteration that the upload hasn't been paused*/
            _loop = /*#__PURE__*/_regeneratorRuntime.mark(function () {
              var totalLength, blockSize, startBuf, curBlockSize, endBuf, sliceBuffer, onPutProgress, retryCount, success, maxRetry, putresponse;
              return _regeneratorRuntime.wrap(function (_context48) {
                while (1) switch (_context48.prev = _context48.next) {
                  case 0:
                    if (!(blockUploadInstance.bytesRemaining <= 0)) {
                      _context48.next = 3;
                      break;
                    }
                    blockUploadInstance.completedBlocks = blockTransferLinks.length;
                    return _context48.abrupt("return", "break");
                  case 3:
                    totalLength = blockUploadInstance.options.contentLength;
                    blockSize = blockUploadInstance.blockSize;
                    startBuf = i * blockSize;
                    curBlockSize = startBuf + blockSize > totalLength ? totalLength - startBuf + 1 : blockSize;
                    endBuf = startBuf + curBlockSize;
                    _context48.next = 10;
                    return blockUploadInstance.options.onSliceBuffer(startBuf, endBuf);
                  case 10:
                    sliceBuffer = _context48.sent;
                    onPutProgress = function (event) {
                      // Verbose is added temporarily until making sure the fix for listening to upload progress works as expected
                      console.debug("Upload progress - loaded: event.loaded");
                      if (blockUploadInstance.options.onProgress) {
                        blockUploadInstance.options.onProgress({
                          loaded: event.loaded + startBuf,
                          total: blockUploadInstance.options.contentLength
                        });
                      }
                    };
                    retryCount = 0;
                    success = false;
                    maxRetry = blockUploadInstance.options.blockRetries || PlatformConnectorConstants.UPLOAD_BLOCKS.UPLOAD_BLOCK_RETRY_DEFAULT;
                  case 15:
                    if (!(!success && blockUploadInstance.state === PlatformConnectorConstants.UPLOAD_STATE.ACTIVE && retryCount++ <= maxRetry)) {
                      _context48.next = 38;
                      break;
                    }
                    _context48.prev = 16;
                    _context48.next = 19;
                    return actions.doXhrPut(blockTransferLinks[i], PlatformConnector._ims, {}, {}, sliceBuffer, {
                      onProgress: onPutProgress
                    });
                  case 19:
                    putresponse = _context48.sent;
                    if (putresponse) {
                      _context48.next = 22;
                      break;
                    }
                    throw new Error('actions.doXhrPut failed to return response');
                  case 22:
                    if (!(putresponse.ok && (putresponse.status === 200 || putresponse.status === 201))) {
                      _context48.next = 26;
                      break;
                    }
                    success = true;
                    _context48.next = 28;
                    break;
                  case 26:
                    if (!(retryCount >= maxRetry)) {
                      _context48.next = 28;
                      break;
                    }
                    throw new Error("BlockTransferLink".concat(i, " failed  due to CORS or other network issues"));
                  case 28:
                    results.blockTransferResponses.push(putresponse);
                    _context48.next = 36;
                    break;
                  case 31:
                    _context48.prev = 31;
                    _context48.t0 = _context48["catch"](16);
                    if (!(retryCount >= maxRetry)) {
                      _context48.next = 36;
                      break;
                    }
                    if (blockUploadInstance.options.onAbortUpload) {
                      blockUploadInstance.options.onAbortUpload({
                        uploadAsset: blockUploadInstance.id,
                        discardAssetUrl: blockUploadInstance.discardAsset
                      });
                    }
                    throw new Error("BlockTransferLink".concat(i, " failed. ").concat(_context48.t0));
                  case 36:
                    _context48.next = 15;
                    break;
                  case 38:
                    //Increment blocks logged as completed for the upload instance presuming it was successfully completed and not failed or interrupted
                    if (success) {
                      blockUploadInstance.bytesRemaining -= curBlockSize;
                      blockUploadInstance.completedBlocks++;
                    }
                  case 39:
                  case "end":
                    return _context48.stop();
                }
              }, _loop, null, [[16, 31]]);
            });
            i = blockUploadInstance.completedBlocks;
          case 10:
            if (!(i < blockTransferLinks.length && blockUploadInstance.state === PlatformConnectorConstants.UPLOAD_STATE.ACTIVE)) {
              _context49.next = 18;
              break;
            }
            return _context49.delegateYield(_loop(), "t0", 12);
          case 12:
            _ret = _context49.t0;
            if (!(_ret === "break")) {
              _context49.next = 15;
              break;
            }
            return _context49.abrupt("break", 18);
          case 15:
            i++;
            _context49.next = 10;
            break;
          case 18:
            if (!(blockUploadInstance.state !== PlatformConnectorConstants.UPLOAD_STATE.ACTIVE)) {
              _context49.next = 29;
              break;
            }
            if (!(blockUploadInstance.state === PlatformConnectorConstants.UPLOAD_STATE.PAUSING && blockUploadInstance.options.onPause)) {
              _context49.next = 24;
              break;
            }
            blockUploadInstance.state = PlatformConnectorConstants.UPLOAD_STATE.PAUSED;
            blockUploadInstance.options.onPause({
              uploadInstance: blockUploadInstance
            });
            _context49.next = 28;
            break;
          case 24:
            if (!(blockUploadInstance.state === PlatformConnectorConstants.UPLOAD_STATE.CANCELING && blockUploadInstance.options.onCancel)) {
              _context49.next = 28;
              break;
            }
            //const cancelAssetUrl = blockUploadInstance.discardAsset;

            blockUploadInstance.state = PlatformConnectorConstants.UPLOAD_STATE.CANCELED;
            blockUploadInstance.options.onCancel({
              uploadInstance: blockUploadInstance
            });
            return _context49.abrupt("return");
          case 28:
            return _context49.abrupt("return");
          case 29:
            _context49.prev = 29;
            _context49.next = 32;
            return actions.doPost(blockFinalLink, PlatformConnector._ims, {}, _objectSpread({
              'Content-Type': 'application/vnd.adobecloud.bulk-transfer+json',
              'Access-Control-Expose-Headers': '*'
            }, PlatformConnector._customHeader), Object.assign(PlatformConnector._prepareBlockUploadPayloadOnOptions(blockUploadInstance.options), {
              'repo:md5': null
            }, {
              'repo:expires': null
            }, {
              'repo:if-match': blockUploadInstance.etag === null ? null : "".concat(blockUploadInstance.etag)
            }, {
              'repo:if-none-match': null
            }, {
              _links: blockUploadInstance.links
            }), 'default', 3 /*404 happens occasionally due to eventual consistency. Add 'retry' as workaround for that*/, function (statusCode) {
              return statusCode === 404;
            });
          case 32:
            finalResponse = _context49.sent;
            results.finalizeResponse = finalResponse;
            _context49.next = 40;
            break;
          case 36:
            _context49.prev = 36;
            _context49.t1 = _context49["catch"](29);
            if (blockUploadInstance.options.onAbortUpload) {
              blockUploadInstance.options.onAbortUpload({
                uploadAsset: blockUploadInstance.id,
                discardAssetUrl: blockUploadInstance.discardAsset
              });
            }
            throw new Error("BlockFinalized failed.");
          case 40:
            blockUploadInstance.state = PlatformConnectorConstants.UPLOAD_STATE.FINISHED;
            return _context49.abrupt("return", _objectSpread({
              path: blockUploadInstance.fileName
            }, results));
          case 42:
          case "end":
            return _context49.stop();
        }
      }, _callee48, null, [[29, 36]]);
    }));
    function execBlockUpload() {
      return _execBlockUpload.apply(this, arguments);
    }
    return execBlockUpload;
  }(),
  /**
   * @param {object[]} links - links for the asset to be downloaded
   * @returns {String} A download URL
   */
  downloadSingleResource: function () {
    var _downloadSingleResource = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee49(links) {
      var downloadUrl, response, blockTransferUrl;
      return _regeneratorRuntime.wrap(function (_context50) {
        while (1) switch (_context50.prev = _context50.next) {
          case 0:
            downloadUrl = utils.findLink(links, PlatformConnector._linkNS.download, PlatformConnector._baseURL);
            _context50.next = 3;
            return actions.doGet(downloadUrl, PlatformConnector._ims, {}, PlatformConnector._customHeader);
          case 3:
            response = _context50.sent;
            if (!(response.status === 200)) {
              _context50.next = 9;
              break;
            }
            _context50.next = 7;
            return response.json();
          case 7:
            blockTransferUrl = _context50.sent.href;
            return _context50.abrupt("return", blockTransferUrl);
          case 9:
            throw new Error('Get block transfer URL for download failed. It may be cause by a network error.');
          case 10:
          case "end":
            return _context50.stop();
        }
      }, _callee49);
    }));
    function downloadSingleResource() {
      return _downloadSingleResource.apply(this, arguments);
    }
    return downloadSingleResource;
  }(),
  /**
   * Retrieve an Asset's Access Control List (ACL)
   * @param {Object} links -  links from base folder
   */
  getACLPolicy: function () {
    var _getACLPolicy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee50(links) {
      var url;
      return _regeneratorRuntime.wrap(function (_context51) {
        while (1) switch (_context51.prev = _context51.next) {
          case 0:
            url = utils.findLink(links, LINK_NS.acPolicy);
            return _context51.abrupt("return", actions.doGet(url, PlatformConnector._ims, {}, PlatformConnector._customHeader));
          case 2:
          case "end":
            return _context51.stop();
        }
      }, _callee50);
    }));
    function getACLPolicy() {
      return _getACLPolicy.apply(this, arguments);
    }
    return getACLPolicy;
  }(),
  /**
   * Update an Asset's Access Control List (ACL).  This is done with two operations. 1. merge 2. remove.
   * A list of valid principals needs to be provided.  A principal is a user or group id.
   * @param {Object} links  links from base folder
   * @param {Object[]} principals - A principal is a user or group that we will be updating there ACLs on.
   * @param {Object} principals[].id - The ims id of the user or group
   * @param {'read' | 'modify' | 'full' } permission - Three possible permissions
   * @param {'merge'|'remove'} op - Two possible operations.  'merge' or 'remove'.  Default 'merge'
   * @return {Promise<void>}
   */
  updateACLPolicy: function () {
    var _updateACLPolicy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee51(links, principals, permission) {
      var op,
        url,
        bodyContent,
        body,
        response,
        _args52 = arguments;
      return _regeneratorRuntime.wrap(function (_context52) {
        while (1) switch (_context52.prev = _context52.next) {
          case 0:
            op = _args52.length > 3 && _args52[3] !== undefined ? _args52[3] : 'merge';
            url = utils.findLink(links, LINK_NS.acPolicy);
            bodyContent = principals.map(function (principal) {
              return {
                'repo:principal': {
                  'xdm:provider': {
                    '@id': 'https://ims-na1.adobelogin.com/'
                  },
                  '@id': principal.id,
                  '@type': 'https://ns.adobe.com/adobecloudplatform/ims/user'
                },
                'repo:modifier': 'grant',
                'repo:privileges': [permission],
                'repo:relations': [LINK_NS.acPolicy, LINK_NS.primary, LINK_NS.metadata.app, LINK_NS.metadata.embedded, LINK_NS.metadata.repo, LINK_NS.rendition],
                'repo:inheritance': 'deep'
              };
            });
            body = {
              'repo:acl': bodyContent
            };
            _context52.next = 6;
            return actions.doPut(url, PlatformConnector._ims, {
              op: op
            }, _objectSpread({
              'Content-Type': 'application/vnd.adobecloud.accesscontrolpolicy+json'
            }, PlatformConnector._customHeader), body);
          case 6:
            response = _context52.sent;
            return _context52.abrupt("return", response.json());
          case 8:
          case "end":
            return _context52.stop();
        }
      }, _callee51);
    }));
    function updateACLPolicy() {
      return _updateACLPolicy.apply(this, arguments);
    }
    return updateACLPolicy;
  }(),
  /**
   * Checks whether the current user has the requested Privilege on the specified Resource of an Asset.
   * @param {Object} links
   * @param {Object} queryParams
   * @param {'read' | 'write' | 'delete' | 'ack' } queryParams.privilege - Required wich privilege to check.
   * @param {string} [queryParams.relation] - A relation can be specified to narrow down the check.  ie http://ns.adobe.com/adobecloud/rel/primary
   * @return {Promise<any>}
   */
  checkACL: function () {
    var _checkACL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee52(links, queryParams) {
      var url, response;
      return _regeneratorRuntime.wrap(function (_context53) {
        while (1) switch (_context53.prev = _context53.next) {
          case 0:
            url = utils.findLink(links, LINK_NS.acCheck);
            _context53.next = 3;
            return actions.doGet(url, PlatformConnector._ims, queryParams, PlatformConnector._customHeader);
          case 3:
            response = _context53.sent;
            return _context53.abrupt("return", response.json());
          case 5:
          case "end":
            return _context53.stop();
        }
      }, _callee52);
    }));
    function checkACL() {
      return _checkACL.apply(this, arguments);
    }
    return checkACL;
  }(),
  /**
   * Returns the effective ACL for the currently logged in user.
   * @param {Object}links
   * @return {Promise<Object>} - An example would be {
   *   "*": ["ack", "read", "write"]
   * }
   */
  getACLEffective: function () {
    var _getACLEffective = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee53(links) {
      var url, response;
      return _regeneratorRuntime.wrap(function (_context54) {
        while (1) switch (_context54.prev = _context54.next) {
          case 0:
            url = utils.findLink(links, LINK_NS.acEffective);
            _context54.next = 3;
            return actions.doGet(url, PlatformConnector._ims, {}, PlatformConnector._customHeader);
          case 3:
            response = _context54.sent;
            return _context54.abrupt("return", response.json());
          case 5:
          case "end":
            return _context54.stop();
        }
      }, _callee53);
    }));
    function getACLEffective() {
      return _getACLEffective.apply(this, arguments);
    }
    return getACLEffective;
  }()
};

/**
 * @private
 * @param {'discard'|'delete'|'restore'} operation - Some description.
 * @param {object[]} discoveryLink - links from discovery for ops
 * @param {object[]} targets - an array of source asset information with minimal format {repo:assetId [,repo:etag]}
 * @param {string} repositoryId - repository ID
 * @param {object} optionalPayload - any additional properties you want to add onto the payload
 * @return {Promise<*>}
 */
var ops = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee54(operation, discoveryLink, targets, repositoryId) {
    var optionalPayload,
      opUrl,
      payload,
      _iterator3,
      _step3,
      target,
      body,
      _args55 = arguments;
    return _regeneratorRuntime.wrap(function (_context55) {
      while (1) switch (_context55.prev = _context55.next) {
        case 0:
          optionalPayload = _args55.length > 4 && _args55[4] !== undefined ? _args55[4] : undefined;
          opUrl = utils.findLink(discoveryLink, PlatformConnector._linkNS.ops);
          payload = [];
          _iterator3 = _createForOfIteratorHelper(targets);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              target = _step3.value;
              payload.push(_objectSpread({
                op: operation,
                target: _objectSpread({
                  'repo:repositoryId': repositoryId,
                  'repo:assetId': target['repo:assetId']
                }, PlatformConnector._formatIfMatch(target))
              }, optionalPayload));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          if (payload.length === 1) {
            body = payload[0];
          } else {
            body = payload;
          }
          return _context55.abrupt("return", actions.doPostAsync(opUrl, PlatformConnector._ims, {
            repositoryId: repositoryId
          }, _objectSpread({
            'Content-Type': 'application/vnd.adobe.asset-operation+json'
          }, PlatformConnector._customHeader), body));
        case 7:
        case "end":
          return _context55.stop();
      }
    }, _callee54);
  }));
  return function () {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * @private
 * @param {OperationType} operationType
 * @param {object[]} discoveryLinks - links from discovery for ops
 * @param {object} operationPayload - an object containing respective payload for different operations: e.g. {source, target} or {targets}
 * @param {object} optionalPayload - any additional properties you want to add onto the payload
 * @param {string} repositoryId - repository ID
 * @return {Promise<*>}
 */
var operation = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee55(operationType, discoveryLinks, operationPayload, repositoryId) {
    var optionalPayload,
      opUrl,
      payload,
      payloadAssets,
      _iterator4,
      _step4,
      _objectSpread5,
      _target4,
      _objectSpread6,
      asset,
      fileName,
      settingsForPayload,
      body,
      _args56 = arguments;
    return _regeneratorRuntime.wrap(function (_context56) {
      while (1) switch (_context56.prev = _context56.next) {
        case 0:
          optionalPayload = _args56.length > 4 && _args56[4] !== undefined ? _args56[4] : undefined;
          opUrl = utils.findLink(discoveryLinks, PlatformConnector._linkNS.ops);
          payload = [];
          payloadAssets = operationPayload.sources ? operationPayload.sources : operationPayload.targets;
          _iterator4 = _createForOfIteratorHelper(payloadAssets);
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              asset = _step4.value;
              fileName = operationType === Operation.move || operationType === Operation.copy ? utils.extractFileName(asset[PlatformConnectorConstants.REPO_PATH]) : '';
              settingsForPayload = operationType === Operation.move || operationType === Operation.copy ? {
                source: _objectSpread((_objectSpread5 = {}, _defineProperty$2(_objectSpread5, REPO_REPOSITORY_ID, repositoryId), _defineProperty$2(_objectSpread5, PlatformConnectorConstants.REPO_PATH, asset[PlatformConnectorConstants.REPO_PATH]), _objectSpread5), PlatformConnector._formatIfMatch(asset)),
                target: (_target4 = {}, _defineProperty$2(_target4, REPO_REPOSITORY_ID, repositoryId), _defineProperty$2(_target4, PlatformConnectorConstants.REPO_PATH, utils.formatDirectoryPath(operationPayload.target[PlatformConnectorConstants.REPO_PATH]) + fileName), _target4)
              } : {
                target: _objectSpread((_objectSpread6 = {}, _defineProperty$2(_objectSpread6, REPO_REPOSITORY_ID, repositoryId), _defineProperty$2(_objectSpread6, REPO_ASSET_ID, asset[REPO_ASSET_ID]), _objectSpread6), PlatformConnector._formatIfMatch(asset))
              };
              payload.push(_objectSpread(_objectSpread({
                op: operationType
              }, settingsForPayload), optionalPayload));
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          body = payload.length === 1 ? payload[0] : payload;
          return _context56.abrupt("return", actions.doPost(opUrl, PlatformConnector._ims, {
            repositoryId: repositoryId
          }, _objectSpread({
            'Content-Type': 'application/vnd.adobe.asset-operation+json'
          }, PlatformConnector._customHeader), body));
        case 8:
        case "end":
          return _context56.stop();
      }
    }, _callee55);
  }));
  return function () {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * @private
 * update a collection by operation
 * @param {'add'|'remove'} op - operation to update collection with
 * @param {Object} links - links from base asset
 * @param {Array<string>} assetPaths - list of assetPaths
 * @return {Response} platform's response to the collection update
 * @throws exception when the response status code is >=400
 */
var updateCollection = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee56(op, links, assetPaths) {
    var collectionsUrl, payload;
    return _regeneratorRuntime.wrap(function (_context57) {
      while (1) switch (_context57.prev = _context57.next) {
        case 0:
          collectionsUrl = utils.findLink(links, PlatformConnector._linkNS.collections, PlatformConnector._baseURL);
          payload = assetPaths.map(function (assetPath) {
            return {
              op: op,
              path: '/children',
              value: _defineProperty$2({}, PlatformConnectorConstants.REPO_PATH, assetPath)
            };
          });
          return _context57.abrupt("return", actions.doPatch(collectionsUrl, PlatformConnector._ims, undefined, _objectSpread({
            'Content-Type': PlatformConnectorConstants.COLLECTION_TYPE
          }, PlatformConnector._customHeader), payload));
        case 3:
        case "end":
          return _context57.stop();
      }
    }, _callee56);
  }));
  return function () {
    return _ref7.apply(this, arguments);
  };
}();

/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/
/**
 * @module platform-connector
 */
var REPOSITORY_ID_KEY = 'repo:repositoryId';
var VALID_REPO_DATE = new Date('2021-04-01T00:00:00.000Z');
// For older orgs, we still have to filter via date
var REPOSITORY_FILTERS = function (filteredOnlyAuthor) {
  return [function (repoLink, repoMetadataLink) {
    return new Date(repoMetadataLink['repo:modifyDate'] || repoMetadataLink['repo:createDate']) > VALID_REPO_DATE;
  }, function (repoLink, repoMetadataLink, orgId) {
    var _repoLink$repoOwner;
    if (!orgId) {
      return true;
    }
    return ((_repoLink$repoOwner = repoLink['repo:owner']) === null || _repoLink$repoOwner === void 0 ? void 0 : _repoLink$repoOwner.id) === orgId;
  }, filteredOnlyAuthor ? function (repoLink) {
    return repoLink['aem:tier'] === 'author';
  } : function () {
    return true;
  }];
};
var getRepoLink = function (repo) {
  var _repo$_embedded;
  return (_repo$_embedded = repo._embedded) === null || _repo$_embedded === void 0 ? void 0 : _repo$_embedded[LINK_NS.repository];
};
//We cannot use constant from LINK_NS for now since we overwrite this key as workaround in AE to support AEM R-API
var getRepoMetadataLink = function (repo) {
  var _repo$_embedded2;
  return (_repo$_embedded2 = repo._embedded) === null || _repo$_embedded2 === void 0 ? void 0 : _repo$_embedded2['http://ns.adobe.com/adobecloud/rel/metadata/repository'];
};
var getRepoId = function (repo) {
  var _getRepoLink;
  return (_getRepoLink = getRepoLink(repo)) === null || _getRepoLink === void 0 ? void 0 : _getRepoLink[REPOSITORY_ID_KEY];
};

/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @returns {Object[]} the list of valid 'author' repository objects, filtered from the discovery response.
 * Use getAllRepoList to get all valid repository objects of all aemTierType.
 */
var getRepoList = function (discoveryResponse, orgId) {
  var children = discoveryResponse !== null && discoveryResponse !== void 0 && discoveryResponse.children ? discoveryResponse.children : [];
  return children.filter(function (repo) {
    return REPOSITORY_FILTERS(true).every(function (filter) {
      return Boolean(getRepoLink(repo)) && Boolean(getRepoMetadataLink(repo)) && filter(getRepoLink(repo), getRepoMetadataLink(repo), orgId);
    });
  });
};

/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @param preferredRepoId {String} the repo ID to validate and use as default selection
 * @returns {Object} the first valid repo ID from the repo list or undefined in case no valid repo was found
 */
var getDefaultSelectedRepo = function (discoveryResponse, orgId, preferredRepoId) {
  var repoList = getRepoList(discoveryResponse, orgId);
  if (preferredRepoId) {
    var repoMatchingStoredRepoId = repoList.filter(function (repo) {
      var _getRepoLink2;
      return ((_getRepoLink2 = getRepoLink(repo)) === null || _getRepoLink2 === void 0 ? void 0 : _getRepoLink2[REPOSITORY_ID_KEY]) === preferredRepoId;
    });
    if (repoMatchingStoredRepoId.length > 0) {
      return repoMatchingStoredRepoId[0] && getRepoId(repoMatchingStoredRepoId[0]);
    }
  }
  var filteredByPreferredEnv = repoList.filter(function (repo) {
    var repoLink = getRepoLink(repo);
    return repoLink && repoLink['repo:environment'] === 'prod' && !repoLink['aem:sandbox'];
  });
  if (filteredByPreferredEnv.length > 0) {
    return filteredByPreferredEnv[0] && getRepoId(filteredByPreferredEnv[0]);
  }
  return repoList[0] && getRepoId(repoList[0]);
};

/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @returns {Object[]} the list of valid repository objects of all aemTierType, filtered from the discovery response
 */
var getAllRepoList = function (discoveryResponse, orgId) {
  var children = discoveryResponse !== null && discoveryResponse !== void 0 && discoveryResponse.children ? discoveryResponse.children : [];
  return children.filter(function (repo) {
    return REPOSITORY_FILTERS(false).every(function (filter) {
      return Boolean(getRepoLink(repo)) && Boolean(getRepoMetadataLink(repo)) && filter(getRepoLink(repo), getRepoMetadataLink(repo), orgId);
    });
  });
};

var en_us = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "Other",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "Text",
	"ContentResource.powerpoint.label": "MS Powerpoint",
	"ContentResource.powerpoint_2007.label": "MS Powerpoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "Text",
	"ContentResource.spreadsheet.label": "Spreadsheet",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "Audio",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "Collection",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "Folder",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "ICON",
	"ContentResourceUtils.image.label": "Image",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "Library",
	"ContentResourceUtils.library_element.label": "Library Element",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "MP4 Audio",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "MPEG Audio",
	"ContentResourceUtils.photoshop.label": "PhotoShop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "Video",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

var ko_kr = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "기타",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "텍스트",
	"ContentResource.powerpoint.label": "MS PowerPoint",
	"ContentResource.powerpoint_2007.label": "MS PowerPoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "텍스트",
	"ContentResource.spreadsheet.label": "스프레드시트",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "오디오",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "컬렉션",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "폴더",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "아이콘",
	"ContentResourceUtils.image.label": "이미지",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "라이브러리",
	"ContentResourceUtils.library_element.label": "라이브러리 요소",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "MP4 오디오",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "MPEG 오디오",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "비디오",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

var zh_tw = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "其他",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "文字",
	"ContentResource.powerpoint.label": "MS Powerpoint",
	"ContentResource.powerpoint_2007.label": "MS Powerpoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "文字",
	"ContentResource.spreadsheet.label": "試算表",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "音訊",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "集合",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "資料夾",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "圖示",
	"ContentResourceUtils.image.label": "影像",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "資料庫",
	"ContentResourceUtils.library_element.label": "資料庫元素",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "MP4 音訊",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "MPEG 音訊",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "視訊",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

var zh_cn = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "其他",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "文本",
	"ContentResource.powerpoint.label": "MS Powerpoint",
	"ContentResource.powerpoint_2007.label": "MS Powerpoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "文本",
	"ContentResource.spreadsheet.label": "电子表格",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "音频",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "收藏集",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "文件夹",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "图表",
	"ContentResourceUtils.image.label": "图像",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "库",
	"ContentResourceUtils.library_element.label": "库元素",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "MP4 音频",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "MPEG 音频",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "视频",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

var pt_br = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "Outro",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "Texto",
	"ContentResource.powerpoint.label": "MS PowerPoint",
	"ContentResource.powerpoint_2007.label": "MS PowerPoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "Texto",
	"ContentResource.spreadsheet.label": "Planilha",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "Áudio",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "Coleção",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "Pasta",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "ÍCONE",
	"ContentResourceUtils.image.label": "Imagem",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "Biblioteca",
	"ContentResourceUtils.library_element.label": "Elemento da biblioteca",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "Áudio MP4",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "Áudio MPEG",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "Vídeo",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

var it_it = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "Altro",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "Testo",
	"ContentResource.powerpoint.label": "MS PowerPoint",
	"ContentResource.powerpoint_2007.label": "MS PowerPoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "Testo",
	"ContentResource.spreadsheet.label": "Foglio di calcolo",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "Audio",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "Raccolta",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "Cartella",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "ICONA",
	"ContentResourceUtils.image.label": "Immagine",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "Libreria",
	"ContentResourceUtils.library_element.label": "Elemento libreria",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "Audio MP4",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "Audio MPEG",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "Video",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "File raw Nikon",
	"ContentResourceUtils.zip.label": "ZIP"
};

var es_es = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "Otro",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "Texto",
	"ContentResource.powerpoint.label": "MS PowerPoint",
	"ContentResource.powerpoint_2007.label": "MS PowerPoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "Texto",
	"ContentResource.spreadsheet.label": "Hoja de cálculo",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "Audio",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "Colección",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "Carpeta",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "ICONO",
	"ContentResourceUtils.image.label": "Imagen",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "Biblioteca",
	"ContentResourceUtils.library_element.label": "Elemento de la biblioteca",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "Audio MP4",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "Audio MPEG",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "Vídeo",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

var ja_jp = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "その他",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "テキスト",
	"ContentResource.powerpoint.label": "MS PowerPoint",
	"ContentResource.powerpoint_2007.label": "MS PowerPoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "テキスト",
	"ContentResource.spreadsheet.label": "スプレッドシート",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "オーディオ",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "コレクション",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "フォルダー",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "ICON",
	"ContentResourceUtils.image.label": "画像",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "ライブラリ",
	"ContentResourceUtils.library_element.label": "ライブラリ要素",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "MP4 オーディオ",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "MPEG オーディオ",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "ビデオ",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

var de_de = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "Sonstige",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "Text",
	"ContentResource.powerpoint.label": "MS PowerPoint",
	"ContentResource.powerpoint_2007.label": "MS PowerPoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "Text",
	"ContentResource.spreadsheet.label": "Tabelle",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "Audio",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "Sammlung",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "Ordner",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "SYMBOL",
	"ContentResourceUtils.image.label": "Bild",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "Bibliothek",
	"ContentResourceUtils.library_element.label": "Bibliothekselement",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "MP4-Audio",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "MPEG-Audio",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "Video",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "PLZ"
};

var fr_fr = {
	"ContentResource.csv.label": "CSV",
	"ContentResource.excel.label": "MS Excel",
	"ContentResource.html.label": "HTML",
	"ContentResource.illustrator.label": "Illustrator",
	"ContentResource.indesign.label": "InDesign",
	"ContentResource.msword.label": "MS Word",
	"ContentResource.opendocument_document.label": "OpenDocument",
	"ContentResource.opendocument_presentation.label": "OpenDocument",
	"ContentResource.other.label": "Autre",
	"ContentResource.pdf.label": "PDF",
	"ContentResource.plain_text.label": "Texte",
	"ContentResource.powerpoint.label": "MS PowerPoint",
	"ContentResource.powerpoint_2007.label": "MS PowerPoint",
	"ContentResource.quark.label": "Quark",
	"ContentResource.rtf.label": "Texte",
	"ContentResource.spreadsheet.label": "Feuille de calcul",
	"ContentResource.word.label": "MS Word",
	"ContentResource.x_excel.label": "MS Excel",
	"ContentResourceUtils.aac.label": "AAC",
	"ContentResourceUtils.air.label": "AIR",
	"ContentResourceUtils.audio.label": "Audio",
	"ContentResourceUtils.bmp.label": "BMP",
	"ContentResourceUtils.collection.label": "Collection",
	"ContentResourceUtils.dng.label": "DNG",
	"ContentResourceUtils.folder.label": "Dossier",
	"ContentResourceUtils.gif.label": "GIF",
	"ContentResourceUtils.gimp.label": "GIMP",
	"ContentResourceUtils.icon.label": "ICÔNE",
	"ContentResourceUtils.image.label": "Image",
	"ContentResourceUtils.jar.label": "JAR",
	"ContentResourceUtils.jpeg.label": "JPEG",
	"ContentResourceUtils.library.label": "Bibliothèque",
	"ContentResourceUtils.library_element.label": "Élément de bibliothèque",
	"ContentResourceUtils.midi.label": "MIDI",
	"ContentResourceUtils.mp3.label": "MP3",
	"ContentResourceUtils.mp4.label": "MP4",
	"ContentResourceUtils.mp4_audio.label": "MP4 Audio",
	"ContentResourceUtils.mpeg.label": "MPEG",
	"ContentResourceUtils.mpeg_audio.label": "MPEG Audio",
	"ContentResourceUtils.photoshop.label": "Photoshop",
	"ContentResourceUtils.pjpeg.label": "PJPEG",
	"ContentResourceUtils.png.label": "PNG",
	"ContentResourceUtils.quicktime.label": "QUICKTIME",
	"ContentResourceUtils.rar.label": "RAR",
	"ContentResourceUtils.svg.label": "SVG",
	"ContentResourceUtils.tar.label": "TAR",
	"ContentResourceUtils.tar_gz.label": "TAR",
	"ContentResourceUtils.tiff.label": "TIFF",
	"ContentResourceUtils.video.label": "Vidéo",
	"ContentResourceUtils.wav.label": "WAV",
	"ContentResourceUtils.wma.label": "WMA",
	"ContentResourceUtils.x_bmp.label": "BMP",
	"ContentResourceUtils.x_dcraw.label": "Camera Raw",
	"ContentResourceUtils.x_pbm.label": "PBM",
	"ContentResourceUtils.x_ppm.label": "PPM",
	"ContentResourceUtils.x_raw_nikon.label": "Nikon Raw",
	"ContentResourceUtils.zip.label": "ZIP"
};

/* istanbul ignore file */

var localeData = /*#__PURE__*/Object.freeze({
  __proto__: null,
  de_DE: de_de,
  en_US: en_us,
  es_ES: es_es,
  fr_FR: fr_fr,
  it_IT: it_it,
  ja_JP: ja_jp,
  ko_KR: ko_kr,
  pt_BR: pt_br,
  zh_CN: zh_cn,
  zh_TW: zh_tw
});

var cache = createIntlCache();
var intl, localeCache;
var supportedLocales = ['en-US', 'de-DE', 'es-ES', 'it-IT', 'ja-JP', 'ko-Kr', 'pt-BR', 'zh-CN', 'zh-TW'];

/* adobe-intl messages: _mimeTypeToLabelMap */
var _mimeTypeToLabelMap = {
  '*/*': {
    id: 'ContentResource.other.label',
    defaultMessage: 'Other',
    description: 'Generic label for a file whose extension we are not familiar with.'
  },
  // *** document formats ***
  'application/pdf': {
    id: 'ContentResource.pdf.label',
    defaultMessage: 'PDF',
    description: 'Label describing the type of file being shown. This label is for PDF files.'
  },
  'application/postscript': {
    id: 'ContentResource.illustrator.label',
    defaultMessage: 'Illustrator',
    description: 'Label describing the type of file being shown. This label is for Illustrator files.'
  },
  'application/msword': {
    id: 'ContentResource.msword.label',
    defaultMessage: 'MS Word',
    description: 'Label describing the type of file being shown. This label is for MS Word files.'
  },
  'application/vnd.oasis.opendocument.graphics': {
    id: 'ContentResource.opendocument_document.label',
    defaultMessage: 'OpenDocument',
    description: 'Label describing the type of file being shown. This label is for OpenDocument doc files.'
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    id: 'ContentResource.word.label',
    defaultMessage: 'MS Word',
    description: 'Label describing the type of file being shown. This label is for MS Word file extensions.'
  },
  'text/csv': {
    id: 'ContentResource.csv.label',
    defaultMessage: 'CSV',
    description: 'Label describing the type of file being shown. This label is for CSV files.'
  },
  'text/html': {
    id: 'ContentResource.html.label',
    defaultMessage: 'HTML',
    description: 'Label describing the type of file being shown. This label is for HTML files.'
  },
  'text/rtf': {
    id: 'ContentResource.rtf.label',
    defaultMessage: 'Text',
    description: 'Label describing the type of file being shown. This label is for RTF files.'
  },
  'text/plain': {
    id: 'ContentResource.plain_text.label',
    defaultMessage: 'Text',
    description: 'Label describing the type of file being shown. This label is for plain text files.'
  },
  // ** spreadsheet formats **
  'application/vnd.oasis.opendocument.spreadsheet': {
    id: 'ContentResource.spreadsheet.label',
    defaultMessage: 'Spreadsheet',
    description: 'Label describing the type of file being shown. This label is for spreadsheet files.'
  },
  'application/vnd.ms-excel': {
    id: 'ContentResource.excel.label',
    defaultMessage: 'MS Excel',
    description: 'Label describing the type of file being shown. This label is for .xlsx file extensions.'
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    id: 'ContentResource.x_excel.label',
    defaultMessage: 'MS Excel',
    description: 'Label describing the type of file being shown. This label is for .xlsx file extensions.'
  },
  // ** presentation formats **
  'application/vnd.ms-powerpoint': {
    id: 'ContentResource.powerpoint.label',
    defaultMessage: 'MS Powerpoint',
    description: 'Label describing the type of file being shown. This label is for powerpoint files.'
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    id: 'ContentResource.powerpoint_2007.label',
    defaultMessage: 'MS Powerpoint',
    description: 'Label describing the type of file being shown. This label is for powerpoint 2007 files.'
  },
  'application/vnd.oasis.opendocument.presentation': {
    id: 'ContentResource.opendocument_presentation.label',
    defaultMessage: 'OpenDocument',
    description: 'Label describing the type of file being shown. This label is for OpenDocument presentation files.'
  },
  // ** print formats **
  'application/x-indesign': {
    id: 'ContentResource.indesign.label',
    defaultMessage: 'InDesign',
    description: 'Label describing the type of file being shown. This label is for InDesign files.'
  },
  'application/vnd.quark.quarkxpress': {
    id: 'ContentResource.quark.label',
    defaultMessage: 'Quark',
    description: 'Label describing the type of file being shown. This label is for quark files.'
  },
  // *** audio formats ***
  'audio/*': {
    id: 'ContentResourceUtils.audio.label',
    defaultMessage: 'Audio',
    description: 'Label describing the type of file being shown. This label is for generic audio files.'
  },
  'audio/aac': {
    id: 'ContentResourceUtils.aac.label',
    defaultMessage: 'AAC',
    description: 'Label describing the type of file being shown. This label is for generic AAC files.'
  },
  'audio/midi': {
    id: 'ContentResourceUtils.midi.label',
    defaultMessage: 'MIDI',
    description: 'Label describing the type of file being shown. This label is for MIDI files.'
  },
  'audio/mp3': {
    id: 'ContentResourceUtils.mp3.label',
    defaultMessage: 'MP3',
    description: 'Label describing the type of file being shown. This label is for MP3 files.'
  },
  'audio/mp4': {
    id: 'ContentResourceUtils.mp4_audio.label',
    defaultMessage: 'MP4 Audio',
    description: 'Label describing the type of file being shown. This label is for MP4 Audio files.'
  },
  'audio/mpeg': {
    id: 'ContentResourceUtils.mpeg_audio.label',
    defaultMessage: 'MPEG Audio',
    description: 'Label describing the type of file being shown. This label is for MPEG Audio files.'
  },
  'audio/wav': {
    id: 'ContentResourceUtils.wav.label',
    defaultMessage: 'WAV',
    description: 'Label describing the type of file being shown. This label is for WAV files.'
  },
  'audio/wma': {
    id: 'ContentResourceUtils.wma.label',
    defaultMessage: 'WMA',
    description: 'Label describing the type of file being shown. This label is for WMA files.'
  },
  // *** image formats ***
  'image/*': {
    id: 'ContentResourceUtils.image.label',
    defaultMessage: 'Image',
    description: 'Label describing the type of file being shown. This label is for generic images.'
  },
  'image/bmp': {
    id: 'ContentResourceUtils.bmp.label',
    defaultMessage: 'BMP',
    description: 'Label describing the type of file being shown. This label is for .bmp images.'
  },
  'image/gif': {
    id: 'ContentResourceUtils.gif.label',
    defaultMessage: 'GIF',
    description: 'Label describing the type of file being shown. This label is for .gif images.'
  },
  'image/jpeg': {
    id: 'ContentResourceUtils.jpeg.label',
    defaultMessage: 'JPEG',
    description: 'Label describing the type of file being shown. This label is for .jpeg images.'
  },
  'image/pjpeg': {
    id: 'ContentResourceUtils.pjpeg.label',
    defaultMessage: 'PJPEG',
    description: 'Label describing the type of file being shown. This label is for .pjpeg images.'
  },
  'image/png': {
    id: 'ContentResourceUtils.png.label',
    defaultMessage: 'PNG',
    description: 'Label describing the type of file being shown. This label is for .png images.'
  },
  'image/svg+xml': {
    id: 'ContentResourceUtils.svg.label',
    defaultMessage: 'SVG',
    description: 'Label describing the type of file being shown. This label is for svg images.'
  },
  'image/tiff': {
    id: 'ContentResourceUtils.tiff.label',
    defaultMessage: 'TIFF',
    description: 'Label describing the type of file being shown. This label is for .tiff images.'
  },
  'image/vnd.adobe.photoshop': {
    id: 'ContentResourceUtils.photoshop.label',
    defaultMessage: 'PhotoShop',
    description: 'Label describing the type of file being shown. This label is for Photoshop images.'
  },
  'image/vnd.microsoft.icon': {
    id: 'ContentResourceUtils.icon.label',
    defaultMessage: 'ICON',
    description: 'Label describing the type of file being shown. This label is for icon images.'
  },
  'image/x-adobe-dng': {
    id: 'ContentResourceUtils.dng.label',
    defaultMessage: 'DNG',
    description: 'Label describing the type of file being shown. This label is for .dng images.'
  },
  'image/x-bmp': {
    id: 'ContentResourceUtils.x_bmp.label',
    defaultMessage: 'BMP',
    description: 'Label describing the type of file being shown. This label is for .x-bmp images.'
  },
  'image/x-dcraw': {
    id: 'ContentResourceUtils.x_dcraw.label',
    defaultMessage: 'Camera Raw',
    description: 'Label describing the type of file being shown. This label is for Camera raw images.'
  },
  'image/x-pbm': {
    id: 'ContentResourceUtils.x_pbm.label',
    defaultMessage: 'PBM',
    description: 'Label describing the type of file being shown. This label is for .x-pbm images.'
  },
  'image/x-ppm': {
    id: 'ContentResourceUtils.x_ppm.label',
    defaultMessage: 'PPM',
    description: 'Label describing the type of file being shown. This label is for .x-ppm images.'
  },
  'image/x-raw-nikon': {
    id: 'ContentResourceUtils.x_raw_nikon.label',
    defaultMessage: 'Nikon Raw',
    description: 'Label describing the type of file being shown. This label is for Nikon raw images.'
  },
  'image/x-xcf': {
    id: 'ContentResourceUtils.gimp.label',
    defaultMessage: 'GIMP',
    description: 'Label describing the type of file being shown. This label is for GIMP images.'
  },
  // *** video formats ***
  'video/*': {
    id: 'ContentResourceUtils.video.label',
    defaultMessage: 'Video',
    description: 'Label describing the type of file being shown. This label is for generic videos.'
  },
  'video/mp4': {
    id: 'ContentResourceUtils.mp4.label',
    defaultMessage: 'MP4',
    description: 'Label describing the type of file being shown. This label is for .mp4 videos.'
  },
  'video/mpeg': {
    id: 'ContentResourceUtils.mpeg.label',
    defaultMessage: 'MPEG',
    description: 'Label describing the type of file being shown. This label is for MPEG videos.'
  },
  'video/quicktime': {
    id: 'ContentResourceUtils.quicktime.label',
    defaultMessage: 'QUICKTIME',
    description: 'Label describing the type of file being shown. This label is for .mov videos.'
  },
  // *** archive formats ***
  'application/java-archive': {
    id: 'ContentResourceUtils.jar.label',
    defaultMessage: 'JAR',
    description: 'Label describing the type of file being shown. This label is for JAR files.'
  },
  'application/x-rar-compressed': {
    id: 'ContentResourceUtils.rar.label',
    defaultMessage: 'RAR',
    description: 'Label describing the type of file being shown. This label is for RAR files.'
  },
  'application/x-tar': {
    id: 'ContentResourceUtils.tar.label',
    defaultMessage: 'TAR',
    description: 'Label describing the type of file being shown. This label is for TAR files.'
  },
  'application/x-tar-gz': {
    id: 'ContentResourceUtils.tar_gz.label',
    defaultMessage: 'TAR',
    description: 'Label describing the type of file being shown. This label is for TAR files.'
  },
  'application/zip': {
    id: 'ContentResourceUtils.zip.label',
    defaultMessage: 'ZIP',
    description: 'Label describing the type of file being shown. This label is for ZIP files.'
  },
  // *** other formats ***
  'application/vnd.adobe.air-application-installer-package+zip': {
    id: 'ContentResourceUtils.air.label',
    defaultMessage: 'AIR',
    description: 'Label describing the type of file being shown. This label is for Adobe AIR files.'
  },
  'application/vnd.adobe.element+dcx': {
    id: 'ContentResourceUtils.library_element.label',
    defaultMessage: 'Library Element',
    description: 'Label describing the type of file being shown. This label is for library elements.'
  },
  'application/vnd.adobe.library+dcx': {
    id: 'ContentResourceUtils.library.label',
    defaultMessage: 'Library',
    description: 'Label describing the type of file being shown. This label is for libraries.'
  },
  'application/vnd.adobeaemcloud.collection+json': {
    id: 'ContentResourceUtils.collection.label',
    defaultMessage: 'Collection',
    description: 'Label describing the type of file being shown. This label is for collections.'
  },
  'application/vnd.adobecloud.directory+json': {
    id: 'ContentResourceUtils.folder.label',
    defaultMessage: 'Folder',
    description: 'Label describing the type of file being shown. This label is for folders/directories.'
  }
};

/**
 * Utils function to return user-friendly label from asset MIME type.
 * This function is meant to be a temporary solution until new package can be created in react super components, repo.
 * @private
 * @param {string} mimetype file MIME type
 * @param {('en-US'|'de-DE'|'es-ES'|'it-IT'|'ja-JP'|'ko-Kr'|'pt-BR'|'zh-CN'|'zh-TW')} [locale = en-US] i18n locale string
 * @returns {string} localized asset format
 */
var getLabelByMimeType = function (mimetype) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  if (!supportedLocales.find(function (el) {
    return el === locale;
  })) {
    console.warn("Locale \"".concat(locale, "\" is not supported or format is not xx-XX. Using locale en-US."));
    locale = 'en-US';
  }

  // initialize intl only if not initialized or if locale has changed
  if (!intl || localeCache !== locale) {
    intl = createIntl({
      locale: locale,
      messages: localeData[locale.replace('-', '_')]
    }, cache);
    localeCache = locale;
  }
  if (!_mimeTypeToLabelMap[mimetype]) {
    // if specific lookup failed, attempt a lookup for a more generic label based on type
    var _mimetype$split = mimetype.split('/'),
      _mimetype$split2 = _slicedToArray(_mimetype$split, 1),
      type = _mimetype$split2[0];
    var defaultLabel = _mimeTypeToLabelMap['*/*'];
    var genericType = _mimeTypeToLabelMap["".concat(type, "/*")];
    return genericType ? intl.formatMessage(genericType) : intl.formatMessage(defaultLabel);
  }
  return intl.formatMessage(_mimeTypeToLabelMap[mimetype]);
};

export { ConsoleLogger, DISCOVERY, LINK_NS, LogLevel, PlatformConnector, PlatformConnectorConstants, blockTransfers, getAllRepoList, getDefaultSelectedRepo, getLabelByMimeType, getMimeTypeFromExtension, getRepoList };
