<template>
  <nav v-if="!loading" class="flex justify-between fixed w-full bg-stone-900 text-orange-300 text-lg sm:text-xl md:text-2xl px-4 md:px-10">
    <div class="flex gap-4">
      <router-link
          :to="{ name: 'home' }"
          class="py-4 hover:text-orange-600 font-medium duration-500">
        Home
      </router-link>
      <router-link
          :to="{ name: 'posts' }"
          class="py-4 hover:text-orange-600 font-medium duration-500">
        Posts
      </router-link>
      <router-link
          v-if="loggedIn"
          :to="{ name: 'fav' }"
          class="py-4 hover:text-orange-600 font-medium duration-500">
        Favorites
      </router-link>
      <router-link
          v-if="!loggedIn"
          :to="{ name: 'signup' }"
          class="py-4 hover:text-orange-600 font-medium duration-500">
        Sign Up
      </router-link>
      <router-link
          v-if="!loggedIn"
          :to="{ name: 'login' }"
          class="py-4 hover:text-orange-600 font-medium duration-500">
        Sign In
      </router-link>
    </div>
    <div class="flex">
      <a
          v-if="loggedIn"
          @click="handleClick"
          class="cursor-pointer py-4 hover:text-orange-600 font-medium duration-500">
        Sign Out
      </a>
    </div>
  </nav>
  <teleport
      to="#modal">
    <DialogsWrapper/>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { loggedIn, logout } from "@/composable/useUsers"
import { useConfirmBeforeAction } from "@/composable/useConfirmBeforeAction"
import {onAuthStateChanged, auth} from "@/services/firestore.js"

const loading = ref(true)

const handleClick = () => {
  useConfirmBeforeAction(
      async() => {
        await logout()
      },
      {text: "Are you sure you want to log out?"}
  )
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    loggedIn.value = user ? {id: user.uid, email: user.email} : null
  })
  loading.value = false
})
</script>

<style scoped>
.router-link-active{
  color: rgb(234 88 12);
}
</style>