<template>
  <r-tabs v-model:active="active" shrink>
    <r-tab title="标签 1" name="a">内容 1</r-tab>
    <r-tab title="标签 2" name="b">内容 2</r-tab>
    <r-tab title="标签 3" name="c">内容 3</r-tab>
    <r-tab title="标签 4" name="d">内容 4</r-tab>
  </r-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('a')
</script>
