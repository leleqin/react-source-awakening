import { FIBER_TAG } from "../../../constants";
import { createDOMElement } from "../../DOM";

const createStateNode = (fiber) => {
  if (fiber.tag === FIBER_TAG.COMPONENT) {
    return createDOMElement(fiber);
  }
};

export default createStateNode;
