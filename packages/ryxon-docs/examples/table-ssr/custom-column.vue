<template>
  <r-table-ssr :columns="columns" :rows="people">
    <template #name-data="{ row }">
      <r-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ row.name }}</div>
          <div>email: {{ row.email }}</div>
        </template>
        <template #reference>
          <r-tag>{{ row.name }}</r-tag>
        </template>
      </r-popover>
    </template>
    <template #operations-data="{ row, index }">
      <r-button size="small" @click="handleEdit(index, row)">Edit</r-button>
      <r-button size="small" type="danger" @click="handleDelete(index, row)"
        >Delete</r-button
      >
    </template>
  </r-table-ssr>
</template>

<script setup lang="ts">
const columns = [
  { prop: 'name', label: 'User name' },
  { prop: 'title', label: 'Job position' },
  { prop: 'operations', label: 'Operations' }
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
    role: 'Admin'
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

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: any) => {
  console.log(index, row)
}
</script>
