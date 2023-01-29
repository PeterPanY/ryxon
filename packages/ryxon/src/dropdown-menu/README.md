# DropdownMenu

### Intro

The menu list that pops down downwards.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { DropdownMenu, DropdownItem } from 'ryxon';

const app = createApp();
app.use(DropdownMenu);
app.use(DropdownItem);
```

## Usage

### Basic Usage

```html
<r-dropdown-menu>
  <r-dropdown-item v-model="value1" :options="option1" />
  <r-dropdown-item v-model="value2" :options="option2" />
</r-dropdown-menu>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value1 = ref(0);
    const value2 = ref('a');
    const option1 = [
      { text: 'Option1', value: 0 },
      { text: 'Option2', value: 1 },
      { text: 'Option3', value: 2 },
    ];
    const option2 = [
      { text: 'Option A', value: 'a' },
      { text: 'Option B', value: 'b' },
      { text: 'Option C', value: 'c' },
    ];

    return {
      value1,
      value2,
      option1,
      option2,
    };
  },
};
```

### Custom Content

```html
<r-dropdown-menu>
  <r-dropdown-item v-model="value" :options="options" />
  <r-dropdown-item title="Title" ref="item">
    <r-cell center title="Title">
      <template #right-icon>
        <r-switch v-model="switch1" />
      </template>
    </r-cell>
    <r-cell center title="Title">
      <template #right-icon>
        <r-switch v-model="switch2" />
      </template>
    </r-cell>
    <div style="padding: 5px 16px;">
      <r-button type="primary" block round @click="onConfirm">
        Confirm
      </r-button>
    </div>
  </r-dropdown-item>
</r-dropdown-menu>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const item = ref(null);
    const value = ref(0);
    const switch1 = ref(false);
    const switch2 = ref(false);
    const options = [
      { text: 'Option1', value: 0 },
      { text: 'Option2', value: 1 },
      { text: 'Option3', value: 2 },
    ];
    const onConfirm = () => {
      item.value.toggle();
    };

    return {
      item,
      value,
      switch1,
      switch2,
      options,
      onConfirm,
    };
  },
};
```

### Custom Active Color

Use `active-color` prop to custom active color of the title and options.

```html
<r-dropdown-menu active-color="#ee0a24">
  <r-dropdown-item v-model="value1" :options="option1" />
  <r-dropdown-item v-model="value2" :options="option2" />
</r-dropdown-menu>
```

### Expand Direction

```html
<r-dropdown-menu direction="up">
  <r-dropdown-item v-model="value1" :options="option1" />
  <r-dropdown-item v-model="value2" :options="option2" />
</r-dropdown-menu>
```

### Disabled

```html
<r-dropdown-menu>
  <r-dropdown-item v-model="value1" disabled :options="option1" />
  <r-dropdown-item v-model="value2" disabled :options="option2" />
</r-dropdown-menu>
```

## API

### DropdownMenu Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| active-color | Active color of title and option | _string_ | `#1989fa` |
| direction | Expand direction, can be set to `up` | _string_ | `down` |
| z-index | z-index of menu item | _number \| string_ | `10` |
| duration | Transition duration, unit second | _number \| string_ | `0.2` |
| overlay | Whether to show overlay | _boolean_ | `true` |
| close-on-click-overlay | Whether to close when overlay is clicked | _boolean_ | `true` |
| close-on-click-outside | Whether to close when outside is clicked | _boolean_ | `true` |

### DropdownItem Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Value of current option | _number \| string_ | - |
| title | Item title | _string_ | Text of selected option |
| options | Options | _Option[]_ | `[]` |
| disabled | Whether to disable dropdown item | _boolean_ | `false` |
| lazy-render | Whether to lazy render util opened | _boolean_ | `true` |
| title-class | Title class | _string \| Array \| object_ | - |
| teleport | Specifies a target element where DropdownItem will be mounted | _string \| Element_ | - |

### DropdownItem Events

| Event  | Description                             | Arguments                 |
| ------ | --------------------------------------- | ------------------------- |
| change | Emitted select option and value changed | _value: number \| string_ |
| open   | Emitted when opening menu               | -                         |
| close  | Emitted when closing menu               | -                         |
| opened | Emitted when menu is opened             | -                         |
| closed | Emitted when menu is closed             | -                         |

### DropdownItem Slots

| Name    | Description  |
| ------- | ------------ |
| default | Content      |
| title   | Custom title |

### DropdownItem Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get DropdownItem instance and call instance methods.

| Name   | Description    | Attribute        | Return value |
| ------ | -------------- | ---------------- | ------------ |
| toggle | Toggle display | _show?: boolean_ | -            |

### Types

The component exports the following type definitions:

```ts
import type {
  DropdownMenuProps,
  DropdownItemProps,
  DropdownItemOption,
  DropdownItemInstance,
  DropdownMenuDirection,
} from 'ryxon';
```

`DropdownItemInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { DropdownItemInstance } from 'ryxon';

const dropdownItemRef = ref<DropdownItemInstance>();

dropdownItemRef.value?.toggle();
```

### Data Structure of Option

| Key   | Description | Type               |
| ----- | ----------- | ------------------ |
| text  | Text        | _string_           |
| value | Value       | _number \| string_ |
| icon  | Left icon   | _string_           |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-dropdown-menu-height | _48px_ | - |
| --r-dropdown-menu-background | _var(--r-background-2)_ | - |
| --r-dropdown-menu-shadow | _0 2px 12px fade(var(--r-gray-7), 12)_ | - |
| --r-dropdown-menu-title-font-size | _15px_ | - |
| --r-dropdown-menu-title-text-color | _var(--r-text-color)_ | - |
| --r-dropdown-menu-title-active-text-color | _var(--r-primary-color)_ | - |
| --r-dropdown-menu-title-disabled-text-color | _var(--r-text-color-2)_ | - |
| --r-dropdown-menu-title-padding | _0 var(--r-padding-xs)_ | - |
| --r-dropdown-menu-title-line-height | _var(--r-line-height-lg)_ | - |
| --r-dropdown-menu-option-active-color | _var(--r-primary-color)_ | - |
| --r-dropdown-menu-content-max-height | _80%_ | - |
| --r-dropdown-item-z-index | _10_ | - |
