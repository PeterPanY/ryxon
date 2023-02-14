<template>
  <r-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    :reserve-keyword="false"
    placeholder="Choose tags for your article"
  >
    <r-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </r-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string[]>([])
const options = [
  {
    value: 'HTML',
    label: 'HTML'
  },
  {
    value: 'CSS',
    label: 'CSS'
  },
  {
    value: 'JavaScript',
    label: 'JavaScript'
  }
]
</script>
