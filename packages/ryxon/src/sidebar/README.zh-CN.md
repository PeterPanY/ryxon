# Sidebar 侧边导航

### 介绍

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue'
import { Sidebar, SidebarItem } from 'ryxon'

const app = createApp()
app.use(Sidebar)
app.use(SidebarItem)
```

## 代码演示

### 基础用法

通过 `v-model` 绑定当前选中项的索引。

```html
<r-sidebar v-model="active">
  <r-sidebar-item title="标签名称" />
  <r-sidebar-item title="标签名称" />
  <r-sidebar-item title="标签名称" />
</r-sidebar>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const active = ref(0)
    return { active }
  }
}
```

### 徽标提示

设置 `dot` 属性后，会在右上角展示一个小红点；设置 `badge` 属性后，会在右上角展示相应的徽标。

```html
<r-sidebar v-model="active">
  <r-sidebar-item title="标签名称" dot />
  <r-sidebar-item title="标签名称" badge="5" />
  <r-sidebar-item title="标签名称" />
</r-sidebar>
```

### 禁用选项

通过 `disabled` 属性禁用选项。

```html
<r-sidebar v-model="active">
  <r-sidebar-item title="标签名称" />
  <r-sidebar-item title="标签名称" disabled />
  <r-sidebar-item title="标签名称" />
</r-sidebar>
```

### 监听切换事件

设置 `change` 方法来监听切换导航项时的事件。

```html
<r-sidebar v-model="active" @change="onChange">
  <r-sidebar-item title="标签名 1" />
  <r-sidebar-item title="标签名 2" />
  <r-sidebar-item title="标签名 3" />
</r-sidebar>
```

```js
import { ref } from 'vue'
import { showMessage } from 'ryxon'

export default {
  setup() {
    const active = ref(0)
    const onChange = (index) => showMessage(`标签名 ${index + 1}`)
    return {
      active,
      onChange
    }
  }
}
```

## API

### Sidebar Props

| 参数    | 说明             | 类型               | 默认值 |
| ------- | ---------------- | ------------------ | ------ |
| v-model | 当前导航项的索引 | _number \| string_ | `0`    |

### Sidebar Events

| 事件名 | 说明             | 回调参数        |
| ------ | ---------------- | --------------- |
| change | 切换导航项时触发 | _index: number_ |

### SidebarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 内容 | _string_ | `''` |
| dot | 是否显示右上角小红点 | _boolean_ | `false` |
| badge | 图标右上角徽标的内容 | _number \| string_ | - |
| badge-props | 自定义徽标的属性，传入的对象会被透传给 [Badge 组件的 props](/zh/component/badge.html#api) | _BadgeProps_ | - |
| disabled | 是否禁用该项 | _boolean_ | `false` |
| url | 点击后跳转的链接地址 | _string_ | - |
| to | 点击后跳转的目标路由对象，等同于 vue-router 的 [to 属性](https://router.vuejs.org/zh/api/#to) | _string \| object_ | - |
| replace | 是否在跳转时替换当前页面历史 | _boolean_ | `false` |

### SidebarItem Events

| 事件名 | 说明       | 回调参数        |
| ------ | ---------- | --------------- |
| click  | 点击时触发 | _index: number_ |

### SidebarItem Slots

| Name  | Description |
| ----- | ----------- |
| title | 自定义标题  |

### 类型定义

组件导出以下类型定义：

```ts
import type { SidebarProps, SidebarItemProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                               | 默认值                     | 描述 |
| ---------------------------------- | -------------------------- | ---- |
| --r-sidebar-width                  | _80px_                     | -    |
| --r-sidebar-font-size              | _var(--r-font-size-md)_    | -    |
| --r-sidebar-line-height            | _var(--r-line-height-md)_  | -    |
| --r-sidebar-text-color             | _var(--r-text-color)_      | -    |
| --r-sidebar-disabled-text-color    | _var(--r-text-color-3)_    | -    |
| --r-sidebar-padding                | _20px var(--r-padding-sm)_ | -    |
| --r-sidebar-active-color           | _var(--r-active-color)_    | -    |
| --r-sidebar-background             | _var(--r-background)_      | -    |
| --r-sidebar-selected-font-weight   | _var(--r-font-bold)_       | -    |
| --r-sidebar-selected-text-color    | _var(--r-text-color)_      | -    |
| --r-sidebar-selected-border-width  | _4px_                      | -    |
| --r-sidebar-selected-border-height | _16px_                     | -    |
| --r-sidebar-selected-border-color  | _var(--r-primary-color)_   | -    |
| --r-sidebar-selected-background    | _var(--r-background-2)_    | -    |