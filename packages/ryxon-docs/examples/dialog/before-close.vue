<template>
  <r-button @click="handleClick">Show dialog</r-button>
</template>

<script setup lang="ts">
import { showConfirmDialog } from '@ryxon/components'

const handleClick = () => {
  showConfirmDialog({
    title: '标题',
    message: 'This is a message',
    beforeClose: (action: string) =>
      new Promise((resolve) => {
        setTimeout(() => {
          if (action === 'confirm') {
            resolve(true)
          } else {
            // 拦截取消操作
            resolve(false)
          }
        }, 1000)
      })
  })
}
</script>
