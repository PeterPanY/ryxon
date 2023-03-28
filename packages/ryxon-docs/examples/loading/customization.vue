<template>
  <r-table
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    :data="tableData"
    style="width: 100%"
  >
    <r-table-column prop="date" label="Date" width="180" />
    <r-table-column prop="name" label="Name" width="180" />
    <r-table-column prop="address" label="Address" />
  </r-table>
  <r-table
    v-loading="loading"
    :element-loading-spinner="svg"
    class="custom-loading-svg"
    :data="tableData"
    style="width: 100%"
  >
    <r-table-column prop="date" label="Date" width="180" />
    <r-table-column prop="name" label="Name" width="180" />
    <r-table-column prop="address" label="Address" />
  </r-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)

const svg = `
<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"/><path fill="currentColor" d="M512 96a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V128a32 32 0 0 1 32-32zm0 576a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V704a32 32 0 0 1 32-32zM96 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H128a32 32 0 0 1-32-32zm576 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H704a32 32 0 0 1-32-32z"/></svg>
      `

const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
]
</script>
<style scoped>
:deep(.r-v-loading__mask) {
  z-index: 9;
}
</style>
