# Swipe

### Intro

Used to loop a group of pictures or content.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Swipe, SwipeItem } from 'ryxon';

const app = createApp();
app.use(Swipe);
app.use(SwipeItem);
```

## Usage

### Basic Usage

Use `autoplay` prop to set autoplay interval.

```html
<r-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <r-swipe-item>1</r-swipe-item>
  <r-swipe-item>2</r-swipe-item>
  <r-swipe-item>3</r-swipe-item>
  <r-swipe-item>4</r-swipe-item>
</r-swipe>

<style>
  .my-swipe .r-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
```

### Lazy Render

Use `lazy-render` prop to enable lazy rendering.

```html
<r-swipe :autoplay="3000" lazy-render>
  <r-swipe-item v-for="image in images" :key="image">
    <img :src="image" />
  </r-swipe-item>
</r-swipe>
```

```js
export default {
  setup() {
    const images = [
      'https://fastly.jsdelivr.net/npm/@ryxon/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@ryxon/assets/apple-2.jpeg',
    ];
    return { images };
  },
};
```

### Change Event

```html
<r-swipe @change="onChange">
  <r-swipe-item>1</r-swipe-item>
  <r-swipe-item>2</r-swipe-item>
  <r-swipe-item>3</r-swipe-item>
  <r-swipe-item>4</r-swipe-item>
</r-swipe>
```

```js
import { showToast } from 'ryxon';

export default {
  setup() {
    const onChange = (index) => showToast('Current Swipe index:' + index);
    return { onChange };
  },
};
```

### Vertical Scrolling

```html
<r-swipe :autoplay="3000" vertical>
  <r-swipe-item>1</r-swipe-item>
  <r-swipe-item>2</r-swipe-item>
  <r-swipe-item>3</r-swipe-item>
  <r-swipe-item>4</r-swipe-item>
</r-swipe>
```

### Set SwipeItem Size

```html
<r-swipe :loop="false" :width="300">
  <r-swipe-item>1</r-swipe-item>
  <r-swipe-item>2</r-swipe-item>
  <r-swipe-item>3</r-swipe-item>
  <r-swipe-item>4</r-swipe-item>
</r-swipe>
```

> It's not supported to set SwipeItem size in the loop mode.

### Custom Indicator

```html
<r-swipe>
  <r-swipe-item>1</r-swipe-item>
  <r-swipe-item>2</r-swipe-item>
  <r-swipe-item>3</r-swipe-item>
  <r-swipe-item>4</r-swipe-item>
  <template #indicator="{ active, total }">
    <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
  </template>
</r-swipe>

<style>
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
```

## API

### Swipe Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| autoplay | Autoplay interval (ms) | _number \| string_ | - |
| duration | Animation duration (ms) | _number \| string_ | `500` |
| initial-swipe | Index of initial swipe, start from 0 | _number \| string_ | `0` |
| width | Width of swipe item | _number \| string_ | `0` |
| height | Height of swipe item | _number \| string_ | `0` |
| loop | Whether to enable loop | _boolean_ | `true` |
| show-indicators | Whether to show indicators | _boolean_ | `true` |
| vertical | Whether to be vertical Scrolling | _boolean_ | `false` |
| touchable | Whether to allow swipe by touch gesture | _boolean_ | `true` |
| stop-propagation | Whether to stop touchmove event propagation | _boolean_ | `false` |
| lazy-render | Whether to enable lazy render | _boolean_ | `false` |
| indicator-color | Indicator color | _string_ | `#1989fa` |

### Swipe Events

| Event  | Description                        | Arguments                     |
| ------ | ---------------------------------- | ----------------------------- |
| change | Emitted when current swipe changed | index: index of current swipe |

### SwipeItem Events

| Event | Description                       | Arguments           |
| ----- | --------------------------------- | ------------------- |
| click | Emitted when component is clicked | _event: MouseEvent_ |

### Swipe Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get Swipe instance and call instance methods..

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| prev | Swipe to prev item | - | - |
| next | Swipe to next item | - | - |
| swipeTo | Swipe to target index | _index: number, options: SwipeToOptions_ | - |
| resize | Resize Swipe when container element resized or visibility changed | - | - |

### Types

The component exports the following type definitions:

```ts
import type { SwipeProps, SwipeInstance, SwipeToOptions } from 'ryxon';
```

`SwipeInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { SwipeInstance } from 'ryxon';

const swipeRef = ref<SwipeInstance>();

swipeRef.value?.next();
```

### SwipeToOptions

| Name      | Description               | Type      |
| --------- | ------------------------- | --------- |
| immediate | Whether to skip animation | _boolean_ |

### Swipe Slots

| Name               | Description      | SlotProps                           |
| ------------------ | ---------------- | ----------------------------------- |
| default            | Content          | -                                   |
| indicator `v3.4.0` | Custom indicator | _{ active: number, total: number }_ |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-swipe-indicator-size | _6px_ | - |
| --r-swipe-indicator-margin | _var(--r-padding-sm)_ | - |
| --r-swipe-indicator-active-opacity | _1_ | - |
| --r-swipe-indicator-inactive-opacity | _0.3_ | - |
| --r-swipe-indicator-active-background | _var(--r-primary-color)_ | - |
| --r-swipe-indicator-inactive-background | _var(--r-border-color)_ | - |
