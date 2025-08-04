(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cs-web-components-base"), require("Immutable"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["cs-web-components-base", "Immutable", "React"], factory);
	else if(typeof exports === 'object')
		exports["kalyani-iot-ppc-forging"] = factory(require("cs-web-components-base"), require("Immutable"), require("React"));
	else
		root["kalyani-iot-ppc-forging"] = factory(root["cs-web-components-base"], root["Immutable"], root["React"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_cs_web_components_base__, __WEBPACK_EXTERNAL_MODULE_immutable__, __WEBPACK_EXTERNAL_MODULE_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lucide-react/dist/esm/Icon.js":
/*!****************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/Icon.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "./node_modules/lucide-react/dist/esm/defaultAttributes.js");
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const Icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
    "svg",
    {
      ref,
      ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)("lucide", className),
      ...!children && !(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasA11yProp)(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);


//# sourceMappingURL=Icon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLucideIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.js */ "./node_modules/lucide-react/dist/esm/Icon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ className, ...props }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ref,
      iconNode,
      className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)(
        `lucide-${(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.toKebabCase)((0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.toPascalCase)(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.toPascalCase)(iconName);
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/calendar.js":
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/calendar.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Calendar)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("calendar", __iconNode);


//# sourceMappingURL=calendar.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-left.js":
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-left.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronLeft)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-left", __iconNode);


//# sourceMappingURL=chevron-left.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-right.js":
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-right.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronRight)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-right", __iconNode);


//# sourceMappingURL=chevron-right.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/message-circle.js":
/*!********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/message-circle.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ MessageCircle)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("message-circle", __iconNode);


//# sourceMappingURL=message-circle.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/plus.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/plus.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Plus)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("plus", __iconNode);


//# sourceMappingURL=plus.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/save.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/save.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("save", __iconNode);


//# sourceMappingURL=save.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/square-pen.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/square-pen.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ SquarePen)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("square-pen", __iconNode);


//# sourceMappingURL=square-pen.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/trash-2.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/trash-2.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Trash2)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("trash-2", __iconNode);


//# sourceMappingURL=trash-2.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/trending-up.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/trending-up.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ TrendingUp)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("trending-up", __iconNode);


//# sourceMappingURL=trending-up.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/x.js":
/*!*******************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/x.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__iconNode": () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ X)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("x", __iconNode);


//# sourceMappingURL=x.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasA11yProp": () => (/* binding */ hasA11yProp),
/* harmony export */   "mergeClasses": () => (/* binding */ mergeClasses),
/* harmony export */   "toCamelCase": () => (/* binding */ toCamelCase),
/* harmony export */   "toKebabCase": () => (/* binding */ toKebabCase),
/* harmony export */   "toPascalCase": () => (/* binding */ toPascalCase)
/* harmony export */ });
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};


//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./src/actions/actions.js":
/*!********************************!*\
  !*** ./src/actions/actions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DATA_FETCH_FAILURE": () => (/* binding */ DATA_FETCH_FAILURE),
/* harmony export */   "DATA_FETCH_SUCCESS": () => (/* binding */ DATA_FETCH_SUCCESS),
/* harmony export */   "asyncActionCreator": () => (/* binding */ asyncActionCreator),
/* harmony export */   "thunkActionCreator": () => (/* binding */ thunkActionCreator)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ "./src/helpers.js");
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cs-web-components-base */ "cs-web-components-base");
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__);


var DATA_FETCH_SUCCESS = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.prefixNS)('DATA_FETCH_SUCCESS');
var DATA_FETCH_FAILURE = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.prefixNS)('DATA_FETCH_FAILURE');

/*
 Action Creator
  */
function onDataReceived(payload) {
  return {
    type: DATA_FETCH_SUCCESS,
    payload: payload
  };
}

/*
 Action Creator
  */
function onDataFailed(err) {
  return {
    type: DATA_FETCH_FAILURE,
    payload: err,
    error: true
  };
}

/*
 Thunk Action Creator
  */
function thunkActionCreator() {
  return function (dispatch /*, getState */) {
    cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__.Console.log("Dispatching ", DATA_FETCH_SUCCESS);
    dispatch(onDataReceived("foo"));
  };
}

/*
 Async Thunk Action Creator

 Use an AJAX call to fetch data from server
  */
function asyncActionCreator() {
  return function (dispatch /*, getState */) {
    (0,cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__.getJSON)("/api/v1/i18n/labels/en").then(function (info) {
      dispatch(onDataReceived(info));
    }, function (err) {
      dispatch(onDataFailed(err));
    });
  };
}

/***/ }),

/***/ "./src/components/Dashboard.jsx":
/*!**************************************!*\
  !*** ./src/components/Dashboard.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/calendar.js");
/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.css */ "./src/components/Dashboard.css");
/* harmony import */ var _MainDashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainDashboard */ "./src/components/MainDashboard.jsx");
/* harmony import */ var _WeeklyPlan_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WeeklyPlan.jsx */ "./src/components/WeeklyPlan.jsx");
/* harmony import */ var _DieSummary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DieSummary */ "./src/components/DieSummary.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Dashboard = function Dashboard() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("weekly"),
    _useState2 = _slicedToArray(_useState, 2),
    activeView = _useState2[0],
    setActiveView = _useState2[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dashboard-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dashboard-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dashboard-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "dashboard-title"
  }, "Weekly Plan")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "view-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      return setActiveView("weekly");
    },
    className: "toggle-button ".concat(activeView === "weekly" ? "active" : "")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "icon-sm inline"
  }), " Weekly Plan"))), activeView === "weekly" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WeeklyPlan_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null), activeView === "summary" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_DieSummary__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);

/***/ }),

/***/ "./src/components/DieSummary.jsx":
/*!***************************************!*\
  !*** ./src/components/DieSummary.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var DieSummary = function DieSummary() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "die-summary-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "section-title"
  }, "Die Summary View"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "section-subtitle"
  }, "Coming soon..."));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DieSummary);

/***/ }),

/***/ "./src/components/MainDashboard.jsx":
/*!******************************************!*\
  !*** ./src/components/MainDashboard.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-up.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/message-circle.js");
/* harmony import */ var _MainDashboard_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainDashboard.css */ "./src/components/MainDashboard.css");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




// KPI Section Data
var kpiData = [{
  title: "Total Plan Qty",
  value: "12,000",
  change: "+8%",
  icon: "📊"
}, {
  title: "Total Actual Qty",
  value: "10,450",
  change: "+12%",
  icon: "✅"
}, {
  title: "Avg Utilization",
  value: "85%",
  change: "+5%",
  icon: "⚡"
}, {
  title: "Die in Use",
  value: "18",
  change: "+2",
  icon: "🔧"
}];

// Press-Wise Summary Data (Single Example Kept for Cleanliness)
var pressSummary = [{
  press: "630T",
  plan: 220000,
  produced: 44631,
  avgPerDay: 7439,
  balance: 175369,
  reqPerDay: 8768,
  netTon: 1.81,
  cumTon: 16.87,
  shifts: [{
    shift: 1,
    dieNo: 701,
    qty: 2180
  }, {
    shift: 2,
    dieNo: 701,
    qty: 2378
  }, {
    shift: 3,
    dieNo: 701,
    qty: 1683
  }]
}, {
  press: "630T",
  plan: 220000,
  produced: 44631,
  avgPerDay: 7439,
  balance: 175369,
  reqPerDay: 8768,
  netTon: 1.81,
  cumTon: 16.87,
  shifts: [{
    shift: 1,
    dieNo: 701,
    qty: 2180
  }, {
    shift: 2,
    dieNo: 701,
    qty: 2378
  }, {
    shift: 3,
    dieNo: 701,
    qty: 1683
  }]
}, {
  press: "630T",
  plan: 220000,
  produced: 44631,
  avgPerDay: 7439,
  balance: 175369,
  reqPerDay: 8768,
  netTon: 1.81,
  cumTon: 16.87,
  shifts: [{
    shift: 1,
    dieNo: 701,
    qty: 2180
  }, {
    shift: 2,
    dieNo: 701,
    qty: 2378
  }, {
    shift: 3,
    dieNo: 701,
    qty: 1683
  }]
}, {
  press: "630T",
  plan: 220000,
  produced: 44631,
  avgPerDay: 7439,
  balance: 175369,
  reqPerDay: 8768,
  netTon: 1.81,
  cumTon: 16.87,
  shifts: [{
    shift: 1,
    dieNo: 701,
    qty: 2180
  }, {
    shift: 2,
    dieNo: 701,
    qty: 2378
  }, {
    shift: 3,
    dieNo: 701,
    qty: 1683
  }]
}, {
  press: "630T",
  plan: 220000,
  produced: 44631,
  avgPerDay: 7439,
  balance: 175369,
  reqPerDay: 8768,
  netTon: 1.81,
  cumTon: 16.87,
  shifts: [{
    shift: 1,
    dieNo: 701,
    qty: 2180
  }, {
    shift: 2,
    dieNo: 701,
    qty: 2378
  }, {
    shift: 3,
    dieNo: 701,
    qty: 1683
  }]
}, {
  press: "630T",
  plan: 220000,
  produced: 44631,
  avgPerDay: 7439,
  balance: 175369,
  reqPerDay: 8768,
  netTon: 1.81,
  cumTon: 16.87,
  shifts: [{
    shift: 1,
    dieNo: 701,
    qty: 2180
  }, {
    shift: 2,
    dieNo: 701,
    qty: 2378
  }, {
    shift: 3,
    dieNo: 701,
    qty: 1683
  }]
}];

// KPI Card Component
var KPICard = function KPICard(_ref) {
  var title = _ref.title,
    value = _ref.value,
    change = _ref.change,
    icon = _ref.icon;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "kpi-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "kpi-card-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "kpi-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "kpi-title"
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "kpi-value"
  }, value), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "kpi-change"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    size: 14
  }), " ", change)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "kpi-right"
  }, icon)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "kpi-progress-track"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "kpi-progress",
    style: {
      width: "75%"
    }
  })));
};

// ChatBot Component with Suggestions
var ChatBot = function ChatBot(_ref2) {
  var open = _ref2.open,
    onClose = _ref2.onClose;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      from: "bot",
      text: "Hello! Ask me about KPI or Press Summary."
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    input = _useState4[0],
    setInput = _useState4[1];
  var suggestions = ["Total Plan Qty", "Total Actual Qty", "Avg Utilization", "Die in Use", "630T"];
  var handleSend = function handleSend() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : input;
    if (!message.trim()) return;
    var userMessage = message.trim();
    setMessages(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        from: "user",
        text: userMessage
      }]);
    });
    var botReply = generateBotReply(userMessage);
    setMessages(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        from: "bot",
        text: botReply
      }]);
    });
    setInput("");
  };
  var generateBotReply = function generateBotReply(message) {
    var lower = message.toLowerCase();
    for (var _i2 = 0, _kpiData = kpiData; _i2 < _kpiData.length; _i2++) {
      var kpi = _kpiData[_i2];
      if (lower.includes(kpi.title.toLowerCase())) {
        return "".concat(kpi.title, ": ").concat(kpi.value, ", Change: ").concat(kpi.change);
      }
    }
    for (var _i3 = 0, _pressSummary = pressSummary; _i3 < _pressSummary.length; _i3++) {
      var press = _pressSummary[_i3];
      if (lower.includes(press.press.toLowerCase())) {
        var totalQty = press.shifts.reduce(function (acc, s) {
          return acc + s.qty;
        }, 0);
        return "For ".concat(press.press, ": Plan ").concat(press.plan, ", Produced ").concat(press.produced, ", Balance ").concat(press.balance, ", Total Shift Qty ").concat(totalQty);
      }
    }
    return "Sorry, I can only answer about KPIs or specific presses like 630T, 1000T-1, etc.";
  };
  if (!open) return null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "chatbot-window"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "chatbot-header"
  }, "ChatBot ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: onClose
  }, "X")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "chatbot-messages"
  }, messages.map(function (msg, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: idx,
      className: "chat-message ".concat(msg.from)
    }, msg.text);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "chatbot-suggestions"
  }, suggestions.map(function (s, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      key: idx,
      onClick: function onClick() {
        return handleSend(s);
      }
    }, s);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "chatbot-input"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: input,
    onChange: function onChange(e) {
      return setInput(e.target.value);
    },
    placeholder: "Ask about KPI or Press Summary...",
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && handleSend();
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      return handleSend();
    }
  }, "Send")));
};

// Main Dashboard Component
var MainDashboard = function MainDashboard() {
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    chatOpen = _useState6[0],
    setChatOpen = _useState6[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "kpi-grid"
  }, kpiData.map(function (kpi, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(KPICard, _extends({
      key: i
    }, kpi));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "press-summary-grid"
  }, pressSummary.map(function (press, idx) {
    var totalQty = press.shifts.reduce(function (acc, s) {
      return acc + s.qty;
    }, 0);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: idx,
      className: "press-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "press-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
      className: "press-title"
    }, press.press)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "press-info"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Plan:"), " ", press.plan.toLocaleString()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Produced:"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "highlight"
    }, press.produced.toLocaleString())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Avg/Day:"), " ", press.avgPerDay), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Balance:"), " ", press.balance.toLocaleString()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Req/Day:"), " ", press.reqPerDay), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Net Tonn:"), " ", press.netTon, " T"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Cum Tonn:"), " ", press.cumTon, " T")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
      className: "shift-table"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Shift"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Die No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Qty"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, press.shifts.map(function (s, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
        key: i
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, s.shift), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, s.dieNo), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, s.qty));
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
      className: "total-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
      colSpan: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Total")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, totalQty))))));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "chatbot-toggle-btn",
    onClick: function onClick() {
      return setChatOpen(!chatOpen);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: 24
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatBot, {
    open: chatOpen,
    onClose: function onClose() {
      return setChatOpen(false);
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainDashboard);

/***/ }),

/***/ "./src/components/SmartWeeklyPlanChatbot.jsx":
/*!***************************************************!*\
  !*** ./src/components/SmartWeeklyPlanChatbot.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  chatIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "24px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 9999
  },
  chatBox: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "350px",
    maxHeight: "500px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px"
  },
  inputRow: {
    display: "flex",
    gap: "8px"
  },
  inputBox: {
    flex: 1,
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  sendBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  messageBot: {
    backgroundColor: "#f1f1f1",
    padding: "6px 10px",
    borderRadius: "6px",
    marginBottom: "6px",
    alignSelf: "flex-start"
  },
  messageUser: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    marginBottom: "6px",
    alignSelf: "flex-end"
  }
};
var fieldLabels = {
  plant_code: "Plant Code",
  main_prod_no: "Production Order No",
  main_forge_press: "Press",
  week_prod_date: "Production Date (YYYY-MM-DD)",
  heat_code: "Heat Code",
  shift1_qty: "Shift 1 Quantity",
  shift2_qty: "Shift 2 Quantity",
  shift3_qty: "Shift 3 Quantity",
  dies_req: "Dies Required",
  rm_status: "RM Status",
  week_net_tonn: "Net Tonnage",
  remark: "Remark",
  week_die_no: "Die No",
  customer_name: "Customer",
  week_section: "Section",
  rm_grade: "RM Grade"
};
var SmartWeeklyPlanChatbot = function SmartWeeklyPlanChatbot() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      type: "bot",
      text: "Hi 👋! I'm your Weekly Plan Assistant. What would you like to do?"
    }, {
      type: "suggestions",
      buttons: [{
        label: "📄 View Weekly Plan",
        value: "view"
      }, {
        label: "➕ Add Production Order",
        value: "add"
      }, {
        label: "✏️ Update Order",
        value: "update"
      }]
    }]),
    _useState4 = _slicedToArray(_useState3, 2),
    messages = _useState4[0],
    setMessages = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    input = _useState6[0],
    setInput = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle"),
    _useState8 = _slicedToArray(_useState7, 2),
    step = _useState8[0],
    setStep = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState10 = _slicedToArray(_useState9, 2),
    formData = _useState10[0],
    setFormData = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    currentField = _useState12[0],
    setCurrentField = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    allData = _useState14[0],
    setAllData = _useState14[1];
  var handleSuggestionClick = function handleSuggestionClick(value) {
    setInput(value);
    setTimeout(function () {
      return handleSend();
    }, 0);
  };
  var formatWeeklyPlanForChat = function formatWeeklyPlanForChat(data) {
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var grouped = {};
    data.forEach(function (item) {
      var dateObj = new Date(item.week_prod_date);
      var day = dayNames[dateObj.getDay()];
      var dateStr = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
      });
      var label = "".concat(day, " (").concat(dateStr, ")");
      if (!grouped[label]) {
        grouped[label] = [];
      }
      grouped[label].push({
        prod: item.main_prod_no || "N/A",
        cust: item.customer_name || "N/A",
        press: item.main_forge_press || "N/A",
        qty: [item.shift1_qty, item.shift2_qty, item.shift3_qty].join(", ")
      });
    });

    // Build formatted string
    var message = "";
    for (var _i2 = 0, _Object$entries = Object.entries(grouped); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        dayLabel = _Object$entries$_i[0],
        plans = _Object$entries$_i[1];
      message += "\uD83D\uDCC5 ".concat(dayLabel, "\n\n");
      plans.forEach(function (p) {
        message += "\uD83D\uDD39 Production Order: ".concat(p.prod, "\n");
        message += "   Customer       : ".concat(p.cust, "\n");
        message += "   Qty (S1,S2,S3) : ".concat(p.qty, "\n");
        message += "   Press          : ".concat(p.press, "\n\n");
      });
    }
    return message.trim();
  };
  var formatPlansByDay = function formatPlansByDay(data) {
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var grouped = {};
    data.forEach(function (item) {
      var date = new Date(item.week_prod_date);
      var day = dayNames[date.getDay()];
      var dateLabel = "".concat(day, " (").concat(date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
      }), ")");
      if (!grouped[dateLabel]) {
        grouped[dateLabel] = [];
      }
      grouped[dateLabel].push({
        prod: item.main_prod_no || "N/A",
        cust: item.customer_name || "N/A",
        press: item.main_forge_press || "N/A",
        qty: [item.shift1_qty, item.shift2_qty, item.shift3_qty].join(", ")
      });
    });
    return grouped;
  };
  var handleSend = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var userMsg, userInput, res, data, dayNames, grouped, formatted, _i3, _Object$entries2, _Object$entries2$_i, dayLabel, plans, fieldMap, currentIdx, nextField, updatedForm, _res, _res2, _data, order, summary, patchData, _res3;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (input.trim()) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            userMsg = {
              type: "user",
              text: input
            };
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [userMsg]);
            });
            userInput = input.trim();
            setInput("");
            if (!(step === "idle")) {
              _context.next = 31;
              break;
            }
            if (!(userInput === "view")) {
              _context.next = 28;
              break;
            }
            _context.prev = 8;
            _context.next = 11;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan");
          case 11:
            res = _context.sent;
            _context.next = 14;
            return res.json();
          case 14:
            data = _context.sent;
            dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            grouped = {};
            data.forEach(function (item) {
              var dateObj = new Date(item.week_prod_date);
              var day = dayNames[dateObj.getDay()];
              var dateStr = dateObj.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short"
              });
              var label = "".concat(day, " (").concat(dateStr, ")");
              if (!grouped[label]) {
                grouped[label] = [];
              }
              grouped[label].push({
                prod: item.main_prod_no || "N/A",
                cust: item.customer_name || "N/A",
                press: item.main_forge_press || "N/A",
                qty: [item.shift1_qty, item.shift2_qty, item.shift3_qty].map(function (q) {
                  return q !== null && q !== void 0 ? q : 0;
                }).join(", ")
              });
            });
            formatted = "";
            for (_i3 = 0, _Object$entries2 = Object.entries(grouped); _i3 < _Object$entries2.length; _i3++) {
              _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2), dayLabel = _Object$entries2$_i[0], plans = _Object$entries2$_i[1];
              formatted += "\uD83D\uDCC5 ".concat(dayLabel, "\n\n");
              plans.forEach(function (p) {
                formatted += "\uD83D\uDD39 Production Order: ".concat(p.prod, "\n");
                formatted += "   Customer       : ".concat(p.cust, "\n");
                formatted += "   Qty (S1,S2,S3) : ".concat(p.qty, "\n");
                formatted += "   Press          : ".concat(p.press, "\n\n");
              });
            }
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: formatted.trim() || "No plans found."
              }]);
            });
            _context.next = 26;
            break;
          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](8);
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: "❌ Failed to fetch data."
              }]);
            });
          case 26:
            _context.next = 29;
            break;
          case 28:
            if (userInput === "add") {
              setStep("add_plant_code");
              setFormData({});
              setCurrentField("plant_code");
              setMessages(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  type: "bot",
                  text: "Let's add a new order.\nEnter ".concat(fieldLabels["plant_code"], ":")
                }]);
              });
            } else if (userInput === "update") {
              setStep("update_ask_prod_no");
              setMessages(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  type: "bot",
                  text: "Enter the Production Order No. you want to update:"
                }]);
              });
            } else {
              setMessages(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  type: "bot",
                  text: "❓ Type or click: `view`, `add`, or `update`."
                }]);
              });
            }
          case 29:
            _context.next = 93;
            break;
          case 31:
            if (!step.startsWith("add_")) {
              _context.next = 57;
              break;
            }
            fieldMap = Object.keys(fieldLabels);
            currentIdx = fieldMap.indexOf(currentField);
            nextField = fieldMap[currentIdx + 1];
            updatedForm = _objectSpread(_objectSpread({}, formData), {}, _defineProperty({}, currentField, userInput));
            setFormData(updatedForm);
            if (nextField) {
              _context.next = 52;
              break;
            }
            _context.prev = 38;
            _context.next = 41;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(updatedForm)
            });
          case 41:
            _res = _context.sent;
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: _res.ok ? "✅ Order added!" : "❌ Failed to add order."
              }]);
            });
            _context.next = 48;
            break;
          case 45:
            _context.prev = 45;
            _context.t1 = _context["catch"](38);
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: "❌ Network error."
              }]);
            });
          case 48:
            setStep("idle");
            setFormData({});
            _context.next = 55;
            break;
          case 52:
            setCurrentField(nextField);
            setStep("add_" + nextField);
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: "Enter ".concat(fieldLabels[nextField], ":")
              }]);
            });
          case 55:
            _context.next = 93;
            break;
          case 57:
            if (!(step === "update_ask_prod_no")) {
              _context.next = 75;
              break;
            }
            _context.prev = 58;
            _context.next = 61;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan");
          case 61:
            _res2 = _context.sent;
            _context.next = 64;
            return _res2.json();
          case 64:
            _data = _context.sent;
            setAllData(_data);
            order = _data.find(function (item) {
              return item.main_prod_no === userInput;
            });
            if (!order) {
              setMessages(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  type: "bot",
                  text: "❌ Order not found. Try again."
                }]);
              });
            } else {
              setFormData(order);
              setStep("update_field_select");
              summary = Object.entries(order).slice(0, 6).map(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                  k = _ref3[0],
                  v = _ref3[1];
                return "".concat(k, ": ").concat(v);
              }).join("\n");
              setMessages(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  type: "bot",
                  text: "Order found:\n".concat(summary, "\nWhich field would you like to update?")
                }]);
              });
            }
            _context.next = 73;
            break;
          case 70:
            _context.prev = 70;
            _context.t2 = _context["catch"](58);
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: "❌ Error fetching data."
              }]);
            });
          case 73:
            _context.next = 93;
            break;
          case 75:
            if (!(step === "update_field_select")) {
              _context.next = 79;
              break;
            }
            if (!formData.hasOwnProperty(userInput)) {
              setMessages(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  type: "bot",
                  text: "❌ Invalid field. Try again."
                }]);
              });
            } else {
              setCurrentField(userInput);
              setStep("update_field_value");
              setMessages(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  type: "bot",
                  text: "Enter new value for ".concat(userInput, ":")
                }]);
              });
            }
            _context.next = 93;
            break;
          case 79:
            if (!(step === "update_field_value")) {
              _context.next = 93;
              break;
            }
            patchData = _defineProperty({
              prod_order: formData.main_prod_no
            }, currentField, userInput);
            _context.prev = 81;
            _context.next = 84;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(patchData)
            });
          case 84:
            _res3 = _context.sent;
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: _res3.ok ? "\u2705 ".concat(currentField, " updated.") : "❌ Failed to update."
              }]);
            });
            _context.next = 91;
            break;
          case 88:
            _context.prev = 88;
            _context.t3 = _context["catch"](81);
            setMessages(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                type: "bot",
                text: "❌ Network error."
              }]);
            });
          case 91:
            setStep("idle");
            setFormData({});
          case 93:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[8, 23], [38, 45], [58, 70], [81, 88]]);
    }));
    return function handleSend() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    style: styles.chatIcon,
    onClick: function onClick() {
      return setOpen(!open);
    }
  }, "\uD83D\uDCAC"), open && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.chatBox
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.chatArea
  }, messages.map(function (msg, idx) {
    if (msg.type === "bot") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: idx,
      style: styles.messageBot
    }, msg.text);
    if (msg.type === "user") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: idx,
      style: styles.messageUser
    }, msg.text);
    if (msg.type === "suggestions") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: idx,
        style: styles.messageBot
      }, msg.buttons.map(function (btn, i) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          key: i,
          style: {
            display: "inline-block",
            margin: "4px 6px 0 0",
            padding: "4px 8px",
            fontSize: "12px",
            backgroundColor: "#e2e6ea",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer"
          },
          onClick: function onClick() {
            return handleSuggestionClick(btn.value);
          }
        }, btn.label);
      }));
    }
    return null;
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.inputRow
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    style: styles.inputBox,
    value: input,
    onChange: function onChange(e) {
      return setInput(e.target.value);
    },
    placeholder: "Type here...",
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && handleSend();
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    style: styles.sendBtn,
    onClick: handleSend
  }, "Send"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SmartWeeklyPlanChatbot);

/***/ }),

/***/ "./src/components/WeeklyPlan.jsx":
/*!***************************************!*\
  !*** ./src/components/WeeklyPlan.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-left.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-right.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
/* harmony import */ var _WeeklyPlanDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WeeklyPlanDisplay */ "./src/components/WeeklyPlanDisplay.jsx");
/* harmony import */ var _WeeklyPlanModal_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WeeklyPlanModal.css */ "./src/components/WeeklyPlanModal.css");
/* harmony import */ var _SmartWeeklyPlanChatbot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SmartWeeklyPlanChatbot */ "./src/components/SmartWeeklyPlanChatbot.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var getCookie = function getCookie(name) {
  var value = "; ".concat(document.cookie);
  var parts = value.split("; ".concat(name, "="));
  if (parts.length === 2) return parts.pop().split(";").shift();
};
var getAuthHeadersWithCSRF = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var method,
      contentType,
      credentials,
      csrfToken,
      headers,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          method = _args.length > 0 && _args[0] !== undefined ? _args[0] : "GET";
          contentType = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
          credentials = btoa("PPC_User:Ppcuser@1234"); // Step 1: Trigger cookie set
          _context.next = 5;
          return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_entry", {
            method: "GET",
            headers: {
              Authorization: "Basic ".concat(credentials)
            },
            credentials: "include"
          });
        case 5:
          csrfToken = getCookie("CSRFToken");
          console.log("Fetched CSRF Token from cookie:", csrfToken);
          if (csrfToken) {
            _context.next = 9;
            break;
          }
          throw new Error("CSRF token not found in cookies.");
        case 9:
          headers = {
            Authorization: "Basic ".concat(credentials),
            "X-CSRF-Token": csrfToken
          };
          if (contentType) {
            headers["Content-Type"] = "application/json";
          }
          return _context.abrupt("return", {
            headers: headers,
            credentials: "include"
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAuthHeadersWithCSRF() {
    return _ref.apply(this, arguments);
  };
}();
var formatDateForBackend = function formatDateForBackend(date) {
  var pad = function pad(n) {
    return n.toString().padStart(2, "0");
  };
  var day = pad(date.getDate());
  var month = pad(date.getMonth() + 1);
  var year = date.getFullYear();
  return "".concat(day, ".").concat(month, ".").concat(year, " 00:00:00");
};

// Constants
var DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var FIELD_LABELS = {
  plantCode: "Plant Code",
  productionOrderNo: "Production Order No.",
  pressId: "Press ID",
  customer: "Customer",
  netWt: "Net Weight (KG)",
  dieNo: "Die Number",
  qty: "Quantity",
  prodTonn: "Production Tonnage",
  section: "Section",
  grade: "Material Grade",
  dieRequired: "Die Required",
  rmStatus: "RM Status",
  heatCode: "Heat Code",
  remark: "Remark"
  // ✅ NEW FIELD,
};

// API Service Layer (Ready for backend integration)
var apiService = {
  getKlnMasterDataByDie: function () {
    var _getKlnMasterDataByDie = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dieNumber) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_entry?die_no=".concat(dieNumber), {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic ".concat(btoa("PPC_User:Ppcuser@1234"))
              }
            });
          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();
          case 6:
            data = _context2.sent;
            return _context2.abrupt("return", Array.isArray(data) ? data : []);
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.error("Error fetching weekly entry by die number:", _context2.t0);
            return _context2.abrupt("return", []);
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 10]]);
    }));
    function getKlnMasterDataByDie(_x) {
      return _getKlnMasterDataByDie.apply(this, arguments);
    }
    return getKlnMasterDataByDie;
  }(),
  getForgeLines: function () {
    var _getForgeLines = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            console.log("Calling Forge Lines API 🚀");
            _context3.prev = 1;
            _context3.next = 4;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/forge_lines", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic ".concat(btoa("PPC_User:Ppcuser@1234"))
              }
            });
          case 4:
            response = _context3.sent;
            _context3.next = 7;
            return response.json();
          case 7:
            data = _context3.sent;
            if (!(data && data.length > 0 && data[0].forge_lines)) {
              _context3.next = 10;
              break;
            }
            return _context3.abrupt("return", data[0].forge_lines);
          case 10:
            return _context3.abrupt("return", []);
          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            console.error("Error fetching forge lines:", _context3.t0);
            return _context3.abrupt("return", []);
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 13]]);
    }));
    function getForgeLines() {
      return _getForgeLines.apply(this, arguments);
    }
    return getForgeLines;
  }(),
  // Get all plans for a specific week
  getWeeklyPlans: function () {
    var _getWeeklyPlans = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(weekOffset) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve({
                  success: true,
                  data: {}
                });
              }, 500);
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function getWeeklyPlans(_x2) {
      return _getWeeklyPlans.apply(this, arguments);
    }
    return getWeeklyPlans;
  }(),
  // Save/Update weekly plan
  saveWeeklyPlan: function () {
    var _saveWeeklyPlan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(dayWiseData) {
      var plans, payload, authOptions, response, errorText;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            plans = [];
            Object.entries(dayWiseData).forEach(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                _ = _ref3[0],
                records = _ref3[1];
              records.forEach(function (rec) {
                var _rec$qty, _rec$qty2, _rec$qty3, _rec$dieNo, _plans$push;
                plans.push((_plans$push = {
                  prod_order: rec.productionOrderNo || "P-" + Date.now(),
                  forge_press: rec.pressId || "None",
                  heat_code: rec.heatCode || "None",
                  shift1_qty: parseInt((_rec$qty = rec.qty) === null || _rec$qty === void 0 ? void 0 : _rec$qty.shift1) || 0,
                  shift2_qty: parseInt((_rec$qty2 = rec.qty) === null || _rec$qty2 === void 0 ? void 0 : _rec$qty2.shift2) || 0,
                  shift3_qty: parseInt((_rec$qty3 = rec.qty) === null || _rec$qty3 === void 0 ? void 0 : _rec$qty3.shift3) || 0,
                  die_req: parseInt(rec.dieRequired) || 0,
                  rm_status: rec.rmStatus || "None",
                  prod_tonn: parseFloat(rec.prodTonn) || 0,
                  remark: rec.remark || "None",
                  die_no: ((_rec$dieNo = rec.dieNo) === null || _rec$dieNo === void 0 ? void 0 : _rec$dieNo[0]) || "None",
                  customer: rec.customer || "None",
                  section: parseInt(rec.section) || 0,
                  rm_grade: rec.grade === "N/A" ? "" : rec.grade
                }, _defineProperty(_plans$push, "die_req", rec.dieRequired === "N/A" || rec.dieRequired === "No" ? 0 : 1), _defineProperty(_plans$push, "plant_code", parseInt(rec.plantCode) || 0), _plans$push));
              });
            });
            payload = {
              week_prod_date: formatDateForBackend(new Date()),
              plans: plans
            };
            _context5.next = 6;
            return getAuthHeadersWithCSRF("POST");
          case 6:
            authOptions = _context5.sent;
            _context5.next = 9;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan", _objectSpread(_objectSpread({
              method: "POST"
            }, authOptions), {}, {
              body: JSON.stringify(payload)
            }));
          case 9:
            response = _context5.sent;
            if (response.ok) {
              _context5.next = 15;
              break;
            }
            _context5.next = 13;
            return response.text();
          case 13:
            errorText = _context5.sent;
            throw new Error("API Error: " + errorText);
          case 15:
            return _context5.abrupt("return", {
              success: true,
              message: "Weekly plan submitted."
            });
          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](0);
            console.error("Save plan failed:", _context5.t0);
            return _context5.abrupt("return", {
              success: false,
              message: _context5.t0.message
            });
          case 22:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 18]]);
    }));
    function saveWeeklyPlan(_x3) {
      return _saveWeeklyPlan.apply(this, arguments);
    }
    return saveWeeklyPlan;
  }(),
  // Delete specific plan
  deletePlan: function () {
    var _deletePlan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(planId) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve({
                  success: true,
                  message: "Plan deleted successfully"
                });
              }, 500);
            }));
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function deletePlan(_x4) {
      return _deletePlan.apply(this, arguments);
    }
    return deletePlan;
  }(),
  // Update specific plan
  updatePlan: function () {
    var _updatePlan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(planId, planData) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve({
                  success: true,
                  message: "Plan updated successfully"
                });
              }, 1000);
            }));
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function updatePlan(_x5, _x6) {
      return _updatePlan.apply(this, arguments);
    }
    return updatePlan;
  }(),
  // Get master data (presses, customers, etc.)
  getMasterData: function () {
    var _getMasterData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve({
                  presses: [{
                    id: "FP4001T",
                    name: "FP4001T",
                    capacity: 1000
                  }, {
                    id: "FP4002Q",
                    name: "FP4002Q",
                    capacity: 1200
                  }],
                  customers: [{
                    id: 1,
                    name: "Dana Thailand"
                  }, {
                    id: 2,
                    name: "ABC Corp"
                  }],
                  grades: ["6061", "6063", "7075"],
                  sections: ["A1", "A2", "B1", "B2"]
                });
              }, 300);
            }));
          case 1:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function getMasterData() {
      return _getMasterData.apply(this, arguments);
    }
    return getMasterData;
  }()
};

// Styles
var styles = {
  container: {
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    "@media (min-width: 768px)": {
      padding: "20px"
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "10px",
    "@media (min-width: 768px)": {
      marginBottom: "20px",
      flexWrap: "nowrap"
    }
  },
  button: {
    padding: "6px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "#f5f5f5",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    "@media (min-width: 768px)": {
      padding: "8px 16px",
      fontSize: "14px"
    }
  },
  primaryButton: {
    padding: "6px 12px",
    border: "1px solid #007bff",
    borderRadius: "4px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    "@media (min-width: 768px)": {
      padding: "8px 16px",
      fontSize: "14px"
    }
  },
  successButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    "@media (min-width: 768px)": {
      padding: "12px 30px",
      fontSize: "16px"
    }
  },
  weekNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
    padding: "6px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    flexWrap: "wrap",
    "@media (min-width: 768px)": {
      gap: "20px",
      padding: "8px",
      flexWrap: "nowrap"
    }
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "5px",
    "@media (min-width: 768px)": {
      padding: "10px"
    }
  },
  modalContent: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    width: "79%",
    maxWidth: "100vw",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 768px)": {
      padding: "15px",
      width: "98%",
      maxWidth: "1600px",
      height: "90vh"
    }
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    "@media (min-width: 768px)": {
      paddingBottom: "10px",
      marginBottom: "10px"
    }
  },
  modalTitle: {
    margin: 0,
    fontSize: "14px",
    "@media (min-width: 768px)": {
      fontSize: "16px"
    }
  },
  modalTableWrapper: {
    flex: 1,
    overflowX: "auto",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "4px",
    maxHeight: "calc(95vh - 140px)",
    "@media (min-width: 768px)": {
      maxHeight: "calc(90vh - 120px)"
    }
  },
  modalTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "10px",
    minWidth: "1200px",
    // Ensures horizontal scroll on small screens
    "@media (min-width: 768px)": {
      fontSize: "12px"
    }
  },
  modalTableHeader: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    padding: "6px 2px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "9px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    whiteSpace: "nowrap",
    "@media (min-width: 768px)": {
      padding: "8px 4px",
      fontSize: "11px"
    }
  },
  modalTableCell: {
    border: "1px solid #dee2e6",
    padding: "2px",
    verticalAlign: "top",
    minWidth: "60px",
    "@media (min-width: 768px)": {
      padding: "4px",
      minWidth: "80px"
    }
  },
  dayCell: {
    backgroundColor: "#f8f9fa",
    fontWeight: "600",
    fontSize: "9px",
    minWidth: "60px",
    position: "sticky",
    left: 0,
    zIndex: 5,
    whiteSpace: "nowrap",
    "@media (min-width: 768px)": {
      fontSize: "11px",
      minWidth: "70px"
    }
  },
  compactInput: {
    width: "100%",
    padding: "2px 3px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "9px",
    minHeight: "20px",
    boxSizing: "border-box",
    "@media (min-width: 768px)": {
      padding: "3px 5px",
      fontSize: "11px",
      minHeight: "24px"
    }
  },
  compactSelect: {
    width: "100%",
    padding: "2px 3px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "9px",
    minHeight: "22px",
    backgroundColor: "white",
    color: "#333",
    boxSizing: "border-box",
    "@media (min-width: 768px)": {
      padding: "3px 5px",
      fontSize: "11px",
      minHeight: "26px"
    }
  },
  shiftInputs: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    "@media (min-width: 768px)": {
      gap: "2px"
    }
  },
  shiftInput: {
    width: "100%",
    padding: "1px 2px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "8px",
    minHeight: "16px",
    boxSizing: "border-box",
    "@media (min-width: 768px)": {
      padding: "2px 4px",
      fontSize: "10px",
      minHeight: "20px"
    }
  },
  actionButtons: {
    display: "flex",
    gap: "1px",
    flexWrap: "wrap",
    "@media (min-width: 768px)": {
      gap: "2px"
    }
  },
  smallButton: {
    padding: "1px 4px",
    fontSize: "8px",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    minHeight: "16px",
    whiteSpace: "nowrap",
    "@media (min-width: 768px)": {
      padding: "2px 6px",
      fontSize: "10px",
      minHeight: "20px"
    }
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    paddingTop: "6px",
    borderTop: "1px solid #eee",
    marginTop: "6px",
    flexShrink: 0,
    flexWrap: "wrap",
    "@media (min-width: 768px)": {
      gap: "10px",
      paddingTop: "8px",
      marginTop: "8px",
      flexWrap: "nowrap"
    }
  },
  modalFooterButton: {
    padding: "6px 12px",
    fontSize: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid",
    minWidth: "80px",
    "@media (min-width: 768px)": {
      padding: "8px 16px",
      fontSize: "14px",
      minWidth: "auto"
    }
  },
  loading: {
    textAlign: "center",
    padding: "15px",
    color: "#666",
    fontSize: "14px",
    "@media (min-width: 768px)": {
      padding: "20px",
      fontSize: "16px"
    }
  }
};
var WeeklyPlan = function WeeklyPlan() {
  // State Management
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    weekOffset = _useState2[0],
    setWeekOffset = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    pressDropdown = _useState4[0],
    setPressDropdown = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    modalWeekOffset = _useState6[0],
    setModalWeekOffset = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState8 = _slicedToArray(_useState7, 2),
    plans = _useState8[0],
    setPlans = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState10 = _slicedToArray(_useState9, 2),
    dayWiseData = _useState10[0],
    setDayWiseData = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showModal = _useState12[0],
    setShowModal = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    showPreviewTable = _useState14[0],
    setShowPreviewTable = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    loading = _useState16[0],
    setLoading = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      presses: [],
      customers: [],
      grades: [],
      sections: []
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    masterData = _useState18[0],
    setMasterData = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    editingRow = _useState20[0],
    setEditingRow = _useState20[1];
  var handleEditClick = function handleEditClick(dayName, index) {
    setEditingRow({
      dayName: dayName,
      index: index
    });
  };
  var handleCancelEdit = function handleCancelEdit() {
    setEditingRow(null);
  };
  var handlePreviewRowChange = function handlePreviewRowChange(field, value) {
    var updatedRow = _objectSpread({}, record);
    if (field === "dieNo") {
      updatedRow.dieNo = value;

      // validation condition: if no matching plan data found
      var isValidDie = checkDieNoAgainstMaster(value); // assume this exists

      updatedRow.dieNoError = !isValidDie;
    } else {
      updatedRow[field] = value;
    }

    // then update state
    updateRecord(updatedRow); // your existing state updater
  };

  var handlePreviewSave = function handlePreviewSave() {
    setEditingRow(null);
  };

  // Utility Functions
  var getWeekDates = function getWeekDates() {
    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var dates = [];
    var today = new Date();
    var currentMonday = new Date(today);
    var dayOfWeek = today.getDay();
    var daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    currentMonday.setDate(today.getDate() + daysToMonday + offset * 7);
    for (var i = 0; i < 6; i++) {
      var date = new Date(currentMonday);
      date.setDate(currentMonday.getDate() + i);
      dates.push({
        dayName: DAY_NAMES[i],
        date: date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }),
        fullDate: date,
        key: "".concat(date.getFullYear(), "-").concat(date.getMonth(), "-").concat(date.getDate())
      });
    }
    return dates;
  };
  var getWeekTitle = function getWeekTitle() {
    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : weekOffset;
    var dates = getWeekDates(offset);
    var startDate = dates[0].fullDate;
    var endDate = dates[5].fullDate;
    var startStr = startDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short"
    });
    var endStr = endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    return "".concat(startStr, " - ").concat(endStr);
  };
  var getWeekStatus = function getWeekStatus() {
    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : weekOffset;
    if (offset === 0) return "Current Week";
    if (offset === 1) return "Next Week";
    return offset > 1 ? "".concat(offset, " Weeks Ahead") : "".concat(Math.abs(offset), " Weeks Ago");
  };
  var createEmptyRecord = function createEmptyRecord(dayName, date) {
    return {
      id: "temp_".concat(Date.now(), "_").concat(Math.random()),
      pressId: "",
      customer: "",
      netWt: "",
      dieNo: [""],
      dieNoError: false,
      dieNoErrorMessage: "",
      qty: {
        shift1: "",
        shift2: "",
        shift3: ""
      },
      prodTonn: "",
      section: "",
      plantCode: "",
      grade: "",
      dieRequired: "",
      rmStatus: "",
      heatCode: "",
      remark: "",
      day: dayName,
      date: date,
      weekOffset: modalWeekOffset,
      isNew: true
    };
  };

  // API Integration Functions
  var loadWeeklyPlans = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(offset) {
      var response;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            setLoading(true);
            _context9.prev = 1;
            _context9.next = 4;
            return apiService.getWeeklyPlans(offset);
          case 4:
            response = _context9.sent;
            if (response.success) {
              setPlans(response.data || {});
            }
            _context9.next = 11;
            break;
          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](1);
            console.error("Error loading plans:", _context9.t0);
          case 11:
            _context9.prev = 11;
            setLoading(false);
            return _context9.finish(11);
          case 14:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[1, 8, 11, 14]]);
    }));
    return function loadWeeklyPlans(_x7) {
      return _ref4.apply(this, arguments);
    };
  }();
  var loadMasterData = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var forgeLines, transformedPresses, data;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            console.log("loadMasterData called ✅");
            _context10.prev = 1;
            _context10.next = 4;
            return apiService.getForgeLines();
          case 4:
            forgeLines = _context10.sent;
            // ✅ Uncomment this line
            console.log("Forge Lines API Response 👉", forgeLines); // ✅ Add this debug log

            // Transform data properly
            transformedPresses = forgeLines.map(function (press) {
              return {
                id: press,
                name: press
              };
            });
            console.log("Transformed Presses:", transformedPresses); // ✅ Add this debug log

            // Static values ko empty arrays se replace kar dein
            data = {
              presses: transformedPresses,
              // Yeh remove kar dega Press ID dropdown
              customers: [],
              // Yeh remove kar dega Customer dropdown
              grades: [],
              // Yeh remove kar dega Grade dropdown
              sections: [] // Yeh remove kar dega Section dropdown
            };

            setMasterData(data);
            console.log("MasterData set:", data); // ✅ Add this debug log
            _context10.next = 16;
            break;
          case 13:
            _context10.prev = 13;
            _context10.t0 = _context10["catch"](1);
            console.error("Error loading master data:", _context10.t0);
          case 16:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[1, 13]]);
    }));
    return function loadMasterData() {
      return _ref5.apply(this, arguments);
    };
  }();
  var initializeDayWiseData = function initializeDayWiseData() {
    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : modalWeekOffset;
    var dates = getWeekDates(offset);
    var data = {};
    dates.forEach(function (_ref6) {
      var dayName = _ref6.dayName,
        date = _ref6.date;
      // Check if plans exist for this day
      var existingPlan = plans[dayName];
      if (existingPlan && existingPlan.length > 0) {
        data[dayName] = existingPlan;
      } else {
        data[dayName] = [createEmptyRecord(dayName, date)];
      }
    });
    return data;
  };

  // Event Handlers
  var handleWeekChange = function handleWeekChange(newOffset) {
    setWeekOffset(newOffset);
    loadWeeklyPlans(newOffset);
  };
  var handleModalWeekChange = function handleModalWeekChange(newOffset) {
    setModalWeekOffset(newOffset);
    var newData = initializeDayWiseData(newOffset);
    setDayWiseData(newData);
  };

  // Update the handleDieNoChange function
  // 1. Update the handleDieNoChange function
  var handleDieNoChange = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(day, recordIndex, value) {
      var results, uniqueProductionOrders, first, _first;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            if (!(!value || value.trim() === "")) {
              _context11.next = 3;
              break;
            }
            // Reset fields
            setDayWiseData(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
                return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
                  dieNo: [value],
                  dieNoError: false,
                  dieNoErrorMessage: "",
                  productionOrderNo: "",
                  customer: "",
                  grade: "",
                  pressId: "",
                  plantCode: "",
                  section: "",
                  netWt: "",
                  customerOptions: [],
                  pressOptions: [],
                  gradeOptions: [],
                  plantOptions: [],
                  productionOrderOptions: [],
                  // New field
                  dieResults: [] // Store all API results
                }) : record;
              })));
            });
            return _context11.abrupt("return");
          case 3:
            _context11.prev = 3;
            _context11.next = 6;
            return apiService.getKlnMasterDataByDie(value);
          case 6:
            results = _context11.sent;
            if (!(!results || results.length === 0)) {
              _context11.next = 10;
              break;
            }
            // No matching die number
            setDayWiseData(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
                return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
                  dieNo: [value],
                  dieNoError: true,
                  dieNoErrorMessage: "No data found for Die No. ".concat(value),
                  productionOrderNo: "",
                  customer: "",
                  grade: "",
                  pressId: masterData.defaultPressId || "",
                  plantCode: "",
                  section: "",
                  netWt: "",
                  customerOptions: [],
                  pressOptions: [],
                  gradeOptions: [],
                  plantOptions: [],
                  productionOrderOptions: [],
                  dieResults: []
                }) : record;
              })));
            });
            return _context11.abrupt("return");
          case 10:
            // Get unique production orders
            uniqueProductionOrders = _toConsumableArray(new Set(results.map(function (r) {
              return r.prod_order;
            })));
            if (uniqueProductionOrders.length === 1) {
              first = results[0];
              setDayWiseData(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
                  return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
                    dieNo: [value],
                    dieNoError: false,
                    dieNoErrorMessage: "",
                    productionOrderNo: first.prod_order || "",
                    plantCode: first.plant_code || "",
                    // pressId: first.forge_press || masterData.defaultPressId || "",
                    pressId: first.forge_press || "",
                    customer: first.customer || "",
                    netWt: first.net_wt || 0,
                    section: first.section || "",
                    grade: first.rm_grade || "N/A",
                    // <-- DEFAULT if empty
                    dieRequired: first.die_req || "No",
                    // <-- DEFAULT if empty
                    rmStatus: first.rm_status || "No",
                    // <-- DEFAULT if empty
                    customerOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.customer;
                    }).filter(Boolean))),
                    pressOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.forge_press;
                    }).filter(Boolean))),
                    gradeOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.rm_grade;
                    }).filter(function (g) {
                      return g !== "" && g !== null;
                    }))),
                    plantOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.plant_code;
                    }).filter(Boolean))),
                    productionOrderOptions: uniqueProductionOrders,
                    dieResults: results
                  }) : record;
                })));
              });
            } else {
              // Multiple production orders - show dropdown without auto-filling other fields
              _first = results[0];
              setDayWiseData(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
                  return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
                    dieNo: [value],
                    dieNoError: false,
                    dieNoErrorMessage: "",
                    productionOrderNo: "",
                    // Don't auto-fill
                    plantCode: "",
                    pressId: _first.forge_press || "",
                    customer: "",
                    netWt: "",
                    section: "",
                    grade: "",
                    dieRequired: "",
                    rmStatus: "",
                    customerOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.customer;
                    }))),
                    pressOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.forge_press;
                    }))),
                    gradeOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.rm_grade;
                    }))),
                    plantOptions: _toConsumableArray(new Set(results.map(function (r) {
                      return r.plant_code;
                    }))),
                    productionOrderOptions: uniqueProductionOrders,
                    dieResults: results
                  }) : record;
                })));
              });
            }
            _context11.next = 18;
            break;
          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11["catch"](3);
            console.error("API error:", _context11.t0);
            setDayWiseData(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
                return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
                  dieNo: [value],
                  pressId: masterData.defaultPressId || "",
                  dieNoError: true,
                  dieNoErrorMessage: "Error fetching die data",
                  productionOrderOptions: [],
                  dieResults: []
                }) : record;
              })));
            });
          case 18:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[3, 14]]);
    }));
    return function handleDieNoChange(_x8, _x9, _x10) {
      return _ref7.apply(this, arguments);
    };
  }();
  var handleProductionOrderChange = function handleProductionOrderChange(dayName, recordIndex, selectedProdOrder) {
    setDayWiseData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, dayName, prev[dayName].map(function (record, idx) {
        if (idx === recordIndex) {
          var _record$dieResults;
          // Find the selected production order data from stored results
          var selectedData = (_record$dieResults = record.dieResults) === null || _record$dieResults === void 0 ? void 0 : _record$dieResults.find(function (result) {
            return result.prod_order === selectedProdOrder;
          });
          if (selectedData) {
            return _objectSpread(_objectSpread({}, record), {}, {
              productionOrderNo: selectedProdOrder,
              plantCode: selectedData.plant_code,
              pressId: selectedData.forge_press,
              customer: selectedData.customer,
              netWt: selectedData.net_wt,
              section: selectedData.section,
              grade: selectedData.rm_grade || "N/A",
              dieRequired: selectedData.die_req || "No",
              rmStatus: selectedData.rm_status || "No"
            });
          } else {
            return _objectSpread(_objectSpread({}, record), {}, {
              productionOrderNo: selectedProdOrder
            });
          }
        }
        return record;
      })));
    });
  };
  var addNewRowForDay = function addNewRowForDay(day) {
    var dates = getWeekDates(modalWeekOffset);
    var dayData = dates.find(function (d) {
      return d.dayName === day;
    });
    var emptyRow = createEmptyRecord(day, dayData.date);
    setDayWiseData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, [].concat(_toConsumableArray(prev[day]), [emptyRow])));
    });
  };
  var removeRowFromDay = function removeRowFromDay(day, recordIndex) {
    setDayWiseData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].filter(function (_, idx) {
        return idx !== recordIndex;
      })));
    });
  };
  var updateDieNo = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(day, recordIndex, dieIndex, value) {
      var _masterData;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            setDayWiseData(function (prev) {
              var newData = _objectSpread({}, prev);
              newData[day][recordIndex].dieNo[dieIndex] = value;
              return newData;
            });
            if (!(dieIndex === 0 && value)) {
              _context12.next = 6;
              break;
            }
            _context12.next = 4;
            return apiService.getKlnMasterDataByDie(value);
          case 4:
            _masterData = _context12.sent;
            if (_masterData) {
              setDayWiseData(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
                  return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
                    customer: _masterData.customer_name,
                    netWt: _masterData.net_wt,
                    section: _masterData.rm_section,
                    grade: _masterData.rm_grade
                  }) : record;
                })));
              });
            }
          case 6:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }));
    return function updateDieNo(_x11, _x12, _x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }();
  var addDieNo = function addDieNo(day, recordIndex) {
    setDayWiseData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
        return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
          dieNo: [].concat(_toConsumableArray(record.dieNo || []), [""])
        }) : record;
      })));
    });
  };
  var removeDieNo = function removeDieNo(day, recordIndex, dieIndex) {
    setDayWiseData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, day, prev[day].map(function (record, idx) {
        return idx === recordIndex ? _objectSpread(_objectSpread({}, record), {}, {
          dieNo: record.dieNo.filter(function (_, i) {
            return i !== dieIndex;
          })
        }) : record;
      })));
    });
  };
  var calculateProdTonn = function calculateProdTonn(qty, netWt) {
    var s1 = parseFloat((qty === null || qty === void 0 ? void 0 : qty.shift1) || 0);
    var s2 = parseFloat((qty === null || qty === void 0 ? void 0 : qty.shift2) || 0);
    var s3 = parseFloat((qty === null || qty === void 0 ? void 0 : qty.shift3) || 0);
    var wt = parseFloat(netWt || 0);
    return (s1 + s2 + s3) * wt;
  };
  var handleDayWiseChange = function handleDayWiseChange(dayName, recordIndex, field, value) {
    setDayWiseData(function (prev) {
      var updated = _objectSpread({}, prev);
      var record = _objectSpread({}, updated[dayName][recordIndex]);
      if (field.startsWith("shift")) {
        record.qty = _objectSpread(_objectSpread({}, record.qty), {}, _defineProperty({}, field, value));
      } else {
        record[field] = value;
      }

      // recalculate prodTonn
      var qty = field.startsWith("shift") ? record.qty : record.qty || {};
      var netWt = field === "netWt" ? value : record.netWt;
      record.prodTonn = calculateProdTonn(qty, netWt);
      updated[dayName][recordIndex] = record;
      return updated;
    });
  };
  var handleSavePlan = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var validatedPlans, allProdOrders, _i2, _Object$entries, _Object$entries$_i, day, records, _iterator, _step, _rec$dieNo2, rec, qty, isAnyFieldEmpty, dateParts, weekDateStr, payload, authOptions, response, errMsg;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            setLoading(true);
            _context13.prev = 1;
            validatedPlans = [];
            allProdOrders = new Set();
            _i2 = 0, _Object$entries = Object.entries(dayWiseData);
          case 5:
            if (!(_i2 < _Object$entries.length)) {
              _context13.next = 39;
              break;
            }
            _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2), day = _Object$entries$_i[0], records = _Object$entries$_i[1];
            _iterator = _createForOfIteratorHelper(records);
            _context13.prev = 8;
            _iterator.s();
          case 10:
            if ((_step = _iterator.n()).done) {
              _context13.next = 28;
              break;
            }
            rec = _step.value;
            qty = rec.qty || {};
            isAnyFieldEmpty = !rec.productionOrderNo || !rec.pressId || !rec.heatCode || !rec.dieRequired || !rec.rmStatus || !rec.remark || !((_rec$dieNo2 = rec.dieNo) !== null && _rec$dieNo2 !== void 0 && _rec$dieNo2[0]) || !rec.customer || rec.section === "" || rec.grade === "" || rec.plantCode === "" || qty.shift1 === "" || qty.shift2 === "" || qty.shift3 === "";
            if (!isAnyFieldEmpty) {
              _context13.next = 18;
              break;
            }
            alert("⚠️ Please fill all fields before saving the plan.");
            setLoading(false);
            return _context13.abrupt("return");
          case 18:
            if (!allProdOrders.has(rec.productionOrderNo)) {
              _context13.next = 22;
              break;
            }
            alert("\u26A0\uFE0F Duplicate Production Order \"".concat(rec.productionOrderNo, "\" found!"));
            setLoading(false);
            return _context13.abrupt("return");
          case 22:
            allProdOrders.add(rec.productionOrderNo);

            // ✅ Convert record.date ("16/07/2025") → "16.07.2025 00:00:00"
            dateParts = rec.date.split("/");
            weekDateStr = "".concat(dateParts[0], ".").concat(dateParts[1], ".").concat(dateParts[2], " 00:00:00");
            validatedPlans.push({
              week_prod_date: weekDateStr,
              prod_order: rec.productionOrderNo,
              forge_press: rec.pressId,
              heat_code: rec.heatCode,
              shift1_qty: parseInt(qty.shift1),
              shift2_qty: parseInt(qty.shift2),
              shift3_qty: parseInt(qty.shift3),
              rm_status: rec.rmStatus,
              prod_tonn: parseFloat(rec.prodTonn) || 0,
              remark: rec.remark,
              die_no: rec.dieNo[0],
              customer: rec.customer,
              section: parseInt(rec.section),
              rm_grade: rec.grade === "N/A" ? "" : rec.grade,
              die_req: rec.dieRequired === "N/A" || rec.dieRequired === "No" ? 0 : 1,
              plant_code: parseInt(rec.plantCode)
            });
          case 26:
            _context13.next = 10;
            break;
          case 28:
            _context13.next = 33;
            break;
          case 30:
            _context13.prev = 30;
            _context13.t0 = _context13["catch"](8);
            _iterator.e(_context13.t0);
          case 33:
            _context13.prev = 33;
            _iterator.f();
            return _context13.finish(33);
          case 36:
            _i2++;
            _context13.next = 5;
            break;
          case 39:
            payload = validatedPlans;
            console.log("📦 Final Payload Being Sent:", payload);

            // ✅ FIXED: Use getAuthHeadersWithCSRF properly
            _context13.next = 43;
            return getAuthHeadersWithCSRF("POST");
          case 43:
            authOptions = _context13.sent;
            _context13.next = 46;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan", _objectSpread(_objectSpread({
              method: "POST"
            }, authOptions), {}, {
              // This includes headers with CSRF token and credentials
              body: JSON.stringify(payload)
            }));
          case 46:
            response = _context13.sent;
            if (response.ok) {
              _context13.next = 52;
              break;
            }
            _context13.next = 50;
            return response.text();
          case 50:
            errMsg = _context13.sent;
            throw new Error(errMsg);
          case 52:
            alert("✅ Plan submitted successfully!");
            setShowModal(false);
            setShowPreviewTable(false); // ← This line was missing or not working properly
            setDayWiseData({}); // Clear modal data
            setModalWeekOffset(weekOffset); // Reset modal week offset

            // Reload the main weekly plans
            _context13.next = 59;
            return loadWeeklyPlans(weekOffset);
          case 59:
            _context13.next = 65;
            break;
          case 61:
            _context13.prev = 61;
            _context13.t1 = _context13["catch"](1);
            console.error("❌ Save plan failed:", _context13.t1);
            alert("❌ Error saving plan: " + _context13.t1.message);
          case 65:
            _context13.prev = 65;
            setLoading(false);
            return _context13.finish(65);
          case 68:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[1, 61, 65, 68], [8, 30, 33, 36]]);
    }));
    return function handleSavePlan() {
      return _ref9.apply(this, arguments);
    };
  }();
  var openModal = function openModal() {
    setModalWeekOffset(weekOffset);
    setShowModal(true);
    setShowPreviewTable(false);
  };
  var closeModal = function closeModal() {
    setShowModal(false);
    setShowPreviewTable(false); // ✅ Ensure preview table is hidden
    setModalWeekOffset(weekOffset);
    setDayWiseData({}); // ✅ Clear any leftover data
    setEditingRow(null); // ✅ Clear editing state
  };

  // Effects
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    console.log("Component Mounted ✅");
    loadMasterData();
    loadWeeklyPlans(weekOffset);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (showModal) {
      setDayWiseData(initializeDayWiseData(modalWeekOffset));
    }
  }, [modalWeekOffset, showModal]);

  // Render Functions
  var renderSelectField = function renderSelectField(field, value, day, recordIndex) {
    var _dayWiseData$day;
    var options = [];
    var record = ((_dayWiseData$day = dayWiseData[day]) === null || _dayWiseData$day === void 0 ? void 0 : _dayWiseData$day[recordIndex]) || {};
    switch (field) {
      case "pressId":
        // Your existing logic maintained - API data will come through masterData.presses
        options = masterData.presses.map(function (press) {
          return {
            value: press.id,
            label: press.name
          };
        });

        // Add dynamic options from die number lookup (if available)
        if (record.pressOptions && record.pressOptions.length > 0) {
          var dynamicOptions = record.pressOptions.map(function (press) {
            return {
              value: press,
              label: press
            };
          });

          // Merge API data with dynamic data, avoid duplicates
          dynamicOptions.forEach(function (dynOpt) {
            if (!options.find(function (existing) {
              return existing.value === dynOpt.value;
            })) {
              options.push(dynOpt);
            }
          });
        }
        break;
      case "customer":
        // Your existing logic maintained
        options = masterData.customers.map(function (customer) {
          return {
            value: customer.name,
            label: customer.name
          };
        });

        // Add dynamic options from die number lookup (if available)
        if (record.customerOptions && record.customerOptions.length > 0) {
          var dynamicCustomers = record.customerOptions.map(function (customer) {
            return {
              value: customer,
              label: customer
            };
          });

          // Merge with existing options, avoid duplicates
          dynamicCustomers.forEach(function (dynOpt) {
            if (!options.find(function (existing) {
              return existing.value === dynOpt.value;
            })) {
              options.push(dynOpt);
            }
          });
        }
        break;
      case "grade":
        // Your existing logic maintained
        options = masterData.grades.filter(Boolean).map(function (grade) {
          return {
            value: grade,
            label: grade
          };
        });

        // Add dynamic options from die number lookup (if available)
        if (record.gradeOptions && record.gradeOptions.length > 0) {
          var dynamicGrades = record.gradeOptions.map(function (grade) {
            return {
              value: grade,
              label: grade
            };
          });

          // Merge with existing options, avoid duplicates
          dynamicGrades.forEach(function (dynOpt) {
            if (!options.find(function (existing) {
              return existing.value === dynOpt.value;
            })) {
              options.push(dynOpt);
            }
          });
        }
        break;
      case "section":
        // Your existing logic maintained
        options = masterData.sections.map(function (section) {
          return {
            value: section,
            label: section
          };
        });
        break;
      default:
        return renderInputField(field, value, day, recordIndex);
    }

    // Your existing return logic maintained completely
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
      value: value || "",
      onChange: function onChange(e) {
        return handleDayWiseChange(day, recordIndex, field, e.target.value);
      },
      style: styles.select
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
      value: ""
    }, "Select ", FIELD_LABELS[field]), options.map(function (option) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        key: option.value,
        value: option.value
      }, option.label);
    }));
  };
  var renderInputField = function renderInputField(field, value, day, recordIndex) {
    var numberFields = ["qty", "netWt", "prodTonn"];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: numberFields.includes(field) ? "number" : "text",
      value: value || "",
      onChange: function onChange(e) {
        return handleDayWiseChange(day, recordIndex, field, e.target.value);
      },
      style: styles.input,
      placeholder: "".concat(FIELD_LABELS[field])
    });
  };

  // const renderDieNoField = (record, day, recordIndex) => (
  //   <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
  //     {(record.dieNo || []).map((dn, dieIndex) => (
  //       <div
  //         key={dieIndex}
  //         style={{ display: "flex", gap: "4px", alignItems: "center" }}
  //       >
  //         <input
  //           type="text"
  //           value={record.dieNo[0] || ""}
  //           onChange={(e) =>
  //             handleDieNoChange(day, recordIndex, e.target.value)
  //           }
  //           style={styles.input}
  //           placeholder="Die No"
  //         />

  //         {record.dieNo.length > 1 && (
  //           <button
  //             onClick={() => removeDieNo(day, recordIndex, dieIndex)}
  //             style={{
  //               padding: "4px",
  //               background: "#dc3545",
  //               color: "white",
  //               border: "none",
  //               borderRadius: "3px",
  //             }}
  //           >
  //             <X size={12} />
  //           </button>
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );

  var renderWeekNavigation = function renderWeekNavigation(offset, setOffset) {
    var showInModal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: styles.weekNav
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: function onClick() {
        return setOffset(offset - 1);
      },
      style: _objectSpread(_objectSpread({}, styles.button), {}, {
        background: "white"
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
      size: 16
    }), " Previous Week"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        fontSize: showInModal ? "16px" : "18px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, getWeekTitle(offset)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        fontSize: "14px",
        color: "#666",
        marginTop: "4px"
      }
    }, getWeekStatus(offset))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: function onClick() {
        return setOffset(offset + 1);
      },
      style: _objectSpread(_objectSpread({}, styles.button), {}, {
        background: "white"
      })
    }, "Next Week ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
      size: 16
    })));
  };
  var renderPreviewTable = function renderPreviewTable() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        overflowX: "auto",
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginTop: "20px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", {
      style: {
        padding: "10px",
        margin: 0,
        background: "#f8f9fa",
        borderBottom: "1px solid #ccc"
      }
    }, "Weekly Plan Preview - ", getWeekTitle(modalWeekOffset)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
      style: styles.table
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, ["Day", "Plant Code", "Production Order No.", "Press", "Customer", "Net Wt", "Die No", "Qty", "Prod Tonn", "Section", "Grade", "Die Required", "RM Status", "Heat Code", "Remark", "Actions"].map(function (label) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
        key: label,
        style: styles.tableHeader
      }, label);
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, Object.entries(dayWiseData).some(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
        _ = _ref11[0],
        records = _ref11[1];
      return records.length > 0;
    }) ? Object.entries(dayWiseData).map(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 2),
        dayName = _ref13[0],
        records = _ref13[1];
      return records.map(function (record, index) {
        var isEditing = editingRow && editingRow.dayName === dayName && editingRow.index === index;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
          key: "".concat(dayName, "-").concat(index)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          style: styles.tableCell
        }, dayName), Object.keys(FIELD_LABELS).map(function (field) {
          var _record$qty, _record$qty2, _record$qty3;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
            key: field,
            className: "modal-table-cell"
          }, isEditing ? field === "dieNo" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
            type: "text",
            value: (record.dieNo || []).join(", "),
            onChange: function onChange(e) {
              return handlePreviewRowChange("dieNo", e.target.value.split(",").map(function (s) {
                return s.trim();
              }));
            },
            className: "modal-input"
          }) : field === "prodTonn" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
            type: "number",
            value: (((parseFloat((_record$qty = record.qty) === null || _record$qty === void 0 ? void 0 : _record$qty.shift1) || 0) + (parseFloat((_record$qty2 = record.qty) === null || _record$qty2 === void 0 ? void 0 : _record$qty2.shift2) || 0) + (parseFloat((_record$qty3 = record.qty) === null || _record$qty3 === void 0 ? void 0 : _record$qty3.shift3) || 0)) * (parseFloat(record.netWt) || 0)).toFixed(2),
            readOnly: true,
            className: "modal-input readonly"
          }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
            type: ["qty", "netWt"].includes(field) ? "number" : "text",
            value: _typeof(record[field]) === "object" ? "" : record[field] || "",
            onChange: function onChange(e) {
              return handlePreviewRowChange(field, e.target.value);
            },
            className: "modal-input"
          }) : field === "dieNo" && Array.isArray(record.dieNo) ? record.dieNo.join(", ") : field === "qty" && _typeof(record.qty) === "object" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, record.qty.shift1 && "S1: ".concat(record.qty.shift1, " "), record.qty.shift2 && "S2: ".concat(record.qty.shift2, " "), record.qty.shift3 && "S3: ".concat(record.qty.shift3)) : record[field] === null || record[field] === undefined || record[field] === "" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
            className: "modal-na"
          }, "N/A") : record[field].toString());
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          style: styles.tableCell
        }, isEditing ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: handlePreviewSave,
          style: _objectSpread(_objectSpread({}, styles.button), {}, {
            padding: "4px 8px",
            background: "#28a745",
            color: "white"
          })
        }, "Save"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: handleCancelEdit,
          style: _objectSpread(_objectSpread({}, styles.button), {}, {
            padding: "4px 8px",
            background: "#6c757d",
            color: "white"
          })
        }, "Cancel")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: function onClick() {
            return handleEditClick(dayName, index);
          },
          style: _objectSpread(_objectSpread({}, styles.button), {}, {
            padding: "4px 8px"
          })
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
          size: 14
        }), " Edit")));
      });
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
      colSpan: 14,
      style: {
        padding: "20px",
        textAlign: "center",
        color: "#777",
        fontStyle: "italic"
      }
    }, "No data available for ", getWeekTitle(modalWeekOffset))))));
  };
  if (loading && !showModal) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: styles.loading
    }, "Loading...");
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.container
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.header
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      gap: "10px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: openModal,
    style: styles.primaryButton
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: 16
  }), " Enter Plan"))), showModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.modal
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.modalContent
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.modalHeader
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    style: styles.modalTitle
  }, "Weekly Plan Entry"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: closeModal,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "3px",
      "@media (min-width: 768px)": {
        padding: "5px"
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
    size: window.innerWidth >= 768 ? 20 : 16
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.weekNav
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      return handleModalWeekChange(modalWeekOffset - 1);
    },
    style: _objectSpread(_objectSpread({}, styles.button), {}, {
      background: "white",
      fontSize: window.innerWidth >= 768 ? "14px" : "11px"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: window.innerWidth >= 768 ? 16 : 14
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      display: window.innerWidth >= 480 ? "inline" : "none"
    }
  }, "Previous")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: window.innerWidth >= 768 ? "16px" : "12px",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      flex: "1",
      minWidth: "120px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, getWeekTitle(modalWeekOffset)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: window.innerWidth >= 768 ? "14px" : "10px",
      color: "#666",
      marginTop: "2px"
    }
  }, getWeekStatus(modalWeekOffset))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      return handleModalWeekChange(modalWeekOffset + 1);
    },
    style: _objectSpread(_objectSpread({}, styles.button), {}, {
      background: "white",
      fontSize: window.innerWidth >= 768 ? "14px" : "11px"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      display: window.innerWidth >= 480 ? "inline" : "none"
    }
  }, "Next"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
    size: window.innerWidth >= 768 ? 16 : 14
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.modalTableWrapper
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    style: styles.modalTable
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    style: _objectSpread(_objectSpread({}, styles.modalTableHeader), styles.dayCell)
  }, "Day & Date"), Object.keys(FIELD_LABELS).map(function (field) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      key: field,
      style: styles.modalTableHeader
    }, window.innerWidth >= 768 ? FIELD_LABELS[field] : FIELD_LABELS[field].length > 12 ? FIELD_LABELS[field].substring(0, 12) + "..." : FIELD_LABELS[field]);
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    style: styles.modalTableHeader
  }, "Actions"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, getWeekDates(modalWeekOffset).map(function (_ref14) {
    var _dayWiseData$dayName;
    var dayName = _ref14.dayName,
      date = _ref14.date;
    return (_dayWiseData$dayName = dayWiseData[dayName]) === null || _dayWiseData$dayName === void 0 ? void 0 : _dayWiseData$dayName.map(function (record, recordIndex) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
        key: "".concat(dayName, "-").concat(recordIndex)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
        style: _objectSpread(_objectSpread({}, styles.modalTableCell), styles.dayCell)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        style: {
          fontWeight: "600"
        }
      }, dayName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        style: {
          fontSize: window.innerWidth >= 768 ? "10px" : "8px",
          color: "#666"
        }
      }, window.innerWidth >= 480 ? date : date.split("/").slice(0, 2).join("/")), recordIndex > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        style: {
          fontSize: window.innerWidth >= 768 ? "9px" : "7px",
          color: "#999"
        }
      }, "#", recordIndex + 1)), Object.keys(FIELD_LABELS).map(function (field) {
        var _record$dieNo, _record$qty4, _record$qty5, _record$qty6, _record$pressOptions, _masterData$presses, _masterData$presses$f, _record$field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          key: "".concat(dayName, "-").concat(recordIndex, "-").concat(field),
          style: styles.modalTableCell
        }, field === "dieNo" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "text",
          value: ((_record$dieNo = record.dieNo) === null || _record$dieNo === void 0 ? void 0 : _record$dieNo[0]) || "",
          onChange: function onChange(e) {
            return handleDieNoChange(dayName, recordIndex, e.target.value);
          },
          style: _objectSpread(_objectSpread({}, styles.compactInput), {}, {
            borderColor: record.dieNoError ? "#dc3545" : "#ccc",
            backgroundColor: record.dieNoError ? "#fff5f5" : "white"
          }),
          placeholder: window.innerWidth >= 768 ? "Die No" : "Die"
        }), record.dieNoError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          style: {
            color: "#dc3545",
            fontSize: window.innerWidth >= 768 ? "9px" : "7px",
            marginTop: "1px"
          }
        }, window.innerWidth >= 768 ? record.dieNoErrorMessage : "Error")) : field === "qty" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          style: styles.shiftInputs
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "number",
          placeholder: "S1",
          value: ((_record$qty4 = record.qty) === null || _record$qty4 === void 0 ? void 0 : _record$qty4.shift1) || "",
          onChange: function onChange(e) {
            return handleDayWiseChange(dayName, recordIndex, "qty", _objectSpread(_objectSpread({}, record.qty), {}, {
              shift1: e.target.value
            }));
          },
          style: styles.shiftInput
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "number",
          placeholder: "S2",
          value: ((_record$qty5 = record.qty) === null || _record$qty5 === void 0 ? void 0 : _record$qty5.shift2) || "",
          onChange: function onChange(e) {
            return handleDayWiseChange(dayName, recordIndex, "qty", _objectSpread(_objectSpread({}, record.qty), {}, {
              shift2: e.target.value
            }));
          },
          style: styles.shiftInput
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "number",
          placeholder: "S3",
          value: ((_record$qty6 = record.qty) === null || _record$qty6 === void 0 ? void 0 : _record$qty6.shift3) || "",
          onChange: function onChange(e) {
            return handleDayWiseChange(dayName, recordIndex, "qty", _objectSpread(_objectSpread({}, record.qty), {}, {
              shift3: e.target.value
            }));
          },
          style: styles.shiftInput
        })) : field === "plantCode" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "text",
          value: record.plantCode || "",
          onChange: function onChange(e) {
            return handleDayWiseChange(dayName, recordIndex, "plantCode", e.target.value);
          },
          style: styles.compactInput,
          placeholder: window.innerWidth >= 768 ? "Plant Code" : "Plant"
        }) : field === "section" || field === "grade" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "text",
          value: record[field] || "",
          readOnly: true,
          style: _objectSpread(_objectSpread({}, styles.compactInput), {}, {
            backgroundColor: "#f8f9fa",
            color: "#6c757d"
          }),
          placeholder: field === "section" ? "Section" : "Grade"
        }) :
        // Modal table mein ye part find karein (around line 800+):
        field === "pressId" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
          value: record.pressId || "",
          onChange: function onChange(e) {
            return handleDayWiseChange(dayName, recordIndex, "pressId", e.target.value);
          },
          style: styles.compactSelect
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
          value: ""
        }, "Select Press"), (_record$pressOptions = record.pressOptions) === null || _record$pressOptions === void 0 ? void 0 : _record$pressOptions.map(function (press, idx) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
            key: "dynamic-".concat(idx),
            value: press
          }, press);
        }), (_masterData$presses = masterData.presses) === null || _masterData$presses === void 0 ? void 0 : (_masterData$presses$f = _masterData$presses.filter(function (press) {
          var _record$pressOptions2;
          return !((_record$pressOptions2 = record.pressOptions) !== null && _record$pressOptions2 !== void 0 && _record$pressOptions2.includes(press.id));
        })) === null || _masterData$presses$f === void 0 ? void 0 : _masterData$presses$f.map(function (press) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
            key: press.id,
            value: press.id
          }, press.name);
        })) : field === "customer_name" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
          value: record.customer_name || "",
          onChange: function onChange(e) {
            return handleDayWiseChange(dayName, recordIndex, "customer_name", e.target.value);
          },
          style: styles.compactSelect
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
          value: "",
          disabled: true
        }, window.innerWidth >= 768 ? "Select Customer" : "Customer"), (record.customer_nameOptions || masterData.customer_names.map(function (c) {
          return c.name;
        })).map(function (cust, idx) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
            key: idx,
            value: cust
          }, window.innerWidth >= 768 ? cust : cust.length > 15 ? cust.substring(0, 15) + "..." : cust);
        })) : field === "dieRequired" || field === "rmStatus" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "text",
          value: (_record$field = record[field]) !== null && _record$field !== void 0 ? _record$field : "",
          readOnly: true,
          style: _objectSpread(_objectSpread({}, styles.compactInput), {}, {
            backgroundColor: "#f8f9fa",
            color: "#6c757d"
          }),
          placeholder: field === "dieRequired" ? window.innerWidth >= 768 ? "Die Req" : "Die" : window.innerWidth >= 768 ? "RM Status" : "RM"
        }) : field === "prodTonn" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "number",
          value: record.prodTonn || "",
          readOnly: true,
          style: _objectSpread(_objectSpread({}, styles.compactInput), {}, {
            backgroundColor: "#f8f9fa",
            color: "#6c757d"
          }),
          placeholder: window.innerWidth >= 768 ? "Production Tonnage" : "Prod"
        }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: ["qty", "netWt"].includes(field) ? "number" : "text",
          value: record[field] || "",
          onChange: function onChange(e) {
            return handleDayWiseChange(dayName, recordIndex, field, e.target.value);
          },
          style: styles.compactInput,
          placeholder: window.innerWidth >= 768 ? field === "productionOrderNo" ? "Production Order No." : field === "netWt" ? "Net Weight" : field === "heatCode" ? "Heat Code" : field === "remark" ? "Remark" : FIELD_LABELS[field] : field === "productionOrderNo" ? "Prod Order" : field === "netWt" ? "Weight" : field === "heatCode" ? "Heat" : field === "remark" ? "Remark" : FIELD_LABELS[field].substring(0, 8)
        }));
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
        style: styles.modalTableCell
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        style: styles.actionButtons
      }, recordIndex === dayWiseData[dayName].length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        onClick: function onClick() {
          return addNewRowForDay(dayName);
        },
        style: _objectSpread(_objectSpread({}, styles.smallButton), {}, {
          background: "#28a745",
          color: "white"
        })
      }, window.innerWidth >= 768 ? "+ Add" : "+"), dayWiseData[dayName].length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        onClick: function onClick() {
          return removeRowFromDay(dayName, recordIndex);
        },
        style: _objectSpread(_objectSpread({}, styles.smallButton), {}, {
          background: "#dc3545",
          color: "white"
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
        size: window.innerWidth >= 768 ? 10 : 8
      })))));
    });
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: styles.modalFooter
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: closeModal,
    style: _objectSpread(_objectSpread({}, styles.modalFooterButton), {}, {
      backgroundColor: "#6c757d",
      color: "white",
      borderColor: "#6c757d"
    })
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: handleSavePlan,
    disabled: loading,
    style: _objectSpread(_objectSpread({}, styles.modalFooterButton), {}, {
      backgroundColor: loading ? "#6c757d" : "#28a745",
      borderColor: loading ? "#6c757d" : "#28a745",
      color: "white"
    })
  }, loading ? "Saving..." : window.innerWidth >= 768 ? "Save Plan" : "Save")))), !showModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WeeklyPlanDisplay__WEBPACK_IMPORTED_MODULE_1__["default"], {
    weekTitle: getWeekTitle(weekOffset),
    weekStatus: getWeekStatus(weekOffset),
    weekDates: getWeekDates(weekOffset),
    submittedPlans: plans,
    onEditPlan: function onEditPlan(dayName, index, record) {
      // optional: open modal + pre-fill data if needed
      setModalWeekOffset(weekOffset);
      setShowModal(true);
    },
    onDeletePlan: function onDeletePlan(dayName, index, record) {
      // optional: handle delete functionality
      console.log("Delete", dayName, index, record);
    },
    onOpenPlanModal: openModal
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SmartWeeklyPlanChatbot__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WeeklyPlan);

/***/ }),

/***/ "./src/components/WeeklyPlanDisplay.jsx":
/*!**********************************************!*\
  !*** ./src/components/WeeklyPlanDisplay.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/save.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var _WeeklyPlanDisplay_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WeeklyPlanDisplay.css */ "./src/components/WeeklyPlanDisplay.css");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




// Function to safely convert string to integer
var safeParseInt = function safeParseInt(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }
  var parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};
var calculateProdTonn = function calculateProdTonn(shift1, shift2, shift3, netWt) {
  var s1 = safeParseInt(shift1);
  var s2 = safeParseInt(shift2);
  var s3 = safeParseInt(shift3);
  var net = safeParseFloat(netWt);
  var total = (s1 + s2 + s3) * net / 1000;
  return Number(total.toFixed(2));
};

// Function to safely convert string to float
var safeParseFloat = function safeParseFloat(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }
  var parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Function to safely convert to string
var safeParseString = function safeParseString(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return String(value).trim();
};

// Function to validate form data
var validateFormData = function validateFormData(formData) {
  var errors = [];

  // Required string fields
  if (!safeParseString(formData.prod_order)) {
    errors.push("Production Order is required");
  }

  // Numeric validations
  var plantCode = safeParseInt(formData.plant_code);
  if (plantCode <= 0) {
    errors.push("Plant Code must be a positive number");
  }
  var prodTonn = safeParseFloat(formData.prod_tonn);
  if (prodTonn < 0) {
    errors.push("Production Tonnage cannot be negative");
  }

  // Quantity validations
  var shift1 = safeParseInt(formData.shift1_qty);
  var shift2 = safeParseInt(formData.shift2_qty);
  var shift3 = safeParseInt(formData.shift3_qty);
  if (shift1 < 0 || shift2 < 0 || shift3 < 0) {
    errors.push("Shift quantities cannot be negative");
  }
  return errors;
};

// Function to map API data to component format
var mapApiDataToComponentFormat = function mapApiDataToComponentFormat(apiData) {
  return apiData.map(function (item, index) {
    var _item$dies_req;
    return {
      plantCode: item.plant_code || "",
      productionOrderNo: item.main_prod_no || "",
      prod_order: item.main_prod_no || "",
      pressId: item.main_forge_press || "",
      main_forge_press: item.main_forge_press || "",
      customer: item.customer_name || "",
      netWt: item.week_net_tonn || 0,
      dieNo: item.week_die_no || "",
      qty: formatQuantity(item.shift1_qty, item.shift2_qty, item.shift3_qty),
      shift1Qty: item.shift1_qty || 0,
      shift2Qty: item.shift2_qty || 0,
      shift3Qty: item.shift3_qty || 0,
      prodTonn: calculateProdTonn(item.shift1_qty || 0, item.shift2_qty || 0, item.shift3_qty || 0, item.week_net_tonn || 0),
      section: item.week_section || "",
      grade: item.rm_grade || "",
      dieRequired: (_item$dies_req = item.dies_req) !== null && _item$dies_req !== void 0 ? _item$dies_req : "",
      rmStatus: item.rm_status || "",
      heatCode: item.heat_code || "",
      remark: item.remark || "",
      date: item.week_prod_date,
      rawData: item,
      id: item.id || "".concat(item.main_prod_no, "-").concat(item.week_prod_date, "-").concat(index)
    };
  });
};

// ✅ Keep only one most recent entry per day
var filterLatestPerDay = function filterLatestPerDay(data) {
  var latestByDay = {};
  data.forEach(function (item) {
    var dateKey = new Date(item.week_prod_date).toDateString();
    if (!latestByDay[dateKey]) {
      latestByDay[dateKey] = item;
    } else {
      var _item$id, _latestByDay$dateKey$;
      if (((_item$id = item.id) !== null && _item$id !== void 0 ? _item$id : 0) > ((_latestByDay$dateKey$ = latestByDay[dateKey].id) !== null && _latestByDay$dateKey$ !== void 0 ? _latestByDay$dateKey$ : 0)) {
        latestByDay[dateKey] = item;
      }
    }
  });
  return Object.values(latestByDay);
};

// Function to format quantity display
var formatQuantity = function formatQuantity(shift1, shift2, shift3) {
  var s1 = shift1 !== null && shift1 !== undefined ? shift1 : 0;
  var s2 = shift2 !== null && shift2 !== undefined ? shift2 : 0;
  var s3 = shift3 !== null && shift3 !== undefined ? shift3 : 0;
  return "".concat(s1, ", ").concat(s2, ", ").concat(s3);
};
// Deduplicate by production order or die number (keep latest entry)
var deduplicateLatest = function deduplicateLatest(data) {
  var uniqueMap = new Map();
  data.forEach(function (item) {
    var key = "".concat(item.main_prod_no, "-").concat(item.week_prod_date); // ← यहाँ duplicate filter हो रहा है
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    } else {
      var _item$id2, _existing$id;
      var existing = uniqueMap.get(key);
      if (((_item$id2 = item.id) !== null && _item$id2 !== void 0 ? _item$id2 : 0) > ((_existing$id = existing.id) !== null && _existing$id !== void 0 ? _existing$id : 0)) {
        uniqueMap.set(key, item);
      }
    }
  });
  return Array.from(uniqueMap.values());
};
// Function to group data by day of week
var groupDataByDay = function groupDataByDay(mappedData) {
  var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var grouped = {};

  // Initialize all working days
  workingDays.forEach(function (day) {
    grouped[day] = [];
  });
  mappedData.forEach(function (item) {
    var date = new Date(item.date);
    var dayName = dayNames[date.getDay()];
    console.log("\uD83D\uDCC5 Processing item: ".concat(item.prod_order, ", Date: ").concat(item.date, ", Day: ").concat(dayName));
    if (workingDays.includes(dayName)) {
      grouped[dayName].push(_objectSpread(_objectSpread({}, item), {}, {
        dayLabel: "".concat(dayName, " (").concat(date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short"
        }), ")")
      }));
    }
  });
  console.log("📊 Final grouped data:", grouped);
  return grouped;
};

// Function to get date range for week title
var getWeekDateRange = function getWeekDateRange(apiData) {
  if (!apiData.length) return "Loading...";
  var dates = apiData.map(function (item) {
    return new Date(item.week_prod_date);
  });
  var minDate = new Date(Math.min.apply(Math, _toConsumableArray(dates)));
  var maxDate = new Date(Math.max.apply(Math, _toConsumableArray(dates)));
  var formatDate = function formatDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
  return "".concat(formatDate(minDate), " - ").concat(formatDate(maxDate));
};
var WeeklyPlanDisplay = function WeeklyPlanDisplay() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    apiData = _useState2[0],
    setApiData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState8 = _slicedToArray(_useState7, 2),
    groupedPlans = _useState8[0],
    setGroupedPlans = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Loading..."),
    _useState10 = _slicedToArray(_useState9, 2),
    weekTitle = _useState10[0],
    setWeekTitle = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    editingRow = _useState12[0],
    setEditingRow = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState14 = _slicedToArray(_useState13, 2),
    editFormData = _useState14[0],
    setEditFormData = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      type: "",
      text: ""
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    message = _useState16[0],
    setMessage = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    saving = _useState18[0],
    setSaving = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    validationErrors = _useState20[0],
    setValidationErrors = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState22 = _slicedToArray(_useState21, 2),
    dieOptions = _useState22[0],
    setDieOptions = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    showDieOptions = _useState24[0],
    setShowDieOptions = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState26 = _slicedToArray(_useState25, 2),
    matchingDieOptions = _useState26[0],
    setMatchingDieOptions = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState28 = _slicedToArray(_useState27, 2),
    startDate = _useState28[0],
    setStartDate = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState30 = _slicedToArray(_useState29, 2),
    endDate = _useState30[0],
    setEndDate = _useState30[1];
  var _useState31 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState32 = _slicedToArray(_useState31, 2),
    searchText = _useState32[0],
    setSearchText = _useState32[1];
  var _useState33 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState34 = _slicedToArray(_useState33, 2),
    forgeLines = _useState34[0],
    setForgeLines = _useState34[1];
  var getCookie = function getCookie(name) {
    var value = "; ".concat(document.cookie);
    var parts = value.split("; ".concat(name, "="));
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  var getAuthHeadersWithCSRF = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var method,
        contentType,
        credentials,
        csrfToken,
        headers,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            method = _args.length > 0 && _args[0] !== undefined ? _args[0] : "GET";
            contentType = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
            credentials = btoa("PPC_User:Ppcuser@1234"); // Step 1: Trigger cookie set
            _context.next = 5;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan", {
              method: "GET",
              headers: {
                Authorization: "Basic ".concat(credentials)
              },
              credentials: "include"
            });
          case 5:
            csrfToken = getCookie("CSRFToken");
            console.log("Fetched CSRF Token from cookie:", csrfToken);
            if (csrfToken) {
              _context.next = 9;
              break;
            }
            throw new Error("CSRF token not found in cookies.");
          case 9:
            headers = {
              Authorization: "Basic ".concat(credentials),
              "X-CSRF-Token": csrfToken
            };
            if (contentType) {
              headers["Content-Type"] = "application/json";
            }
            return _context.abrupt("return", {
              headers: headers,
              credentials: "include"
            });
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getAuthHeadersWithCSRF() {
      return _ref.apply(this, arguments);
    };
  }();

  // ✅ FIXED: Add date validation in formatDate function
  var fetchWeeklyPlan = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(start, end) {
      var formatDate, formattedStart, formattedEnd, query, apiUrl, response, errorText, data, mappedData, grouped;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            setLoading(true);
            setError(null);
            formatDate = function formatDate(date) {
              if (!date) {
                console.error("❌ Date is null/undefined:", date);
                return new Date().toISOString().split("T")[0] + "T00:00:00";
              }
              var dateObj = date instanceof Date ? date : new Date(date);
              if (isNaN(dateObj.getTime())) {
                console.error("❌ Invalid date:", date);
                return new Date().toISOString().split("T")[0] + "T00:00:00";
              }
              return dateObj.toISOString().split("T")[0] + "T00:00:00";
            };
            if (!(!start || !end)) {
              _context2.next = 7;
              break;
            }
            console.error("❌ Start or end date is missing:", {
              start: start,
              end: end
            });
            throw new Error("Start and end dates are required");
          case 7:
            formattedStart = formatDate(start);
            formattedEnd = formatDate(end);
            query = "start_date=".concat(formattedStart, "&end_date=").concat(formattedEnd);
            apiUrl = "https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan?".concat(query);
            console.log("📡 API Call →", apiUrl);
            console.log("📅 Date Range:", formattedStart, "to", formattedEnd);
            _context2.next = 15;
            return fetch(apiUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic ".concat(btoa("PPC_User:Ppcuser@1234"))
              }
            });
          case 15:
            response = _context2.sent;
            if (response.ok) {
              _context2.next = 22;
              break;
            }
            _context2.next = 19;
            return response.text();
          case 19:
            errorText = _context2.sent;
            console.error("❌ API Error Response:", errorText);
            throw new Error("HTTP error! status: ".concat(response.status, " - ").concat(errorText));
          case 22:
            _context2.next = 24;
            return response.json();
          case 24:
            data = _context2.sent;
            console.log("✅ API Response received:", (data === null || data === void 0 ? void 0 : data.length) || 0, "records");
            console.log("📊 Raw API Data:", data);

            // Process the data - remove duplicate filtering for now to see all data
            mappedData = mapApiDataToComponentFormat(data);
            console.log("🔄 Mapped Data:", mappedData);
            grouped = groupDataByDay(mappedData);
            console.log("📊 Grouped Data:", grouped);
            setGroupedPlans(grouped);
            setApiData(data);
            setWeekTitle(getWeekDateRange(data));
            _context2.next = 40;
            break;
          case 36:
            _context2.prev = 36;
            _context2.t0 = _context2["catch"](0);
            console.error("❌ Error fetching weekly plan:", _context2.t0);
            setError("Failed to load weekly plan: ".concat(_context2.t0.message));
          case 40:
            _context2.prev = 40;
            setLoading(false);
            return _context2.finish(40);
          case 43:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 36, 40, 43]]);
    }));
    return function fetchWeeklyPlan(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var getMonday = function getMonday(date) {
    if (!date) {
      console.error("❌ getMonday: date is null/undefined");
      return new Date();
    }
    var d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error("❌ getMonday: invalid date:", date);
      return new Date();
    }
    var day = d.getDay();
    var diff = day === 0 ? -6 : 1 - day; // Sunday => previous Monday
    d.setDate(d.getDate() + diff);
    return d;
  };
  var handleWeekChange = function handleWeekChange(direction) {
    try {
      // ✅ Ensure startDate is a valid Date object
      var currentStart = startDate instanceof Date ? startDate : new Date(startDate);
      if (isNaN(currentStart.getTime())) {
        console.error("❌ Invalid startDate:", startDate);
        // Reset to current week if date is invalid
        var today = new Date();
        var _getWeekRange = getWeekRange(today),
          _getWeekRange2 = _slicedToArray(_getWeekRange, 2),
          monday = _getWeekRange2[0],
          saturday = _getWeekRange2[1];
        setStartDate(monday);
        setEndDate(saturday);
        fetchWeeklyPlan(monday, saturday);
        return;
      }
      var baseDate = new Date(currentStart);
      baseDate.setDate(baseDate.getDate() + direction * 7); // +7 days for next, -7 for prev

      var newStart = getMonday(baseDate);
      var newEnd = new Date(newStart);
      newEnd.setDate(newStart.getDate() + 5); // Monday + 5 = Saturday

      console.log("📅 Week navigation:", {
        direction: direction,
        currentStart: currentStart.toISOString(),
        newStart: newStart.toISOString(),
        newEnd: newEnd.toISOString()
      });
      setStartDate(newStart);
      setEndDate(newEnd);
      fetchWeeklyPlan(newStart, newEnd);
    } catch (error) {
      console.error("❌ Error in handleWeekChange:", error);
      setError("Failed to change week: ".concat(error.message));
    }
  };
  var getWeekRange = function getWeekRange(date) {
    if (!date) {
      console.error("❌ getWeekRange: date is null/undefined");
      var today = new Date();
      return [today, today];
    }
    var d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error("❌ getWeekRange: invalid date:", date);
      var _today = new Date();
      return [_today, _today];
    }
    var day = d.getDay();
    var diffToMonday = day === 0 ? -6 : 1 - day;
    var monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);
    var saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 5);
    return [monday, saturday];
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var fetchForgeLines = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var res, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/forge_lines", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(btoa("PPC_User:Ppcuser@1234"))
                }
              });
            case 3:
              res = _context3.sent;
              _context3.next = 6;
              return res.json();
            case 6:
              data = _context3.sent;
              if (Array.isArray(data) && data.length > 0) {
                setForgeLines(data[0].forge_lines || []);
                console.log("✅ Forge lines loaded:", data[0].forge_lines);
              }
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.error("❌ Failed to fetch forge lines:", _context3.t0);
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 10]]);
      }));
      return function fetchForgeLines() {
        return _ref3.apply(this, arguments);
      };
    }();
    try {
      var today = new Date();
      console.log("📅 Initializing with today:", today.toISOString());
      var _getWeekRange3 = getWeekRange(today),
        _getWeekRange4 = _slicedToArray(_getWeekRange3, 2),
        monday = _getWeekRange4[0],
        saturday = _getWeekRange4[1];
      console.log("📅 Initial week range:", {
        monday: monday.toISOString(),
        saturday: saturday.toISOString()
      });
      setStartDate(monday);
      setEndDate(saturday);
      fetchWeeklyPlan(monday, saturday);
      fetchForgeLines(); // 👈 Add this call
    } catch (error) {
      console.error("Error in useEffect initialization:", error);
      setError("Failed to initialize: ".concat(error.message));
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var today = new Date();
    var _getWeekRange5 = getWeekRange(today),
      _getWeekRange6 = _slicedToArray(_getWeekRange5, 2),
      monday = _getWeekRange6[0],
      saturday = _getWeekRange6[1];
    setStartDate(monday);
    setEndDate(saturday);
    fetchWeeklyPlan(monday, saturday);
  }, []);

  // Handle edit button click
  var handleEditClick = function handleEditClick(dayName, planIndex, plan) {
    var rowKey = "".concat(dayName, "-").concat(planIndex);
    setEditingRow(rowKey);
    setValidationErrors([]);
    var raw = plan.rawData || {};
    setEditFormData({
      prod_order: raw.main_prod_no || "",
      die_no: raw.week_die_no || "",
      plant_code: raw.plant_code || "",
      main_forge_press: raw.main_forge_press || "",
      forge_press: raw.main_forge_press || "",
      customer: raw.customer_name || "",
      shift1_qty: raw.shift1_qty || 0,
      // ✅ Fixed: These should show values now
      shift2_qty: raw.shift2_qty || 0,
      shift3_qty: raw.shift3_qty || 0,
      netWt: raw.week_net_tonn || 0,
      prod_tonn: calculateProdTonn(raw.shift1_qty || 0,
      // ✅ Calculate from actual API values
      raw.shift2_qty || 0, raw.shift3_qty || 0, raw.week_net_tonn || 0),
      section: raw.week_section || "",
      rm_grade: raw.rm_grade || "",
      die_req: raw.dies_req || 0,
      rm_status: raw.rm_status || "",
      heat_code: raw.heat_code || "",
      remark: raw.remark || ""
    });
  };
  var handleFieldChange = function handleFieldChange(field, value) {
    // 1. Update the field
    setEditFormData(function (prev) {
      var updated = _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, value));

      // 2. Re-calculate prod_tonn if any shift changes
      if (["shift1_qty", "shift2_qty", "shift3_qty", "netWt"].includes(field)) {
        var shift1 = field === "shift1_qty" ? Number(value) || 0 : Number(updated.shift1_qty) || 0;
        var shift2 = field === "shift2_qty" ? Number(value) || 0 : Number(updated.shift2_qty) || 0;
        var shift3 = field === "shift3_qty" ? Number(value) || 0 : Number(updated.shift3_qty) || 0;
        var netWt = field === "netWt" ? Number(value) || 0 : Number(updated.netWt) || 0;
        updated.prod_tonn = calculateProdTonn(shift1, shift2, shift3, netWt);
      }
      return updated;
    });

    // 3. Clear validation errors on any change
    if (validationErrors.length) setValidationErrors([]);
  };
  var renderWeekHeader = function renderWeekHeader() {
    var formatWeekDisplay = function formatWeekDisplay(start, end) {
      try {
        if (!start || !end) return "Loading...";
        var _startDate = start instanceof Date ? start : new Date(start);
        var _endDate = end instanceof Date ? end : new Date(end);
        if (isNaN(_startDate.getTime()) || isNaN(_endDate.getTime())) {
          return "Invalid Date Range";
        }
        var formatDate = function formatDate(date) {
          return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          });
        };
        return "".concat(formatDate(_startDate), " - ").concat(formatDate(_endDate));
      } catch (error) {
        console.error("❌ Error formatting week display:", error);
        return "Error in Date Display";
      }
    };
  };

  // Handle save
  var handleSave = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(dayName, planIndex, originalPlan) {
      var errors, updateData, options, response, errorText;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            setSaving(true);
            setMessage({
              type: "",
              text: ""
            });
            setValidationErrors([]);

            // Validate form data
            errors = validateFormData(editFormData);
            if (!(errors.length > 0)) {
              _context4.next = 9;
              break;
            }
            setValidationErrors(errors);
            setSaving(false);
            return _context4.abrupt("return");
          case 9:
            // Prepare data for API with proper data types
            // const updateData = {
            //   id: originalPlan.id,
            //   prod_order: safeParseString(editFormData.prod_order),
            //   die_no: safeParseString(editFormData.die_no),
            //   plant_code: safeParseInt(editFormData.plant_code, 0),
            //   main_forge_press: safeParseString(editFormData.main_forge_press),
            //   forge_press: safeParseString(editFormData.forge_press),
            //   customer: safeParseString(editFormData.customer),
            //   shift1_qty: safeParseInt(editFormData.shift1_qty, 0),
            //   shift2_qty: safeParseInt(editFormData.shift2_qty, 0),
            //   shift3_qty: safeParseInt(editFormData.shift3_qty, 0),
            //   prod_tonn: safeParseFloat(editFormData.prod_tonn, 0),
            //   section: safeParseInt(editFormData.section, 0),
            //   rm_grade: safeParseString(editFormData.rm_grade),
            //   die_req: safeParseInt(editFormData.die_req, 0),
            //   rm_status: safeParseString(editFormData.rm_status),
            //   heat_code: safeParseString(editFormData.heat_code),
            //   remark: safeParseString(editFormData.remark),
            // };
            updateData = {
              main_prod_no: safeParseString(editFormData.prod_order),
              main_forge_press: safeParseString(editFormData.main_forge_press || editFormData.forge_press),
              week_die_no: safeParseString(editFormData.die_no),
              week_net_tonn: safeParseFloat(editFormData.netWt),
              shift1_qty: safeParseInt(editFormData.shift1_qty),
              shift2_qty: safeParseInt(editFormData.shift2_qty),
              shift3_qty: safeParseInt(editFormData.shift3_qty),
              week_section: safeParseFloat(editFormData.section),
              rm_grade: safeParseString(editFormData.rm_grade),
              dies_req: safeParseInt(editFormData.die_req),
              rm_status: safeParseString(editFormData.rm_status),
              heat_code: safeParseString(editFormData.heat_code),
              remark: safeParseString(editFormData.remark),
              customer_name: safeParseString(editFormData.customer),
              plant_code: safeParseInt(editFormData.plant_code),
              week_prod_date: originalPlan.date,
              // 🔥 This is the date from the selected row
              old_prod_no: originalPlan.prod_order
            };
            console.log("Sending data to API:", updateData);
            _context4.next = 13;
            return getAuthHeadersWithCSRF("PUT");
          case 13:
            options = _context4.sent;
            _context4.next = 16;
            return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan", _objectSpread(_objectSpread({}, options), {}, {
              method: "PUT",
              body: JSON.stringify(updateData)
            }));
          case 16:
            response = _context4.sent;
            if (response.ok) {
              _context4.next = 22;
              break;
            }
            _context4.next = 20;
            return response.text();
          case 20:
            errorText = _context4.sent;
            throw new Error("Failed to update: ".concat(response.status, " - ").concat(errorText));
          case 22:
            _context4.next = 24;
            return fetchWeeklyPlan(startDate, endDate);
          case 24:
            setEditingRow(null);
            setEditFormData({});
            setMessage({
              type: "success",
              text: "Plan updated successfully!"
            });

            // Clear message after 3 seconds
            setTimeout(function () {
              setMessage({
                type: "",
                text: ""
              });
            }, 3000);
            _context4.next = 35;
            break;
          case 30:
            _context4.prev = 30;
            _context4.t0 = _context4["catch"](0);
            console.error("Error updating plan:", _context4.t0);
            setMessage({
              type: "error",
              text: "Failed to update plan: ".concat(_context4.t0.message)
            });

            // Clear error message after 5 seconds
            setTimeout(function () {
              setMessage({
                type: "",
                text: ""
              });
            }, 5000);
          case 35:
            _context4.prev = 35;
            setSaving(false);
            return _context4.finish(35);
          case 38:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 30, 35, 38]]);
    }));
    return function handleSave(_x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  // Handle cancel
  var handleCancel = function handleCancel() {
    setEditingRow(null);
    setEditFormData({});
    setValidationErrors([]);
  };
  var editableFields = ["die_no", "main_forge_press", "customer", "prod_order", "heat_code", "remark", "shift1_qty",
  // ✅ These are editable
  "shift2_qty", "shift3_qty"];
  // useEffect(() => {
  //   const dieNo = editFormData.die_no;
  //   if (!dieNo || !dieNo.trim() || !editingRow) return;

  //   const fetchDieDetails = async () => {
  //     try {
  //       const res = await fetch(
  //         `https://ktfrancesrv2.kalyanicorp.com/https://ktfrancesrv2.kalyanicorp.com/internal/weekly_entry?die_no=${encodeURIComponent(
  //           dieNo
  //         )}`
  //       );
  //       const data = await res.json();
  //       if (!Array.isArray(data) || data.length === 0) return;

  //       const first = data[0];
  //       setEditFormData((prev) => ({
  //         ...prev,
  //         plant_code: first.plant_code ?? prev.plant_code,
  //         forge_press: first.main_forge_press ?? prev.forge_press,
  //         customer: first.customer_name ?? prev.customer,
  //         prod_order: first.main_prod_no ?? prev.prod_order,
  //         netWt: first.net_wt ?? prev.netWt,
  //         section: first.week_section ?? prev.section,
  //         rm_grade: first.rm_grade ?? prev.rm_grade,
  //         die_req: first.die_req ?? prev.die_req,
  //         rm_status: first.rm_status ?? prev.rm_status,
  //         heat_code: first.heat_code ?? prev.heat_code,
  //         remark: first.remark ?? prev.remark,
  //         prod_tonn: calculateProdTonn(
  //           prev.shift1_qty || 0,
  //           prev.shift2_qty || 0,
  //           prev.shift3_qty || 0,
  //           first.net_wt ?? prev.netWt
  //         ),
  //       }));
  //       setMatchingDieOptions(data.length > 1 ? data : []);
  //     } catch (e) {
  //       console.error("Die fetch error:", e);
  //       setMatchingDieOptions([]);
  //     }
  //   };

  //   fetchDieDetails();
  // }, [editFormData.die_no, editingRow]);

  // General field renderer for editable and static view

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var dieNo = editFormData.die_no;
    console.log("🔍 Die number changed:", dieNo);
    console.log("🔍 Current editing row:", editingRow);
    console.log("📝 Current editFormData:", editFormData);
    if (!dieNo || !dieNo.trim() || !editingRow) {
      console.log("❌ Skipping fetch - missing die_no or editingRow");
      return;
    }
    var fetchDieDetails = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var res, data, first;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              console.log("📡 Fetching die details for:", dieNo);
              _context5.next = 4;
              return fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_entry?die_no=".concat(encodeURIComponent(dieNo)), {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(btoa("PPC_User:Ppcuser@1234"))
                }
              });
            case 4:
              res = _context5.sent;
              _context5.next = 7;
              return res.json();
            case 7:
              data = _context5.sent;
              console.log("✅ API Response received:", data);
              if (!(!Array.isArray(data) || data.length === 0)) {
                _context5.next = 12;
                break;
              }
              console.log("❌ No data received from API");
              return _context5.abrupt("return");
            case 12:
              first = data[0];
              console.log("🎯 First item from API:", first);
              console.log("📝 Current form data before update:", editFormData);
              setEditFormData(function (prev) {
                var _first$plant_code, _first$forge_press, _first$forge_press2, _first$customer, _first$prod_order, _first$net_wt, _first$section, _first$rm_grade, _first$die_req, _first$rm_status, _first$heat_code, _first$remark, _first$net_wt2;
                var updated = _objectSpread(_objectSpread({}, prev), {}, {
                  plant_code: (_first$plant_code = first.plant_code) !== null && _first$plant_code !== void 0 ? _first$plant_code : prev.plant_code,
                  forge_press: (_first$forge_press = first.forge_press) !== null && _first$forge_press !== void 0 ? _first$forge_press : prev.forge_press,
                  // Updated: API has forge_press not main_forge_press
                  main_forge_press: (_first$forge_press2 = first.forge_press) !== null && _first$forge_press2 !== void 0 ? _first$forge_press2 : prev.main_forge_press,
                  // Keep both for compatibility
                  customer: (_first$customer = first.customer) !== null && _first$customer !== void 0 ? _first$customer : prev.customer,
                  // Updated: API has customer not customer_name
                  prod_order: (_first$prod_order = first.prod_order) !== null && _first$prod_order !== void 0 ? _first$prod_order : prev.prod_order,
                  // Updated: API has prod_order not main_prod_no
                  netWt: (_first$net_wt = first.net_wt) !== null && _first$net_wt !== void 0 ? _first$net_wt : prev.netWt,
                  section: (_first$section = first.section) !== null && _first$section !== void 0 ? _first$section : prev.section,
                  // Updated: API has section not week_section
                  rm_grade: (_first$rm_grade = first.rm_grade) !== null && _first$rm_grade !== void 0 ? _first$rm_grade : prev.rm_grade,
                  die_req: (_first$die_req = first.die_req) !== null && _first$die_req !== void 0 ? _first$die_req : prev.die_req,
                  rm_status: (_first$rm_status = first.rm_status) !== null && _first$rm_status !== void 0 ? _first$rm_status : prev.rm_status,
                  heat_code: (_first$heat_code = first.heat_code) !== null && _first$heat_code !== void 0 ? _first$heat_code : prev.heat_code,
                  remark: (_first$remark = first.remark) !== null && _first$remark !== void 0 ? _first$remark : prev.remark,
                  prod_tonn: calculateProdTonn(prev.shift1_qty || 0, prev.shift2_qty || 0, prev.shift3_qty || 0, (_first$net_wt2 = first.net_wt) !== null && _first$net_wt2 !== void 0 ? _first$net_wt2 : prev.netWt)
                });
                console.log("🔄 Updated form data:", updated);
                return updated;
              });
              setMatchingDieOptions(data.length > 1 ? data : []);
              console.log("✅ Form data updated successfully");
              _context5.next = 24;
              break;
            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](0);
              console.error("❌ Die fetch error:", _context5.t0);
              setMatchingDieOptions([]);
            case 24:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 20]]);
      }));
      return function fetchDieDetails() {
        return _ref5.apply(this, arguments);
      };
    }();
    fetchDieDetails();
  }, [editFormData.die_no, editingRow]);
  var renderValue = function renderValue(value, field, isEditing, rowKey) {
    // const isEditableField = editableFields.includes(field);

    if (isEditing && editingRow === rowKey && editableFields.includes(field)) {
      var inputType = ["shift1_qty", "shift2_qty", "shift3_qty", "plant_code", "netWt"].includes(field) ? "number" : "text";
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: inputType,
        className: "edit-input",
        value: editFormData[field] !== undefined ? editFormData[field] : "",
        onChange: function onChange(e) {
          return handleFieldChange(field, e.target.value);
        },
        placeholder: "Enter ".concat(field),
        step: field === "netWt" ? "0.01" : "1" // Allow decimals for netWt
      });
    }

    // If value is null/undefined/empty, show N/A
    // 🔁 Pull from editFormData if editing
    if (isEditing && editingRow === rowKey) {
      var formValue = editFormData[field];
      if (formValue !== undefined && formValue !== null && formValue !== "") {
        return formValue.toString();
      }
    }

    // 👇 If nothing valid, show N/A
    if (value === null || value === undefined || value === "" || value === "N/A") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "na-value"
      }, "N/A");
    }

    // For numeric rounding fields like netWt, prodTonn
    if (["netWt", "prodTonn"].includes(field)) {
      var rounded = Math.round(Number(value));
      return isNaN(rounded) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "na-value"
      }, "N/A") : rounded.toString();
    }

    // Default text render
    return value.toString();
  };

  // Quantity field-specific rendering (like customer dropdown)
  var renderQuantityValue = function renderQuantityValue(plan, isEditing, rowKey, field) {
    var shouldRenderDropdown = isEditing && editingRow === rowKey && (matchingDieOptions.length > 0 && ["customer", "forge_press", "main_forge_press", "plant_code", "prod_order"].includes(field) || field === "main_forge_press" && forgeLines.length > 0);
    if (shouldRenderDropdown) {
      var labelMap = {
        customer: "Customer",
        forge_press: "Press",
        main_forge_press: "Press",
        plant_code: "Plant Code",
        prod_order: "Production Order"
      };

      // ✅ Render forge_lines dropdown if editing main_forge_press and forgeLines available
      if (isEditing && editingRow === rowKey && field === "main_forge_press" && forgeLines.length > 0) {
        // ✅ Include selected value even if not in forgeLines list
        var currentValue = editFormData[field];
        var dropdownOptions = forgeLines.includes(currentValue) ? forgeLines : [].concat(_toConsumableArray(forgeLines), [currentValue]); // add selected value if missing

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
          className: "edit-select",
          value: currentValue || "",
          onChange: function onChange(e) {
            return handleFieldChange(field, e.target.value);
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
          value: ""
        }, "Select Press"), dropdownOptions.map(function (line, idx) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
            key: idx,
            value: line
          }, line);
        }));
      }
      var uniqueOptions = _toConsumableArray(new Set(matchingDieOptions.map(function (item) {
        if (field === "prod_order") return item.main_prod_no;
        if (field === "forge_press" || field === "main_forge_press") return item.main_forge_press;
        if (field === "customer") return item.customer_name;
        return item[field];
      }))).filter(Boolean);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
        className: "edit-select",
        onChange: function onChange(e) {
          var selectedValue = e.target.value;
          var matched = matchingDieOptions.find(function (item) {
            if (field === "prod_order") return item.main_prod_no === selectedValue;
            if (field === "forge_press") return item.main_forge_press === selectedValue;
            if (field === "customer") return item.customer_name === selectedValue;
            return item[field] === selectedValue;
          });
          if (matched) {
            setEditFormData(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                die_no: matched.week_die_no || "",
                plant_code: matched.plant_code || "",
                forge_press: matched.main_forge_press || "",
                main_forge_press: matched.main_forge_press || "",
                customer: matched.customer_name || "",
                prod_order: matched.main_prod_no || "",
                prod_tonn: matched.week_net_tonn || "",
                section: matched.week_section || "",
                rm_grade: matched.rm_grade || "",
                die_req: matched.dies_req || 0,
                rm_status: matched.rm_status || "",
                heat_code: matched.heat_code || "",
                remark: ""
              });
            });
            setMatchingDieOptions([]);
          }
        },
        value: editFormData[field] || ""
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: ""
      }, "Select ", labelMap[field]), uniqueOptions.map(function (val, idx) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
          key: idx,
          value: val
        }, val);
      }));
    }

    // ✅ For shift fields & others: simple input (not dropdown)
    return isEditing && editingRow === rowKey ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: ["shift1_qty", "shift2_qty", "shift3_qty"].includes(field) ? "number" : "text",
      className: "edit-input",
      value: editFormData[field] || "",
      onChange: function onChange(e) {
        return handleFieldChange(field, e.target.value);
      },
      placeholder: "Enter value"
    }) : plan[field] !== undefined && plan[field] !== null && plan[field] !== "" ? plan[field].toString() : "N/A";
  };

  // ✅ Correct – wrap in function
  var renderQtyCell = function renderQtyCell(plan, isEditing, rowKey) {
    return renderValue(plan.qty, "qty", isEditing, rowKey);
  };

  // Updated renderTableRows function with better data handling
  var renderTableRows = function renderTableRows() {
    var workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var rows = [];
    var highlightMatch = function highlightMatch(text) {
      if (!searchText || typeof text !== "string") return text;
      var regex = new RegExp("(".concat(searchText, ")"), "gi");
      var parts = text.split(regex);
      return parts.map(function (part, i) {
        return regex.test(part) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("mark", {
          key: i
        }, part) : part;
      });
    };
    var isRowMatching = function isRowMatching(plan) {
      if (!searchText) return true;
      var valuesToCheck = [plan.plantCode, plan.prod_order, plan.main_forge_press, plan.customer, plan.netWt, plan.dieNo, plan.shift1Qty, plan.shift2Qty, plan.shift3Qty, plan.prodTonn, plan.section, plan.grade, plan.dieRequired, plan.rmStatus, plan.heatCode, plan.remark];
      return valuesToCheck.join(" ").toLowerCase().includes(searchText.toLowerCase());
    };
    workingDays.forEach(function (dayName) {
      var dayPlans = groupedPlans[dayName] || [];
      var filteredPlans = dayPlans.filter(function (plan) {
        return isRowMatching(plan);
      });
      console.log("\uD83D\uDCCA ".concat(dayName, " plans:"), filteredPlans.length);
      if (filteredPlans.length === 0) return;
      filteredPlans.forEach(function (plan, planIndex) {
        var rowKey = "".concat(dayName, "-").concat(planIndex);
        var isEditing = editingRow === rowKey;
        rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
          key: rowKey,
          className: isEditing ? "editing-row" : ""
        }, planIndex === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td weekly-day-cell",
          rowSpan: filteredPlans.length
        }, plan.dayLabel || dayName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.plantCode, "plant_code", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td max-ellipsis-90"
        }, renderQuantityValue(plan, isEditing, rowKey, "prod_order")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderQuantityValue(plan, isEditing, rowKey, "main_forge_press")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td customer-cell"
        }, renderQuantityValue(plan, isEditing, rowKey, "customer")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.netWt, "netWt", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.dieNo, "die_no", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td shift-cell"
        }, isEditing ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "shift-edit-container"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "shift-edit-item"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "S1:"), renderQuantityValue(plan, isEditing, rowKey, "shift1_qty")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "shift-edit-item"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "S2:"), renderQuantityValue(plan, isEditing, rowKey, "shift2_qty")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "shift-edit-item"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "S3:"), renderQuantityValue(plan, isEditing, rowKey, "shift3_qty"))) : "".concat(plan.shift1Qty || 0, ", ").concat(plan.shift2Qty || 0, ", ").concat(plan.shift3Qty || 0)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.prodTonn, "prod_tonn", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.section, "section", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.grade, "rm_grade", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.dieRequired, "die_req", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.rmStatus, "rm_status", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.heatCode, "heat_code", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td"
        }, renderValue(plan.remark, "remark", isEditing, rowKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
          className: "weekly-plan-td action-cell"
        }, isEditing ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "flex-gap-2"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          className: "action-btn save-btn",
          onClick: function onClick() {
            return handleSave(dayName, planIndex, plan);
          },
          disabled: saving
        }, saving ? "..." : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          size: 10
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          className: "action-btn cancel-btn",
          onClick: handleCancel,
          disabled: saving
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          size: 10
        }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          className: "action-btn",
          onClick: function onClick() {
            return handleEditClick(dayName, planIndex, plan);
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          size: 12
        })))));
      });
    });
    return rows;
  };

  // Loading state
  if (loading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "weekly-plan-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "loading-state"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "large-icon mb-10"
    }, "\u23F3"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "Loading Weekly Plan..."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Fetching data from server")));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "weekly-plan-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "week-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      return handleWeekChange(-1);
    },
    className: "week-nav-btn"
  }, "\u2190 Previous Week"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "week-title"
  }, "Weekly Plan Preview - ", weekTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      return handleWeekChange(1);
    },
    className: "week-nav-btn"
  }, "Next Week \u2192")), renderWeekHeader(), validationErrors.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "validation-error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Validation Errors:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "validation-list"
  }, validationErrors.map(function (error, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index
    }, error);
  }))), message.text && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: message.type === "success" ? "success-message" : "error-message"
  }, message.text), Object.values(groupedPlans).flat().length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "filter-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "\uD83D\uDD0D Search...",
    className: "search-input",
    value: searchText,
    onChange: function onChange(e) {
      return setSearchText(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "weekly-plan-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Day"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Plant Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th max-90"
  }, "Production Order No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Press"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Customer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Net Wt"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Die No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Qty (S1, S2, S3)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Prod Tonn"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Section"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Grade"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Die Required"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "RM Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Heat Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Remark"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "weekly-plan-th"
  }, "Action"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, renderTableRows()))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "no-plan-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No Plan Available for the selected date")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WeeklyPlanDisplay);

/***/ }),

/***/ "./src/containers/MainComponent.jsx":
/*!******************************************!*\
  !*** ./src/containers/MainComponent.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cs-web-components-base */ "cs-web-components-base");
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Dashboard */ "./src/components/Dashboard.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MainComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(MainComponent, _React$Component);
  var _super = _createSuper(MainComponent);
  function MainComponent() {
    _classCallCheck(this, MainComponent);
    return _super.apply(this, arguments);
  }
  _createClass(MainComponent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__.SinglePage, {
        frameComponent: cs_web_components_base__WEBPACK_IMPORTED_MODULE_1__.PageFrame.ApplicationFrame,
        pageContent: _components_Dashboard__WEBPACK_IMPORTED_MODULE_2__["default"]
      });
    }
  }]);
  return MainComponent;
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));


/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefixNS": () => (/* binding */ prefixNS)
/* harmony export */ });
function prefixNS(name) {
  return "".concat("kalyani-iot-ppc-forging", "-").concat(name);
}

/***/ }),

/***/ "./src/reducers/reducers.js":
/*!**********************************!*\
  !*** ./src/reducers/reducers.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/actions */ "./src/actions/actions.js");
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cs-web-components-base */ "cs-web-components-base");
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cs_web_components_base__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Reducer Template
 */




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable__WEBPACK_IMPORTED_MODULE_0___default().Map();
  var action = arguments.length > 1 ? arguments[1] : undefined;
  cs_web_components_base__WEBPACK_IMPORTED_MODULE_2__.Console.log('reducer got ', action.type);
  switch (action.type) {
    case _actions_actions__WEBPACK_IMPORTED_MODULE_1__.DATA_FETCH_SUCCESS:
      cs_web_components_base__WEBPACK_IMPORTED_MODULE_2__.Console.log('Reducing', action.payload);
      return state;
    case _actions_actions__WEBPACK_IMPORTED_MODULE_1__.DATA_FETCH_FAILURE:
      cs_web_components_base__WEBPACK_IMPORTED_MODULE_2__.Console.log('Reducing failed');
      return state;
    default:
      return state;
  }
}

/***/ }),

/***/ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/Dashboard.css":
/*!********************************************************************************************!*\
  !*** ../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/Dashboard.css ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* === Base === */\r\nbody {\r\n  font-family: 'Segoe UI', Roboto, sans-serif;\r\n  background: #f5f7fa;\r\n  margin: 0;\r\n  color: #1f2937;\r\n}\r\n\r\n.dashboard-container {\r\n  padding: 1.5rem;\r\n  min-height: 100vh;\r\n  background: linear-gradient(to bottom right, #f3f4f6, #e0e7ff);\r\n}\r\n\r\n.dashboard-content {\r\n  max-width: 1200px;\r\n  margin: 0 auto;\r\n}\r\n\r\n/* === Header === */\r\n.dashboard-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.dashboard-title {\r\n  font-size: 2rem;\r\n  font-weight: 700;\r\n  color: #0f172a;\r\n}\r\n\r\n.dashboard-subtitle {\r\n  color: #475569;\r\n  margin-top: 0.25rem;\r\n  font-size: 0.875rem;\r\n}\r\n\r\n.view-toggle {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.toggle-button {\r\n  padding: 0.5rem 1rem;\r\n  font-weight: 600;\r\n  border-radius: 0.375rem;\r\n  background-color: #e2e8f0;\r\n  color: #1e293b;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.toggle-button.active {\r\n  background-color: #1e3a8a;\r\n  color: #fff;\r\n}\r\n\r\n/* === KPI Grid === */\r\n.kpi-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n  gap: 1rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n/* === KPI & Press Cards === */\r\n.kpi-card {\r\n  background: #ffffff;\r\n  border: 1px solid #cbd5e1;\r\n  border-left: 5px solid #1e3a8a;\r\n  padding: 1rem;\r\n  border-radius: 0.5rem;\r\n  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.04);\r\n  transition: transform 0.2s ease;\r\n}\r\n\r\n.kpi-card:hover {\r\n  transform: translateY(-3px);\r\n}\r\n\r\n.kpi-title {\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n  color: #64748b;\r\n  text-transform: uppercase;\r\n  margin-bottom: 0.25rem;\r\n}\r\n\r\n.kpi-value {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  color: #0f172a;\r\n}\r\n\r\n.kpi-change {\r\n  font-size: 0.75rem;\r\n  color: #15803d;\r\n  margin-top: 0.25rem;\r\n}\r\n\r\n/* Progress bar */\r\n.kpi-progress-track {\r\n  margin-top: 0.75rem;\r\n  background-color: #e5e7eb;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n}\r\n\r\n.kpi-progress {\r\n  height: 6px;\r\n  border-radius: 3px;\r\n  background-color: #1e3a8a;\r\n  transition: width 0.3s ease-in-out;\r\n}\r\n\r\n/* === Press Summary Grid === */\r\n.press-summary-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\r\n  gap: 1rem;\r\n}\r\n\r\n/* Responsive Fixes */\r\n@media (max-width: 768px) {\r\n  .dashboard-header {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n  }\r\n\r\n  .view-toggle {\r\n    margin-top: 1rem;\r\n  }\r\n}\r\n.weekly-plan-view {\r\n  margin-top: 2rem;\r\n}\r\n\r\n.press-columns-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 1rem;\r\n}\r\n\r\n.weekly-plan-press {\r\n  flex: 1;\r\n  background: #fff;\r\n  border-radius: 8px;\r\n  padding: 1rem;\r\n  min-width: 300px;\r\n  box-shadow: 0 2px 5px rgba(0,0,0,0.05);\r\n}\r\n\r\n.weekly-plan-press table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.weekly-plan-press th, .weekly-plan-press td {\r\n  padding: 0.5rem;\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.weekly-plan-header, .press-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/components/Dashboard.css"],"names":[],"mappings":"AAAA,iBAAiB;AACjB;EACE,2CAA2C;EAC3C,mBAAmB;EACnB,SAAS;EACT,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,8DAA8D;AAChE;;AAEA;EACE,iBAAiB;EACjB,cAAc;AAChB;;AAEA,mBAAmB;AACnB;EACE,aAAa;EACb,8BAA8B;EAC9B,eAAe;EACf,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,uBAAuB;EACvB,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,yBAAyB;EACzB,WAAW;AACb;;AAEA,qBAAqB;AACrB;EACE,aAAa;EACb,2DAA2D;EAC3D,SAAS;EACT,qBAAqB;AACvB;;AAEA,8BAA8B;AAC9B;EACE,mBAAmB;EACnB,yBAAyB;EACzB,8BAA8B;EAC9B,aAAa;EACb,qBAAqB;EACrB,4CAA4C;EAC5C,+BAA+B;AACjC;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,yBAAyB;EACzB,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,mBAAmB;AACrB;;AAEA,iBAAiB;AACjB;EACE,mBAAmB;EACnB,yBAAyB;EACzB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,kCAAkC;AACpC;;AAEA,+BAA+B;AAC/B;EACE,aAAa;EACb,4DAA4D;EAC5D,SAAS;AACX;;AAEA,qBAAqB;AACrB;EACE;IACE,sBAAsB;IACtB,uBAAuB;EACzB;;EAEA;IACE,gBAAgB;EAClB;AACF;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,SAAS;AACX;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,gBAAgB;EAChB,sCAAsC;AACxC;;AAEA;EACE,WAAW;EACX,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB","sourcesContent":["/* === Base === */\r\nbody {\r\n  font-family: 'Segoe UI', Roboto, sans-serif;\r\n  background: #f5f7fa;\r\n  margin: 0;\r\n  color: #1f2937;\r\n}\r\n\r\n.dashboard-container {\r\n  padding: 1.5rem;\r\n  min-height: 100vh;\r\n  background: linear-gradient(to bottom right, #f3f4f6, #e0e7ff);\r\n}\r\n\r\n.dashboard-content {\r\n  max-width: 1200px;\r\n  margin: 0 auto;\r\n}\r\n\r\n/* === Header === */\r\n.dashboard-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.dashboard-title {\r\n  font-size: 2rem;\r\n  font-weight: 700;\r\n  color: #0f172a;\r\n}\r\n\r\n.dashboard-subtitle {\r\n  color: #475569;\r\n  margin-top: 0.25rem;\r\n  font-size: 0.875rem;\r\n}\r\n\r\n.view-toggle {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.toggle-button {\r\n  padding: 0.5rem 1rem;\r\n  font-weight: 600;\r\n  border-radius: 0.375rem;\r\n  background-color: #e2e8f0;\r\n  color: #1e293b;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.toggle-button.active {\r\n  background-color: #1e3a8a;\r\n  color: #fff;\r\n}\r\n\r\n/* === KPI Grid === */\r\n.kpi-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\r\n  gap: 1rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n/* === KPI & Press Cards === */\r\n.kpi-card {\r\n  background: #ffffff;\r\n  border: 1px solid #cbd5e1;\r\n  border-left: 5px solid #1e3a8a;\r\n  padding: 1rem;\r\n  border-radius: 0.5rem;\r\n  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.04);\r\n  transition: transform 0.2s ease;\r\n}\r\n\r\n.kpi-card:hover {\r\n  transform: translateY(-3px);\r\n}\r\n\r\n.kpi-title {\r\n  font-size: 0.75rem;\r\n  font-weight: 600;\r\n  color: #64748b;\r\n  text-transform: uppercase;\r\n  margin-bottom: 0.25rem;\r\n}\r\n\r\n.kpi-value {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  color: #0f172a;\r\n}\r\n\r\n.kpi-change {\r\n  font-size: 0.75rem;\r\n  color: #15803d;\r\n  margin-top: 0.25rem;\r\n}\r\n\r\n/* Progress bar */\r\n.kpi-progress-track {\r\n  margin-top: 0.75rem;\r\n  background-color: #e5e7eb;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n}\r\n\r\n.kpi-progress {\r\n  height: 6px;\r\n  border-radius: 3px;\r\n  background-color: #1e3a8a;\r\n  transition: width 0.3s ease-in-out;\r\n}\r\n\r\n/* === Press Summary Grid === */\r\n.press-summary-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\r\n  gap: 1rem;\r\n}\r\n\r\n/* Responsive Fixes */\r\n@media (max-width: 768px) {\r\n  .dashboard-header {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n  }\r\n\r\n  .view-toggle {\r\n    margin-top: 1rem;\r\n  }\r\n}\r\n.weekly-plan-view {\r\n  margin-top: 2rem;\r\n}\r\n\r\n.press-columns-container {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 1rem;\r\n}\r\n\r\n.weekly-plan-press {\r\n  flex: 1;\r\n  background: #fff;\r\n  border-radius: 8px;\r\n  padding: 1rem;\r\n  min-width: 300px;\r\n  box-shadow: 0 2px 5px rgba(0,0,0,0.05);\r\n}\r\n\r\n.weekly-plan-press table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.weekly-plan-press th, .weekly-plan-press td {\r\n  padding: 0.5rem;\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.weekly-plan-header, .press-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/MainDashboard.css":
/*!************************************************************************************************!*\
  !*** ../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/MainDashboard.css ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* === KPI Cards === */\r\n.kpi-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\r\n  gap: 1rem;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.floating-chatbot {\r\n  position: fixed;\r\n  bottom: 20px;\r\n  right: 20px;\r\n  z-index: 9999;\r\n}\r\n\r\n.chatbot-toggle-btn {\r\n  background: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 50%;\r\n  width: 60px;\r\n  height: 60px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\r\n  cursor: pointer;\r\n}\r\n\r\n.chatbot-window {\r\n  width: 300px;\r\n  height: 400px;\r\n  background: white;\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n.chatbot-messages {\r\n  flex: 1;\r\n  padding: 10px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.chat-message.bot {\r\n  background: #f1f1f1;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n}\r\n\r\n.chat-message.user {\r\n  background: #d1e7ff;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n  align-self: flex-end;\r\n}\r\n\r\n.chatbot-input {\r\n  display: flex;\r\n  border-top: 1px solid #ccc;\r\n}\r\n\r\n.chatbot-input input {\r\n  flex: 1;\r\n  padding: 10px;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.chatbot-toggle-btn {\r\n  position: fixed;\r\n  bottom: 20px;\r\n  right: 20px;\r\n  background: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 50%;\r\n  width: 60px;\r\n  height: 60px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\r\n  cursor: pointer;\r\n  z-index: 1000;\r\n}\r\n\r\n.chatbot-window {\r\n  position: fixed;\r\n  bottom: 90px;\r\n  right: 20px;\r\n  width: 300px;\r\n  height: 400px;\r\n  background: white;\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  z-index: 1000;\r\n}\r\n\r\n.chatbot-header {\r\n  padding: 10px;\r\n  background: #007bff;\r\n  color: white;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.chatbot-messages {\r\n  flex: 1;\r\n  padding: 10px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.chat-message.bot {\r\n  background: #f1f1f1;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n}\r\n\r\n.chat-message.user {\r\n  background: #d1e7ff;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n  align-self: flex-end;\r\n}\r\n\r\n.chatbot-input {\r\n  display: flex;\r\n  border-top: 1px solid #ccc;\r\n}\r\n\r\n.chatbot-input input {\r\n  flex: 1;\r\n  padding: 10px;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.chatbot-suggestions {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  padding: 8px;\r\n  gap: 8px;\r\n  border-top: 1px solid #ccc;\r\n  background: #fafafa;\r\n}\r\n\r\n.chatbot-suggestions button {\r\n  padding: 6px 10px;\r\n  background: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 20px;\r\n  cursor: pointer;\r\n  font-size: 12px;\r\n}\r\n\r\n.chatbot-suggestions button:hover {\r\n  background: #0056b3;\r\n}\r\n\r\n\r\n.chatbot-input button {\r\n  padding: 10px;\r\n  border: none;\r\n  background: #007bff;\r\n  color: white;\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n.chatbot-input button {\r\n  padding: 10px;\r\n  border: none;\r\n  background: #007bff;\r\n  color: white;\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n.kpi-card {\r\n  background: #fff;\r\n  border-left: 4px solid #1e3a8a;\r\n  padding: 1rem;\r\n  border-radius: 8px;\r\n  box-shadow: 0 1px 4px rgba(0,0,0,0.06);\r\n}\r\n\r\n.kpi-card-content {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.kpi-title {\r\n  font-size: 0.75rem;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  font-weight: 600;\r\n}\r\n\r\n.kpi-value {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n}\r\n\r\n.kpi-change {\r\n  font-size: 0.875rem;\r\n  color: #15803d;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.3rem;\r\n  margin-top: 0.2rem;\r\n}\r\n\r\n.kpi-progress-track {\r\n  background: #e5e7eb;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n  margin-top: 0.5rem;\r\n}\r\n\r\n.kpi-progress {\r\n  background: #1e3a8a;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n}\r\n\r\n/* === Press Cards === */\r\n.press-summary-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));\r\n  gap: 1.5rem;\r\n}\r\n\r\n.press-card {\r\n  background: #f9fafb;\r\n  border: 1px solid #d1d5db;\r\n  padding: 1rem;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 6px rgba(0,0,0,0.04);\r\n}\r\n\r\n.press-title {\r\n  font-size: 1.2rem;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: #1e3a8a;\r\n}\r\n\r\n.press-info {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  font-size: 0.85rem;\r\n  gap: 0.5rem;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.press-info .highlight {\r\n  background-color: yellow;\r\n  padding: 2px 4px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.shift-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.shift-table th,\r\n.shift-table td {\r\n  padding: 0.5rem;\r\n  border: 1px solid #e5e7eb;\r\n  font-size: 0.85rem;\r\n  text-align: center;\r\n}\r\n\r\n.shift-table th {\r\n  background-color: #f3f4f6;\r\n  font-weight: 600;\r\n}\r\n\r\n.total-row td {\r\n  background-color: #f1f5f9;\r\n  font-weight: 600;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/components/MainDashboard.css"],"names":[],"mappings":"AAAA,sBAAsB;AACtB;EACE,aAAa;EACb,2DAA2D;EAC3D,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,yCAAyC;EACzC,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,yCAAyC;EACzC,aAAa;EACb,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA;EACE,OAAO;EACP,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,0BAA0B;AAC5B;;AAEA;EACE,OAAO;EACP,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,yCAAyC;EACzC,eAAe;EACf,aAAa;AACf;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,yCAAyC;EACzC,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,OAAO;EACP,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,0BAA0B;AAC5B;;AAEA;EACE,OAAO;EACP,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,eAAe;EACf,YAAY;EACZ,QAAQ;EACR,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,mBAAmB;AACrB;;;AAGA;EACE,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,eAAe;AACjB;;;AAGA;EACE,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,eAAe;AACjB;;;AAGA;EACE,gBAAgB;EAChB,8BAA8B;EAC9B,aAAa;EACb,kBAAkB;EAClB,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,WAAW;EACX,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,WAAW;EACX,kBAAkB;AACpB;;AAEA,wBAAwB;AACxB;EACE,aAAa;EACb,2DAA2D;EAC3D,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,aAAa;EACb,kBAAkB;EAClB,sCAAsC;AACxC;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,kBAAkB;EAClB,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,wBAAwB;EACxB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,yBAAyB;AAC3B;;AAEA;;EAEE,eAAe;EACf,yBAAyB;EACzB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,gBAAgB;AAClB","sourcesContent":["/* === KPI Cards === */\r\n.kpi-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\r\n  gap: 1rem;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.floating-chatbot {\r\n  position: fixed;\r\n  bottom: 20px;\r\n  right: 20px;\r\n  z-index: 9999;\r\n}\r\n\r\n.chatbot-toggle-btn {\r\n  background: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 50%;\r\n  width: 60px;\r\n  height: 60px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\r\n  cursor: pointer;\r\n}\r\n\r\n.chatbot-window {\r\n  width: 300px;\r\n  height: 400px;\r\n  background: white;\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n.chatbot-messages {\r\n  flex: 1;\r\n  padding: 10px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.chat-message.bot {\r\n  background: #f1f1f1;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n}\r\n\r\n.chat-message.user {\r\n  background: #d1e7ff;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n  align-self: flex-end;\r\n}\r\n\r\n.chatbot-input {\r\n  display: flex;\r\n  border-top: 1px solid #ccc;\r\n}\r\n\r\n.chatbot-input input {\r\n  flex: 1;\r\n  padding: 10px;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.chatbot-toggle-btn {\r\n  position: fixed;\r\n  bottom: 20px;\r\n  right: 20px;\r\n  background: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 50%;\r\n  width: 60px;\r\n  height: 60px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\r\n  cursor: pointer;\r\n  z-index: 1000;\r\n}\r\n\r\n.chatbot-window {\r\n  position: fixed;\r\n  bottom: 90px;\r\n  right: 20px;\r\n  width: 300px;\r\n  height: 400px;\r\n  background: white;\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  z-index: 1000;\r\n}\r\n\r\n.chatbot-header {\r\n  padding: 10px;\r\n  background: #007bff;\r\n  color: white;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.chatbot-messages {\r\n  flex: 1;\r\n  padding: 10px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.chat-message.bot {\r\n  background: #f1f1f1;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n}\r\n\r\n.chat-message.user {\r\n  background: #d1e7ff;\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 8px;\r\n  align-self: flex-end;\r\n}\r\n\r\n.chatbot-input {\r\n  display: flex;\r\n  border-top: 1px solid #ccc;\r\n}\r\n\r\n.chatbot-input input {\r\n  flex: 1;\r\n  padding: 10px;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.chatbot-suggestions {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  padding: 8px;\r\n  gap: 8px;\r\n  border-top: 1px solid #ccc;\r\n  background: #fafafa;\r\n}\r\n\r\n.chatbot-suggestions button {\r\n  padding: 6px 10px;\r\n  background: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 20px;\r\n  cursor: pointer;\r\n  font-size: 12px;\r\n}\r\n\r\n.chatbot-suggestions button:hover {\r\n  background: #0056b3;\r\n}\r\n\r\n\r\n.chatbot-input button {\r\n  padding: 10px;\r\n  border: none;\r\n  background: #007bff;\r\n  color: white;\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n.chatbot-input button {\r\n  padding: 10px;\r\n  border: none;\r\n  background: #007bff;\r\n  color: white;\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n.kpi-card {\r\n  background: #fff;\r\n  border-left: 4px solid #1e3a8a;\r\n  padding: 1rem;\r\n  border-radius: 8px;\r\n  box-shadow: 0 1px 4px rgba(0,0,0,0.06);\r\n}\r\n\r\n.kpi-card-content {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.kpi-title {\r\n  font-size: 0.75rem;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  font-weight: 600;\r\n}\r\n\r\n.kpi-value {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n}\r\n\r\n.kpi-change {\r\n  font-size: 0.875rem;\r\n  color: #15803d;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.3rem;\r\n  margin-top: 0.2rem;\r\n}\r\n\r\n.kpi-progress-track {\r\n  background: #e5e7eb;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n  margin-top: 0.5rem;\r\n}\r\n\r\n.kpi-progress {\r\n  background: #1e3a8a;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n}\r\n\r\n/* === Press Cards === */\r\n.press-summary-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));\r\n  gap: 1.5rem;\r\n}\r\n\r\n.press-card {\r\n  background: #f9fafb;\r\n  border: 1px solid #d1d5db;\r\n  padding: 1rem;\r\n  border-radius: 8px;\r\n  box-shadow: 0 2px 6px rgba(0,0,0,0.04);\r\n}\r\n\r\n.press-title {\r\n  font-size: 1.2rem;\r\n  font-weight: 600;\r\n  margin-bottom: 1rem;\r\n  color: #1e3a8a;\r\n}\r\n\r\n.press-info {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n  font-size: 0.85rem;\r\n  gap: 0.5rem;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.press-info .highlight {\r\n  background-color: yellow;\r\n  padding: 2px 4px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.shift-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n.shift-table th,\r\n.shift-table td {\r\n  padding: 0.5rem;\r\n  border: 1px solid #e5e7eb;\r\n  font-size: 0.85rem;\r\n  text-align: center;\r\n}\r\n\r\n.shift-table th {\r\n  background-color: #f3f4f6;\r\n  font-weight: 600;\r\n}\r\n\r\n.total-row td {\r\n  background-color: #f1f5f9;\r\n  font-weight: 600;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/WeeklyPlanDisplay.css":
/*!****************************************************************************************************!*\
  !*** ../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/WeeklyPlanDisplay.css ***!
  \****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Container */\r\n.weekly-plan-container {\r\n  padding: 20px;\r\n  background-color: #f8f9fa;\r\n  border-radius: 8px;\r\n  margin-top: 20px;\r\n  font-family: Arial, sans-serif;\r\n}\r\n\r\n.filter-container {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.search-input {\r\n  padding: 4px 8px;\r\n  font-size: 13px;\r\n  border-radius: 6px;\r\n  border: 1px solid #ccc;\r\n  width: 180px;\r\n  transition: all 0.2s ease;\r\n  box-shadow: 0 1px 2px rgba(0,0,0,0.05);\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: #007bff;\r\n  box-shadow: 0 0 5px rgba(0,123,255,0.4);\r\n}\r\n\r\n.search-input::placeholder {\r\n  color: #999;\r\n  font-size: 12px;\r\n}\r\n\r\n\r\n.search-input {\r\n  padding: 6px 10px;\r\n  font-size: 14px;\r\n  border-radius: 4px;\r\n  border: 1px solid #ccc;\r\n  width: 250px;\r\n}\r\n\r\nmark {\r\n  background-color: yellow;\r\n  font-weight: bold;\r\n  padding: 0 2px;\r\n}\r\n\r\n\r\n/* Header */\r\n.weekly-plan-header {\r\n  margin-bottom: 20px;\r\n  padding-bottom: 15px;\r\n  border-bottom: 2px solid #dee2e6;\r\n}\r\n\r\nmark {\r\n  background-color: yellow;\r\n  padding: 0 2px;\r\n  border-radius: 2px;\r\n}\r\n\r\n\r\n.weekly-plan-title {\r\n  margin: 0;\r\n  color: #495057;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n}\r\n\r\n/* Table styles */\r\n.table-container::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  width: 20px;\r\n  height: 100%;\r\n  background: linear-gradient(to left, #f8f9fa, transparent);\r\n  pointer-events: none;\r\n}\r\n.table-container {\r\n  position: relative;\r\n}\r\n\r\n\r\n.weekly-plan-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 10px;\r\n  table-layout: fixed;\r\n}\r\n\r\n.weekly-plan-th {\r\n  background-color: #f1f3f5;\r\n  color: #343a40;\r\n  font-weight: 600;\r\n  padding: 6px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  white-space: nowrap;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 2;\r\n  font-size: 10px;\r\n}\r\n\r\n.weekly-plan-th,\r\n.weekly-plan-td {\r\n  border-right: 1px solid #dee2e6;\r\n}\r\n.weekly-plan-th:last-child,\r\n.weekly-plan-td:last-child {\r\n  border-right: none;\r\n}\r\n\r\n.weekly-plan-th {\r\n  background: linear-gradient(to bottom, #f9fafc, #e9ecef);\r\n  border-bottom: 2px solid #ced4da;\r\n}\r\n\r\n\r\n\r\n.weekly-plan-td {\r\n  padding: 5px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  font-size: 10px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.weekly-day-cell {\r\n  position: sticky;\r\n  left: 0;\r\n  z-index: 3;\r\n  background-color: #e9ecef;\r\n  border-right: 2px solid #dee2e6; \r\n  background-color: #e9ecef;\r\n  font-weight: 600;\r\n  color: #495057;\r\n  writing-mode: vertical-rl;\r\n  text-orientation: mixed;\r\n  width: 40px;\r\n  min-width: 40px;\r\n   font-weight: bold;\r\n  color: #212529;\r\n  background-color: #dce2e7;\r\n  font-size: 11px;\r\n}\r\n\r\n.customer-cell {\r\n  text-align: left;\r\n  padding-left: 6px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  max-width: 100px;\r\n}\r\n\r\n.action-cell {\r\n  width: 50px;\r\n}\r\n\r\n/* .edit-input {\r\n  width: 100%;\r\n  padding: 2px 4px;\r\n  border: 1px solid #007bff;\r\n  border-radius: 3px;\r\n  font-size: 10px;\r\n  text-align: center;\r\n} */\r\n\r\n.na-value {\r\n  color: #6c757d;\r\n  font-style: italic;\r\n}\r\n\r\n.editing-row {\r\n  background-color: #e3f2fd;\r\n}\r\n\r\n/* Buttons */\r\n.action-btn {\r\n  padding: 4px;\r\n  border-radius: 4px;\r\n  background: white;\r\n  cursor: pointer;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-right: 2px;\r\n  border: 1px solid;\r\n}\r\n\r\n.save-btn {\r\n  border-color: #007bff;\r\n  color: #007bff;\r\n}\r\n\r\n.cancel-btn {\r\n  border-color: #dc3545;\r\n  color: #dc3545;\r\n}\r\n\r\n/* Messages */\r\n.success-message {\r\n  background-color: #d4edda;\r\n  color: #155724;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #c3e6cb;\r\n}\r\n\r\n.error-message {\r\n  background-color: #f8d7da;\r\n  color: #721c24;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #f5c6cb;\r\n}\r\n\r\n.validation-error {\r\n  background-color: #fff3cd;\r\n  color: #856404;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #ffeaa7;\r\n}\r\n\r\n/* Loading & Error States */\r\n.loading-state,\r\n.error-state {\r\n  text-align: center;\r\n  padding: 40px 20px;\r\n}\r\n\r\n.error-state {\r\n  background-color: #f8d7da;\r\n  color: #dc3545;\r\n  border-radius: 4px;\r\n  border: 1px solid #f5c6cb;\r\n}\r\n\r\n.retry-btn {\r\n  padding: 8px 16px;\r\n  background-color: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  margin-top: 10px;\r\n}\r\n\r\n.na-value {\r\n  color: #6c757d;\r\n  font-style: italic;\r\n}\r\n\r\n.minwide-select {\r\n  min-width: 120px;\r\n  padding: 4px;\r\n}\r\n\r\n.weekly-plan-td {\r\n  padding: 5px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  font-size: 10px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.customer-cell {\r\n  text-align: left;\r\n  padding-left: 6px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  max-width: 100px;\r\n}\r\n\r\n.weekly-plan-td {\r\n  padding: 5px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  font-size: 10px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.action-cell {\r\n  width: 50px;\r\n}\r\n\r\n.editing-row {\r\n  background-color: #e3f2fd;\r\n}\r\n\r\n.max-ellipsis-90 {\r\n  max-width: 90px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.pre-line {\r\n  white-space: pre-line;\r\n}\r\n\r\n.week-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 16px;\r\n  padding: 0 12px;\r\n}\r\n\r\n.week-title {\r\n  font-size: 1.25rem;\r\n  font-weight: bold;\r\n  color: #333;\r\n}\r\n\r\n.week-nav-btn {\r\n  background-color: white;\r\n  border: 1px solid #ccc;\r\n  padding: 6px 12px;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n}\r\n\r\n.no-plan-message {\r\n  text-align: center;\r\n  padding: 40px;\r\n  font-size: 18px;\r\n  color: #dc3545;\r\n  font-weight: bold;\r\n}\r\n\r\n\r\n.no-plan-message {\r\n  text-align: center;\r\n  padding: 40px;\r\n  font-size: 18px;\r\n  color: #dc3545;\r\n  font-weight: bold;\r\n}\r\n\r\n\r\n\r\n\r\n.action-btn {\r\n  border: none;\r\n  padding: 6px;\r\n  font-size: 12px;\r\n  border-radius: 4px;\r\n  transition: all 0.2s ease;\r\n  box-shadow: 0 1px 2px rgba(0,0,0,0.1);\r\n}\r\n\r\n.action-btn:hover {\r\n  transform: scale(1.1);\r\n  background-color: #e2f0d9;\r\n}\r\n\r\n\r\n.save-btn {\r\n  border: 1px solid #007bff;\r\n  color: #007bff;\r\n}\r\n.mb-2 {\r\n  margin-bottom: 2px;\r\n}\r\n.action-btn {\r\n  padding: 4px;\r\n  border: 1px solid #28a745;\r\n  border-radius: 4px;\r\n  background: white;\r\n  cursor: pointer;\r\n  color: #28a745;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-right: 2px;\r\n}\r\n\r\n.cancel-btn {\r\n  border: 1px solid #dc3545;\r\n  color: #dc3545;\r\n}\r\n.action-btn {\r\n  padding: 4px;\r\n  border: 1px solid #28a745;\r\n  border-radius: 4px;\r\n  background: white;\r\n  cursor: pointer;\r\n  color: #28a745;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-right: 2px;\r\n}\r\n.large-icon {\r\n  font-size: 48px;\r\n}\r\n\r\n.mb-10 {\r\n  margin-bottom: 10px;\r\n}\r\n.validation-list {\r\n  margin: 5px 0;\r\n  padding-left: 20px;\r\n}\r\n\r\n.success-message {\r\n  background-color: #d4edda;\r\n  color: #155724;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #c3e6cb;\r\n}\r\n\r\n.error-message {\r\n  background-color: #f8d7da;\r\n  color: #721c24;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #f5c6cb;\r\n}\r\n.weekly-plan-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 10px;\r\n  table-layout: fixed;\r\n}\r\n.weekly-plan-th {\r\n  background-color: #f1f3f5;\r\n  color: #343a40;\r\n  font-weight: 600;\r\n  padding: 6px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  white-space: nowrap;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 2;\r\n  font-size: 10px;\r\n}\r\n\r\n.max-90 {\r\n  max-width: 90px;\r\n}\r\n\r\n.shift-cell {\r\n  white-space: normal;\r\n  word-break: break-word;\r\n  line-height: 1.3;\r\n  padding: 4px 6px;\r\n  text-align: left;\r\n}\r\n\r\n.shift-edit-wrap {\r\n  display: inline-block;\r\n  margin-right: 8px;\r\n  min-width: 60px;\r\n}\r\n\r\n.edit-input, .edit-select {\r\n  font-size: 11px;\r\n  padding: 6px 8px;\r\n  border: 1px solid #6c757d;\r\n  border-radius: 4px;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\r\n}\r\n\r\n\r\n.weekly-plan-td input,\r\n.weekly-plan-td select {\r\n  width: 100%;\r\n  display: block;\r\n}\r\n\r\n", "",{"version":3,"sources":["webpack://./src/components/WeeklyPlanDisplay.css"],"names":[],"mappings":"AAAA,cAAc;AACd;EACE,aAAa;EACb,yBAAyB;EACzB,kBAAkB;EAClB,gBAAgB;EAChB,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;EACZ,yBAAyB;EACzB,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,uCAAuC;AACzC;;AAEA;EACE,WAAW;EACX,eAAe;AACjB;;;AAGA;EACE,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,wBAAwB;EACxB,iBAAiB;EACjB,cAAc;AAChB;;;AAGA,WAAW;AACX;EACE,mBAAmB;EACnB,oBAAoB;EACpB,gCAAgC;AAClC;;AAEA;EACE,wBAAwB;EACxB,cAAc;EACd,kBAAkB;AACpB;;;AAGA;EACE,SAAS;EACT,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB;;AAEA,iBAAiB;AACjB;EACE,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,WAAW;EACX,YAAY;EACZ,0DAA0D;EAC1D,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;;;AAGA;EACE,WAAW;EACX,yBAAyB;EACzB,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,mBAAmB;EACnB,gBAAgB;EAChB,MAAM;EACN,UAAU;EACV,eAAe;AACjB;;AAEA;;EAEE,+BAA+B;AACjC;AACA;;EAEE,kBAAkB;AACpB;;AAEA;EACE,wDAAwD;EACxD,gCAAgC;AAClC;;;;AAIA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE,gBAAgB;EAChB,OAAO;EACP,UAAU;EACV,yBAAyB;EACzB,+BAA+B;EAC/B,yBAAyB;EACzB,gBAAgB;EAChB,cAAc;EACd,yBAAyB;EACzB,uBAAuB;EACvB,WAAW;EACX,eAAe;GACd,iBAAiB;EAClB,cAAc;EACd,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,WAAW;AACb;;AAEA;;;;;;;GAOG;;AAEH;EACE,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,YAAY;AACZ;EACE,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,cAAc;AAChB;;AAEA,aAAa;AACb;EACE,yBAAyB;EACzB,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA,2BAA2B;AAC3B;;EAEE,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;EACjB,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,uBAAuB;AACzB;AACA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,uBAAuB;EACvB,sBAAsB;EACtB,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,eAAe;EACf,cAAc;EACd,iBAAiB;AACnB;;;AAGA;EACE,kBAAkB;EAClB,aAAa;EACb,eAAe;EACf,cAAc;EACd,iBAAiB;AACnB;;;;;AAKA;EACE,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,yBAAyB;EACzB,qCAAqC;AACvC;;AAEA;EACE,qBAAqB;EACrB,yBAAyB;AAC3B;;;AAGA;EACE,yBAAyB;EACzB,cAAc;AAChB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,cAAc;EACd,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;AACA;EACE,YAAY;EACZ,yBAAyB;EACzB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,cAAc;EACd,oBAAoB;EACpB,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;AACnB;AACA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;AACrB;AACA;EACE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;AAC3B;AACA;EACE,WAAW;EACX,yBAAyB;EACzB,eAAe;EACf,mBAAmB;AACrB;AACA;EACE,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,mBAAmB;EACnB,gBAAgB;EAChB,MAAM;EACN,UAAU;EACV,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,yBAAyB;EACzB,kBAAkB;EAClB,4CAA4C;AAC9C;;;AAGA;;EAEE,WAAW;EACX,cAAc;AAChB","sourcesContent":["/* Container */\r\n.weekly-plan-container {\r\n  padding: 20px;\r\n  background-color: #f8f9fa;\r\n  border-radius: 8px;\r\n  margin-top: 20px;\r\n  font-family: Arial, sans-serif;\r\n}\r\n\r\n.filter-container {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.search-input {\r\n  padding: 4px 8px;\r\n  font-size: 13px;\r\n  border-radius: 6px;\r\n  border: 1px solid #ccc;\r\n  width: 180px;\r\n  transition: all 0.2s ease;\r\n  box-shadow: 0 1px 2px rgba(0,0,0,0.05);\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: #007bff;\r\n  box-shadow: 0 0 5px rgba(0,123,255,0.4);\r\n}\r\n\r\n.search-input::placeholder {\r\n  color: #999;\r\n  font-size: 12px;\r\n}\r\n\r\n\r\n.search-input {\r\n  padding: 6px 10px;\r\n  font-size: 14px;\r\n  border-radius: 4px;\r\n  border: 1px solid #ccc;\r\n  width: 250px;\r\n}\r\n\r\nmark {\r\n  background-color: yellow;\r\n  font-weight: bold;\r\n  padding: 0 2px;\r\n}\r\n\r\n\r\n/* Header */\r\n.weekly-plan-header {\r\n  margin-bottom: 20px;\r\n  padding-bottom: 15px;\r\n  border-bottom: 2px solid #dee2e6;\r\n}\r\n\r\nmark {\r\n  background-color: yellow;\r\n  padding: 0 2px;\r\n  border-radius: 2px;\r\n}\r\n\r\n\r\n.weekly-plan-title {\r\n  margin: 0;\r\n  color: #495057;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n}\r\n\r\n/* Table styles */\r\n.table-container::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  width: 20px;\r\n  height: 100%;\r\n  background: linear-gradient(to left, #f8f9fa, transparent);\r\n  pointer-events: none;\r\n}\r\n.table-container {\r\n  position: relative;\r\n}\r\n\r\n\r\n.weekly-plan-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 10px;\r\n  table-layout: fixed;\r\n}\r\n\r\n.weekly-plan-th {\r\n  background-color: #f1f3f5;\r\n  color: #343a40;\r\n  font-weight: 600;\r\n  padding: 6px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  white-space: nowrap;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 2;\r\n  font-size: 10px;\r\n}\r\n\r\n.weekly-plan-th,\r\n.weekly-plan-td {\r\n  border-right: 1px solid #dee2e6;\r\n}\r\n.weekly-plan-th:last-child,\r\n.weekly-plan-td:last-child {\r\n  border-right: none;\r\n}\r\n\r\n.weekly-plan-th {\r\n  background: linear-gradient(to bottom, #f9fafc, #e9ecef);\r\n  border-bottom: 2px solid #ced4da;\r\n}\r\n\r\n\r\n\r\n.weekly-plan-td {\r\n  padding: 5px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  font-size: 10px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.weekly-day-cell {\r\n  position: sticky;\r\n  left: 0;\r\n  z-index: 3;\r\n  background-color: #e9ecef;\r\n  border-right: 2px solid #dee2e6; \r\n  background-color: #e9ecef;\r\n  font-weight: 600;\r\n  color: #495057;\r\n  writing-mode: vertical-rl;\r\n  text-orientation: mixed;\r\n  width: 40px;\r\n  min-width: 40px;\r\n   font-weight: bold;\r\n  color: #212529;\r\n  background-color: #dce2e7;\r\n  font-size: 11px;\r\n}\r\n\r\n.customer-cell {\r\n  text-align: left;\r\n  padding-left: 6px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  max-width: 100px;\r\n}\r\n\r\n.action-cell {\r\n  width: 50px;\r\n}\r\n\r\n/* .edit-input {\r\n  width: 100%;\r\n  padding: 2px 4px;\r\n  border: 1px solid #007bff;\r\n  border-radius: 3px;\r\n  font-size: 10px;\r\n  text-align: center;\r\n} */\r\n\r\n.na-value {\r\n  color: #6c757d;\r\n  font-style: italic;\r\n}\r\n\r\n.editing-row {\r\n  background-color: #e3f2fd;\r\n}\r\n\r\n/* Buttons */\r\n.action-btn {\r\n  padding: 4px;\r\n  border-radius: 4px;\r\n  background: white;\r\n  cursor: pointer;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-right: 2px;\r\n  border: 1px solid;\r\n}\r\n\r\n.save-btn {\r\n  border-color: #007bff;\r\n  color: #007bff;\r\n}\r\n\r\n.cancel-btn {\r\n  border-color: #dc3545;\r\n  color: #dc3545;\r\n}\r\n\r\n/* Messages */\r\n.success-message {\r\n  background-color: #d4edda;\r\n  color: #155724;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #c3e6cb;\r\n}\r\n\r\n.error-message {\r\n  background-color: #f8d7da;\r\n  color: #721c24;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #f5c6cb;\r\n}\r\n\r\n.validation-error {\r\n  background-color: #fff3cd;\r\n  color: #856404;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #ffeaa7;\r\n}\r\n\r\n/* Loading & Error States */\r\n.loading-state,\r\n.error-state {\r\n  text-align: center;\r\n  padding: 40px 20px;\r\n}\r\n\r\n.error-state {\r\n  background-color: #f8d7da;\r\n  color: #dc3545;\r\n  border-radius: 4px;\r\n  border: 1px solid #f5c6cb;\r\n}\r\n\r\n.retry-btn {\r\n  padding: 8px 16px;\r\n  background-color: #007bff;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  margin-top: 10px;\r\n}\r\n\r\n.na-value {\r\n  color: #6c757d;\r\n  font-style: italic;\r\n}\r\n\r\n.minwide-select {\r\n  min-width: 120px;\r\n  padding: 4px;\r\n}\r\n\r\n.weekly-plan-td {\r\n  padding: 5px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  font-size: 10px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.customer-cell {\r\n  text-align: left;\r\n  padding-left: 6px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  max-width: 100px;\r\n}\r\n\r\n.weekly-plan-td {\r\n  padding: 5px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  font-size: 10px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.action-cell {\r\n  width: 50px;\r\n}\r\n\r\n.editing-row {\r\n  background-color: #e3f2fd;\r\n}\r\n\r\n.max-ellipsis-90 {\r\n  max-width: 90px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.pre-line {\r\n  white-space: pre-line;\r\n}\r\n\r\n.week-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 16px;\r\n  padding: 0 12px;\r\n}\r\n\r\n.week-title {\r\n  font-size: 1.25rem;\r\n  font-weight: bold;\r\n  color: #333;\r\n}\r\n\r\n.week-nav-btn {\r\n  background-color: white;\r\n  border: 1px solid #ccc;\r\n  padding: 6px 12px;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n}\r\n\r\n.no-plan-message {\r\n  text-align: center;\r\n  padding: 40px;\r\n  font-size: 18px;\r\n  color: #dc3545;\r\n  font-weight: bold;\r\n}\r\n\r\n\r\n.no-plan-message {\r\n  text-align: center;\r\n  padding: 40px;\r\n  font-size: 18px;\r\n  color: #dc3545;\r\n  font-weight: bold;\r\n}\r\n\r\n\r\n\r\n\r\n.action-btn {\r\n  border: none;\r\n  padding: 6px;\r\n  font-size: 12px;\r\n  border-radius: 4px;\r\n  transition: all 0.2s ease;\r\n  box-shadow: 0 1px 2px rgba(0,0,0,0.1);\r\n}\r\n\r\n.action-btn:hover {\r\n  transform: scale(1.1);\r\n  background-color: #e2f0d9;\r\n}\r\n\r\n\r\n.save-btn {\r\n  border: 1px solid #007bff;\r\n  color: #007bff;\r\n}\r\n.mb-2 {\r\n  margin-bottom: 2px;\r\n}\r\n.action-btn {\r\n  padding: 4px;\r\n  border: 1px solid #28a745;\r\n  border-radius: 4px;\r\n  background: white;\r\n  cursor: pointer;\r\n  color: #28a745;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-right: 2px;\r\n}\r\n\r\n.cancel-btn {\r\n  border: 1px solid #dc3545;\r\n  color: #dc3545;\r\n}\r\n.action-btn {\r\n  padding: 4px;\r\n  border: 1px solid #28a745;\r\n  border-radius: 4px;\r\n  background: white;\r\n  cursor: pointer;\r\n  color: #28a745;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin-right: 2px;\r\n}\r\n.large-icon {\r\n  font-size: 48px;\r\n}\r\n\r\n.mb-10 {\r\n  margin-bottom: 10px;\r\n}\r\n.validation-list {\r\n  margin: 5px 0;\r\n  padding-left: 20px;\r\n}\r\n\r\n.success-message {\r\n  background-color: #d4edda;\r\n  color: #155724;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #c3e6cb;\r\n}\r\n\r\n.error-message {\r\n  background-color: #f8d7da;\r\n  color: #721c24;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  margin-bottom: 15px;\r\n  border: 1px solid #f5c6cb;\r\n}\r\n.weekly-plan-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 10px;\r\n  table-layout: fixed;\r\n}\r\n.weekly-plan-th {\r\n  background-color: #f1f3f5;\r\n  color: #343a40;\r\n  font-weight: 600;\r\n  padding: 6px 4px;\r\n  text-align: center;\r\n  border: 1px solid #dee2e6;\r\n  white-space: nowrap;\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 2;\r\n  font-size: 10px;\r\n}\r\n\r\n.max-90 {\r\n  max-width: 90px;\r\n}\r\n\r\n.shift-cell {\r\n  white-space: normal;\r\n  word-break: break-word;\r\n  line-height: 1.3;\r\n  padding: 4px 6px;\r\n  text-align: left;\r\n}\r\n\r\n.shift-edit-wrap {\r\n  display: inline-block;\r\n  margin-right: 8px;\r\n  min-width: 60px;\r\n}\r\n\r\n.edit-input, .edit-select {\r\n  font-size: 11px;\r\n  padding: 6px 8px;\r\n  border: 1px solid #6c757d;\r\n  border-radius: 4px;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\r\n}\r\n\r\n\r\n.weekly-plan-td input,\r\n.weekly-plan-td select {\r\n  width: 100%;\r\n  display: block;\r\n}\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/WeeklyPlanModal.css":
/*!**************************************************************************************************!*\
  !*** ../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/WeeklyPlanModal.css ***!
  \**************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* WeeklyPlanModal.css */\r\n\r\n.modal-table-cell {\r\n  padding: 12px;\r\n  border: 1px solid #e3e3e3;\r\n  vertical-align: top;\r\n  background-color: #fff;\r\n  font-size: 14px;\r\n}\r\n\r\n.modal-input {\r\n  width: 100%;\r\n  padding: 6px 10px;\r\n  border-radius: 4px;\r\n  border: 1px solid #ced4da;\r\n  font-size: 14px;\r\n  background-color: #fff;\r\n  transition: border 0.2s;\r\n}\r\n\r\n.modal-input:focus {\r\n  border-color: #007bff;\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);\r\n}\r\n\r\n.modal-input.readonly {\r\n  background-color: #e9ecef;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.modal-na {\r\n  color: #6c757d;\r\n  font-style: italic;\r\n  font-size: 14px;\r\n}\r\n\r\n/* WeeklyPlanModal.css */\r\n\r\n.modal-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: rgba(30, 30, 30, 0.6);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 999;\r\n}\r\n\r\n.modal-box {\r\n  background: white;\r\n  width: 95%;\r\n  max-width: 1200px;\r\n  border-radius: 10px;\r\n  padding: 24px;\r\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);\r\n  max-height: 90vh;\r\n  overflow-y: auto;\r\n}\r\n\r\n.modal-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.modal-header h3 {\r\n  margin: 0;\r\n  font-size: 22px;\r\n}\r\n\r\n.modal-header p {\r\n  margin: 4px 0 0 0;\r\n  color: #555;\r\n  font-size: 14px;\r\n}\r\n\r\n.modal-input.error {\r\n  border: 1px solid #dc3545;\r\n  background-color: #fff5f5;\r\n}\r\n\r\n.error-msg {\r\n  color: #dc3545;\r\n  font-size: 12px;\r\n  margin-top: 4px;\r\n}\r\n\r\n\r\n.modal-close {\r\n  cursor: pointer;\r\n  color: #888;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.modal-close:hover {\r\n  color: #000;\r\n}\r\n\r\n.modal-table-wrapper {\r\n  overflow-x: auto;\r\n  max-width: 100%;\r\n}\r\n\r\n.modal-table {\r\n  border-collapse: collapse;\r\n  width: 100%;\r\n  min-width: 1200px; /* ✅ ensure table doesn't collapse */\r\n  table-layout: fixed;\r\n}\r\n\r\n\r\n.modal-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 14px;\r\n}\r\n\r\n.modal-table th,\r\n.modal-table td {\r\n  padding: 10px;\r\n  border: 1px solid #dee2e6;\r\n  text-align: left;\r\n  background-color: #fff;\r\n}\r\n\r\n.modal-table th {\r\n  background-color: #f1f3f5;\r\n  font-weight: 600;\r\n}\r\n\r\n.modal-footer {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 15px;\r\n  margin-top: 20px;\r\n}\r\n\r\n.btn {\r\n  padding: 10px 20px;\r\n  font-weight: 600;\r\n  border-radius: 4px;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.btn-cancel {\r\n  background-color: #adb5bd;\r\n  color: white;\r\n}\r\n\r\n.btn-save {\r\n  background-color: #28a745;\r\n  color: white;\r\n}\r\n\r\n.btn-save:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/components/WeeklyPlanModal.css"],"names":[],"mappings":"AAAA,wBAAwB;;AAExB;EACE,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,eAAe;EACf,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,4CAA4C;AAC9C;;AAEA;EACE,yBAAyB;EACzB,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,eAAe;AACjB;;AAEA,wBAAwB;;AAExB;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,iCAAiC;EACjC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,iBAAiB;EACjB,mBAAmB;EACnB,aAAa;EACb,yCAAyC;EACzC,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,eAAe;EACf,eAAe;AACjB;;;AAGA;EACE,eAAe;EACf,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,iBAAiB,EAAE,oCAAoC;EACvD,mBAAmB;AACrB;;;AAGA;EACE,WAAW;EACX,yBAAyB;EACzB,eAAe;AACjB;;AAEA;;EAEE,aAAa;EACb,yBAAyB;EACzB,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB","sourcesContent":["/* WeeklyPlanModal.css */\r\n\r\n.modal-table-cell {\r\n  padding: 12px;\r\n  border: 1px solid #e3e3e3;\r\n  vertical-align: top;\r\n  background-color: #fff;\r\n  font-size: 14px;\r\n}\r\n\r\n.modal-input {\r\n  width: 100%;\r\n  padding: 6px 10px;\r\n  border-radius: 4px;\r\n  border: 1px solid #ced4da;\r\n  font-size: 14px;\r\n  background-color: #fff;\r\n  transition: border 0.2s;\r\n}\r\n\r\n.modal-input:focus {\r\n  border-color: #007bff;\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);\r\n}\r\n\r\n.modal-input.readonly {\r\n  background-color: #e9ecef;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.modal-na {\r\n  color: #6c757d;\r\n  font-style: italic;\r\n  font-size: 14px;\r\n}\r\n\r\n/* WeeklyPlanModal.css */\r\n\r\n.modal-overlay {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: rgba(30, 30, 30, 0.6);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 999;\r\n}\r\n\r\n.modal-box {\r\n  background: white;\r\n  width: 95%;\r\n  max-width: 1200px;\r\n  border-radius: 10px;\r\n  padding: 24px;\r\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);\r\n  max-height: 90vh;\r\n  overflow-y: auto;\r\n}\r\n\r\n.modal-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.modal-header h3 {\r\n  margin: 0;\r\n  font-size: 22px;\r\n}\r\n\r\n.modal-header p {\r\n  margin: 4px 0 0 0;\r\n  color: #555;\r\n  font-size: 14px;\r\n}\r\n\r\n.modal-input.error {\r\n  border: 1px solid #dc3545;\r\n  background-color: #fff5f5;\r\n}\r\n\r\n.error-msg {\r\n  color: #dc3545;\r\n  font-size: 12px;\r\n  margin-top: 4px;\r\n}\r\n\r\n\r\n.modal-close {\r\n  cursor: pointer;\r\n  color: #888;\r\n  transition: color 0.2s;\r\n}\r\n\r\n.modal-close:hover {\r\n  color: #000;\r\n}\r\n\r\n.modal-table-wrapper {\r\n  overflow-x: auto;\r\n  max-width: 100%;\r\n}\r\n\r\n.modal-table {\r\n  border-collapse: collapse;\r\n  width: 100%;\r\n  min-width: 1200px; /* ✅ ensure table doesn't collapse */\r\n  table-layout: fixed;\r\n}\r\n\r\n\r\n.modal-table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 14px;\r\n}\r\n\r\n.modal-table th,\r\n.modal-table td {\r\n  padding: 10px;\r\n  border: 1px solid #dee2e6;\r\n  text-align: left;\r\n  background-color: #fff;\r\n}\r\n\r\n.modal-table th {\r\n  background-color: #f1f3f5;\r\n  font-weight: 600;\r\n}\r\n\r\n.modal-footer {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 15px;\r\n  margin-top: 20px;\r\n}\r\n\r\n.btn {\r\n  padding: 10px 20px;\r\n  font-weight: 600;\r\n  border-radius: 4px;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.btn-cancel {\r\n  background-color: #adb5bd;\r\n  color: white;\r\n}\r\n\r\n.btn-save {\r\n  background-color: #28a745;\r\n  color: white;\r\n}\r\n\r\n.btn-save:disabled {\r\n  opacity: 0.6;\r\n  cursor: not-allowed;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../../../../node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************************!*\
  !*** ../../../../../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!****************************************************************************!*\
  !*** ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \****************************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/components/Dashboard.css":
/*!**************************************!*\
  !*** ./src/components/Dashboard.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Dashboard_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../../../../node_modules/css-loader/dist/cjs.js!./Dashboard.css */ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/Dashboard.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_Dashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_Dashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_Dashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_Dashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/MainDashboard.css":
/*!******************************************!*\
  !*** ./src/components/MainDashboard.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_MainDashboard_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../../../../node_modules/css-loader/dist/cjs.js!./MainDashboard.css */ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/MainDashboard.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_MainDashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_MainDashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_MainDashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_MainDashboard_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/WeeklyPlanDisplay.css":
/*!**********************************************!*\
  !*** ./src/components/WeeklyPlanDisplay.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_WeeklyPlanDisplay_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../../../../node_modules/css-loader/dist/cjs.js!./WeeklyPlanDisplay.css */ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/WeeklyPlanDisplay.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_WeeklyPlanDisplay_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_WeeklyPlanDisplay_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_WeeklyPlanDisplay_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_WeeklyPlanDisplay_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/WeeklyPlanModal.css":
/*!********************************************!*\
  !*** ./src/components/WeeklyPlanModal.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_WeeklyPlanModal_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../../../../node_modules/css-loader/dist/cjs.js!./WeeklyPlanModal.css */ "../../../../../../node_modules/css-loader/dist/cjs.js!./src/components/WeeklyPlanModal.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_WeeklyPlanModal_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_WeeklyPlanModal_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_WeeklyPlanModal_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_WeeklyPlanModal_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!********************************************************************************************!*\
  !*** ../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!************************************************************************************!*\
  !*** ../../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**************************************************************************************!*\
  !*** ../../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**************************************************************************************************!*\
  !*** ../../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!*******************************************************************************!*\
  !*** ../../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*************************************************************************************!*\
  !*** ../../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "immutable":
/*!****************************!*\
  !*** external "Immutable" ***!
  \****************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_immutable__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "cs-web-components-base":
/*!*****************************************!*\
  !*** external "cs-web-components-base" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_cs_web_components_base__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cs-web-components-base */ "cs-web-components-base");
/* harmony import */ var cs_web_components_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cs_web_components_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
/* harmony import */ var _reducers_reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers/reducers */ "./src/reducers/reducers.js");
/* harmony import */ var _containers_MainComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/MainComponent */ "./src/containers/MainComponent.jsx");




cs_web_components_base__WEBPACK_IMPORTED_MODULE_0__.Registry.registerComponent((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.prefixNS)('MainComponent'), _containers_MainComponent__WEBPACK_IMPORTED_MODULE_3__["default"]);
cs_web_components_base__WEBPACK_IMPORTED_MODULE_0__.Registry.registerReducer((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.prefixNS)('reducer'), _reducers_reducers__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  MainComponent: _containers_MainComponent__WEBPACK_IMPORTED_MODULE_3__["default"]
  // CSVUploadWidget,
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=kalyani-iot-ppc-forging.dev.e21ec323f38bf0aeb921.js.map