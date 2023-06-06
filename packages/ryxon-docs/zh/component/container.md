---
title: Container
lang: zh
---

# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<r-container>`：外层容器。 当子元素中包含 `<r-header>` 或 `<r-footer>` 时，全部子元素会垂直上下排列， 否则会水平左右排列。

`<r-header>`：顶栏容器。

`<r-aside>`：侧边栏容器。

`<r-main>`：主要区域容器。

`<r-footer>`：底栏容器。

:::tip

以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， `<r-container>`的直接子元素必须是后四个组件中的一个或多个。 后四个组件的亲元素必须是一个 `<r-container>`

:::

## 常见页面布局

<style lang="scss">
@use '../../examples/container/common-layout.scss';
</style>

:::demo

container/layout-hm

:::

:::demo

container/layout-hmf

:::

:::demo

container/layout-am

:::

:::demo

container/layout-ham

:::

:::demo

container/layout-hamf

:::

:::demo

container/layout-ahm

:::

:::demo

container/layout-ahmf

:::

## 后台布局案例

:::demo

container/example

:::

## API

### Container Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 子元素的排列方向 | ^[enum]`'horizontal' \| 'vertical'` | 子元素中有 `r-header` 或 `r-footer` 时为 vertical，否则为 horizontal |

### Container Slots

| 名称    | 说明           | 子标签                                     |
| ------- | -------------- | ------------------------------------------ |
| default | 自定义默认内容 | Container / Header / Aside / Main / Footer |

### Header Props

| 参数   | 说明     | 类型     | 默认值 |
| ------ | -------- | -------- | ------ |
| height | 顶栏高度 | `string` | `60px` |

### Header Slots

| 名称    | 说明           | 子标签 |
| ------- | -------------- | ------ |
| default | 自定义默认内容 | -      |

### Aside Props

| 参数  | 说明       | 类型     | 默认值  |
| ----- | ---------- | -------- | ------- |
| width | 侧边栏宽度 | `string` | `300px` |

### Aside Slots

| 名称    | 说明           | 子标签 |
| ------- | -------------- | ------ |
| default | 自定义默认内容 | -      |

### Main Slots

| 名称    | 说明           | 子标签 |
| ------- | -------------- | ------ |
| default | 自定义默认内容 | -      |

### Footer Props

| 参数   | 说明     | 类型     | 默认值 |
| ------ | -------- | -------- | ------ |
| height | 底栏高度 | `string` | `60px` |

### Footer Slots

| 名称    | 说明           | 子标签 |
| ------- | -------------- | ------ |
| default | 自定义默认内容 | -      |

## 主题定制

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

### Header 样式变量

| 名称               | 默认值   | 描述                |
| ------------------ | -------- | ------------------- |
| --r-header-padding | `0 20px` | 顶栏容器 padding 值 |
| --r-header-height  | `60px`   | 顶栏容器高度        |

### Aside 样式变量

| 名称            | 默认值  | 描述           |
| --------------- | ------- | -------------- |
| --r-aside-width | `300px` | 侧边栏容器宽度 |

### Main 样式变量

| 名称             | 默认值 | 描述                    |
| ---------------- | ------ | ----------------------- |
| --r-main-padding | `20px` | 主要区域容器 padding 值 |

### Footer 样式变量

| 名称               | 默认值   | 描述                |
| ------------------ | -------- | ------------------- |
| --r-footer-padding | `0 20px` | 底栏容器 padding 值 |
| --r-footer-height  | `60px`   | 底栏容器高度        |
