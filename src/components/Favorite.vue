<template>
    <div>
    <h3 class="text-xl font-medium p-4">Favorites</h3>
    <div v-if="favPosts.length" class="flex flex-wrap mx-2 md:mx-10 lg:mx-40 xl:mx-60 2xl:mx-80">
        <PostCard v-for="post in favPosts" :post="post" :key="post.id"/>
    </div>
    <p v-else class="text-lg font-medium p-2">You have no favorite posts yet</p>
    </div>
</template>

<script setup>
import {computed} from "vue"
import {loggedIn} from "@/composable/useUsers"
import {posts, getPosts} from "@/composable/usePosts"
import PostCard from "@/components/PostCard.vue"

const favPosts = computed(() => {
  return posts.value?.filter(post => post.likes.includes(loggedIn.value?.uid))
})

await getPosts()
</script>