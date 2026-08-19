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
