<script setup lang="ts">
import RField from '..';
import RButton from '../../button';
import RCellGroup from '../../cell-group';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    sms: '短信验证码',
    sendSMS: '发送验证码',
    insertButton: '插入按钮',
    smsPlaceholder: '请输入短信验证码',
  },
  'en-US': {
    sms: 'SMS',
    sendSMS: 'Send SMS',
    insertButton: 'Insert Button',
    smsPlaceholder: 'SMS',
  },
});

const sms = ref('');
</script>

<template>
  <demo-block :title="t('insertButton')">
    <r-cell-group inset>
      <r-field
        v-model="sms"
        center
        clearable
        :label="t('sms')"
        :placeholder="t('smsPlaceholder')"
      >
        <template #button>
          <r-button size="small" type="primary">
            {{ t('sendSMS') }}
          </r-button>
        </template>
      </r-field>
    </r-cell-group>
  </demo-block>
</template>
