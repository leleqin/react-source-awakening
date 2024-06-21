import React, { render, Component } from "./react";

const root = document.getElementById("root");

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi fiber</p>
  </div>
);

// render(jsx, root);

/**
 * 渲染类组件
 */
class Grating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>hahaha</div>;
  }
}

render(<Grating />, root);
