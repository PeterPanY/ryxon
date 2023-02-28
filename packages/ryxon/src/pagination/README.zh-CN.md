# Pagination 分页

### 介绍

数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue'
import { Pagination } from 'ryxon'

const app = createApp()
app.use(Pagination)
```

## 代码演示

### 基础用法

通过 `v-model` 来绑定当前页码。

```html
<r-pagination v-model="currentPage" :total-items="24" :items-per-page="5" />
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const currentPage = ref(1)
    return { currentPage }
  }
}
```

### 简单模式

将 `mode` 设置为 `simple` 来切换到简单模式，此时分页器不会展示具体的页码按钮。

```html
<r-pagination v-model="currentPage" :page-count="12" mode="simple" />
```

### 显示省略号

设置 `force-ellipses` 后会展示省略号按钮，点击后可以快速跳转。

```html
<r-pagination
  v-model="currentPage"
  :total-items="125"
  :show-page-size="3"
  force-ellipses
/>
```

### 自定义按钮

通过 `prev-text`、`next-text` 等插槽来自定义分页按钮的内容。

```html
<r-pagination v-model="currentPage" :total-items="50" :show-page-size="5">
  <template #prev-text>
    <r-icon name="arrow-left" />
  </template>
  <template #next-text>
    <r-icon name="arrow" />
  </template>
  <template #page="{ text }">{{ text }}</template>
</r-pagination>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前页码 | _number_ | - |
| mode | 显示模式，可选值为 `simple` | _string_ | `multi` |
| prev-text | 上一页按钮文字 | _string_ | `上一页` |
| next-text | 下一页按钮文字 | _string_ | `下一页` |
| page-count | 总页数 | _number \| string_ | 根据页数计算 |
| total-items | 总记录数 | _number \| string_ | `0` |
| items-per-page | 每页记录数 | _number \| string_ | `10` |
| show-page-size | 显示的页码个数 | _number \| string_ | `5` |
| force-ellipses | 是否显示省略号 | _boolean_ | `false` |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| change | 页码改变时触发 | -        |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| page | 自定义页码 | _{ number: number, text: string, active: boolean }_ |
| prev-text | 自定义上一页按钮文字 | - |
| next-text | 自定义下一页按钮文字 | - |

### 类型定义

组件导出以下类型定义：

```ts
import type { PaginationMode, PaginationProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                                    | 默认值                      | 描述 |
| --------------------------------------- | --------------------------- | ---- |
| --r-pagination-height                   | _40px_                      | -    |
| --r-pagination-font-size                | _var(--r-font-size-md)_     | -    |
| --r-pagination-item-width               | _36px_                      | -    |
| --r-pagination-item-default-color       | _var(--r-primary-color)_    | -    |
| --r-pagination-item-disabled-color      | _var(--r-gray-7)_           | -    |
| --r-pagination-item-disabled-background | _var(--r-background)_       | -    |
| --r-pagination-background               | _var(--r-background-2)_     | -    |
| --r-pagination-desc-color               | _var(--r-gray-7)_           | -    |
| --r-pagination-disabled-opacity         | _var(--r-disabled-opacity)_ | -    |
