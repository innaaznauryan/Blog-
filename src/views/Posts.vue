<template>
  <div class="pt-20 text-teal-800 font-sans text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <div v-else-if="posts">
      <div class="flex items-center justify-center">
        <label
            :for="'search'"
            class="cursor-pointer hover:text-teal-500 duration-500">
          <IconSearch/>
        </label>
        <BaseInput
            v-model="search"
            :id="'search'"
            :placeholder="'Search'"
            @input="handleSearch"
            class="w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 m-2"/>
      </div>
      <div class="flex flex-wrap justify-center">
        <PostCard v-for="post in posts" :post="post"/>
      </div>
    </div>
    <BaseButton
        v-if="loggedIn"
        @click="handleClick"
        class="fixed border-2 border-teal-800 hover:border-orange-400"
        :customClass="{'bg-teal-500': true}"
        :style="{ right: '20px', bottom: '20px' }">
      Create Post
    </BaseButton>
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
import BaseLabel from "@/components/BaseLabel.vue";

const scrollTop = ref(null)
const search = ref(null)

const handleSearch = () => {

}
const handleClick = () => {
  showModal.value = true
  scrollTop.value = window.scrollY
}
onMounted(async() => {
  showModal.value = false
  await getPosts()
  await getLoggedIn()
})
</script>

<style scopped>

</style>