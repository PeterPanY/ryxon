<template>
  <r-button :plain="true" @click="open">Show message</r-button>
</template>

<script lang="ts" setup>
import { showNotify } from '@ryxon/components'

const open = () => {
  const notify = showNotify({
    duration: 0,
    message: '倒计时 3 秒'
  })

  let second = 3
  const timer = setInterval(() => {
    second--
    if (second) {
      notify.props.message = `倒计时 ${second} 秒`
    } else {
      clearInterval(timer)
      notify.close()
    }
  }, 1000)
}
</script>
