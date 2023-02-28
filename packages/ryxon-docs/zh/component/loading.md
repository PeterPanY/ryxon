---
title: Loading
lang: zh
---

# Loading 加载

加载图标，用于表示加载中的过渡状态。

## 基础用法

:::demo 通过 `type` 属性可以设置加载图标的类型，默认为 `circular`，可选值为 `spinner`。

loading/basic

:::

## 文案用法

:::demo 可以使用默认插槽在图标的右侧插入加载文案。

loading/text

:::

## 自定义图标

:::demo 通过 `icon` 插槽可以自定义加载图标。

loading/custom

:::

## API

### Props

| 参数       | 说明                          | 类型               | 默认值     |
| ---------- | ----------------------------- | ------------------ | ---------- |
| color      | 颜色                          | `string`           | `#c9c9c9`  |
| type       | 类型，可选值为 `spinner`      | `string`           | `circular` |
| size       | 加载图标大小，默认单位为 `px` | `number \| string` | `30px`     |
| text-size  | 文字大小，默认单位为 `px`     | `number \| string` | `14px`     |
| text-color | 文字颜色                      | `string`           | `#c9c9c9`  |
| vertical   | 是否垂直排列图标和文字内容    | `boolean`          | `false`    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 加载文案       |
| icon    | 自定义加载图标 |

### 类型定义

组件导出以下类型定义：

```ts
import type { LoadingType, LoadingProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值                  | 描述 |
| ---------------------------- | ----------------------- | ---- |
| --r-loading-text-color       | `var(--r-text-color-2)` | -    |
| --r-loading-text-font-size   | `var(--r-font-size-md)` | -    |
| --r-loading-spinner-color    | `var(--r-gray-5)`       | -    |
| --r-loading-spinner-size     | `30px`                  | -    |
| --r-loading-spinner-duration | `0.8s`                  | -    |
