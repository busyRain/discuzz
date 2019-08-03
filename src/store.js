import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api/list";
import * as apiLogin from "@/api/login";
import {
	GetCookie
} from "@/utils/setCookies.js";

Vue.use(Vuex);
let _domain = "";
if (process.env.NODE_ENV == 'development') {

//	_domain = '.feileyuan.club'; 
	 _domain = 'localhost'; 
} else if (process.env.NODE_ENV == 'production') {

	_domain = '.feileyuan.com';
}
export default new Vuex.Store({
  state: {
    disList: {},
    isShowAdd:false,
    token: GetCookie("token"),
    username: GetCookie("username"),
    sectionIds:localStorage.getItem("sectionIds")||[],
    auth: GetCookie("auth") || "",
		token: GetCookie("token") || "",
    username: GetCookie("username") || "",
    getUsers:{}
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
    GET_SECTIONID:(state,params) =>{
      state.sectionIds = params
     
      localStorage.setItem("sectionIds",params)
    },
    GET_DISLIST: (state, params) => {
      state.disList = params;
      console.log(params);
    },
    GET_ISSHOWADD:(state,params) =>{
      state.isShowAdd = params
    },
  
    GET_USERINFO:(state,params) =>{
      state.token = params.token
      state.username = params.username
      localStorage.setItem("token",state.token)
      localStorage.setItem("username",state.username)
    },
    CLEAR:(state, params)=>{
      console.log("dfdfdfd")
			localStorage.clear();
			localStorage.removeItem("token");
      localStorage.removeItem("username");
			var dateExpire = new Date(),
      siteCookies = document.cookie.split("; ");
			dateExpire.setTime(dateExpire.getTime() - 10000);
			for (var idx = 0; idx < siteCookies.length; idx++) {
				var itemCookie = siteCookies[idx],
        keyvalues = itemCookie.split("=");
       
				document.cookie = keyvalues[0] + "=" + keyvalues[1] + ";domain="+_domain+";expires=" + dateExpire.toGMTString() + ';path=/;';
      }
      state.token = "";
      state.username = "";
      state.sectionIds = []
      state.auth = "";
			state.username = "";
    },
    GET_USER:(state,params)=>{
      state.getUsers = params
    }
    
  },
  actions: {
    Login({commit}, params) {
      commit("GET_SECTIONID", params);
    },
    LoginDia({commit},params) {
      commit("SET_HTTPAUTH", params);
    },
    async getBlock({ commit }, params) {
      await api.getBlockTop(params).then(res => {
        const { data } = res;
        if (res.code == 0) {
          console.log(data);
          commit("GET_DISLIST", data);
        }
      });
    },
    getIsShowAdd({commit},params) {
      commit("GET_ISSHOWADD",params)
    },
   
    Logout({commit}){
      console.log("logout")
      commit("GET_USERINFO",{username:'',token:''})
			commit("CLEAR");
    },
    async getUser({commit,dispatch},params) {
      await apiLogin.getUser().then(res=>{
        if(res.code ==0 ){
          dispatch('Login',res.data.sectionid)
          commit('GET_USER',res.data)
          
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
   
    userInfo : state =>{
      return userInfo
    }
  }
});
