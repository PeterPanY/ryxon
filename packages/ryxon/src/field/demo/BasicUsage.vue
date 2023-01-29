<script setup lang="ts">
import RField from '..';
import RCellGroup from '../../cell-group';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    label: '文本',
    placeholder: '请输入文本',
  },
  'en-US': {
    label: 'Label',
    placeholder: 'Text',
  },
});

const value = ref('');
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-cell-group inset>
      <r-field
        v-model="value"
        :label="t('label')"
        :placeholder="t('placeholder')"
      />
    </r-cell-group>
  </demo-block>
</template>
