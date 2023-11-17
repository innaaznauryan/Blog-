<template>
  <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue" @input="handleInput" class="p-2 rounded-lg shadow-md" :class="customClass">
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

defineProps({
  modelValue: { type: String, default: null },
  type: { type: String, default: "text" },
  id: { type: String, default: null },
  placeholder: { type: String, default: null },
  customClass: { type: Object, default: null }
})
const emit = defineEmits(["update:modelValue"])

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>

</style>