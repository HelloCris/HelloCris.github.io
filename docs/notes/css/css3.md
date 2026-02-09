# CSS3

## 简介

CSS3 是 CSS（层叠样式表）的第三代主要标准，它并不是一个单一的整体更新，而是以模块化方式逐步演进的一系列新特性和功能集合。相比 CSS2，CSS3 极大地增强了网页的表现力、交互性和布局能力，使开发者能用纯 CSS 实现许多过去需要 JavaScript 或图片才能完成的效果。

## 选择器增强

- [属性选择器](/notes/css/base.html#属性选择器)：如 [type="text"]、[href $ =".pdf"]
- [伪类](/notes/css/base.html#伪类和伪元素)：如:nth-child(n)、:nth-of-type(n)、:first-child、:last-child、:not(selector)

## 盒模型与边框/背景增强

- [盒模型与边框](/notes/css/property.html#盒模型): 如 `box-sizing` `border-radius` `box-shadow` `border-image`

- [背景增强](/notes/css/property.html#背景)：如 `background-size` `background-clip` `background-origin` 背景渐变

## 文本与字体增强

- [文本属性](/notes/css/property.html#文本属性)：如 `text-overflow` `word-wrap` `overflow-wrap` `text-decoration`等

- [自定义字体](/notes/css/property.html#自定义字体)：如 `@font-face`

## 2D/3D 变换（Transforms）

- **2D 变换**：`rotate()`, `scale()`, `translate()`, `skew()`
- **3D 变换**：`rotateX()`, `rotateY()`, `perspective`, `transform-style: preserve-3d`
- 无需 JS 即可实现元素的空间变换。

## 过渡与动画

- **`transition`**：在状态变化时平滑过渡（如 hover 效果）。
  ```css
  .btn {
    transition: background-color 0.3s ease;
  }
  ```
- **`@keyframes` + `animation`**：创建复杂关键帧动画。
  ```css
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  .box {
    animation: slideIn 1s forwards;
  }
  ```

## 新型布局系统

### 1. **Flexbox（弹性盒子）**

- 一维布局利器，适合对齐、分布空间。
- 核心属性：`display: flex`, `justify-content`, `align-items`, `flex-direction` 等。

### 2. **Grid（网格布局）**

- 强大的二维布局系统，可同时控制行和列。
- 核心属性：`display: grid`, `grid-template-columns`, `grid-area`, `gap` 等。

### 3. **多列布局（Multi-column Layout）**

- 类似报纸排版：`column-count`, `column-gap`, `column-rule`

---
