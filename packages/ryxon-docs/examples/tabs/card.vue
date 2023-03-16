<template>
  <r-tabs v-model:active="active" type="card" shrink>
    <r-tab title="标签 1">内容 1</r-tab>
    <r-tab title="标签 2">内容 2</r-tab>
    <r-tab title="标签 3">内容 3</r-tab>
  </r-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
