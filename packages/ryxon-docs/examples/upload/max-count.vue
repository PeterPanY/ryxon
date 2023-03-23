<template>
  <r-upload v-model="fileList" multiple :max-count="2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])
</script>
