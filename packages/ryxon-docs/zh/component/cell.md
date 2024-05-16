---
title: Cell
lang: zh
---

# Cell 单元格

单元格为列表中的单个展示项。

## 基础用法

:::demo `Cell` 可以单独使用，也可以与 `CellGroup` 搭配使用，`CellGroup` 可以为 `Cell` 提供上下外边框。

cell/basic

:::

## 卡片风格

:::demo 通过 `CellGroup` 的 `inset` 属性，可以将单元格转换为圆角卡片风格

cell/inset

:::

## 单元格大小

:::demo 通过 `size` 属性可以控制单元格的大小。

cell/size

:::

## 展示图标

:::demo 通过 `icon` 属性在标题左侧展示图标。

cell/icon

:::

## 页面导航

:::demo 可以通过 `url` 属性进行 URL 跳转，或通过 `to` 属性进行路由跳转。

cell/url

:::

## 分组标题

:::demo 通过 `CellGroup` 的 `title` 属性可以指定分组标题。

cell/title

:::

## 使用插槽

:::demo 如以上用法不能满足你的需求，可以使用插槽来自定义内容。

cell/solts

:::

## API

### CellGroup Props

| 参数   | 说明                   | 类型      | 默认值  |
| ------ | ---------------------- | --------- | ------- |
| title  | 分组标题               | `string`  | `-`     |
| inset  | 是否展示为圆角卡片风格 | `boolean` | `false` |
| border | 是否显示外边框         | `boolean` | `true`  |

### Cell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | `number \| string` | - |
| value | 右侧内容 | `number \| string` | - |
| label | 标题下方的描述信息 | `number \| string` | - |
| size | 单元格大小，可选值为 `large` | `string` | - |
| icon | 左侧图标名称或图片链接 | `string \| Component` | - |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 [class-prefix 属性](/zh/component/icon.html#api) | `string` | `r-icon` |
| tag | 根节点对应的 HTML 标签名 | `string` | `div` |
| url | 点击后跳转的链接地址 | `string` | - |
| to | 点击后跳转的目标路由对象，等同于 Vue Router 的 [to 属性](https://router.vuejs.org/zh/api/interfaces/RouterLinkProps.html#Properties-to) | `string \| object` | - |
| border | 是否显示内边框 | `boolean` | `true` |
| replace | 是否在跳转时替换当前页面历史 | `boolean` | `false` |
| clickable | 是否开启点击反馈 | `boolean` | `null` |
| is-link | 是否展示右侧箭头并开启点击反馈 | `boolean` | `false` |
| required | 是否显示表单必填星号 | `boolean` | `false` |
| center | 是否使内容垂直居中 | `boolean` | `false` |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | `string` | `right` |
| title-style | 左侧标题额外样式 | `string \| Array \| object` | - |
| title-class | 左侧标题额外类名 | `string \| Array \| object` | - |
| value-class | 右侧内容额外类名 | `string \| Array \| object` | - |
| label-class | 描述信息额外类名 | `string \| Array \| object` | - |

### Cell Events

| 事件名 | 说明             | 回调参数            |
| ------ | ---------------- | ------------------- |
| click  | 点击单元格时触发 | `event: MouseEvent` |

### CellGroup Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 默认插槽       |
| title   | 自定义分组标题 |

### Cell Slots

| 名称       | 说明                         |
| ---------- | ---------------------------- |
| title      | 自定义左侧标题               |
| value      | 自定义右侧内容               |
| label      | 自定义标题下方的描述信息     |
| icon       | 自定义左侧图标               |
| right-icon | 自定义右侧图标               |
| extra      | 自定义单元格最右侧的额外内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  CellSize,
  CellProps,
  CellGroupProps,
  CellArrowDirection
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-cell-font-size | `var(--r-font-size-md)` | - |
| --r-cell-line-height | `24px` | - |
| --r-cell-vertical-padding | `10px` | - |
| --r-cell-horizontal-padding | `var(--r-padding-md)` | - |
| --r-cell-text-color | `var(--r-text-color)` | - |
| --r-cell-background | `var(--r-background-2)` | - |
| --r-cell-border-color | `var(--r-border-color)` | - |
| --r-cell-active-color | `var(--r-active-color)` | - |
| --r-cell-required-color | `var(--r-danger-color)` | - |
| --r-cell-label-color | `var(--r-text-color-2)` | - |
| --r-cell-label-font-size | `var(--r-font-size-sm)` | - |
| --r-cell-label-line-height | `var(--r-line-height-sm)` | - |
| --r-cell-label-margin-top | `var(--r-padding-base)` | - |
| --r-cell-value-color | `var(--r-text-color-2)` | - |
| --r-cell-value-font-size | `inherit` | - |
| --r-cell-icon-size | `16px` | - |
| --r-cell-right-icon-color | `var(--r-info-color)` | - |
| --r-cell-large-vertical-padding | `var(--r-padding-sm)` | - |
| --r-cell-large-title-font-size | `var(--r-font-size-lg)` | - |
| --r-cell-large-label-font-size | `var(--r-font-size-md)` | - |
| --r-cell-large-value-font-size | `inherit` | - |
| --r-cell-group-background | `var(--r-background-2)` | - |
| --r-cell-group-title-color | `var(--r-text-color-2)` | - |
| --r-cell-group-title-padding | `var(--r-padding-md) var(--r-padding-md) var(--r-padding-xs)` | - |
| --r-cell-group-title-font-size | `var(--r-font-size-md)` | - |
| --r-cell-group-title-line-height | `16px` | - |
| --r-cell-group-inset-padding | `0 var(--r-padding-md)` | - |
| --r-cell-group-inset-radius | `var(--r-radius-lg)` | - |
| --r-cell-group-inset-title-padding | `var(--r-padding-md) var(--r-padding-md) var(--r-padding-xs) var(--r-padding-xl)` | - |
