---
title: Select
lang: zh
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

:::demo 适用广泛的基础单选 `v-model` 的值为当前被选中的 `r-option` 的 `value` 属性值

select/basic

:::

## 有禁用选项

:::demo 在 `r-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项

select/disabled-option

:::

## 禁用状态

:::demo 为 `r-select` 设置 `disabled` 属性，则整个选择器不可用。

select/disabled

:::

## 可清空单选

:::demo 为 `r-select` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

select/clearable

:::

## 基础多选

:::demo 为 `r-select` 设置 `multiple` 属性即可启用多选， 此时 v-model 的值为当前选中值所组成的数组。 默认情况下选中值会以 Tag 组件的形式展现， 你也可以设置 `collapse-tags` 属性将它们合并为一段文字。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

select/multiple

:::

## 自定义模板

:::demo 将自定义的 HTML 模板插入 `r-option` 的 slot 中即可

select/custom-template

:::

## 将选项进行分组

:::demo 使用 `r-option-group` 对备选项进行分组，它的 label 属性为分组名

select/grouping

:::

## 筛选选项

:::demo 为 `r-select` 添加 `filterable` 属性即可启用搜索功能。 默认情况下，Select 会找出所有 label 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

select/filterable

:::

## 远程搜索

:::demo 从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将 `filterable` 和 `remote` 设置为 `true`，同时传入一个 `remote-method`。 `remote-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `r-option` 是通过 `v-for` 指令渲染出来的，此时需要为 `r-option` 添加 `key` 属性， 且其值需具有唯一性，比如这个例子中的 `item.value`。

select/remote-search

:::

<!-- ## 创建新的选项

:::demo 通过使用 `allow-create` 属性，用户可以通过输入框创建新项目。 为了使 `allow-create` 正常工作， `filterable` 的值必须为 `true。` 本例还使用了 `default-first-option` 属性， 在该属性为 `true` 的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

select/allow-create

::: -->

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 滚动条高度 | `string / number` | `-` |
| max-height | 滚动条最大高度 | `string / number` | `-` |
| native | 是否使用原生滚动条样式 | `boolean` | `false` |
| wrap-style | 包裹容器的自定义样式 | `object` | `-` |
| wrap-class | 包裹容器的自定义类名 | `string` | `-` |
| view-style | 视图的自定义样式 | `string / object` | `-` |
| view-class | 视图的自定义类名 | `string` | `-` |
| noresize | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean` | `false` |
| tag | 视图的元素标签 | `string` | `div` |
| always | 滚动条总是显示 | `boolean` | `false` |
| min-size | 滚动条最小尺寸 | `number` | `20` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `scrollLeft: number, scrollTop: number` |

### Slots

| 名称    | 说明           | 参数 |
| ------- | -------------- | ---- |
| default | 自定义菜单内容 | -    |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 `ConfigProvider 组件`。

| 名称                         | 默认值                          | 描述 |
| ---------------------------- | ------------------------------- | ---- |
| --r-scrollbar-opacity        | `0.3`                           | -    |
| --r-scrollbar-bg-color       | `var(--r-text-color-secondary)` | -    |
| --r-scrollbar-hover-opacity  | ` 0.5`                          | -    |
| --r-scrollbar-hover-bg-color | `var(--r-text-color-secondary)` | -    |
