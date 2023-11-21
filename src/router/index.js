import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("../views/Posts.vue")
  },
  {
    path: "/fav",
    name: "fav",
    component: () => import("../views/Favorite.vue")
  },
  {
    path: "/post/:id",
    name: "single-post",
    props: true,
    component: () => import("../views/SinglePost.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
