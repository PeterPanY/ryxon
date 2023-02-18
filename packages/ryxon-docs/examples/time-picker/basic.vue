<template>
  <div class="example-basic">
    <r-time-picker-pc v-model="currentTime" placeholder="Arbitrary time" />
    <r-time-picker-pc
      v-model="value2"
      arrow-control
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTime = ref()
const value2 = ref()
</script>

<style>
.example-basic .r-date-editor {
  margin: 8px;
}
</style>
