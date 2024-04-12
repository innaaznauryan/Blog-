<template>
  <transition name="fade">
    <Suspense>
      <template #fallback></template>
      <Nav/>
    </Suspense>
  </transition>
  <main :style="{ minHeight: 'calc(100vh - 144px)'}">
    <router-view/>
  </main>
  <Footer/>
  <teleport to="#modal">
    <DialogsWrapper/>
  </teleport>
</template>

<script setup>
import {onMounted, onBeforeUnmount} from "vue"
import Nav from "./components/Nav.vue"
import Footer from "@/components/Footer.vue"

let intervalId = null
const timer = 180000

onMounted(() => {
  if (!localStorage.blogTimeStap || Date.now() - localStorage.blogTimeStap > timer) {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("post")) {
        localStorage.removeItem(key)
      }
    })
  }
  if (!localStorage.userTimeStap || Date.now() - localStorage.userTimeStap > timer) {
    localStorage.removeItem("user")
  }
  intervalId = setInterval(() => {
    localStorage.clear()
  }, timer)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
  intervalId = null
})
</script>