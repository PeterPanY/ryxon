---
title: Watermark
lang: zh
---

# Watermark 水印

在页面上添加特定的文字或图案作为水印，可用于防止信息盗用。

## 图片水印

:::demo 通过 `image` 属性来设置水印图片，并使用 `opacity` 来调整水印的整体透明度。

watermark/image

:::

## 自定义间隔

:::demo 通过 `gap-x` 和 `gap-y` 属性来控制多个重复水印之间的间隔。

watermark/gap

:::

## 自定义倾斜角度

:::demo 通过 `rotate` 属性来控制水印的倾斜角度，默认值为`-22`。

watermark/rotate

:::

## 显示范围

:::demo 通过 `full-page` 属性来控制水印的显示范围。

watermark/full-page

:::

## HTML 水印

:::demo 通过 `content` 插槽可以直接传入 HTML 作为水印。HTML 中的样式仅支持行内样式，同时不支持传入自闭合标签。

watermark/html

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 水印宽度 | `number` | `100` |
| height | 水印高度 | `number` | `100` |
| z-index | 水印的 z-index | `number \| string` | `100` |
| content | 文字水印的内容 | `string` | - |
| image | 图片水印的内容，如果与 `content` 同时传入，优先使用图片水印 | `string` | - |
| rotate | 水印的旋转角度 | `number \| string` | `-22` |
| full-page | 水印是否全屏显示 | `boolean` | `false` |
| gap-x | 水印之间的水平间隔 | `number` | `0` |
| gap-y | 水印之间的垂直间隔 | `number` | `0` |
| text-color | 文字水印的颜色 | `string` | `#dcdee0` |
| opacity | 水印的透明度 | `number \| string` | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| content | HTML 水印的内容，仅支持行内样式，同时不支持传入自闭合标签，优先级高于 `content` 或 `image` 属性 |

### 类型定义

组件导出以下类型定义：

```ts
import type { WaterProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                  | 默认值 | 描述                  |
| --------------------- | ------ | --------------------- |
| --r-watermark-z-index | `100`  | 根节点的 z-index 层级 |
