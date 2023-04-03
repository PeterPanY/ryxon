<template>
  <div class="flex flex-wrap items-center">
    <r-dropdown>
      <r-button type="primary">
        Dropdown List<r-icon class="r-icon--right"><arrow-down /></r-icon>
      </r-button>
      <template #dropdown>
        <r-dropdown-menu>
          <r-dropdown-item>Action 1</r-dropdown-item>
          <r-dropdown-item>Action 2</r-dropdown-item>
          <r-dropdown-item>Action 3</r-dropdown-item>
          <r-dropdown-item>Action 4</r-dropdown-item>
          <r-dropdown-item>Action 5</r-dropdown-item>
        </r-dropdown-menu>
      </template>
    </r-dropdown>
    <r-dropdown
      split-button
      type="primary"
      @click="handleClick"
      @command="handleCommand"
    >
      Dropdown List
      <template #dropdown>
        <r-dropdown-menu>
          <r-dropdown-item command="a">Action 1</r-dropdown-item>
          <r-dropdown-item command="b">Action 2</r-dropdown-item>
          <r-dropdown-item command="c">Action 3</r-dropdown-item>
          <r-dropdown-item command="d">Action 4</r-dropdown-item>
          <r-dropdown-item command="e">Action 5</r-dropdown-item>
        </r-dropdown-menu>
      </template>
    </r-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@ryxon/icons'

const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click')
}

const handleCommand = (value: string | number | object) => {
  console.log(value)
}
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
