<template>
  <r-dropdown size="large" split-button type="primary">
    Large
    <template #dropdown>
      <r-dropdown-menu>
        <r-dropdown-item>Action 1</r-dropdown-item>
        <r-dropdown-item>Action 2</r-dropdown-item>
        <r-dropdown-item>Action 3</r-dropdown-item>
        <r-dropdown-item>Action 4</r-dropdown-item>
      </r-dropdown-menu>
    </template>
  </r-dropdown>

  <r-dropdown split-button type="primary">
    Default
    <template #dropdown>
      <r-dropdown-menu>
        <r-dropdown-item>Action 1</r-dropdown-item>
        <r-dropdown-item>Action 2</r-dropdown-item>
        <r-dropdown-item>Action 3</r-dropdown-item>
        <r-dropdown-item>Action 4</r-dropdown-item>
      </r-dropdown-menu>
    </template>
  </r-dropdown>

  <r-dropdown size="small" split-button type="primary">
    Small
    <template #dropdown>
      <r-dropdown-menu>
        <r-dropdown-item>Action 1</r-dropdown-item>
        <r-dropdown-item>Action 2</r-dropdown-item>
        <r-dropdown-item>Action 3</r-dropdown-item>
        <r-dropdown-item>Action 4</r-dropdown-item>
      </r-dropdown-menu>
    </template>
  </r-dropdown>
</template>
<style scoped>
.example-showcase .r-dropdown + .r-dropdown {
  margin-left: 15px;
}
</style>
