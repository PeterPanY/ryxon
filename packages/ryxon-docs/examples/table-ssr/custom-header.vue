<template>
  <r-table-ssr :columns="columns" :rows="filterTableData">
    <template #name-header>
      <r-input v-model="search" placeholder="Type to search" />
    </template>
  </r-table-ssr>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const columns = [
  { prop: 'id', label: 'ID', width: 50 },
  { prop: 'name', label: 'User name' },
  { prop: 'title', label: 'Job position' },
  { prop: 'email', label: 'Email' },
  { prop: 'role', label: 'Role', width: 80 }
]

const tableData = [
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

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>
