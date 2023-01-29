<script setup lang="ts">
import RSteps from '..';
import RStep from '../../step';
import RButton from '../../button';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    nextStep: '下一步',
    step1: '买家下单',
    step2: '商家接单',
    step3: '买家提货',
    step4: '交易完成',
    title2: '描述信息',
    title3: '竖向步骤条',
    status1: '【城市】物流状态1',
    status2: '【城市】物流状态',
    status3: '快件已发货',
    customStyle: '自定义样式',
  },
  'en-US': {
    nextStep: 'Next Step',
    step1: 'Step1',
    step2: 'Step2',
    step3: 'Step3',
    step4: 'Step4',
    title2: 'Description',
    title3: 'Vertical Steps',
    status1: '【City】Status1',
    status2: '【City】Status2',
    status3: '【City】Status3',
    customStyle: 'Custom Style',
  },
});

const active = ref(1);

const nextStep = () => {
  active.value = ++active.value % 4;
};
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-steps :active="active">
      <r-step>{{ t('step1') }}</r-step>
      <r-step>{{ t('step2') }}</r-step>
      <r-step>{{ t('step3') }}</r-step>
      <r-step>{{ t('step4') }}</r-step>
    </r-steps>

    <r-button @click="nextStep">{{ t('nextStep') }}</r-button>
  </demo-block>

  <demo-block :title="t('customStyle')">
    <r-steps
      :active="active"
      active-icon="success"
      inactive-icon="arrow"
      active-color="#07c160"
    >
      <r-step>{{ t('step1') }}</r-step>
      <r-step>{{ t('step2') }}</r-step>
      <r-step>{{ t('step3') }}</r-step>
      <r-step>{{ t('step4') }}</r-step>
    </r-steps>
  </demo-block>

  <demo-block :title="t('title3')">
    <r-steps :active="0" direction="vertical">
      <r-step>
        <h3>{{ t('status1') }}</h3>
        <p>2016-07-12 12:40</p>
      </r-step>
      <r-step>
        <h3>{{ t('status2') }}</h3>
        <p>2016-07-11 10:00</p>
      </r-step>
      <r-step>
        <h3>{{ t('status3') }}</h3>
        <p>2016-07-10 09:30</p>
      </r-step>
    </r-steps>
  </demo-block>
</template>

<style lang="less">
.demo-steps {
  .r-button {
    margin: var(--r-padding-md) 0 0 var(--r-padding-md);
  }

  p,
  h3 {
    font-weight: normal;
    font-size: inherit;
  }
}
</style>
