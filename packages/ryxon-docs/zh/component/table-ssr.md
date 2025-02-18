---
title: Table SSR
lang: zh
---

# Table SSR 表格

在表中显示数据。

## 基础表格

:::demo 使用 `rows` 设置要在表中显示的数据。默认情况下，该表将显示行的所有字段

table-ssr/basic

:::

:::demo 也可使用 `columns` 配置要显示的列。它是一个`TableColumn`对象数组

table-ssr/columns

:::

## 带斑马纹表格

:::demo

table-ssr/striped

:::

## 带边框表格

:::demo

table-ssr/with-border

:::

## 自定义样式

:::demo

table-ssr/with-status

:::

## 单选

:::demo

table-ssr/single-select

:::

## 多选

:::demo

table-ssr/selectable

:::

## 复选框位置

:::demo 可以使用`columns`中配置`select`来自定义复选框列的位置

table-ssr/select-placement

:::

## 排序

:::demo 您可以通过在列配置中将属性设置为 来使列可排序

table-ssr/sortable-column

:::

:::demo

table-ssr/sort

:::

## 自定义列模板

:::demo

table-ssr/custom-column

:::

## 自定义表头

:::demo

table-ssr/custom-header

:::

## 展开行

:::demo

table-ssr/expand

:::

## 合并行或列

:::demo

table-ssr/rowspan-and-colspan

:::

## 表格标题

:::demo 使用插槽自定义表格的标题。

table-ssr/caption

:::

## Contextmenu

:::demo

table-ssr/contextmenu

:::

## loading

:::demo

table-ssr/loading

:::

## 自定义空数据提示

:::demo

table-ssr/empty

:::

## API

### TableSsr Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 标题数据 | `TableColumn[]` | - |
| rows | 显示的数据 | `TableRow[]` | `[]` |
| height | Table 的高度， 默认为自动高度 | `string \| number` | - |
| max-height | Table 的最大高度 | `string \| number` | - |
| stripe | 是否为斑马纹 | `boolean` | `false` |
| border | 是否带有纵向边框 | `boolean` | `false` |
| modelValue / v-model | 选择项数据 | `TableRow[]` | - |
| singleSelect | 是否为单选模式 | `boolean` | `false` |
| by | 判断选择项是否选中的方式，可使用字段比较。默认对象实例比较 | `string \| Function` | `a===b` |
| columnAttribute | 表头中内容的列属性字段 | `string` | `label` |
| sort | 自动排序方法 | `{ column: string; direction: 'asc' \| 'desc' }` | `{}` |
| sortMode | 排序方式 | `'manual' \| 'auto'` | `auto` |
| span-method | 合并行或列的计算方法 | ^[Function]`{(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => number[] \| { rowspan: number, colspan: number } \| void}` | - |

### TableColumn 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| prop | 行数据中要显示的字段属性 | `string` |
| label | 表头中显示的标签 | `string` |
| align | 对齐方式 | `left \| center \| right` |
| width | 对应列的宽度 | `string \| number` |
| minWidth | 对应列的最小宽度 | `string \| number` |
| sortable | 对应列是否开启排序 | `boolean` |
| sort | 对应列的排序方法 | ^[Function]`(a: any, b: any, direction: 'asc' \| 'desc') => number` |
| direction | 对应列的默认排序 | ` 'asc' \| 'desc'` |
| class | 类名 | `string` |
| rowClass | 类名 | `string` |

### Table Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | ^[Function]`(row: TableRow) => void` |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | ^[Function]`(checked: boolean) => void` |
| selection-change | 当选择项发生变化时会触发该事件 | ^[Function]`(newSelection: TableRow[]) => void` |
| cell-click | 当某个单元格被点击时会触发该事件 | ^[Function]`(row: TableRow, column: TableColumn, event: MouseEvent) => void` |
| cell-contextmenu | 当某个单元格被鼠标右键点击时会触发该事件 | ^[Function]`(row: TableRow, column: TableColumn, event: MouseEvent) => void` |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | ^[Function]`(row: TableRow, column: TableColumn, event: MouseEvent) => void` |
| row-click | 当某一行被点击时会触发该事件 | ^[Function]`(row: TableRow, event: MouseEvent) => void` |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | ^[Function]`(row: TableRow, event: MouseEvent) => void` |
| row-dblclick | 当某一行被鼠标右键点击时会触发该事件 | ^[Function]`(row: TableRow, event: MouseEvent) => void` |

### Table Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| caption | 自定义表格标题 | - |
| <#column>-header | 自定义表头内容 | ^[Object]`{ column: TableColumn, sort: { column: string; direction: 'asc' \| 'desc' }, onSort: (column: TableColumn) => void }` |
| <#column>-data | 自定义单元格内容 | ^[Object]`{ column: TableColumn, row: TableRow, index: number, getRowData: (defaultValue: any) => void }` |
| select-header | 自定义Checkbox时表头的内容 | ^[Object]`{ indeterminate: boolean, checked: boolean, change: (checked: boolean)=> void }` |
| select-data | 自定义Checkbox时单元格的内容 | ^[Object]`{ checked: boolean, change: (ev: boolean) => void }` |
| expand-action | expand下自定义展开按钮 | ^[Object]`{ row: TableRow, isExpanded: boolean, toggle: () => void }` |
| expand | 自定义展开行内容 | ^[Object]`{ row: TableRow, index: number }` |
| loading | 自定义loading的内容 | - |
| empty | 当数据为空时自定义的内容 | - |
