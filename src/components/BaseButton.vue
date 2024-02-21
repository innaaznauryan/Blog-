<template>
  <button
      :class="customClass"
      class="p-3 font-medium duration-500 bg-[#222629] text-[#b2f6b2] hover:bg-[#b2f6b2] hover:text-[#222629] self-center"
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