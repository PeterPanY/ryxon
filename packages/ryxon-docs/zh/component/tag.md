---
title: Tag
lang: zh
---

# Tag 标签

用于标记关键词和概括主要内容

## 基础用法

:::demo 通过 `type` 属性控制标签颜色。也可以通过 color 属性来自定义背景色。

tag/basic

:::

## 样式风格

:::demo Tag 组件提供多种样式风格

tag/closeable

:::

## 动态编辑标签

:::demo 动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现。

tag/dynamic

:::

## 标签大小

:::demo 通过 `size` 属性调整标签大小

tag/size

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `info` `success` `danger` `warning` | `string` | `primary` |
| size | 大小, 可选值为 `large` `medium` | `string` | - |
| color | 标签颜色 | `string` | - |
| show | 是否展示标签 | `boolean` | `true` |
| plain | 是否为空心样式 | `boolean` | `false` |
| round | 是否为圆角样式 | `boolean` | `false` |
| mark | 是否为标记样式 | `boolean` | `false` |
| text-color | 文本颜色，优先级高于 `color` 属性 | `string` | `white` |
| closeable | 是否为可关闭标签 | `boolean` | `false` |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 标签显示内容 |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击时触发     | `event: MouseEvent` |
| close  | 关闭标签时触发 | `event: MouseEvent` |

### 类型定义

组件导出以下类型定义：

```ts
import type { TagSize, TagType, TagProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 `ConfigProvider 组件`。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-tag-padding | `0 var(--r-padding-base)` | - |
| --r-tag-text-color | `var(--r-white)` | - |
| --r-tag-font-size | `var(--r-font-size-sm)` | - |
| --r-tag-radius | `2px` | - |
| --r-tag-line-height | `16px` | - |
| --r-tag-medium-padding | `2px 6px` | - |
| --r-tag-large-padding | `var(--r-padding-base) var(--r-padding-xs)` | - |
| --r-tag-large-radius | `var(--r-radius-md)` | - |
| --r-tag-large-font-size | `var(--r-font-size-md)` | - |
| --r-tag-round-radius | `var(--r-radius-max)` | - |
| --r-tag-danger-color | `var(--r-danger-color)` | - |
| --r-tag-primary-color | `var(--r-primary-color)` | - |
| --r-tag-success-color | `var(--r-success-color)` | - |
| --r-tag-warning-color | `var(--r-warning-color)` | - |
| --r-tag-info-color | `var(--r-info-color)` | - |
| --r-tag-plain-background | `var(--r-background-2)` | - |
