<template>
  <div class="flex flex-col w-full h-10 mt-4">
    <label
        :for="id"
        class="text-sm"
        :class="customClass">
      <slot></slot>
    </label>
    <span
        v-if="error"
        class="text-red-500 text-sm">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, default: null },
  error: { type: Boolean, default: null },
  errorMessage: { type: String, default: null },
  customClass: { type: Object, default: null }
})
</script>

<style scoped>

</style>