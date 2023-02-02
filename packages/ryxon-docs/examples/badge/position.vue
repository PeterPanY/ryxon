<template>
  <r-badge :content="10" position="top-left" class="item">
    <div class="child" />
  </r-badge>
  <r-badge :content="10" position="bottom-left" class="item">
    <div class="child" />
  </r-badge>
  <r-badge :content="10" position="bottom-right" class="item">
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
