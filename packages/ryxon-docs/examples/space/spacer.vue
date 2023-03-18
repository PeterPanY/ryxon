<template>
  <r-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <r-button> button {{ i }} </r-button>
    </div>
  </r-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(10)
</script>
