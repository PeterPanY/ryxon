# Grid

### Intro

Used to divide the page into blocks of equal width in the horizontal direction for displaying content or page navigation.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { Grid, GridItem } from 'ryxon'

const app = createApp()
app.use(Grid)
app.use(GridItem)
```

## Usage

### Basic Usage

```html
<r-grid>
  <r-grid-item icon="photo-o" text="Text" />
  <r-grid-item icon="photo-o" text="Text" />
  <r-grid-item icon="photo-o" text="Text" />
  <r-grid-item icon="photo-o" text="Text" />
</r-grid>
```

### Column Num

```html
<r-grid :column-num="3">
  <r-grid-item v-for="value in 6" :key="value" icon="photo-o" text="Text" />
</r-grid>
```

### Custom Content

```html
<r-grid :border="false" :column-num="3">
  <r-grid-item>
    <r-image src="https://fastly.jsdelivr.net/npm/@ryxon/assets/apple-1.jpeg" />
  </r-grid-item>
  <r-grid-item>
    <r-image src="https://fastly.jsdelivr.net/npm/@ryxon/assets/apple-2.jpeg" />
  </r-grid-item>
  <r-grid-item>
    <r-image src="https://fastly.jsdelivr.net/npm/@ryxon/assets/apple-3.jpeg" />
  </r-grid-item>
</r-grid>
```

### Square

```html
<r-grid square>
  <r-grid-item v-for="value in 8" :key="value" icon="photo-o" text="Text" />
</r-grid>
```

### Gutter

```html
<r-grid :gutter="10">
  <r-grid-item v-for="value in 8" :key="value" icon="photo-o" text="Text" />
</r-grid>
```

### Horizontal

```html
<r-grid direction="horizontal" :column-num="3">
  <r-grid-item icon="photo-o" text="文字" />
  <r-grid-item icon="photo-o" text="文字" />
  <r-grid-item icon="photo-o" text="文字" />
</r-grid>
```

### Route

```html
<r-grid clickable :column-num="2">
  <r-grid-item icon="home-o" text="Vue Router" to="/" />
  <r-grid-item icon="search" text="URL" url="https://github.com" />
</r-grid>
```

### Show Badge

```html
<r-grid :column-num="2">
  <r-grid-item icon="home-o" text="Text" dot />
  <r-grid-item icon="search" text="Text" badge="99+" />
</r-grid>
```

## API

### Grid Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| column-num | Column Num | _number \| string_ | `4` |
| icon-size | Icon size | _number \| string_ | `28px` |
| gutter | Gutter | _number \| string_ | `0` |
| border | Whether to show border | _boolean_ | `true` |
| center | Whether to center content | _boolean_ | `true` |
| square | Whether to be square shape | _boolean_ | `false` |
| clickable | Whether to show click feedback when clicked | _boolean_ | `false` |
| direction | Content arrangement direction, can be set to `horizontal` | _string_ | `vertical` |
| reverse | Whether to reverse the position of icon and text | _boolean_ | `false` |

### GridItem Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| text | Text | _string_ | - |
| icon | Icon name or URL | _string_ | - |
| icon-prefix | Icon className prefix | _string_ | `r-icon` |
| icon-color | Icon color | _string_ | - |
| dot | Whether to show red dot | _boolean_ | `false` |
| badge | Content of the badge | _number \| string_ | - |
| badge-props | Props of Badge, see [Badge - props](#/en-US/badge#props) | _BadgeProps_ | - |
| url | Link URL | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### GridItem Events

| Event | Description                       | Arguments           |
| ----- | --------------------------------- | ------------------- |
| click | Emitted when component is clicked | _event: MouseEvent_ |

### GridItem Slots

| Name    | Description    |
| ------- | -------------- |
| default | Custom content |
| icon    | Custom icon    |
| text    | Custom text    |

### Types

The component exports the following type definitions:

```ts
import type { GridProps, GridDirection, GridItemProps } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-grid-item-content-padding | _var(--r-padding-md) var(--r-padding-xs)_ | - |
| --r-grid-item-content-background | _var(--r-background-2)_ | - |
| --r-grid-item-content-active-color | _var(--r-active-color)_ | - |
| --r-grid-item-icon-size | _28px_ | - |
| --r-grid-item-text-color | _var(--r-text-color)_ | - |
| --r-grid-item-text-font-size | _var(--r-font-size-sm)_ | - |
