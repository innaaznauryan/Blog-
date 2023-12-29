<template>
  <div class="flex flex-col gap-6 items-center">
    <h3 class="font-medium text-center text-lg">Comments</h3>
    <img :src=background alt="background" class="w-full">
    <div v-if="loggedIn" class="w-full">
      <form @submit.prevent="handleAddComment" class="flex flex-col gap-4 items-center">
        <BaseInput
            :placeholder="'Enter a comment'"
            v-model="comment"
            class="p-3 w-full"/>
        <BaseButton
            class="w-1/2 lg:w-1/3 whitespace-nowrap">
          Publish
        </BaseButton>
      </form>
      <div class="h-10">
        <p v-if="commentError" class="text-red-500">{{ commentError }}</p>
      </div>
    </div>
    <div class="self-start text-left mb-4" v-for="comment in singlePost.comments" :key="comment.id">
      <div class="flex items-center gap-2">
        <p class="bg-[#618926] rounded-2xl w-fit inline-block px-4 py-1">{{ comment.user }}</p>
        <IconTrash
          v-if="singlePost.userId === loggedIn?.uid || comment.userId === loggedIn?.uid"
          size="20"
          @click="handleDeleteComment(comment.id)"
          class="cursor-pointer hover:text-[#618926] duration-500"
        />
      </div>
      <p class=" m-2 italic">{{ comment.date }}</p>
      <p class="py-2 px-4 bg-white rounded-2xl w-fit inline-block">{{ comment.content }}</p>
    </div>
  </div>
  <teleport
      to="#modal">
    <DialogsWrapper/>
  </teleport>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import {
  singlePost,
  getSinglePost,
  addComment,
  deleteComment,
  commentError
} from "@/composable/usePosts"
import { loggedIn } from "@/composable/useUsers"
import { useConfirmBeforeAction } from "@/composable/useConfirmBeforeAction"
import { IconTrash } from "@tabler/icons-vue"
import background from "../assets/image/cover.jpg"
import BaseInput from "@/components/BaseInput.vue"
import BaseButton from "@/components/BaseButton.vue"

const props = defineProps({
  id: String
})
const comment = ref(null)

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
const handleDeleteComment = (commentId) => {
  useConfirmBeforeAction(
      async() => {
        await deleteComment(commentId, singlePost)
      },
      {text: "Are you sure you want to delete this comment?"}
  )
}
onMounted(async() => {
  await getSinglePost(props.id)
  commentError.value = false
})
</script>

<style scoped>

</style>