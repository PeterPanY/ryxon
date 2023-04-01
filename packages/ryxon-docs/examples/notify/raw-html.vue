<template>
  <r-button plain @click="open"> Use HTML String </r-button>
</template>

<script lang="ts" setup>
import { showNotify } from '@ryxon/components'

const open = () => {
  showNotify({
    title: 'HTML String',
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>'
  })
}
</script>
