import { FIBER_TAG } from "../../../constants";
import { Component } from "../../Component";

const getTag = (virtualDOM) => {
  // 普通节点
  if (typeof virtualDOM.type === "string") {
    return FIBER_TAG.COMPONENT;
  } else if (Object.getPrototypeOf(virtualDOM.type) === Component) {
    // 类组件节点
    return FIBER_TAG.CLASS_COMPONENT;
  } else {
    // 函数组件
    return FIBER_TAG.FUNCTION_COMPONENT;
  }
};

export default getTag;
