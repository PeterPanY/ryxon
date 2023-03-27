<template>
  <r-button :plain="true" @click="open2">success</r-button>
  <r-button :plain="true" @click="open3">warning</r-button>
  <r-button :plain="true" @click="open1">message</r-button>
  <r-button :plain="true" @click="open4">danger</r-button>
</template>

<script lang="ts" setup>
import { showMessage, showDangerMessage } from '@ryxon/components'

const open1 = () => {
  showMessage('this is a message.')
}
const open2 = () => {
  showMessage({
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
}
const open3 = () => {
  showMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning'
  })
}
const open4 = () => {
  showDangerMessage('Oops, this is a danger message.')
}
</script>
