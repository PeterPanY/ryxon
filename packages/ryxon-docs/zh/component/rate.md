---
title: Rate
lang: zh
---

# Rate 评分

用于评分

## 基础用法

:::demo 通过 `v-model` 来绑定当前评分值。 三个等级所对应的颜色用 `colors` 属性设置，而它们对应的两个阈值则通过 `low-threshold` 和 `high-threshold` 设定。

rate/baisc

:::

## 自定义图标

:::demo 设置`icons`属性可以自定义不同分段的图标。 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名

rate/custom-icon

:::

## 自定义样式

:::demo 通过 `size` 属性设置图标大小，`colors` 属性设置选中时的颜色，`void-color` 设置未选中时的颜色。

rate/custom-style

:::

## 允许半选

:::demo 设置 `allow-half` 属性后可以选中半星。

rate/allow-half

:::

## 辅助文字

:::demo 为组件设置 `show-text` 属性会在右侧显示辅助文字。 通过设置 `texts` 可以为每一个分值指定对应的辅助文字。 `texts` 为一个数组，长度应等于最大值 `max`。

rate/text

:::

## 可清空

:::demo 当你再次点击相同的值时，可以将值重置为 0。

rate/clearable

:::

## 只读

:::demo 为组件设置 `disabled` 属性表示组件为只读。 此时若设置 `show-score`，则会在右侧显示目前的分值。 此外，您可以使用属性 `score-template` 来提供评分模板。 模板为一个包含了 `{value}` 的字符串，`{value}` 会被替换为当前分值。

rate/disabled

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | `number` | `0` |
| max | 最大分值 | `number` | `5` |
| size | SVG 图标的大小，如 20px 2em，默认单位为 px | `number` / `string` | `18px` |
| gutter | 图标间距，默认单位为px | `number / string` | `4px` |
| disabled | 是否为只读 | `boolean` | `false` |
| allow-half | 是否允许半选 | `boolean` | `false` |
| low-threshold | 低分和中等分数的界限值， 值本身被划分在低分中 | `number` | `2` |
| high-threshold | 高分和中等分数的界限值， 值本身被划分在高分中 | `number` | `4` |
| colors | icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色 | ^[object]`string[] \| Record<number, string>` | `['#f7ba2a', '#f7ba2a', '#f7ba2a']` |
| void-color | 未选中 icon 的颜色 | `string` | `#c6d1de` |
| disabled-void-color | 只读时未选中 icon 的颜色 | `string` | `#eff2f7` |
| icons | 图标组件 若传入数组，则需要传入 3 个元素，分别为 3 个部分所对应的类名；若传入对象，则可自定义分段，键名为分段的界限值，键值为对应的类名 | ^[object]`string[] \| Component[] \| Record<number, string \| Component>` | `[StarFilled, StarFilled, StarFilled]` |
| void-icon | 未被选中的图标组件 | `string / Component` | `Star` |
| disabled-void-icon | 禁用状态的未选择图标 | `string / Component` | `StarFilled` |
| show-text | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | `boolean` | `false` |
| show-score | 是否显示当前分数， show-score 和 show-text 不能同时为真 | `boolean` | `false` |
| text-color | 辅助文字的颜色 | `string` | '' |
| texts | 辅助文字数组 | ^[array]`string[]` | `['Extremely bad', 'Disappointed', 'Fair', 'Satisfied', 'Surprise']` |
| score-template | 分数显示模板 | `string` | {value} |
| clearable | 是否可以重置值为 0 | boolean | `false` |
| id | 原生 id 属性 | string | — |

### Events

| 事件名 | 说明           | 回调参数                             |
| ------ | -------------- | ------------------------------------ |
| change | 分值改变时触发 | ^[Function]`(value: number) => void` |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名            | 说明       | 方法类型                             |
| ----------------- | ---------- | ------------------------------------ |
| setCurrentValue   | 设置当前值 | ^[Function]`(value: number) => void` |
| resetCurrentValue | 重置当前值 | ^[Function]`() => void`              |

### 类型定义

组件导出以下类型定义：

```ts
import type { RateProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                         | 默认值                        | 描述 |
| ---------------------------- | ----------------------------- | ---- |
| --r-rate-font-size           | `var(--r-font-size-md)`       | -    |
| --r-rate-void-color          | `var(--r-gray-5)`             | -    |
| --r-rate-fill-color          | `#f7ba2a`                     | -    |
| --r-rate-disabled-void-color | `var(--r-fill-color)`         | -    |
| --r-rate-text-color          | `var(--r-text-color-primary)` | -    |
