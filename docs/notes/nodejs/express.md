# Express

## 简介

Express是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。  
Express官网：[www.Expressjs.com](http://www.expressjs.com/)

对于前端程序员来说，最常见的两种服务器，分别是：

- Web 网站服务器：专门对外提供 Web 网页资源的服务器。
- API 接口服务器：专门对外提供 API 接口的服务器。

## 基本使用

**1. 安装**

在项目所处的目录中，运行如下的终端命令，即可将 Express安装到项目中使用：

```bash
npm i express@4
```

---

**2. 创建Web服务器**

```js
// 1. 导入 Express
const express = require("express");

// 2. 创建 web 服务器
const app = express();

// 3. 调用 app.listen(端口号, 启动成功后的回调函数)，启动服务器
app.listen(3000, () => {
  console.log("Expressserver running at http://127.0.0.1:3000");
});
```

---

**3. 监听GET请求**

通过 `app.get()` 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

```js
// 参数1: 客户端请求的 URL 地址
// 参数2: 请求对应的处理函数
// req: 请求对象 (包含了与请求相关的属性与方法)
// res: 响应对象 (包含了与响应相关的属性与方法)
app.get("请求URL", function (req, res) {
  /*处理函数*/
});
```

---

**4. 监听POST请求**

通过 `app.post()` 方法，可以监听客户端的 POST 请求，具体的语法格式如下：

```js
// 参数1: 客户端请求的 URL 地址
// 参数2: 请求对应的处理函数
// req: 请求对象 (包含了与请求相关的属性与方法)
// res: 响应对象 (包含了与响应相关的属性与方法)
app.post("请求URL", function (req, res) {
  /*处理函数*/
});
```

---

**5. 把内容响应给客户端**

通过 `res.send()` 方法，可以把处理好的内容，发送给客户端：

```js
app.get("/user", (req, res) => {
  // 向客户端发送 JSON 对象
  res.send({ name: "zs", age: 20, gender: "男" });
});

app.post("/user", (req, res) => {
  // 向客户端发送文本内容
  res.send("请求成功");
});
```

---

**6. 获取URL的查询参数**

通过 `req.query` 对象，可以访问到客户端通过 **查询字符串** 的形式，发送到服务器的参数：

```js
app.get("/", (req, res) => {
  // req.query 默认是一个空对象
  // 客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数，
  // 可以通过 req.query 对象访问到，例如：
  // req.query.name   req.query.age
  console.log(req.query);
});
```

---

**7. 获取URL的动态参数**

通过 `req.params` 对象，可以访问到 URL 中，通过 `:` 匹配到的 **动态参数**：

```js
// URL 地址中，可以通过 :参数名 的形式，匹配动态参数值
app.get("/user/:id", (req, res) => {
  // req.params 默认是一个空对象
  // 里面存放着通过 : 动态匹配到的参数值
  console.log(req.params);
});
```

> req.params中的动态参数可以是多个，例如：/user/:id/:name

## 托管静态资源

### express.static()

`express.static()` 可以创建一个静态资源服务器。  
例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```js
app.use(express.static("public"));
```

现在，你就可以访问 public 目录中的所有文件了：

- http://localhost:3000/images/bg.jpg
- http://localhost:3000/css/style.css
- http://localhost:3000/js/login.js

::: warning ⚠️ 注意

Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在 URL 中。

:::

::: info 托管多个静态资源目录

如果要托管多个静态资源目录，请多次调用 `express.static()` 函数：

```js
app.use(express.static("public"));
app.use(express.static("files"));
```

访问静态资源文件时，`express.static()` 函数会根据目录的添加顺序查找所需的文件。

:::

::: info 挂载路径前缀

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```js
app.use("/public", express.static("public"));
```

现在，你就可以通过带有 `/public` 前缀地址来访问 public 目录中的文件了：

- http://localhost:3000/public/images/kitten.jpg
- http://localhost:3000/public/css/style.css
- http://localhost:3000/public/js/app.js

:::

## nodemon工具

1. **为什么要使用nodemon**

在编写调试 Node.js 项目的时候,如果修改了项目的代码,则需要频繁的手动 close 掉,然后再重新启动,非常繁琐。
现在,我们可以使用 nodemon (https://www.npmjs.com/package/nodemon) 这个工具,它能够监听项目文件的变动,当代码被修改后,nodemon 会自动帮我们重启项目,极大方便了开发和调试。

2. **安装nodemon**

在终端中,运行如下命令,即可将 nodemon 安装为全局可用的工具:

```bash
npm install -g nodemon
```

3. **使用nodemon**

当基于 Node.js 编写了一个网站应用的时候，传统的方式是运行 `node app.js` 命令来启动项目。这样做的坏处是：代码被修改之后，需要手动重启项目。
现在,我们可以将 `node` 命令替换为 `nodemon` 命令,使用 `nodemon app.js` 来启动项目。这样做的好处是：代码被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果。

```bash
# 1. 传统的启动方式
node app.js

# 2. 将上面的终端命令,替换为下面的终端命令,即可实现自动重启项目的效果
nodemon app.js
```

## 路由

### 概念

在 Express 中, 路由指的是**客户端的请求与服务器处理函数之间的映射关系**。

Express 中的路由分 3 部分组成, 分别是**请求的类型、请求的 URL 地址、处理函数**, 格式如下:

```js
app.METHOD(PATH, HANDLER);
```

```js
// 匹配 GET 请求, 且请求 URL 为 /
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// 匹配 POST 请求, 且请求 URL 为 /
app.post("/", function (req, res) {
  res.send("Got a POST request");
});
```

---

**路由的匹配过程**

每当一个请求到达服务器之后, 需要**先经过路由的匹配**, 只有匹配成功之后, 才会调用对应的处理函数。

在匹配时, 会按照路由的顺序进行匹配, 如果**请求类型和请求的 URL 同时匹配成功**, 则 Express 会将这次请求, 转交给对应的 `function` 函数进行处理。

![路由匹配过程](asset/routerMatch.webp)

::: warning ⚠️ 路由匹配的注意点

1. 按照定义的**先后顺序**进行匹配
2. **请求类型和请求的URL同时匹配成功**, 才会调用对应的处理函数

:::

### 路由使用

**1. 模块化路由**

为了方便对路由进行模块化的管理, Express **不建议**将路由直接挂载到 app 上, 而是**推荐将路由抽离为单独的模块**。
将路由抽离为单独模块的步骤如下:

> 1. 创建路由模块对应的 .js 文件
> 2. 调用 `express.Router()` 函数创建路由对象
> 3. 向路由对象上挂载具体的路由
> 4. 使用 `module.exports` 向外共享路由对象
> 5. 使用 `app.use()` 函数注册路由模块

```js
var express = require("express"); // 1. 导入 express
var router = express.Router(); // 2. 创建路由对象

router.get("/user/list", function (req, res) {
  // 3. 挂载获取用户列表的路由
  res.send("Get user list.");
});
router.post("/user/add", function (req, res) {
  // 4. 挂载添加用户的路由
  res.send("Add new user.");
});

module.exports = router; // 5. 向外导出路由对象
```

**2. 注册路由模块**

```js
// 1. 导入路由模块
const userRouter = require("./router/user.js");

// 2. 使用 app.use() 注册路由模块
app.use(userRouter);
```

::: warning ⚠️ 注意

app.use()函数的作用就是注册全局中间件。

:::

**3. 为路由模块添加前缀**

类似于托管静态资源时, 为静态资源统一挂载访问前缀一样, 路由模块添加前缀的方式也非常简单:

```js
1 // 1. 导入路由模块
2 const userRouter = require('./router/user.js')
3
4 // 2. 使用 app.use() 注册路由模块, 并添加统一的访问前缀 /api
5 app.use('/api', userRouter)
```

## 中间件

### 概念与格式

![中间件的概念与格式](asset/middleware01.webp)
![中间件的概念与格式](asset/middleware02.webp)
![中间件的概念与格式](asset/middleware03.webp)

### 中间件的使用

**1. 定义中间件函数**

可以通过如下的方式, 定义一个最简单的中间件函数:

```js
// 常量 mw 所指向的, 就是一个中间件函数
const mw = function (req, res, next) {
  console.log("这是一个最简单的中间件函数");
  // 注意: 在当前中间件的业务处理完毕后, 必须调用 next() 函数
  // 表示把流转关系转交给下一个中间件或路由
  next();
};
```

---

**2. 全局生效的中间件**

客户端发起的任何请求, 到达服务器之后, 都会触发的中间件, 叫做全局生效的中间件。
通过调用 `app.use(中间件函数)`, 即可定义一个全局生效的中间件, 示例代码如下:

```js
// 常量 mw 所指向的, 就是一个中间件函数
const mw = function (req, res, next) {
  console.log("这是一个最简单的中间件函数");
  // 注意: 在当前中间件的业务处理完毕后, 必须调用 next() 函数
  // 表示把流转关系转交给下一个中间件或路由
  next();
};

// 全局生效的中间件
app.use(mw);
```

---

**3. 定义全局中间件的简化形式**

```js
// 全局生效的中间件
app.use(function (req, res, next) {
  console.log("这是一个最简单的中间件函数");
  // 注意: 在当前中间件的业务处理完毕后, 必须调用 next() 函数
  // 表示把流转关系转交给下一个中间件或路由
  next();
});
```

---

**4. 中间件的作用**

多个中间件之间, 共享同一份 `req` 和 `res`。基于这样的特性, 我们可以在上游的中间件中, 统一为 `req` 或 `res` 对象添加自定义的属性或方法, 供下游的中间件或路由进行使用。

![中间件的作用](asset/middleware04.webp)

---

**5. 定义多个全局中间件**

可以使用 `app.use()` 连续定义多个全局中间件。客户端请求到达服务器之后, 会按照中间件定义的先后顺序依次进行调用, 示例代码如下:

```js
// 第1个全局中间件
app.use(function (req, res, next) {
  console.log("调用了第1个全局中间件");
  next();
});
// 第2个全局中间件
app.use(function (req, res, next) {
  console.log("调用了第2个全局中间件");
  next();
});
// 请求这个路由, 会依次触发上述两个全局中间件
app.get("/user", (req, res) => {
  res.send("Home page.");
});
```

---

**6. 局部生效的中间件**

不使用 `app.use()` 定义的中间件, 叫做局部生效的中间件, 示例代码如下:

```js
// 定义中间件函数 mw1
const mw1 = function (req, res, next) {
  console.log("这是中间件函数");
  next();
};
// mw1 这个中间件只在"当前路由中生效", 这种用法属于"局部生效的中间件"
app.get("/", mw1, function (req, res) {
  res.send("Home page.");
});
// mw1 这个中间件不会影响下面这个路由 ↓↓↓
app.get("/user", function (req, res) {
  res.send("User page.");
});
```

---

**7. 定义多个局部中间件**

可以在路由中, 通过如下两种等价的方式, 使用多个局部中间件:

```js
// 以下两种写法是"完全等价"的, 可根据自己的喜好, 选择任意一种方式进行使用
app.get("/", mw1, mw2, (req, res) => {
  res.send("Home page.");
});
app.get("/", [mw1, mw2], (req, res) => {
  res.send("Home page.");
});
```

::: warning ⚠️ 使用注意事项

1. 一定要在路由之前注册中间件
2. 客户端发送过来的请求, 可以连续调用多个中间件进行处理
3. 执行完中间件的业务代码之后, 不要忘记调用 `next()` 函数
4. 为了防止代码逻辑混乱, 调用 `next()` 函数后不要再写额外的代码
5. 连续调用多个中间件时, 多个中间件之间, 共享 `req` 和 `res` 对象

:::

### 中间件的分类

Express 官方把常见的中间件用法，分成了 **5** 大类，分别是：

1. **应用级别**的中间件
2. **路由级别**的中间件
3. **错误级别**的中间件
4. **Express 内置**的中间件
5. **第三方**的中间件

**1. 应用级别的中间件**

通过 `app.use()` 或 `app.get()` 或 `app.post()`，绑定到 `app` 实例上的中间件，叫做应用级别的中间件，代码示例如下：

```js
// 应用级别的中间件 (全局中间件)
app.use((req, res, next) => {
  next();
});

// 应用级别的中间件 (局部中间件)
app.get("/", mw1, (req, res) => {
  res.send("Home page.");
});
```

---

**2. 路由级别的中间件**

绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 `app` 实例上，路由级别中间件绑定到 `router` 实例上，代码示例如下：

```js
var app = express();
var router = express.Router();

// 路由级别的中间件
router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

app.use("/", router);
```

---

**3. 错误级别的中间件**

错误级别中间件的**作用**：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

**格式**：错误级别中间件的 function 处理函数中，必须有 **4 个形参**，形参顺序从前到后，分别是 `(err, req, res, next)`。

```js
app.get("/", function (req, res) {
  // 1. 路由
  throw new Error("服务器内部发生了错误!"); // 1.1 抛出一个自定义的错误
  res.send("Home Page.");
});

app.use(function (err, req, res, next) {
  // 2. 错误级别的中间件
  console.log("发生了错误: " + err.message); // 2.1 在服务器打印错误消息
  res.send("Error! " + err.message); // 2.2 向客户端响应错误相关的内容
});
```

::: warning ⚠️ 注意

1. 错误级别的中间件，必须注册在所有路由之后！
2. Express 4 能自动捕获路由处理函数里的**同步** `throw`，但**异步 / `async` 函数里的错误必须用 `next(err)` 传递**。

:::

---

**4. Express内置的中间件**

自 Express 4.16.0 版本开始，Express 内置了 **3** 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

1. `express.static` 快速托管静态资源的内置中间件，例如：HTML 文件、图片、CSS 样式等（无兼容性）
2. `express.json` 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
3. `express.urlencoded` 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
// 配置解析 application/json 格式数据的内置中间件
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));
```

---

**5. 第三方的中间件**

由第三方开发出来的中间件。

例如：`body-parser`使用步骤：

1. 运行 `npm install body-parser` 安装中间件
2. 使用 `require` 导入中间件
3. 调用 `app.use()` 注册并使用中间件

> Express 内置的 `express.urlencoded` 中间件，就是基于 `body-parser` 这个第三方中间件进一步封装出来的。

### 自定义中间件

自己手动模拟一个类似于 `express.urlencoded` 这样的中间件，来解析 POST 提交到服务器的表单数据。

**实现步骤:**

1. 定义中间件
2. 监听 req 的 data 事件
3. 监听 req 的 end 事件
4. 使用 querystring 模块解析请求体数据
5. 将解析出来的数据对象挂载为 req.body
6. 将自定义中间件封装为模块

## 使用Express写接口

### 基本流程

**1. 创建基本的服务器**

```js
// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();

// write your code here...

// 调用 app.listen 方法, 指定端口号并启动web服务器
app.listen(3000, function () {
  console.log("Express server running at http://127.0.0.1:3000");
});
```

---

**2. 创建api路由模块**

```js
// apiRouter.js【路由模块】
const express = require("express");
const apiRouter = express.Router();

// bind your router here...

module.exports = apiRouter;

// --------------------------

// app.js【导入并注册路由模块】
const apiRouter = require("./apiRouter.js");
app.use("/api", apiRouter);
```

---

**3. 编写GET接口**

```js
apiRouter.get("/get", (req, res) => {
  // 1. 获取到客户端通过查询字符串, 发送到服务器的数据
  const query = req.query;
  // 2. 调用 res.send() 方法, 把数据响应给客户端
  res.send({
    status: 0, // 状态, 0 表示成功, 1 表示失败
    msg: "GET请求成功!", // 状态描述
    data: query, // 需要响应给客户端的具体数据
  });
});
```

---

**4. 编写post接口**

```js
apiRouter.post("/post", (req, res) => {
  // 1. 获取客户端通过请求体, 发送到服务器的 URL-encoded 数据
  const body = req.body;
  // 2. 调用 res.send() 方法, 把数据响应给客户端
  res.send({
    status: 0, // 状态, 0 表示成功, 1 表示失败
    msg: "POST请求成功!", // 状态描述消息
    data: body, // 需要响应给客户端的具体数据
  });
});
```

::: warning ⚠️ 注意
如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 `app.use(express.urlencoded({ extended: false }))`

:::

### 跨域问题

#### CORS

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。

使用步骤分为如下 3 步：

1. 运行 `npm install cors` 安装中间件
2. 使用 `const cors = require('cors')` 导入中间件
3. 在路由之前调用 `app.use(cors())` 配置中间件

> CORS
>
> CORS（Cross-Origin Resource Sharing, 跨域资源共享）由一系列 **HTTP 响应头**组成，**这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源**。
> 浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器**配置了 CORS 相关的 HTTP 响应头**，就可以**解除浏览器端的跨域访问限制**。

::: warning ⚠️ 注意

- CORS 主要在**服务器端**进行配置。客户端浏览器**无须做任何额外的配置**。
- CORS 在浏览器中有**兼容性**。需要支持 XMLHttpRequest Level2 的浏览器（例如：IE10+、Chrome4+、FireFox3.5+）。

:::

---

**1. CORS 响应头部 - Access-Control-Allow-Origin**

响应头部中可以携带一个 **Access-Control-Allow-Origin** 字段，其语法如下:

```http
Access-Control-Allow-Origin: <origin> | *
```

其中，origin 参数的值指定了**允许访问该资源的外域 URL**。  
例如：

```js
res.setHeader("Access-Control-Allow-Origin", "http://github.io");
res.setHeader("Access-Control-Allow-Origin", "*");
```

---

**2. CORS 响应头部 - Access-Control-Allow-Headers**

默认情况下，CORS **仅支持**客户端向服务器发送如下的 **9 个请求头**：  
Accept, Accept-Language, Content-Language, DPR, Downlink, Save-Data, Viewport-Width, Width, Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）  
如果客户端向服务器**发送了额外的请求头信息**，则需要在服务器端，通过 **Access-Control-Allow-Headers** 对额外的请求头进行声明，否则这次请求会失败！

```js
// 允许客户端额外向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
// 注意：多个请求头之间使用英文的逗号进行分割
res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Custom-Header");
```

---

**3. CORS 响应头部 - Access-Control-Allow-Methods**

默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。  
如果客户端希望通过 **PUT、DELETE** 等方式请求服务器的资源，则需要在服务器端，通过 **Access-Control-Allow-Methods** 来指明实际请求所允许使用的 HTTP 方法。  
示例代码如下：

```js
// 只允许 POST、GET、DELETE、HEAD 请求方法
res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, HEAD");
// 允许所有的 HTTP 请求方法
res.setHeader("Access-Control-Allow-Methods", "*");
```

---

**4. CORS请求的分类**

客户端在请求 CORS 接口时，根据**请求方式**和**请求头**的不同，可以将 CORS 的请求分为**两大类**，分别是：简单请求、预检请求。

::: info 简单请求

同时满足以下两大条件的请求，就属于简单请求：

1. **请求方式**：GET、POST、HEAD 三者之一
2. **HTTP 头部信息**不超过以下几种字段：**无自定义头部字段**、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（只有三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain）

:::

::: info 预检请求

只要符合以下任何一个条件的请求，都需要进行预检请求：

1. 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
2. 请求头中包含自定义头部字段
3. 向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会**先发送 OPTIONS 请求进行预检**，以获知服务器是否允许该实际请求，所以这一次的 OPTIONS 请求称为“**预检请求**”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

:::

### JSONP

**1. JSONP 的概念与特点**

**概念：**  
浏览器端通过 `<script>` 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。

**特点：**

1. JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。
2. JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。

---

**2. 实现 JSONP 接口的步骤**

1. 获取客户端发送过来的回调函数的名字
2. 得到要通过 JSONP 形式发送给客户端的数据
3. 根据前两步得到的数据，拼接出一个函数调用的字符串
4. 把上一步拼接得到的字符串，响应给客户端的 `<script>` 标签进行解析执行

---

**3. 实现 JSONP 接口的具体代码**

```js
app.get("/api/jsonp", (req, res) => {
  // 1. 获取客户端发送过来的回调函数的名字
  const funcName = req.query.callback;
  // 2. 得到要通过 JSONP 形式发送给客户端的数据
  const data = { name: "zs", age: 22 };
  // 3. 根据前两步得到的数据，拼接出一个函数调用的字符串
  const scriptStr = `${funcName}(${JSON.stringify(data)})`;
  // 4. 把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行
  res.send(scriptStr);
});
```

::: warning ⚠️ 注意

如果项目中已经配置了 CORS 跨域资源共享，为了防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口。示例代码如下：

```js
// 优先创建 JSONP 接口【这个接口不会被处理成 CORS 接口】
app.get("/api/jsonp", (req, res) => {});

// 再配置 CORS 中间件【后续的所有接口，都会被处理成 CORS 接口】
app.use(cors());

// 这是一个开启了 CORS 的接口
app.get("/api/get", (req, res) => {});
```

:::

## 用户身份认证

- [Session](/notes/nodejs/base.md#express-session中间件)
- [JWT](/notes/nodejs/base.md#jwt在express中的使用)
