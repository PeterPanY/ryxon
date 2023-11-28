<template>
  <r-mention v-model:text="text" :options="options" placeholder="请输入">
  </r-mention>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { label: '07akioni1', value: '07akioni1' },
  { label: 'star-kirby1', value: 'star-kirby1', disabled: true },
  { label: '广东路1', value: '广东路1' },
  { label: '07akioni2', value: '07akioni2' },
  { label: 'star-kirby2', value: 'star-kirby2' },
  { label: '广东路2', value: '广东路2' },
  { label: '07akioni3', value: '07akioni3' },
  { label: 'star-kirby3', value: 'star-kirby3' },
  { label: '广东路3', value: '广东路3' },
  { label: '07akioni4', value: '07akioni4' },
  { label: 'star-kirby4', value: 'star-kirby4' },
  { label: '广东路4', value: '广东路4' },
  { label: '07akioni5', value: '07akioni5' },
  { label: 'star-kirby5', value: 'star-kirby5' },
  { label: '广东路5', value: '广东路6' }
]

const text = ref('')
</script>
