<template>
  <div class="pt-20 text-center text-stone-900">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <div v-if="loading">
        <p class="text-lg font-medium p-2">Loading...</p>
      </div>
      <div v-else class="flex flex-col gap-20 px-4 md:px-10 lg:px-40 xl:px-60 2xl:px-80 sm:flex-row">
        <div class="flex flex-col gap-4 w-full sm:w-1/2 items-center">
          <h2 class="font-medium text-xl">{{ singlePost.title }}</h2>
          <p class="font-medium">{{ singlePost.user }}</p>
          <p class="italic">{{ singlePost.date }}</p>
          <div v-if="loggedIn" @click="handleLike" class="cursor-pointer">
            <IconHeartFilled v-if="like"/>
            <IconHeart v-else/>
          </div>
          <BaseButton
              v-if="singlePost?.userId === loggedIn?.id"
              @click="handleEditPost"
              class="w-1/2 lg:w-1/3 whitespace-nowrap">
            Edit Post
          </BaseButton>
          <BaseButton
              v-if="singlePost?.userId === loggedIn?.id"
              @click="handleDeletePost"
              class="w-1/2 lg:w-1/3 whitespace-nowrap"
              :customClass="{ 'bg-red-500': true }">
            Delete Post
          </BaseButton>
          <p class="font-medium text-lg">{{ singlePost.summary }}</p>
          <pre class="text-left whitespace-pre-wrap font-sans">{{ singlePost.content }}</pre>
        </div>
        <div class="w-full sm:w-1/2">
          <Comments :id="id"/>
        </div>
      </div>
    </transition>
  </div>
  <teleport
      to="#modal"
      :disabled="!showModal">
    <CreatePost
        v-if="loggedIn && showModal"
        :post="singlePost"
        :scrollTop="scrollTop"/>
  </teleport>
  <teleport
      to="#modal"
      :disabled="!showDeletePost">
    <Confirm
        v-if="loggedIn && showDeletePost"
        :post="singlePost.id"
        :scrollTop="scrollTop"/>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from "vue"
import {
  singlePost,
  getSinglePost,
  showModal,
  showDeletePost,
  postError,
  addLike,
  deleteLike,
  isFav
} from "@/composable/usePosts"
import { getLoggedIn, loggedIn } from "@/composable/useUsers"
import { IconHeart, IconHeartFilled } from "@tabler/icons-vue"
import CreatePost from "@/components/CreatePost.vue"
import BaseButton from "@/components/BaseButton.vue"
import Confirm from "@/components/Confirm.vue"
import Comments from "@/components/Comments.vue"

const props = defineProps({
  id: String
})

const scrollTop = ref(null)
const like = ref(false)
const loading = ref(true)

const handleLike = async() => {
  like.value ? await deleteLike(singlePost, loggedIn) : await addLike(singlePost, loggedIn)
  like.value = !like.value
}
const handleEditPost = () => {
  showModal.value = true
  showDeletePost.value = false
  scrollTop.value = window.scrollY
}
const handleDeletePost = () => {
  showDeletePost.value = true
  showModal.value = false
  scrollTop.value = window.scrollY
}
onMounted(async() => {
  showModal.value = false
  showDeletePost.value = false
  await getSinglePost(props.id)
  await getLoggedIn()
  if(loggedIn.value) {
    like.value = isFav(singlePost, loggedIn)
  }
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