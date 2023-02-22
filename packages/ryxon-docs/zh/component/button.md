---
title: Button
lang: zh
---

# Button

按钮用于触发一个操作，如提交表单。

## 基础用法

:::demo 使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

button/basic

:::

## 禁用状态

:::demo 使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

button/disabled

:::

## 链接按钮

:::demo 可以通过 `url` 属性进行 URL 跳转，或通过 `to` 属性进行路由跳转。

button/link

:::

## 文字按钮

:::demo 没有边框和背景色的按钮。

button/text

:::

## 图标按钮

:::demo 使用 `icon` 属性来为按钮添加图标。 您可以在我们的 Icon 组件中找到所需图标。 通过向右方添加 `<r-icon>` 标签来添加图标， 你也可以使用自定义图标。

button/icon

:::

## 按钮组

:::demo 使用 `<r-button-group>` 对多个按钮分组。

button/group

:::

## 加载状态按钮

:::demo 通过 `loading` 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过 `loading-text` 设置加载状态下的文字。

button/loading

:::

## 按钮尺寸

:::demo 使用 `size` 属性额外配置尺寸

button/size

:::

## 自定义颜色

:::demo 通过 `color` 属性可以自定义按钮的颜色。

button/custom

:::

## Api

### Button Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | string | `primary success warning danger info` | `-` |
| size | 尺寸 | string | `'large' / 'default' / 'small'` | `—` |
| text | 按钮文字/是否为文字按钮 | `string/boolean` | `-` | `-` |
| bg | 是否显示文字按钮背景颜色 | `boolean` | `-` | `false` |
| color | 按钮颜色 | `string` | `-` | `-` |
| icon | 左侧图标名称或图片链接,等同于 `Icon` 组件的 `name` 属性 | `string/component` | `-` | `-` |
| icon-prefix | 图标类名前缀，等同于 `Icon` 组件的 `class-prefix` 属性 | `string` | `-` | `r-icon` |
| icon-position | 图标展示位置 | `string` | `left / right` | `left` |
| tag | 按钮根节点的 HTML 标签 | `string` | `标签` | `div` |
| native-type | 原生 button 标签的 type 属性 | `string` | `标签` | `button` |
| plain | 是否为朴素按钮 | `boolean` | `-` | `false` |
| round | 是否为圆角按钮 | `boolean` | `-` | `false` |
| circle | 是否为圆形按钮 | `boolean` | `-` | `false` |
| link | 是否为链接按钮 | `boolean` | `-` | `false` |
| url | 点击后跳转的链接地址 | `string` | `-` | `-` |
| to | 点击后跳转的目标路由对象，等同于 vue-router 的 to 属性 | `string / object` | `-` | `-` |
| replace | 是否在跳转时替换当前页面历史 | `boolean` | `-` | `false` |
| disabled | 是否禁用按钮 | `boolean` | `-` | `false` |
| loading | 是否显示为加载状态 | `boolean` | `-` | `false` |
| loading-text | 加载状态提示文字 | `string` | `-` | `-` |
| loading-type | 加载图标类型 | `string` | `spinner / circular` | `circular` |
| loading-size | 加载图标大小，默认单位为 px | `number / string` | `-` | `20px` |

### Button Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮内容       |
| icon    | 自定义图标     |
| loading | 自定义加载图标 |

### Button Group Props

| 参数 | 说明 | 类型   | 可选值                                | 默认值 |
| ---- | ---- | ------ | ------------------------------------- | ------ |
| type | 类型 | string | `primary success warning danger info` | `-`    |
| size | 尺寸 | string | `'large' / 'default' / 'small'`       | `—`    |

### Button Group Slots

| 名称    | 说明             | 子标签 |
| ------- | ---------------- | ------ |
| default | 自定义按钮组内容 | Button |

### 类型定义

组件导出以下类型定义：

```ts
export type {
  ButtonType,
  ButtonSize,
  ButtonThemeVars,
  ButtonNativeType,
  ButtonIconPosition
} from './types'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 `ConfigProvider 组件`

| 名称                             | 默认值                             | 描述 |
| -------------------------------- | ---------------------------------- | ---- |
| --r-button-font-weight           | `var(--r-font-weight-primary)`     | -    |
| --r-button-border-color          | `var(--r-border-color)`            | -    |
| --r-button-bg-color              | `var(--r-fill-color-blank)`        | -    |
| --r-button-text-color            | `var(--r-text-color-regular)`      | -    |
| --r-button-disabled-text-color   | `var(--r-disabled-text-color)`     | -    |
| --r-button-disabled-bg-color     | `var(--r-fill-color-blank)`        | -    |
| --r-button-disabled-border-color | `var(--r-border-color-light)`      | -    |
| --r-button-divide-border-color   | `rgba(255, 255, 255, 0.5)`         | -    |
| --r-button-hover-text-color      | `var(--r-primary-color)`           | -    |
| --r-button-hover-bg-color        | `var(--r-primary-color-light-9)`   | -    |
| --r-button-hover-border-color    | `var(--r-primary-color-light-7)`   | -    |
| --r-button-active-text-color     | `var(--r-button-hover-text-color)` | -    |
| --r-button-active-border-color   | `var(--r-primary-color)`           | -    |
| --r-button-active-bg-color       | `var(--r-button-hover-bg-color)`   | -    |
| --r-button-outline-color         | `var(--r-primary-color-light-5)`   | -    |
| --r-button-hover-link-text-color | `var(--r-info-color)`              | -    |
| --r-button-active-color          | `var(--r-text-color-primary)`      | -    |
| --r-button-loading-icon-size     | `20px`                             | -    |
