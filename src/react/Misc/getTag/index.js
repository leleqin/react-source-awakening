import { FIBER_TAG } from "../../../constants";

const getTag = (virtualDOM) => {
  // 普通节点
  if (typeof virtualDOM.type === "string") {
    return FIBER_TAG.COMPONENT;
  }
};

export default getTag;
