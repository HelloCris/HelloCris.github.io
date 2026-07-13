# Vue3 基础

## vue3 简介

::: info 改进点

**性能提升**

- 打包大小减少 41%
- 初次渲染快 55%，更新渲染快 133%
- 内存减少 54%

**源码升级**

- 使用 **Proxy** 代替 **defineProperty** 实现响应式
- 重写虚拟 DOM 实现和 Tree-Shaking

**TypeScript 支持**

- Vue3 更好地支持 TypeScript，类型推导更完善

**新特性**

| 类别            | 内容                                                       |
| --------------- | ---------------------------------------------------------- |
| Composition API | `setup`、`ref`、`reactive`、`computed`、`watch`            |
| 内置组件        | `Fragment`、`Teleport`、`Suspense`                         |
| 其他改变        | 新的生命周期钩子、data 必须声明为函数、移除 keyCode 修饰符 |

:::

## 创建 vue3 工程

::: info 基于 vue-cli 创建

[vue-cli官方文档：创建一个项目](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

> 目前 `vue-cli` 已处于维护模式，官方推荐基于 `Vite` 创建项目。

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version

## 安装或者升级你的@vue/cli
npm install -g @vue/cli

## 执行创建命令
vue create vue_test

## 随后选择3.x
## Choose a version of Vue.js that you want to start the project with
## > 3.x
##   2.x

## 启动
cd vue_test
npm run serve
```

:::

::: info 基于 vite 创建（推荐）

vite 是新一代前端构建工具，官网地址：https://vitejs.cn/

`vite`的优势如下:

- 轻量快速的热重载 (HMR)，能实现极速的服务启动。
- 对 TypeScript、JSX、CSS 等支持开箱即用。
- 真正的按需编译，不再等待整个应用编译完成。

[官方文档：创建一个 Vue 项目](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)

```bash
## 创建命令
npm create vue@latest

## 根据提示配置TypeScript 和测试支持之类的可选功能

## 启动
cd <your-project-name>
npm install
npm run dev
```

:::

::: info webpack 构建 与 vite 构建对比图如下

<img src="./asset/webpackBuild.svg" alt="webpack构建" />

<img src="./asset/viteBuild.svg" alt="vite构建" />

:::

> vscode插件推荐
>
> - Vue Language Features (Volar)
> - TypeScript Vue Plugin (Volar)

## Vue3 核心语法

### CompositionAPI

- Vue2 的 API 设计是 Options（配置）风格的。

  > Options API 的弊端：
  >
  > - 数据、方法、计算属性等，分散在：data、methods、computed 中。
  > - 新增或者修改一个需求，就需要分别修改：data、methods、computed，不便于维护和复用。

- Vue3 的 API 设计是 Composition（组合）风格的。
  > Composition API 的优势：
  >
  > - 可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。
  > - 可以将组件的逻辑拆分成多个函数，每个函数负责一个功能，方便维护和复用。

![组合式API与选项式API对比图](./asset/compositionApi.gif)

### setup 函数

#### setup 基本使用

setup 是 Vue3 中一个新的配置项，值是一个函数，它是 Composition API “表演的舞台”，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在 setup 中。

**特点如下：**

- setup 函数返回的对象中的内容，可直接在模板中使用。
- setup 中访问 this 是 undefined。
- setup 函数会在 beforeCreate 之前调用，它是“领先”所有钩子执行的。

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
  setup() {
    // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）
    let name = "张三";
    let age = 18;

    // 方法，原来写在methods中
    function changeName() {
      name = "zhang-san"; //注意：此时这么修改name页面是不变化的
    }
    function changeAge() {
      age += 1; //注意：此时这么修改age页面是不变化的
    }

    // 返回一个对象，对象中的内容，模板中可以直接使用
    return { name, age, changeName, changeAge };
  },
};
</script>
```

::: info setup 返回值

- 若返回一个对象：则对象中的：属性、方法等，在模板中均可以直接使用 **（重点关注）**
- 若返回一个函数：则可以自定义渲染内容。Vue 会忽略该组件的 `<template>`，直接执行这个返回的函数来决定渲染什么

:::

::: warning ⚠️ 注意
**setup与Options API的关系**  
Vue2 的配置（data、methods...）中可以访问到 setup中的属性、方法。  
但在setup中不能访问到Vue2的配置（data、methods...）。  
如果与Vue2冲突，则setup优先。
:::

#### setup 语法糖

`<script setup>` 是 `setup()` 的编译时语法糖，更简洁。

| 特性        | setup()     | `<script setup>`            |
| ----------- | ----------- | --------------------------- |
| 返回值      | 需要 return | 自动暴露                    |
| 组件注册    | 需声明      | 自动注册                    |
| props/emits | 通过参数    | `defineProps`/`defineEmits` |
| 代码量      | 多          | 少                          |

```vue
<script setup>
import Child from "./Child.vue";

const props = defineProps({ name: String });
const emit = defineEmits(["update"]);

const count = ref(0);
const double = computed(() => count.value * 2);

function handleClick() {
  emit("update", count.value);
}
</script>
```

---

扩展：上述代码，还需要编写一个不写 setup 的 script 标签，去指定组件名字，比较麻烦，我们可以借助 vite 中的插件简化（Vue < 3.3）。**3.3+版本使用原生方法 `defineOptions`**。

::: info vite-plugin-vue-setup-extend 插件

1. 第一步：`npm i vite-plugin-vue-setup-extend -D`
2. 第二步：`vite.config.ts`

```ts
import { defineConfig } from "vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

export default defineConfig({
  plugins: [VueSetupExtend()],
});
```

3. 第三步：`<script setup lang="ts" name="Person">`

:::

::: info defineOptions 函数

```vue
<script setup lang="ts">
defineOptions({
  name: "Person",
});
</script>
```

:::

### ref 函数

#### ref 创建：基本类型的响应式数据

- **作用：** 定义响应式变量。
- **语法：** `let xxx = ref(初始值)`。
- **返回值：** 一个 `RefImpl` 的实例对象，简称 `ref对象` 或 `ref` ， `ref` 对象的 `value` 属性是响应式的。
- **注意点：**
  - JS 中操作数据需要： `xxx.value` ，但模板中不需要 `.value` ，直接使用即可。
  - 对于 `let name = ref('张三')` 来说， `name` 不是响应式的， `name.value` 是响应式的。

```vue
<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <button @click="changeName">修改名字</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref } from "vue";
// name和age是一个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
let name = ref("张三");

function changeName() {
  // JS中操作ref对象时候需要.value
  name.value = "李四";
  console.log(name.value);

  // 注意：name不是响应式的，name.value是响应式的，所以如下代码并不会引起页面的更新。
  // name = ref('zhang-san')
}
</script>
```

#### reactive 创建：对象类型的响应式数据

- **作用：** 定义一个响应式对象（基本类型不要用它，要用 `ref` ，否则报错）
- **语法：** `let 响应式对象 = reactive(源对象)`。
- **返回值：** 一个 `Proxy` 的实例对象，简称：响应式对象。
- **注意点：** `reactive` 定义的响应式数据是“深层次”的。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive } from "vue";

// 数据
let car = reactive({ brand: "奔驰", price: 100 });
let games = reactive([
  { id: "ahsgdyfa01", name: "英雄联盟" },
  { id: "ahsgdyfa02", name: "王者荣耀" },
  { id: "ahsgdyfa03", name: "原神" },
]);

function changeCarPrice() {
  car.price += 10;
}
function changeFirstGame() {
  games[0].name = "流星蝴蝶剑";
}
</script>
```

#### ref 创建：对象类型的响应式数据

- ref接收的数据可以是：基本类型、对象类型。
- 若ref接收的是对象类型，内部其实也是调用了reactive函数。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from "vue";

// 数据
let car = ref({ brand: "奔驰", price: 100 });
let games = ref([
  { id: "ahsgdyfa01", name: "英雄联盟" },
  { id: "ahsgdyfa02", name: "王者荣耀" },
  { id: "ahsgdyfa03", name: "原神" },
]);

function changeCarPrice() {
  car.value.price += 10;
}
function changeFirstGame() {
  games.value[0].name = "流星蝴蝶剑";
}
</script>
```

#### ref 对比 reactive

::: info ref 对比 reactive

1. `ref` 用来定义：**基本类型数据**、**对象类型数据**；
2. `reactive` 用来定义：**对象类型数据**。

**区别**：

1. `ref` 创建的变量必须使用 `.value` （可以使用 `volar` 插件自动添加 `.value` ）。
2. `reactive` 重新分配一个新对象，会**失去响应式**（可以使用 `Object.assign` 去整体替换）。

**使用原则**：

1. 若需要一个基本类型的响应式数据，必须使用 `ref` 。
2. 若需要一个响应式对象，层级不深， `ref` 、 `reactive` 都可以。
3. 若需要一个响应式对象，且层级较深，推荐使用 `reactive` 。

:::

#### toRefs 与 toRef

- 作用：将一个响应式对象中的每一个属性，转换为 `ref` 对象。
- 备注：`toRefs` 与 `toRef` 功能一致，但 `toRefs` 可以批量转换。

```vue
<script lang="ts" setup name="Person">
import { ref, reactive, toRefs, toRef } from "vue";

// reactive 版本
let person = reactive({ name: "张三", age: 18, gender: "男" });
let { name, gender } = toRefs(person);
let age = toRef(person, "age");

// ref 版本：ref 包裹对象时，需通过 .value 访问底层对象
let personRef = ref({ name: "李四", age: 20, gender: "女" });
let { name: nameRef, gender: genderRef } = toRefs(personRef.value);
let ageRef = toRef(personRef.value, "age");
</script>
```

### computed 函数

作用：根据已有数据计算出新数据（和Vue2中的computed作用一致）。

```vue
<template>
  <div class="person">
    姓：<input type="text" v-model="firstName" /> <br />
    名：<input type="text" v-model="lastName" /> <br />
    全名：<span>{{ fullName }}</span> <br />
    <button @click="changeFullName">全名改为：li-si</button>
  </div>
</template>

<script setup lang="ts" name="App">
import { ref, computed } from "vue";

let firstName = ref("zhang");
let lastName = ref("san");

// 计算属性——只读取，不修改
/* let fullName = computed(()=>{
    return firstName.value + '-' + lastName.value
  }) */

// 计算属性——既读取又修改
let fullName = computed({
  // 读取
  get() {
    return firstName.value + "-" + lastName.value;
  },
  // 修改
  set(val) {
    console.log("有人修改了fullName", val);
    firstName.value = val.split("-")[0];
    lastName.value = val.split("-")[1];
  },
});

function changeFullName() {
  fullName.value = "li-si";
}
</script>
```

### watch 函数

**作用：** 监视数据的变化（和 Vue2 中的 watch 作用一致）  
**特点：** Vue3 中的 watch 只能监视以下四种数据：1. ref 定义的数据；2. reactive 定义的数据；3. 函数返回一个值（getter 函数）；4. 一个包含上述内容的数组。

我们在 Vue3 中使用 watch 的时候，通常会遇到以下 5 种情况：

::: info 1.监视ref定义的基本数据类型
监视ref定义的【基本类型】数据：直接写数据名即可，监视的是其value值的改变。

```vue
<script lang="ts" setup name="Person">
import { ref, watch } from "vue";
// 数据
let sum = ref(0);
// 监视，情况一：监视【ref】定义的【基本类型】数据
const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log("sum变化了", newValue, oldValue);
  if (newValue >= 10) {
    stopWatch();
  }
});
</script>
```

:::

::: info 2.监视ref定义的对象数据类型

监视ref定义的【对象类型】数据：直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。

```vue
<script lang="ts" setup name="Person">
import { ref, watch } from "vue";
// 数据
let person = ref({
  name: "张三",
  age: 18,
});
/* 
    监视，情况一：监视【ref】定义的【对象类型】数据，监视的是对象的地址值，若想监视对象内部属性的变化，需要手动开启深度监视
    watch的第一个参数是：被监视的数据
    watch的第二个参数是：监视的回调
    watch的第三个参数是：配置对象（deep、immediate等等.....） 
  */
watch(
  person,
  (newValue, oldValue) => {
    console.log("person变化了", newValue, oldValue);
  },
  { deep: true },
);
</script>
```

::: warning ⚠️ 注意

1. 若修改的是ref定义的对象中的属性，newValue 和 oldValue 都是新值，因为它们是同一个对象。
2. 若修改整个ref定义的对象，newValue 是新值， oldValue 是旧值，因为不是同一个对象了。

:::

::: info 3.监视reactive定义的对象数据类型

监视reactive定义的【对象类型】数据，且默认开启了深度监视。

```vue
<script lang="ts" setup name="Person">
import { reactive, watch } from "vue";
// 数据
let person = reactive({
  name: "张三",
  age: 18,
});
// 监视，情况三：监视【reactive】定义的【对象类型】数据，且默认是开启深度监视的
watch(person, (newValue, oldValue) => {
  console.log("person变化了", newValue, oldValue);
});
</script>
```

:::

::: info 4.监视ref或reactive定义的对象类型数据中的某个属性

监视ref或reactive定义的【对象类型】数据中的某个属性，注意点如下：

1. 若该属性值不是【对象类型】，需要写成函数形式。
2. 若该属性值是依然是【对象类型】，可直接编，也可写成函数，建议写成函数。

结论：监视的要是对象里的属性，那么最好写函数式，注意点：若是对象监视的是地址值，需要关注对象内部，需要手动开启深度监视。

```vue
<script lang="ts" setup name="Person">
import { reactive, watch } from "vue";

// 数据
let person = reactive({
  name: "张三",
  age: 18,
  car: {
    c1: "奔驰",
    c2: "宝马",
  },
});

// 监视，情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
/* watch(()=> person.name,(newValue,oldValue)=>{
    console.log('person.name变化了',newValue,oldValue)
  }) */

// 监视，情况四：监视响应式对象中的某个属性，且该属性是对象类型的，可以直接写，也能写函数，更推荐写函数
watch(
  () => person.car,
  (newValue, oldValue) => {
    console.log("person.car变化了", newValue, oldValue);
  },
  { deep: true },
);
</script>
```

:::

::: info 5.监视上述的多个数据

```vue
<template>
  <script lang="ts" setup name="Person">
    import { reactive, watch } from "vue";

    // 数据
    let person = reactive({
      name: "张三",
      age: 18,
      car: {
        c1: "奔驰",
        c2: "宝马",
      },
    });

    // 监视，情况五：监视上述的多个数据
    watch(
      [() => person.name, person.car],
      (newValue, oldValue) => {
        console.log("person.car变化了", newValue, oldValue);
      },
      { deep: true },
    );
  </script>
</template>
```

:::

### watchEffect 函数

官网：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。

watch对比watchEffect：都能监听响应式数据的变化，不同的是监听数据变化的方式不同

- watch：要明确指出监视的数据
- watchEffect：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。

```vue
<script lang="ts" setup name="Person">
import { ref, watch, watchEffect } from "vue";
// 数据
let temp = ref(0);
let height = ref(0);

// 用watch实现，需要明确的指出要监视：temp、height
watch([temp, height], (value) => {
  // 从value中获取最新的temp值、height值
  const [newTemp, newHeight] = value;
  // 室温达到50℃，或水位达到20cm，立刻联系服务器
  if (newTemp >= 50 || newHeight >= 20) {
    console.log("联系服务器");
  }
});

// 用watchEffect实现，不用
const stopWtach = watchEffect(() => {
  // 室温达到50℃，或水位达到20cm，立刻联系服务器
  if (temp.value >= 50 || height.value >= 20) {
    console.log(document.getElementById("demo")?.innerText);
    console.log("联系服务器");
  }
  // 水温达到100，或水位达到50，取消监视
  if (temp.value === 100 || height.value === 50) {
    console.log("清理了");
    stopWtach();
  }
});
</script>
```

### 标签的 ref 属性

作用：用于注册模板引用。

- 用在普通DOM标签上，获取的是DOM节点。
- 用在组件标签上，获取的是组件实例对象。

**用在普通DOM标签上：**

```vue
<template>
  <div class="person">
    <h1 ref="title1">尚硅谷</h1>
    <button @click="showLog">点我打印内容</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from "vue";

let title1 = ref();

function showLog() {
  // 通过ref获取元素
  console.log(title1.value); // 打印 h1 元素
}
</script>
```

**用在组件标签上：**

```vue
<!-- 父组件App.vue -->
<template>
  <Person ref="ren" />
  <button @click="test">测试</button>
</template>
<script lang="ts" setup name="App">
import Person from "./components/Person.vue";
import { ref } from "vue";
let ren = ref();
function test() {
  console.log(ren.value.name);
  console.log(ren.value.age);
}
</script>

<!-- 子组件Person.vue中要使用defineExpose暴露内容 -->
<script lang="ts" setup name="Person">
import { ref, defineExpose } from "vue";
// 数据
let name = ref("张三");
let age = ref(18);
// 使用defineExpose将组件中的数据交给外部
defineExpose({ name, age });
</script>
```

### props 函数

```vue
<!-- 父组件中代码： -->
<Person :list="persons" />

<!-- Person.vue中代码： -->
<template>
  <div class="person">
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.name }}--{{ item.age }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup name="Person">
import { defineProps } from "vue";
import { type PersonInter } from "@/types";

// 第一种写法：仅接收
// const props = defineProps(['list'])
// 第二种写法：接收+限制类型
// defineProps<{list:Persons}>()
// 第三种写法：接收+限制类型+指定默认值+限制必要性
let props = withDefaults(defineProps<{ list?: Persons }>(), {
  list: () => [{ id: "asdasg01", name: "小猪佩奇", age: 18 }],
});
console.log(props);
</script>
```

### vue3 生命周期

概念：Vue组件实例在创建时要经历一系列的初始化步骤，在此过程中Vue会在合适的时机，调用特定的函数，从而让开发者有机会在特定阶段运行自己的代码，这些特定的函数统称为：**生命周期钩子**。

规律：
生命周期整体分为四个阶段，分别是：创建、挂载、更新、销毁，每个阶段都有两个钩子，一前一后。

**Vue2的生命周期钩子：**

- 创建阶段：beforeCreate、created
- 挂载阶段：beforeMount、mounted
- 更新阶段：beforeUpdate、updated
- 销毁阶段：beforeDestroy、destroyed

**Vue3的生命周期钩子：**

- 创建阶段：setup
- 挂载阶段：onBeforeMount、onMounted
- 更新阶段：onBeforeUpdate、onUpdated
- 卸载阶段：onBeforeUnmount、onUnmounted

### 自定义 Hooks

什么是hooks？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装，类似于vue2.x中的mixin。
自定义hooks的优势：复用代码，让setup中的逻辑更清楚易懂。

```ts
// useSum.ts中内容如下：
import { ref, onMounted } from "vue";
export default function () {
  let sum = ref(0);
  const increment = () => {
    sum.value += 1;
  };
  const decrement = () => {
    sum.value -= 1;
  };
  onMounted(() => {
    increment();
  });
  //向外部暴露数据
  return { sum, increment, decrement };
}
```

```ts
// useDog.ts中内容如下：
import { reactive, onMounted } from "vue";
import axios, { AxiosError } from "axios";
export default function () {
  let dogList = reactive<string[]>([]);
  // 方法
  async function getDog() {
    try {
      // 发请求
      let { data } = await axios.get(
        "https://dog.ceo/api/breed/pembroke/images/random",
      );
      // 维护数据
      dogList.push(data.message);
    } catch (error) {
      // 处理错误
      const err = <AxiosError>error;
      console.log(err.message);
    }
  }
  // 挂载钩子
  onMounted(() => {
    getDog();
  });
  //向外部暴露数据
  return { dogList, getDog };
}
```

```vue
<!-- 组件中具体使用： -->
<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="increment">点我+1</button>
  <button @click="decrement">点我-1</button>
  <hr />
  <img v-for="(u, index) in dogList.urlList" :key="index" :src="u as string" />
  <span v-show="dogList.isLoading">加载中......</span><br />
  <button @click="getDog">再来一只狗</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>
<script setup lang="ts">
import useSum from "./hooks/useSum";
import useDog from "./hooks/useDog";
let { sum, increment, decrement } = useSum();
let { dogList, getDog } = useDog();
</script>
```

## 路由

### 基本使用

```ts
// router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
export default router;
```

```ts
// main.ts
import router from "./router/index";

app.use(router);
app.mount("#app");
```

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <h2 class="title">Vue路由测试</h2>
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/about" active-class="active">关于</RouterLink>
    </div>
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
import { RouterLink, RouterView } from "vue-router";
</script>
```

::: warning ⚠️ 注意

1. 路由组件通常存放在pages 或 views文件夹，一般组件通常存放在components文件夹。（如何区分路由组件和一般组件：路由组件没有`<demoComponent>`这种一般组件形式的使用方式）
2. 通过点击导航，视觉效果上“消失” 了的路由组件，默认是被卸载掉的，需要的时候再去挂载。

:::

::: info 路由器工作模式

1. history模式
   - 优点：URL更加美观，不带有#，更接近传统的网站URL。
   - 缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有404错误。

2. hash模式
   - 优点：兼容性更好，因为不需要服务器端处理路径。
   - 缺点：URL带有#不太美观，且在SEO优化方面相对较差。

```ts
const router = createRouter({
  history: createWebHistory(), //history模式
});
const router = createRouter({
  history: createWebHashHistory(), //hash模式
});
```

:::

::: info `router-link`组件
`to` 的两种写法

```vue
<!-- 第一种：to的字符串写法 -->
<router-link active-class="active" to="/home">主页</router-link>

<!-- 第二种：to的对象写法(path形式,name形式) -->
<router-link active-class="active" :to="{ path: '/home' }">Home</router-link>
<router-link active-class="active" :to="{ name: 'home' }">Home</router-link>
```

浏览器的历史记录有两种写入方式：分别为push和replace。

- push是追加历史记录（默认值）。
- replace是替换当前记录。

```vue
<RouterLink replace .......>News</RouterLink>
```

:::

::: info 编程式导航
解释：脱离`<RouterLink>`标签实现路由跳转
路由组件的两个重要的属性：`$route`和`$router`变成了两个hooks

```ts
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

console.log(route.query);
console.log(route.params);
console.log(router.push);
console.log(router.replace);
```

:::

### 命名、嵌套、重定向

::: info 命名路由

作用：可以简化路由跳转及传参。

给路由规则命名：

```ts
routes: [
  { name: "zhuye", path: "/home", component: Home },
  { name: "xinwen", path: "/news", component: News },
  { name: "guanyu", path: "/about", component: About },
];
```

跳转路由：

```vue
<!--简化前：需要写完整的路径（to的字符串写法） -->
<router-link to="/news/detail">跳转</router-link>
<!--简化后：直接通过名字跳转（to的对象写法配合name属性） -->
<router-link :to="{ name: 'guanyu' }">跳转</router-link>
```

:::

::: info 嵌套路由

1. 配置路由规则，使用children配置项

```ts
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "xinwen",
      path: "/news",
      component: News,
      children: [{ name: "xiang", path: "detail", component: Detail }],
    },
  ],
});
export default router;
```

2. 跳转路由（记得要加完整路径）：

```vue
<router-link to="/news/detail">xxxx</router-link>
<router-link :to="{ path: '/news/detail' }">xxxx</router-link>
```

:::

::: info 重定向

作用：将特定的路径，重新定向到已有路由。

```ts
{
    path:'/',
    redirect:'/about'
}
```

:::

### 路由传参

::: info query 参数

**传递参数：**

```vue
<!-- 跳转并携带query参数（to的字符串写法） -->
<router-link to="/news/detail?a=1&b=2&content=欢迎你">
	跳转
</router-link>
<!-- 跳转并携带query参数（to的对象写法） -->
<RouterLink
  :to="{
    //name:'xiang', //用name也可以跳转
    path: '/news/detail',
    query: {
      id: news.id,
      title: news.title,
      content: news.content,
    },
  }"
>
  {{news.title}}
</RouterLink>
```

**接收参数：**

```ts
import { useRoute } from "vue-router";
const route = useRoute();
// 打印query参数
console.log(route.query);
```

:::

::: info params 参数

**传递参数：**

```vue
<!-- 跳转并携带params参数（to的字符串写法） -->
<RouterLink :to="`/news/detail/001/新闻001/内容001`">{{news.title}}</RouterLink>
<!-- 跳转并携带params参数（to的对象写法） -->
<RouterLink
  :to="{
    name: 'xiang', //用name跳转
    params: {
      id: news.id,
      title: news.title,
      content: news.title,
    },
  }"
>
  {{news.title}}
</RouterLink>
```

**接收参数：**

```ts
import { useRoute } from "vue-router";
const route = useRoute();
// 打印params参数
console.log(route.params);
```

::: warning ⚠️ 注意

- **1**：传递 `params` 参数时，若使用 `to` 的对象写法，必须使用 `name` 配置项，不能用 `path`。
- **2**：传递 `params` 参数时，需要提前在规则中占位。
  ```js
  {
      name: 'xiang',
      path: 'detail/:id/:title/:content', // 绿色框选部分
      component: Detail
  }
  ```
- **3**：传递 `params` 参数时，如果参数是可选的，需要在占位时标注 `?`。
  ```js
  {
      name: 'xiang',
      path: 'detail/:id/:title/:content?', // 蓝色高亮部分
      component: Detail
  }
  ```

:::

### 路由规则的 props 配置

作用：让路由组件更方便的收到参数（可以将路由参数作为props传给组件）

```js
{
  name:'xiang',
  path:'detail/:id/:title/:content',
  component:Detail,
  // props的对象写法，作用：把对象中的每一组key-value作为props传给Detail组件
  props:{a:1,b:2,c:3},

  // props的布尔值写法，作用：把收到了每一组params参数，作为props传给Detail组件
  props:true,

  // props的函数写法，作用：把返回的对象中每一组key-value作为props传给Detail组件
  props(route){
    return route.query
  }
}
```

组件中的写法：

```vue
<script setup lang="ts" name="About">
defineProps(["a", "b", "c"]);
</script>
```

## pinia 状态管理库

### 搭建 pinia 环境

第一步：安装 `npm install pinia`

第二步：操作src/main.ts

```ts
import { createApp } from "vue";
import App from "./App.vue";

// 引入createPinia，用于创建pinia
import { createPinia } from "pinia";

// 创建pinia
const pinia = createPinia();
const app = createApp(App);

// 使用插件
app.use(pinia);
app.mount("#app");
```

### 存储+读取数据

Store是一个保存`状态和业务逻辑`的实体，每个组件都可以读取、写入它。
它有三个概念：`state`、`getter`、`action`，相当于组件中的： `data`、 `computed` 和 `methods`。

- 具体编码：src/store/count.ts

```ts
// 引入defineStore用于创建store
import { defineStore } from "pinia";

// 定义并暴露一个store
export const useCountStore = defineStore("count", {
  // 动作
  actions: {},
  // 状态
  state() {
    return {
      sum: 6,
    };
  },
  // 计算
  getters: {
    doubleSum(state) {
      return state.sum * 2;
    },
  },
});
```

- 具体编码：src/store/talk.ts

```ts
// 引入defineStore用于创建store
import { defineStore } from "pinia";

// 定义并暴露一个store
export const useTalkStore = defineStore("talk", {
  // 动作
  actions: {},
  // 状态
  state() {
    return {
      talkList: [
        { id: "yuysada01", content: "你今天有点怪，哪里怪？怪好看的！" },
      ],
    };
  },
  // 计算
  getters: {},
});
```

- 组件中使用state中的数据

```vue
<template>
  <h2>当前求和为: {{ sumStore.sum }}</h2>
  <ul>
    <li v-for="talk in talkStore.talkList" :key="talk.id">
      {{ talk.content }}
    </li>
  </ul>
</template>

<script setup lang="ts" name="Count">
// 引入对应的useXxxxxStore
import { useSumStore } from "@/store/sum";
import { useTalkStore } from "@/store/talk";

// 调用useXxxxxStore得到对应的store
const sumStore = useSumStore();
const talkStore = useTalkStore();
</script>
```

### 修改数据的三种方式

- 第一种修改方式：直接修改

```js
countStore.sum = 666;
```

- 第二种修改方式：批量修改

```js
countStore.$patch({
  sum: 999,
  school: "atguigu",
});
```

- 第三种修改方式：借助 action 修改（action 中可以编写一些业务逻辑）

**Store 定义部分：**

```js
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  actions: {
    //加
    increment(value: number) {
      if (this.sum < 10) {
        //操作countStore中的sum
        this.sum += value
      }
    },
    //减
    decrement(value: number) {
      if (this.sum > 1) {
        this.sum -= value
      }
    }
  }
})
```

**组件中调用 action 即可：**

```js
// 使用countStore
const countStore = useCountStore();

// 调用对应action
countStore.increment(n.value);
```

### pinia API

#### storeToRefs

1. **storeToRefs 的作用**：将 store 中的 state 和 getters 转换为 ref 对象。这样做是为了在解构（Destructuring）后，变量依然保持响应式。如果直接使用 ES6 解构（如 `const { sum } = store`），变量会失去响应式连接，变成普通的静态值。
2. **与 Vue 原生 toRefs 的区别**：
   - **Pinia 的 storeToRefs**：智能过滤。它只会转换 state 和 getters，自动跳过 actions（方法）。因为方法不需要被转换为 ref，直接调用即可。
   - **Vue 的 toRefs**：无差别转换。它会将对象上的所有属性（包括 actions 方法）都转换为 ref，这通常不是我们想要的结果。

```html
<template>
  <div class="count">
    <h2>当前求和为：{{ sum }}</h2>
  </div>
</template>

<script setup lang="ts" name="Count">
  import { useCountStore } from "@/store/count";
  /* 引入storeToRefs */
  import { storeToRefs } from "pinia";

  /* 得到countStore */
  const countStore = useCountStore();
  /* 使用storeToRefs转换countStore，随后解构 */
  const { sum } = storeToRefs(countStore);
</script>
```

#### $subscribe

**概念**：通过 store 的 `$subscribe()` 方法侦听 state 及其变化。

```js
talkStore.$subscribe((mutate, state) => {
  console.log("LoveTalk", mutate, state);
  localStorage.setItem("talk", JSON.stringify(talkList.value));
});
```

### store 组合式写法

组合式写法使用 `defineStore` 的第二个参数为函数（类似 `setup()`），内部使用 `ref`/`reactive` 定义 state、`computed` 定义 getters、普通函数定义 actions，最后通过 `return` 暴露。

**countStore 组合式写法：**

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCountStore = defineStore('count', () => {
  // state：用 ref/reactive 定义
  const sum = ref(0)
  const school = ref('bilibili')

  // getters：用 computed 定义
  const bigSum = computed(() => sum.value * 10)

  // actions：用普通函数定义
  const increment = (value: number) => {
    if (sum.value < 10) {
      sum.value += value
    }
  }
  const decrement = (value: number) => {
    if (sum.value > 1) {
      sum.value -= value
    }
  }

  // 暴露给外部使用
  return { sum, school, bigSum, increment, decrement }
})
```

**选项式写法 vs 组合式写法对比：**

| 特性     | 选项式写法          | 组合式写法              |
| -------- | ------------------- | ----------------------- |
| state    | `state: () => ({})` | `ref()` / `reactive()`  |
| getters  | `getters: {}`       | `computed()`            |
| actions  | `actions: {}`       | 普通函数                |
| 代码组织 | 按选项分类          | 按逻辑分组              |
| 适用场景 | 简单 store          | 复杂逻辑、跨 store 调用 |

**选择建议：**

- 简单场景：选项式写法更直观，结构清晰
- 复杂场景：组合式写法更灵活，支持逻辑复用、条件定义

## 组件通信

| 组件关系               | 传递方式                                                     |
| :--------------------- | :----------------------------------------------------------- |
| **父传子**             | 1. `props`2. `v-model`3. `$refs`4. 默认插槽、具名插槽        |
| **子传父**             | 1. `props`2. 自定义事件3. `v-model`4. `$parent`5. 作用域插槽 |
| **祖传孙、孙传祖**     | 1. `$attrs`2. `provide`、`inject`                            |
| **兄弟间、任意组件间** | 1. `mitt`2. `pinia`                                          |

### props

**概述：** props 是使用频率最高的一种通信方式，常用与：父 ↔ 子。

- 若 **父传子**：属性值是**非函数**。
- 若 **子传父**：属性值是**函数**。

**父组件编码：**

```vue
<template>
  <div class="father">
    <h3>父组件，</h3>
    <h4>我的车：{{ car }}</h4>
    <h4>儿子给的玩具：{{ toy }}</h4>
    <Child :car="car" :getToy="getToy" />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref } from "vue";
// 数据
const car = ref("奔驰");
const toy = ref();
// 方法
function getToy(value: string) {
  toy.value = value;
}
</script>
```

**子组件编码：**

```vue
<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>我的玩具：{{ toy }}</h4>
    <h4>父给我的车：{{ car }}</h4>
    <button @click="getToy(toy)">玩具给父亲</button>
  </div>
</template>

<script setup lang="ts" name="Child">
import { ref } from "vue";
const toy = ref("奥特曼");

defineProps(["car", "getToy"]);
</script>
```

### 自定义事件

**概述：** 自定义事件常用于：子 => 父。  
注意区分：原生事件、自定义事件。

**原生事件：**

- 事件名是特定的（click、mosueenter 等等）
- 事件对象 $event: 是包含事件相关信息的对象（pageX、pageY、target、keyCode）

**自定义事件：**

- 事件名是任意名称，推荐写法：xxx-xxx
- 事件对象 $event: 是调用 emit 时所提供的数据，可以是任意类型!!!

**父组件代码示例：**

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <h4 v-show="toy">子给的玩具：{{ toy }}</h4>
    <!-- 给子组件Child绑定事件 -->
    <Child @send-toy="saveToy" />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref } from "vue";
// 数据
let toy = ref("");

function saveToy(value: string) {
  console.log("saveToy", value);
  toy.value = value;
}
</script>
```

**子组件代码示例：**

```vue
<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具：{{ toy }}</h4>
    <button @click="emit('send-toy', toy)">测试</button>
  </div>
</template>

<script setup lang="ts" name="Child">
import { ref } from "vue";
// 数据
let toy = ref("奥特曼");
// 声明事件
const emit = defineEmits(["send-toy"]);
</script>
```

### mitt

**概述：** 与消息订阅与发布（pubsub）功能类似，可以实现任意组件间通信。

**安装mitt**

```bash
npm i mitt
```

**使用步骤：**

1. 创建 mitt 实例（单独文件导出，供全局共享）

```js
// utils/mitt.ts
import mitt from "mitt";
const emitter = mitt();
export default emitter;
```

2. 发送事件（发布消息）

```vue
<!-- 发送组件 -->
<script setup lang="ts">
import emitter from "@/utils/mitt";

function sendMsg() {
  emitter.emit("send-toy", { name: "玩具车", price: 100 });
}
</script>
```

3. 接收事件（订阅消息），组件卸载时需清理监听

```vue
<!-- 接收组件 -->
<script setup lang="ts">
import emitter from "@/utils/mitt";
import { onUnmounted } from "vue";

const handleReceive = (data: { name: string; price: number }) => {
  console.log("收到玩具:", data);
};

emitter.on("send-toy", handleReceive);

onUnmounted(() => {
  emitter.off("send-toy", handleReceive);
});
</script>
```

**常用方法：**

| 方法                           | 说明         |
| ------------------------------ | ------------ |
| `emitter.emit('事件名', 数据)` | 发送事件     |
| `emitter.on('事件名', 回调)`   | 监听事件     |
| `emitter.off('事件名', 回调)`  | 取消监听     |
| `emitter.all.clear()`          | 清除所有监听 |

### v-model

> **概述**：实现 **父 ↔ 子** 之间相互通信。

1. 前序知识 —— v-model 的本质

```html
<!-- 使用 v-model 指令 -->
<input type="text" v-model="userName" />
<!-- v-model 的本质是下面这行代码 -->
<input
  type="text"
  :value="userName"
  @input="userName = (<HTMLInputElement>$event.target).value"
/>
```

---

2. 组件标签上的 v-model 的本质：`:modelValue` ＋ `update:modelValue` 事件

```vue
<!-- 组件标签上使用 v-model 指令 -->
<CrisInput v-model="userName" />
<!-- 组件标签上 v-model 的本质 -->
<CrisInput :modelValue="userName" @update:model-value="userName = $event" />
```

CrisInput 组件中：

```vue
<template>
  <div class="box">
    <!-- 将接收的 value 值赋给 input 元素的 value 属性，目的是：为了呈现数据 -->
    <!-- 给 input 元素绑定原生 input 事件，触发 input 事件时，进而触发 update:model-value 事件 -->
    <input
      type="text"
      :value="modelValue"
      @input="emit('update:model-value', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts" name="CrisInput">
// 接收 props
defineProps(["modelValue"]);
// 声明事件
const emit = defineEmits(["update:model-value"]);
</script>
```

---

3. 也可以更换 value，例如改成 abc

```vue
<!-- 也可以更换 value，例如改成 abc -->
<CrisInput v-model:abc="userName" />
<!-- 上面代码的本质如下 -->
<CrisInput :abc="userName" @update:abc="userName = $event" />
```

CrisInput 组件中：

```vue
<template>
  <div class="box">
    <input
      type="text"
      :value="abc"
      @input="emit('update:abc', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts" name="CrisInput">
// 接收 props
defineProps(["abc"]);
// 声明事件
const emit = defineEmits(["update:abc"]);
</script>
```

---

4. 多个 v-model

如果 value 可以更换，那么就可以在组件标签上**多次使用 v-model**：

```vue
<CrisInput v-model:abc="userName" v-model:xyz="password" />
```

### $attrs

- **概述**：`$attrs` 用于实现当前组件的父组件，向当前组件的子组件通信（**祖→孙**）。
- **具体说明**：`$attrs` 是一个对象，包含所有父组件传入的标签属性。
- **注意**：`$attrs` 会自动排除 `props` 中声明的属性（可以认为声明过的 `props` 被子组件自己“消费”了）。

::: info 父组件代码

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <Child :a="a" v-bind="{ x: 100, y: 200 }" :updateA="updateA" />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref } from "vue";
let a = ref(1);

function updateA(value) {
  a.value = value;
}
</script>
```

:::
::: info 子组件代码

```vue
<template>
  <div class="child">
    <h3>子组件</h3>
    <GrandChild v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts" name="Child">
import GrandChild from "./GrandChild.vue";
</script>
```

:::
::: info 孙组件代码

```vue
<template>
  <div class="grand-child">
    <h3>孙组件</h3>
    <h4>a: {{ a }}</h4>
    <button @click="updateA(666)">点我更新A</button>
  </div>
</template>

<script setup lang="ts" name="GrandChild">
defineProps(["a", "x", "y", "updateA"]);
</script>
```

:::

### $refs、$parent

1. **概述**：
   - `$refs` 用于：**父→子**。
   - `$parent` 用于：**子→父**。
2. **原理如下**：

| 属性      | 说明                                                       |
| :-------- | :--------------------------------------------------------- |
| `$refs`   | 值为对象，包含所有被 `ref` 属性标识的 DOM 元素或组件实例。 |
| `$parent` | 值为对象，当前组件的父组件实例对象。                       |

vue3 中需要结合宏函数 `defineExpose` 来实现数据的抛出

```html
<script setup lang="ts" name="Child1">
  import { ref } from "vue";
  // 数据
  let toy = ref("奥特曼");
  let book = ref(3);
  // 把数据交给外部
  defineExpose({ toy, book });
</script>
```

### provide、inject

概述：实现**祖孙组件**（跨层级）直接通信，无需逐层传递 `props`。

具体使用：

1. **祖先组件**：通过 `provide` 配置向后代组件**提供**数据。
2. **后代组件**：通过 `inject` 配置**声明接收**数据。

::: info 编码示例

【第一步】父组件：使用 `provide` 提供数据

> **注意**：子组件（中间层）中**不用编写任何东西**，不会受到任何打扰。

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <Child />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref, reactive, provide } from "vue";

// 数据
let money = ref(100);
let car = reactive({
  brand: "奔驰",
  price: 100,
});
function updateMoney(value: number) {
  money.value += value;
}

// 提供数据
provide("moneyContext", { money, updateMoney });
provide("car", car);
</script>
```

【第二步】孙组件：使用 `inject` 接收数据

```vue
<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
    <h4>资产：{{ money }}</h4>
    <h4>汽车：{{ car }}</h4>
    <button @click="updateMoney(6)">点我</button>
  </div>
</template>

<script setup lang="ts" name="GrandChild">
import { inject } from "vue";

// 注入数据（带默认值）
let { money, updateMoney } = inject("moneyContext", {
  money: 0,
  updateMoney: (x: number) => {},
});

let car = inject("car");
</script>
```

:::

## 插槽

### 默认插槽

子组件预留位置，父组件传入任意内容。

**子组件 Child.vue：**

```vue
<template>
  <div class="child">
    <slot></slot>
  </div>
</template>
```

**父组件 Father.vue：**

```vue
<template>
  <Child>
    <p>我是父组件传入的内容</p>
  </Child>
</template>
```

### 具名插槽

多个插槽按名称区分，父组件按需填充。

**子组件 Child.vue：**

```vue
<template>
  <div class="child">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

**父组件 Father.vue：**

```vue
<template>
  <Child>
    <template #header>
      <h1>页头</h1>
    </template>
    <p>默认内容</p>
    <template v-slot:footer>
      <p>页脚</p>
    </template>
  </Child>
</template>
```

### 作用域插槽

子组件向父组件传递数据，父组件决定如何渲染。

**子组件 Child.vue：**

```vue
<template>
  <div class="child">
    <slot :user="user"></slot>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const user = reactive({ name: "张三", age: 18 });
</script>
```

**父组件 Father.vue：**

```vue
<template>
  <Child #default="{ user }">
    <p>{{ user.name }} - {{ user.age }}</p>
  </Child>
  <!-- <Child v-slot="params">
    <p>{{ params.user.name }} - {{ params.user.age }}</p>
  </Child>
  <Child v-slot:default="params">
    <p>{{ params.user.name }} - {{ params.user.age }}</p>
  </Child> -->
</template>
```

## 其他 API

### shallowRef 与 shallowReactive

::: info shallowRef

**作用：** 创建一个响应式数据，但只对顶层属性进行响应式处理。  
**用法：**

```js
let myVar = shallowRef(initialValue);
```

**特点：** 只跟踪引用值的变化，不关心值内部的属性变化。简单来说，只能监听 `myVar.value = ?`，不能监听 `myVar.value.xxx = ?`

:::
::: info shallowReactive

**作用：** 创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式的，对象内部的嵌套属性则不会变成响应式的。  
**用法：**

```js
const myObj = shallowReactive({ ... });
```

**特点：** 对象的顶层属性是响应式的，但嵌套对象的属性不是。

:::

**总结：**  
通过使用 `shallowRef()` 和 `shallowReactive()` 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得更快，可提升性能。

### readonly 与 shallowReadonly

::: info readonly

**作用：** 用于创建一个对象的深只读副本。  
**用法：**

```js
const original = reactive({ ... });
const readOnlyCopy = readonly(original);
```

**特点：**

- 对象的所有嵌套属性都将变为只读。
- 任何尝试修改这个对象的操作都会被阻止（在开发模式下，还会在控制台中发出警告）。
- `readOnlyCopy` 与 `original` 之间的关联关系依然存在。

**应用场景：**

- 创建不可变的状态快照。
- 保护全局状态或配置不被修改。

:::

::: info shallowReadonly

**作用：** 与 `readonly` 类似，但只作用于对象的顶层属性。  
**用法：**

```js
const original = reactive({ ... });
const shallowReadOnlyCopy = shallowReadonly(original);
```

**特点：**

- 只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的。

**应用场景：**

- 适用于只需保护对象顶层属性的场景。

:::

### toRaw 与 markRaw

::: info toRaw

**作用：** 用于获取一个响应式对象的原始对象。`toRaw` 返回的对象不再是响应式的，不会触发视图更新。  
**官网描述：** 这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。**不建议保存对原始对象的持久引用，请谨慎使用**。  
**何时使用？** —— 在需要将响应式对象传递给非 Vue 的库或外部系统时，使用 `toRaw` 可以确保它们收到的是普通对象。  
**具体编码：**

```js
import { reactive, toRaw, markRaw, isReactive } from "vue";

// 响应式对象
let person = reactive({ name: "tony", age: 18 });
// 原始对象
let rawPerson = toRaw(person);

console.log(isReactive(person));
console.log(isReactive(rawPerson));
```

:::
::: info markRaw

**作用：** 标记一个对象，使其永远不会变成响应式的。  
例如使用 `mockjs` 时，为了防止误把 `mockjs` 变为响应式对象，可以使用 `markRaw` 去标记 `mockjs`。  
**编码：**

```js
/* markRaw */
let citys = markRaw([
  { id: "asdda01", name: "北京" },
  { id: "asdda02", name: "上海" },
]);

// 根据原始对象citys去创建响应式对象citys2 — 创建失败，因为citys被markRaw标记了
let citys2 = reactive(citys);
```

:::

### customRef

**作用：** 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行逻辑控制。  
**实现防抖效果 (useSumRef.ts)**

```ts
import { customRef } from "vue";

export default function (initValue: string, delay: number) {
  let msg = customRef((track, trigger) => {
    let timer: number;

    return {
      get() {
        track(); // 告诉 Vue 数据 msg 很重要，要对 msg 持续关注，一旦变化就更新
        return initValue;
      },
      set(value) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          initValue = value;
          trigger(); // 通知 Vue 数据 msg 变化了
        }, delay);
      },
    };
  });

  return { msg };
}
```

## Vue3 新组件

### 【Teleport】

### 【Suspense】

### 【全局 API 转移到应用对象】

### 【其他】
