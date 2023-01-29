# Empty

### Intro

Occupation reminder when empty.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Empty } from 'ryxon';

const app = createApp();
app.use(Empty);
```

## Usage

### Basic Usage

```html
<r-empty description="Description" />
```

### Image Type

Use the image prop to display different placeholder images.

```html
<!-- Error -->
<r-empty image="error" description="Description" />
<!-- Network -->
<r-empty image="network" description="Description" />
<!-- Search -->
<r-empty image="search" description="Description" />
```

### Custom Size

Using `image-size` prop to custom the size of image.

```html
<!-- The default unit is px -->
<r-empty image-size="100" description="Description" />
<!-- Support other units, such as rem, vh, vw -->
<r-empty image-size="10rem" description="Description" />
```

You can set the width and height separately.

```html
<r-empty :image-size="[60, 40]" description="Description" />
```

### Custom Image

```html
<r-empty
  image="https://fastly.jsdelivr.net/npm/@ryxon/assets/leaf.jpeg"
  image-size="80"
  description="Description"
/>
```

### Bottom Content

```html
<r-empty description="Description">
  <r-button round type="primary" class="bottom-button">Button</r-button>
</r-empty>

<style>
  .bottom-button {
    width: 160px;
    height: 40px;
  }
</style>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| image | Image type, can be set to `error` `network` `search` or image URL | _string_ | `default` |
| image-size | Image size | _number \| string \| Array_ | - |
| description | Description | _string_ | - |

### Slots

| Name        | Description           |
| ----------- | --------------------- |
| default     | Custom bottom content |
| image       | Custom image          |
| description | Custom description    |

### Types

The component exports the following type definitions:

```ts
import type { EmptyProps } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-empty-padding | _var(--r-padding-xl) 0_ | - |
| --r-empty-image-size | _160px_ | - |
| --r-empty-description-margin-top | _var(--r-padding-md)_ | - |
| --r-empty-description-padding | _0 60px_ | - |
| --r-empty-description-color | _var(--r-text-color-2)_ | - |
| --r-empty-description-font-size | _var(--r-font-size-md)_ | - |
| --r-empty-description-line-height | _var(--r-line-height-md)_ | - |
| --r-empty-bottom-margin-top | _24px_ | - |
