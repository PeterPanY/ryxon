# Steps

### Intro

Used to show the various parts of the action flow and let the user know where the current action fits into the overall flow.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Step, Steps } from 'ryxon';

const app = createApp();
app.use(Step);
app.use(Steps);
```

## Usage

### Basic Usage

```html
<r-steps :active="active">
  <r-step>Step1</r-step>
  <r-step>Step2</r-step>
  <r-step>Step3</r-step>
  <r-step>Step4</r-step>
</r-steps>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(1);
    return { active };
  },
};
```

### Custom Style

```html
<r-steps :active="active" active-icon="success" active-color="#07c160">
  <r-step>Step1</r-step>
  <r-step>Step2</r-step>
  <r-step>Step3</r-step>
  <r-step>Step4</r-step>
</r-steps>
```

### Vertical Steps

```html
<r-steps direction="vertical" :active="0">
  <r-step>
    <h3>【City】Status1</h3>
    <p>2016-07-12 12:40</p>
  </r-step>
  <r-step>
    <h3>【City】Status2</h3>
    <p>2016-07-11 10:00</p>
  </r-step>
  <r-step>
    <h3>【City】Status3</h3>
    <p>2016-07-10 09:30</p>
  </r-step>
</r-steps>
```

## API

### Steps Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| active | Active step | _number \| string_ | `0` |
| direction | Can be set to `vertical` | _string_ | `horizontal` |
| active-color | Active step color | _string_ | `#07c160` |
| inactive-color | Inactive step color | _string_ | `#969799` |
| active-icon | Active icon name | _string_ | `checked` |
| inactive-icon | Inactive icon name | _string_ | - |
| finish-icon `v3.0.7` | Finish icon name | _string_ | - |
| icon-prefix `v3.0.15` | Icon className prefix | _string_ | `r-icon` |

### Step Slots

| Name                 | Description          |
| -------------------- | -------------------- |
| default              | Step content         |
| active-icon          | Custom active icon   |
| inactive-icon        | Custom inactive icon |
| finish-icon `v3.0.7` | Custom finish icon   |

### Steps Events

| Event | Description | Arguments |
| --- | --- | --- |
| click-step | Emitted when a step's title or icon is clicked | _index: number_ |

### Types

The component exports the following type definitions:

```ts
import type { StepsProps, StepsDirection } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-step-text-color | _var(--r-text-color-2)_ | - |
| --r-step-active-color | _var(--r-primary-color)_ | - |
| --r-step-process-text-color | _var(--r-text-color)_ | - |
| --r-step-font-size | _var(--r-font-size-md)_ | - |
| --r-step-line-color | _var(--r-border-color)_ | - |
| --r-step-finish-line-color | _var(--r-primary-color)_ | - |
| --r-step-finish-text-color | _var(--r-text-color)_ | - |
| --r-step-icon-size | _12px_ | - |
| --r-step-circle-size | _5px_ | - |
| --r-step-circle-color | _var(--r-gray-6)_ | - |
| --r-step-horizontal-title-font-size | _var(--r-font-size-sm)_ | - |
| --r-steps-background | _var(--r-background-2)_ | - |
