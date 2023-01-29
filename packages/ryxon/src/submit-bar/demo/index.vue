<script setup lang="ts">
import RSubmitBar from '..';
import RCheckbox from '../../checkbox';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';
import { showToast } from '../../toast';

const t = useTranslate({
  'zh-CN': {
    tip1: '你的收货地址不支持配送',
    tip2: '你的收货地址不支持配送, ',
    tip3: '修改地址',
    check: '全选',
    submit: '提交订单',
    clickLink: '修改地址',
    clickButton: '点击按钮',
  },
  'en-US': {
    tip1: 'Some tips',
    tip2: 'Some tips, ',
    tip3: 'Link',
    check: 'Label',
    submit: 'Submit',
    clickLink: 'Click Link',
    clickButton: 'Submit',
  },
});

const checked = ref(true);

const onSubmit = () => showToast(t('clickButton'));
const onClickLink = () => showToast(t('clickLink'));
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-submit-bar
      :price="3050"
      :button-text="t('submit')"
      @submit="onSubmit"
    />
  </demo-block>

  <demo-block :title="t('disabled')">
    <r-submit-bar
      disabled
      :price="3050"
      :button-text="t('submit')"
      :tip="t('tip1')"
      tip-icon="info-o"
      @submit="onSubmit"
    />
  </demo-block>

  <demo-block :title="t('loadingStatus')">
    <r-submit-bar
      loading
      :price="3050"
      :button-text="t('submit')"
      @submit="onSubmit"
    />
  </demo-block>

  <demo-block :title="t('advancedUsage')">
    <r-submit-bar :price="3050" :button-text="t('submit')" @submit="onSubmit">
      <r-checkbox v-model="checked">{{ t('check') }}</r-checkbox>
      <template #tip>
        {{ t('tip2') }}
        <span class="edit-address" @click="onClickLink">
          {{ t('tip3') }}
        </span>
      </template>
    </r-submit-bar>
  </demo-block>
</template>

<style lang="less">
.demo-submit-bar {
  .r-submit-bar {
    position: relative;
    padding-bottom: 0;
  }

  .edit-address {
    color: var(--r-blue);
  }

  .r-checkbox {
    margin-right: var(--r-padding-sm);
  }
}
</style>
