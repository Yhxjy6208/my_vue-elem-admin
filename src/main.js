import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ElButton } from "element-plus";
import 'element-plus/es/components/button/style/css'
// 全局导入ElementPlus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(store).use(router).use(ElementPlus).mount("#app");

createApp(App).use(store).use(router).use(ElButton).mount("#app");