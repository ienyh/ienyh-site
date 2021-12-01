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

export function browser () {
  const browser = {};
  const userAgent = navigator.userAgent.toLowerCase();
  let s;
  (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
  let version = "";
  if (browser.ie) {
    version = 'IE ' + browser.ie;
  }
  else {
    if (browser.firefox) {
      version = 'Firefox ' + browser.firefox;
    }
    else {
      if (browser.chrome) {
        version = 'Chrome ' + browser.chrome;
      }
      else {
        if (browser.opera) {
          version = 'Opera ' + browser.opera;
        }
        else {
          if (browser.safari) {
            version = 'Safari ' + browser.safari;
          }
          else {
            version = 'Other Browser';
          }
        }
      }
    }
  }
  return version;
}


/**获得操作系统***/
export function clientOS () {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  if (isMac)
    return "Mac";
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
  if (isUnix)
    return "Unix";
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
  if (isLinux)
    return "Linux";
  if (isWin) {
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("windows 2000") > -1;
    if (isWin2K)
      return "Win2000";
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("windows xp") > -1;
    if (isWinXP)
      return "WinXP";
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("windows 2003") > -1;
    if (isWin2003)
      return "Win2003";
    var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("windows vista") > -1;
    if (isWinVista)
      return "WinVista";
    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("windows 7") > -1;
    if (isWin7)
      return "Win7";
    var isWin10 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("windows nt 10") > -1;
    if (isWin10)
      return "Win10";
  }
  return "other";
}

export function convertBase64UrlToBlob (urlData) {
  const array = urlData.split(',');
  const type = array[0].match(/:(.*?);/)[1];
  const bytes = atob(urlData.split(',')[1]); // 去掉 url 的头，并转换为 byte

  // 处理异常,将 ascii 码小于 0 的转换为大于 0
  const ab = new ArrayBuffer(bytes.length);
  const u8arr = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    u8arr[i] = bytes.charCodeAt(i);
  }
  return new Blob([u8arr] , { type });
}

/**
 * 
 * @param {String} propertyName 
 * @returns 
 */
export function getQueryProperty (propertyName) {
  const query = {};
  const querys = decodeURI(window.location.search.substring(1)).split('&');
  querys.forEach(q => {
    const temp = q.split('=');
    query[temp[0]] = temp[1];
  })
  return query[propertyName];
}
