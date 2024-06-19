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
import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc";

const taskQueue = createTaskQueue();

// 子任务
let subTask = null;

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();

  // 获取根节点，返回根节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: FIBER_TAG.ROOT,
    effect: [],
    child: null,
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

  while (index < childrenLength) {
    element = arrifiedChildren[index];
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
     */
    newFiber.stateNode = createStateNode(newFiber);

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

const executeTask = (fiber) => {
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
  let currentExecuterFiber = fiber;
  while (currentExecuterFiber.parent) {
    if (currentExecuterFiber.sibling) {
      return currentExecuterFiber.sibling;
    }
    currentExecuterFiber = currentExecuterFiber.parent;
  }
  console.log(fiber);
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
