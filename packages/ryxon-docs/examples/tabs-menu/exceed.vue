<template>
  <r-tabs-menu shrink @select="handleSelect">
    <r-tabs-menu-item title="菜单1" />
    <r-tabs-menu-item title="菜单2" />
    <r-tabs-menu-item title="菜单3" />
    <r-tabs-menu-item title="菜单4" />
    <r-tabs-menu-item title="菜单5" />
    <r-tabs-menu-item title="菜单6" />
    <r-tabs-menu-item title="菜单7" />
    <r-tabs-menu-item title="菜单8" />
    <r-tabs-menu-item v-model="value1" title="标签9" :options="option1" />
    <r-tabs-menu-item v-model="value2" :options="option2" />
  </r-tabs-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
