<template>
  <r-table :data="tableData" style="width: 100%">
    <r-table-column label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <r-icon><Clock /></r-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </r-table-column>
    <r-table-column label="Name" width="180">
      <template #default="scope">
        <r-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <r-tag>{{ scope.row.name }}</r-tag>
          </template>
        </r-popover>
      </template>
    </r-table-column>
    <r-table-column label="Operations">
      <template #default="scope">
        <r-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</r-button
        >
        <r-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</r-button
        >
      </template>
    </r-table-column>
  </r-table>
</template>

<script lang="ts" setup>
import { Clock } from '@ryxon/icons'

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
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
