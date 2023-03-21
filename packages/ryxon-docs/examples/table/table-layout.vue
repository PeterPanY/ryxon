<template>
  <r-radio-group v-model="tableLayout">
    <r-radio name="fixed" type="button" />
    <r-radio name="auto" type="button" />
  </r-radio-group>
  <r-table :data="tableData" :table-layout="tableLayout">
    <r-table-column prop="date" label="Date" />
    <r-table-column prop="name" label="Name" />
    <r-table-column prop="address" label="Address" />
  </r-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableLayout = ref('fixed')

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
