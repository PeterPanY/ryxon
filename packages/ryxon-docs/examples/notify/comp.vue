<template>
  <r-button :plain="true" @click="show = true">Show message</r-button>
  <r-notify v-model:show="show" :offset="16">
    <r-icon><Medal></Medal></r-icon>
    自定义组件
  </r-notify>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Medal } from '@ryxon/icons'

const show = ref(false)
</script>
