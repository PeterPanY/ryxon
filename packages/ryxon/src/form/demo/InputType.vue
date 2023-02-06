<script setup lang="ts">
import { ref } from 'vue'
import { cdnURL, useTranslate } from '../../../docs/site'
import RForm from '..'
import RRate from '../../rate'
import RRadio from '../../radio'
import RInput from '../../input'
import RButton from '../../button'
import RSlider from '../../slider'
import RSwitch from '../../switch'
import RStepper from '../../stepper'
import RCheckbox from '../../checkbox'
import RUploader from '../../uploader'
import RCellGroup from '../../cell-group'
import RRadioGroup from '../../radio-group'
import RCheckboxGroup from '../../checkbox-group'
import InputTypeArea from './InputTypeArea.vue'
import InputTypePicker from './InputTypePicker.vue'
import InputTypeCalendar from './InputTypeCalendar.vue'
import InputTypeDatePicker from './InputTypeDatePicker.vue'

const t = useTranslate({
  'zh-CN': {
    rate: '评分',
    radio: '单选框',
    submit: '提交',
    switch: '开关',
    slider: '滑块',
    picker: '选择器',
    stepper: '步进器',
    checkbox: '复选框',
    uploader: '文件上传',
    inputType: '表单项类型',
    checkboxGroup: '复选框组',
    requireCheckbox: '请勾选复选框'
  },
  'en-US': {
    rate: 'Rate',
    radio: 'Radio',
    submit: 'Submit',
    switch: 'Switch',
    slider: 'Slider',
    picker: 'Picker',
    stepper: 'Stepper',
    checkbox: 'Checkbox',
    uploader: 'Uploader',
    inputType: 'Input Type',
    checkboxGroup: 'Checkbox Group',
    requireCheckbox: 'Checkbox is required'
  }
})

const rate = ref(3)
const radio = ref('1')
const slider = ref(50)
const stepper = ref(1)
const uploader = ref([{ url: cdnURL('leaf.jpeg') }])
const checkbox = ref(false)
const checkboxGroup = ref([])
const switchChecked = ref(false)

const onSubmit = (values: Record<string, string>) => {
  console.log(values)
}
</script>

<template>
  <demo-block :title="t('inputType')">
    <r-form @submit="onSubmit">
      <r-cell-group inset>
        <r-input name="switch" :label="t('switch')">
          <template #input>
            <r-switch v-model="switchChecked" />
          </template>
        </r-input>

        <r-input name="checkbox" :label="t('checkbox')">
          <template #input>
            <r-checkbox v-model="checkbox" shape="square" />
          </template>
        </r-input>

        <r-input name="checkboxGroup" :label="t('checkboxGroup')">
          <template #input>
            <r-checkbox-group v-model="checkboxGroup" direction="horizontal">
              <r-checkbox name="1" shape="square">
                {{ t('checkbox') }} 1
              </r-checkbox>
              <r-checkbox name="2" shape="square">
                {{ t('checkbox') }} 2
              </r-checkbox>
            </r-checkbox-group>
          </template>
        </r-input>

        <r-input name="radio" :label="t('radio')">
          <template #input>
            <r-radio-group v-model="radio" direction="horizontal">
              <r-radio name="1">{{ t('radio') }} 1</r-radio>
              <r-radio name="2">{{ t('radio') }} 2</r-radio>
            </r-radio-group>
          </template>
        </r-input>

        <r-input name="stepper" :label="t('stepper')">
          <template #input>
            <r-stepper v-model="stepper" />
          </template>
        </r-input>

        <r-input name="rate" :label="t('rate')">
          <template #input>
            <r-rate v-model="rate" />
          </template>
        </r-input>

        <r-input name="slider" :label="t('slider')">
          <template #input>
            <r-slider v-model="slider" />
          </template>
        </r-input>

        <r-input name="uploader" :label="t('uploader')">
          <template #input>
            <r-uploader v-model="uploader" max-count="2" />
          </template>
        </r-input>

        <input-type-picker />
        <input-type-date-picker />
        <input-type-area />
        <input-type-calendar />
      </r-cell-group>

      <div style="margin: 16px 16px 0">
        <r-button round block type="primary" native-type="submit">
          {{ t('submit') }}
        </r-button>
      </div>
    </r-form>
  </demo-block>
</template>
