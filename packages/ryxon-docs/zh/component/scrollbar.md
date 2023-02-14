---
title: Scrollbar
lang: zh
---

# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基础用法

:::demo 通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

scrollbar/basic

:::

## 横向滚动

:::demo 当元素宽度大于滚动条宽度时，会显示横向滚动条。

scrollbar/horizontal-scroll

:::

## 最大高度

:::demo 当元素高度超过最大高度，才会显示滚动条。

scrollbar/max-height

:::

## 手动滚动

:::demo 通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。

scrollbar/manual-scroll

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 滚动条高度 | `string / number` | `-` |
| max-height | 滚动条最大高度 | `string / number` | `-` |
| native | 是否使用原生滚动条样式 | `boolean` | `false` |
| wrap-style | 包裹容器的自定义样式 | `object` | `-` |
| wrap-class | 包裹容器的自定义类名 | `string` | `-` |
| view-style | 视图的自定义样式 | `string / object` | `-` |
| view-class | 视图的自定义类名 | `string` | `-` |
| noresize | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean` | `false` |
| tag | 视图的元素标签 | `string` | `div` |
| always | 滚动条总是显示 | `boolean` | `false` |
| min-size | 滚动条最小尺寸 | `number` | `20` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `scrollLeft: number, scrollTop: number` |

### Slots

| 名称    | 说明           | 参数 |
| ------- | -------------- | ---- |
| default | 自定义菜单内容 | -    |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 `ConfigProvider 组件`。

| 名称                         | 默认值                          | 描述 |
| ---------------------------- | ------------------------------- | ---- |
| --r-scrollbar-opacity        | `0.3`                           | -    |
| --r-scrollbar-bg-color       | `var(--r-text-color-secondary)` | -    |
| --r-scrollbar-hover-opacity  | ` 0.5`                          | -    |
| --r-scrollbar-hover-bg-color | `var(--r-text-color-secondary)` | -    |
