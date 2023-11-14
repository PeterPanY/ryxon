<template>
  <r-loading-bar ref="loadingBarRef">
    <r-button @click="handleStart"> 开始 </r-button>
    <r-button :disabled="disabled" @click="handleFinish"> 结束 </r-button>
    <r-button @click="handleError"> 报个错 </r-button>
  </r-loading-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loadingBarRef = ref(null)
const disabled = ref(true)

const handleStart = () => {
  loadingBarRef.value.start()
  disabled.value = false
}
const handleFinish = () => {
  loadingBarRef.value.finish()
  disabled.value = true
}
const handleError = () => {
  disabled.value = true
  loadingBarRef.value.error()
}
</script>
