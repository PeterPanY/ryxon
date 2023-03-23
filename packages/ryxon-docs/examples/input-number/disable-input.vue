<template>
  <r-input-number v-model="num" disable-input />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
