---
title: Grid
lang: zh
---

# Grid 宫格

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

## 基础用法

:::demo 通过 `icon` 属性设置格子内的图标，`text` 属性设置文字内容。

grid/basic

:::

## 自定义列数

:::demo 默认一行展示四个格子，可以通过 `column-num` 自定义列数。

grid/column-num

:::

## 自定义内容

:::demo 通过插槽可以自定义格子展示的内容。

grid/custom

:::

## 正方形格子

:::demo 设置 `square` 属性后，格子的高度会和宽度保持一致。

grid/square

:::

## 格子间距

:::demo 通过 `gutter` 属性设置格子之间的距离。

grid/gutter

:::

## 内容横排

:::demo 将 `direction` 属性设置为 `horizontal`，可以让宫格的内容呈横向排列。

grid/direction

:::

## 页面导航

:::demo 通过 `to` 属性设置 Vue Router 跳转链接，通过 `url` 属性设置 URL 跳转链接。

grid/router

:::

## 徽章提示

:::demo 设置 `dot` 属性后，会在图标右上角展示一个小红点。设置 `badge` 属性后，会在图标右上角展示相应的徽标。

grid/badge

:::

## API

### Grid Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column-num | 列数 | `number \| string` | `4` |
| icon-size | 图标大小，默认单位为`px` | `number \| string` | `28px` |
| gutter | 格子之间的间距，默认单位为`px` | `number \| string` | `0` |
| border | 是否显示边框 | `boolean` | `true` |
| center | 是否将格子内容居中显示 | `boolean` | `true` |
| square | 是否将格子固定为正方形 | `boolean` | `false` |
| clickable | 是否开启格子点击反馈 | `boolean` | `false` |
| direction | 格子内容排列的方向，可选值为 `horizontal` | `string` | `vertical` |
| reverse | 是否调换图标和文本的位置 | `boolean` | `false` |

### GridItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文字 | `string` | - |
| icon | 图标名称或图片链接，等同于 Icon 组件的 [name 属性](/zh/component/icon.html#api) | `string` | - |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 [class-prefix 属性](/zh/component/icon.html#api) | `string` | `r-icon` |
| icon-color | 图标颜色，等同于 Icon 组件的 [color 属性](/zh/component/icon.html#api) | `string` | - |
| dot | 是否显示图标右上角小红点 | `boolean` | `false` |
| badge | 图标右上角徽标的内容 | `number \| string` | - |
| badge-props | 自定义徽标的属性，传入的对象会被透传给 [Badge 组件的 props](/zh/component/badge.html#api) | `BadgeProps` | - |
| url | 点击后跳转的链接地址 | `string` | - |
| to | 点击后跳转的目标路由对象，等同于 Vue Router 的 [to 属性](https://router.vuejs.org/zh/api/interfaces/RouterLinkProps.html#Properties-to) | `string \| object` | - |
| replace | 是否在跳转时替换当前页面历史 | `boolean` | `false` |

### GridItem Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击格子时触发 | `event: MouseEvent` |

### GridItem Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 自定义宫格的所有内容 |
| icon    | 自定义图标           |
| text    | 自定义文字           |

### 类型定义

组件导出以下类型定义：

```ts
import type { GridProps, GridDirection, GridItemProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-grid-item-content-padding | `var(--r-padding-md) var(--r-padding-xs)` | - |
| --r-grid-item-content-background | `var(--r-background-2)` | - |
| --r-grid-item-content-active-color | `var(--r-active-color)` | - |
| --r-grid-item-icon-size | `28px` | - |
| --r-grid-item-text-color | `var(--r-text-color)` | - |
| --r-grid-item-text-font-size | `var(--r-font-size-sm)` | - |
