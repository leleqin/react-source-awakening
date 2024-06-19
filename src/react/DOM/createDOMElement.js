import { VIRTUAL_DOM_TYPE } from "../../constants";
import updateNodeElement from "./updateNodeElement";

const createDOMElement = (virtualDOM) => {
  let newElement = null;
  if (virtualDOM.type === VIRTUAL_DOM_TYPE.TEXT) {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type);
    updateNodeElement(newElement, virtualDOM);
  }
  return newElement;
};

export default createDOMElement;
