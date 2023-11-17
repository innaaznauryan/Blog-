<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-screen">
    <div class="modal fixed z-50 transform -translate-x-1/2 w-full sm:w-3/4 lg:w-1/2 bg-teal-200 text-teal-800 text-center p-10 rounded-lg">
      <p class="p-8 font-medium">Are you sure you want to delete this
        <span v-if="props.post">post</span>
        <span v-if="props.comment">comment</span>?
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
          :customClass="{'bg-gray-500': true}">
        No
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
import {
  singlePost,
  showDeletePost,
  showDeleteComment,
  deletePost,
  deleteComment,
} from "@/composable/usePosts"
import BaseButton from "@/components/BaseButton.vue"
import router from "@/router"

const props = defineProps({
  post: { type: String, default: null },
  comment: { type: String, default: null }
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
}
const cancel = () => {
  if(props.post) {
    showDeletePost.value = false
  }
  if(props.comment) {
    showDeleteComment.value = false
  }}
</script>

<style scoped>
  .modal {
    left: 50%;
    top: 30px;
  }
</style>