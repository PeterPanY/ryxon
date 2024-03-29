---
title: Menu
lang: zh
---

# Menu 菜单

为网站提供导航功能的菜单。

## 顶栏

:::demo 导航菜单默认为垂直模式，通过将 `mode` 属性设置为 `horizontal` 来使导航菜单变更为水平模式。 另外，在菜单中通过 `sub-menu` 组件可以生成二级菜单。 Menu 还提供了 `background-color`、`text-color` 和 `active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

menu/basic

:::

## 左右

:::demo 您可以将菜单项放置在左边或右边。

menu/left-and-right

:::

## 侧栏

:::demo 通过 `r-menu-item-group` 组件可以实现菜单进行分组，分组名可以通过 `title` 属性直接设定，也可以通过具名 `slot` 来设定。

menu/vertical

:::

## Collapse 折叠面板

:::demo 垂直导航菜单可以被折叠

menu/collapse

:::

## API

### Menu Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| mode | 菜单展示模式 | `string` | `horizontal / vertical` | `vertical` |
| default-active | 页面加载时默认激活菜单的 index | `string` | — | — |
| default-openeds | 默认打开的 sub-menu 的 index 的数组 | `Array` | — | — |
| unique-opened | 是否只保持一个子菜单的展开 | `boolean` | — | `false` |
| router | 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使 default-active 来设置加载时的激活项。 | `boolean` | — | `false` |
| menu-trigger | 子菜单打开的触发方式，只在 mode 为 horizontal 时有效 | `string` | `hover / click` | `hover` |
| collapse | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用 | `boolean` | — | `false` |
| collapse-transition | 是否开启折叠动画 | `boolean` | — | `true` |
| ellipsis | 是否省略多余的子项（仅在横向模式生效） | `boolean` | — | `true` |
| popper-effect | Tooltip 主题，内置了 dark / light 两种主题 | `string` | `dark / light` | `dark` |
| is-sub-select | 有多级菜单时，父级能否点击跳转 | `boolean` | — | `false` |

### Menu Slots

| 名称    | 说明           | 子标签                                  |
| ------- | -------------- | --------------------------------------- |
| default | 自定义默认内容 | `SubMenu / Menu-Item / Menu-Item-Group` |

### Menu Methods

| 方法名 | 说明                | 参数                                |
| ------ | ------------------- | ----------------------------------- |
| open   | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close  | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

### Menu Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 菜单激活回调 | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path, item: 选中菜单项, routeResult: vue-router 的返回值（如果 router 为 true） |
| open | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index, indexPath: 打开的 sub-menu 的 index path |
| close | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index, indexPath: 收起的 sub-menu 的 index path |

### SubMenu Attributes

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| index | 唯一标志 | `string` | — | — |
| show-timeout | 展开 sub-menu 的延时 | `number` | — | `300` |
| hide-timeout | 收起 sub-menu 的延时 | `number` | — | `300` |
| popper-class | 为 popper 添加类名 | `string` | — | — |
| disabled | 是否禁用 | `boolean` | — | `false` |
| popperAppendToBody | 是否将 popup 的下拉列表插入至 body 元素 | `boolean` | — | `一级子菜单：true / 非一级子菜单：false` |
| popper-offset | 弹出窗口偏移 | `number` | — | `[6, 0]` |
| expand-close-icon | 父菜单展开且子菜单关闭时的图标， expand-close-icon 和 expand-open-icon 需要一起配置才能生效 | `string \| Component` | — | — |
| expand-open-icon | 父菜单展开且子菜单打开时的图标， expand-open-icon 和 expand-close-icon 需要一起配置才能生效 | `string \| Component` | — | — |
| collapse-close-icon | 父菜单收起且子菜单关闭时的图标， expand-close-icon 和 expand-open-icon 需要一起配置才能生效 | `string \| Component` | — | — |
| collapse-open-icon | 父菜单收起且子菜单打开时的图标， expand-open-icon 和 expand-close-icon 需要一起配置才能生效 | `string \| Component` | — | — |

### SubMenu Slots

| 名称    | 说明           | 子标签                                |
| ------- | -------------- | ------------------------------------- |
| default | 自定义默认内容 | SubMenu / Menu-Item / Menu-Item-Group |
| title   | 自定义标题内容 | —                                     |

### Menu-Item Attributes

| 属性名   | 说明                | 类型        | 可选值 | 默认值 |
| -------- | ------------------- | ----------- | ------ | ------ |
| index    | 唯一标志            | string/null | —      | null   |
| route    | Vue Router 路径对象 | object      | —      | —      |
| disabled | 是否禁用            | boolean     | —      | false  |

### Menu-Item Events

| 事件名 | 说明                 | 回调参数         |
| ------ | -------------------- | ---------------- |
| click  | 菜单点击时的回调函数 | r-menu-item 实例 |

### Menu-Item Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
| title   | 自定义标题内容 |

### Menu-Item-Group Attributes

| 属性名 | 说明   | 类型     | 可选值 | 默认值 |
| ------ | ------ | -------- | ------ | ------ |
| title  | 组标题 | `string` | —      | —      |

### Menu-Item-Group Slots

| 名称    | 说明             | 子标签    |
| ------- | ---------------- | --------- |
| default | 默认插槽内容     | Menu-Item |
| title   | 自定义组标题内容 | —         |

### 类型定义

组件导出以下类型定义：

```ts
import type { MenuProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-menu-active-color | `var(--r-primary-color)` | - |
| --r-menu-text-color | `var(--r-text-color-primary)` | - |
| --r-menu-hover-text-color | `var(--r-primary-color)` | - |
| --r-menu-bg-color | `var(--r-fill-color-blank)` | - |
| --r-menu-hover-bg-color | `var(--r-primary-color-light-9)` | - |
| --r-menu-item-height | `56px` | - |
| --r-menu-sub-item-height | `calc(var(--r-menu-item-height) - 6px)` | - |
| --r-menu-horizontal-sub-item-height | `36px` | - |
| --r-menu-item-font-size | `var(--r-font-size-md)` | - |
| --r-menu-item-hover-fill | `var(--r-primary-color-light-9)` | - |
| --r-menu-border-color | `var(--r-border-color)` | - |
| --r-menu-base-level-padding | `20px` | - |
| --r-menu-level-padding | `20px` | - |
| --r-menu-icon-width | `24px` | - |
