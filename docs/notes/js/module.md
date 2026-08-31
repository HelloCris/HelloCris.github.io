# JS模块化

## 模块化的理解

- 什么是模块?
  - 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件)，并进行组合在一起
  - 块的内部数据/实现是私有的，只是向外部暴露一些接口(方法)与外部其它模块通信
- 一个模块的组成
  - 数据--->内部的属性
  - 操作数据的行为--->内部的函数

## 发展历程

- 全局 function 模式 :
  - 编码: 全局变量/函数
  - 问题: 污染全局命名空间, 容易引起命名冲突/数据不安全
- namespace 模式 :
  - 编码: 将数据/行为封装到对象中
  - 解决: 命名冲突(减少了全局变量)
  - 问题: 数据不安全(外部可以直接修改模块内部的数据)
- IIFE 模式/增强
  - IIFE : 立即调用函数表达式--->匿名函数自调用
  - 编码: 将数据和行为封装到一个函数内部, 通过给 window 添加属性来向外暴露接口
  - 引入依赖: 通过函数形参来引入依赖模块

    ```js
    (function (window, module2) {
      var data = "atguigu.com";
      function foo() {
        module2.xxx();
        console.log("foo()" + data);
      }
      function bar() {
        console.log("bar()" + data);
      }

      window.module = { foo };
    })(window, module2);
    ```

## 现代模块化规范

### CommonJS（Node.js默认）

- 服务端：Node.js原生使用CommonJS
- 浏览器端：CommonJS不支持，但可通过Browserify将CommonJS模块打包为浏览器可识别的模块

**基本语法:**

- 定义暴露模块 : exports
  ```js
  exports.xxx = value;
  module.exports = value;
  ```
- 引入模块 : require
  ```js
  var module = require("模块名/模块相对路径");
  ```

**引入模块发生在什么时候?**

- Node : 运行时, 动态同步引入
- Browserify : 在运行前对模块进行编译/转译/打包的处理(已经将依赖的模块包含进来了),
  运行的是打包生成的 js, 运行时不存在需要再从远程引入依赖模块

### AMD（浏览器端）（过时）

- require.js

**基本语法：**

- 定义暴露模块: define([依赖模块名], function(){return 模块对象})

  ```js
  // 定义模块（math.js）
  define(["jquery"], function ($) {
    // jquery 已加载完毕
    function add(a, b) {
      return a + b;
    }
    return { add };
  });
  ```

- 引入模块: require(['模块1', '模块2', '模块3'], function(m1, m2){//使用模块对象})

  ```js
  // 使用模块（main.js）
  require(["./math"], function (math) {
    console.log(math.add(2, 3));
  });
  ```

- 配置:
  ```js
  require.config({
    // 基本路径
    baseUrl: "js/",
    // 标识名称与路径的映射
    paths: {
      模块1: "modules/模块1",
      模块2: "modules/模块2",
      angular: "libs/angular",
      "angular-messages": "libs/angular-messages",
    },
    // 非 AMD 的模块
    shim: {
      angular: {
        exports: "angular",
      },
      "angular-messages": {
        exports: "angular-messages",
        deps: ["angular"],
      },
    },
  });
  ```

### CMD（浏览器端）（过时）

- sea.js

**基本语法：**

- 定义暴露模块:
  ```js
  define(function (require, module, exports) {
    //通过 require 引入依赖模块(同步/异步)
    let module2 = require("./module2");
    require.async("module3.0", function (m3) {
      console.log("异步引入依赖模块3");
    });
    //通过 module/exports 来暴露模块
    exports.xxx = value;
  });
  ```
- 使用模块 seajs.use(['模块1', '模块2'])

  ```js
  seajs.use("modules/main");
  ```

- 配置:
  ```js
  seajs.config({
    base: "./js",
    alias: {
      "module3.0": "modules/module3.js",
    },
  });
  ```

### ES6（ESM）（推荐）

- ES6 内置了模块化的实现

**基本语法：**

- 定义暴露模块 : export
  - 默认导出:

    ```js
    export default xx;
    ```

  - 命名导出:

    ```js
    export var xxx = value1;
    export let yyy = value2;
    // 等价于
    var xxx = value1;
    let yyy = value2;
    export { xxx, yyy };
    ```

- 引入使用模块 : import
  - default 模块:
    ```js
    import xxx from "模块路径/模块名";
    ```
  - 命名导入模块:
    ```js
    import { xxx, yyy } from "模块路径/模块名";
    import * as module1 from "模块路径/模块名";
    ```

#### 关键特性

1. 静态分析（Static Analysis）
   - import/export 必须在顶层作用域，不能动态拼接路径
   - 但可通过 动态 import() 实现按需加载（返回 Promise）

   ```js
   // ❌ 错误！不能在条件或函数中
   if (true) {
    import _ from "lodash"; // SyntaxError
   }

   // ❌ 动态路径也不行
   const name = 'math';
   import { add } from `./${name}.js`; // SyntaxError

   // ✅ 动态 import() 实现按需加载
   button.addEventListener('click', async () => {
    const module = await import('./lazyModule.js');
    module.doSomething();
   });
   ```

2. Live Binding（活引用）
   - 导入的变量是实时绑定到导出模块的原始值，不是拷贝值
3. 单例模式
   - 一个模块无论被 import 多少次，其代码只执行一次，所有导入方共享同一份模块实例和状态
