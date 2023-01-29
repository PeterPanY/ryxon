# Cell

### Intro

The cell is a single display item in the list.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Cell, CellGroup } from 'ryxon';

const app = createApp();
app.use(Cell);
app.use(CellGroup);
```

## Usage

### Basic Usage

```html
<r-cell-group>
  <r-cell title="Cell title" value="Content" />
  <r-cell title="Cell title" value="Content" label="Description" />
</r-cell-group>
```

### Inset Grouped

```html
<r-cell-group inset>
  <r-cell title="Cell title" value="Content" />
  <r-cell title="Cell title" value="Content" label="Description" />
</r-cell-group>
```

### Size

```html
<r-cell-group>
  <r-cell title="Cell title" value="Content" size="large" />
  <r-cell
    title="Cell title"
    value="Content"
    size="large"
    label="Description"
  />
</r-cell-group>
```

### Left Icon

```html
<r-cell-group>
  <r-cell title="Cell title" icon="location-o" />
</r-cell-group>
```

### Value only

```html
<r-cell-group>
  <r-cell value="Content" />
</r-cell-group>
```

### Link

```html
<r-cell-group>
  <r-cell title="Cell title" is-link />
  <r-cell title="Cell title" is-link value="Content" />
  <r-cell title="Cell title" is-link arrow-direction="down" value="Content" />
</r-cell-group>
```

### Router

```html
<r-cell-group>
  <r-cell title="URL" is-link url="https://github.com" />
  <r-cell title="Vue Router" is-link to="index" />
</r-cell-group>
```

### Group Title

```html
<r-cell-group title="Group 1">
  <r-cell title="Cell title" value="Content" />
</r-cell-group>
<r-cell-group title="Group 2">
  <r-cell title="Cell title" value="Content" />
</r-cell-group>
```

### Use Slots

```html
<r-cell value="Content" is-link>
  <!-- Use the title slot to customize the title -->
  <template #title>
    <span class="custom-title">Title</span>
    <r-tag type="primary">Tag</r-tag>
  </template>
</r-cell>

<r-cell title="Title" icon="shop-o">
  <!-- Use the right-icon slot to customize the right icon -->
  <template #right-icon>
    <r-icon name="search" class="search-icon" />
  </template>
</r-cell>

<style>
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
</style>
```

### Vertical Center

```html
<r-cell center title="Cell title" value="Content" label="Description" />
```

## API

### CellGroup Props

| Attribute      | Description                  | Type      | Default |
| -------------- | ---------------------------- | --------- | ------- |
| title          | Group title                  | _string_  | -       |
| inset `v3.1.0` | Whether to be inset grouped  | _boolean_ | `false` |
| border         | Whether to show outer border | _boolean_ | `true`  |

### Cell Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | _number \| string_ | - |
| value | Right text | _number \| string_ | - |
| label | Description below the title | _string_ | - |
| size | Size, can be set to `large` | _string_ | - |
| icon | Left Icon | _string_ | - |
| icon-prefix | Icon className prefix | _string_ | `r-icon` |
| tag | Custom element tag | _string_ | `div` |
| url | Link URL | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |
| border | Whether to show inner border | _boolean_ | `true` |
| center | Whether to center content vertically | _boolean_ | `false` |
| clickable | Whether to show click feedback when clicked | _boolean_ | `null` |
| is-link | Whether to show link icon | _boolean_ | `false` |
| required | Whether to show required mark | _boolean_ | `false` |
| arrow-direction | Can be set to `left` `up` `down` | _string_ | `right` |
| title-style | Title style | _string \| Array \| object_ | - |
| title-class | Title className | _string \| Array \| object_ | - |
| value-class | Value className | _string \| Array \| object_ | - |
| label-class | Label className | _string \| Array \| object_ | - |

### Cell Events

| Event | Description                  | Arguments           |
| ----- | ---------------------------- | ------------------- |
| click | Emitted when cell is clicked | _event: MouseEvent_ |

### CellGroup Slots

| Name    | Description  |
| ------- | ------------ |
| default | Default slot |
| title   | Custom title |

### Cell Slots

| Name           | Description                       |
| -------------- | --------------------------------- |
| title          | Custom title                      |
| value `v3.1.1` | Custom value                      |
| label          | Custom label                      |
| icon           | Custom left icon                  |
| right-icon     | Custom right icon                 |
| extra          | Custom extra content on the right |

### Types

The component exports the following type definitions:

```ts
import type {
  CellSize,
  CellProps,
  CellGroupProps,
  CellArrowDirection,
} from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-cell-font-size | _var(--r-font-size-md)_ | - |
| --r-cell-line-height | _24px_ | - |
| --r-cell-vertical-padding | _10px_ | - |
| --r-cell-horizontal-padding | _var(--r-padding-md)_ | - |
| --r-cell-text-color | _var(--r-text-color)_ | - |
| --r-cell-background | _var(--r-background-2)_ | - |
| --r-cell-border-color | _var(--r-border-color)_ | - |
| --r-cell-active-color | _var(--r-active-color)_ | - |
| --r-cell-required-color | _var(--r-danger-color)_ | - |
| --r-cell-label-color | _var(--r-text-color-2)_ | - |
| --r-cell-label-font-size | _var(--r-font-size-sm)_ | - |
| --r-cell-label-line-height | _var(--r-line-height-sm)_ | - |
| --r-cell-label-margin-top | _var(--r-padding-base)_ | - |
| --r-cell-value-color | _var(--r-text-color-2)_ | - |
| --r-cell-icon-size | _16px_ | - |
| --r-cell-right-icon-color | _var(--r-gray-6)_ | - |
| --r-cell-large-vertical-padding | _var(--r-padding-sm)_ | - |
| --r-cell-large-title-font-size | _var(--r-font-size-lg)_ | - |
| --r-cell-large-label-font-size | _var(--r-font-size-md)_ | - |
| --r-cell-group-background | _var(--r-background-2)_ | - |
| --r-cell-group-title-color | _var(--r-text-color-2)_ | - |
| --r-cell-group-title-padding | _var(--r-padding-md) var(--r-padding-md) var(--r-padding-xs)_ | - |
| --r-cell-group-title-font-size | _var(--r-font-size-md)_ | - |
| --r-cell-group-title-line-height | _16px_ | - |
| --r-cell-group-inset-padding | _0 var(--r-padding-md)_ | - |
| --r-cell-group-inset-radius | _var(--r-radius-lg)_ | - |
| --r-cell-group-inset-title-padding | _var(--r-padding-md) var(--r-padding-md) var(--r-padding-xs) var(--r-padding-xl)_ | - |
