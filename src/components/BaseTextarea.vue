<template>
  <textarea
      :id="id"
      :value="modelValue"
      rows="8"
      @input="handleInput"
      class="p-2 resize-none shadow-md">
  </textarea>
</template>

<script setup>
defineProps({
  modelValue: {type: String, default: null},
  id: {type: String, default: null}
})
const emit = defineEmits(["update:modelValue"])

const handleInput = (e) => {
  emit("update:modelValue", e.target.value)
}
</script>