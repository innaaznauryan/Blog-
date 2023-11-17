<template>
  <textarea :id="id" :value="modelValue" rows="5" @input="handleInput" class="p-2 rounded-lg bg-teal-100 resize-none shadow-md"></textarea>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

defineProps({
  modelValue: { type: String, default: null },
  id: { type: String, default: null }
})
const emit = defineEmits(["update:modelValue"])

const handleInput = (e) => {
  emit("update:modelValue", e.target.value)
}
</script>

<style scoped>

</style>