import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("../views/movie.vue"),
    },
  ],
});

export default router;
