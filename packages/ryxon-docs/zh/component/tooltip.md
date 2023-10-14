---
title: Tooltip
lang: zh
---

# Tooltip 选择器

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： placement 属性值为：`[方向]-[对齐位置]`；四个方向：`top、left、right、bottom`；三种对齐位置：`start, end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

tooltip/basic

:::

## 主题

Tooltip 组件内置了两个主题：`dark` 和 `light`。

:::tip

要使用自定义主题，您必须知道您的工具提示在哪里渲染， 如果您的工具提示被呈现为根元素，您将需要全局设置 css 规则。

建议您使用自定义主题并同时显示箭头时不使用线性渐变背景颜色。 因为弹出箭头和内容是两个不同的元素， 弹出箭头的样式需要单独设置， 当它到渐变背景颜色时，会看起来很奇怪。

:::

:::demo 通过设置 `theme` 来修改主题，默认值为 `dark`.

tooltip/theme

:::

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

:::demo 用具名 slot `content`，替代`tooltip`中的`content`属性。

tooltip/rich-content

:::

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`r-tooltip-zoom`。

如果需要关闭 `tooltip` `功能，disabled` 属性可以满足这个需求， 你只需要将其设置为 `true`。

:::demo 用具名 slot `content`，替代`tooltip`中的`content`属性。

tooltip/advanced-usage

:::

:::tip

Tooltip 内不支持 `router-link` 组件，请使用 `vm.$router.push` 代替。

Tooltip 内不支持 disabled form 元素

:::

## 显示 HTML 内容

内容属性可以设置为 HTML 字符串。

:::warning

`content` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `raw-content` 打开的情况下，请确保 `content` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `content` 属性。

:::

:::demo

tooltip/html-content

:::

## 虚拟触发

:::demo tooltip 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

tooltip/virtual

:::

:::tip

需要注意的是，虚拟触发的 tooltip 是受控组件，因此你必须自己去控制 tooltip 是否显示，你将无法通过点击空白处来关闭 tooltip。

:::

## 受控模式

:::demo Tooltip 可以通过父组件使用 `:visible` 来控制它的显示与关闭。

tooltip/controlled

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible / v-model:visible | Tooltip 组件可见性 | `boolean` | `false` |
| content | 显示的内容，也可被 `slot#content` 覆盖 | `string` | `-` |
| raw-content | `content` 中的内容是否作为 HTML 字符串处理 | `boolean` | `false` |
| disabled | Tooltip 组件是否禁用 | `boolean` | `false` |
| theme | 主题风格，可选值为 `light` | `TooltipTheme` | `dark` |
| trigger | 触发方式，可选值为 `click、focus、contextmenu ` | `TooltipTrigger` | `hover` |
| virtual-triggering | 用来标识虚拟触发是否被启用 | `boolean` | `-` |
| virtual-ref | 标识虚拟触发时的触发元素 | `HTMLElement` | `-` |
| trigger-keys | 当鼠标点击或者聚焦在触发元素上时， 可以定义一组键盘按键并且通过它们来控制 Tooltip 的显示 | `Array` | `['Enter','Space']` |
| show-arrow | 是否展示小箭头 | `boolean` | `true` |
| placement | 弹出位置 | ^[TooltipPlacement]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom` |
| offset | 出现位置的偏移量 | `[number, number]` | `[0, 8]` |
| transition | 动画名称 | `string ` | `r-tooltip-zoom` |
| enterable | 鼠标是否可进入到 tooltip 中(设置为 false 时只有触发方式为 hover 下才有作用) | `Boolean` | `true` |
| show-after | 在触发后多久显示内容，单位毫秒 | `number ` | `0` |
| hide-after | 延迟关闭，单位毫秒 | `number` | `200` |
| auto-close | tooltip 出现后自动隐藏延时，单位毫秒 | `number` | `0` |
| z-index | 将弹窗的 z-index 层级设置为一个固定值 | `number \| string` | `2000+` |
| duration | 动画时长，单位秒，设置为 0 可以禁用动画 | `number / string` | `0.3` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string / Element` | `body` |
| lazy-render | 是否在显示弹层时才渲染节点 | `boolean` | `true` |
| before-close | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise | `(action: string) => boolean \| Promise<boolean>` | `-` |
| overlay-class | 自定义遮罩层类名 | `string / Array / object` | - |
| overlay-style | 自定义遮罩层样式 | `object` | - |
| popper-options | [popper.js](https://popper.js.org/docs/v2/)参数 | ^[object]请参考[popper.js](https://popper.js.org/docs/v2/) | {} |
| popper-class | 自定义弹窗样式 | `string / Array / object` | - |
| popper-style | 自定义弹窗样式 | `object` | - |
| transition-appear | 是否在初始渲染时启用过渡动画 | `boolean` | `false` |
| close-on-click-outside | 是否在点击外部元素后关闭菜单 | `boolean` | `true` |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单 | `boolean` | `true` |
| persistent | 当 tooltip 组件长时间不触发且 persistent 属性设置为 false 时, popconfirm 将会被删除 | `boolean` | `false` |

### Slots

| 名称    | 说明                      | 参数 |
| ------- | ------------------------- | ---- |
| default | Tooltip 触发 & 引用的元素 | -    |
| content | 自定义内容                | -    |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| isFocusInsideContent | 验证当前焦点事件是否在 r-tooltip-content 中触发 | ^[Function]`() => boolean \| undefined` |
| updatePopper | 更新 r-popper 组件实例 | ^[Function]`() => void` |
| onOpen | onOpen 方法控制 r-tooltip 显示状态 | ^[Function]`(event?: Event \| undefined) => void` |
| onClose | onClose 方法控制 r-tooltip 显示状态 | ^[Function]`(event?: Event \| undefined) => void` |
| hide | 提供 hide 方法 | ^[Function]`(event?: Event \| undefined) => void` |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  TooltipTheme,
  TooltipTrigger,
  TooltipThemeVars,
  TooltipPlacement
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值                  | 描述 |
| ---------------------------- | ----------------------- | ---- |
| --r-tooltip-arrow-size       | `6px`                   | -    |
| --r-tooltip-radius           | `var(--r-radius-lg)`    | -    |
| --r-tooltip-light-text-color | `var(--r-text-color)`   | -    |
| --r-tooltip-light-background | `var(--r-background-2)` | -    |
| --r-tooltip-dark-text-color  | `var(--r-white)`        | -    |
| --r-tooltip-dark-background  | `#4a4a4a`               | -    |
