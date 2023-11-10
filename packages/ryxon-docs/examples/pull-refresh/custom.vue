<template>
  <r-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
    <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
    <template #pulling="props">
      <img
        class="doge"
        src="https://fastly.jsdelivr.net/npm/@ryxon/assets/doge.png"
        :style="{ transform: `scale(${props.distance / 80})` }"
      />
    </template>

    <!-- 释放提示 -->
    <template #loosing>
      <img
        class="doge"
        src="https://fastly.jsdelivr.net/npm/@ryxon/assets/doge.png"
      />
    </template>

    <!-- 加载提示 -->
    <template #loading>
      <img
        class="doge"
        src="https://fastly.jsdelivr.net/npm/@ryxon/assets/doge-fire.jpeg"
      />
    </template>
    <p>刷新次数: {{ count }}</p>
  </r-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import '@ryxon/touch-emulator'
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

<style scoped></style>
