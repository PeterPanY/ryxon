<template>
  <r-pull-refresh v-model="loading" style="height: 200px" @refresh="onRefresh">
    <p>刷新次数: {{ count }}</p>
  </r-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import '@ryxon/touch-emulator'
import { showMessage } from '@ryxon/components'

const count = ref(0)
const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    showMessage('刷新成功')
    loading.value = false
    count.value++
  }, 1000)
}
</script>
