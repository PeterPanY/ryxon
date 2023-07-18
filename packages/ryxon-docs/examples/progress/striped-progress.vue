<template>
  <div class="demo-progress">
    <r-progress :percentage="50" :stroke-width="15" striped />
    <r-progress
      :percentage="30"
      :stroke-width="15"
      status="warning"
      striped
      striped-flow
    />
    <r-progress
      :percentage="100"
      :stroke-width="15"
      status="success"
      striped
      striped-flow
      :duration="10"
    />
    <r-progress
      :percentage="percentage"
      :stroke-width="15"
      status="danger"
      striped
      striped-flow
      :duration="duration"
    />
    <r-button-group>
      <r-button :icon="Minus" @click="decrease" />
      <r-button :icon="Plus" @click="increase" />
    </r-button-group>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Minus, Plus } from '@ryxon/icons'

const percentage = ref<number>(70)
const duration = computed(() => Math.floor(percentage.value / 10))

const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}
</script>

<style scoped>
.demo-progress .r-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
