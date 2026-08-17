# 前端框架问题

## Vue 路由：`query` vs `params`

1. **URL 表现形式**
   - query：参数以 `?key=value` 形式附加在 URL 后面，如 `/search?keyword=vue&page=1`
   - params：参数嵌入在 URL 路径中，如 `/user/123`

2. **路由配置**
   - query：无需在路由配置中预定义，随时可加任意键值对
   - params：必须在路由配置中声明动态段，如 `path: '/user/:id'`

3. **跳转方式**
   - query：支持 `path` 或 `name` 跳转
     ```js
     this.$router.push({ path: "/search", query: { keyword: "vue" } });
     ```
   - params：**必须使用 `name` 跳转**，用 `path` 会导致参数丢失
     ```js
     this.$router.push({ name: "User", params: { id: 123 } });
     ```

4. **取值方式**
   - query：`this.$route.query.keyword`
   - params：`this.$route.params.id`

5. **刷新行为**
   - query：参数保留在 URL 中，刷新后不丢失
   - params：如果路由 path 中定义了动态段（如 `/user/:id`），刷新后参数仍在 URL 路径中，不会丢失；但如果 params 是隐式传递（未在路径中定义），刷新后会丢失

## 浅谈Vue 2 中的 `computed` 实现

Vue 2 中 `computed` 的实现，本质上是**基于响应式系统（Dep/Watcher）+ 惰性求值（lazy）+ 脏标记（dirty）缓存**三者协作的结果。

::: info 整体流程图

```
初始化
  │
  ├─ 创建 computed Watcher（lazy: true, dirty: true）
  ├─ 不执行 getter，不收集依赖
  │
首次访问 computed
  │
  ├─ dirty === true → 执行 evaluate()
  │   ├─ 调用 getter → 触发依赖数据的 get → 收集依赖
  │   ├─ 缓存结果到 watcher.value
  │   └─ dirty = false
  │
再次访问（依赖未变）
  │
  ├─ dirty === false → 直接返回 watcher.value（命中缓存）
  │
依赖数据变化
  │
  ├─ 触发 computed Watcher 的 update()
  ├─ dirty = true（仅标记，不计算）
  │
下次访问
  │
  └─ dirty === true → 重新 evaluate() → 重新收集依赖 → 更新缓存
```

- 每个 computed 属性对应一个 **computed Watcher**，存储在 `vm._computedWatchers` 中
- 创建时传入 `{ lazy: true }`，表示**惰性求值**——初始化时不执行 getter，不会立即计算

:::

## 发布订阅 与 观察者模式

**发布订阅者模式与观察者模式的核心区别在于：观察者模式是“直接通知”，发布订阅者模式是“通过中间人转发”。** 虽然两者都属于行为型设计模式且用于解耦，但在实现机制、耦合度和应用场景上存在本质差异。

| 维度     | 观察者模式            | 发布订阅者模式                     |
| -------- | --------------------- | ---------------------------------- |
| 耦合度   | 松耦合（但直接引用）  | 完全解耦                           |
| 中间层   | 无                    | 有（消息代理/事件总线）            |
| 通信方式 | 同步、直接调用        | 可同步可异步，间接转发             |
| 扩展性   | 一般                  | 更强，新增订阅者无需改动发布者     |
| 典型场景 | UI 事件监听、数据绑定 | 消息队列、微服务通信、事件驱动架构 |

### 观察者模式

- **结构**：Subject（被观察者）直接维护一个 Observer（观察者）列表，状态变化时主动遍历调用所有观察者的更新方法。
- **耦合度**：观察者和被观察者**直接耦合**，被观察者必须知道观察者的存在。
- **通信方式**：一对一或多对一的直接推送。

::: info 观察者模式代码示例

**核心：Subject 直接持有 Observer 列表，状态变了直接调用。**

```js
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(data) {
    // 直接遍历调用每个观察者的 update 方法
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(data) {
    console.log(`${this.name} 收到通知：`, data);
  }
}

// 使用
const subject = new Subject();
const obsA = new Observer("观察者A");
const obsB = new Observer("观察者B");

subject.subscribe(obsA);
subject.subscribe(obsB);
subject.notify("数据变了！");
// 观察者A 收到通知：数据变了！
// 观察者B 收到通知：数据变了！
```

:::

### 发布订阅者模式

- **结构**：引入一个中间层——**消息代理（Broker/Event Bus）**。发布者将消息发到代理的某个频道，订阅者向代理订阅感兴趣的频道，两者互不知道对方的存在。
- **耦合度**：发布者和订阅者**完全解耦**，仅通过消息代理间接通信。
- **通信方式**：多对多，基于频道/主题的广播。

::: info 发布订阅者模式代码示例

**核心：引入 EventBus 中间层，发布者和订阅者互不认识。**

```js
class EventBus {
  constructor() {
    this.events = {}; // { 事件名: [回调函数列表] }
  }
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((cb) => cb(data));
    }
  }
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

// 使用
const bus = new EventBus();

// 订阅者A 和 订阅者B 互不认识，也不知道谁发布的
bus.on("user:login", (user) => console.log("更新用户信息：", user));
bus.on("user:login", (user) => console.log("同步购物车：", user));

// 发布者在另一个模块，只管发，不管谁收
bus.emit("user:login", { name: "张三" });
// 更新用户信息：{ name: '张三' }
// 同步购物车：{ name: '张三' }
```

:::

### JS中的应用场景

- **DOM 事件系统** — 浏览器本身就是发布订阅：`addEventListener` 是订阅，用户操作触发 `dispatchEvent` 是发布
- **Node.js 的 `EventEmitter`** — 经典的发布订阅实现，`on`/`emit`/`off` 三件套
- **Vue 2 的 EventBus** — `new Vue()` 作为中央事件总线，`$emit`/`$on`/`$off`
- **Vue 3 的响应式系统** — 基于 `Proxy` 的 `Dep`（依赖收集）+ `effect`（副作用追踪），本质是观察者模式
