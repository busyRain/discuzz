import axios from "axios";
import { Message } from "element-ui";
import { GetCookies } from "@/utils/setCookies.js";
import store from '../store';
axios.defaults.transformRequest = [
  function(data) {
    let ret = "";
    for (let it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  }
];
let postForm = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
//请求
postForm.interceptors.request.use(config => {
  if (config.url.indexOf("?") >= 0) {
    config.url += "&_t=" + new Date().getTime();
  } else {
    config.url += "?_t=" + new Date().getTime();
  }
  //token放到header里
  try {
    var token = store.state.token ? Base64.decode(unescape(store.state.token)) : "";
    var username = store.state.username ? Base64.decode(unescape(store.state.username)) : "";
  
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
postForm.interceptors.response.use(
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
export default postForm;
