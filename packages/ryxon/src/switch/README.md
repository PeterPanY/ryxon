# Switch

### Intro

Used to switch between open and closed states.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { Switch } from 'ryxon'

const app = createApp()
app.use(Switch)
```

## Usage

### Basic Usage

```html
<r-switch v-model="checked" />
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const checked = ref(true)
    return { checked }
  }
}
```

### Disabled

```html
<r-switch v-model="checked" disabled />
```

### Loading

```html
<r-switch v-model="checked" loading />
```

### Custom Size

```html
<r-switch v-model="checked" size="22px" />
```

### Custom Color

```html
<r-switch v-model="checked" active-color="#ee0a24" inactive-color="#dcdee0" />
```

### Custom Node

Using `node` slot to custom the content of the node.

```html
<r-switch v-model="checked">
  <template #node>
    <div class="icon-wrapper">
      <r-icon :name="checked ? 'success' : 'cross'" />
    </div>
  </template>
</r-switch>

<style>
  .icon-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 18px;
  }

  .icon-wrapper .r-icon-success {
    line-height: 32px;
    color: var(--r-blue);
  }

  .icon-wrapper .r-icon-cross {
    line-height: 32px;
    color: var(--r-gray-5);
  }
</style>
```

### Async Control

```html
<r-switch :model-value="checked" @update:model-value="onUpdateValue" />
```

```js
import { ref } from 'vue'
import { showConfirmDialog } from 'ryxon'

export default {
  setup() {
    const checked = ref(true)
    const onUpdateValue = (newValue) => {
      showConfirmDialog({
        title: 'Confirm',
        message: 'Are you sure to toggle switch?'
      }).then(() => {
        checked.value = newValue
      })
    }

    return {
      checked,
      onUpdateValue
    }
  }
}
```

### Inside a Cell

```html
<r-cell center title="Title">
  <template #right-icon>
    <r-switch v-model="checked" />
  </template>
</r-cell>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Check status of Switch | _ActiveValue \| InactiveValue_ | `false` |
| loading | Whether to show loading icon | _boolean_ | `false` |
| disabled | Whether to disable switch | _boolean_ | `false` |
| size | Size of switch button | _number \| string_ | `26px` |
| active-color | Background color when active | _string_ | `#1989fa` |
| inactive-color | Background color when inactive | _string_ | `rgba(120, 120, 128, 0.16)` |
| active-value | Value when active | _any_ | `true` |
| inactive-value | Value when inactive | _any_ | `false` |

### Events

| Event  | Description                       | Parameters          |
| ------ | --------------------------------- | ------------------- |
| change | Emitted when check status changed | _value: any_        |
| click  | Emitted when component is clicked | _event: MouseEvent_ |

### Slots

| Name       | Description                     | SlotProps |
| ---------- | ------------------------------- | --------- |
| node       | Custom the content of node      | -         |
| background | Custom the background of switch | -         |

### Types

The component exports the following type definitions:

```ts
import type { SwitchProps } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-switch-size | _26px_ | - |
| --r-switch-width | _calc(1.8em + 4px)_ | - |
| --r-switch-height | _calc(1em + 4px)_ | - |
| --r-switch-node-size | _1em_ | - |
| --r-switch-node-background | _var(--r-white)_ | - |
| --r-switch-node-shadow | _0 3px 1px 0 rgba(0, 0, 0, 0.05)_ | - |
| --r-switch-background | _rgba(120, 120, 128, 0.16)_ | - |
| --r-switch-on-background | _var(--r-primary-color)_ | - |
| --r-switch-duration | _var(--r-duration-base)_ | - |
| --r-switch-disabled-opacity | _var(--r-disabled-opacity)_ | - |
