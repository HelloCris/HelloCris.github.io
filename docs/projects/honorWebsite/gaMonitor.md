# GA实现JS监控告警专项

## 前端监控流程

::: info 一句话概括

官网页面发生 JS 错误 → 错误被打包成 GA 的 `exception` 事件上报 → 定时任务用服务账号调用 `analytics.googleapis.com` 把日志拉回本地 → 按规则判定是否告警 → 命中则走 SMTP 发邮件，未命中则静默。

整条链路横跨 **浏览器 / Google Analytics / Google Cloud / 自有定时任务** 四层，核心可以概括为一句话：**采集在 GA，判定在自有服务**。

:::

这一节用两张图从两个角度看同一条链路，缺一不可：

| 视图 | 回答的问题 | 适合谁看 |
| ---- | ---------- | -------- |
| 视图一 · 泳道流程 | 谁在什么时候做什么、判断在哪一步分叉 | 想知道「出问题找谁」的人 |
| 视图二 · 组件接口 | 链路里有哪些实体、走哪个 API、落到哪个域名 | 要动手实现或排障的人 |

### 视图一：泳道流程（谁在什么时候做什么）

![前端监控泳道流程图](asset/ga-monitor-flow.svg)

图里的四条泳道就是四个责任方，每个泳道只干一件事，彼此通过「上报」和「查询」两种动作串起来：

| 泳道                  | 承担方                                   | 职责                                       | 产出                                 |
| --------------------- | ---------------------------------------- | ------------------------------------------ | ------------------------------------ |
| 官网页面              | 浏览器 + `gtag.js`                       | 捕获错误、组装事件、发起上报               | `exception` 事件                     |
| Google Analytics      | GA4 媒体资源（web tool + GA 数据库）     | 接收上报、落库、提供可视化查看             | 可被查询的日志数据                   |
| Google Cloud          | Google IAM + `analytics.googleapis.com`  | 校验调用方身份、对外提供数据查询入口       | 鉴权通过后的 API 响应                |
| 前端监控定时任务      | 自有服务（定时调度）                     | 申请鉴权、拉取日志、规则判定、发送告警     | 邮件告警 / 无操作                    |

### 视图二：组件与接口（谁调谁）

泳道图讲的是「流程」，但落到实现还要知道每一跳的**具体实体和端点**——服务账号长什么样、凭据怎么用、邮件从哪个域出去。这张组件图补的就是这一层：

![前端监控组件与接口视图](asset/ga-monitor-architecture.svg)

图里的 ①–⑥ 是**调用顺序**（与下文四个阶段的编号不是同一套），逐跳对应到 GA4 时代的实际对象：

| 图中元素                                   | GA4 对应物                                             | 说明                                                                 |
| ------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------------------- |
| `GATC`（跟踪代码框）                       | `gtag.js`                                              | UA 时代叫 GATC（`ga.js` / `analytics.js`），GA4 统一用 `gtag.js` 或 GTM |
| ① `Ajax Link`                              | 浏览器向 GA 采集端点发请求（`/g/collect`）             | 走的是打点请求，不是业务接口，所以不受跨域策略约束                   |
| Google Analytics Web Tools（Filter/Notify/Share） | GA4 控制台：报告 / 探索 / 管理                  | 原图的三个按钮可类比：筛选 → 细分与过滤、通知 → 自定义洞察、分享 → 共享与导出 |
| `Analytics Reports` → `admin`              | GA4 报告页 → 订阅邮件 / 导出                            | 这是「人看数据」的通道，和告警通道是两条独立路径                     |
| ② `Internal flow` → `Google Database`      | GA 属性内部的落库                                       | 上报数据先入 GA 的存储，这一步不可干预；需要原始明细可另开 BigQuery 导出 |
| ③ `Management API`                         | Analytics Admin API（`analyticsadmin.googleapis.com`）  | 用于管理媒体资源、自定义维度等配置面，不是取数接口                   |
| `Google Cloud` / `iam.gserviceaccount.com` | 服务账号                                               | 机器身份，`client_email` 形如 `xxx@项目ID.iam.gserviceaccount.com`     |
| ④ `private_key`                            | 服务账号 JSON 密钥中的 `private_key`                    | 用于对 JWT 签名，换短期 `access_token`，不要进代码仓库               |
| `OAuth2.0 client`                          | `google-auth-library` 的 JWT 客户端                     | 没有「用户点授权」这一步，是服务账号自签名换取令牌                   |
| ⑤ `Core Reporting API`                     | Analytics Data API（`analyticsdata.googleapis.com`）    | **UA 的 Core Reporting API 已随 UA 停用**，GA4 用 `runReport`         |
| ⑥ `smtp.hihonor.com`                       | 公司 SMTP 中继                                          | 出站要过企业邮箱风控，发件人最好用专用账号                           |
| `admin` / 接收邮箱                         | 值班同学 / 告警组邮箱                                   | 建议用邮件组而非个人邮箱，避免人员变动导致告警失联                   |

::: warning 这张原图是 UA 时代口径，照抄会踩空

原 PPT 里写的是 `GATC`、`Management API`、`Core Reporting API`——都是 Universal Analytics 的产物。UA 属性在 2023 年已全面停止处理数据，`Core Reporting API` 现在拿不到任何数据。所以本文统一按 **GA4** 口径重写：跟踪代码用 `gtag.js`、取数用 **Analytics Data API**、管理面用 **Analytics Admin API**。

保留这张图的形状（六跳调用链）是有价值的，它把「凭据从哪来、数据从哪出」讲得比泳道图清楚；但**术语必须换掉**，否则读者会照着去调一个已下线的接口。

:::

### ① 采集：官网页面 → 日志上报

官网是纯前端站点，页面里的 JS 错误只会发生在**用户浏览器**里，服务端日志里看不到。所以第一层要解决的是「把浏览器里的异常抓出来，并且变成一个 GA 能接收的事件」。

| 错误类型           | 捕获方式                                                              | 说明                                                     |
| ------------------ | --------------------------------------------------------------------- | -------------------------------------------------------- |
| JS 运行时异常      | `window.addEventListener('error', ...)`                               | 语法错误之外的同步异常基本都能拿到 `message` / `filename` |
| Promise 未捕获     | `window.addEventListener('unhandledrejection', ...)`                  | 异步链路最常见的漏网之鱼，`reason` 需要单独取            |
| 静态资源加载失败   | `error` 事件的**捕获阶段**（`capture: true`）                         | 资源错误不冒泡，必须用捕获阶段，靠 `e.target` 区分元素    |
| 框架内异常         | `Vue.config.errorHandler` / `app.config.errorHandler`                 | 不接管的话框架会把异常吞掉，全局 `error` 事件收不到      |
| 接口异常           | axios 拦截器 / fetch 封装                                             | HTTP 层错误不属于 JS 异常，需要业务侧主动归并            |

抓取之后统一走一个上报函数，把错误包装成 GA 的推荐事件 `exception`：

```js
// 统一上报：把任意来源的错误包装成 GA 的 exception 事件
function reportError({ message, stack, type, fatal = false, extra = {} }) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "exception", {
    description: `${type} | ${message}`.slice(0, 500), // 参数值有长度约束，超长会被截断
    fatal,
    error_type: type, // 自定义参数，需在 GA 后台注册为自定义维度
    page_path: location.pathname,
    ...extra,
  });
}

window.addEventListener("error", (e) => {
  if (e.target && e.target !== window) {
    reportError({
      type: "resource",
      message: `${e.target.tagName} 加载失败: ${e.target.src || e.target.href}`,
    });
    return;
  }
  reportError({ type: "js", message: e.message, stack: e.error?.stack });
});

window.addEventListener("unhandledrejection", (e) => {
  reportError({ type: "promise", message: String(e.reason?.message || e.reason) });
});
```

::: warning 上报侧的两个坑

- **必须做节流 / 指纹去重**。一个渲染循环里的错误会在一秒内上报上千次，既浪费 GA 的采集额度，也会把后面的告警阈值彻底打偏。常见做法是「同一个 `type + message` 指纹，1 分钟内只上报一次」，并带上 `first_seen` / `count` 参数。
- **自定义参数要在 GA 后台注册**。`error_type`、`page_path` 这类自定义参数，只有先在「管理 → 自定义定义 → 自定义维度」里注册，数据才会出现在报表里、才能作为 Data API 的 `dimension` 查询；没注册的参数上报成功但等于白报。

:::

### ② 承接：GA 落库与人工查看（web tool）

上报请求打到 Google 的采集端点后，数据由 GA 写入自己的库。视图二里那两条线（`① Ajax Link` 和 `② Internal flow`）说明的就是这层：一条是**数据进 GA**，一条是**数据落到 GA 自己的存储**。

web tool 就是 GA 网页端（`analytics.google.com`），它只是「人看数据」的窗口，本身不产生告警：

| 视图                | 时效                | 用途                                     |
| ------------------- | ------------------- | ---------------------------------------- |
| DebugView           | 近实时（秒级）      | 联调阶段验证上报字段有没有带对           |
| Realtime 实时报告   | 近实时（30 分钟内） | 上线后确认错误有没有进来                 |
| 事件 / 报表         | 延迟数小时到数十小时 | 复盘量级、看趋势                         |
| 探索（Explore）     | 延迟同上            | 临时做自由分析，验证阈值定得是否合理     |

::: warning 数据延迟直接决定告警的时效

GA4 标准报表的数据延迟可能达到 **24–48 小时**，拿它做「小时级突增」告警是没有意义的。要对当天数据做即时判断，只能走两类近实时数据：`runRealtimeReport`（近 30 分钟）或 `dateRange` 取 `today` 的 intraday 数据——而 intraday 数据是**不完整且会持续回补**的，用它做阈值判断必须留余量，否则会出现「白天告警、晚上数据修正后其实没超」的误报。

:::

### ③ 鉴权：定时任务如何合法访问 Google

定时任务是「机器」，没有人在浏览器里点授权，所以走的是**服务账号（Service Account）+ JWT 密钥**这条机器对机器的链路，而不是用户授权码流程。对应视图二的 ③ → ④：

| 图中节点                    | 实际含义                                                                 | 落地物                                     |
| --------------------------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| 生成 OAuth 客户端           | 在 Google Cloud 项目里创建服务账号，并下载 JSON 密钥                     | `client_email` + `private_key`             |
| 密钥鉴权                    | 用私钥对 JWT 签名，向 Google 换取短期 `access_token`                     | 由 SDK 自动完成，令牌有效期约 1 小时       |
| Google IAM                  | 校验这个服务账号是谁、被授予了什么角色                                   | `roles/analytics.viewer` 等预定义角色      |
| analytics.googleapis.com 服务 | 真正的数据查询入口（Analytics Data API），校验通过后才返回数据          | `runReport` / `runRealtimeReport`          |

```js
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

// keyFilename 指向服务账号 JSON；SDK 内部自动完成 JWT 签名 → 换 token → 带 Authorization 头
const client = new BetaAnalyticsDataClient({
  keyFilename: process.env.GA_SA_KEY_PATH,
});

const [res] = await client.runReport({
  property: `properties/${process.env.GA_PROPERTY_ID}`,
  dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
  dimensions: [{ name: "eventName" }, { name: "customEvent:error_type" }],
  metrics: [{ name: "eventCount" }],
  dimensionFilter: {
    filter: { fieldName: "eventName", stringFilter: { value: "exception" } },
  },
});
```

::: warning 授权要做两处，缺一不可

1. **Google Cloud 侧**：给服务账号授予访问 Analytics API 的角色（或至少允许其调用该 API）；
2. **GA 侧**：到 GA 媒体资源的「媒体资源访问权限管理」里，把服务账号的 `client_email` 添加为**查看者**。

只做了第 1 步、忘了第 2 步，是最典型的翻车现场：API 调用能到达 `analytics.googleapis.com`，但一定返回 `403 PERMISSION_DENIED`，报错信息只提权限不提 GA 后台，很容易被误判成角色配错。

:::

### ④ 判定与告警：得到日志数据 → 分析 → 分支

拉回来的是一张二维表（维度 × 指标），先做聚合再判定。判定用「绝对量 + 环比 + 新增指纹」三条线组合，避免单一阈值被流量波动带偏：

| 规则         | 示例阈值                                       | 目的                                   |
| ------------ | ---------------------------------------------- | -------------------------------------- |
| 绝对量超限   | 单小时 `exception` 事件数 > 50                 | 兜住明显的故障                         |
| 环比突增     | 本小时 / 上小时 > 3 倍，且基数 > 10            | 抓住「平时没事、突然爆」的回归问题     |
| 新增错误指纹 | 出现历史 7 天未出现过的 `type + message` 组合  | 新版本上线引入的新问题，往往量不大但致命 |
| 影响面       | 同一指纹关联用户数 > 100                       | 过滤掉极少数环境导致的噪声             |

判定结果就是泳道图里那个菱形的两条出口，对应视图二的 ⑥：

- **是 → SMTP 邮件转发服务器 → 接收邮箱**：把命中规则、错误指纹 Top N、影响页面、时间窗口拼成 HTML 邮件发出；
- **否 → 无操作**：不产生任何通知，这一条同样重要——告警系统的价值取决于「发出来的每封邮件都值得看」。

```js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // 例：smtp.hihonor.com
  port: Number(process.env.SMTP_PORT), // 465 走 SSL，587 走 STARTTLS
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

if (shouldAlert) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ALERT_TO, // 建议用告警邮件组，而不是个人邮箱
    subject: `[官网JS监控] ${new Date().toLocaleString()} 触发告警`,
    html: renderAlertHtml(report),
  });
}
```

### 端到端时序

| 步骤 | 触发方            | 动作                                                       | 失败时的表现                     |
| ---- | ----------------- | ---------------------------------------------------------- | -------------------------------- |
| 1    | 浏览器            | 捕获错误 → `gtag('event', 'exception')`                    | 静默失败，数据缺失且无感知       |
| 2    | GA 采集端         | 接收上报并落库                                             | 网络被拦截 / 广告插件屏蔽即丢数  |
| 3    | 定时任务          | 用服务账号私钥签 JWT，换 `access_token`                    | 401，密钥过期或被禁用            |
| 4    | Google IAM        | 校验身份与角色                                             | 403，通常是对应权限没配齐        |
| 5    | Analytics Data API| 执行 `runReport` 返回事件数据                              | 429 配额超限 / 400 维度未注册    |
| 6    | 定时任务          | 聚合 + 规则判定                                            | 规则写错 → 漏报或误报            |
| 7    | SMTP 中继         | 投递告警邮件                                               | 被企业邮箱风控拦截，退信在发件箱 |
| 8    | 接收邮箱          | 值班同学看到并介入                                         | —                                |

### 为什么这一层要自研

GA4 自带的自定义洞察（Custom insights）评估粒度是天 / 周级别，阈值表达能力和聚合维度都很有限，而且通知只能发到 GA 账号绑定的邮箱，接不进公司内部的告警渠道。对「错误量小时级突增」这种信号，它基本接不住。

所以设计上把**判定权拿到自己手里**：GA 只负责采集和存储，定时任务负责取数、判定、投递。好处是阈值、聚合方式、告警收敛策略、通知渠道全部可控；代价是要自己处理鉴权、配额、数据延迟这三件麻烦事——这也正是后面几节要展开的部分。

### 小结

这条链路的关键在于「**谁负责什么**」的边界划得很干净：

- 浏览器只负责**抓**，不判断严重性；
- GA 只负责**存**，不做告警；
- Google Cloud 只负责**验身份**，不看业务；
- 定时任务负责**判断和通知**，是唯一有业务逻辑的一层。

四个箭头（上报、查询、判定、投递）串起来就是一个闭环，环上任何一处断掉，故障都会表现为「页面明明报错了，但没人收到邮件」。
