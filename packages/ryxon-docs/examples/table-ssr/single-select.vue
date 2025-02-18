<template>
  <r-table-ssr
    v-model="selected"
    :columns="columns"
    :rows="people"
    :single-select="true"
  ></r-table-ssr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { prop: 'select', width: 50 },
  { prop: 'date', label: 'Date', width: 120 },
  { prop: 'name', label: 'Name', width: 120 },
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

const selected = ref([people[1]])
</script>
