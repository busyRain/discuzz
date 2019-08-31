import axios from "axios";
import {
	Message
} from "element-ui";

import store from '../store';

let service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 30000,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json;charset=utf-8"
	},
	retryDelay:10000
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
	return Promise.reject(error);
};
service.interceptors.response.use(
	response => {
		if (response.data.status == 403) { 
			Message({
				message: "请重新登录",
				type: 'error',
				duration: 5000
			});
			console.log(store)
			store.dispatch("Logout");
			return Promise.reject(response);
		} else {
			return response.data;
		}
	},
	err => {
		console.log("err");
		console.log(err);
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
					Message({
						message: err.message,
						type: 'error',
						duration: 5000
					})
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

		return Promise.reject(err.response);
	}
);
export default service;
