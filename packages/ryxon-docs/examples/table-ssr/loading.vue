<template>
  <r-table-ssr
    loading
    :loading-state="{
      icon: 'i-heroicons-arrow-path-20-solid',
      label: 'Loading...'
    }"
    progress
    :columns="[
      { prop: 'id', label: 'ID' },
      { prop: 'name', label: 'Name' },
      { prop: 'title', label: 'Title' },
      { prop: 'email', label: 'Email' },
      { prop: 'role', label: 'Role' }
    ]"
  ></r-table-ssr>
</template>
