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

import { EFFECT_TAG, FIBER_TAG } from "../../constants";
import { updateNodeElement } from "../DOM";
import {
  createTaskQueue,
  arrified,
  createStateNode,
  getTag,
  getRoot,
} from "../Misc";

const taskQueue = createTaskQueue();

// 子任务
let subTask = null;

// 拿到最外层的 fiber。为后面拿到 effects 循环构建真实 DOM 做准备
let pendingCommit = null;

/**
 * @name 生成真实 DOM 对象
 * @param {object} fiber **根节点** 的 fiber 对象
 */
const commitAllWork = (fiber) => {
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
  fiber.effects.forEach((f) => {
    // 为更新组件状态；将组件的 fiber 对象备份到组件的实例对象上
    if (f.tag === FIBER_TAG.CLASS_COMPONENT) {
      f.stateNode.__fiber = f;
    }

    if (f.effectTag === EFFECT_TAG.DELETE) {
      f.parent.stateNode.removeChild(f.stateNode);
    } else if (f.effectTag === EFFECT_TAG.UPDATE) {
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
        updateNodeElement(f.stateNode, f, f.alternate);
      } else {
        /**
         * 节点类型不同，直接替换
         * @param 新节点 stateNode
         * @param 旧节点的 stateNode
         */
        f.parent.stateNode.replaceChild(f.stateNode, f.alternate.stateNode);
      }
    } else if (f.effectTag === EFFECT_TAG.PLACEMENT) {
      /**
       * 当前要追加的子节点
       */
      let tempFiber = f;
      /**
       * 当前要追加的子节点的父级
       */
      let parentFiber = f.parent;
      while (
        parentFiber.tag === FIBER_TAG.CLASS_COMPONENT ||
        parentFiber.tag === FIBER_TAG.FUNCTION_COMPONENT
      ) {
        parentFiber = parentFiber.parent;
      }
      /**
       * 如果子节点是普通节点，找到父级，将子节点追加到父级中
       */
      if (tempFiber.tag === FIBER_TAG.COMPONENT) {
        parentFiber.stateNode.append(tempFiber.stateNode);
      }
    }
  });

  /**
   * 备份旧的 fiber 对象，以便后面更新使用
   */
  fiber.stateNode.__rootFiberContainer = fiber;
};

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();

  /**
   * 判断是否是组件更新任务
   */
  if (task.from === FIBER_TAG.CLASS_COMPONENT) {
    /**
     * 根据已经存在的最外层的 fiber 对象构建，构建更新的根节点 fiber 对象
     */
    // 获取组件 fiber 对象
    const root = getRoot(task.instance);
    // 存储要更新的状态
    task.instance.__fiber.partialState = task.partialState;
    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: FIBER_TAG.ROOT,
      effects: [],
      child: null,
      // 备份 fiber 对象
      alternate: root,
    };
  }

  // 获取根节点，返回根节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: FIBER_TAG.ROOT,
    effects: [],
    child: null,
    // 备份 fiber 对象
    alternate: task.dom.__rootFiberContainer,
  };
};

const reconcileChildren = (fiber, children) => {
  /**
   * children 可能是数组 | 对象
   * 将 children 转换为数组
   */
  const arrifiedChildren = arrified(children);
  // 拿到数组中的 virtual DOM 转化为 fiber
  let index = 0;
  let childrenLength = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  // 临时存储，用来记录上一个 fiber
  let preFiber = null;

  /**
   * 备份 fiber
   * fiber.alternate.child 是 children 数组中的第一个子节点的备份节点
   * children 数组中第一个是 child，其余的是 sibling 节点
   */
  let alternate = null;
  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child;
  }

  while (index < childrenLength || alternate) {
    element = arrifiedChildren[index];

    if (!element && alternate) {
      // 删除节点
      // 备份属性的 effectTag 设置为 delete
      alternate.effectTag = EFFECT_TAG.DELETE;
      fiber.effects.push(alternate);
    } else if (element && alternate) {
      // 更新节点
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: EFFECT_TAG.UPDATE,
        parent: fiber,
        alternate,
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
        newFiber.stateNode = createStateNode(newFiber);
      }
    } else if (element && !alternate) {
      // 新建节点
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: EFFECT_TAG.PLACEMENT,
        parent: fiber,
      };

      /**
       * 为 fiber 对象添加 DOM 对象或组件实例对象
       * 若是普通节点 stateNode 是 DOM 对象
       * 若是类组件 stateNode 是组件实例对象
       */
      newFiber.stateNode = createStateNode(newFiber);
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

const executeTask = (fiber) => {
  /**
   * 构建子级 fiber 对象
   */
  if (fiber.tag === FIBER_TAG.CLASS_COMPONENT) {
    /**
     * 更新组件状态，以便后面的 render 返回更新状态的 jsx
     */
    // 实例对象获取组件的 fiber 对象
    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState,
      };
    }
    // 类组件，children 是 render 返回的元素
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === FIBER_TAG.FUNCTION_COMPONENT) {
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
  let currentExecuterFiber = fiber;
  while (currentExecuterFiber.parent) {
    /**
     * 使最外层的 effects 存储所有 fiber 对象
     */
    currentExecuterFiber.parent.effects =
      currentExecuterFiber.parent.effects.concat(
        currentExecuterFiber.effects.concat([currentExecuterFiber])
      );

    if (currentExecuterFiber.sibling) {
      return currentExecuterFiber.sibling;
    }
    currentExecuterFiber = currentExecuterFiber.parent;
  }

  // 最外层 fiber 对象
  pendingCommit = currentExecuterFiber;
};

const workLoop = (deadline) => {
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

const performTask = (deadline) => {
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

export const render = (element, dom) => {
  // 构建 Fiber 对象，从顶层开始
  taskQueue.push({
    dom,
    props: { children: element },
  });

  // 浏览器空闲时间执行任务
  requestIdleCallback(performTask);
};

/**
 * @name 更新状态
 * @param {*} instance 组件实例对象
 * @param {*} partialState 要更新的值
 */
export const scheduleUpdate = (instance, partialState) => {
  // 将 partialState 的值覆盖原本的值
  /**
   * 1. 将组件状态更新加入任务
   * 2. 和其他任务做区分 from
   */
  taskQueue.push({
    from: FIBER_TAG.CLASS_COMPONENT,
    instance,
    partialState,
  });

  // 浏览器空闲时间执行任务
  requestIdleCallback(performTask);
};
