<script setup lang="ts">
import RField from '..';
import RCellGroup from '../../cell-group';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    text: '文本',
    disabled: '禁用输入框',
    inputReadonly: '输入框只读',
    inputDisabled: '输入框已禁用',
  },
  'en-US': {
    text: 'Text',
    inputReadonly: 'Input Readonly',
    inputDisabled: 'Input Disabled',
  },
});
</script>

<template>
  <demo-block :title="t('disabled')">
    <r-cell-group inset>
      <r-field
        :model-value="t('inputReadonly')"
        :label="t('text')"
        readonly
      />
      <r-field
        :model-value="t('inputDisabled')"
        :label="t('text')"
        disabled
      />
    </r-cell-group>
  </demo-block>
</template>
