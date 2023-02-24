<template>
  <div>
    <r-radio-group v-model="radio1">
      <r-radio name="1" check-shape="check">自定义选中样式</r-radio>
      <r-radio name="2" check-shape="check">自定义选中样式</r-radio>
    </r-radio-group>
  </div>
  <div>
    <r-radio-group v-model="radio1">
      <r-radio name="1" shape="square" check-shape="check">自定义形状</r-radio>
      <r-radio name="2" shape="square" check-shape="check">自定义形状</r-radio>
    </r-radio-group>
  </div>
  <div>
    <r-radio-group v-model="radio1">
      <r-radio name="1">
        自定义图标
        <template #icon="props">
          <span>{{ props.checked ? 'yes' : 'no' }}</span>
        </template>
      </r-radio>
      <r-radio name="2">
        自定义图标
        <template #icon="props">
          <span>{{ props.checked ? 'yes' : 'no' }}</span>
        </template>
      </r-radio>
    </r-radio-group>
  </div>
  <div>
    <r-radio-group v-model="radio1">
      <r-radio name="1" label-position="left">左侧文本</r-radio>
      <r-radio name="2" label-position="left">左侧文本</r-radio>
    </r-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('1')
</script>
