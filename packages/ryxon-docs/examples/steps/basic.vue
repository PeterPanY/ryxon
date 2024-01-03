<template>
  <r-steps :active="active">
    <r-step>买家下单</r-step>
    <r-step>商家接单</r-step>
    <r-step>买家提货</r-step>
    <r-step>交易完成</r-step>
  </r-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(2)
</script>
