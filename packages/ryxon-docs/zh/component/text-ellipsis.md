---
title: TextEllipsis
lang: zh
---

# TextEllipsis 文本省略

对长文本进行省略，支持展开/收起。

## 基础用法

:::demo 默认展示 `1` 行，超过 `1` 行显示省略号。

text-ellipsis/basic

:::

## 展开/收起

:::demo 超过行数支持展开/收起。

text-ellipsis/text

:::

## 自定义展示行数

:::demo 通过设置 `rows` 限制展示行数。

text-ellipsis/rows

:::

## 使用 html 片段作为文本

:::demo

text-ellipsis/html

:::

## 使用 icon 图标

:::demo

text-ellipsis/icon

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 展示的行数 | `number \| string` | `1` |
| content | 需要展示的文本 | `string` | - |
| expand-text | 展开操作的文案，当`textType=icon`时，等同 icon | `string \| Component` | - |
| collapse-text | 收起操作的文案，当`textType=icon`时，等同 icon | `string \| Component` | - |
| is-text-right | 操作的文档是否右对齐 | `boolean` | `false` |
| is-html | 展示的文本是否是 html | `boolean` | `false` |
| text-type | 操作文案的暂时类型，可选`icon` | `string` | `text` |
| default-expanded | 默认是否展开文本 | `boolean` | `false` |
| dots | 省略号的文本内容 | _string_ | `'...'` |

### Events

| 事件         | 说明                | 回调参数            |
| ------------ | ------------------- | ------------------- |
| click-action | 点击展开/收起时触发 | `event: MouseEvent` |

### 类型定义

组件导出以下类型定义：

```ts
import type { TextEllipsisProps, TextEllipsisThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                           | 默认值          | 描述           |
| ------------------------------ | --------------- | -------------- |
| --r-text-ellipsis-font-size    | `14px`          | 文本的字体大小 |
| --r-text-ellipsis-line-height  | `1.6`           | 文本的行高     |
| --r-text-ellipsis-action-color | `var(--r-blue)` | 操作按钮的颜色 |
