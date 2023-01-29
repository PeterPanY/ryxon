# Layout

### Intro

Quickly and easily create layouts with `r-row` and `r-col`.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Col, Row } from 'ryxon';

const app = createApp();
app.use(Col);
app.use(Row);
```

## Usage

### Basic Usage

Layout are based on 24-column. The attribute `span` in `Col` means the number of column the grid spans. Of course, You can use `offset` attribute to set number of spacing on the left side of the grid.

```html
<r-row>
  <r-col span="8">span: 8</r-col>
  <r-col span="8">span: 8</r-col>
  <r-col span="8">span: 8</r-col>
</r-row>

<r-row>
  <r-col span="4">span: 4</r-col>
  <r-col span="10" offset="4">offset: 4, span: 10</r-col>
  <r-col span="6">span: 6</r-col>
</r-row>

<r-row>
  <r-col offset="12" span="12">offset: 12, span: 12</r-col>
</r-row>
```

### Column Spacing

Set grid spacing using `gutter` attribute. The default value is 0.

```html
<r-row gutter="20">
  <r-col span="8">span: 8</r-col>
  <r-col span="8">span: 8</r-col>
  <r-col span="8">span: 8</r-col>
</r-row>
```

### Justify Content

```html
<r-row justify="center">
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
</r-row>

<r-row justify="end">
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
</r-row>

<r-row justify="space-between">
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
</r-row>

<r-row justify="space-around">
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
  <r-col span="6">span: 6</r-col>
</r-row>
```

## API

### Row Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| gutter | Grid spacing（px） | _number \| string_ | - |
| tag | Custom element tag | _string_ | `div` |
| justify | Flex main axis, can be set to end/center/space-around/space-between | _string_ | `start` |
| align | Flex cross axis, be set to center/bottom | _string_ | `top` |
| wrap `v3.0.11` | Whether to wrap | _boolean_ | `true` |

### Col Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| span | number of column the grid spans | _number \| string_ | - |
| offset | number of spacing on the left side of the grid | _number \| string_ | - |
| tag | Custom element tag | _string_ | `div` |

### Row Events

| Event | Description                     | Arguments           |
| ----- | ------------------------------- | ------------------- |
| click | Emitted when the row is clicked | _event: MouseEvent_ |

### Col Events

| Event | Description                     | Arguments           |
| ----- | ------------------------------- | ------------------- |
| click | Emitted when the col is clicked | _event: MouseEvent_ |

### Types

The component exports the following type definitions:

```ts
import type { ColProps, RowProps, RowAlign, RowJustify } from 'ryxon';
```
