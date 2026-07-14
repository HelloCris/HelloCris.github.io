# Electron 基础

> Electron 更新非常快，当前笔记是基于V11.2.0版本

## Electron 基本认知

### 概述

![electronPrinciple](asset/electronPrinciple.png)

**Electron 的技术架构**由 Chromium、Node.js、Native APIs 三部分构成，分别承担不同功能：

- Chromium：支持最新特性的浏览器
- Node.js：javascript 运行时，可实现文件读写等
- Native APIs：提供统一的原生界面能力

**主进程**

- 可以看做是 package.json 中 main 属性对应的文件
- 一个应用只会有一个主进程
- 只有主进程可以进行 GUI 的 API 操作

**渲染进程**

- Windows 中展示的界面通过渲染进程表现
- 一个应用可以有多个渲染进程

### 基本环境搭建

```js
// 用于控制应用生命周期和创建原生浏览器窗口的模块
const { app, BrowserWindow } = require("electron");
const path = require("path");

// 01 创建一个窗口
// 02 让窗口加载了一个界面，这个界面就是用 web 技术实现，这个界面是运行在渲染进程中的
function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // 加载应用的 index.html 文件
  mainWindow.loadFile("index.html");
  // 打开开发者工具
  // mainWindow.webContents.openDevTools()
}

// 当 Electron 完成初始化并准备好创建浏览器窗口时，会调用此方法
// 某些 API 只能在此事件发生后使用
app.whenReady().then(() => {
  createWindow(); // 主窗口已经渲染出来了

  // 监听 'activate' 事件（主要用于 macOS）
  app.on("activate", function () {
    // 在 macOS 上，当点击 Dock 图标且没有其他窗口打开时，通常会重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口都关闭时退出应用，macOS 除外
// 在 macOS 上，应用及其菜单栏通常会保持活跃状态，直到用户通过 Cmd + Q 显式退出
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
```

::: warning ⚠️ 注意
国内网络解决 npm 安装 electron 失败的问题

```bash
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install --save-dev electron
```

:::

### 生命周期事件

## 窗口

### 窗口尺寸

### 窗口标题及主/渲染进程环境

### 自定义窗口

### 子窗口/模态窗口

## 菜单

### 自定义菜单

### 菜单角色及类型、自定义菜单项

### 动态创建菜单

### 右键菜单

## 主/渲染进程通信

### 主进程与渲染进程通信

#### 渲染进程发送消息到主进程

#### 主进程发送消息到渲染进程

### 渲染进程间通信

#### localStorage 方式

#### 主进程方式

## 其他常用功能模块

### dialog 模块

### shell 模块

### 消息通知

### 快捷键注册

### 剪切板操作

## 打包安装包

### electron-builder

### Electron Forge

## 问题答疑

### 解决内容安全策略 CSP
