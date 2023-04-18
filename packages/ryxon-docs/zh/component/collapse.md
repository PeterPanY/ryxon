---
title: Collapse
lang: zh
---

# Collapse 折叠面板

将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

## 基础用法

:::demo 通过 `v-model` 控制展开的面板列表，`activeNames` 为数组格式。

collapse/basic

:::

## 手风琴效果

:::demo 通过 `accordion` 可以设置为手风琴模式，最多展开一个面板，此时 `activeName` 为字符串格式。

collapse/accordion

:::

## 禁用状态

:::demo 通过 `disabled` 属性来禁用单个面板。

collapse/disabled

:::

## 自定义标题内容

:::demo 通过 `title` 插槽可以自定义标题栏的内容。

collapse/custom

:::

## 全部展开与全部切换

:::demo 通过 `Collapse` 实例上的 `toggleAll` 方法可以实现全部展开与全部切换。

collapse/toggle

:::

> Tips: 手风琴模式下无法使用 toggleAll 方法。

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前展开面板的 name | 手风琴模式：`number \| string`<br>非手风琴模式：`(number \| string)[]` | - |
| accordion | 是否开启手风琴模式 | `boolean` | `false` |
| border | 是否显示外边框 | `boolean` | `true` |

### Collapse Events

| 事件名 | 说明           | 回调参数                                 |
| ------ | -------------- | ---------------------------------------- |
| change | 切换面板时触发 | activeNames: 类型与 v-model 绑定的值一致 |

### CollapseItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识符，默认为索引值 | `number \| string` | `index` |
| icon | 标题栏左侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](/zh/component/icon.html#api) | `string` | - |
| size | 标题栏大小，可选值为 `large` | `string` | - |
| title | 标题栏左侧内容 | `number \| string` | - |
| value | 标题栏右侧内容 | `number \| string` | - |
| label | 标题栏描述信息 | `number \| string` | - |
| border | 是否显示内边框 | `boolean` | `true` |
| is-link | 是否展示标题栏右侧箭头并开启点击反馈 | `boolean` | `true` |
| disabled | 是否禁用面板 | `boolean` | `false` |
| readonly | 是否为只读状态，只读状态下无法操作面板 | `boolean` | `false` |
| lazy-render | 是否在首次展开时才渲染面板内容 | `boolean` | `true` |
| title-class | 左侧标题额外类名 | `string` | - |
| value-class | 右侧内容额外类名 | `string` | - |
| label-class | 描述信息额外类名 | `string` | - |

### Collapse 方法

通过 ref 可以获取到 CollapseItem 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggleAll | 切换所有面板展开状态，传 `true` 为全部展开，`false` 为全部收起，不传参为全部切换 | `options?: boolean \| object` | - |

### toggleAll 方法示例

```js
import { ref } from 'vue';
import type { CollapseInstance } from 'ryxon';

const collapseRef = ref<CollapseInstance>();

// 全部切换
collapseRef.value?.toggleAll();
// 全部展开
collapseRef.value?.toggleAll(true);
// 全部收起
collapseRef.value?.toggleAll(false);

// 全部全部切换，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  skipDisabled: true,
});
// 全部选中，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  expanded: true,
  skipDisabled: true,
});
```

### CollapseItem 方法

通过 ref 可以获取到 CollapseItem 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggle | 切换面板展开状态，传 `true` 为展开，`false` 为收起，不传参为切换 | `expand?: boolean` | - |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  CollapseProps,
  CollapseItemProps,
  CollapseItemInstance,
  CollapseToggleAllOptions
} from 'ryxon'
```

`CollapseItemInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { CollapseItemInstance } from 'ryxon'

const collapseItemRef = ref<CollapseItemInstance>()

collapseItemRef.value?.toggle()
```

### CollapseItem Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| default    | 面板内容             |
| title      | 自定义标题栏左侧内容 |
| value      | 自定义标题栏右侧内容 |
| label      | 自定义标题栏描述信息 |
| icon       | 自定义标题栏左侧图标 |
| right-icon | 自定义标题栏右侧图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-collapse-item-duration | `var(--r-duration-base)` | - |
| --r-collapse-item-content-padding | `var(--r-padding-sm) var(--r-padding-md)` | - |
| --r-collapse-item-content-font-size | `var(--r-font-size-md)` | - |
| --r-collapse-item-content-line-height | `1.5` | - |
| --r-collapse-item-content-text-color | `var(--r-text-color-2)` | - |
| --r-collapse-item-content-background | `var(--r-background-2)` | - |
| --r-collapse-item-title-disabled-color | `var(--r-text-color-3)` | - |
