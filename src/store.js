import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api/list";
<<<<<<< HEAD
import { stat } from "fs";
import test from '@/utils/test'
=======
import {
	GetCookie
} from "@/utils/setCookies.js";

>>>>>>> db6be9416c4f1bfe55efac989e1ff7b625659a0d
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disList: {},
    isShowAdd:false,
<<<<<<< HEAD
    islogin:false,
    token:test.getCookie('token')||'',
    username:test.getCookie("username")||'',
=======
    token: GetCookie("token"),
		username: GetCookie("username"),
>>>>>>> db6be9416c4f1bfe55efac989e1ff7b625659a0d
  },
  mutations: {
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
      //debugger;
			dateExpire.setTime(dateExpire.getTime() - 10000);
			for (var idx = 0; idx < siteCookies.length; idx++) {
				var itemCookie = siteCookies[idx],
        keyvalues = itemCookie.split("=");
       
				document.cookie = keyvalues[0] + "=" + keyvalues[1] + ";domain=.feileyuan.com;expires=" + dateExpire.toGMTString() + ';path=/;';
      }
      console.log(document.cookie)
      state.token = "";
      state.username = "";
      console.log(GetCookie("token"))
		}
    
  },
  actions: {
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
