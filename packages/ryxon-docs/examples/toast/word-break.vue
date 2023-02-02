<template>
  <r-button @click="open1">换行时截断单词</r-button>
  <r-button @click="open2">换行时不截断单词</r-button>
</template>

<script lang="ts" setup>
import { showToast } from '@ryxon/components'
// import 'ryxon/es/toast/style'

const open1 = () => {
  showToast({
    message: 'This message will contain a incomprehensibilities long word.',
    wordBreak: 'break-all'
  })
}

const open2 = () => {
  showToast({
    message: 'This message will contain a incomprehensibilities long word.',
    wordBreak: 'break-word'
  })
}
</script>
