<template>
  <r-table
    ref="singleTableRef"
    :data="tableData"
    highlight-current-row
    style="width: 100%"
    @current-change="handleCurrentChange"
  >
    <r-table-column type="index" width="50" />
    <r-table-column property="date" label="Date" width="120" />
    <r-table-column property="name" label="Name" width="120" />
    <r-table-column property="address" label="Address" />
  </r-table>
  <div style="margin-top: 20px">
    <r-button @click="setCurrent(tableData[1])">Select second row</r-button>
    <r-button @click="setCurrent()">Clear selection</r-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface User {
  date: string
  name: string
  address: string
}

const currentRow = ref()
const singleTableRef = ref()

const setCurrent = (row?: User) => {
  singleTableRef.value!.setCurrentRow(row)
}
const handleCurrentChange = (val: User | undefined) => {
  currentRow.value = val
}
const tableData: User[] = [
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
