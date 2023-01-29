<script setup lang="ts">
import RIcon from '../../icon';
import RLoading from '..';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    type: '加载类型',
    text: '加载文案',
    size: '自定义大小',
    color: '自定义颜色',
    vertical: '垂直排列',
    textColor: '自定义文本颜色',
    customIcon: '自定义图标',
  },
  'en-US': {
    type: 'Type',
    text: 'Text',
    size: 'Size',
    color: 'Color',
    vertical: 'Vertical',
    textColor: 'Text Color',
    customIcon: 'Custom Icon',
  },
});
</script>

<template>
  <demo-block :title="t('type')">
    <r-loading />
    <r-loading type="spinner" />
  </demo-block>

  <demo-block :title="t('color')">
    <r-loading color="#1989fa" />
    <r-loading type="spinner" color="#1989fa" />
  </demo-block>

  <demo-block :title="t('size')">
    <r-loading size="24" />
    <r-loading type="spinner" size="24" />
  </demo-block>

  <demo-block :title="t('text')">
    <r-loading size="24px">
      {{ t('loading') }}
    </r-loading>
  </demo-block>

  <demo-block :title="t('vertical')">
    <r-loading size="24px" vertical>
      {{ t('loading') }}
    </r-loading>
  </demo-block>

  <demo-block :title="t('textColor')">
    <r-loading size="24px" vertical color="#0094ff">
      {{ t('loading') }}
    </r-loading>
    <r-loading size="24px" vertical text-color="#0094ff">
      {{ t('loading') }}
    </r-loading>
  </demo-block>

  <demo-block :title="t('customIcon')">
    <r-loading vertical>
      <template #icon>
        <r-icon name="star-o" size="30" />
      </template>
      {{ t('loading') }}
    </r-loading>
  </demo-block>
</template>

<style lang="less">
.demo-loading {
  .r-loading {
    display: inline-block;
    margin: 5px 0 5px 20px;

    &--vertical {
      display: inline-flex;
    }
  }
}
</style>
