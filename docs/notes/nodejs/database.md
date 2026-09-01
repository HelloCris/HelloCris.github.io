# 数据库

## 基本概念

**数据库（database）** 是用来组织、存储和管理数据的仓库。用户可以对数据库中的数据进行新增、查询、更新、删除等操作。

::: info 常见的数据库及分类

市面上的数据库有很多种，最常见的数据库有如下几个：

- MySQL 数据库（目前使用最广泛、流行度最高的开源免费数据库；Community + Enterprise）
- Oracle 数据库（收费）
- SQL Server 数据库（收费）
- MongoDB 数据库（Community + Enterprise）

其中，MySQL、Oracle、SQL Server 属于传统型数据库（又叫做：关系型数据库 或 SQL 数据库），这三者的设计理念相同，用法比较类似。  
而 MongoDB 属于新型数据库（又叫做：非关系型数据库 或 NoSQL 数据库），它在一定程度上弥补了传统型数据库的缺陷。

:::

> 在传统型数据库中，数据的组织结构分为数据库(database)、数据表(table)、数据行(row)、字段(field)这 4 大部分组成。类似于Excel的工作簿、工作表、每一行数据、列。

## 安装并配置 MySQL

对于开发人员来说，只需要安装 **MySQL Server** 和 **MySQL Workbench** 这两个软件，就能满足开发的需要了。

- **MySQL Server**: 专门用来提供数据存储和服务的软件。
- **MySQL Workbench**: 可视化的 MySQL 管理工具，通过它，可以方便的操作存储在 MySQL Server 中的数据。

## 使用SQL管理数据库

### 概述

**1. 什么是 SQL**

SQL（Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。

三个关键点：

1. SQL 是一门数据库编程语言
2. 使用 SQL 语言编写出来的代码，叫做 SQL 语句
3. SQL 语言只能在关系型数据库中使用（例如 MySQL、Oracle、SQL Server）。非关系型数据库（例如 MongoDB）不支持 SQL 语言

---

**2. SQL 的学习目标**

> 重点掌握如何使用 SQL 从数据表中：
>
> 查询数据（select）、插入数据（insert into）、更新数据（update）、删除数据（delete）

> 额外需要掌握的 4 种 SQL 语法：
>
> where 条件、and 和 or 运算符、order by 排序、count(\*) 函数

### 增删改查

**1. 增**

```
INSERT INTO 语句用于向数据表中插入新的数据行，语法格式如下：

1 -- 语法解读: 向指定的表中, 插入如下几列数据, 列的值通过 values ——指定
2 -- 注意: 列和值要一一对应, 多个列和多个值之间, 使用英文的逗号分隔
3 INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,...)
```

---

**2. 删**

```
DELETE 语句用于删除表中的行。语法格式如下：

1 -- 语法解读:
2 -- 从指定的表中, 根据 WHERE 条件, 删除对应的数据行
3 DELETE FROM 表名称 WHERE 列名称 = 值
```

---

**3. 改**

```
Update 语句用于修改表中的数据。语法格式如下：

1 -- 语法解读:
2 -- 1. 用 UPDATE 指定要更新哪个表中的数据
3 -- 2. 用 SET 指定列对应的新值
4 -- 3. 用 WHERE 指定更新的条件
5 UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值

6

7 -- 更新多列示例：
8 update users set password='admin123', status=1 where id=2

```

---

**4. 查**

```
SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。语法格式如下：

1 -- 这是注释
2 -- 从 FROM 指定的【表中】，查询出【所有的】数据。 * 表示【所有列】
3 SELECT * FROM 表名称

4

5 -- 从 FROM 指定的【表中】，查询出指定 列名称（字段）的数据。
6 SELECT 列名称 FROM 表名称

```

::: warning ⚠️ 注意

SQL 语句中的关键字对大小写不敏感。SELECT 等效于 select，FROM 等效于 from。  
多个列使用英文逗号进行分隔

:::

### where、and和or

**1. where**

WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准。

```sql
1 -- 查询语句中的 WHERE 条件
2 SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
3 -- 更新语句中的 WHERE 条件
4 UPDATE 表名称 SET 列=新值 WHERE 列 运算符 值
5 -- 删除语句中的 WHERE 条件
6 DELETE FROM 表名称 WHERE 列 运算符 值
```

下面的运算符可在 WHERE 子句中使用，用来限定选择的标准：

| 操作符  | 描述         |
| ------- | ------------ |
| =       | 等于         |
| <>      | 不等于       |
| >       | 大于         |
| <       | 小于         |
| >=      | 大于等于     |
| <=      | 小于等于     |
| BETWEEN | 在某个范围内 |
| LIKE    | 搜索某种模式 |

注意：在某些版本的 SQL 中，操作符 `<>` 可以写为 `!=`

::: info 示例：通过WHERE子句来限定SELECT条件

```sql
1 -- 查询 status 为 1 的所有用户
2 SELECT * FROM users WHERE status=1
3 -- 查询 id 大于 2 的所有用户
4 SELECT * FROM users WHERE id>2
5 -- 查询 username 不等于 admin 的所有用户
6 SELECT * FROM users WHERE username<>'admin'
```

:::

---

**2. AND 和 OR**

AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。

AND 表示必须同时满足多个条件，相当于 JavaScript 中的 `&&` 运算符，例如 `if (a !== 10 && a !== 20)`

OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 `||` 运算符，例如 `if(a !== 10 || a !== 20)`

### 排序order by

ORDER BY 语句用于根据指定的列对结果集进行排序。  
ORDER BY 语句默认按照升序对记录进行排序。  
如果您希望按照降序对记录进行排序，可以使用 DESC 关键字。

1. ORDER BY 子句 - 升序排序

对 users 表中的数据，按照 status 字段进行升序排序，示例如下：

```sql
1 -- 注意：如下两条 SQL 语句是等价的,
2 --        因为 ORDER BY 默认进行升序排序;
3 --        其中，ASC 关键字代表升序排序
4 SELECT * FROM users ORDER BY status;
5 SELECT * FROM users ORDER BY status ASC;
```

---

2. ORDER BY 子句 – 降序排序

对 users 表中的数据，按照 id 字段进行降序排序，示例如下：

```sql
1 -- 注意：DESC 代表降序排序
2 SELECT * FROM users ORDER BY id DESC
```

---

3. ORDER BY 子句 – 多重排序

对 users 表中的数据，先按照 status 字段进行降序排序，再按照 username 的字母顺序，进行升序排序，示例如下：

```sql
1 -- 注意：DESC 代表降序排序
2 SELECT * FROM users ORDER BY status DESC, username ASC
```

### count函数和as关键字

`COUNT(*)` 函数用于返回查询结果的总数据条数，语法格式如下：

```sql
1 SELECT COUNT(*) FROM 表名称
```

示例：查询 `users` 表中 `status` 为 `0` 的总数据条数：

```sql
1 SELECT COUNT(*) FROM users WHERE status=0
```

如果希望给查询出来的列名称设置别名，可以使用 `AS` 关键字，示例如下：

```sql
1 -- 将列名称从 COUNT(*) 修改为 total
2 SELECT COUNT(*) AS total FROM users WHERE status=0
```

```sql
1 -- 使用 AS 关键字给列起别名
2 -- select count(*) as total from users where status=0
3 select username as uname, password as upwd from users
```

## nodejs中使用MySQL

### 引入MySQL模块

**在项目中操作数据库的步骤**

1. 安装操作 MySQL 数据库的第三方模块（mysql）
2. 通过 mysql 模块连接到 MySQL 数据库
3. 通过 mysql 模块执行 SQL 语句

**1. 安装 mysql 模块**

`mysql` 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

想要在项目中使用它，需要先运行如下命令，将 `mysql` 安装为项目的依赖包：

```bash
npm install mysql2
```

---

**2. 配置 mysql 模块**

在使用 `mysql` 模块操作 MySQL 数据库之前，必须先对 `mysql` 模块进行必要的配置，主要的配置步骤如下：

```js
// 1. 导入 mysql 模块
const mysql = require("mysql2");
// 2. 建立与 MySQL 数据库的连接
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: "admin123", // 登录数据库的密码
  database: "my_db_01", // 指定要操作哪个数据库
});
```

---

**3. 测试 mysql 模块能否正常工作**

调用 `db.query()` 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果：

```js
// 检测 mysql 模块能否正常工作
db.query("SELECT 1", (err, results) => {
  if (err) return console.log(err.message);
  // 只要能打印出 [ RowDataPacket { '1': 1 } ] 的结果，就证明数据库连接正常
  console.log(results);
});
```

### 增删改查

**1. 查询数据**

查询 `users` 表中所有的数据：

```js
// 查询 users 表中所有的用户数据
db.query("SELECT * FROM users", (err, results) => {
  // 查询失败
  if (err) return console.log(err.message);
  // 查询成功
  console.log(results);
});
```

---

**2. 插入数据**

向 `users` 表中新增数据，其中 `username` 为 `Spider-Man`，`password` 为 `pcc321`。示例代码如下：

```js
// 1. 要插入到 users 表中的数据对象
const user = { username: "Spider-Man", password: "pcc321" };
// 2. 待执行的 SQL 语句，其中英文的 ? 表示占位符
const sqlStr = "INSERT INTO users (username, password) VALUES (?, ?)";
// 3. 使用数组的形式，依次为 ? 占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, results) => {
  if (err) return console.log(err.message); // 失败
  if (results.affectedRows === 1) {
    console.log("插入数据成功");
  } // 成功
});
```

---

**3. 插入数据的便捷方式**

向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据：

```js
// 1. 要插入到 users 表中的数据对象
const user = { username: "Spider-Man2", password: "pcc4321" };
// 2. 待执行的 SQL 语句，其中英文的 ? 表示占位符
const sqlStr = "INSERT INTO users SET ?";
// 3. 直接将数据对象当作占位符的值
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message); // 失败
  if (results.affectedRows === 1) {
    console.log("插入数据成功");
  } // 成功
});
```

---

**4. 更新数据**

可以通过如下方式，更新表中的数据：

```js
// 1. 要更新的数据对象
const user = { id: 7, username: "aaa", password: "000" };
// 2. 要执行的 SQL 语句
const sqlStr = "UPDATE users SET username=?, password=? WHERE id=?";
// 3. 调用 db.query() 执行 SQL 语句的同时，使用数组依次为占位符指定具体的值
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message); // 失败
  if (results.affectedRows === 1) {
    console.log("更新数据成功!");
  } // 成功
});
```

---

**5. 更新数据的便捷方式**

更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速更新表数据：

```js
// 1. 要更新的数据对象
const user = { id: 7, username: "aaaa", password: "0000" };
// 2. 要执行的 SQL 语句
const sqlStr = "UPDATE users SET ? WHERE id=?";
// 3. 调用 db.query() 执行 SQL 语句的同时，使用数组依次为占位符指定具体的值
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message); // 失败
  if (results.affectedRows === 1) {
    console.log("更新数据成功!");
  } // 成功
});
```

---

**6. 删除数据**

在删除数据时，推荐根据 `id` 这样的唯一标识，来删除对应的数据。示例如下：

```js
// 1. 要执行的 SQL 语句
const sqlStr = "DELETE FROM users WHERE id=?";
// 2. 调用 db.query() 执行 SQL 语句的同时，为占位符指定具体的值
// 注意：如果 SQL 语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
//       如果 SQL 语句中只有一个占位符，则可以省略数组
db.query(sqlStr, 7, (err, results) => {
  if (err) return console.log(err.message); // 失败
  if (results.affectedRows === 1) {
    console.log("删除数据成功!");
  } // 成功
});
```

---

**7. 标记删除**

使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。

所谓的标记删除，就是在表中设置类似于 `status` 这样的状态字段，来标记当前这条数据是否被删除。

当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 `status` 字段标记为删除即可。

```js
// 标记删除：使用 UPDATE 语句替代 DELETE 语句；只更新数据的状态，并没有真正删除
db.query("UPDATE users SET status=1 WHERE id=?", 6, (err, results) => {
  if (err) return console.log(err.message); // 失败
  if (results.affectedRows === 1) {
    console.log("删除数据成功!");
  } // 成功
});
```

## 附录

### 附录1: `mysql2/promise`导入方式

```js
const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "my_db_01",
});

// 查询示例
const [rows] = await db.query("SELECT * FROM users");
console.log(rows);

db.query("SELECT 1").then(([results]) => {
  console.log(results); // [ RowDataPacket { '1': 1 } ]
});
```

::: warning ⚠️ 注意
`mysql2` 和 `mysql2/promise` 最核心的区别之一：

- `require("mysql2")`：`query(sql, callback)` 走回调风格，第二个参数是回调函数
- `require("mysql2/promise")`：`query()` **只返回 Promise，不认回调**
  :::
