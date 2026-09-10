# 性能问题

## 优化首屏加载时间

::: info 网络传输层：减少请求耗时与体积

1. **CDN 分发**
   通过在全球/区域部署多台服务器副本，让用户请求由**距离最近的服务器**响应，大幅缩短网络传输的物理距离，降低延迟。

2. **HTTP 协议升级（HTTP/2.0）**
   相比 HTTP/1.1，HTTP/2.0 支持**多路复用**（一个 TCP 连接并行处理多个请求）、头部压缩等特性，减少“请求-响应”的串行等待时间，尤其对接口小而多的场景提升显著。

3. **HTTP 压缩（如 Gzip）**
   对文本类静态资源（CSS/JS/HTML）或接口响应开启 Gzip 压缩，可大幅减小传输体积（如 Bootstrap 压缩后仅剩原体积 17%）。需注意：小文件压缩性价比低（压缩/解压耗时可能超过收益），需按需选择。

:::

::: info 资源加载策略：按需加载，减少首屏冗余

4. **前端资源动态加载**
   - **路由动态加载**：以“页面”为单位拆分代码，用户访问某页面时才加载对应 JS/CSS，避免首屏加载全量代码。
   - **组件动态加载**：对非首屏可见的组件（如弹窗、底部模块），延迟到需要时再加载。
   - **图片懒加载**：通过 `<img loading="lazy">` 或 IntersectionObserver API，让图片仅在进入视口时加载，减少首屏图片请求数。

:::

::: info 缓存与存储：复用资源，减少重复请求

5. **后端业务层缓存**
   对高频访问但数据变化慢的接口（如用户签到状态），设置合理缓存时间（如“缓存到明天”），直接返回缓存结果，避免重复查询数据库，降低接口响应耗时。

6. **静态文件缓存方案**
   采用 **“文件 Hash + 强缓存”** 策略：给静态资源（JS/CSS/图片）文件名加 Hash（如 `app.a1b2c3.js`），确保内容更新时文件名变化；同时设置 `Cache-Control: max-age=1年`，让浏览器长期缓存旧版本，仅在新版本发布时加载新文件。

:::
::: info 渲染流程优化：优先展示核心内容

7. **页面骨架屏**
   首屏加载完成前，先渲染简单的“占位元素”（如灰色块、Loading 动画），模拟页面结构。好处是**减少用户等待时的“空白焦虑”**，且成熟网站中应用广泛（无骨架屏时，Loading 图也可替代）。

8. **SSR（服务端渲染）**
   让服务器直接返回**包含内容的 HTML**，而非空壳 HTML + 客户端 JS 渲染。浏览器解析 HTML 后即可快速展示首屏内容，避免“客户端渲染等待 JS 执行”的时间差。

:::

::: info 其他细节优化

9. **Script 标签属性（async/defer）**
   对不阻塞页面渲染的 JS 文件，用 `async`（异步加载，加载完立即执行）或 `defer`（异步加载，页面解析完再执行）属性，避免 JS 阻塞 HTML 解析，加快首屏渲染。

10. **图片格式与加载策略**
    - 用 WebP 替代 JPEG/PNG：WebP 体积更小且画质相当，可减少图片加载时间。

:::

## 渲染性能优化

::: info 资源加载与网络

1. **慎用 Iframe**：会阻塞 `onload`、影响 SEO 和并行加载，必要时用 JS 动态设置 `src` 延迟加载。
2. **小图标用 Base64**：减少请求，仅适合小图（大图会撑爆 HTML）。
3. **避免空 `href`/`src`**：会触发无效请求或页面重载，阻塞资源下载。
4. **综合策略**：开启 Gzip/Brotli 压缩、CDN 托管、合理缓存、图片域名分片。
5. **关键图片预加载**：用 `preload` 提前加载首屏关键图。

:::
::: info 渲染与布局

6. **CSS3 替代 JS 动画**：减少重排重绘，触发硬件加速。
7. **CSS 置顶、JS 置底**：CSS 放 `<head>` 防闪烁，JS 用 `async`/`defer` 或放底部。
8. **减少 DOM 操作**：批量修改用 `DocumentFragment` 或切换 `className`，减少重排。

:::

## 重排(回流)和重绘

::: info 浏览器渲染流程

浏览器将 HTML + CSS 渲染到屏幕上，大致经历以下步骤：

1. **解析 HTML** → 构建 DOM 树
2. **解析 CSS** → 构建 CSSOM 树
3. DOM + CSSOM 合并 → **渲染树（Render Tree）**
4. **布局（Layout / Reflow）** → 计算每个节点的几何信息（位置、大小）
5. **绘制（Paint / Repaint）** → 将节点绘制到屏幕上
6. **合成（Composite）** → 将各图层合成为最终画面

:::

::: info 重排与重绘的关系

- 重排 → 必然触发重绘
- 重绘 → 不一定触发重排

:::

### 重排（Reflow）

重排也叫**回流**，是指浏览器需要**重新计算元素的几何属性**（如宽高、位置、偏移量等），并重新构建渲染树的过程。

**触发重排的常见操作：**

- 改变元素的宽高、内外边距、边框
- 添加或删除可见的 DOM 元素
- 改变窗口大小（resize）
- 读取某些几何属性（如 `offsetHeight`、`scrollTop`、`getBoundingClientRect()`）
- 改变字体大小
- 页面首次渲染

> 重排的代价较高，因为它涉及布局的重新计算。

### 重绘（Repaint）

重绘是指元素的**外观发生变化**，但几何属性不变，浏览器只需重新绘制该元素即可。

**触发重绘的常见操作：**

- 改变 `color`、`background-color`
- 改变 `visibility`
- 改变 `box-shadow`
- 改变 `outline`
- 改变 `border-radius`（不影响布局时）

> 重绘的代价比重排低，但仍会消耗 GPU/CPU 资源。

### 如何减少重排和重绘

**1. 批量修改 DOM**

避免逐条修改样式，推荐使用 `cssText` 或 `class` 一次性修改：

```js
//  不推荐：多次触发重排
el.style.width = "100px";
el.style.height = "100px";
el.style.margin = "10px";

//  推荐：一次性修改
el.style.cssText += "width:100px;height:100px;margin:10px;";

//  或者切换 class
el.classList.add("new-style");
```

**2. 离线操作 DOM**

使用 `DocumentFragment` 或克隆节点后操作，再一次性插入：

```js
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
list.appendChild(fragment); // 只触发一次重排
```

**3. 避免频繁读取几何属性**

读取 `offsetHeight` 等属性会强制浏览器刷新布局队列，导致**强制同步布局**：

```js
//  在循环中交替读写，会反复触发重排
for (let i = 0; i < 100; i++) {
  el.style.top = el.offsetTop + 1 + "px"; // 读 offsetTop 触发重排
}
```

**4. 使用 `transform` 和 `opacity` 做动画**

这两个属性可以由 GPU 加速，且**不触发重排和重绘**（走合成层）：

```css
/*  推荐 */
.box {
  transition: transform 0.3s ease;
}
.box:hover {
  transform: translateX(100px);
}

/*  不推荐 */
.box:hover {
  left: 100px; /* 触发重排 */
}
```

**5. 将频繁变化的元素提升为合成层**

```css
.box {
  will-change: transform;
}
```

> 注意：不要滥用 `will-change`，过多合成层反而增加内存开销。

## 内存泄露

::: info 什么是内存泄露

**定义**：程序中已经不再使用、但**由于某些引用未被释放**，导致垃圾回收机制（GC）无法回收的内存。这部分内存会被持续占用，不断累积。

**后果**：页面逐渐变卡 → 操作无响应 → 浏览器标签崩溃；移动端还会表现为发热、耗电、闪退。

:::

::: warning 内存泄露 vs 内存溢出

- **内存泄露（Memory Leak）**：本该释放的内存没释放，是**慢性**问题，不易立刻察觉。
- **内存溢出（OOM，Out Of Memory）**：申请内存时剩余空间不足，程序**直接崩溃**。泄露长期积累往往就是溢出的前兆。

:::

### JS 的垃圾回收（GC）机制

浏览器自动管理内存，核心是“判断哪些对象还活着”。

| 算法                         | 原理                                                                 | 优点           | 缺点                             |
| ---------------------------- | -------------------------------------------------------------------- | -------------- | -------------------------------- |
| 标记清除（Mark-Sweep，主流） | 从根对象（全局、执行栈）出发，能访问到的标记为“存活”，访问不到的回收 | 能处理循环引用 | 会产生内存碎片                   |
| 引用计数（早期 IE）          | 记录每个对象被引用的次数，为 0 时回收                                | 回收及时       | **循环引用无法回收**，已基本淘汰 |

### 常见内存泄露场景与修复

| 场景                | 泄露原因                                                            | 修复方式                                               |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| 意外的全局变量      | 未声明直接使用变量 → 挂到 `window` 上，永不被回收                   | 用 `'use strict'`；显式声明变量                        |
| 遗忘的定时器 / 回调 | `setInterval` 未 `clear`，回调里引用的对象一直存活                  | 在组件销毁 / 不再需要时 `clearInterval`/`clearTimeout` |
| 闭包持有外部变量    | 闭包长期持有外层作用域引用，变量无法释放                            | 不再需要时手动置 `null`                                |
| 脱离文档的 DOM 节点 | JS 仍持有已被移除 DOM 的引用（detached node）                       | 移除 DOM 后同步清空 JS 引用                            |
| 未移除的事件监听    | `addEventListener` 后未 `removeEventListener`，监听器与节点互相绑定 | 在销毁时成对 `removeEventListener`                     |
| 无限增长的缓存      | `Map`/`Set`/数组作为缓存无上限地 push                               | 设定上限（LRU）或定时清理                              |
| 遗忘的订阅 / 连接   | `EventBus`、`WebSocket`、`ResizeObserver` 等未取消订阅或关闭        | 在生命周期结束时 `unsubscribe`/`close`                 |

**1. 意外的全局变量**

```js
function leak() {
  // 没写 var/let/const，this 指向 window，bar 变成全局变量
  bar = "我泄露了";
}
// 推荐：开启严格模式 + 显式声明
("use strict");
function noLeak() {
  const bar = "我会被回收";
}
```

**2. 遗忘的定时器**

```js
//  泄露：定时器一直跑，回调里的 data 永远被引用
const data = new Array(1000000).fill("*");
setInterval(() => {
  console.log(data.length);
}, 1000);

//  修复：离开时清理
const timer = setInterval(fn, 1000);
// 组件销毁 / 路由离开时
clearInterval(timer);
```

**3. 闭包持有外部大对象**

```js
function createClosure() {
  const bigData = new Array(1000000).fill("*");
  return function () {
    // 即便没用到 bigData，闭包仍持有它
    console.log("still alive");
  };
}
const fn = createClosure();
fn();
// 不再需要时手动断开引用
fn = null; // bigData 才可被回收
```

**4. 脱离文档但被 JS 持有的 DOM**

```js
const elements = [];
function append() {
  const el = document.getElementById("target");
  document.body.removeChild(el); // DOM 已从页面移除
  elements.push(el); //  但 JS 仍引用着，无法回收 → detached node 泄露
}
// 修复：移除 DOM 的同时清掉 JS 引用
// elements.length = 0 或 elements.pop()
```

**5. 未移除的事件监听（Vue/React 高发）**

```js
window.addEventListener("resize", handleResize);
// 组件卸载 / 页面离开时必须移除
window.removeEventListener("resize", handleResize);
```

### 如何定位内存泄露（Chrome DevTools）

1. **Performance 面板**：录制一段时间，观察 JS Heap 曲线。正常运行时内存会**锯齿状**升降（涨上去又掉下来）；若曲线**只涨不跌**，基本可判定泄露。
2. **Memory 面板 → Heap Snapshot（堆快照）**：
   - 操作页面前后各拍一张快照，用“Comparison”对比。
   - 重点排查数量异常增长的 `Detached HTMLDivElement` 等 detached 节点、意外的闭包、未被释放的大数组。
3. **Memory 面板 → Allocation instrumentation on timeline**：能看到对象在**什么时间、哪段代码**被分配，精确定位泄露点。
4. **Performance Monitor**：实时观察 `JS heap size`、`DOM Nodes` 数量是否持续增长。

::: info 排查口诀

- 内存**只增不减** → 八成有泄露
- 优先查：**定时器、事件监听、闭包、DOM 引用、全局缓存**
- SPA（Vue/React）重点在**组件卸载时的清理逻辑**是否成对

:::
