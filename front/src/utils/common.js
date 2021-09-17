

/**
 * 
 * @param {Date} date 
 * @param {String} timeStr {"yyyy/mm/dd"}
 * @returns {String} 格式化字符串
 */
export function formatTime (date = new Date(), timeStr) {
  let addZero = function (data) {
      if (data < 10) {
          return '0' + data
      }
      return data
  }
  let obj = {
      'yyyy': date.getFullYear(),
      'yy': date.getFullYear() % 100,
      'MM': addZero(date.getMonth() + 1),
      'M': date.getMonth() + 1,
      'dd': addZero(date.getDate()),
      'd': date.getDate(),
      'HH': addZero(date.getHours()),
      'H': date.getHours(),
      'hh': addZero(date.getHours() % 12),
      'h': date.getHours() % 12,
      'mm': addZero(date.getMinutes()),
      'm': date.getMinutes(),
      'ss': addZero(date.getSeconds()),
      's': date.getSeconds(),
      'w': function () {
          arr = ['日', '一', '二', '三', '四', '五', '六']
          return arr[date.getDay()]
      }()
  }
  for (let i in obj) {
      timeStr = timeStr.replace(i, obj[i])
  }
  return timeStr
}

/**
 * 
 * @param {*} m 
 * @param {*} n 
 * @returns 
 */
export function randomInt (m, n) {
  return parseInt(Math.random() * (n - m + 1) + n, 10);
}