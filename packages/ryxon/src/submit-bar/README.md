# SubmitBar

### Intro

Used to display the order amount and submit the order.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { SubmitBar } from 'ryxon';

const app = createApp();
app.use(SubmitBar);
```

## Usage

### Basic Usage

```html
<r-submit-bar :price="3050" button-text="Submit" @submit="onSubmit" />
```

```js
import { showToast } from 'ryxon';

export default {
  setup() {
    const onSubmit = () => showToast('Submit');
    return {
      onSubmit,
    };
  },
};
```

### Disabled

`submit` event will not triggered when disabled.

```html
<r-submit-bar
  disabled
  :price="3050"
  button-text="Submit"
  tip="Some tips"
  tip-icon="info-o"
  @submit="onSubmit"
/>
```

### Loading

`submit` event will not triggered when loading.

```html
<r-submit-bar loading :price="3050" button-text="Submit" @submit="onSubmit" />
```

### Advanced Usage

Use slot to add custom contents.

```html
<r-submit-bar :price="3050" button-text="Submit" @submit="onSubmit">
  <r-checkbox v-model="checked">Check</r-checkbox>
  <template #tip> Some tips, <span @click="onClickLink">Link</span> </template>
</r-submit-bar>
```

```js
import { showToast } from 'ryxon';

export default {
  setup() {
    const onSubmit = () => showToast('Submit');
    const onClickLink = () => showToast('Click Link');
    return {
      onSubmit,
      onClickLink,
    };
  },
};
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| price | Price | _number_ | - |
| decimal-length | Price decimal length | _number \| string_ | `2` |
| label | Price left label | _string_ | `Total: ` |
| suffix-label | Price right label | _string_ | - |
| text-align | Price label text align can be set to `left` | _string_ | `right` |
| button-text | Button text | _string_ | - |
| button-type | Button type | _string_ | `danger` |
| button-color | Button color | _string_ | - |
| tip | Tip | _string_ | - |
| tip-icon | Tip left icon | _string_ | - |
| currency | Currency symbol | _string_ | `¥` |
| disabled | Whether to disable button | _boolean_ | `false` |
| loading | Whether to show loading icon | _boolean_ | `false` |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_ | `true` |
| placeholder `v3.5.1` | Whether to generate a placeholder element | _boolean_ | `false` |

### Events

| Event  | Description                        | Arguments |
| ------ | ---------------------------------- | --------- |
| submit | Triggered when click submit button | -         |

### Slots

| Name    | Description         |
| ------- | ------------------- |
| default | Custom left content |
| button  | Custom button       |
| top     | Custom top content  |
| tip     | Custom tips         |

### Types

The component exports the following type definitions:

```ts
import type { SubmitBarProps, SubmitBarTextAlign } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-submit-bar-height | _50px_ | - |
| --r-submit-bar-z-index | _100_ | - |
| --r-submit-bar-background | _var(--r-background-2)_ | - |
| --r-submit-bar-button-width | _110px_ | - |
| --r-submit-bar-price-color | _var(--r-danger-color)_ | - |
| --r-submit-bar-price-font-size | _var(--r-font-size-sm)_ | - |
| --r-submit-bar-price-integer-font-size | _20px_ | - |
| --r-submit-bar-price-font | _var(--r-price-font)_ | - |
| --r-submit-bar-text-color | _var(--r-text-color)_ | - |
| --r-submit-bar-text-font-size | _var(--r-font-size-md)_ | - |
| --r-submit-bar-tip-padding | _var(--r-padding-xs) var(--r-padding-sm)_ | - |
| --r-submit-bar-tip-font-size | _var(--r-font-size-sm)_ | - |
| --r-submit-bar-tip-line-height | _1.5_ | - |
| --r-submit-bar-tip-color | _var(--r-orange-dark)_ | - |
| --r-submit-bar-tip-background | _var(--r-orange-light)_ | - |
| --r-submit-bar-tip-icon-size | _12px_ | - |
| --r-submit-bar-button-height | _40px_ | - |
| --r-submit-bar-padding | _0 var(--r-padding-md)_ | - |
