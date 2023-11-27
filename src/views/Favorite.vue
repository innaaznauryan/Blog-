<template>
  <div class="pt-20 text-teal-800 font-sans text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade">
      <div v-if="favPosts" class="flex flex-wrap">
        <PostCard v-for="post in favPosts" :post="post" :key="post.id"/>
      </div>
    </transition>
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
.fade-enter-active,
.fade-leave-active{
  transition: .7s;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
</style>