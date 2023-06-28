<template>
  <div class="demo-color-sizes">
    <r-color-picker v-model="color" size="large" />
    <r-color-picker v-model="color" />
    <r-color-picker v-model="color" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const color = ref('409EFF')
</script>

<style>
.demo-color-sizes .r-color-picker {
  margin-right: 16px;
}
</style>
