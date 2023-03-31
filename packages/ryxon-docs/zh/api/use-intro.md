---
title: 组合式 API
lang: zh
---

# 组合式 API 介绍

Ryxon 底层依赖了 `@ryxon/use` 包，其中内置了一系列的组合式 API。对于使用了 Ryxon 的项目，可以复用这些 API 进行开发。

## 安装

虽然 Ryxon 的依赖中已经包含了 `@ryxon/use`，但我们仍然推荐显式地安装它：

```shell
# with npm
npm i @ryxon/use

# with yarn
yarn add @ryxon/use

# with pnpm
pnpm add @ryxon/use
```

## 示例

下面是一个 Ryxon 组合式 API 的用法示例，我们从 `@ryxon/use` 这个包中引入 `useWindowSize` 方法，然后进行调用，即可获取到当前 Window 的宽度和高度。

```js
import { useWindowSize } from '@ryxon/use'

const { width, height } = useWindowSize()

console.log(width.value) // -> 窗口宽度
console.log(height.value) // -> 窗口高度
```

## API 列表

下面是 Ryxon 对外提供的所有组合式 API，点击名称可以查看详细介绍：

| 名称 | 描述 |
| --- | --- |
| [useCountDown](/zh/api/use-count-down.html) | 提供倒计时管理能力 |
| [useCustomInputValue](/zh/api/use-custom-input-value.html) | 自定义表单组件中的表单项 |
