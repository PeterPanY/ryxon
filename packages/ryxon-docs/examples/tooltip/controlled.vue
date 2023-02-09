<template>
  <r-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <r-button @mouseenter="visible = true" @mouseleave="visible = false">
      Hover me
    </r-button>
  </r-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
