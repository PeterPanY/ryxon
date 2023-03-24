<template>
  <r-button text @click="show = true"> Show dialog </r-button>

  <r-dialog
    v-model:show="show"
    position="top"
    title="标题"
    width="1000px"
    theme="space-button"
    show-cancel-button
  >
    <r-table :data="gridData">
      <r-table-column property="date" label="Date" width="150" />
      <r-table-column property="name" label="Name" width="200" />
      <r-table-column property="address" label="Address" />
    </r-table>
  </r-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

const gridData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
]
</script>
