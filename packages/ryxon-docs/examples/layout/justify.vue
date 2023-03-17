<template>
  <!-- 居中 -->
  <r-row justify="center">
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
  </r-row>

  <!-- 右对齐 -->
  <r-row justify="end">
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
  </r-row>

  <!-- 两端对齐 -->
  <r-row justify="space-between">
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
  </r-row>

  <!-- 每个元素的两侧间隔相等 -->
  <r-row justify="space-around">
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
    <r-col span="6">span: 6</r-col>
  </r-row>
</template>

<style lang="scss" scoped>
.r-col {
  margin-bottom: 10px;
  color: var(--r-white);
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  background-clip: content-box;

  &:nth-child(odd) {
    background-color: #39a9ed;
  }

  &:nth-child(even) {
    background-color: #66c6f2;
  }
}
</style>
