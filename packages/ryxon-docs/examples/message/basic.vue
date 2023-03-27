<template>
  <r-button :plain="true" @click="open">Show message</r-button>
  <r-button :plain="true" @click="openVn">VNode</r-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { showMessage } from '@ryxon/components'

const open = () => {
  showMessage('this is a message.')
}

const openVn = () => {
  showMessage({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
</script>
