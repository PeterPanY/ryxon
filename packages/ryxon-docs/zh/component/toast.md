---
title: Toast
lang: zh
---

# Toast 消息提示

在页面上弹出提示，用于消息通知、加载提示、操作结果提示等场景。常用于主动操作后的反馈提示

## 引入

通过以下方式来全局注册组件，更多注册方式请参考组件注册。

```ts
import { createApp } from 'vue'
import { Toast } from 'Ryxon'

const app = createApp()
app.use(Toast)
```

## 基础用法

为了便于使用 `Toast`，Ryxon 提供了一系列辅助函数，通过辅助函数可以快速唤起全局的 Toast 组件。

比如使用 `showToast` 函数，调用后会直接在页面中渲染对应的提示。

:::demo

toast/basic

:::

:::warning

`toast` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `type: 'html'` 打开的情况下，请确保 toast 的内容是可信的，永远不要将用户提交的内容赋值给 toast 属性。

:::

## 自定义图标

通过 `icon` 选项可以自定义图标，支持传入图标名称或图片链接，等同于 Icon 组件的 name 属性。

:::demo

toast/icon

:::

## 自定义位置

Toast 默认渲染在屏幕正中位置，通过 `position` 属性可以控制 Toast 展示的位置。

:::demo

toast/position

:::

## 文字换行方式

通过 `wordBreak` 选择可以控制 Toast 中的文字过长时的截断方式，默认值为 `break-all`，可选值为 `break-word` 和 `normal`。

:::demo

toast/word-break

:::

## 动态更新提示

执行 Toast 方法时会返回对应的 Toast 实例，通过修改实例上的 `message` 属性可以实现动态更新提示的效果。

:::demo

toast/dynamic

:::

## 单例模式

Toast 默认采用多例模式，即同一时间只会存在多个 Toast，如果需要在同一时间弹出单个 Toast，可以参考下面的示例：

```js
import { showToast, notAllowMultipleToast } from 'ryxon'

notAllowMultipleToast()

const toast1 = showToast('第一个 Toast')
const toast2 = showToast('第二个 Toast')

toast1.close()
toast2.close()
```

## 修改默认配置

通过 `setToastDefaultOptions` 函数可以全局修改 `showToast` 方法的默认配置。

```js
import { setToastDefaultOptions, resetToastDefaultOptions } from 'ryxon'

setToastDefaultOptions({ duration: 2000 })

setToastDefaultOptions('loading', { forbidClick: true })

resetToastDefaultOptions()

resetToastDefaultOptions('loading')
```

## 使用 Toast 组件

如果需要在 Toast 内嵌入组件或其他自定义内容，可以直接使用 Toast 组件，并使用 message 插槽进行定制。使用前需要通过 `app.use` 等方式注册组件。

:::demo

toast/component

:::

## API

### 方法

Ryxon 中导出了以下 Toast 相关的辅助函数：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| showToast | 展示提示 | `ToastOptions / string` | toast 实例 |
| notAllowMultipleToast | 只允许同时存在一个 Toast | - | `void` |
| setToastDefaultOptions | 修改默认配置，影响所有的 `showToast` 调用。<br>传入 type 可以修改指定类型的默认配置 | `type / ToastOptions` | `void` |
| resetToastDefaultOptions | 重置默认配置，影响所有的 `showToast` 调用。<br>传入 type 可以重置指定类型的默认配置 | `type` | `void` |

### ToastOptions 数据结构

调用 `showToast` 等方法时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 提示类型，可选值为 `loading` `success` `warning` `info` `danger` `html` | `ToastType` | `text` |
| position | 位置，可选值为 `middle` `bottom` | `ToastPosition` | `top` |
| message | 文本内容，支持通过`\n`换行 | `string` | `''` |
| wordBreak | 文本内容的换行方式，可选值为 `normal` `break-all` `break-word` | `ToastWordBreak` | `'break-all'` |
| icon | 自定义图标，支持传入图片组件或图片链接，等同于 Icon 组件的 name 属性 | `string / Component` | - |
| iconSize | 图标大小，如 `20px` `2em`，默认单位为 `px` | `number / string` | `14px` |
| iconPrefix | 图标类名前缀，等同于 Icon 组件的 class-prefix 属性 | `string` | `r-icon` |
| overlay | 是否显示背景遮罩层 | `boolean` | `false` |
| forbidClick | 是否禁止背景点击 | `boolean` | `false` |
| closeOnClick | 是否在点击后关闭 | `boolean` | `false` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭 | `boolean` | `false` |
| loadingType | 加载图标类型, 可选值为 `spinner` | `string` | `circular` |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | `number` | `3000` |
| className | 自定义类名 | `string / Array / object` | - |
| overlayClass | 自定义遮罩层类名 | `string / Array / object` | - |
| overlayStyle | 自定义遮罩层样式 | `object` | - |
| onOpened | 完全展示后的回调函数 | `Function` | - |
| onClose | 关闭时的回调函数 | `Function` | - |
| transition | 动画类名，等价于 [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition) 的`name`属性 | `string` | `r-fade` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://v3.cn.vuejs.org/api/built-in-components.html#teleport) | `string \| Element` | `body` |

### Slots

使用 `Toast` 组件时，支持以下插槽：

| 名称    | 说明           |
| ------- | -------------- |
| message | 自定义文本内容 |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  ToastType,
  ToastProps,
  ToastOptions,
  ToastPosition,
  ToastWordBreak
} from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-toast-max-width | `70%` | - |
| --r-toast-font-size | `var(--r-font-size-md)` | - |
| --r-toast-text-color | `var(--r-white)` | - |
| --r-toast-loading-icon-color | `var(--r-white)` | - |
| --r-toast-line-height | `var(--r-line-height-md)` | - |
| --r-toast-radius | `var(--r-radius-lg)` | - |
| --r-toast-background | `fade(var(--r-black), 70%)` | - |
| --r-toast-icon-size | `36px` | - |
| --r-toast-text-min-width | `96px` | - |
| --r-toast-text-padding | `var(--r-padding-xs) var(--r-padding-sm)` | - |
| --r-toast-default-padding | `var(--r-padding-md)` | - |
| --r-toast-default-width | `88px` | - |
| --r-toast-default-min-height | `88px` | - |
| --r-toast-position-top-distance | `20%` | - |
| --r-toast-position-bottom-distance | `20%` | - |

## 常见问题

### 引用 showToast 时出现编译报错？

如果引用 `showToast` 方法时出现以下报错，说明项目中使用了 `babel-plugin-import` 插件，导致代码被错误编译。

```bash
These dependencies were not found:

* ryxon/es/show-toast in ./src/xxx.js
* ryxon/es/show-toast/style in ./src/xxx.js
```

Ryxon 版本不支持 `babel-plugin-import` 插件，请移除该插件。
