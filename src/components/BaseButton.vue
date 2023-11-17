<template>
  <button
      class="py-4 px-2 m-2 w-96 rounded-lg font-medium duration-500 hover:text-orange-400 self-center"
      :class="customClass"
      :type="type">
    <slot>Submit</slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue"

defineProps({
  customClass: {type: Object, default: null},
  type: {type: String, default: null}
})
</script>

<style scoped>

</style>