---
title: Link 链接
lang: zh
---

# Link 链接

链接组件，用于跳转页面或触发事件。

## 基础用法

:::demo

link/basic

:::

## 禁用状态

:::demo

link/disabled

:::

## 下划线

:::demo 控制下划线是否出现

link/underline

:::

## 图标

:::demo 控制图标是否出现

link/icon

:::

## API

### Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | default |
| underline | 控制下划线是否出现 | ^[enum]`'always' \| 'hover' \| 'never'` | hover |
| onlyDefault | 下划线只展示默认区域 | ^[boolean] | false |
| disabled | 是否禁用状态 | ^[boolean] | false |
| href | 原生 href 属性 | ^[string] | — |
| target | 同原生 target 属性 | ^[enum]`'_blank' \| '_parent' \| '_self' \| '_top'` | \_self |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| prefix  | 前缀插槽 |
| default | 默认插槽 |
| suffix  | 后缀插槽 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值                            | 描述 |
| ---------------------------- | --------------------------------- | ---- |
| --r-link-font-size           | `var(--r-font-size-md)`           | -    |
| --r-link-font-weight         | `var(--r-font-weight-primary)`    | -    |
| --r-link-text-color          | `var(--r-text-color-regular)`     | -    |
| --r-link-hover-text-color    | `var(--r-primary-color)`          | -    |
| --r-link-disabled-text-color | `var(--r-text-color-placeholder)` | -    |
