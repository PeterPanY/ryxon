# Notify

### Intro

The display message prompt is at the top of the page, and supports two methods: component call and function call.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Notify } from 'ryxon';

const app = createApp();
app.use(Notify);
```

### Function Call

Ryxon provides some utility functions that can quickly evoke global `Notify` components.

For example, calling the `showNotify` function will render a Dialog directly in the page.

```js
import { showNotify } from 'ryxon';

showNotify('Notify Message');
```

## Usage

### Basic Usage

```js
import { showNotify, closeNotify } from 'ryxon';

// auto close after 3s
showNotify('Message');

// manually close
closeNotify();
```

### Notify Type

```js
import { showNotify } from 'ryxon';

showNotify({ type: 'primary', message: 'Notify Message' });
showNotify({ type: 'success', message: 'Notify Message' });
showNotify({ type: 'danger', message: 'Notify Message' });
showNotify({ type: 'warning', message: 'Notify Message' });
```

### Custom Notify

```js
import { showNotify } from 'ryxon';

showNotify({
  message: 'Custom Color',
  color: '#ad0000',
  background: '#ffe1e1',
});

showNotify({
  message: 'Custom Position',
  position: 'bottom',
});

showNotify({
  message: 'Custom Duration',
  duration: 1000,
});
```

### Use Notify Component

```html
<r-button type="primary" text="Use Notify Component" @click="showNotify" />
<r-notify v-model:show="show" type="success">
  <r-icon name="bell" style="margin-right: 4px;" />
  <span>Content</span>
</r-notify>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);

    const showNotify = () => {
      show.value = true;
      setTimeout(() => {
        show.value = false;
      }, 2000);
    };

    return {
      show,
      showNotify,
    };
  },
};
```

## API

### Methods

Ryxon exports following Notify utility functions:

| Methods | Description | Attribute | Return value |
| --- | --- | --- | --- |
| showNotify | Show notify | `NotifyOptions \| string` | notify instance |
| closeNotify | Close notify | - | `void` |
| setNotifyDefaultOptions | Set default options of all notifies | `NotifyOptions` | `void` |
| resetNotifyDefaultOptions | Reset default options of all notifies | - | `void` |

### NotifyOptions

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| type | Can be set to `primary` `success` `warning` | _NotifyType_ | `danger` |
| message | Message | _string_ | - |
| duration | Duration(ms), won't disappear if value is 0 | _number \| string_ | `3000` |
| z-index | Set the z-index to a fixed value | _number \| string_ | `2000+` |
| position `v3.4.0` | Position, can be set to `bottom` | _NotifyPosition_ | `top` |
| color | Message color | _string_ | `white` |
| background | Background color | _string_ | - |
| className | Custom className | _string \| Array \| object_ | - |
| lockScroll `v3.0.7` | Whether to lock background scroll | _boolean_ | `false` |
| onClick | Callback function after click | _(event: MouseEvent) => void_ | - |
| onOpened | Callback function after opened | _() => void_ | - |
| onClose | Callback function after close | _() => void_ | - |

### Types

The component exports the following type definitions:

```ts
import type {
  NotifyType,
  NotifyProps,
  NotifyOptions,
  NotifyPosition,
} from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-notify-text-color | _var(--r-white)_ | - |
| --r-notify-padding | _var(--r-padding-xs) var(--r-padding-md)_ | - |
| --r-notify-font-size | _var(--r-font-size-md)_ | - |
| --r-notify-line-height | _var(--r-line-height-md)_ | - |
| --r-notify-primary-background | _var(--r-primary-color)_ | - |
| --r-notify-success-background | _var(--r-success-color)_ | - |
| --r-notify-danger-background | _var(--r-danger-color)_ | - |
| --r-notify-warning-background | _var(--r-warning-color)_ | - |
