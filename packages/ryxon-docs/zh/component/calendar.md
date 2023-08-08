---
title: Calendar
lang: zh
---

# Calendar 日历

显示日期

## 显示某一天

:::demo 基本单位由 `type` 属性指定。 通过 `shortcuts` 配置快捷选项， 通过 `disabledDate` 函数，来设置禁用掉的日期。

calendar/basic

:::

## 其他日期单位显示

:::demo 通过扩展基础的日期选择，可以选择周、月、年或多个日期

calendar/other-measurements

:::

## 显示一段时间

:::demo 在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 `unlink-panels` 属性解除联动。

calendar/date-range

:::

## 显示月份范围

:::demo 在选择月份范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 `unlink-panels` 属性解除联动。

calendar/month-range

:::

## 默认显示值

:::demo 你也可以使用 `default-value` 来修改这个默认的日期。 请注意该值需要是一个可以解析的 `new Date()` 对象。如果类型是`daterange`, `default-value` 则会设置左边窗口的默认值。

calendar/default-value

:::

## 自定义内容

:::demo 日历的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据

calendar/custom-content

:::

## 显示日期时间

:::demo 通过设置 `type` 属性为 `datetime`，即可在同一个选择器里同时进行日期和时间的选择。

calendar/date-and-time

:::

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2 | `Date / number / string / Array` | `-` | `-` |
| type | 显示类型 | `string` | `year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange` | `date` |
| format | v-model 中数据的格式 | `string` | `时间格式` | `YYYY-MM-DD` |
| default-value | 可选，选择器打开时默认显示的时间 | `Date / [Date, Date]` | `-` | `-` |
| default-time | 范围选择时选中日期所使用的当日内具体时刻 | `Date / [Date, Date]` | `-` | `-` |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | `string` | `时间格式` | `-` |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | `boolean` | `-` | `false` |
| disabled-date | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值 | `function` | `-` | `-` |
| shortcuts | 设置快捷选项，需要传入数组对象 | `Array<{ text: string, value: Date / Function }>` | `-` | `-` |
| cell-class-name | 设置自定义类名 | `Function(Date)` | `-` | `-` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | `(val: typeof v-model)` |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 default-value 来设置成其他的日期 | `(val: [Date, Date])` |
| panel-change | 当日期面板改变时触发。 | `(date, mode, view)` |

### Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 自定义内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { calendarPcProps, DateCell } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-calendar-text-color | `var(--r-text-color-regular)` | - |
| --r-calendar-off-text-color | `var(--r-text-color-placeholder)` | - |
| --r-calendar-header-text-color | `var(--r-text-color-regular)` | - |
| --r-calendar-icon-color | `var(--r-text-color-primary)` | - |
| --r-calendar-border-color | `var(--r-disabled-border-color)` | - |
| --r-calendar-inner-border-color | `var(--r-border-color-light)` | - |
| --r-calendar-inrange-bg-color | `var(--r-border-color-extra-light)` | - |
| --r-calendar-inrange-hover-bg-color | `var(--r-border-color-extra-light)` | - |
| --r-calendar-active-color | `var(--r-primary-color)` | - |
| --r-calendar-hover-text-color | `var(--r-primary-color)` | - |
