---
title: ColorPicker
lang: zh
---

# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 基础用法

:::demo 使用 v-model 与 Vue 实例中的一个变量进行双向绑定，绑定的变量需要是字符串类型。

color-picker/basic

:::

## 选择透明度

:::demo ColorPicker 支持普通颜色，也支持带 Alpha 通道的颜色，通过`show-alpha`属性即可控制是否支持透明度的选择。 要启用 Alpha 选择，只需添加 `show-alpha` 属性。

color-picker/alpha

:::

## 预定义颜色

:::demo `ColorPicker` 支持预定义颜色

color-picker/predefined-color

:::

## 不同尺寸

:::demo

color-picker/sizes

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | ^[string] | — |
| disabled | 是否禁用 | ^[boolean] | false |
| size | 尺寸 | ^[enum]`'large' \| 'default' \| 'small'` | — |
| show-alpha | 是否支持透明度选择 | ^[boolean] | false |
| color-format | 写入 v-model 的颜色的格式 | ^[enum]`'hsl' \| 'hsv' \| 'hex' \| 'rgb' \| 'hex' (当 show-alpha 为 false) \| 'rgb' (当 show-alpha 为 true)` | — |
| popper-class | ColorPicker 下拉框的类名 | ^[string] | — |
| predefine | 预定义颜色 | ^[object]`string[]` | — |
| tabindex | ColorPicker 的 tabindex | ^[string] / ^[number] | 0 |
| id | ColorPicker 的 id | ^[string] | — |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 当绑定值变化时触发 | ^[Function]`(value: string) => void` |
| active-change | 面板中当前显示的颜色发生改变时触发 | ^[Function]`(value: string) => void` |

### 方法

通过 ref 可以获取到 ColorPicker 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 名称  | 说明               | 类型                    |
| ----- | ------------------ | ----------------------- |
| color | 当前色彩对象       | ^[object]`Color`        |
| show  | 手动显示颜色选择器 | ^[Function]`() => void` |
| hide  | 手动隐藏颜色选择器 | ^[Function]`() => void` |

### 类型定义

组件导出以下类型定义：

```ts
import type { ColorPickerProps, ColorPickerInstance } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                        | 默认值        | 描述             |
| --------------------------- | ------------- | ---------------- |
| --r-color-picker-width      | `32px`        | 颜色选择器的宽度 |
| --r-color-picker-height     | `32px`        | 颜色选择器的高度 |
| --r-color-picker-alpha-bg-a | `#ccc`        | -                |
| --r-color-picker-alpha-bg-b | `transparent` | -                |
