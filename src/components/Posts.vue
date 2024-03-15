<template>
    <div>
        <div class="flex items-center justify-start sm:justify-center my-4">
          <label
              for="search"
              class="cursor-pointer ml-4 sm:ml-0">
            <IconSearch/>
          </label>
          <BaseInput
              v-model="search"
              id="search"
              placeholder="Search"
              class="w-1/2 lg:w-1/3 xl:w-1/4 m-2"/>
          <BaseButton
              v-if="loggedIn"
              @click="handleClick"
              class="fixed shadow-lg mr-3 md:mr-10"
              :style="{ right: 0 }">
            Create Post
          </BaseButton>
        </div>
        <div v-if="search" class="flex flex-wrap mx-2 md:mx-10 lg:mx-40 xl:mx-60 2xl:mx-80">
          <PostCard v-for="post in filteredPosts" :post="post" :key="post.id"/>
        </div>
        <div v-else class="flex flex-wrap mx-2 md:mx-10 lg:mx-40 xl:mx-60 2xl:mx-80">
          <PostCard v-for="post in posts" :post="post" :key="post.id"/>
        </div>
      </div>
</template>

<script setup>
import {ref, computed} from "vue"
import {posts, getPosts, showModal} from "@/composable/usePosts"
import {loggedIn} from "@/composable/useUsers"
import {IconSearch} from "@tabler/icons-vue"
import BaseButton from "@/components/BaseButton.vue"
import PostCard from "@/components/PostCard.vue"
import BaseInput from "@/components/BaseInput.vue"

const search = ref(null)
const filteredPosts = computed(() => {
  return posts.value.filter(post => new RegExp(search.value, "i").test(post.title))
})

const handleClick = () => {
  showModal.value = true
  search.value = null
}

await getPosts()
</script>