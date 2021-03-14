import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/sign_up",
    name: "Signup",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/locations",
    name: "Locations",
    component: () => import("../views/Locations.vue"),
  },
  {
    path: "/locations/:id",
    name: "LocationDetail",
    component: () => import("../views/LocationDetail.vue"),
  },
  {
    path: "/ideas",
    name: "Ideas",
    component: () => import("../views/Ideas.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  // Partner
  {
    path: "/partner/booking",
    name: "Booking",
    component: () => import("../views/partner/Booking.vue"),
  },
  {
    path: "/partner/workspace",
    name: "WorkspaceIndex",
    component: () => import("../views/partner/workspace/index.vue"),
  },
  {
    path: "/partner/workspace/new",
    name: "WorkspaceNew",
    component: () => import("../views/partner/workspace/new.vue"),
  },
  {
    path: "/partner/workspace/:id/edit",
    name: "WorkspaceEdit",
    component: () => import("../views/partner/workspace/edit.vue"),
  },
  // End Partner

  // Member
  {
    path: "/member/booking",
    name: "MyBooking",
    component: () => import("../views/member/Booking.vue"),
  },
  // End Member

  {
    path: "/blog/index",
    name: "BlogIndex",
    component: () => import("../views/blog/index.vue"),
  },
  {
    path: "/blog/new",
    name: "BlogNew",
    component: () => import("../views/blog/new.vue"),
  },
  {
    path: "/blog/:id/edit",
    name: "BlogEdit",
    component: () => import("../views/blog/edit.vue"),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router;
