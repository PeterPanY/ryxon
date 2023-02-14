<template>
  <r-select v-model="value">
    <r-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </r-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'value1',
    label: 'label1'
  },
  {
    value: 'value2',
    label: 'label2'
  },
  {
    value: 'value3',
    label: 'label3'
  },
  {
    value: 'value4',
    label: 'label4'
  },
  {
    value: 'value5',
    label: 'label5'
  }
]
</script>
