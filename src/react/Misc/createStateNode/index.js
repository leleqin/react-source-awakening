import { FIBER_TAG } from "../../../constants";
import { createDOMElement } from "../../DOM";
import { createReactInstance } from "../createReactInstance";

const createStateNode = (fiber) => {
  if (fiber.tag === FIBER_TAG.COMPONENT) {
    return createDOMElement(fiber);
  } else {
    // 区别类组件和函数组件
    return createReactInstance(fiber);
  }
};

export default createStateNode;
