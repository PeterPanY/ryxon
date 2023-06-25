---
title: TabsMenu
lang: zh
---

# TabsMenu 下拉菜单

向下弹出的菜单列表。

## 基础用法

:::demo

tabs-menu/basic

:::

## 全屏展示(适用于移动端)

:::demo

tabs-menu/full

:::

## 菜单栏滚动

标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。

:::demo

tabs-menu/exceed

:::

## 多选

:::demo

tabs-menu/multiple

:::

## 向上展开

将 `direction` 属性值设置为 `up`，菜单即可向上展开。

:::demo

tabs-menu/direction

:::

## 禁用菜单

:::demo

tabs-menu/disabled

:::

## 自定义组件

:::demo

tabs-menu/custom

:::

## API

### TabsMenu Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定当前选中标签的标识符 | `number \| string` | `0` |
| overlay | 是否显示遮罩层，下拉弹窗模式下默认为 false | `boolean` | `true` |
| z-index | 菜单栏 z-index 层级 | `number \| string` | `10` |
| ellipsis | 是否省略过长的标题文字 | `boolean` | `true` |
| swipe-threshold | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 | `number \| string` | `5` |
| shrink | 是否开启左侧收缩布局 | `boolean` | `false` |
| duration | 动画时长，单位秒，设置为 0 可以禁用动画 | `number \| string` | `0.2` |
| direction | 菜单展开方向，可选值为 up | `string` | `down` |
| active-color | 菜单标题和选项的选中态颜色 | `string` | `#1989fa` |
| close-on-click-outside | 是否在点击遮罩层后关闭菜单 | `boolean` | `true` |
| close-on-click-outside | 是否在点击外部元素后关闭菜单 | `boolean` | `true` |
| trigger | 下拉菜单打开的触发方式，可选值为 hover | `string` | `click` |
| full | 下拉菜单是否全屏展示 | `boolean` | `false` |
| show-arrow | 下拉菜单非全屏模式下，是否显示箭头 | `boolean` | `true` |
| lock-scroll | 是否锁定屏幕 | `boolean` | `false` |
| sub-select | 有下拉菜单时，导航菜单是否可以点击，当为 true 时，下拉菜单触发形式 trigger 使用 hover | `boolean` | `false` |
| multiple | 是否是多选 | `boolean` | `false` |
| type | 样式风格类型，可选值为 none | `string` | `line` |
| line-width | 底部条宽度，默认单位 px | `number \| string` | `40px` |
| line-height | 底部条高度，默认单位 px | `number \| string` | `3px` |

### TabsMenu Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击一级导航菜单时触发 | `{ index: number, item: ComponentInstance }` |

### TabsMenu 方法

通过 ref 可以获取到 TabsMenu 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| resize | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | - | - |
| close | 关闭所有菜单的展示状态 | `-` | - |

### TabsMenu Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认内容 |

### TabsMenuItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标签名称，作为匹配的标识符 | `number \| string` | `标签的索引值` |
| title | 菜单项标题 | `string` | 当前选中项文字 |
| options | 选项数组 | `Option[]` | `[]` |
| disabled | 是否禁用菜单 | `boolean` | `false` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 to 属性 | `string \| Element` | - |
| lazyRender | 是否在首次展开时才渲染菜单内容 | `boolean` | `true` |
| v-model | 当前选中项对应的 value | `number \| string` | - |
| title-class | 标题额外类名 | `string \| Array \| object` | - |
| content-class | 自定义弹窗内容额外类名 | `string \| Array \| object` | - |
| offset | 非全屏模式下，弹窗的偏移量 | `Array` | `[0,8]` |

### TabsMenuItem Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 菜单内容         |
| title   | 自定义菜单项标题 |

### TabsMenuItem 方法

通过 ref 可以获取到 TabsMenu 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggle | 切换菜单展示状态，传 true 为显示，false 为隐藏，不传参为取反 | show?: boolean | - |

### Option 数据结构

| 键名  | 说明                   | 类型             |
| ----- | ---------------------- | ---------------- |
| text  | 文字                   | string           |
| value | 标识符                 | number \| string |
| icon  | 左侧图标名称或图片链接 | string           |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  TabsMenuMenuProps,
  TabsMenuItemProps,
  TabsMenuItemOption,
  TabsMenuItemInstance,
  TabsMenuMenuInstance,
  TabsMenuMenuDirection
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-tabs-menu-height | `48px` | - |
| --r-tabs-menu-background | `var(--r-background-2)` | - |
| --r-tabs-menu-shadow | `0 2px 12px rgba(100, 101, 102, 0.12)` | - |
| --r-tabs-menu-title-font-size | `15px` | - |
| --r-tabs-menu-title-text-color | `var(--r-gray-7)` | - |
| --r-tabs-menu-title-active-text-color | `var(--r-text-color)` | - |
| --r-tabs-menu-title-disabled-text-color | `var(--r-text-color-2)` | - |
| --r-tabs-menu-title-padding | `0 var(--r-padding-xs)` | - |
| --r-tabs-menu-title-line-height | `var(--r-line-height-lg)` | - |
| --r-tabs-menu-option-active-color | `var(--r-primary-color)` | - |
| --r-tabs-menu-content-max-height | `80%` | - |
| --r-tabs-menu-bottom-bar-width | `40px` | - |
| --r-tabs-menu-bottom-bar-height | `3px` | - |
| --r-tabs-menu-bottom-bar-color | `var(--r-primary-color)` | - |
| --r-tabs-menu-item-z-index | `10` | - |
| --r-tabs-menu-item-dropdown-width | `150px` | - |
| --r-tabs-menu-item-dropdown-arrow-size | `6px` | - |
| --r-tabs-menu-item-dropdown-background | `var(--r-background-2)` | - |
| --r-tabs-menu-item-radius | `8px` | - |

## 常见问题

### 组件从隐藏状态切换到显示状态时，底部条位置错误？

Tabs 组件在挂载时，会获取自身的宽度，并计算出底部条的位置。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法展示底部条位置。

#### 解决方法

方法一，如果是使用 `v-show` 来控制组件展示的，则替换为 `v-if` 即可解决此问题：

```html
<!-- Before -->
<r-tabs v-show="show" />
<!-- After -->
<r-tabs v-if="show" />
```

方法二，调用组件的 resize 方法来主动触发重绘：

```html
<r-tabs v-show="show" ref="tabs" />
```

```js
this.$refs.tabs.resize()
```

### 父元素设置 transform 后，下拉菜单的位置错误？

把 TabsMenuMenu 嵌套在 Tabs 等组件内部使用时，可能会遇到下拉菜单位置错误的问题。这是因为在 Chrome 浏览器中，transform 元素内部的 fixed 布局会降级成 absolute 布局，导致下拉菜单的布局异常。

将 TabsMenuItem 的 teleport 属性设置为 body 即可避免此问题：

```html
<r-tabs-menu-menu>
  <r-tabs-menu-item teleport="body" />
  <r-tabs-menu-item teleport="body" />
</r-tabs-menu-menu>
```
