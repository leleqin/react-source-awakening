# React 源码

## 一、由 jsx 转为 react element

function `createElement`

1. 参数

- @param {string} type 元素类型
- @param {object | null} props 元素属性
- @param {createElement[]} children 元素的子元素

2. 返回

   ReactElement 对象

3. 主要功能

- 分离 props 属性和特殊属性（ref, key, source, self）
- 将子元素挂载到 `props.children` 中
- 为 props 属性赋默认值 (`defaultProps`)
- 调用 ReactElement 方法创建并返回 React Element

4. 开发环境(`__DEV__`)

通过 `Object.defineProperty` 设置 key，ref 属性，当代码中通过 `props.key` 调用时控制台报错

```js
Object.defineProperty(props, "key", {
  get: warnAboutAccessingKey,
  configurable: true,
});
```

## Fiber

```js
type Fiber = {
  // *************** DOM 实例相关的 ***************

  // 节点标记, 标记不同组件的类型。（Fiber实现中简单定义为 hostRoot || hostComponent || classComponent || functionComponent）
  tag: WorkTag,

  // 节点类型(元素，文本，组件)(具体的类型)
  type: any,

  // 实例对象。普通组件 -> 节点 DOM 对象 |  类组件 -> 组件实例对象。function 组件没有实例，该属性为 null
  stateNode: any,

  // *************** 构建 Fiber 树相关的 ***************

  // 指向自己的父级 Fiber 对象
  return: Fiber | null,

  // 指向自己的第一个子级的 Fiber 对象
  child: Fiber | null,

  // 指向自己的下一个兄弟 Fiber 对象
  sibling: Fiber | null,

  //
  alternate: Fiber | null,

  // *************** 状态数据相关的 ***************

  // 即将更新的 props (新的 props)
  pendingProps: any,

  // 上一次组件更新后的 props （旧的 props）
  memoizedProps: any,

  // 上一次组件更新后的 state （旧的 state）
  memoizedState: any,

  // *************** 副作用（可以触发 DOM 操作的）相关的 ***************

  // 任务队列。以链表的形式存储当前 fiber 要执行的任务，比如更新多个 state 值
  updateQueue: UpdateQueue<any> | null,

  // 记录当前 Fiber 节点对应的 DOM 节点要进行的操作（增删改）
  effectTag: SideEffectTag,

  // 当前 Fiber 节点的子级 Fiber 节点的 effect
  firstEffect: Fiber | null,

  // 单列表用来快速查找下一个 side effect
  nextEffect: Fiber | null,

  // 子树中最后一个 side effect
  lastEffect: Fiber | null,

  // 任务的过期时间。比如因为任务的优先级原因，任务一直没有被执行，超过任务的过期时间，会强制执行；如果是同步任务，这个值会很大。
  expirationTime: ExpirationTime,

  // 当前组件及子组件处于何种渲染模式 0 同步渲染模式，1 异步渲染模式 ……
  mode: TypeOfMode,
};
```

## 初始化渲染

将 React 元素渲染到页面中，分为两个阶段

1. render 阶段
2. commit 阶段

### render 阶段

协调层负责的阶段，为每个 React 元素构建对应的 Fiber 对象，为 Fiber 对象创建对应的 DOM 对象，为 Fiber 对象添加 `effectTag` 属性，标注当前 Fiber 对象对应的 DOM 对象要进行什么（增删改）操作。

新构建的 Fiber 对象称为 `workInProgress Fiber` 树，当 render 阶段结束，会保存在 `fiberRoot` 中。进入到 commit 阶段

#### 初始渲染

function `render` 渲染入口 `src\react\packages\react-dom\src\client\ReactDOMLegacy.js`

1. 参数

- @param {ReactElement} element 要渲染的 ReactElement
- @param {Container} container 渲染容器 id 为 root 的 div。DOM 对象
- @param {?Function} callback 渲染完成后执行的回调函数 可选

2. 返回值

   返回 render 方法第一个参数的真实 DOM 对象。就是说渲染谁 返回谁的真实 DOM 对象

3. 主要功能

- 检测 container 是否是符合要求的渲染容器，判断是不是真实的 DOM 对象
  - 元素节点 | document 节点 | 文档碎片节点 | 注释节点
- 调用 function `legacyRenderSubtreeIntoContainer` 将子树渲染到容器中；返回 render 的最终返回值。也就是初始化 Fiber 数据结构，创建 fiberRoot 和 rootFiber

  1. 参数

  - @param {?ReactElement} parentComponent 父组件，初始渲染传 null
  - @param {ReactNodeList} children render 方法中的第一个参数，要渲染的 ReactElement
  - @param {Container} container 渲染容器
  - @param {boolean} forceHydrate true 为服务端渲染；false 为客户端渲染
  - @param {?Function} callback 渲染完成后执行的回调函数 可选

  2.  主要功能

  - 根据 `container` 是否有 `_reactRootContainer` 判断是不是有过初始化渲染的容器。若有 `_reactRootContainer` 属性，则表示更新；否则表示初始渲染。React 会在初始渲染的时候，为最外层容器添加 `_reactRootContainer` 属性。定义为 root。
    根据不同的渲染需求, 构建(初始化/更新) `根 Fiber` 数据结构
  - 返回 `legacyCreateRootFromDOMContainer` 函数。
    判断是否是服务器端渲染，如果是服务器端渲染，使用**循环**的方式清空 container 容器的节点。为了当首屏渲染时，显示一些占位图或者 loading 图，提高用户体验，因此就需要向 container 中添加 html 元素；在 React Element 渲染到 container 前，就需要清空 container；占位图和 React Element 不能同时显示。
    因此，在加入占位代码是，最好只有一个父级元素，这样可以减少内部代码的循环次数提高性能。
    该方法返回一个 `createLegacyRoot` 方法
    - `createLegacyRoot` 通过实例化 `ReactDOMBlockingRoot` 类创建 `LegacyRoot`。
      通过 render 方法创建的 container 就是 `LegacyRoot`。
    - 最终通过 `createFiberRoot` 返回 `FiberRoot`
      - `createFiberRoot` 会创建 `FiberRoot` 和 `rootFiber`；并将 `footFiber` 赋值给 `FiberRoot.current`, 将 `FiberFoot` 赋值给 `rootFiber.stateNode`。
      - 给 `rootFiber` 添加 `updateQueue` 属性，是 queue 的一些默认初始值。
  - 将 `legacyCreateRootFromDOMContainer` 最终的返回值赋值给 `container._reactRootContainer` , `fiberRoot` 也就是 `container._reactRootContainer._internalRoot`。
  - 修改 callback 函数的 this 指向。
    - 使 callback 中的 this 指向 render 函数中的第一个参数对应的真实 DOM 对象。

-

### commit 阶段

获取 `fiberRoot` 中的新构建的 `workInProgress Fiber` 树，根据 Fiber 对象中的 `effectTag` 属性，进行 DOM 操作。
