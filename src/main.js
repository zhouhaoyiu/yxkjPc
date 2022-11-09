import axios from "axios";
import { createApp } from "vue";
import VueAxios from "vue-axios";
import App from "./App.vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login",
  },
  {
    name: "Home",
    path: "/home",
    component: () => import(/* webpackChunkName: "home" */ "./pages/home.vue"),
    children: [
      {
        path: "info",
        name: "info",
        component: () =>
          import(/* webpackChunkName: "info" */ "./components/info.vue"),
      },
      {
        path: "list",
        name: "ListPage",
        component: () =>
          import(
            /* webpackChunkName: "ListPage" */ "./components/ListPage.vue"
          ),
      },
    ],
  },
  {
    name: "login",
    path: "/Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "./pages/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// createApp(App).use(VueAxios, axios).mount("#app");
createApp(App).use(VueAxios, axios).use(router).mount("#app");
