# NumberKeyboard

### Intro

The NumberKeyboard component can be used with [PasswordInput](#/en-US/password-input) component or custom input box components.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { NumberKeyboard } from 'ryxon';

const app = createApp();
app.use(NumberKeyboard);
```

## Usage

### Default Keyboard

```html
<r-cell @touchstart.stop="show = true">Show Keyboard</r-cell>
<r-number-keyboard
  :show="show"
  @blur="show = false"
  @input="onInput"
  @delete="onDelete"
/>
```

```js
import { ref } from 'vue';
import { showToast } from 'ryxon';

export default {
  setup() {
    const show = ref(true);
    const onInput = (value) => showToast(value);
    const onDelete = () => showToast('delete');

    return {
      show,
      onInput,
      onDelete,
    };
  },
};
```

### Keyboard With Sidebar

```html
<r-number-keyboard
  :show="show"
  theme="custom"
  extra-key="."
  close-button-text="Close"
  @blur="show = false"
  @input="onInput"
  @delete="onDelete"
/>
```

### IdNumber Keyboard

Use `extra-key` prop to set the content of bottom left button.

```html
<r-cell plain type="primary" @touchstart.stop="show = true">
  Show IdNumber Keyboard
</r-cell>

<r-number-keyboard
  :show="show"
  extra-key="X"
  close-button-text="Close"
  @blur="show = false"
  @input="onInput"
  @delete="onDelete"
/>
```

### Keyboard With Title

Use `title` prop to set keyboard title.

```html
<r-cell plain type="primary" @touchstart.stop="show = true">
  Show Keyboard With Title
</r-cell>
<r-number-keyboard
  :show="show"
  title="Keyboard Title"
  extra-key="."
  close-button-text="Close"
  @blur="show = false"
  @input="onInput"
  @delete="onDelete"
/>
```

### Multiple ExtraKey

```html
<r-cell plain type="primary" @touchstart.stop="show = true">
  Show Keyboard With Multiple ExtraKey
</r-cell>
<r-number-keyboard
  :show="show"
  theme="custom"
  :extra-key="['00', '.']"
  close-button-text="Close"
  @blur="show = false"
  @input="onInput"
  @delete="onDelete"
/>
```

### Random Key Order

Use `random-key-order` prop to shuffle the order of keys.

```html
<r-cell @touchstart.stop="show = true">
  Show Keyboard With Random Key Order
</r-cell>
<r-number-keyboard
  :show="show"
  random-key-order
  @blur="show = false"
  @input="onInput"
  @delete="onDelete"
/>
```

### Bind Value

```html
<r-field v-model="value" readonly clickable @touchstart.stop="show = true" />
<r-number-keyboard
  v-model="value"
  :show="show"
  :maxlength="6"
  @blur="show = false"
/>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(true);
    const value = ref('');
    return {
      show,
      value,
    };
  },
};
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Current value | _string_ | - |
| show | Whether to show keyboard | _boolean_ | - |
| title | Keyboard title | _string_ | - |
| theme | Keyboard theme, can be set to `custom` | _string_ | `default` |
| maxlength | Value maxlength | _number \| string_ | `Infinity` |
| transition | Whether to show transition animation | _boolean_ | `true` |
| z-index | Keyboard z-index | _number \| string_ | `100` |
| extra-key | Content of bottom left key | _string \| string[]_ | `''` |
| close-button-text | Close button text | _string_ | - |
| delete-button-text | Delete button text | _string_ | Delete Icon |
| close-button-loading | Whether to show loading close button in custom theme | _boolean_ | `false` |
| show-delete-key | Whether to show delete button | _boolean_ | `true` |
| blur-on-close `v3.0.6` | Whether to emit blur event when clicking close button | _boolean_ | `true` |
| hide-on-click-outside | Whether to hide keyboard when outside is clicked | _boolean_ | `true` |
| teleport | Specifies a target element where NumberKeyboard will be mounted | _string \| Element_ | - |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_ | `true` |
| random-key-order | Whether to shuffle the order of keys | _boolean_ | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| input | Emitted when a key is pressed | _key: string_ |
| delete | Emitted when the delete key is pressed | - |
| close | Emitted when the close button is clicked | - |
| blur | Emitted when the close button is clicked or the keyboard is blurred | - |
| show | Emitted when keyboard is fully displayed | - |
| hide | Emitted when keyboard is fully hidden | - |

### Slots

| Name       | Description               |
| ---------- | ------------------------- |
| delete     | Custom delete key content |
| extra-key  | Custom extra key content  |
| title-left | Custom title left content |

### Types

The component exports the following type definitions:

```ts
import type { NumberKeyboardProps, NumberKeyboardTheme } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-number-keyboard-background | _var(--r-gray-2)_ | - |
| --r-number-keyboard-key-height | _48px_ | - |
| --r-number-keyboard-key-font-size | _28px_ | - |
| --r-number-keyboard-key-active-color | _var(--r-gray-3)_ | - |
| --r-number-keyboard-key-background | _var(--r-white)_ | - |
| --r-number-keyboard-delete-font-size | _var(--r-font-size-lg)_ | - |
| --r-number-keyboard-title-color | _var(--r-gray-7)_ | - |
| --r-number-keyboard-title-height | _34px_ | - |
| --r-number-keyboard-title-font-size | _var(--r-font-size-lg)_ | - |
| --r-number-keyboard-close-padding | _0 var(--r-padding-md)_ | - |
| --r-number-keyboard-close-color | _var(--r-link-color)_ | - |
| --r-number-keyboard-close-font-size | _var(--r-font-size-md)_ | - |
| --r-number-keyboard-button-text-color | _var(--r-white)_ | - |
| --r-number-keyboard-button-background | _var(--r-primary-color)_ | - |
| --r-number-keyboard-z-index | _100_ | - |
