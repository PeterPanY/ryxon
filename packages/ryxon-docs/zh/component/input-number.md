---
title: InputNumber
lang: zh
---

# InputNumber 数字输入框

输入数字就用它

## 基础用法

:::demo 通过 `v-model` 绑定输入值，可以通过 `change` 事件监听到输入值的变化。

input-number/basic

:::

## 禁用状态

:::demo 通过设置 `disabled` 属性来禁用步进器，禁用状态下无法点击按钮或修改输入框。

input-number/disabled

:::

## 禁用输入框

:::demo 通过设置 `disable-input` 属性来禁用输入框，此时按钮仍然可以点击。

input-number/disable-input

:::

## 步长设置

- 通过 `step` 属性设置每次点击增加或减少按钮时变化的值，默认为 `1`。
- 严格模式：`step-strictly` 属性接受一个 `Boolean。` 如果这个属性被设置为 `true`，则只能输入步进的倍数。

:::demo

input-number/step

:::

## 限制输入

- 通过 `min` 和 `max` 属性限制输入值的范围，默认超出范围后会自动校正最大值或最小值，通过 `auto-fixed` 可以关闭自动校正。
- 设置 `integer` 属性后，输入框将限制只能输入整数。
- 通过设置 `decimal-length` 属性可以保留固定的小数位数。

:::demo

input-number/limit

:::

## 自定义大小

:::demo 通过 `input-width` 属性设置输入框宽度，通过 `button-size` 属性设置按钮大小和输入框高度。

input-number/sizes

:::

## 主题风格

:::demo 将 `theme` 设置为 `round` 来展示圆角风格的步进器。

input-number/theme

:::

## 异步变更

:::demo 通过 `before-change` 属性可以在输入值变化前进行校验和拦截。

input-number/before-change

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前输入的值 | `number \| string` | - |
| min | 最小值 | `number \| string` | `1` |
| max | 最大值 | `number \| string` | - |
| name | 标识符，通常为一个唯一的字符串或数字，可以在 `change` 事件回调参数中获取 | `number \| string` | - |
| step | 步长，每次点击时改变的值 | `number \| string` | `1` |
| theme | 样式风格，可选值为 `round` | `string` | - |
| integer | 是否只允许输入整数 | `boolean` | `false` |
| disabled | 是否禁用步进器 | `boolean` | `false` |
| show-plus | 是否显示增加按钮 | `boolean` | `true` |
| show-minus | 是否显示减少按钮 | `boolean` | `true` |
| show-input | 是否显示输入框 | `boolean` | `true` |
| long-press | 是否开启长按手势，开启后可以长按增加和减少按钮 | `boolean` | `true` |
| auto-fixed | 是否自动校正超出限制范围的数值，设置为 `false` 后输入超过限制范围的数值将不会自动校正 | `boolean` | `true` |
| allow-empty | 是否允许输入的值为空，设置为 `true` 后允许传入空字符串 | `boolean` | `false` |
| input-width | 输入框宽度，默认单位为 `px` | `number \| string` | `32px` |
| button-size | 按钮大小以及输入框高度，默认单位为 `px` | `number \| string` | `28px` |
| placeholder | 输入框占位提示文字 | `string` | - |
| disable-plus | 是否禁用增加按钮 | `boolean` | `false` |
| disable-minus | 是否禁用减少按钮 | `boolean` | `false` |
| disable-input | 是否禁用输入框 | `boolean` | `false` |
| before-change | 输入值变化前的回调函数，返回 `false` 可阻止输入，支持返回 Promise | `(value: number \| string) => boolean \| Promise\<boolean\>` | `false` |
| default-value | 初始值，当 v-model 为空时生效 | `number \| string` | `1` |
| decimal-length | 固定显示的小数位数 | `number \| string` | - |
| step-strictly | 是否只能输入 step 的倍数 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发的事件 | `value: string, detail: { name: string }` |
| overlimit | 点击不可用的按钮时触发 | - |
| plus | 点击增加按钮时触发 | - |
| minus | 点击减少按钮时触发 | - |
| focus | 输入框聚焦时触发 | `event: Event` |
| blur | 输入框失焦时触发 | `event: Event` |

### 类型定义

组件导出以下类型定义：

```ts
import type { InputNumberTheme, InputNumberProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-input-number-background | `var(--r-active-color)` | - |
| --r-input-number-button-icon-color | `var(--r-text-color)` | - |
| --r-input-number-button-disabled-color | `var(--r-background)` | - |
| --r-input-number-button-disabled-icon-color | `var(--r-gray-5)` | - |
| --r-input-number-button-round-theme-color | `var(--r-primary-color)` | - |
| --r-input-number-input-width | `32px` | - |
| --r-input-number-input-height | `28px` | - |
| --r-input-number-input-font-size | `var(--r-font-size-md)` | - |
| --r-input-number-input-line-height | `normal` | - |
| --r-input-number-input-text-color | `var(--r-text-color)` | - |
| --r-input-number-input-disabled-text-color | `var(--r-text-color-3)` | - |
| --r-input-number-input-disabled-background | `var(--r-active-color)` | - |
| --r-input-number-radius | `var(--r-radius-md)` | - |

## 常见问题

### 为什么 value 有时候会变成 string 类型？

这是因为用户输入过程中可能出现小数点或空值，比如 `1.`，这种情况下组件会抛出字符串类型。

如果希望 value 保持 number 类型，可以在 v-model 上添加 `number` 修饰符：

```html
<r-input-number v-model.number="value" />
```
