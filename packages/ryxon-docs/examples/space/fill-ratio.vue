<template>
  <div>
    <div style="margin-bottom: 15px">
      direction:
      <r-radio v-model="direction" name="horizontal">horizontal</r-radio>
      <r-radio v-model="direction" name="vertical">vertical</r-radio>
    </div>
    <div style="margin-bottom: 15px">
      fillRatio:<r-slider v-model="fillRatio" />
    </div>
    <r-space
      fill
      wrap
      :fill-ratio="fillRatio"
      :direction="direction"
      style="width: 100%"
    >
      <r-cell v-for="i in 5" :key="i" class="box-card">
        {{ i }}
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </r-cell>
    </r-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const direction = ref('horizontal')
const fillRatio = ref(30)
</script>

<style lang="scss" scoped>
.box-card {
  border: 1px solid #333;
}
</style>
