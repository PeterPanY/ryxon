# Sidebar

### Intro

The vertically displayed navigation bar is used to switch between different content areas.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { Sidebar, SidebarItem } from 'ryxon'

const app = createApp()
app.use(Sidebar)
app.use(SidebarItem)
```

## Usage

### Basic Usage

```html
<r-sidebar v-model="active">
  <r-sidebar-item title="Title" />
  <r-sidebar-item title="Title" />
  <r-sidebar-item title="Title" />
</r-sidebar>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const active = ref(0)
    return { active }
  }
}
```

### Show Badge

```html
<r-sidebar v-model="active">
  <r-sidebar-item title="Title" dot />
  <r-sidebar-item title="Title" badge="5" />
  <r-sidebar-item title="Title" />
</r-sidebar>
```

### Disabled

```html
<r-sidebar v-model="active">
  <r-sidebar-item title="Title" />
  <r-sidebar-item title="Title" disabled />
  <r-sidebar-item title="Title" />
</r-sidebar>
```

### Change Event

```html
<r-sidebar v-model="active" @change="onChange">
  <r-sidebar-item title="Title 1" />
  <r-sidebar-item title="Title 2" />
  <r-sidebar-item title="Title 3" />
</r-sidebar>
```

```js
import { ref } from 'vue'
import { showMessage } from 'ryxon'

export default {
  setup() {
    const active = ref(0)
    const onChange = (index) => showMessage(`Title ${index + 1}`)
    return {
      active,
      onChange
    }
  }
}
```

## API

### Sidebar Props

| Attribute | Description          | Type               | Default |
| --------- | -------------------- | ------------------ | ------- |
| v-model   | Index of chosen item | _number \| string_ | `0`     |

### Sidebar Events

| Event  | Description                      | Arguments       |
| ------ | -------------------------------- | --------------- |
| change | Emitted when chosen item changed | _index: number_ |

### SidebarItem Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| title | Content | _string_ | `''` |
| dot | Whether to show red dot | _boolean_ | `false` |
| badge | Content of the badge | _number \| string_ | `''` |
| badge-props | Props of Badge, see [Badge - props](#/en-US/badge#props) | _BadgeProps_ | - |
| disabled | Whether to be disabled | _boolean_ | `false` |
| url | Link | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### SidebarItem Events

| Event | Description                     | Arguments       |
| ----- | ------------------------------- | --------------- |
| click | Emitted when an item is clicked | _index: number_ |

### SidebarItem Slots

| Name  | Description       |
| ----- | ----------------- |
| title | Custom item title |

### Types

The component exports the following type definitions:

```ts
import type { SidebarProps, SidebarItemProps } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-sidebar-width | _80px_ | - |
| --r-sidebar-font-size | _var(--r-font-size-md)_ | - |
| --r-sidebar-line-height | _var(--r-line-height-md)_ | - |
| --r-sidebar-text-color | _var(--r-text-color)_ | - |
| --r-sidebar-disabled-text-color | _var(--r-text-color-3)_ | - |
| --r-sidebar-padding | _20px var(--r-padding-sm)_ | - |
| --r-sidebar-active-color | _var(--r-active-color)_ | - |
| --r-sidebar-background | _var(--r-background)_ | - |
| --r-sidebar-selected-font-weight | _var(--r-font-bold)_ | - |
| --r-sidebar-selected-text-color | _var(--r-text-color)_ | - |
| --r-sidebar-selected-border-width | _4px_ | - |
| --r-sidebar-selected-border-height | _16px_ | - |
| --r-sidebar-selected-border-color | _var(--r-primary-color)_ | - |
| --r-sidebar-selected-background | _var(--r-background-2)_ | - |
