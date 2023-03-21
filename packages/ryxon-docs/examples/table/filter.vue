<template>
  <r-button @click="resetDateFilter">reset date filter</r-button>
  <r-button @click="clearFilter">reset all filters</r-button>
  <r-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <r-table-column
      prop="date"
      label="Date"
      sortable
      width="180"
      column-key="date"
      :filters="[
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' }
      ]"
      :filter-method="filterHandler"
    />
    <r-table-column prop="name" label="Name" width="100" />
    <r-table-column prop="address" label="Address" :formatter="formatter" />

    <r-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' }
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <r-tag :type="scope.row.tag === 'Home' ? 'primary' : 'success'">{{
          scope.row.tag
        }}</r-tag>
      </template>
    </r-table-column>
  </r-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Table, type TableColumnCtx } from '@ryxon/components'

interface User {
  date: string
  name: string
  address: string
  tag: string
}

const tableRef = ref<InstanceType<typeof Table>>()

const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date'])
}
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  tableRef.value!.clearFilter()
}
const formatter = (row: User) => row.address
const filterTag = (value: string, row: User) => row.tag === value
const filterHandler = (
  value: string,
  row: User,
  column: TableColumnCtx<User>
) => {
  const {property} = column
  return row[property] === value
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office'
  }
]
</script>
