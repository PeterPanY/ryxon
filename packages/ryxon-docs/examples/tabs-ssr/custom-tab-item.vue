<template>
  <r-tabs-ssr v-model:active="active" shrink :items="items">
    <template #title="{ item }">
      {{ item.title }}
    </template>
    <template #a="{ item }">
      {{ item.content }}
    </template>
    <template #b="{ item }">
      {{ item.content }}
    </template>
    <template #c="{ item }">
      {{ item.content }}
    </template>
    <template #d="{ item }">
      {{ item.content }}
    </template>
  </r-tabs-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = [
  { title: '标签 1', slot: 'a', content: '内容 Tab1' },
  { title: '标签 2', slot: 'b', content: '内容 Tab2' },
  { title: '标签 3', slot: 'c', content: '内容 Tab3' },
  { title: '标签 4', slot: 'd', content: '内容 Tab4' }
]

const active = ref(0)
</script>
