<template>
  <Nav/>
  <div :style="{ minHeight: 'calc(100vh - 130px)'}">
    <router-view/>
  </div>
  <footer class="text-center p-10 text-stone-900">
    <p class="font-medium">© Inna Aznauryan 2023</p>
    <p>No rights reserved</p>
  </footer>
</template>

<script setup>
import Nav from "./components/Nav.vue"
</script>

<style scoped>

</style>