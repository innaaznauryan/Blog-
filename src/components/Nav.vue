<template>
  <nav
      class="flex justify-between fixed w-full bg-[#222629] text-[#b2f6b2] text-lg sm:text-xl md:text-2xl px-4 md:px-10">
    <div class="flex gap-4">
      <router-link
          :to="{ name: 'home' }"
          class="py-4 hover:text-[#44c744] font-medium duration-500">
        Home
      </router-link>
      <router-link
          :to="{ name: 'posts' }"
          class="py-4 hover:text-[#44c744] font-medium duration-500">
        Posts
      </router-link>
      <router-link
          v-if="loggedIn"
          :to="{ name: 'fav' }"
          class="py-4 hover:text-[#44c744] font-medium duration-500">
        Favorites
      </router-link>
      <router-link
          v-if="!loggedIn"
          :to="{ name: 'signup' }"
          class="py-4 hover:text-[#44c744] font-medium duration-500">
        Sign Up
      </router-link>
      <router-link
          v-if="!loggedIn"
          :to="{ name: 'login' }"
          class="py-4 hover:text-[#44c744] font-medium duration-500">
        Sign In
      </router-link>
    </div>
    <div class="flex">
      <a
          v-if="loggedIn"
          @click="handleClick"
          class="cursor-pointer py-4 hover:text-[#44c744] font-medium duration-500">
        Sign Out
      </a>
    </div>
  </nav>
</template>

<script setup>
import {loggedIn, logout} from "@/composable/useUsers"
import {useConfirmBeforeAction} from "@/composable/useConfirmBeforeAction"
import {onAuthStateChanged, auth} from "@/services/firestore.js"

const handleClick = () => {
  useConfirmBeforeAction(
      async () => {
        await logout()
      },
      {text: "Are you sure you want to log out?"}
  )
}

await new Promise(resolve => {
  if (localStorage.user) {
    loggedIn.value = JSON.parse(localStorage.user)
    resolve()
  } else {
    onAuthStateChanged(auth, (user) => {
      loggedIn.value = user
      localStorage.setItem("user", JSON.stringify(loggedIn.value))
      localStorage.setItem("userTimeStap", Date.now())
      resolve()
    })
  }
})
</script>

<style scoped>
.router-link-active {
  color: #44c744;
}
</style>