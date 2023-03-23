<template>
  <r-form @submit="onSubmit">
    <r-input name="switch" label="开关">
      <template #input>
        <r-switch v-model="switchChecked" />
      </template>
    </r-input>
    <r-input name="radio" label="单选框">
      <template #input>
        <r-radio-group v-model="radio" direction="horizontal">
          <r-radio name="1">单选框 1</r-radio>
          <r-radio name="2">单选框 2</r-radio>
        </r-radio-group>
      </template>
    </r-input>
    <r-input name="checkbox" label="复选框">
      <template #input>
        <r-checkbox v-model="checked" shape="square">复选框</r-checkbox>
      </template>
    </r-input>
    <r-input name="checkboxGroup" label="复选框组">
      <template #input>
        <r-checkbox-group v-model="groupChecked" direction="horizontal">
          <r-checkbox name="1" shape="square">复选框 1</r-checkbox>
          <r-checkbox name="2" shape="square">复选框 2</r-checkbox>
        </r-checkbox-group>
      </template>
    </r-input>
    <r-input name="slider" label="滑块">
      <template #input>
        <r-slider v-model="slider" />
      </template>
    </r-input>
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
    <r-input name="datePicker" label="时间选择">
      <template #input>
        <r-date-picker-pc
          v-model="datePicker"
          type="date"
          placeholder="Pick a day"
          value-format="YYYY-MM-DD"
        />
      </template>
    </r-input>

    <r-input name="upload" label="文件上传">
      <template #input>
        <r-upload v-model="upload" max-count="2" :auto-upload="false" />
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
  { value: 'value1', label: 'label1' },
  { value: 'value2', label: 'label2' },
  { value: 'value3', label: 'label3' },
  { value: 'value4', label: 'label4' },
  { value: 'value5', label: 'label5' }
]

const switchChecked = ref(false)
const radio = ref('1')
const checked = ref(false)
const groupChecked = ref([])
const slider = ref(50)
const datePicker = ref()
const upload = ref([
  {
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  }
])

const onSubmit = (values: Record<string, string>) => {
  console.log(values)
}
</script>
