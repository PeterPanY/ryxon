<template>
  <r-calendar v-model="value1"></r-calendar>
  <br />

  <r-calendar
    v-model="value2"
    type="date"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Today',
    value: new Date()
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]

const disabledDate = (time: Date) => time.getTime() > Date.now()
</script>
