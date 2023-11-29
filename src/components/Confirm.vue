<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-screen"></div>
  <div
      class="absolute z-50 transform -translate-x-1/2 w-2/3 sm:w-fit bg-orange-50 text-stone-900 text-center p-4 rounded-lg"
      :style="{ left: '50%', top: scrollTop + 60 + 'px' }">
    <p class="p-2 font-medium">Are you sure you want to
      <span v-if="props.post">delete this post</span>
      <span v-if="props.comment">delete this comment</span>
      <span v-if="props.logout">logout</span>?
    </p>
    <div class="flex gap-2 justify-center">
      <BaseButton
        @click="confirm"
        class="px-4 py-2">
        Yes
      </BaseButton>
      <BaseButton
        @click="cancel"
        class="px-4 py-2">
        No
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import router from "@/router"
import {
  singlePost,
  showDeletePost,
  showDeleteComment,
  showConfirmLogout,
  deletePost,
  deleteComment
} from "@/composable/usePosts"
import { logout } from "@/composable/useUsers"
import BaseButton from "@/components/BaseButton.vue"

const props = defineProps({
  post: { type: String, default: null },
  comment: { type: String, default: null },
  logout: { type: Boolean, default: false },
  scrollTop: { type: Number, default: null }
})
const confirm = async() => {
  if(props.post) {
    await deletePost(props.post)
    showDeletePost.value = false
    router.push({name: "posts"})
  }
  if(props.comment) {
    await deleteComment(props.comment, singlePost)
    showDeleteComment.value = false
  }
  if(props.logout) {
    await logout()
    showConfirmLogout.value = false
  }
}
const cancel = () => {
  if(props.post) {
    showDeletePost.value = false
  }
  if(props.comment) {
    showDeleteComment.value = false
  }
  if(props.logout) {
    showConfirmLogout.value = false
  }
}
</script>

<style scoped>

</style>