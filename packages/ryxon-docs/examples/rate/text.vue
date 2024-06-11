<template>
  <r-rate
    v-model="value"
    :texts="['很差', '差', '正常', '好', '很好']"
    show-text
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
</script>
