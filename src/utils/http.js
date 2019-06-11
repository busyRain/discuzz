import axios from "axios";
import Vue from 'vue'
import {
	SetCookies,
	GetCookies,
	DelCookies
} from './setCookies.js'

// if (process.env.NODE_ENV == 'development') {
// 	axios.defaults.baseURL = 'http://api.feileyuan.club/';
// } else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'http://api.feileyuan.com/';
// }
axios.defaults.timeout = 10000;

axios.defaults.headers = {
	'X-Requested-With': 'XMLHttpRequest',
	"Content-Type": "application/json;charset=utf-8"
};


axios.interceptors.request.use(
	function(config) {
		if (config.url.indexOf('?') >= 0) {
			config.url += ('&_t=' + new Date().getTime());
		} else {
			config.url += '?_t=' + new Date().getTime();
		}
		//token放到header里
		try {
			var cookie = GetCookies('uInfo');
			var token = cookie ? JSON.parse(cookie).token : '';
			var username = cookie ? JSON.parse(cookie).loginName : '';
			if (token) {
				config.headers['TOKEN'] = token;
				config.headers['UN'] = username;
			}
		} catch (e) {}

		return config;
	},
	function(err) {
		return Promise.reject(err);
	}
);

//响应拦截器即异常处理
axios.interceptors.response.use(
	response => {
		return response;
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
					err.message = "拒绝访问";
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
export const Api = {
	simpleUploadURL: axios.defaults.baseURL + "file/upload?_t=" + new Date().getTime(),
	header: function() {
		var config = {
			'X-Requested-With': 'XMLHttpRequest'
		};
		try {
			var cookie = GetCookies('uInfo');
			var token = cookie ? JSON.parse(cookie).token : '';
			var username = cookie ? JSON.parse(cookie).loginName : '';
			if (token) {
				config['TOKEN'] = token;
				config['UN'] = username;
			}
		} catch (e) {}

		return config;
	}
};
export function Get(url, param) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: param
			})
			.then(res => {
				resolve(res.data)
			})
			.catch(error => {
				reject(error)
			})
	})
};
export function Post(url, param) {
	return new Promise((resolve, reject) => {
		axios.post(url, param)
			.then(res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
	})
};
