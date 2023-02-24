---
title: Image
lang: zh
---

# Image 图片

增强版的 `img` 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。

## 基础用法

:::demo 可通过 `fit` 确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

image/basic

:::

## 图片位置

:::demo 通过 `position` 属性可以设置图片位置，结合 `fit` 属性使用，等同于原生的 [object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position) 属性。

image/position

:::

## 图片懒加载

:::demo 设置 `lazy-load` 属性来开启图片懒加载，需要搭配自定义指令 `Lazyload` 组件使用。

image/lazy

:::

## 加载中提示

:::demo `Image` 组件提供了默认的加载中提示，支持通过 `loading` 插槽自定义内容。

image/loading

:::
