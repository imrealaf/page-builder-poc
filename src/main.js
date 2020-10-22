import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import element from "./element";

Vue.config.productionTip = false;
Vue.prototype["$element"] = element;
Vue.prototype["$config"] = {
  currentItemAttr: "data-current-item",
  dropContainerClass: "drop-container",
  touchDisabledClass: "smooth-dnd-disable-touch-action",
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
