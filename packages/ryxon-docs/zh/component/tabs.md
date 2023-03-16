---
title: Tabs
lang: zh
---

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

:::demo 通过 `v-model:active` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

tabs/basic

:::

## 卡片风格的标签

:::demo `Tabs` 支持两种样式风格：`line` 和 `card`，默认为 `line` 样式，可以通过 `type` 属性切换样式风格。

tabs/card

:::

## 标签位置的设置

:::demo 可以通过 `tab-position` 设置标签的位置

tabs/position

:::

## 标签栏滚动

:::demo 标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。

tabs/scroll

:::

## 粘性布局

:::demo 通过 `sticky` 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶。

tabs/sticky

:::

> Tips: 如果页面顶部有其他内容，可以通过 `offset-top` 属性设置吸顶时与顶部的距离。

## 切换动画

:::demo 通过 `animated` 属性可以开启切换标签内容时的转场动画。

tabs/animated

:::

## 滑动切换(移动端)

:::demo 通过 `swipeable` 属性可以开启内容滑动切换标签页。

tabs/swipeable

:::

## 滚动导航

:::demo 通过 `scrollspy` 属性可以开启滚动导航模式，该模式下，内容将会平铺展示。

tabs/scrollspy

:::

## 自定义标签页的内容

:::demo 通过 `title` 插槽可以自定义标签内容。

tabs/custom-tab

:::

## 动态增减标签页

:::demo 增减标签页按钮只能在选项卡样式的标签页下使用

tabs/dynamic-tabs

:::

## 自定义增加标签页触发器

:::demo

tabs/customized-trigger

:::

## 异步切换

:::demo 通过 `before-change` 属性可以在切换标签前执行特定的逻辑。

tabs/before-change

:::

> Tips: 通过手势滑动不会触发 before-change 属性。

## API

### Tabs Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:active | 绑定当前选中标签的标识符 | `number \| string` | `0` |
| type | 样式风格类型，可选值为 `card` | `string` | `line` |
| tab-position | 选项卡所在位置 `right/bottom/lef` | `string` | `top` |
| color | 标签主题色 | `string` | `#1989fa` |
| border | 是否显示标签栏外边框，仅在 `type="line"` 时有效 | `boolean` | `false` |
| sticky | 是否使用粘性布局 | `boolean` | `false` |
| shrink | 是否开启左侧收缩布局 | `boolean` | `false` |
| duration | 动画时间，单位秒，设置为 0 可以禁用动画 | `number \| string` | `0.3` |
| animated | 是否开启切换标签内容时的转场动画 | `boolean` | `false` |
| ellipsis | 是否省略过长的标题文字 | `boolean` | `true` |
| swipeable | 是否开启手势左右滑动切换 | `boolean` | `false` |
| scrollspy | 是否开启滚动导航 | `boolean` | `false` |
| offset-top | 粘性布局下吸顶时与顶部的距离，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | `number \| string` | `0` |
| background | 标签栏背景色 | `string` | `white` |
| lazy-render | 是否开启延迟渲染（首次切换到标签时才触发内容渲染） | `boolean` | `true` |
| line-width | 底部条宽度，默认单位 `px` | `number \| string` | `40px` |
| line-height | 底部条高度，默认单位 `px` | `number \| string` | `3px` |
| before-change | 切换标签前的回调函数，返回 `false` 可阻止切换，支持返回 Promise | `(name: number \| string) => boolean \| Promise\<boolean\>` | - |
| swipe-threshold | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 | `number \| string` | `5` |
| title-active-color | 标题选中态颜色 | `string` | - |
| title-inactive-color | 标题默认态颜色 | `string` | - |
| closable | 标签是否可关闭 | `boolean` | `false` |
| addable | 标签是否可增加 | `boolean` | `false` |
| editable | 标签是否同时可增加和关闭 | `boolean` | `false` |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click-tab | 点击标签时触发 | `{ name: string \| number, title: string, event: MouseEvent, disabled: boolean }` |
| change | 当前激活的标签改变时触发 | `name: string \| number, title: string` |
| rendered | 标签内容首次渲染时触发（仅在开启延迟渲染后触发） | `name: string \| number, title: string` |
| scroll | 滚动时触发，仅在 sticky 模式下生效 | `{ scrollTop: number, isFixed: boolean }` |

### Tabs 方法

通过 ref 可以获取到 Tabs 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| resize | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | - | - |
| scrollTo | 滚动到指定的标签页，在滚动导航模式下可用 | `name: string \| number` | - |

### Tabs Slots

| 名称       | 说明           |
| ---------- | -------------- |
| nav-left   | 标签栏左侧内容 |
| nav-right  | 标签栏右侧内容 |
| nav-bottom | 标签栏下方内容 |

### Tab Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| disabled | 是否禁用标签 | `boolean` | `false` |
| dot | 是否在标题右上角显示小红点 | `boolean` | `false` |
| badge | 图标右上角徽标的内容 | `number \| string` | - |
| name | 标签名称，作为匹配的标识符 | `number \| string` | 标签的索引值 |
| url | 点击后跳转的链接地址 | `string` | - |
| to | 点击后跳转的目标路由对象，等同于 vue-router 的 [to 属性](https://router.vuejs.org/zh/api/#to) | `string \| object` | - |
| replace | 是否在跳转时替换当前页面历史 | `boolean` | `false` |
| title-style | 自定义标题样式 | `string \| Array \| object` | - |
| title-class | 自定义标题类名 | `string \| Array \| object` | - |
| closable | 标签是否可关闭 | `boolean` | `false` |
| show-zero-badge | 当 badge 为数字 0 时，是否展示徽标 | `boolean` | `true` |

### Tab Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 标签页内容 |
| title   | 自定义标题 |

### 类型定义

组件导出以下类型定义：

```ts
import type { TabProps, TabsType, TabsProps, TabsInstance } from 'ryxon'
```

`TabsInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { TabsInstance } from 'ryxon'

const tabsRef = ref<TabsInstance>()

tabsRef.value?.scrollTo(0)
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                        | 默认值                    | 描述 |
| --------------------------- | ------------------------- | ---- |
| --r-tab-text-color          | `var(--r-gray-7)`         | -    |
| --r-tab-active-text-color   | `var(--r-text-color)`     | -    |
| --r-tab-disabled-text-color | `var(--r-text-color-3)`   | -    |
| --r-tab-font-size           | `var(--r-font-size-md)`   | -    |
| --r-tab-line-height         | `var(--r-line-height-md)` | -    |
| --r-tabs-default-color      | `var(--r-primary-color)`  | -    |
| --r-tabs-line-height        | `44px`                    | -    |
| --r-tabs-card-height        | `30px`                    | -    |
| --r-tabs-nav-background     | `var(--r-background-2)`   | -    |
| --r-tabs-bottom-bar-width   | `40px`                    | -    |
| --r-tabs-bottom-bar-height  | `3px`                     | -    |
| --r-tabs-bottom-bar-color   | `var(--r-primary-color)`  | -    |

## 常见问题

### 组件从隐藏状态切换到显示状态时，底部条位置错误？

Tabs 组件在挂载时，会获取自身的宽度，并计算出底部条的位置。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法展示底部条位置。

#### 解决方法

方法一，如果是使用 `v-show` 来控制组件展示的，则替换为 `v-if` 即可解决此问题：

```html
<!-- Before -->
<r-tabs v-show="show" />
<!-- After -->
<r-tabs v-if="show" />
```

方法二，调用组件的 resize 方法来主动触发重绘：

```html
<r-tabs v-show="show" ref="tabs" />
```

```js
this.$refs.tabs.resize()
```
