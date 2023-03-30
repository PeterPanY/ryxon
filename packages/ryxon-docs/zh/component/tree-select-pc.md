---
title: TreeSelectPc
lang: zh
---

# TreeSelectPc 树形选择

含有下拉菜单的树形选择器，结合了 `r-tree` 和 `r-select` 两个组件的功能。

## 基础用法

:::demo 树状选择器

tree-select-pc/basic

:::

## 选择任意级别

:::demo 当属性 `check-strictly=true` 时，任何节点都可以被选择，否则只有子节点可被选择。

tree-select-pc/check-strictly

:::

:::tip

当使用 `show-checkbox`时，由于 `check-on-click-node` 默认值是 false，这时候只能通过 checkbox 来选中，当然您也可以将其设置成 true，这样点击整个 node 都可以用来完成选择

:::

## 多选

:::demo 通过点击或复选框选择多个选项。

tree-select-pc/multiple

:::

## 禁用选项

:::demo 使用 `disabled` 字段禁用选项。

tree-select-pc/disabled

:::

## 可筛选

:::demo 使用关键字筛选或自定义筛选方法。 `filterMethod` 可以自定义数据筛选的方法， `filterNodeMethod` 可以自定义节点数据筛选的方法。

tree-select-pc/filterable

:::

## 自定义内容

:::demo 自定义树节点的内容

tree-select-pc/slots

:::

## 懒加载

:::demo 树节点懒加载，更加适合于数据量大的列表。

tree-select-pc/lazy

:::

## API

由于这个组件是 `r-tree` 和 `r-select` 的结合体，他们的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。

| 属性 | 方法 | 事件 | 插槽 |
| --- | --- | --- | --- |
| [tree](/zh/component/tree.html#props) | [tree](/zh/component/tree.html#方法) | [tree](/zh/component/tree.html#events) | [tree](/zh/component/tree.html#slots) |
| [select](/zh/component/select.html#select-属性) | [select](/zh/component/select.html#select-方法) | [select](/zh/component/select.html#select-事件) | [select](/zh/component/select.html#select-插槽) |

### Props 特有

| 属性名 | 详情 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| cacheData | 懒加载节点的缓存数据，结构与数据相同，用于获取未加载数据的标签 | `array` | - | - |

### 类型定义

组件导出以下类型定义：

```ts
import type { TreeSelectPcProps, TreeSelectPcThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值                            | 描述 |
| ---------------------------- | --------------------------------- | ---- |
| --r-tree-node-hover-bg-color | `var(--r-fill-color-light)`       | -    |
| --r-tree-text-color          | `var(--r-text-color-regular)`     | -    |
| --r-tree-expand-icon-color   | `var(--r-text-color-placeholder)` | -    |
