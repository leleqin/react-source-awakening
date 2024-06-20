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
  CLASS_COMPONENT: "class_component"
};
var EFFECT_TAG = {
  PLACEMENT: "placement"
};
var VIRTUAL_DOM_TYPE = {
  TEXT: "text"
};

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
 * @param {object} virtualDOM
 */
function updateNodeElement(newElement, virtualDOM) {
  // 获取节点对应的属性对象
  var newProps = virtualDOM.props;
  Object.keys(newProps).forEach(function (propName) {
    // 获取属性值
    var newPropsValue = newProps[propName];
    // 判断属性是否为事件
    if (propName.slice(0, 2) === "on") {
      var eventName = propName.toLowerCase().slice(2);
      newElement.addEventListener(eventName, newPropsValue);
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


var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.COMPONENT) {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.createDOMElement)(fiber);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

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

var getTag = function getTag(virtualDOM) {
  // 普通节点
  if (typeof virtualDOM.type === "string") {
    return _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.COMPONENT;
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
/* harmony export */   getTag: () => (/* reexport safe */ _getTag__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrified__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrified */ "./src/react/Misc/Arrified/index.js");
/* harmony import */ var _createStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createStateNode */ "./src/react/Misc/createStateNode/index.js");
/* harmony import */ var _getTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTag */ "./src/react/Misc/getTag/index.js");





/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   render: () => (/* reexport safe */ _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render)
/* harmony export */ });
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ "./src/react/CreateElement/index.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");


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
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.js");
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");
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



var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createTaskQueue)();

// 子任务
var subTask = null;
var getFirstTask = function getFirstTask() {
  // 从任务队列中获取任务
  var task = taskQueue.pop();

  // 获取根节点，返回根节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: _constants__WEBPACK_IMPORTED_MODULE_0__.FIBER_TAG.ROOT,
    effects: [],
    child: null
  };
};
var reconcileChildren = function reconcileChildren(fiber, children) {
  /**
   * children 可能是数组 | 对象
   * 将 children 转换为数组
   */
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.arrified)(children);
  // 拿到数组中的 virtual DOM 转化为 fiber
  var index = 0;
  var childrenLength = arrifiedChildren.length;
  var element = null;
  var newFiber = null;
  // 临时存储，用来记录上一个 fiber
  var preFiber = null;
  while (index < childrenLength) {
    element = arrifiedChildren[index];
    newFiber = {
      type: element.type,
      props: element.props,
      tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.getTag)(element),
      effects: [],
      effectTag: _constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TAG.PLACEMENT,
      parent: fiber
    };

    /**
     * 为 fiber 对象添加 DOM 对象或组件实例对象
     */
    newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_1__.createStateNode)(newFiber);

    // 判断当前 fiber 是上一个 fiber 的 parent 还是 sibling
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      // 如果不是第一个 child，说明其他的 child 是上一个 child 的 sibling
      preFiber.sibling = newFiber;
    }
    preFiber = newFiber;
    index++;
  }
};
var executeTask = function executeTask(fiber) {
  /**
   * 构建子级 fiber 对象
   */
  reconcileChildren(fiber, fiber.props.children);
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
  console.log(fiber);
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

var root = document.getElementById("root");
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello React"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hi fiber"));
(0,_react__WEBPACK_IMPORTED_MODULE_0__.render)(jsx, root);
/******/ })()
;
//# sourceMappingURL=bundle.js.map