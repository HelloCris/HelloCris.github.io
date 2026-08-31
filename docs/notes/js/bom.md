# BOM

## 什么是 BOM

**BOM（Browser Object Model，浏览器对象模型）** 是浏览器提供的一组用来**操作浏览器窗口、与浏览器本身交互**的 API。它没有正式的 W3C 标准（直到 HTML5 才在规范里补充），核心是 `window` 对象。

### BOM 与 DOM 的区别

| 维度     | DOM                         | BOM                                 |
| -------- | --------------------------- | ----------------------------------- |
| 全称     | Document Object Model       | Browser Object Model                |
| 操作对象 | 文档（HTML 结构）           | 浏览器窗口 / 浏览器本身             |
| 标准化   | W3C 正式标准                | 早期无标准，HTML5 开始纳入          |
| 核心对象 | `document`                  | `window`                            |
| 举例     | `document.getElementById()` | `window.location`、`window.history` |

::: info window
`window` 既是 BOM 的顶层对象，也是 ECMAScript 的**全局对象**：所有全局变量、全局函数都自动成为 `window` 的属性。所以 `location` 其实是 `window.location` 的简写。
:::

### BOM 核心对象总览

| 对象        | 作用                               |
| ----------- | ---------------------------------- |
| `window`    | 浏览器窗口 + 全局对象              |
| `location`  | 地址栏信息，可读取/跳转            |
| `navigator` | 浏览器/系统信息                    |
| `history`   | 浏览历史（含 HTML5 History API）   |
| `screen`    | 屏幕分辨率等信息                   |
| `document`  | 文档（DOM 范畴，但挂在 window 上） |

## Window 对象

### 全局对象特性

```js
// 全局变量 / 函数 都会挂到 window 上
var a = 1;
function foo() {}
console.log(window.a); // 1
console.log(window.foo); // ƒ foo() {}
```

### 窗口尺寸属性

| 属性                                                | 含义                     | 是否含滚动条 |
| --------------------------------------------------- | ------------------------ | ------------ |
| `window.innerWidth/innerHeight`                     | 视口尺寸（含滚动条占位） | 含           |
| `window.outerWidth/outerHeight`                     | 整个浏览器窗口尺寸       | —            |
| `document.documentElement.clientWidth/clientHeight` | 视口尺寸（不含滚动条）   | 不含         |
| `document.body.clientWidth`                         | body 内容宽度            | 取决于样式   |

```js
// 获取"可用视口宽高"（最常用，不含滚动条）
const vw = document.documentElement.clientWidth;
const vh = document.documentElement.clientHeight;
```

### 对话框（alert / confirm / prompt）

| 方法                   | 返回值          | 说明                        |
| ---------------------- | --------------- | --------------------------- |
| `alert(msg)`           | `undefined`     | 仅提示，阻塞线程            |
| `confirm(msg)`         | `true`/`false`  | 确认框，用户点确定返回 true |
| `prompt(msg, default)` | 输入值 / `null` | 输入框，取消返回 null       |

```js
const ok = confirm("确定删除吗？");
if (ok) {
  const name = prompt("请输入名称", "默认值");
  if (name !== null) alert("你输入了：" + name);
}
```

::: warning ⚠️ 注意
这三个对话框都是**模态、阻塞**的，会卡住 JS 执行，生产环境基本不用（体验差），只适合调试。
:::

### 窗口控制

```js
// 打开新窗口：返回新窗口的 window 引用
const w = window.open("https://example.com", "_blank", "width=400,height=300");
// 关闭
w.close();
// 移动 / 滚动
window.scrollTo(0, 0); // 滚到顶部
window.scrollBy(0, 100); // 相对滚动 100px
```

## Location 对象

封装地址栏信息。**读取**可获取 URL 各部分，**赋值**可触发跳转。

### 属性（以 `https://www.example.com:8080/path/page.html?a=1&b=2#sec` 为例）

| 属性       | 值                             | 说明                   |
| ---------- | ------------------------------ | ---------------------- |
| `href`     | 完整 URL                       | 赋值会跳转并留历史     |
| `protocol` | `https:`                       | 协议                   |
| `host`     | `www.example.com:8080`         | 主机名 + 端口          |
| `hostname` | `www.example.com`              | 主机名                 |
| `port`     | `8080`                         | 端口                   |
| `pathname` | `/path/page.html`              | 路径                   |
| `search`   | `?a=1&b=2`                     | 查询字符串             |
| `hash`     | `#sec`                         | 锚点                   |
| `origin`   | `https://www.example.com:8080` | 协议+主机+端口（只读） |

### 方法

| 方法                    | 行为       | 是否留历史记录   |
| ----------------------- | ---------- | ---------------- |
| `location.assign(url)`  | 跳转到 url | 留               |
| `location.replace(url)` | 替换当前页 | 不留（不能后退） |
| `location.reload()`     | 刷新       | —                |
| `location.href = url`   | 同 assign  | 留               |
| `location = url`        | 简写       | 留               |

```js
location.assign("https://example.com"); // 跳转，可后退
location.replace("https://example.com"); // 跳转，不可后退
location.reload(); // 刷新（可能用缓存）
location.reload(true); // 强制从服务器刷新
```

::: info `reload(true)`
`reload(true)` 强制跳过缓存刷新，等价于浏览器 Ctrl/Cmd+Shift+R。
:::

## Navigator 对象

提供浏览器与系统环境信息。**大部分历史属性已不可靠**（厂商伪装），现代判断浏览器主要看 `userAgent` 或 `userAgentData`。

### 常用属性

| 属性                      | 说明                           |
| ------------------------- | ------------------------------ |
| `navigator.userAgent`     | 用户代理字符串（最核心）       |
| `navigator.platform`      | 操作系统平台（已逐步废弃）     |
| `navigator.language`      | 浏览器首选语言，如 `zh-CN`     |
| `navigator.languages`     | 语言偏好数组                   |
| `navigator.onLine`        | 是否联网（`true`/`false`）     |
| `navigator.cookieEnabled` | cookie 是否启用                |
| `navigator.userAgentData` | 现代结构化浏览器信息（实验性） |

### 典型 User-Agent 字符串

| 浏览器  | UA 特征                                           |
| ------- | ------------------------------------------------- |
| Chrome  | `...Chrome/120.0.0.0 Safari/537.36`               |
| Firefox | `...Gecko/20100101 Firefox/121.0`                 |
| Edge    | `...Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0` |
| Safari  | `...Version/17.0 Safari/605.1.15`                 |

```js
// 简单判断（仅示例，生产更推荐特性检测）
const ua = navigator.userAgent;
const isChrome = /Chrome/.test(ua) && !/Edg/.test(ua);
const isEdge = /Edg/.test(ua);
const isFirefox = /Firefox/.test(ua);
```

::: warning ⚠️ 注意
UA 可被用户/厂商篡改，**判断浏览器能力优先用"特性检测"**（如 `'fetch' in window`），再用 UA 兜底。
:::

## History 对象

代表会话历史。**出于隐私，不能直接读取具体 URL 列表**，只能前后翻页。

### 传统 API

| 成员                | 说明                                           |
| ------------------- | ---------------------------------------------- |
| `history.length`    | 当前历史栈中的记录数                           |
| `history.back()`    | 后退一页，等价于 `go(-1)`                      |
| `history.forward()` | 前进一页，等价于 `go(1)`                       |
| `history.go(n)`     | `n>0` 前进 n 页，`n<0` 后退 n 页，`go(0)` 刷新 |

```js
history.back(); // 后退
history.go(-2); // 后退两页
history.go(0); // 刷新当前页
```

### HTML5 History API（SPA 路由核心）

| 成员                                      | 说明                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| `history.pushState(state, title, url)`    | 新增一条历史记录（不刷新页面）                               |
| `history.replaceState(state, title, url)` | 替换当前历史记录                                             |
| `history.state`                           | 当前记录关联的 state 对象                                    |
| `popstate` 事件                           | 用户点击前进/后退时触发（**pushState/replaceState 不触发**） |

```js
// 单页应用无刷新改 URL
history.pushState({ page: 1 }, "", "/page/1");

window.addEventListener("popstate", (e) => {
  console.log("回退/前进到了：", e.state);
});
```

::: warning ⚠️ 注意
`pushState` 只改 URL 不触发页面加载，也不会触发 `popstate`；只有用户点击前进/后退（或调用 `back()/forward()/go()`）才会触发 `popstate`。
:::

## Screen 对象

获取用户屏幕信息，常用于适配/统计。

| 属性                              | 说明                            |
| --------------------------------- | ------------------------------- |
| `screen.width / height`           | 屏幕总分辨率                    |
| `screen.availWidth / availHeight` | 可用区域（减去任务栏等）        |
| `screen.colorDepth`               | 颜色位数（如 24）               |
| `screen.pixelDepth`               | 物理像素位数（通常=colorDepth） |
| `screen.orientation`              | 屏幕方向对象（现代）            |

## 定时器（setTimeout / setInterval）

| 方法                     | 行为                          | 取消                |
| ------------------------ | ----------------------------- | ------------------- |
| `setTimeout(fn, delay)`  | 延迟 delay 毫秒后**执行一次** | `clearTimeout(id)`  |
| `setInterval(fn, delay)` | 每 delay 毫秒**重复执行**     | `clearInterval(id)` |

```js
// setTimeout：3 秒后打印一次
let count = 0;
const timer = setTimeout(() => {
  console.log(count++); // 0
}, 3000);

// setInterval：每 1 秒打印一次，5 次后清除
let n = 0;
const id = setInterval(() => {
  console.log(n++);
  if (n >= 5) clearInterval(id);
}, 1000);
```

::: warning ⚠️ 注意
两者返回值都是**数字 id**，`clearTimeout` / `clearInterval` 可互用（内部都清除同一个定时器表），但为可读性建议配对使用。传无效 id 不会报错。
:::

## 网络请求（XHR / Fetch）

### XMLHttpRequest（传统）

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();
```

- `readyState`：`0` 未初始化 → `1` 已打开 → `2` 已发送 → `3` 接收中 → `4` 完成
- `status`：HTTP 状态码（200 成功，404 等失败）

### Fetch（现代，基于 Promise）

`fetch` 是浏览器原生提供的**网络请求 API**（基于 WHATWG Fetch 标准，ES6 时代正式普及），用来替代老旧的 `XMLHttpRequest`。

```js
fetch(resource, options?) => Promise<Response>
```

```js
// 最简 GET
const res = await fetch("/api/user");
const data = await res.json();

// 带配置项的 POST
const res = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Tom", pwd: "123" }),
});
```

```js
fetch("https://api.example.com/data")
  .then((res) => {
    if (!res.ok) throw new Error("HTTP " + res.status); // 需手动抛错
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

::: warning ⚠️ 注意
`fetch` 返回的是一个 **Promise**，且**只有网络层失败（断网、DNS 失败、跨域被拦）才会 reject**；HTTP 状态码（如 404、500）**不会**触发 reject，需要自己判断 `res.ok` 或 `res.status`。
:::

| 核心对象            | 关键属性 / 方法                                                                     | 说明                                   |
| ------------------- | ----------------------------------------------------------------------------------- | -------------------------------------- |
| `Response`          | `res.ok` / `res.status` / `res.statusText`                                          | `ok` = `status` 在 200–299             |
|                     | `res.headers`                                                                       | 响应头（Headers 对象）                 |
|                     | `res.json()` / `res.text()` / `res.blob()` / `res.arrayBuffer()` / `res.formData()` | 都是返回 Promise，用于解析不同格式体   |
|                     | `res.clone()`                                                                       | 响应体只能读一次，需多次读取时先 clone |
| `Request`（可省略） | `new Request(url, options)`                                                         | 可单独构造请求对象再传给 fetch         |

### XHR vs Fetch 对比

| 维度        | XMLHttpRequest    | Fetch                                                     |
| ----------- | ----------------- | --------------------------------------------------------- |
| 返回值      | 事件 / 回调       | Promise                                                   |
| 错误处理    | 看 `status`       | 网络失败才 reject；**HTTP 错误状态不 reject**，需手动判断 |
| 超时        | 原生 `timeout`    | 需配合 `AbortController`                                  |
| 取消请求    | `xhr.abort()`     | `AbortController.abort()`                                 |
| 进度        | 原生 `onprogress` | 需 `ReadableStream`（较麻烦）                             |
| 携带 cookie | 默认带            | 默认**不带**，需 `credentials: 'include'`                 |

```js
// Fetch 携带 cookie + 超时控制
const ctrl = new AbortController();
setTimeout(() => ctrl.abort(), 5000); // 5 秒超时
fetch("/api", { credentials: "include", signal: ctrl.signal });
```

## 常用窗口事件

| 事件               | 触发时机                           |
| ------------------ | ---------------------------------- |
| `load`             | 页面及所有资源（图片等）加载完成   |
| `DOMContentLoaded` | DOM 解析完成（不含图片/css），更早 |
| `resize`           | 窗口尺寸变化                       |
| `scroll`           | 页面滚动                           |
| `beforeunload`     | 关闭/刷新前（可提示"确认离开"）    |
| `unload`           | 页面卸载时                         |

```js
window.addEventListener("DOMContentLoaded", () => console.log("DOM 就绪"));
window.addEventListener("resize", () => console.log(innerWidth));
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = ""; // 触发浏览器离开确认
});
```

## requestAnimationFrame（动画首选）

作用：告诉浏览器"在下一次重绘之前调用我这个函数"。与屏幕刷新率（通常 60fps）同步，比 `setInterval` 做动画更流畅、更省电。

```js
function animate() {
  // 更新动画...
  requestAnimationFrame(animate); // 下一帧继续
}
requestAnimationFrame(animate);

// 取消
const rafId = requestAnimationFrame(animate);
cancelAnimationFrame(rafId);
```

| 特性        | requestAnimationFrame          | setInterval             |
| ----------- | ------------------------------ | ----------------------- |
| 执行节奏    | 跟随屏幕刷新率（60fps≈16.7ms） | 固定毫秒，与刷新率无关  |
| 后台标签页  | **自动暂停**，省 CPU/电        | 仍执行，浪费资源        |
| 卡顿情况    | 不堆积、不丢帧                 | 回调耗时>间隔会**堆积** |
| 适合场景    | 动画、逐帧渲染                 | 轮询、定时任务          |
| 返回值/取消 | id + `cancelAnimationFrame`    | id + `clearInterval`    |
