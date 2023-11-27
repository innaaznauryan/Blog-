<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-screen"></div>
  <div
      class="absolute z-50 transform -translate-x-1/2 w-3/4 sm:w-1/2 lg:w-1/3 bg-teal-100 text-teal-800 text-center p-4 rounded-lg"
      :style="{ left: '50%', top: scrollTop + 60 + 'px' }">
    <p class="p-6 font-medium">Are you sure you want to
      <span v-if="props.post">delete this post</span>
      <span v-if="props.comment">delete this comment</span>
      <span v-if="props.logout">logout</span>?
    </p>
    <BaseButton
        @click="confirm"
        class="px-4"
        :customClass="{'bg-red-500': true}">
      Yes
    </BaseButton>
    <BaseButton
        @click="cancel"
        class="px-4"
        :customClass="{'bg-teal-500': true}">
      No
    </BaseButton>
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