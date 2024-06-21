import { FIBER_TAG } from "../../../constants";

export const createReactInstance = (fiber) => {
  let instance = null;
  if (fiber.tag === FIBER_TAG.CLASS_COMPONENT) {
    // 类组件, type 函数中存储的是构造函数
    instance = new fiber.type(fiber.props);
  } else {
    // 函数组件
    instance = fiber.type;
  }

  return instance;
};
