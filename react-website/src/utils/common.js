import LocalStorage from './LocalStorage';

export const isLogined = () => {
  return LocalStorage.get('isLogin') === true;
}

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

/**
 * 为了重写 history 的方法 pushState & replaceState
 * @param {pushState|replaceState} type 
 * @returns 
 */
export function historyRewrite (type) {
  const func = history[type]
  return function () {
    const event = new Event(type);
    event.arguments = arguments;
    window.dispatchEvent(event);
    const res = Reflect.apply(func, this, arguments);
    return res;
  }
}