<template>
  <r-badge :content="5" class="item" type="primary">
    <div class="child" />
  </r-badge>
  <r-badge :content="10" class="item" type="success">
    <div class="child" />
  </r-badge>
  <r-badge :content="10" class="item" type="warning">
    <div class="child" />
  </r-badge>
  <r-badge :content="10" class="item">
    <div class="child" />
  </r-badge>
  <r-badge :content="10" class="item" type="info">
    <div class="child" />
  </r-badge>
  <r-badge content="Hot" class="item">
    <div class="child" />
  </r-badge>
  <r-badge dot class="item">
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
