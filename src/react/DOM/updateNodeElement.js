/**
 * @name 给 DOM 元素设置属性
 * @param {object} newElement 新的 DOM 元素
 * @param {object} virtualDOM 新的 virtual DOM
 * @param {object} oldVirtualDOM 旧的 virtual DOM
 */
export default function updateNodeElement(
  newElement,
  virtualDOM,
  oldVirtualDOM = {}
) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {};

  /**
   * 文本节点处理
   */
  if (virtualDOM.type === "text") {
    if (newProps.textContent !== oldProps.textContent) {
      // 处理父节点类型更新的情况
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(
          document.createTextNode(newProps.textContent)
        );
      } else {
        // 父节点相同，替换文本
        virtualDOM.parent.stateNode.replaceChild(
          document.createTextNode(newProps.textContent),
          oldVirtualDOM.stateNode
        );
      }
    }
    return;
  }

  Object.keys(newProps).forEach((propName) => {
    // 获取属性值
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否为事件
      if (propName.slice(0, 2) === "on") {
        const eventName = propName.toLowerCase().slice(2);
        newElement.addEventListener(eventName, newPropsValue);
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === "value" || propName === "checked") {
        newElement[propName] = newPropsValue;
      } else if (propName !== "children") {
        // 刨除 children 属性
        if (propName === "className") {
          newElement.setAttribute("class", newPropsValue);
        } else {
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  });

  /** 属性删除 */
  Object.keys(oldProps).forEach((propsName) => {
    // 获取属性值
    const newPropsValue = newProps[propsName];
    const oldPropsValue = oldProps[propsName];
    // 属性被删除
    if (!newPropsValue) {
      if (propsName.slice(0, 2) === "on") {
        const eventName = propsName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (propsName !== "children") {
        newElement.removeAttribute(propsName);
      }
    }
  });
}
