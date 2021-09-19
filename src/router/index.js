import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Rooms from "../views/Rooms.vue";
import Register from "../views/Register.vue";
import firebase from "../../node_modules/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "login",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          next("/login");
        }
      });
    },
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next("/home");
        } else {
          next();
        }
      });
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/rooms/:roomId",
    name: "Rooms",
    component: Rooms,
  },
  {
    path: "/login/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
