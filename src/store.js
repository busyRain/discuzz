import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api/list";
import { stat } from "fs";
import test from '@/utils/test'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disList: {},
    isShowAdd:false,
    islogin:false,
    token:test.getCookie('token')||'',
    username:test.getCookie("username")||'',
  },
  mutations: {
    GET_DISLIST: (state, params) => {
      state.disList = params;
      console.log(params);
    },
    GET_ISSHOWADD:(state,params) =>{
      state.isShowAdd = params
    },
    GET_ISLOGIN:(state,params) =>{
      state.islogin = params
    },
    GET_USERINFO:(state,params) =>{
      state.token = params.token
      state.username = params.username
      localStorage.setItem("token",state.token)
      localStorage.setItem("username",state.username)
    },
    CLEAR: function() {
			localStorage.clear();
			localStorage.removeItem("token");
			localStorage.removeItem("username");
			var dateExpire = new Date(),
      siteCookies = document.cookie.split("; ");
      //debugger;
			dateExpire.setTime(dateExpire.getTime() - 10000);
			for (var idx = 0; idx < siteCookies.length; idx++) {
				var itemCookie = siteCookies[idx],
					keyvalues = itemCookie.split("=");
				document.cookie = keyvalues[0] + "=" + keyvalues[1] + ";expire=" + dateExpire.toGMTString();
      }
      console.log(document.cookie)
		}
    
  },
  actions: {
    init({commit},params){
      commit("GET_USERINFO",params)
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
    getIsLogin({commit},params) {
      commit("GET_ISLOGIN",params)
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
    islogin : state =>{
      return state.islogin
    },
    userInfo : state =>{
      return userInfo
    }
  }
});
