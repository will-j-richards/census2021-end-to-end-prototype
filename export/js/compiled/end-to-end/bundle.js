(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
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
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/

// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.window === window ? window : (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self ? self : (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.global === global ? global : undefined;

function bom(blob, opts) {
  if (typeof opts === 'undefined') opts = { autoBom: false };else if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
    console.warn('Deprecated: Expected third argument to be a object');
    opts = { autoBom: !opts };
  }

  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
  }
  return blob;
}

function download(url, name, opts) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function () {
    console.error('could not download file');
  };
  xhr.send();
}

function corsEnabled(url) {
  var xhr = new XMLHttpRequest();
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false);
  xhr.send();
  return xhr.status >= 200 && xhr.status <= 299;
}

// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
  }
}

var saveAs = _global.saveAs || (
// probably in some web worker
(typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || window !== _global ? function saveAs() {} /* noop */


// Use download attribute first if possible (#193 Lumia mobile)
: 'download' in HTMLAnchorElement.prototype ? function saveAs(blob, name, opts) {
  var URL = _global.URL || _global.webkitURL;
  var a = document.createElement('a');
  name = name || blob.name || 'download';

  a.download = name;
  a.rel = 'noopener'; // tabnabbing

  // TODO: detect chrome extensions & packaged apps
  // a.target = '_blank'

  if (typeof blob === 'string') {
    // Support regular links
    a.href = blob;
    if (a.origin !== location.origin) {
      corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
    } else {
      click(a);
    }
  } else {
    // Support blobs
    a.href = URL.createObjectURL(blob);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 4E4); // 40s
    setTimeout(function () {
      click(a);
    }, 0);
  }
}

// Use msSaveOrOpenBlob as a second approach
: 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
  name = name || blob.name || 'download';

  if (typeof blob === 'string') {
    if (corsEnabled(blob)) {
      download(blob, name, opts);
    } else {
      var a = document.createElement('a');
      a.href = blob;
      a.target = '_blank';
      setTimeout(function () {
        click(a);
      });
    }
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name);
  }
}

// Fallback to using FileReader and a popup
: function saveAs(blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only available on user interaction and the fileReader is async so...
  popup = popup || open('', '_blank');
  if (popup) {
    popup.document.title = popup.document.body.innerText = 'downloading...';
  }

  if (typeof blob === 'string') return download(blob, name, opts);

  var force = blob.type === 'application/octet-stream';
  var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
  var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

  if ((isChromeIOS || force && isSafari) && (typeof FileReader === 'undefined' ? 'undefined' : _typeof(FileReader)) === 'object') {
    // Safari doesn't allow downloading of blob URLs
    var reader = new FileReader();
    reader.onloadend = function () {
      var url = reader.result;
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
      if (popup) popup.location.href = url;else location = url;
      popup = null; // reverse-tabnabbing #460
    };
    reader.readAsDataURL(blob);
  } else {
    var URL = _global.URL || _global.webkitURL;
    var url = URL.createObjectURL(blob);
    if (popup) popup.location = url;else location.href = url;
    popup = null; // reverse-tabnabbing #460
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 4E4); // 40s
  }
});

_global.saveAs = saveAs.saveAs = saveAs;

if (typeof module !== 'undefined') {
  module.exports = saveAs;
}

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}

/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */

(function (self) {
  'use strict';

  var nativeURLSearchParams = self.URLSearchParams && self.URLSearchParams.prototype.get ? self.URLSearchParams : null,
      isSupportObjectConstructor = nativeURLSearchParams && new nativeURLSearchParams({ a: 1 }).toString() === 'a=1',

  // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
  decodesPlusesCorrectly = nativeURLSearchParams && new nativeURLSearchParams('s=%2B').get('s') === '+',
      __URLSearchParams__ = "__URLSearchParams__",

  // Fix bug in Edge which cannot encode ' &' correctly
  encodesAmpersandsCorrectly = nativeURLSearchParams ? function () {
    var ampersandTest = new nativeURLSearchParams();
    ampersandTest.append('s', ' &');
    return ampersandTest.toString() === 's=+%26';
  }() : true,
      prototype = URLSearchParamsPolyfill.prototype,
      iterable = !!(self.Symbol && self.Symbol.iterator);

  if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly && encodesAmpersandsCorrectly) {
    return;
  }

  /**
   * Make a URLSearchParams instance
   *
   * @param {object|string|URLSearchParams} search
   * @constructor
   */
  function URLSearchParamsPolyfill(search) {
    search = search || "";

    // support construct object with another URLSearchParams instance
    if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
      search = search.toString();
    }
    this[__URLSearchParams__] = parseToDict(search);
  }

  /**
   * Appends a specified key/value pair as a new search parameter.
   *
   * @param {string} name
   * @param {string} value
   */
  prototype.append = function (name, value) {
    appendTo(this[__URLSearchParams__], name, value);
  };

  /**
   * Deletes the given search parameter, and its associated value,
   * from the list of all search parameters.
   *
   * @param {string} name
   */
  prototype['delete'] = function (name) {
    delete this[__URLSearchParams__][name];
  };

  /**
   * Returns the first value associated to the given search parameter.
   *
   * @param {string} name
   * @returns {string|null}
   */
  prototype.get = function (name) {
    var dict = this[__URLSearchParams__];
    return name in dict ? dict[name][0] : null;
  };

  /**
   * Returns all the values association with a given search parameter.
   *
   * @param {string} name
   * @returns {Array}
   */
  prototype.getAll = function (name) {
    var dict = this[__URLSearchParams__];
    return name in dict ? dict[name].slice(0) : [];
  };

  /**
   * Returns a Boolean indicating if such a search parameter exists.
   *
   * @param {string} name
   * @returns {boolean}
   */
  prototype.has = function (name) {
    return name in this[__URLSearchParams__];
  };

  /**
   * Sets the value associated to a given search parameter to
   * the given value. If there were several values, delete the
   * others.
   *
   * @param {string} name
   * @param {string} value
   */
  prototype.set = function set$$1(name, value) {
    this[__URLSearchParams__][name] = ['' + value];
  };

  /**
   * Returns a string containg a query string suitable for use in a URL.
   *
   * @returns {string}
   */
  prototype.toString = function () {
    var dict = this[__URLSearchParams__],
        query = [],
        i,
        key,
        name,
        value;
    for (key in dict) {
      name = encode(key);
      for (i = 0, value = dict[key]; i < value.length; i++) {
        query.push(name + '=' + encode(value[i]));
      }
    }
    return query.join('&');
  };

  // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.
  var forSureUsePolyfill = !decodesPlusesCorrectly;
  var useProxy = !forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy;
  /*
   * Apply polifill to global object and append other prototype into it
   */
  Object.defineProperty(self, 'URLSearchParams', {
    value: useProxy ?
    // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
    new Proxy(nativeURLSearchParams, {
      construct: function construct(target, args) {
        return new target(new URLSearchParamsPolyfill(args[0]).toString());
      }
    }) : URLSearchParamsPolyfill
  });

  var USPProto = self.URLSearchParams.prototype;

  USPProto.polyfill = true;

  /**
   *
   * @param {function} callback
   * @param {object} thisArg
   */
  USPProto.forEach = USPProto.forEach || function (callback, thisArg) {
    var dict = parseToDict(this.toString());
    Object.getOwnPropertyNames(dict).forEach(function (name) {
      dict[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  /**
   * Sort all name-value pairs
   */
  USPProto.sort = USPProto.sort || function () {
    var dict = parseToDict(this.toString()),
        keys = [],
        k,
        i,
        j;
    for (k in dict) {
      keys.push(k);
    }
    keys.sort();

    for (i = 0; i < keys.length; i++) {
      this['delete'](keys[i]);
    }
    for (i = 0; i < keys.length; i++) {
      var key = keys[i],
          values = dict[key];
      for (j = 0; j < values.length; j++) {
        this.append(key, values[j]);
      }
    }
  };

  /**
   * Returns an iterator allowing to go through all keys of
   * the key/value pairs contained in this object.
   *
   * @returns {function}
   */
  USPProto.keys = USPProto.keys || function () {
    var items = [];
    this.forEach(function (item, name) {
      items.push(name);
    });
    return makeIterator(items);
  };

  /**
   * Returns an iterator allowing to go through all values of
   * the key/value pairs contained in this object.
   *
   * @returns {function}
   */
  USPProto.values = USPProto.values || function () {
    var items = [];
    this.forEach(function (item) {
      items.push(item);
    });
    return makeIterator(items);
  };

  /**
   * Returns an iterator allowing to go through all key/value
   * pairs contained in this object.
   *
   * @returns {function}
   */
  USPProto.entries = USPProto.entries || function () {
    var items = [];
    this.forEach(function (item, name) {
      items.push([name, item]);
    });
    return makeIterator(items);
  };

  if (iterable) {
    USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
  }

  function encode(str) {
    var replace = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function (match) {
      return replace[match];
    });
  }

  function decode(str) {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  }

  function makeIterator(arr) {
    var iterator = {
      next: function next() {
        var value = arr.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (iterable) {
      iterator[self.Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function parseToDict(search) {
    var dict = {};

    if ((typeof search === 'undefined' ? 'undefined' : _typeof(search)) === "object") {
      for (var key in search) {
        if (search.hasOwnProperty(key)) {
          appendTo(dict, key, search[key]);
        }
      }
    } else {
      // remove first '?'
      if (search.indexOf("?") === 0) {
        search = search.slice(1);
      }

      var pairs = search.split("&");
      for (var j = 0; j < pairs.length; j++) {
        var value = pairs[j],
            index = value.indexOf('=');

        if (-1 < index) {
          appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));
        } else {
          if (value) {
            appendTo(dict, decode(value), '');
          }
        }
      }
    }

    return dict;
  }

  function appendTo(dict, name, value) {
    var val = typeof value === 'string' ? value : value !== null && value !== undefined && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value);

    if (name in dict) {
      dict[name].push(val);
    } else {
      dict[name] = [val];
    }
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : undefined);

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {

  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

(function (self) {
    'use strict';

    if (self.fetch) {
        return;
    }

    var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && function () {
            try {
                new Blob();
                return true;
            } catch (e) {
                return false;
            }
        }(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
        var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

        var isDataView = function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
        };

        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
    }

    function normalizeName(name) {
        if (typeof name !== 'string') {
            name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name');
        }
        return name.toLowerCase();
    }

    function normalizeValue(value) {
        if (typeof value !== 'string') {
            value = String(value);
        }
        return value;
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
        var iterator = {
            next: function next() {
                var value = items.shift();
                return { done: value === undefined, value: value };
            }
        };

        if (support.iterable) {
            iterator[Symbol.iterator] = function () {
                return iterator;
            };
        }

        return iterator;
    }

    function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach(function (value, name) {
                this.append(name, value);
            }, this);
        } else if (Array.isArray(headers)) {
            headers.forEach(function (header) {
                this.append(header[0], header[1]);
            }, this);
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                this.append(name, headers[name]);
            }, this);
        }
    }

    Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ',' + value : value;
    };

    Headers.prototype['delete'] = function (name) {
        delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
    };

    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
    };

    Headers.prototype.forEach = function (callback, thisArg) {
        for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
            }
        }
    };

    Headers.prototype.keys = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push(name);
        });
        return iteratorFor(items);
    };

    Headers.prototype.values = function () {
        var items = [];
        this.forEach(function (value) {
            items.push(value);
        });
        return iteratorFor(items);
    };

    Headers.prototype.entries = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push([name, value]);
        });
        return iteratorFor(items);
    };

    if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
        if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'));
        }
        body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
        return new Promise(function (resolve, reject) {
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function () {
                reject(reader.error);
            };
        });
    }

    function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise;
    }

    function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise;
    }

    function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);

        for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
        }
        return chars.join('');
    }

    function bufferClone(buf) {
        if (buf.slice) {
            return buf.slice(0);
        } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
        }
    }

    function Body() {
        this.bodyUsed = false;

        this._initBody = function (body) {
            this._bodyInit = body;
            if (!body) {
                this._bodyText = '';
            } else if (typeof body === 'string') {
                this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                // IE 10-11 can’t handle a DataView body.
                this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
            } else {
                throw new Error('unsupported BodyInit type');
            }

            if (!this.headers.get('content-type')) {
                if (typeof body === 'string') {
                    this.headers.set('content-type', 'text/plain;charset=UTF-8');
                } else if (this._bodyBlob && this._bodyBlob.type) {
                    this.headers.set('content-type', this._bodyBlob.type);
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                }
            }
        };

        if (support.blob) {
            this.blob = function () {
                var rejected = consumed(this);
                if (rejected) {
                    return rejected;
                }

                if (this._bodyBlob) {
                    return Promise.resolve(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as blob');
                } else {
                    return Promise.resolve(new Blob([this._bodyText]));
                }
            };

            this.arrayBuffer = function () {
                if (this._bodyArrayBuffer) {
                    return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                } else {
                    return this.blob().then(readBlobAsArrayBuffer);
                }
            };
        }

        this.text = function () {
            var rejected = consumed(this);
            if (rejected) {
                return rejected;
            }

            if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as text');
            } else {
                return Promise.resolve(this._bodyText);
            }
        };

        if (support.formData) {
            this.formData = function () {
                return this.text().then(decode);
            };
        }

        this.json = function () {
            return this.text().then(JSON.parse);
        };

        return this;
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(input, options) {
        options = options || {};
        var body = options.body;

        if (input instanceof Request) {
            if (input.bodyUsed) {
                throw new TypeError('Already read');
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
                this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
            }
        } else {
            this.url = String(input);
        }

        this.credentials = options.credentials || this.credentials || 'omit';
        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }
        this._initBody(body);
    }

    Request.prototype.clone = function () {
        return new Request(this, { body: this._bodyInit });
    };

    function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function (bytes) {
            if (bytes) {
                var split = bytes.split('=');
                var name = split.shift().replace(/\+/g, ' ');
                var value = split.join('=').replace(/\+/g, ' ');
                form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
        });
        return form;
    }

    function parseHeaders(rawHeaders) {
        var headers = new Headers();
        // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
        // https://tools.ietf.org/html/rfc7230#section-3.2
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
        preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
            var parts = line.split(':');
            var key = parts.shift().trim();
            if (key) {
                var value = parts.join(':').trim();
                headers.append(key, value);
            }
        });
        return headers;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
        if (!options) {
            options = {};
        }

        this.type = 'default';
        this.status = options.status === undefined ? 200 : options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = 'statusText' in options ? options.statusText : 'OK';
        this.headers = new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
        });
    };

    Response.error = function () {
        var response = new Response(null, { status: 0, statusText: '' });
        response.type = 'error';
        return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code');
        }

        return new Response(null, { status: status, headers: { location: url } });
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
        return new Promise(function (resolve, reject) {
            var request = new Request(input, init);
            var xhr = new XMLHttpRequest();

            xhr.onload = function () {
                var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                };
                options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
            };

            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };

            xhr.ontimeout = function () {
                reject(new TypeError('Network request failed'));
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
                xhr.withCredentials = true;
            } else if (request.credentials === 'omit') {
                xhr.withCredentials = false;
            }

            if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob';
            }

            request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value);
            });

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        });
    };
    self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
    'use strict';

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
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
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
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };

        return _setPrototypeOf(o, p);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function")) {
            return call;
        }

        return _assertThisInitialized(self);
    }

    function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
        }

        return object;
    }

    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        } else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);

                if (!base) return;
                var desc = Object.getOwnPropertyDescriptor(base, property);

                if (desc.get) {
                    return desc.get.call(receiver);
                }

                return desc.value;
            };
        }

        return _get(target, property, receiver || target);
    }

    var Emitter =
    /*#__PURE__*/
    function () {
        function Emitter() {
            _classCallCheck(this, Emitter);

            Object.defineProperty(this, 'listeners', {
                value: {},
                writable: true,
                configurable: true
            });
        }

        _createClass(Emitter, [{
            key: "addEventListener",
            value: function addEventListener(type, callback) {
                if (!(type in this.listeners)) {
                    this.listeners[type] = [];
                }

                this.listeners[type].push(callback);
            }
        }, {
            key: "removeEventListener",
            value: function removeEventListener(type, callback) {
                if (!(type in this.listeners)) {
                    return;
                }

                var stack = this.listeners[type];

                for (var i = 0, l = stack.length; i < l; i++) {
                    if (stack[i] === callback) {
                        stack.splice(i, 1);
                        return;
                    }
                }
            }
        }, {
            key: "dispatchEvent",
            value: function dispatchEvent(event) {
                var _this = this;

                if (!(event.type in this.listeners)) {
                    return;
                }

                var debounce = function debounce(callback) {
                    setTimeout(function () {
                        return callback.call(_this, event);
                    });
                };

                var stack = this.listeners[event.type];

                for (var i = 0, l = stack.length; i < l; i++) {
                    debounce(stack[i]);
                }

                return !event.defaultPrevented;
            }
        }]);

        return Emitter;
    }();

    var AbortSignal =
    /*#__PURE__*/
    function (_Emitter) {
        _inherits(AbortSignal, _Emitter);

        function AbortSignal() {
            var _this2;

            _classCallCheck(this, AbortSignal);

            _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AbortSignal).call(this)); // Some versions of babel does not transpile super() correctly for IE <= 10, if the parent
            // constructor has failed to run, then "this.listeners" will still be undefined and then we call
            // the parent constructor directly instead as a workaround. For general details, see babel bug:
            // https://github.com/babel/babel/issues/3041
            // This hack was added as a fix for the issue described here:
            // https://github.com/Financial-Times/polyfill-library/pull/59#issuecomment-477558042

            if (!_this2.listeners) {
                Emitter.call(_assertThisInitialized(_this2));
            } // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
            // we want Object.keys(new AbortController().signal) to be [] for compat with the native impl


            Object.defineProperty(_assertThisInitialized(_this2), 'aborted', {
                value: false,
                writable: true,
                configurable: true
            });
            Object.defineProperty(_assertThisInitialized(_this2), 'onabort', {
                value: null,
                writable: true,
                configurable: true
            });
            return _this2;
        }

        _createClass(AbortSignal, [{
            key: "toString",
            value: function toString() {
                return '[object AbortSignal]';
            }
        }, {
            key: "dispatchEvent",
            value: function dispatchEvent(event) {
                if (event.type === 'abort') {
                    this.aborted = true;

                    if (typeof this.onabort === 'function') {
                        this.onabort.call(this, event);
                    }
                }

                _get(_getPrototypeOf(AbortSignal.prototype), "dispatchEvent", this).call(this, event);
            }
        }]);

        return AbortSignal;
    }(Emitter);
    var AbortController =
    /*#__PURE__*/
    function () {
        function AbortController() {
            _classCallCheck(this, AbortController);

            // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
            // we want Object.keys(new AbortController()) to be [] for compat with the native impl
            Object.defineProperty(this, 'signal', {
                value: new AbortSignal(),
                writable: true,
                configurable: true
            });
        }

        _createClass(AbortController, [{
            key: "abort",
            value: function abort() {
                var event;

                try {
                    event = new Event('abort');
                } catch (e) {
                    if (typeof document !== 'undefined') {
                        if (!document.createEvent) {
                            // For Internet Explorer 8:
                            event = document.createEventObject();
                            event.type = 'abort';
                        } else {
                            // For Internet Explorer 11:
                            event = document.createEvent('Event');
                            event.initEvent('abort', false, false);
                        }
                    } else {
                        // Fallback where document isn't available:
                        event = {
                            type: 'abort',
                            bubbles: false,
                            cancelable: false
                        };
                    }
                }

                this.signal.dispatchEvent(event);
            }
        }, {
            key: "toString",
            value: function toString() {
                return '[object AbortController]';
            }
        }]);

        return AbortController;
    }();

    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        // These are necessary to make sure that we get correct output for:
        // Object.prototype.toString.call(new AbortController())
        AbortController.prototype[Symbol.toStringTag] = 'AbortController';
        AbortSignal.prototype[Symbol.toStringTag] = 'AbortSignal';
    }

    function polyfillNeeded(self) {
        if (self.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
            console.log('__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill');
            return true;
        } // Note that the "unfetch" minimal fetch polyfill defines fetch() without
        // defining window.Request, and this polyfill need to work on top of unfetch
        // so the below feature detection needs the !self.AbortController part.
        // The Request.prototype check is also needed because Safari versions 11.1.2
        // up to and including 12.1.x has a window.AbortController present but still
        // does NOT correctly implement abortable fetch:
        // https://bugs.webkit.org/show_bug.cgi?id=174980#c2


        return typeof self.Request === 'function' && !self.Request.prototype.hasOwnProperty('signal') || !self.AbortController;
    }

    /**
     * Note: the "fetch.Request" default value is available for fetch imported from
     * the "node-fetch" package and not in browsers. This is OK since browsers
     * will be importing umd-polyfill.js from that path "self" is passed the
     * decorator so the default value will not be used (because browsers that define
     * fetch also has Request). One quirky setup where self.fetch exists but
     * self.Request does not is when the "unfetch" minimal fetch polyfill is used
     * on top of IE11; for this case the browser will try to use the fetch.Request
     * default value which in turn will be undefined but then then "if (Request)"
     * will ensure that you get a patched fetch but still no Request (as expected).
     * @param {fetch, Request = fetch.Request}
     * @returns {fetch: abortableFetch, Request: AbortableRequest}
     */

    function abortableFetchDecorator(patchTargets) {
        if ('function' === typeof patchTargets) {
            patchTargets = {
                fetch: patchTargets
            };
        }

        var _patchTargets = patchTargets,
            fetch = _patchTargets.fetch,
            _patchTargets$Request = _patchTargets.Request,
            NativeRequest = _patchTargets$Request === void 0 ? fetch.Request : _patchTargets$Request,
            NativeAbortController = _patchTargets.AbortController,
            _patchTargets$__FORCE = _patchTargets.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL,
            __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL = _patchTargets$__FORCE === void 0 ? false : _patchTargets$__FORCE;

        if (!polyfillNeeded({
            fetch: fetch,
            Request: NativeRequest,
            AbortController: NativeAbortController,
            __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL: __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL
        })) {
            return {
                fetch: fetch,
                Request: Request
            };
        }

        var Request = NativeRequest; // Note that the "unfetch" minimal fetch polyfill defines fetch() without
        // defining window.Request, and this polyfill need to work on top of unfetch
        // hence we only patch it if it's available. Also we don’t patch it if signal
        // is already available on the Request prototype because in this case support
        // is present and the patching below can cause a crash since it assigns to
        // request.signal which is technically a read-only property. This latter error
        // happens when you run the main5.js node-fetch example in the repo
        // "abortcontroller-polyfill-examples". The exact error is:
        //   request.signal = init.signal;
        //   ^
        // TypeError: Cannot set property signal of #<Request> which has only a getter

        if (Request && !Request.prototype.hasOwnProperty('signal') || __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
            Request = function Request(input, init) {
                var signal;

                if (init && init.signal) {
                    signal = init.signal; // Never pass init.signal to the native Request implementation when the polyfill has
                    // been installed because if we're running on top of a browser with a
                    // working native AbortController (i.e. the polyfill was installed due to
                    // __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL being set), then passing our
                    // fake AbortSignal to the native fetch will trigger:
                    // TypeError: Failed to construct 'Request': member signal is not of type AbortSignal.

                    delete init.signal;
                }

                var request = new NativeRequest(input, init);

                if (signal) {
                    Object.defineProperty(request, 'signal', {
                        writable: false,
                        enumerable: false,
                        configurable: true,
                        value: signal
                    });
                }

                return request;
            };

            Request.prototype = NativeRequest.prototype;
        }

        var realFetch = fetch;

        var abortableFetch = function abortableFetch(input, init) {
            var signal = Request && Request.prototype.isPrototypeOf(input) ? input.signal : init ? init.signal : undefined;

            if (signal) {
                var abortError;

                try {
                    abortError = new DOMException('Aborted', 'AbortError');
                } catch (err) {
                    // IE 11 does not support calling the DOMException constructor, use a
                    // regular error object on it instead.
                    abortError = new Error('Aborted');
                    abortError.name = 'AbortError';
                } // Return early if already aborted, thus avoiding making an HTTP request


                if (signal.aborted) {
                    return Promise.reject(abortError);
                } // Turn an event into a promise, reject it once `abort` is dispatched


                var cancellation = new Promise(function (_, reject) {
                    signal.addEventListener('abort', function () {
                        return reject(abortError);
                    }, {
                        once: true
                    });
                });

                if (init && init.signal) {
                    // Never pass .signal to the native implementation when the polyfill has
                    // been installed because if we're running on top of a browser with a
                    // working native AbortController (i.e. the polyfill was installed due to
                    // __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL being set), then passing our
                    // fake AbortSignal to the native fetch will trigger:
                    // TypeError: Failed to execute 'fetch' on 'Window': member signal is not of type AbortSignal.
                    delete init.signal;
                } // Return the fastest promise (don’t need to wait for request to finish)


                return Promise.race([cancellation, realFetch(input, init)]);
            }

            return realFetch(input, init);
        };

        return {
            fetch: abortableFetch,
            Request: Request
        };
    }

    (function (self) {

        if (!polyfillNeeded(self)) {
            return;
        }

        if (!self.fetch) {
            console.warn('fetch() is not available, cannot install abortcontroller-polyfill');
            return;
        }

        var _abortableFetch = abortableFetchDecorator(self),
            fetch = _abortableFetch.fetch,
            Request = _abortableFetch.Request;

        self.fetch = fetch;
        self.Request = Request;
        Object.defineProperty(self, 'AbortController', {
            writable: true,
            enumerable: false,
            configurable: true,
            value: AbortController
        });
        Object.defineProperty(self, 'AbortSignal', {
            writable: true,
            enumerable: false,
            configurable: true,
            value: AbortSignal
        });
    })(typeof self !== 'undefined' ? self : global);
});

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = function (exports) {
    "use strict";

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty$$1 = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    };
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      defineProperty$$1(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

      return generator;
    }
    exports.wrap = wrap;

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
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty$$1(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
    defineProperty$$1(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: true });
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function (arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
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
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      defineProperty$$1(this, "_invoke", { value: enqueue });
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);

      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
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
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

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
      var methodName = context.method;
      var method = delegate.iterator[methodName];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method, or a missing .next mehtod, always terminate the
        // yield* loop.
        context.delegate = null;

        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (methodName === "throw" && delegate.iterator["return"]) {
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
        if (methodName !== "return") {
          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
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

      if (!info) {
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

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function () {
      return this;
    });

    define(Gp, "toString", function () {
      return "[object Generator]";
    });

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

    exports.keys = function (val) {
      var object = Object(val);
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
          var i = -1,
              next = function next() {
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
    exports.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function reset(skipTempReset) {
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
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function stop() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function dispatchException(exception) {
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

          return !!caught;
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

      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
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

      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
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

      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function _catch(tryLoc) {
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

      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
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

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
  }(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports);

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
});

var nGram_1 = nGram;

nGram.bigram = nGram(2);
nGram.trigram = nGram(3);

// Factory returning a function that converts a value string to n-grams.
function nGram(n) {
  if (typeof n !== 'number' || isNaN(n) || n < 1 || n === Infinity) {
    throw new Error('`' + n + '` is not a valid argument for n-gram');
  }

  return grams;

  // Create n-grams from a given value.
  function grams(value) {
    var nGrams = [];
    var index;

    if (value === null || value === undefined) {
      return nGrams;
    }

    value = value.slice ? value : String(value);
    index = value.length - n + 1;

    if (index < 1) {
      return nGrams;
    }

    while (index--) {
      nGrams[index] = value.slice(index, index + n);
    }

    return nGrams;
  }
}

var bigrams = nGram_1.bigram;

var diceCoefficient_1 = diceCoefficient;

// Get the edit-distance according to Dice between two values.
function diceCoefficient(value, alternative) {
  var val = String(value).toLowerCase();
  var alt = String(alternative).toLowerCase();
  var left = val.length === 1 ? [val] : bigrams(val);
  var right = alt.length === 1 ? [alt] : bigrams(alt);
  var leftLength = left.length;
  var rightLength = right.length;
  var index = -1;
  var intersections = 0;
  var leftPair;
  var rightPair;
  var offset;

  while (++index < leftLength) {
    leftPair = left[index];
    offset = -1;

    while (++offset < rightLength) {
      rightPair = right[offset];

      if (leftPair === rightPair) {
        intersections++;

        // Make sure this pair never matches again.
        right[offset] = '';
        break;
      }
    }
  }

  return 2 * intersections / (leftLength + rightLength);
}

var dist = createCommonjsModule(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    function sortBy() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return function (obj1, obj2) {
            var props = properties.filter(function (prop) {
                return typeof prop === 'string';
            });
            var map = properties.filter(function (prop) {
                return typeof prop === 'function';
            })[0];
            var i = 0;
            var result = 0;
            var numberOfProperties = props.length;
            while (result === 0 && i < numberOfProperties) {
                result = sort(props[i], map)(obj1, obj2);
                i++;
            }
            return result;
        };
    }
    exports.sortBy = sortBy;
    function sort(property, map) {
        var sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        if (property[property.length - 1] === '^') {
            property = property.substr(0, property.length - 1);
            map = function map(_key, value) {
                return typeof value === 'string' ? value.toLowerCase() : value;
            };
        }
        var apply = map || function (_key, value) {
            return value;
        };
        return function (a, b) {
            var result = 0;
            var mappedA = apply(property, objectPath(a, property));
            var mappedB = apply(property, objectPath(b, property));
            if (mappedA < mappedB) {
                result = -1;
            } else if (mappedA > mappedB) {
                result = 1;
            }
            return result * sortOrder;
        };
    }
    function objectPath(object, path) {
        var pathParts = path.split('.');
        var result = object;
        pathParts.forEach(function (part) {
            result = result[part];
        });
        return result;
    }
});

unwrapExports(dist);
var dist_1 = dist.sortBy;

var Fuse = require('fuse.js');

function queryJson(query, data, searchFields) {
  var options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 1000,
    keys: [searchFields]
  };
  var fuse = new Fuse(data, options);
  var result = fuse.search(query);
  return result;
}

function sanitiseTypeaheadText(string) {
  var sanitisedQueryRemoveChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var sanitisedQuerySplitNumsChars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var trimEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var sanitisedString = string.toLowerCase();

  sanitisedQueryRemoveChars.forEach(function (char) {
    sanitisedString = sanitisedString.replace(new RegExp(char.toLowerCase(), 'g'), '');
  });

  sanitisedString = sanitisedString.replace(/\s\s+/g, ' ');
  sanitisedString = sanitisedString.replace('&', '%26');

  if (sanitisedQuerySplitNumsChars) {
    sanitisedString = sanitisedString.replace(/\d(?=[a-z]{3,})/gi, '$& ');
  }

  sanitisedString = trimEnd ? sanitisedString.trim() : sanitisedString.trimStart();

  return sanitisedString;
}

var AboratableFetch = function () {
  function AboratableFetch(url, options) {
    var _this = this;

    classCallCheck(this, AboratableFetch);

    this.url = url;
    this.controller = new window.AbortController();
    this.options = _extends({}, options, { signal: this.controller.signal });

    fetch(url, options).then(function (response) {
      if (response.ok) {
        _this.thenCallback(response);
      } else {
        _this.catchCallback(response);
      }
    });
  }

  createClass(AboratableFetch, [{
    key: "then",
    value: function then(callback) {
      this.thenCallback = callback;
      return this;
    }
  }, {
    key: "catch",
    value: function _catch(callback) {
      this.catchCallback = callback;
      return this;
    }
  }, {
    key: "abort",
    value: function abort() {
      this.controller.abort();
    }
  }]);
  return AboratableFetch;
}();

var fetch$1 = (function (url, options) {
  return new AboratableFetch(url, options);
});

var baseClass = 'js-typeahead';

var classTypeaheadOption = 'typeahead-input__option';
var classTypeaheadOptionFocused = classTypeaheadOption + '--focused';
var classTypeaheadOptionNoResults = classTypeaheadOption + '--no-results';
var classTypeaheadOptionMoreResults = classTypeaheadOption + '--more-results u-fs-s';
var classTypeaheadHasResults = 'typeahead-input--has-results';
var classTypeaheadResultsTitle = 'typeahead-input__results-title';

var TypeaheadUI = function () {
    function TypeaheadUI(_ref) {
        var context = _ref.context,
            typeaheadData = _ref.typeaheadData,
            sanitisedQueryReplaceChars = _ref.sanitisedQueryReplaceChars,
            sanitisedQuerySplitNumsChars = _ref.sanitisedQuerySplitNumsChars,
            minChars = _ref.minChars,
            resultLimit = _ref.resultLimit,
            suggestOnBoot = _ref.suggestOnBoot,
            onSelect = _ref.onSelect,
            onError = _ref.onError,
            onUnsetResult = _ref.onUnsetResult,
            suggestionFunction = _ref.suggestionFunction,
            handleUpdate = _ref.handleUpdate,
            lang = _ref.lang;
        classCallCheck(this, TypeaheadUI);

        // DOM Elements
        this.context = context;
        this.input = context.querySelector('.' + baseClass + '-input');
        this.resultsContainer = context.querySelector('.' + baseClass + '-results');
        this.listbox = this.resultsContainer.querySelector('.' + baseClass + '-listbox');
        this.instructions = context.querySelector('.' + baseClass + '-instructions');
        this.ariaStatus = context.querySelector('.' + baseClass + '-aria-status');
        // Settings
        this.typeaheadData = typeaheadData || context.getAttribute('data-typeahead-data');
        this.content = JSON.parse(context.getAttribute('data-content'));
        this.listboxId = this.listbox.getAttribute('id');
        this.minChars = minChars || 3;
        this.resultLimit = resultLimit || 10;
        this.suggestOnBoot = suggestOnBoot;
        this.lang = lang || 'en-gb';

        // Callbacks
        this.onSelect = onSelect;
        this.onUnsetResult = onUnsetResult;
        this.onError = onError;
        this.handleUpdate = handleUpdate;

        if (suggestionFunction) {
            this.fetchSuggestions = suggestionFunction;
        } else {
            this.fetchData();
        }

        // State
        this.ctrlKey = false;
        this.deleting = false;
        this.query = '';
        this.sanitisedQuery = '';
        this.previousQuery = '';
        this.results = [];
        this.resultOptions = [];
        this.data = [];
        this.foundResults = 0;
        this.numberOfResults = 0;
        this.highlightedResultIndex = 0;
        this.settingResult = false;
        this.resultSelected = false;
        this.blurring = false;
        this.blurTimeout = null;
        this.sanitisedQueryReplaceChars = sanitisedQueryReplaceChars || [];
        this.sanitisedQuerySplitNumsChars = sanitisedQuerySplitNumsChars || false;

        // Temporary fix as runner doesn't use full lang code
        if (this.lang === 'en') {
            this.lang = 'en-gb';
        }
        this.initialiseUI();
    }

    createClass(TypeaheadUI, [{
        key: 'initialiseUI',
        value: function initialiseUI() {
            this.input.setAttribute('aria-autocomplete', 'new-password');
            this.input.setAttribute('aria-controls', this.listbox.getAttribute('id'));
            this.input.setAttribute('aria-describedby', this.instructions.getAttribute('id'));
            this.input.setAttribute('aria-has-popup', true);
            this.input.setAttribute('aria-owns', this.listbox.getAttribute('id'));
            this.input.setAttribute('aria-expanded', false);
            this.input.setAttribute('autocomplete', 'new-password');
            this.input.setAttribute('role', 'combobox');

            this.context.classList.add('typeahead-input--initialised');

            this.bindEventListeners();
        }
    }, {
        key: 'fetchData',
        value: function fetchData() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                fetch$1(_this.typeaheadData).then(function () {
                    var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return response.json();

                                    case 2:
                                        _this.data = _context.sent;

                                        resolve(_this.data);

                                    case 4:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this);
                    }));

                    return function (_x) {
                        return _ref2.apply(this, arguments);
                    };
                }()).catch(reject);
            });
        }
    }, {
        key: 'bindEventListeners',
        value: function bindEventListeners() {
            this.input.addEventListener('keydown', this.handleKeydown.bind(this));
            this.input.addEventListener('keyup', this.handleKeyup.bind(this));
            this.input.addEventListener('input', this.handleChange.bind(this));
            this.input.addEventListener('focus', this.handleFocus.bind(this));
            this.input.addEventListener('blur', this.handleBlur.bind(this));

            this.listbox.addEventListener('mouseover', this.handleMouseover.bind(this));
            this.listbox.addEventListener('mouseout', this.handleMouseout.bind(this));
        }
    }, {
        key: 'handleKeydown',
        value: function handleKeydown(event) {
            this.ctrlKey = (event.ctrlKey || event.metaKey) && event.key !== 'v';

            switch (event.key) {
                case 'ArrowUp':
                    {
                        event.preventDefault();
                        this.navigateResults(-1);
                        break;
                    }
                case 'ArrowDown':
                    {
                        event.preventDefault();
                        this.navigateResults(1);
                        break;
                    }
                case 'Enter':
                    {
                        event.preventDefault();
                        break;
                    }
            }
        }
    }, {
        key: 'handleKeyup',
        value: function handleKeyup(event) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    {
                        event.preventDefault();
                        break;
                    }
                case 'Enter':
                    {
                        if (this.highlightedResultIndex == null) {
                            this.clearListbox();
                        } else {
                            this.selectResult();
                        }
                        break;
                    }
            }

            this.ctrlKey = false;
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            if (!this.blurring && this.input.value.trim() || this.handleUpdate) {
                if (this.handleUpdate) {
                    this.settingResult = false;
                }
                this.getSuggestions();
            } else {
                this.abortFetch();
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            clearTimeout(this.blurTimeout);
            this.getSuggestions(true);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            var _this2 = this;

            clearTimeout(this.blurTimeout);
            this.blurring = true;

            this.blurTimeout = setTimeout(function () {
                _this2.blurring = false;
            }, 300);
        }
    }, {
        key: 'handleMouseover',
        value: function handleMouseover() {
            var focusedItem = this.resultOptions[this.highlightedResultIndex];

            if (focusedItem) {
                focusedItem.classList.remove(classTypeaheadOptionFocused);
            }
        }
    }, {
        key: 'handleMouseout',
        value: function handleMouseout() {
            var focusedItem = this.resultOptions[this.highlightedResultIndex];

            if (focusedItem) {
                focusedItem.classList.add(classTypeaheadOptionFocused);
            }
        }
    }, {
        key: 'navigateResults',
        value: function navigateResults(direction) {
            var index$$1 = 0;

            if (this.highlightedResultIndex !== null) {
                index$$1 = this.highlightedResultIndex + direction;
            }

            if (index$$1 < this.numberOfResults) {
                if (index$$1 < 0) {
                    index$$1 = null;
                }

                this.setHighlightedResult(index$$1);
            }
        }
    }, {
        key: 'getSuggestions',
        value: function getSuggestions(force) {
            var _this3 = this;

            if (!this.settingResult) {
                var query = this.input.value;
                var sanitisedQuery = sanitiseTypeaheadText(query, this.sanitisedQueryReplaceChars, this.sanitisedQuerySplitNumsChars);

                if (sanitisedQuery !== this.sanitisedQuery || force && !this.resultSelected) {
                    this.unsetResults();
                    this.setAriaStatus();

                    this.query = query;
                    this.sanitisedQuery = sanitisedQuery;
                    if (this.sanitisedQuery.length >= this.minChars) {
                        this.fetchSuggestions(this.sanitisedQuery, this.data).then(this.handleResults.bind(this)).catch(function (error) {
                            if (error.name !== 'AbortError' && _this3.onError) {
                                _this3.onError(error);
                            }
                        });
                    } else {
                        this.clearListbox();
                    }
                }
            }
        }
    }, {
        key: 'fetchSuggestions',
        value: function () {
            var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sanitisedQuery, data) {
                var _this4 = this;

                var results;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.abortFetch();
                                _context2.next = 3;
                                return queryJson(sanitisedQuery, data, this.lang, this.resultLimit);

                            case 3:
                                results = _context2.sent;

                                results.forEach(function (result) {
                                    result.sanitisedText = sanitiseTypeaheadText(result[_this4.lang], _this4.sanitisedQueryReplaceChars);
                                    if (_this4.lang !== 'en-gb') {
                                        var english = result['en-gb'];
                                        var sanitisedAlternative = sanitiseTypeaheadText(english, _this4.sanitisedQueryReplaceChars);

                                        if (sanitisedAlternative.match(sanitisedQuery)) {
                                            result.alternatives = [english];
                                            result.sanitisedAlternatives = [sanitisedAlternative];
                                        }
                                    } else {
                                        result.alternatives = [];
                                        result.sanitisedAlternatives = [];
                                    }
                                });
                                return _context2.abrupt('return', {
                                    results: results,
                                    totalResults: results.length
                                });

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function fetchSuggestions(_x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return fetchSuggestions;
        }()
    }, {
        key: 'abortFetch',
        value: function abortFetch() {
            if (this.fetch && this.fetch.status !== 'DONE') {
                this.fetch.abort();
            }
        }
    }, {
        key: 'unsetResults',
        value: function unsetResults() {
            this.results = [];
            this.resultOptions = [];
            this.resultSelected = false;

            if (this.onUnsetResult) {
                this.onUnsetResult();
            }
        }
    }, {
        key: 'clearListbox',
        value: function clearListbox(preventAriaStatusUpdate) {
            this.listbox.innerHTML = '';
            this.context.classList.remove(classTypeaheadHasResults);
            this.input.removeAttribute('aria-activedescendant');
            this.input.removeAttribute('aria-expanded');

            if (!preventAriaStatusUpdate) {
                this.setAriaStatus();
            }
        }
    }, {
        key: 'handleResults',
        value: function handleResults(result) {
            var _this5 = this;

            this.resultLimit = result.limit ? result.limit : this.resultLimit;
            this.foundResults = result.totalResults;
            if (this.foundResults > this.resultLimit) {
                result.results = result.results.slice(0, this.resultLimit);
            }

            this.results = result.results;
            this.numberOfResults = Math.max(this.results.length, 0);

            if (!this.deleting || this.numberOfResults && this.deleting) {
                //Comment out for testing of not clearing listbox when answer is fully typed
                //if (this.numberOfResults === 1 && this.results[0].sanitisedText === this.sanitisedQuery) {
                //this.clearListbox(true);
                //this.selectResult(0);
                //} else {
                this.listbox.innerHTML = '';
                this.resultOptions = this.results.map(function (result, index$$1) {
                    var ariaLabel = result[_this5.lang];
                    var innerHTML = _this5.emboldenMatch(ariaLabel, _this5.query);

                    if (Array.isArray(result.sanitisedAlternatives)) {
                        var alternativeMatch = result.sanitisedAlternatives.find(function (alternative) {
                            return alternative !== result.sanitisedText && alternative.includes(_this5.sanitisedQuery);
                        });

                        if (alternativeMatch) {
                            var alternativeText = result.alternatives[result.sanitisedAlternatives.indexOf(alternativeMatch)];
                            innerHTML += ' <small>(' + _this5.emboldenMatch(alternativeText, _this5.query) + ')</small>';
                            ariaLabel += ', (' + alternativeText + ')';
                        }
                    }

                    var listElement = document.createElement('li');
                    listElement.className = classTypeaheadOption;
                    listElement.setAttribute('id', _this5.listboxId + '__option--' + index$$1);
                    listElement.setAttribute('role', 'option');
                    listElement.setAttribute('aria-label', ariaLabel);
                    listElement.innerHTML = innerHTML;

                    listElement.addEventListener('click', function () {
                        _this5.selectResult(index$$1);
                    });

                    _this5.listbox.appendChild(listElement);

                    _this5.context.querySelector('.' + classTypeaheadResultsTitle).classList.remove('u-d-no');

                    return listElement;
                });

                if (this.numberOfResults < this.foundResults) {
                    var listElement = document.createElement('li');
                    listElement.className = classTypeaheadOption + ' ' + classTypeaheadOptionMoreResults;
                    listElement.setAttribute('aria-hidden', 'true');
                    listElement.innerHTML = this.content.more_results;
                    this.listbox.appendChild(listElement);
                }

                if (this.resultLimit === 100 && this.foundResults > this.resultLimit) {
                    var warningListElement = document.createElement('li');
                    var warningElement = document.createElement('div');
                    var warningSpanElement = document.createElement('span');
                    var warningBodyElement = document.createElement('div');

                    warningListElement.setAttribute('aria-hidden', 'true');
                    warningListElement.className = 'typeahead-input__warning';
                    warningElement.className = 'panel panel--warn panel--warn--small panel--simple';

                    warningSpanElement.className = 'panel__icon';
                    warningSpanElement.setAttribute('aria-hidden', 'true');
                    warningSpanElement.innerHTML = '!';

                    warningBodyElement.className = 'panel__body';
                    warningBodyElement.innerHTML = this.foundResults + ' results found. Enter more of the address to improve results';

                    warningElement.appendChild(warningSpanElement);
                    warningElement.appendChild(warningBodyElement);
                    warningListElement.appendChild(warningElement);
                    this.listbox.insertBefore(warningListElement, this.listbox.firstChild);
                }

                this.setHighlightedResult(null);

                this.input.setAttribute('aria-expanded', !!this.numberOfResults);
                this.context.classList[!!this.numberOfResults ? 'add' : 'remove'](classTypeaheadHasResults);
                //}
            }
            if (this.numberOfResults === 0 && this.content.no_results) {
                this.context.classList.add(classTypeaheadHasResults);
                this.context.querySelector('.' + classTypeaheadResultsTitle).classList.add('u-d-no');
                this.listbox.innerHTML = '<li class="' + classTypeaheadOption + ' ' + classTypeaheadOptionNoResults + '">' + this.content.no_results + '</li>';
                this.input.setAttribute('aria-expanded', true);
            }
        }
    }, {
        key: 'setHighlightedResult',
        value: function setHighlightedResult(index$$1) {
            var _this6 = this;

            this.highlightedResultIndex = index$$1;

            if (this.highlightedResultIndex === null) {
                this.input.removeAttribute('aria-activedescendant');
            } else if (this.numberOfResults) {
                this.resultOptions.forEach(function (option, optionIndex) {
                    if (optionIndex === index$$1) {
                        option.classList.add(classTypeaheadOptionFocused);
                        option.setAttribute('aria-selected', true);
                        _this6.input.setAttribute('aria-activedescendant', option.getAttribute('id'));
                    } else {
                        option.classList.remove(classTypeaheadOptionFocused);
                        option.removeAttribute('aria-selected');
                    }
                });

                this.setAriaStatus();
            }
        }
    }, {
        key: 'setAriaStatus',
        value: function setAriaStatus(content) {
            if (!content) {
                var queryTooShort = this.sanitisedQuery.length < this.minChars;
                var noResults = this.numberOfResults === 0;

                if (queryTooShort) {
                    content = this.content.aria_min_chars;
                } else if (noResults) {
                    content = this.content.aria_no_results + ': "' + this.query + '"';
                } else if (this.numberOfResults === 1) {
                    content = this.content.aria_one_result;
                } else {
                    content = this.content.aria_n_results.replace('{n}', this.numberOfResults);

                    if (this.resultLimit && this.foundResults > this.resultLimit) {
                        content += ' ' + this.content.aria_limited_results;
                    }
                }
            }
            this.ariaStatus.innerHTML = content;
        }
    }, {
        key: 'selectResult',
        value: function selectResult(index$$1) {
            var _this7 = this;

            if (this.results.length) {
                this.settingResult = true;

                var result = this.results[index$$1 || this.highlightedResultIndex || 0];

                this.resultSelected = true;

                if (result.sanitisedText !== this.sanitisedQuery && result.sanitisedAlternatives && result.sanitisedAlternatives.length) {
                    var bestMatchingAlternative = result.sanitisedAlternatives.map(function (alternative, index$$1) {
                        return {
                            score: diceCoefficient_1(_this7.sanitisedQuery, alternative),
                            index: index$$1
                        };
                    }).sort(dist_1('score'))[0];

                    var scoredSanitised = diceCoefficient_1(this.sanitisedQuery, result.sanitisedText);

                    if (bestMatchingAlternative.score >= scoredSanitised) {
                        result.displayText = result.alternatives[bestMatchingAlternative.index];
                    } else {
                        result.displayText = result[this.lang];
                    }
                } else {
                    result.displayText = result[this.lang];
                }
                this.onSelect(result).then(function () {
                    return _this7.settingResult = false;
                });

                var ariaMessage = this.content.aria_you_have_selected + ': ' + result.displayText + '.';

                this.clearListbox();
                this.setAriaStatus(ariaMessage);
            }
        }
    }, {
        key: 'emboldenMatch',
        value: function emboldenMatch(string, query) {
            var reg = new RegExp(this.escapeRegExp(query).split('').join('[\\s,]*'), 'gi');
            return string.replace(reg, '<strong>$&</strong>');
        }
    }, {
        key: 'escapeRegExp',
        value: function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
    }]);
    return TypeaheadUI;
}();

var Typeahead = function () {
  function Typeahead(context) {
    classCallCheck(this, Typeahead);

    this.context = context;
    this.lang = document.documentElement.getAttribute('lang').toLowerCase();
    this.typeahead = new TypeaheadUI({
      context: context,
      lang: this.lang,
      onSelect: this.onSelect.bind(this),
      onUnsetResult: this.onUnsetResult.bind(this),
      onError: this.onError.bind(this)
    });
  }

  createClass(Typeahead, [{
    key: 'onSelect',
    value: function onSelect(result) {
      var _this = this;

      return new Promise(function (resolve) {
        _this.typeahead.input.value = result.displayText;
        resolve();
      });
    }
  }, {
    key: 'onUnsetResult',
    value: function onUnsetResult() {
      return new Promise(function (resolve) {
        resolve();
      });
    }
  }, {
    key: 'onError',
    value: function onError(error) {
      console.error(error);
    }
  }]);
  return Typeahead;
}();

function typeaheads() {
  var typeaheads = [].concat(toConsumableArray(document.querySelectorAll('.js-typeahead')));

  typeaheads.forEach(function (typeahead) {
    return new Typeahead(typeahead);
  });
}

document.addEventListener('TYPEAHEAD-READY', typeaheads);

function triggerChangeEvent(element) {
  if ('createEvent' in document) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', false, true);
    element.dispatchEvent(evt);
  } else {
    element.fireEvent('onchange');
  }
}

var AbortableFetch = function () {
  function AbortableFetch(url, options) {
    classCallCheck(this, AbortableFetch);

    this.url = url;
    this.options = options;
    this.controller = new window.AbortController();
    this.status = 'UNSENT';
  }

  createClass(AbortableFetch, [{
    key: 'send',
    value: function send() {
      var _this = this;

      this.status = 'LOADING';

      return new Promise(function (resolve, reject) {
        abortableFetch(_this.url, _extends({ signal: _this.controller.signal }, _this.options)).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            _this.status = 'DONE';
            resolve(response);
          } else {
            _this.status = 'DONE';
            reject(response);
          }
        }).catch(function (error) {
          _this.status = 'DONE';
          reject(error);
        });
      });
    }
  }, {
    key: 'abort',
    value: function abort() {
      this.controller.abort();
    }
  }]);
  return AbortableFetch;
}();

function abortableFetch(url, options) {
  return window.fetch(url, options).then(function (response) {
    if (response.ok) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }).catch(function (error) {
    throw error;
  });
}

var classAddress = 'js-address';
var baseClass$1 = 'js-address-typeahead';
var classOrganisation = 'js-address-organisation';
var classLine1 = 'js-address-line-1';
var classLine2 = 'js-address-line-2';
var classTown = 'js-address-town';
var classPostcode = 'js-address-postcode';
var classSearchButtonContainer = 'js-address-search-btn-container';
var classSearchButton = 'js-address-search-btn';
var classManualButton = 'js-address-manual-btn';
var classNotEditable = 'js-address-not-editable';
var classRHLookup = 'js-rh-address-lookup';

var AddressInput = function () {
  function AddressInput(context) {
    classCallCheck(this, AddressInput);

    this.context = context;
    this.organisation = context.querySelector('.' + classOrganisation);
    this.line1 = context.querySelector('.' + classLine1);
    this.line2 = context.querySelector('.' + classLine2);
    this.town = context.querySelector('.' + classTown);
    this.postcode = context.querySelector('.' + classPostcode);
    this.manualInputs = [this.line1, this.line2, this.town, this.postcode];
    this.searchButtonContainer = context.querySelector('.' + classSearchButtonContainer);
    this.searchButton = context.querySelector('.' + classSearchButton);
    this.manualButton = context.querySelector('.' + classManualButton);
    this.form = context.closest('form');
    this.lang = document.documentElement.getAttribute('lang').toLowerCase();
    this.addressReplaceChars = [','];
    this.sanitisedQuerySplitNumsChars = true;

    // State
    this.manualMode = true;
    this.currentQuery = null;
    this.fetch = null;
    this.currentResults = [];
    this.totalResults = 0;
    this.errored = false;
    this.addressSelected = false;
    this.isEditable = context.querySelector('.' + classNotEditable) ? false : true;
    this.isRhLookup = context.querySelector('.' + classRHLookup) ? true : false;

    // Initialise typeahead
    this.typeahead = new TypeaheadUI({
      context: context.querySelector('.' + baseClass$1),
      onSelect: this.onAddressSelect.bind(this),
      onUnsetResult: this.onUnsetAddress.bind(this),
      suggestionFunction: this.suggestAddresses.bind(this),
      onError: this.onError.bind(this),
      sanitisedQueryReplaceChars: this.addressReplaceChars,
      sanitisedQuerySplitNumsChars: this.sanitisedQuerySplitNumsChars,
      minChars: 5,
      suggestOnBoot: true,
      handleUpdate: true
    });

    // Bind Event Listeners
    if (this.searchButton) {
      this.searchButton.addEventListener('click', this.toggleMode.bind(this));
    }

    if (this.manualButton) {
      this.manualButton.addEventListener('click', this.toggleMode.bind(this));
    }

    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    if (!(this.line1.value || this.line2.value || this.town.value)) {
      this.toggleMode();
    }

    this.searchButtonContainer.classList.remove('u-d-no');

    this.baseURL = 'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/';
    this.lookupURL = this.baseURL + 'eq?input=';
    this.retrieveURL = this.baseURL + 'rh/uprn/';

    this.user = 'equser';
    this.password = '$4c@ec1zLBu';
    this.auth = btoa(this.user + ':' + this.password);
    this.headers = new Headers({
      'Authorization': 'Basic ' + this.auth
    });
  }

  createClass(AddressInput, [{
    key: 'toggleMode',
    value: function toggleMode() {
      var clearInputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.setManualMode(!this.manualMode, clearInputs);
    }
  }, {
    key: 'setManualMode',
    value: function setManualMode(manual, clearInputs) {
      this.context.classList[manual ? 'remove' : 'add']('address-input--search');

      if (clearInputs) {
        this.typeahead.unsetResults();
      }

      if (manual) {
        this.typeahead.input.value = '';
      }

      this.manualMode = manual;
    }
  }, {
    key: 'suggestAddresses',
    value: function suggestAddresses(query) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.currentQuery === query && _this.currentQuery.length && _this.currentResults.length) {
          resolve({
            results: _this.currentResults,
            totalResults: _this.currentResults.length
          });
        } else {
          _this.currentQuery = query;
          _this.currentResults = [];

          if (_this.fetch && _this.fetch.status !== 'DONE') {
            _this.fetch.abort();
          }

          _this.reject = reject;
          _this.findAddress(query).then(resolve).catch(reject);
        }
      });
    }
  }, {
    key: 'findAddress',
    value: function findAddress(text) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var testInput = _this2.testFullPostcodeQuery(text);
        var limit = testInput ? 100 : 10;
        var queryUrl = _this2.lookupURL + text + '&limit=' + limit;
        _this2.fetch = new AbortableFetch(queryUrl, {
          method: 'GET',
          headers: _this2.headers
        });
        _this2.fetch.send().then(function () {
          var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return response.json();

                  case 2:
                    data = _context.sent.response;

                    resolve(_this2.mapFindResults(data));

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function (_x2) {
            return _ref.apply(this, arguments);
          };
        }()).catch(reject);
      });
    }
  }, {
    key: 'mapFindResults',
    value: function mapFindResults(results) {
      var _this3 = this;

      var updatedResults = void 0,
          mappedResults = void 0,
          limit = void 0;
      var addresses = results.addresses;
      var total = results.total;
      var originalLimit = 10;
      if (results.partpostcode) {
        var postcodeGroups = results.postcodes;
        mappedResults = postcodeGroups.map(function (_ref2) {
          var postcode = _ref2.postcode,
              streetName = _ref2.streetName,
              townName = _ref2.townName,
              addressCount = _ref2.addressCount,
              firstUprn = _ref2.firstUprn;

          var addressText = addressCount === 1 ? 'address' : 'addresses';
          return {
            'en-gb': streetName + ', ' + townName + ', ' + postcode + ' (<span class="group-text">' + addressCount + ' ' + addressText + '</span>)',
            postcode: postcode,
            firstUprn: firstUprn,
            addressCount: addressCount
          };
        });

        limit = originalLimit;
        this.currentResults = mappedResults.sort();
      } else if (addresses[0]) {
        if (addresses[0] && addresses[0].bestMatchAddress) {
          updatedResults = addresses.map(function (_ref3) {
            var uprn = _ref3.uprn,
                bestMatchAddress = _ref3.bestMatchAddress;
            return { uprn: uprn, address: bestMatchAddress };
          });
          limit = originalLimit;
        } else if (addresses[0] && addresses[0].formattedAddress) {
          updatedResults = addresses.map(function (_ref4) {
            var uprn = _ref4.uprn,
                formattedAddress = _ref4.formattedAddress;
            return { uprn: uprn, address: formattedAddress };
          });
          limit = 100;
        }

        mappedResults = updatedResults.map(function (_ref5) {
          var uprn = _ref5.uprn,
              address = _ref5.address;

          var sanitisedText = sanitiseTypeaheadText(address, _this3.addressReplaceChars);
          return {
            'en-gb': address,
            sanitisedText: sanitisedText,
            uprn: uprn
          };
        });

        this.currentResults = mappedResults.sort();
      } else {
        this.currentResults = addresses;
        limit = originalLimit;
      }

      return {
        results: this.currentResults,
        totalResults: total,
        limit: limit
      };
    }
  }, {
    key: 'retrieveAddress',
    value: function retrieveAddress(id) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var queryUrl = _this4.retrieveURL + id + '?addresstype=paf';
        _this4.fetch = new AbortableFetch(queryUrl, {
          method: 'GET',
          headers: _this4.headers
        });

        _this4.fetch.send().then(function () {
          var _ref6 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(response) {
            var data;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return response.json();

                  case 2:
                    data = _context2.sent;

                    resolve(data);

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this4);
          }));

          return function (_x3) {
            return _ref6.apply(this, arguments);
          };
        }()).catch(reject);
      });
    }
  }, {
    key: 'testFullPostcodeQuery',
    value: function testFullPostcodeQuery(input) {
      var fullPostcodeRegex = /\b((?:(?:gir)|(?:[a-pr-uwyz])(?:(?:[0-9](?:[a-hjkpstuw]|[0-9])?)|(?:[a-hk-y][0-9](?:[0-9]|[abehmnprv-y])?)))) ?([0-9][abd-hjlnp-uw-z]{2})\b/i;
      var testFullPostcode = fullPostcodeRegex.test(input);
      if (testFullPostcode) {
        return true;
      }
    }
  }, {
    key: 'onAddressSelect',
    value: function onAddressSelect(selectedResult) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (selectedResult.uprn && !selectedResult.addressCount) {
          _this5.retrieveAddress(selectedResult.uprn).then(function (data) {
            if (_this5.isEditable) {
              _this5.setAddress(data, resolve);
            } else {
              _this5.typeahead.input.value = selectedResult.displayText;
            }
            if (data.response.address.censusAddressType) {
              var rhAddressTypeInput = _this5.context.querySelector('.js-rh-address-type');
              var rhAddressCountryInput = _this5.context.querySelector('.js-rh-address-country');
              rhAddressTypeInput.value = data.response.address.censusAddressType;
              rhAddressCountryInput.value = data.response.address.countryCode;
            }
          }).catch(reject);
        } else if (selectedResult.postcode && selectedResult.addressCount > 0) {
          var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
          });
          _this5.typeahead.input.value = selectedResult.postcode;
          _this5.typeahead.input.focus();
          _this5.typeahead.input.dispatchEvent(event);
        }
      });
    }
  }, {
    key: 'setAddress',
    value: function setAddress(data, resolve) {
      this.clearManualInputs(false);
      var value = data.response.address;
      if (value.addressLine3) {
        this.line1.value = value.addressLine1 + ', ' + value.addressLine2;
        this.line2.value = value.addressLine3;
      } else {
        this.line1.value = value.addressLine1;
        this.line2.value = value.addressLine2;
      }

      this.town.value = value.townName;
      this.postcode.value = value.postcode;

      this.triggerManualInputsChanges();

      this.addressSelected = true;

      this.setManualMode(true, false);

      resolve();
    }
  }, {
    key: 'clearManualInputs',
    value: function clearManualInputs() {
      var triggerChange$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.manualInputs.forEach(function (input) {
        input.value = '';
      });

      if (triggerChange$$1) {
        this.triggerManualInputsChanges();
      }

      this.addressSelected = false;
    }
  }, {
    key: 'triggerManualInputsChanges',
    value: function triggerManualInputsChanges() {
      this.manualInputs.forEach(triggerChangeEvent);
    }
  }, {
    key: 'onUnsetAddress',
    value: function onUnsetAddress() {
      this.clearManualInputs();
    }
  }, {
    key: 'onError',
    value: function onError() {
      var _this6 = this;

      if (this.fetch) {
        this.fetch.abort();
      }

      // Prevent error message from firing twice
      if (!this.errored) {
        this.errored = true;
        console.log('error');
        setTimeout(function () {
          _this6.errored = false;
        });
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      if (!this.manualMode && this.typeahead.input.value.trim() && !this.addressSelected) {
        event.preventDefault();

        window.DONT_SUBMIT = true;

        this.typeahead.showErrorPanel();
        this.typeahead.setAriaStatus('There is an error. Select an address');
      } else {
        window.DONT_SUBMIT = false;
      }
    }
  }]);
  return AddressInput;
}();

function addressInput() {
  var addressInputs = [].concat(toConsumableArray(document.querySelectorAll('.' + classAddress)));

  addressInputs.forEach(function (addressInput) {
    return new AddressInput(addressInput);
  });
}

addressInput();

var UAC = function () {
  function UAC(context) {
    classCallCheck(this, UAC);

    this.input = context;
    var groupSize = parseInt(context.getAttribute('data-group-size'), 10);
    this.groupingRegex = new RegExp('.{1,' + groupSize + '}', 'g');

    this.bindEventListeners();
  }

  createClass(UAC, [{
    key: 'bindEventListeners',
    value: function bindEventListeners() {
      this.input.addEventListener('input', this.handleInput.bind(this));
    }
  }, {
    key: 'handleInput',
    value: function handleInput() {
      var cursorPosition = this.input.selectionStart;
      var shouldRepositionCursor = cursorPosition !== this.input.value.length;

      this.input.value = (this.input.value.replace(/\s/g, '').match(this.groupingRegex) || []).join(' ');

      if (shouldRepositionCursor) {
        this.input.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  }]);
  return UAC;
}();

function runUAC() {
  var uacInputs = [].concat(toConsumableArray(document.querySelectorAll('.js-uac')));

  if (uacInputs.length) {
    uacInputs.forEach(function (element) {
      return new UAC(element);
    });
  }
}

document.addEventListener('UAC-READY', runUAC);

var inputClassLimitReached = 'input--limit-reached';
var remainingClassLimitReached = 'input__limit--reached';
var attrCharCheckRef = 'data-char-check-ref';
var attrCharCheckVal = 'data-char-check-num';

var CharCheck = function () {
  function CharCheck(context) {
    classCallCheck(this, CharCheck);

    this.context = context;
    this.input = this.context.querySelector('input');
    this.checkElement = document.getElementById(this.input.getAttribute(attrCharCheckRef));
    this.checkVal = this.input.getAttribute(attrCharCheckVal);

    this.charLimitSingularMessage = this.checkElement.getAttribute('data-charcount-limit-singular');
    this.charLimitPluralMessage = this.checkElement.getAttribute('data-charcount-limit-plural');

    this.updateCheckReadout(null, true);
    this.input.addEventListener('input', this.updateCheckReadout.bind(this));
  }

  createClass(CharCheck, [{
    key: 'updateCheckReadout',
    value: function updateCheckReadout(event, firstRun) {
      var value = this.input.value;
      var remaining = this.checkVal - value.length;
      // Prevent aria live announcement when component initialises
      if (!firstRun && event.inputType) {
        this.checkElement.setAttribute('aria-live', 'polite');
      } else {
        this.checkElement.removeAttribute('aria-live');
      }

      this.checkRemaining(remaining);
      this.setCheckClass(remaining, this.input, inputClassLimitReached);
      this.setCheckClass(remaining, this.checkElement, remainingClassLimitReached);
    }
  }, {
    key: 'checkRemaining',
    value: function checkRemaining(remaining) {
      var message = void 0;
      if (remaining === -1) {
        message = this.charLimitSingularMessage;
        this.checkElement.innerText = message.replace('{x}', Math.abs(remaining));
      } else if (remaining < -1) {
        message = this.charLimitPluralMessage;
        this.checkElement.innerText = message.replace('{x}', Math.abs(remaining));
      }
      this.setShowMessage(remaining);
    }
  }, {
    key: 'setShowMessage',
    value: function setShowMessage(remaining) {
      this.checkElement.classList[remaining < 0 ? 'remove' : 'add']('u-d-no');
    }
  }, {
    key: 'setCheckClass',
    value: function setCheckClass(remaining, element, setClass) {
      element.classList[remaining < 0 ? 'add' : 'remove'](setClass);
    }
  }]);
  return CharCheck;
}();

var checkedWrapper = [].concat(toConsumableArray(document.querySelectorAll('.js-char-check')));
if (checkedWrapper.length) {
  checkedWrapper.forEach(function (input) {
    return new CharCheck(input);
  });
}

var eventReady = 'DOMContentLoaded';

var callbacks = [];
var isReady = false;

var onReady = function onReady() {
  isReady = true;
  callbacks.forEach(function (fn) {
    return fn.call();
  });
  document.removeEventListener(eventReady, onReady);
};

function ready(fn) {
  if (isReady) {
    fn.call();
  } else {
    callbacks.push(fn);
  }
}

if (document.readyState === 'interactive') {
  onReady.call();
} else {
  document.addEventListener(eventReady, onReady);
}

ready(function () {
  var previousURL = void 0;
  var urlParams = new URLSearchParams(window.location.search);
  var personID = urlParams.get('person_id');

  var pathName = window.location.pathname;
  var pageData = JSON.parse(sessionStorage.getItem('pageData'));

  if (pageData) {
    previousURL = pageData[pathName];
  }

  if (previousURL) {
    var currentJourneys = [].concat(toConsumableArray(document.querySelectorAll('.js-previous-link')));

    currentJourneys.forEach(function (link) {
      link.setAttribute('href', previousURL + (personID ? '?person_id=' + personID : ''));
    });
  }
});

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
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

var _createBaseFor = createBaseFor;

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
var baseFor = _createBaseFor();

var _baseFor = baseFor;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/** Detect free variable `global` from Node.js. */
var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var _Symbol2 = _root.Symbol;

var _Symbol = _Symbol2;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$2.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$2.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$3.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;

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
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

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
var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$1.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

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
var isArray = Array.isArray;

var isArray_1 = isArray;

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

var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

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
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

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
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

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
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag = '[object Function]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
    return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = function () {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();

  module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

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
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    _isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$5;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

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
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

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
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag$1 = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

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
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

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
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

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
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = _createBaseEach(_baseForOwn);

var _baseEach = baseEach;

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
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity_1;
}

var _castFunction = castFunction;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayEach : _baseEach;
  return func(collection, _castFunction(iteratee));
}

var forEach_1 = forEach;

ready(function () {

  var classTrigger = 'js-inpagelink';

  function inPageLink() {
    var nodeList = document.getElementsByClassName(classTrigger);
    forEach_1(nodeList, applyInPageLink);
    return nodeList;
  }

  function applyInPageLink(elTrigger) {
    var elId = elTrigger.getAttribute('href').replace('#', '');
    elTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      focusOnInput(elId);
    });

    return { elTrigger: elTrigger, elId: elId };
  }

  function focusOnInput(elId) {
    var container = document.getElementById(elId).closest('.panel');
    console.log(container);
    container.scrollIntoView();

    var input = [].concat(toConsumableArray(container.getElementsByTagName('INPUT')), toConsumableArray(container.getElementsByTagName('TEXTAREA')), toConsumableArray(container.getElementsByTagName('SELECT'))).filter(function (input) {
      var type = input.getAttribute('type');

      return type !== 'readonly' && type !== 'hidden' && type !== 'checkbox' && type !== 'radio';
    })[0];

    if (input) {
      input.focus();
    }
    return elId;
  }

  inPageLink();
});

function autoIncrementId(collection) {
  var k = collection + '-increment',
      id = parseInt(sessionStorage.getItem(k)) || 0;

  id++;

  sessionStorage.setItem(k, JSON.stringify(id));

  return id;
}

function removeFromList(list, val) {

  function doRemove(item) {
    var foundId = list.indexOf(item);

    /**
     * Guard
     */
    if (foundId === -1) {
      console.log('Attempt to remove from list failed: ', list, val);
      return;
    }

    list.splice(foundId, 1);
  }

  if (_.isArray(val)) {
    $.each(val, function (i, item) {
      doRemove(item);
    });
  } else {
    doRemove(val);
  }
}

function trailingNameS(name) {
  return name[name.length - 1] === 's' ? '\&#x2019;' : '\&#x2019;s';
}

var HOUSEHOLD_MEMBERS_STORAGE_KEY = 'household-members';
var USER_HOUSEHOLD_MEMBER_ID = 'person_me';
var HOUSEHOLD_MEMBER_TYPE = 'household-member';
var VISITOR_TYPE = 'visitor';

/**
 * Types
 */
function person(opts, change) {
  if (opts.firstName === '' || opts.lastName === '') {
    console.log('Unable to create person with data: ', opts.firstName, !opts.middleName, !opts.lastName);
  }
  var fullName = opts.firstName + ' ' + opts.lastName;
  var middleName = opts.middleName || '';
  var memberFound = householdMemberExistByFullName(fullName);
  if (memberFound) {
    var middleNameCheck = JSON.stringify(memberFound['@person'].fullName).split(' ').length;
    if (change && middleNameCheck < 3) {
      return {
        fullName: fullName,
        firstLastName: fullName,
        firstName: opts.firstName,
        middleName: middleName,
        lastName: opts.lastName
      };
    } else {
      memberFound['@person'].fullName = memberFound['@person'].firstName + ' ' + memberFound['@person'].middleName + ' ' + memberFound['@person'].lastName;
      memberFound = memberFound['@person'];
      updateHouseholdMember(memberFound, { type: 'household-member' });
      return {
        fullName: opts.firstName + ' ' + middleName + ' ' + opts.lastName,
        firstLastName: fullName,
        firstName: opts.firstName,
        middleName: middleName,
        lastName: opts.lastName
      };
    }
  } else {
    return {
      firstLastName: opts.firstName + ' ' + opts.lastName,
      firstName: opts.firstName,
      middleName: middleName,
      lastName: opts.lastName,
      fullName: opts.firstName + ' ' + opts.lastName
    };
  }
}

/**
 * Storage
 */
function getUserAsHouseholdMember() {
  return getAllHouseholdMembers().find(function (member) {
    return member['@person'].id === USER_HOUSEHOLD_MEMBER_ID;
  });
}

function deleteUserAsHouseholdMember() {
  deleteHouseholdMember(USER_HOUSEHOLD_MEMBER_ID);
}

function deleteHouseholdMember(personId) {
  var members = getAllHouseholdMembers().filter(function (member) {
    return member['@person'].id !== personId;
  });

  sessionStorage.setItem(HOUSEHOLD_MEMBERS_STORAGE_KEY, JSON.stringify(members));
}

function updateUserAsHouseholdMember(person, memberData) {
  var userAsHouseholdMember = getUserAsHouseholdMember();

  userAsHouseholdMember ? updateHouseholdMember(_extends({}, userAsHouseholdMember['@person'], person), memberData) : addHouseholdMember(person, memberData, USER_HOUSEHOLD_MEMBER_ID);
}

function updateHouseholdMember(person, memberData) {
  var membersUpdated = getAllHouseholdMembers().map(function (member) {
    return member['@person'].id === person.id ? _extends({}, member, memberData, { '@person': _extends({}, member['@person'], person) }) : member;
  });
  sessionStorage.setItem(HOUSEHOLD_MEMBERS_STORAGE_KEY, JSON.stringify(membersUpdated));
}

function addHouseholdMember(person, memberData, id) {
  var people = getAllHouseholdMembers() || [];
  memberData = memberData || {};

  /**
   * User is always first in the household list
   */
  people[id === USER_HOUSEHOLD_MEMBER_ID ? 'unshift' : 'push'](_extends({}, memberData, {
    type: memberData.type || HOUSEHOLD_MEMBER_TYPE,
    '@person': _extends({}, person, {
      id: id || 'person' + autoIncrementId('household-members')
    })
  }));

  sessionStorage.setItem(HOUSEHOLD_MEMBERS_STORAGE_KEY, JSON.stringify(people));
}

function getAllHouseholdMembers() {
  return JSON.parse(sessionStorage.getItem(HOUSEHOLD_MEMBERS_STORAGE_KEY)) || [];
}

function getHouseholdMemberByPersonId(id) {
  return getAllHouseholdMembers().find(function (member) {
    return member['@person'].id === id;
  });
}

function householdMemberExistByFullName(fullName) {
  return getAllHouseholdMembers().find(function (member) {
    return member['@person'].firstName.toLowerCase() + ' ' + member['@person'].lastName.toLowerCase() === fullName.toLowerCase();
  });
}

function getMemberPersonId(member) {
  return member['@person'].id;
}

/**
 * Comparators
 */
function isVisitor(member) {
  return member.type === window.ONS.storage.KEYS.VISITOR_TYPE;
}

function isHouseholdMember(member) {
  return member.type === window.ONS.storage.KEYS.HOUSEHOLD_MEMBER_TYPE;
}

function isOtherHouseholdMember(member) {
  return member.type === window.ONS.storage.KEYS.HOUSEHOLD_MEMBER_TYPE && member['@person'].id !== window.ONS.storage.IDS.USER_HOUSEHOLD_MEMBER_ID;
}

var tempAwayQuestionSentenceMap = {
  'three-more': 'People who usually live outside the UK who are staying in the UK for <strong>3 months or more</strong>',
  'perm-away': 'People who work away from home within the UK if this is their permanent or family home',
  'armed-forces': 'Members of the armed forces if this is their permanent or family home',
  'less-twelve': 'People who are temporarily outside the UK for less than <strong>12 months</strong>',
  'usually-temp': 'People staying temporarily who usually live in the UK but' + ' do not have another UK address for example, relatives, friends',
  'other': 'Other people who usually live here but are temporarily away'
};

var visitorQuestionSentenceMap = {
  'usually-in-uk': 'People who usually live somewhere else in the UK, for example boy/girlfriends, friends or relatives',
  'second-address': 'People staying here because it is their second address, for example, for work. Their permanent or family home is elsewhere',
  'less-three': 'People who usually live outside the UK who are staying in the UK for less than three months',
  'on-holiday': 'People here on holiday'
};

/**
 * Augment Underscore library
 */
var _$1 = window._ || {};

var RELATIONSHIPS_STORAGE_KEY = 'relationships';

var relationshipTypes = {
  'spouse': { id: 'spouse' },
  'child-parent': { id: 'child-parent' },
  'step-child-parent': { id: 'step-child-parent' },
  'grandchild-grandparent': { id: 'grandchild-grandparent' },
  'half-sibling': { id: 'half-sibling' },
  'sibling': { id: 'sibling' },
  'step-brother-sister': { id: 'step-brother-sister' },
  'partner': { id: 'partner' },
  'unrelated': { id: 'unrelated' },
  'other-relation': { id: 'other-relation' }
};

var relationshipDescriptionMap = {
  // covered
  'husband-wife': {
    sentanceLabel: 'husband or wife',
    summaryAdjective: 'husband or wife',
    type: relationshipTypes['spouse']
  },
  // covered
  'mother-father': {
    sentanceLabel: 'mother or father',
    summaryAdjective: 'mother or father',
    type: relationshipTypes['child-parent']
  },
  // covered
  'step-mother-father': {
    sentanceLabel: 'stepmother or stepfather',
    summaryAdjective: 'stepmother or stepfather',
    type: relationshipTypes['step-child-parent']
  },
  // covered
  'son-daughter': {
    sentanceLabel: 'son or daughter',
    summaryAdjective: 'son or daughter',
    type: relationshipTypes['child-parent']
  },
  // covered
  'half-brother-sister': {
    sentanceLabel: 'half-brother or half-sister',
    summaryAdjective: 'half-brother or half-sister',
    type: relationshipTypes['half-sibling']
  },
  // covered
  'step-child': {
    sentanceLabel: 'stepchild',
    summaryAdjective: 'stepchild',
    type: relationshipTypes['step-child-parent']
  },
  // covered
  'grandparent': {
    sentanceLabel: 'grandparent',
    summaryAdjective: 'grandparent',
    type: relationshipTypes['grandchild-grandparent']
  },
  // covered
  'grandchild': {
    sentanceLabel: 'grandchild',
    summaryAdjective: 'grandchild',
    type: relationshipTypes['grandchild-grandparent']
  },
  // covered
  'brother-sister': {
    sentanceLabel: 'brother or sister',
    summaryAdjective: 'brother or sister',
    type: relationshipTypes['sibling']
  },
  // covered
  'step-brother-sister': {
    sentanceLabel: 'stepbrother or stepsister',
    summaryAdjective: 'stepbrother or stepsister',
    type: relationshipTypes['step-brother-sister']
  },
  // covered
  'other-relation': {
    sentanceLabel: 'other relation',
    summaryAdjective: 'related',
    type: relationshipTypes['other-relation']
  },
  // covered
  'partner': {
    sentanceLabel: 'partner',
    summaryAdjective: 'partner',
    type: relationshipTypes['partner']
  },
  'same-sex-partner': {
    sentanceLabel: 'legally registered civil partner',
    summaryAdjective: 'legally registered civil partner',
    type: relationshipTypes['partner']
  },
  // covered
  'unrelated': {
    sentanceLabel: 'unrelated',
    summaryAdjective: 'unrelated',
    type: relationshipTypes['unrelated']
  }
};

function nameElement(name) {
  return '<strong>' + name + '</strong>';
}

function personListStr(peopleArr) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (peopleArr.length < 1) {
    console.log(peopleArr, 'not enough people to create a list string');
    return;
  }

  if (peopleArr.length === 1) {
    return nameElement(peopleArr[0].fullName + formatPersonIfYou(peopleArr[0]));
  }

  var peopleCopy = [].concat(toConsumableArray(peopleArr)),
      lastPerson = peopleCopy.pop();

  return peopleCopy.map(function (person$$1) {
    return '' + nameElement(person$$1.fullName + (opts.isFamily ? trailingNameS(person$$1.fullName) : '') + formatPersonIfYou(person$$1));
  }).join(', ') + ' and ' + nameElement(lastPerson.fullName + (opts.isFamily ? trailingNameS(lastPerson.fullName) : '') + formatPersonIfYou(lastPerson));
}

function formatPersonIfYou(person$$1) {
  return person$$1.id === USER_HOUSEHOLD_MEMBER_ID ? ' (You)' : '';
}

var relationshipSummaryTemplates = {
  'partnership': function partnership(person1, person2, description) {
    return nameElement(person1.fullName + formatPersonIfYou(person1)) + ' is ' + nameElement(person2.fullName + trailingNameS(person2.fullName) + formatPersonIfYou(person2)) + ' ' + description;
  },
  'twoFamilyMembersToMany': function twoFamilyMembersToMany(parent1, parent2, childrenArr, description) {
    return nameElement(parent1.fullName + formatPersonIfYou(parent1)) + ' and ' + nameElement(parent2.fullName + formatPersonIfYou(parent2)) + ' are ' + personListStr(childrenArr, { isFamily: true }) + ' ' + description;
  },
  'oneFamilyMemberToMany': function oneFamilyMemberToMany(parent, childrenArr, description) {
    console.log(parent, childrenArr, description);
    return nameElement(parent.fullName + formatPersonIfYou(parent)) + ' is ' + personListStr(childrenArr, { isFamily: true }) + ' ' + description;
  },
  'manyToMany': function manyToMany(peopleArr1, peopleArr2, description) {
    return personListStr(peopleArr1) + ' ' + (peopleArr1.length > 1 ? 'are' : 'is') + ' ' + description + ' to ' + personListStr(peopleArr2);
  },
  'allMutual': function allMutual(peopleArr, description) {
    return personListStr(peopleArr) + ' are ' + description;
  }
};

/**
 * Types
 */
function relationship(description, personIsId, personToId) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return {
    personIsDescription: description,
    personIsId: personIsId,
    personToId: personToId,
    inferred: !!opts.inferred,
    inferredBy: opts.inferredBy
  };
}

/**
 * Storage
 */
function addRelationship(relationshipObj) {
  var householdRelationships = getAllRelationships() || [],
      item = _extends({}, relationshipObj, {
    id: autoIncrementId(RELATIONSHIPS_STORAGE_KEY)
  });

  householdRelationships.push(item);

  sessionStorage.setItem(RELATIONSHIPS_STORAGE_KEY, JSON.stringify(householdRelationships));

  return item;
}

function deleteRelationship(relationshipObj) {
  var householdRelationships = (getAllRelationships() || []).filter(function (relationship) {
    return relationship.id !== relationshipObj.id;
  });

  sessionStorage.setItem(RELATIONSHIPS_STORAGE_KEY, JSON.stringify(householdRelationships));
}

function editRelationship(relationshipId, valueObject) {
  var householdRelationships = (getAllRelationships() || []).map(function (relationship) {
    return relationship.id + '' === relationshipId + '' ? _extends({}, valueObject, {
      id: relationshipId
    }) : relationship;
  });

  sessionStorage.setItem(RELATIONSHIPS_STORAGE_KEY, JSON.stringify(householdRelationships));
}

function getAllRelationships() {
  return JSON.parse(sessionStorage.getItem(RELATIONSHIPS_STORAGE_KEY)) || [];
}

function getAllManualRelationships() {
  return getAllRelationships().filter(function (relationship) {
    return !relationship.inferred;
  });
}

function deleteAllRelationshipsForMember(personId) {
  var householdRelationships = getAllRelationships().filter(function (relationship) {
    return !(personId === relationship.personIsId || personId === relationship.personToId);
  });

  sessionStorage.setItem(RELATIONSHIPS_STORAGE_KEY, JSON.stringify(householdRelationships));
}

/**
 * Comparators
 */
function isInRelationship(personId, relationship) {
  return relationship.personToId === personId || relationship.personIsId === personId;
}

function isAChildInRelationship(personId, relationship) {
  /**
   * Guard
   */
  if (!isInRelationship(personId, relationship)) {
    return false;
  }

  return relationship.personIsDescription === 'mother-father' && relationship.personToId === personId || relationship.personIsDescription === 'son-daughter' && relationship.personIsId === personId;
}

function isASiblingInRelationship(personId, relationship) {
  return isInRelationship(personId, relationship) && relationshipDescriptionMap[relationship.personIsDescription].type.id === 'sibling';
}

function isAParentInRelationship(personId, relationship) {
  /**
   * Guard
   */
  if (!isInRelationship(personId, relationship)) {
    return false;
  }

  return relationship.personIsDescription === 'mother-father' && relationship.personIsId === personId || relationship.personIsDescription === 'son-daughter' && relationship.personToId === personId;
}

function areAnyChildrenInRelationshipNotParent(childrenIds, notParentId, relationship) {
  /**
   * Guard
   * If relationship type is not child-parent
   */
  if (relationshipDescriptionMap[relationship.personIsDescription].type.id !== 'child-parent') {

    return false;
  }

  var childIndexAsPersonIs = childrenIds.indexOf(relationship.personIsId),
      childIndexAsPersonTo = childrenIds.indexOf(relationship.personToId);

  /**
   * Find parents with the same children
   *
   * If a personIs-child is not in relationship
   * or 2 children are found in relationship
   */
  if (childIndexAsPersonIs === -1 && childIndexAsPersonTo === -1 || childIndexAsPersonIs !== -1 && childIndexAsPersonTo !== -1) {
    return false;
  }

  /**
   * Child must be in relationship, get child index
   */
  var childIndex = childIndexAsPersonIs !== -1 ? childIndexAsPersonIs : childIndexAsPersonTo;

  /**
   * If personIs is not in relationship
   * and child from previous relationship is a child in this relationship
   */
  return !isInRelationship(notParentId, relationship) && isAChildInRelationship(childrenIds[childIndex], relationship);
}

function isRelationshipType(relationshipType, relationship) {
  var typeOfRelationship = relationshipDescriptionMap[relationship.personIsDescription].type.id;

  /**
   * relationshipType can be an array of types
   */
  return _$1.isArray(relationshipType) ? !!_$1.find(relationshipType, function (rType) {
    return rType === typeOfRelationship;
  }) : typeOfRelationship === relationshipType;
}

function isRelationshipInferred(relationship) {
  return relationship.inferred;
}

/**
 * Retrieve people by role in relationships
 */
function getParentIdFromRelationship(relationship) {
  var parentId = void 0;

  if (relationship.personIsDescription === 'mother-father') {
    parentId = relationship.personIsId;
  }

  if (relationship.personIsDescription === 'son-daughter') {
    parentId = relationship.personToId;
  }

  if (!parentId) {
    console.log('Parent not found in relationship: ', relationship);
    return false;
  }

  return parentId;
}

function getChildIdFromRelationship(relationship) {
  var childId = void 0;

  if (relationship.personIsDescription === 'mother-father') {
    childId = relationship.personToId;
  }

  if (relationship.personIsDescription === 'son-daughter') {
    childId = relationship.personIsId;
  }

  if (!childId) {
    console.log('Child not found in relationship: ', relationship);
    return false;
  }

  return childId;
}

function getSiblingIdFromRelationship(personId, relationship) {
  if (!isInRelationship(personId, relationship)) {
    console.log('Person ' + personId + ' not found in relationship: ', relationship);
    return false;
  }

  return relationship[relationship.personIsId === personId ? 'personToId' : 'personIsId'];
}

function getOtherPersonIdFromRelationship(personId, relationship) {
  return relationship.personIsId === personId ? relationship.personToId : relationship.personIsId;
}

function getAllParentsOf(personId) {
  return getAllRelationships().filter(isAChildInRelationship.bind(null, personId)).map(function (relationship) {
    return getPersonFromMember(getHouseholdMemberByPersonId(getParentIdFromRelationship(relationship)));
  });
}

function getAllChildrenOf(personId) {
  return getAllRelationships().filter(isAParentInRelationship.bind(null, personId)).map(function (relationship) {
    return getHouseholdMemberByPersonId(getChildIdFromRelationship(relationship))['@person'];
  });
}

function getPersonIdFromPerson(person$$1) {
  return person$$1.id;
}

function getPersonFromMember(member) {
  return member['@person'];
}

/**
 * Missing relationship inference
 */
var missingRelationshipInference = {
  siblingsOf: function siblingsOf(subjectMember) {

    var missingRelationships = [],
        allRelationships = getAllRelationships(),
        person$$1 = getPersonFromMember(subjectMember),
        personId = person$$1.id,
        parents = getAllParentsOf(personId),
        siblingIds = allRelationships.filter(isASiblingInRelationship.bind(null, personId)).map(getSiblingIdFromRelationship.bind(null, personId));

    /**
     * If 2 parent relationships of 'person' are found we can attempt to infer
     * sibling relationships
     */
    if (parents.length === 2) {

      getAllHouseholdMembers().filter(isHouseholdMember).forEach(function (member) {

        var memberPersonId = member['@person'].id;

        /**
         * Guard
         * If member is the subject member
         * or member is a parent
         * or member already has a sibling relationship with 'person'
         * skip member
         */
        if (memberPersonId === personId || memberPersonId === parents[0].id || memberPersonId === parents[1].id || siblingIds.indexOf(memberPersonId) > -1) {
          return;
        }

        var memberParents = getAllParentsOf(memberPersonId);

        /**
         * If 2 parents of 'member' are found
         * and they are the same parents of 'person'
         * we have identified a missing inferred relationship
         */
        if (memberParents.length === 2 && _$1.difference(parents.map(getPersonIdFromPerson), memberParents.map(getPersonIdFromPerson)).length === 0) {

          /**
           * Add to missingRelationships
           */
          missingRelationships.push(relationship('brother-sister', personId, memberPersonId, {
            inferred: true,
            inferredBy: [
            /**
             * Must be 4 relationships
             * Could have used member's parents but we can assume they
             * must be the same at this point or the inferrence
             * couldn't happen.
             */
            getRelationshipOf(personId, parents[0].id).id, getRelationshipOf(personId, parents[1].id).id, getRelationshipOf(memberPersonId, parents[0].id).id, getRelationshipOf(memberPersonId, parents[1].id).id]
          }));
        }
      });
    }

    return missingRelationships;
  }
};

function inferRelationships(relationship, personIs, personTo) {
  var missingRelationships = [];

  if (relationship.personIsDescription === 'mother-father') {
    missingRelationships = missingRelationships.concat(missingRelationshipInference.siblingsOf(personTo));
  }

  if (relationship.personIsDescription === 'son-daughter') {
    missingRelationships = missingRelationships.concat(missingRelationshipInference.siblingsOf(personIs));
  }

  $.each(missingRelationships, function (i, relationship) {
    addRelationship(relationship);
  });
}

function findNextMissingRelationship() {
  var householdMembers = getAllHouseholdMembers().filter(isHouseholdMember),
      relationships = getAllRelationships(),
      missingRelationshipMembers = [],
      personIs = null;

  /**
   * Find the next missing relationship
   */
  $.each(householdMembers, function (i, member) {
    var personId = member['@person'].id;

    /**
     * Get all relationships for this member
     */
    var memberRelationships = relationships.filter(function (relationship) {
      return relationship.personIsId === personId || relationship.personToId === personId;
    }),
        memberRelationshipToIds = memberRelationships.map(function (relationship) {
      return relationship.personIsId === personId ? relationship.personToId : relationship.personIsId;
    }) || [];

    /**
     * If total relationships related to this member isn't equal to
     * total household members -1, indicates missing relationship
     */
    if (memberRelationships.length < householdMembers.length - 1) {

      /**
       * All missing relationship members
       */
      missingRelationshipMembers = householdMembers.filter(function (m) {
        return memberRelationshipToIds.indexOf(m['@person'].id) === -1 && m['@person'].id !== personId;
      });

      personIs = member;

      return false;
    }
  });

  return personIs ? {
    personIs: personIs,
    personTo: missingRelationshipMembers[0]
  } : null;
}

function getPeopleIdsMissingRelationshipsWithPerson(personId) {
  var remainingPersonIds = getAllHouseholdMembers().filter(isHouseholdMember).map(function (member) {
    return member['@person'].id;
  });

  /**
   * Remove this person from the list
   */
  removeFromList(remainingPersonIds, personId);

  $.each(getAllRelationships(), function (i, relationship) {
    if (!isInRelationship(personId, relationship)) {
      return;
    }

    /**
     * Remove the other person from the remainingPersonIds list
     */
    removeFromList(remainingPersonIds, getOtherPersonIdFromRelationship(personId, relationship));
  });

  return remainingPersonIds;
}

function getRelationshipType(relationship) {
  return relationshipDescriptionMap[relationship.personIsDescription].type;
}

/**
 * Retrieve from relationship group
 */
function getRelationshipsWithPersonIds(relationships, idArr) {
  return relationships.filter(function (childRelationship) {
    return idArr.indexOf(childRelationship.personIsId) !== -1 || idArr.indexOf(childRelationship.personToId) !== -1;
  });
}

function getRelationshipOf(person1, person2) {
  return getAllRelationships().find(function (relationship) {
    return isInRelationship(person1, relationship) && isInRelationship(person2, relationship);
  });
}

function getNextPersonId(person$$1) {
  if (person$$1 === 'person_me') {
    return 'person1';
  } else {
    var personInt = person$$1.slice(person$$1.length - 1, person$$1.length);
    personInt = ++personInt;
    return 'person' + personInt;
  }
}

var PERSONAL_DETAILS_KEY = 'individual-details';
var PERSONAL_PINS_KEY = 'individual-pins';

var personalDetailsMaritalStatusMap = {
  'never': {
    description: 'Never married and never registered a same-sex civil' + ' partnership'
  },
  'married': {
    description: 'Married'
  },
  'registered': {
    description: 'In a registered same-sex civil partnership'
  },
  'separated-married': {
    description: 'Separated, but still legally married'
  },
  'divorced': {
    description: 'Divorced'
  },
  'former-partnership': {
    description: 'Formerly in a same-sex civil partnership which is now' + ' legally dissolved'
  },
  'widowed': {
    description: 'Widowed'
  },
  'surviving-partner': {
    description: 'Surviving partner from a same-sex civil partnership'
  },
  'separated-partnership': {
    description: 'Separated, but still legally in a same-sex civil partnership'
  }
};

var personalDetailsCountryMap = {
  'england': {
    description: 'England'
  },
  'wales': {
    description: 'Wales'
  },
  'scotland': {
    description: 'Scotland'
  },
  'northern-ireland': {
    description: 'Northern Ireland'
  },
  'republic-ireland': {
    description: 'Republic of Ireland'
  }
};

var personalDetailsOrientationMap = {
  'straight': {
    description: 'Straight or Heterosexual'
  },
  'gay': {
    description: 'Gay or Lesbian'
  },
  'bisexual': {
    description: 'Bisexual'
  },
  'other': {
    description: 'Other'
  },
  'no-say': {
    description: 'Prefer not to say'
  }
};

var personalDetailsGenderMap = {
  'male': {
    description: 'Male'
  },
  'female': {
    description: 'Female'
  }
};

var personalDetailsNationalIdentityMap = {
  'english': {
    description: 'English'
  },
  'welsh': {
    description: 'Welsh'
  },
  'scottish': {
    description: 'Scottish'
  },
  'northern-irish': {
    description: 'Northern Irish'
  },
  'british': {
    description: 'British'
  }
};

var personalDetailsPassportCountriesMap = {
  'united-kingdom': {
    description: 'United Kingdom'
  },
  'ireland': {
    description: 'Ireland'
  },
  'none': {
    description: 'None'
  }
};

var personalDetailsEthnicGroupMap = {
  'White': {
    'question': 'White',
    'options': [{
      val: 'English, Welsh, Scottish, Northern Irish or British',
      label: 'English, Welsh, Scottish, Northern Irish or British'
    }, {
      val: 'Irish',
      label: 'Irish'
    }, {
      val: 'Gypsy or Irish Traveler',
      label: 'Gypsy or Irish Traveler'
    }, {
      val: 'Roma',
      label: 'Roma'
    }, {
      val: 'Other',
      label: 'Any other White background',
      description: 'You can enter your ethnic group or background on the next question'
    }]
  },
  'Mixed': {
    'question': 'Mixed or Multiple',
    'options': [{
      val: 'White and Black Caribbean',
      label: 'White and Black Caribbean'
    }, {
      val: 'White and Black African',
      label: 'White and Black African'
    }, {
      val: 'White and Asian',
      label: 'White and Asian'
    }, {
      val: 'Other',
      label: 'Any other Mixed or Multiple background',
      description: 'You can enter your ethnic group or background on the next question'
    }]
  },
  'Asian': {
    'question': 'Asian or Asian British',
    'options': [{
      val: 'Indian',
      label: 'Indian'
    }, {
      val: 'Pakistani',
      label: 'Pakistani'
    }, {
      val: 'Bangladeshi',
      label: 'Bangladeshi'
    }, {
      val: 'Chinese',
      label: 'Chinese'
    }, {
      val: 'Other',
      label: 'Any other Asian background',
      description: 'You can enter your ethnic group or background on the next question'
    }]
  },
  'Black': {
    'question': 'Black, Black British, Caribbean or African',
    'questionAfrican': 'African',
    'questionWithoutAfrican': 'Black, Black British or Caribbean',
    'options': [{
      val: 'Caribbean',
      label: 'Caribbean'
    }, {
      val: 'African',
      label: 'African',
      description: 'You can enter your ethnic group or background on the next question'
    }, {
      val: 'Other',
      label: 'Any other Black, Black British or Caribbean background',
      description: 'You can enter your ethnic group or background on the next question'
    }]
  },
  'Other': {
    'question': '',
    'options': [{
      val: 'Arab',
      label: 'Arab'
    }, {
      val: 'Other',
      label: 'Any other ethnic group',
      description: 'You can enter your ethnic group or background on the next question'
    }]
  }
};

var personalDetailsApprenticeshipMap = {
  'yes': {
    description: 'Yes'
  },
  'no': {
    description: 'No'
  }
};

var personalDetailsDegreeAboveMap = {
  'yes': {
    description: 'Yes'
  },
  'no': {
    description: 'No'
  }
};

var personalDetailsNVQMap = {
  'nvq-level-1': {
    description: 'NVQ level 1 or equivalent'
  },
  'nvq-level-2': {
    description: 'NVQ level 2 or equivalent'
  },
  'nvq-level-3': {
    description: 'NVQ level 3 or equivalent'
  },
  'none': {
    description: 'None'
  }
};

var personalDetailsALevelMap = {
  'a-level-2': {
    description: '2 or more A levels'
  },
  'a-level-1-btec': {
    description: '1 A level'
  },
  'a-level-1': {
    description: '1 AS level'
  },
  'none': {
    description: 'None'
  }
};

var personalDetailsGCSEMap = {
  'gcse-5': {
    description: '5 or more GCSEs grades A* to C or 9 to 4'
  },
  'other-gcses': {
    description: 'Any other GCSEs'
  },
  'basic-skills': {
    description: 'Basic skills course'
  },
  'none': {
    description: 'None of these apply'
  }
};

var personalDetailsOtherWhere = {
  'in-england-wales': {
    description: 'Yes, in England or Wales'
  },
  'outside-england-wales': {
    description: 'Yes, anywhere outside of England and Wales'
  },
  'none': {
    description: 'No qualifications'
  }
};

var personalDetailsEmploymentStatus = {
  'employee': {
    description: 'Employee'
  },
  'freelance-without-employees': {
    description: 'Self-employed or freelance without employees'
  },
  'freelance-with-employees': {
    description: 'Self-employed with employees'
  },
  'not-employed': {
    description: 'Not employed'
  }
};

function changeDetailsFor(personId, mutation) {
  var details = getPersonalDetailsFor(personId);

  updatePersonalDetails(personId, _extends({}, details, mutation(details || {})));

  return details;
}

function addUpdatePersonalDetailsDOB(personId, day, month, year, question, url) {
  var fullDate = day + "/" + month + "/" + year;
  return changeDetailsFor(personId, function () {
    return {
      'dob': {
        day: day,
        month: month,
        year: year,
        fullDate: fullDate,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateMaritalStatus(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'maritalStatus': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateMaritalStatusWho(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'maritalStatusWho': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdate30DayAddressUk(personId, val, question, url) {
  var address = val.address;
  return changeDetailsFor(personId, function () {
    return {
      'Address30DayUK': {
        address: address,
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdate30DayAddressType(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'Address30DayType': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdate30DayCountry(personId, value, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'Address30DayCountry': _extends({}, details['Address30DayCountry'] || {}, {
        value: value,
        question: question,
        url: url
      })
    };
  });
}

function addUpdateCountry(personId, val, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'country': _extends({}, details['country'] || {}, {
        val: val,
        question: question,
        url: url
      })
    };
  });
}

function addUpdateCountryOther(personId, valOther, questionOther, urlOther) {
  return changeDetailsFor(personId, function (details) {
    return {
      'country': _extends({}, details['country'] || {}, {
        valOther: valOther,
        questionOther: questionOther,
        urlOther: urlOther
      })
    };
  });
}

function addUpdateCountryOtherArrive(personId, month, year, question, url) {
  var fullDate = month + "/" + year;
  return changeDetailsFor(personId, function () {
    return {
      'dateArriveUk': {
        month: month,
        year: year,
        fullDate: fullDate,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateCountryOtherArriveCensus(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'arriveCensusDay': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateCountryOtherStay(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'stayInUk': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateNationalIdentity(personId, collection, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'nationalIdentity': {
        collection: collection,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateNationalIdentityOther(personId, niOther, questionOther, urlOther) {
  return changeDetailsFor(personId, function (details) {
    return {
      'nationalIdentity': _extends({}, details['nationalIdentity'] || {}, {
        niOther: niOther,
        questionOther: questionOther,
        urlOther: urlOther
      })
    };
  });
}

function addUpdateEthnicGroup(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'ethnicGroup': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateEthnicGroupDescription(personId, description, questionDescription, urlDescription) {
  return changeDetailsFor(personId, function (details) {
    return {
      'ethnicGroup': _extends({}, details['ethnicGroup'] || {}, {
        description: description,
        questionDescription: questionDescription,
        urlDescription: urlDescription
      })
    };
  });
}

function addUpdateEthnicGroupOther(personId, otherText, questionOther, urlOther) {
  return changeDetailsFor(personId, function (details) {
    return {
      'ethnicGroup': _extends({}, details['ethnicGroup'] || {}, {
        otherText: otherText,
        questionOther: questionOther,
        urlOther: urlOther
      })
    };
  });
}

function addUpdateReligion(personId, description, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'religion': _extends({}, details['religion'] || {}, { description: description }, {
        question: question,
        url: url
      })
    };
  });
}

function addUpdateReligionOther(personId, descriptionOther, questionOther, urlOther) {
  return changeDetailsFor(personId, function (details) {
    return {
      'religion': _extends({}, details['religion'] || {}, { descriptionOther: descriptionOther }, {
        questionOther: questionOther,
        urlOther: urlOther
      })
    };
  });
}

function addUpdateLanguage(personId, lang, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'language': _extends({}, details['language'] || {}, { lang: lang }, {
        question: question,
        url: url
      })
    };
  });
}

function addUpdateLanguageOther(personId, other, questionOther, urlOther) {
  return changeDetailsFor(personId, function (details) {
    return {
      'language': _extends({}, details['language'] || {}, { other: other }, {
        questionOther: questionOther,
        urlOther: urlOther
      })
    };
  });
}

function addUpdateLanguageEnglish(personId, english, questionEnglishLevel, urlEnglishLevel) {
  return changeDetailsFor(personId, function (details) {
    return {
      'language': _extends({}, details['language'] || {}, { english: english }, {
        questionEnglishLevel: questionEnglishLevel,
        urlEnglishLevel: urlEnglishLevel
      })
    };
  });
}

function addUpdatePassportCountry(personId, countries, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'passport': _extends({}, details['passport'] || {}, {
        countries: countries,
        question: question,
        url: url
      })
    };
  });
}

function addUpdatePassportCountryOther(personId, otherText, questionOther, urlOther) {
  return changeDetailsFor(personId, function (details) {
    return {
      'passport': _extends({}, details['passport'] || {}, {
        otherText: otherText,
        questionOther: questionOther,
        urlOther: urlOther
      })
    };
  });
}

function addUpdateHealth(personId, val, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'health': _extends({}, details['health'] || {}, {
        val: val,
        question: question,
        url: url
      })
    };
  });
}

function addUpdateHealthConditions(personId, conditions, questionConditions, urlConditions) {
  return changeDetailsFor(personId, function (details) {
    return {
      'health': _extends({}, details['health'] || {}, {
        conditions: conditions,
        questionConditions: questionConditions,
        urlConditions: urlConditions
      })
    };
  });
}

function addUpdateHealthConditionsAbilities(personId, abilities, questionAbilities, urlAbilities) {
  return changeDetailsFor(personId, function (details) {
    return {
      'health': _extends({}, details['health'] || {}, {
        abilities: abilities,
        questionAbilities: questionAbilities,
        urlAbilities: urlAbilities
      })
    };
  });
}

function addUpdateHealthSupport(personId, amount, questionSupport, urlSupport) {
  return changeDetailsFor(personId, function (details) {
    return {
      'health': _extends({}, details['health'] || {}, {
        amount: amount,
        questionSupport: questionSupport,
        urlSupport: urlSupport
      })
    };
  });
}

function addUpdateOrientation(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'orientation': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateIdentity(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'identity': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateSalary(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'salary': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateSex(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'sex': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateSchool(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'school': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateStudent(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'student': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateStudentAddaddressInUK(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'studentAddressInUK': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateStudentAddress(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'studentAddress': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateStudentAddressUk(personId, val, question, url) {
  var address = val.addressLine1 + ', ' + val.addressLine2;
  return changeDetailsFor(personId, function () {
    return {
      'AddressStudentUK': {
        address: address,
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateStudentAddressCountry(personId, val, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'AddressStudentCountry': _extends({}, details['AddressStudentCountry'] || {}, {
        val: val,
        question: question,
        url: url
      })
    };
  });
}

function addUpdateAddressWhere(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'addressWhere': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateYearAgoAddress(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'yearAgoAddress': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateYearAgoAddressUk(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'yearAgoAddressUK': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateYearAgoAddressCountry(personId, value, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'yearAgoAddressCountry': _extends({}, details['yearAgoAddressCountry'] || {}, {
        value: value,
        question: question,
        url: url
      })
    };
  });
}

function addUpdateAge(personId, age) {
  return changeDetailsFor(personId, function () {
    return {
      'age': age
    };
  });
}

function addUpdateAgeConfirm(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'ageConfirm': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateAddressOutsideUK(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'addressOutsideUk': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateAddressIndividual(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'address': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateApprenticeship(personId, hasApprenticeship, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'apprenticeship': {
        hasApprenticeship: hasApprenticeship,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateHasQualificationAbove(personId, aboveDegree, questionAbove, urlAbove) {
  return changeDetailsFor(personId, function (details) {
    return {
      'qualifications': _extends({}, details['qualifications'] || {}, {
        aboveDegree: aboveDegree,
        questionAbove: questionAbove,
        urlAbove: urlAbove
      })
    };
  });
}

function addUpdateQualificationsNvqEquivalent(personId, nvqEquivalent, questionNvqEquivalent, urlNvqEquivalent) {
  return changeDetailsFor(personId, function (details) {
    return {
      'qualifications': _extends({}, details['qualifications'] || {}, {
        nvqEquivalent: nvqEquivalent,
        questionNvqEquivalent: questionNvqEquivalent,
        urlNvqEquivalent: urlNvqEquivalent
      })
    };
  });
}

function addUpdateQualificationsALevel(personId, aLevels, questionALevel, urlALevel) {
  return changeDetailsFor(personId, function (details) {
    return {
      'qualifications': _extends({}, details['qualifications'] || {}, {
        aLevels: aLevels,
        questionALevel: questionALevel,
        urlALevel: urlALevel
      })
    };
  });
}

function addUpdateQualificationsGCSEs(personId, gcses, questionGCSEs, urlGCSEs) {
  return changeDetailsFor(personId, function (details) {
    return {
      'qualifications': _extends({}, details['qualifications'] || {}, {
        gcses: gcses,
        questionGCSEs: questionGCSEs,
        urlGCSEs: urlGCSEs
      })
    };
  });
}

function addUpdateQualificationsOtherWhere(personId, othersWhere, questionOtherWhere, urlOtherWhere) {
  return changeDetailsFor(personId, function (details) {
    return {
      'qualifications': _extends({}, details['qualifications'] || {}, {
        othersWhere: othersWhere,
        questionOtherWhere: questionOtherWhere,
        urlOtherWhere: urlOtherWhere
      })
    };
  });
}

function addUpdateArmedForces(personId, val, question, url) {
  return changeDetailsFor(personId, function () {
    return {
      'armedForces': {
        val: val,
        question: question,
        url: url
      }
    };
  });
}

function addUpdateLastSevenDays(personId, sevenDaysAgo, question, url) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        sevenDaysAgo: sevenDaysAgo,
        question: question,
        url: url
      })
    };
  });
}

function addUpdateLastSevenDaysDescription(personId, description, questionSevenDaysDescription, urlSevenDaysDescription) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        description: description,
        questionSevenDaysDescription: questionSevenDaysDescription,
        urlSevenDaysDescription: urlSevenDaysDescription
      })
    };
  });
}

function addUpdateEmploymentFourWeeks(personId, fourWeeksAgo, questionFourWeeks, urlFourWeeks) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        fourWeeksAgo: fourWeeksAgo,
        questionFourWeeks: questionFourWeeks,
        urlFourWeeks: urlFourWeeks
      })
    };
  });
}

function addUpdateEmploymentAvailableTwoWeeks(personId, availableInTwoWeeks, questionAvailableTwoWeeks, urlAvailableTwoWeeks) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        availableInTwoWeeks: availableInTwoWeeks,
        questionAvailableTwoWeeks: questionAvailableTwoWeeks,
        urlAvailableTwoWeeks: urlAvailableTwoWeeks
      })
    };
  });
}

function addUpdateEmploymentPaidWorkConfirm(personId, paidWorkConfirm, questionPaidWorkConfirm, urlPaidWorkConfirm) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        paidWorkConfirm: paidWorkConfirm,
        questionPaidWorkConfirm: questionPaidWorkConfirm,
        urlPaidWorkConfirm: urlPaidWorkConfirm
      })
    };
  });
}

function addUpdateEmploymentAcceptedJob(personId, acceptedJob, questionAcceptedJob, urlAcceptedJob) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        acceptedJob: acceptedJob,
        questionAcceptedJob: questionAcceptedJob,
        urlAcceptedJob: urlAcceptedJob
      })
    };
  });
}

function addUpdateEmploymentStatus(personId, status, questionStatus, urlStatus) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        status: status,
        questionStatus: questionStatus,
        urlStatus: urlStatus
      })
    };
  });
}

function addUpdateEmploymentName(personId, name, questionName, urlName) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        name: name,
        questionName: questionName,
        urlName: urlName
      })
    };
  });
}

function addUpdateEmploymentJobTitle(personId, jobTitle, questionJobTitle, urlJobTitle) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        jobTitle: jobTitle,
        questionJobTitle: questionJobTitle,
        urlJobTitle: urlJobTitle
      })
    };
  });
}

function addUpdateEmploymentJobDescription(personId, jobDescription, questionJobDescription, urlJobDescription) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        jobDescription: jobDescription,
        questionJobDescription: questionJobDescription,
        urlJobDescription: urlJobDescription
      })
    };
  });
}

function addUpdateEmploymentBusinessActivity(personId, businessActivity, questionBusinessActivity, urlBusinessActivity) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        businessActivity: businessActivity,
        questionBusinessActivity: questionBusinessActivity,
        urlBusinessActivity: urlBusinessActivity
      })
    };
  });
}

function addUpdateEmploymentResponsibilities(personId, responsibilities, questionResponsibilities, urlResponsibilities) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        responsibilities: responsibilities,
        questionResponsibilities: questionResponsibilities,
        urlResponsibilities: urlResponsibilities
      })
    };
  });
}

function addUpdateEmploymentHoursWorked(personId, hours, questionHoursWorked, urlHoursWorked) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        hours: hours,
        questionHoursWorked: questionHoursWorked,
        urlHoursWorked: urlHoursWorked
      })
    };
  });
}

function addUpdateEmploymentTravel(personId, modeOfTravel, questionEmploymentTravel, urlEmploymentTravel) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        modeOfTravel: modeOfTravel,
        questionEmploymentTravel: questionEmploymentTravel,
        urlEmploymentTravel: urlEmploymentTravel
      })
    };
  });
}

function addUpdateEmploymentMainlyWork(personId, mainlyWork, questionMainlyWork, urlMainlyWork) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        mainlyWork: mainlyWork,
        questionMainlyWork: questionMainlyWork,
        urlMainlyWork: urlMainlyWork
      })
    };
  });
}

function addUpdateEmploymentWorkUK(personId, workUK, questionWorkUK, urlWorkUK) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        workUK: workUK,
        questionWorkUK: questionWorkUK,
        urlWorkUK: urlWorkUK
      })
    };
  });
}

function addUpdateEmploymentOutsideUK(personId, workOutsideUK, questionWorkOutsideUK, urlWorkOutsideUK) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        workOutsideUK: workOutsideUK,
        questionWorkOutsideUK: questionWorkOutsideUK,
        urlWorkOutsideUK: urlWorkOutsideUK
      })
    };
  });
}

function addUpdateEmploymentWorkplaceAddress(personId, workAddress, questionWorkplaceAddress, urlWorkplaceAddress) {
  return changeDetailsFor(personId, function (details) {
    return {
      'employment': _extends({}, details['employment'] || {}, {
        workAddress: workAddress,
        questionWorkplaceAddress: questionWorkplaceAddress,
        urlWorkplaceAddress: urlWorkplaceAddress
      })
    };
  });
}

function addUpdateVisitorComplete(personId, val) {
  return changeDetailsFor(personId, function () {
    return {
      'complete': {
        val: val
      }
    };
  });
}

function getPins() {
  return JSON.parse(sessionStorage.getItem(PERSONAL_PINS_KEY)) || {};
}

function createPinFor(personId) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var pins = getPins();

  pins[personId] = {
    pin: _.random(10000, 99999),
    exported: !!opts.exported
  };

  sessionStorage.setItem(PERSONAL_PINS_KEY, JSON.stringify(pins));

  return pins[personId];
}

function getPinFor(personId) {
  return getPins()[personId];
}

function unsetPinFor(personId) {
  var pins = getPins();

  delete pins[personId];

  sessionStorage.setItem(PERSONAL_PINS_KEY, JSON.stringify(pins));
}

function updatePersonalDetails(personId, details) {
  sessionStorage.setItem(PERSONAL_DETAILS_KEY, JSON.stringify(_extends({}, getAllPersonalDetails(), defineProperty({}, personId, details))));

  return details;
}

function getAllPersonalDetails() {
  return JSON.parse(sessionStorage.getItem(PERSONAL_DETAILS_KEY)) || {};
}

function getPersonalDetailsFor(personId) {
  var storageObj = getAllPersonalDetails(),
      personObj = storageObj[personId];

  if (!personObj) {
    console.log('Personal details for ' + personId + ' not found');
  }

  return personObj;
}

function removePersonalDetailsFor(personId) {
  var storageObj = getAllPersonalDetails();

  delete storageObj[personId];

  sessionStorage.setItem(PERSONAL_DETAILS_KEY, JSON.stringify(storageObj));
}

function personalBookmark(personId, page) {
  return changeDetailsFor(personId, function () {
    return {
      '_bookmark': {
        page: page
      }
    };
  });
}

function getBookmarkFor(personId) {
  return getPersonalDetailsFor(personId)['_bookmark'].page;
}

function personalQuestionSubmitDecorator(personId, callback, e) {
  var urlParams = new URLSearchParams(window.location.search),
      isEditing = urlParams.get('edit');

  !isEditing ? personalBookmark(personId, window.location.href) : clearPersonalBookmark(personId);

  callback(e);
}

function clearPersonalBookmark(personId) {
  var details = getPersonalDetailsFor(personId);

  delete details._bookmark;

  updatePersonalDetails(personId, _extends({}, details));

  return details;
}

function setProxy(personId, proxy) {
  return changeDetailsFor(personId, function () {
    return {
      proxy: proxy
    };
  });
}

function getProxyFor(personId) {
  if (getPersonalDetailsFor(personId)) {
    return getPersonalDetailsFor(personId)['proxy'];
  }
}

function clearProxy(personId) {
  var details = getPersonalDetailsFor(personId);

  delete details.proxy;

  updatePersonalDetails(personId, _extends({}, details));

  return details;
}

/**
 * Copied from:
 * https://codereview.stackexchange.com/questions/90349/changing-number-to-words-in-javascript
 * ===============
 */
var ONE_TO_NINETEEN = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

var TENS = ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

var SCALES = ['thousand', 'million', 'billion', 'trillion'];

// helper function for use with Array.filter
function isTruthy(item) {
  return !!item;
}

// convert a number into 'chunks' of 0-999
function chunk(number) {
  var thousands = [];

  while (number > 0) {
    thousands.push(number % 1000);
    number = Math.floor(number / 1000);
  }

  return thousands;
}

// translate a number from 1-999 into English
function inEnglish(number) {
  var thousands,
      hundreds,
      tens,
      ones,
      words = [];

  if (number < 20) {
    return ONE_TO_NINETEEN[number - 1]; // may be undefined
  }

  if (number < 100) {
    ones = number % 10;
    tens = number / 10 | 0; // equivalent to Math.floor(number / 10)

    words.push(TENS[tens - 1]);
    words.push(inEnglish(ones));

    return words.filter(isTruthy).join('-');
  }

  hundreds = number / 100 | 0;
  words.push(inEnglish(hundreds));
  words.push('hundred');
  words.push(inEnglish(number % 100));

  return words.filter(isTruthy).join(' ');
}

// append the word for a scale. Made for use with Array.map
function appendScale(chunk, exp) {
  var scale;
  if (!chunk) {
    return null;
  }
  scale = SCALES[exp - 1];
  return [chunk, scale].filter(isTruthy).join(' ');
}

/**
 * ===============
 * End copy
 */

/**
 * Modification - decorator
 */
var NUMBER_TO_POSITION_TEXT_MAP = {
  'one': '1st',
  'two': '2nd',
  'three': '3rd',
  'four': '4th',
  'five': '5th',
  'six': '6th',
  'seven': '7th',
  'eight': '8th',
  'nine': '9th',
  'ten': '10th',
  'eleven': '11th',
  'twelve': '12th',
  'thirteen': '13th',
  'fourteen': '14th',
  'fifteen': '15th',
  'sixteen': '16th',
  'seventeen': '17th',
  'eighteen': '18th',
  'nineteen': '19th',

  'twenty': '20th',
  'thirty': '30th',
  'forty': '40th',
  'fifty': '50th',
  'sixty': '60th',
  'seventy': '70th',
  'eighty': '80th',
  'ninety': '90th',
  'hundred': '100th',

  'thousand': 'thousandth',
  'million': 'millionth',
  'billion': 'billionth',
  'trillion': 'trillionth'
};

function numberToPositionWord(num) {
  var str = chunk(num).map(inEnglish).map(appendScale).filter(isTruthy).reverse().join(' ');

  var sub = str.split(' '),
      lastWordDashSplitArr = sub[sub.length - 1].split('-'),
      lastWord = lastWordDashSplitArr[lastWordDashSplitArr.length - 1],
      newLastWord = (lastWordDashSplitArr.length > 1 ? lastWordDashSplitArr[0] + '-' : '') + NUMBER_TO_POSITION_TEXT_MAP[lastWord];

  /*console.log('str:', str);
  console.log('sub:', sub);
  console.log('lastWordDashSplitArr:', lastWordDashSplitArr);
  console.log('lastWord:', lastWord);
  console.log('newLastWord:', newLastWord);*/

  var subCopy = [].concat(sub);
  subCopy.pop();
  var prefix = subCopy.join(' ');
  var result = (prefix ? prefix + ' ' : '') + newLastWord;

  // console.log('result', (prefix ? prefix + ' ' : '') + newLastWord);
  return result;
}

function precedingOrdinalWord(number) {
  if (number === (8 || 11 || 18)) {
    return 'an';
  } else {
    return 'a';
  }
}

function numberToWordsStyleguide(number) {
  if (number > 9) {
    return number;
  }

  return ONE_TO_NINETEEN[number - 1];
}

function tools() {

  var $listLinks = $('.test-data-links'),
      $clearData = $('<li><a href="#" class=\'mock-data-family\'>' + 'Clear all data</a></li>'),
      $createFamilyHousehold = $('<li><a href="#" class=\'mock-data-family\'>' + 'Create family household</a></li>'),
      $createFamilyRelationships = $('<li><a href="#"' + ' class=\'mock-data-family\'>' + 'Create family with relationships</a></li>'),
      $createFamilyWithRelationshipsAndVisitors = $('<li><a href="#"' + ' class=\'mock-data-family\'>' + 'Create family with relationships and visitors</a></li>'),
      $createFamilyWithRelationshipsPersonalDetailsAndVisitors = $('<li><a' + ' href="#"' + ' class=\'mock-data-family\'>' + 'Create family with relationships, just family individual responses and' + ' visitors</a></li>'),
      $createFamilyWithRelationshipsPersonalDetailsAndVisitorsPersonalDetails = $('<li><a' + ' href="#"' + ' class=\'mock-data-family\'>' + 'Create family with relationships, family individual responses and' + ' visitors individual responses</a></li>'),
      familyHouseholdMembersData = [{
    'type': 'household-member',
    '@person': {
      'fullName': 'Dave  Jones',
      'firstName': 'Dave',
      'middleName': '',
      'lastName': 'Jones',
      'id': 'person_me'
    }
  }, {
    'type': 'household-member',
    '@person': {
      'fullName': 'Sally  Jones',
      'firstName': 'Sally',
      'middleName': '',
      'lastName': 'Jones',
      'id': 'person1'
    }
  }, {
    'type': 'household-member',
    '@person': {
      'fullName': 'Rebecca  Jones',
      'firstName': 'Rebecca',
      'middleName': '',
      'lastName': 'Jones',
      'id': 'person2'
    }
  }, {
    'type': 'household-member',
    '@person': {
      'fullName': 'Amy Jones',
      'firstName': 'Amy',
      'middleName': '',
      'lastName': 'Jones',
      'id': 'person3'
    }
  }],
      visitorsMemberData = [{
    'type': 'visitor',
    '@person': {
      'fullName': 'Gareth Johnson',
      'firstName': 'Gareth',
      'middleName': '',
      'lastName': 'Johnson',
      'id': 'person4'
    }
  }, {
    'type': 'visitor',
    '@person': {
      'fullName': 'John Hamilton',
      'firstName': 'John',
      'middleName': '',
      'lastName': 'Hamilton',
      'id': 'person5'
    }
  }],
      familyHouseholdRelationshipsData = [{
    'personIsDescription': 'husband-wife',
    'personIsId': 'person1',
    'personToId': 'person_me',
    'inferred': false,
    'id': 1
  }, {
    'personIsDescription': 'son-daughter',
    'personIsId': 'person2',
    'personToId': 'person_me',
    'inferred': false,
    'id': 2
  }, {
    'personIsDescription': 'mother-father',
    'personIsId': 'person_me',
    'personToId': 'person3',
    'inferred': false,
    'id': 3
  }, {
    'personIsDescription': 'son-daughter',
    'personIsId': 'person2',
    'personToId': 'person1',
    'inferred': false,
    'id': 4
  }, {
    'personIsDescription': 'mother-father',
    'personIsId': 'person1',
    'personToId': 'person3',
    'inferred': false,
    'id': 5
  }, {
    'personIsDescription': 'brother-sister',
    'personIsId': 'person3',
    'personToId': 'person2',
    'inferred': true,
    'inferredBy': [3, 5, 2, 4],
    'id': 6
  }],
      familyPersonalDetails = {
    'person_me': {
      'dob': {
        'day': '17',
        'month': '4',
        'year': '1967'
      },
      'maritalStatus': 'married',
      'country': 'wales',
      'orientation': 'straight',
      'salary': '40000'
    },
    'person1': {
      'dob': { 'day': '02', 'month': '10', 'year': '1965' },
      'maritalStatus': 'married',
      'country': 'wales',
      'orientation': 'straight',
      'salary': '40000'
    },
    'person2': {
      'dob': { 'day': '20', 'month': '5', 'year': '1981' },
      'maritalStatus': 'never',
      'country': 'wales',
      'orientation': 'straight',
      'salary': '20000'
    },
    'person3': {
      'dob': { 'day': '11', 'month': '7', 'year': '1984' },
      'maritalStatus': 'never',
      'country': 'wales',
      'orientation': 'straight',
      'salary': '20000'
    }
  },
      visitorsPersonalDetails = {
    'person4': {
      'sex': 'male',
      'dob': { 'day': '20', 'month': '7', 'year': '1990' },
      'address-where': 'in-uk',
      'address': {
        'address-line-1': '15',
        'address-line-2': 'Somewhere near',
        'town-city': 'Llandridnod',
        'county': 'Powys',
        'postcode': 'LL34 AN5'
      }
    },
    'person5': {
      'sex': 'male',
      'dob': { 'day': '02', 'month': '5', 'year': '1991' },
      'address-where': 'out-uk',
      'address': {
        'address-line-1': '94',
        'address-line-2': 'Somewhere Far',
        'town-city': 'Springfield',
        'county': 'New York',
        'postcode': 'NY10A'
      }
    }
  },
      userData = {
    'fullName': 'Dave  Jones',
    'firstName': 'Dave',
    'middleName': '',
    'lastName': 'Jones'
  };

  $createFamilyHousehold.on('click', function (e) {
    e.preventDefault();
    clearStorage();
    prerequisites();
    createFamilyHousehold();
    window.location.href = '../summary';
  });

  $createFamilyRelationships.on('click', function (e) {
    e.preventDefault();
    clearStorage();
    prerequisites();
    createFamilyHousehold();
    createFamilyRelationships();
    window.location.href = '../hub';
  });

  $createFamilyWithRelationshipsAndVisitors.on('click', function (e) {
    e.preventDefault();
    clearStorage();
    prerequisites();
    createFamilyHouseholdWithVisitors();
    createFamilyRelationships();
    window.location.href = '../hub';
  });

  $createFamilyWithRelationshipsPersonalDetailsAndVisitors.on('click', function (e) {
    e.preventDefault();
    clearStorage();
    prerequisites();
    createFamilyHouseholdWithVisitors();
    createFamilyRelationships();
    createFamilyPersonalDetails();
    window.location.href = '../hub';
  });

  $createFamilyWithRelationshipsPersonalDetailsAndVisitorsPersonalDetails.on('click', function (e) {
    e.preventDefault();
    clearStorage();
    prerequisites();
    createFamilyHouseholdWithVisitors();
    createFamilyRelationships();
    createFamilyVisitorsPersonalDetails();
    window.location.href = '../hub';
  });

  $clearData.on('click', function (e) {
    e.preventDefault();
    clearStorage();
    window.location.href = '../test-address';
  });

  function prerequisites() {
    sessionStorage.setItem('address', '12 Somewhere Close, Newport, CF12 3AB');
    sessionStorage.setItem('address-line-1', '12');
    sessionStorage.setItem('address-line-2', 'Somewhere close');
    sessionStorage.setItem('county', 'Newport');
    sessionStorage.setItem('lives-here', 'yes');
    sessionStorage.setItem('postcode', 'CF12 3AB');
    sessionStorage.setItem('town-city', 'Newport');
  }

  function createFamilyHousehold() {
    sessionStorage.setItem('user-details', JSON.stringify(userData));
    sessionStorage.setItem(window.ONS.storage.KEYS.HOUSEHOLD_MEMBERS_STORAGE_KEY, JSON.stringify(familyHouseholdMembersData));
    sessionStorage.setItem('household-members-increment', JSON.stringify(4));
  }

  function createFamilyHouseholdWithVisitors() {
    sessionStorage.setItem(window.ONS.storage.KEYS.HOUSEHOLD_MEMBERS_STORAGE_KEY, JSON.stringify([].concat(familyHouseholdMembersData, visitorsMemberData)));
  }

  function createFamilyRelationships() {
    sessionStorage.setItem(window.ONS.storage.KEYS.RELATIONSHIPS_STORAGE_KEY, JSON.stringify(familyHouseholdRelationshipsData));
    sessionStorage.setItem('relationships-increment', JSON.stringify(6));
  }

  function createFamilyPersonalDetails() {
    sessionStorage.setItem(window.ONS.storage.KEYS.PERSONAL_DETAILS_KEY, JSON.stringify(familyPersonalDetails));
  }

  function createFamilyVisitorsPersonalDetails() {
    sessionStorage.setItem(window.ONS.storage.KEYS.PERSONAL_DETAILS_KEY, JSON.stringify(_extends({}, familyPersonalDetails, visitorsPersonalDetails)));
  }

  function clearStorage() {
    sessionStorage.clear();
  }

  $listLinks.append($clearData);
}

/**
 * Libraries
 */
/**
 * DOM modules
 */
var USER_STORAGE_KEY = 'user-details';
var INDIVIDUAL_PROXY_STORAGE_KEY = 'proxy-person';

function getAddress() {
    var addressLines = sessionStorage.getItem('address').split(',');

    return {
        addressLine1: addressLines[0],
        addressLine2: addressLines[1],
        addressTownCity: addressLines[2],
        addressPostcode: addressLines[3]
    };
}

function getPipedAddress() {
    var pipedAddress = "this accommodation";
    var addressLine1 = (sessionStorage.getItem('address-line-1') || '').replace(/,/g, '');
    var addressLine2 = (sessionStorage.getItem('address-line-2') || '').replace(/,/g, '');
    var addressTownCity = (sessionStorage.getItem('address-town') || '').replace(/,/g, '');
    var unitName = sessionStorage.getItem('unit-name') || '';

    if (addressLine2) {
        if (addressLine2.includes("near")) {
            pipedAddress = addressLine1 + ' ' + addressLine2;
        } else if (unitName) {
            pipedAddress = unitName + ', ' + addressLine1;
        } else {
            pipedAddress = addressLine1 + ', ' + addressLine2;
        }
    } else {
        pipedAddress = addressLine1 + ', ' + addressTownCity;
    }
    return pipedAddress;
}

/**
 * User
 */
function addUserPerson(person$$1) {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(person$$1));
}

function getUserPerson() {
    return JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY));
}

/**
 * Helpers
 */
function createNavItem(member) {
    var $nodeEl = $('<li class="js-template-nav-item nav__item pluto">' + '  <a class="js-template-nav-item-label nav__link" href="#"></a>' + '</li>'),
        $linkEl = $nodeEl.find('.js-template-nav-item-label');

    $linkEl.html(member['@person'].fullName);

    if (member['@person'].id === USER_HOUSEHOLD_MEMBER_ID) {
        $linkEl.attr('href', '../what-is-your-name');
    } else {
        $linkEl.attr('href', '../who-else-to-add?edit=' + member['@person'].id);
    }

    return $nodeEl;
}

function updateHouseholdVisitorsNavigationItems() {
    var allHouseholdMembers = window.ONS.storage.getAllHouseholdMembers(),
        householdMembers = allHouseholdMembers.filter(window.ONS.storage.isHouseholdMember),
        visitors = allHouseholdMembers.filter(window.ONS.storage.isVisitor);

    var $navigationHouseholdMembersEl = $('#navigation-household-members'),
        $navigationVisitorsEl = $('#navigation-visitors');

    if (householdMembers.length) {
        $.each(householdMembers, function (i, member) {
            $navigationHouseholdMembersEl.append(createNavItem(member));
        });
    } else {
        $navigationHouseholdMembersEl.parent().hide();
    }

    if (visitors.length) {
        $.each(visitors, function (i, member) {
            $navigationVisitorsEl.append(createNavItem(member));
        });
    } else {
        $navigationVisitorsEl.parent().hide();
    }
}

function createListItemPerson(member) {
    return $('<li class="list__item">').addClass('mars').html('<span class="list__item-name">' + member['@person'].fullName + (member['@person'].id === USER_HOUSEHOLD_MEMBER_ID ? ' (You)' : '') + '</span>');
}

function populateList($el, memberType) {
    if (!$el.length) {
        return;
    }

    var members = getAllHouseholdMembers() || [];

    $el.empty().append(members.filter(function (member) {
        return member.type === memberType;
    }).map(createListItemPerson));

    $el.addClass('list list--people-plain');
}

function populateHouseholdList() {
    populateList($('#household-members'), HOUSEHOLD_MEMBER_TYPE);
}

function populateVisitorList() {
    populateList($('#visitors-list'), VISITOR_TYPE);
}

function cleanHTMLPlaceholderStringReplacment(el, val) {
    var $el = $(el),
        $parent = $el.parent();

    $el.before(val);
    $el.remove();

    $parent.html($parent.html().replace(/[\s]+/g, ' ').trim());
}

function updateAddresses() {
    var addressLines = (sessionStorage.getItem('address') || '').split(','),
        addressLine1 = addressLines[0],
        addressLine2 = addressLines[1];

    $('.address-text').each(function (i, el) {
        return cleanHTMLPlaceholderStringReplacment(el, addressLine1 && addressLine2 ? addressLine1 + (addressLine2 ? ', ' + addressLine2 : '') : '<a href="../test-address">Address not found</a>');
    });

    $('.address-text-line1').each(function (i, el) {
        return cleanHTMLPlaceholderStringReplacment(el, addressLine1);
    });

    var personId = new URLSearchParams(window.location.search).get('person_id');

    if (personId) {
        var _person = getHouseholdMemberByPersonId(personId)['@person'],
            $sectionIndividualEl = $('#section-individual'),
            $nameEl = $('.js-person-fullname-from-url-id');

        $sectionIndividualEl.length && cleanHTMLPlaceholderStringReplacment($sectionIndividualEl, _person.fullName);
        $nameEl.length && cleanHTMLPlaceholderStringReplacment($nameEl, _person.fullName);
    }
}

var secureLinkTextMap = {
    'question-you': {
        description: 'Want to keep your answers secure from other people at this' + ' address?',
        linkText: 'Get a separate access code to submit an individual response',
        link: '../individual-decision-secure'
    },
    'pin-you': {
        description: 'You\'ve chosen to keep your answers secure',
        linkText: 'Cancel this and make answers available to the rest of the' + ' household',
        link: '../individual-decision-secure'
    },
    'question-proxy': {
        description: 'Not happy to continue answering for $[NAME]?',
        linkText: 'Request an individual access code to be sent to them',
        link: '../individual-decision-other-secure'
    }
};

function updateAllLinks() {
    $('.js-previous-link').attr('href', document.referrer);
}

function updatePersonLink() {
    var personId = new URLSearchParams(window.location.search).get('person_id');

    if (personId) {
        var urlParam = new URLSearchParams(window.location.search),
            _person2 = getHouseholdMemberByPersonId(personId)['@person'],
            pinObj = getPinFor(personId),
            secureLinkTextConfig = secureLinkTextMap[getProxyFor(personId) ? 'question-proxy' : pinObj && pinObj.pin ? 'pin-you' : 'question-you'],
            linkHref = secureLinkTextConfig.link + '?person_id=' + personId + '&returnurl=' + window.location.pathname,
            surveyType = urlParam.get('survey');

        linkHref += surveyType ? '&survey=' + surveyType : '';

        var $secureLink = $('.js-link-secure');
        $secureLink.attr('href', linkHref);

        $secureLink.html(secureLinkTextConfig.linkText);
        $('.js-link-secure-label').html(secureLinkTextConfig.description.replace('$[NAME]', _person2.fullName));

        var personLink = $('.js-link-person');
        personLink.attr('href', personLink.attr('href') + '?person_id=' + personId + (surveyType ? '&survey=' + surveyType : ''));
    }
}

function doILiveHere() {
    return sessionStorage.getItem('lives-here') === 'yes';
}

function getSignificant(type) {
    if (type === 'withoutDay') {
        return '21 March 2021';
    } else {
        return 'Sunday 21 March 2021';
    }
}

function updateSignificantDate() {
    $('.js-significant-date').each(function (i, el) {
        return cleanHTMLPlaceholderStringReplacment(el, getSignificant());
    });
}

function updateSignificantDateWithoutDay() {
    $('.js-significant-date-without-day').each(function (i, el) {
        return cleanHTMLPlaceholderStringReplacment(el, getSignificant("withoutDay"));
    });
}

function personRecordTemplate() {
    return $('<li id="person-record-template" class="list__item">\n        <span class="list__item-name js-person-name"></span>\n        <div class="list__item-actions u-fr">\n            <span class="list__item-action">\n                <a class="js-record-edit" href="#">Change</a>\n                <span class="js-spacer">|</span>\n                <a class="js-record-remove" href="#">Remove</a>\n            </span>\n        </div>\n    </li>');
}

function createMemberItem(member) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { redirect: null },
        redirect = _ref.redirect;

    var noEdit = arguments[2];

    var $nodeEl = personRecordTemplate(),
        $editLink = $nodeEl.find('.js-record-edit'),
        $removeLink = $nodeEl.find('.js-record-remove'),
        $spacer = $nodeEl.find('.js-spacer'),
        urlParams = new URLSearchParams(window.location.search),
        personNameText = member['@person'].fullName,
        memberIsUser = isMemberUser(member),
        surveyType = urlParams.get('survey'),
        altPage = surveyType && surveyType === 'lms' ? surveyType + '/' : '',
        redirectTo = redirect ? '&redirect=' + encodeURIComponent(window.location.href) : '';

    if (noEdit) {
        $editLink.hide();
        $removeLink.hide();
        $spacer.hide();
    } else if (!noEdit && memberIsUser) {
        personNameText += ' (You)';
        $editLink.html('Change');
        $removeLink.hide();
        $spacer.hide();
    }

    $nodeEl.attr('id', '');
    $nodeEl.find('.js-person-name').html(personNameText);

    $editLink.attr('href', (memberIsUser ? '../' + altPage + 'what-is-your-name/?edit=true' : '../' + altPage + 'who-else-to-add/?edit=' + member['@person'].id + (isVisitor(member) ? '&journey=visitors' : '')) + redirectTo);

    $removeLink.attr('href', '../remove-household-member/?person_id=' + member['@person'].id + redirectTo);

    return $nodeEl;
}

function updateHouseholdSummary() {
    var members = getAllHouseholdMembers();

    $('.js-household-members-summary').each(function (i, el) {
        var $el = $(el);

        $.each([].concat(toConsumableArray(members.filter(isMemberUser)), toConsumableArray(members.filter(isOtherHouseholdMember))), function (i, member) {
            $el.append(createMemberItem(member, { redirect: $el.attr('data-redirect') }));
        });
    });
}

function updateVisitorsSummary() {
    var members = getAllHouseholdMembers();

    $('.js-visitors-summary').each(function (i, el) {
        var $el = $(el);

        $.each(members.filter(isVisitor), function (i, member) {
            $el.append(createMemberItem(member, { redirect: $el.attr('data-redirect') }));
        });
    });
}

function updateContinueNotice() {
    var urlParams = new URLSearchParams(window.location.search),
        isContinuing = urlParams.get('continuing'),
        personId = urlParams.get('person_id');

    if (!isContinuing) {
        return false;
    }
    var member = getHouseholdMemberByPersonId(personId);
    var link = '';
    if (member) {
        link = isVisitor(member) ? '../visitor-intro/?person_id=' + personId : '../individual-intro/?person_id=' + personId;
    } else if (sessionStorage.getItem("wlh_bookmark")) {
        link = '../confirm-address/';
    } else {
        link = '../household-accom-intro/';
    }

    var template = '<div class="panel panel--simple panel--info u-mb-s">\n      <div class="panel__body">\n          <strong>This is the last viewed question in this section</strong>\n          <p>\n              You can also <a href="' + link + '">go back to the start \n              of the section</a>\n          </p>\n      </div>\n  </div>';

    $('.js-heading').closest('.question').prepend(template);
}

function updateSaveAndCompleteLater() {
    $('.complete-later').on('click', function (e) {
        e.preventDefault();

        window.location.href = '../post-submission/?redirect=../hub';
    });
}

function updateFoortListCol() {
    $('.js-footer-list-col').append('<li><a href="../test-data"' + ' class="footer__link footer__link--inline ghost-link u-fr">Test' + ' data</a></li>');
}

function isMemberUser(member) {
    return member['@person'].id === window.ONS.storage.IDS.USER_HOUSEHOLD_MEMBER_ID;
}

function sessionBookmark() {
    var pieces = window.location.href.replace(window.location.pathname, '[delimeter]').split('[delimeter]');

    pieces.shift();

    if (window.location.pathname.match(/test-data/g)) {
        console.log('match');
        return;
    }

    sessionStorage.setItem('_session_bookmark', [].concat(window.location.pathname, pieces).join(''));
}

function fieldItemDisplayHack() {
    $('.field__item').after('<br />');
}

function validateInputs(testFails, selector, address) {
    var input = document.querySelector(selector),
        errorBox = document.querySelector('.js-error-box'),
        listItem = document.querySelector('.js-' + input.id),
        answer = input.closest('.question__answer'),
        field = input.closest('.fieldgroup') ? input.closest('.fieldgroup') : input.closest('.field'),
        fieldGroup = document.querySelector('.fieldgroup') ? true : false,
        errorMsg = input.getAttribute('data-error-msg');

    if (input.value === testFails || testFails === true) {
        window.scrollTo(0, 0);
        window.hasErrors = true;
        $('.js-feedback-link').removeClass('is-expanded');
        $('.js-feedback-body').hide();
        input.classList.add('input--error');
        if (!listItem.classList.contains('js-visible')) {
            errorBox.classList.remove('u-d-no');
            listItem.classList.remove('u-d-no');
            listItem.classList.add('js-visible');
            var inputErrorPanel = document.createElement('DIV'),
                inputErrorBody = document.createElement('DIV'),
                inputErrorP = document.createElement('P'),
                inputErrorStrong = document.createElement('STRONG');

            inputErrorPanel.className = 'panel panel--error panel--simple';
            inputErrorBody.className = 'panel__body';
            inputErrorP.className = 'panel__error';
            if (address) {
                var errors = Array.from(document.querySelectorAll('.js-visible')).length;
                inputErrorP.id = 'error-message-' + errors;
            } else {
                inputErrorP.id = 'error-message-' + input.id;
            }

            inputErrorStrong.innerText = errorMsg;
            inputErrorP.appendChild(inputErrorStrong);
            inputErrorBody.appendChild(inputErrorP);
            inputErrorBody.appendChild(field);
            inputErrorPanel.appendChild(inputErrorBody);
            answer.appendChild(inputErrorPanel);
        }
    } else if (!fieldGroup) {
        var errorPanel = input.closest('.panel');
        if (errorPanel) {
            listItem.classList.add('u-d-no'), listItem.classList.remove('js-visible');
            input.classList.remove('input--error');
            answer.appendChild(field);
            answer.removeChild(errorPanel);
        }
    } else {
        input.classList.remove('input--error');
    }
}

function calcErrors() {
    var errors = Array.from(document.querySelectorAll('.js-visible')).length,
        pipingDestinations = document.querySelectorAll('.js-piping');

    pipingDestinations.forEach(function (pipingDestination) {
        if (errors === 1) {
            pipingDestination.innerText = pipingDestination.innerText.replace('{x}', '').replace('{s}', '').replace('2', "1").replace('are', "is a").replace('problems', "problem").replace('1 ', "");
        } else if (errors > 1) {
            pipingDestination.innerText = pipingDestination.innerText.replace('{x}', '2').replace('is a', 'are').replace('{s}', 's').replace('1', "2").replace('are problem', "are 2 problems");
        }
    });
}

function storePageData(url, previousUrl) {
    var pageDataContents = JSON.parse(sessionStorage.getItem('pageData')) || {};
    sessionStorage.setItem('pageData', JSON.stringify(_extends({}, pageDataContents || {}, defineProperty({}, url, previousUrl))));
}

function toggleFeedback() {
    $('.js-feedback-link').on('click', function (e) {
        // If there's an inline feedback body, treat as a toggle.
        if ($('.js-feedback-body').length) {
            e.preventDefault();
            $(this).toggleClass('is-expanded');
            $('.js-feedback-body').slideToggle('300');
            return;
        }

        // Otherwise, allow navigation to standalone feedback page and include context.
        var href = $(this).attr('href') || '../feedback';
        var pathParts = (window.location.pathname || '').split('/').filter(Boolean);
        var previous = pathParts[pathParts.length - 1] || 'complete';
        var joiner = href.indexOf('?') === -1 ? '?' : '&';
        window.location.href = href + joiner + 'previous=' + encodeURIComponent(previous);
    });
}

function submitFeedback() {
    $('.feedback-btn-submit').on('click', function (e) {
        e.preventDefault();
        $('.feedback__title, .feedback__message, .js-collapsible-title').hide();
        $('.js-feedback-body').slideUp('100');
        $('html, body').animate({
            scrollTop: $(".feedback-block").offset().top - 18
        }, 300);
        $('.js-feedback-success').delay('500').slideDown('200').fadeIn('500').animate({ opacity: 1 }, 'slow');
    });
}

function showFeedbackContextualAnswer() {
    $('#census-questions').on('click', function (e) {
        $('.js-question-topic').slideDown('200').fadeIn('300');
    });
    $('#page-design, #general').on('click', function (e) {
        $('.js-question-topic').slideUp('200').fadeOut('200');
    });
}

function mobileNav() {
    var mobileNavBtn = document.getElementsByClassName('js-toggle-main');

    $(mobileNavBtn).click(function (e) {
        e.preventDefault();
        $(this).toggleClass('js-nav-show');
        $('#main-nav').toggle();
    });
}

window.ONS = window.ONS || {};
window.ONS.storage = {
    storePageData: storePageData,
    getAddress: getAddress,
    getPipedAddress: getPipedAddress,
    addHouseholdMember: addHouseholdMember,
    updateHouseholdMember: updateHouseholdMember,
    deleteHouseholdMember: deleteHouseholdMember,
    getAllHouseholdMembers: getAllHouseholdMembers,
    addUserPerson: addUserPerson,
    getUserPerson: getUserPerson,
    getUserAsHouseholdMember: getUserAsHouseholdMember,
    getHouseholdMemberByPersonId: getHouseholdMemberByPersonId,
    getMemberPersonId: getMemberPersonId,
    updateUserAsHouseholdMember: updateUserAsHouseholdMember,
    deleteUserAsHouseholdMember: deleteUserAsHouseholdMember,
    tempAwayQuestionSentenceMap: tempAwayQuestionSentenceMap,
    visitorQuestionSentenceMap: visitorQuestionSentenceMap,

    isVisitor: isVisitor,
    isOtherHouseholdMember: isOtherHouseholdMember,
    isHouseholdMember: isHouseholdMember,

    addRelationship: addRelationship,
    deleteRelationship: deleteRelationship,
    editRelationship: editRelationship,
    getAllRelationships: getAllRelationships,
    getAllManualRelationships: getAllManualRelationships,
    getNextPersonId: getNextPersonId,
    deleteAllRelationshipsForMember: deleteAllRelationshipsForMember,

    getAllParentsOf: getAllParentsOf,
    getAllChildrenOf: getAllChildrenOf,
    getParentIdFromRelationship: getParentIdFromRelationship,
    getChildIdFromRelationship: getChildIdFromRelationship,
    getOtherPersonIdFromRelationship: getOtherPersonIdFromRelationship,
    isAParentInRelationship: isAParentInRelationship,
    isAChildInRelationship: isAChildInRelationship,
    isInRelationship: isInRelationship,
    areAnyChildrenInRelationshipNotParent: areAnyChildrenInRelationshipNotParent,
    isRelationshipType: isRelationshipType,
    isRelationshipInferred: isRelationshipInferred,
    getRelationshipOf: getRelationshipOf,

    relationshipDescriptionMap: relationshipDescriptionMap,
    relationshipSummaryTemplates: relationshipSummaryTemplates,
    missingRelationshipInference: missingRelationshipInference,
    inferRelationships: inferRelationships,
    getRelationshipsWithPersonIds: getRelationshipsWithPersonIds,
    getPeopleIdsMissingRelationshipsWithPerson: getPeopleIdsMissingRelationshipsWithPerson,
    getRelationshipType: getRelationshipType,
    findNextMissingRelationship: findNextMissingRelationship,

    addUpdatePersonalDetailsDOB: addUpdatePersonalDetailsDOB,
    getPersonalDetailsFor: getPersonalDetailsFor,
    removePersonalDetailsFor: removePersonalDetailsFor,
    addUpdateMaritalStatus: addUpdateMaritalStatus,
    addUpdateMaritalStatusWho: addUpdateMaritalStatusWho,
    addUpdate30DayAddressType: addUpdate30DayAddressType,
    addUpdate30DayAddressUk: addUpdate30DayAddressUk,
    addUpdate30DayCountry: addUpdate30DayCountry,
    addUpdateSchool: addUpdateSchool,
    addUpdateStudent: addUpdateStudent,
    addUpdateStudentAddress: addUpdateStudentAddress,
    addUpdateStudentAddaddressInUK: addUpdateStudentAddaddressInUK,
    addUpdateStudentAddressUk: addUpdateStudentAddressUk,
    addUpdateStudentAddressCountry: addUpdateStudentAddressCountry,
    addUpdateCountry: addUpdateCountry,
    addUpdateCountryOther: addUpdateCountryOther,
    addUpdateCountryOtherArrive: addUpdateCountryOtherArrive,
    addUpdateCountryOtherArriveCensus: addUpdateCountryOtherArriveCensus,
    addUpdateCountryOtherStay: addUpdateCountryOtherStay,
    addUpdateYearAgoAddress: addUpdateYearAgoAddress,
    addUpdateYearAgoAddressUk: addUpdateYearAgoAddressUk,
    addUpdateYearAgoAddressCountry: addUpdateYearAgoAddressCountry,
    addUpdateNationalIdentity: addUpdateNationalIdentity,
    addUpdateNationalIdentityOther: addUpdateNationalIdentityOther,
    addUpdateEthnicGroup: addUpdateEthnicGroup,
    addUpdateEthnicGroupDescription: addUpdateEthnicGroupDescription,
    addUpdateEthnicGroupOther: addUpdateEthnicGroupOther,
    addUpdateReligion: addUpdateReligion,
    addUpdateReligionOther: addUpdateReligionOther,
    addUpdateLanguage: addUpdateLanguage,
    addUpdateLanguageOther: addUpdateLanguageOther,
    addUpdateLanguageEnglish: addUpdateLanguageEnglish,
    addUpdatePassportCountry: addUpdatePassportCountry,
    addUpdatePassportCountryOther: addUpdatePassportCountryOther,
    addUpdateHealth: addUpdateHealth,
    addUpdateHealthConditions: addUpdateHealthConditions,
    addUpdateHealthConditionsAbilities: addUpdateHealthConditionsAbilities,
    addUpdateHealthSupport: addUpdateHealthSupport,
    addUpdateOrientation: addUpdateOrientation,
    addUpdateIdentity: addUpdateIdentity,
    addUpdateSalary: addUpdateSalary,
    addUpdateSex: addUpdateSex,
    addUpdateAddressWhere: addUpdateAddressWhere,
    addUpdateAddressIndividual: addUpdateAddressIndividual,
    addUpdateAge: addUpdateAge,
    addUpdateAgeConfirm: addUpdateAgeConfirm,
    addUpdateAddressOutsideUK: addUpdateAddressOutsideUK,
    addUpdateApprenticeship: addUpdateApprenticeship,
    addUpdateHasQualificationAbove: addUpdateHasQualificationAbove,
    addUpdateQualificationsNvqEquivalent: addUpdateQualificationsNvqEquivalent,
    addUpdateQualificationsALevel: addUpdateQualificationsALevel,
    addUpdateQualificationsGCSEs: addUpdateQualificationsGCSEs,
    addUpdateQualificationsOtherWhere: addUpdateQualificationsOtherWhere,
    addUpdateArmedForces: addUpdateArmedForces,
    addUpdateLastSevenDays: addUpdateLastSevenDays,
    addUpdateLastSevenDaysDescription: addUpdateLastSevenDaysDescription,
    addUpdateEmploymentFourWeeks: addUpdateEmploymentFourWeeks,
    addUpdateEmploymentPaidWorkConfirm: addUpdateEmploymentPaidWorkConfirm,
    addUpdateEmploymentAcceptedJob: addUpdateEmploymentAcceptedJob,
    addUpdateEmploymentStatus: addUpdateEmploymentStatus,
    addUpdateEmploymentName: addUpdateEmploymentName,
    addUpdateEmploymentJobTitle: addUpdateEmploymentJobTitle,
    addUpdateEmploymentJobDescription: addUpdateEmploymentJobDescription,
    addUpdateEmploymentBusinessActivity: addUpdateEmploymentBusinessActivity,
    addUpdateEmploymentResponsibilities: addUpdateEmploymentResponsibilities,
    addUpdateEmploymentHoursWorked: addUpdateEmploymentHoursWorked,
    addUpdateEmploymentTravel: addUpdateEmploymentTravel,
    addUpdateEmploymentMainlyWork: addUpdateEmploymentMainlyWork,
    addUpdateEmploymentWorkUK: addUpdateEmploymentWorkUK,
    addUpdateEmploymentOutsideUK: addUpdateEmploymentOutsideUK,
    addUpdateEmploymentWorkplaceAddress: addUpdateEmploymentWorkplaceAddress,
    addUpdateEmploymentAvailableTwoWeeks: addUpdateEmploymentAvailableTwoWeeks,
    addUpdateVisitorComplete: addUpdateVisitorComplete,

    personalDetailsMaritalStatusMap: personalDetailsMaritalStatusMap,
    personalDetailsCountryMap: personalDetailsCountryMap,
    personalDetailsOrientationMap: personalDetailsOrientationMap,
    personalDetailsGenderMap: personalDetailsGenderMap,
    personalDetailsNationalIdentityMap: personalDetailsNationalIdentityMap,
    personalDetailsEthnicGroupMap: personalDetailsEthnicGroupMap,
    personalDetailsPassportCountriesMap: personalDetailsPassportCountriesMap,
    personalDetailsApprenticeshipMap: personalDetailsApprenticeshipMap,
    personalDetailsDegreeAboveMap: personalDetailsDegreeAboveMap,
    personalDetailsNVQMap: personalDetailsNVQMap,
    personalDetailsALevelMap: personalDetailsALevelMap,
    personalDetailsGCSEMap: personalDetailsGCSEMap,
    personalDetailsOtherWhere: personalDetailsOtherWhere,
    personalDetailsEmploymentStatus: personalDetailsEmploymentStatus,

    createPinFor: createPinFor,
    getPinFor: getPinFor,
    unsetPinFor: unsetPinFor,
    personalBookmark: personalBookmark,
    getBookmarkFor: getBookmarkFor,
    clearPersonalBookmark: clearPersonalBookmark,
    personalQuestionSubmitDecorator: personalQuestionSubmitDecorator,

    setProxy: setProxy,
    getProxyFor: getProxyFor,
    clearProxy: clearProxy,

    doILiveHere: doILiveHere,
    isMemberUser: isMemberUser,

    KEYS: {
        HOUSEHOLD_MEMBERS_STORAGE_KEY: HOUSEHOLD_MEMBERS_STORAGE_KEY,
        USER_STORAGE_KEY: USER_STORAGE_KEY,
        INDIVIDUAL_PROXY_STORAGE_KEY: INDIVIDUAL_PROXY_STORAGE_KEY,
        HOUSEHOLD_MEMBER_TYPE: HOUSEHOLD_MEMBER_TYPE,
        VISITOR_TYPE: VISITOR_TYPE,
        RELATIONSHIPS_STORAGE_KEY: RELATIONSHIPS_STORAGE_KEY,
        PERSONAL_DETAILS_KEY: PERSONAL_DETAILS_KEY
    },

    IDS: {
        USER_HOUSEHOLD_MEMBER_ID: USER_HOUSEHOLD_MEMBER_ID
    },

    TYPES: {
        person: person,
        relationship: relationship
    }
};

// Dummy address helper (used from footer link) — same data and confirm-rh-address navigation as warm
$(function () {
  $('.js-dummy-address').on('click', function (e) {
    e.preventDefault();

    sessionStorage.setItem('address-line-1', '68 Abingdon Road');
    sessionStorage.setItem('address-line-2', 'Goathill');
    sessionStorage.setItem('address-town', 'Chesterton');
    sessionStorage.setItem('address-postcode', 'CH13 1PD');
    sessionStorage.setItem('address-country', 'E');
    sessionStorage.setItem('address-type', 'HH');
    sessionStorage.setItem('address', '68 Abingdon Road, Goathill, Chesterton, CH13 1PD');

    var path = window.location.pathname || '';
    if (path.indexOf('uac-request-address') !== -1) {
      var currentJourney = new URLSearchParams(window.location.search).get('current-journey');
      window.location.href =
        '../confirm-rh-address/?previous=uac-request-address&current-journey=' + currentJourney;
      return;
    }

    var $rh = $('#rh-proto-address');
    if ($rh.length) {
      $rh.val(sessionStorage.getItem('address')).trigger('input');
    }
  });
});

window.ONS.helpers = {
    populateHouseholdList: populateHouseholdList,
    populateVisitorList: populateVisitorList
};

window.ONS.utils = {
    removeFromList: removeFromList,
    trailingNameS: trailingNameS,
    numberToPositionWord: numberToPositionWord,
    numberToWordsStyleguide: numberToWordsStyleguide,
    precedingOrdinalWord: precedingOrdinalWord,
    getSignificant: getSignificant,
    cleanHTMLPlaceholderStringReplacment: cleanHTMLPlaceholderStringReplacment,
    validateInputs: validateInputs,
    calcErrors: calcErrors
};

$(populateHouseholdList);
$(populateVisitorList);
$(updateHouseholdVisitorsNavigationItems);
$(updateAddresses);
$(updatePersonLink);
$(tools);
$(updateAllLinks);
$(updateSignificantDate);
$(updateSignificantDateWithoutDay);
$(updateHouseholdSummary);
$(updateVisitorsSummary);
$(updateContinueNotice);
$(updateSaveAndCompleteLater);
$(updateFoortListCol);
$(sessionBookmark);
$(fieldItemDisplayHack);
$(toggleFeedback);
$(submitFeedback);
$(showFeedbackContextualAnswer);
$(mobileNav);

exports.USER_STORAGE_KEY = USER_STORAGE_KEY;
exports.INDIVIDUAL_PROXY_STORAGE_KEY = INDIVIDUAL_PROXY_STORAGE_KEY;
exports.getAddress = getAddress;
exports.addUserPerson = addUserPerson;
exports.getUserPerson = getUserPerson;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"fuse.js":2}],2:[function(require,module,exports){
/*!
 * Fuse.js v3.6.1 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Fuse",[],t):"object"==typeof exports?exports.Fuse=t():e.Fuse=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=r(1),a=r(7),s=a.get,c=(a.deepValue,a.isArray),h=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,a=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.caseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.id,S=void 0===b?null:b,x=r.keys,M=void 0===x?[]:x,_=r.shouldSort,w=void 0===_||_,L=r.getFn,A=void 0===L?s:L,O=r.sortFn,C=void 0===O?function(e,t){return e.score-t.score}:O,j=r.tokenize,P=void 0!==j&&j,I=r.matchAllTokens,F=void 0!==I&&I,T=r.includeMatches,N=void 0!==T&&T,z=r.includeScore,E=void 0!==z&&z,W=r.verbose,K=void 0!==W&&W;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:a,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,minMatchCharLength:k,id:S,keys:M,includeMatches:N,includeScore:E,shouldSort:w,getFn:A,sortFn:C,verbose:K,tokenize:P,matchAllTokens:F},this.setCollection(t),this._processKeys(M)}var t,r,a;return t=e,(r=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"_processKeys",value:function(e){if(this._keyWeights={},this._keyNames=[],e.length&&"string"==typeof e[0])for(var t=0,r=e.length;t<r;t+=1){var n=e[t];this._keyWeights[n]=1,this._keyNames.push(n)}else{for(var o=null,i=null,a=0,s=0,c=e.length;s<c;s+=1){var h=e[s];if(!h.hasOwnProperty("name"))throw new Error('Missing "name" property in key object');var l=h.name;if(this._keyNames.push(l),!h.hasOwnProperty("weight"))throw new Error('Missing "weight" property in key object');var u=h.weight;if(u<0||u>1)throw new Error('"weight" property in key must bein the range of [0, 1)');i=null==i?u:Math.max(i,u),o=null==o?u:Math.min(o,u),this._keyWeights[l]=u,a+=u}if(a>1)throw new Error("Total of weights cannot exceed 1")}}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var r=this._prepareSearchers(e),n=r.tokenSearchers,o=r.fullSearcher,i=this._search(n,o);return this._computeScore(i),this.options.shouldSort&&this._sort(i),t.limit&&"number"==typeof t.limit&&(i=i.slice(0,t.limit)),this._format(i)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var r=e.split(this.options.tokenSeparator),n=0,o=r.length;n<o;n+=1)t.push(new i(r[n],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=this.list,n={},o=[];if("string"==typeof r[0]){for(var i=0,a=r.length;i<a;i+=1)this._analyze({key:"",value:r[i],record:i,index:i},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});return o}for(var s=0,c=r.length;s<c;s+=1)for(var h=r[s],l=0,u=this._keyNames.length;l<u;l+=1){var f=this._keyNames[l];this._analyze({key:f,value:this.options.getFn(h,f),record:h,index:s},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t})}return o}},{key:"_analyze",value:function(e,t){var r=this,n=e.key,o=e.arrayIndex,i=void 0===o?-1:o,a=e.value,s=e.record,h=e.index,l=t.tokenSearchers,u=void 0===l?[]:l,f=t.fullSearcher,v=t.resultMap,p=void 0===v?{}:v,d=t.results,g=void 0===d?[]:d;!function e(t,o,i,a){if(null!=o)if("string"==typeof o){var s=!1,h=-1,l=0;r._log("\nKey: ".concat(""===n?"--":n));var v=f.search(o);if(r._log('Full text: "'.concat(o,'", score: ').concat(v.score)),r.options.tokenize){for(var d=o.split(r.options.tokenSeparator),y=d.length,m=[],k=0,b=u.length;k<b;k+=1){var S=u[k];r._log('\nPattern: "'.concat(S.pattern,'"'));for(var x=!1,M=0;M<y;M+=1){var _=d[M],w=S.search(_),L={};w.isMatch?(L[_]=w.score,s=!0,x=!0,m.push(w.score)):(L[_]=1,r.options.matchAllTokens||m.push(1)),r._log('Token: "'.concat(_,'", score: ').concat(L[_]))}x&&(l+=1)}h=m[0];for(var A=m.length,O=1;O<A;O+=1)h+=m[O];h/=A,r._log("Token score average:",h)}var C=v.score;h>-1&&(C=(C+h)/2),r._log("Score average:",C);var j=!r.options.tokenize||!r.options.matchAllTokens||l>=u.length;if(r._log("\nCheck Matches: ".concat(j)),(s||v.isMatch)&&j){var P={key:n,arrayIndex:t,value:o,score:C};r.options.includeMatches&&(P.matchedIndices=v.matchedIndices);var I=p[a];I?I.output.push(P):(p[a]={item:i,output:[P]},g.push(p[a]))}}else if(c(o))for(var F=0,T=o.length;F<T;F+=1)e(F,o[F],i,a)}(i,a,s,h)}},{key:"_computeScore",value:function(e){this._log("\n\nComputing score:\n");for(var t=this._keyWeights,r=!!Object.keys(t).length,n=0,o=e.length;n<o;n+=1){for(var i=e[n],a=i.output,s=a.length,c=1,h=0;h<s;h+=1){var l=a[h],u=l.key,f=r?t[u]:1,v=0===l.score&&t&&t[u]>0?Number.EPSILON:l.score;c*=Math.pow(v,f)}i.score=c,this._log(i)}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var r=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===n(t)&&null!==t){if(-1!==r.indexOf(t))return;r.push(t)}return t},2)),r=null}var o=[];this.options.includeMatches&&o.push(function(e,t){var r=e.output;t.matches=[];for(var n=0,o=r.length;n<o;n+=1){var i=r[n];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c)}else t.push(s.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&o(t.prototype,r),a&&o(t,a),e}();e.exports=h},function(e,t,r){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=r(2),i=r(3),a=r(6),s=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,s=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.isCaseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.includeMatches,S=void 0!==b&&b;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,includeMatches:S,minMatchCharLength:k},this.pattern=v?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern))}var t,r,s;return t=e,(r=[{key:"search",value:function(e){var t=this.options,r=t.isCaseSensitive,n=t.includeMatches;if(r||(e=e.toLowerCase()),this.pattern===e){var a={isMatch:!0,score:0};return n&&(a.matchedIndices=[[0,e.length-1]]),a}var s=this.options,c=s.maxPatternLength,h=s.tokenSeparator;if(this.pattern.length>c)return o(e,this.pattern,h);var l=this.options,u=l.location,f=l.distance,v=l.threshold,p=l.findAllMatches,d=l.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:u,distance:f,threshold:v,findAllMatches:p,minMatchCharLength:d,includeMatches:n})}}])&&n(t.prototype,r),s&&n(t,s),e}();e.exports=s},function(e,t){var r=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(r,"\\$&").replace(n,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1])}return{score:a?.5:1,isMatch:a,matchedIndices:s}}},function(e,t,r){var n=r(4),o=r(5);e.exports=function(e,t,r,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,v=void 0!==f&&f,p=i.minMatchCharLength,d=void 0===p?1:p,g=i.includeMatches,y=void 0!==g&&g,m=s,k=e.length,b=u,S=e.indexOf(t,m),x=t.length,M=[],_=0;_<k;_+=1)M[_]=0;if(-1!==S){var w=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});if(b=Math.min(w,b),-1!==(S=e.lastIndexOf(t,m+x))){var L=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});b=Math.min(L,b)}}S=-1;for(var A=[],O=1,C=x+k,j=1<<(x<=31?x-1:30),P=0;P<x;P+=1){for(var I=0,F=C;I<F;){n(t,{errors:P,currentLocation:m+F,expectedLocation:m,distance:h})<=b?I=F:C=F,F=Math.floor((C-I)/2+I)}C=F;var T=Math.max(1,m-F+1),N=v?k:Math.min(m+F,k)+x,z=Array(N+2);z[N+1]=(1<<P)-1;for(var E=N;E>=T;E-=1){var W=E-1,K=r[e.charAt(W)];if(K&&(M[W]=1),z[E]=(z[E+1]<<1|1)&K,0!==P&&(z[E]|=(A[E+1]|A[E])<<1|1|A[E+1]),z[E]&j&&(O=n(t,{errors:P,currentLocation:W,expectedLocation:m,distance:h}))<=b){if(b=O,(S=W)<=m)break;T=Math.max(1,2*m-S)}}if(n(t,{errors:P+1,currentLocation:m,expectedLocation:m,distance:h})>b)break;A=z}var $={isMatch:S>=0,score:0===O?.001:O};return y&&($.matchedIndices=o(M,d)),$}},function(e,t){e.exports=function(e,t){var r=t.errors,n=void 0===r?0:r,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=n/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l}},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=[],n=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===n?n=i:s||-1===n||((o=i-1)-n+1>=t&&r.push([n,o]),n=-1)}return e[i-1]&&i-n>=t&&r.push([n,i-1]),r}},function(e,t){e.exports=function(e){for(var t={},r=e.length,n=0;n<r;n+=1)t[e.charAt(n)]=0;for(var o=0;o<r;o+=1)t[e.charAt(o)]|=1<<r-o-1;return t}},function(e,t){var r=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)},n=function(e){return null==e?"":function(e){if("string"==typeof e)return e;var t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)},o=function(e){return"string"==typeof e},i=function(e){return"number"==typeof e};e.exports={get:function(e,t){var a=[];return function e(t,s){if(s){var c=s.indexOf("."),h=s,l=null;-1!==c&&(h=s.slice(0,c),l=s.slice(c+1));var u=t[h];if(null!=u)if(l||!o(u)&&!i(u))if(r(u))for(var f=0,v=u.length;f<v;f+=1)e(u[f],l);else l&&e(u,l);else a.push(n(u))}else a.push(t)}(e,t),a},isArray:r,isString:o,isNum:i,toString:n}}])});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfcHJvdG90eXBlcy9lbmQtdG8tZW5kL2J1bmRsZS5qcyIsIm5vZGVfbW9kdWxlcy9mdXNlLmpzL2Rpc3QvZnVzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4eVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cblxuXG5cblxuXG5cblxuXG52YXIgYXN5bmNUb0dlbmVyYXRvciA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzdGVwKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RlcChcIm5leHRcIik7XG4gICAgfSk7XG4gIH07XG59O1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cblxuXG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIHRvQ29uc3VtYWJsZUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFycik7XG4gIH1cbn07XG5cbi8qXG4qIEZpbGVTYXZlci5qc1xuKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cbipcbiogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuKlxuKiBMaWNlbnNlIDogaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWQgKE1JVClcbiogc291cmNlICA6IGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanNcbiovXG5cbi8vIFRoZSBvbmUgYW5kIG9ubHkgd2F5IG9mIGdldHRpbmcgZ2xvYmFsIHNjb3BlIGluIGFsbCBlbnZpcm9ubWVudHNcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8zMjc3MTgyLzEwMDg5OTlcbnZhciBfZ2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHdpbmRvdykpID09PSAnb2JqZWN0JyAmJiB3aW5kb3cud2luZG93ID09PSB3aW5kb3cgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHNlbGYpKSA9PT0gJ29iamVjdCcgJiYgc2VsZi5zZWxmID09PSBzZWxmID8gc2VsZiA6ICh0eXBlb2YgZ2xvYmFsID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihnbG9iYWwpKSA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsLmdsb2JhbCA9PT0gZ2xvYmFsID8gZ2xvYmFsIDogdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBib20oYmxvYiwgb3B0cykge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICd1bmRlZmluZWQnKSBvcHRzID0geyBhdXRvQm9tOiBmYWxzZSB9O2Vsc2UgaWYgKCh0eXBlb2Ygb3B0cyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob3B0cykpICE9PSAnb2JqZWN0Jykge1xuICAgIGNvbnNvbGUud2FybignRGVwcmVjYXRlZDogRXhwZWN0ZWQgdGhpcmQgYXJndW1lbnQgdG8gYmUgYSBvYmplY3QnKTtcbiAgICBvcHRzID0geyBhdXRvQm9tOiAhb3B0cyB9O1xuICB9XG5cbiAgLy8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcbiAgLy8gbm90ZTogeW91ciBicm93c2VyIHdpbGwgYXV0b21hdGljYWxseSBjb252ZXJ0IFVURi0xNiBVK0ZFRkYgdG8gRUYgQkIgQkZcbiAgaWYgKG9wdHMuYXV0b0JvbSAmJiAvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChibG9iLnR5cGUpKSB7XG4gICAgcmV0dXJuIG5ldyBCbG9iKFtTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkVGRiksIGJsb2JdLCB7IHR5cGU6IGJsb2IudHlwZSB9KTtcbiAgfVxuICByZXR1cm4gYmxvYjtcbn1cblxuZnVuY3Rpb24gZG93bmxvYWQodXJsLCBuYW1lLCBvcHRzKSB7XG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2F2ZUFzKHhoci5yZXNwb25zZSwgbmFtZSwgb3B0cyk7XG4gIH07XG4gIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2NvdWxkIG5vdCBkb3dubG9hZCBmaWxlJyk7XG4gIH07XG4gIHhoci5zZW5kKCk7XG59XG5cbmZ1bmN0aW9uIGNvcnNFbmFibGVkKHVybCkge1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIC8vIHVzZSBzeW5jIHRvIGF2b2lkIHBvcHVwIGJsb2NrZXJcbiAgeGhyLm9wZW4oJ0hFQUQnLCB1cmwsIGZhbHNlKTtcbiAgeGhyLnNlbmQoKTtcbiAgcmV0dXJuIHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPD0gMjk5O1xufVxuXG4vLyBgYS5jbGljaygpYCBkb2Vzbid0IHdvcmsgZm9yIGFsbCBicm93c2VycyAoIzQ2NSlcbmZ1bmN0aW9uIGNsaWNrKG5vZGUpIHtcbiAgdHJ5IHtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuICAgIGV2dC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIDAsIDAsIDgwLCAyMCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbnZhciBzYXZlQXMgPSBfZ2xvYmFsLnNhdmVBcyB8fCAoXG4vLyBwcm9iYWJseSBpbiBzb21lIHdlYiB3b3JrZXJcbih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih3aW5kb3cpKSAhPT0gJ29iamVjdCcgfHwgd2luZG93ICE9PSBfZ2xvYmFsID8gZnVuY3Rpb24gc2F2ZUFzKCkge30gLyogbm9vcCAqL1xuXG5cbi8vIFVzZSBkb3dubG9hZCBhdHRyaWJ1dGUgZmlyc3QgaWYgcG9zc2libGUgKCMxOTMgTHVtaWEgbW9iaWxlKVxuOiAnZG93bmxvYWQnIGluIEhUTUxBbmNob3JFbGVtZW50LnByb3RvdHlwZSA/IGZ1bmN0aW9uIHNhdmVBcyhibG9iLCBuYW1lLCBvcHRzKSB7XG4gIHZhciBVUkwgPSBfZ2xvYmFsLlVSTCB8fCBfZ2xvYmFsLndlYmtpdFVSTDtcbiAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIG5hbWUgPSBuYW1lIHx8IGJsb2IubmFtZSB8fCAnZG93bmxvYWQnO1xuXG4gIGEuZG93bmxvYWQgPSBuYW1lO1xuICBhLnJlbCA9ICdub29wZW5lcic7IC8vIHRhYm5hYmJpbmdcblxuICAvLyBUT0RPOiBkZXRlY3QgY2hyb21lIGV4dGVuc2lvbnMgJiBwYWNrYWdlZCBhcHBzXG4gIC8vIGEudGFyZ2V0ID0gJ19ibGFuaydcblxuICBpZiAodHlwZW9mIGJsb2IgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gU3VwcG9ydCByZWd1bGFyIGxpbmtzXG4gICAgYS5ocmVmID0gYmxvYjtcbiAgICBpZiAoYS5vcmlnaW4gIT09IGxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgY29yc0VuYWJsZWQoYS5ocmVmKSA/IGRvd25sb2FkKGJsb2IsIG5hbWUsIG9wdHMpIDogY2xpY2soYSwgYS50YXJnZXQgPSAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsaWNrKGEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBTdXBwb3J0IGJsb2JzXG4gICAgYS5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYS5ocmVmKTtcbiAgICB9LCA0RTQpOyAvLyA0MHNcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNsaWNrKGEpO1xuICAgIH0sIDApO1xuICB9XG59XG5cbi8vIFVzZSBtc1NhdmVPck9wZW5CbG9iIGFzIGEgc2Vjb25kIGFwcHJvYWNoXG46ICdtc1NhdmVPck9wZW5CbG9iJyBpbiBuYXZpZ2F0b3IgPyBmdW5jdGlvbiBzYXZlQXMoYmxvYiwgbmFtZSwgb3B0cykge1xuICBuYW1lID0gbmFtZSB8fCBibG9iLm5hbWUgfHwgJ2Rvd25sb2FkJztcblxuICBpZiAodHlwZW9mIGJsb2IgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGNvcnNFbmFibGVkKGJsb2IpKSB7XG4gICAgICBkb3dubG9hZChibG9iLCBuYW1lLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmhyZWYgPSBibG9iO1xuICAgICAgYS50YXJnZXQgPSAnX2JsYW5rJztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGljayhhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihib20oYmxvYiwgb3B0cyksIG5hbWUpO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIHRvIHVzaW5nIEZpbGVSZWFkZXIgYW5kIGEgcG9wdXBcbjogZnVuY3Rpb24gc2F2ZUFzKGJsb2IsIG5hbWUsIG9wdHMsIHBvcHVwKSB7XG4gIC8vIE9wZW4gYSBwb3B1cCBpbW1lZGlhdGVseSBkbyBnbyBhcm91bmQgcG9wdXAgYmxvY2tlclxuICAvLyBNb3N0bHkgb25seSBhdmFpbGFibGUgb24gdXNlciBpbnRlcmFjdGlvbiBhbmQgdGhlIGZpbGVSZWFkZXIgaXMgYXN5bmMgc28uLi5cbiAgcG9wdXAgPSBwb3B1cCB8fCBvcGVuKCcnLCAnX2JsYW5rJyk7XG4gIGlmIChwb3B1cCkge1xuICAgIHBvcHVwLmRvY3VtZW50LnRpdGxlID0gcG9wdXAuZG9jdW1lbnQuYm9keS5pbm5lclRleHQgPSAnZG93bmxvYWRpbmcuLi4nO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBibG9iID09PSAnc3RyaW5nJykgcmV0dXJuIGRvd25sb2FkKGJsb2IsIG5hbWUsIG9wdHMpO1xuXG4gIHZhciBmb3JjZSA9IGJsb2IudHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gIHZhciBpc1NhZmFyaSA9IC9jb25zdHJ1Y3Rvci9pLnRlc3QoX2dsb2JhbC5IVE1MRWxlbWVudCkgfHwgX2dsb2JhbC5zYWZhcmk7XG4gIHZhciBpc0Nocm9tZUlPUyA9IC9DcmlPU1xcL1tcXGRdKy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICBpZiAoKGlzQ2hyb21lSU9TIHx8IGZvcmNlICYmIGlzU2FmYXJpKSAmJiAodHlwZW9mIEZpbGVSZWFkZXIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKEZpbGVSZWFkZXIpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIFVSTHNcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHVybCA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICB1cmwgPSBpc0Nocm9tZUlPUyA/IHVybCA6IHVybC5yZXBsYWNlKC9eZGF0YTpbXjtdKjsvLCAnZGF0YTphdHRhY2htZW50L2ZpbGU7Jyk7XG4gICAgICBpZiAocG9wdXApIHBvcHVwLmxvY2F0aW9uLmhyZWYgPSB1cmw7ZWxzZSBsb2NhdGlvbiA9IHVybDtcbiAgICAgIHBvcHVwID0gbnVsbDsgLy8gcmV2ZXJzZS10YWJuYWJiaW5nICM0NjBcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICB9IGVsc2Uge1xuICAgIHZhciBVUkwgPSBfZ2xvYmFsLlVSTCB8fCBfZ2xvYmFsLndlYmtpdFVSTDtcbiAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBpZiAocG9wdXApIHBvcHVwLmxvY2F0aW9uID0gdXJsO2Vsc2UgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICBwb3B1cCA9IG51bGw7IC8vIHJldmVyc2UtdGFibmFiYmluZyAjNDYwXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfSwgNEU0KTsgLy8gNDBzXG4gIH1cbn0pO1xuXG5fZ2xvYmFsLnNhdmVBcyA9IHNhdmVBcy5zYXZlQXMgPSBzYXZlQXM7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHNhdmVBcztcbn1cblxuaWYgKCFBcnJheS5mcm9tKSB7XG4gIEFycmF5LmZyb20gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICB2YXIgaXNDYWxsYWJsZSA9IGZ1bmN0aW9uIGlzQ2FsbGFibGUoZm4pIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfTtcbiAgICB2YXIgdG9JbnRlZ2VyID0gZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gICAgICB2YXIgbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlciA9PT0gMCB8fCAhaXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChudW1iZXIgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XG4gICAgfTtcbiAgICB2YXIgbWF4U2FmZUludGVnZXIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuICAgIHZhciB0b0xlbmd0aCA9IGZ1bmN0aW9uIHRvTGVuZ3RoKHZhbHVlKSB7XG4gICAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHZhbHVlKTtcbiAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChsZW4sIDApLCBtYXhTYWZlSW50ZWdlcik7XG4gICAgfTtcblxuICAgIC8vIFRoZSBsZW5ndGggcHJvcGVydHkgb2YgdGhlIGZyb20gbWV0aG9kIGlzIDEuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qLCBtYXBGbiwgdGhpc0FyZyAqLykge1xuICAgICAgLy8gMS4gTGV0IEMgYmUgdGhlIHRoaXMgdmFsdWUuXG4gICAgICB2YXIgQyA9IHRoaXM7XG5cbiAgICAgIC8vIDIuIExldCBpdGVtcyBiZSBUb09iamVjdChhcnJheUxpa2UpLlxuICAgICAgdmFyIGl0ZW1zID0gT2JqZWN0KGFycmF5TGlrZSk7XG5cbiAgICAgIC8vIDMuIFJldHVybklmQWJydXB0KGl0ZW1zKS5cbiAgICAgIGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IC0gbm90IG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIDQuIElmIG1hcGZuIGlzIHVuZGVmaW5lZCwgdGhlbiBsZXQgbWFwcGluZyBiZSBmYWxzZS5cbiAgICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdm9pZCB1bmRlZmluZWQ7XG4gICAgICB2YXIgVDtcbiAgICAgIGlmICh0eXBlb2YgbWFwRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIDUuIGVsc2VcbiAgICAgICAgLy8gNS4gYSBJZiBJc0NhbGxhYmxlKG1hcGZuKSBpcyBmYWxzZSwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxuICAgICAgICBpZiAoIWlzQ2FsbGFibGUobWFwRm4pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkuZnJvbTogd2hlbiBwcm92aWRlZCwgdGhlIHNlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDUuIGIuIElmIHRoaXNBcmcgd2FzIHN1cHBsaWVkLCBsZXQgVCBiZSB0aGlzQXJnOyBlbHNlIGxldCBUIGJlIHVuZGVmaW5lZC5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgVCA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyAxMC4gTGV0IGxlblZhbHVlIGJlIEdldChpdGVtcywgXCJsZW5ndGhcIikuXG4gICAgICAvLyAxMS4gTGV0IGxlbiBiZSBUb0xlbmd0aChsZW5WYWx1ZSkuXG4gICAgICB2YXIgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTtcblxuICAgICAgLy8gMTMuIElmIElzQ29uc3RydWN0b3IoQykgaXMgdHJ1ZSwgdGhlblxuICAgICAgLy8gMTMuIGEuIExldCBBIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgW1tDb25zdHJ1Y3RdXSBpbnRlcm5hbCBtZXRob2RcbiAgICAgIC8vIG9mIEMgd2l0aCBhbiBhcmd1bWVudCBsaXN0IGNvbnRhaW5pbmcgdGhlIHNpbmdsZSBpdGVtIGxlbi5cbiAgICAgIC8vIDE0LiBhLiBFbHNlLCBMZXQgQSBiZSBBcnJheUNyZWF0ZShsZW4pLlxuICAgICAgdmFyIEEgPSBpc0NhbGxhYmxlKEMpID8gT2JqZWN0KG5ldyBDKGxlbikpIDogbmV3IEFycmF5KGxlbik7XG5cbiAgICAgIC8vIDE2LiBMZXQgayBiZSAwLlxuICAgICAgdmFyIGsgPSAwO1xuICAgICAgLy8gMTcuIFJlcGVhdCwgd2hpbGUgayA8IGxlbuKApiAoYWxzbyBzdGVwcyBhIC0gaClcbiAgICAgIHZhciBrVmFsdWU7XG4gICAgICB3aGlsZSAoayA8IGxlbikge1xuICAgICAgICBrVmFsdWUgPSBpdGVtc1trXTtcbiAgICAgICAgaWYgKG1hcEZuKSB7XG4gICAgICAgICAgQVtrXSA9IHR5cGVvZiBUID09PSAndW5kZWZpbmVkJyA/IG1hcEZuKGtWYWx1ZSwgaykgOiBtYXBGbi5jYWxsKFQsIGtWYWx1ZSwgayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQVtrXSA9IGtWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBrICs9IDE7XG4gICAgICB9XG4gICAgICAvLyAxOC4gTGV0IHB1dFN0YXR1cyBiZSBQdXQoQSwgXCJsZW5ndGhcIiwgbGVuLCB0cnVlKS5cbiAgICAgIEEubGVuZ3RoID0gbGVuO1xuICAgICAgLy8gMjAuIFJldHVybiBBLlxuICAgICAgcmV0dXJuIEE7XG4gICAgfTtcbiAgfSgpO1xufVxuXG4vKipcbiAqXG4gKlxuICogQGF1dGhvciBKZXJyeSBCZW5keSA8amVycnlAaWNld2luZ2NjLmNvbT5cbiAqIEBsaWNlbmNlIE1JVFxuICpcbiAqL1xuXG4oZnVuY3Rpb24gKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBuYXRpdmVVUkxTZWFyY2hQYXJhbXMgPSBzZWxmLlVSTFNlYXJjaFBhcmFtcyAmJiBzZWxmLlVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZ2V0ID8gc2VsZi5VUkxTZWFyY2hQYXJhbXMgOiBudWxsLFxuICAgICAgaXNTdXBwb3J0T2JqZWN0Q29uc3RydWN0b3IgPSBuYXRpdmVVUkxTZWFyY2hQYXJhbXMgJiYgbmV3IG5hdGl2ZVVSTFNlYXJjaFBhcmFtcyh7IGE6IDEgfSkudG9TdHJpbmcoKSA9PT0gJ2E9MScsXG5cbiAgLy8gVGhlcmUgaXMgYSBidWcgaW4gc2FmYXJpIDEwLjEgKGFuZCBlYXJsaWVyKSB0aGF0IGluY29ycmVjdGx5IGRlY29kZXMgYCUyQmAgYXMgYW4gZW1wdHkgc3BhY2UgYW5kIG5vdCBhIHBsdXMuXG4gIGRlY29kZXNQbHVzZXNDb3JyZWN0bHkgPSBuYXRpdmVVUkxTZWFyY2hQYXJhbXMgJiYgbmV3IG5hdGl2ZVVSTFNlYXJjaFBhcmFtcygncz0lMkInKS5nZXQoJ3MnKSA9PT0gJysnLFxuICAgICAgX19VUkxTZWFyY2hQYXJhbXNfXyA9IFwiX19VUkxTZWFyY2hQYXJhbXNfX1wiLFxuXG4gIC8vIEZpeCBidWcgaW4gRWRnZSB3aGljaCBjYW5ub3QgZW5jb2RlICcgJicgY29ycmVjdGx5XG4gIGVuY29kZXNBbXBlcnNhbmRzQ29ycmVjdGx5ID0gbmF0aXZlVVJMU2VhcmNoUGFyYW1zID8gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhbXBlcnNhbmRUZXN0ID0gbmV3IG5hdGl2ZVVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGFtcGVyc2FuZFRlc3QuYXBwZW5kKCdzJywgJyAmJyk7XG4gICAgcmV0dXJuIGFtcGVyc2FuZFRlc3QudG9TdHJpbmcoKSA9PT0gJ3M9KyUyNic7XG4gIH0oKSA6IHRydWUsXG4gICAgICBwcm90b3R5cGUgPSBVUkxTZWFyY2hQYXJhbXNQb2x5ZmlsbC5wcm90b3R5cGUsXG4gICAgICBpdGVyYWJsZSA9ICEhKHNlbGYuU3ltYm9sICYmIHNlbGYuU3ltYm9sLml0ZXJhdG9yKTtcblxuICBpZiAobmF0aXZlVVJMU2VhcmNoUGFyYW1zICYmIGlzU3VwcG9ydE9iamVjdENvbnN0cnVjdG9yICYmIGRlY29kZXNQbHVzZXNDb3JyZWN0bHkgJiYgZW5jb2Rlc0FtcGVyc2FuZHNDb3JyZWN0bHkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhIFVSTFNlYXJjaFBhcmFtcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdHxzdHJpbmd8VVJMU2VhcmNoUGFyYW1zfSBzZWFyY2hcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBVUkxTZWFyY2hQYXJhbXNQb2x5ZmlsbChzZWFyY2gpIHtcbiAgICBzZWFyY2ggPSBzZWFyY2ggfHwgXCJcIjtcblxuICAgIC8vIHN1cHBvcnQgY29uc3RydWN0IG9iamVjdCB3aXRoIGFub3RoZXIgVVJMU2VhcmNoUGFyYW1zIGluc3RhbmNlXG4gICAgaWYgKHNlYXJjaCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcyB8fCBzZWFyY2ggaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXNQb2x5ZmlsbCkge1xuICAgICAgc2VhcmNoID0gc2VhcmNoLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHRoaXNbX19VUkxTZWFyY2hQYXJhbXNfX10gPSBwYXJzZVRvRGljdChzZWFyY2gpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBzcGVjaWZpZWQga2V5L3ZhbHVlIHBhaXIgYXMgYSBuZXcgc2VhcmNoIHBhcmFtZXRlci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBwcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgYXBwZW5kVG8odGhpc1tfX1VSTFNlYXJjaFBhcmFtc19fXSwgbmFtZSwgdmFsdWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIHRoZSBnaXZlbiBzZWFyY2ggcGFyYW1ldGVyLCBhbmQgaXRzIGFzc29jaWF0ZWQgdmFsdWUsXG4gICAqIGZyb20gdGhlIGxpc3Qgb2YgYWxsIHNlYXJjaCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKi9cbiAgcHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXNbX19VUkxTZWFyY2hQYXJhbXNfX11bbmFtZV07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGdpdmVuIHNlYXJjaCBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH1cbiAgICovXG4gIHByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBkaWN0ID0gdGhpc1tfX1VSTFNlYXJjaFBhcmFtc19fXTtcbiAgICByZXR1cm4gbmFtZSBpbiBkaWN0ID8gZGljdFtuYW1lXVswXSA6IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSB2YWx1ZXMgYXNzb2NpYXRpb24gd2l0aCBhIGdpdmVuIHNlYXJjaCBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIHByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBkaWN0ID0gdGhpc1tfX1VSTFNlYXJjaFBhcmFtc19fXTtcbiAgICByZXR1cm4gbmFtZSBpbiBkaWN0ID8gZGljdFtuYW1lXS5zbGljZSgwKSA6IFtdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQm9vbGVhbiBpbmRpY2F0aW5nIGlmIHN1Y2ggYSBzZWFyY2ggcGFyYW1ldGVyIGV4aXN0cy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBwcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZSBpbiB0aGlzW19fVVJMU2VhcmNoUGFyYW1zX19dO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIGEgZ2l2ZW4gc2VhcmNoIHBhcmFtZXRlciB0b1xuICAgKiB0aGUgZ2l2ZW4gdmFsdWUuIElmIHRoZXJlIHdlcmUgc2V2ZXJhbCB2YWx1ZXMsIGRlbGV0ZSB0aGVcbiAgICogb3RoZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQkJDEobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzW19fVVJMU2VhcmNoUGFyYW1zX19dW25hbWVdID0gWycnICsgdmFsdWVdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIGNvbnRhaW5nIGEgcXVlcnkgc3RyaW5nIHN1aXRhYmxlIGZvciB1c2UgaW4gYSBVUkwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRpY3QgPSB0aGlzW19fVVJMU2VhcmNoUGFyYW1zX19dLFxuICAgICAgICBxdWVyeSA9IFtdLFxuICAgICAgICBpLFxuICAgICAgICBrZXksXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGRpY3QpIHtcbiAgICAgIG5hbWUgPSBlbmNvZGUoa2V5KTtcbiAgICAgIGZvciAoaSA9IDAsIHZhbHVlID0gZGljdFtrZXldOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcXVlcnkucHVzaChuYW1lICsgJz0nICsgZW5jb2RlKHZhbHVlW2ldKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVyeS5qb2luKCcmJyk7XG4gIH07XG5cbiAgLy8gVGhlcmUgaXMgYSBidWcgaW4gU2FmYXJpIDEwLjEgYW5kIGBQcm94eWBpbmcgaXQgaXMgbm90IGVub3VnaC5cbiAgdmFyIGZvclN1cmVVc2VQb2x5ZmlsbCA9ICFkZWNvZGVzUGx1c2VzQ29ycmVjdGx5O1xuICB2YXIgdXNlUHJveHkgPSAhZm9yU3VyZVVzZVBvbHlmaWxsICYmIG5hdGl2ZVVSTFNlYXJjaFBhcmFtcyAmJiAhaXNTdXBwb3J0T2JqZWN0Q29uc3RydWN0b3IgJiYgc2VsZi5Qcm94eTtcbiAgLypcbiAgICogQXBwbHkgcG9saWZpbGwgdG8gZ2xvYmFsIG9iamVjdCBhbmQgYXBwZW5kIG90aGVyIHByb3RvdHlwZSBpbnRvIGl0XG4gICAqL1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ1VSTFNlYXJjaFBhcmFtcycsIHtcbiAgICB2YWx1ZTogdXNlUHJveHkgP1xuICAgIC8vIFNhZmFyaSAxMC4wIGRvZXNuJ3Qgc3VwcG9ydCBQcm94eSwgc28gaXQgd29uJ3QgZXh0ZW5kIFVSTFNlYXJjaFBhcmFtcyBvbiBzYWZhcmkgMTAuMFxuICAgIG5ldyBQcm94eShuYXRpdmVVUkxTZWFyY2hQYXJhbXMsIHtcbiAgICAgIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KHRhcmdldCwgYXJncykge1xuICAgICAgICByZXR1cm4gbmV3IHRhcmdldChuZXcgVVJMU2VhcmNoUGFyYW1zUG9seWZpbGwoYXJnc1swXSkudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgfSkgOiBVUkxTZWFyY2hQYXJhbXNQb2x5ZmlsbFxuICB9KTtcblxuICB2YXIgVVNQUHJvdG8gPSBzZWxmLlVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbiAgVVNQUHJvdG8ucG9seWZpbGwgPSB0cnVlO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcGFyYW0ge29iamVjdH0gdGhpc0FyZ1xuICAgKi9cbiAgVVNQUHJvdG8uZm9yRWFjaCA9IFVTUFByb3RvLmZvckVhY2ggfHwgZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIGRpY3QgPSBwYXJzZVRvRGljdCh0aGlzLnRvU3RyaW5nKCkpO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRpY3QpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGRpY3RbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogU29ydCBhbGwgbmFtZS12YWx1ZSBwYWlyc1xuICAgKi9cbiAgVVNQUHJvdG8uc29ydCA9IFVTUFByb3RvLnNvcnQgfHwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBkaWN0ID0gcGFyc2VUb0RpY3QodGhpcy50b1N0cmluZygpKSxcbiAgICAgICAga2V5cyA9IFtdLFxuICAgICAgICBrLFxuICAgICAgICBpLFxuICAgICAgICBqO1xuICAgIGZvciAoayBpbiBkaWN0KSB7XG4gICAgICBrZXlzLnB1c2goayk7XG4gICAgfVxuICAgIGtleXMuc29ydCgpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXNbJ2RlbGV0ZSddKGtleXNbaV0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV0sXG4gICAgICAgICAgdmFsdWVzID0gZGljdFtrZXldO1xuICAgICAgZm9yIChqID0gMDsgaiA8IHZhbHVlcy5sZW5ndGg7IGorKykge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlc1tqXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGl0ZXJhdG9yIGFsbG93aW5nIHRvIGdvIHRocm91Z2ggYWxsIGtleXMgb2ZcbiAgICogdGhlIGtleS92YWx1ZSBwYWlycyBjb250YWluZWQgaW4gdGhpcyBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICovXG4gIFVTUFByb3RvLmtleXMgPSBVU1BQcm90by5rZXlzIHx8IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIG5hbWUpIHtcbiAgICAgIGl0ZW1zLnB1c2gobmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1ha2VJdGVyYXRvcihpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gaXRlcmF0b3IgYWxsb3dpbmcgdG8gZ28gdGhyb3VnaCBhbGwgdmFsdWVzIG9mXG4gICAqIHRoZSBrZXkvdmFsdWUgcGFpcnMgY29udGFpbmVkIGluIHRoaXMgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAqL1xuICBVU1BQcm90by52YWx1ZXMgPSBVU1BQcm90by52YWx1ZXMgfHwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWFrZUl0ZXJhdG9yKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBpdGVyYXRvciBhbGxvd2luZyB0byBnbyB0aHJvdWdoIGFsbCBrZXkvdmFsdWVcbiAgICogcGFpcnMgY29udGFpbmVkIGluIHRoaXMgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAqL1xuICBVU1BQcm90by5lbnRyaWVzID0gVVNQUHJvdG8uZW50cmllcyB8fCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBuYW1lKSB7XG4gICAgICBpdGVtcy5wdXNoKFtuYW1lLCBpdGVtXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1ha2VJdGVyYXRvcihpdGVtcyk7XG4gIH07XG5cbiAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgVVNQUHJvdG9bc2VsZi5TeW1ib2wuaXRlcmF0b3JdID0gVVNQUHJvdG9bc2VsZi5TeW1ib2wuaXRlcmF0b3JdIHx8IFVTUFByb3RvLmVudHJpZXM7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gICAgdmFyIHJlcGxhY2UgPSB7XG4gICAgICAnISc6ICclMjEnLFxuICAgICAgXCInXCI6ICclMjcnLFxuICAgICAgJygnOiAnJTI4JyxcbiAgICAgICcpJzogJyUyOScsXG4gICAgICAnfic6ICclN0UnLFxuICAgICAgJyUyMCc6ICcrJyxcbiAgICAgICclMDAnOiAnXFx4MDAnXG4gICAgfTtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnXFwoXFwpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiByZXBsYWNlW21hdGNoXTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlSXRlcmF0b3IoYXJyKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJyLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW3NlbGYuU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVRvRGljdChzZWFyY2gpIHtcbiAgICB2YXIgZGljdCA9IHt9O1xuXG4gICAgaWYgKCh0eXBlb2Ygc2VhcmNoID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzZWFyY2gpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgZm9yICh2YXIga2V5IGluIHNlYXJjaCkge1xuICAgICAgICBpZiAoc2VhcmNoLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBhcHBlbmRUbyhkaWN0LCBrZXksIHNlYXJjaFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgZmlyc3QgJz8nXG4gICAgICBpZiAoc2VhcmNoLmluZGV4T2YoXCI/XCIpID09PSAwKSB7XG4gICAgICAgIHNlYXJjaCA9IHNlYXJjaC5zbGljZSgxKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhaXJzID0gc2VhcmNoLnNwbGl0KFwiJlwiKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGFpcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFpcnNbal0sXG4gICAgICAgICAgICBpbmRleCA9IHZhbHVlLmluZGV4T2YoJz0nKTtcblxuICAgICAgICBpZiAoLTEgPCBpbmRleCkge1xuICAgICAgICAgIGFwcGVuZFRvKGRpY3QsIGRlY29kZSh2YWx1ZS5zbGljZSgwLCBpbmRleCkpLCBkZWNvZGUodmFsdWUuc2xpY2UoaW5kZXggKyAxKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgYXBwZW5kVG8oZGljdCwgZGVjb2RlKHZhbHVlKSwgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaWN0O1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwZW5kVG8oZGljdCwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgdmFsID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS50b1N0cmluZygpIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXG4gICAgaWYgKG5hbWUgaW4gZGljdCkge1xuICAgICAgZGljdFtuYW1lXS5wdXNoKHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpY3RbbmFtZV0gPSBbdmFsXTtcbiAgICB9XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQpO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnZmluZCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUocHJlZGljYXRlKSB7XG4gICAgICAvLyAxLiBMZXQgTyBiZSA/IFRvT2JqZWN0KHRoaXMgdmFsdWUpLlxuICAgICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInRoaXNcIiBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBvID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgICAvLyAyLiBMZXQgbGVuIGJlID8gVG9MZW5ndGgoPyBHZXQoTywgXCJsZW5ndGhcIikpLlxuICAgICAgdmFyIGxlbiA9IG8ubGVuZ3RoID4+PiAwO1xuXG4gICAgICAvLyAzLiBJZiBJc0NhbGxhYmxlKHByZWRpY2F0ZSkgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgIC8vIDUuIExldCBrIGJlIDAuXG4gICAgICB2YXIgayA9IDA7XG5cbiAgICAgIC8vIDYuIFJlcGVhdCwgd2hpbGUgayA8IGxlblxuICAgICAgd2hpbGUgKGsgPCBsZW4pIHtcbiAgICAgICAgLy8gYS4gTGV0IFBrIGJlICEgVG9TdHJpbmcoaykuXG4gICAgICAgIC8vIGIuIExldCBrVmFsdWUgYmUgPyBHZXQoTywgUGspLlxuICAgICAgICAvLyBjLiBMZXQgdGVzdFJlc3VsdCBiZSBUb0Jvb2xlYW4oPyBDYWxsKHByZWRpY2F0ZSwgVCwgwqsga1ZhbHVlLCBrLCBPIMK7KSkuXG4gICAgICAgIC8vIGQuIElmIHRlc3RSZXN1bHQgaXMgdHJ1ZSwgcmV0dXJuIGtWYWx1ZS5cbiAgICAgICAgdmFyIGtWYWx1ZSA9IG9ba107XG4gICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCBrVmFsdWUsIGssIG8pKSB7XG4gICAgICAgICAgcmV0dXJuIGtWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlLiBJbmNyZWFzZSBrIGJ5IDEuXG4gICAgICAgIGsrKztcbiAgICAgIH1cblxuICAgICAgLy8gNy4gUmV0dXJuIHVuZGVmaW5lZC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudC9DdXN0b21FdmVudFxuKGZ1bmN0aW9uICgpIHtcblxuICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZmFsc2U7XG5cbiAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiBudWxsIH07XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuXG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG5cbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XG59KSgpO1xuXG4oZnVuY3Rpb24gKHNlbGYpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBpZiAoc2VsZi5mZXRjaCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHN1cHBvcnQgPSB7XG4gICAgICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICAgICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbmV3IEJsb2IoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oKSxcbiAgICAgICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICAgICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgICAgICB2YXIgdmlld0NsYXNzZXMgPSBbJ1tvYmplY3QgSW50OEFycmF5XScsICdbb2JqZWN0IFVpbnQ4QXJyYXldJywgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJywgJ1tvYmplY3QgSW50MTZBcnJheV0nLCAnW29iamVjdCBVaW50MTZBcnJheV0nLCAnW29iamVjdCBJbnQzMkFycmF5XScsICdbb2JqZWN0IFVpbnQzMkFycmF5XScsICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLCAnW29iamVjdCBGbG9hdDY0QXJyYXldJ107XG5cbiAgICAgICAgdmFyIGlzRGF0YVZpZXcgPSBmdW5jdGlvbiBpc0RhdGFWaWV3KG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTE7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVyYXRvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5tYXAgPSB7fTtcblxuICAgICAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICAgICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgICAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV07XG4gICAgICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsJyArIHZhbHVlIDogdmFsdWU7XG4gICAgfTtcblxuICAgIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXTtcbiAgICB9O1xuXG4gICAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbDtcbiAgICB9O1xuXG4gICAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpO1xuICAgIH07XG5cbiAgICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgfTtcblxuICAgIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2gobmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpO1xuICAgIH07XG5cbiAgICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcyk7XG4gICAgfTtcblxuICAgIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKTtcbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgICAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpO1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgICAgICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gYnVmLnNsaWNlKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKTtcbiAgICAgICAgICAgIHJldHVybiB2aWV3LmJ1ZmZlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHk7XG4gICAgICAgICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgLy8gSUUgMTAtMTEgY2Fu4oCZdCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgICAgICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmpzb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXTtcblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICAgICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcblxuICAgICAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsO1xuICAgICAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kO1xuICAgICAgICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZTtcbiAgICAgICAgICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXQ7XG4gICAgICAgICAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCc7XG4gICAgICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJyk7XG4gICAgICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5yZWZlcnJlciA9IG51bGw7XG5cbiAgICAgICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbml0Qm9keShib2R5KTtcbiAgICB9XG5cbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbiAoYnl0ZXMpIHtcbiAgICAgICAgICAgIGlmIChieXRlcykge1xuICAgICAgICAgICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMwI3NlY3Rpb24tMy4yXG4gICAgICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpO1xuICAgICAgICBwcmVQcm9jZXNzZWRIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG5cbiAgICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4gICAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgPT09IHVuZGVmaW5lZCA/IDIwMCA6IG9wdGlvbnMuc3RhdHVzO1xuICAgICAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwO1xuICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSyc7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJyc7XG4gICAgICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KTtcbiAgICB9XG5cbiAgICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuICAgIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBSZXNwb25zZS5lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHsgc3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJyB9KTtcbiAgICAgICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcic7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdO1xuXG4gICAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbiAodXJsLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IHN0YXR1cywgaGVhZGVyczogeyBsb2NhdGlvbjogdXJsIH0gfSk7XG4gICAgfTtcblxuICAgIHNlbGYuSGVhZGVycyA9IEhlYWRlcnM7XG4gICAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbiAgICBzZWxmLmZldGNoID0gZnVuY3Rpb24gKGlucHV0LCBpbml0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJyk7XG4gICAgICAgICAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnb21pdCcpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHVuZGVmaW5lZCk7XG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6IGZhY3RvcnkoKTtcbn0pKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgICAgIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICAgICAgICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cblxuICAgICAgICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICAgICAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICAgICAgICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICAgICAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgICAgICAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICAgICAgICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gICAgICAgIGlmIChjYWxsICYmICgodHlwZW9mIGNhbGwgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgICAgIHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICBvYmplY3QgPSBfZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICAgICAgICAgIGlmIChvYmplY3QgPT09IG51bGwpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkge1xuICAgICAgICAgICAgX2dldCA9IFJlZmxlY3QuZ2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZSA9IF9zdXBlclByb3BCYXNlKHRhcmdldCwgcHJvcGVydHkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFiYXNlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgICAgICAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIgfHwgdGFyZ2V0KTtcbiAgICB9XG5cbiAgICB2YXIgRW1pdHRlciA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRW1pdHRlcigpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFbWl0dGVyKTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsaXN0ZW5lcnMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfY3JlYXRlQ2xhc3MoRW1pdHRlciwgW3tcbiAgICAgICAgICAgIGtleTogXCJhZGRFdmVudExpc3RlbmVyXCIsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogXCJyZW1vdmVFdmVudExpc3RlbmVyXCIsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFja1tpXSA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiBcImRpc3BhdGNoRXZlbnRcIixcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGlmICghKGV2ZW50LnR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGVib3VuY2UgPSBmdW5jdGlvbiBkZWJvdW5jZShjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKF90aGlzLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLmxpc3RlbmVyc1tldmVudC50eXBlXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYm91bmNlKHN0YWNrW2ldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gRW1pdHRlcjtcbiAgICB9KCk7XG5cbiAgICB2YXIgQWJvcnRTaWduYWwgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoX0VtaXR0ZXIpIHtcbiAgICAgICAgX2luaGVyaXRzKEFib3J0U2lnbmFsLCBfRW1pdHRlcik7XG5cbiAgICAgICAgZnVuY3Rpb24gQWJvcnRTaWduYWwoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyO1xuXG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWJvcnRTaWduYWwpO1xuXG4gICAgICAgICAgICBfdGhpczIgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQWJvcnRTaWduYWwpLmNhbGwodGhpcykpOyAvLyBTb21lIHZlcnNpb25zIG9mIGJhYmVsIGRvZXMgbm90IHRyYW5zcGlsZSBzdXBlcigpIGNvcnJlY3RseSBmb3IgSUUgPD0gMTAsIGlmIHRoZSBwYXJlbnRcbiAgICAgICAgICAgIC8vIGNvbnN0cnVjdG9yIGhhcyBmYWlsZWQgdG8gcnVuLCB0aGVuIFwidGhpcy5saXN0ZW5lcnNcIiB3aWxsIHN0aWxsIGJlIHVuZGVmaW5lZCBhbmQgdGhlbiB3ZSBjYWxsXG4gICAgICAgICAgICAvLyB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGRpcmVjdGx5IGluc3RlYWQgYXMgYSB3b3JrYXJvdW5kLiBGb3IgZ2VuZXJhbCBkZXRhaWxzLCBzZWUgYmFiZWwgYnVnOlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy8zMDQxXG4gICAgICAgICAgICAvLyBUaGlzIGhhY2sgd2FzIGFkZGVkIGFzIGEgZml4IGZvciB0aGUgaXNzdWUgZGVzY3JpYmVkIGhlcmU6XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL3BvbHlmaWxsLWxpYnJhcnkvcHVsbC81OSNpc3N1ZWNvbW1lbnQtNDc3NTU4MDQyXG5cbiAgICAgICAgICAgIGlmICghX3RoaXMyLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIEVtaXR0ZXIuY2FsbChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMikpO1xuICAgICAgICAgICAgfSAvLyBDb21wYXJlZCB0byBhc3NpZ25tZW50LCBPYmplY3QuZGVmaW5lUHJvcGVydHkgbWFrZXMgcHJvcGVydGllcyBub24tZW51bWVyYWJsZSBieSBkZWZhdWx0IGFuZFxuICAgICAgICAgICAgLy8gd2Ugd2FudCBPYmplY3Qua2V5cyhuZXcgQWJvcnRDb250cm9sbGVyKCkuc2lnbmFsKSB0byBiZSBbXSBmb3IgY29tcGF0IHdpdGggdGhlIG5hdGl2ZSBpbXBsXG5cblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMyKSwgJ2Fib3J0ZWQnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczIpLCAnb25hYm9ydCcsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhBYm9ydFNpZ25hbCwgW3tcbiAgICAgICAgICAgIGtleTogXCJ0b1N0cmluZ1wiLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnW29iamVjdCBBYm9ydFNpZ25hbF0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IFwiZGlzcGF0Y2hFdmVudFwiLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2Fib3J0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbmFib3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uYWJvcnQuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfZ2V0KF9nZXRQcm90b3R5cGVPZihBYm9ydFNpZ25hbC5wcm90b3R5cGUpLCBcImRpc3BhdGNoRXZlbnRcIiwgdGhpcykuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gQWJvcnRTaWduYWw7XG4gICAgfShFbWl0dGVyKTtcbiAgICB2YXIgQWJvcnRDb250cm9sbGVyID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBBYm9ydENvbnRyb2xsZXIoKSB7XG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWJvcnRDb250cm9sbGVyKTtcblxuICAgICAgICAgICAgLy8gQ29tcGFyZWQgdG8gYXNzaWdubWVudCwgT2JqZWN0LmRlZmluZVByb3BlcnR5IG1ha2VzIHByb3BlcnRpZXMgbm9uLWVudW1lcmFibGUgYnkgZGVmYXVsdCBhbmRcbiAgICAgICAgICAgIC8vIHdlIHdhbnQgT2JqZWN0LmtleXMobmV3IEFib3J0Q29udHJvbGxlcigpKSB0byBiZSBbXSBmb3IgY29tcGF0IHdpdGggdGhlIG5hdGl2ZSBpbXBsXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NpZ25hbCcsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV3IEFib3J0U2lnbmFsKCksXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhBYm9ydENvbnRyb2xsZXIsIFt7XG4gICAgICAgICAgICBrZXk6IFwiYWJvcnRcIixcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhYm9ydCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnYWJvcnQnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIEludGVybmV0IEV4cGxvcmVyIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnR5cGUgPSAnYWJvcnQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3IgSW50ZXJuZXQgRXhwbG9yZXIgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pbml0RXZlbnQoJ2Fib3J0JywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIHdoZXJlIGRvY3VtZW50IGlzbid0IGF2YWlsYWJsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhYm9ydCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25hbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiBcInRvU3RyaW5nXCIsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdbb2JqZWN0IEFib3J0Q29udHJvbGxlcl0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIEFib3J0Q29udHJvbGxlcjtcbiAgICB9KCk7XG5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gICAgICAgIC8vIFRoZXNlIGFyZSBuZWNlc3NhcnkgdG8gbWFrZSBzdXJlIHRoYXQgd2UgZ2V0IGNvcnJlY3Qgb3V0cHV0IGZvcjpcbiAgICAgICAgLy8gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ldyBBYm9ydENvbnRyb2xsZXIoKSlcbiAgICAgICAgQWJvcnRDb250cm9sbGVyLnByb3RvdHlwZVtTeW1ib2wudG9TdHJpbmdUYWddID0gJ0Fib3J0Q29udHJvbGxlcic7XG4gICAgICAgIEFib3J0U2lnbmFsLnByb3RvdHlwZVtTeW1ib2wudG9TdHJpbmdUYWddID0gJ0Fib3J0U2lnbmFsJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb2x5ZmlsbE5lZWRlZChzZWxmKSB7XG4gICAgICAgIGlmIChzZWxmLl9fRk9SQ0VfSU5TVEFMTF9BQk9SVENPTlRST0xMRVJfUE9MWUZJTEwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdfX0ZPUkNFX0lOU1RBTExfQUJPUlRDT05UUk9MTEVSX1BPTFlGSUxMPXRydWUgaXMgc2V0LCB3aWxsIGZvcmNlIGluc3RhbGwgcG9seWZpbGwnKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vIE5vdGUgdGhhdCB0aGUgXCJ1bmZldGNoXCIgbWluaW1hbCBmZXRjaCBwb2x5ZmlsbCBkZWZpbmVzIGZldGNoKCkgd2l0aG91dFxuICAgICAgICAvLyBkZWZpbmluZyB3aW5kb3cuUmVxdWVzdCwgYW5kIHRoaXMgcG9seWZpbGwgbmVlZCB0byB3b3JrIG9uIHRvcCBvZiB1bmZldGNoXG4gICAgICAgIC8vIHNvIHRoZSBiZWxvdyBmZWF0dXJlIGRldGVjdGlvbiBuZWVkcyB0aGUgIXNlbGYuQWJvcnRDb250cm9sbGVyIHBhcnQuXG4gICAgICAgIC8vIFRoZSBSZXF1ZXN0LnByb3RvdHlwZSBjaGVjayBpcyBhbHNvIG5lZWRlZCBiZWNhdXNlIFNhZmFyaSB2ZXJzaW9ucyAxMS4xLjJcbiAgICAgICAgLy8gdXAgdG8gYW5kIGluY2x1ZGluZyAxMi4xLnggaGFzIGEgd2luZG93LkFib3J0Q29udHJvbGxlciBwcmVzZW50IGJ1dCBzdGlsbFxuICAgICAgICAvLyBkb2VzIE5PVCBjb3JyZWN0bHkgaW1wbGVtZW50IGFib3J0YWJsZSBmZXRjaDpcbiAgICAgICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3NDk4MCNjMlxuXG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzZWxmLlJlcXVlc3QgPT09ICdmdW5jdGlvbicgJiYgIXNlbGYuUmVxdWVzdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ3NpZ25hbCcpIHx8ICFzZWxmLkFib3J0Q29udHJvbGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3RlOiB0aGUgXCJmZXRjaC5SZXF1ZXN0XCIgZGVmYXVsdCB2YWx1ZSBpcyBhdmFpbGFibGUgZm9yIGZldGNoIGltcG9ydGVkIGZyb21cbiAgICAgKiB0aGUgXCJub2RlLWZldGNoXCIgcGFja2FnZSBhbmQgbm90IGluIGJyb3dzZXJzLiBUaGlzIGlzIE9LIHNpbmNlIGJyb3dzZXJzXG4gICAgICogd2lsbCBiZSBpbXBvcnRpbmcgdW1kLXBvbHlmaWxsLmpzIGZyb20gdGhhdCBwYXRoIFwic2VsZlwiIGlzIHBhc3NlZCB0aGVcbiAgICAgKiBkZWNvcmF0b3Igc28gdGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZCAoYmVjYXVzZSBicm93c2VycyB0aGF0IGRlZmluZVxuICAgICAqIGZldGNoIGFsc28gaGFzIFJlcXVlc3QpLiBPbmUgcXVpcmt5IHNldHVwIHdoZXJlIHNlbGYuZmV0Y2ggZXhpc3RzIGJ1dFxuICAgICAqIHNlbGYuUmVxdWVzdCBkb2VzIG5vdCBpcyB3aGVuIHRoZSBcInVuZmV0Y2hcIiBtaW5pbWFsIGZldGNoIHBvbHlmaWxsIGlzIHVzZWRcbiAgICAgKiBvbiB0b3Agb2YgSUUxMTsgZm9yIHRoaXMgY2FzZSB0aGUgYnJvd3NlciB3aWxsIHRyeSB0byB1c2UgdGhlIGZldGNoLlJlcXVlc3RcbiAgICAgKiBkZWZhdWx0IHZhbHVlIHdoaWNoIGluIHR1cm4gd2lsbCBiZSB1bmRlZmluZWQgYnV0IHRoZW4gdGhlbiBcImlmIChSZXF1ZXN0KVwiXG4gICAgICogd2lsbCBlbnN1cmUgdGhhdCB5b3UgZ2V0IGEgcGF0Y2hlZCBmZXRjaCBidXQgc3RpbGwgbm8gUmVxdWVzdCAoYXMgZXhwZWN0ZWQpLlxuICAgICAqIEBwYXJhbSB7ZmV0Y2gsIFJlcXVlc3QgPSBmZXRjaC5SZXF1ZXN0fVxuICAgICAqIEByZXR1cm5zIHtmZXRjaDogYWJvcnRhYmxlRmV0Y2gsIFJlcXVlc3Q6IEFib3J0YWJsZVJlcXVlc3R9XG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBhYm9ydGFibGVGZXRjaERlY29yYXRvcihwYXRjaFRhcmdldHMpIHtcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBwYXRjaFRhcmdldHMpIHtcbiAgICAgICAgICAgIHBhdGNoVGFyZ2V0cyA9IHtcbiAgICAgICAgICAgICAgICBmZXRjaDogcGF0Y2hUYXJnZXRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9wYXRjaFRhcmdldHMgPSBwYXRjaFRhcmdldHMsXG4gICAgICAgICAgICBmZXRjaCA9IF9wYXRjaFRhcmdldHMuZmV0Y2gsXG4gICAgICAgICAgICBfcGF0Y2hUYXJnZXRzJFJlcXVlc3QgPSBfcGF0Y2hUYXJnZXRzLlJlcXVlc3QsXG4gICAgICAgICAgICBOYXRpdmVSZXF1ZXN0ID0gX3BhdGNoVGFyZ2V0cyRSZXF1ZXN0ID09PSB2b2lkIDAgPyBmZXRjaC5SZXF1ZXN0IDogX3BhdGNoVGFyZ2V0cyRSZXF1ZXN0LFxuICAgICAgICAgICAgTmF0aXZlQWJvcnRDb250cm9sbGVyID0gX3BhdGNoVGFyZ2V0cy5BYm9ydENvbnRyb2xsZXIsXG4gICAgICAgICAgICBfcGF0Y2hUYXJnZXRzJF9fRk9SQ0UgPSBfcGF0Y2hUYXJnZXRzLl9fRk9SQ0VfSU5TVEFMTF9BQk9SVENPTlRST0xMRVJfUE9MWUZJTEwsXG4gICAgICAgICAgICBfX0ZPUkNFX0lOU1RBTExfQUJPUlRDT05UUk9MTEVSX1BPTFlGSUxMID0gX3BhdGNoVGFyZ2V0cyRfX0ZPUkNFID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wYXRjaFRhcmdldHMkX19GT1JDRTtcblxuICAgICAgICBpZiAoIXBvbHlmaWxsTmVlZGVkKHtcbiAgICAgICAgICAgIGZldGNoOiBmZXRjaCxcbiAgICAgICAgICAgIFJlcXVlc3Q6IE5hdGl2ZVJlcXVlc3QsXG4gICAgICAgICAgICBBYm9ydENvbnRyb2xsZXI6IE5hdGl2ZUFib3J0Q29udHJvbGxlcixcbiAgICAgICAgICAgIF9fRk9SQ0VfSU5TVEFMTF9BQk9SVENPTlRST0xMRVJfUE9MWUZJTEw6IF9fRk9SQ0VfSU5TVEFMTF9BQk9SVENPTlRST0xMRVJfUE9MWUZJTExcbiAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmV0Y2g6IGZldGNoLFxuICAgICAgICAgICAgICAgIFJlcXVlc3Q6IFJlcXVlc3RcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgUmVxdWVzdCA9IE5hdGl2ZVJlcXVlc3Q7IC8vIE5vdGUgdGhhdCB0aGUgXCJ1bmZldGNoXCIgbWluaW1hbCBmZXRjaCBwb2x5ZmlsbCBkZWZpbmVzIGZldGNoKCkgd2l0aG91dFxuICAgICAgICAvLyBkZWZpbmluZyB3aW5kb3cuUmVxdWVzdCwgYW5kIHRoaXMgcG9seWZpbGwgbmVlZCB0byB3b3JrIG9uIHRvcCBvZiB1bmZldGNoXG4gICAgICAgIC8vIGhlbmNlIHdlIG9ubHkgcGF0Y2ggaXQgaWYgaXQncyBhdmFpbGFibGUuIEFsc28gd2UgZG9u4oCZdCBwYXRjaCBpdCBpZiBzaWduYWxcbiAgICAgICAgLy8gaXMgYWxyZWFkeSBhdmFpbGFibGUgb24gdGhlIFJlcXVlc3QgcHJvdG90eXBlIGJlY2F1c2UgaW4gdGhpcyBjYXNlIHN1cHBvcnRcbiAgICAgICAgLy8gaXMgcHJlc2VudCBhbmQgdGhlIHBhdGNoaW5nIGJlbG93IGNhbiBjYXVzZSBhIGNyYXNoIHNpbmNlIGl0IGFzc2lnbnMgdG9cbiAgICAgICAgLy8gcmVxdWVzdC5zaWduYWwgd2hpY2ggaXMgdGVjaG5pY2FsbHkgYSByZWFkLW9ubHkgcHJvcGVydHkuIFRoaXMgbGF0dGVyIGVycm9yXG4gICAgICAgIC8vIGhhcHBlbnMgd2hlbiB5b3UgcnVuIHRoZSBtYWluNS5qcyBub2RlLWZldGNoIGV4YW1wbGUgaW4gdGhlIHJlcG9cbiAgICAgICAgLy8gXCJhYm9ydGNvbnRyb2xsZXItcG9seWZpbGwtZXhhbXBsZXNcIi4gVGhlIGV4YWN0IGVycm9yIGlzOlxuICAgICAgICAvLyAgIHJlcXVlc3Quc2lnbmFsID0gaW5pdC5zaWduYWw7XG4gICAgICAgIC8vICAgXlxuICAgICAgICAvLyBUeXBlRXJyb3I6IENhbm5vdCBzZXQgcHJvcGVydHkgc2lnbmFsIG9mICM8UmVxdWVzdD4gd2hpY2ggaGFzIG9ubHkgYSBnZXR0ZXJcblxuICAgICAgICBpZiAoUmVxdWVzdCAmJiAhUmVxdWVzdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ3NpZ25hbCcpIHx8IF9fRk9SQ0VfSU5TVEFMTF9BQk9SVENPTlRST0xMRVJfUE9MWUZJTEwpIHtcbiAgICAgICAgICAgIFJlcXVlc3QgPSBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBpbml0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHNpZ25hbDtcblxuICAgICAgICAgICAgICAgIGlmIChpbml0ICYmIGluaXQuc2lnbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbCA9IGluaXQuc2lnbmFsOyAvLyBOZXZlciBwYXNzIGluaXQuc2lnbmFsIHRvIHRoZSBuYXRpdmUgUmVxdWVzdCBpbXBsZW1lbnRhdGlvbiB3aGVuIHRoZSBwb2x5ZmlsbCBoYXNcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVlbiBpbnN0YWxsZWQgYmVjYXVzZSBpZiB3ZSdyZSBydW5uaW5nIG9uIHRvcCBvZiBhIGJyb3dzZXIgd2l0aCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIHdvcmtpbmcgbmF0aXZlIEFib3J0Q29udHJvbGxlciAoaS5lLiB0aGUgcG9seWZpbGwgd2FzIGluc3RhbGxlZCBkdWUgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gX19GT1JDRV9JTlNUQUxMX0FCT1JUQ09OVFJPTExFUl9QT0xZRklMTCBiZWluZyBzZXQpLCB0aGVuIHBhc3Npbmcgb3VyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZha2UgQWJvcnRTaWduYWwgdG8gdGhlIG5hdGl2ZSBmZXRjaCB3aWxsIHRyaWdnZXI6XG4gICAgICAgICAgICAgICAgICAgIC8vIFR5cGVFcnJvcjogRmFpbGVkIHRvIGNvbnN0cnVjdCAnUmVxdWVzdCc6IG1lbWJlciBzaWduYWwgaXMgbm90IG9mIHR5cGUgQWJvcnRTaWduYWwuXG5cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGluaXQuc2lnbmFsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IE5hdGl2ZVJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNpZ25hbCkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWVzdCwgJ3NpZ25hbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNpZ25hbFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlID0gTmF0aXZlUmVxdWVzdC5wcm90b3R5cGU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVhbEZldGNoID0gZmV0Y2g7XG5cbiAgICAgICAgdmFyIGFib3J0YWJsZUZldGNoID0gZnVuY3Rpb24gYWJvcnRhYmxlRmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgICAgICAgICAgIHZhciBzaWduYWwgPSBSZXF1ZXN0ICYmIFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpID8gaW5wdXQuc2lnbmFsIDogaW5pdCA/IGluaXQuc2lnbmFsIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpZiAoc2lnbmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFib3J0RXJyb3I7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhYm9ydEVycm9yID0gbmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElFIDExIGRvZXMgbm90IHN1cHBvcnQgY2FsbGluZyB0aGUgRE9NRXhjZXB0aW9uIGNvbnN0cnVjdG9yLCB1c2UgYVxuICAgICAgICAgICAgICAgICAgICAvLyByZWd1bGFyIGVycm9yIG9iamVjdCBvbiBpdCBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydEVycm9yID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGFib3J0RXJyb3IubmFtZSA9ICdBYm9ydEVycm9yJztcbiAgICAgICAgICAgICAgICB9IC8vIFJldHVybiBlYXJseSBpZiBhbHJlYWR5IGFib3J0ZWQsIHRodXMgYXZvaWRpbmcgbWFraW5nIGFuIEhUVFAgcmVxdWVzdFxuXG5cbiAgICAgICAgICAgICAgICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gLy8gVHVybiBhbiBldmVudCBpbnRvIGEgcHJvbWlzZSwgcmVqZWN0IGl0IG9uY2UgYGFib3J0YCBpcyBkaXNwYXRjaGVkXG5cblxuICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsYXRpb24gPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYWJvcnRFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdCAmJiBpbml0LnNpZ25hbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOZXZlciBwYXNzIC5zaWduYWwgdG8gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiB3aGVuIHRoZSBwb2x5ZmlsbCBoYXNcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVlbiBpbnN0YWxsZWQgYmVjYXVzZSBpZiB3ZSdyZSBydW5uaW5nIG9uIHRvcCBvZiBhIGJyb3dzZXIgd2l0aCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIHdvcmtpbmcgbmF0aXZlIEFib3J0Q29udHJvbGxlciAoaS5lLiB0aGUgcG9seWZpbGwgd2FzIGluc3RhbGxlZCBkdWUgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gX19GT1JDRV9JTlNUQUxMX0FCT1JUQ09OVFJPTExFUl9QT0xZRklMTCBiZWluZyBzZXQpLCB0aGVuIHBhc3Npbmcgb3VyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZha2UgQWJvcnRTaWduYWwgdG8gdGhlIG5hdGl2ZSBmZXRjaCB3aWxsIHRyaWdnZXI6XG4gICAgICAgICAgICAgICAgICAgIC8vIFR5cGVFcnJvcjogRmFpbGVkIHRvIGV4ZWN1dGUgJ2ZldGNoJyBvbiAnV2luZG93JzogbWVtYmVyIHNpZ25hbCBpcyBub3Qgb2YgdHlwZSBBYm9ydFNpZ25hbC5cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGluaXQuc2lnbmFsO1xuICAgICAgICAgICAgICAgIH0gLy8gUmV0dXJuIHRoZSBmYXN0ZXN0IHByb21pc2UgKGRvbuKAmXQgbmVlZCB0byB3YWl0IGZvciByZXF1ZXN0IHRvIGZpbmlzaClcblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbY2FuY2VsbGF0aW9uLCByZWFsRmV0Y2goaW5wdXQsIGluaXQpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZWFsRmV0Y2goaW5wdXQsIGluaXQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmZXRjaDogYWJvcnRhYmxlRmV0Y2gsXG4gICAgICAgICAgICBSZXF1ZXN0OiBSZXF1ZXN0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgKGZ1bmN0aW9uIChzZWxmKSB7XG5cbiAgICAgICAgaWYgKCFwb2x5ZmlsbE5lZWRlZChzZWxmKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWxmLmZldGNoKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZldGNoKCkgaXMgbm90IGF2YWlsYWJsZSwgY2Fubm90IGluc3RhbGwgYWJvcnRjb250cm9sbGVyLXBvbHlmaWxsJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2Fib3J0YWJsZUZldGNoID0gYWJvcnRhYmxlRmV0Y2hEZWNvcmF0b3Ioc2VsZiksXG4gICAgICAgICAgICBmZXRjaCA9IF9hYm9ydGFibGVGZXRjaC5mZXRjaCxcbiAgICAgICAgICAgIFJlcXVlc3QgPSBfYWJvcnRhYmxlRmV0Y2guUmVxdWVzdDtcblxuICAgICAgICBzZWxmLmZldGNoID0gZmV0Y2g7XG4gICAgICAgIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnQWJvcnRDb250cm9sbGVyJywge1xuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBBYm9ydENvbnRyb2xsZXJcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnQWJvcnRTaWduYWwnLCB7XG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IEFib3J0U2lnbmFsXG4gICAgICAgIH0pO1xuICAgIH0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiBnbG9iYWwpO1xufSk7XG5cbnZhciBjb21tb25qc0dsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge307XG5cblxuXG5mdW5jdGlvbiB1bndyYXBFeHBvcnRzICh4KSB7XG5cdHJldHVybiB4ICYmIHguX19lc01vZHVsZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ2RlZmF1bHQnKSA/IHhbJ2RlZmF1bHQnXSA6IHg7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZuLCBtb2R1bGUpIHtcblx0cmV0dXJuIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfSwgZm4obW9kdWxlLCBtb2R1bGUuZXhwb3J0cyksIG1vZHVsZS5leHBvcnRzO1xufVxuXG52YXIgcnVudGltZV8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKipcbiAgICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gICAqXG4gICAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICAgKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gICAqL1xuXG4gIHZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gICAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICAgIHZhciBkZWZpbmVQcm9wZXJ0eSQkMSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAob2JqLCBrZXksIGRlc2MpIHtcbiAgICAgIG9ialtrZXldID0gZGVzYy52YWx1ZTtcbiAgICB9O1xuICAgIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICAgIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gICAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICAgIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgICBkZWZpbmUoe30sIFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgICAgZGVmaW5lUHJvcGVydHkkJDEoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwgeyB2YWx1ZTogbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB9KTtcblxuICAgICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgICB9XG4gICAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAgIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAgIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAgIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAgIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gICAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAgIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gICAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gICAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAgIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gICAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gICAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAgIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gICAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gICAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gICAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICAgIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gICAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICAgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAgIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICAgIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuXG4gICAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICAgIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICAgIH1cblxuICAgIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICBkZWZpbmVQcm9wZXJ0eSQkMShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7IHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIGRlZmluZVByb3BlcnR5JCQxKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHsgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuXG4gICAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICAgIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gICAgfTtcblxuICAgIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICAgIH1cbiAgICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICAgIHJldHVybiBnZW5GdW47XG4gICAgfTtcblxuICAgIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAgIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gICAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAgIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gICAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgaWYgKHZhbHVlICYmICh0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZih2YWx1ZSkpID09PSBcIm9iamVjdFwiICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuXG4gICAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgICBkZWZpbmVQcm9wZXJ0eSQkMSh0aGlzLCBcIl9pbnZva2VcIiwgeyB2YWx1ZTogZW5xdWV1ZSB9KTtcbiAgICB9XG5cbiAgICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICAgIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSk7XG4gICAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAgIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuXG4gICAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAgIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kO1xuICAgICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgICAvLyBtZXRob2QsIG9yIGEgbWlzc2luZyAubmV4dCBtZWh0b2QsIGFsd2F5cyB0ZXJtaW5hdGUgdGhlXG4gICAgICAgIC8vIHlpZWxkKiBsb29wLlxuICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAobWV0aG9kTmFtZSA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRob2ROYW1lICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAnXCIgKyBtZXRob2ROYW1lICsgXCInIG1ldGhvZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gICAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICAgIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gICAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAgIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gICAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gICAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSk7XG5cbiAgICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgICB9XG5cbiAgICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpO1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gICAgfVxuICAgIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gICAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgICB9XG5cbiAgICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoc2tpcFRlbXBSZXNldCkge1xuICAgICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICAgIH0sXG5cbiAgICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihleGNlcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICAgIH0sXG5cbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH0sXG5cbiAgICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgXCJjYXRjaFwiOiBmdW5jdGlvbiBfY2F0Y2godHJ5TG9jKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgICAgfSxcblxuICAgICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gZGVsZWdhdGVZaWVsZChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gICAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gICAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gICAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICBtb2R1bGUuZXhwb3J0cyk7XG5cbiAgdHJ5IHtcbiAgICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAgIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gICAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gICAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAgIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAgIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gICAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gICAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gICAgaWYgKCh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGdsb2JhbFRoaXMpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICAgIH1cbiAgfVxufSk7XG5cbnZhciBuR3JhbV8xID0gbkdyYW07XG5cbm5HcmFtLmJpZ3JhbSA9IG5HcmFtKDIpO1xubkdyYW0udHJpZ3JhbSA9IG5HcmFtKDMpO1xuXG4vLyBGYWN0b3J5IHJldHVybmluZyBhIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgYSB2YWx1ZSBzdHJpbmcgdG8gbi1ncmFtcy5cbmZ1bmN0aW9uIG5HcmFtKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBpc05hTihuKSB8fCBuIDwgMSB8fCBuID09PSBJbmZpbml0eSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBuICsgJ2AgaXMgbm90IGEgdmFsaWQgYXJndW1lbnQgZm9yIG4tZ3JhbScpO1xuICB9XG5cbiAgcmV0dXJuIGdyYW1zO1xuXG4gIC8vIENyZWF0ZSBuLWdyYW1zIGZyb20gYSBnaXZlbiB2YWx1ZS5cbiAgZnVuY3Rpb24gZ3JhbXModmFsdWUpIHtcbiAgICB2YXIgbkdyYW1zID0gW107XG4gICAgdmFyIGluZGV4O1xuXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuR3JhbXM7XG4gICAgfVxuXG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSA/IHZhbHVlIDogU3RyaW5nKHZhbHVlKTtcbiAgICBpbmRleCA9IHZhbHVlLmxlbmd0aCAtIG4gKyAxO1xuXG4gICAgaWYgKGluZGV4IDwgMSkge1xuICAgICAgcmV0dXJuIG5HcmFtcztcbiAgICB9XG5cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgbkdyYW1zW2luZGV4XSA9IHZhbHVlLnNsaWNlKGluZGV4LCBpbmRleCArIG4pO1xuICAgIH1cblxuICAgIHJldHVybiBuR3JhbXM7XG4gIH1cbn1cblxudmFyIGJpZ3JhbXMgPSBuR3JhbV8xLmJpZ3JhbTtcblxudmFyIGRpY2VDb2VmZmljaWVudF8xID0gZGljZUNvZWZmaWNpZW50O1xuXG4vLyBHZXQgdGhlIGVkaXQtZGlzdGFuY2UgYWNjb3JkaW5nIHRvIERpY2UgYmV0d2VlbiB0d28gdmFsdWVzLlxuZnVuY3Rpb24gZGljZUNvZWZmaWNpZW50KHZhbHVlLCBhbHRlcm5hdGl2ZSkge1xuICB2YXIgdmFsID0gU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWx0ID0gU3RyaW5nKGFsdGVybmF0aXZlKS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgbGVmdCA9IHZhbC5sZW5ndGggPT09IDEgPyBbdmFsXSA6IGJpZ3JhbXModmFsKTtcbiAgdmFyIHJpZ2h0ID0gYWx0Lmxlbmd0aCA9PT0gMSA/IFthbHRdIDogYmlncmFtcyhhbHQpO1xuICB2YXIgbGVmdExlbmd0aCA9IGxlZnQubGVuZ3RoO1xuICB2YXIgcmlnaHRMZW5ndGggPSByaWdodC5sZW5ndGg7XG4gIHZhciBpbmRleCA9IC0xO1xuICB2YXIgaW50ZXJzZWN0aW9ucyA9IDA7XG4gIHZhciBsZWZ0UGFpcjtcbiAgdmFyIHJpZ2h0UGFpcjtcbiAgdmFyIG9mZnNldDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlZnRMZW5ndGgpIHtcbiAgICBsZWZ0UGFpciA9IGxlZnRbaW5kZXhdO1xuICAgIG9mZnNldCA9IC0xO1xuXG4gICAgd2hpbGUgKCsrb2Zmc2V0IDwgcmlnaHRMZW5ndGgpIHtcbiAgICAgIHJpZ2h0UGFpciA9IHJpZ2h0W29mZnNldF07XG5cbiAgICAgIGlmIChsZWZ0UGFpciA9PT0gcmlnaHRQYWlyKSB7XG4gICAgICAgIGludGVyc2VjdGlvbnMrKztcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBwYWlyIG5ldmVyIG1hdGNoZXMgYWdhaW4uXG4gICAgICAgIHJpZ2h0W29mZnNldF0gPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDIgKiBpbnRlcnNlY3Rpb25zIC8gKGxlZnRMZW5ndGggKyByaWdodExlbmd0aCk7XG59XG5cbnZhciBkaXN0ID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGZ1bmN0aW9uIHNvcnRCeSgpIHtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iajEsIG9iajIpIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIG1hcCA9IHByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9wID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgICAgIHZhciBudW1iZXJPZlByb3BlcnRpZXMgPSBwcm9wcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAocmVzdWx0ID09PSAwICYmIGkgPCBudW1iZXJPZlByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzb3J0KHByb3BzW2ldLCBtYXApKG9iajEsIG9iajIpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHMuc29ydEJ5ID0gc29ydEJ5O1xuICAgIGZ1bmN0aW9uIHNvcnQocHJvcGVydHksIG1hcCkge1xuICAgICAgICB2YXIgc29ydE9yZGVyID0gMTtcbiAgICAgICAgaWYgKHByb3BlcnR5WzBdID09PSAnLScpIHtcbiAgICAgICAgICAgIHNvcnRPcmRlciA9IC0xO1xuICAgICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BlcnR5W3Byb3BlcnR5Lmxlbmd0aCAtIDFdID09PSAnXicpIHtcbiAgICAgICAgICAgIHByb3BlcnR5ID0gcHJvcGVydHkuc3Vic3RyKDAsIHByb3BlcnR5Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgbWFwID0gZnVuY3Rpb24gbWFwKF9rZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogdmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcHBseSA9IG1hcCB8fCBmdW5jdGlvbiAoX2tleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgICAgIHZhciBtYXBwZWRBID0gYXBwbHkocHJvcGVydHksIG9iamVjdFBhdGgoYSwgcHJvcGVydHkpKTtcbiAgICAgICAgICAgIHZhciBtYXBwZWRCID0gYXBwbHkocHJvcGVydHksIG9iamVjdFBhdGgoYiwgcHJvcGVydHkpKTtcbiAgICAgICAgICAgIGlmIChtYXBwZWRBIDwgbWFwcGVkQikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwZWRBID4gbWFwcGVkQikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICogc29ydE9yZGVyO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBvYmplY3RQYXRoKG9iamVjdCwgcGF0aCkge1xuICAgICAgICB2YXIgcGF0aFBhcnRzID0gcGF0aC5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gb2JqZWN0O1xuICAgICAgICBwYXRoUGFydHMuZm9yRWFjaChmdW5jdGlvbiAocGFydCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0W3BhcnRdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59KTtcblxudW53cmFwRXhwb3J0cyhkaXN0KTtcbnZhciBkaXN0XzEgPSBkaXN0LnNvcnRCeTtcblxudmFyIEZ1c2UgPSByZXF1aXJlKCdmdXNlLmpzJyk7XG5cbmZ1bmN0aW9uIHF1ZXJ5SnNvbihxdWVyeSwgZGF0YSwgc2VhcmNoRmllbGRzKSB7XG4gIHZhciBvcHRpb25zID0ge1xuICAgIHNob3VsZFNvcnQ6IHRydWUsXG4gICAgdGhyZXNob2xkOiAwLjIsXG4gICAgbG9jYXRpb246IDAsXG4gICAgZGlzdGFuY2U6IDEwMDAsXG4gICAga2V5czogW3NlYXJjaEZpZWxkc11cbiAgfTtcbiAgdmFyIGZ1c2UgPSBuZXcgRnVzZShkYXRhLCBvcHRpb25zKTtcbiAgdmFyIHJlc3VsdCA9IGZ1c2Uuc2VhcmNoKHF1ZXJ5KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc2FuaXRpc2VUeXBlYWhlYWRUZXh0KHN0cmluZykge1xuICB2YXIgc2FuaXRpc2VkUXVlcnlSZW1vdmVDaGFycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogW107XG4gIHZhciBzYW5pdGlzZWRRdWVyeVNwbGl0TnVtc0NoYXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgdmFyIHRyaW1FbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHRydWU7XG5cbiAgdmFyIHNhbml0aXNlZFN0cmluZyA9IHN0cmluZy50b0xvd2VyQ2FzZSgpO1xuXG4gIHNhbml0aXNlZFF1ZXJ5UmVtb3ZlQ2hhcnMuZm9yRWFjaChmdW5jdGlvbiAoY2hhcikge1xuICAgIHNhbml0aXNlZFN0cmluZyA9IHNhbml0aXNlZFN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAoY2hhci50b0xvd2VyQ2FzZSgpLCAnZycpLCAnJyk7XG4gIH0pO1xuXG4gIHNhbml0aXNlZFN0cmluZyA9IHNhbml0aXNlZFN0cmluZy5yZXBsYWNlKC9cXHNcXHMrL2csICcgJyk7XG4gIHNhbml0aXNlZFN0cmluZyA9IHNhbml0aXNlZFN0cmluZy5yZXBsYWNlKCcmJywgJyUyNicpO1xuXG4gIGlmIChzYW5pdGlzZWRRdWVyeVNwbGl0TnVtc0NoYXJzKSB7XG4gICAgc2FuaXRpc2VkU3RyaW5nID0gc2FuaXRpc2VkU3RyaW5nLnJlcGxhY2UoL1xcZCg/PVthLXpdezMsfSkvZ2ksICckJiAnKTtcbiAgfVxuXG4gIHNhbml0aXNlZFN0cmluZyA9IHRyaW1FbmQgPyBzYW5pdGlzZWRTdHJpbmcudHJpbSgpIDogc2FuaXRpc2VkU3RyaW5nLnRyaW1TdGFydCgpO1xuXG4gIHJldHVybiBzYW5pdGlzZWRTdHJpbmc7XG59XG5cbnZhciBBYm9yYXRhYmxlRmV0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFib3JhdGFibGVGZXRjaCh1cmwsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQWJvcmF0YWJsZUZldGNoKTtcblxuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyB3aW5kb3cuQWJvcnRDb250cm9sbGVyKCk7XG4gICAgdGhpcy5vcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdGlvbnMsIHsgc2lnbmFsOiB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsIH0pO1xuXG4gICAgZmV0Y2godXJsLCBvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIF90aGlzLnRoZW5DYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jYXRjaENhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKEFib3JhdGFibGVGZXRjaCwgW3tcbiAgICBrZXk6IFwidGhlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aGVuKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnRoZW5DYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNhdGNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jYXRjaChjYWxsYmFjaykge1xuICAgICAgdGhpcy5jYXRjaENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWJvcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWJvcnQoKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEFib3JhdGFibGVGZXRjaDtcbn0oKTtcblxudmFyIGZldGNoJDEgPSAoZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEFib3JhdGFibGVGZXRjaCh1cmwsIG9wdGlvbnMpO1xufSk7XG5cbnZhciBiYXNlQ2xhc3MgPSAnanMtdHlwZWFoZWFkJztcblxudmFyIGNsYXNzVHlwZWFoZWFkT3B0aW9uID0gJ3R5cGVhaGVhZC1pbnB1dF9fb3B0aW9uJztcbnZhciBjbGFzc1R5cGVhaGVhZE9wdGlvbkZvY3VzZWQgPSBjbGFzc1R5cGVhaGVhZE9wdGlvbiArICctLWZvY3VzZWQnO1xudmFyIGNsYXNzVHlwZWFoZWFkT3B0aW9uTm9SZXN1bHRzID0gY2xhc3NUeXBlYWhlYWRPcHRpb24gKyAnLS1uby1yZXN1bHRzJztcbnZhciBjbGFzc1R5cGVhaGVhZE9wdGlvbk1vcmVSZXN1bHRzID0gY2xhc3NUeXBlYWhlYWRPcHRpb24gKyAnLS1tb3JlLXJlc3VsdHMgdS1mcy1zJztcbnZhciBjbGFzc1R5cGVhaGVhZEhhc1Jlc3VsdHMgPSAndHlwZWFoZWFkLWlucHV0LS1oYXMtcmVzdWx0cyc7XG52YXIgY2xhc3NUeXBlYWhlYWRSZXN1bHRzVGl0bGUgPSAndHlwZWFoZWFkLWlucHV0X19yZXN1bHRzLXRpdGxlJztcblxudmFyIFR5cGVhaGVhZFVJID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFR5cGVhaGVhZFVJKF9yZWYpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBfcmVmLmNvbnRleHQsXG4gICAgICAgICAgICB0eXBlYWhlYWREYXRhID0gX3JlZi50eXBlYWhlYWREYXRhLFxuICAgICAgICAgICAgc2FuaXRpc2VkUXVlcnlSZXBsYWNlQ2hhcnMgPSBfcmVmLnNhbml0aXNlZFF1ZXJ5UmVwbGFjZUNoYXJzLFxuICAgICAgICAgICAgc2FuaXRpc2VkUXVlcnlTcGxpdE51bXNDaGFycyA9IF9yZWYuc2FuaXRpc2VkUXVlcnlTcGxpdE51bXNDaGFycyxcbiAgICAgICAgICAgIG1pbkNoYXJzID0gX3JlZi5taW5DaGFycyxcbiAgICAgICAgICAgIHJlc3VsdExpbWl0ID0gX3JlZi5yZXN1bHRMaW1pdCxcbiAgICAgICAgICAgIHN1Z2dlc3RPbkJvb3QgPSBfcmVmLnN1Z2dlc3RPbkJvb3QsXG4gICAgICAgICAgICBvblNlbGVjdCA9IF9yZWYub25TZWxlY3QsXG4gICAgICAgICAgICBvbkVycm9yID0gX3JlZi5vbkVycm9yLFxuICAgICAgICAgICAgb25VbnNldFJlc3VsdCA9IF9yZWYub25VbnNldFJlc3VsdCxcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25GdW5jdGlvbiA9IF9yZWYuc3VnZ2VzdGlvbkZ1bmN0aW9uLFxuICAgICAgICAgICAgaGFuZGxlVXBkYXRlID0gX3JlZi5oYW5kbGVVcGRhdGUsXG4gICAgICAgICAgICBsYW5nID0gX3JlZi5sYW5nO1xuICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBUeXBlYWhlYWRVSSk7XG5cbiAgICAgICAgLy8gRE9NIEVsZW1lbnRzXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYmFzZUNsYXNzICsgJy1pbnB1dCcpO1xuICAgICAgICB0aGlzLnJlc3VsdHNDb250YWluZXIgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYmFzZUNsYXNzICsgJy1yZXN1bHRzJyk7XG4gICAgICAgIHRoaXMubGlzdGJveCA9IHRoaXMucmVzdWx0c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuJyArIGJhc2VDbGFzcyArICctbGlzdGJveCcpO1xuICAgICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGNvbnRleHQucXVlcnlTZWxlY3RvcignLicgKyBiYXNlQ2xhc3MgKyAnLWluc3RydWN0aW9ucycpO1xuICAgICAgICB0aGlzLmFyaWFTdGF0dXMgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYmFzZUNsYXNzICsgJy1hcmlhLXN0YXR1cycpO1xuICAgICAgICAvLyBTZXR0aW5nc1xuICAgICAgICB0aGlzLnR5cGVhaGVhZERhdGEgPSB0eXBlYWhlYWREYXRhIHx8IGNvbnRleHQuZ2V0QXR0cmlidXRlKCdkYXRhLXR5cGVhaGVhZC1kYXRhJyk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IEpTT04ucGFyc2UoY29udGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcpKTtcbiAgICAgICAgdGhpcy5saXN0Ym94SWQgPSB0aGlzLmxpc3Rib3guZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICB0aGlzLm1pbkNoYXJzID0gbWluQ2hhcnMgfHwgMztcbiAgICAgICAgdGhpcy5yZXN1bHRMaW1pdCA9IHJlc3VsdExpbWl0IHx8IDEwO1xuICAgICAgICB0aGlzLnN1Z2dlc3RPbkJvb3QgPSBzdWdnZXN0T25Cb290O1xuICAgICAgICB0aGlzLmxhbmcgPSBsYW5nIHx8ICdlbi1nYic7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2tzXG4gICAgICAgIHRoaXMub25TZWxlY3QgPSBvblNlbGVjdDtcbiAgICAgICAgdGhpcy5vblVuc2V0UmVzdWx0ID0gb25VbnNldFJlc3VsdDtcbiAgICAgICAgdGhpcy5vbkVycm9yID0gb25FcnJvcjtcbiAgICAgICAgdGhpcy5oYW5kbGVVcGRhdGUgPSBoYW5kbGVVcGRhdGU7XG5cbiAgICAgICAgaWYgKHN1Z2dlc3Rpb25GdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5mZXRjaFN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbkZ1bmN0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mZXRjaERhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0YXRlXG4gICAgICAgIHRoaXMuY3RybEtleSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRlbGV0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucXVlcnkgPSAnJztcbiAgICAgICAgdGhpcy5zYW5pdGlzZWRRdWVyeSA9ICcnO1xuICAgICAgICB0aGlzLnByZXZpb3VzUXVlcnkgPSAnJztcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgICAgIHRoaXMucmVzdWx0T3B0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5mb3VuZFJlc3VsdHMgPSAwO1xuICAgICAgICB0aGlzLm51bWJlck9mUmVzdWx0cyA9IDA7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRSZXN1bHRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc2V0dGluZ1Jlc3VsdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc3VsdFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmx1cnJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ibHVyVGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2FuaXRpc2VkUXVlcnlSZXBsYWNlQ2hhcnMgPSBzYW5pdGlzZWRRdWVyeVJlcGxhY2VDaGFycyB8fCBbXTtcbiAgICAgICAgdGhpcy5zYW5pdGlzZWRRdWVyeVNwbGl0TnVtc0NoYXJzID0gc2FuaXRpc2VkUXVlcnlTcGxpdE51bXNDaGFycyB8fCBmYWxzZTtcblxuICAgICAgICAvLyBUZW1wb3JhcnkgZml4IGFzIHJ1bm5lciBkb2Vzbid0IHVzZSBmdWxsIGxhbmcgY29kZVxuICAgICAgICBpZiAodGhpcy5sYW5nID09PSAnZW4nKSB7XG4gICAgICAgICAgICB0aGlzLmxhbmcgPSAnZW4tZ2InO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZVVJKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ2xhc3MoVHlwZWFoZWFkVUksIFt7XG4gICAgICAgIGtleTogJ2luaXRpYWxpc2VVSScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0aWFsaXNlVUkoKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnYXJpYS1hdXRvY29tcGxldGUnLCAnbmV3LXBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRoaXMubGlzdGJveC5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLmluc3RydWN0aW9ucy5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGFzLXBvcHVwJywgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnYXJpYS1vd25zJywgdGhpcy5saXN0Ym94LmdldEF0dHJpYnV0ZSgnaWQnKSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnbmV3LXBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgncm9sZScsICdjb21ib2JveCcpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xhc3NMaXN0LmFkZCgndHlwZWFoZWFkLWlucHV0LS1pbml0aWFsaXNlZCcpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdmZXRjaERhdGEnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZmV0Y2hEYXRhKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBmZXRjaCQxKF90aGlzLnR5cGVhaGVhZERhdGEpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjIgPSBhc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kYXRhID0gX2NvbnRleHQuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9jYWxsZWUsIF90aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoX3gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0oKSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdiaW5kRXZlbnRMaXN0ZW5lcnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYmluZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5dXAuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuaGFuZGxlQmx1ci5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5saXN0Ym94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMuaGFuZGxlTW91c2VvdmVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5saXN0Ym94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5oYW5kbGVNb3VzZW91dC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlS2V5ZG93bicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVLZXlkb3duKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmN0cmxLZXkgPSAoZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5KSAmJiBldmVudC5rZXkgIT09ICd2JztcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVSZXN1bHRzKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVSZXN1bHRzKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVLZXl1cCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVLZXl1cChldmVudCkge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkUmVzdWx0SW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJMaXN0Ym94KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0cmxLZXkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlQ2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNoYW5nZSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ibHVycmluZyAmJiB0aGlzLmlucHV0LnZhbHVlLnRyaW0oKSB8fCB0aGlzLmhhbmRsZVVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZVVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdSZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdWdnZXN0aW9ucygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFib3J0RmV0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlRm9jdXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlRm9jdXMoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ibHVyVGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLmdldFN1Z2dlc3Rpb25zKHRydWUpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVCbHVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUJsdXIoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYmx1clRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5ibHVycmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuYmx1clRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpczIuYmx1cnJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZU1vdXNlb3ZlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZW92ZXIoKSB7XG4gICAgICAgICAgICB2YXIgZm9jdXNlZEl0ZW0gPSB0aGlzLnJlc3VsdE9wdGlvbnNbdGhpcy5oaWdobGlnaHRlZFJlc3VsdEluZGV4XTtcblxuICAgICAgICAgICAgaWYgKGZvY3VzZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc1R5cGVhaGVhZE9wdGlvbkZvY3VzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVNb3VzZW91dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZW91dCgpIHtcbiAgICAgICAgICAgIHZhciBmb2N1c2VkSXRlbSA9IHRoaXMucmVzdWx0T3B0aW9uc1t0aGlzLmhpZ2hsaWdodGVkUmVzdWx0SW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAoZm9jdXNlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBmb2N1c2VkSXRlbS5jbGFzc0xpc3QuYWRkKGNsYXNzVHlwZWFoZWFkT3B0aW9uRm9jdXNlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ25hdmlnYXRlUmVzdWx0cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBuYXZpZ2F0ZVJlc3VsdHMoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXgkJDEgPSAwO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZFJlc3VsdEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaW5kZXgkJDEgPSB0aGlzLmhpZ2hsaWdodGVkUmVzdWx0SW5kZXggKyBkaXJlY3Rpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCQkMSA8IHRoaXMubnVtYmVyT2ZSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4JCQxIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCQkMSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIaWdobGlnaHRlZFJlc3VsdChpbmRleCQkMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldFN1Z2dlc3Rpb25zJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25zKGZvcmNlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBzYW5pdGlzZWRRdWVyeSA9IHNhbml0aXNlVHlwZWFoZWFkVGV4dChxdWVyeSwgdGhpcy5zYW5pdGlzZWRRdWVyeVJlcGxhY2VDaGFycywgdGhpcy5zYW5pdGlzZWRRdWVyeVNwbGl0TnVtc0NoYXJzKTtcblxuICAgICAgICAgICAgICAgIGlmIChzYW5pdGlzZWRRdWVyeSAhPT0gdGhpcy5zYW5pdGlzZWRRdWVyeSB8fCBmb3JjZSAmJiAhdGhpcy5yZXN1bHRTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2V0UmVzdWx0cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFTdGF0dXMoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FuaXRpc2VkUXVlcnkgPSBzYW5pdGlzZWRRdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2FuaXRpc2VkUXVlcnkubGVuZ3RoID49IHRoaXMubWluQ2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hTdWdnZXN0aW9ucyh0aGlzLnNhbml0aXNlZFF1ZXJ5LCB0aGlzLmRhdGEpLnRoZW4odGhpcy5oYW5kbGVSZXN1bHRzLmJpbmQodGhpcykpLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5uYW1lICE9PSAnQWJvcnRFcnJvcicgJiYgX3RoaXMzLm9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMzLm9uRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckxpc3Rib3goKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZmV0Y2hTdWdnZXN0aW9ucycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3JlZjMgPSBhc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIoc2FuaXRpc2VkUXVlcnksIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWJvcnRGZXRjaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeUpzb24oc2FuaXRpc2VkUXVlcnksIGRhdGEsIHRoaXMubGFuZywgdGhpcy5yZXN1bHRMaW1pdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBfY29udGV4dDIuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNhbml0aXNlZFRleHQgPSBzYW5pdGlzZVR5cGVhaGVhZFRleHQocmVzdWx0W190aGlzNC5sYW5nXSwgX3RoaXM0LnNhbml0aXNlZFF1ZXJ5UmVwbGFjZUNoYXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpczQubGFuZyAhPT0gJ2VuLWdiJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmdsaXNoID0gcmVzdWx0Wydlbi1nYiddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzYW5pdGlzZWRBbHRlcm5hdGl2ZSA9IHNhbml0aXNlVHlwZWFoZWFkVGV4dChlbmdsaXNoLCBfdGhpczQuc2FuaXRpc2VkUXVlcnlSZXBsYWNlQ2hhcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNhbml0aXNlZEFsdGVybmF0aXZlLm1hdGNoKHNhbml0aXNlZFF1ZXJ5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYWx0ZXJuYXRpdmVzID0gW2VuZ2xpc2hdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2FuaXRpc2VkQWx0ZXJuYXRpdmVzID0gW3Nhbml0aXNlZEFsdGVybmF0aXZlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5hbHRlcm5hdGl2ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2FuaXRpc2VkQWx0ZXJuYXRpdmVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdCgncmV0dXJuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsUmVzdWx0czogcmVzdWx0cy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBfY2FsbGVlMiwgdGhpcyk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZldGNoU3VnZ2VzdGlvbnMoX3gyLCBfeDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZldGNoU3VnZ2VzdGlvbnM7XG4gICAgICAgIH0oKVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYWJvcnRGZXRjaCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhYm9ydEZldGNoKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmV0Y2ggJiYgdGhpcy5mZXRjaC5zdGF0dXMgIT09ICdET05FJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2guYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAndW5zZXRSZXN1bHRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVuc2V0UmVzdWx0cygpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRPcHRpb25zID0gW107XG4gICAgICAgICAgICB0aGlzLnJlc3VsdFNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9uVW5zZXRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVW5zZXRSZXN1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2xlYXJMaXN0Ym94JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyTGlzdGJveChwcmV2ZW50QXJpYVN0YXR1c1VwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5saXN0Ym94LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NUeXBlYWhlYWRIYXNSZXN1bHRzKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG5cbiAgICAgICAgICAgIGlmICghcHJldmVudEFyaWFTdGF0dXNVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyaWFTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlUmVzdWx0cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVSZXN1bHRzKHJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMucmVzdWx0TGltaXQgPSByZXN1bHQubGltaXQgPyByZXN1bHQubGltaXQgOiB0aGlzLnJlc3VsdExpbWl0O1xuICAgICAgICAgICAgdGhpcy5mb3VuZFJlc3VsdHMgPSByZXN1bHQudG90YWxSZXN1bHRzO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm91bmRSZXN1bHRzID4gdGhpcy5yZXN1bHRMaW1pdCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZXN1bHRzID0gcmVzdWx0LnJlc3VsdHMuc2xpY2UoMCwgdGhpcy5yZXN1bHRMaW1pdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdC5yZXN1bHRzO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJPZlJlc3VsdHMgPSBNYXRoLm1heCh0aGlzLnJlc3VsdHMubGVuZ3RoLCAwKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlbGV0aW5nIHx8IHRoaXMubnVtYmVyT2ZSZXN1bHRzICYmIHRoaXMuZGVsZXRpbmcpIHtcbiAgICAgICAgICAgICAgICAvL0NvbW1lbnQgb3V0IGZvciB0ZXN0aW5nIG9mIG5vdCBjbGVhcmluZyBsaXN0Ym94IHdoZW4gYW5zd2VyIGlzIGZ1bGx5IHR5cGVkXG4gICAgICAgICAgICAgICAgLy9pZiAodGhpcy5udW1iZXJPZlJlc3VsdHMgPT09IDEgJiYgdGhpcy5yZXN1bHRzWzBdLnNhbml0aXNlZFRleHQgPT09IHRoaXMuc2FuaXRpc2VkUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2xlYXJMaXN0Ym94KHRydWUpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RSZXN1bHQoMCk7XG4gICAgICAgICAgICAgICAgLy99IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGJveC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdE9wdGlvbnMgPSB0aGlzLnJlc3VsdHMubWFwKGZ1bmN0aW9uIChyZXN1bHQsIGluZGV4JCQxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmlhTGFiZWwgPSByZXN1bHRbX3RoaXM1LmxhbmddO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJIVE1MID0gX3RoaXM1LmVtYm9sZGVuTWF0Y2goYXJpYUxhYmVsLCBfdGhpczUucXVlcnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdC5zYW5pdGlzZWRBbHRlcm5hdGl2ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0ZXJuYXRpdmVNYXRjaCA9IHJlc3VsdC5zYW5pdGlzZWRBbHRlcm5hdGl2ZXMuZmluZChmdW5jdGlvbiAoYWx0ZXJuYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgIT09IHJlc3VsdC5zYW5pdGlzZWRUZXh0ICYmIGFsdGVybmF0aXZlLmluY2x1ZGVzKF90aGlzNS5zYW5pdGlzZWRRdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsdGVybmF0aXZlTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0ZXJuYXRpdmVUZXh0ID0gcmVzdWx0LmFsdGVybmF0aXZlc1tyZXN1bHQuc2FuaXRpc2VkQWx0ZXJuYXRpdmVzLmluZGV4T2YoYWx0ZXJuYXRpdmVNYXRjaCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTCArPSAnIDxzbWFsbD4oJyArIF90aGlzNS5lbWJvbGRlbk1hdGNoKGFsdGVybmF0aXZlVGV4dCwgX3RoaXM1LnF1ZXJ5KSArICcpPC9zbWFsbD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbCArPSAnLCAoJyArIGFsdGVybmF0aXZlVGV4dCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzVHlwZWFoZWFkT3B0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgX3RoaXM1Lmxpc3Rib3hJZCArICdfX29wdGlvbi0tJyArIGluZGV4JCQxKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ29wdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBhcmlhTGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0RWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczUuc2VsZWN0UmVzdWx0KGluZGV4JCQxKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXM1Lmxpc3Rib3guYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNS5jb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgY2xhc3NUeXBlYWhlYWRSZXN1bHRzVGl0bGUpLmNsYXNzTGlzdC5yZW1vdmUoJ3UtZC1ubycpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0RWxlbWVudDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm51bWJlck9mUmVzdWx0cyA8IHRoaXMuZm91bmRSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzVHlwZWFoZWFkT3B0aW9uICsgJyAnICsgY2xhc3NUeXBlYWhlYWRPcHRpb25Nb3JlUmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgbGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuY29udGVudC5tb3JlX3Jlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGJveC5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzdWx0TGltaXQgPT09IDEwMCAmJiB0aGlzLmZvdW5kUmVzdWx0cyA+IHRoaXMucmVzdWx0TGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdhcm5pbmdMaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3YXJuaW5nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2FybmluZ1NwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2FybmluZ0JvZHlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTGlzdEVsZW1lbnQuY2xhc3NOYW1lID0gJ3R5cGVhaGVhZC1pbnB1dF9fd2FybmluZyc7XG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdFbGVtZW50LmNsYXNzTmFtZSA9ICdwYW5lbCBwYW5lbC0td2FybiBwYW5lbC0td2Fybi0tc21hbGwgcGFuZWwtLXNpbXBsZSc7XG5cbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ1NwYW5FbGVtZW50LmNsYXNzTmFtZSA9ICdwYW5lbF9faWNvbic7XG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdTcGFuRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ1NwYW5FbGVtZW50LmlubmVySFRNTCA9ICchJztcblxuICAgICAgICAgICAgICAgICAgICB3YXJuaW5nQm9keUVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhbmVsX19ib2R5JztcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ0JvZHlFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZm91bmRSZXN1bHRzICsgJyByZXN1bHRzIGZvdW5kLiBFbnRlciBtb3JlIG9mIHRoZSBhZGRyZXNzIHRvIGltcHJvdmUgcmVzdWx0cyc7XG5cbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQod2FybmluZ1NwYW5FbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQod2FybmluZ0JvZHlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ0xpc3RFbGVtZW50LmFwcGVuZENoaWxkKHdhcm5pbmdFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Ym94Lmluc2VydEJlZm9yZSh3YXJuaW5nTGlzdEVsZW1lbnQsIHRoaXMubGlzdGJveC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldEhpZ2hsaWdodGVkUmVzdWx0KG51bGwpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhIXRoaXMubnVtYmVyT2ZSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xhc3NMaXN0WyEhdGhpcy5udW1iZXJPZlJlc3VsdHMgPyAnYWRkJyA6ICdyZW1vdmUnXShjbGFzc1R5cGVhaGVhZEhhc1Jlc3VsdHMpO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubnVtYmVyT2ZSZXN1bHRzID09PSAwICYmIHRoaXMuY29udGVudC5ub19yZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsYXNzTGlzdC5hZGQoY2xhc3NUeXBlYWhlYWRIYXNSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucXVlcnlTZWxlY3RvcignLicgKyBjbGFzc1R5cGVhaGVhZFJlc3VsdHNUaXRsZSkuY2xhc3NMaXN0LmFkZCgndS1kLW5vJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Ym94LmlubmVySFRNTCA9ICc8bGkgY2xhc3M9XCInICsgY2xhc3NUeXBlYWhlYWRPcHRpb24gKyAnICcgKyBjbGFzc1R5cGVhaGVhZE9wdGlvbk5vUmVzdWx0cyArICdcIj4nICsgdGhpcy5jb250ZW50Lm5vX3Jlc3VsdHMgKyAnPC9saT4nO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldEhpZ2hsaWdodGVkUmVzdWx0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldEhpZ2hsaWdodGVkUmVzdWx0KGluZGV4JCQxKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZFJlc3VsdEluZGV4ID0gaW5kZXgkJDE7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkUmVzdWx0SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubnVtYmVyT2ZSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRPcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKG9wdGlvbiwgb3B0aW9uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbkluZGV4ID09PSBpbmRleCQkMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoY2xhc3NUeXBlYWhlYWRPcHRpb25Gb2N1c2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNi5pbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIG9wdGlvbi5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NUeXBlYWhlYWRPcHRpb25Gb2N1c2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmlhU3RhdHVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldEFyaWFTdGF0dXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QXJpYVN0YXR1cyhjb250ZW50KSB7XG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnlUb29TaG9ydCA9IHRoaXMuc2FuaXRpc2VkUXVlcnkubGVuZ3RoIDwgdGhpcy5taW5DaGFycztcbiAgICAgICAgICAgICAgICB2YXIgbm9SZXN1bHRzID0gdGhpcy5udW1iZXJPZlJlc3VsdHMgPT09IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAocXVlcnlUb29TaG9ydCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jb250ZW50LmFyaWFfbWluX2NoYXJzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9SZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQuYXJpYV9ub19yZXN1bHRzICsgJzogXCInICsgdGhpcy5xdWVyeSArICdcIic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm51bWJlck9mUmVzdWx0cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jb250ZW50LmFyaWFfb25lX3Jlc3VsdDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jb250ZW50LmFyaWFfbl9yZXN1bHRzLnJlcGxhY2UoJ3tufScsIHRoaXMubnVtYmVyT2ZSZXN1bHRzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRMaW1pdCAmJiB0aGlzLmZvdW5kUmVzdWx0cyA+IHRoaXMucmVzdWx0TGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAnICsgdGhpcy5jb250ZW50LmFyaWFfbGltaXRlZF9yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcmlhU3RhdHVzLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdFJlc3VsdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RSZXN1bHQoaW5kZXgkJDEpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1Jlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5yZXN1bHRzW2luZGV4JCQxIHx8IHRoaXMuaGlnaGxpZ2h0ZWRSZXN1bHRJbmRleCB8fCAwXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0U2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zYW5pdGlzZWRUZXh0ICE9PSB0aGlzLnNhbml0aXNlZFF1ZXJ5ICYmIHJlc3VsdC5zYW5pdGlzZWRBbHRlcm5hdGl2ZXMgJiYgcmVzdWx0LnNhbml0aXNlZEFsdGVybmF0aXZlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJlc3RNYXRjaGluZ0FsdGVybmF0aXZlID0gcmVzdWx0LnNhbml0aXNlZEFsdGVybmF0aXZlcy5tYXAoZnVuY3Rpb24gKGFsdGVybmF0aXZlLCBpbmRleCQkMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogZGljZUNvZWZmaWNpZW50XzEoX3RoaXM3LnNhbml0aXNlZFF1ZXJ5LCBhbHRlcm5hdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4JCQxXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KS5zb3J0KGRpc3RfMSgnc2NvcmUnKSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3JlZFNhbml0aXNlZCA9IGRpY2VDb2VmZmljaWVudF8xKHRoaXMuc2FuaXRpc2VkUXVlcnksIHJlc3VsdC5zYW5pdGlzZWRUZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoaW5nQWx0ZXJuYXRpdmUuc2NvcmUgPj0gc2NvcmVkU2FuaXRpc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGxheVRleHQgPSByZXN1bHQuYWx0ZXJuYXRpdmVzW2Jlc3RNYXRjaGluZ0FsdGVybmF0aXZlLmluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwbGF5VGV4dCA9IHJlc3VsdFt0aGlzLmxhbmddO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BsYXlUZXh0ID0gcmVzdWx0W3RoaXMubGFuZ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QocmVzdWx0KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzNy5zZXR0aW5nUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXJpYU1lc3NhZ2UgPSB0aGlzLmNvbnRlbnQuYXJpYV95b3VfaGF2ZV9zZWxlY3RlZCArICc6ICcgKyByZXN1bHQuZGlzcGxheVRleHQgKyAnLic7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTGlzdGJveCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJpYVN0YXR1cyhhcmlhTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2VtYm9sZGVuTWF0Y2gnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZW1ib2xkZW5NYXRjaChzdHJpbmcsIHF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cCh0aGlzLmVzY2FwZVJlZ0V4cChxdWVyeSkuc3BsaXQoJycpLmpvaW4oJ1tcXFxccyxdKicpLCAnZ2knKTtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZWcsICc8c3Ryb25nPiQmPC9zdHJvbmc+Jyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2VzY2FwZVJlZ0V4cCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XG4gICAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIFR5cGVhaGVhZFVJO1xufSgpO1xuXG52YXIgVHlwZWFoZWFkID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUeXBlYWhlYWQoY29udGV4dCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFR5cGVhaGVhZCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMubGFuZyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2xhbmcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMudHlwZWFoZWFkID0gbmV3IFR5cGVhaGVhZFVJKHtcbiAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICBsYW5nOiB0aGlzLmxhbmcsXG4gICAgICBvblNlbGVjdDogdGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpLFxuICAgICAgb25VbnNldFJlc3VsdDogdGhpcy5vblVuc2V0UmVzdWx0LmJpbmQodGhpcyksXG4gICAgICBvbkVycm9yOiB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKVxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoVHlwZWFoZWFkLCBbe1xuICAgIGtleTogJ29uU2VsZWN0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25TZWxlY3QocmVzdWx0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgX3RoaXMudHlwZWFoZWFkLmlucHV0LnZhbHVlID0gcmVzdWx0LmRpc3BsYXlUZXh0O1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblVuc2V0UmVzdWx0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25VbnNldFJlc3VsdCgpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkVycm9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUeXBlYWhlYWQ7XG59KCk7XG5cbmZ1bmN0aW9uIHR5cGVhaGVhZHMoKSB7XG4gIHZhciB0eXBlYWhlYWRzID0gW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10eXBlYWhlYWQnKSkpO1xuXG4gIHR5cGVhaGVhZHMuZm9yRWFjaChmdW5jdGlvbiAodHlwZWFoZWFkKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlYWhlYWQodHlwZWFoZWFkKTtcbiAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RZUEVBSEVBRC1SRUFEWScsIHR5cGVhaGVhZHMpO1xuXG5mdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlRXZlbnQoZWxlbWVudCkge1xuICBpZiAoJ2NyZWF0ZUV2ZW50JyBpbiBkb2N1bWVudCkge1xuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKTtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmZpcmVFdmVudCgnb25jaGFuZ2UnKTtcbiAgfVxufVxuXG52YXIgQWJvcnRhYmxlRmV0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFib3J0YWJsZUZldGNoKHVybCwgb3B0aW9ucykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEFib3J0YWJsZUZldGNoKTtcblxuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5jb250cm9sbGVyID0gbmV3IHdpbmRvdy5BYm9ydENvbnRyb2xsZXIoKTtcbiAgICB0aGlzLnN0YXR1cyA9ICdVTlNFTlQnO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoQWJvcnRhYmxlRmV0Y2gsIFt7XG4gICAga2V5OiAnc2VuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlbmQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLnN0YXR1cyA9ICdMT0FESU5HJztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgYWJvcnRhYmxlRmV0Y2goX3RoaXMudXJsLCBfZXh0ZW5kcyh7IHNpZ25hbDogX3RoaXMuY29udHJvbGxlci5zaWduYWwgfSwgX3RoaXMub3B0aW9ucykpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICBfdGhpcy5zdGF0dXMgPSAnRE9ORSc7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuc3RhdHVzID0gJ0RPTkUnO1xuICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIF90aGlzLnN0YXR1cyA9ICdET05FJztcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Fib3J0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWJvcnQoKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEFib3J0YWJsZUZldGNoO1xufSgpO1xuXG5mdW5jdGlvbiBhYm9ydGFibGVGZXRjaCh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHdpbmRvdy5mZXRjaCh1cmwsIG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgICAgIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgIHRocm93IGVycm9yO1xuICB9KTtcbn1cblxudmFyIGNsYXNzQWRkcmVzcyA9ICdqcy1hZGRyZXNzJztcbnZhciBiYXNlQ2xhc3MkMSA9ICdqcy1hZGRyZXNzLXR5cGVhaGVhZCc7XG52YXIgY2xhc3NPcmdhbmlzYXRpb24gPSAnanMtYWRkcmVzcy1vcmdhbmlzYXRpb24nO1xudmFyIGNsYXNzTGluZTEgPSAnanMtYWRkcmVzcy1saW5lLTEnO1xudmFyIGNsYXNzTGluZTIgPSAnanMtYWRkcmVzcy1saW5lLTInO1xudmFyIGNsYXNzVG93biA9ICdqcy1hZGRyZXNzLXRvd24nO1xudmFyIGNsYXNzUG9zdGNvZGUgPSAnanMtYWRkcmVzcy1wb3N0Y29kZSc7XG52YXIgY2xhc3NTZWFyY2hCdXR0b25Db250YWluZXIgPSAnanMtYWRkcmVzcy1zZWFyY2gtYnRuLWNvbnRhaW5lcic7XG52YXIgY2xhc3NTZWFyY2hCdXR0b24gPSAnanMtYWRkcmVzcy1zZWFyY2gtYnRuJztcbnZhciBjbGFzc01hbnVhbEJ1dHRvbiA9ICdqcy1hZGRyZXNzLW1hbnVhbC1idG4nO1xudmFyIGNsYXNzTm90RWRpdGFibGUgPSAnanMtYWRkcmVzcy1ub3QtZWRpdGFibGUnO1xudmFyIGNsYXNzUkhMb29rdXAgPSAnanMtcmgtYWRkcmVzcy1sb29rdXAnO1xuXG52YXIgQWRkcmVzc0lucHV0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBZGRyZXNzSW5wdXQoY29udGV4dCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEFkZHJlc3NJbnB1dCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMub3JnYW5pc2F0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsYXNzT3JnYW5pc2F0aW9uKTtcbiAgICB0aGlzLmxpbmUxID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsYXNzTGluZTEpO1xuICAgIHRoaXMubGluZTIgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgY2xhc3NMaW5lMik7XG4gICAgdGhpcy50b3duID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsYXNzVG93bik7XG4gICAgdGhpcy5wb3N0Y29kZSA9IGNvbnRleHQucXVlcnlTZWxlY3RvcignLicgKyBjbGFzc1Bvc3Rjb2RlKTtcbiAgICB0aGlzLm1hbnVhbElucHV0cyA9IFt0aGlzLmxpbmUxLCB0aGlzLmxpbmUyLCB0aGlzLnRvd24sIHRoaXMucG9zdGNvZGVdO1xuICAgIHRoaXMuc2VhcmNoQnV0dG9uQ29udGFpbmVyID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsYXNzU2VhcmNoQnV0dG9uQ29udGFpbmVyKTtcbiAgICB0aGlzLnNlYXJjaEJ1dHRvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvcignLicgKyBjbGFzc1NlYXJjaEJ1dHRvbik7XG4gICAgdGhpcy5tYW51YWxCdXR0b24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgY2xhc3NNYW51YWxCdXR0b24pO1xuICAgIHRoaXMuZm9ybSA9IGNvbnRleHQuY2xvc2VzdCgnZm9ybScpO1xuICAgIHRoaXMubGFuZyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2xhbmcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuYWRkcmVzc1JlcGxhY2VDaGFycyA9IFsnLCddO1xuICAgIHRoaXMuc2FuaXRpc2VkUXVlcnlTcGxpdE51bXNDaGFycyA9IHRydWU7XG5cbiAgICAvLyBTdGF0ZVxuICAgIHRoaXMubWFudWFsTW9kZSA9IHRydWU7XG4gICAgdGhpcy5jdXJyZW50UXVlcnkgPSBudWxsO1xuICAgIHRoaXMuZmV0Y2ggPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFJlc3VsdHMgPSBbXTtcbiAgICB0aGlzLnRvdGFsUmVzdWx0cyA9IDA7XG4gICAgdGhpcy5lcnJvcmVkID0gZmFsc2U7XG4gICAgdGhpcy5hZGRyZXNzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzRWRpdGFibGUgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgY2xhc3NOb3RFZGl0YWJsZSkgPyBmYWxzZSA6IHRydWU7XG4gICAgdGhpcy5pc1JoTG9va3VwID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsYXNzUkhMb29rdXApID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLy8gSW5pdGlhbGlzZSB0eXBlYWhlYWRcbiAgICB0aGlzLnR5cGVhaGVhZCA9IG5ldyBUeXBlYWhlYWRVSSh7XG4gICAgICBjb250ZXh0OiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYmFzZUNsYXNzJDEpLFxuICAgICAgb25TZWxlY3Q6IHRoaXMub25BZGRyZXNzU2VsZWN0LmJpbmQodGhpcyksXG4gICAgICBvblVuc2V0UmVzdWx0OiB0aGlzLm9uVW5zZXRBZGRyZXNzLmJpbmQodGhpcyksXG4gICAgICBzdWdnZXN0aW9uRnVuY3Rpb246IHRoaXMuc3VnZ2VzdEFkZHJlc3Nlcy5iaW5kKHRoaXMpLFxuICAgICAgb25FcnJvcjogdGhpcy5vbkVycm9yLmJpbmQodGhpcyksXG4gICAgICBzYW5pdGlzZWRRdWVyeVJlcGxhY2VDaGFyczogdGhpcy5hZGRyZXNzUmVwbGFjZUNoYXJzLFxuICAgICAgc2FuaXRpc2VkUXVlcnlTcGxpdE51bXNDaGFyczogdGhpcy5zYW5pdGlzZWRRdWVyeVNwbGl0TnVtc0NoYXJzLFxuICAgICAgbWluQ2hhcnM6IDUsXG4gICAgICBzdWdnZXN0T25Cb290OiB0cnVlLFxuICAgICAgaGFuZGxlVXBkYXRlOiB0cnVlXG4gICAgfSk7XG5cbiAgICAvLyBCaW5kIEV2ZW50IExpc3RlbmVyc1xuICAgIGlmICh0aGlzLnNlYXJjaEJ1dHRvbikge1xuICAgICAgdGhpcy5zZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU1vZGUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWFudWFsQnV0dG9uKSB7XG4gICAgICB0aGlzLm1hbnVhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTW9kZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKCEodGhpcy5saW5lMS52YWx1ZSB8fCB0aGlzLmxpbmUyLnZhbHVlIHx8IHRoaXMudG93bi52YWx1ZSkpIHtcbiAgICAgIHRoaXMudG9nZ2xlTW9kZSgpO1xuICAgIH1cblxuICAgIHRoaXMuc2VhcmNoQnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3UtZC1ubycpO1xuXG4gICAgdGhpcy5iYXNlVVJMID0gJ2h0dHBzOi8vd2hpdGVsb2RnZS1haS1hcGkuY2Vuc3VzLWdjcC5vbnNkaWdpdGFsLnVrL2FkZHJlc3Nlcy8nO1xuICAgIHRoaXMubG9va3VwVVJMID0gdGhpcy5iYXNlVVJMICsgJ2VxP2lucHV0PSc7XG4gICAgdGhpcy5yZXRyaWV2ZVVSTCA9IHRoaXMuYmFzZVVSTCArICdyaC91cHJuLyc7XG5cbiAgICB0aGlzLnVzZXIgPSAnZXF1c2VyJztcbiAgICB0aGlzLnBhc3N3b3JkID0gJyQ0Y0BlYzF6TEJ1JztcbiAgICB0aGlzLmF1dGggPSBidG9hKHRoaXMudXNlciArICc6JyArIHRoaXMucGFzc3dvcmQpO1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcbiAgICAgICdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcgKyB0aGlzLmF1dGhcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKEFkZHJlc3NJbnB1dCwgW3tcbiAgICBrZXk6ICd0b2dnbGVNb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlTW9kZSgpIHtcbiAgICAgIHZhciBjbGVhcklucHV0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcblxuICAgICAgdGhpcy5zZXRNYW51YWxNb2RlKCF0aGlzLm1hbnVhbE1vZGUsIGNsZWFySW5wdXRzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRNYW51YWxNb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0TWFudWFsTW9kZShtYW51YWwsIGNsZWFySW5wdXRzKSB7XG4gICAgICB0aGlzLmNvbnRleHQuY2xhc3NMaXN0W21hbnVhbCA/ICdyZW1vdmUnIDogJ2FkZCddKCdhZGRyZXNzLWlucHV0LS1zZWFyY2gnKTtcblxuICAgICAgaWYgKGNsZWFySW5wdXRzKSB7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkLnVuc2V0UmVzdWx0cygpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFudWFsKSB7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFudWFsTW9kZSA9IG1hbnVhbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzdWdnZXN0QWRkcmVzc2VzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3VnZ2VzdEFkZHJlc3NlcyhxdWVyeSkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRRdWVyeSA9PT0gcXVlcnkgJiYgX3RoaXMuY3VycmVudFF1ZXJ5Lmxlbmd0aCAmJiBfdGhpcy5jdXJyZW50UmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHJlc3VsdHM6IF90aGlzLmN1cnJlbnRSZXN1bHRzLFxuICAgICAgICAgICAgdG90YWxSZXN1bHRzOiBfdGhpcy5jdXJyZW50UmVzdWx0cy5sZW5ndGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5jdXJyZW50UXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICBfdGhpcy5jdXJyZW50UmVzdWx0cyA9IFtdO1xuXG4gICAgICAgICAgaWYgKF90aGlzLmZldGNoICYmIF90aGlzLmZldGNoLnN0YXR1cyAhPT0gJ0RPTkUnKSB7XG4gICAgICAgICAgICBfdGhpcy5mZXRjaC5hYm9ydCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICBfdGhpcy5maW5kQWRkcmVzcyhxdWVyeSkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmaW5kQWRkcmVzcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpbmRBZGRyZXNzKHRleHQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdGVzdElucHV0ID0gX3RoaXMyLnRlc3RGdWxsUG9zdGNvZGVRdWVyeSh0ZXh0KTtcbiAgICAgICAgdmFyIGxpbWl0ID0gdGVzdElucHV0ID8gMTAwIDogMTA7XG4gICAgICAgIHZhciBxdWVyeVVybCA9IF90aGlzMi5sb29rdXBVUkwgKyB0ZXh0ICsgJyZsaW1pdD0nICsgbGltaXQ7XG4gICAgICAgIF90aGlzMi5mZXRjaCA9IG5ldyBBYm9ydGFibGVGZXRjaChxdWVyeVVybCwge1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgaGVhZGVyczogX3RoaXMyLmhlYWRlcnNcbiAgICAgICAgfSk7XG4gICAgICAgIF90aGlzMi5mZXRjaC5zZW5kKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIF9yZWYgPSBhc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfY29udGV4dC5zZW50LnJlc3BvbnNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMyLm1hcEZpbmRSZXN1bHRzKGRhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIF9jYWxsZWUsIF90aGlzMik7XG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDIpIHtcbiAgICAgICAgICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSgpKS5jYXRjaChyZWplY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWFwRmluZFJlc3VsdHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXBGaW5kUmVzdWx0cyhyZXN1bHRzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIHVwZGF0ZWRSZXN1bHRzID0gdm9pZCAwLFxuICAgICAgICAgIG1hcHBlZFJlc3VsdHMgPSB2b2lkIDAsXG4gICAgICAgICAgbGltaXQgPSB2b2lkIDA7XG4gICAgICB2YXIgYWRkcmVzc2VzID0gcmVzdWx0cy5hZGRyZXNzZXM7XG4gICAgICB2YXIgdG90YWwgPSByZXN1bHRzLnRvdGFsO1xuICAgICAgdmFyIG9yaWdpbmFsTGltaXQgPSAxMDtcbiAgICAgIGlmIChyZXN1bHRzLnBhcnRwb3N0Y29kZSkge1xuICAgICAgICB2YXIgcG9zdGNvZGVHcm91cHMgPSByZXN1bHRzLnBvc3Rjb2RlcztcbiAgICAgICAgbWFwcGVkUmVzdWx0cyA9IHBvc3Rjb2RlR3JvdXBzLm1hcChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgICB2YXIgcG9zdGNvZGUgPSBfcmVmMi5wb3N0Y29kZSxcbiAgICAgICAgICAgICAgc3RyZWV0TmFtZSA9IF9yZWYyLnN0cmVldE5hbWUsXG4gICAgICAgICAgICAgIHRvd25OYW1lID0gX3JlZjIudG93bk5hbWUsXG4gICAgICAgICAgICAgIGFkZHJlc3NDb3VudCA9IF9yZWYyLmFkZHJlc3NDb3VudCxcbiAgICAgICAgICAgICAgZmlyc3RVcHJuID0gX3JlZjIuZmlyc3RVcHJuO1xuXG4gICAgICAgICAgdmFyIGFkZHJlc3NUZXh0ID0gYWRkcmVzc0NvdW50ID09PSAxID8gJ2FkZHJlc3MnIDogJ2FkZHJlc3Nlcyc7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdlbi1nYic6IHN0cmVldE5hbWUgKyAnLCAnICsgdG93bk5hbWUgKyAnLCAnICsgcG9zdGNvZGUgKyAnICg8c3BhbiBjbGFzcz1cImdyb3VwLXRleHRcIj4nICsgYWRkcmVzc0NvdW50ICsgJyAnICsgYWRkcmVzc1RleHQgKyAnPC9zcGFuPiknLFxuICAgICAgICAgICAgcG9zdGNvZGU6IHBvc3Rjb2RlLFxuICAgICAgICAgICAgZmlyc3RVcHJuOiBmaXJzdFVwcm4sXG4gICAgICAgICAgICBhZGRyZXNzQ291bnQ6IGFkZHJlc3NDb3VudFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpbWl0ID0gb3JpZ2luYWxMaW1pdDtcbiAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0cyA9IG1hcHBlZFJlc3VsdHMuc29ydCgpO1xuICAgICAgfSBlbHNlIGlmIChhZGRyZXNzZXNbMF0pIHtcbiAgICAgICAgaWYgKGFkZHJlc3Nlc1swXSAmJiBhZGRyZXNzZXNbMF0uYmVzdE1hdGNoQWRkcmVzcykge1xuICAgICAgICAgIHVwZGF0ZWRSZXN1bHRzID0gYWRkcmVzc2VzLm1hcChmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgICAgICAgIHZhciB1cHJuID0gX3JlZjMudXBybixcbiAgICAgICAgICAgICAgICBiZXN0TWF0Y2hBZGRyZXNzID0gX3JlZjMuYmVzdE1hdGNoQWRkcmVzcztcbiAgICAgICAgICAgIHJldHVybiB7IHVwcm46IHVwcm4sIGFkZHJlc3M6IGJlc3RNYXRjaEFkZHJlc3MgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaW1pdCA9IG9yaWdpbmFsTGltaXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYWRkcmVzc2VzWzBdICYmIGFkZHJlc3Nlc1swXS5mb3JtYXR0ZWRBZGRyZXNzKSB7XG4gICAgICAgICAgdXBkYXRlZFJlc3VsdHMgPSBhZGRyZXNzZXMubWFwKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgICAgICAgdmFyIHVwcm4gPSBfcmVmNC51cHJuLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZEFkZHJlc3MgPSBfcmVmNC5mb3JtYXR0ZWRBZGRyZXNzO1xuICAgICAgICAgICAgcmV0dXJuIHsgdXBybjogdXBybiwgYWRkcmVzczogZm9ybWF0dGVkQWRkcmVzcyB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxpbWl0ID0gMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFwcGVkUmVzdWx0cyA9IHVwZGF0ZWRSZXN1bHRzLm1hcChmdW5jdGlvbiAoX3JlZjUpIHtcbiAgICAgICAgICB2YXIgdXBybiA9IF9yZWY1LnVwcm4sXG4gICAgICAgICAgICAgIGFkZHJlc3MgPSBfcmVmNS5hZGRyZXNzO1xuXG4gICAgICAgICAgdmFyIHNhbml0aXNlZFRleHQgPSBzYW5pdGlzZVR5cGVhaGVhZFRleHQoYWRkcmVzcywgX3RoaXMzLmFkZHJlc3NSZXBsYWNlQ2hhcnMpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnZW4tZ2InOiBhZGRyZXNzLFxuICAgICAgICAgICAgc2FuaXRpc2VkVGV4dDogc2FuaXRpc2VkVGV4dCxcbiAgICAgICAgICAgIHVwcm46IHVwcm5cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHRzID0gbWFwcGVkUmVzdWx0cy5zb3J0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHRzID0gYWRkcmVzc2VzO1xuICAgICAgICBsaW1pdCA9IG9yaWdpbmFsTGltaXQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdHM6IHRoaXMuY3VycmVudFJlc3VsdHMsXG4gICAgICAgIHRvdGFsUmVzdWx0czogdG90YWwsXG4gICAgICAgIGxpbWl0OiBsaW1pdFxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZXRyaWV2ZUFkZHJlc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXRyaWV2ZUFkZHJlc3MoaWQpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcXVlcnlVcmwgPSBfdGhpczQucmV0cmlldmVVUkwgKyBpZCArICc/YWRkcmVzc3R5cGU9cGFmJztcbiAgICAgICAgX3RoaXM0LmZldGNoID0gbmV3IEFib3J0YWJsZUZldGNoKHF1ZXJ5VXJsLCB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBoZWFkZXJzOiBfdGhpczQuaGVhZGVyc1xuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpczQuZmV0Y2guc2VuZCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBfcmVmNiA9IGFzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlMihyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9jb250ZXh0Mi5zZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgX2NhbGxlZTIsIF90aGlzNCk7XG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChfeDMpIHtcbiAgICAgICAgICAgIHJldHVybiBfcmVmNi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0oKSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Rlc3RGdWxsUG9zdGNvZGVRdWVyeScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRlc3RGdWxsUG9zdGNvZGVRdWVyeShpbnB1dCkge1xuICAgICAgdmFyIGZ1bGxQb3N0Y29kZVJlZ2V4ID0gL1xcYigoPzooPzpnaXIpfCg/OlthLXByLXV3eXpdKSg/Oig/OlswLTldKD86W2EtaGprcHN0dXddfFswLTldKT8pfCg/OlthLWhrLXldWzAtOV0oPzpbMC05XXxbYWJlaG1ucHJ2LXldKT8pKSkpID8oWzAtOV1bYWJkLWhqbG5wLXV3LXpdezJ9KVxcYi9pO1xuICAgICAgdmFyIHRlc3RGdWxsUG9zdGNvZGUgPSBmdWxsUG9zdGNvZGVSZWdleC50ZXN0KGlucHV0KTtcbiAgICAgIGlmICh0ZXN0RnVsbFBvc3Rjb2RlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uQWRkcmVzc1NlbGVjdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQWRkcmVzc1NlbGVjdChzZWxlY3RlZFJlc3VsdCkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChzZWxlY3RlZFJlc3VsdC51cHJuICYmICFzZWxlY3RlZFJlc3VsdC5hZGRyZXNzQ291bnQpIHtcbiAgICAgICAgICBfdGhpczUucmV0cmlldmVBZGRyZXNzKHNlbGVjdGVkUmVzdWx0LnVwcm4pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChfdGhpczUuaXNFZGl0YWJsZSkge1xuICAgICAgICAgICAgICBfdGhpczUuc2V0QWRkcmVzcyhkYXRhLCByZXNvbHZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzNS50eXBlYWhlYWQuaW5wdXQudmFsdWUgPSBzZWxlY3RlZFJlc3VsdC5kaXNwbGF5VGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlLmFkZHJlc3MuY2Vuc3VzQWRkcmVzc1R5cGUpIHtcbiAgICAgICAgICAgICAgdmFyIHJoQWRkcmVzc1R5cGVJbnB1dCA9IF90aGlzNS5jb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yaC1hZGRyZXNzLXR5cGUnKTtcbiAgICAgICAgICAgICAgdmFyIHJoQWRkcmVzc0NvdW50cnlJbnB1dCA9IF90aGlzNS5jb250ZXh0LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yaC1hZGRyZXNzLWNvdW50cnknKTtcbiAgICAgICAgICAgICAgcmhBZGRyZXNzVHlwZUlucHV0LnZhbHVlID0gZGF0YS5yZXNwb25zZS5hZGRyZXNzLmNlbnN1c0FkZHJlc3NUeXBlO1xuICAgICAgICAgICAgICByaEFkZHJlc3NDb3VudHJ5SW5wdXQudmFsdWUgPSBkYXRhLnJlc3BvbnNlLmFkZHJlc3MuY291bnRyeUNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJlc3VsdC5wb3N0Y29kZSAmJiBzZWxlY3RlZFJlc3VsdC5hZGRyZXNzQ291bnQgPiAwKSB7XG4gICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHtcbiAgICAgICAgICAgICdidWJibGVzJzogdHJ1ZSxcbiAgICAgICAgICAgICdjYW5jZWxhYmxlJzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIF90aGlzNS50eXBlYWhlYWQuaW5wdXQudmFsdWUgPSBzZWxlY3RlZFJlc3VsdC5wb3N0Y29kZTtcbiAgICAgICAgICBfdGhpczUudHlwZWFoZWFkLmlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgX3RoaXM1LnR5cGVhaGVhZC5pbnB1dC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0QWRkcmVzcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEFkZHJlc3MoZGF0YSwgcmVzb2x2ZSkge1xuICAgICAgdGhpcy5jbGVhck1hbnVhbElucHV0cyhmYWxzZSk7XG4gICAgICB2YXIgdmFsdWUgPSBkYXRhLnJlc3BvbnNlLmFkZHJlc3M7XG4gICAgICBpZiAodmFsdWUuYWRkcmVzc0xpbmUzKSB7XG4gICAgICAgIHRoaXMubGluZTEudmFsdWUgPSB2YWx1ZS5hZGRyZXNzTGluZTEgKyAnLCAnICsgdmFsdWUuYWRkcmVzc0xpbmUyO1xuICAgICAgICB0aGlzLmxpbmUyLnZhbHVlID0gdmFsdWUuYWRkcmVzc0xpbmUzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5saW5lMS52YWx1ZSA9IHZhbHVlLmFkZHJlc3NMaW5lMTtcbiAgICAgICAgdGhpcy5saW5lMi52YWx1ZSA9IHZhbHVlLmFkZHJlc3NMaW5lMjtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b3duLnZhbHVlID0gdmFsdWUudG93bk5hbWU7XG4gICAgICB0aGlzLnBvc3Rjb2RlLnZhbHVlID0gdmFsdWUucG9zdGNvZGU7XG5cbiAgICAgIHRoaXMudHJpZ2dlck1hbnVhbElucHV0c0NoYW5nZXMoKTtcblxuICAgICAgdGhpcy5hZGRyZXNzU2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLnNldE1hbnVhbE1vZGUodHJ1ZSwgZmFsc2UpO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2xlYXJNYW51YWxJbnB1dHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhck1hbnVhbElucHV0cygpIHtcbiAgICAgIHZhciB0cmlnZ2VyQ2hhbmdlJCQxID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICB0aGlzLm1hbnVhbElucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlJCQxKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlck1hbnVhbElucHV0c0NoYW5nZXMoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGRyZXNzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyTWFudWFsSW5wdXRzQ2hhbmdlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXJNYW51YWxJbnB1dHNDaGFuZ2VzKCkge1xuICAgICAgdGhpcy5tYW51YWxJbnB1dHMuZm9yRWFjaCh0cmlnZ2VyQ2hhbmdlRXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uVW5zZXRBZGRyZXNzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25VbnNldEFkZHJlc3MoKSB7XG4gICAgICB0aGlzLmNsZWFyTWFudWFsSW5wdXRzKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25FcnJvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuZmV0Y2gpIHtcbiAgICAgICAgdGhpcy5mZXRjaC5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IGVycm9yIG1lc3NhZ2UgZnJvbSBmaXJpbmcgdHdpY2VcbiAgICAgIGlmICghdGhpcy5lcnJvcmVkKSB7XG4gICAgICAgIHRoaXMuZXJyb3JlZCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpczYuZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVTdWJtaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5tYW51YWxNb2RlICYmIHRoaXMudHlwZWFoZWFkLmlucHV0LnZhbHVlLnRyaW0oKSAmJiAhdGhpcy5hZGRyZXNzU2VsZWN0ZWQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB3aW5kb3cuRE9OVF9TVUJNSVQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudHlwZWFoZWFkLnNob3dFcnJvclBhbmVsKCk7XG4gICAgICAgIHRoaXMudHlwZWFoZWFkLnNldEFyaWFTdGF0dXMoJ1RoZXJlIGlzIGFuIGVycm9yLiBTZWxlY3QgYW4gYWRkcmVzcycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LkRPTlRfU1VCTUlUID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBZGRyZXNzSW5wdXQ7XG59KCk7XG5cbmZ1bmN0aW9uIGFkZHJlc3NJbnB1dCgpIHtcbiAgdmFyIGFkZHJlc3NJbnB1dHMgPSBbXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBjbGFzc0FkZHJlc3MpKSk7XG5cbiAgYWRkcmVzc0lucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChhZGRyZXNzSW5wdXQpIHtcbiAgICByZXR1cm4gbmV3IEFkZHJlc3NJbnB1dChhZGRyZXNzSW5wdXQpO1xuICB9KTtcbn1cblxuYWRkcmVzc0lucHV0KCk7XG5cbnZhciBVQUMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFVBQyhjb250ZXh0KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgVUFDKTtcblxuICAgIHRoaXMuaW5wdXQgPSBjb250ZXh0O1xuICAgIHZhciBncm91cFNpemUgPSBwYXJzZUludChjb250ZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1ncm91cC1zaXplJyksIDEwKTtcbiAgICB0aGlzLmdyb3VwaW5nUmVnZXggPSBuZXcgUmVnRXhwKCcuezEsJyArIGdyb3VwU2l6ZSArICd9JywgJ2cnKTtcblxuICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhVQUMsIFt7XG4gICAga2V5OiAnYmluZEV2ZW50TGlzdGVuZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmluZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGFuZGxlSW5wdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVJbnB1dCgpIHtcbiAgICAgIHZhciBjdXJzb3JQb3NpdGlvbiA9IHRoaXMuaW5wdXQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICB2YXIgc2hvdWxkUmVwb3NpdGlvbkN1cnNvciA9IGN1cnNvclBvc2l0aW9uICE9PSB0aGlzLmlucHV0LnZhbHVlLmxlbmd0aDtcblxuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICh0aGlzLmlucHV0LnZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJykubWF0Y2godGhpcy5ncm91cGluZ1JlZ2V4KSB8fCBbXSkuam9pbignICcpO1xuXG4gICAgICBpZiAoc2hvdWxkUmVwb3NpdGlvbkN1cnNvcikge1xuICAgICAgICB0aGlzLmlucHV0LnNldFNlbGVjdGlvblJhbmdlKGN1cnNvclBvc2l0aW9uLCBjdXJzb3JQb3NpdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBVQUM7XG59KCk7XG5cbmZ1bmN0aW9uIHJ1blVBQygpIHtcbiAgdmFyIHVhY0lucHV0cyA9IFtdLmNvbmNhdCh0b0NvbnN1bWFibGVBcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtdWFjJykpKTtcblxuICBpZiAodWFjSW5wdXRzLmxlbmd0aCkge1xuICAgIHVhY0lucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gbmV3IFVBQyhlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdVQUMtUkVBRFknLCBydW5VQUMpO1xuXG52YXIgaW5wdXRDbGFzc0xpbWl0UmVhY2hlZCA9ICdpbnB1dC0tbGltaXQtcmVhY2hlZCc7XG52YXIgcmVtYWluaW5nQ2xhc3NMaW1pdFJlYWNoZWQgPSAnaW5wdXRfX2xpbWl0LS1yZWFjaGVkJztcbnZhciBhdHRyQ2hhckNoZWNrUmVmID0gJ2RhdGEtY2hhci1jaGVjay1yZWYnO1xudmFyIGF0dHJDaGFyQ2hlY2tWYWwgPSAnZGF0YS1jaGFyLWNoZWNrLW51bSc7XG5cbnZhciBDaGFyQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENoYXJDaGVjayhjb250ZXh0KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2hhckNoZWNrKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuY29udGV4dC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgIHRoaXMuY2hlY2tFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pbnB1dC5nZXRBdHRyaWJ1dGUoYXR0ckNoYXJDaGVja1JlZikpO1xuICAgIHRoaXMuY2hlY2tWYWwgPSB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZShhdHRyQ2hhckNoZWNrVmFsKTtcblxuICAgIHRoaXMuY2hhckxpbWl0U2luZ3VsYXJNZXNzYWdlID0gdGhpcy5jaGVja0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNoYXJjb3VudC1saW1pdC1zaW5ndWxhcicpO1xuICAgIHRoaXMuY2hhckxpbWl0UGx1cmFsTWVzc2FnZSA9IHRoaXMuY2hlY2tFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1jaGFyY291bnQtbGltaXQtcGx1cmFsJyk7XG5cbiAgICB0aGlzLnVwZGF0ZUNoZWNrUmVhZG91dChudWxsLCB0cnVlKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy51cGRhdGVDaGVja1JlYWRvdXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhDaGFyQ2hlY2ssIFt7XG4gICAga2V5OiAndXBkYXRlQ2hlY2tSZWFkb3V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlQ2hlY2tSZWFkb3V0KGV2ZW50LCBmaXJzdFJ1bikge1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgIHZhciByZW1haW5pbmcgPSB0aGlzLmNoZWNrVmFsIC0gdmFsdWUubGVuZ3RoO1xuICAgICAgLy8gUHJldmVudCBhcmlhIGxpdmUgYW5ub3VuY2VtZW50IHdoZW4gY29tcG9uZW50IGluaXRpYWxpc2VzXG4gICAgICBpZiAoIWZpcnN0UnVuICYmIGV2ZW50LmlucHV0VHlwZSkge1xuICAgICAgICB0aGlzLmNoZWNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1saXZlJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tSZW1haW5pbmcocmVtYWluaW5nKTtcbiAgICAgIHRoaXMuc2V0Q2hlY2tDbGFzcyhyZW1haW5pbmcsIHRoaXMuaW5wdXQsIGlucHV0Q2xhc3NMaW1pdFJlYWNoZWQpO1xuICAgICAgdGhpcy5zZXRDaGVja0NsYXNzKHJlbWFpbmluZywgdGhpcy5jaGVja0VsZW1lbnQsIHJlbWFpbmluZ0NsYXNzTGltaXRSZWFjaGVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjaGVja1JlbWFpbmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrUmVtYWluaW5nKHJlbWFpbmluZykge1xuICAgICAgdmFyIG1lc3NhZ2UgPSB2b2lkIDA7XG4gICAgICBpZiAocmVtYWluaW5nID09PSAtMSkge1xuICAgICAgICBtZXNzYWdlID0gdGhpcy5jaGFyTGltaXRTaW5ndWxhck1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY2hlY2tFbGVtZW50LmlubmVyVGV4dCA9IG1lc3NhZ2UucmVwbGFjZSgne3h9JywgTWF0aC5hYnMocmVtYWluaW5nKSk7XG4gICAgICB9IGVsc2UgaWYgKHJlbWFpbmluZyA8IC0xKSB7XG4gICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNoYXJMaW1pdFBsdXJhbE1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY2hlY2tFbGVtZW50LmlubmVyVGV4dCA9IG1lc3NhZ2UucmVwbGFjZSgne3h9JywgTWF0aC5hYnMocmVtYWluaW5nKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFNob3dNZXNzYWdlKHJlbWFpbmluZyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0U2hvd01lc3NhZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTaG93TWVzc2FnZShyZW1haW5pbmcpIHtcbiAgICAgIHRoaXMuY2hlY2tFbGVtZW50LmNsYXNzTGlzdFtyZW1haW5pbmcgPCAwID8gJ3JlbW92ZScgOiAnYWRkJ10oJ3UtZC1ubycpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NldENoZWNrQ2xhc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRDaGVja0NsYXNzKHJlbWFpbmluZywgZWxlbWVudCwgc2V0Q2xhc3MpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0W3JlbWFpbmluZyA8IDAgPyAnYWRkJyA6ICdyZW1vdmUnXShzZXRDbGFzcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDaGFyQ2hlY2s7XG59KCk7XG5cbnZhciBjaGVja2VkV3JhcHBlciA9IFtdLmNvbmNhdCh0b0NvbnN1bWFibGVBcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtY2hhci1jaGVjaycpKSk7XG5pZiAoY2hlY2tlZFdyYXBwZXIubGVuZ3RoKSB7XG4gIGNoZWNrZWRXcmFwcGVyLmZvckVhY2goZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgcmV0dXJuIG5ldyBDaGFyQ2hlY2soaW5wdXQpO1xuICB9KTtcbn1cblxudmFyIGV2ZW50UmVhZHkgPSAnRE9NQ29udGVudExvYWRlZCc7XG5cbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBpc1JlYWR5ID0gZmFsc2U7XG5cbnZhciBvblJlYWR5ID0gZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgaXNSZWFkeSA9IHRydWU7XG4gIGNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBmbi5jYWxsKCk7XG4gIH0pO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50UmVhZHksIG9uUmVhZHkpO1xufTtcblxuZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKGlzUmVhZHkpIHtcbiAgICBmbi5jYWxsKCk7XG4gIH0gZWxzZSB7XG4gICAgY2FsbGJhY2tzLnB1c2goZm4pO1xuICB9XG59XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnKSB7XG4gIG9uUmVhZHkuY2FsbCgpO1xufSBlbHNlIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFJlYWR5LCBvblJlYWR5KTtcbn1cblxucmVhZHkoZnVuY3Rpb24gKCkge1xuICB2YXIgcHJldmlvdXNVUkwgPSB2b2lkIDA7XG4gIHZhciB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICB2YXIgcGVyc29uSUQgPSB1cmxQYXJhbXMuZ2V0KCdwZXJzb25faWQnKTtcblxuICB2YXIgcGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIHZhciBwYWdlRGF0YSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncGFnZURhdGEnKSk7XG5cbiAgaWYgKHBhZ2VEYXRhKSB7XG4gICAgcHJldmlvdXNVUkwgPSBwYWdlRGF0YVtwYXRoTmFtZV07XG4gIH1cblxuICBpZiAocHJldmlvdXNVUkwpIHtcbiAgICB2YXIgY3VycmVudEpvdXJuZXlzID0gW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1wcmV2aW91cy1saW5rJykpKTtcblxuICAgIGN1cnJlbnRKb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHByZXZpb3VzVVJMICsgKHBlcnNvbklEID8gJz9wZXJzb25faWQ9JyArIHBlcnNvbklEIDogJycpKTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxudmFyIF9hcnJheUVhY2ggPSBhcnJheUVhY2g7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxudmFyIF9jcmVhdGVCYXNlRm9yID0gY3JlYXRlQmFzZUZvcjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gX2NyZWF0ZUJhc2VGb3IoKTtcblxudmFyIF9iYXNlRm9yID0gYmFzZUZvcjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIF9iYXNlVGltZXMgPSBiYXNlVGltZXM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IF90eXBlb2YoY29tbW9uanNHbG9iYWwpID09ICdvYmplY3QnICYmIGNvbW1vbmpzR2xvYmFsICYmIGNvbW1vbmpzR2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGNvbW1vbmpzR2xvYmFsO1xuXG52YXIgX2ZyZWVHbG9iYWwgPSBmcmVlR2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzZWxmKSkgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBfZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG52YXIgX3Jvb3QgPSByb290O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBfU3ltYm9sMiA9IF9yb290LlN5bWJvbDtcblxudmFyIF9TeW1ib2wgPSBfU3ltYm9sMjtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvJDIgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSQyID0gb2JqZWN0UHJvdG8kMi5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8kMi50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWckMSA9IF9TeW1ib2wgPyBfU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eSQyLmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnJDEpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWckMV07XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZyQxXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZyQxXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnJDFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgX2dldFJhd1RhZyA9IGdldFJhd1RhZztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvJDMgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmckMSA9IG9iamVjdFByb3RvJDMudG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmckMS5jYWxsKHZhbHVlKTtcbn1cblxudmFyIF9vYmplY3RUb1N0cmluZyA9IG9iamVjdFRvU3RyaW5nO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJztcbnZhciB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBfU3ltYm9sID8gX1N5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkgPyBfZ2V0UmF3VGFnKHZhbHVlKSA6IF9vYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbnZhciBfYmFzZUdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSAnb2JqZWN0Jztcbn1cblxudmFyIGlzT2JqZWN0TGlrZV8xID0gaXNPYmplY3RMaWtlO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlXzEodmFsdWUpICYmIF9iYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG52YXIgX2Jhc2VJc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvJDEgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSQxID0gb2JqZWN0UHJvdG8kMS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90byQxLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBfYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cztcbn0oKSkgPyBfYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2VfMSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkkMS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiYgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbnZhciBpc0FyZ3VtZW50c18xID0gaXNBcmd1bWVudHM7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgaXNBcnJheV8xID0gaXNBcnJheTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgc3R1YkZhbHNlXzEgPSBzdHViRmFsc2U7XG5cbnZhciBpc0J1ZmZlcl8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xuICB2YXIgZnJlZUV4cG9ydHMgPSAnb2JqZWN0JyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xuICB2YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmICdvYmplY3QnID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuICAvKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xuICB2YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuICAvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbiAgdmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyBfcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbiAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xuICB2YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSA0LjMuMFxuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIHZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZV8xO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gaXNCdWZmZXI7XG59KTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbnZhciBfaXNJbmRleCA9IGlzSW5kZXg7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIkMSA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUiQxO1xufVxuXG52YXIgaXNMZW5ndGhfMSA9IGlzTGVuZ3RoO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyQxID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nO1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXSc7XG52YXIgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJztcbnZhciBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXSc7XG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXSc7XG52YXIgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXSc7XG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG52YXIgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXSc7XG52YXIgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG52YXIgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG52YXIgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbnZhciBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG52YXIgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nO1xudmFyIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJztcbnZhciBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XSc7XG52YXIgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XSc7XG52YXIgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XSc7XG52YXIgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XSc7XG52YXIgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJztcbnZhciB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nO1xudmFyIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWckMV0gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0TGlrZV8xKHZhbHVlKSAmJiBpc0xlbmd0aF8xKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tfYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG52YXIgX2Jhc2VJc1R5cGVkQXJyYXkgPSBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG52YXIgX2Jhc2VVbmFyeSA9IGJhc2VVbmFyeTtcblxudmFyIF9ub2RlVXRpbCA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbiAgdmFyIGZyZWVFeHBvcnRzID0gJ29iamVjdCcgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbiAgdmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiAnb2JqZWN0JyA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbiAgLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbiAgdmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG4gIHZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgX2ZyZWVHbG9iYWwucHJvY2VzcztcblxuICAvKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbiAgdmFyIG5vZGVVdGlsID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSgpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gbm9kZVV0aWw7XG59KTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gX25vZGVVdGlsICYmIF9ub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gX2Jhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IF9iYXNlSXNUeXBlZEFycmF5O1xuXG52YXIgaXNUeXBlZEFycmF5XzEgPSBpc1R5cGVkQXJyYXk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5XzEodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHNfMSh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyXzEodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheV8xKHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gX2Jhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiYgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgIGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykgfHxcbiAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSB8fFxuICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICBfaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIF9hcnJheUxpa2VLZXlzID0gYXJyYXlMaWtlS2V5cztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvJDUgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSB8fCBvYmplY3RQcm90byQ1O1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbnZhciBfaXNQcm90b3R5cGUgPSBpc1Byb3RvdHlwZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG52YXIgX292ZXJBcmcgPSBvdmVyQXJnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IF9vdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG52YXIgX25hdGl2ZUtleXMgPSBuYXRpdmVLZXlzO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8kNCA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5JDMgPSBvYmplY3RQcm90byQ0Lmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghX2lzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gX25hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQzLmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgX2Jhc2VLZXlzID0gYmFzZUtleXM7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbnZhciBpc09iamVjdF8xID0gaXNPYmplY3Q7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJztcbnZhciBmdW5jVGFnJDEgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xudmFyIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG52YXIgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0XzEodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IF9iYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnJDEgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG52YXIgaXNGdW5jdGlvbl8xID0gaXNGdW5jdGlvbjtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGhfMSh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uXzEodmFsdWUpO1xufVxuXG52YXIgaXNBcnJheUxpa2VfMSA9IGlzQXJyYXlMaWtlO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZV8xKG9iamVjdCkgPyBfYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogX2Jhc2VLZXlzKG9iamVjdCk7XG59XG5cbnZhciBrZXlzXzEgPSBrZXlzO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIF9iYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNfMSk7XG59XG5cbnZhciBfYmFzZUZvck93biA9IGJhc2VGb3JPd247XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGlmICghaXNBcnJheUxpa2VfMShjb2xsZWN0aW9uKSkge1xuICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChjb2xsZWN0aW9uKTtcblxuICAgIHdoaWxlIChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG52YXIgX2NyZWF0ZUJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2g7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IF9jcmVhdGVCYXNlRWFjaChfYmFzZUZvck93bik7XG5cbnZhciBfYmFzZUVhY2ggPSBiYXNlRWFjaDtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIGlkZW50aXR5XzEgPSBpZGVudGl0eTtcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGBpZGVudGl0eWAgaWYgaXQncyBub3QgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBjYXN0IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjYXN0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nID8gdmFsdWUgOiBpZGVudGl0eV8xO1xufVxuXG52YXIgX2Nhc3RGdW5jdGlvbiA9IGNhc3RGdW5jdGlvbjtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICogb3IgYF8uZm9yT3duYCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAYWxpYXMgZWFjaFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZm9yRWFjaChbMSwgMl0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXlfMShjb2xsZWN0aW9uKSA/IF9hcnJheUVhY2ggOiBfYmFzZUVhY2g7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIF9jYXN0RnVuY3Rpb24oaXRlcmF0ZWUpKTtcbn1cblxudmFyIGZvckVhY2hfMSA9IGZvckVhY2g7XG5cbnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgY2xhc3NUcmlnZ2VyID0gJ2pzLWlucGFnZWxpbmsnO1xuXG4gIGZ1bmN0aW9uIGluUGFnZUxpbmsoKSB7XG4gICAgdmFyIG5vZGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc1RyaWdnZXIpO1xuICAgIGZvckVhY2hfMShub2RlTGlzdCwgYXBwbHlJblBhZ2VMaW5rKTtcbiAgICByZXR1cm4gbm9kZUxpc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUluUGFnZUxpbmsoZWxUcmlnZ2VyKSB7XG4gICAgdmFyIGVsSWQgPSBlbFRyaWdnZXIuZ2V0QXR0cmlidXRlKCdocmVmJykucmVwbGFjZSgnIycsICcnKTtcbiAgICBlbFRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZm9jdXNPbklucHV0KGVsSWQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgZWxUcmlnZ2VyOiBlbFRyaWdnZXIsIGVsSWQ6IGVsSWQgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzT25JbnB1dChlbElkKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsSWQpLmNsb3Nlc3QoJy5wYW5lbCcpO1xuICAgIGNvbnNvbGUubG9nKGNvbnRhaW5lcik7XG4gICAgY29udGFpbmVyLnNjcm9sbEludG9WaWV3KCk7XG5cbiAgICB2YXIgaW5wdXQgPSBbXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkoY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdJTlBVVCcpKSwgdG9Db25zdW1hYmxlQXJyYXkoY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdURVhUQVJFQScpKSwgdG9Db25zdW1hYmxlQXJyYXkoY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTRUxFQ1QnKSkpLmZpbHRlcihmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIHZhciB0eXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJyk7XG5cbiAgICAgIHJldHVybiB0eXBlICE9PSAncmVhZG9ubHknICYmIHR5cGUgIT09ICdoaWRkZW4nICYmIHR5cGUgIT09ICdjaGVja2JveCcgJiYgdHlwZSAhPT0gJ3JhZGlvJztcbiAgICB9KVswXTtcblxuICAgIGlmIChpbnB1dCkge1xuICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsSWQ7XG4gIH1cblxuICBpblBhZ2VMaW5rKCk7XG59KTtcblxuZnVuY3Rpb24gYXV0b0luY3JlbWVudElkKGNvbGxlY3Rpb24pIHtcbiAgdmFyIGsgPSBjb2xsZWN0aW9uICsgJy1pbmNyZW1lbnQnLFxuICAgICAgaWQgPSBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGspKSB8fCAwO1xuXG4gIGlkKys7XG5cbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrLCBKU09OLnN0cmluZ2lmeShpZCkpO1xuXG4gIHJldHVybiBpZDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRnJvbUxpc3QobGlzdCwgdmFsKSB7XG5cbiAgZnVuY3Rpb24gZG9SZW1vdmUoaXRlbSkge1xuICAgIHZhciBmb3VuZElkID0gbGlzdC5pbmRleE9mKGl0ZW0pO1xuXG4gICAgLyoqXG4gICAgICogR3VhcmRcbiAgICAgKi9cbiAgICBpZiAoZm91bmRJZCA9PT0gLTEpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdBdHRlbXB0IHRvIHJlbW92ZSBmcm9tIGxpc3QgZmFpbGVkOiAnLCBsaXN0LCB2YWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxpc3Quc3BsaWNlKGZvdW5kSWQsIDEpO1xuICB9XG5cbiAgaWYgKF8uaXNBcnJheSh2YWwpKSB7XG4gICAgJC5lYWNoKHZhbCwgZnVuY3Rpb24gKGksIGl0ZW0pIHtcbiAgICAgIGRvUmVtb3ZlKGl0ZW0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRvUmVtb3ZlKHZhbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJhaWxpbmdOYW1lUyhuYW1lKSB7XG4gIHJldHVybiBuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICdzJyA/ICdcXCYjeDIwMTk7JyA6ICdcXCYjeDIwMTk7cyc7XG59XG5cbnZhciBIT1VTRUhPTERfTUVNQkVSU19TVE9SQUdFX0tFWSA9ICdob3VzZWhvbGQtbWVtYmVycyc7XG52YXIgVVNFUl9IT1VTRUhPTERfTUVNQkVSX0lEID0gJ3BlcnNvbl9tZSc7XG52YXIgSE9VU0VIT0xEX01FTUJFUl9UWVBFID0gJ2hvdXNlaG9sZC1tZW1iZXInO1xudmFyIFZJU0lUT1JfVFlQRSA9ICd2aXNpdG9yJztcblxuLyoqXG4gKiBUeXBlc1xuICovXG5mdW5jdGlvbiBwZXJzb24ob3B0cywgY2hhbmdlKSB7XG4gIGlmIChvcHRzLmZpcnN0TmFtZSA9PT0gJycgfHwgb3B0cy5sYXN0TmFtZSA9PT0gJycpIHtcbiAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIGNyZWF0ZSBwZXJzb24gd2l0aCBkYXRhOiAnLCBvcHRzLmZpcnN0TmFtZSwgIW9wdHMubWlkZGxlTmFtZSwgIW9wdHMubGFzdE5hbWUpO1xuICB9XG4gIHZhciBmdWxsTmFtZSA9IG9wdHMuZmlyc3ROYW1lICsgJyAnICsgb3B0cy5sYXN0TmFtZTtcbiAgdmFyIG1pZGRsZU5hbWUgPSBvcHRzLm1pZGRsZU5hbWUgfHwgJyc7XG4gIHZhciBtZW1iZXJGb3VuZCA9IGhvdXNlaG9sZE1lbWJlckV4aXN0QnlGdWxsTmFtZShmdWxsTmFtZSk7XG4gIGlmIChtZW1iZXJGb3VuZCkge1xuICAgIHZhciBtaWRkbGVOYW1lQ2hlY2sgPSBKU09OLnN0cmluZ2lmeShtZW1iZXJGb3VuZFsnQHBlcnNvbiddLmZ1bGxOYW1lKS5zcGxpdCgnICcpLmxlbmd0aDtcbiAgICBpZiAoY2hhbmdlICYmIG1pZGRsZU5hbWVDaGVjayA8IDMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZ1bGxOYW1lOiBmdWxsTmFtZSxcbiAgICAgICAgZmlyc3RMYXN0TmFtZTogZnVsbE5hbWUsXG4gICAgICAgIGZpcnN0TmFtZTogb3B0cy5maXJzdE5hbWUsXG4gICAgICAgIG1pZGRsZU5hbWU6IG1pZGRsZU5hbWUsXG4gICAgICAgIGxhc3ROYW1lOiBvcHRzLmxhc3ROYW1lXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBtZW1iZXJGb3VuZFsnQHBlcnNvbiddLmZ1bGxOYW1lID0gbWVtYmVyRm91bmRbJ0BwZXJzb24nXS5maXJzdE5hbWUgKyAnICcgKyBtZW1iZXJGb3VuZFsnQHBlcnNvbiddLm1pZGRsZU5hbWUgKyAnICcgKyBtZW1iZXJGb3VuZFsnQHBlcnNvbiddLmxhc3ROYW1lO1xuICAgICAgbWVtYmVyRm91bmQgPSBtZW1iZXJGb3VuZFsnQHBlcnNvbiddO1xuICAgICAgdXBkYXRlSG91c2Vob2xkTWVtYmVyKG1lbWJlckZvdW5kLCB7IHR5cGU6ICdob3VzZWhvbGQtbWVtYmVyJyB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZ1bGxOYW1lOiBvcHRzLmZpcnN0TmFtZSArICcgJyArIG1pZGRsZU5hbWUgKyAnICcgKyBvcHRzLmxhc3ROYW1lLFxuICAgICAgICBmaXJzdExhc3ROYW1lOiBmdWxsTmFtZSxcbiAgICAgICAgZmlyc3ROYW1lOiBvcHRzLmZpcnN0TmFtZSxcbiAgICAgICAgbWlkZGxlTmFtZTogbWlkZGxlTmFtZSxcbiAgICAgICAgbGFzdE5hbWU6IG9wdHMubGFzdE5hbWVcbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBmaXJzdExhc3ROYW1lOiBvcHRzLmZpcnN0TmFtZSArICcgJyArIG9wdHMubGFzdE5hbWUsXG4gICAgICBmaXJzdE5hbWU6IG9wdHMuZmlyc3ROYW1lLFxuICAgICAgbWlkZGxlTmFtZTogbWlkZGxlTmFtZSxcbiAgICAgIGxhc3ROYW1lOiBvcHRzLmxhc3ROYW1lLFxuICAgICAgZnVsbE5hbWU6IG9wdHMuZmlyc3ROYW1lICsgJyAnICsgb3B0cy5sYXN0TmFtZVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBTdG9yYWdlXG4gKi9cbmZ1bmN0aW9uIGdldFVzZXJBc0hvdXNlaG9sZE1lbWJlcigpIHtcbiAgcmV0dXJuIGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKS5maW5kKGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICByZXR1cm4gbWVtYmVyWydAcGVyc29uJ10uaWQgPT09IFVTRVJfSE9VU0VIT0xEX01FTUJFUl9JRDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVVzZXJBc0hvdXNlaG9sZE1lbWJlcigpIHtcbiAgZGVsZXRlSG91c2Vob2xkTWVtYmVyKFVTRVJfSE9VU0VIT0xEX01FTUJFUl9JRCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUhvdXNlaG9sZE1lbWJlcihwZXJzb25JZCkge1xuICB2YXIgbWVtYmVycyA9IGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKS5maWx0ZXIoZnVuY3Rpb24gKG1lbWJlcikge1xuICAgIHJldHVybiBtZW1iZXJbJ0BwZXJzb24nXS5pZCAhPT0gcGVyc29uSWQ7XG4gIH0pO1xuXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oSE9VU0VIT0xEX01FTUJFUlNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KG1lbWJlcnMpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVXNlckFzSG91c2Vob2xkTWVtYmVyKHBlcnNvbiwgbWVtYmVyRGF0YSkge1xuICB2YXIgdXNlckFzSG91c2Vob2xkTWVtYmVyID0gZ2V0VXNlckFzSG91c2Vob2xkTWVtYmVyKCk7XG5cbiAgdXNlckFzSG91c2Vob2xkTWVtYmVyID8gdXBkYXRlSG91c2Vob2xkTWVtYmVyKF9leHRlbmRzKHt9LCB1c2VyQXNIb3VzZWhvbGRNZW1iZXJbJ0BwZXJzb24nXSwgcGVyc29uKSwgbWVtYmVyRGF0YSkgOiBhZGRIb3VzZWhvbGRNZW1iZXIocGVyc29uLCBtZW1iZXJEYXRhLCBVU0VSX0hPVVNFSE9MRF9NRU1CRVJfSUQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVIb3VzZWhvbGRNZW1iZXIocGVyc29uLCBtZW1iZXJEYXRhKSB7XG4gIHZhciBtZW1iZXJzVXBkYXRlZCA9IGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKS5tYXAoZnVuY3Rpb24gKG1lbWJlcikge1xuICAgIHJldHVybiBtZW1iZXJbJ0BwZXJzb24nXS5pZCA9PT0gcGVyc29uLmlkID8gX2V4dGVuZHMoe30sIG1lbWJlciwgbWVtYmVyRGF0YSwgeyAnQHBlcnNvbic6IF9leHRlbmRzKHt9LCBtZW1iZXJbJ0BwZXJzb24nXSwgcGVyc29uKSB9KSA6IG1lbWJlcjtcbiAgfSk7XG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oSE9VU0VIT0xEX01FTUJFUlNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KG1lbWJlcnNVcGRhdGVkKSk7XG59XG5cbmZ1bmN0aW9uIGFkZEhvdXNlaG9sZE1lbWJlcihwZXJzb24sIG1lbWJlckRhdGEsIGlkKSB7XG4gIHZhciBwZW9wbGUgPSBnZXRBbGxIb3VzZWhvbGRNZW1iZXJzKCkgfHwgW107XG4gIG1lbWJlckRhdGEgPSBtZW1iZXJEYXRhIHx8IHt9O1xuXG4gIC8qKlxuICAgKiBVc2VyIGlzIGFsd2F5cyBmaXJzdCBpbiB0aGUgaG91c2Vob2xkIGxpc3RcbiAgICovXG4gIHBlb3BsZVtpZCA9PT0gVVNFUl9IT1VTRUhPTERfTUVNQkVSX0lEID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXShfZXh0ZW5kcyh7fSwgbWVtYmVyRGF0YSwge1xuICAgIHR5cGU6IG1lbWJlckRhdGEudHlwZSB8fCBIT1VTRUhPTERfTUVNQkVSX1RZUEUsXG4gICAgJ0BwZXJzb24nOiBfZXh0ZW5kcyh7fSwgcGVyc29uLCB7XG4gICAgICBpZDogaWQgfHwgJ3BlcnNvbicgKyBhdXRvSW5jcmVtZW50SWQoJ2hvdXNlaG9sZC1tZW1iZXJzJylcbiAgICB9KVxuICB9KSk7XG5cbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShIT1VTRUhPTERfTUVNQkVSU19TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkocGVvcGxlKSk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oSE9VU0VIT0xEX01FTUJFUlNfU1RPUkFHRV9LRVkpKSB8fCBbXTtcbn1cblxuZnVuY3Rpb24gZ2V0SG91c2Vob2xkTWVtYmVyQnlQZXJzb25JZChpZCkge1xuICByZXR1cm4gZ2V0QWxsSG91c2Vob2xkTWVtYmVycygpLmZpbmQoZnVuY3Rpb24gKG1lbWJlcikge1xuICAgIHJldHVybiBtZW1iZXJbJ0BwZXJzb24nXS5pZCA9PT0gaWQ7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBob3VzZWhvbGRNZW1iZXJFeGlzdEJ5RnVsbE5hbWUoZnVsbE5hbWUpIHtcbiAgcmV0dXJuIGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKS5maW5kKGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICByZXR1cm4gbWVtYmVyWydAcGVyc29uJ10uZmlyc3ROYW1lLnRvTG93ZXJDYXNlKCkgKyAnICcgKyBtZW1iZXJbJ0BwZXJzb24nXS5sYXN0TmFtZS50b0xvd2VyQ2FzZSgpID09PSBmdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TWVtYmVyUGVyc29uSWQobWVtYmVyKSB7XG4gIHJldHVybiBtZW1iZXJbJ0BwZXJzb24nXS5pZDtcbn1cblxuLyoqXG4gKiBDb21wYXJhdG9yc1xuICovXG5mdW5jdGlvbiBpc1Zpc2l0b3IobWVtYmVyKSB7XG4gIHJldHVybiBtZW1iZXIudHlwZSA9PT0gd2luZG93Lk9OUy5zdG9yYWdlLktFWVMuVklTSVRPUl9UWVBFO1xufVxuXG5mdW5jdGlvbiBpc0hvdXNlaG9sZE1lbWJlcihtZW1iZXIpIHtcbiAgcmV0dXJuIG1lbWJlci50eXBlID09PSB3aW5kb3cuT05TLnN0b3JhZ2UuS0VZUy5IT1VTRUhPTERfTUVNQkVSX1RZUEU7XG59XG5cbmZ1bmN0aW9uIGlzT3RoZXJIb3VzZWhvbGRNZW1iZXIobWVtYmVyKSB7XG4gIHJldHVybiBtZW1iZXIudHlwZSA9PT0gd2luZG93Lk9OUy5zdG9yYWdlLktFWVMuSE9VU0VIT0xEX01FTUJFUl9UWVBFICYmIG1lbWJlclsnQHBlcnNvbiddLmlkICE9PSB3aW5kb3cuT05TLnN0b3JhZ2UuSURTLlVTRVJfSE9VU0VIT0xEX01FTUJFUl9JRDtcbn1cblxudmFyIHRlbXBBd2F5UXVlc3Rpb25TZW50ZW5jZU1hcCA9IHtcbiAgJ3RocmVlLW1vcmUnOiAnUGVvcGxlIHdobyB1c3VhbGx5IGxpdmUgb3V0c2lkZSB0aGUgVUsgd2hvIGFyZSBzdGF5aW5nIGluIHRoZSBVSyBmb3IgPHN0cm9uZz4zIG1vbnRocyBvciBtb3JlPC9zdHJvbmc+JyxcbiAgJ3Blcm0tYXdheSc6ICdQZW9wbGUgd2hvIHdvcmsgYXdheSBmcm9tIGhvbWUgd2l0aGluIHRoZSBVSyBpZiB0aGlzIGlzIHRoZWlyIHBlcm1hbmVudCBvciBmYW1pbHkgaG9tZScsXG4gICdhcm1lZC1mb3JjZXMnOiAnTWVtYmVycyBvZiB0aGUgYXJtZWQgZm9yY2VzIGlmIHRoaXMgaXMgdGhlaXIgcGVybWFuZW50IG9yIGZhbWlseSBob21lJyxcbiAgJ2xlc3MtdHdlbHZlJzogJ1Blb3BsZSB3aG8gYXJlIHRlbXBvcmFyaWx5IG91dHNpZGUgdGhlIFVLIGZvciBsZXNzIHRoYW4gPHN0cm9uZz4xMiBtb250aHM8L3N0cm9uZz4nLFxuICAndXN1YWxseS10ZW1wJzogJ1Blb3BsZSBzdGF5aW5nIHRlbXBvcmFyaWx5IHdobyB1c3VhbGx5IGxpdmUgaW4gdGhlIFVLIGJ1dCcgKyAnIGRvIG5vdCBoYXZlIGFub3RoZXIgVUsgYWRkcmVzcyBmb3IgZXhhbXBsZSwgcmVsYXRpdmVzLCBmcmllbmRzJyxcbiAgJ290aGVyJzogJ090aGVyIHBlb3BsZSB3aG8gdXN1YWxseSBsaXZlIGhlcmUgYnV0IGFyZSB0ZW1wb3JhcmlseSBhd2F5J1xufTtcblxudmFyIHZpc2l0b3JRdWVzdGlvblNlbnRlbmNlTWFwID0ge1xuICAndXN1YWxseS1pbi11ayc6ICdQZW9wbGUgd2hvIHVzdWFsbHkgbGl2ZSBzb21ld2hlcmUgZWxzZSBpbiB0aGUgVUssIGZvciBleGFtcGxlIGJveS9naXJsZnJpZW5kcywgZnJpZW5kcyBvciByZWxhdGl2ZXMnLFxuICAnc2Vjb25kLWFkZHJlc3MnOiAnUGVvcGxlIHN0YXlpbmcgaGVyZSBiZWNhdXNlIGl0IGlzIHRoZWlyIHNlY29uZCBhZGRyZXNzLCBmb3IgZXhhbXBsZSwgZm9yIHdvcmsuIFRoZWlyIHBlcm1hbmVudCBvciBmYW1pbHkgaG9tZSBpcyBlbHNld2hlcmUnLFxuICAnbGVzcy10aHJlZSc6ICdQZW9wbGUgd2hvIHVzdWFsbHkgbGl2ZSBvdXRzaWRlIHRoZSBVSyB3aG8gYXJlIHN0YXlpbmcgaW4gdGhlIFVLIGZvciBsZXNzIHRoYW4gdGhyZWUgbW9udGhzJyxcbiAgJ29uLWhvbGlkYXknOiAnUGVvcGxlIGhlcmUgb24gaG9saWRheSdcbn07XG5cbi8qKlxuICogQXVnbWVudCBVbmRlcnNjb3JlIGxpYnJhcnlcbiAqL1xudmFyIF8kMSA9IHdpbmRvdy5fIHx8IHt9O1xuXG52YXIgUkVMQVRJT05TSElQU19TVE9SQUdFX0tFWSA9ICdyZWxhdGlvbnNoaXBzJztcblxudmFyIHJlbGF0aW9uc2hpcFR5cGVzID0ge1xuICAnc3BvdXNlJzogeyBpZDogJ3Nwb3VzZScgfSxcbiAgJ2NoaWxkLXBhcmVudCc6IHsgaWQ6ICdjaGlsZC1wYXJlbnQnIH0sXG4gICdzdGVwLWNoaWxkLXBhcmVudCc6IHsgaWQ6ICdzdGVwLWNoaWxkLXBhcmVudCcgfSxcbiAgJ2dyYW5kY2hpbGQtZ3JhbmRwYXJlbnQnOiB7IGlkOiAnZ3JhbmRjaGlsZC1ncmFuZHBhcmVudCcgfSxcbiAgJ2hhbGYtc2libGluZyc6IHsgaWQ6ICdoYWxmLXNpYmxpbmcnIH0sXG4gICdzaWJsaW5nJzogeyBpZDogJ3NpYmxpbmcnIH0sXG4gICdzdGVwLWJyb3RoZXItc2lzdGVyJzogeyBpZDogJ3N0ZXAtYnJvdGhlci1zaXN0ZXInIH0sXG4gICdwYXJ0bmVyJzogeyBpZDogJ3BhcnRuZXInIH0sXG4gICd1bnJlbGF0ZWQnOiB7IGlkOiAndW5yZWxhdGVkJyB9LFxuICAnb3RoZXItcmVsYXRpb24nOiB7IGlkOiAnb3RoZXItcmVsYXRpb24nIH1cbn07XG5cbnZhciByZWxhdGlvbnNoaXBEZXNjcmlwdGlvbk1hcCA9IHtcbiAgLy8gY292ZXJlZFxuICAnaHVzYmFuZC13aWZlJzoge1xuICAgIHNlbnRhbmNlTGFiZWw6ICdodXNiYW5kIG9yIHdpZmUnLFxuICAgIHN1bW1hcnlBZGplY3RpdmU6ICdodXNiYW5kIG9yIHdpZmUnLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWydzcG91c2UnXVxuICB9LFxuICAvLyBjb3ZlcmVkXG4gICdtb3RoZXItZmF0aGVyJzoge1xuICAgIHNlbnRhbmNlTGFiZWw6ICdtb3RoZXIgb3IgZmF0aGVyJyxcbiAgICBzdW1tYXJ5QWRqZWN0aXZlOiAnbW90aGVyIG9yIGZhdGhlcicsXG4gICAgdHlwZTogcmVsYXRpb25zaGlwVHlwZXNbJ2NoaWxkLXBhcmVudCddXG4gIH0sXG4gIC8vIGNvdmVyZWRcbiAgJ3N0ZXAtbW90aGVyLWZhdGhlcic6IHtcbiAgICBzZW50YW5jZUxhYmVsOiAnc3RlcG1vdGhlciBvciBzdGVwZmF0aGVyJyxcbiAgICBzdW1tYXJ5QWRqZWN0aXZlOiAnc3RlcG1vdGhlciBvciBzdGVwZmF0aGVyJyxcbiAgICB0eXBlOiByZWxhdGlvbnNoaXBUeXBlc1snc3RlcC1jaGlsZC1wYXJlbnQnXVxuICB9LFxuICAvLyBjb3ZlcmVkXG4gICdzb24tZGF1Z2h0ZXInOiB7XG4gICAgc2VudGFuY2VMYWJlbDogJ3NvbiBvciBkYXVnaHRlcicsXG4gICAgc3VtbWFyeUFkamVjdGl2ZTogJ3NvbiBvciBkYXVnaHRlcicsXG4gICAgdHlwZTogcmVsYXRpb25zaGlwVHlwZXNbJ2NoaWxkLXBhcmVudCddXG4gIH0sXG4gIC8vIGNvdmVyZWRcbiAgJ2hhbGYtYnJvdGhlci1zaXN0ZXInOiB7XG4gICAgc2VudGFuY2VMYWJlbDogJ2hhbGYtYnJvdGhlciBvciBoYWxmLXNpc3RlcicsXG4gICAgc3VtbWFyeUFkamVjdGl2ZTogJ2hhbGYtYnJvdGhlciBvciBoYWxmLXNpc3RlcicsXG4gICAgdHlwZTogcmVsYXRpb25zaGlwVHlwZXNbJ2hhbGYtc2libGluZyddXG4gIH0sXG4gIC8vIGNvdmVyZWRcbiAgJ3N0ZXAtY2hpbGQnOiB7XG4gICAgc2VudGFuY2VMYWJlbDogJ3N0ZXBjaGlsZCcsXG4gICAgc3VtbWFyeUFkamVjdGl2ZTogJ3N0ZXBjaGlsZCcsXG4gICAgdHlwZTogcmVsYXRpb25zaGlwVHlwZXNbJ3N0ZXAtY2hpbGQtcGFyZW50J11cbiAgfSxcbiAgLy8gY292ZXJlZFxuICAnZ3JhbmRwYXJlbnQnOiB7XG4gICAgc2VudGFuY2VMYWJlbDogJ2dyYW5kcGFyZW50JyxcbiAgICBzdW1tYXJ5QWRqZWN0aXZlOiAnZ3JhbmRwYXJlbnQnLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWydncmFuZGNoaWxkLWdyYW5kcGFyZW50J11cbiAgfSxcbiAgLy8gY292ZXJlZFxuICAnZ3JhbmRjaGlsZCc6IHtcbiAgICBzZW50YW5jZUxhYmVsOiAnZ3JhbmRjaGlsZCcsXG4gICAgc3VtbWFyeUFkamVjdGl2ZTogJ2dyYW5kY2hpbGQnLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWydncmFuZGNoaWxkLWdyYW5kcGFyZW50J11cbiAgfSxcbiAgLy8gY292ZXJlZFxuICAnYnJvdGhlci1zaXN0ZXInOiB7XG4gICAgc2VudGFuY2VMYWJlbDogJ2Jyb3RoZXIgb3Igc2lzdGVyJyxcbiAgICBzdW1tYXJ5QWRqZWN0aXZlOiAnYnJvdGhlciBvciBzaXN0ZXInLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWydzaWJsaW5nJ11cbiAgfSxcbiAgLy8gY292ZXJlZFxuICAnc3RlcC1icm90aGVyLXNpc3Rlcic6IHtcbiAgICBzZW50YW5jZUxhYmVsOiAnc3RlcGJyb3RoZXIgb3Igc3RlcHNpc3RlcicsXG4gICAgc3VtbWFyeUFkamVjdGl2ZTogJ3N0ZXBicm90aGVyIG9yIHN0ZXBzaXN0ZXInLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWydzdGVwLWJyb3RoZXItc2lzdGVyJ11cbiAgfSxcbiAgLy8gY292ZXJlZFxuICAnb3RoZXItcmVsYXRpb24nOiB7XG4gICAgc2VudGFuY2VMYWJlbDogJ290aGVyIHJlbGF0aW9uJyxcbiAgICBzdW1tYXJ5QWRqZWN0aXZlOiAncmVsYXRlZCcsXG4gICAgdHlwZTogcmVsYXRpb25zaGlwVHlwZXNbJ290aGVyLXJlbGF0aW9uJ11cbiAgfSxcbiAgLy8gY292ZXJlZFxuICAncGFydG5lcic6IHtcbiAgICBzZW50YW5jZUxhYmVsOiAncGFydG5lcicsXG4gICAgc3VtbWFyeUFkamVjdGl2ZTogJ3BhcnRuZXInLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWydwYXJ0bmVyJ11cbiAgfSxcbiAgJ3NhbWUtc2V4LXBhcnRuZXInOiB7XG4gICAgc2VudGFuY2VMYWJlbDogJ2xlZ2FsbHkgcmVnaXN0ZXJlZCBjaXZpbCBwYXJ0bmVyJyxcbiAgICBzdW1tYXJ5QWRqZWN0aXZlOiAnbGVnYWxseSByZWdpc3RlcmVkIGNpdmlsIHBhcnRuZXInLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWydwYXJ0bmVyJ11cbiAgfSxcbiAgLy8gY292ZXJlZFxuICAndW5yZWxhdGVkJzoge1xuICAgIHNlbnRhbmNlTGFiZWw6ICd1bnJlbGF0ZWQnLFxuICAgIHN1bW1hcnlBZGplY3RpdmU6ICd1bnJlbGF0ZWQnLFxuICAgIHR5cGU6IHJlbGF0aW9uc2hpcFR5cGVzWyd1bnJlbGF0ZWQnXVxuICB9XG59O1xuXG5mdW5jdGlvbiBuYW1lRWxlbWVudChuYW1lKSB7XG4gIHJldHVybiAnPHN0cm9uZz4nICsgbmFtZSArICc8L3N0cm9uZz4nO1xufVxuXG5mdW5jdGlvbiBwZXJzb25MaXN0U3RyKHBlb3BsZUFycikge1xuICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgaWYgKHBlb3BsZUFyci5sZW5ndGggPCAxKSB7XG4gICAgY29uc29sZS5sb2cocGVvcGxlQXJyLCAnbm90IGVub3VnaCBwZW9wbGUgdG8gY3JlYXRlIGEgbGlzdCBzdHJpbmcnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAocGVvcGxlQXJyLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBuYW1lRWxlbWVudChwZW9wbGVBcnJbMF0uZnVsbE5hbWUgKyBmb3JtYXRQZXJzb25JZllvdShwZW9wbGVBcnJbMF0pKTtcbiAgfVxuXG4gIHZhciBwZW9wbGVDb3B5ID0gW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KHBlb3BsZUFycikpLFxuICAgICAgbGFzdFBlcnNvbiA9IHBlb3BsZUNvcHkucG9wKCk7XG5cbiAgcmV0dXJuIHBlb3BsZUNvcHkubWFwKGZ1bmN0aW9uIChwZXJzb24kJDEpIHtcbiAgICByZXR1cm4gJycgKyBuYW1lRWxlbWVudChwZXJzb24kJDEuZnVsbE5hbWUgKyAob3B0cy5pc0ZhbWlseSA/IHRyYWlsaW5nTmFtZVMocGVyc29uJCQxLmZ1bGxOYW1lKSA6ICcnKSArIGZvcm1hdFBlcnNvbklmWW91KHBlcnNvbiQkMSkpO1xuICB9KS5qb2luKCcsICcpICsgJyBhbmQgJyArIG5hbWVFbGVtZW50KGxhc3RQZXJzb24uZnVsbE5hbWUgKyAob3B0cy5pc0ZhbWlseSA/IHRyYWlsaW5nTmFtZVMobGFzdFBlcnNvbi5mdWxsTmFtZSkgOiAnJykgKyBmb3JtYXRQZXJzb25JZllvdShsYXN0UGVyc29uKSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFBlcnNvbklmWW91KHBlcnNvbiQkMSkge1xuICByZXR1cm4gcGVyc29uJCQxLmlkID09PSBVU0VSX0hPVVNFSE9MRF9NRU1CRVJfSUQgPyAnIChZb3UpJyA6ICcnO1xufVxuXG52YXIgcmVsYXRpb25zaGlwU3VtbWFyeVRlbXBsYXRlcyA9IHtcbiAgJ3BhcnRuZXJzaGlwJzogZnVuY3Rpb24gcGFydG5lcnNoaXAocGVyc29uMSwgcGVyc29uMiwgZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gbmFtZUVsZW1lbnQocGVyc29uMS5mdWxsTmFtZSArIGZvcm1hdFBlcnNvbklmWW91KHBlcnNvbjEpKSArICcgaXMgJyArIG5hbWVFbGVtZW50KHBlcnNvbjIuZnVsbE5hbWUgKyB0cmFpbGluZ05hbWVTKHBlcnNvbjIuZnVsbE5hbWUpICsgZm9ybWF0UGVyc29uSWZZb3UocGVyc29uMikpICsgJyAnICsgZGVzY3JpcHRpb247XG4gIH0sXG4gICd0d29GYW1pbHlNZW1iZXJzVG9NYW55JzogZnVuY3Rpb24gdHdvRmFtaWx5TWVtYmVyc1RvTWFueShwYXJlbnQxLCBwYXJlbnQyLCBjaGlsZHJlbkFyciwgZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gbmFtZUVsZW1lbnQocGFyZW50MS5mdWxsTmFtZSArIGZvcm1hdFBlcnNvbklmWW91KHBhcmVudDEpKSArICcgYW5kICcgKyBuYW1lRWxlbWVudChwYXJlbnQyLmZ1bGxOYW1lICsgZm9ybWF0UGVyc29uSWZZb3UocGFyZW50MikpICsgJyBhcmUgJyArIHBlcnNvbkxpc3RTdHIoY2hpbGRyZW5BcnIsIHsgaXNGYW1pbHk6IHRydWUgfSkgKyAnICcgKyBkZXNjcmlwdGlvbjtcbiAgfSxcbiAgJ29uZUZhbWlseU1lbWJlclRvTWFueSc6IGZ1bmN0aW9uIG9uZUZhbWlseU1lbWJlclRvTWFueShwYXJlbnQsIGNoaWxkcmVuQXJyLCBkZXNjcmlwdGlvbikge1xuICAgIGNvbnNvbGUubG9nKHBhcmVudCwgY2hpbGRyZW5BcnIsIGRlc2NyaXB0aW9uKTtcbiAgICByZXR1cm4gbmFtZUVsZW1lbnQocGFyZW50LmZ1bGxOYW1lICsgZm9ybWF0UGVyc29uSWZZb3UocGFyZW50KSkgKyAnIGlzICcgKyBwZXJzb25MaXN0U3RyKGNoaWxkcmVuQXJyLCB7IGlzRmFtaWx5OiB0cnVlIH0pICsgJyAnICsgZGVzY3JpcHRpb247XG4gIH0sXG4gICdtYW55VG9NYW55JzogZnVuY3Rpb24gbWFueVRvTWFueShwZW9wbGVBcnIxLCBwZW9wbGVBcnIyLCBkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiBwZXJzb25MaXN0U3RyKHBlb3BsZUFycjEpICsgJyAnICsgKHBlb3BsZUFycjEubGVuZ3RoID4gMSA/ICdhcmUnIDogJ2lzJykgKyAnICcgKyBkZXNjcmlwdGlvbiArICcgdG8gJyArIHBlcnNvbkxpc3RTdHIocGVvcGxlQXJyMik7XG4gIH0sXG4gICdhbGxNdXR1YWwnOiBmdW5jdGlvbiBhbGxNdXR1YWwocGVvcGxlQXJyLCBkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiBwZXJzb25MaXN0U3RyKHBlb3BsZUFycikgKyAnIGFyZSAnICsgZGVzY3JpcHRpb247XG4gIH1cbn07XG5cbi8qKlxuICogVHlwZXNcbiAqL1xuZnVuY3Rpb24gcmVsYXRpb25zaGlwKGRlc2NyaXB0aW9uLCBwZXJzb25Jc0lkLCBwZXJzb25Ub0lkKSB7XG4gIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fTtcblxuICByZXR1cm4ge1xuICAgIHBlcnNvbklzRGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgIHBlcnNvbklzSWQ6IHBlcnNvbklzSWQsXG4gICAgcGVyc29uVG9JZDogcGVyc29uVG9JZCxcbiAgICBpbmZlcnJlZDogISFvcHRzLmluZmVycmVkLFxuICAgIGluZmVycmVkQnk6IG9wdHMuaW5mZXJyZWRCeVxuICB9O1xufVxuXG4vKipcbiAqIFN0b3JhZ2VcbiAqL1xuZnVuY3Rpb24gYWRkUmVsYXRpb25zaGlwKHJlbGF0aW9uc2hpcE9iaikge1xuICB2YXIgaG91c2Vob2xkUmVsYXRpb25zaGlwcyA9IGdldEFsbFJlbGF0aW9uc2hpcHMoKSB8fCBbXSxcbiAgICAgIGl0ZW0gPSBfZXh0ZW5kcyh7fSwgcmVsYXRpb25zaGlwT2JqLCB7XG4gICAgaWQ6IGF1dG9JbmNyZW1lbnRJZChSRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZKVxuICB9KTtcblxuICBob3VzZWhvbGRSZWxhdGlvbnNoaXBzLnB1c2goaXRlbSk7XG5cbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShSRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShob3VzZWhvbGRSZWxhdGlvbnNoaXBzKSk7XG5cbiAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVJlbGF0aW9uc2hpcChyZWxhdGlvbnNoaXBPYmopIHtcbiAgdmFyIGhvdXNlaG9sZFJlbGF0aW9uc2hpcHMgPSAoZ2V0QWxsUmVsYXRpb25zaGlwcygpIHx8IFtdKS5maWx0ZXIoZnVuY3Rpb24gKHJlbGF0aW9uc2hpcCkge1xuICAgIHJldHVybiByZWxhdGlvbnNoaXAuaWQgIT09IHJlbGF0aW9uc2hpcE9iai5pZDtcbiAgfSk7XG5cbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShSRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShob3VzZWhvbGRSZWxhdGlvbnNoaXBzKSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRSZWxhdGlvbnNoaXAocmVsYXRpb25zaGlwSWQsIHZhbHVlT2JqZWN0KSB7XG4gIHZhciBob3VzZWhvbGRSZWxhdGlvbnNoaXBzID0gKGdldEFsbFJlbGF0aW9uc2hpcHMoKSB8fCBbXSkubWFwKGZ1bmN0aW9uIChyZWxhdGlvbnNoaXApIHtcbiAgICByZXR1cm4gcmVsYXRpb25zaGlwLmlkICsgJycgPT09IHJlbGF0aW9uc2hpcElkICsgJycgPyBfZXh0ZW5kcyh7fSwgdmFsdWVPYmplY3QsIHtcbiAgICAgIGlkOiByZWxhdGlvbnNoaXBJZFxuICAgIH0pIDogcmVsYXRpb25zaGlwO1xuICB9KTtcblxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFJFTEFUSU9OU0hJUFNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KGhvdXNlaG9sZFJlbGF0aW9uc2hpcHMpKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsUmVsYXRpb25zaGlwcygpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShSRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZKSkgfHwgW107XG59XG5cbmZ1bmN0aW9uIGdldEFsbE1hbnVhbFJlbGF0aW9uc2hpcHMoKSB7XG4gIHJldHVybiBnZXRBbGxSZWxhdGlvbnNoaXBzKCkuZmlsdGVyKGZ1bmN0aW9uIChyZWxhdGlvbnNoaXApIHtcbiAgICByZXR1cm4gIXJlbGF0aW9uc2hpcC5pbmZlcnJlZDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUFsbFJlbGF0aW9uc2hpcHNGb3JNZW1iZXIocGVyc29uSWQpIHtcbiAgdmFyIGhvdXNlaG9sZFJlbGF0aW9uc2hpcHMgPSBnZXRBbGxSZWxhdGlvbnNoaXBzKCkuZmlsdGVyKGZ1bmN0aW9uIChyZWxhdGlvbnNoaXApIHtcbiAgICByZXR1cm4gIShwZXJzb25JZCA9PT0gcmVsYXRpb25zaGlwLnBlcnNvbklzSWQgfHwgcGVyc29uSWQgPT09IHJlbGF0aW9uc2hpcC5wZXJzb25Ub0lkKTtcbiAgfSk7XG5cbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShSRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShob3VzZWhvbGRSZWxhdGlvbnNoaXBzKSk7XG59XG5cbi8qKlxuICogQ29tcGFyYXRvcnNcbiAqL1xuZnVuY3Rpb24gaXNJblJlbGF0aW9uc2hpcChwZXJzb25JZCwgcmVsYXRpb25zaGlwKSB7XG4gIHJldHVybiByZWxhdGlvbnNoaXAucGVyc29uVG9JZCA9PT0gcGVyc29uSWQgfHwgcmVsYXRpb25zaGlwLnBlcnNvbklzSWQgPT09IHBlcnNvbklkO1xufVxuXG5mdW5jdGlvbiBpc0FDaGlsZEluUmVsYXRpb25zaGlwKHBlcnNvbklkLCByZWxhdGlvbnNoaXApIHtcbiAgLyoqXG4gICAqIEd1YXJkXG4gICAqL1xuICBpZiAoIWlzSW5SZWxhdGlvbnNoaXAocGVyc29uSWQsIHJlbGF0aW9uc2hpcCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcmVsYXRpb25zaGlwLnBlcnNvbklzRGVzY3JpcHRpb24gPT09ICdtb3RoZXItZmF0aGVyJyAmJiByZWxhdGlvbnNoaXAucGVyc29uVG9JZCA9PT0gcGVyc29uSWQgfHwgcmVsYXRpb25zaGlwLnBlcnNvbklzRGVzY3JpcHRpb24gPT09ICdzb24tZGF1Z2h0ZXInICYmIHJlbGF0aW9uc2hpcC5wZXJzb25Jc0lkID09PSBwZXJzb25JZDtcbn1cblxuZnVuY3Rpb24gaXNBU2libGluZ0luUmVsYXRpb25zaGlwKHBlcnNvbklkLCByZWxhdGlvbnNoaXApIHtcbiAgcmV0dXJuIGlzSW5SZWxhdGlvbnNoaXAocGVyc29uSWQsIHJlbGF0aW9uc2hpcCkgJiYgcmVsYXRpb25zaGlwRGVzY3JpcHRpb25NYXBbcmVsYXRpb25zaGlwLnBlcnNvbklzRGVzY3JpcHRpb25dLnR5cGUuaWQgPT09ICdzaWJsaW5nJztcbn1cblxuZnVuY3Rpb24gaXNBUGFyZW50SW5SZWxhdGlvbnNoaXAocGVyc29uSWQsIHJlbGF0aW9uc2hpcCkge1xuICAvKipcbiAgICogR3VhcmRcbiAgICovXG4gIGlmICghaXNJblJlbGF0aW9uc2hpcChwZXJzb25JZCwgcmVsYXRpb25zaGlwKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiByZWxhdGlvbnNoaXAucGVyc29uSXNEZXNjcmlwdGlvbiA9PT0gJ21vdGhlci1mYXRoZXInICYmIHJlbGF0aW9uc2hpcC5wZXJzb25Jc0lkID09PSBwZXJzb25JZCB8fCByZWxhdGlvbnNoaXAucGVyc29uSXNEZXNjcmlwdGlvbiA9PT0gJ3Nvbi1kYXVnaHRlcicgJiYgcmVsYXRpb25zaGlwLnBlcnNvblRvSWQgPT09IHBlcnNvbklkO1xufVxuXG5mdW5jdGlvbiBhcmVBbnlDaGlsZHJlbkluUmVsYXRpb25zaGlwTm90UGFyZW50KGNoaWxkcmVuSWRzLCBub3RQYXJlbnRJZCwgcmVsYXRpb25zaGlwKSB7XG4gIC8qKlxuICAgKiBHdWFyZFxuICAgKiBJZiByZWxhdGlvbnNoaXAgdHlwZSBpcyBub3QgY2hpbGQtcGFyZW50XG4gICAqL1xuICBpZiAocmVsYXRpb25zaGlwRGVzY3JpcHRpb25NYXBbcmVsYXRpb25zaGlwLnBlcnNvbklzRGVzY3JpcHRpb25dLnR5cGUuaWQgIT09ICdjaGlsZC1wYXJlbnQnKSB7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgY2hpbGRJbmRleEFzUGVyc29uSXMgPSBjaGlsZHJlbklkcy5pbmRleE9mKHJlbGF0aW9uc2hpcC5wZXJzb25Jc0lkKSxcbiAgICAgIGNoaWxkSW5kZXhBc1BlcnNvblRvID0gY2hpbGRyZW5JZHMuaW5kZXhPZihyZWxhdGlvbnNoaXAucGVyc29uVG9JZCk7XG5cbiAgLyoqXG4gICAqIEZpbmQgcGFyZW50cyB3aXRoIHRoZSBzYW1lIGNoaWxkcmVuXG4gICAqXG4gICAqIElmIGEgcGVyc29uSXMtY2hpbGQgaXMgbm90IGluIHJlbGF0aW9uc2hpcFxuICAgKiBvciAyIGNoaWxkcmVuIGFyZSBmb3VuZCBpbiByZWxhdGlvbnNoaXBcbiAgICovXG4gIGlmIChjaGlsZEluZGV4QXNQZXJzb25JcyA9PT0gLTEgJiYgY2hpbGRJbmRleEFzUGVyc29uVG8gPT09IC0xIHx8IGNoaWxkSW5kZXhBc1BlcnNvbklzICE9PSAtMSAmJiBjaGlsZEluZGV4QXNQZXJzb25UbyAhPT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hpbGQgbXVzdCBiZSBpbiByZWxhdGlvbnNoaXAsIGdldCBjaGlsZCBpbmRleFxuICAgKi9cbiAgdmFyIGNoaWxkSW5kZXggPSBjaGlsZEluZGV4QXNQZXJzb25JcyAhPT0gLTEgPyBjaGlsZEluZGV4QXNQZXJzb25JcyA6IGNoaWxkSW5kZXhBc1BlcnNvblRvO1xuXG4gIC8qKlxuICAgKiBJZiBwZXJzb25JcyBpcyBub3QgaW4gcmVsYXRpb25zaGlwXG4gICAqIGFuZCBjaGlsZCBmcm9tIHByZXZpb3VzIHJlbGF0aW9uc2hpcCBpcyBhIGNoaWxkIGluIHRoaXMgcmVsYXRpb25zaGlwXG4gICAqL1xuICByZXR1cm4gIWlzSW5SZWxhdGlvbnNoaXAobm90UGFyZW50SWQsIHJlbGF0aW9uc2hpcCkgJiYgaXNBQ2hpbGRJblJlbGF0aW9uc2hpcChjaGlsZHJlbklkc1tjaGlsZEluZGV4XSwgcmVsYXRpb25zaGlwKTtcbn1cblxuZnVuY3Rpb24gaXNSZWxhdGlvbnNoaXBUeXBlKHJlbGF0aW9uc2hpcFR5cGUsIHJlbGF0aW9uc2hpcCkge1xuICB2YXIgdHlwZU9mUmVsYXRpb25zaGlwID0gcmVsYXRpb25zaGlwRGVzY3JpcHRpb25NYXBbcmVsYXRpb25zaGlwLnBlcnNvbklzRGVzY3JpcHRpb25dLnR5cGUuaWQ7XG5cbiAgLyoqXG4gICAqIHJlbGF0aW9uc2hpcFR5cGUgY2FuIGJlIGFuIGFycmF5IG9mIHR5cGVzXG4gICAqL1xuICByZXR1cm4gXyQxLmlzQXJyYXkocmVsYXRpb25zaGlwVHlwZSkgPyAhIV8kMS5maW5kKHJlbGF0aW9uc2hpcFR5cGUsIGZ1bmN0aW9uIChyVHlwZSkge1xuICAgIHJldHVybiByVHlwZSA9PT0gdHlwZU9mUmVsYXRpb25zaGlwO1xuICB9KSA6IHR5cGVPZlJlbGF0aW9uc2hpcCA9PT0gcmVsYXRpb25zaGlwVHlwZTtcbn1cblxuZnVuY3Rpb24gaXNSZWxhdGlvbnNoaXBJbmZlcnJlZChyZWxhdGlvbnNoaXApIHtcbiAgcmV0dXJuIHJlbGF0aW9uc2hpcC5pbmZlcnJlZDtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBwZW9wbGUgYnkgcm9sZSBpbiByZWxhdGlvbnNoaXBzXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmVudElkRnJvbVJlbGF0aW9uc2hpcChyZWxhdGlvbnNoaXApIHtcbiAgdmFyIHBhcmVudElkID0gdm9pZCAwO1xuXG4gIGlmIChyZWxhdGlvbnNoaXAucGVyc29uSXNEZXNjcmlwdGlvbiA9PT0gJ21vdGhlci1mYXRoZXInKSB7XG4gICAgcGFyZW50SWQgPSByZWxhdGlvbnNoaXAucGVyc29uSXNJZDtcbiAgfVxuXG4gIGlmIChyZWxhdGlvbnNoaXAucGVyc29uSXNEZXNjcmlwdGlvbiA9PT0gJ3Nvbi1kYXVnaHRlcicpIHtcbiAgICBwYXJlbnRJZCA9IHJlbGF0aW9uc2hpcC5wZXJzb25Ub0lkO1xuICB9XG5cbiAgaWYgKCFwYXJlbnRJZCkge1xuICAgIGNvbnNvbGUubG9nKCdQYXJlbnQgbm90IGZvdW5kIGluIHJlbGF0aW9uc2hpcDogJywgcmVsYXRpb25zaGlwKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcGFyZW50SWQ7XG59XG5cbmZ1bmN0aW9uIGdldENoaWxkSWRGcm9tUmVsYXRpb25zaGlwKHJlbGF0aW9uc2hpcCkge1xuICB2YXIgY2hpbGRJZCA9IHZvaWQgMDtcblxuICBpZiAocmVsYXRpb25zaGlwLnBlcnNvbklzRGVzY3JpcHRpb24gPT09ICdtb3RoZXItZmF0aGVyJykge1xuICAgIGNoaWxkSWQgPSByZWxhdGlvbnNoaXAucGVyc29uVG9JZDtcbiAgfVxuXG4gIGlmIChyZWxhdGlvbnNoaXAucGVyc29uSXNEZXNjcmlwdGlvbiA9PT0gJ3Nvbi1kYXVnaHRlcicpIHtcbiAgICBjaGlsZElkID0gcmVsYXRpb25zaGlwLnBlcnNvbklzSWQ7XG4gIH1cblxuICBpZiAoIWNoaWxkSWQpIHtcbiAgICBjb25zb2xlLmxvZygnQ2hpbGQgbm90IGZvdW5kIGluIHJlbGF0aW9uc2hpcDogJywgcmVsYXRpb25zaGlwKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gY2hpbGRJZDtcbn1cblxuZnVuY3Rpb24gZ2V0U2libGluZ0lkRnJvbVJlbGF0aW9uc2hpcChwZXJzb25JZCwgcmVsYXRpb25zaGlwKSB7XG4gIGlmICghaXNJblJlbGF0aW9uc2hpcChwZXJzb25JZCwgcmVsYXRpb25zaGlwKSkge1xuICAgIGNvbnNvbGUubG9nKCdQZXJzb24gJyArIHBlcnNvbklkICsgJyBub3QgZm91bmQgaW4gcmVsYXRpb25zaGlwOiAnLCByZWxhdGlvbnNoaXApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiByZWxhdGlvbnNoaXBbcmVsYXRpb25zaGlwLnBlcnNvbklzSWQgPT09IHBlcnNvbklkID8gJ3BlcnNvblRvSWQnIDogJ3BlcnNvbklzSWQnXTtcbn1cblxuZnVuY3Rpb24gZ2V0T3RoZXJQZXJzb25JZEZyb21SZWxhdGlvbnNoaXAocGVyc29uSWQsIHJlbGF0aW9uc2hpcCkge1xuICByZXR1cm4gcmVsYXRpb25zaGlwLnBlcnNvbklzSWQgPT09IHBlcnNvbklkID8gcmVsYXRpb25zaGlwLnBlcnNvblRvSWQgOiByZWxhdGlvbnNoaXAucGVyc29uSXNJZDtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsUGFyZW50c09mKHBlcnNvbklkKSB7XG4gIHJldHVybiBnZXRBbGxSZWxhdGlvbnNoaXBzKCkuZmlsdGVyKGlzQUNoaWxkSW5SZWxhdGlvbnNoaXAuYmluZChudWxsLCBwZXJzb25JZCkpLm1hcChmdW5jdGlvbiAocmVsYXRpb25zaGlwKSB7XG4gICAgcmV0dXJuIGdldFBlcnNvbkZyb21NZW1iZXIoZ2V0SG91c2Vob2xkTWVtYmVyQnlQZXJzb25JZChnZXRQYXJlbnRJZEZyb21SZWxhdGlvbnNoaXAocmVsYXRpb25zaGlwKSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsQ2hpbGRyZW5PZihwZXJzb25JZCkge1xuICByZXR1cm4gZ2V0QWxsUmVsYXRpb25zaGlwcygpLmZpbHRlcihpc0FQYXJlbnRJblJlbGF0aW9uc2hpcC5iaW5kKG51bGwsIHBlcnNvbklkKSkubWFwKGZ1bmN0aW9uIChyZWxhdGlvbnNoaXApIHtcbiAgICByZXR1cm4gZ2V0SG91c2Vob2xkTWVtYmVyQnlQZXJzb25JZChnZXRDaGlsZElkRnJvbVJlbGF0aW9uc2hpcChyZWxhdGlvbnNoaXApKVsnQHBlcnNvbiddO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UGVyc29uSWRGcm9tUGVyc29uKHBlcnNvbiQkMSkge1xuICByZXR1cm4gcGVyc29uJCQxLmlkO1xufVxuXG5mdW5jdGlvbiBnZXRQZXJzb25Gcm9tTWVtYmVyKG1lbWJlcikge1xuICByZXR1cm4gbWVtYmVyWydAcGVyc29uJ107XG59XG5cbi8qKlxuICogTWlzc2luZyByZWxhdGlvbnNoaXAgaW5mZXJlbmNlXG4gKi9cbnZhciBtaXNzaW5nUmVsYXRpb25zaGlwSW5mZXJlbmNlID0ge1xuICBzaWJsaW5nc09mOiBmdW5jdGlvbiBzaWJsaW5nc09mKHN1YmplY3RNZW1iZXIpIHtcblxuICAgIHZhciBtaXNzaW5nUmVsYXRpb25zaGlwcyA9IFtdLFxuICAgICAgICBhbGxSZWxhdGlvbnNoaXBzID0gZ2V0QWxsUmVsYXRpb25zaGlwcygpLFxuICAgICAgICBwZXJzb24kJDEgPSBnZXRQZXJzb25Gcm9tTWVtYmVyKHN1YmplY3RNZW1iZXIpLFxuICAgICAgICBwZXJzb25JZCA9IHBlcnNvbiQkMS5pZCxcbiAgICAgICAgcGFyZW50cyA9IGdldEFsbFBhcmVudHNPZihwZXJzb25JZCksXG4gICAgICAgIHNpYmxpbmdJZHMgPSBhbGxSZWxhdGlvbnNoaXBzLmZpbHRlcihpc0FTaWJsaW5nSW5SZWxhdGlvbnNoaXAuYmluZChudWxsLCBwZXJzb25JZCkpLm1hcChnZXRTaWJsaW5nSWRGcm9tUmVsYXRpb25zaGlwLmJpbmQobnVsbCwgcGVyc29uSWQpKTtcblxuICAgIC8qKlxuICAgICAqIElmIDIgcGFyZW50IHJlbGF0aW9uc2hpcHMgb2YgJ3BlcnNvbicgYXJlIGZvdW5kIHdlIGNhbiBhdHRlbXB0IHRvIGluZmVyXG4gICAgICogc2libGluZyByZWxhdGlvbnNoaXBzXG4gICAgICovXG4gICAgaWYgKHBhcmVudHMubGVuZ3RoID09PSAyKSB7XG5cbiAgICAgIGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKS5maWx0ZXIoaXNIb3VzZWhvbGRNZW1iZXIpLmZvckVhY2goZnVuY3Rpb24gKG1lbWJlcikge1xuXG4gICAgICAgIHZhciBtZW1iZXJQZXJzb25JZCA9IG1lbWJlclsnQHBlcnNvbiddLmlkO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHdWFyZFxuICAgICAgICAgKiBJZiBtZW1iZXIgaXMgdGhlIHN1YmplY3QgbWVtYmVyXG4gICAgICAgICAqIG9yIG1lbWJlciBpcyBhIHBhcmVudFxuICAgICAgICAgKiBvciBtZW1iZXIgYWxyZWFkeSBoYXMgYSBzaWJsaW5nIHJlbGF0aW9uc2hpcCB3aXRoICdwZXJzb24nXG4gICAgICAgICAqIHNraXAgbWVtYmVyXG4gICAgICAgICAqL1xuICAgICAgICBpZiAobWVtYmVyUGVyc29uSWQgPT09IHBlcnNvbklkIHx8IG1lbWJlclBlcnNvbklkID09PSBwYXJlbnRzWzBdLmlkIHx8IG1lbWJlclBlcnNvbklkID09PSBwYXJlbnRzWzFdLmlkIHx8IHNpYmxpbmdJZHMuaW5kZXhPZihtZW1iZXJQZXJzb25JZCkgPiAtMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtZW1iZXJQYXJlbnRzID0gZ2V0QWxsUGFyZW50c09mKG1lbWJlclBlcnNvbklkKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgMiBwYXJlbnRzIG9mICdtZW1iZXInIGFyZSBmb3VuZFxuICAgICAgICAgKiBhbmQgdGhleSBhcmUgdGhlIHNhbWUgcGFyZW50cyBvZiAncGVyc29uJ1xuICAgICAgICAgKiB3ZSBoYXZlIGlkZW50aWZpZWQgYSBtaXNzaW5nIGluZmVycmVkIHJlbGF0aW9uc2hpcFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKG1lbWJlclBhcmVudHMubGVuZ3RoID09PSAyICYmIF8kMS5kaWZmZXJlbmNlKHBhcmVudHMubWFwKGdldFBlcnNvbklkRnJvbVBlcnNvbiksIG1lbWJlclBhcmVudHMubWFwKGdldFBlcnNvbklkRnJvbVBlcnNvbikpLmxlbmd0aCA9PT0gMCkge1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQWRkIHRvIG1pc3NpbmdSZWxhdGlvbnNoaXBzXG4gICAgICAgICAgICovXG4gICAgICAgICAgbWlzc2luZ1JlbGF0aW9uc2hpcHMucHVzaChyZWxhdGlvbnNoaXAoJ2Jyb3RoZXItc2lzdGVyJywgcGVyc29uSWQsIG1lbWJlclBlcnNvbklkLCB7XG4gICAgICAgICAgICBpbmZlcnJlZDogdHJ1ZSxcbiAgICAgICAgICAgIGluZmVycmVkQnk6IFtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTXVzdCBiZSA0IHJlbGF0aW9uc2hpcHNcbiAgICAgICAgICAgICAqIENvdWxkIGhhdmUgdXNlZCBtZW1iZXIncyBwYXJlbnRzIGJ1dCB3ZSBjYW4gYXNzdW1lIHRoZXlcbiAgICAgICAgICAgICAqIG11c3QgYmUgdGhlIHNhbWUgYXQgdGhpcyBwb2ludCBvciB0aGUgaW5mZXJyZW5jZVxuICAgICAgICAgICAgICogY291bGRuJ3QgaGFwcGVuLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBnZXRSZWxhdGlvbnNoaXBPZihwZXJzb25JZCwgcGFyZW50c1swXS5pZCkuaWQsIGdldFJlbGF0aW9uc2hpcE9mKHBlcnNvbklkLCBwYXJlbnRzWzFdLmlkKS5pZCwgZ2V0UmVsYXRpb25zaGlwT2YobWVtYmVyUGVyc29uSWQsIHBhcmVudHNbMF0uaWQpLmlkLCBnZXRSZWxhdGlvbnNoaXBPZihtZW1iZXJQZXJzb25JZCwgcGFyZW50c1sxXS5pZCkuaWRdXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWlzc2luZ1JlbGF0aW9uc2hpcHM7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGluZmVyUmVsYXRpb25zaGlwcyhyZWxhdGlvbnNoaXAsIHBlcnNvbklzLCBwZXJzb25Ubykge1xuICB2YXIgbWlzc2luZ1JlbGF0aW9uc2hpcHMgPSBbXTtcblxuICBpZiAocmVsYXRpb25zaGlwLnBlcnNvbklzRGVzY3JpcHRpb24gPT09ICdtb3RoZXItZmF0aGVyJykge1xuICAgIG1pc3NpbmdSZWxhdGlvbnNoaXBzID0gbWlzc2luZ1JlbGF0aW9uc2hpcHMuY29uY2F0KG1pc3NpbmdSZWxhdGlvbnNoaXBJbmZlcmVuY2Uuc2libGluZ3NPZihwZXJzb25UbykpO1xuICB9XG5cbiAgaWYgKHJlbGF0aW9uc2hpcC5wZXJzb25Jc0Rlc2NyaXB0aW9uID09PSAnc29uLWRhdWdodGVyJykge1xuICAgIG1pc3NpbmdSZWxhdGlvbnNoaXBzID0gbWlzc2luZ1JlbGF0aW9uc2hpcHMuY29uY2F0KG1pc3NpbmdSZWxhdGlvbnNoaXBJbmZlcmVuY2Uuc2libGluZ3NPZihwZXJzb25JcykpO1xuICB9XG5cbiAgJC5lYWNoKG1pc3NpbmdSZWxhdGlvbnNoaXBzLCBmdW5jdGlvbiAoaSwgcmVsYXRpb25zaGlwKSB7XG4gICAgYWRkUmVsYXRpb25zaGlwKHJlbGF0aW9uc2hpcCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBmaW5kTmV4dE1pc3NpbmdSZWxhdGlvbnNoaXAoKSB7XG4gIHZhciBob3VzZWhvbGRNZW1iZXJzID0gZ2V0QWxsSG91c2Vob2xkTWVtYmVycygpLmZpbHRlcihpc0hvdXNlaG9sZE1lbWJlciksXG4gICAgICByZWxhdGlvbnNoaXBzID0gZ2V0QWxsUmVsYXRpb25zaGlwcygpLFxuICAgICAgbWlzc2luZ1JlbGF0aW9uc2hpcE1lbWJlcnMgPSBbXSxcbiAgICAgIHBlcnNvbklzID0gbnVsbDtcblxuICAvKipcbiAgICogRmluZCB0aGUgbmV4dCBtaXNzaW5nIHJlbGF0aW9uc2hpcFxuICAgKi9cbiAgJC5lYWNoKGhvdXNlaG9sZE1lbWJlcnMsIGZ1bmN0aW9uIChpLCBtZW1iZXIpIHtcbiAgICB2YXIgcGVyc29uSWQgPSBtZW1iZXJbJ0BwZXJzb24nXS5pZDtcblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgcmVsYXRpb25zaGlwcyBmb3IgdGhpcyBtZW1iZXJcbiAgICAgKi9cbiAgICB2YXIgbWVtYmVyUmVsYXRpb25zaGlwcyA9IHJlbGF0aW9uc2hpcHMuZmlsdGVyKGZ1bmN0aW9uIChyZWxhdGlvbnNoaXApIHtcbiAgICAgIHJldHVybiByZWxhdGlvbnNoaXAucGVyc29uSXNJZCA9PT0gcGVyc29uSWQgfHwgcmVsYXRpb25zaGlwLnBlcnNvblRvSWQgPT09IHBlcnNvbklkO1xuICAgIH0pLFxuICAgICAgICBtZW1iZXJSZWxhdGlvbnNoaXBUb0lkcyA9IG1lbWJlclJlbGF0aW9uc2hpcHMubWFwKGZ1bmN0aW9uIChyZWxhdGlvbnNoaXApIHtcbiAgICAgIHJldHVybiByZWxhdGlvbnNoaXAucGVyc29uSXNJZCA9PT0gcGVyc29uSWQgPyByZWxhdGlvbnNoaXAucGVyc29uVG9JZCA6IHJlbGF0aW9uc2hpcC5wZXJzb25Jc0lkO1xuICAgIH0pIHx8IFtdO1xuXG4gICAgLyoqXG4gICAgICogSWYgdG90YWwgcmVsYXRpb25zaGlwcyByZWxhdGVkIHRvIHRoaXMgbWVtYmVyIGlzbid0IGVxdWFsIHRvXG4gICAgICogdG90YWwgaG91c2Vob2xkIG1lbWJlcnMgLTEsIGluZGljYXRlcyBtaXNzaW5nIHJlbGF0aW9uc2hpcFxuICAgICAqL1xuICAgIGlmIChtZW1iZXJSZWxhdGlvbnNoaXBzLmxlbmd0aCA8IGhvdXNlaG9sZE1lbWJlcnMubGVuZ3RoIC0gMSkge1xuXG4gICAgICAvKipcbiAgICAgICAqIEFsbCBtaXNzaW5nIHJlbGF0aW9uc2hpcCBtZW1iZXJzXG4gICAgICAgKi9cbiAgICAgIG1pc3NpbmdSZWxhdGlvbnNoaXBNZW1iZXJzID0gaG91c2Vob2xkTWVtYmVycy5maWx0ZXIoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgcmV0dXJuIG1lbWJlclJlbGF0aW9uc2hpcFRvSWRzLmluZGV4T2YobVsnQHBlcnNvbiddLmlkKSA9PT0gLTEgJiYgbVsnQHBlcnNvbiddLmlkICE9PSBwZXJzb25JZDtcbiAgICAgIH0pO1xuXG4gICAgICBwZXJzb25JcyA9IG1lbWJlcjtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBlcnNvbklzID8ge1xuICAgIHBlcnNvbklzOiBwZXJzb25JcyxcbiAgICBwZXJzb25UbzogbWlzc2luZ1JlbGF0aW9uc2hpcE1lbWJlcnNbMF1cbiAgfSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldFBlb3BsZUlkc01pc3NpbmdSZWxhdGlvbnNoaXBzV2l0aFBlcnNvbihwZXJzb25JZCkge1xuICB2YXIgcmVtYWluaW5nUGVyc29uSWRzID0gZ2V0QWxsSG91c2Vob2xkTWVtYmVycygpLmZpbHRlcihpc0hvdXNlaG9sZE1lbWJlcikubWFwKGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICByZXR1cm4gbWVtYmVyWydAcGVyc29uJ10uaWQ7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhpcyBwZXJzb24gZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgcmVtb3ZlRnJvbUxpc3QocmVtYWluaW5nUGVyc29uSWRzLCBwZXJzb25JZCk7XG5cbiAgJC5lYWNoKGdldEFsbFJlbGF0aW9uc2hpcHMoKSwgZnVuY3Rpb24gKGksIHJlbGF0aW9uc2hpcCkge1xuICAgIGlmICghaXNJblJlbGF0aW9uc2hpcChwZXJzb25JZCwgcmVsYXRpb25zaGlwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgb3RoZXIgcGVyc29uIGZyb20gdGhlIHJlbWFpbmluZ1BlcnNvbklkcyBsaXN0XG4gICAgICovXG4gICAgcmVtb3ZlRnJvbUxpc3QocmVtYWluaW5nUGVyc29uSWRzLCBnZXRPdGhlclBlcnNvbklkRnJvbVJlbGF0aW9uc2hpcChwZXJzb25JZCwgcmVsYXRpb25zaGlwKSk7XG4gIH0pO1xuXG4gIHJldHVybiByZW1haW5pbmdQZXJzb25JZHM7XG59XG5cbmZ1bmN0aW9uIGdldFJlbGF0aW9uc2hpcFR5cGUocmVsYXRpb25zaGlwKSB7XG4gIHJldHVybiByZWxhdGlvbnNoaXBEZXNjcmlwdGlvbk1hcFtyZWxhdGlvbnNoaXAucGVyc29uSXNEZXNjcmlwdGlvbl0udHlwZTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBmcm9tIHJlbGF0aW9uc2hpcCBncm91cFxuICovXG5mdW5jdGlvbiBnZXRSZWxhdGlvbnNoaXBzV2l0aFBlcnNvbklkcyhyZWxhdGlvbnNoaXBzLCBpZEFycikge1xuICByZXR1cm4gcmVsYXRpb25zaGlwcy5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkUmVsYXRpb25zaGlwKSB7XG4gICAgcmV0dXJuIGlkQXJyLmluZGV4T2YoY2hpbGRSZWxhdGlvbnNoaXAucGVyc29uSXNJZCkgIT09IC0xIHx8IGlkQXJyLmluZGV4T2YoY2hpbGRSZWxhdGlvbnNoaXAucGVyc29uVG9JZCkgIT09IC0xO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVsYXRpb25zaGlwT2YocGVyc29uMSwgcGVyc29uMikge1xuICByZXR1cm4gZ2V0QWxsUmVsYXRpb25zaGlwcygpLmZpbmQoZnVuY3Rpb24gKHJlbGF0aW9uc2hpcCkge1xuICAgIHJldHVybiBpc0luUmVsYXRpb25zaGlwKHBlcnNvbjEsIHJlbGF0aW9uc2hpcCkgJiYgaXNJblJlbGF0aW9uc2hpcChwZXJzb24yLCByZWxhdGlvbnNoaXApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TmV4dFBlcnNvbklkKHBlcnNvbiQkMSkge1xuICBpZiAocGVyc29uJCQxID09PSAncGVyc29uX21lJykge1xuICAgIHJldHVybiAncGVyc29uMSc7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBlcnNvbkludCA9IHBlcnNvbiQkMS5zbGljZShwZXJzb24kJDEubGVuZ3RoIC0gMSwgcGVyc29uJCQxLmxlbmd0aCk7XG4gICAgcGVyc29uSW50ID0gKytwZXJzb25JbnQ7XG4gICAgcmV0dXJuICdwZXJzb24nICsgcGVyc29uSW50O1xuICB9XG59XG5cbnZhciBQRVJTT05BTF9ERVRBSUxTX0tFWSA9ICdpbmRpdmlkdWFsLWRldGFpbHMnO1xudmFyIFBFUlNPTkFMX1BJTlNfS0VZID0gJ2luZGl2aWR1YWwtcGlucyc7XG5cbnZhciBwZXJzb25hbERldGFpbHNNYXJpdGFsU3RhdHVzTWFwID0ge1xuICAnbmV2ZXInOiB7XG4gICAgZGVzY3JpcHRpb246ICdOZXZlciBtYXJyaWVkIGFuZCBuZXZlciByZWdpc3RlcmVkIGEgc2FtZS1zZXggY2l2aWwnICsgJyBwYXJ0bmVyc2hpcCdcbiAgfSxcbiAgJ21hcnJpZWQnOiB7XG4gICAgZGVzY3JpcHRpb246ICdNYXJyaWVkJ1xuICB9LFxuICAncmVnaXN0ZXJlZCc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ0luIGEgcmVnaXN0ZXJlZCBzYW1lLXNleCBjaXZpbCBwYXJ0bmVyc2hpcCdcbiAgfSxcbiAgJ3NlcGFyYXRlZC1tYXJyaWVkJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnU2VwYXJhdGVkLCBidXQgc3RpbGwgbGVnYWxseSBtYXJyaWVkJ1xuICB9LFxuICAnZGl2b3JjZWQnOiB7XG4gICAgZGVzY3JpcHRpb246ICdEaXZvcmNlZCdcbiAgfSxcbiAgJ2Zvcm1lci1wYXJ0bmVyc2hpcCc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ0Zvcm1lcmx5IGluIGEgc2FtZS1zZXggY2l2aWwgcGFydG5lcnNoaXAgd2hpY2ggaXMgbm93JyArICcgbGVnYWxseSBkaXNzb2x2ZWQnXG4gIH0sXG4gICd3aWRvd2VkJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnV2lkb3dlZCdcbiAgfSxcbiAgJ3N1cnZpdmluZy1wYXJ0bmVyJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnU3Vydml2aW5nIHBhcnRuZXIgZnJvbSBhIHNhbWUtc2V4IGNpdmlsIHBhcnRuZXJzaGlwJ1xuICB9LFxuICAnc2VwYXJhdGVkLXBhcnRuZXJzaGlwJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnU2VwYXJhdGVkLCBidXQgc3RpbGwgbGVnYWxseSBpbiBhIHNhbWUtc2V4IGNpdmlsIHBhcnRuZXJzaGlwJ1xuICB9XG59O1xuXG52YXIgcGVyc29uYWxEZXRhaWxzQ291bnRyeU1hcCA9IHtcbiAgJ2VuZ2xhbmQnOiB7XG4gICAgZGVzY3JpcHRpb246ICdFbmdsYW5kJ1xuICB9LFxuICAnd2FsZXMnOiB7XG4gICAgZGVzY3JpcHRpb246ICdXYWxlcydcbiAgfSxcbiAgJ3Njb3RsYW5kJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnU2NvdGxhbmQnXG4gIH0sXG4gICdub3J0aGVybi1pcmVsYW5kJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnTm9ydGhlcm4gSXJlbGFuZCdcbiAgfSxcbiAgJ3JlcHVibGljLWlyZWxhbmQnOiB7XG4gICAgZGVzY3JpcHRpb246ICdSZXB1YmxpYyBvZiBJcmVsYW5kJ1xuICB9XG59O1xuXG52YXIgcGVyc29uYWxEZXRhaWxzT3JpZW50YXRpb25NYXAgPSB7XG4gICdzdHJhaWdodCc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ1N0cmFpZ2h0IG9yIEhldGVyb3NleHVhbCdcbiAgfSxcbiAgJ2dheSc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ0dheSBvciBMZXNiaWFuJ1xuICB9LFxuICAnYmlzZXh1YWwnOiB7XG4gICAgZGVzY3JpcHRpb246ICdCaXNleHVhbCdcbiAgfSxcbiAgJ290aGVyJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnT3RoZXInXG4gIH0sXG4gICduby1zYXknOiB7XG4gICAgZGVzY3JpcHRpb246ICdQcmVmZXIgbm90IHRvIHNheSdcbiAgfVxufTtcblxudmFyIHBlcnNvbmFsRGV0YWlsc0dlbmRlck1hcCA9IHtcbiAgJ21hbGUnOiB7XG4gICAgZGVzY3JpcHRpb246ICdNYWxlJ1xuICB9LFxuICAnZmVtYWxlJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnRmVtYWxlJ1xuICB9XG59O1xuXG52YXIgcGVyc29uYWxEZXRhaWxzTmF0aW9uYWxJZGVudGl0eU1hcCA9IHtcbiAgJ2VuZ2xpc2gnOiB7XG4gICAgZGVzY3JpcHRpb246ICdFbmdsaXNoJ1xuICB9LFxuICAnd2Vsc2gnOiB7XG4gICAgZGVzY3JpcHRpb246ICdXZWxzaCdcbiAgfSxcbiAgJ3Njb3R0aXNoJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnU2NvdHRpc2gnXG4gIH0sXG4gICdub3J0aGVybi1pcmlzaCc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ05vcnRoZXJuIElyaXNoJ1xuICB9LFxuICAnYnJpdGlzaCc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ0JyaXRpc2gnXG4gIH1cbn07XG5cbnZhciBwZXJzb25hbERldGFpbHNQYXNzcG9ydENvdW50cmllc01hcCA9IHtcbiAgJ3VuaXRlZC1raW5nZG9tJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnVW5pdGVkIEtpbmdkb20nXG4gIH0sXG4gICdpcmVsYW5kJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnSXJlbGFuZCdcbiAgfSxcbiAgJ25vbmUnOiB7XG4gICAgZGVzY3JpcHRpb246ICdOb25lJ1xuICB9XG59O1xuXG52YXIgcGVyc29uYWxEZXRhaWxzRXRobmljR3JvdXBNYXAgPSB7XG4gICdXaGl0ZSc6IHtcbiAgICAncXVlc3Rpb24nOiAnV2hpdGUnLFxuICAgICdvcHRpb25zJzogW3tcbiAgICAgIHZhbDogJ0VuZ2xpc2gsIFdlbHNoLCBTY290dGlzaCwgTm9ydGhlcm4gSXJpc2ggb3IgQnJpdGlzaCcsXG4gICAgICBsYWJlbDogJ0VuZ2xpc2gsIFdlbHNoLCBTY290dGlzaCwgTm9ydGhlcm4gSXJpc2ggb3IgQnJpdGlzaCdcbiAgICB9LCB7XG4gICAgICB2YWw6ICdJcmlzaCcsXG4gICAgICBsYWJlbDogJ0lyaXNoJ1xuICAgIH0sIHtcbiAgICAgIHZhbDogJ0d5cHN5IG9yIElyaXNoIFRyYXZlbGVyJyxcbiAgICAgIGxhYmVsOiAnR3lwc3kgb3IgSXJpc2ggVHJhdmVsZXInXG4gICAgfSwge1xuICAgICAgdmFsOiAnUm9tYScsXG4gICAgICBsYWJlbDogJ1JvbWEnXG4gICAgfSwge1xuICAgICAgdmFsOiAnT3RoZXInLFxuICAgICAgbGFiZWw6ICdBbnkgb3RoZXIgV2hpdGUgYmFja2dyb3VuZCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1lvdSBjYW4gZW50ZXIgeW91ciBldGhuaWMgZ3JvdXAgb3IgYmFja2dyb3VuZCBvbiB0aGUgbmV4dCBxdWVzdGlvbidcbiAgICB9XVxuICB9LFxuICAnTWl4ZWQnOiB7XG4gICAgJ3F1ZXN0aW9uJzogJ01peGVkIG9yIE11bHRpcGxlJyxcbiAgICAnb3B0aW9ucyc6IFt7XG4gICAgICB2YWw6ICdXaGl0ZSBhbmQgQmxhY2sgQ2FyaWJiZWFuJyxcbiAgICAgIGxhYmVsOiAnV2hpdGUgYW5kIEJsYWNrIENhcmliYmVhbidcbiAgICB9LCB7XG4gICAgICB2YWw6ICdXaGl0ZSBhbmQgQmxhY2sgQWZyaWNhbicsXG4gICAgICBsYWJlbDogJ1doaXRlIGFuZCBCbGFjayBBZnJpY2FuJ1xuICAgIH0sIHtcbiAgICAgIHZhbDogJ1doaXRlIGFuZCBBc2lhbicsXG4gICAgICBsYWJlbDogJ1doaXRlIGFuZCBBc2lhbidcbiAgICB9LCB7XG4gICAgICB2YWw6ICdPdGhlcicsXG4gICAgICBsYWJlbDogJ0FueSBvdGhlciBNaXhlZCBvciBNdWx0aXBsZSBiYWNrZ3JvdW5kJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnWW91IGNhbiBlbnRlciB5b3VyIGV0aG5pYyBncm91cCBvciBiYWNrZ3JvdW5kIG9uIHRoZSBuZXh0IHF1ZXN0aW9uJ1xuICAgIH1dXG4gIH0sXG4gICdBc2lhbic6IHtcbiAgICAncXVlc3Rpb24nOiAnQXNpYW4gb3IgQXNpYW4gQnJpdGlzaCcsXG4gICAgJ29wdGlvbnMnOiBbe1xuICAgICAgdmFsOiAnSW5kaWFuJyxcbiAgICAgIGxhYmVsOiAnSW5kaWFuJ1xuICAgIH0sIHtcbiAgICAgIHZhbDogJ1Bha2lzdGFuaScsXG4gICAgICBsYWJlbDogJ1Bha2lzdGFuaSdcbiAgICB9LCB7XG4gICAgICB2YWw6ICdCYW5nbGFkZXNoaScsXG4gICAgICBsYWJlbDogJ0JhbmdsYWRlc2hpJ1xuICAgIH0sIHtcbiAgICAgIHZhbDogJ0NoaW5lc2UnLFxuICAgICAgbGFiZWw6ICdDaGluZXNlJ1xuICAgIH0sIHtcbiAgICAgIHZhbDogJ090aGVyJyxcbiAgICAgIGxhYmVsOiAnQW55IG90aGVyIEFzaWFuIGJhY2tncm91bmQnLFxuICAgICAgZGVzY3JpcHRpb246ICdZb3UgY2FuIGVudGVyIHlvdXIgZXRobmljIGdyb3VwIG9yIGJhY2tncm91bmQgb24gdGhlIG5leHQgcXVlc3Rpb24nXG4gICAgfV1cbiAgfSxcbiAgJ0JsYWNrJzoge1xuICAgICdxdWVzdGlvbic6ICdCbGFjaywgQmxhY2sgQnJpdGlzaCwgQ2FyaWJiZWFuIG9yIEFmcmljYW4nLFxuICAgICdxdWVzdGlvbkFmcmljYW4nOiAnQWZyaWNhbicsXG4gICAgJ3F1ZXN0aW9uV2l0aG91dEFmcmljYW4nOiAnQmxhY2ssIEJsYWNrIEJyaXRpc2ggb3IgQ2FyaWJiZWFuJyxcbiAgICAnb3B0aW9ucyc6IFt7XG4gICAgICB2YWw6ICdDYXJpYmJlYW4nLFxuICAgICAgbGFiZWw6ICdDYXJpYmJlYW4nXG4gICAgfSwge1xuICAgICAgdmFsOiAnQWZyaWNhbicsXG4gICAgICBsYWJlbDogJ0FmcmljYW4nLFxuICAgICAgZGVzY3JpcHRpb246ICdZb3UgY2FuIGVudGVyIHlvdXIgZXRobmljIGdyb3VwIG9yIGJhY2tncm91bmQgb24gdGhlIG5leHQgcXVlc3Rpb24nXG4gICAgfSwge1xuICAgICAgdmFsOiAnT3RoZXInLFxuICAgICAgbGFiZWw6ICdBbnkgb3RoZXIgQmxhY2ssIEJsYWNrIEJyaXRpc2ggb3IgQ2FyaWJiZWFuIGJhY2tncm91bmQnLFxuICAgICAgZGVzY3JpcHRpb246ICdZb3UgY2FuIGVudGVyIHlvdXIgZXRobmljIGdyb3VwIG9yIGJhY2tncm91bmQgb24gdGhlIG5leHQgcXVlc3Rpb24nXG4gICAgfV1cbiAgfSxcbiAgJ090aGVyJzoge1xuICAgICdxdWVzdGlvbic6ICcnLFxuICAgICdvcHRpb25zJzogW3tcbiAgICAgIHZhbDogJ0FyYWInLFxuICAgICAgbGFiZWw6ICdBcmFiJ1xuICAgIH0sIHtcbiAgICAgIHZhbDogJ090aGVyJyxcbiAgICAgIGxhYmVsOiAnQW55IG90aGVyIGV0aG5pYyBncm91cCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1lvdSBjYW4gZW50ZXIgeW91ciBldGhuaWMgZ3JvdXAgb3IgYmFja2dyb3VuZCBvbiB0aGUgbmV4dCBxdWVzdGlvbidcbiAgICB9XVxuICB9XG59O1xuXG52YXIgcGVyc29uYWxEZXRhaWxzQXBwcmVudGljZXNoaXBNYXAgPSB7XG4gICd5ZXMnOiB7XG4gICAgZGVzY3JpcHRpb246ICdZZXMnXG4gIH0sXG4gICdubyc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ05vJ1xuICB9XG59O1xuXG52YXIgcGVyc29uYWxEZXRhaWxzRGVncmVlQWJvdmVNYXAgPSB7XG4gICd5ZXMnOiB7XG4gICAgZGVzY3JpcHRpb246ICdZZXMnXG4gIH0sXG4gICdubyc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ05vJ1xuICB9XG59O1xuXG52YXIgcGVyc29uYWxEZXRhaWxzTlZRTWFwID0ge1xuICAnbnZxLWxldmVsLTEnOiB7XG4gICAgZGVzY3JpcHRpb246ICdOVlEgbGV2ZWwgMSBvciBlcXVpdmFsZW50J1xuICB9LFxuICAnbnZxLWxldmVsLTInOiB7XG4gICAgZGVzY3JpcHRpb246ICdOVlEgbGV2ZWwgMiBvciBlcXVpdmFsZW50J1xuICB9LFxuICAnbnZxLWxldmVsLTMnOiB7XG4gICAgZGVzY3JpcHRpb246ICdOVlEgbGV2ZWwgMyBvciBlcXVpdmFsZW50J1xuICB9LFxuICAnbm9uZSc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ05vbmUnXG4gIH1cbn07XG5cbnZhciBwZXJzb25hbERldGFpbHNBTGV2ZWxNYXAgPSB7XG4gICdhLWxldmVsLTInOiB7XG4gICAgZGVzY3JpcHRpb246ICcyIG9yIG1vcmUgQSBsZXZlbHMnXG4gIH0sXG4gICdhLWxldmVsLTEtYnRlYyc6IHtcbiAgICBkZXNjcmlwdGlvbjogJzEgQSBsZXZlbCdcbiAgfSxcbiAgJ2EtbGV2ZWwtMSc6IHtcbiAgICBkZXNjcmlwdGlvbjogJzEgQVMgbGV2ZWwnXG4gIH0sXG4gICdub25lJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnTm9uZSdcbiAgfVxufTtcblxudmFyIHBlcnNvbmFsRGV0YWlsc0dDU0VNYXAgPSB7XG4gICdnY3NlLTUnOiB7XG4gICAgZGVzY3JpcHRpb246ICc1IG9yIG1vcmUgR0NTRXMgZ3JhZGVzIEEqIHRvIEMgb3IgOSB0byA0J1xuICB9LFxuICAnb3RoZXItZ2NzZXMnOiB7XG4gICAgZGVzY3JpcHRpb246ICdBbnkgb3RoZXIgR0NTRXMnXG4gIH0sXG4gICdiYXNpYy1za2lsbHMnOiB7XG4gICAgZGVzY3JpcHRpb246ICdCYXNpYyBza2lsbHMgY291cnNlJ1xuICB9LFxuICAnbm9uZSc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ05vbmUgb2YgdGhlc2UgYXBwbHknXG4gIH1cbn07XG5cbnZhciBwZXJzb25hbERldGFpbHNPdGhlcldoZXJlID0ge1xuICAnaW4tZW5nbGFuZC13YWxlcyc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ1llcywgaW4gRW5nbGFuZCBvciBXYWxlcydcbiAgfSxcbiAgJ291dHNpZGUtZW5nbGFuZC13YWxlcyc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ1llcywgYW55d2hlcmUgb3V0c2lkZSBvZiBFbmdsYW5kIGFuZCBXYWxlcydcbiAgfSxcbiAgJ25vbmUnOiB7XG4gICAgZGVzY3JpcHRpb246ICdObyBxdWFsaWZpY2F0aW9ucydcbiAgfVxufTtcblxudmFyIHBlcnNvbmFsRGV0YWlsc0VtcGxveW1lbnRTdGF0dXMgPSB7XG4gICdlbXBsb3llZSc6IHtcbiAgICBkZXNjcmlwdGlvbjogJ0VtcGxveWVlJ1xuICB9LFxuICAnZnJlZWxhbmNlLXdpdGhvdXQtZW1wbG95ZWVzJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnU2VsZi1lbXBsb3llZCBvciBmcmVlbGFuY2Ugd2l0aG91dCBlbXBsb3llZXMnXG4gIH0sXG4gICdmcmVlbGFuY2Utd2l0aC1lbXBsb3llZXMnOiB7XG4gICAgZGVzY3JpcHRpb246ICdTZWxmLWVtcGxveWVkIHdpdGggZW1wbG95ZWVzJ1xuICB9LFxuICAnbm90LWVtcGxveWVkJzoge1xuICAgIGRlc2NyaXB0aW9uOiAnTm90IGVtcGxveWVkJ1xuICB9XG59O1xuXG5mdW5jdGlvbiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBtdXRhdGlvbikge1xuICB2YXIgZGV0YWlscyA9IGdldFBlcnNvbmFsRGV0YWlsc0ZvcihwZXJzb25JZCk7XG5cbiAgdXBkYXRlUGVyc29uYWxEZXRhaWxzKHBlcnNvbklkLCBfZXh0ZW5kcyh7fSwgZGV0YWlscywgbXV0YXRpb24oZGV0YWlscyB8fCB7fSkpKTtcblxuICByZXR1cm4gZGV0YWlscztcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlUGVyc29uYWxEZXRhaWxzRE9CKHBlcnNvbklkLCBkYXksIG1vbnRoLCB5ZWFyLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHZhciBmdWxsRGF0ZSA9IGRheSArIFwiL1wiICsgbW9udGggKyBcIi9cIiArIHllYXI7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkb2InOiB7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgIHllYXI6IHllYXIsXG4gICAgICAgIGZ1bGxEYXRlOiBmdWxsRGF0ZSxcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVNYXJpdGFsU3RhdHVzKHBlcnNvbklkLCB2YWwsIHF1ZXN0aW9uLCB1cmwpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21hcml0YWxTdGF0dXMnOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZU1hcml0YWxTdGF0dXNXaG8ocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbWFyaXRhbFN0YXR1c1dobyc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlMzBEYXlBZGRyZXNzVWsocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICB2YXIgYWRkcmVzcyA9IHZhbC5hZGRyZXNzO1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnQWRkcmVzczMwRGF5VUsnOiB7XG4gICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZTMwRGF5QWRkcmVzc1R5cGUocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnQWRkcmVzczMwRGF5VHlwZSc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlMzBEYXlDb3VudHJ5KHBlcnNvbklkLCB2YWx1ZSwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ0FkZHJlc3MzMERheUNvdW50cnknOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snQWRkcmVzczMwRGF5Q291bnRyeSddIHx8IHt9LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlQ291bnRyeShwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnY291bnRyeSc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydjb3VudHJ5J10gfHwge30sIHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUNvdW50cnlPdGhlcihwZXJzb25JZCwgdmFsT3RoZXIsIHF1ZXN0aW9uT3RoZXIsIHVybE90aGVyKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnY291bnRyeSc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydjb3VudHJ5J10gfHwge30sIHtcbiAgICAgICAgdmFsT3RoZXI6IHZhbE90aGVyLFxuICAgICAgICBxdWVzdGlvbk90aGVyOiBxdWVzdGlvbk90aGVyLFxuICAgICAgICB1cmxPdGhlcjogdXJsT3RoZXJcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUNvdW50cnlPdGhlckFycml2ZShwZXJzb25JZCwgbW9udGgsIHllYXIsIHF1ZXN0aW9uLCB1cmwpIHtcbiAgdmFyIGZ1bGxEYXRlID0gbW9udGggKyBcIi9cIiArIHllYXI7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRlQXJyaXZlVWsnOiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhcixcbiAgICAgICAgZnVsbERhdGU6IGZ1bGxEYXRlLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUNvdW50cnlPdGhlckFycml2ZUNlbnN1cyhwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdhcnJpdmVDZW5zdXNEYXknOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUNvdW50cnlPdGhlclN0YXkocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnc3RheUluVWsnOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZU5hdGlvbmFsSWRlbnRpdHkocGVyc29uSWQsIGNvbGxlY3Rpb24sIHF1ZXN0aW9uLCB1cmwpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ25hdGlvbmFsSWRlbnRpdHknOiB7XG4gICAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb24sXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlTmF0aW9uYWxJZGVudGl0eU90aGVyKHBlcnNvbklkLCBuaU90aGVyLCBxdWVzdGlvbk90aGVyLCB1cmxPdGhlcikge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ25hdGlvbmFsSWRlbnRpdHknOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snbmF0aW9uYWxJZGVudGl0eSddIHx8IHt9LCB7XG4gICAgICAgIG5pT3RoZXI6IG5pT3RoZXIsXG4gICAgICAgIHF1ZXN0aW9uT3RoZXI6IHF1ZXN0aW9uT3RoZXIsXG4gICAgICAgIHVybE90aGVyOiB1cmxPdGhlclxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlRXRobmljR3JvdXAocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZXRobmljR3JvdXAnOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUV0aG5pY0dyb3VwRGVzY3JpcHRpb24ocGVyc29uSWQsIGRlc2NyaXB0aW9uLCBxdWVzdGlvbkRlc2NyaXB0aW9uLCB1cmxEZXNjcmlwdGlvbikge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2V0aG5pY0dyb3VwJzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2V0aG5pY0dyb3VwJ10gfHwge30sIHtcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgICBxdWVzdGlvbkRlc2NyaXB0aW9uOiBxdWVzdGlvbkRlc2NyaXB0aW9uLFxuICAgICAgICB1cmxEZXNjcmlwdGlvbjogdXJsRGVzY3JpcHRpb25cbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUV0aG5pY0dyb3VwT3RoZXIocGVyc29uSWQsIG90aGVyVGV4dCwgcXVlc3Rpb25PdGhlciwgdXJsT3RoZXIpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdldGhuaWNHcm91cCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydldGhuaWNHcm91cCddIHx8IHt9LCB7XG4gICAgICAgIG90aGVyVGV4dDogb3RoZXJUZXh0LFxuICAgICAgICBxdWVzdGlvbk90aGVyOiBxdWVzdGlvbk90aGVyLFxuICAgICAgICB1cmxPdGhlcjogdXJsT3RoZXJcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVJlbGlnaW9uKHBlcnNvbklkLCBkZXNjcmlwdGlvbiwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3JlbGlnaW9uJzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ3JlbGlnaW9uJ10gfHwge30sIHsgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIH0sIHtcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlUmVsaWdpb25PdGhlcihwZXJzb25JZCwgZGVzY3JpcHRpb25PdGhlciwgcXVlc3Rpb25PdGhlciwgdXJsT3RoZXIpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdyZWxpZ2lvbic6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydyZWxpZ2lvbiddIHx8IHt9LCB7IGRlc2NyaXB0aW9uT3RoZXI6IGRlc2NyaXB0aW9uT3RoZXIgfSwge1xuICAgICAgICBxdWVzdGlvbk90aGVyOiBxdWVzdGlvbk90aGVyLFxuICAgICAgICB1cmxPdGhlcjogdXJsT3RoZXJcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUxhbmd1YWdlKHBlcnNvbklkLCBsYW5nLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnbGFuZ3VhZ2UnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snbGFuZ3VhZ2UnXSB8fCB7fSwgeyBsYW5nOiBsYW5nIH0sIHtcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlTGFuZ3VhZ2VPdGhlcihwZXJzb25JZCwgb3RoZXIsIHF1ZXN0aW9uT3RoZXIsIHVybE90aGVyKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnbGFuZ3VhZ2UnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snbGFuZ3VhZ2UnXSB8fCB7fSwgeyBvdGhlcjogb3RoZXIgfSwge1xuICAgICAgICBxdWVzdGlvbk90aGVyOiBxdWVzdGlvbk90aGVyLFxuICAgICAgICB1cmxPdGhlcjogdXJsT3RoZXJcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUxhbmd1YWdlRW5nbGlzaChwZXJzb25JZCwgZW5nbGlzaCwgcXVlc3Rpb25FbmdsaXNoTGV2ZWwsIHVybEVuZ2xpc2hMZXZlbCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2xhbmd1YWdlJzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2xhbmd1YWdlJ10gfHwge30sIHsgZW5nbGlzaDogZW5nbGlzaCB9LCB7XG4gICAgICAgIHF1ZXN0aW9uRW5nbGlzaExldmVsOiBxdWVzdGlvbkVuZ2xpc2hMZXZlbCxcbiAgICAgICAgdXJsRW5nbGlzaExldmVsOiB1cmxFbmdsaXNoTGV2ZWxcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVBhc3Nwb3J0Q291bnRyeShwZXJzb25JZCwgY291bnRyaWVzLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAncGFzc3BvcnQnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1sncGFzc3BvcnQnXSB8fCB7fSwge1xuICAgICAgICBjb3VudHJpZXM6IGNvdW50cmllcyxcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlUGFzc3BvcnRDb3VudHJ5T3RoZXIocGVyc29uSWQsIG90aGVyVGV4dCwgcXVlc3Rpb25PdGhlciwgdXJsT3RoZXIpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdwYXNzcG9ydCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydwYXNzcG9ydCddIHx8IHt9LCB7XG4gICAgICAgIG90aGVyVGV4dDogb3RoZXJUZXh0LFxuICAgICAgICBxdWVzdGlvbk90aGVyOiBxdWVzdGlvbk90aGVyLFxuICAgICAgICB1cmxPdGhlcjogdXJsT3RoZXJcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUhlYWx0aChwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnaGVhbHRoJzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2hlYWx0aCddIHx8IHt9LCB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVIZWFsdGhDb25kaXRpb25zKHBlcnNvbklkLCBjb25kaXRpb25zLCBxdWVzdGlvbkNvbmRpdGlvbnMsIHVybENvbmRpdGlvbnMpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdoZWFsdGgnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snaGVhbHRoJ10gfHwge30sIHtcbiAgICAgICAgY29uZGl0aW9uczogY29uZGl0aW9ucyxcbiAgICAgICAgcXVlc3Rpb25Db25kaXRpb25zOiBxdWVzdGlvbkNvbmRpdGlvbnMsXG4gICAgICAgIHVybENvbmRpdGlvbnM6IHVybENvbmRpdGlvbnNcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUhlYWx0aENvbmRpdGlvbnNBYmlsaXRpZXMocGVyc29uSWQsIGFiaWxpdGllcywgcXVlc3Rpb25BYmlsaXRpZXMsIHVybEFiaWxpdGllcykge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2hlYWx0aCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydoZWFsdGgnXSB8fCB7fSwge1xuICAgICAgICBhYmlsaXRpZXM6IGFiaWxpdGllcyxcbiAgICAgICAgcXVlc3Rpb25BYmlsaXRpZXM6IHF1ZXN0aW9uQWJpbGl0aWVzLFxuICAgICAgICB1cmxBYmlsaXRpZXM6IHVybEFiaWxpdGllc1xuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlSGVhbHRoU3VwcG9ydChwZXJzb25JZCwgYW1vdW50LCBxdWVzdGlvblN1cHBvcnQsIHVybFN1cHBvcnQpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdoZWFsdGgnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snaGVhbHRoJ10gfHwge30sIHtcbiAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgIHF1ZXN0aW9uU3VwcG9ydDogcXVlc3Rpb25TdXBwb3J0LFxuICAgICAgICB1cmxTdXBwb3J0OiB1cmxTdXBwb3J0XG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVPcmllbnRhdGlvbihwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdvcmllbnRhdGlvbic6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlSWRlbnRpdHkocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnaWRlbnRpdHknOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVNhbGFyeShwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdzYWxhcnknOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVNleChwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdzZXgnOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVNjaG9vbChwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdzY2hvb2wnOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVN0dWRlbnQocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnc3R1ZGVudCc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlU3R1ZGVudEFkZGFkZHJlc3NJblVLKHBlcnNvbklkLCB2YWwsIHF1ZXN0aW9uLCB1cmwpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3N0dWRlbnRBZGRyZXNzSW5VSyc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlU3R1ZGVudEFkZHJlc3MocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnc3R1ZGVudEFkZHJlc3MnOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVN0dWRlbnRBZGRyZXNzVWsocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICB2YXIgYWRkcmVzcyA9IHZhbC5hZGRyZXNzTGluZTEgKyAnLCAnICsgdmFsLmFkZHJlc3NMaW5lMjtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ0FkZHJlc3NTdHVkZW50VUsnOiB7XG4gICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZVN0dWRlbnRBZGRyZXNzQ291bnRyeShwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnQWRkcmVzc1N0dWRlbnRDb3VudHJ5JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ0FkZHJlc3NTdHVkZW50Q291bnRyeSddIHx8IHt9LCB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVBZGRyZXNzV2hlcmUocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnYWRkcmVzc1doZXJlJzoge1xuICAgICAgICB2YWw6IHZhbCxcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVZZWFyQWdvQWRkcmVzcyhwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd5ZWFyQWdvQWRkcmVzcyc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlWWVhckFnb0FkZHJlc3NVayhwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd5ZWFyQWdvQWRkcmVzc1VLJzoge1xuICAgICAgICB2YWw6IHZhbCxcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVZZWFyQWdvQWRkcmVzc0NvdW50cnkocGVyc29uSWQsIHZhbHVlLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAneWVhckFnb0FkZHJlc3NDb3VudHJ5JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ3llYXJBZ29BZGRyZXNzQ291bnRyeSddIHx8IHt9LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlQWdlKHBlcnNvbklkLCBhZ2UpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2FnZSc6IGFnZVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVBZ2VDb25maXJtKHBlcnNvbklkLCB2YWwsIHF1ZXN0aW9uLCB1cmwpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2FnZUNvbmZpcm0nOiB7XG4gICAgICAgIHZhbDogdmFsLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUFkZHJlc3NPdXRzaWRlVUsocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnYWRkcmVzc091dHNpZGVVayc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlQWRkcmVzc0luZGl2aWR1YWwocGVyc29uSWQsIHZhbCwgcXVlc3Rpb24sIHVybCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlQXBwcmVudGljZXNoaXAocGVyc29uSWQsIGhhc0FwcHJlbnRpY2VzaGlwLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdhcHByZW50aWNlc2hpcCc6IHtcbiAgICAgICAgaGFzQXBwcmVudGljZXNoaXA6IGhhc0FwcHJlbnRpY2VzaGlwLFxuICAgICAgICBxdWVzdGlvbjogcXVlc3Rpb24sXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUhhc1F1YWxpZmljYXRpb25BYm92ZShwZXJzb25JZCwgYWJvdmVEZWdyZWUsIHF1ZXN0aW9uQWJvdmUsIHVybEFib3ZlKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAncXVhbGlmaWNhdGlvbnMnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1sncXVhbGlmaWNhdGlvbnMnXSB8fCB7fSwge1xuICAgICAgICBhYm92ZURlZ3JlZTogYWJvdmVEZWdyZWUsXG4gICAgICAgIHF1ZXN0aW9uQWJvdmU6IHF1ZXN0aW9uQWJvdmUsXG4gICAgICAgIHVybEFib3ZlOiB1cmxBYm92ZVxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlUXVhbGlmaWNhdGlvbnNOdnFFcXVpdmFsZW50KHBlcnNvbklkLCBudnFFcXVpdmFsZW50LCBxdWVzdGlvbk52cUVxdWl2YWxlbnQsIHVybE52cUVxdWl2YWxlbnQpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdxdWFsaWZpY2F0aW9ucyc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydxdWFsaWZpY2F0aW9ucyddIHx8IHt9LCB7XG4gICAgICAgIG52cUVxdWl2YWxlbnQ6IG52cUVxdWl2YWxlbnQsXG4gICAgICAgIHF1ZXN0aW9uTnZxRXF1aXZhbGVudDogcXVlc3Rpb25OdnFFcXVpdmFsZW50LFxuICAgICAgICB1cmxOdnFFcXVpdmFsZW50OiB1cmxOdnFFcXVpdmFsZW50XG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVRdWFsaWZpY2F0aW9uc0FMZXZlbChwZXJzb25JZCwgYUxldmVscywgcXVlc3Rpb25BTGV2ZWwsIHVybEFMZXZlbCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3F1YWxpZmljYXRpb25zJzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ3F1YWxpZmljYXRpb25zJ10gfHwge30sIHtcbiAgICAgICAgYUxldmVsczogYUxldmVscyxcbiAgICAgICAgcXVlc3Rpb25BTGV2ZWw6IHF1ZXN0aW9uQUxldmVsLFxuICAgICAgICB1cmxBTGV2ZWw6IHVybEFMZXZlbFxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlUXVhbGlmaWNhdGlvbnNHQ1NFcyhwZXJzb25JZCwgZ2NzZXMsIHF1ZXN0aW9uR0NTRXMsIHVybEdDU0VzKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAncXVhbGlmaWNhdGlvbnMnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1sncXVhbGlmaWNhdGlvbnMnXSB8fCB7fSwge1xuICAgICAgICBnY3NlczogZ2NzZXMsXG4gICAgICAgIHF1ZXN0aW9uR0NTRXM6IHF1ZXN0aW9uR0NTRXMsXG4gICAgICAgIHVybEdDU0VzOiB1cmxHQ1NFc1xuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlUXVhbGlmaWNhdGlvbnNPdGhlcldoZXJlKHBlcnNvbklkLCBvdGhlcnNXaGVyZSwgcXVlc3Rpb25PdGhlcldoZXJlLCB1cmxPdGhlcldoZXJlKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAncXVhbGlmaWNhdGlvbnMnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1sncXVhbGlmaWNhdGlvbnMnXSB8fCB7fSwge1xuICAgICAgICBvdGhlcnNXaGVyZTogb3RoZXJzV2hlcmUsXG4gICAgICAgIHF1ZXN0aW9uT3RoZXJXaGVyZTogcXVlc3Rpb25PdGhlcldoZXJlLFxuICAgICAgICB1cmxPdGhlcldoZXJlOiB1cmxPdGhlcldoZXJlXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVBcm1lZEZvcmNlcyhwZXJzb25JZCwgdmFsLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdhcm1lZEZvcmNlcyc6IHtcbiAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlTGFzdFNldmVuRGF5cyhwZXJzb25JZCwgc2V2ZW5EYXlzQWdvLCBxdWVzdGlvbiwgdXJsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgc2V2ZW5EYXlzQWdvOiBzZXZlbkRheXNBZ28sXG4gICAgICAgIHF1ZXN0aW9uOiBxdWVzdGlvbixcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUxhc3RTZXZlbkRheXNEZXNjcmlwdGlvbihwZXJzb25JZCwgZGVzY3JpcHRpb24sIHF1ZXN0aW9uU2V2ZW5EYXlzRGVzY3JpcHRpb24sIHVybFNldmVuRGF5c0Rlc2NyaXB0aW9uKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgICBxdWVzdGlvblNldmVuRGF5c0Rlc2NyaXB0aW9uOiBxdWVzdGlvblNldmVuRGF5c0Rlc2NyaXB0aW9uLFxuICAgICAgICB1cmxTZXZlbkRheXNEZXNjcmlwdGlvbjogdXJsU2V2ZW5EYXlzRGVzY3JpcHRpb25cbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUVtcGxveW1lbnRGb3VyV2Vla3MocGVyc29uSWQsIGZvdXJXZWVrc0FnbywgcXVlc3Rpb25Gb3VyV2Vla3MsIHVybEZvdXJXZWVrcykge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2VtcGxveW1lbnQnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snZW1wbG95bWVudCddIHx8IHt9LCB7XG4gICAgICAgIGZvdXJXZWVrc0FnbzogZm91cldlZWtzQWdvLFxuICAgICAgICBxdWVzdGlvbkZvdXJXZWVrczogcXVlc3Rpb25Gb3VyV2Vla3MsXG4gICAgICAgIHVybEZvdXJXZWVrczogdXJsRm91cldlZWtzXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVFbXBsb3ltZW50QXZhaWxhYmxlVHdvV2Vla3MocGVyc29uSWQsIGF2YWlsYWJsZUluVHdvV2Vla3MsIHF1ZXN0aW9uQXZhaWxhYmxlVHdvV2Vla3MsIHVybEF2YWlsYWJsZVR3b1dlZWtzKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgYXZhaWxhYmxlSW5Ud29XZWVrczogYXZhaWxhYmxlSW5Ud29XZWVrcyxcbiAgICAgICAgcXVlc3Rpb25BdmFpbGFibGVUd29XZWVrczogcXVlc3Rpb25BdmFpbGFibGVUd29XZWVrcyxcbiAgICAgICAgdXJsQXZhaWxhYmxlVHdvV2Vla3M6IHVybEF2YWlsYWJsZVR3b1dlZWtzXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVFbXBsb3ltZW50UGFpZFdvcmtDb25maXJtKHBlcnNvbklkLCBwYWlkV29ya0NvbmZpcm0sIHF1ZXN0aW9uUGFpZFdvcmtDb25maXJtLCB1cmxQYWlkV29ya0NvbmZpcm0pIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbXBsb3ltZW50JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2VtcGxveW1lbnQnXSB8fCB7fSwge1xuICAgICAgICBwYWlkV29ya0NvbmZpcm06IHBhaWRXb3JrQ29uZmlybSxcbiAgICAgICAgcXVlc3Rpb25QYWlkV29ya0NvbmZpcm06IHF1ZXN0aW9uUGFpZFdvcmtDb25maXJtLFxuICAgICAgICB1cmxQYWlkV29ya0NvbmZpcm06IHVybFBhaWRXb3JrQ29uZmlybVxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlRW1wbG95bWVudEFjY2VwdGVkSm9iKHBlcnNvbklkLCBhY2NlcHRlZEpvYiwgcXVlc3Rpb25BY2NlcHRlZEpvYiwgdXJsQWNjZXB0ZWRKb2IpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbXBsb3ltZW50JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2VtcGxveW1lbnQnXSB8fCB7fSwge1xuICAgICAgICBhY2NlcHRlZEpvYjogYWNjZXB0ZWRKb2IsXG4gICAgICAgIHF1ZXN0aW9uQWNjZXB0ZWRKb2I6IHF1ZXN0aW9uQWNjZXB0ZWRKb2IsXG4gICAgICAgIHVybEFjY2VwdGVkSm9iOiB1cmxBY2NlcHRlZEpvYlxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlRW1wbG95bWVudFN0YXR1cyhwZXJzb25JZCwgc3RhdHVzLCBxdWVzdGlvblN0YXR1cywgdXJsU3RhdHVzKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgc3RhdHVzOiBzdGF0dXMsXG4gICAgICAgIHF1ZXN0aW9uU3RhdHVzOiBxdWVzdGlvblN0YXR1cyxcbiAgICAgICAgdXJsU3RhdHVzOiB1cmxTdGF0dXNcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUVtcGxveW1lbnROYW1lKHBlcnNvbklkLCBuYW1lLCBxdWVzdGlvbk5hbWUsIHVybE5hbWUpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbXBsb3ltZW50JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2VtcGxveW1lbnQnXSB8fCB7fSwge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBxdWVzdGlvbk5hbWU6IHF1ZXN0aW9uTmFtZSxcbiAgICAgICAgdXJsTmFtZTogdXJsTmFtZVxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlRW1wbG95bWVudEpvYlRpdGxlKHBlcnNvbklkLCBqb2JUaXRsZSwgcXVlc3Rpb25Kb2JUaXRsZSwgdXJsSm9iVGl0bGUpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbXBsb3ltZW50JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2VtcGxveW1lbnQnXSB8fCB7fSwge1xuICAgICAgICBqb2JUaXRsZTogam9iVGl0bGUsXG4gICAgICAgIHF1ZXN0aW9uSm9iVGl0bGU6IHF1ZXN0aW9uSm9iVGl0bGUsXG4gICAgICAgIHVybEpvYlRpdGxlOiB1cmxKb2JUaXRsZVxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlRW1wbG95bWVudEpvYkRlc2NyaXB0aW9uKHBlcnNvbklkLCBqb2JEZXNjcmlwdGlvbiwgcXVlc3Rpb25Kb2JEZXNjcmlwdGlvbiwgdXJsSm9iRGVzY3JpcHRpb24pIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbXBsb3ltZW50JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2VtcGxveW1lbnQnXSB8fCB7fSwge1xuICAgICAgICBqb2JEZXNjcmlwdGlvbjogam9iRGVzY3JpcHRpb24sXG4gICAgICAgIHF1ZXN0aW9uSm9iRGVzY3JpcHRpb246IHF1ZXN0aW9uSm9iRGVzY3JpcHRpb24sXG4gICAgICAgIHVybEpvYkRlc2NyaXB0aW9uOiB1cmxKb2JEZXNjcmlwdGlvblxuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlRW1wbG95bWVudEJ1c2luZXNzQWN0aXZpdHkocGVyc29uSWQsIGJ1c2luZXNzQWN0aXZpdHksIHF1ZXN0aW9uQnVzaW5lc3NBY3Rpdml0eSwgdXJsQnVzaW5lc3NBY3Rpdml0eSkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2VtcGxveW1lbnQnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snZW1wbG95bWVudCddIHx8IHt9LCB7XG4gICAgICAgIGJ1c2luZXNzQWN0aXZpdHk6IGJ1c2luZXNzQWN0aXZpdHksXG4gICAgICAgIHF1ZXN0aW9uQnVzaW5lc3NBY3Rpdml0eTogcXVlc3Rpb25CdXNpbmVzc0FjdGl2aXR5LFxuICAgICAgICB1cmxCdXNpbmVzc0FjdGl2aXR5OiB1cmxCdXNpbmVzc0FjdGl2aXR5XG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVFbXBsb3ltZW50UmVzcG9uc2liaWxpdGllcyhwZXJzb25JZCwgcmVzcG9uc2liaWxpdGllcywgcXVlc3Rpb25SZXNwb25zaWJpbGl0aWVzLCB1cmxSZXNwb25zaWJpbGl0aWVzKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgcmVzcG9uc2liaWxpdGllczogcmVzcG9uc2liaWxpdGllcyxcbiAgICAgICAgcXVlc3Rpb25SZXNwb25zaWJpbGl0aWVzOiBxdWVzdGlvblJlc3BvbnNpYmlsaXRpZXMsXG4gICAgICAgIHVybFJlc3BvbnNpYmlsaXRpZXM6IHVybFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUVtcGxveW1lbnRIb3Vyc1dvcmtlZChwZXJzb25JZCwgaG91cnMsIHF1ZXN0aW9uSG91cnNXb3JrZWQsIHVybEhvdXJzV29ya2VkKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgaG91cnM6IGhvdXJzLFxuICAgICAgICBxdWVzdGlvbkhvdXJzV29ya2VkOiBxdWVzdGlvbkhvdXJzV29ya2VkLFxuICAgICAgICB1cmxIb3Vyc1dvcmtlZDogdXJsSG91cnNXb3JrZWRcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUVtcGxveW1lbnRUcmF2ZWwocGVyc29uSWQsIG1vZGVPZlRyYXZlbCwgcXVlc3Rpb25FbXBsb3ltZW50VHJhdmVsLCB1cmxFbXBsb3ltZW50VHJhdmVsKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgbW9kZU9mVHJhdmVsOiBtb2RlT2ZUcmF2ZWwsXG4gICAgICAgIHF1ZXN0aW9uRW1wbG95bWVudFRyYXZlbDogcXVlc3Rpb25FbXBsb3ltZW50VHJhdmVsLFxuICAgICAgICB1cmxFbXBsb3ltZW50VHJhdmVsOiB1cmxFbXBsb3ltZW50VHJhdmVsXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVFbXBsb3ltZW50TWFpbmx5V29yayhwZXJzb25JZCwgbWFpbmx5V29yaywgcXVlc3Rpb25NYWlubHlXb3JrLCB1cmxNYWlubHlXb3JrKSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoZGV0YWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAnZW1wbG95bWVudCc6IF9leHRlbmRzKHt9LCBkZXRhaWxzWydlbXBsb3ltZW50J10gfHwge30sIHtcbiAgICAgICAgbWFpbmx5V29yazogbWFpbmx5V29yayxcbiAgICAgICAgcXVlc3Rpb25NYWlubHlXb3JrOiBxdWVzdGlvbk1haW5seVdvcmssXG4gICAgICAgIHVybE1haW5seVdvcms6IHVybE1haW5seVdvcmtcbiAgICAgIH0pXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUVtcGxveW1lbnRXb3JrVUsocGVyc29uSWQsIHdvcmtVSywgcXVlc3Rpb25Xb3JrVUssIHVybFdvcmtVSykge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2VtcGxveW1lbnQnOiBfZXh0ZW5kcyh7fSwgZGV0YWlsc1snZW1wbG95bWVudCddIHx8IHt9LCB7XG4gICAgICAgIHdvcmtVSzogd29ya1VLLFxuICAgICAgICBxdWVzdGlvbldvcmtVSzogcXVlc3Rpb25Xb3JrVUssXG4gICAgICAgIHVybFdvcmtVSzogdXJsV29ya1VLXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVFbXBsb3ltZW50T3V0c2lkZVVLKHBlcnNvbklkLCB3b3JrT3V0c2lkZVVLLCBxdWVzdGlvbldvcmtPdXRzaWRlVUssIHVybFdvcmtPdXRzaWRlVUspIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbXBsb3ltZW50JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2VtcGxveW1lbnQnXSB8fCB7fSwge1xuICAgICAgICB3b3JrT3V0c2lkZVVLOiB3b3JrT3V0c2lkZVVLLFxuICAgICAgICBxdWVzdGlvbldvcmtPdXRzaWRlVUs6IHF1ZXN0aW9uV29ya091dHNpZGVVSyxcbiAgICAgICAgdXJsV29ya091dHNpZGVVSzogdXJsV29ya091dHNpZGVVS1xuICAgICAgfSlcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVXBkYXRlRW1wbG95bWVudFdvcmtwbGFjZUFkZHJlc3MocGVyc29uSWQsIHdvcmtBZGRyZXNzLCBxdWVzdGlvbldvcmtwbGFjZUFkZHJlc3MsIHVybFdvcmtwbGFjZUFkZHJlc3MpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbXBsb3ltZW50JzogX2V4dGVuZHMoe30sIGRldGFpbHNbJ2VtcGxveW1lbnQnXSB8fCB7fSwge1xuICAgICAgICB3b3JrQWRkcmVzczogd29ya0FkZHJlc3MsXG4gICAgICAgIHF1ZXN0aW9uV29ya3BsYWNlQWRkcmVzczogcXVlc3Rpb25Xb3JrcGxhY2VBZGRyZXNzLFxuICAgICAgICB1cmxXb3JrcGxhY2VBZGRyZXNzOiB1cmxXb3JrcGxhY2VBZGRyZXNzXG4gICAgICB9KVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVWaXNpdG9yQ29tcGxldGUocGVyc29uSWQsIHZhbCkge1xuICByZXR1cm4gY2hhbmdlRGV0YWlsc0ZvcihwZXJzb25JZCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY29tcGxldGUnOiB7XG4gICAgICAgIHZhbDogdmFsXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFBpbnMoKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEVSU09OQUxfUElOU19LRVkpKSB8fCB7fTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGluRm9yKHBlcnNvbklkKSB7XG4gIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICB2YXIgcGlucyA9IGdldFBpbnMoKTtcblxuICBwaW5zW3BlcnNvbklkXSA9IHtcbiAgICBwaW46IF8ucmFuZG9tKDEwMDAwLCA5OTk5OSksXG4gICAgZXhwb3J0ZWQ6ICEhb3B0cy5leHBvcnRlZFxuICB9O1xuXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEVSU09OQUxfUElOU19LRVksIEpTT04uc3RyaW5naWZ5KHBpbnMpKTtcblxuICByZXR1cm4gcGluc1twZXJzb25JZF07XG59XG5cbmZ1bmN0aW9uIGdldFBpbkZvcihwZXJzb25JZCkge1xuICByZXR1cm4gZ2V0UGlucygpW3BlcnNvbklkXTtcbn1cblxuZnVuY3Rpb24gdW5zZXRQaW5Gb3IocGVyc29uSWQpIHtcbiAgdmFyIHBpbnMgPSBnZXRQaW5zKCk7XG5cbiAgZGVsZXRlIHBpbnNbcGVyc29uSWRdO1xuXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEVSU09OQUxfUElOU19LRVksIEpTT04uc3RyaW5naWZ5KHBpbnMpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUGVyc29uYWxEZXRhaWxzKHBlcnNvbklkLCBkZXRhaWxzKSB7XG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEVSU09OQUxfREVUQUlMU19LRVksIEpTT04uc3RyaW5naWZ5KF9leHRlbmRzKHt9LCBnZXRBbGxQZXJzb25hbERldGFpbHMoKSwgZGVmaW5lUHJvcGVydHkoe30sIHBlcnNvbklkLCBkZXRhaWxzKSkpKTtcblxuICByZXR1cm4gZGV0YWlscztcbn1cblxuZnVuY3Rpb24gZ2V0QWxsUGVyc29uYWxEZXRhaWxzKCkge1xuICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBFUlNPTkFMX0RFVEFJTFNfS0VZKSkgfHwge307XG59XG5cbmZ1bmN0aW9uIGdldFBlcnNvbmFsRGV0YWlsc0ZvcihwZXJzb25JZCkge1xuICB2YXIgc3RvcmFnZU9iaiA9IGdldEFsbFBlcnNvbmFsRGV0YWlscygpLFxuICAgICAgcGVyc29uT2JqID0gc3RvcmFnZU9ialtwZXJzb25JZF07XG5cbiAgaWYgKCFwZXJzb25PYmopIHtcbiAgICBjb25zb2xlLmxvZygnUGVyc29uYWwgZGV0YWlscyBmb3IgJyArIHBlcnNvbklkICsgJyBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBwZXJzb25PYmo7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVBlcnNvbmFsRGV0YWlsc0ZvcihwZXJzb25JZCkge1xuICB2YXIgc3RvcmFnZU9iaiA9IGdldEFsbFBlcnNvbmFsRGV0YWlscygpO1xuXG4gIGRlbGV0ZSBzdG9yYWdlT2JqW3BlcnNvbklkXTtcblxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBFUlNPTkFMX0RFVEFJTFNfS0VZLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlT2JqKSk7XG59XG5cbmZ1bmN0aW9uIHBlcnNvbmFsQm9va21hcmsocGVyc29uSWQsIHBhZ2UpIHtcbiAgcmV0dXJuIGNoYW5nZURldGFpbHNGb3IocGVyc29uSWQsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ19ib29rbWFyayc6IHtcbiAgICAgICAgcGFnZTogcGFnZVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRCb29rbWFya0ZvcihwZXJzb25JZCkge1xuICByZXR1cm4gZ2V0UGVyc29uYWxEZXRhaWxzRm9yKHBlcnNvbklkKVsnX2Jvb2ttYXJrJ10ucGFnZTtcbn1cblxuZnVuY3Rpb24gcGVyc29uYWxRdWVzdGlvblN1Ym1pdERlY29yYXRvcihwZXJzb25JZCwgY2FsbGJhY2ssIGUpIHtcbiAgdmFyIHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksXG4gICAgICBpc0VkaXRpbmcgPSB1cmxQYXJhbXMuZ2V0KCdlZGl0Jyk7XG5cbiAgIWlzRWRpdGluZyA/IHBlcnNvbmFsQm9va21hcmsocGVyc29uSWQsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKSA6IGNsZWFyUGVyc29uYWxCb29rbWFyayhwZXJzb25JZCk7XG5cbiAgY2FsbGJhY2soZSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyUGVyc29uYWxCb29rbWFyayhwZXJzb25JZCkge1xuICB2YXIgZGV0YWlscyA9IGdldFBlcnNvbmFsRGV0YWlsc0ZvcihwZXJzb25JZCk7XG5cbiAgZGVsZXRlIGRldGFpbHMuX2Jvb2ttYXJrO1xuXG4gIHVwZGF0ZVBlcnNvbmFsRGV0YWlscyhwZXJzb25JZCwgX2V4dGVuZHMoe30sIGRldGFpbHMpKTtcblxuICByZXR1cm4gZGV0YWlscztcbn1cblxuZnVuY3Rpb24gc2V0UHJveHkocGVyc29uSWQsIHByb3h5KSB7XG4gIHJldHVybiBjaGFuZ2VEZXRhaWxzRm9yKHBlcnNvbklkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3h5OiBwcm94eVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm94eUZvcihwZXJzb25JZCkge1xuICBpZiAoZ2V0UGVyc29uYWxEZXRhaWxzRm9yKHBlcnNvbklkKSkge1xuICAgIHJldHVybiBnZXRQZXJzb25hbERldGFpbHNGb3IocGVyc29uSWQpWydwcm94eSddO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyUHJveHkocGVyc29uSWQpIHtcbiAgdmFyIGRldGFpbHMgPSBnZXRQZXJzb25hbERldGFpbHNGb3IocGVyc29uSWQpO1xuXG4gIGRlbGV0ZSBkZXRhaWxzLnByb3h5O1xuXG4gIHVwZGF0ZVBlcnNvbmFsRGV0YWlscyhwZXJzb25JZCwgX2V4dGVuZHMoe30sIGRldGFpbHMpKTtcblxuICByZXR1cm4gZGV0YWlscztcbn1cblxuLyoqXG4gKiBDb3BpZWQgZnJvbTpcbiAqIGh0dHBzOi8vY29kZXJldmlldy5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvOTAzNDkvY2hhbmdpbmctbnVtYmVyLXRvLXdvcmRzLWluLWphdmFzY3JpcHRcbiAqID09PT09PT09PT09PT09PVxuICovXG52YXIgT05FX1RPX05JTkVURUVOID0gWydvbmUnLCAndHdvJywgJ3RocmVlJywgJ2ZvdXInLCAnZml2ZScsICdzaXgnLCAnc2V2ZW4nLCAnZWlnaHQnLCAnbmluZScsICd0ZW4nLCAnZWxldmVuJywgJ3R3ZWx2ZScsICd0aGlydGVlbicsICdmb3VydGVlbicsICdmaWZ0ZWVuJywgJ3NpeHRlZW4nLCAnc2V2ZW50ZWVuJywgJ2VpZ2h0ZWVuJywgJ25pbmV0ZWVuJ107XG5cbnZhciBURU5TID0gWyd0ZW4nLCAndHdlbnR5JywgJ3RoaXJ0eScsICdmb3J0eScsICdmaWZ0eScsICdzaXh0eScsICdzZXZlbnR5JywgJ2VpZ2h0eScsICduaW5ldHknXTtcblxudmFyIFNDQUxFUyA9IFsndGhvdXNhbmQnLCAnbWlsbGlvbicsICdiaWxsaW9uJywgJ3RyaWxsaW9uJ107XG5cbi8vIGhlbHBlciBmdW5jdGlvbiBmb3IgdXNlIHdpdGggQXJyYXkuZmlsdGVyXG5mdW5jdGlvbiBpc1RydXRoeShpdGVtKSB7XG4gIHJldHVybiAhIWl0ZW07XG59XG5cbi8vIGNvbnZlcnQgYSBudW1iZXIgaW50byAnY2h1bmtzJyBvZiAwLTk5OVxuZnVuY3Rpb24gY2h1bmsobnVtYmVyKSB7XG4gIHZhciB0aG91c2FuZHMgPSBbXTtcblxuICB3aGlsZSAobnVtYmVyID4gMCkge1xuICAgIHRob3VzYW5kcy5wdXNoKG51bWJlciAlIDEwMDApO1xuICAgIG51bWJlciA9IE1hdGguZmxvb3IobnVtYmVyIC8gMTAwMCk7XG4gIH1cblxuICByZXR1cm4gdGhvdXNhbmRzO1xufVxuXG4vLyB0cmFuc2xhdGUgYSBudW1iZXIgZnJvbSAxLTk5OSBpbnRvIEVuZ2xpc2hcbmZ1bmN0aW9uIGluRW5nbGlzaChudW1iZXIpIHtcbiAgdmFyIHRob3VzYW5kcyxcbiAgICAgIGh1bmRyZWRzLFxuICAgICAgdGVucyxcbiAgICAgIG9uZXMsXG4gICAgICB3b3JkcyA9IFtdO1xuXG4gIGlmIChudW1iZXIgPCAyMCkge1xuICAgIHJldHVybiBPTkVfVE9fTklORVRFRU5bbnVtYmVyIC0gMV07IC8vIG1heSBiZSB1bmRlZmluZWRcbiAgfVxuXG4gIGlmIChudW1iZXIgPCAxMDApIHtcbiAgICBvbmVzID0gbnVtYmVyICUgMTA7XG4gICAgdGVucyA9IG51bWJlciAvIDEwIHwgMDsgLy8gZXF1aXZhbGVudCB0byBNYXRoLmZsb29yKG51bWJlciAvIDEwKVxuXG4gICAgd29yZHMucHVzaChURU5TW3RlbnMgLSAxXSk7XG4gICAgd29yZHMucHVzaChpbkVuZ2xpc2gob25lcykpO1xuXG4gICAgcmV0dXJuIHdvcmRzLmZpbHRlcihpc1RydXRoeSkuam9pbignLScpO1xuICB9XG5cbiAgaHVuZHJlZHMgPSBudW1iZXIgLyAxMDAgfCAwO1xuICB3b3Jkcy5wdXNoKGluRW5nbGlzaChodW5kcmVkcykpO1xuICB3b3Jkcy5wdXNoKCdodW5kcmVkJyk7XG4gIHdvcmRzLnB1c2goaW5FbmdsaXNoKG51bWJlciAlIDEwMCkpO1xuXG4gIHJldHVybiB3b3Jkcy5maWx0ZXIoaXNUcnV0aHkpLmpvaW4oJyAnKTtcbn1cblxuLy8gYXBwZW5kIHRoZSB3b3JkIGZvciBhIHNjYWxlLiBNYWRlIGZvciB1c2Ugd2l0aCBBcnJheS5tYXBcbmZ1bmN0aW9uIGFwcGVuZFNjYWxlKGNodW5rLCBleHApIHtcbiAgdmFyIHNjYWxlO1xuICBpZiAoIWNodW5rKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc2NhbGUgPSBTQ0FMRVNbZXhwIC0gMV07XG4gIHJldHVybiBbY2h1bmssIHNjYWxlXS5maWx0ZXIoaXNUcnV0aHkpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiA9PT09PT09PT09PT09PT1cbiAqIEVuZCBjb3B5XG4gKi9cblxuLyoqXG4gKiBNb2RpZmljYXRpb24gLSBkZWNvcmF0b3JcbiAqL1xudmFyIE5VTUJFUl9UT19QT1NJVElPTl9URVhUX01BUCA9IHtcbiAgJ29uZSc6ICcxc3QnLFxuICAndHdvJzogJzJuZCcsXG4gICd0aHJlZSc6ICczcmQnLFxuICAnZm91cic6ICc0dGgnLFxuICAnZml2ZSc6ICc1dGgnLFxuICAnc2l4JzogJzZ0aCcsXG4gICdzZXZlbic6ICc3dGgnLFxuICAnZWlnaHQnOiAnOHRoJyxcbiAgJ25pbmUnOiAnOXRoJyxcbiAgJ3Rlbic6ICcxMHRoJyxcbiAgJ2VsZXZlbic6ICcxMXRoJyxcbiAgJ3R3ZWx2ZSc6ICcxMnRoJyxcbiAgJ3RoaXJ0ZWVuJzogJzEzdGgnLFxuICAnZm91cnRlZW4nOiAnMTR0aCcsXG4gICdmaWZ0ZWVuJzogJzE1dGgnLFxuICAnc2l4dGVlbic6ICcxNnRoJyxcbiAgJ3NldmVudGVlbic6ICcxN3RoJyxcbiAgJ2VpZ2h0ZWVuJzogJzE4dGgnLFxuICAnbmluZXRlZW4nOiAnMTl0aCcsXG5cbiAgJ3R3ZW50eSc6ICcyMHRoJyxcbiAgJ3RoaXJ0eSc6ICczMHRoJyxcbiAgJ2ZvcnR5JzogJzQwdGgnLFxuICAnZmlmdHknOiAnNTB0aCcsXG4gICdzaXh0eSc6ICc2MHRoJyxcbiAgJ3NldmVudHknOiAnNzB0aCcsXG4gICdlaWdodHknOiAnODB0aCcsXG4gICduaW5ldHknOiAnOTB0aCcsXG4gICdodW5kcmVkJzogJzEwMHRoJyxcblxuICAndGhvdXNhbmQnOiAndGhvdXNhbmR0aCcsXG4gICdtaWxsaW9uJzogJ21pbGxpb250aCcsXG4gICdiaWxsaW9uJzogJ2JpbGxpb250aCcsXG4gICd0cmlsbGlvbic6ICd0cmlsbGlvbnRoJ1xufTtcblxuZnVuY3Rpb24gbnVtYmVyVG9Qb3NpdGlvbldvcmQobnVtKSB7XG4gIHZhciBzdHIgPSBjaHVuayhudW0pLm1hcChpbkVuZ2xpc2gpLm1hcChhcHBlbmRTY2FsZSkuZmlsdGVyKGlzVHJ1dGh5KS5yZXZlcnNlKCkuam9pbignICcpO1xuXG4gIHZhciBzdWIgPSBzdHIuc3BsaXQoJyAnKSxcbiAgICAgIGxhc3RXb3JkRGFzaFNwbGl0QXJyID0gc3ViW3N1Yi5sZW5ndGggLSAxXS5zcGxpdCgnLScpLFxuICAgICAgbGFzdFdvcmQgPSBsYXN0V29yZERhc2hTcGxpdEFycltsYXN0V29yZERhc2hTcGxpdEFyci5sZW5ndGggLSAxXSxcbiAgICAgIG5ld0xhc3RXb3JkID0gKGxhc3RXb3JkRGFzaFNwbGl0QXJyLmxlbmd0aCA+IDEgPyBsYXN0V29yZERhc2hTcGxpdEFyclswXSArICctJyA6ICcnKSArIE5VTUJFUl9UT19QT1NJVElPTl9URVhUX01BUFtsYXN0V29yZF07XG5cbiAgLypjb25zb2xlLmxvZygnc3RyOicsIHN0cik7XG4gIGNvbnNvbGUubG9nKCdzdWI6Jywgc3ViKTtcbiAgY29uc29sZS5sb2coJ2xhc3RXb3JkRGFzaFNwbGl0QXJyOicsIGxhc3RXb3JkRGFzaFNwbGl0QXJyKTtcbiAgY29uc29sZS5sb2coJ2xhc3RXb3JkOicsIGxhc3RXb3JkKTtcbiAgY29uc29sZS5sb2coJ25ld0xhc3RXb3JkOicsIG5ld0xhc3RXb3JkKTsqL1xuXG4gIHZhciBzdWJDb3B5ID0gW10uY29uY2F0KHN1Yik7XG4gIHN1YkNvcHkucG9wKCk7XG4gIHZhciBwcmVmaXggPSBzdWJDb3B5LmpvaW4oJyAnKTtcbiAgdmFyIHJlc3VsdCA9IChwcmVmaXggPyBwcmVmaXggKyAnICcgOiAnJykgKyBuZXdMYXN0V29yZDtcblxuICAvLyBjb25zb2xlLmxvZygncmVzdWx0JywgKHByZWZpeCA/IHByZWZpeCArICcgJyA6ICcnKSArIG5ld0xhc3RXb3JkKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gcHJlY2VkaW5nT3JkaW5hbFdvcmQobnVtYmVyKSB7XG4gIGlmIChudW1iZXIgPT09ICg4IHx8IDExIHx8IDE4KSkge1xuICAgIHJldHVybiAnYW4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnYSc7XG4gIH1cbn1cblxuZnVuY3Rpb24gbnVtYmVyVG9Xb3Jkc1N0eWxlZ3VpZGUobnVtYmVyKSB7XG4gIGlmIChudW1iZXIgPiA5KSB7XG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfVxuXG4gIHJldHVybiBPTkVfVE9fTklORVRFRU5bbnVtYmVyIC0gMV07XG59XG5cbmZ1bmN0aW9uIHRvb2xzKCkge1xuXG4gIHZhciAkbGlzdExpbmtzID0gJCgnLnRlc3QtZGF0YS1saW5rcycpLFxuICAgICAgJGNsZWFyRGF0YSA9ICQoJzxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVxcJ21vY2stZGF0YS1mYW1pbHlcXCc+JyArICdDbGVhciBhbGwgZGF0YTwvYT48L2xpPicpLFxuICAgICAgJGNyZWF0ZUZhbWlseUhvdXNlaG9sZCA9ICQoJzxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVxcJ21vY2stZGF0YS1mYW1pbHlcXCc+JyArICdDcmVhdGUgZmFtaWx5IGhvdXNlaG9sZDwvYT48L2xpPicpLFxuICAgICAgJGNyZWF0ZUZhbWlseVJlbGF0aW9uc2hpcHMgPSAkKCc8bGk+PGEgaHJlZj1cIiNcIicgKyAnIGNsYXNzPVxcJ21vY2stZGF0YS1mYW1pbHlcXCc+JyArICdDcmVhdGUgZmFtaWx5IHdpdGggcmVsYXRpb25zaGlwczwvYT48L2xpPicpLFxuICAgICAgJGNyZWF0ZUZhbWlseVdpdGhSZWxhdGlvbnNoaXBzQW5kVmlzaXRvcnMgPSAkKCc8bGk+PGEgaHJlZj1cIiNcIicgKyAnIGNsYXNzPVxcJ21vY2stZGF0YS1mYW1pbHlcXCc+JyArICdDcmVhdGUgZmFtaWx5IHdpdGggcmVsYXRpb25zaGlwcyBhbmQgdmlzaXRvcnM8L2E+PC9saT4nKSxcbiAgICAgICRjcmVhdGVGYW1pbHlXaXRoUmVsYXRpb25zaGlwc1BlcnNvbmFsRGV0YWlsc0FuZFZpc2l0b3JzID0gJCgnPGxpPjxhJyArICcgaHJlZj1cIiNcIicgKyAnIGNsYXNzPVxcJ21vY2stZGF0YS1mYW1pbHlcXCc+JyArICdDcmVhdGUgZmFtaWx5IHdpdGggcmVsYXRpb25zaGlwcywganVzdCBmYW1pbHkgaW5kaXZpZHVhbCByZXNwb25zZXMgYW5kJyArICcgdmlzaXRvcnM8L2E+PC9saT4nKSxcbiAgICAgICRjcmVhdGVGYW1pbHlXaXRoUmVsYXRpb25zaGlwc1BlcnNvbmFsRGV0YWlsc0FuZFZpc2l0b3JzUGVyc29uYWxEZXRhaWxzID0gJCgnPGxpPjxhJyArICcgaHJlZj1cIiNcIicgKyAnIGNsYXNzPVxcJ21vY2stZGF0YS1mYW1pbHlcXCc+JyArICdDcmVhdGUgZmFtaWx5IHdpdGggcmVsYXRpb25zaGlwcywgZmFtaWx5IGluZGl2aWR1YWwgcmVzcG9uc2VzIGFuZCcgKyAnIHZpc2l0b3JzIGluZGl2aWR1YWwgcmVzcG9uc2VzPC9hPjwvbGk+JyksXG4gICAgICBmYW1pbHlIb3VzZWhvbGRNZW1iZXJzRGF0YSA9IFt7XG4gICAgJ3R5cGUnOiAnaG91c2Vob2xkLW1lbWJlcicsXG4gICAgJ0BwZXJzb24nOiB7XG4gICAgICAnZnVsbE5hbWUnOiAnRGF2ZSAgSm9uZXMnLFxuICAgICAgJ2ZpcnN0TmFtZSc6ICdEYXZlJyxcbiAgICAgICdtaWRkbGVOYW1lJzogJycsXG4gICAgICAnbGFzdE5hbWUnOiAnSm9uZXMnLFxuICAgICAgJ2lkJzogJ3BlcnNvbl9tZSdcbiAgICB9XG4gIH0sIHtcbiAgICAndHlwZSc6ICdob3VzZWhvbGQtbWVtYmVyJyxcbiAgICAnQHBlcnNvbic6IHtcbiAgICAgICdmdWxsTmFtZSc6ICdTYWxseSAgSm9uZXMnLFxuICAgICAgJ2ZpcnN0TmFtZSc6ICdTYWxseScsXG4gICAgICAnbWlkZGxlTmFtZSc6ICcnLFxuICAgICAgJ2xhc3ROYW1lJzogJ0pvbmVzJyxcbiAgICAgICdpZCc6ICdwZXJzb24xJ1xuICAgIH1cbiAgfSwge1xuICAgICd0eXBlJzogJ2hvdXNlaG9sZC1tZW1iZXInLFxuICAgICdAcGVyc29uJzoge1xuICAgICAgJ2Z1bGxOYW1lJzogJ1JlYmVjY2EgIEpvbmVzJyxcbiAgICAgICdmaXJzdE5hbWUnOiAnUmViZWNjYScsXG4gICAgICAnbWlkZGxlTmFtZSc6ICcnLFxuICAgICAgJ2xhc3ROYW1lJzogJ0pvbmVzJyxcbiAgICAgICdpZCc6ICdwZXJzb24yJ1xuICAgIH1cbiAgfSwge1xuICAgICd0eXBlJzogJ2hvdXNlaG9sZC1tZW1iZXInLFxuICAgICdAcGVyc29uJzoge1xuICAgICAgJ2Z1bGxOYW1lJzogJ0FteSBKb25lcycsXG4gICAgICAnZmlyc3ROYW1lJzogJ0FteScsXG4gICAgICAnbWlkZGxlTmFtZSc6ICcnLFxuICAgICAgJ2xhc3ROYW1lJzogJ0pvbmVzJyxcbiAgICAgICdpZCc6ICdwZXJzb24zJ1xuICAgIH1cbiAgfV0sXG4gICAgICB2aXNpdG9yc01lbWJlckRhdGEgPSBbe1xuICAgICd0eXBlJzogJ3Zpc2l0b3InLFxuICAgICdAcGVyc29uJzoge1xuICAgICAgJ2Z1bGxOYW1lJzogJ0dhcmV0aCBKb2huc29uJyxcbiAgICAgICdmaXJzdE5hbWUnOiAnR2FyZXRoJyxcbiAgICAgICdtaWRkbGVOYW1lJzogJycsXG4gICAgICAnbGFzdE5hbWUnOiAnSm9obnNvbicsXG4gICAgICAnaWQnOiAncGVyc29uNCdcbiAgICB9XG4gIH0sIHtcbiAgICAndHlwZSc6ICd2aXNpdG9yJyxcbiAgICAnQHBlcnNvbic6IHtcbiAgICAgICdmdWxsTmFtZSc6ICdKb2huIEhhbWlsdG9uJyxcbiAgICAgICdmaXJzdE5hbWUnOiAnSm9obicsXG4gICAgICAnbWlkZGxlTmFtZSc6ICcnLFxuICAgICAgJ2xhc3ROYW1lJzogJ0hhbWlsdG9uJyxcbiAgICAgICdpZCc6ICdwZXJzb241J1xuICAgIH1cbiAgfV0sXG4gICAgICBmYW1pbHlIb3VzZWhvbGRSZWxhdGlvbnNoaXBzRGF0YSA9IFt7XG4gICAgJ3BlcnNvbklzRGVzY3JpcHRpb24nOiAnaHVzYmFuZC13aWZlJyxcbiAgICAncGVyc29uSXNJZCc6ICdwZXJzb24xJyxcbiAgICAncGVyc29uVG9JZCc6ICdwZXJzb25fbWUnLFxuICAgICdpbmZlcnJlZCc6IGZhbHNlLFxuICAgICdpZCc6IDFcbiAgfSwge1xuICAgICdwZXJzb25Jc0Rlc2NyaXB0aW9uJzogJ3Nvbi1kYXVnaHRlcicsXG4gICAgJ3BlcnNvbklzSWQnOiAncGVyc29uMicsXG4gICAgJ3BlcnNvblRvSWQnOiAncGVyc29uX21lJyxcbiAgICAnaW5mZXJyZWQnOiBmYWxzZSxcbiAgICAnaWQnOiAyXG4gIH0sIHtcbiAgICAncGVyc29uSXNEZXNjcmlwdGlvbic6ICdtb3RoZXItZmF0aGVyJyxcbiAgICAncGVyc29uSXNJZCc6ICdwZXJzb25fbWUnLFxuICAgICdwZXJzb25Ub0lkJzogJ3BlcnNvbjMnLFxuICAgICdpbmZlcnJlZCc6IGZhbHNlLFxuICAgICdpZCc6IDNcbiAgfSwge1xuICAgICdwZXJzb25Jc0Rlc2NyaXB0aW9uJzogJ3Nvbi1kYXVnaHRlcicsXG4gICAgJ3BlcnNvbklzSWQnOiAncGVyc29uMicsXG4gICAgJ3BlcnNvblRvSWQnOiAncGVyc29uMScsXG4gICAgJ2luZmVycmVkJzogZmFsc2UsXG4gICAgJ2lkJzogNFxuICB9LCB7XG4gICAgJ3BlcnNvbklzRGVzY3JpcHRpb24nOiAnbW90aGVyLWZhdGhlcicsXG4gICAgJ3BlcnNvbklzSWQnOiAncGVyc29uMScsXG4gICAgJ3BlcnNvblRvSWQnOiAncGVyc29uMycsXG4gICAgJ2luZmVycmVkJzogZmFsc2UsXG4gICAgJ2lkJzogNVxuICB9LCB7XG4gICAgJ3BlcnNvbklzRGVzY3JpcHRpb24nOiAnYnJvdGhlci1zaXN0ZXInLFxuICAgICdwZXJzb25Jc0lkJzogJ3BlcnNvbjMnLFxuICAgICdwZXJzb25Ub0lkJzogJ3BlcnNvbjInLFxuICAgICdpbmZlcnJlZCc6IHRydWUsXG4gICAgJ2luZmVycmVkQnknOiBbMywgNSwgMiwgNF0sXG4gICAgJ2lkJzogNlxuICB9XSxcbiAgICAgIGZhbWlseVBlcnNvbmFsRGV0YWlscyA9IHtcbiAgICAncGVyc29uX21lJzoge1xuICAgICAgJ2RvYic6IHtcbiAgICAgICAgJ2RheSc6ICcxNycsXG4gICAgICAgICdtb250aCc6ICc0JyxcbiAgICAgICAgJ3llYXInOiAnMTk2NydcbiAgICAgIH0sXG4gICAgICAnbWFyaXRhbFN0YXR1cyc6ICdtYXJyaWVkJyxcbiAgICAgICdjb3VudHJ5JzogJ3dhbGVzJyxcbiAgICAgICdvcmllbnRhdGlvbic6ICdzdHJhaWdodCcsXG4gICAgICAnc2FsYXJ5JzogJzQwMDAwJ1xuICAgIH0sXG4gICAgJ3BlcnNvbjEnOiB7XG4gICAgICAnZG9iJzogeyAnZGF5JzogJzAyJywgJ21vbnRoJzogJzEwJywgJ3llYXInOiAnMTk2NScgfSxcbiAgICAgICdtYXJpdGFsU3RhdHVzJzogJ21hcnJpZWQnLFxuICAgICAgJ2NvdW50cnknOiAnd2FsZXMnLFxuICAgICAgJ29yaWVudGF0aW9uJzogJ3N0cmFpZ2h0JyxcbiAgICAgICdzYWxhcnknOiAnNDAwMDAnXG4gICAgfSxcbiAgICAncGVyc29uMic6IHtcbiAgICAgICdkb2InOiB7ICdkYXknOiAnMjAnLCAnbW9udGgnOiAnNScsICd5ZWFyJzogJzE5ODEnIH0sXG4gICAgICAnbWFyaXRhbFN0YXR1cyc6ICduZXZlcicsXG4gICAgICAnY291bnRyeSc6ICd3YWxlcycsXG4gICAgICAnb3JpZW50YXRpb24nOiAnc3RyYWlnaHQnLFxuICAgICAgJ3NhbGFyeSc6ICcyMDAwMCdcbiAgICB9LFxuICAgICdwZXJzb24zJzoge1xuICAgICAgJ2RvYic6IHsgJ2RheSc6ICcxMScsICdtb250aCc6ICc3JywgJ3llYXInOiAnMTk4NCcgfSxcbiAgICAgICdtYXJpdGFsU3RhdHVzJzogJ25ldmVyJyxcbiAgICAgICdjb3VudHJ5JzogJ3dhbGVzJyxcbiAgICAgICdvcmllbnRhdGlvbic6ICdzdHJhaWdodCcsXG4gICAgICAnc2FsYXJ5JzogJzIwMDAwJ1xuICAgIH1cbiAgfSxcbiAgICAgIHZpc2l0b3JzUGVyc29uYWxEZXRhaWxzID0ge1xuICAgICdwZXJzb240Jzoge1xuICAgICAgJ3NleCc6ICdtYWxlJyxcbiAgICAgICdkb2InOiB7ICdkYXknOiAnMjAnLCAnbW9udGgnOiAnNycsICd5ZWFyJzogJzE5OTAnIH0sXG4gICAgICAnYWRkcmVzcy13aGVyZSc6ICdpbi11aycsXG4gICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgJ2FkZHJlc3MtbGluZS0xJzogJzE1JyxcbiAgICAgICAgJ2FkZHJlc3MtbGluZS0yJzogJ1NvbWV3aGVyZSBuZWFyJyxcbiAgICAgICAgJ3Rvd24tY2l0eSc6ICdMbGFuZHJpZG5vZCcsXG4gICAgICAgICdjb3VudHknOiAnUG93eXMnLFxuICAgICAgICAncG9zdGNvZGUnOiAnTEwzNCBBTjUnXG4gICAgICB9XG4gICAgfSxcbiAgICAncGVyc29uNSc6IHtcbiAgICAgICdzZXgnOiAnbWFsZScsXG4gICAgICAnZG9iJzogeyAnZGF5JzogJzAyJywgJ21vbnRoJzogJzUnLCAneWVhcic6ICcxOTkxJyB9LFxuICAgICAgJ2FkZHJlc3Mtd2hlcmUnOiAnb3V0LXVrJyxcbiAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAnYWRkcmVzcy1saW5lLTEnOiAnOTQnLFxuICAgICAgICAnYWRkcmVzcy1saW5lLTInOiAnU29tZXdoZXJlIEZhcicsXG4gICAgICAgICd0b3duLWNpdHknOiAnU3ByaW5nZmllbGQnLFxuICAgICAgICAnY291bnR5JzogJ05ldyBZb3JrJyxcbiAgICAgICAgJ3Bvc3Rjb2RlJzogJ05ZMTBBJ1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgICAgIHVzZXJEYXRhID0ge1xuICAgICdmdWxsTmFtZSc6ICdEYXZlICBKb25lcycsXG4gICAgJ2ZpcnN0TmFtZSc6ICdEYXZlJyxcbiAgICAnbWlkZGxlTmFtZSc6ICcnLFxuICAgICdsYXN0TmFtZSc6ICdKb25lcydcbiAgfTtcblxuICAkY3JlYXRlRmFtaWx5SG91c2Vob2xkLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNsZWFyU3RvcmFnZSgpO1xuICAgIHByZXJlcXVpc2l0ZXMoKTtcbiAgICBjcmVhdGVGYW1pbHlIb3VzZWhvbGQoKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuLi9zdW1tYXJ5JztcbiAgfSk7XG5cbiAgJGNyZWF0ZUZhbWlseVJlbGF0aW9uc2hpcHMub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xlYXJTdG9yYWdlKCk7XG4gICAgcHJlcmVxdWlzaXRlcygpO1xuICAgIGNyZWF0ZUZhbWlseUhvdXNlaG9sZCgpO1xuICAgIGNyZWF0ZUZhbWlseVJlbGF0aW9uc2hpcHMoKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuLi9odWInO1xuICB9KTtcblxuICAkY3JlYXRlRmFtaWx5V2l0aFJlbGF0aW9uc2hpcHNBbmRWaXNpdG9ycy5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjbGVhclN0b3JhZ2UoKTtcbiAgICBwcmVyZXF1aXNpdGVzKCk7XG4gICAgY3JlYXRlRmFtaWx5SG91c2Vob2xkV2l0aFZpc2l0b3JzKCk7XG4gICAgY3JlYXRlRmFtaWx5UmVsYXRpb25zaGlwcygpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy4uL2h1Yic7XG4gIH0pO1xuXG4gICRjcmVhdGVGYW1pbHlXaXRoUmVsYXRpb25zaGlwc1BlcnNvbmFsRGV0YWlsc0FuZFZpc2l0b3JzLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNsZWFyU3RvcmFnZSgpO1xuICAgIHByZXJlcXVpc2l0ZXMoKTtcbiAgICBjcmVhdGVGYW1pbHlIb3VzZWhvbGRXaXRoVmlzaXRvcnMoKTtcbiAgICBjcmVhdGVGYW1pbHlSZWxhdGlvbnNoaXBzKCk7XG4gICAgY3JlYXRlRmFtaWx5UGVyc29uYWxEZXRhaWxzKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLi4vaHViJztcbiAgfSk7XG5cbiAgJGNyZWF0ZUZhbWlseVdpdGhSZWxhdGlvbnNoaXBzUGVyc29uYWxEZXRhaWxzQW5kVmlzaXRvcnNQZXJzb25hbERldGFpbHMub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xlYXJTdG9yYWdlKCk7XG4gICAgcHJlcmVxdWlzaXRlcygpO1xuICAgIGNyZWF0ZUZhbWlseUhvdXNlaG9sZFdpdGhWaXNpdG9ycygpO1xuICAgIGNyZWF0ZUZhbWlseVJlbGF0aW9uc2hpcHMoKTtcbiAgICBjcmVhdGVGYW1pbHlWaXNpdG9yc1BlcnNvbmFsRGV0YWlscygpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy4uL2h1Yic7XG4gIH0pO1xuXG4gICRjbGVhckRhdGEub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xlYXJTdG9yYWdlKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLi4vdGVzdC1hZGRyZXNzJztcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHJlcmVxdWlzaXRlcygpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdhZGRyZXNzJywgJzEyIFNvbWV3aGVyZSBDbG9zZSwgTmV3cG9ydCwgQ0YxMiAzQUInKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdhZGRyZXNzLWxpbmUtMScsICcxMicpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2FkZHJlc3MtbGluZS0yJywgJ1NvbWV3aGVyZSBjbG9zZScpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2NvdW50eScsICdOZXdwb3J0Jyk7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnbGl2ZXMtaGVyZScsICd5ZXMnKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwb3N0Y29kZScsICdDRjEyIDNBQicpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Rvd24tY2l0eScsICdOZXdwb3J0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVGYW1pbHlIb3VzZWhvbGQoKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlci1kZXRhaWxzJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHdpbmRvdy5PTlMuc3RvcmFnZS5LRVlTLkhPVVNFSE9MRF9NRU1CRVJTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShmYW1pbHlIb3VzZWhvbGRNZW1iZXJzRGF0YSkpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2hvdXNlaG9sZC1tZW1iZXJzLWluY3JlbWVudCcsIEpTT04uc3RyaW5naWZ5KDQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUZhbWlseUhvdXNlaG9sZFdpdGhWaXNpdG9ycygpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHdpbmRvdy5PTlMuc3RvcmFnZS5LRVlTLkhPVVNFSE9MRF9NRU1CRVJTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShbXS5jb25jYXQoZmFtaWx5SG91c2Vob2xkTWVtYmVyc0RhdGEsIHZpc2l0b3JzTWVtYmVyRGF0YSkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUZhbWlseVJlbGF0aW9uc2hpcHMoKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh3aW5kb3cuT05TLnN0b3JhZ2UuS0VZUy5SRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShmYW1pbHlIb3VzZWhvbGRSZWxhdGlvbnNoaXBzRGF0YSkpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JlbGF0aW9uc2hpcHMtaW5jcmVtZW50JywgSlNPTi5zdHJpbmdpZnkoNikpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRmFtaWx5UGVyc29uYWxEZXRhaWxzKCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0od2luZG93Lk9OUy5zdG9yYWdlLktFWVMuUEVSU09OQUxfREVUQUlMU19LRVksIEpTT04uc3RyaW5naWZ5KGZhbWlseVBlcnNvbmFsRGV0YWlscykpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRmFtaWx5VmlzaXRvcnNQZXJzb25hbERldGFpbHMoKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh3aW5kb3cuT05TLnN0b3JhZ2UuS0VZUy5QRVJTT05BTF9ERVRBSUxTX0tFWSwgSlNPTi5zdHJpbmdpZnkoX2V4dGVuZHMoe30sIGZhbWlseVBlcnNvbmFsRGV0YWlscywgdmlzaXRvcnNQZXJzb25hbERldGFpbHMpKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclN0b3JhZ2UoKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgfVxuXG4gICRsaXN0TGlua3MuYXBwZW5kKCRjbGVhckRhdGEpO1xufVxuXG4vKipcbiAqIExpYnJhcmllc1xuICovXG4vKipcbiAqIERPTSBtb2R1bGVzXG4gKi9cbnZhciBVU0VSX1NUT1JBR0VfS0VZID0gJ3VzZXItZGV0YWlscyc7XG52YXIgSU5ESVZJRFVBTF9QUk9YWV9TVE9SQUdFX0tFWSA9ICdwcm94eS1wZXJzb24nO1xuXG5mdW5jdGlvbiBnZXRBZGRyZXNzKCkge1xuICAgIHZhciBhZGRyZXNzTGluZXMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhZGRyZXNzJykuc3BsaXQoJywnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3NMaW5lMTogYWRkcmVzc0xpbmVzWzBdLFxuICAgICAgICBhZGRyZXNzTGluZTI6IGFkZHJlc3NMaW5lc1sxXSxcbiAgICAgICAgYWRkcmVzc1Rvd25DaXR5OiBhZGRyZXNzTGluZXNbMl0sXG4gICAgICAgIGFkZHJlc3NQb3N0Y29kZTogYWRkcmVzc0xpbmVzWzNdXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGlwZWRBZGRyZXNzKCkge1xuICAgIHZhciBwaXBlZEFkZHJlc3MgPSBcInRoaXMgYWNjb21tb2RhdGlvblwiO1xuICAgIHZhciBhZGRyZXNzTGluZTEgPSAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWRkcmVzcy1saW5lLTEnKSB8fCAnJykucmVwbGFjZSgvLC9nLCAnJyk7XG4gICAgdmFyIGFkZHJlc3NMaW5lMiA9IChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhZGRyZXNzLWxpbmUtMicpIHx8ICcnKS5yZXBsYWNlKC8sL2csICcnKTtcbiAgICB2YXIgYWRkcmVzc1Rvd25DaXR5ID0gKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FkZHJlc3MtdG93bicpIHx8ICcnKS5yZXBsYWNlKC8sL2csICcnKTtcbiAgICB2YXIgdW5pdE5hbWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1bml0LW5hbWUnKSB8fCAnJztcblxuICAgIGlmIChhZGRyZXNzTGluZTIpIHtcbiAgICAgICAgaWYgKGFkZHJlc3NMaW5lMi5pbmNsdWRlcyhcIm5lYXJcIikpIHtcbiAgICAgICAgICAgIHBpcGVkQWRkcmVzcyA9IGFkZHJlc3NMaW5lMSArICcgJyArIGFkZHJlc3NMaW5lMjtcbiAgICAgICAgfSBlbHNlIGlmICh1bml0TmFtZSkge1xuICAgICAgICAgICAgcGlwZWRBZGRyZXNzID0gdW5pdE5hbWUgKyAnLCAnICsgYWRkcmVzc0xpbmUxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGlwZWRBZGRyZXNzID0gYWRkcmVzc0xpbmUxICsgJywgJyArIGFkZHJlc3NMaW5lMjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBpcGVkQWRkcmVzcyA9IGFkZHJlc3NMaW5lMSArICcsICcgKyBhZGRyZXNzVG93bkNpdHk7XG4gICAgfVxuICAgIHJldHVybiBwaXBlZEFkZHJlc3M7XG59XG5cbi8qKlxuICogVXNlclxuICovXG5mdW5jdGlvbiBhZGRVc2VyUGVyc29uKHBlcnNvbiQkMSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVVNFUl9TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkocGVyc29uJCQxKSk7XG59XG5cbmZ1bmN0aW9uIGdldFVzZXJQZXJzb24oKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShVU0VSX1NUT1JBR0VfS0VZKSk7XG59XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5mdW5jdGlvbiBjcmVhdGVOYXZJdGVtKG1lbWJlcikge1xuICAgIHZhciAkbm9kZUVsID0gJCgnPGxpIGNsYXNzPVwianMtdGVtcGxhdGUtbmF2LWl0ZW0gbmF2X19pdGVtIHBsdXRvXCI+JyArICcgIDxhIGNsYXNzPVwianMtdGVtcGxhdGUtbmF2LWl0ZW0tbGFiZWwgbmF2X19saW5rXCIgaHJlZj1cIiNcIj48L2E+JyArICc8L2xpPicpLFxuICAgICAgICAkbGlua0VsID0gJG5vZGVFbC5maW5kKCcuanMtdGVtcGxhdGUtbmF2LWl0ZW0tbGFiZWwnKTtcblxuICAgICRsaW5rRWwuaHRtbChtZW1iZXJbJ0BwZXJzb24nXS5mdWxsTmFtZSk7XG5cbiAgICBpZiAobWVtYmVyWydAcGVyc29uJ10uaWQgPT09IFVTRVJfSE9VU0VIT0xEX01FTUJFUl9JRCkge1xuICAgICAgICAkbGlua0VsLmF0dHIoJ2hyZWYnLCAnLi4vd2hhdC1pcy15b3VyLW5hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbGlua0VsLmF0dHIoJ2hyZWYnLCAnLi4vd2hvLWVsc2UtdG8tYWRkP2VkaXQ9JyArIG1lbWJlclsnQHBlcnNvbiddLmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5vZGVFbDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSG91c2Vob2xkVmlzaXRvcnNOYXZpZ2F0aW9uSXRlbXMoKSB7XG4gICAgdmFyIGFsbEhvdXNlaG9sZE1lbWJlcnMgPSB3aW5kb3cuT05TLnN0b3JhZ2UuZ2V0QWxsSG91c2Vob2xkTWVtYmVycygpLFxuICAgICAgICBob3VzZWhvbGRNZW1iZXJzID0gYWxsSG91c2Vob2xkTWVtYmVycy5maWx0ZXIod2luZG93Lk9OUy5zdG9yYWdlLmlzSG91c2Vob2xkTWVtYmVyKSxcbiAgICAgICAgdmlzaXRvcnMgPSBhbGxIb3VzZWhvbGRNZW1iZXJzLmZpbHRlcih3aW5kb3cuT05TLnN0b3JhZ2UuaXNWaXNpdG9yKTtcblxuICAgIHZhciAkbmF2aWdhdGlvbkhvdXNlaG9sZE1lbWJlcnNFbCA9ICQoJyNuYXZpZ2F0aW9uLWhvdXNlaG9sZC1tZW1iZXJzJyksXG4gICAgICAgICRuYXZpZ2F0aW9uVmlzaXRvcnNFbCA9ICQoJyNuYXZpZ2F0aW9uLXZpc2l0b3JzJyk7XG5cbiAgICBpZiAoaG91c2Vob2xkTWVtYmVycy5sZW5ndGgpIHtcbiAgICAgICAgJC5lYWNoKGhvdXNlaG9sZE1lbWJlcnMsIGZ1bmN0aW9uIChpLCBtZW1iZXIpIHtcbiAgICAgICAgICAgICRuYXZpZ2F0aW9uSG91c2Vob2xkTWVtYmVyc0VsLmFwcGVuZChjcmVhdGVOYXZJdGVtKG1lbWJlcikpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbmF2aWdhdGlvbkhvdXNlaG9sZE1lbWJlcnNFbC5wYXJlbnQoKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHZpc2l0b3JzLmxlbmd0aCkge1xuICAgICAgICAkLmVhY2godmlzaXRvcnMsIGZ1bmN0aW9uIChpLCBtZW1iZXIpIHtcbiAgICAgICAgICAgICRuYXZpZ2F0aW9uVmlzaXRvcnNFbC5hcHBlbmQoY3JlYXRlTmF2SXRlbShtZW1iZXIpKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJG5hdmlnYXRpb25WaXNpdG9yc0VsLnBhcmVudCgpLmhpZGUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RJdGVtUGVyc29uKG1lbWJlcikge1xuICAgIHJldHVybiAkKCc8bGkgY2xhc3M9XCJsaXN0X19pdGVtXCI+JykuYWRkQ2xhc3MoJ21hcnMnKS5odG1sKCc8c3BhbiBjbGFzcz1cImxpc3RfX2l0ZW0tbmFtZVwiPicgKyBtZW1iZXJbJ0BwZXJzb24nXS5mdWxsTmFtZSArIChtZW1iZXJbJ0BwZXJzb24nXS5pZCA9PT0gVVNFUl9IT1VTRUhPTERfTUVNQkVSX0lEID8gJyAoWW91KScgOiAnJykgKyAnPC9zcGFuPicpO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUxpc3QoJGVsLCBtZW1iZXJUeXBlKSB7XG4gICAgaWYgKCEkZWwubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbWVtYmVycyA9IGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKSB8fCBbXTtcblxuICAgICRlbC5lbXB0eSgpLmFwcGVuZChtZW1iZXJzLmZpbHRlcihmdW5jdGlvbiAobWVtYmVyKSB7XG4gICAgICAgIHJldHVybiBtZW1iZXIudHlwZSA9PT0gbWVtYmVyVHlwZTtcbiAgICB9KS5tYXAoY3JlYXRlTGlzdEl0ZW1QZXJzb24pKTtcblxuICAgICRlbC5hZGRDbGFzcygnbGlzdCBsaXN0LS1wZW9wbGUtcGxhaW4nKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVIb3VzZWhvbGRMaXN0KCkge1xuICAgIHBvcHVsYXRlTGlzdCgkKCcjaG91c2Vob2xkLW1lbWJlcnMnKSwgSE9VU0VIT0xEX01FTUJFUl9UWVBFKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVWaXNpdG9yTGlzdCgpIHtcbiAgICBwb3B1bGF0ZUxpc3QoJCgnI3Zpc2l0b3JzLWxpc3QnKSwgVklTSVRPUl9UWVBFKTtcbn1cblxuZnVuY3Rpb24gY2xlYW5IVE1MUGxhY2Vob2xkZXJTdHJpbmdSZXBsYWNtZW50KGVsLCB2YWwpIHtcbiAgICB2YXIgJGVsID0gJChlbCksXG4gICAgICAgICRwYXJlbnQgPSAkZWwucGFyZW50KCk7XG5cbiAgICAkZWwuYmVmb3JlKHZhbCk7XG4gICAgJGVsLnJlbW92ZSgpO1xuXG4gICAgJHBhcmVudC5odG1sKCRwYXJlbnQuaHRtbCgpLnJlcGxhY2UoL1tcXHNdKy9nLCAnICcpLnRyaW0oKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFkZHJlc3NlcygpIHtcbiAgICB2YXIgYWRkcmVzc0xpbmVzID0gKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FkZHJlc3MnKSB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgYWRkcmVzc0xpbmUxID0gYWRkcmVzc0xpbmVzWzBdLFxuICAgICAgICBhZGRyZXNzTGluZTIgPSBhZGRyZXNzTGluZXNbMV07XG5cbiAgICAkKCcuYWRkcmVzcy10ZXh0JykuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgcmV0dXJuIGNsZWFuSFRNTFBsYWNlaG9sZGVyU3RyaW5nUmVwbGFjbWVudChlbCwgYWRkcmVzc0xpbmUxICYmIGFkZHJlc3NMaW5lMiA/IGFkZHJlc3NMaW5lMSArIChhZGRyZXNzTGluZTIgPyAnLCAnICsgYWRkcmVzc0xpbmUyIDogJycpIDogJzxhIGhyZWY9XCIuLi90ZXN0LWFkZHJlc3NcIj5BZGRyZXNzIG5vdCBmb3VuZDwvYT4nKTtcbiAgICB9KTtcblxuICAgICQoJy5hZGRyZXNzLXRleHQtbGluZTEnKS5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICByZXR1cm4gY2xlYW5IVE1MUGxhY2Vob2xkZXJTdHJpbmdSZXBsYWNtZW50KGVsLCBhZGRyZXNzTGluZTEpO1xuICAgIH0pO1xuXG4gICAgdmFyIHBlcnNvbklkID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKS5nZXQoJ3BlcnNvbl9pZCcpO1xuXG4gICAgaWYgKHBlcnNvbklkKSB7XG4gICAgICAgIHZhciBfcGVyc29uID0gZ2V0SG91c2Vob2xkTWVtYmVyQnlQZXJzb25JZChwZXJzb25JZClbJ0BwZXJzb24nXSxcbiAgICAgICAgICAgICRzZWN0aW9uSW5kaXZpZHVhbEVsID0gJCgnI3NlY3Rpb24taW5kaXZpZHVhbCcpLFxuICAgICAgICAgICAgJG5hbWVFbCA9ICQoJy5qcy1wZXJzb24tZnVsbG5hbWUtZnJvbS11cmwtaWQnKTtcblxuICAgICAgICAkc2VjdGlvbkluZGl2aWR1YWxFbC5sZW5ndGggJiYgY2xlYW5IVE1MUGxhY2Vob2xkZXJTdHJpbmdSZXBsYWNtZW50KCRzZWN0aW9uSW5kaXZpZHVhbEVsLCBfcGVyc29uLmZ1bGxOYW1lKTtcbiAgICAgICAgJG5hbWVFbC5sZW5ndGggJiYgY2xlYW5IVE1MUGxhY2Vob2xkZXJTdHJpbmdSZXBsYWNtZW50KCRuYW1lRWwsIF9wZXJzb24uZnVsbE5hbWUpO1xuICAgIH1cbn1cblxudmFyIHNlY3VyZUxpbmtUZXh0TWFwID0ge1xuICAgICdxdWVzdGlvbi15b3UnOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnV2FudCB0byBrZWVwIHlvdXIgYW5zd2VycyBzZWN1cmUgZnJvbSBvdGhlciBwZW9wbGUgYXQgdGhpcycgKyAnIGFkZHJlc3M/JyxcbiAgICAgICAgbGlua1RleHQ6ICdHZXQgYSBzZXBhcmF0ZSBhY2Nlc3MgY29kZSB0byBzdWJtaXQgYW4gaW5kaXZpZHVhbCByZXNwb25zZScsXG4gICAgICAgIGxpbms6ICcuLi9pbmRpdmlkdWFsLWRlY2lzaW9uLXNlY3VyZSdcbiAgICB9LFxuICAgICdwaW4teW91Jzoge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1lvdVxcJ3ZlIGNob3NlbiB0byBrZWVwIHlvdXIgYW5zd2VycyBzZWN1cmUnLFxuICAgICAgICBsaW5rVGV4dDogJ0NhbmNlbCB0aGlzIGFuZCBtYWtlIGFuc3dlcnMgYXZhaWxhYmxlIHRvIHRoZSByZXN0IG9mIHRoZScgKyAnIGhvdXNlaG9sZCcsXG4gICAgICAgIGxpbms6ICcuLi9pbmRpdmlkdWFsLWRlY2lzaW9uLXNlY3VyZSdcbiAgICB9LFxuICAgICdxdWVzdGlvbi1wcm94eSc6IHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdOb3QgaGFwcHkgdG8gY29udGludWUgYW5zd2VyaW5nIGZvciAkW05BTUVdPycsXG4gICAgICAgIGxpbmtUZXh0OiAnUmVxdWVzdCBhbiBpbmRpdmlkdWFsIGFjY2VzcyBjb2RlIHRvIGJlIHNlbnQgdG8gdGhlbScsXG4gICAgICAgIGxpbms6ICcuLi9pbmRpdmlkdWFsLWRlY2lzaW9uLW90aGVyLXNlY3VyZSdcbiAgICB9XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVBbGxMaW5rcygpIHtcbiAgICAkKCcuanMtcHJldmlvdXMtbGluaycpLmF0dHIoJ2hyZWYnLCBkb2N1bWVudC5yZWZlcnJlcik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBlcnNvbkxpbmsoKSB7XG4gICAgdmFyIHBlcnNvbklkID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKS5nZXQoJ3BlcnNvbl9pZCcpO1xuXG4gICAgaWYgKHBlcnNvbklkKSB7XG4gICAgICAgIHZhciB1cmxQYXJhbSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksXG4gICAgICAgICAgICBfcGVyc29uMiA9IGdldEhvdXNlaG9sZE1lbWJlckJ5UGVyc29uSWQocGVyc29uSWQpWydAcGVyc29uJ10sXG4gICAgICAgICAgICBwaW5PYmogPSBnZXRQaW5Gb3IocGVyc29uSWQpLFxuICAgICAgICAgICAgc2VjdXJlTGlua1RleHRDb25maWcgPSBzZWN1cmVMaW5rVGV4dE1hcFtnZXRQcm94eUZvcihwZXJzb25JZCkgPyAncXVlc3Rpb24tcHJveHknIDogcGluT2JqICYmIHBpbk9iai5waW4gPyAncGluLXlvdScgOiAncXVlc3Rpb24teW91J10sXG4gICAgICAgICAgICBsaW5rSHJlZiA9IHNlY3VyZUxpbmtUZXh0Q29uZmlnLmxpbmsgKyAnP3BlcnNvbl9pZD0nICsgcGVyc29uSWQgKyAnJnJldHVybnVybD0nICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgc3VydmV5VHlwZSA9IHVybFBhcmFtLmdldCgnc3VydmV5Jyk7XG5cbiAgICAgICAgbGlua0hyZWYgKz0gc3VydmV5VHlwZSA/ICcmc3VydmV5PScgKyBzdXJ2ZXlUeXBlIDogJyc7XG5cbiAgICAgICAgdmFyICRzZWN1cmVMaW5rID0gJCgnLmpzLWxpbmstc2VjdXJlJyk7XG4gICAgICAgICRzZWN1cmVMaW5rLmF0dHIoJ2hyZWYnLCBsaW5rSHJlZik7XG5cbiAgICAgICAgJHNlY3VyZUxpbmsuaHRtbChzZWN1cmVMaW5rVGV4dENvbmZpZy5saW5rVGV4dCk7XG4gICAgICAgICQoJy5qcy1saW5rLXNlY3VyZS1sYWJlbCcpLmh0bWwoc2VjdXJlTGlua1RleHRDb25maWcuZGVzY3JpcHRpb24ucmVwbGFjZSgnJFtOQU1FXScsIF9wZXJzb24yLmZ1bGxOYW1lKSk7XG5cbiAgICAgICAgdmFyIHBlcnNvbkxpbmsgPSAkKCcuanMtbGluay1wZXJzb24nKTtcbiAgICAgICAgcGVyc29uTGluay5hdHRyKCdocmVmJywgcGVyc29uTGluay5hdHRyKCdocmVmJykgKyAnP3BlcnNvbl9pZD0nICsgcGVyc29uSWQgKyAoc3VydmV5VHlwZSA/ICcmc3VydmV5PScgKyBzdXJ2ZXlUeXBlIDogJycpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRvSUxpdmVIZXJlKCkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdsaXZlcy1oZXJlJykgPT09ICd5ZXMnO1xufVxuXG5mdW5jdGlvbiBnZXRTaWduaWZpY2FudCh0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09ICd3aXRob3V0RGF5Jykge1xuICAgICAgICByZXR1cm4gJzIxIE1hcmNoIDIwMjEnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnU3VuZGF5IDIxIE1hcmNoIDIwMjEnO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlU2lnbmlmaWNhbnREYXRlKCkge1xuICAgICQoJy5qcy1zaWduaWZpY2FudC1kYXRlJykuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgcmV0dXJuIGNsZWFuSFRNTFBsYWNlaG9sZGVyU3RyaW5nUmVwbGFjbWVudChlbCwgZ2V0U2lnbmlmaWNhbnQoKSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNpZ25pZmljYW50RGF0ZVdpdGhvdXREYXkoKSB7XG4gICAgJCgnLmpzLXNpZ25pZmljYW50LWRhdGUtd2l0aG91dC1kYXknKS5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICByZXR1cm4gY2xlYW5IVE1MUGxhY2Vob2xkZXJTdHJpbmdSZXBsYWNtZW50KGVsLCBnZXRTaWduaWZpY2FudChcIndpdGhvdXREYXlcIikpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwZXJzb25SZWNvcmRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gJCgnPGxpIGlkPVwicGVyc29uLXJlY29yZC10ZW1wbGF0ZVwiIGNsYXNzPVwibGlzdF9faXRlbVwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsaXN0X19pdGVtLW5hbWUganMtcGVyc29uLW5hbWVcIj48L3NwYW4+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdF9faXRlbS1hY3Rpb25zIHUtZnJcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxpc3RfX2l0ZW0tYWN0aW9uXCI+XFxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwianMtcmVjb3JkLWVkaXRcIiBocmVmPVwiI1wiPkNoYW5nZTwvYT5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJqcy1zcGFjZXJcIj58PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImpzLXJlY29yZC1yZW1vdmVcIiBocmVmPVwiI1wiPlJlbW92ZTwvYT5cXG4gICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9saT4nKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWVtYmVySXRlbShtZW1iZXIpIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogeyByZWRpcmVjdDogbnVsbCB9LFxuICAgICAgICByZWRpcmVjdCA9IF9yZWYucmVkaXJlY3Q7XG5cbiAgICB2YXIgbm9FZGl0ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgdmFyICRub2RlRWwgPSBwZXJzb25SZWNvcmRUZW1wbGF0ZSgpLFxuICAgICAgICAkZWRpdExpbmsgPSAkbm9kZUVsLmZpbmQoJy5qcy1yZWNvcmQtZWRpdCcpLFxuICAgICAgICAkcmVtb3ZlTGluayA9ICRub2RlRWwuZmluZCgnLmpzLXJlY29yZC1yZW1vdmUnKSxcbiAgICAgICAgJHNwYWNlciA9ICRub2RlRWwuZmluZCgnLmpzLXNwYWNlcicpLFxuICAgICAgICB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLFxuICAgICAgICBwZXJzb25OYW1lVGV4dCA9IG1lbWJlclsnQHBlcnNvbiddLmZ1bGxOYW1lLFxuICAgICAgICBtZW1iZXJJc1VzZXIgPSBpc01lbWJlclVzZXIobWVtYmVyKSxcbiAgICAgICAgc3VydmV5VHlwZSA9IHVybFBhcmFtcy5nZXQoJ3N1cnZleScpLFxuICAgICAgICBhbHRQYWdlID0gc3VydmV5VHlwZSAmJiBzdXJ2ZXlUeXBlID09PSAnbG1zJyA/IHN1cnZleVR5cGUgKyAnLycgOiAnJyxcbiAgICAgICAgcmVkaXJlY3RUbyA9IHJlZGlyZWN0ID8gJyZyZWRpcmVjdD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSA6ICcnO1xuXG4gICAgaWYgKG5vRWRpdCkge1xuICAgICAgICAkZWRpdExpbmsuaGlkZSgpO1xuICAgICAgICAkcmVtb3ZlTGluay5oaWRlKCk7XG4gICAgICAgICRzcGFjZXIuaGlkZSgpO1xuICAgIH0gZWxzZSBpZiAoIW5vRWRpdCAmJiBtZW1iZXJJc1VzZXIpIHtcbiAgICAgICAgcGVyc29uTmFtZVRleHQgKz0gJyAoWW91KSc7XG4gICAgICAgICRlZGl0TGluay5odG1sKCdDaGFuZ2UnKTtcbiAgICAgICAgJHJlbW92ZUxpbmsuaGlkZSgpO1xuICAgICAgICAkc3BhY2VyLmhpZGUoKTtcbiAgICB9XG5cbiAgICAkbm9kZUVsLmF0dHIoJ2lkJywgJycpO1xuICAgICRub2RlRWwuZmluZCgnLmpzLXBlcnNvbi1uYW1lJykuaHRtbChwZXJzb25OYW1lVGV4dCk7XG5cbiAgICAkZWRpdExpbmsuYXR0cignaHJlZicsIChtZW1iZXJJc1VzZXIgPyAnLi4vJyArIGFsdFBhZ2UgKyAnd2hhdC1pcy15b3VyLW5hbWUvP2VkaXQ9dHJ1ZScgOiAnLi4vJyArIGFsdFBhZ2UgKyAnd2hvLWVsc2UtdG8tYWRkLz9lZGl0PScgKyBtZW1iZXJbJ0BwZXJzb24nXS5pZCArIChpc1Zpc2l0b3IobWVtYmVyKSA/ICcmam91cm5leT12aXNpdG9ycycgOiAnJykpICsgcmVkaXJlY3RUbyk7XG5cbiAgICAkcmVtb3ZlTGluay5hdHRyKCdocmVmJywgJy4uL3JlbW92ZS1ob3VzZWhvbGQtbWVtYmVyLz9wZXJzb25faWQ9JyArIG1lbWJlclsnQHBlcnNvbiddLmlkICsgcmVkaXJlY3RUbyk7XG5cbiAgICByZXR1cm4gJG5vZGVFbDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSG91c2Vob2xkU3VtbWFyeSgpIHtcbiAgICB2YXIgbWVtYmVycyA9IGdldEFsbEhvdXNlaG9sZE1lbWJlcnMoKTtcblxuICAgICQoJy5qcy1ob3VzZWhvbGQtbWVtYmVycy1zdW1tYXJ5JykuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xuXG4gICAgICAgICQuZWFjaChbXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkobWVtYmVycy5maWx0ZXIoaXNNZW1iZXJVc2VyKSksIHRvQ29uc3VtYWJsZUFycmF5KG1lbWJlcnMuZmlsdGVyKGlzT3RoZXJIb3VzZWhvbGRNZW1iZXIpKSksIGZ1bmN0aW9uIChpLCBtZW1iZXIpIHtcbiAgICAgICAgICAgICRlbC5hcHBlbmQoY3JlYXRlTWVtYmVySXRlbShtZW1iZXIsIHsgcmVkaXJlY3Q6ICRlbC5hdHRyKCdkYXRhLXJlZGlyZWN0JykgfSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVmlzaXRvcnNTdW1tYXJ5KCkge1xuICAgIHZhciBtZW1iZXJzID0gZ2V0QWxsSG91c2Vob2xkTWVtYmVycygpO1xuXG4gICAgJCgnLmpzLXZpc2l0b3JzLXN1bW1hcnknKS5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICB2YXIgJGVsID0gJChlbCk7XG5cbiAgICAgICAgJC5lYWNoKG1lbWJlcnMuZmlsdGVyKGlzVmlzaXRvciksIGZ1bmN0aW9uIChpLCBtZW1iZXIpIHtcbiAgICAgICAgICAgICRlbC5hcHBlbmQoY3JlYXRlTWVtYmVySXRlbShtZW1iZXIsIHsgcmVkaXJlY3Q6ICRlbC5hdHRyKCdkYXRhLXJlZGlyZWN0JykgfSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udGludWVOb3RpY2UoKSB7XG4gICAgdmFyIHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksXG4gICAgICAgIGlzQ29udGludWluZyA9IHVybFBhcmFtcy5nZXQoJ2NvbnRpbnVpbmcnKSxcbiAgICAgICAgcGVyc29uSWQgPSB1cmxQYXJhbXMuZ2V0KCdwZXJzb25faWQnKTtcblxuICAgIGlmICghaXNDb250aW51aW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG1lbWJlciA9IGdldEhvdXNlaG9sZE1lbWJlckJ5UGVyc29uSWQocGVyc29uSWQpO1xuICAgIHZhciBsaW5rID0gJyc7XG4gICAgaWYgKG1lbWJlcikge1xuICAgICAgICBsaW5rID0gaXNWaXNpdG9yKG1lbWJlcikgPyAnLi4vdmlzaXRvci1pbnRyby8/cGVyc29uX2lkPScgKyBwZXJzb25JZCA6ICcuLi9pbmRpdmlkdWFsLWludHJvLz9wZXJzb25faWQ9JyArIHBlcnNvbklkO1xuICAgIH0gZWxzZSBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIndsaF9ib29rbWFya1wiKSkge1xuICAgICAgICBsaW5rID0gJy4uL2NvbmZpcm0tYWRkcmVzcy8nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsgPSAnLi4vaG91c2Vob2xkLWFjY29tLWludHJvLyc7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC0tc2ltcGxlIHBhbmVsLS1pbmZvIHUtbWItc1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbF9fYm9keVwiPlxcbiAgICAgICAgICA8c3Ryb25nPlRoaXMgaXMgdGhlIGxhc3Qgdmlld2VkIHF1ZXN0aW9uIGluIHRoaXMgc2VjdGlvbjwvc3Ryb25nPlxcbiAgICAgICAgICA8cD5cXG4gICAgICAgICAgICAgIFlvdSBjYW4gYWxzbyA8YSBocmVmPVwiJyArIGxpbmsgKyAnXCI+Z28gYmFjayB0byB0aGUgc3RhcnQgXFxuICAgICAgICAgICAgICBvZiB0aGUgc2VjdGlvbjwvYT5cXG4gICAgICAgICAgPC9wPlxcbiAgICAgIDwvZGl2PlxcbiAgPC9kaXY+JztcblxuICAgICQoJy5qcy1oZWFkaW5nJykuY2xvc2VzdCgnLnF1ZXN0aW9uJykucHJlcGVuZCh0ZW1wbGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNhdmVBbmRDb21wbGV0ZUxhdGVyKCkge1xuICAgICQoJy5jb21wbGV0ZS1sYXRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuLi9wb3N0LXN1Ym1pc3Npb24vP3JlZGlyZWN0PS4uL2h1Yic7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZvb3J0TGlzdENvbCgpIHtcbiAgICAkKCcuanMtZm9vdGVyLWxpc3QtY29sJykuYXBwZW5kKCc8bGk+PGEgaHJlZj1cIi4uL3Rlc3QtZGF0YVwiJyArICcgY2xhc3M9XCJmb290ZXJfX2xpbmsgZm9vdGVyX19saW5rLS1pbmxpbmUgZ2hvc3QtbGluayB1LWZyXCI+VGVzdCcgKyAnIGRhdGE8L2E+PC9saT4nKTtcbn1cblxuZnVuY3Rpb24gaXNNZW1iZXJVc2VyKG1lbWJlcikge1xuICAgIHJldHVybiBtZW1iZXJbJ0BwZXJzb24nXS5pZCA9PT0gd2luZG93Lk9OUy5zdG9yYWdlLklEUy5VU0VSX0hPVVNFSE9MRF9NRU1CRVJfSUQ7XG59XG5cbmZ1bmN0aW9uIHNlc3Npb25Cb29rbWFyaygpIHtcbiAgICB2YXIgcGllY2VzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsICdbZGVsaW1ldGVyXScpLnNwbGl0KCdbZGVsaW1ldGVyXScpO1xuXG4gICAgcGllY2VzLnNoaWZ0KCk7XG5cbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC90ZXN0LWRhdGEvZykpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ21hdGNoJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdfc2Vzc2lvbl9ib29rbWFyaycsIFtdLmNvbmNhdCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIHBpZWNlcykuam9pbignJykpO1xufVxuXG5mdW5jdGlvbiBmaWVsZEl0ZW1EaXNwbGF5SGFjaygpIHtcbiAgICAkKCcuZmllbGRfX2l0ZW0nKS5hZnRlcignPGJyIC8+Jyk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlSW5wdXRzKHRlc3RGYWlscywgc2VsZWN0b3IsIGFkZHJlc3MpIHtcbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSxcbiAgICAgICAgZXJyb3JCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtZXJyb3ItYm94JyksXG4gICAgICAgIGxpc3RJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLScgKyBpbnB1dC5pZCksXG4gICAgICAgIGFuc3dlciA9IGlucHV0LmNsb3Nlc3QoJy5xdWVzdGlvbl9fYW5zd2VyJyksXG4gICAgICAgIGZpZWxkID0gaW5wdXQuY2xvc2VzdCgnLmZpZWxkZ3JvdXAnKSA/IGlucHV0LmNsb3Nlc3QoJy5maWVsZGdyb3VwJykgOiBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKSxcbiAgICAgICAgZmllbGRHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZGdyb3VwJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGVycm9yTXNnID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWVycm9yLW1zZycpO1xuXG4gICAgaWYgKGlucHV0LnZhbHVlID09PSB0ZXN0RmFpbHMgfHwgdGVzdEZhaWxzID09PSB0cnVlKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgJCgnLmpzLWZlZWRiYWNrLWxpbmsnKS5yZW1vdmVDbGFzcygnaXMtZXhwYW5kZWQnKTtcbiAgICAgICAgJCgnLmpzLWZlZWRiYWNrLWJvZHknKS5oaWRlKCk7XG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICBpZiAoIWxpc3RJdGVtLmNsYXNzTGlzdC5jb250YWlucygnanMtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICBlcnJvckJveC5jbGFzc0xpc3QucmVtb3ZlKCd1LWQtbm8nKTtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3UtZC1ubycpO1xuICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnanMtdmlzaWJsZScpO1xuICAgICAgICAgICAgdmFyIGlucHV0RXJyb3JQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpLFxuICAgICAgICAgICAgICAgIGlucHV0RXJyb3JCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyksXG4gICAgICAgICAgICAgICAgaW5wdXRFcnJvclAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyksXG4gICAgICAgICAgICAgICAgaW5wdXRFcnJvclN0cm9uZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NUUk9ORycpO1xuXG4gICAgICAgICAgICBpbnB1dEVycm9yUGFuZWwuY2xhc3NOYW1lID0gJ3BhbmVsIHBhbmVsLS1lcnJvciBwYW5lbC0tc2ltcGxlJztcbiAgICAgICAgICAgIGlucHV0RXJyb3JCb2R5LmNsYXNzTmFtZSA9ICdwYW5lbF9fYm9keSc7XG4gICAgICAgICAgICBpbnB1dEVycm9yUC5jbGFzc05hbWUgPSAncGFuZWxfX2Vycm9yJztcbiAgICAgICAgICAgIGlmIChhZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXZpc2libGUnKSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlucHV0RXJyb3JQLmlkID0gJ2Vycm9yLW1lc3NhZ2UtJyArIGVycm9ycztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXRFcnJvclAuaWQgPSAnZXJyb3ItbWVzc2FnZS0nICsgaW5wdXQuaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0RXJyb3JTdHJvbmcuaW5uZXJUZXh0ID0gZXJyb3JNc2c7XG4gICAgICAgICAgICBpbnB1dEVycm9yUC5hcHBlbmRDaGlsZChpbnB1dEVycm9yU3Ryb25nKTtcbiAgICAgICAgICAgIGlucHV0RXJyb3JCb2R5LmFwcGVuZENoaWxkKGlucHV0RXJyb3JQKTtcbiAgICAgICAgICAgIGlucHV0RXJyb3JCb2R5LmFwcGVuZENoaWxkKGZpZWxkKTtcbiAgICAgICAgICAgIGlucHV0RXJyb3JQYW5lbC5hcHBlbmRDaGlsZChpbnB1dEVycm9yQm9keSk7XG4gICAgICAgICAgICBhbnN3ZXIuYXBwZW5kQ2hpbGQoaW5wdXRFcnJvclBhbmVsKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWZpZWxkR3JvdXApIHtcbiAgICAgICAgdmFyIGVycm9yUGFuZWwgPSBpbnB1dC5jbG9zZXN0KCcucGFuZWwnKTtcbiAgICAgICAgaWYgKGVycm9yUGFuZWwpIHtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3UtZC1ubycpLCBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdqcy12aXNpYmxlJyk7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgIGFuc3dlci5hcHBlbmRDaGlsZChmaWVsZCk7XG4gICAgICAgICAgICBhbnN3ZXIucmVtb3ZlQ2hpbGQoZXJyb3JQYW5lbCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGNFcnJvcnMoKSB7XG4gICAgdmFyIGVycm9ycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXZpc2libGUnKSkubGVuZ3RoLFxuICAgICAgICBwaXBpbmdEZXN0aW5hdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcGlwaW5nJyk7XG5cbiAgICBwaXBpbmdEZXN0aW5hdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocGlwaW5nRGVzdGluYXRpb24pIHtcbiAgICAgICAgaWYgKGVycm9ycyA9PT0gMSkge1xuICAgICAgICAgICAgcGlwaW5nRGVzdGluYXRpb24uaW5uZXJUZXh0ID0gcGlwaW5nRGVzdGluYXRpb24uaW5uZXJUZXh0LnJlcGxhY2UoJ3t4fScsICcnKS5yZXBsYWNlKCd7c30nLCAnJykucmVwbGFjZSgnMicsIFwiMVwiKS5yZXBsYWNlKCdhcmUnLCBcImlzIGFcIikucmVwbGFjZSgncHJvYmxlbXMnLCBcInByb2JsZW1cIikucmVwbGFjZSgnMSAnLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvcnMgPiAxKSB7XG4gICAgICAgICAgICBwaXBpbmdEZXN0aW5hdGlvbi5pbm5lclRleHQgPSBwaXBpbmdEZXN0aW5hdGlvbi5pbm5lclRleHQucmVwbGFjZSgne3h9JywgJzInKS5yZXBsYWNlKCdpcyBhJywgJ2FyZScpLnJlcGxhY2UoJ3tzfScsICdzJykucmVwbGFjZSgnMScsIFwiMlwiKS5yZXBsYWNlKCdhcmUgcHJvYmxlbScsIFwiYXJlIDIgcHJvYmxlbXNcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcmVQYWdlRGF0YSh1cmwsIHByZXZpb3VzVXJsKSB7XG4gICAgdmFyIHBhZ2VEYXRhQ29udGVudHMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3BhZ2VEYXRhJykpIHx8IHt9O1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3BhZ2VEYXRhJywgSlNPTi5zdHJpbmdpZnkoX2V4dGVuZHMoe30sIHBhZ2VEYXRhQ29udGVudHMgfHwge30sIGRlZmluZVByb3BlcnR5KHt9LCB1cmwsIHByZXZpb3VzVXJsKSkpKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlRmVlZGJhY2soKSB7XG4gICAgJCgnLmpzLWZlZWRiYWNrLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWV4cGFuZGVkJyk7XG4gICAgICAgICQoJy5qcy1mZWVkYmFjay1ib2R5Jykuc2xpZGVUb2dnbGUoJzMwMCcpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzdWJtaXRGZWVkYmFjaygpIHtcbiAgICAkKCcuZmVlZGJhY2stYnRuLXN1Ym1pdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLmZlZWRiYWNrX190aXRsZSwgLmZlZWRiYWNrX19tZXNzYWdlLCAuanMtY29sbGFwc2libGUtdGl0bGUnKS5oaWRlKCk7XG4gICAgICAgICQoJy5qcy1mZWVkYmFjay1ib2R5Jykuc2xpZGVVcCgnMTAwJyk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJChcIi5mZWVkYmFjay1ibG9ja1wiKS5vZmZzZXQoKS50b3AgLSAxOFxuICAgICAgICB9LCAzMDApO1xuICAgICAgICAkKCcuanMtZmVlZGJhY2stc3VjY2VzcycpLmRlbGF5KCc1MDAnKS5zbGlkZURvd24oJzIwMCcpLmZhZGVJbignNTAwJykuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgJ3Nsb3cnKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2hvd0ZlZWRiYWNrQ29udGV4dHVhbEFuc3dlcigpIHtcbiAgICAkKCcjY2Vuc3VzLXF1ZXN0aW9ucycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJy5qcy1xdWVzdGlvbi10b3BpYycpLnNsaWRlRG93bignMjAwJykuZmFkZUluKCczMDAnKTtcbiAgICB9KTtcbiAgICAkKCcjcGFnZS1kZXNpZ24sICNnZW5lcmFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnLmpzLXF1ZXN0aW9uLXRvcGljJykuc2xpZGVVcCgnMjAwJykuZmFkZU91dCgnMjAwJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vYmlsZU5hdigpIHtcbiAgICB2YXIgbW9iaWxlTmF2QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtdG9nZ2xlLW1haW4nKTtcblxuICAgICQobW9iaWxlTmF2QnRuKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2pzLW5hdi1zaG93Jyk7XG4gICAgICAgICQoJyNtYWluLW5hdicpLnRvZ2dsZSgpO1xuICAgIH0pO1xufVxuXG53aW5kb3cuT05TID0gd2luZG93Lk9OUyB8fCB7fTtcbndpbmRvdy5PTlMuc3RvcmFnZSA9IHtcbiAgICBzdG9yZVBhZ2VEYXRhOiBzdG9yZVBhZ2VEYXRhLFxuICAgIGdldEFkZHJlc3M6IGdldEFkZHJlc3MsXG4gICAgZ2V0UGlwZWRBZGRyZXNzOiBnZXRQaXBlZEFkZHJlc3MsXG4gICAgYWRkSG91c2Vob2xkTWVtYmVyOiBhZGRIb3VzZWhvbGRNZW1iZXIsXG4gICAgdXBkYXRlSG91c2Vob2xkTWVtYmVyOiB1cGRhdGVIb3VzZWhvbGRNZW1iZXIsXG4gICAgZGVsZXRlSG91c2Vob2xkTWVtYmVyOiBkZWxldGVIb3VzZWhvbGRNZW1iZXIsXG4gICAgZ2V0QWxsSG91c2Vob2xkTWVtYmVyczogZ2V0QWxsSG91c2Vob2xkTWVtYmVycyxcbiAgICBhZGRVc2VyUGVyc29uOiBhZGRVc2VyUGVyc29uLFxuICAgIGdldFVzZXJQZXJzb246IGdldFVzZXJQZXJzb24sXG4gICAgZ2V0VXNlckFzSG91c2Vob2xkTWVtYmVyOiBnZXRVc2VyQXNIb3VzZWhvbGRNZW1iZXIsXG4gICAgZ2V0SG91c2Vob2xkTWVtYmVyQnlQZXJzb25JZDogZ2V0SG91c2Vob2xkTWVtYmVyQnlQZXJzb25JZCxcbiAgICBnZXRNZW1iZXJQZXJzb25JZDogZ2V0TWVtYmVyUGVyc29uSWQsXG4gICAgdXBkYXRlVXNlckFzSG91c2Vob2xkTWVtYmVyOiB1cGRhdGVVc2VyQXNIb3VzZWhvbGRNZW1iZXIsXG4gICAgZGVsZXRlVXNlckFzSG91c2Vob2xkTWVtYmVyOiBkZWxldGVVc2VyQXNIb3VzZWhvbGRNZW1iZXIsXG4gICAgdGVtcEF3YXlRdWVzdGlvblNlbnRlbmNlTWFwOiB0ZW1wQXdheVF1ZXN0aW9uU2VudGVuY2VNYXAsXG4gICAgdmlzaXRvclF1ZXN0aW9uU2VudGVuY2VNYXA6IHZpc2l0b3JRdWVzdGlvblNlbnRlbmNlTWFwLFxuXG4gICAgaXNWaXNpdG9yOiBpc1Zpc2l0b3IsXG4gICAgaXNPdGhlckhvdXNlaG9sZE1lbWJlcjogaXNPdGhlckhvdXNlaG9sZE1lbWJlcixcbiAgICBpc0hvdXNlaG9sZE1lbWJlcjogaXNIb3VzZWhvbGRNZW1iZXIsXG5cbiAgICBhZGRSZWxhdGlvbnNoaXA6IGFkZFJlbGF0aW9uc2hpcCxcbiAgICBkZWxldGVSZWxhdGlvbnNoaXA6IGRlbGV0ZVJlbGF0aW9uc2hpcCxcbiAgICBlZGl0UmVsYXRpb25zaGlwOiBlZGl0UmVsYXRpb25zaGlwLFxuICAgIGdldEFsbFJlbGF0aW9uc2hpcHM6IGdldEFsbFJlbGF0aW9uc2hpcHMsXG4gICAgZ2V0QWxsTWFudWFsUmVsYXRpb25zaGlwczogZ2V0QWxsTWFudWFsUmVsYXRpb25zaGlwcyxcbiAgICBnZXROZXh0UGVyc29uSWQ6IGdldE5leHRQZXJzb25JZCxcbiAgICBkZWxldGVBbGxSZWxhdGlvbnNoaXBzRm9yTWVtYmVyOiBkZWxldGVBbGxSZWxhdGlvbnNoaXBzRm9yTWVtYmVyLFxuXG4gICAgZ2V0QWxsUGFyZW50c09mOiBnZXRBbGxQYXJlbnRzT2YsXG4gICAgZ2V0QWxsQ2hpbGRyZW5PZjogZ2V0QWxsQ2hpbGRyZW5PZixcbiAgICBnZXRQYXJlbnRJZEZyb21SZWxhdGlvbnNoaXA6IGdldFBhcmVudElkRnJvbVJlbGF0aW9uc2hpcCxcbiAgICBnZXRDaGlsZElkRnJvbVJlbGF0aW9uc2hpcDogZ2V0Q2hpbGRJZEZyb21SZWxhdGlvbnNoaXAsXG4gICAgZ2V0T3RoZXJQZXJzb25JZEZyb21SZWxhdGlvbnNoaXA6IGdldE90aGVyUGVyc29uSWRGcm9tUmVsYXRpb25zaGlwLFxuICAgIGlzQVBhcmVudEluUmVsYXRpb25zaGlwOiBpc0FQYXJlbnRJblJlbGF0aW9uc2hpcCxcbiAgICBpc0FDaGlsZEluUmVsYXRpb25zaGlwOiBpc0FDaGlsZEluUmVsYXRpb25zaGlwLFxuICAgIGlzSW5SZWxhdGlvbnNoaXA6IGlzSW5SZWxhdGlvbnNoaXAsXG4gICAgYXJlQW55Q2hpbGRyZW5JblJlbGF0aW9uc2hpcE5vdFBhcmVudDogYXJlQW55Q2hpbGRyZW5JblJlbGF0aW9uc2hpcE5vdFBhcmVudCxcbiAgICBpc1JlbGF0aW9uc2hpcFR5cGU6IGlzUmVsYXRpb25zaGlwVHlwZSxcbiAgICBpc1JlbGF0aW9uc2hpcEluZmVycmVkOiBpc1JlbGF0aW9uc2hpcEluZmVycmVkLFxuICAgIGdldFJlbGF0aW9uc2hpcE9mOiBnZXRSZWxhdGlvbnNoaXBPZixcblxuICAgIHJlbGF0aW9uc2hpcERlc2NyaXB0aW9uTWFwOiByZWxhdGlvbnNoaXBEZXNjcmlwdGlvbk1hcCxcbiAgICByZWxhdGlvbnNoaXBTdW1tYXJ5VGVtcGxhdGVzOiByZWxhdGlvbnNoaXBTdW1tYXJ5VGVtcGxhdGVzLFxuICAgIG1pc3NpbmdSZWxhdGlvbnNoaXBJbmZlcmVuY2U6IG1pc3NpbmdSZWxhdGlvbnNoaXBJbmZlcmVuY2UsXG4gICAgaW5mZXJSZWxhdGlvbnNoaXBzOiBpbmZlclJlbGF0aW9uc2hpcHMsXG4gICAgZ2V0UmVsYXRpb25zaGlwc1dpdGhQZXJzb25JZHM6IGdldFJlbGF0aW9uc2hpcHNXaXRoUGVyc29uSWRzLFxuICAgIGdldFBlb3BsZUlkc01pc3NpbmdSZWxhdGlvbnNoaXBzV2l0aFBlcnNvbjogZ2V0UGVvcGxlSWRzTWlzc2luZ1JlbGF0aW9uc2hpcHNXaXRoUGVyc29uLFxuICAgIGdldFJlbGF0aW9uc2hpcFR5cGU6IGdldFJlbGF0aW9uc2hpcFR5cGUsXG4gICAgZmluZE5leHRNaXNzaW5nUmVsYXRpb25zaGlwOiBmaW5kTmV4dE1pc3NpbmdSZWxhdGlvbnNoaXAsXG5cbiAgICBhZGRVcGRhdGVQZXJzb25hbERldGFpbHNET0I6IGFkZFVwZGF0ZVBlcnNvbmFsRGV0YWlsc0RPQixcbiAgICBnZXRQZXJzb25hbERldGFpbHNGb3I6IGdldFBlcnNvbmFsRGV0YWlsc0ZvcixcbiAgICByZW1vdmVQZXJzb25hbERldGFpbHNGb3I6IHJlbW92ZVBlcnNvbmFsRGV0YWlsc0ZvcixcbiAgICBhZGRVcGRhdGVNYXJpdGFsU3RhdHVzOiBhZGRVcGRhdGVNYXJpdGFsU3RhdHVzLFxuICAgIGFkZFVwZGF0ZU1hcml0YWxTdGF0dXNXaG86IGFkZFVwZGF0ZU1hcml0YWxTdGF0dXNXaG8sXG4gICAgYWRkVXBkYXRlMzBEYXlBZGRyZXNzVHlwZTogYWRkVXBkYXRlMzBEYXlBZGRyZXNzVHlwZSxcbiAgICBhZGRVcGRhdGUzMERheUFkZHJlc3NVazogYWRkVXBkYXRlMzBEYXlBZGRyZXNzVWssXG4gICAgYWRkVXBkYXRlMzBEYXlDb3VudHJ5OiBhZGRVcGRhdGUzMERheUNvdW50cnksXG4gICAgYWRkVXBkYXRlU2Nob29sOiBhZGRVcGRhdGVTY2hvb2wsXG4gICAgYWRkVXBkYXRlU3R1ZGVudDogYWRkVXBkYXRlU3R1ZGVudCxcbiAgICBhZGRVcGRhdGVTdHVkZW50QWRkcmVzczogYWRkVXBkYXRlU3R1ZGVudEFkZHJlc3MsXG4gICAgYWRkVXBkYXRlU3R1ZGVudEFkZGFkZHJlc3NJblVLOiBhZGRVcGRhdGVTdHVkZW50QWRkYWRkcmVzc0luVUssXG4gICAgYWRkVXBkYXRlU3R1ZGVudEFkZHJlc3NVazogYWRkVXBkYXRlU3R1ZGVudEFkZHJlc3NVayxcbiAgICBhZGRVcGRhdGVTdHVkZW50QWRkcmVzc0NvdW50cnk6IGFkZFVwZGF0ZVN0dWRlbnRBZGRyZXNzQ291bnRyeSxcbiAgICBhZGRVcGRhdGVDb3VudHJ5OiBhZGRVcGRhdGVDb3VudHJ5LFxuICAgIGFkZFVwZGF0ZUNvdW50cnlPdGhlcjogYWRkVXBkYXRlQ291bnRyeU90aGVyLFxuICAgIGFkZFVwZGF0ZUNvdW50cnlPdGhlckFycml2ZTogYWRkVXBkYXRlQ291bnRyeU90aGVyQXJyaXZlLFxuICAgIGFkZFVwZGF0ZUNvdW50cnlPdGhlckFycml2ZUNlbnN1czogYWRkVXBkYXRlQ291bnRyeU90aGVyQXJyaXZlQ2Vuc3VzLFxuICAgIGFkZFVwZGF0ZUNvdW50cnlPdGhlclN0YXk6IGFkZFVwZGF0ZUNvdW50cnlPdGhlclN0YXksXG4gICAgYWRkVXBkYXRlWWVhckFnb0FkZHJlc3M6IGFkZFVwZGF0ZVllYXJBZ29BZGRyZXNzLFxuICAgIGFkZFVwZGF0ZVllYXJBZ29BZGRyZXNzVWs6IGFkZFVwZGF0ZVllYXJBZ29BZGRyZXNzVWssXG4gICAgYWRkVXBkYXRlWWVhckFnb0FkZHJlc3NDb3VudHJ5OiBhZGRVcGRhdGVZZWFyQWdvQWRkcmVzc0NvdW50cnksXG4gICAgYWRkVXBkYXRlTmF0aW9uYWxJZGVudGl0eTogYWRkVXBkYXRlTmF0aW9uYWxJZGVudGl0eSxcbiAgICBhZGRVcGRhdGVOYXRpb25hbElkZW50aXR5T3RoZXI6IGFkZFVwZGF0ZU5hdGlvbmFsSWRlbnRpdHlPdGhlcixcbiAgICBhZGRVcGRhdGVFdGhuaWNHcm91cDogYWRkVXBkYXRlRXRobmljR3JvdXAsXG4gICAgYWRkVXBkYXRlRXRobmljR3JvdXBEZXNjcmlwdGlvbjogYWRkVXBkYXRlRXRobmljR3JvdXBEZXNjcmlwdGlvbixcbiAgICBhZGRVcGRhdGVFdGhuaWNHcm91cE90aGVyOiBhZGRVcGRhdGVFdGhuaWNHcm91cE90aGVyLFxuICAgIGFkZFVwZGF0ZVJlbGlnaW9uOiBhZGRVcGRhdGVSZWxpZ2lvbixcbiAgICBhZGRVcGRhdGVSZWxpZ2lvbk90aGVyOiBhZGRVcGRhdGVSZWxpZ2lvbk90aGVyLFxuICAgIGFkZFVwZGF0ZUxhbmd1YWdlOiBhZGRVcGRhdGVMYW5ndWFnZSxcbiAgICBhZGRVcGRhdGVMYW5ndWFnZU90aGVyOiBhZGRVcGRhdGVMYW5ndWFnZU90aGVyLFxuICAgIGFkZFVwZGF0ZUxhbmd1YWdlRW5nbGlzaDogYWRkVXBkYXRlTGFuZ3VhZ2VFbmdsaXNoLFxuICAgIGFkZFVwZGF0ZVBhc3Nwb3J0Q291bnRyeTogYWRkVXBkYXRlUGFzc3BvcnRDb3VudHJ5LFxuICAgIGFkZFVwZGF0ZVBhc3Nwb3J0Q291bnRyeU90aGVyOiBhZGRVcGRhdGVQYXNzcG9ydENvdW50cnlPdGhlcixcbiAgICBhZGRVcGRhdGVIZWFsdGg6IGFkZFVwZGF0ZUhlYWx0aCxcbiAgICBhZGRVcGRhdGVIZWFsdGhDb25kaXRpb25zOiBhZGRVcGRhdGVIZWFsdGhDb25kaXRpb25zLFxuICAgIGFkZFVwZGF0ZUhlYWx0aENvbmRpdGlvbnNBYmlsaXRpZXM6IGFkZFVwZGF0ZUhlYWx0aENvbmRpdGlvbnNBYmlsaXRpZXMsXG4gICAgYWRkVXBkYXRlSGVhbHRoU3VwcG9ydDogYWRkVXBkYXRlSGVhbHRoU3VwcG9ydCxcbiAgICBhZGRVcGRhdGVPcmllbnRhdGlvbjogYWRkVXBkYXRlT3JpZW50YXRpb24sXG4gICAgYWRkVXBkYXRlSWRlbnRpdHk6IGFkZFVwZGF0ZUlkZW50aXR5LFxuICAgIGFkZFVwZGF0ZVNhbGFyeTogYWRkVXBkYXRlU2FsYXJ5LFxuICAgIGFkZFVwZGF0ZVNleDogYWRkVXBkYXRlU2V4LFxuICAgIGFkZFVwZGF0ZUFkZHJlc3NXaGVyZTogYWRkVXBkYXRlQWRkcmVzc1doZXJlLFxuICAgIGFkZFVwZGF0ZUFkZHJlc3NJbmRpdmlkdWFsOiBhZGRVcGRhdGVBZGRyZXNzSW5kaXZpZHVhbCxcbiAgICBhZGRVcGRhdGVBZ2U6IGFkZFVwZGF0ZUFnZSxcbiAgICBhZGRVcGRhdGVBZ2VDb25maXJtOiBhZGRVcGRhdGVBZ2VDb25maXJtLFxuICAgIGFkZFVwZGF0ZUFkZHJlc3NPdXRzaWRlVUs6IGFkZFVwZGF0ZUFkZHJlc3NPdXRzaWRlVUssXG4gICAgYWRkVXBkYXRlQXBwcmVudGljZXNoaXA6IGFkZFVwZGF0ZUFwcHJlbnRpY2VzaGlwLFxuICAgIGFkZFVwZGF0ZUhhc1F1YWxpZmljYXRpb25BYm92ZTogYWRkVXBkYXRlSGFzUXVhbGlmaWNhdGlvbkFib3ZlLFxuICAgIGFkZFVwZGF0ZVF1YWxpZmljYXRpb25zTnZxRXF1aXZhbGVudDogYWRkVXBkYXRlUXVhbGlmaWNhdGlvbnNOdnFFcXVpdmFsZW50LFxuICAgIGFkZFVwZGF0ZVF1YWxpZmljYXRpb25zQUxldmVsOiBhZGRVcGRhdGVRdWFsaWZpY2F0aW9uc0FMZXZlbCxcbiAgICBhZGRVcGRhdGVRdWFsaWZpY2F0aW9uc0dDU0VzOiBhZGRVcGRhdGVRdWFsaWZpY2F0aW9uc0dDU0VzLFxuICAgIGFkZFVwZGF0ZVF1YWxpZmljYXRpb25zT3RoZXJXaGVyZTogYWRkVXBkYXRlUXVhbGlmaWNhdGlvbnNPdGhlcldoZXJlLFxuICAgIGFkZFVwZGF0ZUFybWVkRm9yY2VzOiBhZGRVcGRhdGVBcm1lZEZvcmNlcyxcbiAgICBhZGRVcGRhdGVMYXN0U2V2ZW5EYXlzOiBhZGRVcGRhdGVMYXN0U2V2ZW5EYXlzLFxuICAgIGFkZFVwZGF0ZUxhc3RTZXZlbkRheXNEZXNjcmlwdGlvbjogYWRkVXBkYXRlTGFzdFNldmVuRGF5c0Rlc2NyaXB0aW9uLFxuICAgIGFkZFVwZGF0ZUVtcGxveW1lbnRGb3VyV2Vla3M6IGFkZFVwZGF0ZUVtcGxveW1lbnRGb3VyV2Vla3MsXG4gICAgYWRkVXBkYXRlRW1wbG95bWVudFBhaWRXb3JrQ29uZmlybTogYWRkVXBkYXRlRW1wbG95bWVudFBhaWRXb3JrQ29uZmlybSxcbiAgICBhZGRVcGRhdGVFbXBsb3ltZW50QWNjZXB0ZWRKb2I6IGFkZFVwZGF0ZUVtcGxveW1lbnRBY2NlcHRlZEpvYixcbiAgICBhZGRVcGRhdGVFbXBsb3ltZW50U3RhdHVzOiBhZGRVcGRhdGVFbXBsb3ltZW50U3RhdHVzLFxuICAgIGFkZFVwZGF0ZUVtcGxveW1lbnROYW1lOiBhZGRVcGRhdGVFbXBsb3ltZW50TmFtZSxcbiAgICBhZGRVcGRhdGVFbXBsb3ltZW50Sm9iVGl0bGU6IGFkZFVwZGF0ZUVtcGxveW1lbnRKb2JUaXRsZSxcbiAgICBhZGRVcGRhdGVFbXBsb3ltZW50Sm9iRGVzY3JpcHRpb246IGFkZFVwZGF0ZUVtcGxveW1lbnRKb2JEZXNjcmlwdGlvbixcbiAgICBhZGRVcGRhdGVFbXBsb3ltZW50QnVzaW5lc3NBY3Rpdml0eTogYWRkVXBkYXRlRW1wbG95bWVudEJ1c2luZXNzQWN0aXZpdHksXG4gICAgYWRkVXBkYXRlRW1wbG95bWVudFJlc3BvbnNpYmlsaXRpZXM6IGFkZFVwZGF0ZUVtcGxveW1lbnRSZXNwb25zaWJpbGl0aWVzLFxuICAgIGFkZFVwZGF0ZUVtcGxveW1lbnRIb3Vyc1dvcmtlZDogYWRkVXBkYXRlRW1wbG95bWVudEhvdXJzV29ya2VkLFxuICAgIGFkZFVwZGF0ZUVtcGxveW1lbnRUcmF2ZWw6IGFkZFVwZGF0ZUVtcGxveW1lbnRUcmF2ZWwsXG4gICAgYWRkVXBkYXRlRW1wbG95bWVudE1haW5seVdvcms6IGFkZFVwZGF0ZUVtcGxveW1lbnRNYWlubHlXb3JrLFxuICAgIGFkZFVwZGF0ZUVtcGxveW1lbnRXb3JrVUs6IGFkZFVwZGF0ZUVtcGxveW1lbnRXb3JrVUssXG4gICAgYWRkVXBkYXRlRW1wbG95bWVudE91dHNpZGVVSzogYWRkVXBkYXRlRW1wbG95bWVudE91dHNpZGVVSyxcbiAgICBhZGRVcGRhdGVFbXBsb3ltZW50V29ya3BsYWNlQWRkcmVzczogYWRkVXBkYXRlRW1wbG95bWVudFdvcmtwbGFjZUFkZHJlc3MsXG4gICAgYWRkVXBkYXRlRW1wbG95bWVudEF2YWlsYWJsZVR3b1dlZWtzOiBhZGRVcGRhdGVFbXBsb3ltZW50QXZhaWxhYmxlVHdvV2Vla3MsXG4gICAgYWRkVXBkYXRlVmlzaXRvckNvbXBsZXRlOiBhZGRVcGRhdGVWaXNpdG9yQ29tcGxldGUsXG5cbiAgICBwZXJzb25hbERldGFpbHNNYXJpdGFsU3RhdHVzTWFwOiBwZXJzb25hbERldGFpbHNNYXJpdGFsU3RhdHVzTWFwLFxuICAgIHBlcnNvbmFsRGV0YWlsc0NvdW50cnlNYXA6IHBlcnNvbmFsRGV0YWlsc0NvdW50cnlNYXAsXG4gICAgcGVyc29uYWxEZXRhaWxzT3JpZW50YXRpb25NYXA6IHBlcnNvbmFsRGV0YWlsc09yaWVudGF0aW9uTWFwLFxuICAgIHBlcnNvbmFsRGV0YWlsc0dlbmRlck1hcDogcGVyc29uYWxEZXRhaWxzR2VuZGVyTWFwLFxuICAgIHBlcnNvbmFsRGV0YWlsc05hdGlvbmFsSWRlbnRpdHlNYXA6IHBlcnNvbmFsRGV0YWlsc05hdGlvbmFsSWRlbnRpdHlNYXAsXG4gICAgcGVyc29uYWxEZXRhaWxzRXRobmljR3JvdXBNYXA6IHBlcnNvbmFsRGV0YWlsc0V0aG5pY0dyb3VwTWFwLFxuICAgIHBlcnNvbmFsRGV0YWlsc1Bhc3Nwb3J0Q291bnRyaWVzTWFwOiBwZXJzb25hbERldGFpbHNQYXNzcG9ydENvdW50cmllc01hcCxcbiAgICBwZXJzb25hbERldGFpbHNBcHByZW50aWNlc2hpcE1hcDogcGVyc29uYWxEZXRhaWxzQXBwcmVudGljZXNoaXBNYXAsXG4gICAgcGVyc29uYWxEZXRhaWxzRGVncmVlQWJvdmVNYXA6IHBlcnNvbmFsRGV0YWlsc0RlZ3JlZUFib3ZlTWFwLFxuICAgIHBlcnNvbmFsRGV0YWlsc05WUU1hcDogcGVyc29uYWxEZXRhaWxzTlZRTWFwLFxuICAgIHBlcnNvbmFsRGV0YWlsc0FMZXZlbE1hcDogcGVyc29uYWxEZXRhaWxzQUxldmVsTWFwLFxuICAgIHBlcnNvbmFsRGV0YWlsc0dDU0VNYXA6IHBlcnNvbmFsRGV0YWlsc0dDU0VNYXAsXG4gICAgcGVyc29uYWxEZXRhaWxzT3RoZXJXaGVyZTogcGVyc29uYWxEZXRhaWxzT3RoZXJXaGVyZSxcbiAgICBwZXJzb25hbERldGFpbHNFbXBsb3ltZW50U3RhdHVzOiBwZXJzb25hbERldGFpbHNFbXBsb3ltZW50U3RhdHVzLFxuXG4gICAgY3JlYXRlUGluRm9yOiBjcmVhdGVQaW5Gb3IsXG4gICAgZ2V0UGluRm9yOiBnZXRQaW5Gb3IsXG4gICAgdW5zZXRQaW5Gb3I6IHVuc2V0UGluRm9yLFxuICAgIHBlcnNvbmFsQm9va21hcms6IHBlcnNvbmFsQm9va21hcmssXG4gICAgZ2V0Qm9va21hcmtGb3I6IGdldEJvb2ttYXJrRm9yLFxuICAgIGNsZWFyUGVyc29uYWxCb29rbWFyazogY2xlYXJQZXJzb25hbEJvb2ttYXJrLFxuICAgIHBlcnNvbmFsUXVlc3Rpb25TdWJtaXREZWNvcmF0b3I6IHBlcnNvbmFsUXVlc3Rpb25TdWJtaXREZWNvcmF0b3IsXG5cbiAgICBzZXRQcm94eTogc2V0UHJveHksXG4gICAgZ2V0UHJveHlGb3I6IGdldFByb3h5Rm9yLFxuICAgIGNsZWFyUHJveHk6IGNsZWFyUHJveHksXG5cbiAgICBkb0lMaXZlSGVyZTogZG9JTGl2ZUhlcmUsXG4gICAgaXNNZW1iZXJVc2VyOiBpc01lbWJlclVzZXIsXG5cbiAgICBLRVlTOiB7XG4gICAgICAgIEhPVVNFSE9MRF9NRU1CRVJTX1NUT1JBR0VfS0VZOiBIT1VTRUhPTERfTUVNQkVSU19TVE9SQUdFX0tFWSxcbiAgICAgICAgVVNFUl9TVE9SQUdFX0tFWTogVVNFUl9TVE9SQUdFX0tFWSxcbiAgICAgICAgSU5ESVZJRFVBTF9QUk9YWV9TVE9SQUdFX0tFWTogSU5ESVZJRFVBTF9QUk9YWV9TVE9SQUdFX0tFWSxcbiAgICAgICAgSE9VU0VIT0xEX01FTUJFUl9UWVBFOiBIT1VTRUhPTERfTUVNQkVSX1RZUEUsXG4gICAgICAgIFZJU0lUT1JfVFlQRTogVklTSVRPUl9UWVBFLFxuICAgICAgICBSRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZOiBSRUxBVElPTlNISVBTX1NUT1JBR0VfS0VZLFxuICAgICAgICBQRVJTT05BTF9ERVRBSUxTX0tFWTogUEVSU09OQUxfREVUQUlMU19LRVlcbiAgICB9LFxuXG4gICAgSURTOiB7XG4gICAgICAgIFVTRVJfSE9VU0VIT0xEX01FTUJFUl9JRDogVVNFUl9IT1VTRUhPTERfTUVNQkVSX0lEXG4gICAgfSxcblxuICAgIFRZUEVTOiB7XG4gICAgICAgIHBlcnNvbjogcGVyc29uLFxuICAgICAgICByZWxhdGlvbnNoaXA6IHJlbGF0aW9uc2hpcFxuICAgIH1cbn07XG5cbndpbmRvdy5PTlMuaGVscGVycyA9IHtcbiAgICBwb3B1bGF0ZUhvdXNlaG9sZExpc3Q6IHBvcHVsYXRlSG91c2Vob2xkTGlzdCxcbiAgICBwb3B1bGF0ZVZpc2l0b3JMaXN0OiBwb3B1bGF0ZVZpc2l0b3JMaXN0XG59O1xuXG53aW5kb3cuT05TLnV0aWxzID0ge1xuICAgIHJlbW92ZUZyb21MaXN0OiByZW1vdmVGcm9tTGlzdCxcbiAgICB0cmFpbGluZ05hbWVTOiB0cmFpbGluZ05hbWVTLFxuICAgIG51bWJlclRvUG9zaXRpb25Xb3JkOiBudW1iZXJUb1Bvc2l0aW9uV29yZCxcbiAgICBudW1iZXJUb1dvcmRzU3R5bGVndWlkZTogbnVtYmVyVG9Xb3Jkc1N0eWxlZ3VpZGUsXG4gICAgcHJlY2VkaW5nT3JkaW5hbFdvcmQ6IHByZWNlZGluZ09yZGluYWxXb3JkLFxuICAgIGdldFNpZ25pZmljYW50OiBnZXRTaWduaWZpY2FudCxcbiAgICBjbGVhbkhUTUxQbGFjZWhvbGRlclN0cmluZ1JlcGxhY21lbnQ6IGNsZWFuSFRNTFBsYWNlaG9sZGVyU3RyaW5nUmVwbGFjbWVudCxcbiAgICB2YWxpZGF0ZUlucHV0czogdmFsaWRhdGVJbnB1dHMsXG4gICAgY2FsY0Vycm9yczogY2FsY0Vycm9yc1xufTtcblxuJChwb3B1bGF0ZUhvdXNlaG9sZExpc3QpO1xuJChwb3B1bGF0ZVZpc2l0b3JMaXN0KTtcbiQodXBkYXRlSG91c2Vob2xkVmlzaXRvcnNOYXZpZ2F0aW9uSXRlbXMpO1xuJCh1cGRhdGVBZGRyZXNzZXMpO1xuJCh1cGRhdGVQZXJzb25MaW5rKTtcbiQodG9vbHMpO1xuJCh1cGRhdGVBbGxMaW5rcyk7XG4kKHVwZGF0ZVNpZ25pZmljYW50RGF0ZSk7XG4kKHVwZGF0ZVNpZ25pZmljYW50RGF0ZVdpdGhvdXREYXkpO1xuJCh1cGRhdGVIb3VzZWhvbGRTdW1tYXJ5KTtcbiQodXBkYXRlVmlzaXRvcnNTdW1tYXJ5KTtcbiQodXBkYXRlQ29udGludWVOb3RpY2UpO1xuJCh1cGRhdGVTYXZlQW5kQ29tcGxldGVMYXRlcik7XG4kKHVwZGF0ZUZvb3J0TGlzdENvbCk7XG4kKHNlc3Npb25Cb29rbWFyayk7XG4kKGZpZWxkSXRlbURpc3BsYXlIYWNrKTtcbiQodG9nZ2xlRmVlZGJhY2spO1xuJChzdWJtaXRGZWVkYmFjayk7XG4kKHNob3dGZWVkYmFja0NvbnRleHR1YWxBbnN3ZXIpO1xuJChtb2JpbGVOYXYpO1xuXG5leHBvcnRzLlVTRVJfU1RPUkFHRV9LRVkgPSBVU0VSX1NUT1JBR0VfS0VZO1xuZXhwb3J0cy5JTkRJVklEVUFMX1BST1hZX1NUT1JBR0VfS0VZID0gSU5ESVZJRFVBTF9QUk9YWV9TVE9SQUdFX0tFWTtcbmV4cG9ydHMuZ2V0QWRkcmVzcyA9IGdldEFkZHJlc3M7XG5leHBvcnRzLmFkZFVzZXJQZXJzb24gPSBhZGRVc2VyUGVyc29uO1xuZXhwb3J0cy5nZXRVc2VyUGVyc29uID0gZ2V0VXNlclBlcnNvbjtcbiIsIi8qIVxuICogRnVzZS5qcyB2My42LjEgLSBMaWdodHdlaWdodCBmdXp6eS1zZWFyY2ggKGh0dHA6Ly9mdXNlanMuaW8pXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE3IEtpcm9sbG9zIFJpc2sgKGh0dHA6Ly9raXJvLm1lKVxuICogQWxsIFJpZ2h0cyBSZXNlcnZlZC4gQXBhY2hlIFNvZnR3YXJlIExpY2Vuc2UgMi4wXG4gKiBcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG4hZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcIkZ1c2VcIixbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLkZ1c2U9dCgpOmUuRnVzZT10KCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHQ9e307ZnVuY3Rpb24gcihuKXtpZih0W25dKXJldHVybiB0W25dLmV4cG9ydHM7dmFyIG89dFtuXT17aTpuLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbbl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsciksby5sPSEwLG8uZXhwb3J0c31yZXR1cm4gci5tPWUsci5jPXQsci5kPWZ1bmN0aW9uKGUsdCxuKXtyLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6bn0pfSxyLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sci50PWZ1bmN0aW9uKGUsdCl7aWYoMSZ0JiYoZT1yKGUpKSw4JnQpcmV0dXJuIGU7aWYoNCZ0JiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZSYmZS5fX2VzTW9kdWxlKXJldHVybiBlO3ZhciBuPU9iamVjdC5jcmVhdGUobnVsbCk7aWYoci5yKG4pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOmV9KSwyJnQmJlwic3RyaW5nXCIhPXR5cGVvZiBlKWZvcih2YXIgbyBpbiBlKXIuZChuLG8sZnVuY3Rpb24odCl7cmV0dXJuIGVbdF19LmJpbmQobnVsbCxvKSk7cmV0dXJuIG59LHIubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gci5kKHQsXCJhXCIsdCksdH0sci5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxyLnA9XCJcIixyKHIucz0wKX0oW2Z1bmN0aW9uKGUsdCxyKXtmdW5jdGlvbiBuKGUpe3JldHVybihuPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9KShlKX1mdW5jdGlvbiBvKGUsdCl7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspe3ZhciBuPXRbcl07bi5lbnVtZXJhYmxlPW4uZW51bWVyYWJsZXx8ITEsbi5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbiYmKG4ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4ua2V5LG4pfX12YXIgaT1yKDEpLGE9cig3KSxzPWEuZ2V0LGM9KGEuZGVlcFZhbHVlLGEuaXNBcnJheSksaD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxyKXt2YXIgbj1yLmxvY2F0aW9uLG89dm9pZCAwPT09bj8wOm4saT1yLmRpc3RhbmNlLGE9dm9pZCAwPT09aT8xMDA6aSxjPXIudGhyZXNob2xkLGg9dm9pZCAwPT09Yz8uNjpjLGw9ci5tYXhQYXR0ZXJuTGVuZ3RoLHU9dm9pZCAwPT09bD8zMjpsLGY9ci5jYXNlU2Vuc2l0aXZlLHY9dm9pZCAwIT09ZiYmZixwPXIudG9rZW5TZXBhcmF0b3IsZD12b2lkIDA9PT1wPy8gKy9nOnAsZz1yLmZpbmRBbGxNYXRjaGVzLHk9dm9pZCAwIT09ZyYmZyxtPXIubWluTWF0Y2hDaGFyTGVuZ3RoLGs9dm9pZCAwPT09bT8xOm0sYj1yLmlkLFM9dm9pZCAwPT09Yj9udWxsOmIseD1yLmtleXMsTT12b2lkIDA9PT14P1tdOngsXz1yLnNob3VsZFNvcnQsdz12b2lkIDA9PT1ffHxfLEw9ci5nZXRGbixBPXZvaWQgMD09PUw/czpMLE89ci5zb3J0Rm4sQz12b2lkIDA9PT1PP2Z1bmN0aW9uKGUsdCl7cmV0dXJuIGUuc2NvcmUtdC5zY29yZX06TyxqPXIudG9rZW5pemUsUD12b2lkIDAhPT1qJiZqLEk9ci5tYXRjaEFsbFRva2VucyxGPXZvaWQgMCE9PUkmJkksVD1yLmluY2x1ZGVNYXRjaGVzLE49dm9pZCAwIT09VCYmVCx6PXIuaW5jbHVkZVNjb3JlLEU9dm9pZCAwIT09eiYmeixXPXIudmVyYm9zZSxLPXZvaWQgMCE9PVcmJlc7IWZ1bmN0aW9uKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxlKSx0aGlzLm9wdGlvbnM9e2xvY2F0aW9uOm8sZGlzdGFuY2U6YSx0aHJlc2hvbGQ6aCxtYXhQYXR0ZXJuTGVuZ3RoOnUsaXNDYXNlU2Vuc2l0aXZlOnYsdG9rZW5TZXBhcmF0b3I6ZCxmaW5kQWxsTWF0Y2hlczp5LG1pbk1hdGNoQ2hhckxlbmd0aDprLGlkOlMsa2V5czpNLGluY2x1ZGVNYXRjaGVzOk4saW5jbHVkZVNjb3JlOkUsc2hvdWxkU29ydDp3LGdldEZuOkEsc29ydEZuOkMsdmVyYm9zZTpLLHRva2VuaXplOlAsbWF0Y2hBbGxUb2tlbnM6Rn0sdGhpcy5zZXRDb2xsZWN0aW9uKHQpLHRoaXMuX3Byb2Nlc3NLZXlzKE0pfXZhciB0LHIsYTtyZXR1cm4gdD1lLChyPVt7a2V5Olwic2V0Q29sbGVjdGlvblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmxpc3Q9ZSxlfX0se2tleTpcIl9wcm9jZXNzS2V5c1wiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKHRoaXMuX2tleVdlaWdodHM9e30sdGhpcy5fa2V5TmFtZXM9W10sZS5sZW5ndGgmJlwic3RyaW5nXCI9PXR5cGVvZiBlWzBdKWZvcih2YXIgdD0wLHI9ZS5sZW5ndGg7dDxyO3QrPTEpe3ZhciBuPWVbdF07dGhpcy5fa2V5V2VpZ2h0c1tuXT0xLHRoaXMuX2tleU5hbWVzLnB1c2gobil9ZWxzZXtmb3IodmFyIG89bnVsbCxpPW51bGwsYT0wLHM9MCxjPWUubGVuZ3RoO3M8YztzKz0xKXt2YXIgaD1lW3NdO2lmKCFoLmhhc093blByb3BlcnR5KFwibmFtZVwiKSl0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXCJuYW1lXCIgcHJvcGVydHkgaW4ga2V5IG9iamVjdCcpO3ZhciBsPWgubmFtZTtpZih0aGlzLl9rZXlOYW1lcy5wdXNoKGwpLCFoLmhhc093blByb3BlcnR5KFwid2VpZ2h0XCIpKXRocm93IG5ldyBFcnJvcignTWlzc2luZyBcIndlaWdodFwiIHByb3BlcnR5IGluIGtleSBvYmplY3QnKTt2YXIgdT1oLndlaWdodDtpZih1PDB8fHU+MSl0aHJvdyBuZXcgRXJyb3IoJ1wid2VpZ2h0XCIgcHJvcGVydHkgaW4ga2V5IG11c3QgYmVpbiB0aGUgcmFuZ2Ugb2YgWzAsIDEpJyk7aT1udWxsPT1pP3U6TWF0aC5tYXgoaSx1KSxvPW51bGw9PW8/dTpNYXRoLm1pbihvLHUpLHRoaXMuX2tleVdlaWdodHNbbF09dSxhKz11fWlmKGE+MSl0aHJvdyBuZXcgRXJyb3IoXCJUb3RhbCBvZiB3ZWlnaHRzIGNhbm5vdCBleGNlZWQgMVwiKX19fSx7a2V5Olwic2VhcmNoXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOntsaW1pdDohMX07dGhpcy5fbG9nKCctLS0tLS0tLS1cXG5TZWFyY2ggcGF0dGVybjogXCInLmNvbmNhdChlLCdcIicpKTt2YXIgcj10aGlzLl9wcmVwYXJlU2VhcmNoZXJzKGUpLG49ci50b2tlblNlYXJjaGVycyxvPXIuZnVsbFNlYXJjaGVyLGk9dGhpcy5fc2VhcmNoKG4sbyk7cmV0dXJuIHRoaXMuX2NvbXB1dGVTY29yZShpKSx0aGlzLm9wdGlvbnMuc2hvdWxkU29ydCYmdGhpcy5fc29ydChpKSx0LmxpbWl0JiZcIm51bWJlclwiPT10eXBlb2YgdC5saW1pdCYmKGk9aS5zbGljZSgwLHQubGltaXQpKSx0aGlzLl9mb3JtYXQoaSl9fSx7a2V5OlwiX3ByZXBhcmVTZWFyY2hlcnNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpcIlwiLHQ9W107aWYodGhpcy5vcHRpb25zLnRva2VuaXplKWZvcih2YXIgcj1lLnNwbGl0KHRoaXMub3B0aW9ucy50b2tlblNlcGFyYXRvciksbj0wLG89ci5sZW5ndGg7bjxvO24rPTEpdC5wdXNoKG5ldyBpKHJbbl0sdGhpcy5vcHRpb25zKSk7cmV0dXJue3Rva2VuU2VhcmNoZXJzOnQsZnVsbFNlYXJjaGVyOm5ldyBpKGUsdGhpcy5vcHRpb25zKX19fSx7a2V5OlwiX3NlYXJjaFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOltdLHQ9YXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDAscj10aGlzLmxpc3Qsbj17fSxvPVtdO2lmKFwic3RyaW5nXCI9PXR5cGVvZiByWzBdKXtmb3IodmFyIGk9MCxhPXIubGVuZ3RoO2k8YTtpKz0xKXRoaXMuX2FuYWx5emUoe2tleTpcIlwiLHZhbHVlOnJbaV0scmVjb3JkOmksaW5kZXg6aX0se3Jlc3VsdE1hcDpuLHJlc3VsdHM6byx0b2tlblNlYXJjaGVyczplLGZ1bGxTZWFyY2hlcjp0fSk7cmV0dXJuIG99Zm9yKHZhciBzPTAsYz1yLmxlbmd0aDtzPGM7cys9MSlmb3IodmFyIGg9cltzXSxsPTAsdT10aGlzLl9rZXlOYW1lcy5sZW5ndGg7bDx1O2wrPTEpe3ZhciBmPXRoaXMuX2tleU5hbWVzW2xdO3RoaXMuX2FuYWx5emUoe2tleTpmLHZhbHVlOnRoaXMub3B0aW9ucy5nZXRGbihoLGYpLHJlY29yZDpoLGluZGV4OnN9LHtyZXN1bHRNYXA6bixyZXN1bHRzOm8sdG9rZW5TZWFyY2hlcnM6ZSxmdWxsU2VhcmNoZXI6dH0pfXJldHVybiBvfX0se2tleTpcIl9hbmFseXplXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzLG49ZS5rZXksbz1lLmFycmF5SW5kZXgsaT12b2lkIDA9PT1vPy0xOm8sYT1lLnZhbHVlLHM9ZS5yZWNvcmQsaD1lLmluZGV4LGw9dC50b2tlblNlYXJjaGVycyx1PXZvaWQgMD09PWw/W106bCxmPXQuZnVsbFNlYXJjaGVyLHY9dC5yZXN1bHRNYXAscD12b2lkIDA9PT12P3t9OnYsZD10LnJlc3VsdHMsZz12b2lkIDA9PT1kP1tdOmQ7IWZ1bmN0aW9uIGUodCxvLGksYSl7aWYobnVsbCE9bylpZihcInN0cmluZ1wiPT10eXBlb2Ygbyl7dmFyIHM9ITEsaD0tMSxsPTA7ci5fbG9nKFwiXFxuS2V5OiBcIi5jb25jYXQoXCJcIj09PW4/XCItLVwiOm4pKTt2YXIgdj1mLnNlYXJjaChvKTtpZihyLl9sb2coJ0Z1bGwgdGV4dDogXCInLmNvbmNhdChvLCdcIiwgc2NvcmU6ICcpLmNvbmNhdCh2LnNjb3JlKSksci5vcHRpb25zLnRva2VuaXplKXtmb3IodmFyIGQ9by5zcGxpdChyLm9wdGlvbnMudG9rZW5TZXBhcmF0b3IpLHk9ZC5sZW5ndGgsbT1bXSxrPTAsYj11Lmxlbmd0aDtrPGI7ays9MSl7dmFyIFM9dVtrXTtyLl9sb2coJ1xcblBhdHRlcm46IFwiJy5jb25jYXQoUy5wYXR0ZXJuLCdcIicpKTtmb3IodmFyIHg9ITEsTT0wO008eTtNKz0xKXt2YXIgXz1kW01dLHc9Uy5zZWFyY2goXyksTD17fTt3LmlzTWF0Y2g/KExbX109dy5zY29yZSxzPSEwLHg9ITAsbS5wdXNoKHcuc2NvcmUpKTooTFtfXT0xLHIub3B0aW9ucy5tYXRjaEFsbFRva2Vuc3x8bS5wdXNoKDEpKSxyLl9sb2coJ1Rva2VuOiBcIicuY29uY2F0KF8sJ1wiLCBzY29yZTogJykuY29uY2F0KExbX10pKX14JiYobCs9MSl9aD1tWzBdO2Zvcih2YXIgQT1tLmxlbmd0aCxPPTE7TzxBO08rPTEpaCs9bVtPXTtoLz1BLHIuX2xvZyhcIlRva2VuIHNjb3JlIGF2ZXJhZ2U6XCIsaCl9dmFyIEM9di5zY29yZTtoPi0xJiYoQz0oQytoKS8yKSxyLl9sb2coXCJTY29yZSBhdmVyYWdlOlwiLEMpO3ZhciBqPSFyLm9wdGlvbnMudG9rZW5pemV8fCFyLm9wdGlvbnMubWF0Y2hBbGxUb2tlbnN8fGw+PXUubGVuZ3RoO2lmKHIuX2xvZyhcIlxcbkNoZWNrIE1hdGNoZXM6IFwiLmNvbmNhdChqKSksKHN8fHYuaXNNYXRjaCkmJmope3ZhciBQPXtrZXk6bixhcnJheUluZGV4OnQsdmFsdWU6byxzY29yZTpDfTtyLm9wdGlvbnMuaW5jbHVkZU1hdGNoZXMmJihQLm1hdGNoZWRJbmRpY2VzPXYubWF0Y2hlZEluZGljZXMpO3ZhciBJPXBbYV07ST9JLm91dHB1dC5wdXNoKFApOihwW2FdPXtpdGVtOmksb3V0cHV0OltQXX0sZy5wdXNoKHBbYV0pKX19ZWxzZSBpZihjKG8pKWZvcih2YXIgRj0wLFQ9by5sZW5ndGg7RjxUO0YrPTEpZShGLG9bRl0saSxhKX0oaSxhLHMsaCl9fSx7a2V5OlwiX2NvbXB1dGVTY29yZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuX2xvZyhcIlxcblxcbkNvbXB1dGluZyBzY29yZTpcXG5cIik7Zm9yKHZhciB0PXRoaXMuX2tleVdlaWdodHMscj0hIU9iamVjdC5rZXlzKHQpLmxlbmd0aCxuPTAsbz1lLmxlbmd0aDtuPG87bis9MSl7Zm9yKHZhciBpPWVbbl0sYT1pLm91dHB1dCxzPWEubGVuZ3RoLGM9MSxoPTA7aDxzO2grPTEpe3ZhciBsPWFbaF0sdT1sLmtleSxmPXI/dFt1XToxLHY9MD09PWwuc2NvcmUmJnQmJnRbdV0+MD9OdW1iZXIuRVBTSUxPTjpsLnNjb3JlO2MqPU1hdGgucG93KHYsZil9aS5zY29yZT1jLHRoaXMuX2xvZyhpKX19fSx7a2V5OlwiX3NvcnRcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLl9sb2coXCJcXG5cXG5Tb3J0aW5nLi4uLlwiKSxlLnNvcnQodGhpcy5vcHRpb25zLnNvcnRGbil9fSx7a2V5OlwiX2Zvcm1hdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PVtdO2lmKHRoaXMub3B0aW9ucy52ZXJib3NlKXt2YXIgcj1bXTt0aGlzLl9sb2coXCJcXG5cXG5PdXRwdXQ6XFxuXFxuXCIsSlNPTi5zdHJpbmdpZnkoZSxmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PT1uKHQpJiZudWxsIT09dCl7aWYoLTEhPT1yLmluZGV4T2YodCkpcmV0dXJuO3IucHVzaCh0KX1yZXR1cm4gdH0sMikpLHI9bnVsbH12YXIgbz1bXTt0aGlzLm9wdGlvbnMuaW5jbHVkZU1hdGNoZXMmJm8ucHVzaChmdW5jdGlvbihlLHQpe3ZhciByPWUub3V0cHV0O3QubWF0Y2hlcz1bXTtmb3IodmFyIG49MCxvPXIubGVuZ3RoO248bztuKz0xKXt2YXIgaT1yW25dO2lmKDAhPT1pLm1hdGNoZWRJbmRpY2VzLmxlbmd0aCl7dmFyIGE9e2luZGljZXM6aS5tYXRjaGVkSW5kaWNlcyx2YWx1ZTppLnZhbHVlfTtpLmtleSYmKGEua2V5PWkua2V5KSxpLmhhc093blByb3BlcnR5KFwiYXJyYXlJbmRleFwiKSYmaS5hcnJheUluZGV4Pi0xJiYoYS5hcnJheUluZGV4PWkuYXJyYXlJbmRleCksdC5tYXRjaGVzLnB1c2goYSl9fX0pLHRoaXMub3B0aW9ucy5pbmNsdWRlU2NvcmUmJm8ucHVzaChmdW5jdGlvbihlLHQpe3Quc2NvcmU9ZS5zY29yZX0pO2Zvcih2YXIgaT0wLGE9ZS5sZW5ndGg7aTxhO2krPTEpe3ZhciBzPWVbaV07aWYodGhpcy5vcHRpb25zLmlkJiYocy5pdGVtPXRoaXMub3B0aW9ucy5nZXRGbihzLml0ZW0sdGhpcy5vcHRpb25zLmlkKVswXSksby5sZW5ndGgpe2Zvcih2YXIgYz17aXRlbTpzLml0ZW19LGg9MCxsPW8ubGVuZ3RoO2g8bDtoKz0xKW9baF0ocyxjKTt0LnB1c2goYyl9ZWxzZSB0LnB1c2gocy5pdGVtKX1yZXR1cm4gdH19LHtrZXk6XCJfbG9nXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZTt0aGlzLm9wdGlvbnMudmVyYm9zZSYmKGU9Y29uc29sZSkubG9nLmFwcGx5KGUsYXJndW1lbnRzKX19XSkmJm8odC5wcm90b3R5cGUsciksYSYmbyh0LGEpLGV9KCk7ZS5leHBvcnRzPWh9LGZ1bmN0aW9uKGUsdCxyKXtmdW5jdGlvbiBuKGUsdCl7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspe3ZhciBuPXRbcl07bi5lbnVtZXJhYmxlPW4uZW51bWVyYWJsZXx8ITEsbi5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbiYmKG4ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4ua2V5LG4pfX12YXIgbz1yKDIpLGk9cigzKSxhPXIoNikscz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxyKXt2YXIgbj1yLmxvY2F0aW9uLG89dm9pZCAwPT09bj8wOm4saT1yLmRpc3RhbmNlLHM9dm9pZCAwPT09aT8xMDA6aSxjPXIudGhyZXNob2xkLGg9dm9pZCAwPT09Yz8uNjpjLGw9ci5tYXhQYXR0ZXJuTGVuZ3RoLHU9dm9pZCAwPT09bD8zMjpsLGY9ci5pc0Nhc2VTZW5zaXRpdmUsdj12b2lkIDAhPT1mJiZmLHA9ci50b2tlblNlcGFyYXRvcixkPXZvaWQgMD09PXA/LyArL2c6cCxnPXIuZmluZEFsbE1hdGNoZXMseT12b2lkIDAhPT1nJiZnLG09ci5taW5NYXRjaENoYXJMZW5ndGgsaz12b2lkIDA9PT1tPzE6bSxiPXIuaW5jbHVkZU1hdGNoZXMsUz12b2lkIDAhPT1iJiZiOyFmdW5jdGlvbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsZSksdGhpcy5vcHRpb25zPXtsb2NhdGlvbjpvLGRpc3RhbmNlOnMsdGhyZXNob2xkOmgsbWF4UGF0dGVybkxlbmd0aDp1LGlzQ2FzZVNlbnNpdGl2ZTp2LHRva2VuU2VwYXJhdG9yOmQsZmluZEFsbE1hdGNoZXM6eSxpbmNsdWRlTWF0Y2hlczpTLG1pbk1hdGNoQ2hhckxlbmd0aDprfSx0aGlzLnBhdHRlcm49dj90OnQudG9Mb3dlckNhc2UoKSx0aGlzLnBhdHRlcm4ubGVuZ3RoPD11JiYodGhpcy5wYXR0ZXJuQWxwaGFiZXQ9YSh0aGlzLnBhdHRlcm4pKX12YXIgdCxyLHM7cmV0dXJuIHQ9ZSwocj1be2tleTpcInNlYXJjaFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMub3B0aW9ucyxyPXQuaXNDYXNlU2Vuc2l0aXZlLG49dC5pbmNsdWRlTWF0Y2hlcztpZihyfHwoZT1lLnRvTG93ZXJDYXNlKCkpLHRoaXMucGF0dGVybj09PWUpe3ZhciBhPXtpc01hdGNoOiEwLHNjb3JlOjB9O3JldHVybiBuJiYoYS5tYXRjaGVkSW5kaWNlcz1bWzAsZS5sZW5ndGgtMV1dKSxhfXZhciBzPXRoaXMub3B0aW9ucyxjPXMubWF4UGF0dGVybkxlbmd0aCxoPXMudG9rZW5TZXBhcmF0b3I7aWYodGhpcy5wYXR0ZXJuLmxlbmd0aD5jKXJldHVybiBvKGUsdGhpcy5wYXR0ZXJuLGgpO3ZhciBsPXRoaXMub3B0aW9ucyx1PWwubG9jYXRpb24sZj1sLmRpc3RhbmNlLHY9bC50aHJlc2hvbGQscD1sLmZpbmRBbGxNYXRjaGVzLGQ9bC5taW5NYXRjaENoYXJMZW5ndGg7cmV0dXJuIGkoZSx0aGlzLnBhdHRlcm4sdGhpcy5wYXR0ZXJuQWxwaGFiZXQse2xvY2F0aW9uOnUsZGlzdGFuY2U6Zix0aHJlc2hvbGQ6dixmaW5kQWxsTWF0Y2hlczpwLG1pbk1hdGNoQ2hhckxlbmd0aDpkLGluY2x1ZGVNYXRjaGVzOm59KX19XSkmJm4odC5wcm90b3R5cGUscikscyYmbih0LHMpLGV9KCk7ZS5leHBvcnRzPXN9LGZ1bmN0aW9uKGUsdCl7dmFyIHI9L1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nO2UuZXhwb3J0cz1mdW5jdGlvbihlLHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTovICsvZyxvPW5ldyBSZWdFeHAodC5yZXBsYWNlKHIsXCJcXFxcJCZcIikucmVwbGFjZShuLFwifFwiKSksaT1lLm1hdGNoKG8pLGE9ISFpLHM9W107aWYoYSlmb3IodmFyIGM9MCxoPWkubGVuZ3RoO2M8aDtjKz0xKXt2YXIgbD1pW2NdO3MucHVzaChbZS5pbmRleE9mKGwpLGwubGVuZ3RoLTFdKX1yZXR1cm57c2NvcmU6YT8uNToxLGlzTWF0Y2g6YSxtYXRjaGVkSW5kaWNlczpzfX19LGZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1yKDQpLG89cig1KTtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsaSl7Zm9yKHZhciBhPWkubG9jYXRpb24scz12b2lkIDA9PT1hPzA6YSxjPWkuZGlzdGFuY2UsaD12b2lkIDA9PT1jPzEwMDpjLGw9aS50aHJlc2hvbGQsdT12b2lkIDA9PT1sPy42OmwsZj1pLmZpbmRBbGxNYXRjaGVzLHY9dm9pZCAwIT09ZiYmZixwPWkubWluTWF0Y2hDaGFyTGVuZ3RoLGQ9dm9pZCAwPT09cD8xOnAsZz1pLmluY2x1ZGVNYXRjaGVzLHk9dm9pZCAwIT09ZyYmZyxtPXMsaz1lLmxlbmd0aCxiPXUsUz1lLmluZGV4T2YodCxtKSx4PXQubGVuZ3RoLE09W10sXz0wO188aztfKz0xKU1bX109MDtpZigtMSE9PVMpe3ZhciB3PW4odCx7ZXJyb3JzOjAsY3VycmVudExvY2F0aW9uOlMsZXhwZWN0ZWRMb2NhdGlvbjptLGRpc3RhbmNlOmh9KTtpZihiPU1hdGgubWluKHcsYiksLTEhPT0oUz1lLmxhc3RJbmRleE9mKHQsbSt4KSkpe3ZhciBMPW4odCx7ZXJyb3JzOjAsY3VycmVudExvY2F0aW9uOlMsZXhwZWN0ZWRMb2NhdGlvbjptLGRpc3RhbmNlOmh9KTtiPU1hdGgubWluKEwsYil9fVM9LTE7Zm9yKHZhciBBPVtdLE89MSxDPXgrayxqPTE8PCh4PD0zMT94LTE6MzApLFA9MDtQPHg7UCs9MSl7Zm9yKHZhciBJPTAsRj1DO0k8Rjspe24odCx7ZXJyb3JzOlAsY3VycmVudExvY2F0aW9uOm0rRixleHBlY3RlZExvY2F0aW9uOm0sZGlzdGFuY2U6aH0pPD1iP0k9RjpDPUYsRj1NYXRoLmZsb29yKChDLUkpLzIrSSl9Qz1GO3ZhciBUPU1hdGgubWF4KDEsbS1GKzEpLE49dj9rOk1hdGgubWluKG0rRixrKSt4LHo9QXJyYXkoTisyKTt6W04rMV09KDE8PFApLTE7Zm9yKHZhciBFPU47RT49VDtFLT0xKXt2YXIgVz1FLTEsSz1yW2UuY2hhckF0KFcpXTtpZihLJiYoTVtXXT0xKSx6W0VdPSh6W0UrMV08PDF8MSkmSywwIT09UCYmKHpbRV18PShBW0UrMV18QVtFXSk8PDF8MXxBW0UrMV0pLHpbRV0maiYmKE89bih0LHtlcnJvcnM6UCxjdXJyZW50TG9jYXRpb246VyxleHBlY3RlZExvY2F0aW9uOm0sZGlzdGFuY2U6aH0pKTw9Yil7aWYoYj1PLChTPVcpPD1tKWJyZWFrO1Q9TWF0aC5tYXgoMSwyKm0tUyl9fWlmKG4odCx7ZXJyb3JzOlArMSxjdXJyZW50TG9jYXRpb246bSxleHBlY3RlZExvY2F0aW9uOm0sZGlzdGFuY2U6aH0pPmIpYnJlYWs7QT16fXZhciAkPXtpc01hdGNoOlM+PTAsc2NvcmU6MD09PU8/LjAwMTpPfTtyZXR1cm4geSYmKCQubWF0Y2hlZEluZGljZXM9byhNLGQpKSwkfX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXt2YXIgcj10LmVycm9ycyxuPXZvaWQgMD09PXI/MDpyLG89dC5jdXJyZW50TG9jYXRpb24saT12b2lkIDA9PT1vPzA6byxhPXQuZXhwZWN0ZWRMb2NhdGlvbixzPXZvaWQgMD09PWE/MDphLGM9dC5kaXN0YW5jZSxoPXZvaWQgMD09PWM/MTAwOmMsbD1uL2UubGVuZ3RoLHU9TWF0aC5hYnMocy1pKTtyZXR1cm4gaD9sK3UvaDp1PzE6bH19LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpbXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXToxLHI9W10sbj0tMSxvPS0xLGk9MCxhPWUubGVuZ3RoO2k8YTtpKz0xKXt2YXIgcz1lW2ldO3MmJi0xPT09bj9uPWk6c3x8LTE9PT1ufHwoKG89aS0xKS1uKzE+PXQmJnIucHVzaChbbixvXSksbj0tMSl9cmV0dXJuIGVbaS0xXSYmaS1uPj10JiZyLnB1c2goW24saS0xXSkscn19LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD17fSxyPWUubGVuZ3RoLG49MDtuPHI7bis9MSl0W2UuY2hhckF0KG4pXT0wO2Zvcih2YXIgbz0wO288cjtvKz0xKXRbZS5jaGFyQXQobyldfD0xPDxyLW8tMTtyZXR1cm4gdH19LGZ1bmN0aW9uKGUsdCl7dmFyIHI9ZnVuY3Rpb24oZSl7cmV0dXJuIEFycmF5LmlzQXJyYXk/QXJyYXkuaXNBcnJheShlKTpcIltvYmplY3QgQXJyYXldXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9LG49ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PWU/XCJcIjpmdW5jdGlvbihlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlyZXR1cm4gZTt2YXIgdD1lK1wiXCI7cmV0dXJuXCIwXCI9PXQmJjEvZT09LTEvMD9cIi0wXCI6dH0oZSl9LG89ZnVuY3Rpb24oZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGV9LGk9ZnVuY3Rpb24oZSl7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIGV9O2UuZXhwb3J0cz17Z2V0OmZ1bmN0aW9uKGUsdCl7dmFyIGE9W107cmV0dXJuIGZ1bmN0aW9uIGUodCxzKXtpZihzKXt2YXIgYz1zLmluZGV4T2YoXCIuXCIpLGg9cyxsPW51bGw7LTEhPT1jJiYoaD1zLnNsaWNlKDAsYyksbD1zLnNsaWNlKGMrMSkpO3ZhciB1PXRbaF07aWYobnVsbCE9dSlpZihsfHwhbyh1KSYmIWkodSkpaWYocih1KSlmb3IodmFyIGY9MCx2PXUubGVuZ3RoO2Y8djtmKz0xKWUodVtmXSxsKTtlbHNlIGwmJmUodSxsKTtlbHNlIGEucHVzaChuKHUpKX1lbHNlIGEucHVzaCh0KX0oZSx0KSxhfSxpc0FycmF5OnIsaXNTdHJpbmc6byxpc051bTppLHRvU3RyaW5nOm59fV0pfSk7Il19
