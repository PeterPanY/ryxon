---
title: Sticky
lang: zh
---

# Sticky 粘性布局

Sticky 组件与 CSS 中 `position: sticky` 属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

## 基础用法

:::demo 将内容包裹在 `Sticky` 组件内即可。

sticky/basic

:::

## 吸顶距离

:::demo 通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离。

sticky/offset-top

:::

## 指定容器

:::demo 通过 `container` 属性可以指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会固定在容器的底部。

sticky/container

:::

## 吸底距离

:::demo 将 `position` 设置为 `bottom` 可以让组件吸附在底部。通过 `offset-bottom` 属性可以设置组件在吸底时与底部的距离。

sticky/bottom

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 吸附位置，可选值为 `bottom` | `string` | `top` |
| offset-top | 吸顶时与顶部的距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | `number \| string` | `0` |
| offset-bottom | 吸底时与底部的距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | `number \| string` | `0` |
| z-index | 吸顶时的 z-index | `number \| string` | `99` |
| container | 容器对应的 HTML 节点 | `Element` | - |

### Events

| 事件名 | 说明                 | 回调参数                                  |
| ------ | -------------------- | ----------------------------------------- |
| change | 当吸顶状态改变时触发 | `isFixed: boolean`                        |
| scroll | 滚动时触发           | `{ scrollTop: number, isFixed: boolean }` |

### 类型定义

组件导出以下类型定义：

```ts
import type { StickyProps, StickyPosition } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称               | 默认值 | 描述 |
| ------------------ | ------ | ---- |
| --r-sticky-z-index | `99`   | -    |
