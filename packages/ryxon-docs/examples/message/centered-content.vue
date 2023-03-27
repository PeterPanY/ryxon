<template>
  <r-button plain @click="openCenter">Centered text</r-button>
</template>

<script lang="ts" setup>
import { showMessage } from '@ryxon/components'

const openCenter = () => {
  showMessage({
    showClose: true,
    message: 'Centered text',
    center: true
  })
}
</script>
