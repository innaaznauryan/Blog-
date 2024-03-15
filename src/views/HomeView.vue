<template>
  <div class="pt-[70px] text-stone-900 text-center">
    <transition name="fade" mode="out-in">
      <Suspense>
        <template #fallback>
          <p class="text-lg font-medium p-2">Loading...</p>
        </template>
        <Home/>
      </Suspense>
    </transition>
  </div>
</template>

<script setup>
import Home from "@/components/Home.vue"
</script>