---
title: Space
lang: zh
---

# Space 间距

设置元素之间的间距

## 基础用法

:::demo Space 组件会在各个子组件之间设置一定的间距，默认间距为 `8px`。

space/basic

:::

## 垂直排列

:::demo 将 `direction` 属性设置为 `vertical`，可以设置垂直方向排列的间距。

space/direction

:::

## 自定义间距

:::demo 通过调整 `size` 的值来控制间距的大小。传入 `number` 类型时，会默认使用 `px` 单位；也可以传入 `string` 类型，比如 `2rem` 或 `5vw` 等带有单位的值。

space/size

:::

## 对齐方式

:::demo 通过调整 `align` 的值来设置子元素的对齐方式, 可选值为 `start`, `center` ,`end` ,`baseline`，在水平模式下的默认值为 `center`。

space/align

:::

## 自动换行

:::demo 在水平模式下, 通过 `wrap` 属性来控制子元素是否自动换行。

space/wrap

:::

## 行间分隔符

有时候，仅仅在行间加空白并不能满足我们的日常需求，此时分隔符 (spacer) 就可以发挥非常好的作用了。

:::demo

space/spacer

:::

## 填充容器

:::demo 用 fill 属性让子节点自动填充容器

space/fill

:::

## 填充容器比例

:::demo 使用 `fillRatio` 参数，自定义填充的比例， 默认值为 `100`，代表基于父容器宽度的 100% 进行填充

space/fill-ratio

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 间距方向 | `vertical \| horizontal` | `horizontal` |
| size | 间距大小，如 `20px` `2em`，默认单位为 `px`，支持数组形式来分别设置横向和纵向间距 | ^[enum]`number \| string \| number[] \| string[]` | `8px` |
| align | 设置子元素的对齐方式 | ^[enum]`start \| end \| center \| baseline` | - |
| wrap | 是否自动换行，仅适用于水平方向排列 | `boolean` | `false` |
| fill | 是否让 Space 变为一个块级元素，填充整个父元素 | `boolean` | `false` |
| fill-ratio | 填充父容器的比例 | `number` | 100 |
| spacer | 间隔符 | ^[enum]`string \| number \| VNode ` | - |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 间距组件内容 |

### 类型定义

组件导出以下类型定义：

```js
import type { SpaceProps, SpaceSize, SpaceAlign } from 'ryxon'
```
