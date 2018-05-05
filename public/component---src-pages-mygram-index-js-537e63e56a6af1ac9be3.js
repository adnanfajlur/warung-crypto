webpackJsonp([250228937405373],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sheetsManager = undefined;
	
	var _keys = __webpack_require__(18);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(12);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(9);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(13);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(11);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(10);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _map = __webpack_require__(226);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _minSafeInteger = __webpack_require__(227);
	
	var _minSafeInteger2 = _interopRequireDefault(_minSafeInteger);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _hoistNonReactStatics = __webpack_require__(53);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _getDisplayName = __webpack_require__(73);
	
	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);
	
	var _wrapDisplayName = __webpack_require__(36);
	
	var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);
	
	var _contextTypes = __webpack_require__(178);
	
	var _contextTypes2 = _interopRequireDefault(_contextTypes);
	
	var _jss = __webpack_require__(54);
	
	var _ns = __webpack_require__(72);
	
	var ns = _interopRequireWildcard(_ns);
	
	var _jssPreset = __webpack_require__(70);
	
	var _jssPreset2 = _interopRequireDefault(_jssPreset);
	
	var _createMuiTheme = __webpack_require__(48);
	
	var _createMuiTheme2 = _interopRequireDefault(_createMuiTheme);
	
	var _themeListener = __webpack_require__(49);
	
	var _themeListener2 = _interopRequireDefault(_themeListener);
	
	var _createGenerateClassName = __webpack_require__(69);
	
	var _createGenerateClassName2 = _interopRequireDefault(_createGenerateClassName);
	
	var _getStylesCreator = __webpack_require__(169);
	
	var _getStylesCreator2 = _interopRequireDefault(_getStylesCreator);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// New JSS instance.
	var jss = (0, _jss.create)((0, _jssPreset2.default)());
	
	// Use a singleton or the provided one by the context.
	var generateClassName = (0, _createGenerateClassName2.default)();
	
	// Global index counter to preserve source order.
	// As we create the style sheet during componentWillMount lifecycle,
	// children are handled after the parents, so the order of style elements would
	// be parent->child. It is a problem though when a parent passes a className
	// which needs to override any childs styles. StyleSheet of the child has a higher
	// specificity, because of the source order.
	// So our solution is to render sheets them in the reverse order child->sheet, so
	// that parent has a higher specificity.
	var indexCounter = _minSafeInteger2.default;
	
	var sheetsManager = exports.sheetsManager = new _map2.default();
	
	// We use the same empty object to ref count the styles that don't need a theme object.
	var noopTheme = {};
	
	// In order to have self-supporting components, we rely on default theme when not provided.
	var defaultTheme = void 0;
	
	function getDefaultTheme() {
	  if (defaultTheme) {
	    return defaultTheme;
	  }
	
	  defaultTheme = (0, _createMuiTheme2.default)();
	  return defaultTheme;
	}
	
	// Link a style sheet with a component.
	// It does not modify the component passed to it;
	// instead, it returns a new component, with a `classes` property.
	var withStyles = function withStyles(stylesOrCreator) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return function (Component) {
	    var _options$withTheme = options.withTheme,
	        withTheme = _options$withTheme === undefined ? false : _options$withTheme,
	        _options$flip = options.flip,
	        flip = _options$flip === undefined ? null : _options$flip,
	        name = options.name,
	        styleSheetOptions = (0, _objectWithoutProperties3.default)(options, ['withTheme', 'flip', 'name']);
	
	    var stylesCreator = (0, _getStylesCreator2.default)(stylesOrCreator);
	    var listenToTheme = stylesCreator.themingEnabled || withTheme || typeof name === 'string';
	
	    indexCounter += 1;
	    stylesCreator.options.index = indexCounter;
	
	     false ? (0, _warning2.default)(indexCounter < 0, ['Material-UI: you might have a memory leak.', 'The indexCounter is not supposed to grow that much.'].join(' ')) : void 0;
	
	    var WithStyles = function (_React$Component) {
	      (0, _inherits3.default)(WithStyles, _React$Component);
	
	      function WithStyles(props, context) {
	        (0, _classCallCheck3.default)(this, WithStyles);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (WithStyles.__proto__ || (0, _getPrototypeOf2.default)(WithStyles)).call(this, props, context));
	
	        _this.state = {};
	        _this.disableStylesGeneration = false;
	        _this.jss = null;
	        _this.sheetOptions = null;
	        _this.sheetsManager = sheetsManager;
	        _this.stylesCreatorSaved = null;
	        _this.theme = null;
	        _this.unsubscribeId = null;
	
	
	        _this.jss = _this.context[ns.jss] || jss;
	
	        var muiThemeProviderOptions = _this.context.muiThemeProviderOptions;
	
	        if (muiThemeProviderOptions) {
	          if (muiThemeProviderOptions.sheetsManager) {
	            _this.sheetsManager = muiThemeProviderOptions.sheetsManager;
	          }
	
	          _this.disableStylesGeneration = muiThemeProviderOptions.disableStylesGeneration;
	        }
	
	        // Attach the stylesCreator to the instance of the component as in the context
	        // of react-hot-loader the hooks can be executed in a different closure context:
	        // https://github.com/gaearon/react-hot-loader/blob/master/src/patch.dev.js#L107
	        _this.stylesCreatorSaved = stylesCreator;
	        _this.sheetOptions = (0, _extends3.default)({
	          generateClassName: generateClassName
	        }, _this.context[ns.sheetOptions]);
	        // We use || as the function call is lazy evaluated.
	        _this.theme = listenToTheme ? _themeListener2.default.initial(context) || getDefaultTheme() : noopTheme;
	        return _this;
	      }
	
	      (0, _createClass3.default)(WithStyles, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	          this.attach(this.theme);
	        }
	      }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          var _this2 = this;
	
	          if (!listenToTheme) {
	            return;
	          }
	
	          this.unsubscribeId = _themeListener2.default.subscribe(this.context, function (theme) {
	            var oldTheme = _this2.theme;
	            _this2.theme = theme;
	            _this2.attach(_this2.theme);
	
	            // Rerender the component so the underlying component gets the theme update.
	            // By theme update we mean receiving and applying the new class names.
	            _this2.setState({}, function () {
	              _this2.detach(oldTheme);
	            });
	          });
	        }
	      }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps() {
	          // react-hot-loader specific logic
	          if (this.stylesCreatorSaved === stylesCreator || ("production") === 'production') {
	            return;
	          }
	
	          this.detach(this.theme);
	          this.stylesCreatorSaved = stylesCreator;
	          this.attach(this.theme);
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          this.detach(this.theme);
	
	          if (this.unsubscribeId !== null) {
	            _themeListener2.default.unsubscribe(this.context, this.unsubscribeId);
	          }
	        }
	      }, {
	        key: 'attach',
	        value: function attach(theme) {
	          if (this.disableStylesGeneration) {
	            return;
	          }
	
	          var stylesCreatorSaved = this.stylesCreatorSaved;
	          var sheetManager = this.sheetsManager.get(stylesCreatorSaved);
	
	          if (!sheetManager) {
	            sheetManager = new _map2.default();
	            this.sheetsManager.set(stylesCreatorSaved, sheetManager);
	          }
	
	          var sheetManagerTheme = sheetManager.get(theme);
	
	          if (!sheetManagerTheme) {
	            sheetManagerTheme = {
	              refs: 0,
	              sheet: null
	            };
	            sheetManager.set(theme, sheetManagerTheme);
	          }
	
	          if (sheetManagerTheme.refs === 0) {
	            var styles = stylesCreatorSaved.create(theme, name);
	            var meta = name;
	
	            if (false) {
	              meta = (0, _getDisplayName2.default)(Component);
	            }
	
	            var sheet = this.jss.createStyleSheet(styles, (0, _extends3.default)({
	              meta: meta,
	              classNamePrefix: meta,
	              flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl',
	              link: false
	            }, this.sheetOptions, stylesCreatorSaved.options, {
	              name: name
	            }, styleSheetOptions));
	
	            sheetManagerTheme.sheet = sheet;
	            sheet.attach();
	
	            var sheetsRegistry = this.context[ns.sheetsRegistry];
	            if (sheetsRegistry) {
	              sheetsRegistry.add(sheet);
	            }
	          }
	
	          sheetManagerTheme.refs += 1;
	        }
	      }, {
	        key: 'detach',
	        value: function detach(theme) {
	          if (this.disableStylesGeneration) {
	            return;
	          }
	
	          var stylesCreatorSaved = this.stylesCreatorSaved;
	          var sheetManager = this.sheetsManager.get(stylesCreatorSaved);
	          var sheetManagerTheme = sheetManager.get(theme);
	
	          sheetManagerTheme.refs -= 1;
	
	          if (sheetManagerTheme.refs === 0) {
	            sheetManager.delete(theme);
	            this.jss.removeStyleSheet(sheetManagerTheme.sheet);
	            var sheetsRegistry = this.context[ns.sheetsRegistry];
	            if (sheetsRegistry) {
	              sheetsRegistry.remove(sheetManagerTheme.sheet);
	            }
	          }
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var _this3 = this;
	
	          var _props = this.props,
	              classesProp = _props.classes,
	              innerRef = _props.innerRef,
	              other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'innerRef']);
	
	
	          var classes = void 0;
	          var renderedClasses = {};
	
	          if (!this.disableStylesGeneration) {
	            var sheetManager = this.sheetsManager.get(this.stylesCreatorSaved);
	            var sheetsManagerTheme = sheetManager.get(this.theme);
	            renderedClasses = sheetsManagerTheme.sheet.classes;
	          }
	
	          if (classesProp) {
	            classes = (0, _extends3.default)({}, renderedClasses, (0, _keys2.default)(classesProp).reduce(function (accumulator, key) {
	               false ? (0, _warning2.default)(renderedClasses[key] || _this3.disableStylesGeneration, ['Material-UI: the key `' + key + '` ' + ('provided to the classes property is not implemented in ' + (0, _getDisplayName2.default)(Component) + '.'), 'You can only override one of the following: ' + (0, _keys2.default)(renderedClasses).join(',')].join('\n')) : void 0;
	
	               false ? (0, _warning2.default)(!classesProp[key] || typeof classesProp[key] === 'string', ['Material-UI: the key `' + key + '` ' + ('provided to the classes property is not valid for ' + (0, _getDisplayName2.default)(Component) + '.'), 'You need to provide a non empty string instead of: ' + classesProp[key] + '.'].join('\n')) : void 0;
	
	              if (classesProp[key]) {
	                accumulator[key] = renderedClasses[key] + ' ' + classesProp[key];
	              }
	
	              return accumulator;
	            }, {}));
	          } else {
	            classes = renderedClasses;
	          }
	
	          var more = {};
	
	          // Provide the theme to the wrapped component.
	          // So we don't have to use the `withTheme()` Higher-order Component.
	          if (withTheme) {
	            more.theme = this.theme;
	          }
	
	          return _react2.default.createElement(Component, (0, _extends3.default)({ classes: classes }, more, other, { ref: innerRef }));
	        }
	      }]);
	      return WithStyles;
	    }(_react2.default.Component);
	
	    WithStyles.propTypes =  false ? {
	      /**
	       * Useful to extend the style applied to components.
	       */
	      classes: _propTypes2.default.object,
	      /**
	       * Use that property to pass a ref callback to the decorated component.
	       */
	      innerRef: _propTypes2.default.func
	    } : {};
	
	    WithStyles.contextTypes = (0, _extends3.default)({
	      muiThemeProviderOptions: _propTypes2.default.object
	    }, _contextTypes2.default, listenToTheme ? _themeListener2.default.contextTypes : {});
	
	    if (false) {
	      WithStyles.displayName = (0, _wrapDisplayName2.default)(Component, 'WithStyles');
	    }
	
	    (0, _hoistNonReactStatics2.default)(WithStyles, Component);
	
	    if (false) {
	      // Exposed for test purposes.
	      WithStyles.Naked = Component;
	      WithStyles.options = options;
	    }
	
	    return WithStyles;
	  };
	};
	
	exports.default = withStyles;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(91);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _keys = __webpack_require__(18);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	exports.capitalize = capitalize;
	exports.contains = contains;
	exports.findIndex = findIndex;
	exports.find = find;
	exports.createChainedFunction = createChainedFunction;
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function capitalize(string) {
	  if (false) {
	    throw new Error('Material-UI: capitalize(string) expects a string argument.');
	  }
	
	  return string.charAt(0).toUpperCase() + string.slice(1);
	} //  weak
	
	function contains(obj, pred) {
	  return (0, _keys2.default)(pred).every(function (key) {
	    return obj.hasOwnProperty(key) && obj[key] === pred[key];
	  });
	}
	
	function findIndex(arr, pred) {
	  var predType = typeof pred === 'undefined' ? 'undefined' : (0, _typeof3.default)(pred);
	  for (var i = 0; i < arr.length; i += 1) {
	    if (predType === 'function' && !!pred(arr[i], i, arr) === true) {
	      return i;
	    }
	    if (predType === 'object' && contains(arr[i], pred)) {
	      return i;
	    }
	    if (['string', 'number', 'boolean'].indexOf(predType) !== -1) {
	      return arr.indexOf(pred);
	    }
	  }
	  return -1;
	}
	
	function find(arr, pred) {
	  var index = findIndex(arr, pred);
	  return index > -1 ? arr[index] : undefined;
	}
	
	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} functions to chain
	 * @returns {function|null}
	 */
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return funcs.filter(function (func) {
	    return func != null;
	  }).reduce(function (acc, func) {
	     false ? (0, _warning2.default)(typeof func === 'function', 'Material-UI: invalid Argument Type, must only provide functions, undefined, or null.') : void 0;
	
	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      acc.apply(this, args);
	      func.apply(this, args);
	    };
	  }, function () {});
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.check = check;
	exports.hasOwn = hasOwn;
	exports.remove = remove;
	exports.deferred = deferred;
	exports.arrayOfDeffered = arrayOfDeffered;
	exports.delay = delay;
	exports.createMockTask = createMockTask;
	exports.autoInc = autoInc;
	exports.makeIterator = makeIterator;
	exports.log = log;
	exports.deprecate = deprecate;
	var sym = exports.sym = function sym(id) {
	  return '@@redux-saga/' + id;
	};
	
	var TASK = /*#__PURE__*/exports.TASK = sym('TASK');
	var HELPER = /*#__PURE__*/exports.HELPER = sym('HELPER');
	var MATCH = /*#__PURE__*/exports.MATCH = sym('MATCH');
	var CANCEL = /*#__PURE__*/exports.CANCEL = sym('CANCEL_PROMISE');
	var SAGA_ACTION = /*#__PURE__*/exports.SAGA_ACTION = sym('SAGA_ACTION');
	var SELF_CANCELLATION = /*#__PURE__*/exports.SELF_CANCELLATION = sym('SELF_CANCELLATION');
	var konst = exports.konst = function konst(v) {
	  return function () {
	    return v;
	  };
	};
	var kTrue = /*#__PURE__*/exports.kTrue = konst(true);
	var kFalse = /*#__PURE__*/exports.kFalse = konst(false);
	var noop = exports.noop = function noop() {};
	var ident = exports.ident = function ident(v) {
	  return v;
	};
	
	function check(value, predicate, error) {
	  if (!predicate(value)) {
	    log('error', 'uncaught at check', error);
	    throw new Error(error);
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(object, property) {
	  return is.notUndef(object) && hasOwnProperty.call(object, property);
	}
	
	var is = exports.is = {
	  undef: function undef(v) {
	    return v === null || v === undefined;
	  },
	  notUndef: function notUndef(v) {
	    return v !== null && v !== undefined;
	  },
	  func: function func(f) {
	    return typeof f === 'function';
	  },
	  number: function number(n) {
	    return typeof n === 'number';
	  },
	  string: function string(s) {
	    return typeof s === 'string';
	  },
	  array: Array.isArray,
	  object: function object(obj) {
	    return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	  },
	  promise: function promise(p) {
	    return p && is.func(p.then);
	  },
	  iterator: function iterator(it) {
	    return it && is.func(it.next) && is.func(it.throw);
	  },
	  iterable: function iterable(it) {
	    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
	  },
	  task: function task(t) {
	    return t && t[TASK];
	  },
	  observable: function observable(ob) {
	    return ob && is.func(ob.subscribe);
	  },
	  buffer: function buffer(buf) {
	    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
	  },
	  pattern: function pattern(pat) {
	    return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
	  },
	  channel: function channel(ch) {
	    return ch && is.func(ch.take) && is.func(ch.close);
	  },
	  helper: function helper(it) {
	    return it && it[HELPER];
	  },
	  stringableFunc: function stringableFunc(f) {
	    return is.func(f) && hasOwn(f, 'toString');
	  }
	};
	
	var object = exports.object = {
	  assign: function assign(target, source) {
	    for (var i in source) {
	      if (hasOwn(source, i)) {
	        target[i] = source[i];
	      }
	    }
	  }
	};
	
	function remove(array, item) {
	  var index = array.indexOf(item);
	  if (index >= 0) {
	    array.splice(index, 1);
	  }
	}
	
	var array = exports.array = {
	  from: function from(obj) {
	    var arr = Array(obj.length);
	    for (var i in obj) {
	      if (hasOwn(obj, i)) {
	        arr[i] = obj[i];
	      }
	    }
	    return arr;
	  }
	};
	
	function deferred() {
	  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var def = _extends({}, props);
	  var promise = new Promise(function (resolve, reject) {
	    def.resolve = resolve;
	    def.reject = reject;
	  });
	  def.promise = promise;
	  return def;
	}
	
	function arrayOfDeffered(length) {
	  var arr = [];
	  for (var i = 0; i < length; i++) {
	    arr.push(deferred());
	  }
	  return arr;
	}
	
	function delay(ms) {
	  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	  var timeoutId = void 0;
	  var promise = new Promise(function (resolve) {
	    timeoutId = setTimeout(function () {
	      return resolve(val);
	    }, ms);
	  });
	
	  promise[CANCEL] = function () {
	    return clearTimeout(timeoutId);
	  };
	
	  return promise;
	}
	
	function createMockTask() {
	  var _ref;
	
	  var running = true;
	  var _result = void 0,
	      _error = void 0;
	
	  return _ref = {}, _ref[TASK] = true, _ref.isRunning = function isRunning() {
	    return running;
	  }, _ref.result = function result() {
	    return _result;
	  }, _ref.error = function error() {
	    return _error;
	  }, _ref.setRunning = function setRunning(b) {
	    return running = b;
	  }, _ref.setResult = function setResult(r) {
	    return _result = r;
	  }, _ref.setError = function setError(e) {
	    return _error = e;
	  }, _ref;
	}
	
	function autoInc() {
	  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	  return function () {
	    return ++seed;
	  };
	}
	
	var uid = /*#__PURE__*/exports.uid = autoInc();
	
	var kThrow = function kThrow(err) {
	  throw err;
	};
	var kReturn = function kReturn(value) {
	  return { value: value, done: true };
	};
	function makeIterator(next) {
	  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
	  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var isHelper = arguments[3];
	
	  var iterator = { name: name, next: next, throw: thro, return: kReturn };
	
	  if (isHelper) {
	    iterator[HELPER] = true;
	  }
	  if (typeof Symbol !== 'undefined') {
	    iterator[Symbol.iterator] = function () {
	      return iterator;
	    };
	  }
	  return iterator;
	}
	
	/**
	  Print error in a useful way whether in a browser environment
	  (with expandable error stack traces), or in a node.js environment
	  (text-only log output)
	 **/
	function log(level, message) {
	  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	
	  /*eslint-disable no-console*/
	  if (typeof window === 'undefined') {
	    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
	  } else {
	    console[level](message, error);
	  }
	}
	
	function deprecate(fn, deprecationWarning) {
	  return function () {
	    if (false) log('warn', deprecationWarning);
	    return fn.apply(undefined, arguments);
	  };
	}
	
	var updateIncentive = exports.updateIncentive = function updateIncentive(deprecated, preferred) {
	  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
	};
	
	var internalErr = exports.internalErr = function internalErr(err) {
	  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
	};
	
	var createSetContextWarning = exports.createSetContextWarning = function createSetContextWarning(ctx, props) {
	  return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
	};
	
	var wrapSagaDispatch = exports.wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
	  return function (action) {
	    return dispatch(Object.defineProperty(action, SAGA_ACTION, { value: true }));
	  };
	};
	
	var cloneableGenerator = exports.cloneableGenerator = function cloneableGenerator(generatorFunc) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var history = [];
	    var gen = generatorFunc.apply(undefined, args);
	    return {
	      next: function next(arg) {
	        history.push(arg);
	        return gen.next(arg);
	      },
	      clone: function clone() {
	        var clonedGen = cloneableGenerator(generatorFunc).apply(undefined, args);
	        history.forEach(function (arg) {
	          return clonedGen.next(arg);
	        });
	        return clonedGen;
	      },
	      return: function _return(value) {
	        return gen.return(value);
	      },
	      throw: function _throw(exception) {
	        return gen.throw(exception);
	      }
	    };
	  };
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _SvgIcon = __webpack_require__(161);
	
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SvgIcon).default;
	  }
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _toCss = __webpack_require__(47);
	
	var _toCss2 = _interopRequireDefault(_toCss);
	
	var _toCssValue = __webpack_require__(27);
	
	var _toCssValue2 = _interopRequireDefault(_toCssValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StyleRule = function () {
	  function StyleRule(key, style, options) {
	    _classCallCheck(this, StyleRule);
	
	    this.type = 'style';
	    this.isProcessed = false;
	    var sheet = options.sheet,
	        Renderer = options.Renderer,
	        selector = options.selector;
	
	    this.key = key;
	    this.options = options;
	    this.style = style;
	    if (selector) this.selectorText = selector;
	    this.renderer = sheet ? sheet.renderer : new Renderer();
	  }
	
	  /**
	   * Set selector string.
	   * Attention: use this with caution. Most browsers didn't implement
	   * selectorText setter, so this may result in rerendering of entire Style Sheet.
	   */
	
	
	  _createClass(StyleRule, [{
	    key: 'prop',
	
	
	    /**
	     * Get or set a style property.
	     */
	    value: function prop(name, value) {
	      // It's a getter.
	      if (value === undefined) return this.style[name];
	
	      // Don't do anything if the value has not changed.
	      if (this.style[name] === value) return this;
	
	      value = this.options.jss.plugins.onChangeValue(value, name, this);
	
	      var isEmpty = value == null || value === false;
	      var isDefined = name in this.style;
	
	      // Value is empty and wasn't defined before.
	      if (isEmpty && !isDefined) return this;
	
	      // We are going to remove this value.
	      var remove = isEmpty && isDefined;
	
	      if (remove) delete this.style[name];else this.style[name] = value;
	
	      // Renderable is defined if StyleSheet option `link` is true.
	      if (this.renderable) {
	        if (remove) this.renderer.removeProperty(this.renderable, name);else this.renderer.setProperty(this.renderable, name, value);
	        return this;
	      }
	
	      var sheet = this.options.sheet;
	
	      if (sheet && sheet.attached) {
	        (0, _warning2['default'])(false, 'Rule is not linked. Missing sheet option "link: true".');
	      }
	      return this;
	    }
	
	    /**
	     * Apply rule to an element inline.
	     */
	
	  }, {
	    key: 'applyTo',
	    value: function applyTo(renderable) {
	      var json = this.toJSON();
	      for (var prop in json) {
	        this.renderer.setProperty(renderable, prop, json[prop]);
	      }return this;
	    }
	
	    /**
	     * Returns JSON representation of the rule.
	     * Fallbacks are not supported.
	     * Useful for inline styles.
	     */
	
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var json = {};
	      for (var prop in this.style) {
	        var value = this.style[prop];
	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = (0, _toCssValue2['default'])(value);
	      }
	      return json;
	    }
	
	    /**
	     * Generates a CSS string.
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString(options) {
	      var sheet = this.options.sheet;
	
	      var link = sheet ? sheet.options.link : false;
	      var opts = link ? _extends({}, options, { allowEmpty: true }) : options;
	      return (0, _toCss2['default'])(this.selector, this.style, opts);
	    }
	  }, {
	    key: 'selector',
	    set: function set(selector) {
	      if (selector === this.selectorText) return;
	
	      this.selectorText = selector;
	
	      if (!this.renderable) return;
	
	      var hasChanged = this.renderer.setSelector(this.renderable, selector);
	
	      // If selector setter is not implemented, rerender the rule.
	      if (!hasChanged && this.renderable) {
	        var renderable = this.renderer.replaceRule(this.renderable, this);
	        if (renderable) this.renderable = renderable;
	      }
	    }
	
	    /**
	     * Get selector string.
	     */
	    ,
	    get: function get() {
	      return this.selectorText;
	    }
	  }]);
	
	  return StyleRule;
	}();
	
	exports['default'] = StyleRule;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _createRule = __webpack_require__(26);
	
	var _createRule2 = _interopRequireDefault(_createRule);
	
	var _linkRule = __webpack_require__(67);
	
	var _linkRule2 = _interopRequireDefault(_linkRule);
	
	var _StyleRule = __webpack_require__(19);
	
	var _StyleRule2 = _interopRequireDefault(_StyleRule);
	
	var _escape = __webpack_require__(145);
	
	var _escape2 = _interopRequireDefault(_escape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Contains rules objects and allows adding/removing etc.
	 * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
	 */
	var RuleList = function () {
	
	  // Original styles object.
	  function RuleList(options) {
	    _classCallCheck(this, RuleList);
	
	    this.map = {};
	    this.raw = {};
	    this.index = [];
	
	    this.options = options;
	    this.classes = options.classes;
	  }
	
	  /**
	   * Create and register rule.
	   *
	   * Will not render after Style Sheet was rendered the first time.
	   */
	
	
	  // Used to ensure correct rules order.
	
	  // Rules registry for access by .get() method.
	  // It contains the same rule registered by name and by selector.
	
	
	  _createClass(RuleList, [{
	    key: 'add',
	    value: function add(name, decl, options) {
	      var _options = this.options,
	          parent = _options.parent,
	          sheet = _options.sheet,
	          jss = _options.jss,
	          Renderer = _options.Renderer,
	          generateClassName = _options.generateClassName;
	
	
	      options = _extends({
	        classes: this.classes,
	        parent: parent,
	        sheet: sheet,
	        jss: jss,
	        Renderer: Renderer,
	        generateClassName: generateClassName
	      }, options);
	
	      if (!options.selector && this.classes[name]) {
	        options.selector = '.' + (0, _escape2['default'])(this.classes[name]);
	      }
	
	      this.raw[name] = decl;
	
	      var rule = (0, _createRule2['default'])(name, decl, options);
	
	      var className = void 0;
	
	      if (!options.selector && rule instanceof _StyleRule2['default']) {
	        className = generateClassName(rule, sheet);
	        rule.selector = '.' + (0, _escape2['default'])(className);
	      }
	
	      this.register(rule, className);
	
	      var index = options.index === undefined ? this.index.length : options.index;
	      this.index.splice(index, 0, rule);
	
	      return rule;
	    }
	
	    /**
	     * Get a rule.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(name) {
	      return this.map[name];
	    }
	
	    /**
	     * Delete a rule.
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(rule) {
	      this.unregister(rule);
	      this.index.splice(this.indexOf(rule), 1);
	    }
	
	    /**
	     * Get index of a rule.
	     */
	
	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.index.indexOf(rule);
	    }
	
	    /**
	     * Run `onProcessRule()` plugins on every rule.
	     */
	
	  }, {
	    key: 'process',
	    value: function process() {
	      var plugins = this.options.jss.plugins;
	      // We need to clone array because if we modify the index somewhere else during a loop
	      // we end up with very hard-to-track-down side effects.
	
	      this.index.slice(0).forEach(plugins.onProcessRule, plugins);
	    }
	
	    /**
	     * Register a rule in `.map` and `.classes` maps.
	     */
	
	  }, {
	    key: 'register',
	    value: function register(rule, className) {
	      this.map[rule.key] = rule;
	      if (rule instanceof _StyleRule2['default']) {
	        this.map[rule.selector] = rule;
	        if (className) this.classes[rule.key] = className;
	      }
	    }
	
	    /**
	     * Unregister a rule.
	     */
	
	  }, {
	    key: 'unregister',
	    value: function unregister(rule) {
	      delete this.map[rule.key];
	      if (rule instanceof _StyleRule2['default']) {
	        delete this.map[rule.selector];
	        delete this.classes[rule.key];
	      }
	    }
	
	    /**
	     * Update the function values with a new data.
	     */
	
	  }, {
	    key: 'update',
	    value: function update(name, data) {
	      var _options2 = this.options,
	          plugins = _options2.jss.plugins,
	          sheet = _options2.sheet;
	
	      if (typeof name === 'string') {
	        plugins.onUpdate(data, this.get(name), sheet);
	        return;
	      }
	
	      for (var index = 0; index < this.index.length; index++) {
	        plugins.onUpdate(name, this.index[index], sheet);
	      }
	    }
	
	    /**
	     * Link renderable rules with CSSRuleList.
	     */
	
	  }, {
	    key: 'link',
	    value: function link(cssRules) {
	      var map = this.options.sheet.renderer.getUnescapedKeysMap(this.index);
	
	      for (var i = 0; i < cssRules.length; i++) {
	        var cssRule = cssRules[i];
	        var _key = this.options.sheet.renderer.getKey(cssRule);
	        if (map[_key]) _key = map[_key];
	        var rule = this.map[_key];
	        if (rule) (0, _linkRule2['default'])(rule, cssRule);
	      }
	    }
	
	    /**
	     * Convert rules to a CSS string.
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString(options) {
	      var str = '';
	      var sheet = this.options.sheet;
	
	      var link = sheet ? sheet.options.link : false;
	
	      for (var index = 0; index < this.index.length; index++) {
	        var rule = this.index[index];
	        var css = rule.toString(options);
	
	        // No need to render an empty rule.
	        if (!css && !link) continue;
	
	        if (str) str += '\n';
	        str += css;
	      }
	
	      return str;
	    }
	  }]);
	
	  return RuleList;
	}();
	
	exports['default'] = RuleList;

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.asEffect = exports.takem = exports.detach = undefined;
	exports.take = take;
	exports.put = put;
	exports.all = all;
	exports.race = race;
	exports.call = call;
	exports.apply = apply;
	exports.cps = cps;
	exports.fork = fork;
	exports.spawn = spawn;
	exports.join = join;
	exports.cancel = cancel;
	exports.select = select;
	exports.actionChannel = actionChannel;
	exports.cancelled = cancelled;
	exports.flush = flush;
	exports.getContext = getContext;
	exports.setContext = setContext;
	exports.takeEvery = takeEvery;
	exports.takeLatest = takeLatest;
	exports.throttle = throttle;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	var _sagaHelpers = /*#__PURE__*/__webpack_require__(191);
	
	var IO = /*#__PURE__*/(0, _utils.sym)('IO');
	var TAKE = 'TAKE';
	var PUT = 'PUT';
	var ALL = 'ALL';
	var RACE = 'RACE';
	var CALL = 'CALL';
	var CPS = 'CPS';
	var FORK = 'FORK';
	var JOIN = 'JOIN';
	var CANCEL = 'CANCEL';
	var SELECT = 'SELECT';
	var ACTION_CHANNEL = 'ACTION_CHANNEL';
	var CANCELLED = 'CANCELLED';
	var FLUSH = 'FLUSH';
	var GET_CONTEXT = 'GET_CONTEXT';
	var SET_CONTEXT = 'SET_CONTEXT';
	
	var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';
	
	var effect = function effect(type, payload) {
	  var _ref;
	
	  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
	};
	
	var detach = exports.detach = function detach(eff) {
	  (0, _utils.check)(asEffect.fork(eff), _utils.is.object, 'detach(eff): argument must be a fork effect');
	  eff[FORK].detached = true;
	  return eff;
	};
	
	function take() {
	  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
	
	  if (arguments.length) {
	    (0, _utils.check)(arguments[0], _utils.is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
	  }
	  if (_utils.is.pattern(patternOrChannel)) {
	    return effect(TAKE, { pattern: patternOrChannel });
	  }
	  if (_utils.is.channel(patternOrChannel)) {
	    return effect(TAKE, { channel: patternOrChannel });
	  }
	  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
	}
	
	take.maybe = function () {
	  var eff = take.apply(undefined, arguments);
	  eff[TAKE].maybe = true;
	  return eff;
	};
	
	var takem = /*#__PURE__*/exports.takem = (0, _utils.deprecate)(take.maybe, /*#__PURE__*/(0, _utils.updateIncentive)('takem', 'take.maybe'));
	
	function put(channel, action) {
	  if (arguments.length > 1) {
	    (0, _utils.check)(channel, _utils.is.notUndef, 'put(channel, action): argument channel is undefined');
	    (0, _utils.check)(channel, _utils.is.channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
	    (0, _utils.check)(action, _utils.is.notUndef, 'put(channel, action): argument action is undefined');
	  } else {
	    (0, _utils.check)(channel, _utils.is.notUndef, 'put(action): argument action is undefined');
	    action = channel;
	    channel = null;
	  }
	  return effect(PUT, { channel: channel, action: action });
	}
	
	put.resolve = function () {
	  var eff = put.apply(undefined, arguments);
	  eff[PUT].resolve = true;
	  return eff;
	};
	
	put.sync = /*#__PURE__*/(0, _utils.deprecate)(put.resolve, /*#__PURE__*/(0, _utils.updateIncentive)('put.sync', 'put.resolve'));
	
	function all(effects) {
	  return effect(ALL, effects);
	}
	
	function race(effects) {
	  return effect(RACE, effects);
	}
	
	function getFnCallDesc(meth, fn, args) {
	  (0, _utils.check)(fn, _utils.is.notUndef, meth + ': argument fn is undefined');
	
	  var context = null;
	  if (_utils.is.array(fn)) {
	    var _fn = fn;
	    context = _fn[0];
	    fn = _fn[1];
	  } else if (fn.fn) {
	    var _fn2 = fn;
	    context = _fn2.context;
	    fn = _fn2.fn;
	  }
	  if (context && _utils.is.string(fn) && _utils.is.func(context[fn])) {
	    fn = context[fn];
	  }
	  (0, _utils.check)(fn, _utils.is.func, meth + ': argument ' + fn + ' is not a function');
	
	  return { context: context, fn: fn, args: args };
	}
	
	function call(fn) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return effect(CALL, getFnCallDesc('call', fn, args));
	}
	
	function apply(context, fn) {
	  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	
	  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
	}
	
	function cps(fn) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }
	
	  return effect(CPS, getFnCallDesc('cps', fn, args));
	}
	
	function fork(fn) {
	  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    args[_key3 - 1] = arguments[_key3];
	  }
	
	  return effect(FORK, getFnCallDesc('fork', fn, args));
	}
	
	function spawn(fn) {
	  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    args[_key4 - 1] = arguments[_key4];
	  }
	
	  return detach(fork.apply(undefined, [fn].concat(args)));
	}
	
	function join() {
	  for (var _len5 = arguments.length, tasks = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    tasks[_key5] = arguments[_key5];
	  }
	
	  if (tasks.length > 1) {
	    return all(tasks.map(function (t) {
	      return join(t);
	    }));
	  }
	  var task = tasks[0];
	  (0, _utils.check)(task, _utils.is.notUndef, 'join(task): argument task is undefined');
	  (0, _utils.check)(task, _utils.is.task, 'join(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
	  return effect(JOIN, task);
	}
	
	function cancel() {
	  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    tasks[_key6] = arguments[_key6];
	  }
	
	  if (tasks.length > 1) {
	    return all(tasks.map(function (t) {
	      return cancel(t);
	    }));
	  }
	  var task = tasks[0];
	  if (tasks.length === 1) {
	    (0, _utils.check)(task, _utils.is.notUndef, 'cancel(task): argument task is undefined');
	    (0, _utils.check)(task, _utils.is.task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
	  }
	  return effect(CANCEL, task || _utils.SELF_CANCELLATION);
	}
	
	function select(selector) {
	  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	    args[_key7 - 1] = arguments[_key7];
	  }
	
	  if (arguments.length === 0) {
	    selector = _utils.ident;
	  } else {
	    (0, _utils.check)(selector, _utils.is.notUndef, 'select(selector,[...]): argument selector is undefined');
	    (0, _utils.check)(selector, _utils.is.func, 'select(selector,[...]): argument ' + selector + ' is not a function');
	  }
	  return effect(SELECT, { selector: selector, args: args });
	}
	
	/**
	  channel(pattern, [buffer])    => creates an event channel for store actions
	**/
	function actionChannel(pattern, buffer) {
	  (0, _utils.check)(pattern, _utils.is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
	  if (arguments.length > 1) {
	    (0, _utils.check)(buffer, _utils.is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
	    (0, _utils.check)(buffer, _utils.is.buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
	  }
	  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
	}
	
	function cancelled() {
	  return effect(CANCELLED, {});
	}
	
	function flush(channel) {
	  (0, _utils.check)(channel, _utils.is.channel, 'flush(channel): argument ' + channel + ' is not valid channel');
	  return effect(FLUSH, channel);
	}
	
	function getContext(prop) {
	  (0, _utils.check)(prop, _utils.is.string, 'getContext(prop): argument ' + prop + ' is not a string');
	  return effect(GET_CONTEXT, prop);
	}
	
	function setContext(props) {
	  (0, _utils.check)(props, _utils.is.object, (0, _utils.createSetContextWarning)(null, props));
	  return effect(SET_CONTEXT, props);
	}
	
	function takeEvery(patternOrChannel, worker) {
	  for (var _len8 = arguments.length, args = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
	    args[_key8 - 2] = arguments[_key8];
	  }
	
	  return fork.apply(undefined, [_sagaHelpers.takeEveryHelper, patternOrChannel, worker].concat(args));
	}
	
	function takeLatest(patternOrChannel, worker) {
	  for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
	    args[_key9 - 2] = arguments[_key9];
	  }
	
	  return fork.apply(undefined, [_sagaHelpers.takeLatestHelper, patternOrChannel, worker].concat(args));
	}
	
	function throttle(ms, pattern, worker) {
	  for (var _len10 = arguments.length, args = Array(_len10 > 3 ? _len10 - 3 : 0), _key10 = 3; _key10 < _len10; _key10++) {
	    args[_key10 - 3] = arguments[_key10];
	  }
	
	  return fork.apply(undefined, [_sagaHelpers.throttleHelper, ms, pattern, worker].concat(args));
	}
	
	var createAsEffectType = function createAsEffectType(type) {
	  return function (effect) {
	    return effect && effect[IO] && effect[type];
	  };
	};
	
	var asEffect = exports.asEffect = {
	  take: /*#__PURE__*/createAsEffectType(TAKE),
	  put: /*#__PURE__*/createAsEffectType(PUT),
	  all: /*#__PURE__*/createAsEffectType(ALL),
	  race: /*#__PURE__*/createAsEffectType(RACE),
	  call: /*#__PURE__*/createAsEffectType(CALL),
	  cps: /*#__PURE__*/createAsEffectType(CPS),
	  fork: /*#__PURE__*/createAsEffectType(FORK),
	  join: /*#__PURE__*/createAsEffectType(JOIN),
	  cancel: /*#__PURE__*/createAsEffectType(CANCEL),
	  select: /*#__PURE__*/createAsEffectType(SELECT),
	  actionChannel: /*#__PURE__*/createAsEffectType(ACTION_CHANNEL),
	  cancelled: /*#__PURE__*/createAsEffectType(CANCELLED),
	  flush: /*#__PURE__*/createAsEffectType(FLUSH),
	  getContext: /*#__PURE__*/createAsEffectType(GET_CONTEXT),
	  setContext: /*#__PURE__*/createAsEffectType(SET_CONTEXT)
	};

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.deepmerge = factory());
	}(this, (function () { 'use strict';
	
	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};
	
	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}
	
	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);
	
		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}
	
	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
	
	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}
	
	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}
	
	function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
		var clone = !optionsArgument || optionsArgument.clone !== false;
	
		return (clone && isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, optionsArgument)
			: value
	}
	
	function defaultArrayMerge(target, source, optionsArgument) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, optionsArgument)
		})
	}
	
	function mergeObject(target, source, optionsArgument) {
		var destination = {};
		if (isMergeableObject(target)) {
			Object.keys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
			});
		}
		Object.keys(source).forEach(function(key) {
			if (!isMergeableObject(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
			} else {
				destination[key] = deepmerge(target[key], source[key], optionsArgument);
			}
		});
		return destination
	}
	
	function deepmerge(target, source, optionsArgument) {
		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var options = optionsArgument || { arrayMerge: defaultArrayMerge };
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
	
		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, optionsArgument)
		} else if (sourceIsArray) {
			var arrayMerge = options.arrayMerge || defaultArrayMerge;
			return arrayMerge(target, source, optionsArgument)
		} else {
			return mergeObject(target, source, optionsArgument)
		}
	}
	
	deepmerge.all = function deepmergeAll(array, optionsArgument) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}
	
		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, optionsArgument)
		}, {})
	};
	
	var deepmerge_1 = deepmerge;
	
	return deepmerge_1;
	
	})));


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var isBrowser = exports.isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;
	
	exports.default = isBrowser;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = createRule;
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _StyleRule = __webpack_require__(19);
	
	var _StyleRule2 = _interopRequireDefault(_StyleRule);
	
	var _cloneStyle = __webpack_require__(144);
	
	var _cloneStyle2 = _interopRequireDefault(_cloneStyle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Create a rule instance.
	 */
	function createRule() {
	  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'unnamed';
	  var decl = arguments[1];
	  var options = arguments[2];
	  var jss = options.jss;
	
	  var declCopy = (0, _cloneStyle2['default'])(decl);
	
	  var rule = jss.plugins.onCreateRule(name, declCopy, options);
	  if (rule) return rule;
	
	  // It is an at-rule and it has no instance.
	  if (name[0] === '@') {
	    (0, _warning2['default'])(false, '[JSS] Unknown at-rule %s', name);
	  }
	
	  return new _StyleRule2['default'](name, declCopy, options);
	}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = toCssValue;
	var join = function join(value, by) {
	  var result = '';
	  for (var i = 0; i < value.length; i++) {
	    // Remove !important from the value, it will be readded later.
	    if (value[i] === '!important') break;
	    if (result) result += by;
	    result += value[i];
	  }
	  return result;
	};
	
	/**
	 * Converts array values to string.
	 *
	 * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
	 * `border: ['1px', '2px']` > `border: 1px, 2px;`
	 * `margin: [['5px', '10px'], '!important']` > `margin: 5px 10px !important;`
	 * `color: ['red', !important]` > `color: red !important;`
	 */
	function toCssValue(value) {
	  var ignoreImportant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  if (!Array.isArray(value)) return value;
	
	  var cssValue = '';
	
	  // Support space separated values via `[['5px', '10px']]`.
	  if (Array.isArray(value[0])) {
	    for (var i = 0; i < value.length; i++) {
	      if (value[i] === '!important') break;
	      if (cssValue) cssValue += ', ';
	      cssValue += join(value[i], ' ');
	    }
	  } else cssValue = join(value, ', ');
	
	  // Add !important, because it was ignored.
	  if (!ignoreImportant && value[value.length - 1] === '!important') {
	    cssValue += ' !important';
	  }
	
	  return cssValue;
	}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ButtonBase = __webpack_require__(153);
	
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ButtonBase).default;
	  }
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createGenerateClassName = __webpack_require__(69);
	
	Object.defineProperty(exports, 'createGenerateClassName', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_createGenerateClassName).default;
	  }
	});
	
	var _createMuiTheme = __webpack_require__(48);
	
	Object.defineProperty(exports, 'createMuiTheme', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_createMuiTheme).default;
	  }
	});
	
	var _jssPreset = __webpack_require__(70);
	
	Object.defineProperty(exports, 'jssPreset', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_jssPreset).default;
	  }
	});
	
	var _MuiThemeProvider = __webpack_require__(165);
	
	Object.defineProperty(exports, 'MuiThemeProvider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_MuiThemeProvider).default;
	  }
	});
	
	var _withStyles = __webpack_require__(5);
	
	Object.defineProperty(exports, 'withStyles', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_withStyles).default;
	  }
	});
	
	var _withTheme = __webpack_require__(56);
	
	Object.defineProperty(exports, 'withTheme', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_withTheme).default;
	  }
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _shouldUpdate = __webpack_require__(282);
	
	var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);
	
	var _shallowEqual = __webpack_require__(281);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _setDisplayName = __webpack_require__(188);
	
	var _setDisplayName2 = _interopRequireDefault(_setDisplayName);
	
	var _wrapDisplayName = __webpack_require__(36);
	
	var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pure = function pure(BaseComponent) {
	  var hoc = (0, _shouldUpdate2.default)(function (props, nextProps) {
	    return !(0, _shallowEqual2.default)(props, nextProps);
	  });
	
	  if (false) {
	    return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'pure'))(hoc(BaseComponent));
	  }
	
	  return hoc(BaseComponent);
	};
	
	exports.default = pure;

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Typography = __webpack_require__(162);
	
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Typography).default;
	  }
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertHexToRGB = convertHexToRGB;
	exports.decomposeColor = decomposeColor;
	exports.recomposeColor = recomposeColor;
	exports.getContrastRatio = getContrastRatio;
	exports.getLuminance = getLuminance;
	exports.emphasize = emphasize;
	exports.fade = fade;
	exports.darken = darken;
	exports.lighten = lighten;
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Returns a number whose value is limited to the given range.
	 *
	 * @param {number} value The value to be clamped
	 * @param {number} min The lower boundary of the output range
	 * @param {number} max The upper boundary of the output range
	 * @returns {number} A number in the range [min, max]
	 */
	function clamp(value) {
	  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
	   false ? (0, _warning2.default)(value >= min && value <= max, 'Material-UI: the value provided ' + value + ' is out of range [' + min + ', ' + max + '].') : void 0;
	
	  if (value < min) {
	    return min;
	  }
	  if (value > max) {
	    return max;
	  }
	  return value;
	}
	
	/**
	 * Converts a color from CSS hex format to CSS rgb format.
	 *
	 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
	 *  @returns {string} A CSS rgb color string
	 */
	//  weak
	/* eslint-disable no-use-before-define */
	
	function convertHexToRGB(color) {
	  color = color.substr(1);
	
	  var re = new RegExp('.{1,' + color.length / 3 + '}', 'g');
	  var colors = color.match(re);
	
	  if (colors && colors[0].length === 1) {
	    colors = colors.map(function (n) {
	      return n + n;
	    });
	  }
	
	  return colors ? 'rgb(' + colors.map(function (n) {
	    return parseInt(n, 16);
	  }).join(', ') + ')' : '';
	}
	
	/**
	 * Returns an object with the type and values of a color.
	 *
	 * Note: Does not support rgb % values.
	 *
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @returns {object} - A MUI color object: {type: string, values: number[]}
	 */
	function decomposeColor(color) {
	  if (color.charAt(0) === '#') {
	    return decomposeColor(convertHexToRGB(color));
	  }
	
	  var marker = color.indexOf('(');
	  var type = color.substring(0, marker);
	  var values = color.substring(marker + 1, color.length - 1).split(',');
	  values = values.map(function (value) {
	    return parseFloat(value);
	  });
	
	  return { type: type, values: values };
	}
	
	/**
	 * Converts a color object with type and values to a string.
	 *
	 * @param {object} color - Decomposed color
	 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla'
	 * @param {array} color.values - [n,n,n] or [n,n,n,n]
	 * @returns {string} A CSS color string
	 */
	function recomposeColor(color) {
	  var type = color.type;
	  var values = color.values;
	
	
	  if (type.indexOf('rgb') > -1) {
	    // Only convert the first 3 values to int (i.e. not alpha)
	    values = values.map(function (n, i) {
	      return i < 3 ? parseInt(n, 10) : n;
	    });
	  }
	
	  if (type.indexOf('hsl') > -1) {
	    values[1] = values[1] + '%';
	    values[2] = values[2] + '%';
	  }
	
	  return color.type + '(' + values.join(', ') + ')';
	}
	
	/**
	 * Calculates the contrast ratio between two colors.
	 *
	 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
	 *
	 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @returns {number} A contrast ratio value in the range 0 - 21.
	 */
	function getContrastRatio(foreground, background) {
	  var lumA = getLuminance(foreground);
	  var lumB = getLuminance(background);
	  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
	}
	
	/**
	 * The relative brightness of any point in a color space,
	 * normalized to 0 for darkest black and 1 for lightest white.
	 *
	 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
	 *
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @returns {number} The relative brightness of the color in the range 0 - 1
	 */
	function getLuminance(color) {
	  var decomposedColor = decomposeColor(color);
	
	  if (decomposedColor.type.indexOf('rgb') > -1) {
	    var rgb = decomposedColor.values.map(function (val) {
	      val /= 255; // normalized
	      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
	    });
	    // Truncate at 3 digits
	    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
	  } else if (decomposedColor.type.indexOf('hsl') > -1) {
	    return decomposedColor.values[2] / 100;
	  }
	
	  throw new Error('Material-UI: unsupported `' + color + '` color.');
	}
	
	/**
	 * Darken or lighten a colour, depending on its luminance.
	 * Light colors are darkened, dark colors are lightened.
	 *
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function emphasize(color) {
	  var coefficient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.15;
	
	  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
	}
	
	/**
	 * Set the absolute transparency of a color.
	 * Any existing alpha values are overwritten.
	 *
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @param {number} value - value to set the alpha channel to in the range 0 -1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function fade(color, value) {
	   false ? (0, _warning2.default)(color, 'Material-UI: missing color argument in fade(' + color + ', ' + value + ').') : void 0;
	
	  if (!color) return color;
	
	  color = decomposeColor(color);
	  value = clamp(value);
	
	  if (color.type === 'rgb' || color.type === 'hsl') {
	    color.type += 'a';
	  }
	  color.values[3] = value;
	
	  return recomposeColor(color);
	}
	
	/**
	 * Darkens a color.
	 *
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @param {number} coefficient - multiplier in the range 0 - 1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function darken(color, coefficient) {
	   false ? (0, _warning2.default)(color, 'Material-UI: missing color argument in darken(' + color + ', ' + coefficient + ').') : void 0;
	
	  if (!color) return color;
	
	  color = decomposeColor(color);
	  coefficient = clamp(coefficient);
	
	  if (color.type.indexOf('hsl') > -1) {
	    color.values[2] *= 1 - coefficient;
	  } else if (color.type.indexOf('rgb') > -1) {
	    for (var i = 0; i < 3; i += 1) {
	      color.values[i] *= 1 - coefficient;
	    }
	  }
	  return recomposeColor(color);
	}
	
	/**
	 * Lightens a color.
	 *
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @param {number} coefficient - multiplier in the range 0 - 1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function lighten(color, coefficient) {
	   false ? (0, _warning2.default)(color, 'Material-UI: missing color argument in lighten(' + color + ', ' + coefficient + ').') : void 0;
	
	  if (!color) return color;
	
	  color = decomposeColor(color);
	  coefficient = clamp(coefficient);
	
	  if (color.type.indexOf('hsl') > -1) {
	    color.values[2] += (100 - color.values[2]) * coefficient;
	  } else if (color.type.indexOf('rgb') > -1) {
	    for (var i = 0; i < 3; i += 1) {
	      color.values[i] += (255 - color.values[i]) * coefficient;
	    }
	  }
	
	  return recomposeColor(color);
	}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _getDisplayName = __webpack_require__(73);
	
	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
	  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
	};
	
	exports.default = wrapDisplayName;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.UNDEFINED_INPUT_ERROR = exports.INVALID_BUFFER = exports.isEnd = exports.END = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.emitter = emitter;
	exports.channel = channel;
	exports.eventChannel = eventChannel;
	exports.stdChannel = stdChannel;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	var _buffers = /*#__PURE__*/__webpack_require__(61);
	
	var _scheduler = /*#__PURE__*/__webpack_require__(192);
	
	var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
	var END = exports.END = { type: CHANNEL_END_TYPE };
	var isEnd = exports.isEnd = function isEnd(a) {
	  return a && a.type === CHANNEL_END_TYPE;
	};
	
	function emitter() {
	  var subscribers = [];
	
	  function subscribe(sub) {
	    subscribers.push(sub);
	    return function () {
	      return (0, _utils.remove)(subscribers, sub);
	    };
	  }
	
	  function emit(item) {
	    var arr = subscribers.slice();
	    for (var i = 0, len = arr.length; i < len; i++) {
	      arr[i](item);
	    }
	  }
	
	  return {
	    subscribe: subscribe,
	    emit: emit
	  };
	}
	
	var INVALID_BUFFER = exports.INVALID_BUFFER = 'invalid buffer passed to channel factory function';
	var UNDEFINED_INPUT_ERROR = exports.UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';
	
	if (false) {
	  exports.UNDEFINED_INPUT_ERROR = UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
	}
	
	function channel() {
	  var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _buffers.buffers.fixed();
	
	  var closed = false;
	  var takers = [];
	
	  (0, _utils.check)(buffer, _utils.is.buffer, INVALID_BUFFER);
	
	  function checkForbiddenStates() {
	    if (closed && takers.length) {
	      throw (0, _utils.internalErr)('Cannot have a closed channel with pending takers');
	    }
	    if (takers.length && !buffer.isEmpty()) {
	      throw (0, _utils.internalErr)('Cannot have pending takers with non empty buffer');
	    }
	  }
	
	  function put(input) {
	    checkForbiddenStates();
	    (0, _utils.check)(input, _utils.is.notUndef, UNDEFINED_INPUT_ERROR);
	    if (closed) {
	      return;
	    }
	    if (!takers.length) {
	      return buffer.put(input);
	    }
	    for (var i = 0; i < takers.length; i++) {
	      var cb = takers[i];
	      if (!cb[_utils.MATCH] || cb[_utils.MATCH](input)) {
	        takers.splice(i, 1);
	        return cb(input);
	      }
	    }
	  }
	
	  function take(cb) {
	    checkForbiddenStates();
	    (0, _utils.check)(cb, _utils.is.func, "channel.take's callback must be a function");
	
	    if (closed && buffer.isEmpty()) {
	      cb(END);
	    } else if (!buffer.isEmpty()) {
	      cb(buffer.take());
	    } else {
	      takers.push(cb);
	      cb.cancel = function () {
	        return (0, _utils.remove)(takers, cb);
	      };
	    }
	  }
	
	  function flush(cb) {
	    checkForbiddenStates(); // TODO: check if some new state should be forbidden now
	    (0, _utils.check)(cb, _utils.is.func, "channel.flush' callback must be a function");
	    if (closed && buffer.isEmpty()) {
	      cb(END);
	      return;
	    }
	    cb(buffer.flush());
	  }
	
	  function close() {
	    checkForbiddenStates();
	    if (!closed) {
	      closed = true;
	      if (takers.length) {
	        var arr = takers;
	        takers = [];
	        for (var i = 0, len = arr.length; i < len; i++) {
	          arr[i](END);
	        }
	      }
	    }
	  }
	
	  return {
	    take: take,
	    put: put,
	    flush: flush,
	    close: close,
	    get __takers__() {
	      return takers;
	    },
	    get __closed__() {
	      return closed;
	    }
	  };
	}
	
	function eventChannel(subscribe) {
	  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _buffers.buffers.none();
	  var matcher = arguments[2];
	
	  /**
	    should be if(typeof matcher !== undefined) instead?
	    see PR #273 for a background discussion
	  **/
	  if (arguments.length > 2) {
	    (0, _utils.check)(matcher, _utils.is.func, 'Invalid match function passed to eventChannel');
	  }
	
	  var chan = channel(buffer);
	  var close = function close() {
	    if (!chan.__closed__) {
	      if (unsubscribe) {
	        unsubscribe();
	      }
	      chan.close();
	    }
	  };
	  var unsubscribe = subscribe(function (input) {
	    if (isEnd(input)) {
	      close();
	      return;
	    }
	    if (matcher && !matcher(input)) {
	      return;
	    }
	    chan.put(input);
	  });
	  if (chan.__closed__) {
	    unsubscribe();
	  }
	
	  if (!_utils.is.func(unsubscribe)) {
	    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
	  }
	
	  return {
	    take: chan.take,
	    flush: chan.flush,
	    close: close
	  };
	}
	
	function stdChannel(subscribe) {
	  var chan = eventChannel(function (cb) {
	    return subscribe(function (input) {
	      if (input[_utils.SAGA_ACTION]) {
	        cb(input);
	        return;
	      }
	      (0, _scheduler.asap)(function () {
	        return cb(input);
	      });
	    });
	  });
	
	  return _extends({}, chan, {
	    take: function take(cb, matcher) {
	      if (arguments.length > 1) {
	        (0, _utils.check)(matcher, _utils.is.func, "channel.take's matcher argument must be a function");
	        cb[_utils.MATCH] = matcher;
	      }
	      chan.take(cb);
	    }
	  });
	}

/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports) {

	// Source: http://jsfiddle.net/vWx8V/
	// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes
	
	/**
	 * Conenience method returns corresponding value for given keyName or keyCode.
	 *
	 * @param {Mixed} keyCode {Number} or keyName {String}
	 * @return {Mixed}
	 * @api public
	 */
	
	exports = module.exports = function(searchInput) {
	  // Keyboard Events
	  if (searchInput && 'object' === typeof searchInput) {
	    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
	    if (hasKeyCode) searchInput = hasKeyCode
	  }
	
	  // Numbers
	  if ('number' === typeof searchInput) return names[searchInput]
	
	  // Everything else (cast to string)
	  var search = String(searchInput)
	
	  // check codes
	  var foundNamedKey = codes[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // check aliases
	  var foundNamedKey = aliases[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // weird character?
	  if (search.length === 1) return search.charCodeAt(0)
	
	  return undefined
	}
	
	/**
	 * Get by name
	 *
	 *   exports.code['enter'] // => 13
	 */
	
	var codes = exports.code = exports.codes = {
	  'backspace': 8,
	  'tab': 9,
	  'enter': 13,
	  'shift': 16,
	  'ctrl': 17,
	  'alt': 18,
	  'pause/break': 19,
	  'caps lock': 20,
	  'esc': 27,
	  'space': 32,
	  'page up': 33,
	  'page down': 34,
	  'end': 35,
	  'home': 36,
	  'left': 37,
	  'up': 38,
	  'right': 39,
	  'down': 40,
	  'insert': 45,
	  'delete': 46,
	  'command': 91,
	  'left command': 91,
	  'right command': 93,
	  'numpad *': 106,
	  'numpad +': 107,
	  'numpad -': 109,
	  'numpad .': 110,
	  'numpad /': 111,
	  'num lock': 144,
	  'scroll lock': 145,
	  'my computer': 182,
	  'my calculator': 183,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221,
	  "'": 222
	}
	
	// Helper aliases
	
	var aliases = exports.aliases = {
	  'windows': 91,
	  '⇧': 16,
	  '⌥': 18,
	  '⌃': 17,
	  '⌘': 91,
	  'ctl': 17,
	  'control': 17,
	  'option': 18,
	  'pause': 19,
	  'break': 19,
	  'caps': 20,
	  'return': 13,
	  'escape': 27,
	  'spc': 32,
	  'pgup': 33,
	  'pgdn': 34,
	  'ins': 45,
	  'del': 46,
	  'cmd': 91
	}
	
	
	/*!
	 * Programatically add the following
	 */
	
	// lower case chars
	for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32
	
	// numbers
	for (var i = 48; i < 58; i++) codes[i - 48] = i
	
	// function keys
	for (i = 1; i < 13; i++) codes['f'+i] = i + 111
	
	// numpad keys
	for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96
	
	/**
	 * Get by code
	 *
	 *   exports.name[13] // => 'Enter'
	 */
	
	var names = exports.names = exports.title = {} // title for backward compat
	
	// Create reverse mapping
	for (i in codes) names[codes[i]] = i
	
	// Add aliases
	for (var alias in aliases) {
	  codes[alias] = aliases[alias]
	}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isNumber = exports.isString = exports.formatMs = exports.duration = exports.easing = undefined;
	
	var _keys = __webpack_require__(18);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _isNan = __webpack_require__(199);
	
	var _isNan2 = _interopRequireDefault(_isNan);
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
	// to learn the context in which each easing should be used.
	var easing = exports.easing = {
	  // This is the most common easing curve.
	  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
	  // Objects enter the screen at full velocity from off-screen and
	  // slowly decelerate to a resting point.
	  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
	  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
	  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
	  // The sharp curve is used by objects that may return to the screen at any time.
	  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
	};
	
	// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
	// to learn when use what timing
	
	/* eslint-disable no-param-reassign */
	
	var duration = exports.duration = {
	  shortest: 150,
	  shorter: 200,
	  short: 250,
	  // most basic recommended timing
	  standard: 300,
	  // this is to be used in complex animations
	  complex: 375,
	  // recommended when something is entering screen
	  enteringScreen: 225,
	  // recommended when something is leaving screen
	  leavingScreen: 195
	};
	
	var formatMs = exports.formatMs = function formatMs(milliseconds) {
	  return Math.round(milliseconds) + 'ms';
	};
	var isString = exports.isString = function isString(value) {
	  return typeof value === 'string';
	};
	var isNumber = exports.isNumber = function isNumber(value) {
	  return !(0, _isNan2.default)(parseFloat(value));
	};
	
	/**
	 * @param {string|Array} props
	 * @param {object} param
	 * @param {string} param.prop
	 * @param {number} param.duration
	 * @param {string} param.easing
	 * @param {number} param.delay
	 */
	exports.default = {
	  easing: easing,
	  duration: duration,
	  create: function create() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['all'];
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var _options$duration = options.duration,
	        durationOption = _options$duration === undefined ? duration.standard : _options$duration,
	        _options$easing = options.easing,
	        easingOption = _options$easing === undefined ? easing.easeInOut : _options$easing,
	        _options$delay = options.delay,
	        delay = _options$delay === undefined ? 0 : _options$delay,
	        other = (0, _objectWithoutProperties3.default)(options, ['duration', 'easing', 'delay']);
	
	
	     false ? (0, _warning2.default)(isString(props) || Array.isArray(props), 'Material-UI: argument "props" must be a string or Array.') : void 0;
	     false ? (0, _warning2.default)(isNumber(durationOption) || isString(durationOption), 'Material-UI: argument "duration" must be a number or a string but found ' + durationOption + '.') : void 0;
	     false ? (0, _warning2.default)(isString(easingOption), 'Material-UI: argument "easing" must be a string.') : void 0;
	     false ? (0, _warning2.default)(isNumber(delay) || isString(delay), 'Material-UI: argument "delay" must be a number or a string.') : void 0;
	     false ? (0, _warning2.default)((0, _keys2.default)(other).length === 0, 'Material-UI: unrecognized argument(s) [' + (0, _keys2.default)(other).join(',') + ']') : void 0;
	
	    return (Array.isArray(props) ? props : [props]).map(function (animatedProp) {
	      return animatedProp + ' ' + (typeof durationOption === 'string' ? durationOption : formatMs(durationOption)) + ' ' + easingOption + ' ' + (typeof delay === 'string' ? delay : formatMs(delay));
	    }).join(',');
	  },
	  getAutoHeightDuration: function getAutoHeightDuration(height) {
	    if (!height) {
	      return 0;
	    }
	
	    var constant = height / 36;
	
	    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
	    return Math.round((4 + 15 * Math.pow(constant, 0.25) + constant / 5) * 10);
	  }
	};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cloneChildrenWithClassName = cloneChildrenWithClassName;
	exports.isMuiElement = isMuiElement;
	exports.isMuiComponent = isMuiComponent;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable import/prefer-default-export */
	
	function cloneChildrenWithClassName(children, className) {
	  return _react2.default.Children.map(children, function (child) {
	    return _react2.default.isValidElement(child) && _react2.default.cloneElement(child, {
	      className: (0, _classnames2.default)(child.props.className, className)
	    });
	  });
	}
	
	function isMuiElement(element, muiNames) {
	  return _react2.default.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
	}
	
	function isMuiComponent(element, muiNames) {
	  return muiNames.indexOf(element.muiName) !== -1;
	}

/***/ }),
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isInBrowser = __webpack_require__(25);
	
	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var js = ''; /**
	              * Export javascript style and css style vendor prefixes.
	              * Based on "transform" support test.
	              */
	
	var css = '';
	
	// We should not do anything if required serverside.
	if (_isInBrowser2['default']) {
	  // Order matters. We need to check Webkit the last one because
	  // other vendors use to add Webkit prefixes to some properties
	  var jsCssMap = {
	    Moz: '-moz-',
	    // IE did it wrong again ...
	    ms: '-ms-',
	    O: '-o-',
	    Webkit: '-webkit-'
	  };
	  var style = document.createElement('p').style;
	  var testProp = 'Transform';
	
	  for (var key in jsCssMap) {
	    if (key + testProp in style) {
	      js = key;
	      css = jsCssMap[key];
	      break;
	    }
	  }
	}
	
	/**
	 * Vendor prefix string for the current browser.
	 *
	 * @type {{js: String, css: String}}
	 * @api public
	 */
	exports['default'] = { js: js, css: css };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _SheetsRegistry = __webpack_require__(63);
	
	var _SheetsRegistry2 = _interopRequireDefault(_SheetsRegistry);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * This is a global sheets registry. Only DomRenderer will add sheets to it.
	 * On the server one should use an own SheetsRegistry instance and add the
	 * sheets to it, because you need to make sure to create a new registry for
	 * each request in order to not leak sheets across requests.
	 */
	exports['default'] = new _SheetsRegistry2['default']();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = toCss;
	
	var _toCssValue = __webpack_require__(27);
	
	var _toCssValue2 = _interopRequireDefault(_toCssValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Indent a string.
	 * http://jsperf.com/array-join-vs-for
	 */
	function indentStr(str, indent) {
	  var result = '';
	  for (var index = 0; index < indent; index++) {
	    result += '  ';
	  }return result + str;
	}
	
	/**
	 * Converts a Rule to CSS string.
	 */
	
	function toCss(selector, style) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	  var result = '';
	
	  if (!style) return result;
	
	  var _options$indent = options.indent,
	      indent = _options$indent === undefined ? 0 : _options$indent;
	  var fallbacks = style.fallbacks;
	
	
	  indent++;
	
	  // Apply fallbacks first.
	  if (fallbacks) {
	    // Array syntax {fallbacks: [{prop: value}]}
	    if (Array.isArray(fallbacks)) {
	      for (var index = 0; index < fallbacks.length; index++) {
	        var fallback = fallbacks[index];
	        for (var prop in fallback) {
	          var value = fallback[prop];
	          if (value != null) {
	            result += '\n' + indentStr(prop + ': ' + (0, _toCssValue2['default'])(value) + ';', indent);
	          }
	        }
	      }
	    } else {
	      // Object syntax {fallbacks: {prop: value}}
	      for (var _prop in fallbacks) {
	        var _value = fallbacks[_prop];
	        if (_value != null) {
	          result += '\n' + indentStr(_prop + ': ' + (0, _toCssValue2['default'])(_value) + ';', indent);
	        }
	      }
	    }
	  }
	
	  for (var _prop2 in style) {
	    var _value2 = style[_prop2];
	    if (_value2 != null && _prop2 !== 'fallbacks') {
	      result += '\n' + indentStr(_prop2 + ': ' + (0, _toCssValue2['default'])(_value2) + ';', indent);
	    }
	  }
	
	  // Allow empty style in this case, because properties will be added dynamically.
	  if (!result && !options.allowEmpty) return result;
	
	  indent--;
	  result = indentStr(selector + ' {' + result + '\n', indent) + indentStr('}', indent);
	
	  return result;
	}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _deepmerge = __webpack_require__(24);
	
	var _deepmerge2 = _interopRequireDefault(_deepmerge);
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _createTypography = __webpack_require__(168);
	
	var _createTypography2 = _interopRequireDefault(_createTypography);
	
	var _createBreakpoints = __webpack_require__(60);
	
	var _createBreakpoints2 = _interopRequireDefault(_createBreakpoints);
	
	var _createPalette = __webpack_require__(167);
	
	var _createPalette2 = _interopRequireDefault(_createPalette);
	
	var _createMixins = __webpack_require__(166);
	
	var _createMixins2 = _interopRequireDefault(_createMixins);
	
	var _shadows = __webpack_require__(170);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	var _transitions = __webpack_require__(42);
	
	var _transitions2 = _interopRequireDefault(_transitions);
	
	var _zIndex = __webpack_require__(172);
	
	var _zIndex2 = _interopRequireDefault(_zIndex);
	
	var _spacing = __webpack_require__(171);
	
	var _spacing2 = _interopRequireDefault(_spacing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createMuiTheme() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _options$palette = options.palette,
	      paletteInput = _options$palette === undefined ? {} : _options$palette,
	      _options$breakpoints = options.breakpoints,
	      breakpointsInput = _options$breakpoints === undefined ? {} : _options$breakpoints,
	      _options$mixins = options.mixins,
	      mixinsInput = _options$mixins === undefined ? {} : _options$mixins,
	      _options$typography = options.typography,
	      typographyInput = _options$typography === undefined ? {} : _options$typography,
	      shadowsInput = options.shadows,
	      other = (0, _objectWithoutProperties3.default)(options, ['palette', 'breakpoints', 'mixins', 'typography', 'shadows']);
	
	
	  var palette = (0, _createPalette2.default)(paletteInput);
	  var breakpoints = (0, _createBreakpoints2.default)(breakpointsInput);
	
	  var muiTheme = (0, _extends3.default)({
	    direction: 'ltr',
	    palette: palette,
	    typography: (0, _createTypography2.default)(palette, typographyInput),
	    mixins: (0, _createMixins2.default)(breakpoints, _spacing2.default, mixinsInput),
	    breakpoints: breakpoints,
	    shadows: shadowsInput || _shadows2.default
	  }, (0, _deepmerge2.default)({
	    transitions: _transitions2.default,
	    spacing: _spacing2.default,
	    zIndex: _zIndex2.default
	  }, other));
	
	   false ? (0, _warning2.default)(muiTheme.shadows.length === 25, 'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.') : void 0;
	
	  return muiTheme;
	} // < 1kb payload overhead when lodash/merge is > 3kb.
	exports.default = createMuiTheme;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CHANNEL = undefined;
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Same value used by react-jss
	var CHANNEL = exports.CHANNEL = '__THEMING__';
	
	var themeListener = {
	  contextTypes: (0, _defineProperty3.default)({}, CHANNEL, _propTypes2.default.object),
	  initial: function initial(context) {
	    if (!context[CHANNEL]) {
	      return null;
	    }
	
	    return context[CHANNEL].getState();
	  },
	  subscribe: function subscribe(context, cb) {
	    if (!context[CHANNEL]) {
	      return null;
	    }
	
	    return context[CHANNEL].subscribe(cb);
	  },
	  unsubscribe: function unsubscribe(context, subscriptionId) {
	    if (context[CHANNEL]) {
	      context[CHANNEL].unsubscribe(subscriptionId);
	    }
	  }
	};
	
	exports.default = themeListener;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.specialProperty = undefined;
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _keys = __webpack_require__(18);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _extends3 = __webpack_require__(3);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	exports.default = exactProp;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// This module is based on https://github.com/airbnb/prop-types-exact repository.
	// However, in order to reduce the number of dependencies and to remove some extra safe checks
	// the module was forked.
	
	var specialProperty = exports.specialProperty = 'exact-prop: \u200B';
	
	function exactProp(propTypes, componentNameInError) {
	  return (0, _extends4.default)({}, propTypes, (0, _defineProperty3.default)({}, specialProperty, function (props) {
	    var unknownProps = (0, _keys2.default)(props).filter(function (prop) {
	      return !propTypes.hasOwnProperty(prop);
	    });
	    if (unknownProps.length > 0) {
	      return new TypeError(componentNameInError + ': unknown props found: ' + unknownProps.join(', ') + '. Please remove the unknown properties.');
	    }
	    return null;
	  }));
	}

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = exports.createGenerateClassName = exports.sheets = exports.RuleList = exports.SheetsManager = exports.SheetsRegistry = exports.toCssValue = exports.getDynamicStyles = undefined;
	
	var _getDynamicStyles = __webpack_require__(146);
	
	Object.defineProperty(exports, 'getDynamicStyles', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_getDynamicStyles)['default'];
	  }
	});
	
	var _toCssValue = __webpack_require__(27);
	
	Object.defineProperty(exports, 'toCssValue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_toCssValue)['default'];
	  }
	});
	
	var _SheetsRegistry = __webpack_require__(63);
	
	Object.defineProperty(exports, 'SheetsRegistry', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SheetsRegistry)['default'];
	  }
	});
	
	var _SheetsManager = __webpack_require__(133);
	
	Object.defineProperty(exports, 'SheetsManager', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SheetsManager)['default'];
	  }
	});
	
	var _RuleList = __webpack_require__(20);
	
	Object.defineProperty(exports, 'RuleList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_RuleList)['default'];
	  }
	});
	
	var _sheets = __webpack_require__(46);
	
	Object.defineProperty(exports, 'sheets', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sheets)['default'];
	  }
	});
	
	var _createGenerateClassName = __webpack_require__(65);
	
	Object.defineProperty(exports, 'createGenerateClassName', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_createGenerateClassName)['default'];
	  }
	});
	
	var _Jss = __webpack_require__(131);
	
	var _Jss2 = _interopRequireDefault(_Jss);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Creates a new instance of Jss.
	 */
	var create = exports.create = function create(options) {
	  return new _Jss2['default'](options);
	};
	
	/**
	 * A global Jss instance.
	 */
	exports['default'] = create();

/***/ }),
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(12);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(9);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(13);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(11);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(10);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _hoistNonReactStatics = __webpack_require__(53);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _wrapDisplayName = __webpack_require__(36);
	
	var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);
	
	var _createMuiTheme = __webpack_require__(48);
	
	var _createMuiTheme2 = _interopRequireDefault(_createMuiTheme);
	
	var _themeListener = __webpack_require__(49);
	
	var _themeListener2 = _interopRequireDefault(_themeListener);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultTheme = void 0;
	
	function getDefaultTheme() {
	  if (defaultTheme) {
	    return defaultTheme;
	  }
	
	  defaultTheme = (0, _createMuiTheme2.default)();
	  return defaultTheme;
	}
	
	// Provide the theme object as a property to the input component.
	var withTheme = function withTheme() {
	  return function (Component) {
	    var WithTheme = function (_React$Component) {
	      (0, _inherits3.default)(WithTheme, _React$Component);
	
	      function WithTheme(props, context) {
	        (0, _classCallCheck3.default)(this, WithTheme);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (WithTheme.__proto__ || (0, _getPrototypeOf2.default)(WithTheme)).call(this, props, context));
	
	        _this.state = {};
	        _this.unsubscribeId = null;
	
	        _this.state = {
	          // We use || as the function call is lazy evaluated.
	          theme: _themeListener2.default.initial(context) || getDefaultTheme()
	        };
	        return _this;
	      }
	
	      (0, _createClass3.default)(WithTheme, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          var _this2 = this;
	
	          this.unsubscribeId = _themeListener2.default.subscribe(this.context, function (theme) {
	            _this2.setState({ theme: theme });
	          });
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          if (this.unsubscribeId !== null) {
	            _themeListener2.default.unsubscribe(this.context, this.unsubscribeId);
	          }
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return _react2.default.createElement(Component, (0, _extends3.default)({ theme: this.state.theme }, this.props));
	        }
	      }]);
	      return WithTheme;
	    }(_react2.default.Component);
	
	    WithTheme.contextTypes = _themeListener2.default.contextTypes;
	
	    if (false) {
	      WithTheme.displayName = (0, _wrapDisplayName2.default)(Component, 'WithTheme');
	    }
	
	    (0, _hoistNonReactStatics2.default)(WithTheme, Component);
	
	    if (false) {
	      // Exposed for test purposes.
	      WithTheme.Naked = Component;
	    }
	
	    return WithTheme;
	  };
	};
	
	exports.default = withTheme;

/***/ }),
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;
	
	var _propTypes = __webpack_require__(2);
	
	var PropTypes = _interopRequireWildcard(_propTypes);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(17);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _PropTypes = __webpack_require__(187);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
	var EXITED = exports.EXITED = 'exited';
	var ENTERING = exports.ENTERING = 'entering';
	var ENTERED = exports.ENTERED = 'entered';
	var EXITING = exports.EXITING = 'exiting';
	
	/**
	 * The Transition component lets you describe a transition from one component
	 * state to another _over time_ with a simple declarative API. Most commonly
	 * it's used to animate the mounting and unmounting of a component, but can also
	 * be used to describe in-place transition states as well.
	 *
	 * By default the `Transition` component does not alter the behavior of the
	 * component it renders, it only tracks "enter" and "exit" states for the components.
	 * It's up to you to give meaning and effect to those states. For example we can
	 * add styles to a component when it enters or exits:
	 *
	 * ```jsx
	 * import Transition from 'react-transition-group/Transition';
	 *
	 * const duration = 300;
	 *
	 * const defaultStyle = {
	 *   transition: `opacity ${duration}ms ease-in-out`,
	 *   opacity: 0,
	 * }
	 *
	 * const transitionStyles = {
	 *   entering: { opacity: 0 },
	 *   entered:  { opacity: 1 },
	 * };
	 *
	 * const Fade = ({ in: inProp }) => (
	 *   <Transition in={inProp} timeout={duration}>
	 *     {(state) => (
	 *       <div style={{
	 *         ...defaultStyle,
	 *         ...transitionStyles[state]
	 *       }}>
	 *         I'm A fade Transition!
	 *       </div>
	 *     )}
	 *   </Transition>
	 * );
	 * ```
	 *
	 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
	 * What it does do is track transition states over time so you can update the
	 * component (such as by adding styles or classes) when it changes states.
	 *
	 * There are 4 main states a Transition can be in:
	 *  - `ENTERING`
	 *  - `ENTERED`
	 *  - `EXITING`
	 *  - `EXITED`
	 *
	 * Transition state is toggled via the `in` prop. When `true` the component begins the
	 * "Enter" stage. During this stage, the component will shift from its current transition state,
	 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
	 * it's complete. Let's take the following example:
	 *
	 * ```jsx
	 * state= { in: false };
	 *
	 * toggleEnterState = () => {
	 *   this.setState({ in: true });
	 * }
	 *
	 * render() {
	 *   return (
	 *     <div>
	 *       <Transition in={this.state.in} timeout={500} />
	 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
	 *     </div>
	 *   );
	 * }
	 * ```
	 *
	 * When the button is clicked the component will shift to the `'entering'` state and
	 * stay there for 500ms (the value of `timeout`) when finally switches to `'entered'`.
	 *
	 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
	 */
	
	var Transition = function (_React$Component) {
	  _inherits(Transition, _React$Component);
	
	  function Transition(props, context) {
	    _classCallCheck(this, Transition);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));
	
	    var parentGroup = context.transitionGroup;
	    // In the context of a TransitionGroup all enters are really appears
	    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
	
	    var initialStatus = void 0;
	    _this.nextStatus = null;
	
	    if (props.in) {
	      if (appear) {
	        initialStatus = EXITED;
	        _this.nextStatus = ENTERING;
	      } else {
	        initialStatus = ENTERED;
	      }
	    } else {
	      if (props.unmountOnExit || props.mountOnEnter) {
	        initialStatus = UNMOUNTED;
	      } else {
	        initialStatus = EXITED;
	      }
	    }
	
	    _this.state = { status: initialStatus };
	
	    _this.nextCallback = null;
	    return _this;
	  }
	
	  Transition.prototype.getChildContext = function getChildContext() {
	    return { transitionGroup: null }; // allows for nested Transitions
	  };
	
	  Transition.prototype.componentDidMount = function componentDidMount() {
	    this.updateStatus(true);
	  };
	
	  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _ref = this.pendingState || this.state,
	        status = _ref.status;
	
	    if (nextProps.in) {
	      if (status === UNMOUNTED) {
	        this.setState({ status: EXITED });
	      }
	      if (status !== ENTERING && status !== ENTERED) {
	        this.nextStatus = ENTERING;
	      }
	    } else {
	      if (status === ENTERING || status === ENTERED) {
	        this.nextStatus = EXITING;
	      }
	    }
	  };
	
	  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.updateStatus();
	  };
	
	  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.cancelNextCallback();
	  };
	
	  Transition.prototype.getTimeouts = function getTimeouts() {
	    var timeout = this.props.timeout;
	
	    var exit = void 0,
	        enter = void 0,
	        appear = void 0;
	
	    exit = enter = appear = timeout;
	
	    if (timeout != null && typeof timeout !== 'number') {
	      exit = timeout.exit;
	      enter = timeout.enter;
	      appear = timeout.appear;
	    }
	    return { exit: exit, enter: enter, appear: appear };
	  };
	
	  Transition.prototype.updateStatus = function updateStatus() {
	    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	    var nextStatus = this.nextStatus;
	
	    if (nextStatus !== null) {
	      this.nextStatus = null;
	      // nextStatus will always be ENTERING or EXITING.
	      this.cancelNextCallback();
	      var node = _reactDom2.default.findDOMNode(this);
	
	      if (nextStatus === ENTERING) {
	        this.performEnter(node, mounting);
	      } else {
	        this.performExit(node);
	      }
	    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
	      this.setState({ status: UNMOUNTED });
	    }
	  };
	
	  Transition.prototype.performEnter = function performEnter(node, mounting) {
	    var _this2 = this;
	
	    var enter = this.props.enter;
	
	    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
	
	    var timeouts = this.getTimeouts();
	
	    // no enter animation skip right to ENTERED
	    // if we are mounting and running this it means appear _must_ be set
	    if (!mounting && !enter) {
	      this.safeSetState({ status: ENTERED }, function () {
	        _this2.props.onEntered(node);
	      });
	      return;
	    }
	
	    this.props.onEnter(node, appearing);
	
	    this.safeSetState({ status: ENTERING }, function () {
	      _this2.props.onEntering(node, appearing);
	
	      // FIXME: appear timeout?
	      _this2.onTransitionEnd(node, timeouts.enter, function () {
	        _this2.safeSetState({ status: ENTERED }, function () {
	          _this2.props.onEntered(node, appearing);
	        });
	      });
	    });
	  };
	
	  Transition.prototype.performExit = function performExit(node) {
	    var _this3 = this;
	
	    var exit = this.props.exit;
	
	    var timeouts = this.getTimeouts();
	
	    // no exit animation skip right to EXITED
	    if (!exit) {
	      this.safeSetState({ status: EXITED }, function () {
	        _this3.props.onExited(node);
	      });
	      return;
	    }
	    this.props.onExit(node);
	
	    this.safeSetState({ status: EXITING }, function () {
	      _this3.props.onExiting(node);
	
	      _this3.onTransitionEnd(node, timeouts.exit, function () {
	        _this3.safeSetState({ status: EXITED }, function () {
	          _this3.props.onExited(node);
	        });
	      });
	    });
	  };
	
	  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
	    if (this.nextCallback !== null) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  };
	
	  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
	    var _this4 = this;
	
	    // We need to track pending updates for instances where a cWRP fires quickly
	    // after cDM and before the state flushes, which would double trigger a
	    // transition
	    this.pendingState = nextState;
	
	    // This shouldn't be necessary, but there are weird race conditions with
	    // setState callbacks and unmounting in testing, so always make sure that
	    // we can cancel any pending setState callbacks after we unmount.
	    callback = this.setNextCallback(callback);
	    this.setState(nextState, function () {
	      _this4.pendingState = null;
	      callback();
	    });
	  };
	
	  Transition.prototype.setNextCallback = function setNextCallback(callback) {
	    var _this5 = this;
	
	    var active = true;
	
	    this.nextCallback = function (event) {
	      if (active) {
	        active = false;
	        _this5.nextCallback = null;
	
	        callback(event);
	      }
	    };
	
	    this.nextCallback.cancel = function () {
	      active = false;
	    };
	
	    return this.nextCallback;
	  };
	
	  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
	    this.setNextCallback(handler);
	
	    if (node) {
	      if (this.props.addEndListener) {
	        this.props.addEndListener(node, this.nextCallback);
	      }
	      if (timeout != null) {
	        setTimeout(this.nextCallback, timeout);
	      }
	    } else {
	      setTimeout(this.nextCallback, 0);
	    }
	  };
	
	  Transition.prototype.render = function render() {
	    var status = this.state.status;
	    if (status === UNMOUNTED) {
	      return null;
	    }
	
	    var _props = this.props,
	        children = _props.children,
	        childProps = _objectWithoutProperties(_props, ['children']);
	    // filter props for Transtition
	
	
	    delete childProps.in;
	    delete childProps.mountOnEnter;
	    delete childProps.unmountOnExit;
	    delete childProps.appear;
	    delete childProps.enter;
	    delete childProps.exit;
	    delete childProps.timeout;
	    delete childProps.addEndListener;
	    delete childProps.onEnter;
	    delete childProps.onEntering;
	    delete childProps.onEntered;
	    delete childProps.onExit;
	    delete childProps.onExiting;
	    delete childProps.onExited;
	
	    if (typeof children === 'function') {
	      return children(status, childProps);
	    }
	
	    var child = _react2.default.Children.only(children);
	    return _react2.default.cloneElement(child, childProps);
	  };
	
	  return Transition;
	}(_react2.default.Component);
	
	Transition.contextTypes = {
	  transitionGroup: PropTypes.object
	};
	Transition.childContextTypes = {
	  transitionGroup: function transitionGroup() {}
	};
	
	
	Transition.propTypes =  false ? {
	  /**
	   * A `function` child can be used instead of a React element.
	   * This function is called with the current transition status
	   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can used
	   * to apply context specific props to a component.
	   *
	   * ```jsx
	   * <Transition timeout={150}>
	   *   {(status) => (
	   *     <MyComponent className={`fade fade-${status}`} />
	   *   )}
	   * </Transition>
	   * ```
	   */
	  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,
	
	  /**
	   * Show the component; triggers the enter or exit states
	   */
	  in: PropTypes.bool,
	
	  /**
	   * By default the child component is mounted immediately along with
	   * the parent `Transition` component. If you want to "lazy mount" the component on the
	   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
	   * mounted, even on "exited", unless you also specify `unmountOnExit`.
	   */
	  mountOnEnter: PropTypes.bool,
	
	  /**
	   * By default the child component stays mounted after it reaches the `'exited'` state.
	   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
	   */
	  unmountOnExit: PropTypes.bool,
	
	  /**
	   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
	   * If you want to transition on the first mount set `appear` to `true`, and the
	   * component will transition in as soon as the `<Transition>` mounts.
	   *
	   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
	   */
	  appear: PropTypes.bool,
	
	  /**
	   * Enable or disable enter transitions.
	   */
	  enter: PropTypes.bool,
	
	  /**
	   * Enable or disable exit transitions.
	   */
	  exit: PropTypes.bool,
	
	  /**
	   * The duration of the transition, in milliseconds.
	   * Required unless `addEventListener` is provided
	   *
	   * You may specify a single timeout for all transitions like: `timeout={500}`,
	   * or individually like:
	   *
	   * ```jsx
	   * timeout={{
	   *  enter: 300,
	   *  exit: 500,
	   * }}
	   * ```
	   *
	   * @type {number | { enter?: number, exit?: number }}
	   */
	  timeout: function timeout(props) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var pt = _PropTypes.timeoutsShape;
	    if (!props.addEndListener) pt = pt.isRequired;
	    return pt.apply(undefined, [props].concat(args));
	  },
	
	  /**
	   * Add a custom transition end trigger. Called with the transitioning
	   * DOM node and a `done` callback. Allows for more fine grained transition end
	   * logic. **Note:** Timeouts are still used as a fallback if provided.
	   *
	   * ```jsx
	   * addEndListener={(node, done) => {
	   *   // use the css transitionend event to mark the finish of a transition
	   *   node.addEventListener('transitionend', done, false);
	   * }}
	   * ```
	   */
	  addEndListener: PropTypes.func,
	
	  /**
	   * Callback fired before the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEnter: PropTypes.func,
	
	  /**
	   * Callback fired after the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntering: PropTypes.func,
	
	  /**
	   * Callback fired after the "entered" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEntered: PropTypes.func,
	
	  /**
	   * Callback fired before the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExit: PropTypes.func,
	
	  /**
	   * Callback fired after the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExiting: PropTypes.func,
	
	  /**
	   * Callback fired after the "exited" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExited: PropTypes.func
	} : {};
	
	// Name the function so it is clearer in the documentation
	function noop() {}
	
	Transition.defaultProps = {
	  in: false,
	  mountOnEnter: false,
	  unmountOnExit: false,
	  appear: false,
	  enter: true,
	  exit: true,
	
	  onEnter: noop,
	  onEntering: noop,
	  onEntered: noop,
	
	  onExit: noop,
	  onExiting: noop,
	  onExited: noop
	};
	
	Transition.UNMOUNTED = 0;
	Transition.EXITED = 1;
	Transition.ENTERING = 2;
	Transition.ENTERED = 3;
	Transition.EXITING = 4;
	
	exports.default = Transition;

/***/ }),
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.keys = undefined;
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.default = createBreakpoints;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Sorted ASC by size. That's important.
	// It can't be configured as it's used statically for propTypes.
	var keys = exports.keys = ['xs', 'sm', 'md', 'lg', 'xl'];
	
	// Keep in mind that @media is inclusive by the CSS specification.
	function createBreakpoints(breakpoints) {
	  var _breakpoints$values = breakpoints.values,
	      values = _breakpoints$values === undefined ? {
	    xs: 0,
	    sm: 600,
	    md: 960,
	    lg: 1280,
	    xl: 1920
	  } : _breakpoints$values,
	      _breakpoints$unit = breakpoints.unit,
	      unit = _breakpoints$unit === undefined ? 'px' : _breakpoints$unit,
	      _breakpoints$step = breakpoints.step,
	      step = _breakpoints$step === undefined ? 5 : _breakpoints$step,
	      other = (0, _objectWithoutProperties3.default)(breakpoints, ['values', 'unit', 'step']);
	
	
	  function up(key) {
	    var value = typeof values[key] === 'number' ? values[key] : key;
	    return '@media (min-width:' + value + unit + ')';
	  }
	
	  function down(key) {
	    var endIndex = keys.indexOf(key) + 1;
	    var upperbound = values[keys[endIndex]];
	
	    if (endIndex === keys.length) {
	      // xl down applies to all sizes
	      return up('xs');
	    }
	
	    var value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
	    return '@media (max-width:' + (value - step / 100) + unit + ')';
	  }
	
	  function between(start, end) {
	    var endIndex = keys.indexOf(end) + 1;
	
	    if (endIndex === keys.length) {
	      return up(start);
	    }
	
	    return '@media (min-width:' + values[start] + unit + ') and ' + ('(max-width:' + (values[keys[endIndex]] - step / 100) + unit + ')');
	  }
	
	  function only(key) {
	    return between(key, key);
	  }
	
	  function width(key) {
	    return values[key];
	  }
	
	  return (0, _extends3.default)({
	    keys: keys,
	    values: values,
	    up: up,
	    down: down,
	    between: between,
	    only: only,
	    width: width
	  }, other);
	}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.buffers = exports.BUFFER_OVERFLOW = undefined;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	var BUFFER_OVERFLOW = exports.BUFFER_OVERFLOW = "Channel's Buffer overflow!";
	
	var ON_OVERFLOW_THROW = 1;
	var ON_OVERFLOW_DROP = 2;
	var ON_OVERFLOW_SLIDE = 3;
	var ON_OVERFLOW_EXPAND = 4;
	
	var zeroBuffer = { isEmpty: _utils.kTrue, put: _utils.noop, take: _utils.noop };
	
	function ringBuffer() {
	  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	  var overflowAction = arguments[1];
	
	  var arr = new Array(limit);
	  var length = 0;
	  var pushIndex = 0;
	  var popIndex = 0;
	
	  var push = function push(it) {
	    arr[pushIndex] = it;
	    pushIndex = (pushIndex + 1) % limit;
	    length++;
	  };
	
	  var take = function take() {
	    if (length != 0) {
	      var it = arr[popIndex];
	      arr[popIndex] = null;
	      length--;
	      popIndex = (popIndex + 1) % limit;
	      return it;
	    }
	  };
	
	  var flush = function flush() {
	    var items = [];
	    while (length) {
	      items.push(take());
	    }
	    return items;
	  };
	
	  return {
	    isEmpty: function isEmpty() {
	      return length == 0;
	    },
	    put: function put(it) {
	      if (length < limit) {
	        push(it);
	      } else {
	        var doubledLimit = void 0;
	        switch (overflowAction) {
	          case ON_OVERFLOW_THROW:
	            throw new Error(BUFFER_OVERFLOW);
	          case ON_OVERFLOW_SLIDE:
	            arr[pushIndex] = it;
	            pushIndex = (pushIndex + 1) % limit;
	            popIndex = pushIndex;
	            break;
	          case ON_OVERFLOW_EXPAND:
	            doubledLimit = 2 * limit;
	
	            arr = flush();
	
	            length = arr.length;
	            pushIndex = arr.length;
	            popIndex = 0;
	
	            arr.length = doubledLimit;
	            limit = doubledLimit;
	
	            push(it);
	            break;
	          default:
	          // DROP
	        }
	      }
	    },
	    take: take,
	    flush: flush
	  };
	}
	
	var buffers = exports.buffers = {
	  none: function none() {
	    return zeroBuffer;
	  },
	  fixed: function fixed(limit) {
	    return ringBuffer(limit, ON_OVERFLOW_THROW);
	  },
	  dropping: function dropping(limit) {
	    return ringBuffer(limit, ON_OVERFLOW_DROP);
	  },
	  sliding: function sliding(limit) {
	    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
	  },
	  expanding: function expanding(initialSize) {
	    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
	  }
	};

/***/ }),
/* 62 */,
/* 63 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Sheets registry to access them all at one place.
	 */
	var SheetsRegistry = function () {
	  function SheetsRegistry() {
	    _classCallCheck(this, SheetsRegistry);
	
	    this.registry = [];
	  }
	
	  _createClass(SheetsRegistry, [{
	    key: 'add',
	
	
	    /**
	     * Register a Style Sheet.
	     */
	    value: function add(sheet) {
	      var registry = this.registry;
	      var index = sheet.options.index;
	
	
	      if (registry.indexOf(sheet) !== -1) return;
	
	      if (registry.length === 0 || index >= this.index) {
	        registry.push(sheet);
	        return;
	      }
	
	      // Find a position.
	      for (var i = 0; i < registry.length; i++) {
	        if (registry[i].options.index > index) {
	          registry.splice(i, 0, sheet);
	          return;
	        }
	      }
	    }
	
	    /**
	     * Reset the registry.
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.registry = [];
	    }
	
	    /**
	     * Remove a Style Sheet.
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(sheet) {
	      var index = this.registry.indexOf(sheet);
	      this.registry.splice(index, 1);
	    }
	
	    /**
	     * Convert all attached sheets to a CSS string.
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString(options) {
	      return this.registry.filter(function (sheet) {
	        return sheet.attached;
	      }).map(function (sheet) {
	        return sheet.toString(options);
	      }).join('\n');
	    }
	  }, {
	    key: 'index',
	
	
	    /**
	     * Current highest index number.
	     */
	    get: function get() {
	      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
	    }
	  }]);
	
	  return SheetsRegistry;
	}();
	
	exports['default'] = SheetsRegistry;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _linkRule = __webpack_require__(67);
	
	var _linkRule2 = _interopRequireDefault(_linkRule);
	
	var _RuleList = __webpack_require__(20);
	
	var _RuleList2 = _interopRequireDefault(_RuleList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StyleSheet = function () {
	  function StyleSheet(styles, options) {
	    _classCallCheck(this, StyleSheet);
	
	    this.attached = false;
	    this.deployed = false;
	    this.linked = false;
	    this.classes = {};
	    this.options = _extends({}, options, {
	      sheet: this,
	      parent: this,
	      classes: this.classes
	    });
	    this.renderer = new options.Renderer(this);
	    this.rules = new _RuleList2['default'](this.options);
	
	    for (var name in styles) {
	      this.rules.add(name, styles[name]);
	    }
	
	    this.rules.process();
	  }
	
	  /**
	   * Attach renderable to the render tree.
	   */
	
	
	  _createClass(StyleSheet, [{
	    key: 'attach',
	    value: function attach() {
	      if (this.attached) return this;
	      if (!this.deployed) this.deploy();
	      this.renderer.attach();
	      if (!this.linked && this.options.link) this.link();
	      this.attached = true;
	      return this;
	    }
	
	    /**
	     * Remove renderable from render tree.
	     */
	
	  }, {
	    key: 'detach',
	    value: function detach() {
	      if (!this.attached) return this;
	      this.renderer.detach();
	      this.attached = false;
	      return this;
	    }
	
	    /**
	     * Add a rule to the current stylesheet.
	     * Will insert a rule also after the stylesheet has been rendered first time.
	     */
	
	  }, {
	    key: 'addRule',
	    value: function addRule(name, decl, options) {
	      var queue = this.queue;
	
	      // Plugins can create rules.
	      // In order to preserve the right order, we need to queue all `.addRule` calls,
	      // which happen after the first `rules.add()` call.
	
	      if (this.attached && !queue) this.queue = [];
	
	      var rule = this.rules.add(name, decl, options);
	      this.options.jss.plugins.onProcessRule(rule);
	
	      if (this.attached) {
	        if (!this.deployed) return rule;
	        // Don't insert rule directly if there is no stringified version yet.
	        // It will be inserted all together when .attach is called.
	        if (queue) queue.push(rule);else {
	          this.insertRule(rule);
	          if (this.queue) {
	            this.queue.forEach(this.insertRule, this);
	            this.queue = undefined;
	          }
	        }
	        return rule;
	      }
	
	      // We can't add rules to a detached style node.
	      // We will redeploy the sheet once user will attach it.
	      this.deployed = false;
	
	      return rule;
	    }
	
	    /**
	     * Insert rule into the StyleSheet
	     */
	
	  }, {
	    key: 'insertRule',
	    value: function insertRule(rule) {
	      var renderable = this.renderer.insertRule(rule);
	      if (renderable && this.options.link) (0, _linkRule2['default'])(rule, renderable);
	    }
	
	    /**
	     * Create and add rules.
	     * Will render also after Style Sheet was rendered the first time.
	     */
	
	  }, {
	    key: 'addRules',
	    value: function addRules(styles, options) {
	      var added = [];
	      for (var name in styles) {
	        added.push(this.addRule(name, styles[name], options));
	      }
	      return added;
	    }
	
	    /**
	     * Get a rule by name.
	     */
	
	  }, {
	    key: 'getRule',
	    value: function getRule(name) {
	      return this.rules.get(name);
	    }
	
	    /**
	     * Delete a rule by name.
	     * Returns `true`: if rule has been deleted from the DOM.
	     */
	
	  }, {
	    key: 'deleteRule',
	    value: function deleteRule(name) {
	      var rule = this.rules.get(name);
	
	      if (!rule) return false;
	
	      this.rules.remove(rule);
	
	      if (this.attached && rule.renderable) {
	        return this.renderer.deleteRule(rule.renderable);
	      }
	
	      return true;
	    }
	
	    /**
	     * Get index of a rule.
	     */
	
	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.rules.indexOf(rule);
	    }
	
	    /**
	     * Deploy pure CSS string to a renderable.
	     */
	
	  }, {
	    key: 'deploy',
	    value: function deploy() {
	      this.renderer.deploy();
	      this.deployed = true;
	      return this;
	    }
	
	    /**
	     * Link renderable CSS rules from sheet with their corresponding models.
	     */
	
	  }, {
	    key: 'link',
	    value: function link() {
	      var cssRules = this.renderer.getRules();
	
	      // Is undefined when VirtualRenderer is used.
	      if (cssRules) this.rules.link(cssRules);
	      this.linked = true;
	      return this;
	    }
	
	    /**
	     * Update the function values with a new data.
	     */
	
	  }, {
	    key: 'update',
	    value: function update(name, data) {
	      this.rules.update(name, data);
	      return this;
	    }
	
	    /**
	     * Convert rules to a CSS string.
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString(options) {
	      return this.rules.toString(options);
	    }
	  }]);
	
	  return StyleSheet;
	}();
	
	exports['default'] = StyleSheet;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _StyleSheet = __webpack_require__(64);
	
	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);
	
	var _moduleId = __webpack_require__(147);
	
	var _moduleId2 = _interopRequireDefault(_moduleId);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var maxRules = 1e10;
	
	
	var env = ("production");
	
	/**
	 * Returns a function which generates unique class names based on counters.
	 * When new generator function is created, rule counter is reseted.
	 * We need to reset the rule counter for SSR for each request.
	 */
	
	exports['default'] = function () {
	  var ruleCounter = 0;
	  var defaultPrefix = env === 'production' ? 'c' : '';
	
	  return function (rule, sheet) {
	    ruleCounter += 1;
	
	    if (ruleCounter > maxRules) {
	      (0, _warning2['default'])(false, '[JSS] You might have a memory leak. Rule counter is at %s.', ruleCounter);
	    }
	
	    var prefix = defaultPrefix;
	    var jssId = '';
	
	    if (sheet) {
	      prefix = sheet.options.classNamePrefix || defaultPrefix;
	      if (sheet.options.jss.id != null) jssId += sheet.options.jss.id;
	    }
	
	    if (env === 'production') {
	      return '' + prefix + _moduleId2['default'] + jssId + ruleCounter;
	    }
	
	    return prefix + rule.key + '-' + _moduleId2['default'] + (jssId && '-' + jssId) + '-' + ruleCounter;
	  };
	};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _symbolObservable = __webpack_require__(197);
	
	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = function (value) {
	  return value && value[_symbolObservable2['default']] && value === value[_symbolObservable2['default']]();
	};

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = linkRule;
	/**
	 * Link rule with CSSStyleRule and nested rules with corresponding nested cssRules if both exists.
	 */
	function linkRule(rule, cssRule) {
	  rule.renderable = cssRule;
	  if (rule.rules && cssRule.cssRules) rule.rules.link(cssRule.cssRules);
	}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(99);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createGenerateClassName;
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var generatorCounter = 0;
	
	// Returns a function which generates unique class names based on counters.
	// When new generator function is created, rule counter is reset.
	// We need to reset the rule counter for SSR for each request.
	//
	// It's inspired by
	// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
	function createGenerateClassName() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _options$dangerouslyU = options.dangerouslyUseGlobalCSS,
	      dangerouslyUseGlobalCSS = _options$dangerouslyU === undefined ? false : _options$dangerouslyU,
	      _options$productionPr = options.productionPrefix,
	      productionPrefix = _options$productionPr === undefined ? 'jss' : _options$productionPr;
	
	  var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
	  var ruleCounter = 0;
	
	  // - HMR can lead to many class name generators being instantiated,
	  // so the warning is only triggered in production.
	  // - We expect a class name generator to be instantiated per new request on the server,
	  // so the warning is only triggered client side.
	  // - You can get away with having multiple class name generators
	  // by modifying the `productionPrefix`.
	  if (("production") === 'production' && typeof window !== 'undefined' && productionPrefix === 'jss') {
	    generatorCounter += 1;
	
	    if (generatorCounter > 2) {
	      // eslint-disable-next-line no-console
	      console.error(['Material-UI: we have detected more than needed creation of the class name generator.', 'You should only use one class name generator on the client side.', 'If you do otherwise, you take the risk to have conflicting class names in production.'].join('\n'));
	    }
	  }
	
	  return function (rule, styleSheet) {
	    ruleCounter += 1;
	     false ? (0, _warning2.default)(ruleCounter < 1e10, ['Material-UI: you might have a memory leak.', 'The ruleCounter is not supposed to grow that much.'].join('')) : void 0;
	
	    // Code branch the whole block at the expense of more code.
	    if (dangerouslyUseGlobalCSS) {
	      if (styleSheet && styleSheet.options.classNamePrefix) {
	        var prefix = styleSheet.options.classNamePrefix;
	        // Sanitize the string as will be used to prefix the generated class name.
	        prefix = prefix.replace(escapeRegex, '-');
	
	        if (prefix.match(/^Mui/)) {
	          return prefix + '-' + rule.key;
	        }
	
	        if (false) {
	          return prefix + '-' + rule.key + '-' + ruleCounter;
	        }
	      }
	
	      if (true) {
	        return '' + productionPrefix + ruleCounter;
	      }
	
	      return rule.key + '-' + ruleCounter;
	    }
	
	    if (true) {
	      return '' + productionPrefix + ruleCounter;
	    }
	
	    if (styleSheet && styleSheet.options.classNamePrefix) {
	      var _prefix = styleSheet.options.classNamePrefix;
	      // Sanitize the string as will be used to prefix the generated class name.
	      _prefix = _prefix.replace(escapeRegex, '-');
	
	      return _prefix + '-' + rule.key + '-' + ruleCounter;
	    }
	
	    return rule.key + '-' + ruleCounter;
	  };
	}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jssGlobal = __webpack_require__(127);
	
	var _jssGlobal2 = _interopRequireDefault(_jssGlobal);
	
	var _jssNested = __webpack_require__(128);
	
	var _jssNested2 = _interopRequireDefault(_jssNested);
	
	var _jssCamelCase = __webpack_require__(124);
	
	var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);
	
	var _jssDefaultUnit = __webpack_require__(126);
	
	var _jssDefaultUnit2 = _interopRequireDefault(_jssDefaultUnit);
	
	var _jssVendorPrefixer = __webpack_require__(130);
	
	var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);
	
	var _jssPropsSort = __webpack_require__(129);
	
	var _jssPropsSort2 = _interopRequireDefault(_jssPropsSort);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Subset of jss-preset-default with only the plugins the Material-UI
	// components are using.
	function jssPreset() {
	  return {
	    plugins: [(0, _jssGlobal2.default)(), (0, _jssNested2.default)(), (0, _jssCamelCase2.default)(), (0, _jssDefaultUnit2.default)(), (0, _jssVendorPrefixer2.default)(), (0, _jssPropsSort2.default)()]
	  };
	}
	
	exports.default = jssPreset;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

	exports.__esModule = true;
	var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
	    BODY: "bodyAttributes",
	    HTML: "htmlAttributes",
	    TITLE: "titleAttributes"
	};
	
	var TAG_NAMES = exports.TAG_NAMES = {
	    BASE: "base",
	    BODY: "body",
	    HEAD: "head",
	    HTML: "html",
	    LINK: "link",
	    META: "meta",
	    NOSCRIPT: "noscript",
	    SCRIPT: "script",
	    STYLE: "style",
	    TITLE: "title"
	};
	
	var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
	    return TAG_NAMES[name];
	});
	
	var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
	    CHARSET: "charset",
	    CSS_TEXT: "cssText",
	    HREF: "href",
	    HTTPEQUIV: "http-equiv",
	    INNER_HTML: "innerHTML",
	    ITEM_PROP: "itemprop",
	    NAME: "name",
	    PROPERTY: "property",
	    REL: "rel",
	    SRC: "src"
	};
	
	var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
	    accesskey: "accessKey",
	    charset: "charSet",
	    class: "className",
	    contenteditable: "contentEditable",
	    contextmenu: "contextMenu",
	    "http-equiv": "httpEquiv",
	    itemprop: "itemProp",
	    tabindex: "tabIndex"
	};
	
	var HELMET_PROPS = exports.HELMET_PROPS = {
	    DEFAULT_TITLE: "defaultTitle",
	    DEFER: "defer",
	    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
	    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
	    TITLE_TEMPLATE: "titleTemplate"
	};
	
	var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
	    obj[REACT_TAG_MAP[key]] = key;
	    return obj;
	}, {});
	
	var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
	
	var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),
/* 72 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Namespaces to avoid conflicts on the context.
	 */
	var jss = exports.jss = '64a55d578f856d258dc345b094a2a2b3';
	var sheetsRegistry = exports.sheetsRegistry = 'd4bd0baacbc52bbd48bbb9eb24344ecd';
	var managers = exports.managers = 'b768b78919504fba9de2c03545c5cd3a';
	var sheetOptions = exports.sheetOptions = '6fc570d6bd61383819d0f9e7407c452d';

/***/ }),
/* 73 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var getDisplayName = function getDisplayName(Component) {
	  if (typeof Component === 'string') {
	    return Component;
	  }
	
	  if (!Component) {
	    return undefined;
	  }
	
	  return Component.displayName || Component.name || 'Component';
	};
	
	exports.default = getDisplayName;

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(148),
	    getPrototype = __webpack_require__(262),
	    isObjectLike = __webpack_require__(152);
	
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
	function isPlainObject(value) {
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
	
	module.exports = isPlainObject;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Button = __webpack_require__(157);
	
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Button).default;
	  }
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var common = {
	  black: '#000',
	  white: '#fff'
	};
	
	exports.default = common;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 86 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _io = /*#__PURE__*/__webpack_require__(22);
	
	Object.defineProperty(exports, 'take', {
	  enumerable: true,
	  get: function get() {
	    return _io.take;
	  }
	});
	Object.defineProperty(exports, 'takem', {
	  enumerable: true,
	  get: function get() {
	    return _io.takem;
	  }
	});
	Object.defineProperty(exports, 'put', {
	  enumerable: true,
	  get: function get() {
	    return _io.put;
	  }
	});
	Object.defineProperty(exports, 'all', {
	  enumerable: true,
	  get: function get() {
	    return _io.all;
	  }
	});
	Object.defineProperty(exports, 'race', {
	  enumerable: true,
	  get: function get() {
	    return _io.race;
	  }
	});
	Object.defineProperty(exports, 'call', {
	  enumerable: true,
	  get: function get() {
	    return _io.call;
	  }
	});
	Object.defineProperty(exports, 'apply', {
	  enumerable: true,
	  get: function get() {
	    return _io.apply;
	  }
	});
	Object.defineProperty(exports, 'cps', {
	  enumerable: true,
	  get: function get() {
	    return _io.cps;
	  }
	});
	Object.defineProperty(exports, 'fork', {
	  enumerable: true,
	  get: function get() {
	    return _io.fork;
	  }
	});
	Object.defineProperty(exports, 'spawn', {
	  enumerable: true,
	  get: function get() {
	    return _io.spawn;
	  }
	});
	Object.defineProperty(exports, 'join', {
	  enumerable: true,
	  get: function get() {
	    return _io.join;
	  }
	});
	Object.defineProperty(exports, 'cancel', {
	  enumerable: true,
	  get: function get() {
	    return _io.cancel;
	  }
	});
	Object.defineProperty(exports, 'select', {
	  enumerable: true,
	  get: function get() {
	    return _io.select;
	  }
	});
	Object.defineProperty(exports, 'actionChannel', {
	  enumerable: true,
	  get: function get() {
	    return _io.actionChannel;
	  }
	});
	Object.defineProperty(exports, 'cancelled', {
	  enumerable: true,
	  get: function get() {
	    return _io.cancelled;
	  }
	});
	Object.defineProperty(exports, 'flush', {
	  enumerable: true,
	  get: function get() {
	    return _io.flush;
	  }
	});
	Object.defineProperty(exports, 'getContext', {
	  enumerable: true,
	  get: function get() {
	    return _io.getContext;
	  }
	});
	Object.defineProperty(exports, 'setContext', {
	  enumerable: true,
	  get: function get() {
	    return _io.setContext;
	  }
	});
	Object.defineProperty(exports, 'takeEvery', {
	  enumerable: true,
	  get: function get() {
	    return _io.takeEvery;
	  }
	});
	Object.defineProperty(exports, 'takeLatest', {
	  enumerable: true,
	  get: function get() {
	    return _io.takeLatest;
	  }
	});
	Object.defineProperty(exports, 'throttle', {
	  enumerable: true,
	  get: function get() {
	    return _io.throttle;
	  }
	});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.qEnd = undefined;
	exports.safeName = safeName;
	exports.default = fsmIterator;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	var done = { done: true, value: undefined };
	var qEnd = exports.qEnd = {};
	
	function safeName(patternOrChannel) {
	  if (_utils.is.channel(patternOrChannel)) {
	    return 'channel';
	  } else if (Array.isArray(patternOrChannel)) {
	    return String(patternOrChannel.map(function (entry) {
	      return String(entry);
	    }));
	  } else {
	    return String(patternOrChannel);
	  }
	}
	
	function fsmIterator(fsm, q0) {
	  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';
	
	  var updateState = void 0,
	      qNext = q0;
	
	  function next(arg, error) {
	    if (qNext === qEnd) {
	      return done;
	    }
	
	    if (error) {
	      qNext = qEnd;
	      throw error;
	    } else {
	      updateState && updateState(arg);
	
	      var _fsm$qNext = fsm[qNext](),
	          q = _fsm$qNext[0],
	          output = _fsm$qNext[1],
	          _updateState = _fsm$qNext[2];
	
	      qNext = q;
	      updateState = _updateState;
	      return qNext === qEnd ? done : output;
	    }
	  }
	
	  return (0, _utils.makeIterator)(next, function (error) {
	    return next(null, error);
	  }, name, true);
	}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
	var _createStore = __webpack_require__(194);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _combineReducers = __webpack_require__(291);
	
	var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
	var _bindActionCreators = __webpack_require__(290);
	
	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
	var _applyMiddleware = __webpack_require__(289);
	
	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
	var _compose = __webpack_require__(193);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _warning = __webpack_require__(195);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}
	
	if (false) {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}
	
	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function() {
	  "use strict";
	
	function immutableInit(config) {
	
	  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L21
	  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element');
	  var REACT_ELEMENT_TYPE_FALLBACK = 0xeac7;
	
	  var globalConfig = {
	    use_static: false
	  };
	  if (isObject(config)) {
	      if (config.use_static !== undefined) {
	          globalConfig.use_static = Boolean(config.use_static);
	      }
	  }
	
	  function isObject(data) {
	    return (
	      typeof data === 'object' &&
	      !Array.isArray(data) &&
	      data !== null
	    );
	  }
	
	  function instantiateEmptyObject(obj) {
	      var prototype = Object.getPrototypeOf(obj);
	      if (!prototype) {
	          return {};
	      } else {
	          return Object.create(prototype);
	      }
	  }
	
	  function addPropertyTo(target, methodName, value) {
	    Object.defineProperty(target, methodName, {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: value
	    });
	  }
	
	  function banProperty(target, methodName) {
	    addPropertyTo(target, methodName, function() {
	      throw new ImmutableError("The " + methodName +
	        " method cannot be invoked on an Immutable data structure.");
	    });
	  }
	
	  var immutabilityTag = "__immutable_invariants_hold";
	
	  function addImmutabilityTag(target) {
	    addPropertyTo(target, immutabilityTag, true);
	  }
	
	  function isImmutable(target) {
	    if (typeof target === "object") {
	      return target === null || Boolean(
	        Object.getOwnPropertyDescriptor(target, immutabilityTag)
	      );
	    } else {
	      // In JavaScript, only objects are even potentially mutable.
	      // strings, numbers, null, and undefined are all naturally immutable.
	      return true;
	    }
	  }
	
	  function isEqual(a, b) {
	    // Avoid false positives due to (NaN !== NaN) evaluating to true
	    return (a === b || (a !== a && b !== b));
	  }
	
	  function isMergableObject(target) {
	    return target !== null && typeof target === "object" && !(Array.isArray(target)) && !(target instanceof Date);
	  }
	
	  var mutatingObjectMethods = [
	    "setPrototypeOf"
	  ];
	
	  var nonMutatingObjectMethods = [
	    "keys"
	  ];
	
	  var mutatingArrayMethods = mutatingObjectMethods.concat([
	    "push", "pop", "sort", "splice", "shift", "unshift", "reverse"
	  ]);
	
	  var nonMutatingArrayMethods = nonMutatingObjectMethods.concat([
	    "map", "filter", "slice", "concat", "reduce", "reduceRight"
	  ]);
	
	  var mutatingDateMethods = mutatingObjectMethods.concat([
	    "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds",
	    "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes",
	    "setUTCMonth", "setUTCSeconds", "setYear"
	  ]);
	
	  function ImmutableError(message) {
	    this.name = 'MyError';
	    this.message = message;
	    this.stack = (new Error()).stack;
	  }
	  ImmutableError.prototype = new Error();
	  ImmutableError.prototype.constructor = Error;
	
	  function makeImmutable(obj, bannedMethods) {
	    // Tag it so we can quickly tell it's immutable later.
	    addImmutabilityTag(obj);
	
	    if (true) {
	      // Make all mutating methods throw exceptions.
	      for (var index in bannedMethods) {
	        if (bannedMethods.hasOwnProperty(index)) {
	          banProperty(obj, bannedMethods[index]);
	        }
	      }
	
	      // Freeze it and return it.
	      Object.freeze(obj);
	    }
	
	    return obj;
	  }
	
	  function makeMethodReturnImmutable(obj, methodName) {
	    var currentMethod = obj[methodName];
	
	    addPropertyTo(obj, methodName, function() {
	      return Immutable(currentMethod.apply(obj, arguments));
	    });
	  }
	
	  function arraySet(idx, value, config) {
	    var deep          = config && config.deep;
	
	    if (idx in this) {
	      if (deep && this[idx] !== value && isMergableObject(value) && isMergableObject(this[idx])) {
	        value = Immutable.merge(this[idx], value, {deep: true, mode: 'replace'});
	      }
	      if (isEqual(this[idx], value)) {
	        return this;
	      }
	    }
	
	    var mutable = asMutableArray.call(this);
	    mutable[idx] = Immutable(value);
	    return makeImmutableArray(mutable);
	  }
	
	  var immutableEmptyArray = Immutable([]);
	
	  function arraySetIn(pth, value, config) {
	    var head = pth[0];
	
	    if (pth.length === 1) {
	      return arraySet.call(this, head, value, config);
	    } else {
	      var tail = pth.slice(1);
	      var thisHead = this[head];
	      var newValue;
	
	      if (typeof(thisHead) === "object" && thisHead !== null) {
	        // Might (validly) be object or array
	        newValue = Immutable.setIn(thisHead, tail, value);
	      } else {
	        var nextHead = tail[0];
	        // If the next path part is a number, then we are setting into an array, else an object.
	        if (nextHead !== '' && isFinite(nextHead)) {
	          newValue = arraySetIn.call(immutableEmptyArray, tail, value);
	        } else {
	          newValue = objectSetIn.call(immutableEmptyObject, tail, value);
	        }
	      }
	
	      if (head in this && thisHead === newValue) {
	        return this;
	      }
	
	      var mutable = asMutableArray.call(this);
	      mutable[head] = newValue;
	      return makeImmutableArray(mutable);
	    }
	  }
	
	  function makeImmutableArray(array) {
	    // Don't change their implementations, but wrap these functions to make sure
	    // they always return an immutable value.
	    for (var index in nonMutatingArrayMethods) {
	      if (nonMutatingArrayMethods.hasOwnProperty(index)) {
	        var methodName = nonMutatingArrayMethods[index];
	        makeMethodReturnImmutable(array, methodName);
	      }
	    }
	
	    if (!globalConfig.use_static) {
	      addPropertyTo(array, "flatMap",  flatMap);
	      addPropertyTo(array, "asObject", asObject);
	      addPropertyTo(array, "asMutable", asMutableArray);
	      addPropertyTo(array, "set", arraySet);
	      addPropertyTo(array, "setIn", arraySetIn);
	      addPropertyTo(array, "update", update);
	      addPropertyTo(array, "updateIn", updateIn);
	      addPropertyTo(array, "getIn", getIn);
	    }
	
	    for(var i = 0, length = array.length; i < length; i++) {
	      array[i] = Immutable(array[i]);
	    }
	
	    return makeImmutable(array, mutatingArrayMethods);
	  }
	
	  function makeImmutableDate(date) {
	    if (!globalConfig.use_static) {
	      addPropertyTo(date, "asMutable", asMutableDate);
	    }
	
	    return makeImmutable(date, mutatingDateMethods);
	  }
	
	  function asMutableDate() {
	    return new Date(this.getTime());
	  }
	
	  /**
	   * Effectively performs a map() over the elements in the array, using the
	   * provided iterator, except that whenever the iterator returns an array, that
	   * array's elements are added to the final result instead of the array itself.
	   *
	   * @param {function} iterator - The iterator function that will be invoked on each element in the array. It will receive three arguments: the current value, the current index, and the current object.
	   */
	  function flatMap(iterator) {
	    // Calling .flatMap() with no arguments is a no-op. Don't bother cloning.
	    if (arguments.length === 0) {
	      return this;
	    }
	
	    var result = [],
	        length = this.length,
	        index;
	
	    for (index = 0; index < length; index++) {
	      var iteratorResult = iterator(this[index], index, this);
	
	      if (Array.isArray(iteratorResult)) {
	        // Concatenate Array results into the return value we're building up.
	        result.push.apply(result, iteratorResult);
	      } else {
	        // Handle non-Array results the same way map() does.
	        result.push(iteratorResult);
	      }
	    }
	
	    return makeImmutableArray(result);
	  }
	
	  /**
	   * Returns an Immutable copy of the object without the given keys included.
	   *
	   * @param {array} keysToRemove - A list of strings representing the keys to exclude in the return value. Instead of providing a single array, this method can also be called by passing multiple strings as separate arguments.
	   */
	  function without(remove) {
	    // Calling .without() with no arguments is a no-op. Don't bother cloning.
	    if (typeof remove === "undefined" && arguments.length === 0) {
	      return this;
	    }
	
	    if (typeof remove !== "function") {
	      // If we weren't given an array, use the arguments list.
	      var keysToRemoveArray = (Array.isArray(remove)) ?
	         remove.slice() : Array.prototype.slice.call(arguments);
	
	      // Convert numeric keys to strings since that's how they'll
	      // come from the enumeration of the object.
	      keysToRemoveArray.forEach(function(el, idx, arr) {
	        if(typeof(el) === "number") {
	          arr[idx] = el.toString();
	        }
	      });
	
	      remove = function(val, key) {
	        return keysToRemoveArray.indexOf(key) !== -1;
	      };
	    }
	
	    var result = instantiateEmptyObject(this);
	
	    for (var key in this) {
	      if (this.hasOwnProperty(key) && remove(this[key], key) === false) {
	        result[key] = this[key];
	      }
	    }
	
	    return makeImmutableObject(result);
	  }
	
	  function asMutableArray(opts) {
	    var result = [], i, length;
	
	    if(opts && opts.deep) {
	      for(i = 0, length = this.length; i < length; i++) {
	        result.push(asDeepMutable(this[i]));
	      }
	    } else {
	      for(i = 0, length = this.length; i < length; i++) {
	        result.push(this[i]);
	      }
	    }
	
	    return result;
	  }
	
	  /**
	   * Effectively performs a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the elements in the array, expecting that the iterator function
	   * will return an array of two elements - the first representing a key, the other
	   * a value. Then returns an Immutable Object constructed of those keys and values.
	   *
	   * @param {function} iterator - A function which should return an array of two elements - the first representing the desired key, the other the desired value.
	   */
	  function asObject(iterator) {
	    // If no iterator was provided, assume the identity function
	    // (suggesting this array is already a list of key/value pairs.)
	    if (typeof iterator !== "function") {
	      iterator = function(value) { return value; };
	    }
	
	    var result = {},
	        length = this.length,
	        index;
	
	    for (index = 0; index < length; index++) {
	      var pair  = iterator(this[index], index, this),
	          key   = pair[0],
	          value = pair[1];
	
	      result[key] = value;
	    }
	
	    return makeImmutableObject(result);
	  }
	
	  function asDeepMutable(obj) {
	    if (
	      (!obj) ||
	      (typeof obj !== 'object') ||
	      (!Object.getOwnPropertyDescriptor(obj, immutabilityTag)) ||
	      (obj instanceof Date)
	    ) { return obj; }
	    return Immutable.asMutable(obj, {deep: true});
	  }
	
	  function quickCopy(src, dest) {
	    for (var key in src) {
	      if (Object.getOwnPropertyDescriptor(src, key)) {
	        dest[key] = src[key];
	      }
	    }
	
	    return dest;
	  }
	
	  /**
	   * Returns an Immutable Object containing the properties and values of both
	   * this object and the provided object, prioritizing the provided object's
	   * values whenever the same key is present in both objects.
	   *
	   * @param {object} other - The other object to merge. Multiple objects can be passed as an array. In such a case, the later an object appears in that list, the higher its priority.
	   * @param {object} config - Optional config object that contains settings. Supported settings are: {deep: true} for deep merge and {merger: mergerFunc} where mergerFunc is a function
	   *                          that takes a property from both objects. If anything is returned it overrides the normal merge behaviour.
	   */
	  function merge(other, config) {
	    // Calling .merge() with no arguments is a no-op. Don't bother cloning.
	    if (arguments.length === 0) {
	      return this;
	    }
	
	    if (other === null || (typeof other !== "object")) {
	      throw new TypeError("Immutable#merge can only be invoked with objects or arrays, not " + JSON.stringify(other));
	    }
	
	    var receivedArray = (Array.isArray(other)),
	        deep          = config && config.deep,
	        mode          = config && config.mode || 'merge',
	        merger        = config && config.merger,
	        result;
	
	    // Use the given key to extract a value from the given object, then place
	    // that value in the result object under the same key. If that resulted
	    // in a change from this object's value at that key, set anyChanges = true.
	    function addToResult(currentObj, otherObj, key) {
	      var immutableValue = Immutable(otherObj[key]);
	      var mergerResult = merger && merger(currentObj[key], immutableValue, config);
	      var currentValue = currentObj[key];
	
	      if ((result !== undefined) ||
	        (mergerResult !== undefined) ||
	        (!currentObj.hasOwnProperty(key)) ||
	        !isEqual(immutableValue, currentValue)) {
	
	        var newValue;
	
	        if (mergerResult) {
	          newValue = mergerResult;
	        } else if (deep && isMergableObject(currentValue) && isMergableObject(immutableValue)) {
	          newValue = Immutable.merge(currentValue, immutableValue, config);
	        } else {
	          newValue = immutableValue;
	        }
	
	        if (!isEqual(currentValue, newValue) || !currentObj.hasOwnProperty(key)) {
	          if (result === undefined) {
	            // Make a shallow clone of the current object.
	            result = quickCopy(currentObj, instantiateEmptyObject(currentObj));
	          }
	
	          result[key] = newValue;
	        }
	      }
	    }
	
	    function clearDroppedKeys(currentObj, otherObj) {
	      for (var key in currentObj) {
	        if (!otherObj.hasOwnProperty(key)) {
	          if (result === undefined) {
	            // Make a shallow clone of the current object.
	            result = quickCopy(currentObj, instantiateEmptyObject(currentObj));
	          }
	          delete result[key];
	        }
	      }
	    }
	
	    var key;
	
	    // Achieve prioritization by overriding previous values that get in the way.
	    if (!receivedArray) {
	      // The most common use case: just merge one object into the existing one.
	      for (key in other) {
	        if (Object.getOwnPropertyDescriptor(other, key)) {
	          addToResult(this, other, key);
	        }
	      }
	      if (mode === 'replace') {
	        clearDroppedKeys(this, other);
	      }
	    } else {
	      // We also accept an Array
	      for (var index = 0, length = other.length; index < length; index++) {
	        var otherFromArray = other[index];
	
	        for (key in otherFromArray) {
	          if (otherFromArray.hasOwnProperty(key)) {
	            addToResult(result !== undefined ? result : this, otherFromArray, key);
	          }
	        }
	      }
	    }
	
	    if (result === undefined) {
	      return this;
	    } else {
	      return makeImmutableObject(result);
	    }
	  }
	
	  function objectReplace(value, config) {
	    var deep          = config && config.deep;
	
	    // Calling .replace() with no arguments is a no-op. Don't bother cloning.
	    if (arguments.length === 0) {
	      return this;
	    }
	
	    if (value === null || typeof value !== "object") {
	      throw new TypeError("Immutable#replace can only be invoked with objects or arrays, not " + JSON.stringify(value));
	    }
	
	    return Immutable.merge(this, value, {deep: deep, mode: 'replace'});
	  }
	
	  var immutableEmptyObject = Immutable({});
	
	  function objectSetIn(path, value, config) {
	    if (!(Array.isArray(path)) || path.length === 0) {
	      throw new TypeError("The first argument to Immutable#setIn must be an array containing at least one \"key\" string.");
	    }
	
	    var head = path[0];
	    if (path.length === 1) {
	      return objectSet.call(this, head, value, config);
	    }
	
	    var tail = path.slice(1);
	    var newValue;
	    var thisHead = this[head];
	
	    if (this.hasOwnProperty(head) && typeof(thisHead) === "object" && thisHead !== null) {
	      // Might (validly) be object or array
	      newValue = Immutable.setIn(thisHead, tail, value);
	    } else {
	      newValue = objectSetIn.call(immutableEmptyObject, tail, value);
	    }
	
	    if (this.hasOwnProperty(head) && thisHead === newValue) {
	      return this;
	    }
	
	    var mutable = quickCopy(this, instantiateEmptyObject(this));
	    mutable[head] = newValue;
	    return makeImmutableObject(mutable);
	  }
	
	  function objectSet(property, value, config) {
	    var deep          = config && config.deep;
	
	    if (this.hasOwnProperty(property)) {
	      if (deep && this[property] !== value && isMergableObject(value) && isMergableObject(this[property])) {
	        value = Immutable.merge(this[property], value, {deep: true, mode: 'replace'});
	      }
	      if (isEqual(this[property], value)) {
	        return this;
	      }
	    }
	
	    var mutable = quickCopy(this, instantiateEmptyObject(this));
	    mutable[property] = Immutable(value);
	    return makeImmutableObject(mutable);
	  }
	
	  function update(property, updater) {
	    var restArgs = Array.prototype.slice.call(arguments, 2);
	    var initialVal = this[property];
	    return Immutable.set(this, property, updater.apply(initialVal, [initialVal].concat(restArgs)));
	  }
	
	  function getInPath(obj, path) {
	    /*jshint eqnull:true */
	    for (var i = 0, l = path.length; obj != null && i < l; i++) {
	      obj = obj[path[i]];
	    }
	
	    return (i && i == l) ? obj : undefined;
	  }
	
	  function updateIn(path, updater) {
	    var restArgs = Array.prototype.slice.call(arguments, 2);
	    var initialVal = getInPath(this, path);
	
	    return Immutable.setIn(this, path, updater.apply(initialVal, [initialVal].concat(restArgs)));
	  }
	
	  function getIn(path, defaultValue) {
	    var value = getInPath(this, path);
	    return value === undefined ? defaultValue : value;
	  }
	
	  function asMutableObject(opts) {
	    var result = instantiateEmptyObject(this), key;
	
	    if(opts && opts.deep) {
	      for (key in this) {
	        if (this.hasOwnProperty(key)) {
	          result[key] = asDeepMutable(this[key]);
	        }
	      }
	    } else {
	      for (key in this) {
	        if (this.hasOwnProperty(key)) {
	          result[key] = this[key];
	        }
	      }
	    }
	
	    return result;
	  }
	
	  // Creates plain object to be used for cloning
	  function instantiatePlainObject() {
	    return {};
	  }
	
	  // Finalizes an object with immutable methods, freezes it, and returns it.
	  function makeImmutableObject(obj) {
	    if (!globalConfig.use_static) {
	      addPropertyTo(obj, "merge", merge);
	      addPropertyTo(obj, "replace", objectReplace);
	      addPropertyTo(obj, "without", without);
	      addPropertyTo(obj, "asMutable", asMutableObject);
	      addPropertyTo(obj, "set", objectSet);
	      addPropertyTo(obj, "setIn", objectSetIn);
	      addPropertyTo(obj, "update", update);
	      addPropertyTo(obj, "updateIn", updateIn);
	      addPropertyTo(obj, "getIn", getIn);
	    }
	
	    return makeImmutable(obj, mutatingObjectMethods);
	  }
	
	  // Returns true if object is a valid react element
	  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L326
	  function isReactElement(obj) {
	    return typeof obj === 'object' &&
	           obj !== null &&
	           (obj.$$typeof === REACT_ELEMENT_TYPE_FALLBACK || obj.$$typeof === REACT_ELEMENT_TYPE);
	  }
	
	  function isFileObject(obj) {
	    return typeof File !== 'undefined' &&
	           obj instanceof File;
	  }
	
	  function isBlobObject(obj) {
	    return typeof Blob !== 'undefined' &&
	           obj instanceof Blob;
	  }
	
	  function isPromise(obj) {
	    return typeof obj === 'object' &&
	           typeof obj.then === 'function';
	  }
	
	  function isError(obj) {
	    return obj instanceof Error;
	  }
	
	  function Immutable(obj, options, stackRemaining) {
	    if (isImmutable(obj) || isReactElement(obj) || isFileObject(obj) || isBlobObject(obj) || isError(obj)) {
	      return obj;
	    } else if (isPromise(obj)) {
	      return obj.then(Immutable);
	    } else if (Array.isArray(obj)) {
	      return makeImmutableArray(obj.slice());
	    } else if (obj instanceof Date) {
	      return makeImmutableDate(new Date(obj.getTime()));
	    } else {
	      // Don't freeze the object we were given; make a clone and use that.
	      var prototype = options && options.prototype;
	      var instantiateEmptyObject =
	        (!prototype || prototype === Object.prototype) ?
	          instantiatePlainObject : (function() { return Object.create(prototype); });
	      var clone = instantiateEmptyObject();
	
	      if (true) {
	        /*jshint eqnull:true */
	        if (stackRemaining == null) {
	          stackRemaining = 64;
	        }
	        if (stackRemaining <= 0) {
	          throw new ImmutableError("Attempt to construct Immutable from a deeply nested object was detected." +
	            " Have you tried to wrap an object with circular references (e.g. React element)?" +
	            " See https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected for details.");
	        }
	        stackRemaining -= 1;
	      }
	
	      for (var key in obj) {
	        if (Object.getOwnPropertyDescriptor(obj, key)) {
	          clone[key] = Immutable(obj[key], undefined, stackRemaining);
	        }
	      }
	
	      return makeImmutableObject(clone);
	    }
	  }
	
	  // Wrapper to allow the use of object methods as static methods of Immutable.
	  function toStatic(fn) {
	    function staticWrapper() {
	      var args = [].slice.call(arguments);
	      var self = args.shift();
	      return fn.apply(self, args);
	    }
	
	    return staticWrapper;
	  }
	
	  // Wrapper to allow the use of object methods as static methods of Immutable.
	  // with the additional condition of choosing which function to call depending
	  // if argument is an array or an object.
	  function toStaticObjectOrArray(fnObject, fnArray) {
	    function staticWrapper() {
	      var args = [].slice.call(arguments);
	      var self = args.shift();
	      if (Array.isArray(self)) {
	          return fnArray.apply(self, args);
	      } else {
	          return fnObject.apply(self, args);
	      }
	    }
	
	    return staticWrapper;
	  }
	
	  // Wrapper to allow the use of object methods as static methods of Immutable.
	  // with the additional condition of choosing which function to call depending
	  // if argument is an array or an object or a date.
	  function toStaticObjectOrDateOrArray(fnObject, fnArray, fnDate) {
	    function staticWrapper() {
	      var args = [].slice.call(arguments);
	      var self = args.shift();
	      if (Array.isArray(self)) {
	          return fnArray.apply(self, args);
	      } else if (self instanceof Date) {
	          return fnDate.apply(self, args);
	      } else {
	          return fnObject.apply(self, args);
	      }
	    }
	
	    return staticWrapper;
	  }
	
	  // Export the library
	  Immutable.from           = Immutable;
	  Immutable.isImmutable    = isImmutable;
	  Immutable.ImmutableError = ImmutableError;
	  Immutable.merge          = toStatic(merge);
	  Immutable.replace        = toStatic(objectReplace);
	  Immutable.without        = toStatic(without);
	  Immutable.asMutable      = toStaticObjectOrDateOrArray(asMutableObject, asMutableArray, asMutableDate);
	  Immutable.set            = toStaticObjectOrArray(objectSet, arraySet);
	  Immutable.setIn          = toStaticObjectOrArray(objectSetIn, arraySetIn);
	  Immutable.update         = toStatic(update);
	  Immutable.updateIn       = toStatic(updateIn);
	  Immutable.getIn          = toStatic(getIn);
	  Immutable.flatMap        = toStatic(flatMap);
	  Immutable.asObject       = toStatic(asObject);
	  if (!globalConfig.use_static) {
	      Immutable.static = immutableInit({
	          use_static: true
	      });
	  }
	
	  Object.freeze(Immutable);
	
	  return Immutable;
	}
	
	  var Immutable = immutableInit();
	  /* istanbul ignore if */
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Immutable;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module === "object") {
	    module.exports = Immutable;
	  } else if (typeof exports === "object") {
	    exports.Immutable = Immutable;
	  } else if (typeof window === "object") {
	    window.Immutable = Immutable;
	  } else if (typeof global === "object") {
	    global.Immutable = Immutable;
	  }
	})();


/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(149);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var grey = {
	  50: '#fafafa',
	  100: '#f5f5f5',
	  200: '#eeeeee',
	  300: '#e0e0e0',
	  400: '#bdbdbd',
	  500: '#9e9e9e',
	  600: '#757575',
	  700: '#616161',
	  800: '#424242',
	  900: '#212121',
	  A100: '#d5d5d5',
	  A200: '#aaaaaa',
	  A400: '#303030',
	  A700: '#616161'
	};
	
	exports.default = grey;

/***/ }),
/* 101 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var indigo = {
	  50: '#e8eaf6',
	  100: '#c5cae9',
	  200: '#9fa8da',
	  300: '#7986cb',
	  400: '#5c6bc0',
	  500: '#3f51b5',
	  600: '#3949ab',
	  700: '#303f9f',
	  800: '#283593',
	  900: '#1a237e',
	  A100: '#8c9eff',
	  A200: '#536dfe',
	  A400: '#3d5afe',
	  A700: '#304ffe'
	};
	
	exports.default = indigo;

/***/ }),
/* 102 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pink = {
	  50: '#fce4ec',
	  100: '#f8bbd0',
	  200: '#f48fb1',
	  300: '#f06292',
	  400: '#ec407a',
	  500: '#e91e63',
	  600: '#d81b60',
	  700: '#c2185b',
	  800: '#ad1457',
	  900: '#880e4f',
	  A100: '#ff80ab',
	  A200: '#ff4081',
	  A400: '#f50057',
	  A700: '#c51162'
	};
	
	exports.default = pink;

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var red = {
	  50: '#ffebee',
	  100: '#ffcdd2',
	  200: '#ef9a9a',
	  300: '#e57373',
	  400: '#ef5350',
	  500: '#f44336',
	  600: '#e53935',
	  700: '#d32f2f',
	  800: '#c62828',
	  900: '#b71c1c',
	  A100: '#ff8a80',
	  A200: '#ff5252',
	  A400: '#ff1744',
	  A700: '#d50000'
	};
	
	exports.default = red;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.mygramFailure = mygramFailure;
	exports.loadMygram = loadMygram;
	exports.loadMygramSuccess = loadMygramSuccess;
	
	var _seamlessImmutable = __webpack_require__(90);
	
	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// name spacing with prefix `mygram/`
	var MYGRAM_FAILURE = 'mygram/MYGRAM_FAILURE';
	var LOAD_MYGRAM = 'mygram/LOAD_MYGRAM';
	var LOAD_MYGRAM_SUCCESS = 'mygram/LOAD_MYGRAM_SUCCESS';
	
	// Create Immutable object
	var actionTypes = (0, _seamlessImmutable2.default)({
	  MYGRAM_FAILURE: MYGRAM_FAILURE,
	  LOAD_MYGRAM: LOAD_MYGRAM,
	  LOAD_MYGRAM_SUCCESS: LOAD_MYGRAM_SUCCESS
	});
	
	// export it
	exports.default = actionTypes;
	
	/* Action Creator */
	
	function mygramFailure(error) {
	  return {
	    type: actionTypes.MYGRAM_FAILURE,
	    error: error
	  };
	}
	
	// Mygram
	function loadMygram() {
	  return { type: actionTypes.LOAD_MYGRAM };
	}
	
	function loadMygramSuccess(data) {
	  return {
	    type: actionTypes.LOAD_MYGRAM_SUCCESS,
	    data: data
	  };
	}

/***/ }),
/* 105 */
/***/ (function(module, exports) {

	function createBroadcast (initialState) {
	  var listeners = {};
	  var id = 1;
	  var _state = initialState;
	
	  function getState () {
	    return _state
	  }
	
	  function setState (state) {
	    _state = state;
	    var keys = Object.keys(listeners);
	    var i = 0;
	    var len = keys.length;
	    for (; i < len; i++) {
	      // if a listener gets unsubscribed during setState we just skip it
	      if (listeners[keys[i]]) { listeners[keys[i]](state); }
	    }
	  }
	
	  // subscribe to changes and return the subscriptionId
	  function subscribe (listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('listener must be a function.')
	    }
	    var currentId = id;
	    listeners[currentId] = listener;
	    id += 1;
	    return currentId
	  }
	
	  // remove subscription by removing the listener function
	  function unsubscribe (id) {
	    listeners[id] = undefined;
	  }
	
	  return { getState: getState, setState: setState, subscribe: subscribe, unsubscribe: unsubscribe }
	}
	
	module.exports = createBroadcast;


/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = camelize;
	var regExp = /[-\s]+(.)?/g;
	
	/**
	 * Convert dash separated strings to camel cased.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function camelize(str) {
	  return str.replace(regExp, toUpper);
	}
	
	function toUpper(match, c) {
	  return c ? c.toUpperCase() : '';
	}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.supportedValue = exports.supportedProperty = exports.prefix = undefined;
	
	var _prefix = __webpack_require__(45);
	
	var _prefix2 = _interopRequireDefault(_prefix);
	
	var _supportedProperty = __webpack_require__(116);
	
	var _supportedProperty2 = _interopRequireDefault(_supportedProperty);
	
	var _supportedValue = __webpack_require__(117);
	
	var _supportedValue2 = _interopRequireDefault(_supportedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = {
	  prefix: _prefix2['default'],
	  supportedProperty: _supportedProperty2['default'],
	  supportedValue: _supportedValue2['default']
	}; /**
	    * CSS Vendor prefix detection and property feature testing.
	    *
	    * @copyright Oleg Slobodskoi 2015
	    * @website https://github.com/jsstyles/css-vendor
	    * @license MIT
	    */
	
	exports.prefix = _prefix2['default'];
	exports.supportedProperty = _supportedProperty2['default'];
	exports.supportedValue = _supportedValue2['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = supportedProperty;
	
	var _isInBrowser = __webpack_require__(25);
	
	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);
	
	var _prefix = __webpack_require__(45);
	
	var _prefix2 = _interopRequireDefault(_prefix);
	
	var _camelize = __webpack_require__(114);
	
	var _camelize2 = _interopRequireDefault(_camelize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var el = void 0;
	var cache = {};
	
	if (_isInBrowser2['default']) {
	  el = document.createElement('p');
	
	  /**
	   * We test every property on vendor prefix requirement.
	   * Once tested, result is cached. It gives us up to 70% perf boost.
	   * http://jsperf.com/element-style-object-access-vs-plain-object
	   *
	   * Prefill cache with known css properties to reduce amount of
	   * properties we need to feature test at runtime.
	   * http://davidwalsh.name/vendor-prefix
	   */
	  var computed = window.getComputedStyle(document.documentElement, '');
	  for (var key in computed) {
	    if (!isNaN(key)) cache[computed[key]] = computed[key];
	  }
	}
	
	/**
	 * Test if a property is supported, returns supported property with vendor
	 * prefix if required. Returns `false` if not supported.
	 *
	 * @param {String} prop dash separated
	 * @return {String|Boolean}
	 * @api public
	 */
	function supportedProperty(prop) {
	  // For server-side rendering.
	  if (!el) return prop;
	
	  // We have not tested this prop yet, lets do the test.
	  if (cache[prop] != null) return cache[prop];
	
	  // Camelization is required because we can't test using
	  // css syntax for e.g. in FF.
	  // Test if property is supported as it is.
	  if ((0, _camelize2['default'])(prop) in el.style) {
	    cache[prop] = prop;
	  }
	  // Test if property is supported with vendor prefix.
	  else if (_prefix2['default'].js + (0, _camelize2['default'])('-' + prop) in el.style) {
	      cache[prop] = _prefix2['default'].css + prop;
	    } else {
	      cache[prop] = false;
	    }
	
	  return cache[prop];
	}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = supportedValue;
	
	var _isInBrowser = __webpack_require__(25);
	
	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);
	
	var _prefix = __webpack_require__(45);
	
	var _prefix2 = _interopRequireDefault(_prefix);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var cache = {};
	var el = void 0;
	
	if (_isInBrowser2['default']) el = document.createElement('p');
	
	/**
	 * Returns prefixed value if needed. Returns `false` if value is not supported.
	 *
	 * @param {String} property
	 * @param {String} value
	 * @return {String|Boolean}
	 * @api public
	 */
	function supportedValue(property, value) {
	  // For server-side rendering.
	  if (!el) return value;
	
	  // It is a string or a number as a string like '1'.
	  // We want only prefixable values here.
	  if (typeof value !== 'string' || !isNaN(parseInt(value, 10))) return value;
	
	  var cacheKey = property + value;
	
	  if (cache[cacheKey] != null) return cache[cacheKey];
	
	  // IE can even throw an error in some cases, for e.g. style.content = 'bar'
	  try {
	    // Test value as it is.
	    el.style[property] = value;
	  } catch (err) {
	    cache[cacheKey] = false;
	    return false;
	  }
	
	  // Value is supported as it is.
	  if (el.style[property] !== '') {
	    cache[cacheKey] = value;
	  } else {
	    // Test value with vendor prefix.
	    value = _prefix2['default'].css + value;
	
	    // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.
	    if (value === '-ms-flex') value = '-ms-flexbox';
	
	    el.style[property] = value;
	
	    // Value is supported with vendor prefix.
	    if (el.style[property] !== '') cache[cacheKey] = value;
	  }
	
	  if (!cache[cacheKey]) cache[cacheKey] = false;
	
	  // Reset style value.
	  el.style[property] = '';
	
	  return cache[cacheKey];
	}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(120);
	var isArguments = __webpack_require__(119);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ }),
/* 119 */
/***/ (function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }),
/* 120 */
/***/ (function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Based on code that is Copyright 2013-2015, Facebook, Inc.
	  All rights reserved.
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var canUseDOM = !!(
			typeof window !== 'undefined' &&
			window.document &&
			window.document.createElement
		);
	
		var ExecutionEnvironment = {
	
			canUseDOM: canUseDOM,
	
			canUseWorkers: typeof Worker !== 'undefined',
	
			canUseEventListeners:
				canUseDOM && !!(window.addEventListener || window.attachEvent),
	
			canUseViewport: canUseDOM && !!window.screen
	
		};
	
		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return ExecutionEnvironment;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = ExecutionEnvironment;
		} else {
			window.ExecutionEnvironment = ExecutionEnvironment;
		}
	
	}());


/***/ }),
/* 122 */,
/* 123 */
/***/ (function(module, exports) {

	'use strict';
	
	var uppercasePattern = /[A-Z]/g;
	var msPattern = /^ms-/;
	var cache = {};
	
	function hyphenateStyleName(string) {
	    return string in cache
	    ? cache[string]
	    : cache[string] = string
	      .replace(uppercasePattern, '-$&')
	      .toLowerCase()
	      .replace(msPattern, '-ms-');
	}
	
	module.exports = hyphenateStyleName;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = camelCase;
	
	var _hyphenateStyleName = __webpack_require__(123);
	
	var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Convert camel cased property names to dash separated.
	 *
	 * @param {Object} style
	 * @return {Object}
	 */
	function convertCase(style) {
	  var converted = {};
	
	  for (var prop in style) {
	    converted[(0, _hyphenateStyleName2['default'])(prop)] = style[prop];
	  }
	
	  if (style.fallbacks) {
	    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
	  }
	
	  return converted;
	}
	
	/**
	 * Allow camel cased property names by converting them back to dasherized.
	 *
	 * @param {Rule} rule
	 */
	function camelCase() {
	  function onProcessStyle(style) {
	    if (Array.isArray(style)) {
	      // Handle rules like @font-face, which can have multiple styles in an array
	      for (var index = 0; index < style.length; index++) {
	        style[index] = convertCase(style[index]);
	      }
	      return style;
	    }
	
	    return convertCase(style);
	  }
	
	  function onChangeValue(value, prop, rule) {
	    var hyphenatedProp = (0, _hyphenateStyleName2['default'])(prop);
	
	    // There was no camel case in place
	    if (prop === hyphenatedProp) return value;
	
	    rule.prop(hyphenatedProp, value);
	
	    // Core will ignore that property value we set the proper one above.
	    return null;
	  }
	
	  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}

/***/ }),
/* 125 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Generated jss-default-unit CSS property units
	 *
	 * @type object
	 */
	exports['default'] = {
	  'animation-delay': 'ms',
	  'animation-duration': 'ms',
	  'background-position': 'px',
	  'background-position-x': 'px',
	  'background-position-y': 'px',
	  'background-size': 'px',
	  border: 'px',
	  'border-bottom': 'px',
	  'border-bottom-left-radius': 'px',
	  'border-bottom-right-radius': 'px',
	  'border-bottom-width': 'px',
	  'border-left': 'px',
	  'border-left-width': 'px',
	  'border-radius': 'px',
	  'border-right': 'px',
	  'border-right-width': 'px',
	  'border-spacing': 'px',
	  'border-top': 'px',
	  'border-top-left-radius': 'px',
	  'border-top-right-radius': 'px',
	  'border-top-width': 'px',
	  'border-width': 'px',
	  'border-after-width': 'px',
	  'border-before-width': 'px',
	  'border-end-width': 'px',
	  'border-horizontal-spacing': 'px',
	  'border-start-width': 'px',
	  'border-vertical-spacing': 'px',
	  bottom: 'px',
	  'box-shadow': 'px',
	  'column-gap': 'px',
	  'column-rule': 'px',
	  'column-rule-width': 'px',
	  'column-width': 'px',
	  'flex-basis': 'px',
	  'font-size': 'px',
	  'font-size-delta': 'px',
	  height: 'px',
	  left: 'px',
	  'letter-spacing': 'px',
	  'logical-height': 'px',
	  'logical-width': 'px',
	  margin: 'px',
	  'margin-after': 'px',
	  'margin-before': 'px',
	  'margin-bottom': 'px',
	  'margin-left': 'px',
	  'margin-right': 'px',
	  'margin-top': 'px',
	  'max-height': 'px',
	  'max-width': 'px',
	  'margin-end': 'px',
	  'margin-start': 'px',
	  'mask-position-x': 'px',
	  'mask-position-y': 'px',
	  'mask-size': 'px',
	  'max-logical-height': 'px',
	  'max-logical-width': 'px',
	  'min-height': 'px',
	  'min-width': 'px',
	  'min-logical-height': 'px',
	  'min-logical-width': 'px',
	  motion: 'px',
	  'motion-offset': 'px',
	  outline: 'px',
	  'outline-offset': 'px',
	  'outline-width': 'px',
	  padding: 'px',
	  'padding-bottom': 'px',
	  'padding-left': 'px',
	  'padding-right': 'px',
	  'padding-top': 'px',
	  'padding-after': 'px',
	  'padding-before': 'px',
	  'padding-end': 'px',
	  'padding-start': 'px',
	  'perspective-origin-x': '%',
	  'perspective-origin-y': '%',
	  perspective: 'px',
	  right: 'px',
	  'shape-margin': 'px',
	  size: 'px',
	  'text-indent': 'px',
	  'text-stroke': 'px',
	  'text-stroke-width': 'px',
	  top: 'px',
	  'transform-origin': '%',
	  'transform-origin-x': '%',
	  'transform-origin-y': '%',
	  'transform-origin-z': '%',
	  'transition-delay': 'ms',
	  'transition-duration': 'ms',
	  'vertical-align': 'px',
	  width: 'px',
	  'word-spacing': 'px',
	  // Not existing properties.
	  // Used to avoid issues with jss-expand intergration.
	  'box-shadow-x': 'px',
	  'box-shadow-y': 'px',
	  'box-shadow-blur': 'px',
	  'box-shadow-spread': 'px',
	  'font-line-height': 'px',
	  'text-shadow-x': 'px',
	  'text-shadow-y': 'px',
	  'text-shadow-blur': 'px'
	};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports['default'] = defaultUnit;
	
	var _defaultUnits = __webpack_require__(125);
	
	var _defaultUnits2 = _interopRequireDefault(_defaultUnits);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Clones the object and adds a camel cased property version.
	 */
	function addCamelCasedVersion(obj) {
	  var regExp = /(-[a-z])/g;
	  var replace = function replace(str) {
	    return str[1].toUpperCase();
	  };
	  var newObj = {};
	  for (var key in obj) {
	    newObj[key] = obj[key];
	    newObj[key.replace(regExp, replace)] = obj[key];
	  }
	  return newObj;
	}
	
	var units = addCamelCasedVersion(_defaultUnits2['default']);
	
	/**
	 * Recursive deep style passing function
	 *
	 * @param {String} current property
	 * @param {(Object|Array|Number|String)} property value
	 * @param {Object} options
	 * @return {(Object|Array|Number|String)} resulting value
	 */
	function iterate(prop, value, options) {
	  if (!value) return value;
	
	  var convertedValue = value;
	
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type === 'object' && Array.isArray(value)) type = 'array';
	
	  switch (type) {
	    case 'object':
	      if (prop === 'fallbacks') {
	        for (var innerProp in value) {
	          value[innerProp] = iterate(innerProp, value[innerProp], options);
	        }
	        break;
	      }
	      for (var _innerProp in value) {
	        value[_innerProp] = iterate(prop + '-' + _innerProp, value[_innerProp], options);
	      }
	      break;
	    case 'array':
	      for (var i = 0; i < value.length; i++) {
	        value[i] = iterate(prop, value[i], options);
	      }
	      break;
	    case 'number':
	      if (value !== 0) {
	        convertedValue = value + (options[prop] || units[prop] || '');
	      }
	      break;
	    default:
	      break;
	  }
	
	  return convertedValue;
	}
	
	/**
	 * Add unit to numeric values.
	 */
	function defaultUnit() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var camelCasedOptions = addCamelCasedVersion(options);
	
	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;
	
	    for (var prop in style) {
	      style[prop] = iterate(prop, style[prop], camelCasedOptions);
	    }
	
	    return style;
	  }
	
	  function onChangeValue(value, prop) {
	    return iterate(prop, value, camelCasedOptions);
	  }
	
	  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports['default'] = jssGlobal;
	
	var _jss = __webpack_require__(54);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var propKey = '@global';
	var prefixKey = '@global ';
	
	var GlobalContainerRule = function () {
	  function GlobalContainerRule(key, styles, options) {
	    _classCallCheck(this, GlobalContainerRule);
	
	    this.type = 'global';
	
	    this.key = key;
	    this.options = options;
	    this.rules = new _jss.RuleList(_extends({}, options, {
	      parent: this
	    }));
	
	    for (var selector in styles) {
	      this.rules.add(selector, styles[selector], { selector: selector });
	    }
	
	    this.rules.process();
	  }
	
	  /**
	   * Get a rule.
	   */
	
	
	  _createClass(GlobalContainerRule, [{
	    key: 'getRule',
	    value: function getRule(name) {
	      return this.rules.get(name);
	    }
	
	    /**
	     * Create and register rule, run plugins.
	     */
	
	  }, {
	    key: 'addRule',
	    value: function addRule(name, style, options) {
	      var rule = this.rules.add(name, style, options);
	      this.options.jss.plugins.onProcessRule(rule);
	      return rule;
	    }
	
	    /**
	     * Get index of a rule.
	     */
	
	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.rules.indexOf(rule);
	    }
	
	    /**
	     * Generates a CSS string.
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this.rules.toString();
	    }
	  }]);
	
	  return GlobalContainerRule;
	}();
	
	var GlobalPrefixedRule = function () {
	  function GlobalPrefixedRule(name, style, options) {
	    _classCallCheck(this, GlobalPrefixedRule);
	
	    this.name = name;
	    this.options = options;
	    var selector = name.substr(prefixKey.length);
	    this.rule = options.jss.createRule(selector, style, _extends({}, options, {
	      parent: this,
	      selector: selector
	    }));
	  }
	
	  _createClass(GlobalPrefixedRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      return this.rule.toString(options);
	    }
	  }]);
	
	  return GlobalPrefixedRule;
	}();
	
	var separatorRegExp = /\s*,\s*/g;
	
	function addScope(selector, scope) {
	  var parts = selector.split(separatorRegExp);
	  var scoped = '';
	  for (var i = 0; i < parts.length; i++) {
	    scoped += scope + ' ' + parts[i].trim();
	    if (parts[i + 1]) scoped += ', ';
	  }
	  return scoped;
	}
	
	function handleNestedGlobalContainerRule(rule) {
	  var options = rule.options,
	      style = rule.style;
	
	  var rules = style[propKey];
	
	  if (!rules) return;
	
	  for (var name in rules) {
	    options.sheet.addRule(name, rules[name], _extends({}, options, {
	      selector: addScope(name, rule.selector)
	    }));
	  }
	
	  delete style[propKey];
	}
	
	function handlePrefixedGlobalRule(rule) {
	  var options = rule.options,
	      style = rule.style;
	
	  for (var prop in style) {
	    if (prop.substr(0, propKey.length) !== propKey) continue;
	
	    var selector = addScope(prop.substr(propKey.length), rule.selector);
	    options.sheet.addRule(selector, style[prop], _extends({}, options, {
	      selector: selector
	    }));
	    delete style[prop];
	  }
	}
	
	/**
	 * Convert nested rules to separate, remove them from original styles.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssGlobal() {
	  function onCreateRule(name, styles, options) {
	    if (name === propKey) {
	      return new GlobalContainerRule(name, styles, options);
	    }
	
	    if (name[0] === '@' && name.substr(0, prefixKey.length) === prefixKey) {
	      return new GlobalPrefixedRule(name, styles, options);
	    }
	
	    var parent = options.parent;
	
	
	    if (parent) {
	      if (parent.type === 'global' || parent.options.parent.type === 'global') {
	        options.global = true;
	      }
	    }
	
	    if (options.global) options.selector = name;
	
	    return null;
	  }
	
	  function onProcessRule(rule) {
	    if (rule.type !== 'style') return;
	
	    handleNestedGlobalContainerRule(rule);
	    handlePrefixedGlobalRule(rule);
	  }
	
	  return { onCreateRule: onCreateRule, onProcessRule: onProcessRule };
	}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = jssNested;
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var separatorRegExp = /\s*,\s*/g;
	var parentRegExp = /&/g;
	var refRegExp = /\$([\w-]+)/g;
	
	/**
	 * Convert nested rules to separate, remove them from original styles.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssNested() {
	  // Get a function to be used for $ref replacement.
	  function getReplaceRef(container) {
	    return function (match, key) {
	      var rule = container.getRule(key);
	      if (rule) return rule.selector;
	      (0, _warning2.default)(false, '[JSS] Could not find the referenced rule %s in %s.', key, container.options.meta || container);
	      return key;
	    };
	  }
	
	  var hasAnd = function hasAnd(str) {
	    return str.indexOf('&') !== -1;
	  };
	
	  function replaceParentRefs(nestedProp, parentProp) {
	    var parentSelectors = parentProp.split(separatorRegExp);
	    var nestedSelectors = nestedProp.split(separatorRegExp);
	
	    var result = '';
	
	    for (var i = 0; i < parentSelectors.length; i++) {
	      var parent = parentSelectors[i];
	
	      for (var j = 0; j < nestedSelectors.length; j++) {
	        var nested = nestedSelectors[j];
	        if (result) result += ', ';
	        // Replace all & by the parent or prefix & with the parent.
	        result += hasAnd(nested) ? nested.replace(parentRegExp, parent) : parent + ' ' + nested;
	      }
	    }
	
	    return result;
	  }
	
	  function getOptions(rule, container, options) {
	    // Options has been already created, now we only increase index.
	    if (options) return _extends({}, options, { index: options.index + 1 });
	
	    var nestingLevel = rule.options.nestingLevel;
	
	    nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;
	
	    return _extends({}, rule.options, {
	      nestingLevel: nestingLevel,
	      index: container.indexOf(rule) + 1
	    });
	  }
	
	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;
	    var container = rule.options.parent;
	    var options = void 0;
	    var replaceRef = void 0;
	    for (var prop in style) {
	      var isNested = hasAnd(prop);
	      var isNestedConditional = prop[0] === '@';
	
	      if (!isNested && !isNestedConditional) continue;
	
	      options = getOptions(rule, container, options);
	
	      if (isNested) {
	        var selector = replaceParentRefs(prop, rule.selector
	        // Lazily create the ref replacer function just once for
	        // all nested rules within the sheet.
	        );if (!replaceRef) replaceRef = getReplaceRef(container
	        // Replace all $refs.
	        );selector = selector.replace(refRegExp, replaceRef);
	
	        container.addRule(selector, style[prop], _extends({}, options, { selector: selector }));
	      } else if (isNestedConditional) {
	        container
	        // Place conditional right after the parent rule to ensure right ordering.
	        .addRule(prop, null, options).addRule(rule.key, style[prop], { selector: rule.selector });
	      }
	
	      delete style[prop];
	    }
	
	    return style;
	  }
	
	  return { onProcessStyle: onProcessStyle };
	}

/***/ }),
/* 129 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = jssPropsSort;
	/**
	 * Sort props by length.
	 */
	function jssPropsSort() {
	  function sort(prop0, prop1) {
	    return prop0.length - prop1.length;
	  }
	
	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;
	
	    var newStyle = {};
	    var props = Object.keys(style).sort(sort);
	    for (var prop in props) {
	      newStyle[props[prop]] = style[props[prop]];
	    }
	    return newStyle;
	  }
	
	  return { onProcessStyle: onProcessStyle };
	}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = jssVendorPrefixer;
	
	var _cssVendor = __webpack_require__(115);
	
	var vendor = _interopRequireWildcard(_cssVendor);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	/**
	 * Add vendor prefix to a property name when needed.
	 *
	 * @param {Rule} rule
	 * @api public
	 */
	function jssVendorPrefixer() {
	  function onProcessRule(rule) {
	    if (rule.type === 'keyframes') {
	      rule.key = '@' + vendor.prefix.css + rule.key.substr(1);
	    }
	  }
	
	  function onProcessStyle(style, rule) {
	    if (rule.type !== 'style') return style;
	
	    for (var prop in style) {
	      var value = style[prop];
	
	      var changeProp = false;
	      var supportedProp = vendor.supportedProperty(prop);
	      if (supportedProp && supportedProp !== prop) changeProp = true;
	
	      var changeValue = false;
	      var supportedValue = vendor.supportedValue(supportedProp, value);
	      if (supportedValue && supportedValue !== value) changeValue = true;
	
	      if (changeProp || changeValue) {
	        if (changeProp) delete style[prop];
	        style[supportedProp || prop] = supportedValue || value;
	      }
	    }
	
	    return style;
	  }
	
	  function onChangeValue(value, prop) {
	    return vendor.supportedValue(prop, value);
	  }
	
	  return { onProcessRule: onProcessRule, onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };
	}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _isInBrowser = __webpack_require__(25);
	
	var _isInBrowser2 = _interopRequireDefault(_isInBrowser);
	
	var _StyleSheet = __webpack_require__(64);
	
	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);
	
	var _PluginsRegistry = __webpack_require__(132);
	
	var _PluginsRegistry2 = _interopRequireDefault(_PluginsRegistry);
	
	var _rules = __webpack_require__(136);
	
	var _rules2 = _interopRequireDefault(_rules);
	
	var _observables = __webpack_require__(135);
	
	var _observables2 = _interopRequireDefault(_observables);
	
	var _functions = __webpack_require__(134);
	
	var _functions2 = _interopRequireDefault(_functions);
	
	var _sheets = __webpack_require__(46);
	
	var _sheets2 = _interopRequireDefault(_sheets);
	
	var _StyleRule = __webpack_require__(19);
	
	var _StyleRule2 = _interopRequireDefault(_StyleRule);
	
	var _createGenerateClassName = __webpack_require__(65);
	
	var _createGenerateClassName2 = _interopRequireDefault(_createGenerateClassName);
	
	var _createRule2 = __webpack_require__(26);
	
	var _createRule3 = _interopRequireDefault(_createRule2);
	
	var _DomRenderer = __webpack_require__(137);
	
	var _DomRenderer2 = _interopRequireDefault(_DomRenderer);
	
	var _VirtualRenderer = __webpack_require__(138);
	
	var _VirtualRenderer2 = _interopRequireDefault(_VirtualRenderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultPlugins = _rules2['default'].concat([_observables2['default'], _functions2['default']]);
	
	var instanceCounter = 0;
	
	var Jss = function () {
	  function Jss(options) {
	    _classCallCheck(this, Jss);
	
	    this.id = instanceCounter++;
	    this.version = "9.8.0";
	    this.plugins = new _PluginsRegistry2['default']();
	    this.options = {
	      createGenerateClassName: _createGenerateClassName2['default'],
	      Renderer: _isInBrowser2['default'] ? _DomRenderer2['default'] : _VirtualRenderer2['default'],
	      plugins: []
	    };
	    this.generateClassName = (0, _createGenerateClassName2['default'])();
	
	    // eslint-disable-next-line prefer-spread
	    this.use.apply(this, defaultPlugins);
	    this.setup(options);
	  }
	
	  _createClass(Jss, [{
	    key: 'setup',
	    value: function setup() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      if (options.createGenerateClassName) {
	        this.options.createGenerateClassName = options.createGenerateClassName;
	        // $FlowFixMe
	        this.generateClassName = options.createGenerateClassName();
	      }
	
	      if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;
	      if (options.virtual || options.Renderer) {
	        this.options.Renderer = options.Renderer || (options.virtual ? _VirtualRenderer2['default'] : _DomRenderer2['default']);
	      }
	
	      // eslint-disable-next-line prefer-spread
	      if (options.plugins) this.use.apply(this, options.plugins);
	
	      return this;
	    }
	
	    /**
	     * Create a Style Sheet.
	     */
	
	  }, {
	    key: 'createStyleSheet',
	    value: function createStyleSheet(styles) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var index = options.index;
	      if (typeof index !== 'number') {
	        index = _sheets2['default'].index === 0 ? 0 : _sheets2['default'].index + 1;
	      }
	      var sheet = new _StyleSheet2['default'](styles, _extends({}, options, {
	        jss: this,
	        generateClassName: options.generateClassName || this.generateClassName,
	        insertionPoint: this.options.insertionPoint,
	        Renderer: this.options.Renderer,
	        index: index
	      }));
	      this.plugins.onProcessSheet(sheet);
	
	      return sheet;
	    }
	
	    /**
	     * Detach the Style Sheet and remove it from the registry.
	     */
	
	  }, {
	    key: 'removeStyleSheet',
	    value: function removeStyleSheet(sheet) {
	      sheet.detach();
	      _sheets2['default'].remove(sheet);
	      return this;
	    }
	
	    /**
	     * Create a rule without a Style Sheet.
	     */
	
	  }, {
	    key: 'createRule',
	    value: function createRule(name) {
	      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      // Enable rule without name for inline styles.
	      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	        options = style;
	        style = name;
	        name = undefined;
	      }
	
	      // Cast from RuleFactoryOptions to RuleOptions
	      // https://stackoverflow.com/questions/41328728/force-casting-in-flow
	      var ruleOptions = options;
	
	      ruleOptions.jss = this;
	      ruleOptions.Renderer = this.options.Renderer;
	      if (!ruleOptions.generateClassName) ruleOptions.generateClassName = this.generateClassName;
	      if (!ruleOptions.classes) ruleOptions.classes = {};
	      var rule = (0, _createRule3['default'])(name, style, ruleOptions);
	
	      if (!ruleOptions.selector && rule instanceof _StyleRule2['default']) {
	        rule.selector = '.' + ruleOptions.generateClassName(rule);
	      }
	
	      this.plugins.onProcessRule(rule);
	
	      return rule;
	    }
	
	    /**
	     * Register plugin. Passed function will be invoked with a rule instance.
	     */
	
	  }, {
	    key: 'use',
	    value: function use() {
	      var _this = this;
	
	      for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
	        plugins[_key] = arguments[_key];
	      }
	
	      plugins.forEach(function (plugin) {
	        // Avoids applying same plugin twice, at least based on ref.
	        if (_this.options.plugins.indexOf(plugin) === -1) {
	          _this.options.plugins.push(plugin);
	          _this.plugins.use(plugin);
	        }
	      });
	
	      return this;
	    }
	  }]);
	
	  return Jss;
	}();
	
	exports['default'] = Jss;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PluginsRegistry = function () {
	  function PluginsRegistry() {
	    _classCallCheck(this, PluginsRegistry);
	
	    this.hooks = {
	      onCreateRule: [],
	      onProcessRule: [],
	      onProcessStyle: [],
	      onProcessSheet: [],
	      onChangeValue: [],
	      onUpdate: []
	
	      /**
	       * Call `onCreateRule` hooks and return an object if returned by a hook.
	       */
	    };
	  }
	
	  _createClass(PluginsRegistry, [{
	    key: 'onCreateRule',
	    value: function onCreateRule(name, decl, options) {
	      for (var i = 0; i < this.hooks.onCreateRule.length; i++) {
	        var rule = this.hooks.onCreateRule[i](name, decl, options);
	        if (rule) return rule;
	      }
	      return null;
	    }
	
	    /**
	     * Call `onProcessRule` hooks.
	     */
	
	  }, {
	    key: 'onProcessRule',
	    value: function onProcessRule(rule) {
	      if (rule.isProcessed) return;
	      var sheet = rule.options.sheet;
	
	      for (var i = 0; i < this.hooks.onProcessRule.length; i++) {
	        this.hooks.onProcessRule[i](rule, sheet);
	      }
	
	      // $FlowFixMe
	      if (rule.style) this.onProcessStyle(rule.style, rule, sheet);
	
	      rule.isProcessed = true;
	    }
	
	    /**
	     * Call `onProcessStyle` hooks.
	     */
	
	  }, {
	    key: 'onProcessStyle',
	    value: function onProcessStyle(style, rule, sheet) {
	      var nextStyle = style;
	
	      for (var i = 0; i < this.hooks.onProcessStyle.length; i++) {
	        nextStyle = this.hooks.onProcessStyle[i](nextStyle, rule, sheet);
	        // $FlowFixMe
	        rule.style = nextStyle;
	      }
	    }
	
	    /**
	     * Call `onProcessSheet` hooks.
	     */
	
	  }, {
	    key: 'onProcessSheet',
	    value: function onProcessSheet(sheet) {
	      for (var i = 0; i < this.hooks.onProcessSheet.length; i++) {
	        this.hooks.onProcessSheet[i](sheet);
	      }
	    }
	
	    /**
	     * Call `onUpdate` hooks.
	     */
	
	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(data, rule, sheet) {
	      for (var i = 0; i < this.hooks.onUpdate.length; i++) {
	        this.hooks.onUpdate[i](data, rule, sheet);
	      }
	    }
	
	    /**
	     * Call `onChangeValue` hooks.
	     */
	
	  }, {
	    key: 'onChangeValue',
	    value: function onChangeValue(value, prop, rule) {
	      var processedValue = value;
	      for (var i = 0; i < this.hooks.onChangeValue.length; i++) {
	        processedValue = this.hooks.onChangeValue[i](processedValue, prop, rule);
	      }
	      return processedValue;
	    }
	
	    /**
	     * Register a plugin.
	     * If function is passed, it is a shortcut for `{onProcessRule}`.
	     */
	
	  }, {
	    key: 'use',
	    value: function use(plugin) {
	      for (var name in plugin) {
	        if (this.hooks[name]) this.hooks[name].push(plugin[name]);else (0, _warning2['default'])(false, '[JSS] Unknown hook "%s".', name);
	      }
	    }
	  }]);
	
	  return PluginsRegistry;
	}();
	
	exports['default'] = PluginsRegistry;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * SheetsManager is like a WeakMap which is designed to count StyleSheet
	 * instances and attach/detach automatically.
	 */
	var SheetsManager = function () {
	  function SheetsManager() {
	    _classCallCheck(this, SheetsManager);
	
	    this.sheets = [];
	    this.refs = [];
	    this.keys = [];
	  }
	
	  _createClass(SheetsManager, [{
	    key: 'get',
	    value: function get(key) {
	      var index = this.keys.indexOf(key);
	      return this.sheets[index];
	    }
	  }, {
	    key: 'add',
	    value: function add(key, sheet) {
	      var sheets = this.sheets,
	          refs = this.refs,
	          keys = this.keys;
	
	      var index = sheets.indexOf(sheet);
	
	      if (index !== -1) return index;
	
	      sheets.push(sheet);
	      refs.push(0);
	      keys.push(key);
	
	      return sheets.length - 1;
	    }
	  }, {
	    key: 'manage',
	    value: function manage(key) {
	      var index = this.keys.indexOf(key);
	      var sheet = this.sheets[index];
	      if (this.refs[index] === 0) sheet.attach();
	      this.refs[index]++;
	      if (!this.keys[index]) this.keys.splice(index, 0, key);
	      return sheet;
	    }
	  }, {
	    key: 'unmanage',
	    value: function unmanage(key) {
	      var index = this.keys.indexOf(key);
	      if (index === -1) {
	        // eslint-ignore-next-line no-console
	        (0, _warning2['default'])(false, "SheetsManager: can't find sheet to unmanage");
	        return;
	      }
	      if (this.refs[index] > 0) {
	        this.refs[index]--;
	        if (this.refs[index] === 0) this.sheets[index].detach();
	      }
	    }
	  }, {
	    key: 'size',
	    get: function get() {
	      return this.keys.length;
	    }
	  }]);
	
	  return SheetsManager;
	}();
	
	exports['default'] = SheetsManager;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _RuleList = __webpack_require__(20);
	
	var _RuleList2 = _interopRequireDefault(_RuleList);
	
	var _StyleRule = __webpack_require__(19);
	
	var _StyleRule2 = _interopRequireDefault(_StyleRule);
	
	var _createRule = __webpack_require__(26);
	
	var _createRule2 = _interopRequireDefault(_createRule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// A symbol replacement.
	var now = Date.now();
	
	var fnValuesNs = 'fnValues' + now;
	var fnStyleNs = 'fnStyle' + ++now;
	
	exports['default'] = {
	  onCreateRule: function onCreateRule(name, decl, options) {
	    if (typeof decl !== 'function') return null;
	    var rule = (0, _createRule2['default'])(name, {}, options);
	    rule[fnStyleNs] = decl;
	    return rule;
	  },
	  onProcessStyle: function onProcessStyle(style, rule) {
	    var fn = {};
	    for (var prop in style) {
	      var value = style[prop];
	      if (typeof value !== 'function') continue;
	      delete style[prop];
	      fn[prop] = value;
	    }
	    rule = rule;
	    rule[fnValuesNs] = fn;
	    return style;
	  },
	  onUpdate: function onUpdate(data, rule) {
	    // It is a rules container like for e.g. ConditionalRule.
	    if (rule.rules instanceof _RuleList2['default']) {
	      rule.rules.update(data);
	      return;
	    }
	    if (!(rule instanceof _StyleRule2['default'])) return;
	
	    rule = rule;
	
	    // If we have a fn values map, it is a rule with function values.
	    if (rule[fnValuesNs]) {
	      for (var prop in rule[fnValuesNs]) {
	        rule.prop(prop, rule[fnValuesNs][prop](data));
	      }
	    }
	
	    rule = rule;
	
	    var fnStyle = rule[fnStyleNs];
	
	    // If we have a style function, the entire rule is dynamic and style object
	    // will be returned from that function.
	    if (fnStyle) {
	      var style = fnStyle(data);
	      for (var _prop in style) {
	        rule.prop(_prop, style[_prop]);
	      }
	    }
	  }
	};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _StyleRule = __webpack_require__(19);
	
	var _StyleRule2 = _interopRequireDefault(_StyleRule);
	
	var _createRule = __webpack_require__(26);
	
	var _createRule2 = _interopRequireDefault(_createRule);
	
	var _isObservable = __webpack_require__(66);
	
	var _isObservable2 = _interopRequireDefault(_isObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = {
	  onCreateRule: function onCreateRule(name, decl, options) {
	    if (!(0, _isObservable2['default'])(decl)) return null;
	
	    // Cast `decl` to `Observable`, since it passed the type guard.
	    var style$ = decl;
	
	    var rule = (0, _createRule2['default'])(name, {}, options);
	
	    // TODO
	    // Call `stream.subscribe()` returns a subscription, which should be explicitly
	    // unsubscribed from when we know this sheet is no longer needed.
	    style$.subscribe(function (style) {
	      for (var prop in style) {
	        rule.prop(prop, style[prop]);
	      }
	    });
	
	    return rule;
	  },
	  onProcessRule: function onProcessRule(rule) {
	    if (!(rule instanceof _StyleRule2['default'])) return;
	    var styleRule = rule;
	    var style = styleRule.style;
	
	    var _loop = function _loop(prop) {
	      var value = style[prop];
	      if (!(0, _isObservable2['default'])(value)) return 'continue';
	      delete style[prop];
	      value.subscribe({
	        next: function next(nextValue) {
	          styleRule.prop(prop, nextValue);
	        }
	      });
	    };
	
	    for (var prop in style) {
	      var _ret = _loop(prop);
	
	      if (_ret === 'continue') continue;
	    }
	  }
	};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _SimpleRule = __webpack_require__(142);
	
	var _SimpleRule2 = _interopRequireDefault(_SimpleRule);
	
	var _KeyframesRule = __webpack_require__(141);
	
	var _KeyframesRule2 = _interopRequireDefault(_KeyframesRule);
	
	var _ConditionalRule = __webpack_require__(139);
	
	var _ConditionalRule2 = _interopRequireDefault(_ConditionalRule);
	
	var _FontFaceRule = __webpack_require__(140);
	
	var _FontFaceRule2 = _interopRequireDefault(_FontFaceRule);
	
	var _ViewportRule = __webpack_require__(143);
	
	var _ViewportRule2 = _interopRequireDefault(_ViewportRule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var classes = {
	  '@charset': _SimpleRule2['default'],
	  '@import': _SimpleRule2['default'],
	  '@namespace': _SimpleRule2['default'],
	  '@keyframes': _KeyframesRule2['default'],
	  '@media': _ConditionalRule2['default'],
	  '@supports': _ConditionalRule2['default'],
	  '@font-face': _FontFaceRule2['default'],
	  '@viewport': _ViewportRule2['default'],
	  '@-ms-viewport': _ViewportRule2['default']
	
	  /**
	   * Generate plugins which will register all rules.
	   */
	};
	exports['default'] = Object.keys(classes).map(function (key) {
	  // https://jsperf.com/indexof-vs-substr-vs-regex-at-the-beginning-3
	  var re = new RegExp('^' + key);
	  var onCreateRule = function onCreateRule(name, decl, options) {
	    return re.test(name) ? new classes[key](name, decl, options) : null;
	  };
	  return { onCreateRule: onCreateRule };
	});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _sheets = __webpack_require__(46);
	
	var _sheets2 = _interopRequireDefault(_sheets);
	
	var _StyleRule = __webpack_require__(19);
	
	var _StyleRule2 = _interopRequireDefault(_StyleRule);
	
	var _toCssValue = __webpack_require__(27);
	
	var _toCssValue2 = _interopRequireDefault(_toCssValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Cache the value from the first time a function is called.
	 */
	var memoize = function memoize(fn) {
	  var value = void 0;
	  return function () {
	    if (!value) value = fn();
	    return value;
	  };
	};
	
	/**
	 * Get a style property value.
	 */
	function getPropertyValue(cssRule, prop) {
	  try {
	    return cssRule.style.getPropertyValue(prop);
	  } catch (err) {
	    // IE may throw if property is unknown.
	    return '';
	  }
	}
	
	/**
	 * Set a style property.
	 */
	function setProperty(cssRule, prop, value) {
	  try {
	    var cssValue = value;
	
	    if (Array.isArray(value)) {
	      cssValue = (0, _toCssValue2['default'])(value, true);
	
	      if (value[value.length - 1] === '!important') {
	        cssRule.style.setProperty(prop, cssValue, 'important');
	        return true;
	      }
	    }
	
	    cssRule.style.setProperty(prop, cssValue);
	  } catch (err) {
	    // IE may throw if property is unknown.
	    return false;
	  }
	  return true;
	}
	
	/**
	 * Remove a style property.
	 */
	function removeProperty(cssRule, prop) {
	  try {
	    cssRule.style.removeProperty(prop);
	  } catch (err) {
	    (0, _warning2['default'])(false, '[JSS] DOMException "%s" was thrown. Tried to remove property "%s".', err.message, prop);
	  }
	}
	
	var CSSRuleTypes = {
	  STYLE_RULE: 1,
	  KEYFRAMES_RULE: 7
	
	  /**
	   * Get the CSS Rule key.
	   */
	
	};var getKey = function () {
	  var extractKey = function extractKey(cssText) {
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    return cssText.substr(from, cssText.indexOf('{') - 1);
	  };
	
	  return function (cssRule) {
	    if (cssRule.type === CSSRuleTypes.STYLE_RULE) return cssRule.selectorText;
	    if (cssRule.type === CSSRuleTypes.KEYFRAMES_RULE) {
	      var name = cssRule.name;
	
	      if (name) return '@keyframes ' + name;
	
	      // There is no rule.name in the following browsers:
	      // - IE 9
	      // - Safari 7.1.8
	      // - Mobile Safari 9.0.0
	      var cssText = cssRule.cssText;
	
	      return '@' + extractKey(cssText, cssText.indexOf('keyframes'));
	    }
	
	    // Conditionals.
	    return extractKey(cssRule.cssText);
	  };
	}();
	
	/**
	 * Set the selector.
	 */
	function setSelector(cssRule, selectorText) {
	  cssRule.selectorText = selectorText;
	
	  // Return false if setter was not successful.
	  // Currently works in chrome only.
	  return cssRule.selectorText === selectorText;
	}
	
	/**
	 * Gets the `head` element upon the first call and caches it.
	 */
	var getHead = memoize(function () {
	  return document.head || document.getElementsByTagName('head')[0];
	});
	
	/**
	 * Gets a map of rule keys, where the property is an unescaped key and value
	 * is a potentially escaped one.
	 * It is used to identify CSS rules and the corresponding JSS rules. As an identifier
	 * for CSSStyleRule we normally use `selectorText`. Though if original selector text
	 * contains escaped code points e.g. `:not(#\\20)`, CSSOM will compile it to `:not(# )`
	 * and so CSS rule's `selectorText` won't match JSS rule selector.
	 *
	 * https://www.w3.org/International/questions/qa-escapes#cssescapes
	 */
	var getUnescapedKeysMap = function () {
	  var style = void 0;
	  var isAttached = false;
	
	  return function (rules) {
	    var map = {};
	    // https://github.com/facebook/flow/issues/2696
	    if (!style) style = document.createElement('style');
	    for (var i = 0; i < rules.length; i++) {
	      var rule = rules[i];
	      if (!(rule instanceof _StyleRule2['default'])) continue;
	      var selector = rule.selector;
	      // Only unescape selector over CSSOM if it contains a back slash.
	
	      if (selector && selector.indexOf('\\') !== -1) {
	        // Lazilly attach when needed.
	        if (!isAttached) {
	          getHead().appendChild(style);
	          isAttached = true;
	        }
	        style.textContent = selector + ' {}';
	        var _style = style,
	            sheet = _style.sheet;
	
	        if (sheet) {
	          var cssRules = sheet.cssRules;
	
	          if (cssRules) map[cssRules[0].selectorText] = rule.key;
	        }
	      }
	    }
	    if (isAttached) {
	      getHead().removeChild(style);
	      isAttached = false;
	    }
	    return map;
	  };
	}();
	
	/**
	 * Find attached sheet with an index higher than the passed one.
	 */
	function findHigherSheet(registry, options) {
	  for (var i = 0; i < registry.length; i++) {
	    var sheet = registry[i];
	    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
	      return sheet;
	    }
	  }
	  return null;
	}
	
	/**
	 * Find attached sheet with the highest index.
	 */
	function findHighestSheet(registry, options) {
	  for (var i = registry.length - 1; i >= 0; i--) {
	    var sheet = registry[i];
	    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
	      return sheet;
	    }
	  }
	  return null;
	}
	
	/**
	 * Find a comment with "jss" inside.
	 */
	function findCommentNode(text) {
	  var head = getHead();
	  for (var i = 0; i < head.childNodes.length; i++) {
	    var node = head.childNodes[i];
	    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
	      return node;
	    }
	  }
	  return null;
	}
	
	/**
	 * Find a node before which we can insert the sheet.
	 */
	function findPrevNode(options) {
	  var registry = _sheets2['default'].registry;
	
	
	  if (registry.length > 0) {
	    // Try to insert before the next higher sheet.
	    var sheet = findHigherSheet(registry, options);
	    if (sheet) return sheet.renderer.element;
	
	    // Otherwise insert after the last attached.
	    sheet = findHighestSheet(registry, options);
	    if (sheet) return sheet.renderer.element.nextElementSibling;
	  }
	
	  // Try to find a comment placeholder if registry is empty.
	  var insertionPoint = options.insertionPoint;
	
	  if (insertionPoint && typeof insertionPoint === 'string') {
	    var comment = findCommentNode(insertionPoint);
	    if (comment) return comment.nextSibling;
	    // If user specifies an insertion point and it can't be found in the document -
	    // bad specificity issues may appear.
	    (0, _warning2['default'])(insertionPoint === 'jss', '[JSS] Insertion point "%s" not found.', insertionPoint);
	  }
	
	  return null;
	}
	
	/**
	 * Insert style element into the DOM.
	 */
	function insertStyle(style, options) {
	  var insertionPoint = options.insertionPoint;
	
	  var prevNode = findPrevNode(options);
	
	  if (prevNode) {
	    var parentNode = prevNode.parentNode;
	
	    if (parentNode) parentNode.insertBefore(style, prevNode);
	    return;
	  }
	
	  // Works with iframes and any node types.
	  if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
	    // https://stackoverflow.com/questions/41328728/force-casting-in-flow
	    var insertionPointElement = insertionPoint;
	    var _parentNode = insertionPointElement.parentNode;
	
	    if (_parentNode) _parentNode.insertBefore(style, insertionPointElement.nextSibling);else (0, _warning2['default'])(false, '[JSS] Insertion point is not in the DOM.');
	    return;
	  }
	
	  getHead().insertBefore(style, prevNode);
	}
	
	/**
	 * Read jss nonce setting from the page if the user has set it.
	 */
	var getNonce = memoize(function () {
	  var node = document.querySelector('meta[property="csp-nonce"]');
	  return node ? node.getAttribute('content') : null;
	});
	
	var DomRenderer = function () {
	  function DomRenderer(sheet) {
	    _classCallCheck(this, DomRenderer);
	
	    this.getPropertyValue = getPropertyValue;
	    this.setProperty = setProperty;
	    this.removeProperty = removeProperty;
	    this.setSelector = setSelector;
	    this.getKey = getKey;
	    this.getUnescapedKeysMap = getUnescapedKeysMap;
	    this.hasInsertedRules = false;
	
	    // There is no sheet when the renderer is used from a standalone StyleRule.
	    if (sheet) _sheets2['default'].add(sheet);
	
	    this.sheet = sheet;
	
	    var _ref = this.sheet ? this.sheet.options : {},
	        media = _ref.media,
	        meta = _ref.meta,
	        element = _ref.element;
	
	    this.element = element || document.createElement('style');
	    this.element.type = 'text/css';
	    this.element.setAttribute('data-jss', '');
	    if (media) this.element.setAttribute('media', media);
	    if (meta) this.element.setAttribute('data-meta', meta);
	    var nonce = getNonce();
	    if (nonce) this.element.setAttribute('nonce', nonce);
	  }
	
	  /**
	   * Insert style element into render tree.
	   */
	
	
	  // HTMLStyleElement needs fixing https://github.com/facebook/flow/issues/2696
	
	
	  _createClass(DomRenderer, [{
	    key: 'attach',
	    value: function attach() {
	      // In the case the element node is external and it is already in the DOM.
	      if (this.element.parentNode || !this.sheet) return;
	
	      // When rules are inserted using `insertRule` API, after `sheet.detach().attach()`
	      // browsers remove those rules.
	      // TODO figure out if its a bug and if it is known.
	      // Workaround is to redeploy the sheet before attaching as a string.
	      if (this.hasInsertedRules) {
	        this.deploy();
	        this.hasInsertedRules = false;
	      }
	
	      insertStyle(this.element, this.sheet.options);
	    }
	
	    /**
	     * Remove style element from render tree.
	     */
	
	  }, {
	    key: 'detach',
	    value: function detach() {
	      this.element.parentNode.removeChild(this.element);
	    }
	
	    /**
	     * Inject CSS string into element.
	     */
	
	  }, {
	    key: 'deploy',
	    value: function deploy() {
	      if (!this.sheet) return;
	      this.element.textContent = '\n' + this.sheet.toString() + '\n';
	    }
	
	    /**
	     * Insert a rule into element.
	     */
	
	  }, {
	    key: 'insertRule',
	    value: function insertRule(rule, index) {
	      var sheet = this.element.sheet;
	      var cssRules = sheet.cssRules;
	
	      var str = rule.toString();
	      if (!index) index = cssRules.length;
	
	      if (!str) return false;
	
	      try {
	        sheet.insertRule(str, index);
	      } catch (err) {
	        (0, _warning2['default'])(false, '[JSS] Can not insert an unsupported rule \n\r%s', rule);
	        return false;
	      }
	      this.hasInsertedRules = true;
	
	      return cssRules[index];
	    }
	
	    /**
	     * Delete a rule.
	     */
	
	  }, {
	    key: 'deleteRule',
	    value: function deleteRule(cssRule) {
	      var sheet = this.element.sheet;
	
	      var index = this.indexOf(cssRule);
	      if (index === -1) return false;
	      sheet.deleteRule(index);
	      return true;
	    }
	
	    /**
	     * Get index of a CSS Rule.
	     */
	
	  }, {
	    key: 'indexOf',
	    value: function indexOf(cssRule) {
	      var cssRules = this.element.sheet.cssRules;
	
	      for (var _index = 0; _index < cssRules.length; _index++) {
	        if (cssRule === cssRules[_index]) return _index;
	      }
	      return -1;
	    }
	
	    /**
	     * Generate a new CSS rule and replace the existing one.
	     */
	
	  }, {
	    key: 'replaceRule',
	    value: function replaceRule(cssRule, rule) {
	      var index = this.indexOf(cssRule);
	      var newCssRule = this.insertRule(rule, index);
	      this.element.sheet.deleteRule(index);
	      return newCssRule;
	    }
	
	    /**
	     * Get all rules elements.
	     */
	
	  }, {
	    key: 'getRules',
	    value: function getRules() {
	      return this.element.sheet.cssRules;
	    }
	  }]);
	
	  return DomRenderer;
	}();
	
	exports['default'] = DomRenderer;

/***/ }),
/* 138 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* eslint-disable class-methods-use-this */
	
	/**
	 * Rendering backend to do nothing in nodejs.
	 */
	var VirtualRenderer = function () {
	  function VirtualRenderer() {
	    _classCallCheck(this, VirtualRenderer);
	  }
	
	  _createClass(VirtualRenderer, [{
	    key: 'setProperty',
	    value: function setProperty() {
	      return true;
	    }
	  }, {
	    key: 'getPropertyValue',
	    value: function getPropertyValue() {
	      return '';
	    }
	  }, {
	    key: 'removeProperty',
	    value: function removeProperty() {}
	  }, {
	    key: 'setSelector',
	    value: function setSelector() {
	      return true;
	    }
	  }, {
	    key: 'getKey',
	    value: function getKey() {
	      return '';
	    }
	  }, {
	    key: 'attach',
	    value: function attach() {}
	  }, {
	    key: 'detach',
	    value: function detach() {}
	  }, {
	    key: 'deploy',
	    value: function deploy() {}
	  }, {
	    key: 'insertRule',
	    value: function insertRule() {
	      return false;
	    }
	  }, {
	    key: 'deleteRule',
	    value: function deleteRule() {
	      return true;
	    }
	  }, {
	    key: 'replaceRule',
	    value: function replaceRule() {
	      return false;
	    }
	  }, {
	    key: 'getRules',
	    value: function getRules() {}
	  }, {
	    key: 'indexOf',
	    value: function indexOf() {
	      return -1;
	    }
	  }]);
	
	  return VirtualRenderer;
	}();
	
	exports['default'] = VirtualRenderer;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _RuleList = __webpack_require__(20);
	
	var _RuleList2 = _interopRequireDefault(_RuleList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Conditional rule for @media, @supports
	 */
	var ConditionalRule = function () {
	  function ConditionalRule(key, styles, options) {
	    _classCallCheck(this, ConditionalRule);
	
	    this.type = 'conditional';
	    this.isProcessed = false;
	
	    this.key = key;
	    this.options = options;
	    this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));
	
	    for (var name in styles) {
	      this.rules.add(name, styles[name]);
	    }
	
	    this.rules.process();
	  }
	
	  /**
	   * Get a rule.
	   */
	
	
	  _createClass(ConditionalRule, [{
	    key: 'getRule',
	    value: function getRule(name) {
	      return this.rules.get(name);
	    }
	
	    /**
	     * Get index of a rule.
	     */
	
	  }, {
	    key: 'indexOf',
	    value: function indexOf(rule) {
	      return this.rules.indexOf(rule);
	    }
	
	    /**
	     * Create and register rule, run plugins.
	     */
	
	  }, {
	    key: 'addRule',
	    value: function addRule(name, style, options) {
	      var rule = this.rules.add(name, style, options);
	      this.options.jss.plugins.onProcessRule(rule);
	      return rule;
	    }
	
	    /**
	     * Generates a CSS string.
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };
	
	      var inner = this.rules.toString(options);
	      return inner ? this.key + ' {\n' + inner + '\n}' : '';
	    }
	  }]);
	
	  return ConditionalRule;
	}();
	
	exports['default'] = ConditionalRule;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _toCss = __webpack_require__(47);
	
	var _toCss2 = _interopRequireDefault(_toCss);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FontFaceRule = function () {
	  function FontFaceRule(key, style, options) {
	    _classCallCheck(this, FontFaceRule);
	
	    this.type = 'font-face';
	    this.isProcessed = false;
	
	    this.key = key;
	    this.style = style;
	    this.options = options;
	  }
	
	  /**
	   * Generates a CSS string.
	   */
	
	
	  _createClass(FontFaceRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      if (Array.isArray(this.style)) {
	        var str = '';
	        for (var index = 0; index < this.style.length; index++) {
	          str += (0, _toCss2['default'])(this.key, this.style[index]);
	          if (this.style[index + 1]) str += '\n';
	        }
	        return str;
	      }
	
	      return (0, _toCss2['default'])(this.key, this.style, options);
	    }
	  }]);
	
	  return FontFaceRule;
	}();
	
	exports['default'] = FontFaceRule;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _RuleList = __webpack_require__(20);
	
	var _RuleList2 = _interopRequireDefault(_RuleList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Rule for @keyframes
	 */
	var KeyframesRule = function () {
	  function KeyframesRule(key, frames, options) {
	    _classCallCheck(this, KeyframesRule);
	
	    this.type = 'keyframes';
	    this.isProcessed = false;
	
	    this.key = key;
	    this.options = options;
	    this.rules = new _RuleList2['default'](_extends({}, options, { parent: this }));
	
	    for (var name in frames) {
	      this.rules.add(name, frames[name], _extends({}, this.options, {
	        parent: this,
	        selector: name
	      }));
	    }
	
	    this.rules.process();
	  }
	
	  /**
	   * Generates a CSS string.
	   */
	
	
	  _createClass(KeyframesRule, [{
	    key: 'toString',
	    value: function toString() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { indent: 1 };
	
	      var inner = this.rules.toString(options);
	      if (inner) inner += '\n';
	      return this.key + ' {\n' + inner + '}';
	    }
	  }]);
	
	  return KeyframesRule;
	}();
	
	exports['default'] = KeyframesRule;

/***/ }),
/* 142 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimpleRule = function () {
	  function SimpleRule(key, value, options) {
	    _classCallCheck(this, SimpleRule);
	
	    this.type = 'simple';
	    this.isProcessed = false;
	
	    this.key = key;
	    this.value = value;
	    this.options = options;
	  }
	
	  /**
	   * Generates a CSS string.
	   */
	  // eslint-disable-next-line no-unused-vars
	
	
	  _createClass(SimpleRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      if (Array.isArray(this.value)) {
	        var str = '';
	        for (var index = 0; index < this.value.length; index++) {
	          str += this.key + ' ' + this.value[index] + ';';
	          if (this.value[index + 1]) str += '\n';
	        }
	        return str;
	      }
	
	      return this.key + ' ' + this.value + ';';
	    }
	  }]);
	
	  return SimpleRule;
	}();
	
	exports['default'] = SimpleRule;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _toCss = __webpack_require__(47);
	
	var _toCss2 = _interopRequireDefault(_toCss);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ViewportRule = function () {
	  function ViewportRule(key, style, options) {
	    _classCallCheck(this, ViewportRule);
	
	    this.type = 'viewport';
	    this.isProcessed = false;
	
	    this.key = key;
	    this.style = style;
	    this.options = options;
	  }
	
	  /**
	   * Generates a CSS string.
	   */
	
	
	  _createClass(ViewportRule, [{
	    key: 'toString',
	    value: function toString(options) {
	      return (0, _toCss2['default'])(this.key, this.style, options);
	    }
	  }]);
	
	  return ViewportRule;
	}();
	
	exports['default'] = ViewportRule;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports['default'] = cloneStyle;
	
	var _isObservable = __webpack_require__(66);
	
	var _isObservable2 = _interopRequireDefault(_isObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var isArray = Array.isArray;
	function cloneStyle(style) {
	  // Support empty values in case user ends up with them by accident.
	  if (style == null) return style;
	
	  // Support string value for SimpleRule.
	  var typeOfStyle = typeof style === 'undefined' ? 'undefined' : _typeof(style);
	
	  if (typeOfStyle === 'string' || typeOfStyle === 'number' || typeOfStyle === 'function') {
	    return style;
	  }
	
	  // Support array for FontFaceRule.
	  if (isArray(style)) return style.map(cloneStyle);
	
	  // Support Observable styles.  Observables are immutable, so we don't need to
	  // copy them.
	  if ((0, _isObservable2['default'])(style)) return style;
	
	  var newStyle = {};
	  for (var name in style) {
	    var value = style[name];
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	      newStyle[name] = cloneStyle(value);
	      continue;
	    }
	    newStyle[name] = value;
	  }
	
	  return newStyle;
	}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CSS = global.CSS;
	
	var env = ("production");
	
	var escapeRegex = /([[\].#*$><+~=|^:(),"'`])/g;
	
	exports['default'] = function (str) {
	  // We don't need to escape it in production, because we are not using user's
	  // input for selectors, we are generating a valid selector.
	  if (env === 'production') return str;
	
	  if (!CSS || !CSS.escape) {
	    return str.replace(escapeRegex, '\\$1');
	  }
	
	  return CSS.escape(str);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 146 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Extracts a styles object with only props that contain function values.
	 */
	exports['default'] = function (styles) {
	  // eslint-disable-next-line no-shadow
	  function extract(styles) {
	    var to = null;
	
	    for (var key in styles) {
	      var value = styles[key];
	      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	
	      if (type === 'function') {
	        if (!to) to = {};
	        to[key] = value;
	      } else if (type === 'object' && value !== null && !Array.isArray(value)) {
	        var extracted = extract(value);
	        if (extracted) {
	          if (!to) to = {};
	          to[key] = extracted;
	        }
	      }
	    }
	
	    return to;
	  }
	
	  return extract(styles);
	};

/***/ }),
/* 147 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ns = '2f1acc6c3a606b082e5eef5e54414ffb';
	if (global[ns] == null) global[ns] = 0;
	
	// Bundle may contain multiple JSS versions at the same time. In order to identify
	// the current version with just one short number and use it for classes generation
	// we use a counter. Also it is more accurate, because user can manually reevaluate
	// the module.
	exports['default'] = global[ns]++;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(68),
	    getRawTag = __webpack_require__(150),
	    objectToString = __webpack_require__(151);
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
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
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	module.exports = baseGetTag;


/***/ }),
/* 149 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(68);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	module.exports = getRawTag;


/***/ }),
/* 151 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

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
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.styles = undefined;
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(12);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(9);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(13);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(11);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(10);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(17);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _keycode = __webpack_require__(41);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _ownerWindow = __webpack_require__(96);
	
	var _ownerWindow2 = _interopRequireDefault(_ownerWindow);
	
	var _withStyles = __webpack_require__(5);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _keyboardFocus = __webpack_require__(174);
	
	var _TouchRipple = __webpack_require__(155);
	
	var _TouchRipple2 = _interopRequireDefault(_TouchRipple);
	
	var _createRippleHandler = __webpack_require__(156);
	
	var _createRippleHandler2 = _interopRequireDefault(_createRippleHandler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = exports.styles = {
	  root: {
	    display: 'inline-flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	    position: 'relative',
	    // Remove grey highlight
	    WebkitTapHighlightColor: 'transparent',
	    backgroundColor: 'transparent', // Reset default value
	    outline: 'none',
	    border: 0,
	    margin: 0, // Remove the margin in Safari
	    borderRadius: 0,
	    padding: 0, // Remove the padding in Firefox
	    cursor: 'pointer',
	    userSelect: 'none',
	    verticalAlign: 'middle',
	    '-moz-appearance': 'none', // Reset
	    '-webkit-appearance': 'none', // Reset
	    textDecoration: 'none',
	    // So we take precedent over the style of a native <a /> element.
	    color: 'inherit',
	    '&::-moz-focus-inner': {
	      borderStyle: 'none' // Remove Firefox dotted outline.
	    }
	  },
	  disabled: {
	    pointerEvents: 'none', // Disable link interactions
	    cursor: 'default'
	  }
	};
	
	/**
	 * `ButtonBase` contains as few styles as possible.
	 * It aims to be a simple building block for creating a button.
	 * It contains a load of style reset and some focus/ripple logic.
	 */
	
	var ButtonBase = function (_React$Component) {
	  (0, _inherits3.default)(ButtonBase, _React$Component);
	
	  function ButtonBase() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, ButtonBase);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ButtonBase.__proto__ || (0, _getPrototypeOf2.default)(ButtonBase)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      keyboardFocused: false
	    }, _this.onKeyboardFocusHandler = function (event) {
	      _this.keyDown = false;
	      _this.setState({ keyboardFocused: true });
	
	      if (_this.props.onKeyboardFocus) {
	        _this.props.onKeyboardFocus(event);
	      }
	    }, _this.onRippleRef = function (node) {
	      _this.ripple = node;
	    }, _this.ripple = null, _this.keyDown = false, _this.button = null, _this.keyboardFocusTimeout = null, _this.keyboardFocusCheckTime = 50, _this.keyboardFocusMaxCheckTimes = 5, _this.handleKeyDown = function (event) {
	      var _this$props = _this.props,
	          component = _this$props.component,
	          focusRipple = _this$props.focusRipple,
	          onKeyDown = _this$props.onKeyDown,
	          onClick = _this$props.onClick;
	
	      var key = (0, _keycode2.default)(event);
	
	      // Check if key is already down to avoid repeats being counted as multiple activations
	      if (focusRipple && !_this.keyDown && _this.state.keyboardFocused && _this.ripple && key === 'space') {
	        _this.keyDown = true;
	        event.persist();
	        _this.ripple.stop(event, function () {
	          _this.ripple.start(event);
	        });
	      }
	
	      if (onKeyDown) {
	        onKeyDown(event);
	      }
	
	      // Keyboard accessibility for non interactive elements
	      if (event.target === event.currentTarget && component && component !== 'button' && (key === 'space' || key === 'enter')) {
	        event.preventDefault();
	        if (onClick) {
	          onClick(event);
	        }
	      }
	    }, _this.handleKeyUp = function (event) {
	      if (_this.props.focusRipple && (0, _keycode2.default)(event) === 'space' && _this.ripple && _this.state.keyboardFocused) {
	        _this.keyDown = false;
	        event.persist();
	        _this.ripple.stop(event, function () {
	          return _this.ripple.pulsate(event);
	        });
	      }
	      if (_this.props.onKeyUp) {
	        _this.props.onKeyUp(event);
	      }
	    }, _this.handleMouseDown = (0, _createRippleHandler2.default)(_this, 'MouseDown', 'start', function () {
	      clearTimeout(_this.keyboardFocusTimeout);
	      (0, _keyboardFocus.focusKeyPressed)(false);
	      if (_this.state.keyboardFocused) {
	        _this.setState({ keyboardFocused: false });
	      }
	    }), _this.handleMouseUp = (0, _createRippleHandler2.default)(_this, 'MouseUp', 'stop'), _this.handleMouseLeave = (0, _createRippleHandler2.default)(_this, 'MouseLeave', 'stop', function (event) {
	      if (_this.state.keyboardFocused) {
	        event.preventDefault();
	      }
	    }), _this.handleTouchStart = (0, _createRippleHandler2.default)(_this, 'TouchStart', 'start'), _this.handleTouchEnd = (0, _createRippleHandler2.default)(_this, 'TouchEnd', 'stop'), _this.handleTouchMove = (0, _createRippleHandler2.default)(_this, 'TouchEnd', 'stop'), _this.handleBlur = (0, _createRippleHandler2.default)(_this, 'Blur', 'stop', function () {
	      clearTimeout(_this.keyboardFocusTimeout);
	      (0, _keyboardFocus.focusKeyPressed)(false);
	      _this.setState({ keyboardFocused: false });
	    }), _this.handleFocus = function (event) {
	      if (_this.props.disabled) {
	        return;
	      }
	
	      // Fix for https://github.com/facebook/react/issues/7769
	      if (!_this.button) {
	        _this.button = event.currentTarget;
	      }
	
	      event.persist();
	      (0, _keyboardFocus.detectKeyboardFocus)(_this, _this.button, function () {
	        _this.onKeyboardFocusHandler(event);
	      });
	
	      if (_this.props.onFocus) {
	        _this.props.onFocus(event);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(ButtonBase, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.button = (0, _reactDom.findDOMNode)(this);
	      (0, _keyboardFocus.listenForFocusKeys)((0, _ownerWindow2.default)(this.button));
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // The blur won't fire when the disabled state is set on a focused input.
	      // We need to book keep the focused state manually.
	      if (!this.props.disabled && nextProps.disabled && this.state.keyboardFocused) {
	        this.setState({
	          keyboardFocused: false
	        });
	      }
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps, nextState) {
	      if (this.props.focusRipple && nextState.keyboardFocused && !this.state.keyboardFocused && !this.props.disableRipple) {
	        this.ripple.pulsate();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.button = null;
	      clearTimeout(this.keyboardFocusTimeout);
	    } // Used to help track keyboard activation keyDown
	
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames;
	
	      var _props = this.props,
	          buttonRef = _props.buttonRef,
	          centerRipple = _props.centerRipple,
	          children = _props.children,
	          classes = _props.classes,
	          classNameProp = _props.className,
	          component = _props.component,
	          disabled = _props.disabled,
	          disableRipple = _props.disableRipple,
	          focusRipple = _props.focusRipple,
	          keyboardFocusedClassName = _props.keyboardFocusedClassName,
	          onBlur = _props.onBlur,
	          onFocus = _props.onFocus,
	          onKeyboardFocus = _props.onKeyboardFocus,
	          onKeyDown = _props.onKeyDown,
	          onKeyUp = _props.onKeyUp,
	          onMouseDown = _props.onMouseDown,
	          onMouseLeave = _props.onMouseLeave,
	          onMouseUp = _props.onMouseUp,
	          onTouchEnd = _props.onTouchEnd,
	          onTouchMove = _props.onTouchMove,
	          onTouchStart = _props.onTouchStart,
	          tabIndex = _props.tabIndex,
	          type = _props.type,
	          other = (0, _objectWithoutProperties3.default)(_props, ['buttonRef', 'centerRipple', 'children', 'classes', 'className', 'component', 'disabled', 'disableRipple', 'focusRipple', 'keyboardFocusedClassName', 'onBlur', 'onFocus', 'onKeyboardFocus', 'onKeyDown', 'onKeyUp', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'tabIndex', 'type']);
	
	
	      var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, keyboardFocusedClassName || '', this.state.keyboardFocused), _classNames), classNameProp);
	
	      var buttonProps = {};
	
	      var ComponentProp = component;
	
	      if (!ComponentProp) {
	        if (other.href) {
	          ComponentProp = 'a';
	        } else {
	          ComponentProp = 'button';
	        }
	      }
	
	      if (ComponentProp === 'button') {
	        buttonProps.type = type || 'button';
	        buttonProps.disabled = disabled;
	      } else {
	        buttonProps.role = 'button';
	      }
	
	      return _react2.default.createElement(
	        ComponentProp,
	        (0, _extends3.default)({
	          onBlur: this.handleBlur,
	          onFocus: this.handleFocus,
	          onKeyDown: this.handleKeyDown,
	          onKeyUp: this.handleKeyUp,
	          onMouseDown: this.handleMouseDown,
	          onMouseLeave: this.handleMouseLeave,
	          onMouseUp: this.handleMouseUp,
	          onTouchEnd: this.handleTouchEnd,
	          onTouchMove: this.handleTouchMove,
	          onTouchStart: this.handleTouchStart,
	          tabIndex: disabled ? '-1' : tabIndex,
	          className: className,
	          ref: buttonRef
	        }, buttonProps, other),
	        children,
	        !disableRipple && !disabled ? _react2.default.createElement(_TouchRipple2.default, { innerRef: this.onRippleRef, center: centerRipple }) : null
	      );
	    }
	  }]);
	  return ButtonBase;
	}(_react2.default.Component);
	
	ButtonBase.propTypes =  false ? {
	  /**
	   * Use that property to pass a ref callback to the native button component.
	   */
	  buttonRef: _propTypes2.default.func,
	  /**
	   * If `true`, the ripples will be centered.
	   * They won't start at the cursor interaction position.
	   */
	  centerRipple: _propTypes2.default.bool,
	  /**
	   * The content of the component.
	   */
	  children: _propTypes2.default.node,
	  /**
	   * Useful to extend the style applied to components.
	   */
	  classes: _propTypes2.default.object.isRequired,
	  /**
	   * @ignore
	   */
	  className: _propTypes2.default.string,
	  /**
	   * The component used for the root node.
	   * Either a string to use a DOM element or a component.
	   * The default value is a `button`.
	   */
	  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	  /**
	   * If `true`, the base button will be disabled.
	   */
	  disabled: _propTypes2.default.bool,
	  /**
	   * If `true`, the ripple effect will be disabled.
	   */
	  disableRipple: _propTypes2.default.bool,
	  /**
	   * If `true`, the base button will have a keyboard focus ripple.
	   * `disableRipple` must also be `false`.
	   */
	  focusRipple: _propTypes2.default.bool,
	  /**
	   * The CSS class applied while the component is keyboard focused.
	   */
	  keyboardFocusedClassName: _propTypes2.default.string,
	  /**
	   * @ignore
	   */
	  onBlur: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onClick: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onFocus: _propTypes2.default.func,
	  /**
	   * Callback fired when the component is focused with a keyboard.
	   * We trigger a `onFocus` callback too.
	   */
	  onKeyboardFocus: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onKeyDown: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onKeyUp: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onMouseDown: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onMouseLeave: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onMouseUp: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onTouchEnd: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onTouchMove: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  onTouchStart: _propTypes2.default.func,
	  /**
	   * @ignore
	   */
	  role: _propTypes2.default.string,
	  /**
	   * @ignore
	   */
	  tabIndex: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	  /**
	   * @ignore
	   */
	  type: _propTypes2.default.string
	} : {};
	
	ButtonBase.defaultProps = {
	  centerRipple: false,
	  disableRipple: false,
	  focusRipple: false,
	  tabIndex: '0',
	  type: 'button'
	};
	
	exports.default = (0, _withStyles2.default)(styles, { name: 'MuiButtonBase' })(ButtonBase);

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(12);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(9);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(13);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(11);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(10);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Transition = __webpack_require__(58);
	
	var _Transition2 = _interopRequireDefault(_Transition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @ignore - internal component.
	 */
	var Ripple = function (_React$Component) {
	  (0, _inherits3.default)(Ripple, _React$Component);
	
	  function Ripple() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, Ripple);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Ripple.__proto__ || (0, _getPrototypeOf2.default)(Ripple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      rippleVisible: false,
	      rippleLeaving: false
	    }, _this.handleEnter = function () {
	      _this.setState({
	        rippleVisible: true
	      });
	    }, _this.handleExit = function () {
	      _this.setState({
	        rippleLeaving: true
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(Ripple, [{
	    key: 'render',
	    value: function render() {
	      var _classNames, _classNames2;
	
	      var _props = this.props,
	          classes = _props.classes,
	          classNameProp = _props.className,
	          pulsate = _props.pulsate,
	          rippleX = _props.rippleX,
	          rippleY = _props.rippleY,
	          rippleSize = _props.rippleSize,
	          other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'pulsate', 'rippleX', 'rippleY', 'rippleSize']);
	      var _state = this.state,
	          rippleVisible = _state.rippleVisible,
	          rippleLeaving = _state.rippleLeaving;
	
	
	      var className = (0, _classnames2.default)(classes.wrapper, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.wrapperLeaving, rippleLeaving), (0, _defineProperty3.default)(_classNames, classes.wrapperPulsating, pulsate), _classNames), classNameProp);
	
	      var rippleClassName = (0, _classnames2.default)(classes.ripple, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.rippleVisible, rippleVisible), (0, _defineProperty3.default)(_classNames2, classes.rippleFast, pulsate), _classNames2));
	
	      var rippleStyles = {
	        width: rippleSize,
	        height: rippleSize,
	        top: -(rippleSize / 2) + rippleY,
	        left: -(rippleSize / 2) + rippleX
	      };
	
	      return _react2.default.createElement(
	        _Transition2.default,
	        (0, _extends3.default)({ onEnter: this.handleEnter, onExit: this.handleExit }, other),
	        _react2.default.createElement(
	          'span',
	          { className: className },
	          _react2.default.createElement('span', { className: rippleClassName, style: rippleStyles })
	        )
	      );
	    }
	  }]);
	  return Ripple;
	}(_react2.default.Component);
	
	Ripple.propTypes =  false ? {
	  /**
	   * Useful to extend the style applied to components.
	   */
	  classes: _propTypes2.default.object.isRequired,
	  /**
	   * @ignore
	   */
	  className: _propTypes2.default.string,
	  /**
	   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
	   */
	  pulsate: _propTypes2.default.bool,
	  /**
	   * Diameter of the ripple.
	   */
	  rippleSize: _propTypes2.default.number,
	  /**
	   * Horizontal position of the ripple center.
	   */
	  rippleX: _propTypes2.default.number,
	  /**
	   * Vertical position of the ripple center.
	   */
	  rippleY: _propTypes2.default.number
	} : {};
	
	Ripple.defaultProps = {
	  pulsate: false
	};
	
	exports.default = Ripple;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.styles = exports.DELAY_RIPPLE = undefined;
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _toConsumableArray2 = __webpack_require__(74);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _getPrototypeOf = __webpack_require__(12);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(9);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(13);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(11);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(10);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(17);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _TransitionGroup = __webpack_require__(185);
	
	var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _withStyles = __webpack_require__(5);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _Ripple = __webpack_require__(154);
	
	var _Ripple2 = _interopRequireDefault(_Ripple);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DURATION = 550;
	var DELAY_RIPPLE = exports.DELAY_RIPPLE = 80;
	
	var styles = exports.styles = function styles(theme) {
	  return {
	    root: {
	      display: 'block',
	      position: 'absolute',
	      overflow: 'hidden',
	      borderRadius: 'inherit',
	      width: '100%',
	      height: '100%',
	      left: 0,
	      top: 0,
	      pointerEvents: 'none',
	      zIndex: 0
	    },
	    wrapper: {
	      opacity: 1
	    },
	    wrapperLeaving: {
	      opacity: 0,
	      animation: 'mui-ripple-exit ' + DURATION + 'ms ' + theme.transitions.easing.easeInOut
	    },
	    wrapperPulsating: {
	      position: 'absolute',
	      left: 0,
	      top: 0,
	      display: 'block',
	      width: '100%',
	      height: '100%',
	      animation: 'mui-ripple-pulsate 2500ms ' + theme.transitions.easing.easeInOut + ' 200ms infinite'
	    },
	    '@keyframes mui-ripple-enter': {
	      '0%': {
	        transform: 'scale(0)'
	      },
	      '100%': {
	        transform: 'scale(1)'
	      }
	    },
	    '@keyframes mui-ripple-exit': {
	      '0%': {
	        opacity: 1
	      },
	      '100%': {
	        opacity: 0
	      }
	    },
	    '@keyframes mui-ripple-pulsate': {
	      '0%': {
	        transform: 'scale(1)'
	      },
	      '50%': {
	        transform: 'scale(0.92)'
	      },
	      '100%': {
	        transform: 'scale(1)'
	      }
	    },
	    ripple: {
	      width: 50,
	      height: 50,
	      left: 0,
	      top: 0,
	      opacity: 0,
	      position: 'absolute',
	      borderRadius: '50%',
	      background: 'currentColor'
	    },
	    rippleVisible: {
	      opacity: 0.3,
	      transform: 'scale(1)',
	      animation: 'mui-ripple-enter ' + DURATION + 'ms ' + theme.transitions.easing.easeInOut
	    },
	    rippleFast: {
	      animationDuration: '200ms'
	    }
	  };
	};
	
	/**
	 * @ignore - internal component.
	 */
	
	var TouchRipple = function (_React$Component) {
	  (0, _inherits3.default)(TouchRipple, _React$Component);
	
	  function TouchRipple() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, TouchRipple);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TouchRipple.__proto__ || (0, _getPrototypeOf2.default)(TouchRipple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      nextKey: 0,
	      ripples: []
	    }, _this.ignoringMouseDown = false, _this.startTimer = null, _this.startTimerCommit = null, _this.pulsate = function () {
	      _this.start({}, { pulsate: true });
	    }, _this.start = function () {
	      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var cb = arguments[2];
	      var _options$pulsate = options.pulsate,
	          pulsate = _options$pulsate === undefined ? false : _options$pulsate,
	          _options$center = options.center,
	          center = _options$center === undefined ? _this.props.center || options.pulsate : _options$center,
	          _options$fakeElement = options.fakeElement,
	          fakeElement = _options$fakeElement === undefined ? false : _options$fakeElement;
	
	
	      if (event.type === 'mousedown' && _this.ignoringMouseDown) {
	        _this.ignoringMouseDown = false;
	        return;
	      }
	
	      if (event.type === 'touchstart') {
	        _this.ignoringMouseDown = true;
	      }
	
	      var element = fakeElement ? null : _reactDom2.default.findDOMNode(_this);
	      var rect = element ? element.getBoundingClientRect() : {
	        width: 0,
	        height: 0,
	        left: 0,
	        top: 0
	      };
	
	      // Get the size of the ripple
	      var rippleX = void 0;
	      var rippleY = void 0;
	      var rippleSize = void 0;
	
	      if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
	        rippleX = Math.round(rect.width / 2);
	        rippleY = Math.round(rect.height / 2);
	      } else {
	        var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
	        var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
	        rippleX = Math.round(clientX - rect.left);
	        rippleY = Math.round(clientY - rect.top);
	      }
	
	      if (center) {
	        rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3);
	
	        // For some reason the animation is broken on Mobile Chrome if the size if even.
	        if (rippleSize % 2 === 0) {
	          rippleSize += 1;
	        }
	      } else {
	        var sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
	        var sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
	        rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
	      }
	
	      // Touche devices
	      if (event.touches) {
	        // Prepare the ripple effect.
	        _this.startTimerCommit = function () {
	          _this.startCommit({ pulsate: pulsate, rippleX: rippleX, rippleY: rippleY, rippleSize: rippleSize, cb: cb });
	        };
	        // Deplay the execution of the ripple effect.
	        _this.startTimer = setTimeout(function () {
	          _this.startTimerCommit();
	          _this.startTimerCommit = null;
	        }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
	      } else {
	        _this.startCommit({ pulsate: pulsate, rippleX: rippleX, rippleY: rippleY, rippleSize: rippleSize, cb: cb });
	      }
	    }, _this.startCommit = function (params) {
	      var pulsate = params.pulsate,
	          rippleX = params.rippleX,
	          rippleY = params.rippleY,
	          rippleSize = params.rippleSize,
	          cb = params.cb;
	
	      var ripples = _this.state.ripples;
	
	      // Add a ripple to the ripples array.
	      ripples = [].concat((0, _toConsumableArray3.default)(ripples), [_react2.default.createElement(_Ripple2.default, {
	        key: _this.state.nextKey,
	        classes: _this.props.classes,
	        timeout: {
	          exit: DURATION,
	          enter: DURATION
	        },
	        pulsate: pulsate,
	        rippleX: rippleX,
	        rippleY: rippleY,
	        rippleSize: rippleSize
	      })]);
	
	      _this.setState({
	        nextKey: _this.state.nextKey + 1,
	        ripples: ripples
	      }, cb);
	    }, _this.stop = function (event, cb) {
	      clearTimeout(_this.startTimer);
	      var ripples = _this.state.ripples;
	
	      // The touch interaction occures to quickly.
	      // We still want to show ripple effect.
	
	      if (event.type === 'touchend' && _this.startTimerCommit) {
	        event.persist();
	        _this.startTimerCommit();
	        _this.startTimerCommit = null;
	        _this.startTimer = setTimeout(function () {
	          _this.stop(event, cb);
	        }, 0);
	        return;
	      }
	
	      _this.startTimerCommit = null;
	
	      if (ripples && ripples.length) {
	        _this.setState({
	          ripples: ripples.slice(1)
	        }, cb);
	      }
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  (0, _createClass3.default)(TouchRipple, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.startTimer);
	    }
	
	    // Used to filter out mouse emulated events on mobile.
	
	    // We use a timer in order to only show the ripples for touch "click" like events.
	    // We don't want to display the ripple for touch scroll events.
	
	    // This is the hook called once the previous timeout is ready.
	
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          center = _props.center,
	          classes = _props.classes,
	          className = _props.className,
	          other = (0, _objectWithoutProperties3.default)(_props, ['center', 'classes', 'className']);
	
	
	      return _react2.default.createElement(
	        _TransitionGroup2.default,
	        (0, _extends3.default)({
	          component: 'span',
	          enter: true,
	          exit: true,
	          className: (0, _classnames2.default)(classes.root, className)
	        }, other),
	        this.state.ripples
	      );
	    }
	  }]);
	  return TouchRipple;
	}(_react2.default.Component);
	
	TouchRipple.propTypes =  false ? {
	  /**
	   * If `true`, the ripple starts at the center of the component
	   * rather than at the point of interaction.
	   */
	  center: _propTypes2.default.bool,
	  /**
	   * Useful to extend the style applied to components.
	   */
	  classes: _propTypes2.default.object.isRequired,
	  /**
	   * @ignore
	   */
	  className: _propTypes2.default.string
	} : {};
	
	TouchRipple.defaultProps = {
	  center: false
	};
	
	exports.default = (0, _withStyles2.default)(styles, { flip: false, name: 'MuiTouchRipple' })(TouchRipple);

/***/ }),
/* 156 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function createRippleHandler(instance, eventName, action, cb) {
	  return function handleEvent(event) {
	    if (cb) {
	      cb.call(instance, event);
	    }
	
	    if (event.defaultPrevented) {
	      return false;
	    }
	
	    if (instance.ripple) {
	      instance.ripple[action](event);
	    }
	
	    if (instance.props && typeof instance.props['on' + eventName] === 'function') {
	      instance.props['on' + eventName](event);
	    }
	
	    return true;
	  };
	}
	
	exports.default = createRippleHandler;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.styles = undefined;
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _withStyles = __webpack_require__(5);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _colorManipulator = __webpack_require__(35);
	
	var _ButtonBase = __webpack_require__(28);
	
	var _ButtonBase2 = _interopRequireDefault(_ButtonBase);
	
	var _helpers = __webpack_require__(14);
	
	var _reactHelpers = __webpack_require__(43);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// @inheritedComponent ButtonBase
	
	var styles = exports.styles = function styles(theme) {
	  return {
	    root: (0, _extends3.default)({}, theme.typography.button, {
	      lineHeight: '1.4em', // Improve readability for multiline button.
	      boxSizing: 'border-box',
	      minWidth: theme.spacing.unit * 11,
	      minHeight: 36,
	      padding: theme.spacing.unit + 'px ' + theme.spacing.unit * 2 + 'px',
	      borderRadius: 2,
	      color: theme.palette.text.primary,
	      transition: theme.transitions.create(['background-color', 'box-shadow'], {
	        duration: theme.transitions.duration.short
	      }),
	      '&:hover': {
	        textDecoration: 'none',
	        // Reset on mouse devices
	        backgroundColor: (0, _colorManipulator.fade)(theme.palette.text.primary, 0.12),
	        '@media (hover: none)': {
	          backgroundColor: 'transparent'
	        },
	        '&$disabled': {
	          backgroundColor: 'transparent'
	        }
	      }
	    }),
	    label: {
	      width: '100%',
	      display: 'inherit',
	      alignItems: 'inherit',
	      justifyContent: 'inherit'
	    },
	    flatPrimary: {
	      color: theme.palette.primary.main,
	      '&:hover': {
	        backgroundColor: (0, _colorManipulator.fade)(theme.palette.primary.main, 0.12),
	        // Reset on mouse devices
	        '@media (hover: none)': {
	          backgroundColor: 'transparent'
	        }
	      }
	    },
	    flatSecondary: {
	      color: theme.palette.secondary.main,
	      '&:hover': {
	        backgroundColor: (0, _colorManipulator.fade)(theme.palette.secondary.main, 0.12),
	        // Reset on mouse devices
	        '@media (hover: none)': {
	          backgroundColor: 'transparent'
	        }
	      }
	    },
	    colorInherit: {
	      color: 'inherit'
	    },
	    raised: {
	      color: theme.palette.getContrastText(theme.palette.grey[300]),
	      backgroundColor: theme.palette.grey[300],
	      boxShadow: theme.shadows[2],
	      '&$keyboardFocused': {
	        boxShadow: theme.shadows[6]
	      },
	      '&:active': {
	        boxShadow: theme.shadows[8]
	      },
	      '&$disabled': {
	        boxShadow: theme.shadows[0],
	        backgroundColor: theme.palette.action.disabledBackground
	      },
	      '&:hover': {
	        backgroundColor: theme.palette.grey.A100,
	        // Reset on mouse devices
	        '@media (hover: none)': {
	          backgroundColor: theme.palette.grey[300]
	        },
	        '&$disabled': {
	          backgroundColor: theme.palette.action.disabledBackground
	        }
	      }
	    },
	    keyboardFocused: {},
	    raisedPrimary: {
	      color: theme.palette.primary.contrastText,
	      backgroundColor: theme.palette.primary.main,
	      '&:hover': {
	        backgroundColor: theme.palette.primary.dark,
	        // Reset on mouse devices
	        '@media (hover: none)': {
	          backgroundColor: theme.palette.primary.main
	        }
	      }
	    },
	    raisedSecondary: {
	      color: theme.palette.secondary.contrastText,
	      backgroundColor: theme.palette.secondary.main,
	      '&:hover': {
	        backgroundColor: theme.palette.secondary.dark,
	        // Reset on mouse devices
	        '@media (hover: none)': {
	          backgroundColor: theme.palette.secondary.main
	        }
	      }
	    },
	    disabled: {
	      color: theme.palette.action.disabled
	    },
	    fab: {
	      borderRadius: '50%',
	      padding: 0,
	      minWidth: 0,
	      width: 56,
	      fontSize: 24,
	      height: 56,
	      boxShadow: theme.shadows[6],
	      '&:active': {
	        boxShadow: theme.shadows[12]
	      }
	    },
	    mini: {
	      width: 40,
	      height: 40
	    },
	    sizeSmall: {
	      padding: theme.spacing.unit - 1 + 'px ' + theme.spacing.unit + 'px',
	      minWidth: theme.spacing.unit * 8,
	      minHeight: 32,
	      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 1)
	    },
	    sizeLarge: {
	      padding: theme.spacing.unit + 'px ' + theme.spacing.unit * 3 + 'px',
	      minWidth: theme.spacing.unit * 14,
	      minHeight: 40,
	      fontSize: theme.typography.pxToRem(theme.typography.fontSize + 1)
	    },
	    fullWidth: {
	      width: '100%'
	    }
	  };
	};
	
	function Button(props) {
	  var _classNames;
	
	  var childrenProp = props.children,
	      classes = props.classes,
	      classNameProp = props.className,
	      color = props.color,
	      disabled = props.disabled,
	      disableFocusRipple = props.disableFocusRipple,
	      fullWidth = props.fullWidth,
	      mini = props.mini,
	      size = props.size,
	      variant = props.variant,
	      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'color', 'disabled', 'disableFocusRipple', 'fullWidth', 'mini', 'size', 'variant']);
	
	
	  var fab = variant === 'fab';
	  var raised = variant === 'raised';
	  var flat = !raised && !fab;
	  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.raised, raised || fab), (0, _defineProperty3.default)(_classNames, classes.fab, fab), (0, _defineProperty3.default)(_classNames, classes.mini, fab && mini), (0, _defineProperty3.default)(_classNames, classes.colorInherit, color === 'inherit'), (0, _defineProperty3.default)(_classNames, classes.flatPrimary, flat && color === 'primary'), (0, _defineProperty3.default)(_classNames, classes.flatSecondary, flat && color === 'secondary'), (0, _defineProperty3.default)(_classNames, classes.raisedPrimary, !flat && color === 'primary'), (0, _defineProperty3.default)(_classNames, classes.raisedSecondary, !flat && color === 'secondary'), (0, _defineProperty3.default)(_classNames, classes['size' + (0, _helpers.capitalize)(size)], size !== 'medium'), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.fullWidth, fullWidth), _classNames), classNameProp);
	
	  var children = childrenProp;
	
	  if (fab) {
	    children = _react2.default.Children.map(children, function (child) {
	      if ((0, _reactHelpers.isMuiElement)(child, ['Icon', 'SvgIcon'])) {
	        return _react2.default.cloneElement(child, { fontSize: true });
	      }
	      return child;
	    });
	  }
	
	  return _react2.default.createElement(
	    _ButtonBase2.default,
	    (0, _extends3.default)({
	      className: className,
	      disabled: disabled,
	      focusRipple: !disableFocusRipple,
	      keyboardFocusedClassName: classes.keyboardFocused
	    }, other),
	    _react2.default.createElement(
	      'span',
	      { className: classes.label },
	      children
	    )
	  );
	}
	
	Button.propTypes =  false ? {
	  /**
	   * The content of the button.
	   */
	  children: _propTypes2.default.node.isRequired,
	  /**
	   * Useful to extend the style applied to components.
	   */
	  classes: _propTypes2.default.object.isRequired,
	  /**
	   * @ignore
	   */
	  className: _propTypes2.default.string,
	  /**
	   * The color of the component. It supports those theme colors that make sense for this component.
	   */
	  color: _propTypes2.default.oneOf(['default', 'inherit', 'primary', 'secondary']),
	  /**
	   * The component used for the root node.
	   * Either a string to use a DOM element or a component.
	   * The default value is a `button`.
	   */
	  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	  /**
	   * If `true`, the button will be disabled.
	   */
	  disabled: _propTypes2.default.bool,
	  /**
	   * If `true`, the  keyboard focus ripple will be disabled.
	   * `disableRipple` must also be true.
	   */
	  disableFocusRipple: _propTypes2.default.bool,
	  /**
	   * If `true`, the ripple effect will be disabled.
	   */
	  disableRipple: _propTypes2.default.bool,
	  /**
	   * If `true`, the button will take up the full width of its container.
	   */
	  fullWidth: _propTypes2.default.bool,
	  /**
	   * The URL to link to when the button is clicked.
	   * If defined, an `a` element will be used as the root node.
	   */
	  href: _propTypes2.default.string,
	  /**
	   * If `true`, and `variant` is `'fab'`, will use mini floating action button styling.
	   */
	  mini: _propTypes2.default.bool,
	  /**
	   * The size of the button.
	   * `small` is equivalent to the dense button styling.
	   */
	  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
	  /**
	   * @ignore
	   */
	  type: _propTypes2.default.string,
	  /**
	   * The color of the component. It supports those theme colors that make sense for this component.
	   */
	  variant: _propTypes2.default.oneOf(['flat', 'raised', 'fab'])
	} : {};
	
	Button.defaultProps = {
	  color: 'default',
	  disabled: false,
	  disableFocusRipple: false,
	  disableRipple: false,
	  fullWidth: false,
	  mini: false,
	  size: 'medium',
	  type: 'button',
	  variant: 'flat'
	};
	
	exports.default = (0, _withStyles2.default)(styles, { name: 'MuiButton' })(Button);

/***/ }),
/* 158 */,
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(12);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(9);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(13);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(11);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(10);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _styles = __webpack_require__(29);
	
	var _exactProp = __webpack_require__(50);
	
	var _exactProp2 = _interopRequireDefault(_exactProp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = function styles(theme) {
	  return {
	    '@global': {
	      html: {
	        WebkitFontSmoothing: 'antialiased', // Antialiasing.
	        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
	        // Change from `box-sizing: content-box` so that `width`
	        // is not affected by `padding` or `border`.
	        boxSizing: 'border-box'
	      },
	      '*, *::before, *::after': {
	        boxSizing: 'inherit'
	      },
	      body: {
	        margin: 0, // Remove the margin in all browsers.
	        backgroundColor: theme.palette.background.default,
	        '@media print': {
	          // Save printer ink.
	          backgroundColor: theme.palette.common.white
	        }
	      }
	    }
	  };
	};
	
	/**
	 * Kickstart an elegant, consistent, and simple baseline to build upon.
	 */
	
	var Reboot = function (_React$Component) {
	  (0, _inherits3.default)(Reboot, _React$Component);
	
	  function Reboot() {
	    (0, _classCallCheck3.default)(this, Reboot);
	    return (0, _possibleConstructorReturn3.default)(this, (Reboot.__proto__ || (0, _getPrototypeOf2.default)(Reboot)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Reboot, [{
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);
	  return Reboot;
	}(_react2.default.Component);
	
	Reboot.propTypes =  false ? {
	  /**
	   * You can only provide a single element with react@15, a node with react@16.
	   */
	  children: _propTypes2.default.node,
	  /**
	   * @ignore
	   */
	  classes: _propTypes2.default.object.isRequired
	} : {};
	
	Reboot.propTypes =  false ? (0, _exactProp2.default)(Reboot.propTypes, 'Reboot') : {};
	
	Reboot.defaultProps = {
	  children: null
	};
	
	exports.default = (0, _styles.withStyles)(styles, { name: 'MuiReboot' })(Reboot);

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Reboot = __webpack_require__(159);
	
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Reboot).default;
	  }
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.styles = undefined;
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _withStyles = __webpack_require__(5);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _helpers = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = exports.styles = function styles(theme) {
	  return {
	    root: {
	      display: 'inline-block',
	      fill: 'currentColor',
	      height: 24,
	      width: 24,
	      userSelect: 'none',
	      flexShrink: 0,
	      transition: theme.transitions.create('fill', {
	        duration: theme.transitions.duration.shorter
	      })
	    },
	    colorPrimary: {
	      color: theme.palette.primary.main
	    },
	    colorSecondary: {
	      color: theme.palette.secondary.main
	    },
	    colorAction: {
	      color: theme.palette.action.active
	    },
	    colorDisabled: {
	      color: theme.palette.action.disabled
	    },
	    colorError: {
	      color: theme.palette.error.main
	    },
	    fontSize: {
	      width: '1em',
	      height: '1em'
	    }
	  };
	};
	
	function SvgIcon(props) {
	  var _classNames;
	
	  var children = props.children,
	      classes = props.classes,
	      classNameProp = props.className,
	      color = props.color,
	      fontSize = props.fontSize,
	      nativeColor = props.nativeColor,
	      titleAccess = props.titleAccess,
	      viewBox = props.viewBox,
	      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'color', 'fontSize', 'nativeColor', 'titleAccess', 'viewBox']);
	
	
	  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes['color' + (0, _helpers.capitalize)(color)], color !== 'inherit'), (0, _defineProperty3.default)(_classNames, classes.fontSize, fontSize), _classNames), classNameProp);
	
	  return _react2.default.createElement(
	    'svg',
	    (0, _extends3.default)({
	      className: className,
	      focusable: 'false',
	      viewBox: viewBox,
	      color: nativeColor,
	      'aria-hidden': titleAccess ? 'false' : 'true'
	    }, other),
	    titleAccess ? _react2.default.createElement(
	      'title',
	      null,
	      titleAccess
	    ) : null,
	    children
	  );
	}
	
	SvgIcon.propTypes =  false ? {
	  /**
	   * Node passed into the SVG element.
	   */
	  children: _propTypes2.default.node.isRequired,
	  /**
	   * Useful to extend the style applied to components.
	   */
	  classes: _propTypes2.default.object.isRequired,
	  /**
	   * @ignore
	   */
	  className: _propTypes2.default.string,
	  /**
	   * The color of the component. It supports those theme colors that make sense for this component.
	   * You can use the `nativeColor` property to apply a color attribute to the SVG element.
	   */
	  color: _propTypes2.default.oneOf(['action', 'disabled', 'error', 'inherit', 'primary', 'secondary']),
	  /**
	   * If `true`, the icon size will be determined by the font-size.
	   */
	  fontSize: _propTypes2.default.bool,
	  /**
	   * Applies a color attribute to the SVG element.
	   */
	  nativeColor: _propTypes2.default.string,
	  /**
	   * Provides a human-readable title for the element that contains it.
	   * https://www.w3.org/TR/SVG-access/#Equivalent
	   */
	  titleAccess: _propTypes2.default.string,
	  /**
	   * Allows you to redefine what the coordinates without units mean inside an SVG element.
	   * For example, if the SVG element is 500 (width) by 200 (height),
	   * and you pass viewBox="0 0 50 20",
	   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
	   * to bottom right (50,20) and each unit will be worth 10px.
	   */
	  viewBox: _propTypes2.default.string
	} : {};
	
	SvgIcon.defaultProps = {
	  color: 'inherit',
	  fontSize: false,
	  viewBox: '0 0 24 24'
	};
	
	SvgIcon.muiName = 'SvgIcon';
	
	exports.default = (0, _withStyles2.default)(styles, { name: 'MuiSvgIcon' })(SvgIcon);

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.styles = undefined;
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _withStyles = __webpack_require__(5);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _helpers = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = exports.styles = function styles(theme) {
	  return {
	    root: {
	      display: 'block',
	      margin: 0
	    },
	    display4: theme.typography.display4,
	    display3: theme.typography.display3,
	    display2: theme.typography.display2,
	    display1: theme.typography.display1,
	    headline: theme.typography.headline,
	    title: theme.typography.title,
	    subheading: theme.typography.subheading,
	    body2: theme.typography.body2,
	    body1: theme.typography.body1,
	    caption: theme.typography.caption,
	    button: theme.typography.button,
	    alignLeft: {
	      textAlign: 'left'
	    },
	    alignCenter: {
	      textAlign: 'center'
	    },
	    alignRight: {
	      textAlign: 'right'
	    },
	    alignJustify: {
	      textAlign: 'justify'
	    },
	    noWrap: {
	      overflow: 'hidden',
	      textOverflow: 'ellipsis',
	      whiteSpace: 'nowrap'
	    },
	    gutterBottom: {
	      marginBottom: '0.35em'
	    },
	    paragraph: {
	      marginBottom: theme.spacing.unit * 2
	    },
	    colorInherit: {
	      color: 'inherit'
	    },
	    colorPrimary: {
	      color: theme.palette.primary.main
	    },
	    colorSecondary: {
	      color: theme.palette.secondary.main
	    },
	    colorTextSecondary: {
	      color: theme.palette.text.secondary
	    },
	    colorError: {
	      color: theme.palette.error.main
	    }
	  };
	};
	
	function Typography(props) {
	  var _classNames;
	
	  var align = props.align,
	      classes = props.classes,
	      classNameProp = props.className,
	      componentProp = props.component,
	      color = props.color,
	      gutterBottom = props.gutterBottom,
	      headlineMapping = props.headlineMapping,
	      noWrap = props.noWrap,
	      paragraph = props.paragraph,
	      variant = props.variant,
	      other = (0, _objectWithoutProperties3.default)(props, ['align', 'classes', 'className', 'component', 'color', 'gutterBottom', 'headlineMapping', 'noWrap', 'paragraph', 'variant']);
	
	
	  var className = (0, _classnames2.default)(classes.root, classes[variant], (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes['color' + (0, _helpers.capitalize)(color)], color !== 'default'), (0, _defineProperty3.default)(_classNames, classes.noWrap, noWrap), (0, _defineProperty3.default)(_classNames, classes.gutterBottom, gutterBottom), (0, _defineProperty3.default)(_classNames, classes.paragraph, paragraph), (0, _defineProperty3.default)(_classNames, classes['align' + (0, _helpers.capitalize)(align)], align !== 'inherit'), _classNames), classNameProp);
	
	  var Component = componentProp || (paragraph ? 'p' : headlineMapping[variant]) || 'span';
	
	  return _react2.default.createElement(Component, (0, _extends3.default)({ className: className }, other));
	}
	
	Typography.propTypes =  false ? {
	  /**
	   * Set the text-align on the component.
	   */
	  align: _propTypes2.default.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
	  /**
	   * The content of the component.
	   */
	  children: _propTypes2.default.node,
	  /**
	   * Useful to extend the style applied to components.
	   */
	  classes: _propTypes2.default.object.isRequired,
	  /**
	   * @ignore
	   */
	  className: _propTypes2.default.string,
	  /**
	   * The color of the component. It supports those theme colors that make sense for this component.
	   */
	  color: _propTypes2.default.oneOf(['inherit', 'primary', 'textSecondary', 'secondary', 'error', 'default']),
	  /**
	   * The component used for the root node.
	   * Either a string to use a DOM element or a component.
	   * By default, it maps the variant to a good default headline component.
	   */
	  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	  /**
	   * If `true`, the text will have a bottom margin.
	   */
	  gutterBottom: _propTypes2.default.bool,
	  /**
	   * We are empirically mapping the variant property to a range of different DOM element types.
	   * For instance, h1 to h6. If you wish to change that mapping, you can provide your own.
	   * Alternatively, you can use the `component` property.
	   */
	  headlineMapping: _propTypes2.default.object,
	  /**
	   * If `true`, the text will not wrap, but instead will truncate with an ellipsis.
	   */
	  noWrap: _propTypes2.default.bool,
	  /**
	   * If `true`, the text will have a bottom margin.
	   */
	  paragraph: _propTypes2.default.bool,
	  /**
	   * Applies the theme typography styles.
	   */
	  variant: _propTypes2.default.oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'])
	} : {};
	
	Typography.defaultProps = {
	  align: 'inherit',
	  color: 'default',
	  gutterBottom: false,
	  headlineMapping: {
	    display4: 'h1',
	    display3: 'h1',
	    display2: 'h1',
	    display1: 'h1',
	    headline: 'h1',
	    title: 'h2',
	    subheading: 'h3',
	    body2: 'aside',
	    body1: 'p'
	  },
	  noWrap: false,
	  paragraph: false,
	  variant: 'body1'
	};
	
	exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTypography' })(Typography);

/***/ }),
/* 163 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var green = {
	  50: '#e8f5e9',
	  100: '#c8e6c9',
	  200: '#a5d6a7',
	  300: '#81c784',
	  400: '#66bb6a',
	  500: '#4caf50',
	  600: '#43a047',
	  700: '#388e3c',
	  800: '#2e7d32',
	  900: '#1b5e20',
	  A100: '#b9f6ca',
	  A200: '#69f0ae',
	  A400: '#00e676',
	  A700: '#00c853'
	};
	
	exports.default = green;

/***/ }),
/* 164 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var purple = {
	  50: '#f3e5f5',
	  100: '#e1bee7',
	  200: '#ce93d8',
	  300: '#ba68c8',
	  400: '#ab47bc',
	  500: '#9c27b0',
	  600: '#8e24aa',
	  700: '#7b1fa2',
	  800: '#6a1b9a',
	  900: '#4a148c',
	  A100: '#ea80fc',
	  A200: '#e040fb',
	  A400: '#d500f9',
	  A700: '#aa00ff'
	};
	
	exports.default = purple;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getPrototypeOf = __webpack_require__(12);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(9);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(13);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(11);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(10);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _brcast = __webpack_require__(105);
	
	var _brcast2 = _interopRequireDefault(_brcast);
	
	var _themeListener = __webpack_require__(49);
	
	var _themeListener2 = _interopRequireDefault(_themeListener);
	
	var _exactProp = __webpack_require__(50);
	
	var _exactProp2 = _interopRequireDefault(_exactProp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * This component takes a `theme` property.
	 * It makes the `theme` available down the React tree thanks to React context.
	 * This component should preferably be used at **the root of your component tree**.
	 */
	var MuiThemeProvider = function (_React$Component) {
	  (0, _inherits3.default)(MuiThemeProvider, _React$Component);
	
	  function MuiThemeProvider(props, context) {
	    (0, _classCallCheck3.default)(this, MuiThemeProvider);
	
	    // Get the outer theme from the context, can be null
	    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiThemeProvider.__proto__ || (0, _getPrototypeOf2.default)(MuiThemeProvider)).call(this, props, context));
	
	    _this.broadcast = (0, _brcast2.default)();
	    _this.unsubscribeId = null;
	    _this.outerTheme = null;
	    _this.outerTheme = _themeListener2.default.initial(context);
	    // Propagate the theme so it can be accessed by the children
	    _this.broadcast.setState(_this.mergeOuterLocalTheme(_this.props.theme));
	    return _this;
	  }
	
	  (0, _createClass3.default)(MuiThemeProvider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var _ref;
	
	      var _props = this.props,
	          sheetsManager = _props.sheetsManager,
	          disableStylesGeneration = _props.disableStylesGeneration;
	
	      var muiThemeProviderOptions = this.context.muiThemeProviderOptions || {};
	
	      if (sheetsManager !== undefined) {
	        muiThemeProviderOptions.sheetsManager = sheetsManager;
	      }
	
	      if (disableStylesGeneration !== undefined) {
	        muiThemeProviderOptions.disableStylesGeneration = disableStylesGeneration;
	      }
	
	      return _ref = {}, (0, _defineProperty3.default)(_ref, _themeListener.CHANNEL, this.broadcast), (0, _defineProperty3.default)(_ref, 'muiThemeProviderOptions', muiThemeProviderOptions), _ref;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      // Subscribe on the outer theme, if present
	      this.unsubscribeId = _themeListener2.default.subscribe(this.context, function (outerTheme) {
	        _this2.outerTheme = outerTheme;
	        // Forward the parent theme update to the children
	        _this2.broadcast.setState(_this2.mergeOuterLocalTheme(_this2.props.theme));
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // Propagate a local theme update
	      if (this.props.theme !== nextProps.theme) {
	        this.broadcast.setState(this.mergeOuterLocalTheme(nextProps.theme));
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.unsubscribeId !== null) {
	        _themeListener2.default.unsubscribe(this.context, this.unsubscribeId);
	      }
	    }
	    // We are not using the React state in order to avoid unnecessary rerender.
	
	  }, {
	    key: 'mergeOuterLocalTheme',
	
	
	    // Simple merge between the outer theme and the local theme
	    value: function mergeOuterLocalTheme(localTheme) {
	      // To support composition of theme.
	      if (typeof localTheme === 'function') {
	         false ? (0, _warning2.default)(this.outerTheme, ['Material-UI: you are providing a theme function property ' + 'to the MuiThemeProvider component:', '<MuiThemeProvider theme={outerTheme => outerTheme} />', '', 'However, no outer theme is present.', 'Make sure a theme is already injected higher in the React tree ' + 'or provide a theme object.'].join('\n')) : void 0;
	        return localTheme(this.outerTheme);
	      }
	
	      if (!this.outerTheme) {
	        return localTheme;
	      }
	
	      return (0, _extends3.default)({}, this.outerTheme, localTheme);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);
	  return MuiThemeProvider;
	}(_react2.default.Component);
	
	MuiThemeProvider.propTypes =  false ? {
	  /**
	   * You can only provide a single element with react@15, a node with react@16.
	   */
	  children: _propTypes2.default.node.isRequired,
	  /**
	   * You can disable the generation of the styles with this option.
	   * It can be useful when traversing the React tree outside of the HTML
	   * rendering step on the server.
	   * Let's say you are using react-apollo to extract all
	   * the queries made by the interface server side.
	   * You can significantly speed up the traversal with this property.
	   */
	  disableStylesGeneration: _propTypes2.default.bool,
	  /**
	   * The sheetsManager is used to deduplicate style sheet injection in the page.
	   * It's deduplicating using the (theme, styles) couple.
	   * On the server, you should provide a new instance for each request.
	   */
	  sheetsManager: _propTypes2.default.object,
	  /**
	   * A theme object.
	   */
	  theme: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]).isRequired
	} : {};
	
	MuiThemeProvider.propTypes =  false ? (0, _exactProp2.default)(MuiThemeProvider.propTypes, 'MuiThemeProvider') : {};
	
	MuiThemeProvider.childContextTypes = (0, _extends3.default)({}, _themeListener2.default.contextTypes, {
	  muiThemeProviderOptions: _propTypes2.default.object
	});
	
	MuiThemeProvider.contextTypes = (0, _extends3.default)({}, _themeListener2.default.contextTypes, {
	  muiThemeProviderOptions: _propTypes2.default.object
	});
	
	exports.default = MuiThemeProvider;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(7);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends3 = __webpack_require__(3);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	exports.default = createMixins;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createMixins(breakpoints, spacing, mixins) {
	  var _toolbar;
	
	  return (0, _extends4.default)({
	    gutters: function gutters(styles) {
	      return (0, _extends4.default)({
	        paddingLeft: spacing.unit * 2,
	        paddingRight: spacing.unit * 2
	      }, styles, (0, _defineProperty3.default)({}, breakpoints.up('sm'), (0, _extends4.default)({
	        paddingLeft: spacing.unit * 3,
	        paddingRight: spacing.unit * 3
	      }, styles[breakpoints.up('sm')])));
	    },
	    toolbar: (_toolbar = {
	      minHeight: 56
	    }, (0, _defineProperty3.default)(_toolbar, breakpoints.up('xs') + ' and (orientation: landscape)', {
	      minHeight: 48
	    }), (0, _defineProperty3.default)(_toolbar, breakpoints.up('sm'), {
	      minHeight: 64
	    }), _toolbar)
	  }, mixins);
	}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dark = exports.light = undefined;
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.default = createPalette;
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _deepmerge = __webpack_require__(24);
	
	var _deepmerge2 = _interopRequireDefault(_deepmerge);
	
	var _indigo = __webpack_require__(101);
	
	var _indigo2 = _interopRequireDefault(_indigo);
	
	var _pink = __webpack_require__(102);
	
	var _pink2 = _interopRequireDefault(_pink);
	
	var _grey = __webpack_require__(100);
	
	var _grey2 = _interopRequireDefault(_grey);
	
	var _red = __webpack_require__(103);
	
	var _red2 = _interopRequireDefault(_red);
	
	var _common = __webpack_require__(84);
	
	var _common2 = _interopRequireDefault(_common);
	
	var _colorManipulator = __webpack_require__(35);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// < 1kb payload overhead when lodash/merge is > 3kb.
	var light = exports.light = {
	  // The colors used to style the text.
	  text: {
	    // The most important text.
	    primary: 'rgba(0, 0, 0, 0.87)',
	    // Secondary text.
	    secondary: 'rgba(0, 0, 0, 0.54)',
	    // Disabled text have even lower visual prominence.
	    disabled: 'rgba(0, 0, 0, 0.38)',
	    // Text hints.
	    hint: 'rgba(0, 0, 0, 0.38)'
	  },
	  // The color used to divide different elements.
	  divider: 'rgba(0, 0, 0, 0.12)',
	  // The background colors used to style the surfaces.
	  // Consistency between these values is important.
	  background: {
	    paper: _common2.default.white,
	    default: _grey2.default[50]
	  },
	  // The colors used to style the action elements.
	  action: {
	    // The color of an active action like an icon button.
	    active: 'rgba(0, 0, 0, 0.54)',
	    // The color of an hovered action.
	    hover: 'rgba(0, 0, 0, 0.08)',
	    // The color of a selected action.
	    selected: 'rgba(0, 0, 0, 0.14)',
	    // The color of a disabled action.
	    disabled: 'rgba(0, 0, 0, 0.26)',
	    // The background color of a disabled action.
	    disabledBackground: 'rgba(0, 0, 0, 0.12)'
	  }
	};
	
	var dark = exports.dark = {
	  text: {
	    primary: _common2.default.white,
	    secondary: 'rgba(255, 255, 255, 0.7)',
	    disabled: 'rgba(255, 255, 255, 0.5)',
	    hint: 'rgba(255, 255, 255, 0.5)',
	    icon: 'rgba(255, 255, 255, 0.5)'
	  },
	  divider: 'rgba(255, 255, 255, 0.12)',
	  background: {
	    paper: _grey2.default[800],
	    default: '#303030'
	  },
	  action: {
	    active: _common2.default.white,
	    hover: 'rgba(255, 255, 255, 0.1)',
	    selected: 'rgba(255, 255, 255, 0.2)',
	    disabled: 'rgba(255, 255, 255, 0.3)',
	    disabledBackground: 'rgba(255, 255, 255, 0.12)'
	  }
	};
	
	function addLightOrDark(intent, direction, shade, tonalOffset) {
	  if (!intent[direction]) {
	    if (intent.hasOwnProperty(shade)) {
	      intent[direction] = intent[shade];
	    } else if (direction === 'light') {
	      intent.light = (0, _colorManipulator.lighten)(intent.main, tonalOffset);
	    } else if (direction === 'dark') {
	      intent.dark = (0, _colorManipulator.darken)(intent.main, tonalOffset * 1.5);
	    }
	  }
	}
	
	function createPalette(palette) {
	  var _palette$primary = palette.primary,
	      primary = _palette$primary === undefined ? {
	    light: _indigo2.default[300],
	    main: _indigo2.default[500],
	    dark: _indigo2.default[700]
	  } : _palette$primary,
	      _palette$secondary = palette.secondary,
	      secondary = _palette$secondary === undefined ? {
	    light: _pink2.default.A200,
	    main: _pink2.default.A400,
	    dark: _pink2.default.A700
	  } : _palette$secondary,
	      _palette$error = palette.error,
	      error = _palette$error === undefined ? {
	    light: _red2.default[300],
	    main: _red2.default[500],
	    dark: _red2.default[700]
	  } : _palette$error,
	      _palette$type = palette.type,
	      type = _palette$type === undefined ? 'light' : _palette$type,
	      _palette$contrastThre = palette.contrastThreshold,
	      contrastThreshold = _palette$contrastThre === undefined ? 3 : _palette$contrastThre,
	      _palette$tonalOffset = palette.tonalOffset,
	      tonalOffset = _palette$tonalOffset === undefined ? 0.2 : _palette$tonalOffset,
	      other = (0, _objectWithoutProperties3.default)(palette, ['primary', 'secondary', 'error', 'type', 'contrastThreshold', 'tonalOffset']);
	
	
	  function getContrastText(background) {
	    // Use the same logic as
	    // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
	    // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
	    var contrastText = (0, _colorManipulator.getContrastRatio)(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
	
	    if (false) {
	      var contrast = (0, _colorManipulator.getContrastRatio)(background, contrastText);
	      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(contrast >= 3, ['Material-UI: the contrast ratio of ' + contrast + ':1 for ' + contrastText + ' on ' + background, 'falls below the WACG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n')) : void 0;
	    }
	
	    return contrastText;
	  }
	
	  function augmentColor(color, mainShade, lightShade, darkShade) {
	    if (!color.main && color[mainShade]) {
	      color.main = color[mainShade];
	    }
	    addLightOrDark(color, 'light', lightShade, tonalOffset);
	    addLightOrDark(color, 'dark', darkShade, tonalOffset);
	    if (!color.contrastText) {
	      color.contrastText = getContrastText(color.main);
	    }
	  }
	
	  augmentColor(primary, 500, 300, 700);
	  augmentColor(secondary, 'A400', 'A200', 'A700');
	  augmentColor(error, 500, 300, 700);
	
	  var types = { dark: dark, light: light };
	
	   false ? (0, _warning2.default)(types[type], 'Material-UI: the palette type `' + type + '` is not supported.') : void 0;
	
	  var paletteOutput = (0, _deepmerge2.default)((0, _extends3.default)({
	    // A collection of common colors.
	    common: _common2.default,
	    // The palette type, can be light or dark.
	    type: type,
	    // The colors used to represent primary interface elements for a user.
	    primary: primary,
	    // The colors used to represent secondary interface elements for a user.
	    secondary: secondary,
	    // The colors used to represent interface elements that the user should be made aware of.
	    error: error,
	    // The grey colors.
	    grey: _grey2.default,
	    // Used by `getContrastText()` to maximize the contrast between the background and
	    // the text.
	    contrastThreshold: contrastThreshold,
	    // Take a background color and return the color of the text to maximize the contrast.
	    getContrastText: getContrastText,
	    // Used by the functions below to shift a color's luminance by approximately
	    // two indexes within its tonal palette.
	    // E.g., shift from Red 500 to Red 300 or Red 700.
	    tonalOffset: tonalOffset
	  }, types[type]), other, {
	    clone: false // No need to clone deep
	  });
	
	  return paletteOutput;
	}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _objectWithoutProperties2 = __webpack_require__(4);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.default = createTypography;
	
	var _deepmerge = __webpack_require__(24);
	
	var _deepmerge2 = _interopRequireDefault(_deepmerge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// < 1kb payload overhead when lodash/merge is > 3kb.
	
	function round(value) {
	  return Math.round(value * 1e5) / 1e5;
	}
	
	function createTypography(palette, typography) {
	  var _ref = typeof typography === 'function' ? typography(palette) : typography,
	      _ref$fontFamily = _ref.fontFamily,
	      fontFamily = _ref$fontFamily === undefined ? '"Roboto", "Helvetica", "Arial", sans-serif' : _ref$fontFamily,
	      _ref$fontSize = _ref.fontSize,
	      fontSize = _ref$fontSize === undefined ? 14 : _ref$fontSize,
	      _ref$fontWeightLight = _ref.fontWeightLight,
	      fontWeightLight = _ref$fontWeightLight === undefined ? 300 : _ref$fontWeightLight,
	      _ref$fontWeightRegula = _ref.fontWeightRegular,
	      fontWeightRegular = _ref$fontWeightRegula === undefined ? 400 : _ref$fontWeightRegula,
	      _ref$fontWeightMedium = _ref.fontWeightMedium,
	      fontWeightMedium = _ref$fontWeightMedium === undefined ? 500 : _ref$fontWeightMedium,
	      _ref$htmlFontSize = _ref.htmlFontSize,
	      htmlFontSize = _ref$htmlFontSize === undefined ? 16 : _ref$htmlFontSize,
	      other = (0, _objectWithoutProperties3.default)(_ref, ['fontFamily', 'fontSize', 'fontWeightLight', 'fontWeightRegular', 'fontWeightMedium', 'htmlFontSize']);
	
	  function pxToRem(value) {
	    return value / htmlFontSize + 'rem';
	  }
	
	  return (0, _deepmerge2.default)({
	    pxToRem: pxToRem,
	    round: round,
	    fontFamily: fontFamily,
	    fontSize: fontSize,
	    fontWeightLight: fontWeightLight,
	    fontWeightRegular: fontWeightRegular,
	    fontWeightMedium: fontWeightMedium,
	    display4: {
	      fontSize: pxToRem(112),
	      fontWeight: fontWeightLight,
	      fontFamily: fontFamily,
	      letterSpacing: '-.04em',
	      lineHeight: round(128 / 112) + 'em',
	      marginLeft: '-.06em',
	      color: palette.text.secondary
	    },
	    display3: {
	      fontSize: pxToRem(56),
	      fontWeight: fontWeightRegular,
	      fontFamily: fontFamily,
	      letterSpacing: '-.02em',
	      lineHeight: round(73 / 56) + 'em',
	      marginLeft: '-.04em',
	      color: palette.text.secondary
	    },
	    display2: {
	      fontSize: pxToRem(45),
	      fontWeight: fontWeightRegular,
	      fontFamily: fontFamily,
	      lineHeight: round(48 / 45) + 'em',
	      marginLeft: '-.04em',
	      color: palette.text.secondary
	    },
	    display1: {
	      fontSize: pxToRem(34),
	      fontWeight: fontWeightRegular,
	      fontFamily: fontFamily,
	      lineHeight: round(41 / 34) + 'em',
	      marginLeft: '-.04em',
	      color: palette.text.secondary
	    },
	    headline: {
	      fontSize: pxToRem(24),
	      fontWeight: fontWeightRegular,
	      fontFamily: fontFamily,
	      lineHeight: round(32.5 / 24) + 'em',
	      color: palette.text.primary
	    },
	    title: {
	      fontSize: pxToRem(21),
	      fontWeight: fontWeightMedium,
	      fontFamily: fontFamily,
	      lineHeight: round(24.5 / 21) + 'em',
	      color: palette.text.primary
	    },
	    subheading: {
	      fontSize: pxToRem(16),
	      fontWeight: fontWeightRegular,
	      fontFamily: fontFamily,
	      lineHeight: round(24 / 16) + 'em',
	      color: palette.text.primary
	    },
	    body2: {
	      fontSize: pxToRem(14),
	      fontWeight: fontWeightMedium,
	      fontFamily: fontFamily,
	      lineHeight: round(24 / 14) + 'em',
	      color: palette.text.primary
	    },
	    body1: {
	      fontSize: pxToRem(14),
	      fontWeight: fontWeightRegular,
	      fontFamily: fontFamily,
	      lineHeight: round(20.5 / 14) + 'em',
	      color: palette.text.primary
	    },
	    caption: {
	      fontSize: pxToRem(12),
	      fontWeight: fontWeightRegular,
	      fontFamily: fontFamily,
	      lineHeight: round(16.5 / 12) + 'em',
	      color: palette.text.secondary
	    },
	    button: {
	      fontSize: pxToRem(fontSize),
	      textTransform: 'uppercase',
	      fontWeight: fontWeightMedium,
	      fontFamily: fontFamily
	    }
	  }, other, {
	    clone: false // No need to clone deep
	  });
	}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(18);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _extends2 = __webpack_require__(3);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _deepmerge = __webpack_require__(24);
	
	var _deepmerge2 = _interopRequireDefault(_deepmerge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// < 1kb payload overhead when lodash/merge is > 3kb.
	
	function getStylesCreator(stylesOrCreator) {
	  var themingEnabled = typeof stylesOrCreator === 'function';
	
	  function create(theme, name) {
	    var styles = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;
	
	    if (!theme.overrides || !name || !theme.overrides[name]) {
	      return styles;
	    }
	
	    var overrides = theme.overrides[name];
	    var stylesWithOverrides = (0, _extends3.default)({}, styles);
	
	    (0, _keys2.default)(overrides).forEach(function (key) {
	       false ? (0, _warning2.default)(stylesWithOverrides[key], ['Material-UI: you are trying to override a style that does not exist.', 'Fix the `' + key + '` key of `theme.overrides.' + name + '`.'].join('\n')) : void 0;
	      stylesWithOverrides[key] = (0, _deepmerge2.default)(stylesWithOverrides[key], overrides[key]);
	    });
	
	    return stylesWithOverrides;
	  }
	
	  return {
	    create: create,
	    options: {},
	    themingEnabled: themingEnabled
	  };
	}
	
	exports.default = getStylesCreator;

/***/ }),
/* 170 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var shadowKeyUmbraOpacity = 0.2;
	var shadowKeyPenumbraOpacity = 0.14;
	var shadowAmbientShadowOpacity = 0.12;
	
	function createShadow() {
	  return [(arguments.length <= 0 ? undefined : arguments[0]) + 'px ' + (arguments.length <= 1 ? undefined : arguments[1]) + 'px ' + (arguments.length <= 2 ? undefined : arguments[2]) + 'px ' + (arguments.length <= 3 ? undefined : arguments[3]) + 'px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + ')', (arguments.length <= 4 ? undefined : arguments[4]) + 'px ' + (arguments.length <= 5 ? undefined : arguments[5]) + 'px ' + (arguments.length <= 6 ? undefined : arguments[6]) + 'px ' + (arguments.length <= 7 ? undefined : arguments[7]) + 'px rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + ')', (arguments.length <= 8 ? undefined : arguments[8]) + 'px ' + (arguments.length <= 9 ? undefined : arguments[9]) + 'px ' + (arguments.length <= 10 ? undefined : arguments[10]) + 'px ' + (arguments.length <= 11 ? undefined : arguments[11]) + 'px rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + ')'].join(',');
	}
	
	var shadows = ['none', createShadow(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1), createShadow(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2), createShadow(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
	
	exports.default = shadows;

/***/ }),
/* 171 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  // All components align to an 8dp square baseline grid for mobile, tablet, and desktop.
	  // https://material.io/guidelines/layout/metrics-keylines.html#metrics-keylines-baseline-grids
	  unit: 8
	};

/***/ }),
/* 172 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// We need to centralize the zIndex definitions as they work
	// like global values in the browser.
	var zIndex = {
	  mobileStepper: 1000,
	  appBar: 1100,
	  drawer: 1200,
	  modal: 1300,
	  snackbar: 1400,
	  tooltip: 1500
	};
	
	exports.default = zIndex;

/***/ }),
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.focusKeyPressed = focusKeyPressed;
	exports.detectKeyboardFocus = detectKeyboardFocus;
	exports.listenForFocusKeys = listenForFocusKeys;
	
	var _keycode = __webpack_require__(41);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _warning = __webpack_require__(8);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _contains = __webpack_require__(97);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _ownerDocument = __webpack_require__(32);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//  weak
	
	var internal = {
	  focusKeyPressed: false
	};
	
	function focusKeyPressed(pressed) {
	  if (typeof pressed !== 'undefined') {
	    internal.focusKeyPressed = Boolean(pressed);
	  }
	
	  return internal.focusKeyPressed;
	}
	
	function detectKeyboardFocus(instance, element, callback) {
	  var attempt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	
	   false ? (0, _warning2.default)(instance.keyboardFocusCheckTime, 'Material-UI: missing instance.keyboardFocusCheckTime') : void 0;
	   false ? (0, _warning2.default)(instance.keyboardFocusMaxCheckTimes, 'Material-UI: missing instance.keyboardFocusMaxCheckTimes') : void 0;
	
	  instance.keyboardFocusTimeout = setTimeout(function () {
	    var doc = (0, _ownerDocument2.default)(element);
	
	    if (focusKeyPressed() && (doc.activeElement === element || (0, _contains2.default)(element, doc.activeElement))) {
	      callback();
	    } else if (attempt < instance.keyboardFocusMaxCheckTimes) {
	      detectKeyboardFocus(instance, element, callback, attempt + 1);
	    }
	  }, instance.keyboardFocusCheckTime);
	}
	
	var FOCUS_KEYS = ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right'];
	
	function isFocusKey(event) {
	  return FOCUS_KEYS.indexOf((0, _keycode2.default)(event)) !== -1;
	}
	
	var handleKeyUpEvent = function handleKeyUpEvent(event) {
	  if (isFocusKey(event)) {
	    internal.focusKeyPressed = true;
	  }
	};
	
	function listenForFocusKeys(win) {
	  // The event listener will only be added once per window.
	  // Duplicate event listeners will be ignored by addEventListener.
	  // Also, this logic is client side only, we don't need a teardown.
	  win.addEventListener('keyup', handleKeyUpEvent);
	}

/***/ }),
/* 175 */,
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	exports.__esModule = true;
	exports.Helmet = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactSideEffect = __webpack_require__(184);
	
	var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);
	
	var _deepEqual = __webpack_require__(118);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _HelmetUtils = __webpack_require__(177);
	
	var _HelmetConstants = __webpack_require__(71);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Helmet = function Helmet(Component) {
	    var _class, _temp;
	
	    return _temp = _class = function (_React$Component) {
	        _inherits(HelmetWrapper, _React$Component);
	
	        function HelmetWrapper() {
	            _classCallCheck(this, HelmetWrapper);
	
	            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	        }
	
	        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	            return !(0, _deepEqual2.default)(this.props, nextProps);
	        };
	
	        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
	            if (!nestedChildren) {
	                return null;
	            }
	
	            switch (child.type) {
	                case _HelmetConstants.TAG_NAMES.SCRIPT:
	                case _HelmetConstants.TAG_NAMES.NOSCRIPT:
	                    return {
	                        innerHTML: nestedChildren
	                    };
	
	                case _HelmetConstants.TAG_NAMES.STYLE:
	                    return {
	                        cssText: nestedChildren
	                    };
	            }
	
	            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
	        };
	
	        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
	            var _extends2;
	
	            var child = _ref.child,
	                arrayTypeChildren = _ref.arrayTypeChildren,
	                newChildProps = _ref.newChildProps,
	                nestedChildren = _ref.nestedChildren;
	
	            return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
	        };
	
	        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
	            var _extends3, _extends4;
	
	            var child = _ref2.child,
	                newProps = _ref2.newProps,
	                newChildProps = _ref2.newChildProps,
	                nestedChildren = _ref2.nestedChildren;
	
	            switch (child.type) {
	                case _HelmetConstants.TAG_NAMES.TITLE:
	                    return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));
	
	                case _HelmetConstants.TAG_NAMES.BODY:
	                    return _extends({}, newProps, {
	                        bodyAttributes: _extends({}, newChildProps)
	                    });
	
	                case _HelmetConstants.TAG_NAMES.HTML:
	                    return _extends({}, newProps, {
	                        htmlAttributes: _extends({}, newChildProps)
	                    });
	            }
	
	            return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
	        };
	
	        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
	            var newFlattenedProps = _extends({}, newProps);
	
	            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
	                var _extends5;
	
	                newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
	            });
	
	            return newFlattenedProps;
	        };
	
	        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
	            if (false) {
	                if (!_HelmetConstants.VALID_TAG_NAMES.some(function (name) {
	                    return child.type === name;
	                })) {
	                    if (typeof child.type === "function") {
	                        return (0, _HelmetUtils.warn)("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
	                    }
	
	                    return (0, _HelmetUtils.warn)("Only elements types " + _HelmetConstants.VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
	                }
	
	                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
	                    return typeof nestedChild !== "string";
	                }))) {
	                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
	                }
	            }
	
	            return true;
	        };
	
	        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
	            var _this2 = this;
	
	            var arrayTypeChildren = {};
	
	            _react2.default.Children.forEach(children, function (child) {
	                if (!child || !child.props) {
	                    return;
	                }
	
	                var _child$props = child.props,
	                    nestedChildren = _child$props.children,
	                    childProps = _objectWithoutProperties(_child$props, ["children"]);
	
	                var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);
	
	                _this2.warnOnInvalidChildren(child, nestedChildren);
	
	                switch (child.type) {
	                    case _HelmetConstants.TAG_NAMES.LINK:
	                    case _HelmetConstants.TAG_NAMES.META:
	                    case _HelmetConstants.TAG_NAMES.NOSCRIPT:
	                    case _HelmetConstants.TAG_NAMES.SCRIPT:
	                    case _HelmetConstants.TAG_NAMES.STYLE:
	                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
	                            child: child,
	                            arrayTypeChildren: arrayTypeChildren,
	                            newChildProps: newChildProps,
	                            nestedChildren: nestedChildren
	                        });
	                        break;
	
	                    default:
	                        newProps = _this2.mapObjectTypeChildren({
	                            child: child,
	                            newProps: newProps,
	                            newChildProps: newChildProps,
	                            nestedChildren: nestedChildren
	                        });
	                        break;
	                }
	            });
	
	            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
	            return newProps;
	        };
	
	        HelmetWrapper.prototype.render = function render() {
	            var _props = this.props,
	                children = _props.children,
	                props = _objectWithoutProperties(_props, ["children"]);
	
	            var newProps = _extends({}, props);
	
	            if (children) {
	                newProps = this.mapChildrenToProps(children, newProps);
	            }
	
	            return _react2.default.createElement(Component, newProps);
	        };
	
	        _createClass(HelmetWrapper, null, [{
	            key: "canUseDOM",
	
	
	            // Component.peek comes from react-side-effect:
	            // For testing, you may use a static peek() method available on the returned component.
	            // It lets you get the current state without resetting the mounted instance stack.
	            // Don’t use it for anything other than testing.
	
	            /**
	            * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
	            * @param {Object} bodyAttributes: {"className": "root"}
	            * @param {String} defaultTitle: "Default Title"
	            * @param {Boolean} defer: true
	            * @param {Boolean} encodeSpecialCharacters: true
	            * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
	            * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
	            * @param {Array} meta: [{"name": "description", "content": "Test description"}]
	            * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
	            * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
	            * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
	            * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
	            * @param {String} title: "Title"
	            * @param {Object} titleAttributes: {"itemprop": "name"}
	            * @param {String} titleTemplate: "MySite.com - %s"
	            */
	            set: function set(canUseDOM) {
	                Component.canUseDOM = canUseDOM;
	            }
	        }]);
	
	        return HelmetWrapper;
	    }(_react2.default.Component), _class.propTypes = {
	        base: _propTypes2.default.object,
	        bodyAttributes: _propTypes2.default.object,
	        children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
	        defaultTitle: _propTypes2.default.string,
	        defer: _propTypes2.default.bool,
	        encodeSpecialCharacters: _propTypes2.default.bool,
	        htmlAttributes: _propTypes2.default.object,
	        link: _propTypes2.default.arrayOf(_propTypes2.default.object),
	        meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
	        noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
	        onChangeClientState: _propTypes2.default.func,
	        script: _propTypes2.default.arrayOf(_propTypes2.default.object),
	        style: _propTypes2.default.arrayOf(_propTypes2.default.object),
	        title: _propTypes2.default.string,
	        titleAttributes: _propTypes2.default.object,
	        titleTemplate: _propTypes2.default.string
	    }, _class.defaultProps = {
	        defer: true,
	        encodeSpecialCharacters: true
	    }, _class.peek = Component.peek, _class.rewind = function () {
	        var mappedState = Component.rewind();
	        if (!mappedState) {
	            // provide fallback if mappedState is undefined
	            mappedState = (0, _HelmetUtils.mapStateOnServer)({
	                baseTag: [],
	                bodyAttributes: {},
	                encodeSpecialCharacters: true,
	                htmlAttributes: {},
	                linkTags: [],
	                metaTags: [],
	                noscriptTags: [],
	                scriptTags: [],
	                styleTags: [],
	                title: "",
	                titleAttributes: {}
	            });
	        }
	
	        return mappedState;
	    }, _temp;
	};
	
	var NullComponent = function NullComponent() {
	    return null;
	};
	
	var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);
	
	var HelmetExport = Helmet(HelmetSideEffects);
	HelmetExport.renderStatic = HelmetExport.rewind;
	
	exports.Helmet = HelmetExport;
	exports.default = HelmetExport;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {exports.__esModule = true;
	exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _objectAssign = __webpack_require__(175);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _HelmetConstants = __webpack_require__(71);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
	    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	    if (encode === false) {
	        return String(str);
	    }
	
	    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	};
	
	var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
	    var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
	    var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);
	
	    if (innermostTemplate && innermostTitle) {
	        // use function arg to avoid need to escape $ characters
	        return innermostTemplate.replace(/%s/g, function () {
	            return innermostTitle;
	        });
	    }
	
	    var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);
	
	    return innermostTitle || innermostDefaultTitle || undefined;
	};
	
	var getOnChangeClientState = function getOnChangeClientState(propsList) {
	    return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
	};
	
	var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
	    return propsList.filter(function (props) {
	        return typeof props[tagType] !== "undefined";
	    }).map(function (props) {
	        return props[tagType];
	    }).reduce(function (tagAttrs, current) {
	        return _extends({}, tagAttrs, current);
	    }, {});
	};
	
	var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
	    return propsList.filter(function (props) {
	        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
	    }).map(function (props) {
	        return props[_HelmetConstants.TAG_NAMES.BASE];
	    }).reverse().reduce(function (innermostBaseTag, tag) {
	        if (!innermostBaseTag.length) {
	            var keys = Object.keys(tag);
	
	            for (var i = 0; i < keys.length; i++) {
	                var attributeKey = keys[i];
	                var lowerCaseAttributeKey = attributeKey.toLowerCase();
	
	                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
	                    return innermostBaseTag.concat(tag);
	                }
	            }
	        }
	
	        return innermostBaseTag;
	    }, []);
	};
	
	var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
	    // Calculate list of tags, giving priority innermost component (end of the propslist)
	    var approvedSeenTags = {};
	
	    return propsList.filter(function (props) {
	        if (Array.isArray(props[tagName])) {
	            return true;
	        }
	        if (typeof props[tagName] !== "undefined") {
	            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
	        }
	        return false;
	    }).map(function (props) {
	        return props[tagName];
	    }).reverse().reduce(function (approvedTags, instanceTags) {
	        var instanceSeenTags = {};
	
	        instanceTags.filter(function (tag) {
	            var primaryAttributeKey = void 0;
	            var keys = Object.keys(tag);
	            for (var i = 0; i < keys.length; i++) {
	                var attributeKey = keys[i];
	                var lowerCaseAttributeKey = attributeKey.toLowerCase();
	
	                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
	                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
	                    primaryAttributeKey = lowerCaseAttributeKey;
	                }
	                // Special case for innerHTML which doesn't work lowercased
	                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
	                    primaryAttributeKey = attributeKey;
	                }
	            }
	
	            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
	                return false;
	            }
	
	            var value = tag[primaryAttributeKey].toLowerCase();
	
	            if (!approvedSeenTags[primaryAttributeKey]) {
	                approvedSeenTags[primaryAttributeKey] = {};
	            }
	
	            if (!instanceSeenTags[primaryAttributeKey]) {
	                instanceSeenTags[primaryAttributeKey] = {};
	            }
	
	            if (!approvedSeenTags[primaryAttributeKey][value]) {
	                instanceSeenTags[primaryAttributeKey][value] = true;
	                return true;
	            }
	
	            return false;
	        }).reverse().forEach(function (tag) {
	            return approvedTags.push(tag);
	        });
	
	        // Update seen tags with tags from this instance
	        var keys = Object.keys(instanceSeenTags);
	        for (var i = 0; i < keys.length; i++) {
	            var attributeKey = keys[i];
	            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
	
	            approvedSeenTags[attributeKey] = tagUnion;
	        }
	
	        return approvedTags;
	    }, []).reverse();
	};
	
	var getInnermostProperty = function getInnermostProperty(propsList, property) {
	    for (var i = propsList.length - 1; i >= 0; i--) {
	        var props = propsList[i];
	
	        if (props.hasOwnProperty(property)) {
	            return props[property];
	        }
	    }
	
	    return null;
	};
	
	var reducePropsToState = function reducePropsToState(propsList) {
	    return {
	        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
	        bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
	        defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
	        encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
	        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
	        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
	        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
	        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
	        onChangeClientState: getOnChangeClientState(propsList),
	        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
	        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
	        title: getTitleFromPropsList(propsList),
	        titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
	    };
	};
	
	var rafPolyfill = function () {
	    var clock = Date.now();
	
	    return function (callback) {
	        var currentTime = Date.now();
	
	        if (currentTime - clock > 16) {
	            clock = currentTime;
	            callback(currentTime);
	        } else {
	            setTimeout(function () {
	                rafPolyfill(callback);
	            }, 0);
	        }
	    };
	}();
	
	var cafPolyfill = function cafPolyfill(id) {
	    return clearTimeout(id);
	};
	
	var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
	
	var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;
	
	var warn = function warn(msg) {
	    return console && typeof console.warn === "function" && console.warn(msg);
	};
	
	var _helmetCallback = null;
	
	var handleClientStateChange = function handleClientStateChange(newState) {
	    if (_helmetCallback) {
	        cancelAnimationFrame(_helmetCallback);
	    }
	
	    if (newState.defer) {
	        _helmetCallback = requestAnimationFrame(function () {
	            commitTagChanges(newState, function () {
	                _helmetCallback = null;
	            });
	        });
	    } else {
	        commitTagChanges(newState);
	        _helmetCallback = null;
	    }
	};
	
	var commitTagChanges = function commitTagChanges(newState, cb) {
	    var baseTag = newState.baseTag,
	        bodyAttributes = newState.bodyAttributes,
	        htmlAttributes = newState.htmlAttributes,
	        linkTags = newState.linkTags,
	        metaTags = newState.metaTags,
	        noscriptTags = newState.noscriptTags,
	        onChangeClientState = newState.onChangeClientState,
	        scriptTags = newState.scriptTags,
	        styleTags = newState.styleTags,
	        title = newState.title,
	        titleAttributes = newState.titleAttributes;
	
	    updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
	    updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);
	
	    updateTitle(title, titleAttributes);
	
	    var tagUpdates = {
	        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
	        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
	        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
	        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
	        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
	        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
	    };
	
	    var addedTags = {};
	    var removedTags = {};
	
	    Object.keys(tagUpdates).forEach(function (tagType) {
	        var _tagUpdates$tagType = tagUpdates[tagType],
	            newTags = _tagUpdates$tagType.newTags,
	            oldTags = _tagUpdates$tagType.oldTags;
	
	
	        if (newTags.length) {
	            addedTags[tagType] = newTags;
	        }
	        if (oldTags.length) {
	            removedTags[tagType] = tagUpdates[tagType].oldTags;
	        }
	    });
	
	    cb && cb();
	
	    onChangeClientState(newState, addedTags, removedTags);
	};
	
	var flattenArray = function flattenArray(possibleArray) {
	    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
	};
	
	var updateTitle = function updateTitle(title, attributes) {
	    if (typeof title !== "undefined" && document.title !== title) {
	        document.title = flattenArray(title);
	    }
	
	    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
	};
	
	var updateAttributes = function updateAttributes(tagName, attributes) {
	    var elementTag = document.getElementsByTagName(tagName)[0];
	
	    if (!elementTag) {
	        return;
	    }
	
	    var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
	    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
	    var attributesToRemove = [].concat(helmetAttributes);
	    var attributeKeys = Object.keys(attributes);
	
	    for (var i = 0; i < attributeKeys.length; i++) {
	        var attribute = attributeKeys[i];
	        var value = attributes[attribute] || "";
	
	        if (elementTag.getAttribute(attribute) !== value) {
	            elementTag.setAttribute(attribute, value);
	        }
	
	        if (helmetAttributes.indexOf(attribute) === -1) {
	            helmetAttributes.push(attribute);
	        }
	
	        var indexToSave = attributesToRemove.indexOf(attribute);
	        if (indexToSave !== -1) {
	            attributesToRemove.splice(indexToSave, 1);
	        }
	    }
	
	    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
	        elementTag.removeAttribute(attributesToRemove[_i]);
	    }
	
	    if (helmetAttributes.length === attributesToRemove.length) {
	        elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
	    } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
	        elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
	    }
	};
	
	var updateTags = function updateTags(type, tags) {
	    var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
	    var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
	    var oldTags = Array.prototype.slice.call(tagNodes);
	    var newTags = [];
	    var indexToDelete = void 0;
	
	    if (tags && tags.length) {
	        tags.forEach(function (tag) {
	            var newElement = document.createElement(type);
	
	            for (var attribute in tag) {
	                if (tag.hasOwnProperty(attribute)) {
	                    if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
	                        newElement.innerHTML = tag.innerHTML;
	                    } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
	                        if (newElement.styleSheet) {
	                            newElement.styleSheet.cssText = tag.cssText;
	                        } else {
	                            newElement.appendChild(document.createTextNode(tag.cssText));
	                        }
	                    } else {
	                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
	                        newElement.setAttribute(attribute, value);
	                    }
	                }
	            }
	
	            newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");
	
	            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
	            if (oldTags.some(function (existingTag, index) {
	                indexToDelete = index;
	                return newElement.isEqualNode(existingTag);
	            })) {
	                oldTags.splice(indexToDelete, 1);
	            } else {
	                newTags.push(newElement);
	            }
	        });
	    }
	
	    oldTags.forEach(function (tag) {
	        return tag.parentNode.removeChild(tag);
	    });
	    newTags.forEach(function (tag) {
	        return headElement.appendChild(tag);
	    });
	
	    return {
	        oldTags: oldTags,
	        newTags: newTags
	    };
	};
	
	var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
	    return Object.keys(attributes).reduce(function (str, key) {
	        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
	        return str ? str + " " + attr : attr;
	    }, "");
	};
	
	var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
	    var attributeString = generateElementAttributesAsString(attributes);
	    var flattenedTitle = flattenArray(title);
	    return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
	};
	
	var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
	    return tags.reduce(function (str, tag) {
	        var attributeHtml = Object.keys(tag).filter(function (attribute) {
	            return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
	        }).reduce(function (string, attribute) {
	            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
	            return string ? string + " " + attr : attr;
	        }, "");
	
	        var tagContent = tag.innerHTML || tag.cssText || "";
	
	        var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;
	
	        return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
	    }, "");
	};
	
	var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
	    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    return Object.keys(attributes).reduce(function (obj, key) {
	        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
	        return obj;
	    }, initProps);
	};
	
	var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
	    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    return Object.keys(props).reduce(function (obj, key) {
	        obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
	        return obj;
	    }, initAttributes);
	};
	
	var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
	    var _initProps;
	
	    // assigning into an array to define toString function on it
	    var initProps = (_initProps = {
	        key: title
	    }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
	    var props = convertElementAttributestoReactProps(attributes, initProps);
	
	    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
	};
	
	var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
	    return tags.map(function (tag, i) {
	        var _mappedTag;
	
	        var mappedTag = (_mappedTag = {
	            key: i
	        }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);
	
	        Object.keys(tag).forEach(function (attribute) {
	            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;
	
	            if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
	                var content = tag.innerHTML || tag.cssText;
	                mappedTag.dangerouslySetInnerHTML = { __html: content };
	            } else {
	                mappedTag[mappedAttribute] = tag[attribute];
	            }
	        });
	
	        return _react2.default.createElement(type, mappedTag);
	    });
	};
	
	var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
	    switch (type) {
	        case _HelmetConstants.TAG_NAMES.TITLE:
	            return {
	                toComponent: function toComponent() {
	                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
	                },
	                toString: function toString() {
	                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
	                }
	            };
	        case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
	        case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
	            return {
	                toComponent: function toComponent() {
	                    return convertElementAttributestoReactProps(tags);
	                },
	                toString: function toString() {
	                    return generateElementAttributesAsString(tags);
	                }
	            };
	        default:
	            return {
	                toComponent: function toComponent() {
	                    return generateTagsAsReactComponent(type, tags);
	                },
	                toString: function toString() {
	                    return generateTagsAsString(type, tags, encode);
	                }
	            };
	    }
	};
	
	var mapStateOnServer = function mapStateOnServer(_ref) {
	    var baseTag = _ref.baseTag,
	        bodyAttributes = _ref.bodyAttributes,
	        encode = _ref.encode,
	        htmlAttributes = _ref.htmlAttributes,
	        linkTags = _ref.linkTags,
	        metaTags = _ref.metaTags,
	        noscriptTags = _ref.noscriptTags,
	        scriptTags = _ref.scriptTags,
	        styleTags = _ref.styleTags,
	        _ref$title = _ref.title,
	        title = _ref$title === undefined ? "" : _ref$title,
	        titleAttributes = _ref.titleAttributes;
	    return {
	        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
	        bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
	        htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
	        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
	        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
	        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
	        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
	        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
	        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
	    };
	};
	
	exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
	exports.handleClientStateChange = handleClientStateChange;
	exports.mapStateOnServer = mapStateOnServer;
	exports.reducePropsToState = reducePropsToState;
	exports.requestAnimationFrame = requestAnimationFrame;
	exports.warn = warn;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ns$jss$ns$sheetOptio;
	
	var _propTypes = __webpack_require__(2);
	
	var _ns = __webpack_require__(72);
	
	var ns = _interopRequireWildcard(_ns);
	
	var _propTypes2 = __webpack_require__(179);
	
	var _propTypes3 = _interopRequireDefault(_propTypes2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	exports['default'] = (_ns$jss$ns$sheetOptio = {}, _defineProperty(_ns$jss$ns$sheetOptio, ns.jss, _propTypes3['default'].jss), _defineProperty(_ns$jss$ns$sheetOptio, ns.sheetOptions, _propTypes.object), _defineProperty(_ns$jss$ns$sheetOptio, ns.sheetsRegistry, _propTypes3['default'].registry), _defineProperty(_ns$jss$ns$sheetOptio, ns.managers, _propTypes.object), _ns$jss$ns$sheetOptio);

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propTypes = __webpack_require__(2);
	
	exports['default'] = {
	  jss: (0, _propTypes.shape)({
	    options: (0, _propTypes.shape)({
	      createGenerateClassName: _propTypes.func.isRequired
	    }).isRequired,
	    createStyleSheet: _propTypes.func.isRequired,
	    removeStyleSheet: _propTypes.func.isRequired
	  }),
	  registry: (0, _propTypes.shape)({
	    add: _propTypes.func.isRequired,
	    toString: _propTypes.func.isRequired
	  })
	};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = connectAdvanced;
	
	var _hoistNonReactStatics = __webpack_require__(53);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _invariant = __webpack_require__(40);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _Subscription = __webpack_require__(278);
	
	var _Subscription2 = _interopRequireDefault(_Subscription);
	
	var _PropTypes = __webpack_require__(182);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var hotReloadingVersion = 0;
	var dummyState = {};
	function noop() {}
	function makeSelectorStateful(sourceSelector, store) {
	  // wrap the selector in an object that tracks its results between runs.
	  var selector = {
	    run: function runComponentSelector(props) {
	      try {
	        var nextProps = sourceSelector(store.getState(), props);
	        if (nextProps !== selector.props || selector.error) {
	          selector.shouldComponentUpdate = true;
	          selector.props = nextProps;
	          selector.error = null;
	        }
	      } catch (error) {
	        selector.shouldComponentUpdate = true;
	        selector.error = error;
	      }
	    }
	  };
	
	  return selector;
	}
	
	function connectAdvanced(
	/*
	  selectorFactory is a func that is responsible for returning the selector function used to
	  compute new props from state, props, and dispatch. For example:
	     export default connectAdvanced((dispatch, options) => (state, props) => ({
	      thing: state.things[props.thingId],
	      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
	    }))(YourComponent)
	   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
	  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
	  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
	   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
	  props. Do not use connectAdvanced directly without memoizing results between calls to your
	  selector, otherwise the Connect component will re-render on every state or props change.
	*/
	selectorFactory) {
	  var _contextTypes, _childContextTypes;
	
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$getDisplayName = _ref.getDisplayName,
	      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
	    return 'ConnectAdvanced(' + name + ')';
	  } : _ref$getDisplayName,
	      _ref$methodName = _ref.methodName,
	      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
	      _ref$renderCountProp = _ref.renderCountProp,
	      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
	      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
	      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
	      _ref$storeKey = _ref.storeKey,
	      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
	      _ref$withRef = _ref.withRef,
	      withRef = _ref$withRef === undefined ? false : _ref$withRef,
	      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);
	
	  var subscriptionKey = storeKey + 'Subscription';
	  var version = hotReloadingVersion++;
	
	  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = _PropTypes.storeShape, _contextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _contextTypes);
	  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _childContextTypes);
	
	  return function wrapWithConnect(WrappedComponent) {
	    (0, _invariant2.default)(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + (methodName + '. Instead received ' + JSON.stringify(WrappedComponent)));
	
	    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
	
	    var displayName = getDisplayName(wrappedComponentName);
	
	    var selectorFactoryOptions = _extends({}, connectOptions, {
	      getDisplayName: getDisplayName,
	      methodName: methodName,
	      renderCountProp: renderCountProp,
	      shouldHandleStateChanges: shouldHandleStateChanges,
	      storeKey: storeKey,
	      withRef: withRef,
	      displayName: displayName,
	      wrappedComponentName: wrappedComponentName,
	      WrappedComponent: WrappedComponent
	    });
	
	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);
	
	      function Connect(props, context) {
	        _classCallCheck(this, Connect);
	
	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	        _this.version = version;
	        _this.state = {};
	        _this.renderCount = 0;
	        _this.store = props[storeKey] || context[storeKey];
	        _this.propsMode = Boolean(props[storeKey]);
	        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);
	
	        (0, _invariant2.default)(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));
	
	        _this.initSelector();
	        _this.initSubscription();
	        return _this;
	      }
	
	      Connect.prototype.getChildContext = function getChildContext() {
	        var _ref2;
	
	        // If this component received store from props, its subscription should be transparent
	        // to any descendants receiving store+subscription from context; it passes along
	        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
	        // Connect to control ordering of notifications to flow top-down.
	        var subscription = this.propsMode ? null : this.subscription;
	        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
	      };
	
	      Connect.prototype.componentDidMount = function componentDidMount() {
	        if (!shouldHandleStateChanges) return;
	
	        // componentWillMount fires during server side rendering, but componentDidMount and
	        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
	        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
	        // To handle the case where a child component may have triggered a state change by
	        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
	        // re-render.
	        this.subscription.trySubscribe();
	        this.selector.run(this.props);
	        if (this.selector.shouldComponentUpdate) this.forceUpdate();
	      };
	
	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this.selector.run(nextProps);
	      };
	
	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return this.selector.shouldComponentUpdate;
	      };
	
	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        if (this.subscription) this.subscription.tryUnsubscribe();
	        this.subscription = null;
	        this.notifyNestedSubs = noop;
	        this.store = null;
	        this.selector.run = noop;
	        this.selector.shouldComponentUpdate = false;
	      };
	
	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2.default)(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
	        return this.wrappedInstance;
	      };
	
	      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
	        this.wrappedInstance = ref;
	      };
	
	      Connect.prototype.initSelector = function initSelector() {
	        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
	        this.selector = makeSelectorStateful(sourceSelector, this.store);
	        this.selector.run(this.props);
	      };
	
	      Connect.prototype.initSubscription = function initSubscription() {
	        if (!shouldHandleStateChanges) return;
	
	        // parentSub's source should match where store came from: props vs. context. A component
	        // connected to the store via props shouldn't use subscription from context, or vice versa.
	        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
	        this.subscription = new _Subscription2.default(this.store, parentSub, this.onStateChange.bind(this));
	
	        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
	        // the middle of the notification loop, where `this.subscription` will then be null. An
	        // extra null check every change can be avoided by copying the method onto `this` and then
	        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
	        // listeners logic is changed to not call listeners that have been unsubscribed in the
	        // middle of the notification loop.
	        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
	      };
	
	      Connect.prototype.onStateChange = function onStateChange() {
	        this.selector.run(this.props);
	
	        if (!this.selector.shouldComponentUpdate) {
	          this.notifyNestedSubs();
	        } else {
	          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
	          this.setState(dummyState);
	        }
	      };
	
	      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
	        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
	        // needs to notify nested subs. Once called, it unimplements itself until further state
	        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
	        // a boolean check every time avoids an extra method call most of the time, resulting
	        // in some perf boost.
	        this.componentDidUpdate = undefined;
	        this.notifyNestedSubs();
	      };
	
	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return Boolean(this.subscription) && this.subscription.isSubscribed();
	      };
	
	      Connect.prototype.addExtraProps = function addExtraProps(props) {
	        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
	        // make a shallow copy so that fields added don't leak to the original selector.
	        // this is especially important for 'ref' since that's a reference back to the component
	        // instance. a singleton memoized selector would then be holding a reference to the
	        // instance, preventing the instance from being garbage collected, and that would be bad
	        var withExtras = _extends({}, props);
	        if (withRef) withExtras.ref = this.setWrappedInstance;
	        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
	        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
	        return withExtras;
	      };
	
	      Connect.prototype.render = function render() {
	        var selector = this.selector;
	        selector.shouldComponentUpdate = false;
	
	        if (selector.error) {
	          throw selector.error;
	        } else {
	          return (0, _react.createElement)(WrappedComponent, this.addExtraProps(selector.props));
	        }
	      };
	
	      return Connect;
	    }(_react.Component);
	
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.displayName = displayName;
	    Connect.childContextTypes = childContextTypes;
	    Connect.contextTypes = contextTypes;
	    Connect.propTypes = contextTypes;
	
	    if (false) {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        var _this2 = this;
	
	        // We are hot reloading!
	        if (this.version !== version) {
	          this.version = version;
	          this.initSelector();
	
	          // If any connected descendants don't hot reload (and resubscribe in the process), their
	          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
	          // listeners, this does mean that the old versions of connected descendants will still be
	          // notified of state changes; however, their onStateChange function is a no-op so this
	          // isn't a huge deal.
	          var oldListeners = [];
	
	          if (this.subscription) {
	            oldListeners = this.subscription.listeners.get();
	            this.subscription.tryUnsubscribe();
	          }
	          this.initSubscription();
	          if (shouldHandleStateChanges) {
	            this.subscription.trySubscribe();
	            oldListeners.forEach(function (listener) {
	              return _this2.subscription.listeners.subscribe(listener);
	            });
	          }
	        }
	      };
	    }
	
	    return (0, _hoistNonReactStatics2.default)(Connect, WrappedComponent);
	  };
	}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.wrapMapToPropsConstant = wrapMapToPropsConstant;
	exports.getDependsOnOwnProps = getDependsOnOwnProps;
	exports.wrapMapToPropsFunc = wrapMapToPropsFunc;
	
	var _verifyPlainObject = __webpack_require__(183);
	
	var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function wrapMapToPropsConstant(getConstant) {
	  return function initConstantSelector(dispatch, options) {
	    var constant = getConstant(dispatch, options);
	
	    function constantSelector() {
	      return constant;
	    }
	    constantSelector.dependsOnOwnProps = false;
	    return constantSelector;
	  };
	}
	
	// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
	// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
	// whether mapToProps needs to be invoked when props have changed.
	// 
	// A length of one signals that mapToProps does not depend on props from the parent component.
	// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
	// therefore not reporting its length accurately..
	function getDependsOnOwnProps(mapToProps) {
	  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
	}
	
	// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
	// this function wraps mapToProps in a proxy function which does several things:
	// 
	//  * Detects whether the mapToProps function being called depends on props, which
	//    is used by selectorFactory to decide if it should reinvoke on props changes.
	//    
	//  * On first call, handles mapToProps if returns another function, and treats that
	//    new function as the true mapToProps for subsequent calls.
	//    
	//  * On first call, verifies the first result is a plain object, in order to warn
	//    the developer that their mapToProps function is not returning a valid result.
	//    
	function wrapMapToPropsFunc(mapToProps, methodName) {
	  return function initProxySelector(dispatch, _ref) {
	    var displayName = _ref.displayName;
	
	    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
	      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
	    };
	
	    // allow detectFactoryAndVerify to get ownProps
	    proxy.dependsOnOwnProps = true;
	
	    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
	      proxy.mapToProps = mapToProps;
	      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
	      var props = proxy(stateOrDispatch, ownProps);
	
	      if (typeof props === 'function') {
	        proxy.mapToProps = props;
	        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
	        props = proxy(stateOrDispatch, ownProps);
	      }
	
	      if (false) (0, _verifyPlainObject2.default)(props, displayName, methodName);
	
	      return props;
	    };
	
	    return proxy;
	  };
	}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.storeShape = exports.subscriptionShape = undefined;
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var subscriptionShape = exports.subscriptionShape = _propTypes2.default.shape({
	  trySubscribe: _propTypes2.default.func.isRequired,
	  tryUnsubscribe: _propTypes2.default.func.isRequired,
	  notifyNestedSubs: _propTypes2.default.func.isRequired,
	  isSubscribed: _propTypes2.default.func.isRequired
	});
	
	var storeShape = exports.storeShape = _propTypes2.default.shape({
	  subscribe: _propTypes2.default.func.isRequired,
	  dispatch: _propTypes2.default.func.isRequired,
	  getState: _propTypes2.default.func.isRequired
	});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = verifyPlainObject;
	
	var _isPlainObject = __webpack_require__(82);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _warning = __webpack_require__(86);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function verifyPlainObject(value, displayName, methodName) {
	  if (!(0, _isPlainObject2.default)(value)) {
	    (0, _warning2.default)(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
	  }
	}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
	
	var React = __webpack_require__(1);
	var React__default = _interopDefault(React);
	var ExecutionEnvironment = _interopDefault(__webpack_require__(121));
	var shallowEqual = _interopDefault(__webpack_require__(196));
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
	  if (typeof reducePropsToState !== 'function') {
	    throw new Error('Expected reducePropsToState to be a function.');
	  }
	  if (typeof handleStateChangeOnClient !== 'function') {
	    throw new Error('Expected handleStateChangeOnClient to be a function.');
	  }
	  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
	    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
	  }
	
	  function getDisplayName(WrappedComponent) {
	    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	  }
	
	  return function wrap(WrappedComponent) {
	    if (typeof WrappedComponent !== 'function') {
	      throw new Error('Expected WrappedComponent to be a React component.');
	    }
	
	    var mountedInstances = [];
	    var state = void 0;
	
	    function emitChange() {
	      state = reducePropsToState(mountedInstances.map(function (instance) {
	        return instance.props;
	      }));
	
	      if (SideEffect.canUseDOM) {
	        handleStateChangeOnClient(state);
	      } else if (mapStateOnServer) {
	        state = mapStateOnServer(state);
	      }
	    }
	
	    var SideEffect = function (_Component) {
	      _inherits(SideEffect, _Component);
	
	      function SideEffect() {
	        _classCallCheck(this, SideEffect);
	
	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	      }
	
	      // Try to use displayName of wrapped component
	      SideEffect.peek = function peek() {
	        return state;
	      };
	
	      // Expose canUseDOM so tests can monkeypatch it
	
	
	      SideEffect.rewind = function rewind() {
	        if (SideEffect.canUseDOM) {
	          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
	        }
	
	        var recordedState = state;
	        state = undefined;
	        mountedInstances = [];
	        return recordedState;
	      };
	
	      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	        return !shallowEqual(nextProps, this.props);
	      };
	
	      SideEffect.prototype.componentWillMount = function componentWillMount() {
	        mountedInstances.push(this);
	        emitChange();
	      };
	
	      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
	        emitChange();
	      };
	
	      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
	        var index = mountedInstances.indexOf(this);
	        mountedInstances.splice(index, 1);
	        emitChange();
	      };
	
	      SideEffect.prototype.render = function render() {
	        return React__default.createElement(WrappedComponent, this.props);
	      };
	
	      return SideEffect;
	    }(React.Component);
	
	    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
	    SideEffect.canUseDOM = ExecutionEnvironment.canUseDOM;
	
	
	    return SideEffect;
	  };
	}
	
	module.exports = withSideEffect;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ChildMapping = __webpack_require__(186);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var values = Object.values || function (obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	};
	
	var propTypes = {
	  /**
	   * `<TransitionGroup>` renders a `<div>` by default. You can change this
	   * behavior by providing a `component` prop.
	   */
	  component: _propTypes2.default.any,
	  /**
	   * A set of `<Transition>` components, that are toggled `in` and out as they
	   * leave. the `<TransitionGroup>` will inject specific transition props, so
	   * remember to spread them through if you are wrapping the `<Transition>` as
	   * with our `<Fade>` example.
	   */
	  children: _propTypes2.default.node,
	
	  /**
	   * A convenience prop that enables or disabled appear animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  appear: _propTypes2.default.bool,
	  /**
	   * A convenience prop that enables or disabled enter animations
	   * for all children. Note that specifying this will override any defaults set
	   * on individual children Transitions.
	   */
	  enter: _propTypes2.default.bool,
	  /**
	    * A convenience prop that enables or disabled exit animations
	    * for all children. Note that specifying this will override any defaults set
	    * on individual children Transitions.
	    */
	  exit: _propTypes2.default.bool,
	
	  /**
	   * You may need to apply reactive updates to a child as it is exiting.
	   * This is generally done by using `cloneElement` however in the case of an exiting
	   * child the element has already been removed and not accessible to the consumer.
	   *
	   * If you do need to update a child as it leaves you can provide a `childFactory`
	   * to wrap every child, even the ones that are leaving.
	   *
	   * @type Function(child: ReactElement) -> ReactElement
	   */
	  childFactory: _propTypes2.default.func
	};
	
	var defaultProps = {
	  component: 'div',
	  childFactory: function childFactory(child) {
	    return child;
	  }
	};
	
	/**
	 * The `<TransitionGroup>` component manages a set of `<Transition>` components
	 * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
	 * state machine for managing the mounting and unmounting of components over
	 * time.
	 *
	 * Consider the example below using the `Fade` CSS transition from before.
	 * As items are removed or added to the TodoList the `in` prop is toggled
	 * automatically by the `<TransitionGroup>`. You can use _any_ `<Transition>`
	 * component in a `<TransitionGroup>`, not just css.
	 *
	 * ```jsx
	 * import TransitionGroup from 'react-transition-group/TransitionGroup';
	 *
	 * class TodoList extends React.Component {
	 *   constructor(props) {
	 *     super(props)
	 *     this.state = {items: ['hello', 'world', 'click', 'me']}
	 *   }
	 *   handleAdd() {
	 *     const newItems = this.state.items.concat([
	 *       prompt('Enter some text')
	 *     ]);
	 *     this.setState({ items: newItems });
	 *   }
	 *   handleRemove(i) {
	 *     let newItems = this.state.items.slice();
	 *     newItems.splice(i, 1);
	 *     this.setState({items: newItems});
	 *   }
	 *   render() {
	 *     return (
	 *       <div>
	 *         <button onClick={() => this.handleAdd()}>Add Item</button>
	 *         <TransitionGroup>
	 *           {this.state.items.map((item, i) => (
	 *             <FadeTransition key={item}>
	 *               <div>
	 *                 {item}{' '}
	 *                 <button onClick={() => this.handleRemove(i)}>
	 *                   remove
	 *                 </button>
	 *               </div>
	 *             </FadeTransition>
	 *           ))}
	 *         </TransitionGroup>
	 *       </div>
	 *     );
	 *   }
	 * }
	 * ```
	 *
	 * Note that `<TransitionGroup>`  does not define any animation behavior!
	 * Exactly _how_ a list item animates is up to the individual `<Transition>`
	 * components. This means you can mix and match animations across different
	 * list items.
	 */
	
	var TransitionGroup = function (_React$Component) {
	  _inherits(TransitionGroup, _React$Component);
	
	  function TransitionGroup(props, context) {
	    _classCallCheck(this, TransitionGroup);
	
	    // Initial children should all be entering, dependent on appear
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));
	
	    _this.handleExited = function (key, node, originalHandler) {
	      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);
	
	      if (key in currentChildMapping) return;
	
	      if (originalHandler) originalHandler(node);
	
	      _this.setState(function (state) {
	        var children = _extends({}, state.children);
	
	        delete children[key];
	        return { children: children };
	      });
	    };
	
	    _this.state = {
	      children: (0, _ChildMapping.getChildMapping)(props.children, function (child) {
	        var onExited = function onExited(node) {
	          _this.handleExited(child.key, node, child.props.onExited);
	        };
	
	        return (0, _react.cloneElement)(child, {
	          onExited: onExited,
	          in: true,
	          appear: _this.getProp(child, 'appear'),
	          enter: _this.getProp(child, 'enter'),
	          exit: _this.getProp(child, 'exit')
	        });
	      })
	    };
	    return _this;
	  }
	
	  TransitionGroup.prototype.getChildContext = function getChildContext() {
	    return {
	      transitionGroup: { isMounting: !this.appeared }
	    };
	  };
	  // use child config unless explictly set by the Group
	
	
	  TransitionGroup.prototype.getProp = function getProp(child, prop) {
	    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;
	
	    return props[prop] != null ? props[prop] : child.props[prop];
	  };
	
	  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
	    this.appeared = true;
	  };
	
	  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    var prevChildMapping = this.state.children;
	    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
	
	    var children = (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping);
	
	    Object.keys(children).forEach(function (key) {
	      var child = children[key];
	
	      if (!(0, _react.isValidElement)(child)) return;
	
	      var onExited = function onExited(node) {
	        _this2.handleExited(child.key, node, child.props.onExited);
	      };
	
	      var hasPrev = key in prevChildMapping;
	      var hasNext = key in nextChildMapping;
	
	      var prevChild = prevChildMapping[key];
	      var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in;
	
	      // item is new (entering)
	      if (hasNext && (!hasPrev || isLeaving)) {
	        // console.log('entering', key)
	        children[key] = (0, _react.cloneElement)(child, {
	          onExited: onExited,
	          in: true,
	          exit: _this2.getProp(child, 'exit', nextProps),
	          enter: _this2.getProp(child, 'enter', nextProps)
	        });
	      }
	      // item is old (exiting)
	      else if (!hasNext && hasPrev && !isLeaving) {
	          // console.log('leaving', key)
	          children[key] = (0, _react.cloneElement)(child, { in: false });
	        }
	        // item hasn't changed transition states
	        // copy over the last transition props;
	        else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
	            // console.log('unchanged', key)
	            children[key] = (0, _react.cloneElement)(child, {
	              onExited: onExited,
	              in: prevChild.props.in,
	              exit: _this2.getProp(child, 'exit', nextProps),
	              enter: _this2.getProp(child, 'enter', nextProps)
	            });
	          }
	    });
	
	    this.setState({ children: children });
	  };
	
	  TransitionGroup.prototype.render = function render() {
	    var _props = this.props,
	        Component = _props.component,
	        childFactory = _props.childFactory,
	        props = _objectWithoutProperties(_props, ['component', 'childFactory']);
	
	    var children = this.state.children;
	
	
	    delete props.appear;
	    delete props.enter;
	    delete props.exit;
	
	    return _react2.default.createElement(
	      Component,
	      props,
	      values(children).map(childFactory)
	    );
	  };
	
	  return TransitionGroup;
	}(_react2.default.Component);
	
	TransitionGroup.childContextTypes = {
	  transitionGroup: _propTypes2.default.object.isRequired
	};
	
	
	TransitionGroup.propTypes =  false ? propTypes : {};
	TransitionGroup.defaultProps = defaultProps;
	
	exports.default = TransitionGroup;
	module.exports = exports['default'];

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.getChildMapping = getChildMapping;
	exports.mergeChildMappings = mergeChildMappings;
	
	var _react = __webpack_require__(1);
	
	/**
	 * Given `this.props.children`, return an object mapping key to child.
	 *
	 * @param {*} children `this.props.children`
	 * @return {object} Mapping of key to child
	 */
	function getChildMapping(children, mapFn) {
	  var mapper = function mapper(child) {
	    return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
	  };
	
	  var result = Object.create(null);
	  if (children) _react.Children.map(children, function (c) {
	    return c;
	  }).forEach(function (child) {
	    // run the map function here instead so that the key is the computed one
	    result[child.key] = mapper(child);
	  });
	  return result;
	}
	
	/**
	 * When you're adding or removing children some may be added or removed in the
	 * same render pass. We want to show *both* since we want to simultaneously
	 * animate elements in and out. This function takes a previous set of keys
	 * and a new set of keys and merges them with its best guess of the correct
	 * ordering. In the future we may expose some of the utilities in
	 * ReactMultiChild to make this easy, but for now React itself does not
	 * directly have this concept of the union of prevChildren and nextChildren
	 * so we implement it here.
	 *
	 * @param {object} prev prev children as returned from
	 * `ReactTransitionChildMapping.getChildMapping()`.
	 * @param {object} next next children as returned from
	 * `ReactTransitionChildMapping.getChildMapping()`.
	 * @return {object} a key set that contains all keys in `prev` and all keys
	 * in `next` in a reasonable order.
	 */
	function mergeChildMappings(prev, next) {
	  prev = prev || {};
	  next = next || {};
	
	  function getValueForKey(key) {
	    return key in next ? next[key] : prev[key];
	  }
	
	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  var nextKeysPending = Object.create(null);
	
	  var pendingKeys = [];
	  for (var prevKey in prev) {
	    if (prevKey in next) {
	      if (pendingKeys.length) {
	        nextKeysPending[prevKey] = pendingKeys;
	        pendingKeys = [];
	      }
	    } else {
	      pendingKeys.push(prevKey);
	    }
	  }
	
	  var i = void 0;
	  var childMapping = {};
	  for (var nextKey in next) {
	    if (nextKeysPending[nextKey]) {
	      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	        var pendingNextKey = nextKeysPending[nextKey][i];
	        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
	      }
	    }
	    childMapping[nextKey] = getValueForKey(nextKey);
	  }
	
	  // Finally, add the keys which didn't appear before any key in `next`
	  for (i = 0; i < pendingKeys.length; i++) {
	    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	  }
	
	  return childMapping;
	}

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.classNamesShape = exports.timeoutsShape = undefined;
	exports.transitionTimeout = transitionTimeout;
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function transitionTimeout(transitionType) {
	  var timeoutPropName = 'transition' + transitionType + 'Timeout';
	  var enabledPropName = 'transition' + transitionType;
	
	  return function (props) {
	    // If the transition is enabled
	    if (props[enabledPropName]) {
	      // If no timeout duration is provided
	      if (props[timeoutPropName] == null) {
	        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');
	
	        // If the duration isn't a number
	      } else if (typeof props[timeoutPropName] !== 'number') {
	        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
	      }
	    }
	
	    return null;
	  };
	}
	
	var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
	  enter: _propTypes2.default.number,
	  exit: _propTypes2.default.number
	}).isRequired]);
	
	var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
	  enter: _propTypes2.default.string,
	  exit: _propTypes2.default.string,
	  active: _propTypes2.default.string
	}), _propTypes2.default.shape({
	  enter: _propTypes2.default.string,
	  enterActive: _propTypes2.default.string,
	  exit: _propTypes2.default.string,
	  exitActive: _propTypes2.default.string
	})]);

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _setStatic = __webpack_require__(280);
	
	var _setStatic2 = _interopRequireDefault(_setStatic);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var setDisplayName = function setDisplayName(displayName) {
	  return (0, _setStatic2.default)('displayName', displayName);
	};
	
	exports.default = setDisplayName;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.TASK_CANCEL = exports.CHANNEL_END = exports.NOT_ITERATOR_ERROR = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = proc;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	var _scheduler = /*#__PURE__*/__webpack_require__(192);
	
	var _io = /*#__PURE__*/__webpack_require__(22);
	
	var _channel = /*#__PURE__*/__webpack_require__(37);
	
	var _buffers = /*#__PURE__*/__webpack_require__(61);
	
	function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }
	
	var NOT_ITERATOR_ERROR = exports.NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';
	
	var CHANNEL_END = exports.CHANNEL_END = {
	  toString: function toString() {
	    return '@@redux-saga/CHANNEL_END';
	  }
	};
	var TASK_CANCEL = exports.TASK_CANCEL = {
	  toString: function toString() {
	    return '@@redux-saga/TASK_CANCEL';
	  }
	};
	
	var matchers = {
	  wildcard: function wildcard() {
	    return _utils.kTrue;
	  },
	  default: function _default(pattern) {
	    return (typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) === 'symbol' ? function (input) {
	      return input.type === pattern;
	    } : function (input) {
	      return input.type === String(pattern);
	    };
	  },
	  array: function array(patterns) {
	    return function (input) {
	      return patterns.some(function (p) {
	        return matcher(p)(input);
	      });
	    };
	  },
	  predicate: function predicate(_predicate) {
	    return function (input) {
	      return _predicate(input);
	    };
	  }
	};
	
	function matcher(pattern) {
	  // prettier-ignore
	  return (pattern === '*' ? matchers.wildcard : _utils.is.array(pattern) ? matchers.array : _utils.is.stringableFunc(pattern) ? matchers.default : _utils.is.func(pattern) ? matchers.predicate : matchers.default)(pattern);
	}
	
	/**
	  Used to track a parent task and its forks
	  In the new fork model, forked tasks are attached by default to their parent
	  We model this using the concept of Parent task && main Task
	  main task is the main flow of the current Generator, the parent tasks is the
	  aggregation of the main tasks + all its forked tasks.
	  Thus the whole model represents an execution tree with multiple branches (vs the
	  linear execution tree in sequential (non parallel) programming)
	
	  A parent tasks has the following semantics
	  - It completes if all its forks either complete or all cancelled
	  - If it's cancelled, all forks are cancelled as well
	  - It aborts if any uncaught error bubbles up from forks
	  - If it completes, the return value is the one returned by the main task
	**/
	function forkQueue(name, mainTask, cb) {
	  var tasks = [],
	      result = void 0,
	      completed = false;
	  addTask(mainTask);
	
	  function abort(err) {
	    cancelAll();
	    cb(err, true);
	  }
	
	  function addTask(task) {
	    tasks.push(task);
	    task.cont = function (res, isErr) {
	      if (completed) {
	        return;
	      }
	
	      (0, _utils.remove)(tasks, task);
	      task.cont = _utils.noop;
	      if (isErr) {
	        abort(res);
	      } else {
	        if (task === mainTask) {
	          result = res;
	        }
	        if (!tasks.length) {
	          completed = true;
	          cb(result);
	        }
	      }
	    };
	    // task.cont.cancel = task.cancel
	  }
	
	  function cancelAll() {
	    if (completed) {
	      return;
	    }
	    completed = true;
	    tasks.forEach(function (t) {
	      t.cont = _utils.noop;
	      t.cancel();
	    });
	    tasks = [];
	  }
	
	  return {
	    addTask: addTask,
	    cancelAll: cancelAll,
	    abort: abort,
	    getTasks: function getTasks() {
	      return tasks;
	    },
	    taskNames: function taskNames() {
	      return tasks.map(function (t) {
	        return t.name;
	      });
	    }
	  };
	}
	
	function createTaskIterator(_ref) {
	  var context = _ref.context,
	      fn = _ref.fn,
	      args = _ref.args;
	
	  if (_utils.is.iterator(fn)) {
	    return fn;
	  }
	
	  // catch synchronous failures; see #152 and #441
	  var result = void 0,
	      error = void 0;
	  try {
	    result = fn.apply(context, args);
	  } catch (err) {
	    error = err;
	  }
	
	  // i.e. a generator function returns an iterator
	  if (_utils.is.iterator(result)) {
	    return result;
	  }
	
	  // do not bubble up synchronous failures for detached forks
	  // instead create a failed task. See #152 and #441
	  return error ? (0, _utils.makeIterator)(function () {
	    throw error;
	  }) : (0, _utils.makeIterator)(function () {
	    var pc = void 0;
	    var eff = { done: false, value: result };
	    var ret = function ret(value) {
	      return { done: true, value: value };
	    };
	    return function (arg) {
	      if (!pc) {
	        pc = true;
	        return eff;
	      } else {
	        return ret(arg);
	      }
	    };
	  }());
	}
	
	var wrapHelper = function wrapHelper(helper) {
	  return { fn: helper };
	};
	
	function proc(iterator) {
	  var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	    return _utils.noop;
	  };
	  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _utils.noop;
	  var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _utils.noop;
	  var parentContext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
	  var parentEffectId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
	  var name = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'anonymous';
	  var cont = arguments[8];
	
	  (0, _utils.check)(iterator, _utils.is.iterator, NOT_ITERATOR_ERROR);
	
	  var effectsString = '[...effects]';
	  var runParallelEffect = (0, _utils.deprecate)(runAllEffect, (0, _utils.updateIncentive)(effectsString, 'all(' + effectsString + ')'));
	
	  var sagaMonitor = options.sagaMonitor,
	      logger = options.logger,
	      onError = options.onError;
	
	  var log = logger || _utils.log;
	  var logError = function logError(err) {
	    var message = err.sagaStack;
	
	    if (!message && err.stack) {
	      message = err.stack.split('\n')[0].indexOf(err.message) !== -1 ? err.stack : 'Error: ' + err.message + '\n' + err.stack;
	    }
	
	    log('error', 'uncaught at ' + name, message || err.message || err);
	  };
	  var stdChannel = (0, _channel.stdChannel)(subscribe);
	  var taskContext = Object.create(parentContext);
	  /**
	    Tracks the current effect cancellation
	    Each time the generator progresses. calling runEffect will set a new value
	    on it. It allows propagating cancellation to child effects
	  **/
	  next.cancel = _utils.noop;
	
	  /**
	    Creates a new task descriptor for this generator, We'll also create a main task
	    to track the main flow (besides other forked tasks)
	  **/
	  var task = newTask(parentEffectId, name, iterator, cont);
	  var mainTask = { name: name, cancel: cancelMain, isRunning: true };
	  var taskQueue = forkQueue(name, mainTask, end);
	
	  /**
	    cancellation of the main task. We'll simply resume the Generator with a Cancel
	  **/
	  function cancelMain() {
	    if (mainTask.isRunning && !mainTask.isCancelled) {
	      mainTask.isCancelled = true;
	      next(TASK_CANCEL);
	    }
	  }
	
	  /**
	    This may be called by a parent generator to trigger/propagate cancellation
	    cancel all pending tasks (including the main task), then end the current task.
	     Cancellation propagates down to the whole execution tree holded by this Parent task
	    It's also propagated to all joiners of this task and their execution tree/joiners
	     Cancellation is noop for terminated/Cancelled tasks tasks
	  **/
	  function cancel() {
	    /**
	      We need to check both Running and Cancelled status
	      Tasks can be Cancelled but still Running
	    **/
	    if (iterator._isRunning && !iterator._isCancelled) {
	      iterator._isCancelled = true;
	      taskQueue.cancelAll();
	      /**
	        Ending with a Never result will propagate the Cancellation to all joiners
	      **/
	      end(TASK_CANCEL);
	    }
	  }
	  /**
	    attaches cancellation logic to this task's continuation
	    this will permit cancellation to propagate down the call chain
	  **/
	  cont && (cont.cancel = cancel);
	
	  // tracks the running status
	  iterator._isRunning = true;
	
	  // kicks up the generator
	  next();
	
	  // then return the task descriptor to the caller
	  return task;
	
	  /**
	    This is the generator driver
	    It's a recursive async/continuation function which calls itself
	    until the generator terminates or throws
	  **/
	  function next(arg, isErr) {
	    // Preventive measure. If we end up here, then there is really something wrong
	    if (!mainTask.isRunning) {
	      throw new Error('Trying to resume an already finished generator');
	    }
	
	    try {
	      var result = void 0;
	      if (isErr) {
	        result = iterator.throw(arg);
	      } else if (arg === TASK_CANCEL) {
	        /**
	          getting TASK_CANCEL automatically cancels the main task
	          We can get this value here
	           - By cancelling the parent task manually
	          - By joining a Cancelled task
	        **/
	        mainTask.isCancelled = true;
	        /**
	          Cancels the current effect; this will propagate the cancellation down to any called tasks
	        **/
	        next.cancel();
	        /**
	          If this Generator has a `return` method then invokes it
	          This will jump to the finally block
	        **/
	        result = _utils.is.func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL };
	      } else if (arg === CHANNEL_END) {
	        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
	        result = _utils.is.func(iterator.return) ? iterator.return() : { done: true };
	      } else {
	        result = iterator.next(arg);
	      }
	
	      if (!result.done) {
	        runEffect(result.value, parentEffectId, '', next);
	      } else {
	        /**
	          This Generator has ended, terminate the main task and notify the fork queue
	        **/
	        mainTask.isMainRunning = false;
	        mainTask.cont && mainTask.cont(result.value);
	      }
	    } catch (error) {
	      if (mainTask.isCancelled) {
	        logError(error);
	      }
	      mainTask.isMainRunning = false;
	      mainTask.cont(error, true);
	    }
	  }
	
	  function end(result, isErr) {
	    iterator._isRunning = false;
	    stdChannel.close();
	    if (!isErr) {
	      iterator._result = result;
	      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
	    } else {
	      if (result instanceof Error) {
	        Object.defineProperty(result, 'sagaStack', {
	          value: 'at ' + name + ' \n ' + (result.sagaStack || result.stack),
	          configurable: true
	        });
	      }
	      if (!task.cont) {
	        if (result instanceof Error && onError) {
	          onError(result);
	        } else {
	          logError(result);
	        }
	      }
	      iterator._error = result;
	      iterator._isAborted = true;
	      iterator._deferredEnd && iterator._deferredEnd.reject(result);
	    }
	    task.cont && task.cont(result, isErr);
	    task.joiners.forEach(function (j) {
	      return j.cb(result, isErr);
	    });
	    task.joiners = null;
	  }
	
	  function runEffect(effect, parentEffectId) {
	    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	    var cb = arguments[3];
	
	    var effectId = (0, _utils.uid)();
	    sagaMonitor && sagaMonitor.effectTriggered({ effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect });
	
	    /**
	      completion callback and cancel callback are mutually exclusive
	      We can't cancel an already completed effect
	      And We can't complete an already cancelled effectId
	    **/
	    var effectSettled = void 0;
	
	    // Completion callback passed to the appropriate effect runner
	    function currCb(res, isErr) {
	      if (effectSettled) {
	        return;
	      }
	
	      effectSettled = true;
	      cb.cancel = _utils.noop; // defensive measure
	      if (sagaMonitor) {
	        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
	      }
	      cb(res, isErr);
	    }
	    // tracks down the current cancel
	    currCb.cancel = _utils.noop;
	
	    // setup cancellation logic on the parent cb
	    cb.cancel = function () {
	      // prevents cancelling an already completed effect
	      if (effectSettled) {
	        return;
	      }
	
	      effectSettled = true;
	      /**
	        propagates cancel downward
	        catch uncaught cancellations errors; since we can no longer call the completion
	        callback, log errors raised during cancellations into the console
	      **/
	      try {
	        currCb.cancel();
	      } catch (err) {
	        logError(err);
	      }
	      currCb.cancel = _utils.noop; // defensive measure
	
	      sagaMonitor && sagaMonitor.effectCancelled(effectId);
	    };
	
	    /**
	      each effect runner must attach its own logic of cancellation to the provided callback
	      it allows this generator to propagate cancellation downward.
	       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
	      And the setup must occur before calling the callback
	       This is a sort of inversion of control: called async functions are responsible
	      for completing the flow by calling the provided continuation; while caller functions
	      are responsible for aborting the current flow by calling the attached cancel function
	       Library users can attach their own cancellation logic to promises by defining a
	      promise[CANCEL] method in their returned promises
	      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
	    **/
	    var data = void 0;
	    // prettier-ignore
	    return (
	      // Non declarative effect
	      _utils.is.promise(effect) ? resolvePromise(effect, currCb) : _utils.is.helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : _utils.is.iterator(effect) ? resolveIterator(effect, effectId, name, currCb)
	
	      // declarative effects
	      : _utils.is.array(effect) ? runParallelEffect(effect, effectId, currCb) : (data = _io.asEffect.take(effect)) ? runTakeEffect(data, currCb) : (data = _io.asEffect.put(effect)) ? runPutEffect(data, currCb) : (data = _io.asEffect.all(effect)) ? runAllEffect(data, effectId, currCb) : (data = _io.asEffect.race(effect)) ? runRaceEffect(data, effectId, currCb) : (data = _io.asEffect.call(effect)) ? runCallEffect(data, effectId, currCb) : (data = _io.asEffect.cps(effect)) ? runCPSEffect(data, currCb) : (data = _io.asEffect.fork(effect)) ? runForkEffect(data, effectId, currCb) : (data = _io.asEffect.join(effect)) ? runJoinEffect(data, currCb) : (data = _io.asEffect.cancel(effect)) ? runCancelEffect(data, currCb) : (data = _io.asEffect.select(effect)) ? runSelectEffect(data, currCb) : (data = _io.asEffect.actionChannel(effect)) ? runChannelEffect(data, currCb) : (data = _io.asEffect.flush(effect)) ? runFlushEffect(data, currCb) : (data = _io.asEffect.cancelled(effect)) ? runCancelledEffect(data, currCb) : (data = _io.asEffect.getContext(effect)) ? runGetContextEffect(data, currCb) : (data = _io.asEffect.setContext(effect)) ? runSetContextEffect(data, currCb) : /* anything else returned as is */currCb(effect)
	    );
	  }
	
	  function resolvePromise(promise, cb) {
	    var cancelPromise = promise[_utils.CANCEL];
	    if (_utils.is.func(cancelPromise)) {
	      cb.cancel = cancelPromise;
	    } else if (_utils.is.func(promise.abort)) {
	      cb.cancel = function () {
	        return promise.abort();
	      };
	      // TODO: add support for the fetch API, whenever they get around to
	      // adding cancel support
	    }
	    promise.then(cb, function (error) {
	      return cb(error, true);
	    });
	  }
	
	  function resolveIterator(iterator, effectId, name, cb) {
	    proc(iterator, subscribe, dispatch, getState, taskContext, options, effectId, name, cb);
	  }
	
	  function runTakeEffect(_ref2, cb) {
	    var channel = _ref2.channel,
	        pattern = _ref2.pattern,
	        maybe = _ref2.maybe;
	
	    channel = channel || stdChannel;
	    var takeCb = function takeCb(inp) {
	      return inp instanceof Error ? cb(inp, true) : (0, _channel.isEnd)(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
	    };
	    try {
	      channel.take(takeCb, matcher(pattern));
	    } catch (err) {
	      return cb(err, true);
	    }
	    cb.cancel = takeCb.cancel;
	  }
	
	  function runPutEffect(_ref3, cb) {
	    var channel = _ref3.channel,
	        action = _ref3.action,
	        resolve = _ref3.resolve;
	
	    /**
	      Schedule the put in case another saga is holding a lock.
	      The put will be executed atomically. ie nested puts will execute after
	      this put has terminated.
	    **/
	    (0, _scheduler.asap)(function () {
	      var result = void 0;
	      try {
	        result = (channel ? channel.put : dispatch)(action);
	      } catch (error) {
	        // If we have a channel or `put.resolve` was used then bubble up the error.
	        if (channel || resolve) return cb(error, true);
	        logError(error);
	      }
	
	      if (resolve && _utils.is.promise(result)) {
	        resolvePromise(result, cb);
	      } else {
	        return cb(result);
	      }
	    });
	    // Put effects are non cancellables
	  }
	
	  function runCallEffect(_ref4, effectId, cb) {
	    var context = _ref4.context,
	        fn = _ref4.fn,
	        args = _ref4.args;
	
	    var result = void 0;
	    // catch synchronous failures; see #152
	    try {
	      result = fn.apply(context, args);
	    } catch (error) {
	      return cb(error, true);
	    }
	    return _utils.is.promise(result) ? resolvePromise(result, cb) : _utils.is.iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
	  }
	
	  function runCPSEffect(_ref5, cb) {
	    var context = _ref5.context,
	        fn = _ref5.fn,
	        args = _ref5.args;
	
	    // CPS (ie node style functions) can define their own cancellation logic
	    // by setting cancel field on the cb
	
	    // catch synchronous failures; see #152
	    try {
	      var cpsCb = function cpsCb(err, res) {
	        return _utils.is.undef(err) ? cb(res) : cb(err, true);
	      };
	      fn.apply(context, args.concat(cpsCb));
	      if (cpsCb.cancel) {
	        cb.cancel = function () {
	          return cpsCb.cancel();
	        };
	      }
	    } catch (error) {
	      return cb(error, true);
	    }
	  }
	
	  function runForkEffect(_ref6, effectId, cb) {
	    var context = _ref6.context,
	        fn = _ref6.fn,
	        args = _ref6.args,
	        detached = _ref6.detached;
	
	    var taskIterator = createTaskIterator({ context: context, fn: fn, args: args });
	
	    try {
	      (0, _scheduler.suspend)();
	      var _task = proc(taskIterator, subscribe, dispatch, getState, taskContext, options, effectId, fn.name, detached ? null : _utils.noop);
	
	      if (detached) {
	        cb(_task);
	      } else {
	        if (taskIterator._isRunning) {
	          taskQueue.addTask(_task);
	          cb(_task);
	        } else if (taskIterator._error) {
	          taskQueue.abort(taskIterator._error);
	        } else {
	          cb(_task);
	        }
	      }
	    } finally {
	      (0, _scheduler.flush)();
	    }
	    // Fork effects are non cancellables
	  }
	
	  function runJoinEffect(t, cb) {
	    if (t.isRunning()) {
	      var joiner = { task: task, cb: cb };
	      cb.cancel = function () {
	        return (0, _utils.remove)(t.joiners, joiner);
	      };
	      t.joiners.push(joiner);
	    } else {
	      t.isAborted() ? cb(t.error(), true) : cb(t.result());
	    }
	  }
	
	  function runCancelEffect(taskToCancel, cb) {
	    if (taskToCancel === _utils.SELF_CANCELLATION) {
	      taskToCancel = task;
	    }
	    if (taskToCancel.isRunning()) {
	      taskToCancel.cancel();
	    }
	    cb();
	    // cancel effects are non cancellables
	  }
	
	  function runAllEffect(effects, effectId, cb) {
	    var keys = Object.keys(effects);
	
	    if (!keys.length) {
	      return cb(_utils.is.array(effects) ? [] : {});
	    }
	
	    var completedCount = 0;
	    var completed = void 0;
	    var results = {};
	    var childCbs = {};
	
	    function checkEffectEnd() {
	      if (completedCount === keys.length) {
	        completed = true;
	        cb(_utils.is.array(effects) ? _utils.array.from(_extends({}, results, { length: keys.length })) : results);
	      }
	    }
	
	    keys.forEach(function (key) {
	      var chCbAtKey = function chCbAtKey(res, isErr) {
	        if (completed) {
	          return;
	        }
	        if (isErr || (0, _channel.isEnd)(res) || res === CHANNEL_END || res === TASK_CANCEL) {
	          cb.cancel();
	          cb(res, isErr);
	        } else {
	          results[key] = res;
	          completedCount++;
	          checkEffectEnd();
	        }
	      };
	      chCbAtKey.cancel = _utils.noop;
	      childCbs[key] = chCbAtKey;
	    });
	
	    cb.cancel = function () {
	      if (!completed) {
	        completed = true;
	        keys.forEach(function (key) {
	          return childCbs[key].cancel();
	        });
	      }
	    };
	
	    keys.forEach(function (key) {
	      return runEffect(effects[key], effectId, key, childCbs[key]);
	    });
	  }
	
	  function runRaceEffect(effects, effectId, cb) {
	    var completed = void 0;
	    var keys = Object.keys(effects);
	    var childCbs = {};
	
	    keys.forEach(function (key) {
	      var chCbAtKey = function chCbAtKey(res, isErr) {
	        if (completed) {
	          return;
	        }
	
	        if (isErr) {
	          // Race Auto cancellation
	          cb.cancel();
	          cb(res, true);
	        } else if (!(0, _channel.isEnd)(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
	          var _response;
	
	          cb.cancel();
	          completed = true;
	          var response = (_response = {}, _response[key] = res, _response);
	          cb(_utils.is.array(effects) ? [].slice.call(_extends({}, response, { length: keys.length })) : response);
	        }
	      };
	      chCbAtKey.cancel = _utils.noop;
	      childCbs[key] = chCbAtKey;
	    });
	
	    cb.cancel = function () {
	      // prevents unnecessary cancellation
	      if (!completed) {
	        completed = true;
	        keys.forEach(function (key) {
	          return childCbs[key].cancel();
	        });
	      }
	    };
	    keys.forEach(function (key) {
	      if (completed) {
	        return;
	      }
	      runEffect(effects[key], effectId, key, childCbs[key]);
	    });
	  }
	
	  function runSelectEffect(_ref7, cb) {
	    var selector = _ref7.selector,
	        args = _ref7.args;
	
	    try {
	      var state = selector.apply(undefined, [getState()].concat(args));
	      cb(state);
	    } catch (error) {
	      cb(error, true);
	    }
	  }
	
	  function runChannelEffect(_ref8, cb) {
	    var pattern = _ref8.pattern,
	        buffer = _ref8.buffer;
	
	    var match = matcher(pattern);
	    match.pattern = pattern;
	    cb((0, _channel.eventChannel)(subscribe, buffer || _buffers.buffers.fixed(), match));
	  }
	
	  function runCancelledEffect(data, cb) {
	    cb(!!mainTask.isCancelled);
	  }
	
	  function runFlushEffect(channel, cb) {
	    channel.flush(cb);
	  }
	
	  function runGetContextEffect(prop, cb) {
	    cb(taskContext[prop]);
	  }
	
	  function runSetContextEffect(props, cb) {
	    _utils.object.assign(taskContext, props);
	    cb();
	  }
	
	  function newTask(id, name, iterator, cont) {
	    var _done, _ref9, _mutatorMap;
	
	    iterator._deferredEnd = null;
	    return _ref9 = {}, _ref9[_utils.TASK] = true, _ref9.id = id, _ref9.name = name, _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
	      if (iterator._deferredEnd) {
	        return iterator._deferredEnd.promise;
	      } else {
	        var def = (0, _utils.deferred)();
	        iterator._deferredEnd = def;
	        if (!iterator._isRunning) {
	          iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
	        }
	        return def.promise;
	      }
	    }, _ref9.cont = cont, _ref9.joiners = [], _ref9.cancel = cancel, _ref9.isRunning = function isRunning() {
	      return iterator._isRunning;
	    }, _ref9.isCancelled = function isCancelled() {
	      return iterator._isCancelled;
	    }, _ref9.isAborted = function isAborted() {
	      return iterator._isAborted;
	    }, _ref9.result = function result() {
	      return iterator._result;
	    }, _ref9.error = function error() {
	      return iterator._error;
	    }, _ref9.setContext = function setContext(props) {
	      (0, _utils.check)(props, _utils.is.object, (0, _utils.createSetContextWarning)('task', props));
	      _utils.object.assign(taskContext, props);
	    }, _defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
	  }
	}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.runSaga = runSaga;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	var _proc = /*#__PURE__*/__webpack_require__(189);
	
	var _proc2 = /*#__PURE__*/_interopRequireDefault(_proc);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RUN_SAGA_SIGNATURE = 'runSaga(storeInterface, saga, ...args)';
	var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ': saga argument must be a Generator function!';
	
	function runSaga(storeInterface, saga) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  var iterator = void 0;
	
	  if (_utils.is.iterator(storeInterface)) {
	    if (false) {
	      (0, _utils.log)('warn', 'runSaga(iterator, storeInterface) has been deprecated in favor of ' + RUN_SAGA_SIGNATURE);
	    }
	    iterator = storeInterface;
	    storeInterface = saga;
	  } else {
	    (0, _utils.check)(saga, _utils.is.func, NON_GENERATOR_ERR);
	    iterator = saga.apply(undefined, args);
	    (0, _utils.check)(iterator, _utils.is.iterator, NON_GENERATOR_ERR);
	  }
	
	  var _storeInterface = storeInterface,
	      subscribe = _storeInterface.subscribe,
	      dispatch = _storeInterface.dispatch,
	      getState = _storeInterface.getState,
	      context = _storeInterface.context,
	      sagaMonitor = _storeInterface.sagaMonitor,
	      logger = _storeInterface.logger,
	      onError = _storeInterface.onError;
	
	
	  var effectId = (0, _utils.uid)();
	
	  if (sagaMonitor) {
	    // monitors are expected to have a certain interface, let's fill-in any missing ones
	    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || _utils.noop;
	    sagaMonitor.effectResolved = sagaMonitor.effectResolved || _utils.noop;
	    sagaMonitor.effectRejected = sagaMonitor.effectRejected || _utils.noop;
	    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || _utils.noop;
	    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || _utils.noop;
	
	    sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
	  }
	
	  var task = (0, _proc2.default)(iterator, subscribe, (0, _utils.wrapSagaDispatch)(dispatch), getState, context, { sagaMonitor: sagaMonitor, logger: logger, onError: onError }, effectId, saga.name);
	
	  if (sagaMonitor) {
	    sagaMonitor.effectResolved(effectId, task);
	  }
	
	  return task;
	}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.throttleHelper = exports.takeLatestHelper = exports.takeEveryHelper = exports.throttle = exports.takeLatest = exports.takeEvery = undefined;
	
	var _takeEvery = /*#__PURE__*/__webpack_require__(285);
	
	var _takeEvery2 = /*#__PURE__*/_interopRequireDefault(_takeEvery);
	
	var _takeLatest = /*#__PURE__*/__webpack_require__(286);
	
	var _takeLatest2 = /*#__PURE__*/_interopRequireDefault(_takeLatest);
	
	var _throttle = /*#__PURE__*/__webpack_require__(287);
	
	var _throttle2 = /*#__PURE__*/_interopRequireDefault(_throttle);
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var deprecationWarning = function deprecationWarning(helperName) {
	  return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
	};
	
	var takeEvery = /*#__PURE__*/(0, _utils.deprecate)(_takeEvery2.default, /*#__PURE__*/deprecationWarning('takeEvery'));
	var takeLatest = /*#__PURE__*/(0, _utils.deprecate)(_takeLatest2.default, /*#__PURE__*/deprecationWarning('takeLatest'));
	var throttle = /*#__PURE__*/(0, _utils.deprecate)(_throttle2.default, /*#__PURE__*/deprecationWarning('throttle'));
	
	exports.takeEvery = takeEvery;
	exports.takeLatest = takeLatest;
	exports.throttle = throttle;
	exports.takeEveryHelper = _takeEvery2.default;
	exports.takeLatestHelper = _takeLatest2.default;
	exports.throttleHelper = _throttle2.default;

/***/ }),
/* 192 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.asap = asap;
	exports.suspend = suspend;
	exports.flush = flush;
	var queue = [];
	/**
	  Variable to hold a counting semaphore
	  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
	    already suspended)
	  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
	    triggers flushing the queued tasks.
	**/
	var semaphore = 0;
	
	/**
	  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
	  and flushed after this task has finished (assuming the scheduler endup in a released
	  state).
	**/
	function exec(task) {
	  try {
	    suspend();
	    task();
	  } finally {
	    release();
	  }
	}
	
	/**
	  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
	**/
	function asap(task) {
	  queue.push(task);
	
	  if (!semaphore) {
	    suspend();
	    flush();
	  }
	}
	
	/**
	  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
	  scheduler is released.
	**/
	function suspend() {
	  semaphore++;
	}
	
	/**
	  Puts the scheduler in a `released` state.
	**/
	function release() {
	  semaphore--;
	}
	
	/**
	  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
	**/
	function flush() {
	  release();
	
	  var task = void 0;
	  while (!semaphore && (task = queue.shift()) !== undefined) {
	    exec(task);
	  }
	}

/***/ }),
/* 193 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }
	
	  if (funcs.length === 1) {
	    return funcs[0];
	  }
	
	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(undefined, arguments));
	    };
	  });
	}

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;
	
	var _isPlainObject = __webpack_require__(82);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _symbolObservable = __webpack_require__(197);
	
	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	
	  /**
	   * Creates a Redux store that holds the state tree.
	   * The only way to change the data in the store is to call `dispatch()` on it.
	   *
	   * There should only be a single store in your app. To specify how different
	   * parts of the state tree respond to actions, you may combine several reducers
	   * into a single reducer function by using `combineReducers`.
	   *
	   * @param {Function} reducer A function that returns the next state tree, given
	   * the current state tree and the action to handle.
	   *
	   * @param {any} [preloadedState] The initial state. You may optionally specify it
	   * to hydrate the state from the server in universal apps, or to restore a
	   * previously serialized user session.
	   * If you use `combineReducers` to produce the root reducer function, this must be
	   * an object with the same shape as `combineReducers` keys.
	   *
	   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	   * to enhance the store with third-party capabilities such as middleware,
	   * time travel, persistence, etc. The only store enhancer that ships with Redux
	   * is `applyMiddleware()`.
	   *
	   * @returns {Store} A Redux store that lets you read the state, dispatch actions
	   * and subscribe to changes.
	   */
	};function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;
	
	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }
	
	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }
	
	    return enhancer(createStore)(reducer, preloadedState);
	  }
	
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	
	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }
	
	    var isSubscribed = true;
	
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }
	
	      isSubscribed = false;
	
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }
	
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }
	
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */
	  function observable() {
	    var _ref;
	
	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }
	
	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }
	
	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ }),
/* 195 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ }),
/* 196 */
/***/ (function(module, exports) {

	module.exports = function shallowEqual(objA, objB, compare, compareContext) {
	
	    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
	
	    if(ret !== void 0) {
	        return !!ret;
	    }
	
	    if(objA === objB) {
	        return true;
	    }
	
	    if(typeof objA !== 'object' || !objA ||
	       typeof objB !== 'object' || !objB) {
	        return false;
	    }
	
	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);
	
	    if(keysA.length !== keysB.length) {
	        return false;
	    }
	
	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	
	    // Test for A's keys different from B.
	    for(var idx = 0; idx < keysA.length; idx++) {
	
	        var key = keysA[idx];
	
	        if(!bHasOwnProperty(key)) {
	            return false;
	        }
	
	        var valueA = objA[key];
	        var valueB = objB[key];
	
	        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
	
	        if(ret === false ||
	           ret === void 0 && valueA !== valueB) {
	            return false;
	        }
	
	    }
	
	    return true;
	
	};


/***/ }),
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _redux = __webpack_require__(89);
	
	var _mygramReducer = __webpack_require__(218);
	
	var _mygramReducer2 = _interopRequireDefault(_mygramReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  /* ------------- Assemble The Reducers ------------- */
	  var rootReducer = (0, _redux.combineReducers)({
	    mygram: _mygramReducer2.default
	  });
	
	  return rootReducer;
	};
	
	module.exports = exports['default'];

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.INITIAL_STATE = undefined;
	
	var _seamlessImmutable = __webpack_require__(90);
	
	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);
	
	var _mygramAction = __webpack_require__(104);
	
	var _mygramAction2 = _interopRequireDefault(_mygramAction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2.default)({
	  loading: false,
	  error: null,
	  data: null
	});
	
	function reducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _mygramAction2.default.MYGRAM_FAILURE:
	      return state.merge({ error: action.data, loading: false });
	
	    case _mygramAction2.default.LOAD_MYGRAM:
	      return state.merge({ data: null, loading: true });
	
	    case _mygramAction2.default.LOAD_MYGRAM_SUCCESS:
	      return state.merge({ data: action.data, loading: false, error: false });
	
	    default:
	      return state;
	  }
	}
	
	exports.default = reducer;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = rootSaga;
	
	var _effects = __webpack_require__(87);
	
	var _mygramSaga = __webpack_require__(220);
	
	var _mygramSaga2 = _interopRequireDefault(_mygramSaga);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* ------------- Connect Types To Sagas ------------- */
	
	function* rootSaga() {
	  yield (0, _effects.all)([(0, _mygramSaga2.default)()]);
	}
	
	/* ------------- Sagas ------------- */
	
	module.exports = exports['default'];

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _effects = __webpack_require__(87);
	
	var _request = __webpack_require__(225);
	
	var _BaseUrl = __webpack_require__(224);
	
	var _mygramAction = __webpack_require__(104);
	
	var _mygramAction2 = _interopRequireDefault(_mygramAction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function* loadMygram(_ref) {
	  var token = _ref.token;
	
	  var requestURL = _BaseUrl.mygramUrl;
	
	  try {
	    var data = yield (0, _effects.call)(_request.request, requestURL, {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    });
	    yield (0, _effects.put)((0, _mygramAction.loadMygramSuccess)(data));
	  } catch (err) {
	    var res = yield err.response.json();
	    yield (0, _effects.put)((0, _mygramAction.mygramFailure)(res.message));
	  }
	}
	
	function* mygramWatcher() {
	  yield (0, _effects.all)([(0, _effects.takeLatest)(_mygramAction2.default.LOAD_MYGRAM, loadMygram)]);
	}
	
	exports.default = mygramWatcher;
	module.exports = exports['default'];

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	exports.__esModule = true;
	exports.default = getPageContext;
	
	var _jss = __webpack_require__(54);
	
	var _styles = __webpack_require__(29);
	
	var _purple = __webpack_require__(164);
	
	var _purple2 = _interopRequireDefault(_purple);
	
	var _green = __webpack_require__(163);
	
	var _green2 = _interopRequireDefault(_green);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// A theme with custom primary and secondary color.
	// It's optional.
	/* eslint-disable no-underscore-dangle */
	
	var theme = (0, _styles.createMuiTheme)({
	  palette: {
	    primary: {
	      light: _purple2.default[300],
	      main: _purple2.default[500],
	      dark: _purple2.default[700]
	    },
	    secondary: {
	      light: _green2.default[300],
	      main: _green2.default[500],
	      dark: _green2.default[700]
	    }
	  }
	});
	
	function createPageContext() {
	  return {
	    theme: theme,
	    // This is needed in order to deduplicate the injection of CSS in the page.
	    sheetsManager: new Map(),
	    // This is needed in order to inject the critical CSS.
	    sheetsRegistry: new _jss.SheetsRegistry(),
	    // The standard class name generator.
	    generateClassName: (0, _styles.createGenerateClassName)()
	  };
	}
	
	function getPageContext() {
	  // Make sure to create a new context for every server-side request so that data
	  // isn't shared between connections (which would be bad).
	  if (!process.browser) {
	    return createPageContext();
	  }
	
	  // Reuse context on the client-side.
	  if (!global.__INIT_MATERIAL_UI__) {
	    global.__INIT_MATERIAL_UI__ = createPageContext();
	  }
	
	  return global.__INIT_MATERIAL_UI__;
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(85), (function() { return this; }())))

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _styles = __webpack_require__(29);
	
	var _Reboot = __webpack_require__(160);
	
	var _Reboot2 = _interopRequireDefault(_Reboot);
	
	var _getPageContext = __webpack_require__(221);
	
	var _getPageContext2 = _interopRequireDefault(_getPageContext);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function withRoot(Component) {
	  var WithRoot = function (_React$Component) {
	    _inherits(WithRoot, _React$Component);
	
	    function WithRoot() {
	      var _temp, _this, _ret;
	
	      _classCallCheck(this, WithRoot);
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.pageContext = null, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    WithRoot.prototype.componentWillMount = function componentWillMount() {
	      this.pageContext = this.props.pageContext || (0, _getPageContext2.default)();
	    };
	
	    WithRoot.prototype.componentDidMount = function componentDidMount() {
	      // Remove the server-side injected CSS.
	      var jssStyles = document.querySelector('#jss-server-side');
	      if (jssStyles && jssStyles.parentNode) {
	        jssStyles.parentNode.removeChild(jssStyles);
	      }
	    };
	
	    WithRoot.prototype.render = function render() {
	      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
	      return _react2.default.createElement(
	        _styles.MuiThemeProvider,
	        {
	          theme: this.pageContext.theme,
	          sheetsManager: this.pageContext.sheetsManager
	        },
	        _react2.default.createElement(_Reboot2.default, null),
	        _react2.default.createElement(Component, this.props)
	      );
	    };
	
	    return WithRoot;
	  }(_react2.default.Component);
	
	  WithRoot.propTypes = {
	    pageContext: _propTypes2.default.object
	  };
	
	  return WithRoot;
	}
	
	exports.default = withRoot;
	module.exports = exports['default'];

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.setupRedux = undefined;
	exports.configureStore = configureStore;
	exports.withReduxSaga = withReduxSaga;
	
	var _redux = __webpack_require__(89);
	
	var _seamlessImmutable = __webpack_require__(90);
	
	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);
	
	var _reduxSaga = __webpack_require__(283);
	
	var _reduxSaga2 = _interopRequireDefault(_reduxSaga);
	
	var _index = __webpack_require__(217);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(219);
	
	var _index4 = _interopRequireDefault(_index3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sagaMiddleware = (0, _reduxSaga2.default)();
	var dev = ("production") !== 'production';
	var windowExist = typeof window === 'object';
	
	/* eslint-disable no-underscore-dangle */
	var composeEnhancers = dev && windowExist && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : _redux.compose;
	
	/* eslint-enable */
	
	var setupRedux = exports.setupRedux = function setupRedux() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return (0, _redux.createStore)((0, _index2.default)(), initialState, composeEnhancers((0, _redux.applyMiddleware)(sagaMiddleware)));
	};
	
	function configureStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  /* eslint-disable no-param-reassign */
	  if (!initialState.toJS) {
	    initialState = (0, _seamlessImmutable2.default)(initialState);
	  }
	
	  var store = (0, _redux.createStore)((0, _index2.default)(), initialState, composeEnhancers((0, _redux.applyMiddleware)(sagaMiddleware)));
	
	  store.sagaTask = sagaMiddleware.run(_index4.default);
	  return store;
	}
	
	function withReduxSaga(BaseComponent) {
	  return configureStore(BaseComponent);
	}

/***/ }),
/* 224 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var mygramUrl = exports.mygramUrl = 'https://www.instagram.com/adnanfajlur/?__a=1';

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.request = request;
	exports.requestBlob = requestBlob;
	
	var _es6Promise = __webpack_require__(254);
	
	var _es6Promise2 = _interopRequireDefault(_es6Promise);
	
	__webpack_require__(261);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global fetch */
	
	_es6Promise2.default.polyfill();
	
	/**
	 * Parses the JSON returned by a network request
	 *
	 * @param  {object} response A response from a network request
	 *
	 * @return {object}          The parsed JSON from the request
	 */
	function parseJSON(response) {
	  return response.json();
	}
	
	/**
	 * Parses the BLOB returned by a network request
	 *
	 * @param  {object} response A response from a network request
	 *
	 * @return {object}          The parsed JSON from the request
	 */
	function parseBlob(response) {
	  return response.blob();
	}
	
	/**
	 * Checks if a network request came back fine, and throws an error if not
	 *
	 * @param  {object} response   A response from a network request
	 *
	 * @return {object|undefined} Returns either the response, or throws an error
	 */
	function checkStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  }
	
	  var error = new Error(response.statusText);
	  error.response = response;
	  throw error;
	}
	
	/**
	 * Requests a URL, returning a promise
	 *
	 * @param  {string} url       The URL we want to request
	 * @param  {object} [options] The options we want to pass to "fetch"
	 *
	 * @return {object}           The response data
	 */
	function request(url, options) {
	  return fetch(url, options).then(checkStatus).then(parseJSON);
	}
	
	function requestBlob(url, options) {
	  return fetch(url, options).then(checkStatus).then(parseBlob);
	}

/***/ }),
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   v4.2.4+314e4831
	 */
	
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  var type = typeof x;
	  return x !== null && (type === 'object' || type === 'function');
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	
	
	var _isArray = void 0;
	if (Array.isArray) {
	  _isArray = Array.isArray;
	} else {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = void 0;
	var customSchedulerFn = void 0;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }
	
	  return useSetTimeout();
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var vertx = Function('return this')().require('vertx');
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = void 0;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	
	  if (_state) {
	    var callback = arguments[_state - 1];
	    asap(function () {
	      return invokeCallback(_state, child, callback, parent._result);
	    });
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(2);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var TRY_CATCH_ERROR = { error: null };
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    TRY_CATCH_ERROR.error = error;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then$$1.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then$$1) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then$$1, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return resolve(promise, value);
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$1) {
	  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$1 === TRY_CATCH_ERROR) {
	      reject(promise, TRY_CATCH_ERROR.error);
	      TRY_CATCH_ERROR.error = null;
	    } else if (then$$1 === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$1)) {
	      handleForeignThenable(promise, maybeThenable, then$$1);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function resolve(promise, value) {
	  if (promise === value) {
	    reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = void 0,
	      callback = void 0,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = void 0,
	      error = void 0,
	      succeeded = void 0,
	      failed = void 0;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	    resolve(promise, value);
	  } else if (failed) {
	    reject(promise, error);
	  } else if (settled === FULFILLED) {
	    fulfill(promise, value);
	  } else if (settled === REJECTED) {
	    reject(promise, value);
	  }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      resolve(promise, value);
	    }, function rejectPromise(reason) {
	      reject(promise, reason);
	    });
	  } catch (e) {
	    reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	}
	
	var Enumerator = function () {
	  function Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(noop);
	
	    if (!this.promise[PROMISE_ID]) {
	      makePromise(this.promise);
	    }
	
	    if (isArray(input)) {
	      this.length = input.length;
	      this._remaining = input.length;
	
	      this._result = new Array(this.length);
	
	      if (this.length === 0) {
	        fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate(input);
	        if (this._remaining === 0) {
	          fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      reject(this.promise, validationError());
	    }
	  }
	
	  Enumerator.prototype._enumerate = function _enumerate(input) {
	    for (var i = 0; this._state === PENDING && i < input.length; i++) {
	      this._eachEntry(input[i], i);
	    }
	  };
	
	  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
	    var c = this._instanceConstructor;
	    var resolve$$1 = c.resolve;
	
	
	    if (resolve$$1 === resolve$1) {
	      var _then = getThen(entry);
	
	      if (_then === then && entry._state !== PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof _then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === Promise$1) {
	        var promise = new c(noop);
	        handleMaybeThenable(promise, entry, _then);
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve$$1) {
	          return resolve$$1(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve$$1(entry), i);
	    }
	  };
	
	  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
	    var promise = this.promise;
	
	
	    if (promise._state === PENDING) {
	      this._remaining--;
	
	      if (state === REJECTED) {
	        reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }
	
	    if (this._remaining === 0) {
	      fulfill(promise, this._result);
	    }
	  };
	
	  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
	    var enumerator = this;
	
	    subscribe(promise, undefined, function (value) {
	      return enumerator._settledAt(FULFILLED, i, value);
	    }, function (reason) {
	      return enumerator._settledAt(REJECTED, i, reason);
	    });
	  };
	
	  return Enumerator;
	}();
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.
	
	  Terminology
	  -----------
	
	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.
	
	  A promise can be in one of three states: pending, fulfilled, or rejected.
	
	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.
	
	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.
	
	
	  Basic Usage:
	  ------------
	
	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);
	
	    // on failure
	    reject(reason);
	  });
	
	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Advanced Usage:
	  ---------------
	
	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.
	
	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();
	
	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();
	
	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }
	
	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Unlike callbacks, promises are great composable primitives.
	
	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON
	
	    return values;
	  });
	  ```
	
	  @class Promise
	  @param {Function} resolver
	  Useful for tooling.
	  @constructor
	*/
	
	var Promise$1 = function () {
	  function Promise(resolver) {
	    this[PROMISE_ID] = nextId();
	    this._result = this._state = undefined;
	    this._subscribers = [];
	
	    if (noop !== resolver) {
	      typeof resolver !== 'function' && needsResolver();
	      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	    }
	  }
	
	  /**
	  The primary way of interacting with a promise is through its `then` method,
	  which registers callbacks to receive either a promise's eventual value or the
	  reason why the promise cannot be fulfilled.
	   ```js
	  findUser().then(function(user){
	    // user is available
	  }, function(reason){
	    // user is unavailable, and you are given the reason why
	  });
	  ```
	   Chaining
	  --------
	   The return value of `then` is itself a promise.  This second, 'downstream'
	  promise is resolved with the return value of the first promise's fulfillment
	  or rejection handler, or rejected if the handler throws an exception.
	   ```js
	  findUser().then(function (user) {
	    return user.name;
	  }, function (reason) {
	    return 'default name';
	  }).then(function (userName) {
	    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	    // will be `'default name'`
	  });
	   findUser().then(function (user) {
	    throw new Error('Found user, but still unhappy');
	  }, function (reason) {
	    throw new Error('`findUser` rejected and we're unhappy');
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	  });
	  ```
	  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	   ```js
	  findUser().then(function (user) {
	    throw new PedagogicalException('Upstream error');
	  }).then(function (value) {
	    // never reached
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // The `PedgagocialException` is propagated all the way down to here
	  });
	  ```
	   Assimilation
	  ------------
	   Sometimes the value you want to propagate to a downstream promise can only be
	  retrieved asynchronously. This can be achieved by returning a promise in the
	  fulfillment or rejection handler. The downstream promise will then be pending
	  until the returned promise is settled. This is called *assimilation*.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // The user's comments are now available
	  });
	  ```
	   If the assimliated promise rejects, then the downstream promise will also reject.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // If `findCommentsByAuthor` fulfills, we'll have the value here
	  }, function (reason) {
	    // If `findCommentsByAuthor` rejects, we'll have the reason here
	  });
	  ```
	   Simple Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let result;
	   try {
	    result = findResult();
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	  findResult(function(result, err){
	    if (err) {
	      // failure
	    } else {
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findResult().then(function(result){
	    // success
	  }, function(reason){
	    // failure
	  });
	  ```
	   Advanced Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let author, books;
	   try {
	    author = findAuthor();
	    books  = findBooksByAuthor(author);
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	   function foundBooks(books) {
	   }
	   function failure(reason) {
	   }
	   findAuthor(function(author, err){
	    if (err) {
	      failure(err);
	      // failure
	    } else {
	      try {
	        findBoooksByAuthor(author, function(books, err) {
	          if (err) {
	            failure(err);
	          } else {
	            try {
	              foundBooks(books);
	            } catch(reason) {
	              failure(reason);
	            }
	          }
	        });
	      } catch(error) {
	        failure(err);
	      }
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findAuthor().
	    then(findBooksByAuthor).
	    then(function(books){
	      // found books
	  }).catch(function(reason){
	    // something went wrong
	  });
	  ```
	   @method then
	  @param {Function} onFulfilled
	  @param {Function} onRejected
	  Useful for tooling.
	  @return {Promise}
	  */
	
	  /**
	  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	  as the catch block of a try/catch statement.
	  ```js
	  function findAuthor(){
	  throw new Error('couldn't find that author');
	  }
	  // synchronous
	  try {
	  findAuthor();
	  } catch(reason) {
	  // something went wrong
	  }
	  // async with promises
	  findAuthor().catch(function(reason){
	  // something went wrong
	  });
	  ```
	  @method catch
	  @param {Function} onRejection
	  Useful for tooling.
	  @return {Promise}
	  */
	
	
	  Promise.prototype.catch = function _catch(onRejection) {
	    return this.then(null, onRejection);
	  };
	
	  /**
	    `finally` will be invoked regardless of the promise's fate just as native
	    try/catch/finally behaves
	  
	    Synchronous example:
	  
	    ```js
	    findAuthor() {
	      if (Math.random() > 0.5) {
	        throw new Error();
	      }
	      return new Author();
	    }
	  
	    try {
	      return findAuthor(); // succeed or fail
	    } catch(error) {
	      return findOtherAuther();
	    } finally {
	      // always runs
	      // doesn't affect the return value
	    }
	    ```
	  
	    Asynchronous example:
	  
	    ```js
	    findAuthor().catch(function(reason){
	      return findOtherAuther();
	    }).finally(function(){
	      // author was either found, or not
	    });
	    ```
	  
	    @method finally
	    @param {Function} callback
	    @return {Promise}
	  */
	
	
	  Promise.prototype.finally = function _finally(callback) {
	    var promise = this;
	    var constructor = promise.constructor;
	
	    return promise.then(function (value) {
	      return constructor.resolve(callback()).then(function () {
	        return value;
	      });
	    }, function (reason) {
	      return constructor.resolve(callback()).then(function () {
	        throw reason;
	      });
	    });
	  };
	
	  return Promise;
	}();
	
	Promise$1.prototype.then = then;
	Promise$1.all = all;
	Promise$1.race = race;
	Promise$1.resolve = resolve$1;
	Promise$1.reject = reject$1;
	Promise$1._setScheduler = setScheduler;
	Promise$1._setAsap = setAsap;
	Promise$1._asap = asap;
	
	/*global self*/
	function polyfill() {
	  var local = void 0;
	
	  if (typeof global !== 'undefined') {
	    local = global;
	  } else if (typeof self !== 'undefined') {
	    local = self;
	  } else {
	    try {
	      local = Function('return this')();
	    } catch (e) {
	      throw new Error('polyfill failed because global object is unavailable in this environment');
	    }
	  }
	
	  var P = local.Promise;
	
	  if (P) {
	    var promiseToString = null;
	    try {
	      promiseToString = Object.prototype.toString.call(P.resolve());
	    } catch (e) {
	      // silently ignored
	    }
	
	    if (promiseToString === '[object Promise]' && !P.cast) {
	      return;
	    }
	  }
	
	  local.Promise = Promise$1;
	}
	
	// Strange compat..
	Promise$1.polyfill = polyfill;
	Promise$1.Promise = Promise$1;
	
	return Promise$1;
	
	})));
	
	
	
	//# sourceMappingURL=es6-promise.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(85), (function() { return this; }())))

/***/ }),
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(292);
	module.exports = self.fetch.bind(self);


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(263);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ }),
/* 263 */
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ }),
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.createProvider = createProvider;
	
	var _react = __webpack_require__(1);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _PropTypes = __webpack_require__(182);
	
	var _warning = __webpack_require__(86);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;
	
	  (0, _warning2.default)('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}
	
	function createProvider() {
	  var _Provider$childContex;
	
	  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
	  var subKey = arguments[1];
	
	  var subscriptionKey = subKey || storeKey + 'Subscription';
	
	  var Provider = function (_Component) {
	    _inherits(Provider, _Component);
	
	    Provider.prototype.getChildContext = function getChildContext() {
	      var _ref;
	
	      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
	    };
	
	    function Provider(props, context) {
	      _classCallCheck(this, Provider);
	
	      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	      _this[storeKey] = props.store;
	      return _this;
	    }
	
	    Provider.prototype.render = function render() {
	      return _react.Children.only(this.props.children);
	    };
	
	    return Provider;
	  }(_react.Component);
	
	  if (false) {
	    Provider.prototype.componentWillReceiveProps = function (nextProps) {
	      if (this[storeKey] !== nextProps.store) {
	        warnAboutReceivingStore();
	      }
	    };
	  }
	
	  Provider.propTypes = {
	    store: _PropTypes.storeShape.isRequired,
	    children: _propTypes2.default.element.isRequired
	  };
	  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = _PropTypes.storeShape.isRequired, _Provider$childContex[subscriptionKey] = _PropTypes.subscriptionShape, _Provider$childContex);
	
	  return Provider;
	}
	
	exports.default = createProvider();

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.createConnect = createConnect;
	
	var _connectAdvanced = __webpack_require__(180);
	
	var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);
	
	var _shallowEqual = __webpack_require__(279);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _mapDispatchToProps = __webpack_require__(272);
	
	var _mapDispatchToProps2 = _interopRequireDefault(_mapDispatchToProps);
	
	var _mapStateToProps = __webpack_require__(273);
	
	var _mapStateToProps2 = _interopRequireDefault(_mapStateToProps);
	
	var _mergeProps = __webpack_require__(274);
	
	var _mergeProps2 = _interopRequireDefault(_mergeProps);
	
	var _selectorFactory = __webpack_require__(275);
	
	var _selectorFactory2 = _interopRequireDefault(_selectorFactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/*
	  connect is a facade over connectAdvanced. It turns its args into a compatible
	  selectorFactory, which has the signature:
	
	    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
	  
	  connect passes its args to connectAdvanced as options, which will in turn pass them to
	  selectorFactory each time a Connect component instance is instantiated or hot reloaded.
	
	  selectorFactory returns a final props selector from its mapStateToProps,
	  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
	  mergePropsFactories, and pure args.
	
	  The resulting final props selector is called by the Connect component instance whenever
	  it receives new props or store state.
	 */
	
	function match(arg, factories, name) {
	  for (var i = factories.length - 1; i >= 0; i--) {
	    var result = factories[i](arg);
	    if (result) return result;
	  }
	
	  return function (dispatch, options) {
	    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
	  };
	}
	
	function strictEqual(a, b) {
	  return a === b;
	}
	
	// createConnect with default args builds the 'official' connect behavior. Calling it with
	// different options opens up some testing and extensibility scenarios
	function createConnect() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$connectHOC = _ref.connectHOC,
	      connectHOC = _ref$connectHOC === undefined ? _connectAdvanced2.default : _ref$connectHOC,
	      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
	      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? _mapStateToProps2.default : _ref$mapStateToPropsF,
	      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
	      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? _mapDispatchToProps2.default : _ref$mapDispatchToPro,
	      _ref$mergePropsFactor = _ref.mergePropsFactories,
	      mergePropsFactories = _ref$mergePropsFactor === undefined ? _mergeProps2.default : _ref$mergePropsFactor,
	      _ref$selectorFactory = _ref.selectorFactory,
	      selectorFactory = _ref$selectorFactory === undefined ? _selectorFactory2.default : _ref$selectorFactory;
	
	  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
	        _ref2$pure = _ref2.pure,
	        pure = _ref2$pure === undefined ? true : _ref2$pure,
	        _ref2$areStatesEqual = _ref2.areStatesEqual,
	        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
	        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
	        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? _shallowEqual2.default : _ref2$areOwnPropsEqua,
	        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
	        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? _shallowEqual2.default : _ref2$areStatePropsEq,
	        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
	        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? _shallowEqual2.default : _ref2$areMergedPropsE,
	        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);
	
	    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
	    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
	    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
	
	    return connectHOC(selectorFactory, _extends({
	      // used in error messages
	      methodName: 'connect',
	
	      // used to compute Connect's displayName from the wrapped component's displayName.
	      getDisplayName: function getDisplayName(name) {
	        return 'Connect(' + name + ')';
	      },
	
	      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
	      shouldHandleStateChanges: Boolean(mapStateToProps),
	
	      // passed through to selectorFactory
	      initMapStateToProps: initMapStateToProps,
	      initMapDispatchToProps: initMapDispatchToProps,
	      initMergeProps: initMergeProps,
	      pure: pure,
	      areStatesEqual: areStatesEqual,
	      areOwnPropsEqual: areOwnPropsEqual,
	      areStatePropsEqual: areStatePropsEqual,
	      areMergedPropsEqual: areMergedPropsEqual
	
	    }, extraOptions));
	  };
	}
	
	exports.default = createConnect();

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.whenMapDispatchToPropsIsFunction = whenMapDispatchToPropsIsFunction;
	exports.whenMapDispatchToPropsIsMissing = whenMapDispatchToPropsIsMissing;
	exports.whenMapDispatchToPropsIsObject = whenMapDispatchToPropsIsObject;
	
	var _redux = __webpack_require__(89);
	
	var _wrapMapToProps = __webpack_require__(181);
	
	function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
	  return typeof mapDispatchToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapDispatchToProps, 'mapDispatchToProps') : undefined;
	}
	
	function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
	  return !mapDispatchToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
	    return { dispatch: dispatch };
	  }) : undefined;
	}
	
	function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
	  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
	    return (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch);
	  }) : undefined;
	}
	
	exports.default = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.whenMapStateToPropsIsFunction = whenMapStateToPropsIsFunction;
	exports.whenMapStateToPropsIsMissing = whenMapStateToPropsIsMissing;
	
	var _wrapMapToProps = __webpack_require__(181);
	
	function whenMapStateToPropsIsFunction(mapStateToProps) {
	  return typeof mapStateToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapStateToProps, 'mapStateToProps') : undefined;
	}
	
	function whenMapStateToPropsIsMissing(mapStateToProps) {
	  return !mapStateToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function () {
	    return {};
	  }) : undefined;
	}
	
	exports.default = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.defaultMergeProps = defaultMergeProps;
	exports.wrapMergePropsFunc = wrapMergePropsFunc;
	exports.whenMergePropsIsFunction = whenMergePropsIsFunction;
	exports.whenMergePropsIsOmitted = whenMergePropsIsOmitted;
	
	var _verifyPlainObject = __webpack_require__(183);
	
	var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function defaultMergeProps(stateProps, dispatchProps, ownProps) {
	  return _extends({}, ownProps, stateProps, dispatchProps);
	}
	
	function wrapMergePropsFunc(mergeProps) {
	  return function initMergePropsProxy(dispatch, _ref) {
	    var displayName = _ref.displayName,
	        pure = _ref.pure,
	        areMergedPropsEqual = _ref.areMergedPropsEqual;
	
	    var hasRunOnce = false;
	    var mergedProps = void 0;
	
	    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
	      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	
	      if (hasRunOnce) {
	        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
	      } else {
	        hasRunOnce = true;
	        mergedProps = nextMergedProps;
	
	        if (false) (0, _verifyPlainObject2.default)(mergedProps, displayName, 'mergeProps');
	      }
	
	      return mergedProps;
	    };
	  };
	}
	
	function whenMergePropsIsFunction(mergeProps) {
	  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
	}
	
	function whenMergePropsIsOmitted(mergeProps) {
	  return !mergeProps ? function () {
	    return defaultMergeProps;
	  } : undefined;
	}
	
	exports.default = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.impureFinalPropsSelectorFactory = impureFinalPropsSelectorFactory;
	exports.pureFinalPropsSelectorFactory = pureFinalPropsSelectorFactory;
	exports.default = finalPropsSelectorFactory;
	
	var _verifySubselectors = __webpack_require__(276);
	
	var _verifySubselectors2 = _interopRequireDefault(_verifySubselectors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
	  return function impureFinalPropsSelector(state, ownProps) {
	    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
	  };
	}
	
	function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
	  var areStatesEqual = _ref.areStatesEqual,
	      areOwnPropsEqual = _ref.areOwnPropsEqual,
	      areStatePropsEqual = _ref.areStatePropsEqual;
	
	  var hasRunAtLeastOnce = false;
	  var state = void 0;
	  var ownProps = void 0;
	  var stateProps = void 0;
	  var dispatchProps = void 0;
	  var mergedProps = void 0;
	
	  function handleFirstCall(firstState, firstOwnProps) {
	    state = firstState;
	    ownProps = firstOwnProps;
	    stateProps = mapStateToProps(state, ownProps);
	    dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    hasRunAtLeastOnce = true;
	    return mergedProps;
	  }
	
	  function handleNewPropsAndNewState() {
	    stateProps = mapStateToProps(state, ownProps);
	
	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
	
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }
	
	  function handleNewProps() {
	    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
	
	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
	
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }
	
	  function handleNewState() {
	    var nextStateProps = mapStateToProps(state, ownProps);
	    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
	    stateProps = nextStateProps;
	
	    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	
	    return mergedProps;
	  }
	
	  function handleSubsequentCalls(nextState, nextOwnProps) {
	    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
	    var stateChanged = !areStatesEqual(nextState, state);
	    state = nextState;
	    ownProps = nextOwnProps;
	
	    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
	    if (propsChanged) return handleNewProps();
	    if (stateChanged) return handleNewState();
	    return mergedProps;
	  }
	
	  return function pureFinalPropsSelector(nextState, nextOwnProps) {
	    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
	  };
	}
	
	// TODO: Add more comments
	
	// If pure is true, the selector returned by selectorFactory will memoize its results,
	// allowing connectAdvanced's shouldComponentUpdate to return false if final
	// props have not changed. If false, the selector will always return a new
	// object and shouldComponentUpdate will always return true.
	
	function finalPropsSelectorFactory(dispatch, _ref2) {
	  var initMapStateToProps = _ref2.initMapStateToProps,
	      initMapDispatchToProps = _ref2.initMapDispatchToProps,
	      initMergeProps = _ref2.initMergeProps,
	      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);
	
	  var mapStateToProps = initMapStateToProps(dispatch, options);
	  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
	  var mergeProps = initMergeProps(dispatch, options);
	
	  if (false) {
	    (0, _verifySubselectors2.default)(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
	  }
	
	  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
	
	  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
	}

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = verifySubselectors;
	
	var _warning = __webpack_require__(86);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function verify(selector, methodName, displayName) {
	  if (!selector) {
	    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
	  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
	    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
	      (0, _warning2.default)('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
	    }
	  }
	}
	
	function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
	  verify(mapStateToProps, 'mapStateToProps', displayName);
	  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
	  verify(mergeProps, 'mergeProps', displayName);
	}

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.connect = exports.connectAdvanced = exports.createProvider = exports.Provider = undefined;
	
	var _Provider = __webpack_require__(270);
	
	var _Provider2 = _interopRequireDefault(_Provider);
	
	var _connectAdvanced = __webpack_require__(180);
	
	var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);
	
	var _connect = __webpack_require__(271);
	
	var _connect2 = _interopRequireDefault(_connect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Provider = _Provider2.default;
	exports.createProvider = _Provider.createProvider;
	exports.connectAdvanced = _connectAdvanced2.default;
	exports.connect = _connect2.default;

/***/ }),
/* 278 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// encapsulates the subscription logic for connecting a component to the redux store, as
	// well as nesting subscriptions of descendant components, so that we can ensure the
	// ancestor components re-render before descendants
	
	var CLEARED = null;
	var nullListeners = {
	  notify: function notify() {}
	};
	
	function createListenerCollection() {
	  // the current/next pattern is copied from redux's createStore code.
	  // TODO: refactor+expose that code to be reusable here?
	  var current = [];
	  var next = [];
	
	  return {
	    clear: function clear() {
	      next = CLEARED;
	      current = CLEARED;
	    },
	    notify: function notify() {
	      var listeners = current = next;
	      for (var i = 0; i < listeners.length; i++) {
	        listeners[i]();
	      }
	    },
	    get: function get() {
	      return next;
	    },
	    subscribe: function subscribe(listener) {
	      var isSubscribed = true;
	      if (next === current) next = current.slice();
	      next.push(listener);
	
	      return function unsubscribe() {
	        if (!isSubscribed || current === CLEARED) return;
	        isSubscribed = false;
	
	        if (next === current) next = current.slice();
	        next.splice(next.indexOf(listener), 1);
	      };
	    }
	  };
	}
	
	var Subscription = function () {
	  function Subscription(store, parentSub, onStateChange) {
	    _classCallCheck(this, Subscription);
	
	    this.store = store;
	    this.parentSub = parentSub;
	    this.onStateChange = onStateChange;
	    this.unsubscribe = null;
	    this.listeners = nullListeners;
	  }
	
	  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
	    this.trySubscribe();
	    return this.listeners.subscribe(listener);
	  };
	
	  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
	    this.listeners.notify();
	  };
	
	  Subscription.prototype.isSubscribed = function isSubscribed() {
	    return Boolean(this.unsubscribe);
	  };
	
	  Subscription.prototype.trySubscribe = function trySubscribe() {
	    if (!this.unsubscribe) {
	      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);
	
	      this.listeners = createListenerCollection();
	    }
	  };
	
	  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
	    if (this.unsubscribe) {
	      this.unsubscribe();
	      this.unsubscribe = null;
	      this.listeners.clear();
	      this.listeners = nullListeners;
	    }
	  };
	
	  return Subscription;
	}();
	
	exports.default = Subscription;

/***/ }),
/* 279 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = shallowEqual;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	function is(x, y) {
	  if (x === y) {
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    return x !== x && y !== y;
	  }
	}
	
	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) return true;
	
	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) return false;
	
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }
	
	  return true;
	}

/***/ }),
/* 280 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var setStatic = function setStatic(key, value) {
	  return function (BaseComponent) {
	    /* eslint-disable no-param-reassign */
	    BaseComponent[key] = value;
	    /* eslint-enable no-param-reassign */
	    return BaseComponent;
	  };
	};
	
	exports.default = setStatic;

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _shallowEqual = __webpack_require__(212);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _shallowEqual2.default;

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _setDisplayName = __webpack_require__(188);
	
	var _setDisplayName2 = _interopRequireDefault(_setDisplayName);
	
	var _wrapDisplayName = __webpack_require__(36);
	
	var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var shouldUpdate = function shouldUpdate(test) {
	  return function (BaseComponent) {
	    var factory = (0, _react.createFactory)(BaseComponent);
	
	    var ShouldUpdate = function (_Component) {
	      _inherits(ShouldUpdate, _Component);
	
	      function ShouldUpdate() {
	        _classCallCheck(this, ShouldUpdate);
	
	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	      }
	
	      ShouldUpdate.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	        return test(this.props, nextProps);
	      };
	
	      ShouldUpdate.prototype.render = function render() {
	        return factory(this.props);
	      };
	
	      return ShouldUpdate;
	    }(_react.Component);
	
	    if (false) {
	      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'shouldUpdate'))(ShouldUpdate);
	    }
	    return ShouldUpdate;
	  };
	};
	
	exports.default = shouldUpdate;

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.utils = exports.effects = exports.detach = exports.CANCEL = exports.delay = exports.throttle = exports.takeLatest = exports.takeEvery = exports.buffers = exports.channel = exports.eventChannel = exports.END = exports.runSaga = undefined;
	
	var _runSaga = /*#__PURE__*/__webpack_require__(190);
	
	Object.defineProperty(exports, 'runSaga', {
	  enumerable: true,
	  get: function get() {
	    return _runSaga.runSaga;
	  }
	});
	
	var _channel = /*#__PURE__*/__webpack_require__(37);
	
	Object.defineProperty(exports, 'END', {
	  enumerable: true,
	  get: function get() {
	    return _channel.END;
	  }
	});
	Object.defineProperty(exports, 'eventChannel', {
	  enumerable: true,
	  get: function get() {
	    return _channel.eventChannel;
	  }
	});
	Object.defineProperty(exports, 'channel', {
	  enumerable: true,
	  get: function get() {
	    return _channel.channel;
	  }
	});
	
	var _buffers = /*#__PURE__*/__webpack_require__(61);
	
	Object.defineProperty(exports, 'buffers', {
	  enumerable: true,
	  get: function get() {
	    return _buffers.buffers;
	  }
	});
	
	var _sagaHelpers = /*#__PURE__*/__webpack_require__(191);
	
	Object.defineProperty(exports, 'takeEvery', {
	  enumerable: true,
	  get: function get() {
	    return _sagaHelpers.takeEvery;
	  }
	});
	Object.defineProperty(exports, 'takeLatest', {
	  enumerable: true,
	  get: function get() {
	    return _sagaHelpers.takeLatest;
	  }
	});
	Object.defineProperty(exports, 'throttle', {
	  enumerable: true,
	  get: function get() {
	    return _sagaHelpers.throttle;
	  }
	});
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	Object.defineProperty(exports, 'delay', {
	  enumerable: true,
	  get: function get() {
	    return _utils.delay;
	  }
	});
	Object.defineProperty(exports, 'CANCEL', {
	  enumerable: true,
	  get: function get() {
	    return _utils.CANCEL;
	  }
	});
	
	var _io = /*#__PURE__*/__webpack_require__(22);
	
	Object.defineProperty(exports, 'detach', {
	  enumerable: true,
	  get: function get() {
	    return _io.detach;
	  }
	});
	
	var _middleware = /*#__PURE__*/__webpack_require__(284);
	
	var _middleware2 = /*#__PURE__*/_interopRequireDefault(_middleware);
	
	var _effects = /*#__PURE__*/__webpack_require__(87);
	
	var effects = /*#__PURE__*/_interopRequireWildcard(_effects);
	
	var _utils2 = /*#__PURE__*/__webpack_require__(288);
	
	var utils = /*#__PURE__*/_interopRequireWildcard(_utils2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _middleware2.default;
	exports.effects = effects;
	exports.utils = utils;

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = sagaMiddlewareFactory;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	var _channel = /*#__PURE__*/__webpack_require__(37);
	
	var _runSaga = /*#__PURE__*/__webpack_require__(190);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function sagaMiddlewareFactory() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var _ref$context = _ref.context,
	      context = _ref$context === undefined ? {} : _ref$context,
	      options = _objectWithoutProperties(_ref, ['context']);
	
	  var sagaMonitor = options.sagaMonitor,
	      logger = options.logger,
	      onError = options.onError;
	
	
	  if (_utils.is.func(options)) {
	    if (true) {
	      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
	    } else {
	      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
	    }
	  }
	
	  if (logger && !_utils.is.func(logger)) {
	    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
	  }
	
	  if (false) {
	    throw new Error('`options.onerror` was removed. Use `options.onError` instead.');
	  }
	
	  if (onError && !_utils.is.func(onError)) {
	    throw new Error('`options.onError` passed to the Saga middleware is not a function!');
	  }
	
	  if (options.emitter && !_utils.is.func(options.emitter)) {
	    throw new Error('`options.emitter` passed to the Saga middleware is not a function!');
	  }
	
	  function sagaMiddleware(_ref2) {
	    var getState = _ref2.getState,
	        dispatch = _ref2.dispatch;
	
	    var sagaEmitter = (0, _channel.emitter)();
	    sagaEmitter.emit = (options.emitter || _utils.ident)(sagaEmitter.emit);
	
	    sagaMiddleware.run = _runSaga.runSaga.bind(null, {
	      context: context,
	      subscribe: sagaEmitter.subscribe,
	      dispatch: dispatch,
	      getState: getState,
	      sagaMonitor: sagaMonitor,
	      logger: logger,
	      onError: onError
	    });
	
	    return function (next) {
	      return function (action) {
	        if (sagaMonitor && sagaMonitor.actionDispatched) {
	          sagaMonitor.actionDispatched(action);
	        }
	        var result = next(action); // hit reducers
	        sagaEmitter.emit(action);
	        return result;
	      };
	    };
	  }
	
	  sagaMiddleware.run = function () {
	    throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
	  };
	
	  sagaMiddleware.setContext = function (props) {
	    (0, _utils.check)(props, _utils.is.object, (0, _utils.createSetContextWarning)('sagaMiddleware', props));
	    _utils.object.assign(context, props);
	  };
	
	  return sagaMiddleware;
	}

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = takeEvery;
	
	var _fsmIterator = /*#__PURE__*/__webpack_require__(88);
	
	var _fsmIterator2 = /*#__PURE__*/_interopRequireDefault(_fsmIterator);
	
	var _io = /*#__PURE__*/__webpack_require__(22);
	
	var _channel = /*#__PURE__*/__webpack_require__(37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function takeEvery(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  var yTake = { done: false, value: (0, _io.take)(patternOrChannel) };
	  var yFork = function yFork(ac) {
	    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
	  };
	
	  var action = void 0,
	      setAction = function setAction(ac) {
	    return action = ac;
	  };
	
	  return (0, _fsmIterator2.default)({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === _channel.END ? [_fsmIterator.qEnd] : ['q1', yFork(action)];
	    }
	  }, 'q1', 'takeEvery(' + (0, _fsmIterator.safeName)(patternOrChannel) + ', ' + worker.name + ')');
	}

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = takeLatest;
	
	var _fsmIterator = /*#__PURE__*/__webpack_require__(88);
	
	var _fsmIterator2 = /*#__PURE__*/_interopRequireDefault(_fsmIterator);
	
	var _io = /*#__PURE__*/__webpack_require__(22);
	
	var _channel = /*#__PURE__*/__webpack_require__(37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function takeLatest(patternOrChannel, worker) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  var yTake = { done: false, value: (0, _io.take)(patternOrChannel) };
	  var yFork = function yFork(ac) {
	    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
	  };
	  var yCancel = function yCancel(task) {
	    return { done: false, value: (0, _io.cancel)(task) };
	  };
	
	  var task = void 0,
	      action = void 0;
	  var setTask = function setTask(t) {
	    return task = t;
	  };
	  var setAction = function setAction(ac) {
	    return action = ac;
	  };
	
	  return (0, _fsmIterator2.default)({
	    q1: function q1() {
	      return ['q2', yTake, setAction];
	    },
	    q2: function q2() {
	      return action === _channel.END ? [_fsmIterator.qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
	    },
	    q3: function q3() {
	      return ['q1', yFork(action), setTask];
	    }
	  }, 'q1', 'takeLatest(' + (0, _fsmIterator.safeName)(patternOrChannel) + ', ' + worker.name + ')');
	}

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = throttle;
	
	var _fsmIterator = /*#__PURE__*/__webpack_require__(88);
	
	var _fsmIterator2 = /*#__PURE__*/_interopRequireDefault(_fsmIterator);
	
	var _io = /*#__PURE__*/__webpack_require__(22);
	
	var _channel = /*#__PURE__*/__webpack_require__(37);
	
	var _buffers = /*#__PURE__*/__webpack_require__(61);
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function throttle(delayLength, pattern, worker) {
	  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	    args[_key - 3] = arguments[_key];
	  }
	
	  var action = void 0,
	      channel = void 0;
	
	  var yActionChannel = { done: false, value: (0, _io.actionChannel)(pattern, _buffers.buffers.sliding(1)) };
	  var yTake = function yTake() {
	    return { done: false, value: (0, _io.take)(channel) };
	  };
	  var yFork = function yFork(ac) {
	    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
	  };
	  var yDelay = { done: false, value: (0, _io.call)(_utils.delay, delayLength) };
	
	  var setAction = function setAction(ac) {
	    return action = ac;
	  };
	  var setChannel = function setChannel(ch) {
	    return channel = ch;
	  };
	
	  return (0, _fsmIterator2.default)({
	    q1: function q1() {
	      return ['q2', yActionChannel, setChannel];
	    },
	    q2: function q2() {
	      return ['q3', yTake(), setAction];
	    },
	    q3: function q3() {
	      return action === _channel.END ? [_fsmIterator.qEnd] : ['q4', yFork(action)];
	    },
	    q4: function q4() {
	      return ['q2', yDelay];
	    }
	  }, 'q1', 'throttle(' + (0, _fsmIterator.safeName)(pattern) + ', ' + worker.name + ')');
	}

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = /*#__PURE__*/__webpack_require__(15);
	
	Object.defineProperty(exports, 'TASK', {
	  enumerable: true,
	  get: function get() {
	    return _utils.TASK;
	  }
	});
	Object.defineProperty(exports, 'SAGA_ACTION', {
	  enumerable: true,
	  get: function get() {
	    return _utils.SAGA_ACTION;
	  }
	});
	Object.defineProperty(exports, 'noop', {
	  enumerable: true,
	  get: function get() {
	    return _utils.noop;
	  }
	});
	Object.defineProperty(exports, 'is', {
	  enumerable: true,
	  get: function get() {
	    return _utils.is;
	  }
	});
	Object.defineProperty(exports, 'deferred', {
	  enumerable: true,
	  get: function get() {
	    return _utils.deferred;
	  }
	});
	Object.defineProperty(exports, 'arrayOfDeffered', {
	  enumerable: true,
	  get: function get() {
	    return _utils.arrayOfDeffered;
	  }
	});
	Object.defineProperty(exports, 'createMockTask', {
	  enumerable: true,
	  get: function get() {
	    return _utils.createMockTask;
	  }
	});
	Object.defineProperty(exports, 'cloneableGenerator', {
	  enumerable: true,
	  get: function get() {
	    return _utils.cloneableGenerator;
	  }
	});
	
	var _io = /*#__PURE__*/__webpack_require__(22);
	
	Object.defineProperty(exports, 'asEffect', {
	  enumerable: true,
	  get: function get() {
	    return _io.asEffect;
	  }
	});
	
	var _proc = /*#__PURE__*/__webpack_require__(189);
	
	Object.defineProperty(exports, 'CHANNEL_END', {
	  enumerable: true,
	  get: function get() {
	    return _proc.CHANNEL_END;
	  }
	});

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = applyMiddleware;
	
	var _compose = __webpack_require__(193);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ }),
/* 290 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = combineReducers;
	
	var _createStore = __webpack_require__(194);
	
	var _isPlainObject = __webpack_require__(82);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _warning = __webpack_require__(195);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
	}
	
	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });
	
	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerShape(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	
	    if (false) {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }
	
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);
	
	  var unexpectedKeyCache = void 0;
	  if (false) {
	    unexpectedKeyCache = {};
	  }
	
	  var shapeAssertionError = void 0;
	  try {
	    assertReducerShape(finalReducers);
	  } catch (e) {
	    shapeAssertionError = e;
	  }
	
	  return function combination() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];
	
	    if (shapeAssertionError) {
	      throw shapeAssertionError;
	    }
	
	    if (false) {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }
	
	    var hasChanged = false;
	    var nextState = {};
	    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
	      var _key = finalReducerKeys[_i];
	      var reducer = finalReducers[_key];
	      var previousStateForKey = state[_key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(_key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[_key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ }),
/* 292 */
/***/ (function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]
	
	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }
	
	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function(header) {
	        this.append(header[0], header[1])
	      }, this)
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }
	
	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)
	
	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }
	
	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }
	
	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }
	
	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	
	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = String(input)
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(176);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRedux = __webpack_require__(277);
	
	var _store = __webpack_require__(223);
	
	var _withRoot = __webpack_require__(222);
	
	var _withRoot2 = _interopRequireDefault(_withRoot);
	
	var _Typography = __webpack_require__(34);
	
	var _Typography2 = _interopRequireDefault(_Typography);
	
	var _styles = __webpack_require__(29);
	
	var _Button = __webpack_require__(83);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Home = __webpack_require__(552);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _MyGram = __webpack_require__(388);
	
	var _MyGram2 = _interopRequireDefault(_MyGram);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var styles = function styles() {
	  return {
	    root: {
	      background: 'rgba(0,0,0,0.03)',
	      minHeight: '1000vh'
	    },
	    head: {
	      background: '#FFF',
	      borderBottom: '1px solid rgba(0,0,0,.0975)',
	      position: 'fixed',
	      top: '0',
	      width: '100%',
	      zIndex: '1',
	      WebkitTransition: 'height .2s ease-in-out',
	      transition: 'height .2s ease-in-out'
	    },
	    headContent: {
	      maxWidth: 1010,
	      margin: '0 auto',
	      padding: ' 0px 40px',
	      position: 'relative',
	      top: '50%',
	      WebkitTransform: 'translateY(-50%)',
	      MsTransform: 'translateY(-50%)',
	      transform: 'translateY(-50%)',
	      display: 'flex'
	    },
	    searchWrap: {
	      WebkitBoxFlex: '0',
	      WebkitFlex: '0 1 auto',
	      MsFlex: '0 1 auto',
	      flex: '0 1 auto',
	      minWidth: '125px',
	      width: '215px',
	      height: '30px',
	      position: 'relative',
	      margin: '0 auto'
	    },
	    searchInput: {
	      border: 'solid 1px #dbdbdb',
	      borderRadius: '3px',
	      color: '#999',
	      fontSize: '14px',
	      outline: 'none',
	      padding: '3px 10px 3px 26px',
	      zIndex: '2',
	      width: 200,
	      height: 28,
	      paddingLeft: '80px',
	      boxSizing: 'border-box',
	      background: 'url(https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_search_48px-128.png)',
	      backgroundSize: '16px',
	      backgroundRepeat: 'no-repeat',
	      backgroundPosition: '62px 5px',
	      backgroundColor: 'rgb(250, 250, 250)',
	      '&:focus': {
	        paddingLeft: '24px',
	        backgroundPosition: '5px',
	        backgroundColor: '#fff'
	      }
	    }
	  };
	};
	
	var Index = function (_React$Component) {
	  _inherits(Index, _React$Component);
	
	  function Index(props) {
	    _classCallCheck(this, Index);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	    _this.componentDidMount = function () {
	      window.addEventListener('scroll', _this.handleScroll);
	    };
	
	    _this.handleScroll = _this.handleScroll.bind(_this);
	    _this.state = {
	      dibawah: false,
	      data: false
	    };
	    return _this;
	  }
	
	  Index.prototype.componentWillUnmount = function componentWillUnmount() {
	    window.removeEventListener('scroll', this.handleScroll);
	  };
	
	  Index.prototype.handleScroll = function handleScroll() {
	    var scrOfY = 0;
	    var dibawah = false;
	    if (typeof window.pageYOffset === 'number') {
	      // Netscape compliant
	      scrOfY = window.pageYOffset;
	      dibawah = window.pageYOffset > 50;
	    } else if (document.body && document.body.scrollTop) {
	      // DOM compliant
	      scrOfY = document.body.scrollTop;
	      dibawah = document.body.scrollTop > 50;
	    }
	    // return scrOfY;
	    return this.setState({ dibawah: dibawah });
	  };
	
	  Index.prototype.render = function render() {
	    var _props = this.props,
	        classes = _props.classes,
	        title = _props.title;
	
	    console.log(this.props || 'ss');
	    return _react2.default.createElement(
	      _react.Fragment,
	      null,
	      _react2.default.createElement(
	        _reactHelmet2.default,
	        { defaultTitle: 'adnanfajlur' },
	        _react2.default.createElement(
	          'title',
	          null,
	          'adnanfajlur'
	        ),
	        _react2.default.createElement('html', { lang: 'en' })
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: classes.root },
	        _react2.default.createElement(
	          'div',
	          { className: classes.head, style: { height: dibawah ? 52 : 77 } },
	          _react2.default.createElement(
	            'div',
	            { className: classes.headContent },
	            _react2.default.createElement(_MyGram2.default, { style: { width: 30, height: 30 } }),
	            _react2.default.createElement(
	              'div',
	              { className: classes.searchWrap },
	              _react2.default.createElement('input', {
	                placeholder: 'Search',
	                className: classes.searchInput })
	            )
	          )
	        )
	      )
	    );
	  };
	
	  return Index;
	}(_react2.default.Component);
	
	Index.propTypes = {
	  classes: _propTypes2.default.object.isRequired
	};
	
	exports.default = (0, _withRoot2.default)((0, _styles.withStyles)(styles)(Index));
	module.exports = exports['default'];

/***/ }),
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SvgIcon = __webpack_require__(16);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Instagram = function Instagram(props) {
	  return _react2.default.createElement(
	    _SvgIcon2.default,
	    _extends({}, props, { viewBox: '0 0 16 16' }),
	    _react2.default.createElement('path', { d: 'M15 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zM6 8s.158-2 2-2 2 2 2 2 .058 2-2 2-2-2-2-2zm8 6H2V7h2.142A3.975 3.975 0 0 0 4 8a4 4 0 0 0 8 0c0-.348-.059-.679-.142-1H14v7zm0-9h-3V2h3v3z', fill: '#444' })
	  );
	};
	
	exports.default = Instagram;
	module.exports = exports['default'];

/***/ }),
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pure = __webpack_require__(30);
	
	var _pure2 = _interopRequireDefault(_pure);
	
	var _SvgIcon = __webpack_require__(16);
	
	var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SvgIconCustom = global.__MUI_SvgIcon__ || _SvgIcon2.default;
	
	var _ref = _react2.default.createElement('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' });
	
	var Home = function Home(props) {
	  return _react2.default.createElement(
	    SvgIconCustom,
	    props,
	    _ref
	  );
	};
	
	Home = (0, _pure2.default)(Home);
	Home.muiName = 'SvgIcon';
	
	exports.default = Home;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
]);
//# sourceMappingURL=component---src-pages-mygram-index-js-537e63e56a6af1ac9be3.js.map