---
title: Badge
lang: zh
---

# Badge 徽章

按钮和图标上的数字或状态标记

## 基础用法

:::demo 设置 `content` 属性后，Badge 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

badge/basic

:::

## 最大值

:::demo 设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 `{max}+`。

badge/max

:::

## 自定义颜色

:::demo 通过 `color` 属性来设置徽标的颜色。

badge/color

:::

## 自定义徽标内容

:::demo 通过 `content` 插槽可以自定义徽标的内容，比如插入一个图标。

badge/content

:::

## 自定义徽标位置

:::demo 通过 `position` 属性来设置徽标的位置。

badge/position

:::

## 独立展示

:::demo 当 Badge 没有子元素时，会作为一个独立的元素进行展示。

badge/alone

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 徽标内容 | `number / string` | - |
| color | 徽标背景颜色 | `string` | `#ee0a24` |
| dot | 是否展示为小红点 | `boolean` | `false` |
| max | 最大值，超过最大值会显示 `{max}+`，仅当 content 为数字时有效 | `number / string` | - |
| offset | 设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 `px` | `[number / string, number / string]` | - |
| show-zero | 当 content 为数字 0 或字符串 '0' 时，是否展示徽标 | `boolean` | `true` |
| position | 徽标位置，可选值为 `top-left` `bottom-left` `bottom-right` | `string` | `top-right` |
| type | 显示类型，可选值为 `primary` `success` `warning` `info` | `string` | `danger` |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 徽标包裹的子元素 |
| content | 自定义徽标内容   |

### 类型定义

组件导出以下类型定义：

```ts
import type { BadgeProps, BadgeType, BadgePosition } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 `ConfigProvider 组件`

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-badge-size | `16px` | - |
| --r-badge-color | `var(--r-white)` | - |
| --r-badge-padding | `0 3px` | - |
| --r-badge-font-size | `var(--r-font-size-sm)` | - |
| --r-badge-font-weight | `var(--r-font-bold)` | - |
| --r-badge-border-width | `var(--r-border-width)` | - |
| --r-badge-background | `var(--r-danger-color)` | - |
| --r-badge-dot-color | `var(--r-danger-color)` | - |
| --r-badge-dot-size | `8px` | - |
| --r-badge-font | `-apple-system-font, Helvetica Neue, Arial, sans-serif` | - |
