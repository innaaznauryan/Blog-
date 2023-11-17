<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-screen">
    <div class="modal fixed z-50 transform -translate-x-1/2 w-full sm:w-3/4 lg:w-1/2 bg-teal-200 text-teal-800 px-8 py-4 rounded-lg">
      <h2 class="text-xl font-medium text-center p-2">{{ post ? "Edit your post" : "Create a post"}}</h2>
      <form class="flex flex-col gap-4" @submit.prevent="submitPost">
        <div class="flex justify-between">
          <label for="title" class="font-medium self-start">Title</label>
          <span
              v-if="v$.title.$error"
              class="text-red-500">
          {{ v$.title.$errors[0]?.$message }}
        </span>
        </div>
        <BaseInput
            :id="'title'"
            v-model="title"
            :customClass="{'bg-teal-100': true}"
            @blur="v$.title.$touch()"/>
        <div class="flex justify-between">
          <label for="summary" class="font-medium self-start">Summary</label>
          <span
              v-if="v$.summary.$error"
              class="text-red-500 ">
          {{ v$.summary.$errors[0]?.$message }}
        </span>
        </div>
        <BaseInput
            :id="'summary'"
            v-model="summary"
            :customClass="{'bg-teal-100': true}"
            @blur="v$.summary.$touch()"/>
        <div class="flex justify-between">
          <label for="content" class="font-medium self-start">Content</label>
          <span
              v-if="v$.content.$error"
              class="text-red-500">
          {{ v$.content.$errors[0]?.$message }}
        </span>
        </div>
        <BaseTextarea
            :id="'content'"
            v-model="content"
            @blur="v$.content.$touch()"/>
        <div class="text-center">
          <BaseButton
              :type="'submit'"
              :customClass="{'bg-teal-500': true}">
            Publish
          </BaseButton>
          <BaseButton
              :type="'button'"
              @click="cancel"
              :customClass="{'bg-red-500': true}">
            Cancel
          </BaseButton>
        </div>
      </form>
      <div class="h-6">
        <p v-if="formError" class="text-red-500 text-center">Cannot submit this form</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue"
import useValidate from "@vuelidate/core"
import {required, minLength, maxLength} from "@vuelidate/validators"
import { createPost, editPost, showModal } from "@/composable/usePosts"
import BaseButton from "@/components/BaseButton.vue"
import BaseInput from "@/components/BaseInput.vue"
import BaseTextarea from "@/components/BaseTextarea.vue"

const props = defineProps({
  post: { type: Object, default: null }
})

const title = ref(props.post?.title || null)
const summary = ref(props.post?.summary || null)
const content = ref(props.post?.content || null)
const formError = ref(false)

const rules = computed(() => {
  return {
    title: { required, minLength: minLength(6), maxLength: maxLength(50) },
    summary: { required, minLength: minLength(10), maxLength: maxLength(100) },
    content: { required, minLength: minLength(20) }
  }
})
const v$ = useValidate(rules, {title, summary, content})
const submitPost = async() => {
  await v$.value.$validate()
  if(v$.value.$error) {
    formError.value = true
    setTimeout(() => {
      formError.value = false
    }, 2000)
  } else {
    props.post ? await editPost(props.post, title, summary, content) : await createPost(title, summary, content)
    showModal.value = false
  }
}
const cancel = () => {
  showModal.value = false
}
</script>

<style scoped>
.modal {
  left: 50%;
  top: 30px;
}
</style>