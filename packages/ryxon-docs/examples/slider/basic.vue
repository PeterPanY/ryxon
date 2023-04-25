<template>
  <div class="slider-demo-block">
    <span class="demonstration">默认值</span>
    <r-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">自定义初始值</span>
    <r-slider v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">隐藏tooltip提示</span>
    <r-slider v-model="value3" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">格式 Tooltip提示</span>
    <r-slider v-model="value4" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">禁用</span>
    <r-slider v-model="value5" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)

const formatTooltip = (val: number) => val / 100
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .r-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--r-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .r-slider {
  flex: 0 0 70%;
}
</style>
