import { api } from "../../api";

const state = {
  // state used to store to dos list
  toDos: [],
  pagination: {
    currentPage: 0,
    lastPage: undefined,
  },
};
// NOTE: All getter names should start with 'get'
const getters = {
  // getter used to get the list of to dos
  getToDos: (state) => state.toDos,
  getPagination: (state) => state.pagination,
};
// NOTE: All mutations should have prototypes like this:
// mutationName(state, payload)
// All mutation names should start with 'set'
const mutations = {
  // mutation update the state of to dos list
  setToDos(state, payload) {
    state.toDos = state.toDos.concat(payload);
  },
  // mutation used to add new to do item in state
  setCreateToDo(state, payload) {
    state.toDos.unshift(payload);
  },
  // mutation used to delete the ceratin to do from the state
  setDeleteToDo(state, payload) {
    state.toDos = state.toDos.filter((item) => {
      return item.id != payload.id;
    });
  },
  // mutation used to update specific to do in the state
  setUpdateToDo(state, payload) {
    let updatedToDo = state.toDos.find((item) => {
      return item.id == payload.id;
    });
    Object.assign(updatedToDo, payload);
  },

  setPagination(state, payload) {
    state.pagination = payload;
  },

  resetPagination(state) {
    state.pagination = {
      currentPage: 0,
      lastPage: undefined,
    };
  },

  resetToDos(state) {
    state.toDos = []
  }
};
// Call mutations to update state accordingly (avoid updating state directly)
const actions = {
  // Hits the createToDo endpoint to add the newly created in the list
  createTodo(context, payload) {
    return new Promise((resolve, reject) => {
      api
        .post("/item", localStorage.getItem("token"), payload)
        .then((response) => {
          // mutation used to add new to do item in state
          context.commit("setCreateToDo", response.data.item);
          resolve();
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  // Hits the fetchToDos endpoint to get the list of all to dos
  fetchToDos(context, page) {
    return new Promise((resolve, reject) => {
      api
        .get(`/items?page=${page}`, localStorage.getItem("token"))
        .then((response) => {
          // mutation update the state of to dos list
          context.commit("setToDos", response.data.items.data);
          context.commit("setPagination", {
            currentPage: response.data.items.current_page,
            lastPage: response.data.items.last_page,
          });
          resolve();
        })
        .catch((err) => {
          reject(err.response.status);
        });
    });
  },
  // Hits the deleteToDo endpoint to delete the specific to do item
  deleteToDo(context, payload) {
    return new Promise((resolve, reject) => {
      api
        .delete(`/item/${payload.id}`, localStorage.getItem("token"))
        .then(() => {
          // mutation used to delete the ceratin to do from the state
          context.commit("setDeleteToDo", payload);
          resolve();
        })
        .catch((err) => {
          reject(err.response.status);
        });
    });
  },
  // Hits the updateToDo endpoint to update the specific to do item
  updateToDo(context, payload) {
    return new Promise((resolve, reject) => {
      api
        .put(
          `/item/${payload.todo.id}`,
          localStorage.getItem("token"),
          payload.body
        )
        .then((response) => {
          // mutation used to update specific to do in the state
          context.commit("setUpdateToDo", response.data.item);
          resolve();
        })
        .catch((err) => {
          reject(err.response.status);
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
