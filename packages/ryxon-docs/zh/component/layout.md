---
title: Layout
lang: zh
---

# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

## 基础用法

:::demo 通过在 `Col` 上添加 `span` 属性设置列所占的宽度百分比。此外，添加 `offset` 属性可以设置列的偏移宽度，计算方式与 span 相同。

layout/basic

:::

## 分栏间隔

:::demo 通过 `gutter` 属性可以设置列元素之间的间距，默认间距为 0。

layout/gutter

:::

## 对齐方式

:::demo 通过 `justify` 属性可以设置主轴上内容的对齐方式，等价于 flex 布局中的 `justify-content` 属性。

layout/justify

:::

## 垂直间距

:::demo 如果需要设置垂直间距，可以使用数组形式设置 `[水平间距, 垂直间距]`。

layout/vertical

:::

## 响应式布局

:::demo 参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl

layout/sizes

:::

## API

### Row Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 列元素之间的间距（单位为 px） | `number \| string \| Array` | - |
| tag | 自定义元素标签 | `string` | `div` |
| justify | 主轴对齐方式，可选值为 `end` `center` `space-around` `space-between` | `string` | `start` |
| align | 交叉轴对齐方式，可选值为 `center` `bottom` | `string` | `top` |
| wrap | 是否自动换行 | `boolean` | `true` |

### Col Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列元素宽度 | `number \| string` | - |
| offset | 列元素偏移距离 | `number \| string` | - |
| push | 栅格向右移动格数 | `number \| string` | 0 |
| pull | 栅格向左移动格数 | `number \| string` | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | ^[number] / ^[object]`{span?: number \| string, offset?: number \| string, pull?: number \| string, push?: number \| string}` | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | ^[number] / ^[object]`{span?: number \| string, offset?: number \| string, pull?: number \| string, push?: number \| string}` | — |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | ^[number] / ^[object]`{span?: number \| string, offset?: number \| string, pull?: number \| string, push?: number \| string}` | — |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | ^[number] / ^[object]`{span?: number \| string, offset?: number \| string, pull?: number \| string, push?: number \| string}` | — |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | ^[number] / ^[object]`{span?: number \| string, offset?: number \| string, pull?: number \| string, push?: number \| string}` | — |
| tag | 自定义元素标签 | `string` | `div` |

### Row Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | `event: MouseEvent` |

### Col Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | `event: MouseEvent` |

### 类型定义

组件导出以下类型定义：

```ts
import type { ColProps, RowProps, RowAlign, RowJustify } from 'ryxon'
```
