/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + "." + "8e619dac4c80e989ec8e" + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["WJG9","vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "8aQS":
/*!********************************!*\
  !*** ./client/utlis/global.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nvar _default = {\n  xx: 1\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"D:\\\\project\\\\home\\\\client\\\\utlis\\\\global.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOGFRUy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC91dGxpcy9nbG9iYWwuanM/ZjFhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICB4eDogMVxyXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQURBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///8aQS\n");

/***/ }),

/***/ "8tyX":
/*!*********************************!*\
  !*** ./client/config/router.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"q1tI\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"55Ip\");\n/* harmony import */ var _components_AsyncComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/AsyncComponent */ \"lEZX\");\n/* harmony import */ var _containers_homePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/homePage */ \"p/Vn\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\nvar AysncSprit = Object(_components_AsyncComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../containers/sprit */ \"lyLa\"));\n});\nvar AysncNotes = Object(_components_AsyncComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function () {\n  return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../containers/notes */ \"oxuG\"));\n});\n\nvar _default = function _default() {\n  return [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    path: \"/\",\n    component: _containers_homePage__WEBPACK_IMPORTED_MODULE_3__[\"Home\"],\n    exact: true,\n    key: \"home\"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    path: \"/notes\",\n    component: AysncNotes,\n    key: \"notes\"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    path: \"/sprit\",\n    component: AysncSprit,\n    key: \"sprit\"\n  })];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(AysncSprit, \"AysncSprit\", \"D:\\\\project\\\\home\\\\client\\\\config\\\\router.js\");\n  reactHotLoader.register(AysncNotes, \"AysncNotes\", \"D:\\\\project\\\\home\\\\client\\\\config\\\\router.js\");\n  reactHotLoader.register(_default, \"default\", \"D:\\\\project\\\\home\\\\client\\\\config\\\\router.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOHR5WC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9jb25maWcvcm91dGVyLmpzP2YyZGMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Um91dGV9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IGFzeWNuQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvQXN5bmNDb21wb25lbnQnO1xuaW1wb3J0IHtIb21lfSBmcm9tICcuLi9jb250YWluZXJzL2hvbWVQYWdlJztcbmNvbnN0IEF5c25jU3ByaXQgPSBhc3ljbkNvbXBvbmVudCgoKSA9PiBpbXBvcnQoJy4uL2NvbnRhaW5lcnMvc3ByaXQnKSk7XG5jb25zdCBBeXNuY05vdGVzID0gYXN5Y25Db21wb25lbnQoKCkgPT4gaW1wb3J0KCcuLi9jb250YWluZXJzL25vdGVzJykpO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiBbXG4gIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17SG9tZX0gZXhhY3Qga2V5PVwiaG9tZVwiIC8+LFxuICA8Um91dGUgcGF0aD1cIi9ub3Rlc1wiIGNvbXBvbmVudD17QXlzbmNOb3Rlc30ga2V5PVwibm90ZXNcIiAvPixcbiAgPFJvdXRlIHBhdGg9XCIvc3ByaXRcIiBjb21wb25lbnQ9e0F5c25jU3ByaXR9IGtleT1cInNwcml0XCIgLz4sXG4gIC8vIDxSb3V0ZSBwYXRoPVwiL3RvZG9zXCIgY29tcG9uZW50PXtUb2Rvc30ga2V5PVwidG9kb3NcIiAvPlxuXVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQURBOzs7Ozs7Ozs7O0FBSEE7QUFDQTs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///8tyX\n");

/***/ }),

/***/ "A+0n":
/*!**********************************************!*\
  !*** ./client/redux sync nonrecursive \.js$ ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./api.js\": \"lZLd\",\n\t\"./notes.js\": \"vtfP\",\n\t\"./todos.js\": \"JRxv\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"A+0n\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQSswbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9yZWR1eCBzeW5jIG5vbnJlY3Vyc2l2ZSBcXC5qcyQ/NDQyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbWFwID0ge1xuXHRcIi4vYXBpLmpzXCI6IFwibFpMZFwiLFxuXHRcIi4vbm90ZXMuanNcIjogXCJ2dGZQXCIsXG5cdFwiLi90b2Rvcy5qc1wiOiBcIkpSeHZcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiQSswblwiOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///A+0n\n");

/***/ }),

/***/ "Fw6v":
/*!**********************************************!*\
  !*** ./client/containers/homePage/home.less ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnc2di5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL2hvbWVQYWdlL2hvbWUubGVzcz9hOWIwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///Fw6v\n");

/***/ }),

/***/ "JRxv":
/*!*******************************!*\
  !*** ./client/redux/todos.js ***!
  \*******************************/
/*! exports provided: ADD_TODOS, REMOVE_TODOS, addTodo, removeTodo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_TODOS\", function() { return ADD_TODOS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_TODOS\", function() { return REMOVE_TODOS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addTodo\", function() { return addTodo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeTodo\", function() { return removeTodo; });\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"RIqP\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nvar nextTodoId = 0; // action-type\n\nvar ADD_TODOS = 'TODOS/ADD';\nvar REMOVE_TODOS = 'TODOS/REMOVE'; // reducer\n\nvar reducer = function reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n  var text = action.text,\n      id = action.id,\n      completed = action.completed;\n\n  switch (action.type) {\n    case ADD_TODOS:\n      return [{\n        text: text,\n        id: id,\n        completed: completed\n      }].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(state));\n\n    case REMOVE_TODOS:\n      return state.filter(function (todoItem) {\n        return todoItem.id !== id;\n      });\n\n    default:\n      return state;\n  }\n}; // actions\n\n\nvar addTodo = function addTodo(text) {\n  return {\n    type: ADD_TODOS,\n    id: nextTodoId++,\n    completed: false,\n    text: text\n  };\n};\nvar removeTodo = function removeTodo(id) {\n  return {\n    type: ADD_TODOS,\n    id: id\n  };\n};\nvar _default = reducer;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(nextTodoId, \"nextTodoId\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\todos.js\");\n  reactHotLoader.register(ADD_TODOS, \"ADD_TODOS\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\todos.js\");\n  reactHotLoader.register(REMOVE_TODOS, \"REMOVE_TODOS\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\todos.js\");\n  reactHotLoader.register(reducer, \"reducer\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\todos.js\");\n  reactHotLoader.register(addTodo, \"addTodo\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\todos.js\");\n  reactHotLoader.register(removeTodo, \"removeTodo\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\todos.js\");\n  reactHotLoader.register(_default, \"default\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\todos.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlJ4di5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9yZWR1eC90b2Rvcy5qcz8yNTFjIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBuZXh0VG9kb0lkID0gMFxuXG4vLyBhY3Rpb24tdHlwZVxuZXhwb3J0IGNvbnN0IEFERF9UT0RPUyA9ICdUT0RPUy9BREQnXG5leHBvcnQgY29uc3QgUkVNT1ZFX1RPRE9TID0gJ1RPRE9TL1JFTU9WRSdcblxuLy8gcmVkdWNlclxuY29uc3QgcmVkdWNlciA9IGZ1bmN0aW9uIChzdGF0ZSA9IFtdLCBhY3Rpb24pIHtcbiAgY29uc3QgeyB0ZXh0LCBpZCwgY29tcGxldGVkIH0gPSBhY3Rpb25cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQUREX1RPRE9TOlxuICAgICAgcmV0dXJuIFt7IHRleHQsIGlkLCBjb21wbGV0ZWQgfSwgLi4uc3RhdGVdXG4gICAgY2FzZSBSRU1PVkVfVE9ET1M6XG4gICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKHRvZG9JdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHRvZG9JdGVtLmlkICE9PSBpZFxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLy8gYWN0aW9uc1xuZXhwb3J0IGNvbnN0IGFkZFRvZG8gPSAodGV4dCkgPT4gKHtcbiAgdHlwZTogQUREX1RPRE9TLFxuICBpZDogbmV4dFRvZG9JZCsrLFxuICBjb21wbGV0ZWQ6IGZhbHNlLFxuICB0ZXh0XG59KVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlVG9kbyA9IChpZCkgPT4gKHtcbiAgdHlwZTogQUREX1RPRE9TLFxuICBpZFxufSlcblxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFSQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7QUFPQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFLQTtBQUFBOzs7Ozs7Ozs7O0FBbENBO0FBR0E7QUFDQTtBQUdBO0FBZUE7QUFPQTs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///JRxv\n");

/***/ }),

/***/ "Qo9c":
/*!**********************************!*\
  !*** ./client/containers/App.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"lwsE\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"W8MJ\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"a1gu\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"Nsbk\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"7W2i\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"q1tI\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _config_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/router */ \"8tyX\");\n\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(App, _React$Component);\n\n  function App(props) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, App);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(App).call(this, props));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_config_router__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        key: \"router\"\n      });\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);\n\n\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(App, \"App\", \"D:\\\\project\\\\home\\\\client\\\\containers\\\\App.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUW85Yy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0FwcC5qcz80MjhmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi4vY29uZmlnL3JvdXRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSb3V0ZXMga2V5PVwicm91dGVyXCIgLz5cbiAgICApXG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOzs7Ozs7Ozs7OztBQVRBO0FBQ0E7QUFEQTs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///Qo9c\n");

/***/ }),

/***/ "WJG9":
/*!***********************!*\
  !*** ./client/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"lwsE\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"W8MJ\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"a1gu\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"Nsbk\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"7W2i\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"q1tI\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom */ \"i8i4\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hot-loader */ \"0cfB\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ \"/MKj\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ \"55Ip\");\n/* harmony import */ var _containers_App__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./containers/App */ \"Qo9c\");\n/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Store.js */ \"ccX2\");\n\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\nvar root = document.getElementById('root');\n\nwindow.onerror = function () {\n  for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {\n    arg[_key] = arguments[_key];\n  }\n\n  console.log(arg[4].stack);\n  return true;\n};\n\nvar render = function render(Component) {\n  react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.render(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__[\"AppContainer\"], null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__[\"BrowserRouter\"], null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_8__[\"Provider\"], {\n    store: _Store_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]\n  }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Component, null)))), root);\n};\n\nvar createApp = function createApp(App) {\n  var Main =\n  /*#__PURE__*/\n  function (_React$Component) {\n    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Main, _React$Component);\n\n    function Main() {\n      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Main);\n\n      return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Main).apply(this, arguments));\n    }\n\n    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Main, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(App, null);\n      }\n    }, {\n      key: \"__reactstandin__regenerateByEval\",\n      // @ts-ignore\n      value: function __reactstandin__regenerateByEval(key, code) {\n        // @ts-ignore\n        this[key] = eval(code);\n      }\n    }]);\n\n    return Main;\n  }(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);\n\n  return Main;\n};\n\nrender(createApp(_containers_App__WEBPACK_IMPORTED_MODULE_10__[\"default\"]));\n\nif (false) {}\n\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(root, \"root\", \"D:\\\\project\\\\home\\\\client\\\\app.js\");\n  reactHotLoader.register(render, \"render\", \"D:\\\\project\\\\home\\\\client\\\\app.js\");\n  reactHotLoader.register(createApp, \"createApp\", \"D:\\\\project\\\\home\\\\client\\\\app.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV0pHOS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9hcHAuanM/NTg5MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RG9tIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge0FwcENvbnRhaW5lcn0gZnJvbSAncmVhY3QtaG90LWxvYWRlcic7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge0Jyb3dzZXJSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbnRhaW5lcnMvQXBwJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL1N0b3JlLmpzJztcblxuXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuXG53aW5kb3cub25lcnJvciA9ICguLi5hcmcpID0+IHtcbiAgY29uc29sZS5sb2coYXJnWzRdLnN0YWNrKVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCByZW5kZXIgPSAoQ29tcG9uZW50KSA9PiB7XG4gIFJlYWN0RG9tLnJlbmRlcihcbiAgICA8QXBwQ29udGFpbmVyPlxuICAgICAgPEJyb3dzZXJSb3V0ZXI+XG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxDb21wb25lbnQgLz5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgIDwvQnJvd3NlclJvdXRlcj5cbiAgICA8L0FwcENvbnRhaW5lcj4sXG4gICAgcm9vdFxuICApXG59XG5cbmNvbnN0IGNyZWF0ZUFwcCA9IChBcHApID0+IHtcbiAgY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyICgpIHtcbiAgICAgIHJldHVybiA8QXBwIC8+XG4gICAgfVxuICB9XG4gIHJldHVybiBNYWluXG59XG5cbnJlbmRlcihjcmVhdGVBcHAoQXBwKSlcblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vY29udGFpbmVycy9BcHAuanMnLCAoKSA9PiB7XG4gICAgY29uc3QgTmV4dEFwcCA9IHJlcXVpcmUoJy4vY29udGFpbmVycy9BcHAuanMnKS5kZWZhdWx0XG4gICAgcmVuZGVyKGNyZWF0ZUFwcChOZXh0QXBwKSlcbiAgfSlcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUtBO0FBQ0E7Ozs7Ozs7Ozs7QUFyQ0E7QUFPQTtBQWFBOzs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///WJG9\n");

/***/ }),

/***/ "ccX2":
/*!*************************!*\
  !*** ./client/Store.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"ANjH\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"sINF\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nvar modulesFiles = __webpack_require__(\"A+0n\");\n\nvar modules = modulesFiles.keys().reduce(function (modules, modulePath) {\n  var moduleName = modulePath.replace(/^\\.\\/(.*)\\.\\w+$/, '$1');\n  var value = modulesFiles(modulePath);\n  modules[moduleName] = value.default;\n  return modules;\n}, {});\nvar reducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])(modules);\n\nvar _require = __webpack_require__(/*! redux-devtools-extension */ \"5HXA\"),\n    composeWithDevTools = _require.composeWithDevTools;\n\nvar middlewares = [redux_thunk__WEBPACK_IMPORTED_MODULE_1__[\"default\"]];\n\nif (false) {}\n\nvar storeEnhancers = composeWithDevTools(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"].apply(void 0, middlewares));\n\nvar _default = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(reducer, {}, storeEnhancers);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(modulesFiles, \"modulesFiles\", \"D:\\\\project\\\\home\\\\client\\\\Store.js\");\n  reactHotLoader.register(modules, \"modules\", \"D:\\\\project\\\\home\\\\client\\\\Store.js\");\n  reactHotLoader.register(reducer, \"reducer\", \"D:\\\\project\\\\home\\\\client\\\\Store.js\");\n  reactHotLoader.register(middlewares, \"middlewares\", \"D:\\\\project\\\\home\\\\client\\\\Store.js\");\n  reactHotLoader.register(storeEnhancers, \"storeEnhancers\", \"D:\\\\project\\\\home\\\\client\\\\Store.js\");\n  reactHotLoader.register(_default, \"default\", \"D:\\\\project\\\\home\\\\client\\\\Store.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NYMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9TdG9yZS5qcz83MWM1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwbHlNaWRkbGV3YXJlLCBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVN0b3JlfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmtNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXRodW5rJztcblxuY29uc3QgbW9kdWxlc0ZpbGVzID0gcmVxdWlyZS5jb250ZXh0KCcuL3JlZHV4JywgZmFsc2UsIC9cXC5qcyQvKVxuY29uc3QgbW9kdWxlcyA9IG1vZHVsZXNGaWxlcy5rZXlzKCkucmVkdWNlKChtb2R1bGVzLCBtb2R1bGVQYXRoKSA9PiB7XG4gIGNvbnN0IG1vZHVsZU5hbWUgPSBtb2R1bGVQYXRoLnJlcGxhY2UoL15cXC5cXC8oLiopXFwuXFx3KyQvLCAnJDEnKVxuICBjb25zdCB2YWx1ZSA9IG1vZHVsZXNGaWxlcyhtb2R1bGVQYXRoKVxuICBtb2R1bGVzW21vZHVsZU5hbWVdID0gdmFsdWUuZGVmYXVsdFxuICByZXR1cm4gbW9kdWxlc1xufSwge30pXG5cbmNvbnN0IHJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMobW9kdWxlcylcblxuY29uc3QgeyBjb21wb3NlV2l0aERldlRvb2xzIH0gPSByZXF1aXJlKCdyZWR1eC1kZXZ0b29scy1leHRlbnNpb24nKVxuXG5cbmNvbnN0IG1pZGRsZXdhcmVzID0gW3RodW5rTWlkZGxld2FyZV1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgbWlkZGxld2FyZXMucHVzaChyZXF1aXJlKCdyZWR1eC1pbW11dGFibGUtc3RhdGUtaW52YXJpYW50JykuZGVmYXVsdCgpKTtcbn1cblxuY29uc3Qgc3RvcmVFbmhhbmNlcnMgPSBjb21wb3NlV2l0aERldlRvb2xzKFxuICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2VyLCB7fSwgc3RvcmVFbmhhbmNlcnMpOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0EsYUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFEQTs7Ozs7Ozs7OztBQXZCQTtBQUNBO0FBT0E7QUFLQTtBQU1BOzs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///ccX2\n");

/***/ }),

/***/ "lEZX":
/*!*********************************************!*\
  !*** ./client/components/AsyncComponent.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return asyncComponent; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"o0o1\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"yXPU\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"lwsE\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"W8MJ\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"a1gu\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"Nsbk\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"7W2i\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"q1tI\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\nfunction asyncComponent(importComponent) {\n  var AsyncComponent =\n  /*#__PURE__*/\n  function (_Component) {\n    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(AsyncComponent, _Component);\n\n    function AsyncComponent(props) {\n      var _this;\n\n      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AsyncComponent);\n\n      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(AsyncComponent).call(this, props));\n      _this.state = {\n        component: null\n      };\n      return _this;\n    }\n\n    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(AsyncComponent, [{\n      key: \"componentDidMount\",\n      value: function () {\n        var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n        /*#__PURE__*/\n        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n          var _ref, component;\n\n          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  _context.next = 2;\n                  return importComponent();\n\n                case 2:\n                  _ref = _context.sent;\n                  component = _ref.default;\n                  this.setState({\n                    component: component\n                  });\n\n                case 5:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee, this);\n        }));\n\n        function componentDidMount() {\n          return _componentDidMount.apply(this, arguments);\n        }\n\n        return componentDidMount;\n      }()\n    }, {\n      key: \"render\",\n      value: function render() {\n        var C = this.state.component;\n        return C ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(C, this.props) : null;\n      }\n    }, {\n      key: \"__reactstandin__regenerateByEval\",\n      // @ts-ignore\n      value: function __reactstandin__regenerateByEval(key, code) {\n        // @ts-ignore\n        this[key] = eval(code);\n      }\n    }]);\n\n    return AsyncComponent;\n  }(react__WEBPACK_IMPORTED_MODULE_7__[\"Component\"]);\n\n  return AsyncComponent;\n}\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(asyncComponent, \"asyncComponent\", \"D:\\\\project\\\\home\\\\client\\\\components\\\\AsyncComponent.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibEVaWC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0FzeW5jQ29tcG9uZW50LmpzPzk0NDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzeW5jQ29tcG9uZW50KGltcG9ydENvbXBvbmVudCkge1xyXG4gIGNsYXNzIEFzeW5jQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgY29tcG9uZW50OiBudWxsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgIGNvbnN0IHsgZGVmYXVsdDogY29tcG9uZW50IH0gPSBhd2FpdCBpbXBvcnRDb21wb25lbnQoKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGNvbXBvbmVudDogY29tcG9uZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgY29uc3QgQyA9IHRoaXMuc3RhdGUuY29tcG9uZW50O1xyXG5cclxuICAgICAgcmV0dXJuIEMgPyA8QyB7Li4udGhpcy5wcm9wc30gLz4gOiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFzeW5jQ29tcG9uZW50O1xyXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBSEE7QUFNQTtBQUNBO0FBVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQVdBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFkQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBbUJBO0FBRUE7QUFDQTtBQXRCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUF3QkE7QUFDQTs7Ozs7Ozs7OztBQTFCQTs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///lEZX\n");

/***/ }),

/***/ "lZLd":
/*!*****************************!*\
  !*** ./client/redux/api.js ***!
  \*****************************/
/*! exports provided: FETCH_STARTED, FETCH_SUCCESS, fetchApiStarted, fetchApi, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_STARTED\", function() { return FETCH_STARTED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_SUCCESS\", function() { return FETCH_SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchApiStarted\", function() { return fetchApiStarted; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchApi\", function() { return fetchApi; });\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"MVZn\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nvar FETCH_STARTED = 'API/STARTED';\nvar FETCH_SUCCESS = 'API/SUCCESS';\nvar FETCH_FAILURE = 'API/FAILURE';\n\nvar reducer = function reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case FETCH_STARTED:\n      return {\n        status: 'loading'\n      };\n\n    case FETCH_SUCCESS:\n      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {\n        status: 'success'\n      }, action.result);\n\n    case FETCH_FAILURE:\n      return {\n        status: 'failure'\n      };\n\n    default:\n      return state;\n  }\n};\n\nvar fetchApiStarted = function fetchApiStarted() {\n  return {\n    type: FETCH_STARTED\n  };\n};\n\nvar fetchApiSuccess = function fetchApiSuccess(result) {\n  return {\n    type: FETCH_SUCCESS,\n    result: result\n  };\n};\n\nvar fetchApiFailure = function fetchApiFailure(error) {\n  return {\n    type: FETCH_FAILURE,\n    error: error\n  };\n};\n\nvar fetchApi = function fetchApi() {\n  return function (dispatch) {\n    var api = '/api/Notes/addFolder'; // dispatch(fetchApiStarted())\n    // return fetch(api, {\n    //     body: 'name=yxx',\n    //     method: 'POST',\n    //     headers: {\n    //         'Content-Type': 'application/x-www-form-urlencoded',\n    //   },\n    // }).then(res=>{\n    //     console.log(res)\n    //     dispatch(fetchApiSuccess(res))\n    // }).catch(err=>{\n    //     console.log(err)\n    //     dispatch(fetchApiFailure(err))\n    // })\n  };\n};\nvar _default = reducer;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(FETCH_STARTED, \"FETCH_STARTED\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(FETCH_SUCCESS, \"FETCH_SUCCESS\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(FETCH_FAILURE, \"FETCH_FAILURE\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(reducer, \"reducer\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(fetchApiStarted, \"fetchApiStarted\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(fetchApiSuccess, \"fetchApiSuccess\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(fetchApiFailure, \"fetchApiFailure\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(fetchApi, \"fetchApi\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n  reactHotLoader.register(_default, \"default\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\api.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibFpMZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9yZWR1eC9hcGkuanM/OTU5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRkVUQ0hfU1RBUlRFRCA9ICdBUEkvU1RBUlRFRCdcclxuZXhwb3J0IGNvbnN0IEZFVENIX1NVQ0NFU1MgPSAnQVBJL1NVQ0NFU1MnXHJcbmNvbnN0IEZFVENIX0ZBSUxVUkUgPSAnQVBJL0ZBSUxVUkUnXHJcblxyXG5jb25zdCByZWR1Y2VyID0gZnVuY3Rpb24gKHN0YXRlPXt9LCBhY3Rpb24pICB7XHJcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIEZFVENIX1NUQVJURUQ6XHJcbiAgICAgICAgICAgIHJldHVybiB7c3RhdHVzOiAnbG9hZGluZyd9XHJcbiAgICAgICAgY2FzZSBGRVRDSF9TVUNDRVNTOlxyXG4gICAgICAgICAgICByZXR1cm4gey4uLnN0YXRlLCBzdGF0dXM6ICdzdWNjZXNzJywgLi4uYWN0aW9uLnJlc3VsdH1cclxuICAgICAgICBjYXNlIEZFVENIX0ZBSUxVUkU6XHJcbiAgICAgICAgICAgIHJldHVybntzdGF0dXM6ICdmYWlsdXJlJ31cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoQXBpU3RhcnRlZCA9ICgpID0+ICh7XHJcbiAgICB0eXBlOiBGRVRDSF9TVEFSVEVEXHJcbn0pXHJcbiAgXHJcbmNvbnN0IGZldGNoQXBpU3VjY2VzcyA9IChyZXN1bHQpID0+ICh7XHJcbiAgICB0eXBlOiBGRVRDSF9TVUNDRVNTLFxyXG4gICAgcmVzdWx0XHJcbn0pXHJcbiAgXHJcbmNvbnN0IGZldGNoQXBpRmFpbHVyZSA9IChlcnJvcikgPT4gKHtcclxuICAgIHR5cGU6IEZFVENIX0ZBSUxVUkUsXHJcbiAgICBlcnJvclxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoQXBpID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFwaSA9ICcvYXBpL05vdGVzL2FkZEZvbGRlcidcclxuICAgICAgIFxyXG4gICAgICAgIC8vIGRpc3BhdGNoKGZldGNoQXBpU3RhcnRlZCgpKVxyXG4gICAgICAgIC8vIHJldHVybiBmZXRjaChhcGksIHtcclxuICAgICAgICAvLyAgICAgYm9keTogJ25hbWU9eXh4JyxcclxuICAgICAgICAvLyAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgLy8gICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAvLyAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gfSkudGhlbihyZXM9PntcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIC8vICAgICBkaXNwYXRjaChmZXRjaEFwaVN1Y2Nlc3MocmVzKSlcclxuICAgICAgICAvLyB9KS5jYXRjaChlcnI9PntcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgIC8vICAgICBkaXNwYXRjaChmZXRjaEFwaUZhaWx1cmUoZXJyKSlcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWR1Y2VyXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBOzs7Ozs7Ozs7O0FBcERBO0FBQ0E7QUFDQTtBQUVBO0FBYUE7QUFJQTtBQUtBO0FBS0E7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///lZLd\n");

/***/ }),

/***/ "p/Vn":
/*!*********************************************!*\
  !*** ./client/containers/homePage/index.js ***!
  \*********************************************/
/*! exports provided: Home */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home */ \"rFBT\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Home\", function() { return _Home__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicC9Wbi5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///p/Vn\n");

/***/ }),

/***/ "rFBT":
/*!********************************************!*\
  !*** ./client/containers/homePage/Home.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"lwsE\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"W8MJ\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"a1gu\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"Nsbk\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"7W2i\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"q1tI\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ \"/MKj\");\n/* harmony import */ var _redux_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../redux/api */ \"lZLd\");\n/* harmony import */ var _utlis_global__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utlis/global */ \"8aQS\");\n/* harmony import */ var _home_less__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./home.less */ \"Fw6v\");\n/* harmony import */ var _home_less__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_home_less__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\nvar Home =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Home, _React$Component);\n\n  function Home(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Home);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Home).call(this, props));\n    _this.imgRefs = react__WEBPACK_IMPORTED_MODULE_5___default.a.createRef();\n    _this.state = {\n      xx: _utlis_global__WEBPACK_IMPORTED_MODULE_8__[\"default\"].xx\n    };\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Home, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {}\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"xx\",\n        ref: this.imgRefs\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", null, \"HOME,\", this.props.fetchList()));\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return Home;\n}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    fetchList: function fetchList() {\n      dispatch(Object(_redux_api__WEBPACK_IMPORTED_MODULE_7__[\"fetchApi\"])());\n    }\n  };\n};\n\nvar _default = Object(react_redux__WEBPACK_IMPORTED_MODULE_6__[\"connect\"])(null, mapDispatchToProps)(Home);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Home, \"Home\", \"D:\\\\project\\\\home\\\\client\\\\containers\\\\homePage\\\\Home.js\");\n  reactHotLoader.register(mapDispatchToProps, \"mapDispatchToProps\", \"D:\\\\project\\\\home\\\\client\\\\containers\\\\homePage\\\\Home.js\");\n  reactHotLoader.register(_default, \"default\", \"D:\\\\project\\\\home\\\\client\\\\containers\\\\homePage\\\\Home.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoickZCVC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL2hvbWVQYWdlL0hvbWUuanM/YWM1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2ZldGNoQXBpfSBmcm9tICcuLi8uLi9yZWR1eC9hcGknO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuLi8uLi91dGxpcy9nbG9iYWwnO1xuaW1wb3J0ICcuL2hvbWUubGVzcyc7XG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuaW1nUmVmcyA9IFJlYWN0LmNyZWF0ZVJlZigpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHh4OiBnbG9iYWwueHhcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwieHhcIiByZWY9e3RoaXMuaW1nUmVmc30+XG4gICAgICAgIHsvKiA8aW1nIHNyYz17cmVxdWlyZSgnLi4vLi4vYXNzZXRzL2ltZy9sb2dvLnBuZycpfSB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiNTBcIj48L2ltZz4gKi99XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgSE9NRSxcbiAgICAgICAgICB7dGhpcy5wcm9wcy5mZXRjaExpc3QoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZldGNoTGlzdDogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChmZXRjaEFwaSgpKVxuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEhvbWUpXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBSEE7QUFNQTtBQUNBOzs7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQVFBOzs7Ozs7Ozs7OztBQXJCQTtBQUNBO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7QUFoQ0E7QUF3QkE7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///rFBT\n");

/***/ }),

/***/ "vtfP":
/*!*******************************!*\
  !*** ./client/redux/notes.js ***!
  \*******************************/
/*! exports provided: addFolder, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addFolder\", function() { return addFolder; });\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nvar ADD_FOLDER = 'NOTES/ADDFOLDER';\nvar DEL_FOLDER = 'NOTES/DELFOLDER';\nvar EDIT_FOLDER = 'NOTES/EDITFOLDER';\nvar addFolder = function addFolder(folder) {\n  return {\n    type: ADD_FOLDER,\n    folder: folder\n  };\n};\n\nvar reducer = function reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    folders: []\n  };\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n  var id = action.id,\n      name = action.name;\n\n  switch (action.type) {\n    case ADD_FOLDER:\n      state.folders.push({});\n      return {};\n\n    default:\n      return {};\n  }\n};\n\nvar note = [{\n  name: '',\n  id: '',\n  content: '',\n  folderId: ''\n}];\nvar _default = reducer;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(ADD_FOLDER, \"ADD_FOLDER\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\notes.js\");\n  reactHotLoader.register(DEL_FOLDER, \"DEL_FOLDER\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\notes.js\");\n  reactHotLoader.register(EDIT_FOLDER, \"EDIT_FOLDER\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\notes.js\");\n  reactHotLoader.register(addFolder, \"addFolder\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\notes.js\");\n  reactHotLoader.register(reducer, \"reducer\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\notes.js\");\n  reactHotLoader.register(note, \"note\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\notes.js\");\n  reactHotLoader.register(_default, \"default\", \"D:\\\\project\\\\home\\\\client\\\\redux\\\\notes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"0cfB\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"3UD+\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnRmUC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9yZWR1eC9ub3Rlcy5qcz9iZWQ3Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFERF9GT0xERVIgPSAnTk9URVMvQURERk9MREVSJ1xyXG5jb25zdCBERUxfRk9MREVSID0gJ05PVEVTL0RFTEZPTERFUidcclxuY29uc3QgRURJVF9GT0xERVIgPSAnTk9URVMvRURJVEZPTERFUidcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRGb2xkZXIgPSAoZm9sZGVyKSA9PiAoe1xyXG4gICAgdHlwZTogQUREX0ZPTERFUixcclxuICAgIGZvbGRlclxyXG59KVxyXG5cclxuY29uc3QgcmVkdWNlciA9IChzdGF0ZT17Zm9sZGVyczogW119LCBhY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IHtpZCwgbmFtZX0gPSBhY3Rpb25cclxuICAgIHN3aXRjaChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgQUREX0ZPTERFUjogXHJcbiAgICAgICAgICAgIHN0YXRlLmZvbGRlcnMucHVzaCh7fSlcclxuICAgICAgICAgICAgcmV0dXJuIHt9XHJcbiAgICAgICAgZGVmYXVsdDogXHJcbiAgICAgICAgICAgIHJldHVybiB7fVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBub3RlID0gW1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICBmb2xkZXJJZDogJydcclxuICAgIH1cclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVFBO0FBQUE7Ozs7Ozs7Ozs7QUE3QkE7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQVdBOzs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///vtfP\n");

/***/ })

/******/ });
//# sourceMappingURL=app.8e619dac4c80e989ec8e.js.map