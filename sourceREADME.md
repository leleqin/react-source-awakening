## 一、由 jsx 转为 react element

function `createElement`

1. 参数

- @param {string} type 元素类型
- @param {object | null} props 元素属性
- @param {createElement[]} children 元素的子元素

2. 主要功能

- 分离 props 属性和特殊属性（ref, key, source, self）
- 将子元素挂载到 `props.children` 中
- 为 props 属性赋默认值 (`defaultProps`)
- 调用 ReactElement 方法创建并返回 React Element

3. 开发环境(`__DEV__`)

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
