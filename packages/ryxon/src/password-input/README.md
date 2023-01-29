# PasswordInput

### Intro

The PasswordInput component is usually used with [NumberKeyboard](#/en-US/number-keyboard) Component.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { PasswordInput, NumberKeyboard } from 'ryxon';

const app = createApp();
app.use(PasswordInput);
app.use(NumberKeyboard);
```

## Usage

### Basic Usage

```html
<r-password-input
  :value="value"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<r-number-keyboard
  v-model="value"
  :show="showKeyboard"
  @blur="showKeyboard = false"
/>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('123');
    const showKeyboard = ref(true);

    return {
      value,
      showKeyboard,
    };
  },
};
```

### Custom Length

```html
<r-password-input
  :value="value"
  :gutter="15"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### Add Gutter

```html
<r-password-input
  :value="value"
  :gutter="10"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### Without Mask

```html
<r-password-input
  :value="value"
  :mask="false"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
```

### Hint Error

Use `info` to set info message, use `error-info` prop to set error message.

```html
<r-password-input
  :value="value"
  info="Some tips"
  :error-info="errorInfo"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<r-number-keyboard
  v-model="value"
  :show="showKeyboard"
  @blur="showKeyboard = false"
/>
```

```js
import { ref, watch } from 'vue';

export default {
  setup() {
    const value = ref('123');
    const errorInfo = ref('');
    const showKeyboard = ref(true);

    watch(value, (newVal) => {
      if (newVal.length === 6 && newVal !== '123456') {
        errorInfo.value = 'Password Mistake';
      } else {
        errorInfo.value = '';
      }
    });

    return {
      value,
      errorInfo,
      showKeyboard,
    };
  },
};
```

## API

### Props

| Attribute  | Description                    | Type               | Default |
| ---------- | ------------------------------ | ------------------ | ------- |
| value      | Password value                 | _string_           | `''`    |
| info       | Bottom info                    | _string_           | -       |
| error-info | Bottom error info              | _string_           | -       |
| length     | Maxlength of password          | _number \| string_ | `6`     |
| gutter     | Gutter of input                | _number \| string_ | `0`     |
| mask       | Whether to mask value          | _boolean_          | `true`  |
| focused    | Whether to show focused cursor | _boolean_          | `false` |

### Events

| Event | Description                   | Arguments |
| ----- | ----------------------------- | --------- |
| focus | Emitted when input is focused | -         |

### Types

The component exports the following type definitions:

```ts
import type { PasswordInputProps } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-password-input-height | _50px_ | - |
| --r-password-input-margin | _0 var(--r-padding-md)_ | - |
| --r-password-input-font-size | _20px_ | - |
| --r-password-input-radius | _6px_ | - |
| --r-password-input-background | _var(--r-background-2)_ | - |
| --r-password-input-info-color | _var(--r-text-color-2)_ | - |
| --r-password-input-info-font-size | _var(--r-font-size-md)_ | - |
| --r-password-input-error-info-color | _var(--r-danger-color)_ | - |
| --r-password-input-dot-size | _10px_ | - |
| --r-password-input-dot-color | _var(--r-text-color)_ | - |
| --r-password-input-text-color | _var(--r-text-color)_ | - |
| --r-password-input-cursor-color | _var(--r-text-color)_ | - |
| --r-password-input-cursor-width | _1px_ | - |
| --r-password-input-cursor-height | _40%_ | - |
| --r-password-input-cursor-duration | _1s_ | - |
