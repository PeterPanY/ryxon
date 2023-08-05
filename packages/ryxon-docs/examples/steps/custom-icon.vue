<template>
  <r-steps :active="active">
    <r-step>
      买家下单
      <template #finish-icon> 1 </template>
    </r-step>
    <r-step>
      商家接单
      <template #finish-icon> 2 </template>
    </r-step>
    <r-step>
      买家提货
      <template #active-icon> 3 </template>
    </r-step>
    <r-step>
      交易完成
      <template #inactive-icon> 4 </template>
    </r-step>
  </r-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(2)
</script>

<style scoped></style>
