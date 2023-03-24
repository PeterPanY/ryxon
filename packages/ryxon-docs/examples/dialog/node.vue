<template>
  <r-button @click="handleClick">Show dialog</r-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { showDialog } from '@ryxon/components'

const handleClick = () => {
  showDialog({
    title: '标题',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
</script>
