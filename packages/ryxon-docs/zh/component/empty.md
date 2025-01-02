---
title: Empty
lang: zh
---

# Empty 空状态

空状态时的占位提示。

## 基础用法

:::demo

empty/basic

:::

## 自定义图片

:::demo 需要自定义图片时，可以在 `image` 属性中传入任意图片 URL。

empty/image

:::

## 图片尺寸

:::demo 通过 `image-size` 属性图片的大小。将 `image-size` 设置为数组格式，可以分别设置宽高。数组第一项对应宽度，数组第二项对应高度。

empty/size

:::

## 底部内容

:::demo 通过默认插槽可以在 Empty 组件的下方插入内容。

empty/slots

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片类型，可选值为 `error` `network` `search`，支持传入图片 URL | `string` | `default` |
| image-size | 图片大小，默认单位为 `px` | ^[enum]`number \| string \| Array` | - |
| description | 图片下方的描述文字 | `string` | - |

### Slots

| 名称        | 说明           |
| ----------- | -------------- |
| default     | 自定义底部内容 |
| image       | 自定义图标     |
| description | 自定义描述文字 |

### 类型定义

组件导出以下类型定义：

```ts
import type { EmptyProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                              | 默认值                    | 描述 |
| --------------------------------- | ------------------------- | ---- |
| --r-empty-padding                 | `var(--r-padding-xl) 0`   | -    |
| --r-empty-image-size              | `160px`                   | -    |
| --r-empty-description-margin-top  | `var(--r-padding-md)`     | -    |
| --r-empty-description-padding     | `0 60px`                  | -    |
| --r-empty-description-color       | `var(--r-text-color-2)`   | -    |
| --r-empty-description-font-size   | `var(--r-font-size-md)`   | -    |
| --r-empty-description-line-height | `var(--r-line-height-md)` | -    |
| --r-empty-bottom-margin-top       | `24px`                    | -    |
