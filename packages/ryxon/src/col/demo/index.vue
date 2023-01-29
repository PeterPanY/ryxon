<script setup lang="ts">
import RRow from '../../row';
import RCol from '..';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    title2: '在列元素之间增加间距',
    justify: '对齐方式',
  },
  'en-US': {
    title2: 'Column Spacing',
    justify: 'Justify Content',
  },
});
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-row>
      <r-col span="8">span: 8</r-col>
      <r-col span="8">span: 8</r-col>
      <r-col span="8">span: 8</r-col>
    </r-row>

    <r-row>
      <r-col span="4">span: 4</r-col>
      <r-col span="10" offset="4"> offset: 4, span: 10 </r-col>
    </r-row>

    <r-row>
      <r-col offset="12" span="12"> offset: 12, span: 12 </r-col>
    </r-row>
  </demo-block>

  <demo-block :title="t('title2')">
    <r-row gutter="20">
      <r-col span="8">span: 8</r-col>
      <r-col span="8">span: 8</r-col>
      <r-col span="8">span: 8</r-col>
    </r-row>
  </demo-block>

  <demo-block :title="t('justify')">
    <r-row justify="center">
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
    </r-row>

    <r-row justify="end">
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
    </r-row>

    <r-row justify="space-between">
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
    </r-row>

    <r-row justify="space-around">
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
      <r-col span="6">span: 6</r-col>
    </r-row>
  </demo-block>
</template>

<style lang="less">
.demo-col {
  .r-doc-demo-block {
    padding: 0 var(--r-padding-md);
  }

  .r-doc-demo-block__title {
    padding-left: 0;
  }

  .r-col {
    margin-bottom: 10px;
    color: var(--r-white);
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    background-clip: content-box;

    &:nth-child(odd) {
      background-color: #39a9ed;
    }

    &:nth-child(even) {
      background-color: #66c6f2;
    }
  }
}
</style>
