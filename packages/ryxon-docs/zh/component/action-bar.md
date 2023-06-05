---
title: ActionBar
lang: zh
---

# ActionBar 动作栏

用于为页面相关操作提供便捷交互。

## 基础用法

:::demo

action-bar/basic

:::

## 徽标提示

:::demo 在 ActionBarIcon 组件上设置 `dot` 属性后，会在图标右上角展示一个小红点；设置 `badge` 属性后，会在图标右上角展示相应的徽标。

action-bar/dot

:::

## 自定义颜色

:::demo 通过 ActionBarIcon 的 `color` 属性可以自定义图标的颜色。通过 ActionBarButton 的 `color` 属性可以自定义按钮的颜色，支持传入 `linear-gradient` 渐变色。

action-bar/color

:::

## API

### ActionBar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| safe-area-inset-bottom | 是否开启[底部安全区适配](/zh/guide/advanced-usage.html#底部安全区适配) | `boolean` | `true` |
| placeholder | 是否在标签位置生成一个等高的占位元素 | `boolean` | `false` |

### ActionBarIcon Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮文字 | `string` | - |
| icon | 图标 | `string` | - |
| color | 图标颜色 | `string` | `#323233` |
| icon-class | 图标额外类名 | `string \| Array \| object` | - |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 [class-prefix 属性](/zh/component/icon.html#api) | `string` | `r-icon` |
| dot | 是否显示图标右上角小红点 | `boolean` | `false` |
| badge | 图标右上角徽标的内容 | `number \| string` | - |
| badge-props | 自定义徽标的属性，传入的对象会被透传给 [Badge 组件的 props](/zh/component/badge.html#api) | `BadgeProps` | - |
| url | 点击后跳转的链接地址 | `string` | - |
| to | 点击后跳转的目标路由对象，等同于 vue-router 的 [to 属性](https://router.vuejs.org/zh/api/#to) | `string \| object` | - |
| replace | 是否在跳转时替换当前页面历史 | `boolean` | `false` |

### ActionBarButton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮文字 | `string` | - |
| type | 按钮类型，可选值为 `default` `primary` `success` `warning` `danger` | `string` | `default` |
| color | 按钮颜色，支持传入 `linear-gradient` 渐变色 | `string` | - |
| icon | 左侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](/zh/component/icon.html#api) | `string` | - |
| disabled | 是否禁用按钮 | `boolean` | `false` |
| loading | 是否显示为加载状态 | `boolean` | `false` |
| url | 点击后跳转的链接地址 | `string` | - |
| to | 点击后跳转的目标路由对象，等同于 vue-router 的 [to 属性](https://router.vuejs.org/zh/api/#to) | `string \| object` | - |
| replace | 是否在跳转时替换当前页面历史 | `boolean` | `false` |

### ActionBarIcon Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 文本内容   |
| icon    | 自定义图标 |

### ActionBarButton Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 按钮显示内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  ActionBarProps,
  ActionBarIconProps,
  ActionBarButtonProps
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                             | 默认值                  | 描述 |
| -------------------------------- | ----------------------- | ---- |
| --r-action-bar-background        | `var(--r-background-2)` | -    |
| --r-action-bar-height            | `50px`                  | -    |
| --r-action-bar-icon-width        | `48px`                  | -    |
| --r-action-bar-icon-height       | `100%`                  | -    |
| --r-action-bar-icon-color        | `var(--r-text-color)`   | -    |
| --r-action-bar-icon-size         | `18px`                  | -    |
| --r-action-bar-icon-font-size    | `var(--r-font-size-xs)` | -    |
| --r-action-bar-icon-active-color | `var(--r-active-color)` | -    |
| --r-action-bar-icon-text-color   | `var(--r-text-color)`   | -    |
| --r-action-bar-icon-background   | `var(--r-background-2)` | -    |
| --r-action-bar-button-height     | `40px`                  | -    |
