<template>
  <r-dropdown :hide-on-click="false">
    <span class="r-dropdown-link">
      Dropdown List<r-icon class="r-icon--right"><arrow-down /></r-icon>
    </span>
    <template #dropdown>
      <r-dropdown-menu>
        <r-dropdown-item>Action 1</r-dropdown-item>
        <r-dropdown-item>Action 2</r-dropdown-item>
        <r-dropdown-item>Action 3</r-dropdown-item>
        <r-dropdown-item disabled>Action 4</r-dropdown-item>
        <r-dropdown-item divided>Action 5</r-dropdown-item>
        <r-dropdown-item divided>Action 6</r-dropdown-item>
      </r-dropdown-menu>
    </template>
  </r-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@ryxon/icons'
</script>
<style scoped>
.example-showcase .r-dropdown + .r-dropdown {
  margin-left: 15px;
}
.example-showcase .r-dropdown-link {
  cursor: pointer;
  color: var(--r-primary-color);
  display: flex;
  align-items: center;
}
</style>
