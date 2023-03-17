---
title: ImagePreview
lang: zh
---

# ImagePreview 图片预览

图片放大预览，支持组件调用和函数调用两种方式。

## 函数调用

为了便于使用 `ImagePreview`，`Ryxon` 提供了一系列辅助函数，通过辅助函数可以快速唤起全局的图片预览组件。

比如使用 `showImagePreview` 函数，调用后会直接在页面中渲染对应的图片预览组件。

:::demo

image-preview/basic

:::

## 使用 ImagePreview 组件

:::demo 如果需要在 ImagePreview 内嵌入组件或其他自定义内容，可以直接使用 ImagePreview 组件，并使用 `index` 插槽进行定制。使用前需要通过 `app.use` 等方式注册组件。

image-preview/comp

:::

## 使用 image 插槽

:::demo 当以组件调用的方式使用 ImagePreview 时，可以通过 `image` 插槽来插入自定义的内容，比如展示一个视频内容。

image-preview/solts

:::

## API

### 方法

Ryxon 中导出了以下 ImagePreview 相关的辅助函数：

| 方法名 | 说明 | 参数 | 返回值 |  |
| --- | --- | --- | --- | --- |
| showImagePreview | 展示图片预览 | `string[] | ImagePreviewOptions` | imagePreview 实例 |

### ImagePreviewOptions

调用 `showImagePreview` 方法时，支持传入以下选项：

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loop | 是否开启循环播放 | `boolean` | `true` |
| images | 需要预览的图片 URL 数组 | `string[]` | `[]` |
| minZoom | 手势缩放时，最小缩放比例 | `number \| string` | `1/3` |
| maxZoom | 手势缩放时，最大缩放比例 | `number \| string` | `3` |
| closeable | 是否显示关闭图标 | `boolean` | `false` |
| showIndex | 是否显示页码 | `boolean` | `true` |
| className | 自定义类名 | `string \| Array \| object` | - |
| closeIcon | 关闭图标名称或图片链接 | `string` | `clear` |
| transition | 动画类名，等价于 [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition) 的 `name` 属性 | `string` | `r-fade` |
| beforeClose | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | `(active: number) => boolean \| Promise\<boolean\>` | - |
| overlayClass | 自定义遮罩层类名 | `string \| Array \| object` | - |
| overlayStyle | 自定义遮罩层样式 | `object` | - |
| swipeDuration | 动画时长，单位为 `ms` | `number \| string` | `300` |
| startPosition | 图片预览起始位置索引 | `number \| string` | `0` |
| indicatorPosition | 指示器的位置，可选`` | `string` | `none` |
| showArrow | 切换箭头的显示时机，可选`hover/never` | `string` | `always` |
| closeOnPopstate | 是否在页面回退时自动关闭 | `boolean` | `true` |
| closeIconPosition | 关闭图标位置，可选值为 `top-left`<br>`bottom-left` `bottom-right` | `string` | `top-right` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://v3.cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | - |
| showTool | 是否显示操作栏 | `boolean` | `true` |
| zoomRate | 缩放事件的缩放速度 | `number` | `0.2` |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭 Image Viewer | `Boolean` | `true` |
| onClose | 关闭时的回调函数 | `Function` | - |
| onChange | 切换图片时的回调函数，回调参数为当前索引 | `Function` | - |
| onScale | 缩放图片时的回调函数，回调参数为当前索引和当前缩放值组成的对象 | `Function` | - |

### Props

通过组件调用 `ImagePreview` 时，支持以下 Props：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:show | 是否展示图片预览 | `boolean` | `false` |
| loop | 是否开启循环播放 | `boolean` | `true` |
| images | 需要预览的图片 URL 数组 | `string[]` | `[]` |
| min-zoom | 手势缩放时，最小缩放比例 | `number \| string` | `1/3` |
| max-zoom | 手势缩放时，最大缩放比例 | `number \| string` | `3` |
| closeable | 是否显示关闭图标 | `boolean` | `false` |
| show-index | 是否显示页码 | `boolean` | `true` |
| class-name | 自定义类名 | `string \| Array \| object` | - |
| close-icon | 关闭图标名称或图片链接 | `string` | `clear` |
| transition | 动画类名，等价于 [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition) 的 `name` 属性 | `string` | `r-fade` |
| before-close | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | `(active: number) => boolean \| Promise\<boolean\>` | - |
| overlay-class | 自定义遮罩层类名 | `string \| Array \| object` | - |
| overlay-style | 自定义遮罩层样式 | `object` | - |
| swipe-duration | 动画时长，单位为 ms | `number \| string` | `300` |
| start-position | 图片预览起始位置索引 | `number \| string` | `0` |
| indicator-position | 指示器的位置，可选`` | `string` | `none` |
| show-arrow | 切换箭头的显示时机，可选`hover/never` | `string` | `always` |
| close-on-popstate | 是否在页面回退时自动关闭 | `boolean` | `true` |
| close-icon-position | 关闭图标位置，可选值为 `top-left`<br>`bottom-left` `bottom-right` | `string` | `top-right` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://v3.cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | - |
| show-tool | 是否显示操作栏 | `boolean` | `true` |
| zoom-rate | 缩放事件的缩放速度 | `number` | `0.2` |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Image Viewer | `Boolean` | `true` |

### Events

通过组件调用 `ImagePreview` 时，支持以下事件：

| 事件       | 说明                   | 回调参数                           |
| ---------- | ---------------------- | ---------------------------------- |
| close      | 关闭时触发             | `{ index: number, url: string }`   |
| closed     | 关闭且且动画结束后触发 | -                                  |
| change     | 切换当前图片时触发     | `index: number`                    |
| scale      | 缩放当前图片时触发     | `{ index: number, scale: number }` |
| long-press | 长按当前图片时触发     | `{ index: number }`                |

### 方法

通过组件调用 `ImagePreview` 时，通过 ref 可以获取到 ImagePreview 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| swipeTo | 切换到指定位置 | `index: number, options?: SwipeToOptions` | - |

### Slots

通过组件调用 `ImagePreview` 时，支持以下插槽：

| 名称  | 说明                           | 参数                      |
| ----- | ------------------------------ | ------------------------- |
| index | 自定义页码内容                 | { index: 当前图片的索引 } |
| cover | 自定义覆盖在图片预览上方的内容 | -                         |
| image | 自定义图片内容                 | { src: 当前资源地址 }     |

### onClose 回调参数

| 参数名 | 说明             | 类型     |
| ------ | ---------------- | -------- |
| url    | 当前图片 URL     | `string` |
| index  | 当前图片的索引值 | `number` |

### onScale 回调参数

| 参数名 | 说明             | 类型     |
| ------ | ---------------- | -------- |
| index  | 当前图片的索引值 | `number` |
| scale  | 当前图片的缩放值 | `number` |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  ImagePreviewProps,
  ImagePreviewOptions,
  ImagePreviewInstance,
  ImagePreviewScaleEventParams
} from 'ryxon'
```

`ImagePreviewInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { ImagePreviewInstance } from 'ryxon'

const imagePreviewRef = ref<ImagePreviewInstance>()

imagePreviewRef.value?.swipeTo(1)
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                                 | 默认值                      | 描述 |
| ------------------------------------ | --------------------------- | ---- |
| --r-image-preview-index-text-color   | `var(--r-white)`            | -    |
| --r-image-preview-index-font-size    | `var(--r-font-size-md)`     | -    |
| --r-image-preview-index-line-height  | `var(--r-line-height-md)`   | -    |
| --r-image-preview-index-text-shadow  | `0 1px 1px var(--r-gray-8)` | -    |
| --r-image-preview-overlay-background | `rgba(0, 0, 0, 0.9)`        | -    |
| --r-image-preview-close-icon-size    | `22px`                      | -    |
| --r-image-preview-close-icon-color   | `var(--r-gray-5)`           | -    |
| --r-image-preview-close-icon-margin  | `var(--r-padding-md)`       | -    |
| --r-image-preview-close-icon-z-index | `1`                         | -    |

## 常见问题

### 引用 showImagePreview 时出现编译报错？

如果引用 `showImagePreview` 方法时出现以下报错，说明项目中使用了 `babel-plugin-import` 插件，导致代码被错误编译。

```bash
These dependencies were not found:

* ryxon/es/show-image-preview in ./src/xxx.js
* ryxon/es/show-image-preview/style in ./src/xxx.js
```

Ryxon 不支持 `babel-plugin-import` 插件，请参考 [快速开始](/zh/guide/quickstart.html#babel-plugin-import) 移除该插件。
