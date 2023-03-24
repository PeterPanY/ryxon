<template>
  <r-button @click="handleClick">Show dialog</r-button>
</template>

<script setup lang="ts">
import { showConfirmDialog } from '@ryxon/components'

const handleClick = () => {
  showConfirmDialog({
    title: '标题',
    message: 'This is a message',
    theme: 'round-button'
  })
}
</script>
