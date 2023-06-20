<template>
  <r-tabs-menu direction="up" full>
    <r-tabs-menu-item v-model="value" :options="option" />
    <r-tabs-menu-item v-model="value1" title="标签2" :options="option1" />
    <r-tabs-menu-item v-model="value2" :options="option2" />
  </r-tabs-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
const value1 = ref(0)
const value2 = ref('a')
const option = [{ text: '全部商品', value: 0 }]
const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
]
</script>

<style scoped></style>
