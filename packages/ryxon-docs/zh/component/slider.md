---
title: Slider
lang: zh
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

:::demo 在拖动滑块时，显示当前值. 通过设置绑定值自定义滑块的初始值

slider/basic

:::

## 离散值

:::demo 改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

slider/discrete-values

:::

## 带有输入框的滑块

:::demo 设置 `show-input` 属性会在右侧显示一个输入框

slider/slider-with-input-box

:::

## 位置

:::demo 可以自定义 `Tooltip` 提示的位置。

slider/placement

:::

## 范围选择

:::demo 配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

slider/range-selection

:::

## 垂直模式

:::demo 配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

slider/vertical-mode

:::

## 显示标记

:::demo 设置 `marks` 属性可以在滑块上显示标记。

slider/show-marks

:::

## 自定义按钮

:::demo

slider/custom-button

:::

## API

### Props

| 属性名 | 描述 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | `number` | — | `0` |
| min | 最小值 | `number` | — | `0` |
| max | 最大值 | `number` | — | `100` |
| step | 步长 | `number` | — | `1` |
| show-stops | 是否显示间断点 | `boolean` | — | `false` |
| show-tooltip | 是否显示提示信息 | `boolean` | — | `true` |
| format-tooltip | 格式化提示信息 | `function(value)` | — | — |
| tooltip-class | tooltip 的自定义类名 | `string` | — | — |
| show-input | 是否显示输入框，仅在非范围选择时有效 | `boolean` | — | `false` |
| input-button-size | 按钮大小以及输入框高度，默认单位为 px | `number \| string` | - | `32px` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| range | 是否开启选择范围 | `boolean` | — | `false` |
| vertical | 垂直模式 | `boolean` | — | `false` |
| height | 滑块高度，垂直模式必填 | `string` | — | — |
| label | 屏幕阅读器标签 | `string` | — | — |
| range-start-label | 当 range 为 true 时，屏幕阅读器标签开始的标记 | `string` | — | — |
| range-end-label | 当 range 为 true 时，屏幕阅读器标签结尾的标记 | `string` | — | — |
| format-value-text | 显示屏幕阅读器的 aria-valuenow 属性的格式 | `function(value)` | — | — |
| placement | Tooltip 出现的位置 | `string` | ^[enum]`top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end` | top |
| marks | 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式 | `object` | — | — |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | val，新状态的值 |
| input | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | val，改变后的值 |

### 插槽

| 名称   | 说明           | 参数 |
| ------ | -------------- | ---- |
| button | 自定义滑块按钮 | -    |

### 类型定义

组件导出以下类型定义：

```ts
import type { SliderThemeVars, SliderProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-slider-height | `32px` | slider 包装器的大小,垂直模式下该属性不可用 |
| --r-slider-main-bg-color | `var(--r-primary-color)` | - |
| --r-slider-runway-bg-color | `var(--r-border-color-light)` | - |
| --r-slider-runway-height | `6px` | - |
| --r-slider-stop-bg-color | `var(--r-white)` | - |
| --r-slider-disabled-color | `var(--r-text-color-placeholder)` | - |
| --r-slider-border-radius | `3px` | - |
| --r-slider-button-size | `20px` | - |
| --r-slider-button-wrapper-size | `36px` | - |
| --r-slider-button-wrapper-offset | `-15px` | - |
