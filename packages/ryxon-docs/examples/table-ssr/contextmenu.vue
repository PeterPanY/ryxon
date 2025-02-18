<template>
  <r-table-ssr
    :columns="columns"
    :rows="people"
    @row-contextmenu="contextmenu"
  ></r-table-ssr>
</template>

<script setup lang="ts">
const columns = [
  { prop: 'date', label: 'Date', width: 180 },
  { prop: 'name', label: 'Name', width: 180 },
  { prop: 'address', label: 'Address' }
]

const people = [
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

function contextmenu(row: any, event: MouseEvent) {
  // Prevent the default context menu
  event.preventDefault()

  console.log(`top:${event.clientY},left:${event.clientX}`, row)
}
</script>
