import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api/list";
import * as apiLogin from "@/api/login";
import {
	GetCookie
} from "@/utils/setCookies.js";

Vue.use(Vuex);
let _IMG_URL = "",
	_domain = "";
if (process.env.NODE_ENV == 'development') {
	_IMG_URL = 'http://www.feileyuan.com/';
	//	_domain = '.feileyuan.club'; 
	_domain = 'localhost';
} else if (process.env.NODE_ENV == 'production') {
	_IMG_URL = 'http://www.feileyuan.com/';
	_domain = '.feileyuan.com';
}
export default new Vuex.Store({
	state: {
		disList: {},
		isShowAdd: false,
		sectionIds: localStorage.getItem("sectionIds") || [],
		auth: GetCookie("auth") || "",
		token: GetCookie("token") || "",
		username: GetCookie("username") || "",
		nickname: localStorage.getItem("nickname") || "",
		headimage: localStorage.getItem("headimage") || "",
		mobile: localStorage.getItem("mobile") || "",
		email: localStorage.getItem("email") || "",
		member: localStorage.getItem("member") || "",
		getUsers: {}
	},
	mutations: {
		SET_HTTPAUTH: function(state, value) {
			var auth = escape(Base64.encode(JSON.stringify(value)));
			localStorage.setItem("auth", auth);

			var token = escape(Base64.encode(value.token));
			localStorage.setItem("token", token);

			var username = escape(Base64.encode(value.username));
			localStorage.setItem("username", username);

			var exdate = new Date();
			exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000);
			document.cookie = "auth =" + auth + "; domain=" + _domain + ";expires=" + exdate.toGMTString() +
				';path=/;';
			document.cookie = "token=" + token + "; domain=" + _domain + ";expires=" + exdate.toGMTString() +
				';path=/;';
			document.cookie = "username=" + username + "; domain=" + _domain + ";expires=" + exdate.toGMTString() +
				';path=/;';

			state.token = token;
			state.username = username;
			state.auth = auth;
		},
		SET_NICKNAME: function(state, value) {
			localStorage.setItem("nickname", value);
			state.nickname = value;
		},
		SET_HEADIMAGE: function(state, value) {
			localStorage.removeItem("headimage");
			localStorage.setItem("headimage", value);
			state.headimage = value;
		},
		SET_MOBILE: function(state, value) {
			localStorage.removeItem("mobile");
			localStorage.setItem("mobile", value);
			state.mobile = value;
		},
		SET_EMAIL: function(state, value) {
			localStorage.removeItem("email");
			localStorage.setItem("email", value);
			state.email = value;
		},
		SET_MEMBER: function(state, value) {
			localStorage.removeItem("member");
			value = Base64.encode(JSON.stringify(value));
			localStorage.setItem("member", value);
			state.member = value;
		},
		GET_SECTIONID: (state, params) => {
			state.sectionIds = params;
			localStorage.setItem("sectionIds", params)
		},
		GET_DISLIST: (state, params) => {
			state.disList = params;
		},
		GET_ISSHOWADD: (state, params) => {
			state.isShowAdd = params
		},

		GET_USERINFO: (state, params) => {
			state.token = params.token
			state.username = params.username
			localStorage.setItem("token", state.token)
			localStorage.setItem("username", state.username)
		},
		CLEAR: (state, params) => {
			localStorage.clear();
			var dateExpire = new Date(),
				siteCookies = document.cookie.split("; ");
			dateExpire.setTime(dateExpire.getTime() - 10000);
			for (var idx = 0; idx < siteCookies.length; idx++) {
				var itemCookie = siteCookies[idx],
					keyvalues = itemCookie.split("=");

				document.cookie = keyvalues[0] + "=" + keyvalues[1] + ";domain=" + _domain + ";expires=" + dateExpire.toGMTString() +
					';path=/;';
			}
			state.auth = "";
			state.token = "";
			state.username = "";
			state.nickname = "";
			state.headimage = "";
			state.mobile = "";
			state.email = "";
			state.member = "";
		},
		GET_USER: (state, params) => {
			state.getUsers = params;
		}
	},
	actions: {
		Login({
			commit
		}, params) {
			commit("GET_SECTIONID", params);
		},
		Update: function({
			commit
		}, callback) {
			apiLogin.getUser().then(
				function(response) {
					if (response.code == 0) {
						var user = response.data;

						if (user.imgurl)
							user.imgurl = _IMG_URL + user.imgurl;

						commit("SET_NICKNAME", user.nickname);
						commit("SET_HEADIMAGE", user.imgurl);
						commit("SET_MOBILE", user.tel);
						commit("SET_EMAIL", user.loginname);
						commit("SET_MEMBER", user);

						callback && callback();
					} else {
						commit("CLEAR");
					}
				},
				function(error) {}
			);
		},
		LoginDia({
			commit
		}, params) {
			commit("SET_HTTPAUTH", params);
		},
		async getBlock({
			commit
		}, params) {
			await api.getBlockTop(params).then(res => {
				const {
					data
				} = res;
				if (res.code == 0) {
					commit("GET_DISLIST", data);
				}
			});
		},
		getIsShowAdd({
			commit
		}, params) {
			commit("GET_ISSHOWADD", params)
		},
		Logout({
			commit
		}) {
			commit("GET_USERINFO", {
				username: '',
				token: ''
			})
			commit("CLEAR");
		},
		async getUser({
			commit,
			dispatch
		}, params) {
			await apiLogin.getUser().then(res => {
				if (res.code == 0) {
					dispatch('Login', res.data.sectionid);
					commit('GET_USER', res.data);

					if (res.data.imgurl)
						res.data.imgurl = _IMG_URL + res.data.imgurl;

					commit("SET_NICKNAME", res.data.nickname);
					commit("SET_HEADIMAGE", res.data.imgurl);
					commit("SET_MOBILE", res.data.tel);
					commit("SET_EMAIL", res.data.loginname);
					commit("SET_MEMBER", res.data);
				}
			})
		}
	},
	getters: {
		disList: state => {
			console.log(state.disList);
			return state.disList;
		},
		isShowAdd: state => {
			return state.isShowAdd;
		},

		userInfo: state => {
			return userInfo
		}
	}
});
