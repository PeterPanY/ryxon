---
title: Mention
lang: zh
---

# Mention 提及

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## 基础使用

:::demo

mention/basic

:::

## 远程加载

:::demo 异步加载选项。

mention/remote

:::

## 自定义触发字符

:::demo 使用 `prefix` 设定触发字符。

mention/prefix

:::

## 自定义菜单渲染

:::demo

mention/custom

:::

## API

### Mention Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:text | 输入框的文本值 | `string ` | - |
| v-model:html | 输入框的 html 值 | `string ` | - |
| auto-focus | 自动获得焦点 | `boolean` | `false` |
| target-class-name | 提及在输入框中的类名 | `string` | — |
| options | 选项列表 | `MentionOption[]` | `[]` |
| prefix | 设置触发关键字 | `string \| string[]` | `@` |
| separator | 设置选中项前后分隔符 | `string` | `' '` |
| placeholder | 输入框占位提示文字 | `string` | - |
| disabled | 是否设置输入框为禁用状态 | `boolean` | `false` |
| loading | 选择面板是否显示加载状态 | `boolean` | `false` |
| theme | 选择弹窗主题风格，可选值为 `dark` | `TooltipTheme` | `light` |
| placement | 弹窗弹出位置 | ^[TooltipPlacement]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom-start` |
| transition | 弹窗动画名称 | `string ` | `r-tooltip-zoom` |
| teleport | 弹窗指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string / Element` | `body` |
| popper-class | 自定义弹窗样式 | `string / Array / object` | - |

### Mention Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义插入输入框下的默认内容 | `-` |
| loading | 自定义选择面板加载状态 | `-` |
| item | 自定义菜单渲染内容 | `{ row: MentionOption, index: number }` |

### Mention Events

| 事件名  | 说明                   | 回调参数                                  |
| ------- | ---------------------- | ----------------------------------------- |
| keydown | 键盘按下事件的回调     | `()=>void`                                |
| keyup   | 键盘弹起事件的回调     | `(startContainer, previousSibling)=>void` |
| change  | 输入框值发生更新时触发 | `(value: string)=>void`                   |
| search  | 输入框搜索时触发       | `(value: string)=>void`                   |
| select  | 输入框的选中时触发     | `(row: MentionOption)=>void`              |
| paste   | 在输入框中复制时触发   | `(event)=>void`                           |

### Mention 方法

通过 ref 可以获取到 `Mention` 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 聚焦 | `() => void` |
| blur | 失去光标 | `() => void` |
| onAddRange | 选中当前区域 | `(event: MouseEvent) => void` |
| insertContent | 光标处插入内容 | `( content: HTMLSpanElement \| Array<HTMLSpanElement>, isPrefix?: boolean) => void` |

### MentionOption 数据结构

`options` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名     | 说明                 | 类型                      |
| -------- | -------------------- | ------------------------- |
| class    | 选项的自定义类名     | `string`                  |
| disabled | 选项是否禁用         | `boolean`                 |
| label    | 选项的标签           | `string`                  |
| style    | 选项的样式           | `string \| CSSProperties` |
| value    | 在选项中应该是唯一的 | `string`                  |

### 类型定义

组件导出以下类型定义：

```ts
import type { MentionOption, MentionProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                               | 默认值                           | 描述 |
| ---------------------------------- | -------------------------------- | ---- |
| --r-mention-text-color             | `var(--r-text-color)`            | -    |
| --r-mention-height                 | `82px`                           | -    |
| --r-mention-padding-vertical       | `5px`                            | -    |
| --r-mention-line-height            | `24px`                           | -    |
| --r-mention-placeholder-text-color | `var(--r-text-color-3)`          | -    |
| --r-mention-disabled-text-color    | `var(--r-text-color-3)`          | -    |
| --r-mention-hover-fill             | `var(--r-primary-color-light-9)` | -    |
| --r-mention-hover-color            | `var(--r-primary-color)`         | -    |
