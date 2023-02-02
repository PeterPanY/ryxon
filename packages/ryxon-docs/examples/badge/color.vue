<template>
  <r-badge :content="5" color="#1989fa" class="item">
    <div class="child" />
  </r-badge>
  <r-badge :content="10" color="#1989fa" class="item">
    <div class="child" />
  </r-badge>
  <r-badge dot color="#1989fa" class="item">
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
