<template>
  <r-tree-select-pc v-model="value" :data="data" filterable />
  <br />
  <!-- filter method:
  <r-tree-select-pc
    v-model="value2"
    :data="data2"
    :filter-method="filterMethod"
    filterable
  /> -->
  <br />
  filter node method:
  <r-tree-select-pc
    v-model="value"
    :data="data"
    :filter-node-method="filterNodeMethod"
    filterable
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
// const value2 = ref()

const sourceData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [{ value: '1-1-1', label: 'Level three 1-1-1' }]
      }
    ]
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [{ value: '2-1-1', label: 'Level three 2-1-1' }]
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [{ value: '2-2-1', label: 'Level three 2-2-1' }]
      }
    ]
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [{ value: '3-1-1', label: 'Level three 3-1-1' }]
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [{ value: '3-2-1', label: 'Level three 3-2-1' }]
      }
    ]
  }
]
const data = ref(sourceData)

// const data2 = ref(sourceData)

// const filterMethod = (value) => {
//   data2.value = [...sourceData].filter((item) => item.label.includes(value))
// }

const filterNodeMethod = (value, data) => data.label.includes(value)
</script>
