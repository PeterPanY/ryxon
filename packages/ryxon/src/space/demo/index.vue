<script setup>
import RSpace from '..';
import RButton from '../../button';
import RRadio from '../../radio';
import RRadioGroup from '../../radio-group';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    vertical: '垂直排列',
    customSize: '自定义间距',
    align: '对齐方式',
    wrap: '自动换行',
  },
  'en-US': {
    vertical: 'Vertical',
    customSize: 'Custom Size',
    align: 'Alignment',
    wrap: 'Auto Wrap',
  },
});

const align = ref('center');
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-space>
      <r-button type="primary">{{ t('button') }}</r-button>
      <r-button type="primary">{{ t('button') }}</r-button>
      <r-button type="primary">{{ t('button') }}</r-button>
      <r-button type="primary">{{ t('button') }}</r-button>
    </r-space>
  </demo-block>

  <demo-block :title="t('vertical')">
    <r-space direction="vertical" fill>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
    </r-space>
  </demo-block>

  <demo-block :title="t('customSize')">
    <r-space :size="20" style="margin-bottom: 16px">
      <r-button type="primary">{{ t('button') }}</r-button>
      <r-button type="primary">{{ t('button') }}</r-button>
      <r-button type="primary">{{ t('button') }}</r-button>
    </r-space>

    <r-space size="3rem">
      <r-button type="primary">{{ t('button') }}</r-button>
      <r-button type="primary">{{ t('button') }}</r-button>
      <r-button type="primary">{{ t('button') }}</r-button>
    </r-space>
  </demo-block>

  <demo-block :title="t('align')">
    <r-radio-group
      v-model="align"
      direction="horizontal"
      style="margin-bottom: 16px"
    >
      <r-radio name="start">start</r-radio>
      <r-radio name="center">center</r-radio>
      <r-radio name="end">end</r-radio>
      <r-radio name="baseline">baseline</r-radio>
    </r-radio-group>
    <r-space :align="align" style="padding: 16px; background: #f3f2f5">
      <r-button type="primary">{{ align }}</r-button>
      <div style="padding: 40px 20px; background: #fff">Block</div>
    </r-space>
  </demo-block>

  <demo-block :title="t('wrap')">
    <r-space wrap>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
      <r-button type="primary" block>{{ t('button') }}</r-button>
    </r-space>
  </demo-block>
</template>

<style lang="less">
.demo-space {
  background: var(--r-background-2);

  .r-doc-demo-block {
    padding: 0 var(--r-padding-md);
  }

  .r-doc-demo-block__title {
    padding-left: 0;
  }
}
</style>
