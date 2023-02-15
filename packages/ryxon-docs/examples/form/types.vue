<template>
  <r-form @submit="onSubmit">
    <r-input name="select" label="选择器">
      <template #input>
        <r-select v-model="select">
          <r-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </r-select>
      </template>
    </r-input>

    <r-input name="slider" label="滑块">
      <template #input>
        <r-slider v-model="slider" />
      </template>
    </r-input>

    <div style="margin: 16px">
      <r-button round block type="primary" native-type="submit">提交</r-button>
    </div>
  </r-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const select = ref('')
const options = [
  {
    value: 'value1',
    label: 'label1'
  },
  {
    value: 'value2',
    label: 'label2'
  },
  {
    value: 'value3',
    label: 'label3'
  },
  {
    value: 'value4',
    label: 'label4'
  },
  {
    value: 'value5',
    label: 'label5'
  }
]

const slider = ref(50)

const onSubmit = (values: Record<string, string>) => {
  console.log(values)
}
</script>
