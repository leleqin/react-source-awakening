const getRoot = (instance) => {
  let fiber = instance.__fiber;
  // 获取根节点的 fiber 对象
  while (fiber.parent) {
    fiber = fiber.parent;
  }
  return fiber;
};

export default getRoot;
