<template>
  <r-dropdown @command="handleCommand">
    <span class="r-dropdown-link">
      Dropdown List
      <r-icon class="r-icon--right">
        <arrow-down />
      </r-icon>
    </span>
    <template #dropdown>
      <r-dropdown-menu>
        <r-dropdown-item command="a">Action 1</r-dropdown-item>
        <r-dropdown-item command="b">Action 2</r-dropdown-item>
        <r-dropdown-item command="c">Action 3</r-dropdown-item>
        <r-dropdown-item command="d" disabled>Action 4</r-dropdown-item>
        <r-dropdown-item command="e" divided>Action 5</r-dropdown-item>
      </r-dropdown-menu>
    </template>
  </r-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@ryxon/icons'

const handleCommand = (val: string | number | object) => {
  console.log(val)
}
</script>
<style scoped>
.example-showcase .r-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
