<template>
  <r-button @click="open1">Show toast</r-button>
  <r-button @click="open2">success</r-button>
  <r-button @click="open3">warning</r-button>
  <r-button @click="open4">info</r-button>
  <r-button @click="open5">danger</r-button>
  <r-button @click="open6">loading</r-button>
  <r-button @click="open7">html</r-button>
</template>

<script lang="ts" setup>
import { showToast } from '@ryxon/components'
// import 'ryxon/es/toast/style'

const open1 = () => {
  showToast({
    message: 'text：提示内容',
    type: 'text'
  })
}

const open2 = () => {
  showToast({
    message: 'success：提示内容',
    type: 'success'
  })
}
const open3 = () => {
  showToast({
    message: 'warning：提示内容',
    type: 'warning'
  })
}
const open4 = () => {
  showToast({
    message: 'info：提示内容',
    type: 'info'
  })
}
const open5 = () => {
  showToast({
    message: 'danger：提示内容',
    type: 'danger'
  })
}
const open6 = () => {
  showToast({
    message: 'loading',
    type: 'loading'
  })
}

const open7 = () => {
  showToast({
    message: '<div style="color:cadetblue">html：提示内容<div>',
    type: 'html'
  })
}
</script>
