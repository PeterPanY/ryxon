<template>
  <r-table-ssr
    v-model:expand="expand"
    :columns="columns"
    :rows="people"
    @update:expand="handleExpand"
  >
    <template #expand="{ row }">
      <pre>{{ row }}</pre>
    </template>
  </r-table-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { prop: 'id', label: 'ID', width: 50 },
  { prop: 'name', label: 'Name' },
  { prop: 'title', label: 'Title' },
  { prop: 'email', label: 'Email' },
  { prop: 'role', label: 'Role', width: 80 }
]

const people = [
  {
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
  },
  {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin',
    disabledExpand: true
  },
  {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member'
  },
  {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin'
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner'
  },
  {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member'
  }
]

const expand = ref({
  openedRows: [people[0]],
  row: {}
})

const handleExpand = ({ openedRows, row }: { openedRows: any[]; row: any }) => {
  console.log('opened Rows:', openedRows)
  console.log('Row Data:', row)
}
</script>
