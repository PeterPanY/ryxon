<template>
  <r-button plain @click="open"> Notification with offset </r-button>
</template>

<script lang="ts" setup>
import { showNotify } from '@ryxon/components'

const open = () => {
  showNotify({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
    offset: 100
  })
}
</script>
