<template>
  <r-table-ssr :columns="columns" :rows="items">
    <template #name-data="{ row }">
      {{ row.name.value }}
    </template>
  </r-table-ssr>
</template>

<script setup lang="ts">
const columns = [
  { prop: 'date', label: 'Date', width: 180 },
  { prop: 'name', label: 'Name', width: 180, class: 'warning-table-ssr' },
  { prop: 'address', label: 'Address' }
]

const items = [
  {
    date: '2025-02-17',
    address: 'No. 189, Grove St, Los Angeles',
    name: { value: 'Tom', class: 'success-table-ssr' }
  },
  {
    date: '2025-02-16',
    address: 'No. 189, Grove St, Los Angeles',
    name: { value: 'Tom' },
    class: 'danger-table-ssr'
  },
  {
    date: '2025-02-15',
    address: 'No. 189, Grove St, Los Angeles',
    name: { value: 'Tom', class: 'success-table-ssr' }
  },
  {
    date: '2025-02-14',
    address: 'No. 189, Grove St, Los Angeles',
    name: { value: 'Tom', class: 'success-table-ssr' }
  }
]
</script>

<style>
.danger-table-ssr {
  background-color: var(--r-danger-color-light-9) !important;
}
.warning-table-ssr {
  background-color: var(--r-warning-color-light-9) !important;
}
.success-table-ssr {
  background-color: var(--r-success-color-light-9) !important;
}
</style>
