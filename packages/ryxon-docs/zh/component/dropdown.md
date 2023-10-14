---
title: Dropdown
lang: zh
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

:::demo 通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

dropdown/basic-usage

:::

## 触发对象

:::demo 设置 split-button 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 true 即可。 如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 divider 的 CSS class。

dropdown/triggering-element

:::

## 触发方式

:::demo 可以配置点击激活或者悬停激活。

dropdown/how-to-trigger

:::

## 菜单隐藏方式

:::demo 下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 `false` 可以关闭此功能。

dropdown/menu-hiding-behavior

:::

## 下拉方法

:::demo 您可以手动使用 手动打开 或 手动关闭下拉菜单以打开或关闭

dropdown/dropdown-methods

:::

## 尺寸

:::demo 使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

dropdown/sizes

:::

## API

### Dropdown Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 菜单按钮类型，同 Button 组件一样，仅在 split-button 为 true 的情况下有效。 | `string` | — | — |
| size | 菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效。 | ^[enum]`string` | `large / default / small` | `default` |
| max-height | 菜单最大高度 | `string / number` | — | — |
| show-arrow | 是否展示小箭头 | `boolean` | `true` |
| split-button | 下拉触发元素呈现为按钮组 | `boolean` | — | `false` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| placement | 菜单弹出位置 | `string` | ^[enum]`top/top-start/top-end/bottom/bottom-start/bottom-end` | `bottom` |
| offset | 出现位置的偏移量 | `[number, number]` | `[0, 8]` |
| trigger | 触发下拉的行为 | string | ^[enum]`hover/click/contextmenu` | `hover` |
| hide-on-click | 是否在点击菜单项后隐藏菜单 | `boolean` | — | `true` |
| show-timeout | 展开下拉菜单的延时，仅在 trigger 为 hover 时有效 | `number` | — | `250` |
| hide-timeout | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效 | `number` | — | `150` |
| role | 下拉菜单的 ARIA 属性。 根据具体场景 | — | `menu` |
| tabindex | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | `number` | — | `0` |
| popper-options | [popper.js](https://popper.js.org/docs/v2/)参数 | ^[object]请参考[popper.js](https://popper.js.org/docs/v2/) | {} |
| popper-class | 自定义浮层类名 | `string` | — | — |
| teleport | 指定挂载的节点，等同于 Teleport 组件的[to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | — | `body` |
| lazyRender | 是否在显示弹层时才渲染节点 | `boolean` | — | `false` |

### Dropdown Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | split-button 为 true 时，点击左侧按钮的回调 | - |
| command | 点击菜单项触发的事件回调 | dropdown-item 的指令 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

### Dropdown Methods

| 方法名      | 说明         | 参数 |
| ----------- | ------------ | ---- |
| handleOpen  | 打开下拉菜单 | -    |
| handleClose | 关闭下拉菜单 | -    |

### Dropdown Slots

| 插槽名 | 说明 | 子标签 |
| --- | --- | --- |
| default | 下拉菜单的内容。 注意：必须是有效的 html DOM 元素（例如 `<span>、<button>` 等）或 r-component，以附加监听触发器 | - |
| dropdown | 下拉列表，通常是 `<r-dropdown-menu>`组件 | Dropdown-Menu |

### Dropdown-Menu Slots

| 插槽名  | 说明           | 子标签        |
| ------- | -------------- | ------------- |
| default | 下拉菜单的内容 | Dropdown-Menu |

### Dropdown-Item Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| command | 派发到 command 回调函数的指令参数 | `string/number/object` | - | - |
| disabled | 是否禁用 | `boolean` | - | `false` |
| divided | 是否显示分隔符 | `boolean` | - | `false` |
| icon | 自定义图标 | `string \| Component` | - | - |

### Dropdown-Item Slots

| 插槽名  | 说明                      |
| ------- | ------------------------- |
| default | 自定义 Dropdown-Item 内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { DropdownThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                              | 默认值                           | 描述 |
| --------------------------------- | -------------------------------- | ---- |
| --r-dropdown-menu-box-shadow      | `var(--r-box-shadow-light)`      | -    |
| --r-dropdown-menuItem-hover-fill  | `var(--r-primary-color-light-9)` | -    |
| --r-dropdown-menuItem-hover-color | `var(--r-primary-color)`         | -    |
| --r-dropdown-menu-index           | `10`                             | -    |
