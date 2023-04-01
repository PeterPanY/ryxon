<template>
  <r-button plain @click="open1"> Closes automatically </r-button>
  <r-button plain @click="open2"> Won't close automatically </r-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { showNotify } from '@ryxon/components'

const open1 = () => {
  showNotify({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, 'This is a reminder')
  })
}

const open2 = () => {
  showNotify({
    title: 'Prompt',
    message: 'This is a message that does not automatically close',
    duration: 0
  })
}
</script>
