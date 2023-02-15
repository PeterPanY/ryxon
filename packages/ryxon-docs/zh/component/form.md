---
title: Form
lang: zh
---

# Form 表单

表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 基础用法

:::demo 在表单中，每个 `Input组件` 代表一个表单项，使用 `Input` 的 `rules` 属性定义校验规则。

form/basic

:::

## 校验规则

:::demo 通过 `rules` 定义表单校验规则

form/rules

:::

## 表单项类型

:::demo

form/types

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label-width | 表单项 label 宽度，默认单位为`px` | `number / string` | `6.2em` |
| label-align | 表单项 label 对齐方式，可选值为 `center` `right` `top` | `string` | `left` |
| input-align | 输入框对齐方式，可选值为 `center` `right` | `string` | `left` |
| error-message-align | 错误提示文案对齐方式，可选值为 `center` `right` | `string` | `left` |
| validate-trigger | 表单校验触发时机，可选值为 `onChange`、`onSubmit`，支持通过数组同时设置多个值，具体用法见下方表格 | `string / string[]` | `onBlur` |
| colon | 是否在 label 后面添加冒号 | `boolean` | `false` |
| disabled | 是否禁用表单中的所有输入框 | `boolean` | `false` |
| readonly | 是否将表单中的所有输入框设置为只读状态 | `boolean` | `false` |
| validate-first | 是否在某一项校验不通过时停止校验 | `boolean` | `false` |
| scroll-to-error | 是否在提交表单且校验不通过时滚动至错误的表单项 | `boolean` | `false` |
| show-error | 是否在校验不通过时标红输入框 | `boolean` | `false` |
| show-error-message | 是否在校验不通过时在输入框下方展示错误提示 | `boolean` | `true` |
| submit-on-enter | 是否在按下回车键时提交表单 | `boolean` | `true` |

> 表单项的 API 参见：`Input 组件`

### Rule 数据结构

使用 Input 的 `rules` 属性可以定义校验规则，可选属性如下:

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否为必选字段，当值为空值时（空字符串、空数组、`false`、`undefined`、`null` ），校验不通过 | `boolean` |
| message | 错误提示文案，可以设置为一个函数来返回动态的文案内容 | `string / (value, rule) => string` |
| validator | 通过函数进行校验，可以返回一个 Promise 来进行异步校验 | `(value, rule) => boolean / string / Promise` |
| pattern | 通过正则表达式进行校验，正则无法匹配表示校验不通过 | `RegExp` |
| trigger | 设置本项规则的触发时机，优先级高于 Form 组件设置的 `validate-trigger` 属性，可选值为 `onChange`、`onBlur`、`onSubmit` | `string / string[]` |
| formatter | 格式化函数，将表单项的值转换后进行校验 | `(value, rule) => any` |
| validateEmpty | 设置 `validator` 和 `pattern` 是否要对空值进行校验，默认值为 `true`，可以设置为 `false` 来禁用该行为 | `boolean` |

### validate-trigger 可选值

通过 `validate-trigger` 属性可以自定义表单校验的触发时机。

| 值       | 描述                                 |
| -------- | ------------------------------------ |
| onSubmit | 仅在提交表单时触发校验               |
| onBlur   | 在提交表单和输入框失焦时触发校验     |
| onChange | 在提交表单和输入框内容变化时触发校验 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 提交表单且验证通过后触发 | `values: object` |
| failed | 提交表单且验证不通过后触发 | `errorInfo: { values: object, errors: object[] }` |

### 方法

通过 ref 可以获取到 Form 实例并调用实例方法，详见`组件实例方法`。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| submit | 提交表单，与点击提交按钮的效果等价 | - | - |
| getValues | 获取所有表单项当前的值 | - | `Record<string, unknown>` |
| validate | 验证表单，支持传入一个或多个 `name` 来验证单个或部分表单项，不传入 `name` 时，会验证所有表单项 | `name?: string / string[]` | `Promise\<void\>` |
| resetValidation | 重置表单项的验证提示，支持传入一个或多个 `name` 来重置单个或部分表单项，不传入 `name` 时，会重置所有表单项 | `name?: string / string[]` | - |
| getValidationStatus | 获取所有表单项的校验状态，状态包括 `passed`、`failed`、`unvalidated` | - | `Record\<string, InputValidationStatus\>` |
| scrollToInput | 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部 | `name: string, alignToTop: boolean` | - |

### 类型定义

组件导出以下类型定义：

```ts
import type { FormProps, FormInstance } from 'ryxon'
```

`FormInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { FormInstance } from 'ryxon'

const formRef = ref<FormInstance>()

formRef.value?.submit()
```

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 表单内容 |

## 常见问题

### 如何自定义表单项？

Ryxon 支持在 Form 组件中插入自定义的表单项，具体用法参见 `useCustomInputValue`。
