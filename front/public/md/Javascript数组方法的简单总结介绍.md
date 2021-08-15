# JavaScript 数组方法的总结介绍

## 写在前面

> **坚持，记笔记 😀, 加油!**

 新手小白第一次发博客 😆，当是做笔记啦。记一下学习到的<font face="Hack">**Javascript 数组**</font>方法，写的不好各位见谅呀 😬，共同学习进步 😄。

因为数组的方法很多所以本文采用《Javascript 高级程序设计》一书中对数组方法进行的分类，方便查找使用，对了电脑端需要快速查询想要找到的方法的话，可以使用 <kbd><font face="Hack">**Ctrl/Command**</font></kbd> + <kbd><font face="Hack">**F**</font></kbd> 输入想要搜索的方法名来进行查找哦。

## 一、先介绍数组实例方法

### 1.1 栈和队列方法

<font face="Hack">**Javascript**</font>中这几个方法让数组可以直接作为**栈**（**先进后出 FILO**）和**队列**（**先进先出 FIFO**）这两种数据结构来使用（关于这两种数据结构可以参见[http://c.biancheng.net/data_structure/stack_queue/](http://c.biancheng.net/data_structure/stack_queue/)），

使用`push()`和`pop()`可以让数组当成栈来使用，而使用`shift()`和`push()`可以数组当成队列来使用，另外还有一个`unshift()`方法（可以配合`pop()`模拟反向的队列）。

#### 1.1.1 <font face="Hack">`push()`</font>

`push()`方法可以接收任意数量的参数，将他们按照参数顺序添加到数组末尾，**返回值是添加元素后数组的最新长度`length`**

```javascript
const array_1 = [1, 2, 3, 4];
console.log(array_1.push(5, 6)); // 6
console.log(array_1); // [ 1, 2, 3, 4, 5, 6 ]
```

#### 1.1.2 <font face="Hack">`pop()`</font>

而`pop()`方法执行的是与`push()`方法相反的操作，将会删除数组的最后一项并**返回该项**（同时也`length`会减 1）。

```javascript
const array_2 = [1, 2, 3, 4];
console.log(array_2.pop()); // 4
console.log(array_2); // [ 1, 2, 3 ]
```

#### 1.1.3 <font face="Hack">`shift()`</font>

`shift()`方法将会删除数组的第一项并**返回该项**（同时也`length`会减 1）。

```javascript
const array_3 = [1, 2, 3, 4];
console.log(array_3.shift()); // 1
console.log(array_3); // [ 2, 3, 4 ]
```

#### 1.1.4 <font face="Hack">`unshift()`</font>

另外的`unshift()`方法执行的是与`shift()`方法相反的操作，该方法可以接收**任意数量的参数**并按照参数的顺序添加到数组前，方法会**返回新的数组长度`length`**。

```javascript
const array_4 = [1, 2, 3, 4];
console.log(array_4.unshift(-1, 0)); // 6
console.log(array_4); // [ -1, 0, 1, 2, 3, 4 ]
```

### 1.2 归并方法

**Javascript**中有两个归并方法`reduce()`和`reduceRight()`这两个方法都会**遍历数组的每一项**，**并有一个最终返回值**。

#### 1.2.1 <font face="Hack">`reduce()`</font>

这个方法会接受两个参数：

- 第一个参数为**针对每一项都会执行的归并方法**：<br/> 这个方法可以接受四个参数：**上一个归并值**、**当前项**、**当前项的索引**和**数组本身**，这个函数的返回值将会作为下一次归并时该函数的第一个参数，所以当`reduce()`没有接收到可选的第二个参数时，归并将会从数组的第二项开始，

- 第二个参数为**可选的**以其为起点的初始值。

可以使用`reduce()`方法轻松执行数组求和的操作：

```javascript
const array_1 = [1, 2, 3, 4];
console.log(array_1.reduce((prev, cur, index, array) => prev + cur)); // 10
```

#### 1.2.2 <font face="Hack">`reduceRight()`</font>

而`reduceRight()`方法的操作与`reduce()`方法相同，只是遍历元素的方向是**从最后一项到第一项而已**，其余的没有任何区别。

```javascript
const array_1 = [1, 2, 3, 4];
console.log(array_1.reduceRight((prev, cur, index, array) => prev + cur)); // 10
```

### 1.3 排序方法

`sort()`和`reverse()`都会返回调用它们的数组的引用，即**此方法会改变原数组**

#### 1.3.1 <font face="Hack">`sort()`</font>

`sort()`方法可以接收一个可选的**比较函数**，用于判断哪个值应该被排在前面。这个比较函数接受两个参数，如果第一个参数**想要被排在前面就返回一个负值**，**反之则返回一个正值**。

```javascript
const array_2 = [3, 1, 4, 2];
const compare = (a, b) => a - b; // 比较函数
array_2.sort(compare);
console.log(array_2); // [ 1, 2, 3, 4 ]
```

#### 1.3.2 <font face="Hack">`reverse()`</font>

`reverse()`方法会将调用它的数组元素**反向逆序排列**。

```javascript
const array_1 = [1, 2, 3, 4];
array_1.reverse();
console.log(array_1); // [ 4, 3, 2, 1 ]
```

### 1.4 迭代方法

**`Javascript`数组**定义的迭代方法，分别是`forEach()`、`map()`、`every()`、`some()`和`filter()`，这几个方法都接受两个参数：**以每一项为参数运行的函数`callback`**，以及**可选的**作为函数运行上下文的**作用域对象`thisArg`**（即决定函数中`this`的值）。

而这个**以每一项为参数运行的函数**会接受三个参数：**当前正在处理的数组元素`currentValue`**、**元素索引`index`**和**数组本身`array`**。

#### 1.4.1 `forEach()`

`forEach()` 方法为数组中含**有效值**（已删除或者未初始化的项将被跳过）的每一项执行一次 `callback` 函数。`forEach()` 方法不会改变调用它的数组，没有返回值（或者说返回值是`undefined`）

```javascript
// 注意：这里 array[2] = undefined, array[3] = null, array[4]未初始化
const array = [1, 2, undefined, null, , 3, 4];
// array[6] 被删除
array.pop();

// 已删除或者未初始化的项将被跳过，而 undefined 和 null 不会被跳过
array.forEach(function (value, index, array) {
  console.log(`value: ${value}, index: ${index}, array: ${array}`);
});
// value: 1, index: 0, array: 1,2,,,,3,4
// value: 2, index: 1, array: 1,2,,,,3,4
// value: undefined, index: 2, array: 1,2,,,,3,4
// value: null, index: 3, array: 1,2,,,,3,4
// value: 3, index: 5, array: 1,2,,,,3,4
// value: 4, index: 6, array: 1,2,,,,3,4
```

#### 1.4.2 `map()`

`map()`方法和`forEach()`有很多相似之处，比如都不会更改原始数组，但我们关注它们最大的区别：`map()`方法通过对每个数组元素执行函数来**返回一个新的数组**。

```javascript
// 当回调函数仅使用 value 参数时，可以省略索引和数组参数：
const array_2 = [1, 2, 3, 4].map(value => {
  return value ** 2; // ES7新特性（2016）：a ** b 指数运算符，它与 Math.pow(a, b)相同。
});
console.log(array_2); // [ 1, 4, 9, 16 ]
```

#### 1.4.3 `every()`

对数组的每一项都运行传入的函数，如果**每一项函数都返回`true`**，**则`every()`方法返回`true`**

```javascript
let flag_every = [1, 2, 3, 4].every(value => value < 5);
console.log(flag_every); // true
flag_every = [1, 2, 3, 4].every(value => value < 3);
console.log(flag_every); // false
```

#### 1.4.4 `some()`

对数组的每一项都运行传入的函数，如果**有一项函数返回`true`**，**则`every()`方法返回`true`**

```javascript
let flag_some = [1, 2, 3, 4].some(value => value > 3);
console.log(flag_some); // true
flag_some = [1, 2, 3, 4].some(value => value > 4);
console.log(flag_some); // false
```

#### 1.4.5 `filter()`

`filter()`方法（_filter['fɪltər]: 过滤、筛选_）创建一个**包含通过测试的数组元素**的新数组。

```javascript
// 这里可以过滤出数组中的偶数元素
const array_5 = [1, 2, 3, 4].filter(value => value % 2 === 0);
console.log(array_5); // [ 2, 4 ]
```

### 1.5 操作方法

#### 1.5.1 `concat()`

`concat()`方法用于连接两个或多个数组。

该方法**不会改变现有的数组**，它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后**返回这个新构建的数组**。

传入数组参数将会被“打平”

```javascript
const array_1 = [1, 2, 3];
console.log(array_1.concat(4, [5, 6]));
// [ 1, 2, 3, 4, 5, 6 ]
```

#### 1.5.2 `slice()`

`slice()`用于**创建**一个包含原有数组中一个或者多个元素的**新数组**，**不会影响原数组**。

`slice()`可以接收**一个**或者**两个**参数：

- 当只有**一个参数**时：`slice()`会返回**从该索引开始（_包括当前索引元素_）到数组末尾**的所有元素；

  - 传入**负值**的话，将会按照**数组长度`length`加上这个负值**来确定位置

```javascript
const array_2 = [1, 2, 3, 4, 5, 6];
console.log(array_2.slice(3)); // [ 4, 5, 6 ]
// 传入参数 -3 相当于传入 array_2.length - 3 = 3
console.log(array_2.slice(-3)); // [ 4, 5, 6 ]
```

- 如果传入**两个参数**，则`slice()`会返回**从开始索引**（**包括当前索引元素**）到**结束索引**（**不包括结束索引位置的元素**）对应的所有元素（相当于**区间 _[x, y)_** 内的元素），

  - 同样，传入**负值**的话，将会按照**数组长度`length`加上这个负值**来确定位置

```javascript
const array_2 = [1, 2, 3, 4, 5, 6];
console.log(array_2.slice(2, 4)); // [ 3, 4 ]
// 传入参数 (-4, -2) 相当于传入 (6 - 4 = 2, 6 - 2 = 4)
console.log(array_2.slice(-4, -2)); // [ 3, 4 ]
```

#### 1.5.3 `splice()`

`splice()`方法十分强大，它有许多使用方式。`splice()`的主要目的是**在数组中间插入元素**，**此方法会改变原数组**，有三种不同的方式去使用它：

##### 删除

需要给`splice()`传入**两个参数**：

- 要删除的第一个元素的位置
- 要删除的元素数量

```javascript
const array_3 = [1, 2, 3, 4, 5];
array_3.splice(1, 2);
console.log(array_3); // [ 1, 4, 5 ]
```

##### 插入

需要给`splice()`传入**三个参数**

- 开始位置
- 0（代表要删除的元素数量为 0，即不删除）
- 要插入的元素，第三个参数之后可以传任意多个参数，将全部会被插入到数组中

```javascript
// array_3 = [ 1, 4, 5 ]
array_3.splice(1, 0, "hello", "ienyh");
console.log(array_3); // [ 1, 'hello', 'ienyh', 4, 5 ]
```

##### 替换

需要给`splice()`传入**三个参数**

- 开始位置
- 1（代表要删除的元素数量为 1，即替换掉当前这个位置的元素）
- 替换的元素，同样第三个参数之后可以传任意多个参数，将全部会被插入到数组中

```javascript
// array_3 = [ 1, 'hello', 'ienyh', 4, 5 ]
array_3.splice(3, 1, "world", "!");
console.log(array_3); // [ 1, 'hello', 'ienyh', 'world', '!', 5 ]
```

**_`splice()` 方法的返回值是一个数组，包含从原数组中删除的元素（没有删除元素将会返回空数组 `[]`）_**

```javascript
// [ 1, 'ienyh', 'hello', 'world', '!', 5 ]
// 从索引 1 开始删除 4 个元素
console.log(array_3.splice(1, 4)); // [ 'ienyh', 'hello', 'world', '!' ]
// 从索引 1 开始插入元素 2，3，4
console.log(array_3.splice(1, 0, 2, 3, 4)); // []
console.log(array_3); // [ 1, 2, 3, 4, 5 ]
```

#### 1.5.4 `flat()` ES10 新增（2019）

数组的成员有时还是数组，`flat()`用于**将嵌套的数组“打平”**，变成一维数组。该方法**返回一个新数组**，**对原数组没有影响**。

```javascript
const array_1 = [1, 2, 3, [4, 5, 6]];
console.log(array_1.flat()); // [ 1, 2, 3, 4, 5, 6 ]
```

`flat()`默认只会“打平”一层，如果想要“打平”多层的嵌套数组，可以传一个整数给`flat()`方法作为参数，表示想要拉平的层数，_默认为 1_。

```javascript
const array_2 = [1, 2, [3, 4, [5, 6]]];
console.log(array_2.flat()); // [ 1, 2, 3, 4, [ 5, 6 ] ]
console.log(array_2.flat(2)); // [ 1, 2, 3, 4, 5, 6 ]
```

如果想要将**任意嵌套层数**的数组“打平”，可以使用`Infinity`作为参数（`Infinity` 是全局对象（_global object_）的一个属性，即它是一个全局变量，初始值是 `Number.POSITIVE_INFINITY`）

```javascript
const array_3 = [1, [2, [3, [4, [5, [6]]]]]];
console.log(array_3.flat(Infinity)); // [ 1, 2, 3, 4, 5, 6 ]
```

#### 1.5.5 `flatMap()` ES10 新增（2019）

`flatMap()`方法对原数组的每个成员执行一个函数，相当于**执行`map()`**,然后**对返回值组成的数组执行`flat()`方法**。该方法**返回一个新数组**，**不改变原数组**。

注意`flatMap()`**只能展开一层数组**。

```javascript
// 注意相当于 先执行 map() 然后 flat() “打平”
const array_4 = [1, 2, 3].flatMap(item => [item, item * 2]);
console.log(array_4); // [ 1, 2, 2, 4, 3, 6 ]
```

### 1.6 搜索和位置方法

#### 1.6.1 `indexOf()`

`indexOf()`、`lastIndexOf()`和`includes()`这三个方法都可以接受两个参数：**要查找的元素**和一个**可选的起始搜索位置**（搜索时包含当前位置）。

`indexOf()`方法**从数组开头（即第一项）开始查找**，返回查找到的**第一个元素在数组中的位置**（即数组下标），没找到将返回`-1`

```javascript
const array_1 = [1, 2, 3, 4, 3, 2, 1];
console.log(array_1.indexOf(3)); // 2
console.log(array_1.indexOf(3, 3)); // 4
console.log(array_1.indexOf(5)); // -1
```

#### 1.6.2 `lastIndexOf()`

与`indexOf()`方法用法一致，**从数组末尾（即最后一项）开始查找**，返回查找到的**第一个元素在数组中的位置**（即数组下标），没找到将返回`-1`

#### 1.6.3 `includes()` ES7 新增（2016）

`includes()`方法返回一个**布尔值（_boolean_）**，表示该数组是否包含要查找的元素

`includes()`方法在比较时使用**完全相等`===`**

```javascript
// array_1 = [1, 2, 3, 4, 3, 2, 1];
console.log(array_1.includes(3)); // true
console.log(array_1.includes(3, 5)); // false
```

#### 1.6.4 `find()`

`find()` 方法的参数和数组的迭代方法的参数一样，返回数组中**满足提供的测试函数（`callback`）**的**第一个元素的值**

`find`方法对数组中的每一项元素执行一次 `callback` 函数，直至有一个 `callback` 返回 `true`。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 `undefined`

```javascript
// array_1 = [1, 2, 3, 4, 3, 2, 1];
const number_1 = array_1.find(value => value > 2);
console.log(number_1); // 3
```

#### 1.6.5 `findIndex()`

`findIndex()`方法返回数组中**满足提供的测试函数（`callback`）**的**第一个元素的索引**（注意区别返回的是索引）。若没有找到对应元素则返回`-1`。

```javascript
// array_1 = [1, 2, 3, 4, 3, 2, 1];
const number_2 = array_1.findIndex(value => value > 2);
console.log(number_2); // 2
```

### 1.7 转换方法

#### `join()`

## 二、然后是 `Array` 的静态方法

### 2.1 <font face="Hack">`Array.from()`</font>

`Array.from()`方法可以接受最多三个参数，第一个参数为一个**类数组对象**(即可迭代，或者是有`length`属性同时存在可索引属性)，第二个参数为可选参数，是一个**映射函数**参数，还有可选的第三个参数，用于**指定映射函数参数中的`this`指向**。

`Array.from()`方法可以传入的参数包括**数组**、`Map`和`Set`的实例等

```javascript
const arr = Array.from([1, 2, 3, 4, 5]); // 传入一个数组
console.log(arr); // [ 1, 2, 3, 4, 5 ]

const str = Array.from("ienyh"); // 传入字符串将会被转化为字符数组
console.log(str); // [ 'i', 'e', 'n', 'y', 'h' ]

const _map = new Map().set(1, 2).set(3, 4); // Map(2) { 1 => 2, 3 => 4 }
const _set = new Set().add(1).add(2).add(3).add(4); // Set(4) { 1, 2, 3, 4 }
console.log(Array.from(_map)); // [ [ 1, 2 ], [ 3, 4 ] ]
console.log(Array.from(_set)); // [ 1, 2, 3, 4 ]
```

`Array.from()`方法也可以传入`arguments`和**可迭代对象**

```javascript
function func() {
  return Array.from(arguments);
}
console.log(func(1, 2, 3, 4, 5)); // [ 1, 2, 3, 4, 5 ]

const obj = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  length: 4,
};
console.log(Array.from(obj)); // [ 0, 1, 2, 3 ]
```

`Array.from()`方法还可以用于对现有数组进行**深拷贝**（关于深浅拷贝可以参见文章[【JS】深拷贝与浅拷贝的区别，实现深拷贝的几种方法](https://www.cnblogs.com/echolun/p/7889848.html)）

```javascript
const arr_1 = [1, 2, 3, 4];
const arr_2 = arr_1;
const arr_3 = Array.from(arr_1);
arr_1[0] = 0;
console.log(arr_2); // [ 0, 2, 3, 4 ]
console.log(arr_3); // [ 1, 2, 3, 4 ]
console.log(arr_1 === arr_3); // false
```

### 2.2 <font face="Hack">`Array.of()`</font>

`Array.of()`方法用于将**一组参数**转化为**数组**，这个方法可以用于替代 ES6 之前常用的`Array.prototype.slice.call(arguments)`，对比起来这种方法就显得有些繁杂了

```javascript
const arr_4 = Array.of(1, 2, 3, 4);
const arr_5 = Array.of(1, "2", true, undefined);
console.log(arr_4); // [ 1, 2, 3, 4 ]
console.log(arr_5); // [ 1, '2', true, undefined ]
```

### 2.3 <font face="Hack">`Array.isArray()`</font>

这个方法的目的就是**确定一个值是否为数组**，返回一个**布尔值**

```javascript
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({ a: 1, b: 2, c: 3 })); // false
```

## 三、Last

如果有任何疑问欢迎在评论区友好交流呦 😆。

[@Javascript 部分数组方法的简单介绍](https://blog.csdn.net/qq_45265059/article/details/116942489)

- 欢迎关注我呦，[我的 CSDN 博客主页](https://blog.csdn.net/qq_45265059)😆。
- 本文的[Github 地址](https://github.com/ienyh/ienyh/blob/main/notes/markdown/Javascript%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95%E7%9A%84%E7%AE%80%E5%8D%95%E6%80%BB%E7%BB%93%E4%BB%8B%E7%BB%8D.md)，欢迎点击查看，还有我的<font face="Hack">Github[@ienyh](https://github.com/ienyh)<font>主页，一起学习哈哈哈 👨‍💻

