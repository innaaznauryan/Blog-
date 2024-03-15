<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-screen"></div>
  <div
      class="absolute z-50 transform -translate-x-1/2 w-2/3 sm:w-fit bg-[#f2f7f2] text-stone-900 text-center p-4 left-1/2"
      :style="{ top: scrollTop + 60 + 'px' }">
    <p class="p-2 font-medium">{{ text }}</p>
    <div class="flex gap-4 justify-center">
      <BaseButton
          @click="handleConfirm"
          class="px-4 py-2">
        Yes
      </BaseButton>
      <BaseButton
          @click="handleCancel"
          class="px-4 py-2">
        No
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import BaseButton from "@/components/BaseButton.vue"

defineProps({
  text: {mode: String, required: true}
})
const emit = defineEmits(["confirm", "cancel"])
const scrollTop = ref(null)

const handleConfirm = () => {
  emit("confirm")
}

const handleCancel = () => {
  emit("cancel")
}

onMounted(() => {
  scrollTop.value = window.scrollY
})
</script>