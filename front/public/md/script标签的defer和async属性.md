# `<script>` 标签上 `defer` 和 `async` 属性的区别

当浏览器碰到 `script` 脚本的时候：

1. `<script src="script.js"></script>`

   没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，**读到就加载并执行**。

2. `<script async src="script.js"></script>`

   有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行**并行进行（异步）**。

3. `<script defer src="script.js"></script>`

   有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要**在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。**

然后从实用角度来说呢，首先把所有脚本都丢到 `</body>` 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。

