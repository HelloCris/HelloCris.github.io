# 前端安全

## XSS（跨站脚本攻击）

XSS（Cross-Site Scripting，跨站脚本攻击）是指攻击者将恶意脚本（通常是 JavaScript）注入到正常网页中，当其他用户浏览该页面时，浏览器无法区分脚本的可信度，从而执行恶意代码。

**本质**：用户输入未经过滤/转义，被当作可执行代码运行。

| 维度         | 反射型 XSS           | 存储型 XSS                   | DOM 型 XSS             |
| ------------ | -------------------- | ---------------------------- | ---------------------- |
| 恶意代码位置 | URL 参数中，不持久化 | 存储在服务器（数据库/文件）  | 全程在前端，不经过后端 |
| 触发方式     | 用户点击恶意 URL     | 访问含恶意代码的页面         | 前端 JS 拼接 DOM 触发  |
| 危害等级     | 中                   | 高（持久性，影响所有访问者） | 中                     |
| 典型场景     | 搜索框、URL 参数回显 | 留言板、评论区、论坛帖子     | 基于 JS 动态渲染的页面 |

::: info 攻击示例

**反射型**：攻击者构造恶意 URL，服务器将参数直接拼接到 HTML 返回：

```
https://example.com/search?keyword=<script>alert('XSS')</script>
```

**存储型**：攻击者在论坛发帖时嵌入恶意代码，所有浏览该帖子的用户都会触发。

**DOM 型**：前端 JS 通过 `innerHTML`、`document.write` 等方式将用户输入直接插入 DOM：

```js
// 危险写法
document.getElementById("output").innerHTML = userInput;
```

:::

::: info 防御措施

- **输出编码/转义**：对用户输入进行 HTML 实体编码，将 `<`、`>`、`"` 等特殊字符转义后再输出到页面。
- **输入验证**：严格校验用户输入的类型、长度和格式。
- **HttpOnly Cookie**：设置 Cookie 的 `HttpOnly` 属性，禁止 JS 读取 Cookie，防止会话劫持。
- **CSP（内容安全策略）**：通过 HTTP 头配置，限制页面可加载的资源来源，阻止内联脚本执行。
- **避免危险 API**：使用 `textContent` 代替 `innerHTML`，避免 `document.write` 等。

:::

## CSRF（跨站请求伪造）

CSRF（Cross-Site Request Forgery，跨站请求伪造）是指攻击者诱导已登录用户在不知情的情况下，以该用户的身份向目标网站发送非本意的请求。

**本质**：利用浏览器自动携带 Cookie 的机制，服务器只认 Cookie 不认请求来源。

> **攻击成立条件**
>
> - 用户已登录目标网站，且 Cookie 仍有效。
> - 用户在未登出的情况下，访问了攻击者控制的恶意页面或点击了恶意链接。

::: info 攻击流程

```
用户登录银行网站 → 浏览器保存 Session Cookie
→ 用户未登出，访问恶意网站 B
→ 恶意网站构造伪造请求（如转账）
→ 浏览器自动携带银行 Cookie 发送请求
→ 银行验证 Cookie 有效，执行转账操作
```

:::

::: info 攻击示例

**GET 型**：通过 `<img>` 标签自动触发：

```html
<img
  src="http://bank.com/transfer?to=attacker&amount=10000"
  style="display:none"
/>
```

**POST 型**：构造自动提交的表单：

```html
<form action="http://bank.com/transfer" method="POST" id="hack">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="10000" />
</form>
<script>
  document.getElementById("hack").submit();
</script>
```

:::

::: info 防御方案

- **CSRF Token（核心防御）**：服务器生成随机 Token 下发给客户端，客户端在每次敏感请求中携带该 Token，服务器校验一致性。攻击者无法获取 Token（受同源策略保护）。
- **SameSite Cookie 属性**：限制第三方请求携带 Cookie。`Strict` 仅允许同站请求携带；`Lax` 同站请求和部分跨站 GET 可携带（推荐）；`None` 允许所有跨站请求（需配合 `Secure`）。
- **Referer/Origin 校验**：检查请求头中的来源信息，验证是否为可信域名。
- **双重 Cookie 验证**：将 Token 同时存储在 Cookie 中，前端读取后放入请求体，后端比对两者是否一致。
- **高风险操作二次确认**：转账、修改密码等操作强制要求验证码或重新认证。

:::

## Node.js 中的 SQL 注入

SQL 注入是指攻击者通过用户输入，将恶意 SQL 代码插入到数据库查询中，从而改变原始查询逻辑，实现未授权的数据读取、修改甚至删除。

::: info 攻击示例

```js
// 危险：直接拼接用户输入
const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
```

如果攻击者输入：

```
Password: ' OR '1'='1
```

最终执行的 SQL 变为：

```sql
SELECT * FROM users WHERE email = 'anything' AND password = '' OR '1'='1'
```

`'1'='1'` 恒为真，导致绕过认证。

更严重的情况，攻击者输入 `' OR 1=1; DROP TABLE users;--`，可能直接删除整张表。

:::

::: info 防御方案

**方案一：参数化查询（最核心）**

使用占位符 `?` 代替字符串拼接，数据库会将输入视为纯数据而非可执行 SQL：

```js
// 安全：使用参数化查询
const query = "SELECT * FROM users WHERE email = ? AND password = ?";
connection.execute(query, [email, password], (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

**方案二：使用 ORM 框架**

Sequelize、Prisma、Knex.js 等 ORM 工具默认使用参数化查询，从设计上防止注入：

```js
// 使用 Sequelize
const user = await User.findOne({
  where: { email: email, password: password },
});

// 使用 Prisma
const user = await prisma.user.findFirst({
  where: { email: email, password: password },
});
```

**方案三：输入验证**

对所有用户输入进行类型、格式、长度校验：

```js
import validator from "validator";

if (!validator.isEmail(email)) {
  throw new Error("Invalid email");
}
```

**方案四：限制数据库权限**

为应用程序创建专用数据库用户，仅授予必要的 `SELECT`、`INSERT`、`UPDATE` 权限，禁止 `DROP`、`ALTER` 等高危操作，降低被注入后的破坏范围。

:::
