<template>
  <div class="pt-20 m-auto text-teal-800 font-sans w-3/4 md:w-1/2 xl:w-1/4">
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-2 items-center">
      <BaseLabel
          :id="'username'"
          :error="v$.username.$error"
          :errorMessage="v$.username.$errors[0]?.$message">
        Username:
      </BaseLabel>
      <BaseInput
          :id="'username'"
          v-model="username"
          class="w-full"
          :touch="v$.username.$touch"/>
      <BaseLabel
          :id="'password'"
          :error="v$.password.$error"
          :errorMessage="v$.password.$errors[0]?.$message">
        Password:
      </BaseLabel>
      <BaseInput
          :id="'password'"
          v-model="password"
          class="w-full"
          :touch="v$.password.$touch"/>
      <BaseButton :customClass="{'bg-teal-500': true}">Sign In</BaseButton>
    </form>
    <p v-if="loginError" class="text-red-500 text-center">{{ loginError }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { login, getUsers, loginError } from "@/composable/useUsers"
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import BaseButton from "@/components/BaseButton.vue"
import BaseInput from "@/components/BaseInput.vue"
import BaseLabel from "@/components/BaseLabel.vue"

const username = ref(null)
const password = ref(null)

const rules = computed(() => {
  return {
    username: { required },
    password: { required }
  }
})
const v$ = useValidate(rules, {username, password})

const handleSubmit = async() => {
  await v$.value.$validate()
  if(!v$.value.$error) {
    await login(username, password)
    if(loginError) {
      setTimeout(() => {
        loginError.value = null
      }, 3000)
    }
  }
}
onMounted(async() => {
  await getUsers()
})
</script>

<style scoped>

</style>