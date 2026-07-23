# Java 高级特性与实战基础

## File

**File 概述**

- **定义**：是文件和文件夹的路径的抽象表示。
- **特性**：对于 File 而言，其封装的不是真正存在的文件，仅仅是一个路径名，它可以存在也可以不存在。
- **作用**：将来通过具体操作把这个路径内存转为具体存在。

**构造方法**

| 方法名                              | 说明                                                         |
| :---------------------------------- | :----------------------------------------------------------- |
| `File(String pathname)`             | 通过将给定的路径名字符串转换为抽象路径名来创建新的 File 实例 |
| `File(String parent, String child)` | 从父路径名字符串和子路径名字符串创建新的 File 实例           |
| `File(File parent, String child)`   | 从父抽象路径名和子路径名字符串创建新的 File 实例             |

---

**File 类各功能方法**

1. 创建功能

| 方法名                           | 说明                                                             |
| :------------------------------- | :--------------------------------------------------------------- |
| `public boolean createNewFile()` | 当具有该名称的文件不存在时，创建一个由该抽象路径名命名的新空文件 |
| `public boolean mkdir()`         | 创建由此抽象路径名命名的目录                                     |
| `public boolean mkdirs()`        | 创建由此抽象路径名命名的目录，包括任何必需但不存在的父目录       |

> **eg**: 创建 File 对象后，调用这些方法会创建对应文件或文件夹，并返回 true，如已存在文件，则返回 false。

```java
File f1 = new File("C:\\Users\\小陈儿\\Desktop\\aspose\\java.txt");
System.out.println(f1.createNewFile());
File f2 = new File("C:\\Users\\小陈儿\\Desktop\\aspose\\mulu");
System.out.println(f2.mkdir());
File f3 = new File("C:\\Users\\小陈儿\\Desktop\\aspose\\多级\\里级");
System.out.println(f3.mkdirs());
```

2. File 类判断和获取功能

| 方法名                            | 说明                                                     |
| :-------------------------------- | :------------------------------------------------------- |
| `public boolean isDirectory()`    | 测试此抽象路径名表示的 File 是否为目录                   |
| `public boolean isFile()`         | 测试此抽象路径名表示的 File 是否为文件                   |
| `public boolean exists()`         | 测试此抽象路径名表示的 File 是否存在                     |
| `public String getAbsolutePath()` | 返回此抽象路径名的绝对路径名字符串                       |
| `public String getPath()`         | 将此抽象路径名转换为路径名字符串                         |
| `public String getName()`         | 返回由此抽象路径名表示的文件或目录的名称                 |
| `public String[] list()`          | 返回此抽象路径名表示的目录中的文件和目录的名称字符串数组 |
| `public File[] listFiles()`       | 返回此抽象路径名表示的目录中的文件和目录的 File 对象数组 |

3. File 删除功能

| 方法名                    | 说明                               |
| :------------------------ | :--------------------------------- |
| `public boolean delete()` | 删除由此抽象路径名表示的文件或目录 |

> **注意**：删除目录前，必须删除目录中的所有文件；添加文件前，要保证父目录存在。

## IO 流

### 概述

- **I/O**：输入输出。
- **流**：抽象概念，数据传输的总称；数据在设备间传输也称为流。
- **IO 流的作用**：就是处理设备间数据传输的，如文件复制、上传、下载。

**IO 流分类**

1.  **按数据流向分**：为输入流（读数据）和输出流（写数据）。
2.  **按数据类型分**：为字节流和字符流（Window 记事本能打开的就是用字符流，其他是字节流）。

### 字节流

- **字节流**
  - **字节输入流 (InputStream)**
    - FileInputStream
    - BufferedInputStream
  - **字节输出流 (OutputStream)**
    - FileOutputStream
    - BufferedOutputStream

**小结**：字节流可以复制任意文件数据，有4种方式，一般采用字节缓冲流一次读写一个字节数组的方式。  
**InputStream**：这个抽象类是表示字节输入流的所有类的超类。  
**OutputStream**：这个抽象类是表示字节输出流的所有类的超类。  
**子类名特点**：子类名称都是以其父类名作为子类名的后缀。

#### 字节流写数据

- **FileOutputStream**：文件输出流将数据写入文件。

```java
//这里做了3步操作 1) 调用系统功能创建文件 2) 创建字节输出流对象 3) 让对象指向文件
FileOutputStream fos = new FileOutputStream("idea_test//hello.txt");

//将指定字节写入此文件输出流
fos.write(98);

//也可写入多个字节
//byte[] bys = {97, 98, 99};
//fos.write(bys);

//释放资源
fos.close();
```

::: info 写入的3种方式

| 方法名                                   | 说明                                                                                           |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `void write(int b)`                      | 将指定的字节写入此文件输出流一次写一个字节数据                                                 |
| `void write(byte[] b)`                   | 将 b.length 字节从指定的字节数组写入此文件输出流一次写一个字节数组数据                         |
| `void write(byte[] b, int off, int len)` | 将 len 字节从指定的字节数组开始，从偏移量 off 开始写入此文件输出流一次写一个字节数组的部分数据 |

:::

- **补充**：字符串转换成对应的字节数组，`byte[] bys = "abcde".getBytes();`

---

::: info 字节流写数据的两个小问题

**1. 字节流写数据如何实现换行呢？**
写完数据后，加换行符：

- Windows: `\r\n`
- Linux: `\n`
- Mac: `\r`

**2. 字节流写数据如何实现追加写入呢？**

- `public FileOutputStream(String name, boolean append)`
- 创建文件输出流以指定的名称写入文件。如果第二个参数为 true，则字节将写入文件的末尾而不是开头。

```java
//写数据
for (int i = 0; i < 10; i++) {
    fos.write("hello".getBytes());
    fos.write("\r\n".getBytes());
}
```

:::

::: info 字节流写数据加异常处理

- **finally**：在异常处理时提供 finally 块来执行所有清除操作。比如说 IO 流中的释放资源。
- **特点**：被 finally 控制的语句一定会执行，除非 JVM 退出。

**标准格式：**

```java
try {
    可能出现异常的代码;
} catch (异常类名 变量名) {
    异常的处理代码;
} finally {
    执行所有清除操作;
}
```

**代码示例（加入 finally 来实现释放资源）：**

```java
FileOutputStream fos = null;
try {
    fos = new FileOutputStream(name: "myByteStream\\fos.txt");
    fos.write("hello".getBytes());
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fos != null) {
        try {
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

:::

#### 字节流读数据

**FileInputStream**：从系统文件读取数据。

1. 一次读一个字节

```java
//这里打开实际文件的连接 创建了字节输入流对象，
FileInputStream fis = new FileInputStream("idea_test//hello.txt");

//调用字节输入流的read方法 返回1个字节的int值，找不到会返回-1
int read = fis.read();
System.out.println(read);
fis.close();
```

2. 一次读一个字节方式读文件的标准写法

```java
int by;
/*
    fis.read(): 读数据
    by=fis.read(): 把读取到的数据赋值给by
    by != -1: 判断读取到的数据是否是-1
*/
while ((by=fis.read())!=-1) {
    System.out.print((char)by);
}
```

3. 一次读取多个字节

**基础示例：**

```java
FileInputStream fis = new FileInputStream("idea_test//hello.txt");
//创建字节数组
byte[] cs = new byte[5];
//传入数组，数据会进入此数组，并返回实际存入的数量
int len = fis.read(cs);
System.out.println(new String(cs));
```

**标准循环读取示例：**

```java
byte[] bys = new byte[1024]; //1024及其整数倍
int len;
while ((len=fis.read(bys))!=-1) {
    System.out.print(new String(bys, 0, len));
}
```

#### 字节缓冲流

- **BufferedInputStream**：输入缓冲流，内部有缓冲数组。
- **BufferedOutputStream**：输出缓冲流，这种流可以写入字节，但又不直接调系统底层。
- **原理说明**：字节缓冲流仅仅提供缓冲区，真正读写数据还是要普通的字节流对象。

```java
//两种缓冲流都要传入基本的字节流对象

BufferedInputStream fis = new BufferedInputStream(new FileInputStream("C:\\Users\\小陈儿\\Desktop\\aspose\\code.mp4"));
BufferedOutputStream fos = new BufferedOutputStream(new FileOutputStream("idea_test\\code.mp4"));

byte[] bys = new byte[1024];
int len;
while ((len = fis.read(bys)) != -1) {
    fos.write(bys, 0, len);
}

fis.close();
fos.close();
```

### 字符流

- **字符流**
  - **字符输入流 (Reader)**
    - InputStreamReader
      - FileReader
    - BufferedReader
      - _特有功能_：`String readLine()` —— 一次读取一个字符串
  - **字符输出流 (Writer)**
    - OutputStreamWriter
      - FileWriter
    - BufferedWriter
      - _特有功能_：`void newLine()` —— 写一个换行符；`void write(String line)` —— 一次写一个字符串

> **小结**：字符流只能复制文本数据，有5种方式，一般采用字符缓冲流的特有功能。

::: info 为什么会出现字符流

- 由于字节流操作中文不是特别的方便，所以Java就提供字符流。
- **公式**：字符流 = 字节流 + 编码表
- **原理解析**：用字节流复制文本文件时，文本文件也会有中文，但是没有问题，原因是最终底层操作会自动进行字节拼接成中文。
  - _如何识别是中文的呢？_ 汉字在存储的时候，无论选择哪种编码存储，第一个字节都是负数。

:::

::: info 编码表

**基础知识：**

- 计算机中储存的信息都是用**二进制数**表示的；我们在屏幕上看到的英文、汉字等字符是二进制数转换之后的结果。
- 按照某种规则，将字符存储到计算机中，称为**编码**。反之，将存储在计算机中的二进制数按照某种规则解析显示出来，称为**解码**。这里强调一下：按照A编码存储，必须按照A编码解析，这样才能显示正确的文本符号，否则就会导致乱码现象。
- **字符编码**：就是一套自然语言的字符与二进制数之间的对应规则(A-65)。

**字符集：**

- 是一个系统支持的所有字符的集合，包括各国家文字、标点符号、图形符号、数字等。
- 计算机要准确的存储和识别各种字符集符号，就需要进行字符编码，一套字符集必然至少有一套字符编码。常见字符集有ASCII字符集、GBXXX字符集、Unicode字符集等。

**ASCII字符集：**

- **ASCII** (American Standard Code for Information Interchange, 美国信息交换标准代码)：是基于拉丁字母的一套电脑编码系统，用于显示现代英语，主要包括控制字符(回车键、退格、换行键等)和可显示字符(英文大小写字符、阿拉伯数字和西文符号)。
- 基本的ASCII字符集，使用7位表示一个字符，共128字符。ASCII的扩展字符集使用8位表示一个字符，共256字符，方便支持欧洲常用字符。是一个系统支持的所有字符的集合，包括各国家文字、标点符号、图形符号、数字等。

**GBXXX字符集：**

- **GB2312**：简体中文码表。一个小于127的字符的意义与原来相同，但两个大于127的字符连在一起时，就表示一个汉字，这样大约可以组合了包含7000多个简体汉字，此外数学符号、罗马希腊的字母、日文的假名等都编进去了，连在ASCII里本来就有的数字、标点、字母都统统重新编了两个字节长的编码，这就是常说的"全角"字符，而原来在127号以下的那些就叫"半角"字符了。
- **GBK**：最常用的中文码表。是在GB2312标准基础上的扩展规范，使用了双字节编码方案，共收录了21003个汉字，完全兼容GB2312标准，同时支持繁体汉字以及日韩汉字等。
- **GB18030**：最新的中文码表。收录汉字70244个，采用多字节编码，每个字可以由1个、2个或4个字节组成。支持中国国内少数民族的文字，同时支持繁体汉字以及日韩汉字等。

**Unicode字符集：**

- 为表达任意语言的任意字符而设计，是业界的一种标准，也称为统一码、标准万国码。它最多使用4个字节的数字来表达每个字母、符号，或者文字。有三种编码方案，UTF-8、UTF-16和UTF32。最为常用的UTF-8编码。
- **UTF-8编码**：可以用来表示Unicode标准中任意字符，它是电子邮件、网页及其他存储或传送文字的应用中，优先采用的编码。互联网工程工作小组（IETF）要求所有互联网协议都必须支持UTF-8编码。它使用一至四个字节为每个字符编码。
  - _编码规则_：
    - 128个US-ASCII字符，只需一个字节编码
    - 拉丁文等字符，需要二个字节编码
    - 大部分常用字（含中文），使用三个字节编码
    - 其他极少使用的Unicode辅助字符，使用四字节编码

> **小结**：采用何种规则编码，就要采用对应规则解码，否则就会出现乱码。

:::

#### 字符串编码解码操作

1. 编码
   - `byte[] getBytes()`：使用平台的默认字符集将该 String 编码为一系列字节，将结果存储到新的字节数组中。
   - `byte[] getBytes(String charsetName)`：使用指定的字符集将该 String 编码为一系列字节，将结果存储到新的字节数组中。

2. 解码
   - `String(byte[] bytes)`：通过使用平台的默认字符集解码指定的字节数组来构造新的 String。
   - `String(byte[] bytes, String charsetName)`：通过指定的字符集解码指定的字节数组来构造新的 String。

#### 字符流编码解码操作

1. 字符流抽象基类
   - **Reader**：字符输入流的抽象类。
   - **Writer**：字符输出流的抽象类。

2. 字符流中和编码解码问题相关的两个类
   - `InputStreamReader`
   - `OutputStreamWriter`

::: info OutputStreamWriter

- **定义**：是字符流通向字节流的桥梁，使用指定编码将写入字符编码为字节。

```java
//这里使用 GBK 编码将字符->字节
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("idea_test\\java.txt"), "GBK");
osw.write("写入");
osw.close();
```

**写入的 5 种方式：**

| 方法签名                                    | 说明                 |
| :------------------------------------------ | :------------------- |
| `void write(int c)`                         | 写一个字符           |
| `void write(char[] cbuf)`                   | 写入一个字符数组     |
| `void write(char[] cbuf, int off, int len)` | 写入字符数组的一部分 |
| `void write(String str)`                    | 写一个字符串         |
| `void write(String str, int off, int len)`  | 写一个字符串的一部分 |

**OutputStreamWriter 的两个常用方法：**

| 方法名    | 说明                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `flush()` | 刷新流，还可以继续写数据                                             |
| `close()` | 关闭流，释放资源，但是在关闭之前会先刷新流。一旦关闭，就不能再写数据 |

:::

::: info OutputStreamWriter 和 Reader 子类：FileReader / FileWriter（上面的简化版本）

1. 转换流的名字比较长，而我们常见的操作都是按照本地默认编码实现的，所以，为了简化书写，转换流提供了对应的子类。
2. **FileReader**：用于读取字符文件的便捷类
   - `FileReader(String fileName)`
3. **FileWriter**：用于写入字符文件的便捷类
   - `FileWriter(String fileName)`

:::

::: info InputStreamReader

- **定义**：字节流通向字符流的桥梁，读取字节，使用指定编码将其解码为字符。

**读取的 2 种方式：**

| 方法名                  | 说明                   |
| :---------------------- | :--------------------- |
| `int read()`            | 一次读一个字符数据     |
| `int read(char[] cbuf)` | 一次读一个字符数组数据 |

```java
InputStreamReader isr = new InputStreamReader(new FileInputStream("idea_test\\java.txt"), "GBK");
char[] ss = new char[2];
isr.read(ss);
System.out.println(Arrays.toString(ss));
```

:::

#### 字符缓冲流

**概述：** 字符缓冲流和字节缓冲流用法相似。

**字符缓冲流介绍**

- **BufferedWriter**：将文本写入字符输出流，缓冲字符，以提供单个字符、数组和字符串的高效写入。可以指定缓冲区大小，或者可以接受默认大小。默认值足够大，可用于大多数用途。
- **BufferedReader**：从字符输入流读取文本，缓冲字符，以提供字符、数组和行的高效读取。可以指定缓冲区大小，或者可以使用默认大小。默认值足够大，可用于大多数用途。

**构造方法**

- `BufferedWriter(Writer out)`
- `BufferedReader(Reader in)`

**缓冲流的读一行和写换行方法**

```java
BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\小陈儿\\Desktop\\javaA\\样例.txt"));
BufferedWriter bw = new BufferedWriter(new FileWriter("idea_test\\想写什么.txt"));

char[] str = new char[1024];
String len; // 注意：这里原图变量名定义为String类型，用于接收readLine()的返回值

while ((len = br.readLine()) != null) { // 读取一行数据，不会读取换行符
    bw.write(len);
    bw.newLine(); // 换行方法
}

bw.close();
br.close();
```

### 特殊操作流

#### 标准输入输出流

#### 打印流

#### 对象序列化流

#### Properties

## 二十四、线程

### 概述

### 多线程实现方式一：继承 Thread 类

- 设置获取线程名称
- 线程优先级
- 线程控制
- 线程生命周期

### 线程实现方式二 实现 Runnable 接口

### 多线程的安全问题及解决

- 同步代码
- Lock 锁
- 线程安全的类
- 生产者消费者

## 二十五、网络编程

### 网络编程三要素

### IP 地址

### InetAddress 的使用

### 端口

### 协议

### UDP 发送接收数据

### TCP 发送接收数据

## 二十六、Lambda 表达式

## 二十七、接口

### 接口组成概设

## 二十八、函数式编程

### 方法引用

### 函数式接口

### Stream 流

- 概述
- Stream 流生成方式
- Stream 流常见中间操作方法
- Stream 流终结方法
- Stream 收集操作

## 二十九、反射

### 类加载器

### java 反射操作

- 获取 class 类对象
- 获取构造并创建对象
- 反射获取成员变量
- 反射获取成员方法
- 反射练习：配置文件调用类方法

## 三十、补充知识

### 模块

- 模块的基本使用
- 模块服务的应用

### 进制

### 注解

- 注解概述
- 元注解
- 自定义注解
- XML
- CMD
