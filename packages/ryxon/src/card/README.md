# Card

### Intro

Used to display product pictures, prices and other information.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Card } from 'ryxon';

const app = createApp();
app.use(Card);
```

## Usage

### Basic Usage

```html
<r-card
  num="2"
  price="2.00"
  title="Title"
  desc="Description"
  thumb="https://fastly.jsdelivr.net/npm/@ryxon/assets/ipad.jpeg"
/>
```

### Discount Info

```html
<r-card
  num="2"
  tag="Tag"
  price="2.00"
  title="Title"
  desc="Description"
  origin-price="10.00"
  thumb="https://fastly.jsdelivr.net/npm/@ryxon/assets/ipad.jpeg"
/>
```

### Custom Content

Use slot to custom content.

```html
<r-card
  num="2"
  title="Title"
  desc="Description"
  price="2.00"
  thumb="https://fastly.jsdelivr.net/npm/@ryxon/assets/ipad.jpeg"
>
  <template #tags>
    <r-tag plain type="primary">Tag</r-tag>
    <r-tag plain type="primary">Tag</r-tag>
  </template>
  <template #footer>
    <r-button size="mini">Button</r-button>
    <r-button size="mini">Button</r-button>
  </template>
</r-card>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| thumb | Left thumb image URL | _string_ | - |
| title | Title | _string_ | - |
| desc | Description | _string_ | - |
| tag | Tag | _string_ | - |
| num | number | _number \| string_ | - |
| price | Price | _number \| string_ | - |
| origin-price | Origin price | _number \| string_ | - |
| centered | Whether content vertical centered | _boolean_ | `false` |
| currency | Currency symbol | _string_ | `¥` |
| thumb-link | Thumb link URL | _string_ | - |
| lazy-load | Whether to enable thumb lazy load, should register [Lazyload](#/en-US/lazyload) component | _boolean_ | `false` |

### Events

| Event       | Description                       | Arguments           |
| ----------- | --------------------------------- | ------------------- |
| click       | Emitted when component is clicked | _event: MouseEvent_ |
| click-thumb | Emitted when thumb is clicked     | _event: MouseEvent_ |

### Slots

| Name         | Description         |
| ------------ | ------------------- |
| title        | Custom title        |
| desc         | Custom description  |
| num          | Custom num          |
| price        | Custom price        |
| origin-price | Custom origin price |
| price-top    | Custom price top    |
| bottom       | Custom price bottom |
| thumb        | Custom thumb        |
| tag          | Custom thumb tag    |
| tags         | Custom tags         |
| footer       | Custom footer       |

### Types

The component exports the following type definitions:

```ts
import type { CardProps } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-card-padding | _var(--r-padding-xs) var(--r-padding-md)_ | - |
| --r-card-font-size | _var(--r-font-size-sm)_ | - |
| --r-card-text-color | _var(--r-text-color)_ | - |
| --r-card-background | _var(--r-background)_ | - |
| --r-card-thumb-size | _88px_ | - |
| --r-card-thumb-radius | _var(--r-radius-lg)_ | - |
| --r-card-title-line-height | _16px_ | - |
| --r-card-desc-color | _var(--r-text-color-2)_ | - |
| --r-card-desc-line-height | _var(--r-line-height-md)_ | - |
| --r-card-price-color | _var(--r-text-color)_ | - |
| --r-card-origin-price-color | _var(--r-text-color-2)_ | - |
| --r-card-num-color | _var(--r-text-color-2)_ | - |
| --r-card-origin-price-font-size | _var(--r-font-size-xs)_ | - |
| --r-card-price-font-size | _var(--r-font-size-sm)_ | - |
| --r-card-price-integer-font-size | _var(--r-font-size-lg)_ | - |
| --r-card-price-font | _var(--r-price-font)_ | - |
