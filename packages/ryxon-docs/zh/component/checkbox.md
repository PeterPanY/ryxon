---
title: Checkbox
lang: zh
---

# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

:::demo 通过 `v-model` 绑定复选框的勾选状态。

checkbox/basic

:::

## 禁用状态

:::demo 设置 `disabled` 属性即可。

checkbox/disabled

:::

## 自定义

:::demo

checkbox/custom

:::

## 多选框组

:::demo 复选框可以与复选框组一起使用，复选框组通过 `v-model` 数组绑定复选框的勾选状态。

checkbox/group

:::

## 中间状态

:::demo `indeterminate` 属性用以表示 `checkbox` 的不确定状态，一般用于实现全选的效果

checkbox/indeterminate

:::

## 可选项目数量的限制

:::demo 使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

checkbox/limit

:::

## 按钮样式

:::demo 按钮样式的多选组合。

checkbox/button

:::

## 带有边框

:::demo 设置 `border` 属性可以渲染为带有边框的多选框。

checkbox/border

:::

## API

### Checkbox Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否为选中状态 | `boolean` | `false` |
| name | 标识符，通常为一个唯一的字符串或数字 | `any` | - |
| size | Checkbox 的尺寸，可选`large、small` | `string` | - |
| type | Checkbox 的类型，可选`button` | `string` | - |
| border | 是否显示边框 | `boolean` | `false` |
| shape | 形状，可选值为 `square` | `string` | `round` |
| disabled | 是否禁用复选框 | `boolean` | `false` |
| label-disabled | 是否禁用复选框文本点击 | `boolean` | `false` |
| label-position | 文本位置，可选值为 `left` | `string` | `right` |
| icon-size | 图标大小，默认单位为 `px` | `number \| string` | `20px` |
| checked-color | 选中状态颜色 | `string` | `#1989fa` |
| bind-group | 是否与复选框组绑定 | `boolean` | `true` |

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 所有选中项的标识符 | `any[]` | - |
| size | Checkbox 的尺寸，可选`large、small` | `string` | - |
| disabled | 是否禁用所有复选框 | `boolean` | `false` |
| max | 最大可选数，`0` 为无限制 | `number \| string` | `0` |
| min | 最小可选数，`0` 为无限制 | `number \| string` | `0` |
| icon-size | 所有复选框的图标大小，默认单位为 `px` | `number \| string` | `20px` |
| checked-color | 所有复选框的选中状态颜色 | `string` | `#1989fa` |

### Checkbox Events

| 事件名 | 说明                     | 回调参数            |
| ------ | ------------------------ | ------------------- |
| change | 当绑定值变化时触发的事件 | `checked: boolean`  |
| click  | 点击复选框时触发         | `event: MouseEvent` |

### CheckboxGroup Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| change | 当绑定值变化时触发的事件 | `names: any[]` |

### Checkbox Slots

| 名称    | 说明       | 参数                                      |
| ------- | ---------- | ----------------------------------------- |
| default | 自定义文本 | -                                         |
| icon    | 自定义图标 | `{ checked: boolean, disabled: boolean }` |

### CheckboxGroup 方法

通过 ref 可以获取到 CheckboxGroup 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggleAll | 切换所有复选框，传 `true` 为选中，`false` 为取消选中，不传参为取反 | `options?: boolean \| object` | - |

### toggleAll 方法示例

```js
import { ref } from 'vue';
import type { CheckboxGroupInstance } from 'ryxon';

const checkboxGroupRef = ref<CheckboxGroupInstance>();

// 全部反选
checkboxGroupRef?.value.toggleAll();
// 全部选中
checkboxGroupRef?.value.toggleAll(true);
// 全部取消
checkboxGroupRef?.value.toggleAll(false);

// 全部反选，并跳过禁用的复选框
checkboxGroupRef?.value.toggleAll({
  skipDisabled: true,
});
// 全部选中，并跳过禁用的复选框
checkboxGroupRef?.value.toggleAll({
  checked: true,
  skipDisabled: true,
});
```

### Checkbox 方法

通过 ref 可以获取到 Checkbox 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggle | 切换选中状态，传 `true` 为选中，`false` 为取消选中，不传参为取反 | `checked?: boolean` | - |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  CheckboxProps,
  CheckboxShape,
  CheckboxInstance,
  CheckboxLabelPosition,
  CheckboxGroupProps,
  CheckboxGroupInstance,
  CheckboxGroupToggleAllOptions
} from 'ryxon'
```

`CheckboxInstance` 和 `CheckboxGroupInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { CheckboxInstance, CheckboxGroupInstance } from 'ryxon'

const checkboxRef = ref<CheckboxInstance>()
const checkboxGroupRef = ref<CheckboxGroupInstance>()

checkboxRef.value?.toggle()
checkboxGroupRef.value?.toggleAll()
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)

| 名称                                     | 默认值                   | 描述 |
| ---------------------------------------- | ------------------------ | ---- |
| --r-checkbox-size                        | `14px`                   | -    |
| --r-checkbox-border-color                | `var(--r-gray-5)`        | -    |
| --r-checkbox-duration                    | `var(--r-duration-fast)` | -    |
| --r-checkbox-label-margin                | `var(--r-padding-xs)`    | -    |
| --r-checkbox-label-color                 | `var(--r-text-color)`    | -    |
| --r-checkbox-checked-icon-color          | `var(--r-primary-color)` | -    |
| --r-checkbox-disabled-icon-color         | `var(--r-gray-5)`        | -    |
| --r-checkbox-disabled-label-color        | `var(--r-text-color-3)`  | -    |
| --r-checkbox-disabled-background         | `var(--r-border-color)`  | -    |
| --r-checkbox-button-checked-bg-color     | `var(--r-primary-color)` | -    |
| --r-checkbox-button-checked-text-color   | `var(--r-white)`         | -    |
| --r-checkbox-button-checked-border-color | `var(--r-primary-color)` | -    |
