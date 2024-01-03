---
title: Dynamic Tags
lang: zh
---

# Dynamic Tags 动态标签

把标签变得可以输入。

## 基础用法

:::demo

dynamic-tags/basic

:::

## 最大标签数量

:::demo

dynamic-tags/max

:::

## 自定义渲染tag

:::demo

dynamic-tags/render-tag

:::

## 自定义触发元素

:::demo

dynamic-tags/custom

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 受控模式下的值 | ^[enum]`string[] \| Array<{ label: string, value: string }>` | `[]` |
| max | tag 的最大数量 | `number` | `-` |
| tag-class | 自定义标签的类名 | `string` | `-` |
| tag-style | 自定义标签的样式 | `string \| Object` | `-` |
| tag-props | 内部 `r-tag` 组件的属性 | `TagProps` | `-` |
| render-tag | 自定义渲染 `tag` | ^[enum]`((tag: string, index: number) => VNodeChild) \| ((tag: { label: string, value: string }, index: number) => VNodeChild)` | `-` |
| disabled | 按钮是否禁用 | `boolean` | `false` |
| icon | 按钮图标名称或图片链接,等同于 `Icon` 组件的 `name` 属性 | `string/component` | `-` |
| input-class | 自定义输入框的类名 | `string` | `-` |
| input-style | 自定义输入框的样式 | `string \| Object` | `-` |
| input-props | 内部 r-input 组件的属性 | `InputProps` | `-` |
| create | 根据输入的值创造对应的选项 | ^[enum]`((label: string) => string) \| ((label: string) => ({ label: string, value: string }))` | `label => label` |

### Slots

| 名称    | 说明                       | 参数                             |
| ------- | -------------------------- | -------------------------------- |
| input   | 自定义输入元素，由用户填充 | `-`                              |
| trigger | 触发输入标签的组件或元素   | `(info: {  disabled: boolean })` |

### 方法

通过 ref 可以获取到 Dynamic Tags 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名     | 说明            | 参数                                |
| ---------- | --------------- | ----------------------------------- |
| activate   | 显示输入框      | -                                   |
| deactivate | 隐藏输入框      | -                                   |
| submit     | 确定tag显示的值 | ` (externalValue?: string) => void` |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  DynamicTagsProps,
  DynamicTagsExpose,
  DynamicTagsThemeVars
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值  | 描述 |
| ---------------------------- | ------- | ---- |
| --r-dynamic-tags-height      | `24px`  | `-`  |
| --r-dynamic-tags-input-width | `100px` | `-`  |
