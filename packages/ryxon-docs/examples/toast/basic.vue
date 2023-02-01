<template>
  <r-button :plain="true" @click="open">Show message</r-button>
</template>

<script lang="ts" setup>
import { showToast } from '@ryxon/components'
import 'ryxon/es/toast/style'

const open = () => {
  showToast({
    message: '提示内容',
    type: 'warning',
    duration: 0,
    position: 'top'
  })
}
</script>
