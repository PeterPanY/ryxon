<template>
  <r-input-number v-model="num" theme="round" button-size="22" disable-input />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
