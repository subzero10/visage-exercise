import Vue from "vue";
import App from "./App.vue";
//import HoneybadgerVue from "@honeybadger-io/vue";
import router from "./router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

/*
const config = {
  apiKey: "80ee8156",
  environment: "visage-exercise",
};

Vue.use(HoneybadgerVue, config);
 */

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
