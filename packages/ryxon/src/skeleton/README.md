# Skeleton

### Intro

Used to display a set of placeholder graphics during the content loading process.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import {
  Skeleton,
  SkeletonTitle,
  SkeletonImage,
  SkeletonAvatar,
  SkeletonParagraph,
} from 'ryxon';

const app = createApp();
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);
```

## Usage

### Basic Usage

```html
<r-skeleton title :row="3" />
```

### Show Avatar

```html
<r-skeleton title avatar :row="3" />
```

### Show Children

```html
<r-skeleton title avatar :row="3" :loading="loading">
  <div>Content</div>
</r-skeleton>
```

```js
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const loading = ref(true);

    onMounted(() => {
      loading.value = false;
    });

    return {
      loading,
    };
  },
};
```

### Custom Content

Using `template` slots to custom skeleton content.

```html
<r-skeleton>
  <template #template>
    <div :style="{ display: 'flex', width: '100%' }">
      <r-skeleton-image />
      <div :style="{ flex: 1, marginLeft: '16px' }">
        <r-skeleton-paragraph row-width="60%" />
        <r-skeleton-paragraph />
        <r-skeleton-paragraph />
        <r-skeleton-paragraph />
      </div>
    </div>
  </template>
</r-skeleton>
```

## API

### Skeleton Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| row | Row count | _number \| string_ | `0` |
| row-width | Row width, can be array | _number \| string \|<br>(number \| string)[]_ | `100%` |
| title | Whether to show title placeholder | _boolean_ | `false` |
| avatar | Whether to show avatar placeholder | _boolean_ | `false` |
| loading | Whether to show skeleton, pass `false` to show child component | _boolean_ | `true` |
| animate | Whether to enable animation | _boolean_ | `true` |
| round | Whether to show round title and paragraph | _boolean_ | `false` |
| title-width | Title width | _number \| string_ | `40%` |
| avatar-size | Size of avatar placeholder | _number \| string_ | `32px` |
| avatar-shape | Shape of avatar placeholder, can be set to `square` | _string_ | `round` |

### SkeletonParagraph Props

| Attribute | Description                     | Type      | Default |
| --------- | ------------------------------- | --------- | ------- |
| round     | Whether to show round paragraph | _boolean_ | `false` |
| row-width | Paragraph width                 | _string_  | `100%`  |

### SkeletonTitle Props

| Attribute   | Description                 | Type               | Default |
| ----------- | --------------------------- | ------------------ | ------- |
| round       | Whether to show round title | _boolean_          | `false` |
| title-width | Title width                 | _number \| string_ | `40%`   |

### SkeletonAvatar Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| avatar-size | Size of avatar placeholder | _number \| string_ | `32px` |
| avatar-shape | Shape of avatar placeholder, can be set to `square` | _string_ | `round` |

### SkeletonImage Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| image-size | Size of image placeholder | _number \| string_ | `32px` |
| image-shape | Shape of image placeholder, can be set to `square` | _string_ | `round` |

### Skeleton Slots

| Name     | Description    |
| -------- | -------------- |
| default  | Default slot   |
| template | Custom content |

### Types

The component exports the following type definitions:

```ts
import type {
  SkeletonProps,
  SkeletonImageProps,
  SkeletonTitleProps,
  SkeletonAvatarShape,
  SkeletonImageShape,
  SkeletonParagraphProps,
} from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                             | Default Value             | Description |
| -------------------------------- | ------------------------- | ----------- |
| --r-skeleton-row-height        | _16px_                    | -           |
| --r-skeleton-row-background    | _var(--r-active-color)_ | -           |
| --r-skeleton-row-margin-top    | _var(--r-padding-sm)_   | -           |
| --r-skeleton-title-width       | _40%_                     | -           |
| --r-skeleton-avatar-size       | _32px_                    | -           |
| --r-skeleton-avatar-background | _var(--r-active-color)_ | -           |
| --r-skeleton-duration          | _1.2s_                    | -           |
| --r-skeleton-image-size        | _96px_                    |
| --r-skeleton-image-radius      | _24px_                    | -           |
