<template>
  <div class="pt-20 text-teal-800 font-sans text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <div v-if="posts">
        <div class="flex items-center justify-start sm:justify-center">
          <label
              :for="'search'"
              class="cursor-pointer hover:text-teal-500 duration-500 ml-2 sm:ml-0">
            <IconSearch/>
          </label>
          <BaseInput
              v-model="search"
              :id="'search'"
              :placeholder="'Search'"
              @input="handleSearch"
              class="w-1/2 lg:w-1/3 xl:w-1/4 m-2"/>
          <BaseButton
              v-if="loggedIn"
              @click="handleClick"
              class="fixed border-2 border-teal-800 hover:border-orange-400 shadow-lg"
              :customClass="{ 'bg-teal-500': true }"
              :style="{ right: 0 }">
            Create Post
          </BaseButton>
        </div>
        <div v-if="search" class="flex flex-wrap">
          <PostCard v-for="post in filteredPosts" :post="post" :key="post.id"/>
        </div>
        <div v-else class="flex flex-wrap">
          <PostCard v-for="post in posts" :post="post" :key="post.id"/>
        </div>
      </div>
    </transition>
    <teleport to="#modal" :disabled="!showModal" v-if="showModal">
      <CreatePost v-if="loggedIn" :scrollTop="scrollTop"/>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { posts, getPosts, showModal, postError } from "@/composable/usePosts"
import { getLoggedIn, loggedIn } from "@/composable/useUsers"
import { IconSearch } from "@tabler/icons-vue"
import CreatePost from "@/components/CreatePost.vue"
import BaseButton from "@/components/BaseButton.vue"
import PostCard from "@/components/PostCard.vue"
import BaseInput from "@/components/BaseInput.vue"

const scrollTop = ref(null)
const search = ref(null)
const filteredPosts = ref(null)

const handleSearch = () => {
  const regex = new RegExp(search.value, "i")
  filteredPosts.value = posts.value.filter(post => regex.test(post.title))
}
const handleClick = () => {
  showModal.value = true
  scrollTop.value = window.scrollY
  search.value = null
  filteredPosts.value = null
}
onMounted(async() => {
  showModal.value = false
  await getPosts()
  await getLoggedIn()
})
</script>

<style scopped>
.fade-enter-active,
.fade-leave-active{
  transition: .7s;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
</style>