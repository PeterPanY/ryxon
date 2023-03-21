<template>
  <r-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <r-table-column type="selection" width="55" />
    <r-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </r-table-column>
    <r-table-column property="name" label="Name" width="120" />
    <r-table-column property="address" label="Address" show-overflow-tooltip />
  </r-table>
  <div style="margin-top: 20px">
    <r-button @click="toggleSelection([tableData[1], tableData[2]])">
      Toggle selection status of second and third rows
    </r-button>
    <r-button @click="toggleSelection()">Clear selection</r-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address:
      'No. 189, Grove St, Los Angeles.No. 189, Grove St, Los Angeles.No. 189, Grove St, Los Angeles'
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
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
