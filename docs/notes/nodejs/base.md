# Node.js基础

## 初识Node.js

### 简介

**Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。**  
Node.js官网地址：[https://nodejs.org/en](https://nodejs.org/en)

::: warning ⚠️ 注意

1. 浏览器是 JavaScript 的前端运行环境。
2. Node.js 是 JavaScript 的后端运行环境。
3. Node.js 中无法调用 DOM 和 BOM 等浏览器内置 API。

:::

::: info 可以做什么

1. 基于 [Express框架](https://expressjs.com/)，可以快速构建 Web 应用
2. 基于 [Electron 框架](https://electronjs.org/)，可以构建跨平台的桌面应用
3. 基于 [restify 框架](https://restify.com/)，可以快速构建 API 接口项目
4. 读写和操作数据库、创建实用的命令行工具辅助前端开发等

:::

::: tip 学习路径

> JavaScript 基础语法 + Node.js 内置 API 模块（fs、path、http等）+ 第三方 API 模块（Express、mysql 等）

:::

### 环境的安装

**终端（英文：Terminal）是专门为开发人员设计的，用于实现人机交互的一种方式。**

查看安装的nodejs版本号：node -v  
运行js代码：node a.js

windows终端常用快捷键：

1. 使用 ↑ 键，可以快速定位到上一次执行的命令
2. 使用 tab 键，能够快速补全路径
3. 使用 esc 键，能够快速清空当前已输入的命令
4. 输入 cls 命令，可以清空终端

## 模块化

### 简介

**Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是：**

- **内置模块**（内置模块是由 Node.js 官方提供的，例如 `fs`、`path`、`http` 等）
- **自定义模块**（用户创建的每个 `.js` 文件，都是自定义模块）
- **第三方模块**（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，**使用前需要先下载**）

> 使用强大的 `require()` 方法，可以加载需要的**内置模块**、**用户自定义模块**、**第三方模块**进行使用。
>
> **注意：** 使用 `require()` 方法加载其它模块时，会执行被加载模块中的代码。
>
> 使用require()加载用户自定义模块时可以省略.js后缀。

::: info 模块作用域

和函数作用域类似，在自定义模块中定义的**变量、方法**等成员，**只能在当前模块内被访问**，这种**模块级别的访问限制**，叫做**模块作用域**。  
模块作用域的好处：防止全局变量污染。

:::

::: info Node.js的模块化规范—CommonJS

**Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。**

- CommonJS 规定：
  1. 每个模块内部，`module` 变量代表当前模块。
  2. `module` 变量是一个对象，它的 `exports` 属性（即 `module.exports`）是对外的接口。
  3. 加载某个模块，其实是加载该模块的 `module.exports` 属性。`require()` 方法用于加载模块。

:::

### 模块的导出

#### module.exports对象

在每个 `.js` 自定义模块中都有一个 `module` 对象，它里面**存储了和当前模块有关的信息**，打印如下：

```javascript
console.log(module);
```

在自定义模块中，可以使用 `module.exports` 对象，将模块内的成员共享出去，供外界使用。  
外界用 `require()` 方法导入自定义模块时，得到的就是 `module.exports` 所指向的对象。

**终端输出结果（Node.js 执行后打印的 module 对象）：**

```js
Module {
  id: '.',
  path: 'C:\\Users\\cris\\Desktop\\node\\day2\\code',
  exports: {},
  parent: null,
  filename: 'C:\\Users\\cris\\Desktop\\node\\day2\\code\\03.module对象.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\cris\\Desktop\\node\\day2\\code\\node_modules',
    'C:\\Users\\cris\\Desktop\\node\\day2\\node_modules',
    'C:\\Users\\cris\\Desktop\\node\\node_modules',
    'C:\\Users\\cris\\Desktop\\node_modules',
    'C:\\Users\\cris\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
```

**关键信息标注：**

- `id: '.'` → 表示当前模块是主模块或入口模块。
- `filename: '...\\03.module对象.js'` → 当前模块文件的绝对路径。
- `paths: [...]` → Node.js 查找模块时的搜索路径列表（从当前目录逐级向上查找 `node_modules`）。

#### exports对象

由于 `module.exports` 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 `exports` 对象。默认情况下，`exports` 和 `module.exports` 指向同一个对象。最终共享的结果，还是以 `module.exports` 指向的对象为准。

✅ 正确用法示例：

```js
// 方式一：推荐（清晰明确）
module.exports = {
  name: "Alice",
  sayHi() {
    console.log("Hello");
  },
};

// 方式二：也可行（等价于操作 module.exports）
exports.name = "Alice";
exports.sayHi = function () {
  console.log("Hello");
};
```

❌ 错误用法：

```js
// 这样会导致 exports 不再指向 module.exports，导出为空！
exports = {
  name: "Alice",
};
```

#### module.export和export的误区

**时刻谨记，`require()` 模块时，得到的永远是 `module.exports` 指向的对象：**

> **为了防止混乱，建议大家不要在同一个模块中同时使用 `exports` 和 `module.exports`**

**代码示例1：**

```js
exports.username = "zs";
module.exports = {
  gender: "男",
  age: 22,
};
```

-> 输出：

```js
{ gender: '男', age: 22 }
```

> 💡 解释：虽然先给 `exports` 添加了属性，但随后 `module.exports` 被重新赋值为新对象，因此最终导出的是这个新对象。`exports` 的修改被覆盖。

---

**代码示例2：**

```js
module.exports.username = "zs";
exports = {
  gender: "男",
  age: 22,
};
```

-> 输出：

```js
{
  username: "zs",
}
```

> 💡 解释：`module.exports.username = 'zs'` 成功添加属性；但 `exports = {...}` 只是让 `exports` 变量指向新对象，不影响 `module.exports`，所以导出仍是最初那个含 `username` 的对象。

---

**代码示例3：**

```js
exports.username = "zs";
module.exports.gender = "男";
```

-> 输出：

```js
{ username: 'zs', gender: '男' }
```

> 💡 解释：两者操作的是同一个对象（因为初始时 `exports === module.exports`），所以属性合并成功。

---

**代码示例4：**

```js
exports = {
  username: "zs",
  gender: "男",
};
module.exports = exports;
module.exports.age = "22";
```

-> 输出：

```js
{ username: 'zs', gender: '男', age: '22' }
```

> 💡 解释：这里手动将 `module.exports` 指向了 `exports` 所指向的新对象，然后继续在该对象上添加属性，因此最终导出包含所有三个字段。

## fs文件系统模块

### fs基本使用

**fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。**

例如：

- `fs.readFile()` 方法，用来读取指定文件中的内容
- `fs.writeFile()` 方法，用来向指定的文件中写入内容

如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

```js
const fs = require("fs");
```

#### `fs.readFile()`

使用 `fs.readFile()` 方法，可以读取指定文件中的内容，语法格式如下：

```js
fs.readFile(path[, options], callback)
```

**参数解读：**

- 参数1：**必选参数**，字符串，表示文件的路径。
- 参数2：可选参数，表示以什么**编码格式**来读取文件。
- 参数3：**必选参数**，文件读取完成后，通过回调函数拿到读取的结果。

::: info 代码示例
可以判断 `err` 对象是否为 `null`，从而知晓文件读取的结果：

```js
const fs = require("fs");
fs.readFile("./files/1.txt", "utf8", function (err, result) {
  if (err) {
    return console.log("文件读取失败！" + err.message);
  }
  console.log("文件读取成功，内容是：" + result);
});
```

:::

#### `fs.writeFile()`

使用 `fs.writeFile()` 方法，可以向指定的文件中写入内容，语法格式如下：

```js
fs.writeFile(file, data[, options], callback)
```

**参数解读：**

- 参数1：**必选参数**，需要指定一个**文件路径的字符串**，表示文件的存放路径。
- 参数2：**必选参数**，表示要写入的内容。
- 参数3：可选参数，表示以什么格式写入文件内容，默认值是 utf8。
- 参数4：**必选参数**，文件写入完成后的回调函数。

::: info 代码示例

可以判断 `err` 对象是否为 `null`，从而知晓文件写入的结果：

```js
const fs = require("fs");
fs.writeFile("F:/files/2.txt", "Hello Node.js!", function (err) {
  if (err) {
    return console.log("文件写入失败！" + err.message);
  }
  console.log("文件写入成功！");
});
```

:::

### 路径动态拼接问题

在使用 fs 模块操作文件时，如果提供的操作路径是以 `./` 或 `../` 开头的**相对路径**时，很容易出现路径动态拼接错误的问题。

**原因：** 代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径。  
**解决方案：** 在使用 fs 模块操作文件时，**直接提供完整的路径**，不要提供 `./` 或 `../` 开头的相对路径，从而防止路径动态拼接的问题。

```js
// 不要使用 ./ 或 ../ 这样的相对路径
fs.readFile("./files/1.txt", "utf8", function (err, dataStr) {
  if (err) return console.log("读取文件失败！" + err.message);
  console.log(dataStr);
});

// __dirname 表示当前文件所处的目录
fs.readFile(__dirname + "/files/1.txt", "utf8", function (err, dataStr) {
  if (err) return console.log("读取文件失败！" + err.message);
  console.log(dataStr);
});
```

## path路径模块

### path基本使用

**path 模块**是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

例如：

- **path.join()** 方法，用来将多个路径片段拼接成一个完整的路径字符串
- **path.basename()** 方法，用来从路径字符串中，将文件名解析出来

如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入它：

```js
const path = require("path");
```

#### `path.join()`

1. **path.join() 的语法格式**

使用 `path.join()` 方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下：

```js
path.join([...paths]);
```

**参数解读：**

- `...paths <string>` 路径片段的序列
- 返回值: `<string>`

2. **path.join() 的代码示例**

使用 `path.join()` 方法，可以把多个路径片段拼接为完整的路径字符串：

```js
const pathStr = path.join("/a", "/b/c", "..", "./d", "e");
console.log(pathStr); // 在 Windows 输出 \a\b\d\e，在 Mac/Linux 输出 /a/b/d/e

const pathStr2 = path.join(__dirname, "./files/1.txt");
console.log(pathStr2); // 输出 当前文件所处目录\files\1.txt
```

::: warning ⚠️ 注意

> 今后凡是涉及到路径拼接的操作，都要使用 `path.join()` 方法进行处理。不要直接使用 `+` 进行字符串的拼接。

:::

#### `path.basename()`

1. **path.basename() 的语法格式**

使用 `path.basename()` 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下：

```js
path.basename(path[, ext])
```

**参数解读：**

- `path <string>` 必选参数，表示一个路径的字符串
- `ext <string>` 可选参数，表示文件扩展名
- 返回: `<string>` 表示路径中的最后一部分

2. **path.basename() 的代码示例**

使用 `path.basename()` 方法，可以从一个文件路径中，获取到文件的名称部分：

```js
const fpath = "/a/b/c/index.html"; // 文件的存放路径

var fullName = path.basename(fpath);
console.log(fullName); // 输出 index.html

var nameWithoutExt = path.basename(fpath, ".html");
console.log(nameWithoutExt); // 输出 index
```

#### `path.extname()`

1. **path.extname() 的语法格式**

使用 `path.extname()` 方法，可以获取路径中的扩展名部分，语法格式如下：

```js
path.extname(path);
```

**参数解读：**

- `path <string>` 必选参数，表示一个路径的字符串
- 返回: `<string>` 返回得到的扩展名字符串

## http模块

### 简介

**http 模块**是 Node.js 官方提供的、用来创建 web 服务器的模块。通过 http 模块提供的 `http.createServer()` 方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。

如果要希望使用 http 模块创建 Web 服务器，则需要先导入它：

```js
const http = require("http");
```

### 创建web服务器

#### 基本步骤

1. 导入 http 模块
2. 创建 web 服务器实例
3. 为服务器实例绑定 **request** 事件，监听客户端的请求
4. 启动服务器

**代码示例：**

```js
// 1. 导入 http 模块
const http = require("http");

// 2. 创建 web 服务器实例
const server = http.createServer();

// 3. 为服务器实例绑定 request 事件，监听客户端的请求
server.on("request", function (req, res) {
  console.log("Someone visit our web server.");
});

// 4. 启动服务器
server.listen(8080, function () {
  console.log("server running at http://127.0.0.1:8080");
});
```

::: info 根据不同的URL响应不同的html内容

- 核心实现步骤：
  1. 获取请求的 **url** 地址
  2. 设置默认的响应内容为 **404 Not found**
  3. 判断用户请求的是否为 `/` 或 `/index.html` 首页
  4. 判断用户请求的是否为 `/about.html` 关于页面
  5. 设置 **Content-Type** 响应头，防止中文乱码
  6. 使用 `res.end()` 把内容响应给客户端

:::

#### req请求对象

只要服务器接收到了客户端的请求，就会调用通过 `server.on()` 为服务器绑定的 **request** 事件处理函数。

如果想在事件处理函数中，访问与客户端相关的**数据或属性**，可以使用如下的方式：

```js
server.on("request", (req) => {
  // req 是请求对象，它包含了与客户端相关的数据和属性，例如：
  // req.url 是客户端请求的 URL 地址
  // req.method 是客户端的 method 请求类型
  const str = `Your request url is ${req.url}, and request method is ${req.method}`;
  console.log(str);
});
```

#### res响应对象

在服务器的 request 事件处理函数中，如果想访问与服务器相关的**数据或属性**，可以使用如下的方式：

```js
server.on("request", (req, res) => {
  // res 是响应对象，它包含了与服务器相关的数据和属性，例如：
  // 要发送到客户端的字符串
  const str = `Your request url is ${req.url}, and request method is ${req.method}`;
  // res.end() 方法的作用：
  // 向客户端发送指定的内容，并结束这次请求的处理过程
  res.end(str);
});
```

::: info 设置响应头防止中文乱码

```js
// 为了防止中文显示乱码的问题，需要设置响应头 Content-Type 的值为 text/html; charset=utf-8
res.setHeader("Content-Type", "text/html; charset=utf-8");
```

:::

## npm 与包

### 简介

**[www.npmjs.com](https://www.npmjs.com/)**，它是**全球最大的包共享平台**。

npm公司提供了一个地址为 **[registry.npmjs.org](https://registry.npmjs.org/)** 的服务器，来对外共享所有的包，我们可以从这个服务器上下载自己所需要的包。

- 从 **[www.npmjs.com](https://www.npmjs.com/)** 网站上搜索自己所需要的包
- 从 **[registry.npmjs.org](https://registry.npmjs.org/)** 服务器上下载自己需要的包

**npm公司**提供了一个包管理工具，我们可以使用这个包管理工具，从 **[registry.npmjs.org](https://registry.npmjs.org/)** 服务器把需要的包下载到本地使用。  
这个包管理工具的名字叫做 **Node Package Manager**（简称 **npm 包管理工具**），这个包管理工具随着 Node.js 的安装包一起被安装到了用户的电脑上。

在终端中执行 **`npm -v`** 命令，来查看自己电脑上所安装的 npm 包管理工具的版本号。

### 装包删包

`package.json` 文件中，有一个 **dependencies** 节点，专门用来记录您使用 `npm install` 命令安装了哪些包。

可以运行 `npm install` 命令（或 `npm i`）一次性安装所有的依赖包：

```bash
npm install
```

可以运行 `npm uninstall` 命令，来卸载指定的包：

```bash
npm uninstall moment
```

::: warning ⚠️ 注意

`npm uninstall` 命令执行成功后，会把卸载的包，自动从 `package.json` 的 `dependencies` 中移除掉。

:::

---

初次装包完成后，在项目文件夹下多一个叫做 **node_modules** 的文件夹和 **package-lock.json** 的配置文件。

其中：

- **node_modules 文件夹**用来存放所有已安装到项目中的包。`require()` 导入第三方包时，就是从这个目录中查找并加载包。
- **package-lock.json 配置文件**用来记录 `node_modules` 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。

::: warning ⚠️ 注意

> 程序员不要手动修改 `node_modules` 或 `package-lock.json` 文件中的任何代码，npm 包管理工具会自动维护它们。

:::

---

默认情况下，使用 `npm install` 命令安装包的时候，**会自动安装最新版本的包**。如果需要安装指定版本的包，可以在包名之后，通过 **@ 符号**指定具体的版本，例如：

```bash
npm i moment@2.22.2
```

::: warning ⚠️ 注意

> `npm i` 是 `npm install` 的简写形式，功能完全相同。

:::

::: info 包的版本号

包的版本号是以“**点分十进制**”形式进行定义的，总共有三位数字，例如 **2.24.0**

其中每一位数字所代表的含义如下：

- **第1位数字：大版本**（Major Version）→ 表示重大更新，可能包含不兼容的 API 变更
- **第2位数字：功能版本**（Minor Version）→ 表示新增功能，但保持向后兼容
- **第3位数字：Bug修复版本**（Patch Version）→ 表示仅修复错误或安全漏洞，不影响现有功能

:::

### 包管理配置文件

npm 规范上应在项目根目录提供 package.json。用来记录与项目有关的一些配置信息。例如：

- 项目的名称、版本号、描述等
- 项目中都用到了哪些包
- 哪些包只在**开发期间**会用到
- 那些包在**开发和部署时**都需要用到

在**项目根目录**中，创建一个叫做 **package.json** 的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除 `node_modules` 目录之后，在团队成员之间共享项目的源代码。

::: warning ⚠️ 注意

> 在项目开发中，一定要把 `node_modules` 文件夹，添加到 `.gitignore` 忽略文件中。

:::

npm 包管理工具提供了一个**快捷命令**，可以在**执行命令时所处的目录中**，快速创建 `package.json` 这个包管理配置文件：

```bash
// 作用：在执行命令所处的目录中，快速新建 package.json 文件
npm init -y
```

::: warning ⚠️ 注意

> 1. 上述命令**只能在英文的目录下成功运行！** 所以，项目文件夹的名称一定要使用英文命名，**不要使用中文，不能出现空格**。
> 2. 运行 `npm install` 命令安装包的时候，npm 包管理工具会自动把**包的名称和版本号**，记录到 `package.json` 中。

:::

### devDependencies

如果某些包**只在项目开发阶段**会用到，在**项目上线之后不会用到**，则建议把这些包记录到 **devDependencies** 节点中。

与之对应的，如果某些包在**开发**和**项目上线之后**都需要用到，则建议把这些包记录到 **dependencies** 节点中。

您可以使用如下的命令，将包记录到 **devDependencies** 节点中：

```bash
// 安装指定的包，并记录到 devDependencies 节点中
npm i 包名 -D

// 注意：上述命令是简写形式，等价于下面完整的写法：
npm install 包名 --save-dev
```

> 判断应该装包到devDependencies节点还是dependencies节点，直接npmjs.com官网查一下对应包的安装命令即可。

### npm镜像

> 淘宝在国内搭建了一个服务器，专门把国外官方服务器上的包同步到国内的服务器，然后在国内提供下包的服务。从而极大的提高了下包的速度。
>
> **镜像（Mirroring）** 是一种文件存储形式，一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像。

- **国内用户** → 从国外服务器下包 → **国外 npm 官方服务器**
- **国内用户** → 从国内服务器下包 → **国内淘宝npm镜像服务器** →(定期同步)→ **国外 npm 官方服务器**

下包的镜像源，指的就是**下包的服务器地址**。

```bash
# 查看当前的下包镜像源
npm config get registry

# 将下包的镜像源切换为淘宝镜像源
npm config set registry=https://registry.npmmirror.com/

# 检查镜像源是否下载成功
npm config get registry
```

::: warning ⚠️ 注意
目前（2024年起）淘宝已启用新域名：**https://registry.npmmirror.com/**  
原 `registry.npm.taobao.org` 已逐步停用，请优先使用新地址。
:::

#### nrm插件

为了更方便的切换下包的镜像源，我们可以安装 **nrm** 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下包的镜像源。

```bash
# 通过 npm 包管理器，将 nrm 安装为全局可用的工具
npm i nrm -g

# 查看所有可用的镜像源
nrm ls

# 将下包的镜像源切换为 taobao 镜像
nrm use taobao
```

### 包的分类

::: info 1. 项目包

那些被安装到**项目的 `node_modules` 目录**中的包，都是**项目包**。

项目包又分为两类，分别是：

- **开发依赖包**（被记录到 `devDependencies` 节点中的包，只在开发期间会用到）
- **核心依赖包**（被记录到 `dependencies` 节点中的包，在开发期间和项目上线之后都会用到）

```bash
npm i 包名 -D    # 开发依赖包（会被记录到 devDependencies 节点下）
npm i 包名       # 核心依赖包（会被记录到 dependencies 节点下）
```

:::

::: info 2. 全局包

在执行 `npm install` 命令时，如果提供了 `-g` 参数，则会把包安装为**全局包**。

全局包会被安装到：  
`C:\Users\用户目录\AppData\Roaming\npm\node_modules` 目录下。（Windows 系统路径示例）

```bash
npm i 包名 -g        # 全局安装指定的包
npm uninstall 包名 -g # 卸载全局安装的包
```

::: warning ⚠️ 注意

1. 只有**工具性质的包**，才有全局安装的必要性。因为它们提供了好用的终端命令。  
     例如：`nodemon`, `eslint`, `create-react-app`, `vue-cli`, `typescript (tsc)` 等。
2. 判断某个包是否需要全局安装后才能使用，可以**参考官方提供的使用说明**即可。

:::

### 发布包流程

::: info 规范的包结构

一个规范的包，它的组成结构，必须符合以下 3 点要求：

1. 包必须以**单独的目录**而存在
2. 包的顶级目录下要必须包含**package.json**
3. **package.json**中必须包含**name version main**这三个属性，代表**包的名字、版本号、包的入口**。

:::

#### 本地创建包

1. 新建 cris-tools 文件夹, 作为包的根目录
2. 在 cris-tools 文件夹中, 新建如下三个文件:
   - package.json (包管理配置文件)
   - index.js (包的入口文件)
   - README.md (包的说明文档)

3. 初始化 package.json 文件

```json
{
  "name": "cris-tools",
  "version": "1.0.0",
  "main": "index.js",
  "description": "提供了格式化时间, HTMLEscape的功能",
  "keywords": ["cris", "dateFormat", "escape"],
  "license": "ISC"
}
```

#### 远程包发布/删除

::: info 1. 注册 npm 账号

1. 访问 https://www.npmjs.com/ 网站, 点击 sign up 按钮, 进入注册用户界面
2. 填写账号相关的信息: Full Name、Public Email、Username、Password
3. 点击 Create an Account 按钮, 注册账号
4. 登录邮箱, 点击验证链接, 进行账号的验证

:::

---

::: info 2. 登录 npm 账号

npm 账号注册完成后, 可以在终端中执行 `npm login` 命令, 依次输入用户名、密码、邮箱后, 即可登录成功。

```bash
C:\Users>npm login
Username: lih314
Password:
Email: (this IS public) front@itcast.cn
Logged in as lih314 on https://registry.npmjs.org/.
```

::: warning ⚠️ 注意

> 在运行 `npm login` 命令之前, 必须先把下包的服务器地址切换为 npm 的官方服务器。否则会导致发布包失败!

:::

---

::: info 3. 把包发布到 npm 上

将终端切换到包的根目录之后, 运行 `npm publish` 命令, 即可将包发布到 npm 上 (注意: 包名不能雷同)。

```bash
C:\Users\cris\Desktop\cris-tools>npm publish
npm notice
npm notice package: cris-tools@1.0.0
npm notice === Tarball Contents ===
npm notice 677B src/dateFormat.js
npm notice 741B src/htmlEscape.js
npm notice 349B index.js
npm notice 229B package.json
npm notice 816B README.md
npm notice === Tarball Details ===
npm notice name:          cris-tools
npm notice version:       1.0.1
npm notice package size:  1.4 kB
npm notice unpacked size: 2.8 kB
npm notice shasum:        4683fd9e9f14e8a8656a7ebfa46c59e576525dcf
npm notice integrity:     sha512-bOmS3ZPe2vxvAu[...]g2MNxaJLYePFA==
npm notice total files:   5
npm notice
+ cris-tools@1.0.1

```

:::

---

::: info 4. 删除已发布的包

运行 `npm unpublish 包名 --force` 命令, 即可从 npm 删除已发布的包。

```bash
C:\Users\cris\Desktop\cris-tools>npm unpublish cris-tools --force
npm WARN using --force I sure hope you know what you are doing.
- cris-tools
```

::: warning ⚠️ 注意

1. `npm unpublish` 命令只能删除 **72 小时以内**发布的包
2. `npm unpublish` 删除的包, 在 **24 小时内**不允许重复发布
3. 发布包的时候要慎重, **尽量不要往 npm 上发布没有意义的包!**

:::

## 模块的加载机制

::: info 1. 优先从缓存中加载

模块在第一次加载后会被缓存。这也意味着多次调用 require() 不会导致模块的代码被执行多次。

::: warning ⚠️ 注意

不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

:::

::: info 2. 内置模块的加载机制

内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。  
例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。
:::

::: info 3. 自定义模块的加载机制

使用 require() 加载自定义模块时，必须指定以 / 或 ./ 开头的路径标识符。在加载自定义模块时，如果没有指定 / 或 ./ 这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。

同时，在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：

1. 按照确切的文件名进行加载
2. 补全 .js 扩展名进行加载
3. 补全 .json 扩展名进行加载
4. 补全 .node 扩展名进行加载
5. 加载失败，终端报错

:::

::: info 4. 第三方模块的加载机制

如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块。

如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。

例如，假设在 'C:\Users\cris\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：

1. C:\Users\cris\project\node_modules\tools
2. C:\Users\cris\node_modules\tools
3. C:\Users\node_modules\tools
4. C:\node_modules\tools

:::

::: info 5. 目录作为模块的加载机制

当把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：

1. 在被加载的目录下查找一个叫做 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口
2. 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
3. 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：Error: Cannot find module 'xxx'

:::

## 前后端的身份认证

对于**服务端渲染**和**前后端分离**这两种开发模式来说，分别有着不同的身份认证方案：

1. **服务端渲染**推荐使用 **Session** 认证机制
2. **前后端分离**推荐使用 **JWT** 认证机制

### web开发模式

目前主流的 Web 开发模式有两种，分别是：

1. 基于**服务端渲染**的传统 Web 开发模式
2. 基于**前后端分离**的新型 Web 开发模式

::: info 1. 服务端渲染的 Web 开发模式

**服务端渲染的概念**：服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不需要使用 Ajax 这样的技术额外请求页面的数据。代码示例如下：

```js
app.get("/index.html", (req, res) => {
  // 1. 要渲染的数据
  const user = { name: "zs", age: 20 };
  // 2. 服务器端通过字符串的拼接，动态生成 HTML 内容
  const html = `<h1>姓名：${user.name}，年龄：${user.age}</h1>`;
  // 3. 把生成好的页面内容响应给客户端。因此，客户端拿到的是带有真实数据的 HTML 页面
  res.send(html);
});
```

**优点：** 前端耗时少; 有利于SEO。  
**缺点：** 占用服务器端资源; 不利于前后端分离，开发效率低。

:::

::: info 2. 前后端分离的 Web 开发模式

**前后端分离的概念**：前后端分离的开发模式，依赖于 Ajax 技术的广泛应用。简而言之，前后端分离的 Web 开发模式，就是后端只负责提供 API 接口，前端使用 Ajax 调用接口的开发模式。

**优点：** 开发体验好; 用户体验好; 减轻了服务器端的渲染压力。  
**缺点：** 不利于 SEO。
:::

::: tip 💡 如何选择 Web 开发模式

不谈业务场景而盲目选择使用何种开发模式都是耍流氓。

- 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的 SEO，则这时我们就需要使用服务器端渲染；
- 而类似后台管理项目，交互性比较强，不需要考虑 SEO，那么就可以使用前后端分离的开发模式。

另外，具体使用何种开发模式并不是绝对的，为了同时兼顾了首页的渲染速度和前后端分离的开发效率，一些网站采用了首屏服务器端渲染 + 其他页面前后端分离的开发模式。

:::

### session

#### 概念

::: info cookie

Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称 (Name)、一个值 (Value) 和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。  
不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。  
**Cookie的特性:** 自动发送、域名独立、过期时限、4KB 限制。

> **Cookie 在身份认证中的作用:**
>
> 客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中。
> 当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份。

> **Cookie 不具有安全性:**
>
> 由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。

::: warning ⚠️ 注意
不要使用 Cookie 存储重要且隐私的数据！ 比如用户的身份信息、密码等。

:::

Cookie的工作流程：
![Cookie工作流程](asset/cookieWorkflow.webp)

Session的工作原理：
![Session工作原理](asset/sessionWorkflow.webp)

#### Express-session中间件

**1. 安装 express-session 中间件**

在 Express 项目中，只需要安装 `express-session` 中间件，即可在项目中使用 Session 认证：

```bash
npm install express-session
```

---

**2. 配置 express-session 中间件**

`express-session` 中间件安装成功后，需要通过 `app.use()` 来注册 session 中间件，示例代码如下：

```js
// 1. 导入 session 中间件
var session = require("express-session");

// 2. 配置 Session 中间件
app.use(
  session({
    secret: "keyboard cat", // secret 属性的值可以为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true, // 固定写法
  }),
);
```

---

**3. 向 session 中存数据**

当 `express-session` 中间件配置成功后，即可通过 `req.session` 来访问和使用 session 对象，从而存储用户的关键信息：

```js
app.post("/api/login", (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== "admin" || req.body.password !== "000000") {
    return res.send({ status: 1, msg: "登录失败" });
  }

  req.session.user = req.body; // 将用户的信息，存储到 Session 中
  req.session.isLogin = true; // 将用户的登录状态，存储到 Session 中

  res.send({ status: 0, msg: "登录成功" });
});
```

---

**4. 从 session 中取数据**

可以直接从 `req.session` 对象上获取之前存储的数据，示例代码如下：

```js
// 获取用户姓名的接口
app.get("/api/username", (req, res) => {
  // 判断用户是否登录
  if (!req.session.isLogin) {
    return res.send({ status: 1, msg: "fail" });
  }
  res.send({ status: 0, msg: "success", username: req.session.user.username });
});
```

---

**5. 清空 session**

调用 `req.session.destroy()` 函数，即可清空服务器保存的 session 信息。

```js
// 退出登录的接口
app.post("/api/logout", (req, res) => {
  // 清空当前客户端对应的 session 信息
  req.session.destroy();
  res.send({
    status: 0,
    msg: "退出登录成功",
  });
});
```

::: warning ⚠️ 注意
只会清空当前用户的session，不会清空所有的。
:::

### JWT

#### JWT

> **Session 认证的局限性**
>
> session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证。

::: warning ⚠️ 注意

- 当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。
- 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。

:::

::: info JWT

JWT（英文全称：JSON Web Token）是目前最流行的跨域认证解决方案。
![JWT工作流程](asset/jwtWorkflow.webp)

**总结:** 用户的信息通过 Token 字符串的形式, 保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

:::

**1. JWT 的组成部分**

JWT 通常由三部分组成，分别是 Header (头部)、Payload (有效荷载)、Signature (签名)。
三者之间使用英文的 “.” 分隔，格式如下：

```
Header.Payload.Signature
```

---

**2. JWT 的三个部分各自代表的含义**

JWT 的三个组成部分，从前到后分别是 Header、Payload、Signature。  
其中:

- **Payload** 部分才是真正的用户信息，它是用户信息经过base64url编码后生成的字符串。
- Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性。

---

**3. JWT 的使用方式**

客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。  
此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。  
**推荐做法**是把 JWT 放在 HTTP 请求头的 Authorization 字段中。

#### JWT在Express中的使用

**1. 安装 JWT 相关的包**

```bash
npm install jsonwebtoken express-jwt@6
```

其中:

- `jsonwebtoken` 用于生成 JWT 字符串
- `express-jwt` 用于将 JWT 字符串解析还原成 JSON 对象

---

**2. 导入 JWT 相关的包**

使用 `require()` 函数，分别导入 JWT 相关的两个包：

```js
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
```

---

**3. 定义 secret 密钥**

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 secret 密钥：

1. 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
2. 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

---

**4. 在登录成功后生成 JWT 字符串**

调用 `jsonwebtoken` 包提供的 `sign()` 方法，将用户的信息加密成 JWT 字符串，响应给客户端：

```js
// 登录接口
app.post("/api/login", function (req, res) {
  // ... 省略登录失败情况下的代码
  // 用户登录成功之后, 生成 JWT 字符串, 通过 token 属性响应给客户端
  res.send({
    status: 200,
    message: "登录成功!",
    // 调用 jwt.sign() 生成 JWT 字符串, 三个参数分别是: 用户信息对象、加密密钥、配置对象
    token: jwt.sign({ username: userinfo.username }, secretKey, {
      expiresIn: "30s",
    }),
  });
});
```

---

**5. 将 JWT 字符串还原为 JSON 对象**

客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证。

此时，服务器可以通过 `express-jwt` 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象：

```js
// 使用 app.use() 来注册中间件
// expressJWT({ secret: secretKey }) 就是用来解析 Token 的中间件
// .unless({ path: [/^\/api\//] }) 用来指定哪些接口不需要访问权限
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }));
```

---

**6. 使用 req.user 获取用户信息**

当 `express-jwt` 这个中间件配置成功之后，即可在那些有权限的接口中，使用 `req.user` 对象，来访问从 JWT 字符串中解析出来的用户信息了，示例代码如下：

```js
// 这是一个有权限的 API 接口
app.get("/admin/getinfo", function (req, res) {
  console.log(req.user);
  res.send({
    status: 200,
    message: "获取用户信息成功!",
    data: req.user,
  });
});
```

---

**7. 捕获解析 JWT 失败后产生的错误**

当使用 `express-jwt` 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。我们可以通过 Express 的错误中间件，捕获这个错误并进行相关的处理，示例代码如下：

```js
app.use((err, req, res, next) => {
  // token 解析失败导致的错误
  if (err.name === "UnauthorizedError") {
    return res.send({ status: 401, message: "无效的token" });
  }
  // 其它原因导致的错误
  res.send({ status: 500, message: "未知错误" });
});
```
