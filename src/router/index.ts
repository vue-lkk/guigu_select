import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
  },
  {
    // 如果域名后面什么都不写或者没有和已经定义好的路由匹配的话
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
