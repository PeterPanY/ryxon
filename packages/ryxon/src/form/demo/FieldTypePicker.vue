<script setup lang="ts">
import RField from '../../field';
import RPopup from '../../popup';
import RPicker, { PickerConfirmEventParams } from '../../picker';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';
import { basicColumns } from '../../picker/demo/data';
import type { Numeric } from '../../utils';

const t = useTranslate({
  'zh-CN': {
    picker: '选择器',
    placeholder: '点击选择城市',
    textColumns: basicColumns['zh-CN'],
  },
  'en-US': {
    picker: 'Picker',
    placeholder: 'Select city',
    textColumns: basicColumns['en-US'],
  },
});

const result = ref<Numeric>('');
const showPicker = ref(false);

const onConfirm = ({ selectedOptions }: PickerConfirmEventParams) => {
  result.value = selectedOptions[0]?.text || '';
  showPicker.value = false;
};

const onCancel = () => {
  showPicker.value = false;
};
</script>

<template>
  <r-field
    v-model="result"
    is-link
    readonly
    name="picker"
    :label="t('picker')"
    :placeholder="t('placeholder')"
    @click="showPicker = true"
  />
  <r-popup v-model:show="showPicker" round position="bottom" teleport="body">
    <r-picker
      :columns="t('textColumns')"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </r-popup>
</template>
