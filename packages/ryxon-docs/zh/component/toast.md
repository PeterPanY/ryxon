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

## 函数调用

为了便于使用 `Toast`，Ryxon 提供了一系列辅助函数，通过辅助函数可以快速唤起全局的 Toast 组件。

比如使用 `showToast` 函数，调用后会直接在页面中渲染对应的轻提示。

:::demo

toast/basic

:::

## API

### 方法

Ryxon 中导出了以下 Toast 相关的辅助函数：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| showToast | 展示提示 | `ToastOptions / string` | toast 实例 |
| showLoadingToast | 展示加载提示 | `ToastOptions / string` | toast 实例 |
| showSuccessToast | 展示成功提示 | `ToastOptions / string` | toast 实例 |
| showFailToast | 展示失败提示 | `ToastOptions / string` | toast 实例 |
| closeToast | 关闭提示 | `closeAll: boolean` | `void` |
| allowMultipleToast | 允许同时存在多个 Toast | - | `void` |
| setToastDefaultOptions | 修改默认配置，影响所有的 `showToast` 调用。<br>传入 type 可以修改指定类型的默认配置 | `type / ToastOptions` | `void` |
| resetToastDefaultOptions | 重置默认配置，影响所有的 `showToast` 调用。<br>传入 type 可以重置指定类型的默认配置 | `type` | `void` |

### ToastOptions 数据结构

调用 `showToast` 等方法时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 提示类型，可选值为 `loading` `success` `warning` `info` `error` `html` | _ToastType_ | `text` |
| position | 位置，可选值为 `top` `bottom` | _ToastPosition_ | `middle` |
| message | 文本内容，支持通过`\n`换行 | _string_ | `''` |
| wordBreak | 文本内容的换行方式，可选值为 `normal` `break-all` `break-word` | _ToastWordBreak_ | `'break-all'` |
| icon | 自定义图标，支持传入图标名称或图片链接，等同于 Icon 组件的 name 属性 | _string_ | - |
| iconSize | 图标大小，如 `20px` `2em`，默认单位为 `px` | _number / string_ | `36px` |
| iconPrefix | 图标类名前缀，等同于 Icon 组件的 class-prefix 属性 | _string_ | `r-icon` |
| overlay | 是否显示背景遮罩层 | _boolean_ | `false` |
| forbidClick | 是否禁止背景点击 | _boolean_ | `false` |
| closeOnClick | 是否在点击后关闭 | _boolean_ | `false` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭 | _boolean_ | `false` |
| loadingType | 加载图标类型, 可选值为 `spinner` | _string_ | `circular` |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | _number_ | `2000` |
| className | 自定义类名 | _string / Array / object_ | - |
| overlayClass | 自定义遮罩层类名 | _string / Array / object_ | - |
| overlayStyle | 自定义遮罩层样式 | _object_ | - |
| onOpened | 完全展示后的回调函数 | _Function_ | - |
| onClose | 关闭时的回调函数 | _Function_ | - |
| transition | 动画类名，等价于 [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition) 的`name`属性 | _string_ | `r-fade` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://v3.cn.vuejs.org/api/built-in-components.html#teleport) | _string \| Element_ | `body` |

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
