<template>
  <div class="pt-20 text-teal-800 font-sans text-center">
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-3 items-center mt-6">
      <label for="username">Username:</label>
      <input
          type="text"
          id="username"
          v-model="username"
          class="p-2 rounded-lg shadow-md w-2/3 sm:w-1/2 lg:w-1/4 bg-white text-center placeholder-red-500"
          :placeholder="passwordError">
      <label for="password">Password:</label>
      <input
          type="password"
          id="password"
          v-model="password"
          class="p-2 rounded-lg shadow-md w-2/3 sm:w-1/2 lg:w-1/4 bg-white text-center placeholder-red-500"
          :placeholder="passwordError">
      <BaseButton :customClass="{'bg-teal-500': true}">Sign In</BaseButton>
    </form>
    <p v-if="loginError" class="text-red-500">{{ loginError }}</p>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import { login, getUsers, loginError } from "@/composable/useUsers"
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import BaseButton from "@/components/BaseButton.vue"

const username = ref(null)
const password = ref(null)
const usernameError = ref(null)
const passwordError = ref(null)

const rules = computed(() => {
  return {
    username: { required },
    password: { required }
  }
})
const v$ = useValidate(rules, {username, password})

const handleSubmit = async(e) => {
  await v$.value.$validate()
  if(v$.value.$error) {
    usernameError.value = v$.value.username.$errors[0]?.$message
    passwordError.value = v$.value.password.$errors[0]?.$message
  } else {
    await login(username, password)
    if(loginError) {
      setTimeout(() => {
        loginError.value = null
      }, 2000)
      e.target.reset()
      usernameError.value = null
      passwordError.value = null
    }
    username.value = null
    password.value = null
  }
}
onMounted(async() => {
  await getUsers()
})
</script>

<style scoped>

</style>