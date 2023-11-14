---
title: Loading Bar
lang: zh
---

# Loading Bar 加载条

## 基础用法

:::demo

loading-bar/basic

:::

## 局部使用

:::demo 你可以设定 `teleport` 来控制进度条的挂载位置

loading-bar/teleport

:::

## useLoadingBar 方式

:::warning

使用 useLoadingBar 方式显示加载条，你需要把调用其方法的组件放在 `r-loading-bar` 内部

:::

:::demo

loading-bar/hook

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| container-style | 加载条容器的样式 | `string \| object` | `` |
| loading-bar-style | 加载条样式 | `{ loading?: string \| object, error?: string \| object }` | `` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | - |

### Methods

| 名称   | 类型                     | 说明         |
| ------ | ------------------------ | ------------ |
| start  | 加载条开始加载的回调函数 | `() => void` |
| finish | 加载条结束加载的回调函数 | `() => void` |
| error  | 加载条出现错误的回调函数 | `() => void` |

### 类型定义

组件导出以下类型定义：

```ts
import type { LoadingBarInst, LoadingBarThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                          | 默认值                   | 描述 |
| ----------------------------- | ------------------------ | ---- |
| --r-loading-bar-height        | `2px`                    | -    |
| --r-loading-bar-color-loading | `var(--r-primary-color)` | -    |
| --r-loading-bar-color-error   | `var(--r-danger-color)`  | -    |
