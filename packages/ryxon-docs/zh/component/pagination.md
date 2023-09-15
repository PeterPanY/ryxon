---
title: Pagination
lang: zh
---

# Pagination 分页

数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。

## 基础用法

:::demo 通过 `v-model` 来绑定当前页码。

pagination/basic

:::

## 简单模式

:::demo 将 `mode` 设置为 `simple` 来切换到简单模式，此时分页器不会展示具体的页码按钮。

pagination/simple

:::

## 显示省略号

:::demo 设置 `force-ellipses` 后会展示省略号按钮，点击后可以快速跳转。

pagination/ellipses

:::

## 自定义按钮

:::demo 通过 `prev-text`、`next-text` 等插槽来自定义分页按钮的内容。

pagination/custom

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 当前页码 | `number` | - |
| mode | 显示模式，可选值为 `simple` | `string` | `multi` |
| prev-text | 上一页按钮文字 | `string` | `上一页` |
| prev-icon | 上一页的图标， 比 prev-text 优先级更高 | `string / Component` | `-` |
| next-text | 下一页按钮文字 | `string` | `下一页` |
| next-icon | 下一页的图标， 比 next-text 优先级更高 | `string / Component` | `-` |
| page-count | 总页数 | `number \| string` | 根据页数计算 |
| total-items | 总记录数 | `number \| string` | `0` |
| items-per-page/ v-model:items-per-page | 每页记录数 | `number \| string` | `10` |
| placement | 下拉框出现的位置 | `string` | `top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end` | `bottom` |
| show-page-size | 显示的页码个数 | `number \| string` | `5` |
| force-ellipses | 是否显示省略号 | `boolean` | `false` |
| show-prev-button | 是否展示上一页按钮 | _boolean_ | `true` |
| show-next-button | 是否展示下一页按钮 | _boolean_ | `true` |
| page-sizes | 每页显示个数选择器的选项设置 | ^[array]`number[]` | `[10, 20, 30, 40, 50, 100]` |
| popperClass | 每页显示个数选择器的下拉框类名 | `string` | - |
| layout | 组件布局，子组件名用逗号分隔 | ^[string]`string (consists of sizes, prev, pager, next, total, jumper)` | `prev, pager, next` |

### Events

| 事件名      | 说明                        | 回调参数 |
| ----------- | --------------------------- | -------- |
| change      | 页码改变时触发              | -        |
| size-change | `items-per-page` 改变时触发 | -        |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| page | `multi`自定义页码 | `{ number: number, text: string, active: boolean }` |
| pageDesc | `simple`下自定义页码 | - |
| prev-text | 自定义上一页按钮文字 | - |
| next-text | 自定义下一页按钮文字 | - |

### 类型定义

组件导出以下类型定义：

```ts
import type { PaginationMode, PaginationProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-pagination-height | `40px` | - |
| --r-pagination-font-size | `var(--r-font-size-md)` | - |
| --r-pagination-item-width | `36px` | - |
| --r-pagination-item-default-color | `var(--r-primary-color)` | - |
| --r-pagination-item-disabled-color | `var(--r-gray-7)` | - |
| --r-pagination-item-disabled-background | `var(--r-background)` | - |
| --r-pagination-background | `var(--r-background-2)` | - |
| --r-pagination-desc-color | `var(--r-gray-7)` | - |
| --r-pagination-disabled-opacity | `var(--r-disabled-opacity)` | - |
| --r-pagination-button-color | `var(--r-text-color-primary)` | - |
| --r-pagination-hover-color | `var(--r-primary-color)` | - |
