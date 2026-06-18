# Vue2 基础

## 认识vue

- Vue特点: 解耦视图和数据、可复用的组件、前端路由技术、状态管理、虚拟DOM。
- Vue.js安装方式：1. 直接CDN引入 2. 下载引入 3. NPM安装
- Vue中的MVVM架构：
  - M：model数据层，可能是死数据，也可能来自于服务器。
  - V：view视图层，前端通常指dom层。主要作用给用户展示各种信息
  - VM：vuemodel视图模型层，是view和model沟通的桥梁。主要作用：一、实现了data binding（数据绑定），将model的改变实时的反应到view中。二、实现dom listener（dom监听），当dom发生某些事件时，可以根据需要改变对应的data。

::: info 创建vue实例时可传入的options

| 属性         | 类型                 | 说明                             |
| ------------ | -------------------- | -------------------------------- |
| `el`         | String / HTMLElement | 挂载点，指定Vue实例管理的DOM元素 |
| `data`       | Object / Function    | 数据对象，Vue实例的数据来源      |
| `methods`    | Object               | 方法对象，定义Vue实例的方法      |
| `computed`   | Object               | 计算属性，基于依赖缓存的计算结果 |
| `components` | Object               | 组件对象，注册局部组件           |
| `filters`    | Object               | 过滤器对象，注册局部过滤器       |
| `watch`      | Object               | 监听属性，监听数据变化并执行回调 |
| `props`      | Array / Object       | 属性列表，接收父组件传递的数据   |
| `template`   | String               | 模板字符串，组件的模板内容       |
| `render`     | Function             | 渲染函数，createElement函数      |

:::

::: info 计算属性

计算属性是基于依赖缓存的计算结果，当依赖的属性发生变化时，计算属性会自动更新。  
每个计算属性都包含一个getter和一个setter。默认只有getter。

> **计算属性的缓存：**  
> methods和computed看起来都可以实现我们的功能，那么为什么还要多一个计算属性这个东西呢？原因：计算属性会进行缓存，如果多次使用时，计算属性只会调用一次。

:::

### 生命周期钩子

::: info 生命周期钩子

| 属性            | 类型     | 说明           |
| --------------- | -------- | -------------- |
| `beforeCreate`  | Function | 实例创建前钩子 |
| `created`       | Function | 实例创建后钩子 |
| `beforeMount`   | Function | 挂载前钩子     |
| `mounted`       | Function | 挂载后钩子     |
| `beforeUpdate`  | Function | 更新前钩子     |
| `updated`       | Function | 更新后钩子     |
| `beforeDestroy` | Function | 销毁前钩子     |
| `destroyed`     | Function | 销毁后钩子     |

![VueLifecycleHooks](asset/VueLifecycleHooks.png)
:::

## vue基础语法

Mustache语法(也就是双大括号)，双大括号中也可以进行简单的运算，比如：加减乘除等。

### 指令

| 指令      | 作用描述                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| v-bind    | 属性绑定。动态地绑定一个或多个 HTML 属性（如 `src`, `href`, `class`, `style`）。                                        |
| v-on      | 事件监听。绑定事件监听器，触发时执行 Vue 实例中的方法。支持事件修饰符（如 `.stop`, `.prevent`）。                       |
| v-model   | 双向数据绑定。主要在表单元素（input, select, textarea）上使用，数据变化视图更新，视图变化数据更新。                     |
| v-if      | 条件渲染 (销毁/重建)。如果表达式为假，元素不会存在于 DOM 中。切换开销大，适合条件不常变动的情况。                       |
| v-else    | 条件渲染 (否则)。配合 `v-if` 使用，表示"否则"的块。                                                                     |
| v-else-if | 条件渲染 (多重判断)。配合 `v-if` 使用，表示"else if"块。                                                                |
| v-show    | 条件渲染 (显示/隐藏)。无论真假，元素始终渲染在 DOM 中，只是切换 CSS 的 `display: none` 属性。切换开销小，适合频繁切换。 |
| v-for     | 列表渲染。基于源数据多次渲染元素或模板块。建议配合 `key` 使用。                                                         |
| v-text    | 更新文本内容。更新元素的 `textContent`。与插值类似，但不会闪烁（FOUC）。                                                |
| v-html    | 更新 HTML 内容。更新元素的 `innerHTML`。注意： 容易导致 XSS 攻击，仅在内容可信时使用。                                  |
| v-pre     | 跳过编译。跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。                                          |
| v-once    | 只渲染一次。元素和它的所有子节点将被视为静态内容，只渲染一次，后续数据变化不会引起更新。                                |
| v-cloak   | 防止闪烁。这个指令保持在元素上直到关联实例结束编译。配合 CSS `[v-cloak] { display: none }` 解决插值闪烁问题。           |

**语法糖：**  
`v-bind` 指令的语法糖是 `:attr="value"`，用于绑定属性值。  
`v-on` 指令的语法糖是 `@event="handler"`，用于绑定事件监听器。

::: info v-bind 绑定属性

1. 绑定类名 (`:class`)

Vue 为 `class` 绑定提供了专门的增强，支持**对象语法**和**数组语法**。

**对象语法**  
适用于：**根据条件动态切换类名**（键为类名，值为布尔值判断条件）。

- **用法：直接绑定类，与普通类共存（不冲突），可配合计算属性或方法（推荐）**

  ```html
  <h2 class="title" :class="{'active': isActive, 'line': isLine}">
    Hello World
  </h2>
  <!-- 当逻辑过于复杂时，可将其抽离到 `methods` 或 `computed` 中，保持模板整洁。 -->
  <h2 class="title" :class="classes">Hello World</h2>
  ```

**数组语法**  
适用于：**应用一个 class 列表**（数组内的元素可以是字符串变量、三元表达式或对象）。

- **用法：直接绑定类，与普通类共存（不冲突），可配合计算属性或方法**

  ```html
  <h2 class="title" :class="['active', 'line']">Hello World</h2>
  <!-- 注：classes 是一个返回数组的计算属性 -->
  <h2 class="title" :class="classes">Hello World</h2>
  ```

---

2. 绑定内联样式 (`:style`)

`:style` 的对象语法: CSS 属性名推荐使用驼峰式（如 `fontSize`），如果使用短横线分隔（如 `'font-size'`），必须用单引号括起来。

**对象语法（推荐）**  
`style` 后面跟的是一个对象类型，对象的 `key` 是 CSS 属性名称，`value` 是具体的值（可来自 `data` 或计算属性）。

```html
<div :style="{ color: currentColor, fontSize: fontSize + 'px' }"></div>
```

**数组语法**  
`style` 后面跟的是一个数组类型，可以将多个样式对象应用到同一个元素上，多个值以逗号分割。

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

:::

::: info v-on 事件监听

v-on指令 缩写@  
当通过methods中定义方法，以供@click调用时，需要注意参数问题：

- 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加。但是注意：如果方法本身中有一个参数，但在事件定义-写方法时省略了小括号，那么会默认将原生事件event参数传递进去
- 情况二：如果需要同时传入某个参数，同时需要event时，可以通过$event传入事件。

:::

::: info v-for 循环遍历

`v-for` 支持遍历数组、对象、字符串，甚至可以直接遍历指定的次数。基本语法是 `v-for="(item, index) in items"`。

**1. 遍历数组（最常用）**
可以获取数组的每一项以及对应的索引（索引从 0 开始）。

```html
<ul>
  <!-- item 是数组项，index 是索引（可选） -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.message }}
  </li>
</ul>
```

**2. 遍历对象**
可以获取对象的属性值（value）、属性名（key）以及索引（index）。

```html
<ul>
  <!-- 参数顺序固定：值, 键, 索引 -->
  <li v-for="(value, key, index) in user" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </li>
</ul>
```

**3. 遍历整数或字符串**

- 遍历整数：`v-for` 接受一个整数，会将模板重复对应的次数（从 1 开始）。
- 遍历字符串：会将字符串拆分为字符数组进行遍历（较少使用）。

```html
<!-- 遍历整数，输出 1 到 10 -->
<span v-for="n in 10">{{ n }} </span>
<!-- 遍历字符串 -->
<span v-for="(char, index) in 'hello'">{{ char }}-{{ index }}</span>
```

:::

::: info v-model 双向数据绑定

`v-model` 本质上是一个**语法糖**。在底层，它结合了 `v-bind`（绑定数据）和 `v-on`（监听事件）来实现双向绑定。

以最常见的文本输入框为例，以下两行代码是完全等价的：

```html
<!-- 使用 v-model 的简写 -->
<input v-model="message" />
<!-- 编译后的等价写法 -->
<input :value="message" @input="message = $event.target.value" />
```

:::

::: warning ⚠️ 注意

- **v-if vs v-show**
  - `v-if` 是真正的条件渲染（DOM 节点的添加和删除），**惰性**的（如果初始为 false，什么都不会做，直到变 true）。
  - `v-show` 只是 CSS 切换，**不管初始条件如何，元素总是会被渲染**。
- **v-for 的优先级**
  - 当 `v-if` 与 `v-for` 一起使用时，`v-for` 的优先级更高（即：遍历每一项，然后判断是否显示）。**建议：** 尽量避免同时使用，如果为了过滤列表，建议在计算属性中处理。
- **修饰符**
  - `v-on` 和 `v-model` 都有很多修饰符，例如 `@click.stop` (阻止冒泡), `v-model.trim` (去除首尾空格) 等。

:::

### 修饰符

| 事件修饰符（v-on） | 说明                               |
| :----------------: | :--------------------------------- |
|      `.stop`       | 阻止事件冒泡                       |
|     `.prevent`     | 阻止默认事件（如表单提交）         |
|     `.capture`     | 使用事件捕获模式                   |
|      `.self`       | 只有当事件在该元素本身触发时执行   |
|      `.once`       | 事件只触发一次                     |
|     `.passive`     | 滚动事件立即触发（不等待onScroll） |

| 表单修饰符（v-model） | 说明                              |
| :-------------------: | :-------------------------------- |
|        `.lazy`        | 失焦时更新（默认 input 实时更新） |
|       `.number`       | 自动转换为数字                    |
|        `.trim`        | 去除首尾空格                      |

|       键盘修饰符（v-on）       | 说明                           |
| :----------------------------: | :----------------------------- |
|            `.enter`            | 回车键                         |
|             `.tab`             | Tab 键                         |
|           `.delete`            | Delete/Backspace 键            |
|             `.esc`             | Esc 键                         |
|            `.space`            | 空格键                         |
| `.up`/`.down`/`.left`/`.right` | 方向键                         |
|            `.ctrl`             | Ctrl 键                        |
|             `.alt`             | Alt 键                         |
|            `.shift`            | Shift 键                       |
|            `.meta`             | Mac 的 Cmd / Windows 的 Win 键 |

## 组件化开发

### 组件的注册

组件的使用通常分为三个标准步骤：**创建组件构造器**、**注册组件**、**使用组件**。

1. **创建组件构造器**：调用 `Vue.extend()` 方法。
2. **注册组件**：调用 `Vue.component()` 方法。
3. **使用组件**：在 Vue 实例的作用范围内（HTML 中）使用组件标签。

::: info 基础注册流程 (Vue.extend)

_注意：这种写法在 Vue 2.x 文档中几乎已淘汰，现在直接使用语法糖，但语法糖的底层原理仍是此方法。_

**代码示例：**

```html
<div id="app">
  <!-- 3. 使用组件 -->
  <my-cpn></my-cpn>
</div>

<script src="../js/vue.js"></script>
<script>
  // 1. 创建组件构造器
  const myComponent = Vue.extend({
    template: `
      <div>
        <h2>组件标题</h2>
        <p>我是组件中的一个段落内容</p>
      </div>`,
  });

  // 2. 注册组件, 并且定义组件标签的名称
  Vue.component("my-cpn", myComponent);

  // 创建 Vue 实例
  let app = new Vue({
    el: "#app",
  });
</script>
```

**核心概念解析：**

- **Vue.extend()**：
  - 创建的是一个**组件构造器**。
  - 通常传入 `template` 属性，代表自定义组件的 HTML 模板。
- **Vue.component()**：
  - 将刚才的组件构造器注册为一个组件，并给它起一个标签名称。
  - **参数 1**：注册组件的标签名（如 `'my-cpn'`）。
  - **参数 2**：组件构造器（如 `myComponent`）。
- **挂载要求**：组件必须挂载在某个 Vue 实例下，否则不会生效。

:::

::: info 语法糖注册

为了简化代码，Vue 提供了“语法糖”写法，省略了显式调用 `Vue.extend` 的步骤，直接在注册时传入配置对象。

**全局组件注册 (语法糖)：**

直接在 `Vue.component` 中传入对象。

```js
// 1. 注册全局组件的语法糖
Vue.component("my-cpn", {
  template: `
    <div>
      <h2>组件标题</h2>
      <p>组件正文的内容, 今天真开心啊!!!</p>
    </div>`,
});
```

**局部组件注册 (语法糖)：**

通过 Vue 实例中的 `components` 属性进行挂载。

```js
let app = new Vue({
  el: "#app",
  components: {
    // 键名是组件名，键值是组件配置对象
    "my-cpn1": {
      template: "<div>这是my-cpn1组件</div>",
    },
    "my-cpn2": {
      template: "<div>这是my-cpn2组件</div>",
    },
  },
});
```

:::

::: info 全局组件与局部组件

| 类型         | 注册方式                                | 作用域                                              |
| :----------- | :-------------------------------------- | :-------------------------------------------------- |
| **全局组件** | 调用 `Vue.component()`                  | 可以在**任意** Vue 实例下使用。                     |
| **局部组件** | 在 Vue 实例中通过 `components` 属性注册 | 只能在当前 Vue 实例的作用范围内（及其子组件）使用。 |

:::

::: info 模板的分离写法

在实际开发中，将 HTML 字符串直接写在 JavaScript 的 `template` 字符串中既不方便也不直观。Vue 提供了两种方案将 HTML 模块内容分离出来：

1. 使用 `<script>` 标签
2. 使用 `<template>` 标签

**方案一：使用 `<script>` 标签**

利用 `type="text/x-template"` 防止浏览器将其作为 JavaScript 执行。

```html
<!-- 定义模板 -->
<script type="text/x-template" id="myCpn">
  <div>
    <h2>组件标题</h2>
    <p>我是组件的内容，今天天气不错哦!!!</p>
  </div>
</script>

<script>
  let app = new Vue({
    el: "#app",
    components: {
      "my-cpn": {
        template: "#myCpn", // 通过 ID 选择器引用
      },
    },
  });
</script>
```

**方案二：使用 `<template>` 标签(推荐)**

```html
<!-- 定义模板 -->
<template id="myCpn">
  <div>
    <h2>组件标题</h2>
    <p>我是组件的内容，今天天气不错哦!!!</p>
  </div>
</template>

<script>
  let app = new Vue({
    el: "#app",
    components: {
      "my-cpn": {
        template: "#myCpn", // 通过 ID 选择器引用
      },
    },
  });
</script>
```

> **注意**：无论是哪种分离写法，在组件配置中引用时，都需要使用 `template: '#id名'` 的形式。

:::

::: info 组件数据data属性

- 组件对象有一个 `data` 属性，必须是一个**函数**，这个函数必须返回一个**对象**，对象内部保存着数据。
- **数据隔离（核心原因）**：原因是 Vue 让每个组件对象都返回一个新的对象。因为如果是同一个对象的引用，组件在多次使用后会相互影响（即数据污染）。

```js
let app = new Vue({
  el: "#app",
  components: {
    "my-cpn": {
      template: "#myCpn",
      // data 必须是一个函数，且返回一个对象
      data() {
        return {
          message: "Hello World",
        };
      },
    },
  },
});
```

:::

### 组件通信

::: info 组件通信方式对比

| 方式              | 适用场景      | 特点                      |
| ----------------- | ------------- | ------------------------- |
| props/$emit       | 父子组件      | 最常用，简单直接          |
| v-model           | 双向绑定      | 语法糖，本质是props+$emit |
| Event Bus         | 兄弟/任意组件 | 简单，但组件多时难以维护  |
| provide/inject    | 祖先与后代    | 适合深层嵌套组件通信      |
| $attrs/$listeners | 层级组件      | 批量传递属性和事件        |
| $parent/$children | 父子组件      | 紧耦合，不推荐            |
| Vuex              | 全局状态      | 状态管理，适合大型应用    |

:::

#### 父子组件通信

**父组件向子组件传递数据：使用props**

```vue
<!-- 父组件 -->
<template>
  <child-component
    :parent-message="message"
    :parent-num="num"
  ></child-component>
</template>

<!-- 子组件 -->
<script>
export default {
  // 方式一：数组形式
  // props: ['parentMessage', 'parentNum']

  // 方式二：对象形式（推荐）
  props: {
    parentMessage: {
      type: String,
      default: "",
    },
    parentNum: {
      type: Number,
      required: true,
    },
  },
};
</script>
```

::: info props属性说明

| 属性        | 类型                                                    | 说明           |
| ----------- | ------------------------------------------------------- | -------------- |
| `type`      | String/Number/Boolean/Array/Object/Date/Function/Symbol | 数据类型       |
| `required`  | Boolean                                                 | 是否必填       |
| `default`   | String/Number/Boolean/Array/Object/Function             | 默认值         |
| `validator` | Function                                                | 自定义验证函数 |

:::

**props数据流向：props是只读的，不建议直接修改**

#### 子父组件通信

**子组件向父组件传递数据：使用$emit**

```vue
<!-- 子组件 -->
<template>
  <button @click="sendToParent">发送数据</button>
</template>

<script>
export default {
  methods: {
    sendToParent() {
      this.$emit("child-event", "来自子组件的数据");
    },
  },
};
</script>

<!-- 父组件 -->
<template>
  <child-component @child-event="handleChildEvent"></child-component>
</template>
```

#### v-model实现双向绑定

```vue
<!-- 父组件 -->
<template>
  <child-component v-model="value"></child-component>
  <!-- 等价于 -->
  <child-component :value="value" @input="value = $event"></child-component>
</template>

<script>
export default {
  data() {
    return { value: "" };
  },
};
</script>

<!-- 子组件 -->
<template>
  <input :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  props: ["value"],
};
</script>
```

#### 兄弟组件通信

**方式一：父组件作为中转**

```vue
<!-- 父组件 -->
<template>
  <child-a @event-a="handleA"></child-a>
  <child-b :message="message"></child-b>
</template>

<script>
export default {
  data() {
    return { message: "" };
  },
  methods: {
    handleA(data) {
      this.message = data;
    },
  },
};
</script>
```

**方式二：事件总线（Event Bus）**

```javascript
// 创建事件总线
export default new Vue();

// main.js中挂载到Vue原型
Vue.prototype.$bus = new Vue();
```

```vue
<!-- 组件A -->
<script>
export default {
  mounted() {
    this.$bus.$emit("bus-event", "来自A的数据");
  },
};
</script>

<!-- 组件B -->
<script>
export default {
  mounted() {
    this.$bus.$on("bus-event", (data) => {
      console.log(data);
    });
  },
  beforeDestroy() {
    this.$bus.$off("bus-event");
  },
};
</script>
```

#### 祖先与后代组件通信

**provide / inject**

```vue
<!-- 祖先组件 -->
<script>
export default {
  provide() {
    return {
      theme: this.themeColor,
      method: this.commonMethod,
    };
  },
  data() {
    return {
      themeColor: "blue",
    };
  },
  methods: {
    commonMethod() {
      console.log("共享方法");
    },
  },
};
</script>

<!-- 后代组件 -->
<script>
export default {
  inject: ["theme", "method"],
  mounted() {
    console.log(this.theme); // 'blue'
    this.method();
  },
};
</script>
```

::: info provide / inject 特点

- `provide`：祖先组件提供数据，可以是对象或返回对象的函数（本身不是响应式的）
- `inject`：后代组件注入数据，默认值非响应式
- **响应式说明**：如果provide的是`data()`返回的响应式对象（引用），则inject是响应式的；如果provide的是普通值/对象，则不是响应式的
- 适用场景：父组件向深层嵌套的子组件传值

:::

#### $attrs 和 $listeners

**$attrs**：包含了父作用域中不作为prop被识别（且获取）的特性绑定

**$listeners**：包含了父作用域中的v-on事件监听器

```vue
<!-- 父组件 -->
<template>
  <child-component :foo="foo" :bar="bar" @click="handleClick"></child-component>
</template>

<!-- 子组件 -->
<script>
export default {
  mounted() {
    // 获取所有非props属性
    console.log(this.$attrs); // { bar: 'barValue' }
    // 获取所有事件监听器
    console.log(this.$listeners); // { click: f }
  },
};
</script>
```

#### $parent / $children / $refs

```vue
<!-- 父组件 -->
<script>
export default {
  mounted() {
    // 访问子组件实例
    console.log(this.$children[0].childMethod());
    // 通过ref访问
    console.log(this.$refs.childRef.childMethod());
  },
};
</script>

<!-- 子组件 -->
<script>
export default {
  methods: {
    childMethod() {
      return "子组件方法";
    },
  },
};
</script>
```

### 插槽slot

**目的**：抽取组件的共性，保留不同之处（即“封装”）。

::: info 使用方式

在子组件模板中使用特殊的 `<slot>` 元素来开启插槽。

- **默认内容**：`<slot>默认内容</slot>`
  - 如果父组件在使用时没有传入任何内容，则显示这里的默认内容。
  - 如果父组件传入了内容，则默认内容会被替换。

```html
<!-- 子组件模板 -->
<div class="child">
  <slot>我是默认内容</slot>
</div>
```

---

**具名插槽**：当一个组件需要多个插槽时，可以使用 `name` 属性来区分不同的插槽。

- **定义**：给 `<slot>` 添加 `name` 属性。
- **分发**：父组件在使用时，通过 `slot="name"` 属性指定内容要插入到哪个位置。

```html
<!-- 子组件 (my-cpn) -->
<template id="myCpn">
  <div>
    <slot name="left">我是左侧</slot>
    <slot name="center">我是中间</slot>
    <slot name="right">我是右侧</slot>
  </div>
</template>

<!-- 父组件调用 -->
<my-cpn>
  <!-- 只传入左侧内容 -->
  <span slot="left">我是返回按钮</span>
</my-cpn>

<my-cpn>
  <!-- 传入所有内容 -->
  <span slot="left">我是返回按钮</span>
  <span slot="center">我是标题</span>
  <span slot="right">我是菜单</span>
</my-cpn>
```

:::

#### 作用域插槽

> **编译作用域官方准则**：
>
> - **父组件模板**的所有东西都会在**父级作用域**内编译。
> - **子组件模板**的所有东西都会在**子级作用域**内编译。
> - **通俗解释**：在 `<my-cpn>` 标签内部写的 HTML 和变量，只能访问父组件的数据；而在 `<template id="myCpn">` 内部写的变量，只能访问子组件的数据。

- **作用域插槽使用场景**：父组件想替换插槽的内容，但渲染所需的数据却来源于子组件。
- **机制**：
  1. **子组件**：将数据绑定在 `<slot>` 上（例如 `:data="pLanguages"`）。
  2. **父组件**：通过 `slot-scope` 接收子组件传递过来的数据对象。

::: info 代码逻辑流程

1. **子组件定义与传值**：

   ```js
   // 子组件数据
   data() {
     return {
       pLanguages: ['JavaScript', 'Python', 'Swift', 'Go', 'C++']
     }
   }
   ```

   ```html
   <!-- 子组件模板：将数据绑定到 slot 上 -->
   <slot :data="pLanguages"></slot>
   ```

2. **父组件接收与使用**：

   父组件使用 `<template slot-scope="slotProps">` 来获取子组件传来的数据对象。

   ```html
   <my-cpn>
     <template slot-scope="slotProps">
       <ul>
         <!-- 注意这里使用的是 slotProps.data -->
         <li v-for="info in slotProps.data">{{ info }}</li>
       </ul>
     </template>
   </my-cpn>
   <my-cpn>
     <template slot-scope="slotProps">
       <span v-for="info in slotProps.data">{{ info }} </span>
     </template>
   </my-cpn>
   ```

:::

## webpack

### 简单认识

::: info Webpack的定义与核心

- **定义**：Webpack 是一个现代的 JavaScript 应用的静态模块打包工具。
- **核心理念（模块化）**：
  - 让开发者进行模块化开发，并自动处理模块间的依赖关系。
  - **万物皆模块**：不仅仅是 JavaScript，CSS、图片、JSON 文件等都可以被当作模块来使用。
- **工作流程**：
  1.  进行模块化分析，处理复杂的依赖关系。
  2.  将各种资源模块打包合并成一个或多个包（Bundle）。
- **附加功能（资源处理）**：在打包过程中可以对资源进行处理，例如：压缩图片、将SCSS转成CSS、将ES6语法转成ES5语法、将TypeScript转成JavaScript

:::

::: info Webpack 与 Grunt/Gulp 的对比

| 工具       | 核心         | 适用场景                 | 侧重点                           |
| ---------- | ------------ | ------------------------ | -------------------------------- |
| Grunt/Gulp | Task（任务） | 简单项目，无强模块化需求 | 流程自动化                       |
| Webpack    | 模块化打包   | 模块化强依赖项目         | 模块化管理（压缩合并为附带功能） |

:::

### 安装与使用

::: info 安装

安装 webpack 首先需要安装 Node.js，Node.js 自带了软件包管理工具 npm

**全局安装** webpack(这里先指定版本号 3.6.0，因为 vue cli2 依赖该版本)

```bash
npm install webpack@3.6.0 -g
```

**局部安装** webpack (--save-dev 是开发时依赖，项目打包后不需要继续使用的)

```bash
cd 对应目录
npm install webpack@3.6.0 --save-dev
```

> 为什么全局安装后，还需要局部安装呢？
>
> 在终端直接执行 webpack 命令，使用的是全局安装的 webpack。  
> 当在 package.json 中定义了 scripts 时，其中包含了 webpack 命令，那么使用的是局部 webpack。

:::

::: info 使用

**文件和文件夹说明：**

- **dist 文件夹**：用于存放之后打包的文件
- **src 文件夹**：用于存放我们写的源文件
- **main.js**：项目的入口文件。
- **index.html**：浏览器打开展示的首页 html
- **package.json**：通过 npm init 生成的，npm 包管理的文件。

**Webpack 打包指令**

```bash
webpack src/main.js dist/bundle.js
```

（通过全局 npm 打包）  
打包后会在 dist 文件下，生成一个 bundle.js 文件  
bundle.js 文件，是 webpack 处理了项目直接文件依赖后生成的一个 js 文件，我们只需要将这个 js 文件在 index.html 中引入即可。  
**入口出口文件**  
创建一个 webpack.config.js 文件

```js
const path = require("path");

module.exports = {
  // 入口：可以是字符串/数组/对象，这里我们入口只有一个，所以写一个字符串即可
  entry: "./src/main.js",
  // 出口：通常是一个对象，里面至少包含两个重要属性，path 和 filename
  output: {
    path: path.resolve(__dirname, "dist"), // 注意：path通常是一个绝对路径
    filename: "bundle.js",
  },
};
```

:::

::: info 局部 webpack

一个项目往往依赖特定的 `webpack` 版本，全局的版本可能跟这个项目的 `webpack` 版本不一致，导出打包出现问题。所以通常一个项目，都有自己局部的 `webpack`。  
**第一步，项目中需要安装自己局部的 webpack**  
这里我们让局部安装 `webpack3.6.0`。Vue CLI3 中已经升级到 `webpack4`，但是它将配置文件隐藏了起来，所以查看起来不是很方便。

```bash
npm install webpack@3.6.0 --save-dev
```

**第二步，通过 `node_modules/.bin/webpack` 启动 webpack 打包**

```bash
node_modules/.bin/webpack
```

**package.json 中定义启动（重要）**  
`package.json` 中的 scripts 的脚本在执行时，会按照一定的顺序寻找命令对应的位置。  
首先，会寻找本地的 `node_modules/.bin` 路径中对应的命令。如果没有找到，会去全局的环境变量中寻找。如何执行我们的 build 指令呢？

```bash
npm run build
```

**说明：** `npm run xxx` 命令中的 `xxx` 定义在 `package.json` 中的 scripts 对象中。

:::

::: info Webpack.config.js配置文件的抽离

通常情况下，我们在项目根目录下创建一个 build 文件夹来进行配置文件的存放。其中的 baseConfig.js 文件用来存放一些公共的配置；prodConfig.js 文件用来存放生产版本配置，如压缩 js 的 plugin 的配置信息；devConfig.js 文件用来存放开发时以来的配置，如 webpack 提供的本地服务器 plugin 的配置信息。

抽离完以后，需要对 package.json 文件中的 scripts 命令进行更改:  
`"build": "webpack --config ./build/prod.config.js",`  
`"dev": "webpack-dev-server --open --config ./build/dev.config.js"`

这样在执行相应的命令时就会调用指定的配置文件了。
:::

::: info 搭建本地服务器

webpack 提供了一个可选的本地开发服务器，这个本地服务器基于 node.js 搭建，内部使用 express 框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果。
不过它是一个单独的模块，在 webpack 中使用之前需要先安装它。
`npm install --save-dev webpack-dev-server@2.9.1`

devserver 也是作为 webpack 中的一个选项，选项本身可以设置如下属性:  
contentBase: 为哪一个文件夹提供本地服务，默认是根文件夹，我们这里要填写 ./dist  
port: 端口号  
inline: 页面实时刷新  
historyApiFallback: 在 SPA 页面中，依赖 HTML5 的 history 模式

```js
// webpack.config.js配置
devServer: {
    contentBase: './dist',
    inline: true,
    historyApiFallback: true,
    port: 8080
},
```

可以再配置另外一个 scripts :
`"dev": "webpack-dev-server --open"`

--open 参数表示直接打开浏览器

:::

### loader

- **定义**：webpack 的核心概念，用于扩展 webpack 能力
- **作用**：处理 css、图片、ES6/TypeScript、scss/less、vue/jsx 等文件
- **使用**：npm 安装 → webpack.config.js 的 modules 配置
- **资源**：webpack 官网可查

::: info CSS等样式文件的加载和解析

- **引用**：入口文件 `main.js` 中 `require('./css/normal.css')`
- **安装 loader**：`npm install --save-dev css-loader style-loader`
- **配置**：style-loader 在前，css-loader 在后（从右向左执行）
- **其他样式**：less/scss/stylus 安装相应 loader
- **官网**：[webpackjs.com](http://www.webpackjs.com)（中文推荐）

:::

::: info 图片文件的加载和解析

- **工具安装**：当 css 文件中引用了图片等文件时，项目进行打包需要安装 `url-loader` 。
- **limit 属性**：该 loader 的配置文件中的 limit 属性的作用是：当图片小于 8kb（默认）时，对图片进行 base64 编码，当图片大于 8kb 时，需要用 `file-loader` 来进行处理。
- **名称修改**：打包时，会对图片文件自动进行名称修改（目的是防止重复）。webpack 自动帮助我们生成名字，32 位 hash 值。但是，真实开发中，我们可能对打包的图片名字有一定的要求，比如，将所有的图片放在一个文件夹中，加上图片原来的名称，同时也要防止重复。所以，我们可以在配置 `url-loader` 的 options 属性中添加如下选项：
  - img：文件要打包到的文件夹
  - name：获取图片原来的名字，放在该位置
  - hash:8：为了防止图片名称冲突，依然使用 hash，但是我们只保留 8 位
  - ext：使用图片原来的扩展名
  - 语法：`name:'img/[name].[hash:8].[ext]'`
- **路径问题**：但是，我们发现图片并没有显示出来，这是因为图片使用的路径不正确。默认情况下，webpack 会将生成的路径直接返回给使用者。但是，我们整个程序是打包在 dist 文件夹下的，所以这里我们需要在路径下再添加一个 `dist/`。

```js
// 出口：通常是一个对象，里面至少包含两个重要属性，path 和 filename
output: {
    path: path.resolve(__dirname, 'dist'), // 注意：path通常是一个绝对路径
    filename: 'bundle.js',
    publicPath: 'dist/'
},
module: {
    rules: []
}
```

:::

::: info ES6 语法处理

- **工具**：如果希望将 ES6 的语法转成 ES5，那么就需要使用 babel。而在 webpack 中，我们直接使用 babel 对应的 loader 就可以了。
- **安装命令**：

  ```bash
  npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
  ```

- **配置**：对应的 `babel-loader` 配置文件中的 presets: `['es2015']`

:::

::: info Webpack 配置 Vue

- **安装 Vue**：`npm install vue --save`
- **报错原因**：默认引入的是 runtime-only 版本（不含 runtime-compiler），无法解析 template 模板
- **解决方法**：配置别名指向完整版（含编译器）
  ```javascript
  resolve:{alias:{'vue$':'vue/dist/vue.esm.js'}},
  ```

:::

::: info .vue 文件封装处理

- **概念**：以一种全新的方式来组织一个 vue 的组件（.vue）
- **依赖**：需要通过 `vue-loader` 和 `vue-template-compiler` 来进行加载解析
- **安装命令**：安装 `vue-loader` 和 `vue-template-compiler` 的语法：(按需指定版本号)
  ```bash
  npm install vue-loader vue-template-compiler --save-dev
  ```
- **配置**：修改 `webpack.config.js` 的配置文件：在 loader 规则的数组中添加一条：
  ```js
  {
      test: /\.vue$/,
      use: ['vue-loader']
  }
  ```

:::

### plugin

> loader 和 plugin 区别:
>
> loader 主要用于转换某些类型的模块，它是一个转换器。  
> plugin 是插件，它是对 webpack 本身的扩展，是一个扩展器。

> plugin 的使用过程:
>
> 步骤一：通过 npm 安装需要使用的 plugins(某些 webpack 已经内置的插件不需要安装)  
> 步骤二：在 webpack.config.js 中的 plugins 中配置插件。

::: info 添加版权的Plugin

属于 webpack 自带的插件

```js
const webpack = require('webpack')

module.exports = {
    ...
    plugins: [
        new webpack.BannerPlugin('最终版权归coderwhy所有')
    ]
}
```

重新打包程序：查看 bundle.js 文件的头部，看到如下信息

```text
/*! 最终版权归coderwhy所有 */
/******/ (function(modules) { // webpackBootstrap
```

:::

::: info 打包html的plugin

使用 HtmlWebpackPlugin 插件
自动生成一个 index.html 文件(可以指定模板来生成)，将打包的 js 文件，自动通过 script 标签插入到 body 中。

安装 HtmlWebpackPlugin 插件的指令:
`npm install html-webpack-plugin --save-dev`

```js
plugins: [
  new webpack.BannerPlugin("最终版权归coderwhy所有"),
  new HtmlWebpackPlugin({
    template: "index.html",
  }),
];
```

:::

::: info js压缩的Plugin

在项目发布之前，我们必然需要对 js 等文件进行压缩处理
使用一个第三方的插件 uglifyjs-webpack-plugin，并且版本号指定 1.1.1，和 CLI2 保持一致。
`npm install uglifyjs-webpack-plugin@1.1.1 --save-dev`

```js
const webpack = require('webpack')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    ...
    plugins: [
        new webpack.BannerPlugin('最终版权归coderwhy所有')
        new uglifyJsPlugin()
    ]
}
```

:::

## vue cli详解

### vue cli介绍

CLI 是 Command-Line Interface，翻译为命令行界面，但是俗称脚手架。  
Vue CLI 是一个官方发布 vue.js 项目脚手架，使用 vue-cli 可以快速搭建 Vue 开发环境以及对应的 webpack 配置。

Vue cli 使用前提：nodejs、webpack  
NPM 的全称是 Node Package Manager，是一个 NodeJS 包管理和分发工具，已经成为了非官方的发布 Node 模块（包）的标准。

**安装 Vue 脚手架**：`npm install -g @vue/cli`  
注意：上面安装的是 Vue CLI3 的版本，如果需要想按照 Vue CLI2 的方式初始化项目时不可以的。

Vue CLI 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2 (`vue-cli`) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具：

```bash
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

- Vue CLI2 初始化项目：`vue init webpack my-project`
- Vue CLI3 初始化项目：`vue create my-project`

::: info vue cli3

- vue-cli 3 是基于 webpack 4 打造，vue-cli 2是 webapck 3
- vue-cli 3 的设计原则是“0配置”，移除的配置文件是根目录下的，build和config等目录
- vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化，移除了static文件夹，新增了public文件夹，并且index.html移动到public中

:::

### Runtime-Compiler和Runtime-only

- 若后续开发中**仍使用 `template`**，需选择 **Runtime-Compiler**；
- 若后续开发中使用 **`.vue` 文件**，可选择 **Runtime-only（推荐）**。

::: info 核心差异

1. **Runtime + Compiler**
   - 特点：适合多数用户，但体积更大；
   - 适用场景：需在**客户端编译模板**（如向 `template` 选项传字符串、将非 DOM 的 HTML 模板挂载到元素）。
   - 运行过程：`Template → ast（抽象语法树） → render → virtual dom（虚拟 DOM） → UI`

2. **Runtime-only**
   - 特点：比 Runtime+Compiler 轻约 6KB（min+gzip），但模板仅允许在 `.vue` 文件中使用，其他场景需用 `render` 函数；
   - 优势：结合 `vue-loader`/`vueify` 时，`.vue` 文件的模板会在**构建时预编译为 JavaScript**，最终打包无需编译器，因此可直接用 Runtime-only。
   - 运行过程：`render → virtual dom（虚拟 DOM） → UI`

:::

```js
// 需要编译器（compiler）：直接使用 template 字符串
new Vue({
  template: "<div>{{ hi }}</div>",
});

// 不需要编译器：直接使用 render 函数
new Vue({
  render(h) {
    return h("div", this.hi);
  },
});
```

::: info `render` 函数的使用

通过 `createElement`（可简写为 `h`）创建虚拟 DOM

```js
// 1. 基础用法：创建标签 + 数据 + 内容
new Vue({
  el: "#app",
  render: (createElement) => {
    // 方式1：基本使用（标签、数据对象、内容数组）
    return createElement("div", { class: "box" }, ["cris"]);

    // 方式2：嵌套 render 函数
    return createElement("div", { class: "box" }, [
      "cris",
      createElement("h2", ["标题啊"]),
    ]);
  },
});
```

```js
// 2. 传入组件对象
new Vue({
  el: "#app",
  render: (createElement) => {
    // 直接传入组件对象
    return createElement(cpn);
  },
});
```

```js
// 最简写法（箭头函数简写）
render: (h) => h(cpn);
```

:::

## vue-router

## vuex详解

## 网络模块封装

## 项目部署
