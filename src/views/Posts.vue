<template>
  <div class="pt-[70px] text-stone-900 font-sans text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <div v-if="loading">
        <p class="text-lg font-medium p-2">Loading...</p>
      </div>
      <div v-else>
        <div class="flex items-center justify-start sm:justify-center my-4">
          <label
              :for="'search'"
              class="cursor-pointer hover:text-orange-300 duration-500 ml-4 sm:ml-0">
            <IconSearch/>
          </label>
          <BaseInput
              v-model="search"
              :id="'search'"
              :placeholder="'Search'"
              class="w-1/2 lg:w-1/3 xl:w-1/4 m-2"/>
          <BaseButton
              v-if="loggedIn"
              @click="handleClick"
              class="fixed border-2 shadow-lg mr-3 md:mr-10"
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
    </transition>
    <teleport
        to="#modal"
        :disabled="!showModal">
      <CreatePost v-if="loggedIn && showModal"/>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { posts, getPosts, showModal, postError, getSinglePost } from "@/composable/usePosts"
import { loggedIn } from "@/composable/useUsers"
import { IconSearch } from "@tabler/icons-vue"
import CreatePost from "@/components/CreatePost.vue"
import BaseButton from "@/components/BaseButton.vue"
import PostCard from "@/components/PostCard.vue"
import BaseInput from "@/components/BaseInput.vue"

const loading = ref(true)
const search = ref(null)
const filteredPosts = computed(() => {
  return posts.value.filter(post => new RegExp(search.value, "i").test(post.title))
})

const handleClick = () => {
  showModal.value = true
  search.value = null
}
onMounted(async() => {
  await getPosts()
  loading.value = false
})
</script>

<style scopped>
.fade-enter-active,
.fade-leave-active{
  transition: .25s;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
</style>