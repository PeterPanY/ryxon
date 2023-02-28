<template>
  <r-swipe class="my-swipe">
    <r-swipe-item>1</r-swipe-item>
    <r-swipe-item>2</r-swipe-item>
    <r-swipe-item>3</r-swipe-item>
    <r-swipe-item>4</r-swipe-item>
    <template #indicator="{ active, total }">
      <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
    </template>
  </r-swipe>
</template>

<script setup lang="ts"></script>

<style scoped>
.my-swipe .r-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
