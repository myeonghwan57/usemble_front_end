import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "./apis/axiosConfig";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import VCalendar from "v-calendar";

store.dispatch("loadAuth");

const app = createApp(App);
app.use(VCalendar, {
    componentPrefix: "vc", // 사용할 경우, 기본 컴포넌트 접두사입니다.
});
app.use(store).use(router).mount("#app");
app.component("VCalendar", VCalendar);
