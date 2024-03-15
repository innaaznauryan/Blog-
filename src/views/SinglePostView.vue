<template>
  <div class="pt-20 text-center text-stone-900">
    <div v-if="postError" class="text-red-500">{{ postError }}</div>
    <transition v-else name="fade" mode="out-in">
      <Suspense>
        <template #fallback>
            <p class="text-lg font-medium p-2">Loading...</p>
        </template>
        <SinglePost :id="id"/>
      </Suspense>
    </transition>
  </div>
  <teleport to="#modal">
    <transition name="fade">
      <div v-if="loggedIn && showModal">
        <CreatePost :post="singlePost"/>
      </div>
    </transition>
  </teleport>
  <teleport to="#modal">
    <DialogsWrapper/>
  </teleport>
</template>

<script setup>
import {
  singlePost,
  showModal,
  postError,
} from "@/composable/usePosts"
import {loggedIn} from "@/composable/useUsers"
import CreatePost from "@/components/CreatePost.vue"
import SinglePost from "@/components/SinglePost.vue"

defineProps({
  id: String
})
</script>