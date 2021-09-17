import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "../views/404";
import Tools from "../views/tools/Tools.vue";
import Note from "../views/Note.vue";
import Index from "../views/Index.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: Index,
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
    path: "/blog",
    component: Note,
    children: [
      {
        path: "/blog",
        component: () => import("../views/blog/BlogList"),
      },
      {
        path: "/blog/article/:id",
        component: () => import("../views/blog/components/Blog"),
      },
    ],
  },
  {
    path: "/individual",
    component: () => import("../views/individual/Individual.vue"),
  },
  {
    path: "/three",
    component: () => import("../views/threejs-demo/index.vue"),
    children: [
      {
        path: "/three",
        component: () => import("../views/threejs-demo/ThreeComponent2.vue"),
      },
      {
        path: "/three/demo2",
        component: () => import("../views/threejs-demo/ThreeComponent2.vue"),
      },
    ],
  },
  {
    path: '/manage',
    component: () => import('../views/manage/index.vue'),
    // children: [
    //   {
    //     path: '/manage',
    //     component: () => import('../views/manage/index.vue'),
    //   }
    // ],
  },
  {
    path: '/message',
    component: () => import('../views/message/index.vue'),
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
