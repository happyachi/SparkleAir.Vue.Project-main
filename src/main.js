// import './assets/main.css'
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';

// elementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { lazyPlugin } from "./directives/imglazy";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import Chat from "vue3-beautiful-chat";

//Ant Design
import Antd from 'ant-design-vue'
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.use(vuetify);
app.use(lazyPlugin);
app.use(Antd);
app.use(Chat);

app.mount("#app");

// app.use(express.static("client"));
// app.use(express.json());

