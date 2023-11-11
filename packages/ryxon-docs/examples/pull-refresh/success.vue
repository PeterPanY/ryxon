<template>
  <r-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    style="height: 200px"
    @refresh="onRefresh"
  >
    <p>刷新次数: {{ count }}</p>
  </r-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const isLoading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    isLoading.value = false
    count.value++
  }, 1000)
}
</script>
