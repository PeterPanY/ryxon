<template>
  <r-tabs v-model:active="active" :before-change="beforeChange">
    <r-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
      内容 {{ index }}
    </r-tab>
  </r-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
