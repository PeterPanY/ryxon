<template>
  <div ref="container" style="height: 150px">
    <r-sticky :container="container">
      <r-button type="warning">指定容器</r-button>
    </r-sticky>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const container = ref(null)
</script>
