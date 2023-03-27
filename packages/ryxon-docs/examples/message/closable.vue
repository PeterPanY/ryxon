<template>
  <r-button :plain="true" @click="open1">message</r-button>
  <r-button :plain="true" @click="open2">success</r-button>
  <r-button :plain="true" @click="open3">warning</r-button>
  <r-button :plain="true" @click="open4">danger</r-button>
</template>

<script lang="ts" setup>
import { showMessage } from '@ryxon/components'

const open1 = () => {
  showMessage({
    showClose: true,
    message: 'This is a message.'
  })
}
const open2 = () => {
  showMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
}
const open3 = () => {
  showMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning'
  })
}
const open4 = () => {
  showMessage({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'danger'
  })
}
</script>
