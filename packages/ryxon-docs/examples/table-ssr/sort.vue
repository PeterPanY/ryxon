<template>
  <r-table-ssr :sort="sort" :columns="columns" :rows="people"></r-table-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sort = ref({
  column: 'name',
  direction: 'desc'
})

const columns = [
  {
    label: 'Name',
    prop: 'name',
    sortable: true
  }
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
  }
]
</script>
