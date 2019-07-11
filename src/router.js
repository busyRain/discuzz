import Vue from "vue";
import Router from "vue-router";
import Default from "./views/Default.vue";
import store from './store';

Vue.use(Router);
 let isLogin = () => { //判断是否登录
	try {
    
		return !!(store.state.token);
	} catch (e) {
		return false;
	}
}
let limitNotLogin = (to, from, next) => {
	if (isLogin()) {
		next('/');
	} else {
		next();
	}
};

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/",
    //   redirect: ""
    // },
    {
      path: "/",
      redirect:'home',
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
          path:"addTop",
          component:() => import("./components/disList/showAdd")
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
          beforeEnter: limitNotLogin,
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
          beforeEnter: limitNotLogin,
          component: () => import("./components/user/bound")
        },
        {
          path: "findPassword",
          name: "findPassword",
          component: () => import("./components/user/findPassword")
        }
      ]
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: () => import("./components/common/blank"),
    },
  ]
});
