<template>
  <div class="pt-20 text-teal-800 font-sans text-center">
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-2 items-center mt-6">
      <label for="fullName">Full Name:</label>
      <input
          type="text"
          id="fullName"
          v-model="fullName"
          @blur="v$.fullName.$touch()"
          class="p-2 rounded-lg shadow-md w-2/3 sm:w-1/2 lg:w-1/4 bg-white text-center">
      <div class="h-6">
        <p v-if="v$.fullName.$error" class="text-red-500">
          {{ v$.fullName.$errors[0]?.$message }}
        </p>
      </div>
      <label for="username">Username:</label>
      <input
          type="text"
          id="username"
          v-model="username"
          @blur="v$.username.$touch()"
          class="p-2 rounded-lg shadow-md w-2/3 sm:w-1/2 lg:w-1/4 bg-white text-center">
      <div class="h-6">
        <p v-if="v$.username.$error" class="text-red-500">
          {{ v$.username.$errors[0]?.$message }}
        </p>
      </div>
      <label for="email">Email:</label>
      <input
          type="text"
          id="email"
          v-model="email"
          @blur="v$.email.$touch()"
          class="p-2 rounded-lg shadow-md w-2/3 sm:w-1/2 lg:w-1/4 bg-white text-center">
      <div class="h-6">
        <p v-if="v$.email.$error" class="text-red-500">
          {{ v$.email.$errors[0]?.$message }}
        </p>
      </div>
      <label for="password">Password:</label>
      <input
          type="password"
          id="password"
          v-model="password"
          @blur="v$.password.$touch()"
          class="p-2 rounded-lg shadow-md w-2/3 sm:w-1/2 lg:w-1/4 bg-white text-center">
      <div class="h-6">
        <p v-if="v$.password.$error" class="text-red-500">
          {{ v$.password.$errors[0]?.$message }}
        </p>
      </div>
      <BaseButton :customClass="{'bg-teal-500': true}">Sign Up</BaseButton>
    </form>
    <p v-if="signupError" class="text-red-500">{{ signupError }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import useValidate from "@vuelidate/core"
import { helpers, required, minLength, email as mail } from "@vuelidate/validators"
import { signUp, getUsers, signupError } from "@/composable/useUsers"
import BaseButton from "@/components/BaseButton.vue"

const fullName = ref(null)
const username = ref(null)
const email = ref(null)
const password = ref(null)

const rules = computed(() => {
  return {
    fullName: { required, minLength: minLength(6) },
    username: { required, minLength: minLength(6) },
    email: { required, mail },
    password: {
      required,
      minLength: minLength(6),
      passRequirement: helpers.withMessage(
          () => "Password must contain uppercase, lowercase and number",
          (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)
      )
    }
  }
})
const v$ = useValidate(rules, {fullName, username, email, password})

onMounted(async() => {
  signupError.value = null
  await getUsers()
})
const handleSubmit = async(e) => {
  await v$.value.$validate()
  if(v$.value.$error) {
    e.target.reset()
  } else {
    await signUp(fullName, username, email, password)
    if(signupError) {
      setTimeout(() => {
        signupError.value = null
      }, 2000)
    }
  }
}
</script>

<style scoped>

</style>