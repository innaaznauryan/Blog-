<template>
  <button
      :class="customClass"
      class="p-3 rounded-lg font-medium duration-500 bg-[#222629] text-[#618926] hover:bg-[#618926] hover:text-[#222629] self-center"
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