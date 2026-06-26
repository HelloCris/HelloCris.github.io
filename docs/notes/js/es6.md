# ES6 新增特性

## 变量声明

| 声明方式 | 作用域 | 变量提升 | 重复声明 | 重新赋值 | 必须初始化 |
| -------- | ------ | -------- | -------- | -------- | ---------- |
| var      | 函数级 | 有       | 是       | 是       | 否         |
| let      | 块级   | 无       | 否       | 是       | 否         |
| const    | 块级   | 无       | 否       | 否       | 是         |

**说明**：

- `let`/`const` 存在 TDZ（暂时性死区），必须在声明后使用
- `const` 声明对象/数组时，属性/元素可修改，但不能重新赋值

**最佳实践**：默认使用 `const`，需要修改变量时用 `let`，避免使用 `var`

## 模板字符串

使用反引号 `` 声明，支持插值和多行。

| 特性 | 说明                   | 示例                   |
| ---- | ---------------------- | ---------------------- |
| 插值 | `${}` 嵌入变量或表达式 | `` `Hello ${name}` ``  |
| 多行 | 支持直接换行           | `` `第一行\n第二行` `` |

```js
const name = "Tom";
const age = 20;
// 插值
`我叫${name}，今年${age}岁` // "我叫Tom，今年20岁"
// 表达式
`1 + 1 = ${1 + 1}`; // "1 + 1 = 2"
// 多行
const html = `
  <div>
    <h1>标题</h1>
  </div>
`;
```

## 增强的对象字面量

ES6 对对象字面量进行了增强，主要包括：

| 特性       | 说明                               | ES5 写法            | ES6 写法                 |
| ---------- | ---------------------------------- | ------------------- | ------------------------ |
| 属性简写   | 属性值是变量时，可省略冒号和值     | `name: name`        | `name`                   |
| 方法简写   | 方法可以省略冒号和 function 关键字 | `say: function(){}` | `say(){}`                |
| 计算属性名 | 属性名可用表达式                   | `obj['key' + i]`    | `{ ['key' + i]: value }` |

```js
const name = "Tom";
const age = 20;
// 属性简写
const person = { name, age }; // { name: 'Tom', age: 20 }
// 方法简写
const obj = {
  sayHello() {
    return "Hello";
  },
};
// 计算属性名
const key = "prefix";
const obj2 = {
  [key + "name"]: "value",
}; // { prefixname: 'value' }
```

## 箭头函数

箭头函数使用 `=>` 符号定义，它比传统的 `function` 表达式更简洁。

```js
// ES5 传统写法
var add = function (a, b) {
  return a + b;
};

// ES6 箭头函数写法
const add = (a, b) => {
  return a + b;
};
```

::: info 简写规则（语法糖）

- **参数只有一个时**：可以省略小括号 `()`。
- **函数体只有一条语句时**：可以省略大括号 `{}` 和 `return` 关键字。此时该语句的执行结果就是函数的返回值。
- **没有参数时**：必须保留空的小括号 `()`。

```js
// 最简写法（箭头函数简写）
// const double = n => n * 2;
// const sum = (a, b) => a + b;
// const sayHello = () => console.log("Hello");
```

:::

箭头函数**不会**创建自己的 `this` 上下文。它会捕获其**定义时**所在外层作用域的 `this` 值。

```js
const obj = {
  name: "Vue",
  // 普通函数：this 指向 obj
  normalFunc: function () {
    console.log(this.name); // 'Vue'
  },
  // 箭头函数：this 指向定义时的外层（这里是 window/global）
  arrowFunc: () => {
    console.log(this.name); // undefined (或报错)
  },
};
```

::: warning ⚠️ 注意

1. **不能作为构造函数**：不能使用 `new` 关键字调用，否则会报错。因为它没有 `prototype` 属性。

   ```js
   const Foo = () => {};
   new Foo(); // TypeError: Foo is not a constructor
   ```

2. **没有 `arguments` 对象**：箭头函数内部不存在 `arguments` 对象。如果需要获取不定参数，请使用 **剩余参数 (`...args`)**。

   ```js
   const foo = (...args) => {
     console.log(args); // [1, 2, 3]
   };
   foo(1, 2, 3);
   ```

3. **不能用作 Generator 函数**：不能使用 `yield` 关键字。
4. 不要在对象字面量中定义方法时使用箭头函数

:::

## Promise

Promise 是 ES6 提供的异步编程解决方案，用于处理异步操作。

| 状态      | 说明             | 转换                           |
| --------- | ---------------- | ------------------------------ |
| pending   | 待定（初始状态） | 可转换为 fulfilled 或 rejected |
| fulfilled | 已成功           | 不可转换其他状态               |
| rejected  | 已失败           | 不可转换其他状态               |

### 基本用法

```js
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (success) {
    resolve(value); // 成功时调用
  } else {
    reject(error); // 失败时调用
  }
});

promise
  .then((value) => {
    console.log(value); // 处理成功结果
  })
  .catch((error) => {
    console.error(error); // 处理失败结果
  })
  .finally(() => {
    console.log("无论成功或失败都会执行");
  });
```

| Promise 实例方法                | 说明                                      |
| ------------------------------- | ----------------------------------------- |
| `then(onFulfilled, onRejected)` | 添加成功和失败的回调，返回新的 Promise    |
| `catch(onRejected)`             | 捕获错误，等同于 `then(null, onRejected)` |
| `finally(onFinally)`            | 无论成功或失败都会执行                    |

| Promise 静态方法               | 说明                                | 示例                      |
| ------------------------------ | ----------------------------------- | ------------------------- |
| `Promise.all(iterable)`        | 等待所有 Promise 完成，返回结果数组 | `Promise.all([p1, p2])`   |
| `Promise.race(iterable)`       | 返回最快完成或拒绝的 Promise        | `Promise.race([p1, p2])`  |
| `Promise.resolve(value)`       | 返回一个成功状态的 Promise          | `Promise.resolve(1)`      |
| `Promise.reject(reason)`       | 返回一个失败状态的 Promise          | `Promise.reject('error')` |
| `Promise.allSettled(iterable)` | 所有 Promise settled 后返回结果     | ES2020                    |

::: info 链式调用

Promise 支持链式调用，上一个 Promise 的返回值会传递给下一个。

```js
fetchData()
  .then((data) => {
    return processData(data); // 返回值传递给下一个 then
  })
  .then((processed) => {
    console.log(processed);
  })
  .catch((error) => {
    console.error(error);
  });
```

:::

::: info 错误处理

```js
// 方式1：catch 捕获
promise.then((res) => console.log(res)).catch((err) => console.error(err));
// 方式2：then 的第二个参数
promise.then(
  (res) => console.log(res),
  (err) => console.error(err),
);
```

:::

## 解构赋值

解构赋值允许从对象或数组中提取值，赋值给变量。

| 类型       | 语法                         | 说明                   |
| ---------- | ---------------------------- | ---------------------- |
| 对象解构   | `const { a, b } = obj`       | 提取对象属性           |
| 对象重命名 | `const { a: aa } = obj`      | 重命名变量             |
| 对象默认值 | `const { a = 1 } = obj`      | 属性不存在时使用默认值 |
| 对象剩余   | `const { a, ...rest } = obj` | 收集剩余属性           |
| 数组解构   | `const [a, b] = arr`         | 提取数组元素           |
| 数组跳过   | `const [a, , c] = arr`       | 跳过某些元素           |
| 数组剩余   | `const [a, ...rest] = arr`   | 收集剩余元素           |
| 嵌套解构   | `const { a: { b } } = obj`   | 解构嵌套对象/数组      |

```js
// 对象解构
const obj = { name: "张三", age: 25, city: "北京" };
const { name, age, city = "上海" } = obj;
const { name: userName, ...rest } = obj;

// 数组解构
const arr = ["张三", 25, "北京"];
const [first, second, third] = arr;
const [, , last] = arr;
const [head, ...tail] = arr;

// 嵌套解构
const data = { user: { name: "张三", address: { city: "北京" } } };
const {
  user: {
    name,
    address: { city },
  },
} = data;

// 函数参数解构
function greet({ name, age = 20 }) {
  console.log(`${name}, ${age}`);
}

// 交换变量
let a = 1,
  b = 2;
[a, b] = [b, a];
```

::: info 常见应用

- 函数返回值解构：`const { data, code } = api()`
- 模块导入：`import { useState, useEffect } from 'react'`
- 交换变量：`[a, b] = [b, a]`
  :::
