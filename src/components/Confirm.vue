<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-screen"></div>
  <div
      class="absolute z-50 transform -translate-x-1/2 w-2/3 sm:w-fit bg-[#ddd] text-stone-900 text-center p-4 rounded-lg left-1/2"
      :style="{ top: scrollTop + 60 + 'px' }">
    <p class="p-2 font-medium">{{ text }}</p>
    <div class="flex gap-2 justify-center">
      <BaseButton
          @click="emit('confirm')"
          class="px-4 py-2">
        Yes
      </BaseButton>
      <BaseButton
          @click="emit('cancel')"
          class="px-4 py-2">
        No
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import BaseButton from "@/components/BaseButton.vue"

defineProps({
  text: { type: String, default: "Are you sure?"}
})
const emit = defineEmits(["confirm", "cancel"])
const scrollTop = ref(null)

onMounted(() => {
  scrollTop.value = window.scrollY
})
</script>

<style scoped>

</style>