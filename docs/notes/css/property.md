# CSS属性

## 字体&文本

### 字体属性

| 属性           | 说明                                                               |
| -------------- | ------------------------------------------------------------------ |
| `font-family`  | 指定字体族（如 `'Arial'`, `'微软雅黑'`, `serif`, `sans-serif` 等） |
| `font-size`    | 设置字体大小（如 `16px`, `1.2em`, `100%` 等）                      |
| `font-weight`  | 设置字体粗细（如 `normal`, `bold`, `400`, `700` 等）               |
| `font-style`   | 设置字体风格（如 `normal`, `italic`, `oblique`）                   |
| `font-variant` | 设置小型大写字母（如 `normal`, `small-caps`）                      |
| `font-stretch` | 设置字体宽窄（较少使用，如 `condensed`, `expanded`）               |
| `line-height`  | 设置行高（影响文本垂直间距，如 `1.5`, `24px`）                     |

- `font` 是个简写属性，可同时设置多个字体属性（顺序：`[font-style] [font-variant] [font-weight] font-size[/line-height] font-family`），其中`font-size`和`font-family`是必填项，其他项可选。
- `line-height` 需要放到`font`后面，否则会被`font`重新覆盖成默认值。或者直接将`line-height`写在`font`属性里面

### 文本属性

| 属性                                               | 说明                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `color`                                            | 设置文本颜色（如 `#333`, `rgb(0,0,0)`, `red`）                                           |
| `text-align`                                       | 设置文本水平对齐方式（如 `left`, `center`, `right`, `justify`）                          |
| `text-decoration`                                  | 设置文本装饰线（如下划线、删除线等，如 `none`, `underline`, `line-through`）             |
| `text-transform`                                   | 控制字母大小写（如 `uppercase`, `lowercase`, `capitalize`）                              |
| `text-indent`                                      | 设置首行缩进（如 `2em`）                                                                 |
| `letter-spacing`                                   | 设置字符间距（如 `1px`, `-0.5px`）                                                       |
| `word-spacing`                                     | 设置单词间距（对空格分隔的单词有效）                                                     |
| `white-space`                                      | 控制空白符处理（如 `normal`, `nowrap`, `pre`, `pre-wrap`）                               |
| `text-overflow`                                    | 设置溢出文本的显示方式（常配合 `overflow` 和 `white-space: nowrap` 使用，如 `ellipsis`） |
| `word-break` / `word-wrap`（现为 `overflow-wrap`） | 控制单词换行行为（如 `break-all`, `keep-all`, `normal`）                                 |
| `text-shadow`                                      | 设置文本阴影（如 `2px 2px 4px rgba(0,0,0,0.5)`）                                         |
| `direction`                                        | 设置文本方向（如 `ltr`, `rtl`）                                                          |

### 自定义字体

`@font-face` 是 CSS 中用于自定义字体的关键规则，允许开发者加载并使用用户设备上未安装的字体文件，从而实现更丰富的网页排版效果。

```css
@font-face {
  font-family: "MyCustomFont"; /* 自定义字体名称（任意命名） */
  src:
    url("fonts/myfont.woff2") format("woff2"),
    url("fonts/myfont.woff") format("woff"); /* 字体文件路径 + 格式 */
  font-weight: normal; /* 字重（如 400, bold, 700 等） */
  font-style: normal; /* 字体样式（normal / italic） */
  font-display: swap; /* 可选：控制字体加载期间的显示行为 */
}
```

## 盒模型

## 附录

### 附1：不换行展示省略号（单行 & 多行）

```css
/* 单行 */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行（例如 2 行） */
.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```
