<template>
    <div class="flex flex-col gap-20 px-4 md:px-10 lg:px-40 xl:px-60 2xl:px-80 sm:flex-row">
        <div class="flex flex-col gap-4 w-full sm:w-1/2 items-center">
            <div class="flex items-center gap-2">
            <h2 class="font-medium text-xl p-4">{{ singlePost?.title }}</h2>
            <div v-if="loggedIn" @click="handleDebouncedLike" class="cursor-pointer">
                <IconHeartFilled v-if="like"/>
                <IconHeart v-else/>
            </div>
            </div>
            <p class="font-medium">{{ singlePost?.user }}</p>
            <p class="italic">{{ singlePost?.date }}</p>
            <BaseButton
                v-if="singlePost?.userId === loggedIn?.uid"
                @click="handleEditPost"
                class="w-1/2 lg:w-1/3 whitespace-nowrap">
            Edit Post
            </BaseButton>
            <BaseButton
                v-if="singlePost?.userId === loggedIn?.uid"
                @click="handleDeletePost"
                class="w-1/2 lg:w-1/3 whitespace-nowrap">
            Delete Post
            </BaseButton>
            <p class="font-medium text-lg">{{ singlePost?.summary }}</p>
            <pre class="text-left whitespace-pre-wrap">{{ singlePost?.content }}</pre>
        </div>
        <div class="w-full sm:w-1/2">
            <Comments/>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import router from "@/router"
import {
  singlePost,
  getSinglePost,
  showModal,
  deletePost,
  addLike,
  deleteLike,
  isFav,
} from "@/composable/usePosts"
import {loggedIn} from "@/composable/useUsers"
import {IconHeart, IconHeartFilled} from "@tabler/icons-vue"
import {useConfirmBeforeAction} from "@/composable/useConfirmBeforeAction"
import BaseButton from "@/components/BaseButton.vue"
import Comments from "@/components/Comments.vue"

const props = defineProps({
  id: String
})
const like = ref(false)

const handleLike =  () => {
  let timeoutId = null
  return function inner () {
    like.value = !like.value
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(async() => {
      like.value ? await addLike(singlePost, loggedIn.value.uid) : await deleteLike(singlePost, loggedIn.value.uid)
    }, 3000)
  }
}
const handleDebouncedLike = handleLike()

const handleEditPost = () => {
  showModal.value = true
}

const handleDeletePost = () => {
  useConfirmBeforeAction(
      async () => {
        await deletePost(props.id)
        await router.push({name: "posts"})
      },
      {text: "Are you sure you want to delete this post?"}
  )
}

await getSinglePost(props.id)

onMounted(() => {
  showModal.value = false
  if (loggedIn.value) {
    like.value = isFav(singlePost, loggedIn.value.uid)
  }
})
</script>