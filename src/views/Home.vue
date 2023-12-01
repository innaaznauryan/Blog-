<template>
  <div class="pt-20 text-stone-900 font-sans text-center">
    <p
        v-if="loggedIn"
        class="font-medium p-4 text-xl">
      Welcome {{ loggedIn.fullName }}!
    </p>
    <p
        v-else
        class="font-medium p-4 text-xl">
      Sign In to add posts!
    </p>
    <p class="text-lg">Lorem ipsum dolor sit amet</p>
    <div class="text-center">
      <img
          :src=background
          alt="background"
          class="inline-block my-4 p-4">
    </div>
    <p class="text-lg p-4">Share your thoughts, ideas, adventures in our blog!</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { loggedIn, getLoggedIn } from "@/composable/useUsers"
import background from "../assets/image/background.jpg"

onMounted(async() => {
  await getLoggedIn()
})
</script>

<style scoped>

</style>