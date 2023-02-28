<template>
  <div class="demo-image">
    <div v-for="position in position1" :key="position" class="block">
      <span class="demonstration">cover + {{ position }}</span>
      <r-image
        style="width: 100px; height: 100px"
        :src="url"
        fit="cover"
        :position="position"
      />
    </div>
  </div>
  <div class="demo-image">
    <div v-for="position in position2" :key="position" class="block">
      <span class="demonstration">contain + {{ position }}</span>
      <r-image
        style="width: 100px; height: 100px"
        :src="url"
        fit="contain"
        :position="position"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const position1 = ['left', 'center', 'right']
const position2 = ['top', 'center', 'bottom']
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--r-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--r-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
