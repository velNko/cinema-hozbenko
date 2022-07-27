import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("../views/movie.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      beforeEnter: (to, from, next) => {
        next({ name: "home" });
      },
    },
  ],
});

export default router;
