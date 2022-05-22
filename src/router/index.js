import { createRouter, createWebHistory } from "vue-router";
import leftDrawer from "../views/leftDrawer";

const routes = [
  {
    path: "/",
    name: "Home",
    component: leftDrawer,
  },
  {
    path: "/left-drawer",
    name: "left-drawer",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/leftDrawer"),
  },
  {
    path: "/left-menu",
    name: "left-menu",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/leftMenu"),
  },
  {
    path: "/updown",
    name: "updown",
    component: () => import(/* webpackChunkName: "about" */ "../views/upDown"),
  },
  {
    path: "/side-anchor",
    name: "side-anchor",
    component: () =>
      import(/* webpackChunkName: "side-anchor" */ "../views/sideAnchor"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
