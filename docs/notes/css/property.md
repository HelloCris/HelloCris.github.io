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

## 文档流【todo】

### display & visibility

### 浮动 float

### 高度塌陷

## 盒模型

### 简述

CSS 盒子模型（Box Model）是 CSS 布局的核心基础，理解它对掌握页面排版、尺寸计算和元素定位至关重要。

```
+----------------------------+
|         margin             |
|  +----------------------+  |
|  |       border         |  |
|  |  +----------------+  |  |
|  |  |    padding     |  |  |
|  |  |  +----------+  |  |  |
|  |  |  | content  |  |  |  |
|  |  |  +----------+  |  |  |
|  |  +----------------+  |  |
|  +----------------------+  |
+----------------------------+
```

在 CSS 中，**每个 HTML 元素都被视为一个矩形盒子**，由以下四部分组成（从内到外）：
| 部分 | 说明 |
| ----------- | -------------------------------------------------------- |
| **content** | 实际内容区域（如文本、图片），由 `width` / `height` 控制 |
| **padding** | 内边距，内容与边框之间的空间（透明，受背景色影响） |
| **border** | 边框，围绕 padding 和 content |
| **margin** | 外边距，控制与其他元素的距离（透明，不占背景） |

> 📌 **总宽度公式（默认情况下）**：  
> `总宽度 = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right`  
> （高度同理）

### 两种盒模型 `box-sizing`

#### 1. **标准盒模型（content-box）** —— 默认

- `width` / `height` **仅指 content 区域**。
- padding、border 会**额外增加**元素总尺寸。

```css
.box {
  box-sizing: content-box; /* 默认值 */
  width: 200px;
  padding: 20px;
  border: 5px solid #000;
}
/* 实际占用宽度 = 200 + 20*2 + 5*2 = 250px */
```

#### 2. **IE 盒模型（border-box）**

- `width` / `height` **包含 content + padding + border**。
- padding 和 border **不会撑大**元素总尺寸。

```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid #000;
}
/* 实际占用宽度 = 200px（padding 和 border 向内挤压 content） */
```

### 盒模型相关属性

| 属性                        | 说明                               | 常用值                                    |
| --------------------------- | ---------------------------------- | ----------------------------------------- |
| `width` / `height`          | 内容区尺寸（受 `box-sizing` 影响） | `auto`, `px`, `%`, `em`, `max-content` 等 |
| `min-width` / `max-width`   | 最小/最大宽度（常用于响应式）      | `300px`, `100%`                           |
| `min-height` / `max-height` | 最小/最大高度                      | `200px`, `100vh`                          |
| `padding`                   | 内边距（4 个方向）                 | `10px`, `1em 2em`, `5%`                   |
| `border`                    | 边框（宽度+样式+颜色）             | `1px solid #ccc`, `2px dashed red`        |
| `margin`                    | 外边距（可为负值）                 | `10px`, `auto`, `-5px`                    |
| `box-sizing`                | 盒模型类型                         | `content-box`（默认）, `border-box`       |

::: info 注意

padding、border、margin 都可以设置多个值，分别对应上、右、下、左（顺时针）。  
例如：

```css
/* 外边距（4 个方向） */
margin: 10px; /* 上下左右 10px */
margin: 10px 20px; /* 上下 10px，左右 20px */
margin: 10px 20px 30px; /* 上 10px，左右 20px，下 30px */
margin: 10px 20px 30px 40px; /* 上 10px，右 20px，下 30px，左 40px */

/* 或者分别设置上、右、下、左 */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 30px;
margin-left: 40px;
```

| 属性      | 中文名 | 作用区域                | 是否影响背景                                                       | 是否可为负值                    |
| --------- | ------ | ----------------------- | ------------------------------------------------------------------ | ------------------------------- |
| `padding` | 内边距 | 内容 ↔ 边框之间         | ✅ 受 `background` 影响（背景会延伸到 padding 区）                 | ❌ 不可为负                     |
| `border`  | 边框   | 围绕 padding 和 content | ✅ 边框本身有样式，背景不覆盖 border（除非设置 `background-clip`） | ❌ 宽度不可为负                 |
| `margin`  | 外边距 | 元素 ↔ 其他元素之间     | ❌ 透明，不受背景影响                                              | ✅ 可以为负值（常用于微调布局） |

:::

### border

`border` 属性是一个简写属性，用于设置元素的边框宽度、样式和颜色。
| 属性 | 说明 | 常用值 |
| -------------- | -------- | ----------------------------- |
| `border-width` | 边框宽度 | `1px`, `2px` |
| `border-style` | 边框样式 | `solid`, `dashed`, `dotted` |
| `border-color` | 边框颜色 | `#000`, `red`, `rgb(255,0,0)` |

```css
border: 1px solid #ccc;
border-top: 2px dashed red;
```

| style可选值 | 说明             | 示例效果                                                 |
| ----------- | ---------------- | -------------------------------------------------------- |
| `none`      | 无边框（默认值） | 完全透明，不占空间（宽度为 0）                           |
| `hidden`    | 隐藏边框         | 与 `none` 类似，但在表格中用于解决边框冲突（优先级更高） |
| `solid`     | 实线边框         | ————————                                                 |
| `dashed`    | 虚线（长划线）   | - - - - - -                                              |
| `dotted`    | 点线（圆点）     | ··········                                               |
| `double`    | 双线边框         | ＝＝＝＝＝＝（两条线，中间有间隙）                       |

---

`border-radius` 实现边框圆角。  
`border-radius` 可以接受 **1 到 4 个值**，以及 `/` 分隔的两个方向（水平/垂直）半径。其顺序遵循“顺时针”原则。
| 数量 | 含义 |
| ---------- | --------------------------------------------------------------------- |
| **1 个值** | 四个角都使用相同的圆角半径（如：`10px`） |
| **2 个值** | 第一个控制左上/右下角，第二个控制右上/左下角（如：`10px 20px`） |
| **3 个值** | 左上 → 右上/左下 → 右下（如：`10px 20px 30px`） |
| **4 个值** | 按顺时针依次设置：左上、右上、右下、左下（如：`10px 20px 30px 40px`） |

- 使用 `/` 设置水平与垂直半径（椭圆弧）。**前一个值**：控制**水平方向**（x 轴）的半径；**后一个值**：控制**垂直方向**（y 轴）的半径

```css
border-radius: 100px / 50px;
```

- 单独设置某个角点的圆角，可以使用以下**独立属性**来精确控制每个角：

```css
// 圆角
border-top-right-radius: 100px;
border-top-left-radius: 100px;
border-bottom-left-radius: 100px;
border-bottom-right-radius: 100px;
// 椭圆角
border-top-right-radius: 100px 50px;
border-bottom-left-radius: 80px 40px;
border-bottom-right-radius: 60px 30px;
border-top-left-radius: 40px 20px;
```

> ⚠️ 格式：`水平半径 垂直半径`（顺序不可颠倒）

---

边框阴影 `box-shadow`

```css
box-shadow: h v blur spread color inset;
/* h：水平方向的偏移值（必填）, 正值向右，负值向左 */
/* v：垂直方向的偏移值（必填）, 正值向下，负值向上 */
/* blur：模糊半径（可选，默认为 0）, 值越大，阴影越模糊 */
/* spread：阴影的尺寸，扩展或收缩阴影大小（可选，默认为 0）, 正值扩大阴影范围，负值缩小阴影范围 */
/* color：阴影颜色（可选，默认为黑色） */
/* inset: 内阴影（可选，默认是外阴影） */

/* 外阴影：向右下偏移，模糊，扩展，红色 */
box-shadow: 10px 10px 5px 2px red;
/* 内阴影：向内偏移，不模糊，蓝色 */
box-shadow: inset 0 0 5px blue;

/* 多重阴影： */
box-shadow:
  2px 2px 4px rgba(0, 0, 0, 0.3),
  4px 4px 8px rgba(0, 0, 0, 0.5);
```

> 💡 提示：`box-shadow` 和 `text-shadow` 的语法结构一致，都支持多重阴影。

---

边框图片 `border-image`

```css
border-image-source: url("./images/border1.png"); /* 默认只填充容器四个角点 */
border-image-slice: 27 fill; /* 设置四个方向上的裁切距离，fill 表示内部填充 */
/* border-image-slice 可设置一个值（四边相同），或多个值：
    - 27 10：左右 27，上下 10
    - 27 20 15 5 fill：左 27，下 20，右 15，上 5，并填充内部 */
border-image-width: 27px; /* 边框图片宽度，未设置时默认为元素原始边框宽度 */
border-image-outset: 0px; /* 扩展边框，但会影响元素大小，box-sizing 不可挽回，建议不使用 */
border-image-repeat: stretch; /* 图片重复方式 */
/* border-image-repeat 可选值：
   - stretch：拉伸（默认）
   - repeat：重复
   - round：重复，且最后一个片段会自动缩放以填充剩余空间 */

/* 简写 */
border-image: source slice / width / outset repeat;
border-image: url("./images/border1.png") 27 / 27px / 0px stretch;
```

### margin

```css
margin: 20px;
margin: 0 auto; /* 水平居中（块级元素需指定 width） */
margin-left: auto;
margin-right: auto; /* 等效 */
```

关键特性：

1. 可为负值：常用于“拉近”元素。
2. 外边距合并（Margin Collapse）：
   - 相邻块级元素的垂直 margin 会合并（取最大值，非相加）。
   - 父子元素之间也可能合并（父无 border/padding 时）。
3. margin: auto 的妙用：
   - 在 Flex/Grid 容器中：可实现任意方向居中。
   - 在普通块级元素中：仅水平居中有效（需固定宽度）。

## 背景

### background

```css
background: [background-color] [background-image] [background-repeat]
  [background-attachment] [background-position] / [background-size]
  [background-origin] [background-clip];
```

| 子属性                  | 说明                                                               | 默认值              |
| ----------------------- | ------------------------------------------------------------------ | ------------------- |
| `background-color`      | 背景颜色                                                           | `transparent`       |
| `background-image`      | 背景图片（可为 `url()` 或 `none`）                                 | `none`              |
| `background-repeat`     | 图片重复方式（如 `repeat`, `no-repeat`, `repeat-x`, `repeat-y`）   | `repeat`            |
| `background-attachment` | 背景是否随页面滚动（`scroll`, `fixed`, `local`）                   | `scroll`            |
| `background-position`   | 背景图片起始位置（如 `center`, `top left`, `50% 50%`）             | `0% 0%`（即左上角） |
| `background-size`       | 背景图片尺寸（如 `auto`, `cover`, `contain`, `100px 200px`）       | `auto auto`         |
| `background-origin`     | 背景绘制起点（`border-box`, `padding-box`, `content-box`）         | `padding-box`       |
| `background-clip`       | 背景绘制区域（`border-box`, `padding-box`, `content-box`, `text`） | `border-box`        |

::: warning 注意

1. `background-size` 必须紧跟在 `background-position` 后面，并用 / 分隔。
2. `background-origin` 和 `background-clip` 不能直接在标准 `background` 简写中使用（某些浏览器可能支持，但不推荐）。建议单独声明。
3. 如果同时设置 `background-color` 和 `background-image`，颜色会作为图片的底层显示（当图片透明或未覆盖全部区域时可见）。
4. 使用简写属性时，未指定的子属性会被重置为默认值，这可能导致意外覆盖。

:::

### 背景渐变

- linear-gradient()
- radial-gradient()
- repeating-linear-gradient() / repeating-radial-gradient()

#### 线性渐变

**语法：**  
`background: linear-gradient(direction, color1, color2...color3);`

**参数说明：**

- `direction`：表示线性渐变的方向，
  - `to left`：设置渐变为从右到左。相当于：270deg；
  - `to right`：设置渐变从左到右。相当于：90deg；
  - `to top`：设置渐变从下到上。相当于：0deg；
  - `to bottom`：设置渐变从上到下。相当于：180deg。这是默认值。
  - `45deg`：45度方向渐变。

- `color1`：起点颜色。
- `color2`：过渡颜色，指定过渡颜色的位置。
- `color3`：结束颜色。你还可以在后面添加更多的过渡颜色和位置，表示多种颜色的渐变。

**示例：**  
`background: linear-gradient(to right, blue, green 20%, yellow 50%, purple 80%, red);`

---

#### 径向渐变

**语法：**  
`background: radial-gradient(shape size at position, start-color, ..., color..., last-color);`

**参数说明：**

- `shape`：渐变的形状。
  - `ellipse`：表示椭圆形；
  - `circle`：表示圆形。默认为 **ellipse**；
  - **如果元素宽高相同为正方形，则 ellipse 和 circle 显示一样；**
  - **如果元素宽高不相同，默认效果为 ellipse。**

- `size`：渐变的大小，即渐变到哪里停止。它有四个值：
  - `closest-side`：最近边；
  - `farthest-side`：最远边；
  - `closest-corner`：最近角；
  - `farthest-corner`：最远角。默认是 **最远角**。

- `at position`：渐变的中心位置。比如：
  - `at top left`：中心为元素左上角位置；
  - `at center center`：中心为元素中心位置；
  - `at 5px 10px`：中心为偏移元素左上角位置右边 5px，下边 10px 位置。

- `start-color`：起始颜色；
- `color`：渐变颜色，可选起始位置 stop；
- `last-color`：结束颜色。

**示例：**  
`background: radial-gradient(circle farthest-side at right top, red, yellow 50%, blue);`

---

#### 重复渐变

- `repeating-linear-gradient()`：重复线性渐变
- `repeating-radial-gradient()`：重复径向渐变

> 它们的行为与普通渐变类似，但**只要颜色停止点的范围有限，就会自动平铺重复**。

1. **必须指定位置**  
   ❌ 错误（不会重复）：

   ```css
   background: repeating-linear-gradient(
     red,
     blue
   ); /* 无位置，等同于普通渐变 */
   ```

   ✅ 正确：

   ```css
   background: repeating-linear-gradient(red 0px, blue 10px);
   ```

2. **颜色停止点顺序决定重复单元**  
   从第一个到最后一个 stop 构成一个“图案单元”，然后重复。

## CSS动效

### 过渡（Transition）

`transition` 是 CSS 中用于**在元素状态变化时创建平滑动画效果**的属性。比如鼠标悬停（`:hover`）、聚焦（`:focus`）或类名切换时，让颜色、大小、位置等属性的变化不是突变，而是**渐变过渡**。

基本语法：

```css
selector {
  transition: property duration timing-function delay;
}

/* 也可以分开写： */
selector {
  transition-property: width;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.1s;
}
```

| 属性                         | 说明                                 | 常用值                                                                      |
| ---------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| `transition-property`        | 要过渡的 CSS 属性                    | `all`, `width`, `background-color`, `opacity` 等                            |
| `transition-duration`        | 过渡持续时间（必须设置，否则无效果） | `0.3s`, `500ms`                                                             |
| `transition-timing-function` | 过渡的速度曲线                       | `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(...)` |
| `transition-delay`           | 延迟多久开始过渡                     | `0s`, `0.2s`                                                                |

> 💡 最常用的是简写：
>
> ```css
> transition: all 0.3s ease;
> ```

### 变形（Transform）

`CSS transform` 是一个非常强大的属性，用于**对元素进行 2D 或 3D 空间变换**，比如移动、旋转、缩放、倾斜等，而**不会影响文档流**（即不会推挤其他元素），性能也很好（尤其配合 `transition` 或 `animation` 使用时）。

基本语法：

```css
selector {
  transform: <transform-function> [<transform-function>] *;
}
```

可以连续使用多个变换函数，**从左到右依次应用**（注意顺序会影响结果！）。

#### **2D 变换**

| 函数                              | 说明               | 示例                                |
| --------------------------------- | ------------------ | ----------------------------------- |
| `translate(x, y)`                 | 平移（移动）       | `transform: translate(50px, 20px);` |
| `translateX(x)` / `translateY(y)` | 单方向平移         | `transform: translateX(100px);`     |
| `scale(sx, sy)`                   | 缩放（1 = 原大小） | `transform: scale(1.2);`            |
| `scaleX(sx)` / `scaleY(sy)`       | 单方向缩放         | `transform: scaleY(0.5);`           |
| `rotate(angle)`                   | 旋转（角度）       | `transform: rotate(45deg);`         |
| `skew(ax, ay)`                    | 倾斜（剪切）       | `transform: skew(10deg, 5deg);`     |
| `skewX(ax)` / `skewY(ay)`         | 单方向倾斜         | `transform: skewX(20deg);`          |

#### **3D 变换**

| 函数                                                 | 说明                             |
| ---------------------------------------------------- | -------------------------------- |
| `translate3d(x, y, z)`                               | 3D 平移                          |
| `scale3d(sx, sy, sz)`                                | 3D 缩放                          |
| `rotateX(angle)`, `rotateY(angle)`, `rotateZ(angle)` | 绕 X/Y/Z 轴旋转                  |
| `perspective(n)`                                     | 设置 3D 透视（通常用在父容器上） |

> ⚠️ 使用 3D 变换时，建议加上：
>
> ```css
> transform-style: preserve-3d; /* 子元素保留 3D 空间 */
> perspective: 800px; /* 父容器设置透视 */
> ```

#### ⚠️ 注意事项

1. **`transform` 不会脱离文档流**，但视觉位置会变，**不影响其他元素布局**。
2. **默认变换原点是元素中心**（`transform-origin: center`），可修改：
   ```css
   transform-origin: top left; /* 从左上角旋转/缩放 */
   ```
3. **与 `transition` 或 `animation` 搭配效果最佳**。
4. **避免对 `width`/`height`/`left`/`top` 做动画**，优先用 `transform`（性能更高，不会触发重排）。

5. `transform` 和 `opacity` 是**仅触发合成（composite）** 的属性，不会引起 layout（重排）或 paint（重绘），因此**动画更流畅**，适合做高性能交互动画。

### 动画（Animation）

一个动画至少需要两个属性：

- `animation-name`：动画的名字（创建动画时起的名字，如下为 moveTest）
- `animation-duration`：动画的耗时

```css
animation-name: moveTest;
animation-duration: 2s;
```

如需在 CSS3 中创建动画，需要学习 `@keyframes` 规则。`@keyframes` 规则用于创建动画。在 `@keyframes` 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。

使用 `@keyframes` 关键字来创建动画。

```css
@keyframes moveTest {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translateY(200px);
  }
  100% {
    transform: translate(200px, 200px);
  }
}
```

其中，百分比是指整个动画耗时的百分比。

- `0%`：动画起始位置，也可以写成 from
- `100%`：动画终点位置，也可以写成 to

#### 动画的其他属性

1. `animation-iteration-count`：设置动画的播放次数，默认为 1 次。可以指定具体的数值，也可以指定 `infinite`（无限次）

2. `animation-direction`：设置交替动画，默认值为 `normal`，可以设置为 `alternate` 来回交替

3. `animation-delay`：设置动画的延迟，例如 2s

4. `animation-fill-mode`：设置动画结束时的状态：默认情况下，动画执行完毕之后，会回到原始状态。可以设置为 `forwards` 或 `backwards` 或 `both`。

5. `animation-timing-function`：动画的时间函数（动画的效果，平滑、先快后慢等），默认值为 `ease`。动画的时间函数：`linear`, `ease`...

6. `animation-play-state`：设置动画的播放状态，默认值为 `running`，可以设置为 `paused` 暂停动画

## 布局

### flex

- 替代传统 `float` + `position` 的复杂布局方式。
- 父容器设为 `display: flex;` 后，其**直接子元素**成为“伸缩项”（flex items），默认**横向排列**。

#### 父容器属性

1. `justify-content`（主轴对齐）

控制子元素在**主轴**（默认水平方向）上的对齐方式：

> - `flex-start`：靠左（默认）
> - `flex-end`：靠右
> - `center`：居中
> - `space-between`：两端对齐，中间等间距
> - `space-around`：每个子元素两侧等间距（元素间间距 = 2 × 边缘间距）

2. `align-items`（侧轴对齐）

控制子元素在**侧轴**（默认垂直方向）上的对齐：

> - `flex-start`：顶部对齐
> - `flex-end`：底部对齐
> - `center`：垂直居中
> - `stretch`：拉伸填满（默认，前提是子元素未设高度）
> - `baseline`：按文本基线对齐

3. `flex-flow`（简写属性）

是 `flex-direction` + `flex-wrap` 的简写，默认值：`row nowrap`

> - **`flex-wrap`**：是否换行
>   - `nowrap`（默认）：不换行，压缩子元素
>   - `wrap`：换行（从上到下）
>   - `wrap-reverse`：反向换行（从下到上）

> - **`flex-direction`**：主轴方向
>   - `row`：水平从左到右（默认）
>   - `row-reverse`：水平从右到左
>   - `column`：垂直从上到下
>   - `column-reverse`：垂直从下到上

---

#### 子元素属性

1. `align-self`

单独覆盖 `align-items`，为**单个子元素**设置侧轴对齐方式（值同 `align-items`）。

2. `flex`（核心属性，简写）

语法：`flex: [grow] [shrink] [basis]`

- **`flex-grow`**（扩展比例，默认 0）  
  占据**剩余空间**的比例。例如：两个子元素 `flex-grow: 1` 和 `2`，则按 1:2 分配剩余空间。

- **`flex-shrink`**（收缩比例，默认 1）  
  当空间不足时，按比例缩小。设为 `0` 则不收缩（可能溢出）。

- **`flex-basis`**：设定初始主轴尺寸（如 `100px`, `auto` 等）

### grid

- **定位**：专为**二维布局**（行 + 列）设计的布局系统，适合构建复杂页面结构（如仪表盘、相册、整体页面框架）。
- **启用方式**：在父容器设置 `display: grid` 或 `display: inline-grid`，其直接子元素自动成为“网格项”（grid items）。

#### 父容器属性（Grid Container）

**1. 定义网格轨道（Tracks）**

| 属性                    | 说明             | 示例                                    |
| ----------------------- | ---------------- | --------------------------------------- |
| `grid-template-columns` | 定义**列**的宽度 | `grid-template-columns: 100px 1fr 2fr;` |
| `grid-template-rows`    | 定义**行**的高度 | `grid-template-rows: auto 100px;`       |
| `grid-template-areas`   | 通过命名区域布局 | 见下文示例                              |

**单位说明**：

- `fr`：**弹性单位**（剩余空间比例），如 `1fr 2fr` 表示 1:2 分配剩余空间
- `auto`：根据内容自适应
- `minmax(min, max)`：设定轨道尺寸范围，如 `minmax(100px, 1fr)`
- `repeat()`：简化重复值，如 `repeat(3, 1fr)` = `1fr 1fr 1fr`

**2. 间距与对齐**

| 属性                             | 说明                                                        |
| -------------------------------- | ----------------------------------------------------------- |
| `gap` / `row-gap` / `column-gap` | 设置**行/列间隙**（替代 `grid-row-gap` 等旧属性）           |
| `justify-items`                  | **所有网格项**在**行轴**（水平）上的对齐方式                |
| `align-items`                    | **所有网格项**在**列轴**（垂直）上的对齐方式                |
| `justify-content`                | 整个网格在容器中的**水平对齐**（当网格总宽 < 容器宽时生效） |
| `align-content`                  | 整个网格在容器中的**垂直对齐**（当网格总高 < 容器高时生效） |

> ⚠️ 注意：
>
> - `justify-items`/`align-items` 作用于**单个网格项**
> - `justify-content`/`align-content` 作用于**整个网格**

**3. 自动填充轨道**

- `grid-auto-columns` / `grid-auto-rows`：定义**隐式创建的轨道**尺寸（当网格项超出显式定义的网格时）
- `grid-auto-flow`：控制自动放置规则
  - `row`（默认）：逐行填充
  - `column`：逐列填充
  - `dense`：尝试填充空白（可能导致顺序错乱）

---

#### 子元素属性（Grid Items）

**1. 定位与跨度**

| 属性                                    | 说明                       | 示例                                           |
| --------------------------------------- | -------------------------- | ---------------------------------------------- |
| `grid-column-start` / `grid-column-end` | 指定**列起止线**           | `grid-column: 2 / 4;`（从第2线到第4线，跨2列） |
| `grid-row-start` / `grid-row-end`       | 指定**行起止线**           | `grid-row: 1 / span 2;`（从第1线开始跨2行）    |
| **简写**                                | `grid-column` / `grid-row` | `grid-column: 1 / -1;`（占满整行）             |

> 🔢 **线编号规则**：
>
> - 从 `1` 开始，`-1` 表示最后一根线
> - 跨度可用 `span N`（如 `span 2` 表示跨2轨道）

**2. 区域命名（推荐！）**

```css
/* 父容器 */
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 200px 1fr;
}

/* 子元素 */
.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

**3. 单项对齐（覆盖父容器设置）**

- `justify-self`：单个网格项在**行轴**对齐
- `align-self`：单个网格项在**列轴**对齐  
  （值同 `justify-items`/`align-items`，如 `start`, `center`, `stretch`）

### 多列布局（Multi-column Layout）

**用途**：  
模拟报纸排版，将长段文本分成多列显示，提升可读性，尤其适用于大屏设备。

**常用属性**：
| 属性 | 说明 |
|------|------|
| `column-count` | 设置列的数量 |
| `column-width` | 设置每列的理想宽度 |
| `column-gap` | 设置列与列之间的间距 |
| `column-rule` | 设置列之间的分隔线（宽度、样式、颜色） |
| `column-span` | 设置元素跨越的列数（`1` 或 `all`） |
| `max-height` | 可限制列容器高度；内容会从左到右、从上到下依次填充各列 |

**重要规则（“取大优先”原则）**：

- 当同时设置 `column-count` 和 `column-width` 时，则优先保证列数，浏览器会自动计算列宽。
- **若手动设置的 `column-width` > 自动计算值 → 以手动设置为准**。
- **若手动设置的 `column-width` < 自动计算值 → 以自动计算值为准**。
- 若列宽总和小于容器宽度，实际列宽可能被拉大以填满容器。

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
