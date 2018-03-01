import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    UserId: localStorage.getItem("UserId"),
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserId(state, payload) {
      state.UserId = payload;
    },
  },
  actions: {
    setToken({ commit }, payload) {
      commit("setToken", payload);
    },
    setUserId({ commit }, payload) {
      commit("setUserId", payload);
    },
  }
});
