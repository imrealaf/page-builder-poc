import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import services from "@/services";

import "@/styles/main.scss";
import "@/plugins";
import "@/filters";
import "@/layouts";

Vue.config.productionTip = false;

const injectables = { ...services };
for (const key in injectables) {
  Vue.prototype[key] = injectables[key];
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
