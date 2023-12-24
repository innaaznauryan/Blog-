<template>
  <div class="pt-[70px] text-stone-900 font-sans text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <div v-if="loading">
        <p class="text-lg font-medium p-2">Loading...</p>
      </div>
      <div v-else>
        <h3 class="text-xl font-medium p-4">Favorites</h3>
        <div v-if="favPosts.length" class="flex flex-wrap mx-2 md:mx-10 lg:mx-40 xl:mx-60 2xl:mx-80">
          <PostCard v-for="post in favPosts" :post="post" :key="post.id"/>
        </div>
        <p v-else class="text-lg font-medium p-2">You have no favorite posts yet</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { loggedIn } from "@/composable/useUsers"
import { posts, getPosts, postError } from "@/composable/usePosts"
import PostCard from "@/components/PostCard.vue"

const loading = ref(true)
const favPosts = computed(() => {
  return posts.value?.filter(post => post.likes.includes(loggedIn.value?.uid))
})

onMounted(async () => {
  await getPosts()
  loading.value = false
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active{
  transition: .5s;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
</style>