# Space

### Intro

Set the spacing between elements, requires `ryxon >= v3.6.0`.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Space } from 'ryxon';

const app = createApp();
app.use(Space);
```

## Usage

### Basic Usage

```html
<r-space>
  <r-button type="primary">Button</r-button>
  <r-button type="primary">Button</r-button>
  <r-button type="primary">Button</r-button>
  <r-button type="primary">Button</r-button>
</r-space>
```

### Vertical

```html
<r-space direction="vertical" fill>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
</r-space>
```

### Custom Size

```html
<!-- 20px -->
<r-space :size="20">
  <r-button type="primary">Button</r-button>
  <r-button type="primary">Button</r-button>
  <r-button type="primary">Button</r-button>
</r-space>

<!-- 2rem -->
<r-space size="2rem">
  <r-button type="primary">Button</r-button>
  <r-button type="primary">Button</r-button>
  <r-button type="primary">Button</r-button>
</r-space>
```

### Alignment

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

### Auto Wrap

```html
<r-space wrap>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
  <r-button type="primary" block>Button</r-button>
</r-space>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Spacing direction | _vertical \| horizontal_ | `horizontal` |
| size | Spacing size, such as `20px` `2em`. The default unit is px, supports using array to set horizontal and vertical spacing | _number \| string \| number[] \| string[]_ | `8px` |
| align | Spacing alignment | _start \| end \| center \| baseline_ | - |
| wrap | Whether to wrap automatically, only for horizontal alignment | _boolean_ | `false` |
| fill | Whether to render Space as a block element and fill the parent element | _boolean_ | `false` |

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | Default slot |

### Types

The component exports the following type definitions:

```ts
import type { SpaceProps, SpaceSize, SpaceAlign } from 'ryxon';
```
