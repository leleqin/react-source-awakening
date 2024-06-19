/**
 * @name 给 DOM 元素设置属性
 * @param {object} newElement 新的 DOM 元素
 * @param {object} virtualDOM
 */
export default function updateNodeElement(newElement, virtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props;
  Object.keys(newProps).forEach((propName) => {
    // 获取属性值
    const newPropsValue = newProps[propName];
    // 判断属性是否为事件
    if (propName.slice(0, 2) === "on") {
      const eventName = propName.toLowerCase().slice(2);
      newElement.addEventListener(eventName, newPropsValue);
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
  });
}
