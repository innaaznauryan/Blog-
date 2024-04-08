<template>
  <router-link
      :to="{ name: 'single-post', params: {id: post.id} }"
      class="w-full sm:w-1/2 xl:w-1/3 2xl:w-1/4 p-2">
    <div class="h-full p-4 flex flex-col gap-2 bg-white shadow-lg hover:text-[#44c744] duration-500">
      <h2 class="font-medium text-lg">{{ post.title }}</h2>
      <h3 class="font-medium text-md">{{ post.user }}</h3>
      <p class="italic text-sm">{{ post.date }}</p>
      <p class="text-ellipsis overflow-hidden whitespace-nowrap">{{ post.content }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  post: {type: Object, default: null}
})
</script>