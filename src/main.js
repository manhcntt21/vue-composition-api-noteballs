import "./assets/main.css";
import router from "@/router";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
