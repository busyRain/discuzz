import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api/list";
import { stat } from "fs";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disList: {},
    isShowAdd:false,
    islogin:false,
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
    getIsLogin({commit},params) {
      commit("GET_ISLOGIN",params)
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
    }
  }
});
