<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-screen"></div>
  <div
      class="absolute z-50 transform -translate-x-1/2 w-full sm:w-3/4 lg:w-1/2 bg-teal-100 text-teal-800 px-8 py-4 rounded-lg"
      :style="{ left: '50%', top: scrollTop + 30 + 'px' }">
    <h2 class="text-xl font-medium text-center p-2">{{ post ? "Edit your post" : "Create a post" }}</h2>
    <form class="flex flex-col gap-1" @submit.prevent="submitPost">
      <BaseLabel
          :id="'title'"
          :error="v$.title.$error"
          :errorMessage="v$.title.$errors[0]?.$message"
          :customClass="{'font-medium': true }">
        Title
      </BaseLabel>
      <BaseInput
          :id="'title'"
          v-model="title"
          @blur="v$.title.$touch()"/>
      <BaseLabel
          :id="'summary'"
          :error="v$.summary.$error"
          :errorMessage="v$.summary.$errors[0]?.$message"
          :customClass="{'font-medium': true }">
        Summary
      </BaseLabel>
      <BaseInput
          :id="'summary'"
          v-model="summary"
          @blur="v$.summary.$touch()"/>
      <BaseLabel
          :id="'content'"
          :error="v$.content.$error"
          :errorMessage="v$.content.$errors[0]?.$message"
          :customClass="{'font-medium': true }">
        Content
      </BaseLabel>
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
</template>

<script setup>
import { ref, computed } from "vue"
import useValidate from "@vuelidate/core"
import { required, minLength, maxLength } from "@vuelidate/validators"
import { createPost, editPost, showModal } from "@/composable/usePosts"
import BaseButton from "@/components/BaseButton.vue"
import BaseInput from "@/components/BaseInput.vue"
import BaseTextarea from "@/components/BaseTextarea.vue"
import BaseLabel from "@/components/BaseLabel.vue"

const props = defineProps({
  post: { type: Object, default: null },
  scrollTop: { type: Number, default: null }
})

const title = ref(props.post?.title || null)
const summary = ref(props.post?.summary || null)
const content = ref(props.post?.content || null)
const formError = ref(false)

const rules = computed(() => {
  return {
    title: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50)
    },
    summary: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(100)
    },
    content: {
      required,
      minLength: minLength(20),
      maxLength: maxLength(2000)
    }
  }
})
const v$ = useValidate(rules, {title, summary, content})
const submitPost = async() => {
  await v$.value.$validate()
  if(v$.value.$error) {
    formError.value = true
    setTimeout(() => {
      formError.value = false
    }, 3000)
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

</style>