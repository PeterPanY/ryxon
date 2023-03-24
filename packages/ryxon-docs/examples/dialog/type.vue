<template>
  <r-button @click="handleClick">Show dialog</r-button>
</template>

<script setup lang="ts">
import { showDialog } from '@ryxon/components'

const handleClick = () => {
  showDialog({
    title: '标题',
    message: 'This is a message',
    type: 'warning',
    messageAlign: 'left'
  })
}
</script>
