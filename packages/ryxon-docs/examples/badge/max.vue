<template>
  <r-badge :content="20" max="9" class="item">
    <div class="child" />
  </r-badge>
  <r-badge :content="50" max="20" class="item">
    <div class="child" />
  </r-badge>
  <r-badge :content="200" max="99" class="item">
    <div class="child" />
  </r-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
</style>
