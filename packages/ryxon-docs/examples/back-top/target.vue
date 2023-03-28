<template>
  <div class="backContainer">
    <r-cell v-for="item in list" :key="item" :title="item" />
    <r-back-top target=".backContainer" bottom="30vh" />
  </div>
</template>

<script setup lang="ts">
const list = [...Array(50).keys()]
</script>

<style scoped>
.backContainer {
  height: 60vh;
  overflow: auto;
}
</style>
