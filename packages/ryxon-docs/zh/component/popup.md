---
title: Popup
lang: zh
---

# Popup 弹出层

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

## 基础用法

:::demo 通过 `v-model:show` 控制弹出层是否展示。

popup/basic

:::

## 弹出位置

通过 `position` 属性设置弹窗的弹出位置，默认为居中弹出，可以设置为 `top`、`bottom`、`left`、`right`。

- 当弹窗从顶部或底部弹出时，默认宽度与屏幕宽度保持一致，弹窗高度取决于内容的高度。
- 当弹窗从左侧或右侧弹出时，默认不设置宽度和高度，弹窗的宽高取决于内容的宽高。

:::demo

popup/position

:::

## 关闭图标

:::demo 设置 `closeable` 属性后，会在弹出层的右上角显示关闭图标，并且可以通过 `close-icon` 属性自定义图标，使用 `close-icon-position` 属性可以自定义图标位置。

popup/icons

:::

## 圆角弹窗

:::demo 设置 `round` 属性后，弹窗会根据弹出位置添加不同的圆角样式。

popup/round

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:show | 是否显示弹出层 | `boolean` | `false` |
| overlay | 是否显示遮罩层 | `boolean` | `true` |
| position | 弹出位置，可选值为 `top` `bottom` `right` `left` | `string` | `center` |
| overlay-class | 自定义遮罩层类名 | `string \| Array \| object` | - |
| overlay-style | 自定义遮罩层样式 | `object` | - |
| duration | 动画时长，单位秒，设置为 0 可以禁用动画 | `number \| string` | `0.3` |
| z-index | 将弹窗的 z-index 层级设置为一个固定值 | `number \| string` | `2000+` |
| round | 是否显示圆角 | `boolean` | `false` |
| lock-scroll | 是否锁定背景滚动 | `boolean` | `true` |
| lazy-render | 是否在显示弹层时才渲染节点 | `boolean` | `true` |
| close-on-popstate | 是否在页面回退时自动关闭 | `boolean` | `false` |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | `boolean` | `true` |
| closeable | 是否显示关闭图标 | `boolean` | `false` |
| close-icon | 关闭图标名称或图片链接，等同于 Icon 组件的 [name 属性](/zh/component/icon.html#api) | `string` | `cross` |
| close-icon-position | 关闭图标位置，可选值为 `top-left` `bottom-left` `bottom-right` | `string` | `top-right` |
| before-close | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | `(action: string) => boolean \| Promise\<boolean\>` | - |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 [class-prefix 属性](/zh/component/icon.html#api) | `string` | `r-icon` |
| transition | 动画类名，等价于 [transition](https://vuejs.org/api/built-in-components.html#transition) 的 `name` 属性 | `string` | - |
| transition-appear | 是否在初始渲染时启用过渡动画 | `boolean` | `false` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | - |
| safe-area-inset-top | 是否开启[顶部安全区适配](/zh/guide/advanced-usage.html#底部安全区适配) | `boolean` | `false` |
| safe-area-inset-bottom | 是否开启[底部安全区适配](/zh/guide/advanced-usage.html#底部安全区适配) | `boolean` | `false` |

### Events

| 事件名           | 说明                       | 回调参数            |
| ---------------- | -------------------------- | ------------------- |
| click            | 点击弹出层时触发           | `event: MouseEvent` |
| click-overlay    | 点击遮罩层时触发           | `event: MouseEvent` |
| click-close-icon | 点击关闭图标时触发         | `event: MouseEvent` |
| open             | 打开弹出层时立即触发       | -                   |
| close            | 关闭弹出层时立即触发       | -                   |
| opened           | 打开弹出层且动画结束后触发 | -                   |
| closed           | 关闭弹出层且动画结束后触发 | -                   |

### Slots

| 名称            | 说明         |
| --------------- | ------------ |
| default         | 弹窗内容     |
| overlay-content | 遮罩层的内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  PopupProps,
  PopupPosition,
  PopupInstance,
  PopupCloseIconPosition
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值                             | 描述 |
| ---------------------------- | ---------------------------------- | ---- |
| --r-popup-background         | `var(--r-background-2)`            | -    |
| --r-popup-transition         | `transform var(--r-duration-base)` | -    |
| --r-popup-round-radius       | `16px`                             | -    |
| --r-popup-close-icon-size    | `22px`                             | -    |
| --r-popup-close-icon-color   | `var(--r-gray-5)`                  | -    |
| --r-popup-close-icon-margin  | `16px`                             | -    |
| --r-popup-close-icon-z-index | `1`                                | -    |
