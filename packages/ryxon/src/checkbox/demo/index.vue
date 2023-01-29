<script setup lang="ts">
import RCheckbox from '..';
import RCheckboxGroup from '../../checkbox-group';
import RButton from '../../button';
import RCellGroup from '../../cell-group';
import RCell from '../../cell';
import { ref, reactive } from 'vue';
import { cdnURL, useTranslate } from '../../../docs/site';
import { useRefs } from '../../composables/use-refs';
import type { CheckboxInstance } from '../types';
import type { CheckboxGroupInstance } from '../../checkbox-group';

const t = useTranslate({
  'zh-CN': {
    checkbox: '复选框',
    customIcon: '自定义图标',
    customIconSize: '自定义大小',
    customColor: '自定义颜色',
    customShape: '自定义形状',
    title3: '复选框组',
    title4: '限制最大可选数',
    title5: '搭配单元格组件使用',
    toggleAll: '全选与反选',
    checkAll: '全选',
    inverse: '反选',
    horizontal: '水平排列',
    disableLabel: '禁用文本点击',
  },
  'en-US': {
    checkbox: 'Checkbox',
    customIcon: 'Custom Icon',
    customIconSize: 'Custom Icon Size',
    customColor: 'Custom Color',
    customShape: 'Custom Shape',
    title3: 'Checkbox Group',
    title4: 'Maximum amount of checked options',
    title5: 'Inside a Cell',
    toggleAll: 'Toggle All',
    checkAll: 'Check All',
    inverse: 'Inverse',
    horizontal: 'Horizontal',
    disableLabel: 'Disable label click',
  },
});

const state = reactive({
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
  checkboxShape: true,
  checkboxLabel: true,
  checkboxIcon: true,
  list: ['a', 'b'],
  result: ['a', 'b'],
  result2: [],
  result3: [],
  checkAllResult: [],
  horizontalResult: [],
});

const activeIcon = cdnURL('user-active.png');
const inactiveIcon = cdnURL('user-inactive.png');

const group = ref<CheckboxGroupInstance>();
const [refs, setRefs] = useRefs<CheckboxInstance>();

const toggle = (index: number) => {
  refs.value[index].toggle();
};

const checkAll = () => {
  group.value?.toggleAll(true);
};

const toggleAll = () => {
  group.value?.toggleAll();
};
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-checkbox v-model="state.checkbox1">{{ t('checkbox') }}</r-checkbox>
  </demo-block>

  <demo-block :title="t('disabled')">
    <r-checkbox :model-value="false" disabled>
      {{ t('checkbox') }}
    </r-checkbox>
    <r-checkbox :model-value="true" disabled>
      {{ t('checkbox') }}
    </r-checkbox>
  </demo-block>

  <demo-block :title="t('customShape')">
    <r-checkbox v-model="state.checkboxShape" shape="square">
      {{ t('customShape') }}
    </r-checkbox>
  </demo-block>

  <demo-block :title="t('customColor')">
    <r-checkbox v-model="state.checkbox2" checked-color="#ee0a24">
      {{ t('customColor') }}
    </r-checkbox>
  </demo-block>

  <demo-block :title="t('customIconSize')">
    <r-checkbox v-model="state.checkboxIcon" icon-size="24px">
      {{ t('customIconSize') }}
    </r-checkbox>
  </demo-block>

  <demo-block :title="t('customIcon')">
    <r-checkbox v-model="state.checkbox3">
      {{ t('customIcon') }}
      <template #icon="{ checked }">
        <img :src="checked ? activeIcon : inactiveIcon" />
      </template>
    </r-checkbox>
  </demo-block>

  <demo-block :title="t('disableLabel')">
    <r-checkbox v-model="state.checkboxLabel" label-disabled>
      {{ t('checkbox') }}
    </r-checkbox>
  </demo-block>

  <demo-block :title="t('title3')">
    <r-checkbox-group v-model="state.result">
      <r-checkbox name="a">{{ t('checkbox') }} a</r-checkbox>
      <r-checkbox name="b">{{ t('checkbox') }} b</r-checkbox>
    </r-checkbox-group>
  </demo-block>

  <demo-block :title="t('horizontal')">
    <r-checkbox-group v-model="state.horizontalResult" direction="horizontal">
      <r-checkbox name="a">{{ t('checkbox') }} a</r-checkbox>
      <r-checkbox name="b">{{ t('checkbox') }} b</r-checkbox>
    </r-checkbox-group>
  </demo-block>

  <demo-block :title="t('title4')">
    <r-checkbox-group v-model="state.result2" :max="2">
      <r-checkbox name="a">{{ t('checkbox') }} a</r-checkbox>
      <r-checkbox name="b">{{ t('checkbox') }} b</r-checkbox>
      <r-checkbox name="c">{{ t('checkbox') }} c</r-checkbox>
    </r-checkbox-group>
  </demo-block>

  <demo-block :title="t('toggleAll')">
    <r-checkbox-group v-model="state.checkAllResult" ref="group">
      <r-checkbox name="a">{{ t('checkbox') }} a</r-checkbox>
      <r-checkbox name="b">{{ t('checkbox') }} b</r-checkbox>
      <r-checkbox name="c">{{ t('checkbox') }} c</r-checkbox>
    </r-checkbox-group>

    <div class="demo-checkbox-buttons">
      <r-button type="primary" @click="checkAll">
        {{ t('checkAll') }}
      </r-button>
      <r-button type="primary" @click="toggleAll">
        {{ t('inverse') }}
      </r-button>
    </div>
  </demo-block>

  <demo-block :title="t('title5')">
    <r-checkbox-group v-model="state.result3">
      <r-cell-group inset>
        <r-cell
          v-for="(item, index) in state.list"
          clickable
          :key="index"
          :title="`${t('checkbox')} ${item}`"
          @click="toggle(index)"
        >
          <template #right-icon>
            <r-checkbox :ref="setRefs(index)" :name="item" @click.stop />
          </template>
        </r-cell>
      </r-cell-group>
    </r-checkbox-group>
  </demo-block>
</template>

<style lang="less">
.demo-checkbox {
  .r-checkbox {
    margin: 0 0 8px 20px;
  }

  .r-cell {
    .r-checkbox {
      margin: 0;
    }
  }

  img {
    height: 20px;
  }

  &-buttons {
    margin-top: var(--r-padding-md);

    .r-button {
      margin-left: var(--r-padding-md);
    }
  }

  .r-doc-demo-block__title {
    margin-top: -8px;
  }
}
</style>
