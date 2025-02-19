---
title: Collapse SSR
lang: zh
---

# Collapse SSR 折叠面板

## 基础用法

:::demo

collapse-ssr/basic

:::

## 手风琴效果

:::demo

collapse-ssr/accordion

:::

## 自定义标题内容

:::demo

collapse-ssr/custom

:::

## 自定义内容

:::demo

collapse-ssr/custom-content

:::

:::demo

collapse-ssr/custom-content-item

:::

## 全部展开与全部切换

:::demo

collapse-ssr/toggle

:::

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 单元数据数组 | `CollapseSsrItem[]` | `[]` |
| v-model | 当前展开面板的 name | 手风琴模式：`number \| string`<br>非手风琴模式：`(number \| string)[]` | - |
| accordion | 是否开启手风琴模式 | `boolean` | `false` |
| border | 是否显示外边框 | `boolean` | `true` |

### Collapse Events

| 事件名 | 说明           | 回调参数                                 |
| ------ | -------------- | ---------------------------------------- |
| change | 切换面板时触发 | activeNames: 类型与 v-model 绑定的值一致 |

### CollapseSsrItem 数据结构

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识符，默认为索引值 | `number \| string` | `index` |
| icon | 标题栏左侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](/zh/component/icon.html#api) | `string` | - |
| title | 标题栏左侧内容 | `number \| string` | - |
| value | 标题栏右侧内容 | `number \| string` | - |
| label | 标题栏描述信息 | `number \| string` | - |
| border | 是否显示内边框 | `boolean` | `true` |
| isLink | 是否展示标题栏右侧箭头并开启点击反馈 | `boolean` | `true` |
| disabled | 是否禁用面板 | `boolean` | `false` |
| readonly | 是否为只读状态，只读状态下无法操作面板 | `boolean` | `false` |
| lazyRender | 是否在首次展开时才渲染面板内容 | `boolean` | `true` |
| titleClass | 左侧标题额外类名 | `string` | - |
| valueClass | 右侧内容额外类名 | `string` | - |
| labelClass | 描述信息额外类名 | `string` | - |
| clickable | 是否开启点击反馈 | `boolean` | `null` |
| content | 默认情况下要在面板中显示的内容 | `string \| string[] \| object \| object[]` | `''` |

### Collapse 方法

通过 ref 可以获取到 CollapseItem 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggle | 切换单个面板的展开状态，传 `true` 为展开，`false` 为收起，不传参为切换 | `name: string \| number, expand?: boolean` | - |
| toggleAll | 切换所有面板展开状态，传 `true` 为全部展开，`false` 为全部收起，不传参为全部切换 | `options?: boolean \| object` | - |

### toggleAll 方法示例

```js
import { ref } from 'vue'

const collapseRef = ref()

// 全部切换
collapseRef.value?.toggleAll()
// 全部展开
collapseRef.value?.toggleAll(true)
// 全部收起
collapseRef.value?.toggleAll(false)

// 全部全部切换，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  skipDisabled: true
})
// 全部选中，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  expanded: true,
  skipDisabled: true
})
```

### 类型定义

组件导出以下类型定义：

```ts
import type { CollapseSsrProps, CollapseSsrItem } from 'ryxon'
```

### CollapseItem Slots

| 名称            | 说明                 |
| --------------- | -------------------- |
| default         | 面板内容             |
| <#name>-content | 自定义属性面板内容   |
| title           | 自定义标题栏左侧内容 |
| value           | 自定义标题栏右侧内容 |
| label           | 自定义标题栏描述信息 |
| icon            | 自定义标题栏左侧图标 |
| right-icon      | 自定义标题栏右侧图标 |
