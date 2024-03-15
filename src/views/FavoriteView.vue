<template>
  <div class="pt-[70px] text-stone-900 text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <Suspense>
        <template #fallback>
          <p class="text-lg font-medium p-2">Loading...</p>
        </template>
        <Favorite/>
      </Suspense>
    </transition>
  </div>
</template>

<script setup>
import {postError} from "@/composable/usePosts"
import Favorite from "@/components/Favorite.vue"
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: .25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>