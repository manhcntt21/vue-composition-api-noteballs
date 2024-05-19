import "./assets/main.css";
import router from "@/router";
import { createApp, markRaw } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App).use(pinia).use(router).mount("#app");
