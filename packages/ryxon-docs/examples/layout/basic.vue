<template>
  <r-row>
    <r-col span="8">span: 8</r-col>
    <r-col span="8">span: 8</r-col>
    <r-col span="8">span: 8</r-col>
  </r-row>

  <r-row>
    <r-col span="4">span: 4</r-col>
    <r-col span="10" offset="4">offset: 4, span: 10</r-col>
  </r-row>

  <r-row>
    <r-col offset="12" span="12">offset: 12, span: 12</r-col>
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
