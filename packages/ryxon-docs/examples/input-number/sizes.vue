<template>
  <r-input-number v-model="num" input-width="40px" button-size="32px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
