# 工程化问题

## SPA & MPA

| 比较维度          | 单页面应用 (SPA)                                                       | 多页面应用 (MPA)                             |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------- |
| 组成              | 一个外壳页面和多个页面片段组成                                         | 多个完整页面构成                             |
| 资源共用(css,js)  | 共用，只需在外壳部分加载                                               | 不共用，每个页面都需要加载                   |
| 刷新方式          | 页面局部刷新或更改                                                     | 整页刷新                                     |
| url 模式          | a.com/#/pageone<br>a.com/#/pagetwo                                     | a.com/pageone.html<br>a.com/pagetwo.html     |
| 用户体验          | 页面片段间的切换快，用户体验良好                                       | 页面切换加载缓慢，流畅度不够，用户体验比较差 |
| 转场动画          | 容易实现                                                               | 无法实现                                     |
| 数据传递          | 容易                                                                   | 依赖 url传参，或者cookie、localStorage等     |
| 搜索引擎优化(SEO) | 需要单独方案、实现较为困难、不利于SEO检索，可利用服务器端渲染(SSR)优化 | 实现方法简易                                 |
| 试用范围          | 高要求的体验度、追求界面流畅的应用                                     | 适用于追求高度支持搜索引擎的应用             |
| 开发成本          | 较高，常需借助专业的框架                                               | 较低，但页面重复代码多                       |
| 维护成本          | 相对容易                                                               | 相对复杂                                     |

## Monorepo

**Monorepo（单仓库）**：把多个相关项目 / 包（package）放在同一个 Git 仓库里进行统一管理的代码组织方式，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。  
**Multirepo（多仓库）**：每个项目或包拥有独立的仓库、独立的依赖、独立的 CI/CD 流程。

```
monorepo/                         multirepo/
├── package.json                    repo-a/
├── pnpm-workspace.yaml               ├── package.json
├── packages/                       repo-b/
│   ├── @scope/ui                       ├── package.json
│   ├── @scope/utils                  repo-c/
│   └── @scope/app                      └── package.json
└── apps/
    ├── docs
    └── web
```

### Monorepo vs Multirepo

| 对比维度 | Monorepo                                                    | Multirepo                                  |
| :------- | :---------------------------------------------------------- | :----------------------------------------- |
| 代码共享 | 同仓库，代码可直接引用，复用成本低                          | 跨仓库，需通过 npm 包或 git submodule 共享 |
| 依赖管理 | 统一 lockfile，版本一致性更好                               | 各仓库独立维护，易出现版本不一致           |
| 重构成本 | 一处改动可同步改多个包，原子提交                            | 需跨仓库发 PR、升级包、协调版本            |
| 一致性   | 统一的代码规范、工具链、CI/CD                               | 各仓库独立配置，容易碎片化                 |
| 可见性   | 全仓库代码可见，便于全局搜索与链路追踪                      | 仅能看到当前仓库，跨项目排查困难           |
| 权限控制 | 粒度较粗，难以对单包做精细权限                              | 天然按仓库隔离权限                         |
| 构建性能 | 包多后构建/测试体积大，需要任务调度与缓存（Turborepo / Nx） | 单个仓库规模小，构建相对轻量               |
| 适用场景 | 多包协作、组件库、工具链、中大型团队                        | 包之间耦合低、独立演进、开源独立项目       |

### 核心机制

#### Workspace 链接

以 `pnpm` 为例，声明工作区后，本地包之间通过 `workspace:*` 协议直接引用，避免反复发布到 npm。

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
```

```json
// packages/app/package.json
{
  "name": "@demo/app",
  "dependencies": {
    "@demo/ui": "workspace:*",
    "@demo/utils": "workspace:^"
  }
}
```

> `workspace:*`：永远使用当前仓库里的最新代码；`workspace:^`：发布时会替换为对应包的 semver 版本。

#### 任务调度与缓存

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

执行 `turbo run build` 时：

1. 先按依赖图构建被依赖的包（`^build`）。
2. 任务结果命中 hash 时直接读缓存，跳过重复构建。
3. 无改动的包不再执行，提高 CI 效率。

#### 版本与发布策略

| 策略            | 说明                   | 适用场景                   |
| :-------------- | :--------------------- | :------------------------- |
| **Fixed**       | 所有包共用同一个版本号 | 包之间强耦合，如 Angular   |
| **Independent** | 每个包独立发版         | 包之间可独立演进，如 Babel |

现代方案常用 **Changesets**：

- 开发时为每个改动添加 `.changeset/*.md` 描述影响。
- 合并后统一生成版本变更、更新 changelog、批量 publish。

```bash
# 添加 changeset
npx changeset
# 消费 changeset，生成 changelog + 版本号
npx changeset version
# 发布
npx changeset publish
```

### 注意事项

::: info Monorepo 踩坑

- 幽灵依赖

**问题**：`npm/yarn` 安装依赖时，存在依赖提升，某个项目使用的依赖，并没有在其 `package.json` 中声明，也可以直接使用，这种现象称之为“幽灵依赖”；随着项目迭代，这个依赖不再被其他项目使用，不再被安装，使用幽灵依赖的项目，会因为无法找到依赖而报错。

**方案**：基于 `npm/yarn` 的 Monorepo 方案，依然存在“幽灵依赖”问题，我们可以通过 `pnpm` 彻底解决这个问题。

- 依赖安装耗时长

**问题**：MonoRepo 中每个项目都有自己的 `package.json` 依赖列表，随着 MonoRepo 中依赖总数的增长，每次 `install` 时，耗时会较长。

**方案**：相同版本依赖提升到 Monorepo 根目录下，减少冗余依赖安装；使用 `pnpm` 按需安装及依赖缓存。

- 构建打包耗时长

**问题**：多个项目构建任务存在依赖时，往往是串行构建或全量构建，导致构建时间较长。

**方案**：增量构建，而非全量构建；也可以将串行构建，优化成并行构建。

:::

| 工具                | 定位                 | 核心能力                                             |
| :------------------ | :------------------- | :--------------------------------------------------- |
| **pnpm workspaces** | 包管理 + 工作区      | 软链接 + hard link、节省磁盘、原生 `workspace:` 协议 |
| **Yarn workspaces** | 包管理 + 工作区      | 统一安装、提升（hoist）依赖、PnP 模式                |
| **npm workspaces**  | 原生工作区           | 无需额外工具，但功能较弱                             |
| **Lerna**           | 版本 / 发布工具      | fixed / independent 版本策略、批量 publish           |
| **Turborepo**       | 任务调度 + 构建缓存  | pipeline 定义任务依赖、本地/远程缓存、并行执行       |
| **Nx**              | 一体化 Monorepo 工具 | 依赖图分析、任务编排、代码生成、插件生态             |
| **Rush / Bazel**    | 大型企业级方案       | 强依赖图、远端构建、沙箱执行                         |
