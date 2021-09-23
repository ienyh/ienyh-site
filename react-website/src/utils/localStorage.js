const localStorage = window.localStorage;

export const get = (key) => {
  return localStorage.getItem(key) || '';
}

export const set = (key, value) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

export const remove = (key) => {
  localStorage.removeItem(key);
}

export const clear = () => {
  localStorage.clear();
}

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