<template>
  <input
      :value="modelValue"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      @blur="touch"
      @input="handleInput"
      class="p-2 rounded-lg shadow-md"/>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: null },
  type: { type: String, default: "text" },
  id: { type: String, default: null },
  placeholder: { type: String, default: null },
  touch: { type: Function, default: null }
})
const emit = defineEmits(["update:modelValue"])

const handleInput = (e) => {
  emit("update:modelValue", e.target.value)
}
</script>

<style scoped>

</style>