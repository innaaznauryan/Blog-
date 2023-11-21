<template>
  <router-link
      :to="{ name: 'single-post', params: {id: post.id} }"
      class="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 p-2">
    <div class="h-full bg-white shadow-lg">
      <h2 class="p-2 h-20 font-medium text-lg bg-orange-400 shadow-md grid place-content-center">{{ post.title }}</h2>
      <div class="p-4 h-64 duration-500 hover:text-orange-400">
        <h3 class="font-medium text-lg">{{ post.user }}</h3>
        <p class="pt-2 italic">{{ post.date }}</p>
        <p>{{ post.summary }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue"

defineProps({
  post: {type: Object, default: null}
})
</script>

<style scoped>

</style>