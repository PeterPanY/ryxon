<template>
  <r-swipe
    class="my-swipe"
    style="height: 200px"
    vertical
    :autoplay="3000"
    indicator-color="white"
  >
    <r-swipe-item>1</r-swipe-item>
    <r-swipe-item>2</r-swipe-item>
    <r-swipe-item>3</r-swipe-item>
    <r-swipe-item>4</r-swipe-item>
  </r-swipe>
</template>

<style scoped>
.my-swipe .r-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 200px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
