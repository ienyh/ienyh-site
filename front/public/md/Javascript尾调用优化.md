# JavaScript 尾调用优化

## 递归

---

> **递归函数**的形式通常是一个函数通过名称调用自己

比如经典的返回斐波那契数列生成问题

```javascript
function fibonacci (n) {
  if (n === 1 || n === 2) {
    return 1;
  } 
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

我们求斐波那契数列的第10项时，可以轻松求出 `fibonacci(10) = 55`， 可是当我们要求斐波那契数列的第1000项时, `fibonacci(1000)` 却没那么容易求出来甚至于报错

原因就是递归的每一次调用都会推一个**栈帧**到**调用栈**中，当调用层数越来越多，调用栈中的栈帧越来越多，将调用栈都给塞满了，也就出现了**堆栈溢出**的报错。

这个时候我们就需要对我们的代码进行优化了：

- 第一种方法就是将递归改写成循环
- 第二种就是将介绍的尾调用优化

## 尾调用优化

---

ECMAScript 6 规范新增了一项内存管理优化机制，让 JavaScript 引擎在满足条件时可以**重用栈帧**。

那么什么叫 “尾调用” 呢？

> 即**外部函数的返回值是一个内部函数的返回值**。

```javascript
function outerFunc () {
  return innerFunc();
}
```

- 当执行到 `outerFunc` 函数体时，第一个栈帧被推入栈，

- 到达 `return innerFunc();` 语句时，发现要返回需要先求值，于是第二个栈帧也被推到栈上，

- 此时会发现其实第一个栈帧似乎没什么用了，因为 `innerFunc()` 的返回值也是 `outerFunc()` 的返回值

于是会将第一个栈帧弹出，而保留第二个，也就是**尾调用优化**。

## 尾调用优化的达成条件

---

### 条件

尾调用优化的条件就是**确定外部栈帧真的没必要存在了**

1. 代码在严格模式下执行

2. 外部函数的返回值是对尾调用函数的调用
3. 尾调用函数返回后不需要执行额外的逻辑
4. 尾调用函数不是引用外部函数作用域中自由变量的闭包

### 符合尾调用优化的例子

```javascript
"use strict";

function outerFunction1 () {
  return innerFunction();
}

function outerFunction2 (condition) {
  return condition ? innerFunction1() : innerFunction2();
}
```

### 不符合尾调用优化的例子

```javascript
"use strict";

// 不符合：尾调用并没有返回
function outerFunction1 () {
  innerFunction();
}

// 不符合：尾调用并没有直接返回
function outerFunction2 () {
  const res = innerFunction();
  return res;
}

// 不符合：尾调用之后还有额外的逻辑操作（.toString()）
function outerFunction3 () {
  return innerFunction().toString();
}

// 不符合：尾调用是闭包
function outerFunction4 () {
  let name = "ienyh";
  return function () { return name; };
}
```

## 总结 *& Last*

---

> 尾调用优化在递归场景下的效果是最明显的，因为递归代码容易在栈内存中迅速产生大量栈帧。

欢迎在评论区交流学习，一起学习哈哈哈 👨‍💻！

点个赞，点个关注吧 😆。