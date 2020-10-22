import Vue from "vue";

import App from "@/App";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import services from "@/services";

import "@/styles/main.scss";
import "@/plugins";
import "@/filters";
import "@/layouts";
import i18n from './i18n'

Vue.config.productionTip = false;

const injectables = { ...services };
for (const key in injectables) {
  Vue.prototype[key] = injectables[key];
}

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
