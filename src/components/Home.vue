<template>
  <div>
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
    <p class="text-md sm:text-lg p-4">Share your thoughts, ideas and adventures in our blog</p>
    <div class="text-center">
      <img
          :src=background
          alt="background"
          class="inline-block ">
    </div>
    <p class="text-md sm:text-lg p-4">A directory of wonderful things</p>
  </div>
</template>

<script setup>
import {loggedIn} from "@/composable/useUsers"
import background from "@/assets/images/background.jpg"
import {onAuthStateChanged, auth} from "@/services/firestore.js"

await new Promise(resolve => {
  onAuthStateChanged(auth, (user) => {
    loggedIn.value = user
    resolve()
  })
})
</script>

<style scoped>
img {
  width: 80vmin;
}
</style>