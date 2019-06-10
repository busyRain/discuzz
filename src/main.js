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
// import "./registerServiceWorker";
const IMG_URL = "http://www.feileyuan.com";

Vue.prototype.$setCookie = SetCookies;
Vue.prototype.$getCookie = GetCookies;
Vue.prototype.$delCookie = DelCookies;
Vue.prototype.$IMG_URL = IMG_URL;
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
