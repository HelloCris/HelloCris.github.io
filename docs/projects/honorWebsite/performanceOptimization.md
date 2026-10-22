# 性能优化专项

## 常用性能指标总览

| 指标                    | 指标说明                                         | 指标等级                               |
| ----------------------- | ------------------------------------------------ | -------------------------------------- |
| 最大内容绘制（LCP）     | 最大内容元素渲染完成的时间，反映页面加载速度。   | 好 ≤2.5S / 中 2.5–4S / 差 >4S          |
| 累计布局偏移（CLS）     | 页面元素的布局偏移量，反映布局稳定性。           | 好 ≤0.1 / 中 0.1–0.25 / 差 >0.25       |
| 下一次绘制的交互（INP） | 用户交互后页面完成响应的时间，反映整体响应能力。 | 好 ≤200MS / 中 200–500MS / 差 >500MS   |
| 首次内容绘制（FCP）     | 用户首次看到页面内容渲染的时间。                 | 好 ≤1.8S / 中 1.8–3S / 差 >3S          |
| 首字节时间（TTFB）      | 从发送请求到接收到响应首字节的时间。             | 好 ≤800MS / 中 800–1800MS / 差 >1800MS |

### LCP

LCP 会报告视口中可见的**最大图片或文本块的呈现时间**（相对于用户首次转到相应网页的时间）。

分级标准（参考：https://web.dev/articles/lcp?hl=zh-cn ）：

- 好：LCP ≤ 2.5s
- 需改进：2.5s < LCP ≤ 4.0s
- 差：LCP > 4.0s

| LCP 阶段           | 说明                                                             |
| ------------------ | ---------------------------------------------------------------- |
| 首字节时间（TTFB） | 从用户开始加载网页到浏览器收到 HTML 文档响应的第一个字节的时间。 |
| 加载延迟           | TTFB 与浏览器开始加载 LCP 资源之间的增量。                       |
| 加载时间           | 加载 LCP 资源本身所需的时间。                                    |
| 渲染延迟           | LCP 资源完成加载到 LCP 元素完全呈现之间的增量。                  |

> 注意：LCP 会随着页面加载过程发生变化，直到完全渲染找到最终最大元素（LCP）。触发用户交互后，LCP 停止记录。

::: info 计算范围

计入 LCP 的元素：

- `<img>` 元素（第一帧呈现时间用于动画内容，例如 GIF 或动画 PNG）
- `<svg>` 元素内的 `<image>` 元素
- `<video>` 元素（使用海报图片加载时间或视频的第一帧呈现时间，以两者中较早达到者为准）
- 包含使用 `url()` 函数加载的背景图片的元素（与 CSS 渐变相反）
- 包含文本节点或其他内嵌文本元素子级的块级元素

排除的元素：

- 不透明度为 0 且对用户不可见的元素
- 覆盖整个视口的元素，此类元素可能被视为背景（而非内容）
- 占位符图片或其他具有低熵的图片，可能无法反映网页的实际内容

:::

### CLS

CLS（Cumulative Layout Shift，累计布局偏移）用于衡量页面在生命周期内**非预期布局偏移的累计程度**，反映视觉稳定性。得分越低，说明页面元素越不容易「跳动」。

分级标准（参考：https://web.dev/articles/cls?hl=zh-cn ）：

- 好：CLS ≤ 0.1
- 需改进：0.1 < CLS ≤ 0.25
- 差：CLS > 0.25

| 概念                               | 说明                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 布局偏移分数（Layout Shift Score） | 单次偏移 = 影响分数（Impact Fraction）× 距离分数（Distance Fraction），CLS 为生命周期内所有非预期偏移之和 |
| 影响分数（Impact Fraction）        | 不稳定元素在前后两帧中**可见区域占比**的变化                                                              |
| 距离分数（Distance Fraction）      | 不稳定元素在视图中**移动的最大距离**（相对视口最大边长）                                                  |

> 注意：**仅「非预期（unexpected）」的偏移计入 CLS**。用户输入后 500ms 内发生的偏移（如点击展开菜单）会被排除；而图片/广告加载、字体切换、在上方注入内容导致的跳动则计入。

::: info 常见成因与规避

- **媒体资源无尺寸**：`<img>`/`<video>`/`<iframe>` 未设置 `width`/`height` 或 `aspect-ratio` → 加载后撑开布局。✅ 始终显式声明尺寸或使用 `aspect-ratio` 预留空间。
- **动态插入内容**：在已有内容**上方**插入广告/弹窗/横幅 → 下方内容被推挤。✅ 用预留容器占位，或插入到下方 / 覆盖层。
- **Web 字体闪烁（FOIT/FOUT）**：字体加载导致文本尺寸变化。✅ 使用 `font-display: optional/swap` 并预加载关键字体。
- **动画触发重排**：用 `top`/`left`/`height` 等属性做动画 → 引发偏移。✅ 改用 `transform`/`opacity` 做合成动画。

:::

### INP

INP（Interaction to Next Paint，下一次绘制的交互）衡量页面**对用户交互的整体响应能力**。它取页面生命周期内（或接近最差）的「用户交互」到「浏览器绘制下一帧」的耗时，反映真实交互卡顿。INP 已在 2024 年 3 月正式取代 FID 成为 Core Web Vitals 指标。

分级标准（参考：https://web.dev/articles/inp?hl=zh-cn ）：

- 好：INP ≤ 200ms
- 需改进：200ms < INP ≤ 500ms
- 差：INP > 500ms

| INP 耗时拆解                   | 说明                                                               |
| ------------------------------ | ------------------------------------------------------------------ |
| 输入延迟（Input Delay）        | 用户交互到事件处理器开始执行之间的等待（主线程被长任务占用时变长） |
| 处理时间（Processing Time）    | 事件处理器执行 + 浏览器完成渲染所需的计算                          |
| 呈现延迟（Presentation Delay） | 渲染结果提交到屏幕、完成绘制的时间                                 |

> 注意：INP 关注**最差（或接近最差）的交互**，而非平均值。少量高频交互（点击、轻触、键盘）中只要有一次明显卡顿，INP 就会超标。

::: info 优化方向

- **拆分长任务（Long Tasks）**：将 >50ms 的同步任务切分为多个小任务（用 `setTimeout` / `scheduler.yield()`），让主线程能及时响应输入。
- **精简事件处理器**：避免在处理函数里做重计算/大循环；必要时用 `debounce`/`throttle`，或把耗时逻辑移入 Web Worker。
- **减少 DOM 规模与复杂度**：过大的 DOM（节点数多、嵌套深）会拖慢渲染与样式计算。
- **避免强制同步布局（Forced Reflow）**：不要在读写 DOM 样式间交替触发重排；批量读、批量写。
- **优化第三方脚本**：标签管理器、埋点、A/B 测试常是长任务源头，按需加载并设超时。

:::

### FCP

FCP（First Contentful Paint，首次内容绘制）指从页面开始导航到**浏览器首次渲染出任意内容**（文本、图片、`<canvas>`、SVG 或背景图）所经历的时间。它代表用户「页面开始有反应了」的第一感知。

分级标准（参考：https://web.dev/articles/fcp?hl=zh-cn ）：

- 好：FCP ≤ 1.8s
- 需改进：1.8s < FCP ≤ 3s
- 差：FCP > 3s

| 指标 | 区别                                                        |
| ---- | ----------------------------------------------------------- |
| FCP  | 只要**任意**内容首次出现即记录（哪怕是一段文字、一个 logo） |
| LCP  | 记录视口中**最大**内容元素出现的时间，通常晚于 FCP          |

> 注意：FCP 与 LCP 都受 TTFB 与渲染阻塞资源影响，但 FCP 对「首屏是否有内容」更敏感；优化 FCP 能快速改善用户「白屏焦虑」。

::: info 优化手段

- **消除渲染阻塞**：关键 CSS 内联、非关键 CSS/JS 用 `defer`/`async` 或 `media` 切换，减少主线程解析等待（本案例 Render-blocking 省 11.2s 即同时利好 FCP/LCP）。
- **预连接关键源**：对 CDN、字体、API 用 `<link rel="preconnect">` / `dns-prefetch` 提前建链。
- **服务端渲染 / 流式渲染**：尽早吐出首屏 HTML 与文本，缩短白屏。
- **控制 HTML 体积**：减小文档与阻塞脚本体积，让首字节后更快进入解析绘制。

:::

### TTFB

TTFB（Time to First Byte，首字节时间）指从浏览器发起请求到**接收到服务器响应第一个字节**的时间，主要反映**服务端与前段网络**的性能，是 LCP「加载延迟」阶段的起点。

分级标准（参考：https://web.dev/articles/ttfb?hl=zh-cn ）：

- 好：TTFB ≤ 800ms
- 需改进：800ms < TTFB ≤ 1800ms
- 差：TTFB > 1800ms

| TTFB 组成     | 说明                                     |
| ------------- | ---------------------------------------- |
| 重定向耗时    | 301/302、HSTS、http→https 等跳转         |
| 服务/网络排队 | DNS 解析、TCP/TLS 握手、连接排队         |
| 服务器处理    | 后端应用、数据库查询、API 调用、模板渲染 |
| 响应传输      | 首字节从服务器发回客户端的网络耗时       |

> 注意：TTFB 是「服务端指标」，前端能做的有限，但它直接决定 LCP 的起跑线——TTFB 高，后面再优化图片也救不回整体体验。

::: info 优化手段

- **使用 CDN / 边缘缓存**：把静态与可缓存 HTML 推到离用户更近的节点（本案例 `www-file.honor.com` 已开启 3 天缓存且命中，资源侧 TTFB 良好）。
- **优化后端与查询**：缓存热点数据、减少慢 SQL/外部 API 调用、启用服务端渲染（SSR）与流式响应。
- **减少重定向**：合并/消除不必要的跳转，避免链式 301。
- **尽早 flush**：对动态页使用流式（streaming）响应，让首字节尽早返回。
- **启用 HTTP 缓存与压缩**：合理 `Cache-Control`、gzip/brotli 压缩，降低传输耗时。

:::

## Lighthouse工具

### Lighthouse 是什么

Lighthouse 是 Google 开源的自动化网页质量审计工具，性能（Performance）是其中一项核心审计。它在一个 **受控环境（实验室 / Lab）** 中加载页面，跑出可复现的指标，并给出优化建议。

::: info 实验室数据 vs 字段数据

- **实验室数据（Lab）**：Lighthouse、DevTools 在模拟/受控条件下测得，**可复现、便于定位问题**，但受设备与网络节流影响（例如默认 Emulated Moto G Power + Slow 4G）。
- **字段数据（Field / RUM）**：来自真实用户（如 Chrome UX Report / CrUX、自采 RUM），反映实际体验。
- 二者互为补充：**Lighthouse 用于「为什么慢、怎么改」，CrUX/RUM 用于「真实用户到底慢不慢」**。线上结论应以字段数据为准。

:::

| 运行方式           | 适用场景                      | 命令 / 入口                                                        |
| ------------------ | ----------------------------- | ------------------------------------------------------------------ |
| Chrome DevTools    | 单次快速排查                  | F12 → Lighthouse 面板 → 勾选 Performance → Generate report         |
| CLI（Node）        | 脚本化、本地批量              | `npx lighthouse <url> --only-categories=performance --output=html` |
| PageSpeed Insights | 同时拿到 Lab + 真实 CrUX 字段 | 打开 https://pagespeed.web.dev/ 输入 URL                           |
| CI 集成            | 回归卡口                      | `lighthouse-ci` / GitHub Action，设性能预算（budgets）             |

### 报告怎么读

一份性能报告自上而下分三块：

1. **METRICS（指标）**：FCP、LCP、TBT、CLS、Speed Index 等核心分。
2. **INSIGHTS（洞察）**：直接点名瓶颈，如 `Render-blocking requests`、`Improve image delivery`、`LCP breakdown`、`3rd parties`，并给出 **Est savings（预计可节省的时间/体积）**。
3. **DIAGNOSTICS（诊断）**：更细的归因，如 `Minimize main-thread work`、`Reduce unused JavaScript`、`Avoid enormous network payloads`。

::: warning 读报告的重点

- 先看 **INSIGHTS 里 Est savings 最大的项**——那是最该先下手的高杠杆点（例如本案例的 Render-blocking 11.2s）。
- 指标红不红只告诉你「慢」，INSIGHTS/DIAGNOSTICS 才告诉你「为什么慢」。
- 报告底部 **PASSED AUDITS** 可直接忽略，关注未通过项即可。

:::

::: info 性能评分与指标口径

| 指标        | 含义                                       | 优秀线   |
| ----------- | ------------------------------------------ | -------- |
| FCP         | 首次内容绘制                               | ≤1.8s    |
| LCP         | 最大内容绘制                               | ≤2.5s    |
| CLS         | 累计布局偏移                               | ≤0.1     |
| TBT         | 总阻塞时间（FCP→TTI 间主线程被阻塞的累计） | ≤200ms   |
| Speed Index | 视觉填充速度                               | 越低越好 |
| INP         | 交互到下一帧响应（替代 FID）               | ≤200ms   |

> 性能总分（0–100）由上述指标按权重加权计算；LCP、TBT、CLS 权重最高。

:::

### 关键参数与环境陷阱

- **节流（Throttling）**：Lighthouse 默认模拟弱网（Slow 4G）与低端机（Moto G Power），会**放大**结构性问题。快网下不明显的问题，在节流下会暴露（本案例 LCP 在快网 0.3s、实验室 46.7s 即典型）。
- **无痕窗口**：报告常提示「IndexedDB 等存储数据影响加载」，**务必用无痕窗口跑**，排除本地缓存/登录态干扰。
- **超时**：页面过慢可能触发「loaded too slowly to finish… Results may be incomplete」，此时数值为估计值，需复跑或结合字段数据。
- **`preconnect` 滥用**：报告会警告 `>4 preconnect` 连接，应只预连接到最关键源。

### 标准分析流程

```text
1. 明确目标页面与设备/网络条件（移动端为主，建议 Slow 4G 节流）。
2. 无痕窗口跑 Lighthouse，导出报告（HTML/JSON）。
3. 读 METRICS：确认哪些指标红、总分多少。
4. 读 INSIGHTS：按 Est savings 排序，定位 Top 瓶颈（渲染阻塞/图片/JS/CSS/第三方）。
5. 用「LCP 四阶段 / CLS / TBT」框架把瓶颈映射到具体阶段（加载延迟 / 加载时间 / 渲染延迟）。
6. 对照页面源码（如 <picture>、lazyload、preload、defer）确认根因。
7. 排优先级（P0 高杠杆 → P1 → P2）输出优化清单，改完复跑验证。
8. 用 CrUX/PageSpeed Insights 复核线上真实字段表现。
```

## 案例分析

> 分析对象：`https://www.honor.com/my/phones/honor-x9e-pro/buy/`（马来西亚站 HONOR X9e Pro 购买页）
> 数据来源：Lighthouse 13.4.1 报告（Captured 2026/10/21 17:22）+ 页面源码结构分析。
> ⚠️ 报告约束：在 **Emulated Moto G Power + Slow 4G 节流** 下跑分，且提示「loaded too slowly to finish… Results may be incomplete」「IndexedDB 影响加载 → 建议无痕窗口」。以下为**实验室估计值**，真实字段值以 CrUX / RUM 为准。

### LCP 候选元素定位

该页为 AEM 架构，首屏最大可见图为顶部 **leaderboard 横幅**，由 `<picture>` 以真实 `srcset` **eager 输出、未走懒加载**：

```html
<picture>
  <source
    media="(min-width: 840px)"
    srcset=".../honor-x9e-pro/open-sale/x9e-pro-ribbon-pc-10.05.jpeg"
  />
  <source
    media="(max-width: 839px)"
    srcset=".../honor-x9e-pro/open-sale/x9e-pro-ribbon-mb-10.05.jpeg"
  />
</picture>
```

首屏下方 **183 个**推荐产品图均使用 `data-srcset` + 占位 `placeholder.png` 懒加载，不会成为 LCP。因此 **LCP 候选 = 顶部 ribbon 横幅 `x9e-pro-ribbon-pc-10.05.jpeg`（PC）/ `-mb-`（移动）**。

快网对照探测（仅相对参考）：HTML TTFB ≈ 654ms、文档 781KB；横幅图 **79.6KB / image/jpeg**、CDN 已缓存。可见**单图与 CDN 本身不慢**，瓶颈是慢网下被阻塞与体积拖垮。

### Lighthouse 实测指标（实验室值）

性能总分 **21 / 100（红区）**，且 **CLS 0.13 已超出 0.1 优秀线、落入「需改进」区间**：

| 指标             | 实测值     | 分级                   | 备注                       |
| ---------------- | ---------- | ---------------------- | -------------------------- |
| Performance 总分 | 21         | 🔴 差                  | 远低于 90 优秀线           |
| FCP              | 11.8 s     | 🔴 差（好 ≤1.8s）      | —                          |
| **LCP**          | **38.5 s** | 🔴 差（好 ≤2.5s）      | 横幅图过晚绘制             |
| TBT              | 3,180 ms   | 🔴 差（好 ≤200ms）     | 主线程长任务堆积，明显偏高 |
| **CLS**          | **0.13**   | 🟡 需改进（≤0.1 为好） | 超出优秀线                 |
| Speed Index      | 30.2 s     | 🔴 差                  | —                          |

### 瓶颈归因（Insights + Diagnostics）

| 来源        | 问题                                    | 量级                       | 映射 LCP 阶段        |
| ----------- | --------------------------------------- | -------------------------- | -------------------- |
| Insights    | **渲染阻塞请求**                        | **预计可省 10,350 ms**     | 加载延迟             |
| Insights    | **优化图片交付**                        | 预计可省 3,668 KiB         | 加载时间 + 渲染延迟  |
| Insights    | 使用更高效的缓存周期                    | 预计可省 1,566 KiB         | 加载时间             |
| Diagnostics | **减少主线程工作**                      | **15.0 s**                 | 渲染延迟             |
| Diagnostics | **减少 JavaScript 执行时间**            | **10.8 s**                 | 渲染延迟             |
| Diagnostics | 避免庞大的网络载荷                      | **总 9,118 KiB（≈9.1MB）** | 加载时间             |
| Diagnostics | 减少未使用的 JavaScript                 | 预计可省 1,341 KiB         | 加载延迟 + 渲染延迟  |
| Diagnostics | 减少未使用的 CSS                        | 预计可省 1,247 KiB         | 渲染延迟             |
| Diagnostics | 压缩 JavaScript（Minify）               | 预计可省 410 KiB           | 渲染延迟             |
| Diagnostics | 避免长主线程任务                        | **20 个长任务**            | 渲染延迟             |
| Diagnostics | **图片元素未设置显式 width/height**     | —                          | **CLS 元凶**（0.13） |
| Diagnostics | **页面阻止了 bfcache 恢复（1 失败项）** | —                          | 前进/后退缓存失效    |
| Warnings    | >4 个 `preconnect` 连接                 | —                          | 干扰关键资源优先度   |
| Diagnostics | 避免非合成动画                          | 1 个动画元素               | 主线程渲染压力       |

**四阶段再归因**

- **TTFB**：快网 654ms 属「好」，非主因。
- **加载延迟（最大元凶）**：渲染阻塞 **10.35s** + 全站无 LCP 图预加载，浏览器要等 HTML/CSS/JS 解析完才轮到横幅请求；叠加 9.1MB 总载荷争抢慢网带宽。
- **加载时间**：单张横幅仅 79.6KB JPEG（本身不慢），但图片交付可省 **3.7MB**、总载荷高达 9.1MB，慢网下累计拖慢首屏图到达。
- **渲染延迟**：主线程工作 15.0s、JS 执行 10.8s、20 个长任务，图片解码后排队等主线程空闲 → LCP 推到 38.5s。
- **CLS 专项**：报告明确列出 `Layout shift culprits` 且 `Image elements do not have explicit width and height`——**未声明尺寸的图片在加载后撑开布局**，是 CLS 升到 0.13、超出优秀线的直接原因。

### 优化清单（按报告节省量排序）

| 优先级 | 措施                                                              | 依据                                           | 预期收益          |
| ------ | ----------------------------------------------------------------- | ---------------------------------------------- | ----------------- |
| **P0** | 消除渲染阻塞：关键 CSS 内联、非关键 CSS/JS `defer`/`async`        | 渲染阻塞请求 预计可省 10,350 ms                | 砍最大 load delay |
| **P0** | LCP 横幅加 `<link rel="preload" as="image">` + **转 AVIF/WebP**   | 优化图片交付 预计可省 3,668 KiB                 | 提前发现 + 减体积 |
| **P0** | 削减总载荷至合理区间：代码分割、删冗余 JS/CSS、懒加载（已做）     | 避免庞大的网络载荷 9,118 KiB                   | 减少带宽争抢      |
| **P1** | **给所有图片加显式 `width`/`height` 或 `aspect-ratio`**           | 图片无显式尺寸 → CLS 0.13                      | 把 CLS 拉回 ≤0.1  |
| **P1** | 减少主线程占用：拆分长任务、精简第三方、Minify JS（410 KiB）      | 主线程 15.0s / JS 10.8s / 20 个长任务          | 缩短 render delay |
| **P1** | 删冗余 JS 1,341 KiB / CSS 1,247 KiB                               | 减少未使用的 JS/CSS                            | 减负              |
| **P1** | **修复 bfcache**：移除 `unload`、用 `pagehide`/`visibilitychange` | 页面阻止 bfcache 恢复（1 失败项）              | 前进/后退秒开     |
| **P2** | `preconnect` 收敛到 ≤4 个最关键源                                 | >4 个 preconnect 连接警告                      | 避免预连接浪费    |
| **P2** | 收敛非合成动画为 transform/opacity                                | 1 个非合成动画元素                             | 减主线程压力      |

::: info 结论

本页 LCP 差（38.5s）与 CLS 超标（0.13）的**根因是「慢网下渲染阻塞 10.35s + 9.1MB 总载荷 + 15s 主线程工作」三重叠加**，且图片缺失尺寸直接拉高了 CLS。最高杠杆三件事：**消除渲染阻塞、预加载并转 AVIF/WebP 的 LCP 图、给图片补尺寸并砍冗余体积**。建议针对性治理后用 CrUX 字段数据复核线上真实表现（并建议无痕窗口重跑排除 IndexedDB 干扰）。

:::
