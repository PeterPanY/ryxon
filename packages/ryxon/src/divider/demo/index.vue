<script setup lang="ts">
import RDivider from '..';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    text: '文本',
    dashed: '虚线',
    withText: '展示文本',
    contentPosition: '内容位置',
    customStyle: '自定义样式',
  },
  'en-US': {
    text: 'Text',
    dashed: 'Dashed',
    withText: 'With Text',
    contentPosition: 'Content Position',
    customStyle: 'Custom Style',
  },
});
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-divider />
  </demo-block>

  <demo-block :title="t('withText')">
    <r-divider>
      {{ t('text') }}
    </r-divider>
  </demo-block>

  <demo-block :title="t('contentPosition')">
    <r-divider content-position="left">
      {{ t('text') }}
    </r-divider>

    <r-divider content-position="right">
      {{ t('text') }}
    </r-divider>
  </demo-block>

  <demo-block :title="t('dashed')">
    <r-divider dashed :hairline="false">
      {{ t('text') }}
    </r-divider>
  </demo-block>

  <demo-block :title="t('customStyle')">
    <r-divider
      :style="{ borderColor: '#1989fa', color: '#1989fa', padding: '0 16px' }"
    >
      {{ t('text') }}
    </r-divider>
  </demo-block>
</template>

<style lang="less">
.demo-divider {
  background-color: var(--r-background-2);

  .r-doc-demo-block__title {
    padding-top: var(--r-padding-md);
  }
}
</style>
