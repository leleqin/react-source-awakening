const createTaskQueue = () => {
  const taskQueue = [];

  return {
    /**
     * @name 添加任务
     * @param {object} item
     */
    push: (item) => taskQueue.push(item),

    pop: () => taskQueue.shift(),
    /**
     * 判断当前任务队列是否为空
     */
    isEmpty: () => taskQueue.length === 0,
  };
};

export default createTaskQueue;
