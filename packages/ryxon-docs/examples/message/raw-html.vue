<template>
  <r-button :plain="true" @click="openHTML">Use HTML String</r-button>
</template>

<script lang="ts" setup>
import { showMessage } from '@ryxon/components'

const openHTML = () => {
  showMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>'
  })
}
</script>
