---
title: NavBar
lang: zh
---

# NavBar 导航栏

为页面提供导航功能，常用于页面顶部。

## 基础用法

通过 `title` 属性设置导航栏标题。

:::demo

nav-bar/basic

:::

## 返回上级

在导航栏实现返回上级功能。

:::demo

nav-bar/go-back

:::

## 右侧按钮

在导航栏右侧添加可点击的按钮。

:::demo

nav-bar/right-btn

:::

### 使用插槽

可以通过插槽自定义导航栏两侧的内容。

:::demo

nav-bar/custom

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 左侧返回图标 | `string / Component` | `ArrowLeft` |
| title | 标题 | `string` | `''` |
| left-text | 左侧文案 | `string` | `''` |
| right-text | 右侧文案 | `string` | `''` |
| left-disabled | 是否禁用左侧按钮，禁用时透明度降低，且无法点击 | `boolean` | `false` |
| right-disabled | 是否禁用右侧按钮，禁用时透明度降低，且无法点击 | `boolean` | `false` |
| left-arrow | 是否显示左侧箭头 | `boolean` | `false` |
| border | 是否显示下边框 | `boolean` | `true` |
| fixed | 是否固定在顶部 | `boolean` | `false` |
| placeholder | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | `boolean` | `false` |
| z-index | 导航栏 z-index | `number \| string` | `1` |
| safe-area-inset-top | 是否开启[顶部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei) | `boolean` | `false` |
| clickable | 是否开启两侧按钮的点击反馈 | `boolean` | `true` |

### Slots

| 名称  | 说明               |
| ----- | ------------------ |
| title | 自定义标题         |
| left  | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |

### Events

| 事件名      | 说明               | 回调参数            |
| ----------- | ------------------ | ------------------- |
| click-left  | 点击左侧按钮时触发 | `event: MouseEvent` |
| click-right | 点击右侧按钮时触发 | `event: MouseEvent` |

### 类型定义

组件导出以下类型定义：

```ts
import type { NavBarProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                         | 默认值                   | 描述 |
| ---------------------------- | ------------------------ | ---- |
| --r-nav-bar-height           | `46px`                   | -    |
| --r-nav-bar-background       | `var(--r-background-2)`  | -    |
| --r-nav-bar-arrow-size       | `16px`                   | -    |
| --r-nav-bar-icon-color       | `var(--r-primary-color)` | -    |
| --r-nav-bar-text-color       | `var(--r-primary-color)` | -    |
| --r-nav-bar-title-font-size  | `var(--r-font-size-lg)`  | -    |
| --r-nav-bar-title-text-color | `var(--r-text-color)`    | -    |
| --r-nav-bar-z-index          | `1`                      | -    |
