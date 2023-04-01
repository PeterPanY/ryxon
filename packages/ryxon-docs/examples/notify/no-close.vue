<template>
  <r-button plain @click="open"> Hide close button </r-button>
</template>

<script lang="ts" setup>
import { showNotify } from '@ryxon/components'

const open = () => {
  showNotify({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false
  })
}
</script>
