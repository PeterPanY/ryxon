<template>
  <r-list
    v-model:loading="loading"
    v-model:error="error"
    error-text="请求失败，点击重新加载"
    style="height: 200px; overflow: auto"
    @load="onLoad"
  >
    <r-cell v-for="item in list" :key="item" :title="item" />
  </r-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([])
const error = ref(false)
const loading = ref(false)

const onLoad = () => {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    error.value = true
  }, 1000)
}
</script>

<style scoped></style>
