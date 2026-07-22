# 常用 API 与 异常处理

## String

String 代表字符串类型，java 中所有带双引号的字符串都是 String 类的对象。

> 字符串特点
>
> - 字符串在创建后不可改变，但是可以共享。
> - 字符串效果相当于是 `char[]`，但底层原理是字节数组 `byte[]`。

### String 构造方法

| 方法名                      | 说明                                       |
| :-------------------------- | :----------------------------------------- |
| `public String()`           | 创建一个空白字符串对象，不含有任何内容     |
| `public String(char[] chs)` | 根据字符数组的内容，来创建字符串对象       |
| `public String(byte[] bys)` | 根据字节数组的内容，来创建字符串对象       |
| `String s = "abc";`         | 直接赋值的方式创建字符串对象，内容就是 abc |

::: info String 对象的特点

1. 通过 `new` 创建的字符串对象，每一次 `new` 都会创建一个内存空间。
2. 以 `""` 方式创建的字符串对象，只要字符串内容相同，无论重复出现几次，JVM 只会创建一个 String 对象，在字符串池中维护。

```java
char[] c = {'a', 'b', 'c'};
String s1 = new String(c);
String s2 = new String(c);
System.out.println(s1 == s2); // false

String s3 = "abc";
String s4 = "abc";
System.out.println(s3 == s4); // true
```

:::

::: info 比较字符串

不能用 `==`，引用类型 `==` 是比较的地址，字符串比较内容用 `equals`。

```java
char[] c = {'a', 'b', 'c'};
String s1 = new String(c);
String s2 = new String(c);
System.out.println(s1.equals(s2)); // true
```

:::

```java
"abcd".charAt(1) // 传入下标，返回对应字符
```

### StringBuilder

**概述：** 普通的 String 对象进行拼接，每次都会创建新的 String 对象，浪费内存空间；StringBuilder 就是解决此问题。

**概念：** StringBuilder 是一个可变的字符串类，内容是可变。

**使用：**

```java
StringBuffer sb = new StringBuffer("abcd"); // 用构造创建sb对象
StringBuffer sb2 = sb.append("1243");       // append拼接数据，返回数据本身
System.out.println(sb2);                    // abcd1243
System.out.println(sb == sb2);              // true
```

**reverse 方法：**

```java
sb2.reverse();              // 反转
System.out.println(sb2);    // 3421dcba
```

::: info Sting 和 StringBuilder 相互转换

- **s 转 sb：** 放入 sb 构造就行
- **sb 转 s：** 调用 s 的 `toString` 方法

:::

## 补充内容

### Math 类

Math 包含执行基本数字运算的方法。

**没有构造方法，如何使用类中的成员呢？**  
看类的成员是否都是静态的，如果是，通过类名就可以直接调用。

| 方法名                                        | 说明                                           |
| :-------------------------------------------- | :--------------------------------------------- |
| `public static int abs(int a)`                | 返回参数的绝对值                               |
| `public static double ceil(double a)`         | 返回大于或等于参数的最小double值，等于一个整数 |
| `public static double floor(double a)`        | 返回小于或等于参数的最大double值，等于一个整数 |
| `public static int round(float a)`            | 按照四舍五入返回最接近参数的int                |
| `public static int max(int a,int b)`          | 返回两个int值中的较大值                        |
| `public static int min(int a,int b)`          | 返回两个int值中的较小值                        |
| `public static double pow(double a,double b)` | 返回a的b次幂的值                               |
| `public static double random()`               | 返回值为double的正值，[0.0,1.0)                |

### System 类

System 类的常用方法

| 方法名                                   | 说明                                         |
| :--------------------------------------- | :------------------------------------------- |
| `public static void exit(int status)`    | 终止当前运行的 Java 虚拟机，非零表示异常终止 |
| `public static long currentTimeMillis()` | 返回当前时间(以毫秒为单位)                   |

### Object 类

Object 是类层次结构的根，每个类都可以将 Object 作为超类。所有类都直接或者间接的继承自该类。  
构造方法：`public Object()`

**回想面向对象中，为什么说子类的构造方法默认访问的是父类的无参构造方法？**  
因为它们的顶级父类只有无参构造方法。

**Object 类的常用方法**

| 方法名                              | 说明                                                       |
| :---------------------------------- | :--------------------------------------------------------- |
| `public String toString()`          | 返回对象的字符串表示形式。建议所有子类重写该方法，自动生成 |
| `public boolean equals(Object obj)` | 比较对象是否相等。默认比较地址，重写可以比较内容，自动生成 |

### Array 类

Arrays 类包含用于操作数组的各种方法。

| 方法名                                   | 说明                               |
| :--------------------------------------- | :--------------------------------- |
| `public static String toString(int[] a)` | 返回指定数组的内容的字符串表示形式 |
| `public static void sort(int[] a)`       | 按照数字顺序排列指定的数组         |

**工具类的设计思想：**

- 构造方法用 `private` 修饰
- 成员用 `public static` 修饰

### Date 类

**Date 类概述和构造方法**

Date 代表了一个特定的时间，精确到毫秒。

| 方法名                   | 说明                                                              |
| :----------------------- | :---------------------------------------------------------------- |
| `public Date()`          | 分配一个 Date对象，并初始化，以便它代表它被分配的时间，精确到毫秒 |
| `public Date(long date)` | 分配一个 Date对象，并将其初始化为表示从标准基准时间起指定的毫秒数 |

**Date 类的常用方法**

| 方法名                           | 说明                                                  |
| :------------------------------- | :---------------------------------------------------- |
| `public long getTime()`          | 获取的是日期对象从1970年1月1日 00:00:00到现在的毫秒值 |
| `public void setTime(long time)` | 设置时间，给的是毫秒值                                |

### SimpleDateFormat 类

SimpleDateFormat 是一个具体的类，用于以区域设置敏感的方式格式化和解析日期。我们重点学习**日期格式化和解析**。

日期和时间格式由日期和时间模式字符串指定，在日期和时间模式字符串中，从 'A' 到 'Z' 以及从 'a' 到 'z' 引号的字母被解释为表示日期或时间字符串的组件的模式字母。

**常用的模式字母及对应关系如下：**

- y —— 年
- M —— 月
- d —— 日
- H —— 时
- m —— 分
- s —— 秒

**SimpleDateFormat 的构造方法**

| 方法名                                    | 说明                                                   |
| :---------------------------------------- | :----------------------------------------------------- |
| `public SimpleDateFormat()`               | 构造一个SimpleDateFormat，使用默认模式和日期格式       |
| `public SimpleDateFormat(String pattern)` | 构造一个SimpleDateFormat使用给定的模式和默认的日期格式 |

**SimpleDateFormat 格式化和解析日期**

1.  **格式化(从 Date 到 String)**
    `public final String format(Date date)`：将日期格式化成日期/时间字符串
2.  **解析(从 String 到 Date)**
    `public Date parse(String source)`：从给定字符串的开始解析文本以生成日期

### Calendar 类

**Calendar 类概述**

Calendar 为某一时刻和一组日历字段之间的转换提供了一些方法，并为操作日历字段提供了一些方法。

Calendar 提供了一个类方法 getInstance 用于获取 Calendar 对象，其日历字段已使用当前日期和时间初始化：
`Calendar rightNow = Calendar.getInstance();`

**Calendar 的常用方法**

| 方法名                                               | 说明                                                   |
| :--------------------------------------------------- | :----------------------------------------------------- |
| `public int get(int field)`                          | 返回给定日历字段的值                                   |
| `public abstract void add(int field, int amount)`    | 根据日历的规则，将指定的时间量添加或减去给定的日历字段 |
| `public final void set(int year,int month,int date)` | 设置当前日历的年月日                                   |

## 包装类型

**概述**：将基本数据类型以及一些方法包装在一个类中。

| 基本数据类型 | 包装类    |
| :----------- | :-------- |
| byte         | Byte      |
| short        | Short     |
| int          | Integer   |
| long         | Long      |
| float        | Float     |
| double       | Double    |
| char         | Character |
| boolean      | Boolean   |

::: info int 和 String 的相互转换

基本类型包装类的最常见操作就是：用于基本类型和字符串之间的相互转换。

1.  **int 转换为 String**
    `public static String valueOf(int i)`：返回 int 参数的字符串表示形式。该方法是 String 类中的方法。

2.  **String 转换为 int**
    `public static int parseInt(String s)`：将字符串解析为 int 类型。该方法是 Integer 类中的方法。

:::

::: info 自动装箱和拆箱

- **装箱**：把基本数据类型转换为对应的包装类类型
- **拆箱**：把包装类类型转换为对应的基本数据类型

```java
Integer i = 100;      // 自动装箱
i += 200;             // i = i + 200;  i + 200 自动拆箱；i = i + 200; 是自动装箱
```

**注意**：在使用包装类类型的时候，如果做操作，最好先判断是否为 null。
我们推荐的是，只要是对象，在使用前就必须进行不为 null 的判断。
:::

## 异常

**Throwable** 是所有异常的超类。  
**异常**：就是程序出现了不正常的情况。

**异常体系**

- **Throwable**
  - **Error**：严重问题，不需要处理。
  - **Exception**：称为异常类，它表示程序本身可以处理的问题。
    - **RuntimeException**：在编译期是不检查的，出现问题后，需要我们回来修改代码。
    - **非 RuntimeException**：编译期就必须处理的，否则程序不能通过编译，就更不能正常运行了。

**Throwable 的成员方法**

| 方法名                          | 说明                              |
| :------------------------------ | :-------------------------------- |
| `public String getMessage()`    | 返回此 throwable 的详细消息字符串 |
| `public String toString()`      | 返回此可抛出的简短描述            |
| `public void printStackTrace()` | 把异常的错误信息输出在控制台      |

### 异常处理

- try...catch

try 代码块中出现异常时，会生成异常对象，该对象交给 java 运行时系统，系统收到异常时，会到 catch 中去找匹配的异常，找到后进行处理。

```java
try {
    System.out.println(arr[3]);
} catch (ArrayIndexOutOfBoundsException e) { // 必须加上异常类型
    e.printStackTrace(); // printStackTrace()方法继承自Throwable类
}
```

- throws

**格式（在方法名处）：** `public void teach (int score) throws ScoreException{...}`  
在方法名用 throws 后，表示这个方法后面可能出现异常，调用方法时还要处理。

- throw

**格式：** `throw new ScoreException("分数有误哦");`  
直接抛出异常，抛出后需立即处理；如果使用了 throws，则在方法调用的时候处理。

---

::: info JVM 的默认异常处理方案

如果程序出现了问题，我们没有做任何处理，最终 JVM 会做默认的处理：

- 把异常的名称，异常原因及异常出现的位置等信息输出在了控制台。
- 程序停止执行。

:::

### 编译时异常和运行时异常

也被称为受检异常和非受检异常。

- **编译时异常**：必须显式处理，否则程序就会发生错误（程序有可能有问题，所以必须处理）。
- **运行时异常**：无需显式处理，或者也可以以处理；**RuntimeException 类及其子类是运行时异常**，其他都是编译时异常。
