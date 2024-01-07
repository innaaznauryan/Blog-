<template>
  <router-link
      :to="{ name: 'single-post', params: {id: post.id} }"
      class="w-full sm:w-1/2 xl:w-1/3 2xl:w-1/4 p-2">
    <div class="h-full bg-white shadow-lg">
      <div class="p-4 duration-500 hover:text-[#618926] flex flex-col gap-2">
        <h2 class="font-medium text-lg">{{ post.title }}</h2>
        <h3 class="font-medium text-md">{{ post.user }}</h3>
        <p class="italic">{{ post.date }}</p>
        <p>{{ post.content.slice(0, 50) }}...</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  post: {type: Object, default: null}
})
</script>

<style scoped>

</style>