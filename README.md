# react-source-awakening

安装一些依赖

- `webpack` 打包工具
- `webpack-cli` 在命令行中运行 webpack
- `webpack-node-externals` 告诉 webpack 打包的时候不要打包 node_modules 模块
- `@babel/core` JS 转换工具
- `@babel/preset-env` babel 预置，将 JS 高级语法转化为浏览器可识别的语法
- `@babel/preset-react` 转换 JSX 语法
- `babel-loader` 能够使 webpack 调用 babel
- `nodemon` 监控服务端文件变化，重启应用
- `npm-run-all` 运行多个 npm 脚本
- `express` 开启一个 web 服务器

1. requestIdleCallback

React 16 before 使用 `Stack` 存在的问题：
比对 virtualDOM 使用循环和递归比对，一旦任务开始就无法中断，长期占用了主线程，JS 是单线程，会造成页面卡顿

1. 使用 requestIdleCallback 在空闲实现
2. 循环 fiber 数组。统一获取 fiber 对象

- 最外层 effects 数组中存放所有 fiber 对象
- 构建真实 DOM 对象
- 将 DOM 添加在页面中

3. 拆任务

- virtualDOM 比对 （可终止）
  - node 操作
  - fiber[]
    - node 的父级，子级信息
- 真实 DOM 更新
  - for fiber

Fiber --> 纤维

```
{
  type           节点类型(元素，文本，组件)(具体的类型)
  props          节点属性
  stateNode      普通组件 -> 节点 DOM 对象 |  类组件 -> 组件实例对象
  tag            节点标记（hostRoot || hostComponent || classComponent || functionComponent）
  effects        数组，存储需要更改的fiber 对象
  effectTag      当前 Fiber 要被执行的操作 （增删改）
  parent         当前Fiber的父级 Fiber
  child          当亲 Fiber 的子级 Fiber
  sibling        当前 Fiber 的下一个兄弟 Fiber
  alternate      Fiber 备份 fiber 比对时使用
}
```

## 任务

问：

1. 执行什么任务

- 为每个节点构建 Fiber 对象，根据 virtual DOM 对象构建 Fiber 对象
-

2. 任务该怎样被执行

<!-- #region -->

![节点树](data:image/png;base64,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)

<!-- #endregion -->

### 1.

## 更新节点

1. 备份旧的 fiber 对象，即 alternate 属性

### 组件状态更新

1. 将组件状态更新当做一个任务，放在任务队列里
2. 区分渲染和更新任务

- 在任务对象中添加一个字符串标识
- 添加组件的实例对象和组件的状态对象
  1. 从组件的实例对象中获取原本的状态对象

3. 从根节点为每个节点重新构建 fiber 对象；从而创建出更新操作的 fiber 对象

- 从已经存在的根节点的 fiber 对象，构建更新的根节点 fiber 对象
- 组件的 fiber 对象备份到组件的实例对象上
  1. 在组件状态更新的时候，可以获取到组件的实例对象
  2. 通过组件的实例对象获取组件的 fiber 对象
  3. 通过组件的 fiber 对象，可以一层一层向上查找
  4. 获取最外层的 fiber 对象

4. 进行到 fiber 的第二个阶段时，将更新应用到真实的 DOM 中

https://7km.top/main/macro-structure/

## React 架构

有两大 workLoop

1. 任务调度循环 (Scheduler 调度层) -> `packages/scheduler`
   是 React 得以运行的保证，它需要循环调用，控制所有 task 的调度。保证在**浏览器的空闲时间**执行
2. fiber 构造循环 (Reconciler 协调层)
   控制 fiber 树的构造；找出节点差异，并标记差异。从上至下，使用树的深度优先(DFS)遍历

- 渲染层（Renderer）
  根据 fiber 节点执行操作。渲染工作不可被打断。

fiber 树构造循环属于任务调度循环里的一个 task。每个任务都会重新构造一个 fiber 树。

React 在输入到输出的链路上做了很多优化策略，使**任务循环调度**和**fiber 构造循环**相互配合，就可以实现可中断渲染

### fiber 构造循环

分为两步

1. 构造 fiber 树。

内存里会同时存在两棵 fiber 树 （参照下面的 **双缓存技术**）

a. 当前界面的 fiber 树。(挂载到 fiberRoot.current)。初次构造，页面还没有渲染，这个树为 null，`fiberRoot.current = null`。

b. 正在构造的 fiber 树。(挂载到 HostRootFiber.alternate)。当构造完成，重新渲染页面，使 `fiberRoot.current` 重新指向代表当前页面的 fiber 树。

- 初次创建：在 React 应用首次启动时，页面还没有渲染，此时不会比对，直接构造一颗全新的树。
- 对比更新：已经渲染，发生更新。用旧的 fiber 和新的 ReactElement 比较，生成新的 fiber；最后的树，可能是全新的，也可能是部分更新的
  - 不是两颗 fiber 树比较，而是旧的 fiber 和新的 ReactElement 比较。结果生成新的 fiber 子节点。
  - 对比中，有一些闭包中的全局变量，会随着 fiber 树构造循环的进行而变化
  - diff 算法（调和算法）。为了复用节点。类型一致的节点才有继续 diff 的必要性。作用：给新增,移动,和删除节点设置 `fiber.flags`, 给要删除的 fiber，将其添加到父节点的 effects 中。
    - 单节点：如果 key 和 type 都相同，则复用；否则新建
    - 多节点：多节点一般会存在两轮遍历，第一轮寻找公共序列，第二轮遍历剩余非公共序列

#### `fiberRoot` 和 `HostRootFiber` 的关系

`fiberRoot`: 表示 Fiber 数据结构对象，是 Fiber 数据结构中最外层对象。
`HostRootFiber`: 表示组件挂载点对应的 Fiber 对象。比如 React 应用中默认的组件挂载点就是 id 为 root 的 div。react 应用的首个 fiber 对象。

- fiberRoot 包含 rootFiber；在 fiberRoot 的 current 属性中存储 rootFiber。
- rootFiber 指向 fiberRoot；在 rootFiber 的 stateNode 属性。指向 fiberRoot。
- 在 React 中 fiberRoot 只有一个，rootFiber 可以有多个；因为 render 的方法可以调用多次。

![`fiberRoot` 和 `HostRootFiber` 的关系](./images/fiberRoot.png)

#### 构建过程

使用深度优先遍历，每个 fiber 都会经历两个阶段

- 探寻阶段 beginWork
  - 根据 ReactElement 对象创建所有的 fiber 节点
  - 最终构造出 fiber 树形结构，设置 parent，sibling
  - 设置 `fiber.flags`，标记节点更新状态，等待 completeWork 阶段处理
  - 设置 `fiber.stateNode`
    - `ClassComponent`
    - `function`
    - `HostComponent` 如 div，span，button 等
- 回溯阶段 completeWork
  - 给 fiber 节点创建 DOM 实例
  - 把当前 fiber 的 effects 添加到父节点的 effects 中
  - 根据 `fiber.flags` 识别，将当前 fiber 加入到父节点的 effects 队列，等待 commit 阶段处理

2. commitRoot。把最终的 fiber 树，渲染到页面上。

### ReactElement, Fiber, DOM 三者的关系

- ReactElement 是将 jsx 代码通过 Babel 之类的工具编译转换生成的一个虚拟对象。底层是 React.createElement(...)
- Fiber 是根据 ReactElement 对象进行创建的，多个 fiber 对象构成了一颗 fiber 树；fiber 树是构造 DOM 树的数据模型。fiber 树的改动都会体现到 DOM 树。
- DOM 文档对象模型。JavaScript 可以访问和操作的对象，进而触发 UI 渲染。

### 优先级

#### 渲染优先级

#### 调度优先级

### 双缓存技术

为了更快速的 DOM 更新。

在 React 中，使用双缓存技术完成 Fiber 树的构建与替换，实现 DOM 对象的快速更新。

#### 实现思路

1. React 中最多会同时存在两棵 Fiber 树。

- 当前屏幕中的树 ---> `current Fiber` 树
- 当发生更新时，React 重新构建新的 Fiber 树 ---> `workInProgress Fiber` 树

2. `workInProgress Fiber` 树是即将要显示的树，构建完成后，直接替换 `current Fiber` 树

- `workInProgress Fiber` 树中有些没有改变的内容是可以使用 `current Fiber` 树的。所以需要给两者之间建立关联关系
- `current Fiber` 对象的 `alternate` 属性；指向对应的 `workInProgress Fiber` 节点对象。相应的，`workInProgress Fiber` 节点的 `alternate` 属性也指向对应的 `current Fiber` 节点对象。

3. 直接替换能够达到快速更新 DOM 的目的。因为 `workInProgress Fiber` 树是在内存中构建的，Fiber 树中存储了对应 DOM 元素，直接能够替换，所以速度很快。
