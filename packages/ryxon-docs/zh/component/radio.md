---
title: Radio
lang: zh
---

# Radio 单选框

在一组备选项中进行单选。

## 基础用法

:::demo 通过 v-model 绑定值当前选中项的 name。

radio/basic

:::

## 禁用状态

:::demo `disabled` 属性可以用来控制单选框的禁用状态。

radio/disabled

:::

## 自定义

:::demo

radio/custom

:::

## 按钮样式

:::demo 让单选框看起来像一个按钮一样

radio/button

:::

## 带有边框

:::demo 设置 `border` 属性可以渲染为带有边框的多选框。

radio/border

:::

## API

### Radio Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否为选中状态 | `boolean` | `false` |
| name | 标识符，通常为一个唯一的字符串或数字 | `any` | - |
| size | Radio 的尺寸，可选`large、small` | `string` | - |
| type | Radio 的类型，可选`button` | `string` | - |
| border | 是否显示边框 | `boolean` | `false` |
| shape | 形状，可选值为 `square` | `string` | `round` |
| check-shape | 选中形状，可选值为 `check` | `string` | `dot` |
| disabled | 是否禁用复选框 | `boolean` | `false` |
| label-disabled | 是否禁用复选框文本点击 | `boolean` | `false` |
| label-position | 文本位置，可选值为 `left` | `string` | `right` |
| icon-size | 图标大小，默认单位为 `px` | `number \| string` | `20px` |
| checked-color | 选中状态颜色 | `string` | `#1989fa` |
| bind-group | 是否与复选框组绑定 | `boolean` | `true` |

### RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 所有选中项的标识符 | `any[]` | - |
| size | Radio 的尺寸，可选`large、small` | `string` | - |
| disabled | 是否禁用所有复选框 | `boolean` | `false` |
| icon-size | 所有复选框的图标大小，默认单位为 `px` | `number \| string` | `20px` |
| checked-color | 所有复选框的选中状态颜色 | `string` | `#1989fa` |

### Radio Events

| 事件名 | 说明                     | 回调参数           |
| ------ | ------------------------ | ------------------ |
| change | 当绑定值变化时触发的事件 | `checked: boolean` |

### RadioGroup Events

| 事件名 | 说明                     | 回调参数       |
| ------ | ------------------------ | -------------- |
| change | 当绑定值变化时触发的事件 | `names: any[]` |

### Radio Slots

| 名称    | 说明       | 参数                                      |
| ------- | ---------- | ----------------------------------------- |
| default | 自定义文本 | -                                         |
| icon    | 自定义图标 | `{ checked: boolean, disabled: boolean }` |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  RadioProps,
  RadioShape,
  RadioGroupProps,
  RadioLabelPosition
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                                  | 默认值                   | 描述 |
| ------------------------------------- | ------------------------ | ---- |
| --r-radio-size                        | `14px`                   | -    |
| --r-radio-border-color                | `var(--r-gray-5)`        | -    |
| --r-radio-duration                    | `var(--r-duration-fast)` | -    |
| --r-radio-label-margin                | `var(--r-padding-xs)`    | -    |
| --r-radio-label-color                 | `var(--r-text-color)`    | -    |
| --r-radio-checked-icon-color          | `var(--r-primary-color)` | -    |
| --r-radio-disabled-icon-color         | `var(--r-gray-5)`        | -    |
| --r-radio-disabled-label-color        | `var(--r-text-color-3)`  | -    |
| --r-radio-disabled-background         | `var(--r-border-color)`  | -    |
| --r-radio-button-checked-bg-color     | `var(--r-primary-color)` | -    |
| --r-radio-button-checked-text-color   | `var(--r-white)`         | -    |
| --r-radio-button-checked-border-color | `var(--r-primary-color)` | -    |
