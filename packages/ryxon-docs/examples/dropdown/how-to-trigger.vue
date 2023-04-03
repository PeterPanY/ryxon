<template>
  <r-row class="block-col-2">
    <r-col :span="8">
      <span class="demonstration">hover to trigger</span>
      <r-dropdown>
        <span class="r-dropdown-link">
          Dropdown List<r-icon class="r-icon--right"><arrow-down /></r-icon>
        </span>
        <template #dropdown>
          <r-dropdown-menu>
            <r-dropdown-item :icon="Plus">Action 1</r-dropdown-item>
            <r-dropdown-item :icon="CirclePlusFilled">
              Action 2
            </r-dropdown-item>
            <r-dropdown-item :icon="CirclePlus">Action 3</r-dropdown-item>
            <r-dropdown-item :icon="Check">Action 4</r-dropdown-item>
            <r-dropdown-item :icon="CircleCheck">Action 5</r-dropdown-item>
          </r-dropdown-menu>
        </template>
      </r-dropdown>
    </r-col>
    <r-col :span="8">
      <span class="demonstration">click to trigger</span>
      <r-dropdown trigger="click">
        <span class="r-dropdown-link">
          Dropdown List<r-icon class="r-icon--right"><arrow-down /></r-icon>
        </span>
        <template #dropdown>
          <r-dropdown-menu>
            <r-dropdown-item :icon="Plus">Action 1</r-dropdown-item>
            <r-dropdown-item :icon="CirclePlusFilled">
              Action 2
            </r-dropdown-item>
            <r-dropdown-item :icon="CirclePlus">Action 3</r-dropdown-item>
            <r-dropdown-item :icon="Check">Action 4</r-dropdown-item>
            <r-dropdown-item :icon="CircleCheck">Action 5</r-dropdown-item>
          </r-dropdown-menu>
        </template>
      </r-dropdown>
    </r-col>
    <r-col :span="8">
      <span class="demonstration">right click to trigger</span>
      <r-dropdown trigger="contextmenu">
        <span class="r-dropdown-link">
          Dropdown List<r-icon class="r-icon--right"><arrow-down /></r-icon>
        </span>
        <template #dropdown>
          <r-dropdown-menu>
            <r-dropdown-item :icon="Plus">Action 1</r-dropdown-item>
            <r-dropdown-item :icon="CirclePlusFilled">
              Action 2
            </r-dropdown-item>
            <r-dropdown-item :icon="CirclePlus">Action 3</r-dropdown-item>
            <r-dropdown-item :icon="Check">Action 4</r-dropdown-item>
            <r-dropdown-item :icon="CircleCheck">Action 5</r-dropdown-item>
          </r-dropdown-menu>
        </template>
      </r-dropdown>
    </r-col>
  </r-row>
</template>

<script lang="ts" setup>
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus
} from '@ryxon/icons'
</script>

<style scoped>
.block-col-2 .demonstration {
  display: block;
  color: var(--r-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
