# JavaScript 中实现深拷贝的几种方法

## 递归实现

```javascript
/**
 * 实现对象或数组的深拷贝
 * @param {*} origin 被拷贝的对象或者数组
 * @param {*} target 目标对象或者数组
 * @returns 返回拷贝后的对象
 */
function deepClone (origin, target = Array.isArray(origin) ? [] : {}) {
  if (!origin || typeof origin !== "object") { return origin; }
  for (const key in origin) {
    if (Object.hasOwnProperty.call(origin, key)) {
      target[key] = deepClone(origin[key]);
    }
  }
  return target;
}
```

## 使用 `JSON.stringfy()` 和 `JSON.parse()` 方法

这种方法就非常简单了，先用 `JSON.stringfy()` 将 *JavaScript* 对象序列化成 *JSON* 字符串，让后再用 `JSON.parse()` 转化回去就完成了一次深拷贝。

```javascript
const ienyh_copy_2 = JSON.parse(JSON.stringify(ienyh));
```

## 使用 `Object.assign()` 方法

`Object.assign()` 方法用于**将所有可枚举属性的值从一个或多个源对象分配到目标对象**。它将返回目标对象。

```javascript
const ienyh = { name: "ienyh", age: 21 };

const ienyh_copy_3 = Object.assign({}, ienyh);
console.log(ienyh_copy_3); // { name: 'ienyh', age: 21 }
```

## 直接使用工具库， 比如 Lodash 中的`_.cloneDeep(value)`

```javascript
const objects = [{ 'a': 1 }, { 'b': 2 }];
 
const deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]); // false
```

