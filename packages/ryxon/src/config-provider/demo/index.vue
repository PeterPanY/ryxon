<script setup lang="ts">
import { ref, computed } from 'vue';
import RCell from '../../cell';
import RForm from '../../form';
import RField from '../../field';
import RRate from '../../rate';
import RSwitch from '../../switch';
import RSlider from '../../slider';
import RButton from '../../button';
import RConfigProvider from '..';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    rate: '评分',
    slider: '滑块',
    switch: '开关',
    submit: '提交',
    customTheme: '定制主题',
    defaultTheme: '默认主题',
    darkMode: '深色模式',
    switchDarkMode: '切换深色模式',
  },
  'en-US': {
    rate: 'Rate',
    slider: 'Slider',
    switch: 'Switch',
    submit: 'Submit',
    customTheme: 'Custom Theme',
    defaultTheme: 'DefaultTheme',
    darkMode: 'Dark Mode',
    switchDarkMode: 'Switch Dark Mode',
  },
});

const darkMode = ref(false);
const theme = computed(() => (darkMode.value ? 'dark' : 'light'));
const rate = ref(4);
const slider = ref(50);
const themeVars = {
  rateIconFullColor: '#07c160',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackground: '#07c160',
  buttonPrimaryBackground: '#07c160',
  buttonPrimaryBorderColor: '#07c160',
};
</script>

<template>
  <div :style="{ background: darkMode ? 'black' : '', minHeight: '100vh' }">
    <demo-block :title="t('darkMode')">
      <r-cell center :title="t('switchDarkMode')">
        <template #right-icon>
          <r-switch v-model="darkMode" />
        </template>
      </r-cell>
    </demo-block>

    <demo-block :title="t('defaultTheme')">
      <r-config-provider :theme="theme">
        <r-form>
          <r-field name="rate" :label="t('rate')">
            <template #input>
              <r-rate v-model="rate" />
            </template>
          </r-field>

          <r-field name="slider" :label="t('slider')">
            <template #input>
              <r-slider v-model="slider" />
            </template>
          </r-field>

          <div style="margin: 16px">
            <r-button round block type="primary" native-type="submit">
              {{ t('submit') }}
            </r-button>
          </div>
        </r-form>
      </r-config-provider>
    </demo-block>

    <demo-block :title="t('customTheme')">
      <r-config-provider :theme="theme" :theme-vars="themeVars">
        <r-form>
          <r-field name="rate" :label="t('rate')">
            <template #input>
              <r-rate v-model="rate" />
            </template>
          </r-field>

          <r-field name="slider" :label="t('slider')">
            <template #input>
              <r-slider v-model="slider" />
            </template>
          </r-field>

          <div style="margin: 16px">
            <r-button round block type="primary" native-type="submit">
              {{ t('submit') }}
            </r-button>
          </div>
        </r-form>
      </r-config-provider>
    </demo-block>
  </div>
</template>

<style lang="less">
.demo-collapse {
  .r-icon-question-o {
    margin-left: 5px;
    color: var(--r-blue);
    font-size: 15px;
    vertical-align: -3px;
  }
}
</style>
