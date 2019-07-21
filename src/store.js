import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api/list";
import {
	GetCookie
} from "@/utils/setCookies.js";

Vue.use(Vuex);
let _domain = "";
if (process.env.NODE_ENV == 'development') {

	_domain = 'localhost'; 
	// _domain = 'localhost'; 
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
  },
  mutations: {
    GET_SECTIONID:(state,params) =>{
      state.sectionIds = params
      console.log(params)
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
      console.log(document.cookie)
      state.token = "";
      state.username = "";
      state.sectionIds = []
      console.log(GetCookie("token"))
		}
    
  },
  actions: {
    Login({commit}, params) {
			commit("GET_SECTIONID", params);
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
      commit("GET_USERINFO",{username:'',token:''})
			commit("CLEAR");
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
