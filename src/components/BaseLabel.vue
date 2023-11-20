<template>
  <div class="flex justify-between items-center w-full h-10">
    <label
        :for="id"
        class="text-sm w-1/3"
        :class="customClass">
      <slot></slot>
    </label>
    <span
        v-if="error"
        class="text-red-500 text-right text-sm w-2/3">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

defineProps({
  id: { type: String, default: null },
  error: { type: Boolean, default: null },
  errorMessage: { type: String, default: null },
  customClass: { type: Object, default: null }
})
</script>

<style scoped>

</style>