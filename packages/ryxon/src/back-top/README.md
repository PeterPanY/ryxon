# BackTop

### Intro

A button to back to top.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { BackTop } from 'ryxon'

const app = createApp()
app.use(BackTop)
```

## Usage

### Basic Usage

Please scroll the demo page to display the back top button.

```html
<r-cell v-for="item in list" :key="item" :title="item" />

<r-back-top />
```

```js
export default {
  setup() {
    const list = [...Array(50).keys()]
    return { list }
  }
}
```

### Custom Position

Using `right` and `bottom` props to set the position of BackTop component.

```html
<r-cell v-for="item in list" :key="item" :title="item" />
<r-back-top right="15vw" bottom="10vh" />
```

```js
export default {
  setup() {
    const list = [...Array(50).keys()]
    return { list }
  }
}
```

### Custom Content

Using the default slot to custom content.

```html
<r-cell v-for="item in list" :key="item" :title="item" />
<r-back-top class="custom">Back Top</r-back-top>

<style>
  .custom {
    width: 80px;
    font-size: 14px;
    text-align: center;
  }
</style>
```

```js
export default {
  setup() {
    const list = [...Array(50).keys()]
    return { list }
  }
}
```

### Set Scroll Target

```html
<div class="container">
  <r-cell v-for="item in list" :key="item" :title="item" />
  <r-back-top target=".container" bottom="30vh" />
</div>

<style>
  .container {
    height: 60vh;
    overflow: auto;
  }
</style>
```

```js
export default {
  setup() {
    const list = [...Array(50).keys()]
    return { list }
  }
}
```

### Immediate Scroll

Add `immediate` prop to scroll to top immediately.

```html
<r-back-top immediate />
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| target | Can be a selector or a DOM ELement | _string \| HTMLElement_ | - |
| right | Right distance of the page, the default unit is px | _number \| string_ | `30` |
| bottom | Bottom distance of the page, the default unit is px | _number \| string_ | `40` |
| offset | The component will not display until the scroll offset reaches this value | _number_ | `200` |
| teleport | Specifies a target element where BackTop will be mounted | _string \| Element_ | `body` |
| immediate `v4.0.9` | Whether to scroll to top immediately | _boolean_ | `false` |

### Events

| Event | Description                       | Arguments           |
| ----- | --------------------------------- | ------------------- |
| click | Emitted when Component is clicked | _event: MouseEvent_ |

### Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |

### Types

The component exports the following type definitions:

```ts
import type { BackTopProps, BackTopThemeVars } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                    | Default Value   | Description |
| ----------------------- | --------------- | ----------- |
| --r-back-top-size       | _40px_          | -           |
| --r-back-top-icon-size  | _20px_          | -           |
| --r-back-top-text-color | _#fff_          | -           |
| --r-back-top-background | _var(--r-blue)_ | -           |
