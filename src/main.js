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
    path: "/:pathMatch(.*)",
    redirect: "/login",
  },
  {
    name: "Home",
    path: "/home",
    component: () => import(/* webpackChunkName: "home" */ "./pages/home.vue"),
    children: [
      {
        path: "workInfo",
        name: "workInfo",
        component: () =>
          import(/* webpackChunkName: "workInfo" */ "./components/workInfo.vue"),
      },
      {
        path: "recordInfo",
        name: "recordInfo",
        component: () =>
          import(/* webpackChunkName: "recordInfo" */ "./components/recordInfo.vue"),
      },
      {
        path: "workListPage",
        name: "workListPage",
        component: () =>
          import(
            /* webpackChunkName: "workListPage" */ "./components/workListPage.vue"
          ),
      },

      {
        path: "recordPage",
        name: "recordPage",
        component: () =>
          import(
            /* webpackChunkName: "recordPage" */ "./components/recordPage.vue"
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

createApp(App).use(VueAxios, axios).use(router).mount("#app");
