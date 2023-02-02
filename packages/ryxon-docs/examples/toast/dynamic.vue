<template>
  <r-button @click="open1">动态更新</r-button>
</template>

<script lang="ts" setup>
import { showToast } from '@ryxon/components'
// import 'ryxon/es/toast/style'

const open1 = () => {
  const toast = showToast({
    duration: 0,
    forbidClick: true,
    message: '倒计时 3 秒'
  })

  let second = 3
  const timer = setInterval(() => {
    second--
    if (second) {
      toast.message = `倒计时 ${second} 秒`
    } else {
      clearInterval(timer)
      toast.close()
    }
  }, 1000)
}
</script>
