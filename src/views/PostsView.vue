<template>
  <div class="pt-[70px] text-stone-900 text-center">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <Suspense>
        <template #fallback>
          <p class="text-lg font-medium p-2">Loading...</p>
        </template>
        <Posts/>
      </Suspense>
    </transition>
    <teleport to="#modal">
      <transition name="fade">
        <div v-if="loggedIn && showModal">
          <CreatePost />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import {showModal, postError} from "@/composable/usePosts"
import {loggedIn} from "@/composable/useUsers"
import CreatePost from "@/components/CreatePost.vue"
import Posts from "@/components/Posts.vue"
</script>

<style scopped>
.fade-enter-active,
.fade-leave-active {
  transition: .25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>