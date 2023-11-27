<template>
  <div class="flex flex-col justify-between">
    <h3 class="font-medium text-center text-lg p-2">Comments</h3>
    <div class="px-6 py-2 flex justify-center">
      <img :src=background alt="background" class="w-full xl:w-2/3">
    </div>
    <div class="w-full">
      <div v-if="loggedIn" class="m-6 xl:m-0">
        <form @submit.prevent="handleAddComment">
          <BaseInput
              :placeholder="'Enter a comment'"
              v-model="comment"
              class="p-4 w-full xl:w-2/3"
              :customClass="{'bg-white': true}"/>
          <BaseButton
              class="w-1/2 xl:w-1/4"
              :customClass="{'bg-teal-500': true}">
            Publish
          </BaseButton>
        </form>
        <div class="h-10">
          <p v-if="commentError" class="text-red-500">{{ commentError }}</p>
        </div>
      </div>
      <div class="px-8 py-4 text-left" v-for="comment in singlePost.comments" :key="comment.id">
        <p class="bg-teal-400 rounded-2xl w-fit inline-block px-2 py-1 mr-1">{{ comment.user }}</p>
        <IconTrash
            v-if="singlePost.userId === loggedIn?.id || comment.userId === loggedIn?.id"
            size="20"
            @click="handleDeleteComment(comment.id)"
            class="cursor-pointer inline-block hover:text-teal-500 duration-500"/>
        <p class="italic p-2">{{ comment.date }}</p>
        <p class="p-2 my-2 bg-white rounded-2xl w-fit inline-block">{{ comment.content }}</p>
      </div>
    </div>
  </div>
  <teleport
      to="#modal"
      :disabled="!showDeleteComment">
    <Confirm
        v-if="loggedIn && showDeleteComment"
        :comment="commentIdToDelete"
        :scrollTop="scrollTop"/>
  </teleport>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import {
  addComment,
  commentError,
  getSinglePost,
  showDeleteComment,
  singlePost
} from "@/composable/usePosts"
import { getLoggedIn, loggedIn } from "@/composable/useUsers"
import { IconTrash } from "@tabler/icons-vue"
import background from "../assets/image/comments.jpg"
import BaseInput from "@/components/BaseInput.vue"
import BaseButton from "@/components/BaseButton.vue"
import Confirm from "@/components/Confirm.vue"

const props = defineProps({
  id: String
})

const scrollTop = ref(null)
const comment = ref(null)
const commentIdToDelete = ref(null)

const rules = computed(() => {
  return {
    comment: { required }
  }
})
const v$ = useValidate(rules, {comment})

const handleAddComment = async(e) => {
  await v$.value.$validate()
  if(v$.value.$error) {
    commentError.value = "Please fill the comment"
    setTimeout(() => {
      commentError.value = null
    }, 3000)
  } else {
    await addComment(singlePost, comment, loggedIn)
    comment.value = null
  }
  e.target.reset()
}
const handleDeleteComment = (id) => {
  showDeleteComment.value = true
  commentIdToDelete.value = id
  scrollTop.value = window.scrollY
}
onMounted(async() => {
  await getSinglePost(props.id)
  await getLoggedIn()
  showDeleteComment.value = false
  commentError.value = false
})
</script>

<style scoped>

</style>