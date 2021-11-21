import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import toDo from "./modules/toDo";

const store = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    toDo,
  },
};

Vue.use(Vuex);
export default new Vuex.Store(store);
