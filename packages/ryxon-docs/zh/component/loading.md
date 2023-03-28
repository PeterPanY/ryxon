---
title: Loading
lang: zh
---

# Loading 加载

加载图标，用于表示加载中的过渡状态。

## 基础用法

:::demo 通过 `type` 属性可以设置加载图标的类型，默认为 `circular`，可选值为 `spinner`。

loading/basic

:::

## 文案用法

:::demo 可以使用默认插槽在图标的右侧插入加载文案。

loading/text

:::

## 自定义图标

:::demo 通过 `icon` 插槽可以自定义加载图标。

loading/custom

:::

## 指令-区域加载

使用指令方法，组件需要全局注册

```js
import { createApp } from 'vue'
import { loadingDirective } from 'ryxon'

const app = createApp()
app.directive('loading', loadingDirective)
```

:::demo 默认状况下，Loading 遮罩会插入到绑定元素的子节点。 通过添加 body 修饰符，可以使遮罩插入至 Dom 中的 body 上。

loading/v-basic

:::

## 指令-自定义加载中组件内容

:::demo 在绑定了 `v-loading` 指令的元素上添加 `element-loading-text` 属性，其值会被渲染为加载文案，并显示在加载图标的下方。 类似地，`element-loading-spinner`、`element-loading-background` 属性分别用来设定 svg 图标、背景色值

loading/customization

:::

## 指令-让加载组件铺满整个屏幕

:::demo 当使用指令方式时，全屏遮罩需要添加 `fullscreen` 修饰符（遮罩会插入至` body` 上） 此时若需要锁定屏幕的滚动，可以使用 `lock` 修饰符； 当使用服务方式时，遮罩默认即为全屏，无需额外设置。

loading/fullscreen

:::

## 以服务的方式来调用

:::demo Loading 还可以以服务的方式调用。 你可以像这样引入 Loading 服务。参数详见 Loading 的配置项。需要注意的是，以服务的方式调用的全屏 Loading 是单例的。 若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例

loading/service

:::

## API

### Props

| 参数       | 说明                          | 类型               | 默认值     |
| ---------- | ----------------------------- | ------------------ | ---------- |
| color      | 颜色                          | `string`           | `#c9c9c9`  |
| type       | 类型，可选值为 `spinner`      | `string`           | `circular` |
| size       | 加载图标大小，默认单位为 `px` | `number \| string` | `30px`     |
| text-size  | 文字大小，默认单位为 `px`     | `number \| string` | `14px`     |
| text-color | 文字颜色                      | `string`           | `#c9c9c9`  |
| vertical   | 是否垂直排列图标和文字内容    | `boolean`          | `false`    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 加载文案       |
| icon    | 自定义加载图标 |

### 指令

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| v-loading | 是否显示动画 | `boolean` |
| element-loading-text | 显示在加载图标下方的加载文案 | `string` |
| element-loading-spinner | 自定义加载图标 | `string` |
| element-loading-background | 背景遮罩的颜色 | `string` |
| element-loading-custom-class | 自定义类名 | `string` |
| element-loading-color | 颜色 | `string` |
| element-loading-type | 类型 ，可选值 `spinner、circular` | `string` |
| element-loading-size | 加载图标大小 | `string` |
| element-loading-text-size | 文字大小 | `string` |
| element-loading-text-color | 文字颜色 | `string` |
| element-loading-vertical | 是否垂直排列图标和文字内容，可选值 `true、false` | `string` |

### Loading Options 配置项

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| target | Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 document.querySelector 以获取到对应 DOM 节点 | `object/string` | - | `body` |
| body | 同 v-loading 指令中的 body 修饰符 | `boolean` | - | `false` |
| fullscreen | 同 v-loading 指令中的 fullscreen 修饰符 | `boolean` | - | `true` |
| lock | 同 v-loading 指令中的 lock 修饰符 | `boolean` | - | `false` |
| text | 显示在加载图标下方的加载文案 | `string` | - | - |
| spinner | 自定义加载图标 | `string / Component` | - | - |
| background | 遮罩背景色 | `string ` | - | - |
| custom-class | Loading 的自定义类名 | `string ` | - | - |
| color | 颜色 | `string` | - | `#0094ff` |
| type | 类型 | `string` | `spinner/circular` | `circular` |
| size | 加载图标大小，默认单位为 `px` | `number \| string` | - | `30px` |
| text-size | 文字大小，默认单位为 `px` | `number \| string` | - | `14px` |
| text-color | 文字颜色 | `string` | - | `#0094ff` |
| vertical | 是否垂直排列图标和文字内容 | `boolean` | - | `false` |

### 类型定义

组件导出以下类型定义：

```ts
import type { LoadingType, LoadingProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值                  | 描述 |
| ---------------------------- | ----------------------- | ---- |
| --r-loading-text-color       | `var(--r-text-color-2)` | -    |
| --r-loading-text-font-size   | `var(--r-font-size-md)` | -    |
| --r-loading-spinner-color    | `var(--r-gray-5)`       | -    |
| --r-loading-spinner-size     | `30px`                  | -    |
| --r-loading-spinner-duration | `0.8s`                  | -    |
