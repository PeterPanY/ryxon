<template>
  <div style="font-size: 14px">
    <p>open(close) the Dropdown list2 will close(open) the Dropdown List1.</p>
  </div>
  <div style="margin: 15px">
    <r-button @click="showClick">show</r-button>
  </div>
  <r-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
    <span class="r-dropdown-link"> Dropdown List1 </span>
    <template #dropdown>
      <r-dropdown-menu>
        <r-dropdown-item>Action 1</r-dropdown-item>
        <r-dropdown-item>Action 2</r-dropdown-item>
        <r-dropdown-item>Action 3</r-dropdown-item>
        <r-dropdown-item disabled>Action 4</r-dropdown-item>
        <r-dropdown-item divided>Action 5</r-dropdown-item>
      </r-dropdown-menu>
    </template>
  </r-dropdown>

  <r-dropdown trigger="contextmenu" @visible-change="handleVisible2">
    <span class="r-dropdown-link"> Dropdown List2 </span>
    <template #dropdown>
      <r-dropdown-menu>
        <r-dropdown-item>Action 1</r-dropdown-item>
        <r-dropdown-item>Action 2</r-dropdown-item>
        <r-dropdown-item>Action 3</r-dropdown-item>
        <r-dropdown-item disabled>Action 4</r-dropdown-item>
        <r-dropdown-item divided>Action 5</r-dropdown-item>
      </r-dropdown-menu>
    </template>
  </r-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dropdown1 = ref()
function handleVisible2(visible: any) {
  console.log(visible)
  if (visible) {
    dropdown1.value.handleClose()
  } else {
    dropdown1.value.handleOpen()
  }
}
function showClick() {
  dropdown1.value.handleOpen()
}
</script>
<style scoped>
.example-showcase .r-dropdown-link {
  cursor: pointer;
  color: var(--r-primary-color);
  display: flex;
  align-items: center;
}
</style>
