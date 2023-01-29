# SwipeCell

### Intro

Used for cell components that can slide left and right to display operation buttons.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { SwipeCell } from 'ryxon';

const app = createApp();
app.use(SwipeCell);
```

## Usage

### Basic Usage

```html
<r-swipe-cell>
  <template #left>
    <r-button square type="primary" text="Select" />
  </template>
  <r-cell :border="false" title="Cell" value="Cell Content" />
  <template #right>
    <r-button square type="danger" text="Delete" />
    <r-button square type="primary" text="Collect" />
  </template>
</r-swipe-cell>
```

### Custom Content

```html
<r-swipe-cell>
  <r-card
    num="2"
    price="2.00"
    desc="Description"
    title="Title"
    class="goods-card"
    thumb="https://fastly.jsdelivr.net/npm/@ryxon/assets/cat.jpeg"
  />
  <template #right>
    <r-button square text="Delete" type="danger" class="delete-button" />
  </template>
</r-swipe-cell>

<style>
  .goods-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%;
  }
</style>
```

### Before Close

```html
<r-swipe-cell :before-close="beforeClose">
  <template #left>
    <r-button square type="primary" text="Select" />
  </template>
  <r-cell :border="false" title="Cell" value="Cell Content" />
  <template #right>
    <r-button square type="danger" text="Delete" />
  </template>
</r-swipe-cell>
```

```js
import { showConfirmDialog } from 'ryxon';

export default {
  setup() {
    const beforeClose = ({ position }) => {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          return true;
        case 'right':
          return new Promise((resolve) => {
            showConfirmDialog({
              title: 'Are you sure to delete?',
            }).then(resolve);
          });
      }
    };

    return { beforeClose };
  },
};
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| name | Identifier of SwipeCell, usually a unique string or number | _number \| string_ | - |
| left-width | Width of the left swipe area | _number \| string_ | `auto` |
| right-width | Width of the right swipe area | _number \| string_ | `auto` |
| before-close | Callback function before close | _(args) => boolean \| Promise\<boolean\>_ | - |
| disabled | Whether to disabled swipe | _boolean_ | `false` |
| stop-propagation | Whether to stop touchmove event propagation | _boolean_ | `false` |

### Slots

| Name    | Description                      |
| ------- | -------------------------------- |
| default | custom content                   |
| left    | content of left scrollable area  |
| right   | content of right scrollable area |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| click | Emitted when SwipeCell is clicked | _position: 'left' \| 'right' \| 'cell' \| 'outside'_ |
| open | Emitted when SwipeCell is opened | _value: { name: string \| number, position: 'left' \| 'right' }_ |
| close | Emitted when SwipeCell is closed | _value: { name: string \| number, position: 'left' \| 'right' \| 'cell' \| 'outside' }_ |

### beforeClose Params

| Attribute | Description    | Type                                       |
| --------- | -------------- | ------------------------------------------ |
| name      | Name           | _string \| number_                         |
| position  | Click position | _'left' \| 'right' \| 'cell' \| 'outside'_ |

### Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get SwipeCell instance and call instance methods.

| Name  | Description     | Attribute                 | Return value |
| ----- | --------------- | ------------------------- | ------------ |
| open  | open SwipeCell  | position: `left \| right` | -            |
| close | close SwipeCell | -                         | -            |

### Types

The component exports the following type definitions:

```ts
import type {
  SwipeCellSide,
  SwipeCellProps,
  SwipeCellPosition,
  SwipeCellInstance,
} from 'ryxon';
```

`SwipeCellInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { SwipeCellInstance } from 'ryxon';

const swipeCellRef = ref<SwipeCellInstance>();

swipeCellRef.value?.close();
```
