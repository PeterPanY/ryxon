<template>
  <r-tooltip :content="'Switch value: ' + value" placement="top">
    <r-switch
      v-model="value"
      style="--r-switch-on-background: #13ce66; --r-switch-background: #ff4949"
      active-value="100"
      inactive-value="0"
    />
  </r-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('100')
</script>
