---
title: RollingText
lang: zh
---

# RollingText 翻滚文本动效

文本翻滚动效，可以翻滚数字和其他类型文本。请升级 ryxon 到 >= 1.12.0 版本来使用该组件。

## 基础用法

:::demo 你可以通过 start-num 设置起始数值，target-num 设置目标数值。RollingText 组件会自动开始动画，从起始数值翻滚到目标数值。

rolling-text/basic

:::

## 设置翻滚方向

:::demo 你可以通过 direction 属性设置数字的翻滚方向，默认为向下翻滚，设置为 up 即可向上翻滚。

rolling-text/direction

:::

## 设置各数位停止顺序

:::demo 你可以通过 stop-order 属性设置动画各个数位的停止先后顺序。默认先停止高位，设置为 rtl 可以先从个位停止。

rolling-text/stop-order

:::

## 翻转非数字内容

:::demo 你可以使用 text-list 属性设置非数字内容的翻转。组件会从数组的第一项翻转到最后一项，请确保数组长度大于等于 2，以及每一项的长度一致。

rolling-text/text

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| start-num | 起始数值 | `number` | `0` |
| target-num | 目标数值 | `number` | - |
| text-list | 内容数组，用于翻转非数字内容 | `string[]` | `[]` |
| duration | 动画时长，单位为秒 | `number` | `2` |
| direction | 文本翻滚方向，值为 `down` 和 `up` | `string` | `down` |
| auto-start | 是否自动开始动画 | `boolean` | `true` |
| stop-order | 各个数位动画停止先后顺序，值为 `ltr` 和 `rtl` | `string` | `ltr` |
| height | 数字高度，单位为 `px` | `number` | `40` |

### 方法

通过 ref 可以获取到 RollingText 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| start  | 开始动画 | -    | -      |
| reset  | 重置动画 | -    | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  RollingTextProps,
  RollingTextInstance,
  RollingTextDirection,
  RollingTextStopOrder
} from 'ryxon'
```

`RollingTextInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { RollingTextInstance } from 'ryxon'

const rollingTextRef = ref<RollingTextInstance>()

rollingTextRef.value?.start()
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-rolling-text-background | `inherit` | 单个数位背景色 |
| --r-rolling-text-color | `var(--r-text-color)` | 数字颜色 |
| --r-rolling-text-font-size | `var(--r-font-size-md)` | 字体大小 |
| --r-rolling-text-gap | `0px` | 数位之间的间隔 |
| --r-rolling-text-item-width | `15px` | 单个数位宽度 |
| --r-rolling-text-item-border-radius | `0px` | 单个数位边框圆角 |
