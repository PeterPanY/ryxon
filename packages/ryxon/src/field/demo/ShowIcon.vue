<script setup lang="ts">
import RField from '..';
import RCellGroup from '../../cell-group';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    text: '文本',
    showIcon: '显示图标',
    showClearIcon: '显示清除图标',
  },
  'en-US': {
    text: 'Text',
    showIcon: 'Show Icon',
    showClearIcon: 'Show Clear Icon',
  },
});

const icon1 = ref('');
const icon2 = ref('123');
</script>

<template>
  <demo-block :title="t('showIcon')">
    <r-cell-group inset>
      <r-field
        v-model="icon1"
        :label="t('text')"
        left-icon="smile-o"
        right-icon="warning-o"
        :placeholder="t('showIcon')"
      />
      <r-field
        v-model="icon2"
        clearable
        :label="t('text')"
        left-icon="music-o"
        :placeholder="t('showClearIcon')"
      />
    </r-cell-group>
  </demo-block>
</template>
