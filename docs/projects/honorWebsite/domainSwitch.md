# 域名切换专项

> 目标：新增 `www.honor.com` 替换 `www.hihonor.com` 老域名，完成荣耀官网域名切换。

## 整体方案概览

### 架构流程

![域名切换架构设计](./asset/domainSwitch.webp)

### 工作梳理

| 序号 | 任务               | 具体内容                                                                               |
| ---- | ------------------ | -------------------------------------------------------------------------------------- |
| 1    | DNS 域名配置       | 新增 `www.honor.com` 域名                                                              |
| 2    | HTTPS 证书配置     | 采购 `*.honor.com` 证书                                                                |
| 3    | CDN 配置           | ① 新增新域名缓存策略、路由策略；② 新增老域名跳转到新域名策略                           |
| 4    | WAF 配置           | 新增域名 WAF 配置                                                                      |
| 5    | Nginx 反向代理配置 | 新增域名反向代理配置                                                                   |
| 6    | SEO 优化           | ① 更新搜索引擎信息；② 301 重定向；③ 刷新站点地图                                       |
| 7    | GA 流量切换        | 保证流量平稳切换                                                                       |
| 8    | 上游服务开发联调   | 涉及 21 个系统，跨域整改，解决跨域 Cookie 读写、跨域 AJAX 请求，保证集成的后端接口访问 |
| 9    | 下游服务开发联调   | 涉及 1 个系统                                                                          |
| 10   | 荣耀官网内链修改   | 统一替换为 `www.honor.com`                                                             |
| 11   | 全站测试           | 涉及 54 个国家站点切换测试                                                             |
| 12   | 运维监控配置       | 修改监控域名                                                                           |
| 13   | 测试环境搭建       | 新增测试环境域名，搭建测试环境                                                         |

## Nginx 方案

![nginx](./asset/nginx.svg)

::: info 方案要点

1. **新域名配置**：新增 `honor.com` 域名配置，与 `hihonor.com` 域名隔离。
2. **重定向**：`hihonor.com` 域名 301 重定向到 `honor.com`。
3. **缓存**：开启缓存，降低新域名请求对 Web 服务的压力。

:::

## 荣耀官网内链整站刷新

![AEM 内链刷新脚本流程](asset/aem-internal-link-refresh-flow.svg)

| 步骤               | 内容                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| ① 站点内链检索刷新 | 在编辑环境检索站点内包含 `www.hihonor.com` 或 `www.honor.ru` 的链接配置项，修改为 `www.honor.com` |
| ② 站点发布         | 推送内链刷新结果至现网                                                                            |
| ③ 缓存清理         | 清理当前站点的 Dispatcher 及 CDN 缓存                                                             |

## 四、荣耀账号登录方案

### 4.1 登录流程

```
荣耀官网
  │ ① 拉起荣耀账号登录
  ▼
荣耀账号：携带登录 code 重定向到 api-ap-mkt.c.honor.com
  │ ②
  ▼
官网集成服务：获取 honor 相关登录配置
  │ ③
  ▼
官网集成服务（公服）：返回配置信息
  │
  ▼
获取登录 token → 返回 token 信息
  │
  ▼
使用 token 换取用户 ID（UUM） → 返回用户 ID
  │
  ▼
设置响应头 Set-Cookie 的域名为 honor.com
  │ ④
  ▼
将 cookie 写入 honor.com 域名下，返回 api-ap-mkt.c.hihonor.com 重定向链接
  │ ⑤
  ▼
携带 cookie 信息请求 api-ap-mkt.c.hihonor.com
  │ ⑥
  ▼
设置响应头 Set-Cookie 的域名为 hihonor.com
  │ ⑦
  ▼
将 cookie 二次写入 hihonor.com 域名下，返回官网 www.honor.com 页面
```

### 4.2 方案要点

| 序号 | 内容                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------- |
| 1    | **登录白名单配置**：账号新增 `honor.com` 相关域名回调白名单配置                                             |
| 2    | **新增集成服务域名**：集成服务新增 honor 域名，与原 hihonor 域名指向同一 CLB，域名证书挂载在各自域名下      |
| 3    | **登录配置**：公服新增 honor 域名配置，确保灰度期间不影响线上登录，支持集成服务 honor 和 hihonor 双域名登录 |
| 4    | **首次写入 cookie**：根据登录的域名将 cookie 写入到对应域名上                                               |
| 5    | **登录信息封装**：将需要双写的 cookie 信息和官网地址作为参数封装，重定向至集成服务另一域名上                |
| 6    | **新增二次写入 cookie 新方法**：调用集成服务 hihonor 域名的二次写入方法                                     |
| 7    | **二次写入 cookie**：二次写入 cookie 到 hihonor 域名下，完成 cookie 双写                                    |

---

## 五、SEO 方案

### 5.1 Canonical

Canonical 是 HTML 标签，用于指示搜索引擎对网页的“首选”版本。

- **解决重复内容问题**：多个 URL 指向相同或相似内容时，规范标签帮助搜索引擎识别主要版本。
- **集中权重**：通过指定规范 URL，将相关页面链接权重集中到主版本上。
- **优化搜索引擎索引**：帮助搜索引擎更有效地索引网页，确保抓取和显示正确版本。

```html
<link rel="canonical" href="https://www.honor.com/uk/" />
```

### 5.2 Hreflang + alternate

Hreflang 是一种 HTML 属性，用于指示搜索引擎某个网页的语言和地区版本。

- 多语言和多地区优化
- 帮助搜索引擎识别同一内容的不同语言或地区版本
- 避免重复内容问题
- 提升用户体验、搜索引擎排名，支持国际化网站

```html
<link rel="alternate" href="https://www.honor.com/cn/" hreflang="zh-CN" />
<link rel="alternate" href="https://www.honor.com/global/" hreflang="en" />
<link rel="alternate" href="https://www.honor.com/my/" hreflang="en-MY" />
<link rel="alternate" href="https://www.honor.com/pk/" hreflang="en-PK" />
<link rel="alternate" href="https://www.honor.com/ie/" hreflang="en-IE" />
```

### 5.3 结构化数据

网页结构化数据是指在网页中使用特定的标记（通常是 Schema.org 标准）来描述内容的结构和含义。

- 提高搜索引擎理解能力
- 丰富搜索结果（评分、价格、活动时间等）
- 优化 SEO 排名
- 官网使用 **JSON-LD**（业界主流），另有 Microdata、RDFa 方式

### 5.4 Sitemap + robots.txt

- **网站地图**：`sitemap.xml` 面向搜索引擎，`sitemap.html` 面向消费者。
- 帮助搜索引擎抓取、提高索引效率、优化排名、提供页面优先级、改善用户体验。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <mobile:mobile type="pc,mobile" />
    <loc>https://www.honor.com/cn/</loc>
    <priority>1.0</priority>
    <lastmod>2025-05-26</lastmod>
    <changefreq>always</changefreq>
  </url>
  <url>
    <mobile:mobile type="pc,mobile" />
    <loc>https://www.honor.com/cn/phones/</loc>
    <priority>0.8</priority>
    <lastmod>2025-05-26</lastmod>
    <changefreq>always</changefreq>
  </url>
</urlset>
```

---

## 六、MyHonor APP 免升级兼容方案

### 6.1 问题背景

MyHonor 老版本 App 仍使用 `hihonor.com` / `honor.ru` 域名，需要通过 Nginx 做 UA 识别，使其在无需升级的情况下兼容新的 `honor.com` 域名。

### 6.2 请求链路

| 场景                                       | 步骤                  | 动作                                                                                                     |
| ------------------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------- |
| 老版本 App 访问 `hihonor.com` / `honor.ru` | 1 → 2 → 3 → 4         | UA 标识 → 直接到 Web 服务 → 返回 `hihonor.com` / `honor.ru` 页面                                         |
| 老版本 App 访问 `honor.com`                | 1 → 2 → 3 → 4 → 5 → 6 | UA 标识 → 重定向到 `hihonor.com` → 访问 `hihonor.com` → 到 Web 服务 → 返回页面 → 返回 `hihonor.com` 页面 |

### 6.3 方案要点

| 模块                      | 内容                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Nginx 配置             | 根据 `$http_user_agent` 中的 `appversion` 信息识别老版本 App：① `honor.com` 重定向到 `hihonor.com`；② `honor.com/ru` 重定向到 `honor.ru` |
| 2. Cookie 操作            | Web 服务 cookie 增删操作仅针对当前访问页面域名：① `location` 中获取当前页面域名；② 向当前域名写入 / 移除 cookie，不存在 cookie 跨域问题  |
| 3. PathUtils 相对路径重写 | ① 仅保留通用规则 `/content/honor/` → `/`；② 废弃 RU 特有规则 `/content/honor/ru/` → `/`                                                  |
