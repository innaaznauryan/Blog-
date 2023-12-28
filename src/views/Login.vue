<template>
  <div class="pt-[70px] m-auto text-stone-900 font-sans w-3/4 md:w-1/2 xl:w-1/4">
    <h2 class="font-medium pt-4 text-xl text-center">Sign in!</h2>
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-2 items-center">
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
          :autocomplete="'email'"
          :touch="v$.email.$touch"/>
      <BaseLabel
          :id="'password'"
          :error="v$.password.$error"
          :errorMessage="v$.password.$errors[0]?.$message">
        Password:
      </BaseLabel>
      <BaseInput
          :id="'password'"
          :type="'password'"
          v-model="password"
          class="w-full"
          :autocomplete="'current-password'"
          :touch="v$.password.$touch"/>
      <BaseButton class="mt-4">Sign In</BaseButton>
    </form>
    <p class="text-red-500 text-center h-6">
      <span v-if="loginError">{{ loginError }}</span>
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { login, loginError } from "@/composable/useUsers"
import { required, email as mail } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import BaseButton from "@/components/BaseButton.vue"
import BaseInput from "@/components/BaseInput.vue"
import BaseLabel from "@/components/BaseLabel.vue"

const email = ref(null)
const password = ref(null)

const rules = computed(() => {
  return {
    email: { required, mail },
    password: { required }
  }
})
const v$ = useValidate(rules, {email, password})

const handleSubmit = async() => {
  await v$.value.$validate()
  if(!v$.value.$error) {
    await login(email, password)
    if(loginError) {
      setTimeout(() => {
        loginError.value = null
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>