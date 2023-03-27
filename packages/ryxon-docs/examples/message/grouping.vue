<template>
  <r-button :plain="true" @click="open">Show message</r-button>
</template>

<script lang="ts" setup>
import { showMessage } from '@ryxon/components'

const open = () => {
  showMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
    duration: 0
  })
}
</script>
