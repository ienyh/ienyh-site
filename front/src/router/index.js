import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "../views/404";
import Tools from "../views/tools/Tools.vue";
import Note from "../views/Note.vue";
import Index from "../views/Index.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: Tools,
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
  {
    path: "/tools",
    component: Tools,
  },
  {
    path: "/individual",
    component: () => import("../views/individual/Individual.vue"),
  },
  {
    path: "/note",
    component: Note,
    children: [
      {
        path: "/note",
        component: () => import("../views/blog/BlogList"),
      },
      {
        path: "/note/title/:id",
        component: () => import("../views/blog/components/Blog"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "/404",
    component: NotFound,
  },
];

const router = createRouter({
  base: "/dist/",
  history: createWebHashHistory(),
  routes,
});

export default router;
