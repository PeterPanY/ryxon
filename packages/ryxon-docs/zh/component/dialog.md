---
title: Dialog
lang: zh
---

# Dialog 对话框

弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。支持组件调用和函数调用两种方式。

## 函数调用-消息提示

为了便于使用 `Dialog`，Ryxon 提供了一系列辅助函数，通过辅助函数可以快速唤起全局的弹窗组件。

比如使用 `showDialog` 函数，调用后会直接在页面中渲染对应的弹出框。

:::demo

dialog/function-basic

:::

## 函数调用-消息确认

:::demo 用于确认消息，包含取消和确认按钮。

dialog/function-confirm

:::

## 消息类型

:::demo `type` 字段表明消息类型，可以为 `success`，`danger`，`info` 和 `warning`，无效的设置将会被忽略。

dialog/type

:::

## 使用 VNode

:::demo `message` 可以是 `VNode`。

dialog/node

:::

## 使用 HTML 片段

:::demo 将 `allowHtml` 属性设置为 `true`，message 属性就会被当作 HTML 片段处理。

dialog/html

:::

## 自定义图标

:::demo 图标可以使用任意 Vue 组件或 [渲染函数 (JSX)](https://vuejs.org/guide/extras/render-function.html)来自定义。

dialog/icon

:::

## 间隔按钮风格

:::demo 将 theme 选项设置为 `space-button` 可以展示圆角按钮风格的弹窗。

dialog/function-theme

:::

## 异步关闭

:::demo 通过 `beforeClose` 属性可以传入一个回调函数，在弹窗关闭前进行特定操作。

dialog/before-close

:::

## 使用 Dialog 组件

:::demo 如果需要在 Dialog 内嵌入组件或其他自定义内容，可以直接使用 Dialog 组件，并使用默认插槽进行定制。使用前需要通过 `app.use` 等方式注册组件。

dialog/comp-basic

:::

## API

### 方法

Ryxon 中导出了以下 Dialog 相关的辅助函数：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| showDialog | 展示弹窗 | `options: DialogOptions` | `Promise<void>` |
| showConfirmDialog | 展示消息确认弹窗 | `options: DialogOptions` | `Promise<void>` |
| closeDialog | 关闭弹窗 | - | `void` |
| setDialogDefaultOptions | 修改默认配置，影响所有的 `showDialog` 调用 | `options: DialogOptions` | `void` |
| resetDialogDefaultOptions | 重置默认配置，影响所有的 `showDialog` 调用 | - | `void` |

### DialogOptions

调用 `showDialog` 等方法时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| theme | 样式风格，可选值为 `space-button` | `string` | `default` |
| width | 弹窗宽度，默认单位为 `px` | `number \| string` | `320px` |
| position | 弹窗位置，可以`top`，使用`top`,`--r-dialog-margin-top`将失效 | `string` | `center` |
| message | 文本内容，支持通过 `\n` 换行 | `string \| VNode \| () => VNode` | - |
| type | 弹窗类型，用于图标显示，可选`success / info / warning / danger` | `string` | - |
| icon | 自定义图标组件，会覆盖 type 的类型 | `string / Component` | - |
| allowHtml | 是否允许 message 内容中渲染 HTML | `boolean` | `false` |
| className | 自定义类名 | `string \| Array \| object` | - |
| transition | 动画类名，等价于 [transition](https://vuejs.org/api/built-in-components.html#transition) 的 `name` 属性 | `string` | - |
| messageAlign | 内容对齐方式，可选值为 `left` `right` | `string` | `center` |
| closeOnPopstate | 是否在页面回退时自动关闭 | `boolean` | `true` |
| showConfirmButton | 是否展示确认按钮 | `boolean` | `true` |
| confirmButtonText | 确认按钮文案 | `string` | `确认` |
| confirmButtonColor | 确认按钮颜色 | `string` | `#ee0a24` |
| confirmButtonDisabled | 是否禁用确认按钮 | `boolean` | `false` |
| showCancelButton | 是否展示取消按钮 | `boolean` | `false` |
| cancelButtonText | 取消按钮文案 | `string` | `取消` |
| cancelButtonColor | 取消按钮颜色 | `string` | `black` |
| cancelButtonDisabled | 是否禁用取消按钮 | `boolean` | `false` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭弹窗 | `boolean` | `false` |
| showClose | 是否显示右上角关闭按钮 | `boolean` | `true` |
| showFooter | 是否显示底部按钮 | `boolean` | `true` |
| callback | 关闭后的回调 | `function` | - |
| overlay | 是否展示遮罩层 | `boolean` | `true` |
| overlayClass | 自定义遮罩层类名 | `string \| Array \| object` | - |
| overlayStyle | 自定义遮罩层样式 | `object` | - |
| lockScroll | 是否锁定背景滚动 | `boolean` | `true` |
| beforeClose | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | `(action: string) => boolean \| Promise\<boolean\>` | - |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | `body` |

### Props

通过组件调用 `Dialog` 时，支持以下 Props：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:show | 是否显示弹窗 | `boolean` | - |
| title | 标题 | `string` | - |
| theme | 样式风格，可选值为 `space-button` | `string` | `default` |
| width | 弹窗宽度，默认单位为 `px` | `number \| string` | `320px` |
| position | 弹窗位置，可以`top`，使用`top`,`--r-dialog-margin-top`将失效 | `string` | `center` |
| message | 文本内容，支持通过 `\n` 换行 | `string \| () => JSX.Element` | - |
| type | 弹窗类型，用于图标显示，可选`success / info / warning / danger` | `string` | - |
| icon | 自定义图标组件，会覆盖 type 的类型 | `string / Component` | - |
| allow-html | 是否允许 message 内容中渲染 HTML | `boolean` | `false` |
| class-name | 自定义类名 | `string \| Array \| object` | - |
| transition | 动画类名，等价于 [transition](https://vuejs.org/api/built-in-components.html#transition) 的 `name` 属性 | `string` | - |
| message-align | 内容水平对齐方式，可选值为 `left` `right` `justify` | `string` | `center` |
| close-on-popstate | 是否在页面回退时自动关闭 | `boolean` | `true` |
| show-confirm-button | 是否展示确认按钮 | `boolean` | `true` |
| confirm-button-text | 确认按钮文案 | `string` | `确认` |
| confirm-button-color | 确认按钮颜色 | `string` | `#ee0a24` |
| confirm-button-disabled | 是否禁用确认按钮 | `boolean` | `false` |
| show-cancel-button | 是否展示取消按钮 | `boolean` | `false` |
| cancel-button-text | 取消按钮文案 | `string` | `取消` |
| cancel-button-color | 取消按钮颜色 | `string` | `black` |
| cancel-button-disabled | 是否禁用取消按钮 | `boolean` | `false` |
| close-on-click-overlay | 是否在点击遮罩层后关闭弹窗 | `boolean` | `false` |
| show-close | 是否显示右上角关闭按钮 | `boolean` | `true` |
| show-footer | 是否显示底部按钮 | `boolean` | `true` |
| callback | 关闭后的回调 | `function` | - |
| z-index | 将弹窗的 z-index 层级设置为一个固定值 | `number \| string` | `2000+` |
| overlay | 是否展示遮罩层 | `boolean` | `true` |
| overlay-class | 自定义遮罩层类名 | `string` | - |
| overlay-style | 自定义遮罩层样式 | `object` | - |
| lazy-render | 是否在显示弹层时才渲染节点 | `boolean` | `true` |
| lock-scroll | 是否锁定背景滚动 | `boolean` | `true` |
| before-close | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | `(action: string) => boolean \| Promise\<boolean\>` | - |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | - |

### Events

通过组件调用 `Dialog` 时，支持以下事件：

| 事件    | 说明                     | 回调参数 |
| ------- | ------------------------ | -------- |
| confirm | 点击确认按钮时触发       | -        |
| cancel  | 点击取消按钮时触发       | -        |
| open    | 打开弹窗时触发           | -        |
| close   | 关闭弹窗时触发           | -        |
| opened  | 打开弹窗且动画结束后触发 | -        |
| closed  | 关闭弹窗且动画结束后触发 | -        |

### Slots

通过组件调用 `Dialog` 时，支持以下插槽：

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义内容         |
| title   | 自定义标题         |
| footer  | 自定义底部按钮区域 |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  DialogProps,
  DialogTheme,
  DialogMessage,
  DialogOptions,
  DialogMessageAlign
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                                     | 默认值                    | 描述 |
| ---------------------------------------- | ------------------------- | ---- |
| --r-dialog-width                         | `320px`                   | -    |
| --r-dialog-small-screen-width            | `90%`                     | -    |
| --r-dialog-font-size                     | `var(--r-font-size-lg)`   | -    |
| --r-dialog-transition                    | `var(--r-duration-base)`  | -    |
| --r-dialog-radius                        | `4px`                     | -    |
| --r-dialog-background                    | `var(--r-background-2)`   | -    |
| --r-dialog-header-font-weight            | `var(--r-font-bold)`      | -    |
| --r-dialog-header-line-height            | `21px`                    | -    |
| --r-dialog-header-padding-top            | `26px`                    | -    |
| --r-dialog-header-isolated-padding       | `var(--r-padding-lg) 0`   | -    |
| --r-dialog-header-background             | `var(--r-background)`     | -    |
| --r-dialog-message-padding               | `var(--r-padding-lg)`     | -    |
| --r-dialog-message-font-size             | `var(--r-font-size-md)`   | -    |
| --r-dialog-message-line-height           | `var(--r-line-height-md)` | -    |
| --r-dialog-message-max-height            | `60vh`                    | -    |
| --r-dialog-has-title-message-text-color  | `var(--r-gray-7)`         | -    |
| --r-dialog-has-title-message-padding-top | `0`                       | -    |
| --r-dialog-button-height                 | `48px`                    | -    |
| --r-dialog-button-space                  | `12px`                    | -    |
| --r-dialog-button-radius                 | `4px`                     | -    |
| --r-dialog-space-button-height           | `40px`                    | -    |
| --r-dialog-confirm-button-text-color     | `var(--r-primary-color)`  | -    |
| --r-dialog-padding-primary               | `15px`                    | -    |
| --r-dialog-margin-top                    | `15vh`                    | -    |
| --r-dialog-close-font-size               | `20px`                    | -    |

## 常见问题

### 引用 showDialog 时出现编译报错？

如果引用 `showDialog` 方法时出现以下报错，说明项目中使用了 `babel-plugin-import` 插件，导致代码被错误编译。

```bash
These dependencies were not found:

* ryxon/es/show-dialog in ./src/xxx.js
* ryxon/es/show-dialog/style in ./src/xxx.js
```

Ryxon 不支持 `babel-plugin-import` 插件，请参考 [快速开始](/zh/guide/quickstart.html#babel-plugin-import) 移除该插件。

### 在 beforeRouteLeave 里调用 Dialog 无法展示？

将 `closeOnPopstate` 属性设置为 false 即可。

```js
import { showDialog } from 'ryxon'

showDialog({
  title: '标题',
  message: '弹窗内容',
  closeOnPopstate: false
}).then(() => {
  // on close
})
```
