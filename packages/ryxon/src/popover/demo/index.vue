<script setup lang="ts">
import { ref } from 'vue';
import RPopover, { type PopoverPlacement } from '..';
import RButton from '../../button';
import RField from '../../field';
import RPopup from '../../popup';
import RPicker, {
  PickerConfirmEventParams,
  type PickerOption,
} from '../../picker';
import RGrid from '../../grid';
import RGridItem from '../../grid-item';
import { showToast } from '../../toast';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
    shortActions: [{ text: '选项一' }, { text: '选项二' }],
    actionsWithIcon: [
      { text: '选项一', icon: 'add-o' },
      { text: '选项二', icon: 'music-o' },
      { text: '选项三', icon: 'more-o' },
    ],
    actionsDisabled: [
      { text: '选项一', disabled: true },
      { text: '选项二', disabled: true },
      { text: '选项三' },
    ],
    showIcon: '展示图标',
    placement: '弹出位置',
    darkTheme: '深色风格',
    lightTheme: '浅色风格',
    showPopover: '点击弹出气泡',
    uncontrolled: '非受控模式',
    actionOptions: '选项配置',
    customContent: '自定义内容',
    disableAction: '禁用选项',
    choosePlacement: '选择弹出位置',
  },
  'en-US': {
    actions: [{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }],
    shortActions: [{ text: 'Option 1' }, { text: 'Option 2' }],
    actionsWithIcon: [
      { text: 'Option 1', icon: 'add-o' },
      { text: 'Option 2', icon: 'music-o' },
      { text: 'Option 3', icon: 'more-o' },
    ],
    actionsDisabled: [
      { text: 'Option 1', disabled: true },
      { text: 'Option 2', disabled: true },
      { text: 'Option 3' },
    ],
    showIcon: 'Show Icon',
    placement: 'Placement',
    darkTheme: 'Dark Theme',
    lightTheme: 'Light Theme',
    showPopover: 'Show Popover',
    uncontrolled: 'Uncontrolled',
    actionOptions: 'Action Options',
    customContent: 'Custom Content',
    disableAction: 'Disable Action',
    choosePlacement: 'Placement',
  },
});

const placements: PickerOption[] = [
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
].map((item) => ({ text: item, value: item }));

const show = ref({
  showIcon: false,
  placement: false,
  darkTheme: false,
  lightTheme: false,
  customContent: false,
  disableAction: false,
});
const showPicker = ref(false);
const currentPlacement = ref<PopoverPlacement>('top');

const onClickChoosePlacement = () => {
  showPicker.value = true;

  setTimeout(() => {
    show.value = {
      ...show.value,
      placement: true,
    };
  }, 300);
};

const onPickerChange = (option: PickerConfirmEventParams) => {
  setTimeout(() => {
    show.value.placement = true;
    currentPlacement.value = option.selectedValues[0] as PopoverPlacement;
  });
};

const onSelect = (action: { text: string }) => showToast(action.text);
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <r-popover
      v-model:show="show.lightTheme"
      :actions="t('actions')"
      placement="bottom-start"
      @select="onSelect"
    >
      <template #reference>
        <r-button type="primary">
          {{ t('lightTheme') }}
        </r-button>
      </template>
    </r-popover>

    <r-popover
      v-model:show="show.darkTheme"
      theme="dark"
      :actions="t('actions')"
      @select="onSelect"
    >
      <template #reference>
        <r-button type="primary">
          {{ t('darkTheme') }}
        </r-button>
      </template>
    </r-popover>
  </demo-block>

  <demo-block :title="t('placement')">
    <r-field
      is-link
      readonly
      name="picker"
      :label="t('choosePlacement')"
      @click="onClickChoosePlacement"
    />

    <r-popup
      v-model:show="showPicker"
      round
      position="bottom"
      teleport="body"
    >
      <div class="demo-popover-box">
        <r-popover
          v-model:show="show.placement"
          theme="dark"
          :actions="t('shortActions')"
          :placement="currentPlacement"
          @select="onSelect"
        >
          <template #reference>
            <div class="demo-popover-refer" />
          </template>
        </r-popover>
      </div>
      <r-picker
        :columns="placements"
        :show-toolbar="false"
        @change="onPickerChange"
      />
    </r-popup>
  </demo-block>

  <demo-block :title="t('actionOptions')">
    <r-popover
      v-model:show="show.showIcon"
      :actions="t('actionsWithIcon')"
      placement="bottom-start"
      @select="onSelect"
    >
      <template #reference>
        <r-button type="primary">
          {{ t('showIcon') }}
        </r-button>
      </template>
    </r-popover>

    <r-popover
      v-model:show="show.disableAction"
      :actions="t('actionsDisabled')"
      @select="onSelect"
    >
      <template #reference>
        <r-button type="primary">
          {{ t('disableAction') }}
        </r-button>
      </template>
    </r-popover>
  </demo-block>

  <demo-block :title="t('customContent')">
    <r-popover
      v-model:show="show.customContent"
      placement="top-start"
      @select="onSelect"
    >
      <r-grid
        square
        clickable
        :border="false"
        column-num="3"
        style="width: 240px"
      >
        <r-grid-item
          v-for="i in 6"
          :key="i"
          icon="photo-o"
          :text="t('option')"
          @click="show.customContent = false"
        />
      </r-grid>
      <template #reference>
        <r-button type="primary">
          {{ t('customContent') }}
        </r-button>
      </template>
    </r-popover>
  </demo-block>

  <demo-block :title="t('uncontrolled')">
    <r-popover
      :actions="t('actions')"
      placement="top-start"
      @select="onSelect"
    >
      <template #reference>
        <r-button type="primary">
          {{ t('uncontrolled') }}
        </r-button>
      </template>
    </r-popover>
  </demo-block>
</template>

<style lang="less">
.demo-popover {
  &-refer {
    width: 60px;
    height: 60px;
    background-color: var(--r-blue);
    border-radius: 8px;
  }

  .r-popover__wrapper {
    margin-left: var(--r-padding-md);
  }

  .r-field {
    width: auto;
    margin: 0 12px;
    overflow: hidden;
    border-radius: 8px;
  }

  &-box {
    display: flex;
    justify-content: center;
    margin: 110px 0;

    .r-popover__wrapper {
      margin-left: 0;
    }
  }
}
</style>
