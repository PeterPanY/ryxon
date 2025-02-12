<template>
  <r-tabs-ssr
    v-model:active="active"
    :items="items"
    :before-change="beforeChange"
  ></r-tabs-ssr>
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
const beforeChange = (index: number) => {
  // 返回 false 表示阻止此次切换
  if (index === 1) {
    return false
  }

  // 返回 Promise 来执行异步逻辑
  return new Promise((resolve) => {
    // 在 resolve 函数中返回 true 或 false
    resolve(index !== 3)
  })
}
</script>
