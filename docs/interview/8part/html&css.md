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
