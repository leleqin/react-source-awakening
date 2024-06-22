/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EFFECT_TAG: () => (/* binding */ EFFECT_TAG),
/* harmony export */   FIBER_TAG: () => (/* binding */ FIBER_TAG),
/* harmony export */   VIRTUAL_DOM_TYPE: () => (/* binding */ VIRTUAL_DOM_TYPE)
/* harmony export */ });
var FIBER_TAG = {
  ROOT: "host_root",
  COMPONENT: "host_component",
  CLASS_COMPONENT: "class_component",
  FUNCTION_COMPONENT: "function_component"
};
var EFFECT_TAG = {
  PLACEMENT: "placement",
  UPDATE: "update",
  DELETE: "delete"
};
var VIRTUAL_DOM_TYPE = {
  TEXT: "text"
};

/***/ }),

/***/ "./src/react/Component/index.js":
/*!**************************************!*\
  !*** ./src/react/Component/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reconciliation */ "./src/react/reconciliation/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);
    this.props = props;
  }
  return _createClass(Component, [{
    key: "setState",
    value: function setState(partialState) {
      (0,_reconciliation__WEBPACK_IMPORTED_MODULE_0__.scheduleUpdate)(this, partialState);
    }
  }]);
}();

/***/ }),

/***/ "./src/react/CreateElement/index.js":
/*!******************************************!*\
  !*** ./src/react/CreateElement/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
/**
 * @name 创建 Virtual DOM
 * @param {string} type 元素类型
 * @param {object | null} props 元素属性
 * @param  {createElement[]} children 元素的子元素
 * @returns {object} Virtual DOM
 *
 *  1. 处理文本节点结构，需要返回 Virtual DOM 结构
 *  2. 处理逻辑节点，刨除 bool 节点和 null 节点
 *  3. 通过 props 的 children 属性拿到子节点，将 children 放入 props 中
 */
function createElement(type, props) {
  var _ref;
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  var childElement = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    // 刨除 bool 节点和 null 节点
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) result.push(child);else result.push(createElement("text", {
        textContent: child
      }));
    }
    return result;
  }, []);
  return {
    type: type,
    props: Object.assign({
      children: childElement
    }, props)
  };
  // {
  //   type: "div",
  //   props: null,
  //   children: [{type: 'text', props: {textContent: "Hello"}}]
  // }
}

/***/ }),

/***/ "./src/react/DOM/createDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.js");
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");


var createDOMElement = function createDOMElement(virtualDOM) {
  var newElement = null;
  if (virtualDOM.type === _constants__WEBPACK_IMPORTED_MODULE_0__.VIRTUAL_DOM_TYPE.TEXT) {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type);
    (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_1__["default"])(newElement, virtualDOM);
  }
  return newElement;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDOMElement);

/***/ }),

/***/ "./src/react/DOM/index.js":
/*!********************************!*\
  !*** ./src/react/DOM/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDOMElement: () => (/* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   updateNodeElement: () => (/* reexport safe */ _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.js");
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");



/***/ }),

/***/ "./src/react/DOM/updateNodeElement.js":
/*!********************************************!*\
  !*** ./src/react/DOM/updateNodeElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateNodeElement)
/* harmony export */ });
/**
 * @name 给 DOM 元素设置属性
 * @param {object} newElement 新的 DOM 元素
 * @param {object} virtualDOM 新的 virtual DOM
 * @param {object} oldVirtualDOM 旧的 virtual DOM
 */
function updateNodeElement(newElement, virtualDOM) {
  var oldVirtualDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // 获取节点对应的属性对象
  var newProps = virtualDOM.props || {};
  var oldProps = oldVirtualDOM.props || {};

  /**
   * 文本节点处理
   */
  if (virtualDOM.type === "text") {
    if (newProps.textContent !== oldProps.textContent) {
      // 处理父节点类型更新的情况
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent));
      } else {
        // 父节点相同，替换文本
        virtualDOM.parent.stateNode.replaceChild(document.createTextNode(newProps.textContent), oldVirtualDOM.stateNode);
      }
    }
    return;
  }
  Object.keys(newProps).forEach(function (propName) {
    // 获取属性值
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];
    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否为事件
      if (propName.slice(0, 2) === "on") {
        var eventName = propName.toLowerCase().slice(2);
        newElement.addEventListener(eventName, newPropsValue);
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === "value" || propName === "checked") {
        newElement[propName] = newPropsValue;
      } else if (propName !== "children") {
        // 刨除 children 属性
        if (propName === "className") {
          newElement.setAttribute("class", newPropsValue);
        } else {
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  });

  /** 属性删除 */
  Object.keys(oldProps).forEach(function (propsName) {
    // 获取属性值
    var newPropsValue = newProps[propsName];
    var oldPropsValue = oldProps[propsName];
    // 属性被删除
    if (!newPropsValue) {
      if (propsName.slice(0, 2) === "on") {
        var eventName = propsName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (propsName !== "children") {
        newElement.removeAttribute(propsName);
      }
    }
  });
}

/***/ }),

/***/ "./src/react/Misc/Arrified/index.js":
/*!******************************************!*\
  !*** ./src/react/Misc/Arrified/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var arrified = function arrified(arg) {
  return Array.isArray(arg) ? arg : [arg];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrified);

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var createTaskQueue = function createTaskQueue() {
  var taskQueue = [];
  return {
    /**
     * @name 添加任务
     * @param {object} item
     */
    push: function push(item) {
      return taskQueue.push(item);
    },
    pop: function pop() {
      return taskQueue.shift();
    },
    /**
     * 判断当前任务队列是否为空
     */
    isEmpty: function isEmpty() {
      return taskQueue.length === 0;
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTaskQueue);

/***/ }),

/***/ "./src/react/Misc/createReactInstance/index.js":
/*!*****************************************************!*\
  !*** ./src/react/Misc/createReactInstance/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createReactInstance: () => (/* binding */ createReactInstance)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ "./src/constants/index.js");

var createReactInstance = function createReactInstance(fiber) {
  var instance = null;
  if (fiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.CLASS_COMPONENT) {
    // 类组件, type 函数中存储的是构造函数
    instance = new fiber.type(fiber.props);
  } else {
    // 函数组件
    instance = fiber.type;
  }
  return instance;
};

/***/ }),

/***/ "./src/react/Misc/createStateNode/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/createStateNode/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ "./src/constants/index.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _createReactInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../createReactInstance */ "./src/react/Misc/createReactInstance/index.js");



var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.COMPONENT) {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.createDOMElement)(fiber);
  } else {
    // 区别类组件和函数组件
    return (0,_createReactInstance__WEBPACK_IMPORTED_MODULE_2__.createReactInstance)(fiber);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/getRoot/index.js":
/*!*****************************************!*\
  !*** ./src/react/Misc/getRoot/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getRoot = function getRoot(instance) {
  var fiber = instance.__fiber;
  // 获取根节点的 fiber 对象
  while (fiber.parent) {
    fiber = fiber.parent;
  }
  return fiber;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRoot);

/***/ }),

/***/ "./src/react/Misc/getTag/index.js":
/*!****************************************!*\
  !*** ./src/react/Misc/getTag/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ "./src/constants/index.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Component */ "./src/react/Component/index.js");


var getTag = function getTag(virtualDOM) {
  // 普通节点
  if (typeof virtualDOM.type === "string") {
    return _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.COMPONENT;
  } else if (Object.getPrototypeOf(virtualDOM.type) === _Component__WEBPACK_IMPORTED_MODULE_1__.Component) {
    // 类组件节点
    return _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.CLASS_COMPONENT;
  } else {
    // 函数组件
    return _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.FUNCTION_COMPONENT;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.js":
/*!*********************************!*\
  !*** ./src/react/Misc/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrified: () => (/* reexport safe */ _Arrified__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   createStateNode: () => (/* reexport safe */ _createStateNode__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   createTaskQueue: () => (/* reexport safe */ _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   getRoot: () => (/* reexport safe */ _getRoot__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   getTag: () => (/* reexport safe */ _getTag__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrified__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrified */ "./src/react/Misc/Arrified/index.js");
/* harmony import */ var _createStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createStateNode */ "./src/react/Misc/createStateNode/index.js");
/* harmony import */ var _getTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTag */ "./src/react/Misc/getTag/index.js");
/* harmony import */ var _getRoot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getRoot */ "./src/react/Misc/getRoot/index.js");






/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_2__.Component),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   render: () => (/* reexport safe */ _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render)
/* harmony export */ });
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ "./src/react/CreateElement/index.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ "./src/react/Component/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _CreateElement__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   scheduleUpdate: () => (/* binding */ scheduleUpdate)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 *
 * @param {*} element
 * @param {*} dom
 *
 * 1. 向任务队列中添加任务
 *  - 任务：通过 Virtual DOM 构建 Fiber 对象
 * 2. 指定在浏览器空闲时间执行 requestIdleCallback
 *  - a. 执行任务
 *  - b. 判断是否任务中断或者 taskQueue 有任务，再次使浏览器在空闲时间执行任务
 */




var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_2__.createTaskQueue)();

// 子任务
var subTask = null;

// 拿到最外层的 fiber。为后面拿到 effects 循环构建真实 DOM 做准备
var pendingCommit = null;

/**
 * @name 生成真实 DOM 对象
 * @param {object} fiber **根节点** 的 fiber 对象
 */
var commitAllWork = function commitAllWork(fiber) {
  /**
   * 遍历所有 fiber 对象，即 effects 数组。构建真实 DOM 对象
   *
   * 1. 普通节点
   * 最外层的 fiber 对象包含所有元素的 fiber 对象
   *
   * 2. 类组件节点
   * 类组件本身无法追加真实 DOM。需要找到类组件的普通父级，
   * 往 DOM 元素中追加类组件返回的内容
   *
   * 3. 函数组件节点
   * 同类组件，找到函数组件的普通父级
   */
  fiber.effects.forEach(function (f) {
    // 为更新组件状态；将组件的 fiber 对象备份到组件的实例对象上
    if (f.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.CLASS_COMPONENT) {
      f.stateNode.__fiber = f;
    }
    if (f.effectTag === _constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TAG.DELETE) {
      f.parent.stateNode.removeChild(f.stateNode);
    } else if (f.effectTag === _constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TAG.UPDATE) {
      /**
       * 判断是不是同一种类型节点
       */
      if (f.type === f.alternate.type) {
        /**
         * 节点类型相同，更新 DOM
         * @param 要更新的 DOM 节点
         * @param 新的 virtual DOM
         * @param 旧的 virtual DOM
         */
        (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.updateNodeElement)(f.stateNode, f, f.alternate);
      } else {
        /**
         * 节点类型不同，直接替换
         * @param 新节点 stateNode
         * @param 旧节点的 stateNode
         */
        f.parent.stateNode.replaceChild(f.stateNode, f.alternate.stateNode);
      }
    } else if (f.effectTag === _constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TAG.PLACEMENT) {
      /**
       * 当前要追加的子节点
       */
      var tempFiber = f;
      /**
       * 当前要追加的子节点的父级
       */
      var parentFiber = f.parent;
      while (parentFiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.CLASS_COMPONENT || parentFiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.FUNCTION_COMPONENT) {
        parentFiber = parentFiber.parent;
      }
      /**
       * 如果子节点是普通节点，找到父级，将子节点追加到父级中
       */
      if (tempFiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.COMPONENT) {
        parentFiber.stateNode.append(tempFiber.stateNode);
      }
    }
  });

  /**
   * 备份旧的 fiber 对象，以便后面更新使用
   */
  fiber.stateNode.__rootFiberContainer = fiber;
};
var getFirstTask = function getFirstTask() {
  // 从任务队列中获取任务
  var task = taskQueue.pop();

  /**
   * 判断是否是组件更新任务
   */
  if (task.from === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.CLASS_COMPONENT) {
    /**
     * 根据已经存在的最外层的 fiber 对象构建，构建更新的根节点 fiber 对象
     */
    // 获取组件 fiber 对象
    var root = (0,_Misc__WEBPACK_IMPORTED_MODULE_2__.getRoot)(task.instance);
    // 存储要更新的状态
    task.instance.__fiber.partialState = task.partialState;
    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.ROOT,
      effects: [],
      child: null,
      // 备份 fiber 对象
      alternate: root
    };
  }

  // 获取根节点，返回根节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.ROOT,
    effects: [],
    child: null,
    // 备份 fiber 对象
    alternate: task.dom.__rootFiberContainer
  };
};
var reconcileChildren = function reconcileChildren(fiber, children) {
  /**
   * children 可能是数组 | 对象
   * 将 children 转换为数组
   */
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_2__.arrified)(children);
  // 拿到数组中的 virtual DOM 转化为 fiber
  var index = 0;
  var childrenLength = arrifiedChildren.length;
  var element = null;
  var newFiber = null;
  // 临时存储，用来记录上一个 fiber
  var preFiber = null;

  /**
   * 备份 fiber
   * fiber.alternate.child 是 children 数组中的第一个子节点的备份节点
   * children 数组中第一个是 child，其余的是 sibling 节点
   */
  var alternate = null;
  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child;
  }
  while (index < childrenLength || alternate) {
    element = arrifiedChildren[index];
    if (!element && alternate) {
      // 删除节点
      // 备份属性的 effectTag 设置为 delete
      alternate.effectTag = _constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TAG.DELETE;
      fiber.effects.push(alternate);
    } else if (element && alternate) {
      // 更新节点
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_2__.getTag)(element),
        effects: [],
        effectTag: _constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TAG.UPDATE,
        parent: fiber,
        alternate: alternate
      };
      if (element.type === alternate.type) {
        /**
         * 类型相同
         * 旧的 stateNode 直接赋值给新的 stateNode
         */
        newFiber.stateNode = alternate.stateNode;
      } else {
        /**
         * 类型不同
         * 直接创建节点
         */
        newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_2__.createStateNode)(newFiber);
      }
    } else if (element && !alternate) {
      // 新建节点
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_2__.getTag)(element),
        effects: [],
        effectTag: _constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TAG.PLACEMENT,
        parent: fiber
      };

      /**
       * 为 fiber 对象添加 DOM 对象或组件实例对象
       * 若是普通节点 stateNode 是 DOM 对象
       * 若是类组件 stateNode 是组件实例对象
       */
      newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_2__.createStateNode)(newFiber);
    }

    // 判断当前 fiber 是上一个 fiber 的 parent 还是 sibling
    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      // 如果不是第一个 child，说明其他的 child 是上一个 child 的 sibling
      preFiber.sibling = newFiber;
    }

    // 更新备份节点，兄弟节点备份
    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }
    preFiber = newFiber;
    index++;
  }
};
var executeTask = function executeTask(fiber) {
  /**
   * 构建子级 fiber 对象
   */
  if (fiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.CLASS_COMPONENT) {
    /**
     * 更新组件状态，以便后面的 render 返回更新状态的 jsx
     */
    // 实例对象获取组件的 fiber 对象
    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = _objectSpread(_objectSpread({}, fiber.stateNode.state), fiber.stateNode.__fiber.partialState);
    }
    // 类组件，children 是 render 返回的元素
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.FUNCTION_COMPONENT) {
    // 函数组件，children 是 render 返回的元素
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }
  /**
   * 如果子级存在 返回子级
   * 将这个子级当作父级 构建这个父级下的子级
   * 一直递归下去，能得到所有左侧节点的 fiber 对象
   */
  if (fiber.child) {
    return fiber.child;
  }

  /**
   * 如果有同级 返回同级
   * 如果有父级 退回到父级,再看父级有没有同级
   * 保证每个节点都找到了
   */
  var currentExecuterFiber = fiber;
  while (currentExecuterFiber.parent) {
    /**
     * 使最外层的 effects 存储所有 fiber 对象
     */
    currentExecuterFiber.parent.effects = currentExecuterFiber.parent.effects.concat(currentExecuterFiber.effects.concat([currentExecuterFiber]));
    if (currentExecuterFiber.sibling) {
      return currentExecuterFiber.sibling;
    }
    currentExecuterFiber = currentExecuterFiber.parent;
  }

  // 最外层 fiber 对象
  pendingCommit = currentExecuterFiber;
};
var workLoop = function workLoop(deadline) {
  if (!subTask) {
    // 若当前无任务，获取执行任务
    subTask = getFirstTask();
  }

  // 当有任务并且空闲时间大于 1 ms 时执行任务
  while (subTask && deadline.timeRemaining() > 1) {
    // 执行任务 并返回一个新任务 while 执行
    subTask = executeTask(subTask);
  }

  /**
   * 判断
   */
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};
var performTask = function performTask(deadline) {
  // 执行任务队列
  workLoop(deadline);

  /**
   * 判断任务是否存在
   * 当任务被中断时，需要重新判断执行的任务是否有中断
   * 或者 taskQueue 有任务
   * 告知浏览器在空闲时间继续执行
   */
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};
var render = function render(element, dom) {
  // 构建 Fiber 对象，从顶层开始
  taskQueue.push({
    dom: dom,
    props: {
      children: element
    }
  });

  // 浏览器空闲时间执行任务
  requestIdleCallback(performTask);
};

/**
 * @name 更新状态
 * @param {*} instance 组件实例对象
 * @param {*} partialState 要更新的值
 */
var scheduleUpdate = function scheduleUpdate(instance, partialState) {
  // 将 partialState 的值覆盖原本的值
  /**
   * 1. 将组件状态更新加入任务
   * 2. 和其他任务做区分 from
   */
  taskQueue.push({
    from: _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.CLASS_COMPONENT,
    instance: instance,
    partialState: partialState
  });

  // 浏览器空闲时间执行任务
  requestIdleCallback(performTask);
};

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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ "./src/react/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var root = document.getElementById("root");
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello React"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hi fiber"));

// render(jsx, root);

// // 模拟更新操作
// setTimeout(() => {
//   const jsxUpdate = (
//     <div>
//       {/* <div>更新</div> */}
//       <p>Hi fiber</p>
//     </div>
//   );
//   render(jsxUpdate, root);
// }, 2000);

/**
 * 渲染类组件
 */
var Grating = /*#__PURE__*/function (_Component) {
  function Grating(props) {
    var _this;
    _classCallCheck(this, Grating);
    _this = _callSuper(this, Grating, [props]);
    _this.state = {
      name: "张三"
    };
    return _this;
  }
  _inherits(Grating, _Component);
  return _createClass(Grating, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, this.props.title, "hahaha", this.state.name, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.setState({
            name: "李四"
          });
        }
      }, "button"));
    }
  }]);
}(_react__WEBPACK_IMPORTED_MODULE_0__.Component);
(0,_react__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(Grating, {
  title: "hello"
}), root);

/**
 * 渲染函数组件
 */

function FnComponent(props) {
  return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, props.title, "\u51FD\u6570\u7EC4\u4EF6");
}

// render(<FnComponent title="hello" />, root);
/******/ })()
;
//# sourceMappingURL=bundle.js.map