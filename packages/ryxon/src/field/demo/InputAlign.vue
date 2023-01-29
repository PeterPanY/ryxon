<script setup lang="ts">
import RField from '..';
import RCellGroup from '../../cell-group';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    text: '文本',
    inputAlign: '输入框内容对齐',
    alignPlaceHolder: '输入框内容右对齐',
  },
  'en-US': {
    text: 'Text',
    inputAlign: 'Input Align',
    alignPlaceHolder: 'Input Align Right',
  },
});

const value = ref('');
</script>

<template>
  <demo-block :title="t('inputAlign')">
    <r-cell-group inset>
      <r-field
        v-model="value"
        :label="t('text')"
        :placeholder="t('alignPlaceHolder')"
        input-align="right"
      />
    </r-cell-group>
  </demo-block>
</template>
