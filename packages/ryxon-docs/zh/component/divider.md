---
title: Divider
lang: zh
---

# Divider 分割线

区隔内容的分割线。

## 基础用法

:::demo 对不同段落的文本进行分割。

divider/basic-usage

:::

## 设置文案

:::demo 可以在分割线上自定义文本内容。

divider/custom-content

:::

## 虚线

:::demo

divider/line-dashed

:::

## 垂直分隔线

:::demo

divider/vertical-divider

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| border-style | 设置分隔符样式 | ^[enum]`'none' \| 'solid' \| 'hidden' \| 'dashed' \| ...` | `solid` |
| hairline | 是否使用 0.5px 线 | `boolean` | `false` |
| direction | 设置分割线方向 | ^[enum]`'horizontal' \| 'vertical'` | `horizontal` |
| content-position | 内容位置，可选值为 `left` `right` | `string` | `center` |

### Slots

| 名称    | 说明 |
| ------- | ---- |
| default | 内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { DividerProps, DividerContentPosition } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                            | 默认值                  | 描述       |
| ------------------------------- | ----------------------- | ---------- |
| --r-divider-margin              | `var(--r-padding-md) 0` | -          |
| --r-divider-text-color          | `var(--r-text-color-2)` | -          |
| --r-divider-font-size           | `var(--r-font-size-md)` | -          |
| --r-divider-line-height         | `24px`                  | -          |
| --r-divider-border-color        | `var(--r-border-color)` | 分割线颜色 |
| --r-divider-border-style        | `solid`                 | 分割线样式 |
| --r-divider-content-padding     | `var(--r-padding-md)`   | -          |
| --r-divider-content-left-width  | `10%`                   | -          |
| --r-divider-content-right-width | `10%`                   | -          |
