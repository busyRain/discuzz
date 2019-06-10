import Vue from "vue";
import Router from "vue-router";
import Default from "./views/Default.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "discuzz"
    },
    {
      path: "/discuzz",
      name: "discuzz",
      component: Default,
      children: [
        {
          path: "", //论坛首页
          name: "home",
          component: () => import("./views/Home")
        },
        {
          path: "disList/:id",
          component: () => import("./views/DisList")
        },
        {
          path: "disDetail/:id",
          component: () => import("./views/DisDetail")
        }
      ]
    },
    {
      path: "/user",
      redirect: "login",
      component: () => import("./views/User"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("./components/user/login")
        },
        {
          path: "register",
          name: "register",
          component: () => import("./components/user/register")
        },
        {
          path: "bound",
          name: "bound",
          component: () => import("./components/user/bound")
        },
        {
          path: "findPassword",
          name: "findPassword",
          component: () => import("./components/user/findPassword")
        }
      ]
    }
  ]
});
