/**
 * @name 创建 Virtual DOM
 * @param {string} type 元素类型
 * @param {object | null} props 元素属性
 * @param  {createElement[]} children 元素的子元素
 * @returns {object} Virtual DOM
 *
 *  1. 处理文本节点结构，需要返回 Virtual DOM 结构
 *  2. 处理逻辑节点，刨除 bool 节点和 null 节点
 *  3. 通过 props 的 children 属性拿到子节点，将 children 放入 props 中
 */
export default function createElement(type, props, ...children) {
  const childElement = [].concat(...children).reduce((result, child) => {
    // 刨除 bool 节点和 null 节点
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) result.push(child);
      else result.push(createElement("text", { textContent: child }));
    }
    return result;
  }, []);
  return {
    type,
    props: Object.assign({ children: childElement }, props),
  };
  // {
  //   type: "div",
  //   props: null,
  //   children: [{type: 'text', props: {textContent: "Hello"}}]
  // }
}
