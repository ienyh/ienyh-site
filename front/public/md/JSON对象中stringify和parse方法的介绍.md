<!-- @[目录](#一级标题) -->

# JSON 对象中 stringify() & parse() 方法的介绍

> 坚持，写博客，记笔记 😀, 加油!

## 一、JSON.stringify()

`JSON.stringify()`用于将一个 Javascript 对象序列化为一个 JSON 字符串，

`JSON.stringify()`总共可以接受三个参数：**要序列化的对象**、**（可选的）过滤器（可以是数组或者函数）**、**（可选的）用于缩进结果 JSON 字符串的选项**。

### 1.1 要序列化的对象

默认情况下`JSON.stringify()`不会输出包含空格或者缩进的 JSON 字符串，所以输出如下：

```javascript
const student = {
  name: "ienyh",
  age: 21,
  gender: "male",
  hobby: ["coding", "sports", "read"],
};

const ienyh = JSON.stringify(student);
// {"name":"ienyh","age":21,"gender":"male","hobby":["coding","sports","read"]}
console.log(ienyh);
```

### 1.2（可选的）过滤器（可以是数组或者函数）

- 当过滤器为**数组**时，则返回的结果中只会包含该数组中列出的对象属性

  ```javascript
  const ienyh_2 = JSON.stringify(student, ["name", "hobby"]);
  // {"name":"ienyh","hobby":["coding","sports","read"]}
  console.log(ienyh_2);
  ```

- 当过滤器为**函数**时，该函数有两个参数：**属性名`key`**和**属性值`value`**

  ```javascript
  const ienyh_3 = JSON.stringify(student, (key, value) => {
    if (key === "age") return ++value;
    else if (key === "hobby") {
      value.push("eating");
      return value;
    }
    return value;
  });
  // {"name":"ienyh","age":22,"gender":"male","hobby":["coding","sports","read","eating"]}
  console.log(ienyh_3);
  ```

### 1.3（可选的）用于缩进结果 JSON 字符串的选项（可以是数值或者字符串）

- 当这个选项是**数值**时，表示**每一级缩进的空格数**（最大值为 10，传入大于 10 的值会自动设置为 10），除了缩进还会自动换行

  ```javascript
  const ienyh_4 = JSON.stringify(student, null, 4);
  // {
  //     "name": "ienyh",
  //     "age": 21,
  //     "gender": "male",
  //     "hobby": [
  //         "coding",
  //         "sports",
  //         "read",
  //         "eating"
  //     ]
  // }
  console.log(ienyh_4);
  ```

- 当这个选项是**字符串**时

  ```javascript
  const ienyh_5 = JSON.stringify(student, null, "$$");
  // {
  // $$"name": "ienyh",
  // $$"age": 21,
  // $$"gender": "male",
  // $$"hobby": [
  // $$$$"coding",
  // $$$$"sports",
  // $$$$"read",
  // $$$$"eating"
  // $$]
  // }
  console.log(ienyh_5);
  ```

## 二、JSON.parse()

`JSON.parse()`除了要解析的 JSON 字符串，还可以接受一个额外的参数：称为**还原函数**<font face="Hack">reviver</font>，**会对每个键/值对调用一次**，还原函数接受两个参数：**属性名`key`**和**属性值`value`**，同样需要返回值。

```javascript
// ienyh = "{"name":"ienyh","age":21,"gender":"male","hobby":["coding","sports","read"]}"
const ienyhObject = JSON.parse(ienyh);
// {
//   name: 'ienyh',
//   age: 21,
//   gender: 'male',
//   hobby: [ 'coding', 'sports', 'read' ]
// }
console.log(ienyhObject);

const ienyhObject_2 = JSON.parse(ienyh, (key, value) => {
  return key === "gender" ? "female" : value;
});
// {
//   name: 'ienyh',
//   age: 21,
//   gender: 'female',
//   hobby: [ 'coding', 'sports', 'read' ]
// }
console.log(ienyhObject_2);
```

另外如果还原函数返回`undefined`的话，结果中将会删除对应的键/值对。

```javascript
const ienyhObject_3 = JSON.parse(ienyh, (key, value) => {
  return key === "age" ? undefined : value;
});
// {
//   name: 'ienyh',
//   gender: 'male',
//   hobby: [ 'coding', 'sports', 'read' ]
// }
console.log(ienyhObject_3);
```

## 三、参考

<!-- > [\*\*\*]() -->

## 四、总结 & Last

如果有任何疑问欢迎在评论区友好交流呦 😆。

> [@JSON 对象中 stringify&parse 方法的介绍](https://blog.csdn.net/qq_45265059/article/details/117459896)，欢迎关注[我](https://blog.csdn.net/qq_45265059)呦 😆，还有我的<font face="Hack">Github[@ienyh](https://github.com/ienyh)<font>一起学习哈哈哈 👨‍💻
