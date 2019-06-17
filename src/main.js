import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/common.scss";
import "@/assets/icon/iconfont.css";
import axios from "@/utils/request.js";
import { formatDate } from "@/utils/formatDate";
import baseFilter from "@/utils/date";

import { SetCookies, GetCookies, DelCookies } from "@/utils/setCookies.js";
<<<<<<< HEAD
import test from "@/utils/test.js";
// import "./registerServiceWorker";
const IMG_URL = "http://www.feileyuan.com/";
=======
>>>>>>> db6be9416c4f1bfe55efac989e1ff7b625659a0d

if (process.env.NODE_ENV == 'development') {
	Vue.prototype.$IMG_URL = 'http://www.feileyuan.com/';
	Vue.prototype.$BBS_URL = 'http://www.feileyuan.com/';
} else if (process.env.NODE_ENV == 'production') {
	Vue.prototype.$IMG_URL = 'http://www.feileyuan.com/';
	Vue.prototype.$BBS_URL = 'http://www.feileyuan.com/';
}
Vue.prototype.$setCookie = SetCookies;
Vue.prototype.$getCookie = GetCookies;
Vue.prototype.$delCookie = DelCookies;

Vue.prototype.$axios = axios;
<<<<<<< HEAD
Vue.prototype.$Api = Api;
Vue.prototype.$get = Get;
Vue.prototype.$post = Post; 
Vue.prototype.$test = test;
=======
>>>>>>> db6be9416c4f1bfe55efac989e1ff7b625659a0d
Vue.prototype.$formatDate = formatDate;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(baseFilter);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
