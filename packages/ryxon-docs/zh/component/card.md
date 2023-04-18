---
title: Card
lang: zh
---

# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

:::demo Card 组件由 `header` 和 `body` 组成。 `header` 是可选的，其内容取决于一个具名的 slot。

card/basic

:::

## 简单卡片

:::demo 卡片可以只有内容区域。

card/simple

:::

## 有图片内容的卡片

:::demo 配置 `body-style` 属性来自定义 `body` 部分的样式。 在这个例子中我们还使用了 `r-col` 组件来布局。

card/with-images

:::

## 带有阴影效果的卡片

:::demo 通过 `shadow` 属性设置卡片阴影出现的时机。 该属性的值可以是：`always`、`hover` 或 `never`。

card/shadow

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| header | 卡片的标题 你既可以通过设置 header 来修改标题，也可以通过 `slot#header` 传入 `DOM` 节点 | `string` | — |
| body-style | body 的 CSS 样式 | ^[object]`CSSProperties` | - |
| shadow | 设置阴影显示时机 | ^[enum]`always \| never \| hover` | `always` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
| header  | 卡片标题内容   |

### 类型定义

组件导出以下类型定义：

```ts
export type { CardProps, CardThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)

| 名称                   | 默认值                        | 描述 |
| ---------------------- | ----------------------------- | ---- |
| --r-card-border-color  | `var(--r-border-color-light)` | -    |
| --r-card-border-radius | `4px`                         | -    |
| --r-card-padding       | `20px`                        | -    |
| --r-card-bg-color      | `var(--r-fill-color-blank)`   | -    |
