---
title: Carousel
lang: zh
---

# Carousel 走马灯

<!-- ## 基础使用

:::demo

carousel/basic

:::

## 箭头

:::demo 设定 `show-arrow` 来显示箭头。

carousel/arrow

:::

## 自动播放

:::demo 设定 `autoplay` 然后它就能自己动了。

carousel/autoplay

:::

## 指示点

:::demo 设定 dot-type 来更改指示器的样式，可以使用 :show-dots="false" 来隐藏指示点。设定 dot-placement 来更改指示点的位置。

carousel/dots

:::

## 垂直

:::demo

carousel/vertical

:::

## 相邻间距

:::demo

carousel/space-between

:::

## 每屏显示数量

:::demo 需要注意，`slides-per-view` 属性会与 `loop` 冲突，如果你需要自定义每屏显示数量，那么 `loop` 功能将被禁用。

carousel/slides-per

:::

## 自动每屏显示数量

:::demo

carousel/slides-per-auto

:::

## 居中

:::demo 设定 `centered-slides` 来将所有的 `slide` 居中显示，这仅在 `effect` 为 `slide` 以及 `card` 的时候有用。

carousel/centered

::: -->

## 过渡效果

:::demo 如果你想要自定义过渡效果，可以使用 `transition-props`，并把 `effect` 设置为 `custom`。

carousel/transition

:::

<!-- ## 自定义过渡效果

:::demo 如果你想要自定义过渡效果，可以使用 `transition-props`，并把 `effect` 设置为 `custom`，具体配置见[官方文档](https://cn.vuejs.org/api/built-in-components.html#transition)。

carousel/transition-custom

:::

## 按键控制

:::demo 是否通过按键切换轮播图，只有焦点在 `Dots` 上时才有效。

carousel/keyboard

:::

## 自定义箭头以及控制点

:::demo

carousel/dots-custom

:::

## 自定义卡片效果

:::demo 你可以使用 `next-slide-style` 和 `prev-slide-style` 来调整前后卡片的比例。

carousel/card-custom

::: -->

## API

### Carousel Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoplay | 是否自动播放 | `boolean` | `false` |
| centered-slides | 是否居中显示当前页轮播图 | `boolean` | `false` |
| current-index | 当前显示页 | `number` | `undefined` |
| default-index | 默认显示页 | `number` | `0` |
| direction | 轮播图显示的方向 | `horizontal \| vertical` | `horizontal` |
| dot-placement | 轮播指示点位置 | `top \| bottom \| left \| right` | `bottom` |
| dot-type | 轮播指示点样式 | `dot \| line` | `dot` |
| draggable | 是否通过鼠标拖拽切换轮播图 | `boolean` | `false` |
| effect | 轮播图切换时的过渡效果 | `slide \| slide-alone(v1.10.1)  \| fade \| card \| custom ` | `slide` |
| interval | 自动播放的间隔（ms） | `number` | `5000` |
| keyboard | 是否通过按键切换轮播图，只有焦点在 Dots 上时才起作用 | `boolean` | `false` |
| loop | 是否循环播放 | `boolean` | `true` |
| mousewheel | 是否通过鼠标滚轮切换轮播图 | `boolean` | `false` |
| next-slide-style | 下一张轮播图的样式 | `object \| string` | `undefined` |
| prev-slide-style | 上一张轮播图的样式 | `object \| string` | `undefined` |
| slides-per-view | 每一页显示的轮播图数量 | `'auto' \| number` | `1` |
| slides-per-blocks | 滑动的数量，只在 slides-per-view 不为 1 时生效 | `number` | `1` |
| space-between | 轮播图之间的间距 | `number` | `0` |
| show-arrow | 是否显示箭头按钮 | `boolean` | `false` |
| show-dots | 是否展示指示点 | `boolean` | `true` |
| touchable | 是否通过触摸拖拽切换轮播图 | `boolean` | `true` |
| lazy-render | 是否延迟渲染未展示的轮播，slides-per-view 为 auto 时延迟渲染无效 | `boolean` | `false` |
| transition-style | transition-style | `{ transitionDuration?: string, transitionTimingFunction?: string }` | `{ transitionDuration: '300ms' }` |
| transition-props | 自定义过渡效果属性[官方文档](https://cn.vuejs.org/api/built-in-components.html#transition) | `TransitionProps` | `undefined` |
| trigger | 触发切换的方式 | `click \| hover` | `click` |

### Carousel Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 轮播的内容 | `-` |
| arrow | 箭头 | ` (info: { total: number, currentIndex: number, to: (index: number) => void, prev: () => void, next: () => void })` |
| dots | 指示点 | `(info: { total: number, currentIndex: number, to: (index: number) => void })` |

### Carousel Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 轮播发生改变时触发 | `currentIndex: number, lastIndex: number` |
| item-click | 滑动块点击事件，transition 动效、滑块拖拽不触发 | `index:number` |

### Carousel Methods

| 方法名          | 说明         | 参数                      | 返回值 |
| --------------- | ------------ | ------------------------- | ------ |
| getCurrentIndex | 获取当前页   | `() => number`            | -      |
| to              | 滑动至某一页 | `(index: number) => void` | -      |
| prev            | 滑动至前一页 | `() => void`              | -      |
| next            | 滑动至后一页 | `() => void`              | -      |
| stopAutoplay    | 停止自动轮播 | `() => void`              | -      |
| resetAutoplay   | 重置自动轮播 | `() => void`              | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type { CarouselProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                               | 默认值                         | 描述 |
| ---------------------------------- | ------------------------------ | ---- |
| --r-carousel-bezier                | `cubic-bezier(0.4, 0, 0.2, 1)` | -    |
| --r-carousel-dot-color             | `rgba(255, 255, 255, 0.3)`     | -    |
| --r-carousel-dot-color-focus       | `rgba(255, 255, 255, 0.5)`     | -    |
| --r-carousel-dot-color-active      | `rgba(255, 255, 255, 1)`       | -    |
| --r-carousel-dot-size              | `8px`                          | -    |
| --r-carousel-dot-line-width        | `16px`                         | -    |
| --r-carousel-dot-line-width-active | `24px`                         | -    |
| --r-carousel-arrow-color           | `#eee`                         | -    |
