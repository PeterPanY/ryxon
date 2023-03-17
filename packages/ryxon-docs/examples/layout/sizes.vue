<template>
  <r-row :gutter="10">
    <r-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"> 1 </r-col>
    <r-col :xs="4" :sm="6" :md="8" :lg="9" xl="11"> 2 </r-col>
    <r-col :xs="4" :sm="6" :md="8" :lg="9" :xl="8"> 3 </r-col>
    <r-col :xs="8" :sm="6" :md="4" :lg="3" :xl="{ span: 4 }"> 4 </r-col>
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
