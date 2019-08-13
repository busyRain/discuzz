import Vue from "vue";
import Router from "vue-router";
import Default from "@/layout/master/Default.vue";
import SubDefault from "@/layout/master/SubDefault.vue";
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
		{
			path: "/",
			redirect: 'home',
			component: Default,
			children: [{
					path: "", //论坛首页
					name: "home",
					component: () => import("./views/Home")
				},
				{
					path: "search",
					name:'search',
					component: () => import("./views/Search")
				}
			]
		},
		{
			path: "/",
			redirect: 'home',
			component: SubDefault,
			children: [
				{
					path: "disList/:id",
					component: () => import("./views/DisList")
				},
				{
					path: "addTop",
					component: () => import("./components/disList/showAdd")
				},
				{
					path: "disDetail/:id",
					component: () => import("./views/DisDetail")
				},
				{
					path:"editTopic",
					component:() =>import("./components/detail/editContent")
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
