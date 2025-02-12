<template>
  <r-tabs-ssr v-model:active="active" shrink :items="items"></r-tabs-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = [
  { title: '标签 1', name: 'a', content: '内容 Tab1' },
  { title: '标签 2', name: 'b', content: '内容 Tab2' },
  { title: '标签 3', name: 'c', content: '内容 Tab3' },
  { title: '标签 4', name: 'd', content: '内容 Tab4' }
]

const active = ref('a')
</script>
