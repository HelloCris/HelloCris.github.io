# Java 集合 (Collections)

## ArrayList

**概述**：普通数组长度固定，不能适应变化要求；这个时候就可以用集合了。  
**集合特点**：提供一种储存空间可变的储存模型，储存的数据容量可以方法改变。  
集合有很多，`ArrayList` 是其中一个。

::: info `ArrayList<E>`

- `<E>` 是一种特殊的数据类型，泛型。
- `<E>` 是集合中储存数据的数据类型。
- 在出现 `<E>` 地方用引用类型替换即可。
- `Arrlist` 是可调整数组大小的实现，底层还是数组。

:::

### 常用方法

**add**: 是插入方法，传一个值是插入到末尾，返回布尔值；两个是插入到指定位置，无返回。

```java
ArrayList<String> arr = new ArrayList<>();
arr.add("a");
arr.add("b");
arr.add(0, "我是第一个");
System.out.println(arr); // [我是第一个, a, b]
```

| 方法名                               | 说明                                   |
| :----------------------------------- | :------------------------------------- |
| `public boolean remove(Object o)`    | 删除指定的元素，返回删除是否成功       |
| `public E remove(int index)`         | 删除指定索引处的元素，返回被删除的元素 |
| `public E set(int index, E element)` | 修改指定索引处的元素，返回被修改的元素 |
| `public E get(int index)`            | 返回指定索引处的元素                   |
| `public int size()`                  | 返回集合中的元素的个数                 |

## 十七、集合

### Collection

### Iterator

### List

- List 集合子类特点

### 增强 for 循环

### 数据结构

- 栈
- 队列
- 数组
- 链表

### Collections

### 补充 LinkedList 集合的特有功能

## 十八、Set 集合

### 哈希值

- 对象哈希值特点

### HashSet

### 哈希表

### LinkedHashSet 集合

### TreeSet

## 十九、泛型

### 泛型类

### 泛型方法

### 泛型接口

### 类型通配符

## 二十、补充内容：可变参数

## 二十一、Map

### 概述

### 操作方法

### 获取方法

### Map 的遍历方法
