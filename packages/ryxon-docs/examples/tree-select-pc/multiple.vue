<template>
  <r-tree-select-pc
    v-model="value"
    :data="data"
    multiple
    :render-after-expand="false"
  />
  <br />
  show checkbox:
  <r-tree-select-pc
    v-model="value"
    :data="data"
    multiple
    :render-after-expand="false"
    show-checkbox
  />
  <br />
  show checkbox with `check-strictly`:
  <r-tree-select-pc
    v-model="valueStrictly"
    :data="data"
    multiple
    :render-after-expand="false"
    show-checkbox
    check-strictly
    check-on-click-node
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
const valueStrictly = ref()

const data = [
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
</script>
