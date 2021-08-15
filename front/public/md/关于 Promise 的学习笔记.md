# 关于 Promise 的学习笔记

> **坚持，记笔记 😀, 加油!**

## 一、Promise 介绍

### promise 是什么?

**`Promise`_['prɑmɪs]_ 是一个异步问题同步化的解决方案**

`Promise` 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。

一个 `Promise` 对象代表一个在这个 `promise` 被创建出来时不一定已知的值。它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 `promise`，以便在未来某个时候把值交给使用者。

一个 `Promise` 必然处于以下几种状态之一：

- **待定（_pending_）**: 初始状态，既没有被兑现，也没有被拒绝。
- **已兑现（_fulfilled_）**: 意味着操作成功完成。
- **已拒绝（_rejected_）**: 意味着操作失败。

待定状态的 `Promise` 对象要么会通过一个值被兑现（_fulfilled_），要么会通过一个原因（错误）被拒绝（_rejected_）。当这些情况之一发生时，我们用 `promise` 的 `then()` 方法排列起来的相关处理程序就会被调用。如果 `promise` 在一个相应的处理程序被绑定时就已经被兑现或被拒绝了，那么这个处理程序就会被调用，因此在完成异步操作和绑定处理方法之间不会存在竞争状态。

## 二、Promise 的基本使用

可以通过`Promise`构造函数创建一个`Promise`对象

`Promise`构造函数接收一个函数作为参数，该函数的两个参数是`resolve`，`reject`。

- `resolve`函数的作用是当`Promise`对象转移到成功，**调用`resolve`并将操作结果作为其参数传递出去**
- `reject`函数的作用是单`Promise`对象的状态变为失败时，**将操作报出的错误作为其参数传递出去**

```javascript
const p = new Promise((resolve, reject) => {
  $.ajax({
    url: "http://localhost:3000/data.json",
    success: data => {
      resolve(data);
    },
    error: err => {
      reject(err);
    },
  });
});
```

可以用 `promise.then()`，`promise.catch()` 和 `promise.finally()` 这些方法将进一步的操作与一个变为已敲定状态的 `promise`关联起来。这些方法还会返回一个新生成的 `promise` 对象，这个对象可以被非强制性的用来做**链式调用**

```javascript
p.then(data => {
  console.log(data);
})
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    console.log("1");
  });
```

## 三、Promise 的方法

### 2.1 实例方法

#### 2.1.1 `then()`

`promise` 的 `then() `方法带有以下三个参数：成功回调，失败回调，前进回调，一般情况下只需要实现第一个，后面是可选的。

```javascript
p.then(data => {
  console.log(data);
});
```

执行 `promise` 的 `then()` 方法后**返回的仍然是一个 `promise` 对象**，所以可以进行链式调用

#### 2.1.2 `catch()`

`Promise.prototype.catch()` 用于捕获错误，行为与 `Promise.prototype.then(null, rejection)` 的行为一致，用于指定发生错误时的回调函数。

而且，`Promise` 对象的错误**具有“冒泡”性质**，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 `catch` 语句捕获。

```javascript
p.then(data => console.log(data))
  // 处理前一个回调函数运行时发生的错误
  .catch(err => {
    console.log(err);
  });
```

#### 2.1.3 `finally()`

`finally()` 方法返回一个 `Promise` 对象。

不管 promise 最后的状态是 *fulfilled* 或者是 *rejected*，在执行完 `then()` 或 `catch()` 指定的回调函数以后，**都会执行 `finally()` 方法指定的回调函数**。

避免了同样的语句需要在`then()`和`catch()`中各写一次的情况

```javascript
p.then(data => {
  console.log(data);
})
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    console.log("finally");
  });
```

### 2.2 静态方法

#### 2.2.1 `Promise.resolve()`

`promise` 并非一开始必须处于 *pending* 状态，可以使用 `Promise.resolve()` **直接实例化一个已经解决了（处于 *fulfilled* 状态）的 `promise`**

使用这个静态方法可以将任何值转换成一个 `promise` 值

```javascript
const p_fulfilled = Promise.resolve(1);
setTimeout(console.log, 0, p_fulfilled); // Promise { 1 }
```

#### 2.2.2 `Promise.reject()`

`Promise.reject()` 会实例化一个拒绝的 promise 并抛出一个异步错误（**这个异步错误不能通过`try/catch`捕获，而只能通过拒绝处理程序捕获**即`catch()`方法）

```javascript
const p_reject = Promise.reject(1);
setTimeout(console.log, 0, p_reject); // Promise { <rejected> 1 }
```

#### 2.2.3 `Promise.all()`

`Promise.all()` 方法接收一个**可迭代对象**，返回一个 `Promise` 对象，会在这一组 `Promise` **全部解决之后再解决**。

```javascript
const p = Promise.all([Promise.resolve(), Promise.resolve()]);

p.then(() => {
  console.log("Promise.all()");
});
```

#### 2.2.4 `Promise.race()`

`Promise.race()` 会返回一个包装 *promise*，是一组集合中**最先解决或拒绝**的 *promise* 的镜像。

这个方法接收一个可迭代对象，返回一个新的 *promise*

```javascript
const p_race = Promise.race([
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3),
]);

setTimeout(console.log, 0, p_race); // Promise { 1 }

p_race.then(data => {
  console.log(data); // 1
});
```

## 四、参考

> 引用，[\*\*\*]()

## 五、总结 & *Last*

如果有任何疑问欢迎在评论区友好交流呦 😆。

- 欢迎关注我呦 😆，[我的 CSDN 博客主页](https://blog.csdn.net/qq_45265059)。
- 还有我的<font face="Hack">Github[@ienyh](https://github.com/ienyh)<font>一起学习哈哈哈 👨‍💻
