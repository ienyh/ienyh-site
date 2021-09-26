
class EventEmitter {

  static list = { };

  constructor () {
    throw Error('EventEmitter can not construct!');
  };

  // 订阅
  static on = (event, func) => {
    (this.list[event] || (this.list[event] = [])).push(func);
    return this;
  }

  // 仅订阅一次
  static once = (event, func) => {
    const _this = this;
    // 先绑定，调用后删除
    function tmp () {
      _this.off(event, tmp);
      // func.apply(_this, arguments);
      Reflect.apply(func, _this, arguments);
    }
    tmp.func = func;
    _this.on(event, tmp);
    return _this;
  }

  // 发布
  static emit = (...argv) => {
    const event = Array.prototype.shift.call(argv);
    const funcs = this.list[event] ? [...this.list[event]] : [];
    // 如果缓存列表里没有 fn 就返回 false
    if (!funcs || funcs.length === 0) return false;
    // 遍历 event 值对应的缓存列表，依次执行 fn
    funcs.forEach(func => {
      func.apply(this, argv);
    });
    return this;
  }

  static off = (event, func) => {
    let funcs = this.list[event];
    if (!funcs) return this; // 如果缓存列表中没有相应的 func，返回
    if (!func) {
      funcs && (funcs = []); // 如果没有传 func 的话，就会将 event 值对应缓存列表中的 func 都清空
    } else {
      // 若有 func，遍历缓存列表，看看传入的 func 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
      let cb;
      for (let i = 0, cbLen = funcs.length; i < cbLen; i++) {
        cb = funcs[i];
        if (cb === func || cb.func === func) {
          funcs.splice(i, 1);
          break
        }
      }
    }
    return this;
  }
}

export default EventEmitter;
