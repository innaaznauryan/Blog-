import { createRouter, createWebHistory } from "vue-router"
import { onAuthStateChanged, auth } from "@/services/firestore.js"
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
    component: () => import("../views/Login.vue"),
    beforeEnter: ((to, from, next) => {
      onAuthStateChanged(auth, user => {
        if(user) {
          next({name: "home"})
        } else {
          next()
        }
      })
    })
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue"),
    beforeEnter: ((to, from, next) => {
      onAuthStateChanged(auth, user => {
        if(user) {
          next({name: "home"})
        } else {
          next()
        }
      })
    })
  },
  {
    path: "/:catchAll*",
    redirect: {name: "404"}
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/NotFound.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
