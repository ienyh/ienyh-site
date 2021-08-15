# 项目中关于 axios 拦截器以及 get 和 post 请求的封装

## 写在前面

> **坚持，记笔记 😀, 加油!**

## 一、axios 介绍

`axios` 是一个轻量的 HTTP 客户端，它基于 `XMLHttpRequest` 服务来执行 HTTP 请求，支持丰富的配置，支持 `Promise`，支持浏览器端和 Node.js 端。

## 二、axios 拦截器以及 get 和 post 请求的封装

关于 `axios` 拦截器（_Interceptors_）的设置代码官方给出了一份样式代码，可见 `axios` 的 [*github仓库地址*](https://github.com/axios/axios#interceptors)

```javascript
import axios from "axios"; // npm install axios --save
import { getToken } from "./localStorage"; // 这里是获取 token 的操作

const BASE_URL = "https://127.0.0.1:8000/api";

// 创建一个 axios 的实例 instance
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

/**
 * Add a request interceptor
 * 全局请求拦截器
 */
instance.interceptors.request.use(
  // config: 请求发送前的配置对象
  function (config) {
    // Do something before request is sent
    // 添加 token
    config.headers.Authorization = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

/**
 * Add a response interceptor
 * 全局响应拦截器
 */
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
```

使用刚刚创建的 `axios` 实例封装 `get` 和 `post` 请求

```javascript
export function get(shortURL, params?) {
  return instance.get(BASE_URL + shortURL, {
    params,
  });
}

export function post(shortURL, data) {
  return instance.post(BASE_URL + shortURL, data);
}
```

## 三、参考

## 四、Last

如果有任何疑问欢迎在评论区友好交流呦 😆。

- 欢迎关注我呦 😆，[我的 CSDN 博客主页](https://blog.csdn.net/qq_45265059)。
- 还有我的<font face="Hack">Github[@ienyh](https://github.com/ienyh)<font>一起学习哈哈哈 👨‍💻
