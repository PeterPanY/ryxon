# Tag

### Intro

Used to mark keywords and summarize the main content.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Tag } from 'ryxon';

const app = createApp();
app.use(Tag);
```

## Usage

### Basic Usage

```html
<r-tag type="primary">Tag</r-tag>
<r-tag type="success">Tag</r-tag>
<r-tag type="danger">Tag</r-tag>
<r-tag type="warning">Tag</r-tag>
```

### Plain style

```html
<r-tag plain type="primary">Tag</r-tag>
```

### Round style

```html
<r-tag round type="primary">Tag</r-tag>
```

### Mark style

```html
<r-tag mark type="primary">Tag</r-tag>
```

### Closeable

```html
<r-tag :show="show" closeable size="medium" type="primary" @close="close">
  Tag
</r-tag>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(true);
    const close = () => {
      show.value = false;
    };

    return {
      show,
      close,
    };
  },
};
```

### Custom Size

```html
<r-tag type="primary">Tag</r-tag>
<r-tag type="primary" size="medium">Tag</r-tag>
<r-tag type="primary" size="large">Tag</r-tag>
```

### Custom Color

```html
<r-tag color="#7232dd">Tag</r-tag>
<r-tag color="#ffe1e1" text-color="#ad0000">Tag</r-tag>
<r-tag color="#7232dd" plain>Tag</r-tag>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| type | Type, can be set to `primary` `success` `danger` `warning` | _string_ | `default` |
| size | Size, can be set to `large` `medium` | _string_ | - |
| color | Custom color | _string_ | - |
| show | Whether to show tag | _boolean_ | `true` |
| plain | Whether to be plain style | _boolean_ | `false` |
| round | Whether to be round style | _boolean_ | `false` |
| mark | Whether to be mark style | _boolean_ | `false` |
| text-color | Text color | _string_ | `white` |
| closeable | Whether to be closeable | _boolean_ | `false` |

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | Default slot |

### Events

| Event | Description                        | Arguments           |
| ----- | ---------------------------------- | ------------------- |
| click | Emitted when component is clicked  | _event: MouseEvent_ |
| close | Emitted when close icon is clicked | _event: MouseEvent_ |

### Types

The component exports the following type definitions:

```ts
import type { TagSize, TagType, TagProps } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-tag-padding | _0 var(--r-padding-base)_ | - |
| --r-tag-text-color | _var(--r-white)_ | - |
| --r-tag-font-size | _var(--r-font-size-sm)_ | - |
| --r-tag-radius | _2px_ | - |
| --r-tag-line-height | _16px_ | - |
| --r-tag-medium-padding | _2px 6px_ | - |
| --r-tag-large-padding | _var(--r-padding-base) var(--r-padding-xs)_ | - |
| --r-tag-large-radius | _var(--r-radius-md)_ | - |
| --r-tag-large-font-size | _var(--r-font-size-md)_ | - |
| --r-tag-round-radius | _var(--r-radius-max)_ | - |
| --r-tag-danger-color | _var(--r-danger-color)_ | - |
| --r-tag-primary-color | _var(--r-primary-color)_ | - |
| --r-tag-success-color | _var(--r-success-color)_ | - |
| --r-tag-warning-color | _var(--r-warning-color)_ | - |
| --r-tag-default-color | _var(--r-gray-6)_ | - |
| --r-tag-plain-background | _var(--r-background-2)_ | - |
