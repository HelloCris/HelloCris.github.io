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
