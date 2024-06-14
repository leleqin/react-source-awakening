/**
 *
 * @param {*} element
 * @param {*} dom
 *
 * 1. 向任务队列中添加任务
 *  - 任务：通过 Virtual DOM 构建 Fiber 对象
 * 2. 指定在浏览器空闲时间执行
 */

import { createTaskQueue } from "../Misc";

const taskQueue = createTaskQueue();

export const render = (element, dom) => {
  // 构建 Fiber 对象，从顶层开始
  taskQueue.push({
    dom,
    props: { children: element },
  });

  console.log(taskQueue.pop());
};
