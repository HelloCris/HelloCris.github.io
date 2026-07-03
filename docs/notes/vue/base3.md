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

### computed 函数

### watch 函数

### watchEffect 函数

### 标签的 ref 属性

### props 函数

### vue3 生命周期

### 自定义 Hooks

## 路由

## pinia 状态管理库

## 组件通信

## 插槽

## 其他 API

## Vue3 新组件
