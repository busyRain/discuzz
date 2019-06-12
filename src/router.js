import Vue from "vue";
import Router from "vue-router";
import Default from "./views/Default.vue";
import {
	SetCookies,
	GetCookies
} from '@/utils/auth.js'

Vue.use(Router);
let isLogin = () => { //判断是否登录
	try {
		let cookie = GetCookies('uInfo');
		let userInfo = JSON.parse(cookie);
		return !!(userInfo && userInfo.token);
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
  // mode: "hash",
  // base: process.env.BASE_URL,
  routes: [
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
          beforeEnter: limitNotLogin,
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
    }
  ]
});
