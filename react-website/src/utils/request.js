import axios from "axios";
import LocalStorage from './LocalStorage';

const BASE_URL = "https://www.chenyh.site:9000";
// const BASE_URL = "https://localhost:9000";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
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
  function (config) {
    config.headers.Authorization = 'Bearer ' + LocalStorage.get('token');
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
