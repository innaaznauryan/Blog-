import {createRouter, createWebHistory} from "vue-router"
import {onAuthStateChanged, auth} from "@/services/firestore.js"
import Home from "@/views/HomeView.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        alias: "/home"
    },
    {
        path: "/posts",
        name: "posts",
        component: () => import("../views/PostsView.vue")
    },
    {
        path: "/fav",
        name: "fav",
        component: () => import("../views/FavoriteView.vue")
    },
    {
        path: "/post/:id",
        name: "single-post",
        props: true,
        component: () => import("../views/SinglePostView.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginView.vue"),
        beforeEnter: ((to, from, next) => {
            onAuthStateChanged(auth, user => {
                if (user) {
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
        component: () => import("../views/SignupView.vue"),
        beforeEnter: ((to, from, next) => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    next({name: "home"})
                } else {
                    next()
                }
            })
        })
    },
    {
        path: "/favorite",
        redirect: {name: "fav"}
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
