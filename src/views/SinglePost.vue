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
              v-if="singlePost?.userId === loggedIn?.uid"
              @click="handleEditPost"
              class="w-1/2 lg:w-1/3 whitespace-nowrap">
            Edit Post
          </BaseButton>
          <BaseButton
              v-if="singlePost?.userId === loggedIn?.uid"
              @click="handleDeletePost"
              class="w-1/2 lg:w-1/3 whitespace-nowrap">
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
        :post="singlePost"/>
  </teleport>
  <teleport
      to="#modal">
    <DialogsWrapper/>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from "vue"
import router from "@/router"
import {
  singlePost,
  getSinglePost,
  showModal,
  postError,
  deletePost,
  addLike,
  deleteLike,
  isFav
} from "@/composable/usePosts"
import { loggedIn } from "@/composable/useUsers"
import { IconHeart, IconHeartFilled } from "@tabler/icons-vue"
import { useConfirmBeforeAction } from "@/composable/useConfirmBeforeAction"
import CreatePost from "@/components/CreatePost.vue"
import BaseButton from "@/components/BaseButton.vue"
import Comments from "@/components/Comments.vue"

const props = defineProps({
  id: String
})
const like = ref(false)
const loading = ref(true)

const handleLike = async() => {
  like.value ? await deleteLike(singlePost, loggedIn.value.uid) : await addLike(singlePost, loggedIn.value.uid)
  like.value = !like.value
}
const handleEditPost = () => {
  showModal.value = true
}
const handleDeletePost = () => {
  useConfirmBeforeAction(
      async() => {
        await deletePost(props.id)
        await router.push({name: "posts"})
      },
      {text: "Are you sure you want to delete this post?"}
  )
}

onMounted(async() => {
  showModal.value = false
  await getSinglePost(props.id)
  if(loggedIn.value) {
    like.value = isFav(singlePost, loggedIn.value.uid)
  }
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