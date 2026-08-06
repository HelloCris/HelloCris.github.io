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

## 过渡与动画

- [变形](/notes/css/property.html#变形-transform)：如 `transform`

- [过渡](/notes/css/property.html#过渡-transition)：如 `transition`

- [动画](/notes/css/property.html#动画-animation)：如 `@keyframes` `animation`

## 新型布局系统

- [flex布局](/notes/css/property.html#flex)：如 `flex` `flex-direction` `flex-wrap` `justify-content` `align-items` `align-content`

- [grid布局](/notes/css/property.html#grid)：如 `grid` `grid-template-columns` `grid-template-rows` `grid-gap` `grid-area`

- [多列布局（Multi-column Layout）](/notes/css/property.html#多列布局-multi-column-layout)：如 `column-count` `column-gap` `column-rule`

## 媒体查询

CSS3 媒体查询是响应式设计的核心技术，它允许开发者根据设备特性（如屏幕宽度、高度、分辨率、方向等）动态应用不同的样式规则，从而实现“一套代码，多端适配”。

```css
@media mediatype and|not|only (media feature) {
  /* CSS 规则 */
}
```

- **`@media`**：声明媒体查询的开始。
- **`mediatype`**：媒体类型，如 `screen`（屏幕）、`print`（打印）、`speech`（屏幕阅读器）等。
- **`and|not|only`**：逻辑关键字，用于组合或排除条件。
- **`(media feature)`**：媒体特性，如 `width`、`height`、`orientation`、`resolution` 等，必须用括号包裹。

```css
/* 1. 基础用法：当屏幕宽度小于 600px 时生效 */
@media (max-width: 600px) {
}

/* 2. 逻辑组合 (AND)：屏幕宽度在 600px 到 900px 之间时生效 */
@media (min-width: 600px) and (max-width: 900px) {
}

/* 3. 多条件 (OR)：屏幕宽度小于 600px 或者 是打印设备时生效 */
@media (max-width: 600px), print {
}
```
