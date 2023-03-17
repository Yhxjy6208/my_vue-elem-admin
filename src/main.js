import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
const app = createApp(App);
app.config.globalProperties.$axios = axios;
// import Login from './views/account/Login.vue';
// import Elementui from "./plugins/elementui";

// import { ElButton } from "element-plus";
// import 'element-plus/es/components/button/style/css'

// 全局导入ElementPlus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(store).use(router).use(ElementPlus).mount("#app");

app.use(store).use(router).mount("#app");
// createApp(Login).use(store).use(router).mount("#app");