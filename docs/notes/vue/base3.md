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

## Vue3 核心语法

## 路由

## pinia 状态管理库

## 组件通信

## 插槽

## 其他 API

## Vue3 新组件
