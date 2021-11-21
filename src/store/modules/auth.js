import { baseURL } from "../../api";
import axios from "axios";
import router from "@/router";
const state = {
  // state used to store token
  token: null,
};
// NOTE: All getter names should start with 'get'
const getters = {
  // getter used to store token
  getToken: (state) => state.token,
};
// NOTE: All mutations should have prototypes like this:
// mutationName(state, payload)
// All mutation names should start with 'set'
const mutations = {
  // mutation used to update the token state
  setToken(state, payload) {
    state.token = payload;
  },
};
// Call mutations to update state accordingly (avoid updating state directly)
const actions = {
  // Hits the Login endpoint
  login(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}/login`, payload)
        .then((response) => {
          // maintain the token state
          context.commit("setToken", response.data.user.token);
          // store token in localStorage
          localStorage.setItem("token", response.data.user.token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // Hits the register endpoint to register the user
  signup(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseURL}/register`, payload)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // Logout the user
  logout(context, payload) {
    return new Promise((resolve, reject) => {
      // Routes to login screen
      router.push({ name: "login" });
      // Clear the toDos state
      context.commit("resetToDos");
      context.commit("resetPagination");
      axios
        .post(`${baseURL}/logout`, payload)
        .then(() => {
          // Removes the token
          context.commit("setToken", null);
          localStorage.removeItem("token");
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
