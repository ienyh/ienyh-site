
## 写在前面

> **坚持，记笔记 😀, 加油!**

## 一、理解原型

无论何时，只要创建一个函数，这个函数都会创建一个`prototype`属性，指向原型对象，包括应该**由特定引用类型的实例共享的属性和方法**。

构造函数有一个`prototype`属性，指向其原型对象，而原型对象会自动获得一个`constructor`属性，指向这个构造函数，也就是说**二者循环引用**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210610095932931.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MjY1MDU5,size_16,color_FFFFFF,t_70)
当调用构造函数创建一个实例时，这个**实例内部有一个`[[Prototype]]`会指向构造函数的原型对象**

而每个实例对象上会暴露`__proto__`属性，可以通过该属性访问对象的原型
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210610093526857.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MjY1MDU5,size_16,color_FFFFFF,t_70)
## 二、原型链

> 重温一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象有一个属性指回构造函数，而实例都包含一个内部指针指向原型对象。那么假如我们**让原型对象等于另一个类型的实例**，结果会怎样？显然，**此时的原型对象将包含一个指向另一个原型的指针**，相应地，**另一个原型中也包含着一个指向另一个构造函数的指针**。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。**如此层层递进，就构成了实例与原型的链条**。这就是所谓的原型链的基本概念。


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210610104424738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MjY1MDU5,size_16,color_FFFFFF,t_70)
这里`Child`没有使用默认的原型，而是**将`Parent`的实例作为它的原型**。

在读取实例上的属性的时候，首先会在实例上搜索这个属性。如果没有找到，则会搜索实例的原型。还没有找到的话将会搜索原型的原型。

对属性和方法的搜索会一直**持续到原型链的末端**。

## 三、Last
分享壁纸😬，点个赞吧

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210610112101292.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MjY1MDU5,size_16,color_FFFFFF,t_70#pic_center)


如果有任何疑问欢迎在评论区友好交流呦 😆。

- 欢迎关注我呦 😆，[我的 CSDN 博客主页](https://blog.csdn.net/qq_45265059)。
- 还有我的<font face="Hack">Github[@ienyh](https://github.com/ienyh)<font>一起学习哈哈哈 👨‍💻
