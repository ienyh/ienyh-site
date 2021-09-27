
export const isPC = () => {
  const userAgentInfo = navigator.userAgent || window.navigator.userAgent;
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  for (let i = 0; i < agents.length; i++) {
    if (userAgentInfo.indexOf(agents[i]) > 0) return false;
  }
  return true;
}

// 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
export function throttle (cb, wait) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        cb(...arguments);
        timer = null;
      }, wait)
    }
  }
}