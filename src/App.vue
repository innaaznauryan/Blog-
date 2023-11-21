<template>
  <nav class="flex justify-center gap-1 sm:gap-4 fixed w-full bg-teal-500 text-teal-800 text-base sm:text-lg md:text-2xl">
    <router-link
        :to="{ name: 'home' }"
        class="py-4 px-1 sm:px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
      Home
    </router-link>
    <router-link
        :to="{ name: 'posts' }"
        class="py-4 px-1 sm:px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
      Posts
    </router-link>
    <router-link
        v-if="loggedIn"
        :to="{ name: 'fav' }"
        class="py-4 px-1 sm:px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
      Favorites
    </router-link>
    <router-link
        :to="{ name: 'signup' }"
        class="py-4 px-1 sm:px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
      Sign Up
    </router-link>
    <a v-if="loggedIn"
       @click="handleClick"
       class="cursor-pointer py-4 px-1 sm:px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
      Sign Out
    </a>
    <router-link
        v-else
        :to="{ name: 'login' }"
        class="py-4 px-1 sm:px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
      Sign In
    </router-link>
  </nav>
  <router-view/>
</template>

<script setup>
  import { loggedIn, logout } from "@/composable/useUsers"

  const handleClick = async() => {
    await logout()
  }
</script>
