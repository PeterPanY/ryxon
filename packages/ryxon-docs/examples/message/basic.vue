<template>
  <r-button :plain="true" @click="open">Show message</r-button>
  <r-button :plain="true" @click="openVn">VNode</r-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
// import { RMessage } from '@ryxon/components'

const open = () => {
  // RMessage('this is a message.')
}

const openVn = () => {
  // RMessage({
  //   message: h('p', null, [
  //     h('span', null, 'Message can be '),
  //     h('i', { style: 'color: teal' }, 'VNode'),
  //   ]),
  // })
}
</script>
