const localStorage = window.localStorage;

function storageAvailable (type) {
  let storage;
  try {
    storage = window[type];
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}


// window.localStorage 工具类
class LocalStorage {

  constructor () {
    throw new Error('LocalStorage can not construct!')
  }

  /**
   * 
   * @param {string} key 键
   * @param {string | Array | Object} value 值
   * @param {number} expire 过期时间 单位 毫秒
   */
  static set = (key, value, expire = Infinity) => {
    const tmp = {
      data: value,
      time: Date.now(),
      expire,
    }
    localStorage.setItem(key, JSON.stringify(tmp));
  }

  static get = (key) => {
    const temp = localStorage.getItem(key);
    if (!temp) return null;
    const value = JSON.parse(temp);
    if (value?.time && value?.expire && Date.now() - value?.time >= value?.expire) {
      // 满足条件则说明过期了
      LocalStorage.remove(key);
      return null;
    }
    return value?.data ?? {};
  }

  static remove = (key) => {
    localStorage.removeItem(key);
  }

  static clear = () => {
    localStorage.clear();
  }
}

export default LocalStorage;
