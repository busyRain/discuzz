import axios from "axios";
import { Message } from "element-ui";
import { GetCookies } from "@/utils/setCookies.js";
// axios.defaults.transformRequest = [
//   function(data) {
//     let ret = "";
//     for (let it in data) {
//       ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
//     }
//     return ret;
//   }
// ];
let service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded"
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json;charset=utf-8"
  }
});
//请求
service.interceptors.request.use(config => {
  if (config.url.indexOf("?") >= 0) {
    config.url += "&_t=" + new Date().getTime();
  } else {
    config.url += "?_t=" + new Date().getTime();
  }
  //token放到header里
  try {
    let cookie = GetCookies("uInfo");
    let token = cookie ? JSON.parse(cookie).token : "";
    let username = cookie ? JSON.parse(cookie).loginName : "";
    if (token) {
      config.headers["TOKEN"] = token;
      config.headers["UN"] = username;
    }
  } catch (e) {
    console.log(e);
  }
  return config;
});
error => {
  console.log(error);
  return Promise.reject(error);
};
//响应
service.interceptors.response.use(
  response => {
    const res = response.data;
    switch (res.code) {
      case 0:
        return response.data;
      default:
        Message({
          message: res.msg,
          type: "error",
          duration: 5000
        });
    }
  },
  error => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);
export default service;
