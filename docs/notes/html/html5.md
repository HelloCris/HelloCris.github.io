# HTML5

## 简介

HTML5 是 超文本标记语言（HTML）的第五个主要版本，由 W3C（万维网联盟）和 WHATWG 共同制定，于 2014 年 10 月正式成为 W3C 推荐标准。它不仅是一套新的标签，更是一整套现代 Web 开发技术的集合，包括语义化标签、多媒体支持、本地存储、Canvas 绘图、地理定位、离线应用等。

::: info **设计目的**

1. 简化 Web 开发
   提供更清晰、语义化的标签（如 `header`、`article`、`nav`），取代过去滥用的 `div`。
2. 原生支持多媒体
   无需插件（如 Flash）即可播放音频（`audio`）和视频（`video`）。
3. 提升用户体验与性能
   支持离线存储（`localStorage`、`IndexedDB`）、Web Workers（多线程）、WebSocket（实时通信）等。
4. 跨平台兼容性
   适配桌面、移动设备、平板等不同终端，推动“一次开发，多端运行”。
5. 增强可访问性与 SEO
   语义化结构让搜索引擎和辅助工具更容易理解页面内容。

:::

::: info **优缺点**

1. 优点

- ✅ 语义化更强：代码结构清晰，利于维护和 SEO。
- ✅ 原生多媒体支持：无需第三方插件。
- ✅ 丰富的 API：如 Canvas、Geolocation、Drag & Drop、File API 等。
- ✅ 离线能力：通过 Application Cache（已废弃）或 Service Workers 实现离线应用。
- ✅ 跨平台：在手机、平板、PC 上表现一致。

2. 缺点

- ❌ 兼容性问题：旧版浏览器（如 IE8 及以下）不支持 HTML5，需 polyfill 或降级处理。
- ❌ 安全风险：如 localStorage 明文存储、WebSocket 需防范 CSRF 等。
- ❌ 性能限制：复杂动画或游戏仍不如原生应用流畅（尽管 WebAssembly 正在改善这一点）。

:::

::: info **典型应用场景**

- 响应式网站与移动 Web 应用（如新闻站、电商首页）
- 在线音视频平台（如 YouTube、播客网站使用 video/audio）
- 单页应用（SPA）：结合 Vue/React + HTML5 History API 实现无刷新导航
- 游戏与数据可视化：使用 canvas 或 WebGL（基于 HTML5 环境）
- 离线应用：如笔记类 App（Evernote Web 版）、待办清单
- 地理位置服务：打车、外卖、地图类 Web 应用

:::

## 语义化标签

语义化标签 是指那些名称本身就能表达其内容含义或结构角色的 HTML 标签。相比过去大量使用 div，语义化标签让代码更清晰、可读性更强，同时有利于：SEO、无障碍访问、团队协作与代码维护。

### 结构标签

| 标签      | 作用                                                                  | 是否可重复使用 | 典型位置                                  |
| --------- | --------------------------------------------------------------------- | -------------- | ----------------------------------------- |
| `header`  | 表示区块的介绍性内容或头部信息（如标题、logo、导航等）                | ✅ 是          | 页面顶部、`<article>` 或 `<section>` 内部 |
| `footer`  | 表示父级内容区块的尾部信息（如版权、作者、相关链接等）                | ✅ 是          | 页面底部、`<article>` 或 `<section>` 底部 |
| `nav`     | 定义主要导航链接区域                                                  | ✅ 是          | 页面顶部、侧边栏（但主导航通常只一个）    |
| `main`    | 表示页面核心、唯一的主要内容                                          | ❌ 否          | 页面中央主体区域（仅能出现一次）          |
| `section` | 表示一个主题相关的独立内容块，通常带有标题                            | ✅ 是          | 首页模块、文章章节、表单分组等            |
| `article` | 表示可独立分发或复用的内容单元（如博客、新闻、评论）                  | ✅ 是          | 博客列表项、新闻摘要、用户评论区          |
| `aside`   | 表示与主内容相关但可独立存在的辅助信息                                | ✅ 是          | 侧边栏、文章右侧推荐区、弹出提示旁注      |
| `figure`  | 表示自包含的媒体内容单元（如图片、图表、代码），常配合 `<figcaption>` | ✅ 是          | 文章插图、数据可视化区域、代码示例块      |

### 表单标签

::: info **新增`<input>`类型type**
| 类型 | 作用 | 移动端键盘 | 示例 |
|------|------|-----------|------|
| `email` | 邮箱地址 | 邮箱键盘（带 @ 和 .） | `<input type="email">` |
| `url` | 网址 | URL 键盘（带 . / :） | `<input type="url">` |
| `number` | 数字 | 数字键盘 | `<input type="number" min="0" max="100">` |
| `range` | 滑块选择 | — | `<input type="range" min="0" max="10">` |
| `date` | 日期选择器 | 日期选择器 | `<input type="date">` |
| `time` | 时间选择器 | 时间键盘 | `<input type="time">` |
| `datetime-local` | 本地日期+时间 | 日期+时间选择器 | `<input type="datetime-local">` |
| `month` | 年月选择 | 年月选择器 | `<input type="month">` |
| `week` | 周选择 | 周选择器 | `<input type="week">` |
| `color` | 颜色选择器 | 调色板 | `<input type="color">` |
| `search` | 搜索框 | 带“搜索”按钮的键盘 | `<input type="search">` |
| `tel` | 电话号码 | 数字/拨号键盘 | `<input type="tel">` |

:::

::: info **新增表单属性**

1. 通用表单控件属性
   | 属性 | 作用 | 示例 |
   |------|------|------|
   | `placeholder` | 输入提示文本（浅灰色占位符） | `<input placeholder="请输入邮箱">` |
   | `required` | 必填字段（提交时自动校验） | `<input required>` |
   | `autofocus` | 页面加载时自动聚焦 | `<input autofocus>` |
   | `autocomplete` | 是否启用自动填充（`on`/`off`） | `<input autocomplete="on">` |
   | `disabled` | 禁用字段（不提交） | `<input disabled>` |
   | `readonly` | 只读（可提交，但不可编辑） | `<input readonly>` |

2. 数值/范围控制属性
   | 属性 | 作用 | 适用类型 |
   |------|------|--------|
   | `min` / `max` | 设置最小/最大值 | `number`, `range`, `date` 等 |
   | `step` | 步长（如 `step="0.5"`） | `number`, `range` |
   | `pattern` | 正则表达式校验 | 所有文本类输入（`text`, `email` 等） |

3. 表单级别属性(在`<form>`上使用)
   | 属性 | 作用 |
   |------|------|
   | `novalidate` | 关闭浏览器默认验证（用于自定义验证） |
   | `autocomplete` | 整个表单是否启用自动填充 |

:::

::: info **新增表单元素**

1. `<datalist>`: 输入建议下拉列表，为 `<input>` 提供预定义的选项建议（类似自动补全）。用户既可以从下拉列表中选择，也可以手动输入自定义值。不同于 `<select>`，它不是强制选择，而是辅助输入。

```html
<input list="browser" />
<datalist id="browser">
  <option value="Internet Explorer"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Safari"></option>
</datalist>
```

2. `<progress>`: 任务进度指示器，表示某个任务的完成进度（如文件上传、数据加载、安装过程）。是动态、可更新的 UI 元素（通常配合 JavaScript 使用）。

```html
<progress max="100" value="50"></progress>
```

:::

### 媒体标签

::: info **`<video>` —— 视频播放**

```html
<video src="movie.mp4" controls width="640" height="360">
  您的浏览器不支持 HTML5 视频。
</video>
<video controls width="640" poster="cover.jpg">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.webm" type="video/webm" />
  <source src="movie.ogv" type="video/ogg" />
  您的浏览器不支持 HTML5 视频。
</video>
```

| 属性       | 说明                                           |
| ---------- | ---------------------------------------------- |
| `src`      | 视频文件路径（也可用 `<source>` 子元素替代）   |
| `controls` | 显示播放控件（播放/暂停、音量、进度条等）      |
| `autoplay` | 自动播放（部分浏览器因策略限制需配合 `muted`） |
| `muted`    | 静音播放（常用于自动播放场景）                 |
| `loop`     | 循环播放                                       |
| `poster`   | 视频加载前显示的封面图                         |
| `preload`  | 预加载策略：`none` / `metadata` / `auto`       |

:::

::: info **`<audio>` —— 音频播放**

```html
<audio src="music.mp3" controls>您的浏览器不支持 audio 标签。</audio>
<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
  <source src="song.ogg" type="audio/ogg" />
  您的浏览器不支持 HTML5 音频。
</audio>
```

> 属性：与 `<video>` 类似，包括：`controls`、`autoplay`、`loop`、`muted`、`preload`

:::

::: info **`<source>和<track>`标签**

1. `<source>` 标签：
   - 作为 `<video>` 或 `<audio>` 的子元素，用于**指定多个媒体源**。
   - 浏览器会按顺序尝试加载，直到找到支持的格式。
   - 通过 `type` 属性帮助浏览器快速判断是否支持，避免无效请求。

2. `<track>` 标签（字幕/章节支持）：
   - 为视频或音频提供**外挂文本轨道**，如字幕、标题、描述等。
   - 支持多语言字幕，提升无障碍访问能力。
   - `kind`：类型（`subtitles` 字幕 / `captions` 听障字幕 / `descriptions` 描述 / `chapters` 章节）
   - `srclang`：语言代码（如 `zh`, `en`）
   - `default`：默认启用该轨道
     > ⚠️ 字幕文件需为 **WebVTT 格式**（`.vtt`）

```html
<video controls>
  <source src="movie.mp4" type="video/mp4" />
  <track kind="subtitles" src="zh.vtt" srclang="zh" label="中文" default />
  <track kind="subtitles" src="en.vtt" srclang="en" label="English" />
</video>
```

:::

### 其他功能标签

- mark：标注；
- time：数据标签，给搜索引擎使用；
  发布日期 `<time datetime="2014-12-25T09:00">9：00</time>`
  更新日期 `<time datetime="2015-01-23T04:00" pubdate>4:00</time>`
- ruby和rt：对某一个字进行注释；
  `<ruby><rt>注释内容</rt><rp>浏览器不支持时如何显示</rp></ruby>`
- wbr：软换行，页面宽度到需要换行时换行；
- canvas：使用JS代码做内容进行图像绘制；
- details ：展开菜单；
- output：输出标签，用于显示脚本的输出结果；
- meter：度量值指示器（标量测量）

## API

### 网络：online/offline

```js
window.addEventListener("online", function () {
  console.log("网络已连通");
});
window.addEventListener("offline", function () {
  console.log("网络已断开");
});
```

### 全屏接口

| 方法/属性                     | 作用             | 兼容性说明             |
| ----------------------------- | ---------------- | ---------------------- |
| `element.requestFullscreen()` | 请求进入全屏     | 需要前缀               |
| `document.exitFullscreen()`   | 退出全屏         | 只能由 `document` 调用 |
| `document.fullscreenElement`  | 获取当前全屏元素 | 判断是否处于全屏状态   |

### 文件读取

| 对象         | 作用                                                            |
| ------------ | --------------------------------------------------------------- |
| `FileList`   | 表示用户选择的文件列表（通常来自 `<input type="file">`）        |
| `File`       | 继承自 `Blob`，表示单个文件对象，包含文件名、大小、类型等元数据 |
| `FileReader` | 用于异步读取文件内容（文本、二进制、DataURL 等）                |

```html
<input type="file" id="fileInput" />
<script>
  document.getElementById("fileInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log("文件内容:", e.target.result);
      };
      reader.readAsText(file); // 读为文本（UTF-8）
      reader.readAsDataURL(file); // 读为 Base64 Data URL（常用于图片预览）
      reader.readAsArrayBuffer(file); // 读为二进制 ArrayBuffer（用于音频/视频处理）
    }
  });
</script>
```

### 拖拽接口

1. 可拖拽元素
   - 添加 `draggable="true"` 属性。默认可拖拽的元素：`<a>`（带 href）、`<img>`、选中的文本。
2. 拖拽事件
   | 事件 | 触发对象 | 说明 |
   |------|--------|------|
   | `dragstart` | 被拖拽元素 | 拖拽开始（可设置传输数据） |
   | `drag` | 被拖拽元素 | 拖拽过程中持续触发 |
   | `dragend` | 被拖拽元素 | 拖拽结束（无论成功与否） |
   | `dragenter` | 目标容器 | 拖拽元素进入目标区域 |
   | `dragover` | 目标容器 | 拖拽元素在目标区域内移动（必须阻止默认行为！） |
   | `dragleave` | 目标容器 | 拖拽元素离开目标区域 |
   | `drop` | 目标容器 | 在目标区域释放鼠标（必须阻止默认行为！） |
   > ⚠️ 关键：dragover 和 drop 事件必须调用 event.preventDefault()，否则 drop 不会触发！
3. 常用 dataTransfer 属性与方法
   | 属性/方法 | 作用 |
   |----------|------|
   | `setData(format, data)` | 设置拖拽数据（`format` 如 `'text/plain'`） |
   | `getData(format)` | 获取拖拽数据 |
   | `clearData([format])` | 清除数据 |
   | `effectAllowed` | 设置允许的拖拽效果（`copy`, `move`, `link`） |
   | `dropEffect` | 设置实际拖拽效果（视觉反馈） |
   | `files` | 如果拖入的是文件，此处为 `FileList`（用于文件拖拽上传） |

```js
//示例：元素位置交换（看板/任务管理）
// 拖拽任务卡片
taskCard.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", taskCard.id);
});
// 放入新列
column.addEventListener("drop", (e) => {
  e.preventDefault();
  const taskId = e.dataTransfer.getData("text/plain");
  column.appendChild(document.getElementById(taskId));
});
```

### 地理定位 Geolocation

通过 `navigator.geolocation` 对象提供两个主要方法：

1. `getCurrentPosition(success, error, options)`

- **用途**：获取**当前**位置（一次性）
- **参数**：
  - `success`: 成功回调（必填）
  - `error`: 错误回调（可选）
  - `options`: 配置选项（可选）

2. `watchPosition(success, error, options)`

- **用途**：**持续监听**位置变化（如导航、运动轨迹）
- 返回一个 `watchId`，可用于 `clearWatch(watchId)` 停止监听

| option选项           | 类型    | 默认值     | 说明                                         |
| -------------------- | ------- | ---------- | -------------------------------------------- |
| `enableHighAccuracy` | boolean | `false`    | 是否启用高精度模式（GPS vs 网络定位）        |
| `timeout`            | number  | `Infinity` | 等待位置响应的最大时间（毫秒）               |
| `maximumAge`         | number  | `0`        | 允许使用缓存位置的最大时间（0 = 不使用缓存） |

| 返回值coords属性   | 类型   | 说明                                  |
| ------------------ | ------ | ------------------------------------- |
| `latitude`         | number | 纬度（十进制度）                      |
| `longitude`        | number | 经度（十进制度）                      |
| `accuracy`         | number | 位置精度（米）✅ **必有**             |
| `altitude`         | number | 海拔（米，可能为 `null`）             |
| `altitudeAccuracy` | number | 海拔精度（米，可能为 `null`）         |
| `heading`          | number | 行进方向（角度，0=北，可能为 `null`） |
| `speed`            | number | 速度（米/秒，可能为 `null`）          |

| `error.code` | 常量                   | 说明                              |
| ------------ | ---------------------- | --------------------------------- |
| `1`          | `PERMISSION_DENIED`    | 用户拒绝授权                      |
| `2`          | `POSITION_UNAVAILABLE` | 无法获取位置（如 GPS 无信号）     |
| `3`          | `TIMEOUT`              | 超时未返回结果                    |
| 其他         | —                      | 自定义错误信息（`error.message`） |

> 🔒 **安全限制**：
>
> - 必须在 **HTTPS** 或 **localhost** 下使用（现代浏览器强制要求）
> - 首次访问会弹出权限请求框

```js
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("纬度:", position.coords.latitude);
      console.log("经度:", position.coords.longitude);
      console.log("精度:", position.coords.accuracy, "米");
      console.log("海拔:", position.coords.altitude); // 可能为 null
      console.log("时间戳:", new Date(position.timestamp));
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("用户拒绝了位置请求");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("位置信息不可用");
          break;
        case error.TIMEOUT:
          console.error("请求超时");
          break;
        default:
          console.error("未知错误:", error.message);
      }
    },
    {
      enableHighAccuracy: true, // 高精度（可能更耗电）
      timeout: 10000, // 超时时间（毫秒）
      maximumAge: 60000, // 允许使用缓存位置的最大年龄（毫秒）
    },
  );
} else {
  console.error("浏览器不支持地理定位");
}
```

## web存储

### **`localStorage`** 和 **`sessionStorage`**

| 要点             | 说明                                             |
| ---------------- | ------------------------------------------------ |
| **两大接口**     | `localStorage`（永久）、`sessionStorage`（会话） |
| **核心方法**     | `setItem`, `getItem`, `removeItem`, `clear`      |
| **只能存字符串** | 对象需 `JSON.stringify/parse`                    |
| **安全限制**     | 同源策略、HTTPS 下可用                           |
| **替代 Cookie**  | 更大容量、不随请求发送                           |

| 特性                     | `localStorage`                       | `sessionStorage`                      |
| ------------------------ | ------------------------------------ | ------------------------------------- |
| **生命周期**             | 永久存储（除非手动清除）             | 仅限当前会话（关闭标签页/窗口后清除） |
| **作用域**               | 同源（协议+域名+端口）的所有页面共享 | 仅限**同一个标签页/窗口**内有效       |
| **存储容量**             | 约 5–10 MB（各浏览器不同）           | 约 5–10 MB                            |
| **是否随 HTTP 请求发送** | ❌ 不发送                            | ❌ 不发送                             |
| **典型用途**             | 用户偏好（主题、语言）、缓存数据     | 表单草稿、临时状态（如购物车步骤）    |

> 💡 **同源策略**：以下情况被视为不同源，数据不共享。  
> `https://example.com` 和 `http://example.com`  
> `http://localhost:8080/` 和 `http://localhost:3001/`

::: info 注意事项

1. **只能存储字符串**

- 存储数字、布尔值、对象时，**必须手动序列化**
- 读取时需反序列化（`JSON.parse`），注意处理 `null`

2. **存储空间有限**

- 超出容量会抛出 `QuotaExceededError`
- 建议大容量数据使用 **IndexedDB**

3. **同步阻塞主线程**

- 所有操作都是**同步的**，大量读写可能卡顿 UI
- 高频操作建议节流或改用 IndexedDB

:::

#### 事件监听：`storage` 事件

当**其他标签页**修改了 storage 数据时，当前页面可监听变化：

```js
window.addEventListener("storage", (e) => {
  console.log("键:", e.key);
  console.log("旧值:", e.oldValue);
  console.log("新值:", e.newValue);
  console.log("URL:", e.url); // 触发变更的页面 URL
});

// 注意：当前页面的 storage 操作不会触发自身 storage 事件！
```

#### 与`cookie`对比

| 特性          | Web Storage        | Cookie                     |
| ------------- | ------------------ | -------------------------- |
| **容量**      | 5–10 MB            | 4 KB                       |
| **HTTP 传输** | ❌ 不发送          | ✅ 每次请求自动携带        |
| **作用域**    | 仅 JS 可访问       | JS + 服务端均可访问        |
| **安全性**    | 无 `HttpOnly` 保护 | 可设 `HttpOnly` 防 XSS     |
| **过期控制**  | 需手动实现         | 原生支持 `Expires/Max-Age` |
