import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/common.scss";
import "@/assets/styles/layout.scss";
import "@/assets/icon/iconfont.css";
import axios from "@/utils/request.js";
import { formatDate } from "@/utils/formatDate";
import baseFilter from "@/utils/date";

import { SetCookies, GetCookies, DelCookies } from "@/utils/setCookies.js";

if (process.env.NODE_ENV == 'development') {
	Vue.prototype.$IMG_URL = 'https://images.feileyuan.club/';
	Vue.prototype.$BBS_URL = 'https://www.feileyuan.club/';
} else if (process.env.NODE_ENV == 'production') {
	Vue.prototype.$IMG_URL = 'http://images.feileyuan.com/';
	Vue.prototype.$BBS_URL = 'http://www.feileyuan.com/';
}
Vue.prototype.$setCookie = SetCookies;
Vue.prototype.$getCookie = GetCookies;
Vue.prototype.$delCookie = DelCookies;

Vue.prototype.$axios = axios;
Vue.prototype.$formatDate = formatDate;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(baseFilter);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
