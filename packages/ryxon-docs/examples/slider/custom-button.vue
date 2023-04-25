<template>
  <r-slider v-model="value">
    <template #button>
      <div class="custom-button">{{ value }}</div>
    </template>
  </r-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>

<style scoped>
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: var(--r-primary-color);
  border-radius: 100px;
}
</style>
