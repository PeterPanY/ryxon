# Radio

### Intro

Single selection among multiple options.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { RadioGroup, Radio } from 'ryxon';

const app = createApp();
app.use(Radio);
app.use(RadioGroup);
```

## Usage

### Basic Usage

Use `v-model` to bind the name of checked radio.

```html
<r-radio-group v-model="checked">
  <r-radio name="1">Radio 1</r-radio>
  <r-radio name="2">Radio 2</r-radio>
</r-radio-group>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const checked = ref('1');
    return { checked };
  },
};
```

### Horizontal

```html
<r-radio-group v-model="checked" direction="horizontal">
  <r-radio name="1">Radio 1</r-radio>
  <r-radio name="2">Radio 2</r-radio>
</r-radio-group>
```

### Disabled

```html
<r-radio-group v-model="checked" disabled>
  <r-radio name="1">Radio 1</r-radio>
  <r-radio name="2">Radio 2</r-radio>
</r-radio-group>
```

### Custom Shape

```html
<r-radio-group v-model="checked">
  <r-radio name="1" shape="square">Radio 1</r-radio>
  <r-radio name="2" shape="square">Radio 2</r-radio>
</r-radio-group>
```

### Custom Color

```html
<r-radio-group v-model="checked">
  <r-radio name="1" checked-color="#ee0a24">Radio 1</r-radio>
  <r-radio name="2" checked-color="#ee0a24">Radio 2</r-radio>
</r-radio-group>
```

### Custom Icon Size

```html
<r-radio-group v-model="checked">
  <r-radio name="1" icon-size="24px">Radio 1</r-radio>
  <r-radio name="2" icon-size="24px">Radio 2</r-radio>
</r-radio-group>
```

### Custom Icon

Use icon slot to custom icon

```html
<r-radio-group v-model="checked">
  <r-radio name="1">
    Radio 1
    <template #icon="props">
      <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
    </template>
  </r-radio>
  <r-radio name="2">
    Radio 2
    <template #icon="props">
      <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
    </template>
  </r-radio>
</r-radio-group>

<style>
  .img-icon {
    height: 20px;
  }
</style>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const checked = ref('1');
    return {
      checked,
      activeIcon:
        'https://fastly.jsdelivr.net/npm/@ryxon/assets/user-active.png',
      inactiveIcon:
        'https://fastly.jsdelivr.net/npm/@ryxon/assets/user-inactive.png',
    };
  },
};
```

### Disable Label Click

```html
<r-radio-group v-model="checked">
  <r-radio name="1" label-disabled>Radio 1</r-radio>
  <r-radio name="2" label-disabled>Radio 2</r-radio>
</r-radio-group>
```

### Inside a Cell

```html
<r-radio-group v-model="checked">
  <r-cell-group inset>
    <r-cell title="Radio 1" clickable @click="checked = '1'">
      <template #right-icon>
        <r-radio name="1" />
      </template>
    </r-cell>
    <r-cell title="Radio 2" clickable @click="checked = '2'">
      <template #right-icon>
        <r-radio name="2" />
      </template>
    </r-cell>
  </r-cell-group>
</r-radio-group>
```

### Types

The component exports the following type definitions:

```ts
import type {
  RadioProps,
  RadioShape,
  RadioGroupProps,
  RadioLabelPosition,
  RadioGroupDirection,
} from 'ryxon';
```

## API

### Radio Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| name | Radio name, usually a unique string or number | _any_ | - |
| shape | Can be set to `square` | _string_ | `round` |
| disabled | Whether to disable radio | _boolean_ | `false` |
| label-disabled | Whether to disable label click | _boolean_ | `false` |
| label-position | Can be set to `left` | _string_ | `right` |
| icon-size | Icon size | _number \| string_ | `20px` |
| checked-color | Checked color | _string_ | `#1989fa` |

### RadioGroup Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Name of checked radio | _any_ | - |
| disabled | Disable all radios | _boolean_ | `false` |
| direction | Direction, can be set to `horizontal` | _string_ | `vertical` |
| icon-size | Icon size of all radios | _number \| string_ | `20px` |
| checked-color | Checked color of all radios | _string_ | `#1989fa` |

### Radio Events

| Event | Description                   | Parameters          |
| ----- | ----------------------------- | ------------------- |
| click | Emitted when radio is clicked | _event: MouseEvent_ |

### RadioGroup Events

| Event  | Description                | Parameters     |
| ------ | -------------------------- | -------------- |
| change | Emitted when value changed | _name: string_ |

### Radio Slots

| Name    | Description  | SlotProps                                 |
| ------- | ------------ | ----------------------------------------- |
| default | Custom label | -                                         |
| icon    | Custom icon  | _{ checked: boolean, disabled: boolean }_ |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                             | Default Value              | Description |
| -------------------------------- | -------------------------- | ----------- |
| --r-radio-size                 | _20px_                     | -           |
| --r-radio-border-color         | _var(--r-gray-5)_        | -           |
| --r-radio-duration             | _var(--r-duration-fast)_ | -           |
| --r-radio-label-margin         | _var(--r-padding-xs)_    | -           |
| --r-radio-label-color          | _var(--r-text-color)_    | -           |
| --r-radio-checked-icon-color   | _var(--r-primary-color)_ | -           |
| --r-radio-disabled-icon-color  | _var(--r-gray-5)_        | -           |
| --r-radio-disabled-label-color | _var(--r-text-color-3)_  | -           |
| --r-radio-disabled-background  | _var(--r-border-color)_  | -           |
