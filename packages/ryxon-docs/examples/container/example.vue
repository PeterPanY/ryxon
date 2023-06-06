<template>
  <r-container class="layout-container-demo" style="height: 500px">
    <r-aside width="200px">
      <r-scrollbar>
        <r-menu :default-openeds="['1', '3']">
          <r-sub-menu index="1">
            <template #title>
              <r-icon><message /></r-icon>Navigator One
            </template>
            <r-menu-item-group>
              <template #title>Group 1</template>
              <r-menu-item index="1-1">Option 1</r-menu-item>
              <r-menu-item index="1-2">Option 2</r-menu-item>
            </r-menu-item-group>
            <r-menu-item-group title="Group 2">
              <r-menu-item index="1-3">Option 3</r-menu-item>
            </r-menu-item-group>
            <r-sub-menu index="1-4">
              <template #title>Option4</template>
              <r-menu-item index="1-4-1">Option 4-1</r-menu-item>
            </r-sub-menu>
          </r-sub-menu>
          <r-sub-menu index="2">
            <template #title>
              <r-icon><icon-menu /></r-icon>Navigator Two
            </template>
            <r-menu-item-group>
              <template #title>Group 1</template>
              <r-menu-item index="2-1">Option 1</r-menu-item>
              <r-menu-item index="2-2">Option 2</r-menu-item>
            </r-menu-item-group>
            <r-menu-item-group title="Group 2">
              <r-menu-item index="2-3">Option 3</r-menu-item>
            </r-menu-item-group>
            <r-sub-menu index="2-4">
              <template #title>Option 4</template>
              <r-menu-item index="2-4-1">Option 4-1</r-menu-item>
            </r-sub-menu>
          </r-sub-menu>
          <r-sub-menu index="3">
            <template #title>
              <r-icon><setting /></r-icon>Navigator Three
            </template>
            <r-menu-item-group>
              <template #title>Group 1</template>
              <r-menu-item index="3-1">Option 1</r-menu-item>
              <r-menu-item index="3-2">Option 2</r-menu-item>
            </r-menu-item-group>
            <r-menu-item-group title="Group 2">
              <r-menu-item index="3-3">Option 3</r-menu-item>
            </r-menu-item-group>
            <r-sub-menu index="3-4">
              <template #title>Option 4</template>
              <r-menu-item index="3-4-1">Option 4-1</r-menu-item>
            </r-sub-menu>
          </r-sub-menu>
        </r-menu>
      </r-scrollbar>
    </r-aside>

    <r-container>
      <r-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <r-dropdown>
            <r-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></r-icon>
            <template #dropdown>
              <r-dropdown-menu>
                <r-dropdown-item>View</r-dropdown-item>
                <r-dropdown-item>Add</r-dropdown-item>
                <r-dropdown-item>Delete</r-dropdown-item>
              </r-dropdown-menu>
            </template>
          </r-dropdown>
          <span>Tom</span>
        </div>
      </r-header>

      <r-main>
        <r-scrollbar>
          <r-table :data="tableData">
            <r-table-column prop="date" label="Date" width="140" />
            <r-table-column prop="name" label="Name" width="120" />
            <r-table-column prop="address" label="Address" />
          </r-table>
        </r-scrollbar>
      </r-main>
    </r-container>
  </r-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@ryxon/icons'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .r-header {
  position: relative;
  background-color: var(--r-primary-color-light-7);
  color: var(--r-text-color-primary);
}
.layout-container-demo .r-aside {
  color: var(--r-text-color-primary);
  background: var(--r-primary-color-light-8);
}
.layout-container-demo .r-menu {
  border-right: none;
}
.layout-container-demo .r-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
