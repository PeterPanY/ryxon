---
title: SlideBar
lang: zh
---

# SlideBar 滚动块

SlideBar 滚动块，可以用作文字块的滑动。

## 基础用法

:::demo

slide-bar/basic

:::

## 滚动数量

:::demo 可通过 `wheel-blocks` 设置每次滚动块数。

slide-bar/wheel-blocks

:::

## API

### Props

| 属性名                | 描述                    | 类型      | 默认值 |
| --------------------- | ----------------------- | --------- | ------ |
| model-value / v-model | 选中项绑定 index 值     | `number`  | `0`    |
| actions               | 滚动块列表              | `Array`   | `[]`   |
| init-blocks           | 初始时需要显示的块数。  | `number`  | `4`    |
| wheel                 | 滚轮事件是否启用        | `Boolean` | `true` |
| wheel-blocks          | 滚动的块数数量          | `number`  | `1`    |
| tag                   | 设置组件的 Dom 标签     | `String`  | `ul`   |
| sub-tag               | 设置组件的子级 Dom 标签 | `String`  | `li`   |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 滑动块点击事件;data: 点击的滑块数据，index: 点击的滑块索引值 | `Function(data, index)` |

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
| --r-slide-bar-active-color        | `var(--r-primary-color)`         | -    |
| --r-slide-bar-disabled-text-color | `var(--r-disabled-text-color)`   | -    |
| --r-slide-bar-hover-color         | `var(--r-primary-color-light-3)` | -    |
