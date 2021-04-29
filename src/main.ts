import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from "@/plugins/i18n";
import "./styles/index.less";
// import { vantPlugins } from "./plugins/vant";

const app = createApp(App);

// 全局过滤器
// app.config.globalProperties.$filters = {
//   prefix(url) {
//     if (url && url.startsWith('http')) {
//       return url
//     } else {
//       url = `http://backend-api-01.newbee.ltd${url}`
//       return url
//     }
//   }
// }

app
  .use(store)
  .use(router)
  .use(i18n)
  // .use(vantPlugins)
  .mount("#app");
