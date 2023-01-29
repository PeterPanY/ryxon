# Badge

### Intro

Display a small badge or a red dot to the top-right of its child.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Badge } from 'ryxon';

const app = createApp();
app.use(Badge);
```

## Usage

### Basic Usage

```html
<r-badge :content="5">
  <div class="child" />
</r-badge>
<r-badge :content="10">
  <div class="child" />
</r-badge>
<r-badge content="Hot">
  <div class="child" />
</r-badge>
<r-badge dot>
  <div class="child" />
</r-badge>

<style>
  .child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
  }
</style>
```

### Max

```html
<r-badge :content="20" max="9">
  <div class="child" />
</r-badge>
<r-badge :content="50" max="20">
  <div class="child" />
</r-badge>
<r-badge :content="200" max="99">
  <div class="child" />
</r-badge>
```

### Custom Color

```html
<r-badge :content="5" color="#1989fa">
  <div class="child" />
</r-badge>
<r-badge :content="10" color="#1989fa">
  <div class="child" />
</r-badge>
<r-badge dot color="#1989fa">
  <div class="child" />
</r-badge>
```

### Custom Content

Use `content` slot to custom the content of badge.

```html
<r-badge>
  <div class="child" />
  <template #content>
    <r-icon name="success" class="badge-icon" />
  </template>
</r-badge>
<r-badge>
  <div class="child" />
  <template #content>
    <r-icon name="cross" class="badge-icon" />
  </template>
</r-badge>
<r-badge>
  <div class="child" />
  <template #content>
    <r-icon name="down" class="badge-icon" />
  </template>
</r-badge>
```

```css
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
```

### Custom Position

Use `position` prop to set the position of badge.

```html
<r-badge :content="10" position="top-left">
  <div class="child" />
</r-badge>
<r-badge :content="10" position="bottom-left">
  <div class="child" />
</r-badge>
<r-badge :content="10" position="bottom-right">
  <div class="child" />
</r-badge>
```

### Standalone

```html
<r-badge :content="20" />

<r-badge :content="200" max="99" />
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| content | Badge content | _number \| string_ | - |
| color | Background color | _string_ | `#ee0a24` |
| dot | Whether to show dot | _boolean_ | `false` |
| max | Max value, show `{max}+` when exceed, only works when content is number | _number \| string_ | - |
| offset `v3.0.5` | Offset of badge dot, the two items of the array correspond to the horizontal and vertical offsets | _[number \| string, number \| string]_ | - |
| show-zero `v3.0.10` | Whether to show badge when content is zero | _boolean_ | `true` |
| position `v3.2.7` | Badge position, can be set to `top-left` `bottom-left` `bottom-right` | _string_ | `top-right` |

### Slots

| Name    | Description          |
| ------- | -------------------- |
| default | Default slot         |
| content | Custom badge content |

### Types

The component exports the following type definitions:

```ts
import type { BadgeProps, BadgePosition } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-badge-size | _16px_ | - |
| --r-badge-color | _var(--r-white)_ | - |
| --r-badge-padding | _0 3px_ | - |
| --r-badge-font-size | _var(--r-font-size-sm)_ | - |
| --r-badge-font-weight | _var(--r-font-bold)_ | - |
| --r-badge-border-width | _var(--r-border-width)_ | - |
| --r-badge-background | _var(--r-danger-color)_ | - |
| --r-badge-dot-color | _var(--r-danger-color)_ | - |
| --r-badge-dot-size | _8px_ | - |
| --r-badge-font | _-apple-system-font, Helvetica Neue, Arial, sans-serif_ | - |
