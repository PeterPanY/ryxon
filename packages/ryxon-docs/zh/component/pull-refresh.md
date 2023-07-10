---
title: PullRefresh
lang: zh
---

# PullRefresh 下拉刷新

用于提供下拉刷新的交互操作。在 pc 端需要搭配`@ryxon/touch-emulator`插件使用

## 基础用法

:::demo 下拉刷新时会触发 `refresh` 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 `v-model` 设置为 `false`，表示加载完成。

pull-refresh/basic

:::

## 成功提示

:::demo 通过 `success-text` 可以设置刷新成功后的顶部提示文案。

pull-refresh/success

:::

## 自定义提示

:::demo 通过插槽可以自定义下拉刷新过程中的提示内容。

pull-refresh/custom

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否处于加载中状态 | `boolean` | - |
| pulling-text | 下拉过程提示文案 | `string` | `下拉即可刷新...` |
| loosing-text | 释放过程提示文案 | `string` | `释放即可刷新...` |
| loading-text | 加载过程提示文案 | `string` | `加载中...` |
| success-text | 刷新成功提示文案 | `string` | - |
| success-duration | 刷新成功提示展示时长(ms) | `number \| string` | `500` |
| animation-duration | 动画时长 | `number \| string` | `300` |
| head-height | 顶部内容高度 | `number \| string` | `50` |
| pull-distance | 触发下拉刷新的距离 | `number \| string` | 与 `head-height` 一致 |
| disabled | 是否禁用下拉刷新 | `boolean` | `false` |

### Events

| 事件名  | 说明                   | 回调参数                               |
| ------- | ---------------------- | -------------------------------------- |
| refresh | 下拉刷新时触发         | -                                      |
| change  | 拖动时或状态改变时触发 | `{ status: string, distance: number }` |

### Slots

| 名称    | 说明                 | 参数                   |
| ------- | -------------------- | ---------------------- |
| default | 自定义内容           | -                      |
| normal  | 非下拉状态时顶部内容 | -                      |
| pulling | 下拉过程中顶部内容   | `{ distance: number }` |
| loosing | 释放过程中顶部内容   | `{ distance: number }` |
| loading | 加载过程中顶部内容   | `{ distance: number }` |
| success | 刷新成功提示内容     | -                      |

### 类型定义

组件导出以下类型定义：

```ts
import type { PullRefreshProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                               | 默认值                  | 描述 |
| ---------------------------------- | ----------------------- | ---- |
| --r-pull-refresh-head-height       | `50px`                  | -    |
| --r-pull-refresh-head-font-size    | `var(--r-font-size-md)` | -    |
| --r-pull-refresh-head-text-color   | `var(--r-text-color-2)` | -    |
| --r-pull-refresh-loading-icon-size | `16px`                  | -    |

## 常见问题

### PullRefresh 的内容未填满屏幕时，只有一部分区域可以下拉？

默认情况下，下拉区域的高度是和内容高度保持一致的，如果需要让下拉区域始终为全屏，可以给 PullRefresh 设置一个与屏幕大小相等的最小高度：

```html
<r-pull-refresh style="min-height: 100vh;" />
```

### PullRefresh 的触发条件是？

PullRefresh 的触发条件是「父级滚动元素的滚动条在顶部位置」。

- 如果最近一个可滚动的父级元素是 `window`，则要求 `window.pageYOffset === 0`。
- 如果最近一个可滚动的父级元素是 `Element`，则要求 `Element.scrollTop === 0`。

### 在桌面端无法操作组件？

参见[桌面端适配](/zh/guide/advanced-usage.html#桌面端适配)。
