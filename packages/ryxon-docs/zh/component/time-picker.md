---
title: TimePicker
lang: zh
---

# TimePicker 时间选择

时间选择器，通常与弹出层组件配合使用。

## 任意时间点

:::demo 提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开 `arrow-control` 属性则通过界面上的箭头进行选择。

time-picker/basic

:::

## 限制时间选择范围

:::demo 通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。

time-picker/basic-range

:::

## 任意时间范围

:::demo 添加 `is-range` 属性即可选择时间范围。 同样支持 `arrow-control` 属性。

time-picker/range

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2 | ^[enum]`Date \| number \| string \| Array` | `-` | `-` |
| readonly | 完全只读 | `boolean` | `-` | `false` |
| disabled | 禁用 | `boolean` | `-` | `false` |
| editable | 文本框可输入 | `boolean` | `-` | `true` |
| clearable | 是否显示清除按钮 | `boolean` | `-` | `true` |
| size | 输入框尺寸 | `string` | ^[enum]`large \| default \| small` | `-` |
| placeholder | 非范围选择时的占位内容 | `string` | `-` | `-` |
| start-placeholder | 范围选择时开始日期的占位内容 | `string` | `-` | `-` |
| end-placeholder | 范围选择时结束日期的占位内容 | `string` | `-` | `-` |
| is-range | 是否为时间范围选择 | `boolean` | `-` | `false` |
| arrow-control | 是否使用箭头进行时间选择 | `boolean` | `-` | `false` |
| popper-class | TimePicker 下拉框的类名 | `string` | `-` | `-` |
| range-separator | 选择范围时的分隔符 | `string` | `-` | `-` |
| format | 显示在输入框中的格式 | `string` | `-` | `HH:mm:ss` |
| default-value | 可选，选择器打开时默认显示的时间 | `Date / [Date, Date]` | `-` | `-` |
| id | 等价于原生 input id 属性 | `string / [string, string]` | `-` | `-` |
| name | 等价于原生 input name 属性 | `string` | `-` | `-` |
| prefix-icon | 自定义前缀图标 | `string / Component` | `-` | `Clock` |
| clear-icon | 自定义清除图标 | `string / Component` | `-` | `CircleClose` |
| disabled-hours | 禁止选择部分小时选项 | `function` | `-` | `-` |
| disabled-minutes | 禁止选择部分分钟选项 | `Function(selectedHour)` | `-` | `-` |
| disabled-seconds | 禁止选择部分秒选项 | `Function(selectedHour, selectedMinute)` | `-` | `-` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 to 属性 | `string / Element` | `-` | `body` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | `(val: typeof v-model)` |
| blur | 在组件 Input 失去焦点时触发 | `(e: FocusEvent)` |
| focus | 在组件 Input 获得焦点时触发 | `(e: FocusEvent)` |
| visible-change | 当 TimePicker 的下拉列表出现/消失时触发 | `(visibility: boolean)` |

### Functicon

| 方法名      | 说明               | 参数 |
| ----------- | ------------------ | ---- |
| focus       | 使 input 获取焦点  | `-`  |
| blur        | 使 input 失去焦点  | `-`  |
| handleOpen  | 打开时间选择器弹窗 | `-`  |
| handleClose | 关闭时间选择器弹窗 | `-`  |

### 类型定义

组件导出以下类型定义：

```ts
import type { TimePickerPcThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                                | 默认值                        | 描述 |
| ----------------------------------- | ----------------------------- | ---- |
| --r-date-editor-width               | `220px`                       | -    |
| --r-date-editor-monthrange-width    | `300px`                       | -    |
| --r-date-editor-daterange-width     | `350px`                       | -    |
| --r-date-editor-datetimerange-width | `400px`                       | -    |
| --r-input-border-color              | `var(--r-border-color)`       | -    |
| --r-input-hover-border-color        | `var(--r-border-color-hover)` | -    |
| --r-input-focus-border-color        | `var(--r-primary-color)`      | -    |
