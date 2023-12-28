<template>
  <div v-if="!loading" class="pt-20 text-stone-900 font-sans text-center">
    <p
        v-if="loggedIn"
        class="font-medium p-4 text-xl">
      Welcome {{ loggedIn.displayName }}!
    </p>
    <p
        v-else
        class="font-medium p-4 text-xl">
      Sign In to add posts!
    </p>
    <p class="text-lg p-4">Share your thoughts, ideas and adventures in our blog</p>
    <div class="text-center">
      <img
          :src=background
          alt="background"
          class="inline-block my-4 p-4">
    </div>
    <p class="text-lg p-4">A directory of wonderful things</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { loggedIn } from "@/composable/useUsers"
import background from "../assets/image/background.jpg"
import { onAuthStateChanged, auth } from "@/services/firestore.js"

const loading = ref(true)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    loggedIn.value = user
    loading.value = false
  })
})

</script>

<style scoped>

</style>