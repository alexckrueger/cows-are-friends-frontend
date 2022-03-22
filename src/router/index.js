import { createRouter, createWebHistory } from "vue-router";
import BusinessesIndex from "../views/BusinessesIndex.vue";
import BusinessesShow from "../views/BusinessesShow.vue";
import FavoritesIndex from "../views/FavoritesIndex.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import ReviewsNew from "../views/ReviewsNew.vue";
import Signup from "../views/Signup.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import ReviewsIndex from "../views/ReviewsIndex.vue";

const routes = [
  {
    path: "/",
    name: "BusinessesIndex",
    component: BusinessesIndex,
  },
  {
    path: "/businesses/:id",
    name: "BusinessesShow",
    component: BusinessesShow,
  },
  {
    path: "/favorites",
    name: "FavoritesIndex",
    component: FavoritesIndex,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/reviews/new",
    name: "ReviewsNew",
    component: ReviewsNew,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/users/me",
    name: "UsersShow",
    component: UsersShow,
  },
  {
    path: "/users/me/edit",
    name: "UsersEdit",
    component: UsersEdit,
  },
  {
    path: "/reviews",
    name: "ReviewsIndex",
    component: ReviewsIndex,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
