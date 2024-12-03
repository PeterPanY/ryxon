---
title: Overlay
lang: zh
---

# Overlay 遮罩层

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

## 基础用法

:::demo

overlay/basic

:::

## 嵌入内容

:::demo 通过默认插槽可以在遮罩层上嵌入任意内容。

overlay/content

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否展示遮罩层 | `boolean` | `false` |
| z-index | z-index 层级 | `number \| string` | `1` |
| duration | 动画时长，单位秒，设置为 0 可以禁用动画 | `number \| string` | `0.3` |
| class-name | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `object` | - |
| lock-scroll | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | `boolean` | `true` |
| lazy-render | 是否在显示时才渲染节点 | `boolean` | `true` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | - |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | `event: MouseEvent` |

### Slots

| 名称    | 说明                               |
| ------- | ---------------------------------- |
| default | 默认插槽，用于在遮罩层上方嵌入内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { OverlayProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                   | 默认值               | 描述 |
| ---------------------- | -------------------- | ---- |
| --r-overlay-z-index    | `1`                  | -    |
| --r-overlay-background | `rgba(0, 0, 0, 0.7)` | -    |
