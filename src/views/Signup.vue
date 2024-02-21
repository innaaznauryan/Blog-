<template>
  <div class="pt-[70px] m-auto text-stone-900 font-sans w-3/4 md:w-1/2 xl:w-1/4">
    <h2 class="font-medium pt-4 text-xl text-center">Sign up!</h2>
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-2 items-center">
      <BaseLabel
          for="fullName"
          :error="v$.fullName.$error"
          :errorMessage="v$.fullName.$errors[0]?.$message">
        Full Name:
      </BaseLabel>
      <BaseInput
          v-model="fullName"
          class="w-full"
          id="fullName"
          autocomplete="name"
          :touch="v$.fullName.$touch"/>
      <BaseLabel
          for="email"
          :error="v$.email.$error"
          :errorMessage="v$.email.$errors[0]?.$message">
        Email:
      </BaseLabel>
      <BaseInput
          v-model="email"
          class="w-full"
          id="email"
          autocomplete="email"
          :touch="v$.email.$touch"/>
      <BaseLabel
          for="password"
          :error="v$.password.$error"
          :errorMessage="v$.password.$errors[0]?.$message">
        Password:
      </BaseLabel>
      <BaseInput
          v-model="password"
          class="w-full"
          :type="'password'"
          id="password"
          autocomplete="current-password"
          :touch="v$.password.$touch"/>
      <BaseButton class="mt-4">Sign Up</BaseButton>
    </form>
    <p class="text-red-500 text-center h-6">
      <span v-if="signupError">{{ signupError }}</span>
    </p>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import useValidate from "@vuelidate/core"
import {helpers, required, minLength, email as mail} from "@vuelidate/validators"
import {signUp, signupError} from "@/composable/useUsers"
import BaseButton from "@/components/BaseButton.vue"
import BaseInput from "@/components/BaseInput.vue"
import BaseLabel from "@/components/BaseLabel.vue"

const fullName = ref(null)
const email = ref(null)
const password = ref(null)

const rules = computed(() => {
  return {
    fullName: {required, minLength: minLength(6)},
    email: {required, mail},
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
const v$ = useValidate(rules, {fullName, email, password})

onMounted(async () => {
  signupError.value = null
})
const handleSubmit = async (e) => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    await signUp(email, password, fullName)
    if (signupError) {
      setTimeout(() => {
        signupError.value = null
      }, 3000)
    }
  }
}
</script>