<template>
  <div class="pt-20 text-teal-800 font-sans text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <div v-if="loading">
        <p class="text-lg font-medium p-2">Loading...</p>
      </div>
      <div v-else>
        <div v-if="favPosts.length" class="flex flex-wrap">
          <PostCard v-for="post in favPosts" :post="post" :key="post.id"/>
        </div>
        <p v-else class="text-lg font-medium p-2">You have no favorite posts yet</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { loggedIn, getLoggedIn } from "@/composable/useUsers"
import { posts, getPosts, postError } from "@/composable/usePosts"
import PostCard from "@/components/PostCard.vue"

const loading = ref(true)
const favPosts = computed(() => {
  return posts.value?.filter(post => post.likes.includes(loggedIn.value?.id))
})

onMounted(async () => {
  await getPosts()
  await getLoggedIn()
  loading.value = false
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active{
  transition: .7s;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
</style>