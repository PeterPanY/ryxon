---
title: Autocomplete
lang: zh
---

# Autocomplete 自动补全输入框

根据输入内容提供对应的输入建议。

## 基础用法

:::demo `fetch-suggestions` 属性是返回建议输入的方法。在此示例中， `querySearch(queryString, cb)` 方法通过 `cb(data)` 给 Autocomplete 组件返回建议。

autocomplete/autocomplete

:::

## 自定义模板

:::demo 使用 `scoped slot` 自定义输入建议。 在这个范围中，你可以使用 `item` 键来访问当前输入建议对象。

autocomplete/autocomplete-template

:::

## 远程搜索

:::demo 从服务端搜索数据。

autocomplete/remote-search

:::

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | ^[string] | — |
| placeholder | 占位文本 | ^[string] | — |
| clearable | 是否可清空 | ^[boolean] | `false` |
| clear-icon ^(v1.10.2) | 清除图标名称或图片链接，等同于 Icon 组件的 `name 属性` | `string` | `clear` |
| show-arrow ^(v1.10.3) | 是否展示小箭头 | `boolean` | `true` |
| disabled | 自动补全组件是否被禁用 | ^[boolean] | `false` |
| value-key | 输入建议对象中用于显示的键名 | ^[string] | `value` |
| debounce | 获取输入建议的防抖延时，单位为毫秒 | ^[number] | `300` |
| placement | 菜单弹出位置 | ^[enum]`'top' \| 'top- start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | `bottom-start` |
| fetch-suggestions | 获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它 | ^[Function]`(queryString: string, callback: callbackfn) => void` | — |
| popper-class | 下拉列表的类名 | ^[string] | — |
| trigger-on-focus | 输入焦点时是否显示建议 | ^[boolean] | `true` |
| name | 等价于原生 input name 属性 | ^[string] | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件 | ^[boolean] | `false` |
| label | 输入框关联的 label 文字 | ^[string] | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | ^[boolean] | `false` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 to 属性 | `string \| Element` | `body` |
| highlight-first-item | 是否默认高亮远程搜索结果的第一项 | ^[boolean] | `false` |
| fit-input-width | 下拉框的宽度是否与输入框相同 | ^[boolean] | `false` |

### Events

| 事件名 | 详情 | 类型 |
| --- | --- | --- |
| select | 点击选中建议项时触发 | ^[Function]`(item: typeof modelValue \| any) => void` |
| change | 在 Input 值改变时触发 | ^[Function]`(value: string \| number) => void` |

### Slots

| 插槽名     | 描述说明                                           |
| ---------- | -------------------------------------------------- |
| default    | 自定义输入建议的内容。 自定义标签，参数为 { item } |
| left-icon  | 自定义输入框头部图标                               |
| right-icon | 自定义输入框尾部图标                               |

### 方法

通过 ref 可以获取到 Input 实例并调用实例方法，详见`组件实例方法`。

| 名称 | 详情 | 类型 |
| --- | --- | --- |
| activated | 自动补全输入框是否被激活 | ^[object]`Ref<boolean>` |
| blur | 使 input 失去焦点 | ^[Function]`() => void` |
| close | 折叠建议列表 | ^[Function]`() => void` |
| focus | 使 input 获取焦点 | ^[Function]`() => void` |
| handleSelect | 手动触发选中建议事件 | ^[Function]`(item: any) => promise<void>` |
| handleKeyEnter | 手动触发键盘回车事件 | ^[Function]`() => promise<void>` |
| highlightedIndex | 当前高亮显示选项的索引 | ^[object]`Ref<number>` |
| highlight | 在建议中高亮显示一个项目 | ^[Function]`(itemIndex: number) => void` |
| inputRef | r-input 组件实例 | ^[object]`Ref<InputInstance>` |
| loading | 远程获取提示内容的加载状态指示器 | ^[object]`Ref<boolean>` |
| popperRef | r-tooltip 组件实例 | ^[object]`Ref<ElTooltipInstance>` |
| suggestions | 获取自动补全结果 | ^[object]`Ref<record<string, any>>` |
