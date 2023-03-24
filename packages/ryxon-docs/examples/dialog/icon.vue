<template>
  <r-button @click="handleClick">Show dialog</r-button>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { Delete } from '@ryxon/icons'
import { showDialog } from '@ryxon/components'

const handleClick = () => {
  showDialog({
    title: '标题',
    message: 'This is a message',
    type: 'warning',
    icon: markRaw(Delete)
  })
}
</script>
