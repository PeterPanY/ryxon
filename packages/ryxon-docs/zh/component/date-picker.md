---
title: DatePicker
lang: zh
---

# DatePicker 日期选择器

用于选择或输入日期

## 选择某一天

:::demo 基本单位由 `type` 属性指定。 通过 `shortcuts` 配置快捷选项， 通过 `disabledDate` 函数，来设置禁用掉的日期。

date-picker/basic

:::

## 其他日期单位

:::demo 通过扩展基础的日期选择，可以选择周、月、年或多个日期

date-picker/other-measurements

:::

## 选择一段时间

:::demo 在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 `unlink-panels` 属性解除联动。

date-picker/date-range

:::

## 选择月份范围

:::demo 在选择月份范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 `unlink-panels` 属性解除联动。

date-picker/month-range

:::

## 默认值

日期选择器会在用户未选择任何日期的时候默认展示当天的日期。 你也可以使用 `default-value` 来修改这个默认的日期。 请注意该值需要是一个可以解析的 `new Date()` 对象。

如果类型是 `daterange`, ` default-value` 则会设置左边窗口的默认值。

:::demo

date-picker/default-value

:::

## 日期格式

使用 `format` 指定输入框的格式。 使用 `value-format` 指定绑定值的格式。

默认情况下，组件接受并返回 Date 对象。

:::tip

请一定要注意传入参数的大小写是否正确

:::

:::demo

date-picker/date-formats

:::

## 默认显示日期

:::demo 默认情况下，开始日期和结束日期的时间部分都是选择日期当日的 `00:00:00`。 通过 `default-time` 可以分别指定开始日期和结束日期的具体时刻。 它接受最多两个日期对象的数组。 其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。

date-picker/default-time

:::

## 设置自定义前缀的内容

:::demo 当你从其他 vue 组件或由渲染函数生成的组件中导入组件时, 你可以设置 prefix-icon 属性来定制前缀内容

date-picker/custom-prefix-icon

:::

## 自定义内容

:::demo 弹出框的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据

date-picker/custom-content

:::

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2 | `Date / number / string / Array` | `-` | `-` |
| readonly | 只读 | `boolean` | `-` | `false` |
| disabled | 禁用 | `boolean` | `-` | `false` |
| size | 输入框尺寸 | `string` | `large/default/small` | `default` |
| editable | 文本框可输入 | `boolean` | `-` | `true` |
| clearable | 是否显示清除按钮 | `boolean` | `-` | `true` |
| placeholder | 非范围选择时的占位内容 | `string` | `-` | `-` |
| start-placeholder | 范围选择时开始日期的占位内容 | `string` | `-` | `-` |
| end-placeholder | 范围选择时结束日期的占位内容 | `string` | `-` | `-` |
| type | 显示类型 | `string` | `year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange` | `date` |
| format | 显示在输入框中的格式 | `string` | `时间格式` | `YYYY-MM-DD` |
| popper-class | DatePicker 下拉框的类 | `string` | `-` | `-` |
| range-separator | 选择范围时的分隔符 | `string` | `-` | `-` |
| default-value | 可选，选择器打开时默认显示的时间 | `Date / [Date, Date]` | `-` | `-` |
| default-time | 范围选择时选中日期所使用的当日内具体时刻 | `Date / [Date, Date]` | `-` | `-` |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | `string` | `时间格式` | `-` |
| id | 等价于原生 id 属性 | `string / [string, string]` | `-` | `-` |
| name | 等价于原生 name 属性 | `string` | `-` | `-` |
| isSingle | 在范围选择器是否值显示一个日历，优先级高于 unlink-panels | `boolean` | `-` | `false` |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | `boolean` | `-` | `false` |
| prefix-icon | 自定义前缀图标 | `string / Component` | `-` | `Date` |
| clear-icon | 自定义清除图标 | `string / Component` | `-` | `CircleClose` |
| disabled-date | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值 | `function` | `-` | `-` |
| shortcuts | 设置快捷选项，需要传入数组对象 | `Array<{ text: string, value: Date / Function }>` | `-` | `-` |
| cell-class-name | 设置自定义类名 | `Function(Date)` | `-` | `-` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string` | `-` | `body` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | `(val: typeof v-model)` |
| blur | 在组件 Input 失去焦点时触发 | `(e: FocusEvent)` |
| focus | 在组件 Input 获得焦点时触发 | `(e: FocusEvent)` |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 default-value 来设置成其他的日期 | `(val: [Date, Date])` |
| panel-change | 当日期面板改变时触发。 | `(date, mode, view)` |
| visible-change | 当 DatePicker 的下拉列表出现/消失时触发 | `(visibility: boolean)` |

### 方法

通过 ref 可以获取到 `DatePicker` 实例并调用实例方法，详见`组件实例方法`。

| 方法名      | 说明               | 参数 |
| ----------- | ------------------ | ---- |
| focus       | 使 input 获取焦点  | -    |
| handleOpen  | 打开日期选择器弹窗 | -    |
| handleClose | 关闭日期选择器弹窗 | -    |

### Slots

| 插槽名          | 说明                 |
| --------------- | -------------------- |
| default         | 自定义内容           |
| range-separator | 自定义范围分割符内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { DatePickerPcProps } from 'ryxon'
```
