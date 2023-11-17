<template>
  <div class="pt-20 text-center text-teal-800">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <div v-else-if="singlePost">
      <div class="flex flex-col sm:flex-row text-teal-800">
        <div class="w-full sm:w-1/3 flex flex-col items-center justify-center">
          <h2 class="p-2 font-medium text-xl">{{ singlePost.title }}</h2>
          <p class="p-2 font-medium">{{ singlePost.author}}</p>
          <p class="p-2 italic">{{ singlePost.date}}</p>
          <BaseButton
              v-if="singlePost?.authorId === loggedIn?.id"
              @click="handleEditPost"
              class="w-1/2 xl:w-1/3"
              :customClass="{'bg-teal-500': true}">
            Edit Post
          </BaseButton>
          <BaseButton
              v-if="singlePost?.authorId === loggedIn?.id"
              @click="handleDeletePost"
              class="w-1/2 xl:w-1/3"
              :customClass="{'bg-red-500': true}">
            Delete Post
          </BaseButton>
        </div>
        <div class="w-full sm:w-2/3">
          <p class="p-4 font-medium text-lg">{{ singlePost.summary }}</p>
          <pre class="px-8 py-4 text-left whitespace-pre-wrap font-sans">{{ singlePost.content }}</pre>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-between">
        <div class="p-6 w-full sm:w-1/2 order-first sm:order-last">
          <img :src=background alt="background" class="w-full">
        </div>
        <div class="w-full sm:w-1/2">
          <div v-if="loggedIn" class="m-6">
            <form @submit.prevent="handleAddComment">
              <BaseInput :placeholder="'Enter a comment'" v-model="comment" class="p-4 w-full xl:w-2/3" :customClass="{'bg-white': true}"/>
              <BaseButton class="w-1/2 xl:w-1/4" :customClass="{'bg-teal-500': true}">Publish</BaseButton>
            </form>
            <div class="h-10">
              <p v-if="commentError" class="text-red-500">{{ commentError }}</p>
            </div>
          </div>
          <h3 class="pl-10 font-medium text-left" v-if="singlePost.comments.length">Comments</h3>
          <div class="px-8 py-4 text-left" v-for="comment in singlePost.comments">
            <p class="bg-teal-400 rounded-2xl w-fit inline-block px-2 py-1 mr-1">{{ comment.author }}</p>
            <IconTrash v-if="singlePost.authorId === loggedIn?.id || comment.authorId === loggedIn?.id" size="20" @click="handleDeleteComment(comment.id)" class="cursor-pointer inline-block hover:text-teal-500 duration-500"/>
            <p class="italic p-2">{{ comment.date }}</p>
            <p class="p-2 my-2 bg-white rounded-2xl w-fit inline-block">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport
      to="#modal"
      :disabled="!showModal">
    <CreatePost
        v-if="loggedIn && showModal"
        :post="singlePost"/>
    <Delete
        v-if="loggedIn && showDeletePost"
        :post="singlePost.id"/>
    <Delete
        v-if="loggedIn && showDeleteComment"
        :comment="commentIdToDelete"/>
  </teleport>
</template>

<script setup>
import { ref, defineProps, computed, onMounted } from "vue"
import { IconTrash } from "@tabler/icons-vue"
import {
  singlePost,
  getSinglePost,
  addComment,
  showModal,
  showDeletePost,
  showDeleteComment,
  postError,
  commentError,
  getPosts
} from "@/composable/usePosts"
import { getLoggedIn, loggedIn } from "@/composable/useUsers"
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import CreatePost from "@/components/CreatePost.vue"
import BaseButton from "@/components/BaseButton.vue"
import Delete from "@/components/Delete.vue"
import background from "../assets/image/comments.jpg"
import BaseInput from "@/components/BaseInput.vue"

const props = defineProps({
  id: String
})

const comment = ref(null)
const commentIdToDelete = ref(null)

const rules = computed(() => {
  return {
    comment: { required }
  }
})
const v$ = useValidate(rules, {comment})
const handleEditPost = () => {
  showModal.value = true
  showDeletePost.value = false
}
const handleDeletePost = () => {
  showDeletePost.value = true
  showModal.value = false
}
const handleAddComment = async(e) => {
  await v$.value.$validate()
      if(v$.value.$error) {
        commentError.value = "Please fill the comment"
        setTimeout(() => {
          commentError.value = null
        }, 2000)
      } else {
        await addComment(singlePost, comment, loggedIn)
        comment.value = null
      }
  e.target.reset()
}
const handleDeleteComment = async(id) => {
  showDeleteComment.value = true
  commentIdToDelete.value = id
}
onMounted(async() => {
  showModal.value = false
  showDeletePost.value = false
  showDeleteComment.value = false
  await getSinglePost(props.id)
  await getPosts()
  await getLoggedIn()
})
</script>

<style scoped>

</style>