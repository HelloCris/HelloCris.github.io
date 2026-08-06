# ES6+ 新增特性

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

## `async` / `await`

这是对 Promise 的语法糖，让异步代码看起来像同步代码，彻底解决了回调地狱问题，是目前处理异步操作的主流方式。

- **基本用法**

  ```js
  // 使用 Promise
  fetchData()
    .then((data) => processData(data))
    .then((result) => console.log(result))
    .catch((err) => console.error(err));

  // 使用 async/await
  async function handleData() {
    try {
      const data = await fetchData();
      const result = await processData(data);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  ```

- **注意**：`await` 只能在 `async` 函数内部使用。

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

## 类 (Class)

ES6 引入了 `class` 关键字，提供了一种更清晰、更接近传统面向对象语言的语法来创建对象和处理继承。

**基本用法**

```js
// 定义一个类
class Person {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 实例方法
  sayHello() {
    console.log(`你好，我是${this.name}`);
  }

  // 静态方法
  static greet() {
    console.log("Hello from Person class!");
  }
}

// 使用类
const p1 = new Person("张三", 25);
p1.sayHello(); // 输出: 你好，我是张三
Person.greet(); // 输出: Hello from Person class!
```

**继承 (extends, super)**

```js
class Student extends Person {
  constructor(name, age, grade) {
    // 调用父类的构造函数
    super(name, age);
    this.grade = grade;
  }

  // 重写父类方法
  sayHello() {
    super.sayHello(); // 调用父类的方法
    console.log(`我上${this.grade}年级`);
  }
}

const s1 = new Student("李四", 18, 12);
s1.sayHello();
```

## 模块化 (Modules)

ES6 在语言层面实现了模块化，通过 `export` 和 `import` 关键字来导出和导入功能。

**导出 (export)**

```js
// math.js
// 命名导出
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// 默认导出 (一个模块只能有一个)
export default function multiply(a, b) {
  return a * b;
}
```

**导入 (import)**

```js
// main.js
// 导入默认导出
import multiply from "./math.js";

// 导入命名导出 (需要用花括号)
import { PI, add } from "./math.js";

// 重命名导入
import { add as sum } from "./math.js";

// 导入所有
import * as MathUtils from "./math.js";
console.log(MathUtils.PI);
console.log(MathUtils.add(1, 2));

console.log(multiply(PI, 2)); // 使用默认导出和命名导出
console.log(sum(5, 5)); // 使用重命名导入
```

## for...of 循环

`for...of` 循环提供了一种更简洁的方式来遍历可迭代对象（如 `Array`, `Map`, `Set`, `String` 等）。

```js
const arr = ["a", "b", "c"];

// 传统的 for 循环
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// for...in 循环 (遍历的是索引)
for (let index in arr) {
  console.log(index); // 输出: 0, 1, 2
}

// for...of 循环 (遍历的是值)
for (let value of arr) {
  console.log(value); // 输出: 'a', 'b', 'c'
}

const str = "hello";
for (let char of str) {
  console.log(char); // 输出: h, e, l, l, o
}
```

## 生成器 (Generator)

生成器函数是一种可以暂停和恢复执行的函数，它返回一个迭代器对象。

**基本用法**

```js
// 定义一个生成器函数
function* idGenerator() {
  let id = 1;
  while (true) {
    // yield 关键字会暂停函数执行，并返回一个值
    yield id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

## Map 和 Set

ES6 引入了两种新的数据结构：`Map` 和 `Set`。

**Map**

`Map` 对象保存键值对，任何值（对象或原始值）都可以作为一个键或一个值。

```js
const myMap = new Map();

const keyObj = {};
myMap.set(keyObj, "这是一个对象作为键");
myMap.set("name", "张三");
myMap.set(1, "数字键");

console.log(myMap.get("name")); // '张三'
console.log(myMap.get(keyObj)); // '这是一个对象作为键'
console.log(myMap.size); // 3

myMap.forEach((value, key) => {
  console.log(key, value);
});
```

**Set**

`Set` 对象允许你存储任何类型的唯一值，无论是原始值还是对象引用。

```js
const mySet = new Set();

mySet.add(1);
mySet.add(2);
mySet.add(2); // 重复的值会被忽略
mySet.add("hello");

console.log(mySet.has(1)); // true
console.log(mySet.size); // 3

mySet.delete(2);
console.log(mySet.size); // 2

// 数组去重
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

## Symbol

`Symbol` 是 ES6 引入的一种新的原始数据类型，表示独一无二的值。

```js
const s1 = Symbol("description");
const s2 = Symbol("description");

console.log(s1 === s2); // false，每个 Symbol 值都是唯一的

// 用作对象属性名，可以防止属性名冲突
const obj = {
  [s1]: "这是一个 symbol 属性",
};
console.log(obj[s1]); // '这是一个 symbol 属性'
```

## 默认参数值

允许在函数定义时为参数指定默认值。

```js
function greet(name = "游客", age = 18) {
  console.log(`你好，${name}，你今年${age}岁。`);
}

greet(); // 你好，游客，你今年18岁。
greet("小明"); // 你好，小明，你今年18岁。
greet("小红", 25); // 你好，小红，你今年25岁。
```

## 剩余参数 (Rest Parameters)

允许我们将不确定数量的参数表示为一个数组。

```js
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

## 展开语法

允许一个表达式在某处展开。常用于函数调用、数组字面量和对象字面量。

```js
// 1. 在函数调用中展开数组
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3

// 2. 合并数组
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

// 3. 复制数组
const arrCopy = [...arr1];

// 4. 合并对象
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const mergedObj = { ...obj1, ...obj2 }; // { a: 1, b: 2 }
```

## 字符串新方法

ES6 为字符串添加了一些实用的新方法。

```js
const str = "Hello, World!";

// includes(): 判断字符串是否包含指定的子串
console.log(str.includes("World")); // true

// startsWith(): 判断字符串是否以指定的子串开头
console.log(str.startsWith("Hello")); // true

// endsWith(): 判断字符串是否以指定的子串结尾
console.log(str.endsWith("!")); // true

// repeat(): 将字符串重复指定次数
console.log("ha".repeat(3)); // 'hahaha'
```

## 数组新方法

- `Array.prototype.includes()`: 判断数组是否包含某个值，比 `indexOf` 更直观。
  ```js
  [1, 2, 3].includes(2); // true
  ```
- `Array.prototype.flat()`: 将嵌套的数组“拉平”。
  ```js
  const arr = [1, [2, [3, 4]]];
  arr.flat(); // [1, 2, [3, 4]]，默认拉平一层
  arr.flat(2); // [1, 2, 3, 4]，指定拉平深度
  arr.flat(Infinity); // 拉平任意深度
  ```
- `Array.prototype.flatMap()`: 先 `map` 再 `flat`，一步到位。
  ```js
  [1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
  ```

## 对象新方法

- `Object.values()` / `Object.entries()`: 获取对象的所有值或键值对数组。
  ```js
  const obj = { a: 1, b: 2 };
  Object.values(obj); // [1, 2]
  Object.entries(obj); // [['a', 1], ['b', 2]]
  ```
- `Object.fromEntries()`: `Object.entries` 的逆操作，将键值对数组转换为对象。
  ```js
  const entries = [
    ["a", 1],
    ["b", 2],
  ];
  Object.fromEntries(entries); // { a: 1, b: 2 }
  ```
- `Object.hasOwn()`: 作为 `Object.prototype.hasOwnProperty` 的更优替代，用于检查对象是否拥有指定的自有属性。
  ```js
  const obj = { name: "Alice" };
  obj.hasOwnProperty("name"); // true
  Object.hasOwn(obj, "name"); // true (推荐)注意兼容性
  ```

## 可选链操作符 `?.`

当你需要访问深层嵌套的对象属性时，可以避免因中间某个属性为 `null` 或 `undefined` 而报错。

```js
const user = {
  profile: {
    name: "Alice",
  },
};

// 传统写法
const name1 = user && user.profile && user.profile.name;

// 使用可选链
const name2 = user?.profile?.name; // 'Alice'
const address = user?.profile?.address?.city; // undefined，不会报错
```

## 空值合并运算符 `??`

当左侧的操作数为 `null` 或 `undefined` 时，返回右侧操作数。它与 `||` 的关键区别在于，`||` 会在左侧为任何“假值”（如 `0`, `''`, `false`）时都返回右侧值，而 `??` 不会。

```js
const count = 0;
const defaultCount1 = count || 10; // 10，因为 0 是假值
const defaultCount2 = count ?? 10; // 0，因为 0 不是 null 或 undefined

const name = "";
const defaultName1 = name || "匿名"; // '匿名'，因为 '' 是假值
const defaultName2 = name ?? "匿名"; // ''，因为 '' 不是 null 或 undefined
```

## 数值分隔符 `_`

为了提高大数字的可读性，可以在数字字面量中使用下划线 `_` 作为分隔符。

```js
const billion = 1_000_000_000;
const creditCardNumber = 1234_5678_9012_3456;
const hex = 0xff_aa_bb;
```

## 逻辑赋值运算符

将逻辑运算和赋值操作合二为一，让代码更简洁。

- `||=` (逻辑或赋值): `a = a || b` 的简写。
- `&&=` (逻辑与赋值): `a = a && b` 的简写。
- `??=` (空值合并赋值): `a = a ?? b` 的简写。

```js
let x = 0;
x ||= 10; // x 为假值，所以 x = 10

let y = 5;
y &&= 20; // y 为真值，所以 y = 20

let z = null;
z ??= 30; // z 为 null，所以 z = 30
```
