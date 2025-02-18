<template>
  <r-table-ssr
    :empty-state="{
      image:
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      imageSize: 80,
      description: 'No items'
    }"
    :columns="[
      { prop: 'id', label: 'ID' },
      { prop: 'name', label: 'Name' },
      { prop: 'title', label: 'Title' },
      { prop: 'email', label: 'Email' },
      { prop: 'role', label: 'Role' }
    ]"
  ></r-table-ssr>
</template>
