<script setup lang="ts">
import RField from '..';
import RCellGroup from '../../cell-group';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    phone: '手机号',
    errorInfo: '错误提示',
    phoneError: '手机号格式错误',
    phonePlaceholder: '请输入手机号',
    usernamePlaceholder: '请输入用户名',
  },
  'en-US': {
    phone: 'Phone',
    errorInfo: 'Error Info',
    phoneError: 'Invalid phone',
    phonePlaceholder: 'Phone',
    usernamePlaceholder: 'Username',
  },
});

const phone = ref('123');
const username = ref('');
</script>

<template>
  <demo-block :title="t('errorInfo')">
    <r-cell-group inset>
      <r-field
        v-model="username"
        error
        required
        :label="t('username')"
        :placeholder="t('usernamePlaceholder')"
      />
      <r-field
        v-model="phone"
        required
        :label="t('phone')"
        :placeholder="t('phonePlaceholder')"
        :error-message="t('phoneError')"
      />
    </r-cell-group>
  </demo-block>
</template>
