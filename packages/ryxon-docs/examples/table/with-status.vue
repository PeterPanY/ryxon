<template>
  <r-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <r-table-column prop="date" label="Date" width="180" />
    <r-table-column prop="name" label="Name" width="180" />
    <r-table-column prop="address" label="Address" />
  </r-table>
</template>

<script lang="ts" setup>
interface User {
  date: string
  name: string
  address: string
}

const tableRowClassName = ({ rowIndex }: { row: User; rowIndex: number }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  }
  if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
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

<style>
.r-table .warning-row {
  --r-table-tr-bg-color: var(--r-warning-color-light-9);
}
.r-table .success-row {
  --r-table-tr-bg-color: var(--r-success-color-light-9);
}
</style>
