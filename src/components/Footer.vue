<template>
  <footer class="text-center p-10 text-stone-900">
    <p class="font-medium">© 2023 Coded by Inna Aznauryan</p>
    <p class="flex justify-center gap-2 p-2">
      <a
          target="_blank"
          href="https://www.linkedin.com/in/inna-aznauryan/"
          class="text-stone-900 hover:text-[#44c744] duration-500">
        <IconBrandLinkedin/>
      </a>
      <a
          target="_blank"
          href="https://github.com/innaaznauryan"
          class="text-stone-900 hover:text-[#44c744] duration-500">
        <IconBrandGithub/>
      </a>
    </p>
  </footer>
</template>

<script setup>
import {IconBrandGithub} from '@tabler/icons-vue'
import {IconBrandLinkedin} from '@tabler/icons-vue'
</script>