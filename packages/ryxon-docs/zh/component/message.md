---
title: Message
lang: zh
---

# Message 消息提示

在页面上弹出提示，用于消息通知、加载提示、操作结果提示等场景。常用于主动操作后的反馈提示

## 基础用法

:::demo 从顶部出现，3 秒后自动消失。

message/basic

:::

## 不同状态

:::demo 当需要自定义更多属性时，`Message` 也可以接收一个对象为参数。 比如，设置 `type` 字段可以定义不同的状态，默认为`info`。 此时正文内容以 `message` 的值传入。 同时，我们也为 `Message` 的各种 `type` 注册了方法，可以在不传入 `type` 字段的情况下像 `open4` 那样直接调用。

message/different-types

:::

## 可关闭的消息提示

:::demo 默认的 `Message` 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 true

message/closable

:::

## 文字居中

:::demo 使用 `center` 属性让文字水平居中。

message/centered-content

:::

## 使用 HTML 片段作为正文内容

:::demo 将`dangerouslyUseHTMLString`属性设置为 `true`,`message` 就会被当作 `HTML` 片段处理。

message/raw-html

:::

:::warning

message 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。 因此在 dangerouslyUseHTMLString 打开的情况下，请确保 message 的内容是可信的，永远不要将用户提交的内容赋值给 message 属性。

:::

## 分组消息合并

:::demo 设置 `grouping` 为 `true`，内容相同的 `message` 将被合并。

message/grouping

:::

## 应用程序上下文继承

现在 Message 接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 Message 中，这将允许你继承应用程序的所有属性。

:::tip

如果您全局注册了 RMessage 组件，它将自动继承应用的上下文环境。

:::

```ts
import { getCurrentInstance } from 'vue'
import { showMessage } from 'ryxon'

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!
showMessage({}, appContext)
```

## 使用 Message 组件

## API

### 方法

Ryxon 中导出了以下 Message 相关的辅助函数：

| 方法名             | 说明         | 参数                | 返回值       |
| ------------------ | ------------ | ------------------- | ------------ |
| showMessage        | 展示消息     | `Options \| string` | Message 实例 |
| showSuccessMessage | 展示成功消息 | `Options \| string` | Message 实例 |
| showInfoMessage    | 展示提示消息 | `Options \| string` | Message 实例 |
| showWarningMessage | 展示警告消息 | `Options \| string` | Message 实例 |
| showDangerMessage  | 展示错误消息 | `Options \| string` | Message 实例 |
| closeAllMessage    | 关闭实例     | `type`              | Message 实例 |

### Options

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `message` | 消息文字 | `string \| VNode \| (() => VNode)` | — |
| `type` | 消息类型 | `'success' \| 'warning' \| 'info' \| 'danger'` | `'info'` |
| `icon` | 自定义图标，该属性会覆盖 `type` 的图标。 | `string \| Component` | — |
| `dangerouslyUseHTMLString` | 是否将 `message` 属性作为 HTML 片段处理 | `boolean` | `false` |
| `custom-class` | 自定义类名 | `string` | — |
| `duration` | 显示时间，单位为毫秒。 设为 0 则不会自动关闭 | `number` | `3000` |
| `show-close` | 是否显示关闭按钮 | `boolean` | `false` |
| `center` | 文字是否居中 | `boolean` | `false` |
| `on-close` | 关闭时的回调函数, 参数为被关闭的 message 实例 | `function` | — |
| `offset` | Message 距离窗口顶部的偏移量 | `number` | `20` |
| `appendTo` | 设置组件的根元素 | `string \| HTMLElement` | `document.body` |
| `grouping` | 合并内容相同的消息，不支持 VNode 类型的消息 | `boolean` | `false` |

### Methods

调用 `Message` 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 close 方法。

| Method  | Description       |
| ------- | ----------------- |
| `close` | close the Message |

### 类型定义

组件导出以下类型定义：

```ts
import type { MessageProps, MessageThemeVars } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                          | 默认值                          | 描述 |
| ----------------------------- | ------------------------------- | ---- |
| --r-message-bg-color          | var(--r-info-color-light-9)     | -    |
| --r-message-border-color      | var(--r-border-color-lighter)   | -    |
| --r-message-padding           | 15px 19px                       | -    |
| --r-message-close-size        | 16px                            | -    |
| --r-message-close-icon-color  | var(--r-text-color-placeholder) | -    |
| --r-message-close-hover-color | var(--r-text-color-secondary)   | -    |

## 常见问题

### 引用 showMessage 时出现编译报错？

如果引用 `showMessage` 方法时出现以下报错，说明项目中使用了 `babel-plugin-import` 插件，导致代码被错误编译。

```bash
These dependencies were not found:

* ryxon/es/show-message in ./src/xxx.js
* ryxon/es/show-message/style in ./src/xxx.js
```

Ryxon 版本不支持 `babel-plugin-import` 插件，请移除该插件。
