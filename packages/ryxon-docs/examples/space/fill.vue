<template>
  <div>
    <div style="margin-bottom: 15px">fill: <r-switch v-model="fill" /></div>
    <r-space :fill="fill" wrap>
      <r-cell v-for="i in 3" :key="i" class="box-card">
        {{ i }}
        <div v-for="o in 4" :key="o">
          {{ 'List item ' + o }}
        </div>
      </r-cell>
    </r-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fill = ref(true)
</script>

<style lang="scss" scoped>
.box-card {
  border: 1px solid #333;
}
</style>
