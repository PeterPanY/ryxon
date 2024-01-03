<template>
  <r-checkbox-group v-model="checked">
    <r-tabs-menu multiple shrink @select="handleSelect">
      <r-tabs-menu-item>
        <template #title>
          <r-checkbox name="a">复选框 a</r-checkbox>
        </template>
      </r-tabs-menu-item>
      <r-tabs-menu-item>
        <template #title>
          <r-checkbox name="b">复选框 b</r-checkbox>
        </template>
      </r-tabs-menu-item>
      <r-tabs-menu-item v-model="value1" :options="option1" />
      <r-tabs-menu-item v-model="value2" :options="option2" />
    </r-tabs-menu>
  </r-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref([])
const value1 = ref(0)
const value2 = ref('a')
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

const handleSelect = (index: number) => {
  console.log(index)
}
</script>
