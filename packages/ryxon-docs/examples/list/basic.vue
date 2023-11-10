<template>
  <r-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    style="height: 200px; overflow: auto"
    offset="0"
    @load="onLoad"
  >
    <r-cell v-for="item in list" :key="item" :title="item" />
  </r-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import '@ryxon/touch-emulator'

const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}
</script>

<style scoped></style>
