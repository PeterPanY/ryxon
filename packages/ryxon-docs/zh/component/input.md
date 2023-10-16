---
title: Input
lang: zh
---

# Input 输入框

用户可以在文本框内输入或编辑文字。

## 基础用法

:::demo 可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

input/basic

:::

## 自定义类型

:::demo 根据 `type` 属性定义不同类型的输入框，默认值为 `text`。

input/type

:::

## 禁用输入框

:::demo 通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

input/disabled

:::

## 显示图标

:::demo 通过 `left-icon` 和 `right-icon` 配置输入框两侧的图标，通过设置 `clearable` 在输入过程中展示清除图标。

input/icon

:::

## 错误提示

:::demo 设置 `required` 属性表示这是一个必填项，可以配合 `error` 或 `error-message` 属性显示对应的错误提示。

input/error

:::

## 插入按钮

:::demo 通过 button 插槽可以在输入框尾部插入按钮。

input/button

:::

## 格式化输入内容

:::demo 通过 `formatter` 属性可以对输入的内容进行格式化，通过 `format-trigger` 属性可以指定执行格式化的时机，默认在输入时进行格式化。

input/formatter

:::

## 高度自适应

:::demo 对于 textarea，可以通过 `autosize` 属性设置高度自适应。

input/textarea

:::

## 显示字数统计

:::demo 设置 `maxlength` 和 `show-word-limit` 属性后会在底部显示字数统计。

input/maxlength

:::

## 输入框内容对齐

:::demo 通过 `input-align` 属性可以设置输入框内容的对齐方式，可选值为 `center`、`right`。

input/align

:::

## 输入框文本位置

:::demo 通过 `label-align` 属性可以设置输入框文本的位置，可选值为 `center`、`right`、`top`。

input/label-align

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前输入的值 | `number / string` | - |
| label | 输入框左侧文本 | `string` | - |
| name | 名称，作为提交表单时的标识符 | `string` | - |
| id | 输入框 id，同时会设置 label 的 for 属性 | `string` | `r-input-n-input` |
| type | 输入框类型, 支持原生 input 标签的所有 [type 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types)，额外支持了 `digit` 类型 | `InputType` | `text` |
| size | 大小，可选值为 `large` | `string` | - |
| maxlength | 输入的最大字符数 | `number / string` | - |
| placeholder | 输入框占位提示文字 | `string` | - |
| input-border | 输入框是否显示边框 | `boolean` | `true` |
| border | 是否显示内边框 | `boolean` | `true` |
| disabled | 是否禁用输入框 | `boolean` | `false` |
| readonly | 是否为只读状态，只读状态下无法输入内容 | `boolean` | `false` |
| colon | 是否在 label 后面添加冒号 | `boolean` | `false` |
| required | 是否显示表单必填星号 | `boolean` | `false` |
| center | 是否使内容垂直居中 | `boolean` | `false` |
| clearable | 是否启用清除图标，点击清除图标后会清空输入框 | `boolean` | `false` |
| clear-icon | 清除图标名称或图片链接，等同于 Icon 组件的 `name 属性` | `string` | `clear` |
| clear-trigger | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示 | `InputClearTrigger` | `focus` |
| clickable | 是否开启点击反馈 | `boolean` | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | `boolean` | `false` |
| autofocus | 是否自动聚焦，iOS 系统不支持该属性 | `boolean` | `false` |
| show-word-limit | 是否显示字数统计，需要设置 `maxlength` 属性 | `boolean` | `false` |
| error | 是否将输入内容标红 | `boolean` | `false` |
| error-message | 底部错误提示文案，为空时不展示 | `string` | - |
| error-message-align | 错误提示文案对齐方式，可选值为 `center` `right` | `InputTextAlign` | `left` |
| formatter | 输入内容格式化函数 | `(val: string) => string` | - |
| format-trigger | 格式化函数触发的时机，可选值为 `onBlur` | `InputFormatTrigger` | `onChange` |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | `string` | `right` |
| label-class | 左侧文本额外类名 | `string / Array / object` | - |
| label-width | 左侧文本宽度，默认单位为 `px` | `number / string` | `6.2em` |
| label-align | 左侧文本对齐方式，可选值为 `center` `right` `top` | `InputTextAlign` | `left` |
| input-align | 输入框对齐方式，可选值为 `center` `right` | `InputTextAlign` | `left` |
| autosize | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 { maxHeight: 100, minHeight: 50 }，<br>单位为`px` | `boolean / InputAutosizeConfig` | `false` |
| left-icon | 左侧图标名称或图片链接，等同于 Icon 组件的 `name 属性` | `string` | - |
| right-icon | 右侧图标名称或图片链接，等同于 Icon 组件的 `name 属性` | `string` | - |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 `class-prefix 属性` | `string` | `r-icon` |
| rules | 表单校验规则，详见 `Form 组件` | `InputRule[]` | - |
| autocomplete | HTML 原生属性，用于控制自动完成功能，详见 [MDN - autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | `string` | `off` |
| enterkeyhint | HTML 原生属性，用于控制回车键样式，此 API 仅在部分浏览器支持，详见 [MDN - enterkeyhint](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)<br> | `string` | - |

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| update:model-value | 输入框内容变化时触发 | `value: string (当前输入的值)` |
| focus | 输入框获得焦点时触发 | `event: Event` |
| blur | 输入框失去焦点时触发 | `event: Event` |
| clear | 点击清除按钮时触发 | `event: MouseEvent` |
| click | 点击组件时触发 | `event: MouseEvent` |
| click-input | 点击输入区域时触发 | `event: MouseEvent` |
| click-left-icon | 点击左侧图标时触发 | `event: MouseEvent` |
| click-right-icon | 点击右侧图标时触发 | `event: MouseEvent` |
| start-validate | 开始表单校验时触发 | - |
| end-validate | 结束表单校验时触发 | `{ status: string, message: string }` |

### 方法

通过 ref 可以获取到 Input 实例并调用实例方法，详见`组件实例方法`。

| 方法名 | 说明           | 参数 | 返回值 |
| ------ | -------------- | ---- | ------ |
| focus  | 获取输入框焦点 | -    | -      |
| blur   | 取消输入框焦点 | -    | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  InputType,
  InputRule,
  InputProps,
  InputInstance,
  InputTextAlign,
  InputRuleMessage,
  InputClearTrigger,
  InputFormatTrigger,
  InputRuleValidator,
  InputRuleFormatter,
  InputValidateError,
  InputAutosizeConfig,
  InputValidateTrigger,
  InputValidationStatus
} from 'ryxon'
```

`InputInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { InputInstance } from 'ryxon'

const inputRef = ref<InputInstance>()

inputRef.value?.focus()
```

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| label | 自定义输入框左侧文本 | - |
| input | 自定义输入框，使用此插槽后，与输入框相关的属性和事件将失效 | - |
| left-icon | 自定义输入框头部图标 | - |
| right-icon | 自定义输入框尾部图标 | - |
| button | 自定义输入框尾部按钮 | - |
| error-message | 自定义底部错误提示文案 | _{ message: string }_ |
| extra | 自定义输入框最右侧的额外内容 | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                              | 默认值                         | 描述 |
| --------------------------------- | ------------------------------ | ---- |
| --r-input-label-width             | `6.2em`                        | -    |
| --r-input-label-color             | `var(--r-text-color)`          | -    |
| --r-input-label-margin-right      | `var(--r-padding-sm)`          | -    |
| --r-input-text-color              | `var(--r-text-color)`          | -    |
| --r-input-error-text-color        | `var(--r-danger-color)`        | -    |
| --r-input-placeholder-text-color  | `var(--r-text-color-3)`        | -    |
| --r-input-icon-size               | `16px`                         | -    |
| --r-input-clear-icon-size         | `16px`                         | -    |
| --r-input-clear-icon-color        | `var(--r-gray-5)`              | -    |
| --r-input-right-icon-color        | `var(--r-info-color)`          | -    |
| --r-input-error-message-color     | `var(--r-danger-color)`        | -    |
| --r-input-error-message-font-size | `12px`                         | -    |
| --r-input-text-area-min-height    | `60px`                         | -    |
| --r-input-word-limit-color        | `var(--r-gray-7)`              | -    |
| --r-input-word-limit-font-size    | `var(--r-font-size-sm)`        | -    |
| --r-input-word-limit-line-height  | `16px`                         | -    |
| --r-input-disabled-text-color     | `var(--r-text-color-3)`        | -    |
| --r-input-required-mark-color     | `var(--r-danger-color)`        | -    |
| --r-input-hover-border-color      | `var(--r-text-color-disabled)` | -    |
| --r-input-focus-border-color      | `var(--r-primary-color)`       | -    |

## 常见问题

### 设置 type 为 number 后，为什么 input 标签的类型仍为 text?

HTML 原生的 `type="number"` 属性在 iOS 和 Android 系统上都存在一定问题，比如 maxlength 属性不生效、无法获取到完整的输入内容等。因此设置 type 为 `number` 时，Input 不会使用原生的 `type="number"` 属性，而是用现代浏览器支持的 [inputmode 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/inputmode)来控制输入键盘的类型。

### 为什么 v-model 绑定的值被更新为 string 类型？

Input 组件内部会将传入的 v-model 格式化为 string 类型，便于组件内部进行处理。

如果你希望在 v-model 上绑定 number 类型，可以使用 Vue 提供的 [.number 修饰符](https://vuejs.org/guide/essentials/forms.html#lazy)。

```html
<r-input v-model.number="value" type="tel" />
```
