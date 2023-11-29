<template>
  <div class="pt-[70px] m-auto text-stone-900 font-sans w-3/4 md:w-1/2 xl:w-1/4">
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-2 items-center">
      <BaseLabel
          :id="'fullName'"
          :error="v$.fullName.$error"
          :errorMessage="v$.fullName.$errors[0]?.$message">
        Full Name:
      </BaseLabel>
      <BaseInput
          :id="'fullName'"
          v-model="fullName"
          class="w-full"
          :touch="v$.fullName.$touch"/>
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
          :id="'email'"
          :error="v$.email.$error"
          :errorMessage="v$.email.$errors[0]?.$message">
        Email:
      </BaseLabel>
      <BaseInput
          :id="'email'"
          v-model="email"
          class="w-full"
          :touch="v$.email.$touch"/>
      <BaseLabel
          :id="'password'"
          :error="v$.password.$error"
          :errorMessage="v$.password.$errors[0]?.$message">
        Password:
      </BaseLabel>
      <BaseInput
          :id="'password'"
          v-model="password"
          :type="'password'"
          class="w-full"
          :touch="v$.password.$touch"/>
      <BaseButton :customClass="{ 'hover:text-stone-900': true, 'hover:bg-orange-300': true }">Sign Up</BaseButton>
    </form>
    <p v-if="signupError" class="text-red-500 text-center">{{ signupError }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import useValidate from "@vuelidate/core"
import { helpers, required, minLength, email as mail } from "@vuelidate/validators"
import { signUp, getUsers, signupError, getLoggedIn } from "@/composable/useUsers"
import BaseButton from "@/components/BaseButton.vue"
import BaseInput from "@/components/BaseInput.vue"
import BaseLabel from "@/components/BaseLabel.vue"

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
  await getLoggedIn()
})
const handleSubmit = async(e) => {
  await v$.value.$validate()
  if(!v$.value.$error) {
    await signUp(fullName, username, email, password)
    if(signupError) {
      setTimeout(() => {
        signupError.value = null
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>