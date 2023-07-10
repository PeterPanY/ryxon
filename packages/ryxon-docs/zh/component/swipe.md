---
title: Swipe
lang: zh
---

# Swipe 轮播图

用于循环播放一组图片或内容。

## 基础用法

:::demo 每个 `SwipeItem` 代表一张轮播卡片，可以通过 `autoplay` 属性设置自动轮播的间隔。默认情况下，在鼠标 `hover` 底部的指示器时就会触发切换。 通过设置 `trigger` 属性为 `click`，可以达到点击触发的效果。

swipe/basic

:::

## 懒加载

:::demo 当 Swipe 中含有图片时，可以通过 `lazy-render` 属性来开启懒加载模式。在懒加载模式下，只会渲染当前页和下一页。

swipe/lazy

:::

## 纵向滚动

:::demo 设置 `vertical` 属性后滑块会纵向排列，此时需要指定滑块容器的高度。

swipe/vertical

:::

## 自定义滑块大小(移动端事件)

:::demo 滑块默认宽度为 `100%`，可以通过 `width` 属性设置单个滑块的宽度。纵向滚动模式下，可以通过 `height` 属性设置单个滑块的高度。

swipe/custom

:::

:::tip

目前不支持在循环滚动模式下自定义滑块大小，因此需要将 loop 设置为 false。

:::

## 自定义指示器

:::demo 通过 `indicator` 插槽可以自定义指示器的样式。

swipe/indicator

:::

## API

### Swipe Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loop | 是否开启循环播放 | `boolean` | `true` |
| width | 滑块宽度，单位为 `px` | `number \| string` | `auto` |
| height | 滑块高度，单位为 `px` | `number \| string` | `auto` |
| vertical | 是否为纵向滚动 | `boolean` | `false` |
| autoplay | 自动轮播间隔，单位为 ms | `number \| string` | - |
| duration | 动画时长，单位为 ms | `number \| string` | `500` |
| touchable | 是否可以通过手势滑动 | `boolean` | `true` |
| lazy-render | 是否延迟渲染未展示的轮播 | `boolean` | `false` |
| initial-swipe | 初始位置索引值 | `number \| string` | `0` |
| indicator-color | 指示器颜色 | `string` | `#1989fa` |
| stop-propagation | 是否阻止滑动事件冒泡 | `boolean` | `true` |
| trigger | 指示器的触发方式，可选`click` | `string` | `hover` |
| arrow | 切换箭头的显示时机，可选`always/never` | `string` | `hover` |
| pause-on-hover | 鼠标悬浮时暂停自动切换 | `boolean` | `true` |
| indicator-position | 指示器的位置，可选`none` | `string` | `-` |

### Swipe Events

| 事件名     | 说明                         | 回调参数            |
| ---------- | ---------------------------- | ------------------- |
| change     | 每一页轮播结束后触发         | `index: number`     |
| drag-start | 当用户开始拖动轮播组件时触发 | `{ index: number }` |
| drag-end   | 当用户结束拖动轮播组件时触发 | `{ index: number }` |

### SwipeItem Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | `event: MouseEvent` |

### Swipe 方法

通过 ref 可以获取到 Swipe 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| prev | 切换到上一轮播 | - | - |
| next | 切换到下一轮播 | - | - |
| swipeTo | 切换到指定位置 | `index: number, options: SwipeToOptions` | - |
| startAutoplay | 开启自动轮播 | - | - |
| stopAutoplay | 停止自动轮播 | - | - |
| resize | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | - | - |

### 类型定义

组件导出以下类型定义：

```ts
import type { SwipeProps, SwipeInstance, SwipeToOptions } from 'ryxon'
```

`SwipeInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { SwipeInstance } from 'ryxon'

const swipeRef = ref<SwipeInstance>()

swipeRef.value?.next()
```

### SwipeToOptions 格式

| 名称      | 说明         | 类型      |
| --------- | ------------ | --------- |
| immediate | 是否跳过动画 | `boolean` |

### Swipe Slots

| 名称      | 说明         | 参数                                |
| --------- | ------------ | ----------------------------------- |
| default   | 轮播内容     | -                                   |
| indicator | 自定义指示器 | `{ active: number, total: number }` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                                    | 默认值                   | 描述 |
| --------------------------------------- | ------------------------ | ---- |
| --r-swipe-arrow-size                    | `36px`                   | -    |
| --r-swipe-arrow-font-size               | `12px`                   | -    |
| --r-swipe-arrow-background              | `rgba(31, 45, 61, 0.11)` | -    |
| --r-swipe-arrow-hover-background        | `rgba(31, 45, 61, 0.23)` | -    |
| --r-swipe-indicator-size                | `6px`                    | -    |
| --r-swipe-indicator-margin              | `var(--r-padding-sm)`    | -    |
| --r-swipe-indicator-active-opacity      | `1`                      | -    |
| --r-swipe-indicator-inactive-opacity    | `0.3`                    | -    |
| --r-swipe-indicator-active-background   | `var(--r-primary-color)` | -    |
| --r-swipe-indicator-inactive-background | `var(--r-border-color)`  | -    |

## 常见问题

### 滑动轮播时为什么触发了 click 事件？

这种情况通常是由于项目中引入了 `fastclick` 库导致的。`fastclick` 的原理是通过 Touch 事件模拟出 click 事件，而 Swipe 内部默认会阻止 touchmove 事件冒泡，干扰了 fastclick 的判断，导致出现这个问题。

将 Swipe 组件的 stop-propagation 属性设置为 false 即可避免该问题。

### 在桌面端无法操作组件？

参见[桌面端适配](/zh/guide/advanced-usage.html#桌面端适配)。

### Swipe 组件功能太少，无法实现复杂效果？

Ryxon 中的 Swipe 组件是比较轻量的，因此功能也比较基础。如果需要更复杂的轮播效果，推荐使用社区里一些优质的轮播库，比如 [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)。

### 组件从隐藏状态切换到显示状态时，无法正确渲染？

Swipe 组件在挂载时，会获取自身的宽度，并计算出轮播图的位置。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法正确计算位置。

#### 解决方法

方法一，如果是使用 `v-show` 来控制组件展示的，则替换为 `v-if` 即可解决此问题：

```html
<!-- Before -->
<r-swipe v-show="show" />
<!-- After -->
<r-swipe v-if="show" />
```

方法二，调用组件的 resize 方法来主动触发重绘：

```html
<r-swipe v-show="show" ref="swipe" />
```

```js
this.$refs.swipe.resize()
```
