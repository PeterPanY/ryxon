# ActionSheet

### Intro

The pop-up modal panel at the bottom contains multiple options related to the current situation.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { ActionSheet } from 'ryxon'

const app = createApp()
app.use(ActionSheet)
```

## Usage

### Basic Usage

Use `actions` prop to set options of action-sheet.

```html
<r-cell is-link title="Basic Usage" @click="show = true" />
<r-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
```

```js
import { ref } from 'vue'
import { showToast } from 'ryxon'

export default {
  setup() {
    const show = ref(false)
    const actions = [
      { name: 'Option 1' },
      { name: 'Option 2' },
      { name: 'Option 3' }
    ]
    const onSelect = (item) => {
      show.value = false
      showToast(item.name)
    }

    return {
      show,
      actions,
      onSelect
    }
  }
}
```

### Show Cancel Button

```html
<r-action-sheet
  v-model:show="show"
  :actions="actions"
  cancel-text="Cancel"
  close-on-click-action
  @cancel="onCancel"
/>
```

```js
import { ref } from 'vue'
import { showToast } from 'ryxon'

export default {
  setup() {
    const show = ref(false)
    const actions = [
      { name: 'Option 1' },
      { name: 'Option 2' },
      { name: 'Option 3' }
    ]
    const onCancel = () => showToast('cancel')

    return {
      show,
      actions,
      onCancel
    }
  }
}
```

### Show Description

```html
<r-action-sheet
  v-model:show="show"
  :actions="actions"
  cancel-text="Cancel"
  description="Description"
  close-on-click-action
/>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const show = ref(false)
    const actions = [
      { name: 'Option 1' },
      { name: 'Option 2' },
      { name: 'Option 3', subname: 'Description' }
    ]

    return {
      show,
      actions
    }
  }
}
```

### Option Status

```html
<r-action-sheet
  v-model:show="show"
  :actions="actions"
  cancel-text="Cancel"
  close-on-click-action
/>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const show = ref(false)
    const actions = [
      { name: 'Colored Option', color: '#ee0a24' },
      { name: 'Disabled Option', disabled: true },
      { name: 'Loading Option', loading: true }
    ]

    return {
      show,
      actions
    }
  }
}
```

### Custom Panel

```html
<r-action-sheet v-model:show="show" title="Title">
  <div class="content">Content</div>
</r-action-sheet>

<style>
  .content {
    padding: 16px 16px 160px;
  }
</style>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:show | Whether to show ActionSheet | _boolean_ | `false` |
| actions | Options | _ActionSheetAction[]_ | `[]` |
| title | Title | _string_ | - |
| cancel-text | Text of cancel button | _string_ | - |
| description | Description above the options | _string_ | - |
| closeable | Whether to show close icon | _boolean_ | `true` |
| close-icon | Close icon name | _string_ | `cross` |
| duration | Transition duration, unit second | _number \| string_ | `0.3` |
| z-index | Set the z-index to a fixed value | _number \| string_ | `2000+` |
| round | Whether to show round corner | _boolean_ | `true` |
| overlay | Whether to show overlay | _boolean_ | `true` |
| overlay-class | Custom overlay class | _string \| Array \| object_ | - |
| overlay-style | Custom overlay style | _object_ | - |
| lock-scroll | Whether to lock background scroll | _boolean_ | `true` |
| lazy-render | Whether to lazy render util appeared | _boolean_ | `true` |
| close-on-popstate | Whether to close when popstate | _boolean_ | `true` |
| close-on-click-action | Whether to close when an action is clicked | _boolean_ | `false` |
| close-on-click-overlay | Whether to close when overlay is clicked | _boolean_ | `true` |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_ | `true` |
| teleport | Specifies a target element where ActionSheet will be mounted | _string \| Element_ | - |
| before-close | Callback function before close | _(action: string) => boolean \| Promise\<boolean\>_ | - |

### Data Structure of ActionSheetAction

| Key       | Description                     | Type                        |
| --------- | ------------------------------- | --------------------------- |
| name      | Title                           | _string_                    |
| subname   | Subtitle                        | _string_                    |
| color     | Text color                      | _string_                    |
| className | className for the option        | _string \| Array \| object_ |
| loading   | Whether to be loading status    | _boolean_                   |
| disabled  | Whether to be disabled          | _boolean_                   |
| callback  | Callback function after clicked | _action: ActionSheetAction_ |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| select | Emitted when an option is clicked | _action: ActionSheetAction, index: number_ |
| cancel | Emitted when the cancel button is clicked | - |
| open | Emitted when opening ActionSheet | - |
| close | Emitted when closing ActionSheet | - |
| opened | Emitted when ActionSheet is opened | - |
| closed | Emitted when ActionSheet is closed | - |
| click-overlay | Emitted when overlay is clicked | _event: MouseEvent_ |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| default | Custom content |
| description | Custom description above the options |
| cancel | Custom the content of cancel button |
| action | Custom the content of action | _{ action: ActionSheetAction, index: number }_ |

### Types

The component exports the following type definitions:

```ts
import type { ActionSheetProps, ActionSheetAction } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-action-sheet-max-height | _80%_ | - |
| --r-action-sheet-header-height | _48px_ | - |
| --r-action-sheet-header-font-size | _var(--r-font-size-lg)_ | - |
| --r-action-sheet-description-color | _var(--r-text-color-2)_ | - |
| --r-action-sheet-description-font-size | _var(--r-font-size-md)_ | - |
| --r-action-sheet-description-line-height | _var(--r-line-height-md)_ | - |
| --r-action-sheet-item-background | _var(--r-background-2)_ | - |
| --r-action-sheet-item-font-size | _var(--r-font-size-lg)_ | - |
| --r-action-sheet-item-line-height | _var(--r-line-height-lg)_ | - |
| --r-action-sheet-item-text-color | _var(--r-text-color)_ | - |
| --r-action-sheet-item-disabled-text-color | _var(--r-text-color-3)_ | - |
| --r-action-sheet-subname-color | _var(--r-text-color-2)_ | - |
| --r-action-sheet-subname-font-size | _var(--r-font-size-sm)_ | - |
| --r-action-sheet-subname-line-height | _var(--r-line-height-sm)_ | - |
| --r-action-sheet-close-icon-size | _22px_ | - |
| --r-action-sheet-close-icon-color | _var(--r-gray-5)_ | - |
| --r-action-sheet-close-icon-padding | _0 var(--r-padding-md)_ | - |
| --r-action-sheet-cancel-text-color | _var(--r-gray-7)_ | - |
| --r-action-sheet-cancel-padding-top | _var(--r-padding-xs)_ | - |
| --r-action-sheet-cancel-padding-color | _var(--r-background)_ | - |
| --r-action-sheet-loading-icon-size | _22px_ | - |
