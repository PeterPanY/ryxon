<template>
  <r-button plain @click="open1"> Success </r-button>
  <r-button plain @click="open2"> Warning </r-button>
  <r-button plain @click="open3"> Info </r-button>
  <r-button plain @click="open4"> Error </r-button>
</template>

<script lang="ts" setup>
import { showNotify, showDangerNotify, showInfoNotify } from '@ryxon/components'

const open1 = () => {
  showNotify({
    title: 'Success',
    message: 'This is a success message',
    type: 'success'
  })
}

const open2 = () => {
  showNotify({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning'
  })
}

const open3 = () => {
  showInfoNotify({
    title: 'Info',
    message: 'This is an info message'
  })
}

const open4 = () => {
  showDangerNotify({
    title: 'Error',
    message: 'This is an error message'
  })
}
</script>
