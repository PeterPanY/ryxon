<script setup lang="ts">
import RCard from '..';
import RTag from '../../tag';
import RButton from '../../button';
import { cdnURL, useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    title: '商品名称',
    discountInfo: '营销信息',
    customContent: '自定义内容',
  },
  'en-US': {
    discountInfo: 'Discount Info',
    customContent: 'Custom Content',
  },
});

const imageURL = cdnURL('ipad.jpeg');
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-card
      num="2"
      price="2.00"
      :desc="t('desc')"
      :title="t('title')"
      :thumb="imageURL"
    />
  </demo-block>

  <demo-block :title="t('discountInfo')">
    <r-card
      num="2"
      price="2.00"
      origin-price="10.00"
      :tag="t('tag')"
      :desc="t('desc')"
      :title="t('title')"
      :thumb="imageURL"
    />
  </demo-block>

  <demo-block :title="t('customContent')">
    <r-card
      num="2"
      price="2.00"
      :desc="t('desc')"
      :title="t('title')"
      :thumb="imageURL"
    >
      <template #tags>
        <r-tag plain type="primary" style="margin-right: 5px">
          {{ t('tag') }}
        </r-tag>
        <r-tag plain type="primary">{{ t('tag') }}</r-tag>
      </template>

      <template #footer>
        <r-button round size="mini">
          {{ t('button') }}
        </r-button>
        <r-button round size="mini">
          {{ t('button') }}
        </r-button>
      </template>
    </r-card>
  </demo-block>
</template>

<style lang="less">
.demo-card {
  background-color: var(--r-background-2);
}
</style>
