// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    children: [
      {
        path: "/home/:id",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/viewer",
    name: "Viewer",
    component: () =>
      import(/* webpackChunkName: "viewer" */ "@/views/Viewer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
