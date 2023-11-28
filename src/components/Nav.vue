<template>
  <nav v-if="!loading" class="flex justify-between fixed w-full bg-teal-500 text-teal-800 text-base sm:text-lg md:text-2xl px-0 md:px-6">
    <div class="flex">
      <router-link
          :to="{ name: 'home' }"
          class="py-4 px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
        Home
      </router-link>
      <router-link
          :to="{ name: 'posts' }"
          class="py-4 px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
        Posts
      </router-link>
      <router-link
          v-if="loggedIn"
          :to="{ name: 'fav' }"
          class="py-4 px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
        Favorites
      </router-link>
      <router-link
          v-if="!loggedIn"
          :to="{ name: 'signup' }"
          class="py-4 px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
        Sign Up
      </router-link>
      <router-link
          v-if="!loggedIn"
          :to="{ name: 'login' }"
          class="py-4 px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
        Sign In
      </router-link>
    </div>
    <div class="flex">
      <a
          v-if="loggedIn"
          @click="handleClick"
          class="cursor-pointer py-4 px-2 sm:px-4 hover:text-orange-400 font-medium duration-500">
        Sign Out
      </a>
    </div>
  </nav>
  <teleport
      to="#modal"
      :disabled="!showConfirmLogout">
    <Confirm
        v-if="loggedIn && showConfirmLogout"
        :logout="true"
        :scrollTop="scrollTop"/>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getLoggedIn, loggedIn } from "@/composable/useUsers"
import { showConfirmLogout } from "@/composable/usePosts"
import Confirm from "@/components/Confirm.vue"

const scrollTop = ref(null)
const loading = ref(true)

const handleClick = () => {
  showConfirmLogout.value = true
  scrollTop.value = window.scrollY
}

onMounted(async() => {
  await getLoggedIn()
  loading.value = false
})
</script>

<style scoped>
.router-link-active{
  color: orange;
}
</style>