---
title: TabsSsr
lang: zh
---

# TabsSsr

`Tabs`组件在ssr上不展示内容，特新增此组件用于分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

:::demo 通过 `v-model:active` 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。

tabs-ssr/basic

:::

## 卡片风格的标签

:::demo `Tabs` 支持两种样式风格：`line` 和 `card`，默认为 `line` 样式，可以通过 `type` 属性切换样式风格。

tabs-ssr/card

:::

## 标签位置的设置

:::demo 可以通过 `tab-position` 设置标签的位置

tabs-ssr/position

:::

## 标签栏滚动

:::demo 标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。

tabs-ssr/scroll

:::

## 粘性布局

:::demo 通过 `sticky` 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶。

tabs-ssr/sticky

:::

> Tips: 如果页面顶部有其他内容，可以通过 `offset-top` 属性设置吸顶时与顶部的距离。

## 切换动画

:::demo 通过 `animated` 属性可以开启切换标签内容时的转场动画。

tabs-ssr/animated

:::

## 滑动切换

:::demo 通过 `swipeable` 属性可以开启内容滑动切换标签页。

tabs-ssr/swipeable

:::

## 滚动导航

:::demo 通过 `scrollspy` 属性可以开启滚动导航模式，该模式下，内容将会平铺展示。

tabs-ssr/scrollspy

:::

## 自定义标签页的内容

:::demo 通过 `title`、`item` 插槽可以自定义标签内容。

tabs-ssr/custom-tab

:::

:::demo 还可以传递属性来自定义`slot`特定标签内容。

tabs-ssr/custom-tab-item

:::

## 动态增减标签页

:::demo 增减标签页按钮只能在选项卡样式的标签页下使用

tabs-ssr/dynamic-tabs

:::

## 自定义增加标签页触发器

:::demo

tabs-ssr/customized-trigger

:::

## 异步切换

:::demo 通过 `before-change` 属性可以在切换标签前执行特定的逻辑。

tabs-ssr/before-change

:::

> Tips: 通过手势滑动不会触发 before-change 属性。

## API

与[tabs](/zh/component/tabs.html) 组件属性一致

### Props 特有

| 属性名  | 详情            | 类型        | 可选值 | 默认值 |
| ------- | --------------- | ----------- | ------ | ------ |
| items   | tabs数据数组    | `TabItem[]` | -      | -      |
| content | 是否显示tab内容 | `boolean`   | -      | true   |

### TabItem 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| title | 标题 | `string` |
| disabled | 是否禁用标签 | `boolean` |
| dot | 是否在标题右上角显示小红点 | `boolean` |
| badge | 图标右上角徽标的内容（`dot` 为 `fasle` 时生效） | `number \| string` |
| name | 标签名称，作为匹配的标识符 | `string \| number` |
| url | 点击后跳转的链接地址 | `string` |
| to | 点击后跳转的链接地址 | `string` |
| to | 点击后跳转的目标路由对象，等同于 Vue Router 的 [to 属性](https://router.vuejs.org/zh/api/interfaces/RouterLinkProps.html#Properties-to) | `string \| RouteLocationRaw` |
| replace | 是否在跳转时替换当前页面历史 | `boolean` |
| titleStyle | 自定义标题样式 | `string \| CSSProperties` |
| titleClass | 自定义标题类名 | `unknown` |
| closable | 标签是否可关闭 | `boolean` |
| showZeroBadge | 当 badge 为数字 0 时，是否展示徽标 | `boolean` |
| slot | 自定义tab内容插槽name | `string` |
| content | tab内容 | `string` |

## 主题定制

与tabs组件等同
