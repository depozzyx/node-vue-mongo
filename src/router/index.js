import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ErrorTest from "../views/ErrorTest.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/error-test",
    name: "ErrorTest",
    component: ErrorTest
  },
  {
    path: "/news",
    name: "News",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/News.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;