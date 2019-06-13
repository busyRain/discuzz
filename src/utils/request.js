import axios from "axios";
import { Message } from "element-ui";
import { GetCookies,DelCookies } from "@/utils/setCookies.js";
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
// service.interceptors.response.use(
//   response => {
//     const res = response.data;
//     switch (res.code) {
//       case 0:
//         return response.data;
//       case 403:
//         Message({
//           message:'用户未登录，请先登录',
//           type:'error',
//           duration:5000
//         })
//         DelCookies("uInfo");
//         this.$store.dispatch('getIsLogin',false)
//       default:
//         Message({
//           message: res.msg,
//           type: "error",
//           duration: 5000
//         });
//     }
//   },
//   error => {
//     console.log("err" + error);
//     Message({
//       message: error.message,
//       type: "error",
//       duration: 5 * 1000
//     });
//     return Promise.reject(error);
//   }
// );
service.interceptors.response.use(
	response => {
		return response.data;
	},
	err => {
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					err.message = "错误请求";
					break;
				case 401:
					err.message = "登录信息失效";
					break;
				case 403:
					err.message = "用户未登录";
					break;
				case 404:
					err.message = "请求错误,未找到该资源";
					break;
				case 405:
					err.message = "请求方法未允许";
					break;
				case 408:
					err.message = "请求超时";
					break;
				case 500:
					err.message = "服务器端出错";
					break;
				case 501:
					err.message = "网络未实现";
					break;
				case 502:
					err.message = "网络错误";
					break;
				case 503:
					err.message = "服务不可用";
					break;
				case 504:
					err.message = "网络超时";
					break;
				case 505:
					err.message = "http版本不支持该请求";
					break;
				default:
					err.message = `连接错误${err.response.status}`;
			}
		} else {
			err.message = "连接到服务器失败";
		}
		return Promise.resolve(err.response);
	}
);
export default service;
