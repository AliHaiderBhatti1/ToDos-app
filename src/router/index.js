import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue"
import SignUp from "../components/SignUp.vue"


Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            meta: { title: "Login", requireAuth: false },
            component: require("@/components/Login.vue"),
          },
          {
            path: "/login",
            name: "login",
            meta: { title: "Login",  requireAuth: false },
            component:Login,
          },
          {
            path: "/signup",
            name: "signup",
            meta: { title: "Sign Up",  requireAuth: false },
            component:SignUp,
          },
    ]
})

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.title);
      if(nearestWithTitle.name == 'Home')  next({
        name: "login",
      });
    if (nearestWithTitle)
      document.title =nearestWithTitle.meta.title;
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!localStorage.getItem("token")) {
        next({
          name: "login",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  export default router;