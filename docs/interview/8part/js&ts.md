# JS/TS 问题

## `0.1 + 0.2 !== 0.3`

JavaScript 中所有的数字（包括整数和小数）都统一使用 **64 位双精度浮点数**（IEEE 754）格式存储，结构如下：

- 1 位符号位
- 11 位指数位
- 52 位尾数位（有效数字）

这意味着，即使是像 `0.1` 这样简单的十进制小数，在二进制中也必须被“截断”或“舍入”以适应 52 位尾数的限制：

- `0.1`（十进制）= `0.00011001100110011...`（二进制，无限循环）
- `0.2`（十进制）= `0.0011001100110011...`（二进制，无限循环）

当这两个近似值相加时，误差叠加，最终结果为：

> `0.1 + 0.2 = 0.30000000000000004`

而不是数学上的 `0.3`。

::: info 如何正确应对？

1. **方法一：容差比较（推荐用于判断相等）**

不要直接使用 `===` 比较浮点数，而是判断它们的差值是否小于一个极小的阈值：

```javascript
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true
```

`Number.EPSILON` 是 JavaScript 中能表示的最小精度差，约为 `2.22e-16`，非常适合用于浮点数比较。

2. **方法二：四舍五入到指定精度**

如果只需要显示或比较到小数点后几位，可以使用 `toFixed()` 或 `Math.round()`：

```javascript
const result = (0.1 + 0.2).toFixed(1); // "0.3"
console.log(parseFloat(result) === 0.3); // true
```

⚠️ 注意：`toFixed()` 返回的是字符串，需用 `parseFloat()` 转回数字再比较。

3. **方法三：使用高精度计算库（金融/科学计算推荐）**

对于对精度要求极高的场景（如金融、会计），建议使用专门的高精度数学库，如：

- `decimal.js`
- `big.js`
- `bignumber.js`

:::

## 各DOM版本的绑定点击事件的方式

1.  **HTML 事件处理程序**
    - **方式**：直接在标签上使用 `onclick="调用方法"`。
    - **说明**：在 HTML 标签属性中直接绑定，在 JS 中进行调用方法的书写。

2.  **DOM0 级事件处理程序**
    - **方式**：获取到需要绑定点击事件的元素节点，`节点.onclick = function(){}`。
    - **说明**：通过将函数赋值给元素的事件属性来绑定（注意：图片中写的是 `onClick`，但在标准 DOM0 级写法中通常是小写 `onclick`）。

3.  **DOM2 级事件处理程序**
    - **方式**：获取到需要绑定点击事件的元素节点，`节点.addEventListener("click", function(){})`。
    - **说明**：使用标准的 `addEventListener` 方法进行绑定，支持事件捕获和冒泡阶段。

4.  **IE 事件处理程序**
    - **方式**：获取到需要绑定点击事件的元素节点，`节点.attachEvent("onclick", function(){})`。
    - **说明**：这是旧版本 IE 浏览器特有的绑定方式（对应标准浏览器的 `addEventListener`）。

## 函数防抖和节流

::: info 防抖

防抖（debounce）是指在触发事件后，等待一段时间，只执行一次。如果在等待时间内再次触发事件，那么计时器就会重新开始。

**非立即执行**

```js
function debounce(func, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

**立即执行**

```js
function debounce(func, delay) {
  let timer;
  return function (...args) {
    if (!timer) {
      func.apply(this, args);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}
```

**完整版**

```js
/**
 * 防抖：在事件被触发 n 秒后再执行回调。
 * 如果 n 秒内事件又被触发，则重新计时。
 * 适用场景：输入框搜索联想、表单校验、resize 结束后再计算布局。
 *
 * @param {Function} fn      需要防抖处理的函数
 * @param {number}   delay   延迟时间(ms)
 * @param {boolean}  immediate 是否立即执行（leading），默认 false
 * @returns {Function} 带 cancel 方法的防抖函数
 */
function debounce(fn, delay = 300, immediate = false) {
  let timer = null;

  function debounced(...args) {
    const callNow = immediate && !timer;

    // 每次触发都清除上一次的计时器，重新计时
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);

    // 立即执行模式：首次触发马上执行，后续在静默 delay 后才再触发
    if (callNow) fn.apply(this, args);
  }

  // 取消防抖，清空计时器
  debounced.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
```

:::

::: info 节流

节流（throttle）是指在触发事件后，只执行一次，后续事件在等待时间内不会执行。

**定时器版**

```js
function throttle(func, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
```

**时间戳版**

```js
function throttle(func, delay) {
  let lastTime = 0;
  return function (...args) {
    let now = Date.now();
    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}
```

**完整版**

```js
/**
 * 节流：在 n 秒内最多只执行一次回调。
 * 无论触发多频繁，都会按固定频率执行。
 * 适用场景：scroll 滚动监听、mousemove 拖拽、高频点击。
 *
 * 两种实现思路：
 *  - leading（首节流）：进入后立即执行，然后周期内忽略后续
 *  - trailing（尾节流）：周期内最后一次触发也执行
 * 这里用时间戳 + 定时器组合，兼顾 leading 与 trailing。
 *
 * @param {Function} fn       需要节流处理的函数
 * @param {number}   interval 节流间隔(ms)
 * @returns {Function} 带 cancel 方法的节流函数
 */
function throttle(fn, interval = 300) {
  let lastTime = 0; // 上次执行的时间戳
  let timer = null; // 用于 trailing 的定时器
  let lastArgs = null; // trailing 时需要用的参数

  function throttled(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);

    lastArgs = args;

    // 距离上次执行已超过 interval，直接执行（leading）
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer) {
      // 还没到时间，且没排队的定时器，则排一个 trailing 执行
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, lastArgs);
      }, remaining);
    }
  }

  throttled.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return throttled;
}
```

:::

## 解决JS对象嵌套函数this指向的几种方法

1. **使用箭头函数**  
   箭头函数不绑定自己的 `this`，而是继承外层作用域的 `this`，因此在嵌套函数中使用时，`this` 会保持与外层对象一致。

2. **使用 `bind` 显式绑定 `this`**  
   在函数定义或调用时，使用 `bind(this)` 将 `this` 显式绑定到当前对象，确保嵌套函数中 `this` 指向正确。

3. **将 `this` 保存为变量**  
   在对象方法中，先保存 `this` 到一个变量（如 `const self = this` 或 `var that = this`），然后在嵌套函数中使用该变量，避免 `this` 指向错误。

## 理解bind()函数

在 JavaScript 中，`bind()` 是 `Function.prototype` 上的一个方法，它的核心作用是**创建一个新函数，该函数的 `this` 值被永久绑定到指定的对象**，即使这个新函数作为回调或在不同上下文中被调用，其 `this` 也不会改变。

**基本语法**

```js
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

- `thisArg`：绑定函数执行时的 `this` 值。
- `arg1, arg2, ...`：可选的预设参数，这些参数会排在调用时传入的参数前面。

::: info 核心特性与用途

1. **固定 `this` 上下文**  
   常用于解决回调函数中 `this` 丢失的问题。

2. **预设参数（偏函数）**  
   `bind()` 可以提前传入部分参数，形成“偏函数”，后续调用时再传入剩余参数：

   ```js
   function add(a, b) {
     return a + b;
   }

   const addFive = add.bind(null, 5); // 预设第一个参数为 5
   console.log(addFive(3)); // 输出 8
   ```

3. **不可被再次绑定**  
   一旦通过 `bind()` 创建了绑定函数，再次对其调用 `bind()` 不会改变其 `this`，但会追加参数：

   ```js
   function log(...args) {
     console.log(this, ...args);
   }

   const boundLog = log.bind("this value", 1, 2);
   const boundLog2 = boundLog.bind("new this", 3, 4);
   boundLog2(5, 6);
   // 输出："this value", 1, 2, 3, 4, 5, 6
   // this 仍然是 "this value"，不是 "new this"
   ```

4. **可用于构造函数**  
   绑定函数仍可用 `new` 调用，此时 `this` 会被忽略（由构造函数自身决定），但预设参数仍有效：

   ```js
   function Person(name) {
     this.name = name;
   }

   const BoundPerson = Person.bind(null, "Default");
   const p = new BoundPerson();
   console.log(p.name); // 'Default'
   ```

:::

**与 `call()`、`apply()` 的区别**

- `call()` / `apply()`：**立即执行**函数，并临时指定 `this`。
- `bind()`：**返回一个新函数**，不立即执行，`this` 被永久绑定。

## 面向对象的理解

1. **核心思想：万物皆对象**
2. **三大特性: 封装、继承、多态**
   - 封装：隐藏细节，暴露接口
   - 继承：代码复用与扩展
   - 多态：接口重用与解耦
