# Button

### Intro

Buttons are used to trigger an action, such as submitting a form.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Button } from 'ryxon';

const app = createApp();
app.use(Button);
```

## Usage

### Type

```html
<r-button type="primary">Primary</r-button>
<r-button type="success">Success</r-button>
<r-button type="default">Default</r-button>
<r-button type="danger">Danger</r-button>
<r-button type="warning">Warning</r-button>
```

### Plain

```html
<r-button plain type="primary">Plain</r-button>
<r-button plain type="success">Plain</r-button>
```

### Hairline

```html
<r-button plain hairline type="primary">Hairline</r-button>
<r-button plain hairline type="success">Hairline</r-button>
```

### Disabled

```html
<r-button disabled type="primary">Disabled</r-button>
<r-button disabled type="success">Disabled</r-button>
```

### Loading

```html
<r-button loading type="primary" />
<r-button loading type="primary" loading-type="spinner" />
<r-button loading type="success" loading-text="Loading..." />
```

### Shape

```html
<r-button square type="primary">Square</r-button>
<r-button round type="success">Round</r-button>
```

### Icon

```html
<r-button icon="plus" type="primary" />
<r-button icon="plus" type="primary">Button</r-button>
<r-button
  icon="https://fastly.jsdelivr.net/npm/@ryxon/assets/user-active.png"
  type="primary"
>
  Button
</r-button>
```

### Size

```html
<r-button type="primary" size="large">Large</r-button>
<r-button type="primary" size="normal">Normal</r-button>
<r-button type="primary" size="small">Small</r-button>
<r-button type="primary" size="mini">Mini</r-button>
```

### Block Element

```html
<r-button type="primary" block>Block Element</r-button>
```

### Route

```html
<r-button type="primary" url="https://github.com">URL</r-button>
<r-button type="primary" to="index">Vue Router</r-button>
```

### Custom Color

```html
<r-button color="#7232dd">Pure</r-button>
<r-button color="#7232dd" plain>Pure</r-button>
<r-button color="linear-gradient(to right, #ff6034, #ee0a24)">
  Gradient
</r-button>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| type | Can be set to `primary` `success` `warning` `danger` | _string_ | `default` |
| size | Can be set to `large` `small` `mini` | _string_ | `normal` |
| text | Text | _string_ | - |
| color | Color, support linear-gradient | _string_ | - |
| icon | Left Icon | _string_ | - |
| icon-prefix | Icon className prefix | _string_ | `r-icon` |
| icon-position | Icon position, can be set to `right` | _string_ | `left` |
| tag | HTML Tag | _string_ | `button` |
| native-type | Native Type Attribute | _string_ | `button` |
| plain | Whether to be plain button | _boolean_ | `false` |
| block | Whether to set display block | _boolean_ | `false` |
| round | Whether to be round button | _boolean_ | `false` |
| square | Whether to be square button | _boolean_ | `false` |
| disabled | Whether to disable button | _boolean_ | `false` |
| loading | Whether to show loading status | _boolean_ | `false` |
| loading-text | Loading text | _string_ | - |
| loading-type | Loading type, can be set to `spinner` | _string_ | `circular` |
| loading-size | Loading icon size | _number \| string_ | `20px` |
| url | Link URL | _string_ | - |
| to | Target route of the link, same as using vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| click | Emitted when button is clicked and not disabled or loading | _event: MouseEvent_ |
| touchstart | Emitted when button is touched | _event: TouchEvent_ |

### Slots

| Name           | Description         |
| -------------- | ------------------- |
| default        | Default slot        |
| icon `v3.0.18` | Custom icon         |
| loading        | Custom loading icon |

### Types

The component exports the following type definitions:

```ts
import type {
  ButtonType,
  ButtonSize,
  ButtonProps,
  ButtonNativeType,
  ButtonIconPosition,
} from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-button-mini-height | _24px_ | - |
| --r-button-mini-padding | _0 var(--r-padding-base)_ | - |
| --r-button-mini-font-size | _var(--r-font-size-xs)_ | - |
| --r-button-small-height | _32px_ | - |
| --r-button-small-padding | _0 var(--r-padding-xs)_ | - |
| --r-button-small-font-size | _var(--r-font-size-sm)_ | - |
| --r-button-normal-font-size | _var(--r-font-size-md)_ | - |
| --r-button-normal-padding | _0 15px_ | - |
| --r-button-large-height | _50px_ | - |
| --r-button-default-height | _44px_ | - |
| --r-button-default-line-height | _1.2_ | - |
| --r-button-default-font-size | _var(--r-font-size-lg)_ | - |
| --r-button-default-color | _var(--r-text-color)_ | - |
| --r-button-default-background | _var(--r-background-2)_ | - |
| --r-button-default-border-color | _var(--r-gray-4)_ | - |
| --r-button-primary-color | _var(--r-white)_ | - |
| --r-button-primary-background | _var(--r-primary-color)_ | - |
| --r-button-primary-border-color | _var(--r-primary-color)_ | - |
| --r-button-success-color | _var(--r-white)_ | - |
| --r-button-success-background | _var(--r-success-color)_ | - |
| --r-button-success-border-color | _var(--r-success-color)_ | - |
| --r-button-danger-color | _var(--r-white)_ | - |
| --r-button-danger-background | _var(--r-danger-color)_ | - |
| --r-button-danger-border-color | _var(--r-danger-color)_ | - |
| --r-button-warning-color | _var(--r-white)_ | - |
| --r-button-warning-background | _var(--r-warning-color)_ | - |
| --r-button-warning-border-color | _var(--r-warning-color)_ | - |
| --r-button-border-width | _var(--r-border-width)_ | - |
| --r-button-radius | _var(--r-radius-md)_ | - |
| --r-button-round-radius | _var(--r-radius-max)_ | - |
| --r-button-plain-background | _var(--r-white)_ | - |
| --r-button-disabled-opacity | _var(--r-disabled-opacity)_ | - |
| --r-button-icon-size | _1.2em_ | - |
| --r-button-loading-icon-size | _20px_ | - |
