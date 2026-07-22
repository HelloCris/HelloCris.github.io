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

## 集合

**集合类特点**：提供一种存储空间可变的存储模型，存储数量随时发生改变。

::: info 集合类体系结构

- **集合**
  - **Collection（单列）**
    - **List（可重复）**
      - ArrayList（实现类）
      - LinkedList（实现类）
      - ......
    - **Set（不可重复）**
      - HashSet（实现类）
      - TreeSet（实现类）
      - ......
  - **Map（双列）**
    - HashMap（实现类）
    - ......

:::

### Collection

**概述**：Collection是单列集合的顶层接口，表示一组对象，这些对象是 Collection 集合的元素。Collection 是一个接口，JDK 不提供此接口的任何直接实现，它提供更具体的子类接口。

**Collection 常用方法**

| 方法名                       | 说明                               |
| :--------------------------- | :--------------------------------- |
| `boolean add(E e)`           | 添加元素                           |
| `boolean remove(Object o)`   | 从集合中移除指定的元素             |
| `void clear()`               | 清空集合中的元素                   |
| `boolean contains(Object o)` | 判断集合中是否存在指定的元素       |
| `boolean isEmpty()`          | 判断集合是否为空                   |
| `int size()`                 | 集合的长度，也就是集合中元素的个数 |

### Iterator

**迭代器**：集合的专属遍历方式。

- `Iterator<E> iterator()`：返回此集合中元素的迭代器，通过集合的 `iterator()` 方法得到。
- 迭代器是通过集合的 `iterator()` 方法得到的，所以我们说它是依赖于集合而存在的。

**Iterator 中的常用方法**

- `E next()`：返回迭代中的下一个元素。
- `boolean hasNext()`：如果迭代具有更多元素，则返回 true。

```java
Collection<Integer> c = new ArrayList<>();
c.add(123);
c.add(321);
c.add(333);

Iterator<Integer> i1 = c.iterator(); // 调用方法得到迭代器
while (i1.hasNext()) {
    System.out.println(i1.next());
}
```

::: info 并发修改异常

迭代器遍历过程中修改了集合的内容长度，会导致 `next()` 获取元素中预期值和实际值不一致，抛出异常。

- **异常名称**：`ConcurrentModificationException`
- **产生原因**：迭代器遍历的过程中，通过集合对象修改了集合中元素的长度，造成了迭代器获取元素中判断预期修改值和实际修改值不一致。
- **解决方案**：用 for 循环遍历，然后用集合对象做对应的操作即可。

:::

### List

**概述**：有序集合，用户可控制和集合中每个元素的插入位置，也可通过索引访问元素。可重复。

**List 特有方法**

| 方法名                           | 说明                                   |
| :------------------------------- | :------------------------------------- |
| `void add(int index, E element)` | 在此集合中的指定位置插入指定的元素     |
| `E remove(int index)`            | 删除指定索引处的元素，返回被删除的元素 |
| `E set(int index, E element)`    | 修改指定索引处的元素，返回被修改的元素 |
| `E get(int index)`               | 返回指定索引处的元素                   |

**ListIterator**

List 集合特有迭代器，可以任意方向遍历集合，调用 ListIterator 的 add 不会并发修改异常。

**List 集合子类特点**

- **ArrayList**：底层结构是数组，查询快，增删慢。
- **LinkedList**：底层结构是链表，查询慢，增删快。

### 增强 for 循环

- **增强 for**：简化数组和 Collection 集合的遍历。
- 实现 Iterable 接口的类允许其对象成为增强型 for 语句的目标。
- 它是 JDK5 之后出现的，其内部原理是一个 Iterator 迭代器。

**增强 for 的格式**

```java
for(元素数据类型 变量名 : 数组或者Collection集合) {
    //在此处使用变量即可，该变量就是元素
}
```

```java
int[] arr = {1, 2, 3, 4, 5};
for(int i : arr) {
    System.out.println(i);
}
```

### 数据结构

数据结构指计算机存储、组织数据的方式。

::: info 栈

- **定义**：是一种**先进后出**的数据模型。
- **操作术语**：
  - 数据进入栈模型的过程称为：**压/进栈**。
  - 数据离开栈模型的过程称为：**弹/出栈**。

:::
::: info 队列

- **定义**：是一种数据**先进先出**的模型。
- **操作术语**：
  - 数据从**后端**进入队列模型的过程称为：**入队列**。
  - 数据从**前端**离开队列模型的过程称为：**出队列**。

:::
::: info 数组

- **特点**：通过索引定位，**查询快，增删慢**。
- **性能分析**：
  - **查询效率高**：查询数据通过索引定位，查询任意数据耗时相同。
  - **删除效率低**：删除数据时，要将原始数据删除，同时后面每个数据前移。
  - **添加效率极低**：添加数据时，添加位置后的每个数据后移，再添加元素。

:::
::: info 链表

- **定义**：链表每个元素就是节点，一个节点包含自己的地址和值，还有下一个节点的地址。
- **特点**：
  - 是一种**增删快**的模型（对比数组）。
  - 是一种**查询慢**的模型（对比数组）。
- **查询机制**：
  - 例如查询第3个数据，必须从头（head）开始查询。

:::

### Collections

**概述**：是针对集合的操作类。

**常用方法**

- `public static <T extends Comparable<? super T>> void sort(List<T> list)`：将指定的列表按升序排序。
- `public static void reverse(List<?> list)`：反转指定列表中元素的顺序。
- `public static void shuffle(List<?> list)`：使用默认的随机源随机排列指定的列表。

### 补充 LinkedList 集合的特有功能

| 方法名                      | 说明                             |
| :-------------------------- | :------------------------------- |
| `public void addFirst(E e)` | 在该列表开头插入指定的元素       |
| `public void addLast(E e)`  | 将指定的元素追加到此列表的末尾   |
| `public E getFirst()`       | 返回此列表中的第一个元素         |
| `public E getLast()`        | 返回此列表中的最后一个元素       |
| `public E removeFirst()`    | 从此列表中删除并返回第一个元素   |
| `public E removeLast()`     | 从此列表中删除并返回最后一个元素 |

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
