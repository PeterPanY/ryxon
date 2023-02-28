<template>
  <div>
    <div>指示器悬停时切换(默认)</div>
    <r-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <r-swipe-item>1</r-swipe-item>
      <r-swipe-item>2</r-swipe-item>
      <r-swipe-item>3</r-swipe-item>
      <r-swipe-item>4</r-swipe-item>
    </r-swipe>
  </div>
  <div>
    <div>单击指示器时切换</div>
    <r-swipe
      class="my-swipe"
      trigger="click"
      :autoplay="3000"
      indicator-color="white"
    >
      <r-swipe-item>1</r-swipe-item>
      <r-swipe-item>2</r-swipe-item>
      <r-swipe-item>3</r-swipe-item>
      <r-swipe-item>4</r-swipe-item>
    </r-swipe>
  </div>
</template>

<style scoped>
.my-swipe .r-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
