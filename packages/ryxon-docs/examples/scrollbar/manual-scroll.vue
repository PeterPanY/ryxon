<template>
  <r-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </r-scrollbar>

  <r-slider v-model="value" :max="max" @update:model-value="inputSlider" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { type RScrollbar } from '@ryxon/components'

const max = ref(0)
const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof RScrollbar>>()

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380
})

const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value)
}
const scroll = ({ scrollTop }) => {
  value.value = scrollTop
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--r-primary-color-light-9);
  color: var(--r-primary-color);
}
.r-slider {
  margin-top: 20px;
}
</style>
