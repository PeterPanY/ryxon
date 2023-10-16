---
title: BackTop
lang: zh
---

# BackTop 回到顶部

返回页面顶部的操作按钮。

## 基础用法

:::demo 请滚动右侧的示例页面，当页面滚动 `200px` 时，右下角会出现返回顶部按钮。

back-top/basic

:::

## 自定义内容

:::demo 通过 `right` 和 `bottom` 属性来设置组件距离右侧和底部的位置。使用默认插槽来自定义组件展示的内容。

back-top/content

:::

## 设置滚动目标

:::demo 可以通过 `target` 属性来设置触发滚动的目标对象，支持传入选择器或 `HTMLElement`。

back-top/target

:::

## 瞬间滚动

:::demo 当设置 `immediate` 属性后，页面滚动的过程不再有过渡效果，而是瞬间滚动到顶部。

back-top/immediate

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 触发滚动的目标对象，支持传入选择器或 DOM 元素，默认最近的父级滚动容器 | `string \| HTMLElement` | - |
| right | 距离页面右侧的距离，默认单位为 `px` | `number \| string` | `30` |
| bottom | 距离页面底部的距离，默认单位为 `px` | `number \| string` | `40` |
| offset | 滚动高度达到此参数值时才显示组件 | `number` | `200` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | `body` |
| immediate | 是否瞬间滚动到顶部 | `boolean` | `false` |
| z-index | 设置组件的 z-index 层级 | `number \| string` | `100` |

### Events

| 事件  | 说明           | 回调参数            |
| ----- | -------------- | ------------------- |
| click | 点击组件时触发 | `event: MouseEvent` |

### Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义按钮显示内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { BackTopProps, BackTopThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                    | 默认值                   | 描述 |
| ----------------------- | ------------------------ | ---- |
| --r-back-top-size       | `40px`                   | -    |
| --r-back-top-icon-size  | `20px`                   | -    |
| --r-back-top-right      | `30px`                   | -    |
| --r-back-top-bottom     | `40px`                   | -    |
| --r-back-top-z-index    | `100`                    | -    |
| --r-back-top-text-color | `#fff`                   | -    |
| --r-back-top-background | `var(--r-primary-color)` | -    |
