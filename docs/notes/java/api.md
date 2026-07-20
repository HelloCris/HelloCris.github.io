# 常用 API 与 异常处理

## 六、String

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

## 十四、补充内容

### Math 类

### System 类

### Object 类

### Array 类

### Date 类

### SimpleDateFormat 类

### Calendar 类

## 十五、包装类型

## 十六、异常

### 异常处理

- try...catch
- throws
- throw

### 编译时异常和运行时异常

### JVM 的默认异常处理方案
