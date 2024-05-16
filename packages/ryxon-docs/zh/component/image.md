---
title: Image
lang: zh
---

# Image 图片

增强版的 `img` 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。

## 基础用法

:::demo 可通过 `fit` 确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

image/basic

:::

## 图片位置

:::demo 通过 `position` 属性可以设置图片位置，结合 `fit` 属性使用，等同于原生的 [object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position) 属性。

image/position

:::

## 图片懒加载

:::demo 设置 `lazy-load` 属性来开启图片懒加载，需要搭配自定义指令 `Lazyload` 组件使用。

image/lazy

:::

## 加载中提示

:::demo `Image` 组件提供了默认的加载中提示，支持通过 `loading` 插槽自定义内容。

image/loading

:::

## 加载失败提示

:::demo `Image` 组件提供了默认的加载失败提示，支持通过 `error` 插槽自定义内容。

image/error

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片链接 | `string` | - |
| fit | 图片填充模式，等同于原生的 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) 属性 | `string` | `fill` |
| position | 图片位置，等同于原生的 [object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position) 属性，可选值为 `top` `right` `bottom` `left` 或 `string` | `string` | `center` |
| alt | 替代文本 | `string` | - |
| width | 宽度，默认单位为 `px` | `number \| string` | - |
| height | 高度，默认单位为 `px` | `number \| string` | - |
| radius | 圆角大小，默认单位为 `px` | `number \| string` | `0` |
| round | 是否显示为圆形 | `boolean` | `false` |
| block | 是否将根节点设置为块级元素，默认情况下为 `inline-block` 元素 | `boolean` | `false` |
| lazy-load | 是否开启图片懒加载，须配合 `Lazyload` 组件使用 | `boolean` | `false` |
| show-error | 是否展示图片加载失败提示 | `boolean` | `true` |
| show-loading | 是否展示图片加载中提示 | `boolean` | `true` |
| error-icon | 失败时提示的图标名称或图片链接，等同于 Icon 组件的 `name 属性` | `string` | `photo-fail` |
| loading-icon | 加载时提示的图标名称或图片链接，等同于 Icon 组件的 `name 属性` | `string` | `photo` |
| icon-size | 加载图标和失败图标的大小 | `number \| string` | `32px` |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 `class-prefix 属性` | `string` | `r-icon` |
| crossorigin | 等同于原生的 [crossorigin](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/crossOrigin) 属性 | `string` | - |
| referrerpolicy | 等同于原生的 [referrerpolicy](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/referrerPolicy) 属性 | `string` | - |

### 图片填充模式

| 名称       | 含义                                                   |
| ---------- | ------------------------------------------------------ |
| contain    | 保持宽高缩放图片，使图片的长边能完全显示出来           |
| cover      | 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边 |
| fill       | 拉伸图片，使图片填满元素                               |
| none       | 保持图片原有尺寸                                       |
| scale-down | 取 `none` 或 `contain` 中较小的一个                    |

### Events

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| click  | 点击图片时触发     | `event: MouseEvent` |
| load   | 图片加载完毕时触发 | `event: Event`      |
| error  | 图片加载失败时触发 | -                   |

### Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 自定义图片下方的内容       |
| loading | 自定义加载中的提示内容     |
| error   | 自定义加载失败时的提示内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { ImageFit, ImagePosition, ImageProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                             | 默认值                  | 描述 |
| -------------------------------- | ----------------------- | ---- |
| --r-image-placeholder-text-color | `var(--r-text-color-2)` | -    |
| --r-image-placeholder-font-size  | `var(--r-font-size-md)` | -    |
| --r-image-placeholder-background | `var(--r-background)`   | -    |
| --r-image-loading-icon-size      | `32px`                  | -    |
| --r-image-loading-icon-color     | `var(--r-gray-4)`       | -    |
| --r-image-error-icon-size        | `32px`                  | -    |
| --r-image-error-icon-color       | `var(--r-gray-4)`       | -    |

## 常见问题

### 如何引用本地图片？

在 `.vue` 文件中通过相对路径引用本地图片时，需要在图片的链接外包上一层 `require()`，将图片 URL 转换为 webpack 模块请求，并结合 [file-loader](https://github.com/webpack-contrib/file-loader) 或者 [url-loader](https://github.com/webpack-contrib/url-loader) 进行处理。

```html
<!-- 错误写法 -->
<r-image src="./image.png" />

<!-- 正确写法 -->
<r-image :src="require('./image.png')" />
```

> 对此更详细的解释可以参考 vue-loader 的[处理资源路径](https://vue-loader.vuejs.org/zh/guide/asset-url.html)章节。

### 使用 image 标签无法渲染？

使用 Image 组件时，可能会遇到将 `<image>` 作为标签名时无法渲染的问题，比如下面的写法：

```html
<template>
  <image src="xxx" />
</template>

<script>
import { Image } from 'ryxon';

export default {
  components: {
    Image,
  },
};
<script>
```

这是因为 `<image>` 标签是原生的 SVG 标签，Vue 不允许将原生标签名注册为组件名，使用 `<r-image>` 即可规避这个问题。
