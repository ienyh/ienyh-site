import axios from "axios";

const BASE_URL = "http://1.117.43.137:9000";

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
 * 全局请求拦截
 */
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

/**
 * Add a response interceptor
 * 全局响应拦截
 */
instance.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export function get(shortURL, params) {
  return instance.get(BASE_URL + shortURL, {
    params,
  });
}

export function post(shortURL, data) {
  return instance.post(BASE_URL + shortURL, data);
}
