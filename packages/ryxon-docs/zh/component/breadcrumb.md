---
title: Breadcrumb
lang: zh
---

# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

:::demo 在 `r-breadcrumb` 中使用 `r-breadcrumb-item` 标签表示从首页开始的每一级。 该组件接受一个 `String` 类型的参数 `separator` 来作为分隔符。 默认值为 '/'。

breadcrumb/basic

:::

## 图标分隔符

:::demo 通过设置 `separator-icon` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 失效。

breadcrumb/icon

:::

## API

### Breadcrumb Props

| 参数           | 说明                     | 类型                | 默认值 |
| -------------- | ------------------------ | ------------------- | ------ |
| separator      | 分隔符                   | `string`            | `/`    |
| separator-icon | 图标分隔符的组件或组件名 | `string/ Component` | `-`    |

### Breadcrumb Slots

| 名称    | 说明           | 子标签           |
| ------- | -------------- | ---------------- |
| default | 自定义默认内容 | `BreadcrumbItem` |

### BreadcrumbItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| to | 路由跳转目标，同 Vue Router 的 [to 属性](https://router.vuejs.org/zh/api/interfaces/RouterLinkProps.html#Properties-to) | `string / RouteLocationRaw` | `-` |
| url | 点击后跳转的链接地址 | `string` | `-` |
| replace | 是否在跳转时替换当前页面历史 | `boolean` | `false` |

### BreadcrumbItem Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { BreadcrumbProps } from 'ryxon'
```
