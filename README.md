# [CrisWiki](https://hellocris.github.io/)

> 在线访问：[CrisWiki](https://hellocris.github.io/)

> vitepress项目，快速搭建笔记文档网站

## 项目结构

```bash
├── .github/          # Github Actions 配置文件
├── .vscode/          # VS Code配置文件
├── docs/             # 文档源码目录
│   ├── .vitepress/   # VitePress配置目录
│   │   ├── config.mts         # 主配置文件
│   │   ├── searchConfig.mts   # 搜索配置
│   │   └── sidebarConfig.mts  # 侧边栏配置
│   ├── growth/       # 成长相关文档
│   ├── interview/    # 面试记录
│   ├── notes/        # 技术笔记
│   ├── profile/      # 个人信息说明
│   ├── projects/     # 项目相关文档
│   ├── public/       # 静态资源
│   └── index.md      # 首页
├── .gitignore        # Git忽略文件
├── README.md         # 项目说明
├── package-lock.json # npm依赖锁定文件
└── package.json      # npm配置文件
```

## 快速开始

### 环境要求

- node >= 20.0.0
- npm >= 10.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run docs:dev
```

### 打包 & 预览

打包项目：

```bash
npm run docs:build
```

预览打包后的项目：

```bash
npm run docs:preview
```
