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
