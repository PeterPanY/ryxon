<template>
  <r-table :data="tableData" style="width: 100%" max-height="250">
    <r-table-column fixed prop="date" label="Date" width="150" />
    <r-table-column prop="name" label="Name" width="120" />
    <r-table-column prop="state" label="State" width="120" />
    <r-table-column prop="city" label="City" width="120" />
    <r-table-column prop="address" label="Address" width="600" />
    <r-table-column prop="zip" label="Zip" width="120" />
    <r-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <r-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          Remove
        </r-button>
      </template>
    </r-table-column>
  </r-table>
  <r-button class="mt-4" style="width: 100%" @click="onAddItem"
    >Add Item</r-button
  >
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const now = new Date()

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
])

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: '2023-03-20',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  })
}
</script>
