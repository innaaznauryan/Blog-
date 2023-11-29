<template>
  <button
      :class="customClass"
      class="p-3 rounded-lg font-medium duration-500 bg-stone-900 text-orange-300 hover:bg-orange-300 hover:text-stone-900 self-center"
      :type="type">
    <slot>Submit</slot>
  </button>
</template>

<script setup>
defineProps({
  customClass: { type: Object, default: null },
  type: { type: String, default: null }
})
</script>

<style scoped>

</style>