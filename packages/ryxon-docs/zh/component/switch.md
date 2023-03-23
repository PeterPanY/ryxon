---
title: Switch
lang: zh
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

:::demo 绑定 `v-model` 到一个 `Boolean` 类型的变量。 可以使用 --r-switch-on-background 属性与 --r-switch-background 属性来设置开关的背景色。

switch/basic

:::

## 自定义大小

:::demo 通过 `size` 属性自定义开关的大小。

switch/size

:::

## 文字描述

:::demo 使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。 使用 `inline-prompt `属性来控制文本是否显示在点内。

switch/text-description

:::

## 显示自定义图标

:::demo 使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 使用 `inline-prompt` 属性来控制图标显示在点内

switch/custom-icons

:::

## 扩展的 value 类型

:::demo 你可以设置 `active-value` 和 `inactive-value` 属性， 它们接受 Boolean、String 或 Number 类型的值。

switch/extended-value-types

:::

## 禁用状态

:::demo 设置 `disabled` 属性，接受一个 `Boolean`，设置 `true` 即可禁用。

switch/disabled

:::

## 加载状态

:::demo 设置 `loading` 属性，接受一个 `Boolean`，设置 `true` 即加载中状态。

switch/loading

:::

## 阻止切换

:::demo 设置 `beforeChange` 属性，若返回 `false` 或者返回 `Promise` 且被 `reject`，则停止切换。

switch/prevent-switching

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 开关选中状态 | `any` | `false` |
| size | 开关按钮的尺寸，默认单位为 `px` | `number \| string` | `26px` |
| loading | 是否为加载状态 | `boolean` | `false` |
| disabled | 是否为禁用状态 | `boolean` | `false` |
| active-value | 打开时对应的值 | `any` | `true` |
| inactive-value | 关闭时对应的值 | `any` | `false` |
| inline-prompt | 控制文本是否显示在点内 | `boolean` | `false` |
| active-text | 打开时的文字描述 | `string` | - |
| inactive-icon | 关闭时的文字描述 | `string` | - |
| active-icon | 打开时所显示图标，设置此项会忽略 active-text | `string \| Component` | - |
| inactive-icon | 关闭时所显示图标，设置此项会忽略 inactive-text | `string \| Component` | - |

### Events

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| change | 开关状态切换时触发 | `value: any`        |
| click  | 点击时触发         | `event: MouseEvent` |

### Slots

| 名称       | 说明                 | 参数 |
| ---------- | -------------------- | ---- |
| node       | 自定义按钮的内容     | -    |
| background | 自定义开关的背景内容 | -    |

### 类型定义

组件导出以下类型定义：

```ts
import type { SwitchProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                        | 默认值                            | 描述 |
| --------------------------- | --------------------------------- | ---- |
| --r-switch-size             | `26px`                            | -    |
| --r-switch-width            | `calc(2em + 4px)`                 | -    |
| --r-switch-height           | `calc(1em + 4px)`                 | -    |
| --r-switch-node-size        | `1em`                             | -    |
| --r-switch-node-background  | `var(--r-white)`                  | -    |
| --r-switch-node-shadow      | `0 3px 1px 0 rgba(0, 0, 0, 0.05)` | -    |
| --r-switch-background       | `rgba(120, 120, 128, 0.16)`       | -    |
| --r-switch-on-background    | `var(--r-primary-color)`          | -    |
| --r-switch-duration         | `var(--r-duration-base)`          | -    |
| --r-switch-disabled-opacity | `var(--r-disabled-opacity)`       | -    |
