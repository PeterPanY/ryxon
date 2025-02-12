<template>
  <r-tabs-ssr v-model:active="active" :items="items"></r-tabs-ssr>
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
  { title: '标签 8', content: '内容 Tab8' },
  { title: '标签 9', content: '内容 Tab9' },
  { title: '标签 10', content: '内容 Tab10' },
  { title: '标签 11', content: '内容 Tab11' },
  { title: '标签 12', content: '内容 Tab12' },
  { title: '标签 13', content: '内容 Tab13' },
  { title: '标签 14', content: '内容 Tab14' },
  { title: '标签 15', content: '内容 Tab15' },
  { title: '标签 16', content: '内容 Tab16' }
]

const active = ref(0)
</script>
