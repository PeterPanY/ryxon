---
title: Skeleton
lang: zh
---

# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 基础用法

:::demo 通过 `title` 属性显示标题占位图，通过 `row` 属性配置占位段落行数。

skeleton/basic-usage

:::

## 显示头像

:::demo 通过 `avatar` 属性显示头像占位图。

skeleton/avatar

:::

## 加载状态

:::demo 当 `Loading` 结束之后，我们往往需要显示真实的 UI， 可以通过 `loading` 属性的值来控制是否显示加载后的 DOM。 也可以通过具名插槽 `default` 来构建 loading 结束之后需要展示的真实 DOM 元素结构。

skeleton/loading

:::

## API

### Skeleton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row | 段落占位图行数 | `number \| string` | `0` |
| row-width | 段落占位图宽度，可传数组来设置每一行的宽度 | ^[enum]`number \| string \|(number \| string)[]` | `100%` |
| title | 是否显示标题占位图 | `boolean` | `false` |
| avatar | 是否显示头像占位图 | `boolean` | `false` |
| loading | 是否显示骨架屏，传 `false` 时会展示子组件内容 | `boolean` | `true` |
| animate | 是否开启动画 | `boolean` | `true` |
| round | 是否将标题和段落显示为圆角风格 | `boolean` | `false` |
| title-width | 标题占位图宽度 | `number \| string` | `40%` |
| avatar-size | 头像占位图大小 | `number \| string` | `32px` |
| avatar-shape | 头像占位图形状，可选值为 `square` | `string` | `round` |

### SkeletonParagraph Props

| 参数      | 说明                     | 类型      | 默认值  |
| --------- | ------------------------ | --------- | ------- |
| round     | 是否将段落显示为圆角风格 | `boolean` | `false` |
| row-width | 段落占位图宽度           | `string`  | `100%`  |

### SkeletonTitle Props

| 参数        | 说明                     | 类型               | 默认值  |
| ----------- | ------------------------ | ------------------ | ------- |
| round       | 是否将标题显示为圆角风格 | `boolean`          | `false` |
| title-width | 标题占位图宽度           | `number \| string` | `40%`   |

### SkeletonAvatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| avatar-size | 头像占位图大小 | `number \| string` | `32px` |
| avatar-shape | 头像占位图形状，可选值为 `square` | `string` | `round` |

### SkeletonImage Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image-size | 图片占位图大小 | `number \| string` | `32px` |
| image-shape | 图片占位图形状，可选值为 `square` | `string` | `round` |

### Skeleton Slots

| 名称     | 说明       |
| -------- | ---------- |
| default  | 骨架屏内容 |
| template | 自定义内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  SkeletonProps,
  SkeletonImageProps,
  SkeletonTitleProps,
  SkeletonImageShape,
  SkeletonAvatarShape,
  SkeletonParagraphProps
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                              | 默认值                  | 描述 |
| --------------------------------- | ----------------------- | ---- |
| --r-skeleton-paragraph-height     | `16px`                  | -    |
| --r-skeleton-paragraph-background | `var(--r-active-color)` | -    |
| --r-skeleton-paragraph-margin-top | `var(--r-padding-sm)`   | -    |
| --r-skeleton-title-width          | `40%`                   | -    |
| --r-skeleton-avatar-size          | `32px`                  | -    |
| --r-skeleton-avatar-background    | `var(--r-active-color)` | -    |
| --r-skeleton-duration             | `1.2s`                  | -    |
| --r-skeleton-image-size           | `96px`                  |
| --r-skeleton-image-radius         | `24px`                  | -    |
