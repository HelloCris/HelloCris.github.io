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

## Set 集合

set 集合特点：没有重复元素，没有带索引的方法，遍历不能保证顺序

### 哈希值

哈希值：是 JDK 根据对象的地址或者字符串或者数字算出来的 int 类型的值  
Object 类有一个 `hashCode` 方法返回对象的哈希码；String 类型重写了此方法，结果可能和预期不同

**对象哈希值特点**

- 同一个对象哈希值相同
- 默认情况下不同对象哈希值不同，但可以重写 `hashCode` 方法

### HashSet

HashSet 是 set 的实现类，基本方法与 set 一致，**底层结构是哈希表**。  
HashSet保证唯一：添加元素的时候底层先比较 hash 值是否相同，如果相同再调用 equals 比较内容是否相同，都相同则不会添加相同元素，有一个不同会直接添加该元素

### 哈希表

jdk8 前，**哈希表底层采用数组+链表实现**，可以说元素为链表的数组，默认长度 16  
jdk8 以后，在长度较长的时候，底层优化过

### LinkedHashSet 集合

哈希表和链表实现的 Set 接口，有可预测的迭代次序，链表保证了次序，hash 表保证了唯一

### TreeSet

概述：TreeSet 是一个有序的集合，提供有序的 Set 集合  
TreeSet 中的元素支持两种排序方式

- 无参构造创建 TreeSet 时会使用自然排序 Comparable，该接口对实现它的每个类的对象添加一个整体排序，就是自然排序，类的 `compareTo` 是自然排序方法
- 创建 TreeSet 时提供的 Comparator(比较器排序接口) 进行排序

**自然排序（在实现 Comparable 的类中重写 compareTo 方法）：**

```java
@Override
public int compareTo(Student o) {
    int num = this.age - o.age;
    int num2 = num == 0 ? this.name.compareTo(o.name) : num;
    return num2;
}
```

**比较器排序：**

```java
TreeSet<Student> ts = new TreeSet<>(new Comparator<Student>() {
    @Override
    public int compare(Student o1, Student o2) {
        int num = o1.getAge() - o2.getAge();
        int num2 = num == 0 ? o1.getName().compareTo(o2.getName()) : num;
        return num2;
    }
});
```

## 泛型

- **泛型**：提供了编译时类型安全检测机制。
- **本质**：是参数化类型，操作的数据类型被指定为一个参数。
- **参数化理解**：
  - 就是将原来具体的类型参数化，在调用用的时候传入具体类型。
  - **格式**：
    - `<类型>`：指定一种类型，这个类型可以看作形参。
    - `<类型, 类型 1...>`：也可以多个类型。
  - 将来具体调用的时候给定的类型可以看作是实参。

::: info 泛型概述

- 泛型：是JDK5中引入的特性，它提供了编译时类型安全检测机制，该机制允许你在编译时检测到非法的类型。
- 它的本质是参数化类型，也就是说所操作的数据类型被指定为一个参数。
- 一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，然后在使用/调用时传入具体的类型。
- 这种参数类型可以用在类、方法和接口中，分别被称为泛型类、泛型方法、泛型接口。
- **泛型定义格式**：
  - `<类型>`：指定一种类型的格式。这里的类型可以看成是形参。
  - `<类型1,类型2...>`：指定多种类型的格式，多种类型之间用逗号隔开。这里的类型可以看成是形参。
  - 将来具体调用时候给定的类型可以看成是实参，并且实参的类型只能是引用数据类型。
- **泛型的好处**：
  - 把运行时期的问题提前到了编译期间。
  - 避免了强制类型转换。

:::

1. **泛型类**

- **格式**：修饰符 class 类名<类型>{...}
- 示例：`public class Generic<T> {}` //这里T就是形参可以随意写，调用时候传入类型。

2. **泛型方法**

- **格式**：修饰符 <类型> 返回值 函数名(类型 形参){...}
- 示例：`public <T> void show(T abc){...}` //调用这个函数时，传什么类型，T就是对应类型。

3. **泛型接口**

- **接口**：
  ```java
  public interface Fx<T> {}
  ```
- **实现类**：
  ```java
  public class Generic<T> implements Fx<T>{}
  ```

4. **类型通配符**

为了表示各种泛型 List 的父类，可用通配符：

- **类型通配符**：`<?>`
- `List<?>`：表示元素类型未知的 List。
- 这种带通配符的 List 仅代表它是各种泛型 List 的父类。
- **类型通配符上限**：`<? extends 类型>` 表示的类型是该类型及其子类。
- **类型通配符下限**：`<? super 类型>` 表示的类型是该类型及其父类。

## 补充：可变参数

**可变参数**

- **定义**：可变参数又称参数个数可变，用作方法的形参出现，那么方法参数个数就是可变的了。
- **格式**：修饰符 返回值类型 方法名(数据类型... 变量名){ }
- **范例**：`public static int sum(int... a) { }`

**可变参数注意事项**

- 这里的变量其实是一个数组。
- 如果一个方法有多个参数，包含可变参数，**可变参数要放在最后**。

---

**可变参数的使用**

1. Arrays工具类中有一个静态方法：
   - `public static <T> List<T> asList(T... a)`：返回由指定数组支持的固定大小的列表。
   - 返回的集合不能做增删操作，可以做修改操作。

2. List接口中有一个静态方法：
   - `public static <E> List<E> of(E... elements)`：返回包含任意数量元素的不可变列表。
   - 返回的集合不能做增删改操作。

3. Set接口中有一个静态方法：
   - `public static <E> Set<E> of(E... elements)`：返回一个包含任意数量元素的不可变集合。
   - 在给元素的时候，不能给重复的元素。
   - 返回的集合不能做增删操作，没有修改的方法。

## Map

**概述：** 键映射到值的对象，不能有重复的键，一个键映射一个值。  
`Interface Map<K,V>`

**操作方法**

| 方法名                                | 说明                                 |
| :------------------------------------ | :----------------------------------- |
| `V put(K key, V value)`               | 添加元素                             |
| `V remove(Object key)`                | 根据键删除键值对元素                 |
| `void clear()`                        | 移除所有的键值对元素                 |
| `boolean containsKey(Object key)`     | 判断集合是否包含指定的键             |
| `boolean containsValue(Object value)` | 判断集合是否包含指定的值             |
| `boolean isEmpty()`                   | 判断集合是否为空                     |
| `int size()`                          | 集合的长度，也就是集合中键值对的个数 |

**获取方法**

| 方法名                           | 说明                     |
| :------------------------------- | :----------------------- |
| `V get(Object key)`              | 根据键获取值             |
| `Set<K> keySet()`                | 获取所有键的集合         |
| `Collection<V> values()`         | 获取所有值的集合         |
| `Set<Map.Entry<K,V>> entrySet()` | 获取所有键值对对象的集合 |

**Map 的遍历方法**

1. **获取对象的所有键，再遍历所有键，调用 get 获取对应值**

   ```java
   Map<String,String> map=new HashMap<String, String>();
   map.put("cyp","123");
   map.put("java","头图");
   map.put("lq","321");
   Set<String> keys=map.keySet(); //获取所有键
   for(String k : keys){
       System.out.println(map.get(k));
   }
   ```

2. **直接取得键值对象的集合**
   ```java
   Set<Map.Entry<String,String>> dier=map.entrySet();//获取键值对集合
   for(Map.Entry<String,String> m :dier){
       System.out.println(m.getKey()+m.getValue());
   }
   ```

**补充：**  
`Collections.shuffle()` 将列表中的内容打乱顺序，相当于洗牌。  
`Collections.shuffle(arrayList);`
