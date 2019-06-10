import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api/list";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disList: {},
    isShowAdd:false,
  },
  mutations: {
    GET_DISLIST: (state, params) => {
      state.disList = params;
      console.log(params);
    },
    GET_ISSHOWADD:(state,params) =>{
      state.isShowAdd = params
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
    }
  },
  getters: {
    disList: state => {
      console.log(state.disList);
      return state.disList;
    },
    isShowAdd: state => {
      return state.isShowAdd;
    }
  }
});
