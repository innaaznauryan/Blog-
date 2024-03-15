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
import Nav from "./components/Nav.vue"
import Footer from "@/components/Footer.vue"
</script>