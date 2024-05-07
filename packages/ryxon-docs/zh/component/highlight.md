---
title: Highlight
lang: zh
---

# Highlight 高亮文本

高亮指定文本内容。请升级 `ryxon` 到 >= 1.12.0 版本来使用该组件。

## 基础用法

你可以通过 `keywords` 指定需要高亮的关键字，通过 `source-string` 指定源文本。

:::demo

highlight/basic

:::

## 多字符匹配

如果需要指定多个关键字，可以以数组的形式传入 `keywords`。

:::demo

highlight/more

:::

## 设置高亮标签类名

通过 `highlight-class` 可以设置高亮标签的类名，以便自定义样式。

:::demo

highlight/highlight-class

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| auto-escape | 是否自动转义 | `boolean` | `true` |
| case-sensitive | 是否区分大小写 | `boolean` | `false` |
| highlight-class | 高亮元素的类名 | `string` | - |
| highlight-tag | 高亮元素对应的 HTML 标签名 | `string` | `span` |
| keywords | 期望高亮的文本 | `string \| string[]` | - |
| source-string | 源文本 | `string` | - |
| tag | 根节点对应的 HTML 标签名 | `string` | `div` |
| unhighlight-class | 非高亮元素的类名 | `string` | - |
| unhighlight-tag | 非高亮元素对应的 HTML 标签名 | `string` | `span` |

### 类型定义

组件导出以下类型定义：

```ts
import type { HighlightProps, HighlightThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                    | 默认值                   | 描述         |
| ----------------------- | ------------------------ | ------------ |
| --r-highlight-tag-color | `var(--r-primary-color)` | 高亮文本颜色 |
