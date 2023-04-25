# IndexBar 索引栏

### 介绍

用于列表的索引分类显示和快速定位。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue'
import { IndexBar, IndexAnchor } from 'ryxon'

const app = createApp()
app.use(IndexBar)
app.use(IndexAnchor)
```

## 代码演示

### 基础用法

点击索引栏时，会自动跳转到对应的 `IndexAnchor` 锚点位置。

```html
<r-index-bar>
  <r-index-anchor index="A" />
  <r-cell title="文本" />
  <r-cell title="文本" />
  <r-cell title="文本" />

  <r-index-anchor index="B" />
  <r-cell title="文本" />
  <r-cell title="文本" />
  <r-cell title="文本" />

  ...
</r-index-bar>
```

### 自定义索引列表

可以通过 `index-list` 属性自定义展示的索引字符列表。

```html
<r-index-bar :index-list="indexList">
  <r-index-anchor index="1">标题1</r-index-anchor>
  <r-cell title="文本" />
  <r-cell title="文本" />
  <r-cell title="文本" />

  <r-index-anchor index="2">标题2</r-index-anchor>
  <r-cell title="文本" />
  <r-cell title="文本" />
  <r-cell title="文本" />

  ...
</r-index-bar>
```

```js
export default {
  setup() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
```

## API

### IndexBar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index-list | 索引字符列表 | _string[] \| number[]_ | `A-Z` |
| z-index | z-index 层级 | _number \| string_ | `1` |
| sticky | 是否开启锚点自动吸顶 | _boolean_ | `true` |
| sticky-offset-top | 锚点自动吸顶时与顶部的距离 | _number_ | `0` |
| highlight-color | 索引字符高亮颜色 | _string_ | `#1989fa` |
| teleport | 指定索引栏挂载的节点 | _string \| Element_ | - |

### IndexAnchor Props

| 参数  | 说明     | 类型               | 默认值 |
| ----- | -------- | ------------------ | ------ |
| index | 索引字符 | _number \| string_ | -      |

### IndexBar Events

| 事件名 | 说明                         | 回调参数                  |
| ------ | ---------------------------- | ------------------------- |
| select | 点击索引栏的字符时触发       | _index: number \| string_ |
| change | 当前高亮的索引字符变化时触发 | _index: number \| string_ |

### IndexBar 方法

通过 ref 可以获取到 IndexBar 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名   | 说明           | 参数                      | 返回值 |
| -------- | -------------- | ------------------------- | ------ |
| scrollTo | 滚动到指定锚点 | _index: number \| string_ | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type { IndexBarProps, IndexAnchorProps, IndexBarInstance } from 'ryxon'
```

`IndexBarInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { IndexBarInstance } from 'ryxon'

const indexBarRef = ref<IndexBarInstance>()

indexBarRef.value?.scrollTo('B')
```

### IndexAnchor Slots

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 锚点位置显示内容，默认为索引字符 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                               | 默认值                    | 描述 |
| ---------------------------------- | ------------------------- | ---- |
| --r-index-bar-sidebar-z-index      | _2_                       | -    |
| --r-index-bar-index-font-size      | _var(--r-font-size-xs)_   | -    |
| --r-index-bar-index-line-height    | _var(--r-line-height-xs)_ | -    |
| --r-index-bar-index-active-color   | _var(--r-primary-color)_  | -    |
| --r-index-anchor-z-index           | _1_                       | -    |
| --r-index-anchor-padding           | _0 var(--r-padding-md)_   | -    |
| --r-index-anchor-text-color        | _var(--r-text-color)_     | -    |
| --r-index-anchor-font-weight       | _var(--r-font-bold)_      | -    |
| --r-index-anchor-font-size         | _var(--r-font-size-md)_   | -    |
| --r-index-anchor-line-height       | _32px_                    | -    |
| --r-index-anchor-background        | _transparent_             | -    |
| --r-index-anchor-sticky-text-color | _var(--r-primary-color)_  | -    |
| --r-index-anchor-sticky-background | _var(--r-background-2)_   | -    |