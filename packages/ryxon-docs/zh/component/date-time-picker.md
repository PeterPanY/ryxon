---
title: DateTimePicker
lang: zh
---

# DateTimePicker 日期时间选择器

在同一个选择器里选择日期和时间

:::tip

日期时间选择器来自日期选择器和时间选择器的组合。 关于属性的详细解释，请参阅日期选择器和时间选择器。

:::

## 日期和时间点

:::demo 通过设置 `type` 属性为 `datetime`，即可在同一个选择器里同时进行日期和时间的选择。 快捷方式的使用方法与 `Date Picker` 相同。

date-time-picker/date-and-time

:::

## 日期时间格式

:::demo 使用 `format` 指定输入框的格式。 使用 `value-format` 指定绑定值的格式。

date-time-picker/date-and-time-formats

:::

## 日期和时间范围

:::demo 设置 `type` 为 `datetimerange` 即可选择日期和时间范围

date-time-picker/date-and-time-range

:::

## 默认的起始与结束时刻

:::demo 使用 `datetimerange` 进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的 `00:00:00` 作为起始与结束的时刻；通过选项 `default-time` 可以控制选中起始与结束日期时所使用的具体时刻。 我们可以使用 `default-time` 属性来控制它。 `default-time` 接受一个数组，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。 第一项控制开始日期的时间值，第二项控制结束日期的时间值。

date-time-picker/default-time

:::
