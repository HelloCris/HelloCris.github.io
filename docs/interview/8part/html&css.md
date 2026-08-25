# HTML/CSS 问题

## 单行文本+多行文本溢出显示...问题

::: info 单行文本

```css
.ellipsis-single {
  /* 1. 强制文本在一行内显示 */
  white-space: nowrap;
  /* 2. 隐藏超出容器宽度的内容 */
  overflow: hidden;
  /* 3. 当文本溢出时显示省略号 */
  text-overflow: ellipsis;
}
```

:::

::: info 多行文本

```css
.ellipsis-multi {
  /* 1. 将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 2. 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
  /* 3. 限制在一个块元素显示的文本的行数 (例如限制为 2 行) */
  -webkit-line-clamp: 2;
  /* 4. 隐藏超出部分 */
  overflow: hidden;
}
```

:::

## 块元素垂直居中的四种方法

Flexbox 布局（推荐首选）

这是目前最简洁、最通用的方案，适用于绝大多数现代浏览器。

```css
.parent {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 父容器需有明确高度 */
}
```

Grid 布局

如果你正在使用 Grid 布局，可以用一行代码实现居中：

```css
.parent {
  display: grid;
  place-items: center; /* 同时设置水平和垂直居中 */
  height: 100vh;
}
```

绝对定位 + transform（兼容旧浏览器）

适用于需要脱离文档流或父容器高度不确定的场景：

```css
.parent {
  position: relative;
  height: 100vh;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 向左上偏移自身宽高的一半 */
}
```

margin: auto + 绝对定位

```css
.parent {
  position: relative;
  height: 100vh;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 200px; /* 必须设置宽高 */
  height: 100px;
}
```

## 前端 1px 问题

1px 问题是移动端开发中的经典难题：**CSS 中写的 `1px` 边框，在高清屏（Retina 屏）上看起来比预期的要粗**，视觉上变成了 2px 甚至 3px，显得模糊、不精致。

核心原因在于 **CSS 逻辑像素** 与 **设备物理像素** 的映射关系不一致：

- **CSS 像素（逻辑像素）**：前端代码中使用的抽象单位
- **物理像素**：屏幕硬件的最小显示单元
- **设备像素比（DPR）**：DPR = 物理像素 / CSS 像素

| 屏幕类型                  | DPR | 1 CSS px 对应      |
| ------------------------- | --- | ------------------ |
| 普通屏                    | 1   | 1×1 = 1 个物理像素 |
| Retina 屏（如 iPhone 13） | 2   | 2×2 = 4 个物理像素 |
| 高端安卓旗舰              | 3   | 3×3 = 9 个物理像素 |

当你写 `border: 1px solid black` 时，在 DPR=2 的屏幕上，浏览器会用 **2×2 的物理像素区域**来渲染，导致边框视觉上变粗一倍。

::: info 主流解决方案

**方案一：伪元素 + `transform: scale()`（推荐）**

利用伪元素绘制 1px 的线，再通过 `transform` 缩放，兼容性好、效果清晰。

**单边边框（如下边框）：**

```css
.border-b::after {
  height: 1px;
}

/* DPR=2 的设备 */
@media (-webkit-min-device-pixel-ratio: 2) {
  .border-b::after {
    transform: scaleY(0.5);
  }
}

/* DPR=3 的设备 */
@media (-webkit-min-device-pixel-ratio: 3) {
  .border-b::after {
    transform: scaleY(0.333);
  }
}
```

> 原理：先将伪元素放大 2 倍，画 1px 的边框，再整体缩小 0.5 倍，边框宽度就变成 0.5 CSS px，在 DPR=2 的屏幕上恰好等于 1 个物理像素。

---

**方案二：动态 Viewport 缩放**

通过 JS 动态设置 `<meta viewport>` 的 `initial-scale` 为 `1/DPR`，使 1 CSS px = 1 物理像素。

```js
const dpr = window.devicePixelRatio || 1;
const scale = 1 / dpr;
const meta = document.createElement("meta");
meta.setAttribute(
  "content",
  `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`,
);
document.head.appendChild(meta);
```

- **优点**：全局生效，无需逐个元素处理
- **缺点**：会影响整个页面的布局，需配合 `rem` 或 `vw` 单位，可能破坏第三方组件

:::

## BFC（块级格式化上下文）

**BFC（Block Formatting Context，块级格式化上下文）** 是 CSS 视觉格式化模型中的一个核心概念，可以理解为一个**独立的渲染区域**——内部的元素布局不会影响外部，外部的布局也不会干扰内部，类似于编程中的"隔离作用域"。

---

::: info 核心特性

- **阻止外边距合并（Margin Collapse）**：属于同一个 BFC 的相邻块级元素，垂直方向的外边距会发生合并（取较大值）；而不同 BFC 中的元素外边距则互不影响。
- **包含浮动元素**：BFC 会计算内部浮动元素的高度，防止父容器出现"高度塌陷"问题。
- **阻止文本环绕浮动元素**：BFC 区域内的元素不会与外部浮动元素发生文字环绕，保持布局稳定。
- **float 和 clear 仅在同一 BFC 内生效**：浮动和清除浮动规则只作用于同一个格式化上下文中的元素。

:::

::: info 如何触发 BFC

满足以下**任一条件**即可创建一个新的 BFC：

- **根元素**：`<html>` 天然就是一个 BFC
- **浮动元素**：`float` 不为 `none`（如 `left` / `right`）
- **绝对定位**：`position` 为 `absolute` 或 `fixed`
- **行内块**：`display: inline-block`
- **表格相关**：`display: table-cell`、`table-caption`、`inline-table` 等
- **overflow 非 visible**：`overflow` 设为 `hidden`、`auto` 或 `scroll`（最常用的方式）
- **弹性/网格容器**：`display: flex`、`inline-flex`、`grid`、`inline-grid`
- **显式创建**：`display: flow-root`（推荐，无副作用）
- **contain 属性**：`contain: layout`、`content` 或 `strict`
- **多列容器**：`column-count` 或 `column-width` 不为 `auto`

:::

## CSS 选择器解析顺序

浏览器匹配一条规则时，从**最右边的选择器（关键选择器 / key selector）**开始，逐级向左向上验证祖先节点：

```css
.container .sidebar ul li a.active {
  color: red;
}
```

匹配过程不是从左往右，而是：

| 步骤 | 方向 | 动作                                 |
| ---- | ---- | ------------------------------------ |
| 1    | 最右 | 先找出文档里**所有** `a.active` 元素 |
| 2    | ←    | 向上检查它的祖先里有没有 `li`        |
| 3    | ←    | 再向上找 `ul`                        |
| 4    | ←    | 再向上找 `.sidebar`                  |
| 5    | ←    | 最后验证是否处于 `.container` 内     |

::: info 为什么要从右到左？

关键原因就一个字：**快**。

| 方案         | 思路                                                 | 代价                           |
| ------------ | ---------------------------------------------------- | ------------------------------ |
| 从左到右     | 先筛 `.container` 的全部后代，再层层过滤             | 候选集一开始巨大，大量无效遍历 |
| **从右到左** | 先用最具体的 key selector 锁定最小集合，再向上"剪枝" | 起始集合小，早早排除不匹配分支 |

- **关键选择器通常是匹配元素最少的**（比如 `a.active` 比 `.container` 少得多），从这里起步能最快缩小范围。
- 一旦某层祖先验证失败，整条规则立刻作废，不再向上排查——早失败、早淘汰。

:::

## `calc()`

`calc()` 是 CSS 里做**动态计算**的函数，让你在一个值里混用不同单位做加减乘除。

```css
width: calc(100% - 80px);
font-size: calc(1rem + 2vw);
height: calc(100vh - var(--header) * 2);
```

支持 `+ - * /` 四种运算，可自由混合单位（px、%、em、rem、vw/vh、deg 等）。

::: warning ⚠️ 注意
运算符前后都需要保留一个空格，否则 `calc()` 失效。
:::

## CSS 单位：px、pt、rem、em、rpx

| 单位  | 全称             | 是否相对单位   | 基准                            | 注意点                             |
| ----- | ---------------- | -------------- | ------------------------------- | ---------------------------------- |
| `px`  | CSS pixel        | 可视为相对单位 | 设备像素比（DPR）/ 设备独立像素 | 1 CSS px 不一定等于 1 物理像素     |
| `pt`  | point（点）      | 否（绝对单位） | 1 pt = 1/72 inch ≈ 0.353 mm     | 与屏幕物理尺寸挂钩，不适合响应式   |
| `em`  | em               | 是             | 当前元素的 `font-size`          | 会继承父元素字体大小，容易级联放大 |
| `rem` | root em          | 是             | 根元素 `<html>` 的 `font-size`  | 基准稳定，推荐作为首选相对单位     |
| `rpx` | responsive pixel | 是             | 小程序屏幕宽度 = 750 rpx        | 自动适配不同屏幕宽度               |

## 隐藏元素的三种方式：`display:none`、`visibility:hidden`、`opacity:0`

| 对比维度                | `display: none`        | `visibility: hidden`                | `opacity: 0`                       |
| ----------------------- | ---------------------- | ----------------------------------- | ---------------------------------- |
| 是否占据空间            | 不占空间（脱离文档流） | 仍占空间                            | 仍占空间                           |
| 是否渲染（在渲染树中）  | 完全移除               | 在，但不可见                        | 在，全透明                         |
| 是否触发重排（reflow）  | 会                     | 不会                                | 不会（本身）；若上合成层也不会重绘 |
| 是否触发重绘（repaint） | 会                     | 会                                  | 会（opacity 可走合成层）           |
| 是否响应点击事件        | 不响应                 | 不响应                              | **仍可点击/聚焦**                  |
| 子元素能否"反隐藏"      | 不能（整体消失）       | 可设 `visibility: visible` 重新显示 | 子元素可单独设不同 opacity         |
| 性能影响                | 重排较重               | 轻                                  | 最轻（可 GPU 合成）                |

## link 与 @import 的区别

两者都是引入外部 CSS 的方式，但有明显差异：

| 对比项   | `<link>`                     | `@import`                     |
| -------- | ---------------------------- | ----------------------------- |
| 所属规范 | HTML / XHTML 标签            | CSS 语法                      |
| 加载时机 | 页面加载时**同时**加载       | 需等页面**完全加载后**再加载  |
| 兼容性   | 无兼容问题                   | CSS2.1 引入，低版本 IE 不支持 |
| 额外用途 | 可定义 RSS、icon、preload 等 | 只能加载 CSS                  |
| JS 控制  | 支持通过 DOM 操作修改样式    | **不支持**直接通过 JS 控制    |
| 推荐度   | ✅ 推荐                      | ⚠️ 一般不建议在主样式入口使用 |

## HTML 中 src 与 href 的区别

- **href（Hypertext Reference）**：建立**当前元素**与**外部资源**之间的引用关系，资源不嵌入当前元素。
- **src（Source）**：将外部资源**嵌入/替换**当前元素位置，资源是页面内容的一部分。

| 维度     | `href`               | `src`                                      |
| -------- | -------------------- | ------------------------------------------ |
| 全称     | Hypertext Reference  | Source                                     |
| 语义     | 超文本引用，建立关联 | 引用资源，替换当前元素                     |
| 典型标签 | `<a>`、`<link>`      | `<img>`、`<script>`、`<iframe>`、`<video>` |
| 资源关系 | 与页面/当前元素关联  | 嵌入到文档当前标签所在位置                 |
| 阻塞渲染 | **不阻塞**文档解析   | **会阻塞**文档解析（如 JS）                |
| 是否必需 | 是链接行为的核心     | 是媒体/脚本内容不可缺少的一部分            |

::: info 建议 JS 放底部、CSS 用 link 放头部

| 资源         | 推荐位置     | 原因                                                |
| ------------ | ------------ | --------------------------------------------------- |
| CSS`<link>`  | `<head>`     | `link` 下载不阻塞解析，可提前请求并尽快渲染         |
| JS`<script>` | `</body>` 前 | `src` 会阻塞后续 DOM 解析和渲染，放底部避免阻塞首屏 |

> `<script>` 加 `defer` / `async` 也能缓解阻塞，属于性能优化常见考点。

:::
