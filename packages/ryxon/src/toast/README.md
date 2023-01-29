# Toast

### Intro

Black semi-transparent pop-up hint in the middle of the page, used for message notification, loading hint, operation result hint and other scenarios.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Toast } from 'ryxon';

const app = createApp();
app.use(Toast);
```

### Function Call

Ryxon provides some utility functions that can quickly evoke global `Toast` components.

For example, calling the `showToast` function will render a Toast directly in the page.

```js
import { showToast } from 'ryxon';

showToast('Some messages');
```

## Usage

### Text

```js
import { showToast } from 'ryxon';

showToast('Some messages');
```

### Loading

```js
import { showLoadingToast } from 'ryxon';

showLoadingToast({
  message: 'Loading...',
  forbidClick: true,
});
```

### Success/Fail

```js
import { showSuccessToast, showFailToast } from 'ryxon';

showSuccessToast('Success');
showFailToast('Fail');
```

### Custom Icon

```js
import { showToast, showLoadingToast } from 'ryxon';

showToast({
  message: 'Custom Icon',
  icon: 'like-o',
});

showToast({
  message: 'Custom Image',
  icon: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/logo.png',
});

showLoadingToast({
  message: 'Loading...',
  forbidClick: true,
  loadingType: 'spinner',
});
```

### Custom Position

```js
import { showToast } from 'ryxon';

showToast({
  message: 'Top',
  position: 'top',
});

showToast({
  message: 'Bottom',
  position: 'bottom',
});
```

### Word Break

Using `wordBreak` option to set whether line breaks appear wherever the text would otherwise overflow its content box. The default value is `break-all`, and can be set to `break-word` or `normal`.

```js
import { showToast } from 'ryxon';

showToast({
  message: 'This message will contain a incomprehensibilities long word.',
  wordBreak: 'break-all',
});

showToast({
  message: 'This message will contain a incomprehensibilities long word.',
  wordBreak: 'break-word',
});
```

### Update Message

```js
import { showLoadingToast, closeToast } from 'ryxon';

const toast = showLoadingToast({
  duration: 0,
  forbidClick: true,
  loadingType: 'spinner',
  message: '3 seconds',
});

let second = 3;
const timer = setInterval(() => {
  second--;
  if (second) {
    toast.message = `${second} seconds`;
  } else {
    clearInterval(timer);
    closeToast();
  }
}, 1000);
```

### Singleton

Toast use singleton mode by default, if you need to pop multiple Toast at the same time, you can refer to the following example:

```js
import { showToast, showSuccessToast, allowMultipleToast } from 'ryxon';

allowMultipleToast();

const toast1 = showToast('First Toast');
const toast2 = showSuccessToast('Second Toast');

toast1.close();
toast2.close();
```

### Set Default Options

The Toast default configuration can be globally modified with the `setToastDefaultOptions` function.

```js
import { setToastDefaultOptions, resetToastDefaultOptions } from 'ryxon';

setToastDefaultOptions({ duration: 2000 });

setToastDefaultOptions('loading', { forbidClick: true });

resetToastDefaultOptions();

resetToastDefaultOptions('loading');
```

### Use Toast Component

If you want to render Vue components within a Toast, you can use the Toast component.

```html
<r-toast v-model:show="show" style="padding: 0">
  <template #message>
    <r-image :src="image" width="200" height="140" style="display: block" />
  </template>
</r-toast>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    return { show };
  },
};
```

## API

### Methods

Ryxon exports following Toast utility functions:

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| showToast | Show toast | `ToastOptions \| string` | toast instance |
| showLoadingToast | Show loading toast | `ToastOptions \| string` | toast instance |
| showSuccessToast | Show success toast | `ToastOptions \| string` | toast instance |
| showFailToast | Show fail toast | `ToastOptions \| string` | toast instance |
| closeToast | Close toast | `closeAll: boolean` | `void` |
| allowMultipleToast | Allow multiple toast at the same time | - | `void` |
| setToastDefaultOptions | Set default options of all toasts | `type \| ToastOptions` | `void` |
| resetToastDefaultOptions | Reset default options of all toasts | `type` | `void` |

### ToastOptions

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| type | Can be set to `loading` `success` `fail` `html` | _ToastType_ | `text` |
| position | Can be set to `top` `middle` `bottom` | _ToastPosition_ | `middle` |
| message | Message | _string_ | `''` |
| wordBreak | Can be set to `normal` `break-all` `break-word` | _ToastWordBreak_ | `'break-all'` |
| icon | Custom icon | _string_ | - |
| iconSize | Custom icon size | _number \| string_ | `36px` |
| iconPrefix | Icon className prefix | _string_ | `r-icon` |
| overlay | Whether to show overlay | _boolean_ | `false` |
| forbidClick | Whether to forbid click background | _boolean_ | `false` |
| closeOnClick | Whether to close after clicked | _boolean_ | `false` |
| closeOnClickOverlay | Whether to close when overlay is clicked | _boolean_ | `false` |
| loadingType | Loading icon type, can be set to `spinner` | _string_ | `circular` |
| duration | Toast duration(ms), won't disappear if value is 0 | _number_ | `2000` |
| className | Custom className | _string \| Array \| object_ | - |
| overlayClass `v3.0.4` | Custom overlay class | _string \| Array \| object_ | - |
| overlayStyle `v3.0.4` | Custom overlay style | _object_ | - |
| onOpened | Callback function after opened | _Function_ | - |
| onClose | Callback function after close | _Function_ | - |
| transition | Transition, equivalent to `name` prop of [transition](https://v3.vuejs.org/api/built-in-components.html#transition) | _string_ | `r-fade` |
| teleport | Specifies a target element where Toast will be mounted | _string \| Element_ | `body` |

### Slots

You can use following slots when using `Toast` component:

| Name    | Description    |
| ------- | -------------- |
| message | Custom message |

### Types

The component exports the following type definitions:

```ts
import type {
  ToastType,
  ToastProps,
  ToastOptions,
  ToastPosition,
  ToastWordBreak,
} from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-toast-max-width | _70%_ | - |
| --r-toast-font-size | _var(--r-font-size-md)_ | - |
| --r-toast-text-color | _var(--r-white)_ | - |
| --r-toast-loading-icon-color | _var(--r-white)_ | - |
| --r-toast-line-height | _var(--r-line-height-md)_ | - |
| --r-toast-radius | _var(--r-radius-lg)_ | - |
| --r-toast-background | _fade(var(--r-black), 70%)_ | - |
| --r-toast-icon-size | _36px_ | - |
| --r-toast-text-min-width | _96px_ | - |
| --r-toast-text-padding | _var(--r-padding-xs) var(--r-padding-sm)_ | - |
| --r-toast-default-padding | _var(--r-padding-md)_ | - |
| --r-toast-default-width | _88px_ | - |
| --r-toast-default-min-height | _88px_ | - |
| --r-toast-position-top-distance | _20%_ | - |
| --r-toast-position-bottom-distance | _20%_ | - |
