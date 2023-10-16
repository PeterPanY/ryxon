---
title: Steps
lang: zh
---

# Steps 步骤条

引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

:::demo

steps/basic

:::

## 自定义样式

:::demo

steps/custom

:::

## 自定义单个步骤图标

:::demo

steps/custom-icon

:::

## 自定义间隔

:::demo

steps/interval

:::

## 垂直的步骤条

:::demo 可以通过设置 `direction` 属性来改变步骤条的显示方向。

steps/vertical

:::

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前步骤对应的索引值 | `number \| string` | `0` |
| active-icon | 当前步骤对应的底部图标，可选值见 [Icon 组件](/zh/component/icon.html#api) | `string` | - |
| finish-icon | 已完成步骤对应的底部图标，优先级高于 `inactive-icon`，可选值见 [Icon 组件](/zh/component/icon.html#api) | `string` | - |
| inactive-icon | 未完成步骤对应的底部图标，可选值见 [Icon 组件](/zh/component/icon.html#api) | `string` | - |
| direction | 步骤条方向，可选值为 `vertical` | `string` | `horizontal` |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 [class-prefix 属性](/zh/component/icon.html#api) | `string` | `r-icon` |

### Steps Events

| 事件名     | 说明                       | 回调参数        |
| ---------- | -------------------------- | --------------- |
| click-step | 点击步骤的标题或图标时触发 | `index: number` |

### Steps Slots

| 事件名   | 说明           | 回调参数 |
| -------- | -------------- | -------- |
| default  | 默认插槽       | -        |
| interval | 自定义步骤间隔 | -        |

### Step Slots

| 名称          | 说明                                                       |
| ------------- | ---------------------------------------------------------- |
| default       | 步骤内容                                                   |
| active-icon   | 自定义激活状态图标                                         |
| inactive-icon | 自定义未激活状态图标                                       |
| finish-icon   | 自定义已完成步骤对应的底部图标，优先级高于 `inactive-icon` |

### 类型定义

组件导出以下类型定义：

```ts
import type { StepsProps, StepsDirection } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-step-text-color | `var(--r-text-color-2)` | 步骤条默认文字颜色 |
| --r-step-active-color | `var(--r-primary-color)` | 步骤条激活状态下文字颜色 |
| --r-step-font-size | `var(--r-font-size-md)` | - |
| --r-step-line-color | `var(--r-border-color)` | - |
| --r-step-finish-line-color | `var(--r-success-color)` | - |
| --r-step-finish-text-color | `var(--r-success-color)` | - |
| --r-step-icon-size | `12px` | - |
| --r-step-circle-size | `5px` | - |
| --r-step-circle-color | `var(--r-info-color)` | - |
| --r-step-horizontal-title-font-size | `var(--r-font-size-sm)` | - |
| --r-steps-background | `var(--r-background-2)` | 步骤条背景颜色 |
