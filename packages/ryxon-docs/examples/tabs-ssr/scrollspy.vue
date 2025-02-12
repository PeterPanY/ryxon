<template>
  <r-tabs-ssr
    v-model:active="active"
    scrollspy
    sticky
    :items="items"
  ></r-tabs-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = [
  { title: '标签 1', content: '内容 Tab1' },
  { title: '标签 2', content: '内容 Tab2' },
  { title: '标签 3', content: '内容 Tab3' },
  { title: '标签 4', content: '内容 Tab4' },
  { title: '标签 5', content: '内容 Tab5' },
  { title: '标签 6', content: '内容 Tab6' },
  { title: '标签 7', content: '内容 Tab7' },
  { title: '标签 8', content: '内容 Tab8' }
]

const active = ref(0)
</script>
