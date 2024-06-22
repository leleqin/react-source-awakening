import React, { render, Component } from "./react";

const root = document.getElementById("root");

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi fiber</p>
  </div>
);

render(jsx, root);

// 模拟更新操作
setTimeout(() => {
  const jsxUpdate = (
    <div>
      {/* <div>更新</div> */}
      <p>Hi fiber</p>
    </div>
  );
  render(jsxUpdate, root);
}, 2000);

/**
 * 渲染类组件
 */
class Grating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.title}hahaha</div>;
  }
}

// render(<Grating title="hello" />, root);

/**
 * 渲染函数组件
 */

function FnComponent(props) {
  return <div>{props.title}函数组件</div>;
}

// render(<FnComponent title="hello" />, root);
