<template>
  <r-tabs v-model:active="active">
    <r-tab v-for="index in 16" :key="index" :title="'标签 ' + index">
      内容 {{ index }}
    </r-tab>
  </r-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
