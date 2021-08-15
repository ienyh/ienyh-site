# JavaScript 中如何循环遍历顺序执行异步操作

记录一下今天遇到的一个小问题：在循环遍历数组时，需要**同步顺序执行异步操作**

在查阅网上的博客时有几种这样的写法：

```javascript
function func () {
  arr.forEach((item, index) => {
		syncMethod();
	});
}
```

首先这种方法肯定是不行的，所有的异步方法会同步开始执行，然后我看到了另一种写法

```javascript
function func () {
  arr.forEach(async () => {
    await syncMethod();
  });
}
```

这么写看上去确实没什么问题，不过其实还是不行，那么问题在哪儿呢

我在 *MDN* 关于 `arr.forEach()` 方法的文档介绍里看到这样的说明：

> **如果使用 promise 或 async 函数作为 `forEach()` 等类似方法的 `callback` 参数，最好对造成的执行顺序影响多加考虑，否则容易出现错误。**

那么我的需求是循环遍历**顺序执行**异步操作，就是在第一次遍历时执行完该异步操作后，才进行到第二次循环去执行下一次异步操作

但是这里有很重要的概念：

> `forEach` 方法是**同步**的，也就是 `forEach` 的回调函数都是同步调用的，在 `forEach` 的回调里进行异步操作，每次遍历进行的这些异步操作会并行执行

那么想要达到要求的写法是什么呢？

其实很简单，使用朴实无华的 `for i` 循环就行了😭

```javascript
async function func () {
  for (let i = 0; i < arr.length; i++) {
    await syncMethod();
  }
}
```

总之，在 *JavaScript* 中几乎所有的回调函数都是异步调用的，但是 `arr.forEach()` 方法的回调函数是**同步调用**的，同样，`find()` 和 `findIndex()` 函数也都是**同步调用回调函数**的。

