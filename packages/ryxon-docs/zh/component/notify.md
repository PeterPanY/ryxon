---
title: Notify
lang: zh
---

# Notify 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

:::demo 在最简单的情况下，你可以通过设置 `title` 和 `message` 属性来设置通知的标题和正文内容。 默认情况下，通知在 `4500` 毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。 如果你将它设置为 `0`，那么通知将不会自动关闭。 需要注意的是 `duration` 接收一个 `Number`，单位为毫秒。

notify/basic

:::

## 不同类型的通知

:::demo Notify 组件准备了四种通知类型：`success`, `warning`, `info`, `error`。 他们可以设置 `type` 字段来修改，除上述的四个值之外的值会被忽略。 同时，我们也为 Notify 的各种 type 注册了单独的方法，可以在不传入 `type` 字段的情况下像 `open3` 和 `open4` 那样直接调用。

notify/different-types

:::

## 自定义消息弹出的位置

:::demo 使用 `position` 属性设置 Notify 的弹出位置， 支持四个选项：`top-right`、`top-left`、`bottom-right` 和 `bottom-left`， 默认为 `top-right`。

notify/positioning

:::

## 有位置偏移的通知栏

:::demo Notify 提供设置偏移量的功能，通过设置 `offset` 字段，可以使弹出的消息距屏幕边缘偏移一段距离。 注意在同一时刻，每一个的 Notify 实例应当具有一个相同的偏移量。

notify/offsetting

:::

## 使用 HTML 片段作为正文内容

:::demo 将 `dangerouslyUseHTMLString` 属性设置为 `true`，`message` 属性就会被当作 HTML 片段处理。

notify/raw-html

:::

:::warning

`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。

:::

## 隐藏关闭按钮

:::demo 将 `showClose` 属性设置为 `false` 即可隐藏关闭按钮。

notify/no-close

:::

## 动态更新通知

:::demo 执行 Notify 方法时会返回对应的 Notify 实例，通过修改实例上的 `message` 属性可以实现动态更新提示的效果。

notify/dynamic

:::

## 应用程序上下文继承

现在 Notify 接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 Notify 中，这将允许你继承应用程序的所有属性。

:::tip

如果您全局注册了 RNotify 组件，它将自动继承应用的上下文环境。

:::

```ts
import { getCurrentInstance } from 'vue'
import { showNotify } from 'ryxon'

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!
showNotify({}, appContext)
```

## 使用 Notify 组件

:::demo 如果需要在 Notify 内嵌入组件或其他自定义内容，可以直接使用 Notify 组件，并使用 `message` 插槽进行定制。重复点击无效，组件隐藏无自动销毁

notify/comp

:::

## api

### 方法

Ryxon 中导出了以下 Notify 相关的辅助函数：

| 方法名            | 说明         | 参数                | 返回值      |
| ----------------- | ------------ | ------------------- | ----------- |
| showNotify        | 展示通知     | `Options \| string` | Notify 实例 |
| showSuccessNotify | 展示成功通知 | `Options \| string` | Notify 实例 |
| showInfoNotify    | 展示提示通知 | `Options \| string` | Notify 实例 |
| showWarningNotify | 展示警告通知 | `Options \| string` | Notify 实例 |
| showDangerNotify  | 展示错误通知 | `Options \| string` | Notify 实例 |
| closeNotifyAll    | 关闭实例     | `type`              | Notify 实例 |

### NotifyOptions

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 标题 | `string` | — | — |
| message | 通知栏正文内容 | `string/Vue.VNode` | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | `boolean` | — | `false` |
| type | 通知的类型 | `string` | ^[etype]`success/warning/info/error` | — |
| icon | 自定义图标。 若设置了 type，则 icon 会被覆盖 | `string \| Component` | — | — |
| customClass | 自定义类名 | `string` | — | — |
| duration | 显示时间, 单位为毫秒。 值为 0 则不会自动关闭 | `number` | — | `4500` |
| position | 自定义弹出位置 | `string` | ^[eposition]`top-right/top-left/bottom-right/bottom-left` | `top-right` |
| showClose | 是否显示关闭按钮 | `boolean` | — | `true` |
| onClose | 关闭时的回调函数 | — | — |
| onClick | 点击 Notify 时的回调函数 | `function` | — | — |
| offset | 相对屏幕顶部的偏移量 偏移的距离，在同一时刻，所有的 Notify 实例应当具有一个相同的偏移量 | `number` | — | `0` |
| appendTo | 设置通知栏在 DOM 中的元素 | `string / HTMLElement` | - | `body` |
| zIndex | 初始 zIndex | `number` | - | `0` |

### NotifyMethods

`Notify` 返回当前的 Notify 实例。 如果需要手动关闭实例，可以调用它的 `close` 方法。

| 方法名 | 描述              |
| ------ | ----------------- |
| close  | 关闭当前的 Notify |

### Props

通过组件调用 `Notify` 时，支持以下 Props：

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model:show | 是否显示弹窗 | `boolean` | - | `false` |
| message | 通知栏正文内容 | `string/Vue.VNode` | — | — |
| dangerously-use-HTML-string | 是否将 message 属性作为 HTML 片段处理 | `boolean` | — | `false` |
| type | 通知的类型 | `string` | ^[etype]`success/warning/info/error` | — |
| icon | 自定义图标。 若设置了 type，则 icon 会被覆盖 | `string \| Component` | — | — |
| custom-class | 自定义类名 | `string` | — | — |
| duration | 显示时间, 单位为毫秒。 值为 0 则不会自动关闭 | `number` | — | `4500` |
| position | 自定义弹出位置 | `string` | ^[eposition]`top-right/top-left/bottom-right/bottom-left` | `top-right` |
| show-close | 是否显示关闭按钮 | `boolean` | — | `true` |
| on-close | 关闭时的回调函数 | — | — |
| on-click | 点击 Notify 时的回调函数 | `function` | — | — |
| offset | 相对屏幕顶部的偏移量 偏移的距离 | `number` | — | `0` |
| append-to | 设置通知栏在 DOM 中的元素 | `string / HTMLElement` | - | `body` |
| z-index | 初始 zIndex | `number` | - | `0` |

### Events

通过组件调用 `Notify` 时，支持以下事件：

| 事件名  | 说明           | 回调参数 |
| ------- | -------------- | -------- |
| destroy | 在离开过渡完成 | -        |

### Slots

通过组件调用 `Notify` 时，支持以下插槽：

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type { NotifyProps, NotifyThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                          | 默认值                              | 描述 |
| ----------------------------- | ----------------------------------- | ---- |
| --r-notify-width              | `330px`                             | -    |
| --r-notify-padding            | `14px 26px 14px 13px`               | -    |
| --r-notify-radius             | `8px`                               | -    |
| --r-notify-shadow             | `var(--r-box-shadow-light)`         | -    |
| --r-notify-border-color       | `var(--r-border-color-lighter)`     | -    |
| --r-notify-icon-size          | `24px`                              | -    |
| --r-notify-close-font-size    | `var(--r-message-close-size, 16px)` | -    |
| --r-notify-group-margin-left  | `13px`                              | -    |
| --r-notify-group-margin-right | `8px`                               | -    |
| --r-notify-content-font-size  | `var(--r-font-size-md)`             | -    |
| --r-notify-content-color      | `var(--r-text-color-regular)`       | -    |
| --r-notify-title-font-size    | `16px`                              | -    |
| --r-notify-title-color        | `var(--r-text-color-primary)`       | -    |
| --r-notify-close-color        | `var(--r-text-color-secondary)`     | -    |
| --r-notify-close-hover-color  | `var(--r-text-color-regular)`       | -    |

## 常见问题

### 引用 showNotify 时出现编译报错？

如果引用 `showNotify` 方法时出现以下报错，说明项目中使用了 `babel-plugin-import` 插件，导致代码被错误编译。

```bash
These dependencies were not found:

* ryxon/es/show-notify in ./src/xxx.js
* ryxon/es/show-notify/style in ./src/xxx.js
```

Ryxon 版本不支持 `babel-plugin-import` 插件，请移除该插件。
