<template>
  <r-button :plain="true" @click="show = true">Show message</r-button>
  <r-message v-model:show="show">
    <r-icon><Medal></Medal></r-icon>
    自定义组件
  </r-message>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Medal } from '@ryxon/icons'

const show = ref(false)
</script>
