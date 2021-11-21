import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store";
import axios from "axios";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import infiniteScroll from "vue-infinite-scroll";
import "@/assets/tailwind/tailwind.css";
import "@/assets/tailwind/index.css"

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(infiniteScroll);

new Vue({
  router,
  axios,
  store,
  vuetify,

  // vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount("#app");
