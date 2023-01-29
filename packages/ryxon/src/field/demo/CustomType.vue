<script setup lang="ts">
import RField from '..';
import RForm from '../../form';
import RCellGroup from '../../cell-group';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    text: '文本',
    digit: '整数',
    phone: '手机号',
    number: '数字',
    customType: '自定义类型',
    smsPlaceholder: '请输入短信验证码',
    textPlaceholder: '请输入文本',
    digitPlaceholder: '请输入整数',
    phonePlaceholder: '请输入手机号',
    numberPlaceholder: '请输入数字（支持小数）',
    passwordPlaceholder: '请输入密码',
  },
  'en-US': {
    text: 'Text',
    digit: 'Digit',
    phone: 'Phone',
    number: 'Number',
    customType: 'Custom Type',
    smsPlaceholder: 'SMS',
    textPlaceholder: 'Text',
    digitPlaceholder: 'Digit',
    phonePlaceholder: 'Phone',
    numberPlaceholder: 'Number',
    passwordPlaceholder: 'Password',
  },
});

const text = ref('');
const phone = ref('');
const digit = ref('');
const number = ref('');
const password = ref('');
</script>

<template>
  <demo-block :title="t('customType')">
    <r-cell-group inset>
      <r-form>
        <r-field
          v-model="text"
          :label="t('text')"
          :placeholder="t('textPlaceholder')"
          autocomplete="off"
        />
        <r-field
          v-model="phone"
          type="tel"
          :label="t('phone')"
          :placeholder="t('phonePlaceholder')"
        />
        <r-field
          v-model="digit"
          type="digit"
          :label="t('digit')"
          :placeholder="t('digitPlaceholder')"
        />
        <r-field
          v-model="number"
          type="number"
          :label="t('number')"
          :placeholder="t('numberPlaceholder')"
        />
        <r-field
          v-model="password"
          type="password"
          :label="t('password')"
          :placeholder="t('passwordPlaceholder')"
          autocomplete="off"
        />
      </r-form>
    </r-cell-group>
  </demo-block>
</template>
