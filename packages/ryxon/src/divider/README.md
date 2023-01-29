# Divider

### Intro

Separate content into multiple areas.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Divider } from 'ryxon';

const app = createApp();
app.use(Divider);
```

## Usage

### Basic Usage

```html
<r-divider />
```

### With Text

```html
<r-divider>Text</r-divider>
```

### Content Position

```html
<r-divider content-position="left">Text</r-divider>
<r-divider content-position="right">Text</r-divider>
```

### Dashed

```html
<r-divider dashed>Text</r-divider>
```

### Custom Style

```html
<r-divider
  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
>
  Text
</r-divider>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| dashed | Whether to use dashed border | _boolean_ | `false` |
| hairline | Whether to use hairline | _boolean_ | `true` |
| content-position | Content position, can be set to `left` `right` | _string_ | `center` |

### Slots

| Name    | Description |
| ------- | ----------- |
| default | content     |

### Types

The component exports the following type definitions:

```ts
import type { DividerProps, DividerContentPosition } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                              | Default Value             | Description |
| --------------------------------- | ------------------------- | ----------- |
| --r-divider-margin              | _var(--r-padding-md) 0_ | -           |
| --r-divider-text-color          | _var(--r-text-color-2)_ | -           |
| --r-divider-font-size           | _var(--r-font-size-md)_ | -           |
| --r-divider-line-height         | _24px_                    | -           |
| --r-divider-border-color        | _var(--r-border-color)_ | -           |
| --r-divider-content-padding     | _var(--r-padding-md)_   | -           |
| --r-divider-content-left-width  | _10%_                     | -           |
| --r-divider-content-right-width | _10%_                     | -           |
