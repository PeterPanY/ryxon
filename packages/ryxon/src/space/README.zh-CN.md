# Space 间距

### 介绍

设置元素之间的间距，从 `v3.6.0` 版本开始支持。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Space } from 'ryxon';

const app = createApp();
app.use(Space);
```

## 代码演示

### 基础用法

Space 组件会在各个子组件之间设置一定的间距，默认间距为 `8px`。

```html
<r-space>
  <r-button type="primary">按钮</r-button>
  <r-button type="primary">按钮</r-button>
  <r-button type="primary">按钮</r-button>
  <r-button type="primary">按钮</r-button>
</r-space>
```

### 垂直排列

将 `direction` 属性设置为 `vertical`，可以设置垂直方向排列的间距。

```html
<r-space direction="vertical" fill>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
</r-space>
```

### 自定义间距

通过调整 `size` 的值来控制间距的大小。传入 `number` 类型时，会默认使用 `px` 单位；也可以传入 `string` 类型，比如 `2rem` 或 `5vw` 等带有单位的值。

```html
<!-- 20px -->
<r-space :size="20">
  <r-button type="primary">按钮</r-button>
  <r-button type="primary">按钮</r-button>
  <r-button type="primary">按钮</r-button>
</r-space>

<!-- 2rem -->
<r-space size="2rem">
  <r-button type="primary">按钮</r-button>
  <r-button type="primary">按钮</r-button>
  <r-button type="primary">按钮</r-button>
</r-space>
```

### 对齐方式

通过调整 `align` 的值来设置子元素的对齐方式, 可选值为 `start`, `center` ,`end` ,`baseline`，在水平模式下的默认值为 `center`。

```html
<r-radio-group
  v-model="align"
  direction="horizontal"
  style="margin-bottom: 16px"
>
  <r-radio name="start">start</r-radio>
  <r-radio name="center">center</r-radio>
  <r-radio name="end">end</r-radio>
  <r-radio name="baseline">baseline</r-radio>
</r-radio-group>

<r-space :align="align" style="padding: 16px; background: #f3f2f5">
  <r-button type="primary">{{ align }}</r-button>
  <div style="padding: 40px 20px; background: #fff">Block</div>
</r-space>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const align = ref('center');
    return { align };
  },
};
```

### 自动换行

在水平模式下, 通过 `wrap` 属性来控制子元素是否自动换行。

```html
<r-space wrap>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
  <r-button type="primary" block>按钮</r-button>
</r-space>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 间距方向 | _vertical \| horizontal_ | `horizontal` |
| size | 间距大小，如 `20px` `2em`，默认单位为 `px`，支持数组形式来分别设置横向和纵向间距 | _number \| string \| number[] \| string[]_ | `8px` |
| align | 设置子元素的对齐方式 | _start \| end \| center \| baseline_ | - |
| wrap | 是否自动换行，仅适用于水平方向排列 | _boolean_ | `false` |
| fill | 是否让 Space 变为一个块级元素，填充整个父元素 | _boolean_ | `false` |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 间距组件内容 |

### 类型定义

组件导出以下类型定义：

```js
import type { SpaceProps, SpaceSize, SpaceAlign } from 'ryxon';
```
