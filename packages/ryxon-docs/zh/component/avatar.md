---
title: Avatar
lang: zh
---

# Avatar 头像

Avatar 组件可以用来代表人物或对象， 支持使用图片、图标或者文字作为 Avatar。

## 基础用法

:::demo 使用 `shape` 和 `size` 属性来设置 Avatar 的形状和大小。

avatar/basic

:::

## 展示类型

:::demo 支持使用图片，图标或者文字作为 Avatar。

avatar/types

:::

## 展示失败

:::demo 图片加载失败时的回退行为。

avatar/fallback

:::

## 适应容器

:::demo 当使用图片作为用户头像时，设置该图片如何在容器中展示。与[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 属性一致

avatar/fit

:::

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 设置 Avatar 的图标类型，具体参考 Icon 组件 | ^[string] / ^[Component] | — |
| size | Avatar 大小 | ^[number] / ^[enum]`'large' \| 'default' \| 'small'` | `default` |
| shape | Avatar 形状 | ^[enum]`'circle' \| 'square'` | `circle` |
| src | Avatar 图片的源地址 | `string` | — |
| src-set | 图片 Avatar 的原生 srcset 属性 | `string` | — |
| alt | 图片 Avatar 的原生 alt 属性 | `string` | — |
| fit | 当展示类型为图片的时候，设置图片如何适应容器 | ^[enum]`'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `cover` |

### Events

| 名称  | 说明               | 类型                            |
| ----- | ------------------ | ------------------------------- |
| error | 图片加载失败时触发 | ^[Function]`(e: Event) => void` |

### Slots

| Name    | Description        |
| ------- | ------------------ |
| default | 自定义头像展示内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { AvatarProps, AvatarThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-avatar-text-color | `var(--r-white)` | 文字颜色 |
| --r-avatar-bg-color | `var(--r-text-color-disabled)` | 背景颜色 |
| --r-avatar-text-size | `14px` | 文字大小 |
| --r-avatar-icon-size | `18px` | icon 图标大小 |
| --r-avatar-border-radius | `var(--r-radius-md)` | square 下圆角大小 |
| --r-avatar-size | `40px` | 图片大小 |
