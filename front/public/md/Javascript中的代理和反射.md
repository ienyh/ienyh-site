## 写在前面

---

> **坚持，写博客，记笔记 😀, 加油!**

**ECMAScript 6 新增的代理与反射**为开发者提供了**拦截并向<u>基本操作</u>（如属性查找、赋值、枚举、函数调用等）嵌入额外行为的能力**。

也就是，可以给目标对象定义一个关联的代理对象，而这个**代理对象可以作为抽象的目标来使用**。

## 代理（*Proxy: ['prɑksi]*）

---

### 概念

> 我个人的理解就是给目标对象添加了一层“拦截”，不管你是要对目标对象进行访问还是执行什么操作，都必须要经过这层“拦截”，而这层“拦截”<u>想做什么</u>（也就是上面所说的**嵌入额外行为**）则由**代理**来决定

**使用 `Proxy()` 构造函数创建一个代理**，这个构造函数接收两个参数：

- **目标处理对象 `target`**：可以是任何类型的对象，包括原生数组，函数，甚至另一个代理
- **处理程序对象 `handler`**：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理的行为。

最简单的代理就是**空代理**，什么也不做仅仅是作为一个抽象的目标对象，这样在代理对象上执行的所有操作都会没有任何加工的直接到目标对象。

```javascript
const target = { name: "ienyh" };
const proxy = new Proxy(target, {});

proxy.name = "ienyh_2";
console.log(proxy.name); // ienyh_2
```

### 处理程序对象 `handler` 中的捕获器

当我们想要在这层“拦截”中想做些什么也就是嵌入额外行为的时候，我们就需要**在处理程序对象  `handler` 中定义要代理的行为**了，也就是定义**捕获器**：

> **捕获器就是在处理程序对象中定义的“基本操作的拦截器”**

捕获器一共有 *13* 种分别是：`get()`、`set()`、`has()`、`defineProperty()`、`getOwnPropertyDescriptor()`、`deleteProperty()`、`ownKeys()`、`getPrototypeOf()`、`setPrototypeOf()`、`isExtension()`、`preventExtensions()`、`apply()`、`construct()`

这里暂时先只介绍 `get()` 和 `set()` 这两种

#### 1. `get()`

当代理对象**执行 `get()` 操作**（指 `proxy[property]` 或 `proxy.property` 等读取操作）时就会触发 `get()` 捕获器，当然这个 `get()` 操作并不是 *ECMAScript* 对象可以直接调用的方法，而是由于 `proxy[property]` 或 `proxy.property` 等取值操作触发的。

`get` 方法用于**拦截某个属性的读取操作**，可以接受三个参数，依次为**目标对象 `target`**、**属性名 `key`** 和 **代理对象 `proxy`** （可选）。

注意：是在**代理对象**上执行上面的操作才会触发捕获器的行为，在原目标对象上执行这些操作依然是原始行为。

```javascript
const student = { name: "ienyh", age: 21, gender: "male" };
const proxy = new Proxy(student, {
  get (target, key) {
    if (key === "age") {
      return target[key] + 1;
    }
    return target[key];
  },
});

console.log(proxy.name); // ienyh_2
console.log(student.age); // 21
console.log(proxy.age); // 22
```

#### 2. `set()`

`set` 方法用来拦截某个属性的**赋值操作**，可以接受四个参数，依次为**目标对象 `target`**、**属性名 `key`**、**属性值 `value`** 和 **代理对象 `proxy`** （可选）。

```javascript
const student = { name: "ienyh", age: 21, gender: "male" };
const proxy = new Proxy(student, {
  set(target, key, value) {
    if (key === "age") {
      if (value < 0) {
        target[key] = 0;
      } else {
        target[key] = value;
      }
    } else {
      target[key] = value;
    }
  },
});

proxy.age = -21;
console.log(student); // { name: 'ienyh', age: 0, gender: 'male' }
proxy.age = 12;
console.log(student); // { name: 'ienyh', age: 12, gender: 'male' }
```

### 可撤销的代理

使用 `new Proxy()` 创建的**普通代理是不可撤销的**，普通代理对象和目标对象之间的练习是一直存在的，但有时候我们是需要切断这种联系的。

我们可以**使用 `Proxy` 类的静态方法 `Proxy.revocable()` 来生成一个可以撤销的代理对象**

撤销函数和代理对象是在**实例化时同时生成**的

```javascript
const { proxy, revoke } = Proxy.revocable(target, handler);
// 需要撤销代理时直接调用 revoke() 就可以了
revoke()
```

撤销代理之后就不可以再调用 `proxy` 对象了，不然会报错 `TypeError`

## 反射（*Reflect [rɪ'flekt]*）

---

### 概念

处理程序对象 `handler` 中所有的捕获器都有对应的反射方法，这些方法与捕获器拦截的方法具有相同的**名称**和**函数签名**，而且与被拦截方法的行为也一致。不过反射 API 可不止限于在处理程序中使用。

其实反射就是一个对象，不是一个构造方法，对象上有很多方法，类似于 `Math` 对象。

在 `Object.prototype` 上有的很多方法，`Reflect` 对象上也有。

> 通常来说，**`Object` 原型上的方法适用于通用程序**，而**反射方法更适用于细粒度的对象控制与操作**。

我们可以轻松的应用它们：

```javascript
const student = { name: "ienyh", age: 21, gender: "male" };
const proxy = new Proxy(student, {
  get(target, key) {
    console.log("[get]:", key);
    return Reflect.get(...arguments);
  },
}

proxy.age; // [get]: age
```

### 反射 API

反射 API 与处理程序对象 `handler` 中的捕获器对应的也共有 *13* 种。

| 反射 API                             | 参数                                  | 返回值                       | 拦截的操作 |
| ------------------------------------ | :------------------------------------ | :--------------------------- | :--------- |
| `Reflect.get()`                      | `(target, property, receiver)`        | 返回值无限制                 |            |
| `Reflect.set()`                      | `(target, property, value, receiver)` | `boolean`                    |            |
| `Reflect.has()`                      | `(target, property)`                  | `boolean`                    |            |
| `Reflect.defineProperty()`           | `(target, property, descriptor)`      | `boolean`                    |            |
| `Reflect.getOwnPropertyDescriptor()` | `(target, property)`                  | 对象                         |            |
| `Reflect.deleteProperty()`           | `(target, property)`                  | `boolean`                    |            |
| `Reflect.ownKeys()`                  | `(target)`                            | 包含字符串或符号的可枚举对象 |            |
| `Reflect.getPrototypeOf()`           | `(target)`                            | 对象或 `null`                |            |
| `Reflect.setPrototypeOf()`           | `(target, property)`                  | `boolean`                    |            |
| `Reflect.isExtension()`              | `(target)`                            | `boolean`                    |            |
| `Reflect.preventExtensions()`        | `(target)`                            | `boolean`                    |            |
| `Reflect.apply()`                    | `(target, thisArg, argumentList)`     | 返回值无限制                 |            |
| `Reflect.construct()`                | `(target, argumentList, newTarget)`   | 必须返回一个对象             |            |

```javascript
const obj = {
	name: "ienyh",
  age: 21,
  hobby: [ "eat", "sleep", "coding" ],
  school: { name: "a school" },
};
```

#### `Reflect.get()`

#### `Reflect.set()`

*Reflect.set(target, propertyKey, value, receiver): Boolean* 

参数 receiver 可选，返回一个 Boolean 值表明是否成功设置属性。

```javascript
Reflect.set(obj, "name", "chenyh");
```

#### `Reflect.has()`

#### `Reflect.defineProperty()`

#### `Reflect.getOwnPropertyDescriptor()`

#### `Reflect.deleteProperty()`

####  `Reflect.ownKeys()`

#### `Reflect.getPrototypeOf()`

#### `Reflect.setPrototypeOf()`

#### `Reflect.isExtension()`

#### `Reflect.preventExtensions()`

#### `Reflect.apply()`

*Reflect.apply(Func, thisObj, argumentList)*

- *Func*: 需要执行的函数
- *thisObj*: 需要执行函数的上下文 this
- *argumentList*: 是一个数组或者伪数组，会作为执行函数的参数

```javascript
Reflect.apply(Math.floor, undefined, [2.4]);
```

#### `Reflect.construct()`

### 优先使用代理的情况

#### 1. 状态标记

许多反射方法的返回值是一个 `boolean` 值，可以用于我们**判断操作是否成功**的**状态标记**。

```javascript
const ienyh = { name: "ienyh" };

Object.freeze(ienyh); // 使用 Object.freeze() 将对象冻结，下面的操作将会失败

if (Reflect.defineProperty(ienyh, "age", { value: 21 })) {
  console.log("设置成功");
} else {
  console.log("设置失败"); // 将会打印
}
```

一下反射方法会提供状态标记：

- `Reflect.set()`
- `Reflect.defineProperty()`
- `Reflect.preventExtions()`
- `Reflect.setPrototypeOf()`
- `Reflect.deleteProperty()`

#### 2. 用反射方法代替操作符

| 反射方法                   | 可以替代的操作符 |
| :------------------------- | ---------------- |
| `Reflect.get()`            | 对象属性访问     |
| `Reflect.set()`            | `=` 赋值操作符   |
| `Reflect.has()`            | `in` 或 `with()` |
| `Reflect.deleteProperty()` | `delete`         |
| `Reflect.construct()`      | `new`            |

#### 3. 安全应用

比如在通过 `apply()` 调用函数时，被调用的函数可能定义了自己的 `apply()` 属性（可能性较小），为了避免就需要这么写：

```javascript
Function.prototype.apply.call(Func, thisObj, argumentList);
```

但这样的写法过于“糟糕”，我们就需要一个简单的反射方法：

```javascript
Reflect.apply(Func, thisObj, argumentList);
```

## 总结 *& Last*

---

> 代理和反射的应用场景是不可限量的，开发者可以用它创建出各种各样的编码模式，包括（远远不限于）**跟踪属性访问**、**隐藏属性**、**组织修改或删除属性**、**函数参数验证**、**构造函数参数验证**、**数据绑定**、以及**可观察对象**。

欢迎在评论区交流学习，一起学习哈哈哈 👨‍💻！

点个赞，点个关注吧 😆。

