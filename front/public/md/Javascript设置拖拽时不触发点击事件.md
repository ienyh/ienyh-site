# 如何设置拖拽时不触发点击事件

> 问题: 今天遇到的，当给 dom 添加点击事件时，如果这个 dom 节点还能拖拽时，当拖拽时也会触发点击事件，其实我是不想要它拖拽时触发点击事件的，那么该如何解决呢？

## 分析

一个完整的 click 事件是包含了**鼠标按下 *mousedown*** 和**鼠标抬起 *mouseup*** 这两个事件的，而当我们拖拽时包含了**鼠标按下 *mousedown***、**鼠标移动 *mousemave*** 和**鼠标抬起 *mouseup*** 这三个事件的。

我们可以从这个 mousemove 事件入手，点击事件时 mousedown 与 mouseup 触发产生的两个坐标 *(e.offsetX, e.offsetY)* 是一样的，而拖拽时鼠标移动了一定的距离，具体体现在 px 上。

## 解决问题

我们可以监听**鼠标按下 *mousedown*** 和**鼠标抬起 *mouseup*** 这两个事件，对比他们触发时的坐标 *(e.offsetX, e.offsetY)*，如果这两个事件触发的坐标是一样的，那么可以认为是点击事件 click 触发，反之则认为是拖拽事件。

```javascript
const container = document.querySelector(".container");
let beforeX, beforeY, afterX, afterY;

container.addEventListener('mousedown', e => {
	[ beforeX, beforeY ] = [ e.offsetX, e.offsetY ];
});

container.addEventListener('mouseup', e => {
	[ afterX, afterY ] = [ e.offsetX, e.offsetY ];
});

container.addEventListener("click", (e) => {
  if (beforeX === afterX && beforeY === afterY) {
  	window.alert("click");
  }
});
```

像上面那样，这是当我们拖拽时就不会触发点击事件了。

并且我们判断是否为点击事件不一定条件非得是前后坐标完全一致，当前后坐标移动距离很小时（根据坐标进行简单的计算即可）也可认为是点击事件。或者是其他的条件去判断，可以自行决定。

