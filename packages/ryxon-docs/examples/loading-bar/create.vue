<template>
  <r-button @click="handleStart"> 开始 </r-button>
  <r-button :disabled="disabled" @click="handleFinish"> 结束 </r-button>
  <r-button @click="handleError"> 报个错 </r-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as RButton, createLoadingBar } from '@ryxon/components'

const disabled = ref(true)
const { loadingBar } = createLoadingBar()

const handleStart = () => {
  loadingBar?.start()
  disabled.value = false
}
const handleFinish = () => {
  loadingBar?.finish()
  disabled.value = true
}
const handleError = () => {
  disabled.value = true
  loadingBar?.error()
}
</script>
