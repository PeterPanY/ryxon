---
title: Popover
lang: zh
---

# Popover 气泡弹出框

Popover 在内容周围弹出一些隐藏的信息。Popover 里面没什么内置样式，在里面填什么主要靠你。

## 基础用法

:::demo 当 Popover 弹出时，会基于 `reference` 插槽的内容进行定位。

popover/basic

:::

## 弹出位置

:::demo 通过 `placement` 属性来控制气泡的弹出位置。

popover/placement

:::

## 展示图标

:::demo 在 `actions` 数组中，可以通过 `icon` 字段来定义选项的图标，支持传入图标或图片链接，等同于 Icon 组件的 `name 属性`

popover/icon

:::

## 非受控模式

你可以把 Popover 当做受控组件或非受控组件使用：

- 当绑定 `v-model:visible` 时，Popover 为受控组件，此时组件的显示完全由 `v-model:visible` 的值决定。
- 当未绑定 `v-model:visible` 时，Popover 为非受控组件，此时你可以通过 `visible` 属性传入一个默认值，组件值的显示由组件自身控制。

:::demo

popover/mode

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:visible | Popover 是否显示 | `boolean` | `false` |
| theme | 主题风格 | ^[PopoverTheme]`'light' \| 'dark'` | `light` |
| actions | 选项列表 | `PopoverAction[]` | `[]` |
| actions-direction | 选项列表的排列方向 | ^[PopoverActionsDirection]`'vertical' \| 'horizontal'` | `vertical` |
| trigger | 触发方式 | ^[PopoverTrigger]`'click' \| 'focus' \| 'hover' \| 'contextmenu'` | `click` |
| show-arrow | 是否展示小箭头 | `boolean` | `true` |
| placement | 弹出位置 | ^[PopoverPlacement]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom` |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 `class-prefix 属性` | `string` | `r-icon` |
| width | 宽度 | `string / number` | `150` |
| offset | 出现位置的偏移量 | `[number, number]` | `[0, 8]` |
| show-after | 在触发后多久显示内容，单位毫秒 | `number` | `0` |
| hide-after | 延迟关闭，单位毫秒 | `number` | `200` |
| auto-close | tooltip 出现后自动隐藏延时，单位毫秒 | `number` | `0` |
| enterable | 鼠标是否可进入到 tooltip 中 | `Boolean` | `true` |
| close-on-click-outside | 是否在点击外部元素后关闭菜单 | `boolean` | `true` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string / Element` | `body` |
| disabled | Popover 是否可用 | `boolean` | `false` |
| popper-options | [popper.js](https://popper.js.org/docs/v2/)参数 | ^[object]请参考[popper.js](https://popper.js.org/docs/v2/) | {} |
| popper-class | 自定义弹窗样式 | `string / Array / object` | - |
| popper-style | 自定义弹窗样式 | `object` | - |
| persistent | 当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除 | `boolean` | `true` |

### PopoverAction 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| text | 选项文字 | `string` |
| icon | 文字左侧的图标，支持传入图标或图片链接，等同于 Icon 组件的 `name 属性` | `string` |
| color | 选项文字颜色 | `string` |
| disabled | 是否为禁用状态 | `boolean` |
| className | 为对应选项添加额外的类名 | `string / Array / object` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击选项时触发 | `action: PopoverAction, index: number` |
| before-enter | 显示动画播放前触发 | - |
| before-leave | 隐藏动画播放前触发 | - |
| after-enter | 显示动画播放完毕后触发 | - |
| after-leave | 隐藏动画播放完毕后触发 | - |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义菜单内容 | - |
| reference | 触发 Popover 显示的元素内容 | - |
| action | 自定义选项内容 | `{ action: PopoverAction, index: number }` |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  PopoverProps,
  PopoverTheme,
  PopoverAction,
  PopoverActionsDirection,
  PopoverTrigger,
  PopoverPlacement
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-popover-action-width | `128px` |
| --r-popover-action-height | `44px` |
| --r-popover-action-font-size | `var(--r-font-size-md)` |
| --r-popover-action-icon-size | `20px` |
| --r-popover-horizontal-action-height | `34px` |
| --r-popover-horizontal-action-icon-size | `16px` |
| --r-popover-light-action-disabled-text-color | `var(--r-text-color-3)` |
| --r-popover-dark-action-disabled-text-color | `var(--r-text-color-2)` |

## 常见问题

### Popover 的点击事件无法正确触发？

这种情况通常是由于项目中引入了 `fastclick` 库导致的。建议移除 `fastclick`，或者配置 `fastclick` 的 [ignore 规则](https://github.com/ftlabs/fastclick#advanced)。
