<template>
  <r-tabs-ssr v-model:active="active" animated :items="items"></r-tabs-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = [
  { title: '标签 1', content: '内容 Tab1' },
  { title: '标签 2', content: '内容 Tab2' },
  { title: '标签 3', content: '内容 Tab3' },
  { title: '标签 4', content: '内容 Tab4' }
]

const active = ref(0)
</script>
