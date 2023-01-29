# Loading

### Intro

Used to indicate the transition state during loading.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Loading } from 'ryxon';

const app = createApp();
app.use(Loading);
```

## Usage

### Type

```html
<r-loading />

<r-loading type="spinner" />
```

### Color

```html
<r-loading color="#1989fa" />

<r-loading type="spinner" color="#1989fa" />
```

### Size

```html
<r-loading size="24" />

<r-loading type="spinner" size="24px" />
```

### Text

```html
<r-loading size="24px">Loading...</r-loading>
```

### Vertical

```html
<r-loading size="24px" vertical>Loading...</r-loading>
```

### Text Color

use `color` or `text-color` to change text color.

```html
<!-- the color of text and icon will be changed -->
<r-loading color="#0094ff" />

<!-- only change text color -->
<r-loading text-color="#0094ff" />
```

### Custom Icon

Use `icon` slot to custom icon.

```html
<r-loading vertical>
  <template #icon>
    <r-icon name="star-o" size="30" />
  </template>
  Loading...
</r-loading>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| color | Loading color | _string_ | `#c9c9c9` |
| type | Can be set to `spinner` | _string_ | `circular` |
| size | Icon size | _number \| string_ | `30px` |
| text-size | Text font size | _number \| string_ | `14px` |
| text-color | Text color | _string_ | `#c9c9c9` |
| vertical | Whether to arrange icons and text content vertically | _boolean_ | `false` |

### Slots

| Name    | Description         |
| ------- | ------------------- |
| default | Loading text        |
| icon    | Custom loading icon |

### Types

The component exports the following type definitions:

```ts
import type { LoadingType, LoadingProps } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                           | Default Value             | Description |
| ------------------------------ | ------------------------- | ----------- |
| --r-loading-text-color       | _var(--r-text-color-2)_ | -           |
| --r-loading-text-font-size   | _var(--r-font-size-md)_ | -           |
| --r-loading-spinner-color    | _var(--r-gray-5)_       | -           |
| --r-loading-spinner-size     | _30px_                    | -           |
| --r-loading-spinner-duration | _0.8s_                    | -           |
