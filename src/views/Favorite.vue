<template>
  <div class="pt-20 text-teal-800 font-sans text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <div
        v-else-if="posts"
        class="flex flex-wrap justify-center">
      <PostCard v-for="post in favPosts" :post="post"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { loggedIn, getLoggedIn } from "@/composable/useUsers"
import { posts, getPosts, postError } from "@/composable/usePosts"
import PostCard from "@/components/PostCard.vue"

const favPosts = ref(null)

onMounted(async () => {
  await getPosts()
  await getLoggedIn()
  favPosts.value = posts.value.filter(post => post.likes.includes(loggedIn.value.id))
})
</script>

<style scoped>

</style>