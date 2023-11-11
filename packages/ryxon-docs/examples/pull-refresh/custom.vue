<template>
  <r-pull-refresh
    v-model="isLoading"
    style="height: 200px"
    @refresh="onRefresh"
  >
    <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
    <template #pulling> 下拉提示 </template>

    <!-- 释放提示 -->
    <template #loosing> 释放提示 </template>

    <!-- 加载提示 -->
    <template #loading> 加载提示 </template>
    <p>刷新次数: {{ count }}</p>
  </r-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showMessage } from '@ryxon/components'

const count = ref(0)
const isLoading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showMessage('刷新成功')
    isLoading.value = false
    count.value++
  }, 1000)
}
</script>
