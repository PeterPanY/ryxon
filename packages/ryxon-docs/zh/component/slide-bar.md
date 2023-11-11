---
title: SlideBar
lang: zh
---

# SlideBar 滚动块

SlideBar 滚动块，可以用作文字块的滑动。

:::warning

这个 SlideBar 滚动块组件已经被废弃，不会迭代任何新的功能，并将在下一个版本中彻底移除。推荐使用新的 [Carousel 走马灯](/zh/component/carousel.html)。

:::

## 基础用法

:::demo

slide-bar/basic

:::

## 滚动数量

:::demo 可通过 `wheel-blocks` 设置每次滚动块数。

slide-bar/wheel-blocks

:::

## 居中布局

:::demo

slide-bar/centered

:::

## API

### Props

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| init-blocks | 初始时需要显示的块数。 | `number` | `4` |
| wheel | 滚轮事件是否启用 | `Boolean` | `true` |
| wheel-blocks | 滚动的块数数量 | `number` | `1` |
| actions | 滚动块列表 | `Array` | `[]` |
| tag | 设置组件的 Dom 标签 | `String` | `ul` |
| sub-tag | 设置组件的子级 Dom 标签 | `String` | `li` |
| lazy-render | 是否开启延迟渲染（首次切换到标签时才触发内容渲染） | `boolean` | `true` |
| load-prev-next | 允许将延迟加载应用到最接近的块（后一个显示级） | `boolean` | `false` |
| duration | 动画时间，单位秒，设置为 0 可以禁用动画 | `number` | `0.3` |
| gutter | 滚动块之间的间距 | `number` | `15` |
| centered | 居中布局 | `boolean` | `false` |
| blockWidth | 单元格宽度 | `number` | `auto` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 滑动块点击事件;data: 点击的滑块数据，index: 点击的滑块索引值 | `Function(data)` |
| arrow-click | 箭头点击或者滚轮事件触发 | `Function(type, [startIndex,endIndex])` |
| progress | 页面变动触发的方法 | `Function(currentIndex)` |

### 方法

通过 ref 可以获取到 Tabs 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| resize | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | - | - |
| moveTo | 切换到指定位置 | `index: number` | - |

### 插槽

| 名称    | 说明             | 参数 |
| ------- | ---------------- | ---- |
| default | 默认的作用域插槽 | -    |

### 类型定义

组件导出以下类型定义：

```ts
import type { SlideBarThemeVars, SlideBarProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                              | 默认值                           | 描述 |
| --------------------------------- | -------------------------------- | ---- |
| --r-slide-bar-icon-font-size      | `20px`                           | -    |
| --r-slide-bar-icon-hover-color    | `var(--r-primary-color)`         | -    |
| --r-slide-bar-height              | `60px`                           | -    |
| --r-slide-bar-disabled-text-color | `var(--r-disabled-text-color)`   | -    |
| --r-slide-bar-hover-color         | `var(--r-primary-color-light-3)` | -    |
